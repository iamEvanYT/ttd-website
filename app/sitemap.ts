import { getPosts } from '@/lib/blog';
import { getCrateDatas, getTroopDatas } from '@/lib/ttd-api/api';
import type { MetadataRoute } from 'next'

export const revalidate = 60;

const baseUrl = process.env.BASE_URL || "http://localhost:3000";

const pages = [
    {
        url: '/',
    },
    {
        url: '/blog',
    },
    {
        url: '/faq',
        lastModified: new Date("2024-09-29T14:30:38.968Z"),
    },
    {
        url: '/status',
    },

    // Database
    {
        url: '/database',
        lastModified: new Date("2024-10-02T19:15:00.967Z"),
    },
    {
        url: '/database/units',
        lastModified: new Date("2024-10-02T19:15:00.967Z"),
    },
    {
        url: '/database/crates',
        lastModified: new Date("2024-10-02T19:15:00.967Z"),
    },
    {
        url: '/database/summons',
        lastModified: new Date("2024-10-02T19:15:00.967Z"),
    },
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const sitemap: MetadataRoute.Sitemap = []

    // Pages
    pages.forEach(page => {
        sitemap.push({
            url: `${baseUrl}${page.url}`,
            lastModified: page.lastModified,
        })
    })

    // Posts
    getPosts().forEach((post) => {
        sitemap.push({
            url: `${baseUrl}/post/${post.slug}`,
            lastModified: post.updatedAt ? new Date(post.updatedAt) : undefined
        })
    })

    // Units
    const units = await getTroopDatas();
    if (units) {
        units.forEach((itemData) => {
            sitemap.push({
                url: `${baseUrl}/database/units/${itemData.id}`,
            })
        })
    }

    // Crates
    const crates = await getCrateDatas();
    if (crates) {
        crates.forEach((itemData) => {
            sitemap.push({
                url: `${baseUrl}/database/crates/${itemData.id}`,
            })
        })
    }

    return sitemap
}
