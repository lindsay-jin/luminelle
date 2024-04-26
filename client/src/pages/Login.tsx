import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../components/useUser';

export function Login() {
  const { handleSignIn } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      setIsLoading(true);
      const formData = new FormData(event.currentTarget);
      const userData = Object.fromEntries(formData);
      const req = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      };
      const res = await fetch('/api/auth/sign-in', req);
      if (!res.ok) {
        throw new Error(`fetch Error ${res.status}`);
      }
      const { user, token } = await res.json();
      handleSignIn(user, token);
      console.log('Signed In', user);
      console.log('Received token:', token);
      navigate('/');
    } catch (err) {
      alert(`Error signing in: ${err}`);
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <div className="mx-auto pt-[40px]">
      <div className="mx-auto w-[300px]">
        <h2 className="my-2 text-center text-lg">Welcome back!</h2>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col my-2">
            <input
              type="text"
              name="username"
              placeholder="Email address"
              className="my-2 h-8 bg-sky-100 border border-black rounded"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="my-2 h-8 bg-sky-100 border border-black rounded"
            />
          </div>
          <button
            disabled={isLoading}
            className="border-solid bg-black text-white w-full h-8 my-2">
            Log in
          </button>
        </form>
      </div>
    </div>
  );
}
