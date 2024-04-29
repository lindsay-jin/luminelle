import { useLocation, useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { FaRegUser } from 'react-icons/fa6';
// import { FaUser } from 'react-icons/fa6';
import { IoSearch } from 'react-icons/io5';
import { FaRegHeart } from 'react-icons/fa6';
// import { IoMdHeart } from "react-icons/io";
import { IoBagOutline } from 'react-icons/io5';
// import { IoBag } from "react-icons/io5";
import { useUser } from '../components/useUser';
import { CategoryMenu } from '../pages/CategoryMenu';
import { UserMenu } from '../pages/UserMenu';
import { SearchBar } from '../pages/SearchBar';
import { useState } from 'react';

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
  const navigate = useNavigate();
  const location = useLocation();
  const { user, handleSignOut } = useUser();

  const isHomePage = location.pathname === '/';

  function handleMouseOver(categoryName: string) {
    setActiveCategory(categoryName);
  }

  function handleMouseLeave() {
    setActiveCategory(null);
  }

  function toggleSearch() {
    setIsSearching(!isSearching);
  }

  function toggleUserMenu() {
    setIsUserOpen(!isUserOpen);
  }

  return (
    <>
      <div className="fixed top-0 z-50 w-screen bg-white">
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
          className={`relative flex justify-between px-5 ${
            isHomePage ? '' : 'items-center'
          }`}>
          {!isHomePage && (
            <h1
              className="text-3xl cursor-pointer"
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
            <FaRegUser
              className="cursor-pointer mx-2"
              onClick={toggleUserMenu}
            />
            <IoSearch className="cursor-pointer mx-2" onClick={toggleSearch} />
            <FaRegHeart className="cursor-pointer mx-2" />
            <IoBagOutline className="cursor-pointer mx-2" />
          </div>
          <UserMenu
            user={user}
            handleSignOut={handleSignOut}
            isOpen={isUserOpen}
            toggleUserMenu={toggleUserMenu}
          />
          {isSearching && <SearchBar toggleSearch={toggleSearch} />}
        </nav>
      </div>
      <div className={`${isHomePage ? 'mt-120' : 'mt-40'}`}>
        <Outlet />
      </div>
    </>
  );
}
