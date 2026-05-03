import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Helmet } from 'react-helmet-async';

export default function About() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Helmet>
        <title>Hakkımızda | Rüya Mobilya Kırşehir</title>
        <meta name="description" content="2010'dan bu yana Kırşehir'de kaliteli mobilya üretimi ve satışı yapan Rüya Mobilya hakkında bilgi edinin." />
      </Helmet>
      <Navbar />

      {/* Hero */}
      <section className="bg-[#faf9f7] px-6 py-28 text-center">
        <p className="text-xs font-bold text-amber-600 tracking-widest uppercase mb-3">Biz Kimiz?</p>
        <h1 className="text-5xl md:text-6xl font-black text-gray-900 italic mb-6">Hakkımızda</h1>
        <p className="text-gray-500 max-w-xl mx-auto leading-relaxed">
          2010'dan bu yana Kırşehir'de kaliteli mobilya üretimi ve satışı yapıyoruz.
          Her ürünümüz, evinize değer katmak için özenle tasarlanır.
        </p>
      </section>

      {/* Değerler */}
      <section className="max-w-7xl mx-auto px-6 py-20 w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: '🏆', title: 'Kalite', desc: 'Her ürünümüzde en iyi malzemeleri kullanıyor, uzun ömürlü ve dayanıklı mobilyalar üretiyoruz.' },
            { icon: '✏️', title: 'Tasarım', desc: 'Modern ve klasik çizgileri harmanlayan özgün tasarımlarımız evinize karakter katar.' },
            { icon: '🤝', title: 'Güven', desc: '15 yılı aşkın deneyimimiz ve 500\'den fazla mutlu müşterimizle güvenilir bir markayız.' },
          ].map(({ icon, title, desc }) => (
            <div key={title} className="bg-gray-50 rounded-3xl p-8">
              <span className="text-4xl">{icon}</span>
              <h3 className="text-xl font-black text-gray-800 mt-4 mb-2">{title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Hikaye */}
      <section className="bg-gray-900 mx-6 mb-20 rounded-[3rem] px-10 py-16 max-w-7xl md:mx-auto w-[calc(100%-3rem)]">
        <div className="max-w-2xl">
          <p className="text-xs font-bold text-amber-500 tracking-widest uppercase mb-4">Hikayemiz</p>
          <h2 className="text-4xl font-black text-white italic mb-6">15 Yıllık Bir Tutku</h2>
          <p className="text-gray-400 leading-relaxed mb-4">
            Rüya Mobilya, 2010 yılında Kırşehir'de küçük bir atölye olarak kuruldu. Yıllar içinde büyüyen ekibimiz ve artan müşteri portföyümüzle bugün Kırşehir'in en köklü mobilya markası haline geldik.
          </p>
          <p className="text-gray-400 leading-relaxed">
            Her müşterimizin evini bir rüyaya dönüştürmek için çalışıyoruz. Sipariş üzerine özel üretimden hazır koleksiyonlara kadar geniş ürün yelpazemizle hizmetinizdeyiz.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
