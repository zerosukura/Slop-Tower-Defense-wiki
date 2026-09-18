"use client";

import { Play } from "lucide-react";
import Image from "next/image";

export function TrailerCard({ label, watchLabel }: { label: string; watchLabel: string }) {
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
      <span className="absolute bottom-3 left-3 inline-flex items-center gap-2 rounded-lg bg-black/75 px-3 py-2 text-sm font-semibold text-white shadow-lg ring-1 ring-white/25">
        <Play className="size-4 fill-current" />
        {watchLabel}
      </span>
      <span className="pointer-events-none absolute bottom-2.5 right-2.5 rounded-md bg-black/70 px-2 py-0.5 text-[11px] text-white">YouTube</span>
    </div>
  );
}
