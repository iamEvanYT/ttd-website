import { OPENGRAPH_SITE_NAME } from "@/configuration";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Status Page",
    description: "Status Page for Toilet Tower Defense's Services!",
    openGraph: {
        siteName: OPENGRAPH_SITE_NAME
    }
};

const targetURL = "https://status.toilettowerdefense.com"
export default async function Redirection() {
    // The embedded page scrolls itself, so `.status-page` stops the outer page from scrolling too (see globals.css)
    return (
        <main className="status-page flex flex-1 flex-col">
            <embed src={targetURL} className="block w-full flex-1 border-none" />
        </main>
    )
}
