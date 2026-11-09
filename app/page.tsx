import { Hero } from "@/components/hero"
import { Navbar } from "@/components/navbar"

export default function Page() {
  return (
    <div className="relative min-h-svh overflow-x-clip bg-[#010101]">
      <Navbar />
      <Hero />
    </div>
  )
}
