import { Product, ProductCard } from './Catalog';
import { useWishlist } from '../components/useWishlist';
import { useState } from 'react';
import { useUser } from '../components/useUser';

export function Wishlist() {
  const { wishlist, isInWishlist, removeFromWishlist, addToWishlist } =
    useWishlist();
  const [isLiked, setIsLiked] = useState(false);
  const { user } = useUser();

  function toggleWishlist(product: Product) {
    if (isInWishlist(product.productId)) {
      removeFromWishlist(product.productId);
    } else {
      addToWishlist(product);
    }
    setIsLiked(!isLiked);
  }

  return (
    <div>
      <h2>Wishlist</h2>
      <div>
        {!user && <p>Please login to view your wishlist.</p>}
        {user && wishlist.length === 0 && <p>Your wishlist is empty.</p>}
        {user &&
          wishlist.length > 0 &&
          wishlist.map((product) => (
            <ProductCard
              key={product.productId}
              product={product}
              onClick={() => toggleWishlist(product)}
            />
          ))}
      </div>
    </div>
  );
}