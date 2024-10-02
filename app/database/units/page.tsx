import { ItemGrid } from "@/components/database/item-grid";
import { DatabaseTopbar } from "@/components/database/topbar";
import { OPENGRAPH_SITE_NAME } from "@/configuration";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Units Database",
    description: "Explore all avalible Units here!",
    openGraph: {
        siteName: OPENGRAPH_SITE_NAME
    }
};

export default function UnitsHomePage() {
    return <>
        <DatabaseTopbar />

        <div className="py-10">
            <h1 className="text-3xl font-bold tracking-tighter text-black lg:text-6xl/none text-center dark:text-white">
                Units Database
            </h1>
            <br />
            <p className="mx-auto max-w-[700px] text-black md:text-xl text-center dark:text-white">
                Explore all avalible Units here!
            </p>
        </div>

        <ItemGrid type="Troops" />
    </>;
}