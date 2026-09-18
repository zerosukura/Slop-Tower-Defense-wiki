import type { Metadata } from "next";
import { getLegalMetadata, LegalPage } from "@/components/legal-page";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return getLegalMetadata(locale, "terms-of-service", "Terms for using the independent Slop Tower Defense fan wiki.");
}

export default function TermsOfServicePage() {
  return (
    <LegalPage title="Terms of Service">
      <p>This site is an independent fan-made guide hub. Content is provided for informational and entertainment purposes only.</p>
      <p>Game systems, codes, drops, and update details may change without notice. Always verify important information in-game or through official channels.</p>
      <p>By using this site, you agree not to misuse it, attempt unauthorized access, or present this fan wiki as an official Slop Tower Defense or Roblox property.</p>
    </LegalPage>
  );
}
