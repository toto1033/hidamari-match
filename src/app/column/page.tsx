import Link from 'next/link';
import type { Metadata } from 'next';
import { getColumns } from '@/data/columns';

export const metadata: Metadata = {
  title: 'お役立ち記事 | ひだまりマッチ',
  description: '放課後等デイサービスの制度・費用・選び方など、保護者の方に役立つ情報をお届けします。',
};

const CATEGORIES = ['すべて', '制度・費用', '施設の選び方', '地域情報', '療育・支援'] as const;

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function ColumnListPage({ searchParams }: Props) {
  const { category: rawCategory } = await searchParams;
  const activeCategory =
    typeof rawCategory === 'string' && CATEGORIES.includes(rawCategory as (typeof CATEGORIES)[number])
      ? rawCategory
      : 'すべて';

  const allColumns = getColumns();
  const columns =
    activeCategory === 'すべて'
      ? allColumns
      : allColumns.filter((c) => c.category === activeCategory);

  return (
    <div className="max-w-[780px] mx-auto px-4 sm:px-8 py-10">
      {/* カテゴリナビ */}
      <nav
        className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-3 mb-8 flex items-center gap-2 overflow-x-auto scrollbar-hide"
        style={{ borderBottom: '1px solid #E8E0C8', borderTop: '1px solid #E8E0C8' }}
      >
        {CATEGORIES.map((cat) => {
          const isActive = cat === activeCategory;
          const href = cat === 'すべて' ? '/column' : `/column?category=${encodeURIComponent(cat)}`;
          return (
            <Link
              key={cat}
              href={href}
              className="shrink-0 px-3.5 py-1.5 text-[12px] whitespace-nowrap rounded-full transition-all duration-150"
              style={{
                fontFamily: "'Noto Sans JP', sans-serif",
                ...(isActive
                  ? {
                      backgroundColor: '#5BBDB3',
                      color: '#ffffff',
                      fontWeight: 600,
                    }
                  : {
                      backgroundColor: '#F5F0E8',
                      color: '#7A6E65',
                    }),
              }}
            >
              {cat}
            </Link>
          );
        })}
      </nav>

      {/* ページタイトル */}
      <h1 className="font-mincho font-bold text-[#2A2520] text-[22px] mb-2">
        お役立ち記事
      </h1>
      <p
        className="text-[13px] text-[#9A8F7A] mb-8"
        style={{ fontFamily: "'Noto Sans JP', sans-serif" }}
      >
        放課後等デイサービスに関する制度・費用・施設の選び方を解説します
      </p>

      {/* 記事一覧 */}
      {columns.length === 0 ? (
        <p className="text-[13px] text-[#9A8F7A]">該当する記事はありません。</p>
      ) : (
        <ul>
          {columns.map((col) => (
            <li
              key={col.slug}
              style={{ borderBottom: '1px solid #E8E0C8' }}
            >
              <Link
                href={`/column/${col.slug}`}
                className="flex flex-row gap-5 items-start py-6 hover:opacity-75 transition-opacity duration-150"
              >
                {/* テキストエリア（左） */}
                <div className="flex-1 min-w-0">
                  <p
                    className="text-[10px] font-medium text-[#5BBDB3] mb-1.5 tracking-[0.08em]"
                    style={{ fontFamily: "'Noto Sans JP', sans-serif" }}
                  >
                    {col.category}
                  </p>
                  <h2 className="font-mincho font-semibold text-[17px] text-[#2A2520] leading-[1.55] mb-2">
                    {col.title}
                  </h2>
                  <p
                    className="text-[12px] text-[#7A6E65] leading-[1.75] mb-2.5"
                    style={{
                      fontFamily: "'Noto Sans JP', sans-serif",
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {col.description}
                  </p>
                  <div className="flex items-center gap-2.5">
                    <span
                      className="text-[11px] text-[#B8AFA0]"
                      style={{ fontFamily: "'Noto Sans JP', sans-serif" }}
                    >
                      {col.publishedAt}
                    </span>
                    <span
                      className="text-[11px] text-[#B8AFA0]"
                      style={{ fontFamily: "'Noto Sans JP', sans-serif" }}
                    >
                      {col.readingTime}
                    </span>
                  </div>
                </div>

                {/* サムネエリア（右） */}
                <div
                  className="shrink-0 rounded-lg w-[80px] h-[54px] lg:w-[120px] lg:h-[80px]"
                  style={{
                    backgroundColor: col.thumbnailColor ?? '#E8E0C8',
                    borderRadius: '8px',
                    overflow: 'hidden',
                  }}
                />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
