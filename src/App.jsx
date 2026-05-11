import { Routes, Route, Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion, useScroll } from "framer-motion";
import { useEffect, useId, useRef, useState } from "react";
import { ArrowRight, Layers3, Mail, PenLine, Search } from "lucide-react";
import { createPortal } from "react-dom";

function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100000] focus:rounded-full focus:bg-[#191A19] focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#191A19]"
    >
      Skip to main content
    </a>
  );
}

function ScrollHandler() {
  const location = useLocation();
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const behavior = shouldReduceMotion ? "auto" : "smooth";

    if (location.hash) {
      setTimeout(() => {
        const element = document.getElementById(location.hash.replace("#", ""));

        if (element) {
          element.scrollIntoView({
            behavior,
            block: "start",
          });

          element.setAttribute("tabindex", "-1");
          element.focus({ preventScroll: true });
        }
      }, 300);
    } else {
      window.scrollTo({ top: 0, behavior: "instant" });

      requestAnimationFrame(() => {
        document.getElementById("main-content")?.focus({ preventScroll: true });
      });
    }
  }, [location.pathname, location.hash, shouldReduceMotion]);

  return null;
}

function App() {
  const location = useLocation();

  return (
    <>
      <SkipLink />
      <ScrollHandler />
      {location.pathname !== "/" && <ScrollProgress />}

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <PageTransition>
                <Home />
              </PageTransition>
            }
          />
          <Route
            path="/projects/ersis"
            element={
              <PageTransition>
                <ERSIS />
              </PageTransition>
            }
          />
          <Route
            path="/projects/chenaran"
            element={
              <PageTransition>
                <Chenaran />
              </PageTransition>
            }
          />
          <Route
            path="/projects/bosch"
            element={
              <PageTransition>
                <Bosch />
              </PageTransition>
            }
          />
          <Route
            path="/projects/case-study-four"
            element={
              <PageTransition>
                <Placeholder title="Coming Soon" />
              </PageTransition>
            }
          />
        </Routes>
      </AnimatePresence>
    </>
  );
}

function PageTransition({ children }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -24 }}
      transition={{ duration: shouldReduceMotion ? 0.01 : 0.4, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      aria-hidden="true"
      className="fixed left-0 top-0 z-[60] h-1 w-full origin-left bg-[#6353AC]"
      style={{ scaleX: scrollYProgress }}
    />
  );
}

function Navbar() {
  const location = useLocation();
  const shouldReduceMotion = useReducedMotion();

  const links = [
    { label: "Projects", to: "/#projects" },
    { label: "Approach", to: "/#approach" },
    { label: "About", to: "/#about" },
  ];

  const handleContactClick = (event) => {
    event.preventDefault();

    const contactSection = document.getElementById("contact");

    if (contactSection) {
      contactSection.scrollIntoView({
        behavior: shouldReduceMotion ? "auto" : "smooth",
        block: "start",
      });

      contactSection.setAttribute("tabindex", "-1");
      contactSection.focus({ preventScroll: true });
      window.history.pushState(null, "", "#contact");
    }
  };

  return (
    <nav
      aria-label="Main navigation"
      className="fixed left-1/2 top-4 z-50 w-[calc(100%-2rem)] max-w-5xl -translate-x-1/2 rounded-full border border-[#191A19]/10 bg-[#F6F2EE]/85 px-3 py-3 shadow-[0_18px_60px_rgba(25,26,25,0.12)] backdrop-blur-xl"
    >
      <div className="flex items-center justify-between gap-3">
        <Link
          to="/"
          aria-current={location.pathname === "/" && !location.hash ? "page" : undefined}
          className="rounded-full px-3 text-sm font-semibold tracking-tight text-[#191A19] outline-none transition focus-visible:ring-2 focus-visible:ring-[#6353AC] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F6F2EE]"
        >
          Arezoo's Portfolio
        </Link>

        <div className="flex items-center gap-1 text-sm text-[#656963]">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="group relative rounded-full px-3 py-2 outline-none transition hover:text-[#191A19] focus-visible:text-[#191A19] focus-visible:ring-2 focus-visible:ring-[#6353AC] md:px-4"
            >
              <span className="relative z-10">{link.label}</span>
              <span
                aria-hidden="true"
                className="absolute inset-x-3 bottom-1 h-px scale-x-0 bg-[#6353AC] transition-transform duration-300 group-hover:scale-x-100 group-focus-visible:scale-x-100"
              />
            </Link>
          ))}
        </div>

        <a
          href="#contact"
          onClick={handleContactClick}
          className="group inline-flex min-h-10 items-center gap-2 rounded-full bg-[#6353AC] px-4 py-2 text-sm font-semibold text-white shadow-sm outline-none transition hover:-translate-y-0.5 hover:bg-[#3C3267] focus-visible:ring-2 focus-visible:ring-[#6353AC] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F6F2EE] motion-reduce:hover:translate-y-0"
        >
          <Mail
            size={15}
            aria-hidden="true"
            className="shrink-0 text-white transition duration-300 group-hover:-rotate-6 motion-reduce:transition-none motion-reduce:group-hover:rotate-0"
          />
          <span className="inline-block text-white transition duration-300 group-hover:translate-x-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0">
            Contact
          </span>
        </a>
      </div>
    </nav>
  );
}

const projects = [
  {
    title: "Bosch eBike Systems",
    type: "UX Writing & Accessibility",
    description:
      "Writing clearer product communication to help eBike users understand system feedback faster.",
    link: "/projects/bosch",
    image: "/bosch/thumbnail.png",
    accent: "from-[#DFCAB9]/80 via-[#F4DCD7]/60 to-[#F6F2EE]",
    mockup: "writing",
  },
  {
    title: "Chenaran Dairy App",
    type: "B2B Ordering Dashboard",
    description:
      "Designing a smoother ordering experience for routine purchases, quantity selection, and order confirmation.",
    link: "/projects/chenaran",
    image: "/chenaran/chenaranthumbnail.png",
    accent: "from-[#F3D4A5]/70 via-[#EFEEF7] to-[#F6F2EE]",
    mockup: "phone",
  },
  {
    title: "ERSIS B2B App Redesign",
    type: "B2B Android Mobile App",
    description:
      "Redesigning a repeat-order experience around the habits, pressure, and pace of workshop owners.",
    link: "/projects/ersis",
    image: "/ersis/ErsisThumbnail.png",
    accent: "from-[#EFEEF7] via-[#EEE6DD] to-[#F6F2EE]",
    mockup: "dashboard",
  },
];

