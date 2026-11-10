"use client"

import { useState, type FormEvent } from "react"
import { Eye, EyeOff, ArrowRight, Handshake, Users, User, Shield } from "lucide-react"
import Link from "next/link"
import { authClient } from "@/lib/auth-client"
import { redirect } from "next/navigation"

const ROLES = [
  { value: "seeker", label: "Job Seeker", icon: Users },
  { value: "recruiter", label: "Recruiter", icon: User },
  { value: "admin", label: "Admin", icon: Shield },
] as const

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState("")

  const handleSignUp = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const user = Object.fromEntries(formData.entries()) as { name: string, email: string, password: string, confirmPassword: string, role: "seeker" | "recruiter" | "admin" }


    if (user.password !== user.confirmPassword) {
      setError("Passwords do not match!")
      return
    }

    const { data, error } = await authClient.signUp.email({
      ...user,
    })
    if (data) {
      redirect('/')
    }
    if (error) {
      console.log(error)
    }

    // const { data: signUpResponse, error: signUpError } =
    //   await authClient.signUp.email({
    //     name: data.name,
    //     email: data.email,
    //     password: data.password,
    //     callbackURL: "/",
    //   })

    // console.log('signUp response', signUpResponse, "signUpError:", signUpError)
    // if (signUpError) {
    //   setError(signUpError.message ?? "Something went wrong")
    //   return
    // }

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
            Create Account
          </h1>

          <p className="mt-3 text-sm leading-6 text-[#B5B3F5]/55">
            Join HireLoop and discover new opportunities.
          </p>
        </div>

        {/* Sign Up Form */}
        <form onSubmit={handleSignUp} className="relative z-10 space-y-5">

          {/* Role Selector */}
          <fieldset>
            <legend className="mb-2 block text-sm font-medium text-[#B5B3F5]/85">
              Joining HireLoop as
            </legend>

            <div className="grid grid-cols-3 gap-3">
              {ROLES.map(({ value, label, icon: Icon }, index) => (
                <label key={value} className="relative cursor-pointer">
                  <input
                    type="radio"
                    name="role"
                    value={value}
                    defaultChecked={index === 0}
                    required
                    className="peer sr-only"
                  />

                  <div className="flex h-20 flex-col items-center justify-center gap-2 rounded-xl border border-[#5146D8]/25 bg-[#03030B]/70 text-[#B5B3F5]/55 transition-all duration-300 hover:scale-[1.05] hover:border-[#7773E8]/70 hover:bg-[#0B0925] hover:text-white hover:shadow-[0_0_20px_rgba(81,70,216,0.25)] active:scale-[0.97] peer-checked:border-[#7773E8] peer-checked:bg-[#5146D8]/15 peer-checked:text-white peer-checked:shadow-[0_0_25px_rgba(81,70,216,0.35)] peer-focus-visible:ring-2 peer-focus-visible:ring-[#7773E8]/50">
                    <Icon size={18} />
                    <span className="text-xs font-medium">{label}</span>
                  </div>
                </label>
              ))}
            </div>
          </fieldset>

          {/* Full Name */}
          <div>
            <label htmlFor="name" className="mb-2 block text-sm font-medium text-[#B5B3F5]/85">
              Full Name
            </label>

            <input
              id="name"
              name="name"
              type="text"
              placeholder="Enter your full name"
              autoComplete="name"
              required
              className={inputClass}
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-medium text-[#B5B3F5]/85">
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
            <label htmlFor="password" className="mb-2 block text-sm font-medium text-[#B5B3F5]/85">
              Password
            </label>

            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                autoComplete="new-password"
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
                {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label htmlFor="confirmPassword" className="mb-2 block text-sm font-medium text-[#B5B3F5]/85">
              Confirm Password
            </label>

            <div className="relative">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your password"
                autoComplete="new-password"
                required
                minLength={6}
                className={`${inputClass} pr-12`}
              />

              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#B5B3F5]/45 transition-all duration-300 hover:scale-110 hover:text-[#7773E8]"
              >
                {showConfirmPassword ? <EyeOff size={19} /> : <Eye size={19} />}
              </button>
            </div>
          </div>

          {/* Terms */}
          <div className="flex items-start gap-2">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              required
              className="mt-1 size-4 cursor-pointer accent-[#5146D8]"
            />

            <label htmlFor="terms" className="text-xs leading-5 text-[#B5B3F5]/55">
              I agree to the{" "}
              <Link
                href="/terms"
                className="font-medium text-[#7773E8] transition-colors duration-300 hover:text-[#B5B3F5] hover:underline"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="font-medium text-[#7773E8] transition-colors duration-300 hover:text-[#B5B3F5] hover:underline"
              >
                Privacy Policy
              </Link>.
            </label>
          </div>

          {/* Error */}
          {error && (
            <p className="text-sm text-red-400" role="alert">
              {error}
            </p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="group flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-[#7773E8]/40 bg-gradient-to-r from-[#5146D8] to-[#7773E8] font-semibold text-white shadow-[0_5px_25px_rgba(81,70,216,0.2)] transition-all duration-300 hover:scale-[1.02] hover:border-[#B5B3F5] hover:from-[#6259E8] hover:to-[#8985F5] hover:shadow-[0_8px_35px_rgba(81,70,216,0.45)] active:scale-[0.98]"
          >
            Create Account

            <ArrowRight
              size={19}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </button>

        </form>

        {/* Sign In Link */}
        <p className="relative z-10 mt-8 text-center text-sm text-[#B5B3F5]/50">
          Already have an account?

          <Link
            href="/sign-in"
            className="ml-2 font-semibold text-[#7773E8] transition-all duration-300 hover:text-[#B5B3F5] hover:underline"
          >
            Sign In
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

export default SignUpPage