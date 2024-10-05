const oldPostSlugs = [
    "drill-event-update",
    "rewards-update",
    "pencil-event-update",
    "gadget-crate-update",
    "clans-update",
    "episode-77-update-part-1",
    "food-crate-update",
    "abysmal-mode-update",
    "episode-76-part-2-update",
    "episode-76-part-1-update",
    "episode-75-update",
    "rewind-event-part-2",
    "roblox-classic-update",
]

const extraRedirects = {
    '/game': "https://www.roblox.com/games/13775256536/",
    '/discord': "https://discord.com/invite/SrnQt2yDeZ",
}

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'api.toilettowerdefense.com',
                port: '',
                pathname: '/image/*',
            },
            {
                protocol: 'https',
                hostname: 'blog.toilettowerdefense.com',
                port: '',
                pathname: '/content/images/**',
            },
        ],
    },
    async redirects() {
        const redirects = []

        oldPostSlugs.forEach((slug) => {
            redirects.push({
                source: `/${slug}`,
                destination: `/post/${slug}`,
                permanent: true,
            })
        })

        Object.entries(extraRedirects).forEach(([source, destination]) => (
            redirects.push({
                source,
                destination,
                permanent: true
            })
        ))

        return redirects
    },
};

export default nextConfig;
