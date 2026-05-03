import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function AdminHeader() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/rm-panel-2026');
  };

  return (
    <header className="bg-white border-b border-gray-100 px-8 py-4 flex justify-between items-center shadow-sm">
      <div>
        <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Yönetim Paneli</h2>
        <p className="text-xl font-bold text-gray-800">Rüya Mobilya Kırşehir</p>
      </div>
      <div className="flex items-center gap-4">
        <div className="text-right hidden sm:block">
          <p className="text-sm font-bold text-gray-800">{user?.email || 'Admin'}</p>
          <p className="text-xs text-amber-600 font-medium">Aktif Oturum</p>
        </div>
        <button onClick={handleLogout}
          className="bg-red-50 text-red-500 px-4 py-2 rounded-xl text-xs font-bold hover:bg-red-100 transition-all">
          Çıkış
        </button>
      </div>
    </header>
  );
}
