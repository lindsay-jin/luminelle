import { createContext, useCallback, useEffect, useState } from 'react';
import { Product } from '../pages/Catalog';
import { saveCart, readCart } from '../../lib/data';
import { useUser } from './useUser';

export type CartProduct = Product & {
  quantity: number;
  size: string;
};

export type CartValues = {
  cart: CartProduct[];
  addToCart: (item: CartProduct) => void;
  removeFromCart: (item: CartProduct) => void;
  isCartOpen: boolean;
  setIsCartOpen: (boolean) => void;
};

export const CartContext = createContext<CartValues>({
  cart: [],
  addToCart: () => undefined,
  removeFromCart: () => undefined,
  isCartOpen: false,
  setIsCartOpen: () => undefined,
});

export function CartProvider({ children }) {
  const [cart, setCart] = useState<CartProduct[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [error, setError] = useState<unknown>();
  const [isLoading, setIsLoading] = useState(true);
  const  {user, token} = useUser();

  const loadCartFromData= useCallback(async ()=>{
    if (!user) return;
    try{
      const response = await fetch('/api/shopping-cart', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setCart(data);
        saveCart([]);
      } else {
        throw new Error('Fetching cart failed.');
      }
    }catch(error){
      setError(error)
    }finally{
      setIsLoading(false)
    }
  },[user, token])

  const copyCartFromData = useCallback(async () => {
    if(!user) return null;
    try{
      const localCart = readCart();
      if (localCart.length > 0) {
        setCart(localCart)
      }
    }catch(error){
      setError(error)
    }finally{
      setIsLoading(false)
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      copyCartFromData();
      loadCartFromData();
    } else {
      setCart(readCart());
      setIsLoading(false);
    }
  }, [user, copyCartFromData, loadCartFromData]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div>
        Cannot load products due to{' '}
        {error instanceof Error ? error.message : 'unknown error'}
      </div>
    );
  }

  async function addToCart(productToAdd: CartProduct) {
    if (user) {
      try {
        const response = await fetch(
          `/api/shopping-cart/${productToAdd.productId}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/JSON',
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) throw new Error('Failed to add product to cart.');
        await response.json();
        loadCartFromData();
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    } else {
      let found = false;
      setCart((oldCart) => {
        const newCart = oldCart.map((product) => {
          if (
            product.productId === productToAdd.productId &&
            product.size === productToAdd.size
          ) {
            found = true;
            return {
              ...product,
              quantity: product.quantity + 1,
            };
          } else {
            return product;
          }
        });
        if (!found) {
          newCart.push({ ...productToAdd, quantity: 1 });
        }
        saveCart(newCart);
        return newCart;
      });
    }

    async function removeFromCart(productToRemove: CartProduct) {
      try {
        if(user){
          const response = await fetch(
            `/api/shopping-cart/${productToAdd.productId}`,
            {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/JSON',
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (!response.ok) throw new Error('Failed to remove product from cart.');
          await response.json();
          loadCartFromData();
        } else {
          setCart((oldCart) => {
            const intermediateCart = oldCart.map((product) => {
              if (
                product.productId === productToRemove.productId &&
                product.size === productToRemove.size
              ) {
                if (product.quantity > 1) {
                  return { ...product, quantity: product.quantity - 1 };
                } else {
                  return { ...product, quantity: 0 };
                }
              }
              return product;
            });
            const newCart = intermediateCart.filter(
              (product) => product.quantity > 0
            );
            saveCart(newCart);
            return newCart;
          });
        }
      }catch(error){
        setError(error)
      }finally{
        setIsLoading(false)
      }
    }
  }

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, isCartOpen, setIsCartOpen }}>
      {children}
    </CartContext.Provider>
  );
}
