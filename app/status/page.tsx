import { OPENGRAPH_SITE_NAME } from "@/configuration";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Status Page",
    description: "Status Page for Toilet Tower Defense's Services!",
    openGraph: {
        siteName: OPENGRAPH_SITE_NAME
    }
};

const targetURL = "https://status.toilettowerdefense.com/status/ttd"
export default async function Redirection() {
    return <>
        <embed src={targetURL} className="h-[100vh] w-full mx-0 p-0 overflow-hidden border-none" />
    </>
}