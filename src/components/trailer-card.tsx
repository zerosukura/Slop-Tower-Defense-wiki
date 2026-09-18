"use client";

import Image from "next/image";

export function TrailerCard({ videoId, label }: { videoId: string; label: string }) {
  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&playsinline=1&modestbranding=1&rel=0`;

  return (
    <div className="group relative aspect-video w-full overflow-hidden rounded-2xl border border-border bg-black shadow-lg">
      <Image
        src="/images/hero-trailer-thumbnail.jpg"
        alt={label}
        fill
        sizes="(max-width: 768px) 100vw, 672px"
        className="object-cover"
        priority
      />
      <iframe
        src={embedUrl}
        title={label}
        allow="autoplay; encrypted-media; picture-in-picture"
        className="absolute inset-0 z-10 size-full border-0"
      />
      <span className="pointer-events-none absolute bottom-2.5 right-2.5 rounded-md bg-black/70 px-2 py-0.5 text-[11px] text-white">YouTube</span>
    </div>
  );
}
