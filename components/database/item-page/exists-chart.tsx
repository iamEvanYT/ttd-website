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
        return {
            date: new Date(recordedAt).getTime(),
            exists: amount,
        };
    });
    if (!chartData) {
        return <FallbackElement>
            <div>No data avalible</div>
        </FallbackElement>
    }

    const existValues = chartData.map(({ exists }) => exists);
    let minExists = Math.min(...existValues);
    let maxExists = Math.max(...existValues);
    const existsDifference = (maxExists - minExists);

    if (minExists == maxExists) {
        minExists -= 2;
        maxExists += 2;
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
                    scale="utc"
                />
                <YAxis
                    domain={[
                        existsLowerBound,
                        existsUpperBound
                    ]}
                    tickFormatter={(value) => value.toLocaleString()}
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