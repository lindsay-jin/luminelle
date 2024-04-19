import { Link } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { HiOutlineUser } from 'react-icons/hi2';
// import { HiUser } from 'react-icons/hi2';
import { IoIosSearch } from 'react-icons/io';
import { IoMdHeartEmpty } from 'react-icons/io';
// import { IoMdHeart } from "react-icons/io";
import { IoBagOutline } from 'react-icons/io5';
import { useState } from 'react';
// import { IoBag } from "react-icons/io5";
import './Navigation.css';

export type Subcategory = {
  name: string;
  path: string;
};

export type Category = {
  name: string;
  path: string;
  subcategories: Subcategory[];
};

//used for
type Props = {
  categories: Category[];
};

export function Navigation({ categories }: Props) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  function handleMouseOver(categoryName: string) {
    setActiveCategory(categoryName);
  }

  function handleMouseLeave() {
    setActiveCategory(null);
  }

  return (
    <>
      <div>
        <div>
          <h1>LUMINELLE</h1>
        </div>
        <nav>
          <div>
            <ul>
              {categories.map((category) => (
                <li
                  key={category.name}
                  onMouseOver={() => handleMouseOver(category.name)}
                  onMouseLeave={() => handleMouseLeave}>
                  <Link to={category.path}>{category.name}</Link>
                  {activeCategory === category.name && (
                    <div className="dropdown">
                      {category.subcategories.map((subcategory) => (
                        <Link key={subcategory.name} to={subcategory.path}>
                          {subcategory.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <HiOutlineUser />
            <IoIosSearch />
            <IoMdHeartEmpty />
            <IoBagOutline />
          </div>
        </nav>
      </div>
      <div className="outlet">
        <Outlet />
      </div>
    </>
  );
}
