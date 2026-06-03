import { notFound } from "next/navigation";
import { builds } from "@/data/content";
import BuildDetailContent from "@/components/BuildDetailContent";

export function generateStaticParams() {
  return builds.map((b) => ({ slug: b.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const b = builds.find((x) => x.slug === params.slug);
  return { title: b ? `${b.name} — Cycles Custom Cult` : "Build" };
}

export default function BuildDetail({ params }: { params: { slug: string } }) {
  const b = builds.find((x) => x.slug === params.slug);
  if (!b) return notFound();
  return <BuildDetailContent build={b} />;
}
