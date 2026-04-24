"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // ドロワー開閉でbodyスクロールを制御
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <>
      <header
        className={`bg-white sticky top-0 z-50 border-b-2 border-[#5BBDB3] transition-shadow ${
          scrolled ? 'shadow-[0_1px_8px_rgba(0,0,0,0.08)]' : ''
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-14 md:h-[68px]">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0" onClick={() => setOpen(false)}>
            <span className="relative w-8 h-8 rounded-full bg-[#EDF8F7] border-2 border-[#5BBDB3] flex items-center justify-center">
              <span className="w-2.5 h-2.5 rounded-full bg-[#F5C842]" />
            </span>
            <span className="font-[family-name:var(--font-round)] font-bold text-[#2A2520] text-[15px]">
              ひだまりマッチ
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8 text-[15px] font-medium text-[#7A6E65]">
            <Link href="/search" className="hover:text-[#5BBDB3] transition-colors">施設を探す</Link>
            <Link href="/#how-it-works" className="hover:text-[#5BBDB3] transition-colors">使い方</Link>
            <Link href="/#listing" className="hover:text-[#5BBDB3] transition-colors">施設掲載</Link>
          </nav>

          {/* CTA + Hamburger */}
          <div className="flex items-center gap-3">
            <Link
              href="/search"
              className="hidden md:block bg-[#F5C842] text-[#2A2520] font-[family-name:var(--font-round)] font-bold text-sm px-5 py-2 rounded-[28px] hover:bg-[#D4A800] transition-colors"
            >
              無料で探す
            </Link>
            <button
              className="md:hidden text-[#2A2520] p-2 min-w-[44px] min-h-[44px] flex items-center justify-center"
              onClick={() => setOpen((v) => !v)}
              aria-label="メニュー"
            >
              {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* オーバーレイ */}
      <div
        className={`md:hidden fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setOpen(false)}
      />

      {/* サイドドロワー（右からスライド） */}
      <div
        className={`md:hidden fixed top-0 right-0 z-50 h-full w-72 bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* ドロワーヘッダー */}
        <div className="flex items-center justify-between px-5 h-14 border-b border-[#E8E3DF]">
          <span className="font-[family-name:var(--font-round)] font-bold text-[#2A2520] text-sm">
            メニュー
          </span>
          <button
            className="text-[#7A6E65] p-2 min-w-[44px] min-h-[44px] flex items-center justify-center"
            onClick={() => setOpen(false)}
            aria-label="閉じる"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* ナビリンク */}
        <nav className="flex flex-col flex-1 px-5 py-6 gap-1">
          {[
            { href: '/search', label: '施設を探す' },
            { href: '/#how-it-works', label: '使い方' },
            { href: '/guide', label: '初めての方へ' },
            { href: '/for-facilities', label: '施設掲載' },
          ].map(({ href, label }) => (
            <Link
              key={label}
              href={href}
              onClick={() => setOpen(false)}
              className="text-[#2A2520] text-base font-medium py-4 border-b border-[#E8E3DF] hover:text-[#5BBDB3] transition-colors"
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <div className="px-5 pb-8">
          <Link
            href="/search"
            onClick={() => setOpen(false)}
            className="block text-center bg-[#F5C842] text-[#2A2520] font-[family-name:var(--font-round)] font-bold text-sm px-5 py-3.5 rounded-[28px] hover:bg-[#D4A800] transition-colors"
          >
            無料で探す
          </Link>
        </div>
      </div>
    </>
  );
}
