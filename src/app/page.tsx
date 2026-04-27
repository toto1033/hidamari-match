import Link from 'next/link';
import { Star, MapPin } from 'lucide-react';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import { getFacilities } from '@/data/facilities';

export const metadata: Metadata = {
  title: 'ひだまりマッチ | 放課後等デイサービス検索・比較',
  description: '全国22,000以上の放課後等デイサービスを、障害特性・地域・特徴で絞り込み検索。お子さまにぴったりの施設が見つかります。保護者の方は無料でご利用いただけます。',
  keywords: ['放課後等デイサービス', '放課後デイ', '障害児', '施設検索', '発達障害', '療育'],
  openGraph: {
    title: 'ひだまりマッチ | 放課後等デイサービス検索・比較',
    description: '全国22,000以上の放課後等デイサービスを検索・比較。お子さまにぴったりの施設が見つかります。',
    url: 'https://hidamari-match.vercel.app',
    siteName: 'ひだまりマッチ',
    locale: 'ja_JP',
    type: 'website',
  },
};

const STATS = [
  { num: '22,000+', label: '掲載施設数' },
  { num: '47', label: '対応都道府県' },
  { num: '3,400+', label: '累計問い合わせ' },
];

const STEPS = [
  {
    num: '1',
    icon: '🔍',
    title: '条件を入力',
    desc: '地域・障害種別・希望のサービスを選ぶだけ。',
  },
  {
    num: '2',
    icon: '📋',
    title: '施設を比較',
    desc: '空き状況・評判・特徴を一覧で比較できます。',
  },
  {
    num: '3',
    icon: '📅',
    title: '見学を申し込む',
    desc: '気になる施設に問い合わせ・見学申し込み。',
  },
];

function isNew(createdAt: string): boolean {
  return Date.now() - new Date(createdAt).getTime() < 30 * 24 * 60 * 60 * 1000;
}

