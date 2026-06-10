import Link from "next/link";

export default function ReadyToEarn() {
  return (
    <div
      className="flex w-full flex-col items-center rounded-2xl border border-black/[0.44] p-[clamp(32px,5vw,60px)] drop-shadow-[0px_1px_3.8px_rgba(0,0,0,0.25)]"
      style={{
        backgroundImage:
          "linear-gradient(203deg, #160581 9%, #04103E 38%, #011F45 84%)",
      }}
    >
      <div className="flex w-full flex-col items-center justify-center gap-7 text-center text-white">
        <div className="flex w-full flex-col gap-3">
          <h2 className="font-serif text-[clamp(24px,3.5vw,38px)] leading-tight">
            Ready to start earning?
          </h2>
          <p className="font-cy text-[clamp(14px,1.4vw,18px)] leading-[1.6]">
            Join in seconds. Start earning today. No catch. Just rewards.
          </p>
        </div>
        <Link
          href="/signup"
          className="flex h-11 items-center justify-center whitespace-nowrap rounded-full border border-[rgba(1,31,69,0.3)] bg-[#fffef8] px-[clamp(24px,2.5vw,40px)] py-2.5 font-cy text-[clamp(13px,1.1vw,16px)] font-medium text-[#0c1e46] transition-colors duration-200 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
        >
          JOIN FOR FREE
        </Link>
      </div>
    </div>
  );
}
