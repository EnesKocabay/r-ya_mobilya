import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminSidebar from "./components/AdminSidebar";
import AdminHeader from "./components/AdminHeader";
import { getProduct, updateProduct, removeProductImage } from "../services/productService";

const CATEGORIES = ["Koltuk Takimi", "Yatak Odası", "Yemek Odası", "Ofis", "Bahçe", "Diğer"];
const inputCls = "w-full px-5 py-3.5 bg-gray-50 rounded-2xl outline-none border-2 border-transparent focus:border-amber-500 transition-all text-sm";

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [newFiles, setNewFiles] = useState([]);
  const [newPreviews, setNewPreviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", price: "", category: "", description: "", stock: "", imageUrl: "", images: [], featured: false });

  useEffect(() => {
    getProduct(id)
      .then((p) => {
        if (!p) { navigate("/admin/products"); return; }
        setForm({ ...p, images: p.images || (p.imageUrl ? [p.imageUrl] : []), featured: p.featured || false });
      })
      .catch(() => navigate("/admin/products"));
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleNewImages = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    setNewFiles((prev) => [...prev, ...files]);
    setNewPreviews((prev) => [...prev, ...files.map((f) => URL.createObjectURL(f))]);
  };

  const removeNewImage = (i) => {
    setNewFiles((prev) => prev.filter((_, idx) => idx !== i));
    setNewPreviews((prev) => prev.filter((_, idx) => idx !== i));
  };

  const removeExistingImage = async (url) => {
    if (!confirm("Bu görseli silmek istediginize emin misiniz?")) return;
    try {
      await removeProductImage(id, url, form.images);
      const updated = form.images.filter((u) => u !== url);
      setForm((prev) => ({ ...prev, images: updated, imageUrl: updated[0] || "" }));
    } catch (err) {
      console.error(err);
      alert("Görsel silinirken hata olustu.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateProduct(id, form, newFiles);
      navigate("/admin/products");
    } catch (err) {
      console.error(err);
      alert("Güncelleme sirasinda hata olustu.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#fafafa]">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        <AdminHeader />
        <main className="p-10 max-w-4xl mx-auto w-full">
          <div className="mb-8">
            <h3 className="text-3xl font-black text-gray-800">Ürünu Düzenle</h3>
            <p className="text-gray-400 text-sm mt-1">Degisiklikler kaydedildigi an vitrine yansir.</p>
          </div>
          <form onSubmit={handleSubmit} className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-10 space-y-6">

            {form.images.length > 0 && (
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Mevcut Görseller</label>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                  {form.images.map((url, i) => (
                    <div key={url} className="relative group aspect-square rounded-2xl overflow-hidden bg-gray-100 border-2 border-transparent hover:border-red-300 transition-all">
                      <img src={url} alt="" className="w-full h-full object-contain" />
                      {i === 0 && <span className="absolute top-1.5 left-1.5 bg-amber-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-full">Ana</span>}
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center">
                        <button type="button" onClick={() => removeExistingImage(url)} className="w-8 h-8 bg-white rounded-full text-xs font-bold text-red-500 hover:bg-red-500 hover:text-white transition-all">X</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
                Yeni Görsel Ekle
                <span className="ml-2 normal-case font-normal text-gray-300">mevcut görsellere eklenir</span>
              </label>
              {newPreviews.length > 0 && (
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mb-3">
                  {newPreviews.map((src, i) => (
                    <div key={i} className="relative group aspect-square rounded-2xl overflow-hidden bg-gray-100 border-2 border-amber-200">
                      <img src={src} alt="" className="w-full h-full object-contain" />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center">
                        <button type="button" onClick={() => removeNewImage(i)} className="w-7 h-7 bg-white rounded-full text-xs font-bold text-red-500 hover:bg-red-500 hover:text-white transition-all">X</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <label className="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed border-gray-200 rounded-2xl cursor-pointer hover:border-amber-400 transition-all bg-gray-50">
                <p className="text-2xl mb-1">+</p>
                <p className="text-sm font-medium text-gray-400">Görsel eklemek icin tiklayin</p>
                <input type="file" accept="image/*" multiple onChange={handleNewImages} className="hidden" />
              </label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Ürün Adi</label>
                <input name="name" value={form.name} onChange={handleChange} required className={inputCls} />
              </div>
              
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Kategori</label>
                <select name="category" value={form.category} onChange={handleChange} required className={inputCls}>
                  <option value="">Kategori seçin</option>
                  {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Stok</label>
                <input name="stock" value={form.stock} onChange={handleChange} type="number" className={inputCls} />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Açıklama</label>
              <textarea name="description" value={form.description} onChange={handleChange} rows={4} className="w-full px-5 py-3.5 bg-gray-50 rounded-2xl outline-none border-2 border-transparent focus:border-amber-500 transition-all text-sm resize-none" />
            </div>

            <div className="flex items-center gap-3 p-4 bg-amber-50 rounded-2xl">
              <input type="checkbox" name="featured" id="featured" checked={form.featured} onChange={handleChange} className="w-5 h-5 accent-amber-500 cursor-pointer" />
              <label htmlFor="featured" className="text-sm font-bold text-amber-800 cursor-pointer">Öne Çıkan Ürün olarak isaretleyin (Ana sayfada gosterilir)</label>
            </div>

            <div className="flex gap-4 pt-2">
              <button type="button" onClick={() => navigate("/admin/products")} className="px-8 py-4 rounded-2xl border border-gray-200 text-sm font-bold text-gray-500 hover:bg-gray-50 transition-all">İptal</button>
              <button type="submit" disabled={loading} className="flex-1 py-4 bg-amber-600 text-white rounded-2xl font-bold text-sm hover:bg-amber-500 transition-all disabled:opacity-50 shadow-lg shadow-amber-200">
                {loading ? "Kaydediliyor..." : "Değişiklikleri Kaydet"}
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}