import { createContext, useCallback, useEffect, useState } from 'react';
import { Product } from '../pages/Catalog';
import { saveCart, readCart, clearCart } from '../../lib/data';
import { useUser } from './useUser';

export type CartProduct = Product & {
  quantity: number;
  size: string;
  price: number;
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
  const { user, token } = useUser();
  const [error, setError] = useState<unknown>();
  const [isLoading, setIsLoading] = useState(true);

  const loadCartFromServer = useCallback(async () => {
    setIsLoading(true);
    if (!user) {
      setIsLoading(false);
      return;
    }
    try {
      const response = await fetch('/api/shopping-cart', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok)
        throw new Error(`Fetch error with status ${response.status}`);
      const result = await response.json();
      setCart(result);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }, [user, token]);

  async function saveCartToServer(cartItems) {
    if (!user) return null;
    try {
      for (const item of cartItems) {
        const response = await fetch(`/api/shopping-cart/${item.productId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(item),
        });
        if (!response.ok) throw new Error('Failed to save cart');
      }
      clearCart();
      loadCartFromServer();
    } catch (error) {
      setError(error);
    }
  }

  useEffect(() => {
    if (user) {
      loadCartFromServer();
    } else {
      setCart(readCart());
      setIsLoading(false);
    }
  }, [user, loadCartFromServer]);

  useEffect(() => {
    if (user && cart.length === 0) {
      const localCart = readCart();
      if (localCart.length > 0) {
        saveCartToServer(localCart);
        saveCart(localCart);
      }
    }
  });

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
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(productToAdd),
          }
        );
        if (!response.ok) throw new Error('Failed to add item to cart.');
        loadCartFromServer();
      } catch (error) {
        setError(error);
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
  }

  async function removeFromCart(productToRemove: CartProduct) {
    if (user) {
      try {
        const response = await fetch(
          `/api/shopping-cart/${productToRemove.productId}`,
          {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(productToRemove),
          }
        );
        if (!response.ok) throw new Error('Failed to remove item from cart.');
        loadCartFromServer();
      } catch (error) {
        setError(error);
      }
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
  }

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, isCartOpen, setIsCartOpen }}>
      {children}
    </CartContext.Provider>
  );
}
