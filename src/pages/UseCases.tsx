import { useState } from "react";
import { motion } from "framer-motion";
import { ShoppingBag, Newspaper, Rocket, Briefcase, TrendingUp, Users, Globe2 } from "lucide-react";
import { Scene3D } from "@/components/three/Scene3D";
import { UseCasesScene } from "@/components/three/UseCasesScene";
import { GlassCard } from "@/components/GlassCard";
import { SectionHeading } from "@/components/SectionHeading";

const cases = [
  {
    id: "ecom", icon: ShoppingBag, label: "E-commerce",
    title: "Ship 10× more product content",
    desc: "Auto-generate product descriptions, category pages, and seasonal landing pages — localized for every market.",
    metrics: [{ v: "+340%", l: "Organic traffic" }, { v: "−72%", l: "Time to publish" }, { v: "12", l: "Languages live" }],
  },
  {
    id: "media", icon: Newspaper, label: "Media",
    title: "Publish faster than the news cycle",
    desc: "Track topics in real time. The Writer Agent drafts coverage the moment a story breaks, ready for editor review.",
    metrics: [{ v: "8 min", l: "Brief to draft" }, { v: "98%", l: "Editor approval" }, { v: "+210%", l: "Page views" }],
  },
  {
    id: "saas", icon: Rocket, label: "SaaS",
    title: "Own the long tail of search",
    desc: "Programmatic SEO at scale: thousands of comparison, integration, and template pages that actually rank.",
    metrics: [{ v: "12,400", l: "Pages live" }, { v: "#1", l: "On 800+ terms" }, { v: "4.2×", l: "Pipeline lift" }],
  },
  {
    id: "agency", icon: Briefcase, label: "Agencies",
    title: "Scale content for every client",
    desc: "Multi-workspace, multi-brand voice, white-labeled reporting. One operator runs ten accounts.",
    metrics: [{ v: "10×", l: "Client capacity" }, { v: "85%", l: "Margin gain" }, { v: "0", l: "Quality drop" }],
  },
];

const UseCases = () => {
  const [active, setActive] = useState(cases[0].id);
  const c = cases.find((x) => x.id === active)!;

  return (
    <div className="relative">
      <section className="relative pt-40 pb-12">
        <Scene3D fixed className="opacity-40">
          <UseCasesScene />
        </Scene3D>
        <div className="container relative z-10">
          <SectionHeading
            eyebrow="Use Cases"
            title={<>Built for every <span className="gradient-text">content team</span></>}
            description="From DTC brands to global media to scaling SaaS — Nexus adapts to your workflow."
          />
        </div>
      </section>

      <section className="container relative z-10 pb-24">
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {cases.map((x) => (
            <button
              key={x.id}
              onClick={() => setActive(x.id)}
              className={`glass rounded-full px-5 py-2.5 text-sm font-medium flex items-center gap-2 transition-all ${
                active === x.id ? "border-primary/60 text-primary shadow-glow-mint" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <x.icon className="h-4 w-4" />
              {x.label}
            </button>
          ))}
        </div>

        <motion.div key={active} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <GlassCard className="grid lg:grid-cols-2 gap-12 items-center p-12">
            <div className="space-y-6">
              <div className="h-14 w-14 rounded-2xl bg-gradient-primary flex items-center justify-center shadow-glow-mint">
                <c.icon className="h-7 w-7 text-primary-foreground" />
              </div>
              <h3 className="text-3xl md:text-4xl font-display font-bold">{c.title}</h3>
              <p className="text-lg text-muted-foreground leading-relaxed">{c.desc}</p>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {c.metrics.map((m, i) => (
                <GlassCard key={i} className="text-center space-y-2">
                  <div className="text-3xl md:text-4xl font-display font-bold gradient-text">{m.v}</div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground font-mono">{m.l}</div>
                </GlassCard>
              ))}
            </div>
          </GlassCard>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mt-16">
          {[
            { icon: TrendingUp, t: "Outcomes, not outputs", d: "Every metric the agent moves is measured and reported back." },
            { icon: Users, t: "Humans in the loop", d: "Approve, reject, or edit. Agents learn from every interaction." },
            { icon: Globe2, t: "Global from day one", d: "Localize, regionalize, and personalize at scale." },
          ].map((x, i) => (
            <GlassCard key={i} hover className="space-y-3">
              <x.icon className="h-8 w-8 text-primary" />
              <h4 className="font-display font-semibold text-lg">{x.t}</h4>
              <p className="text-sm text-muted-foreground">{x.d}</p>
            </GlassCard>
          ))}
        </div>
      </section>
    </div>
  );
};

export default UseCases;
