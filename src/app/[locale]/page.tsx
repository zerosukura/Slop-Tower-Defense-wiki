import type { Metadata } from "next";
import { getMessages } from "next-intl/server";
import { JsonLd, WikiSidebar } from "@/components/site";
import { getAllContent, getDynamicNavigation, type ContentItem, CONTENT_TYPES } from "@/lib/content";
import { routing, type Locale } from "@/i18n/routing";
import en from "@/locales/en.json";
import HomePageClient from "./HomePageClient";
import { DismissibleStickyBanner } from "@/components/ads/sticky-banner";
import { absoluteUrl, gameConfig, localizedAbsoluteUrl } from "@/config/site";

const siteName = gameConfig.wikiName;
const siteDescription = "Complete Slop Tower Defense fan wiki with codes, free tower guides, unit notes, tier lists, crafting tips, and updates for Roblox players.";

type Messages = typeof en;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const messages = (await getMessages({ locale })) as Messages;
  const title = messages.home.meta.title;
  const description = messages.home.meta.description;
  return {
    title,
    description,
    alternates: { canonical: locale === "en" ? "/" : `/${locale}`, languages: { ...Object.fromEntries(routing.locales.map((l) => [l, l === "en" ? "/" : `/${l}`])), "x-default": "/" } },
    openGraph: { title, description, url: localizedAbsoluteUrl(locale, "/"), images: [{ url: absoluteUrl(gameConfig.heroImage), width: 498, height: 280, alt: gameConfig.name }] },
    twitter: { card: "summary_large_image", title, description, images: [absoluteUrl(gameConfig.heroImage)] },
  };
}

export default async function LocaleHomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const loc = locale as Locale;
  const messages = (await getMessages({ locale })) as Messages;
  const navGroups = getDynamicNavigation(loc);
  const webSite = { "@context": "https://schema.org", "@type": "WebSite", name: siteName, url: localizedAbsoluteUrl(locale, "/"), description: siteDescription };

  // 动态加载所有 content 目录下的文章
  const allArticles: ContentItem[] = [];
  for (const contentType of CONTENT_TYPES) {
    const items = await getAllContent(contentType, loc);
    allArticles.push(...items);
  }

  // 取最近更新的 8 篇文章（按 date 倒序）
  const recentArticles = [...allArticles]
    .sort((a, b) => {
      const dateA = a.metadata.lastModified || a.metadata.date;
      const dateB = b.metadata.lastModified || b.metadata.date;
      return dateB.localeCompare(dateA);
    })
    .slice(0, 8);

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <JsonLd data={webSite} />
      <DismissibleStickyBanner />
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_300px]">
      <HomePageClient home={messages.home} locale={locale} articles={allArticles} recentArticles={recentArticles} closeLabel={messages.shared.close} readFullGuide={messages.shared.readFullGuide} watchOnYoutube={messages.shared.watchOnYoutube} />
        <WikiSidebar locale={locale} navGroups={navGroups} />
      </div>
    </main>
  );
}
