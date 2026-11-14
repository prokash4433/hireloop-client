"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Check, ChevronDown, Rocket } from "lucide-react";
import { Input } from "@/components/ui/input";
import { createJob } from "@/lib/actions/jobs";

const JOB_TYPES = ["Full-time", "Part-time", "Contract", "Internship"];

export type JobInput = {
  title: string;
  company: string;
  category: string;
  jobType: string;
  isRemote: boolean;
  location: string;
  deadline: string;
  minSalary: string;
  maxSalary: string;
  frequency: string;
  responsibilities: string;
  requirements: string;
};
const CATEGORIES = [
  "Engineering & Tech",
  "Design",
  "Marketing",
  "Finance",
  "Healthcare",
  "Other",
];
const FREQUENCIES = ["per hour", "per month", "per year"];

const initialForm = {
  title: "",
  company: "",
  category: CATEGORIES[0],
  jobType: "Full-time",
  isRemote: false,
  location: "",
  deadline: "",
  minSalary: "",
  maxSalary: "",
  frequency: FREQUENCIES[0],
  responsibilities: "",
  requirements: "",
};

const inputClass =
  "w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50";

const labelClass = "text-sm font-medium";

/* Shared gradient button style */
const gradientBtn =
  "group inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-[#7773E8]/40 bg-gradient-to-r from-[#5146D8] to-[#7773E8] px-6 text-sm font-semibold text-white shadow-[0_5px_25px_rgba(81,70,216,0.25)] transition-all duration-300 hover:scale-[1.04] hover:border-[#B5B3F5] hover:from-[#6259E8] hover:to-[#8985F5] hover:shadow-[0_8px_35px_rgba(81,70,216,0.5)] active:scale-[0.97]";

