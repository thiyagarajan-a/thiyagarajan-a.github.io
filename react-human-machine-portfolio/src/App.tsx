import { useMemo, useState } from "react";
import { motion, type Variants, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Command,
  Linkedin,
  Mail,
  Mic2,
  ShieldCheck,
  TerminalSquare,
} from "lucide-react";
import { Helmet } from "react-helmet-async";
import theoProfilePhoto from "./assets/theo-profile-bw.png";
import { projects, type Project } from "./data/projects";

type Mode = "human" | "machine";

const SITE_URL = "https://thiyagarajana.com";
const NAME_PRIMARY = "Theo";
const NAME_SECONDARY = "Thiyagarajan A";

function buildPageMetadata(featuredProject: Project) {
  const title = `${NAME_PRIMARY} | Human vs Machine | ${NAME_SECONDARY}`;
  const description =
    `Portfolio of ${NAME_PRIMARY} (${NAME_SECONDARY}) featuring observability leadership, cloud infrastructure consolidation, and people-first execution. Featured case study: ${featuredProject.title}.`;

  return {
    title,
    description,
    canonical: SITE_URL,
    keywords:
      "Theo, Thiyagarajan A, Thiyagarajan Anandan, observability engineering manager, cloud infrastructure leadership, kubernetes at scale, production engineering",
  };
}

function HumanVsMachineHero({
  mode,
  setMode,
}: {
  mode: Mode;
  setMode: (mode: Mode) => void;
}) {
  return (
    <section className="space-y-7 border-b border-line pb-12 text-center">
      <div className="mx-auto w-fit rounded-full border border-line bg-panel/70 p-2 shadow-[0_0_0_1px_rgba(255,255,255,0.02)]">
        <img
          src={theoProfilePhoto}
          alt="Theo (Thiyagarajan Anandan)"
          className="h-36 w-36 rounded-full object-cover"
          loading="eager"
        />
      </div>

      <p className="inline-flex items-center gap-2 rounded-full border border-line bg-panel px-3 py-1 text-xs uppercase tracking-[0.12em] text-muted">
        <ShieldCheck size={14} />
        Engineering Leader: Deep Tech, Vendor Strategy, and Organization Scale
      </p>

      <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
        Theo | Human vs Machine
      </h1>

      <p className="mx-auto max-w-2xl text-lg leading-8 text-muted">
        Sr. Engineering Manager at Uber Freight leading 50+ engineers and managers
        across observability, cloud infrastructure modernization, and large-scale
        reliability outcomes.
      </p>

      <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-line bg-panel p-1">
        <button
          onClick={() => setMode("human")}
          className={`focus-ring rounded-full px-4 py-2 text-sm ${
            mode === "human" ? "bg-accent text-bg" : "text-muted"
          }`}
          aria-pressed={mode === "human"}
        >
          Human
        </button>
        <button
          onClick={() => setMode("machine")}
          className={`focus-ring rounded-full px-4 py-2 text-sm ${
            mode === "machine" ? "bg-accent text-bg" : "text-muted"
          }`}
          aria-pressed={mode === "machine"}
        >
          Machine
        </button>
      </div>

      <div className="grid gap-4 text-left md:grid-cols-2">
        <motion.article
          animate={{ opacity: mode === "human" ? 1 : 0.45, y: mode === "human" ? 0 : 8 }}
          transition={{ duration: 0.25 }}
          className="rounded-2xl border border-line bg-panel/50 p-5"
        >
          <h2 className="text-lg font-semibold">Human</h2>
          <p className="mt-2 text-sm text-muted">
            Builds trust-centered teams, develops managers, and aligns engineering
            investments to business outcomes.
          </p>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-muted">
            <li>Leads 50+ engineers and managers</li>
            <li>High-retention, mentorship-led org systems</li>
            <li>Cross-functional collaboration with security, IT, and ops</li>
          </ul>
        </motion.article>

        <motion.article
          animate={{ opacity: mode === "machine" ? 1 : 0.45, y: mode === "machine" ? 0 : 8 }}
          transition={{ duration: 0.25 }}
          className="rounded-2xl border border-line bg-panel/50 p-5"
        >
          <h2 className="text-lg font-semibold">Machine</h2>
          <pre className="mt-2 overflow-x-auto rounded-lg bg-black/30 p-3 text-xs leading-6 text-[#cbf1e7]">
            <code>{`stack:
  cloud: [GCP, AWS, Azure]
  runtime: [Kubernetes, Istio]
  observability: [Datadog, OpenTelemetry]
  operations: [SLOs, incident automation, IAM controls]`}</code>
          </pre>
        </motion.article>
      </div>
    </section>
  );
}

