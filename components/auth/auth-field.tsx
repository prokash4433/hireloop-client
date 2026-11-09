import { cn } from "cn";

type AuthFieldProps = {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  value: string;
  required?: boolean;
  className?: string;
  onChange: (value: string) => void;
};

export function AuthField({
  label,
  name,
  type = "text",
  placeholder,
  autoComplete,
  value,
  required = true,
  className,
  onChange,
}: AuthFieldProps) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label
        htmlFor={name}
        className="font-heading text-sm font-semibold text-white/80"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        value={value}
        required={required}
        onChange={(event) => onChange(event.target.value)}
        className="font-heading h-12 w-full rounded-[12px] border border-transparent bg-[linear-gradient(180deg,#1b1b1b,#010102)_padding-box,linear-gradient(180deg,rgba(168,168,168,0.3),rgba(153,153,153,0))_border-box] px-4 text-base text-white outline-none transition-colors placeholder:text-white/50 focus-visible:border-hire-cta"
      />
    </div>
  );
}
