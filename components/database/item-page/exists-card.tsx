"use client"

import { cn } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import React, { useState } from "react";
import { ItemExistsChart } from "./item-exists-chart";
import { RetrievalMode } from "@/lib/ttd-api/types";

const existDataModes = [
    {
        id: "lastDay",
        name: "24h"
    },
    {
        id: "lastWeek",
        name: "7d"
    },
    {
        id: "lastMonth",
        name: "30d"
    },
    {
        id: "lastYear",
        name: "12m"
    },
] as const;

type ExistChartProps = {
    type: string,
    id: string,
    retrievalMode: RetrievalMode
}

type ExistCardProps = {
    type: string,
    id: string,

    cardClassName?: string,
    cardTitle?: string,
    cardDescription?: string,

    Chart?: React.FC<ExistChartProps>,
}
export function ItemExistsCard({
    type,
    id,

    cardClassName,
    cardTitle,
    cardDescription,

    Chart = ItemExistsChart
}: ExistCardProps) {
    const [historyMode, setHistoryMode] = useState<RetrievalMode>(existDataModes[0].id)

    return (
        <Card className={cn("w-full p-4 md:p-6", cardClassName)}>
            <CardHeader className="p-2">
                <CardTitle>{cardTitle || "Exists Chart"}</CardTitle>
                <CardDescription>
                    {cardDescription || "Showing the exists history."}
                </CardDescription>

                <div className="!mt-4 flex w-fit items-center gap-1 rounded-full border bg-muted/50 p-1">
                    {
                        existDataModes.map(mode => {
                            return (
                                <button
                                    key={mode.id}
                                    className={cn(
                                        "rounded-full px-3.5 py-1 text-sm font-medium transition-colors",
                                        mode.id === historyMode
                                            ? "bg-background text-foreground shadow-sm"
                                            : "text-muted-foreground hover:text-foreground"
                                    )}
                                    onClick={() => {
                                        setHistoryMode(mode.id);
                                    }}
                                >{mode.name}</button>
                            );
                        })
                    }
                </div>
            </CardHeader>
            <CardContent className="p-2">
                <Chart type={type} id={id} retrievalMode={historyMode} />
            </CardContent>
        </Card>
    );
}
