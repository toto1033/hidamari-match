import Link from 'next/link';
import { Search, MapPin, Heart } from 'lucide-react';
import Header from '@/components/Header';
import FacilityCard from '@/components/FacilityCard';
import HeroSearch from '@/components/HeroSearch';
import { getFacilities } from '@/data/facilities';

const FEATURE_TAGS = [
  { label: '送迎あり', param: 'transport=true' },
  { label: '個別支援', param: 'support=個別支援' },
  { label: '学習支援', param: 'support=学習支援' },
  { label: '運動療育', param: 'support=運動療育' },
  { label: '音楽療育', param: 'support=音楽療育' },
  { label: 'SST', param: 'support=SST' },
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
          <p className="text-orange-500 font-semibold text-sm mb-3 tracking-wide">放課後等デイサービス専門マッチングサービス</p>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-5 leading-tight">
            お子さまにぴったりの<br />
            <span className="text-orange-500">放課後等デイサービス</span>を探そう
          </h1>
          <p className="text-gray-500 text-lg mb-10 leading-relaxed">
            全国の放課後等デイサービスを一覧で比較・検索。<br className="hidden sm:block" />
            障害特性・地域・特徴から、最適な施設が見つかります。
          </p>
          <HeroSearch />
        </div>
      </section>

      {/* Feature tags */}
      <section className="bg-gray-50 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-lg font-bold text-gray-900 mb-5 text-center">特徴タグで探す</h2>
          <div className="flex flex-wrap gap-3 justify-center">
            {FEATURE_TAGS.map((tag) => (
              <Link
                key={tag.label}
                href={`/search?${tag.param}`}
                className="px-5 py-2 rounded-full border-2 border-orange-200 text-orange-600 font-semibold text-sm hover:bg-orange-500 hover:text-white hover:border-orange-500 transition-colors"
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
            <h2 className="text-2xl font-bold text-gray-900">注目の施設</h2>
            <Link href="/search" className="text-sm text-orange-500 hover:underline font-medium">
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
      <section id="how-it-works" className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-12">3ステップで施設が見つかる</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Search, step: '1', title: '条件を入力', desc: '地域・障害種別・希望のサービスを選んで検索するだけ。' },
              { icon: MapPin, step: '2', title: '施設を比較', desc: '空き状況・評判・特徴を一覧で比較できます。' },
              { icon: Heart, step: '3', title: '見学を申し込む', desc: '気になる施設に直接問い合わせ・見学申し込みが可能。' },
            ].map((item) => (
              <div key={item.step} className="bg-white rounded-2xl p-6 text-center shadow-sm border border-gray-100">
                <div className="w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-7 h-7 text-orange-500" />
                </div>
                <div className="w-7 h-7 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold mx-auto mb-3">
                  {item.step}
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Listing CTA */}
      <section id="listing" className="py-16 px-4 bg-white">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">施設掲載をご希望の方へ</h2>
          <p className="text-gray-500 mb-8 leading-relaxed">
            ひだまりマッチへの施設掲載は無料です。<br />
            多くのご家族に施設の魅力を届けませんか？
          </p>
          <a
            href="mailto:info@hidamari-match.example.com"
            className="inline-block bg-orange-500 text-white font-bold px-8 py-4 rounded-full hover:bg-orange-600 transition-colors"
          >
            無料で掲載する
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 text-sm py-10 px-4">
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
