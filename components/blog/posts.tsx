import { formatISODate, getPosts, type Post } from "@/lib/blog";
import { BANNER_IMAGE } from "@/configuration";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";

function PostMeta({ post, className }: { post: Post, className?: string }) {
  return (
    <p className={className}>
      <time dateTime={post.publishedAt}>{formatISODate(post.publishedAt)}</time>
      <span className="mx-2 opacity-50">·</span>
      <span className="inline-flex items-center gap-1">
        <Clock className="h-3.5 w-3.5" />
        {post.readingTime} min read
      </span>
    </p>
  )
}

export function GiantPostCard({ post }: { post: Post }) {
  const postUrl = `/post/${post.slug}`

  return (
    <Link href={postUrl} className="group block">
      <article className="relative isolate overflow-hidden rounded-[2rem] bg-black aspect-[4/5] sm:aspect-[16/9] lg:aspect-[21/9]">
        <Image
          src={post.image ?? BANNER_IMAGE}
          alt={post.imageAlt ?? post.title}
          fill={true}
          className="-z-10 object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-6 md:p-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            {post.tags?.[0] && (
              <span className="mb-3 inline-block rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white backdrop-blur-md">
                {post.tags[0]}
              </span>
            )}
            <h3 className="font-display text-3xl font-extrabold tracking-tight text-white md:text-5xl">
              {post.title}
            </h3>
            <PostMeta post={post} className="mt-3 flex items-center text-sm text-white/70" />
          </div>
          <span className="inline-flex h-12 shrink-0 items-center gap-2 self-start rounded-full bg-white px-6 font-semibold text-black transition-transform group-hover:-translate-y-0.5 sm:self-auto">
            Read post
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>
      </article>
    </Link>
  )
}

export function PostCard({ post }: { post: Post }) {
  const postUrl = `/post/${post.slug}`;

  return (
    <Link href={postUrl} className="group block h-full">
      <article className="flex h-full flex-col overflow-hidden rounded-2xl border bg-card transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5">
        <div className="relative aspect-[16/9] overflow-hidden bg-muted">
          <Image
            src={post.image ?? BANNER_IMAGE}
            alt={post.imageAlt ?? post.title}
            fill={true}
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="flex flex-1 flex-col p-5">
          <h3 className="font-display text-xl font-bold tracking-tight">{post.title}</h3>
          {post.description && (
            <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{post.description}</p>
          )}
          <div className="mt-auto pt-4 flex items-center justify-between">
            <PostMeta post={post} className="flex items-center text-xs text-muted-foreground" />
            <ArrowRight className="h-4 w-4 text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:text-primary" />
          </div>
        </div>
      </article>
    </Link>
  );
}

export function Posts() {
  const posts = getPosts();

  if (posts.length === 0) {
    return <div className="py-16 text-center text-muted-foreground">No posts found</div>;
  }

  return (
    <div className="space-y-6">
      <GiantPostCard post={posts[0]} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.slice(1).map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  )
}
