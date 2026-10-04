import { Posts } from "@/components/blog/posts";
import { OPENGRAPH_SITE_NAME } from "@/configuration";
import { Metadata } from "next";
import { PageHeader } from "@/components/custom/page-header";

export const metadata: Metadata = {
    title: "Dev Blog",
    description: "Update blogs, notices, and more!",
    openGraph: {
        siteName: OPENGRAPH_SITE_NAME
    }
};

export default function Page() {
    return <main className="flex-1">
        <PageHeader eyebrow="Dev Blog" title="News & updates" description="Update blogs, notices, and more!" />
        <div className="container mx-auto px-4 md:px-6 pb-20">
            <Posts />
        </div>
    </main>;
}
