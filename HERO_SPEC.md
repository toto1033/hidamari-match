# ひだまりマッチ ヒーローセクション実装指示書
# 作成日：2026年4月25日

---

## 概要

トップページ（`/`）のヒーローセクションを刷新する。
DESIGN_SPEC_v2.md の基本方針・カラーパレット・フォント構成に従うこと。

---

## 実装対象ファイル

```
src/components/HeroSection.tsx   ← 新規作成（メインコンポーネント）
app/page.tsx                     ← HeroSectionを組み込む
```

---

## PC版レイアウト

### グリッド全体構成

```
┌────────────────────┬─────────────────────┐
│                    │  [写真A] │  [余白]  │  ← row1（240px）
│   [写真・大]        ├──────────┼──────────┤
│                    │  [余白]  │  [写真B] │
├────────────────────┼─────────────────────┤
│   [テキストパネル]  │  [写真C・全面]      │  ← row2（220px）
└────────────────────┴─────────────────────┘
└──────── [検索エリア・全幅] ─────────────────┘
```

### CSSグリッド仕様

```css
/* メインヒーローグリッド */
display: grid;
grid-template-columns: 2fr 1fr;
grid-template-rows: 240px 220px;
gap: 4px;

/* 右列・上段（2×2内部グリッド） */
display: grid;
grid-template-columns: 1fr 1fr;
grid-template-rows: 1fr 1fr;
gap: 4px;
```

### 各セルの配置

| セル | grid-column | grid-row | 内容 |
|---|---|---|---|
| 写真・大 | 1 | 1 | 写真（フェード切り替え） |
| 右上2×2 | 2 | 1 | 内部グリッド（下記参照） |
| テキストパネル | 1 | 2 | 白地・キャッチコピー＋CTA |
| 写真C | 2 | 2 | 写真（フェード切り替え・全面） |

**右上2×2内部グリッド（対角線配置）：**

| セル位置 | 内容 |
|---|---|
| 左上（col1・row1） | 写真A（フェード切り替え） |
| 右上（col2・row1） | 余白（`#ffffff`） |
| 左下（col1・row2） | 余白（`#ffffff`） |
| 右下（col2・row2） | 写真B（フェード切り替え） |

---

## スマホ版レイアウト

**方針：ファーストビューにキャッチコピー＋検索窓を必ず表示する（離脱率対策）**

```
┌────────────────┐  ← ファーストビューで必ず見える
│  テキスト白地   │
│  キャッチコピー │
│  検索窓        │
└────────────────┘
┌────────────────┐  ← スクロールで見える
│  写真スライド   │  高さ：240px
│  （全幅）       │
└────────────────┘
```

### ブレークポイント

```
lg(1024px)以上 → PCグリッドレイアウト
lg未満         → スマホレイアウト（テキスト上・写真スライド下）
```

---

## 写真セルの実装

### フェード切り替えの仕様

- 各写真セルは独立した `useEffect` + `setInterval` でタイマー管理
- 切り替えはCSSの `opacity` トランジション（`transition: opacity 1.3s ease`）
- 各セルのタイマー間隔はバラバラにすること（下記参照）

```typescript
// タイマー間隔（ミリ秒）
写真・大  : 4500ms
写真A    : 5800ms
写真B    : 3900ms
写真C    : 6300ms
スマホスライド: 4000ms（順番に切り替え）
```

### 写真セルのデータ構造

```typescript
type PhotoSlide = {
  facilityId: string;   // 施設ID（/facilities/[id] へのリンク用）
  facilityName: string; // 施設名（クレジット表示用）
  area: string;         // エリア名（例：名古屋市中区）
  imageSrc: string;     // 画像パス（public/images/ 配下）
  alt: string;          // alt テキスト
};

// 各写真セルに2枚ずつ登録（フェードで交互切り替え）
type PhotoCell = {
  slides: [PhotoSlide, PhotoSlide];
};
```

### クレジット表示（各写真セルの左下）

```
施設名（font-size: 10px・白・font-weight: 500）
エリア名（font-size: 9px・白・opacity: 0.7）
```

### 詳細リンク（各写真セルの右下）

```
「詳細を見る →」
- font-size: 9px
- 白文字
- background: rgba(255,255,255,0.18)
- border: 1px solid rgba(255,255,255,0.38)
- border-radius: 8px
- padding: 2px 8px
- href: /facilities/[facilityId]
```

### グラデーションオーバーレイ

