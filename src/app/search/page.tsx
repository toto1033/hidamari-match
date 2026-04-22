import { Suspense } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FacilityCard from '@/components/FacilityCard';
import SearchSidebar from './SearchSidebar';
import { searchFacilities } from '@/data/facilities';
import type { Disability, AgeGroup, SupportType } from '@/types/facility';
import Link from 'next/link';

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
    <div className="min-h-screen" style={{ backgroundColor: '#FAFAF9' }}>
      <Header />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <Suspense fallback={<div className="w-[280px] shrink-0" />}>
            <SearchSidebar />
          </Suspense>

          <main className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-6">
              <p className="text-[#2A2520] font-semibold">
                <span className="font-nunito font-bold text-[#5BBDB3] text-xl">{sorted.length}</span>
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
                        ? 'bg-[#5BBDB3] text-white border-[#5BBDB3]'
                        : 'bg-white text-gray-600 border-gray-200 hover:border-[#5BBDB3]'
                    }`}
                  >
                    {label}
                  </a>
                ))}
              </div>
            </div>

            {sorted.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center border border-[#E8E3DF]">
                <p className="text-gray-400 text-lg mb-2">条件に合う施設が見つかりませんでした</p>
                <p className="text-sm text-gray-400">絞り込み条件を変えてお試しください。</p>
              </div>
            ) : (
              <>
                <div className="grid sm:grid-cols-2 gap-6">
                  {sorted.map((f) => (
                    <FacilityCard key={f.id} facility={f} />
                  ))}
                </div>
                {sorted.length >= 6 && (
                  <div className="mt-8 text-center">
                    <Link
                      href="/search"
                      className="inline-block border-2 border-[#5BBDB3] text-[#5BBDB3] font-bold px-8 py-3 rounded-xl hover:bg-[#5BBDB3] hover:text-white transition-colors text-sm"
                    >
                      もっと見る
                    </Link>
                  </div>
                )}
              </>
            )}
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
}
