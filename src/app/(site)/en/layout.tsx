import { buildLocaleMetadata } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = buildLocaleMetadata("en");

export default function EnBranchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
