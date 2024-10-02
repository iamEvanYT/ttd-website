"use client"

import { ItemCard } from "@/components/database/item-card";
import { LoadingSpinner } from "@/components/ui/loading";
import { DATABASE_INCREMENTS, DATABASE_LOAD_COOLDOWN } from "@/configuration";
import { getItems } from "@/lib/ttd-api/client-api";

import type { ExtendedItemData, FetchOptions, ItemTypes } from "@/lib/ttd-api/types";

import { useInView } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import ItemSearchBar from "./item-searchbar";

export function ItemGrid({
    type
}: {
    type: ItemTypes
}) {
    const [items, setItems] = useState<ExtendedItemData[]>([]);
    const [isFinished, setIsFinished] = useState(false);
    const [loadedCount, setLoadedCount] = useState(0);
    const [loadCooldown, setLoadCooldown] = useState(false);
    const [prevSearchParams, setPrevSearchParams] = useState<string | null>(null);
    const [isInView, setIsInView] = useState<boolean>(true);


    const loadingRef = useRef(null);
    const searchParams = useSearchParams();

    useEffect(() => {
        if (searchParams.get("q") !== prevSearchParams) {
            setItems([]);
            setLoadedCount(0);
            setIsFinished(false);
            setLoadCooldown(false);
        }

        if ((isInView && !isFinished && !loadCooldown) || searchParams.get("q") !== prevSearchParams) {
            const options: FetchOptions = {
                name: searchParams.get("q") || undefined,
            };

            getItems(type, loadedCount, DATABASE_INCREMENTS, options).then((addingItems) => {
                setLoadCooldown(true);

                if (addingItems.length < DATABASE_INCREMENTS) {
                    setIsFinished(true);
                }
    
                setLoadedCount(loadedCount + DATABASE_INCREMENTS);
    
                const newItems = items.concat(addingItems);
                setItems(newItems);

                setPrevSearchParams(searchParams.get("q"));

                setTimeout(() => {
                    setLoadCooldown(false);
                }, DATABASE_LOAD_COOLDOWN);
            });
        }
    }, [isInView, loadedCount, isFinished, loadCooldown, searchParams, prevSearchParams]);

    const onScroll = () => {
        setIsInView(window.scrollY + window.innerHeight >= document.body.scrollHeight - 200);
    }

    useEffect(() => {
        if (typeof window === "undefined") return;

        window.addEventListener("scroll", onScroll);

        return () => {
            window.removeEventListener("scroll", onScroll);
        };
    }, []);

    return (
        <div className="container mx-auto p-4">
            <ItemSearchBar type={type} className="mb-4" />

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pb-5">
                {items.map((item, index) => (
                    <ItemCard key={index} {...item} />
                ))}
            </div>
            {!isFinished && <div className="align-baseline flex justify-center py-10">
                <LoadingSpinner ref={loadingRef} />
            </div>}
        </div>
    )
}