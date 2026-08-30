import type { ReactNode } from "react";

type IconProps = { children: ReactNode; className?: string };

export function Icon({ children, className = "" }: IconProps) {
  return (
    <span
      aria-hidden="true"
      className={`grid h-10 w-10 shrink-0 place-items-center rounded-2xl text-lg transition ${className}`}
    >
      {children}
    </span>
  );
}
