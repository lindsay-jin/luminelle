import { createContext, useState, useEffect } from 'react';
import { useUser } from './useUser';
import { type Product } from '../pages/Catalog';

export type WishlistContextValues = {
  wishlist: Product[];
  isInWishlist: (productId: number) => boolean;
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: number) => void;
  error?: unknown;
  isLoading?: boolean;
};

export const WishlistContext = createContext<WishlistContextValues>({
  wishlist: [],
  isInWishlist: () => false,
  addToWishlist: () => undefined,
  removeFromWishlist: () => undefined,
});

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [error, setError] = useState<unknown>();
  const [isLoading, setIsLoading] = useState(true);
  const { user, token } = useUser();

  function isInWishlist(productId: number): boolean {
    return wishlist.some((product) => product.productId === productId);
  }

  async function addToWishlist(product: Product) {
    try {
      if (!user) return;
      const response = await fetch(`/api/wishlist/${product.productId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error('Error adding to wishlist.');
      await response.json();
      setWishlist([...wishlist, product]);
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
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error('Error deleting from wishlist.');
      await response.json();
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
        const response = await fetch('/api/wishlist/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
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
  }, [user, token]);

  return (
    <WishlistContext.Provider
      value={{
        error,
        isLoading,
        wishlist,
        isInWishlist,
        addToWishlist,
        removeFromWishlist,
      }}>
      {children}
    </WishlistContext.Provider>
  );
}
