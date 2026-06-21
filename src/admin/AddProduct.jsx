import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "./components/AdminSidebar";
import AdminHeader from "./components/AdminHeader";
import { addProduct } from "../services/productService";

const CATEGORIES = ["Koltuk Takımı", "Oturma Odası", "Yatak Odası", "Yemek Odası", "Mutfak Dolabı", "Ofis", "Antre & Hol", "Bahçe", "Banyo Dolabı", "Diğer"];
const inputCls = "w-full px-5 py-3.5 bg-gray-50 rounded-2xl outline-none border-2 border-transparent focus:border-amber-500 transition-all text-sm";

export default function AddProduct() {
  const navigate = useNavigate();
  const [imageFiles, setImageFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", price: "", category: "", description: "", stock: "", featured: false });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleImages = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    setImageFiles((prev) => [...prev, ...files]);
    setPreviews((prev) => [...prev, ...files.map((f) => URL.createObjectURL(f))]);
  };

  const removeImage = (i) => {
    setImageFiles((prev) => prev.filter((_, idx) => idx !== i));
    setPreviews((prev) => prev.filter((_, idx) => idx !== i));
  };

  const moveImage = (from, to) => {
    const nf = [...imageFiles]; const np = [...previews];
    [nf[from], nf[to]] = [nf[to], nf[from]];
    [np[from], np[to]] = [np[to], np[from]];
    setImageFiles(nf); setPreviews(np);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addProduct(form, imageFiles);
      navigate("/admin/products");
    } catch (err) {
      console.error(err);
      alert("Ürün eklenirken hata olustu.");
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
            <h3 className="text-3xl font-black text-gray-800">Yeni Ürün Ekle</h3>
            <p className="text-gray-400 text-sm mt-1">Ürün bilgilerini doldurup yayınlayın.</p>
          </div>
          <form onSubmit={handleSubmit} className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-10 space-y-6">
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
                Ürün Görselleri
                <span className="ml-2 normal-case font-normal text-gray-300">ilk görsel ana görsel olur</span>
              </label>
              {previews.length > 0 && (
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mb-3">
                  {previews.map((src, i) => (
                    <div key={i} className="relative group aspect-square rounded-2xl overflow-hidden bg-gray-100 border-2 border-transparent hover:border-amber-400 transition-all">
                      <img src={src} alt="" className="w-full h-full object-contain" />
                      {i === 0 && <span className="absolute top-1.5 left-1.5 bg-amber-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-full">Ana</span>}
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center gap-1.5">
                        {i > 0 && <button type="button" onClick={() => moveImage(i, i-1)} className="w-7 h-7 bg-white rounded-full text-xs font-bold hover:bg-amber-500 hover:text-white transition-all">L</button>}
                        <button type="button" onClick={() => removeImage(i)} className="w-7 h-7 bg-white rounded-full text-xs font-bold text-red-500 hover:bg-red-500 hover:text-white transition-all">X</button>
                        {i < previews.length-1 && <button type="button" onClick={() => moveImage(i, i+1)} className="w-7 h-7 bg-white rounded-full text-xs font-bold hover:bg-amber-500 hover:text-white transition-all">R</button>}
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <label className="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed border-gray-200 rounded-2xl cursor-pointer hover:border-amber-400 transition-all bg-gray-50">
                <p className="text-2xl mb-1">+</p>
                <p className="text-sm font-medium text-gray-400">Görsel eklemek icin tiklayin</p>
                <input type="file" accept="image/*" multiple onChange={handleImages} className="hidden" />
              </label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Ürün Adi</label>
                <input name="name" value={form.name} onChange={handleChange} required placeholder="Orn: Luks Kose Koltuk" className={inputCls} />
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
                <input name="stock" value={form.stock} onChange={handleChange} type="number" placeholder="Orn: 10" className={inputCls} />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Açıklama</label>
              <textarea name="description" value={form.description} onChange={handleChange} rows={4} placeholder="Ürün hakkinda kisa bir açıklama..." className="w-full px-5 py-3.5 bg-gray-50 rounded-2xl outline-none border-2 border-transparent focus:border-amber-500 transition-all text-sm resize-none" />
            </div>

            <div className="flex items-center gap-3 p-4 bg-amber-50 rounded-2xl">
              <input type="checkbox" name="featured" id="featured" checked={form.featured} onChange={handleChange} className="w-5 h-5 accent-amber-500 cursor-pointer" />
              <label htmlFor="featured" className="text-sm font-bold text-amber-800 cursor-pointer">
                Öne Çıkan Ürün olarak isaretleyin (Ana sayfada gosterilir)
              </label>
            </div>

            <div className="flex gap-4 pt-2">
              <button type="button" onClick={() => navigate("/admin/products")} className="px-8 py-4 rounded-2xl border border-gray-200 text-sm font-bold text-gray-500 hover:bg-gray-50 transition-all">
                İptal
              </button>
              <button type="submit" disabled={loading} className="flex-1 py-4 bg-amber-600 text-white rounded-2xl font-bold text-sm hover:bg-amber-500 transition-all disabled:opacity-50 shadow-lg shadow-amber-200">
                {loading ? "Yükleniyor..." : "Ürünu Yayınla"}
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}
