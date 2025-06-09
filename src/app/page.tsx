import ProductCard from '../components/ProductCard';

import { useEffect, useState } from 'react';

export default function HomePage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(setProducts)
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <h1 className="text-3xl font-bold mb-6 text-center">All Dresses</h1>
      {loading ? (
        <div className="text-center text-gray-500">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              image={product.images?.[0] || '/file.svg'}
              name={product.name}
              price={product.price}
              rating={product.rating || 0}
              onClick={() => window.location.href = `/product/${product._id}`}
            />
          ))}
        </div>
      )}
    </>
  );
}
