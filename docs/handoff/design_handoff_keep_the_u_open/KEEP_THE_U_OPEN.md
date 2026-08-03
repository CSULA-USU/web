# Keep the U Open — implementation brief

**Placement.** This is a feature brief, not a repo-wide config. Do **not** overwrite your root
`CLAUDE.md`. Drop this bundle at `docs/handoff/keep-the-u-open/` and add one line to the root
`CLAUDE.md`:

```md
@docs/handoff/keep-the-u-open/KEEP_THE_U_OPEN.md
```

Your root file still governs — repo conventions, commands, and house rules there take precedence
over anything below. This brief only adds feature-specific constraints.

---

Read this first, then `README.md` in this folder. `README.md` is the specification; this file is the
working agreement. Where they disagree, `README.md` wins on design detail and this file wins on
process.

## What you are building

One new route in **`CSULA-USU/web`** (Next.js 14, Pages Router, TypeScript, styled-components):

```
src/pages/keep-the-u-open.tsx
```

A campaign/informational page about a proposed +$90/semester U-SU student fee. The bundled
`Keep the U Open v2.dc.html` is a **design reference prototype**, not source to port. Open it in a
browser (`support.js` must sit beside it) to see the intended result, then rebuild it with the
repo's own components and theme.

## Before you write code

1. `ls src/components/` and read `src/components/index.ts`. Inventory what exists.
2. Read `src/theme/index.ts` — every color, space, and type value comes from there.
3. Read two or three existing pages in `src/pages/` and match their structure exactly (imports,
   `FluidContainer` nesting, `Typography` variants, `Head`/SEO block, export shape).
4. Open the prototype in a browser. Scroll the whole thing. Resize to ~375px and ~1440px.
5. Only then plan. Map each of the 16 sections in README §4 to existing components; list the
   handful that genuinely need to be new (README §1 has the candidate list and props).

## Rules

- **Compose, don't rebuild.** No bespoke styling in the page file. No raw `font-family`,
  `font-size`, `max-width`, or media queries — `Typography`, `FluidContainer`, theme tokens.
- **Never invent a number.** Every figure lives in README §5. If it is not there, render the
  visible `[NEEDS FIGURE — …]` marker from README §9. A hole is recoverable; a wrong number is not.
  Do not remove a marker because it looks unfinished.
- **Never invent copy or quotes.** `testimonials: []` renders its dashed empty state. The four v1
  quotes were fabricated and are deleted.
- **Keep `campaignMode` (README §8) the single source of mode-dependent strings.** No string
  outside that object may contain "vote yes," "ballot," or a date. The page ships in
  `informational` mode; flipping to advocacy must be a change to those strings only, no JSX edits.
- **Do not add sections, CTAs, stats, or "while I was here" polish.** The composition in README §4
  is final and was cut down deliberately.
- **Accessibility is not optional** (README §11): charts are `role="img"` with real text
  alternatives, `prefers-reduced-motion` short-circuits animation setup entirely, color is never
  the only carrier, black-on-yellow only on the `#ffce04` band.

## Suggested order

1. Route skeleton + `campaignMode` + all section shells with real copy, no charts.
2. Static components: `StatCard` / `StatBand` / `CitedStat` / `SourceList` / `AnchorNav` /
   `CtaBanner`, wired so every citation marker jumps to its `#source-N` row.
3. Charts as **static** SVG at final state — geometry from README §6, exact to the coordinate.
4. Animation last, prop-driven and off-by-default-safe (README §7). Ship without it if it fights
   the repo; the page must be correct at rest.

## Done means

- Every figure on the page traces to README §5 or shows a `[NEEDS …]` marker.
- The placeholder checklist (README §9) is reproduced in the PR description as an open checklist.
- `yarn lint` and `yarn build` pass; TypeScript strict, no `any`, no `@ts-ignore`.
- Keyboard-only pass: anchor nav → sections → FAQ expanders → citation markers → sources.
- Reduced-motion pass: no observers registered, all charts painted at final state.
- 375px pass: nothing overflows; the trend chart scrolls horizontally rather than shrinking.
- Placeholder photography and the disclaimer strip's placeholder sentence are still in place —
  removing them is the campaign lead's call, not yours.

## Ask, don't guess

Stop and ask the campaign lead if: a figure you need is missing from README §5; the repo has no
close equivalent for a component and the new one would be more than ~80 lines; or implementing a
section as specified conflicts with an established repo pattern.
