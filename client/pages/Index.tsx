import type { ComponentType } from "react";

import {
  ArrowDownRight,
  ArrowUpRight,
  BatteryCharging,
  Cloud,
  Download,
  Leaf,
  Plug,
  ShieldCheck,
  Sun,
  Wind,
} from "lucide-react";

import { EnergyForecastChart } from "@/components/dashboard/EnergyForecastChart";
import { EnergyMixChart } from "@/components/dashboard/EnergyMixChart";
import { AppLayout } from "@/components/layout/AppLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const energyMixData = [
  { name: "Solar", value: 45, color: "#00b050" },
  { name: "Wind", value: 27, color: "#06779B" },
  { name: "Battery", value: 18, color: "#174f41" },
  { name: "Grid", value: 10, color: "#6b7280" },
];

const forecastData = [
  { hour: "Now", predicted: 4.2, actual: 4.1 },
  { hour: "+3h", predicted: 4.8, actual: 4.6 },
  { hour: "+6h", predicted: 5.3, actual: 5.1 },
  { hour: "+9h", predicted: 6.1, actual: 6.4 },
  { hour: "+12h", predicted: 6.9, actual: 6.6 },
  { hour: "+18h", predicted: 6.3, actual: 6.1 },
  { hour: "+24h", predicted: 5.7, actual: 5.4 },
];

const weatherHighlights = [
  {
    icon: Sun,
    title: "Solar index",
    value: "High (82%)",
    hint: "Peak irradiance at 1:30 PM",
  },
  {
    icon: Wind,
    title: "Wind speed",
    value: "12.4 km/h",
    hint: "Turbine output increasing",
  },
  {
    icon: Cloud,
    title: "Cloud cover",
    value: "28%",
    hint: "Clearer skies after 4 PM",
  },
];

const realtimeActions = [
  {
    title: "Charge batteries between 2–4 PM",
    description: "Solar surplus expected; reserve 35% capacity for evening peak.",
    priority: "High",
    icon: BatteryCharging,
  },
  {
    title: "Shift heavy loads to morning",
    description: "Schedule cooling towers to 6 AM to leverage low grid tariff.",
    priority: "Medium",
    icon: Plug,
  },
  {
    title: "Dispatch wind energy to microgrids",
    description: "Route 24 kWh to industrial partners to maximise PPA returns.",
    priority: "Low",
    icon: Wind,
  },
];

const tradingOffers = [
  {
    id: "Offer #1024",
    description: "Sell 50 kWh solar @ ₹4/unit",
    type: "Solar",
    quantity: "50 kWh",
    rate: "₹4.00",
    status: "Live",
  },
  {
    id: "Request #547",
    description: "Buy 30 kWh wind @ ₹3.6/unit",
    type: "Wind",
    quantity: "30 kWh",
    rate: "₹3.60",
    status: "Matching",
  },
  {
    id: "Offer #1025",
    description: "Sell 15 kWh battery @ ₹5.2/unit",
    type: "Battery",
    quantity: "15 kWh",
    rate: "₹5.20",
    status: "Negotiating",
  },
];

