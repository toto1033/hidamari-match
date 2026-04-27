"use client";
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronDown } from 'lucide-react';

const SEARCH_DROPDOWN = [
  { href: '/search', label: '条件から探す' },
  { href: '/search', label: 'フリーワードで探す' },
  null, // 区切り線
  { href: '/coming-soon', label: '現在地周辺から探す' },
  { href: '/coming-soon', label: '地図から探す' },
];

const SEARCH_ACCORDION_ITEMS = [
  { href: '/search', label: '条件から探す' },
  { href: '/search', label: 'フリーワードで探す' },
  { href: '/coming-soon', label: '現在地周辺から探す' },
  { href: '/coming-soon', label: '地図から探す' },
];

const DRAWER_OTHER_LINKS = [
  { href: '/guide', label: '初めての方へ' },
  { href: '/#how-it-works', label: '使い方' },
  { href: '/column', label: 'コラム' },
  { href: '/faq', label: 'よくある質問' },
  { href: '/for-facilities', label: '施設掲載' },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [accordionOpen, setAccordionOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const handleMouseEnter = () => {
    if (leaveTimer.current) clearTimeout(leaveTimer.current);
    setDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    leaveTimer.current = setTimeout(() => setDropdownOpen(false), 120);
  };

  return (
    <>
      {/* 上部バー */}
      <div className="hidden md:block bg-[#EDF8F7] border-b border-[#C8EDEA]">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-end h-9 gap-6">
          <Link href="/guide" className="text-[#5BBDB3] text-xs hover:text-[#4AA8A0] transition-colors">
            初めての方へ
          </Link>
          <Link href="/faq" className="text-[#5BBDB3] text-xs hover:text-[#4AA8A0] transition-colors">
            よくある質問
          </Link>
          <Link href="/mypage" className="text-[#5BBDB3] text-xs hover:text-[#4AA8A0] transition-colors">
            ログイン
          </Link>
        </div>
      </div>

      {/* メインヘッダー */}
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
            <span className="font-[family-name:var(--font-zen-maru)] font-bold text-[#2A2520] text-[15px]">
              ひだまりマッチ
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8 text-[15px] font-medium text-[#7A6E65]">
            {/* 施設を探す ドロップダウン */}
            <div
              ref={dropdownRef}
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button className="flex items-center gap-1 hover:text-[#5BBDB3] transition-colors py-2">
                施設を探す
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {/* ドロップダウンメニュー */}
              <div
                className={`absolute top-full left-0 mt-1 w-52 bg-white rounded-xl shadow-[0_8px_24px_rgba(0,0,0,0.10)] border border-[#E8E3DF] overflow-hidden transition-all duration-200 origin-top ${
                  dropdownOpen ? 'opacity-100 scale-y-100 pointer-events-auto' : 'opacity-0 scale-y-95 pointer-events-none'
                }`}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                {SEARCH_DROPDOWN.map((item, i) =>
                  item === null ? (
                    <div key={i} className="border-t border-[#E8E3DF] my-1" />
                  ) : (
                    <Link
                      key={i}
                      href={item.href}
                      className="flex items-center px-4 py-3 text-sm text-[#2A2520] hover:bg-[#EDF8F7] hover:text-[#5BBDB3] transition-colors"
                      onClick={() => setDropdownOpen(false)}
                    >
                      {item.label}
                    </Link>
                  )
                )}
              </div>
            </div>

            <Link href="/#how-it-works" className="hover:text-[#5BBDB3] transition-colors">使い方</Link>
            <Link href="/column" className="hover:text-[#5BBDB3] transition-colors">コラム</Link>
            <Link href="/for-facilities" className="hover:text-[#5BBDB3] transition-colors">施設掲載</Link>
          </nav>

          {/* CTA + Hamburger */}
          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className="hidden md:block bg-[#F5C842] text-[#2A2520] font-[family-name:var(--font-zen-maru)] font-bold text-sm px-5 py-2 rounded-[28px] hover:bg-[#D4A800] transition-colors"
            >
              お問い合わせ
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
          <span className="font-[family-name:var(--font-zen-maru)] font-bold text-[#2A2520] text-sm">
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
        <nav className="flex flex-col flex-1 overflow-y-auto px-5 py-4 gap-1">
          {/* 施設を探す アコーディオン */}
          <div className="border-b border-[#E8E3DF]">
            <button
              className="w-full flex items-center justify-between text-[#2A2520] text-base font-medium py-3.5 hover:text-[#5BBDB3] transition-colors"
              onClick={() => setAccordionOpen((v) => !v)}
              aria-expanded={accordionOpen}
            >
              施設を探す
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${accordionOpen ? 'rotate-180' : ''}`}
              />
            </button>
            <div
              className={`overflow-hidden transition-all duration-200 ${
                accordionOpen ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="flex flex-col pb-2 gap-0">
                {SEARCH_ACCORDION_ITEMS.map(({ href, label }) => (
                  <Link
                    key={label}
                    href={href}
                    onClick={() => setOpen(false)}
                    className="text-[#5BBDB3] text-sm py-2.5 pl-4 hover:text-[#4AA8A0] transition-colors"
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {DRAWER_OTHER_LINKS.map(({ href, label }) => (
            <Link
              key={label}
              href={href}
              onClick={() => setOpen(false)}
              className="text-[#2A2520] text-base font-medium py-3.5 border-b border-[#E8E3DF] hover:text-[#5BBDB3] transition-colors"
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* 区切り線 + CTA */}
        <div className="px-5 pb-8 pt-4 border-t border-[#E8E3DF]">
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="block text-center bg-[#F5C842] text-[#2A2520] font-[family-name:var(--font-zen-maru)] font-bold text-sm px-5 py-3.5 rounded-[28px] hover:bg-[#D4A800] transition-colors"
          >
            お問い合わせ
          </Link>
        </div>
      </div>
    </>
  );
}