function Home() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="min-h-screen overflow-hidden bg-[#F6F2EE] text-[#191A19] outline-none"
    >
      <Navbar />

      <div className="relative">
        <div aria-hidden="true" className="pointer-events-none absolute left-[-10%] top-10 h-80 w-80 rounded-full bg-[#EFEEF7]/90 blur-3xl" />
        <div aria-hidden="true" className="pointer-events-none absolute right-[-8%] top-28 h-96 w-96 rounded-full bg-[#F3D4A5]/45 blur-3xl" />
        <div aria-hidden="true" className="pointer-events-none absolute left-[40%] top-[34rem] h-72 w-72 rounded-full bg-[#DFCAB9]/40 blur-3xl" />

        <section className="mx-auto max-w-6xl px-6 pb-14 pt-36 md:px-10 md:pb-20 md:pt-44">
          <div className="relative grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <motion.div
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: shouldReduceMotion ? 0.01 : 0.45 }}
              >
                <SectionLabel>UX Designer based in Germany</SectionLabel>
              </motion.div>

              <motion.h1
                className="mt-6 max-w-4xl text-5xl font-medium leading-[0.98] tracking-tight text-[#191A19] md:text-7xl"
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: shouldReduceMotion ? 0.01 : 0.6, delay: shouldReduceMotion ? 0 : 0.05 }}
              >
                Hi, I’m Arezoo. I design{" "}
                <em className="font-serif italic text-[#6353AC]">
                  clear and useful
                </em>{" "}
                digital products.
              </motion.h1>

              <motion.p
                className="mt-7 max-w-2xl text-lg leading-8 text-[#656963] md:text-xl"
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: shouldReduceMotion ? 0.01 : 0.55, delay: shouldReduceMotion ? 0 : 0.16 }}
              >
                I bring together UX research, interaction design, and clear product
                communication to make complex tasks feel easier for real people.
              </motion.p>

              <motion.div
                className="mt-9 flex flex-wrap items-center gap-4"
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: shouldReduceMotion ? 0.01 : 0.5, delay: shouldReduceMotion ? 0 : 0.28 }}
              >
                <Button href="#projects" variant="secondary">
                  View my work{" "}
                  <ArrowRight size={17} aria-hidden="true" className="transition group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0" />
                </Button>

                <Button href="#contact" variant="secondary">
                  Contact me
                </Button>
              </motion.div>

            
            </div>

            <motion.div
              className="relative mx-auto w-full max-w-md"
              initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.94, y: shouldReduceMotion ? 0 : 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: shouldReduceMotion ? 0.01 : 0.65, delay: shouldReduceMotion ? 0 : 0.18 }}
            >
              <div aria-hidden="true" className="absolute -inset-7 rounded-[3rem] bg-gradient-to-br from-[#6353AC]/25 via-[#F3D4A5]/45 to-[#EFEEF7]/90 blur-2xl" />

              <motion.div
                className="relative rounded-[2.5rem] border border-[#191A19]/10 bg-[#F6F2EE]/80 p-4 shadow-[0_28px_90px_rgba(25,26,25,0.16)] backdrop-blur"
                whileHover={shouldReduceMotion ? undefined : { y: -6, rotate: -0.5 }}
                transition={{ type: "spring", stiffness: 220, damping: 20 }}
              >
                <img
                  src="/profile.png"
                  alt="Arezoo Saeidisharifabad portrait"
                  className="aspect-[4/5] w-full rounded-[2rem] object-cover"
                />
              </motion.div>
            </motion.div>
          </div>
        </section>
        <Reveal className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-4 px-6 pb-16 md:grid-cols-4 md:px-10">
         {[
           ["HCI", "MSc in progress"],
           ["Psychology", "BSc background"],
           ["4+", "years in UX"],
           ["A11y", "Accessibility-minded design"],
         ].map(([value, label]) => (
         <StatCard key={label} value={value} label={label} />
         ))}
        </Reveal>

      

        <section
          id="projects"
          className="relative scroll-mt-28 rounded-t-[3rem] bg-[#F6F2EE] px-6 py-20 shadow-[0_-24px_80px_rgba(25,26,25,0.06)] outline-none md:px-10 md:py-28"
        >
          <div aria-hidden="true" className="pointer-events-none absolute right-10 top-10 h-60 w-60 rounded-full bg-[#E0DDEE]/80 blur-3xl" />

          <div className="mx-auto max-w-6xl">
            <Reveal className="mb-12 max-w-3xl">
              <SectionLabel>Selected work</SectionLabel>

              <h2 className="mt-5 text-4xl font-medium leading-tight text-[#191A19] md:text-6xl">
                A few projects where research, structure, and content shaped the experience.
              </h2>

              <p className="mt-5 text-lg leading-8 text-[#656963]">
                From B2B ordering tools to UX writing for eBike systems, these case studies
                show how I think through problems, flows, and details.
              </p>
            </Reveal>

            <div className="grid gap-7 lg:grid-cols-2">
              {projects.map((project, i) => (
                <ProjectCard key={project.title} {...project} index={i} />
              ))}
            </div>
          </div>
        </section>

        <section id="approach" className="relative scroll-mt-28 px-6 py-20 outline-none md:px-10 md:py-28">
          <div className="mx-auto max-w-6xl">
            <Reveal className="mb-10 max-w-3xl">
              <SectionLabel>How I work</SectionLabel>

              <h2 className="mt-5 text-4xl font-medium leading-tight text-[#191A19] md:text-6xl">
                Understand the problem, structure the flow, refine the details.
              </h2>
            </Reveal>

            <div className="grid gap-5 md:grid-cols-3">
              {[
                {
                  icon: Search,
                  title: "Understand",
                  text: "I start by learning who the users are, what they need, and where the current experience gets in their way.",
                },
                {
                  icon: Layers3,
                  title: "Structure",
                  text: "I turn research insights into user flows, wireframes, and content decisions that make the product easier to follow.",
                },
                {
                  icon: PenLine,
                  title: "Refine",
                  text: "I test, adjust, and polish the interface so the final experience feels clear, useful, and consistent.",
                },
              ].map((item, index) => (
                <ApproachCard key={item.title} {...item} index={index} />
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="scroll-mt-28 px-6 py-20 outline-none md:px-10 md:py-28">
          <Reveal className="mx-auto grid max-w-6xl gap-10 rounded-[3rem] border border-[#191A19]/10 bg-[#F6F2EE]/85 p-8 shadow-[0_24px_80px_rgba(25,26,25,0.08)] backdrop-blur md:grid-cols-[0.8fr_1.2fr] md:items-start md:p-12">
            <div>
              <SectionLabel>About me</SectionLabel>

              <h2 className="mt-4 text-4xl font-medium text-[#191A19] md:text-5xl">
                I design with curiosity, structure, and attention to people.
              </h2>
            </div>

            <div className="space-y-5 text-lg leading-8 text-[#656963]">
              <p>
                My background in Psychology and Human-Computer Interaction helps me
                look closely at how people think, decide, and move through digital products.
              </p>

              <p>
                I’ve worked on B2B applications, mobile ordering flows, UX writing,
                accessibility, and design system foundations. I care about making interfaces
                that feel understandable, practical, and easy to trust.
              </p>
            </div>
          </Reveal>
        </section>

        <section id="contact" className="scroll-mt-28 px-6 pb-10 outline-none md:px-10 md:pb-16">
          <Reveal className="relative mx-auto max-w-6xl overflow-hidden rounded-[3rem] bg-[#191A19] p-8 text-[#F6F2EE] shadow-[0_30px_100px_rgba(25,26,25,0.24)] md:p-16">
            <div aria-hidden="true" className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#6353AC]/60 blur-3xl" />
            <div aria-hidden="true" className="absolute bottom-[-7rem] left-10 h-72 w-72 rounded-full bg-[#F3D4A5]/35 blur-3xl" />

            <div className="relative max-w-3xl">
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#F3D4A5]">
                Contact
              </p>

              <h2 className="mt-5 text-4xl font-medium leading-tight text-[#F6F2EE] md:text-6xl">
                Want to contact me?
              </h2>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-[#F6F2EE]/75">
                Here are the links.
              </p>

              <div className="mt-9 flex flex-wrap gap-4">
                <Button href="mailto:arezoosaeidish@gmail.com" variant="contactOutline">
                  Email me{" "}
                  <ArrowRight size={17} aria-hidden="true" className="transition group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0" />
                </Button>

                <Button
                  href="https://www.linkedin.com/in/arezoo-saeidisharifabad-433b911a9/"
                  variant="contactOutline"
                  ariaLabel="Open Arezoo’s LinkedIn profile in a new tab"
                >
                  LinkedIn
                </Button>
              </div>
            </div>
          </Reveal>
        </section>

        <footer className="mx-auto flex max-w-6xl justify-between px-6 pb-8 text-sm text-[#656963] md:px-10">
          <span>Arezoo Saeidisharifabad</span>
          <span>UX Designer · Germany</span>
        </footer>
      </div>
    </main>
  );
}

function SectionLabel({ children }) {
  return (
    <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.24em] text-[#6353AC]">
      <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[#6353AC]" />
      {children}
    </p>
  );
}

function Button({ href, variant = "primary", children, ariaLabel }) {
  const isExternal = href?.startsWith("http");

  const classes = {
    primary:
      "bg-[#6353AC] !text-[#F6F2EE] shadow-[0_14px_30px_rgba(99,83,172,0.25)] hover:bg-[#3C3267] hover:!text-[#F6F2EE] focus-visible:ring-[#6353AC] focus-visible:ring-offset-[#F6F2EE]",

    secondary:
      "border border-[#191A19]/20 bg-[#F6F2EE] !text-[#191A19] shadow-sm hover:border-[#6353AC] hover:bg-[#EFEEF7] hover:!text-[#191A19] focus-visible:ring-[#6353AC] focus-visible:ring-offset-[#F6F2EE]",

    contactLight:
      "bg-[#F6F2EE] !text-[#191A19] shadow-sm hover:bg-[#F3D4A5] hover:!text-[#191A19] focus-visible:ring-[#F3D4A5] focus-visible:ring-offset-[#191A19]",

    contactOutline:
      "border border-[#F6F2EE]/45 bg-transparent !text-[#F6F2EE] hover:bg-[#F6F2EE] hover:!text-[#191A19] focus-visible:ring-[#F3D4A5] focus-visible:ring-offset-[#191A19]",
  };

  return (
    <a
      href={href}
      aria-label={ariaLabel}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noreferrer" : undefined}
      className={`group inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold no-underline outline-none transition hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-offset-2 motion-reduce:hover:translate-y-0 ${classes[variant]}`}
    >
      <span className="inline-flex items-center gap-2 !text-current [&_svg]:text-current">
        {children}
      </span>
    </a>
  );
}

function Reveal({ children, className = "" }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: shouldReduceMotion ? 0.01 : 0.6 }}
    >
      {children}
    </motion.div>
  );
}