export default async function Home() {
  const all = await getFacilities();
  const featured = [...all]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 3);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FAFAF9' }}>
      <Header />

      {/* ── Hero ── */}
      <HeroSection />

      {/* ── Stats bar ── */}
      <section className="bg-[#5BBDB3] py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-around gap-2">
            {STATS.map((stat) => (
              <div key={stat.label} className="text-center min-w-0">
                <p className="font-nunito font-black text-white text-[20px] md:text-[32px] leading-none mb-1">
                  {stat.num}
                </p>
                <p className="text-white/75 text-[10px] md:text-xs leading-tight">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured facilities ── */}
      <section className="py-16 px-4" style={{ backgroundColor: '#FAFAF9' }}>
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-6">
            <div>
              <p className="font-nunito font-extrabold text-[#5BBDB3] text-[10px] tracking-[0.2em] uppercase mb-1">
                New Arrival
              </p>
              <h2 className="font-[family-name:var(--font-round)] font-bold text-[#2A2520] text-xl md:text-[26px]">
                新着の施設
              </h2>
            </div>
            <Link href="/search" className="text-sm text-[#5BBDB3] hover:underline font-medium shrink-0 ml-4">
              すべて見る →
            </Link>
          </div>

          {/* PC: uniform 3-column grid */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {featured.map((f) => (
              <Link
                key={f.id}
                href={`/facilities/${f.id}`}
                className="block bg-white rounded-2xl border border-[#E8E3DF] overflow-hidden group hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.10)] transition-all duration-200"
              >
                <div
                  className="relative h-[140px] flex items-center justify-center"
                  style={{ backgroundColor: f.hasPhoto ? '#EDF8F7' : f.imageColor }}
                >
                  {isNew(f.createdAt) && (
                    <span style={{
                      position: 'absolute', top: '8px', left: '8px',
                      background: '#F5C842', color: '#2A2520',
                      fontSize: '10px', fontWeight: 800,
                      borderRadius: '6px', padding: '2px 7px',
                      zIndex: 1,
                    }}>NEW!</span>
                  )}
                  {f.hasPhoto ? (
                    <span className="text-[#5BBDB3] text-sm font-medium">施設写真</span>
                  ) : (
                    <span className="text-white/80 text-sm font-medium">No Image</span>
                  )}
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-1 mb-1.5">
                    <Star className="w-3 h-3 fill-[#F5C842] text-[#F5C842]" />
                    <span className="font-nunito font-bold text-xs text-[#2A2520]">{f.rating}</span>
                    <span className="text-xs text-[#A89F98]">（{f.reviewCount}件）</span>
                    <span className={`ml-auto text-xs font-bold px-2 py-0.5 rounded-full ${
                      f.vacancyCount > 0 ? 'bg-[#F5C842] text-[#2A2520]' : 'bg-[#FFE0E0] text-red-500'
                    }`}>
                      {f.vacancyCount > 0 ? `空き${f.vacancyCount}名` : '満員'}
                    </span>
                  </div>
                  <h3 className="font-[family-name:var(--font-round)] font-bold text-[#2A2520] text-sm mb-1">
                    {f.name}
                  </h3>
                  <p className="text-xs text-[#5BBDB3] font-medium mb-2">{f.catchcopy}</p>
                  <div className="flex items-center gap-1 text-xs text-[#A89F98]">
                    <MapPin className="w-3 h-3" />{f.city}
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Mobile: horizontal scroll */}
          <div className="md:hidden flex gap-3 overflow-x-auto pb-3 -mx-4 px-4 scrollbar-hide">
            {featured.map((f) => (
              <Link
                key={f.id}
                href={`/facilities/${f.id}`}
                className="shrink-0 w-[200px] bg-white rounded-2xl border border-[#E8E3DF] overflow-hidden"
              >
                <div
                  className="relative h-32 flex items-center justify-center"
                  style={{ backgroundColor: f.hasPhoto ? '#EDF8F7' : f.imageColor }}
                >
                  {isNew(f.createdAt) && (
                    <span style={{
                      position: 'absolute', top: '8px', left: '8px',
                      background: '#F5C842', color: '#2A2520',
                      fontSize: '10px', fontWeight: 800,
                      borderRadius: '6px', padding: '2px 7px',
                      zIndex: 1,
                    }}>NEW!</span>
                  )}
                  {f.hasPhoto ? (
                    <span className="text-[#5BBDB3] text-xs font-medium">施設写真</span>
                  ) : (
                    <span className="text-white/80 text-xs font-medium">No Image</span>
                  )}
                </div>
                <div className="p-3">
                  <h3 className="font-[family-name:var(--font-round)] font-bold text-[#2A2520] text-sm mb-0.5 truncate">
                    {f.name}
                  </h3>
                  <p className="text-xs text-[#5BBDB3] font-medium truncate">{f.catchcopy}</p>
                </div>
              </Link>
            ))}
            {/* 右端の余白 */}
            <div className="w-4 shrink-0" aria-hidden="true" />
          </div>
        </div>
      </section>

      {/* ── 3 Steps ── */}
      <section
        id="how-it-works"
        className="py-16 px-4 border-t-2 border-b-2 border-[#F0DC8A]"
        style={{ backgroundColor: '#FFFBEA' }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <p className="font-nunito font-extrabold text-[#9A7800] text-xs tracking-[0.22em] uppercase mb-2">
              How It Works
            </p>
            <h2 className="font-[family-name:var(--font-round)] font-bold text-[#2A2520] text-2xl md:text-[28px]">
              3ステップで施設が見つかる
            </h2>
          </div>

          {/* PC: 3 columns with connectors */}
          <div className="hidden md:flex items-start gap-0">
            {STEPS.map((step, i) => (
              <div key={step.num} className="flex items-start flex-1">
                <div className="flex-1 bg-white border border-[#F0DC8A] rounded-[20px] p-6 text-center">
                  <div className="w-9 h-9 rounded-full bg-[#F5C842] flex items-center justify-center mx-auto mb-3">
                    <span className="font-nunito font-black text-[#2A2520] text-base">{step.num}</span>
                  </div>
                  <div className="text-2xl mb-2">{step.icon}</div>
                  <h3 className="font-[family-name:var(--font-round)] font-bold text-[#2A2520] mb-1">{step.title}</h3>
                  <p className="text-sm text-[#7A6E65] leading-relaxed">{step.desc}</p>
                </div>
                {i < STEPS.length - 1 && (
                  <div className="flex items-center justify-center w-8 shrink-0 mt-12">
                    <span className="text-[#F0DC8A] text-xl">···</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Mobile: vertical list */}
          <div className="md:hidden space-y-4">
            {STEPS.map((step) => (
              <div key={step.num} className="flex items-start gap-4">
                <div className="w-9 h-9 rounded-full bg-[#F5C842] flex items-center justify-center shrink-0 mt-0.5">
                  <span className="font-nunito font-black text-[#2A2520] text-base">{step.num}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xl">{step.icon}</span>
                    <h3 className="font-[family-name:var(--font-round)] font-bold text-[#2A2520]">{step.title}</h3>
                  </div>
                  <p className="text-sm text-[#7A6E65] leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 施設掲載CTA ── */}
      <section id="listing" className="py-16 px-4 bg-white">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-[family-name:var(--font-round)] font-bold text-[#2A2520] text-2xl mb-4">
            施設掲載をご希望の方へ
          </h2>
          <p className="text-[#7A6E65] mb-8 leading-relaxed">
            ひだまりマッチへの施設掲載は無料です。<br />
            多くのご家族に施設の魅力を届けませんか？
          </p>
          <a
            href="mailto:info@hidamari-match.example.com"
            className="inline-block bg-[#F5C842] text-[#2A2520] font-[family-name:var(--font-round)] font-bold px-8 py-4 rounded-[28px] hover:bg-[#D4A800] transition-colors"
          >
            無料で掲載する
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
