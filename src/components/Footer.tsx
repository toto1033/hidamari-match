import Link from 'next/link';

const FOOTER_SECTIONS = [
  {
    heading: '保護者向け',
    links: [
      { href: '/search', label: '施設を探す' },
      { href: '/column', label: 'お役立ち記事' },
      { href: '/guide', label: '初めての方へ' },
      { href: '/faq', label: 'よくある質問' },
      { href: '/contact', label: 'お問い合わせ' },
    ],
  },
  {
    heading: '施設向け',
    links: [
      { href: '/for-facilities', label: '施設掲載のご案内' },
      { href: '/facility-mypage', label: '事業者マイページ' },
    ],
  },
  {
    heading: 'その他',
    links: [
      { href: '/news', label: '新着情報' },
      { href: '/company', label: '運営会社' },
      { href: '/privacy', label: 'プライバシーポリシー' },
      { href: '/terms', label: '利用規約' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-[#2A2520] text-white/50 text-xs py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="pb-8 border-b border-white/10">
          <p className="font-[family-name:var(--font-zen-maru)] font-bold text-white text-base mb-6">
            ひだまりマッチ
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
            {FOOTER_SECTIONS.map((section) => (
              <div key={section.heading}>
                <p className="text-white/40 text-[10px] font-semibold uppercase tracking-wider mb-3">
                  {section.heading}
                </p>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="text-white/50 text-xs hover:text-white/80 transition-colors">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <p className="text-white/25 text-xs mt-6">© 2026 ひだまりマッチ. All rights reserved.</p>
      </div>
    </footer>
  );
}
