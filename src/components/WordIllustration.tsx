/**
 * Illustrations des mots concrets.
 *
 * Dessinées en SVG plutôt que photographiées : aucune question de licence,
 * poids négligeable (le tout pèse moins qu'une seule photo), rendu net à toute
 * taille, et surtout disponible **hors-ligne** — ce qui compte pour une app
 * qu'on utilise dans le train. Voir un objet en même temps que son nom aide
 * nettement à le retenir : deux traces mémorielles valent mieux qu'une.
 *
 * Les étiquettes de danger ADR sont reproduites fidèlement (losange, couleurs,
 * numéro de classe) : elles sont normalisées, donc le dessin *est* l'objet réel.
 */

type Draw = (c: { stroke: string; fill: string; muted: string }) => React.ReactNode;

/** Losange ADR : forme normalisée, seuls la couleur et le symbole changent. */
function adrDiamond(bg: string, symbol: React.ReactNode, cls: string, dark = false) {
  const text = dark ? "#111" : "#fff";
  return (
    <>
      <rect x="14" y="14" width="72" height="72" transform="rotate(45 50 50)" fill={bg} stroke="#111" strokeWidth="2" />
      <g fill={text} stroke={text}>{symbol}</g>
      <text x="50" y="80" textAnchor="middle" fontSize="13" fontWeight="700" fill={text} stroke="none">
        {cls}
      </text>
    </>
  );
}

const FLAME = (
  <path
    d="M50 26c6 10-4 13 0 20 3-4 8-3 8-9 5 6 8 11 8 17 0 10-7 17-16 17s-16-7-16-17c0-9 8-19 16-28z"
    strokeWidth="0"
  />
);

