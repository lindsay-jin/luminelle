import { Link, useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { FaRegUser } from 'react-icons/fa6';
// import { FaUser } from 'react-icons/fa6';
import { IoSearch } from 'react-icons/io5';
import { FaRegHeart } from 'react-icons/fa6';
// import { IoMdHeart } from "react-icons/io";
import { IoBagOutline } from 'react-icons/io5';
import { useState } from 'react';
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
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();

  function handleMouseOver() {
    setIsOpen(true);
  }

  function handleMouseLeave() {
    setIsOpen(false);
  }

  return (
    <>
      <div>
        <div>
          <h1
            className="text-6xl text-center mt-3 mb-5 cursor-pointer"
            onClick={() => navigate('/')}>
            LUMINELLE
          </h1>
        </div>
        <nav className="flex justify-between pb-1">
          <div>
            <ul className="flex pl-5">
              {categories.map((category) => (
                <li
                  className="relative pr-7 cursor-pointer"
                  key={category.name}
                  onMouseOver={handleMouseOver}
                  onMouseLeave={handleMouseLeave}>
                  {category.name}
                  {isOpen && (
                    <div className="absolute z-10 bg-white w-screen">
                      {category.subcategories.map((subcategory) => (
                        <Link
                          className="block px-4 py-2 text-black"
                          key={subcategory.name}
                          to={subcategory.path}>
                          {subcategory.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex pr-3">
            <FaRegUser className="flex mr-3 cursor-pointer" />
            <IoSearch className="flex mr-3 cursor-pointer" />
            <FaRegHeart className="flex mr-3 cursor-pointer" />
            <IoBagOutline className="cursor-pointer" />
          </div>
        </nav>
      </div>
      <div>
        <Outlet />
      </div>
    </>
  );
}
