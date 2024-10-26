import { PostOrPage } from "@tryghost/content-api";
import { notFound } from "next/navigation";
import Image from "next/image";
import parse, { type DOMNode } from "html-react-parser";
import UserProfileCard from "@/components/ghost/user-profile-card";
import { formatISODate } from "@/lib/ghost-cms";
import { InnerDOM } from "@/components/utility/inner-dom";
import { DynamicCSS } from "@/components/utility/dynamic-css";

import React, { type ReactNode } from 'react'
import Zoom from 'react-medium-image-zoom'
import "@/public/ghost/css/image-zoom.css"

export function GhostTemplatePage({ page }: { page: PostOrPage }) {
    if (!page) {
        notFound();
    }

    function transformElement(reactNode: ReactNode, domNode: DOMNode) {
        if (domNode.type === 'tag' && domNode.name === 'img' && domNode.attribs.class?.includes('kg-image')) {
            const massiveImage = {
                ...domNode.attribs,
                src: domNode.attribs.src,
                alt: domNode.attribs.alt || '',
                style: {
                    maxWidth: '100%',
                    height: 'auto'
                }
            };

            return (
                <Zoom key={domNode?.attribs?.src} zoomImg={{...massiveImage}} zoomMargin={15}>
                    {reactNode}
                </Zoom>
            );
        }
        return reactNode;
    }

    return (
        <InnerDOM
            title={page.title ?? page.slug}
            className="border-none"
        >
            <DynamicCSS hrefs={[
                '/ghost/css/main.css',
                '/ghost/css/cards.css',

                '/ghost/css/override.css',

                '/ghost/css/image-zoom.css'
            ]} />

            <div className="site-content gh-canvas" style={{
                // tailwind "relative"
                position: "relative",

                // tailwind "mx-auto"
                marginLeft: "auto",
                marginRight: "auto",

                // tailwind "py-10"
                paddingTop: "2.5rem",
                paddingBottom: "2.5rem",

                // tailwind "px-5"
                paddingLeft: "1.25rem",
                paddingRight: "1.25rem",
            }}>
                <header className="article-header">
                    <h1 className="article-title" style={{
                        // tailwind "pb-10"
                        paddingBottom: "2.5rem",
                    }}>{page.title}</h1>
                    {page.primary_author && (
                        <>
                            <UserProfileCard
                                username={page.primary_author.name ?? ""}
                                avatarSrc={page.primary_author.profile_image ?? ""}
                                bottomText={`${formatISODate(page.published_at ?? "")} · ${page.reading_time} min read`}
                            />
                            <div style={{
                                // tailwind "pb-10"
                                paddingBottom: "2.5rem",
                            }} />
                        </>
                    )}
                    {page.feature_image && (
                        <Image
                            src={page.feature_image}
                            alt={page.feature_image_alt ?? ""}
                            width={1920}
                            height={1080}
                        />
                    )}
                </header>
                <section className="gh-content">
                    {parse(page.html || "", {
                        // @ts-ignore
                        transform: transformElement
                    })}
                </section>
            </div>
        </InnerDOM>
    );
}
