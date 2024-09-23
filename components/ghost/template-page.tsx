import { PostOrPage } from "@tryghost/content-api";
import { notFound } from "next/navigation";
import Image from "next/image";
import parse, { domToReact } from "html-react-parser";
import UserProfileCard from "@/components/ghost/user-profile-card";
import { formatISODate } from "@/lib/ghost-cms";

export function GhostTemplatePage({
    page
}: {
    page: PostOrPage
}) {
    if (!page) {
        notFound()
    }

    return <>
        <div className="gh-canvas relative mx-auto py-10 px-5">
            <h1>{page.title}</h1>
            {
                page?.primary_author &&
                <>
                    <UserProfileCard username={page.primary_author?.name ?? ""} avatarSrc={page.primary_author?.profile_image ?? ""} bottomText={`${formatISODate(page.published_at ?? "")} · ${page.reading_time} min read`} />
                    <div className="pb-10" />
                </>
            }
            {page.feature_image && <>
                <Image src={page.feature_image ?? ""} alt={page.feature_image_alt ?? ""} width="1920" height="1080" className="pb-10" />
            </>}
            <br />
            <div>{parse(page.html || "")}</div>
        </div>
    </>;
}