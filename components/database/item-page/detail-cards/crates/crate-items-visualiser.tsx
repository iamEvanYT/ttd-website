import type { CrateContent, ExtendedCrateData } from "@/lib/ttd-api/types";
import { CardDescription, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { getItemData } from "@/lib/ttd-api/client-api";
import Image from "next/image";

type VisualiserProps = {
    crateId: string,
    itemData: ExtendedCrateData
}

async function ItemsList({ crateItems }: { crateItems: CrateContent[] }) {
    const promises = crateItems.map(async (content) => {
        const itemData = await getItemData("Troops", content.ItemId);

        if (!itemData) {
            return null
        }

        return {
            itemData,
            ...content
        }
    })
    
    const sortedItems = (await Promise.all(promises)).filter(data => data !== null).sort((a, b) => a.Chance - b.Chance);

    return <div className="mt-4 grid w-full gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {sortedItems && sortedItems.map(async (item) => {
            const chanceText = `${item.Chance}%`;
            const { ItemId: itemId, itemData } = item;

            const itemDisplay = itemData?.display || item.ItemId || "???";
            const lineElement = (
                <span key={itemId} className="flex items-center gap-3">
                    {itemData.imageURL && (
                        <Image
                            src={itemData.imageURL}
                            alt={itemDisplay}
                            className="size-12 shrink-0 object-contain"
                            width={100}
                            height={100}
                        />
                    )}
                    <span className="min-w-0 flex-1">
                        <span className="block truncate font-semibold">{itemDisplay}</span>
                        <span className="text-sm text-muted-foreground">{itemData.rarity}</span>
                    </span>
                    <span className="font-display text-lg font-bold tabular-nums">{chanceText}</span>
                </span>
            );

            return (
                <Link href={`/database/units/${itemId}`} key={itemId} className="block rounded-xl border bg-background/60 p-3 transition-colors hover:border-primary/40 hover:bg-accent">
                    {lineElement}
                </Link>
            );
        })}
    </div>
}

export async function CrateItemsVisualiser({ crateId, itemData }: VisualiserProps) {
    return <div className="rounded-2xl border bg-card p-4 md:p-6 shadow-sm">
        <div className="flex flex-row justify-between items-center p-2">
            <div className="text-left">
                <CardTitle>Crate Items</CardTitle>
                <CardDescription>
                    Discover the potential units you can get from this crate.
                </CardDescription>
            </div>
        </div>

        <div className="flex flex-row justify-center">
            {itemData.items && <ItemsList crateItems={itemData.items} />}
            {!itemData.items && "Cannot find crate items!"}
        </div>
    </div>
}
