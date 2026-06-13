/**
 * Full article content for individual blog posts (rendered at /blogs/<slug>).
 *
 * The cards on /blogs come from `blogs.ts`; the long-form body of a post lives
 * here, keyed by the same `slug`. A post can appear in the listing without a
 * full article (the card just won't deep-link to readable content yet) — only
 * slugs present in `BLOG_ARTICLES` get a detail page (see `getArticle`).
 *
 * To add a post: drop its images into `public/blog/<folder>/`, then add an
 * entry below. No page/component changes required.
 */

import type { BlogCategory } from "./blogs";

/** Ordered pieces of an article body, rendered top-to-bottom. */
export type ArticleBlock =
  | { kind: "heading"; id: string; text: string; toc: string }
  | { kind: "subheading"; text: string }
  | { kind: "paragraph"; text: string }
  | { kind: "list"; items: string[] }
  | {
      kind: "image";
      src: string;
      alt: string;
      caption?: string;
      width: number;
      height: number;
    }
  | { kind: "callout"; label?: string; text: string }
  | { kind: "table"; headers: string[]; rows: string[][] };

export interface FaqItem {
  question: string;
  answer: string;
}

export interface ArticleReference {
  text: string;
  href: string;
}

export interface BlogArticle {
  /** Matches the `slug` of the card in `blogs.ts`. */
  slug: string;
  title: string;
  category: BlogCategory;
  /** Index badge shown over the hero, e.g. "01". */
  number: string;
  readTime: string;
  date: string;
  hero: { src: string; alt: string };
  /** Opening paragraph, set larger than the body. */
  lead: string;
  /** Short "TL;DR" summary box under the lead. */
  takeaway: string;
  /** Featured-snippet style direct answer, set apart from the body. */
  keyAnswer: string;
  blocks: ArticleBlock[];
  faqs: FaqItem[];
  cta: { heading: string; text: string; href: string; label: string };
  references: ArticleReference[];
  /** Slugs of cards from `blogs.ts` to surface as "Related Blogs". */
  relatedSlugs: string[];
}

const B1_DIR =
  "/blog/B1-The Modern New Yorker_s Guide to Edibles for Energy and Focus";

const ediblesForEnergyAndFocus: BlogArticle = {
  slug: "edibles-for-energy-and-focus",
  title: "The Modern New Yorker's Guide to Edibles for Energy and Focus",
  category: "Wellness",
  number: "01",
  readTime: "6 min read",
  date: "May 12, 2026",
  hero: {
    src: `${B1_DIR}/im0-hero.webp`,
    alt: "A professional sits at a sleek wooden desk in a minimalist creative studio at dusk, a gold desk lamp lighting his workspace against a moody, midnight-blue city skyline.",
  },
  lead: "Navigating the fast-paced energy of New York can feel like running on a treadmill that someone turned up to high speed. When you are trying to keep your morning momentum going through a mountain of work, it is easy to reach for a third or fourth cup of coffee. But too much caffeine usually leads to shaky hands, a racing heart, and a sudden crash right in the middle of your afternoon. If you want a better way to stay sharp, finding the best edibles for energy and focus might be the game-changer you need.",
  takeaway:
    "Skip the coffee jitters. This guide breaks down how low-dose, targeted cannabis edibles can clear away mental clutter, boost your daytime energy, and help you lock into a smooth, productive focus.",
  keyAnswer:
    "Cannabis helps you focus by interacting with your body's endocannabinoid system to regulate mood and attention. When taken in small, precise doses, specific cannabinoids like THCV and CBG, along with clear-headed sativa strains, quiet background mental noise and reduce stress. This allows your mind to enter a smooth, productive flow state without causing a heavy, sleepy burnout.",
  blocks: [
    {
      kind: "heading",
      id: "how-it-works",
      text: "Understanding How Cannabis for Focus and Clarity Works in the Body",
      toc: "How Cannabis for Focus Works",
    },
    {
      kind: "image",
      src: `${B1_DIR}/im1-focus_formula_1_5x.webp`,
      alt: 'A premium dark-blue infographic titled "The Focus Formula" showing how minor cannabinoids THCV and CBG act as "The Fuel" while the terpenes Pinene and Limonene provide "The Direction", converging into a central hub labelled "Your Flow State".',
      caption: "The Focus Formula for flow state.",
      width: 1906,
      height: 1050,
    },
    {
      kind: "paragraph",
      text: "Have you ever had a day where your brain feels like it has twenty different internet tabs open at the same time? It is hard to get anything done when your mind is that crowded. Inside your body, you have a vast cell-signaling network called the endocannabinoid system. When things get too hectic, this system steps in to help you find a calm, steady flow state. This is that productive zone where you can focus on a task without feeling constantly distracted.",
    },
    {
      kind: "paragraph",
      text: "Different parts of the cannabis plant can assist this system in unique ways. For example, a rare, minor cannabinoid called THCV is known to provide a sense of clean daytime energy without making your mind race. Another helper, called CBG, may help create a calmer mental environment, making it easier to think clearly.",
    },
    {
      kind: "paragraph",
      text: "When you mix these daytime ingredients with natural plant scents called terpenes, they work together quite well. A terpene called Pinene, which smells like a fresh pine forest, is thought to help your brain hold onto information and keep your memory sharp. Another one called Limonene, which smells like bright citrus fruits, naturally lifts your mood and keeps you motivated. Together, these compounds can contribute to a more focused and balanced experience.",
    },
    {
      kind: "heading",
      id: "best-edibles",
      text: "The Best Edibles for Energy and Focus: High-Performer Sativa & THCV Formulations",
      toc: "Best Edibles for Energy & Focus",
    },
    {
      kind: "image",
      src: `${B1_DIR}/im2-day_time_performance_profile_1_5x.webp`,
      alt: 'A luxury editorial infographic on a matte dark-blue background detailing the "Daytime Performance Profile": the left column focuses on THCV for "Metabolic Momentum" and the right on fast-acting Sativa for "Rapid Adaptability".',
      caption: "Daytime performance profile.",
      width: 1841,
      height: 1037,
    },
    {
      kind: "paragraph",
      text: "Navigating a fast-paced urban life requires sustained mental clarity. When morning strategy sessions or demanding artistic production demand your full attention, choosing the right cannabis for focus can shift your entire trajectory. Many professionals look for clean daytime stimulation to target mental fatigue without the unwanted side effects of traditional stimulants. The goal is sharp execution without an elevated heart rate or jittery energy.",
    },
    {
      kind: "paragraph",
      text: "Premium sativa-dominant formulations work by interacting with your body's natural signaling pathways to promote alertness. For those managing long creative blocks, specialized daytime lozenges infused with THCV offer a unique solution. THCV is a minor cannabinoid celebrated for introducing a sense of clear, high-energy production. It provides clean daytime momentum while keeping your mind calm and steady. These lozenges are ideal for deep-dive project mapping because they support cognitive endurance without causing your thoughts to race.",
    },
    {
      kind: "paragraph",
      text: "If your schedule requires rapid adaptability, fast-acting sativa gummies provide an excellent alternative. Crafted with rapid-onset technology, these clean-pressed gummies bypass long digestive wait times to deliver noticeable clarity within fifteen to thirty minutes. They feature a bright, refreshing sensory profile that complements a focused morning routine. Precise micro-dosing between 2.5 milligrams and 5 milligrams allows you to fine-tune your experience. This controlled intake ensures you remain entirely productive, balanced, and locked into your professional flow state all afternoon.",
    },
    {
      kind: "heading",
      id: "flow-state",
      text: "Achieving Flow State with Balanced THC Mints and Gummies for Focus",
      toc: "Achieving a Flow State",
    },
    {
      kind: "image",
      src: `${B1_DIR}/im3-sustained_cognitive_flow_state_1_5x.webp`,
      alt: "Infographic comparing CBG focus gummies and microdose mints for a sustained cannabis cognitive flow state.",
      caption: "Sustained cognitive flow state.",
      width: 1979,
      height: 1050,
    },
    {
      kind: "paragraph",
      text: "Sativa energy gets you started. Staying in that zone for hours is a different challenge. Long work sessions don't usually fall apart at the beginning. They break down in the middle, when decision fatigue sets in and your thoughts start to scatter. That's where a balanced cannabinoid formula earns its place. Instead of pushing your alertness higher, a structured combination of THC and CBG works more like a stabilizer. It quiets the mental noise while keeping your thinking clear and sharp.",
    },
    {
      kind: "paragraph",
      text: "CBG is the key ingredient here. A 2024 clinical trial published in Scientific Reports by Washington State University researchers found that 20mg of hemp-derived CBG significantly reduced anxiety and stress in participants, improved verbal memory recall, and caused no cognitive or motor impairment. That combination of calm and clarity is exactly what sustained focus requires.",
    },
    {
      kind: "paragraph",
      text: "Balanced gummies that combine THC, CBC, and CBG alongside sativa-leaning terpenes are well suited for deep work sessions and complex problem solving. This format is available at licensed New York dispensaries. CBG in these formulas works to reduce tension and support mental tranquility under everyday stress, while terpenes like Alpha-Pinene and Limonene support attention and mood.",
    },
    {
      kind: "paragraph",
      text: "When you need something more consistent and discreet, microdosed mints are a strong option. At 2.5mg THC per piece, they give you real control over your dose throughout the day. They also work faster than standard edibles. Sublingual mints typically take effect in 15 to 30 minutes, compared to the up to two hours that traditional edibles can require. Brands carrying this format at licensed New York dispensaries use clean, minimal ingredients that fit easily into any professional schedule.",
    },
    {
      kind: "paragraph",
      text: "Both formats are built for the same goal: keeping you focused and steady across a full workday, without the peaks and crashes that make sustained performance hard to hold.",
    },
    {
      kind: "heading",
      id: "conclusion",
      text: "Elevating Your Daily Ritual",
      toc: "Elevating Your Daily Ritual",
    },
    {
      kind: "paragraph",
      text: "Mastering a fast-paced urban lifestyle requires an intentional approach to mental clarity. Utilizing curated cannabis for focus allows the modern metropolitan connoisseur to navigate demanding schedules with sophisticated, plant-derived precision. True cognitive alignment comes from understanding your tools and selecting high-integrity formulations designed for daytime execution.",
    },
    {
      kind: "paragraph",
      text: "Investing in your lifestyle means prioritizing tested, clean, and state-regulated formulations over unverified alternatives. Licensed New York dispensaries ensure every microdosed mint or minor cannabinoid gummy meets rigorous quality standards for purity and consistency. This structured approach removes the guesswork from your wellness routine, giving you predictable control over your daytime energy.",
    },
  ],
  faqs: [
    {
      question: "What are the absolute best edibles for energy and focus?",
      answer:
        "The most effective options combine clean sativa formulations, minor cannabinoids like THCV, and focus-targeted terpenes. Look for products featuring Pinene or Limonene, which naturally support alertness and motivation. Expertly crafted formulations available at licensed New York dispensaries use these ingredients to deliver clean daytime stimulation without an elevated heart rate.",
    },
    {
      question: "Will using cannabis for focus make me feel too anxious or paranoid?",
      answer:
        "High doses of pure THC can sometimes trigger anxiety, but using cannabis for focus in low-dose configurations alters this experience entirely. Microdosing between 2.5 milligrams and 5 milligrams keeps the effects subtle and highly manageable. Additionally, a 2024 clinical trial by Washington State University researchers found that adding CBG significantly reduces stress and anxiety without causing cognitive impairment.",
    },
    {
      question: "How long do daytime focus gummies take to start working?",
      answer:
        "Traditional edibles must pass through your digestive system, which can take up to two hours to deliver noticeable effects. Modern daytime focus gummies and sublingual mints use fast-acting nano-emulsification technology. These advanced formulations bypass standard digestion to absorb quickly, allowing you to feel sharp mental clarity within fifteen to thirty minutes.",
    },
    {
      question: "Can I use weed for focus during regular working hours?",
      answer:
        "New York State law strictly prohibits the possession or consumption of cannabis during active employment hours or on workplace property. While using cannabis for focus is highly effective for lifestyle optimization, it should always be kept compliant and legal. Independent creatives, freelancers, and remote professionals use these tools during personal hours to lock into private deep-work sprints safely.",
    },
  ],
  cta: {
    heading: "Visit JD's Jungle",
    text: "Curate your mental environment. Visit JD's Jungle in New York to explore our highly vetted, premier selection of focus-driven formulations, or browse our online lookbook to reserve your daytime collection for seamless boutique pickup.",
    href: "/locations",
    label: "Find a location",
  },
  references: [
    {
      text: 'Zazzy Marketplace. "What Is CBG? The Focus Cannabinoid Guide." Zazzy, 2026.',
      href: "https://www.buythcdrinks.com/blogs/learn/what-is-cbg-the-focus-cannabinoid-guide",
    },
    {
      text: 'Kiva Confections. "Camino 5mg \'Exhilarate\' Wild Cherry Gummies." Kiva Confections, 2026.',
      href: "https://www.kivaconfections.com/flavor/wild-cherry-exhilarate",
    },
    {
      text: 'Explore Sherpa. "What Are Sublingual Edibles? A Guide to Fast-Acting Cannabis Products." Sherpa, October 2024.',
      href: "https://www.exploresherpa.com/blogs/our-blog/what-are-sublingual-edibles",
    },
  ],
  relatedSlugs: ["edibles-vs-smoking", "tincture-vs-edible-guide"],
};

