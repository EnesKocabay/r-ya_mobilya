import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate('/admin');    } catch (err) {
      setError('E-posta veya şifre hatalı.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-amber-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-[3rem] shadow-2xl p-12 w-full max-w-md">
        <div className="text-center mb-10">
          <Link to="/">
            <h1 className="text-4xl font-black text-amber-600 italic">RÜYA</h1>
            <p className="text-[10px] text-gray-400 tracking-[0.3em] font-bold">MOBİLYA</p>
          </Link>
          <p className="text-gray-500 mt-4 text-sm">Admin paneline giriş yapın</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 text-sm font-medium px-4 py-3 rounded-2xl mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="E-posta"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-5 py-4 bg-gray-50 rounded-2xl outline-none border-2 border-transparent focus:border-amber-500 transition-all text-sm"
          />
          <input
            type="password"
            placeholder="Şifre"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-5 py-4 bg-gray-50 rounded-2xl outline-none border-2 border-transparent focus:border-amber-500 transition-all text-sm"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-gray-900 text-white rounded-2xl font-bold hover:bg-amber-600 transition-all disabled:opacity-50"
          >
            {loading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
          </button>
        </form>
      </div>
    </div>
  );
}
