'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import MarqueeBand from './MarqueeBand';
import { heroPhotosTop, heroPhotosBottom } from '@/data/heroPhotos';

const PREFECTURES = [
  '北海道', '青森県', '岩手県', '宮城県', '秋田県', '山形県', '福島県',
  '茨城県', '栃木県', '群馬県', '埼玉県', '千葉県', '東京都', '神奈川県',
  '新潟県', '富山県', '石川県', '福井県', '山梨県', '長野県', '岐阜県',
  '静岡県', '愛知県', '三重県', '滋賀県', '京都府', '大阪府', '兵庫県',
  '奈良県', '和歌山県', '鳥取県', '島根県', '岡山県', '広島県', '山口県',
  '徳島県', '香川県', '愛媛県', '高知県', '福岡県', '佐賀県', '長崎県',
  '熊本県', '大分県', '宮崎県', '鹿児島県', '沖縄県',
];

const QUICK_TAGS = [
  { label: '送迎あり', param: 'transport=true', highlight: false },
  { label: '個別支援', param: 'support=個別支援', highlight: false },
  { label: '学習支援', param: 'support=学習支援', highlight: false },
  { label: '運動療育', param: 'support=運動療育', highlight: false },
  { label: '音楽療育', param: 'support=音楽療育', highlight: false },
  { label: 'SST', param: 'support=SST', highlight: false },
  { label: '空きあり', param: 'vacancy=true', highlight: true },
  { label: '土日営業', param: 'weekend=true', highlight: true },
];

export default function HeroSection() {
  const router = useRouter();
  const [pref, setPref] = useState('');
  const [keyword, setKeyword] = useState('');

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (pref) params.set('pref', pref);
    if (keyword) params.set('keyword', keyword);
    router.push(`/search${params.toString() ? `?${params}` : ''}`);
  };

  return (
    <section>
      {/* 上帯：右から左 */}
      <MarqueeBand photos={heroPhotosTop} direction="left" speed={28} />

      {/* 中央：キャッチコピー＋検索 */}
      <div
        className="px-5 py-6 md:px-10 md:py-8"
        style={{
          background: '#ffffff',
          borderTop: '1px solid #E8E3DF',
          borderBottom: '1px solid #E8E3DF',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: '14px',
        }}
      >
        {/* eyebrow */}
        <p
          className="font-nunito"
          style={{ fontSize: '10px', fontWeight: 800, color: '#5BBDB3', letterSpacing: '0.24em', margin: 0 }}
        >
          AFTERSCHOOL DAY SERVICE
        </p>

        {/* h1 */}
        <h1
          className="font-[family-name:var(--font-round)] text-[24px] md:text-[32px]"
          style={{ fontWeight: 700, color: '#2A2520', lineHeight: 1.55, margin: 0 }}
        >
          お子さまに
          <br />
          <span className="relative inline-block">
            <span style={{ color: '#5BBDB3' }}>ぴったりの施設が</span>
            <span
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                bottom: '-3px',
                height: '3px',
                background: '#F5C842',
                opacity: 0.7,
                borderRadius: '2px',
              }}
            />
          </span>
          <br />
          きっと見つかる
        </h1>

        {/* サブコピー */}
        <p style={{ fontSize: '13px', color: '#7A6E65', lineHeight: 1.8, margin: 0 }}>
          地域・障害特性・希望のサービスから放課後等デイサービスを無料で検索できます。
        </p>

        {/* 検索ボックス */}
        <div
          className="flex flex-col lg:flex-row w-full lg:max-w-[600px]"
          style={{
            border: '2px solid #5BBDB3',
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: '0 4px 24px rgba(91,189,179,0.13)',
          }}
        >
          <select
            value={pref}
            onChange={(e) => setPref(e.target.value)}
            className="border-0 border-b border-[#E8E3DF] lg:border-b-0 w-full lg:w-auto"
            style={{
              minWidth: '110px',
              padding: '13px 10px 13px 18px',
              background: '#fff',
              outline: 'none',
              fontSize: '13px',
              color: '#2A2520',
              flexShrink: 0,
            }}
          >
            <option value="">都道府県</option>
            {PREFECTURES.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
          <div
            className="hidden lg:block"
            style={{
              width: '1px',
              height: '24px',
              background: '#E8E3DF',
              alignSelf: 'center',
              flexShrink: 0,
            }}
          />
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="施設名・特徴・支援内容など"
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            className="border-0 border-b border-[#E8E3DF] lg:border-b-0 w-full lg:grow"
            style={{
              padding: '13px 12px',
              background: '#fff',
              outline: 'none',
              fontSize: '13px',
              color: '#2A2520',
              minWidth: 0,
            }}
          />
          <button
            onClick={handleSearch}
            className="w-full lg:w-auto"
            style={{
              background: '#5BBDB3',
              color: '#fff',
              padding: '13px 24px',
              border: 'none',
              cursor: 'pointer',
              fontSize: '13px',
              fontWeight: 700,
              whiteSpace: 'nowrap',
              flexShrink: 0,
            }}
          >
            検索する →
          </button>
        </div>

        {/* クイックタグ */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '7px',
            justifyContent: 'center',
            maxWidth: '600px',
          }}
        >
          {QUICK_TAGS.map((tag) => (
            <button
              key={tag.label}
              onClick={() => router.push(`/search?${tag.param}`)}
              style={{
                padding: '4px 12px',
                borderRadius: '12px',
                fontSize: '11px',
                cursor: 'pointer',
                border: tag.highlight ? '1px solid #F5C842' : '1px solid #5BBDB3',
                background: tag.highlight ? '#FFFBEA' : '#fff',
                color: tag.highlight ? '#9A7800' : '#5BBDB3',
              }}
            >
              {tag.label}
            </button>
          ))}
        </div>

        {/* サブリンク */}
        <a
          href="/guide"
          style={{ fontSize: '11px', color: '#5BBDB3', textDecoration: 'underline', cursor: 'pointer' }}
        >
          初めての方へ →
        </a>
      </div>

      {/* 下帯：左から右 */}
      <MarqueeBand photos={heroPhotosBottom} direction="right" speed={32} />
    </section>
  );
}
