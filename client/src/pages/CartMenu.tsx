export type Props = {
  toggleCartMenu: () => void;
  isOpen: boolean;
};

export function CartMenu({ toggleCartMenu, isOpen }: Props) {
  if (!isOpen) return null;

  return (
    <div className="absolute right-0 top-0 h-screen flex flex-col bg-white z-50 transform transition-transform translate-x-0">
      <div>
        <h2>Your selection</h2>
        <button className="text-lg" onClick={toggleCartMenu}>
          X
        </button>
      </div>
      <CartCard />
      <div>
        <div>
          <span>SUBTOTAL</span>
          <span>price</span>
        </div>
        <div>
          <button className="border-solid bg-black text-white w-full h-10">
            PROCEED TO CHECKOUT
          </button>
        </div>
        <div>
          <button className="underline font-bold">Go to shopping bag</button>
        </div>
      </div>
    </div>
  );
}

export function CartCard() {
  return <div></div>;
}
