import Image from "next/image";

type ScrollScaleImageProps = {
  src: string;
  alt: string;
  /** Tailwind aspect-ratio class, e.g. "aspect-[943/480]". */
  aspect: string;
  preload?: boolean;
};

/**
 * Section image card for the guide. Static — the rounded box simply holds the
 * image (no scroll animation).
 */
export default function ScrollScaleImage({
  src,
  alt,
  aspect,
  preload,
}: ScrollScaleImageProps) {
  return (
    <div className={`relative w-full shrink-0 lg:w-[42%] ${aspect}`}>
      <div className="absolute inset-0 overflow-hidden rounded-2xl bg-[#edece8]">
        <Image
          src={src}
          alt={alt}
          fill
          preload={preload}
          sizes="(max-width: 1024px) 100vw, 640px"
          className="object-cover"
        />
      </div>
    </div>
  );
}
