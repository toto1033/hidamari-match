# ひだまりマッチ v2 Claude Code実装指示書
# デザイン刷新・UI設計 最終版（2026年4月22日確定）

---

## 基本方針

- Next.js + Tailwind CSS（現状のまま）
- Supabaseはまだ使わない（フェーズ2以降）
- データは `src/data/facilities.ts` のダミーデータ20件で管理
- 後でSupabaseに移行できるよう、データ取得は必ず関数経由にする
- モバイルファースト（スマホ基準で設計、PCは拡張）
- グラデーション禁止・フラットデザイン徹底
- font-size 16px以上・line-height 1.75以上（WCAG基準）

---

## 確定カラーパレット

```
メイン      #5BBDB3  ティール（ティファニーブルー系）
アクセント  #F5C842  イエロー
背景        #FAFAF9  オフホワイト
テキスト    #2A2520  温かみのある暗褐色（純黒ではない）
テキスト薄  #7A6E65  ミュートテキスト
テキスト極薄 #A89F98  ライトテキスト
ボーダー    #E8E3DF  ベージュ系ボーダー
薄背景      #EDF8F7  薄ティール（カード背景・セクション）
薄背景2     #C8EDEA  ティールミッド（タグボーダー）
薄アクセント #FFFBEA  薄イエロー（強調タグ背景）
```

### 色の使い分けルール

- ヘッダー背景 → 白（#FFFFFF）
- ヘッダー下部 → 2pxティールライン
- CTAボタン（今すぐ探す・無料で探す） → イエロー背景＋#2A2520文字
- 検索ボタン → ティール背景＋白文字
- 通常タグ → 白背景＋ティールボーダー＋ティール文字
- 強調タグ（空きあり・土日営業） → 薄イエロー背景＋イエローボーダー＋#9A7800文字
- 統計数値バー → ティール背景
- 3ステップセクション → 薄イエロー背景（#FFFBEA）
- フッター → #2A2520（テキストカラー）

---

## 確定フォント構成

```
見出し・ロゴ：Zen Maru Gothic（丸ゴシック・遊び心・あたたかみ）
本文・UI全般：Noto Sans JP（可読性・信頼感）
数字・英字ラベル：Nunito（Airbnb系・洗練感）
```

### Next.jsでの読み込み方法

```typescript
// app/layout.tsx
import { Zen_Maru_Gothic, Noto_Sans_JP } from 'next/font/google'

const zenMaru = Zen_Maru_Gothic({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  variable: '--font-round',
})

const notoSans = Noto_Sans_JP({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  variable: '--font-body',
})
```

Nunitoはheadタグでのみ使用：

```html
<link href="https://fonts.googleapis.com/css2?family=Nunito:wght@700;800;900&display=swap" rel="stylesheet">
```

### フォント使い分け

- ロゴ・見出し（h1〜h3）・ステップ番号ラベル → Zen Maru Gothic
- 本文・ナビ・タグ・説明文 → Noto Sans JP
- 数字（22,000+・4.8・定員10名など）・英字ラベル（Featured・Nearbyなど） → Nunito

---

## ページ構成

```
/                    トップページ（刷新）
/search              施設検索・一覧（新設・旧/servicesをリダイレクト）
/facilities/[id]     施設詳細（新設・旧/services/idをリダイレクト）
```

---

## Step 1: 型定義ファイルを作成

`src/types/facility.ts` を作成：

```typescript
export type Disability =
  | '発達障害'
  | '知的障害'
  | '身体障害'
  | '重症心身障害'
  | '精神障害';

export type SupportType =
  | '個別支援'
  | '集団活動'
  | '学習支援'
  | '運動療育'
  | '音楽療育'
  | 'SST'
  | '作業療法'
  | '言語療法'
  | 'IT・プログラミング';

export type AgeGroup = '未就学児' | '小学生' | '中学生' | '高校生';

export type Facility = {
  id: string;
  name: string;
  catchcopy: string;
  description: string;
  prefecture: string;
  city: string;
  address: string;
  phone: string;
  capacity: number;
  vacancyCount: number;       // 0=満員
  weekdayHours: string;
  holidayHours: string;
  openSaturday: boolean;
  openSunday: boolean;
  hasTransport: boolean;
  rating: number;
  reviewCount: number;
  disabilities: Disability[];
  supportTypes: SupportType[];
  ageGroups: AgeGroup[];
  hasPhoto: boolean;           // 写真あり=true、なし=false
  imageColor: string;          // hasPhoto=falseの施設の代替カラー
  lat: number;                 // 緯度（地図対応フェーズ2用）
  lng: number;                 // 経度（地図対応フェーズ2用）
};

export type SearchParams = {
  prefecture?: string;
  keyword?: string;
  disabilities?: Disability[];
  ageGroups?: AgeGroup[];
  supportTypes?: SupportType[];
  hasTransport?: boolean;
  hasVacancy?: boolean;
  sortBy?: 'recommended' | 'rating' | 'newest';
};
```

