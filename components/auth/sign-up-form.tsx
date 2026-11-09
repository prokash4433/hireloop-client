"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { AuthField } from "@/components/auth/auth-field";

const initialFormData = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export function SignUpForm() {
  const [formData, setFormData] = useState(initialFormData);

  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    // TODO: integrate with better-auth sign-up API
    console.log("Sign up form data:", formData);
  };

  const setField = (name: keyof typeof initialFormData) => (value: string) =>
    setFormData((prev) => ({ ...prev, [name]: value }));

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="font-heading text-3xl font-bold tracking-[-0.02em] text-white">
          Create your account
        </h1>
        <p className="font-heading text-base text-white/70">
          Join HireLoop and land your next role — faster.
        </p>
      </div>

      <div className="flex flex-col gap-5 rounded-[16px] border-white/20 bg-[#101010] p-6">
        <AuthField
          label="Full Name"
          name="name"
          placeholder="Jane Doe"
          autoComplete="name"
          value={formData.name}
          onChange={setField("name")}
        />
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
          autoComplete="new-password"
          value={formData.password}
          onChange={setField("password")}
        />
        <AuthField
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          placeholder="••••••••"
          autoComplete="new-password"
          value={formData.confirmPassword}
          onChange={setField("confirmPassword")}
        />

        <Button
          type="submit"
          size="lg"
          className="h-12 w-full rounded-[12px] bg-hire-cta text-base font-medium hover:bg-hire-cta/90"
        >
          Sign Up
        </Button>
      </div>
    </form>
  );
}
