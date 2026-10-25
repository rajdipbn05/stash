import { Globe, Mail } from "lucide-react";
import {
  siFacebook,
  siInstagram,
  siPinterest,
  siSpotify,
  siThreads,
  siTiktok,
  siWhatsapp,
  siX,
  siYoutube,
  type SimpleIcon,
} from "simple-icons";
import type { SocialPlatform } from "@/lib/types";

const BRAND_ICONS: Partial<Record<SocialPlatform, SimpleIcon>> = {
  instagram: siInstagram,
  tiktok: siTiktok,
  youtube: siYoutube,
  x: siX,
  threads: siThreads,
  facebook: siFacebook,
  pinterest: siPinterest,
  spotify: siSpotify,
  whatsapp: siWhatsapp,
};

export const SOCIAL_LABELS: Record<SocialPlatform, string> = {
  instagram: "Instagram",
  tiktok: "TikTok",
  youtube: "YouTube",
  x: "X",
  threads: "Threads",
  facebook: "Facebook",
  pinterest: "Pinterest",
  spotify: "Spotify",
  whatsapp: "WhatsApp",
  email: "Email",
  website: "Website",
};

// A platform's logo, drawn in the current text color.
export function SocialIcon({
  platform,
  className,
}: {
  platform: SocialPlatform;
  className?: string;
}) {
  if (platform === "email") return <Mail className={className} aria-hidden="true" />;

  const icon = BRAND_ICONS[platform];
  if (!icon) return <Globe className={className} aria-hidden="true" />;

  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d={icon.path} />
    </svg>
  );
}