---

## Step 2: ダミーデータを作成

`src/data/facilities.ts` にFacility型のダミーデータを20件作成。

### 条件

- 愛知県（名古屋市・豊田市・岡崎市）・東京都（渋谷区・新宿区・世田谷区）・大阪府・神奈川県の実在する市区町村を使う
- vacancyCount が0の施設（満員）を4〜5件含める
- hasPhoto=trueの施設を12件・hasPhoto=falseを8件
- hasPhoto=falseの施設のimageColorはティール系（#5BBDB3・#7BBFBA・#4A9B8Eなど）
- lat/lngは各施設の住所に近い実際の値を入れる

### データ取得関数

```typescript
export async function getFacilities(): Promise<Facility[]> {
  return facilities;
}

export async function getFacilityById(id: string): Promise<Facility | null> {
  return facilities.find(f => f.id === id) ?? null;
}

export async function searchFacilities(params: SearchParams): Promise<Facility[]> {
  let result = [...facilities];

  if (params.prefecture) {
    result = result.filter(f => f.prefecture === params.prefecture);
  }
  if (params.keyword) {
    const kw = params.keyword.toLowerCase();
    result = result.filter(f =>
      f.name.toLowerCase().includes(kw) ||
      f.catchcopy.toLowerCase().includes(kw) ||
      f.description.toLowerCase().includes(kw)
    );
  }
  if (params.disabilities?.length) {
    result = result.filter(f =>
      params.disabilities!.some(d => f.disabilities.includes(d))
    );
  }
  if (params.ageGroups?.length) {
    result = result.filter(f =>
      params.ageGroups!.some(a => f.ageGroups.includes(a))
    );
  }
  if (params.supportTypes?.length) {
    result = result.filter(f =>
      params.supportTypes!.some(s => f.supportTypes.includes(s))
    );
  }
  if (params.hasTransport) {
    result = result.filter(f => f.hasTransport);
  }
  if (params.hasVacancy) {
    result = result.filter(f => f.vacancyCount > 0);
  }
  if (params.sortBy === 'rating') {
    result.sort((a, b) => b.rating - a.rating);
  }

  return result;
}
```

---

## Step 3: 共通コンポーネント

### Header.tsx

```
・背景：#FFFFFF（白）
・下部：border-bottom: 2px solid #5BBDB3
・高さ：PC=68px・スマホ=56px
・左：ロゴ
  - 丸マーク（ティールlight背景＋ティールボーダー＋黄色の丸い点）
  - 「ひだまりマッチ」Zen Maru Gothic・700・#2A2520
・中央（PC）：ナビリンク（施設を探す・使い方・施設掲載）
  - Noto Sans JP・500・#7A6E65
  - ホバー時：#5BBDB3
・右：「無料で探す」ボタン
  - Zen Maru Gothic・700
  - 背景：#F5C842・文字：#2A2520・border-radius:28px
・スマホ：ハンバーガーメニュー（ナビは非表示）
```

### FacilityCard.tsx

写真あり（hasPhoto=true）と写真なし（hasPhoto=false）で上部表示を切り替える。

```
カード構成：
┌─────────────────────────────────┐
│ [写真あり → 施設写真 h-36      │
│  写真なし → imageColor背景     │
│            中央に「No Image」  │
│            ティール文字・500    │
│  どちらも右上にバッジ]          │
│  空き○名 → イエローバッジ      │
│  満員    → 薄赤バッジ(#FFE0E0) │
├─────────────────────────────────┤
│ ⭐ [Nunito数字] [ティール薄文字]│
│ [施設名 Zen Maru Gothic・700]   │
│ [キャッチコピー ティール・500]  │
│ [エリア・営業時間 薄文字]       │
│ [障害タグ] [支援タグ]           │
├─────────────────────────────────┤
│ 定員○名    詳細を見る→        │
└─────────────────────────────────┘

PCでの「詳細を見る」：テキストリンク（ティール・アンダーライン）
スマホでのカード：全体がタップ可能なリンク＋右端に「›」

ホバー時：transform: translateY(-4px)・box-shadow追加
```

---

## Step 4: トップページ（/）

### レイアウト概要

