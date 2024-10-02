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

function PromoCard({
    title,
    description,
    image,
    link
}: {
    title: string,
    description: string,
    image?: string,
    link?: string
}) {
    return (
        <div className="w-full aspect-[3/1] h-80 flex justify-center my-5">
            <div className="border w-[90%] rounded-xl shadow-lg p-5 flex justify-between items-center">
                <div className="flex-1 flex flex-col gap-2 pl-2">
                    <h1 className="text-4xl font-bold">{title}</h1>
                    <span className="text-xl">{description}</span>
                    <div className="py-5">
                        {link && <Link href={link} passHref>
                            <Button className="group" variant="default" size="xl">
                                Open
                                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={3} />
                            </Button>
                        </Link>}
                    </div>
                </div>
                {image && <Image
                    src={image}
                    alt="Database"
                    className="object-contain h-[100%] w-fit right-0"
                    height={250}
                    width={250}
                />}
            </div>
        </div>
    )
}

export default function DatabaseHomePage() {
    return <>
        <DatabaseTopbar />

        <div className="pt-10 pb-2">
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

        <div className="pb-5" />
    </>;
}