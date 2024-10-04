import { ItemGrid } from "@/components/database/item-grid";
import { SummonsList } from "@/components/database/summons/summons-list";
import { DatabaseTopbar } from "@/components/database/topbar";
import { LoadingSpinner } from "@/components/ui/loading";
import { OPENGRAPH_SITE_NAME } from "@/configuration";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
    title: "Summons Database",
    description: "Explore the currently avalible summons here!",
    openGraph: {
        siteName: OPENGRAPH_SITE_NAME
    }
};

export default function UnitsHomePage() {
    return <>
        <DatabaseTopbar />

        <div className="py-10 px-5">
            <h1 className="text-3xl font-bold tracking-tighter text-black lg:text-6xl/none text-center dark:text-white">
                Summons Database
            </h1>
            <br />
            <p className="mx-auto max-w-[700px] text-black md:text-xl text-center dark:text-white">
                Explore the currently avalible summons here!
            </p>
        </div>

        <SummonsList />
    </>;
}