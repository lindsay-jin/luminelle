import { Route, Routes } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { Home } from './pages/Home';
import { Subheader } from './pages/Subheader';
import { NotFound } from './pages/NotFound';
import { Catalog } from './pages/Catalog';
import { Details } from './pages/Details';
import './App.css';

const categories = [
  {
    name: 'READY TO WEAR',
    path: '/catalog/1',
    subcategories: [
      { name: 'Dresses', path: '/catalog/1/dresses' },
      { name: 'Shirts and tops', path: '/catalog/1/shirts-and-tops' },
      { name: 'Outerwear', path: '/catalog/1/outerwear' },
    ],
  },
  {
    name: 'GIFTS',
    path: '/catalog/2',
    subcategories: [
      { name: 'Accessories', path: '/catalog/2/accessories' },
      { name: 'Hats', path: '/catalog/2/hats' },
    ],
  },
  {
    name: 'LUMI CLUB',
    path: '/catalog/3',
    subcategories: [],
  },
];

export default function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <Navigation categories={categories} />
          }>
          <Route index element={<Home />} />
          <Route path="catalog/:categoryId" element={<Subheader categories={categories}/>}>
            <Route index element={<Catalog />} />
            <Route path=":subcategoryId" element={<Catalog />} />
            <Route path="p/:productId" element={<Details />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}
