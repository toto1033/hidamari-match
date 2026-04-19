"use client";
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

const PREFECTURES = [
  '北海道', '青森県', '岩手県', '宮城県', '秋田県', '山形県', '福島県',
  '茨城県', '栃木県', '群馬県', '埼玉県', '千葉県', '東京都', '神奈川県',
  '新潟県', '富山県', '石川県', '福井県', '山梨県', '長野県', '岐阜県',
  '静岡県', '愛知県', '三重県', '滋賀県', '京都府', '大阪府', '兵庫県',
  '奈良県', '和歌山県', '鳥取県', '島根県', '岡山県', '広島県', '山口県',
  '徳島県', '香川県', '愛媛県', '高知県', '福岡県', '佐賀県', '長崎県',
  '熊本県', '大分県', '宮崎県', '鹿児島県', '沖縄県',
];

const DISABILITIES = ['発達障害', '知的障害', '身体障害', '重症心身障害', '精神障害'];
const AGE_GROUPS = ['未就学児', '小学生', '中学生', '高校生'];
const SUPPORT_TYPES = ['個別支援', '集団活動', '学習支援', '運動療育', '音楽療育', 'SST', '作業療法', '言語療法', 'IT・プログラミング'];

export default function SearchSidebar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentPref = searchParams.get('pref') ?? '';
  const currentDisabilities = searchParams.getAll('disability');
  const currentAgeGroups = searchParams.getAll('age');
  const currentSupports = searchParams.getAll('support');
  const currentTransport = searchParams.get('transport') === 'true';
  const currentVacancy = searchParams.get('vacancy') === 'true';

  const update = useCallback((key: string, value: string | null, multi = false) => {
    const params = new URLSearchParams(searchParams.toString());
    if (!multi) {
      if (value === null || value === '') {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    } else {
      const existing = params.getAll(key);
      if (value === null) return;
      if (existing.includes(value)) {
        params.delete(key);
        existing.filter((v) => v !== value).forEach((v) => params.append(key, v));
      } else {
        params.append(key, value);
      }
    }
    router.push(`/search?${params.toString()}`);
  }, [router, searchParams]);

  const toggleBool = useCallback((key: string, current: boolean) => {
    const params = new URLSearchParams(searchParams.toString());
    if (current) {
      params.delete(key);
    } else {
      params.set(key, 'true');
    }
    router.push(`/search?${params.toString()}`);
  }, [router, searchParams]);

  const reset = () => router.push('/search');

  return (
    <aside className="w-full lg:w-64 shrink-0 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-gray-900">絞り込み</h2>
        <button onClick={reset} className="text-xs text-orange-500 hover:underline">リセット</button>
      </div>

      {/* エリア */}
      <div>
        <p className="text-sm font-semibold text-gray-700 mb-2">エリア</p>
        <select
          value={currentPref}
          onChange={(e) => update('pref', e.target.value || null)}
          className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-400"
        >
          <option value="">すべての都道府県</option>
          {PREFECTURES.map((p) => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
      </div>

      {/* 障害特性 */}
      <div>
        <p className="text-sm font-semibold text-gray-700 mb-2">障害特性</p>
        <div className="space-y-2">
          {DISABILITIES.map((d) => (
            <label key={d} className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
              <input
                type="checkbox"
                checked={currentDisabilities.includes(d)}
                onChange={() => update('disability', d, true)}
                className="accent-orange-500 w-4 h-4"
              />
              {d}
            </label>
          ))}
        </div>
      </div>

      {/* 対象年齢 */}
      <div>
        <p className="text-sm font-semibold text-gray-700 mb-2">対象年齢</p>
        <div className="space-y-2">
          {AGE_GROUPS.map((a) => (
            <label key={a} className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
              <input
                type="checkbox"
                checked={currentAgeGroups.includes(a)}
                onChange={() => update('age', a, true)}
                className="accent-orange-500 w-4 h-4"
              />
              {a}
            </label>
          ))}
        </div>
      </div>

      {/* 支援内容 */}
      <div>
        <p className="text-sm font-semibold text-gray-700 mb-2">支援内容</p>
        <div className="space-y-2">
          {SUPPORT_TYPES.map((s) => (
            <label key={s} className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
              <input
                type="checkbox"
                checked={currentSupports.includes(s)}
                onChange={() => update('support', s, true)}
                className="accent-orange-500 w-4 h-4"
              />
              {s}
            </label>
          ))}
        </div>
      </div>

      {/* トグル */}
      <div className="space-y-3">
        <label className="flex items-center justify-between cursor-pointer">
          <span className="text-sm font-semibold text-gray-700">送迎あり</span>
          <button
            type="button"
            onClick={() => toggleBool('transport', currentTransport)}
            className={`w-11 h-6 rounded-full transition-colors ${currentTransport ? 'bg-orange-500' : 'bg-gray-200'}`}
          >
            <span
              className={`block w-5 h-5 bg-white rounded-full shadow transition-transform mx-0.5 ${currentTransport ? 'translate-x-5' : 'translate-x-0'}`}
            />
          </button>
        </label>
        <label className="flex items-center justify-between cursor-pointer">
          <span className="text-sm font-semibold text-gray-700">空きあり</span>
          <button
            type="button"
            onClick={() => toggleBool('vacancy', currentVacancy)}
            className={`w-11 h-6 rounded-full transition-colors ${currentVacancy ? 'bg-orange-500' : 'bg-gray-200'}`}
          >
            <span
              className={`block w-5 h-5 bg-white rounded-full shadow transition-transform mx-0.5 ${currentVacancy ? 'translate-x-5' : 'translate-x-0'}`}
            />
          </button>
        </label>
      </div>
    </aside>
  );
}
