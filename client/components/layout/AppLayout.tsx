import { type ComponentType, type ReactNode, useEffect, useMemo, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Activity,
  Bell,
  CloudSun,
  FileBarChart2,
  Handshake,
  LayoutDashboard,
  Leaf,
  Menu,
  Settings,
  Sparkles,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface AppLayoutProps {
  children: ReactNode;
  pageTitle: string;
  subtitle?: string;
}

export type NavItem = {
  label: string;
  path: string;
  icon: ComponentType<{ className?: string }>;
};

export const navItems: NavItem[] = [
  { label: "Dashboard Overview", path: "/", icon: LayoutDashboard },
  { label: "Live Data", path: "/live-data", icon: Activity },
  { label: "Smart Forecaster", path: "/smart-forecaster", icon: CloudSun },
  { label: "Action Engine", path: "/action-engine", icon: Sparkles },
  { label: "Reports & Insights", path: "/reports", icon: FileBarChart2 },
  { label: "Carbon Credits", path: "/carbon-credits", icon: Leaf },
  { label: "P2P Trading", path: "/p2p-trading", icon: Handshake },
];

export function AppLayout({ children, pageTitle, subtitle }: AppLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const timer = window.setInterval(() => {
      setNow(new Date());
    }, 30_000);

    return () => window.clearInterval(timer);
  }, []);

  const { formattedDate, formattedTime } = useMemo(() => {
    const date = now.toLocaleDateString("en-IN", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });

    const time = now.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
    });

    return { formattedDate: date, formattedTime: time };
  }, [now]);

  return (
    <div className="relative flex min-h-screen bg-gradient-to-br from-background via-white to-[#e9f5f0]">
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-72 transform border-r border-sidebar-border/60 bg-sidebar-background/95 px-4 pb-10 pt-8 shadow-card backdrop-blur-lg transition-transform duration-300 lg:static lg:h-auto lg:translate-x-0 lg:px-6",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex items-center gap-3 px-2">
          <div className="flex size-11 items-center justify-center rounded-2xl bg-primary/15 text-lg font-bold text-primary">
            UM
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-muted-foreground">
              UrjaMitra
            </p>
            <p className="text-sm font-medium text-foreground/90">
              Unified Energy Command
            </p>
          </div>
        </div>
        <nav className="mt-8 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setIsSidebarOpen(false)}
                className={({ isActive }) =>
                  cn(
                    "group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-floating"
                      : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                  )
                }
              >
                <span className="flex size-10 items-center justify-center rounded-lg bg-white/40 text-primary shadow-sm ring-1 ring-border/60 transition group-hover:bg-primary/10 group-hover:text-primary-foreground">
                  <Icon className="size-5" />
                </span>
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
        <div className="mt-auto hidden rounded-2xl bg-gradient-to-br from-primary/12 via-white to-secondary/10 p-4 shadow-inner lg:block">
          <p className="text-xs font-semibold uppercase text-primary">Grid Status</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Live optimization keeps UrjaMitra balanced and efficient.
          </p>
          <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-primary/15 px-3 py-1 text-xs font-semibold text-primary">
            Stable • 98% uptime
          </div>
        </div>
      </div>

      {isSidebarOpen ? (
        <div
          className="fixed inset-0 z-30 bg-black/30 backdrop-blur-sm lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      ) : null}

      <div className="flex flex-1 flex-col lg:ml-0">
        <header className="flex flex-col gap-6 border-b border-border/70 bg-white/70 px-6 py-6 backdrop-blur-xl lg:flex-row lg:items-center lg:justify-between lg:px-10">
          <div className="flex items-start gap-4 lg:items-center">
            <Button
              variant="ghost"
              size="icon"
              className="inline-flex size-10 items-center justify-center rounded-xl border border-border/80 text-foreground shadow-sm hover:bg-muted lg:hidden"
              onClick={() => setIsSidebarOpen((prev) => !prev)}
              aria-label="Toggle navigation"
            >
              <Menu className="size-5" />
            </Button>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-secondary">
                {subtitle ?? "Energy Intelligence"}
              </p>
              <h1 className="mt-1 text-2xl font-semibold text-foreground lg:text-3xl">
                {pageTitle}
              </h1>
              <p className="mt-2 max-w-xl text-sm text-muted-foreground">
                Real-time orchestration across solar, wind, storage, and grid assets.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5">
            <div className="hidden text-right sm:block">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">
                {formattedDate}
              </p>
              <p className="text-lg font-semibold text-primary">{formattedTime}</p>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="secondary"
                size="icon"
                className="rounded-xl shadow-card"
                aria-label="Quick settings"
              >
                <Settings className="size-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="relative rounded-xl border border-border/70 shadow-sm hover:bg-muted"
                aria-label="Notifications"
              >
                <Bell className="size-5" />
                <span className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-secondary text-[10px] font-semibold text-secondary-foreground shadow-card">
                  3
                </span>
              </Button>
              <div className="flex items-center gap-3 rounded-2xl border border-border/60 bg-white/80 px-3 py-2 shadow-card">
                <div className="flex size-10 items-center justify-center rounded-xl bg-secondary text-base font-semibold text-secondary-foreground">
                  AK
                </div>
                <div className="hidden text-left sm:block">
                  <p className="text-sm font-semibold text-foreground">Anita Kapoor</p>
                  <p className="text-xs text-muted-foreground">Energy Director</p>
                </div>
              </div>
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto w-full max-w-7xl px-6 py-8 lg:px-10 lg:py-10">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
