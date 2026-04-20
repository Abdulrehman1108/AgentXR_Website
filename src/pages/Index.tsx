import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight, Sparkles, Zap, Brain, FileText, BarChart3, Globe2,
  Workflow, Check, Star,
} from "lucide-react";
import { Scene3D } from "@/components/three/Scene3D";
import { HomeScene } from "@/components/three/HomeScene";
import { NeonButton } from "@/components/NeonButton";
import { GlassCard } from "@/components/GlassCard";
import { SectionHeading } from "@/components/SectionHeading";

const features = [
  { icon: Brain, title: "Strategy Agent", desc: "Plans editorial calendars and content roadmaps from a single brief." },
  { icon: FileText, title: "Writer Agent", desc: "Drafts long-form articles in your brand voice with cited sources." },
  { icon: BarChart3, title: "SEO Agent", desc: "Optimizes pages continuously based on real-time SERP signals." },
  { icon: Globe2, title: "Translator Agent", desc: "Localizes content into 40+ languages with cultural nuance." },
  { icon: Workflow, title: "Workflow Agent", desc: "Routes drafts through review, legal, and publishing autonomously." },
  { icon: Zap, title: "Publisher Agent", desc: "Schedules, distributes, and refreshes content across every channel." },
];

const stats = [
  { v: "12M+", l: "Articles published" },
  { v: "98.7%", l: "Quality score" },
  { v: "40+", l: "Languages" },
  { v: "8.4×", l: "Faster than manual" },
];

