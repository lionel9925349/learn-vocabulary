import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  return (
    <header className="w-full border-b border-line bg-paper sticky top-0 z-10">
      <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <Link href="/" className="group min-w-0">
          <div className="font-ui text-[9.5px] uppercase tracking-[0.2em] text-muted font-bold">
            Deutsch · Logistik · Einkauf · IT
          </div>
          <div className="text-lg font-semibold -mt-0.5 group-hover:text-gold transition-colors truncate">
            der, die oder das?
          </div>
        </Link>
        <ThemeToggle />
      </div>
    </header>
  );
}
