"use client";

import Link from "next/link";
import { LogIn } from "lucide-react";

export interface PortalLoginDict {
  h1: string;
  subtitle: string;
  emailLabel: string;
  passwordLabel: string;
  emailPlaceholder: string;
  passwordPlaceholder: string;
  submit: string;
  backHome: string;
}

export function PortalLoginSection({
  dict,
  homeHref,
}: {
  dict: PortalLoginDict;
  homeHref: string;
}) {
  return (
    <section className="min-h-[50vh] bg-[#F5F7FA] pb-16 pt-8 text-[#2F2E2E] md:py-14">
      <div className="mx-auto max-w-[480px] px-4 md:max-w-[520px]">
        <p className="mb-8">
          <Link
            href={homeHref}
            className="text-[13px] font-semibold uppercase tracking-wide text-[#0067AF] underline-offset-4 hover:underline"
          >
            ← {dict.backHome}
          </Link>
        </p>
        <div className="rounded-lg border border-[#E2E8EF] bg-white p-8 shadow-sm md:p-10">
          <div className="mb-8 flex flex-col gap-3">
            <LogIn size={28} className="text-[#0067AF]" aria-hidden strokeWidth={2} />
            <h1 className="text-[26px] font-bold leading-tight text-black md:text-3xl">
              {dict.h1}
            </h1>
            <p className="text-[15px] leading-relaxed text-[#555]">{dict.subtitle}</p>
          </div>
          <form
            className="space-y-5"
            onSubmit={(e) => {
              e.preventDefault();
            }}
            noValidate
          >
            <div className="space-y-1.5">
              <label htmlFor="portal-email" className="block text-[13px] font-semibold text-black">
                {dict.emailLabel}
              </label>
              <input
                id="portal-email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder={dict.emailPlaceholder}
                className="block w-full rounded-md border border-[#C9D4E0] bg-white px-3 py-2.5 text-[15px] text-black outline-none ring-[#0067AF] transition-[border-color,box-shadow] placeholder:text-[#94A3B8] focus:border-[#0067AF] focus:ring-2 focus:ring-offset-0"
              />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="portal-password" className="block text-[13px] font-semibold text-black">
                {dict.passwordLabel}
              </label>
              <input
                id="portal-password"
                name="password"
                type="password"
                autoComplete="current-password"
                placeholder={dict.passwordPlaceholder}
                className="block w-full rounded-md border border-[#C9D4E0] bg-white px-3 py-2.5 text-[15px] text-black outline-none ring-[#0067AF] transition-[border-color,box-shadow] placeholder:text-[#94A3B8] focus:border-[#0067AF] focus:ring-2 focus:ring-offset-0"
              />
            </div>
            <button
              type="submit"
              className="flex w-full min-h-[48px] items-center justify-center rounded-md bg-[#0067AF] px-4 text-[15px] font-semibold text-white transition-colors hover:bg-[#005a99] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0067AF]"
            >
              {dict.submit}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
