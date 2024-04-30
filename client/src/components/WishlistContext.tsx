import { createContext, useState, useEffect } from 'react';
import { useUser } from './useUser';

export type WishlistProduct = {
  productId: number;
  imageUrl: string;
  name: string;
  price: number;
  colors: string[];
  sizes: string[];
  materials: string[];
};

export type WishlistContextValues = {
  wishlist: WishlistProduct[];
  isInWishlist: (productId: number)=> boolean;
  addToWishlist: (productId: number) => void;
  removeFromWishlist: (productId: number) => void;
  error?: unknown;
  isLoading?: boolean;
};

export const WishlistContext = createContext<WishlistContextValues>({
  wishlist: [],
  isInWishlist: ()=> false,
  addToWishlist: () => undefined,
  removeFromWishlist: () => undefined,
});

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState<WishlistProduct[]>([]);
  const [error, setError] = useState<unknown>();
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useUser();

  function isInWishlist (productId: number): boolean{
    return wishlist.some((product) => product.productId === productId);
  }

  async function addToWishlist(productId: number) {
    try {
      if (!user) return;
      const response = await fetch(`/api/wishlist/${productId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) throw new Error('Error adding to wishlist.');
      const result = await response.json();
      setWishlist([...wishlist, result]);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function removeFromWishlist(productId: number) {
    try {
      if (!user) return;
      const response = await fetch(`/api/wishlist/${productId}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Error deleting from wishlist.');
      const deletedItem = await response.json();
      alert(`${deletedItem.name} has been deleted.`);
      setWishlist((oldWishlist) =>
        oldWishlist.filter((product) => product.productId !== productId)
      );
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    async function fetchWishlist() {
      try {
        if (!user) return;
        const response = await fetch('/api/wishlist/');
        if (!response.ok) throw new Error('Fetching wishlist failed.');
        const result = await response.json();
        setWishlist(result);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchWishlist();
  }, [user]);

  return (
    <WishlistContext.Provider
      value={{ error, isLoading, wishlist, isInWishlist, addToWishlist, removeFromWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}