export default function Index() {
  return (
    <AppLayout pageTitle="Dashboard Overview" subtitle="Operational Snapshot">
      <div className="space-y-8">
        <section className="rounded-3xl border border-border/60 bg-white/80 p-6 shadow-card backdrop-blur">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div>
              <Badge className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-primary">
                Unified Energy Overview
              </Badge>
              <h2 className="mt-3 text-2xl font-semibold text-foreground lg:text-3xl">
                Live kWh produced vs consumed
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                Continuous telemetry across solar, wind, battery and grid assets keeps UrjaMitra equilibrated in real-time.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              <LiveMetric
                label="Production"
                value="4.68 MWh"
                trend="+6.2%"
                icon={Sun}
                trendDirection="up"
              />
              <LiveMetric
                label="Consumption"
                value="3.92 MWh"
                trend="-1.4%"
                icon={Plug}
                trendDirection="down"
              />
              <LiveMetric
                label="Net export"
                value="+0.76 MWh"
                trend="Peak at 8:10 PM"
                icon={Leaf}
                trendDirection="flat"
              />
            </div>
          </div>
          <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-2xl border border-border/60 bg-white/70 p-5 shadow-floating">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Storage readiness
                </p>
                <p className="mt-3 text-3xl font-semibold text-foreground">76%</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Battery clusters charged and available for ramp events.
                </p>
              </div>
              <div className="rounded-2xl border border-border/60 bg-gradient-to-br from-secondary/10 via-white to-primary/10 p-5 shadow-floating">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Grid support
                </p>
                <p className="mt-3 text-3xl font-semibold text-foreground">18%</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Reserve exchange on standby to stabilise peak load.
                </p>
              </div>
              <div className="md:col-span-2 rounded-2xl border border-border/60 bg-white/70 p-5 shadow-card">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-foreground">Energy mix</p>
                  <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                    Real-time shares
                  </span>
                </div>
                <div className="mt-2 grid gap-4 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
                  <EnergyMixChart data={energyMixData} />
                  <ul className="flex flex-col justify-center gap-4">
                    {energyMixData.map((source) => (
                      <li key={source.name} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span
                            className="size-3 rounded-full"
                            style={{ backgroundColor: source.color }}
                          />
                          <p className="text-sm font-medium text-foreground">{source.name}</p>
                        </div>
                        <p className="text-sm font-semibold text-muted-foreground">
                          {source.value}%
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="grid gap-8 xl:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
          <section className="rounded-3xl border border-border/60 bg-white/80 p-6 shadow-card backdrop-blur">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <Badge className="rounded-full border border-secondary/20 bg-secondary/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-secondary">
                  Smart Energy Forecaster
                </Badge>
                <h2 className="mt-3 text-2xl font-semibold text-foreground lg:text-3xl">
                  Predicted vs actual energy (next 24 hours)
                </h2>
              </div>
              <div className="flex items-center gap-3 rounded-2xl border border-border/60 bg-white/70 px-4 py-3 shadow-sm">
                <ShieldCheck className="size-5 text-primary" />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Forecast accuracy
                  </p>
                  <p className="text-sm font-semibold text-foreground">96.4%</p>
                </div>
              </div>
            </div>
            <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
              <div className="rounded-2xl border border-border/60 bg-white/70 p-4 shadow-inner">
                <EnergyForecastChart data={forecastData} />
              </div>
              <div className="flex flex-col justify-between gap-4 rounded-2xl border border-border/60 bg-gradient-to-br from-white via-secondary/5 to-primary/10 p-5 shadow-floating">
                <div className="space-y-4">
                  {weatherHighlights.map((highlight) => (
                    <div key={highlight.title} className="flex items-center gap-3">
                      <span className="flex size-11 items-center justify-center rounded-xl bg-white/80 text-secondary shadow-card">
                        <highlight.icon className="size-5" />
                      </span>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                          {highlight.title}
                        </p>
                        <p className="text-sm font-semibold text-foreground">{highlight.value}</p>
                        <p className="text-xs text-muted-foreground">{highlight.hint}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="rounded-2xl border border-border/50 bg-white/80 px-4 py-3 text-sm text-muted-foreground shadow-sm">
                  AI forecaster rebalances dispatch plans every 5 minutes based on live weather telemetry.
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-3xl border border-border/60 bg-white/80 p-6 shadow-card backdrop-blur">
            <div className="flex items-center justify-between">
              <div>
                <Badge className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-primary">
                  Reports &amp; Savings
                </Badge>
                <h2 className="mt-3 text-2xl font-semibold text-foreground">Monthly performance</h2>
              </div>
              <Button className="rounded-xl px-3 py-2 text-sm font-medium shadow-card" size="sm">
                <Download className="mr-2 size-4" /> Export PDF / Excel
              </Button>
            </div>
            <div className="mt-6 space-y-5">
              <div className="rounded-2xl border border-border/60 bg-white/70 p-5 shadow-floating">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Carbon saved
                </p>
                <div className="mt-2 flex items-end gap-3">
                  <p className="text-3xl font-semibold text-foreground">1,284 tons</p>
                  <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                    <ArrowUpRight className="size-3" /> 18% vs last month
                  </span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  Equivalent to offsetting 98,400 trees worth of annual emissions.
                </p>
              </div>
              <div className="rounded-2xl border border-border/60 bg-white/70 p-5 shadow-floating">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Cost savings
                </p>
                <div className="mt-2 flex items-end gap-3">
                  <p className="text-3xl font-semibold text-foreground">₹ 18.6L</p>
                  <span className="inline-flex items-center gap-1 rounded-full bg-secondary/10 px-3 py-1 text-xs font-semibold text-secondary">
                    <ArrowUpRight className="size-3" /> 12% vs last month
                  </span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  Demand response automation and P2P offsets drove peak tariff reduction.
                </p>
              </div>
              <div className="rounded-2xl border border-border/60 bg-gradient-to-br from-primary/10 via-white to-secondary/10 p-5 shadow-card">
                <p className="text-sm font-semibold text-foreground">Regulatory ready</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Consolidated audit trails and export templates match CEA and DISCOM reporting formats.
                </p>
              </div>
            </div>
          </section>
        </div>

        <div className="grid gap-8 xl:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)]">
          <section className="rounded-3xl border border-border/60 bg-white/80 p-6 shadow-card backdrop-blur">
            <div className="flex items-center justify-between">
              <div>
                <Badge className="rounded-full border border-secondary/20 bg-secondary/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-secondary">
                  Real Time Actions
                </Badge>
                <h2 className="mt-3 text-2xl font-semibold text-foreground">Operator recommendations</h2>
              </div>
            </div>
            <div className="mt-6 grid gap-4 lg:grid-cols-3">
              {realtimeActions.map((action) => (
                <div
                  key={action.title}
                  className="flex h-full flex-col gap-3 rounded-2xl border border-border/60 bg-white/70 p-5 shadow-floating"
                >
                  <span className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary shadow-card">
                    <action.icon className="size-5" />
                  </span>
                  <div className="space-y-2">
                    <p className="text-sm font-semibold text-foreground">{action.title}</p>
                    <p className="text-sm text-muted-foreground">{action.description}</p>
                  </div>
                  <div className="mt-auto flex items-center justify-between text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2 py-1 font-medium text-foreground/70">
                      Priority: {action.priority}
                    </span>
                    <span>Just now</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-3xl border border-border/60 bg-white/80 p-6 shadow-card backdrop-blur">
            <div className="flex items-center justify-between">
              <div>
                <Badge className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-primary">
                  P2P Trading
                </Badge>
                <h2 className="mt-3 text-2xl font-semibold text-foreground">Marketplace offers</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Balance local microgrids with peer-to-peer energy contracts.
                </p>
              </div>
            </div>
            <div className="mt-6 overflow-hidden rounded-2xl border border-border/60">
              <table className="min-w-full divide-y divide-border/70 text-sm">
                <thead className="bg-muted/60 text-xs uppercase tracking-wide text-muted-foreground">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold">Offer</th>
                    <th className="px-4 py-3 text-left font-semibold">Type</th>
                    <th className="px-4 py-3 text-left font-semibold">Quantity</th>
                    <th className="px-4 py-3 text-left font-semibold">Rate</th>
                    <th className="px-4 py-3 text-left font-semibold">Status</th>
                    <th className="px-4 py-3 text-right font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60 bg-white/80">
                  {tradingOffers.map((offer) => (
                    <tr key={offer.id} className="transition hover:bg-primary/5">
                      <td className="px-4 py-4">
                        <p className="font-semibold text-foreground">{offer.description}</p>
                        <p className="text-xs text-muted-foreground">{offer.id}</p>
                      </td>
                      <td className="px-4 py-4">
                        <span className="inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1 text-xs font-medium text-foreground/70">
                          {offer.type}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-foreground">{offer.quantity}</td>
                      <td className="px-4 py-4 text-foreground">{offer.rate}</td>
                      <td className="px-4 py-4">
                        <span className="inline-flex items-center gap-2 rounded-full bg-secondary/10 px-3 py-1 text-xs font-semibold text-secondary">
                          {offer.status}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm" className="rounded-xl border-secondary/50 text-secondary">
                            Buy
                          </Button>
                          <Button size="sm" className="rounded-xl bg-primary text-primary-foreground shadow-floating">
                            Sell
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
    </AppLayout>
  );
}

interface LiveMetricProps {
  label: string;
  value: string;
  trend: string;
  icon: ComponentType<{ className?: string }>;
  trendDirection: "up" | "down" | "flat";
}

function LiveMetric({ label, value, trend, icon: Icon, trendDirection }: LiveMetricProps) {
  return (
    <div className="rounded-2xl border border-border/60 bg-white/80 p-4 shadow-floating">
      <div className="flex items-center justify-between">
        <span className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Icon className="size-5" />
        </span>
        <span
          className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold"
          style={{
            backgroundColor:
              trendDirection === "up"
                ? "rgba(0, 176, 80, 0.12)"
                : trendDirection === "down"
                  ? "rgba(255, 99, 71, 0.12)"
                  : "rgba(6, 119, 155, 0.12)",
            color:
              trendDirection === "up"
                ? "#00b050"
                : trendDirection === "down"
                  ? "#dc2626"
                  : "#06779B",
          }}
        >
          {trendDirection === "up" ? (
            <ArrowUpRight className="size-3" />
          ) : trendDirection === "down" ? (
            <ArrowDownRight className="size-3" />
          ) : (
            <ShieldCheck className="size-3" />
          )}
          {trend}
        </span>
      </div>
      <p className="mt-4 text-2xl font-semibold text-foreground">{value}</p>
      <p className="text-xs uppercase tracking-wide text-muted-foreground">{label}</p>
    </div>
  );
}
