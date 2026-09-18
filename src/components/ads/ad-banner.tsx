const AD_SIZES: Record<string, { file: string; width: number; height: number }> = {
  "banner-320x50": { file: "/ads/banner-320x50.html", width: 320, height: 50 },
};

export function AdBanner({ type, adKey, eager }: { type: string; adKey?: string; eager?: boolean }) {
  if (!adKey?.trim()) return null;
  const size = AD_SIZES[type];
  if (!size) return null;

  return (
    <div className="flex justify-center">
      <iframe
        src={`${size.file}?key=${encodeURIComponent(adKey.trim())}`}
        width={size.width}
        height={size.height}
        scrolling="no"
        loading={eager ? "eager" : "lazy"}
        style={{ border: "none" }}
        title="Advertisement"
      />
    </div>
  );
}
