/**
 * Génère les icônes PNG de la PWA sans dépendance externe.
 *
 * Motif : fond sombre + trois barres aux couleurs der/die/das — lisible en
 * petit sur un écran d'accueil de téléphone.
 *
 *   node scripts/generate-icons.mjs
 */
import { deflateSync } from "node:zlib";
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const OUT_DIR = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "icons");

const BG = [0x1b, 0x1f, 0x26];
const BARS = [
  [0x2f, 0x5d, 0x7c], // der
  [0x9a, 0x3b, 0x47], // die
  [0x4a, 0x6b, 0x3f], // das
];

const CRC_TABLE = (() => {
  const table = new Int32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    table[n] = c;
  }
  return table;
})();

function crc32(buf) {
  let c = -1;
  for (let i = 0; i < buf.length; i++) c = CRC_TABLE[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return (c ^ -1) >>> 0;
}

function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const typeAndData = Buffer.concat([Buffer.from(type, "ascii"), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(typeAndData));
  return Buffer.concat([len, typeAndData, crc]);
}

/** Construit un PNG RGB 8 bits à partir d'une fonction (x, y) → [r, g, b]. */
function png(size, pixel) {
  const raw = Buffer.alloc(size * (size * 3 + 1));
  let p = 0;
  for (let y = 0; y < size; y++) {
    raw[p++] = 0; // filtre "none" pour cette scanline
    for (let x = 0; x < size; x++) {
      const [r, g, b] = pixel(x, y);
      raw[p++] = r;
      raw[p++] = g;
      raw[p++] = b;
    }
  }

  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(size, 0);
  ihdr.writeUInt32BE(size, 4);
  ihdr[8] = 8; // profondeur
  ihdr[9] = 2; // couleur RGB
  ihdr[10] = 0;
  ihdr[11] = 0;
  ihdr[12] = 0;

  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk("IHDR", ihdr),
    chunk("IDAT", deflateSync(raw, { level: 9 })),
    chunk("IEND", Buffer.alloc(0)),
  ]);
}

function draw(size) {
  // Zone utile réduite : une icône « maskable » peut être rognée en cercle.
  const inset = size * 0.22;
  const usable = size - inset * 2;
  const gap = usable * 0.08;
  const barW = (usable - gap * 2) / 3;
  const barTop = inset + usable * 0.12;
  const barBottom = inset + usable * 0.88;
  const radius = barW * 0.28;

  return (x, y) => {
    for (let i = 0; i < 3; i++) {
      const left = inset + i * (barW + gap);
      const right = left + barW;
      // Hauteur croissante : évoque une progression d'apprentissage.
      const top = barTop + (2 - i) * usable * 0.09;
      if (x >= left && x < right && y >= top && y < barBottom) {
        // Coins arrondis
        const dx = Math.min(x - left, right - 1 - x);
        const dy = Math.min(y - top, barBottom - 1 - y);
        if (dx < radius && dy < radius) {
          const d = Math.hypot(radius - dx, radius - dy);
          if (d > radius) continue;
        }
        return BARS[i];
      }
    }
    return BG;
  };
}

mkdirSync(OUT_DIR, { recursive: true });
for (const size of [192, 512]) {
  const file = join(OUT_DIR, `icon-${size}.png`);
  writeFileSync(file, png(size, draw(size)));
  console.log(`✓ ${file}`);
}
