"use client"

import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
    useQuery,
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'
import { RetrievalMode } from "@/lib/ttd-api/types";
import { getItemExistHistory } from "@/lib/ttd-api/client-api";
import { LoadingSpinner } from "@/components/ui/loading";
import React from "react";

const abbreviateNumber = Intl.NumberFormat('en-US', {
    notation: "compact",
    maximumFractionDigits: 3
}).format;
const roundTimestamp = (timestamp: number): number => {
    const fiveMinutesInMs = 5 * 60 * 1000;
    return Math.round(timestamp / fiveMinutesInMs) * fiveMinutesInMs;
};

type ChartData = {
    date: number;
    exists: number;
}[]

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
    type: string,
    id: string,
    retrievalMode: RetrievalMode
}
function RawItemExistsChart({
    type,
    id,
    retrievalMode
}: ExistChartProps) {
    const chartConfig = {
        exists: {
            label: "Exists",
            color: "hsl(var(--chart-1))",
        },
    } satisfies ChartConfig;

    const { isPending, error, data } = useQuery({
        queryKey: ["getItemExistHistory", type, id, retrievalMode],
        queryFn: async () => {
            return await getItemExistHistory(type, id, retrievalMode);
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

    const chartData: ChartData | undefined = data?.map(({ recordedAt, amount }) => {
        const rawTime = new Date(recordedAt).getTime();
        return {
            date: roundTimestamp(rawTime),
            exists: amount,
        };
    });
    if (!chartData || chartData?.length < 1 ) {
        return <FallbackElement>
            <div>No data avalible</div>
        </FallbackElement>
    }

    const existValues = chartData.map(({ exists }) => exists);
    let minExists = Math.min(...existValues);
    let maxExists = Math.max(...existValues);
    const existsDifference = (maxExists - minExists);

    if (minExists == maxExists) {
        minExists -= 1;
        maxExists += 1;
    }

    const existsLowerBound = Math.max(minExists - Math.floor(existsDifference * 0.1), 0)
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
                    left: 12,
                    right: 12,
                }}
            >
                <ChartTooltip
                    content={
                        <ChartTooltipContent
                            indicator="line"
                            className="bg-white dark:bg-black"
                            labelFormatter={(value, payload) => {
                                return formatDateLong(payload[0]?.payload?.date)
                            }}
                        />
                    }
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
                    dataKey="exists"
                    type="basis"
                    fill="var(--color-exists)"
                    fillOpacity={0.4}
                    stroke="var(--color-exists)"
                />
            </AreaChart>
        </ChartContainer>
    );
}

export function ItemExistsChart({
    ...props
}: ExistChartProps) {
    return (
        <QueryClientProvider client={queryClient}>
            <RawItemExistsChart {...props} />
        </QueryClientProvider>
    )
}