import type { Metadata } from "next";
import Flashcards from "@/components/Flashcards";

export const metadata: Metadata = {
  title: "Cartes mémoire",
};

export default function FlashcardsPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-1">Cartes mémoire</h1>
      <p className="text-muted italic text-[14.5px] mb-6">
        Sans quiz : tu regardes, tu te rappelles, tu retournes la carte.
      </p>
      <Flashcards />
    </div>
  );
}