```
[ヘッダー]
[ヒーローセクション]  ← 白背景
[統計数値バー]        ← ティール背景
[施設カードセクション] ← オフホワイト背景
[3ステップセクション]  ← 薄イエロー背景
[放デイとは]          ← 白背景
[フッター]            ← #2A2520背景
```

### ヒーローセクション

#### PC（2カラムレイアウト）

```
左カラム（flex:1）：
  - eyebrow：「AFTERSCHOOL DAY SERVICE」Nunito・800・#5BBDB3・0.22em間隔
  - h1：「お子さまに / ぴったりの施設が / きっと見つかる」
    Zen Maru Gothic・700・44px・#2A2520
    「ぴったりの施設」の部分のみ色：#5BBDB3
    その文字の下にイエロー下線（height:4px・opacity:0.7）
  - サブコピー：Noto Sans JP・15px・#7A6E65・line-height:1.8
  - 検索ボックス（下記参照）
  - タグ一覧（下記参照）

右カラム（幅420px）：
  - フィーチャードカード（最初の施設を大きく表示）
  - カードのbox-shadow: 0 12px 40px rgba(0,0,0,0.08)
  - border-radius: 24px
  フェーズ2以降：スライドショーに差し替え
```

#### スマホ（1カラム縦積み）

```
順番（上から）：
1. eyebrow
2. h1（font-size:24px）
3. サブコピー
4. 検索バー
5. タグ（横スクロール）
6. 「注目の施設」区切りラベル
7. スライドショー（全幅・フェーズ1はフィーチャードカード1枚）
   └ 写真上にオーバーレイ：施設名クレジット＋「詳細を見る→」ボタン
   └ ドットインジケーター
8. 統計数値バー
```

### 検索ボックス

```
・外枠：border: 2px solid #5BBDB3・border-radius:20px
・内部：都道府県セレクト + 区切り線 + キーワード入力 + 検索ボタン
・検索ボタン：#5BBDB3背景・白文字・Zen Maru Gothic・700
・スマホ：シンプルな1行検索バー（都道府県セレクトは別行に移動可）
・box-shadow: 0 4px 20px rgba(91,189,179,0.12)
```

### タグ一覧

```
通常タグ：白背景・#5BBDB3ボーダー・#5BBDB3文字
強調タグ：#FFFBEA背景・#F5C842ボーダー・#9A7800文字

タグ内容：
送迎あり / 個別支援 / 学習支援 / 運動療育 / 音楽療育 / SST
[強調] 空きあり / 土日営業

スマホ：横スクロール（scrollbar非表示）
```

### 統計数値バー

```
・背景：#5BBDB3
・3項目：掲載施設数 22,000+ / 対応都道府県 47 / 累計問い合わせ 3,400+
・数字：Nunito・900・32px（PC）/ 22px（スマホ）・白
・ラベル：Noto Sans JP・12px・rgba(255,255,255,0.75)
```

### 施設カードセクション

```
見出し構成：
・eyebrow：「Featured」Nunito・800・#5BBDB3・0.2em間隔
・タイトル：「注目の施設」Zen Maru Gothic・700・26px・#2A2520
・右端：「すべて見る →」テキストリンク

PCレイアウト（フィーチャードグリッド）：
・大カード1枚（左・grid-row: span 2）+ 小カード2枚（右）
・大カードのh1：220px、小カードのh1：140px
・gap: 20px

スマホレイアウト：
・横スクロールカード（width:210px・flex-shrink:0）
・セクション名を「Nearby」に変更（位置情報対応フェーズ2用の布石）
```

### 3ステップセクション

```
・背景：#FFFBEA・border-top/bottom: 2px solid #F0DC8A
・eyebrow：「HOW IT WORKS」Nunito・#9A7800
・タイトル：「3ステップで施設が見つかる」Zen Maru Gothic・700

PC：3列横並び
  カード：白背景・#F0DC8Aボーダー・border-radius:20px
  ステップ番号：Nunito・900・イエロー丸バッジ（36px）
  ステップ間：破線コネクター（dotted）

スマホ：縦リスト
  各ステップ：横並び（番号＋アイコン＋テキスト）
  コネクターなし

ステップ内容：
1. 🔍 条件を入力 / 地域・障害種別・希望のサービスを選ぶだけ。
2. 📋 施設を比較 / 空き状況・評判・特徴を一覧で比較できます。
3. 📅 見学を申し込む / 気になる施設に問い合わせ・見学申し込み。
```

### フッター

```
・背景：#2A2520
・ロゴ：白・Zen Maru Gothic・700
・リンク：rgba(255,255,255,0.5)・12px
  施設を探す / 使い方 / 施設掲載 / プライバシーポリシー / お問い合わせ
・コピーライト：rgba(255,255,255,0.25)・12px
・border-top：1px solid rgba(255,255,255,0.1)で区切り
```

