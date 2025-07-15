'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { client } from '../../sanity/lib/client'

type Product = {
  _id: string
  name: string
  slug: { current: string }
  description: string
  price: number
  oldPrice?: number
  priceNote?: string
  tag?: 'best-seller'
  imageUrl: string
  category: string
}


export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    async function fetchProducts() {
      const query = `*[_type == "oil"][0...3] {
  _id,
  name,
  slug,
  description,
  price,
  oldPrice,
  priceNote,
  tag,
  category,
  "imageUrl": image.asset->url
}`

      const data = await client.fetch(query)
      setProducts(data)
    }

    fetchProducts()
  }, [])

  return (
    <section className="min-h-[50vh] py-10 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-10 text-blue-800 text-center">
          Featured Products
        </h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <Link
  key={product._id}
  href={`/products/${product.slug.current}`}
  className="relative bg-white border border-gray-200 rounded-xl shadow hover:shadow-lg transition-all duration-300 overflow-hidden group"
>
  {/* Best Seller Badge */}
  {product.tag === 'best-seller' && (
    <span className="absolute top-2 left-2 bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded-md shadow z-10">
      Best Seller
    </span>
  )}

  {/* Image */}
  <div className="relative w-full h-40 bg-white border-b border-gray-100">
    <Image
      src={product.imageUrl}
      alt={product.name}
      fill
      className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
    />
  </div>

  {/* Info */}
  <div className="p-4 flex flex-col justify-between flex-1">
    <div className="flex justify-between items-center mb-2">
      <h3 className="text-base font-semibold text-gray-800 line-clamp-2">
        {product.name}
      </h3>

      {/* Pricing */}
      <div className="text-right">
        {product.oldPrice && product.oldPrice > product.price ? (
          <>
            <span className="text-sm text-gray-400 line-through block">
              ₨ {product.oldPrice}
            </span>
            <span className="text-lg font-bold text-green-600 block">
              ₨ {product.price}
            </span>
            <span className="text-xs text-red-500 font-medium">
              Save {Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}%
            </span>
          </>
        ) : (
          <span className="text-lg font-bold text-green-600 block">
            ₨ {product.price}
          </span>
        )}
      </div>
    </div>

    {/* Category */}
    <p className="text-xs text-blue-600 mb-2 capitalize">
      {product.category.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
    </p>

    {/* Description */}
    <p className="text-sm text-gray-500 line-clamp-2 mb-1">
      {product.description.split('.')[0]}.
    </p>

    {/* Optional Price Note */}
    {product.priceNote && (
      <p className="text-xs text-orange-500 font-semibold">
        {product.priceNote}
      </p>
    )}
  </div>
</Link>

          ))}
        </div>
      </div>
    </section>
  )
}
