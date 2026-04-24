import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: '利用規約',
  description: 'ひだまりマッチの利用規約。',
};

const ARTICLES = [
  {
    title: '第1条 本規約の適用',
    content: `本規約は、当社が提供する放課後等デイサービス検索プラットフォーム「ひだまりマッチ」（以下「本サービス」）の利用に関する条件を定めるものです。

ユーザーは本規約に同意した上で本サービスをご利用ください。本サービスを利用された場合、本規約に同意したものとみなします。当社は、必要に応じて本規約を変更することがあります。変更後の規約はサービス上に掲載した時点から効力を生じます。`,
  },
  {
    title: '第2条 サービスの内容',
    content: `本サービスは、放課後等デイサービスを探す保護者と施設を繋ぐプラットフォームです。

当社が提供する主なサービス内容は以下のとおりです。
・放課後等デイサービス施設の検索・比較機能
・施設への見学申し込み機能
・施設に関する情報の掲載・閲覧

当社は、サービスの内容を予告なく変更・追加・削除することがあります。`,
  },
  {
    title: '第3条 禁止事項',
    content: `ユーザーは本サービスの利用にあたり、以下の行為を行ってはなりません。

・法令または本規約に違反する行為
・虚偽の情報を入力・送信する行為
・他のユーザーや施設に対する誹謗中傷・迷惑行為
・本サービスの運営を妨害する行為
・不正アクセスまたはシステムへの攻撃行為
・商業目的でのデータ収集・転用行為
・その他、当社が不適切と判断する行為

上記の行為を行った場合、当社はサービスの利用停止・アカウント削除などの措置を取ることがあります。`,
  },
  {
    title: '第4条 免責事項',
    content: `当社は、本サービスに関して以下の事項について責任を負いません。

・掲載されている施設情報の正確性・完全性
・本サービスを通じて行われた施設との交渉・契約の結果
・本サービスの一時的な停止・中断・終了による損害
・天災・システム障害・第三者による不正アクセスによる損害

ユーザーと施設の間で発生したトラブルについては、当事者間で解決するものとし、当社は一切の責任を負いません。

※実際の文章はIT専門弁護士に依頼予定（フェーズ4）`,
  },
  {
    title: '第5条 準拠法・管轄裁判所',
    content: `本規約は日本法に準拠して解釈されます。

本サービスに関するトラブルまたは本規約に関する紛争については、東京地方裁判所を第一審の専属的合意管轄裁判所とします。

本規約に定めのない事項については、日本の法令および一般的な商慣習に従うものとします。`,
  },
];

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#FAFAF9' }}>
      <Header />
      <main className="flex-1 py-12 md:py-20 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="font-[family-name:var(--font-zen-maru)] font-bold text-[#2A2520] text-2xl md:text-3xl mb-3">
              利用規約
            </h1>
            <p className="text-[#7A6E65] text-xs">最終更新日：2026年4月1日</p>
          </div>

          <div className="bg-white rounded-2xl border border-[#E8E3DF] p-6 md:p-8 mb-6">
            <p className="text-[#7A6E65] text-sm leading-relaxed">
              この利用規約（以下「本規約」）は、ひだまりマッチ（以下「当社」）が提供するサービスの利用条件を定めるものです。
              ご利用にあたっては本規約をよくお読みいただき、同意の上でご利用ください。
            </p>
          </div>

          <div className="space-y-6">
            {ARTICLES.map((article, i) => (
              <div key={i} className="bg-white rounded-2xl border border-[#E8E3DF] p-6 md:p-8">
                <h2 className="font-[family-name:var(--font-zen-maru)] font-bold text-[#2A2520] text-base mb-4">
                  {article.title}
                </h2>
                <p className="text-[#7A6E65] text-sm leading-relaxed whitespace-pre-line">
                  {article.content}
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
