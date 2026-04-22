import Link from 'next/link';
import { MapPin, Clock, Star } from 'lucide-react';
import type { Facility } from '@/types/facility';

export default function FacilityCard({ facility }: { facility: Facility }) {
  const hasVacancy = facility.vacancyCount > 0;

  return (
    <Link
      href={`/facilities/${facility.id}`}
      className="block bg-white rounded-2xl border border-[#E8E3DF] overflow-hidden cursor-pointer group transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.10)]"
    >
      {/* Image area */}
      <div className="relative h-36">
        {facility.hasPhoto ? (
          <div className="h-full w-full bg-[#EDF8F7] flex items-center justify-center">
            <span className="text-[#5BBDB3] text-sm font-medium">施設写真</span>
          </div>
        ) : (
          <div
            className="h-full w-full flex items-center justify-center"
            style={{ backgroundColor: facility.imageColor }}
          >
            <span className="text-white/80 text-sm font-medium">No Image</span>
          </div>
        )}
        {/* Vacancy badge */}
        <span
          className={`absolute top-2 right-2 text-xs font-bold px-2.5 py-1 rounded-full ${
            hasVacancy ? 'bg-[#F5C842] text-[#2A2520]' : 'bg-[#FFE0E0] text-red-500'
          }`}
        >
          {hasVacancy ? `空き${facility.vacancyCount}名` : '満員'}
        </span>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Rating */}
        <div className="flex items-center gap-1 mb-1.5">
          <Star className="w-3.5 h-3.5 fill-[#F5C842] text-[#F5C842]" />
          <span className="font-nunito font-bold text-sm text-[#2A2520]">{facility.rating}</span>
          <span className="text-xs text-[#A89F98]">（{facility.reviewCount}件）</span>
        </div>

        <h3 className="font-[family-name:var(--font-round)] font-bold text-[#2A2520] text-sm leading-snug mb-1">
          {facility.name}
        </h3>
        <p className="text-xs text-[#5BBDB3] font-medium mb-2 leading-snug">{facility.catchcopy}</p>

        <div className="flex items-center gap-1 text-xs text-[#A89F98] mb-0.5">
          <MapPin className="w-3 h-3 shrink-0" />
          <span className="truncate">{facility.city}</span>
        </div>
        <div className="flex items-center gap-1 text-xs text-[#A89F98] mb-3">
          <Clock className="w-3 h-3 shrink-0" />
          <span>平日 {facility.weekdayHours}</span>
        </div>

        <div className="flex flex-wrap gap-1 mb-1">
          {facility.disabilities.slice(0, 2).map((d) => (
            <span
              key={d}
              className="text-xs bg-white border border-[#5BBDB3] text-[#5BBDB3] px-2 py-0.5 rounded-full"
            >
              {d}
            </span>
          ))}
        </div>
        <div className="flex flex-wrap gap-1 mb-4">
          {facility.supportTypes.slice(0, 2).map((s) => (
            <span
              key={s}
              className="text-xs bg-white border border-[#5BBDB3] text-[#5BBDB3] px-2 py-0.5 rounded-full"
            >
              {s}
            </span>
          ))}
          {facility.supportTypes.length > 2 && (
            <span className="text-xs bg-[#EDF8F7] text-[#7A6E65] px-2 py-0.5 rounded-full">
              +{facility.supportTypes.length - 2}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between text-xs text-[#7A6E65]">
          <span>定員 {facility.capacity}名</span>
          <span className="hidden md:block text-[#5BBDB3] text-[13px] underline underline-offset-2 group-hover:text-[#4AAAA0] transition-colors">
            詳細を見る →
          </span>
          <span className="md:hidden text-[#5BBDB3] text-xl leading-none">›</span>
        </div>
      </div>
    </Link>
  );
}
