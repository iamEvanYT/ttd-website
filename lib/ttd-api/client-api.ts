"use server"

// Basically, despite the naming, it works on the server, and should be the only api exposed to the client.

import { getCrateDatas, getTroopDatas } from "@/lib/ttd-api/api"
import { ItemTypes } from "./types";

export async function getTroops(start: number, count: number) {
    const troopDatas = await getTroopDatas();
    if (!troopDatas) {
        return []
    }

    return troopDatas.slice(start, start + count);
}

export async function getCrates(start: number, count: number) {
    const troopDatas = await getCrateDatas();
    if (!troopDatas) {
        return []
    }

    return troopDatas.slice(start, start + count);
}

export async function getItems(type: ItemTypes, start: number, count: number) {
    if (type == "Troops") {
        return await getTroops(start, count)
    } else if (type == "Crates") {
        return await getCrates(start, count)
    } else {
        return []
    }
}