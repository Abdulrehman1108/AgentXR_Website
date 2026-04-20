import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { ArrowLeft, Sparkles, Github, Chrome } from "lucide-react";
import { Scene3D } from "@/components/three/Scene3D";
import { LoginScene } from "@/components/three/LoginScene";
import { GlassCard } from "@/components/GlassCard";
import { NeonButton } from "@/components/NeonButton";

const schema = z.object({
  email: z.string().trim().email("Enter a valid email").max(255),
  password: z.string().min(8, "Password must be at least 8 characters").max(100),
  remember: z.boolean().optional(),
});

type Vals = z.infer<typeof schema>;

const Login = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<Vals>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (_v: Vals) => {
    await new Promise((r) => setTimeout(r, 700));
    toast.success("Welcome back.");
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-6">
      <Scene3D fixed className="opacity-60">
        <LoginScene />
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
            <h1 className="text-3xl font-display font-bold">Welcome back</h1>
            <p className="text-sm text-muted-foreground">Sign in to your Nexus workspace</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button className="glass rounded-xl py-2.5 flex items-center justify-center gap-2 text-sm hover:border-primary/40 hover:text-primary transition-all">
              <Chrome className="h-4 w-4" /> Google
            </button>
            <button className="glass rounded-xl py-2.5 flex items-center justify-center gap-2 text-sm hover:border-primary/40 hover:text-primary transition-all">
              <Github className="h-4 w-4" /> GitHub
            </button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border" /></div>
            <div className="relative flex justify-center text-xs"><span className="bg-card px-3 text-muted-foreground font-mono uppercase tracking-widest">or email</span></div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-xs font-mono uppercase tracking-widest text-muted-foreground mb-2">Email</label>
              <input
                {...register("email")}
                type="email"
                className="w-full glass rounded-xl px-4 py-3 bg-input/50 outline-none focus:border-primary/60 focus:shadow-glow-mint transition-all"
                placeholder="you@nexus.ai"
              />
              {errors.email && <p className="text-destructive text-xs mt-1">{errors.email.message}</p>}
            </div>
            <div>
              <label className="block text-xs font-mono uppercase tracking-widest text-muted-foreground mb-2">Password</label>
              <input
                {...register("password")}
                type="password"
                className="w-full glass rounded-xl px-4 py-3 bg-input/50 outline-none focus:border-primary/60 focus:shadow-glow-mint transition-all"
                placeholder="••••••••"
              />
              {errors.password && <p className="text-destructive text-xs mt-1">{errors.password.message}</p>}
            </div>
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" {...register("remember")} className="rounded border-border bg-input" />
                <span className="text-muted-foreground">Remember me</span>
              </label>
              <a href="#" className="text-primary hover:underline">Forgot?</a>
            </div>
            <NeonButton type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? "Signing in…" : "Sign in"}
            </NeonButton>
          </form>

          <p className="text-center text-sm text-muted-foreground">
            New here? <Link to="/signup" className="text-primary hover:underline">Create an account</Link>
          </p>
        </GlassCard>
      </motion.div>
    </div>
  );
};

export default Login;
