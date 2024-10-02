import {
    CrateData,
    CrateContent,
    ExistCount,
    SummonBanners,
    SummonItem,
    TroopData
} from "./types"

const BASE_URL = "https://api.toilettowerdefense.com";

/**
 * Utility function to handle fetch requests.
 * @param endpoint - The API endpoint to call.
 * @param options - Fetch options.
 * @returns The parsed JSON response or null in case of failure.
 */
async function fetchApi<T>(endpoint: string, options?: RequestInit): Promise<T | null> {
    try {
        const response = await fetch(`${BASE_URL}${endpoint}`, options);
        if (!response.ok) {
            console.error(`API request failed with status ${response.status}: ${response.statusText}`);
            return null;
        }
        const data: T = await response.json();
        return data;
    } catch (error) {
        console.error(`Fetch error: ${(error as Error).message}`);
        return null;
    }
}

/**
 * Retrieves data for a specific crate by its ID.
 * @param id - The unique identifier for the crate.‚
 * @returns The crate data or null if not found/error.
 */
export async function getCrateData(id: string): Promise<CrateData | null> {
    const params = new URLSearchParams({ id });
    return await fetchApi<CrateData>(`/getCrateData?${params.toString()}`);
}

/**
 * Gets the display names for all crates.
 * @returns An object mapping crate IDs to their display names or null if an error occurs.
 */
export async function getCrateDisplays(): Promise<Record<string, string> | null> {
    return await fetchApi<Record<string, string>>("/getCrateDisplays");
}

/**
 * Retrieves the existence count for all items.
 * @returns An array of key-value pairs representing item counts or null if an error occurs.
 */
export async function getExistCount(): Promise<ExistCount[] | null> {
    return await fetchApi<ExistCount[]>("/getExistCount");
}

/**
 * Retrieves the current summon banner data for various crates.
 * @returns An object containing summon banner data or null if an error occurs.
 */
export async function getSummonBanners(): Promise<SummonBanners | null> {
    return await fetchApi<SummonBanners>("/getSummonBanners");
}

/**
 * Retrieves data for a specific troop by its ID.
 * @param id - The unique identifier for the troop.
 * @returns The troop data or null if not found/error.
 */
export async function getTroopData(id: string): Promise<TroopData | null> {
    const params = new URLSearchParams({ id });
    return await fetchApi<TroopData>(`/getTroopData?${params.toString()}`);
}

/**
 * Gets the display names for all troops.
 * @returns An object mapping troop IDs to their display names or null if an error occurs.
 */
export async function getTroopDisplays(): Promise<Record<string, string> | null> {
    return await fetchApi<Record<string, string>>("/getTroopDisplays");
}

/**
 * Fetches a Roblox image by its asset ID, resized to 250x250.
 * @param assetId - The numeric ID of the image asset to fetch.
 * @returns A Blob of the image or null if an error occurs.
 */
export async function getImageThumbnail(assetId: string): Promise<Blob | null> {
    try {
        const response = await fetch(`${BASE_URL}/image-thumbnail/${assetId}`);
        if (!response.ok) {
            console.error(`Image request failed with status ${response.status}: ${response.statusText}`);
            return null;
        }
        const blob = await response.blob();
        return blob;
    } catch (error) {
        console.error(`Fetch error: ${(error as Error).message}`);
        return null;
    }
}

/**
 * Fetches a Roblox image by its asset ID in full resolution.
 * @param assetId - The numeric ID of the image asset to fetch.
 * @returns A Blob of the image or null if an error occurs.
 */
export async function getImage(assetId: string): Promise<Blob | null> {
    try {
        const response = await fetch(`${BASE_URL}/image/${assetId}`);
        if (!response.ok) {
            console.error(`Image request failed with status ${response.status}: ${response.statusText}`);
            return null;
        }
        const blob = await response.blob();
        return blob;
    } catch (error) {
        console.error(`Fetch error: ${(error as Error).message}`);
        return null;
    }
}