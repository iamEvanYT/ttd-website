import type { CrateContent, ExtendedCrateData } from "@/lib/ttd-api/types";
import { CardDescription, CardTitle } from "@/components/ui/card";
import { Suspense } from "react";
import { LoadingSpinner } from "@/components/ui/loading";
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

    return <div className="mt-1 ml-5 text-left w-[100%] text-muted-foreground">
        {sortedItems && sortedItems.map(async (item) => {
            const chanceText = `${item.Chance}%`;
            const { ItemId: itemId, itemData } = item;

            const itemDisplay = itemData?.display || item.ItemId || "???";
            const lineElement = (
                <span key={itemId} className="flex items-center">
                    <span>{chanceText} - {itemDisplay} ({itemData.rarity})</span>
                    {itemData.imageURL && (
                        <Image 
                            src={itemData.imageURL} 
                            alt={itemDisplay} 
                            className="w-8 h-8 ml-2"
                            width={100}
                            height={100}
                        />
                    )}
                </span>
            );

            return (
                <Link href={`/database/units/${itemId}`} key={itemId} className="hover:underline underline-offset-4 block">
                    {lineElement}
                </Link>
            );
        })}
    </div>
}

export async function CrateItemsVisualiser({ crateId, itemData }: VisualiserProps) {
    return <div className="w-[95%] h-full p-5 border rounded-xl shadow-lg text-center text-xl">
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
