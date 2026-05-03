import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  if (!product || !product.id) return null;

  return (
    <Link to={"/products/" + product.id} className="group cursor-pointer">
      <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden bg-gray-100 shadow-sm border border-gray-50">
        {product.imageUrl ? (
          <img src={product.imageUrl} alt={product.name} className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-300 text-6xl">🛋️</div>
        )}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm">
          <p className="text-[10px] font-black text-amber-600 uppercase tracking-wider">{product.category}</p>
        </div>
      </div>
      <div className="mt-6 px-2">
        <h4 className="text-lg font-bold text-gray-800 group-hover:text-amber-600 transition-colors line-clamp-1">{product.name}</h4>
      </div>
    </Link>
  );
}
