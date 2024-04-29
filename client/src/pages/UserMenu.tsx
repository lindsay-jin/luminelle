import { FaRegUser } from 'react-icons/fa6';
import { Link, useNavigate } from 'react-router-dom';
import { type User } from '../components/UserContext';

export type Props = {
  user: User | undefined;
  toggleUserMenu: () => void;
  isOpen: boolean;
  handleSignOut: () => void;
};

export function UserMenu({
  user,
  toggleUserMenu,
  isOpen,
  handleSignOut,
}: Props) {
  const navigate = useNavigate();

  if (!isOpen) return null;
  return (
    <div className="absolute right-0 top-0 h-screen w-[200px] flex flex-col bg-white z-50 transform transition-transform translate-x-0">
      <div className="my-2 flex justify-end mr-7">
        <button onClick={toggleUserMenu} className="text-lg">
          X
        </button>
      </div>
      <div className="flex flex-nowrap items-center">
        <FaRegUser className="m-2" />
        {!user ? (
          <div>
            <div>
              <Link to="/login" className="m-2">
                <button
                  onClick={() => {
                    toggleUserMenu();
                    navigate('/login');
                  }}>
                  Login
                </button>
              </Link>
              |
              <Link to="/sign-up" className="m-2">
                <button
                  onClick={() => {
                    toggleUserMenu();
                    navigate('/sign-up');
                  }}>
                  Register
                </button>
              </Link>
            </div>
          </div>
        ) : (
          <div>
            <button
              onClick={() => {
                handleSignOut();
                toggleUserMenu();
                navigate('/');
              }}>
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
