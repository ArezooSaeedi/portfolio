import { Check, MousePointer2, Search } from "lucide-react";

export const navLinks = [
  { label: "Work", to: "/#projects" },
  { label: "Philosophy", to: "/#philosophy" },
  { label: "About", to: "/#about" },
  { label: "Contact", to: "/#contact" },
];

export const projects = [
  {
    slug: "bosch",
    featured: true,
    title: "Bosch eBike Systems",
    eyebrow: "Flagship case study",
    industry: "eBike mobility ecosystem",
    problem:
      "A mature product ecosystem had years of accumulated interface language, but no shared way to evaluate whether that language was clear, accessible, or consistent.",
    role: "Working Student UX Writing",
    type: "Enterprise UX writing and content systems",
    duration: "2024 to present",
    outcome:
      "Audited 400+ strings, clarified recurring error-message patterns, contributed terminology alignment, and created an approved UX writing research framework.",
    metrics: [
      { value: "400+", label: "strings audited" },
      { value: "3", label: "product surfaces" },
      { value: "6", label: "issue categories found" },
    ],
    image: "/bosch/thumbnail.webp",
    imagePosition: "50% 0%",
    href: "/projects/bosch",
    tags: ["Enterprise UX", "UX Writing", "Accessibility", "Research"],
  },
  {
    slug: "ersis",
    title: "ERSIS B2B App Redesign",
    eyebrow: "B2B mobile product design",
    industry: "Automotive aftermarket",
    problem:
      "Workshop owners were expected to browse a catalog in an environment where they mostly needed to repeat familiar orders quickly.",
    role: "UX Designer",
    type: "Android B2B ordering app",
    duration: "",
    outcome:
      "Reframed the product around reordering, redesigned the flow around recent and frequent items, and helped app order share move from roughly 27% to 32%.",
    metrics: [
      { value: "27→32%", label: "app order share" },
      { value: "15", label: "field interviews" },
    ],
    image: "/ersis/ErsisThumbnail.webp",
    href: "/projects/ersis",
    tags: ["B2B", "Product Design", "Research", "Mobile"],
  },
  {
    slug: "chenaran",
    title: "Chenaran Dairy Ordering",
    eyebrow: "B2B web workflow",
    industry: "Dairy supply chain",
    problem:
      "Restaurants and distributors could submit orders, but unclear quantities, review steps, and confirmation states pushed verification back into calls and messages.",
    role: "UI/UX Designer",
    type: "B2B ordering system",
    duration: "1.5 years",
    outcome:
      "Modernized the ordering workflow so product selection, delivery details, review, and confirmation supported confidence instead of manual double-checking.",
    metrics: [
      { value: "4-step", label: "review-centered flow" },
      { value: "3", label: "user groups served" },
    ],
    image: "/chenaran/chenaranthumbnail.webp",
    href: "/projects/chenaran",
    tags: ["B2B", "Product Design", "Workflow UX", "Handoff"],
  },
];

export const philosophy = [
  {
    icon: Search,
    title: "Understand before designing",
    text: "I separate what users say, what the product asks of them, and what the business needs — before proposing anything.",
    proof:
      "In ERSIS, that meant refusing the obvious catalog fix: 15 field interviews showed users were reordering, not browsing, and the home screen changed accordingly.",
    link: { to: "/projects/ersis", label: "How it changed ERSIS" },
  },
  {
    icon: MousePointer2,
    title: "Design decisions need evidence",
    text: "Research earns its place when it changes the direction of the work — deciding what to simplify and what to leave alone.",
    proof:
      "At Bosch, auditing 400+ strings turned scattered copy complaints into prioritized evidence and an approved framework for testing comprehension.",
    link: { to: "/projects/bosch", label: "How it worked at Bosch" },
  },
  {
    icon: Check,
    title: "Clarity is a team sport",
    text: "Good UX survives handoff when language, states, and edge cases are clear enough for product, engineering, and design to share.",
    proof:
      "At Chenaran, clarity was added without breaking the workflow that developers and operations already depended on — the redesign stayed recognizable end to end.",
    link: { to: "/projects/chenaran", label: "How Chenaran shipped" },
  },
];

