import { cn } from "@/lib/utils";
import { ReactNode, HTMLAttributes } from "react";

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  glow?: boolean;
  hover?: boolean;
}

export const GlassCard = ({ children, className, glow, hover, ...props }: GlassCardProps) => {
  return (
    <div
      className={cn(
        "glass rounded-2xl p-6 transition-all duration-500",
        hover && "hover:-translate-y-1 hover:border-primary/40 hover:shadow-glow-mint",
        glow && "shadow-glow-mint",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};
