import Link from 'next/link';
import { MapPin, Clock, Star } from 'lucide-react';
import type { Facility } from '@/types/facility';

export default function FacilityCard({ facility }: { facility: Facility }) {
  const hasVacancy = facility.vacancyCount > 0;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md hover:-translate-y-1 transition-all duration-200">
      <div
        className="h-28 flex items-center justify-center"
        style={{ backgroundColor: facility.imageColor }}
      >
        <span className="text-white text-5xl font-bold opacity-30 select-none">
          {facility.name.charAt(0)}
        </span>
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-bold text-gray-900 text-sm leading-snug">{facility.name}</h3>
          <span
            className={`text-xs font-semibold px-2 py-1 rounded-full whitespace-nowrap shrink-0 ${
              hasVacancy ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-500'
            }`}
          >
            {hasVacancy ? `空き${facility.vacancyCount}名` : '満員'}
          </span>
        </div>

        <div className="flex items-center gap-1 text-xs text-gray-500 mb-2">
          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
          <span className="font-semibold text-gray-700">{facility.rating}</span>
          <span>({facility.reviewCount}件)</span>
        </div>

        <p className="text-xs text-orange-500 font-medium mb-2 leading-snug">{facility.catchcopy}</p>

        <div className="flex items-center gap-1 text-xs text-gray-500 mb-1">
          <MapPin className="w-3 h-3 shrink-0" />
          <span className="truncate">{facility.city}</span>
        </div>
        <div className="flex items-center gap-1 text-xs text-gray-500 mb-3">
          <Clock className="w-3 h-3 shrink-0" />
          <span>平日 {facility.weekdayHours}</span>
        </div>

        <div className="flex flex-wrap gap-1 mb-1">
          {facility.disabilities.map((d) => (
            <span key={d} className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full">
              {d}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap gap-1 mb-4">
          {facility.supportTypes.slice(0, 3).map((s) => (
            <span key={s} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
              {s}
            </span>
          ))}
          {facility.supportTypes.length > 3 && (
            <span className="text-xs bg-gray-100 text-gray-400 px-2 py-0.5 rounded-full">
              +{facility.supportTypes.length - 3}
            </span>
          )}
        </div>

        <Link
          href={`/facilities/${facility.id}`}
          className="block w-full text-center text-sm font-semibold text-orange-500 border border-orange-200 rounded-lg py-2 hover:bg-orange-50 transition-colors"
        >
          詳細を見る →
        </Link>
      </div>
    </div>
  );
}
