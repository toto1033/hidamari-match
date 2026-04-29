# ひだまりマッチ コラムページ デザイン刷新指示書
# 作成日：2026年4月29日

---

## 概要

既存のコラムページ（`app/column/page.tsx`・`app/column/[slug]/page.tsx`）のデザインを刷新する。
ひだまりマッチ本体とは**デザインを明確に分けた**、読み物サイトとしての独自の世界観を作る。

---

## デザイン方針

| 項目 | ひだまりマッチ本体 | コラム |
|---|---|---|
| 背景色 | #ffffff | #FFFDF0（クリーム） |
| フォント（見出し） | Zen Maru Gothic | Shippori Mincho |
| フォント（本文） | Noto Sans JP | Noto Sans JP |
| 雰囲気 | 機能的・検索サービス | 読み物・note風 |
| ブランドカラー | ティール・イエロー | ティール・イエロー（アクセントのみ） |

**ブランドカラー（ティール・イエロー）は残す。** 同じサービスと認識させるため。

---

## フォントの追加

`app/layout.tsx` または `app/column/layout.tsx` に以下を追加：

```html
<link
  href="https://fonts.googleapis.com/css2?family=Shippori+Mincho:wght@400;600;700&family=Noto+Sans+JP:wght@400;500&display=swap"
  rel="stylesheet"
/>
```

Tailwindの `font-family` カスタム設定（`tailwind.config.ts`）：
```js
fontFamily: {
  mincho: ['Shippori Mincho', 'serif'],
  sans: ['Noto Sans JP', 'sans-serif'],
}
```

---

## コラム専用レイアウト

`app/column/layout.tsx` を新規作成し、コラム専用のヘッダー・背景を適用する。
（`app/layout.tsx` のメインヘッダーは使わない）

```
app/column/layout.tsx  ← 新規作成（コラム専用レイアウト）
app/column/page.tsx    ← 既存を改修（一覧ページ）
app/column/[slug]/page.tsx ← 既存を改修（記事詳細ページ）
```

---

## コラム専用ヘッダー

```
背景：#FFFDF0
border-bottom：1px solid #E8E0C8
height：56px
padding：0 32px

左側：
  ひだまりマッチのロゴ（既存コンポーネント流用）
  「 | 」区切り線（color: #C8BFA8）
  「コラム」テキスト（font-family: Shippori Mincho・font-size: 14px・color: #7A6E65）

右側：
  「施設を探す」テキストリンク（href: /search・Noto Sans JP・12px・#7A6E65）
  「施設を無料で探す →」ボタン
    background: transparent
    border: 1px solid #5BBDB3
    color: #5BBDB3
    border-radius: 18px
    padding: 5px 14px
    font-size: 11px
    href: /search
```

---

## カテゴリナビ（一覧ページのみ）

```
background: #FFFDF0
border-bottom: 1px solid #E8E0C8
padding: 0 32px
display: flex

カテゴリ項目（font-family: Noto Sans JP・font-size: 12px）：
  すべて / 制度・費用 / 施設の選び方 / 地域情報 / 療育・支援

アクティブ項目：
  color: #5BBDB3
  border-bottom: 2px solid #5BBDB3
```

---

## コラム一覧ページ（app/column/page.tsx）

### ページ全体

```
background: #FFFDF0
max-width: 780px
margin: 0 auto
padding: 40px 32px

スマホ（lg未満）：
  padding: 24px 16px
```

### ページタイトル

```
「コラム・お役立ち情報」
font-family: Shippori Mincho
font-size: 22px
font-weight: 700
color: #2A2520
margin-bottom: 8px

サブテキスト：「放課後等デイサービスに関する制度・費用・施設の選び方を解説します」
font-family: Noto Sans JP
font-size: 13px
color: #9A8F7A
margin-bottom: 32px
```

### 記事カード（縦積み・テキスト左・サムネ右）

```
display: flex
flex-direction: row
gap: 20px
align-items: flex-start
padding: 24px 0
border-bottom: 1px solid #E8E0C8
cursor: pointer

ホバー：opacity: 0.75（transition: opacity 0.15s）
```

**テキストエリア（左・flex: 1）：**

```
① カテゴリラベル
  font-family: Noto Sans JP
  font-size: 10px
  font-weight: 500
  letter-spacing: 0.08em
  color: #5BBDB3
  margin-bottom: 6px

② 記事タイトル
  font-family: Shippori Mincho
  font-size: 17px
  font-weight: 600
  color: #2A2520
  line-height: 1.55
  margin-bottom: 8px

③ 概要文（2行で切る）
  font-family: Noto Sans JP
  font-size: 12px
  color: #7A6E65
  line-height: 1.75
  display: -webkit-box
  -webkit-line-clamp: 2
  -webkit-box-orient: vertical
  overflow: hidden
  margin-bottom: 10px

④ メタ情報（横並び・gap: 10px）
  公開日：font-size: 11px・color: #B8AFA0・Noto Sans JP
  読了時間：font-size: 11px・color: #B8AFA0・Noto Sans JP
```

**サムネエリア（右・flex-shrink: 0）：**

