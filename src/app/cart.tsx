import { useState, useEffect } from 'react';
import StoreLayout from '../components/StoreLayout';

export default function CartPage() {
  const [cart, setCart] = useState<any[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('cart');
    setCart(stored ? JSON.parse(stored) : []);
  }, []);

  const updateQuantity = (idx: number, qty: number) => {
    const updated = cart.map((item, i) => i === idx ? { ...item, quantity: qty } : item);
    setCart(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
  };

  const removeItem = (idx: number) => {
    const updated = cart.filter((_, i) => i !== idx);
    setCart(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <StoreLayout>
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      {cart.length === 0 ? (
        <div className="text-gray-500">Your cart is empty.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded shadow">
            <thead>
              <tr>
                <th className="p-2">Product</th>
                <th className="p-2">Size</th>
                <th className="p-2">Color</th>
                <th className="p-2">Quantity</th>
                <th className="p-2">Price</th>
                <th className="p-2">Remove</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item, idx) => (
                <tr key={idx} className="border-t">
                  <td className="p-2">{item.name}</td>
                  <td className="p-2">{item.size}</td>
                  <td className="p-2">{item.color}</td>
                  <td className="p-2">
                    <input type="number" min={1} value={item.quantity} onChange={e => updateQuantity(idx, Number(e.target.value))} className="w-16 border rounded px-2 py-1" />
                  </td>
                  <td className="p-2">${item.price}</td>
                  <td className="p-2">
                    <button onClick={() => removeItem(idx)} className="text-red-500 hover:underline">Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="text-right mt-4 font-bold">Total: ${total.toFixed(2)}</div>
          <div className="text-right mt-2">
            <a href="/checkout" className="bg-pink-600 text-white px-6 py-2 rounded hover:bg-pink-700">Proceed to Checkout</a>
          </div>
        </div>
      )}
    </StoreLayout>
  );
}
