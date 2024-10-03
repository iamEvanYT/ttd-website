"use client"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ExtendedItemData, ExtendedTroopData } from "@/lib/ttd-api/types";
import { toast } from 'sonner';
import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import dynamic from 'next/dynamic'

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

function RawItemDropdownMenu({
    itemData
}: {
    itemData: ExtendedTroopData | ExtendedItemData
}) {
    const router = useRouter();

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

    async function copyItemExists() {
        const promise = (async () => {
            navigator.clipboard.writeText(itemData.exists.toString())
        })()

        toast.promise(
            promise,
            {
                loading: 'Copying...',
                success: (() => "Copied item exists count!"),
                error: (() => "Could not copy exists."),
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
        router.refresh();
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
                <DropdownMenuItem onClick={copyItemExists}>
                    Copy Item Exists
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

// Only render this menu if JavaScript is enabled, don't render it on server.
export const ItemDropdownMenu = dynamic(async () => RawItemDropdownMenu, {
    ssr: false,
})