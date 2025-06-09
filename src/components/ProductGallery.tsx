import React from 'react';

interface ProductGalleryProps {
  images: string[];
}

const ProductGallery: React.FC<ProductGalleryProps> = ({ images }) => {
  const [selected, setSelected] = React.useState(0);
  return (
    <div>
      <img src={images[selected]} alt="Product" className="w-full h-80 object-cover rounded-lg mb-4" />
      <div className="flex gap-2 justify-center">
        {images.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt="thumb"
            className={`w-16 h-16 object-cover rounded cursor-pointer border-2 ${selected === idx ? 'border-pink-500' : 'border-transparent'}`}
            onClick={() => setSelected(idx)}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductGallery;
