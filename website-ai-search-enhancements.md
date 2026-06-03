# On Forward website — enhancements for Google's AI search

Based on Google's official guide *Optimizing your website for generative AI features on Google Search* (last updated 2026-05-15) checked against our actual site source (Vite + React SPA).

## The headline problem

Google's AI Overviews and AI Mode are grounded in the normal Search index via RAG. The guide's hard requirement: **a page must be indexed and eligible to show with a snippet** to appear in any AI feature. Everything else is secondary to that.

Our site is a **client-rendered React single-page app**. The shipped `index.html` contains only a meta description and an empty `<div id="root">`. All real content — the three case studies, "we go in, we learn, we build," the FDE explanation — is injected by JavaScript after load, and most of it only appears *after the visitor clicks through an interactive workspace builder*. Google can render JavaScript, but it's slower, best-effort, and content gated behind clicks/state is frequently not indexed at all. So our strongest asset (real, non-commodity case studies — exactly what the guide says wins) is largely invisible to the systems we want to rank in.

Fixing crawlability and getting that content into static HTML is 80% of the win. The rest is hygiene.

## Priority 1 — Make the content crawlable and indexable

This is the only thing on the list that's likely to change outcomes. The other sections matter much less until this is done.

**Server-render or pre-render the site.** Move from a pure client-rendered SPA to static HTML that contains the real text. Options, easiest first:
- Add a prerender step to the Vite build (e.g. `vite-plugin-prerender` / `react-snap`) so the deployed HTML already contains the headline, the FDE explanation, and all three case studies.
- Or migrate to a framework that renders on the server (Next.js / Astro). Astro is the lightest lift for a mostly-static marketing site and keeps the React components.

**Get the case studies into the static HTML, not behind a click.** The interactive workspace builder is a nice demo, but the logistics / B2B SaaS / professional-services stories are our best ranking content per the guide ("first-hand, non-commodity, unique point of view"). They should exist as real text on the page on first load — keep the interactive version too, but don't make it the only path to the content.

**Use semantic HTML with a real heading structure.** Right now the page is `div` soup with inline styles and no `<h1>`. Add one `<h1>` (e.g. "Forward Deployed AI Engineering"), `<h2>`s for each section and case study, real `<p>` tags, and `<main>/<section>/<article>`. The guide calls this out twice — once for normal indexing, once for AI agents reading the accessibility tree.

## Priority 2 — Technical structure hygiene

**Add `robots.txt`.** We don't have one. At minimum allow crawling and point to the sitemap.

**Add `sitemap.xml`.** None exists. List the homepage, privacy policy, and any case-study / about URLs once they're real pages.

**Give the case studies their own URLs.** A single SPA route means there's nothing for Google to index per topic. Three indexable pages (`/case-studies/logistics-invoice-matching`, etc.) each rank for their own queries and each become groundable sources. This directly serves query fan-out — the guide's example of how AI Mode breaks one question into many.

**Verify the site in Google Search Console.** The guide's recommended diagnostic. It'll tell us exactly which pages are indexed and whether our content is being rendered — confirming or disproving the Priority 1 problem with real data.

**Page experience:** the homepage ships heavy animated SVG backgrounds plus ~1MB+ PNGs (`about-diagram.png`, `og-image.png`). Compress images and check Core Web Vitals in PageSpeed Insights.

## Priority 3 — Structured data (eligibility, not AI-ranking)

The guide is explicit: structured data is **not required** for AI search and there's no magic schema. But it still helps eligibility for rich results and helps machines understand us, so it's worth a small amount of effort.

- Add **Organization** schema (name, logo, URL, sameAs → our LinkedIn) in JSON-LD.
- Consider **Article** schema on each case-study page once they're real pages.
- Don't over-invest here. It's a nice-to-have, not the lever.

## Priority 4 — Fix what we already have

**`public/llms.txt` — two issues.** First, Google's guide explicitly lists `llms.txt` under "what you don't need to do" — it does nothing for Google. (It may help some non-Google AI engines, so keeping it is harmless.) Second, **the contact line is wrong**: it says `onforward.io` while our canonical domain everywhere else is `onforward.eu`. Fix or delete. Don't spend more time on this file.

**Don't chase AEO/GEO hacks.** The guide debunks them directly, so we skip: chunking content into tiny pieces, rewriting copy "for the AI," and buying inauthentic mentions. Our energy goes to crawlable real content instead.

## Priority 5 — Agentic readiness (low urgency, on-trend)

The guide's newest section: AI agents (browser agents) increasingly visit sites to complete tasks, reading the DOM and accessibility tree. The same semantic-HTML fix from Priority 1 covers most of this. Beyond that: make sure our one clear action — "start a conversation" / the contact form — is a real, labeled, keyboard-reachable form (not a div with a click handler), so an agent can actually find and complete it.

## What to do first, concretely

1. Pre-render or SSR the build so the HTML ships with real content. *(biggest impact)*
2. Surface all three case studies as static text + give them their own URLs.
3. Add `<h1>`/semantic headings.
4. Add `robots.txt` + `sitemap.xml`.
5. Verify in Search Console and read what's actually indexed.
6. Add Organization JSON-LD; fix the `llms.txt` domain.
7. Compress images, check Core Web Vitals.

Everything else the guide describes (great content, unique POV, helpful structure) we already do well — the gap is almost entirely that machines can't see it yet.
