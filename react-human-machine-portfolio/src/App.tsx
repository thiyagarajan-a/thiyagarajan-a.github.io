import { useEffect, useMemo, useRef, useState } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import {
  ArrowRight,
  Cloud,
  Cpu,
  Gauge,
  Mic2,
  Network,
  NotebookPen,
  ShieldCheck,
  TerminalSquare,
  Users,
  Workflow,
} from "lucide-react";

type Mode = "human" | "machine";

type CountUpProps = {
  value: number;
  suffix?: string;
};

type OutcomePanelProps = {
  metric: string;
  operational: string;
  business: string;
};

function CountUp({ value, suffix = "" }: CountUpProps) {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { amount: 0.6, once: true });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (prefersReducedMotion) {
      setDisplay(value);
      return;
    }
    let frameId = 0;
    const start = performance.now();
    const duration = 900;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      setDisplay(Math.floor(value * progress));
      if (progress < 1) frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [inView, prefersReducedMotion, value]);

  return (
    <span ref={ref} className="text-3xl font-semibold tracking-tight text-ink">
      {display}
      {suffix}
    </span>
  );
}

function OrgGrowthTimeline() {
  return (
    <div className="space-y-5 rounded-xl border border-line bg-panel/40 p-5">
      <p className="text-xs uppercase tracking-[0.12em] text-muted">
        OrgGrowthTimeline
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1">
          <CountUp value={50} suffix="+" />
          <p className="text-sm text-muted">
            Engineers and managers led across core infrastructure scopes
          </p>
        </div>
        <div className="space-y-1">
          <CountUp value={90} suffix="%" />
          <p className="text-sm text-muted">
            Internship conversion rate in program design and coaching
          </p>
        </div>
        <div className="space-y-1">
          <CountUp value={3} suffix="→18" />
          <p className="text-sm text-muted">
            Team growth milestone delivered at Chewy
          </p>
        </div>
        <div className="space-y-1">
          <CountUp value={3} suffix=" major" />
          <p className="text-sm text-muted">
            Acquisition infrastructure consolidations unified into one system
          </p>
        </div>
      </div>
    </div>
  );
}

function ArchitectureFlow() {
  return (
    <div className="rounded-xl border border-line bg-panel/40 p-5">
      <p className="mb-4 text-xs uppercase tracking-[0.12em] text-muted">
        ArchitectureFlow
      </p>
      <svg viewBox="0 0 760 160" className="w-full">
        <defs>
          <marker
            id="arrow"
            markerWidth="8"
            markerHeight="8"
            refX="6"
            refY="4"
            orient="auto"
          >
            <path d="M0,0 L8,4 L0,8 z" fill="#6caea1" />
          </marker>
        </defs>
        <rect x="22" y="52" width="210" height="56" rx="10" fill="#20252b" />
        <rect x="274" y="52" width="210" height="56" rx="10" fill="#20252b" />
        <rect x="526" y="52" width="210" height="56" rx="10" fill="#20252b" />
        <text x="52" y="86" fill="#d8e1ea" fontSize="15">
          Source Estates
        </text>
        <text x="298" y="86" fill="#d8e1ea" fontSize="15">
          Kubernetes + Istio
        </text>
        <text x="563" y="86" fill="#d8e1ea" fontSize="15">
          SLO Outcomes
        </text>
        <line
          x1="232"
          y1="80"
          x2="268"
          y2="80"
          stroke="#6caea1"
          strokeWidth="2"
          markerEnd="url(#arrow)"
        />
        <line
          x1="484"
          y1="80"
          x2="520"
          y2="80"
          stroke="#6caea1"
          strokeWidth="2"
          markerEnd="url(#arrow)"
        />
      </svg>
    </div>
  );
}

