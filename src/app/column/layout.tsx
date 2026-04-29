import { Shippori_Mincho } from 'next/font/google';
import Link from 'next/link';
import Footer from '@/components/Footer';

const shipporiMincho = Shippori_Mincho({
  weight: ['400', '600', '700'],
  subsets: ['latin'],
  variable: '--font-shippori-mincho',
  display: 'swap',
});

export default function ColumnLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`${shipporiMincho.variable} min-h-screen flex flex-col`}
      style={{ backgroundColor: '#FFFDF0' }}
    >
      <header
        className="shrink-0"
        style={{
          backgroundColor: '#FFFDF0',
          borderBottom: '1px solid #E8E0C8',
          height: '56px',
        }}
      >
        <div className="max-w-[780px] mx-auto px-4 sm:px-8 flex items-center justify-between h-full">
          {/* 左：ロゴ ＋ 区切り ＋ お役立ち記事 */}
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-1.5 shrink-0">
              <span className="w-7 h-7 rounded-full bg-[#EDF8F7] border-2 border-[#5BBDB3] flex items-center justify-center shrink-0">
                <span className="w-2 h-2 rounded-full bg-[#F5C842]" />
              </span>
              <span className="font-[family-name:var(--font-round)] font-bold text-[#2A2520] text-[14px]">
                ひだまりマッチ
              </span>
            </Link>
            <span className="text-[#C8BFA8] select-none px-0.5 text-base leading-none">|</span>
            <span className="font-mincho text-[14px] text-[#7A6E65]">お役立ち記事</span>
          </div>

          {/* 右：テキストリンク ＋ ボタン */}
          <div className="flex items-center gap-3 sm:gap-4">
            <Link
              href="/search"
              className="hidden sm:inline-block text-[12px] text-[#7A6E65] hover:text-[#5BBDB3] transition-colors"
              style={{ fontFamily: "'Noto Sans JP', sans-serif" }}
            >
              施設を探す
            </Link>
            <Link
              href="/search"
              className="text-[11px] text-[#5BBDB3] whitespace-nowrap hover:opacity-75 transition-opacity"
              style={{
                border: '1px solid #5BBDB3',
                borderRadius: '18px',
                padding: '5px 14px',
                fontFamily: "'Noto Sans JP', sans-serif",
              }}
            >
              施設を無料で探す →
            </Link>
          </div>
        </div>
      </header>

      <div className="flex-1">{children}</div>

      <Footer />
    </div>
  );
}
