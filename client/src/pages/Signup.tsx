import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export function Signup() {
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
      const res = await fetch('/api/auth/sign-up', req);
      if (!res.ok) {
        throw new Error(`fetch Error ${res.status}`);
      }
      const user = await res.json();
      console.log('Registered', user);
      console.log(
        `You can check the database with: psql -d userManagement -c 'select * from users'`
      );
      alert(
        `Successfully registered ${user.username} as userId ${user.userId}.`
      );
      navigate('/sign-in');
    } catch (err) {
      alert(`Error registering user: ${err}`);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="mx-auto pt-[40px]">
      <div className="mx-auto w-[300px]">
        <h2 className="my-2 text-center text-lg">
          Create your personal account
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col my-2">
            <input
              type="email"
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
          <button className="border-solid bg-black text-white w-full h-8 my-2">
            Register
          </button>
        </form>
        <div className="flex justify-between my-2">
          <p>Already a Luminelle member?</p>
          <Link to="/login">
            <button disabled={isLoading} className="underline">
              LOG IN
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
