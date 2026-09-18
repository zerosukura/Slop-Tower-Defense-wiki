import type { Metadata } from "next";
import { getLegalMetadata, LegalPage } from "@/components/legal-page";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return getLegalMetadata(locale, "copyright", "Copyright information for the independent Slop Tower Defense fan wiki.");
}

export default function CopyrightPage() {
  return (
    <LegalPage title="Copyright">
      <p>Slop Tower Defense, Roblox, related game names, logos, and media belong to their respective owners (Slop Tower Defense development team, Roblox Corporation).</p>
      <p>This is a non-official fan wiki for educational and guide purposes. We do not claim ownership of any game assets.</p>
      <p>If you own rights to content displayed here and have a concern, please contact the site operator for review.</p>
    </LegalPage>
  );
}
