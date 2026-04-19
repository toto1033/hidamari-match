import Link from "next/link";
import { MapPin, Clock, Star, Users } from "lucide-react";
import type { Service } from "@/lib/data";

export default function ServiceCard({ service }: { service: Service }) {
  const slotsColor =
    service.availableSlots === 0
      ? "text-red-500 bg-red-50"
      : service.availableSlots <= 2
      ? "text-yellow-600 bg-yellow-50"
      : "text-green-600 bg-green-50";

  const slotsLabel =
    service.availableSlots === 0
      ? "満員"
      : `空き ${service.availableSlots}名`;

  return (
    <Link href={`/services/${service.id}`}>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md hover:-translate-y-1 transition-all duration-200 cursor-pointer">
        <div className={`h-32 bg-gradient-to-br ${service.imageColor} flex items-center justify-center`}>
          <span className="text-white text-4xl font-bold opacity-30">
            {service.name.charAt(0)}
          </span>
        </div>

        <div className="p-4">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="font-bold text-gray-900 text-sm leading-snug">{service.name}</h3>
            <span className={`text-xs font-semibold px-2 py-1 rounded-full whitespace-nowrap ${slotsColor}`}>
              {slotsLabel}
            </span>
          </div>

          <p className="text-xs text-orange-500 font-medium mb-2">{service.catchphrase}</p>

          <div className="flex items-center gap-1 text-xs text-gray-500 mb-3">
            <MapPin className="w-3 h-3" />
            <span>{service.city}</span>
            <span className="mx-1">·</span>
            <Clock className="w-3 h-3" />
            <span>{service.openTime}〜{service.closeTime}</span>
          </div>

          <div className="flex flex-wrap gap-1 mb-3">
            {service.disabilities.map((d) => (
              <span key={d} className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full">{d}</span>
            ))}
          </div>

          <div className="flex flex-wrap gap-1 mb-3">
            {service.features.slice(0, 3).map((f) => (
              <span key={f} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{f}</span>
            ))}
            {service.features.length > 3 && (
              <span className="text-xs bg-gray-100 text-gray-400 px-2 py-0.5 rounded-full">+{service.features.length - 3}</span>
            )}
          </div>

          <div className="flex items-center gap-1 text-xs text-gray-500 border-t pt-3">
            <Users className="w-3 h-3" />
            <span>定員 {service.capacity}名</span>
            <span className="mx-1">·</span>
            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
            <span className="font-medium text-gray-700">{service.rating}</span>
            <span>({service.reviewCount}件)</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
