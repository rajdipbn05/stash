import type { CSSProperties } from "react";
import { safeHref } from "@/lib/format";
import type { Background, ButtonShape, Theme, ThemePresetId } from "@/lib/types";

// Our 6 original preset themes.
export const THEME_PRESETS: Record<ThemePresetId, { label: string; theme: Theme }> = {
  cream: {
    label: "Cream",
    theme: {
      preset: "cream",
      background: { type: "solid", color: "#F5EFE4" },
      textColor: "#3A2E25",
      buttonColor: "#3A2E25",
      buttonTextColor: "#F5EFE4",
      buttonShape: "pill",
      font: "elegant",
    },
  },
  midnight: {
    label: "Midnight",
    theme: {
      preset: "midnight",
      background: { type: "gradient", from: "#141B2D", to: "#2E2142", angle: 160 },
      textColor: "#F2F0FA",
      buttonColor: "#E9E4FF",
      buttonTextColor: "#1A1630",
      buttonShape: "rounded",
      font: "clean",
    },
  },
  blush: {
    label: "Blush",
    theme: {
      preset: "blush",
      background: { type: "gradient", from: "#FCE8EC", to: "#F4CCD8", angle: 180 },
      textColor: "#4A2230",
      buttonColor: "#FFFFFF",
      buttonTextColor: "#4A2230",
      buttonShape: "pill",
      font: "friendly",
    },
  },
  sage: {
    label: "Sage",
    theme: {
      preset: "sage",
      background: { type: "solid", color: "#DDE5D6" },
      textColor: "#24331F",
      buttonColor: "#3E5638",
      buttonTextColor: "#F3F6EF",
      buttonShape: "rounded",
      font: "friendly",
    },
  },
  ocean: {
    label: "Ocean",
    theme: {
      preset: "ocean",
      background: { type: "gradient", from: "#0E4D64", to: "#138A8A", angle: 170 },
      textColor: "#F0FBFB",
      buttonColor: "#F0FBFB",
      buttonTextColor: "#0E4D64",
      buttonShape: "pill",
      font: "modern",
    },
  },
  mono: {
    label: "Mono",
    theme: {
      preset: "mono",
      background: { type: "solid", color: "#FFFFFF" },
      textColor: "#111111",
      buttonColor: "#111111",
      buttonTextColor: "#FFFFFF",
      buttonShape: "square",
      font: "modern",
    },
  },
};

export const DEFAULT_THEME: Theme = THEME_PRESETS.cream.theme;

const BUTTON_RADIUS: Record<ButtonShape, string> = {
  rounded: "14px",
  pill: "9999px",
  square: "0px",
};

// Cards are taller than buttons, so they get a gentler rounding.
const CARD_RADIUS: Record<ButtonShape, string> = {
  rounded: "18px",
  pill: "26px",
  square: "0px",
};

function backgroundCss(background: Background): CSSProperties {
  switch (background.type) {
    case "solid":
      return { backgroundColor: background.color };
    case "gradient":
      return {
        backgroundImage: `linear-gradient(${background.angle}deg, ${background.from}, ${background.to})`,
      };
    case "image": {
      const url = safeHref(background.url);
      if (!url) return {};
      return {
        backgroundImage: `url("${encodeURI(url)}")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      };
    }
  }
}

// Turns a theme into CSS variables for the public page.
// Components read them as var(--page-text), var(--btn-bg) and so on.
export function themeStyle(theme: Theme): CSSProperties {
  return {
    ...backgroundCss(theme.background),
    color: theme.textColor,
    "--page-text": theme.textColor,
    "--btn-bg": theme.buttonColor,
    "--btn-text": theme.buttonTextColor,
    "--btn-radius": BUTTON_RADIUS[theme.buttonShape],
    "--card-radius": CARD_RADIUS[theme.buttonShape],
  } as CSSProperties;
}
