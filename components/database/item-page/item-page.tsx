import { getItemData } from "@/lib/ttd-api/client-api";
import Image from "next/image";
import { DatabaseTopbar } from "@/components/database/topbar";
import type { ExtendedTroopData, ItemTypes } from "@/lib/ttd-api/types";
import { ItemDropdownMenu } from "./dropdown-menu";
import { Badge } from "@/components/ui/badge"
import { notFound } from "next/navigation";

function numberWithCommas(x: number) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function ShowingTags({ itemData }: { itemData: ExtendedTroopData | any }) {
    if (itemData.tags?.length === 0 || !itemData.tags) {
        return null;
    }

    return <>
        <br />
        <div className="flex flex-row gap-1">
            <span>Tags:</span>
            {itemData.tags && itemData.tags?.map((tag: string) => {
                return <Badge className="rounded-xl" key={tag}>{tag}</Badge>;
            })}
        </div>
    </>
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
        imageURL
    } = itemData;

    return <>
        <div className="flex flex-col justify-center m-5 gap-3">
            <div className="flex w-[95%] h-full p-5 border rounded-xl shadow-lg">
                <div className="flex flex-row w-[95%] h-full">
                    <Image
                        src={imageURL}
                        alt={displayName}
                        width={200}
                        height={200}
                        className="h-32 w-fit aspect-square object-contain"
                        id="item-image"
                    />
                    <div id="basic-info" className="flex flex-col ml-3">
                        <h1 className="text-2xl font-bold">{displayName}</h1>
                        Rarity: {itemData.rarity}
                        <br />
                        Exists: {numberWithCommas(exists)}
                        <ShowingTags itemData={itemData} />
                    </div>
                </div>
                <div className="ml-auto">
                    <ItemDropdownMenu itemData={itemData} />
                </div>
            </div>
            <div className="flex w-[95%] h-full p-5 border rounded-xl shadow-lg">

            </div>
        </div>
    </>
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