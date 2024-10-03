import { DatabaseItemPage } from "@/components/database/item-page"
import { OPENGRAPH_SITE_NAME } from "@/configuration";
import { getTroopDatas } from "@/lib/ttd-api/api";
import { getTroopData } from "@/lib/ttd-api/client-api";

type URLParams = {
    item: string
}

export async function generateStaticParams() {
    const items = await getTroopDatas();
    if (!items) {
        return []
    }

    return items.map((itemData) => ({
        item: itemData.id,
    }))
}

export async function generateMetadata({ params }: { params: URLParams }) {
    const itemData = await getTroopData(params.item);
    if (!itemData) {
        return []
    }

    const baseUrl = process.env.BASE_URL || "http://localhost:3000";

    const {
        display: displayName,
        id: itemId,
        imageURL
    } = itemData
    
    const title = `${displayName}`;
    const description = `Overview of ${displayName}.`
    return {
        title,
        description,
        openGraph: {
            title,
            description,
            siteName: OPENGRAPH_SITE_NAME,
            url: `${baseUrl}/database/units/${itemId}`,
            images: [
                {
                    url: imageURL,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [imageURL],
        },
    }
}

export default async function ItemPage({
    params: {
        item
    }
}: {
    params: URLParams
}) {
    return <DatabaseItemPage type="Troops" id={item} />
}