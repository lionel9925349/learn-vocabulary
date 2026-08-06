"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV = [
  { href: "/", label: "Accueil" },
  { href: "/articles", label: "Articles" },
  { href: "/declinaisons", label: "Déclinaisons" },
  { href: "/mots", label: "Mots" },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <>
      {NAV.map((item) => {
        const active = item.href === "/" ? pathname === "/" : pathname?.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`px-3 py-1.5 rounded-full transition-colors whitespace-nowrap ${
              active ? "bg-ink text-paper" : "text-muted hover:text-ink hover:bg-paper-2"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </>
  );
}
