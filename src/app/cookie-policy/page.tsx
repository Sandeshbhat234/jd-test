import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Cookie Policy — JD's Jungle",
  description:
    "How JD's Jungle uses cookies and similar technologies: the types we set, why we use them, how long they last, and how to manage your preferences.",
};

const HEADING =
  "font-serif text-[clamp(24px,2.2vw,32px)] leading-[1.3] text-black";
const BODY =
  "font-cy text-[clamp(14px,1.25vw,18px)] leading-[1.55] text-black/75";

type Section = { title: string; body: React.ReactNode };

const SECTIONS: Section[] = [
  {
    title: "What are cookies?",
    body: "Cookies are small text files placed on your device when you visit a website. They are widely used to make sites work, or work more efficiently, and to provide information to the site owners. Similar technologies — such as local storage, pixels and tags — perform comparable functions, and where we refer to “cookies” in this policy we mean all of these.",
  },
  {
    title: "How we use cookies",
    body: "We use cookies to keep the site secure and functioning, to remember your choices (such as the store you select and whether you have confirmed your age or dismissed this banner), and to understand how visitors use the site so we can improve it. We do not use cookies to identify you personally beyond what is necessary to provide these features.",
  },
  {
    title: "Essential cookies",
    body: "These are required for the website to function and cannot be switched off in our systems. They include cookies and local storage that remember your age verification, your selected store, your cookie preferences, and that protect against abuse of our forms. The site will not work properly without them, so they are set whenever you use it.",
  },
  {
    title: "Preference cookies",
    body: "These remember choices you make to give you a more personal experience — for example, the last store location you viewed. Disabling them may mean some preferences are not retained between visits.",
  },
  {
    title: "Analytics cookies",
    body: "Where enabled, these help us count visits and traffic sources so we can measure and improve the performance of our site. They tell us which pages are the most and least popular and how visitors move around the site. The information they collect is aggregated and, where possible, does not directly identify you. We only set analytics cookies if you accept them.",
  },
  {
    title: "Cookies set by third parties",
    body: "Some pages embed content or services provided by third parties — for example, the interactive maps on our location pages are served by OpenStreetMap. These providers may set their own cookies, over which we have no direct control. Please review the relevant third party’s own privacy and cookie notices.",
  },
  {
    title: "How long do cookies last?",
    body: "“Session” cookies are temporary and are deleted when you close your browser. “Persistent” cookies remain on your device until they expire or you delete them. Preferences such as your age confirmation and selected store are stored persistently so you are not asked again on every visit.",
  },
  {
    title: "Managing your preferences",
    body: "When you first visit, our cookie banner lets you accept all cookies, accept only essential cookies, or reject non-essential cookies. You can change your mind at any time by clearing this site’s data in your browser, which will prompt the banner to appear again. Most browsers also let you block or delete cookies through their settings — see your browser’s help pages for instructions. Blocking essential cookies may affect how the site works.",
  },
  {
    title: "Do Not Track",
    body: "Some browsers offer a “Do Not Track” (DNT) signal. There is no agreed industry standard for how sites should respond to DNT, so we do not currently respond to these signals. We will update this policy if that changes.",
  },
  {
    title: "Changes to this policy",
    body: "We may update this Cookie Policy from time to time to reflect changes to the cookies we use or for operational, legal or regulatory reasons. Please revisit this page periodically to stay informed.",
  },
  {
    title: "Contact us",
    body: (
      <>
        If you have any questions about our use of cookies, contact us via our{" "}
        <Link
          href="/contact"
          className="underline transition-opacity hover:opacity-70">
          contact page
        </Link>{" "}
        or read our{" "}
        <Link
          href="/privacy"
          className="underline transition-opacity hover:opacity-70">
          Privacy Policy
        </Link>
        .
      </>
    ),
  },
];

export default function CookiePolicyPage() {
  return (
    <main className="w-full border-b border-black bg-[#fffef8] text-black">
      <div className="mx-auto flex w-full max-w-[1601px] flex-col gap-[clamp(40px,5vw,64px)] px-[clamp(24px,5vw,80px)] pb-[clamp(64px,8vw,100px)] pt-[clamp(120px,16vw,160px)]">
        <Reveal direction="up" className="flex flex-col gap-3">
          <h1 className="font-serif text-[clamp(34px,5.4vw,64px)] leading-[1.15] text-black">
            Cookie Policy
          </h1>
          <p className={BODY}>
            This policy explains how JD&rsquo;s Jungle uses cookies and similar
            technologies on this website.
          </p>
        </Reveal>

        <div className="flex flex-col gap-[clamp(24px,3vw,32px)]">
          {SECTIONS.map((section) => (
            <Reveal
              key={section.title}
              direction="up"
              className="flex flex-col gap-[clamp(6px,1vw,8px)]">
              <h2 className={HEADING}>{section.title}</h2>
              <p className={BODY}>{section.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </main>
  );
}
