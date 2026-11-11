 
import Image from "next/image"
import { MapPinIcon, SearchIcon, type LucideIcon } from "lucide-react"

import { Button } from "@/components/ui/button"

 

const TRENDING_ROLES = ["Product Designer", "AI Engineering", "Dev-ops Engineer"]

 
function BriefcaseIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="size-6 shrink-0"
    >
      <defs>
        <linearGradient id="hl-badge-body" x1="3" y1="8" x2="21" y2="21" gradientUnits="userSpaceOnUse">
          <stop stopColor="#fee45a" />
          <stop offset="1" stopColor="#fea613" />
        </linearGradient>
        <linearGradient id="hl-badge-handle" x1="8" y1="3" x2="16" y2="9" gradientUnits="userSpaceOnUse">
          <stop stopColor="#c86d36" />
          <stop offset="1" stopColor="#883f2e" />
        </linearGradient>
      </defs>

      <path
        d="M9 8V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V8"
        stroke="url(#hl-badge-handle)"
        strokeWidth="2"
      />
      <rect x="3" y="8" width="18" height="13" rx="2.5" fill="url(#hl-badge-body)" />
      <rect x="9" y="12.5" width="6" height="4" rx="1" fill="#bac8fa" />
    </svg>
  )
}

function BadgeLine({ direction }: { direction: "left" | "right" }) {
  const gradient =
    direction === "left"
      ? "bg-[linear-gradient(90deg,rgba(1,1,35,0.7),rgba(168,168,168,0.7))]"
      : "bg-[linear-gradient(90deg,rgba(168,168,168,0.7),rgba(1,1,35,0.7))]"

  return <span aria-hidden="true" className={`hidden h-px w-16 sm:block ${gradient}`} />
}

function BadgeRow() {
  return (
    <div className="flex h-[50px] items-center">
      <BadgeLine direction="left" />

      <div
        className="
          flex h-12 items-center gap-4 rounded-full border border-transparent px-4 sm:px-6
          bg-[linear-gradient(180deg,#1b1b1b,#010102)_padding-box,linear-gradient(180deg,rgba(168,168,168,0.3),rgba(153,153,153,0))_border-box]
          [box-shadow:inset_0_0_6px_6px_rgba(0,0,0,0.1)]
        "
      >
        <BriefcaseIcon />
        <span className="font-badge whitespace-nowrap text-[15px] leading-[1.2] text-white sm:text-xl">
          50,000+ new jobs this month
        </span>
      </div>

      <BadgeLine direction="right" />
    </div>
  )
}

 

function HeroTitle() {
  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <h1 className="font-heading text-4xl font-bold tracking-[-0.02em] text-white sm:text-5xl lg:text-[56px] lg:leading-[1.15]">
        Find Your Dream Job Today
      </h1>

      <p className="font-heading max-w-[784px] text-base leading-[1.6] text-white/70 sm:text-xl">
        HireLoop connects top talent with world-class companies. Browse thousands
        of curated opportunities and land your next role — faster.
      </p>
    </div>
  )
}

 

type SearchFieldProps = {
  icon: LucideIcon
  name: string
  placeholder: string
}

function SearchField({ icon: Icon, name, placeholder }: SearchFieldProps) {
  return (
    <label className="flex min-w-0 flex-1 items-center gap-2">
      <Icon strokeWidth={1.5} aria-hidden="true" className="size-6 shrink-0 text-white" />
      <input
        type="text"
        name={name}
        placeholder={placeholder}
        aria-label={placeholder}
        className="h-full w-full bg-transparent text-base text-white outline-none placeholder:text-white/80"
      />
    </label>
  )
}

function SearchBar() {
  return (
    <form
      role="search"
      className="
        flex w-full flex-col gap-3 rounded-[16px] border border-white/20 bg-[#101010] p-4
        lg:h-16 lg:flex-row lg:items-center lg:gap-6 lg:py-2 lg:pr-2 lg:pl-6
      "
    >
      <SearchField icon={SearchIcon} name="q" placeholder="Job title, skill or company" />

      <span aria-hidden="true" className="hidden h-[23px] w-px shrink-0 bg-white/20 lg:block" />

      <SearchField icon={MapPinIcon} name="location" placeholder="Location or Remote" />

      <Button
        type="submit"
        aria-label="Search jobs"
        className="size-12 shrink-0 self-end rounded-[12px] bg-hire-cta hover:bg-hire-cta/90 lg:self-auto"
      >
        <SearchIcon className="size-6" />
      </Button>
    </form>
  )
}

 

function TrendingRow() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
      <span className="font-heading text-base text-white/70">Trending Position</span>

      <div className="flex flex-wrap items-center justify-center gap-2">
        {TRENDING_ROLES.map((role) => (
          <button
            key={role}
            type="button"
            className="
              font-heading flex h-[33px] items-center rounded-full border border-white/10
              bg-[#1a1a1b] px-3 text-sm leading-[1.5] text-white transition-colors
              hover:border-white/25 hover:bg-[#242426]
              focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white
            "
          >
            {role}
          </button>
        ))}
      </div>
    </div>
  )
}

 

export function Hero() {
  return (
    <section className="relative z-10 overflow-x-clip">
       
      <div className="pointer-events-none -mt-[168px] flex justify-center" aria-hidden="true">
        <Image
          src="/images/globe.png"
          alt=""
          width={1440}
          height={1882}
          sizes="100vw"
          priority
          className="h-auto w-full min-w-[950px] max-w-none shrink-0 select-none"
        />
      </div>

      {/* Content overlay */}
      <div className="absolute inset-x-0 top-0">
        <div className="mx-auto flex w-[784px] max-w-full flex-col items-center gap-12 px-4 pt-24 lg:px-0 lg:pt-[176px]">
          <div className="flex mt-60 flex-col items-center gap-8 lg:mt-0">
            <BadgeRow />
            <HeroTitle />
          </div>

          <div className="flex w-full flex-col items-center gap-6">
            <SearchBar />
            <TrendingRow />
          </div>
        </div>
      </div>
    </section>
  )
}