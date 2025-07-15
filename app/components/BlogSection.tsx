'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { client } from '../../sanity/lib/client'

type Blog = {
  _id: string
  title: string
  slug: { current: string }
  excerpt?: string
  publishedAt?: string
  mainImage?: { asset: { url: string } }
}

export default function BlogSection() {
  const [blogs, setBlogs] = useState<Blog[]>([])

  useEffect(() => {
    async function fetchBlogs() {
      const query = `*[_type == "blog"] | order(publishedAt desc)[0...3] {
        _id,
        title,
        slug,
        excerpt,
        publishedAt,
        mainImage { asset-> { url } }
      }`
      const data = await client.fetch(query)
      setBlogs(data)
    }

    fetchBlogs()
  }, [])

  if (blogs.length === 0) return null

  return (
    <section className="container mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-blue-800 text-center mb-8">
        Latest from the Blog
      </h2>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {blogs.map((post) => (
          <div
            key={post._id}
            className="bg-white border rounded-xl shadow p-4 hover:shadow-md transition"
          >
            {post.mainImage?.asset?.url && (
              <div className="w-full h-48 relative mb-4">
                <Image
                  src={post.mainImage.asset.url}
                  alt={post.title}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            )}

            <h3 className="text-xl font-semibold mb-2 line-clamp-2">
              {post.title}
            </h3>

            <p className="text-gray-500 text-sm line-clamp-3 mb-4">
              {post.excerpt}
            </p>

            {post.publishedAt && (
              <p className="text-xs text-gray-400 mb-3">
                {new Date(post.publishedAt).toLocaleDateString('en-GB')}
              </p>
            )}

            <Link
              href={`/blog/${post.slug.current}`}
              className="inline-block text-blue-600 hover:underline text-sm font-medium"
            >
              Read More →
            </Link>
          </div>
        ))}
      </div>
    </section>
  )
}
