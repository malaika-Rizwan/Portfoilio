"use client";

type LogoProps = {
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "black" | "white";
};

const sizeClasses = {
  sm: "w-7 h-6 text-xs",
  md: "w-9 h-7 text-sm",
  lg: "w-11 h-8 text-base",
};

export default function Logo({ className = "", size = "md", variant = "black" }: LogoProps) {
  const isBlack = variant === "black";
  return (
    <span
      className={`inline-flex items-center justify-center rounded-md font-mono font-semibold ${sizeClasses[size]} ${
        isBlack ? "bg-black text-white" : "bg-white text-black"
      } ${className}`}
      aria-hidden
    >
      &gt;_
    </span>
  );
}
