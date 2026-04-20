import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Sparkles } from "lucide-react";
import { NeonButton } from "@/components/NeonButton";
import { cn } from "@/lib/utils";

const links = [
  { to: "/features", label: "Features" },
  { to: "/pricing", label: "Pricing" },
  { to: "/use-cases", label: "Use Cases" },
  { to: "/docs", label: "Docs" },
  { to: "/contact", label: "Contact" },
];

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [location.pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-500",
        scrolled ? "py-3" : "py-5",
      )}
    >
      <div className="container">
        <nav
          className={cn(
            "flex items-center justify-between rounded-full px-5 py-3 transition-all duration-500",
            scrolled ? "glass-strong" : "glass",
          )}
        >
          <Link to="/" className="flex items-center gap-2 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-primary blur-md opacity-60 group-hover:opacity-100 transition-opacity" />
              <div className="relative bg-background rounded-lg p-1.5 border border-primary/30">
                <Sparkles className="h-5 w-5 text-primary" />
              </div>
            </div>
            <span className="font-display font-bold text-lg tracking-tight">AgentXR</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {links.map((l) => {
              const active = location.pathname === l.to;
              return (
                <Link
                  key={l.to}
                  to={l.to}
                  className={cn(
                    "text-sm font-medium transition-colors relative",
                    active ? "text-primary" : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {l.label}
                  {active && (
                    <span className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-primary" />
                  )}
                </Link>
              );
            })}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Link to="/login" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Log in
            </Link>
            <Link to="/signup">
              <NeonButton size="sm">Get Started</NeonButton>
            </Link>
          </div>

          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>

        {open && (
          <div className="md:hidden mt-3 glass-strong rounded-2xl p-6 space-y-4 animate-fade-in">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="block text-base font-medium text-foreground hover:text-primary transition-colors"
              >
                {l.label}
              </Link>
            ))}
            <div className="pt-4 border-t border-border space-y-3">
              <Link to="/login" className="block text-sm text-muted-foreground">
                Log in
              </Link>
              <Link to="/signup" className="block">
                <NeonButton size="sm" className="w-full">
                  Get Started
                </NeonButton>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
