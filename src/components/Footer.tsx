import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/Button";

const QUICK_LINKS = [
  { label: "Shop All", href: "/shop" },
  { label: "About", href: "/about" },
  { label: "Loyalty Program", href: "/loyalty" },
  { label: "Blogs", href: "/blogs" },
  { label: "Locations", href: "/locations" },
  { label: "FAQs", href: "/faqs" },
  { label: "Contact", href: "/contact" },
];

const SOCIALS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/", icon: "/home/social/linkedin.svg" },
  { label: "Instagram", href: "https://www.instagram.com/", icon: "/home/social/instagram.svg" },
  { label: "Facebook", href: "https://www.facebook.com/", icon: "/home/social/facebook.svg" },
];

export default function Footer() {
  return (
    <footer className="flex min-h-svh h-fit flex-col rounded-t-[clamp(40px,7vw,100px)] bg-[#fffef8] pb-[clamp(32px,4vw,56px)] pt-[clamp(48px,6vw,80px)] text-[#1e1e1e]">
      <div
        className="mx-auto flex w-full max-w-[1601px] flex-1 flex-col justify-between gap-[clamp(64px,10vw,160px)]"
        style={{ paddingInline: "clamp(24px,4vw,80px)" }}
      >
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,700px)_129px_auto] lg:items-start lg:justify-between lg:gap-16">
          <div className="flex flex-col gap-[clamp(20px,2.5vw,40px)]">
            <Link
              href="/"
              aria-label="JD's Jungle home"
              className="flex h-[37.838px] w-[201.967px] items-center justify-between shrink-0"
            >
              <Image
                src="/home/Logos/jd-jungle-mark.svg"
                alt=""
                width={38}
                height={38}
                className="size-[37.838px] select-none"
              />
              <Image
                src="/home/Logos/jd-jungle-wordmark.svg"
                alt="JD's Jungle"
                width={159}
                height={26}
                className="h-[26.164px] w-[159.051px] select-none"
              />
            </Link>
            <p className="font-serif text-[clamp(20px,2.4vw,32px)] leading-[1.5] tracking-[0.2px]">
              Join the list for early drops, private tastings and the occasional dispatch from our cultivators.
            </p>
            <form className="flex flex-col gap-4 sm:flex-row sm:items-end">
              <label className="flex flex-1 flex-col gap-2">
                <span className="font-[var(--font-cy-grotesk)] text-[clamp(15px,1.4vw,17.293px)] leading-[1.5] text-black">
                  Email
                </span>
                <input
                  type="email"
                  required
                  className="w-full border-b border-black bg-transparent pb-2 font-[var(--font-cy-grotesk)] text-[clamp(15px,1.4vw,17.293px)] text-black focus:outline-none"
                />
              </label>
              <Button type="submit" variant="secondary">
                Subscribe
              </Button>
            </form>
          </div>

          <nav aria-label="Quick links" className="flex flex-col gap-4">
            <h3 className="font-[var(--font-cy-grotesk)] text-[clamp(15px,1.5vw,18px)] font-medium uppercase leading-[27px] text-black">
              Quick Links
            </h3>
            <ul className="flex flex-col gap-2 opacity-75">
              {QUICK_LINKS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="font-[var(--font-cy-grotesk)] text-[clamp(15px,1.4vw,18px)] leading-[27px] text-black transition-opacity hover:opacity-70"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex flex-col gap-[clamp(20px,2.5vw,40px)] text-black">
            <div className="flex flex-col gap-2">
              <h3 className="font-[var(--font-cy-grotesk)] text-[clamp(15px,1.5vw,18px)] font-medium uppercase leading-[27px]">
                Reach Us
              </h3>
              <a
                href="mailto:contact@jdsjungle.com"
                className="font-[var(--font-cy-grotesk)] text-[clamp(15px,1.4vw,18px)] leading-[27px] opacity-75 hover:opacity-100"
              >
                contact@jdsjungle.com
              </a>
              <span aria-hidden className="my-1 h-px w-full bg-black/15" />
              <address className="font-[var(--font-cy-grotesk)] not-italic text-[clamp(15px,1.4vw,18px)] leading-[27px] opacity-75">
                302 West 46th Street, Unit A
                <br />
                New York, NY 10036
              </address>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="font-[var(--font-cy-grotesk)] text-[clamp(15px,1.5vw,18px)] font-medium uppercase leading-[27px]">
                Open Hours
              </h3>
              <p className="font-[var(--font-cy-grotesk)] text-[clamp(15px,1.4vw,18px)] leading-[27px] opacity-75">
                Monday – Saturday: 10am – 8pm EST
                <br />
                Sunday: Closed
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-6 rounded-lg border border-black p-6 md:flex-row md:items-center md:justify-between md:p-8">
            <div className="flex flex-wrap items-center gap-8">
              <p className="font-[var(--font-cy-grotesk)] text-[clamp(12px,1.1vw,14px)] leading-[24px] text-black">
                © 2026 JD&apos;s Jungle. All rights reserved.
              </p>
              <ul className="flex items-center gap-2">
                {SOCIALS.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={s.label}
                      className="inline-flex size-8 items-center justify-center transition-opacity hover:opacity-80"
                    >
                      <Image
                        src={s.icon}
                        alt=""
                        width={32}
                        height={32}
                        className="size-8"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <Link
              href="/privacy"
              className="font-[var(--font-cy-grotesk)] text-[clamp(12px,1.1vw,14px)] leading-[21px] text-black hover:opacity-70"
            >
              Privacy Policy
            </Link>
          </div>

          <p className="text-center font-[var(--font-cy-grotesk)] text-[clamp(13px,1.2vw,16px)] leading-[24px] text-black">
            For use only by adults 21 years of age and older. Keep out of reach of children and pets. In case of accidental ingestion or overconsumption, contact the National Poison Control Center hotline{" "}
            <a href="tel:1-800-222-1222" className="underline">
              1-800-222-1222
            </a>{" "}
            or call{" "}
            <a href="tel:911" className="underline">
              9-1-1
            </a>
            . Cannabis can be addictive. Cannabis is not recommended for use by persons who are pregnant or nursing or other warnings as determined by the Office. For help and hope 24/7, call 1-877-8-HOPENY (467369) or text HOPENY (467369).
          </p>
        </div>
      </div>
    </footer>
  );
}
