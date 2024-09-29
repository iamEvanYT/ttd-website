import { PostOrPage } from "@tryghost/content-api";
import { notFound } from "next/navigation";
import Image from "next/image";
import parse from "html-react-parser";
import UserProfileCard from "@/components/ghost/user-profile-card";
import { formatISODate } from "@/lib/ghost-cms";
import { InnerDOM } from "@/components/inner-dom";
import { DynamicCSS } from "@/components/dynamic-css";

export function GhostTemplatePage({ page }: { page: PostOrPage }) {
    if (!page) {
        notFound();
    }

    return (
        <InnerDOM
            title={page.title ?? page.slug}
            className="w-full h-screen border-none"
        >
            <DynamicCSS hrefs={[
                '/ghost/css/global.css',
                '/ghost/css/screen.css',
                '/ghost/css/cards.css'
            ]} />
            
            <div className="relative mx-auto py-10 px-5 site-content gh-canvas">
                <header className="article-header">
                    <h1 className="article-title pb-10">{page.title}</h1>
                    {page.primary_author && (
                        <>
                            <UserProfileCard
                                username={page.primary_author.name ?? ""}
                                avatarSrc={page.primary_author.profile_image ?? ""}
                                bottomText={`${formatISODate(page.published_at ?? "")} · ${page.reading_time} min read`}
                            />
                            <div className="pb-10" />
                        </>
                    )}
                    {page.feature_image && (
                        <Image
                            src={page.feature_image}
                            alt={page.feature_image_alt ?? ""}
                            width={1920}
                            height={1080}
                            className="pb-10"
                        />
                    )}
                </header>
                <section className="gh-content">
                    {parse(page.html || "")}
                </section>
            </div>
        </InnerDOM>
    );
}
