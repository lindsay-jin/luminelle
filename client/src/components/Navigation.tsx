import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { FaRegUser } from 'react-icons/fa6';
// import { FaUser } from 'react-icons/fa6';
import { IoSearch } from 'react-icons/io5';
import { FaRegHeart } from 'react-icons/fa6';
// import { IoMdHeart } from "react-icons/io";
import { IoBagOutline } from 'react-icons/io5';
import { useEffect, useState } from 'react';
// import { IoBag } from "react-icons/io5";

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
  const [searchText, setSearchText] = useState('');
  const [error, setError] = useState();
  const navigate = useNavigate();
  const location = useLocation();

  const isHomePage = location.pathname === '/';

  function handleMouseOver(categoryName: string) {
    setActiveCategory(categoryName);
  }

  function handleMouseLeave() {
    setActiveCategory(null);
  }

  function toggleSearch(){
    setIsSearching(!isSearching);
  }

  function handleType(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchText(event.target.value);
  }

  useEffect(()=>{
    try{

    }catch(error){

    }
  })

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
          className={`flex justify-between px-5 ${
            isHomePage ? '' : 'items-center'
          }`}>
          {!isHomePage && (
            <h1
              className="text-3xl cursor-pointer"
              onClick={() => navigate('/')}>
              LUMINELLE
            </h1>
          )}
          <ul
            className={`flex ${
              isHomePage ? 'justify-center' : ''
            } mt-4 md:mt-0`}>
            {categories.map((category) => (
              <li
                key={category.name}
                onMouseOver={() => handleMouseOver(category.name)}
                onMouseLeave={handleMouseLeave}
                className="relative cursor-pointer px-4 py-2">
                {category.name}
                {activeCategory === category.name && (
                  <div className="absolute z-10 bg-white w-full left-0">
                    {category.subcategories.map((subcategory) => (
                      <Link
                        key={subcategory.name}
                        to={subcategory.path}
                        className="block px-4 py-2">
                        {subcategory.name}
                      </Link>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>
          <div className="flex">
            <FaRegUser className="cursor-pointer mx-2" />
            <IoSearch className="cursor-pointer mx-2" onClick={toggleSearch} />
            <FaRegHeart className="cursor-pointer mx-2" />
            <IoBagOutline className="cursor-pointer mx-2" />
          </div>
          {isSearching && (
            <div className="fixed mt-10 z-50 w-screen bg-white flex flex-col">
              <div className="flex justify-between w-screen pr-10">
                <input
                  type="text"
                  placeholder="Search"
                  value={searchText}
                  onChange={handleType}
                  className="w-full h-full p-4"
                />
                <button
                  onClick={() => setIsSearching(false)}
                  className="underline">
                  CLOSE
                </button>
              </div>
              <hr className="my-3 border" />
              <div>Hello</div>
            </div>
          )}
        </nav>
      </div>
      <div className={`${isHomePage ? 'mt-120' : 'mt-40'}`}>
        <Outlet />
      </div>
    </>
  );
}
