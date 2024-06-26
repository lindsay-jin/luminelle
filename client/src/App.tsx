import { Route, Routes } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { Home } from './pages/Home';
import { Subheader } from './pages/Subheader';
import { NotFound } from './pages/NotFound';
import { Catalog } from './pages/Catalog';
import { Details } from './pages/Details';
import { Signup } from './pages/Signup';
import { Login } from './pages/Login';
import { Wishlist } from './pages/Wishlist';
import { Cart } from './pages/Cart';
import { UserProvider } from './components/UserContext';
import { WishlistProvider } from './components/WishlistContext';
import { CartProvider } from './components/CartContext';
import { Footer } from './components/Footer';

const categories = [
  {
    name: 'READY TO WEAR',
    path: '/catalog/1',
    subcategories: [
      { name: 'Dresses', path: '/catalog/1/1' },
      { name: 'Shirts and tops', path: '/catalog/1/2' },
      { name: 'Outerwear', path: '/catalog/1/3' },
    ],
  },
  {
    name: 'GIFTS',
    path: '/catalog/2',
    subcategories: [
      { name: 'Accessories', path: '/catalog/2/4' },
      { name: 'Hats', path: '/catalog/2/5' },
    ],
  },
];

export default function App() {
  return (
    <UserProvider>
      <WishlistProvider>
        <CartProvider>
          <Routes>
            <Route path="/" element={<Navigation categories={categories} />}>
              <Route index element={<Home />} />
              <Route
                path="catalog/:categoryId"
                element={<Subheader categories={categories} />}>
                <Route index element={<Catalog />} />
                <Route path=":subcategoryId" element={<Catalog />} />
              </Route>
              <Route path="p/:productId" element={<Details />} />
              <Route path="*" element={<NotFound />} />
              <Route path="sign-up" element={<Signup />} />
              <Route path="login" element={<Login />} />
              <Route path="wishlist" element={<Wishlist />} />
              <Route path="shopping-cart" element={<Cart />} />
            </Route>
          </Routes>
          <Footer />
        </CartProvider>
      </WishlistProvider>
    </UserProvider>
  );
}
