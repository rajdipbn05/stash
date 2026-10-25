// Data shapes used across the app. They mirror the database tables in
// PLAN.md section 4 (in camelCase). When Supabase is connected, the
// functions in lib/data/ convert database rows into these shapes.

export type ThemePresetId = "cream" | "midnight" | "blush" | "sage" | "ocean" | "mono";
export type ButtonShape = "rounded" | "pill" | "square";
export type FontKey = "clean" | "friendly" | "elegant" | "modern";

export type Background =
  | { type: "solid"; color: string }
  | { type: "gradient"; from: string; to: string; angle: number }
  | { type: "image"; url: string };

// Stored as JSON in profiles.theme.
export type Theme = {
  preset: ThemePresetId | "custom";
  background: Background;
  textColor: string;
  buttonColor: string;
  buttonTextColor: string;
  buttonShape: ButtonShape;
  font: FontKey;
};

export type Profile = {
  id: string;
  username: string;
  displayName: string;
  bio: string;
  avatarUrl: string | null;
  theme: Theme;
  createdAt: string;
};

export type SocialPlatform =
  | "instagram"
  | "tiktok"
  | "youtube"
  | "x"
  | "threads"
  | "facebook"
  | "pinterest"
  | "spotify"
  | "whatsapp"
  | "email"
  | "website";

type BlockBase = {
  id: string;
  profileId: string;
  position: number;
  isVisible: boolean;
};

// One row in the blocks table. `type` decides what's inside `data`.
export type Block = BlockBase &
  (
    | { type: "link"; data: { title: string; url: string } }
    | { type: "social"; data: { platform: SocialPlatform; url: string } }
    | { type: "product"; data: { productId: string } }
    | { type: "header"; data: { text: string } }
    | { type: "text"; data: { text: string } }
  );

export type BlockType = Block["type"];

// What visitors may see about a product. The private file path is
// deliberately not part of this type, so it can never reach a public page.
export type Product = {
  id: string;
  profileId: string;
  slug: string;
  title: string;
  description: string;
  // In the smallest unit of the currency (cents), like Stripe.
  price: number;
  currency: string;
  coverUrl: string | null;
  isActive: boolean;
};

// Everything needed to draw someone's public page.
export type PublicPage = {
  profile: Profile;
  blocks: Block[];
  products: Product[];
};
