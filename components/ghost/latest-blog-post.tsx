import { getPosts } from "@/lib/ghost-cms";
import { GiantPostCard } from "@/components/ghost/posts";

export async function LatestBlogPost() {
    const posts = await getPosts().catch(() => undefined);
    if (!posts) {
        return <div className="px-8 text-center">No posts found</div>;
    }

    const latestPost = posts[0];
    if (!latestPost) {
        return <div className="px-8 text-center">No posts found</div>;
    }

    return <GiantPostCard post={latestPost} />
}