"use client"

import { useQuery } from "@tanstack/react-query";
import type { RetrievalMode, VariantMode } from "@/lib/ttd-api/types";
import { getItemExistHistory } from "@/lib/ttd-api/client-api";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { ExistsHistoryChart, ExistsQueryProvider } from "./exists-history-chart";

const variantModes = [
    {
        id: "normal",
        name: "Normal"
    },
    {
        id: "shiny",
        name: "Shiny"
    },
] as const;

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
    const [variantMode, setVariantMode] = useState<VariantMode>(variantModes[0].id)

    const { isPending, error, data } = useQuery({
        queryKey: ["getItemExistHistory", type, id, variantMode, retrievalMode],
        queryFn: async () => {
            return await getItemExistHistory(type, id, variantMode, retrievalMode);
        },
    });

    return <>
        {type == "Troops" &&
            <div className="mb-4 flex w-fit items-center gap-1 rounded-full border bg-muted/50 p-1">
                {
                    variantModes.map(mode => {
                        return (
                            <button
                                key={mode.id}
                                className={cn(
                                    "rounded-full px-3.5 py-1 text-sm font-medium transition-colors",
                                    mode.id === variantMode
                                        ? "bg-background text-foreground shadow-sm"
                                        : "text-muted-foreground hover:text-foreground"
                                )}
                                onClick={() => {
                                    setVariantMode(mode.id);
                                }}
                            >{mode.name}</button>
                        );
                    })
                }
            </div>
        }
        <ExistsHistoryChart
            isPending={isPending}
            error={error}
            series={[
                { key: "exists", label: "Exists", color: "hsl(var(--chart-1))", points: data },
            ]}
        />
    </>
}

export function ItemExistsChart({
    ...props
}: ExistChartProps) {
    return (
        <ExistsQueryProvider>
            <RawItemExistsChart {...props} />
        </ExistsQueryProvider>
    )
}
