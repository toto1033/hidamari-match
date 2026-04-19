"use client";
import Link from 'next/link';
import { Sun } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-orange-500 shrink-0">
          <Sun className="w-7 h-7 fill-orange-400 text-orange-400" />
          ひだまりマッチ
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm text-gray-600">
          <Link href="/search" className="hover:text-orange-500 transition-colors">施設を探す</Link>
          <Link href="/#how-it-works" className="hover:text-orange-500 transition-colors">使い方</Link>
          <Link href="/#listing" className="hover:text-orange-500 transition-colors">施設掲載</Link>
        </nav>

        <Link
          href="/search"
          className="bg-orange-500 text-white text-sm font-semibold px-5 py-2 rounded-full hover:bg-orange-600 transition-colors"
        >
          無料で探す
        </Link>
      </div>
    </header>
  );
}
