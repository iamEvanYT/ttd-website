"use server"

// Basically, despite the naming, it works on the server, and should be the only api exposed to the client.

import { getCrateDatas, getTroopDatas } from "@/lib/ttd-api/api"
import type { FetchOptions, ItemTypes } from "./types";

export async function getTroops(start: number, count: number, options: FetchOptions) {
    let troopDatas = await getTroopDatas();
    if (!troopDatas) {
        return []
    }

    if (options.name) {
        troopDatas = troopDatas.filter((troop) => troop.display.toLowerCase().includes(options.name!)); // simple function for now, if needed make it more complex in the future
    }

    return troopDatas.slice(start, start + count);
}

export async function getCrates(start: number, count: number, options: FetchOptions) {
    let crateDatas = await getCrateDatas();
    if (!crateDatas) {
        return []
    }

    if (options.name) {
        crateDatas = crateDatas.filter((crate) => crate.display.toLowerCase().includes(options.name!));
    }

    return crateDatas.slice(start, start + count);
}

export async function getItems(type: ItemTypes, start: number, count: number, options: FetchOptions) {
    if (type == "Troops") {
        return await getTroops(start, count, options)
    } else if (type == "Crates") {
        return await getCrates(start, count, options)
    } else {
        return []
    }
}