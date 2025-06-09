import { useEffect, useState } from 'react';
import StoreLayout from '../../components/StoreLayout';

export default function AdminDashboard() {
  const [user, setUser] = useState<{ name: string; role: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (!token) {
      window.location.href = '/login';
      return;
    }
    fetch('/api/auth/me', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => {
        if (!data.user || data.user.role !== 'admin') {
          window.location.href = '/';
        } else {
          setUser(data.user);
        }
      })
      .catch(() => window.location.href = '/')
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <StoreLayout><div>Loading...</div></StoreLayout>;
  if (!user) return null;

  return (
    <StoreLayout>
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <div className="text-gray-500">Welcome, {user.name} (Admin)</div>
      {/* Admin controls/components will go here */}
    </StoreLayout>
  );
}