const B2_DIR =
  "/blog/B2-A New Yorker_s Guide to Using Cannabis for Sleep the Right Way";
const B3_DIR =
  "/blog/B3-Live Resin vs Distillate Which One Belongs in Your Evening Ritual";
const B4_DIR =
  "/blog/B4-CBD vs THC What Each Cannabinoid Does and How to Choose What You Need";
const B5_DIR = "/blog/B5-Edibles vs. Smoking_ Which One Is Right for You";
const B6_DIR =
  "/blog/B6-What Is CBN — and Why It Keeps Showing Up in Sleep Products";
const B7_DIR =
  "/blog/B7-Limonene, Myrcene, Linalool_ The Three Terpenes Worth Knowing Before You Buy";
const B8_DIR =
  "/blog/B8-Tincture vs. Edible_ Which One Is Right for What You_re Trying to Do";
const B9_DIR = "/blog/Enchanced images/Blog 9";
const B10_DIR =
  "/blog/B10-CBG Explained_ The Minor Cannabinoid That Is Showing Up Everywhere";

const CTA = {
  heading: "Visit JD's Jungle",
  href: "/locations",
  label: "Find a location",
};

const cannabisForSleep: BlogArticle = {
  slug: "cannabis-for-sleep-guide",
  title: "A New Yorker's Guide to Using Cannabis for Sleep the Right Way",
  category: "Wellness",
  number: "02",
  readTime: "7 min read",
  date: "May 8, 2026",
  hero: {
    src: `${B2_DIR}/im0-blog_2_1_5x.webp`,
    alt: "Minimalist bedside scene in a New York apartment at night, showing a ceramic tray, candle, and glass of water, evoking a calm and intentional pre-sleep atmosphere.",
  },
  lead: `You've tried melatonin. You've tried the magnesium. You've read about sleep hygiene more times than you can count. And you're still lying there at midnight with a brain that refuses to switch off. It's no surprise that more people are turning to cannabis for sleep. A 2024 Harris Poll found that 16% of American adults now use it as a sleep aid — ahead of both prescription sleep aids and alcohol. But here's the thing most people don't talk about: it works really well for some people, and it does very little for others. The difference almost always comes down to what they're using and how they're using it.`,
  takeaway: `Most New Yorkers pick the wrong product. Cannabis works best for sleep as a designed evening ritual, not an afterthought — the right combination of cannabinoids, dose, and timing matters far more than the THC number on the label.`,
  keyAnswer: `Using cannabis for sleep means choosing a product with the right combination of cannabinoids (most often THC, CBN, or both) and taking it at the right time to help your body wind down. It works best alongside good sleep habits, not as a replacement for them. The right product for you depends on your experience level, your body, and what's actually keeping you awake.`,
  blocks: [
    {
      kind: "heading",
      id: "does-it-help",
      text: "Does cannabis actually help with sleep?",
      toc: "Does it actually help?",
    },
    {
      kind: "paragraph",
      text: `The honest answer is it can, but it's not guaranteed, and it's not the same for everyone. Research suggests that products with a small to moderate amount of THC alongside a small amount of CBD could be helpful for sleep, particularly for those new to cannabis. THC appears to help people fall asleep faster and stay asleep. CBN, a lesser-known cannabinoid, has also shown early promise; a 2024 University of Sydney study published in Neuropsychopharmacology found the first objective evidence that CBN increases total sleep time and boosts both NREM and REM sleep.`,
    },
    {
      kind: "paragraph",
      text: `There is one trade-off worth knowing upfront. THC appears to decrease REM sleep, which is the stage where dreams happen. For most people trying to get through a rough patch of insomnia, this is an acceptable trade. Getting six hours of real sleep beats staring at the ceiling. But it is worth knowing, especially if you plan to use cannabis every night long-term.`,
    },
    {
      kind: "heading",
      id: "what-people-get-wrong",
      text: "The part most people get wrong",
      toc: "What most people get wrong",
    },
    {
      kind: "paragraph",
      text: `The most common mistake isn't choosing cannabis. It's choosing the wrong product, taking too much, or taking it at the wrong time.`,
    },
    {
      kind: "list",
      items: [
        `Picking by THC percentage. The number on the label tells you how strong a product is, not how it will make you feel. Two gummies with the same THC content can produce completely different experiences depending on the other cannabinoids and terpenes. Myrcene, found in many indica-leaning products, is associated with a settling, sedative feel; limonene can make you feel more alert. If you've ever felt wired instead of sleepy at night, a stimulating terpene profile is likely why.`,
        `Taking an edible too late and then redosing. Most people take an edible an hour before bed, feel nothing at the 45-minute mark, and take another. The second dose arrives exactly when the first one peaks. That is how a 5mg experience becomes a 20mg experience, which is not where you want to be at midnight.`,
        `Expecting it to work without anything else changing. Cannabis is not a knockout pill. It works better when the room is cool, the phone is down, and the lights have been dim for a while. It amplifies the direction your body is already moving.`,
      ],
    },
    {
      kind: "heading",
      id: "what-to-look-for",
      text: "What to look for in a cannabis sleep product",
      toc: "What to look for",
    },
    {
      kind: "paragraph",
      text: `Products labeled as indica or indica-dominant hybrids may be a good starting point. The indica versus sativa distinction is not perfectly scientific, but it is still a useful shorthand when you are standing in a dispensary trying to make a decision. Beyond the label, here is what to look for:`,
    },
    {
      kind: "list",
      items: [
        `A THC+CBN combination. A 2025 meta-analysis in Sleep Medicine Reviews covering six randomized trials found that formulations combining THC and CBN improved subjective sleep quality significantly. CBD-only formulations did not. Brands like Camino and Off Hours, available at New York dispensaries, make gummies with THC and CBN formulated for nighttime use.`,
        `A COA you can actually read. A Certificate of Analysis is the lab report for any cannabis product, showing exact cannabinoid and terpene content. If you see myrcene listed above 0.5% in the terpene section, that is a good sign for a sleep-focused product.`,
        `A dose that starts low. If you are new to edibles, 2.5 to 5mg of THC is a sensible starting point. New York's per-serving limit is 10mg, but that is a ceiling, not a recommendation. Starting lower gives you more control and a better experience.`,
      ],
    },
    {
      kind: "image",
      src: `${B2_DIR}/im1-certificate_of_analysis_1_5x.webp`,
      alt: "Close-up of cannabis gummies and a Certificate of Analysis on a dark wooden surface, with THC percentage, CBN percentage, and a terpene profile showing myrcene values annotated in gold.",
      caption: "What the label says and what the lab says are two different things.",
      width: 2468,
      height: 1379,
    },
    {
      kind: "heading",
      id: "how-to-time-it",
      text: "How to time it",
      toc: "How to time it",
    },
    {
      kind: "paragraph",
      text: `This is probably the single most useful piece of practical information in this entire guide. Take it earlier than you think you need to. If you end up a bit sleepy before you planned to be, that is a much easier problem to have than taking it too late and lying awake waiting for it to work.`,
    },
    {
      kind: "table",
      headers: ["Format", "Time to kick in", "When to take it"],
      rows: [
        ["Gummies / edibles", "45 to 90 minutes", "60 to 90 minutes before bed"],
        [
          "Tincture (drops under the tongue)",
          "15 to 45 minutes",
          "30 to 45 minutes before bed",
        ],
        ["Vaporizer or flower", "5 to 15 minutes", "About 15 minutes before bed"],
      ],
    },
    {
      kind: "heading",
      id: "worth-knowing",
      text: "A few things worth knowing",
      toc: "A few things worth knowing",
    },
    {
      kind: "list",
      items: [
        `Tolerance builds. If you use cannabis for sleep every night, you will likely need more over time to get the same effect. Some people use it for a period, then take breaks.`,
        `Stopping after regular use can disrupt sleep temporarily. Several long-term users report a few days of worse sleep after stopping, particularly vivid dreams as REM sleep rebounds. This typically passes within a week or two.`,
        `It is not for everyone. Some people feel anxious or unsettled on cannabis, particularly at higher doses. If that has been your experience, starting with a very low dose or a different cannabinoid ratio is worth trying before writing it off.`,
      ],
    },
    {
      kind: "callout",
      label: "Please note",
      text: `This content is for educational purposes only and does not constitute medical advice. Cannabis affects individuals differently. Must be 21+ to purchase in New York State. If you are experiencing persistent insomnia, consult a licensed healthcare provider.`,
    },
  ],
  faqs: [
    {
      question: "How long before bed should I take cannabis for sleep?",
      answer: `For gummies, 60 to 90 minutes. For tinctures, 30 to 45 minutes. For inhaled cannabis, about 15 minutes. When in doubt, go earlier.`,
    },
    {
      question: "Is THC or CBN better for sleep?",
      answer: `The research currently supports a combination of both. THC helps you fall asleep faster. CBN appears to help you stay asleep longer. Combined formulations with both are available at licensed New York dispensaries.`,
    },
    {
      question: "Why did cannabis keep me awake instead of helping me sleep?",
      answer: `Almost always a terpene issue. If the product contained high levels of limonene or pinene rather than myrcene, it may have felt stimulating. Try a myrcene-forward, indica-leaning product next time.`,
    },
    {
      question: "What dose should I start with?",
      answer: `2.5 to 5mg THC for edibles if you are new or returning after a break. Give yourself a full two hours before you decide it is not working.`,
    },
    {
      question: "Will I become dependent on it?",
      answer: `Regular use can lead to tolerance, and some people find it hard to sleep without it after extended daily use. Using it a few nights a week rather than every night, and taking occasional breaks, helps avoid that pattern.`,
    },
  ],
  cta: {
    ...CTA,
    text: `Talk to one of our budtenders. Tell us what's keeping you up. We'll help you find a starting point that makes sense for you, not just what's selling.`,
  },
  references: [
    {
      text: `Healthline — Best Cannabis for Sleep (Updated May 2026).`,
      href: "https://www.healthline.com/health/best-strain-for-sleep",
    },
    {
      text: `University of Sydney / Neuropsychopharmacology (November 2024) — CBN and sleep architecture.`,
      href: "https://www.nature.com/articles/s41386-024-02018-7",
    },
    {
      text: `Sleep Medicine Reviews meta-analysis (August 2025) — THC+CBN vs CBD-only formulations.`,
      href: "https://www.sciencedirect.com/science/article/abs/pii/S1087079225001091",
    },
    {
      text: `New York State Cannabis Control Board Annual Report (2025).`,
      href: "https://cannabis.ny.gov/system/files/documents/2025/12/ocm-annual-report_final-2025.pdf",
    },
  ],
  relatedSlugs: ["what-is-cbn-sleep-gummies", "tincture-vs-edible-guide"],
};

