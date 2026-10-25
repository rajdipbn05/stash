import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PublicPageView } from "@/components/public-page/public-page-view";
import { getPrebuiltUsernames, getPublicPage } from "@/lib/data/public-page";

export async function generateStaticParams() {
  const usernames = await getPrebuiltUsernames();
  return usernames.map((username) => ({ username }));
}

export async function generateMetadata({ params }: PageProps<"/[username]">): Promise<Metadata> {
  const { username } = await params;
  const page = await getPublicPage(username);
  if (!page) return { title: "Page not found" };

  const { displayName, bio } = page.profile;
  return { title: `${displayName} (@${page.profile.username})`, description: bio };
}

export default async function CreatorPage({ params }: PageProps<"/[username]">) {
  const { username } = await params;
  const page = await getPublicPage(username);
  if (!page) notFound();

  return <PublicPageView page={page} />;
}
