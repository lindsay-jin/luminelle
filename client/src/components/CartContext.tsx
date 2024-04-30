import { createContext, useState } from 'react';
import { Product } from '../pages/Catalog';

export type CartProduct = Product & {
  quantity: number;
};

export type CartValues = {
  cart: CartProduct[];
  addToCart: (item: CartProduct) => void;
  removeFromCart: (item: CartProduct) => void;
};

export const CartContext = createContext<CartValues>({
  cart: [],
  addToCart: () => undefined,
  removeFromCart: () => undefined,
});

export function CartProvider({ children }) {
  const [cart, setCart] = useState<CartProduct[]>([]);

  function addToCart(product: CartProduct) {
    setCart((oldCart) => [...oldCart, product]);
  }

  function removeFromCart(product: CartProduct) {
    setCart((oldCart) => [...oldCart, product]);
  }

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
}
