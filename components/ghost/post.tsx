import { notFound } from "next/navigation";
import { getSinglePost } from "@/lib/ghost-cms";
import { GhostTemplatePage } from "@/components/ghost/template-page";

export async function GhostBlogPost({
    slug
}: {
    slug: string
}) {
    const post = await getSinglePost(slug);

    if (!post) {
        notFound()
    }

    return <GhostTemplatePage page={post} />;
}