import { DatabaseTopbar } from "@/components/database/topbar";
import { PageHeader } from "@/components/custom/page-header";
import { OPENGRAPH_SITE_NAME } from "@/configuration";
import { Metadata } from "next";

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

        <PageHeader eyebrow="Database" title="Clans Database" description="Explore all in-game clans here!" />

        <div className="container mx-auto px-4 md:px-6 pb-20">
            <div className="rounded-2xl border border-dashed py-16 text-center font-display text-xl font-bold">
                🚧 In Construction 🚧
            </div>
        </div>
    </>;
}