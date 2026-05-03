import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { getProduct } from '../services/productService';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImg, setActiveImg] = useState(0);

  useEffect(() => {
    getProduct(id)
      .then(p => {
        if (!p) {
          navigate('/products', { replace: true });
          return;
        }
        setProduct(p);
        setLoading(false);
      })
      .catch(() => {
        navigate('/products', { replace: true });
      });
  }, [id, navigate]);

  const images = product?.images?.length ? product.images : (product?.imageUrl ? [product.imageUrl] : []);

  const prev = () => setActiveImg(i => (i - 1 + images.length) % images.length);
  const next = () => setActiveImg(i => (i + 1) % images.length);

  useEffect(() => {
    if (!product) return;
    const handleKey = (e) => {
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [product, images.length]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-gray-400 font-medium">Yükleniyor...</p>
    </div>
  );

  if (!product) return null;

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Helmet>
        <title>{product.name} | Rüya Mobilya Kırşehir</title>
        <meta name="description" content={product.description || `${product.name} - ${product.category} - Rüya Mobilya Kırşehir`} />
        {images[0] && <meta property="og:image" content={images[0]} />}
      </Helmet>
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-6 py-16 w-full">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-amber-600 transition-colors mb-10">
          ← Geri
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Görsel Galerisi */}
          <div className="flex flex-col gap-4">
            {/* Ana görsel + ok tuşları */}
            <div className="relative aspect-square rounded-[3rem] overflow-hidden bg-gray-50 border border-gray-100">
              {images[activeImg]
                ? <img src={images[activeImg]} alt={product.name} className="w-full h-full object-contain" />
                : <div className="w-full h-full flex items-center justify-center text-8xl">🛋️</div>
              }
              {images.length > 1 && (
                <>
                  <button onClick={prev}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full shadow-md flex items-center justify-center text-gray-700 hover:bg-amber-500 hover:text-white transition-all">
                    ‹
                  </button>
                  <button onClick={next}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full shadow-md flex items-center justify-center text-gray-700 hover:bg-amber-500 hover:text-white transition-all">
                    ›
                  </button>
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                    {images.map((_, i) => (
                      <button key={i} onClick={() => setActiveImg(i)}
                        className={`w-2 h-2 rounded-full transition-all ${activeImg === i ? 'bg-amber-500 w-4' : 'bg-white/70'}`} />
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Thumbnail'lar */}
            {images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-1">
                {images.map((img, i) => (
                  <button key={i} onClick={() => setActiveImg(i)}
                    className={`shrink-0 w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all ${activeImg === i ? 'border-amber-500' : 'border-gray-100 hover:border-gray-300'}`}>
                    <img src={img} alt="" className="w-full h-full object-contain" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Bilgiler */}
          <div className="flex flex-col justify-center">
            <span className="inline-block px-4 py-1.5 bg-amber-100 text-amber-700 text-xs font-bold tracking-widest uppercase rounded-full w-fit mb-4">
              {product.category}
            </span>
            <h1 className="text-4xl font-black text-gray-900 mb-4">{product.name}</h1>

            {product.description && (
              <p className="text-gray-500 leading-relaxed mb-8">{product.description}</p>
            )}

            {product.stock && (
              <p className="text-sm text-gray-400 mb-6">
                Stok: <span className="font-bold text-gray-700">{product.stock} adet</span>
              </p>
            )}

            <div className="flex gap-4">
              <a
                href={`https://wa.me/905449175246?text=${encodeURIComponent(product.name + ' hakkında bilgi almak istiyorum.\n\nÜrün: https://ruyamobilya.com/products/' + product.id)}`}
                target="_blank" rel="noreferrer"
                className="flex items-center gap-2 px-6 py-4 bg-green-500 text-white rounded-2xl font-bold text-sm hover:bg-green-400 transition-all shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="white">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
