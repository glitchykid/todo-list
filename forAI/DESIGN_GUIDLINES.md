Universal, designer-grade UI/UX rules for Codex (and humans). Follow these unless a project-specific guideline explicitly overrides them.

---

## Design Commandments (10 Lines)
1. Clarity beats cleverness. If users hesitate, the UI failed.
2. Consistency is a feature. One product, one design language.
3. Accessibility is not optional. Keyboard, contrast, targets, motion preferences.
4. Content is part of design. Microcopy must guide and recover.
5. Feedback always. Every action gets acknowledgement and outcome.
6. States matter. Loading/empty/error are first-class, not afterthoughts.
7. Touch-first mindset. Hover is optional; tap must always work.
8. Hierarchy is visible in 3 seconds. Make the important look important.
9. Motion explains, not decorates. Fast, subtle, respectful.
10. Ship polished. Alignment, spacing, and sharp edges eliminated.

---

## 0) North Star
- MUST optimize for user outcomes: success rate, time-to-complete, error rate, confidence.
- MUST reduce cognitive load: fewer choices, fewer modes, fewer surprises.
- MUST make next actions obvious and safe.

---

## 1) Layout System

### Spacing and rhythm
- MUST use an 8pt spacing system (4/8/12/16/24/32/48/64).
- MUST maintain consistent vertical rhythm across screens.
- MUST ensure primary tap targets are never cramped.

### Grid and width
- MUST use consistent gutters:
  - 16px mobile
  - 24px tablet
  - 32px desktop
- MUST keep readable text widths ~680–760px where reading is primary.
- MUST support 320px width and 200% zoom without breaking usability.

### Alignment
- MUST align to a grid; avoid “almost aligned” elements.
- MUST avoid arbitrary spacing values unless justified and tokenized.

---

## 2) Typography

### Default scale (project-agnostic)
- Body: 16px, line-height 1.4–1.6
- Small: 14px (use sparingly)
- Headings: a modest scale (20 / 24 / 32 / 40)

### Rules
- MUST use at most 2 font families.
- MUST use weight/size for hierarchy before color.
- MUST keep line length 45–85 characters for long-form reading.
- MUST avoid text-in-images for core UI content.

---

## 3) Color and Contrast

### Token structure (no hardcoded colors)
Define tokens:
- bg, surface, surfaceRaised
- text, textMuted
- border
- primary, primaryHover, primaryActive
- danger, warning, success, info

### Rules
- MUST meet WCAG AA contrast:
  - normal text: 4.5:1
  - large text: 3:1
- MUST NOT rely on color alone to communicate meaning (add text/icon/shape).
- MUST support dark mode with tuned surfaces (avoid pure black backgrounds).

---

## 4) Components and Patterns

### Component contract
Every component MUST define:
- purpose
- states (default/hover/active/focus/disabled/loading/error/success)
- keyboard behavior
- empty state behavior (if applicable)
- responsive behavior

### Shape and density
- MUST use consistent radii (e.g., 8 / 12 / 16).
- MUST keep elevation subtle (borders + soft shadow).
- MUST avoid mixing incompatible styles (sharp minimal + bubbly soft) in one product.

### Buttons
- MUST limit to 3 tiers:
  - Primary (max 1 per view)
  - Secondary
  - Tertiary/Ghost
- MUST use verb labels (Save, Create, Continue).
- MUST provide min hit area 44×44px.
- MUST show loading state for async actions.

### Forms
- MUST keep labels visible (no label-only placeholders).
- MUST validate on blur and on submit; avoid noisy per-keystroke errors (except formatting).
- MUST show inline help for “how” and inline error for “what’s wrong”.

---

## 5) Interaction and Feedback

### Action feedback loop
Every user action MUST have:
- immediate acknowledgement (visual response)
- progress indicator if >300ms
- completion feedback (state update, toast if needed)
- undo for reversible destructive actions

### Motion
- MUST use motion to explain, not decorate.
- MUST keep transitions fast:
  - micro: 120–200ms
  - panels/modals: 180–260ms
- MUST respect reduced-motion settings.

### Hover
- MUST NOT make hover required for essential functionality.
- MUST ensure touch devices can do everything.

---

## 6) Navigation and Wayfinding
- MUST use one primary navigation pattern (sidebar OR tabs OR bottom nav).
- MUST keep top-level nav ≤7 items.
- MUST show where the user is (active state + page title; breadcrumbs when deep).
- MUST ensure back navigation is predictable and non-destructive.

### Search (when needed)
- MUST include search if lists exceed ~50 items or discovery is critical.
- MUST provide useful “no results” guidance.

---

## 7) States (Bad Weather Design)

Every screen MUST define:
- Loading (skeletons preferred for content)
- Empty (explain + provide next action)
- Error (plain language + recovery action)
- Partial failure (some data failed, keep what works)
- Offline/slow network (if applicable)

Empty state MUST include:
- what this area is for
- why it’s empty
- the primary next action

---

## 8) Content Design (Microcopy)

### Tone
- MUST be direct, friendly, short.
- MUST avoid blame.
- MUST avoid vague errors (“Something went wrong”).

### Error message template
- Title: what failed
- Body: why (if known) + how to recover
- Action: retry/undo/contact

---

## 9) Accessibility (Non-Negotiable)

### Keyboard + focus
- MUST make all interactive elements reachable by keyboard.
- MUST provide visible focus rings and logical tab order.

### Screen readers
- MUST label inputs properly.
- MUST provide accessible names for icon buttons.
- MUST ensure controls announce state (expanded, selected, invalid).

### Targets
- MUST use 44×44px minimum interactive target size.

---

## 10) Visual QA Checklist (Designer Pass)
Before shipping any view:
- Alignment: nothing “almost aligned”
- Spacing: consistent 8pt rhythm
- Hierarchy: scannable in 3 seconds
- Contrast: readable in bright daylight
- Density: not cramped, not wasteful
- Copy: no placeholder/jargon
- States: loading/empty/error exist
- Focus: keyboard navigation works
- Mobile: usable one-handed

---

## 11) Codex Execution Rules (When Changing UI)
When Codex changes UI, it MUST:
1. List affected screens/components.
2. Use tokens for spacing/typography/colors (no random values).
3. Implement/verify states (loading/empty/error/disabled).
4. Confirm keyboard + focus behavior.
5. Confirm responsive behavior at 320px and desktop.
6. Run a consistency pass against existing patterns.
7. Prefer reusable components over one-off UI hacks.

---

## Default Token Starter (Project-Agnostic)
- Spacing: 4, 8, 12, 16, 24, 32, 48, 64
- Radii: 8, 12, 16
- Typography: 14 / 16 / 20 / 24 / 32 / 40
- Motion: 160ms micro, 220ms panels
- Hit target: 44×44
- Content width: 720 reading, 1280 dashboard

