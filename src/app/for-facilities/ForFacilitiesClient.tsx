'use client';
import { useState } from 'react';

const REASONS = [
  {
    icon: '💰',
    title: '完全成果報酬型',
    desc: '問い合わせゼロなら費用ゼロ。無駄な広告費をかけずに新規利用者獲得を目指せます。',
  },
  {
    icon: '👨‍👩‍👧',
    title: '保護者22,000人以上が利用',
    desc: '全国22,000以上の保護者が利用するひだまりマッチに掲載することで、効率よく施設を知っていただけます。',
  },
  {
    icon: '🤝',
    title: '専任スタッフがサポート',
    desc: '掲載情報の登録から運用まで、専任スタッフが丁寧にサポートします。ご不安な点はいつでもご相談ください。',
  },
];

const PLAN_ROWS = [
  { item: '掲載料', free: '無料', monthly: '○○円/月' },
  { item: '基本情報掲載', free: '○', monthly: '○' },
  { item: '写真掲載', free: '×', monthly: '○（検索上位に表示）' },
  { item: '空き状況更新', free: '×', monthly: '○' },
  { item: '問い合わせ課金', free: 'あり', monthly: 'あり' },
  { item: '専任サポート', free: '×', monthly: '○' },
];

export default function ForFacilitiesClient() {
  const [form, setForm] = useState({ facilityName: '', contactName: '', phone: '', email: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('掲載申込:', form);
    alert('お申し込みを受け付けました。担当者よりご連絡差し上げます。');
    setForm({ facilityName: '', contactName: '', phone: '', email: '' });
  };

  return (
    <>
      {/* Hero */}
      <section className="bg-[#5BBDB3] py-16 md:py-24 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <p className="font-[Nunito,sans-serif] font-extrabold text-white/70 text-[10px] tracking-[0.2em] uppercase mb-3">
            FOR FACILITIES
          </p>
          <h1 className="font-[family-name:var(--font-zen-maru)] font-bold text-white text-2xl md:text-4xl leading-snug mb-4">
            ひだまりマッチで、<br />新しいご家族と出会いませんか
          </h1>
          <p className="text-white/80 text-sm md:text-base leading-relaxed mb-8">
            全国22,000人以上の保護者が利用する放課後等デイサービス検索サイトに施設を掲載しませんか。
            完全成果報酬型なので、問い合わせがなければ費用はかかりません。
          </p>
          <button
            disabled
            className="bg-[#F5C842] text-[#2A2520] font-[family-name:var(--font-zen-maru)] font-bold text-base px-8 py-4 rounded-[28px] opacity-90 cursor-not-allowed"
          >
            無料掲載を申し込む（下記フォームへ）
          </button>
        </div>
      </section>

      {/* 選ばれる理由 */}
      <section className="py-14 md:py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <p className="font-[Nunito,sans-serif] font-extrabold text-[#5BBDB3] text-[10px] tracking-[0.2em] uppercase mb-2">
              WHY HIDAMARI MATCH
            </p>
            <h2 className="font-[family-name:var(--font-zen-maru)] font-bold text-[#2A2520] text-xl md:text-2xl">
              選ばれる理由
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {REASONS.map((r, i) => (
              <div key={i} className="bg-[#EDF8F7] rounded-2xl p-6 text-center">
                <div className="text-4xl mb-3">{r.icon}</div>
                <h3 className="font-[family-name:var(--font-zen-maru)] font-bold text-[#2A2520] text-base mb-2">
                  {r.title}
                </h3>
                <p className="text-[#7A6E65] text-sm leading-relaxed">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 料金比較 */}
      <section className="py-14 md:py-20 px-4" style={{ backgroundColor: '#FAFAF9' }}>
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-[family-name:var(--font-zen-maru)] font-bold text-[#2A2520] text-xl md:text-2xl">
              掲載プランの比較
            </h2>
          </div>
          <div className="bg-white rounded-2xl border border-[#E8E3DF] overflow-hidden">
            <div className="grid grid-cols-3 text-center text-sm font-bold">
              <div className="bg-[#EDF8F7] px-3 py-4 text-[#5BBDB3] border-b border-[#E8E3DF]">項目</div>
              <div className="bg-[#EDF8F7] px-3 py-4 text-[#5BBDB3] border-b border-l border-[#E8E3DF]">無料プラン</div>
              <div className="bg-[#5BBDB3] px-3 py-4 text-white border-b border-[#E8E3DF]">月額プラン</div>
            </div>
            {PLAN_ROWS.map((row, i) => (
              <div key={i} className="grid grid-cols-3 text-center text-sm border-b border-[#E8E3DF] last:border-b-0">
                <div className="px-3 py-3.5 text-[#7A6E65] font-medium text-xs">{row.item}</div>
                <div className="px-3 py-3.5 text-[#2A2520] border-l border-[#E8E3DF] text-xs">{row.free}</div>
                <div className="px-3 py-3.5 text-[#2A2520] border-l border-[#E8E3DF] text-xs bg-[#EDF8F7]/40">{row.monthly}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 申込フォーム */}
      <section className="py-14 md:py-20 px-4 bg-white">
        <div className="max-w-xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-[family-name:var(--font-zen-maru)] font-bold text-[#2A2520] text-xl md:text-2xl mb-2">
              掲載申込フォーム
            </h2>
            <p className="text-[#7A6E65] text-sm">無料プランから始められます。お気軽にお申し込みください。</p>
          </div>
          <form onSubmit={handleSubmit} className="bg-[#FAFAF9] rounded-2xl border border-[#E8E3DF] p-6 md:p-8 space-y-5">
            <div>
              <label className="block text-[#2A2520] text-sm font-medium mb-1.5">施設名</label>
              <input
                type="text"
                value={form.facilityName}
                onChange={(e) => setForm({ ...form, facilityName: e.target.value })}
                placeholder="○○放課後デイサービス"
                className="w-full border border-[#E8E3DF] rounded-xl px-4 py-3 text-sm text-[#2A2520] focus:outline-none focus:border-[#5BBDB3] bg-white transition-colors"
              />
            </div>
            <div>
              <label className="block text-[#2A2520] text-sm font-medium mb-1.5">担当者名</label>
              <input
                type="text"
                value={form.contactName}
                onChange={(e) => setForm({ ...form, contactName: e.target.value })}
                placeholder="山田 太郎"
                className="w-full border border-[#E8E3DF] rounded-xl px-4 py-3 text-sm text-[#2A2520] focus:outline-none focus:border-[#5BBDB3] bg-white transition-colors"
              />
            </div>
            <div>
              <label className="block text-[#2A2520] text-sm font-medium mb-1.5">電話番号</label>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="03-0000-0000"
                className="w-full border border-[#E8E3DF] rounded-xl px-4 py-3 text-sm text-[#2A2520] focus:outline-none focus:border-[#5BBDB3] bg-white transition-colors"
              />
            </div>
            <div>
              <label className="block text-[#2A2520] text-sm font-medium mb-1.5">メールアドレス</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="contact@example.com"
                className="w-full border border-[#E8E3DF] rounded-xl px-4 py-3 text-sm text-[#2A2520] focus:outline-none focus:border-[#5BBDB3] bg-white transition-colors"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#5BBDB3] text-white font-[family-name:var(--font-zen-maru)] font-bold text-sm py-4 rounded-[28px] hover:bg-[#4AA8A0] transition-colors"
            >
              申し込む
            </button>
            <p className="text-[#A89F98] text-xs text-center">担当スタッフより2営業日以内にご連絡します</p>
          </form>
        </div>
      </section>
    </>
  );
}
