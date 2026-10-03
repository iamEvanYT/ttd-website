# Toilet Tower Defense Website
## About
This is Toilet Tower Defense's Official Website built with Next.js!

## Local development

Use Bun 1.4.2 and Node.js 22 or newer. Install dependencies using the committed text lockfile:

```bash
bun install --frozen-lockfile
cp .env.example .env.local
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Set `BASE_URL` to the site's public URL, `GHOST_URL` and `GHOST_API_KEY` to the Ghost Content API credentials, and `TTD_API_KEY` to enable authenticated game API endpoints. Blog and database generation contact these services during builds.

## Checks

```bash
bun run lint
bun run typecheck
bun run build
bun audit
```

Docker uses Next.js standalone output and the same pinned Bun version. Pass the environment variables above as build arguments and configure them again at runtime.

Tailwind CSS and tailwind-merge stay on v3 and v2 respectively to preserve the existing styles. `bun audit` currently reports an unpatched, build-tool-only advisory in `braces`, GHSA-vfj7-8cjw-p6xm.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!
