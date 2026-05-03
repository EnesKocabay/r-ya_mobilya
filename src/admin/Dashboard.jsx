import { useState, useEffect } from 'react';
import AdminSidebar from './components/AdminSidebar';
import AdminHeader from './components/AdminHeader';
import { getProducts } from '../services/productService';
import { getOrders } from '../services/orderService';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getProducts(), getOrders()]).then(([p, o]) => {
      setProducts(p);
      setOrders(o);
      setLoading(false);
    });
  }, []);

  const stats = [
    { label: 'Toplam Ürün', value: products.length, icon: '🛋️', color: 'bg-amber-50 text-amber-600' },
    { label: 'Toplam Sipariş', value: orders.length, icon: '📦', color: 'bg-blue-50 text-blue-600' },
    { label: 'Bekleyen Sipariş', value: orders.filter(o => o.status === 'pending').length, icon: '⏳', color: 'bg-orange-50 text-orange-600' },
    { label: 'Tamamlanan', value: orders.filter(o => o.status === 'completed').length, icon: '✅', color: 'bg-green-50 text-green-600' },
  ];

  return (
    <div className="flex min-h-screen bg-[#fafafa]">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        <AdminHeader />
        <main className="p-10">
          <div className="mb-10">
            <h3 className="text-3xl font-black text-gray-800">Genel Bakış</h3>
            <p className="text-gray-400 text-sm mt-1">Mağazanın anlık durumu.</p>
          </div>

          {/* İstatistik Kartları */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {stats.map(s => (
              <div key={s.label} className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl mb-4 ${s.color}`}>
                  {s.icon}
                </div>
                <p className="text-3xl font-black text-gray-800">{loading ? '—' : s.value}</p>
                <p className="text-xs text-gray-400 font-medium mt-1">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Son Eklenen Ürünler */}
          <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-8">
            <div className="flex justify-between items-center mb-6">
              <h4 className="text-lg font-black text-gray-800">Son Eklenen Ürünler</h4>
              <Link to="/admin/products" className="text-xs font-bold text-amber-600 hover:underline">Tümünü Gör →</Link>
            </div>
            {loading ? (
              <p className="text-gray-400 text-sm text-center py-8">Yükleniyor...</p>
            ) : products.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-400 text-sm">Henüz ürün yok.</p>
                <Link to="/admin/add-product" className="inline-block mt-2 text-amber-600 font-bold text-sm hover:underline">İlk ürünü ekle →</Link>
              </div>
            ) : (
              <div className="space-y-3">
                {products.slice(0, 5).map(p => (
                  <div key={p.id} className="flex items-center gap-4 p-3 rounded-2xl hover:bg-gray-50 transition-all">
                    <div className="w-12 h-12 bg-gray-100 rounded-xl overflow-hidden shrink-0">
                      {p.imageUrl && <img src={p.imageUrl} alt={p.name} className="w-full h-full object-cover" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-gray-800 text-sm truncate">{p.name}</p>
                      <p className="text-xs text-gray-400">{p.category}</p>
                    </div>
                    <p className="font-black text-amber-600 text-sm shrink-0">{Number(p.price).toLocaleString('tr-TR')} TL</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
