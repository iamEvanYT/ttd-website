"use client"

import { useQuery } from "@tanstack/react-query";
import type { RetrievalMode } from "@/lib/ttd-api/types";
import { getTotalItemExistHistory } from "@/lib/ttd-api/client-api";
import { ExistsHistoryChart, ExistsQueryProvider } from "./exists-history-chart";

type ExistChartProps = {
    retrievalMode: RetrievalMode
}
function RawTotalExistsChart({
    retrievalMode
}: ExistChartProps) {
    const { isPending, error, data } = useQuery({
        queryKey: ["getTotalItemExistHistory", retrievalMode],
        queryFn: async () => {
            return await getTotalItemExistHistory(retrievalMode);
        },
    });

    const [total, troops, shinyTroops, crates] = data ?? [];

    return <ExistsHistoryChart
        isPending={isPending}
        error={error}
        series={[
            { key: "total", label: "Total", color: "hsl(var(--chart-1))", points: total },
            { key: "troops", label: "Troops", color: "hsl(var(--chart-2))", points: troops },
            { key: "shinyTroops", label: "Shiny Troops", color: "hsl(var(--chart-3))", points: shinyTroops },
            { key: "crates", label: "Crates", color: "hsl(var(--chart-4))", points: crates },
        ]}
    />
}

export function TotalExistsChart({
    ...props
}: ExistChartProps) {
    return (
        <ExistsQueryProvider>
            <RawTotalExistsChart {...props} />
        </ExistsQueryProvider>
    )
}
