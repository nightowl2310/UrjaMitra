import { Link, useLocation } from "react-router-dom";

import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";

const sectionContent: Record<
  string,
  {
    title: string;
    subtitle: string;
    description: string;
    highlights: string[];
  }
> = {
  "/live-data": {
    title: "Live Data",
    subtitle: "Streaming Telemetry",
    description:
      "Connect SCADA feeds, smart meters, and edge gateways to visualise live solar, wind, battery, and grid flows.",
    highlights: [
      "Create federated device groups and alert rules",
      "Tune polling and buffering to reduce telemetry gaps",
      "Overlay asset health scores with energy output",
    ],
  },
  "/smart-forecaster": {
    title: "Smart Forecaster",
    subtitle: "Predictive Intelligence",
    description:
      "Train machine learning models using historical load, demand, and weather datasets to refine 24-hour forecasts.",
    highlights: [
      "Upload historical CSV data and weather APIs",
      "Configure feature engineering pipelines",
      "Monitor forecast accuracy KPIs in production",
    ],
  },
  "/action-engine": {
    title: "Action Engine",
    subtitle: "Automation Playbooks",
    description:
      "Define low-code automation to orchestrate demand response, storage dispatch, and P2P settlements.",
    highlights: [
      "Author grid-aware rulebooks with fallback paths",
      "Connect to BMS, PLC, or IoT controllers",
      "Schedule playbooks based on tariff windows",
    ],
  },
  "/reports": {
    title: "Reports & Insights",
    subtitle: "Regulatory & Finance",
    description:
      "Generate periodical insights, compliance-ready exports, and board-level dashboards with a single click.",
    highlights: [
      "Design configurable report templates",
      "Automate carbon compliance filings",
      "Share interactive dashboards with stakeholders",
    ],
  },
  "/carbon-credits": {
    title: "Carbon Credits",
    subtitle: "Offset Marketplace",
    description:
      "Track verifiable emission reductions, categorise projects, and sync reporting with accredited registries.",
    highlights: [
      "Integrate MRV (Measurement, Reporting, Verification) workflows",
      "Audit-ready trails for carbon accounting",
      "Simulate future offsets with scenario planning",
    ],
  },
  "/p2p-trading": {
    title: "P2P Trading",
    subtitle: "Energy Exchange",
    description:
      "Manage bilateral contracts, automate settlement rules, and optimise bids across peer-to-peer markets.",
    highlights: [
      "Instantly configure buy & sell strategies",
      "Link banking partners for swift settlement",
      "Monitor contract fulfilment and risk buffers",
    ],
  },
};

export default function SectionPlaceholder() {
  const location = useLocation();
  const content = sectionContent[location.pathname] ?? sectionContent["/live-data"];

  return (
    <AppLayout pageTitle={content.title} subtitle={content.subtitle}>
      <div className="mx-auto max-w-4xl rounded-3xl border border-border/60 bg-white/80 p-10 shadow-card backdrop-blur">
        <h2 className="text-2xl font-semibold text-foreground lg:text-3xl">
          {content.description}
        </h2>
        <p className="mt-3 text-sm text-muted-foreground">
          This space is ready for detailed workflows, analytics, and automation tailored to UrjaMitra. Share requirements to expand this module next.
        </p>
        <ul className="mt-6 space-y-3 text-sm text-foreground/80">
          {content.highlights.map((item) => (
            <li
              key={item}
              className="flex items-start gap-3 rounded-2xl border border-border/50 bg-white/70 px-5 py-4 shadow-floating"
            >
              <span className="mt-1 size-2 rounded-full bg-primary" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Button className="rounded-xl bg-primary px-6 text-primary-foreground shadow-floating" size="lg" asChild>
            <Link to="/">Back to Dashboard</Link>
          </Button>
          <p className="text-xs uppercase tracking-wide text-muted-foreground">
            Need deeper functionality here? Share the flow and we will build it next.
          </p>
        </div>
      </div>
    </AppLayout>
  );
}
