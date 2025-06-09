import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full bg-gray-100 text-center py-4 mt-8 text-gray-600 text-sm">
      &copy; {new Date().getFullYear()} Rabia Online Store. All rights reserved.
    </footer>
  );
};

export default Footer;
