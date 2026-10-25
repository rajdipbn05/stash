import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/lib/types";

// A product on someone's public page. The whole card opens the product page.
export function ProductCard({ product, username }: { product: Product; username: string }) {
  return (
    <Link
      href={`/${username}/${product.slug}`}
      className="group flex items-center gap-4 rounded-(--card-radius) bg-[color-mix(in_srgb,var(--page-text)_7%,transparent)] p-3 ring-1 ring-[color-mix(in_srgb,var(--page-text)_12%,transparent)] transition motion-safe:hover:-translate-y-0.5 hover:shadow-lg active:scale-[0.98]"
    >
      <div className="relative size-20 shrink-0 overflow-hidden rounded-[calc(var(--card-radius)*0.6)] bg-[color-mix(in_srgb,var(--page-text)_10%,transparent)]">
        {product.coverUrl && (
          <Image
            src={product.coverUrl}
            alt=""
            fill
            sizes="80px"
            unoptimized={product.coverUrl.endsWith(".svg")}
            className="object-cover"
          />
        )}
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
        <p className="line-clamp-2 text-sm font-semibold leading-snug">{product.title}</p>
        <div className="flex items-center justify-between gap-2">
          <span className="text-sm opacity-80">{formatPrice(product.price, product.currency)}</span>
          <span className="rounded-(--btn-radius) bg-(--btn-bg) px-3.5 py-1.5 text-xs font-semibold text-(--btn-text) transition group-hover:opacity-90">
            Get it
          </span>
        </div>
      </div>
    </Link>
  );
}
