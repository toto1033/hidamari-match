"use client";
import { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import Link from 'next/link';
import { Star } from 'lucide-react';
import type { Facility } from '@/types/facility';

function createPinIcon(color: string) {
  return L.divIcon({
    className: '',
    html: `
      <div style="
        width: 28px; height: 28px;
        border-radius: 50% 50% 50% 0;
        background: ${color};
        transform: rotate(-45deg);
        border: 2px solid white;
        box-shadow: 0 2px 6px rgba(0,0,0,0.35);
      "></div>
    `,
    iconSize: [28, 28],
    iconAnchor: [14, 28],
    popupAnchor: [0, -30],
  });
}

function FitBounds({ facilities }: { facilities: Facility[] }) {
  const map = useMap();
  const fitted = useRef(false);

  useEffect(() => {
    const points = facilities.filter((f) => f.lat && f.lng);
    if (points.length === 0 || fitted.current) return;
    if (points.length === 1) {
      map.setView([points[0].lat!, points[0].lng!], 13);
    } else {
      const bounds = L.latLngBounds(points.map((f) => [f.lat!, f.lng!]));
      map.fitBounds(bounds, { padding: [40, 40] });
    }
    fitted.current = true;
  }, [facilities, map]);

  return null;
}

export default function FacilityMap({ facilities }: { facilities: Facility[] }) {
  const withCoords = facilities.filter((f) => f.lat && f.lng);

  return (
    <MapContainer
      center={[36.5, 136.5]}
      zoom={5}
      style={{ height: '420px', width: '100%', borderRadius: '1rem', zIndex: 0 }}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <FitBounds facilities={withCoords} />
      {withCoords.map((f) => (
        <Marker
          key={f.id}
          position={[f.lat!, f.lng!]}
          icon={createPinIcon(f.imageColor)}
        >
          <Popup minWidth={220}>
            <div className="p-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-bold text-gray-900 text-sm leading-snug">{f.name}</span>
                <span
                  className={`text-xs font-semibold px-2 py-0.5 rounded-full whitespace-nowrap ${
                    f.vacancyCount > 0 ? 'text-green-600 bg-green-50' : 'text-red-500 bg-red-50'
                  }`}
                >
                  {f.vacancyCount > 0 ? `空き${f.vacancyCount}名` : '満員'}
                </span>
              </div>
              <p className="text-xs text-orange-500 mb-1">{f.catchcopy}</p>
              <div className="flex items-center gap-1 text-xs text-gray-500 mb-2">
                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                <span>{f.rating}</span>
                <span>({f.reviewCount}件)</span>
                <span className="mx-1">·</span>
                <span>{f.city}</span>
              </div>
              <Link
                href={`/facilities/${f.id}`}
                className="block text-center text-xs font-semibold text-white bg-orange-500 rounded-lg py-1.5 hover:bg-orange-600 transition-colors"
              >
                詳細を見る →
              </Link>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
