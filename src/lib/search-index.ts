import "server-only";
import { getAllContent, CONTENT_TYPES } from "@/lib/content";
import type { Locale } from "@/i18n/routing";
import type { SearchEntry } from "@/components/site-search";

function localizeHref(href: string, locale: string) {
  if (locale === "en") return href;
  return `/${locale}${href === "/" ? "" : href}`;
}

export async function buildSearchIndex(locale: Locale): Promise<SearchEntry[]> {
  const lists = await Promise.all(CONTENT_TYPES.map((type) => getAllContent(type, locale)));
  return lists.flat().map((item) => ({
    title: item.metadata.title,
    description: item.metadata.description,
    category: item.contentType,
    href: localizeHref(`/${item.contentType}/${item.slug}`, locale),
  }));
}
