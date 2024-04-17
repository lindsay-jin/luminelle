import { Route, Routes } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { Home } from './pages/Home';
import './App.css';
import { ReadyToWear } from './pages/ReadyToWear';
import { Subcategory } from './pages/Subcategory';
import { Gifts } from './pages/Gifts';
import { LumiClub } from './pages/LumiClub';
import { Product } from './pages/Product';
import { NotFound } from './pages/NotFound';

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route path="/" element={<Home />}></Route>
          <Route path="/ready-to-wear" element={<ReadyToWear />}>
            <Route index element={<Subcategory />} />
            <Route path="dresses" element={<Subcategory />} />
            <Route path="shirts-and-tops" element={<Subcategory />} />
            <Route path="outerwear" element={<Subcategory />} />
          </Route>
          <Route path="/gifts" element={<Gifts />}>
            <Route index element={<Subcategory />} />
            <Route path="accessories" element={<Subcategory />} />
            <Route path="hats" element={<Subcategory />} />
          </Route>
          <Route path="/lumi-club" element={<LumiClub />} />
          <Route path="p/:productId" element={<Product />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}
