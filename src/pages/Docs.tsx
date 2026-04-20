import { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Check, Book, Zap, Code2, Settings } from "lucide-react";
import { Scene3D } from "@/components/three/Scene3D";
import { DocsScene } from "@/components/three/DocsScene";
import { GlassCard } from "@/components/GlassCard";
import { SectionHeading } from "@/components/SectionHeading";

const sections = [
  { id: "intro", icon: Book, label: "Introduction" },
  { id: "quickstart", icon: Zap, label: "Quickstart" },
  { id: "agents", icon: Settings, label: "Agents API" },
  { id: "sdk", icon: Code2, label: "SDK Reference" },
];

const codeExample = `import { Nexus } from '@nexus/sdk';

const nexus = new Nexus({ apiKey: process.env.NEXUS_KEY });

// Spawn the writer agent
const draft = await nexus.agents.writer.run({
  topic: 'The future of agentic CMS',
  voice: 'expert, accessible',
  length: 1500,
});

console.log(draft.content);`;

const Docs = () => {
  const [active, setActive] = useState("intro");
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(codeExample);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative">
      <Scene3D fixed className="opacity-30">
        <DocsScene />
      </Scene3D>

      <section className="relative pt-40 pb-12">
        <div className="container">
          <SectionHeading
            eyebrow="Documentation"
            title={<>Build with <span className="gradient-text">agents.</span></>}
            description="Everything you need to integrate Nexus into your stack."
          />
        </div>
      </section>

      <section className="container relative z-10 pb-24">
        <div className="grid lg:grid-cols-[240px_1fr] gap-8">
          <aside className="lg:sticky lg:top-32 self-start">
            <GlassCard className="p-3">
              <nav className="space-y-1">
                {sections.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setActive(s.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all ${
                      active === s.id ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted/30 hover:text-foreground"
                    }`}
                  >
                    <s.icon className="h-4 w-4" />
                    {s.label}
                  </button>
                ))}
              </nav>
            </GlassCard>
          </aside>

          <motion.article
            key={active}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-8"
          >
            <GlassCard className="p-10 space-y-6">
              <div className="text-xs font-mono text-primary uppercase tracking-widest">Getting started</div>
              <h2 className="text-4xl font-display font-bold">Quickstart with Nexus</h2>
              <p className="text-muted-foreground leading-relaxed text-lg">
                Get your first agent running in under five minutes. Install the SDK, set your API key, and spawn an agent.
              </p>

              <h3 className="text-2xl font-display font-semibold pt-4">1. Install</h3>
              <div className="relative">
                <pre className="glass rounded-xl p-5 font-mono text-sm overflow-x-auto"><code className="text-primary">npm install @nexus/sdk</code></pre>
              </div>

              <h3 className="text-2xl font-display font-semibold pt-4">2. Spawn an agent</h3>
              <div className="relative">
                <pre className="glass rounded-xl p-5 font-mono text-sm overflow-x-auto"><code>{codeExample}</code></pre>
                <button
                  onClick={copy}
                  className="absolute top-3 right-3 glass rounded-lg p-2 hover:border-primary/50 transition-all"
                  aria-label="Copy code"
                >
                  {copied ? <Check className="h-4 w-4 text-primary" /> : <Copy className="h-4 w-4" />}
                </button>
              </div>

              <div className="glass rounded-xl p-5 border-l-2 border-primary">
                <div className="flex items-start gap-3">
                  <div className="text-primary text-xs font-mono uppercase tracking-widest mt-1">Tip</div>
                  <p className="text-sm text-muted-foreground">
                    All agents accept a <code className="text-primary font-mono">voice</code> parameter — pass your brand
                    voice profile ID to get on-brand output every time.
                  </p>
                </div>
              </div>

              <h3 className="text-2xl font-display font-semibold pt-4">3. Listen for events</h3>
              <p className="text-muted-foreground leading-relaxed">
                Subscribe to agent lifecycle events via webhooks or the streaming API to integrate with your workflow.
              </p>
              <pre className="glass rounded-xl p-5 font-mono text-sm overflow-x-auto"><code>nexus.on('draft.ready', (draft) =&gt; &#123;{"\n"}  console.log('Agent finished:', draft.id);{"\n"}&#125;);</code></pre>
            </GlassCard>
          </motion.article>
        </div>
      </section>
    </div>
  );
};

export default Docs;
