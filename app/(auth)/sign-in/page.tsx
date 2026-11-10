
"use client"

import { useState, type FormEvent } from "react"
import { Eye, EyeOff, ArrowRight, Handshake } from "lucide-react"
import Link from "next/link"
import { authClient } from "@/lib/auth-client"
import { redirect } from "next/navigation"

const SignInPage = () => {
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = async(e:React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const user = Object.fromEntries(formData.entries()) as { email: string, password: string,}
    const {data, error}= await authClient.signIn.email({
          ...user,
         })
         if(data) {
          redirect('/')
         }
         if(error){
           console.log("Something went wrong",error)
         }

        }

  const inputClass =
    "h-12 w-full rounded-xl border border-[#5146D8]/25 bg-[#03030B]/70 px-4 text-sm text-white outline-none transition-all duration-300 placeholder:text-[#B5B3F5]/30 hover:border-[#7773E8]/70 hover:bg-[#0B0925] focus:border-[#7773E8] focus:ring-2 focus:ring-[#5146D8]/30"

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#03030B] px-4 py-12 text-white">

      {/* Background Glow */}
      <div className="pointer-events-none absolute -left-40 -top-40 size-[550px] rounded-full bg-[#5146D8]/25 blur-[160px]" />

      <div className="pointer-events-none absolute -bottom-40 -right-40 size-[550px] rounded-full bg-[#7773E8]/20 blur-[160px]" />

      <div className="pointer-events-none absolute left-1/2 top-1/2 size-[650px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#29216B]/20 blur-[170px]" />

      {/* Decorative Circles */}
      <div className="pointer-events-none absolute -left-20 top-1/4 size-80 rounded-full border border-[#7773E8]/10" />

      <div className="pointer-events-none absolute -right-20 bottom-1/4 size-80 rounded-full border border-[#7773E8]/10" />

      {/* Main Card */}
      <div className="relative z-10 w-full max-w-md overflow-hidden rounded-3xl border border-[#5146D8]/30 bg-gradient-to-br from-[#15123B]/95 via-[#0B0925]/95 to-[#050510]/95 p-6 shadow-[0_0_80px_rgba(81,70,216,0.15)] backdrop-blur-2xl transition-all duration-500 hover:scale-[1.01] hover:border-[#7773E8]/60 hover:shadow-[0_0_100px_rgba(81,70,216,0.25)] sm:p-10">

        {/* Card Glow */}
        <div className="pointer-events-none absolute -right-20 -top-20 size-60 rounded-full bg-[#5146D8]/15 blur-[90px]" />

        {/* Logo */}
        <Link
          href="/"
          className="relative z-10 mb-10 flex w-fit items-center gap-3"
        >
          <div className="flex size-11 items-center justify-center rounded-xl border border-[#7773E8]/30 bg-gradient-to-br from-[#7773E8] to-[#5146D8] text-white shadow-[0_0_20px_rgba(81,70,216,0.3)] transition-all duration-300 hover:scale-110 hover:border-[#B5B3F5] hover:shadow-[0_0_35px_rgba(119,115,232,0.55)]">
            <Handshake size={24} />
          </div>

          <span className="text-2xl font-bold tracking-tight">
            Hire<span className="text-[#7773E8]">Loop</span>
            <span className="text-[#B5B3F5]">.</span>
          </span>
        </Link>

        {/* Heading */}
        <div className="relative z-10 mb-8">

          <p className="mb-3 text-sm font-semibold uppercase tracking-[3px] text-[#7773E8]">
            Welcome to HireLoop
          </p>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Welcome Back!
          </h1>

          <p className="mt-3 text-sm leading-6 text-[#B5B3F5]/55">
            Sign in to continue your career journey.
          </p>

        </div>

        {/* Sign In Form */}
        <form onSubmit={handleSubmit} className="relative z-10 space-y-5">

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-[#B5B3F5]/85"
            >
              Email Address
            </label>

            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              required
              className={inputClass}
            />
          </div>

          {/* Password */}
          <div>
            <div className="mb-2 flex items-center justify-between">

              <label
                htmlFor="password"
                className="text-sm font-medium text-[#B5B3F5]/85"
              >
                Password
              </label>

              <Link
                href="/forgot-password"
                className="text-xs font-medium text-[#7773E8] transition-all duration-300 hover:text-[#B5B3F5] hover:underline"
              >
                Forgot Password?
              </Link>

            </div>

            <div className="relative">

              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                autoComplete="current-password"
                required
                minLength={6}
                className={`${inputClass} pr-12`}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#B5B3F5]/45 transition-all duration-300 hover:scale-110 hover:text-[#7773E8]"
              >
                {showPassword ? (
                  <EyeOff size={19} />
                ) : (
                  <Eye size={19} />
                )}
              </button>

            </div>
          </div>

          {/* Remember Me */}
          <div className="flex items-center gap-2">

            <input
              id="remember"
              name="remember"
              type="checkbox"
              className="size-4 cursor-pointer accent-[#5146D8]"
            />

            <label
              htmlFor="remember"
              className="cursor-pointer text-sm text-[#B5B3F5]/60 transition-colors duration-300 hover:text-white"
            >
              Remember me
            </label>

          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="group flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-[#7773E8]/40 bg-gradient-to-r from-[#5146D8] to-[#7773E8] font-semibold text-white shadow-[0_5px_25px_rgba(81,70,216,0.2)] transition-all duration-300 hover:scale-[1.02] hover:border-[#B5B3F5] hover:from-[#6259E8] hover:to-[#8985F5] hover:shadow-[0_8px_35px_rgba(81,70,216,0.45)] active:scale-[0.98]"
          >
            Sign In

            <ArrowRight
              size={19}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </button>

        </form>

        {/* Sign Up Link */}
        <p className="relative z-10 mt-8 text-center text-sm text-[#B5B3F5]/50">
          Don&apos;t have an account?

          <Link
            href="/sign-up"
            className="ml-2 font-semibold text-[#7773E8] transition-all duration-300 hover:text-[#B5B3F5] hover:underline"
          >
            Sign Up
          </Link>
        </p>

        {/* Copyright */}
        <p className="relative z-10 mt-8 text-center text-xs text-[#B5B3F5]/30">
          © 2026 HireLoop. All rights reserved.
        </p>

      </div>
    </main>
  )
}

export default SignInPage
