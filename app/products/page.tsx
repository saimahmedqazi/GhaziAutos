import { client } from '../../sanity/lib/client';
import Image from 'next/image';

type Product = {
  _id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
};

// Get only first sentence
function getFirstSentence(text: string): string {
  const end = text.indexOf('.') + 1;
  return end > 0 ? text.slice(0, end) : text;
}

async function getProducts(): Promise<Product[]> {
  const query = `*[_type == "oil"] {
    _id,
    name,
    description,
    price,
    category,
    "imageUrl": image.asset->url
  }`;
  return await client.fetch(query);
}

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-10 text-center text-orange-600">
        Oil & Coolant Products
      </h1>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden"
          >
            {/* Image with fixed height and responsive width */}
            <div className="w-full h-64 relative">
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                className="object-contain p-4"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                quality={70}
              />
            </div>

            {/* Product info */}
            <div className="p-5">
              <h2 className="text-lg font-bold text-gray-900">{product.name}</h2>
              <p className="text-xs text-orange-500 font-medium mt-1">
                {product.category.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}
              </p>
              <p className="text-gray-600 text-sm mt-3 leading-relaxed">
                {getFirstSentence(product.description)}
              </p>
              <p className="text-xl font-bold text-green-600 mt-4">${product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
