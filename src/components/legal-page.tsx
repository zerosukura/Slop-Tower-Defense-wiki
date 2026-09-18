import type { Metadata } from "next";
import { absoluteUrl, gameConfig, localizePath, localizedAbsoluteUrl } from "@/config/site";
import { routing } from "@/i18n/routing";

const LEGAL_TITLES: Record<string, Record<string, string>> = {
  about: { en: "About", pt: "Sobre", es: "Acerca de", de: "Über uns" },
  copyright: { en: "Copyright", pt: "Direitos Autorais", es: "Derechos de Autor", de: "Urheberrecht" },
  "privacy-policy": { en: "Privacy Policy", pt: "Política de Privacidade", es: "Política de Privacidad", de: "Datenschutz" },
  "terms-of-service": { en: "Terms of Service", pt: "Termos de Serviço", es: "Términos de Servicio", de: "Nutzungsbedingungen" },
};

export function getLegalMetadata(locale: string, pathname: keyof typeof LEGAL_TITLES, description: string): Metadata {
  const title = LEGAL_TITLES[pathname]?.[locale] ?? LEGAL_TITLES[pathname]?.en ?? pathname;
  const canonical = localizePath(locale, `/${pathname}`);
  const languages = Object.fromEntries(routing.locales.map((language) => [language, localizePath(language, `/${pathname}`)]));
  languages["x-default"] = `/${pathname}`;

  return {
    title,
    description,
    alternates: { canonical, languages },
    openGraph: {
      title: `${title} | ${gameConfig.wikiName}`,
      description,
      url: localizedAbsoluteUrl(locale, `/${pathname}`),
      images: [{ url: absoluteUrl(gameConfig.heroImage), width: 498, height: 280, alt: gameConfig.name }],
    },
  };
}

export function LegalPage({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <article className="rounded-3xl border border-border bg-card/70 p-6 sm:p-8">
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground">{title}</h1>
        <div className="mt-8 space-y-5 leading-8 text-muted-foreground">{children}</div>
      </article>
    </main>
  );
}
