import { getCrateData, getCrateDisplays, getExistCount, getTroopData, getTroopDisplays } from "@/lib/ttd-api/raw-api";
import { ExtendedCrateData, ExtendedTroopData, Rarity, StructuredExistCount } from "./types";

const REFRESH_INTERVAL = (5 * 60 * 1000)

const rarities = Object.values(Rarity);

// Cache //
type ttdAPIData = {
    existCounts: StructuredExistCount[] | null;
    troopDatas: ExtendedTroopData[] | null;
    crateDatas: ExtendedCrateData[] | null;

    refreshIntervalID: any | null;
}

declare namespace global {
    var ttdAPIData: ttdAPIData
}

const ttdAPIData: ttdAPIData = global.ttdAPIData || {
    existCounts: null,
    troopDatas: null,
    crateDatas: null,

    refreshIntervalID: null,
}

global.ttdAPIData = ttdAPIData

export async function refreshExistCount() {
    return await getExistCount().then((rawExistCounts) => {
        if (!rawExistCounts) {
            return false
        }

        const newExistCounts = rawExistCounts.map(({ key, value }) => {
            const [itemType, itemId] = key.split(":");

            const count = parseInt(value);
            if (!count) {
                return null
            }

            return {
                type: itemType,
                id: itemId,
                count
            }
        }).filter((existCount) => (existCount !== null));

        ttdAPIData.existCounts = newExistCounts

        return true
    }).catch(() => false);
}

async function refreshTroops() {
    return await getTroopDisplays().then(async (troopDisplays) => {
        if (!troopDisplays) {
            return false
        }

        const newTroopDatas: ExtendedTroopData[] = []

        const promises = Object.keys(troopDisplays).map((troopId: string) => {
            return getTroopData(troopId).then((troopData) => {
                if (!troopData) {
                    return
                }

                const existsData = (ttdAPIData.existCounts && ttdAPIData.existCounts.find(({ type, id }) => {
                    return type === "Troops" && id === troopData.id
                }));

                const extendedTroopData: ExtendedTroopData = {
                    ...troopData,
                    type: "Troops",
                    exists: existsData?.count || 0,
                    imageURL: `https://api.toilettowerdefense.com/image/${troopData.image || 123456789}`
                }

                newTroopDatas.push(extendedTroopData)
            }).catch(() => null);
        });

        await Promise.all(promises);

        newTroopDatas.sort((a, b) => {
            const aRarity = rarities.indexOf(a.rarity) + 1;
            const bRarity = rarities.indexOf(b.rarity) + 1;
            // First, compare the rarity
            if (aRarity !== bRarity) {
                return aRarity - bRarity;
            }

            const aExists = (a.exists ?? 0);
            const bExists = (b.exists ?? 0);
            if (aExists !== bExists) {
                return aExists - bExists;
            }

            // If rarity is the same, sort by name alphabetically
            return a.display.localeCompare(b.display);
        });

        ttdAPIData.troopDatas = newTroopDatas;
        return true
    }).catch(() => false);
}

async function refreshCrates() {
    return await getCrateDisplays().then(async (crateDisplays) => {
        if (!crateDisplays) {
            return false
        }

        const newCrateDatas: ExtendedCrateData[] = []

        const promises = Object.keys(crateDisplays).map((crateId: string) => {
            return getCrateData(crateId).then((crateData) => {
                if (!crateData) {
                    return
                }

                const existsData = (ttdAPIData.existCounts && ttdAPIData.existCounts.find(({ type, id }) => {
                    return type === "Crates" && id === crateData.id
                }));

                const exists = (existsData?.count || 0);

                let inferredExists = null;
                if (crateData.items) {
                    let itemsExists = 0;

                    crateData.items.forEach(({ ItemId, Chance }) => {
                        const troopData = ttdAPIData.troopDatas?.find(({ id }) => id === ItemId);
                        if (!troopData) {
                            return;
                        }

                        itemsExists += troopData.exists
                    })

                    inferredExists = (exists - itemsExists);
                }

                const extendedTroopData: ExtendedCrateData = {
                    ...crateData,
                    type: "Crates",
                    exists,
                    inferredExists,
                    imageURL: `https://api.toilettowerdefense.com/image/${crateData.image || 123456789}`
                }

                newCrateDatas.push(extendedTroopData)
            }).catch(() => null);
        });

        await Promise.all(promises);

        newCrateDatas.sort((a, b) => {
            const aRarity = rarities.indexOf(a.rarity) + 1;
            const bRarity = rarities.indexOf(b.rarity) + 1;
            // First, compare the rarity
            if (aRarity !== bRarity) {
                return aRarity - bRarity;
            }

            const aExists = (a.exists ?? 0);
            const bExists = (b.exists ?? 0);
            if (aExists !== bExists) {
                return aExists - bExists;
            }

            // If rarity is the same, sort by name alphabetically
            return a.display.localeCompare(b.display);
        });

        ttdAPIData.crateDatas = newCrateDatas;
        return true
    }).catch(() => false);
}

let refreshPromise: Promise<boolean> | null = null;
export function refreshCache() {
    if (refreshPromise) {
        return refreshPromise;
    }

    refreshPromise = (async () => {
        const refreshedExistCount = await refreshExistCount();
        if (!refreshedExistCount) {
            return false
        }

        const refreshedTroops = await refreshTroops();
        if (!refreshedTroops) {
            return false
        }

        const refreshedCrates = await refreshCrates();
        if (!refreshedCrates) {
            return false
        }

        refreshPromise = null
        return true
    })()

    return refreshPromise
}

if (!ttdAPIData.refreshIntervalID) {
    refreshCache()
    ttdAPIData.refreshIntervalID = setInterval(refreshCache, REFRESH_INTERVAL);

    console.log("TTD API Service Started!")
}

// Grabber //
export async function getExistCounts() {
    if (!ttdAPIData.existCounts) {
        await refreshCache();
    }
    return ttdAPIData.existCounts
}

export async function getTroopDatas() {
    if (!ttdAPIData.troopDatas) {
        await refreshCache();
    }
    return ttdAPIData.troopDatas
}

export async function getCrateDatas() {
    if (!ttdAPIData.crateDatas) {
        await refreshCache();
    }
    return ttdAPIData.crateDatas
}