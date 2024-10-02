"use client"

// TODO: Fix everything!!!
// Use pagination https://ui.shadcn.com/docs/components/pagination (installed)

import { ItemCard } from "@/components/database/item-card";
import { DATABASE_LOAD_COOLDOWN } from "@/configuration";
import { getItemsPage } from "@/lib/ttd-api/client-api";

import type { ExtendedItemData, FetchOptions, ItemTypes } from "@/lib/ttd-api/types";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import ItemSearchBar from "./item-search-bar";
import { PaginationComponent } from "./item-pagination";
import { LoadingSpinner } from "../ui/loading";

export function ItemGrid({
    type
}: {
    type: ItemTypes
}) {
    const [items, setItems] = useState<ExtendedItemData[]>([]);
    const [loading, setLoading] = useState(false);

    const [page, setPage] = useState(1);
    const [maxPages, setMaxPages] = useState(1);

    const [loadCooldown, setLoadCooldown] = useState(false);
    const [prevSearchQuery, setPrevSearchQuery] = useState<string | null>(null);

    const searchParams = useSearchParams();
    const searchQuery = searchParams.get("q");

    useEffect(() => {
        if (searchQuery !== prevSearchQuery) {
            setLoadCooldown(false);
            setPage(1);
            setMaxPages(1);

            setPrevSearchQuery(searchQuery);
        }

        if (!loadCooldown) {
            setLoadCooldown(true);

            const options: FetchOptions = {
                name: searchQuery || undefined,
            };

            setLoading(true);

            getItemsPage(type, page, options).then((pageData) => {
                if (!pageData) {
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
                setLoading(false);
                console.log("newItems", newItems)

                setTimeout(() => {
                    setLoadCooldown(false);
                }, DATABASE_LOAD_COOLDOWN);
            });
        }
    }, [page, maxPages, searchQuery]);

    return (
        <div className="container mx-auto p-4">
            <ItemSearchBar type={type} className="mb-4" />

            {loading && <div className="align-baseline flex justify-center py-10">
                <LoadingSpinner />
            </div>}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pb-5">
                {items.map((item, index) => (
                    <ItemCard key={index} {...item} />
                ))}
            </div>

            {(loading && items.length > 0) && <div className="align-baseline flex justify-center py-10">
                <LoadingSpinner />
            </div>}

            <PaginationComponent page={page} maxPages={maxPages} onPageChange={(page) => setPage(page)} />
        </div>
    )
}