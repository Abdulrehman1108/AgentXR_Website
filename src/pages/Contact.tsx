import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Mail, MapPin, MessageSquare, Send } from "lucide-react";
import { Scene3D } from "@/components/three/Scene3D";
import { ContactScene } from "@/components/three/ContactScene";
import { GlassCard } from "@/components/GlassCard";
import { NeonButton } from "@/components/NeonButton";
import { SectionHeading } from "@/components/SectionHeading";

const schema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(80),
  email: z.string().trim().email("Enter a valid email").max(255),
  company: z.string().trim().max(100).optional(),
  message: z.string().trim().min(10, "Tell us a bit more").max(1000, "Keep it under 1000 characters"),
});

type FormVals = z.infer<typeof schema>;

const Contact = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<FormVals>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (values: FormVals) => {
    await new Promise((r) => setTimeout(r, 800));
    toast.success("Message sent — we'll be in touch within 24h.", {
      description: `Thanks ${values.name}.`,
    });
    reset();
  };

  return (
    <div className="relative">
      <Scene3D fixed className="opacity-40">
        <ContactScene />
      </Scene3D>

      <section className="relative pt-40 pb-12">
        <div className="container">
          <SectionHeading
            eyebrow="Get in touch"
            title={<>Let's <span className="gradient-text">talk</span>.</>}
            description="Sales, partnerships, support — we read every message."
          />
        </div>
      </section>

      <section className="container relative z-10 pb-24 grid lg:grid-cols-2 gap-8">
        <GlassCard className="p-10">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Name</label>
              <input
                {...register("name")}
                className="w-full glass rounded-xl px-4 py-3 bg-input/50 outline-none focus:border-primary/60 focus:shadow-glow-mint transition-all"
                placeholder="Ada Lovelace"
              />
              {errors.name && <p className="text-destructive text-xs mt-1">{errors.name.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                {...register("email")}
                type="email"
                className="w-full glass rounded-xl px-4 py-3 bg-input/50 outline-none focus:border-primary/60 focus:shadow-glow-mint transition-all"
                placeholder="ada@example.com"
              />
              {errors.email && <p className="text-destructive text-xs mt-1">{errors.email.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Company <span className="text-muted-foreground">(optional)</span></label>
              <input
                {...register("company")}
                className="w-full glass rounded-xl px-4 py-3 bg-input/50 outline-none focus:border-primary/60 focus:shadow-glow-mint transition-all"
                placeholder="Acme Corp"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Message</label>
              <textarea
                {...register("message")}
                rows={5}
                className="w-full glass rounded-xl px-4 py-3 bg-input/50 outline-none focus:border-primary/60 focus:shadow-glow-mint transition-all resize-none"
                placeholder="Tell us about your project…"
              />
              {errors.message && <p className="text-destructive text-xs mt-1">{errors.message.message}</p>}
            </div>
            <NeonButton type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? "Sending…" : <>Send message <Send className="h-4 w-4" /></>}
            </NeonButton>
          </form>
        </GlassCard>

        <div className="space-y-6">
          {[
            { icon: Mail, t: "Email us", d: "kmani11811@gmail.com", s: "We reply within 24 hours." },
            { icon: MessageSquare, t: "Live chat", d: "Available 9am – 6pm UTC", s: "For Pro and Enterprise customers." },
            { icon: MapPin, t: "Offices", d: "Pakistan · UAE · Singapore", s: "Drop by — we'll buy the coffee." },
          ].map((b, i) => (
            <GlassCard key={i} hover className="flex items-start gap-4">
              <div className="h-12 w-12 rounded-xl bg-gradient-primary flex items-center justify-center shrink-0 shadow-glow-mint">
                <b.icon className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h4 className="font-display font-semibold text-lg">{b.t}</h4>
                <p className="text-primary font-medium">{b.d}</p>
                <p className="text-sm text-muted-foreground mt-1">{b.s}</p>
              </div>
            </GlassCard>
          ))}
          <GlassCard className="p-6">
            <div className="font-mono text-xs text-primary uppercase tracking-widest mb-2">System status</div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              <span className="text-sm">All systems operational</span>
            </div>
          </GlassCard>
        </div>
      </section>
    </div>
  );
};

export default Contact;
