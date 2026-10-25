import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { logOut } from "@/app/auth/actions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = { title: "Dashboard" };

export default function DashboardPage() {
  return (
    <main className="flex flex-1 items-center justify-center px-4 py-16">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl">Dashboard</CardTitle>
          <CardDescription>Your page editor will live here.</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Reading the login cookie happens per request, so it streams in. */}
          <Suspense fallback={<p className="text-sm text-muted-foreground">Loading…</p>}>
            <SignedInAs />
          </Suspense>
        </CardContent>
        <CardFooter>
          <form action={logOut} className="w-full">
            <Button type="submit" variant="outline" size="lg" className="w-full">
              Log out
            </Button>
          </form>
        </CardFooter>
      </Card>
    </main>
  );
}

async function SignedInAs() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  if (!data?.claims) redirect("/login");

  return (
    <p className="text-sm">
      You&apos;re logged in as <strong>{data.claims.email}</strong>
    </p>
  );
}
