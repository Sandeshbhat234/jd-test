/**
 * Content for the /contact page. Edit copy, the contact-form subject options,
 * and the FAQ entries here — the page and components read from this file.
 * (Per-store address / phone / email / hours come from `src/data/locations.ts`,
 * driven by the store selected in the navbar.)
 */

export const CONTACT_COPY = {
  formHeading: "We're here to help",
  formSubtitle:
    "Questions about your order? Need a recommendation? Just green guidance? We're here to listen.",
  visitHeading: "Visit us in store",
  visitSubtitle:
    "Come visit our New York store. Ask questions, get friendly advice. Just bring a valid ID.",
  faqHeading: "FAQs",
  faqSubtitle:
    "Quick answers to the most common questions – no fluff, just what you need to know.",
};

/** Options for the contact form's "What's this regarding?" dropdown. */
export const CONTACT_SUBJECTS = [
  "General enquiry",
  "Order support",
  "Product recommendation",
  "Wholesale & partnerships",
  "Feedback",
  "Other",
];

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqGroup {
  title: string;
  items: FaqItem[];
}

export const FAQ_GROUPS: FaqGroup[] = [
  {
    title: "Legal & Store Policies",
    items: [
      {
        question: "Do I need to be a certain age to shop at JD Jungle?",
        answer:
          "Yes. You must be 21 or older to purchase cannabis in New York. This is a state law requirement with no exceptions. We check ID on every transaction, every time.",
      },
      {
        question: "What ID do I need to bring?",
        answer:
          "Any valid, government-issued photo ID showing your date of birth. A driver's license, passport, state ID, IDNYC, or U.S. armed forces ID all work. You do not need a medical card or proof of residency.",
      },
      {
        question: "How much can I buy in one visit?",
        answer:
          "New York law allows adults 21 and older to purchase up to 3 ounces of flower and up to 24 grams of concentrated cannabis (vapes, extracts, and edibles) per day. These limits are tracked automatically at point of sale.",
      },
      {
        question: "Can I consume in the store?",
        answer:
          "No. On-site consumption is not permitted. All products are for off-premises personal use only.",
      },
    ],
  },
  {
    title: "Product Information & Effects",
    items: [
      {
        question: "What's the difference between THC and CBD?",
        answer:
          "THC is the compound responsible for the psychoactive effect. CBD doesn't produce a high and is often used for relaxation or relief without impairment. Many products have both, and the ratio matters. Our staff can help you find the right balance for what you're after.",
      },
      {
        question: "What are terpenes and do they matter?",
        answer:
          "Terpenes are the aromatic compounds in cannabis that influence flavor and effect. They're one of the reasons two strains with the same THC percentage can feel completely different. Common ones include myrcene (earthy, relaxing), limonene (citrus, uplifting), and pinene (pine, focused).",
      },
      {
        question: "What's the right product for sleep?",
        answer:
          "Indica-dominant strains and products high in myrcene are commonly associated with relaxation and sleep. Edibles and tinctures tend to produce longer-lasting effects that some people find better for staying asleep. This varies by individual — our team can point you toward what other customers have found helpful.",
      },
      {
        question: "What about anxiety? Are some products better than others?",
        answer:
          "High-THC products can increase anxiety in some people, especially those new to cannabis. CBD-dominant or balanced THC:CBD products are often a better fit if anxiety is a concern. Start low and go slow. Avoid concentrates if you're sensitive. If you've had a rough experience before, tell us. We can help you find something gentler.",
      },
    ],
  },
  {
    title: "Safe Use & Dosing",
    items: [
      {
        question: "How much should I take if I'm new?",
        answer:
          "Start low and go slow. This applies across all product types. For edibles, begin with 5–10mg THC. For flower, one or two hits. For concentrates, even less. Cannabis affects everyone differently based on body chemistry, tolerance, and consumption method. Give yourself time to feel the effects before taking more.",
      },
      {
        question: "Are your products tested and safe?",
        answer:
          "Yes. Every product we sell has passed lab testing by a state-certified facility before it reaches our shelves. New York requires this for all licensed dispensaries. You can ask to see a Certificate of Analysis for any product.",
      },
    ],
  },
];
