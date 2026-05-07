import { buildLocaleMetadata } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = buildLocaleMetadata("pt");

export default function PtBranchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
