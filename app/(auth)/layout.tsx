import Link from "next/link";

import { AuthToggle } from "@/components/auth/auth-toggle";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="relative min-h-screen bg-[#010102]">
      {/* Faint globe glow, matching the hero's backdrop */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[-260px] left-1/2 size-[900px] max-w-none -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(92,83,254,0.22),rgba(1,1,2,0)_60%)]"
      />

      <header className="relative z-10 flex h-[98px] items-center">
        <div className="mx-auto w-full max-w-[1240px] px-6">
          <Link
            href="/"
            className="font-heading text-xl font-bold tracking-[-0.02em] text-white"
          >
            Hire<span className="text-hire-cta">Loop</span>
          </Link>
        </div>
      </header>

      <div className="relative z-10 mx-auto flex w-full max-w-[500px] flex-col gap-8 px-6 pb-24 pt-6 lg:gap-10 lg:pb-32">
        <AuthToggle />
        {children}
      </div>
    </main>
  );
}
