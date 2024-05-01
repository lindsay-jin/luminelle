import { useCart } from '../components/useCart';
import { CartCard } from './CartMenu';
import { toDollars } from '../../lib/to-dollars';

export function Cart() {
  const { cart } = useCart();

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="flex m-5 pt-4">
      <div className="bg-slate-100 w-2/3 mr-5">
        <h2 className="ml-5 mt-3">Shopping bag</h2>
        <div className="ml-5 mb-5">
          {cart.map((product, index) => (
            <CartCard key={index} product={product} />
          ))}
        </div>
      </div>
      <div className="bg-slate-100 w-1/3 h-[120px]">
        <div className="flex justify-between mt-5 mb-3 mx-5">
          <span>SUBTOTAL</span>
          <span>{toDollars(subtotal)}</span>
        </div>
        <div className="bg-slate-100 flex justify-center mx-5">
          <button className="border-solid bg-black text-white w-full h-9">
            PROCEED TO CHECKOUT
          </button>
        </div>
      </div>
    </div>
  );
}