const liveResinVsDistillate: BlogArticle = {
  slug: "live-resin-vs-distillate-cart",
  title: "Live Resin vs Distillate: Which One Belongs in Your Evening Ritual",
  category: "Formats",
  number: "03",
  readTime: "8 min read",
  date: "April 28, 2026",
  hero: {
    src: `${B3_DIR}/im0-hero-wmremd.webp`,
    alt: "Live resin and distillate cartridges side by side on a dark slate surface with evening lighting.",
  },
  lead: `Two cartridges. Similar labels. Nearly identical hardware. The one on the left costs more, and the person behind the counter keeps recommending it, but the product sheet does not explain why in a way that makes sense at the end of a long Thursday. That is the moment most people fall back on THC percentage. It is also the moment most people make the wrong call.`,
  takeaway: `When it comes to live resin vs distillate, the real difference is not about strength. It is about the kind of experience each one is built for — and once you understand that, the choice is simple.`,
  keyAnswer: `Live resin is made from fresh-frozen cannabis flower, preserving the plant's full terpene and cannabinoid profile. Distillate is a highly refined extract that isolates a single cannabinoid, typically THC, removing nearly all terpenes. Live resin delivers a complex, layered experience shaped by the whole plant. Distillate delivers consistent, direct potency.`,
  blocks: [
    {
      kind: "heading",
      id: "what-are-they",
      text: "What are live resin and distillate carts?",
      toc: "What are they?",
    },
    {
      kind: "image",
      src: `${B3_DIR}/im1-resin-distillate-wmremd.webp`,
      alt: "Infographic comparing live resin flash-freeze extraction versus distillate refinement, two paths from cannabis plant to vape cart.",
      caption: "Two formats, two very different paths from plant to cartridge.",
      width: 2752,
      height: 1536,
    },
    {
      kind: "paragraph",
      text: `Live resin begins with freshly harvested cannabis flower that is frozen immediately after cutting, before any drying or curing takes place. That freezing step preserves the terpenes and cannabinoids that would otherwise break down during processing. The result is an extract that carries the plant's full chemical fingerprint, including a terpene content of 3 to 5 percent, according to TribeTokes (2025). Those terpenes are not just responsible for flavor — they shape the direction and quality of the experience.`,
    },
    {
      kind: "paragraph",
      text: `Distillate follows a different path entirely. The plant material is dried and cured first, then put through a solvent-based extraction followed by a distillation process that strips away nearly everything except the target cannabinoid. A finished distillate typically contains 85 to 99 percent pure THC, according to Leafwell (2025). Some manufacturers add terpenes back in afterward, but these are often botanical or synthetic, and they produce a flatter aroma than what naturally survives in live resin.`,
    },
    {
      kind: "heading",
      id: "how-they-compare",
      text: "How do live resin and distillate carts compare?",
      toc: "How they compare",
    },
    {
      kind: "paragraph",
      text: `The clearest way to understand the difference is to look at what each one actually delivers across the attributes that matter for an evening experience. The most important number below is not the THC column — it is the terpene content column.`,
    },
    {
      kind: "table",
      headers: ["Attribute", "Live Resin Cart", "Distillate Cart"],
      rows: [
        ["Source material", "Fresh-frozen whole flower", "Dried, cured flower or trim"],
        ["Terpene content", "3–5% (natural, strain-specific)", "0–1% (often reintroduced)"],
        ["THC concentration", "60–95%", "85–99%"],
        ["Effect profile", "Complex, balanced, entourage-driven", "Direct, potent, one-dimensional"],
        ["Flavor and aroma", "Rich, strain-true, layered", "Near-odorless or added blend"],
        ["Best evening use", "Sensory, ceremonial wind-down", "Consistent, predictable dosing"],
        ["Price range (NY, 2026)", "$50–$100+ per cart", "$30–$60 per cart"],
        ["Ideal vape voltage", "2.2–3.0V", "2.8–3.6V"],
      ],
    },
    {
      kind: "heading",
      id: "why-it-matters",
      text: "Why does the difference matter for your evening?",
      toc: "Why it matters for your evening",
    },
    {
      kind: "image",
      src: `${B3_DIR}/im3-terpene-profile-wmremd.webp`,
      alt: "Terpene infographic showing myrcene, linalool, and beta-caryophyllene and their association with evening calm in live resin cannabis.",
      caption: "The terpenes most associated with calm in evening-oriented strains.",
      width: 2752,
      height: 1536,
    },
    {
      kind: "paragraph",
      text: `The concept behind this is called the entourage effect. A 2024 review published in Pharmaceuticals described it as a major framework for understanding cannabis-based medicine, pointing to terpenes like beta-caryophyllene, limonene, and pinene as significant modulators of cannabinoid activity. In plain terms: the terpenes and cannabinoids in a full-spectrum product work together, and the combined experience is different from THC working alone.`,
    },
    {
      kind: "subheading",
      text: "What terpenes in live resin are associated with relaxation?",
    },
    {
      kind: "paragraph",
      text: `Myrcene is one of the most common terpenes in cannabis and is associated with a settling, grounding effect — the heavier, body-focused quality found in many indica-leaning strains. Linalool is linked in early research to calming and anti-anxiety properties; it is also found in lavender and has been associated with GABA pathway activity. Beta-caryophyllene is unique because it binds directly to CB2 receptors and is associated with anti-inflammatory and grounding properties. Distillate, with its terpene content below one percent, does not deliver this kind of shaped experience. It delivers THC.`,
    },
    {
      kind: "heading",
      id: "when-to-choose",
      text: "When should you choose live resin over distillate?",
      toc: "When to choose which",
    },
    {
      kind: "image",
      src: `${B3_DIR}/im4-resin-distillate-wmremd.webp`,
      alt: "Two evening ritual scenarios side by side — a warm candlelit setting with a live resin cart versus a minimal clean counter with a distillate cart.",
      caption: "Two formats for two kinds of evening.",
      width: 2752,
      height: 1536,
    },
    {
      kind: "paragraph",
      text: `Choose live resin when the ritual is the point. If the night is intentional, the pace is slow, and you want the full sensory experience of the plant, live resin belongs there. The layered terpene profile means the experience has texture — you will taste something, and you will feel something that shifts gradually rather than arriving all at once.`,
    },
    {
      kind: "paragraph",
      text: `Choose distillate when consistency matters more than complexity. Long week. Tired. No interest in nuance. Just reliable delivery at a dose you already understand. Its stripped-down formulation means fewer variables, which makes it easier to predict how you will feel 20 minutes from now. One other factor worth naming: distillate produces significantly less aroma than live resin — a practical consideration in a New York apartment with thin walls and close neighbors.`,
    },
    {
      kind: "heading",
      id: "price",
      text: "What does the price difference actually mean?",
      toc: "What the price means",
    },
    {
      kind: "paragraph",
      text: `In New York's legal cannabis market, the average item price across all categories sat at $29.22 in April 2026, according to Headset market data. Live resin carts typically run 20 to 40 percent higher than comparable distillate products. That premium reflects the cost of the process: specialized flash-freezing equipment, a smaller yield per batch, and the labor of handling fresh material on a tight timeline. For daily use, distillate offers strong value. For a specific ritual night, the live resin premium is an investment in a fuller experience. The right question is not which one is worth more. It is which one is worth more tonight.`,
    },
  ],
  faqs: [
    {
      question: "Is live resin stronger than distillate?",
      answer: `Not necessarily. Distillate typically contains 85 to 99 percent THC, often higher than the 60 to 95 percent in live resin. But potency and quality of experience are two different things. Distillate delivers more THC per pull; live resin delivers a more complete plant-derived experience shaped by its terpene profile.`,
    },
    {
      question: "Does a live resin cart taste different from a distillate cart?",
      answer: `Yes, significantly. Live resin retains the plant's natural terpenes at 3 to 5 percent, producing a flavor that reflects the specific strain — earthy, floral, citrus, or herbal. Distillate has virtually no natural terpenes remaining, so where they are added back in, the aroma is noticeably flatter.`,
    },
    {
      question: "What temperature should I vape a live resin cart at?",
      answer: `Lower temperatures preserve the terpene profile and deliver a smoother, more flavorful pull. A voltage between 2.2V and 3.0V is recommended for live resin. Distillate carts generally perform well between 2.8V and 3.6V. If your device is adjustable, start low with live resin and increase gradually.`,
    },
    {
      question: "Are live resin carts worth the extra cost in New York?",
      answer: `For a deliberate evening ritual where the texture of the experience matters, live resin delivers a depth distillate cannot match at any price. For functional daily use where consistency and cost are the priority, distillate is the more sensible choice. The right question is whether it is worth the premium for the specific evening you are planning.`,
    },
    {
      question: "Can I use a distillate cart for a relaxing evening ritual?",
      answer: `Yes. Distillate's predictability is a feature for certain ritual designs, especially when a consistent, measurable dose matters more than a layered sensory experience. The trade-off is that without a natural terpene profile, the experience is driven almost entirely by THC.`,
    },
  ],
  cta: {
    ...CTA,
    text: `Explore our selection of live resin and distillate carts at JD's Jungle in New York. Our team will walk you through terpene profiles, COA documentation, and the format that fits the evening you are designing. No guesswork — just premium quality and the right product for your ritual.`,
  },
  references: [
    { text: `Headset. (2026, April). New York cannabis market pricing data.`, href: "https://www.headset.io/markets/new-york" },
    { text: `Leafwell. (2025). Live resin vs distillate: What is the difference.`, href: "https://leafwell.com/blog/live-resin-vs-distillate" },
    { text: `Russo, E. B., & Marcu, J. (2024). Cannabis pharmacology. Pharmaceuticals.`, href: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC11870048/" },
    { text: `The Kind Pen. (2026). Distillate vs live resin cart: Which is right for you.`, href: "https://www.thekindpen.com/blog/distillate-vs-live-resin-cart/" },
    { text: `TribeTokes. (2025). Live resin vs distillate: A complete guide.`, href: "https://tribetokes.com/learn/cannabis-education/live-resin/live-resin-vs-distillate/" },
  ],
  relatedSlugs: ["limonene-myrcene-linalool-terpene-effects", "cbd-vs-thc-guide"],
};

const cbdVsThc: BlogArticle = {
  slug: "cbd-vs-thc-guide",
  title: "CBD vs THC: What Each Cannabinoid Does and How to Choose What You Need",
  category: "Cannabinoids",
  number: "04",
  readTime: "8 min read",
  date: "April 20, 2026",
  hero: {
    src: `${B4_DIR}/im0-hero-wmremd.webp`,
    alt: "THC and CBD cannabis products on a dark ceramic tray with New York city lights in the background.",
  },
  lead: `Two people walk into a dispensary and buy the same product. One has a calm, focused evening. The other spends two hours feeling anxious on the couch. The number on the label was identical. The difference had nothing to do with potency — it had everything to do with which cannabinoid they actually needed. When comparing CBD vs THC, most people frame it as a question of strength. The real question is function.`,
  takeaway: `THC and CBD act on your body through completely different pathways. Knowing what each one does — and at what dose — turns a dispensary visit from guesswork into a decision you can stand behind.`,
  keyAnswer: `THC (tetrahydrocannabinol) is the primary psychoactive compound in cannabis. It binds directly to CB1 receptors in the brain, producing a high alongside effects like pain relief, relaxation, and sleep onset. CBD (cannabidiol) is non-intoxicating; it does not bind directly to those receptors, instead working indirectly across more than 65 molecular targets to support calm, reduce inflammation, and in some cases counteract the anxiety THC can cause.`,
  blocks: [
    {
      kind: "heading",
      id: "what-thc-does",
      text: "What does THC actually do in the body?",
      toc: "What THC does",
    },
    {
      kind: "image",
      src: `${B4_DIR}/im1-thc-job-wmremd.webp`,
      alt: "Diagram showing CB1 and CB2 receptor locations in the human body, illustrating how THC interacts with the endocannabinoid system.",
      caption: "THC binds CB1 receptors in the brain and CB2 receptors in the body.",
      width: 2816,
      height: 1536,
    },
    {
      kind: "paragraph",
      text: `THC works by binding directly to CB1 receptors in the brain. These receptors sit across the central nervous system and play a role in how you process mood, memory, movement, and pain. When THC activates them, the result is the high cannabis is known for: altered perception, elevated mood, reduced pain sensitivity, and at higher doses a shift in time and space awareness.`,
    },
    {
      kind: "paragraph",
      text: `This same mechanism is what makes THC effective for certain outcomes. People use it for sleep because it can accelerate how quickly you fall asleep. It is used for pain because it interrupts how the brain registers pain signals. It stimulates appetite because CB1 receptors overlap with hunger regulation pathways. One thing worth being direct about: high doses of THC can cause anxiety in some people. This is not a defect — it is a dose-dependent response. A 5mg edible and a 25mg edible are not the same experience.`,
    },
    {
      kind: "heading",
      id: "what-cbd-does",
      text: "What does CBD do differently from THC?",
      toc: "What CBD does",
    },
    {
      kind: "image",
      src: `${B4_DIR}/im2-cbd-vs-thc-wmremd.webp`,
      alt: "Two-column infographic comparing how THC binds to CB1 receptors directly versus how CBD works through multiple indirect pathways.",
      caption: "THC binds directly; CBD works indirectly across many targets.",
      width: 2816,
      height: 1536,
    },
    {
      kind: "paragraph",
      text: `CBD does not bind directly to CB1 receptors. This is the single most important fact to understand about how it works. Because it does not activate those receptors the way THC does, it does not produce intoxication. What CBD does instead is more layered. Project CBD describes it as a "negative allosteric modulator" of the CB1 receptor, meaning it can actually reduce the intensity of THC binding. It also slows the breakdown of anandamide, one of the body's own endocannabinoids — and when anandamide stays active longer, the effects include reduced anxiety, a quieter stress response, and lower general tension.`,
    },
    {
      kind: "paragraph",
      text: `The practical result: CBD can help with anxiety, muscle tension, inflammation, and general calm, without altering cognition. One data point to keep in mind, though — a 2025 meta-analysis in Sleep Medicine Reviews found that CBD-only formulations did not show the same sleep improvements as formulations combining THC and CBN. If the primary goal is sleep, CBD alone may not be the strongest tool.`,
    },
    {
      kind: "heading",
      id: "at-a-glance",
      text: "THC vs CBD at a glance",
      toc: "THC vs CBD at a glance",
    },
    {
      kind: "table",
      headers: ["Attribute", "THC", "CBD"],
      rows: [
        ["Psychoactive", "Yes", "No"],
        ["Primary receptor", "CB1 (direct binding)", "Indirect; 65+ molecular targets"],
        ["Main effects", "Euphoria, pain relief, appetite, sleep onset", "Calm, reduced anxiety, anti-inflammatory"],
        ["Best suited for", "Evening wind-down, pain, sleep, social", "Daytime calm, anxiety, inflammation, first-timers"],
        ["Modifies the other?", "High doses can increase anxiety", "Can reduce THC-induced anxiety"],
        ["Typical onset (edible)", "30 to 90 minutes", "30 to 90 minutes"],
        ["Typical duration", "2 to 6 hours", "4 to 8 hours (more subtle)"],
      ],
    },
    {
      kind: "heading",
      id: "how-to-choose",
      text: "How do you choose between THC and CBD?",
      toc: "How to choose",
    },
    {
      kind: "paragraph",
      text: `The answer starts with your intent. Three use cases come up most often. Sleep: THC is better supported by research here than CBD alone — a 2025 meta-analysis found that THC+CBN formulations significantly improved subjective sleep quality, while CBD-only did not. Anxiety and daytime calm: low-dose THC can reduce anxiety, high-dose THC can cause it; CBD tends to reduce anxiety at most doses without that risk, and a 1:1 ratio product often feels more stable than either alone. Pain and inflammation: THC works centrally through CB1, CBD works peripherally through CB2, and a ratio product covers more ground than either in isolation.`,
    },
    {
      kind: "callout",
      label: "Please note",
      text: `No product should be presented as a treatment for any condition. If you are managing a specific health issue, speak with a doctor. The choices here are about experience and outcome, not medicine. Must be 21+ to purchase in New York State.`,
    },
    {
      kind: "heading",
      id: "the-label",
      text: "What does the NY label actually tell you?",
      toc: "Reading the label",
    },
    {
      kind: "paragraph",
      text: `New York State requires all licensed cannabis products to display activated THC and CBD values — the decarboxylated figure that is actually bio-available. What the label cannot tell you is how the product will make you feel; New York law prohibits any health or medical claims on cannabis packaging. This is where a Certificate of Analysis (COA) goes further: it shows the complete cannabinoid and terpene profile for that specific batch, including minor cannabinoids like CBN and CBG. Licensed New York dispensaries are required to make COAs available on request, and many now provide QR codes that link directly to lab results.`,
    },
  ],
  faqs: [
    {
      question: "Is CBD or THC better for anxiety?",
      answer: `Both can reduce anxiety at the right dose, but differently. THC at low doses (2.5 to 5mg) can calm anxiety for many people; at higher doses it can increase it. CBD tends to reduce anxiety across a broader dose range without that risk. A 1:1 ratio product is often the most predictable starting point.`,
    },
    {
      question: "Can you use THC and CBD together?",
      answer: `Yes. CBD can reduce some of THC's less desired effects, including anxiety and excessive sedation. Many products are formulated with both at a set ratio for this reason — the idea that they work better in combination is sometimes called the entourage effect.`,
    },
    {
      question: "Does CBD get you high?",
      answer: `No. CBD does not bind directly to CB1 receptors in the brain, which is the mechanism that produces the high. It can produce a sense of calm or reduced tension, but this is distinct from intoxication and produced through different biological pathways.`,
    },
    {
      question: "How much THC should I take if I am new to cannabis?",
      answer: `Start with 2.5 to 5mg for edibles and wait a full 90 minutes before deciding whether to take more. The most common mistake is taking a second dose at the 45-minute mark when the first has not yet peaked. For inhaled products, one or two draws is a reasonable start.`,
    },
    {
      question: "Where can I buy THC and CBD products in New York?",
      answer: `THC products and marijuana-derived CBD are available only at licensed adult-use dispensaries. Hemp-derived CBD in non-intoxicating forms is also available through retailers authorized under the state's Cannabinoid Hemp Program. Licensed dispensaries provide lab-tested products with COAs and staff guidance.`,
    },
  ],
  cta: {
    ...CTA,
    text: `Visit JD's Jungle in New York. Tell our team what you are trying to achieve — sleep, calm, pain, or something in between. We will match you to the right product and pull the COA so you can see exactly what you are getting.`,
  },
  references: [
    { text: `Lee, M. A. (2023). How CBD works. Project CBD.`, href: "https://projectcbd.org/science/how-cbd-works/" },
    { text: `Salamon, M. (2021). The endocannabinoid system: Essential and mysterious. Harvard Health.`, href: "https://www.health.harvard.edu/blog/the-endocannabinoid-system-essential-and-mysterious-202108112569" },
    { text: `Noonan, D. (2025). The science of the endocannabinoid system. Psychology Today.`, href: "https://www.psychologytoday.com/us/blog/an-interpersonal-lens/202510/the-science-of-the-endocannabinoid-system" },
    { text: `NORML. (2025). Clinical trials: THC and CBN, but not CBD, associated with improved sleep quality.`, href: "https://norml.org/news/2025/10/09/clinical-trials-cannabis-formulations-dominant-in-thc-and-cbn-but-not-cbd-associated-with-improved-sleep-quality" },
    { text: `New York State Department of Health. (2025). Report on adult cannabis use.`, href: "https://www.health.ny.gov/press/releases/2025/2025-06-25_adult_cannabis_use_report.htm" },
  ],
  relatedSlugs: ["what-is-cbn-sleep-gummies", "cannabis-for-inflammation-strains-research"],
};

const ediblesVsSmoking: BlogArticle = {
  slug: "edibles-vs-smoking",
  title: "Edibles vs. Smoking: How to Choose the Right Format for the Way You Use Cannabis",
  category: "Formats",
  number: "05",
  readTime: "8 min read",
  date: "April 12, 2026",
  hero: {
    src: `${B5_DIR}/im0-hero-wmremd.webp`,
    alt: "A premium glass jar and an edibles tin on slate with the New York skyline at dusk in the background.",
  },
  lead: `You have two options in front of you. One takes effect in about five minutes. The other might take ninety. Both contain cannabis. Both are legal in New York. But they will produce completely different experiences, and choosing between them based on strength alone is one of the most common mistakes people make. The question is not which format is more powerful. It is which one matches what you are actually trying to do tonight.`,
  takeaway: `Edibles hit differently than smoking, and the difference matters. It comes down to onset, duration, and how much control you want — not THC percentage.`,
  keyAnswer: `When you smoke, THC enters the bloodstream through the lungs in minutes and produces effects that last one to three hours. When you consume an edible, THC travels through the digestive system and is converted by the liver into 11-hydroxy-THC. That takes 30 to 90 minutes, but the effects that follow are typically stronger and last four to twelve hours.`,
  blocks: [
    {
      kind: "heading",
      id: "the-difference",
      text: "What is the difference between edibles and smoking?",
      toc: "The core difference",
    },
    {
      kind: "image",
      src: `${B5_DIR}/im1-edibles-smoking-wmremd.webp`,
      alt: "Infographic showing how edibles vs smoking are absorbed — lungs vs liver metabolism — with onset times.",
      caption: "The core difference is the route THC takes to reach your brain.",
      width: 2816,
      height: 1536,
    },
    {
      kind: "paragraph",
      text: `When you smoke cannabis, THC passes through your lungs and into your bloodstream almost immediately. The bioavailability of smoked THC — the percentage that actually reaches your system — is approximately 31%. Effects arrive fast, peak quickly, and fade within one to three hours.`,
    },
    {
      kind: "paragraph",
      text: `Edibles follow a slower route. After you eat a gummy or chocolate, it moves through your stomach and into the liver, where delta-9 THC is converted into 11-hydroxy-THC, a metabolite that crosses the blood-brain barrier more efficiently. The result is a stronger, longer-lasting effect, but one that can take 30 minutes to three hours to arrive. Edibles deliver only 10 to 20% of THC to your system, but what does reach your brain is more potent per milligram. This is why the same person can smoke regularly and still be caught off guard by a 10 mg edible.`,
    },
    {
      kind: "heading",
      id: "pros-and-cons",
      text: "What each format actually gives you",
      toc: "Pros and cons",
    },
    {
      kind: "paragraph",
      text: `Smoking delivers speed and control. Effects typically arrive within two to ten minutes, which means you can calibrate as you go. The duration tends to stay within one to three hours, which suits a defined window of time. The main consideration is respiratory: chronic daily smoking can irritate the lungs over time. Edibles offer duration and discretion. Once the effect arrives, it tends to stay — four to eight hours on average. No smoke, no odour, nothing visible. The main risk is the delay: the most common mistake is taking a dose, feeling nothing after 45 minutes, and taking more.`,
    },
    {
      kind: "table",
      headers: ["Factor", "Smoking", "Edibles"],
      rows: [
        ["Onset time", "2–10 minutes", "30 minutes – 3 hours"],
        ["Peak effects", "10–30 minutes", "2–3 hours"],
        ["Duration", "1–3 hours", "4–12 hours"],
        ["THC bioavailability", "~31%", "10–20%"],
        ["Active compound", "Delta-9 THC", "11-hydroxy-THC (more potent)"],
        ["Dose control", "Easier — immediate feedback", "Harder — delayed feedback"],
        ["Discretion", "Low (odour, visible smoke)", "High (no odour, portable)"],
        ["Best for", "Fast relief, social use, short sessions", "Sleep, sustained effects, discreet settings"],
      ],
    },
    {
      kind: "heading",
      id: "how-long",
      text: "How long do edibles last compared to smoking?",
      toc: "How long each lasts",
    },
    {
      kind: "paragraph",
      text: `This is where the two formats separate most clearly. Smoked cannabis typically produces noticeable effects for one to three hours; the peak arrives fast and fades steadily. Edibles work on a different clock — four to twelve hours depending on the dose, the individual, and whether they ate beforehand. A 10 mg edible taken at 8 pm can still be producing effects at 2 am. The reason is the half-life of 11-hydroxy-THC, which persists in the body longer than delta-9 THC. It also means that if you have taken more than intended, the feeling will not pass quickly — uncomfortable, but avoidable with the right starting dose.`,
    },
    {
      kind: "heading",
      id: "when-to-choose",
      text: "When should you choose each?",
      toc: "When to choose which",
    },
    {
      kind: "image",
      src: `${B5_DIR}/im2-choose-edibles-smoking-wmremd.webp`,
      alt: "When to choose edibles vs smoking — an indoor evening apartment scene and an NYC rooftop at dusk.",
      caption: "Edibles for contained, indoor evenings; smoking for fast, social moments.",
      width: 2816,
      height: 1536,
    },
    {
      kind: "paragraph",
      text: `Edibles work well when the goal is a longer, more contained experience — winding down for the evening, supporting sleep, or a setting where smoking is not practical. In New York specifically, many apartment buildings restrict smoking indoors, and edibles remove that variable entirely. They are also the better option for new users or anyone who tends toward anxiety. Smoking fits the moments where speed and precision matter: if you want to feel something within minutes and stop when you have had enough. Under New York's MRTA, adults 21 and older can legally smoke in most places where tobacco smoking is permitted; consumption is prohibited in vehicles, workplaces, restaurants, and on federal property.`,
    },
  ],
  faqs: [
    {
      question: "Are edibles stronger than smoking cannabis?",
      answer: `They tend to feel stronger. When you eat an edible, delta-9 THC is converted into 11-hydroxy-THC, which binds to cannabinoid receptors more efficiently and crosses the blood-brain barrier more easily. The experience is often described as more intense and more body-centred, even at a similar milligram dose.`,
    },
    {
      question: "Why do edibles take so long to kick in?",
      answer: `The route of absorption is different. Smoked cannabis bypasses digestion and enters the bloodstream through the lungs in minutes. An edible has to travel through the stomach and liver first — 30 to 90 minutes on average, and longer after a full meal.`,
    },
    {
      question: "What is a safe starting dose for edibles if I usually smoke?",
      answer: `Start at 2.5 to 5 mg of THC. Your smoking tolerance does not translate to edibles because the active compound is different. Wait the full two hours before considering more. The most common error is deciding it has not worked and taking a second dose, only to have both arrive together.`,
    },
    {
      question: "Can you smoke cannabis in public in New York?",
      answer: `Yes, in most locations where tobacco smoking is permitted — typically some sidewalks and outdoor public spaces. You cannot smoke in vehicles, workplaces, schools, restaurants, bars, or on federal property. Local building rules may be stricter, so check posted signage.`,
    },
    {
      question: "Which format is better for sleep?",
      answer: `Edibles are generally more effective for sleep. The longer duration means the effect carries through several hours rather than fading before deeper sleep stages arrive. A low-dose edible of 5 mg or under, taken 60 to 90 minutes before bed, gives most people a more consistent result than smoking.`,
    },
  ],
  cta: {
    ...CTA,
    text: `Not sure which format fits what you have in mind? Our team works through that with every customer. Visit JD's Jungle in New York, tell us what you are looking to feel and when, and we will help you find the right product.`,
  },
  references: [
    { text: `Cannovia. (2024). THC joints vs edibles: Onset, duration and which hits harder.`, href: "https://cannovia.com/blogs/discover/thc-joints-vs-edibles" },
    { text: `City Distributions. (2024). Smoking vs. eating THC: A comprehensive comparison.`, href: "https://citydistributions.com/blogs/news/smoking-vs-eating-thc-a-comprehensive-comparison" },
    { text: `Prairie Cannabis. (2025). Eating vs. smoking cannabis: Key differences.`, href: "https://prairiecannabis.com/smoking-vs-edibles-effects-dosage-guide/" },
    { text: `NY Office of Cannabis Management. (2025). Law enforcement.`, href: "https://cannabis.ny.gov/law-enforcement" },
    { text: `Stoops NYC. (2025). New York's 2025 cannabis laws explained.`, href: "https://stoopsnyc.com/blog/new-york-marijuana-laws/" },
  ],
  relatedSlugs: ["tincture-vs-edible-guide", "edibles-for-energy-and-focus"],
};

const whatIsCbn: BlogArticle = {
  slug: "what-is-cbn-sleep-gummies",
  title: "What Is CBN and Why Does It Keep Showing Up in Sleep Products",
  category: "Cannabinoids",
  number: "06",
  readTime: "7 min read",
  date: "April 4, 2026",
  hero: {
    src: `${B6_DIR}/im0-hero-wmremd.webp`,
    alt: "A CBN sleep gummy on a dark navy tray with a product label, soft gold light, nighttime editorial mood.",
  },
  lead: `You pick up a sleep gummy at a New York dispensary and flip it over. THC: 5mg. CBN: 10mg. You already know what the THC is. But what is CBN, and why does it keep showing up alongside it on every nighttime formula? It is showing up for a reason. CBN is a minor cannabinoid that has moved from the background of cannabis science into formulated sleep products, and the research behind that shift is real, if still early.`,
  takeaway: `CBN is the cannabinoid showing up in sleep gummies across New York. Here is what it is, what the science actually says, and what to look for when you are standing in front of the shelf.`,
  keyAnswer: `CBN, or cannabinol, is a minor cannabinoid that forms naturally as THC breaks down over time when exposed to oxygen, light, or heat. Unlike THC, it is non-intoxicating at standard doses. It interacts with the body's endocannabinoid system and has been linked in preclinical and early human studies to improved sleep quality, particularly when combined with THC.`,
  blocks: [
    {
      kind: "heading",
      id: "where-cbn-comes-from",
      text: "Where does CBN come from, and how is it different from CBD?",
      toc: "Where CBN comes from",
    },
    {
      kind: "image",
      src: `${B6_DIR}/im1-thc-cbd-wmremd.webp`,
      alt: "Infographic showing CBN forming from THC through oxidation, contrasted with CBD's separate origin pathway.",
      caption: "CBN forms as THC degrades; CBD has its own pathway entirely.",
      width: 2147,
      height: 1055,
    },
    {
      kind: "paragraph",
      text: `CBN is not harvested directly from the cannabis plant the way CBD or THC is. It forms as a byproduct when THC degrades — expose cannabis to oxygen, heat, or light over time, and THC slowly converts into CBN. This is why aged cannabis has long been associated with a heavier, sleepier effect. CBD comes from a completely different place in the plant's chemistry, with its own biosynthetic pathway that does not depend on THC at all.`,
    },
    {
      kind: "paragraph",
      text: `That difference matters practically. CBD has been widely marketed as a sleep aid, but the clinical data has not kept up with the marketing. A 2025 meta-analysis in Sleep Medicine Reviews, reviewing six randomised controlled trials with 1,077 participants, found that CBD-only formulations did not produce a statistically significant improvement in sleep quality. CBN formulations, particularly paired with THC, did. Modern CBN products do not rely on aged flower — manufacturers now isolate and concentrate CBN through controlled oxidation or extraction.`,
    },
    {
      kind: "heading",
      id: "the-research",
      text: "What does the research actually say about CBN and sleep?",
      toc: "What the research says",
    },
    {
      kind: "paragraph",
      text: `For decades, the connection between CBN and sleep was mostly anecdote. That changed in November 2024, when researchers at the University of Sydney's Lambert Initiative published a study in Neuropsychopharmacology — the first to use objective measurements (EEG-based polysomnography) to show that CBN increases sleep in rats, specifically by increasing total sleep time and time in non-REM (deep) sleep. One limitation is worth stating clearly: this was a preclinical study conducted in rats, and human trials are ongoing.`,
    },
    {
      kind: "paragraph",
      text: `The human-facing evidence is building separately. The 2025 meta-analysis in Sleep Medicine Reviews found that across six randomised controlled trials, formulations containing THC and CBN were associated with meaningful improvements in self-reported sleep quality. CBD-only formulations were not. This matters because it pushes back against the assumption that any cannabinoid will help with sleep. The data points to a specific pairing, not a general category.`,
    },
    {
      kind: "heading",
      id: "the-label",
      text: "What does the gummy label actually mean?",
      toc: "What the label means",
    },
    {
      kind: "image",
      src: `${B6_DIR}/im2-cbn-gummy-label-wmremd.webp`,
      alt: "Cannabis gummy label annotated with CBN and THC per serving amounts alongside a Certificate of Analysis on a dark surface.",
      caption: "The THC and CBN numbers together define the sleep profile.",
      width: 2752,
      height: 1536,
    },
    {
      kind: "paragraph",
      text: `When a gummy lists both a THC amount and a CBN amount per serving, those two numbers together define the product's sleep profile, not just its potency. In New York, adult-use edibles are capped at 10mg of THC per serving; CBN does not carry a separate legal cap, so the content varies by product. A gummy with 5mg THC and 10mg CBN will behave differently from one with 10mg THC and 2mg CBN. Higher CBN relative to THC tends to mean more sedation with less of the psychoactive effect. Reading the Certificate of Analysis matters more than reading the packaging — look for the CBN percentage confirmed by the lab, and check the terpene profile for myrcene.`,
    },
    {
      kind: "heading",
      id: "cbn-vs-thc-cbd",
      text: "How does CBN compare to THC and CBD for sleep?",
      toc: "CBN vs THC vs CBD",
    },
    {
      kind: "table",
      headers: ["", "CBN", "THC", "CBD"],
      rows: [
        ["Origin", "Forms as THC oxidises", "Primary intoxicating cannabinoid", "Separate biosynthetic pathway"],
        ["Psychoactivity", "Non-intoxicating at standard doses", "Intoxicating, dose-dependent", "Non-psychoactive"],
        ["Sleep role", "Increases deep (NREM) sleep; fewer awakenings", "Helps onset; may reduce REM long-term", "No significant solo sleep effect"],
        ["Research status", "Preclinical + early human; promising", "Established, widely studied", "Established for anxiety/pain; limited for sleep"],
      ],
    },
    {
      kind: "paragraph",
      text: `THC helps you fall asleep faster. CBN appears to help you stay asleep longer and reach deeper sleep. CBD, despite its popularity, has not demonstrated the same sleep-specific effect in controlled trials. The strongest research signal currently points toward THC+CBN combinations — which is exactly why that pairing has become the standard in formulated sleep gummies.`,
    },
    {
      kind: "heading",
      id: "what-to-look-for",
      text: "What should you look for at a New York dispensary?",
      toc: "What to look for",
    },
    {
      kind: "image",
      src: `${B6_DIR}/im3-coa-tincture-wmremd.webp`,
      alt: "A CBN tincture and sleep gummies with a COA lab report on a dark navy surface, gold side lighting.",
      caption: "Every licensed product carries a COA — use it.",
      width: 2752,
      height: 1536,
    },
    {
      kind: "paragraph",
      text: `Start with the cannabinoid profile: look for a product that lists both THC and CBN per serving, with the CBN confirmed by lab testing. For anyone new to edibles, 2.5 to 5mg THC is a sensible starting point; CBN in formulated sleep products commonly ranges from 5mg to 20mg per serving, and higher does not automatically mean better. Timing matters as much as dose — gummies typically take 45 to 90 minutes, so take one 60 to 90 minutes before you want to be asleep. A conversation about what is actually disrupting your sleep is a better starting point than browsing by milligrams alone.`,
    },
    {
      kind: "callout",
      label: "Please note",
      text: `This content is for educational purposes only and does not constitute medical advice. Cannabis affects individuals differently. Must be 21+ to purchase in New York State. If you are experiencing persistent insomnia, consult a licensed healthcare provider.`,
    },
  ],
  faqs: [
    {
      question: "What is CBN and is it the same as CBD?",
      answer: `Both are cannabinoids, but structurally different and they work differently. CBN forms as THC breaks down over time; CBD comes from a separate part of the plant's chemistry. CBD is widely used for anxiety and pain. CBN has shown more specific promise for sleep, particularly in combination with THC.`,
    },
    {
      question: "Does CBN actually work for sleep?",
      answer: `The early evidence is promising. A 2024 University of Sydney study was the first to objectively show CBN increases sleep in rats, and a 2025 meta-analysis found THC+CBN formulations improved subjective sleep quality across six human trials, while CBD-only did not. Human trials with CBN are ongoing — the evidence is promising, not conclusive.`,
    },
    {
      question: "How much CBN should I take for sleep?",
      answer: `Dosing varies by product and person. Studies have used anywhere from 6mg to 20mg per night. If you are new to edibles, start at the lower end and give the product a full 60 to 90 minutes before drawing conclusions.`,
    },
    {
      question: "Can I buy CBN sleep gummies in New York?",
      answer: `Yes. CBN products are available at licensed adult-use dispensaries across New York State. All products are lab-tested, and certificates of analysis are available for every product. Look for products that list CBN content clearly per serving and confirm it against the COA.`,
    },
    {
      question: "Will CBN make me feel high?",
      answer: `CBN at standard gummy doses is non-intoxicating. It does not bind to CB1 receptors strongly enough to produce the euphoric effect associated with THC. Products that also contain THC will have an intoxicating component based on the THC dose, not the CBN.`,
    },
  ],
  cta: {
    ...CTA,
    text: `Visit JD's Jungle to explore our selection of lab-tested CBN sleep formulations. Every product meets New York OCM standards, and our team can help match you to the right formula based on what you actually need from your night.`,
  },
  references: [
    { text: `Santos da Silva, G. H., et al. (2025). Effectiveness of cannabinoids on subjective sleep quality. Sleep Medicine Reviews.`, href: "https://pubmed.ncbi.nlm.nih.gov/40929927/" },
    { text: `University of Sydney. (2024). Sleepy cannabis: First objective study to show cannabinol increases sleep.`, href: "https://www.sydney.edu.au/news-opinion/news/2024/11/12/cannabinol-increases-sleep-objective-measure-lambert.html" },
    { text: `Arnold, J. C., et al. (2024). A sleepy cannabis constituent. Neuropsychopharmacology.`, href: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC11736144/" },
    { text: `NORML. (2025). Clinical trials: THC and CBN, but not CBD, associated with improved sleep quality.`, href: "https://norml.org/news/2025/10/09/clinical-trials-cannabis-formulations-dominant-in-thc-and-cbn-but-not-cbd-associated-with-improved-sleep-quality/" },
  ],
  relatedSlugs: ["cannabis-for-sleep-guide", "what-is-cbg-cannabinoid-explained"],
};

const terpeneEffects: BlogArticle = {
  slug: "limonene-myrcene-linalool-terpene-effects",
  title: "What Limonene, Myrcene, and Linalool Terpene Effects Actually Mean for Your Purchase",
  category: "Terpenes",
  number: "07",
  readTime: "9 min read",
  date: "March 27, 2026",
  hero: {
    src: `${B7_DIR}/im0-hero-wmremd.webp`,
    alt: "Three botanical apothecary vials representing limonene, myrcene, and linalool terpene effects on a dark navy surface.",
  },
  lead: `Most people pick cannabis based on THC percentage. Most people are also disappointed more often than they need to be. The number printed largest on a cannabis label tells you one thing: potency. It says nothing about whether you will feel alert or sedated, anxious or calm, focused or flat. Two products with identical THC content can produce completely different experiences. The variable that accounts for most of that difference is the terpene profile.`,
  takeaway: `Most people shop by THC percentage. Three terpenes — limonene, myrcene, and linalool — predict your experience far better. Knowing what each one does changes how you shop.`,
  keyAnswer: `Terpenes are aromatic compounds found in cannabis and hundreds of other plants. They influence how cannabis affects you by interacting with cannabinoids like THC and CBD. Limonene, myrcene, and linalool are among the most common — each associated with distinct effects, from daytime focus to evening rest to anxiety relief.`,
  blocks: [
    {
      kind: "heading",
      id: "why-terpenes",
      text: "Why terpene effects determine your experience more than THC",
      toc: "Why terpenes matter more",
    },
    {
      kind: "image",
      src: `${B7_DIR}/im1-terpene-profile-wmremd.webp`,
      alt: "Infographic comparing THC-only cannabis shopping versus terpene profile selection, showing three different outcome paths.",
      caption: "THC tells you how strong; terpenes shape the direction.",
      width: 2816,
      height: 1536,
    },
    {
      kind: "paragraph",
      text: `THC tells you how strong a product is. Terpenes help shape the direction that strength takes. This interaction is known as the entourage effect. The clearest human evidence comes from a 2024 controlled study led by Tory Spindle, Ph.D., at Johns Hopkins: when D-limonene was inhaled alongside THC, it significantly reduced THC-induced anxiety in a dose-dependent pattern, without blocking any of THC's other effects. Every licensed cannabis product sold in New York has a COA, and the terpene section of that document — reported as a percentage by weight — is where the real selection information lives.`,
    },
    {
      kind: "heading",
      id: "limonene",
      text: "What limonene terpene effects feel like in practice",
      toc: "Limonene (focus)",
    },
    {
      kind: "image",
      src: `${B7_DIR}/im2-limonene-profile-wmremd.webp`,
      alt: "Limonene terpene effects card showing mood lift, focus, and anxiety reduction for daytime cannabis use.",
      caption: "Limonene: the terpene for mornings and social, creative sessions.",
      width: 2752,
      height: 1536,
    },
    {
      kind: "paragraph",
      text: `Limonene is the compound responsible for the sharp, clean smell of lemon peel and orange rind. It appears frequently in sativa-leaning varieties. The most credible human evidence is the 2024 Johns Hopkins study: a double-blind, placebo-controlled crossover trial with 38 participants found that the group inhaling D-limonene alongside a 30mg dose of THC reported significantly reduced anxiety, nervousness, and paranoia. One honest note: this is still early-stage human research. Limonene is the terpene for mornings, creative sessions, and social situations. On a COA, look for limonene above 0.3–0.5% in the terpene section.`,
    },
    {
      kind: "heading",
      id: "myrcene",
      text: "What myrcene terpene effects feel like in practice",
      toc: "Myrcene (rest)",
    },
    {
      kind: "image",
      src: `${B7_DIR}/im3-myrcene-profile-wmremd.webp`,
      alt: "Myrcene terpene effects card showing relaxation, sedation, and body relief for evening cannabis use.",
      caption: "Myrcene: the evening terpene, most correlated with indica labeling.",
      width: 2752,
      height: 1536,
    },
    {
      kind: "paragraph",
      text: `Myrcene is responsible for the deep, earthy, slightly musky smell most people associate with classic indica cannabis. A study in Nature Plants found that myrcene concentration alone explained 21.2% of the variation in indica versus sativa classification across more than 100 samples. It appears to work by enhancing activity at the GABA-A receptor, the same receptor targeted by benzodiazepines; in animal studies it slowed motor activity, increased sleep time, and produced muscle relaxation. Controlled human trials are still ongoing, but the animal science is strong and the consumer experience is consistent. On a COA, myrcene above 0.5% is a reliable indicator of an indica-leaning, body-oriented experience.`,
    },
    {
      kind: "heading",
      id: "linalool",
      text: "What linalool terpene effects feel like in practice",
      toc: "Linalool (calm)",
    },
    {
      kind: "image",
      src: `${B7_DIR}/im4-linalool-profile-wmremd.webp`,
      alt: "Linalool terpene effects card showing anxiety relief and calm mood balance for hybrid cannabis use.",
      caption: "Linalool: calm without weight, often a supporting note in hybrids.",
      width: 2752,
      height: 1536,
    },
    {
      kind: "paragraph",
      text: `Linalool is the softest of the three — floral, lavender-forward, with a faint spice underneath. It rarely appears as the dominant terpene, tending to show up as a supporting note in balanced hybrid profiles. A 2021 review in Frontiers in Psychiatry identified linalool as a candidate for further investigation in insomnia, anxiety, and depression, noting it may affect the brain partly through its aroma via olfactory pathways. The honest caveat: well-designed human clinical trials are still limited. Linalool is the terpene for the high-stress day you want to decompress without going flat. On a COA it typically appears between 0.1–0.3%; even at those concentrations it contributes meaningfully.`,
    },
    {
      kind: "heading",
      id: "at-a-glance",
      text: "Limonene vs myrcene vs linalool, at a glance",
      toc: "At a glance",
    },
    {
      kind: "table",
      headers: ["Terpene", "Aroma", "Primary effects", "Best occasion", "COA signal"],
      rows: [
        ["Limonene", "Citrus, lemon peel", "Mood lift, focus, anxiety reduction", "Daytime, social, creative work", "Look for 0.3–0.5%+"],
        ["Myrcene", "Earthy, musky", "Relaxation, sedation, body relief", "Evening, recovery, pre-sleep", "Look for 0.5%+"],
        ["Linalool", "Floral, lavender", "Anxiety relief, calm, mood balance", "Stress reset, gentle evenings", "Present at any level"],
      ],
    },
    {
      kind: "heading",
      id: "read-a-coa",
      text: "How to read a COA for these terpenes",
      toc: "How to read a COA",
    },
    {
      kind: "paragraph",
      text: `Every cannabis product sold at a licensed New York dispensary must pass laboratory testing before it reaches the shelf, producing a Certificate of Analysis. Under New York OCM regulations, terpene content must be disclosed on the COA and reported as a percentage by weight, and many dispensaries include a QR code linking to the digital COA. Look past the cannabinoid section at the top and scroll to the terpene profile — the highest percentage on that list is usually the terpene shaping most of the experience. A product labeled "hybrid" tells you almost nothing; a COA showing myrcene at 0.8% and linalool at 0.2% tells you exactly what kind of evening you are buying.`,
    },
  ],
  faqs: [
    {
      question: "Do terpene effects in cannabis actually work?",
      answer: `Yes, with context. Terpenes influence the cannabis experience by interacting with cannabinoids through the entourage effect. The 2024 Johns Hopkins study on D-limonene and THC is the strongest controlled human evidence to date. Most other terpene research remains preclinical, but the results across animal studies and consumer experience are consistent.`,
    },
    {
      question: "What do limonene terpene effects actually feel like?",
      answer: `Limonene-forward products are typically described as uplifting, clear-headed, and social. The 2024 Johns Hopkins study found limonene specifically reduced THC-induced anxiety without blocking THC's other effects. For daytime or social use, a product with limonene above 0.5% on the COA is a reasonable starting point.`,
    },
    {
      question: "What do myrcene terpene effects actually feel like?",
      answer: `Products with high myrcene tend to feel settling, heavy, and physically relaxing — the characteristic indica experience. Animal research found myrcene combined with THC intensifies sedation. Human trials are ongoing, but the consumer experience aligns closely with the animal data.`,
    },
    {
      question: "What do linalool terpene effects actually feel like?",
      answer: `Linalool is calm without weight. It is associated with anxiety reduction and mood balance, and appears to work partly through the olfactory system rather than solely through blood absorption. Clinical human trials are still limited.`,
    },
    {
      question: "Where do I find the terpene profile for a product in New York?",
      answer: `On the Certificate of Analysis for any licensed NY product. Ask at the counter and the team can pull it up, or scan the QR code on the packaging. The terpene section shows each terpene present and its percentage by weight.`,
    },
  ],
  cta: {
    ...CTA,
    text: `Come into JD's Jungle and tell the team what you are looking for. We will pull the COA on any product and walk you through the terpene profile before you decide. No guesswork — just the right fit for your evening, your morning, or wherever you are headed next.`,
  },
  references: [
    { text: `Spindle, T. R., et al. (2024). Vaporized D-limonene mitigates the anxiogenic effects of THC. Drug and Alcohol Dependence.`, href: "https://www.hopkinsmedicine.org/news/newsroom/news-releases/2024/04/researchers-show-chemical-found-naturally-in-cannabis-may-reduce-anxiety-inducing-effects-of-thc" },
    { text: `Russo, E. B. (2011). Taming THC: Phytocannabinoid-terpenoid entourage effects. British Journal of Pharmacology.`, href: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3165946/" },
    { text: `Vigil, J. M., et al. (2021). Cannabis labelling and terpene synthase genes. Nature Plants.`, href: "https://www.nature.com/articles/s41477-021-01003-y" },
    { text: `Kamal, B. S. K., et al. (2021). Pinene and linalool as terpene-based medicines for brain health. Frontiers in Psychiatry.`, href: "https://www.frontiersin.org/journals/psychiatry/articles/10.3389/fpsyt.2021.583211/full" },
    { text: `Office of Cannabis Management, New York State. (2025). Part 128: Packaging and labeling guidance.`, href: "https://cannabis.ny.gov/part-128-guidance" },
  ],
  relatedSlugs: ["live-resin-vs-distillate-cart", "cbd-vs-thc-guide"],
};

const tinctureVsEdible: BlogArticle = {
  slug: "tincture-vs-edible-guide",
  title: "Tinctures vs. Edibles: How to Pick the Right Format for Your Goal",
  category: "Formats",
  number: "08",
  readTime: "7 min read",
  date: "March 18, 2026",
  hero: {
    src: `${B8_DIR}/im0-hero-wmremd.webp`,
    alt: "A cannabis tincture dropper and an edible gummy on a dark surface, representing the tincture vs edible comparison.",
  },
  lead: `Most people make this decision by accident. They grab a gummy because it looks familiar, or a tincture because someone at the dispensary suggested it, and then they're surprised when the experience doesn't land the way they expected. The format you choose determines when the effects arrive, how strong they feel, and how long they stay. Getting that right is not complicated. It just requires knowing what you're choosing between.`,
  takeaway: `Tinctures and edibles work differently. Which one fits depends on your timing, your tolerance, and your goal — the format should follow your intent, not the other way around.`,
  keyAnswer: `A tincture is a liquid cannabis extract taken under the tongue. It absorbs into the bloodstream in 15 to 45 minutes and typically lasts 2 to 4 hours. An edible is a cannabis-infused food product that passes through the digestive system, taking 45 to 90 minutes to take effect but lasting considerably longer — often 4 to 8 hours.`,
  blocks: [
    {
      kind: "heading",
      id: "how-they-work",
      text: "How do tinctures and edibles work differently in the body?",
      toc: "How they work",
    },
    {
      kind: "image",
      src: `${B8_DIR}/im1-infographic- edibles--wmremd.webp`,
      alt: "Infographic comparing tincture sublingual absorption versus edible first-pass liver metabolism, showing onset times for each.",
      caption: "Sublingual absorption versus first-pass liver metabolism.",
      width: 2752,
      height: 1536,
    },
    {
      kind: "paragraph",
      text: `When you place tincture drops under your tongue, the tissue there is thin and well supplied with blood vessels. The active compounds absorb directly into the bloodstream within minutes, skipping most of the digestive process. Effects arrive relatively quickly and feel clear and manageable for most users; the experience is shorter because the compounds don't go through the liver's full processing cycle.`,
    },
    {
      kind: "paragraph",
      text: `Edibles work on a completely different schedule. After you swallow a gummy, it travels through your stomach and intestines before the cannabinoids enter your bloodstream. Along the way, the liver converts THC into 11-hydroxy-THC, a metabolite that is more potent and stays in the body longer than THC absorbed sublingually. That's why edibles feel stronger to many people, and why the effects can last well into the next several hours. The most common mistake is not waiting long enough — someone takes a gummy, feels nothing after 45 minutes, takes another, and then both arrive at once.`,
    },
    {
      kind: "heading",
      id: "onset-duration-dose",
      text: "Onset, duration, and dose control",
      toc: "Onset, duration, dose",
    },
    {
      kind: "table",
      headers: ["Factor", "Tincture", "Edible"],
      rows: [
        ["Onset time", "15–45 minutes", "45–90 minutes"],
        ["Duration", "2–4 hours", "4–8 hours"],
        ["Dosing precision", "High — adjustable drop by drop", "Moderate — fixed per serving"],
        ["Effect intensity", "Lighter, more predictable arc", "Stronger (11-OH-THC conversion)"],
        ["NY serving limit", "Varies by product", "10mg THC per serving (OCM)"],
        ["Best use case", "Precision timing, fast relief, titration", "Sleep, sustained relief, social events"],
        ["Experience level", "Beginner-friendly for dose testing", "Better with some prior experience"],
      ],
    },
    {
      kind: "paragraph",
      text: `One point worth noting on the New York column: the Office of Cannabis Management sets a 10mg THC ceiling per edible serving. That ceiling protects consumers from accidental overconsumption, but it is not a dosing recommendation — most new users are better served starting at 2.5 to 5mg. Tinctures give you more control in real time because you can adjust incrementally; with edibles, the dose is fixed at the point of swallowing.`,
    },
    {
      kind: "heading",
      id: "when-tincture",
      text: "When should you choose a tincture over an edible?",
      toc: "When to choose a tincture",
    },
    {
      kind: "image",
      src: `${B8_DIR}/im2-person-tincture-bottle-wmremd.webp`,
      alt: "A person holding a cannabis tincture bottle in a calm New York apartment at night, representing intentional use.",
      caption: "A tincture suits timing, titration, and a contained window.",
      width: 2816,
      height: 1536,
    },
    {
      kind: "paragraph",
      text: `A tincture makes the most sense when timing is part of your plan. If you know you want to feel the effects within the hour, a sublingual format gives you that reliability. It's also the better starting point for anyone returning to cannabis after a break, or new to a format entirely, because you can start small, wait, observe, and add more if needed. The shorter duration is a practical advantage too: if you want to wind down without the effects running into the following morning, a tincture's 2 to 4 hour window gives you more control over when the experience ends.`,
    },
    {
      kind: "heading",
      id: "when-edible",
      text: "When do edibles make more sense?",
      toc: "When to choose an edible",
    },
    {
      kind: "image",
      src: `${B8_DIR}/im3-edibles-on-table-wmremd.webp`,
      alt: "Cannabis edibles on a bedside table in a calm dark bedroom, representing intentional nighttime use.",
      caption: "Edibles carry you through the night without re-dosing.",
      width: 2752,
      height: 1536,
    },
    {
      kind: "paragraph",
      text: `When duration matters more than speed, edibles are the better tool. Sleep is the clearest example: a 2025 meta-analysis in Sleep Medicine Reviews found THC and CBN combination formulations significantly improved subjective sleep quality compared to CBD-only products, and gummies formulated with both are designed for this use case. Edibles are also the right call for longer social events where re-dosing would be inconvenient. The fixed-dose format works in your favor once you know how your body responds — new users benefit from starting at 2.5 to 5mg and treating the first session as calibration.`,
    },
    {
      kind: "subheading",
      text: "Is there a middle ground?",
    },
    {
      kind: "paragraph",
      text: `Fast-acting sublingual edibles, typically sold as mints or lozenges, combine the convenience of an edible with onset times closer to a tincture. They dissolve under the tongue or absorb through the cheek, largely bypassing the digestive pathway, with onset typically between 15 and 30 minutes. For someone who wants the familiarity of a solid format but needs faster, more predictable timing, this category is worth knowing about. Licensed New York dispensaries carry sublingual formats alongside traditional tinctures and edibles.`,
    },
  ],
  faqs: [
    {
      question: "Which is stronger, a tincture or an edible?",
      answer: `Edibles are generally more intense and longer-lasting. The liver converts THC into 11-hydroxy-THC during digestion, which is more potent than THC absorbed sublingually. Tinctures deliver a lighter, more predictable effect. Stronger is not always better — the right choice depends on what you're trying to accomplish.`,
    },
    {
      question: "How long does a tincture take to work compared to an edible?",
      answer: `Tinctures taken under the tongue typically take effect in 15 to 45 minutes. Edibles range from 45 to 90 minutes, depending on your metabolism, what you've eaten, and your tolerance. Those numbers are ranges, not guarantees.`,
    },
    {
      question: "Can you take a tincture and an edible at the same time?",
      answer: `This is not recommended, especially for people without significant experience with both formats. The two pathways arrive at different times and intensities, and managing the combined effect is difficult to predict. Starting with one format at a time gives you a much cleaner read on how your body is responding.`,
    },
    {
      question: "What is the right starting dose for a tincture vs. an edible?",
      answer: `For both formats, 2.5 to 5mg THC is a sensible starting point for new or returning users. New York's 10mg per-serving edible limit is a regulatory ceiling, not a recommended dose. Tinctures let you adjust by the drop; with edibles, choosing a lower-dose product matters more at the start.`,
    },
    {
      question: "Which format is better for sleep?",
      answer: `Both can work. Edibles with THC and CBN are the more common sleep choice because of their longer duration. Tinctures suit users who want to fall asleep without the effects carrying into the following morning. The right answer depends on your sleep pattern and what's worked for you before.`,
    },
  ],
  cta: {
    ...CTA,
    text: `The best next step is a conversation. JD's Jungle budtenders can match you to the right format for what you're actually trying to do, not just what's available. Visit us in New York to explore our curated selection of tinctures, edibles, and sublingual formats.`,
  },
  references: [
    { text: `Explore Sherpa. (2024). What are sublingual edibles? A guide to fast-acting cannabis products.`, href: "https://www.exploresherpa.com/blogs/our-blog/what-are-sublingual-edibles" },
    { text: `New York State Office of Cannabis Management. (2025). OCM annual report 2025.`, href: "https://cannabis.ny.gov/system/files/documents/2025/12/ocm-annual-report_final-2025.pdf" },
    { text: `Sleep Medicine Reviews. (2025). Meta-analysis: THC and CBN formulations and sleep quality.`, href: "https://www.sciencedirect.com/science/article/abs/pii/S1087079225001091" },
    { text: `NORML. (2025). Clinical trials: THC and CBN, but not CBD, associated with improved sleep quality.`, href: "https://norml.org/news/2025/10/09/clinical-trials-cannabis-formulations-dominant-in-thc-and-cbn-but-not-cbd-associated-with-improved-sleep-quality" },
  ],
  relatedSlugs: ["edibles-vs-smoking", "cannabis-for-sleep-guide"],
};

const cannabisForInflammation: BlogArticle = {
  slug: "cannabis-for-inflammation-strains-research",
  title: "Cannabis for Inflammation: Strains, Compounds, and What to Look For",
  category: "Wellness",
  number: "09",
  readTime: "7 min read",
  date: "March 10, 2026",
  hero: {
    src: `${B9_DIR}/flower_bud_1_5x.webp`,
    alt: "Close-up of premium cannabis flower buds on a dark navy surface.",
  },
  lead: `Inflammation is at the root of a surprising number of conditions — from post-workout soreness and chronic joint discomfort to skin flare-ups and digestive issues. As more New Yorkers integrate cannabis into their wellness routines, one of the most common questions dispensary teams field is: "What actually works for inflammation?" The honest answer is nuanced. Research is ongoing, but the scientific literature has identified several key compounds and mechanisms worth understanding.`,
  takeaway: `Curious about cannabis for pain relief and inflammation? Here's what the research currently shows, which compounds and formats matter most, and how to approach selecting the right product. This is not medical advice — for any health concern, consult a licensed physician.`,
  keyAnswer: `Several of cannabis's compounds interact with the endocannabinoid system (ECS), which plays a documented role in regulating immune response and pain signalling. CB2 receptors in particular are found in high concentrations in immune cells and peripheral tissues — precisely the areas involved in inflammatory response — which is why both the THC:CBD ratio and the product format matter when selecting for inflammation.`,
  blocks: [
    {
      kind: "heading",
      id: "the-ecs",
      text: "Why cannabis interacts with inflammation",
      toc: "The endocannabinoid system",
    },
    {
      kind: "paragraph",
      text: `Inflammation is the body's immune response to damage or threat. Acute inflammation — the redness and swelling around a wound — is protective and temporary. Chronic inflammation is different: a persistent, low-level activation of the immune system that researchers now link to conditions ranging from arthritis to cardiovascular disease. The ECS is a cell-signalling network present throughout the body, including CB1 and CB2 receptors. According to a review published in Frontiers in Pharmacology, both THC and CBD interact with CB2 receptors and have demonstrated anti-inflammatory properties in preclinical models. THC binds directly to CB1 and CB2 receptors, while CBD modulates ECS activity more indirectly.`,
    },
    {
      kind: "heading",
      id: "what-research-shows",
      text: "What the research currently shows",
      toc: "What the research shows",
    },
    {
      kind: "image",
      src: `${B9_DIR}/product_listing_1_5x.webp`,
      alt: "Infographic of cannabis compounds CBD, THC, and terpenes relevant to inflammation and pain relief.",
      caption: "CBD, THC, and terpenes each interact with inflammation pathways.",
      width: 3345,
      height: 1478,
    },
    {
      kind: "subheading",
      text: "CBD and anti-inflammatory effects",
    },
    {
      kind: "paragraph",
      text: `Multiple preclinical studies have found CBD reduces markers of inflammation in animal models. A 2016 study in the European Journal of Pain found that topical CBD application reduced inflammation and pain in a rat arthritis model without apparent side effects. Human clinical trials are more limited, but early data is promising for conditions including inflammatory bowel disease and neuropathic pain.`,
    },
    {
      kind: "subheading",
      text: "THC and pain modulation",
    },
    {
      kind: "paragraph",
      text: `THC's interaction with CB1 receptors in the central nervous system means it can modulate pain perception directly. A 2015 meta-analysis in JAMA found moderate evidence that cannabis products containing THC improved chronic pain outcomes across multiple studies. For inflammation-linked pain specifically, the combination of THC and CBD — the entourage effect — appears more effective than either compound in isolation in several study designs.`,
    },
    {
      kind: "subheading",
      text: "Terpenes and inflammation",
    },
    {
      kind: "paragraph",
      text: `Terpenes are aromatic compounds found throughout the cannabis plant that also interact with the ECS. Beta-caryophyllene, found in strains like OG Kush and GSC, binds directly to CB2 receptors and has demonstrated anti-inflammatory activity in preclinical models. Myrcene and limonene also show anti-inflammatory properties in early research. Selecting a product based on its terpene profile — not just THC percentage — is increasingly considered best practice by cannabis researchers.`,
    },
    {
      kind: "heading",
      id: "what-to-look-for",
      text: "What to look for when shopping",
      toc: "What to look for",
    },
    {
      kind: "list",
      items: [
        `Consider a balanced THC:CBD ratio. If your goal is anti-inflammatory support with manageable psychoactivity, a 1:1 THC:CBD product is a reasonable starting point — the CBD helps modulate the effects of THC. Higher-CBD, lower-THC products are also available for minimal psychoactive effect.`,
        `Look for terpene-rich, full-spectrum products. Full-spectrum products preserve the plant's natural range of cannabinoids and terpenes, supporting the entourage effect. On the COA, look for beta-caryophyllene, myrcene, or limonene. Isolate products strip terpenes and minor cannabinoids, which research suggests diminishes anti-inflammatory potential.`,
        `Consider the format. Topicals deliver localised relief to joints and muscles without systemic effects. Sublingual tinctures offer faster onset (15–45 minutes) than edibles (1–2 hours) and allow precise dosing. Flower and vaporiser products provide the fastest onset but shorter duration.`,
      ],
    },
    {
      kind: "subheading",
      text: "Strains worth knowing",
    },
    {
      kind: "paragraph",
      text: `Several strains are frequently cited for their terpene profiles and reported anti-inflammatory properties. ACDC and Harlequin are high-CBD strains with minimal THC, accessible for sensitive users. Blue Dream and OG Kush are widely available in New York dispensaries and contain notable levels of myrcene and caryophyllene. As with all cannabis use, individual response varies, and starting with a low dose is always advisable.`,
    },
    {
      kind: "callout",
      label: "Please note",
      text: `This is not medical advice. For any health concern, consult a licensed physician. Cannabis affects individuals differently. Must be 21+ to purchase in New York State.`,
    },
  ],
  faqs: [
    {
      question: "Is cannabis proven to reduce inflammation in humans?",
      answer: `Most of the strongest evidence comes from preclinical (animal and cell-based) studies. Human clinical trials specifically on cannabis for inflammation are limited but growing. Several systematic reviews note promising findings for inflammation-adjacent conditions like neuropathic pain and inflammatory bowel disease. The research is encouraging but not yet conclusive at the clinical level.`,
    },
    {
      question: "Which is better for inflammation: THC or CBD?",
      answer: `Research suggests the two work better together than in isolation, due to the entourage effect. However, if you need to avoid intoxication, CBD-dominant products with minor THC are a practical option that still offers anti-inflammatory activity. THC-dominant products may be more effective for pain modulation specifically.`,
    },
    {
      question: "Can I use cannabis topicals for inflammation without getting high?",
      answer: `Yes. Topical cannabis products — creams, balms, and patches — are absorbed transdermally and do not enter the bloodstream in amounts significant enough to produce psychoactive effects. They are suitable for localised inflammation in muscles and joints.`,
    },
    {
      question: "What terpenes should I look for?",
      answer: `Beta-caryophyllene is the most studied terpene for anti-inflammatory properties, as it is the only terpene known to bind directly to CB2 receptors. Myrcene and limonene also show anti-inflammatory activity in early research. Ask your dispensary team for products with these terpenes listed on the COA.`,
    },
    {
      question: "How do I know if a cannabis product is full-spectrum?",
      answer: `Look for "full-spectrum" on the label and review the certificate of analysis, which should list not only THC and CBD but also minor cannabinoids (CBG, CBN, CBC) and terpenes. Reputable dispensaries make COAs available on request or via a QR code on the packaging.`,
    },
  ],
  cta: {
    ...CTA,
    text: `Our team at JD's Jungle is trained to walk you through full-spectrum options, balanced-ratio products, and terpene-forward strains available right now in New York. Come in with your questions — we know the inventory and we know the science.`,
  },
  references: [
    { text: `Hammell, D. C., et al. (2016). Transdermal cannabidiol reduces inflammation and pain in a rat model of arthritis. European Journal of Pain.`, href: "https://doi.org/10.1002/ejp.818" },
    { text: `Nichols, J. M., & Kaplan, B. L. F. (2020). Immune responses regulated by cannabidiol. Cannabis and Cannabinoid Research.`, href: "https://doi.org/10.1089/can.2018.0073" },
    { text: `Russo, E. B. (2011). Taming THC: Phytocannabinoid-terpenoid entourage effects. British Journal of Pharmacology.`, href: "https://doi.org/10.1111/j.1476-5381.2011.01238.x" },
    { text: `Whiting, P. F., et al. (2015). Cannabinoids for medical use: A systematic review and meta-analysis. JAMA.`, href: "https://doi.org/10.1001/jama.2015.6358" },
  ],
  relatedSlugs: ["cbd-vs-thc-guide", "what-is-cbg-cannabinoid-explained"],
};

const cbgExplained: BlogArticle = {
  slug: "what-is-cbg-cannabinoid-explained",
  title: "CBG Explained: The Minor Cannabinoid That Is Showing Up Everywhere",
  category: "Cannabinoids",
  number: "10",
  readTime: "7 min read",
  date: "March 2, 2026",
  hero: {
    src: `${B10_DIR}/im0-hero-wmremd.webp`,
    alt: "Macro close-up of cannabis trichomes representing CBG cannabinoid research.",
  },
  lead: `Walk through any well-stocked New York dispensary right now and you will start noticing it. CBG. It appears on tincture labels, capsule packaging, and wellness products alongside CBD. Customers who have been buying cannabis for years are asking questions about it. First-time buyers are seeing it and wondering what it means. CBG — cannabigerol — is not new to the cannabis plant, but it is relatively new to the consumer-facing market.`,
  takeaway: `CBG is appearing on more cannabis labels in New York. Here is what CBG is, what it is good for based on current research, and how it differs from CBD and THC.`,
  keyAnswer: `CBG stands for cannabigerol. It is a non-intoxicating cannabinoid found in the cannabis plant, typically in smaller concentrations than THC or CBD. It is often called the "mother cannabinoid" because cannabigerolic acid (CBGA) — its acidic precursor — is the chemical starting point from which most other cannabinoids, including THC, CBD, and CBC, are synthesised as the plant matures.`,
  blocks: [
    {
      kind: "heading",
      id: "what-is-cbg",
      text: "What is CBG?",
      toc: "What is CBG?",
    },
    {
      kind: "image",
      src: `${B10_DIR}/im01-cbga-wmremd.webp`,
      alt: "Diagram showing CBGA as the precursor to THC, CBD, CBC, and CBG cannabinoids in the cannabis plant.",
      caption: "CBGA is the precursor most other cannabinoids are built from.",
      width: 2752,
      height: 1536,
    },
    {
      kind: "paragraph",
      text: `Because most CBGA converts into other cannabinoids during plant development, mature cannabis plants typically contain less than one percent CBG by weight. Specialised cultivation techniques — including harvesting plants earlier in their growth cycle — are used to produce CBG-rich strains and extracts. This is why CBG products have historically been rarer and more expensive than CBD.`,
    },
    {
      kind: "heading",
      id: "why-attention",
      text: "Why CBG is getting more attention",
      toc: "Why it's getting attention",
    },
    {
      kind: "paragraph",
      text: `Research into cannabinoids beyond THC and CBD has accelerated in recent years, largely because the legal market has made systematic study more feasible. Unlike THC, CBG does not produce psychoactive effects. Unlike CBD, which modulates the ECS indirectly, CBG interacts more directly with CB1 and CB2 receptors — the same receptors that regulate pain, mood, inflammation, and immune function. This direct activity profile has made CBG a target for early-stage pharmaceutical and wellness research.`,
    },
    {
      kind: "heading",
      id: "what-cbg-is-good-for",
      text: "What is CBG good for? What the research shows",
      toc: "What CBG is good for",
    },
    {
      kind: "paragraph",
      text: `The research on CBG is early-stage but consistent in pointing toward several areas of potential benefit, where preclinical evidence exists and human clinical trials are limited but ongoing.`,
    },
    {
      kind: "list",
      items: [
        `Anti-inflammatory properties. A 2013 study in Biochemical Pharmacology found CBG reduced inflammation in a mouse model of inflammatory bowel disease, acting on CB1 and CB2 receptors and TRPV1 channels.`,
        `Neuroprotective potential. A 2015 study in Neurotherapeutics found CBG had neuroprotective effects in a mouse model of Huntington's disease, improving motor function and protecting neurons from oxidative stress.`,
        `Antibacterial activity. A 2020 study in ACS Infectious Diseases found CBG had antibacterial activity against MRSA, one of the most challenging antibiotic-resistant pathogens.`,
        `Appetite and mood. Preclinical research has also found CBG may stimulate appetite and influence serotonin pathways. This research is very early stage, though consumer reports often describe CBG products as promoting focus and calm without sedation.`,
      ],
    },
    {
      kind: "heading",
      id: "cbg-vs-cbd",
      text: "CBG vs CBD: how they differ",
      toc: "CBG vs CBD",
    },
    {
      kind: "image",
      src: `${B10_DIR}/im02-cbg-tincture-wmremd.webp`,
      alt: "CBG tincture and capsules in a flat-lay on a dark surface.",
      caption: "CBG increasingly appears alongside CBD in full-spectrum products.",
      width: 2752,
      height: 1536,
    },
    {
      kind: "paragraph",
      text: `CBD modulates the endocannabinoid system indirectly — it influences receptor activity, inhibits certain enzymes, and interacts with serotonin and other non-ECS receptors. This gives CBD a broad, gentle profile often associated with relaxation, reduced anxiety, and improved sleep. CBG acts more directly on CB1 and CB2 receptors; some researchers describe it as more "targeted" in its receptor activity, and early reports associate it more with focus and alertness than the calming profile of CBD. Products that combine CBG and CBD may produce different effects than either alone.`,
    },
    {
      kind: "heading",
      id: "on-a-label",
      text: "What seeing CBG on a label should tell you",
      toc: "What it means on a label",
    },
    {
      kind: "paragraph",
      text: `When you see CBG listed on a product, it signals a few things. First, the brand is paying attention to the full cannabinoid profile, not just THC and CBD percentages. Second, the product has likely been formulated or cultivated with some intentionality around minor cannabinoid content. Third, you should check the certificate of analysis to confirm the CBG percentage — marketing language is not always consistent with actual content. Products marketed as "CBG-rich" typically contain one percent or more CBG by weight, compared with the 0.1 to 0.5 percent in standard flower.`,
    },
  ],
  faqs: [
    {
      question: "Does CBG get you high?",
      answer: `No. CBG is non-intoxicating. It does not produce the psychoactive effects associated with THC. CBG-dominant products and CBG-infused tinctures can be used without concern about impairment.`,
    },
    {
      question: "What is the difference between CBG and CBD?",
      answer: `Both are non-intoxicating cannabinoids, but they interact with the endocannabinoid system differently. CBD works primarily through indirect modulation of ECS receptors; CBG binds more directly to CB1 and CB2 receptors. Anecdotally and in early research, CBG tends to be associated with focus and energy, while CBD is more associated with calm and relaxation.`,
    },
    {
      question: "Why is CBG more expensive than CBD?",
      answer: `CBG is present in much lower concentrations in mature cannabis plants — typically under one percent compared to CBD, which can reach 20 percent or higher in hemp. Extracting meaningful quantities requires either more plant material or specialised early-harvest cultivation, which increases production costs.`,
    },
    {
      question: "Can I buy CBG products in New York?",
      answer: `Yes. A growing number of licensed New York dispensaries carry products with intentional CBG content, including tinctures, capsules, and full-spectrum flower. Ask for the certificate of analysis to confirm actual CBG levels before purchasing.`,
    },
    {
      question: "Is CBG legal?",
      answer: `CBG derived from hemp (under 0.3 percent THC) is federally legal in the United States under the 2018 Farm Bill. CBG derived from cannabis is legal in New York under the state's adult-use cannabis framework. Products sold at licensed New York dispensaries comply with state regulations.`,
    },
  ],
  cta: {
    ...CTA,
    text: `The team at JD's Jungle stays current on cannabinoid science and the New York market's evolving product range. If you want to understand your options — CBG, CBD, full-spectrum, or something else — come in and we'll walk you through what's available and what the research actually says.`,
  },
  references: [
    { text: `Borrelli, F., et al. (2013). Beneficial effect of cannabigerol on experimental inflammatory bowel disease. Biochemical Pharmacology.`, href: "https://doi.org/10.1016/j.bcp.2013.01.017" },
    { text: `Farha, M. A., et al. (2020). Uncovering the hidden antibiotic potential of cannabis. ACS Infectious Diseases.`, href: "https://doi.org/10.1021/acsinfecdis.9b00419" },
    { text: `Valdeolivas, S., et al. (2015). Neuroprotective properties of cannabigerol in Huntington's disease. Neurotherapeutics.`, href: "https://doi.org/10.1007/s13311-014-0304-z" },
  ],
  relatedSlugs: ["what-is-cbn-sleep-gummies", "cannabis-for-inflammation-strains-research"],
};

export const BLOG_ARTICLES: BlogArticle[] = [
  ediblesForEnergyAndFocus,
  cannabisForSleep,
  liveResinVsDistillate,
  cbdVsThc,
  ediblesVsSmoking,
  whatIsCbn,
  terpeneEffects,
  tinctureVsEdible,
  cannabisForInflammation,
  cbgExplained,
];

export function getArticle(slug: string): BlogArticle | undefined {
  return BLOG_ARTICLES.find((article) => article.slug === slug);
}
