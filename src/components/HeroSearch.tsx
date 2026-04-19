"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';

const PREFECTURES = [
  '北海道', '青森県', '岩手県', '宮城県', '秋田県', '山形県', '福島県',
  '茨城県', '栃木県', '群馬県', '埼玉県', '千葉県', '東京都', '神奈川県',
  '新潟県', '富山県', '石川県', '福井県', '山梨県', '長野県', '岐阜県',
  '静岡県', '愛知県', '三重県', '滋賀県', '京都府', '大阪府', '兵庫県',
  '奈良県', '和歌山県', '鳥取県', '島根県', '岡山県', '広島県', '山口県',
  '徳島県', '香川県', '愛媛県', '高知県', '福岡県', '佐賀県', '長崎県',
  '熊本県', '大分県', '宮崎県', '鹿児島県', '沖縄県',
];

export default function HeroSearch() {
  const router = useRouter();
  const [prefecture, setPrefecture] = useState('');
  const [keyword, setKeyword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (prefecture) params.set('pref', prefecture);
    if (keyword) params.set('keyword', keyword);
    router.push(`/search${params.toString() ? `?${params}` : ''}`);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto">
      <select
        value={prefecture}
        onChange={(e) => setPrefecture(e.target.value)}
        className="flex-none sm:w-44 px-4 py-3 rounded-xl border border-gray-200 text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-orange-400 text-sm"
      >
        <option value="">都道府県を選ぶ</option>
        {PREFECTURES.map((p) => (
          <option key={p} value={p}>{p}</option>
        ))}
      </select>
      <input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="施設名・地域・支援内容など"
        className="flex-1 px-4 py-3 rounded-xl border border-gray-200 text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-orange-400 text-sm"
      />
      <button
        type="submit"
        className="flex items-center justify-center gap-2 bg-orange-500 text-white font-bold px-6 py-3 rounded-xl hover:bg-orange-600 transition-colors text-sm"
      >
        <Search className="w-4 h-4" />
        今すぐ探す
      </button>
    </form>
  );
}
