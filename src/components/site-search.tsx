"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { Search, X } from "lucide-react";

export interface SearchEntry {
  title: string;
  description: string;
  category: string;
  href: string;
}

export function SiteSearch({ index, labels }: { index: SearchEntry[]; labels: { button: string; placeholder: string; noResults: string; close: string } }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    const terms = q.split(/\s+/);
    const scored = index
      .map((entry) => {
        const title = entry.title.toLowerCase();
        const haystack = `${title} ${entry.description.toLowerCase()} ${entry.category.toLowerCase()}`;
        if (!terms.every((t) => haystack.includes(t))) return null;
        let score = 0;
        for (const t of terms) {
          if (title.startsWith(t)) score += 4;
          else if (title.includes(t)) score += 2;
          else score += 1;
        }
        return { entry, score };
      })
      .filter((r): r is { entry: SearchEntry; score: number } => r !== null)
      .sort((a, b) => b.score - a.score)
      .slice(0, 8);
    return scored.map((r) => r.entry);
  }, [query, index]);

  const close = () => {
    setOpen(false);
    setQuery("");
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={labels.button}
        className="flex items-center gap-2 rounded-lg border border-border bg-muted/50 px-3 py-2 text-sm text-muted-foreground transition hover:bg-muted hover:text-foreground"
      >
        <Search className="h-4 w-4" />
        <span className="hidden lg:inline">{labels.button}</span>
      </button>

      {open && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center bg-black/60 backdrop-blur-sm p-4 pt-[12vh]" onClick={close}>
          <div className="w-full max-w-xl overflow-hidden rounded-2xl border border-border bg-background shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-3 border-b border-border px-4">
              <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={labels.placeholder}
                className="w-full bg-transparent py-4 text-sm text-foreground outline-none placeholder:text-muted-foreground"
              />
              <button type="button" onClick={close} aria-label={labels.close} className="shrink-0 text-muted-foreground hover:text-foreground">
                <X className="h-4 w-4" />
              </button>
            </div>
            {query.trim() && (
              <div className="max-h-[60vh] overflow-y-auto">
                {results.length === 0 ? (
                  <p className="px-4 py-6 text-center text-sm text-muted-foreground">{labels.noResults}</p>
                ) : (
                  <ul className="py-2">
                    {results.map((entry) => (
                      <li key={entry.href}>
                        <Link href={entry.href} onClick={close} className="block px-4 py-3 transition hover:bg-muted">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold text-foreground">{entry.title}</span>
                            <span className="rounded bg-muted px-1.5 py-0.5 text-[10px] uppercase tracking-wide text-muted-foreground">{entry.category}</span>
                          </div>
                          <p className="mt-0.5 line-clamp-1 text-xs text-muted-foreground">{entry.description}</p>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
