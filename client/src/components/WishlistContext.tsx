import {createContext, useState, useEffect } from 'react';
import { useUser } from './useUser';
import { useParams } from 'react-router-dom';

export type WishlistProduct = {
  productId: number;
  imageUrl: string;
  name: string;
  price: number;
}

export type WishlistContextValues = {
  wishlist: WishlistProduct[];
  addToWishlist: (product: WishlistProduct)=> void;
  removeFromWishlist: (productId: number)=> void;
  error?: unknown;
  isLoading?: boolean;
};

export const WishlistContext = createContext<WishlistContextValues>({
  wishlist: [],
  addToWishlist: () => undefined,
  removeFromWishlist: () => undefined,
});

export function WishlistProvider({ children }){
  const [wishlist, setWishlist] = useState<WishlistProduct[]>([]);
  const [error, setError] = useState<unknown>();
  const [isLoading, setIsLoading] = useState(true);
  const {user} = useUser();
  const { productId } = useParams<{ productId: string }>();

  async function addToWishlist(){
    try{
      if(!user) return;
      const response = await fetch('/api/wishlist');
      if (!response.ok) throw new Error('Error adding to wishlist.');
      const result = await response.json();
      setWishlist([...wishlist, result]);
    }catch(error){
      setError(error)
    }finally{
      setIsLoading(false)
    }
  }

  async function removeFromWishlist(productId: number){
    try{
      if(!user) return;
      const response = await fetch(`/api/wishlist/${productId}`);
      if (!response.ok) throw new Error('Error deleting from wishlist.');
      const result = await response.json();
      setWishlist(result.filter((p)=> p.productId !== productId))
    }catch(error){
      setError(error)
    }finally{
      setIsLoading(false)
    }
  }

  useEffect(()=>{
    async function fetchWishlist(){
      try{
        if (!user) return;
        const response = await fetch('/api/wishlist/');
        if (!response.ok) throw new Error('Fetching wishlist failed.');
        const result = await response.json();
        setWishlist(result)
      }catch(error){
        setError(error)
      }finally{
        setIsLoading(false)
      }
    }fetchWishlist();
  }, [user])

  return (
    <WishlistContext.Provider
      value={{ error, isLoading, wishlist, addToWishlist, removeFromWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}
