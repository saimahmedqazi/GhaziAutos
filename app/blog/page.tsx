'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { client } from '../../sanity/lib/client'

interface BlogPost {
  _id: string
  title: string
  slug: { current: string }
  excerpt?: string
  publishedAt: string
  imageUrl?: string
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const query = `*[_type == "blog"] | order(publishedAt desc) {
          _id,
          title,
          slug,
          excerpt,
          publishedAt,
          "imageUrl": mainImage.asset->url
        }`
        const data = await client.fetch(query)
        setPosts(data)
      } catch (error) {
        console.error('Failed to fetch blog posts:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  return (
    <div className="container mx-auto px-4 py-12 min-h-screen pt-[10rem]">
      <h1 className="text-4xl font-bold text-center mb-12 text-blue-800">Our Blog</h1>

      {loading ? (
        <p className="text-center text-gray-500">Loading posts...</p>
      ) : posts.length === 0 ? (
        <p className="text-center text-gray-500">No blog posts found.</p>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post._id}
              href={`/blog/${post.slug.current}`}
              className="bg-white border rounded-lg shadow hover:shadow-md transition overflow-hidden"
            >
              <div className="w-full h-48 relative bg-gray-100">
                {post.imageUrl ? (
                  <Image
                    src={post.imageUrl}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    No Image
                  </div>
                )}
              </div>
              <div className="p-5">
                <h2 className="text-xl font-semibold text-gray-900 line-clamp-2">
                  {post.title}
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  {new Date(post.publishedAt).toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </p>
                <p className="text-sm text-gray-600 mt-3 line-clamp-3">
                  {post.excerpt || 'No excerpt provided.'}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
