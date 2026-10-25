import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { BRAND_NAME } from "@/lib/brand";

export default function CreatorNotFound() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-4 px-4 py-24 text-center">
      <p className="text-5xl" aria-hidden="true">
        🔍
      </p>
      <h1 className="text-2xl font-semibold tracking-tight">This page doesn&apos;t exist (yet)</h1>
      <p className="max-w-sm text-muted-foreground">
        Nobody has claimed this name on {BRAND_NAME}. It could be yours, for free.
      </p>
      <Link href="/signup" className={buttonVariants({ size: "lg" })}>
        Claim your page
      </Link>
    </main>
  );
}