function StatCard({ value, label }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className="w-full rounded-[2rem] border border-[#191A19]/10 bg-[#F6F2EE]/90 p-5 shadow-sm backdrop-blur"
      whileHover={shouldReduceMotion ? undefined : { y: -5 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
    >
      <p className="text-3xl font-semibold text-[#6353AC]">{value}</p>
      <p className="mt-1 text-sm text-[#656963]">{label}</p>
    </motion.div>
  );
}

function ProjectCard({ title, type, description, link, image, accent, mockup, index }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: shouldReduceMotion ? 0 : index * 0.09, duration: shouldReduceMotion ? 0.01 : 0.55 }}
      viewport={{ once: true, margin: "-80px" }}
      whileHover={shouldReduceMotion ? undefined : { y: -8, scale: 1.01 }}
      className="h-full"
    >
      <Link
        to={link}
        className="group grid h-full overflow-hidden rounded-[2rem] border border-[#191A19]/10 bg-[#EEE6DD] p-4 shadow-[0_20px_70px_rgba(25,26,25,0.08)] outline-none transition focus-visible:ring-2 focus-visible:ring-[#6353AC] focus-visible:ring-offset-4 focus-visible:ring-offset-[#F6F2EE] md:grid-cols-[0.95fr_1.05fr]"
      >
        <div className={`relative min-h-72 overflow-hidden rounded-[1.6rem] bg-gradient-to-br ${accent} p-5`}>
          <div aria-hidden="true" className="absolute -right-12 -top-10 h-44 w-44 rounded-full bg-white/50 blur-2xl transition group-hover:scale-125 motion-reduce:transition-none motion-reduce:group-hover:scale-100" />
          <ProjectMockup image={image} title={title} type={mockup} />
        </div>

        <div className="flex min-h-72 flex-col justify-between p-4 md:p-6">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#6353AC]">
              {type}
            </p>

            <h3 className="mt-4 text-3xl font-medium leading-tight text-[#191A19]">
              {title}
            </h3>

            <p className="mt-4 text-base leading-7 !text-[#191A19]">
              {description}
            </p>
          </div>

          <span className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-[#191A19]">
            View case study
            <ArrowRight size={17} aria-hidden="true" className="transition duration-300 group-hover:translate-x-2 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0" />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}

function ProjectMockup({ image, title, type }) {
  return (
    <div className="relative flex h-full min-h-60 items-center justify-center">
      {image ? (
        <img
          src={image}
          alt={`${title} project thumbnail`}
          className="relative z-10 h-full max-h-64 w-full rounded-[1.25rem] object-cover shadow-2xl transition duration-500 group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
        />
      ) : type === "phone" ? (
        <div aria-hidden="true" className="relative z-10 h-56 w-32 rounded-[2rem] border-8 border-[#191A19] bg-[#F6F2EE] p-3 shadow-2xl">
          <div className="mb-4 h-2 rounded-full bg-[#191A19]/15" />

          <div className="space-y-2">
            <div className="h-10 rounded-xl bg-[#6353AC]/20" />
            <div className="h-7 rounded-xl bg-[#F3D4A5]/75" />
            <div className="h-7 rounded-xl bg-[#DFCAB9]" />
            <div className="h-16 rounded-xl bg-[#191A19]/10" />
          </div>
        </div>
      ) : type === "writing" ? (
        <div aria-hidden="true" className="relative z-10 w-full max-w-xs rounded-[1.4rem] bg-[#F6F2EE] p-5 shadow-2xl">
          <div className="mb-5 flex gap-2">
            <span className="h-3 w-3 rounded-full bg-[#6353AC]" />
            <span className="h-3 w-3 rounded-full bg-[#F3D4A5]" />
            <span className="h-3 w-3 rounded-full bg-[#AF7B50]" />
          </div>

          <div className="space-y-3">
            <div className="h-3 w-4/5 rounded-full bg-[#191A19]/15" />
            <div className="h-3 w-full rounded-full bg-[#191A19]/10" />
            <div className="h-3 w-2/3 rounded-full bg-[#191A19]/10" />
            <div className="rounded-2xl bg-[#6353AC]/10 p-4 text-xs text-[#6353AC]">
              Clear system feedback
            </div>
          </div>
        </div>
      ) : (
        <div aria-hidden="true" className="relative z-10 w-full max-w-sm rounded-[1.4rem] bg-[#F6F2EE] p-5 shadow-2xl">
          <div className="mb-4 h-4 w-28 rounded-full bg-[#191A19]/15" />

          <div className="grid grid-cols-3 gap-3">
            <div className="col-span-2 h-24 rounded-2xl bg-[#6353AC]/20" />
            <div className="h-24 rounded-2xl bg-[#F3D4A5]/75" />
            <div className="h-16 rounded-2xl bg-[#DFCAB9]" />
            <div className="col-span-2 h-16 rounded-2xl bg-[#191A19]/10" />
          </div>
        </div>
      )}
    </div>
  );
}

function ApproachCard({ icon: Icon, title, text, index }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.article
      className="group rounded-[2rem] border border-[#191A19]/10 bg-[#F6F2EE]/90 p-7 shadow-sm backdrop-blur transition hover:shadow-[0_24px_70px_rgba(25,26,25,0.1)] motion-reduce:transition-none"
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay: shouldReduceMotion ? 0 : index * 0.08, duration: shouldReduceMotion ? 0.01 : 0.55 }}
      whileHover={shouldReduceMotion ? undefined : { y: -7 }}
    >
      <div className="mb-8 flex items-center justify-between">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#E0DDEE] text-[#6353AC] transition group-hover:bg-[#6353AC] group-hover:text-white motion-reduce:transition-none">
          <Icon size={22} aria-hidden="true" />
        </span>

        <span aria-hidden="true" className="font-serif text-4xl italic text-[#AF7B50]">
          0{index + 1}
        </span>
      </div>

      <h3 className="text-2xl font-medium text-[#191A19]">{title}</h3>
      <p className="mt-3 leading-7 text-[#656963]">{text}</p>
    </motion.article>
  );
}

/* =========================
   ERSIS CASE STUDY
========================= */

