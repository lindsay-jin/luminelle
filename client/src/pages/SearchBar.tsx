import { useEffect, useState } from 'react';
import { type Product } from './Catalog';
import { ProductCard } from './Catalog';

export type Props = {
  toggleSearch: () => void;
};

export function SearchBar({ toggleSearch }: Props) {
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [error, setError] = useState<unknown>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (searchText.length < 2) {
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

  function handleType(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchText(event.target.value);
  }

  return (
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
          onClick={toggleSearch}
          className="w-auto p-2 mr-5 my-3 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">
          CLOSE
        </button>
      </div>
      {searchText && searchResults.length > 0 && (
        <div className="fixed top-16 inset-x-0 z-40 bg-white">
          <div className="max-w-7xl mx-auto p-4 space-y-2">
            <div className="flex flex-wrap">
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
      {searchText && searchResults.length === 0 && (
        <div className="fixed top-16 inset-x-0 z-40 bg-white">
          <div className="max-w-7xl mx-auto p-4 space-y-2">
            <div>No matching product found.</div>
          </div>
        </div>
      )}
    </div>
  );
}
