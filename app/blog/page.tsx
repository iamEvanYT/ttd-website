import { Posts } from "@/components/ghost/posts";
import { OPENGRAPH_SITE_NAME } from "@/configuration";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Dev Blog",
    description: "Update blogs, notices, and more!",
    openGraph: {
        siteName: OPENGRAPH_SITE_NAME
    }
};

export const revalidate = 60;

export default function Page() {
    return <>
        <div className="pt-10">
            <h1 className="text-3xl font-bold tracking-tighter text-black lg:text-6xl/none text-center dark:text-white">
                Dev Blog
            </h1>
            <br />
            <p className="mx-auto max-w-[700px] text-black md:text-xl text-center dark:text-white">
                Update blogs, notices, and more!
            </p>
        </div>

        <div className="flex items-center place-content-center w-screen pb-10">
            <Posts />
        </div>
    </>;
}