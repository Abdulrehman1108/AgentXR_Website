import { motion } from "framer-motion";
import {
  Sparkles, Plus, Play, Pause, RotateCcw, Zap, Brain,
  Globe, FileText, TrendingUp, Clock, MoreHorizontal, Activity,
} from "lucide-react";
import { Scene3D } from "@/components/three/Scene3D";
import { AgentsScene } from "@/components/three/AgentsScene";
import { GlassCard } from "@/components/GlassCard";
import { NeonButton } from "@/components/NeonButton";
import { DashboardSidebar, DashboardTopbar } from "./Dashboard";

const agents = [
  {
    name: "Writer",
    desc: "Drafts long-form articles based on briefs",
    icon: FileText,
    status: "running",
    color: "text-primary",
    glow: "shadow-[0_0_20px_hsl(156_100%_60%/0.4)]",
    tasks: 12,
    uptime: "99.8%",
    lastRun: "2 min ago",
  },
  {
    name: "SEO Optimizer",
    desc: "Refreshes keywords and meta descriptions",
    icon: TrendingUp,
    status: "running",
    color: "text-secondary",
    glow: "shadow-[0_0_20px_hsl(200_100%_62%/0.4)]",
    tasks: 8,
    uptime: "97.4%",
    lastRun: "8 min ago",
  },
  {
    name: "Translator",
    desc: "Localizes content into 40+ languages",
    icon: Globe,
    status: "idle",
    color: "text-accent",
    glow: "shadow-[0_0_20px_hsl(270_80%_65%/0.3)]",
    tasks: 5,
    uptime: "99.1%",
    lastRun: "25 min ago",
  },
  {
    name: "Publisher",
    desc: "Schedules and deploys content to CMS",
    icon: Zap,
    status: "running",
    color: "text-yellow-400",
    glow: "shadow-[0_0_20px_hsl(48_100%_50%/0.3)]",
    tasks: 4,
    uptime: "98.6%",
    lastRun: "1 hr ago",
  },
  {
    name: "Analyst",
    desc: "Tracks performance and surfaces insights",
    icon: Activity,
    status: "idle",
    color: "text-primary",
    glow: "shadow-[0_0_20px_hsl(156_100%_60%/0.3)]",
    tasks: 3,
    uptime: "96.9%",
    lastRun: "3 hrs ago",
  },
  {
    name: "Workflow",
    desc: "Orchestrates multi-agent pipelines",
    icon: Brain,
    status: "running",
    color: "text-secondary",
    glow: "shadow-[0_0_20px_hsl(200_100%_62%/0.35)]",
    tasks: 7,
    uptime: "99.5%",
    lastRun: "5 min ago",
  },
];

const StatusBadge = ({ status }: { status: string }) =>
  status === "running" ? (
    <span className="flex items-center gap-1.5 text-xs text-primary font-mono">
      <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse inline-block" />
      Running
    </span>
  ) : (
    <span className="flex items-center gap-1.5 text-xs text-muted-foreground font-mono">
      <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground inline-block" />
      Idle
    </span>
  );

const Agents = () => {
  const running = agents.filter((a) => a.status === "running").length;

  return (
    <div className="min-h-screen relative overflow-hidden">
      <Scene3D fixed className="opacity-20">
        <AgentsScene />
      </Scene3D>

      <div className="relative z-10 flex">
        <DashboardSidebar />
        <div className="flex-1 min-w-0">
          <DashboardTopbar />
          <div className="p-6 lg:p-8 space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap items-end justify-between gap-4"
        >
          <div>
            <div className="flex items-center gap-2 text-primary text-xs font-mono uppercase tracking-widest mb-2">
              <Sparkles className="h-3.5 w-3.5 animate-pulse" />
              Agent Network
            </div>
            <h1 className="text-4xl font-display font-bold">
              Your{" "}
              <span className="gradient-text text-glow">Agents</span>
            </h1>
            <p className="text-muted-foreground mt-2 text-sm">
              Deploy and monitor your AI workforce in real time.
            </p>
          </div>
          <NeonButton>
            <Plus className="h-4 w-4" /> New Agent
          </NeonButton>
        </motion.div>

        {/* Status cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { label: "Total Agents", value: agents.length, icon: Brain, color: "text-primary" },
            { label: "Running", value: running, icon: Activity, color: "text-green-400" },
            { label: "Tasks Today", value: "412", icon: Zap, color: "text-secondary" },
            { label: "Avg Uptime", value: "98.6%", icon: Clock, color: "text-accent" },
          ].map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 + i * 0.05 }}>
              <GlassCard className="flex items-center gap-4 p-4">
                <div className={`p-2.5 rounded-xl bg-current/10 ${s.color}`}>
                  <s.icon className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-2xl font-display font-bold">{s.value}</div>
                  <div className="text-xs text-muted-foreground font-mono uppercase tracking-wider">{s.label}</div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>

        {/* Agent grid */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
          {agents.map((agent, i) => (
            <motion.div
              key={agent.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.08 }}
            >
              <GlassCard hover className={`group relative overflow-hidden ${agent.status === "running" ? agent.glow : ""} transition-all duration-500`}>
                {/* Animated background for running agents */}
                {agent.status === "running" && (
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                )}

                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`p-3 rounded-xl bg-current/10 ${agent.color} ${agent.status === "running" ? "animate-pulse" : ""}`}>
                        <agent.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="font-display font-semibold">{agent.name}</div>
                        <StatusBadge status={agent.status} />
                      </div>
                    </div>
                    <button className="text-muted-foreground hover:text-foreground transition-colors">
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                  </div>

                  <p className="text-sm text-muted-foreground mb-5">{agent.desc}</p>

                  <div className="grid grid-cols-3 gap-3 mb-5">
                    {[
                      { l: "Tasks", v: agent.tasks },
                      { l: "Uptime", v: agent.uptime },
                      { l: "Last run", v: agent.lastRun },
                    ].map((m) => (
                      <div key={m.l} className="glass rounded-xl p-2.5 text-center">
                        <div className="text-sm font-mono font-semibold">{m.v}</div>
                        <div className="text-xs text-muted-foreground mt-0.5">{m.l}</div>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center gap-2">
                    {agent.status === "running" ? (
                      <button className="flex-1 flex items-center justify-center gap-2 glass rounded-lg py-2 text-xs font-mono text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">
                        <Pause className="h-3.5 w-3.5" /> Pause
                      </button>
                    ) : (
                      <button className="flex-1 flex items-center justify-center gap-2 glass rounded-lg py-2 text-xs font-mono text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">
                        <Play className="h-3.5 w-3.5" /> Start
                      </button>
                    )}
                    <button className="glass rounded-lg p-2 text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">
                      <RotateCcw className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* Spawn new agent CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <GlassCard className="neon-border flex flex-col sm:flex-row items-center gap-4 justify-between p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-primary/10">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <div>
                <div className="font-display font-semibold">Deploy a custom agent</div>
                <p className="text-sm text-muted-foreground mt-0.5">Configure roles, models, memory, and tool access.</p>
              </div>
            </div>
            <NeonButton>
              <Plus className="h-4 w-4" /> Configure Agent
            </NeonButton>
          </GlassCard>
        </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Agents;
