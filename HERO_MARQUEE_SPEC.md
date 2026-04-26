# ひだまりマッチ ヒーローセクション実装指示書（案C・マーキー型）
# 作成日：2026年4月26日
# 前バージョン：HERO_SPEC.md（グリッド型）→ 本ファイルで差し替え

---

## 概要

トップページ（`app/page.tsx`）のヒーローセクションを**マーキー型**で実装する。
写真帯が上下2列でそれぞれ逆方向にスクロールし、中央に白地でキャッチコピー＋検索窓を配置する。

DESIGN_SPEC_v2.md の基本方針・カラーパレット・フォント構成に従うこと。

---

## 実装対象ファイル

```
src/components/HeroSection.tsx   ← 新規作成（メインコンポーネント）
src/components/MarqueeBand.tsx   ← 新規作成（写真帯コンポーネント）
app/page.tsx                     ← HeroSectionを組み込む
```

---

## 全体レイアウト構成

```
┌─────────────────────────────────────────────┐
│  [写真帯・上段]  右から左へ流れる             │  height: 130px
├─────────────────────────────────────────────┤
│                                             │
│         キャッチコピー（中央揃え）           │
│         サブコピー                          │  白地・固定
│         [検索ボックス]                      │  padding: 32px 40px
│         [クイックタグ]                      │
│         初めての方へ →                      │
│                                             │
├─────────────────────────────────────────────┤
│  [写真帯・下段]  左から右へ流れる（逆方向）  │  height: 130px
└─────────────────────────────────────────────┘
```

---

## 写真帯（MarqueeBand）の実装

### アニメーション仕様

```css
/* 上帯：右から左へ */
@keyframes marquee-left {
  0%   { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

/* 下帯：左から右へ（逆方向） */
@keyframes marquee-right {
  0%   { transform: translateX(-50%); }
  100% { transform: translateX(0); }
}
```

- 上帯の速度：`28s linear infinite`
- 下帯の速度：`32s linear infinite`（上帯と微妙にずらす）
- シームレスループのため、写真リストを**2セット連続で並べる**

### 写真カードのサイズ・比率

```
アスペクト比：4:3（SUUMOに準拠）
カード幅：160px
カード高さ：120px（160 × 3/4）
border-radius：12px
gap：8px
```

### 写真カードのデータ構造

```typescript
type HeroPhoto = {
  facilityId: string;   // 施設UUID（/facilities/[id] へのリンク）
  facilityName: string; // 施設名（クレジット左下）
  area: string;         // エリア名（例：名古屋市中区）
  imageSrc: string;     // 画像パス（public/images/hero/ 配下）
  alt: string;          // alt テキスト
};
```

### 写真カード内のクレジット表示

```
カード下部グラデーションオーバーレイ：
  background: linear-gradient(transparent, rgba(0,0,0,0.55))
  padding: 18px 8px 6px

左下：施設名
  font-size: 8px
  color: rgba(255,255,255,0.92)
  font-weight: 500

右下：「詳細 →」リンク
  font-size: 7px
  background: rgba(255,255,255,0.2)
  border: 1px solid rgba(255,255,255,0.4)
  border-radius: 6px
  padding: 1px 5px
  href: /facilities/[facilityId]
  cursor: pointer
```

### 写真が未準備の場合のフォールバック

施設写真が用意できるまでの間は以下で代替表示：

```typescript
// imageSrcが空 or 画像読み込みエラー時
// next/imageのonErrorでフォールバック背景に切り替え
const fallbackColors = [
  '#5BBDB3', '#4A9B8E', '#7BBFBA',
  '#3d8880', '#6ab5b0', '#9DD4CF',
  '#2e6e6a', '#8ccfc9',
];
// facilityIdのハッシュ or インデックスで色を決定
```

### 初期データ（フェーズ1・ダミー）