export const caseStudies = {
  bosch: {
    label: "Flagship UX writing case study",
    title: "Making product language clear enough to scale.",
    subtitle:
      "UX writing at Bosch eBike Systems grew from daily copy support into accessibility auditing, terminology alignment, and an approved framework for testing whether users actually understand the product.",
    cover: "/bosch/thumbnail.webp",
    meta: [
      ["Role", "Working Student UX Writing"],
      ["Product context", "Enterprise eBike ecosystem — app, web portal, internal communication"],
      ["Users", "Riders, technicians, fleet managers, internal teams"],
      ["Focus", "Content audits, terminology consistency, accessibility writing"],
    ],
    outcome: [
      {
        value: "400+",
        label: "Strings audited",
        detail: "Crowdin strings reviewed for clarity, accessibility, and missing context.",
      },
      {
        value: "6",
        label: "Issue categories found",
        detail: "Recurring patterns behind the 400+ strings — from unclear instructions to weak error recovery.",
      },
      {
        value: "Approved",
        label: "Research framework",
        detail: "A structure for testing comprehension, adopted for research planning.",
      },
    ],
    narrative: [
      {
        label: "Overview",
        title: "The main design material was language, not screens.",
        body: [
          "Bosch eBike Systems is a mature ecosystem used by riders, technicians, fleet managers, and internal teams. As the UX writing working student, I handled copy requests from different product areas — each with its own constraints, history, and translation pipeline. The real need was language that could hold up at scale — reviewed and reused, not rewritten from scratch every time.",
        ],
      },
      {
        label: "Problem",
        title: "Individual copy fixes could not solve a system problem.",
        body: [
          "Daily copy work improved specific screens while the same issues kept returning: inconsistent terms, unclear error messages, requests without enough screen context.",
          "So the design question became broader: how can product language be made reviewable and reusable, instead of fixed one string at a time?",
        ],
        artifact: {
          title: "Product copy decisions",
          label: "Iteration example",
          image: "/bosch/copyexample.webp",
          alt: "Anonymized Bosch product copy examples showing UX writing decisions.",
          caption: "Copy evaluated against user context, not just tone — each message clear enough to guide the next action.",
        },
      },
      {
        label: "Research",
        title: "An audit of 400+ strings made the pattern visible.",
        body: [
          "I audited the product's Crowdin strings with an accessibility lens: can a user tell what happened, whether it matters, and what to do next? The failures clustered around missing consequence and missing recovery — grammar was rarely the actual problem. That evidence turned scattered copy complaints into a prioritized, stakeholder-visible problem.",
        ],
        artifact: {
          title: "Accessibility writing audit",
          label: "400+ strings",
          image: "/bosch/accessibility.webp",
          alt: "Bosch accessibility writing audit showing issue categories and prioritization.",
          caption: "Issues prioritized by user impact, making recurring language problems visible to stakeholders.",
        },
      },
      {
        label: "Insight to decision",
        title: "Error messages are interaction design.",
        body: [
          "Each recurring audit insight mapped to a concrete writing decision:",
        ],
        decisionMap: [
          {
            insight: "Error messages announced failure without consequence or recovery",
            decision: "A reusable message pattern: what happened, why it matters, what to do next",
          },
          {
            insight: "The same concept carried different names in different flows",
            decision: "Copy checked against a shared terminology reference before it ships",
          },
          {
            insight: "Copy requests arrived without the surrounding screen",
            decision: "Flow context required with every request, so words match the moment of use",
          },
        ],
        quote: "An error message is not a sentence at the edge of the product. It is part of the recovery flow.",
      },
      {
        label: "Trade-offs",
        title: "Not every string should be rewritten.",
        body: [
          "Some copy looked imperfect in isolation but worked: users had already learned it, developers had dependencies on it, or translation cost outweighed the benefit.",
          "A mature UX writing decision is sometimes to preserve language, document why, and spend the effort where ambiguity affects comprehension, accessibility, or recovery.",
        ],
      },
      {
        label: "Solution",
        title: "A framework to test whether users actually understood the flow.",
        body: [
          "Users can finish a flow and still misread what the product told them. I proposed a UX writing research framework to close that gap: define content clarity, choose high-friction flows, and shape questions around interpretation — hesitation, false confidence, misread system states. The framework was approved and gave the research team a practical structure to test comprehension deliberately.",
        ],
        artifact: {
          title: "UX writing research framework",
          label: "Approved for research",
          image: "/bosch/boschresearch.webp",
          alt: "Bosch UX writing research framework showing goals, methods, and evaluation dimensions.",
          caption: "The framework turned UX writing from subjective preference into something evaluated through user interpretation.",
        },
      },
    ],
    reflection:
      "UX writing is product design at the sentence level. The most valuable work was not a polished line — it was patterns, audit evidence, and research questions that keep improving decisions after my individual contribution ends. The next step is running the research framework itself: testing comprehension on the highest-friction flows first.",
  },
  ersis: {
    label: "B2B mobile UX case study",
    title: "Users were not browsing. They were reordering.",
    subtitle:
      "ERSIS looked like a catalog problem until field research showed the real behavior: workshop owners needed to repeat familiar orders quickly, under pressure.",
    cover: "/ersis/ErsisHero.webp",
    meta: [
      ["Role", "UX Designer"],
      ["Product context", "Android B2B ordering app"],
      ["Users", "Workshop owners and partners — 15 field interviews"],
      ["Focus", "Repeat ordering and checkout confidence"],
    ],
    outcome: [
      {
        value: "27→32%",
        label: "App order share",
        detail: "After the reorder-first redesign — framed honestly, alongside wider business factors.",
      },
      {
        value: "15",
        label: "Field interviews",
        detail: "Workshop owners and partners, interviewed in their working environment.",
      },
      {
        value: "Reorder-first",
        label: "New product direction",
        detail: "Recent and frequent items replaced the catalog as the default path.",
      },
    ],
    narrative: [
      {
        label: "Overview",
        title: "The first assumption was wrong in a useful way.",
        body: [
          "ERSIS is an Android ordering app for automotive workshops. The obvious fix was better navigation, search, and categories — a better catalog. Field research showed that would have polished the wrong product: users were not browsing. They were reordering.",
        ],
      },
      {
        label: "Problem",
        title: "The app competed with a human shortcut.",
        body: [
          "Workshop owners order familiar products between repairs, customers, and invoices. Calling a sales rep was fast because the rep already knew their usual order.",
          "The problem was not how to show more products — it was how to make the digital path as direct as the habit it had to replace.",
        ],
        quote: "If it takes too long, I just call my sales rep.",
        artifact: {
          title: "Existing app screens",
          label: "Before",
          image: "/ersis/ErsisOldScreens.webp",
          alt: "Old ERSIS app screens showing the previous ordering experience.",
          caption: "The original app treated repeat customers as if every visit started with product discovery.",
        },
      },
      {
        label: "Research",
        title: "Fifteen field interviews changed the app's hierarchy.",
        body: [
          "Interviewing owners in their workshops — between repairs, in noise, with hands full — reframed the priorities: speed, recognition, and confidence beat catalog organization and promotional content.",
        ],
        artifact: {
          title: "Research synthesis",
          label: "Why direction changed",
          image: "/ersis/ErsisResearch.webp",
          alt: "ERSIS research synthesis showing workshop ordering pain points.",
          caption: "Interview patterns connected directly to product decisions: faster access, less searching, clearer quantities.",
        },
      },
      {
        label: "Insight to decision",
        title: "Recognition became the interaction model.",
        body: [
          "Each research insight mapped to a design decision:",
        ],
        decisionMap: [
          {
            insight: "Owners repeat familiar orders under time pressure",
            decision: "The home screen leads with recent orders and frequent items",
          },
          {
            insight: "Phone calls won because the rep already knew the usual order",
            decision: "The app remembers it instead — reorder in a few taps, then review",
          },
          {
            insight: "Existing users had already learned the current catalog",
            decision: "Catalog structure stayed intact; reordering was layered around it",
          },
        ],
        artifact: {
          title: "Problem framing",
          label: "From browse to reorder",
          image: "/ersis/ErsisHMW.webp",
          alt: "ERSIS problem framing board.",
          caption: "The brief changed from browsing improvement to repeat-order acceleration.",
        },
      },
      {
        label: "Trade-offs",
        title: "Familiar had to beat novel.",
        body: [
          "The redesign could not feel like a new product that existing users had to relearn. That constraint shaped every iteration: changes stayed close to the known catalog structure while recognition — recent orders, frequent items, safer quantity controls — moved to the front.",
        ],
      },
      {
        label: "Solution",
        title: "A shorter path from recognition to confirmation.",
        body: [
          "The final flow starts from what the user already knows, keeps quantities safe to adjust, and ends in a single review-focused confirmation step.",
        ],
        artifact: {
          title: "Final flow prototype",
          label: "Interaction preview",
          image: "/ersis/ERSIS-GIF.webp",
          alt: "Prototype preview of the redesigned ERSIS reorder flow.",
          caption: "A shorter path from recognition to confirmation.",
        },
        artifactPair: [
          {
            title: "Old flow",
            image: "/ersis/ErsisOldFlow.webp",
            alt: "Old ERSIS ordering flow starting from catalog browsing.",
          },
          {
            title: "New flow",
            image: "/ersis/ErsisNewFlow.webp",
            alt: "New ERSIS ordering flow starting from recent orders and frequent products.",
          },
        ],
      },
      {
        label: "Impact",
        title: "A quiet redesign that fit the workday.",
        body: [
          "App order share moved from roughly 27% to 32%. I frame that carefully — adoption is influenced by more than interface design. The clearer win was directional: ERSIS now behaves less like a catalog and more like a repeat-order tool for busy workshop users.",
        ],
      },
    ],
    reflection:
      "Product thinking often begins by refusing the obvious fix. Better browsing would have been reasonable, but not decisive. The useful principle was to preserve the user's existing habit and make the product meet it with less friction. The next step is tracking reorder speed directly, so the redesign's impact is measured independent of wider order-share shifts.",
  },
  chenaran: {
    label: "B2B workflow case study",
    title: "Modernizing an ordering workflow without breaking operations.",
    subtitle:
      "Chenaran Dairy needed more than a cleaner interface. Restaurants, distributors, internal teams, and developers all depended on an ordering flow that had to become clearer without disrupting daily business.",
    cover: "/chenaran/chenaranthumbnail.webp",
    meta: [
      ["Role", "UI/UX Designer"],
      ["Product context", "B2B dairy ordering system"],
      ["Users", "Restaurants, distributors, internal staff"],
      ["Focus", "Order confidence and operational clarity"],
    ],
    outcome: [
      {
        value: "4-step",
        label: "Review-centered flow",
        detail: "Selection, delivery details, review, confirmation — each decision has a clear place.",
      },
      {
        value: "3",
        label: "User groups served",
        detail: "Restaurants, distributors, and internal staff share one recognizable workflow.",
      },
      {
        value: "Fewer",
        label: "Follow-up calls",
        detail: "Qualitative feedback showed less manual double-checking after submission.",
      },
    ],
    narrative: [
      {
        label: "Overview",
        title: "Submission moved online. Trust didn't follow.",
        body: [
          "Chenaran Dairy supplies restaurants and distributors, and its ordering flow connects customers, inventory, delivery planning, and internal confirmation. Over 1.5 years as the UI/UX designer, my brief evolved from “modernize the interface” to something more precise: customers could submit orders, but did not trust that the right products, quantities, and delivery details were captured — so they called to double-check.",
        ],
      },
      {
        label: "Problem",
        title: "The old flow asked users to remember too much.",
        body: [
          "Product lists were dense, quantities lacked context, steps felt disconnected, and confirmation did not close the loop. Users completed the task — then left unsure whether they had done it correctly. Every ambiguity had operational cost, because verification moved into calls and messages that involved multiple people.",
        ],
        artifact: {
          title: "Where confusion happened",
          label: "Flow breakdown",
          image: "/chenaran/confusionmap.webp",
          alt: "Chenaran ordering flow breakdown showing moments where users became uncertain.",
          caption: "The map shows where verification left the product and fell back into manual communication.",
        },
      },
      {
        label: "Insight to decision",
        title: "Make the order visible before it is submitted.",
        body: [
          "Each observed point of uncertainty mapped to a design decision:",
        ],
        decisionMap: [
          {
            insight: "Users left unsure whether the system captured their order",
            decision: "A dedicated review step shows the full order before submission",
          },
          {
            insight: "Quantities lacked unit and packaging context",
            decision: "Inline unit, stock, and pack context next to every quantity control",
          },
          {
            insight: "Confirmation ended the flow without closing the loop",
            decision: "A confirmation state that says what happens next — delivery and follow-up",
          },
        ],
      },
      {
        label: "Trade-offs",
        title: "Clarity could not cost speed.",
        body: [
          "B2B users order on repeat and value pace. Adding a review step and richer context risked making the flow feel slower, so the selection screen moved from a flat SKU table to grouped products with search, stock status, and a live order summary — packing more clarity into each screen rather than adding more of them.",
        ],
      },
      {
        label: "Solution",
        title: "From data entry to decision support.",
        body: [
          "The final flow separates selection, delivery details, review, and confirmation so each decision has one clear place — and nothing relies on the user's memory.",
        ],
        artifact: {
          title: "Final ordering prototype",
          label: "Review-centered flow",
          image: "/chenaran/newgif.webp",
          alt: "Final Chenaran ordering flow prototype.",
          caption: "Selection, details, review, and confirmation as distinct, legible steps.",
        },
        compare: [
          {
            title: "Product selection",
            before: "/chenaran/old-orders.webp",
            after: "/chenaran/new-selection.webp",
          },
          {
            title: "Order details",
            before: "/chenaran/old-selection.webp",
            after: "/chenaran/new-details.webp",
          },
          {
            title: "Confirmation",
            before: "/chenaran/old-confirmation.webp",
            after: "/chenaran/new-confirmation.webp",
          },
        ],
      },
      {
        label: "Impact",
        title: "Confidence became the product improvement.",
        body: [
          "This project had no formal analytics study, so impact is framed through observed qualitative feedback and stakeholder review: less hesitation around quantities, a clearer final state, and less manual follow-up after submission. The redesign also kept the workflow recognizable enough that developer handoff and daily operations continued without disruption.",
        ],
      },
    ],
    reflection:
      "A modern interface is only valuable when it protects the workflow behind it. The next improvement would be operational feedback — delivery status and repeat-order shortcuts — once the core confirmation flow is trusted.",
  },
};