function CaseStudyCard({ project }: { project: Project }) {
  return (
    <article className="space-y-4 rounded-xl border border-line bg-panel/40 p-5">
      <p className="text-xs uppercase tracking-[0.12em] text-muted">{project.year}</p>
      <h3 className="text-xl font-semibold tracking-tight">{project.title}</h3>
      <p className="text-sm text-muted">{project.summary}</p>

      <div className="grid gap-4 md:grid-cols-3">
        <div>
          <p className="mb-1 font-mono text-xs uppercase tracking-[0.08em] text-accent">
            Technical Hurdle
          </p>
          <p className="text-sm text-muted">{project.technical_hurdle}</p>
        </div>
        <div>
          <p className="mb-1 font-mono text-xs uppercase tracking-[0.08em] text-accent">
            Business Impact
          </p>
          <ul className="list-disc space-y-1 pl-5 text-sm text-muted">
            {project.business_impact.map((impact) => (
              <li key={impact}>{impact}</li>
            ))}
          </ul>
        </div>
        <div>
          <p className="mb-1 font-mono text-xs uppercase tracking-[0.08em] text-accent">
            Human-Centric Result
          </p>
          <ul className="list-disc space-y-1 pl-5 text-sm text-muted">
            {project.human_centric_result.map((result) => (
              <li key={result}>{result}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {project.stack.map((tech) => (
          <span
            key={tech}
            className="rounded-full border border-line bg-panel px-2.5 py-1 text-xs text-muted"
          >
            {tech}
          </span>
        ))}
      </div>
    </article>
  );
}

function CaseStudyList({ projects }: { projects: Project[] }) {
  return (
    <div className="space-y-5">
      {projects.map((project) => (
        <CaseStudyCard key={project.slug} project={project} />
      ))}
    </div>
  );
}

function CommandPaletteFooter() {
  const [command, setCommand] = useState("");

  const executeCommand = () => {
    const normalized = command.trim().toLowerCase();
    if (!normalized) return;

    const token = normalized
      .replace(/^\$/, "")
      .replace(/^run\s+/, "")
      .split(/\s+/)[0];

    if (token === "linkedin" || token === "li") {
      window.open("https://www.linkedin.com/in/anandant/", "_blank", "noopener,noreferrer");
    } else if (token === "email" || token === "mail") {
      window.location.href = "mailto:thiyagamcitp@gmail.com";
    } else if (token === "case-studies" || token === "cases") {
      const section = document.getElementById("case-studies");
      section?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <footer id="contact" className="border-t border-line py-12">
      <div className="mx-auto w-full max-w-reading px-5">
        <h3 className="text-2xl font-semibold tracking-tight">Contact</h3>
        <p className="mt-2 text-sm text-muted">
          Command style for engineers, clear links for recruiters.
          Try: <code className="text-accent">linkedin</code>, <code className="text-accent">run linkedin</code>, <code className="text-accent">email</code>, <code className="text-accent">case-studies</code>
        </p>

        <div className="mt-4 flex items-center gap-2 rounded-xl border border-line bg-black/40 px-3 py-3">
          <Command size={16} className="text-accent" />
          <span className="font-mono text-sm text-accent">$</span>
          <input
            value={command}
            onChange={(e) => setCommand(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && executeCommand()}
            placeholder="run linkedin"
            className="w-full bg-transparent font-mono text-sm text-ink outline-none placeholder:text-muted"
            aria-label="Command palette input"
          />
          <button
            onClick={executeCommand}
            className="focus-ring rounded-md border border-line px-2 py-1 text-xs text-muted hover:text-ink"
          >
            Run
          </button>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-4 text-sm">
          <a
            href="https://www.linkedin.com/in/anandant/"
            target="_blank"
            rel="noreferrer"
            className="focus-ring link-underline inline-flex items-center gap-2 text-muted"
          >
            <Linkedin size={15} /> LinkedIn
          </a>
          <a
            href="mailto:thiyagamcitp@gmail.com"
            className="focus-ring link-underline inline-flex items-center gap-2 text-muted"
          >
            <Mail size={15} /> Email
          </a>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  const [mode, setMode] = useState<Mode>("human");
  const prefersReducedMotion = useReducedMotion();

  const sectionVariant: Variants = useMemo(
    () => ({
      hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 14 },
      show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
      },
    }),
    [prefersReducedMotion]
  );

  const featuredProject = projects[0];
  const seo = buildPageMetadata(featuredProject);

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Thiyagarajan Anandan",
    alternateName: ["Theo", "Thiyagarajan A"],
    url: SITE_URL,
    sameAs: ["https://www.linkedin.com/in/anandant/"],
    jobTitle: "Senior Engineering Manager",
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Theo | Human vs Machine",
    url: SITE_URL,
    about: ["Theo", "Thiyagarajan A", "Observability", "Cloud Infrastructure"],
  };

  return (
    <div className={`min-h-screen ${mode === "machine" ? "font-mono" : "font-sans"} bg-bg text-ink`}>
      <Helmet>
        <html lang="en" />
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        <meta name="robots" content="index,follow,max-image-preview:large" />
        <meta name="keywords" content={seo.keywords} />
        <link rel="canonical" href={seo.canonical} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={seo.title} />
        <meta property="og:description" content={seo.description} />
        <meta property="og:url" content={SITE_URL} />
        <meta property="og:site_name" content="Theo | Human vs Machine" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seo.title} />
        <meta name="twitter:description" content={seo.description} />
        <script type="application/ld+json">{JSON.stringify(personSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(websiteSchema)}</script>
      </Helmet>

      <header className="sticky top-0 z-40 border-b border-line bg-bg/90 py-3 backdrop-blur">
        <nav className="mx-auto flex w-full max-w-reading items-center justify-between px-5">
          <div className="flex items-center gap-2 text-sm font-medium">
            <span className="rounded-md border border-line bg-panel px-2 py-1 text-accent">TA</span>
            <span>Theo (Thiyagarajan Anandan)</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-muted">
            <a className="link-underline focus-ring" href="#case-studies">Case Studies</a>
            <a className="link-underline focus-ring" href="#public">Public</a>
            <a className="link-underline focus-ring" href="#contact">Contact</a>
          </div>
        </nav>
      </header>

      <main id="content" className="mx-auto w-full max-w-reading px-5 pb-16 pt-10">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={sectionVariant}>
          <HumanVsMachineHero mode={mode} setMode={setMode} />
        </motion.div>

        <motion.section
          id="case-studies"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariant}
          className="space-y-6 border-b border-line py-12"
        >
          <h2 className="text-2xl font-semibold tracking-tight">Case Studies</h2>
          <p className="text-sm text-muted">
            Outcome-first case studies covering business impact, technical hurdles,
            and human-centric execution.
          </p>
          <CaseStudyList projects={projects} />
        </motion.section>

        <motion.section
          id="public"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariant}
          className="space-y-6 py-12"
        >
          <h2 className="text-2xl font-semibold tracking-tight">Public Appearances</h2>
          <div className="space-y-3">
            <a
              href="https://www.youtube.com/watch?v=4Ck_5t1XZYs"
              target="_blank"
              rel="noreferrer"
              className="focus-ring link-underline inline-flex items-center gap-2 rounded-xl border border-line bg-panel/40 p-4 text-sm"
            >
              <Mic2 size={16} />
              Datadog Summit 2025 Keynote: Large-Scale Observability and M&A Infrastructure Consolidation
              <ArrowRight size={14} />
            </a>
            <p className="rounded-xl border border-line bg-panel/40 p-4 text-sm text-muted">
              Datadog Customer Advisory Board Member | Founder, Voyagers ERG
            </p>
          </div>
        </motion.section>
      </main>

      <CommandPaletteFooter />

      <footer className="border-t border-line py-6">
        <div className="mx-auto flex w-full max-w-reading flex-wrap items-center justify-between gap-4 px-5 text-sm text-muted">
          <p>San Franscisco Bay area, California, USA</p>
          <p className="inline-flex items-center gap-1">
            <TerminalSquare size={14} />
            Human vs Machine
          </p>
        </div>
      </footer>
    </div>
  );
}
