"use client";
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { SlidersHorizontal, X } from 'lucide-react';

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
  const [drawerOpen, setDrawerOpen] = useState(false);

  const [pref, setPref] = useState(searchParams.get('pref') ?? '');
  const [disabilities, setDisabilities] = useState<string[]>(searchParams.getAll('disability'));
  const [ageGroups, setAgeGroups] = useState<string[]>(searchParams.getAll('age'));
  const [supports, setSupports] = useState<string[]>(searchParams.getAll('support'));
  const [transport, setTransport] = useState(searchParams.get('transport') === 'true');
  const [vacancy, setVacancy] = useState(searchParams.get('vacancy') === 'true');

  useEffect(() => {
    setPref(searchParams.get('pref') ?? '');
    setDisabilities(searchParams.getAll('disability'));
    setAgeGroups(searchParams.getAll('age'));
    setSupports(searchParams.getAll('support'));
    setTransport(searchParams.get('transport') === 'true');
    setVacancy(searchParams.get('vacancy') === 'true');
  }, [searchParams]);

  const toggleItem = (list: string[], setList: (v: string[]) => void, item: string) => {
    setList(list.includes(item) ? list.filter((v) => v !== item) : [...list, item]);
  };

  const applyFilters = () => {
    const params = new URLSearchParams();
    if (pref) params.set('pref', pref);
    disabilities.forEach((d) => params.append('disability', d));
    ageGroups.forEach((a) => params.append('age', a));
    supports.forEach((s) => params.append('support', s));
    if (transport) params.set('transport', 'true');
    if (vacancy) params.set('vacancy', 'true');
    const sort = searchParams.get('sort');
    if (sort) params.set('sort', sort);
    router.push(`/search${params.toString() ? `?${params}` : ''}`);
    setDrawerOpen(false);
  };

  const reset = () => {
    setPref('');
    setDisabilities([]);
    setAgeGroups([]);
    setSupports([]);
    setTransport(false);
    setVacancy(false);
    router.push('/search');
    setDrawerOpen(false);
  };

  const filterContent = (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-[#111111]">絞り込み</h2>
        <button onClick={reset} className="text-xs text-[#5BBDB3] hover:underline">条件をリセット</button>
      </div>

      <div>
        <p className="text-sm font-semibold text-gray-700 mb-2">エリア</p>
        <select
          value={pref}
          onChange={(e) => setPref(e.target.value)}
          className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#5BBDB3]"
        >
          <option value="">すべての都道府県</option>
          {PREFECTURES.map((p) => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
      </div>

      <div>
        <p className="text-sm font-semibold text-gray-700 mb-2">障害特性</p>
        <div className="space-y-2">
          {DISABILITIES.map((d) => (
            <label key={d} className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
              <input
                type="checkbox"
                checked={disabilities.includes(d)}
                onChange={() => toggleItem(disabilities, setDisabilities, d)}
                className="accent-[#5BBDB3] w-4 h-4"
              />
              {d}
            </label>
          ))}
        </div>
      </div>

      <div>
        <p className="text-sm font-semibold text-gray-700 mb-2">対象年齢</p>
        <div className="space-y-2">
          {AGE_GROUPS.map((a) => (
            <label key={a} className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
              <input
                type="checkbox"
                checked={ageGroups.includes(a)}
                onChange={() => toggleItem(ageGroups, setAgeGroups, a)}
                className="accent-[#5BBDB3] w-4 h-4"
              />
              {a}
            </label>
          ))}
        </div>
      </div>

      <div>
        <p className="text-sm font-semibold text-gray-700 mb-2">支援内容</p>
        <div className="space-y-2">
          {SUPPORT_TYPES.map((s) => (
            <label key={s} className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
              <input
                type="checkbox"
                checked={supports.includes(s)}
                onChange={() => toggleItem(supports, setSupports, s)}
                className="accent-[#5BBDB3] w-4 h-4"
              />
              {s}
            </label>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <label className="flex items-center justify-between cursor-pointer">
          <span className="text-sm font-semibold text-gray-700">送迎あり</span>
          <button
            type="button"
            onClick={() => setTransport((v) => !v)}
            className={`w-11 h-6 rounded-full transition-colors ${transport ? 'bg-[#5BBDB3]' : 'bg-gray-200'}`}
          >
            <span className={`block w-5 h-5 bg-white rounded-full shadow transition-transform mx-0.5 ${transport ? 'translate-x-5' : 'translate-x-0'}`} />
          </button>
        </label>
        <label className="flex items-center justify-between cursor-pointer">
          <span className="text-sm font-semibold text-gray-700">空きあり</span>
          <button
            type="button"
            onClick={() => setVacancy((v) => !v)}
            className={`w-11 h-6 rounded-full transition-colors ${vacancy ? 'bg-[#5BBDB3]' : 'bg-gray-200'}`}
          >
            <span className={`block w-5 h-5 bg-white rounded-full shadow transition-transform mx-0.5 ${vacancy ? 'translate-x-5' : 'translate-x-0'}`} />
          </button>
        </label>
      </div>

      <button
        onClick={applyFilters}
        className="w-full bg-[#5BBDB3] text-white font-bold py-2.5 rounded-xl hover:bg-[#4AAAA0] transition-colors text-sm"
      >
        この条件で検索
      </button>
    </div>
  );

  return (
    <>
      {/* Mobile toggle */}
      <div className="lg:hidden mb-4">
        <button
          onClick={() => setDrawerOpen(true)}
          className="flex items-center gap-2 bg-white border border-[#5BBDB3] px-4 py-2.5 rounded-xl text-sm font-semibold text-[#5BBDB3] shadow-sm"
        >
          <SlidersHorizontal className="w-4 h-4" />
          絞り込み ▼
        </button>
      </div>

      {/* Mobile drawer */}
      {drawerOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/40" onClick={() => setDrawerOpen(false)} />
          <div className="relative ml-auto w-80 max-w-full bg-white h-full overflow-y-auto p-6 shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <span className="font-bold text-[#111111]">絞り込み</span>
              <button onClick={() => setDrawerOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            {filterContent}
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className="hidden lg:block w-[280px] shrink-0 bg-[#F0FAFA] rounded-2xl p-5 self-start">
        {filterContent}
      </aside>
    </>
  );
}
