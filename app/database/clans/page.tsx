import { DatabaseTopbar } from "@/components/database/topbar";
import { LoadingSpinner } from "@/components/ui/loading";
import { OPENGRAPH_SITE_NAME } from "@/configuration";
import { Metadata } from "next";
import { Suspense } from "react";

export const revalidate = 60;

export const metadata: Metadata = {
    title: "Clans Database",
    description: "Explore all in-game clans here!",
    openGraph: {
        siteName: OPENGRAPH_SITE_NAME
    }
};

export default function UnitsHomePage() {
    return <>
        <DatabaseTopbar />

        <div className="py-10 px-5">
            <h1 className="text-3xl font-bold tracking-tighter text-black lg:text-6xl/none text-center dark:text-white">
                Clans Database
            </h1>
            <br />
            <p className="mx-auto max-w-[700px] text-black md:text-xl text-center dark:text-white">
                Explore all in-game clans here!
            </p>
        </div>

        <div className="flex flex-row justify-center">
            <div className="w-[95%] h-full p-5 border rounded-xl shadow-lg text-center font-bold text-xl">
                🚧 In Construction 🚧
            </div>
        </div>
    </>;
}