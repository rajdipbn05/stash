import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-6 px-4 py-24 text-center">
      <h1 className="text-4xl font-semibold tracking-tight">Coming soon</h1>
      <p className="max-w-sm text-muted-foreground">
        One free link for everything you share and sell.
      </p>
      <Button size="lg" disabled>
        Launching soon
      </Button>
    </main>
  );
}
