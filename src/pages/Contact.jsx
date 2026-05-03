import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Helmet } from 'react-helmet-async';

export default function Contact() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Helmet>
        <title>İletişim | Rüya Mobilya Kırşehir</title>
        <meta name="description" content="Rüya Mobilya Kırşehir iletişim bilgileri. Adres, telefon ve çalışma saatleri." />
      </Helmet>
      <Navbar />

      <section className="bg-[#faf9f7] px-6 py-28 text-center">
        <p className="text-xs font-bold text-amber-600 tracking-widest uppercase mb-3">Ulaşın</p>
        <h1 className="text-5xl md:text-6xl font-black text-gray-900 italic mb-6">İletişim</h1>
        <p className="text-gray-500 max-w-md mx-auto">Sorularınız veya özel sipariş talepleriniz için bize ulaşın.</p>
      </section>

      <section className="max-w-2xl mx-auto px-6 py-20 w-full mr-auto ml-16 md:ml-32">
        <div className="space-y-6">
          {[
            { icon: '📍', label: 'Adres', value: 'Bahçeli Evler Mah. Şht. Üsteğmen Oğuz Kılıç Cad. No:11/A Rüya Mobilya, Kırşehir 40100' },
            { icon: '📞', label: 'Telefon', value: '0544 917 52 46' },
            { icon: '✉️', label: 'E-posta', value: 'info@ruyamobilya.com' },
            { icon: '🕐', label: 'Çalışma Saatleri', value: 'Pzt–Cmt: 09:00–18:00' },
          ].map(({ icon, label, value }) => (
            <div key={label} className="flex items-start gap-4">
              <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center text-xl shrink-0">{icon}</div>
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">{label}</p>
                <p className="text-gray-700 font-medium mt-0.5">{value}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
