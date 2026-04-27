import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getColumnBySlug, getColumns } from '@/data/columns';

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getColumns().map((col) => ({ slug: col.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const col = getColumnBySlug(slug);
  if (!col) return {};
  return {
    title: `${col.title} | ひだまりマッチ`,
    description: col.description,
  };
}

const CATEGORY_COLORS: Record<string, string> = {
  '制度・費用': 'bg-[#EDF8F7] text-[#3d8880] border-[#C8EDEA]',
  '施設の選び方': 'bg-[#FFFBEA] text-[#9A7800] border-[#F0DC8A]',
  '地域情報': 'bg-[#F3F0FF] text-[#6B50C8] border-[#D4CAFE]',
};

export default async function ColumnDetailPage({ params }: Props) {
  const { slug } = await params;
  const col = getColumnBySlug(slug);
  if (!col) notFound();

  const paragraphs = col.content.split('\n\n').filter(Boolean);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FAFAF9' }}>
      <Header />

      <article className="py-10 px-4">
        <div className="max-w-2xl mx-auto">
          {/* パンくず */}
          <nav className="flex items-center gap-2 text-xs text-[#A89F98] mb-6">
            <Link href="/" className="hover:text-[#5BBDB3] transition-colors">トップ</Link>
            <span>/</span>
            <Link href="/column" className="hover:text-[#5BBDB3] transition-colors">コラム</Link>
            <span>/</span>
            <span className="text-[#7A6E65] line-clamp-1">{col.title}</span>
          </nav>

          {/* ヘッダー */}
          <header className="mb-8">
            <span className={`inline-block text-[10px] font-bold px-2.5 py-0.5 rounded-full border mb-3 ${
              CATEGORY_COLORS[col.category] ?? 'bg-[#F3F0EE] text-[#7A6E65] border-[#E8E3DF]'
            }`}>
              {col.category}
            </span>
            <h1 className="font-[family-name:var(--font-round)] font-bold text-[#2A2520] text-xl md:text-2xl leading-snug mb-3">
              {col.title}
            </h1>
            <p className="font-nunito text-xs text-[#A89F98]">{col.publishedAt}</p>
          </header>

          {/* リード文 */}
          <div className="bg-[#EDF8F7] border-l-4 border-[#5BBDB3] rounded-r-xl px-5 py-4 mb-8">
            <p className="text-sm text-[#2A2520] leading-relaxed">{col.description}</p>
          </div>

          {/* 本文 */}
          <div className="space-y-5">
            {paragraphs.map((para, i) => {
              if (para.startsWith('■')) {
                return (
                  <h2
                    key={i}
                    className="font-[family-name:var(--font-round)] font-bold text-[#2A2520] text-base border-b-2 border-[#5BBDB3] pb-1 mt-8"
                  >
                    {para}
                  </h2>
                );
              }
              if (para.startsWith('【') || para.startsWith('・') || para.startsWith('1.') || para.startsWith('2.') || para.startsWith('3.') || para.startsWith('4.')) {
                return (
                  <div key={i} className="pl-1 space-y-1">
                    {para.split('\n').map((line, j) => (
                      <p key={j} className="text-sm text-[#2A2520] leading-relaxed">{line}</p>
                    ))}
                  </div>
                );
              }
              return (
                <div key={i}>
                  {para.split('\n').map((line, j) => (
                    <p key={j} className="text-sm text-[#2A2520] leading-relaxed">{line}</p>
                  ))}
                </div>
              );
            })}
          </div>

          {/* 施設検索CTA */}
          <div className="mt-12 bg-white border border-[#E8E3DF] rounded-2xl p-6 text-center">
            <p className="font-[family-name:var(--font-round)] font-bold text-[#2A2520] mb-2">
              お近くの施設を探してみましょう
            </p>
            <p className="text-xs text-[#7A6E65] mb-4">
              ひだまりマッチでは条件を指定して施設を絞り込み検索できます。
            </p>
            <Link
              href="/search"
              className="inline-block bg-[#5BBDB3] text-white font-[family-name:var(--font-round)] font-bold text-sm px-6 py-3 rounded-[28px] hover:bg-[#4AA8A0] transition-colors"
            >
              施設を探す
            </Link>
          </div>

          {/* 戻るリンク */}
          <div className="mt-8 text-center">
            <Link href="/column" className="text-sm text-[#5BBDB3] hover:underline">
              ← コラム一覧に戻る
            </Link>
          </div>
        </div>
      </article>

      <Footer />
    </div>
  );
}
