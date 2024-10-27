"use server"

// Basically, despite the naming, it works on the server, and should be the only api exposed to the client.

import { getCrateDatas, getSummonDatas, getTroopDatas } from "@/lib/ttd-api/api"
import type { ExtendedItemData, FetchOptions, ItemTypes, RetrievalMode, VariantMode } from "./types";
import { DATABASE_PAGE_SIZE } from "@/configuration";
import Sort from "./sorting";
import { getExistCountHistory } from "./raw-api";

// Pages
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
    // Ensure that totalPages is at least 1
    const calculatedTotalPages = Math.ceil(results.length / DATABASE_PAGE_SIZE);
    const totalPages = Math.max(1, calculatedTotalPages);

    // Ensure the current page does not exceed totalPages
    const validatedPage = Math.min(currentPage, totalPages);

    return {
        items,
        page: validatedPage,
        totalPages
    };
}

export async function getTroopsPage(page: number, options: FetchOptions) {
    let troopDatas = await getTroopDatas();
    if (!troopDatas) return paginateResults([], 1);

    troopDatas = filterResults(troopDatas, options);
    troopDatas = await Sort(troopDatas, options.SortingOrder, options.SortBy) as any;

    return paginateResults(troopDatas!, page);
}

export async function getCratesPage(page: number, options: FetchOptions) {
    let crateDatas = await getCrateDatas();
    if (!crateDatas) return paginateResults([], 1);

    crateDatas = filterResults(crateDatas, options);
    crateDatas = await Sort(crateDatas, options.SortingOrder, options.SortBy);

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

// Datas
export async function getTroopData(id: string) {
    const troopDatas = await getTroopDatas();
    if (!troopDatas) {
        return null
    }

    return troopDatas.find((troopData) => troopData.id.toLowerCase() == id.toLowerCase());
}
export async function getCrateData(id: string) {
    const crateDatas = await getCrateDatas();
    if (!crateDatas) {
        return null
    }

    return crateDatas.find((crateData) => crateData.id.toLowerCase() == id.toLowerCase());
}

export async function getItemData(type: ItemTypes, id: string) {
    if (type == "Troops") {
        return await getTroopData(id)
    } else if (type == "Crates") {
        return await getCrateData(id)
    } else {
        return null
    }
}

// Summons
export async function getSummons() {
    return await getSummonDatas()
}

// Exist History
export async function getItemExistHistory(type: string, id: string, variantMode: VariantMode, retrievalMode: RetrievalMode) {
    return await getExistCountHistory(type, id, variantMode, retrievalMode)
}

export async function getTotalItemExistHistory(retrievalMode: RetrievalMode) {
    const promises = [
        getExistCountHistory("Special", "Total", "normal", retrievalMode),
        getExistCountHistory("Special", "Troops", "normal", retrievalMode),
        getExistCountHistory("Special", "Crates", "normal", retrievalMode)
    ]

    return await Promise.all(promises);
}