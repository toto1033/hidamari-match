'use client';
import { useState } from 'react';
import Link from 'next/link';

const FAQ_ITEMS = [
  {
    q: '受給者証の取得にはどのくらい時間がかかりますか？',
    a: '自治体によって異なりますが、申請から受給者証の発行まで概ね1〜2ヶ月程度かかります。お住まいの市区町村の障害福祉担当窓口にご確認ください。',
  },
  {
    q: '利用料はどのくらいかかりますか？',
    a: '放課後等デイサービスの利用料は、世帯所得に応じて1割負担となります。上限額が設定されているため、多くの場合1回あたり700〜1,200円程度です。詳しくはご利用予定の施設または市区町村窓口にお問い合わせください。',
  },
  {
    q: '複数の施設を利用することはできますか？',
    a: 'はい、受給者証に記載された支給量（日数）の範囲内であれば、複数の施設を併用することができます。お子さまの状況や目的に合わせてご検討ください。',
  },
  {
    q: 'ひだまりマッチの利用に費用はかかりますか？',
    a: '保護者の方はひだまりマッチを完全無料でご利用いただけます。施設の検索・比較・見学申し込みまで、すべて無料です。',
  },
];

const STEPS = [
  {
    num: '1',
    title: '受給者証を取得する',
    desc: 'お住まいの市区町村の障害福祉担当窓口に申請します。診断書や意見書が必要な場合があります。申請後、受給者証が交付されると利用可能になります。',
    icon: '📄',
  },
  {
    num: '2',
    title: '施設を探す',
    desc: 'ひだまりマッチで地域・障害特性・支援内容などの条件から施設を絞り込んで探せます。空き状況や特徴を比較して、お子さまに合った施設を見つけましょう。',
    icon: '🔍',
  },
  {
    num: '3',
    title: '見学・体験をする',
    desc: '気になる施設に見学を申し込みましょう。実際の環境や雰囲気、スタッフとの相性を確認することが大切です。複数の施設を見学することをおすすめします。',
    icon: '👀',
  },
  {
    num: '4',
    title: '契約・利用開始',
    desc: '施設と受給者証の内容を確認しながら契約手続きを行います。個別支援計画を作成し、お子さまのペースに合わせて利用を開始します。',
    icon: '✅',
  },
];

export default function GuideClient() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <>
      {/* Hero */}
      <section className="bg-white py-12 md:py-20 px-4 border-b-2 border-[#E8E3DF]">
        <div className="max-w-3xl mx-auto text-center">
          <p className="font-[Nunito,sans-serif] font-extrabold text-[#5BBDB3] text-[10px] tracking-[0.2em] uppercase mb-3">
            FIRST GUIDE
          </p>
          <h1 className="font-[family-name:var(--font-zen-maru)] font-bold text-[#2A2520] text-2xl md:text-4xl mb-4">
            初めての方へ
          </h1>
          <p className="text-[#7A6E65] text-sm md:text-base leading-relaxed">
            放課後等デイサービスの利用方法をわかりやすくご説明します。<br />
            受給者証の取得から施設探し・見学・契約まで、ステップごとにご案内します。
          </p>
        </div>
      </section>

      {/* 放課後等デイサービスとは */}
      <section className="py-12 md:py-16 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-[family-name:var(--font-zen-maru)] font-bold text-[#2A2520] text-xl md:text-2xl mb-6">
            放課後等デイサービスとは
          </h2>
          <div className="bg-[#EDF8F7] rounded-2xl p-6 md:p-8">
            <p className="text-[#2A2520] text-sm md:text-base leading-relaxed mb-4">
              放課後等デイサービスは、障害のある小学生・中学生・高校生（6〜18歳）が学校の放課後や長期休暇中に通える福祉サービスです。
              児童福祉法に基づいて運営されており、「障害児の学童保育」とも呼ばれています。
            </p>
            <p className="text-[#2A2520] text-sm md:text-base leading-relaxed">
              各施設では、学習支援・運動療育・音楽療育・SST（社会スキルトレーニング）など、
              お子さまの特性に合わせた多様なプログラムを提供しています。
              専門スタッフのもと、日常生活の自立を促しながら、放課後の安心できる居場所として機能しています。
            </p>
          </div>
        </div>
      </section>

      {/* 利用の流れ */}
      <section className="py-12 md:py-16 px-4" style={{ backgroundColor: '#FFFBEA', borderTop: '2px solid #F0DC8A', borderBottom: '2px solid #F0DC8A' }}>
        <div className="max-w-3xl mx-auto">
          <p className="font-[Nunito,sans-serif] font-extrabold text-[#9A7800] text-[10px] tracking-[0.2em] uppercase mb-2 text-center">
            HOW TO USE
          </p>
          <h2 className="font-[family-name:var(--font-zen-maru)] font-bold text-[#2A2520] text-xl md:text-2xl mb-10 text-center">
            利用の流れ
          </h2>
          <div className="space-y-6">
            {STEPS.map((step, i) => (
              <div key={i} className="flex gap-5 bg-white rounded-2xl border border-[#F0DC8A] p-5 md:p-6">
                <div className="flex-shrink-0 w-11 h-11 rounded-full bg-[#F5C842] flex items-center justify-center font-[Nunito,sans-serif] font-black text-[#2A2520] text-lg">
                  {step.num}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl">{step.icon}</span>
                    <h3 className="font-[family-name:var(--font-zen-maru)] font-bold text-[#2A2520] text-base">
                      STEP{step.num}: {step.title}
                    </h3>
                  </div>
                  <p className="text-[#7A6E65] text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* よくある疑問 */}
      <section className="py-12 md:py-16 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-[family-name:var(--font-zen-maru)] font-bold text-[#2A2520] text-xl md:text-2xl mb-8 text-center">
            よくある疑問
          </h2>
          <div className="space-y-3">
            {FAQ_ITEMS.map((item, i) => (
              <div key={i} className="border border-[#E8E3DF] rounded-2xl overflow-hidden">
                <button
                  className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 bg-white hover:bg-[#EDF8F7] transition-colors"
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                >
                  <span className="font-medium text-[#2A2520] text-sm leading-relaxed">Q. {item.q}</span>
                  <span className="flex-shrink-0 text-[#5BBDB3] font-bold text-lg leading-none">
                    {openIndex === i ? '−' : '+'}
                  </span>
                </button>
                {openIndex === i && (
                  <div className="px-5 pb-5 pt-1 bg-[#EDF8F7]">
                    <p className="text-[#7A6E65] text-sm leading-relaxed">A. {item.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 px-4 bg-[#5BBDB3]">
        <div className="max-w-md mx-auto text-center">
          <h2 className="font-[family-name:var(--font-zen-maru)] font-bold text-white text-xl md:text-2xl mb-4">
            まずは施設を探してみましょう
          </h2>
          <p className="text-white/80 text-sm mb-6">
            保護者の方は無料でご利用いただけます。
          </p>
          <Link
            href="/search"
            className="inline-block bg-[#F5C842] text-[#2A2520] font-[family-name:var(--font-zen-maru)] font-bold text-base px-8 py-4 rounded-[28px] hover:bg-[#D4A800] transition-colors"
          >
            施設を探す →
          </Link>
        </div>
      </section>
    </>
  );
}
