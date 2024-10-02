// Items
export type ItemTypes = "Troops" | "Crates"

/**
 * Represents the data structure for an item in the game.
 */
export interface ItemData {
    id: string;
    display: string;
    rarity: string;
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

// Crates
/**
 * Represents the data structure for a crate.
 */
export type CrateData = {
    contents?: CrateContent[];
} & ItemData;

export type ExtendedCrateData = CrateData & ExtendedItemData;

export interface CrateContent {
    itemID: string;
    quantity: number;
}

// Troops
/**
 * Represents the data structure for a troop.
 */
export type TroopData = {
    levels: number;
    price?: number;
    display: string;
    tags: string[];
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