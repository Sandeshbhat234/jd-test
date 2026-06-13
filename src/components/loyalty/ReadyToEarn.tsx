import Button from "@/components/ui/Button";
import { SIGNUP_URL } from "@/lib/links";

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
        <Button href={SIGNUP_URL} variant="secondary">
          JOIN FOR FREE
        </Button>
      </div>
    </div>
  );
}
