import { Link } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { HiOutlineUser } from 'react-icons/hi2';
// import { HiUser } from 'react-icons/hi2';
import { IoIosSearch } from 'react-icons/io';
import { IoMdHeartEmpty } from 'react-icons/io';
// import { IoMdHeart } from "react-icons/io";
import { IoBagOutline } from 'react-icons/io5';
// import { IoBag } from "react-icons/io5";

export type Category = {
  name: string;
  path: string;
};

type Props = {
  categories: Category[];
};

export function Navigation({ categories }: Props) {
  return (
    <>
      <div>
        <h1>LUMINELLE</h1>
        <nav>
          <div>
            <ul>
              {categories.map((category) => (
                <li key={category.name}>
                  <Link to={category.path}>{category.name}</Link>
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
