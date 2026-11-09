import Image from "next/image"
import Link from "next/link"
import { MenuIcon, XIcon } from "lucide-react"
import { cn } from "cn"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

const navLinks = [
  { label: "Browse Jobs", href: "/" },
  { label: "Company", href: "/company" },
  { label: "Pricing", href: "/pricing" },
]

function Logo() {
  return (
    <Link href="/" aria-label="Hireloop home" className="shrink-0">
      <Image
        src="/images/logo.png"
        alt="Hireloop"
        width={154}
        height={44}
        priority
      />
    </Link>
  )
}

function Divider({ className }: { className?: string }) {
  return <span aria-hidden="true" className={cn("h-px w-6 shrink-0 bg-hire-divider/40", className)} />
}

function NavLinks({ className }: { className?: string }) {
  return (
    <ul className={className}>
      {navLinks.map((link) => (
        <li key={link.label}>
          <Link
            href={link.href}
            className="text-base leading-[1.8] tracking-[-0.2px] text-white transition-colors hover:text-white/70"
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  )
}

/* Buttons — exact Figma spec:
   Sign In: ghost, 18px semibold #5c53fe, radius 12, h 58, px 24
   Get Started: #5c53fe bg, 18px medium white, radius 12, h 52, px 24,
   1px #090a15/10 border, inset white glow on both */
const buttonGlow = "shadow-[inset_0_3px_10px_rgba(255,255,255,0.2)]"

function SignInButton({ className }: { className?: string }) {
  return (
    <Button
      render={<a href="/sign-in" />}
      nativeButton={false}
      className={cn(
        "h-[58px] rounded-[12px] bg-transparent px-6 text-lg font-semibold text-hire-cta hover:bg-white/10",
        buttonGlow,
        className
      )}
    >
      Sign In
    </Button>
  )
}

function GetStartedButton({ className }: { className?: string }) {
  return (
    <Button
      render={<a href="/get-started" />}
      nativeButton={false}
      className={cn(
        "h-[52px] rounded-[12px] border-hire-cta-border/10 bg-hire-cta px-6 text-lg font-medium text-white hover:bg-hire-cta/90",
        buttonGlow,
        className
      )}
    >
      Get Started
    </Button>
  )
}

export function Navbar() {
  return (
    <header className="relative z-20 px-4 pt-6 sm:px-6">
      <div className="mx-auto max-w-[1320px]">
        {/* Desktop — exact Figma layout: 1320x74 bar, logo left, links + divider + CTAs right */}
        <nav className="hidden h-[74px] items-center justify-between rounded-[16px] bg-hire-navbar pr-2 pl-6 lg:flex">
          <Logo />
          <div className="flex h-full items-center gap-6">
            <NavLinks className="flex items-center gap-10" />
            <Divider />
            <div className="flex items-center gap-4">
              <SignInButton />
              <GetStartedButton />
            </div>
          </div>
        </nav>

        {/* Mobile / tablet — same style, hamburger menu */}
        <nav className="flex h-16 items-center justify-between rounded-[16px] bg-hire-navbar pr-3 pl-4 sm:pl-6 lg:hidden">
          <Logo />
          <div className="flex items-center gap-2">
            <GetStartedButton className="hidden h-10 px-4 text-base sm:inline-flex" />
            <Sheet>
              <SheetTrigger
                render={
                  <Button
                    variant="ghost"
                    size="icon-lg"
                    aria-label="Open menu"
                    className="text-white hover:bg-white/10"
                  />
                }
              >
                <MenuIcon />
              </SheetTrigger>
              <SheetContent
                side="right"
                showCloseButton={false}
                className="w-[85%] max-w-xs border-white/10 bg-hire-navbar text-white"
              >
                <SheetTitle className="sr-only">Menu</SheetTitle>
                <SheetClose
                  render={
                    <Button
                      variant="ghost"
                      size="icon-lg"
                      aria-label="Close menu"
                      className="absolute top-3 right-3 text-white hover:bg-white/10"
                    />
                  }
                >
                  <XIcon />
                  <span className="sr-only">Close</span>
                </SheetClose>
                <NavLinks className="mt-10 flex flex-col gap-1 [&_a]:flex [&_a]:py-2 [&_a]:text-lg" />
                <Divider className="my-4 w-full" />
                <div className="flex flex-col gap-3">
                  <SignInButton className="h-12 w-full" />
                  <GetStartedButton className="h-12 w-full" />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </div>
    </header>
  )
}
