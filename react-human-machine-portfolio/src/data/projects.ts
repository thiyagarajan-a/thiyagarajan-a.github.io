export type Project = {
  slug: string;
  title: string;
  summary: string;
  stack: string[];
  technical_hurdle: string;
  business_impact: string[];
  human_centric_result: string[];
  year: string;
};

export const projects: Project[] = [
  {
    slug: "observability-consolidation",
    title: "Observability Consolidation (17 -> 1)",
    summary:
      "Unified fragmented incident tooling into Datadog with standardized ownership tagging and on-call context.",
    stack: ["Datadog", "OpenTelemetry", "Kubernetes", "Terraform"],
    technical_hurdle:
      "Telemetry fragmentation across acquired estates created low-context alerts and slow diagnosis.",
    business_impact: [
      "Reduced incident triage latency",
      "Improved signal quality and escalation accuracy",
      "Lower operating complexity and support handoff friction",
    ],
    human_centric_result: [
      "On-call engineers gained first-5-minute clarity",
      "Business and ops teams gained self-serve visibility",
      "Engineering interruptions reduced during peak events",
    ],
    year: "2025",
  },
  {
    slug: "ma-cloud-consolidation",
    title: "Post-Acquisition Cloud Consolidation",
    summary:
      "Led migration strategy to unify Azure and on-prem estates into a consistent GCP runtime.",
    stack: ["GCP", "Kubernetes", "Istio", "CI/CD"],
    technical_hurdle:
      "Inherited environments had inconsistent runtime policies, identity boundaries, and deployment lanes.",
    business_impact: [
      "Faster integration of acquired systems",
      "More predictable reliability posture",
      "Improved delivery velocity across product teams",
    ],
    human_centric_result: [
      "Teams moved to a unified operating model",
      "Reduced cognitive overhead for service ownership",
      "Cross-functional planning became simpler and faster",
    ],
    year: "2025",
  },
  {
    slug: "ai-alert-remediation",
    title: "AI Agent Infrastructure for Alert Remediation",
    summary:
      "Drove AI hackathon initiatives focused on safe, bounded agents for triage support and remediation guidance.",
    stack: ["Datadog Bits AI", "Runbooks", "Incident Automation"],
    technical_hurdle:
      "Need to increase incident response speed without introducing unsafe automation in production paths.",
    business_impact: [
      "Reduced repetitive toil during incident response",
      "Improved recommendation quality in early incident phase",
      "Returned engineering capacity to strategic roadmap work",
    ],
    human_centric_result: [
      "Engineers retained decision authority with stronger context",
      "Newer team members ramped faster during incidents",
      "Shared language improved between technical and non-technical teams",
    ],
    year: "2026",
  },
];
