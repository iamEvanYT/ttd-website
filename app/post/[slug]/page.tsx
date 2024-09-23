import { getPosts, getSinglePost } from '@/lib/ghost-cms';
import { PostOrPage } from '@tryghost/content-api';
import { DynamicCSS } from '@/components/dynamic-css';
import { GhostBlogPost } from '@/components/ghost/post';

type URLParams = {
  slug: string
}

export async function generateStaticParams() {
  const posts = await getPosts();
  if (!posts) {
    return []
  }

  return posts.map((post: PostOrPage) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params } : { params: URLParams }) {
  const post = await getSinglePost(params.slug);
  if (!post) {
    return []
  }

  const baseUrl = process.env.BASE_URL || "http://localhost:3000";

  let {
    title,
    meta_description: description,
    published_at: publishedTime,
    feature_image,
  } = post

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime,
      url: `${baseUrl}/blog/${post.slug}`,
      images: [
        {
          url: feature_image,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [feature_image],
    },
  }
}

export const revalidate = 60;

export default async function BlogPostPage({
  params: {
    slug
  }
}: {
  params: URLParams
}) {
  return <>
    <DynamicCSS hrefs={[
      '/ghost/css/global.css',
      '/ghost/css/screen.css',
      '/ghost/css/cards.css'
    ]} />
    <GhostBlogPost slug={slug} />
  </>
}