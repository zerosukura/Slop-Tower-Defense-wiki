import { BookOpen, Code2, LayoutGrid, Swords, Trophy, Zap, Users } from "lucide-react";

type NavigationItem = { key: string; path: string; icon: typeof BookOpen; isContentType: boolean };

export const NAVIGATION_CONFIG: readonly NavigationItem[] = [
  { key: "guide", path: "/guide", icon: BookOpen, isContentType: true },
  { key: "codes", path: "/codes", icon: Code2, isContentType: true },
  { key: "units", path: "/units", icon: LayoutGrid, isContentType: true },
  { key: "tierList", path: "/tier-list", icon: Trophy, isContentType: true },
  { key: "crafting", path: "/crafting", icon: Swords, isContentType: true },
  { key: "modes", path: "/modes", icon: LayoutGrid, isContentType: true },
  { key: "updates", path: "/updates", icon: Zap, isContentType: true },
  { key: "community", path: "/community", icon: Users, isContentType: true },
];

export const CONTENT_TYPES = NAVIGATION_CONFIG.filter((item) => item.isContentType).map((item) => item.path.replace(/^\//, ""));
