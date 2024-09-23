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
                hostname: 'toilettowerdefense.com',
                port: '',
                pathname: '/content/images/**',
            },
        ],
    },
};

export default nextConfig;
