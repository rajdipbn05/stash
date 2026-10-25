import { THEME_PRESETS } from "@/lib/themes";
import type { Block, Product, Profile } from "@/lib/types";

// Made-up creators used while we build the screens. Only lib/data/ reads
// this file; once Supabase is connected, this file can be deleted.

export const SAMPLE_PROFILES: Profile[] = [
  {
    id: "p_maya",
    username: "maya",
    displayName: "Maya Rivers",
    bio: "Illustrator & planner nerd. Templates, brushes and guides to help you make your own things.",
    avatarUrl: "/sample/avatar-maya.svg",
    theme: THEME_PRESETS.cream.theme,
    createdAt: "2026-09-01T10:00:00Z",
  },
  {
    id: "p_leo",
    username: "leo",
    displayName: "Leo Marsh",
    bio: "Strength coach. Simple plans, real food, no fads.",
    avatarUrl: "/sample/avatar-leo.svg",
    theme: THEME_PRESETS.midnight.theme,
    createdAt: "2026-09-12T08:30:00Z",
  },
];

export const SAMPLE_PRODUCTS: Product[] = [
  {
    id: "pr_planner",
    profileId: "p_maya",
    slug: "weekly-planner",
    title: "The Calm Weekly Planner (Notion template)",
    description:
      "A gentle weekly planner for Notion. Plan your week in 10 minutes, track habits, and keep all your project notes in one place.\n\nIncludes a quick-start video and a light and dark version.",
    price: 1200,
    currency: "USD",
    coverUrl: "/sample/cover-planner.svg",
    isActive: true,
  },
  {
    id: "pr_brushes",
    profileId: "p_maya",
    slug: "procreate-brush-pack",
    title: "Soft Grain Brush Pack for Procreate",
    description:
      "24 hand-made brushes for soft, grainy illustrations: pencils, inks, textures and stamps.\n\nWorks with Procreate 5 and later.",
    price: 800,
    currency: "USD",
    coverUrl: "/sample/cover-brushes.svg",
    isActive: true,
  },
  {
    id: "pr_guide",
    profileId: "p_maya",
    slug: "freelance-pricing-guide",
    title: "How I Price Freelance Illustration (PDF guide)",
    description:
      "The exact way I work out prices for commissions, licensing and rush jobs, with email templates you can copy.\n\n38 pages, PDF.",
    price: 1950,
    currency: "USD",
    coverUrl: "/sample/cover-guide.svg",
    isActive: true,
  },
  {
    id: "pr_strength",
    profileId: "p_leo",
    slug: "12-week-strength",
    title: "12-Week Strength Plan",
    description:
      "Three workouts a week, with a printable tracker and video demos for every lift.\n\nFor beginners and returning lifters.",
    price: 2900,
    currency: "USD",
    coverUrl: "/sample/cover-strength.svg",
    isActive: true,
  },
];

let nextId = 0;
function block<T extends Block["type"]>(
  profileId: string,
  type: T,
  data: Extract<Block, { type: T }>["data"],
  isVisible = true,
): Block {
  nextId += 1;
  return { id: `b_${nextId}`, profileId, type, data, position: nextId, isVisible } as Block;
}

export const SAMPLE_BLOCKS: Block[] = [
  block("p_maya", "social", { platform: "instagram", url: "https://instagram.com/" }),
  block("p_maya", "social", { platform: "tiktok", url: "https://tiktok.com/" }),
  block("p_maya", "social", { platform: "youtube", url: "https://youtube.com/" }),
  block("p_maya", "social", { platform: "email", url: "mailto:hello@example.com" }),
  block("p_maya", "link", { title: "Watch my latest process video", url: "https://youtube.com/" }),
  block("p_maya", "link", { title: "Commission me (2 spots open)", url: "https://example.com/commissions" }),
  block("p_maya", "header", { text: "Shop" }),
  block("p_maya", "product", { productId: "pr_planner" }),
  block("p_maya", "product", { productId: "pr_brushes" }),
  block("p_maya", "product", { productId: "pr_guide" }),
  block("p_maya", "header", { text: "Elsewhere" }),
  block("p_maya", "link", { title: "My print shop", url: "https://example.com/prints" }),
  block("p_maya", "text", { text: "Thanks for stopping by! New brushes every month." }),
  block("p_maya", "link", { title: "Old portfolio (hidden)", url: "https://example.com/old" }, false),

  block("p_leo", "social", { platform: "instagram", url: "https://instagram.com/" }),
  block("p_leo", "social", { platform: "youtube", url: "https://youtube.com/" }),
  block("p_leo", "social", { platform: "spotify", url: "https://spotify.com/" }),
  block("p_leo", "product", { productId: "pr_strength" }),
  block("p_leo", "link", { title: "Free 7-day starter workout", url: "https://example.com/free" }),
  block("p_leo", "link", { title: "My podcast: Lift Simple", url: "https://example.com/podcast" }),
];
