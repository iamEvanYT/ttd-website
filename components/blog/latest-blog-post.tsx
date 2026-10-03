import { getPosts } from "@/lib/blog";
import { GiantPostCard } from "@/components/blog/posts";

export function LatestBlogPost() {
    const latestPost = getPosts()[0];
    if (!latestPost) {
        return <div className="px-8 text-center">No posts found</div>;
    }

    return <GiantPostCard post={latestPost} />
}
