import Image from "next/image";
import Link from "next/link";
import ShareButton from "./ShareButton";

const joinGradient =
  "bg-[linear-gradient(179deg,#173067_9%,#06122F_48%,#05102A_86%)]";

export default function JungleRewardsCard() {
  return (
    <div className="relative w-full lg:max-w-[711px]">
      {/* Decorative gift, overlapping the top-right corner. */}
      <Image
        src="/Loyalty Program/rewards.webp"
        alt=""
        width={163}
        height={120}
        aria-hidden
        className="pointer-events-none absolute right-4 -top-10 z-10 h-auto w-[clamp(96px,11vw,150px)] select-none drop-shadow-[0px_6px_15px_rgba(0,0,0,0.15)] sm:right-8"
      />

      <div className="flex flex-col items-center justify-center rounded-2xl border border-[#1e1e1e] bg-[rgba(234,233,228,0.2)] p-6 shadow-[0px_4px_10.3px_0px_rgba(0,0,0,0.1)]">
        <div className="flex w-full flex-col gap-4">
          <h2 className="font-serif text-[clamp(22px,3vw,34px)] leading-tight text-black">
            Jungle Rewards
          </h2>
          <hr className="border-0 border-t border-black/40" />

          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-2 font-[var(--font-cy-grotesk)]">
              <p className="text-[clamp(14px,1.4vw,18px)] leading-[1.6] text-[#1e1e1e]">
                Join our loyalty program and start earning 10% cashback on every
                purchase.
              </p>
              <p className="text-[clamp(13px,1.2vw,15px)] leading-[1.5] text-[#7c7c7c]">
                The more you shop, the more you get back.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
              <Link
                href="/signup"
                className={`flex h-11 items-center justify-center whitespace-nowrap rounded-full border border-[#0c1e46] px-[clamp(24px,2.5vw,40px)] py-2.5 font-[var(--font-cy-grotesk)] text-[clamp(13px,1.1vw,16px)] font-medium text-white transition-[filter] duration-200 hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0c1e46]/60 focus-visible:ring-offset-2 ${joinGradient}`}
              >
                JOIN FOR FREE
              </Link>
              <ShareButton />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
