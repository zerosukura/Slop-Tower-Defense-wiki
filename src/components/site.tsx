import Link from "next/link";
import { ChevronRight, ExternalLink, Menu, X } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { NAVIGATION_CONFIG } from "@/config/navigation";
import type { NavGroup } from "@/lib/content";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { CollapsibleNavGroup } from "@/components/collapsible-nav-group";
import { LanguageSwitcher } from "@/components/language-switcher";
import { ClientThemeToggle } from "@/components/theme-toggle";
import { SiteSearch, type SearchEntry } from "@/components/site-search";
import { gameConfig, localizePath } from "@/config/site";
import { TrailerCard } from "@/components/trailer-card";

export function localizeHref(href: string, locale: string) {
  return localizePath(locale, href);
}

export async function SiteHeader({ locale, searchIndex }: { locale: string; searchIndex: SearchEntry[] }) {
  const t = await getTranslations({ locale, namespace: "nav" });
  const shared = await getTranslations({ locale, namespace: "shared" });
  const searchLabels = { button: shared("searchButton"), placeholder: shared("searchPlaceholder"), noResults: shared("searchNoResults"), close: shared("close") };
  const header = (
    <div className="flex items-center justify-between gap-4">
      <Link href={localizeHref("/", locale)} className="flex items-center gap-3">
        <span className="grid h-9 w-9 place-items-center rounded-xl border border-border bg-muted text-sm font-black text-foreground">{gameConfig.mark}</span>
        <span className="text-sm font-bold tracking-wide text-foreground">{gameConfig.name}</span>
      </Link>
      <nav className="hidden items-center gap-1 md:flex">
        {NAVIGATION_CONFIG.map((item) => (
          <Link key={item.key} href={localizeHref(item.path, locale)} className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition hover:bg-muted hover:text-foreground">
            {t(item.key)}
          </Link>
        ))}
      </nav>
      <div className="flex items-center gap-2">
        <SiteSearch index={searchIndex} labels={searchLabels} />
        <LanguageSwitcher locale={locale} />
        <ThemeToggle label={t("toggleTheme")} />
        <Sheet>
          <SheetTrigger asChild className="md:hidden"><Button variant="outline" size="icon" aria-label={t("menu")}><Menu className="h-4 w-4" /></Button></SheetTrigger>
          <SheetContent className="border-border bg-background text-foreground">
            <div className="mt-8 grid gap-2">
              {NAVIGATION_CONFIG.map((item) => <Link key={item.key} href={localizeHref(item.path, locale)} className="rounded-lg px-3 py-3 text-sm font-semibold hover:bg-muted">{t(item.key)}</Link>)}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
  return <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-xl"><div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">{header}</div></header>;
}

function ThemeToggle({ label }: { label: string }) {
  return <ClientThemeToggle label={label} />;
}

export function Breadcrumbs({ items }: { items: { label: string; href?: string }[] }) {
  return <nav className="mb-7 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">{items.map((item, index) => <span key={`${item.label}-${index}`} className="flex items-center gap-2">{index > 0 && <ChevronRight className="h-4 w-4" />}{item.href ? <Link className="hover:text-foreground" href={item.href}>{item.label}</Link> : <span className="text-foreground">{item.label}</span>}</span>)}</nav>;
}

export async function WikiSidebar({ locale, navGroups, currentPath }: { locale: string; navGroups: NavGroup[]; currentPath?: string }) {
  const t = await getTranslations({ locale, namespace: "shared" });
  const isActive = (href: string) => currentPath === href;
  return <aside className="space-y-6 lg:sticky lg:top-24 lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto lg:pr-1"><section className="rounded-2xl border border-border bg-card/60 p-5 shadow-sm"><h3 className="mb-4 text-xs font-bold uppercase tracking-[0.22em] text-muted-foreground">{t("wikiNavigation")}</h3><div className="space-y-4">{navGroups.map((group) => <CollapsibleNavGroup key={group.slug} title={group.title} icon={<span className="grid h-4 w-4 place-items-center rounded text-[10px] font-bold text-[hsl(var(--nav-theme))]">{group.title[0]}</span>} count={group.count} currentPath={currentPath}><ul className="space-y-1">{group.links.map((link) => <li key={link.href}><Link href={localizeHref(link.href, locale)} className={`flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm transition-colors ${isActive(link.href) ? "bg-[hsl(var(--nav-theme)/0.15)] font-semibold text-[hsl(var(--nav-theme))]" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}><span className="truncate">{link.label}</span>{link.badge && <Badge variant="secondary" className="ml-auto h-5 border-border px-1.5 text-[10px]">{link.badge}</Badge>}</Link></li>)}</ul></CollapsibleNavGroup>)}</div></section><section className="rounded-2xl border border-border bg-card/60 p-5"><h3 className="mb-3 text-sm font-bold text-foreground">{t("activeCodes")}</h3><div className="space-y-3 text-sm"><div className="rounded-xl bg-muted p-3"><code className="font-bold text-foreground">{gameConfig.activeCode}</code><p className="mt-1 text-muted-foreground">{t("activeCodeHint")}</p></div><Link href={localizeHref("/codes", locale)} className="inline-flex items-center gap-1 text-sm font-semibold text-[hsl(var(--nav-theme))]">{t("viewAllCodes")} <ChevronRight className="h-4 w-4" /></Link></div></section></aside>;
}

export async function SiteFooter({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "footer" });
  const site = await getTranslations({ locale, namespace: "site" });
  return <footer className="mt-16 border-t border-border bg-card/30"><div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8"><div className="mb-10 rounded-2xl border border-border bg-muted/40 p-5"><div className="font-bold text-foreground">{gameConfig.wikiName}</div><p className="mt-1 text-sm text-muted-foreground">{t("description")}</p><a href={gameConfig.robloxUrl} target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-[hsl(var(--nav-theme))]">{t("playGame")} <ExternalLink className="h-4 w-4" /></a></div><p className="mb-8 text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">{site("legalNotice")}</p><div className="grid gap-8 md:grid-cols-4"><div className="md:col-span-2"><h3 className="font-bold text-foreground">{t("aboutTitle")}</h3><p className="mt-3 max-w-xl text-sm leading-7 text-muted-foreground">{t("about")}</p></div><FooterList title={t("quickLinks")} locale={locale} links={[[t("playGame"), gameConfig.robloxUrl], [t("officialDiscord"), gameConfig.discordUrl], [t("officialYoutube"), `https://www.youtube.com/watch?v=${gameConfig.youtubeVideoId}`]]} /><FooterList title={t("guides")} locale={locale} links={[[t("beginnerGuide"), gameConfig.beginnerGuidePath], [t("tierList"), gameConfig.tierListPath], [t("privacyPolicy"), "/privacy-policy"], [t("termsOfService"), "/terms-of-service"]]} /></div><p className="mt-10 border-t border-border pt-6 text-xs text-muted-foreground">{t("copyright")}</p></div></footer>;
}

function FooterList({ title, locale, links }: { title: string; locale: string; links: string[][] }) { return <div><h4 className="font-semibold text-foreground">{title}</h4><ul className="mt-3 space-y-2 text-sm text-muted-foreground">{links.map(([label, href]) => <li key={href}>{href.startsWith("http") ? <a className="hover:text-foreground" href={href} target="_blank" rel="noreferrer">{label}</a> : <Link className="hover:text-foreground" href={localizeHref(href, locale)}>{label}</Link>}</li>)}</ul></div>; }

export function TrailerDialog({ closeLabel, title }: { closeLabel: string; title: string }) {
  return (
    <dialog id="trailer-dialog" style={{ width: "100vw", height: "100dvh", maxWidth: "100vw", maxHeight: "100dvh" }} className="fixed inset-0 z-[100] flex items-center justify-center border-0 bg-black/80 p-4 backdrop-blur-sm opacity-0 pointer-events-none transition-opacity duration-200" onClose={() => { const frame = document.getElementById("trailer-iframe") as HTMLIFrameElement; frame.src = "about:blank"; const d = document.getElementById("trailer-dialog") as HTMLDialogElement; d.classList.add("opacity-0", "pointer-events-none"); d.classList.remove("opacity-100", "pointer-events-auto"); }} onClick={(e) => { const d = document.getElementById("trailer-dialog") as HTMLDialogElement; if (e.target === d) d.close(); }}>
      <div className="relative w-full max-w-4xl mx-4">
        <iframe id="trailer-iframe" className="aspect-video w-full rounded-xl" title={title} allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen />
        <button aria-label={closeLabel} className="absolute -top-10 right-0 inline-flex items-center gap-2 text-sm font-medium text-white/80 hover:text-white" onClick={() => { (document.getElementById("trailer-dialog") as HTMLDialogElement).close(); }}><X className="size-4" />{closeLabel}</button>
      </div>
    </dialog>
  );
}

export function TrailerButton({ videoId, label, closeLabel }: { videoId: string; label: string; closeLabel: string }) {
  return (
    <>
      <div className="relative">
          <TrailerCard videoId={videoId} label={label} />
          <button
            type="button"
            className="absolute inset-0 z-20 block w-full rounded-2xl text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--nav-theme-light))] focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            aria-label={label}
            aria-haspopup="dialog"
            onClick={() => { const d = document.getElementById("trailer-dialog") as HTMLDialogElement; const f = document.getElementById("trailer-iframe") as HTMLIFrameElement; f.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`; d.showModal(); d.classList.remove("opacity-0", "pointer-events-none"); d.classList.add("opacity-100", "pointer-events-auto"); }}
          >
            <span className="sr-only">{label}</span>
          </button>
      </div>
      <TrailerDialog title={label} closeLabel={closeLabel} />
    </>
  );
}

export function JsonLd({ data }: { data: unknown }) { return <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />; }
