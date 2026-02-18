# Repository Guidelines

## Project Structure & Module Organization
- `src/` holds the Vue 3 app.
- `src/components/primitives/` low-level UI inputs/buttons/links.
- `src/components/composites/` reusable composed UI blocks.
- `src/components/sections/` screen sections with local orchestration.
- `src/components/layouts/` shell/layout wrappers.
- `src/application/` view-model/use-case logic for presentation flows.
- `src/domain/` pure domain types/validation/business rules.
- `src/stores/` Pinia persistence/state boundaries; no imports from `src/components/`.
- `src/routes/` router setup; `src/services/` API/data access; `src/utils/` helpers.
- `src/assets/styles/` split by responsibility (`design-tokens.css`, `ui-surfaces.css`, `layout-utilities.css`, `typography.css`).
- `public/` for files served as-is.
- `test/` contains Vitest specs like `tasks.test.ts` and `workspaces.store.test.ts`.

## Build, Test, and Development Commands
- `npm run dev` starts the Vite dev server on port 5173.
- `npm run build` runs `vue-tsc --build` and then `vite build`.
- `npm run build-only` runs the Vite production build without type-checking.
- `npm run type-check` runs TypeScript type checking via `vue-tsc`.
- `npm test` runs Vitest in watch/interactive mode.
- `docker compose up` runs a Node 24 Alpine container and exposes `5173` for local dev.

## Coding Style & Naming Conventions
- Use TypeScript, Vue SFCs, and Tailwind CSS classes.
- Formatting is handled by Prettier with `prettier-plugin-organize-imports` and `prettier-plugin-tailwindcss`.
- Indent script and style blocks in `.vue` files (see `vueIndentScriptAndStyle` in `.prettierrc`).
- Use descriptive PascalCase component names by role, e.g. `TaskBoardHeader.vue`, `ArchiveManagementPanel.vue`.
- Name composables by behavior (`useArchiveManagementView.ts`, `useWorkspacePanelView.ts`).
- Keep domain/application/stores decoupled from presentation component types.

## Testing Guidelines
- Testing framework: Vitest.
- Place tests in `test/` with `.test.ts` naming, e.g. `dateLogic.test.ts`.
- Run all tests with `npm test`; run a single file with `npm test -- test/tasks.test.ts`.

## Commit & Pull Request Guidelines
- Commit history uses short, scoped messages, often with a prefix like `fix:`, `chore:`, or `add:`.
- Keep subjects concise and focused on one change; avoid mixing formatting and logic in a single commit.
- PRs should include a clear summary, steps to validate, and screenshots for UI changes.
- Link relevant issues or TODOs when applicable.

## Design & UX Rules (from `forAI/DESIGN_GUIDLINES.md`)
- Follow the 8pt spacing system, consistent grid alignment, and 44×44 minimum tap targets.
- Use clear hierarchy, accessible contrast (WCAG AA), and visible focus states.
- Always define loading/empty/error states and provide recovery actions.
- Motion should explain state changes, be subtle, and respect reduced motion.

## Engineering Rules (from `forAI/ENGINEERING_RULES.md`)
- Prioritize correctness → clarity → changeability; keep logic simple and explainable.
- Keep side effects at boundaries; favor small, single-purpose functions.
- Use TDD mindset for domain logic; add regression tests for bug fixes.
- Validate inputs, avoid leaking secrets, and keep error messages actionable.
- Keep formatting consistent and update docs when contracts change.

## Configuration Notes
- Node.js version target is `^24` (see `package.json` engines).
- Environment typing lives in `env.d.ts`; Vite config is in `vite.config.ts`.
