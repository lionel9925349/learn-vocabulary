import { renderMarkup } from "@/lib/markdown";

/** Rend le balisage léger (**gras**, _italique_, paragraphes) des règles et explications. */
export default function Markup({ text, className }: { text: string; className?: string }) {
  return (
    <div className={className}>
      <p dangerouslySetInnerHTML={{ __html: renderMarkup(text) }} />
    </div>
  );
}
