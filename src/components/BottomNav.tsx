"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * Navigation principale : barre d'onglets en bas sur mobile (atteignable au
 * pouce, comme une app native), barre horizontale classique sur grand écran.
 */
const TABS = [
  { href: "/", label: "Réviser", icon: "◉" },
  { href: "/exercices", label: "Exercices", icon: "◈" },
  { href: "/mots", label: "Mots", icon: "☰" },
  { href: "/progres", label: "Progrès", icon: "▲" },
];

export default function BottomNav() {
  const pathname = usePathname() ?? "/";

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  }

  return (
    <nav
      className="fixed bottom-0 inset-x-0 z-20 bg-paper-2 border-t border-line"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      aria-label="Navigation principale"
    >
      <div className="max-w-2xl mx-auto grid grid-cols-4">
        {TABS.map((tab) => {
          const active = isActive(tab.href);
          return (
            <Link
              key={tab.href}
              href={tab.href}
              aria-current={active ? "page" : undefined}
              className={`flex flex-col items-center justify-center gap-1 py-2.5 font-ui text-[10.5px] tracking-wide transition-colors ${
                active ? "text-ink" : "text-muted"
              }`}
            >
              <span
                aria-hidden
                className="text-[15px] leading-none"
                style={{ color: active ? "var(--gold)" : undefined }}
              >
                {tab.icon}
              </span>
              {tab.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
