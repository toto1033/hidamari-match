'use client';
import { useState } from 'react';

const FAQ_CATEGORIES = [
  {
    category: '保護者向け',
    items: [
      {
        q: '利用料はいくらかかりますか？',
        a: '放課後等デイサービスの利用料は、世帯所得に応じて1割負担となります。上限月額が設定されており（非課税世帯0円・年収890万円未満4,600円・それ以上37,200円）、多くの場合1回あたり700〜1,200円程度です。詳細はお住まいの市区町村にご確認ください。',
      },
      {
        q: '受給者証がないと利用できませんか？',
        a: '放課後等デイサービスの利用には受給者証（障害児通所受給者証）が必要です。お住まいの市区町村の障害福祉担当窓口に申請することで取得できます。申請から発行まで1〜2ヶ月程度かかる場合があります。',
      },
      {
        q: '見学の申し込み方法を教えてください。',
        a: '施設詳細ページから見学申し込みフォームを送信いただくか、施設に直接お電話ください。ひだまりマッチからの申し込みフォームは24時間受け付けています。施設スタッフより日程調整のご連絡を差し上げます。',
      },
      {
        q: 'ひだまりマッチの利用は無料ですか？',
        a: '保護者の方は完全無料でご利用いただけます。施設の検索・比較・見学申し込みまで、すべて費用はかかりません。',
      },
    ],
  },
  {
    category: '施設向け',
    items: [
      {
        q: '掲載費用はかかりますか？',
        a: '無料プランと月額プランをご用意しています。無料プランは基本情報の掲載が可能で、問い合わせが発生した際のみ費用が発生する成果報酬型です。月額プランでは写真掲載や検索上位表示など追加機能をご利用いただけます。',
      },
      {
        q: '掲載内容はどうやって登録しますか？',
        a: 'お申し込み後、担当スタッフより登録フォームのご案内をお送りします。施設情報・写真・営業時間など必要事項を入力いただくと、通常2〜3営業日でサイトに反映されます。掲載内容の修正もいつでも対応可能です。',
      },
    ],
  },
];

export default function FaqClient() {
  const [openKey, setOpenKey] = useState<string | null>(null);

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-10">
        <p className="font-[Nunito,sans-serif] font-extrabold text-[#5BBDB3] text-[10px] tracking-[0.2em] uppercase mb-3">
          FAQ
        </p>
        <h1 className="font-[family-name:var(--font-zen-maru)] font-bold text-[#2A2520] text-2xl md:text-3xl mb-3">
          よくある質問
        </h1>
        <p className="text-[#7A6E65] text-sm leading-relaxed">
          ひだまりマッチの使い方や放課後等デイサービスについてよくいただく質問をまとめました。
        </p>
      </div>

      <div className="space-y-8">
        {FAQ_CATEGORIES.map((cat) => (
          <div key={cat.category}>
            <h2 className="font-[family-name:var(--font-zen-maru)] font-bold text-[#2A2520] text-base mb-4 flex items-center gap-2">
              <span className="w-1.5 h-5 bg-[#5BBDB3] rounded-full inline-block" />
              {cat.category}
            </h2>
            <div className="space-y-2">
              {cat.items.map((item, i) => {
                const key = `${cat.category}-${i}`;
                return (
                  <div key={key} className="border border-[#E8E3DF] rounded-2xl overflow-hidden bg-white">
                    <button
                      className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 hover:bg-[#EDF8F7] transition-colors"
                      onClick={() => setOpenKey(openKey === key ? null : key)}
                    >
                      <span className="font-medium text-[#2A2520] text-sm leading-relaxed">
                        Q. {item.q}
                      </span>
                      <span className="flex-shrink-0 text-[#5BBDB3] font-bold text-lg leading-none">
                        {openKey === key ? '−' : '+'}
                      </span>
                    </button>
                    {openKey === key && (
                      <div className="px-5 pb-5 pt-2 bg-[#EDF8F7]">
                        <p className="text-[#7A6E65] text-sm leading-relaxed">A. {item.a}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 bg-[#EDF8F7] rounded-2xl p-6 text-center">
        <p className="text-[#2A2520] text-sm font-medium mb-3">解決しない場合はお気軽にお問い合わせください</p>
        <a
          href="/contact"
          className="inline-block bg-[#5BBDB3] text-white font-[family-name:var(--font-zen-maru)] font-bold text-sm px-6 py-3 rounded-[28px] hover:bg-[#4AA8A0] transition-colors"
        >
          お問い合わせ
        </a>
      </div>
    </div>
  );
}
