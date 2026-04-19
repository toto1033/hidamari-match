"use client";
import { useState } from "react";
import Header from "@/components/Header";
import ServiceCard from "@/components/ServiceCard";
import SearchFilter from "@/components/SearchFilter";
import { services, filterServices, type DisabilityType, type ServiceFeature } from "@/lib/data";

export default function ServicesPage() {
  const [results, setResults] = useState(services);

  function handleFilter(params: {
    prefecture: string;
    disabilities: DisabilityType[];
    features: ServiceFeature[];
    hasSlots: boolean;
    keyword: string;
  }) {
    setResults(filterServices(params));
  }

  return (
    <div className="min-h-screen bg-orange-50">
      <Header />
      <div className="max-w-5xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">施設を探す</h1>
        <div className="mb-8">
          <SearchFilter onFilter={handleFilter} />
        </div>

        <p className="text-sm text-gray-500 mb-4">{results.length}件の施設が見つかりました</p>

        {results.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <p className="text-lg">条件に合う施設が見つかりませんでした。</p>
            <p className="text-sm mt-2">検索条件を変更してお試しください。</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((s) => (
              <ServiceCard key={s.id} service={s} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
