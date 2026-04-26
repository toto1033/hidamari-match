'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { HeroPhoto } from '@/data/heroPhotos';

const fallbackColors = [
  '#5BBDB3', '#4A9B8E', '#7BBFBA',
  '#3d8880', '#6ab5b0', '#9DD4CF',
  '#2e6e6a', '#8ccfc9',
];

function PhotoCard({ photo, index }: { photo: HeroPhoto; index: number }) {
  const [failed, setFailed] = useState(false);
  const color = fallbackColors[index % fallbackColors.length];
  const showImage = !failed && !!photo.imageSrc;

  return (
    <Link
      href={`/facilities/${photo.facilityId}`}
      style={{
        position: 'relative',
        width: '160px',
        height: '120px',
        borderRadius: '12px',
        overflow: 'hidden',
        flexShrink: 0,
        backgroundColor: color,
        display: 'block',
        textDecoration: 'none',
      }}
    >
      {showImage && (
        <Image
          src={photo.imageSrc}
          alt={photo.alt}
          fill
          style={{ objectFit: 'cover' }}
          onError={() => setFailed(true)}
        />
      )}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          background: 'linear-gradient(transparent, rgba(0,0,0,0.55))',
          padding: '18px 8px 6px',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          zIndex: 1,
        }}
      >
        <span
          style={{
            fontSize: '8px',
            color: 'rgba(255,255,255,0.92)',
            fontWeight: 500,
            lineHeight: 1.3,
          }}
        >
          {photo.facilityName}
        </span>
        <span
          style={{
            fontSize: '7px',
            background: 'rgba(255,255,255,0.2)',
            border: '1px solid rgba(255,255,255,0.4)',
            borderRadius: '6px',
            padding: '1px 5px',
            color: '#fff',
            whiteSpace: 'nowrap',
            flexShrink: 0,
          }}
        >
          詳細 →
        </span>
      </div>
    </Link>
  );
}

type Props = {
  photos: HeroPhoto[];
  direction: 'left' | 'right';
  speed?: number;
};

export default function MarqueeBand({ photos, direction, speed = 28 }: Props) {
  const doubled = [...photos, ...photos];

  return (
    <div style={{ overflow: 'hidden', height: '130px', width: '100%' }}>
      <div
        style={{
          display: 'flex',
          gap: '8px',
          width: 'max-content',
          padding: '5px 0',
          animation: `marquee-${direction} ${speed}s linear infinite`,
        }}
      >
        {doubled.map((photo, i) => (
          <PhotoCard key={i} photo={photo} index={i % photos.length} />
        ))}
      </div>
    </div>
  );
}
