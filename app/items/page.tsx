import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { OPENGRAPH_SITE_NAME } from "@/configuration";
import { Search } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
    title: "Item Index",
    description: "Coming Soon!",
    openGraph: {
        siteName: OPENGRAPH_SITE_NAME
    }
};

const DEBUG = false;

const itemTypeOptions = [
    {
        label: "Troops",
        value: "troops",
    },
    {
        label: "Crates",
        value: "crates",
    }
]

const rarityOptions = [
    {
        label: "Basic",
        value: "Basic",
    },
    {
        label: "Rare",
        value: "Rare",
    },
    {
        label: "Epic",
        value: "Epic",
    },
]

function ItemDirectory() {
    return <div className="px-6 pb-6">
        <div className="rounded-lg border border-gray-800 flex h-screen">
            {/* Sidebar */}
            <div className="w-64 p-4 border-r border-gray-800">
                <h2 className="text-xl font-bold mb-4">Filter Items</h2>
                <div className="relative mb-4">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                    <Input
                        type="text"
                        placeholder="Search..."
                        className="pl-8 border-gray-700"
                        value=""
                    />
                </div>
                <Button variant="outline" className="w-full justify-between mb-4">
                    Select All
                </Button>
                <div className="mb-4">
                    <h3 className="text-sm font-semibold mb-2">Item Types</h3>
                    {itemTypeOptions.map(({ label, value }) => (
                        <div key={label} className="flex items-center mb-2">
                            <Checkbox id={label} className="border-gray-700" />
                            <label htmlFor={label} className="ml-2 text-sm">{label}</label>
                        </div>
                    ))}

                    <br />

                    <h3 className="text-sm font-semibold mb-2">Rarities</h3>
                    {rarityOptions.map(({ label, value }) => (
                        <div key={label} className="flex items-center mb-2">
                            <Checkbox id={label} className="border-gray-700" />
                            <label htmlFor={label} className="ml-2 text-sm">{label}</label>
                        </div>
                    ))}
                </div>
            </div>

            {/* Main content */}
            <div className="flex-1 p-8 overflow-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Card>
                        <CardHeader>
                            <Image src="https://api.toilettowerdefense.com/image/94117076620030" alt="Item" width={100} height={100} />
                            <CardTitle>To Be Added</CardTitle>
                        </CardHeader>
                    </Card>
                </div>
            </div>
        </div>
    </div>
}

export default function ItemsPage() {
    return <>
        <div className="py-10">
            <h1 className="text-3xl font-bold tracking-tighter text-black lg:text-6xl/none text-center dark:text-white">
                Items Directory
            </h1>
            <br />
            <p className="mx-auto max-w-[700px] text-black md:text-xl text-center dark:text-white">
                Search for all the items available in the game here.
            </p>
        </div>

        {
            !DEBUG
            &&
            <div className="p-10">
                <Card>
                    <CardHeader>
                        <CardTitle>
                            Coming Soon!
                        </CardTitle>
                    </CardHeader>
                </Card>
            </div>
        }
        {DEBUG && <ItemDirectory />}
    </>;
}