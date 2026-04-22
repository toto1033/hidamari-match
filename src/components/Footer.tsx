import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#2A2520] text-white/50 text-xs py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col gap-6 pb-6 border-b border-white/10">
          <p className="font-[family-name:var(--font-round)] font-bold text-white text-base">
            ひだまりマッチ
          </p>
          <nav className="grid grid-cols-2 sm:flex sm:flex-wrap gap-x-6 gap-y-3 text-white/50 text-xs">
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
