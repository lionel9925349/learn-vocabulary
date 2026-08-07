"use client";

/**
 * Prononciation allemande via la synthèse vocale du navigateur.
 * Fonctionne hors-ligne sur Android/iOS (moteur TTS du système), ce qui
 * compte pour un usage dans le bus ou le train.
 */

let cachedVoice: SpeechSynthesisVoice | null = null;
let voicesReady = false;

function pickGermanVoice(): SpeechSynthesisVoice | null {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return null;
  const voices = window.speechSynthesis.getVoices();
  if (voices.length === 0) return null;
  const german = voices.filter((v) => v.lang.toLowerCase().startsWith("de"));
  if (german.length === 0) return null;
  // Une voix locale évite tout appel réseau — indispensable hors-ligne.
  return german.find((v) => v.localService) ?? german[0];
}

function ensureVoices() {
  if (voicesReady || typeof window === "undefined" || !("speechSynthesis" in window)) return;
  cachedVoice = pickGermanVoice();
  if (cachedVoice) {
    voicesReady = true;
  } else {
    // Sur Chrome la liste arrive de façon asynchrone.
    window.speechSynthesis.onvoiceschanged = () => {
      cachedVoice = pickGermanVoice();
      voicesReady = !!cachedVoice;
    };
  }
}

export function speechSupported(): boolean {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}

/** Prononce un mot ou une phrase en allemand. */
export function speak(text: string, rate = 0.9): void {
  if (!speechSupported()) return;
  ensureVoices();
  const synth = window.speechSynthesis;
  synth.cancel(); // coupe la lecture précédente pour éviter les files d'attente
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "de-DE";
  utter.rate = rate;
  const voice = cachedVoice ?? pickGermanVoice();
  if (voice) utter.voice = voice;
  synth.speak(utter);
}
