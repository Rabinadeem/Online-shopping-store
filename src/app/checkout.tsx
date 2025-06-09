import { useState, useEffect } from 'react';
import StoreLayout from '../components/StoreLayout';

export default function CheckoutPage() {
  const [cart, setCart] = useState<any[]>([]);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [payment, setPayment] = useState('COD');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('cart');
    setCart(stored ? JSON.parse(stored) : []);
  }, []);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      if (!name || !address || !phone || !email) throw new Error('All fields are required');
      const token = localStorage.getItem('token');
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          items: cart,
          total,
          shippingAddress: address,
          phone,
          paymentMethod: payment,
          customerName: name,
          customerEmail: email,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Order failed');
      setSuccess('Order placed successfully!');
      setCart([]);
      localStorage.removeItem('cart');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <StoreLayout>
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      {cart.length === 0 ? (
        <div className="text-gray-500">Your cart is empty.</div>
      ) : (
        <form className="max-w-lg mx-auto flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="font-bold">Order Total: ${total.toFixed(2)}</div>
          <input type="text" placeholder="Name" className="border rounded px-3 py-2" value={name} onChange={e => setName(e.target.value)} required />
          <input type="text" placeholder="Shipping Address" className="border rounded px-3 py-2" value={address} onChange={e => setAddress(e.target.value)} required />
          <input type="tel" placeholder="Phone Number" className="border rounded px-3 py-2" value={phone} onChange={e => setPhone(e.target.value)} required />
          <input type="email" placeholder="Email" className="border rounded px-3 py-2" value={email} onChange={e => setEmail(e.target.value)} required />
          <div className="flex gap-4 items-center">
            <label className="font-semibold">Payment:</label>
            <label><input type="radio" name="payment" value="COD" checked={payment === 'COD'} onChange={() => setPayment('COD')} /> Cash on Delivery</label>
            <label><input type="radio" name="payment" value="Card" checked={payment === 'Card'} onChange={() => setPayment('Card')} /> Card Payment (UI only)</label>
          </div>
          <button type="submit" className="bg-pink-600 text-white py-2 rounded hover:bg-pink-700" disabled={loading}>{loading ? 'Placing Order...' : 'Place Order'}</button>
          {error && <div className="text-red-500 text-sm">{error}</div>}
          {success && <div className="text-green-600 text-sm">{success}</div>}
        </form>
      )}
    </StoreLayout>
  );
}
