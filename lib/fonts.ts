import { Fraunces, Geist, Geist_Mono, Nunito, Space_Grotesk } from "next/font/google";
import type { FontKey } from "@/lib/types";

// Our own site's fonts.
export const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Extra fonts creators can pick for their page. Not preloaded, so they only
// download on pages that use them.
const nunito = Nunito({ subsets: ["latin"], preload: false });
const fraunces = Fraunces({ subsets: ["latin"], preload: false });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], preload: false });

export const THEME_FONTS: Record<FontKey, { label: string; className: string }> = {
  clean: { label: "Clean", className: geistSans.className },
  friendly: { label: "Friendly", className: nunito.className },
  elegant: { label: "Elegant", className: fraunces.className },
  modern: { label: "Modern", className: spaceGrotesk.className },
};
