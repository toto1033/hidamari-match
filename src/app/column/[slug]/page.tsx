import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
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

export default async function ColumnDetailPage({ params }: Props) {
  const { slug } = await params;
  const col = getColumnBySlug(slug);
  if (!col) notFound();

  const allColumns = getColumns();
  const relatedColumns = [
    ...allColumns.filter((c) => c.category === col.category && c.slug !== slug),
    ...allColumns.filter((c) => c.category !== col.category && c.slug !== slug),
  ].slice(0, 3);

  const paragraphs = col.content.split('\n\n').filter(Boolean);

  return (
    <article className="max-w-[680px] mx-auto px-4 sm:px-8 py-10">
      {/* 記事ヘッダー */}
      <header className="mb-8">
        <p
          className="text-[10px] font-medium text-[#5BBDB3] tracking-[0.08em] mb-3"
          style={{ fontFamily: "'Noto Sans JP', sans-serif" }}
        >
          {col.category}
        </p>
        <h1 className="font-mincho font-bold text-[#2A2520] text-[22px] sm:text-[28px] leading-[1.5] mb-4">
          {col.title}
        </h1>
        <div
          className="flex items-center gap-3 mb-6"
          style={{ fontFamily: "'Noto Sans JP', sans-serif" }}
        >
          <span className="text-[12px] text-[#B8AFA0]">{col.publishedAt}</span>
          <span className="text-[12px] text-[#B8AFA0]">{col.readingTime}</span>
        </div>

        {/* アイキャッチ画像エリア */}
        <div
          className="w-full rounded-xl mb-8"
          style={{
            aspectRatio: '16/9',
            backgroundColor: col.thumbnailColor ?? '#E8E0C8',
            borderRadius: '12px',
          }}
        />
      </header>

      {/* 本文エリア */}
      <div
        className="text-[15px] text-[#3A3530] leading-[2.0] mb-12"
        style={{ fontFamily: "'Noto Sans JP', sans-serif" }}
      >
        {paragraphs.map((para, i) => {
          if (para.startsWith('■')) {
            return (
              <h2
                key={i}
                className="font-mincho font-bold text-[20px] text-[#2A2520]"
                style={{
                  borderLeft: '4px solid #5BBDB3',
                  paddingLeft: '12px',
                  margin: '32px 0 16px',
                }}
              >
                {para.replace(/^■\s*/, '')}
              </h2>
            );
          }

          if (para.startsWith('【')) {
            const lines = para.split('\n');
            const heading = lines[0];
            const body = lines.slice(1).join('\n');
            return (
              <div key={i}>
                <h3
                  className="font-mincho font-semibold text-[17px] text-[#2A2520]"
                  style={{ margin: '24px 0 12px' }}
                >
                  {heading}
                </h3>
                {body && (
                  <p className="text-[15px] text-[#3A3530] leading-[2.0]">
                    {body}
                  </p>
                )}
              </div>
            );
          }

          return (
            <div key={i} className="mb-4">
              {para.split('\n').map((line, j) => (
                <p key={j} className="text-[15px] text-[#3A3530] leading-[2.0]">
                  {line}
                </p>
              ))}
            </div>
          );
        })}
      </div>

      {/* 記事末尾CTA */}
      <div
        className="text-center mb-10"
        style={{
          backgroundColor: '#EDF8F7',
          border: '1px solid #C8EDEA',
          borderRadius: '12px',
          padding: '24px 28px',
        }}
      >
        <p
          className="text-[10px] font-medium text-[#5BBDB3] tracking-[0.08em] mb-2"
          style={{ fontFamily: "'Noto Sans JP', sans-serif" }}
        >
          HIDAMARI MATCH
        </p>
        <p className="font-mincho font-bold text-[16px] text-[#2A2520] mb-1.5">
          お子さまに合う施設を、無料で探せます
        </p>
        <p
          className="text-[12px] text-[#7A6E65] mb-4"
          style={{ fontFamily: "'Noto Sans JP', sans-serif" }}
        >
          地域・障害特性・希望のサービスから放課後等デイサービスを検索できます
        </p>
        <Link
          href="/search"
          className="inline-block text-[13px] font-medium text-white hover:opacity-80 transition-opacity"
          style={{
            backgroundColor: '#5BBDB3',
            borderRadius: '22px',
            padding: '10px 28px',
            fontFamily: "'Noto Sans JP', sans-serif",
          }}
        >
          施設を探してみる →
        </Link>
      </div>

      {/* 関連記事 */}
      {relatedColumns.length > 0 && (
        <section>
          <h2
            className="font-mincho font-semibold text-[14px] text-[#2A2520] pb-2 mb-4"
            style={{ borderBottom: '1px solid #E8E0C8' }}
          >
            あわせて読みたい
          </h2>
          <ul>
            {relatedColumns.map((related) => (
              <li
                key={related.slug}
                style={{ borderBottom: '1px solid #E8E0C8' }}
              >
                <Link
                  href={`/column/${related.slug}`}
                  className="flex flex-row gap-4 items-start py-5 hover:opacity-75 transition-opacity duration-150"
                >
                  <div className="flex-1 min-w-0">
                    <p
                      className="text-[10px] font-medium text-[#5BBDB3] tracking-[0.08em] mb-1.5"
                      style={{ fontFamily: "'Noto Sans JP', sans-serif" }}
                    >
                      {related.category}
                    </p>
                    <h3 className="font-mincho font-semibold text-[17px] text-[#2A2520] leading-[1.55] mb-2">
                      {related.title}
                    </h3>
                    <div className="flex items-center gap-2.5">
                      <span
                        className="text-[11px] text-[#B8AFA0]"
                        style={{ fontFamily: "'Noto Sans JP', sans-serif" }}
                      >
                        {related.publishedAt}
                      </span>
                      <span
                        className="text-[11px] text-[#B8AFA0]"
                        style={{ fontFamily: "'Noto Sans JP', sans-serif" }}
                      >
                        {related.readingTime}
                      </span>
                    </div>
                  </div>
                  <div
                    className="shrink-0 rounded-lg w-[80px] h-[54px] lg:w-[120px] lg:h-[80px]"
                    style={{
                      backgroundColor: related.thumbnailColor ?? '#E8E0C8',
                      borderRadius: '8px',
                    }}
                  />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* 一覧に戻る */}
      <div className="mt-8 text-center">
        <Link
          href="/column"
          className="text-[13px] text-[#5BBDB3] hover:underline"
          style={{ fontFamily: "'Noto Sans JP', sans-serif" }}
        >
          ← お役立ち記事一覧に戻る
        </Link>
      </div>
    </article>
  );
}
