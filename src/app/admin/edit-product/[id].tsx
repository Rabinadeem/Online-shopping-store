import { useEffect, useState } from 'react';
import StoreLayout from '../../../components/StoreLayout';
import { useRouter } from 'next/router';

export default function EditProductPage() {
  const router = useRouter();
  const { id } = router.query as { id: string };
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [sizes, setSizes] = useState('');
  const [colors, setColors] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!id) return;
    fetch(`/api/products/${id}`)
      .then(res => res.json())
      .then(product => {
        setName(product.name || '');
        setPrice(product.price?.toString() || '');
        setImages(product.images || []);
        setSizes((product.sizes || []).join(','));
        setColors((product.colors || []).join(','));
        setDescription(product.description || '');
        setLoaded(true);
      });
  }, [id]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    setImages(Array.from(files).map(file => URL.createObjectURL(file)));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`/api/products/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name,
          price: parseFloat(price),
          images,
          sizes: sizes.split(',').map(s => s.trim()),
          colors: colors.split(',').map(c => c.trim()),
          description,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to update product');
      setSuccess('Product updated!');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    setLoading(true);
    setError('');
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to delete product');
      window.location.href = '/admin/dashboard';
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!loaded) return <StoreLayout><div>Loading...</div></StoreLayout>;

  return (
    <StoreLayout>
      <h1 className="text-2xl font-bold mb-4">Edit Product</h1>
      <form className="max-w-lg mx-auto flex flex-col gap-4" onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" className="border rounded px-3 py-2" value={name} onChange={e => setName(e.target.value)} required />
        <input type="number" placeholder="Price" className="border rounded px-3 py-2" value={price} onChange={e => setPrice(e.target.value)} required />
        <input type="file" multiple accept="image/*" className="border rounded px-3 py-2" onChange={handleImageChange} />
        <input type="text" placeholder="Sizes (comma separated)" className="border rounded px-3 py-2" value={sizes} onChange={e => setSizes(e.target.value)} />
        <input type="text" placeholder="Colors (comma separated)" className="border rounded px-3 py-2" value={colors} onChange={e => setColors(e.target.value)} />
        <textarea placeholder="Description" className="border rounded px-3 py-2" value={description} onChange={e => setDescription(e.target.value)} />
        <button type="submit" className="bg-pink-600 text-white py-2 rounded hover:bg-pink-700" disabled={loading}>{loading ? 'Updating...' : 'Update Product'}</button>
        <button type="button" className="bg-red-600 text-white py-2 rounded hover:bg-red-700" onClick={handleDelete} disabled={loading}>Delete Product</button>
        {error && <div className="text-red-500 text-sm">{error}</div>}
        {success && <div className="text-green-600 text-sm">{success}</div>}
      </form>
      {images.length > 0 && (
        <div className="flex gap-2 mt-4 flex-wrap">
          {images.map((img, idx) => (
            <img key={idx} src={img} alt="preview" className="w-24 h-24 object-cover rounded" />
          ))}
        </div>
      )}
    </StoreLayout>
  );
}
