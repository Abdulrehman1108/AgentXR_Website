import { motion } from "framer-motion";
import {
  Settings as SettingsIcon, User, Bell, Shield, Globe, Palette,
  Key, Cpu, Save, ChevronRight, Moon, Sun, Check,
} from "lucide-react";
import { useState } from "react";
import { Scene3D } from "@/components/three/Scene3D";
import { SettingsScene } from "@/components/three/SettingsScene";
import { GlassCard } from "@/components/GlassCard";
import { NeonButton } from "@/components/NeonButton";
import { DashboardSidebar, DashboardTopbar } from "./Dashboard";

const sections = [
  { id: "profile", icon: User, label: "Profile" },
  { id: "notifications", icon: Bell, label: "Notifications" },
  { id: "security", icon: Shield, label: "Security" },
  { id: "ai", icon: Cpu, label: "AI & Models" },
  { id: "appearance", icon: Palette, label: "Appearance" },
  { id: "localization", icon: Globe, label: "Localization" },
  { id: "api", icon: Key, label: "API Keys" },
];

const Toggle = ({ value, onChange }: { value: boolean; onChange: () => void }) => (
  <button
    onClick={onChange}
    className={`relative w-11 h-6 rounded-full transition-all duration-300 ${value ? "bg-primary" : "bg-muted"}`}
  >
    <span
      className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform duration-300 ${value ? "translate-x-5" : "translate-x-0"}`}
    />
  </button>
);

const SettingRow = ({
  label,
  desc,
  children,
}: {
  label: string;
  desc?: string;
  children: React.ReactNode;
}) => (
  <div className="flex items-center justify-between gap-6 py-4 border-b border-border/30 last:border-0">
    <div className="flex-1 min-w-0">
      <div className="font-medium text-sm">{label}</div>
      {desc && <div className="text-xs text-muted-foreground mt-0.5">{desc}</div>}
    </div>
    <div className="shrink-0">{children}</div>
  </div>
);

const Settings = () => {
  const [active, setActive] = useState("profile");
  const [notifs, setNotifs] = useState({ email: true, push: false, weekly: true, agents: true });
  const [darkMode, setDarkMode] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <Scene3D fixed className="opacity-18">
        <SettingsScene />
      </Scene3D>

      <div className="relative z-10 flex">
        <DashboardSidebar />
        <div className="flex-1 min-w-0">
          <DashboardTopbar />
          <div className="p-6 lg:p-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-2 text-primary text-xs font-mono uppercase tracking-widest mb-2">
            <SettingsIcon className="h-3.5 w-3.5" />
            Configuration
          </div>
          <h1 className="text-4xl font-display font-bold">
            <span className="gradient-text text-glow">Settings</span>
          </h1>
          <p className="text-muted-foreground mt-2 text-sm">Customize your workspace and preferences.</p>
        </motion.div>

        <div className="flex gap-6 flex-col lg:flex-row">
          {/* Sidebar nav */}
          <motion.aside
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:w-56 shrink-0"
          >
            <GlassCard className="p-2">
              {sections.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setActive(s.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${
                    active === s.id
                      ? "bg-primary/15 text-primary border border-primary/20"
                      : "text-muted-foreground hover:bg-muted/30 hover:text-foreground"
                  }`}
                >
                  <s.icon className="h-4 w-4" />
                  {s.label}
                  {active === s.id && <ChevronRight className="h-3.5 w-3.5 ml-auto" />}
                </button>
              ))}
            </GlassCard>
          </motion.aside>

          {/* Main panel */}
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="flex-1 space-y-5"
          >
            {active === "profile" && (
              <>
                <GlassCard className="space-y-0 p-6">
                  <h3 className="font-display font-semibold mb-5">Profile Information</h3>
                  {/* Avatar */}
                  <div className="flex items-center gap-5 mb-6 pb-6 border-b border-border/30">
                    <div className="h-16 w-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-2xl font-display font-bold text-primary-foreground shadow-[0_0_30px_hsl(156_100%_60%/0.4)]">
                      AL
                    </div>
                    <div>
                      <div className="font-semibold">Ada Lovelace</div>
                      <div className="text-sm text-muted-foreground">ada@agentxr.ai</div>
                    </div>
                    <button className="ml-auto glass rounded-lg px-3 py-1.5 text-xs text-muted-foreground hover:text-primary transition-all">
                      Change
                    </button>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {[
                      { label: "First name", value: "Ada" },
                      { label: "Last name", value: "Lovelace" },
                      { label: "Email", value: "ada@agentxr.ai" },
                      { label: "Role", value: "Admin" },
                    ].map((f) => (
                      <div key={f.label}>
                        <label className="text-xs text-muted-foreground font-mono uppercase tracking-wider">{f.label}</label>
                        <input
                          defaultValue={f.value}
                          className="mt-1.5 w-full glass rounded-xl px-4 py-2.5 text-sm bg-input/40 outline-none focus:border-primary/60 transition-all"
                        />
                      </div>
                    ))}
                  </div>
                </GlassCard>
              </>
            )}

            {active === "notifications" && (
              <GlassCard className="p-6">
                <h3 className="font-display font-semibold mb-5">Notification Preferences</h3>
                <SettingRow label="Email notifications" desc="Daily digest and important alerts">
                  <Toggle value={notifs.email} onChange={() => setNotifs(p => ({ ...p, email: !p.email }))} />
                </SettingRow>
                <SettingRow label="Push notifications" desc="Browser push alerts for agent events">
                  <Toggle value={notifs.push} onChange={() => setNotifs(p => ({ ...p, push: !p.push }))} />
                </SettingRow>
                <SettingRow label="Weekly summary" desc="Performance recap every Monday">
                  <Toggle value={notifs.weekly} onChange={() => setNotifs(p => ({ ...p, weekly: !p.weekly }))} />
                </SettingRow>
                <SettingRow label="Agent activity" desc="Alerts when agents complete tasks">
                  <Toggle value={notifs.agents} onChange={() => setNotifs(p => ({ ...p, agents: !p.agents }))} />
                </SettingRow>
              </GlassCard>
            )}

            {active === "security" && (
              <GlassCard className="p-6">
                <h3 className="font-display font-semibold mb-5">Security</h3>
                <SettingRow label="Two-factor authentication" desc="Add an extra layer of security">
                  <button className="glass rounded-lg px-3 py-1.5 text-xs text-primary hover:bg-primary/10 transition-all">Enable 2FA</button>
                </SettingRow>
                <SettingRow label="Active sessions" desc="2 devices connected">
                  <button className="glass rounded-lg px-3 py-1.5 text-xs text-destructive hover:bg-destructive/10 transition-all">Revoke all</button>
                </SettingRow>
                <SettingRow label="Password" desc="Last changed 30 days ago">
                  <button className="glass rounded-lg px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground transition-all">Change</button>
                </SettingRow>
              </GlassCard>
            )}

            {active === "ai" && (
              <GlassCard className="p-6">
                <h3 className="font-display font-semibold mb-5">AI & Models</h3>
                <SettingRow label="Default model" desc="Used for all agent tasks">
                  <select className="glass rounded-lg px-3 py-1.5 text-xs bg-input/40 text-foreground outline-none">
                    <option>GPT-4o</option>
                    <option>Claude 3.5</option>
                    <option>Gemini 1.5 Pro</option>
                  </select>
                </SettingRow>
                <SettingRow label="Auto-retry on failure" desc="Retry tasks up to 3 times">
                  <Toggle value={true} onChange={() => {}} />
                </SettingRow>
                <SettingRow label="Memory enabled" desc="Agents remember past context">
                  <Toggle value={true} onChange={() => {}} />
                </SettingRow>
                <SettingRow label="Token limit per task" desc="Max tokens consumed per run">
                  <input defaultValue="4096" className="w-20 glass rounded-lg px-2 py-1.5 text-xs bg-input/40 outline-none text-center" />
                </SettingRow>
              </GlassCard>
            )}

            {active === "appearance" && (
              <GlassCard className="p-6">
                <h3 className="font-display font-semibold mb-5">Appearance</h3>
                <SettingRow label="Dark mode" desc="Use the cyber-mint dark theme">
                  <div className="flex items-center gap-2">
                    <Sun className="h-4 w-4 text-muted-foreground" />
                    <Toggle value={darkMode} onChange={() => setDarkMode(!darkMode)} />
                    <Moon className="h-4 w-4 text-primary" />
                  </div>
                </SettingRow>
                <SettingRow label="Accent color" desc="Primary brand color">
                  <div className="flex items-center gap-2">
                    {["#5EFFC1", "#3AB8FF", "#B57FFF", "#FFD700"].map((c) => (
                      <button key={c} style={{ background: c }} className={`h-6 w-6 rounded-full border-2 ${c === "#5EFFC1" ? "border-white scale-110" : "border-transparent hover:scale-110"} transition-transform`} />
                    ))}
                  </div>
                </SettingRow>
                <SettingRow label="Sidebar width" desc="Compact or expanded">
                  <select className="glass rounded-lg px-3 py-1.5 text-xs bg-input/40 text-foreground outline-none">
                    <option>Default (240px)</option>
                    <option>Compact (200px)</option>
                    <option>Wide (280px)</option>
                  </select>
                </SettingRow>
              </GlassCard>
            )}

            {active === "localization" && (
              <GlassCard className="p-6">
                <h3 className="font-display font-semibold mb-5">Localization</h3>
                <SettingRow label="Language" desc="Interface language">
                  <select className="glass rounded-lg px-3 py-1.5 text-xs bg-input/40 text-foreground outline-none">
                    <option>English (US)</option>
                    <option>Spanish</option>
                    <option>French</option>
                    <option>German</option>
                  </select>
                </SettingRow>
                <SettingRow label="Time zone" desc="Used for scheduling">
                  <select className="glass rounded-lg px-3 py-1.5 text-xs bg-input/40 text-foreground outline-none">
                    <option>UTC +5:00</option>
                    <option>UTC +0:00</option>
                    <option>UTC -5:00</option>
                  </select>
                </SettingRow>
                <SettingRow label="Date format" desc="How dates are displayed">
                  <select className="glass rounded-lg px-3 py-1.5 text-xs bg-input/40 text-foreground outline-none">
                    <option>MM/DD/YYYY</option>
                    <option>DD/MM/YYYY</option>
                    <option>YYYY-MM-DD</option>
                  </select>
                </SettingRow>
              </GlassCard>
            )}

            {active === "api" && (
              <GlassCard className="p-6">
                <h3 className="font-display font-semibold mb-5">API Keys</h3>
                {[
                  { name: "Production key", key: "axr_prod_•••••••••••••••••••••5f2a", created: "Jan 12, 2025" },
                  { name: "Development key", key: "axr_dev_•••••••••••••••••••••9c1b", created: "Mar 3, 2025" },
                ].map((k) => (
                  <div key={k.name} className="flex items-center justify-between gap-4 py-4 border-b border-border/30 last:border-0">
                    <div>
                      <div className="font-medium text-sm">{k.name}</div>
                      <code className="text-xs text-muted-foreground font-mono mt-0.5 block">{k.key}</code>
                      <div className="text-xs text-muted-foreground mt-0.5">Created {k.created}</div>
                    </div>
                    <button className="glass rounded-lg px-3 py-1.5 text-xs text-destructive hover:bg-destructive/10 transition-all shrink-0">
                      Revoke
                    </button>
                  </div>
                ))}
                <button className="mt-5 w-full glass rounded-xl py-2.5 text-sm text-primary hover:bg-primary/10 border-dashed border-primary/30 transition-all flex items-center justify-center gap-2">
                  <Key className="h-4 w-4" /> Generate new key
                </button>
              </GlassCard>
            )}

            {/* Save button */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex justify-end"
            >
              <NeonButton onClick={handleSave}>
                {saved ? (
                  <><Check className="h-4 w-4" /> Saved!</>
                ) : (
                  <><Save className="h-4 w-4" /> Save Changes</>
                )}
              </NeonButton>
            </motion.div>
          </motion.div>
        </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
