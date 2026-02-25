# Repository Guidelines

## Project Scope

This repository builds the **TechArt Room Card** Home Assistant Lovelace custom card.
The project ships a single frontend module consumed by Home Assistant via HACS/manual resource loading.

## Architecture at a Glance

- Public/distribution artifacts:
  - `tech-art-room-card.js` (built artifact, root)
  - `hacs.json` (HACS metadata)
  - `README.md` (user docs + YAML examples)
- Source of truth:
  - `src/tech-art-room-card.ts`
    - `TechArtRoomCard` (runtime card UI + HA service actions)
    - `TechArtRoomCardEditor` (Lovelace visual editor)
    - config interfaces/types used by both runtime and editor
- Build system:
  - `rollup.config.mjs` (Rollup + TypeScript + version injection)
  - `package.json` scripts (`build`, `watch`, `lint`)

## Core Rules

- Fix root causes, not symptoms.
- Keep edits surgical; avoid unrelated refactors.
- Preserve backward compatibility for existing YAML unless migration is explicitly requested.
- Keep Home Assistant UX native (prefer HA components and patterns over custom reinventions).
- Never commit secrets, tokens, or environment-specific local paths.

## Config Model Coupling Rules (Critical)

When adding/changing card config options, update all relevant layers in one change:

1. `src/tech-art-room-card.ts` types/interfaces (`RoomCardConfig` and nested config types)
2. `TechArtRoomCard.setConfig()` normalization/default handling
3. Runtime rendering logic that consumes the config
4. Editor UI (`TechArtRoomCardEditor.render()`) with proper controls/events
5. Editor update helpers (`_emit`, list setters, or new setters) so changes persist correctly
6. `TechArtRoomCard.getStubConfig()` when defaults/examples should include the new option
7. `README.md` example/config notes for user-facing changes

If one of these is skipped, runtime/editor behavior drifts and users get invalid or confusing configs.

## Home Assistant Editor Rules (Critical)

- Prefer `ha-selector` for entity inputs in the editor.
- Use domain filtering where appropriate (`.selector=${{ entity: { domain: ... } }}`).
- Keep selectors clearable (`allow-custom-entity` and `.required=${false}` where applicable).
- For dynamic lists (arrays), support add/remove and preserve stable updates.
- Home Assistant config objects may be frozen deeply:
  - never mutate nested config directly
  - deep-clone before writes in editor dispatch paths
- For clearing values, remove keys instead of storing invalid empty entity IDs.

## Runtime Behavior Rules

- Gate all state reads through entity existence checks (`this.hass.states[...]`).
- Handle non-numeric sensor values defensively to avoid `NaN` UI output.
- Use domain-appropriate services for actions; avoid assumptions across domains.
- Preserve graceful degradation: hide sections/rows when entities are absent/unavailable.

## Build/Artifact Rules

- Build output is root `tech-art-room-card.js` (not `dist/`).
- Keep `hacs.json` aligned with actual artifact filename/path.
- Version is injected from `package.json` via Rollup (`__CARD_VERSION__` replacement).
- Do not manually edit generated artifact for source changes; edit `src/` and rebuild.

## Coding Style

- TypeScript + Lit style should remain consistent with existing file conventions.
- Prefer small helpers and explicit guards over implicit assumptions.
- Keep comments minimal and focused on non-obvious behavior.
- Avoid new dependencies unless clearly justified.

## Validation Checklist (Run After Relevant Changes)

From repo root:

```sh
npm run lint
npm run build
```

For config/editor changes:
- verify Lovelace editor can set, clear, add, and remove values
- verify no “Card configuration is invalid” regression
- verify dynamic list controls (e.g., sensors/lights/footer arrays) still function

For runtime behavior changes:
- verify card renders with partial config (missing optional entities)
- verify action handlers call expected Home Assistant services

## Commit Scope

- Group related changes only.
- Avoid formatting-only churn unrelated to the task.
- Do not commit temporary/debug artifacts.
