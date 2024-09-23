import { formatISODate, getPosts } from "@/lib/ghost-cms";
import { PostOrPage } from "@tryghost/content-api";
import Image from "next/image";
import Link from "next/link";
import PostsCSS from "./posts.module.css";

function GiantPostCard({ post }: { post: PostOrPage }) {
  const postUrl = `/post/${post.slug}`;

  return (
    <Link href={postUrl}>
      <div className={`max-w-full mx-auto ${PostsCSS.post}`}>
        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden shadow-xl">
          <div className="relative aspect-[16/9] md:aspect-[21/9]">
            <Image
              src={post.feature_image ?? ""}
              alt={post.title ?? ""}
              layout="fill"
              className="transition-opacity duration-300 ease-in-out group-hover:opacity-75 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-transparent dark:from-black" />
            <div className="absolute p-6 md:p-8 lg:p-12 max-w-lg">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 md:mb-4">
                {post.title ?? ""}
              </h2>
              <p className="text-gray-300 dark:text-gray-400 text-xs md:text-sm">
                {formatISODate(post.published_at ?? "")} · {post.reading_time} min read
              </p>
            </div>
            <a
              href={postUrl}
              className="absolute text-blue-600 hover:text-blue-800 text-2xl font-semibold bottom-0 px-4 py-2 right-0"
            >
              {"> Read more"}
            </a>
          </div>
        </div>
      </div>
    </Link>
  );
}

function PostCard({ post }: { post: PostOrPage }) {
  const postUrl = `/post/${post.slug}`;

  return (
    <Link href={postUrl}>
      <div className={`bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg ${PostsCSS.post}`}>
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
            <a
              href={postUrl}
              className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-semibold"
            >
              Read more
            </a>
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