function ReliabilitySignal() {
  return (
    <div className="rounded-xl border border-line bg-panel/40 p-5">
      <p className="mb-4 text-xs uppercase tracking-[0.12em] text-muted">
        ReliabilitySignal
      </p>
      <div className="flex h-16 items-end gap-2">
        {["0ms", "180ms", "240ms", "120ms", "90ms", "70ms"].map((_, idx) => (
          <div
            key={idx}
            className="w-6 origin-bottom rounded-sm bg-accent/80 animate-pulsebar"
            style={{
              height: `${(idx + 2) * 10}%`,
              animationDelay: `${idx * 0.12}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

function OutcomePanel({ metric, operational, business }: OutcomePanelProps) {
  return (
    <article className="space-y-3 rounded-xl border border-line bg-panel/40 p-5">
      <p className="font-mono text-sm text-accent">{metric}</p>
      <p className="text-sm text-ink">
        <span className="font-medium">Operational:</span> {operational}
      </p>
      <p className="text-sm text-ink">
        <span className="font-medium">Business:</span> {business}
      </p>
    </article>
  );
}

function MachineBlock({
  title,
  content,
}: {
  title: string;
  content: string;
}) {
  return (
    <div className="rounded-xl border border-line bg-panel p-4">
      <p className="mb-3 font-mono text-xs uppercase tracking-[0.12em] text-accent">
        {title}
      </p>
      <pre className="overflow-x-auto rounded-lg bg-black/30 p-4 font-mono text-xs leading-6 text-[#cbf1e7]">
        <code>{content}</code>
      </pre>
    </div>
  );
}

export default function App() {
  const [mode, setMode] = useState<Mode>("human");
  const [isCompact, setIsCompact] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setIsCompact(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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

  const staggerVariant: Variants = useMemo(
    () => ({
      hidden: {},
      show: {
        transition: {
          staggerChildren: prefersReducedMotion ? 0 : 0.08,
        },
      },
    }),
    [prefersReducedMotion]
  );

  const itemVariant: Variants = useMemo(
    () => ({
      hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 10 },
      show: { opacity: 1, y: 0, transition: { duration: 0.32 } },
    }),
    [prefersReducedMotion]
  );

  const machineContext = `role: "Sr. Engineering Manager"
company: "Uber Freight"
scope:
  org_size: 50+
  focus:
    - global infrastructure strategy
    - kubernetes + istio at massive scale
    - acquisition cloud consolidation
prior:
  - "Head of Cloud Engineering @ GoBrands"
  - "Engineering Manager @ Chewy (3 -> 18 scale)"
`;

  const machineArchitecture = `$ infra-consolidation --sources azure,on-prem --target gcp --mesh istio
status: complete
clusters: 40+
services-migrated: 1000+
slo-policy:
  availability: "99.95%"
  latency_p95: "< 250ms"
  error_budget_alerting: enabled
`;

  const machinePeople = `{
  "leadership": {
    "retention_strategy": "high-trust engineering culture",
    "mentorship_model": "manager+staff pairing loops",
    "internship_conversion": "90%"
  },
  "initiatives": [
    "Internal AI hackathon: agentic alert remediation",
    "Voyagers ERG for global immigrants"
  ]
}`;

  return (
    <div
      className={`min-h-screen ${
        mode === "machine" ? "font-mono" : "font-sans"
      } bg-bg text-ink`}
    >
      <header
        className={`fixed inset-x-0 top-0 z-40 border-b border-line bg-bg/90 backdrop-blur ${
          isCompact ? "py-3" : "py-4"
        } transition-all duration-200`}
      >
        <nav className="mx-auto flex w-full max-w-reading items-center justify-between px-5">
          <div className="flex items-center gap-2 text-sm font-medium">
            <span className="rounded-md border border-line bg-panel px-2 py-1 text-accent">
              TA
            </span>
            <span>Theo (Thiyagarajan Anandan)</span>
          </div>
          <div className="flex items-center gap-2">
            <a className="link-underline focus-ring text-sm text-muted" href="#writing">
              Writing
            </a>
            <a
              className="link-underline focus-ring text-sm text-muted"
              href="#appearances"
            >
              Public
            </a>
            <button
              type="button"
              role="switch"
              aria-checked={mode === "machine"}
              onClick={() =>
                setMode((prev) => (prev === "human" ? "machine" : "human"))
              }
              className="focus-ring ml-2 inline-flex items-center gap-2 rounded-full border border-line bg-panel px-3 py-1.5 text-xs"
            >
              <span
                className={mode === "human" ? "text-ink" : "text-muted"}
              >
                Human
              </span>
              <span className="relative h-5 w-10 rounded-full bg-bg">
                <motion.span
                  layout
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 36,
                  }}
                  className={`absolute top-0.5 h-4 w-4 rounded-full bg-accent ${
                    mode === "machine" ? "left-5" : "left-0.5"
                  }`}
                />
              </span>
              <span
                className={mode === "machine" ? "text-ink" : "text-muted"}
              >
                Machine
              </span>
            </button>
          </div>
        </nav>
      </header>

      <main id="content" className="mx-auto w-full max-w-reading px-5 pb-24 pt-28">
        <motion.section
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={sectionVariant}
          className="space-y-7 border-b border-line pb-12 text-center"
        >
          <p className="inline-flex items-center gap-2 rounded-full border border-line bg-panel px-3 py-1 text-xs uppercase tracking-[0.12em] text-muted">
            <ShieldCheck size={14} />
            Director / Sr. Engineering Manager Candidate
          </p>
          <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
            Human leadership. Machine-grade execution.
          </h1>
          <p className="mx-auto max-w-2xl text-lg leading-8 text-muted">
            Sr. Engineering Manager at Uber Freight. I lead 50+ engineers and
            managers through large-scale cloud consolidation, reliability
            governance, and team growth in high-ambiguity environments.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="#case-studies"
              className="focus-ring rounded-full border border-accent bg-accent px-5 py-2.5 text-sm font-medium text-bg"
            >
              Explore Case Studies
            </a>
            <a
              href="#appearances"
              className="focus-ring rounded-full border border-line px-5 py-2.5 text-sm text-ink"
            >
              Public Appearances
            </a>
          </div>
        </motion.section>

        <motion.section
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariant}
          className="space-y-6 border-b border-line py-12"
        >
          <h2 className="text-2xl font-semibold tracking-tight">
            What I Drive
          </h2>
          {mode === "human" ? (
            <div className="space-y-3">
              <details className="rounded-xl border border-line bg-panel/40 p-4">
                <summary className="cursor-pointer text-base font-medium">
                  Global Core Infrastructure Transformation
                </summary>
                <p className="mt-3 text-sm leading-7 text-muted">
                  Led technical strategy to unify three acquisition estates from
                  Azure and on-prem into a large GCP ecosystem using Kubernetes
                  and Istio.
                </p>
              </details>
              <details className="rounded-xl border border-line bg-panel/40 p-4">
                <summary className="cursor-pointer text-base font-medium">
                  Organizational Growth and Talent Development
                </summary>
                <p className="mt-3 text-sm leading-7 text-muted">
                  Built a high-trust engineering culture, retained key talent,
                  and launched an internship program with 90% conversion.
                </p>
              </details>
              <details className="rounded-xl border border-line bg-panel/40 p-4">
                <summary className="cursor-pointer text-base font-medium">
                  AI-driven Reliability Operations
                </summary>
                <p className="mt-3 text-sm leading-7 text-muted">
                  Organized an internal AI hackathon to create agents for alert
                  remediation and reduce toil in incident workflows.
                </p>
              </details>
            </div>
          ) : (
            <div className="space-y-4">
              <MachineBlock title="infra.yml" content={machineContext} />
              <MachineBlock title="consolidation.log" content={machineArchitecture} />
              <MachineBlock title="org.json" content={machinePeople} />
            </div>
          )}
        </motion.section>

        <motion.section
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariant}
          className="space-y-6 border-b border-line py-12"
        >
          <h2 className="text-2xl font-semibold tracking-tight">Outcomes</h2>
          <OrgGrowthTimeline />
          <div className="grid gap-4 sm:grid-cols-2">
            <OutcomePanel
              metric="99.95%+ Reliability Discipline"
              operational="SLO-driven operations across Kubernetes service domains."
              business="Improved customer trust and reduced incident volatility."
            />
            <OutcomePanel
              metric="Acquisition Consolidation"
              operational="Unified global cloud infrastructure under one operating model."
              business="Lowered operational complexity and improved engineering speed."
            />
          </div>
          <ReliabilitySignal />
        </motion.section>

        <motion.section
          id="case-studies"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariant}
          className="space-y-6 border-b border-line py-12"
        >
          <h2 className="text-2xl font-semibold tracking-tight">Case Studies</h2>
          <motion.div variants={staggerVariant} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} className="space-y-5">
            <motion.article variants={itemVariant} className="space-y-3 rounded-xl border border-line bg-panel/40 p-5">
              <div className="flex items-center gap-2 text-sm text-accent">
                <Cloud size={16} />
                Global Infrastructure Consolidation
              </div>
              <p className="text-sm text-muted">
                Technical strategy for consolidating three acquisitions from
                Azure/on-prem into GCP with Kubernetes and Istio.
              </p>
              <ArchitectureFlow />
              <OutcomePanel
                metric="Business Impact"
                operational="Unified infrastructure controls, service mesh standards, and incident runbooks."
                business="Faster integration timelines and lower risk during high-change periods."
              />
            </motion.article>
            <motion.article variants={itemVariant} className="space-y-3 rounded-xl border border-line bg-panel/40 p-5">
              <div className="flex items-center gap-2 text-sm text-accent">
                <Users size={16} />
                Organizational Scaling and Mentorship
              </div>
              <p className="text-sm text-muted">
                Expanded teams, built manager pipelines, and formalized
                mentoring systems to sustain high execution quality.
              </p>
              <OutcomePanel
                metric="Business Impact"
                operational="Consistent leadership loops and talent systems."
                business="Higher retention, stronger succession, and better delivery continuity."
              />
            </motion.article>
            <motion.article variants={itemVariant} className="space-y-3 rounded-xl border border-line bg-panel/40 p-5">
              <div className="flex items-center gap-2 text-sm text-accent">
                <Cpu size={16} />
                AI Agents for Alert Remediation
              </div>
              <p className="text-sm text-muted">
                Internal hackathon initiative focused on practical agent use for
                incident triage and remediation acceleration.
              </p>
              <OutcomePanel
                metric="Business Impact"
                operational="Reduced repetitive investigation work for engineering teams."
                business="More engineering time returned to strategic roadmap execution."
              />
            </motion.article>
          </motion.div>
        </motion.section>

        <motion.section
          id="writing"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariant}
          className="space-y-6 border-b border-line py-12"
        >
          <h2 className="text-2xl font-semibold tracking-tight">Writing</h2>
          <div className="prose prose-invert max-w-none prose-headings:font-semibold prose-headings:text-ink prose-p:text-muted prose-code:text-accent prose-pre:rounded-xl prose-pre:border prose-pre:border-line prose-pre:bg-panel prose-pre:text-[#d7f9ef]">
            <p>
              Essays on global infrastructure, cloud engineering strategy, SLO
              operations, and leadership patterns for scaling organizations.
            </p>
            <ul>
              <li>Large-scale observability and M&amp;A consolidation strategy</li>
              <li>Kubernetes governance and reliability signal design</li>
              <li>Core infrastructure operating models for executive leaders</li>
            </ul>
            <pre>
              <code>{`$ report --quarter q1 --scope core-infra
services: 1143
slo_coverage: 96.2%
incident_mttr: -18%
onboarding_velocity: +32%`}</code>
            </pre>
          </div>
        </motion.section>

        <motion.section
          id="appearances"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariant}
          className="space-y-6 py-12"
        >
          <h2 className="text-2xl font-semibold tracking-tight">
            Public Appearances
          </h2>
          <motion.ul
            variants={staggerVariant}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="space-y-3"
          >
            <motion.li
              variants={itemVariant}
              className="rounded-xl border border-line bg-panel/40 p-4"
            >
              <a
                href="https://www.youtube.com/watch?v=4Ck_5t1XZYs"
                target="_blank"
                rel="noreferrer"
                className="focus-ring link-underline inline-flex items-center gap-2 text-sm"
              >
                <Mic2 size={16} />
                Keynote: Datadog Summit 2025 - Strategies for Large-Scale
                Observability and M&amp;A Infrastructure Consolidation
                <ArrowRight size={14} />
              </a>
            </motion.li>
            <motion.li
              variants={itemVariant}
              className="rounded-xl border border-line bg-panel/40 p-4 text-sm text-muted"
            >
              Datadog Customer Advisory Board Member
            </motion.li>
            <motion.li
              variants={itemVariant}
              className="rounded-xl border border-line bg-panel/40 p-4 text-sm text-muted"
            >
              Founder, Voyagers ERG for global immigrants
            </motion.li>
          </motion.ul>
        </motion.section>
      </main>

      <footer className="border-t border-line py-8">
        <div className="mx-auto flex w-full max-w-reading flex-wrap items-center justify-between gap-4 px-5 text-sm text-muted">
          <p>San Franscisco Bay area, California, USA</p>
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1">
              <Workflow size={14} />
              Core Infrastructure
            </span>
            <span className="inline-flex items-center gap-1">
              <Gauge size={14} />
              SLO Governance
            </span>
            <span className="inline-flex items-center gap-1">
              <NotebookPen size={14} />
              Leadership Writing
            </span>
            <span className="inline-flex items-center gap-1">
              <Network size={14} />
              Cloud Engineering
            </span>
            <span className="inline-flex items-center gap-1">
              <TerminalSquare size={14} />
              Human vs Machine
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
