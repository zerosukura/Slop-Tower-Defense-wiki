import type { MetadataRoute } from "next";
import { getAllContent, type ContentItem } from "@/lib/content";
import { routing } from "@/i18n/routing";
import { localizedAbsoluteUrl } from "@/config/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static paths that always exist
  const staticPaths = ["/", "/guide", "/codes", "/units", "/tier-list", "/crafting", "/modes", "/updates", "/community", "/privacy-policy", "/terms-of-service", "/copyright", "/about"];

  // Dynamic paths and dates come from the actual English MDX metadata.
  const contentByType = await Promise.all(["guide", "codes", "units", "tier-list", "crafting", "modes", "updates", "community"].map((contentType) => getAllContent(contentType, "en")));
  const dynamicItems = contentByType.flat() as ContentItem[];
  const dynamicPaths = dynamicItems.map((item) => ({
    path: `/${[item.contentType, item.slug].join("/")}`,
    lastModified: item.metadata.lastModified || item.metadata.date,
  }));
  const paths: Array<{ path: string; lastModified?: string }> = [...staticPaths.map((path) => ({ path })), ...dynamicPaths];

  return routing.locales.flatMap((locale) =>
    paths.map(({ path, lastModified }) => ({
      url: localizedAbsoluteUrl(locale, path),
      ...(lastModified ? { lastModified } : {}),
      changeFrequency: path === "/" ? ("daily" as const) : ("weekly" as const),
      priority: path === "/" ? 1 : staticPaths.includes(path) ? 0.8 : 0.6,
    })),
  );
}
