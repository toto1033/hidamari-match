"use client";
import Link from "next/link";
import { Sun } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-orange-500">
          <Sun className="w-7 h-7 fill-orange-400 text-orange-400" />
          ひだまりマッチ
        </Link>
        <nav className="flex items-center gap-6 text-sm text-gray-600">
          <Link href="/services" className="hover:text-orange-500 transition-colors">施設を探す</Link>
          <Link href="#how-it-works" className="hover:text-orange-500 transition-colors">使い方</Link>
          <Link href="#about" className="hover:text-orange-500 transition-colors">サービスについて</Link>
          <Link href="#contact" className="bg-orange-500 text-white px-4 py-2 rounded-full hover:bg-orange-600 transition-colors">お問い合わせ</Link>
        </nav>
      </div>
    </header>
  );
}
