import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LayoutDashboard, FileText, Sparkles, Settings, LogOut, Search, Bell,
  TrendingUp, Eye, Clock, Zap, Plus, MoreHorizontal,
} from "lucide-react";
import { Scene3D } from "@/components/three/Scene3D";
import { DashboardScene } from "@/components/three/DashboardScene";
import { GlassCard } from "@/components/GlassCard";
import { NeonButton } from "@/components/NeonButton";

const kpis = [
  { l: "Articles published", v: "1,284", d: "+12.4%", icon: FileText },
  { l: "Total views", v: "2.4M", d: "+23.1%", icon: Eye },
  { l: "Avg. SEO score", v: "94", d: "+3 pts", icon: TrendingUp },
  { l: "Agent runtime", v: "412 hrs", d: "−8.2%", icon: Clock },
];

const activity = [
  { agent: "Writer", action: "Drafted article on agentic search", time: "2 min ago", color: "text-primary" },
  { agent: "SEO", action: "Refreshed 12 pages with new keywords", time: "8 min ago", color: "text-secondary" },
  { agent: "Translator", action: "Localized 'Q4 launch' to 6 languages", time: "24 min ago", color: "text-accent" },
  { agent: "Publisher", action: "Scheduled 4 posts for tomorrow", time: "1 hr ago", color: "text-primary" },
  { agent: "Workflow", action: "Routed 'Brand voice update' for review", time: "2 hrs ago", color: "text-secondary" },
];

const articles = [
  { t: "The future of agentic CMS platforms", s: "Published", v: "12.4k", score: 96 },
  { t: "How AI agents are reshaping SEO", s: "In review", v: "—", score: 92 },
  { t: "10 ways to scale your content team", s: "Draft", v: "—", score: 88 },
  { t: "Headless vs agentic: a comparison", s: "Published", v: "8.1k", score: 94 },
];

const Dashboard = () => {
  return (
    <div className="min-h-screen relative">
      <Scene3D fixed className="opacity-25">
        <DashboardScene />
      </Scene3D>

      <div className="relative z-10 flex">
        {/* Sidebar */}
        <aside className="w-60 min-h-screen glass border-r border-border/50 p-6 hidden md:flex flex-col">
          <Link to="/" className="flex items-center gap-2 mb-10">
            <div className="bg-background rounded-lg p-1.5 border border-primary/30">
              <Sparkles className="h-5 w-5 text-primary" />
            </div>
            <span className="font-display font-bold">Nexus</span>
          </Link>
          <nav className="space-y-1 flex-1">
            {[
              { icon: LayoutDashboard, l: "Overview", active: true },
              { icon: FileText, l: "Content" },
              { icon: Sparkles, l: "Agents" },
              { icon: Settings, l: "Settings" },
            ].map((i) => (
              <button
                key={i.l}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all ${
                  i.active ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted/30"
                }`}
              >
                <i.icon className="h-4 w-4" /> {i.l}
              </button>
            ))}
          </nav>
          <Link to="/" className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:bg-muted/30">
            <LogOut className="h-4 w-4" /> Sign out
          </Link>
        </aside>

        <div className="flex-1 min-w-0">
          {/* Topbar */}
          <header className="glass border-b border-border/50 px-6 py-4 flex items-center gap-4 sticky top-0 z-20">
            <div className="flex-1 max-w-md relative">
              <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                placeholder="Search content, agents, settings…"
                className="w-full glass rounded-full pl-10 pr-4 py-2 text-sm bg-input/50 outline-none focus:border-primary/60"
              />
            </div>
            <button className="glass rounded-full p-2.5 hover:border-primary/40 transition-all">
              <Bell className="h-4 w-4" />
            </button>
            <div className="h-9 w-9 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground font-semibold text-sm">
              AL
            </div>
          </header>

          <main className="p-6 lg:p-8 space-y-6">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <h1 className="text-3xl font-display font-bold">Welcome back, Ada</h1>
                <p className="text-muted-foreground text-sm mt-1">Here's what your agents shipped this week.</p>
              </div>
              <NeonButton><Plus className="h-4 w-4" /> New brief</NeonButton>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {kpis.map((k, i) => (
                <motion.div key={k.l} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
                  <GlassCard className="space-y-3">
                    <div className="flex items-center justify-between">
                      <k.icon className="h-5 w-5 text-primary" />
                      <span className="text-xs text-primary font-mono">{k.d}</span>
                    </div>
                    <div className="text-3xl font-display font-bold">{k.v}</div>
                    <div className="text-xs text-muted-foreground uppercase tracking-widest font-mono">{k.l}</div>
                  </GlassCard>
                </motion.div>
              ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              <GlassCard className="lg:col-span-2 space-y-5">
                <div className="flex items-center justify-between">
                  <h3 className="font-display font-semibold text-lg">Recent content</h3>
                  <button className="text-xs text-primary">View all</button>
                </div>
                <div className="space-y-2">
                  {articles.map((a, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-xl hover:bg-muted/20 transition-all group">
                      <div className="flex-1 min-w-0">
                        <div className="font-medium truncate">{a.t}</div>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                          <span className={`px-2 py-0.5 rounded-full font-mono ${
                            a.s === "Published" ? "bg-primary/10 text-primary" :
                            a.s === "In review" ? "bg-secondary/10 text-secondary" : "bg-muted text-muted-foreground"
                          }`}>{a.s}</span>
                          <span>{a.v} views</span>
                          <span>SEO {a.score}</span>
                        </div>
                      </div>
                      <button className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <MoreHorizontal className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </GlassCard>

              <GlassCard className="space-y-5">
                <div className="flex items-center justify-between">
                  <h3 className="font-display font-semibold text-lg">Agent activity</h3>
                  <Zap className="h-4 w-4 text-primary animate-pulse" />
                </div>
                <div className="space-y-4">
                  {activity.map((a, i) => (
                    <div key={i} className="flex items-start gap-3 text-sm">
                      <div className={`h-2 w-2 rounded-full mt-1.5 ${a.color} bg-current shrink-0`} />
                      <div className="flex-1 min-w-0">
                        <div><span className="font-mono text-xs text-primary">{a.agent}</span> <span className="text-muted-foreground">{a.action}</span></div>
                        <div className="text-xs text-muted-foreground mt-0.5">{a.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              {[
                { l: "Spawn writer agent", d: "Start a new draft" },
                { l: "Run SEO audit", d: "Refresh top pages" },
                { l: "Translate batch", d: "Localize selected" },
              ].map((q) => (
                <GlassCard key={q.l} hover className="cursor-pointer space-y-2">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-primary" />
                    <span className="font-semibold">{q.l}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{q.d}</p>
                </GlassCard>
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
