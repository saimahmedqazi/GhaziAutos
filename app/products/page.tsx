'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { client } from '../../sanity/lib/client'

const brands = ['Honda', 'Toyota', 'Suzuki', 'KIA', 'Hyundai']

const categories = [
  'engine-oil-petrol',
  'coolant',
  'brake-fluid',
  'gear-oil',
  'transmission-fluid',
  'power-steering-fluid'
]

const PRODUCTS_PER_PAGE = 9

type Product = {
  _id: string
  name: string
  slug: { current: string }
  description: string | null
  price: number
  oldPrice?: number
  priceNote?: string
  tag?: 'best-seller'
  imageUrl?: string
  category: string
  _type: string
}

function getFirstSentence(text: string | null): string {
  if (!text || typeof text !== 'string') return ''
  const end = text.indexOf('.') + 1
  return end > 0 ? text.slice(0, end) : text
}

export default function ProductsPage() {
  const [search, setSearch] = useState('')
  const [selectedBrand, setSelectedBrand] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [products, setProducts] = useState<Product[]>([])
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    async function fetchProducts() {
      const query = `*[_type in ["oil", "product"]] {
        _id,
        name,
        slug,
        description,
        price,
        oldPrice,
        priceNote,
        tag,
        category,
        _type,
        "imageUrl": image.asset->url
      }`
      const data = await client.fetch(query)
      setProducts(data)
    }
    fetchProducts()
  }, [])

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase()) &&
    (selectedCategory ? product.category === selectedCategory : true)
  )

  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE)
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE
  const currentProducts = filteredProducts.slice(startIndex, startIndex + PRODUCTS_PER_PAGE)

  return (
    <div className="container mx-auto px-4 py-12 min-h-screen pt-[10rem]">
      <h1 className="text-4xl font-bold mb-8 text-center text-blue-800">
        Oil & Coolant Products
      </h1>

      {/* Filters */}
      <div className="grid gap-4 mb-10 md:grid-cols-5">
        <input
          type="text"
          placeholder="Search product..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded-md col-span-2"
        />

        <select
          className="border p-2 rounded-md"
          value={selectedBrand}
          onChange={(e) => setSelectedBrand(e.target.value)}
        >
          <option value="">Search by Brand</option>
          {brands.map((b) => <option key={b}>{b}</option>)}
        </select>

        <select
          className="border p-2 rounded-md"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">Filter by category</option>
          {categories.map((c) => (
            <option key={c} value={c}>{c.replace(/-/g, ' ')}</option>
          ))}
        </select>
      </div>

      {/* Product Cards */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {currentProducts.map((product) => (
          <Link
            key={product._id}
            href={`/products/${product.slug.current}`}
            className="relative bg-white border rounded-xl shadow p-4 hover:shadow-md transition"
          >
            {product.tag === 'best-seller' && (
              <span className="text-xs bg-red-600 text-white px-2 py-1 rounded-md absolute top-2 left-2">
                Best Seller
              </span>
            )}
            <div className="w-full h-40 relative">
              {product.imageUrl ? (
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  fill
                  className="object-contain p-2"
                />
              ) : (
                <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
                  No Image
                </div>
              )}
            </div>
            <div className="mt-3 space-y-1">
              <h3 className="text-lg font-bold line-clamp-2">{product.name}</h3>
              <p className="text-xs text-blue-600 capitalize">
                {product.category.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
              </p>
              <p className="text-sm text-gray-500 line-clamp-2">
                {getFirstSentence(product.description)}
              </p>
              <p className="text-green-600 font-bold text-base">
                ₨ {product.price}
              </p>
              {product.priceNote && (
                <p className="text-xs text-orange-500">{product.priceNote}</p>
              )}
            </div>
          </Link>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-12 gap-2 flex-wrap">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`px-4 py-2 text-sm rounded-md border font-medium transition ${
                currentPage === index + 1
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-blue-600 border-gray-300 hover:bg-blue-50'
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}