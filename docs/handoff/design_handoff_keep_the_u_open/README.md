# Handoff: Keep the U Open — campaign landing page (v2)

> **Implementing with Claude Code?** Start at `KEEP_THE_U_OPEN.md` in this folder — it sets the
> working agreement (what to read first, the rules, build order, and definition of done). This
> README is the specification it refers to. Put the whole bundle at
> `docs/handoff/keep-the-u-open/` and add `@docs/handoff/keep-the-u-open/KEEP_THE_U_OPEN.md` to
> your existing root `CLAUDE.md` — do not replace that file.

## Overview

A single marketing/informational route for the **University-Student Union (U-SU) at Cal State LA**
explaining a proposed **+$90/semester** student fee: what it costs, where the money goes, what the
budget projection shows, and what happens if the fee does not change.

- **Target:** `CSULA-USU/web` — Next.js 14 (Pages Router), TypeScript, styled-components
- **Route:** `src/pages/keep-the-u-open.tsx`
- **Ships in:** informational mode. The campus president has not confirmed whether this proceeds as
  a referendum or as alternative consultation and the voice is under legal review, so the page ships
  informational and flips to advocacy later — never the reverse. See [campaignMode](#8--campaignmode).
- **Audience:** largely commuter students, median age ~24, many working, many low-income.

---

## 1 · Rule zero: compose, don't rebuild

**Reuse what already exists in `src/components/`. Only build something new when nothing in the
project does the job.** Before writing any component, search the repo for an existing one — a card,
a shell, a text style, an expander — and use it. The page file should read as pure composition with
essentially no bespoke styling.

Concretely:

- Every section shell is a `FluidContainer`. Never hand-roll `max-width` + media queries.
- Every piece of text is a `Typography` variant. Never set `font-family` or `font-size` directly.
- Buttons are `Button`. Links are `StyledLink`. Images are `Image`. Icons are `Icon`.
- Cards are `Card` / `DescriptionCard` / `FlatCard`. Expanders are `Expandable`. Tables are `Table`.
  Animated counts are `CountUp`.
- **Anything repeated becomes a generic component** in `src/components/<Name>/` with a barrel
  `index.ts` and an export from `src/components/index.ts` — never inline JSX in the page file.
- Only these are genuinely new. Check the repo first; if a close equivalent exists, extend it
  instead of adding a parallel implementation:

| Component         | Props                                                                                                          | Notes                                            |
| ----------------- | -------------------------------------------------------------------------------------------------------------- | ------------------------------------------------ |
| `StatCard`        | `{ value, label, sourceId?, variant?: 'onLight' \| 'onDark' \| 'onPrimary' }`                                  |                                                  |
| `StatBand`        | `{ children, background?: 'primary' \| 'greyDarkest' }`                                                        | Thin wrapper over `FluidContainer`               |
| `TestimonialCard` | `{ quote, name, detail, photo? }`                                                                              | Renders from `[]` today                          |
| `BarChart`        | `{ rows, cap, median, highlightId, ariaLabel, animate?, animationDuration? }`                                  |                                                  |
| `ShareChart`      | `{ segments, total, variant?: 'donut' \| 'pie', animation?: 'sweep' \| 'grow' \| 'none', animationDuration? }` |                                                  |
| `TrendChart`      | `{ series, markers, table, caption, ariaLabel, animate?, animationDuration? }`                                 |                                                  |
| `AnchorNav`       | `{ links, ctaLabel, ctaHref }`                                                                                 |                                                  |
| `CtaBanner`       | `{ heading, body, ctaLabel, ctaHref, secondary? }`                                                             |                                                  |
| `CitedStat`       | `{ value: string; label: string; sourceId: string; variant?: 'onLight' \| 'onDark' }`                          | Superscript marker anchor-linked to `SourceList` |
| `SourceList`      | `{ sources: { id: string; label: string; href?: string; note?: string }[] }`                                   | Reuse `StyledLink` for `href`                    |

If the repo already has a chart primitive, a stat tile, or an anchor nav, **use it and add the
missing props** rather than shipping a second one.

## 2 · About the design files

The files in this bundle are **design references created in HTML** — a prototype showing intended
look and behavior, not production code to copy. `Keep the U Open v2.dc.html` is a single
self-contained streaming HTML component with inline styles; it is deliberately _not_ structured the
way the repo should be. The task is to **recreate this design inside the target codebase** using its
established components, theme tokens, and patterns (styled-components + `Typography` + `FluidContainer`),
following rule zero above.

Translation table:

| Prototype                                          | Repo                                                |
| -------------------------------------------------- | --------------------------------------------------- |
| Inline styles on every element                     | `theme/index.ts` tokens via styled-components       |
| Native `<details>` FAQ                             | `Expandable`                                        |
| Hand-written `<section>` shells                    | `FluidContainer`                                    |
| Two-column "today / after" panels                  | `Card` (a `Table` read too clinical here)           |
| Anchor nav shown/hidden by `matchMedia` in JS      | `AnchorNav` with `display: none` under 768px        |
| Count-up figures driven by `requestAnimationFrame` | `CountUp`                                           |
| Inline `<svg>` charts                              | `TrendChart` / `ShareChart` / `BarChart` components |

No site chrome is in the prototype — no `Nav`, no `Footer`. The app shell supplies both. Only the
in-page `AnchorNav` belongs to this route.

## 3 · Fidelity

**High-fidelity.** Colors, type, spacing, copy, chart geometry, and animation timings are final and
should be reproduced exactly, using repo components and tokens rather than the prototype's literals.

---

## 4 · Page composition (in order)

All section shells are `FluidContainer`. Section padding is `clamp(48px, 6–7vw, 96px)` block,
`clamp(20px, 4vw, 36px)` inline. Content is capped at `1200px` (`900px` for FAQ and Sources).
Every anchored section carries `scroll-margin-top: 84px`.

### 1 · AnchorNav — sticky, white, `1px solid #dedede` bottom border

Label "Keep the U Open" (Montserrat 800/14) + links **Why It Matters** `#why` · **The Numbers**
`#numbers` · **If It Fails** `#if-it-fails` · **FAQ** `#faq` · **Sources** `#sources`, then a
right-aligned yellow CTA from `campaignMode` (`ctaLabel` / `ctaHref`). Links Montserrat 600/13.5,
`#2b2b2b`, hover `#8c6a14`. Row wraps at mid widths; **hidden ≤768px**. No `#asi` link — the ASI
block is gone from v2.

### 2 · Hero — full-bleed `assets/usu-front.jpg`, flat `rgba(0,0,0,.66)` overlay (no gradient)

Eyebrow (derived: `A {actionNoun} for the University-Student Union`), Montserrat 700/12,
`.14em` tracking, `#ffce04`. H1 "Keep the U Open" — Bitter 700, `clamp(42px,6.4vw,76px)`, `#fff`.
Subcopy Bitter `clamp(17px,1.6vw,21px)`/1.6, `#f4f4f4`, max 62ch, with **$90 more per semester** and
**FY 2030-31** bolded to `#fff` — both must stay above the fold. Two CTAs from `campaignMode`
(yellow solid → `#numbers`; white 1px outline → `#cost`). A date line renders **only** when
`voteDate` is non-null. Below a `1px rgba(255,255,255,.28)` rule: three figures — `$137.25` per
semester today · `+$90.00` proposed increase (yellow) · `$227.25` per semester after.

### 3 · Thesis `#why` — white

Kicker "Why it matters". H2 _"You already paid for this building. Here's what you own."_
Three `DescriptionCard`s (`1px #dedede`, radius 16, padding 28, numbered 01–03):
the four hours between your classes · the things you'd otherwise pay for · nearly 100 student jobs.
Then the solidarity bridge as a `3px #ffce04` left-ruled pull paragraph — **after** the cards, not
as the opening frame.

### 4 · Services — `#f4f4f4`, six `Card`s (white, radius 16, `0 2px 8px rgba(0,0,0,.06)`)

Events & Activities · Study & Rest Spaces · Play & Recreation · Cross Cultural Centers ·
Jobs & Leadership · Everyday Essentials. 64px bespoke PNG icon top-left, serif 400/22 title,
serif 15.5 body. Grid `repeat(auto-fit, minmax(280px, 1fr))`, gap 24.

### 5 · Event-photo band — full-bleed, `clamp(260px,30vw,420px)`

Carries a visible placeholder chip; real photography required before launch.

### 6 · StatBand — `#ffce04`, black text only (never white on yellow)

Three `CitedStat` tiles: **2007** (last fee change; that vote paid for the building) ·
**90–100** (student employees, largest student employer, 29 full-time staff) · **5** (free cultural
graduations a year, ~800 students). Value Montserrat 800 `clamp(44px,5.4vw,64px)`; label Bitter 17.
Three tiles, not four — the fourth v1 tile was invented.

### 7 · The Numbers `#numbers` — white

1. **Fee math** (`#cost`, the hero's secondary-CTA target) — three columns with 3px left rules
   (`#dedede` / `#ffce04` / `#000`): Today `$137.25` ($274.50/yr) · Increase `+$90.00`
   (+$180/yr · $5.63/wk) · Proposed `$227.25` ($454.50/yr). Then the 2007 + 3% inflation-cap note and
   the one student-center-fee `CitedStat` ("lowest of any CSU campus — $275 a year, unchanged since 2007").
2. **`TrendChart`** — see §6 of the figure notes below.
3. **`ShareChart`** — "Where your $227.25 goes."
4. **`BarChart`** — total campus mandatory fees.
5. **Inflation-gap paragraph** — owns the $215.30 → $227.25 difference before anyone else raises it.

Charts sit in white cards, `1px #dedede`, radius 16, padding `clamp(16px,2vw,28px)`, separated by
`1px #dedede` rules with `clamp(48px,6vw,80px)` above.

### 8 · What changes if this doesn't pass `#if-it-fails` — `#f4f4f4`

Two columns. Left (white card): six verified "today" facts — fitness center access · signature
events · cultural graduation ceremonies · room reservations for student orgs · student employment ·
building hours, each a 15.5px Montserrat 700 label over Bitter 15.5 body, separated by `1px #dedede`.
Right (`#2b2b2b` card, radius 16): the FY 2030-31 arithmetic and an explicit statement that the U-SU
has not decided or published which services it would reduce, plus `[NEEDS COPY]`. Neutral voice, no
red, no exclamation points, no warnings.

### 9 · Financial aid — white; one `Card` on `#f4f4f4`, question as the header, `[NEEDS COPY — Financial Aid]`

Placed here rather than buried in the FAQ. Do not draft speculative copy; the answer comes from
Cal State LA Financial Aid verbatim.

### 10 · Testimonials — `#f4f4f4`

`TestimonialCard` grid renders from `testimonials: []` with a visible dashed empty state:
`[AWAITING REAL QUOTES — 4 needed, with written consent]`. All four v1 quotes were invented and are
deleted. Nothing ships without a named student and a signed release.

### 11 · Before you weigh in — white; heading from `campaignMode.beforeHeading`

Three bordered cards: read the budget (→ `#sources`) · info session `[NEEDS FIGURE — dates]` ·
ask the board `[NEEDS FIGURE — schedule]`.

### 12 · FAQ `#faq` — `#f4f4f4`, eight `Expandable`s ordered by likely anxiety

How much and when · financial aid · the 3% adjustment (answered honestly: a cap below the historical
CPI average, there so the U-SU never returns with another $90 ask) · why not tuition · what happens
if it fails · who decided the amount · "I never use the U-SU" · where to see the budget.

### 13 · For faculty & staff — `#2b2b2b`, compact

Three short items: largest student employer · reservable space for departmental events · what to
tell students who ask (→ Sources). Deliberately small — this page belongs to students.

### 14 · Sources `#sources` — white, full section, `SourceList`

Six numbered entries with `id="source-N"` matching every `CitedStat` marker:
CSU campus mandatory fees table 2025-26 · U-SU Fiscal Committee presentation April 10 2026 ·
Cal State LA Fact Book · U-SU operating budget / annual report · BLS CPI inflation calculator ·
CSU Chancellor's Office Cal Poly–Maritime integration.

### 15 · Final CTA — `CtaBanner`, `#ffce04`, black text, black solid + black outline buttons

Heading and body from `campaignMode`.

### 16 · Disclaimer strip — `#f4f4f4`, 12px Montserrat, `#6e6e6e`, `1px #dedede` top border

Uses `campaignMode.actionNoun`. **The ASI co-branding line from v1 is removed — this is a U-SU-only
page.** Keep the placeholder-figures sentence until the checklist in §9 below is empty.

---

## 5 · Figures — use these exactly, invent nothing

If a figure is not here, it does not go on the page: leave a visible `[NEEDS FIGURE]` marker.
A hole is recoverable; a wrong number is not.

**Fee** — $137.25/sem ($274.50/yr) → +$90/sem (+$180/yr) → $227.25/sem ($454.50/yr); $5.63/week over
a 16-week semester; last approved **2007** (v1 said 2004 — wrong); CPI-adjusted equivalent of the
2007 rate $215.30; proposed contract language includes a 3% annual inflation adjustment.

**Budget — Fiscal Committee "DO NOTHING" projection, April 10 2026** — reserve FY 2024-25 $8,364,353
→ FY 2029-30 $274,702 → FY 2030-31 −$2,065,518. FY 2025-26 revenue $4,876,638 / expenses $5,760,109.
FY 2030-31 revenue $4,337,325 / expenses $6,677,545 (gap $2,340,220 = 35% of that year's expenses —
derived). Bond ≈$1.92M/yr, ~33% of the operating budget, through 2038. $2M cut across FY 2024-25 and
FY 2025-26 = 25% of the operating budget. Student fees cover 67% of costs; sustainable target 80–85%.

**Organization** — 501(c)(3), board chaired by elected students; building opened 2009, 93,000 sq ft;
29 full-time staff, 90–100 student employees, largest student employer on campus (v1's "250 student
jobs" was wrong); 5 free cultural graduation ceremonies a year, ~800 students.

**Peer comparison** — always "among the CSU's **22** campuses". The 2025-26 table lists 23 and
Maritime shows $0 because it merged administratively with Cal Poly on July 1 2025, completing
academic integration in fall 2026 — footnote it, do not silently drop the row.

Claims deliberately **not** made, because they are checkable and false:

- ~~"second-to-last on student center fee after the increase"~~ — at $454.50 it would rank
  fifth-lowest of 22, passing Channel Islands, Dominguez Hills, Humboldt and Fullerton.
- ~~"$666 CSU average"~~ — does not reconcile with the source table. Computed across 22 campuses the
  student center fee mean is $715, median $719.

---

## 6 · Chart specifications

### TrendChart — "Revenue and expenses, if nothing changes"

`viewBox="0 0 1000 380"`, `min-width: 660px` inside an `overflow-x: auto` wrapper so it scrolls on
mobile rather than shrinking labels below legibility. Value axis $9M (y=40) to −$3M (y=340), 25px per
$1M, `$0` at y=265 drawn as a `1.5px #2b2b2b` rule; gridlines `#ededed` at $8M/$6M/$4M/$2M/−$2M.
Seven x ticks FY 24-25 → FY 30-31 at x = 150, 281.7, 413.3, 545, 676.7, 808.3, 940.

Three series — **line style, not color, distinguishes them**, plus a text legend under the chart:

- Expenses — `3px #2b2b2b` dashed `9 7`: (281.7, 121) → (940, 98.1)
- Revenue — `3px #6e6e6e` dashed `9 7`: (281.7, 143.1) → (940, 156.6)
- Reserve — `3.5px #8c6a14` solid polyline: (150, 55.9) → (808.3, 258.1) → (940, 316.6)
- Gap between revenue and expenses shaded `#ffce04` at 0.3 opacity
- Zero crossing ringed at (823.8, 265): white fill, `2.5px #000` stroke, labeled "reserve reaches $0"

Only published points are plotted; the connecting lines are trajectories, and the caption says so.
The visually-hidden `Table` marks unpublished cells "Not published" rather than interpolating.

### ShareChart — "Where your $227.25 goes"

`viewBox="0 0 400 400"`, `r=90`, circumference 565.49. Bond payment **33%** = dash 186.61, rotated
`-90` (starts at 12 o'clock), `#ffce04`. Remainder **67%** = dash 378.88, rotated `28.8`, `#dedede`.
`donut` = stroke-width 60 (with a `$227.25 / per semester` center label); `pie` = stroke-width 180
(center label dropped). Percentages are drawn on the figure at (312,138) and (88,272) — color is
never the only carrier.

Legend rows carry the derived dollar amounts (`amount = fee × share / 100`, tabular figures):
bond 33% · $75.00; everything else 67% · $152.25 — plus
`[NEEDS FIGURE — category split of the remaining 67%]`. Only the bond share is published; do not
invent the rest of the breakdown.

### BarChart — total campus mandatory fees, 2025-26

Row grid `clamp(92px,14vw,150px) 1fr 64px`, gap 12 — bars survive on mobile. Track `#f0f0f0`,
radius 3, height 20 (30 for the highlighted row). Value axis **capped at $3,000**; width % =
value / 3000 × 100. Median rule at 64.87% ($1,946): dashed `2px #8c6a14` with a
`0 0 0 1px rgba(255,255,255,.6)` hairline halo, on `z-index: 2` so it reads over the dark bar fills;
label above the chart in the same `#8c6a14`. Axis ticks $0 / $1,000 / $2,000 / $3,000.

- **Cal State LA is one row, two segments** — `#ffce04` solid to 36.13% ($1,084, labeled "today")
  plus a `#fef9c3` extension to 42.13% with a `2px #8c6a14` divider ($1,264, labeled "proposed").
  Row background `#fffbe8`, label and value Montserrat 800. Never two separate rows.
- Channel Islands `$1,146` (`#6e6e6e` bar) annotated "lowest after the increase".
- 19 rows `#2b2b2b`: Northridge 1400 · Dominguez Hills 1408 · Fullerton 1514 · East Bay 1539 ·
  Monterey Bay 1695 · Pomona 1697 · Fresno 1774 · San Francisco 1874 · Long Beach 1888 ·
  San Marcos 2004 · Bakersfield 2046 · San Bernardino 2117 · Stanislaus 2240 · Humboldt 2374 ·
  San Jose 2396 · Chico 2446 · Sacramento 2564 · Sonoma 2612 · San Diego 2730.
- **San Luis Obispo $7,000** — drawn at the cap with a 135° hatch fill and an "off scale ›"
  annotation, true value in the value column. Do not truncate silently, do not drop the row.

Headline claim for the section: _"Even after this passes, Cal State LA is still the second most
affordable university in the CSU."_ Footnotes: axis cap · median $1,946 / mean $2,161 (median used;
the mean is skewed by one outlier) · the 22-campus / Maritime note.

---

## 7 · Interactions & behavior

**Chart animation.** All of it is optional, prop-driven, and fires **once, on first scroll into
view** (`IntersectionObserver`, threshold 0.2) — never on a loop, never on mount for content below
the fold. In the prototype it runs on the Web Animations API from the logic layer; in the repo,
prefer `CountUp` for the counting figures and keep the same timings.

| Prop                | Values                      | Default | Effect                                                                                                                                                                                                                                                                                                                   |
| ------------------- | --------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `animateTrend`      | boolean                     | `true`  | Chart wipes left → right via a `clipPath` rect scaled on X, so all three lines draw across. Gridlines and axis labels stay outside the clip and are visible throughout. `cubic-bezier(.25,.6,.3,1)`.                                                                                                                     |
| `animateBars`       | boolean                     | `true`  | Bars grow from the left (`transform-origin: left`), staggered top → bottom at `duration/60` per row; bar duration is 60% of `animationDuration`. The two-segment Cal State LA row grows as one. Each dollar figure in the value column counts `$0 → value` on its own row's delay, easing `smoothstep`, tabular figures. |
| `shareAnimation`    | `sweep` \| `grow` \| `none` | `sweep` | `sweep`: both wedges fill **simultaneously** from their own start angles (`stroke-dashoffset` → 0) while the two percentage labels count `0 → 33%` and `0 → 67%` in step. `grow`: the whole figure scales up from center with a fade — better in a tight column, where a sweep reads as a loading spinner.               |
| `animationDuration` | 300–3000 ms                 | `1400`  | Applies to all three charts.                                                                                                                                                                                                                                                                                             |
| `donutVariant`      | `donut` \| `pie`            | `donut` | One component, two shapes.                                                                                                                                                                                                                                                                                               |

Changing any animation prop tears down observers, resets inline state, and re-arms.

**Other behavior.** FAQ items expand independently (`Expandable`); the prototype's `+` rotates 45° in
`.2s ease-in-out`. Anchor links scroll smoothly to sections offset by `scroll-margin-top: 84px`.
Citation markers jump to the matching `SourceList` row. Universal hover is `opacity: .7`; anchor-nav
links transition to `#8c6a14`. No other motion on the page.

**Responsive.** No fixed breakpoints beyond the anchor nav's 768px hide: grids are
`repeat(auto-fit, minmax(260–320px, 1fr))` and type/padding use `clamp()`. The trend chart scrolls
horizontally below ~660px.

## 8 · campaignMode

Exported at the top of the page file. Every mode-dependent string lives here; nothing outside this
object may contain "vote yes," "ballot," or a date. Where `voteDate` is null, the component renders
no date line rather than an empty slot.

```ts
export const campaignMode = {
  mode: 'informational', // ← 'advocacy' after confirmation
  ctaLabel: 'See the Budget', // ← 'Vote Yes'
  ctaHref: '#numbers', // ← ballot URL
  heroPrimaryCta: 'See the Numbers', // ← 'Vote Yes'
  heroSecondaryCta: 'What This Costs You',
  finalHeading: 'The math, in one place.', // ← 'Keep the U open. Vote yes.'
  actionNoun: 'proposal', // ← 'referendum' | 'consultation'
  voteDate: null, // ← 'Voting opens <date>'
  beforeHeading: 'Before you weigh in', // ← 'Before you vote'
  finalBody: 'Every figure on this page is traced to …',
};
```

`beforeHeading` and `finalBody` were added in v2 so §11 and §15 need no JSX edit on the flip. The
hero eyebrow is derived from `actionNoun`; the disclaimer strip reads it too. **Flipping to advocacy
is a change to these strings only — no JSX edits.**

## 9 · Placeholder checklist

Nothing ships with an estimated number. Every item below is visible on the page as a marker.

| Marker                                                    | Where                                                                        | Owner                      |
| --------------------------------------------------------- | ---------------------------------------------------------------------------- | -------------------------- |
| annual visits                                             | not on the page — v1's 850,000 was invented; do not restore without a source | U-SU Ops                   |
| `[NEEDS FIGURE — events per year]`                        | §8 signature-events row (v1's "400+" was invented)                           | U-SU Ops                   |
| `[NEEDS FIGURE — weekly club meetings]`                   | §8 room-reservations row (v1's "120+" was invented)                          | CSI                        |
| `[NEEDS FIGURE — dates & locations]`                      | §11 info session card                                                        | Campaign lead              |
| `[NEEDS FIGURE — meeting schedule]`                       | §11 ask-the-board card                                                       | Board                      |
| `[NEEDS FIGURE — effective term]`                         | §12 FAQ 1                                                                    | Fiscal Committee           |
| `[NEEDS FIGURE — category split of the remaining 67%]`    | §7 ShareChart legend                                                         | Fiscal Committee           |
| `[NEEDS COPY — Financial Aid]`                            | §9 and §12 FAQ 2                                                             | Cal State LA Financial Aid |
| `[NEEDS COPY — service-level impact statement]`           | §8 right panel                                                               | Fiscal Committee           |
| `[NEEDS COPY — board resolution and vote record]`         | §12 FAQ 6                                                                    | Board                      |
| `[NEEDS LINK]` ×5                                         | §14 sources 1, 2, 3, 4, 6                                                    | Campaign lead              |
| `[AWAITING REAL QUOTES — 4 needed, with written consent]` | §10                                                                          | Campaign lead              |
| Placeholder photography                                   | §2 hero, §5 band                                                             | Graffix                    |

Retire the disclaimer strip's placeholder sentence only when this table is empty.

## 10 · Voice

- **Lead with utility, not community.** The U-SU is where a commuter exists between a 10 AM and a
  2 PM class. Sell what they already own and under-use — free gym, nap pods, microwaves, food
  pantry, somewhere to sit that isn't their car. Widen to community and cultural grads second.
- **Never euphemize the fee.** "$90 more per semester," plainly and early, adjacent to what it buys.
  Precision disarms; vagueness invites worst-case guessing.
- **Keep emotional and quantitative registers in separate, alternating blocks.** Never urgent copy on
  a chart, never a hard number inside an emotional appeal. Charts get flat factual captions and let
  the data carry.
- Sentence case for body and buttons; Title Case for nav and card titles. No emoji, anywhere.
  "U-SU" hyphenated. En-dashes in ranges (`Mon–Thu: 7 AM to 10 PM`).

## 11 · Accessibility

- Every chart is `role="img"` with a descriptive `aria-label`; the inner `<svg>` is `aria-hidden`.
  `TrendChart` also ships a visually-hidden `Table` of year-by-year figures; `ShareChart` and
  `BarChart` carry every value as real text in the legend / value column. Never data in arcs alone.
- `prefers-reduced-motion: reduce` short-circuits animation setup entirely — no observers are
  registered and every chart paints at its final state (including final counted figures).
- **Color is never the only carrier**: the highlighted bar row is bold and labeled, both of its
  segments are labeled "today" / "proposed", Channel Islands is annotated, the off-scale row says
  "off scale", trend series differ by line style plus a text legend, and share segments carry drawn
  percentages.
- AA on the yellow band: **black on `#ffce04`, never white** — including citation markers, which
  render black there instead of gold.
- Sections and every `SourceList` row carry `scroll-margin-top: 84px` so markers land clear of the
  sticky nav.
- Visually-hidden pattern: `position:absolute; width:1px; height:1px; overflow:hidden;
clip:rect(0 0 0 0); clip-path:inset(50%); white-space:nowrap; border:0; margin:-1px; padding:0;`

## 12 · Design tokens

All from `web/src/theme/index.ts` — use the theme, not these literals.

**Color** — primary `#ffce04` · gold `#8c6a14` · pastel yellow `#fef9c3` (bar extension only) ·
black `#000000` · greyDarkest `#2b2b2b` · greyDark `#6e6e6e` · greyLighter `#dedede` ·
greyLightest `#f4f4f4` · white `#ffffff`. Chart-only neutrals: `#f0f0f0` track, `#ededed` gridline,
`#fffbe8` highlighted row.

**Type** — Bitter (serif) for headlines and body; Montserrat (sans) for nav, buttons, labels,
figures. H1 `clamp(42px,6.4vw,76px)`/700 · H2 `clamp(30px,3.8vw,46px)`/700 · chart H3
`clamp(24px,2.6vw,32px)`/700 · card title 21–23/700 · body 15.5–18/1.6 · kicker 12/700/`.12em`
uppercase · legend and chart labels 12.5–14. All figures use `font-variant-numeric: tabular-nums`.

**Spacing** — 0 / 4 / 8 / 16 / 24 / 36 / 72 / 96. Section gap 72–96, card padding 26–32, grid gap 24.

**Radius** — 8 buttons · 16 cards · 3–4 chart bars. **Shadow** — `0 2px 8px rgba(0,0,0,.06)` cards,
`0 8px 24px rgba(0,0,0,.12)` hover. No gradients, no glassmorphism, no colored shadows.

## 13 · Assets

From the U-SU design system (`assets/`, bundled here):

- `assets/usu-front.jpg` — hero background. **Placeholder**; art direction wants real campus-life photography.
- `assets/calstatela-hero.jpeg` — event-photo band. **Placeholder**; real U-SU event photography required before launch.
- `assets/icons/{calendar,book,music,connecting-people,resume,fridge}-icon.png` — bespoke hand-drawn
  outline icons on the six service cards, 64px. These are the real product icon set; do not
  substitute emoji or generic icon-font glyphs.

Site logos and the wordmark are not used — the app shell owns the nav and footer.

## 14 · Files

- `KEEP_THE_U_OPEN.md` — agent working agreement: read-first order, rules, build sequence, done criteria.
- `Keep the U Open v2.dc.html` — the prototype (open it directly in a browser; `support.js` must sit
  beside it). Template markup first, then the logic class at the bottom of the file containing
  `campaignMode`, the bar-chart data, and the animation engine.
- `support.js` — runtime for the prototype format. Not part of the deliverable.
- `assets/` — images and icons listed above.
