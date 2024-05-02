import { useContext } from 'react';
import { CartContext, CartValues } from './CartContext';

export function useCart(): CartValues {
  const values = useContext(CartContext);
  if (!values) throw new Error('useCart must be used inside a CartProvider');
  return values;
}
