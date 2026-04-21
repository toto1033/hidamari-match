"use client";
import { useState } from 'react';

export default function ContactForm({ facilityName }: { facilityName: string }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    childAge: '',
    preferredDate: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('問い合わせ送信:', { facilityName, ...form });
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="text-center py-10">
        <div className="w-16 h-16 bg-[#F0FAFA] rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-[#5BBDB3]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="font-bold text-[#111111] text-lg mb-2">送信完了しました</h3>
        <p className="text-gray-500 text-sm">施設からのご連絡をお待ちください。</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">お名前 <span className="text-red-500">*</span></label>
          <input
            name="name"
            type="text"
            required
            value={form.name}
            onChange={handleChange}
            placeholder="山田 花子"
            className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#5BBDB3]"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">メールアドレス <span className="text-red-500">*</span></label>
          <input
            name="email"
            type="email"
            required
            value={form.email}
            onChange={handleChange}
            placeholder="example@email.com"
            className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#5BBDB3]"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">電話番号</label>
          <input
            name="phone"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            placeholder="090-0000-0000"
            className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#5BBDB3]"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">お子さまの年齢</label>
          <select
            name="childAge"
            value={form.childAge}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#5BBDB3]"
          >
            <option value="">選択してください</option>
            {['未就学（3〜5歳）', '小学1年生', '小学2年生', '小学3年生', '小学4年生', '小学5年生', '小学6年生',
              '中学1年生', '中学2年生', '中学3年生', '高校1年生', '高校2年生', '高校3年生'].map((a) => (
              <option key={a} value={a}>{a}</option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">見学希望日</label>
        <input
          name="preferredDate"
          type="date"
          value={form.preferredDate}
          onChange={handleChange}
          className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#5BBDB3]"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">メッセージ</label>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          rows={4}
          placeholder="お子さまの状況やご質問などをご記入ください。"
          className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#5BBDB3] resize-none"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-[#F5C842] text-[#111111] font-bold py-3 rounded-xl hover:bg-[#D4A800] transition-colors"
      >
        送信する
      </button>
    </form>
  );
}
