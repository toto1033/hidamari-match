'use client';

import { useRef, useEffect, useState } from 'react';
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
  const trackRef = useRef<HTMLDivElement>(null);
  const isPaused = useRef(false);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollStart = useRef(0);
  const rafRef = useRef<number>(0);

  // Auto-scroll loop via requestAnimationFrame
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const halfWidth = track.scrollWidth / 2;
    // speed = seconds to scroll through one full set of photos
    const pxPerSec = halfWidth / speed;

    if (direction === 'right') {
      track.scrollLeft = halfWidth;
    }

    let lastTime = 0;
    const animate = (now: number) => {
      if (lastTime && !isPaused.current && !isDragging.current) {
        const dt = now - lastTime;
        const delta = (pxPerSec * dt) / 1000;

        if (direction === 'left') {
          track.scrollLeft += delta;
          if (track.scrollLeft >= halfWidth) {
            track.scrollLeft -= halfWidth;
          }
        } else {
          track.scrollLeft -= delta;
          if (track.scrollLeft <= 0) {
            track.scrollLeft += halfWidth;
          }
        }
      }
      lastTime = now;
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [direction, speed]);

  // Window-level listeners to handle drag released outside the component
  useEffect(() => {
    const handleWindowMouseMove = (e: MouseEvent) => {
      if (!isDragging.current || !trackRef.current) return;
      trackRef.current.scrollLeft = scrollStart.current - (e.pageX - startX.current);
    };
    const handleWindowMouseUp = () => {
      if (!isDragging.current) return;
      isDragging.current = false;
      isPaused.current = false;
      if (trackRef.current) trackRef.current.style.cursor = 'grab';
    };
    window.addEventListener('mousemove', handleWindowMouseMove);
    window.addEventListener('mouseup', handleWindowMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleWindowMouseMove);
      window.removeEventListener('mouseup', handleWindowMouseUp);
    };
  }, []);

  const onMouseEnter = () => { isPaused.current = true; };
  const onMouseLeave = () => { if (!isDragging.current) isPaused.current = false; };

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    isDragging.current = true;
    isPaused.current = true;
    startX.current = e.pageX;
    scrollStart.current = trackRef.current?.scrollLeft ?? 0;
    if (trackRef.current) trackRef.current.style.cursor = 'grabbing';
    e.preventDefault();
  };

  const onTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    isDragging.current = true;
    isPaused.current = true;
    startX.current = e.touches[0].pageX;
    scrollStart.current = trackRef.current?.scrollLeft ?? 0;
  };

  const onTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging.current || !trackRef.current) return;
    trackRef.current.scrollLeft = scrollStart.current - (e.touches[0].pageX - startX.current);
  };

  const onTouchEnd = () => {
    isDragging.current = false;
    isPaused.current = false;
  };

  return (
    <div style={{ overflow: 'hidden', height: '130px', width: '100%' }}>
      <div
        ref={trackRef}
        className="marquee-track"
        style={{
          display: 'flex',
          gap: '8px',
          overflowX: 'scroll',
          padding: '5px 0',
          cursor: 'grab',
          userSelect: 'none',
          WebkitUserSelect: 'none',
          height: '100%',
        }}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onMouseDown={onMouseDown}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {doubled.map((photo, i) => (
          <PhotoCard key={i} photo={photo} index={i % photos.length} />
        ))}
      </div>
    </div>
  );
}
