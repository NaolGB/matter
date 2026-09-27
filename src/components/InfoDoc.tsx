import { Fragment } from "react";
import type { InfoBlock, InfoDocument } from "@/content/guide";

/** The inline markdown the in-app reader supports: **bold**, *italic*, `code`. */
export function Inline({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`|\*[^*]+\*)/g);
  return (
    <>
      {parts.map((part, index) => {
        if (part.startsWith("**")) {
          return (
            <strong key={index} className="font-semibold text-ink">
              {part.slice(2, -2)}
            </strong>
          );
        }
        if (part.startsWith("`")) {
          return (
            <code key={index} className="rounded-[4px] bg-track px-1 py-0.5 font-mono text-[0.9em]">
              {part.slice(1, -1)}
            </code>
          );
        }
        if (part.startsWith("*")) {
          return <em key={index}>{part.slice(1, -1)}</em>;
        }
        return <Fragment key={index}>{part}</Fragment>;
      })}
    </>
  );
}

function Block({ block }: { block: InfoBlock }) {
  switch (block.kind) {
    case "heading":
      return (
        <h3 className="pt-5 text-[1.15rem] font-semibold tracking-tight text-ink">
          <Inline text={block.text} />
        </h3>
      );
    case "subheading":
      return (
        <h4 className="pt-2 text-[1rem] font-semibold text-ink">
          <Inline text={block.text} />
        </h4>
      );
    case "paragraph":
      return (
        <p>
          <Inline text={block.text} />
        </p>
      );
    case "bullet":
      return (
        <div className="flex gap-3">
          <span className="text-ink-faint">•</span>
          <p>
            <Inline text={block.text} />
          </p>
        </div>
      );
    case "step":
      return (
        <div className="flex gap-3">
          <span className="w-4 shrink-0 text-right tabular-nums text-ink-faint">{block.n}.</span>
          <p>
            <Inline text={block.text} />
          </p>
        </div>
      );
    case "note":
      return (
        <aside className="rounded-[12px] border border-hairline bg-track px-4 py-3 text-[0.95em]">
          <Inline text={block.text} />
        </aside>
      );
  }
}

export function InfoDoc({ doc }: { doc: InfoDocument }) {
  return (
    <article id={doc.id} className="scroll-mt-24">
      <h2 className="text-[clamp(1.5rem,3vw,2rem)] font-semibold tracking-[-0.02em]">{doc.title}</h2>
      <div className="mt-4 space-y-3 text-[15.5px] leading-[1.6] text-ink-muted">
        {doc.blocks.map((block, index) => (
          <Block key={index} block={block} />
        ))}
      </div>
    </article>
  );
}
