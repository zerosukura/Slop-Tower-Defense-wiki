const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
const vercelSiteUrl = process.env.VERCEL_URL?.trim();
const vercelOrigin = vercelSiteUrl
  ? (/^https?:\/\//i.test(vercelSiteUrl) ? vercelSiteUrl : `https://${vercelSiteUrl}`)
  : undefined;

export const siteUrl = (configuredSiteUrl || vercelOrigin || "http://localhost:3001").replace(/\/+$/, "");

export const adsterraBannerKey = process.env.NEXT_PUBLIC_ADSTERRA_BANNER_320X50?.trim() || "";

export const gameConfig = {
  name: "Slop Tower Defense",
  wikiName: "Slop Tower Defense Wiki",
  shortName: "Slop Tower Defense",
  mark: "ST",
  robloxUrl: "https://www.roblox.com/games/134459712190924/Slop-Tower-Defense",
  discordUrl: "https://discord.gg/XNkXaMHVEW",
  youtubeVideoId: "LMRGSlDaIh8",
  heroImage: "/images/hero.webp",
  trailerLabel: "Slop Tower Defense Community Video",
  beginnerGuidePath: "/guide/slop-tower-defense-free-towers",
  tierListPath: "/tier-list/slop-tower-defense-tier-list",
  activeCode: "SLOP",
} as const;

export function localizePath(locale: string, pathname: string) {
  return locale === "en" ? pathname : `/${locale}${pathname === "/" ? "" : pathname}`;
}

export function absoluteUrl(pathname: string) {
  if (/^https?:\/\//i.test(pathname)) return pathname;
  return `${siteUrl}${pathname.startsWith("/") ? pathname : `/${pathname}`}`;
}

export function localizedAbsoluteUrl(locale: string, pathname: string) {
  return absoluteUrl(localizePath(locale, pathname));
}
