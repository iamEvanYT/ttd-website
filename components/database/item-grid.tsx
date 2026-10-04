"use client"

import { ItemCard, SkeletonItemCard } from "@/components/database/item-card";
import { DATABASE_PAGE_SIZE } from "@/configuration";
import { getItemsPage } from "@/lib/ttd-api/client-api";

import { SortingOptions, SortingOrder, type FetchOptions, type ItemTypes } from "@/lib/ttd-api/types";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
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
    const [requestedPage, setPage] = useState(1);

    const [sortingOrder, setSortingOrder] = useState<SortingOrder>(defaultSortOrder);
    const [sortingOption, setSortingOption] = useState<SortingOptions>(defaultSortOption);

    const searchParams = useSearchParams();
    const searchQuery = searchParams.get("q");

    const options: FetchOptions = {
        SortBy: sortingOption,
        SortingOrder: sortingOrder,

        name: searchQuery || undefined,
    };
    const { isPending, error, data } = useQuery({
        queryKey: ["getItemsPage", type, requestedPage, options],
        queryFn: async () => {
            return await getItemsPage(type, requestedPage, options);
        },
    });

    const items = data?.items ?? [];
    const page = data?.page ?? requestedPage;
    const maxPages = data?.totalPages ?? 1;

    return (
        <div className="container mx-auto px-4 md:px-6 pb-20">
            <ItemSearchBar
                SortingOptionsState={[sortingOption, setSortingOption]}
                SortingOrderState={[sortingOrder, setSortingOrder]}
                type={type} className="mb-6"
            />

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 pb-8">
                {isPending && ((items.length > 0 && items) || new Array(DATABASE_PAGE_SIZE).fill("")).map((_, index) => {
                    return <SkeletonItemCard key={`skeleton-${index}`} />
                })}
                {!isPending && items.map((item, index) => (
                    <Link href={`/database/${databaseItemTypes[type]}/${item.id}`} key={item.id || index} className="block h-full">
                        <ItemCard {...item} />
                    </Link>
                ))}
            </div>

            {(!isPending && !error && items.length < 1) && <div className="flex justify-center rounded-2xl border border-dashed py-16 text-muted-foreground">
                No items found.
            </div>}

            {(!isPending && error) && <div className="flex justify-center rounded-2xl border border-dashed py-16 text-muted-foreground">
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
