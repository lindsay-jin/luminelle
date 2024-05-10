import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaRegHeart, FaHeart } from 'react-icons/fa6';
import { FaCircle } from 'react-icons/fa';
import { toDollars } from '../../lib/to-dollars';
import { useWishlist } from '../components/useWishlist';
import { useCart } from '../components/useCart';
import { Product } from './Catalog';

export type ProductDetails = Product & {
  description: string;
};

export function Details() {
  const { productId } = useParams<{ productId: string }>();
  const [details, setDetails] = useState<ProductDetails>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<unknown>();
  const [isOpen, setIsOpen] = useState(false);
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const [isLiked, setIsLiked] = useState(false);
  const [selectedSize, setSelectedSize] = useState('');
  const { addToCart, setIsCartOpen } = useCart();

  useEffect(() => {
    async function loadDetails() {
      try {
        const response = await fetch(`/api/p/${productId}`);
        if (!response.ok)
          throw new Error(`Fetch error with status ${response.status}`);
        const result = await response.json();
        setDetails(result);
        if (!productId) throw new Error('productId does not exist.');
        setIsLiked(isInWishlist(parseInt(productId)));
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }
    if (productId) {
      loadDetails();
    }
  }, [productId, isInWishlist]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error || !details) {
    return (
      <div>
        Cannot load product details due to{' '}
        {error instanceof Error ? error.message : 'unknown error'}.
      </div>
    );
  }

  const { name, imageUrl, price, colors, materials, sizes, description } =
    details;
  // const customColors = {
  //   black: '000000',
  //   white: 'ffffff',
  //   grey: '#9ca3af',
  //   natural: '#fff7ed',
  //   brown: '#431407',
  //   yellow: '#fde047',
  //   red: '#be123c',
  //   pink: '#f9a8d4',
  //   green: '#16a34a',
  //   blue: '#0ea5e9',
  // };

  function toggleMenu() {
    setIsOpen(!isOpen);
  }

  function toggleWishlist() {
    if (!productId) throw new Error('ProductId does not exist.');
    const id = parseInt(productId);
    if (isLiked) {
      removeFromWishlist(id);
    } else {
      if (details) {
        addToWishlist(details);
      }
    }
    setIsLiked(!isLiked);
  }

  function handleAddToCart() {
    if (details && selectedSize) {
      addToCart({
        ...details,
        quantity: 1,
        size: selectedSize,
      });
      setIsCartOpen(true);
    } else {
      alert('Please select a size before adding to cart');
    }
  }

  return (
    <div className="flex pt-4">
      {isOpen && (
        <div className="absolute right-0 top-0 h-full w-1/2 flex flex-col bg-white z-50 transform transition-transform translate-x-0">
          <button className="mr-2 my-4 self-end underline" onClick={toggleMenu}>
            CLOSE
          </button>
          <div className="m-4">
            <div className="m-4">
              <h2 className="text-lg font-medium">Product Details</h2>
              <p>{description}</p>
            </div>
            <hr className="border" />
            <div className="m-4">
              <h2 className="text-lg font-medium">Materials</h2>
              <p>{materials}</p>
            </div>
          </div>
        </div>
      )}
      <div className="w-1/2 relative pr-10">
        {imageUrl.map((url, index) => (
          <div key={index} className="relative my-2">
            <img
              src={url}
              alt={`${name} ${index}`}
              className="w-full h-full object-cover"
            />
            {index === 0 &&
              (isLiked ? (
                <FaHeart
                  className="absolute top-5 right-5 text-2xl cursor-pointer"
                  onClick={toggleWishlist}
                />
              ) : (
                <FaRegHeart
                  className="absolute top-5 right-5 text-2xl cursor-pointer"
                  onClick={toggleWishlist}
                />
              ))}
          </div>
        ))}
      </div>
      <div className="fixed top-14 right-[-10px] w-1/2 flex flex-col pr-6">
        <div className="mt-3 mb-3">
          <p className="py-3 text-xl">{name}</p>
          <p className="py-3">{toDollars(price)}</p>
          <hr className="pb-3" />
        </div>
        <div className="mb-3">
          <p className="pb-3">COLOR: {colors}</p>
          {colors.map((color) => (
            <FaCircle key={color} color={color} className="my-3" />
          ))}
          <hr className="my-3" />
        </div>
        <div className="mb-2">
          <p className="py-3">SELECT SIZE:</p>
          <div>
            {sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`border-solid ml-12 mb-6 px-2 ${
                  selectedSize === size ? 'border border-black' : ''
                }`}>
                {size}
              </button>
            ))}
          </div>
        </div>
        <div className="flex justify-center">
          <button
            className="mx-16 border-solid bg-black text-white w-full h-10"
            onClick={handleAddToCart}>
            Add to bag
          </button>
        </div>
        <p className="underline my-6 cursor-pointer" onClick={toggleMenu}>
          Product details
        </p>
      </div>
    </div>
  );
}
