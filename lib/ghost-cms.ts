import GhostContentAPI from "@tryghost/content-api";

/**
* Formats an ISO timestamp to "Mon DD, YYYY" format.
*
* @param {string} timestamp - The ISO timestamp string (e.g., "2024-09-14T18:00:29.000+01:00").
* @returns {string} - The formatted date string (e.g., "Sep 14, 2024").
*/
export function formatISODate(isoDate: string | Date): string {
 const date = new Date(isoDate);

 if (isNaN(date.getTime())) {
   throw new Error("Invalid date format");
 }

 const options = {
   month: 'short',
   day: 'numeric',
   year: 'numeric'
 } as Intl.DateTimeFormatOptions;

 return date.toLocaleDateString('en-US', options);
}

// Create API instance with site credentials
const GHOST_URL = process.env.GHOST_URL || 'https://toilettowerdefense.com';
const GHOST_API_KEY = process.env.GHOST_API_KEY || '';
const api = new GhostContentAPI({
    url: GHOST_URL,
    key: GHOST_API_KEY,
    version: "v5.0",

    makeRequest: async ({ url, method, params, headers }) => {
        const apiUrl = new URL(url);

        Object.keys(params).map((key) => {
            let val = params[key];
            apiUrl.searchParams.set(key, val)
        }
        );

        try {
            const response = await fetch(apiUrl.toString(), { method, headers });
            const data = await response.json();
            return { data };
        } catch (error) {
            console.error(error);
        }
    },
});

export async function getPosts() {
    return await api.posts
        .browse({
            limit: "all",
            include: ["authors", "tags"]
        })
        .catch(err => {
            console.error(err);
        });
}

export async function getSinglePost(postSlug: string) {
    return await api.posts
        .read({
            slug: postSlug
        }, {
            include: ["authors", "tags"]
        })
        .catch(err => {
            console.error(err);
        });
}