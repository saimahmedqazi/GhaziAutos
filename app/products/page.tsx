import { client } from '../../sanity/lib/client';
import Image from 'next/image';

type Product = {
  _id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
};

async function getProducts(): Promise<Product[]> {
  const query = `*[_type == "product"] {
    _id,
    name,
    description,
    price,
    "imageUrl": image.asset->url
  }`;
  return await client.fetch(query);
}

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Our Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product._id} className="border p-4 rounded-lg shadow-sm">
            <Image
              src={product.imageUrl}
              alt={product.name}
              width={300}
              height={200}
              className="rounded-lg"
            />
            <h2 className="text-xl font-semibold mt-2">{product.name}</h2>
            <p className="text-gray-600">{product.description}</p>
            <p className="text-lg font-bold mt-2">${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
