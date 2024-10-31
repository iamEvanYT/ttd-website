"use client"

import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ExtendedTroopData } from "@/lib/ttd-api/types";
import { QuestionListItem, QuestionsList } from "@/components/utility/questions-list";
import { CardDescription, CardTitle } from "@/components/ui/card";

function numberWithCommas(x: number) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

type VisualiserProps = {
    unitId: string,
    itemData: ExtendedTroopData
}

function convertToDisplayName(itemId: string): string {
    let displayName = itemId;
    // Handle camelCase and PascalCase by inserting a space between a lowercase and an uppercase letter
    displayName = displayName.replace(/([a-z])([A-Z])/g, '$1 $2');
    // Handle acronyms and uppercase sequences
    displayName = displayName.replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2');
    return displayName;
}

const allowedStats = [
    "Damage",
    "AttackRadius",
    "AttackCooldown",
    "AttackAngle",
    "BlastRadius",

    "PushStuds",

    "ExtraIncome",

    "WalkRadius",
    "WalkSpeed",

    "DamageMultiBoost",
    "RangeMultiBoost",
    "CooldownMultiBoost",
];

const customStatNames: {
    [key: string]: string
} = {
    "AttackCooldown": "Cooldown",
    "AttackRadius": "Range",

    "PushStuds": "Push Distance",

    "DamageMultiBoost": "Damage Boost",
    "RangeMultiBoost": "Range Boost",
    "CooldownMultiBoost": "Cooldown Boost",
}

function toPercentage(num: number) {
    return `${Math.round((num * 100))}%`;
}

function transformStatValues(statName: string, statValue: any) {
    switch (statName) {
        case "DamageMultiBoost":
            return toPercentage(statValue as number)
        case "RangeMultiBoost":
            return toPercentage(statValue as number)
        case "CooldownMultiBoost":
            return toPercentage(statValue as number)
    }
    return statValue
}

export function UnitStatsVisualiser({ unitId, itemData }: VisualiserProps) {
    const stats = [];

    const priceStats = []
    if (itemData.price) {
        priceStats.push({
            question: "Placement Price",
            answer: `$${numberWithCommas(itemData.price)}`
        })
    }
    if (itemData.upgradePrices) {
        itemData.upgradePrices.forEach((price, index) => {
            priceStats.push({
                question: `Upgrade to Level ${index + 2}`,
                answer: `$${numberWithCommas(price)}`
            })
        })
    }
    stats.push({
        name: "Prices",
        stats: priceStats
    })

    if (itemData.abilities) {
        for (const [abilityName, abilityLevelsData] of Object.entries(itemData.abilities)) {
            const abilityDisplay = convertToDisplayName(abilityName);

            const abilityStats: QuestionListItem[] = [];
            abilityLevelsData?.forEach((levelData: any, index: number) => {
                if (levelData == "None") {
                    return;
                }

                const levelShowingStats = Object.entries(levelData)
                    .sort(([a], [b]) => {
                        const indexA = allowedStats.indexOf(a);
                        const indexB = allowedStats.indexOf(b);
                        if (indexA === -1 && indexB === -1) return 0;
                        if (indexA === -1) return 1;
                        if (indexB === -1) return -1;
                        return indexA - indexB;
                    })
                    .map(([key, value]) => {
                        if (!allowedStats.includes(key)) {
                            return null;
                        }

                        const formattedKey = customStatNames[key] || convertToDisplayName(key);
                        let showingValue = value

                        showingValue = transformStatValues(key, value)
                        if (typeof showingValue == "number") {
                            showingValue = numberWithCommas(showingValue)
                        }

                        return `${formattedKey}: ${showingValue}`;
                    })
                    .filter(value => value !== null)
                    .join('\n\n')

                if (levelShowingStats.trim() !== "") {
                    abilityStats.push({
                        question: `Level ${index + 1}`,
                        answer: levelShowingStats
                    })
                }
            })

            if (abilityStats.length > 0) {
                stats.push({
                    name: abilityDisplay,
                    stats: abilityStats
                })
            }
        }
    }

    const [statViewing, setStat] = useState<string | undefined>();
    const onViewingStatChange = (newStat?: string) => {
        setStat(newStat)
    }

    const viewingStatData = stats.find(stat => stat.name === statViewing)?.stats;

    const statSelector = (
        <Select onValueChange={onViewingStatChange} value={statViewing}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a Stat" />
            </SelectTrigger>
            <SelectContent>
                {stats.map((stat, index) => {
                    return (
                        <SelectItem key={index} value={stat.name}>
                            {stat.name}
                        </SelectItem>
                    )
                })}
            </SelectContent>
        </Select>
    )

    return <div className="w-[95%] h-full p-5 border rounded-xl shadow-lg text-center text-xl">
        <div className="flex flex-row justify-between items-center p-2">
            <div className="text-left">
                <CardTitle>Unit Stats</CardTitle>
                <CardDescription>
                    Explore detailed unit statistics, from pricing to abilities!
                </CardDescription>
            </div>
            <div>{statSelector}</div>
        </div>

        {!statViewing && "Select a stat to get started!"}
        {statViewing && viewingStatData && <QuestionsList items={viewingStatData} />}
        {statViewing && !viewingStatData && "No data found!"}
    </div>
}