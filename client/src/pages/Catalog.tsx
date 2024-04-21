import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { toDollars } from '../../lib/to-dollars';

export type Product = {
  productId: number;
  imageUrl: string;
  name: string;
  price: number;
};

export function Catalog() {
  const [products, setProducts] = useState<Product[]>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<unknown>();
  const { categoryId, subcategoryId } = useParams();

  useEffect(() => {
    async function loadProducts() {
      try {
        const response = await fetch(
          `/api/categories/${categoryId}/subcategories/${subcategoryId}/products`
        );
        if (!response.ok)
          throw new Error(`Fetch error with status ${response.status}`);
        const result = await response.json();
        setProducts(result);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }
    loadProducts();
  }, [categoryId, subcategoryId]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

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
      <div className="flex flex-wrap mx-0.5">
        {products?.map((product) => (
          <ProductCard key={product.productId} product={product} />
        ))}
      </div>
    </>
  );
}

type Props = {
  product: Product;
};

function ProductCard({ product }: Props) {
  const { productId, imageUrl, name, price } = product;
  const { categoryId } = useParams();

  return (
    <Link
      to={`/catalog/${categoryId}/p/${productId}`}
      className="flex flex-col w-1/4 px-0.2 border border-transparent hover:border-gray-500">
      <div className="aspect-w-5 aspect-h-6 w-full ">
        <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
      </div>
      <div className="text-center pt-3 pb-7">
        <p>{name}</p>
        <p>{toDollars(price)}</p>
      </div>
    </Link>
  );
}