function ERSIS() {
  return (
    <main id="main-content" tabIndex={-1} className="min-h-screen bg-base text-text outline-none">
      <Navbar />

      <div className="mx-auto max-w-6xl px-6 py-20 md:px-24">
        <section className="relative py-24 md:py-28">
          <p className="mb-6 text-sm uppercase tracking-[0.25em] text-muted">
            UX Case Study / B2B App / Android
          </p>

          <h1 className="max-w-4xl text-5xl font-medium leading-tight md:text-7xl">
            Turning an underused ordering app into{" "}
            <em className="font-serif italic text-primary">
              a faster reorder tool
            </em>
          </h1>

          <p className="mt-8 max-w-2xl text-xl leading-9 text-muted">
            ERSIS already had a mobile app for workshop owners. The problem was
            not that customers disliked digital ordering — the app simply did
            not match how ordering happened in a busy workshop.
          </p>

          <div className="mt-8 flex flex-wrap gap-2">
            <Chip>UX Research</Chip>
            <Chip>UX Design</Chip>
            <Chip>Usability Testing</Chip>
            <Chip>B2B App</Chip>
            <Chip>Android</Chip>
            <Chip>Junior UX Designer</Chip>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            <div className="rounded-3xl border border-line bg-surface p-6">
              <h3 className="mb-2 text-sm font-medium uppercase tracking-[0.2em] text-muted">
                My role
              </h3>
              <p className="text-muted">
                Junior UX Designer working on research synthesis, UX audit,
                wireframes, flows, and prototype iterations.
              </p>
            </div>

            <div className="rounded-3xl border border-line bg-surface p-6">
              <h3 className="mb-2 text-sm font-medium uppercase tracking-[0.2em] text-muted">
                Team
              </h3>
              <p className="text-muted">
                Collaborated with product, sales, and development stakeholders.
              </p>
            </div>

            <div className="rounded-3xl border border-line bg-surface p-6">
              <h3 className="mb-2 text-sm font-medium uppercase tracking-[0.2em] text-muted">
                Focus
              </h3>
              <p className="text-muted">
                Reducing friction in repeat ordering for B2B workshop customers.
              </p>
            </div>
          </div>

          <Artifact title="Prototype preview" label="Final flow">
            <img src="/ersis/ERSIS-GIF.gif" alt="Prototype preview of the redesigned ERSIS reorder flow" />
          </Artifact>
        </section>

        <CaseSection title="The app existed. The habit did not.">
          <p>
            When I joined ERSIS as a junior UX designer, the company already had
            a mobile app for B2B customers to order automotive products.
          </p>

          <p>
            My first instinct was to look at navigation: unclear categories,
            weak search, missing filters. But the more we looked at how orders
            actually happened, the more the problem started to look different.
          </p>

          <p>
            At first, it looked like a navigation problem. Maybe the categories
            were unclear. Maybe search needed improvement. Maybe users needed
            better filters.
          </p>

          <Artifact title="Existing app screens" label="Before">
            <img src="/ersis/ErsisOldScreens.png" alt="Old ERSIS app screens showing the previous ordering experience" />
          </Artifact>
        </CaseSection>

        <CaseSection title="What changed after visiting workshops">
          <p>
            The turning point was seeing where the app was supposed to be used.
            Workshops were not quiet office environments. People were moving
            between repairs, customers, tools, invoices, and inventory checks.
          </p>
          <p>
            After speaking with 15 workshop owners and B2B partners, one pattern kept
            repeating: ordering was not a separate task. It was squeezed between other
            tasks.
          </p>

          <div className="my-10 rounded-3xl border-l-4 border-primary bg-surface p-8 text-2xl font-serif italic shadow-sm">
            “If it takes too long, I just call my sales rep.”
          </div>

          <p>
            That sentence helped reframe the project. The app was not only
            competing with other digital tools. It was competing with a simple
            habit: calling someone who already knew what they usually ordered.
          </p>

          <Artifact title="Research synthesis" label="Interviews + Empathy Map">
            <img src="/ersis/ErsisResearch.png" alt="ERSIS research synthesis board showing workshop ordering pain points and user behavior patterns" />
            <p className="mt-4 text-sm leading-6 text-muted">
              I grouped interview notes into what users said, did, thought, and felt.
              The strongest pattern was that ordering often happened under pressure,
              while users were already interrupted by repair work or customers.
            </p>
          </Artifact>
        </CaseSection>

        <CaseSection title="The real pattern">
          <div className="my-10 rounded-3xl bg-primary/10 p-8 text-3xl font-serif italic text-primary">
            Mechanics were not browsing. They were reordering.
          </div>

          <p>
            Most users ordered the same products repeatedly: familiar brands,
            known quantities, and items they already trusted. The existing app
            treated every order like a new shopping journey.
          </p>

          <p>
            For this context, that was too slow. Users did not need more ways to
            discover products. They needed fewer steps to repeat what they
            already knew.
          </p>

          <Artifact title="Old app analysis" label="UX audit">
            <img src="/ersis/ErsisAudit.png" alt="ERSIS UX audit showing issues in navigation, search, filters, and repeat ordering" />
          </Artifact>
        </CaseSection>

        <CaseSection title="Reframing the design problem">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-3xl border border-line bg-surface p-6">
              <h3 className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-muted">
                Initial assumption
              </h3>
              <p className="text-muted">
                How might we make the catalog easier to browse?
              </p>
            </div>

            <div className="rounded-3xl border border-primary/20 bg-primary/10 p-6">
              <h3 className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-primary">
                After research
              </h3>
              <p className="text-text">
                How might we help workshop owners reorder familiar products in
                seconds?
              </p>
            </div>
          </div>

          <Artifact title="Assumption to insight" label="Problem framing">
            <img src="/ersis/ErsisHMW.png" alt="How Might We map reframing the ERSIS problem from catalog browsing to faster reordering" />
          </Artifact>
        </CaseSection>

        <CaseSection title="Design direction">
          <p>
            Instead of making the app feel bigger, the redesign focused on
            making the repeat-order task shorter. The goal was to bring familiar
            products closer to the start of the journey.
          </p>

          <div className="grid gap-4 md:grid-cols-2">
            <Learning n="01" text="Make recent orders visible from the home screen." />
            <Learning n="02" text="Support frequent products instead of forcing users through categories." />
            <Learning n="03" text="Make quantity changes easier and safer during quick ordering." />
            <Learning n="04" text="Keep checkout focused on confirmation, not extra decisions." />
          </div>

          <Artifact title="Early wireframes" label="Exploration">
            <img src="/ersis/ersiswireframes.png" alt="ERSIS early wireframes exploring reorder-first home screen and checkout flow" className="rounded-2xl border border-line" />
          </Artifact>
        </CaseSection>

        <CaseSection title="What changed in the flow">
          <p>
            The old flow started with browsing. The new flow started with
            recognition: recent orders, frequent items, and faster access to
            products the user already knew.
          </p>

          <p>
            The catalog still stayed available, but it was no longer treated as
            the main path for repeat customers.
          </p>

          <Artifact title="Old flow" label="Before">
            <img src="/ersis/ErsisOldFlow.png" alt="Old ERSIS ordering flow starting from catalog browsing" className="rounded-2xl border border-line" />
          </Artifact>

          <Artifact title="New flow" label="After">
            <img src="/ersis/ErsisNewFlow.png" alt="New ERSIS ordering flow starting from recent orders and frequent products" className="rounded-2xl border border-line" />
          </Artifact>
        </CaseSection>

        <CaseSection title="Key interface decisions">
          <div className="grid gap-4 md:grid-cols-2">
            <Learning n="01" text="Home screen changed from promotion-first to reorder-first." />
            <Learning n="02" text="Recent orders included product image, last ordered date, price, and Add Again." />
            <Learning n="03" text="Product detail pages gave quantity controls more visual weight." />
            <Learning n="04" text="Checkout became a review screen instead of another browsing step." />
          </div>
        </CaseSection>

        <CaseSection title="Working within real constraints">
          <p>
            This was not a full product rebuild. The catalog structure still had
            to stay intact, the solution had to work on older Android devices,
            and the redesign needed to feel familiar enough for existing users.
          </p>

          <p>
            That constraint helped the project. It pushed the solution toward
            small, practical changes instead of a completely new experience that
            users would have to relearn.
          </p>
        </CaseSection>

        <CaseSection title="Validation">
          <p>
            We tested the updated flow with users and internal stakeholders. The
            most useful feedback was not about the visual style. It was about
            speed and confidence.
          </p>

          <div className="my-10 rounded-3xl border-l-4 border-primary bg-surface p-8 text-2xl font-serif italic shadow-sm">
            “This is faster than calling now.”
          </div>

          <p>
            That did not mean the app replaced every phone order. But it showed
            that for familiar products, the app could finally compete with the
            existing habit.
          </p>
        </CaseSection>

        <CaseSection title="Outcome">
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
            <Stat number="~27%" label="Orders placed through app before" />
            <Stat number="~32%" label="Orders placed through app after" />
            <Stat number="↑" label="Repeat orders" />
            <Stat number="↓" label="Phone dependency" />
          </div>

          <p className="mt-8 text-muted">
            The increase was modest, and it was influenced by more than design alone.
            But the redesign gave the team a clearer product direction: instead of
            treating the app like a catalog, we started treating it as a repeat-order
            tool for busy workshop users.
          </p>
        </CaseSection>

        <CaseSection title="What I learned">
          <div className="grid gap-4 md:grid-cols-2">
            <Learning n="01" text="Low adoption does not always mean users reject the product." />
            <Learning n="02" text="In B2B tools, speed and habit can matter more than exploration." />
            <Learning n="03" text="Field context reveals problems that screen reviews cannot." />
            <Learning n="04" text="A useful redesign can be quiet: fewer steps, less friction, better fit." />
          </div>
        </CaseSection>

        <ReflectionCard
          title="The best feature was not a new feature"
          text="It was making the app behave more like the way workshop owners already worked."
        />

        <div className="mt-10">
          <BackHome />
        </div>
      </div>
    </main>
  );
}

