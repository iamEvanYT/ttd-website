import { Posts } from "@/components/ghost/posts";

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