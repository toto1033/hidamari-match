'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

type PhotoSlide = {
  facilityId: string;
  facilityName: string;
  area: string;
  imageSrc: string;
  alt: string;
};

type PhotoCellData = {
  slides: [PhotoSlide, PhotoSlide];
};

const photoCells: { large: PhotoCellData; photoA: PhotoCellData; photoB: PhotoCellData; photoC: PhotoCellData } = {
  large: {
    slides: [
      { facilityId: 'uuid-1', facilityName: 'ひだまり児童デイ 栄店', area: '名古屋市中区', imageSrc: '/images/hero-large-1.jpg', alt: '工作・創作活動の様子' },
      { facilityId: 'uuid-2', facilityName: 'そらいろ放課後ルーム', area: '名古屋市千種区', imageSrc: '/images/hero-large-2.jpg', alt: '季節の制作活動の様子' },
    ],
  },
  photoA: {
    slides: [
      { facilityId: 'uuid-3', facilityName: 'のびのびスポーツ教室', area: '名古屋市北区', imageSrc: '/images/hero-a-1.jpg', alt: '運動療育の様子' },
      { facilityId: 'uuid-4', facilityName: 'みらい運動クラブ', area: '名古屋市守山区', imageSrc: '/images/hero-a-2.jpg', alt: '体育・スポーツ活動の様子' },
    ],
  },
  photoB: {
    slides: [
      { facilityId: 'uuid-5', facilityName: '音楽の森 放課後教室', area: '名古屋市瑞穂区', imageSrc: '/images/hero-b-1.jpg', alt: '音楽療育の様子' },
      { facilityId: 'uuid-6', facilityName: 'リズムキッズ名古屋', area: '名古屋市昭和区', imageSrc: '/images/hero-b-2.jpg', alt: 'リズム・演奏活動の様子' },
    ],
  },
  photoC: {
    slides: [
      { facilityId: 'uuid-7', facilityName: 'まなびの家 大曽根', area: '名古屋市北区', imageSrc: '/images/hero-c-1.jpg', alt: '学習支援の様子' },
      { facilityId: 'uuid-8', facilityName: 'コードキッズ栄', area: '名古屋市中区', imageSrc: '/images/hero-c-2.jpg', alt: 'IT・プログラミングの様子' },
    ],
  },
};

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

function useFadeSlide(intervalMs: number) {
  const [activeIndex, setActiveIndex] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev === 0 ? 1 : 0));
    }, intervalMs);
    return () => clearInterval(timer);
  }, [intervalMs]);
  return activeIndex;
}

function SlideImage({ slide }: { slide: PhotoSlide }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{ background: '#5BBDB3' }}
      >
        <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '12px' }}>写真準備中</span>
      </div>
    );
  }

  return (
    <>
      <div className="absolute inset-0" style={{ background: '#5BBDB3' }} />
      <Image
        src={slide.imageSrc}
        alt={slide.alt}
        fill
        style={{ objectFit: 'cover' }}
        onError={() => setFailed(true)}
      />
    </>
  );
}

const overlayStyle: React.CSSProperties = {
  background: 'linear-gradient(transparent, rgba(0,0,0,0.52))',
  padding: '28px 12px 10px',
};

const detailLinkStyle: React.CSSProperties = {
  fontSize: '9px',
  color: '#fff',
  background: 'rgba(255,255,255,0.18)',
  border: '1px solid rgba(255,255,255,0.38)',
  borderRadius: '8px',
  padding: '2px 8px',
  textDecoration: 'none',
  whiteSpace: 'nowrap',
  flexShrink: 0,
};

function SlideOverlay({ slide }: { slide: PhotoSlide }) {
  return (
    <div
      className="absolute bottom-0 left-0 right-0 flex items-end justify-between"
      style={{ ...overlayStyle, position: 'absolute', zIndex: 2 }}
    >
      <div>
        <p style={{ fontSize: '10px', color: '#fff', fontWeight: 500, margin: 0, lineHeight: 1.4 }}>
          {slide.facilityName}
        </p>
        <p style={{ fontSize: '9px', color: 'rgba(255,255,255,0.7)', margin: 0 }}>
          {slide.area}
        </p>
      </div>
      <Link href={`/facilities/${slide.facilityId}`} style={detailLinkStyle}>
        詳細を見る →
      </Link>
    </div>
  );
}

function PhotoCell({
  slides,
  activeIndex,
}: {
  slides: [PhotoSlide, PhotoSlide];
  activeIndex: number;
}) {
  return (
    <div className="relative overflow-hidden w-full h-full">
      {slides.map((slide, i) => (
        <div
          key={slide.imageSrc}
          className="absolute inset-0"
          style={{
            opacity: i === activeIndex ? 1 : 0,
            transition: 'opacity 1.3s ease',
            zIndex: i === activeIndex ? 1 : 0,
          }}
        >
          <SlideImage slide={slide} />
          <SlideOverlay slide={slide} />
        </div>
      ))}
    </div>
  );
}