/* =========================
   CHENARAN CASE STUDY
========================= */

function Chenaran() {
  return (
    <main id="main-content" tabIndex={-1} className="min-h-screen bg-base text-text outline-none">
      <Navbar />

      <div className="mx-auto max-w-6xl px-6 py-24 md:px-28">
        <CaseHero
          label="UX Case Study"
          title={
            <>
              Making a B2B ordering system{" "}
              <em className="font-serif italic text-primary">
                usable in real conditions
              </em>
            </>
          }
          subtitle="At Chenaran Dairy, users could place orders — but small moments of confusion made them double-check through calls and messages."
          chips={[
            "Junior UI/UX Designer",
            "B2B Web System",
            "Dairy Distribution",
            "~1.5 Years",
            "Mashhad, Iran",
          ]}
        />

        <CaseStep number="1" label="Context" title="A system that worked — but wasn’t trusted">
          <p>
            Chenaran is a dairy producer supplying cheese products to restaurants and
            distributors across Iran.
          </p>
          <p>
            The company had already digitized part of its ordering process. Users could
            browse products, enter quantities, and submit orders through a web system.
          </p>
          <p>
            But even though the system was functional, orders often didn’t end there.
            Many customers still followed up with calls or messages to confirm what
            they had submitted.
          </p>

          <Quote>
            Sometimes I place the order, but then I call just to make sure I did it right.
          </Quote>

          <Artifact title="Original system" label="Before redesign">
            <img src="/chenaran/oldgif.gif" alt="Old Chenaran ordering flow showing product selection and order submission" />
            <p>
              The flow allowed users to complete orders — but didn’t clearly support
              decision-making or confirmation along the way.
            </p>
          </Artifact>
        </CaseStep>

        <CaseStep number="2" label="My Role" title="Improving clarity within an existing system">
          <p>
            As a junior UI/UX designer, I worked on improving the ordering flow without
            changing the system’s core functionality. I created wireframes, redesigned key screens in Figma, prepared interactive prototypes, and worked with developers to keep the redesign aligned with the existing system structure.
          </p>
          <p>
            My focus was on identifying where users hesitated or second-guessed their
            actions, and redesigning key parts of the flow — especially product
            selection, quantity input, and confirmation.
          </p>
          <p>
            I collaborated with the product owner and developers to iterate on
            wireframes and refine the interaction patterns across the flow.
          </p>
        </CaseStep>

        <CaseStep number="3" label="The Problem" title="Orders were completed — but not with confidence">
          <p>
            I reviewed the flow with internal stakeholders and gathered feedback from users familiar with the ordering process. Users were not getting stuck. They were completing orders — but often left
            the system unsure whether they had done it correctly.
          </p>
          <p>
            This uncertainty led to follow-up calls, manual checks, and repeated
            clarification.
          </p>

          <ul className="list-disc space-y-2 pl-6 text-muted">
            <li>Products were listed in ways that didn’t match ordering habits</li>
            <li>Quantity inputs lacked guidance and context</li>
            <li>The flow didn’t clearly show progress or next steps</li>
            <li>Confirmation screens didn’t fully reassure users</li>
          </ul>

          <Quote>
            I’m not sure if I ordered the right amount… I usually check again.
          </Quote>

          <Callout>
            The issue wasn’t task failure — it was lack of confidence after completion.
          </Callout>

          <Artifact title="Where confusion happened" label="Ordering flow breakdown">
            <img src="/chenaran/confusionmap.png" alt="Chenaran ordering flow breakdown showing where users became uncertain and needed external confirmation" />
            <p>
              The system allowed completion — but pushed verification outside the system.
            </p>
          </Artifact>
        </CaseStep>

        <CaseStep number="4" label="Design Approach" title="Reducing the need to double-check">
          <p>
            Instead of adding new features, I focused on making the existing flow easier
            to understand at each step — so users didn’t have to rely on memory,
            assumptions, or external confirmation.
          </p>

          <div className="mt-8 space-y-3">
            <FocusItem
              number="1"
              title="Product selection — from SKU list to decision support"
              text="I reorganized products into clearer groupings so users could find and select items based on how they actually order, not how the database was structured."
            />
            <FocusItem
              number="2"
              title="Quantities — adding clarity before submission"
              text="I introduced clearer unit and packaging context, helping users understand what they were entering instead of guessing."
            />
            <FocusItem
              number="3"
              title="Flow — making progress visible"
              text="I structured the steps so users always knew where they were and what would happen next."
            />
            <FocusItem
              number="4"
              title="Confirmation — closing the loop"
              text="I redesigned the confirmation state to clearly show what was ordered and what would happen after submission."
            />
          </div>

          <Artifact title="Final flow prototype" label="Interaction preview">
            <img
              src="/chenaran/newgif.gif"
              alt="Final Chenaran ordering flow prototype showing product selection, delivery details, review, and confirmation"
            />
            <p>
              The final flow helped users select products, confirm delivery
              details, review the order, and understand what happens after
              submission.
            </p>
          </Artifact>

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            <CompareBox
              type="old"
              title="Before"
              items={[
                "Products presented as flat SKU tables",
                "Quantity inputs required interpretation",
                "Steps felt disconnected",
                "Users relied on external confirmation",
              ]}
            />

            <CompareBox
              type="new"
              title="After"
              items={[
                "Products organized around how customers typically selected items",
                "Quantity selection became clearer and more guided",
                "Flow showed clear progression",
                "Confirmation reduced the need for follow-ups",
              ]}
            />
          </div>

          <BeforeAfterGallery
            title="Before / After"
            label="Ordering flow comparison"
            items={[
              {
                title: "Product selection",
                before: "/chenaran/old-orders.png",
                after: "/chenaran/new-selection.png",
                caption: "From a dense SKU table with unclear item hierarchy to a guided product selection flow with search, product categories, stock status, quantity controls, and a live order summary.",
              },
              {
                title: "Order details",
                before: "/chenaran/old-selection.png",
                after: "/chenaran/new-details.png",
                caption: "From quantity inputs mixed with disconnected logistics hints to a structured checkout step that separates delivery details, saved business information, payment method, notes, and order summary.",
              },
              {
                title: "Confirmation",
                before: "/chenaran/old-confirmation.png",
                after: "/chenaran/new-confirmation.png",
                caption: "From a basic success message with scattered order information to a clear confirmation screen showing order status, itemized summary, delivery/payment details, next steps, and follow-up actions.",
              },
            ]}
          />
        </CaseStep>

        <CaseStep number="5" label="Impact" title="Reducing repeated friction in everyday use">
          <p>
            The changes did not introduce new capabilities, but improved how confidently
            users could complete existing tasks.
          </p>
          <p>
            Because this project did not include a formal post-launch analytics study, I treated impact as observed qualitative feedback from internal testing and stakeholder review. The redesigned flow appeared to reduce hesitation during quantity selection and made the confirmation step clearer.
          </p>

          <Artifact title="Observed qualitative changes" label="Observed changes">
            <div className="grid gap-4 md:grid-cols-3">
              <Stat number="↓" label="Hesitation" description="Users paused less during quantity selection" />
              <Stat number="↓" label="Follow-ups" description="Fewer calls/messages after submission" />
              <Stat number="↑" label="Confidence" description="Clearer understanding of what was submitted" />
            </div>
          </Artifact>
        </CaseStep>

        <CaseStep number="6" label="Learnings" title="What I took away">
          <div className="grid gap-4 md:grid-cols-3">
            <Learning n="01" text="Users do not always get stuck — sometimes they continue with uncertainty." />
            <Learning n="02" text="Small ambiguities create repeated support work in real systems." />
            <Learning n="03" text="I learned that good UX reduces how much teams need to explain the system." />
          </div>
        </CaseStep>

        <ReflectionCard
          title="Designing for clarity in real-world systems"
          text="This project showed me that improving a system is not always about adding new features. Often, the most valuable work is making existing flows clearer — so users don’t need to double-check, ask, or second-guess what they’ve already done."
        />

        <div className="mt-10">
          <BackHome />
        </div>
      </div>
    </main>
  );
}

