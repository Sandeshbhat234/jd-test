"use client";

import { useSelectedStore } from "@/lib/useSelectedStore";
import LocationsMap from "@/components/locations/LocationsMap";

const iconWrap = "flex size-12 items-center justify-center text-[#1e1e1e]";
const label =
  "font-cy text-[clamp(20px,1.8vw,28px)] font-medium text-[#1e1e1e]";
const value =
  "font-cy text-[clamp(15px,1.2vw,18px)] leading-relaxed text-[#1e1e1e]";

function InfoBlock({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3">
      <span className={iconWrap}>{icon}</span>
      <h3 className={label}>{title}</h3>
      <div className={value}>{children}</div>
    </div>
  );
}

export default function VisitUs() {
  const { store } = useSelectedStore();

  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
      <div className="flex flex-col gap-10">
        <InfoBlock
          title="Location"
          icon={
            <svg viewBox="0 0 24 24" fill="none" className="size-12">
              <path
                d="M12 21s7-5.6 7-11a7 7 0 10-14 0c0 5.4 7 11 7 11z"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          }
        >
          {store.address.map((line, i) => (
            <span key={i} className="block">
              {line}
            </span>
          ))}
        </InfoBlock>

        <InfoBlock
          title="Phone"
          icon={
            <svg viewBox="0 0 24 24" fill="none" className="size-11">
              <path
                d="M6.5 4h3l1.5 4-2 1.5a11 11 0 005.5 5.5l1.5-2 4 1.5v3a2 2 0 01-2 2A16 16 0 014.5 6a2 2 0 012-2z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
            </svg>
          }
        >
          <a href={`tel:${store.phone.replace(/[^+\d]/g, "")}`} className="hover:underline">
            {store.phone}
          </a>
        </InfoBlock>

        <InfoBlock
          title="E-mail"
          icon={
            <svg viewBox="0 0 24 24" fill="none" className="size-11">
              <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
              <path d="M4 7l8 6 8-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          }
        >
          <a href={`mailto:${store.email}`} className="hover:underline">
            {store.email}
          </a>
        </InfoBlock>

        <InfoBlock
          title="Open Hours"
          icon={
            <svg viewBox="0 0 24 24" fill="none" className="size-11">
              <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
              <path d="M12 7v5l3.5 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          }
        >
          {store.hoursSummary.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </InfoBlock>
      </div>

      <div className="h-[clamp(320px,42vw,650px)] overflow-hidden rounded-2xl border border-[#1e1e1e]">
        <LocationsMap locations={[store]} singleZoom={15} className="h-full w-full" />
      </div>
    </div>
  );
}
