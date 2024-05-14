import { Link } from 'react-router-dom';
import { CartProduct } from '../components/CartContext';
import { useCart } from '../components/useCart';
import { toDollars } from '../../lib/to-dollars';

export type Props = {
  toggleCartMenu: () => void;
  isOpen: boolean;
};

export function CartMenu({ toggleCartMenu, isOpen }: Props) {
  const { cart } = useCart();
  if (!isOpen) return null;

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="absolute right-0 top-0 h-screen overflow-y-auto w-full md:w-1/2 px-10 flex flex-col bg-white z-50 transform transition-transform translate-x-0">
      <div className="flex justify-between my-5">
        <h2>YOUR SELECTION</h2>
        <button className="text-lg" onClick={toggleCartMenu}>
          X
        </button>
      </div>
      {cart.map((product, index) => (
        <CartCard key={index} product={product} />
      ))}
      <hr className="mt-3 border" />
      <div className="my-5">
        <div className="flex justify-between">
          <span>SUBTOTAL</span>
          <span>{toDollars(subtotal)}</span>
        </div>
        <div className="mx-6 my-5">
          <button className="border-solid bg-black text-white w-full h-8">
            PROCEED TO CHECKOUT
          </button>
        </div>
        <div className="flex justify-center">
          <Link to="/shopping-cart" onClick={toggleCartMenu}>
            <button className="underline">Go to shopping bag</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export type cardProps = {
  product: CartProduct;
};

export function CartCard({ product }: cardProps) {
  const { imageUrl, name, colors, size, quantity, price } = product;
  const { removeFromCart } = useCart();

  const isShoppingCart = location.pathname === '/shopping-cart';

  function handleRemoveFromCart() {
    removeFromCart(product);
  }

  return (
    <div className="flex my-1">
      <div className={`${isShoppingCart ? 'pr-4' : 'w-1/2'}`}>
        <img src={imageUrl[0]} alt={name} className="h-[250px] object-cover" />
      </div>
      <div className="w-1/2 pl-4 flex flex-col justify-between">
        <div>
          <p className="font-medium">{name}</p>
          <p>Color: {colors}</p>
          <p>Size: {size}</p>
          <p>Qty: {quantity}</p>
          <p>{toDollars(price)}</p>
        </div>
        <div className="pb-8">
          <button
            className="underline font-medium"
            onClick={handleRemoveFromCart}>
            REMOVE
          </button>
        </div>
      </div>
      <hr className="my-3 border" />
    </div>
  );
}
