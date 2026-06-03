import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { LOCATIONS, getLocation } from "@/data/locations";
import { formatRange } from "@/lib/hours";
import LocationsMap from "@/components/locations/LocationsMap";
import ContactForm from "@/components/locations/ContactForm";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return LOCATIONS.map((loc) => ({ slug: loc.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const location = getLocation(slug);
  if (!location) return { title: "Location — JD's Jungle" };
  return { title: `${location.name} — JD's Jungle`, description: location.subtitle };
}

const heading = "font-serif text-[clamp(24px,2.6vw,32px)] leading-tight text-[#1e1e1e]";
const rowText = "font-[var(--font-cy-grotesk)] text-[clamp(15px,1.2vw,18px)] leading-relaxed text-[#1e1e1e]";

function Socials({
  email,
  facebookUrl,
  instagramUrl,
}: {
  email: string;
  facebookUrl: string;
  instagramUrl: string;
}) {
  const link = "text-[#1e1e1e] transition-opacity hover:opacity-70";
  return (
    <div className="flex items-center gap-4 text-[#1e1e1e]">
      <a href={`mailto:${email}`} aria-label="Email" className={link}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="size-6">
          <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.6" />
          <path d="M4 7l8 6 8-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      </a>
      <a href={facebookUrl} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className={link}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="size-6">
          <path d="M13.5 21v-7h2.3l.4-2.7h-2.7V9.5c0-.8.2-1.3 1.4-1.3h1.4V5.8c-.3 0-1.1-.1-2-.1-2 0-3.4 1.2-3.4 3.5v1.9H8.5V14h2.3v7h2.7z" />
        </svg>
      </a>
      <a href={instagramUrl} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className={link}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="size-6">
          <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" stroke="currentColor" strokeWidth="1.6" />
          <circle cx="12" cy="12" r="3.8" stroke="currentColor" strokeWidth="1.6" />
          <circle cx="17" cy="7" r="1.1" fill="currentColor" />
        </svg>
      </a>
    </div>
  );
}

export default async function LocationDetailPage({ params }: Params) {
  const { slug } = await params;
  const location = getLocation(slug);
  if (!location) notFound();

  return (
    <main className="w-full bg-[#fffef8] text-[#1e1e1e]">
      <section className="mx-auto flex w-full max-w-[1601px] flex-col gap-[clamp(40px,6vw,64px)] px-[clamp(24px,5vw,80px)] pb-[clamp(64px,8vw,100px)] pt-[clamp(120px,16vw,160px)]">
        {/* Title */}
        <div className="flex flex-col gap-3">
          <h1 className="font-serif text-[clamp(30px,5vw,52px)] leading-tight text-[rgba(1,1,1,0.8)]">
            {location.name}
          </h1>
          <p className="font-[var(--font-cy-grotesk)] text-[clamp(15px,1.5vw,20px)] leading-relaxed text-[#1e1e1e]/70">
            {location.subtitle}
          </p>
        </div>

        {/* Map + Hours/Reach */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="h-[clamp(340px,46vw,640px)] overflow-hidden rounded-2xl border border-[#1e1e1e]">
            <LocationsMap locations={[location]} singleZoom={15} className="h-full w-full" />
          </div>

          <div className="flex flex-col gap-12">
            {/* Hours */}
            <div className="flex flex-col gap-6">
              <h2 className={heading}>Hours</h2>
              <ul className="flex flex-col gap-4">
                {location.hours.map((entry) => (
                  <li key={entry.day} className={`flex gap-6 ${rowText}`}>
                    <span className="flex-1">{entry.day}</span>
                    <span className="flex-1">{formatRange(entry)}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Reach us */}
            <div className="flex flex-col gap-6">
              <h2 className={heading}>Reach us</h2>
              <div className="flex flex-col gap-4">
                <div className={`flex gap-6 ${rowText}`}>
                  <span className="flex-1">Phone number</span>
                  <span className="flex-1">{location.phone}</span>
                </div>
                <div className={`flex gap-6 ${rowText}`}>
                  <span className="flex-1">Address</span>
                  <span className="flex-1">
                    {location.address.map((line, i) => (
                      <span key={i} className="block">
                        {line}
                      </span>
                    ))}
                  </span>
                </div>
                <div className={`flex gap-6 ${rowText}`}>
                  <span className="flex-1">Socials</span>
                  <span className="flex-1">
                    <Socials
                      email={location.email}
                      facebookUrl={location.facebookUrl}
                      instagramUrl={location.instagramUrl}
                    />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Photo + Contact form */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="relative h-[clamp(300px,40vw,522px)] overflow-hidden rounded-2xl">
            <Image
              src={location.image}
              alt={location.name}
              fill
              sizes="(min-width: 1024px) 50vw, 90vw"
              className="object-cover"
            />
          </div>
          <ContactForm locationName={location.name} storeSlug={location.slug} />
        </div>
      </section>
    </main>
  );
}
