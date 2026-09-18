import type { Metadata, Viewport } from "next";
import { hasLocale } from "next-intl";
import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { ThemeProvider } from "next-themes";
import { JsonLd, SiteFooter, SiteHeader } from "@/components/site";
import { buildSearchIndex } from "@/lib/search-index";
import { routing, type Locale } from "@/i18n/routing";
import { absoluteUrl, gameConfig, localizedAbsoluteUrl, siteUrl } from "@/config/site";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const image = absoluteUrl(gameConfig.heroImage);
  return {
    metadataBase: new URL(siteUrl),
    title: { default: gameConfig.wikiName, template: `%s | ${gameConfig.wikiName}` },
    description: "Complete Slop Tower Defense fan wiki with codes, free tower guides, unit notes, tier lists, crafting tips, and updates for Roblox players.",
    icons: {
      icon: [
        { url: "/favicon.svg", type: "image/svg+xml" },
        { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
        { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      ],
      apple: "/apple-touch-icon.png",
      shortcut: "/favicon.svg",
    },
    manifest: "/manifest.json",
    openGraph: { type: "website", locale, url: localizedAbsoluteUrl(locale, "/"), siteName: gameConfig.wikiName, images: [{ url: image, width: 498, height: 280, alt: gameConfig.name }] },
    twitter: { card: "summary_large_image", title: gameConfig.wikiName, description: "Codes, free towers, units, crafting, updates, and community guides for Slop Tower Defense on Roblox.", images: [image] },
  };
}

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  const messages = await getMessages();
  const searchIndex = await buildSearchIndex(locale as Locale);
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: gameConfig.wikiName,
    url: localizedAbsoluteUrl(locale, "/"),
    logo: absoluteUrl("/android-chrome-512x512.png"),
    image: absoluteUrl(gameConfig.heroImage),
  };

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans text-foreground antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <NextIntlClientProvider messages={messages}>
            <JsonLd data={organization} />
            <SiteHeader locale={locale} searchIndex={searchIndex} />
            {children}
            <SiteFooter locale={locale} />
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
