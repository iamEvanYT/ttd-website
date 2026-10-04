import { SummonsList } from "@/components/database/summons/summons-list";
import { DatabaseTopbar } from "@/components/database/topbar";
import { PageHeader } from "@/components/custom/page-header";
import { OPENGRAPH_SITE_NAME } from "@/configuration";
import { Metadata } from "next";

export const revalidate = 60;

export const metadata: Metadata = {
    title: "Summons Database",
    description: "Explore the currently available summons here!",
    openGraph: {
        siteName: OPENGRAPH_SITE_NAME
    }
};

export default function UnitsHomePage() {
    return <>
        <DatabaseTopbar />

        <PageHeader eyebrow="Database" title="Summons Database" description="Explore the currently available summons here!" />

        <SummonsList />
    </>;
}