import fs from "node:fs";
import path from "node:path";
import { cache } from "react";
import matter from "gray-matter";

const POSTS_DIR = path.join(process.cwd(), "content/posts");
const WORDS_PER_MINUTE = 275;

export type Post = {
  slug: string;
  title: string;
  publishedAt: string;
  updatedAt?: string;
  author?: string;
  image?: string;
  imageAlt?: string;
  description?: string;
  tags: string[];
  readingTime: number;
  content: string;
};

/**
 * Formats an ISO timestamp to "Mon DD, YYYY" format.
 *
 * @param {string} isoDate - The ISO timestamp string (e.g., "2024-09-14T18:00:29.000+01:00").
 * @returns {string} - The formatted date string (e.g., "Sep 14, 2024").
 */
export function formatISODate(isoDate: string | Date): string {
  const date = new Date(isoDate);

  if (isNaN(date.getTime())) {
    throw new Error("Invalid date format");
  }

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

function readPost(slug: string): Post {
  const file = fs.readFileSync(path.join(POSTS_DIR, `${slug}.md`), "utf8");
  const { data, content } = matter(file);
  const words = content.split(/\s+/).filter(Boolean).length;
  // Like Ghost, count ~12 seconds per image
  const images = content.match(/!\[[^\]]*\]\([^)]+\)/g)?.length ?? 0;

  return {
    slug,
    title: data.title,
    publishedAt: data.publishedAt,
    updatedAt: data.updatedAt,
    author: data.author,
    image: data.image,
    imageAlt: data.imageAlt,
    description: data.description,
    tags: data.tags ?? [],
    readingTime: Math.max(1, Math.round(words / WORDS_PER_MINUTE + images / 5)),
    content,
  };
}

/** All posts, newest first. */
export const getPosts = cache((): Post[] => {
  return fs
    .readdirSync(POSTS_DIR)
    .filter((file) => file.endsWith(".md"))
    .map((file) => readPost(file.replace(/\.md$/, "")))
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
});

export const getSinglePost = cache((slug: string): Post | undefined => {
  return getPosts().find((post) => post.slug === slug);
});
