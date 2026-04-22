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

  return (
    <header
      className={`bg-white sticky top-0 z-50 border-b-2 border-[#5BBDB3] transition-shadow ${
        scrolled ? 'shadow-[0_1px_8px_rgba(0,0,0,0.08)]' : ''
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-14 md:h-[68px]">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <span className="relative w-8 h-8 rounded-full bg-[#EDF8F7] border-2 border-[#5BBDB3] flex items-center justify-center">
            <span className="w-2.5 h-2.5 rounded-full bg-[#F5C842]" />
          </span>
          <span className="font-[family-name:var(--font-round)] font-bold text-[#2A2520] text-[15px]">
            ひだまりマッチ
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8 text-[15px] font-medium text-[#7A6E65]">
          <Link href="/search" className="hover:text-[#5BBDB3] transition-colors">
            施設を探す
          </Link>
          <Link href="/#how-it-works" className="hover:text-[#5BBDB3] transition-colors">
            使い方
          </Link>
          <Link href="/#listing" className="hover:text-[#5BBDB3] transition-colors">
            施設掲載
          </Link>
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
            className="md:hidden text-[#2A2520] p-2"
            onClick={() => setOpen((v) => !v)}
            aria-label="メニュー"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-[#5BBDB3]/30 px-4 py-4 space-y-4 shadow-md">
          <Link
            href="/search"
            className="block text-[#7A6E65] text-sm py-2 hover:text-[#5BBDB3]"
            onClick={() => setOpen(false)}
          >
            施設を探す
          </Link>
          <Link
            href="/#how-it-works"
            className="block text-[#7A6E65] text-sm py-2 hover:text-[#5BBDB3]"
            onClick={() => setOpen(false)}
          >
            使い方
          </Link>
          <Link
            href="/#listing"
            className="block text-[#7A6E65] text-sm py-2 hover:text-[#5BBDB3]"
            onClick={() => setOpen(false)}
          >
            施設掲載
          </Link>
          <Link
            href="/search"
            className="block text-center bg-[#F5C842] text-[#2A2520] font-[family-name:var(--font-round)] font-bold text-sm px-5 py-3 rounded-[28px]"
            onClick={() => setOpen(false)}
          >
            無料で探す
          </Link>
        </div>
      )}
    </header>
  );
}
