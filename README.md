# Aadityaamlan Panda — Portfolio

Production-ready personal portfolio for **Aadityaamlan Panda** — Final Year ChE @ IIT Kanpur.  
Built with **Next.js 14 (App Router) · TypeScript · Tailwind CSS · Framer Motion**.

---

## Quick Start

```bash
npm install
npm run dev
# → http://localhost:3000
```

### Build & Preview

```bash
npm run build
npm start
```

---

## Project Structure

```
app/
  layout.tsx          ← Root layout, fonts, ThemeProvider, metadata
  page.tsx            ← Home page — assembles all sections in order
  globals.css         ← CSS custom properties, base styles, scrollbar
  api/
    contact/route.ts  ← Contact form POST handler (Resend)
components/
  nav/Navigation.tsx
  hero/Hero.tsx
  hero/Typewriter.tsx
  hero/KeywordCloud.tsx
  projects/
    ProjectsSection.tsx
    FeaturedProjectCard.tsx ← Uses next/image for project screenshots
    StandardProjectCard.tsx
    DomainProjectCard.tsx
    MetricCallout.tsx
  about/About.tsx           ← Uses next/image for about photo
  skills/SkillsSection.tsx
  experience/ExperienceSection.tsx
  achievements/AchievementsSection.tsx  ← Uses next/image for sports photo
  education/EducationSection.tsx
  contact/
    WritingSection.tsx
    ContactForm.tsx
  footer/Footer.tsx
  ui/
    Button.tsx
    CategoryTag.tsx
    SectionHeading.tsx      ← Fixed: section number no longer overlaps heading
    ThemeToggle.tsx
    ThemeProvider.tsx
lib/
  data.ts             ← Single source of truth for all content (update here)
  animations.ts       ← Framer Motion variants
  types.ts            ← TypeScript interfaces
public/
  resume.pdf          ← Drop your resume here
  images/
    profile/
      hero-portrait.jpg     ← 420×520px portrait (Hero section)
      about-photo.jpg       ← 420×280px landscape (About section)
    projects/
      rag-terminal-ui.png   ← 1280×720px (Project 01)
      vr-memory-palace.png  ← 1280×720px (Project 02)
    achievements/
      weightlifting-udghosh.jpg  ← 800×140px banner (Achievements section)
```

---

## Environment Setup

Create a `.env.local` file at the project root (same level as `package.json`):

```
RESEND_API_KEY=re_your_api_key_here
```

Get your free API key at [resend.com](https://resend.com) — free tier allows 100 emails/day.

> `.env.local` is listed in `.gitignore` and will never be pushed to GitHub.

---

## Contact Form

The contact form sends emails via **Resend** to `aadityaamlanpanda@gmail.com`.

Install the dependency:

```bash
npm install resend
```

The route at `app/api/contact/route.ts` is already wired up — just add the API key to `.env.local` and it works locally. For production, add `RESEND_API_KEY` in:

> Vercel Dashboard → Project → Settings → Environment Variables

---

## Adding Images

All image slots use Next.js `<Image>` components and are ready — just drop files at the correct paths.

### Profile photos

```
public/images/profile/hero-portrait.jpg   ← 420×520px, portrait
public/images/profile/about-photo.jpg     ← 420×280px, landscape
```

### Project screenshots

```
public/images/projects/rag-terminal-ui.png    ← Terminal UI screenshot, 1280×720px
public/images/projects/vr-memory-palace.png   ← Unity VR scene, 1280×720px
```

### Achievements

```
public/images/achievements/weightlifting-udghosh.jpg  ← Competition photo, 800×140px
```

No code changes needed — paths are already wired into the components.

---

## Resume

Drop your resume PDF at:

```
public/resume.pdf
```

The navbar already has a Download Resume button pointing to `/resume.pdf`. No code changes needed.

**Recommended order:**
1. Deploy the site first to get a live URL
2. Add the live URL to your resume, export as PDF
3. Drop `resume.pdf` into `public/`, commit and push

---

## Deploy to Vercel

```bash
npm install -g vercel
vercel
```

Or connect your GitHub repo at [vercel.com](https://vercel.com) — zero configuration needed for Next.js.

Remember to add `RESEND_API_KEY` in Vercel's environment variables after deploying.

---

## Content Updates

All content lives in `lib/data.ts`. To update anything — name, email, links, projects, skills — edit that file only. Every section re-renders automatically.

**Key fields to update before going live:**

```ts
personal.email.personal   // aadityaamlanpanda@gmail.com
personal.links.portfolio  // your live URL once deployed
personal.links.github
personal.links.linkedin
```

---

## Design System

| Token | Value |
|---|---|
| Background | `#0D0D0B` (dark) / `#FAFAF7` (light) |
| Accent | `#C8A96E` amber gold |
| Body font | DM Sans 300/400/500 |
| Display font | Cormorant Garamond 300/600 |
| Mono font | JetBrains Mono 400/500 |
| Max content width | 1200px |
| Base spacing unit | 4px |

Dark mode is default. Toggle persisted to `localStorage['color-scheme']`.

---

*Built with curiosity. Refined with rigor. Shipped with care.*
