import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: '運営会社',
  description: 'ひだまりマッチの運営会社情報。',
};

const INFO_ROWS = [
  { label: '会社名', value: '○○○○株式会社（ダミー）' },
  { label: '所在地', value: '〒○○○-○○○○ ○○○○（ダミー）' },
  { label: '設立', value: '2026年' },
  { label: '事業内容', value: '放課後等デイサービス検索プラットフォームの運営' },
  { label: '代表者', value: '○○○○（ダミー）' },
  { label: 'メールアドレス', value: 'info@hidamari-match.com' },
];

export default function CompanyPage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#FAFAF9' }}>
      <Header />
      <main className="flex-1 py-12 md:py-20 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <p className="font-[Nunito,sans-serif] font-extrabold text-[#5BBDB3] text-[10px] tracking-[0.2em] uppercase mb-3">
              COMPANY
            </p>
            <h1 className="font-[family-name:var(--font-zen-maru)] font-bold text-[#2A2520] text-2xl md:text-3xl">
              運営会社
            </h1>
          </div>

          <div className="bg-white rounded-2xl border border-[#E8E3DF] overflow-hidden">
            <div className="px-6 md:px-8 py-5 border-b border-[#E8E3DF] bg-[#EDF8F7]">
              <p className="font-[family-name:var(--font-zen-maru)] font-bold text-[#2A2520] text-base">
                会社概要
              </p>
            </div>
            <div className="divide-y divide-[#E8E3DF]">
              {INFO_ROWS.map((row, i) => (
                <div key={i} className="flex flex-col sm:flex-row px-6 md:px-8 py-4 gap-1 sm:gap-6">
                  <dt className="text-[#7A6E65] text-xs font-medium w-32 flex-shrink-0 pt-0.5">{row.label}</dt>
                  <dd className="text-[#2A2520] text-sm">{row.value}</dd>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 bg-[#EDF8F7] rounded-2xl p-6">
            <h2 className="font-[family-name:var(--font-zen-maru)] font-bold text-[#2A2520] text-base mb-3">
              ひだまりマッチについて
            </h2>
            <p className="text-[#7A6E65] text-sm leading-relaxed">
              ひだまりマッチは、放課後等デイサービスを探す保護者の方と施設を繋ぐプラットフォームです。
              お子さまの障害特性・地域・希望する支援内容から施設を絞り込み、空き状況や特徴を比較して見学申し込みができます。
              保護者の方は無料でご利用いただけます。
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
