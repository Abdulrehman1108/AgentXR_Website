import { motion } from "framer-motion";
import {
  FileText, Plus, Search, Filter, MoreHorizontal, Eye, TrendingUp,
  Star, Clock, Tag, ChevronDown, Sparkles,
} from "lucide-react";
import { Scene3D } from "@/components/three/Scene3D";
import { ContentScene } from "@/components/three/ContentScene";
import { GlassCard } from "@/components/GlassCard";
import { NeonButton } from "@/components/NeonButton";
import { DashboardSidebar, DashboardTopbar } from "./Dashboard";

const articles = [
  { title: "The future of agentic CMS platforms", status: "Published", views: "12.4k", score: 96, date: "Apr 24", tags: ["AI", "CMS"], starred: true },
  { title: "How AI agents are reshaping SEO", status: "In review", views: "—", score: 92, date: "Apr 22", tags: ["SEO"], starred: false },
  { title: "10 ways to scale your content team", status: "Draft", views: "—", score: 88, date: "Apr 20", tags: ["Strategy"], starred: false },
  { title: "Headless vs agentic: a comparison", status: "Published", views: "8.1k", score: 94, date: "Apr 18", tags: ["AI", "Headless"], starred: true },
  { title: "Multilingual publishing with LLMs", status: "Published", views: "5.7k", score: 91, date: "Apr 15", tags: ["LLM", "i18n"], starred: false },
  { title: "Programmatic SEO at scale", status: "Draft", views: "—", score: 85, date: "Apr 12", tags: ["SEO", "Automation"], starred: false },
];

const statusColor = (s: string) =>
  s === "Published" ? "bg-primary/10 text-primary border border-primary/20" :
  s === "In review" ? "bg-secondary/10 text-secondary border border-secondary/20" :
  "bg-muted text-muted-foreground border border-border";

const filters = ["All", "Published", "In review", "Draft"];

const Content = () => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <Scene3D fixed className="opacity-20">
        <ContentScene />
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
              <FileText className="h-3.5 w-3.5" />
              Content Library
            </div>
            <h1 className="text-4xl font-display font-bold">
              Your{" "}
              <span className="gradient-text text-glow">Content</span>
            </h1>
            <p className="text-muted-foreground mt-2 text-sm">
              Manage, track, and optimize all your AI-generated articles.
            </p>
          </div>
          <NeonButton>
            <Plus className="h-4 w-4" /> New Article
          </NeonButton>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { label: "Total Articles", value: "1,284", icon: FileText, color: "text-primary" },
            { label: "Total Views", value: "2.4M", icon: Eye, color: "text-secondary" },
            { label: "Avg SEO Score", value: "94", icon: TrendingUp, color: "text-accent" },
            { label: "Starred", value: "38", icon: Star, color: "text-yellow-400" },
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

        {/* Filter & Search */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap items-center gap-3"
        >
          <div className="relative flex-1 min-w-[200px] max-w-sm">
            <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              placeholder="Search articles…"
              className="w-full glass rounded-full pl-10 pr-4 py-2.5 text-sm bg-input/50 outline-none focus:border-primary/60 transition-all"
            />
          </div>
          {filters.map((f) => (
            <button
              key={f}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                f === "All" ? "bg-primary/20 text-primary border border-primary/30" : "glass text-muted-foreground hover:text-foreground hover:border-primary/20"
              }`}
            >
              {f}
            </button>
          ))}
          <button className="glass rounded-full px-4 py-2 text-sm flex items-center gap-2 text-muted-foreground hover:text-foreground transition-all">
            <Filter className="h-3.5 w-3.5" /> Filter <ChevronDown className="h-3 w-3" />
          </button>
        </motion.div>

        {/* Articles table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
        >
          <GlassCard className="overflow-hidden p-0">
            <div className="px-6 py-4 border-b border-border/50 flex items-center justify-between">
              <h3 className="font-display font-semibold">All Articles</h3>
              <span className="text-xs text-muted-foreground font-mono">{articles.length} results</span>
            </div>
            <div className="divide-y divide-border/30">
              {articles.map((a, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + i * 0.04 }}
                  className="group flex items-center gap-4 px-6 py-4 hover:bg-primary/5 transition-all cursor-pointer"
                >
                  <button className={`shrink-0 ${a.starred ? "text-yellow-400" : "text-muted-foreground/30 hover:text-yellow-400/60"} transition-colors`}>
                    <Star className="h-4 w-4" fill={a.starred ? "currentColor" : "none"} />
                  </button>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium truncate group-hover:text-primary transition-colors">{a.title}</div>
                    <div className="flex items-center gap-3 mt-1.5 flex-wrap">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-mono ${statusColor(a.status)}`}>{a.status}</span>
                      {a.tags.map((t) => (
                        <span key={t} className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Tag className="h-3 w-3" />{t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="hidden md:flex items-center gap-6 text-sm text-muted-foreground shrink-0">
                    <span className="flex items-center gap-1.5"><Eye className="h-3.5 w-3.5" />{a.views}</span>
                    <span className="flex items-center gap-1.5 font-mono"><TrendingUp className="h-3.5 w-3.5 text-primary" />{a.score}</span>
                    <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" />{a.date}</span>
                  </div>
                  <button className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-foreground">
                    <MoreHorizontal className="h-4 w-4" />
                  </button>
                </motion.div>
              ))}
            </div>
          </GlassCard>
        </motion.div>

        {/* Quick actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="grid sm:grid-cols-3 gap-4"
        >
          {[
            { icon: Sparkles, label: "Spawn Writer Agent", desc: "Draft a new article with AI" },
            { icon: TrendingUp, label: "SEO Audit", desc: "Refresh top-performing pages" },
            { icon: FileText, label: "Bulk Export", desc: "Export to CMS or Markdown" },
          ].map((q) => (
            <GlassCard key={q.label} hover className="cursor-pointer group">
              <div className="flex items-center gap-3 mb-1.5">
                <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-all">
                  <q.icon className="h-4 w-4 text-primary" />
                </div>
                <span className="font-semibold text-sm">{q.label}</span>
              </div>
              <p className="text-xs text-muted-foreground ml-9">{q.desc}</p>
            </GlassCard>
          ))}
        </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Content;
