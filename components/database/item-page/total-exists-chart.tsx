"use client"

import { ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
    useQuery,
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'
import { RetrievalMode } from "@/lib/ttd-api/types";
import { getTotalItemExistHistory } from "@/lib/ttd-api/client-api";
import { LoadingSpinner } from "@/components/ui/loading";
import React, { useState } from "react";

const abbreviateNumber = Intl.NumberFormat('en-US', {
    notation: "compact",
    maximumFractionDigits: 3
}).format;
const roundTimestamp = (timestamp: number): number => {
    const roundTimeinMilliseconds = 30 * 60 * 1000;
    return Math.round(timestamp / roundTimeinMilliseconds) * roundTimeinMilliseconds;
};

type ChartDataItem = {
    date: number;

    total?: number;
    troops?: number;
    shinyTroops?: number;
    crates?: number;
}

type ChartData = ChartDataItem[]

const queryClient = new QueryClient()

function formatDateLong(timestamp: number) {
    const date = new Date(timestamp);
    return date.toLocaleString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
    })
}

function formatDateShort(timestamp: number) {
    const date = new Date(timestamp);
    const dateString = date.toLocaleString(undefined, {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
    });
    return `  ${dateString}  `
}

type FallbackElementProps = {
    children: React.ReactNode
}
function FallbackElement({
    children
}: FallbackElementProps) {
    return (
        <div className="flex flex-col items-center h-full w-full">
            {children}
        </div>
    )
}