const Index = () => {
  return (
    <div className="relative">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center pt-28 pb-20 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="absolute inset-0 bg-gradient-radial" />
        <Scene3D className="opacity-90">
          <HomeScene />
        </Scene3D>

        <div className="container relative z-10 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 text-xs font-mono uppercase tracking-widest text-primary">
              <Sparkles className="h-3 w-3" />
              Now in private beta
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-bold leading-[1.05] tracking-tight">
              Your CMS,
              <br />
              <span className="gradient-text">Now an Agent.</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl">
              AgentXR is the first content platform where autonomous agents handle the
              writing, SEO, translation, and publishing — while you direct strategy.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/signup">
                <NeonButton size="lg">
                  Start free trial <ArrowRight className="h-4 w-4" />
                </NeonButton>
              </Link>
              <Link to="/features">
                <NeonButton size="lg" variant="outline">
                  See how it works
                </NeonButton>
              </Link>
            </div>
            <div className="flex items-center gap-6 pt-4">
              <div className="flex -space-x-2">
                {[0, 1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-8 w-8 rounded-full bg-gradient-primary border-2 border-background"
                  />
                ))}
              </div>
              <div className="text-sm text-muted-foreground">
                <span className="text-foreground font-semibold">2,400+</span> teams shipping with AgentXR
              </div>
            </div>
          </motion.div>

          <div className="hidden lg:block h-[500px]" />
        </div>
      </section>

      {/* Stats */}
      <section className="container py-16">
        <GlassCard className="grid grid-cols-2 md:grid-cols-4 gap-8 p-10">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center space-y-2"
            >
              <div className="text-4xl md:text-5xl font-display font-bold gradient-text">{s.v}</div>
              <div className="text-xs uppercase tracking-widest text-muted-foreground font-mono">{s.l}</div>
            </motion.div>
          ))}
        </GlassCard>
      </section>

      {/* How it works */}
      <section className="container py-24">
        <SectionHeading
          eyebrow="The pipeline"
          title={<>From brief to published<br /><span className="gradient-text">in three moves.</span></>}
          description="Direct the strategy. Let the agents handle the rest."
        />
        <div className="grid md:grid-cols-3 gap-6 mt-16">
          {[
            { n: "01", t: "Brief", d: "Drop a goal, audience, or RSS feed. The Strategy Agent builds a plan." },
            { n: "02", t: "Generate", d: "Writer, SEO, and Translator agents collaborate on every draft." },
            { n: "03", t: "Publish", d: "Workflow agent routes for approval and ships across all channels." },
          ].map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
            >
              <GlassCard hover className="h-full space-y-4">
                <div className="font-mono text-sm text-primary">{s.n}</div>
                <h3 className="text-2xl font-display font-bold">{s.t}</h3>
                <p className="text-muted-foreground">{s.d}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features grid */}
      <section className="container py-24">
        <SectionHeading
          eyebrow="Six agents. One stack."
          title={<>A team of <span className="gradient-text">specialists</span>.</>}
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <GlassCard hover className="h-full space-y-4">
                <div className="h-12 w-12 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow-mint">
                  <f.icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-display font-semibold">{f.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Workflow diagram */}
      <section className="container py-24">
        <GlassCard className="p-12 relative overflow-hidden">
          <div className="absolute inset-0 grid-bg opacity-20" />
          <div className="relative grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <SectionHeading
                eyebrow="Agent orchestration"
                align="left"
                title={<>Agents that <span className="gradient-text">talk to each other</span>.</>}
                description="AgentXR models your editorial process as a graph of agents — each with memory, tools, and a job. They escalate to humans only when needed."
              />
              <Link to="/features">
                <NeonButton variant="outline">
                  Explore the architecture <ArrowRight className="h-4 w-4" />
                </NeonButton>
              </Link>
            </div>
            <div className="relative h-80">
              {[
                { x: "10%", y: "20%", label: "Brief" },
                { x: "50%", y: "10%", label: "Strategy" },
                { x: "85%", y: "30%", label: "Writer" },
                { x: "70%", y: "70%", label: "SEO" },
                { x: "30%", y: "75%", label: "Publisher" },
              ].map((n, i) => (
                <div
                  key={i}
                  className="absolute glass rounded-xl px-4 py-2 text-sm font-mono"
                  style={{ left: n.x, top: n.y, animation: `float ${4 + i}s ease-in-out infinite` }}
                >
                  <span className="text-primary">●</span> {n.label}
                </div>
              ))}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                <line x1="15" y1="25" x2="55" y2="15" stroke="hsl(var(--primary))" strokeWidth="0.2" strokeDasharray="1 1" opacity="0.5" />
                <line x1="55" y1="15" x2="85" y2="35" stroke="hsl(var(--primary))" strokeWidth="0.2" strokeDasharray="1 1" opacity="0.5" />
                <line x1="85" y1="35" x2="75" y2="75" stroke="hsl(var(--secondary))" strokeWidth="0.2" strokeDasharray="1 1" opacity="0.5" />
                <line x1="75" y1="75" x2="35" y2="80" stroke="hsl(var(--secondary))" strokeWidth="0.2" strokeDasharray="1 1" opacity="0.5" />
              </svg>
            </div>
          </div>
        </GlassCard>
      </section>

      {/* Testimonials */}
      <section className="container py-24">
        <SectionHeading eyebrow="Loved by content teams" title={<>What teams <span className="gradient-text">are saying</span>.</>} />
        <div className="grid md:grid-cols-3 gap-6 mt-16">
          {[
            { q: "We replaced three tools with Nexus and cut publishing time by 70%.", a: "Maya Chen", r: "Head of Content, Lumen" },
            { q: "The agents actually understand our brand voice. It's uncanny.", a: "Diego Ramos", r: "Editor in Chief, Orbit" },
            { q: "Finally, a CMS built for the AI era — not retrofitted.", a: "Priya Shah", r: "CMO, Drift" },
          ].map((t, i) => (
            <GlassCard key={i} hover className="h-full space-y-4">
              <div className="flex gap-1">
                {[0, 1, 2, 3, 4].map((s) => <Star key={s} className="h-4 w-4 fill-primary text-primary" />)}
              </div>
              <p className="text-foreground leading-relaxed">"{t.q}"</p>
              <div className="pt-4 border-t border-border/50">
                <div className="font-semibold text-sm">{t.a}</div>
                <div className="text-xs text-muted-foreground">{t.r}</div>
              </div>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* Logo cloud */}
      <section className="py-16 overflow-hidden">
        <p className="text-center text-xs uppercase tracking-widest text-muted-foreground font-mono mb-8">
          Trusted by teams at
        </p>
        <div className="relative">
          <div className="flex gap-16 marquee whitespace-nowrap">
            {[...Array(2)].map((_, k) => (
              <div key={k} className="flex gap-16 items-center shrink-0">
                {["LUMEN", "ORBIT", "DRIFT", "VERTEX", "HALO", "NIMBUS", "PRISM", "QUANTUM"].map((b) => (
                  <span key={b} className="text-2xl font-display font-bold text-muted-foreground/40 hover:text-primary transition-colors">
                    {b}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Big CTA */}
      <section className="container py-24">
        <GlassCard className="relative overflow-hidden p-16 text-center">
          <div className="absolute inset-0 bg-gradient-radial" />
          <div className="relative space-y-8 max-w-2xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-display font-bold">
              Ready to <span className="gradient-text">automate</span> your content stack?
            </h2>
            <p className="text-lg text-muted-foreground">Start free. No card. Ship your first agent-written piece today.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/signup">
                <NeonButton size="lg">Start free <ArrowRight className="h-4 w-4" /></NeonButton>
              </Link>
              <Link to="/contact">
                <NeonButton size="lg" variant="outline">Talk to sales</NeonButton>
              </Link>
            </div>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground pt-4">
              {["14-day trial", "No credit card", "Cancel anytime"].map((x) => (
                <span key={x} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" /> {x}
                </span>
              ))}
            </div>
          </div>
        </GlassCard>
      </section>
    </div>
  );
};

export default Index;
