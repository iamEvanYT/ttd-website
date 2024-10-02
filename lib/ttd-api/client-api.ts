"use server"

// Basically, despite the naming, it works on the server, and should be the only api exposed to the client.

import { getCrateDatas, getTroopDatas } from "@/lib/ttd-api/api"
import type { ExtendedItemData, FetchOptions, ItemTypes } from "./types";
import { DATABASE_PAGE_SIZE } from "@/configuration";

function filterResults<ItemDataType>(results: (ItemDataType & ExtendedItemData)[], options: FetchOptions) {
    if (options.name && typeof options.name === "string") {
        const loweredQuery = options.name.toLowerCase();
        results = results.filter((result) => result.display.toLowerCase().includes(loweredQuery));
    }

    return results
}

function paginateResults(results: any[], page: number) {
    // Ensure the page number is at least 1
    const currentPage = Math.max(1, page);

    // Calculate the starting index
    const start = (currentPage - 1) * DATABASE_PAGE_SIZE;

    // Calculate the ending index
    const end = start + DATABASE_PAGE_SIZE;

    // Slice the data to get items for the current page
    const items = results.slice(start, end);

    // Calculate the total number of pages
    const totalPages = Math.ceil(results.length / DATABASE_PAGE_SIZE);

    // Optionally, ensure the current page does not exceed totalPages
    const validatedPage = Math.min(currentPage, totalPages);

    return {
        items,
        page: validatedPage,
        totalPages
    };
}

export async function getTroopsPage(page: number, options: FetchOptions) {
    let troopDatas = await getTroopDatas();
    if (!troopDatas) {
        return paginateResults([], 1);
    }

    troopDatas = filterResults(troopDatas, options);
    return paginateResults(troopDatas, page);
}

export async function getCratesPage(page: number, options: FetchOptions) {
    let crateDatas = await getCrateDatas();
    if (!crateDatas) {
        return paginateResults([], 1);
    }

    crateDatas = filterResults(crateDatas, options);
    return paginateResults(crateDatas, page);
}

export async function getItemsPage(type: ItemTypes, page: number, options: FetchOptions) {
    if (type == "Troops") {
        return await getTroopsPage(page, options)
    } else if (type == "Crates") {
        return await getCratesPage(page, options)
    } else {
        return {
            items: [],
            page: 0,
            totalPages: 0
        }
    }
}