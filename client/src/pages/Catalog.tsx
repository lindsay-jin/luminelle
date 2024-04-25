import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { toDollars } from '../../lib/to-dollars';
import { FaCircle } from 'react-icons/fa';

export type Product = {
  productId: number;
  imageUrl: string;
  name: string;
  price: number;
  colors: string[];
};

const customColors = {
  black: '000000',
  white: 'ffffff',
  grey: '#9ca3af',
  natural: '#fff7ed',
  brown: '#431407',
  yellow: '#fde047',
  red: '#be123c',
  pink: '#f9a8d4',
  green: '#16a34a',
  blue: '#0ea5e9',
};
const colorNames = Object.keys(customColors);
const sizes = [0, 2, 4, 6, 8, 10, 12, 14];
const materials = [
  'silk',
  'cotton',
  'linen',
  'wool',
  'cashmere',
  'leather',
  'suede',
  'metal',
];

export function Catalog() {
  const [products, setProducts] = useState<Product[]>();
  const [isLoading, setIsLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<unknown>();
  const [isOpen, setIsOpen] = useState(false);
  const [selectColors, setSelectColors] = useState<string[]>([]);
  const { categoryId, subcategoryId } = useParams<{
    categoryId: string;
    subcategoryId: string;
  }>();

  const filteredProducts = products?.filter(
    (product) =>
      selectColors.length === 0 ||
      product.colors.some((color) => selectColors.includes(color))
  );

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

  function toggleSearch() {
    setIsSearching(!isSearching);
  }

  function toggleOpen() {
    setIsOpen(!isOpen);
  }

  function handleColorClick(color) {
    setSelectColors((prevColors) => {
      const isColorSelected = prevColors.includes(color);
      if (isColorSelected) {
        return prevColors.filter((c) => c !== color);
      } else {
        console.log('updatedColors:', [...prevColors, color]);
        return [...prevColors, color];
      }
    });
  }

  return (
    <>
      <div className="flex justify-end mb-3">
        <span className="pr-2 cursor-pointer" onClick={toggleOpen}>
          FILTERS
        </span>
        {isOpen && (
          <div className="absolute right-0 top-0 h-full w-1/2 flex flex-col bg-white z-50 transform transition-transform translate-x-0">
            <div className="flex justify-between m-3">
              <button className="underline">RESET</button>
              <h2 className="font-bold">FILTERS</h2>
              <button className="underline" onClick={toggleOpen}>
                CLOSE
              </button>
            </div>
            <div className="m-4">
              <div>
                <h2 className="my-2">COLORS</h2>
                <ul className="flex flex-wrap">
                  {colorNames.map((color) => (
                    <div
                      key={color}
                      className={`w-1/2 flex justify-start items-center ${
                        selectColors.includes(color) && 'bg-gray-300'
                      }`}
                      onClick={() => handleColorClick(color)}>
                      <FaCircle color={customColors[color]} className="m-3" />
                      <li>{color}</li>
                    </div>
                  ))}
                </ul>
              </div>
              <hr className="border my-3" />
              <h2 className="my-2">SIZES</h2>
              <div className="flex flex-wrap ml-3">
                {sizes.map((size) => (
                  <span key={size} className="mr-5">
                    {size}
                  </span>
                ))}
              </div>
              <hr className="border my-3" />
              <h2 className="my-2">MATERIALS</h2>
              <div className="flex flex-wrap ml-3">
                {materials.map((material) => (
                  <span key={material} className="w-1/2 mb-3">
                    {material}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
        <span className="pr-2">|</span>
        <span className="cursor-pointer">SORT BY: </span>
      </div>
      <div className="flex flex-wrap mx-0.5">
        {filteredProducts?.map((product) => (
          <ProductCard
            key={product.productId}
            product={product}
            onClick={toggleSearch}
          />
        ))}
      </div>
    </>
  );
}

export type Props = {
  product: Product;
  onClick: () => void;
};

export function ProductCard({ product, onClick }: Props) {
  const { productId, imageUrl, name, price } = product;
  const { categoryId } = useParams<{ categoryId: string }>();

  return (
    <Link
      to={`/catalog/${categoryId}/p/${productId}`}
      className="flex flex-col w-1/4 px-0.2 border border-transparent hover:border-gray-500"
      onClick={onClick}>
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
