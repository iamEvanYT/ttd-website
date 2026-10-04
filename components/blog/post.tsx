import Image from "next/image";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import Zoom from "react-medium-image-zoom";
import type { Element, ElementContent } from "hast";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { formatISODate, type Post } from "@/lib/blog";
import "@/components/blog/image-zoom.css";
import "@/components/blog/post.css";

type BookmarkProps = {
    href?: string;
    title?: string;
    description?: string;
    author?: string;
    publisher?: string;
};

function isImage(node: ElementContent): node is Element {
    return node.type === "element" && node.tagName === "img";
}

function isBlank(node: ElementContent) {
    return node.type === "text" && !node.value.trim();
}

function Bookmark({ href, title, description, author, publisher }: BookmarkProps) {
    return (
        <a className="bookmark" href={href} target="_blank" rel="noopener noreferrer">
            <div className="bookmark-content">
                <div className="bookmark-title">{title}</div>
                {description && <div className="bookmark-description">{description}</div>}
                {(author || publisher) && (
                    <div className="bookmark-metadata">
                        {author && <span>{author}</span>}
                        {publisher && <span>{publisher}</span>}
                    </div>
                )}
            </div>
        </a>
    );
}

const components = {
    p: ({ node, children, ...props }) => {
        const content = node?.children.filter((child) => !isBlank(child)) ?? [];

        if (content.length > 0 && content.every(isImage)) {
            // Several images in one paragraph are a gallery row
            if (content.length > 1) {
                return <div className="gallery-row">{children}</div>;
            }

            // A lone image is an image card, its title is the caption
            const caption = content[0].properties.title;
            return (
                <figure>
                    {children}
                    {caption && <figcaption>{String(caption)}</figcaption>}
                </figure>
            );
        }

        return <p {...props}>{children}</p>;
    },
    img: ({ node, src, alt, title, ...props }) => (
        <Zoom zoomMargin={15}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt={alt ?? ""} loading="lazy" {...props} />
        </Zoom>
    ),
    a: ({ node, href, children, ...props }) => {
        const external = href?.startsWith("http");
        return (
            <a href={href} {...(external && { target: "_blank", rel: "noopener noreferrer" })} {...props}>
                {children}
            </a>
        );
    },
    bookmark: ({ node, ...props }: BookmarkProps & { node?: Element }) => <Bookmark {...props} />,
} as Partial<Components>;

export function BlogPost({ post }: { post: Post }) {
    return (
        <main className="flex-1">
            <article className="gh-article">
                <header>
                    <Link href="/blog" className="mb-8 inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
                        <ArrowLeft className="h-4 w-4" />
                        Dev Blog
                    </Link>
                    <h1 className="article-title">{post.title}</h1>
                    <p className="text-sm text-muted-foreground">
                        {post.author && <><span className="font-medium text-foreground">{post.author}</span><span className="mx-2 opacity-50">·</span></>}
                        <time dateTime={post.publishedAt}>{formatISODate(post.publishedAt)}</time>
                        <span className="mx-2 opacity-50">·</span>
                        {post.readingTime} min read
                    </p>
                    {post.image && (
                        <Image
                            src={post.image}
                            alt={post.imageAlt ?? ""}
                            width={1920}
                            height={1080}
                            priority
                            className="article-image"
                        />
                    )}
                </header>
                <section className="gh-content">
                    <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]} components={components}>
                        {post.content}
                    </ReactMarkdown>
                </section>
            </article>
        </main>
    );
}
