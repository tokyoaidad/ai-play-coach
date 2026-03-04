"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

interface LayoutShellProps {
  children: ReactNode;
}

function navIsActive(pathname: string, href: string): boolean {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function LayoutShell({ children }: LayoutShellProps) {
  const pathname = usePathname();

  return (
    <div className="mx-auto flex min-h-screen max-w-screen-md flex-col px-4">
      <header
        className="sticky top-0 z-20 -mx-4 mb-2 border-b border-orange-100 bg-[#FFF8F1]/95 backdrop-blur"
        aria-label="主导航"
      >
        <div className="mx-auto flex max-w-screen-md items-center justify-between px-4 py-3">
          <Link
            href="/"
            className="text-base font-semibold tracking-tight text-slate-900"
          >
            AI Play Coach
          </Link>
          <nav className="flex items-center gap-3 text-sm">
            {[
              { href: "/", label: "Home" },
              { href: "/activities", label: "Activities" },
              { href: "/favorites", label: "Favorites" },
            ].map((item) => {
              const active = navIsActive(pathname, item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-full px-3 py-1 transition-colors ${
                    active
                      ? "bg-orange-100 text-orange-700"
                      : "text-slate-700 hover:bg-orange-50 hover:text-orange-700"
                  }`}
                  aria-current={active ? "page" : undefined}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>
      <main className="flex-1 pb-8 pt-3">{children}</main>
    </div>
  );
}

