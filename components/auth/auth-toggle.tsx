"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "cn";

const tabs = [
  { label: "Sign In", href: "/sign-in" },
  { label: "Sign Up", href: "/sign-up" },
];

export function AuthToggle() {
  const pathname = usePathname();

  return (
    <div className="flex w-full items-center rounded-[16px] border border-transparent bg-[linear-gradient(180deg,#1b1b1b,#010102)_padding-box,linear-gradient(180deg,rgba(168,168,168,0.3),rgba(153,153,153,0))_border-box] p-2 [box-shadow:inset_0_0_6px_6px_rgba(0,0,0,0.1)]">
      {tabs.map((tab) => {
        const isActive = pathname === tab.href;

        return (
          <Link
            key={tab.href}
            href={tab.href}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "font-heading flex h-12 flex-1 items-center justify-center rounded-[12px] text-base font-semibold transition-colors",
              isActive
                ? "bg-hire-cta text-white"
                : "text-white/70 hover:text-white",
            )}
          >
            {tab.label}
          </Link>
        );
      })}
    </div>
  );
}
