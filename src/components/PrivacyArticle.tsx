import Link from "next/link";

export interface PrivacyDoc {
  title: string;
  lead: string;
  updatedNote: string;
  blocks: { heading: string; body: string }[];
}

export function PrivacyArticle({
  dict,
  homeHref,
  homeLabel,
}: {
  dict: PrivacyDoc;
  homeHref: string;
  homeLabel: string;
}) {
  return (
    <article className="mx-auto max-w-[800px] px-4 py-12 text-[#2F2E2E] md:py-16">
      <p className="mb-8">
        <Link
          href={homeHref}
          className="text-[13px] font-semibold uppercase tracking-wide text-[#0067AF] underline-offset-4 hover:underline"
        >
          ← {homeLabel}
        </Link>
      </p>
      <h1
        className="mb-4 text-[28px] font-bold leading-tight text-black md:text-4xl"
        style={{ fontFamily: "Raleway, ui-sans-serif, sans-serif" }}
      >
        {dict.title}
      </h1>
      <p className="mb-6 text-[13px] text-[#555]">{dict.updatedNote}</p>
      <p className="mb-10 text-[15px] leading-relaxed italic text-[#555]">{dict.lead}</p>
      <div className="space-y-10">
        {dict.blocks.map((b) => (
          <section key={b.heading}>
            <h2 className="mb-3 text-xl font-bold text-black">{b.heading}</h2>
            <p className="text-[15px] leading-relaxed">{b.body}</p>
          </section>
        ))}
      </div>
    </article>
  );
}
