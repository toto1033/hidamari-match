import { Suspense } from 'react';
import Header from '@/components/Header';
import FacilityCard from '@/components/FacilityCard';
import FacilityMapClient from '@/components/FacilityMapClient';
import SearchSidebar from './SearchSidebar';
import { searchFacilities } from '@/data/facilities';
import type { Disability, AgeGroup, SupportType } from '@/types/facility';

type PageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

function toArray(value: string | string[] | undefined): string[] {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
}

export default async function SearchPage({ searchParams }: PageProps) {
  const params = await searchParams;

  const prefecture = typeof params.pref === 'string' ? params.pref : undefined;
  const keyword = typeof params.keyword === 'string' ? params.keyword : undefined;
  const disabilities = toArray(params.disability) as Disability[];
  const ageGroups = toArray(params.age) as AgeGroup[];
  const supportTypes = toArray(params.support) as SupportType[];
  const hasTransport = params.transport === 'true';
  const hasVacancy = params.vacancy === 'true';
  const sort = typeof params.sort === 'string' ? params.sort : 'recommended';

  const facilities = await searchFacilities({
    prefecture,
    disabilities: disabilities.length ? disabilities : undefined,
    ageGroups: ageGroups.length ? ageGroups : undefined,
    supportTypes: supportTypes.length ? supportTypes : undefined,
    hasTransport: hasTransport || undefined,
    hasVacancy: hasVacancy || undefined,
    keyword,
  });

  const sorted = [...facilities].sort((a, b) => {
    if (sort === 'rating') return b.rating - a.rating;
    if (sort === 'newest') return Number(b.id) - Number(a.id);
    return 0;
  });

  const currentParamsStr = new URLSearchParams(
    Object.entries(params).flatMap(([k, v]) =>
      k === 'sort' ? [] : Array.isArray(v) ? v.map((val) => [k, val]) : v ? [[k, v]] : []
    )
  ).toString();

  const sortUrl = (s: string) => {
    const p = new URLSearchParams(currentParamsStr);
    p.set('sort', s);
    return `/search?${p.toString()}`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <Suspense fallback={<div className="w-64 shrink-0" />}>
            <SearchSidebar />
          </Suspense>

          <main className="flex-1 min-w-0">
            {/* Map */}
            <div className="mb-6 rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
              <FacilityMapClient facilities={sorted} />
            </div>

            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-700 font-semibold">
                <span className="text-orange-500 text-xl">{sorted.length}</span>
                <span className="text-sm ml-1">件の施設が見つかりました</span>
              </p>
              <div className="flex gap-2 text-sm">
                {[
                  { key: 'recommended', label: 'おすすめ順' },
                  { key: 'rating', label: '評価順' },
                  { key: 'newest', label: '新着順' },
                ].map(({ key, label }) => (
                  <a
                    key={key}
                    href={sortUrl(key)}
                    className={`px-3 py-1.5 rounded-lg border transition-colors ${
                      sort === key
                        ? 'bg-orange-500 text-white border-orange-500'
                        : 'bg-white text-gray-600 border-gray-200 hover:border-orange-300'
                    }`}
                  >
                    {label}
                  </a>
                ))}
              </div>
            </div>

            {sorted.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center border border-gray-100">
                <p className="text-gray-400 text-lg mb-2">条件に合う施設が見つかりませんでした</p>
                <p className="text-sm text-gray-400">絞り込み条件を変えてお試しください。</p>
              </div>
            ) : (
              <div className="space-y-4">
                {sorted.map((f) => (
                  <div key={f.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                    <div className="flex">
                      <div
                        className="w-28 shrink-0 flex items-center justify-center"
                        style={{ backgroundColor: f.imageColor }}
                      >
                        <span className="text-white text-3xl font-bold opacity-30 select-none">
                          {f.name.charAt(0)}
                        </span>
                      </div>
                      <div className="flex-1 p-4">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <h3 className="font-bold text-gray-900">{f.name}</h3>
                          <span
                            className={`text-xs font-semibold px-2 py-1 rounded-full whitespace-nowrap shrink-0 ${
                              f.vacancyCount > 0 ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-500'
                            }`}
                          >
                            {f.vacancyCount > 0 ? `空き${f.vacancyCount}名` : '満員'}
                          </span>
                        </div>
                        <p className="text-xs text-orange-500 font-medium mb-2">{f.catchcopy}</p>
                        <p className="text-sm text-gray-500 mb-3 line-clamp-2">{f.description}</p>
                        <div className="flex flex-wrap gap-1 mb-3">
                          {f.disabilities.map((d) => (
                            <span key={d} className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full">{d}</span>
                          ))}
                          {f.supportTypes.slice(0, 4).map((s) => (
                            <span key={s} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{s}</span>
                          ))}
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="text-xs text-gray-400">{f.city} · 平日 {f.weekdayHours}</p>
                          <a
                            href={`/facilities/${f.id}`}
                            className="text-xs font-semibold text-orange-500 border border-orange-200 px-3 py-1.5 rounded-lg hover:bg-orange-50 transition-colors"
                          >
                            詳細を見る →
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
