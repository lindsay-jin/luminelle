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
  sizes: string[];
  materials: string[];
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
const sizes = ['0', '2', '4', '6', '8', '10', '12', '14'];
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
  const [selectSizes, setSelectSizes] = useState<string[]>([]);
  const [selectMaterials, setSelectMaterials] = useState<string[]>([]);
  const [selectOption, setSelectOption] = useState('SUGGESTED');
  const [isSortOpen, setIsSortOpen] = useState(false);
  const { categoryId, subcategoryId } = useParams<{
    categoryId: string;
    subcategoryId: string;
  }>();

  const filteredProducts = products?.filter((product) => {
    let colorMatch = false;
    if (selectColors.length === 0) {
      colorMatch = true;
    } else {
      for (let i = 0; i < product.colors.length; i++) {
        if (selectColors.includes(product.colors[i])) {
          colorMatch = true;
        }
      }
    }

    let sizeMatch = false;
    if (selectSizes.length === 0) {
      sizeMatch = true;
    } else {
      for (let i = 0; i < product.sizes.length; i++) {
        if (selectSizes.includes(product.sizes[i])) {
          sizeMatch = true;
        }
      }
    }

    let materialMatch = false;
    if (selectMaterials.length === 0) {
      materialMatch = true;
    } else {
      for (let i = 0; i < product.materials.length; i++) {
        if (selectMaterials.includes(product.materials[i])) {
          materialMatch = true;
        }
      }
    }

    return colorMatch && sizeMatch && materialMatch;
  });

  const options = ['SUGGESTED', 'NEWEST', 'HIGHEST TO LOWEST PRICE', 'LOWEST TO HIGHEST PRICE'];

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
        return [...prevColors, color];
      }
    });
  }

  function handleSizeClick(size: string) {
    setSelectSizes((prevSizes) => {
      const isSizeSelected = prevSizes.includes(size);
      if (isSizeSelected) {
        return prevSizes.filter((s) => s !== size);
      } else {
        return [...prevSizes, size];
      }
    });
  }

  function handleMaterialClick(material) {
    setSelectMaterials((prevMaterials) => {
      const isMaterialSelected = prevMaterials.includes(material);
      if (isMaterialSelected) {
        return prevMaterials.filter((m) => m !== material);
      } else {
        return [...prevMaterials, material];
      }
    });
  }

  function handleClickSort(){
    setIsSortOpen(!isSortOpen)
  }

  function sortProducts(products){
    switch (selectOption){
      case 'NEWEST' : return [...products].sort((a,b)=>b.productId - a.productId);
      case 'HIGHEST TO LOWEST PRICE': return [...products].sort((a,b)=>b.price - a.price);
      case 'NEWEST TO HIGHEST PRICE': return [...products].sort((a,b)=>a.price - b.price);
      case 'SUGGESTED' : default: return products;
    }
  }

  const sortedProducts = sortProducts(filteredProducts);

  function handleSelectOption(option) {
    setSelectOption(option);
    setIsSortOpen(false);
  }

  return (
    <>
      <div className="flex justify-end mb-3">
        <button className="pr-2" onClick={toggleOpen}>
          FILTERS
        </button>
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
                      className={`w-1/2 flex justify-start items-center cursor-pointer ${
                        selectColors.includes(color) &&
                        'border border-slate-500'
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
                  <button
                    key={size}
                    className={`mr-10 my-3 ${
                      selectSizes.includes(size) && 'border border-slate-500'
                    }`}
                    onClick={() => handleSizeClick(size)}>
                    {size}
                  </button>
                ))}
              </div>
              <hr className="border my-3" />
              <h2 className="my-2">MATERIALS</h2>
              <div className="flex flex-wrap ml-3">
                {materials.map((material) => (
                  <button
                    key={material}
                    className={`w-1/2 mb-3 ${
                      selectMaterials.includes(material) &&
                      'border border-slate-500'
                    }`}
                    onClick={() => handleMaterialClick(material)}>
                    {material}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
        <button className="pr-2">|</button>
        <button onClick={handleClickSort}>SORT BY: {selectOption}</button>
        {isSortOpen && (
          <div className="absolute right-0 bg-white">
            <ul>
              {options.map((option) => (
                <li key={option} onClick={()=>handleSelectOption(option)} className={`cursor-pointer ${selectOption.includes(option) && 'bg-slate-500'}`}>{option}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className="flex flex-wrap mx-0.5">
        {sortedProducts?.map((product) => (
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
      <div className="w-full">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover aspect-[5/6]"
        />
      </div>
      <div className="text-center pt-3 pb-7">
        <p>{name}</p>
        <p>{toDollars(price)}</p>
      </div>
    </Link>
  );
}
