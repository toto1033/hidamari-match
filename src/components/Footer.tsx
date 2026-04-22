import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#2A2520] text-white/50 text-xs py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-white/10">
          <div>
            <p className="font-[family-name:var(--font-round)] font-bold text-white text-base mb-1">
              ひだまりマッチ
            </p>
            <p className="text-white/40 text-xs">放課後等デイサービス専門マッチングサービス</p>
          </div>
          <nav className="flex flex-wrap gap-x-6 gap-y-2 text-white/50 text-xs">
            <Link href="/search" className="hover:text-white/80 transition-colors">施設を探す</Link>
            <Link href="/#how-it-works" className="hover:text-white/80 transition-colors">使い方</Link>
            <Link href="/#listing" className="hover:text-white/80 transition-colors">施設掲載</Link>
            <Link href="#" className="hover:text-white/80 transition-colors">プライバシーポリシー</Link>
            <Link href="#" className="hover:text-white/80 transition-colors">お問い合わせ</Link>
          </nav>
        </div>
        <p className="text-white/25 text-xs mt-6">© 2026 ひだまりマッチ. All rights reserved.</p>
      </div>
    </footer>
  );
}
