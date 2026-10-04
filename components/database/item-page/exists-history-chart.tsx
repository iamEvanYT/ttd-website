"use client"

import { ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LoadingSpinner } from "@/components/ui/loading";
import type { ExistCountHistoryItem } from "@/lib/ttd-api/types";
import React, { useState } from "react";

const existsQueryClient = new QueryClient()

export function ExistsQueryProvider({ children }: { children: React.ReactNode }) {
    return <QueryClientProvider client={existsQueryClient}>{children}</QueryClientProvider>
}

export type ExistsSeries = {
    key: string,
    label: string,
    color: string,
    points: ExistCountHistoryItem[] | null | undefined,
}

type ChartRow = {
    date: number,
    [key: string]: number,
}

const DAY = 24 * 60 * 60 * 1000;

const abbreviateNumber = Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 2,
}).format;

function formatDateLong(timestamp: number) {
    return new Date(timestamp).toLocaleString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
    })
}

function median(values: number[]) {
    const sorted = [...values].sort((a, b) => a - b);
    return sorted[Math.floor(sorted.length / 2)];
}

/**
 * Each series is snapshotted independently, so their timestamps drift apart by
 * minutes to hours. Group snapshots taken in the same sampling round into one row,
 * so the tooltip can show every series at once.
 */
function buildRows(series: ExistsSeries[]): ChartRow[] {
    const points = series.flatMap(({ key, points }) => (points ?? []).map(({ recordedAt, amount }) => ({
        key,
        date: new Date(recordedAt).getTime(),
        amount,
    }))).sort((a, b) => a.date - b.date);

    // Half the typical gap between a series' own snapshots
    const gaps = series.flatMap(({ points }) => {
        const dates = (points ?? []).map(({ recordedAt }) => new Date(recordedAt).getTime()).sort((a, b) => a - b);
        return dates.length > 1 ? [median(dates.slice(1).map((date, i) => date - dates[i]))] : [];
    });
    const groupWindow = gaps.length > 0 ? Math.min(...gaps) / 2 : Infinity;

    const rows: ChartRow[] = [];
    for (const { key, date, amount } of points) {
        const row = rows[rows.length - 1];
        if (row && date - row.date <= groupWindow && row[key] === undefined) {
            row[key] = amount;
        } else {
            rows.push({ date, [key]: amount });
        }
    }

    return rows;
}

function FallbackElement({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex aspect-video max-h-[24rem] w-full flex-col items-center justify-center gap-2 rounded-xl border border-dashed text-center text-sm text-muted-foreground">
            {children}
        </div>
    )
}

type ExistsHistoryChartProps = {
    series: ExistsSeries[],
    isPending: boolean,
    error: Error | null,
    showLegend?: boolean,
}
export function ExistsHistoryChart({
    series,
    isPending,
    error,
    showLegend = series.length > 1,
}: ExistsHistoryChartProps) {
    const [hiddenKeys, setHiddenKeys] = useState<string[]>([]);

    if (isPending) {
        return <FallbackElement><LoadingSpinner /></FallbackElement>
    }
    if (error) {
        return <FallbackElement>Failed to load exists history.</FallbackElement>
    }

    const rows = buildRows(series);

    if (rows.length === 0) {
        return <FallbackElement>No exists history recorded yet.</FallbackElement>
    }

    if (rows.length === 1) {
        // A single snapshot can't be drawn as a line, so show it as plain values
        const [row] = rows;
        return <FallbackElement>
            <span>Only one snapshot recorded in this range, from {formatDateLong(row.date)}.</span>
            <dl className="flex flex-wrap justify-center gap-x-6 gap-y-1">
                {series.filter(({ key }) => row[key] !== undefined).map(({ key, label, color }) => (
                    <div key={key} className="flex items-center gap-2">
                        <span className="size-2 rounded-[2px]" style={{ backgroundColor: color }} />
                        <dt>{label}</dt>
                        <dd className="font-mono tabular-nums text-foreground">{row[key].toLocaleString()}</dd>
                    </div>
                ))}
            </dl>
        </FallbackElement>
    }

    const chartConfig: ChartConfig = Object.fromEntries(series.map(({ key, label, color }) => [key, {
        label,
        color,
        enabled: !hiddenKeys.includes(key),
    }]));

    const timeSpan = rows[rows.length - 1].date - rows[0].date;
    const formatTick = (timestamp: number) => new Date(timestamp).toLocaleString(undefined, timeSpan <= 2 * DAY
        ? { hour: "numeric", minute: "numeric" }
        : { month: "short", day: "numeric", ...(timeSpan > 180 * DAY && { year: "2-digit" }) });

    function toggleSeries(key: string) {
        setHiddenKeys(keys => keys.includes(key) ? keys.filter(k => k !== key) : [...keys, key]);
    }

    return (
        <ChartContainer config={chartConfig} className="aspect-auto h-[24rem] w-full">
            <AreaChart data={rows} margin={{ top: 8, right: 8, left: 0, bottom: 0 }} accessibilityLayer>
                <CartesianGrid vertical={false} />
                <XAxis
                    dataKey="date"
                    type="number"
                    domain={["dataMin", "dataMax"]}
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    minTickGap={48}
                    tickFormatter={formatTick}
                />
                <YAxis
                    domain={["auto", "auto"]}
                    allowDecimals={false}
                    tickLine={false}
                    axisLine={false}
                    width={56}
                    tickFormatter={(value: number) => abbreviateNumber(value)}
                />
                <ChartTooltip
                    content={
                        <ChartTooltipContent
                            indicator="line"
                            labelFormatter={(_, payload) => formatDateLong(payload[0]?.payload?.date)}
                        />
                    }
                />
                {series.map(({ key }) => (
                    <Area
                        key={key}
                        dataKey={key}
                        type="monotone"
                        connectNulls
                        hide={hiddenKeys.includes(key)}
                        stroke={`var(--color-${key})`}
                        strokeWidth={2}
                        fill={`var(--color-${key})`}
                        fillOpacity={0.15}
                    />
                ))}
                {showLegend && <ChartLegend content={<ChartLegendContent onItemClick={toggleSeries} />} />}
            </AreaChart>
        </ChartContainer>
    );
}
