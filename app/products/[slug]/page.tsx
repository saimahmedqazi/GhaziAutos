// app/products/[slug]/page.tsx
import { client } from '../../../sanity/lib/client'
import Image from 'next/image'
import { notFound } from 'next/navigation'

type Props = {
  params: { slug: string }
}

export default async function ProductPage({ params }: Props) {
  const { slug } = params; // Now clearly destructured from resolved `params`

  const product = await client.fetch(
    `*[_type == "oil" && slug.current == $slug][0]{
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
    }`,
    { slug }
  )

  if (!product) return notFound()

  return (
    <div className="min-h-screen flex items-center justify-center pt-[5.8125rem] px-4 bg-gray-50">
      <div className="max-w-5xl w-full grid md:grid-cols-2 gap-8 items-center bg-white shadow rounded-xl p-6">
        <div className="relative w-full h-96 border border-gray-200 rounded-lg overflow-hidden bg-white">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-contain p-4"
          />
        </div>
        <div className="space-y-4">
          {product.tag === 'best-seller' && (
            <span className="inline-block bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded shadow">
              Best Seller
            </span>
          )}
          <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
          <p className="text-blue-600 font-medium text-sm capitalize">
            {product.category
              .replace(/-/g, ' ')
              .replace(/\b\w/g, (c: string) => c.toUpperCase())}
          </p>
          <p className="text-gray-600 leading-relaxed">{product.description}</p>
          <div>
            {product.oldPrice && product.oldPrice > product.price ? (
              <>
                <p className="text-sm text-gray-400 line-through">PKR {product.oldPrice}</p>
                <p className="text-2xl font-bold text-green-600">PKR {product.price}</p>
                <p className="text-xs text-red-500 font-medium">
                  Save {Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}%
                </p>
              </>
            ) : (
              <p className="text-2xl font-bold text-green-600">PKR {product.price}</p>
            )}
          </div>
          {product.priceNote && (
            <p className="text-sm text-orange-500 font-semibold">{product.priceNote}</p>
          )}
        </div>
      </div>
    </div>
  )
}

export async function generateStaticParams() {
  const slugs = await client.fetch(
    `*[_type == "oil" && defined(slug.current)][].slug.current`
  )

  return slugs.map((slug: string) => ({ slug }))
}
