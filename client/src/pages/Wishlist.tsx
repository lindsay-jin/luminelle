import { ProductCard } from "./Catalog";
import { useWishlist } from "../components/useWishlist";
import { useState } from "react";

export function Wishlist() {
   const { wishlist, isInWishlist, removeFromWishlist, addToWishlist } = useWishlist();
   const [isLiked, setIsLiked] = useState(false);

   function toggleWishlist(productId: number){
    if (isInWishlist(productId)) {
      removeFromWishlist(productId);
    } else {
      addToWishlist(productId);
    }
    setIsLiked(!isLiked);
  }

  return (
    <div>
      <h2>Wishlist</h2>
      <div>
        {wishlist.length > 0 ? (
          wishlist.map((product) => (
            <ProductCard
              key={product.productId}
              product={product}
              onClick={() => toggleWishlist(product.productId)}
            />
          ))
        ) : (
          <p>Your wishlist is empty.</p>
        )}
      </div>
    </div>
  );
}
