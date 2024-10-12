"use client"

import { ItemCard, SkeletonItemCard } from "@/components/database/item-card";
import { DATABASE_PAGE_SIZE } from "@/configuration";
import { getItemsPage } from "@/lib/ttd-api/client-api";

import { SortingOptions, SortingOrder, type ExtendedItemData, type FetchOptions, type ItemTypes } from "@/lib/ttd-api/types";

import { useSearchParams } from "next/navigation";
import { useReducer, useRef, useState } from "react";
import ItemSearchBar from "./item-search-bar";
import { PaginationComponent } from "./item-pagination";
import Link from "next/link";

import {
    useQuery,
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'

const defaultSortOrder = SortingOrder.descending;
const defaultSortOption = SortingOptions.rarity;

const databaseItemTypes = {
    "Troops": "units",
    "Crates": "crates",
}

const queryClient = new QueryClient()

type ItemGridProps = {
    type: ItemTypes
}

function RawItemGrid({
    type
}: ItemGridProps) {
    const itemsRef = useRef<ExtendedItemData[]>([]);

    const pageRef = useRef(1);
    const maxPagesRef = useRef(1);

    const [sortingOrder, setSortingOrder] = useState<SortingOrder>(defaultSortOrder);
    const [sortingOption, setSortingOption] = useState<SortingOptions>(defaultSortOption);

    const searchParams = useSearchParams();
    const searchQuery = searchParams.get("q");

    const [, forceUpdate] = useReducer(x => x + 1, 0);

    const options: FetchOptions = {
        SortBy: sortingOption,
        SortingOrder: sortingOrder,

        name: searchQuery || undefined,
    };
    const { isPending, error, data } = useQuery({
        queryKey: ["getItemsPage", type, pageRef.current, options],
        queryFn: async () => {
            return await getItemsPage(type, pageRef.current, options);
        },
    });

    if (data) {
        const {
            items,
            page,
            totalPages
        } = data;

        itemsRef.current = items;
        pageRef.current = page;
        maxPagesRef.current = totalPages;
    }

    const items = itemsRef.current;
    const page = pageRef.current;
    const maxPages = maxPagesRef.current;

    function setPage(newPage: number) {
        pageRef.current = newPage;
        forceUpdate();
    }

    return (
        <div className="container mx-auto p-4">
            <ItemSearchBar
                SortingOptionsState={[sortingOption, setSortingOption]}
                SortingOrderState={[sortingOrder, setSortingOrder]}
                type={type} className="mb-4"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pb-5">
                {isPending && ((items.length > 0 && items) || new Array(DATABASE_PAGE_SIZE).fill("")).map((_, index) => {
                    return <SkeletonItemCard key={`skeleton-${index}`} />
                })}
                {!isPending && items.map((item, index) => (
                    <Link href={`/database/${databaseItemTypes[type]}/${item.id}`} key={item.id || index}>
                        <ItemCard {...item} />
                    </Link>
                ))}
            </div>

            {(!isPending && !error && items.length < 1) && <div className="align-baseline flex justify-center py-10">
                No items found.
            </div>}

            {(!isPending && error) && <div className="align-baseline flex justify-center py-10">
                Error occurred when fetching items.
            </div>}

            <PaginationComponent page={page} maxPages={maxPages} onPageChange={(page) => setPage(page)} />
        </div>
    )
}

export function ItemGrid({
    ...props
}: ItemGridProps) {
    return (
        <QueryClientProvider client={queryClient}>
            <RawItemGrid {...props} />
        </QueryClientProvider>
    )
}