import { ItemExistsCard } from "@/components/database/item-page/exists-card";
import { TotalExistsChart } from "@/components/database/item-page/total-exists-chart";
import { DatabaseTopbar } from "@/components/database/topbar";
import { PageHeader } from "@/components/custom/page-header";
import { OPENGRAPH_SITE_NAME } from "@/configuration";
import { ArrowRight } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Database",
    description: "Explore data & statistics collected by the game here!",
    openGraph: {
        siteName: OPENGRAPH_SITE_NAME
    }
};

interface PromoCardProps {
    title: string
    description: string
    image: string
    link: string
}
function PromoCard({ title, description, image, link }: PromoCardProps) {
    return (
        <Link href={link} className="group block">
            <div className="relative h-full overflow-hidden rounded-2xl border bg-card p-6 transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5">
                <div className="relative mb-6 grid aspect-[4/3] place-items-center overflow-hidden rounded-xl bg-gradient-to-br from-primary/15 via-primary/5 to-transparent">
                    <Image
                        src={image}
                        alt=""
                        className="h-4/5 w-auto object-contain drop-shadow-xl transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-2"
                        width={250}
                        height={250}
                    />
                </div>
                <div className="flex items-end justify-between gap-4">
                    <div>
                        <h2 className="font-display text-2xl font-bold tracking-tight">{title}</h2>
                        <p className="mt-1 text-muted-foreground">{description}</p>
                    </div>
                    <span className="grid size-10 shrink-0 place-items-center rounded-full border bg-background transition-colors group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
                        <ArrowRight className="h-4 w-4" />
                    </span>
                </div>
            </div>
        </Link>
    )
}

export default function DatabaseHomePage() {
    return <main className="flex-1">
        <DatabaseTopbar />

        <PageHeader eyebrow="Game Data" title="Database" description="Explore data & statistics collected by the game here!" />

        <div className="container mx-auto px-4 md:px-6 pb-20 space-y-6">
            <div className="grid gap-6 md:grid-cols-3">
                <PromoCard
                    title="Units"
                    description="Discover all units here!"
                    image="/images/database/unit-card.png"
                    link="/database/units"
                />
                <PromoCard
                    title="Crates"
                    description="Discover all crates here!"
                    image="/images/database/crate-card.png"
                    link="/database/crates"
                />
                <PromoCard
                    title="Summons"
                    description="Explore the currently available summons here!"
                    image="/images/database/summon-card.png"
                    link="/database/summons"
                />
            </div>

            <ItemExistsCard
                type="Special"
                id="Special"

                cardTitle="Total Exists Chart"
                cardDescription="Showing the exists history of all items."

                Chart={TotalExistsChart}
            />
        </div>
    </main>;
}
