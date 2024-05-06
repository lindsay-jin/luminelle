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

  useEffect(() => {
    setCart(readCart());
  }, []);

  function addToCart(productToAdd: CartProduct) {
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

  function removeFromCart(productToRemove: CartProduct) {
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

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, isCartOpen, setIsCartOpen }}>
      {children}
    </CartContext.Provider>
  );
}