```css
/* 各写真セルの下部にかぶせる */
position: absolute;
bottom: 0; left: 0; right: 0;
background: linear-gradient(transparent, rgba(0,0,0,0.52));
padding: 28px 12px 10px;
```

---

## テキストパネル（左下・白地）

```
背景：#ffffff
padding：28px 36px
display: flex; flex-direction: column; gap: 12px;
justify-content: center;
```

### 内部コンテンツ（上から順）

**① eyebrow**
```
テキスト：「AFTERSCHOOL DAY SERVICE」
font-family：Nunito
font-size：9px
font-weight：800
color：#5BBDB3
letter-spacing：0.24em
```

**② h1**
```
テキスト：
  お子さまに
  ぴったりの施設が
  きっと見つかる

font-family：Zen Maru Gothic
font-size：26px（PC）/ 22px（スマホ）
font-weight：700
color：#2A2520
line-height：1.55

「ぴったりの施設」のみ：
  color：#5BBDB3
  下にイエロー下線（height: 3px・background: #F5C842・opacity: 0.7）
```

**③ サブコピー**
```
テキスト：「地域・障害特性・希望のサービスから放課後等デイサービスを無料で検索できます。」
font-family：Noto Sans JP
font-size：12px
color：#7A6E65
line-height：1.8
```

**④ CTAボタン行**
```
「今すぐ探す →」ボタン
  background：#F5C842
  color：#2A2520
  border-radius：22px
  padding：10px 24px
  font-size：13px
  font-weight：700
  href：/search

「初めての方へ」テキストリンク
  font-size：11px
  color：#5BBDB3
  text-decoration：underline
  href：/guide
```

---

## 検索エリア（ヒーロー直下・全幅）

```
background：#ffffff
border-top：2px solid #5BBDB3
padding：20px 32px 24px
display: flex; flex-direction: column; align-items: center; gap: 14px;
```

### 検索ボックス

```
外枠：
  border：2px solid #5BBDB3
  border-radius：16px
  overflow：hidden
  box-shadow：0 4px 24px rgba(91,189,179,0.13)
  width：100%

内部（左から）：
  都道府県セレクト（min-width: 110px・padding: 14px 12px 14px 18px）
  区切り線（width: 1px・height: 24px・background: #E8E3DF）
  キーワード入力（flex: 1・font-size: 13px）
  「検索する →」ボタン（background: #5BBDB3・color: #fff・padding: 14px 28px）

フォーム送信時：/search?pref=XXX&keyword=YYY へ遷移
```

### クイックタグ

```
表示：横並び・flex-wrap: wrap・gap: 7px

通常タグ（background: #fff・border: 1px solid #5BBDB3・color: #5BBDB3）：
  送迎あり / 個別支援 / 学習支援 / 運動療育 / 音楽療育 / SST

強調タグ（background: #FFFBEA・border: 1px solid #F5C842・color: #9A7800）：
  空きあり / 土日営業

タグクリック時：/search?support=XXX へ遷移
```

---

## コンポーネント実装例（骨格）

