"use client"

import { ItemCard } from "@/components/database/item-card";
import { DATABASE_LOAD_COOLDOWN } from "@/configuration";
import { getItemsPage } from "@/lib/ttd-api/client-api";

import { SortingOptions, SortingOrder, type ExtendedItemData, type FetchOptions, type ItemTypes } from "@/lib/ttd-api/types";

import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import ItemSearchBar from "./item-search-bar";
import { PaginationComponent } from "./item-pagination";
import { LoadingSpinner } from "../ui/loading";
import Link from "next/link";

const databaseItemTypes = {
    "Troops": "units",
    "Crates": "crates",
}

export function ItemGrid({
    type
}: {
    type: ItemTypes
}) {
    const [items, setItems] = useState<ExtendedItemData[]>([]);

    // it is set to initial so that 'No items found' text does not appear
    let [loadingId, reactSetLoadingId] = useState<string | null>("initial");
    function setLoadingId(id: typeof loadingId): void {
        reactSetLoadingId(id);
        loadingId = id;
    }

    const loadCooldownRef = useRef(false);
    const prevSearchQuery = useRef<string | null>(null);
    const prevSortOrder = useRef<SortingOrder | null>(null);
    const prevSortOption = useRef<SortingOptions | null>(null);

    const [page, setPage] = useState(1);
    const [maxPages, setMaxPages] = useState(1);

    const [sortingOrder, setSortingOrder] = useState<SortingOrder>(SortingOrder.descending);
    const [sortingOption, setSortingOption] = useState<SortingOptions>(SortingOptions.rarity);

    const searchParams = useSearchParams();
    const searchQuery = searchParams.get("q");

    function setFallbackStates() {
        setPage(1);
        setMaxPages(1);
        setItems([]);

        setLoadingId(null);
        loadCooldownRef.current = false;
    }

    useEffect(() => {
        if (searchQuery !== prevSearchQuery.current || prevSortOption.current !== sortingOption || prevSortOrder.current !== sortingOrder) {
            loadCooldownRef.current = false;
            prevSearchQuery.current = searchQuery;
            
            prevSortOption.current = sortingOption;
            prevSortOrder.current = sortingOrder;

            setPage(1);
            setMaxPages(1);
        }

        if (!loadCooldownRef.current) {
            loadCooldownRef.current = true;

            const options: FetchOptions = {
                SortBy: sortingOption,
                SortingOrder: sortingOrder,

                name: searchQuery || undefined,
            };

            const thisLoadId = crypto.randomUUID();
            setLoadingId(thisLoadId);

            getItemsPage(type, page, options).then((pageData) => {
                if (!pageData) {
                    return setFallbackStates();
                }
                if (loadingId !== thisLoadId) {
                    return setFallbackStates();
                }

                const {
                    totalPages,
                    page,
                    items: newItems
                } = pageData;

                setPage(page);
                setMaxPages(totalPages);

                setItems(newItems);
                setLoadingId(null);

                setTimeout(() => {
                    loadCooldownRef.current = false;
                }, DATABASE_LOAD_COOLDOWN);
            }).catch(setFallbackStates);
        }
    }, [page, maxPages, searchQuery, sortingOption, sortingOrder]);

    return (
        <div className="container mx-auto p-4">
            <ItemSearchBar 
                SortingOptionsState={[sortingOption, setSortingOption]} 
                SortingOrderState={[sortingOrder, setSortingOrder]} 
                type={type} className="mb-4" 
            />

            {loadingId && <div className="align-baseline flex justify-center py-10">
                <LoadingSpinner />
            </div>}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pb-5">
                {items.map((item, index) => (
                    <Link href={`/database/${databaseItemTypes[type]}/${item.id}`} key={item.id || index}>
                        <ItemCard {...item} />
                    </Link>
                ))}
            </div>

            {(loadingId && items.length > 0) && <div className="align-baseline flex justify-center py-10">
                <LoadingSpinner />
            </div>}

            {(!loadingId && items.length < 1) && <div className="align-baseline flex justify-center py-10">
                No items found.
            </div>}

            <PaginationComponent page={page} maxPages={maxPages} onPageChange={(page) => setPage(page)} />
        </div>
    )
}