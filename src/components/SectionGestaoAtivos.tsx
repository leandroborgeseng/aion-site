interface SectionGestaoAtivosProps {
  dict: {
    heading: string;
    intro: string;
    detail: string;
    understandMore: string;
    items: Array<{ title: string; desc: string }>;
  };
}

export function SectionGestaoAtivos({ dict }: SectionGestaoAtivosProps) {
  return (
    <>
      <section id="gestao-ativos" className="bg-[#0067AF] py-16">
        <div className="max-w-[1200px] mx-auto px-6">
          <h2
            className="text-[28px] font-normal text-white mb-8"
            style={{ fontFamily: "Raleway, sans-serif" }}
          >
            &gt; {dict.heading}
          </h2>
          <p className="text-[15px] text-white/90 leading-relaxed max-w-4xl">
            {dict.intro}
          </p>
        </div>
      </section>

      <section className="bg-white py-12">
        <div className="max-w-[1200px] mx-auto px-6">
          <p className="text-[15px] text-[#2F2E2E] leading-relaxed mb-8">
            {dict.detail}
          </p>
          <h3
            className="mb-6 text-4xl font-bold leading-tight text-black sm:text-5xl md:text-[56px]"
            style={{ fontFamily: "Arial, sans-serif" }}
          >
            {dict.understandMore}
          </h3>
          <div className="space-y-6">
            {dict.items.map((item, i) => (
              <div key={i}>
                <p className="font-bold text-[15px] text-[#0067AF] mb-2">
                  {item.title}
                </p>
                <p className="text-[15px] text-[#2F2E2E] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
