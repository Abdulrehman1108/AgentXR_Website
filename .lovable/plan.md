
# AI Agentic CMS — Futuristic Landing & Site

A full multi-page marketing site for an AI agentic CMS, with a "Cyber Mint" theme (deep black, mint green, electric blue), heavy use of React Three Fiber 3D scenes, glassmorphism, and motion. Auth pages are visual mockups with full form validation (no backend yet).

## Design system
- **Palette:** near-black background `#05070A`, mint `#5EFFC1`, electric blue `#3AB8FF`, soft violet accent for depth, glass surfaces with backdrop blur and 1px gradient borders.
- **Typography:** Space Grotesk for headings (futuristic geometric), Inter for body, JetBrains Mono for code/labels.
- **Effects:** glass cards, neon glow shadows, gradient mesh backgrounds, animated grid floors, scroll-triggered fades, hover scale, magnetic buttons, custom cursor glow.
- **Reusable shells:** `GlassCard`, `NeonButton`, `GradientText`, `SectionHeading`, `AnimatedGridBg`, `Scene3D` wrapper.

## 3D system (React Three Fiber)
Each page gets a unique signature scene rendered in a fixed background canvas with scroll-driven parallax. Shared primitives: distorted spheres, particle fields, wireframe icosahedrons, floating crystals, shader planes.

| Page | Signature 3D scene |
|---|---|
| Home | Distorted mint sphere + orbiting particle ring |
| Features | Floating glass cubes (one per feature) rotating on scroll |
| Pricing | Three crystal towers, one per tier, pulsing |
| Use Cases | Wireframe globe with connection arcs |
| Docs | Slow-rotating torus knot + grid floor |
| Contact | Rippling shader plane with flying particles |
| Dashboard mock | Low-poly terrain with scanning beam |
| Login | Single glowing icosahedron with energy field |
| Signup | Particle vortex tunnel |

## Pages

**1. Home** — sticky glass nav, hero ("Your CMS, Now an Agent") with 3D sphere + dual CTA, animated stats strip, "How it works" 3-step with numbered glass cards, feature grid (6 agents), agent workflow diagram, testimonials carousel, integrations logo cloud, large CTA, footer.

**2. Features** — hero, 6 detailed feature blocks alternating left/right with mini 3D props, comparison table (vs traditional CMS), scroll-snap capability showcase.

**3. Pricing** — 3 glass tier cards (Starter / Pro / Enterprise) with hover lift + neon border, monthly/yearly toggle, feature matrix, FAQ accordion.

**4. Use Cases** — industry tabs (E-commerce, Media, SaaS, Agencies), each with story card + metrics + 3D prop.

**5. Docs** — sidebar nav, getting-started article with code blocks, callouts, copy buttons. Static content.

**6. Contact** — split layout: contact form (name, email, company, message) with validation + success toast, on the right an animated info panel with offices/socials.

**7. Dashboard preview** (post-"login" mock) — sidebar, top bar with avatar, KPI tiles, agent activity feed, recent content table, quick-action glass buttons. Read-only demo.

**8. Login** — centered glass card, email + password, "remember me", forgot link, social buttons (visual), inline validation, on submit routes to Dashboard mock.

**9. Signup** — multi-field glass card (name, email, password, confirm), strength meter, terms checkbox, validation, routes to Dashboard mock.

## Animations
- Page transitions (fade + slight scale)
- Scroll reveals (fade-up, stagger)
- Hero text typewriter / gradient sweep
- Magnetic CTA buttons
- Parallax 3D scenes tied to scroll
- Glass card tilt on hover
- Animated gradient borders on focus inputs
- Marquee logo cloud
- Number count-up on stats

## Routing
React Router with routes for `/`, `/features`, `/pricing`, `/use-cases`, `/docs`, `/contact`, `/dashboard`, `/login`, `/signup`. Shared `Layout` with nav + footer (nav hidden on auth pages, footer hidden on dashboard).

## Tech additions
- `@react-three/fiber@^8.18`, `@react-three/drei@^9.122.0`, `three`
- `framer-motion` for UI animation
- `react-hook-form` + `zod` for form validation
- Tailwind config extended with mint/blue tokens, glow shadows, custom keyframes (float, pulse-glow, gradient-shift, grid-scroll)

## Out of scope (now)
- No backend, no real auth, no DB. Forms validate and show toasts. Auth pages "log in" by navigating to the dashboard mock. Real auth via Lovable Cloud can be added later.
