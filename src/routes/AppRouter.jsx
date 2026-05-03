import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from '../admin/Dashboard';
import AddProduct from '../admin/AddProduct';
import AdminProducts from '../admin/AdminProducts';
import EditProduct from '../admin/EditProduct';
import { useAuth } from '../context/AuthContext';

function AppRouter() {
  const { user, loading } = useAuth();

  if (loading) return <div className="p-10 text-amber-600 font-bold">Yükleniyor...</div>;

  if (!user) return <Navigate to="/rm-panel-2026" />;

  return (
    <Routes>
      <Route index element={<Dashboard />} />
      <Route path="products" element={<AdminProducts />} />
      <Route path="add-product" element={<AddProduct />} />
      <Route path="edit-product/:id" element={<EditProduct />} />
    </Routes>
  );
}

export default AppRouter; // İŞTE EKSİK OLAN ONAY SATIRI!
