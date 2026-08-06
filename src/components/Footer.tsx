export default function Footer() {
  return (
    <footer className="w-full border-t border-line">
      <div className="max-w-2xl mx-auto px-4 py-6 font-ui text-[11px] text-muted text-center leading-relaxed">
        <div className="flex justify-center gap-4 mb-2">
          <span className="flex items-center gap-1.5">
            <i className="inline-block w-2.5 h-2.5 rounded-full" style={{ background: "var(--der)" }} />
            der
          </span>
          <span className="flex items-center gap-1.5">
            <i className="inline-block w-2.5 h-2.5 rounded-full" style={{ background: "var(--die)" }} />
            die
          </span>
          <span className="flex items-center gap-1.5">
            <i className="inline-block w-2.5 h-2.5 rounded-full" style={{ background: "var(--das)" }} />
            das
          </span>
        </div>
        Chaque erreur revient en fin de série. On apprend le mot avec son article, jamais nu.
      </div>
    </footer>
  );
}
