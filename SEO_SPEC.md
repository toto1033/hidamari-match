# ひだまりマッチ SEO基盤 実装指示書
# 2026年4月23日

---

## 背景・実施理由

Googleはユーザーの現在地を検知して周辺の施設を検索結果に表示する
「ローカル検索」の仕組みを持っている。

保護者が「放課後等デイサービス」とスマホで検索したとき、
地名を入れなくても現在地周辺の施設が表示される可能性がある。

ひだまりマッチがこのローカル検索に表示されるためには、
Googleにサイトの存在・構造・各ページの内容を正しく伝える
SEO基盤が必要。以下の3つを実装する。

---

## 実装しないもの（理由付き）

以下は今のフェーズでは実装しない：

① URL設計の変更（/facilities/[prefecture]/[city]/[id]）
  → 理由：すでにVercelで公開済みのURLが変わると404になる
  　　　　Supabaseで実データを入れる直前（フェーズ2）に実施

③ 構造化データ（JSON-LD）
  → 理由：ダミーデータに仕込んでも効果がない
  　　　　実際の施設データが入ってから実施

---

## Step 1: robots.txt を設置

`public/robots.txt` を新規作成：

```
User-agent: *
Allow: /
Disallow: /api/
Disallow: /_next/

Sitemap: https://hidamari-match.vercel.app/sitemap.xml
```

---

## Step 2: sitemap.xml を自動生成

`app/sitemap.ts` を新規作成。
ページが増えても自動で更新される仕組みにする。

```typescript
import { MetadataRoute } from 'next'
import { getFacilities } from '@/data/facilities'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://hidamari-match.vercel.app'
  const facilities = await getFacilities()

  // 固定ページ
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/search`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/guide`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/for-facilities`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/news`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/company`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]

  // 施設詳細ページ（ダミーデータ分）
  const facilityPages: MetadataRoute.Sitemap = facilities.map((facility) => ({
    url: `${baseUrl}/facilities/${facility.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  return [...staticPages, ...facilityPages]
}
```

---

## Step 3: generateMetadata を全ページに追加

各ページに以下の形式でmetadataを追加する。

### トップページ（app/page.tsx）

```typescript
import { Metadata } from 'next'

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
}
```

### 検索ページ（app/search/page.tsx）

```typescript
export const metadata: Metadata = {
  title: '施設を探す | ひだまりマッチ',
  description: '放課後等デイサービスを地域・障害特性・支援内容で絞り込み検索。空き状況も確認できます。',
  openGraph: {
    title: '施設を探す | ひだまりマッチ',
    description: '放課後等デイサービスを地域・障害特性・支援内容で絞り込み検索。',
  },
}
```

### 施設詳細ページ（app/facilities/[id]/page.tsx）
※ 動的に生成する

```typescript
export async function generateMetadata(
  { params }: { params: { id: string } }
): Promise<Metadata> {
  const facility = await getFacilityById(params.id)

  if (!facility) {
    return { title: '施設が見つかりません | ひだまりマッチ' }
  }

  return {
    title: `${facility.name} | ひだまりマッチ`,
    description: `${facility.city}にある${facility.name}の詳細情報。${facility.catchcopy}。空き状況・見学申込はひだまりマッチから。`,
    openGraph: {
      title: `${facility.name} | ひだまりマッチ`,
      description: `${facility.city}にある${facility.name}の詳細情報。${facility.catchcopy}`,
    },
  }
}
```

### 初めての方へ（app/guide/page.tsx）

```typescript
export const metadata: Metadata = {
  title: '初めての方へ | ひだまりマッチ',
  description: '放課後等デイサービスの利用方法を解説。受給者証の取得から施設探し・見学・契約までの流れをわかりやすくご説明します。',
}
```

### 施設向けサービス紹介（app/for-facilities/page.tsx）

```typescript
export const metadata: Metadata = {
  title: '施設掲載のご案内 | ひだまりマッチ',
  description: '放課後等デイサービスの新規利用者獲得をサポート。完全成果報酬型で、問い合わせゼロなら費用ゼロ。無料掲載から始められます。',
}
```

### よくある質問（app/faq/page.tsx）

```typescript
export const metadata: Metadata = {
  title: 'よくある質問 | ひだまりマッチ',
  description: 'ひだまりマッチの使い方・放課後等デイサービスの費用・受給者証についてよくある質問をまとめました。',
}
```

### お問い合わせ（app/contact/page.tsx）

```typescript
export const metadata: Metadata = {
  title: 'お問い合わせ | ひだまりマッチ',
  description: 'ひだまりマッチへのお問い合わせはこちら。保護者の方・施設の方どちらもお気軽にご連絡ください。',
}
```

### 新着情報（app/news/page.tsx）

```typescript
export const metadata: Metadata = {
  title: '新着情報 | ひだまりマッチ',
  description: 'ひだまりマッチの新着情報・お知らせ一覧。',
}
```

### 運営会社（app/company/page.tsx）

```typescript
export const metadata: Metadata = {
  title: '運営会社 | ひだまりマッチ',
  description: 'ひだまりマッチの運営会社情報。',
}
```

### プライバシーポリシー（app/privacy/page.tsx）

```typescript
export const metadata: Metadata = {
  title: 'プライバシーポリシー | ひだまりマッチ',
  description: 'ひだまりマッチのプライバシーポリシー。',
}
```

### 利用規約（app/terms/page.tsx）

```typescript
export const metadata: Metadata = {
  title: '利用規約 | ひだまりマッチ',
  description: 'ひだまりマッチの利用規約。',
}
```

---

## Step 4: layout.tsx にデフォルトのメタデータを追加

`app/layout.tsx` に以下を追加：

```typescript
export const metadata: Metadata = {
  metadataBase: new URL('https://hidamari-match.vercel.app'),
  title: {
    default: 'ひだまりマッチ | 放課後等デイサービス検索',
    template: '%s | ひだまりマッチ',
  },
  description: '放課後等デイサービスの検索・比較サイト。お子さまにぴったりの施設が見つかります。',
}
```

---

## 実装の順番

```
Step 1: public/robots.txt を作成（5分）
Step 2: app/sitemap.ts を作成
Step 3: app/layout.tsx にデフォルトmetadata追加
Step 4: 各ページにgenerateMetadataを追加
        （トップ→検索→施設詳細→その他の順）

完了後：
npm run build でエラーがないか確認
git add . → git commit -m "SEO基盤を追加" → git push
```

---

## 今後（フェーズ2以降）に追加するもの

```
・URL設計の変更
  /facilities/[id] → /facilities/[prefecture]/[city]/[id]
  ※実データ投入の直前にリダイレクト設定も同時実施

・構造化データ（JSON-LD）
  /facilities/[id] に LocalBusinessスキーマを追加
  ※ダミーデータではなく実データが入ってから

・Googleサーチコンソールへの登録
  sitemap.xmlを登録してインデックス促進
```
