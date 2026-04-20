import { Link } from "react-router-dom";
import { Sparkles, Github, Twitter, Linkedin } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="relative border-t border-border/50 mt-32">
      <div className="container py-16">
        <div className="grid md:grid-cols-5 gap-12">
          <div className="md:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="bg-background rounded-lg p-1.5 border border-primary/30">
                <Sparkles className="h-5 w-5 text-primary" />
              </div>
              <span className="font-display font-bold text-lg">AgentXR</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
              The AI agentic CMS that writes, optimizes, and publishes content autonomously.
            </p>
            <div className="flex gap-3">
              {[Github, Twitter, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="h-9 w-9 rounded-full glass flex items-center justify-center hover:border-primary/50 hover:text-primary transition-all"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {[
            { title: "Product", links: ["Features", "Pricing", "Use Cases", "Docs"] },
            { title: "Company", links: ["About", "Blog", "Careers", "Contact"] },
            { title: "Legal", links: ["Privacy", "Terms", "Security", "DPA"] },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="font-display font-semibold text-sm mb-4">{col.title}</h4>
              <ul className="space-y-3">
                {col.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground font-mono">© 2026 AgentXR // ALL SYSTEMS OPERATIONAL</p>
          <p className="text-xs text-muted-foreground">Built with Abdul Rehman.</p>
        </div>
      </div>
    </footer>
  );
};
