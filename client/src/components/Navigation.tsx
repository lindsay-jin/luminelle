import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { ProductCard, type Product } from '../pages/Catalog';
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
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [error, setError] = useState<unknown>();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

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

  function handleType(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchText(event.target.value);
  }

  useEffect(() => {
    if (searchText.length < 3) {
      setSearchResults([]);
      return;
    }

    const timerId = setTimeout(() => {
      setIsLoading(true);
      async function loadSearchResults() {
        try {
          const response = await fetch(`/api/catalog?q=${searchText}`);
          if (!response.ok)
            throw new Error(`Fetch error with status ${response.status}`);
          const result = await response.json();
          setSearchResults(result);
        } catch (error) {
          setError(error);
          setSearchResults([]);
        } finally {
          setIsLoading(false);
        }
      }
      loadSearchResults();
    }, 2000);

    return () => clearTimeout(timerId);
  }, [searchText]);

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

  if (error) {
    return (
      <div>
        Cannot load products due to{' '}
        {error instanceof Error ? error.message : 'unknown error'}
      </div>
    );
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
            <div className="fixed top-0 inset-x-0 z-50 bg-white shadow">
              <div className="flex w-full">
                <input
                  type="text"
                  placeholder="Search"
                  value={searchText}
                  onChange={handleType}
                  className="flex-grow p-2 mx-5 my-3 border border-gray-300 rounded-md focus:ring-2"
                />
                <button
                  onClick={() => setIsSearching(false)}
                  className="w-auto p-2 mr-5 my-3 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">
                  CLOSE
                </button>
              </div>
            </div>
          )}
          {/*  */}
          {isSearching && searchResults.length > 0 && (
            <div className="fixed top-16 inset-x-0 z-40 bg-white">
              <div className="max-w-7xl mx-auto p-4 space-y-2">
                <div className="flex">
                  {searchResults.map((product) => (
                    <ProductCard
                      key={product.productId}
                      product={product}
                      onClick={toggleSearch}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
          {isSearching && searchText && searchResults.length === 0 && (
            <div className="fixed top-16 inset-x-0 z-40 bg-white">
              <div className="max-w-7xl mx-auto p-4 space-y-2">
                <div>No matching product found.</div>
              </div>
            </div>
          )}
        </nav>
      </div>
      {isLoading && <div>Loading...</div>}
      <div className={`${isHomePage ? 'mt-120' : 'mt-40'}`}>
        <Outlet />
      </div>
    </>
  );
}

//
