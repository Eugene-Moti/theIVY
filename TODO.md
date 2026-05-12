# TODO - The Ivy Group (Next.js 14+ Luxury Real Estate)

## Phase 1 — Routing + Data Wiring
- [x] Inspect existing repo structure (home + legacy project routes + lib/data)
- [ ] Create dynamic route: `app/projects/[slug]/page.tsx` powered by `lib/data.ts`
- [ ] Add `generateStaticParams` for pre-rendered slugs (3 projects)
- [ ] Add redirects from legacy routes (`/ivy-park-residence`, `/blossoms-ivy-residence`, `/luckinn-ivy-residence`) to `/projects/[slug]`
- [ ] Add `loading.tsx` skeletons for project pages

## Phase 2 — Luxury Dark UI System
- [ ] Update `app/globals.css` for required palette/tokens + shimmer skeleton + smooth scrolling
- [ ] Create/upgrade `ScrollProgress`, `GoldDivider`, `ScrollReveal`, `Counter`, `CursorFollower`
- [ ] Update `Header` and `Footer` for HassConsult-like cinematic luxury + glass-on-scroll navbar

## Phase 3 — Animation & Premium Interactions
- [ ] Implement Framer Motion scroll reveal across homepage + project pages
- [ ] Hero: background image with Ken Burns + desktop parallax + staggered text reveal
- [ ] Image hover zoom/brightness transitions
- [ ] Implement ticker/marquee component

## Phase 4 — Homepage Build
- [ ] Rebuild `app/page.tsx` with the exact section order from the spec
- [ ] Implement Featured Projects cards (Ivy Park emphasized, badges, VR modal entry)
- [ ] Build Ivy Park Showcase section with carousel + unit mix table + payment plans + CTAs
- [ ] Amenities gallery (bento/masonry hover overlay)
- [ ] Floor plans section (tabs + download)
- [ ] Virtual tours section (VR modal iframe)
- [ ] Team + Contact/Location + WhatsApp FAB

## Phase 5 — Project Pages
- [ ] Project hero + counters + amenities list
- [ ] Unit mix table with required status colors
- [ ] Floor plans tabbed interface per project + zoom on click + download
- [ ] VR tours (iframe modal) + location map
- [ ] Sticky bottom “Book a Viewing” CTA bar
- [ ] Related projects carousel

## Phase 6 — SEO + Google Ads + Schema
- [ ] Update `app/layout.tsx` metadata + OpenGraph + canonical
- [ ] Add Schema.org per page (RealEstateAgent/RealEstateListing + LocalBusiness where applicable)
- [ ] Add Google Ads conversion tracking + CTA/Form triggers
- [ ] Add linkable phone number (`tel:`) and WA click-to-chat
- [ ] Accessibility pass: ARIA labels, alt text, keyboard focus styles, contrast

## Phase 7 — Validation
- [ ] `npm run lint`
- [ ] `npm run build`
- [ ] Lighthouse / Core Web Vitals check
- [ ] Schema validation + Ads conversion network checks

