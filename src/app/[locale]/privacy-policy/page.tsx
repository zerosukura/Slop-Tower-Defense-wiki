import type { Metadata } from "next";
import { getLegalMetadata, LegalPage } from "@/components/legal-page";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return getLegalMetadata(locale, "privacy-policy", "Privacy information for the independent Slop Tower Defense fan wiki.");
}

export default function PrivacyPolicyPage() {
  return (
    <LegalPage title="Privacy Policy">
      <p>This fan wiki provides informational game guides for Slop Tower Defense on Roblox. We do not request account credentials, Roblox passwords, or private payment information.</p>
      <p>Basic analytics, advertising, and hosting providers may process standard technical information such as device type, browser, approximate region, and visited pages.</p>
      <p>External links may lead to Roblox, Discord, YouTube, or community tools. Those services are governed by their own privacy policies.</p>
    </LegalPage>
  );
}
