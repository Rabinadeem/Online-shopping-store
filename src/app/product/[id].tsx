import React from 'react';
import StoreLayout from '../../components/StoreLayout';
import ProductGallery from '../../components/ProductGallery';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function ProductDetailPage() {
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const router = useRouter();
  const { id } = router.query as { id: string };

  useEffect(() => {
    if (!id) return;
    fetch(`/api/products/${id}`)
      .then(res => res.json())
      .then(setProduct)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <StoreLayout><div>Loading...</div></StoreLayout>;
  if (!product) return <StoreLayout><div>Product not found.</div></StoreLayout>;

  const addToCart = () => {
    if (!selectedSize || !selectedColor) {
      alert('Please select size and color');
      return;
    }
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    cart.push({
      productId: product._id,
      name: product.name,
      price: product.price,
      size: selectedSize,
      color: selectedColor,
      quantity,
    });
    localStorage.setItem('cart', JSON.stringify(cart));
    window.location.href = '/cart';
  };

  return (
    <StoreLayout>
      <div className="grid md:grid-cols-2 gap-8">
        <ProductGallery images={product.images || []} />
        <div>
          <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
          <div className="text-pink-600 font-bold text-xl mb-2">${product.price}</div>
          <div className="mb-2 text-yellow-400">{'★'.repeat(product.rating || 0)}{'☆'.repeat(5 - (product.rating || 0))}</div>
          <div className="mb-2">
            <span className="font-semibold">Sizes:</span>
            <div className="flex gap-2 mt-1">
              {(product.sizes || []).map((size: string) => (
                <button key={size} className={`border px-3 py-1 rounded hover:bg-pink-100 ${selectedSize === size ? 'bg-pink-200' : ''}`} onClick={() => setSelectedSize(size)}>{size}</button>
              ))}
            </div>
          </div>
          <div className="mb-2">
            <span className="font-semibold">Colors:</span>
            <div className="flex gap-2 mt-1">
              {(product.colors || []).map((color: string) => (
                <button key={color} className={`border px-3 py-1 rounded hover:bg-pink-100 ${selectedColor === color ? 'bg-pink-200' : ''}`} onClick={() => setSelectedColor(color)}>{color}</button>
              ))}
            </div>
          </div>
          <div className="mb-2">
            <span className="font-semibold">Quantity:</span>
            <input type="number" min={1} value={quantity} onChange={e => setQuantity(Number(e.target.value))} className="border rounded px-2 py-1 w-16 ml-2" />
          </div>
          <button className="bg-pink-600 text-white px-6 py-2 rounded mt-4 hover:bg-pink-700" onClick={addToCart}>Add to Cart</button>
          <p className="mt-6 text-gray-600">{product.description}</p>
        </div>
      </div>
    </StoreLayout>
  );
}
