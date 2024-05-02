import { ProductCard } from './Catalog';
import { useWishlist } from '../components/useWishlist';
import { useUser } from '../components/useUser';
import { useNavigate } from 'react-router-dom';

export function Wishlist() {
  const { wishlist, isInWishlist } = useWishlist();
  const { user } = useUser();
  const navigate = useNavigate();

  return (
    <div className="mx-0.2 pt-3">
      <hr className="border" />
      <h2 className="px-5 pt-3 text-lg font-normal">
        {wishlist.length === 0 ? 'Wishlist' : `Wishlist(${wishlist.length})`}
      </h2>
      <div className="mb-3 flex flex-wrap">
        {!user && (
          <div className="flex m-5">
            <p className="text-lg mr-5">Please login to view your wishlist.</p>
            <button
              className="underline text-lg"
              onClick={() => navigate('/login')}>
              Login
            </button>
            /
            <button
              className="underline text-lg"
              onClick={() => navigate('/sign-up')}>
              Register!
            </button>
          </div>
        )}
        {user && wishlist.length === 0 && (
          <p className="px-5 text-lg">Your wishlist is empty.</p>
        )}
        {user &&
          wishlist.length > 0 &&
          wishlist.map(
            (product) =>
              isInWishlist(product.productId) && (
                <ProductCard
                  key={product.productId}
                  product={product}
                  showAddToCartButton={true}
                />
              )
          )}
      </div>
    </div>
  );
}
