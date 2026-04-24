import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const COMING_SOON_FEATURES = [
  { icon: '✏️', label: '施設情報の編集' },
  { icon: '📊', label: '空き状況の更新' },
  { icon: '💬', label: '問い合わせの管理' },
  { icon: '📈', label: '利用統計の確認' },
];

export default function FacilityMyPage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#FAFAF9' }}>
      <Header />
      <main className="flex-1 py-12 md:py-20 px-4">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <p className="font-[Nunito,sans-serif] font-extrabold text-[#5BBDB3] text-[10px] tracking-[0.2em] uppercase mb-3">
              FACILITY MY PAGE
            </p>
            <h1 className="font-[family-name:var(--font-zen-maru)] font-bold text-[#2A2520] text-2xl md:text-3xl mb-3">
              事業者マイページ
            </h1>
            <p className="text-[#7A6E65] text-sm leading-relaxed">
              事業者マイページは現在準備中です
            </p>
          </div>

          <div className="bg-[#EDF8F7] rounded-2xl p-6 text-center mb-6">
            <p className="text-[#2A2520] text-sm mb-4">
              掲載に関するお問い合わせはこちらからお気軽にご連絡ください。
            </p>
            <Link
              href="/contact"
              className="inline-block bg-[#5BBDB3] text-white font-[family-name:var(--font-zen-maru)] font-bold text-sm px-6 py-3 rounded-[28px] hover:bg-[#4AA8A0] transition-colors"
            >
              掲載に関するお問い合わせはこちら
            </Link>
          </div>

          <div className="bg-white rounded-2xl border border-[#E8E3DF] p-6">
            <h2 className="font-[family-name:var(--font-zen-maru)] font-bold text-[#A89F98] text-sm mb-4">
              今後実装予定の機能（準備中）
            </h2>
            <ul className="space-y-3">
              {COMING_SOON_FEATURES.map((f, i) => (
                <li key={i} className="flex items-center gap-3 text-[#A89F98] text-sm">
                  <span className="opacity-50">{f.icon}</span>
                  <span className="opacity-70">{f.label}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6 text-center">
            <Link
              href="/for-facilities"
              className="text-[#5BBDB3] text-sm hover:underline"
            >
              施設掲載のご案内を見る →
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