type ExistChartProps = {
    retrievalMode: RetrievalMode
}
function RawTotalExistsChart({
    retrievalMode
}: ExistChartProps) {
    const [hiddenDataKeys, setHiddenDataKeys] = useState<string[]>([]);

    const chartConfig = {
        total: {
            label: "Total",
            color: "hsl(var(--chart-1))",
            enabled: (hiddenDataKeys.includes("total") ? false : true),
        },
        troops: {
            label: "Troops",
            color: "hsl(var(--chart-2))",
            enabled: (hiddenDataKeys.includes("troops") ? false : true),
        },
        shinyTroops: {
            label: "Shiny Troops",
            color: "hsl(var(--chart-3))",
            enabled: (hiddenDataKeys.includes("shinyTroops") ? false : true),
        },
        crates: {
            label: "Crates",
            color: "hsl(var(--chart-4))",
            enabled: (hiddenDataKeys.includes("crates") ? false : true),
        },
    } satisfies ChartConfig

    function processLegendClick(dataKey: string) {
        if (hiddenDataKeys.includes(dataKey)) {
            const newDataKeys = [...hiddenDataKeys].filter(key => key !== dataKey);
            setHiddenDataKeys(newDataKeys);
        } else {
            const newDataKeys = [...hiddenDataKeys];
            newDataKeys.push(dataKey);
            setHiddenDataKeys(newDataKeys);
        }
    }

    const { isPending, error, data } = useQuery({
        queryKey: ["getTotalItemExistHistory", retrievalMode],
        queryFn: async () => {
            return await getTotalItemExistHistory(retrievalMode);
        },
    });

    if (isPending || error) {
        if (isPending) {
            return <FallbackElement>
                <LoadingSpinner />
            </FallbackElement>
        } else if (error) {
            return <FallbackElement>
                <div>Error occurred</div>
            </FallbackElement>
        }
    }

    let chartData: ChartData | undefined = undefined;

    if (data) {
        const [
            totalData,
            troopsData,
            shinyTroopsData,
            cratesData
        ] = data;
        const chartDataMap = new Map<number, ChartDataItem>();

        // Helper function to add data to the map
        const addData = (dataArray: Array<{ recordedAt: string; amount: number }> | undefined, key: keyof ChartDataItem) => {
            dataArray?.forEach(({ recordedAt, amount }) => {
                const rawTime = new Date(recordedAt).getTime();
                const time = roundTimestamp(rawTime);
                if (!chartDataMap.has(time)) {
                    chartDataMap.set(time, { date: time });
                }
                chartDataMap.get(time)![key] = amount;
            });
        };

        // Add each dataset to the map
        if (totalData && chartConfig.total.enabled !== false) {
            addData(totalData, 'total');
        }
        if (troopsData && chartConfig.troops.enabled !== false) {
            addData(troopsData, 'troops');
        }
        if (shinyTroopsData && chartConfig.shinyTroops.enabled !== false) {
            addData(shinyTroopsData, 'shinyTroops');
        }
        if (cratesData && chartConfig.crates.enabled !== false) {
            addData(cratesData, 'crates');
        }

        // Convert the map back to an array
        chartData = Array.from(chartDataMap.values());
    }

    if (!chartData) {
        return <FallbackElement>
            <div>No data avalible</div>
        </FallbackElement>
    }

    const existValues: number[] = [];
    chartData.forEach(({ total, troops, crates }) => {
        if (total) {
            existValues.push(total);
        }
        if (troops) {
            existValues.push(troops);
        }
        if (crates) {
            existValues.push(crates);
        }
    })

    let minExists = Math.min(...existValues);
    let maxExists = Math.max(...existValues);
    const existsDifference = (maxExists - minExists);

    if (minExists == maxExists) {
        minExists -= 1;
        maxExists += 1;
    }

    const existsLowerBound = Math.max(minExists - Math.ceil(existsDifference * 0.1), 0)
    const existsUpperBound = Math.max(maxExists + Math.ceil(existsDifference * 0.1), 0)

    const timestampValues = chartData.map(({ date }) => date);
    const minTimestamp = Math.min(...timestampValues);
    const maxTimestamp = Math.max(...timestampValues);

    return (
        <ChartContainer config={chartConfig}>
            <AreaChart
                accessibilityLayer
                data={chartData}
                margin={{
                    top: 20,
                    right: 20,
                    left: 20,
                    bottom: 20,
                }}
            >
                <ChartTooltip
                    content={
                        <ChartTooltipContent
                            indicator="line"
                            className="bg-white dark:bg-black"
                        />
                    }
                    labelFormatter={(value, payload) => {
                        return formatDateLong(payload[0]?.payload?.date)
                    }}
                />
                <CartesianGrid vertical={false} />
                <XAxis
                    dataKey="date"
                    tickLine={false}
                    axisLine={true}
                    tickMargin={8}
                    tickFormatter={(value) => formatDateShort(value)}
                    domain={[
                        minTimestamp,
                        maxTimestamp
                    ]}
                    allowDataOverflow={true}
                    scale="time"
                />
                <YAxis
                    domain={[
                        existsLowerBound,
                        existsUpperBound
                    ]}
                    tickFormatter={(value) => {
                        if (Math.floor(value) !== value) {
                            // Don't show decimal values
                            return ""
                        }
                        return abbreviateNumber(value);
                    }}
                    scale="sequential"
                />
                <Area
                    dataKey="total"
                    type="basis"
                    fill="var(--color-total)"
                    fillOpacity={0.4}
                    stroke="var(--color-total)"
                />
                <Area
                    dataKey="troops"
                    type="basis"
                    fill="var(--color-troops)"
                    fillOpacity={0.4}
                    stroke="var(--color-troops)"
                />
                <Area
                    dataKey="shinyTroops"
                    type="basis"
                    fill="var(--color-shinyTroops)"
                    fillOpacity={0.4}
                    stroke="var(--color-shinyTroops)"
                />
                <Area
                    dataKey="crates"
                    type="basis"
                    fill="var(--color-crates)"
                    fillOpacity={0.4}
                    stroke="var(--color-crates)"
                />
                <ChartLegend content={
                    <ChartLegendContent
                        onItemClick={(dataKey) => processLegendClick(dataKey)}
                    />
                } />
            </AreaChart>
        </ChartContainer>
    );
}

export function TotalExistsChart({
    ...props
}: ExistChartProps) {
    return (
        <QueryClientProvider client={queryClient}>
            <RawTotalExistsChart {...props} />
        </QueryClientProvider>
    )
}