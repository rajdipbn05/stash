import type { Metadata } from "next";
import Link from "next/link";
import { AuthCard } from "@/components/auth/auth-card";
import { buttonVariants } from "@/components/ui/button";

export const metadata: Metadata = { title: "Link expired" };

export default function AuthErrorPage() {
  return (
    <AuthCard
      title="That link didn't work"
      description="It may have expired or already been used. Links from our emails only work once."
    >
      <div className="grid gap-4">
        <p className="text-sm text-muted-foreground">
          Confirming your email? It may already be confirmed, so try logging in.
          Resetting your password? Open the link in the same browser you
          requested it from.
        </p>
        <Link href="/login" className={buttonVariants({ size: "lg", className: "w-full" })}>
          Go to log in
        </Link>
        <Link
          href="/forgot-password"
          className={buttonVariants({ size: "lg", variant: "outline", className: "w-full" })}
        >
          Get a new password link
        </Link>
      </div>
    </AuthCard>
  );
}