/* ---------- Custom Select ---------- */
function CustomSelect({
  id,
  value,
  options,
  onChange,
}: {
  id: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("keydown", onEsc);
    };
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        id={id}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className={`flex h-[38px] w-full items-center justify-between rounded-lg border px-3 text-sm outline-none transition-all duration-300 hover:border-[#7773E8]/70 focus-visible:ring-2 focus-visible:ring-[#5146D8]/30 ${open
            ? "border-[#7773E8] shadow-[0_0_20px_rgba(81,70,216,0.25)]"
            : "border-input"
          }`}
      >
        <span className="truncate">{value}</span>
        <ChevronDown
          size={16}
          className={`ml-2 shrink-0 text-[#7773E8] transition-transform duration-300 ${open ? "rotate-180" : ""
            }`}
        />
      </button>

      {open && (
        <div
          role="listbox"
          className="absolute left-0 right-0 top-full z-50 mt-2 max-h-72 overflow-y-auto rounded-xl border border-[#7773E8]/40 bg-popover p-1.5 shadow-[0_15px_50px_rgba(81,70,216,0.3)] animate-in fade-in zoom-in-95 duration-150"
        >
          {options.map((opt) => {
            const selected = opt === value;
            return (
              <button
                key={opt}
                type="button"
                role="option"
                aria-selected={selected}
                onClick={() => {
                  onChange(opt);
                  setOpen(false);
                }}
                className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm transition-all duration-200 ${selected
                    ? "bg-gradient-to-r from-[#5146D8] to-[#7773E8] text-white"
                    : "text-foreground hover:bg-[#5146D8]/15 hover:pl-4"
                  }`}
              >
                {opt}
                {selected && <Check size={16} />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* ---------- Section ---------- */
function Section({
  step,
  title,
  children,
}: {
  step: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    // focus-within:z-20 => dropdown khola section porer section er upore thake
    <section className="relative rounded-xl border bg-card p-6 focus-within:z-20">
      <h2 className="mb-6 text-lg font-semibold">
        {step}. {title}
      </h2>
      <div className="flex flex-col gap-4">{children}</div>
    </section>
  );
}

function PostNewJobPage() {
  const [form, setForm] = useState(initialForm);

  const setField = (key: keyof typeof form, value: string | boolean) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(form)

    try {
      const result = await createJob(form);
      console.log('createJob result', result);
      // TODO: show a success toast and redirect to Manage Jobs
    } catch (error) {
      console.error('createJob failed:', error);
      // TODO: show an error toast with the message
    }
  };

  return (
    <div className="flex flex-col gap-6 p-6">
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <Link
            href="/dashboard/recruiter/jobs"
            className="text-xs text-muted-foreground hover:underline"
          >
            ← Manage Jobs
          </Link>
          <h1 className="mt-1 text-2xl font-bold">Post a New Job</h1>
          <p className="text-sm text-muted-foreground">
            Fill in the position specifications to attract qualified talent
            across our network.
          </p>
        </div>
        <button type="submit" form="post-job-form" className={gradientBtn}>
          Publish Job
          <Rocket
            size={16}
            className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-1"
          />
        </button>
      </header>

      <form
        id="post-job-form"
        onSubmit={handleSubmit}
        className="flex flex-col gap-6"
      >
        <Section step={1} title="Basic Information">
          <div className="flex flex-col gap-1.5">
            <label className={labelClass}>Job Title *</label>
            <Input
              required
              placeholder="Frontend Developer"
              value={form.title}
              onChange={(e) => setField("title", e.target.value)}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <label className={labelClass}>Company Name *</label>
              <Input
                required
                placeholder="HirePulse Network"
                value={form.company}
                onChange={(e) => setField("company", e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="category" className={labelClass}>
                Job Category *
              </label>
              <CustomSelect
                id="category"
                value={form.category}
                options={CATEGORIES}
                onChange={(v) => setField("category", v)}
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className={labelClass}>Job Type *</label>
            <div className="flex flex-wrap gap-2">
              {JOB_TYPES.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setField("jobType", t)}
                  className={
                    form.jobType === t
                      ? "rounded-lg border border-[#7773E8] bg-gradient-to-r from-[#5146D8] to-[#7773E8] px-4 py-2 text-sm font-medium text-white shadow-[0_0_20px_rgba(81,70,216,0.4)] transition-all duration-300 hover:scale-105 active:scale-95"
                      : "rounded-lg border border-border px-4 py-2 text-sm font-medium transition-all duration-300 hover:scale-105 hover:border-[#7773E8]/70 hover:bg-[#5146D8]/10 active:scale-95"
                  }
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </Section>

        <Section step={2} title="Location, Compensation & Timeline">
          <div className="flex items-center gap-3">
            <button
              type="button"
              role="switch"
              aria-checked={form.isRemote}
              onClick={() => setField("isRemote", !form.isRemote)}
              className={
                form.isRemote
                  ? "relative h-6 w-11 shrink-0 rounded-full bg-gradient-to-r from-[#5146D8] to-[#7773E8] shadow-[0_0_15px_rgba(81,70,216,0.5)] transition-all duration-300"
                  : "relative h-6 w-11 shrink-0 rounded-full bg-input transition-all duration-300"
              }
            >
              <span
                className={
                  form.isRemote
                    ? "absolute top-0.5 left-[22px] size-5 rounded-full bg-white transition-all"
                    : "absolute top-0.5 left-0.5 size-5 rounded-full bg-background transition-all"
                }
              />
            </button>
            <div>
              <p className="text-sm font-medium">Remote Work Allowed</p>
              <p className="text-xs text-muted-foreground">
                Enable worldwide or distributed candidate applications
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <label className={labelClass}>Job Location *</label>
              <Input
                required
                placeholder="New York, USA"
                value={form.location}
                onChange={(e) => setField("location", e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className={labelClass}>Application Deadline</label>
              <Input
                type="date"
                value={form.deadline}
                onChange={(e) => setField("deadline", e.target.value)}
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="flex flex-col gap-1.5">
              <label className={labelClass}>Min Salary / Rate</label>
              <Input
                type="number"
                min="0"
                placeholder="25"
                value={form.minSalary}
                onChange={(e) => setField("minSalary", e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className={labelClass}>Max Salary / Rate</label>
              <Input
                type="number"
                min="0"
                placeholder="40"
                value={form.maxSalary}
                onChange={(e) => setField("maxSalary", e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="frequency" className={labelClass}>
                Frequency
              </label>
              <CustomSelect
                id="frequency"
                value={form.frequency}
                options={FREQUENCIES}
                onChange={(v) => setField("frequency", v)}
              />
            </div>
          </div>
        </Section>

        <Section step={3} title="Responsibilities & Requirements">
          <div className="flex flex-col gap-1.5">
            <label className={labelClass}>Key Responsibilities *</label>
            <textarea
              required
              rows={5}
              className={inputClass + " min-h-28"}
              value={form.responsibilities}
              onChange={(e) => setField("responsibilities", e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className={labelClass}>Qualifications & Requirements *</label>
            <textarea
              required
              rows={5}
              className={inputClass + " min-h-28"}
              value={form.requirements}
              onChange={(e) => setField("requirements", e.target.value)}
            />
          </div>
        </Section>

        <button type="submit" className={`${gradientBtn} h-12 w-full`}>
          Publish Job
          <Rocket
            size={16}
            className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-1"
          />
        </button>
      </form>
    </div>
  );
}

export default PostNewJobPage;