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
        scrolled ? 'shadow-[0_1px_4px_rgba(0,0,0,0.08)]' : ''
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <span className="border-2 border-[#5BBDB3] text-[#111111] font-bold text-sm px-3 py-1 rounded-full">
            ひだまりマッチ
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm text-[#333333]">
          <Link href="/search" className="hover:text-[#5BBDB3] transition-colors">施設を探す</Link>
          <Link href="/#how-it-works" className="hover:text-[#5BBDB3] transition-colors">使い方</Link>
          <Link href="/#listing" className="hover:text-[#5BBDB3] transition-colors">施設掲載</Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/search"
            className="hidden md:block bg-[#F5C842] text-[#111111] text-sm font-bold px-5 py-2 rounded-full hover:bg-[#D4A800] transition-colors"
          >
            無料で探す
          </Link>
          <button
            className="md:hidden text-[#333333] p-1"
            onClick={() => setOpen((v) => !v)}
            aria-label="メニュー"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-white border-t border-[#5BBDB3]/30 px-4 py-4 space-y-4 shadow-md">
          <Link href="/search" className="block text-[#333333] text-sm py-2 hover:text-[#5BBDB3]" onClick={() => setOpen(false)}>施設を探す</Link>
          <Link href="/#how-it-works" className="block text-[#333333] text-sm py-2 hover:text-[#5BBDB3]" onClick={() => setOpen(false)}>使い方</Link>
          <Link href="/#listing" className="block text-[#333333] text-sm py-2 hover:text-[#5BBDB3]" onClick={() => setOpen(false)}>施設掲載</Link>
          <Link
            href="/search"
            className="block text-center bg-[#F5C842] text-[#111111] font-bold text-sm px-5 py-2.5 rounded-full"
            onClick={() => setOpen(false)}
          >
            無料で探す
          </Link>
        </div>
      )}
    </header>
  );
}
