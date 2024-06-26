import { CartProduct } from '../src/components/CartContext';
import { User } from '../src/components/UserContext';

export const tokenKey = 'um.token';

export function saveToken(token: string | undefined): void {
  if (token) {
    localStorage.setItem(tokenKey, token);
  } else {
    localStorage.removeItem(tokenKey);
  }
}

export function readToken(): string {
  const token = localStorage.getItem(tokenKey);
  if (!token) throw new Error('No token found');
  return token;
}

export const userKey = 'um.user';

export function saveUser(user: User | undefined): void {
  if (user) {
    localStorage.setItem(userKey, JSON.stringify(user));
  } else {
    localStorage.removeItem(userKey);
  }
}

export function readUser(): User {
  const user = localStorage.getItem(userKey);
  if (!user) throw new Error('No user found');
  return JSON.parse(user);
}

const cartKey = 'um.cart';

export function saveCart(cart: CartProduct[]) {
  if (cart.length > 0) {
    localStorage.setItem(cartKey, JSON.stringify(cart));
  } else {
    localStorage.removeItem(cartKey);
  }
}

export function readCart() {
  const cart = localStorage.getItem(cartKey);
  if (cart) {
    return JSON.parse(cart);
  }
  return [];
}

export function clearCart() {
  localStorage.removeItem(cartKey);
}
