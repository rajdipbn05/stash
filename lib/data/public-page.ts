import { SAMPLE_BLOCKS, SAMPLE_PRODUCTS, SAMPLE_PROFILES } from "@/lib/sample-data";
import type { PublicPage } from "@/lib/types";

// Data for public pages. For now this reads the sample data. When Supabase
// is connected, only the inside of these functions changes; the screens
// that call them stay the same.

// Someone's public page: their profile, the blocks visitors can see (in
// order), and their products that are on sale. Null if the username is free.
export async function getPublicPage(username: string): Promise<PublicPage | null> {
  "use cache";
  // When Supabase is connected: add cacheTag(`page:${username}`) here, and
  // call updateTag with the same tag whenever the page changes or the
  // username is claimed. Otherwise visitors see an old copy for a while.

  const profile = SAMPLE_PROFILES.find((p) => p.username === username.toLowerCase());
  if (!profile) return null;

  const products = SAMPLE_PRODUCTS.filter((p) => p.profileId === profile.id && p.isActive);
  const productIds = new Set(products.map((p) => p.id));

  const blocks = SAMPLE_BLOCKS.filter(
    (b) =>
      b.profileId === profile.id &&
      b.isVisible &&
      (b.type !== "product" || productIds.has(b.data.productId)),
  ).sort((a, b) => a.position - b.position);

  return { profile, blocks, products };
}

// Usernames whose pages are built ahead of time. Any other username is
// built the first time someone visits it.
export async function getPrebuiltUsernames(): Promise<string[]> {
  return SAMPLE_PROFILES.map((p) => p.username);
}
