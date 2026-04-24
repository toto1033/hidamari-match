import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: '新着情報',
  description: 'ひだまりマッチの新着情報・お知らせ一覧。',
};

const NEWS_ITEMS = [
  {
    date: '2026年4月15日',
    category: 'サービス',
    title: 'ひだまりマッチをリリースしました',
    body: '放課後等デイサービス検索プラットフォーム「ひだまりマッチ」の正式版をリリースしました。全国の放課後等デイサービス施設を地域・障害特性・支援内容で絞り込んで検索できます。保護者の方は無料でご利用いただけます。今後も機能を順次追加していく予定です。どうぞよろしくお願いいたします。',
  },
  {
    date: '2026年4月10日',
    category: 'お知らせ',
    title: '愛知県の施設掲載を開始しました',
    body: '愛知県（名古屋市・豊田市・岡崎市・一宮市など）の放課後等デイサービス施設の掲載を開始しました。愛知県内で施設をお探しの保護者の方はぜひご活用ください。今後も順次、掲載エリアを拡大していく予定です。施設の掲載をご希望の事業者様は、施設向けサービス紹介ページよりお申し込みください。',
  },
  {
    date: '2026年4月1日',
    category: 'お知らせ',
    title: 'サービスサイトをオープンしました',
    body: 'ひだまりマッチのサービスサイトをオープンしました。現在はベータ版として20施設の情報を掲載しています。保護者の方が安心して施設を探せるよう、詳細な施設情報・空き状況・営業時間・送迎対応などの情報を提供しています。ご意見・ご要望はお問い合わせページからお送りください。',
  },
];

const CATEGORY_COLORS: Record<string, string> = {
  サービス: 'bg-[#EDF8F7] text-[#5BBDB3] border-[#C8EDEA]',
  お知らせ: 'bg-[#FFFBEA] text-[#9A7800] border-[#F0DC8A]',
};

export default function NewsPage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#FAFAF9' }}>
      <Header />
      <main className="flex-1 py-12 md:py-20 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <p className="font-[Nunito,sans-serif] font-extrabold text-[#5BBDB3] text-[10px] tracking-[0.2em] uppercase mb-3">
              NEWS
            </p>
            <h1 className="font-[family-name:var(--font-zen-maru)] font-bold text-[#2A2520] text-2xl md:text-3xl">
              新着情報
            </h1>
          </div>

          <div className="space-y-4">
            {NEWS_ITEMS.map((item, i) => (
              <article key={i} className="bg-white rounded-2xl border border-[#E8E3DF] p-6 md:p-8">
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <time className="text-[#7A6E65] text-xs font-[Nunito,sans-serif]">{item.date}</time>
                  <span className={`text-xs px-2.5 py-0.5 rounded-full border font-medium ${CATEGORY_COLORS[item.category] ?? 'bg-[#EDF8F7] text-[#5BBDB3] border-[#C8EDEA]'}`}>
                    {item.category}
                  </span>
                </div>
                <h2 className="font-[family-name:var(--font-zen-maru)] font-bold text-[#2A2520] text-base mb-3">
                  {item.title}
                </h2>
                <p className="text-[#7A6E65] text-sm leading-relaxed">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
