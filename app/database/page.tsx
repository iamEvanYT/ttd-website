import { DatabaseTopbar } from "@/components/database/topbar";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { OPENGRAPH_SITE_NAME } from "@/configuration";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Database",
    description: "Coming Soon!",
    openGraph: {
        siteName: OPENGRAPH_SITE_NAME
    }
};

export default function DatabaseHomePage() {
    return <>
        <DatabaseTopbar />
        <div className="py-10">
            <h1 className="text-3xl font-bold tracking-tighter text-black lg:text-6xl/none text-center dark:text-white">
                Database
            </h1>
            <br />
            <p className="mx-auto max-w-[700px] text-black md:text-xl text-center dark:text-white">
                Explore data & statistics collected by the game here!
            </p>
        </div>

        <div className="p-10">
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">
                        Coming Soon!
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <CardDescription>
                        🚧 In Construction 🚧
                    </CardDescription>
                </CardContent>
            </Card>
        </div>
    </>;
}