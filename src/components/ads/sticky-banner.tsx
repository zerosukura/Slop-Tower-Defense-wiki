"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { AdBanner } from "./ad-banner";
import { adsterraBannerKey } from "@/config/site";

export function DismissibleStickyBanner() {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed || !adsterraBannerKey) return null;

  return (
    <div className="sticky top-20 z-20 py-2">
      <div className="relative mx-auto max-w-4xl pr-10">
        <AdBanner type="banner-320x50" adKey={adsterraBannerKey} eager />
        <button
          type="button"
          aria-label="Close ad"
          onClick={() => setDismissed(true)}
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full border bg-background/95 p-1 text-muted-foreground hover:text-foreground"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
