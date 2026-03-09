"use client";

import "./StarBorder.css";

type ElementType = "button" | "a" | "span" | "div";

type StarBorderProps<T extends ElementType = "button"> = {
  as?: T;
  className?: string;
  color?: string;
  speed?: string;
  thickness?: number;
  children: React.ReactNode;
  style?: React.CSSProperties;
} & Omit<
  T extends "a"
    ? React.AnchorHTMLAttributes<HTMLAnchorElement>
    : T extends "button"
      ? React.ButtonHTMLAttributes<HTMLButtonElement>
      : T extends "span"
        ? React.HTMLAttributes<HTMLSpanElement>
        : React.HTMLAttributes<HTMLDivElement>,
  "className" | "style"
>;

export default function StarBorder<T extends ElementType = "button">({
  as,
  className = "",
  color = "white",
  speed = "6s",
  thickness = 1,
  children,
  style,
  ...rest
}: StarBorderProps<T>) {
  const Component = (as ?? "button") as keyof JSX.IntrinsicElements;
  return (
    <Component
      className={`star-border-container ${className}`}
      style={{
        padding: `${thickness}px 0`,
        ...style,
      }}
      {...(rest as Record<string, unknown>)}
    >
      <div
        className="border-gradient-bottom"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 10%)`,
          animationDuration: speed,
        }}
      />
      <div
        className="border-gradient-top"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 10%)`,
          animationDuration: speed,
        }}
      />
      <div className="inner-content">{children}</div>
    </Component>
  );
}
