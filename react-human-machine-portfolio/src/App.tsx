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
import theoProfilePhoto from "./assets/theo-profile-bw.png";

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

type BlogPost = {
  date: string;
  title: string;
  summary: string;
  deepDive: string;
  snippet: string;
  topics: string[];
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
          <CountUp value={17} suffix="→1" />
          <p className="text-sm text-muted">
            Operational tools consolidated into a single observability surface
          </p>
        </div>
        <div className="space-y-1">
          <CountUp value={90} suffix="%" />
          <p className="text-sm text-muted">
            Internship conversion rate through structured coaching systems
          </p>
        </div>
        <div className="space-y-1">
          <CountUp value={3} suffix=" acquisitions" />
          <p className="text-sm text-muted">
            Cloud estates unified with consistent runtime and reliability controls
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
        <rect x="18" y="52" width="220" height="56" rx="10" fill="#20252b" />
        <rect x="270" y="52" width="220" height="56" rx="10" fill="#20252b" />
        <rect x="522" y="52" width="220" height="56" rx="10" fill="#20252b" />
        <text x="42" y="86" fill="#d8e1ea" fontSize="15">
          Metrics + Infra Signals
        </text>
        <text x="292" y="86" fill="#d8e1ea" fontSize="15">
          Kubernetes + Istio Runtime
        </text>
        <text x="548" y="86" fill="#d8e1ea" fontSize="15">
          Business Reliability
        </text>
        <line
          x1="238"
          y1="80"
          x2="264"
          y2="80"
          stroke="#6caea1"
          strokeWidth="2"
          markerEnd="url(#arrow)"
        />
        <line
          x1="490"
          y1="80"
          x2="516"
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
        {[42, 78, 64, 90, 72, 84, 58].map((height, idx) => (
          <div
            key={idx}
            className="w-6 origin-bottom rounded-sm bg-accent/80 animate-pulsebar"
            style={{
              height: `${height}%`,
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

const blogPosts: BlogPost[] = [
  {
    date: "Nov 6, 2025",
    title:
      "From Alert Storm to Clarity: Designing the First Five Minutes of Incident Response",
    summary:
      "The first five minutes determine whether an incident is contained or amplified. This essay breaks down how we reduced cognitive load by unifying context, standardizing service tags, and improving default dashboard entry points.",
    deepDive:
      "I describe a practical operating model for severe incidents: a single triage lens, predefined ownership tags, and an escalation path that minimizes handoff loss. The key is to remove decision latency before engineering judgment even starts. When context is stable and searchable, teams transition faster from detection to diagnosis and avoid parallel, conflicting mitigation work.",
    snippet: `triage_window:
  objective: "first 5 minutes"
  required_context:
    - service
    - env
    - owner
    - dependency_map
  expected_output:
    - probable_cause
    - incident_commander
    - first_mitigation`,
    topics: ["Incident Response", "Cognitive Load", "Observability"],
  },
  {
    date: "Nov 24, 2025",
    title:
      "Consolidating 17 Tools into One Operational Surface: A Datadog Migration Playbook",
    summary:
      "Consolidation is not just a tool migration; it is an operating model shift. I walk through sequencing, change risk control, and stakeholder adoption patterns that helped collapse a fragmented toolchain into a consistent observability workflow.",
    deepDive:
      "The migration plan depended on phased ownership transfer, not a hard cutover. We paired each service domain with migration checkpoints across dashboards, monitors, runbooks, and alert routing. By controlling blast radius and preserving team autonomy at the domain level, consolidation improved signal quality without slowing delivery.",
    snippet: `migration_wave:
  scope: "service-domain"
  checklist:
    - dashboards_parity
    - monitor_equivalence
    - runbook_links
    - paging_routes
  cutover: "wave-by-wave"`,
    topics: ["Datadog", "M&A Integration", "Operations"],
  },
  {
    date: "Dec 12, 2025",
    title:
      "Tagging Standards as Infrastructure: Why Searchability is a Reliability Primitive",
    summary:
      "Teams often treat tagging as hygiene. At scale, tagging is architecture. This post explains the taxonomy, governance loops, and enforcement mechanisms needed for dashboards, AI copilots, and incident tooling to return useful answers quickly.",
    deepDive:
      "Without a strict tag contract, observability data becomes expensive but ambiguous. I detail how to enforce naming conventions across metrics, traces, and logs, and how to make compliance visible. This creates stronger query precision, better incident correlation, and fewer interruptions to subject matter experts.",
    snippet: `tag_contract:
  required: [service, team, env, tier, ownership]
  linting: "enabled in CI"
  drift_report: "weekly"
  non_compliant_rollout: "blocked"`,
    topics: ["Tagging", "Reliability", "Data Quality"],
  },
  {
    date: "Dec 29, 2025",
    title:
      "Kubernetes Fleet Operations for Growth: Upgrades, Guardrails, and Safety-by-Default",
    summary:
      "Scaling Kubernetes operations requires repeatable upgrade lanes, predictable rollback patterns, and service-mesh-aware policy controls. I share governance patterns that preserve team velocity while reducing production risk.",
    deepDive:
      "I outline a fleet lifecycle model that combines automated policy checks, staged rollouts, and health gate validation. The objective is to make reliability a default posture, not a specialist intervention. Guardrails are effective only when they are transparent, measurable, and simple for application teams to adopt.",
    snippet: `fleet_policy:
  cluster_upgrade_windows: "staged"
  policy_validation: "pre-flight"
  rollback_trigger: "error_budget_burn"
  mesh_guardrails: "istio-default"`,
    topics: ["Kubernetes", "Istio", "Fleet Operations"],
  },
  {
    date: "Jan 10, 2026",
    title:
      "Cloud Consolidation After Acquisitions: A Strategy for Speed Without Chaos",
    summary:
      "Bringing acquired estates into a shared cloud foundation is one of the highest-risk engineering transformations. This post presents a domain-by-domain migration strategy for Azure/on-prem to GCP environments.",
    deepDive:
      "The core approach is to align migration waves to business criticality and operational maturity, not org charts. I cover baseline hardening, service dependency mapping, and identity boundary normalization before workload cutover. This sequencing reduced avoidable incidents and made change impact easier to explain to executives.",
    snippet: `consolidation_plan:
  estates: ["azure", "on-prem"]
  target: "gcp"
  wave_input:
    - business_criticality
    - dependency_risk
    - team_readiness
  outcome: "predictable cutovers"`,
    topics: ["Cloud Migration", "M&A", "Execution Strategy"],
  },
  {
    date: "Jan 27, 2026",
    title:
      "Operationalizing Cloud IAM and Compliance Evidence Without Slowing Engineers",
    summary:
      "Security and speed do not have to be tradeoffs. I discuss an operating system for cloud IAM enforcement, access review cadence, and evidence collection that supports SOC2/FedRAMP-style expectations while keeping delivery fluid.",
    deepDive:
      "The foundation is clear ownership boundaries across Security, IT, and infrastructure teams, plus automated workflows for approvals and provisioning. I share how to design high-throughput request handling with auditable outcomes and minimal human bottlenecks. Compliance posture improves when controls are built into everyday engineering paths.",
    snippet: `iam_ops:
  policy_enforcement: "automated"
  access_reviews: "scheduled"
  audit_evidence: "continuous export"
  csp_scope: [AWS, Azure, GCP]`,
    topics: ["Cloud IAM", "Compliance", "Security Operations"],
  },
  {
    date: "Feb 9, 2026",
    title:
      "AI Agents for Alert Remediation: Design Patterns That Actually Work in Production",
    summary:
      "I share lessons from organizing an internal AI hackathon focused on alert remediation agents, including where automation creates leverage and where human control remains non-negotiable.",
    deepDive:
      "The strongest results came from constrained agents with deterministic inputs and explicit escalation boundaries. Instead of pursuing fully autonomous response, we targeted triage acceleration, dependency correlation, and recommendation generation. This returned engineering time to roadmap work while preserving safety in high-impact systems.",
    snippet: `agent_runbook:
  trigger: "high-confidence alert"
  actions:
    - gather_context
    - correlate_dependencies
    - propose_mitigation
  human_gate: "required-before-exec"`,
    topics: ["AI Agents", "Incident Automation", "Operations"],
  },
  {
    date: "Feb 20, 2026",
    title:
      "Translating Reliability into Business Language: Scorecards for Executive Decisions",
    summary:
      "Reliability work gets funded when leaders can connect engineering metrics to customer and revenue outcomes. This post provides a scorecard framework that links SLO posture to business risk and planning cycles.",
    deepDive:
      "I detail a concise review format for leadership meetings: service reliability deltas, unresolved risk concentration, and mitigations with expected business effect. The goal is a shared operating vocabulary between engineering and business teams, so prioritization remains crisp even during periods of rapid growth.",
    snippet: `exec_scorecard:
  reliability_index: "weekly"
  top_risks:
    - customer_impact_projection
    - recovery_confidence
  decision_output: "fund / defer / mitigate"`,
    topics: ["Leadership", "SLOs", "Business Impact"],
  },
];

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

  const machineContext = `profile:
  name: "Theo (Thiyagarajan Anandan)"
  role: "Sr. Engineering Manager"
  org_scope: "50+ engineers + managers"
  focus:
    - observability operating model
    - cloud infrastructure automation
    - kubernetes reliability at scale
  leadership_axes:
    - technical depth
    - org capability building
    - cross-functional execution`;

  const machineExecution = `operations:
  tool_consolidation: "17 -> 1"
  cloud_consolidation:
    source: ["azure", "on-prem"]
    target: "gcp"
  runtime:
    orchestrator: "kubernetes"
    mesh: "istio"
    slos: "owned and reviewed"`;

  const machineSecurity = `security_infra_ops:
  iam_policy_enforcement: true
  account_provisioning: "automated workflows"
  compliance_evidence: "continuous"
  audit_logging_pipeline: "reliable ingestion"
  partners: ["security", "it", "engineering"]
  vendor_relationships:
    - "strategic alignment"
    - "roadmap influence"
    - "cost-value optimization"`;

  const machinePeople = `leadership:
  retention_strategy: "high-trust ownership"
  internship_conversion: "90%"
  team_growth_example: "3 -> 18"
  manager_enablement: "strong operating cadence"
  community:
    - "Datadog CAB"
    - "Founder, Voyagers ERG"`;

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
              Blogs
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
              <span className={mode === "human" ? "text-ink" : "text-muted"}>
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
              <span className={mode === "machine" ? "text-ink" : "text-muted"}>
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
            Leading resilient infrastructure organizations with technical depth and execution discipline.
          </h1>
          <p className="mx-auto max-w-2xl text-lg leading-8 text-muted">
            Sr. Engineering Manager at Uber Freight, leading 50+ engineers and managers
            across observability operations, Kubernetes reliability, cloud consolidation
            after acquisitions, and long-horizon organizational growth.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="#case-studies"
              className="focus-ring rounded-full border border-accent bg-accent px-5 py-2.5 text-sm font-medium text-bg"
            >
              Explore Case Studies
            </a>
            <a
              href="#writing"
              className="focus-ring rounded-full border border-line px-5 py-2.5 text-sm text-ink"
            >
              Read Long-form Blogs
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
          <h2 className="text-2xl font-semibold tracking-tight">What I Drive</h2>
          {mode === "human" ? (
            <div className="space-y-3">
              <details className="rounded-xl border border-line bg-panel/40 p-4">
                <summary className="cursor-pointer text-base font-medium">
                  Observability Operations at High Tempo
                </summary>
                <p className="mt-3 text-sm leading-7 text-muted">
                  Built an operating model to reduce low-context alert noise and improve
                  incident response quality. Consolidated fragmented tooling into a single
                  observability surface with disciplined tagging, clearer ownership,
                  stronger incident command patterns, and faster diagnosis in the first
                  five minutes.
                </p>
              </details>
              <details className="rounded-xl border border-line bg-panel/40 p-4">
                <summary className="cursor-pointer text-base font-medium">
                  Cloud Infrastructure Automation and Kubernetes Reliability
                </summary>
                <p className="mt-3 text-sm leading-7 text-muted">
                  Led technical strategy for consolidating three acquisitions from Azure
                  and on-prem footprints into GCP, standardized on Kubernetes and Istio,
                  and implemented reliability guardrails for safer growth.
                </p>
              </details>
              <details className="rounded-xl border border-line bg-panel/40 p-4">
                <summary className="cursor-pointer text-base font-medium">
                  Cloud IAM, Compliance Operations, and Cross-functional Delivery
                </summary>
                <p className="mt-3 text-sm leading-7 text-muted">
                  Partnered across Security, IT, and engineering teams to make access
                  workflows, policy enforcement, and compliance evidence generation more
                  automated, auditable, and scalable while preserving developer velocity.
                  Worked closely with strategic vendors to align roadmap, reliability
                  outcomes, and total-cost goals.
                </p>
              </details>
              <details className="rounded-xl border border-line bg-panel/40 p-4">
                <summary className="cursor-pointer text-base font-medium">
                  Organizational Growth and Talent Systems
                </summary>
                <p className="mt-3 text-sm leading-7 text-muted">
                  Built a high-trust culture with strong manager-engineer operating loops,
                  retained top talent, established manager enablement rhythms, and launched
                  an internship program with a 90% conversion rate.
                </p>
              </details>
            </div>
          ) : (
            <div className="space-y-4">
              <MachineBlock title="profile.yaml" content={machineContext} />
              <MachineBlock title="execution.yaml" content={machineExecution} />
              <MachineBlock title="security_ops.yaml" content={machineSecurity} />
              <MachineBlock title="leadership.yaml" content={machinePeople} />
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
              metric="99.95% Reliability Governance"
              operational="SLO-driven execution with clearer ownership and incident pathways."
              business="Higher customer confidence and reduced operational volatility."
            />
            <OutcomePanel
              metric="Acquisition Infrastructure Unification"
              operational="Consistent runtime and controls across inherited cloud estates."
              business="Lower operational complexity and better engineering focus on roadmap work."
            />
            <OutcomePanel
              metric="Observability Operating Model"
              operational="Unified dashboards, monitors, and tagging across service domains."
              business="Faster issue detection and stronger alignment with partner teams."
            />
            <OutcomePanel
              metric="People, Vendor, and Operating Systems"
              operational="Manager development loops, executive communication, and vendor alignment."
              business="Stronger retention, better investment decisions, and sustained delivery quality."
            />
          </div>
          <ReliabilitySignal />
        </motion.section>

        <motion.section
          id="role-fit"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariant}
          className="space-y-6 border-b border-line py-12"
        >
          <h2 className="text-2xl font-semibold tracking-tight">
            Leadership Footprint
          </h2>
          <div className="space-y-4">
            <article className="space-y-2 rounded-xl border border-line bg-panel/40 p-5">
              <p className="font-mono text-sm text-accent">Engineering Manager, Observability</p>
              <p className="text-sm text-muted">
                Strong match on metrics ownership, observability roadmap execution,
                operational rigor, and internal stakeholder management across high-traffic systems.
              </p>
            </article>
            <article className="space-y-2 rounded-xl border border-line bg-panel/40 p-5">
              <p className="font-mono text-sm text-accent">Sr. Manager, Production Engineering</p>
              <p className="text-sm text-muted">
                Proven leadership on cloud operations, cross-functional delivery, and
                process automation required for reliable IAM, provisioning, compliance readiness,
                and strategic vendor collaboration.
              </p>
            </article>
            <article className="space-y-2 rounded-xl border border-line bg-panel/40 p-5">
              <p className="font-mono text-sm text-accent">
                Engineering Manager, Cloud Infrastructure Automation
              </p>
              <p className="text-sm text-muted">
                Deep execution in Kubernetes lifecycle management, reliability goals,
                infrastructure automation, and reducing toil through system guardrails
                with strong people management at org scale.
              </p>
            </article>
          </div>
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
          <motion.div
            variants={staggerVariant}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="space-y-5"
          >
            <motion.article
              variants={itemVariant}
              className="space-y-3 rounded-xl border border-line bg-panel/40 p-5"
            >
              <div className="flex items-center gap-2 text-sm text-accent">
                <Cloud size={16} />
                Observability Consolidation and Incident Clarity
              </div>
              <p className="text-sm text-muted">
                Consolidated 17 tools into Datadog, standardized tagging, and improved
                first-response clarity so engineers could identify likely failure domains faster.
              </p>
              <ArchitectureFlow />
              <OutcomePanel
                metric="Business Impact"
                operational="Unified observability workflows with stronger operational context."
                business="Lower diagnosis latency and better cross-team incident communication."
              />
            </motion.article>
            <motion.article
              variants={itemVariant}
              className="space-y-3 rounded-xl border border-line bg-panel/40 p-5"
            >
              <div className="flex items-center gap-2 text-sm text-accent">
                <Cpu size={16} />
                Multi-Cloud Consolidation to Kubernetes Runtime Standards
              </div>
              <p className="text-sm text-muted">
                Defined migration strategy to unify Azure/on-prem estates into GCP with
                consistent Kubernetes and Istio operating practices.
              </p>
              <OutcomePanel
                metric="Business Impact"
                operational="Reduced infrastructure variance and tightened reliability baselines."
                business="Faster integration after acquisitions and cleaner execution planning."
              />
            </motion.article>
            <motion.article
              variants={itemVariant}
              className="space-y-3 rounded-xl border border-line bg-panel/40 p-5"
            >
              <div className="flex items-center gap-2 text-sm text-accent">
                <Users size={16} />
                Leadership Systems and Talent Multipliers
              </div>
              <p className="text-sm text-muted">
                Built high-trust manager and mentorship loops, improved retention, and scaled
                early-career pathways with measurable conversion outcomes.
              </p>
              <OutcomePanel
                metric="Business Impact"
                operational="Stronger execution continuity through resilient org design."
                business="Sustained delivery quality during high-change periods."
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
          <h2 className="text-2xl font-semibold tracking-tight">Blogs</h2>
          <p className="text-sm leading-7 text-muted">
            Long-form essays published from November 2025 through February 2026 on
            observability, cloud infrastructure operations, leadership systems, and AI-driven reliability.
          </p>
          <motion.div
            variants={staggerVariant}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="space-y-5"
          >
            {blogPosts.map((post) => (
              <motion.article
                key={post.title}
                variants={itemVariant}
                className="space-y-4 rounded-xl border border-line bg-panel/40 p-5"
              >
                <p className="text-xs uppercase tracking-[0.12em] text-muted">{post.date}</p>
                <h3 className="text-xl font-semibold tracking-tight">{post.title}</h3>
                <p className="text-sm leading-7 text-muted">{post.summary}</p>
                <details className="rounded-lg border border-line bg-panel/70 p-4">
                  <summary className="cursor-pointer text-sm font-medium text-ink">
                    Expand technical depth
                  </summary>
                  <p className="mt-3 text-sm leading-7 text-muted">{post.deepDive}</p>
                  <pre className="mt-3 overflow-x-auto rounded-lg border border-line bg-black/30 p-4 text-xs text-[#d7f9ef]">
                    <code>{post.snippet}</code>
                  </pre>
                </details>
                <div className="flex flex-wrap gap-2">
                  {post.topics.map((topic) => (
                    <span
                      key={topic}
                      className="rounded-full border border-line bg-panel px-2.5 py-1 text-xs text-muted"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </motion.article>
            ))}
          </motion.div>
        </motion.section>

        <motion.section
          id="appearances"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariant}
          className="space-y-6 py-12"
        >
          <h2 className="text-2xl font-semibold tracking-tight">Public Appearances</h2>
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
                Datadog Summit 2025 Keynote: Large-Scale Observability and M&amp;A Infrastructure Consolidation
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
              Long-form Blogs
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
