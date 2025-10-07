import type { TooltipProps } from "recharts";
import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import { cn } from "@/lib/utils";

export type EnergyMixDatum = {
  name: string;
  value: number;
  color: string;
};

interface EnergyMixChartProps {
  data: EnergyMixDatum[];
  className?: string;
}

export function EnergyMixChart({ data, className }: EnergyMixChartProps) {
  const totalPercent = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className={cn("relative h-64 w-full", className)}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius={70}
            outerRadius={100}
            cornerRadius={10}
            paddingAngle={3}
          >
            {data.map((entry) => (
              <Cell key={entry.name} fill={entry.color} stroke="transparent" />
            ))}
          </Pie>
          <Tooltip content={<EnergyMixTooltip />} cursor={{ fill: "rgba(6, 119, 155, 0.08)" }} />
        </PieChart>
      </ResponsiveContainer>
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
        <p className="text-xs uppercase tracking-wider text-muted-foreground">
          Energy Mix
        </p>
        <p className="text-3xl font-semibold text-foreground">{totalPercent}%</p>
      </div>
    </div>
  );
}

function EnergyMixTooltip({ active, payload }: TooltipProps<number, string>) {
  if (!active || !payload?.length) {
    return null;
  }

  const datum = payload[0];

  if (!datum) {
    return null;
  }

  return (
    <div className="rounded-xl border border-border/60 bg-white/95 px-4 py-3 shadow-lg backdrop-blur">
      <p className="text-sm font-semibold text-foreground">{datum.name}</p>
      <p className="text-xs text-muted-foreground">{datum.value}% of current output</p>
    </div>
  );
}
