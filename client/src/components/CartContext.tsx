import { createContext, useState } from 'react';
import { Product } from '../pages/Catalog';

export type CartProduct = Product & {
  quantity: number;
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

  //if item exist and size is different, add item
  //if item exist an size is same, increase quantity
  function addToCart(productToAdd) {
    setCart((oldCart) => {
      let productAdded = false;

      const updatedCart = oldCart.map((product) => {
        if (
          product.productId === productToAdd.productId &&
          product.sizes === productToAdd.sizes
        ) {
          productAdded = true;
          return {
            ...product,
            quantity: product.quantity + productToAdd.quantity,
          };
        }
        return product;
      });

      if (!productAdded) {
        return [...updatedCart, productToAdd];
      }

      return updatedCart;
    });
  }

  function removeFromCart(productToRemove) {
    setCart((oldCart) =>
      oldCart.filter(
        (product) =>
          product.productId !== productToRemove.productId ||
          product.sizes !== productToRemove.sizes
      )
    );
  }

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, isCartOpen, setIsCartOpen }}>
      {children}
    </CartContext.Provider>
  );
}
