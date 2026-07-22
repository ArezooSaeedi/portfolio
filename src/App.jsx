import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, LazyMotion, domAnimation, m, useReducedMotion, useScroll } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ExternalLink,
  FileText,
  Mail,
  Menu,
  X,
} from "lucide-react";
import { createPortal } from "react-dom";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import { caseStudies, navLinks, philosophy, projects } from "./data/portfolioContent.jsx";

// Motion system: two tiers, transform/opacity only.
// - SECTION: page-level reveals (sections, heroes, page transitions)
// - ELEMENT: small UI (cards); CSS handles hover micro-motion at --motion-fast
const EASE_OUT = [0.22, 1, 0.36, 1];
const SECTION_MOTION = { distance: 24, duration: 0.4 };
const ELEMENT_MOTION = { distance: 16, duration: 0.24 };
const STAGGER = 0.08;
const VIEWPORT = { once: true, margin: "-80px" };

// Reads/writes <meta> tags by name or property attribute so each route can
// carry its own description + Open Graph/Twitter preview instead of the
// generic homepage tags (relevant since this is a client-side-routed SPA).
function getMetaTag(attr, key) {
  return document.querySelector(`meta[${attr}="${key}"]`);
}

function setMetaContent(attr, key, content) {
  const tag = getMetaTag(attr, key);
  if (tag) tag.setAttribute("content", content);
}

const META_KEYS = [
  ["name", "description"],
  ["property", "og:title"],
  ["property", "og:description"],
  ["name", "twitter:title"],
  ["name", "twitter:description"],
];

function useRouteMeta({ title, description }) {
  useEffect(() => {
    const previous = META_KEYS.map(([attr, key]) => [attr, key, getMetaTag(attr, key)?.getAttribute("content")]);

    setMetaContent("name", "description", description);
    setMetaContent("property", "og:title", title);
    setMetaContent("property", "og:description", description);
    setMetaContent("name", "twitter:title", title);
    setMetaContent("name", "twitter:description", description);

    return () => {
      previous.forEach(([attr, key, value]) => {
        if (value != null) setMetaContent(attr, key, value);
      });
    };
  }, [title, description]);
}

function App() {
  const location = useLocation();

  return (
    <LazyMotion features={domAnimation} strict>
      <SkipLink />
      <ScrollHandler />
      {location.pathname !== "/" && <ScrollProgress />}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageTransition><Home /></PageTransition>} />
          <Route path="/projects/bosch" element={<PageTransition><CaseStudy id="bosch" /></PageTransition>} />
          <Route path="/projects/chenaran" element={<PageTransition><CaseStudy id="chenaran" /></PageTransition>} />
          <Route path="/projects/ersis" element={<PageTransition><CaseStudy id="ersis" /></PageTransition>} />
        </Routes>
      </AnimatePresence>
      <Analytics />
    </LazyMotion>
  );
}

function SkipLink() {
  return (
    <a className="skip-link" href="#main-content">
      Skip to main content
    </a>
  );
}

function ScrollHandler() {
  const location = useLocation();
  const reduce = useReducedMotion();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.slice(1);
      window.setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
      }, 80);
      return;
    }

    window.scrollTo({ top: 0, behavior: "instant" });
  }, [location.pathname, location.hash, reduce]);

  return null;
}

let hasNavigated = false;

function PageTransition({ children }) {
  const reduce = useReducedMotion();

  // With AnimatePresence mode="wait", this component mounts once the new page
  // exists — the right moment to move focus to the main landmark so keyboard
  // and screen-reader users don't lose their place. Skipped on initial load.
  useEffect(() => {
    if (!hasNavigated) {
      hasNavigated = true;
      return;
    }
    document.getElementById("main-content")?.focus({ preventScroll: true });
  }, []);

  return (
    <m.div
      initial={{ opacity: 0, y: reduce ? 0 : SECTION_MOTION.distance }}
      animate={{ opacity: 1, y: 0 }}
      exit={{
        opacity: 0,
        y: reduce ? 0 : -ELEMENT_MOTION.distance,
        transition: { duration: reduce ? 0.01 : 0.2, ease: EASE_OUT },
      }}
      transition={{ duration: reduce ? 0.01 : SECTION_MOTION.duration, ease: EASE_OUT }}
    >
      {children}
    </m.div>
  );
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  return (
    <m.div
      aria-hidden="true"
      className="fixed left-0 top-0 z-[80] h-1 w-full origin-left bg-[var(--accent)]"
      style={{ scaleX: scrollYProgress }}
    />
  );
}