function TextPanel() {
  return (
    <div
      className="flex flex-col justify-center"
      style={{
        background: '#ffffff',
        padding: '28px 36px',
        gap: '12px',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <p
        className="font-nunito"
        style={{ fontSize: '9px', fontWeight: 800, color: '#5BBDB3', letterSpacing: '0.24em', margin: 0 }}
      >
        AFTERSCHOOL DAY SERVICE
      </p>
      <h1
        className="font-[family-name:var(--font-round)] text-[22px] lg:text-[26px]"
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
            }}
          />
        </span>
        <br />
        きっと見つかる
      </h1>
      <p style={{ fontSize: '12px', color: '#7A6E65', lineHeight: 1.8, margin: 0 }}>
        地域・障害特性・希望のサービスから放課後等デイサービスを無料で検索できます。
      </p>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
        <Link
          href="/search"
          style={{
            background: '#F5C842',
            color: '#2A2520',
            borderRadius: '22px',
            padding: '10px 24px',
            fontSize: '13px',
            fontWeight: 700,
            textDecoration: 'none',
            display: 'inline-block',
          }}
        >
          今すぐ探す →
        </Link>
        <Link
          href="/guide"
          style={{ fontSize: '11px', color: '#5BBDB3', textDecoration: 'underline' }}
        >
          初めての方へ
        </Link>
      </div>
    </div>
  );
}

function MobileSlider({ cells }: { cells: PhotoCellData[] }) {
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % cells.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [cells.length]);

  const slides = cells.map((c) => c.slides[0]);

  return (
    <div className="relative overflow-hidden" style={{ height: '240px' }}>
      {slides.map((slide, i) => (
        <div
          key={slide.imageSrc}
          className="absolute inset-0"
          style={{
            opacity: i === activeIdx ? 1 : 0,
            transition: 'opacity 1.3s ease',
            zIndex: i === activeIdx ? 1 : 0,
          }}
        >
          <SlideImage slide={slide} />
          <SlideOverlay slide={slide} />
        </div>
      ))}
      <div
        className="absolute flex gap-1.5"
        style={{ bottom: '12px', left: '50%', transform: 'translateX(-50%)', zIndex: 3 }}
      >
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveIdx(i)}
            aria-label={`スライド ${i + 1}`}
            style={{
              width: i === activeIdx ? '16px' : '6px',
              height: '6px',
              borderRadius: '3px',
              background: i === activeIdx ? '#fff' : 'rgba(255,255,255,0.5)',
              border: 'none',
              padding: 0,
              transition: 'width 0.3s ease',
              cursor: 'pointer',
            }}
          />
        ))}
      </div>
    </div>
  );
}

function SearchArea() {
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
    <div
      style={{
        background: '#ffffff',
        borderTop: '2px solid #5BBDB3',
        padding: '20px 32px 24px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '14px',
      }}
    >
      <div
        style={{
          border: '2px solid #5BBDB3',
          borderRadius: '16px',
          overflow: 'hidden',
          boxShadow: '0 4px 24px rgba(91,189,179,0.13)',
          width: '100%',
          maxWidth: '680px',
          display: 'flex',
        }}
      >
        <select
          value={pref}
          onChange={(e) => setPref(e.target.value)}
          style={{
            minWidth: '110px',
            padding: '14px 12px 14px 18px',
            background: '#fff',
            border: 'none',
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
          placeholder="施設名・支援内容など"
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          style={{
            flex: 1,
            padding: '14px 12px',
            background: '#fff',
            border: 'none',
            outline: 'none',
            fontSize: '13px',
            color: '#2A2520',
            minWidth: 0,
          }}
        />
        <button
          onClick={handleSearch}
          style={{
            background: '#5BBDB3',
            color: '#fff',
            padding: '14px 28px',
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

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '7px', justifyContent: 'center' }}>
        {QUICK_TAGS.map((tag) => (
          <button
            key={tag.label}
            onClick={() => router.push(`/search?${tag.param}`)}
            style={{
              padding: '4px 12px',
              borderRadius: '20px',
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
    </div>
  );
}

export default function HeroSection() {
  const largeIdx  = useFadeSlide(4500);
  const photoAIdx = useFadeSlide(5800);
  const photoBIdx = useFadeSlide(3900);
  const photoCIdx = useFadeSlide(6300);

  return (
    <section>
      {/* PC版グリッド */}
      <div
        className="hidden lg:grid"
        style={{ gridTemplateColumns: '2fr 1fr', gridTemplateRows: '240px 220px', gap: '4px' }}
      >
        {/* 写真・大（col1, row1） */}
        <PhotoCell slides={photoCells.large.slides} activeIndex={largeIdx} />

        {/* 右上：2×2グリッド（col2, row1） */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr', gap: '4px' }}>
          <PhotoCell slides={photoCells.photoA.slides} activeIndex={photoAIdx} />
          <div style={{ background: '#ffffff' }} />
          <div style={{ background: '#ffffff' }} />
          <PhotoCell slides={photoCells.photoB.slides} activeIndex={photoBIdx} />
        </div>

        {/* テキストパネル（col1, row2） */}
        <TextPanel />

        {/* 写真C（col2, row2） */}
        <PhotoCell slides={photoCells.photoC.slides} activeIndex={photoCIdx} />
      </div>

      {/* スマホ版（テキスト→検索→スライドの順） */}
      <div className="lg:hidden">
        <TextPanel />
        <SearchArea />
        <MobileSlider cells={[photoCells.large, photoCells.photoA, photoCells.photoB, photoCells.photoC]} />
      </div>

      {/* 検索エリア（PC専用） */}
      <div className="hidden lg:block">
        <SearchArea />
      </div>
    </section>
  );
}
