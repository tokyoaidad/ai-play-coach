import type { ReactNode } from "react";

interface TagChipProps {
  children: ReactNode;
}

export function TagChip({ children }: TagChipProps) {
  return (
    <span className="inline-flex items-center rounded-full bg-orange-50 px-2.5 py-0.5 text-xs font-medium text-orange-700">
      {children}
    </span>
  );
}

