import { Link } from 'react-router-dom';
import { type Category } from '../components/Navigation';

export type Props = {
  categories: Category[];
  activeCategory: string | null;
  handleMouseOver: (categoryName: string) => void;
  handleMouseLeave: () => void;
};

export function CategoryMenu({
  categories,
  activeCategory,
  handleMouseOver,
  handleMouseLeave,
}: Props) {
  return (
    <ul className="flex justify-center md:mt-0">
      {categories.map((category) => (
        <li
          key={category.name}
          onMouseOver={() => handleMouseOver(category.name)}
          onMouseLeave={handleMouseLeave}
          className="cursor-pointer pl-4 md:pl-0 md:px-4 py-2">
          {category.name}
          {activeCategory === category.name && (
            <div className="absolute left-0 right-0 z-10 bg-white w-full border-t-2 border-slate-300 pt-1">
              {category.subcategories.map((subcategory) => (
                <Link
                  key={subcategory.name}
                  to={subcategory.path}
                  className="block px-4 py-2 focus:underline">
                  {subcategory.name}
                </Link>
              ))}
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}
