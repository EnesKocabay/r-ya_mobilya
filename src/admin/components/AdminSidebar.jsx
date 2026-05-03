import { Link, useLocation } from "react-router-dom";

export default function AdminSidebar() {
  const location = useLocation();

  const menuItems = [
    { name: "Genel Bakış", path: "/admin", icon: "📊" },
    { name: "Ürün Yönetimi", path: "/admin/products", icon: "🛋️" },
    { name: "Yeni Ürün Ekle", path: "/admin/add-product", icon: "➕" },
  ];

  return (
    <aside className="w-72 bg-white border-r border-gray-100 min-h-screen p-6 flex flex-col">
      <div className="px-4 py-8 text-center border-b border-gray-50 mb-8">
        <h1 className="text-2xl font-black text-amber-600 italic">RÜYA</h1>
        <p className="text-[10px] text-gray-400 tracking-[0.2em] font-bold">MOBİLYA & TASARIM</p>
      </div>
      
      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all font-medium ${
              location.pathname === item.path
                ? "bg-amber-600 text-white shadow-lg shadow-amber-200"
                : "text-gray-500 hover:bg-amber-50 hover:text-amber-700"
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            {item.name}
          </Link>
        ))}
      </nav>

      <div className="mt-auto p-4 bg-gray-50 rounded-2xl">
        <p className="text-[10px ] text-gray-400 font-bold uppercase text-center tracking-widest">Kırşehir / 2026</p>
      </div>
    </aside>
  );
}