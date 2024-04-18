import { Route, Routes } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { Home } from './pages/Home';
import { Subheader } from './pages/Subheader';
import { NotFound } from './pages/NotFound';
import { Catalog } from './pages/Catalog';
import { Details } from './pages/Details';
import './App.css';

const categories = [
  { name: 'READY TO WEAR', path: '/catalog/1' },
  { name: 'GIFTS', path: '/catalog/2' },
  { name: 'LUMI CLUB', path: '/catalog/3' },
];

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigation categories={categories} />}>
          <Route index element={<Home />} />
          <Route path="catalog/:categoryId" element={<Subheader />}>
            <Route index element={<Catalog />} />
            <Route path="p/:productId" element={<Details />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}
