import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { Scene3D } from "@/components/three/Scene3D";
import { PricingScene } from "@/components/three/PricingScene";
import { GlassCard } from "@/components/GlassCard";
import { NeonButton } from "@/components/NeonButton";
import { SectionHeading } from "@/components/SectionHeading";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";

const tiers = [
  {
    name: "Starter", priceM: 0, priceY: 0, tag: "For solo creators",
    features: ["1 workspace", "100 articles / mo", "Writer + SEO agents", "Email support"],
    highlight: false,
  },
  {
    name: "Pro", priceM: 89, priceY: 79, tag: "For growing teams",
    features: ["5 workspaces", "Unlimited articles", "All 6 agents", "Custom brand voice", "Priority support", "API access"],
    highlight: true,
  },
  {
    name: "Enterprise", priceM: null, priceY: null, tag: "For organizations",
    features: ["Unlimited everything", "SSO + RBAC", "Dedicated agents", "SLA + DPA", "On-prem option", "CSM"],
    highlight: false,
  },
];

const Pricing = () => {
  const [yearly, setYearly] = useState(true);

  return (
    <div className="relative">
      <section className="relative pt-40 pb-12">
        <Scene3D fixed className="opacity-40">
          <PricingScene />
        </Scene3D>
        <div className="container relative z-10">
          <SectionHeading
            eyebrow="Pricing"
            title={<>Simple plans. <span className="gradient-text">Powerful agents.</span></>}
            description="Start free. Scale when you ship. Cancel anytime."
          />
          <div className="mt-10 flex justify-center">
            <div className="glass rounded-full p-1 inline-flex">
              <button
                onClick={() => setYearly(false)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${!yearly ? "bg-gradient-primary text-primary-foreground" : "text-muted-foreground"}`}
              >Monthly</button>
              <button
                onClick={() => setYearly(true)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${yearly ? "bg-gradient-primary text-primary-foreground" : "text-muted-foreground"}`}
              >Yearly <span className="text-xs ml-1 opacity-80">−12%</span></button>
            </div>
          </div>
        </div>
      </section>

      <section className="container relative z-10 grid md:grid-cols-3 gap-6 pb-16">
        {tiers.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <GlassCard
              hover
              className={`h-full space-y-6 relative ${t.highlight ? "border-primary/60 shadow-glow-mint" : ""}`}
            >
              {t.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-primary text-primary-foreground text-xs px-3 py-1 rounded-full font-semibold">
                  MOST POPULAR
                </div>
              )}
              <div>
                <h3 className="font-display text-2xl font-bold">{t.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">{t.tag}</p>
              </div>
              <div>
                {t.priceM === null ? (
                  <div className="text-5xl font-display font-bold gradient-text">Custom</div>
                ) : (
                  <>
                    <div className="text-5xl font-display font-bold">
                      ${yearly ? t.priceY : t.priceM}
                      <span className="text-base font-normal text-muted-foreground">/mo</span>
                    </div>
                    {yearly && t.priceM > 0 && (
                      <div className="text-xs text-muted-foreground mt-1">Billed annually</div>
                    )}
                  </>
                )}
              </div>
              <Link to={t.name === "Enterprise" ? "/contact" : "/signup"} className="block">
                <NeonButton variant={t.highlight ? "primary" : "outline"} className="w-full">
                  {t.name === "Enterprise" ? "Talk to sales" : "Get started"} <ArrowRight className="h-4 w-4" />
                </NeonButton>
              </Link>
              <ul className="space-y-3 pt-4 border-t border-border/50">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm">
                    <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </GlassCard>
          </motion.div>
        ))}
      </section>

      <section className="container py-24">
        <SectionHeading title={<>Frequently <span className="gradient-text">asked</span></>} />
        <GlassCard className="mt-12 max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {[
              { q: "Can I switch plans?", a: "Yes — upgrade or downgrade anytime. Changes prorate immediately." },
              { q: "What counts as an article?", a: "Any agent-generated piece over 200 words. Drafts and revisions are unlimited." },
              { q: "Do you have a free trial?", a: "Pro includes a 14-day free trial. No card required." },
              { q: "Is my data used to train models?", a: "Never. Your content and brand data are isolated and encrypted." },
              { q: "Do you offer education discounts?", a: "Yes — 50% off for accredited institutions and verified non-profits." },
            ].map((f, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger className="text-left font-display">{f.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </GlassCard>
      </section>
    </div>
  );
};

export default Pricing;
