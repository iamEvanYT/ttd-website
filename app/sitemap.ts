import { getPosts } from '@/lib/ghost-cms';
import { PostOrPage } from '@tryghost/content-api';
import type { MetadataRoute } from 'next'

export const revalidate = 60;

const baseUrl = process.env.BASE_URL || "http://localhost:3000";

const pages = [
    {
        url: '/',
        lastModified: new Date("2024-09-00:00:10.000Z"),
    },
    {
        url: '/blog',
        lastModified: new Date("2024-09-00:00:10.000Z"),
    },
    {
        url: '/faq',
        lastModified: new Date("2024-09-29T14:30:38.968Z"),
    },
    {
        url: '/status',
        lastModified: new Date("2024-09-00:00:10.000Z"),
    },
]

export default async function sitemap({
    id,
}: {
    id: string
}): Promise<MetadataRoute.Sitemap> {
    const sitemap: MetadataRoute.Sitemap = []

    // Pages
    pages.forEach(page => {
        sitemap.push({
            url: `${baseUrl}${page.url}`,
            lastModified: page.lastModified,
        })
    })

    // Posts
    const posts = await getPosts();
    if (posts) {
        posts.forEach((post: PostOrPage) => {
            let updateDate: Date | undefined;
            if (post.updated_at) {
                updateDate = new Date(post.updated_at)
            }

            sitemap.push({
                url: `${baseUrl}/post/${post.slug}`,
                lastModified: updateDate
            })
        })
    }

    return sitemap
}