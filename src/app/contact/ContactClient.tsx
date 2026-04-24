'use client';
import { useState } from 'react';

export default function ContactClient() {
  const [form, setForm] = useState({ name: '', email: '', type: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('お問い合わせ送信:', form);
    alert('お問い合わせを受け付けました。ありがとうございます。');
    setForm({ name: '', email: '', type: '', message: '' });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-10">
        <p className="font-[Nunito,sans-serif] font-extrabold text-[#5BBDB3] text-[10px] tracking-[0.2em] uppercase mb-3">
          CONTACT
        </p>
        <h1 className="font-[family-name:var(--font-zen-maru)] font-bold text-[#2A2520] text-2xl md:text-3xl mb-3">
          お問い合わせ
        </h1>
        <p className="text-[#7A6E65] text-sm leading-relaxed">
          保護者の方・施設の方、どちらもお気軽にご連絡ください。
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-[#E8E3DF] p-6 md:p-8 space-y-5">
        <div>
          <label className="block text-[#2A2520] text-sm font-medium mb-1.5">
            お名前 <span className="text-red-500 text-xs">必須</span>
          </label>
          <input
            type="text"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="山田 太郎"
            className="w-full border border-[#E8E3DF] rounded-xl px-4 py-3 text-sm text-[#2A2520] focus:outline-none focus:border-[#5BBDB3] transition-colors"
          />
        </div>
        <div>
          <label className="block text-[#2A2520] text-sm font-medium mb-1.5">
            メールアドレス <span className="text-red-500 text-xs">必須</span>
          </label>
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="example@email.com"
            className="w-full border border-[#E8E3DF] rounded-xl px-4 py-3 text-sm text-[#2A2520] focus:outline-none focus:border-[#5BBDB3] transition-colors"
          />
        </div>
        <div>
          <label className="block text-[#2A2520] text-sm font-medium mb-1.5">
            お問い合わせ種別
          </label>
          <select
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
            className="w-full border border-[#E8E3DF] rounded-xl px-4 py-3 text-sm text-[#2A2520] focus:outline-none focus:border-[#5BBDB3] transition-colors bg-white"
          >
            <option value="">選択してください</option>
            <option value="parent">保護者の方</option>
            <option value="facility">施設の方</option>
            <option value="other">その他</option>
          </select>
        </div>
        <div>
          <label className="block text-[#2A2520] text-sm font-medium mb-1.5">
            メッセージ <span className="text-red-500 text-xs">必須</span>
          </label>
          <textarea
            required
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            placeholder="お問い合わせ内容をご入力ください"
            rows={5}
            className="w-full border border-[#E8E3DF] rounded-xl px-4 py-3 text-sm text-[#2A2520] focus:outline-none focus:border-[#5BBDB3] transition-colors resize-none"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-[#5BBDB3] text-white font-[family-name:var(--font-zen-maru)] font-bold text-sm py-4 rounded-[28px] hover:bg-[#4AA8A0] transition-colors"
        >
          送信する
        </button>
      </form>

      <div className="mt-8 bg-white rounded-2xl border border-[#E8E3DF] p-6 space-y-3">
        <h2 className="font-[family-name:var(--font-zen-maru)] font-bold text-[#2A2520] text-base">
          その他のお問い合わせ方法
        </h2>
        <div className="flex items-center gap-3 text-sm text-[#7A6E65]">
          <span>📧</span>
          <span>info@hidamari-match.com</span>
        </div>
        <div className="flex items-center gap-3 text-sm text-[#7A6E65]">
          <span>🕐</span>
          <span>営業時間：平日 10:00〜18:00</span>
        </div>
      </div>
    </div>
  );
}
