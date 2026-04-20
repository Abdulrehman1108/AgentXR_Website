import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { ArrowLeft, Sparkles } from "lucide-react";
import { useMemo } from "react";
import { Scene3D } from "@/components/three/Scene3D";
import { SignupScene } from "@/components/three/SignupScene";
import { GlassCard } from "@/components/GlassCard";
import { NeonButton } from "@/components/NeonButton";

const schema = z.object({
  name: z.string().trim().min(2, "Enter your name").max(80),
  email: z.string().trim().email("Enter a valid email").max(255),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Must include an uppercase letter")
    .regex(/[0-9]/, "Must include a number"),
  confirm: z.string(),
  terms: z.literal(true, { errorMap: () => ({ message: "You must accept the terms" }) }),
}).refine((d) => d.password === d.confirm, { message: "Passwords don't match", path: ["confirm"] });

type Vals = z.infer<typeof schema>;

const strength = (pw: string) => {
  let s = 0;
  if (pw.length >= 8) s++;
  if (/[A-Z]/.test(pw)) s++;
  if (/[0-9]/.test(pw)) s++;
  if (/[^A-Za-z0-9]/.test(pw)) s++;
  return s;
};

const Signup = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm<Vals>({
    resolver: zodResolver(schema),
    defaultValues: { terms: false as unknown as true },
  });

  const pw = watch("password") ?? "";
  const s = useMemo(() => strength(pw), [pw]);
  const labels = ["Too weak", "Weak", "Okay", "Strong", "Excellent"];

  const onSubmit = async (_v: Vals) => {
    await new Promise((r) => setTimeout(r, 700));
    toast.success("Account created — welcome to Nexus.");
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-6 py-24">
      <Scene3D fixed className="opacity-50">
        <SignupScene />
      </Scene3D>
      <div className="absolute inset-0 bg-gradient-radial pointer-events-none" />

      <Link to="/" className="absolute top-6 left-6 flex items-center gap-2 glass rounded-full px-4 py-2 text-sm hover:border-primary/50 transition-all">
        <ArrowLeft className="h-4 w-4" /> Back
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md relative z-10"
      >
        <GlassCard className="p-10 space-y-6 shadow-glow-mint">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center justify-center h-12 w-12 rounded-2xl bg-gradient-primary shadow-glow-mint mb-2">
              <Sparkles className="h-6 w-6 text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-display font-bold">Create your account</h1>
            <p className="text-sm text-muted-foreground">14-day free trial. No credit card.</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-xs font-mono uppercase tracking-widest text-muted-foreground mb-2">Name</label>
              <input {...register("name")} className="w-full glass rounded-xl px-4 py-3 bg-input/50 outline-none focus:border-primary/60 focus:shadow-glow-mint transition-all" placeholder="Ada Lovelace" />
              {errors.name && <p className="text-destructive text-xs mt-1">{errors.name.message}</p>}
            </div>
            <div>
              <label className="block text-xs font-mono uppercase tracking-widest text-muted-foreground mb-2">Email</label>
              <input {...register("email")} type="email" className="w-full glass rounded-xl px-4 py-3 bg-input/50 outline-none focus:border-primary/60 focus:shadow-glow-mint transition-all" placeholder="you@nexus.ai" />
              {errors.email && <p className="text-destructive text-xs mt-1">{errors.email.message}</p>}
            </div>
            <div>
              <label className="block text-xs font-mono uppercase tracking-widest text-muted-foreground mb-2">Password</label>
              <input {...register("password")} type="password" className="w-full glass rounded-xl px-4 py-3 bg-input/50 outline-none focus:border-primary/60 focus:shadow-glow-mint transition-all" placeholder="••••••••" />
              <div className="mt-2 flex gap-1">
                {[0, 1, 2, 3].map((i) => (
                  <div key={i} className={`h-1 flex-1 rounded-full transition-all ${i < s ? (s <= 1 ? "bg-destructive" : s <= 2 ? "bg-yellow-500" : "bg-primary") : "bg-muted"}`} />
                ))}
              </div>
              {pw && <p className="text-xs text-muted-foreground mt-1 font-mono">{labels[s]}</p>}
              {errors.password && <p className="text-destructive text-xs mt-1">{errors.password.message}</p>}
            </div>
            <div>
              <label className="block text-xs font-mono uppercase tracking-widest text-muted-foreground mb-2">Confirm</label>
              <input {...register("confirm")} type="password" className="w-full glass rounded-xl px-4 py-3 bg-input/50 outline-none focus:border-primary/60 focus:shadow-glow-mint transition-all" placeholder="••••••••" />
              {errors.confirm && <p className="text-destructive text-xs mt-1">{errors.confirm.message}</p>}
            </div>
            <label className="flex items-start gap-2 text-sm cursor-pointer">
              <input type="checkbox" {...register("terms")} className="mt-0.5 rounded border-border bg-input" />
              <span className="text-muted-foreground">
                I agree to the <a href="#" className="text-primary hover:underline">Terms</a> and <a href="#" className="text-primary hover:underline">Privacy Policy</a>.
              </span>
            </label>
            {errors.terms && <p className="text-destructive text-xs">{errors.terms.message}</p>}
            <NeonButton type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? "Creating…" : "Create account"}
            </NeonButton>
          </form>

          <p className="text-center text-sm text-muted-foreground">
            Already have an account? <Link to="/login" className="text-primary hover:underline">Sign in</Link>
          </p>
        </GlassCard>
      </motion.div>
    </div>
  );
};

export default Signup;
