import { Link, Outlet, useParams } from 'react-router-dom';
import { type Category } from '../components/Navigation';

type Props = {
  categories: Category[];
}

export function Subheader({categories} :Props) {
  const {categoryId} = useParams<{categoryId: string}>();
  if(!categoryId){
    return <div>Category not found.</div>;
  }
  const currentCategory = categories.find((category) =>
    category.path.endsWith(categoryId)
  );

  const currentSubcategories = currentCategory?.subcategories;

  if(!currentSubcategories){
    return <div>Category not found.</div>;
  }
  return (
    <>
      <div>
        <h1></h1>
        <ul>
          {currentSubcategories.map((subcategory) => (
            <li key={subcategory.name}>
              <Link to={subcategory.path}>{subcategory.name}</Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="outlet">
        <Outlet />
      </div>
    </>
  );
}
