import { DatabaseTopbar } from "@/components/database/topbar";
import { Button } from "@/components/ui/button";
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
    image?: string
    link?: string
}
function PromoCard({ title, description, image, link }: PromoCardProps) {
    return (
        <div className="w-full my-4 sm:my-5 px-5">
            <div className="border w-full rounded-xl shadow-lg p-4 sm:p-5 flex flex-col sm:flex-row justify-between items-center">
                <div className="flex-1 flex flex-col gap-2 text-center sm:text-left mb-4 sm:mb-0">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">{title}</h1>
                    <span className="text-base sm:text-lg md:text-xl">{description}</span>
                    {link && (
                        <div className="py-3 sm:py-5">
                            <Link href={link} passHref>
                                <Button className="group w-full sm:w-auto" variant="default" size="lg">
                                    Open
                                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={3} />
                                </Button>
                            </Link>
                        </div>
                    )}
                </div>
                {image && (
                    <div className="w-full sm:w-auto">
                        <Image
                            src={image}
                            alt="Promo Image"
                            className="object-contain w-full h-auto sm:h-48 md:h-56 lg:h-64"
                            width={250}
                            height={250}
                        />
                    </div>
                )}
            </div>
        </div>
    )
}

export default function DatabaseHomePage() {
    return <>
        <DatabaseTopbar />

        <div className="pt-10 pb-2 px-5">
            <h1 className="text-3xl font-bold tracking-tighter text-black lg:text-6xl/none text-center dark:text-white">
                Database
            </h1>
            <br />
            <p className="mx-auto max-w-[700px] text-black md:text-xl text-center dark:text-white">
                Explore data & statistics collected by the game here!
            </p>
        </div>

        <PromoCard
            title="Units Database"
            description="Discover all units here!"
            image="/images/database/unit-card.png"
            link="/database/units"
        />

        <PromoCard
            title="Crates Database"
            description="Discover all crates here!"
            image="/images/database/crate-card.png"
            link="/database/crates"
        />

        <PromoCard
            title="Summons Database"
            description="Explore the currently avalible summons here!"
            image="/images/database/summon-card.png"
            link="/database/summons"
        />

        <div className="pb-5" />
    </>;
}