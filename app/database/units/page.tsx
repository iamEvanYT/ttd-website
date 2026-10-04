import { ItemGrid } from "@/components/database/item-grid";
import { DatabaseTopbar } from "@/components/database/topbar";
import { PageHeader } from "@/components/custom/page-header";
import { LoadingSpinner } from "@/components/ui/loading";
import { OPENGRAPH_SITE_NAME } from "@/configuration";
import { Metadata } from "next";
import { Suspense } from "react";

export const revalidate = 60;

export const metadata: Metadata = {
    title: "Units Database",
    description: "Explore all available Units here!",
    openGraph: {
        siteName: OPENGRAPH_SITE_NAME
    }
};

export default function UnitsHomePage() {
    return <>
        <DatabaseTopbar />

        <PageHeader eyebrow="Database" title="Units Database" description="Explore all available Units here!" />

        <Suspense fallback={(
            <div className="align-baseline flex justify-center py-10">
                <LoadingSpinner />
            </div>
        )}>
            <ItemGrid type="Troops" />
        </Suspense>
    </>;
}