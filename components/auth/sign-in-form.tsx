"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { AuthField } from "@/components/auth/auth-field";

const initialFormData = {
  email: "",
  password: "",
};

export function SignInForm() {
  const [formData, setFormData] = useState(initialFormData);

  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    // TODO: integrate with better-auth sign-in API
    console.log("Sign in form data:", formData);
  };

  const setField = (name: keyof typeof initialFormData) => (value: string) =>
    setFormData((prev) => ({ ...prev, [name]: value }));

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="font-heading text-3xl font-bold tracking-[-0.02em] text-white">
          Welcome back
        </h1>
        <p className="font-heading text-base text-white/70">
          Sign in to your account to continue your job hunt.
        </p>
      </div>

      <div className="flex flex-col gap-5 rounded-[16px] border-white/20 bg-[#101010] p-6">
        <AuthField
          label="Email"
          name="email"
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
          value={formData.email}
          onChange={setField("email")}
        />
        <AuthField
          label="Password"
          name="password"
          type="password"
          placeholder="••••••••"
          autoComplete="current-password"
          value={formData.password}
          onChange={setField("password")}
        />

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-sm text-white/70">
            <input
              type="checkbox"
              name="rememberMe"
              defaultChecked
              className="size-4 accent-hire-cta"
            />
            Remember me
          </label>
          <Button
            type="button"
            variant="link"
            size="sm"
            className="text-hire-cta"
          >
            Forgot password?
          </Button>
        </div>

        <Button
          type="submit"
          size="lg"
          className="h-12 w-full rounded-[12px] bg-hire-cta text-base font-medium hover:bg-hire-cta/90"
        >
          Sign In
        </Button>
      </div>
    </form>
  );
}
