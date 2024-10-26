import { formatISODate, getPosts } from "@/lib/ghost-cms";
import { PostOrPage } from "@tryghost/content-api";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function GiantPostCard({ post }: { post: PostOrPage }) {
  const postUrl = `/post/${post.slug}`

  return (
    <Link href={postUrl}>
      <div className="max-w-full mx-auto">
        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden shadow-xl">
          <div className="relative aspect-[16/9] md:aspect-[21/9]">
            <Image
              src={post.feature_image ?? ""}
              alt={post.title ?? ""}
              fill={true}
              className="transition-opacity duration-300 ease-in-out group-hover:opacity-75 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-transparent dark:from-black" />
            <div className="absolute inset-0 p-6 md:p-8 lg:p-12 flex flex-col justify-between">
              <div className="max-w-lg">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 md:mb-4">
                  {post.title ?? ""}
                </h2>
                <p className="text-gray-300 dark:text-gray-400 text-xs md:text-sm">
                  {formatISODate(post.published_at ?? "")} · {post.reading_time} min read
                </p>
              </div>
              <div>
                <Button className="group" variant="secondary" size="xl">
                  Read Post
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={3} />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export function PostCard({ post }: { post: PostOrPage }) {
  const postUrl = `/post/${post.slug}`;

  return (
    <Link href={postUrl}>
      <div className={`bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg`}>
        <Image
          src={post.feature_image ?? ""}
          alt={post.title ?? ""}
          width={600}
          height={400}
          className="w-full h-max object-cover"
        />
        <div className="p-6 relative bottom-0 left-0 right-0">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2">{post.title}</h2>
          <div className="flex justify-between items-center">
            <span className="text-gray-500 dark:text-gray-400 text-xs">
              {formatISODate(post.published_at ?? "")} · {post.reading_time} min read
            </span>

            <Button className="group" size="m">
              Read Post
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
}

export async function Posts() {
  const posts = await getPosts();

  if (!posts) {
    return <div className="p-8">No posts found</div>;
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        {/* First row - 1 column */}
        <div className="mb-8">
          <GiantPostCard post={posts[0]} />
        </div>

        {/* Second row - 2 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <PostCard post={posts[1]} />
          <PostCard post={posts[2]} />
        </div>

        {/* Remaining rows - 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.slice(3).map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  )
}