function useActiveSection(ids, enabled) {
  const [active, setActive] = useState("");

  useEffect(() => {
    if (!enabled) return;

    const sections = ids.map((id) => document.getElementById(id)).filter(Boolean);
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-35% 0px -55% 0px" }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [ids, enabled]);

  return enabled ? active : "";
}

const SECTION_IDS = ["projects", "philosophy", "about", "contact"];

function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const activeSection = useActiveSection(SECTION_IDS, location.pathname === "/");

  useEffect(() => {
    if (!open) return;

    function onKeyDown(event) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b-2 border-[var(--ink)] bg-[var(--paper)]/92 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-8" aria-label="Main navigation">
        <Link to="/" className="group inline-flex items-center gap-2 font-semibold" onClick={() => setOpen(false)}>
          <span className="flex h-8 w-8 items-center justify-center border-2 border-[var(--ink)] bg-[var(--accent)] text-sm font-extrabold text-[var(--ink)] shadow-[3px_3px_0_var(--ink)]">
            A
          </span>
          <span>Arezoo Saeidisharifabad</span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const anchor = link.to.split("#")[1];
            const isActive = anchor === activeSection;
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`nav-pill ${isActive ? "is-active" : ""}`}
                aria-current={isActive ? "location" : undefined}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <a className="icon-link" href="mailto:arezoosaeidish@gmail.com" aria-label="Email Arezoo">
            <Mail size={18} />
          </a>
          <a
            className="button button-dark"
            href="https://www.linkedin.com/in/arezoo-saeidisharifabad-433b911a9/"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn <span className="sr-only">(opens in new tab)</span> <ExternalLink size={15} aria-hidden="true" />
          </a>
        </div>

        <button
          className="icon-link nav-toggle md:hidden"
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label="Toggle navigation"
        >
          {open ? <X size={19} /> : <Menu size={19} />}
        </button>
      </nav>

      {open && (
        <div id="mobile-nav" className="border-t-2 border-[var(--ink)] bg-[var(--paper)] px-4 py-4 md:hidden">
          <div className="grid gap-2">
            {navLinks.map((link) => (
              <Link key={link.to} to={link.to} className="mobile-nav-link" onClick={() => setOpen(false)}>
                {link.label}
              </Link>
            ))}
          </div>
          <div className="mt-4 flex gap-3 border-t-2 border-[var(--ink)] pt-4">
            <a className="button button-dark flex-1" href="mailto:arezoosaeidish@gmail.com">
              Email <Mail size={16} />
            </a>
            <a
              className="button button-light flex-1"
              href="https://www.linkedin.com/in/arezoo-saeidisharifabad-433b911a9/"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn <span className="sr-only">(opens in new tab)</span> <ExternalLink size={15} aria-hidden="true" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

function Home() {
  return (
    <>
      <Navbar />
      <main id="main-content" tabIndex={-1} className="bg-[var(--paper)] text-[var(--ink)] outline-none">
        <Hero />
        <RecruiterBar />
        <Projects />
        <Philosophy />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

function Hero() {
  const reduce = useReducedMotion();
  const strengths = ["Enterprise UX", "UX Writing", "Accessibility", "Research", "B2B Workflows"];

  return (
    <section className="section-grid min-h-[92vh] items-end pt-28 md:pt-36">
      <div className="col-span-full grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
        <div className="pb-8">
          <Reveal immediate>
            <p className="label">Product Designer / UX Designer, Germany</p>
          </Reveal>
          <m.h1
            className="mt-6 max-w-5xl text-[clamp(3rem,8vw,7rem)] font-extrabold uppercase leading-[0.92]"
            initial={{ opacity: 0, y: reduce ? 0 : SECTION_MOTION.distance }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduce ? 0.01 : SECTION_MOTION.duration, ease: EASE_OUT }}
          >
            I make complex B2B products clear.
          </m.h1>
          <Reveal delay={STAGGER} immediate>
            <p className="mt-7 max-w-2xl text-xl leading-8 text-[var(--muted)]">
              UX Writing at Bosch eBike Systems, trained in psychology. I specialize in
              enterprise UX, UX writing, and accessibility — the details that decide whether
              people trust a workflow.
            </p>
          </Reveal>
          <Reveal delay={STAGGER * 2} immediate className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <a className="button button-dark" href="#projects">
              View case studies <ArrowRight size={17} />
            </a>
            <a className="case-link py-2" href="mailto:arezoosaeidish@gmail.com">
              Contact me <Mail size={16} />
            </a>
          </Reveal>
        </div>

        <Reveal delay={STAGGER * 2} immediate className="relative">
          <div className="hero-panel">
            <img
              src="/profile.webp"
              alt="Portrait of Arezoo Saeidisharifabad"
              className="hero-image"
              width="960"
              height="1200"
              fetchPriority="high"
            />
            <div className="hero-note">
              <span>Availability</span>
              <strong>Open to Product Designer / UX roles in Germany</strong>
            </div>
          </div>
        </Reveal>
      </div>

      <Reveal delay={STAGGER * 3} immediate className="col-span-full pb-8">
        <ul className="ticker" aria-label="Core strengths">
          {strengths.map((word) => (
            <li key={word}>{word}</li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}

function RecruiterBar() {
  const items = [
    ["Experience", "4+ years across UX, UI, research, and writing"],
    ["Education", "M.Sc. HCI in progress, B.Sc. Psychology"],
    ["Strength", "B2B systems, content clarity, accessibility"],
    ["Availability", "Open to Product Designer / UX Designer roles in Germany"],
  ];

  return (
    <section className="border-y-2 border-[var(--ink)] bg-[var(--mist)]" aria-label="Profile at a glance">
      <dl className="mx-auto grid max-w-7xl gap-6 px-4 py-6 md:grid-cols-4 md:gap-8 md:px-8 md:py-8">
        {items.map(([title, text]) => (
          <div key={title}>
            <dt className="text-xs font-extrabold uppercase tracking-[0.14em] text-[var(--muted)]">{title}</dt>
            <dd className="mt-2 font-semibold leading-6">{text}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

function Projects() {
  return (
    <section id="projects" className="section-grid scroll-mt-24 py-20 md:py-28">
      <Reveal className="col-span-full max-w-4xl">
        <p className="label">Selected work</p>
        <h2 className="section-title">Enterprise UX, UX writing, and B2B product design.</h2>
        <p className="section-copy">
          An enterprise content system at Bosch eBike Systems, a reorder-first B2B app, and a dairy ordering workflow — each case study covers the problem, the decisions, and what changed.
        </p>
      </Reveal>

      <div className="col-span-full mt-12 grid gap-6">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </section>
  );
}

function ProjectCard({ project }) {
  const reduce = useReducedMotion();
  const facts = [
    ["Role", project.role],
    ["Industry", project.industry],
    ["Duration", project.duration],
  ].filter(([, value]) => value);

  return (
    <m.article
      initial={{ opacity: 0, y: reduce ? 0 : ELEMENT_MOTION.distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: reduce ? 0.01 : ELEMENT_MOTION.duration, ease: EASE_OUT }}
    >
      <Link
        to={project.href}
        aria-label={`${project.title} case study`}
        className={`project-card group ${project.featured ? "project-card-featured" : ""}`}
      >
        <div className="project-media">
          <img
            src={project.image}
            alt=""
            loading={project.featured ? "eager" : "lazy"}
            width="960"
            height="720"
            style={project.imagePosition ? { objectPosition: project.imagePosition } : undefined}
          />
        </div>
        <div className="project-body">
          <div>
            <p className="label">{project.eyebrow}</p>
            <h3>{project.title}</h3>
          </div>
          <dl className="project-facts">
            {facts.map(([term, value]) => (
              <div key={term}>
                <dt>{term}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
          {project.metrics?.length > 0 && (
            <ul className="project-metrics" aria-label="Impact">
              {project.metrics.map((metric) => (
                <li key={metric.label}>
                  <strong>{metric.value}</strong>
                  <span>{metric.label}</span>
                </li>
              ))}
            </ul>
          )}
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span className="tag" key={tag}>{tag}</span>
            ))}
          </div>
          <p className="project-problem">{project.problem}</p>
          <span className="case-link">
            Open case study <ArrowRight size={17} />
          </span>
        </div>
      </Link>
    </m.article>
  );
}

function Philosophy() {
  return (
    <section id="philosophy" className="section-grid scroll-mt-24 border-y-2 border-[var(--ink)] bg-[var(--ink)] py-20 text-[var(--paper)] md:py-28">
      <Reveal className="col-span-full max-w-4xl">
        <p className="label label-on-dark">Design philosophy</p>
        <h2 className="section-title">I make design decisions by connecting user evidence, product constraints, and implementation reality.</h2>
      </Reveal>
      <div className="col-span-full mt-12 grid gap-px bg-[var(--paper)]/25 md:grid-cols-3">
        {philosophy.map((item, index) => (
          <PhilosophyCard key={item.title} item={item} index={index} />
        ))}
      </div>
    </section>
  );
}

function PhilosophyCard({ item, index }) {
  const Icon = item.icon;

  return (
    <Reveal className="bg-[var(--ink)] p-7 md:p-8">
      <div className="mb-8 flex items-center justify-between">
        <span className="flex h-12 w-12 items-center justify-center border-2 border-[var(--paper)] bg-[var(--accent)] text-[var(--ink)] shadow-[4px_4px_0_var(--paper)]">
          <Icon size={22} />
        </span>
        <span className="text-5xl font-extrabold text-[var(--paper)]/20" aria-hidden="true">0{index + 1}</span>
      </div>
      <h3 className="text-2xl font-extrabold uppercase leading-7">{item.title}</h3>
      <p className="mt-4 leading-7 text-[var(--paper)]/72">{item.text}</p>
      {item.proof && <p className="philosophy-proof">{item.proof}</p>}
      {item.link && (
        <Link className="proof-link" to={item.link.to}>
          {item.link.label} <ArrowRight size={15} />
        </Link>
      )}
    </Reveal>
  );
}

function About() {
  return (
    <section id="about" className="section-grid scroll-mt-24 py-20 md:py-28">
      <Reveal className="col-span-full grid gap-10 lg:grid-cols-[0.72fr_1.28fr]">
        <div>
          <p className="label">About</p>
          <h2 className="section-title">I notice where products make people work too hard.</h2>
        </div>
        <div className="max-w-[65ch] space-y-6 text-lg leading-8 text-[var(--muted)]">
          <p>
            I studied psychology before UX, so I design for the moments where people hesitate — expectation, trust, and the small signals that tell a user whether a product understood them.
          </p>
          <p>
            Day to day at Bosch eBike Systems (alongside an M.Sc. in Human-Computer Interaction), that looks like practical collaboration: writing states and edge cases down before handoff, checking copy and design against implementation constraints, and treating engineers as design partners rather than a delivery step. I would rather adjust a design so it ships coherently than defend a mockup.
          </p>
          <p>
            I am drawn to B2B workflows — confirmation screens, ordering systems, error messages — because that is where a product proves it respects the user's time. My case studies share one habit: change direction when the evidence says so, and leave things alone when a rewrite would cost more than it clarifies.
          </p>
          <ul className="grid gap-3 sm:grid-cols-2" aria-label="Core skills">
            {["Research synthesis", "Interaction design", "UX writing", "Accessibility", "Figma prototypes", "Developer collaboration"].map((skill) => (
              <li className="skill-row" key={skill}><Check size={17} aria-hidden="true" /> {skill}</li>
            ))}
          </ul>
        </div>
      </Reveal>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="section-grid scroll-mt-24 pb-10 md:pb-16">
      <Reveal className="col-span-full">
        <div className="contact-band">
          <div>
            <p className="label label-on-dark">Contact</p>
            <h2>Tell me about your product.</h2>
            <p>
              I am open to Product Designer and UX Designer roles in Germany. One sentence about your team and the workflow your users struggle with is enough to start — I will come back with questions, not a portfolio dump.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 lg:justify-end">
            <a
              className="button button-light"
              href="mailto:arezoosaeidish@gmail.com?subject=Product%20Designer%20role%20%E2%80%94%20let%27s%20talk"
            >
              Start the conversation <Mail size={17} />
            </a>
            <a
              className="button button-outline-dark"
              href="https://www.linkedin.com/in/arezoo-saeidisharifabad-433b911a9/"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn <span className="sr-only">(opens in new tab)</span> <ExternalLink size={17} aria-hidden="true" />
            </a>
            <a
              className="button button-outline-dark"
              href="mailto:arezoosaeidish@gmail.com?subject=Resume%20request"
            >
              Request resume <FileText size={17} />
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function Footer() {
  return (
    <footer className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 pb-8 text-sm text-[var(--muted)] md:px-8">
      <span>Arezoo Saeidisharifabad — Product Designer / UX Designer, Germany</span>
      <a className="footer-link" href="mailto:arezoosaeidish@gmail.com">
        arezoosaeidish@gmail.com
      </a>
    </footer>
  );
}

function CaseStudy({ id }) {
  const study = caseStudies[id];
  const ids = Object.keys(caseStudies);
  const nextId = ids[(ids.indexOf(id) + 1) % ids.length];
  const nextProject = projects.find((project) => project.slug === nextId);
  const currentProject = projects.find((project) => project.slug === id);

  useEffect(() => {
    if (!study) return;
    const previous = document.title;
    document.title = `${currentProject?.title ?? study.title} | Arezoo Saeidisharifabad`;
    return () => {
      document.title = previous;
    };
  }, [study, currentProject]);

  useRouteMeta({
    title: study ? `${currentProject?.title ?? study.title} | Arezoo Saeidisharifabad` : "",
    description: study?.subtitle ?? "",
  });

  if (!study) return <Home />;

  return (
    <>
      <Navbar />
      <main id="main-content" tabIndex={-1} className="bg-[var(--paper)] text-[var(--ink)] outline-none">
        <article>
          <CaseHero study={study} />
          <CaseOutcome items={study.outcome} />
          <CaseNarrative items={study.narrative} />
          <CaseReflection text={study.reflection} />
        </article>
        <nav
          aria-label="Case study navigation"
          className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 pb-16 md:px-8"
        >
          <Link className="button button-light" to="/#projects">
            <ArrowLeft size={17} aria-hidden="true" /> All work
          </Link>
          {nextProject && (
            <Link className="button button-dark" to={`/projects/${nextId}`}>
              Next: {nextProject.title} <ArrowRight size={17} aria-hidden="true" />
            </Link>
          )}
        </nav>
      </main>
    </>
  );
}

function CaseHero({ study }) {
  return (
    <section className="section-grid pt-28 md:pt-36">
      <div className="col-span-full grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
        <Reveal className="pb-8">
          <p className="label">{study.label}</p>
          <h1 className="mt-6 max-w-5xl text-[clamp(2.8rem,7vw,6.2rem)] font-extrabold uppercase leading-[0.95]">
            {study.title}
          </h1>
          <p className="mt-7 max-w-3xl text-xl leading-8 text-[var(--muted)]">{study.subtitle}</p>
        </Reveal>
        <Reveal delay={STAGGER}>
          <div className="case-cover" aria-hidden="true">
            <img src={study.cover} alt="" width="960" height="720" />
          </div>
        </Reveal>
      </div>
      <Reveal className="col-span-full pb-8">
        <dl className="case-meta">
          {study.meta.map(([term, description]) => (
            <div key={term}>
              <dt>{term}</dt>
              <dd>{description}</dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </section>
  );
}

function CaseOutcome({ items }) {
  return (
    <section className="border-y-2 border-[var(--ink)] bg-[var(--accent)]">
      <h2 className="sr-only">Impact</h2>
      <div className="mx-auto grid max-w-7xl gap-px bg-[var(--ink)] md:grid-cols-3">
        {items.map((item) => {
          const isNumeric = /\d/.test(item.value);
          return (
            <Reveal key={item.label} className="bg-[var(--accent)] p-6 md:p-8">
              <p
                className={`flex min-h-[1.875rem] items-end font-extrabold leading-none md:min-h-[2.25rem] ${
                  isNumeric ? "text-3xl md:text-4xl" : "text-xl md:text-2xl"
                }`}
              >
                {item.value}
              </p>
              <p className="mt-2 text-xs font-extrabold uppercase tracking-[0.14em]">{item.label}</p>
              <p className="mt-3 text-sm font-semibold leading-6">{item.detail}</p>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

function CaseNarrative({ items }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28">
      <div className="grid gap-14">
        {items.map((item, index) => (
          <CaseChapter key={`${item.label}-${item.title}`} chapter={item} number={index + 1} />
        ))}
      </div>
    </section>
  );
}

function CaseChapter({ chapter, number }) {
  return (
    <Reveal>
      <section className="case-chapter">
        <div className="case-chapter-index">
          <span>0{number}</span>
          <p>{chapter.label}</p>
        </div>
        <div>
          <h2>{chapter.title}</h2>
          <div className="mt-6 max-w-[65ch] space-y-4 text-lg leading-8 text-[var(--muted)]">
            {chapter.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          {chapter.decisionMap && (
            <div className="decision-map">
              {chapter.decisionMap.map((row) => (
                <div className="decision-row" key={row.insight}>
                  <div className="decision-insight">
                    <span>Insight</span>
                    <p>{row.insight}</p>
                  </div>
                  <ArrowRight className="decision-arrow" size={18} aria-hidden="true" />
                  <div className="decision-choice">
                    <span>Decision</span>
                    <p>{row.decision}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
          {chapter.quote && <PullQuote>{chapter.quote}</PullQuote>}
          {chapter.artifact && <Artifact artifact={chapter.artifact} />}
          {chapter.artifactPair && <ArtifactPair items={chapter.artifactPair} />}
          {chapter.compare && <CompareGallery items={chapter.compare} />}
        </div>
      </section>
    </Reveal>
  );
}

function Artifact({ artifact }) {
  return (
    <ExpandableImage
      title={artifact.title}
      label={artifact.label}
      image={artifact.image}
      alt={artifact.alt}
      caption={artifact.caption}
    />
  );
}

function ArtifactPair({ items }) {
  return (
    <div className="mt-10 grid gap-5 md:grid-cols-2">
      {items.map((item) => (
        <ExpandableImage key={item.title} title={item.title} label="Flow" image={item.image} alt={item.alt} />
      ))}
    </div>
  );
}

function CompareGallery({ items }) {
  return (
    <div className="mt-10 grid gap-5">
      {items.map((item) => (
        <div className="comparison" key={item.title}>
          <h3>{item.title}</h3>
          <div className="grid gap-4 md:grid-cols-[1fr_auto_1fr] md:items-center">
            <ExpandableImage title={`${item.title} before`} label="Before" image={item.before} alt={`${item.title} before redesign`} compact />
            <ArrowRight className="hidden md:block" aria-hidden="true" />
            <ExpandableImage title={`${item.title} after`} label="After" image={item.after} alt={`${item.title} after redesign`} compact />
          </div>
        </div>
      ))}
    </div>
  );
}

function PullQuote({ children }) {
  return <blockquote className="pull-quote">{children}</blockquote>;
}

function ExpandableImage({ title, label, image, alt, caption, compact = false }) {
  const [open, setOpen] = useState(false);
  const titleId = useId();
  const triggerRef = useRef(null);
  const closeRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    requestAnimationFrame(() => closeRef.current?.focus());

    function onKeyDown(event) {
      if (event.key === "Escape") {
        setOpen(false);
        requestAnimationFrame(() => triggerRef.current?.focus());
      }
      if (event.key === "Tab") {
        // The close button is the dialog's only focusable control — keep focus on it.
        event.preventDefault();
        closeRef.current?.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <>
      <button
        ref={triggerRef}
        className={`artifact ${compact ? "artifact-compact" : ""}`}
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`Open ${title}`}
      >
        <span className="artifact-head">
          <strong>{title}</strong>
          <em>{label}</em>
        </span>
        <img src={image} alt={alt} loading="lazy" width="960" height="720" />
        {caption && <span className="artifact-caption">{caption}</span>}
        <span className="artifact-action">Click to expand</span>
      </button>

      {open &&
        createPortal(
          <div
            className="modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            onClick={() => {
              setOpen(false);
              requestAnimationFrame(() => triggerRef.current?.focus());
            }}
          >
            <button
              ref={closeRef}
              className="button button-light modal-close"
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                setOpen(false);
                requestAnimationFrame(() => triggerRef.current?.focus());
              }}
            >
              Close <X size={16} />
            </button>
            <div className="modal-image" onClick={(event) => event.stopPropagation()}>
              <h2 id={titleId}>{title}</h2>
              <img src={image} alt={alt} />
            </div>
          </div>,
          document.body
        )}
    </>
  );
}

function CaseReflection({ text }) {
  return (
    <section className="section-grid pb-16">
      <Reveal className="col-span-full">
        <div className="reflection">
          <p className="label">Reflection</p>
          <p className="reflection-text">{text}</p>
        </div>
      </Reveal>
    </section>
  );
}

function Reveal({ children, className = "", delay = 0, immediate = false }) {
  const reduce = useReducedMotion();
  const visible = { opacity: 1, y: 0 };

  return (
    <m.div
      className={className}
      initial={{ opacity: 0, y: reduce ? 0 : SECTION_MOTION.distance }}
      animate={immediate ? visible : undefined}
      whileInView={immediate ? undefined : visible}
      viewport={immediate ? undefined : VIEWPORT}
      transition={{
        duration: reduce ? 0.01 : SECTION_MOTION.duration,
        delay: reduce ? 0 : delay,
        ease: EASE_OUT,
      }}
    >
      {children}
    </m.div>
  );
}

export default App;
