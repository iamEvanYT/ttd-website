import { getItemData } from "@/lib/ttd-api/client-api";
import Image from "next/image";
import { DatabaseTopbar } from "@/components/database/topbar";
import type { ExtendedCrateData, ExtendedTroopData, ItemTypes } from "@/lib/ttd-api/types";
import { ItemDropdownMenu } from "./dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { notFound } from "next/navigation";
import { ItemExistsCard } from "./exists-card";
import { UnitStatsVisualiser } from "./detail-cards/troops/units-stats-visualiser";
import { CrateItemsVisualiser } from "./detail-cards/crates/crate-items-visualiser";
import { getRarityStyle } from "@/lib/rarity";
import { cn } from "@/lib/utils";

function numberWithCommas(x: number) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function ShowingTags({ itemData }: { itemData: ExtendedTroopData }) {
    if (itemData.tags?.length === 0 || !itemData.tags) {
        return null;
    }

    return (
        <div className="flex flex-wrap gap-1.5">
            {itemData.tags && itemData.tags?.map((tag: string) => {
                return <Badge variant="secondary" className="rounded-full" key={tag}>{tag}</Badge>;
            })}
        </div>
    )
}

function Stat({ label, value }: { label: string, value: string }) {
    return (
        <div className="rounded-xl border bg-background/60 p-3 md:p-4">
            <dt className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</dt>
            <dd className="mt-1 font-display text-2xl font-bold tabular-nums md:text-3xl">{value}</dd>
        </div>
    )
}

export async function DatabaseItemDetails({
    type,
    id
}: {
    type: ItemTypes,
    id: string,
}) {
    const itemData = await getItemData(type, id);

    if (!itemData) {
        return notFound();
    }

    const {
        display: displayName,
        exists,
        imageURL,
    } = itemData;

    const {
        shinyExists
    } = (itemData as ExtendedTroopData)

    const inferredExists = (itemData as ExtendedCrateData).inferredExists
    const rarityStyle = getRarityStyle(itemData.rarity);

    return (
        <div className="container mx-auto px-4 md:px-6 pt-8 pb-20 flex flex-col gap-6">
            <div className="relative overflow-hidden rounded-[2rem] border bg-card">
                <div className={cn("absolute inset-0 bg-gradient-to-br via-transparent to-transparent", rarityStyle.glow)} />
                <div className="relative grid gap-6 p-6 md:grid-cols-[auto_1fr] md:gap-10 md:p-10">
                    <div className="grid place-items-center">
                        <Image
                            src={imageURL}
                            alt={displayName}
                            width={400}
                            height={400}
                            className="size-48 object-contain drop-shadow-2xl md:size-64"
                            id="item-image"
                            priority
                        />
                    </div>
                    <div id="basic-info" className="flex flex-col gap-5">
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <span className={cn("inline-block rounded-full px-3 py-1 text-xs font-semibold", rarityStyle.badge)}>
                                    {itemData.rarity}
                                </span>
                                <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight md:text-5xl">{displayName}</h1>
                            </div>
                            <ItemDropdownMenu itemData={itemData} />
                        </div>
                        <dl className="grid grid-cols-2 gap-3 lg:grid-cols-3">
                            <Stat label={!inferredExists && "Exists" || "Ever Existed"} value={numberWithCommas(exists)} />
                            {inferredExists && (
                                <Stat label="Exists (Estimated)" value={inferredExists >= 0 && numberWithCommas(inferredExists) || "???"} />
                            )}
                            {(shinyExists !== undefined) && (
                                <Stat label="Exists (Shiny)" value={numberWithCommas(shinyExists)} />
                            )}
                        </dl>
                        <ShowingTags itemData={(itemData as ExtendedTroopData)} />
                    </div>
                </div>
            </div>
            {type == "Crates" && <CrateItemsVisualiser crateId={id} itemData={(itemData as ExtendedCrateData)} />}
            {type == "Troops" && <UnitStatsVisualiser unitId={id} itemData={(itemData as ExtendedTroopData)} />}
            <ItemExistsCard type={type} id={id} />
        </div>
    )
}

export function DatabaseItemPage({
    type,
    id
}: {
    type: ItemTypes,
    id: string,
}) {
    return <>
        <DatabaseTopbar />
        <DatabaseItemDetails type={type} id={id} />
    </>
};