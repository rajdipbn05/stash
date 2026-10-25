import Link from "next/link";
import { cn } from "@/lib/utils";
import { BRAND_NAME } from "@/lib/brand";
import { safeHref } from "@/lib/format";
import { THEME_FONTS } from "@/lib/fonts";
import { themeStyle } from "@/lib/themes";
import type { Block, PublicPage } from "@/lib/types";
import { Avatar } from "./avatar";
import { ProductCard } from "./product-card";
import { SOCIAL_LABELS, SocialIcon } from "./social-icon";

// How a creator's page looks to visitors. It only draws what it's given, so
// the dashboard's live phone preview reuses it with unsaved changes.
export function PublicPageView({ page, className }: { page: PublicPage; className?: string }) {
  const { profile, blocks } = page;
  const socials = blocks.filter((b) => b.type === "social");
  const content = blocks.filter((b) => b.type !== "social");

  return (
    <div
      style={themeStyle(profile.theme)}
      className={cn("min-h-dvh w-full", THEME_FONTS[profile.theme.font].className, className)}
    >
      <main className="mx-auto flex w-full max-w-[480px] flex-col items-center px-4 pb-10 pt-12">
        <Avatar name={profile.displayName} url={profile.avatarUrl} />
        <h1 className="mt-4 text-center text-2xl font-bold tracking-tight">{profile.displayName}</h1>
        {profile.bio && (
          <p className="mt-2 max-w-sm text-center text-[15px] leading-relaxed opacity-85">{profile.bio}</p>
        )}

        {socials.length > 0 && (
          <ul className="mt-5 flex flex-wrap justify-center gap-1">
            {socials.map((block) => {
              const href = safeHref(block.data.url);
              if (!href) return null;
              return (
                <li key={block.id}>
                  <a
                    href={href}
                    aria-label={SOCIAL_LABELS[block.data.platform]}
                    className="flex size-11 items-center justify-center rounded-full transition hover:bg-[color-mix(in_srgb,var(--page-text)_10%,transparent)] active:scale-95"
                  >
                    <SocialIcon platform={block.data.platform} className="size-6" />
                  </a>
                </li>
              );
            })}
          </ul>
        )}

        <div className="mt-6 flex w-full flex-col gap-3">
          {content.map((block) => (
            <BlockView key={block.id} block={block} page={page} />
          ))}
        </div>

        <Link
          href="/"
          className="mt-12 rounded-full px-3 py-1.5 text-xs font-medium opacity-70 transition hover:opacity-100"
        >
          Made with {BRAND_NAME}
        </Link>
      </main>
    </div>
  );
}

function BlockView({ block, page }: { block: Block; page: PublicPage }) {
  switch (block.type) {
    case "link": {
      const href = safeHref(block.data.url);
      if (!href) return null;
      return (
        <a
          href={href}
          className="block w-full rounded-(--btn-radius) bg-(--btn-bg) px-5 py-4 text-center text-[15px] font-semibold text-(--btn-text) shadow-sm transition motion-safe:hover:-translate-y-0.5 hover:shadow-lg active:scale-[0.98]"
        >
          {block.data.title}
        </a>
      );
    }
    case "product": {
      const { productId } = block.data;
      const product = page.products.find((p) => p.id === productId);
      if (!product) return null;
      return <ProductCard product={product} username={page.profile.username} />;
    }
    case "header":
      return (
        <h2 className="pt-4 text-center text-xs font-bold uppercase tracking-[0.18em] opacity-75">
          {block.data.text}
        </h2>
      );
    case "text":
      return (
        <p className="whitespace-pre-line text-center text-sm leading-relaxed opacity-85">
          {block.data.text}
        </p>
      );
    case "social":
      return null;
  }
}
