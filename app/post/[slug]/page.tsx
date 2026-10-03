import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getPosts, getSinglePost } from '@/lib/blog';
import { BlogPost } from '@/components/blog/post';
import { OPENGRAPH_SITE_NAME } from '@/configuration';

type URLParams = {
  slug: string
}

export const dynamicParams = false;

export function generateStaticParams(): URLParams[] {
  return getPosts().map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<URLParams> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getSinglePost(slug);
  if (!post) {
    return {}
  }

  const baseUrl = process.env.BASE_URL || "http://localhost:3000";
  const { title, description, publishedAt: publishedTime, image } = post
  const images = image ? [`${baseUrl}${image}`] : undefined

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      siteName: OPENGRAPH_SITE_NAME,
      type: 'article',
      publishedTime,
      url: `${baseUrl}/post/${post.slug}`,
      images,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images,
    },
  }
}

export default async function BlogPostPage({
  params
}: {
  params: Promise<URLParams>
}) {
  const { slug } = await params;
  const post = getSinglePost(slug);
  if (!post) {
    notFound()
  }

  return <>
    <meta name="robots" content="all" />
    <BlogPost post={post} />
  </>
}
