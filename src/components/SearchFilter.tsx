"use client";
import { useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { PREFECTURES, ALL_DISABILITIES, ALL_FEATURES, type DisabilityType, type ServiceFeature } from "@/lib/data";

type Props = {
  onFilter: (params: {
    prefecture: string;
    disabilities: DisabilityType[];
    features: ServiceFeature[];
    hasSlots: boolean;
    keyword: string;
  }) => void;
};

export default function SearchFilter({ onFilter }: Props) {
  const [keyword, setKeyword] = useState("");
  const [prefecture, setPrefecture] = useState("");
  const [disabilities, setDisabilities] = useState<DisabilityType[]>([]);
  const [features, setFeatures] = useState<ServiceFeature[]>([]);
  const [hasSlots, setHasSlots] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);

  function toggle<T>(arr: T[], item: T): T[] {
    return arr.includes(item) ? arr.filter((x) => x !== item) : [...arr, item];
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onFilter({ prefecture, disabilities, features, hasSlots, keyword });
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex gap-3 mb-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="施設名・地域・特徴で検索"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
          />
        </div>
        <select
          value={prefecture}
          onChange={(e) => setPrefecture(e.target.value)}
          className="px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 bg-white"
        >
          <option value="">都道府県</option>
          {PREFECTURES.map((p) => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
        <button
          type="submit"
          className="bg-orange-500 text-white px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-orange-600 transition-colors"
        >
          検索
        </button>
      </div>

      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
          <input
            type="checkbox"
            checked={hasSlots}
            onChange={(e) => setHasSlots(e.target.checked)}
            className="rounded text-orange-500"
          />
          空きあり施設のみ表示
        </label>
        <button
          type="button"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="flex items-center gap-1 text-sm text-gray-500 hover:text-orange-500 transition-colors"
        >
          <SlidersHorizontal className="w-4 h-4" />
          詳細フィルター
        </button>
      </div>

      {showAdvanced && (
        <div className="mt-4 pt-4 border-t border-gray-100 space-y-4">
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">対応障害種別</p>
            <div className="flex flex-wrap gap-2">
              {ALL_DISABILITIES.map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => setDisabilities(toggle(disabilities, d))}
                  className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                    disabilities.includes(d)
                      ? "bg-blue-500 text-white border-blue-500"
                      : "border-gray-200 text-gray-600 hover:border-blue-300"
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">サービス特徴</p>
            <div className="flex flex-wrap gap-2">
              {ALL_FEATURES.map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFeatures(toggle(features, f))}
                  className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                    features.includes(f)
                      ? "bg-orange-500 text-white border-orange-500"
                      : "border-gray-200 text-gray-600 hover:border-orange-300"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </form>
  );
}
