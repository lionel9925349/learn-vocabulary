import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import NavLinks from "./NavLinks";
import WORDS from "@/data";

export default function Header() {
  return (
    <header className="w-full border-b border-line">
      <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
        <Link href="/" className="group">
          <div className="font-ui text-[10.5px] uppercase tracking-[0.22em] text-muted font-bold">
            Deutsch · Logistik &amp; IT
          </div>
          <div className="text-xl font-semibold -mt-0.5 group-hover:text-gold transition-colors">
            der, die oder das?
          </div>
        </Link>
        <ThemeToggle />
      </div>
      <nav className="max-w-2xl mx-auto px-4 pb-3 flex items-center gap-1 font-ui text-[13px] overflow-x-auto no-scrollbar">
        <NavLinks />
        <span className="ml-auto text-muted whitespace-nowrap pl-2">
          {WORDS.length} mots
        </span>
      </nav>
    </header>
  );
}
