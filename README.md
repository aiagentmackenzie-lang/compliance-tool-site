# ComplianceLab - Homepage

A cinematic, scroll-driven marketing website for a cybersecurity compliance tools service.

## Features

- **GSAP + Lenis smooth scroll** — Buttery smooth scrolling with pinned panels
- **Text scramble effect** — "compliance tools" text decodes on page load
- **Pinned panels** — Work section stacks like cards as you scroll
- **Custom cursor** — Cyan dot cursor with mix-blend-mode difference
- **Kinetic animations** — GSAP-powered entrance and scroll animations
- **Mobile responsive** — Clean fallbacks for touch devices

## Design System

| Token | Value |
|-------|-------|
| Background | `#0A0A0B` (near-black) |
| Text | `#F5F5F7` (warm off-white) |
| Accent | `#00D4FF` (cyan/teal from images) |
| Display Font | Space Grotesk |
| Body Font | Inter |

## Setup

1. **Copy your images** to the `assets/` folder:
   - `quantum-bg.jpg` — Hero background (your quantum computer image)
   - `project-1.jpg` — Security Awareness Platform
   - `project-2.jpg` — Incident Response
   - `project-3.jpg` — Argus Scanner

2. **Serve locally**:
   ```bash
   cd /Users/main/Projects/compliance-tools-homepage
   python3 -m http.server 8000
   ```

3. **Open** `http://localhost:8000`

## Stack

- GSAP 3.12.5 (animations)
- GSAP ScrollTrigger (scroll-linked effects)
- Lenis 1.1.14 (smooth scroll)
- SplitType (text animation)
- Vanilla CSS (custom properties, no framework)

## Animation Highlights

1. **Hero**: Text scramble on "compliance tools" + parallax background
2. **Work Section**: Stacking pinned panels with scale/brightness transition
3. **Services**: Staggered card reveal with hover effects
4. **Process**: Sequential step reveal with animated accent lines
5. **Navigation**: Blur backdrop on scroll

## Performance

- Images use `loading="lazy"` (add manually if needed)
- GSAP animations respect `prefers-reduced-motion`
- Mobile disables complex scroll-scrub effects

## Credits

Design inspired by framer.com — scroll storytelling, cinematic presentation.
