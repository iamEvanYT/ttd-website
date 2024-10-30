// Items
export type ItemTypes = "Troops" | "Crates"

/**
 * Represents the data structure for an item in the game.
*/
export interface ItemData {
    id: string;
    display: string;
    rarity: keyof typeof Rarity;
    image: number;
}

/**
 * Extend the data structure to include useful data for an item in the game.
*/
export type ExtendedItemData = {
    type: ItemTypes,
    exists: number,
    imageURL: string,
} & ItemData;

// Sorting / Filtering
/**
 * Represents what can be filtered/sorted on fetch requests.
 */
export interface FetchOptions {
    SortingOrder: SortingOrder,
    SortBy: SortingOptions,

    name?: string,
}

/**
 * An enum that represents the roder of which units/crates can be sorted.
 */
export enum SortingOrder {
    "ascending",
    "descending"
}

/**
 * An enum that represents how units/crates can be sorted.
 */
export enum SortingOptions {
    "name",
    "rarity",
    "exist_count",
}

// Crates
/**
 * Represents the data structure for a crate.
 */
export type CrateData = {
    items?: CrateContent[];
} & ItemData;

export type ExtendedCrateData = CrateData & ExtendedItemData & {
    inferredExists?: number | null
};

export interface CrateContent {
    ItemId: string;
    Chance: number;
}

// Troops
/**
 * Represents the data structure for a troop.
 */
export type TroopData = {
    levels: number;
    price?: number;
    display: string;
    tags?: string[];
    upgradePrices?: number[];
    abilities?: {
        [key: string]: any;
    }
} & ItemData;

export type ExtendedTroopData = TroopData & ExtendedItemData & {
    shinyExists: number,
};

// Exists
export type StructuredExistCount = {
    type: string,
    id: string,
    count: number
};

/**
 * Represents a key-value pair for existence counts.
 */
export interface ExistCount {
    key: string;
    value: string;
}

// Summons
/**
 * Represents the summon banners data.
 */
export type SummonBanners = {
    [bannerId: string]: SummonItem[];
}

export interface SummonItem {
    id: string;
    chance: number;
}

export type ExtendedSummonItem = (ExtendedItemData | {}) & {
    chance: number
}

export type SummonBannerData = {
    id: string;
    display: string;
    displayPrice: string;
    items?: ExtendedSummonItem[];
}

// Rarity
/**
 * Represents all of the possible rarities a troop/crate can have
 * Make sure to have it always be sorted in a descending rarity scale
 */
export enum Rarity {
    "Ultimate",
    "Exclusive",
    "Godly",
    "Mythic",
    "Legendary",
    "Epic",
    "Rare",
    "Uncommon",
    "Basic"
}

// Exist History
export type RetrievalMode = 'lastDay' | 'lastWeek' | 'lastMonth' | 'lastYear';
export type VariantMode = 'normal' | 'shiny';

// Request payload for getExistCountHistory
export interface GetExistCountHistoryRequest {
    type: string;
    id: string;
    retrievalMode: RetrievalMode;
}

// Response item for getExistCountHistory
export interface ExistCountHistoryItem {
    recordedAt: string; // ISO date string
    amount: number;
}