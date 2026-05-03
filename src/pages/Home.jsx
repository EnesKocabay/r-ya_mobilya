import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import { getProducts } from "../services/productService";

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts().then((data) => {
      const featured = data.filter((p) => p.featured);
      setProducts(featured.length > 0 ? featured : data.slice(0, 3));
    });
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Helmet>
        <title>RÜYA Mobilya Kirsehir</title>
        <meta name="description" content="Kirsehir mobilya magazasi. Koltuk takimlari, yatak odasi, yemek odasi." />
      </Helmet>
      <Navbar />

      <section className="relative overflow-hidden bg-[#faf9f7] px-6 py-32 flex flex-col items-center text-center">
        <div className="absolute -top-32 -right-32 w-[600px] h-[600px] bg-amber-100 rounded-full opacity-40 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] bg-amber-50 rounded-full opacity-60 blur-2xl pointer-events-none" />
        <h1 className="relative z-10 text-6xl md:text-8xl font-black text-gray-900 italic leading-none mb-6 tracking-tight">
          RÜYA<br /><span className="text-amber-500">MOBİLYA</span>
        </h1>
        <p className="relative z-10 text-gray-500 text-lg max-w-lg mb-10 leading-relaxed">
          Hayallerinizdeki yaşam alanlarını tasarlıyoruz.
        </p>
        <div className="relative z-10 flex gap-4 flex-wrap justify-center">
          <Link to="/products" className="px-8 py-4 bg-gray-900 text-white rounded-full font-bold text-sm hover:bg-amber-600 transition-all shadow-lg">
            Koleksiyonu Keşfet
          </Link>
          <Link to="/contact" className="px-8 py-4 bg-white text-gray-700 rounded-full font-bold text-sm border border-gray-200 hover:border-amber-400 hover:text-amber-600 transition-all">
            Bize Ulaşın
          </Link>
        </div>
        <div className="relative z-10 mt-20 grid grid-cols-3 gap-10 border-t border-gray-200 pt-10 w-full max-w-lg">
          {[["500+", "Mutlu Müşteri"], ["15+", "Yıllık Deneyim"], ["1000+", "Teslim Edilen Ürün"]].map(([num, label]) => (
            <div key={label} className="text-center">
              <p className="text-3xl font-black text-gray-900">{num}</p>
              <p className="text-xs text-gray-400 font-medium mt-1">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-20 w-full">
        <div className="text-center mb-12">
          <p className="text-xs font-bold text-amber-600 tracking-widest uppercase mb-2">Ne Ariyorsunuz?</p>
          <h2 className="text-4xl font-black text-gray-900">Kategoriler</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Koltuk Takımları", emoji: "🛋️", bg: "bg-amber-50" },
            { label: "Yatak Odası", emoji: "��️", bg: "bg-stone-50" },
            { label: "Yemek Odası", emoji: "🪑", bg: "bg-orange-50" },
            { label: "Ofis & Çalışma", emoji: "🖥️", bg: "bg-gray-50" },
          ].map(({ label, emoji, bg }) => (
            <Link key={label} to="/products" className={`${bg} rounded-3xl p-8 flex flex-col items-center gap-3 hover:shadow-md transition-all group`}>
              <span className="text-4xl group-hover:scale-110 transition-transform">{emoji}</span>
              <span className="text-sm font-bold text-gray-700 text-center">{label}</span>
            </Link>
          ))}
        </div>
      </section>

      {products.length > 0 && (
        <section className="bg-[#faf9f7] py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex justify-between items-end mb-12">
              <div>
                <p className="text-xs font-bold text-amber-600 tracking-widest uppercase mb-2">Seçkin Parçalar</p>
                <h2 className="text-4xl font-black text-gray-900">Öne Çıkan Ürünler</h2>
              </div>
              <Link to="/products" className="text-sm font-bold text-gray-400 hover:text-amber-600 transition-colors hidden md:block">
                Tümünü Gor
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        </section>
      )}

      <section className="max-w-7xl mx-auto px-6 py-20 w-full">
        <div className="bg-gray-900 rounded-[3rem] px-10 py-16 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          <div>
            <h3 className="text-3xl font-black text-white italic mb-2">Hayalinizdeki Mobilyayi Birlikte Tasarlayalım</h3>
            <p className="text-gray-400 text-sm">Ücretsız keşif ve fiyat teklifi icin bize ulaşın.</p>
          </div>
          <Link to="/contact" className="shrink-0 px-8 py-4 bg-amber-500 text-white rounded-full font-bold text-sm hover:bg-amber-400 transition-all shadow-lg">
            Ücretsız Teklif Al
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}