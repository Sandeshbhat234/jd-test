import Image from "next/image";
import type { ArticleBlock } from "@/data/blog-articles";

const bodyText =
  "font-cy text-[clamp(16px,1.5vw,22px)] leading-[1.6] tracking-[0.4px] text-[#1e1e1e]";
const sectionHeading =
  "scroll-mt-28 font-serif text-[clamp(24px,3vw,36px)] leading-[1.35] text-[#1e1e1e]";

export default function ArticleBody({ blocks }: { blocks: ArticleBlock[] }) {
  return (
    <div className="flex flex-col gap-[clamp(28px,3vw,40px)]">
      {blocks.map((block, i) => {
        switch (block.kind) {
          case "heading":
            return (
              <h2 key={i} id={block.id} className={sectionHeading}>
                {block.text}
              </h2>
            );

          case "subheading":
            return (
              <h3
                key={i}
                className="font-serif text-[clamp(20px,2.2vw,26px)] leading-snug text-[#1e1e1e]"
              >
                {block.text}
              </h3>
            );

          case "paragraph":
            return (
              <p key={i} className={bodyText}>
                {block.text}
              </p>
            );

          case "table":
            return (
              <div
                key={i}
                className="-mx-[clamp(16px,2vw,0px)] overflow-x-auto rounded-2xl border border-[#1e1e1e]/15"
              >
                <table className="w-full border-collapse text-left">
                  <thead>
                    <tr className="bg-[rgba(234,233,228,0.5)]">
                      {block.headers.map((h) => (
                        <th
                          key={h}
                          className="border-b border-[#1e1e1e]/15 p-[clamp(10px,1.2vw,16px)] font-cy text-[clamp(13px,1.1vw,16px)] font-medium tracking-[0.3px] text-[#1e1e1e]"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {block.rows.map((row, r) => (
                      <tr key={r} className="align-top">
                        {row.map((cell, c) => (
                          <td
                            key={c}
                            className={`border-b border-[#1e1e1e]/10 p-[clamp(10px,1.2vw,16px)] font-cy text-[clamp(13px,1.1vw,16px)] leading-relaxed text-[rgba(30,30,30,0.8)] ${
                              c === 0 ? "font-medium text-[#1e1e1e]" : ""
                            }`}
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );

          case "list":
            return (
              <ul key={i} className="flex flex-col gap-3 pl-6">
                {block.items.map((item) => (
                  <li
                    key={item}
                    className={`list-disc ${bodyText} marker:text-[#1e1e1e]`}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            );

          case "image":
            return (
              <figure key={i} className="flex flex-col gap-3">
                <div className="overflow-hidden rounded-[10px] border border-[#1e1e1e]/15">
                  <Image
                    src={block.src}
                    alt={block.alt}
                    width={block.width}
                    height={block.height}
                    sizes="(min-width: 1024px) 65vw, 90vw"
                    className="h-auto w-full"
                  />
                </div>
                {block.caption && (
                  <figcaption className="font-cy text-[clamp(13px,1.1vw,16px)] italic leading-snug text-[rgba(30,30,30,0.6)]">
                    {block.caption}
                  </figcaption>
                )}
              </figure>
            );

          case "callout":
            return (
              <div
                key={i}
                className="rounded-2xl border border-[#1e1e1e] bg-[rgba(234,233,228,0.35)] p-[clamp(20px,2vw,28px)]"
              >
                {block.label && (
                  <p className="mb-2 font-cy text-[clamp(13px,1vw,15px)] font-medium uppercase tracking-[1px] text-[#0c1e46]">
                    {block.label}
                  </p>
                )}
                <p className={bodyText}>{block.text}</p>
              </div>
            );

          default:
            return null;
        }
      })}
    </div>
  );
}
