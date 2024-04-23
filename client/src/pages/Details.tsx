import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaRegHeart } from 'react-icons/fa6';
// import { IoMdHeart } from "react-icons/io";
import { FaCircle } from 'react-icons/fa';
import { FaRegCircle } from 'react-icons/fa';
import { toDollars } from '../../lib/to-dollars';

export type ProductDetails = {
  productId: number;
  imageUrl: string;
  name: string;
  price: number;
  color: string;
  sizes: string[];
};

export function Details() {
  const { productId } = useParams<{ productId: string }>();
  const [details, setDetails] = useState<ProductDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<unknown>();

  useEffect(() => {
    async function loadDetails() {
      try {
        const response = await fetch(`/api/p/${productId}`);
        if (!response.ok)
          throw new Error(`Fetch error with status ${response.status}`);
        const result = await response.json();
        setDetails(result);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }
    if (productId) {
      loadDetails();
    }
  }, [productId]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div>
        Cannot load product details due to{' '}
        {error instanceof Error ? error.message : 'unknown error'}.
      </div>
    );
  }

  if (!details) {
    return <div>No product details available.</div>;
  }

  const { name, imageUrl, price, color, sizes } = details;
  const colors = {
    black: '000000',
    white: 'ffffff',
    grey: '#9ca3af',
    natural: '#fff7ed',
    brown: '#431407',
    yellow: '#fde047',
    red: '#be123c',
    pink: '#f9a8d4',
    green: '#16a34a',
    blue: '#0ea5e9',
  };
  return (
    <div className="flex">
      <div className="w-1/2 relative">
        <img src={imageUrl} alt={name} />
        <FaRegHeart className="absolute top-5 right-5" />
      </div>
      <div className="w-1/2 mx-8 flex flex-col">
        <div className="mt-3 mb-3">
          <p className="py-3 text-xl">{name}</p>
          <p className="py-3">{toDollars(price)}</p>
          <hr className="pb-3" />
        </div>
        <div className="mb-3">
          <p className="pb-3">COLOR: {color}</p>
          {colors[color] === 'white' ? (
            <FaRegCircle color={colors[color]} className="my-3" />
          ) : (
            <FaCircle color={colors[color]} className="my-3" />
          )}
          <hr className="my-3" />
        </div>
        <div className="mb-2">
          <p className="py-3">SELECT SIZE:</p>
          <div>
            {sizes.map((size) => (
              <button key={size} className="border-solid pl-12 pb-6">
                {size}
              </button>
            ))}
          </div>
        </div>
        <div className="flex justify-center">
          <button className="mx-16 border-solid bg-black text-white w-full h-10">
            Add to bag
          </button>
        </div>
        <p className="underline my-6 cursor-pointer">Product details</p>
      </div>
    </div>
  );
}