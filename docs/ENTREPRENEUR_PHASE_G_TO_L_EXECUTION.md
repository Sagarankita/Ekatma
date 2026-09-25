# Entrepreneur Phase G correction through Phase L

**Authority:** `ENTREPRENEUR_MIGRATION.md`, then `ENTREPRENEUR_CURRENT_STATE_TO_TARGET.md`. The current source is the visual and behavior reference. User decision: Sahyadri Bio-Pharma deep records remain unbound until a real business ID exists. E24–E28 should be extracted now, but their business routes must remain unavailable for unbound data. No commits, merges, or pushes.

## 1. Close the Phase G identity gap

- [x] Make applications and inspections lists resolve records by exact `businessId` from the canonical identity catalog.
- [x] Validate exact application, query, resubmission, inspection, and decision business/parent relationships at App Router boundaries.
- [x] Keep the Sahyadri intake and its E14–E23 records out of `BP-001`, `BP-002`, and `BP-003` routes. Keep the genuinely bound `BP-001` applications reachable.
- [x] Replace E2E expectations that treated Sahyadri records as `BP-001` records; add a wrong-business regression.
- [x] Update the connection matrix to match runtime behavior.

## 2. Prompt 7 / Phase H

- [x] H1: extract E24 and E25 UI/data into one compliance feature; exact ID lookup; no first-record fallback. Render no Sahyadri obligation under a BP business.
- [x] H2: extract E26, E27, E28 UI/data into one incentives feature; exact scheme lookup; no first-scheme fallback. Keep claims as local row state, as the route contract specifies.
- [x] Wire typed routes and sidebar state only where genuine business-bound records exist. Make unavailable destinations truthful and non-interactive.
- [x] Update the matrix. At the end of Prompt 7 run typecheck, unit tests, build, Entrepreneur E2E, and Department routing E2E.

## 3. Prompt 8 / Phase I

- [x] Extract E29–E34 by feature, preserving current visible behavior and separating URL, search, local, and workflow state.
- [x] Keep unbound Sahyadri regulatory-change data out of BP business pages. Bind BP-001 grievance records exactly. Keep notifications and assistant user-global as documented.
- [x] Update the matrix and run broad verification at the end of Prompt 8.

## 4. Prompt 9 / Phase J

- [x] Finish E00 at `/entrepreneur/businesses/[businessId]` using only exact bound records.
- [x] Complete sidebar and business-switcher navigation through typed builders; preserve equivalent context only when valid for the target business.
- [x] Audit visible controls and matrix; run broad verification at the end of Prompt 9.

## 5. Prompt 10 / Phase K

- [x] Remove remaining production dependencies on `[screen]`, old page unions, `EntrepreneurApp`, `entrepreneurPath`, manual `pushState`, and `popstate` routing after extracting any still-required UI/data.
- [x] Remove obsolete E-screen E2E expectations; run full Entrepreneur and Department E2E, unit tests, typecheck, and build.

## 6. Prompt 11 / Phase L

- [x] Audit the 40 acceptance items in Prompt 11, including route identity, deep links, Back/Forward, one shell, Department PWA scope, and no dead controls.
- [x] Report final route tree, feature structure, route API, ID table, matrix status, changed files, validation, and limitations. Run final checks only for concrete unresolved risk.

## Testing cadence

During each prompt, run only the focused failing/passing contract or typecheck needed for the edit. Run the requested broad suites once at that prompt's end. Do not run redundant full suites between sub-batches.
