import { useLocation, useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { FaHeart, FaRegUser, FaUser } from 'react-icons/fa6';
import { IoSearch } from 'react-icons/io5';
import { FaRegHeart } from 'react-icons/fa6';
import { IoBagOutline } from 'react-icons/io5';
import { IoBag } from 'react-icons/io5';
import { useUser } from '../components/useUser';
import { CategoryMenu } from '../pages/CategoryMenu';
import { UserMenu } from '../pages/UserMenu';
import { SearchBar } from '../pages/SearchBar';
import { useState } from 'react';
import { useWishlist } from './useWishlist';
import { CartMenu } from '../pages/CartMenu';
import { useCart } from './useCart';
import { Shade } from './Shade';

export type Subcategory = {
  name: string;
  path: string;
};

export type Category = {
  name: string;
  path: string;
  subcategories: Subcategory[];
};

type Props = {
  categories: Category[];
};

export function Navigation({ categories }: Props) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [isUserOpen, setIsUserOpen] = useState(false);
  const [isCategoryHovered, setIsCategoryHovered] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, handleSignOut } = useUser();
  const { wishlist } = useWishlist();
  const { isCartOpen, setIsCartOpen, cart } = useCart();

  const isHomePage = location.pathname === '/';

  function handleMouseOver(categoryName: string) {
    setActiveCategory(categoryName);
    setIsCategoryHovered(true);
  }

  function handleMouseLeave() {
    setActiveCategory(null);
    setIsCategoryHovered(false);
  }

  function toggleSearch() {
    setIsSearching(!isSearching);
  }

  function toggleUserMenu() {
    setIsUserOpen(!isUserOpen);
  }

  function toggleCartMenu() {
    setIsCartOpen(!isCartOpen);
  }

  return (
    <>
      <Shade
        isVisible={isUserOpen || isCartOpen || isSearching || isCategoryHovered}
        onClick={() => {
          if (isUserOpen) toggleUserMenu();
          if (isCartOpen) toggleCartMenu();
          if (isSearching) toggleSearch();
        }}
      />
      <div className="fixed top-0 z-40 w-screen bg-white">
        {isHomePage && (
          <div>
            <h1
              className="text-6xl text-center mt-3 mb-2 cursor-pointer"
              onClick={() => navigate('/')}>
              LUMINELLE
            </h1>
          </div>
        )}
        <nav
          className={`relative flex justify-between px-5 items-baseline m-0 p-0 ${
            isHomePage ? '' : 'items-center'
          }`}>
          {!isHomePage && (
            <h1
              className="text-2xl font-medium md:text-3xl md:font-normal cursor-pointer"
              onClick={() => navigate('/')}>
              LUMINELLE
            </h1>
          )}
          <CategoryMenu
            categories={categories}
            activeCategory={activeCategory}
            handleMouseOver={handleMouseOver}
            handleMouseLeave={handleMouseLeave}
          />
          <div className="flex">
            {user ? (
              <FaUser
                className="cursor-pointer mx-2"
                onClick={toggleUserMenu}
              />
            ) : (
              <FaRegUser
                className="cursor-pointer mx-2"
                onClick={toggleUserMenu}
              />
            )}
            <IoSearch className="cursor-pointer mx-2" onClick={toggleSearch} />
            {wishlist.length === 0 ? (
              <FaRegHeart
                className="cursor-pointer mx-2"
                onClick={() => navigate('/wishlist')}
              />
            ) : (
              <FaHeart
                className="cursor-pointer mx-2"
                onClick={() => navigate('/wishlist')}
              />
            )}
            {cart.length === 0 ? (
              <IoBagOutline
                className="cursor-pointer mx-2"
                onClick={toggleCartMenu}
              />
            ) : (
              <IoBag className="cursor-pointer mx-2" onClick={toggleCartMenu} />
            )}
          </div>
          <UserMenu
            user={user}
            handleSignOut={handleSignOut}
            isOpen={isUserOpen}
            toggleUserMenu={toggleUserMenu}
          />
          {isSearching && <SearchBar toggleSearch={toggleSearch} />}
          <CartMenu isOpen={isCartOpen} toggleCartMenu={toggleCartMenu} />
        </nav>
      </div>
      {!isHomePage && <hr className="my-3 border" />}
      <div className={`${isHomePage ? 'mt-120' : 'md:mt-6'}`}>
        <Outlet />
      </div>
    </>
  );
}
