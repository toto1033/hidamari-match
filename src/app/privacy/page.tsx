import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'プライバシーポリシー',
  description: 'ひだまりマッチのプライバシーポリシー。',
};

const SECTIONS = [
  {
    title: '第1条 個人情報の収集について',
    content: `当社は、サービスの提供にあたり、氏名・メールアドレス・電話番号・お子さまの年齢・障害特性などの個人情報を収集することがあります。個人情報の収集は、適正かつ公正な手段によって行い、ご本人の同意を得た上で行います。

なお、本サービスのご利用にあたっては、Google Analyticsなどの解析ツールを使用する場合があります。これらのツールはCookieを使用してデータを収集しますが、個人を特定する情報は含まれません。`,
  },
  {
    title: '第2条 個人情報の利用目的',
    content: `収集した個人情報は、以下の目的のために利用します。

・本サービスの提供および改善
・施設への見学申し込み・お問い合わせの取次ぎ
・ご本人への各種通知・連絡
・統計データの作成（個人を特定しない形式）
・サービスに関するアンケートの実施
・法令に基づく対応`,
  },
  {
    title: '第3条 個人情報の第三者提供',
    content: `当社は、以下の場合を除き、ご本人の同意なく第三者に個人情報を提供しません。

・法令に基づく場合
・人の生命・身体・財産の保護のために必要がある場合
・公衆衛生の向上・児童の健全育成のために特に必要がある場合
・国の機関・地方公共団体などが法令の定める事務を遂行することに対して協力が必要な場合

なお、施設への見学申し込みにあたっては、ご本人の同意のもと、該当施設に必要な情報を提供します。`,
  },
  {
    title: '第4条 個人情報の管理',
    content: `当社は、収集した個人情報を正確かつ最新の状態に保ち、不正なアクセス・紛失・破損・改ざん・漏洩などを防止するために適切なセキュリティ対策を実施します。

個人情報の取り扱いを委託する場合は、委託先に対して適切な管理を求め、必要な監督を行います。利用目的を達成した個人情報は、適切な方法で速やかに削除または破棄します。`,
  },
  {
    title: '第5条 お問い合わせ窓口',
    content: `個人情報の開示・訂正・利用停止・削除等のご請求、またはプライバシーポリシーに関するお問い合わせは、以下の窓口までご連絡ください。

メールアドレス：info@hidamari-match.com
対応時間：平日 10:00〜18:00

※実際の文章はIT専門弁護士に依頼予定（フェーズ4）`,
  },
];

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#FAFAF9' }}>
      <Header />
      <main className="flex-1 py-12 md:py-20 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="font-[family-name:var(--font-zen-maru)] font-bold text-[#2A2520] text-2xl md:text-3xl mb-3">
              プライバシーポリシー
            </h1>
            <p className="text-[#7A6E65] text-xs">最終更新日：2026年4月1日</p>
          </div>

          <div className="bg-white rounded-2xl border border-[#E8E3DF] p-6 md:p-8 mb-6">
            <p className="text-[#7A6E65] text-sm leading-relaxed">
              ひだまりマッチ（以下「当社」）は、ユーザーの個人情報の取り扱いについて、以下のとおりプライバシーポリシーを定めます。
              当サービスをご利用いただく前に、本ポリシーをよくお読みください。
            </p>
          </div>

          <div className="space-y-6">
            {SECTIONS.map((section, i) => (
              <div key={i} className="bg-white rounded-2xl border border-[#E8E3DF] p-6 md:p-8">
                <h2 className="font-[family-name:var(--font-zen-maru)] font-bold text-[#2A2520] text-base mb-4">
                  {section.title}
                </h2>
                <p className="text-[#7A6E65] text-sm leading-relaxed whitespace-pre-line">
                  {section.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
