import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: '準備中',
  description: 'この機能は現在準備中です。',
};

export default function ComingSoonPage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#FAFAF9' }}>
      <Header />
      <main className="flex-1 flex items-center justify-center py-20 px-4">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 rounded-full bg-[#EDF8F7] border-2 border-[#5BBDB3] flex items-center justify-center mx-auto mb-6">
            <span className="text-2xl">🔧</span>
          </div>
          <p className="font-[Nunito,sans-serif] font-extrabold text-[#5BBDB3] text-[10px] tracking-[0.2em] uppercase mb-3">
            COMING SOON
          </p>
          <h1 className="font-[family-name:var(--font-zen-maru)] font-bold text-[#2A2520] text-2xl mb-3">
            この機能は現在準備中です
          </h1>
          <p className="text-[#7A6E65] text-sm leading-relaxed mb-8">
            より良いサービスをお届けするために準備を進めています。<br />
            もうしばらくお待ちください。
          </p>
          <Link
            href="/search"
            className="inline-block bg-[#F5C842] text-[#2A2520] font-[family-name:var(--font-zen-maru)] font-bold text-sm px-8 py-4 rounded-[28px] hover:bg-[#D4A800] transition-colors"
          >
            条件で施設を探す →
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
