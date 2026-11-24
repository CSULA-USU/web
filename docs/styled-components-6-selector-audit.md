# styled-components 6 selector audit

Audited 2026-11-24 on `chore/radix-react19`, against HEAD `91b08deb` and the existing working-tree changes. This audit changes documentation only.

## Result

No remaining unqualified self-targeting pseudo-selector migration defects were found in the audited source. The working tree contains **18 corrections across 8 files**, all currently uncommitted relative to HEAD. HEAD alone still contains the old selectors; this result applies to the working tree, not a deployed build.

This is a source audit, not browser sign-off or a claim that the entire styled-components migration is complete.

## Scope and method

- Examined source selectors across pages, backoffice, shared components, modules, sections, partials, theme helpers, and styles. Excluded `src/pages/_edit/` and `src/modules/EditDrawer/` at the user's explicit request, plus test files and installed/generated output.
- Inventoried 505 JS/TS/CSS-family source files in that scope: 503 JS/TS files and 2 CSS files. Of these, 211 files directly import/require styled-components. The inventory includes support files; these are not counts of pages or defects.
- Used a broad pseudo-selector search, followed by TypeScript AST inspection of string literals and template fragments, including conditional CSS, helper-returned strings, media-query bodies, and quoted object property names. Inspected interpolated component-selector matches manually to distinguish parent selectors from bare pseudo-selectors.
- Compared the current source against HEAD to identify existing corrections rather than treating them as new findings.
- Checked representative selector expansion using the installed Stylis implementation. This confirms compilation semantics; it does not exercise application layout or interaction.
- Inspected global CSS separately so valid global pseudo-selectors would not be flagged as missing `&`.

The migration rule comes from the official [styled-components v6 guide](https://styled-components.com/docs/faqs#what-do-i-need-to-do-to-migrate-to-v6): a nested `:hover` without `&` targets descendants in v6; `&:hover` targets the styled element itself. The same distinction applies to pseudo-elements.

## Existing corrections verified

Line references point into the current working tree.

| File                                                  |  Count | Verified changes                                                                                                                                  |
| ----------------------------------------------------- | -----: | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `src/components/Eyebrow/Eyebrow.tsx:46`               |      1 | Accent rule uses `&::before` inside conditional CSS.                                                                                              |
| `src/components/FluidContainer/FluidContainer.tsx:42` |      3 | Element-image scrim, blurred background layer, and overlay use `&::after` / `&::before`; also checked lines 81 and 97.                            |
| `src/components/ScrollCue/ScrollCue.tsx:291`          |      4 | Base cue, traveling layer, and reduced-motion overrides use explicit self selectors; also checked lines 309, 321, and 332.                        |
| `src/components/Tabs/Tabs.tsx:73`                     |      6 | Scrollbar, base hover/focus, folder hover/focus, and panel focus all use explicit self selectors; also checked lines 107, 112, 139, 143, and 179. |
| `src/modules/UKrewCardList/Card.tsx:25`               |      1 | Card hover uses `&:hover`.                                                                                                                        |
| `src/pages/_u-krew/_directory/index.tsx:89`           |      1 | Directory card hover uses `&:hover`.                                                                                                              |
| `src/pages/recreation/membership.tsx:80`              |      1 | Rule-heading divider uses `&::after`.                                                                                                             |
| `src/sections/InstagramFeed/InstagramFeed.tsx:78`     |      1 | Instagram link container uses `&:hover`.                                                                                                          |
| **Total**                                             | **18** | **8 files**                                                                                                                                       |

`Expandable`'s existing diff additionally aligns transient prop names between CSS and JSX. That is a related styling fix, not another missing-ampersand selector correction.

## Matches that should remain as written

- `src/pages/_app.tsx:61`: `:root` is inside a global styled-jsx block, not a nested styled-components rule.
- `src/styles/globals.css:47`: global `::selection` (and the following `::-moz-selection`) belongs to ordinary global CSS.
- `src/modules/Nav/DesktopNav.tsx:176`: `> :last-child` deliberately selects a direct child.
- `src/modules/Backoffice/AccessManagement/AccessManagementUserFilters.tsx:32`: `> :first-child` also deliberately selects a child.
- `src/modules/Nav/DesktopNav.tsx:132`: `.szh-menu__item--submenu:after` targets descendant submenu rows. It is not a bare self pseudo-selector.
- `src/pages/recreation/membership.tsx:361`: table cell/row selectors intentionally target descendants.
- Component-interpolated parent selectors such as `${Card}:hover &` in `src/modules/UAwards/UAwardsValues.tsx:114` explicitly target the current element when its parent is hovered. Equivalent forms in PhotoGallery, FSL, SectionRail, and web-team styles were checked and are not missing `&`.

Do not blanket-prepend `&` to descendant selectors: that would change their meaning.

## Separate existing selector concern

`src/components/Select/Select.tsx:36` uses `*:focus`. This selects focused descendants, not the Radix trigger button itself. Its custom box-shadow rule therefore does not apply when the trigger itself receives focus.

This selector is already present in HEAD and is not an unqualified pseudo-selector migration omission. Global button focus styling exists in `src/styles/globals.css:34`, so this source observation is not proof of an invisible focus indicator. If the intended design is a trigger-specific focus treatment, verify it in the browser before authorizing a separate change.

The explicit descendant hover/focus rules in `how-to-vote` and meeting-room navigation are likewise not newly introduced by this migration and were not automatically rewritten.

## Verification and limits

Installed Stylis produced the expected distinctions:

```css
/* Input inside .audit */
:hover       /* => .audit :hover */
&:hover      /* => .audit:hover */
::before     /* => .audit ::before */
&::before    /* => .audit::before */
> :last-child /* => .audit >:last-child */
*:focus      /* => .audit *:focus */
.parent:hover & /* => .parent:hover .audit */
```

No application code was edited. No production build, test suite, or browser session was run for this source-only audit. Earlier type/lint/test results are separate evidence and were not rerun here.

Static inspection cannot prove every runtime-generated CSS branch or visual interaction. Browser checks should still confirm hover/focus on the full target, pseudo-element placement, folder-tab overflow, and ScrollCue reduced-motion behavior. Prioritize `/save-the-u`, `/recreation/membership`, `/board-of-directors`, and a page with InstagramFeed. These are verification recommendations, not additional implementation requirements.

## Recommended disposition

Keep the existing 18 corrections, perform the focused browser pass, and include the fixes in the intended upgrade commit/PR. This audit found no additional missing-ampersand application changes to hand off for implementation.