const ILLUSTRATIONS: Record<string, Draw> = {
  // — Objets d'entrepôt —
  palette: ({ stroke, muted }) => (
    <g stroke={stroke} strokeWidth="3" fill="none" strokeLinecap="round">
      <rect x="12" y="34" width="76" height="7" />
      <rect x="12" y="47" width="76" height="7" />
      <path d="M18 54v14M50 54v14M82 54v14" />
      <rect x="12" y="68" width="76" height="7" fill={muted} fillOpacity="0.25" />
    </g>
  ),
  gitterbox: ({ stroke }) => (
    <g stroke={stroke} strokeWidth="2.5" fill="none">
      <rect x="18" y="26" width="64" height="48" />
      <path d="M18 42h64M18 58h64M34 26v48M50 26v48M66 26v48" strokeWidth="1.5" />
      <path d="M22 74v8M78 74v8" strokeWidth="3" />
    </g>
  ),
  regal: ({ stroke, muted }) => (
    <g stroke={stroke} strokeWidth="3" fill="none">
      <path d="M18 18v70M82 18v70" />
      <path d="M18 18h64M18 41h64M18 64h64M18 87h64" />
      <rect x="26" y="24" width="18" height="15" fill={muted} fillOpacity="0.3" strokeWidth="0" />
      <rect x="52" y="47" width="22" height="15" fill={muted} fillOpacity="0.3" strokeWidth="0" />
    </g>
  ),
  gabelstapler: ({ stroke, muted }) => (
    <g stroke={stroke} strokeWidth="3" fill="none" strokeLinecap="round">
      <path d="M30 70V40h20v30" />
      <path d="M50 52h14l6 18" />
      <path d="M64 20v50M76 24v46" strokeWidth="2.5" />
      <path d="M64 70h16" />
      <circle cx="36" cy="78" r="8" fill={muted} fillOpacity="0.3" />
      <circle cx="62" cy="78" r="6" fill={muted} fillOpacity="0.3" />
    </g>
  ),
  hubwagen: ({ stroke, muted }) => (
    <g stroke={stroke} strokeWidth="3" fill="none" strokeLinecap="round">
      <path d="M22 30v40" />
      <path d="M22 48h20" />
      <path d="M42 58h44M42 70h44" />
      <circle cx="46" cy="78" r="5" fill={muted} fillOpacity="0.3" />
      <circle cx="82" cy="78" r="5" fill={muted} fillOpacity="0.3" />
    </g>
  ),
  container: ({ stroke, muted }) => (
    <g stroke={stroke} strokeWidth="3" fill="none">
      <rect x="12" y="32" width="76" height="42" fill={muted} fillOpacity="0.15" />
      <path d="M24 32v42M36 32v42M48 32v42M60 32v42M72 32v42" strokeWidth="1.5" />
    </g>
  ),
  lkw: ({ stroke, muted }) => (
    <g stroke={stroke} strokeWidth="3" fill="none" strokeLinecap="round">
      <rect x="10" y="34" width="46" height="34" fill={muted} fillOpacity="0.15" />
      <path d="M56 46h14l12 12v10H56z" />
      <circle cx="28" cy="76" r="8" />
      <circle cx="72" cy="76" r="8" />
    </g>
  ),
  rampe: ({ stroke, muted }) => (
    <g stroke={stroke} strokeWidth="3" fill="none" strokeLinecap="round">
      <path d="M10 76h80" />
      <path d="M20 76V34h44v42" />
      <rect x="30" y="44" width="24" height="22" fill={muted} fillOpacity="0.25" strokeWidth="2" />
      <path d="M64 60l22 16" strokeDasharray="5 4" />
    </g>
  ),
  foerderband: ({ stroke, muted }) => (
    <g stroke={stroke} strokeWidth="3" fill="none">
      <rect x="14" y="50" width="72" height="14" rx="7" />
      <circle cx="24" cy="57" r="4" fill={muted} fillOpacity="0.4" />
      <circle cx="50" cy="57" r="4" fill={muted} fillOpacity="0.4" />
      <circle cx="76" cy="57" r="4" fill={muted} fillOpacity="0.4" />
      <rect x="40" y="30" width="20" height="16" fill={muted} fillOpacity="0.25" strokeWidth="2" />
    </g>
  ),
  karton: ({ stroke, muted }) => (
    <g stroke={stroke} strokeWidth="3" fill="none">
      <rect x="20" y="36" width="60" height="44" fill={muted} fillOpacity="0.12" />
      <path d="M20 36l30-14 30 14" />
      <path d="M50 22v14" />
      <path d="M50 36v44" strokeWidth="1.5" strokeDasharray="4 4" />
    </g>
  ),
  etikett: ({ stroke, muted }) => (
    <g stroke={stroke} strokeWidth="3" fill="none">
      <path d="M22 34h44l14 16-14 16H22z" fill={muted} fillOpacity="0.12" />
      <path d="M30 44h26M30 56h18" strokeWidth="2" />
    </g>
  ),
  barcode: ({ stroke }) => (
    <g stroke={stroke} fill="none">
      <path d="M20 34v34M26 34v34M32 34v26M38 34v34M46 34v26M52 34v34M58 34v26M66 34v34M72 34v26M78 34v34" strokeWidth="3" />
    </g>
  ),

  // — Étiquettes ADR : forme et couleurs normalisées —
  explosivstoff: () =>
    adrDiamond(
      "#f5a623",
      <g>
        <circle cx="50" cy="45" r="9" strokeWidth="0" />
        <path d="M50 26v10M36 32l6 8M64 32l-6 8M30 45h10M70 45H60M36 58l6-6M64 58l-6-6" strokeWidth="3" fill="none" />
      </g>,
      "1",
      true
    ),
  druckgas: () =>
    adrDiamond(
      "#3aa655",
      <g fill="none" strokeWidth="3">
        <rect x="42" y="28" width="16" height="30" rx="7" />
        <path d="M50 22v6" />
      </g>,
      "2"
    ),
  entzuendbar: () => adrDiamond("#e02b20", FLAME, "3"),
  giftstoff: () =>
    adrDiamond(
      "#ffffff",
      <g fill="#111" stroke="#111">
        <circle cx="50" cy="40" r="11" strokeWidth="0" />
        <circle cx="46" cy="38" r="2" fill="#fff" strokeWidth="0" />
        <circle cx="54" cy="38" r="2" fill="#fff" strokeWidth="0" />
        <path d="M36 56l28-10M64 56L36 46" strokeWidth="4" />
      </g>,
      "6",
      true
    ),
  aetzstoff: () =>
    adrDiamond(
      "#111111",
      <g fill="none" strokeWidth="3">
        <path d="M32 30l6 14M30 46h14M36 46l-4 12" />
        <path d="M62 30l6 14M60 46h14M66 46l-4 12" />
        <path d="M26 62h48" strokeWidth="4" />
      </g>,
      "8"
    ),
  radioaktivitaet: () =>
    adrDiamond(
      "#f8e71c",
      // Trèfle normalisé : trois pales identiques à 120°, autour d'un moyeu.
      <g fill="#111" stroke="none">
        {[0, 120, 240].map((angle) => (
          <path
            key={angle}
            d="M50 42 L36.5 18.6 A27 27 0 0 1 63.5 18.6 Z"
            transform={`rotate(${angle} 50 42)`}
          />
        ))}
        <circle cx="50" cy="42" r="5.5" />
      </g>,
      "7",
      true
    ),
  gefahrzettel: () =>
    adrDiamond("#e02b20", FLAME, "3"),
  warntafel: ({ stroke }) => (
    <g>
      <rect x="14" y="36" width="72" height="30" rx="4" fill="#f5a623" stroke={stroke} strokeWidth="3" />
      <path d="M14 51h72" stroke={stroke} strokeWidth="3" />
      <text x="50" y="48" textAnchor="middle" fontSize="11" fontWeight="700" fill="#111">
        33
      </text>
      <text x="50" y="63" textAnchor="middle" fontSize="11" fontWeight="700" fill="#111">
        1203
      </text>
    </g>
  ),
  feuerloescher: ({ stroke, muted }) => (
    <g stroke={stroke} strokeWidth="3" fill="none" strokeLinecap="round">
      <rect x="38" y="34" width="24" height="46" rx="6" fill={muted} fillOpacity="0.2" />
      <path d="M44 34v-6h12v6" />
      <path d="M62 40h12l-4 10" />
    </g>
  ),
  auffangwanne: ({ stroke, muted }) => (
    <g stroke={stroke} strokeWidth="3" fill="none">
      <path d="M16 50h68v22H16z" fill={muted} fillOpacity="0.2" />
      <path d="M16 62h68" strokeWidth="1.5" strokeDasharray="4 4" />
      <rect x="34" y="26" width="16" height="24" rx="3" />
      <rect x="56" y="26" width="16" height="24" rx="3" />
    </g>
  ),
};

/** Y a-t-il une illustration pour ce mot ? */
export function hasIllustration(id: string): boolean {
  return id in ILLUSTRATIONS;
}

export default function WordIllustration({ id, size = 96 }: { id: string; size?: number }) {
  const draw = ILLUSTRATIONS[id];
  if (!draw) return null;

  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      role="img"
      aria-hidden
      className="shrink-0"
      style={{ color: "var(--ink)" }}
    >
      {draw({ stroke: "currentColor", fill: "currentColor", muted: "var(--muted)" })}
    </svg>
  );
}
