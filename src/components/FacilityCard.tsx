import Link from 'next/link';
import { MapPin, Clock, Star, Image } from 'lucide-react';
import type { Facility } from '@/types/facility';

export default function FacilityCard({ facility }: { facility: Facility }) {
  const hasVacancy = facility.vacancyCount > 0;

  return (
    <Link
      href={`/facilities/${facility.id}`}
      className="block bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden cursor-pointer group hover:shadow-[0_2px_8px_rgba(0,0,0,0.08)] transition-shadow duration-200"
    >
      {/* Image area */}
      <div className="h-32 flex items-center justify-center bg-[#F0FAFA]">
        {facility.hasPhoto ? (
          <div className="flex flex-col items-center gap-1 text-[#5BBDB3]">
            <Image className="w-8 h-8" />
            <span className="text-xs">施設写真</span>
          </div>
        ) : (
          <span className="text-[14px] text-[#5BBDB3] font-medium">No Image</span>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-bold text-[#111111] text-sm leading-snug">{facility.name}</h3>
          <span
            className={`text-xs font-bold px-2 py-1 rounded-full whitespace-nowrap shrink-0 ${
              hasVacancy ? 'bg-[#F5C842] text-[#111111]' : 'bg-red-50 text-red-500'
            }`}
          >
            {hasVacancy ? `空き${facility.vacancyCount}名` : '満員'}
          </span>
        </div>

        <div className="flex items-center gap-1 text-xs text-gray-500 mb-2">
          <Star className="w-3 h-3 fill-[#F5C842] text-[#F5C842]" />
          <span className="font-semibold text-gray-700">{facility.rating}</span>
          <span>({facility.reviewCount}件)</span>
        </div>

        <p className="text-xs text-[#5BBDB3] font-medium mb-2 leading-snug">{facility.catchcopy}</p>

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
            <span key={d} className="text-xs bg-white border border-[#5BBDB3] text-[#5BBDB3] px-2 py-0.5 rounded-full">
              {d}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap gap-1 mb-4">
          {facility.supportTypes.slice(0, 3).map((s) => (
            <span key={s} className="text-xs bg-white border border-[#5BBDB3] text-[#5BBDB3] px-2 py-0.5 rounded-full">
              {s}
            </span>
          ))}
          {facility.supportTypes.length > 3 && (
            <span className="text-xs bg-[#F0FAFA] text-gray-400 px-2 py-0.5 rounded-full">
              +{facility.supportTypes.length - 3}
            </span>
          )}
        </div>

        {/* PC: text link / Mobile: › arrow */}
        <div className="flex items-center justify-between">
          <span className="hidden md:block text-[#5BBDB3] text-[13px] underline underline-offset-2 group-hover:text-[#4AAAA0] transition-colors">
            詳細を見る →
          </span>
          <span className="md:hidden ml-auto text-[#5BBDB3] text-[20px] leading-none">›</span>
        </div>
      </div>
    </Link>
  );
}
