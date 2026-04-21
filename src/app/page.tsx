import Link from 'next/link';
import { Search, MapPin, Heart } from 'lucide-react';
import Header from '@/components/Header';
import FacilityCard from '@/components/FacilityCard';
import HeroSearch from '@/components/HeroSearch';
import { getFacilities } from '@/data/facilities';

const FEATURE_TAGS = [
  { label: '送迎あり', param: 'transport=true', highlight: false },
  { label: '個別支援', param: 'support=個別支援', highlight: false },
  { label: '学習支援', param: 'support=学習支援', highlight: false },
  { label: '運動療育', param: 'support=運動療育', highlight: false },
  { label: '音楽療育', param: 'support=音楽療育', highlight: false },
  { label: 'SST', param: 'support=SST', highlight: false },
  { label: '空きあり', param: 'vacancy=true', highlight: true },
  { label: '土日営業', param: 'weekend=true', highlight: true },
];

export default async function Home() {
  const all = await getFacilities();
  const featured = all.slice(0, 6);

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero */}
      <section className="bg-white py-20 px-4 border-b border-gray-100">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[#5BBDB3] font-semibold text-sm mb-3 tracking-wide">放課後等デイサービス専門マッチングサービス</p>
          <h1 className="text-3xl md:text-5xl font-bold text-[#111111] mb-5 leading-tight">
            お子さまにぴったりの<br />
            放課後等デイサービスが見つかる
          </h1>
          <p className="text-gray-500 text-lg mb-10 leading-relaxed">
            全国22,000以上の施設から、障害特性・地域・特徴で絞り込み検索
          </p>
          <HeroSearch />

          <div className="mt-12 grid grid-cols-3 gap-6 max-w-lg mx-auto">
            {[
              { num: '22,000+', label: '掲載施設数' },
              { num: '47', label: '対応都道府県' },
              { num: '3,400+', label: '累計問い合わせ' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-2xl font-bold text-[#5BBDB3]">{stat.num}</p>
                <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature tags */}
      <section className="bg-[#F0FAFA] py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-lg font-bold text-[#111111] mb-5 text-center">特徴タグで探す</h2>
          <div className="flex flex-wrap gap-3 justify-center">
            {FEATURE_TAGS.map((tag) => (
              <Link
                key={tag.label}
                href={`/search?${tag.param}`}
                className={
                  tag.highlight
                    ? 'px-5 py-2 rounded-full bg-[#FEF9E6] border border-[#F5C842] text-[#B8920A] font-semibold text-sm hover:bg-[#F5C842] hover:text-[#111111] transition-colors'
                    : 'px-5 py-2 rounded-full bg-white border border-[#5BBDB3] text-[#5BBDB3] font-semibold text-sm hover:bg-[#5BBDB3] hover:text-white transition-colors'
                }
              >
                {tag.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured facilities */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-[#111111]">注目の施設</h2>
            <Link href="/search" className="text-sm text-[#5BBDB3] hover:underline font-medium">
              すべて見る →
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((f) => (
              <FacilityCard key={f.id} facility={f} />
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-16 px-4 bg-[#F0FAFA]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center text-[#111111] mb-12">3ステップで施設が見つかる</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Search, step: '1', title: '条件を入力', desc: '地域・障害種別・希望のサービスを選んで検索するだけ。' },
              { icon: MapPin, step: '2', title: '施設を比較', desc: '空き状況・評判・特徴を一覧で比較できます。' },
              { icon: Heart, step: '3', title: '見学を申し込む', desc: '気になる施設に直接問い合わせ・見学申し込みが可能。' },
            ].map((item) => (
              <div key={item.step} className="bg-white rounded-2xl p-6 text-center shadow-sm border border-gray-100">
                <div className="w-12 h-12 bg-[#F5C842] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-[#111111] font-bold text-lg">{item.step}</span>
                </div>
                <div className="w-10 h-10 bg-[#F0FAFA] rounded-full flex items-center justify-center mx-auto mb-3">
                  <item.icon className="w-5 h-5 text-[#5BBDB3]" />
                </div>
                <h3 className="font-bold text-[#111111] mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Listing CTA */}
      <section id="listing" className="py-16 px-4 bg-white">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-[#111111] mb-4">施設掲載をご希望の方へ</h2>
          <p className="text-gray-500 mb-8 leading-relaxed">
            ひだまりマッチへの施設掲載は無料です。<br />
            多くのご家族に施設の魅力を届けませんか？
          </p>
          <a
            href="mailto:info@hidamari-match.example.com"
            className="inline-block bg-[#5BBDB3] text-white font-bold px-8 py-4 rounded-full hover:bg-[#4AAAA0] transition-colors"
          >
            無料で掲載する
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#5BBDB3] text-white/80 text-sm py-10 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-white font-bold text-lg mb-1">ひだまりマッチ</p>
            <p className="text-xs">放課後等デイサービス専門マッチングサービス</p>
          </div>
          <nav className="flex gap-6 text-xs">
            <Link href="/search" className="hover:text-white transition-colors">施設を探す</Link>
            <Link href="/#how-it-works" className="hover:text-white transition-colors">使い方</Link>
            <Link href="/#listing" className="hover:text-white transition-colors">施設掲載</Link>
          </nav>
          <p className="text-xs">© 2026 ひだまりマッチ. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
