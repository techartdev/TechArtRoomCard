---
description: Release TechArt Room Card
---

1. Confirm release scope and version
   - Ensure all intended changes are in `src/tech-art-room-card.ts` and related docs.
   - Confirm `package.json` has the target version.

2. Validate repo state before release
   - Review changed files and ensure there are no unrelated edits.
   - Ensure `hacs.json` still points to `tech-art-room-card.js`.

3. Run quality checks from repo root
// turbo
   - `npm run lint`
// turbo
   - `npm run build`

4. Verify artifact and version injection
   - Confirm `tech-art-room-card.js` exists in repo root.
   - Confirm built artifact contains the expected version value from `package.json`.

5. Validate Lovelace/editor behavior (manual smoke test)
   - Open card editor in Home Assistant and verify entity selectors are visible.
   - Verify clear/unset works for selector fields.
   - Verify dynamic arrays still support add/remove (lights, extra sensors, footer buttons).
   - Verify no “Card configuration is invalid” errors.

6. Update user-facing documentation when needed
   - Update `README.md` examples for any new/changed config fields.
   - Keep examples backward compatible unless migration is intentional.

7. Prepare release commit
   - Include only related files (source, docs, metadata).
   - Avoid formatting-only churn and generated noise unrelated to release.

8. Final pre-publish check
   - Re-open `hacs.json` and confirm filename/version compatibility.
   - Ensure release notes/changelog (if used) matches shipped behavior.