/* =========================
   BOSCH CASE STUDY
========================= */

function Bosch() {
  return (
    <main id="main-content" tabIndex={-1} className="min-h-screen bg-base text-text outline-none">
      <Navbar />

      <div className="mx-auto max-w-6xl px-6 py-20 md:px-10">
        <CaseHero
          label="UX Writing Case Study"
          title={<>From Product Copy to UX Writing Systems</>}
          subtitle="A 2-year working student journey at Bosch eBike Systems — from supporting daily product copy requests to shaping research-driven and accessibility-focused UX writing initiatives."
          chips={[
            "UX Writing",
            "Design Ops",
            "Microcopy",
            "UX Research",
            "Accessibility",
            "Crowdin",
            "Newsletter",
            "Working Student",
            "2 Years",
          ]}
        />

        <CaseStep number="1" label="Context" title="A writing team supporting many product teams">
          <p>
            At Bosch eBike Systems, UX writing was part of a Design Ops setup.
            Product teams sent requests for screens, flows, features, and
            interface content. The UX writing team reviewed those requests,
            created or revised copy, and aligned language across the product.
          </p>

          <p>
            Writing was not limited to one feature or one flow. It moved across
            different teams, product areas, and user contexts.
          </p>

          <Callout>
            This case study is not about one dramatic redesign. It is about learning how language works inside a real product system.
          </Callout>
        </CaseStep>

        <CaseStep number="2" label="Starting Point" title="I did not enter as a UX writer. I grew into one.">
          <p>
            I joined as a working student with limited experience in UX writing.
            My first months were about learning the craft: clarity, brevity,
            consistency, tone, terminology, and how product copy moves through
            agile teams.
          </p>

          <p>
            I also learned that UX writing is rarely just about finding the right
            sentence. It is about understanding constraints, asking for context,
            responding to feedback, and making language work inside a larger
            system.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <Learning n="01" text="Writing clearly and consistently for interface moments." />
            <Learning n="02" text="Working with requests, feedback loops, and implementation constraints." />
            <Learning n="03" text="Understanding how tone, terminology, and context shape product copy." />
          </div>
        </CaseStep>

        <CaseStep number="3" label="Product Copy" title="Learning how product language stays consistent across teams">
          <p>
            My core responsibility was supporting daily UX writing requests. I
            worked on copy for screens, flows, labels, messages, instructions,
            and different app states.
          </p>

          <p>
            Because requests came from multiple product teams, consistency became
            one of the biggest challenges. A single piece of copy could not be
            treated in isolation. It had to fit the surrounding flow, match the
            product language, and stay understandable for riders.
          </p>

          <div className="mt-8 space-y-3">
            <FocusItem number="1" title="Create" text="Draft copy for new screens, flows, and interaction states." />
            <FocusItem number="2" title="Revise" text="Improve existing copy based on feedback, context, and usability needs." />
            <FocusItem number="3" title="Align" text="Keep terminology and tone consistent across different teams and product areas." />
          </div>

          <p>
            I recreated anonymized examples to show how I evaluated, revised, and sometimes preserved product copy based on clarity, context, and user understanding.
          </p>

          <Artifact title="Product Copy Examples" label="Selected examples">
            <img
              src="/bosch/copyexample.png"
              alt="Anonymized product copy examples showing UX writing decisions for clarity, context, and user understanding"
            />
          </Artifact>

          <Callout>
            The biggest lesson was that good UX writing is not one perfect line. It is how language stays connected across a product.
          </Callout>
        </CaseStep>

        <BigStatement>
          Over time, I moved from writing individual strings to thinking about
          how product language works as a system.
        </BigStatement>

        <CaseStep number="4" label="Research" title="Turning UX writing into something we could test">
          <p>
            I contacted the UX research team and proposed a framework for testing
            UX writing more intentionally. I wanted to understand not only
            whether users could complete a flow, but whether the language helped
            them understand what was happening.
          </p>

          <p>
            I mapped the research path: goals, research questions, flows to test,
            test structure, interview questions, and analysis approach.
          </p>

          <div className="mt-8 space-y-3">
            <FocusItem number="1" title="Define" text="Clarify what we wanted to learn about user understanding." />
            <FocusItem number="2" title="Plan" text="Select flows, write research questions, and prepare interview prompts." />
            <FocusItem number="3" title="Analyze" text="Look for moments where copy created confusion, hesitation, or wrong expectations." />
          </div>

          <Artifact title="UX Writing Research Framework" label="Research planning">
            <img
              src="/bosch/boschresearch.png"
              alt="UX writing research framework showing research goals, evaluation dimensions, methods, tested flows, and key insight"
            />
          </Artifact>

          <Callout>
            Research helped me see that users do not only use interfaces. They interpret them.
          </Callout>
        </CaseStep>

        <CaseStep number="5" label="Accessibility" title="Making accessibility visible through a content audit">
          <p>
            Later, I did a deep dive into accessibility in UX writing. I started
            with two questions: how accessible is our app content today, and how
            can writing help improve it?
          </p>

          <p>
            This led to an accessibility guideline for UX writing in the app
            system and became the starting point for a larger content audit.
          </p>

          <p>
            I reviewed more than 400 Crowdin strings with AI-assisted analysis against
            accessibility-related writing principles. The audit revealed recurring patterns:
            unclear instructions, technical wording, weak error messages, and copy that
            needed screen context before it could be improved.
          </p>

          <div className="mt-8 space-y-3">
            <FocusItem number="1" title="Frame" text="Define the project scope, research questions, and evaluation criteria." />
            <FocusItem number="2" title="Audit" text="Review 400+ Crowdin strings with AI-assisted analysis against accessibility principles." />
            <FocusItem number="3" title="Prioritize" text="Summarize findings, request screen context, and organize issues by impact." />
          </div>

          <Artifact title="Accessibility Writing Audit" label="400+ Crowdin strings">
            <img
              src="/bosch/accessibility.png"
              alt="Accessibility writing audit showing issue categories, prioritization, and sample audit structure"
            />
          </Artifact>

          <Callout>
            The audit showed that accessibility issues in writing were not isolated copy problems. They needed a repeatable review process.
          </Callout>
        </CaseStep>

        <BigStatement>
          My tasks stayed practical, but my thinking became more strategic.
        </BigStatement>

        <CaseStep number="6" label="Working Reality" title="The work was layered, not linear">
          <p>
            These initiatives did not happen separately from my regular work.
            While contributing to research, accessibility, and internal
            communication, I continued supporting daily UX writing requests:
            creating copy, revising screens, responding to feedback, and aligning
            language across product contexts.
          </p>

          <p>
            This taught me what real product work looks like in a large
            organization. It is not one clean project after another. It is
            layered work: execution, collaboration, learning, and initiative
            happening in parallel.
          </p>

          <div className="grid gap-4 md:grid-cols-3">
            <Stat number="100+" label="Screens and flows touched through UX writing work" />
            <Stat number="400+" label="Crowdin strings reviewed in the accessibility audit" />
            <Stat  number="3" label="Writing surfaces supported: app, web portal, and internal newsletter" />
          </div>
        </CaseStep>

        <CaseStep number="7" label="Growth" title="What changed in how I understand UX writing">
          <p>
            At the beginning, I thought UX writing was mainly about choosing
            better words. Over two years, I learned that writing is part of how a
            product explains itself.
          </p>

          <p>
            I also learned that impact does not always come from owning a whole
            product area. It can come from asking better questions, creating
            structure, and contributing consistently inside a team.
          </p>

          <div className="grid gap-4 md:grid-cols-3">
            <Learning n="01" text="UX writing is shaped by systems, constraints, and collaboration." />
            <Learning n="02" text="Good copy decisions become stronger when they are researched and tested." />
            <Learning n="03" text="Accessibility in writing needs structure, not only good intentions." />
          </div>
        </CaseStep>

        <ReflectionCard
          title="I did not enter this role as a UX writer. I grew into one."
          text="Bosch eBike taught me how UX writing works in a real product environment: through requests, reviews, research, accessibility work, internal communication, and collaboration. I learned that UX writing is not just words on a screen — it is how a product communicates clearly at scale."
        />

        <div className="mt-10">
          <BackHome />
        </div>
      </div>
    </main>
  );
}