```typescript
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// 写真データ（フェーズ1はダミー・後から差し替え）
const photoCells = {
  large: {
    slides: [
      { facilityId: 'uuid-1', facilityName: 'ひだまり児童デイ 栄店', area: '名古屋市中区', imageSrc: '/images/hero-large-1.jpg', alt: '工作・創作活動の様子' },
      { facilityId: 'uuid-2', facilityName: 'そらいろ放課後ルーム', area: '名古屋市千種区', imageSrc: '/images/hero-large-2.jpg', alt: '季節の制作活動の様子' },
    ]
  },
  photoA: {
    slides: [
      { facilityId: 'uuid-3', facilityName: 'のびのびスポーツ教室', area: '名古屋市北区', imageSrc: '/images/hero-a-1.jpg', alt: '運動療育の様子' },
      { facilityId: 'uuid-4', facilityName: 'みらい運動クラブ', area: '名古屋市守山区', imageSrc: '/images/hero-a-2.jpg', alt: '体育・スポーツ活動の様子' },
    ]
  },
  photoB: {
    slides: [
      { facilityId: 'uuid-5', facilityName: '音楽の森 放課後教室', area: '名古屋市瑞穂区', imageSrc: '/images/hero-b-1.jpg', alt: '音楽療育の様子' },
      { facilityId: 'uuid-6', facilityName: 'リズムキッズ名古屋', area: '名古屋市昭和区', imageSrc: '/images/hero-b-2.jpg', alt: 'リズム・演奏活動の様子' },
    ]
  },
  photoC: {
    slides: [
      { facilityId: 'uuid-7', facilityName: 'まなびの家 大曽根', area: '名古屋市北区', imageSrc: '/images/hero-c-1.jpg', alt: '学習支援の様子' },
      { facilityId: 'uuid-8', facilityName: 'コードキッズ栄', area: '名古屋市中区', imageSrc: '/images/hero-c-2.jpg', alt: 'IT・プログラミングの様子' },
    ]
  },
};

// フェードフック（各セルが独立して切り替わる）
function useFadeSlide(intervalMs: number) {
  const [activeIndex, setActiveIndex] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex(prev => (prev === 0 ? 1 : 0));
    }, intervalMs);
    return () => clearInterval(timer);
  }, [intervalMs]);
  return activeIndex;
}

export default function HeroSection() {
  const router = useRouter();
  const [pref, setPref] = useState('');
  const [keyword, setKeyword] = useState('');

  // 各セル独立タイマー
  const largeIdx  = useFadeSlide(4500);
  const photoAIdx = useFadeSlide(5800);
  const photoBIdx = useFadeSlide(3900);
  const photoCIdx = useFadeSlide(6300);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (pref) params.set('pref', pref);
    if (keyword) params.set('keyword', keyword);
    router.push(`/search?${params.toString()}`);
  };

  return (
    <section>
      {/* PC版グリッド */}
      <div className="hidden lg:grid" style={{ gridTemplateColumns: '2fr 1fr', gridTemplateRows: '240px 220px', gap: '4px' }}>

        {/* 写真・大（左上） */}
        <PhotoCell slides={photoCells.large.slides} activeIndex={largeIdx} size="large" />

        {/* 右上：2×2グリッド */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr', gap: '4px' }}>
          <PhotoCell slides={photoCells.photoA.slides} activeIndex={photoAIdx} size="small" />
          <div style={{ background: '#ffffff' }} />  {/* 余白 */}
          <div style={{ background: '#ffffff' }} />  {/* 余白 */}
          <PhotoCell slides={photoCells.photoB.slides} activeIndex={photoBIdx} size="small" />
        </div>

        {/* テキストパネル（左下） */}
        <TextPanel />

        {/* 写真C（右下・全面） */}
        <PhotoCell slides={photoCells.photoC.slides} activeIndex={photoCIdx} size="medium" />

      </div>

      {/* スマホ版 */}
      <div className="lg:hidden">
        <TextPanel />
        <MobileSlider cells={[photoCells.large, photoCells.photoA, photoCells.photoB, photoCells.photoC]} />
      </div>

      {/* 検索エリア（PC・スマホ共通） */}
      <SearchArea pref={pref} setPref={setPref} keyword={keyword} setKeyword={setKeyword} onSearch={handleSearch} />
    </section>
  );
}
```

---

## 画像ファイルの準備（フェーズ1）

写真が用意できるまでの間は `hasPhoto=false` の施設と同じく、**ティール系の背景色でプレースホルダー表示**する。

```
画像が存在しない場合のフォールバック：
  background: #5BBDB3（または#4A9B8E・#7BBFBA）
  中央にテキスト「写真準備中」
  color: rgba(255,255,255,0.7)・font-size: 12px
```

実際の写真は `public/images/` に格納し、同じファイル名で上書きすれば自動反映される。

---

## 実装の順番

```
1. src/components/HeroSection.tsx を新規作成
2. PhotoCell・TextPanel・MobileSlider・SearchArea を同ファイル内にサブコンポーネントとして実装
3. app/page.tsx の既存ヒーロー部分を HeroSection に差し替え
4. npm run dev で動作確認
   - PC幅（1280px）でグリッドが正しく表示されるか
   - スマホ幅（375px）でテキスト→検索窓→スライドの順になっているか
   - 各写真セルがバラバラのタイミングでフェードするか
5. npm run build でエラーがないか確認
6. git push → Vercel自動デプロイ
```

---

## 注意事項

- `'use client'` を忘れずに（useEffect・useStateを使うため）
- 画像は `next/image` の `Image` コンポーネントを使用すること
- 写真セルは `position: relative; overflow: hidden` にすること
- フェードのために2枚の画像を重ねて `opacity` で切り替える（`position: absolute; inset: 0`）
- タグクリック時の `/search` 遷移は `router.push` で実装
- スマホのスライドは `setInterval` で順番に切り替え（左右スワイプはフェーズ2）