---

## Step 5: 検索ページ（/search）

URLパラメータで状態管理：
`/search?pref=愛知県&disability=発達障害&support=個別支援&transport=true`

### PC：左サイドバー（280px）＋右メイン

サイドバー項目：
```
絞り込み [条件をリセット]
├ エリア（都道府県セレクト）
├ 障害特性（チェックボックス）
│   発達障害 / 知的障害 / 身体障害 / 重症心身障害 / 精神障害
├ 対象年齢（チェックボックス）
│   未就学児 / 小学生 / 中学生 / 高校生
├ 支援内容（チェックボックス）
│   個別支援 / 集団活動 / 学習支援 / 運動療育 / 音楽療育
│   SST / 作業療法 / 言語療法 / IT・プログラミング
├ 送迎あり（トグル）
└ 空きあり（トグル）

「この条件で検索」ボタン（ティール背景・白文字）
```

メインエリア：
```
・「20件の施設が見つかりました」（Nunito数字）
・ソートボタン：おすすめ順 / 評価順 / 新着順
・FacilityCardを縦並び（PC:2列・スマホ:1列）
・「もっと見る」ボタン
```

### スマホ：上部「絞り込み ▼」ボタン → ドロワー表示

---

## Step 6: 施設詳細ページ（/facilities/[id]）

旧 /services/[id] からリネーム・刷新

```
① 施設ヘッダー
  ・写真（hasPhoto=true）またはNo Image（hasPhoto=false）
  ・施設名：Zen Maru Gothic・700・大
  ・空き状況バッジ・評価・口コミ数（Nunito数字）
  ・住所・営業時間

② CTAボタン（右側固定 or ヘッダー下）
  ・「見学を申し込む」→ イエローボタン（フォームにスクロール）
  ・「電話で問い合わせる」→ ティールアウトラインボタン

③ 施設の特徴（自由テキスト）
  白カード・border-radius:16px

④ 対応障害・支援内容タグ

⑤ 基本情報テーブル
  定員 / 送迎 / 営業日 / 対象年齢 / 料金説明（1割負担）

⑥ Googleマップ埋め込み（lat/lngを使用）

⑦ 見学申込フォーム
  名前・メール・電話・お子さまの年齢・希望日・メッセージ
  送信はconsole.logのみ（Supabase連携はフェーズ2）
  「申し込む」ボタン：イエロー背景
```

---

## Step 7: リダイレクト設定

`next.config.ts` に追加：

```typescript
async redirects() {
  return [
    { source: '/services', destination: '/search', permanent: true },
    { source: '/services/:id', destination: '/facilities/:id', permanent: true },
  ];
}
```

---

## モバイル対応の詳細

```
ブレークポイント：
  sm = 640px
  md = 768px
  lg = 1024px

タップターゲット：最小44px確保
フォント：スマホ14px・PC16px（最小）
施設カード：スマホ1列 → タブレット2列 → PC3列
検索ページのサイドバー：
  スマホ → 非表示
  「絞り込み ▼」ボタンでドロワー表示
ヘッダーナビ：スマホ → ハンバーガーメニュー
```

---

## 実装の順番

```
Step 1: 型定義（src/types/facility.ts）
Step 2: ダミーデータ（src/data/facilities.ts）
Step 3: 共通コンポーネント（Header・FacilityCard）
Step 4: トップページ刷新（/）
Step 5: 検索ページ（/search）
Step 6: 施設詳細ページ（/facilities/[id]）
Step 7: リダイレクト設定

各Step完了後に npm run dev で動作確認してから次へ進む。
```

---

## フェーズ2以降（今は実装しない）

以下は設計のみ記録・実装は後回し：

```
・Supabase連携（DB・問い合わせ保存）
・ヒーロー右側カード → 施設写真スライドショーに変更
  （月額プラン施設の写真・クレジット表示・詳細ページリンク）
・モバイルの施設スライド（検索の下・全幅表示）
  └ フォト上にオーバーレイ：施設名＋「詳細を見る→」
・会員登録（Googleログインのみ）
・検索条件の保存機能
・Claude APIで自然文検索
・位置情報から近隣施設を表示
・空き状況のリマインド通知（週次）
・地図検索（Google Maps API）
```

---

## サンプルファイル参照

デザインの参考として以下のHTMLサンプルを確認すること：
- `hidamari_v2_sample.html`：PCデザインの全体像
- `hidamari_mobile_v2.html`：モバイルデザインの全体像

これらのHTML・CSS実装をNext.js + Tailwindに変換して実装する。