/* =========================
   PLACEHOLDER
========================= */

function Placeholder({ title }) {
  return (
    <main id="main-content" tabIndex={-1} className="min-h-screen bg-base text-text outline-none">
      <Navbar />

      <div className="mx-auto max-w-6xl px-6 py-24 md:px-10">
        <p className="mb-6 text-sm uppercase tracking-[0.25em] text-muted">
          UX Case Study
        </p>

        <h1 className="max-w-4xl text-5xl font-medium leading-tight md:text-7xl">
          {title}
        </h1>

        <p className="mt-8 max-w-2xl text-xl leading-9 text-muted">
          This is a placeholder project page. Later, we’ll replace this with your full case study content.
        </p>

        <BackHome />
      </div>
    </main>
  );
}

/* =========================
   SHARED COMPONENTS
========================= */

function CaseHero({ label, title, subtitle, chips }) {
  return (
    <section className="relative overflow-hidden rounded-[3rem] border border-text/10 bg-card/75 p-8 shadow-[0_24px_90px_rgba(30,27,24,0.08)] backdrop-blur md:p-14">
      <div aria-hidden="true" className="pointer-events-none absolute -right-16 -top-16 h-72 w-72 rounded-full bg-soft/70 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute bottom-0 left-0 h-64 w-64 rounded-full bg-accent/35 blur-3xl" />
      <div className="relative">
        <SectionLabel>{label}</SectionLabel>

        <h1 className="mt-7 max-w-5xl text-5xl font-medium leading-[1.02] tracking-tight md:text-7xl">
          {title}
        </h1>

        <p className="mt-7 max-w-3xl text-lg leading-8 text-muted md:text-xl">
          {subtitle}
        </p>

        <div className="mt-8 flex flex-wrap gap-2">
          {chips.map((chip) => (
            <Chip key={chip}>{chip}</Chip>
          ))}
        </div>
      </div>
    </section>
  );
}

function Chip({ children }) {
  return (
    <span className="rounded-full border border-text/10 bg-card/80 px-3 py-1.5 text-xs font-medium text-muted shadow-sm transition hover:border-primary/25 hover:text-text motion-reduce:transition-none">
      {children}
    </span>
  );
}

function CaseSection({ title, children }) {
  return (
    <Reveal className="py-10 md:py-14">
      <section className="rounded-[2.25rem] border border-text/10 bg-card/70 p-7 shadow-sm backdrop-blur md:p-10">
        <h2 className="mb-6 max-w-4xl text-4xl font-medium leading-tight md:text-5xl">{title}</h2>
        <div className="space-y-5 text-lg leading-8 text-muted">
          {children}
        </div>
      </section>
    </Reveal>
  );
}

function CaseStep({ number, label, title, children }) {
  return (
    <Reveal className="py-10 md:py-14">
      <section className="grid gap-8 rounded-[2.25rem] border border-text/10 bg-card/70 p-7 shadow-sm backdrop-blur md:grid-cols-[220px_1fr] md:p-10">
        <div className="flex items-center gap-3 self-start text-sm text-muted md:sticky md:top-28">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-text text-xs font-bold text-white">
            {number}
          </span>
          <span className="font-bold uppercase tracking-[0.2em]">{label}</span>
        </div>

        <div>
          <h2 className="max-w-3xl text-3xl font-medium leading-snug md:text-5xl">
            {title}
          </h2>

          <div className="mt-7 max-w-3xl space-y-4 leading-8 text-muted">
            {children}
          </div>
        </div>
      </section>
    </Reveal>
  );
}

function Quote({ children }) {
  return (
    <div className="my-10 rounded-[2rem] border border-primary/20 bg-primary/10 p-7 text-xl font-medium italic leading-8 text-text shadow-sm">
      {children}
    </div>
  );
}

function Callout({ children }) {
  return (
    <div className="my-8 rounded-[2rem] border border-primary/20 bg-primary/10 p-6 text-text shadow-sm">
      {children}
    </div>
  );
}

function FocusItem({ number, title, text }) {
  return (
    <div className="grid grid-cols-[44px_1fr] gap-4 rounded-[1.5rem] border border-text/10 bg-card p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md motion-reduce:transition-none motion-reduce:hover:translate-y-0">
      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 font-serif text-xl text-primary">{number}</span>
      <div>
        <h3 className="font-semibold text-text">{title}</h3>
        <p className="mt-2 text-sm leading-7 text-muted">{text}</p>
      </div>
    </div>
  );
}

