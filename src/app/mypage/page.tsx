import Header from '@/components/Header';
import Footer from '@/components/Footer';

const COMING_SOON_FEATURES = [
  { icon: '❤️', label: 'お気に入り施設' },
  { icon: '🔍', label: '検索条件の保存' },
  { icon: '📅', label: '見学申込の履歴' },
  { icon: '🔔', label: '空き状況の通知設定' },
];

export default function MyPage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#FAFAF9' }}>
      <Header />
      <main className="flex-1 py-12 md:py-20 px-4">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <p className="font-[Nunito,sans-serif] font-extrabold text-[#5BBDB3] text-[10px] tracking-[0.2em] uppercase mb-3">
              MY PAGE
            </p>
            <h1 className="font-[family-name:var(--font-zen-maru)] font-bold text-[#2A2520] text-2xl md:text-3xl mb-3">
              マイページ
            </h1>
            <p className="text-[#7A6E65] text-sm leading-relaxed">
              マイページをご利用いただくには会員登録が必要です
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-[#E8E3DF] p-6 md:p-8 space-y-3 mb-6">
            <button
              disabled
              className="w-full flex items-center justify-center gap-3 border-2 border-[#E8E3DF] rounded-xl py-3.5 text-sm font-medium text-[#7A6E65] cursor-not-allowed opacity-60"
            >
              <span className="text-lg">G</span>
              Googleでログインする
            </button>
            <button
              disabled
              className="w-full flex items-center justify-center gap-3 border-2 border-[#E8E3DF] rounded-xl py-3.5 text-sm font-medium text-[#7A6E65] cursor-not-allowed opacity-60"
            >
              <span className="text-lg">💬</span>
              LINEでログインする
            </button>
            <button
              disabled
              className="w-full flex items-center justify-center gap-3 border-2 border-[#E8E3DF] rounded-xl py-3.5 text-sm font-medium text-[#7A6E65] cursor-not-allowed opacity-60"
            >
              <span className="text-lg">📧</span>
              メールアドレスで登録する
            </button>
            <p className="text-center text-[#A89F98] text-xs pt-1">※ 会員登録機能は準備中です</p>
          </div>

          <div className="bg-white rounded-2xl border border-[#E8E3DF] p-6">
            <h2 className="font-[family-name:var(--font-zen-maru)] font-bold text-[#A89F98] text-sm mb-4">
              会員登録後にご利用いただける機能（準備中）
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
        </div>
      </main>
      <Footer />
    </div>
  );
}
