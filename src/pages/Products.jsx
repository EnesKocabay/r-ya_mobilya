import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import { getProducts } from '../services/productService';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('Tümü');

  const [error, setError] = useState(null);

  useEffect(() => {
    getProducts()
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Ürünler yüklenirken bir hata oluştu.');
        setLoading(false);
      });
  }, []);

  const categories = ['Tümü', ...new Set(products.map(p => p.category).filter(Boolean))];
  const filtered = activeCategory === 'Tümü' ? products : products.filter(p => p.category === activeCategory);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Helmet>
        <title>Koleksiyonlar | Rüya Mobilya Kırşehir</title>
        <meta name="description" content="Rüya Mobilya'nın tüm ürün koleksiyonu. Koltuk takımları, yatak odası, yemek odası ve ofis mobilyaları Kırşehir'de." />
      </Helmet>
      <Navbar />
      <main className="flex-1 max-w-7xl mx-auto px-6 py-20 w-full">
        <div className="mb-10">
          <p className="text-xs font-bold text-amber-600 tracking-widest uppercase mb-2">Tüm Koleksiyon</p>
          <h2 className="text-4xl font-black text-gray-900">Ürünlerimiz</h2>
        </div>

        {/* Kategori filtresi */}
        {categories.length > 1 && (
          <div className="flex gap-2 flex-wrap mb-10">
            {categories.map(cat => (
              <button key={cat} onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${
                  activeCategory === cat
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100 text-gray-500 hover:bg-amber-50 hover:text-amber-600'
                }`}>
                {cat}
              </button>
            ))}
          </div>
        )}

        {loading ? (
          <div className="text-center py-32 text-gray-400 font-medium">Yükleniyor...</div>
        ) : error ? (
          <div className="text-center py-32">
            <p className="text-5xl mb-4">⚠️</p>
            <p className="text-gray-400 font-medium">{error}</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-32">
            <p className="text-5xl mb-4">🛋️</p>
            <p className="text-gray-400 font-medium">Bu kategoride ürün bulunamadı.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {filtered.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
