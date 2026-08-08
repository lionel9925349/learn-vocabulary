"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Word } from "@/lib/types";
import { BOX_COUNT, BOX_LABELS, computeStats, todayKey } from "@/lib/srs";
import { useSrs, resetProgress } from "@/lib/srsStore";
import { categories } from "@/data";
import BackupPanel from "./BackupPanel";

export default function ProgressDashboard({ pool }: { pool: Word[] }) {
  const srs = useSrs();
  const [confirmReset, setConfirmReset] = useState(false);

  const stats = useMemo(() => computeStats(srs, pool), [srs, pool]);

  const boxCounts = useMemo(() => {
    const counts = new Array<number>(BOX_COUNT).fill(0);
    for (const w of pool) {
      const card = srs.cards[w.id];
      if (card) counts[Math.min(card.box, BOX_COUNT - 1)]++;
    }
    return counts;
  }, [srs, pool]);

  const perCategory = useMemo(() => {
    return categories
      .map((c) => {
        const words = pool.filter((w) => w.category === c.key);
        const known = words.filter((w) => (srs.cards[w.id]?.box ?? 0) >= 3).length;
        return { ...c, total: words.length, known };
      })
      .filter((c) => c.total > 0)
      .sort((a, b) => b.known / b.total - a.known / a.total);
  }, [srs, pool]);

  const last14 = useMemo(() => buildHistory(srs.history, 14), [srs.history]);
  const maxDay = Math.max(1, ...last14.map((d) => d.count));

  const touched = stats.total - stats.untouched;
  const coverage = stats.total ? Math.round((touched / stats.total) * 100) : 0;

  return (
    <div>
      <div className="grid grid-cols-2 gap-2.5">
        <BigStat
          value={stats.streakDays}
          unit={stats.streakDays > 1 ? "jours" : "jour"}
          label="Série en cours"
          accent="var(--gold)"
        />
        <BigStat
          value={stats.accuracy === null ? "—" : `${Math.round(stats.accuracy * 100)}%`}
          label="Réussite globale"
          accent="var(--das)"
        />
      </div>

      <div className="mt-6">
        <div className="flex justify-between items-baseline font-ui text-[11px] uppercase tracking-[0.12em] text-muted mb-2">
          <span>Couverture du vocabulaire</span>
          <span>
            {touched} / {stats.total}
          </span>
        </div>
        <div className="h-2.5 bg-line rounded-full overflow-hidden flex">
          <div style={{ width: `${(stats.mastered / stats.total) * 100}%`, background: "var(--das)" }} />
          <div style={{ width: `${(stats.known / stats.total) * 100}%`, background: "var(--der)" }} />
          <div style={{ width: `${(stats.learning / stats.total) * 100}%`, background: "var(--gold)" }} />
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-1 font-ui text-[11.5px] text-muted mt-2">
          <Legend color="var(--das)" label={`${stats.mastered} maîtrisés`} />
          <Legend color="var(--der)" label={`${stats.known} acquis`} />
          <Legend color="var(--gold)" label={`${stats.learning} en cours`} />
          <Legend color="var(--line)" label={`${stats.untouched} à découvrir`} />
        </div>
        <p className="text-[13.5px] text-muted mt-3">
          Tu as déjà rencontré <b className="text-ink">{coverage}%</b> du vocabulaire.
          {stats.dueNow > 0 && (
            <>
              {" "}
              <Link href="/" className="underline decoration-line hover:text-ink">
                {stats.dueNow} mot{stats.dueNow > 1 ? "s" : ""} à revoir maintenant →
              </Link>
            </>
          )}
        </p>
      </div>

      <h2 className="font-ui text-[11px] uppercase tracking-[0.14em] text-muted mt-9 mb-3">
        Activité des 14 derniers jours
      </h2>
      <div className="flex items-end gap-1 h-24 border-b border-line pb-0">
        {last14.map((d) => (
          <div key={d.key} className="flex-1 flex flex-col justify-end items-center h-full" title={`${d.key} : ${d.count}`}>
            <div
              className="w-full rounded-t"
              style={{
                height: `${(d.count / maxDay) * 100}%`,
                minHeight: d.count > 0 ? 3 : 0,
                background: d.isToday ? "var(--gold)" : "var(--der)",
              }}
            />
          </div>
        ))}
      </div>
      <div className="flex justify-between font-ui text-[10.5px] text-muted mt-1.5">
        <span>il y a 14 jours</span>
        <span>aujourd&rsquo;hui</span>
      </div>

      <h2 className="font-ui text-[11px] uppercase tracking-[0.14em] text-muted mt-9 mb-3">
        Échéancier de mémorisation
      </h2>
      <ul className="border-t border-line">
        {boxCounts.map((count, i) => (
          <li key={i} className="flex items-center justify-between gap-3 py-2 border-b border-line">
            <span className="font-ui text-[12.5px] text-muted">
              Intervalle : {BOX_LABELS[i]}
            </span>
            <span className="flex items-center gap-2 min-w-0 flex-1 justify-end">
              <span className="h-1.5 rounded-full bg-der max-w-[60%]" style={{ width: `${(count / Math.max(1, touched)) * 100}%` }} />
              <b className="text-[14px] w-8 text-right">{count}</b>
            </span>
          </li>
        ))}
      </ul>

      <h2 className="font-ui text-[11px] uppercase tracking-[0.14em] text-muted mt-9 mb-3">
        Par thème
      </h2>
      <ul className="border-t border-line">
        {perCategory.map((c) => (
          <li key={c.key} className="py-2.5 border-b border-line">
            <div className="flex justify-between items-baseline gap-3 mb-1.5">
              <Link href={`/mots?cat=${c.key}`} className="text-[14.5px] truncate hover:text-gold">
                {c.label}
              </Link>
              <span className="font-ui text-[11.5px] text-muted shrink-0">
                {c.known} / {c.total}
              </span>
            </div>
            <div className="h-1.5 bg-line rounded-full overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{ width: `${(c.known / c.total) * 100}%`, background: "var(--das)" }}
              />
            </div>
          </li>
        ))}
      </ul>

      <BackupPanel />

      <div className="mt-6 border border-line rounded-lg p-4">
        <h3 className="font-ui text-[11px] uppercase tracking-[0.12em] text-muted mb-2">
          Données
        </h3>
        <p className="text-[13.5px] text-muted mb-3">
          Ta progression est stockée uniquement sur cet appareil, dans le navigateur. Rien
          n&rsquo;est envoyé sur Internet.
        </p>
        {confirmReset ? (
          <div className="flex gap-2">
            <button
              onClick={() => {
                resetProgress();
                setConfirmReset(false);
              }}
              className="font-ui text-[12.5px] px-4 py-2.5 rounded-lg text-white"
              style={{ background: "var(--die)" }}
            >
              Confirmer l&rsquo;effacement
            </button>
            <button
              onClick={() => setConfirmReset(false)}
              className="font-ui text-[12.5px] px-4 py-2.5 rounded-lg border border-line text-muted"
            >
              Annuler
            </button>
          </div>
        ) : (
          <button
            onClick={() => setConfirmReset(true)}
            className="font-ui text-[12.5px] px-4 py-2.5 rounded-lg border border-line text-muted hover:border-ink hover:text-ink"
          >
            Réinitialiser ma progression
          </button>
        )}
      </div>
    </div>
  );
}

function BigStat({
  value,
  unit,
  label,
  accent,
}: {
  value: number | string;
  unit?: string;
  label: string;
  accent: string;
}) {
  return (
    <div className="border border-line rounded-lg bg-paper-2 py-5 text-center">
      <div className="text-3xl font-semibold" style={{ color: accent }}>
        {value}
        {unit && <span className="text-base font-normal text-muted ml-1">{unit}</span>}
      </div>
      <div className="font-ui text-[10.5px] uppercase tracking-[0.1em] text-muted mt-1">{label}</div>
    </div>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <span className="flex items-center gap-1.5">
      <i className="inline-block w-2.5 h-2.5 rounded-full shrink-0" style={{ background: color }} />
      {label}
    </span>
  );
}

function buildHistory(history: Record<string, number>, days: number) {
  const out: { key: string; count: number; isToday: boolean }[] = [];
  const today = todayKey();
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const key = todayKey(d);
    out.push({ key, count: history[key] ?? 0, isToday: key === today });
  }
  return out;
}
