import { buildLocaleMetadata } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = buildLocaleMetadata("es");

export default function EsBranchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