```typescript
// src/data/heroPhotos.ts として作成
export const heroPhotosTop: HeroPhoto[] = [
  { facilityId: 'uuid-1', facilityName: 'ひだまり児童デイ 栄店', area: '名古屋市中区', imageSrc: '', alt: '工作・創作活動の様子' },
  { facilityId: 'uuid-2', facilityName: 'のびのびスポーツ教室', area: '名古屋市北区', imageSrc: '', alt: '運動療育の様子' },
  { facilityId: 'uuid-3', facilityName: '音楽の森 放課後教室', area: '名古屋市瑞穂区', imageSrc: '', alt: '音楽療育の様子' },
  { facilityId: 'uuid-4', facilityName: 'まなびの家 大曽根', area: '名古屋市北区', imageSrc: '', alt: '学習支援の様子' },
  { facilityId: 'uuid-5', facilityName: 'コードキッズ栄', area: '名古屋市中区', imageSrc: '', alt: 'IT・プログラミングの様子' },
  { facilityId: 'uuid-6', facilityName: 'なかよし放課後クラブ', area: '名古屋市守山区', imageSrc: '', alt: 'SST・集団活動の様子' },
  { facilityId: 'uuid-7', facilityName: 'みどり放課後教室', area: '名古屋市天白区', imageSrc: '', alt: '自然・農業療育の様子' },
  { facilityId: 'uuid-8', facilityName: 'たのしいステージ', area: '名古屋市昭和区', imageSrc: '', alt: '表現・演劇活動の様子' },
];

// 下帯は上帯の逆順（または別リスト）
export const heroPhotosBottom: HeroPhoto[] = [...heroPhotosTop].reverse();
```

---

## MarqueeBandコンポーネント

```typescript
// src/components/MarqueeBand.tsx
'use client';

type Props = {
  photos: HeroPhoto[];
  direction: 'left' | 'right';  // 'left'=上帯, 'right'=下帯
  speed?: number;                // アニメーション秒数（デフォルト28）
};

export default function MarqueeBand({ photos, direction, speed = 28 }: Props) {
  // photosを2セット複製してシームレスループ
  const doubled = [...photos, ...photos];

  return (
    <div style={{ overflow: 'hidden', height: '130px', width: '100%' }}>
      <div
        style={{
          display: 'flex',
          gap: '8px',
          width: 'max-content',
          padding: '5px 0',
          animation: `marquee-${direction} ${speed}s linear infinite`,
        }}
      >
        {doubled.map((photo, i) => (
          <PhotoCard key={i} photo={photo} index={i} />
        ))}
      </div>
    </div>
  );
}
```

---

## 中央パネル（キャッチコピー＋検索）

### レイアウト

```
background: #ffffff
border-top: 1px solid #E8E3DF
border-bottom: 1px solid #E8E3DF
padding: 32px 40px 28px
display: flex
flex-direction: column
align-items: center
text-align: center
gap: 14px
```

### ① eyebrow

```
テキスト：「AFTERSCHOOL DAY SERVICE」
font-family：Nunito
font-size：10px
font-weight：800
color：#5BBDB3
letter-spacing：0.24em
```

### ② h1

```
テキスト：
  お子さまに
  ぴったりの施設が
  きっと見つかる

font-family：Zen Maru Gothic（またはNoto Sans JP Bold）
font-size：32px（PC）/ 24px（スマホ）
font-weight：700
color：#2A2520
line-height：1.55

「ぴったりの施設」のみ：
  color：#5BBDB3
  直下にイエロー下線（height: 3px・background: #F5C842・opacity: 0.7・border-radius: 2px）
```

### ③ サブコピー

```
テキスト：「地域・障害特性・希望のサービスから放課後等デイサービスを無料で検索できます。」
font-size：13px
color：#7A6E65
line-height：1.8
```

### ④ 検索ボックス

```
外枠：
  border：2px solid #5BBDB3
  border-radius：16px
  overflow：hidden
  box-shadow：0 4px 24px rgba(91,189,179,0.13)
  width：100%
  max-width：600px

内部（左から）：
  都道府県セレクト（min-width: 110px・padding: 13px 10px 13px 18px）
  区切り線（width: 1px・height: 24px・background: #E8E3DF）
  キーワード入力（flex: 1・font-size: 13px・placeholder: 施設名・特徴・支援内容など）
  「検索する →」ボタン（background: #5BBDB3・color: #fff・padding: 13px 24px・font-weight: 700）

フォーム送信：/search?pref=XXX&keyword=YYY へ router.push
```

### ⑤ クイックタグ

