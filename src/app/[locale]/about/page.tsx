import type { Metadata } from "next";
import { getLegalMetadata, LegalPage } from "@/components/legal-page";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return getLegalMetadata(locale, "about", "About the independent Slop Tower Defense fan wiki and its guide coverage.");
}

export default function AboutPage() {
  return (
    <LegalPage title="About">
      <p>Slop Tower Defense Wiki is an independent fan-built guide hub covering codes, free towers, units, crafting, game modes, updates, and essential gameplay knowledge for new and veteran players alike.</p>
      <p>This site is not affiliated with the Slop Tower Defense development team or Roblox. All game content belongs to its respective owners.</p>
    </LegalPage>
  );
}
