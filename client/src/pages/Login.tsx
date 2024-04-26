export function Login() {
  return (
    <div className="mx-auto pt-[40px]">
      <div className="mx-auto w-[300px]">
        <h2 className="my-2 text-center text-lg">Welcome back!</h2>
        <div className="flex flex-col my-2">
          <input
            type="text"
            placeholder="Email address"
            className="my-2 h-8 bg-sky-100 border border-black rounded"
          />
          <input
            type="password"
            placeholder="Password"
            className="my-2 h-8 bg-sky-100 border border-black rounded"
          />
        </div>
        <button className="border-solid bg-black text-white w-full h-8 my-2">
          Log in
        </button>
      </div>
    </div>
  );
}
