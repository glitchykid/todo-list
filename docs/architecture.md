# Frontend Architecture

## Layers
- `src/domain/`: framework-agnostic domain types and validation.
- `src/application/`: UI-facing view-model orchestration and use-case composition.
- `src/stores/`: state persistence boundaries (Pinia + storage hydration).
- `src/components/`: presentation layer only.

## Component Taxonomy
- `primitives/`: base controls (`ActionButton`, `TextField`, `AppLink`).
- `composites/`: reusable blocks (`DatePicker`, `WorkspacePanel`).
- `sections/`: page sections that compose composites + primitives.
- `layouts/`: responsive shells and route-level composition wrappers.

## Dependency Rules
- `domain` does not import from any other app layer.
- `application` can import `domain`, `stores`, and utility modules.
- `stores` must not import from `components`.
- `components` can import from `application`, `domain`, `stores`, and other components.

## Styling Responsibilities
- `design-tokens.css`: colors, motion, typography tokens, global base.
- `ui-surfaces.css`: reusable panel/component surface classes.
- `layout-utilities.css`: safe-area and responsive utility helpers.
- `typography.css`: heading and semantic text defaults.
- `tailwind.css`: style entrypoint importing all layers.

