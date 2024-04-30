export function Cart() {
  return (
    <div>
      <div className="bg-slate-100">
        <h2>Shopping bag</h2>
      </div>
      <div>
        <div>
          <span>SUBTOTAL</span>
          <span>price</span>
        </div>
        <div className="bg-slate-100">
          <button className="border-solid bg-black text-white w-full h-10">
            PROCEED TO CHECKOUT
          </button>
        </div>
      </div>
    </div>
  );
}
