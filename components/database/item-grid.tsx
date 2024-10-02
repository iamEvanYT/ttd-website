"use client"

import { ItemCard } from "@/components/database/item-card";
import { LoadingSpinner } from "@/components/ui/loading";
import { DATABASE_INCREMENTS, DATABASE_LOAD_COOLDOWN } from "@/configuration";
import { getItems } from "@/lib/ttd-api/client-api";
import { ExtendedItemData, ItemTypes } from "@/lib/ttd-api/types";

import { useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export function ItemGrid({
    type
}: {
    type: ItemTypes
}) {
    const [items, setItems] = useState<ExtendedItemData[]>([]);
    const [isFinished, setIsFinished] = useState(false);
    const [loadedCount, setLoadedCount] = useState(0);
    const [loadCooldown, setLoadCooldown] = useState(false);

    const loadingRef = useRef(null);
    const isInView = useInView(loadingRef);

    useEffect(() => {
        if (isInView && !isFinished && !loadCooldown) {
            getItems(type, loadedCount, DATABASE_INCREMENTS).then((addingItems) => {
                setLoadCooldown(true);

                if (addingItems.length < DATABASE_INCREMENTS) {
                    setIsFinished(true);
                }
    
                setLoadedCount(loadedCount + DATABASE_INCREMENTS);
    
                const newItems = items.concat(addingItems);
                setItems(newItems);

                setTimeout(() => {
                    setLoadCooldown(false);
                }, DATABASE_LOAD_COOLDOWN);
            });
        }
    }, [isInView, loadedCount, isFinished, loadCooldown]);

    return (
        <div className="container mx-auto p-4">
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