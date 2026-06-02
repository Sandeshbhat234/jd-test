import Image from "next/image";
import Button from "@/components/ui/Button";

type EventItem = {
  title: string;
  description: string;
  day: string;
  month: string;
  time: string;
  address: string;
  image: string;
  ctaHref: string;
};

const EVENTS: EventItem[] = [
  {
    title: "Cannabis & Wellness",
    description:
      "A free, two-hour workshop for anyone curious about cannabis wellness",
    day: "18",
    month: "MAY",
    time: "6:00 PM – 8:00 PM",
    address: "Unit A, New York, NY 10036",
    image: "/home/image.png",
    ctaHref: "/events/cannabis-wellness/register",
  },
];

export default function EventsSection() {
  return (
    <section
      aria-label="Upcoming Events"
      className="bg-[#fffef8] py-[clamp(60px,8vw,100px)]"
      style={{ paddingInline: "clamp(24px,4vw,80px)" }}
    >
      <div className="mx-auto flex w-full max-w-[1601px] flex-col gap-[clamp(32px,5vw,80px)] lg:flex-row lg:items-start lg:justify-between">
        <header className="flex max-w-[639px] flex-col gap-4 text-[#1e1e1e]">
          <h2 className="font-serif font-light text-[clamp(36px,5vw,64px)] leading-[1.5] tracking-[0.2px]">
            Upcoming Events
          </h2>
          <p className="font-[var(--font-cy-grotesk)] text-[clamp(16px,1.6vw,22px)] leading-[1.5] tracking-[0.2px]">
            Learn, connect, and experience cannabis culture – right here in NYC.
          </p>
        </header>

        <div className="flex w-full flex-col gap-8 lg:max-w-[882px]">
          {EVENTS.map((event) => (
            <EventCard key={event.title} {...event} />
          ))}
        </div>
      </div>
    </section>
  );
}

function EventCard({
  title,
  description,
  day,
  month,
  time,
  address,
  image,
  ctaHref,
}: EventItem) {
  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-black bg-white/90 p-4 backdrop-blur-[14px] md:flex-row md:items-stretch">
      <div className="flex w-full shrink-0 flex-col gap-6 md:w-[425px]">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <h3 className="font-serif text-[clamp(24px,2.4vw,32px)] leading-[1.1] capitalize text-black">
              {title}
            </h3>
            <p className="font-[var(--font-cy-grotesk)] text-[clamp(14px,1.4vw,18px)] leading-[1.5] tracking-[0.2px] text-black">
              {description}
            </p>
          </div>

          <div className="flex flex-col gap-2 font-[var(--font-cy-grotesk)] tracking-[0.2px] text-black">
            <div className="flex items-end gap-2">
              <span className="text-[clamp(36px,4vw,48px)] leading-none">
                {day}
              </span>
              <span className="pb-1 text-[clamp(16px,1.5vw,22px)] leading-none">
                {month}
              </span>
            </div>
            <span className="text-[clamp(16px,1.5vw,22px)] leading-[1.5]">
              {time}
            </span>
            <span className="text-[clamp(13px,1.2vw,17px)] leading-[1.5]">
              {address}
            </span>
          </div>
        </div>

        <Button href={ctaHref} variant="secondary">
          Register
        </Button>
      </div>

      <div className="relative mt-4 aspect-[425/313] w-full overflow-hidden rounded-2xl md:mt-0 md:ml-4 md:aspect-auto md:w-[425px] md:flex-1">
        <Image
          src={image}
          alt=""
          fill
          sizes="(max-width: 768px) 90vw, 425px"
          className="select-none object-cover object-bottom"
        />
      </div>
    </article>
  );
}