```
display: flex・flex-wrap: wrap・gap: 7px・justify-content: center・max-width: 600px

通常タグ（background: #fff・border: 1px solid #5BBDB3・color: #5BBDB3・border-radius: 12px・padding: 4px 12px）：
  送迎あり / 個別支援 / 学習支援 / 運動療育 / 音楽療育 / SST

強調タグ（background: #FFFBEA・border: 1px solid #F5C842・color: #9A7800）：
  空きあり / 土日営業

タグクリック：/search?tag=XXX へ router.push
```

### ⑥ サブリンク

```
テキスト：「初めての方へ →」
font-size：11px
color：#5BBDB3
text-decoration：underline
cursor：pointer
href：/guide
```

---

## スマホ対応

写真帯はそのままスマホでも機能する（overflow: hiddenで自動対応）。
中央パネルのみ以下を調整：

```
padding：24px 20px 20px
h1 font-size：24px
検索ボックス max-width：100%
```

マーキーのカード幅・高さはPC・スマホ共通でよい（小さく見えるがむしろ自然）。

---

## HeroSectionコンポーネント全体骨格

```typescript
// src/components/HeroSection.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import MarqueeBand from './MarqueeBand';
import { heroPhotosTop, heroPhotosBottom } from '@/data/heroPhotos';

export default function HeroSection() {
  const router = useRouter();
  const [pref, setPref] = useState('');
  const [keyword, setKeyword] = useState('');

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (pref) params.set('pref', pref);
    if (keyword) params.set('keyword', keyword);
    router.push(`/search?${params.toString()}`);
  };

  const handleTagClick = (tag: string) => {
    router.push(`/search?tag=${encodeURIComponent(tag)}`);
  };

  return (
    <section>
      {/* 上帯：右から左 */}
      <MarqueeBand photos={heroPhotosTop} direction="left" speed={28} />

      {/* 中央：キャッチコピー＋検索 */}
      <div className="center-panel">
        {/* eyebrow・h1・subcopy・searchbox・tags・sublink */}
      </div>

      {/* 下帯：左から右 */}
      <MarqueeBand photos={heroPhotosBottom} direction="right" speed={32} />
    </section>
  );
}
```

---

## CSSアニメーションの定義場所

`app/globals.css` に以下を追加：

```css
@keyframes marquee-left {
  0%   { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

@keyframes marquee-right {
  0%   { transform: translateX(-50%); }
  100% { transform: translateX(0); }
}
```

Tailwindのインラインstyleでanimationを指定する場合は
`style={{ animation: 'marquee-left 28s linear infinite' }}` で渡す。

---

## 画像ファイルの格納場所

```
public/
  images/
    hero/
      top-1.jpg  ← 上帯1枚目（4:3・推奨サイズ 480×360px）
      top-2.jpg
      ...
      bottom-1.jpg ← 下帯1枚目
      bottom-2.jpg
      ...
```

実際の施設写真が揃ったら `heroPhotos.ts` の `imageSrc` に順次記入する。
写真がない間はフォールバック背景色で自動表示される。

---

## 実装の順番

```
1. app/globals.css にマーキーのキーフレームを追加
2. src/data/heroPhotos.ts を新規作成（ダミーデータで初期化）
3. src/components/MarqueeBand.tsx を新規作成
4. src/components/HeroSection.tsx を新規作成
5. app/page.tsx の既存ヒーロー部分を <HeroSection /> に差し替え
6. npm run dev で動作確認
   - 上帯が右→左へ流れているか
   - 下帯が左→右へ流れているか
   - 上下の速度が微妙にズレているか（28s vs 32s）
   - シームレスにループしているか（途切れなく流れるか）
   - スマホ幅（375px）でも崩れていないか
   - 中央パネルの検索ボックスが機能するか
7. npm run build でエラーがないか確認
8. git push → Vercel自動デプロイ
```

---

## 注意事項

- `'use client'` はHeroSection・MarqueeBandどちらにも付ける
- `next/image` の `Image` コンポーネントを使用。`fill` プロパティ＋親に `position: relative` を使う
- マーキーはCSSアニメーションのみで実装（JavaScriptのsetIntervalは不要）
- ホバー時にアニメーションを一時停止する場合：
  `.marquee-track:hover { animation-play-state: paused; }` をglobals.cssに追加
- 写真カードの `<a>` タグのクリックがマーキー全体のドラッグと競合しないよう注意
- シームレスループは「同じ配列を2セット並べ、translateXで-50%まで動かしてリセット」で実現
