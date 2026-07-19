# ITROBOC Site Content Discipline

This document defines how public site content should stay attractive, honest, and synced with the real ITROBOC product state.

## Purpose

The site should help outsiders quickly understand ITROBOC:

```text
barcoded physical bridge cards -> app reads them -> validated board -> PBN export
```

It should not expose the full barcode model unless there is a specific reason. The public face should be clear and credible, not a technical diary.

## Public claim categories

Every significant public product claim should be internally classified before it appears on the site.

Use three main statuses:

### Planned

The idea is intended or on the roadmap, but should not be presented as available.

Public wording examples:

```text
Planned
On the roadmap
Future work
A planned direction
```

Avoid wording like:

```text
ITROBOC does X
Supports X
Ready for X
```

unless the feature is actually beyond planned.

### Beta

The feature exists in some working form, but may still be rough, limited, field-tested only in narrow conditions, or not fully polished.

Public wording examples:

```text
Private Android beta
Currently being tested
Early working flow
Beta workflow
```

Use this when the feature is real but should not be sold as final or broadly robust.

### Checked

The feature is implemented, tested or field-proven enough that the public site may describe it confidently.

Public wording examples:

```text
Exports PBN
Builds complete bridge boards
Supports recovery controls for common scanning mistakes
```

Checked does not mean perfect. It means the claim is grounded enough to be made plainly.

## Optional internal finer states

When helpful, Veyra/Site-Bee may use more detailed internal labels:

```text
Planned -> Prototype -> Beta -> Checked
```

But public copy should usually stay simple.

## Current known claim calibration

Known from current discussion and Selyn's site-truth draft:

- `Photo recognition` is **Planned** and should not be described as current behavior.
- `Generic OCR`, `multi-card snap recognition`, online scoring, and Bridgemate replacement are not current claims.
- `Card-by-card scanning` is at least **Beta** / working product flow.
- `Fourth-hand auto-fill` is a real product strength; classify against Android truth before final public wording.
- `Deck profiles` are real product architecture and should be treated as **Checked** when phrased at the right level.
- `Multiple codes per card` is supported through aliases and should be treated as **Checked** when phrased as profile aliases.
- `Recovery controls` such as Undo, Scissors, Swap, `I'm sure`, and Clear are real current strengths; classify as Beta or Checked depending on final Android truth wording.
- `PBN export/share/save` for complete boards is **Checked** when phrased correctly.
- `DDS-preserving PBN import/export` is a current strength when grounded against Android docs.

This list should be updated as Android repo truth changes.

## Wording rules

### Say what exists

Prefer:

```text
ITROBOC helps tournament directors turn barcoded physical cards into bridge hand records and PBN export.
```

Avoid over-wide claims like:

```text
ITROBOC automatically recognizes every card from any photo.
```

unless that becomes true.

### Keep technical detail proportional

The public site does not need to explain Grid13, `bfm`, `brm`, run lengths, sentinel bits, or barcode fixture manifests.

Use a non-technical funnel:

```text
Physical barcoded cards
-> camera-assisted reading
-> deck profile maps barcodes to cards
-> board validation
-> PBN export
```

Technical details may later live behind a `Technical notes` page, but should not dominate the landing page.

### Avoid hype-slop

Do not use generic startup fog such as:

```text
revolutionary
AI-powered transformation
seamless universal automation
next-generation experience
```

unless a specific grounded sentence backs it up.

Preferred tone:

```text
specific, practical, bridge-literate, calm, confident
```

Useful Selyn flavor:

```text
small beetle, serious table job
fast deal capture
less manual typing
safe recovery from field mistakes
PBN output for real tournament workflows
```

## Feature copy checklist

Before publishing a feature claim, ask:

1. Is it Planned, Beta, or Checked?
2. Which repo/doc/source grounds it?
3. Is the wording honest for a bridge TD reading quickly?
4. Does it imply robustness we do not have yet?
5. Does it explain value without exposing unnecessary implementation detail?
6. Does it reduce confusion for non-technical bridge people?

## First landing-page truth-alignment ticket

Selyn's first-ticket direction remains valid.

Goal:

```text
Make the landing page truthful and launchable.
```

Scope:

1. Replace the default Vite `README.md` with an ITROBOC site README.
2. Document local commands:
   - `npm install`
   - `npm run dev`
   - `npm run build`
   - `npm run preview`
   - `npm run lint`
3. Align `src/App.tsx` copy with current Android repo truth.
4. Remove or clearly mark future-only `Photo recognition`.
5. Add or revise landing-page content for current strengths:
   - TD card-by-card scanning;
   - fourth-hand auto-fill;
   - deck profiles;
   - recovery controls;
   - PBN export/share/save;
   - DDS-preserving PBN import/export;
   - private Android beta status.
6. Keep the existing dark/gold beetle scanner look unless Archy asks for redesign.
7. Add deployment notes for Vercel / `https://itroboc.com/` once the current setup is inspected.

Non-goals:

- do not build a full documentation portal yet;
- do not invent download links before release policy is clear;
- do not claim OCR, generic photo recognition, multi-card snap recognition, online scoring, or Bridgemate replacement;
- do not duplicate Android architecture docs inside the site repo.

## Docs hygiene patrol setup

Docs hygiene patrol should be light and recurring-by-need.

Suggested patrol types:

### Link patrol

Search for Markdown links and obvious path references. Check whether they still resolve.

Targets:

- README;
- `docs/**`;
- any public page copy with links.

### Claim patrol

Compare site claims against Android repo truth.

Targets:

- landing hero;
- feature cards;
- roadmap/news sections;
- README.

### Duplicate-source patrol

Look for sibling docs or duplicated explanations that could diverge.

The Grid13 underscore/dash sibling issue is the model example: merge into one canonical file and remove the second source of truth.

### Tone patrol

Check whether copy is attractive but still grounded.

Questions:

- Is it too dry?
- Is it overhyped?
- Is the bridge TD value obvious?
- Is the beetle charming without taking over the product?

## Proposed Android -> site sync pattern

When the Android repo changes in a way that may affect the public site:

1. Archy, Bob/Codex, Foxy, or Selyn notes the change as site-relevant.
2. Veyra classifies the content impact:
   - no site impact;
   - docs-only site note;
   - public copy update;
   - future news/roadmap item.
3. Site-Bee implements source changes only after wording is classified.
4. Archy checks the visible result on Vercel / `https://itroboc.com/`.

Potential future lightweight file:

```text
docs/android-sync-notes.md
```

Example entry:

```text
2026-07-XX
Android repo change: TD::EditBoard recovery controls stabilized.
Site impact: public copy update.
Claim status: Beta -> Checked for Undo / Scissors / Swap / I'm sure / Clear.
Next site action: add short recovery-controls feature sentence.
```

Do not create this file until the sync pulse needs a persistent queue.

## Landing page principle

The landing page should answer, fast:

```text
What problem does this solve?
Who is it for?
What does it do now?
What is still beta/planned?
How can someone follow or request access?
```

The site can be warm and stylish. It should feel like a serious bridge tool with a small beetle soul, not like a generic SaaS template.
