import React from 'react';

export interface ProductCardProps {
  image: string;
  name: string;
  price: number;
  rating: number;
  onClick?: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ image, name, price, rating, onClick }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 cursor-pointer hover:shadow-lg transition" onClick={onClick}>
      <img src={image} alt={name} className="w-full h-48 object-cover rounded-md mb-3" />
      <h3 className="font-semibold text-lg mb-1">{name}</h3>
      <div className="flex items-center mb-1">
        <span className="text-pink-600 font-bold text-md mr-2">${price}</span>
        <span className="text-yellow-400">{'★'.repeat(rating)}{'☆'.repeat(5 - rating)}</span>
      </div>
    </div>
  );
};

export default ProductCard;
