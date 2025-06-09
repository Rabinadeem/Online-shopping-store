import React from 'react';

import { useEffect, useState } from 'react';

const Navbar = () => {
  const [user, setUser] = useState<{ name: string; role: string } | null>(null);

  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (token) {
      fetch('/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(res => res.json())
        .then(data => {
          if (data.user) setUser(data.user);
        })
        .catch(() => setUser(null));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    window.location.href = '/';
  };

  return (
    <nav className="w-full bg-white shadow-md py-4 px-8 flex justify-between items-center">
      <div className="text-2xl font-bold text-pink-600">Rabia Online Store</div>
      <div className="flex gap-6 items-center">
        <a href="/" className="hover:text-pink-500">Home</a>
        <a href="/cart" className="hover:text-pink-500">Cart</a>
        {user ? (
          <>
            {user.role === 'admin' && (
              <a href="/admin/dashboard" className="hover:text-pink-500">Admin</a>
            )}
            <span className="text-gray-700">Hi, {user.name.split(' ')[0]}</span>
            <button onClick={handleLogout} className="hover:text-pink-500">Logout</button>
          </>
        ) : (
          <>
            <a href="/login" className="hover:text-pink-500">Login</a>
            <a href="/register" className="hover:text-pink-500">Register</a>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
