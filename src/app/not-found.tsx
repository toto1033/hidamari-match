import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#FAFAF9' }}>
      <Header />
      <main className="flex-1 flex items-center justify-center py-20 px-4">
        <div className="text-center max-w-md">
          <p className="font-[Nunito,sans-serif] font-black text-[#5BBDB3] text-[80px] leading-none mb-4">404</p>
          <h1 className="font-[family-name:var(--font-zen-maru)] font-bold text-[#2A2520] text-2xl mb-3">
            ページが見つかりません
          </h1>
          <p className="text-[#7A6E65] text-sm leading-relaxed mb-8">
            お探しのページは存在しないか、移動した可能性があります。
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/"
              className="bg-[#5BBDB3] text-white font-[family-name:var(--font-zen-maru)] font-bold text-sm px-6 py-3 rounded-[28px] hover:bg-[#4AA8A0] transition-colors"
            >
              トップページに戻る
            </Link>
            <Link
              href="/search"
              className="bg-[#F5C842] text-[#2A2520] font-[family-name:var(--font-zen-maru)] font-bold text-sm px-6 py-3 rounded-[28px] hover:bg-[#D4A800] transition-colors"
            >
              施設を探す
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
