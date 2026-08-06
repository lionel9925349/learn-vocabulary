"use client";

import { useEffect, useMemo, useState } from "react";
import type { Gender, Word } from "@/lib/types";
import { categories } from "@/data";
import { getBestStreak, setBestStreak } from "@/lib/storage";
import { mdBold } from "@/lib/markdown";

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const GENDERS: Gender[] = ["der", "die", "das"];
const STORAGE_KEY = "articles";

interface Session {
  queue: Word[];
  current: Word | null;
}

function buildSession(pool: Word[]): Session {
  const shuffled = shuffle(pool);
  return {
    queue: shuffled.slice(1),
    current: shuffled[0] ?? null,
  };
}

export default function ArticleQuizSession({ pool, storageKey }: { pool: Word[]; storageKey: string }) {
  const [session, setSession] = useState(() => buildSession(pool));
  const [total, setTotal] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBest] = useState(() => getBestStreak(STORAGE_KEY + ":" + storageKey));
  const [missed, setMissed] = useState<Word[]>([]);
  const [selected, setSelected] = useState<Gender | null>(null);
  const [answered, setAnswered] = useState(false);
  const [finished, setFinished] = useState(false);

  const { queue, current } = session;
  const poolSize = pool.length;

  function restart() {
    setSession(buildSession(pool));
    setTotal(0);
    setCorrectCount(0);
    setStreak(0);
    setMissed([]);
    setAnswered(false);
    setSelected(null);
    setFinished(false);
  }

  function next() {
    if (queue.length === 0) {
      setFinished(true);
      setSession((s) => ({ ...s, current: null }));
      return;
    }
    const [head, ...rest] = queue;
    setSession({ queue: rest, current: head });
    setAnswered(false);
    setSelected(null);
  }

  function choose(g: Gender) {
    if (!current || answered) return;
    setAnswered(true);
    setSelected(g);
    setTotal((t) => t + 1);
    if (g === current.artikel) {
      setCorrectCount((c) => c + 1);
      setStreak((s) => {
        const n = s + 1;
        if (n > bestStreak) {
          setBest(n);
          setBestStreak(STORAGE_KEY + ":" + storageKey, n);
        }
        return n;
      });
    } else {
      setStreak(0);
      setMissed((m) => [...m, current]);
      setSession((s) => {
        const copy = [...s.queue];
        const pos = Math.min(copy.length, 4 + Math.floor(Math.random() * 4));
        copy.splice(pos, 0, current);
        return { ...s, queue: copy };
      });
    }
  }

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (answered && (e.key === "Enter" || e.key === " ")) {
        e.preventDefault();
        next();
        return;
      }
      if (!answered) {
        const map: Record<string, Gender> = { "1": "der", "2": "die", "3": "das", j: "der", k: "die", l: "das" };
        const g = map[e.key];
        if (g) choose(g);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const seen = total;
  const remaining = queue.length + (current ? 1 : 0);
  const pct = poolSize ? (seen / (seen + remaining)) * 100 : 0;

  const uniqMissed = useMemo(() => {
    const seenIds = new Set<string>();
    const out: Word[] = [];
    for (const m of missed) {
      if (!seenIds.has(m.id)) {
        seenIds.add(m.id);
        out.push(m);
      }
    }
    return out;
  }, [missed]);

  return (
    <div>
      <div className="flex justify-between items-baseline font-ui text-xs text-muted mt-5 mb-1.5 tracking-wide">
        <span>{finished ? `${poolSize} mots · terminé` : `Mot ${Math.min(seen + 1, poolSize)} · ${poolSize} au total`}</span>
        <span>
          Série : <b className="text-gold">{streak}</b>
        </span>
      </div>
      <div className="h-[3px] bg-line rounded overflow-hidden">
        <div className="h-full bg-ink transition-all duration-300" style={{ width: `${pct}%` }} />
      </div>

      {!finished && current && (
        <div className="bg-paper-2 border border-line rounded-sm px-6 py-8 mt-5">
          <div className="font-ui text-[10.5px] tracking-[0.18em] uppercase text-muted text-center mb-4">
            {categories.find((c) => c.key === current.category)?.label ?? current.category}
          </div>
          <div className="text-center text-[32px] font-semibold min-h-[44px]">{current.de}</div>
          <div className="text-center text-sm text-muted italic mt-1.5 min-h-[20px]">
            {current.plural ? `Pluriel : die ${current.plural}` : "(pas de pluriel courant)"}
          </div>

          <div className="grid grid-cols-3 gap-2.5 mt-6">
            {GENDERS.map((g) => (
              <button
                key={g}
                disabled={answered}
                onClick={() => choose(g)}
                className="text-xl font-semibold py-4 rounded border-[1.5px] transition-transform active:translate-y-px disabled:cursor-default"
                style={{
                  borderColor: `var(--${g})`,
                  background: answered
                    ? g === current.artikel
                      ? `var(--${g})`
                      : g === selected
                        ? "var(--line)"
                        : "transparent"
                    : "transparent",
                  color: answered && g === current.artikel ? "#fff" : undefined,
                  opacity: answered && g !== current.artikel && g !== selected ? 0.45 : 1,
                }}
              >
                {g}
              </button>
            ))}
          </div>

          {answered && current && (
            <div className="mt-5 border-t border-line pt-4 text-[15px]">
              <div className="font-semibold mb-2 text-[16px]" style={{ color: selected === current.artikel ? "var(--das)" : "var(--die)" }}>
                {selected === current.artikel ? "Richtig — " : "Non — c'est "}
                {current.artikel} {current.de}
                <span className="font-normal text-muted"> — {current.fr}</span>
              </div>
              <div
                className="text-[14.5px] bg-paper border-l-[3px] rounded-sm px-3.5 py-2.5"
                style={{ borderColor: "var(--gold)" }}
                dangerouslySetInnerHTML={{ __html: mdBold(current.rule) }}
              />
              <div className="mt-2.5 text-[14px] text-muted italic">
                <span dangerouslySetInnerHTML={{ __html: mdBold(current.example.de) }} />
                <div className="not-italic text-[13px] mt-0.5">{current.example.fr}</div>
              </div>
            </div>
          )}

          {answered && (
            <button
              onClick={next}
              className="font-ui w-full mt-5 text-[13px] font-semibold tracking-[0.06em] uppercase py-3.5 bg-ink text-paper rounded cursor-pointer active:translate-y-px"
            >
              Mot suivant →
            </button>
          )}
        </div>
      )}

      {finished && (
        <div className="bg-paper-2 border border-line rounded-sm px-6 py-10 mt-5 text-center">
          <h2 className="text-2xl font-semibold mb-2">Série terminée</h2>
          <div className="text-lg">
            <b className="text-xl">
              {correctCount}/{total}
            </b>{" "}
            corrects
          </div>
          <p className="text-muted mt-1.5">
            {rateMessage(total ? Math.round((correctCount / total) * 100) : 0)} Meilleure série : {bestStreak}.
          </p>

          {uniqMissed.length > 0 && (
            <div className="text-left max-w-md mx-auto mt-7">
              <h3 className="font-ui text-[12px] uppercase tracking-[0.1em] text-muted mb-2.5">
                À revoir en priorité
              </h3>
              <ul>
                {uniqMissed.map((m) => (
                  <li key={m.id} className="py-1.5 border-b border-line text-[16px] flex justify-between gap-3">
                    <span>
                      <span className="font-semibold" style={{ color: `var(--${m.artikel})` }}>
                        {m.artikel}
                      </span>{" "}
                      {m.de}
                    </span>
                    <span className="text-muted italic text-[14px]">{m.fr}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <button
            onClick={restart}
            className="font-ui mt-7 max-w-[280px] w-full mx-auto block text-[13px] font-semibold tracking-[0.06em] uppercase py-3.5 bg-ink text-paper rounded cursor-pointer active:translate-y-px"
          >
            Recommencer →
          </button>
        </div>
      )}

      <p className="font-ui text-[11px] text-muted text-center mt-4">
        Raccourcis clavier : 1/2/3 ou j/k/l pour répondre, Entrée/Espace pour continuer.
      </p>
    </div>
  );
}

function rateMessage(rate: number): string {
  if (rate >= 95) return "Presque natif sur ce lot. Passe à un autre thème.";
  if (rate >= 80) return "Solide. Les articles commencent à s'ancrer.";
  if (rate >= 60) return "En progrès — refais ce lot demain, la répétition espacée fait le reste.";
  return "Normal au début. Ce sont justement ces mots qu'il faut voir souvent.";
}
