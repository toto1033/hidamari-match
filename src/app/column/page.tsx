import Link from 'next/link';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getColumns } from '@/data/columns';

export const metadata: Metadata = {
  title: 'コラム・お役立ち情報 | ひだまりマッチ',
  description: '放課後等デイサービスの制度・費用・選び方など、保護者の方に役立つ情報をお届けします。',
};

const CATEGORY_COLORS: Record<string, string> = {
  '制度・費用': 'bg-[#EDF8F7] text-[#3d8880] border-[#C8EDEA]',
  '施設の選び方': 'bg-[#FFFBEA] text-[#9A7800] border-[#F0DC8A]',
  '地域情報': 'bg-[#F3F0FF] text-[#6B50C8] border-[#D4CAFE]',
};

export default function ColumnListPage() {
  const columns = getColumns();

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FAFAF9' }}>
      <Header />

      {/* ページヘッダー */}
      <section className="bg-white border-b border-[#E8E3DF] py-10 px-4">
        <div className="max-w-6xl mx-auto">
          <p className="font-nunito font-extrabold text-[#5BBDB3] text-[10px] tracking-[0.2em] uppercase mb-1">
            Column
          </p>
          <h1 className="font-[family-name:var(--font-round)] font-bold text-[#2A2520] text-2xl md:text-[28px]">
            コラム・お役立ち情報
          </h1>
          <p className="text-sm text-[#7A6E65] mt-2">
            放課後等デイサービスの制度・選び方・地域情報など、保護者の方に役立つ情報をお届けします。
          </p>
        </div>
      </section>

      {/* 記事一覧 */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {columns.map((col) => (
              <Link
                key={col.slug}
                href={`/column/${col.slug}`}
                className="block bg-white rounded-2xl border border-[#E8E3DF] overflow-hidden hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.10)] transition-all duration-200"
              >
                {/* サムネイル代わりのカラーバー */}
                <div className="h-3 bg-[#5BBDB3]" />

                <div className="p-5">
                  {/* カテゴリバッジ */}
                  <span className={`inline-block text-[10px] font-bold px-2.5 py-0.5 rounded-full border mb-3 ${
                    CATEGORY_COLORS[col.category] ?? 'bg-[#F3F0EE] text-[#7A6E65] border-[#E8E3DF]'
                  }`}>
                    {col.category}
                  </span>

                  <h2 className="font-[family-name:var(--font-round)] font-bold text-[#2A2520] text-sm leading-snug mb-2 line-clamp-3">
                    {col.title}
                  </h2>

                  <p className="text-xs text-[#7A6E65] leading-relaxed line-clamp-3 mb-4">
                    {col.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="font-nunito text-xs text-[#A89F98]">{col.publishedAt}</span>
                    <span className="text-xs text-[#5BBDB3] font-medium">続きを読む →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
