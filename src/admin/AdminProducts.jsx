import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AdminSidebar from './components/AdminSidebar';
import AdminHeader from './components/AdminHeader';
import { getProducts, deleteProduct } from '../services/productService';

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (err) {
      console.error(err);
      alert('Ürünler yüklenirken hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProducts(); }, []);

  const handleDelete = async (id, images, imageUrl) => {
    if (!confirm('Bu ürünü silmek istediğinize emin misiniz?')) return;
    try {
      const allImages = images?.length ? images : (imageUrl ? [imageUrl] : []);
      await deleteProduct(id, allImages);
      fetchProducts();
    } catch (err) {
      console.error(err);
      alert('Silme işlemi başarısız oldu.');
    }
  };

  return (
    <div className="flex min-h-screen bg-[#fafafa]">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        <AdminHeader />
        <main className="p-10">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h3 className="text-3xl font-black text-gray-800">Ürün Yönetimi</h3>
              <p className="text-gray-400 text-sm mt-1">Tüm koleksiyon burada listelenir.</p>
            </div>
            <Link to="/admin/add-product"
              className="px-6 py-3 bg-gray-800 text-white rounded-2xl font-bold text-sm hover:bg-amber-600 transition-all">
              + Yeni Ekle
            </Link>
          </div>

          <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
            {loading ? (
              <div className="p-16 text-center text-gray-400 font-medium">Yükleniyor...</div>
            ) : products.length === 0 ? (
              <div className="p-16 text-center">
                <p className="text-5xl mb-4">🛋️</p>
                <p className="text-gray-400 font-medium">Henüz ürün eklenmemiş.</p>
                <Link to="/admin/add-product" className="inline-block mt-4 text-amber-600 font-bold text-sm hover:underline">
                  İlk ürünü ekle →
                </Link>
              </div>
            ) : (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="p-6 text-xs font-bold text-gray-400 uppercase tracking-widest">Ürün</th>
                    <th className="p-6 text-xs font-bold text-gray-400 uppercase tracking-widest">Kategori</th>
                    <th className="p-6 text-xs font-bold text-gray-400 uppercase tracking-widest">Stok</th>
                    <th className="p-6 text-xs font-bold text-gray-400 uppercase tracking-widest text-right">İşlem</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {products.map(p => (
                    <tr key={p.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="p-6">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-gray-100 rounded-xl overflow-hidden shrink-0">
                            {p.imageUrl && <img src={p.imageUrl} alt={p.name} className="w-full h-full object-cover" />}
                          </div>
                          <span className="font-bold text-gray-800 line-clamp-1">{p.name}</span>
                        </div>
                      </td>
                      <td className="p-6 text-gray-500 font-medium text-sm">{p.category}</td>
                      <td className="p-6 text-gray-500 text-sm">{p.stock || '—'}</td>
                      <td className="p-6 text-right space-x-1">
                        <Link to={`/admin/edit-product/${p.id}`}
                          className="inline-flex items-center justify-center w-9 h-9 rounded-xl text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-all">
                          ✏️
                        </Link>
                        <button onClick={() => handleDelete(p.id, p.images, p.imageUrl)}
                          className="inline-flex items-center justify-center w-9 h-9 rounded-xl text-gray-400 hover:text-red-600 hover:bg-red-50 transition-all">
                          🗑️
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
