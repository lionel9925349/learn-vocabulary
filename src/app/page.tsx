import ReviewSession from "@/components/ReviewSession";
import WORDS from "@/data";

export default function Home() {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-1">Réviser</h1>
      <p className="text-muted italic text-[14.5px] mb-6">
        Session courte et adaptative : chaque mot revient juste avant que tu ne l&rsquo;oublies.
        {" "}
        {WORDS.length} mots au total.
      </p>
      <ReviewSession pool={WORDS} />
    </div>
  );
}
