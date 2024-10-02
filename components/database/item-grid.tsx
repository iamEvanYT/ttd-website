"use client"

import { ItemCard } from "@/components/database/item-card";
import { DATABASE_LOAD_COOLDOWN } from "@/configuration";
import { getItemsPage } from "@/lib/ttd-api/client-api";

import type { ExtendedItemData, FetchOptions, ItemTypes } from "@/lib/ttd-api/types";

import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import ItemSearchBar from "./item-search-bar";
import { PaginationComponent } from "./item-pagination";
import { LoadingSpinner } from "../ui/loading";

export function ItemGrid({
    type
}: {
    type: ItemTypes
}) {
    const [items, setItems] = useState<ExtendedItemData[]>([]);

    const loadingIdRef = useRef<string | null>(null);
    const loadCooldownRef = useRef(false);
    const prevSearchQuery = useRef<string | null>(null);

    const [page, setPage] = useState(1);
    const [maxPages, setMaxPages] = useState(1);

    const searchParams = useSearchParams();
    const searchQuery = searchParams.get("q");

    useEffect(() => {
        if (searchQuery !== prevSearchQuery.current) {
            loadCooldownRef.current = false;
            prevSearchQuery.current = searchQuery;

            setPage(1);
            setMaxPages(1);
        }

        if (!loadCooldownRef.current) {
            loadCooldownRef.current = true;

            const options: FetchOptions = {
                name: searchQuery || undefined,
            };

            const thisLoadId = crypto.randomUUID();
            loadingIdRef.current = thisLoadId;

            getItemsPage(type, page, options).then((pageData) => {
                if (!pageData) {
                    return;
                }
                if (loadingIdRef.current !== thisLoadId) {
                    return;
                }

                const {
                    totalPages,
                    page,
                    items: newItems
                } = pageData;

                setPage(page);
                setMaxPages(totalPages);

                setItems(newItems);
                loadingIdRef.current = null;

                setTimeout(() => {
                    loadCooldownRef.current = false;
                }, DATABASE_LOAD_COOLDOWN);
            });
        }
    }, [page, maxPages, searchQuery]);

    return (
        <div className="container mx-auto p-4">
            <ItemSearchBar type={type} className="mb-4" />

            {loadingIdRef.current && <div className="align-baseline flex justify-center py-10">
                <LoadingSpinner />
            </div>}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pb-5">
                {items.map((item, index) => (
                    <ItemCard key={index} {...item} />
                ))}
            </div>

            {(loadingIdRef.current && items.length > 0) && <div className="align-baseline flex justify-center py-10">
                <LoadingSpinner />
            </div>}

            <PaginationComponent page={page} maxPages={maxPages} onPageChange={(page) => setPage(page)} />
        </div>
    )
}