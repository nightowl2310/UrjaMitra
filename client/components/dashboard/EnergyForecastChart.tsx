import type { TooltipProps } from "recharts";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { cn } from "@/lib/utils";

export type EnergyForecastDatum = {
  hour: string;
  predicted: number;
  actual: number;
};

interface EnergyForecastChartProps {
  data: EnergyForecastDatum[];
  className?: string;
}

export function EnergyForecastChart({ data, className }: EnergyForecastChartProps) {
  return (
    <div className={cn("relative h-72 w-full", className)}>
      <ResponsiveContainer>
        <LineChart data={data} margin={{ top: 20, right: 24, left: 0, bottom: 10 }}>
          <defs>
            <linearGradient id="predictedGradient" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#00b050" stopOpacity={0.3} />
              <stop offset="100%" stopColor="#00b050" stopOpacity={0.05} />
            </linearGradient>
            <linearGradient id="actualGradient" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#06779B" stopOpacity={0.35} />
              <stop offset="100%" stopColor="#06779B" stopOpacity={0.08} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="6 6" stroke="rgba(6, 119, 155, 0.15)" />
          <XAxis dataKey="hour" stroke="rgba(33, 56, 76, 0.4)" tickLine={false} axisLine={false} />
          <YAxis
            stroke="rgba(33, 56, 76, 0.4)"
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${value} kWh`}
          />
          <Tooltip content={<ForecastTooltip />} cursor={{ stroke: "rgba(0, 176, 80, 0.3)", strokeWidth: 2 }} />
          <Legend
            align="left"
            verticalAlign="top"
            height={36}
            iconType="circle"
            wrapperStyle={{ paddingBottom: 16 }}
          />
          <Line
            type="monotone"
            dataKey="predicted"
            stroke="#00b050"
            strokeWidth={3}
            dot={false}
            activeDot={{ r: 6 }}
            fill="url(#predictedGradient)"
          />
          <Line
            type="monotone"
            dataKey="actual"
            stroke="#06779B"
            strokeWidth={3}
            dot={false}
            activeDot={{ r: 6 }}
            fill="url(#actualGradient)"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

function ForecastTooltip({ active, payload, label }: TooltipProps<number, string>) {
  if (!active || !payload?.length) {
    return null;
  }

  const predicted = payload.find((item) => item.dataKey === "predicted");
  const actual = payload.find((item) => item.dataKey === "actual");

  return (
    <div className="rounded-xl border border-border/60 bg-white/95 px-4 py-3 shadow-lg backdrop-blur">
      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className="mt-1 text-sm text-foreground">
        Predicted: <span className="font-semibold text-primary">{predicted?.value} kWh</span>
      </p>
      <p className="text-sm text-foreground">
        Actual: <span className="font-semibold text-secondary">{actual?.value} kWh</span>
      </p>
    </div>
  );
}
