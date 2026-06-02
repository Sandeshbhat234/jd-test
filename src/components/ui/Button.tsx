import Link from "next/link";
import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";

type Variant = "primary" | "secondary";
type Size = "md";

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

const base =
  "inline-flex items-center justify-center rounded-full whitespace-nowrap " +
  "font-[var(--font-cy-grotesk)] uppercase tracking-wide " +
  "transition-colors duration-200 ease-out " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent " +
  "disabled:opacity-50 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  primary:
    "bg-[rgba(250,250,250,0.66)] text-[#0c1e46] hover:bg-[rgba(250,250,250,0.85)] backdrop-blur-sm",
  secondary:
    "border border-[#0c1e46] text-white bg-[linear-gradient(rgba(0,0,0,0.2),rgba(0,0,0,0.2)),linear-gradient(178.69deg,#160581_9.14%,#04103E_47.57%,#011F45_85.99%)] hover:brightness-110",
};

const sizes: Record<Size, string> = {
  md: "px-[clamp(28px,3vw,50px)] py-[10px] text-[clamp(14px,1vw,18px)] leading-[1.5]",
};

function cx(...parts: Array<string | undefined>): string {
  return parts.filter(Boolean).join(" ");
}

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
  const classes = cx(base, variants[variant], sizes[size], className);

  if (typeof rest.href === "string") {
    const { href, ...anchorProps } = rest as { href: string } & Record<string, unknown>;
    return (
      <Link
        href={href}
        className={classes}
        {...(anchorProps as AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      className={classes}
      {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );
}