```
width: 120px
height: 80px（4:3比率）
border-radius: 8px
overflow: hidden
background: #E8E0C8（画像がない場合のフォールバック）

スマホ（lg未満）：
  width: 80px
  height: 54px
```

### スマホでのカード表示

テキスト左・サムネ右の構成はスマホでもそのまま維持する。
サムネサイズのみ小さくする（width: 80px・height: 54px）。

---

## 記事詳細ページ（app/column/[slug]/page.tsx）

### ページ全体

```
background: #FFFDF0
max-width: 680px
margin: 0 auto
padding: 40px 32px

スマホ：padding: 24px 16px
```

### 記事ヘッダー

```
① カテゴリラベル（一覧と同スタイル）
  margin-bottom: 12px

② 記事タイトル
  font-family: Shippori Mincho
  font-size: 28px（PC）/ 22px（スマホ）
  font-weight: 700
  color: #2A2520
  line-height: 1.5
  margin-bottom: 16px

③ メタ情報（公開日・読了時間）
  font-size: 12px・color: #B8AFA0・Noto Sans JP
  margin-bottom: 24px

④ アイキャッチ画像
  width: 100%
  aspect-ratio: 16/9
  border-radius: 12px
  object-fit: cover
  background: #E8E0C8（フォールバック）
  margin-bottom: 32px
```

### 本文エリア

```
font-family: Noto Sans JP
font-size: 15px
color: #3A3530
line-height: 2.0
margin-bottom: 48px

見出し（h2）：
  font-family: Shippori Mincho
  font-size: 20px
  font-weight: 700
  color: #2A2520
  border-left: 4px solid #5BBDB3
  padding-left: 12px
  margin: 32px 0 16px

見出し（h3）：
  font-family: Shippori Mincho
  font-size: 17px
  font-weight: 600
  color: #2A2520
  margin: 24px 0 12px
```

### 記事末尾CTA（本文直下）

```
background: #EDF8F7
border: 1px solid #C8EDEA
border-radius: 12px
padding: 24px 28px
text-align: center
margin-bottom: 40px

① ラベル
  「HIDAMARI MATCH」
  font-size: 10px・font-weight: 500・color: #5BBDB3
  letter-spacing: 0.08em・Noto Sans JP
  margin-bottom: 8px

② タイトル
  「お子さまに合う施設を、無料で探せます」
  font-family: Shippori Mincho
  font-size: 16px・font-weight: 700・color: #2A2520
  margin-bottom: 6px

③ 説明文
  「地域・障害特性・希望のサービスから放課後等デイサービスを検索できます」
  font-size: 12px・color: #7A6E65・Noto Sans JP
  margin-bottom: 16px

④ ボタン
  「施設を探してみる →」
  background: #5BBDB3・color: #fff
  border-radius: 22px・padding: 10px 28px
  font-size: 13px・font-weight: 500・Noto Sans JP
  href: /search
```

### 関連記事（CTA直下）

```
タイトル：「あわせて読みたい」
  font-family: Shippori Mincho
  font-size: 14px・font-weight: 600・color: #2A2520
  border-bottom: 1px solid #E8E0C8
  padding-bottom: 8px・margin-bottom: 16px

記事カード：一覧ページと同じ「テキスト左・サムネ右」スタイルで2〜3件表示
  現在のslugと同じカテゴリの記事を優先して表示
  自分自身は除外する
```

---

## columns.ts のデータ構造（既存を更新）

```typescript
type Column = {
  slug: string;
  title: string;
  description: string;       // 一覧ページの概要文（2行程度）
  content: string;           // 記事本文（改行区切りのプレーンテキスト）
  publishedAt: string;       // YYYY-MM-DD
  category: string;          // 「制度・費用」「施設の選び方」「地域情報」「療育・支援」
  readingTime: string;       // 例：「約5分」
  thumbnailColor?: string;   // サムネフォールバック色（例：#EDF8F7）
};
```

---

## 実装の順番

```
1. tailwind.config.ts に Shippori Mincho を追加
2. app/column/layout.tsx を新規作成（コラム専用ヘッダー・背景色）
3. src/data/columns.ts を更新（readingTime・thumbnailColor フィールド追加）
4. app/column/page.tsx を改修（テキスト左・サムネ右の縦積みカード）
5. app/column/[slug]/page.tsx を改修（記事詳細・末尾CTA・関連記事）
6. npm run dev で動作確認
   - 背景がクリーム色（#FFFDF0）になっているか
   - 見出しがShippori Mincho で表示されているか
   - 記事カードがテキスト左・サムネ右になっているか
   - スマホ幅（375px）でも崩れていないか
   - 記事末尾CTAが表示されているか
   - 関連記事が表示されているか
7. npm run build でエラーがないか確認
8. git push → Vercel自動デプロイ
```

---

## 注意事項

- `app/column/layout.tsx` を作ることで、コラム配下のページにのみ専用ヘッダーが適用される
- メインの `app/layout.tsx` のヘッダーと重複しないよう、コラムlayoutでメインヘッダーを非表示にする
- Shippori Mincho は Google Fonts から読み込む（font-displayはswapを指定）
- サムネ画像がない場合は `thumbnailColor` のカラーで背景を表示する
- 本文の改行は `whitespace-pre-wrap` または段落分けで対応する
