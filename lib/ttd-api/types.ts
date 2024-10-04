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
    "existing_count",
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
} & ItemData;

export type ExtendedTroopData = TroopData & ExtendedItemData;

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
export interface SummonBanners {
    JesterCrate: SummonItem[];
    MythicCrate: SummonItem[];
    BasicCrate: SummonItem[];
}

export interface SummonItem {
    id: string;
    chance: number;
}


// Rarity
/**
 * Represents all of the possible rarities a troop/crate can have
 * Make sure to have it always be sorted in a descending rarity scale
 */
export enum Rarity {
    "Utlimate", 
    "Exclusive", 
    "Godly", 
    "Mythic",
    "Legendary", 
    "Epic", 
    "Rare", 
    "Uncommon", 
    "Basic"
}