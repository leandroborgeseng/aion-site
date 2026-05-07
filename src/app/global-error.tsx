"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="pt-BR">
      <body className="flex min-h-screen flex-col items-center justify-center gap-4 bg-white px-6 text-center text-[#2F2E2E] antialiased">
        <h1 className="text-xl font-semibold text-black">Algo saiu do esperado</h1>
        <p className="max-w-md text-[15px] leading-relaxed text-[#555]">
          {error.digest
            ? "Ocorreu um erro ao carregar a página. Pode tentar de novo."
            : error.message}
        </p>
        <button
          type="button"
          onClick={reset}
          className="min-h-11 rounded-lg bg-[#0067AF] px-6 text-[14px] font-semibold text-white hover:bg-[#005a99]"
        >
          Tentar novamente
        </button>
      </body>
    </html>
  );
}
