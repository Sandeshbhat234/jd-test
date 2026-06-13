import type { Metadata } from "next";
import { Geist, Geist_Mono, Source_Serif_4 } from "next/font/google";
import localFont from "next/font/local";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AgeGate from "@/components/AgeGate";
import CookieBanner from "@/components/CookieBanner";
import SmoothScroll from "@/components/SmoothScroll";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
});

// Cy Grotesk Key — self-hosted from the foundry files in /public.
const cyGrotesk = localFont({
  variable: "--font-cy-grotesk",
  display: "swap",
  fallback: [
    "ui-sans-serif",
    "system-ui",
    "-apple-system",
    "Segoe UI",
    "Roboto",
    "Helvetica Neue",
    "Arial",
    "sans-serif",
  ],
  src: [
    { path: "../../public/Cy Grotesk Key/CyGrotesk-KeyLight.otf", weight: "300", style: "normal" },
    { path: "../../public/Cy Grotesk Key/CyGrotesk-KeyRegular.otf", weight: "400", style: "normal" },
    { path: "../../public/Cy Grotesk Key/CyGrotesk-KeyMedium.otf", weight: "500", style: "normal" },
    { path: "../../public/Cy Grotesk Key/CyGrotesk-KeyDemi.otf", weight: "600", style: "normal" },
    { path: "../../public/Cy Grotesk Key/CyGrotesk-KeyBold.otf", weight: "700", style: "normal" },
  ],
});

export const metadata: Metadata = {
  title: "JD's Jungle",
  description: "JD's Jungle — About Us",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${sourceSerif.variable} ${cyGrotesk.variable} h-full antialiased`}
    >
      <body className="relative min-h-full flex flex-col">
        {/* Scroll-reveal wrappers render hidden for a clean entrance; if JS is
            unavailable, keep all content visible. */}
        <noscript>
          <style>{`[data-reveal]{visibility:visible!important;}`}</style>
        </noscript>
        {/* Runs before first paint: always land at the top on reload (the
            site's pinned scroll animations make restored positions look broken),
            and if age consent was already given, mark the document so CSS hides
            the age gate immediately (no flash on reload). */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{history.scrollRestoration='manual'}catch(e){}try{if(localStorage.getItem('jd-age-verified')==='true'){document.documentElement.setAttribute('data-age-verified','1')}}catch(e){}",
          }}
        />
        <SmoothScroll />
        <Navbar />
        {children}
        <Footer />
        <CookieBanner />
        <AgeGate />
      </body>
    </html>
  );
}
