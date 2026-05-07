"use client";

export default function SiteError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="mx-auto flex min-h-[40vh] max-w-lg flex-col items-center justify-center gap-4 px-6 py-16 text-center">
      <h1 className="text-lg font-semibold text-black">Erro ao carregar esta secção</h1>
      <button
        type="button"
        onClick={reset}
        className="min-h-11 rounded-lg bg-[#0067AF] px-5 text-[14px] font-semibold text-white hover:bg-[#005a99]"
      >
        Tentar novamente
      </button>
    </div>
  );
}
