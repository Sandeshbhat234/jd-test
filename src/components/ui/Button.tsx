import Link from "next/link";
import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  CSSProperties,
  ReactNode,
} from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary";
type Size = "sm" | "md";

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

type AsButton = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> & {
    href?: undefined;
  };

type AsLink = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "children" | "href"> & {
    href: string;
  };

export type ButtonProps = AsButton | AsLink;

type VariantStyle = {
  /** Static classes for the pill (border + idle text colour). */
  shell: string;
  /** Idle background painted under the hover fill. */
  background: string;
  /** Radial fill that grows up from the bottom-centre on hover. */
  fill: string;
  /** Text colour once the fill has covered the pill. */
  hoverText: string;
};

// Gradients taken from the Figma button styles.
const NAVY_GRADIENT =
  "linear-gradient(179deg,#160581 9%,#04103F 48%,#011F45 86%)";

const VARIANTS: Record<Variant, VariantStyle> = {
  // Dark navy pill that fills with a yellow circle on hover.
  primary: {
    shell: "border border-[#0c1e46] text-white",
    background: NAVY_GRADIENT,
    fill: "radial-gradient(circle at 50% 50%, #FFC700 23%, #FFC700 39%, #FFF0AB 77%, #D0A81A 88%)",
    hoverText: "group-hover:text-[#0c1e46] group-focus-visible:text-[#0c1e46]",
  },
  // Light cream pill that fills with a navy circle on hover.
  secondary: {
    shell: "border border-[rgba(1,31,69,0.3)] text-[#0c1e46]",
    background: "rgba(255,254,248,0.92)",
    fill: `radial-gradient(circle at 50% 50%, #1B0A8F 0%, #04103F 55%, #011F45 100%)`,
    hoverText: "group-hover:text-white group-focus-visible:text-white",
  },
};

const base =
  "group relative inline-flex items-center justify-center overflow-hidden " +
  "rounded-full whitespace-nowrap font-cy font-medium uppercase tracking-wide leading-none " +
  "transition-[transform,filter] duration-200 ease-out " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0c1e46]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent " +
  "disabled:opacity-50 disabled:pointer-events-none";

// Padding/type scale per size. `md` is the large hero CTA; `sm` is a compact
// pill that fits inline UI like the navbar and the store-selector dropdown.
const SIZES: Record<Size, string> = {
  md: "px-[clamp(28px,3.2vw,50px)] py-[clamp(10px,1.1vw,13px)] text-[clamp(15px,1.5vw,26px)]",
  sm: "px-5 py-2.5 text-[16px]",
};

export default function Button(props: ButtonProps) {
  const {
    variant = "primary",
    size = "md",
    className,
    children,
    ...rest
  } = props as CommonProps & {
    href?: string;
    [key: string]: unknown;
  };

  const v = VARIANTS[variant];
  const classes = cn(base, SIZES[size], v.shell, className);
  const style: CSSProperties = { background: v.background };

  const content = (
    <>
      {/* Hover fill: a tall block with a domed (parabola) top and a FLAT bottom.
          It starts just below the pill and rises straight up, sweeping its curved
          top edge across; the flat bottom + extra height mean the whole pill —
          bottom edge included — is solidly covered once risen. */}
      <span
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-1/2 h-[230%] w-[170%] -translate-x-1/2 translate-y-full rounded-t-[50%] transition-transform duration-700 ease-out group-hover:translate-y-0 group-focus-visible:translate-y-0 motion-reduce:duration-0"
        style={{ backgroundImage: v.fill }}
      />
      <span
        className={cn(
          "relative z-10 transition-colors duration-300 ease-out motion-reduce:duration-0",
          v.hoverText,
        )}
      >
        {children}
      </span>
    </>
  );

  if (typeof rest.href === "string") {
    const { href, ...anchorProps } = rest as { href: string } & Record<string, unknown>;
    return (
      <Link
        href={href}
        className={classes}
        style={style}
        {...(anchorProps as AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {content}
      </Link>
    );
  }

  return (
    // Default to type="button" so a Button placed inside a <form> doesn't
    // implicitly submit it; callers can still pass type="submit".
    <button
      type="button"
      className={classes}
      style={style}
      {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {content}
    </button>
  );
}
