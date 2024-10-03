"use client"

import { getItemData } from "@/lib/ttd-api/client-api";
import type { ExtendedItemData, ExtendedTroopData, ItemTypes } from "@/lib/ttd-api/types";
import Image from "next/image";
import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button";
import { toast } from 'sonner';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useEffect, useState } from "react";
import { LoadingSpinner } from "../ui/loading";
import { DatabaseTopbar } from "./topbar";

function numberWithCommas(x: number) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function downloadFile(file: File) {
    // Create a link and set the URL using `createObjectURL`
    const link = document.createElement('a');
    link.style.display = 'none';
    link.href = URL.createObjectURL(file);
    link.download = file.name;

    // It needs to be added to the DOM so it can be clicked
    document.body.appendChild(link);
    link.click();

    // To make this work on Firefox we need to wait
    // a little while before removing it.
    setTimeout(() => {
        URL.revokeObjectURL(link.href);
        link.parentNode?.removeChild(link);
    }, 100);
}

function ItemDropdownMenu({
    itemData
}: {
    itemData: ExtendedTroopData | ExtendedItemData
}) {
    async function copyItemDisplay() {
        const promise = (async () => {
            navigator.clipboard.writeText(itemData.display)
        })()

        toast.promise(
            promise,
            {
                loading: 'Copying...',
                success: (() => "Copied item name!"),
                error: (() => "Could not copy."),
            }
        )
    }

    async function getImageBlob() {
        const response = await fetch(itemData.imageURL);
        const pngImageBlob = await response.blob();
        return pngImageBlob
    }

    async function downloadItemImage() {
        const promise = (async () => {
            const pngImageBlob = await getImageBlob();
            downloadFile(new File([pngImageBlob], itemData.id + '.png', { type: 'image/png' }));
        })()

        toast.promise(
            promise,
            {
                loading: 'Fetching...',
                success: "Fetched image!",
                error: "Could not fetch.",
            }
        )
    }

    function copyItemImage() {
        const promise = (async () => {
            const pngImageBlob = await getImageBlob();
            await navigator.clipboard.write([
                new ClipboardItem({
                    'image/png': pngImageBlob
                })
            ]);
        })()

        toast.promise(
            promise,
            {
                loading: 'Copying...',
                success: (() => "Copied image!"),
                error: (() => "Could not copy."),
            }
        )
    }

    function refreshPage() {
        window.location.reload();
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem onClick={copyItemDisplay}>
                    Copy Item Name
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={downloadItemImage}>Save Item Image</DropdownMenuItem>
                <DropdownMenuItem onClick={copyItemImage}>Copy Item Image</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={refreshPage}>Refresh Page</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>

    )
}

export function DatabaseItemDetails({
    type,
    id
}: {
    type: ItemTypes,
    id: string,
}) {
    const [loading, setLoading] = useState(true);
    const [itemData, setItemData] = useState<ExtendedItemData | null | undefined>(null);

    useEffect(() => {
        setLoading(true);
        getItemData(type, id).then((newItemData) => {
            setItemData(newItemData);
            setLoading(false);
        }).catch(() => {
            setLoading(false);
        })
    }, []);
    if (!itemData) {
        return (
            <div className="align-baseline flex justify-center py-10">
                {!loading && "Item not found."}
                {loading && <LoadingSpinner />}
            </div>
        )
    }

    const {
        display: displayName,
        exists,
        imageURL
    } = itemData;

    return <>
        <title>{`${displayName} - Database`}</title>
        <div className="flex justify-center m-5">
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
                    </div>
                </div>
                <div className="ml-auto">
                    <ItemDropdownMenu itemData={itemData} />
                </div>
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