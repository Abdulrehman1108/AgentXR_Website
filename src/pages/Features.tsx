import { motion } from "framer-motion";
import { Brain, FileText, BarChart3, Globe2, Workflow, Zap, Check, X } from "lucide-react";
import { Scene3D } from "@/components/three/Scene3D";
import { FeaturesScene } from "@/components/three/FeaturesScene";
import { GlassCard } from "@/components/GlassCard";
import { SectionHeading } from "@/components/SectionHeading";

const features = [
  { icon: Brain, title: "Strategy Agent", desc: "Builds editorial calendars from goals, audience data, and competitor analysis. Adapts weekly based on performance.", points: ["Audience modeling", "Topic clustering", "Calendar automation"] },
  { icon: FileText, title: "Writer Agent", desc: "Drafts long-form content in your brand voice with verifiable citations. Outputs in markdown, MDX, or rich text.", points: ["Brand voice training", "Source citation", "Multi-format output"] },
  { icon: BarChart3, title: "SEO Agent", desc: "Continuously rewrites and updates content based on live SERP movement. No more manual audits.", points: ["Real-time SERP tracking", "Auto-refresh", "Internal linking"] },
  { icon: Globe2, title: "Translator Agent", desc: "Localizes into 40+ languages with cultural nuance, idioms, and locale-aware formatting.", points: ["40+ languages", "Cultural adaptation", "Locale formatting"] },
  { icon: Workflow, title: "Workflow Agent", desc: "Routes content through your review chain — legal, brand, exec — escalating only when uncertain.", points: ["Custom routing rules", "Smart escalation", "Audit log"] },
  { icon: Zap, title: "Publisher Agent", desc: "Schedules, syndicates, and refreshes content across web, email, and social — measuring everything.", points: ["Multi-channel publish", "Auto-refresh", "Performance loop"] },
];

const Features = () => {
  return (
    <div className="relative">
      <section className="relative pt-40 pb-20">
        <Scene3D fixed className="opacity-40">
          <FeaturesScene />
        </Scene3D>
        <div className="container relative z-10">
          <SectionHeading
            eyebrow="Features"
            title={<>Six agents. <span className="gradient-text">Infinite leverage.</span></>}
            description="Each agent is a specialist with its own memory, tools, and goals. Together they replace your content stack."
          />
        </div>
      </section>

      <section className="container space-y-32 py-16">
        {features.map((f, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className={`grid lg:grid-cols-2 gap-12 items-center ${i % 2 === 1 ? "lg:flex-row-reverse" : ""}`}
          >
            <div className={i % 2 === 1 ? "lg:order-2" : ""}>
              <GlassCard className="aspect-square relative overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 grid-bg opacity-30" />
                <div className="absolute inset-0 bg-gradient-radial" />
                <div className="relative h-32 w-32 rounded-3xl bg-gradient-primary flex items-center justify-center shadow-glow-mint animate-float">
                  <f.icon className="h-16 w-16 text-primary-foreground" />
                </div>
              </GlassCard>
            </div>
            <div className={`space-y-6 ${i % 2 === 1 ? "lg:order-1" : ""}`}>
              <div className="text-xs uppercase tracking-widest text-primary font-mono">Agent {String(i + 1).padStart(2, "0")}</div>
              <h3 className="text-4xl font-display font-bold">{f.title}</h3>
              <p className="text-lg text-muted-foreground leading-relaxed">{f.desc}</p>
              <ul className="space-y-3">
                {f.points.map((p) => (
                  <li key={p} className="flex items-center gap-3">
                    <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center">
                      <Check className="h-3 w-3 text-primary" />
                    </div>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </section>

      <section className="container py-24">
        <SectionHeading title={<>Nexus vs <span className="gradient-text">traditional CMS</span></>} />
        <GlassCard className="mt-12 overflow-hidden p-0">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-6 font-mono text-xs uppercase tracking-widest text-muted-foreground">Capability</th>
                <th className="p-6 font-display font-bold text-primary">Nexus</th>
                <th className="p-6 font-display font-bold text-muted-foreground">Traditional CMS</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Autonomous content generation", true, false],
                ["Real-time SEO optimization", true, false],
                ["Multi-language by default", true, false],
                ["Agent workflow orchestration", true, false],
                ["Headless API", true, true],
                ["Manual editorial workflow", true, true],
              ].map(([cap, n, t], i) => (
                <tr key={i} className="border-b border-border/50 last:border-0">
                  <td className="p-6">{cap}</td>
                  <td className="text-center p-6">{n ? <Check className="h-5 w-5 text-primary mx-auto" /> : <X className="h-5 w-5 text-muted-foreground/50 mx-auto" />}</td>
                  <td className="text-center p-6">{t ? <Check className="h-5 w-5 text-muted-foreground mx-auto" /> : <X className="h-5 w-5 text-muted-foreground/50 mx-auto" />}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </GlassCard>
      </section>
    </div>
  );
};

export default Features;
