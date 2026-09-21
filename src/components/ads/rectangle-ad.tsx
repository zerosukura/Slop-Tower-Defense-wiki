import { adsterraRectangleKey } from "@/config/site";
import { AdBanner } from "./ad-banner";

export function InArticleRectangleAd() {
  if (!adsterraRectangleKey) return null;

  return (
    <div className="my-8 flex justify-center overflow-hidden" aria-label="Advertisement">
      <AdBanner type="banner-300x250" adKey={adsterraRectangleKey} />
    </div>
  );
}
