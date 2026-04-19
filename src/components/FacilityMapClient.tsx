"use client";
import dynamic from 'next/dynamic';
import type { Facility } from '@/types/facility';

const FacilityMap = dynamic(() => import('./FacilityMap'), { ssr: false });

export default function FacilityMapClient({ facilities }: { facilities: Facility[] }) {
  return <FacilityMap facilities={facilities} />;
}
