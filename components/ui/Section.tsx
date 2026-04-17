import { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  dark?: boolean;
  noPadding?: boolean;
}

export default function Section({
  children,
  className = "",
  id,
  dark = false,
  noPadding = false,
}: SectionProps) {
  return (
    <section
      id={id}
      className={`relative ${noPadding ? "" : "py-section"} ${
        dark ? "bg-midnight" : "bg-charcoal"
      } ${className}`}
    >
      {children}
    </section>
  );
}
