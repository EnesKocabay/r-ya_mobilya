import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Products from './pages/Products';
import About from './pages/About';
import Contact from './pages/Contact';
import ProductDetail from './pages/ProductDetail';
import AppRouter from './routes/AppRouter';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/rm-panel-2026" element={<Login />} />
      <Route path="/products" element={<Products />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/products/:id" element={<ProductDetail />} />
      <Route path="/admin/*" element={<AppRouter />} />
    </Routes>
  );
}

export default App;
