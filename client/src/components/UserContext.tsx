import { createContext, useEffect, useState } from 'react';
import { readToken, readUser, saveToken, saveUser } from '../../lib/data';

export type User = {
  userId: number;
  username: string;
};

export type UserContextValues = {
  user: User | undefined;
  token: string | undefined;
  handleSignIn: (user: User, token: string) => void;
  handleSignOut: () => void;
};
export const UserContext = createContext<UserContextValues>({
  user: undefined,
  token: undefined,
  handleSignIn: () => undefined,
  handleSignOut: () => undefined,
});

export function UserProvider({children}){
  const [user, setUser] = useState<User>();
  const [token, setToken] = useState<string>();
  const [error, setError ] = useState<unknown>();

  function handleSignIn(user: User, token: string) {
    setUser(user);
    setToken(token);
    saveToken(token);
    saveUser(user);
  }

  function handleSignOut() {
    setUser(undefined);
    setToken(undefined);
    saveToken(undefined);
    saveUser(undefined);
  }

  useEffect(() => {
    try {
      setUser(readUser());
      setToken(readToken());
    } catch (error) {
      setError(error);
    }
  }, []);

  const contextValue = { user, token, handleSignIn, handleSignOut };

  return (
    <UserContext.Provider value={contextValue}>
      {error && (
        <div>{error instanceof Error ? error.message : 'Unknown error'}</div>
      )}
      {children}
    </UserContext.Provider>
  );
}
