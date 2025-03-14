import {
    CrateData,
    CrateContent,
    ExistCount,
    SummonBanners,
    SummonItem,
    TroopData,
    RetrievalMode,
    ExistCountHistoryItem,
    GetExistCountHistoryRequest,
    VariantMode
} from "./types"

const BASE_URL =  "https://api.toilettowerdefense.com";

type AdditionalFetchOptions = {
    silent?: boolean
};

/**
 * Utility function to handle fetch requests.
 * @param endpoint - The API endpoint to call.
 * @param options - Fetch options.
 * @returns The parsed JSON response or null in case of failure.
 */
async function fetchApi<T>(endpoint: string, options?: RequestInit, additionalOptions?: AdditionalFetchOptions): Promise<T | null> {
    // Retrieve the API key from environment variables
    const apiKey = process.env.TTD_API_KEY;
    if (apiKey) {
        // Initialize headers, preserving any existing headers
        const headers = new Headers(options?.headers || {});

        // Set the authorization header with the API key
        headers.set('Authorization', `Bearer ${apiKey}`);

        // Merge the new headers back into the options
        const updatedOptions: RequestInit = {
            ...options,
            headers,
            next: {
                revalidate: options?.next?.revalidate || 60 // Predefined or 60 seconds
            },
        };

        options = updatedOptions;
    }

    try {
        const response = await fetch(`${BASE_URL}${endpoint}`, options);
        if (!response.ok) {
            if (!additionalOptions?.silent) {
                console.error(`API request failed with status ${response.status}: ${response.statusText}`);
            }
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
 * Utility function to handle fetch requests for binary data.
 * @param endpoint - The API endpoint to call.
 * @param options - Fetch options.
 * @returns The response as a Blob or null in case of failure.
 */
async function fetchBlob(endpoint: string, options?: RequestInit): Promise<Blob | null> {
    // Retrieve the API key from environment variables
    const apiKey = process.env.TTD_API_KEY;
    if (apiKey) {
        // Initialize headers, preserving any existing headers
        const headers = new Headers(options?.headers || {});

        // Set the authorization header with the API key
        headers.set('Authorization', `Bearer ${apiKey}`);

        // Merge the new headers back into the options
        const updatedOptions: RequestInit = {
            ...options,
            headers,
            cache: 'no-cache',
        };

        options = updatedOptions;
    }

    try {
        const response = await fetch(`${BASE_URL}${endpoint}`, options);
        if (!response.ok) {
            console.error(`API request failed with status ${response.status}: ${response.statusText}`);
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
 * Retrieves data for a specific crate by its ID.
 * @param id - The unique identifier for the crate.
 * @returns The crate data or null if not found/error.
 */
export async function getCrateData(id: string): Promise<CrateData | null> {
    const params = new URLSearchParams({ id });
    return (
        await fetchApi<CrateData>(`/internal/get-crate-data?${params.toString()}`, undefined, { silent: true })
        ||
        await fetchApi<CrateData>(`/getCrateData?${params.toString()}`)
    );
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
    return (
        await fetchApi<TroopData>(`/internal/get-troop-data?${params.toString()}`, undefined, { silent: true })
        ||
        await fetchApi<TroopData>(`/getTroopData?${params.toString()}`)
    );
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
    return await fetchBlob(`/image-thumbnail/${assetId}`, { method: 'GET' });
}

/**
 * Fetches a Roblox image by its asset ID in full resolution.
 * @param assetId - The numeric ID of the image asset to fetch.
 * @returns A Blob of the image or null if an error occurs.
 */
export async function getImage(assetId: string): Promise<Blob | null> {
    return await fetchBlob(`/image/${assetId}`, { method: 'GET' });
}

/**
 * Retrieves the existence count history based on type, id, and retrieval mode.
 * @param type - The category type for which to retrieve history.
 * @param id - The unique identifier for the item.
 * @param retrievalMode - The mode of retrieval (e.g., daily, weekly, monthly).
 * @returns An array of existence count history items or null if an error occurs.
 */
export async function getExistCountHistory(
    type: string,
    id: string,
    variantMode: VariantMode,
    retrievalMode: RetrievalMode
): Promise<ExistCountHistoryItem[] | null> {
    const requestBody: GetExistCountHistoryRequest = {
        type,
        id,
        retrievalMode,
    };

    if (variantMode == "shiny") {
        requestBody.id = `${id}-Shiny`
    }

    return await fetchApi<ExistCountHistoryItem[]>(
        `/internal/get-exist-count-history`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
        }
    );
}