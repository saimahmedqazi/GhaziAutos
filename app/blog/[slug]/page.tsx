import { client } from '../../../sanity/lib/client'
import { PortableText } from '@portabletext/react'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

// Define PageProps locally to satisfy internal checks
type PageProps<P = { slug: string }> = {
  params: P
}

// Optional: SEO metadata
export async function generateMetadata({ params }: PageProps<{ slug: string }>): Promise<Metadata> {
  return {
    title: params.slug.replace(/-/g, ' ').toUpperCase(),
  }
}

// Generate dynamic routes
export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const slugs: { slug: { current: string } }[] = await client.fetch(
    `*[_type == \"blog\"]{ slug }`
  )

  return slugs.map(({ slug }) => ({
    slug: slug.current,
  }))
}

export default async function BlogPost({ params }: PageProps<{ slug: string }>) {
  const post = await client.fetch(
    `*[_type == \"blog\" && slug.current == $slug][0]{
      title,
      publishedAt,
      excerpt,
      content,
      author,
      \"mainImage\": mainImage.asset->url
    }`,
    { slug: params.slug }
  )

  if (!post) return notFound()

  return (
    <article className="container mx-auto px-4 py-12 min-h-screen">
      {/* Title */}
      <h1 className="text-4xl font-bold text-center text-blue-800 mb-4">
        {post.title}
      </h1>

      {/* Date */}
      {post.publishedAt && (
        <p className="text-sm text-center text-gray-500 mb-6">
          {new Date(post.publishedAt).toLocaleDateString('en-GB')}
        </p>
      )}

      {/* Author */}
      {post.author && (
        <p className="text-sm text-center text-gray-600 mb-6">
          By {post.author}
        </p>
      )}

      {/* Main Image */}
      {post.mainImage && (
        <div className="relative w-full h-72 mb-8 rounded-lg overflow-hidden">
          <Image
            src={post.mainImage}
            alt={post.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      )}

      {/* Excerpt */}
      {post.excerpt && (
        <p className="text-lg text-gray-600 text-center max-w-2xl mx-auto mb-10">
          {post.excerpt}
        </p>
      )}

      {/* Content */}
      <div className="prose max-w-none prose-blue prose-lg">
        <PortableText value={post.content} />
      </div>
    </article>
  )
}