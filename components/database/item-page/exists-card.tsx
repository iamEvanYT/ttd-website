"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
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
        <Card className={`w-[95%] h-full p-5 border rounded-xl shadow-lg ${cardClassName}`}>
            <CardHeader className="p-2">
                <CardTitle>{cardTitle || "Exists Chart"}</CardTitle>
                <CardDescription>
                    {cardDescription || "Showing the exists history."}
                </CardDescription>

                <div className="flex justify-start items-center gap-2">
                    {
                        existDataModes.map(mode => {
                            return (
                                <Button
                                    key={mode.id}
                                    variant={`${mode.id === historyMode ? "default" : "outline"}`}
                                    onClick={() => {
                                        setHistoryMode(mode.id);
                                    }}
                                >{mode.name}</Button>
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
