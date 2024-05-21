import { Link, Outlet, useParams } from 'react-router-dom';
import { type Category } from '../components/Navigation';
import { useState } from 'react';

type Props = {
  categories: Category[];
};

export function Subheader({ categories }: Props) {
  const [activeLink, setActiveLink] = useState<string | null>(null);
  const { categoryId } = useParams<{ categoryId: string }>();

  if (!categoryId) {
    return <div>Category not found.</div>;
  }

  const currentCategory = categories.find((category) =>
    category.path.endsWith(categoryId)
  );

  const currentSubcategories = currentCategory?.subcategories;

  if (!currentSubcategories) {
    return <div>Category not found.</div>;
  }
  return (
    <>
      <div>
        <hr className="my-3 border" />
        <ul className="flex mt-2 md:mt-4">
          {currentSubcategories.map((subcategory) => (
            <li key={subcategory.name} className="pl-5 pr-5 md:pr-9">
              <Link
                to={subcategory.path}
                className={activeLink === subcategory.name ? 'font-medium' : ''}
                onMouseEnter={() => setActiveLink(subcategory.name)}
                onMouseLeave={() => setActiveLink(null)}
                onClick={() => setActiveLink(subcategory.name)}>
                {subcategory.name}{' '}
              </Link>
            </li>
          ))}
        </ul>
        <hr className="my-3 border" />
      </div>
      <div>
        <Outlet />
      </div>
    </>
  );
}