function CompareBox({ type, title, items }) {
  const isOld = type === "old";

  return (
    <div
      className={`rounded-[2rem] border p-6 shadow-sm ${
        isOld
          ? "border-text/10 bg-card"
          : "border-primary/20 bg-primary/10"
      }`}
    >
      <h3
        className={`mb-4 text-xs font-medium uppercase tracking-[0.2em] ${
          isOld ? "text-muted" : "text-primary"
        }`}
      >
        {title}
      </h3>

      <ul className="list-disc space-y-2 pl-5 text-sm leading-6 text-muted">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

function getFocusableElements(container) {
  if (!container) return [];

  return Array.from(
    container.querySelectorAll(
      'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
    )
  );
}

function Artifact({ title, label, children }) {
  const [isOpen, setIsOpen] = useState(false);
  const titleId = useId();
  const triggerRef = useRef(null);
  const closeRef = useRef(null);
  const modalRef = useRef(null);

  const closeModal = () => {
    setIsOpen(false);
    requestAnimationFrame(() => {
      triggerRef.current?.focus();
    });
  };

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    requestAnimationFrame(() => {
      closeRef.current?.focus();
    });

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        closeModal();
        return;
      }

      if (event.key !== "Tab") return;

      const focusableElements = getFocusableElements(modalRef.current);
      if (!focusableElements.length) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  const modal =
    isOpen &&
    createPortal(
      <div
        ref={modalRef}
        className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/85 p-6 backdrop-blur-sm"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={closeModal}
      >
        <button
          ref={closeRef}
          type="button"
          onClick={closeModal}
          aria-label="Close expanded image"
          className="fixed right-6 top-6 z-[100000] rounded-full bg-white px-4 py-2 text-sm font-medium text-black shadow-lg outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
        >
          Close
        </button>

        <div
          className="max-h-[90vh] max-w-[94vw] overflow-auto rounded-[2rem] bg-base p-4 shadow-2xl md:p-6
          [&_img]:mx-auto [&_img]:h-auto [&_img]:max-h-none [&_img]:w-auto [&_img]:max-w-full [&_img]:rounded-[1.5rem]"
          onClick={(event) => event.stopPropagation()}
        >
          <h2 id={titleId} className="sr-only">
            {title}
          </h2>
          {children}
        </div>
      </div>,
      document.body
    );

  return (
    <div className="my-10">
      <div className="flex justify-between gap-4 text-xs font-bold uppercase tracking-[0.15em] text-muted">
        <span>{title}</span>
        <span>{label}</span>
      </div>

      <button
        ref={triggerRef}
        type="button"
        onClick={() => setIsOpen(true)}
        className="group mt-3 w-full overflow-hidden rounded-[2rem] border border-text/10 bg-card p-5 text-center text-muted shadow-[0_18px_60px_rgba(30,27,24,0.07)] outline-none transition hover:-translate-y-1 hover:shadow-[0_28px_80px_rgba(30,27,24,0.12)] focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-base motion-reduce:transition-none motion-reduce:hover:translate-y-0 md:p-8
        [&_img]:mx-auto [&_img]:max-h-[720px] [&_img]:rounded-[1.5rem] [&_img]:object-contain [&_img]:shadow-sm"
        aria-label={`Expand ${title}`}
      >
        {children}

        <span className="mt-4 block text-xs font-medium uppercase tracking-[0.15em] opacity-70 md:opacity-0 md:transition md:group-hover:opacity-70 md:group-focus-visible:opacity-70">
          Click or press Enter to expand
        </span>
      </button>

      {modal}
    </div>
  );
}

function BeforeAfterGallery({ title, label, items }) {
  const [openIndex, setOpenIndex] = useState(null);
  const isOpen = openIndex !== null;
  const titleId = useId();
  const triggerRefs = useRef([]);
  const closeRef = useRef(null);
  const modalRef = useRef(null);

  const close = () => {
    const previousIndex = openIndex;
    setOpenIndex(null);
    requestAnimationFrame(() => {
      if (previousIndex !== null) triggerRefs.current[previousIndex]?.focus();
    });
  };

  const next = () => setOpenIndex((i) => (i + 1) % items.length);
  const prev = () => setOpenIndex((i) => (i - 1 + items.length) % items.length);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    requestAnimationFrame(() => {
      closeRef.current?.focus();
    });

    function handleKeyDown(e) {
      if (e.key === "Escape") {
        close();
        return;
      }

      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();

      if (e.key !== "Tab") return;

      const focusableElements = getFocusableElements(modalRef.current);
      if (!focusableElements.length) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, openIndex]);

  return (
    <div className="my-10">
      <div className="flex justify-between gap-4 text-xs font-bold uppercase tracking-[0.15em] text-muted">
        <span>{title}</span>
        <span>{label}</span>
      </div>

      <div className="mt-3 space-y-8 rounded-[2rem] border border-text/10 bg-card p-5 shadow-[0_18px_60px_rgba(30,27,24,0.07)] md:p-8">
        {items.map((item, index) => (
          <button
            key={item.title}
            ref={(element) => {
              triggerRefs.current[index] = element;
            }}
            type="button"
            onClick={() => setOpenIndex(index)}
            className="block w-full rounded-[1.5rem] border border-text/10 bg-base/60 p-5 text-left outline-none transition hover:-translate-y-1 hover:shadow-lg focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-base motion-reduce:transition-none motion-reduce:hover:translate-y-0"
            aria-label={`Expand ${item.title} before and after comparison`}
          >
            <h4 className="mb-4 text-lg font-semibold text-text">
              {item.title}
            </h4>

            <div className="grid gap-5 md:grid-cols-[1fr_auto_1fr] md:items-center">
              <div>
                <p className="mb-2 text-xs font-bold uppercase tracking-[0.15em] text-muted">
                  Before
                </p>
                <img src={item.before} alt={`${item.title} before redesign showing the older Chenaran interface`} className="w-full rounded-xl" />
              </div>

              <div aria-hidden="true" className="hidden text-2xl text-muted md:block">→</div>

              <div>
                <p className="mb-2 text-xs font-bold uppercase tracking-[0.15em] text-muted">
                  After
                </p>
                <img src={item.after} alt={`${item.title} after redesign showing the improved Chenaran interface`} className="w-full rounded-xl" />
              </div>
            </div>

            <p className="mt-4 text-sm text-muted">{item.caption}</p>
          </button>
        ))}
      </div>

      {isOpen &&
        createPortal(
          <div
            ref={modalRef}
            className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/85 p-6 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            onClick={close}
          >
            <button
              ref={closeRef}
              type="button"
              onClick={close}
              aria-label="Close before and after gallery"
              className="fixed right-6 top-6 z-[100000] rounded-full bg-white px-4 py-2 text-sm font-medium text-black outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              Close
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              aria-label="Show previous comparison"
              className="fixed left-6 top-1/2 z-[100000] rounded-full bg-white px-4 py-3 text-black outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              ←
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              aria-label="Show next comparison"
              className="fixed right-6 top-1/2 z-[100000] rounded-full bg-white px-4 py-3 text-black outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              →
            </button>

            <div
              className="max-h-[92vh] max-w-[94vw] overflow-auto rounded-[2rem] bg-base p-5 shadow-2xl md:p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 id={titleId} className="mb-4 text-center text-xs font-bold uppercase tracking-[0.15em] text-muted">
                {openIndex + 1} / {items.length} · {items[openIndex].title}
              </h2>

              <div className="grid gap-6 md:grid-cols-[1fr_auto_1fr] md:items-start">
                <div>
                  <p className="mb-2 text-xs font-bold uppercase tracking-[0.15em] text-muted">
                    Before
                  </p>
                  <img
                    src={items[openIndex].before}
                    alt={`${items[openIndex].title} before redesign showing the older Chenaran interface`}
                    className="max-h-[75vh] w-auto rounded-[1.5rem]"
                  />
                </div>

                <div aria-hidden="true" className="hidden pt-24 text-3xl text-muted md:block">→</div>

                <div>
                  <p className="mb-2 text-xs font-bold uppercase tracking-[0.15em] text-muted">
                    After
                  </p>
                  <img
                    src={items[openIndex].after}
                    alt={`${items[openIndex].title} after redesign showing the improved Chenaran interface`}
                    className="max-h-[75vh] w-auto rounded-[1.5rem]"
                  />
                </div>
              </div>

              <p className="mt-5 text-center text-sm text-muted">
                {items[openIndex].caption}
              </p>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}

function Stat({ number, label, description }) {
  return (
    <div className="rounded-[2rem] border border-text/10 bg-card p-6 text-center shadow-sm">
      <span className="text-4xl font-medium text-primary">{number}</span>
      <p className="mt-2 text-sm leading-6 text-muted">{label}</p>
      {description && <p className="mt-2 text-xs leading-5 text-muted">{description}</p>}
    </div>
  );
}

function Learning({ n, text }) {
  return (
    <article className="rounded-[2rem] border border-text/10 bg-card p-6 shadow-sm">
      <span className="text-sm text-primary">{n}</span>
      <p className="mt-4 text-sm leading-7 text-muted">{text}</p>
    </article>
  );
}

function ReflectionCard({ title, text }) {
  return (
    <Reveal className="mt-16">
      <div className="relative overflow-hidden rounded-[3rem] border border-primary/20 bg-primary/10 p-8 shadow-[0_22px_80px_rgba(30,27,24,0.08)] md:p-14">
        <div aria-hidden="true" className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-soft/70 blur-3xl" />

        <p className="relative text-sm font-bold uppercase tracking-[0.2em] text-primary/70">
          Final reflection
        </p>

        <h2 className="relative mt-4 text-3xl font-medium md:text-4xl">
          {title}
        </h2>

        <p className="relative mt-6 max-w-2xl text-lg leading-8 text-muted">
          {text}
        </p>
      </div>
    </Reveal>
  );
}

function BigStatement({ children }) {
  return (
    <Reveal className="py-12 md:py-20">
      <div className="mx-auto max-w-4xl text-center">
        <p className="font-serif text-3xl italic leading-tight text-primary md:text-5xl">
          {children}
        </p>
      </div>
    </Reveal>
  );
}

function BackHome() {
  return (
    <Link
      to="/"
      className="group inline-flex min-h-12 items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-[0_14px_30px_rgba(109,93,251,0.25)] outline-none transition hover:-translate-y-0.5 hover:bg-text focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-base motion-reduce:hover:translate-y-0"
    >
      Back home <ArrowRight size={16} aria-hidden="true" className="transition group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0" />
    </Link>
  );
}

export default App;
