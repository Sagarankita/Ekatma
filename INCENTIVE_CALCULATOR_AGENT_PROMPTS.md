# EKATMA Incentive Calculator Integration — Coding Agent Prompts

> Prepared after comparing `entrepreneur-with-incentive-calc.zip` with `Ekatma-main (2).zip`.
>
> Goal: use the newer Figma/Vite Entrepreneur project as a **temporary, read-only visual/behavioral reference** and migrate the new incentive calculator/workspace into the existing EKATMA Next.js Entrepreneur architecture without regressing the already-migrated E26–E28 incentive journey.

---

## 0. What was found during the repository comparison

The two ZIPs are not equivalent applications:

- The temporary reference is a React 19 + Vite + Tailwind v4 Figma Make project. Most behavior is concentrated in `src/App.tsx` and uses a SPA-style `Page` union plus `setPage(...)` navigation.
- The main repo is already a Next.js App Router application (Next 16.3.5 in the supplied ZIP) with native `/entrepreneur/**` routes, centralized route builders, canonical business/entity identity, feature modules, Vitest, and Playwright.
- The main repo **already contains E26, E27, and E28** under `src/features/entrepreneur/incentives/`:
  - incentive discovery/list
  - incentive detail
  - incentive application / eligibility / claims
- The newer Figma reference adds a second incentive experience, identified in the Figma code as **I01–I09**:
  - I01 Incentive Centre
  - I02 Calculate Incentives / Business DNA reuse
  - I03 Adaptive / missing-information questionnaire
  - I04 Review before calculation
  - I05 Incentive Portfolio / results
  - I05A Incentive detail with calculation explanation
  - I06 Claim Readiness
  - I06A Claim Tracker
  - I07 ROI & Investment Scenario Planner
  - I07A ROI Results / Investment Outlook
  - I08 Scenario Simulator
  - I09 Policy Updates
- No new runtime package is necessary merely to reproduce these Figma screens. The reference uses React/Tailwind constructs the main repo already supports.

### Critical integration constraints discovered

1. **Do not overwrite the existing E26–E28 module.** The main repo already has business-scoped incentive schemes, claims, route validation, and regression tests.
2. **Do not copy the Figma `App.tsx` into production.** Extract the new incentive screens into normal feature modules and Next.js routes.
3. The Figma reference hardcodes a different business context (`ABC Manufacturing Pvt. Ltd.`, Ratnagiri) while the main repo's deep incentive fixture is attached to `BP-004` (`Sahyadri Bio-Pharma Pvt Ltd`, Chakan). Never silently relabel the Figma values as though they belong to an existing EKATMA business.
4. The Figma reference introduces additional opportunity IDs such as `PSI-ELEC`, `STAMP`, `EMP-LINK`, `GREEN`, `MIDC-INFRA`, and `RD-INNOV`. These do **not** automatically become canonical main-repo incentive entities. Keep calculator/opportunity fixtures separate unless an ID is deliberately added to the main identity contract with evidence.
5. The Figma `I05ADetailPage` falls back to the first scheme when an ID is missing/invalid. **Do not preserve this bug.** Main repo detail routes must resolve the exact requested record or return `notFound()` / a truthful unavailable state.
6. The Figma `I06ATrackerPage` receives `claimId` but ignores it and always uses `INCENTIVE_CLAIMS[0]`. **Do not preserve this bug.** A claim route must resolve the exact `claimId` for the exact `businessId`.
7. In the Figma app, calls such as `onGoToDetail={(id) => setPage('i05a-detail')}` discard the actual record ID. In Next.js every row/card action must carry the real ID into the URL.
8. The main repo's `AuthenticatedShell.switchedDestination(...)` currently interprets any `/incentives/<first-segment>` as a possible `incentiveId`. New static subroutes such as `/incentives/calculator` must be recognized **before** that dynamic-ID logic, otherwise changing businesses from a calculator page will incorrectly collapse back to the incentive list.
9. Existing Playwright coverage depends on these current URLs and behaviors:
   - `/entrepreneur/businesses/BP-004/incentives`
   - `/entrepreneur/businesses/BP-004/incentives/PSI-2019`
   - `/entrepreneur/businesses/BP-004/incentive-claims?schemeId=PSI-2019`
   Treat these as existing contracts unless there is an explicit, tested migration plan.
10. The existing `BusinessDnaProvider` is scoped to `/entrepreneur/businesses/new/**` and represents the **new-business draft**. Do not blindly reuse that provider as the data source for an already-existing business's incentive calculation. Create a business-scoped incentive-workspace state/data adapter instead.

---

# 1. Put the temporary reference in the repo correctly

The existing `ENTREPRENEUR_MIGRATION.md` already defines the safest pattern for a temporary Figma project.

Recommended local layout:

```text
Ekatma-main/
├── reference/
│   └── entrepreneur-figma/       # contents of entrepreneur-with-incentive-calc.zip
├── src/
├── e2e/
├── ENTREPRENEUR_MIGRATION.md
├── ENTREPRENEUR_CURRENT_STATE_TO_TARGET.md
├── AGENTS.md
└── ...
```

Use the new ZIP contents as `reference/entrepreneur-figma/` even if the downloaded folder was originally named `entrepreneur-with-incentive-calc`. This keeps the location aligned with the repo's existing migration contract.

Rules for the reference directory:

- read-only reference
- do not import from it
- do not add it to a workspace
- do not run it as a second production app
- do not move it under `src`, `src/app`, `src/features`, `public`, or `e2e`
- production code must continue to build after the entire `reference/entrepreneur-figma/` directory is deleted
- do not commit the temporary reference unless you intentionally want it in source control

---

# 2. Recommended additive route plan

Do **not** expose `i01`, `i02`, etc. in production URLs.

The safest default is to keep the existing E26/E27/E28 URLs intact and add the calculator/workspace under static subroutes of the existing incentives resource:

```text
/entrepreneur/businesses/[businessId]/incentives                         existing E26 discovery
/entrepreneur/businesses/[businessId]/incentives/[incentiveId]           existing E27 detail
/entrepreneur/businesses/[businessId]/incentive-claims                   existing E28 claims

/entrepreneur/businesses/[businessId]/incentives/centre                  I01
/entrepreneur/businesses/[businessId]/incentives/calculator              I02
/entrepreneur/businesses/[businessId]/incentives/calculator/questionnaire I03
/entrepreneur/businesses/[businessId]/incentives/calculator/review       I04
/entrepreneur/businesses/[businessId]/incentives/portfolio               I05
/entrepreneur/businesses/[businessId]/incentives/portfolio/[incentiveId] I05A
/entrepreneur/businesses/[businessId]/incentives/claim-readiness         I06
/entrepreneur/businesses/[businessId]/incentives/claims/[claimId]        I06A
/entrepreneur/businesses/[businessId]/incentives/roi                     I07
/entrepreneur/businesses/[businessId]/incentives/roi/results             I07A
/entrepreneur/businesses/[businessId]/incentives/scenarios               I08
/entrepreneur/businesses/[businessId]/incentives/policy-updates          I09
```

Why additive is the recommended first implementation:

- it does not destroy existing E26–E28 deep links
- it does not force existing Playwright tests to be rewritten for unrelated reasons
- it allows the new Figma module to be reviewed independently
- static route segments can coexist with the existing `[incentiveId]` route
- after parity is proven, the product can deliberately decide whether `/incentives` itself should become I01 and whether E26 should move to a discovery subroute

Do **not** repurpose `/incentives` to I01 during the first pass unless the task explicitly requires that information architecture change.

---

# 3. Recommended production code structure

Keep the current incentive implementation intact and add the new workspace as smaller modules instead of making `IncentiveScreens.tsx` even larger.

Suggested shape:

```text
src/features/entrepreneur/incentives/
├── data.ts                        # existing E26–E28 data; preserve
├── IncentiveScreens.tsx           # existing E26–E28 screens; preserve
├── IncentiveRoute.tsx             # existing E26–E28 route adapter; preserve
├── incentives.test.ts             # existing tests; preserve/extend carefully
│
└── workspace/
    ├── types.ts
    ├── data.ts
    ├── state.tsx                  # only if cross-route draft state is needed
    ├── selectors.ts
    ├── IncentiveWorkspaceHeader.tsx
    ├── IncentiveCentreScreen.tsx
    ├── CalculatorStartScreen.tsx
    ├── CalculatorQuestionnaireScreen.tsx
    ├── CalculatorReviewScreen.tsx
    ├── IncentivePortfolioScreen.tsx
    ├── IncentivePortfolioDetailScreen.tsx
    ├── ClaimReadinessScreen.tsx
    ├── ClaimTrackerScreen.tsx
    ├── RoiPlannerScreen.tsx
    ├── RoiResultsScreen.tsx
    ├── ScenarioSimulatorScreen.tsx
    ├── PolicyUpdatesScreen.tsx
    └── workspace.test.ts
```

Route-level `page.tsx` files should remain thin: validate params, load exact business/record data, then render the feature screen or a small route adapter.

---

# 4. MASTER PROMPT — use this if the coding agent can do the complete integration safely

Copy the prompt below into the coding agent from the root of the main EKATMA repo.

```text
You are working inside the MAIN EKATMA Next.js repository.

A newer Figma/Vite Entrepreneur reference has been placed temporarily at:

reference/entrepreneur-figma/

It contains new Incentive Calculator / Incentive Centre screens in reference/entrepreneur-figma/src/App.tsx, identified there as I01 through I09 (including I05A, I06A and I07A).

Your task is to migrate ONLY the new incentive workspace/calculator capability into the existing MAIN repo architecture while preserving the already-migrated Entrepreneur experience.

IMPORTANT: do not start coding until you have read these files completely or inspected the task-relevant sections:

1. AGENTS.md
2. CLAUDE.md
3. ENTREPRENEUR_MIGRATION.md
4. ENTREPRENEUR_CURRENT_STATE_TO_TARGET.md
5. src/lib/routes/entrepreneur.ts
6. src/features/entrepreneur/shell/AuthenticatedShell.tsx
7. src/features/entrepreneur/identity/catalog.ts
8. src/features/entrepreneur/identity/route-params.ts
9. src/features/entrepreneur/businesses/catalog.ts
10. src/features/entrepreneur/incentives/data.ts
11. src/features/entrepreneur/incentives/IncentiveScreens.tsx
12. src/features/entrepreneur/incentives/IncentiveRoute.tsx
13. src/features/entrepreneur/incentives/incentives.test.ts
14. e2e/entrepreneur-compliance-incentives.spec.ts
15. e2e/entrepreneur-overview-navigation.spec.ts
16. e2e/entrepreneur-route-contract.spec.ts
17. reference/entrepreneur-figma/AGENTS.md
18. reference/entrepreneur-figma/src/App.tsx, specifically:
    - the Incentives Module Data section
    - IncentivePageHeader
    - I01IncentiveCentrePage
    - I02CalculatorPage
    - I03QuestionnairePage
    - I04ReviewPage
    - I05PortfolioPage
    - I05ADetailPage
    - I06ReadinessPage
    - I06ATrackerPage
    - I07ROIPlannerPage
    - I07AROIResultsPage
    - I08ScenariosPage
    - I09PolicyUpdatesPage
    - the Entrepreneur sidebar Incentives entry
    - the App navigation branches for i01–i09

SOURCE PRECEDENCE:
- current task requirements
- executable new Figma reference for visual/behavioral intent of the new incentive workspace
- MAIN repo architecture, identity and route contracts
- pasted reference specs only for supporting detail

NON-NEGOTIABLE RULES:

A. reference/entrepreneur-figma is READ ONLY.
Do not edit it, import from it, symlink it, add it to a workspace, or make production depend on it.

B. Do not copy the Figma SPA architecture.
No Page union, no global setPage router, no giant App.tsx, no permanent i01/i02-style URLs.
Use native Next.js App Router routes and the existing centralized entrepreneur route builders.

C. Preserve existing E26/E27/E28 behavior and routes.
The MAIN repo already has:
- /entrepreneur/businesses/[businessId]/incentives
- /entrepreneur/businesses/[businessId]/incentives/[incentiveId]
- /entrepreneur/businesses/[businessId]/incentive-claims?schemeId=...
Do not delete or silently repurpose these during the first pass.

D. Add the new Figma workspace additively with domain URLs. Use this route plan unless inspection reveals a concrete collision:
- incentives/centre
- incentives/calculator
- incentives/calculator/questionnaire
- incentives/calculator/review
- incentives/portfolio
- incentives/portfolio/[incentiveId]
- incentives/claim-readiness
- incentives/claims/[claimId]
- incentives/roi
- incentives/roi/results
- incentives/scenarios
- incentives/policy-updates

Add typed builders to src/lib/routes/entrepreneur.ts. Do not scatter literal URLs through feature components.

E. Preserve exact route identity.
The reference contains unsafe fallbacks that MUST NOT be copied:
- I05ADetailPage falls back to the first scheme for an invalid schemeId.
- I06ATrackerPage ignores claimId and uses the first claim.
- some navigation callbacks discard the clicked scheme ID.
In MAIN:
- exact scheme ID in URL must equal the displayed scheme
- exact claim ID in URL must equal the displayed claim
- invalid/mismatched IDs must produce notFound() or a truthful unavailable state
- never silently substitute a demo record

F. Preserve business ownership isolation.
The reference hardcodes ABC Manufacturing Pvt. Ltd. / Ratnagiri.
The main repo has canonical businesses BP-001…BP-004, with the current deep incentive prototype attached to BP-004 Sahyadri Bio-Pharma / Chakan.
Do not show Ratnagiri/ABC values as though they belong to BP-004 or any other business.
Do not attach calculator opportunities to a business solely because a city/sector looks similar.
Any new prototype calculator fixture must be explicitly business-scoped and must never leak between businesses.
If reference-only values cannot be truthfully mapped, keep them as clearly marked prototype/calculator fixture values or mark the relevant field as needing input; do not invent verification.

G. Keep the existing legal/preliminary incentive model separate from the new calculation/workspace model unless there is a deliberate adapter.
Do not replace src/features/entrepreneur/incentives/data.ts wholesale with INCENTIVE_DETAIL_SCHEMES from the Figma reference.
Prefer a new workspace/data.ts and selectors keyed by businessId.
Reuse existing scheme IDs such as PSI-2019 only where identity actually matches.
Do not automatically add PSI-ELEC, STAMP, EMP-LINK, GREEN, MIDC-INFRA or RD-INNOV to canonical entity identity merely because they exist in the Figma UI.

H. Business DNA reuse must be honest.
The existing BusinessDnaProvider is a new-business draft provider scoped under /businesses/new. Do not use that global draft as if it were the persisted profile for an arbitrary existing business.
For the calculator, create a business-scoped adapter/state model that distinguishes:
- canonical business identity/project values
- available business/profile inputs
- calculator user inputs
- verified/system-derived values
- missing values
- prototype assumptions
Retain source/provenance badges from the reference UI.

I. Cross-route state must be route-safe.
Questionnaire values needed by calculator/review pages should survive normal Next.js route navigation and refresh when practical. Use the simplest scoped mechanism, preferably a small business-scoped sessionStorage-backed provider or equivalent existing repo pattern. Do not add Redux.
Never use a single unkeyed global calculator draft that can leak BP-004 values to BP-001.

J. UI parity.
Port the Figma visual structure, copy, status badges, tables, disclaimers, local tabs/accordions and responsive behavior as closely as practical using Tailwind utilities already used by the main repo.
Use the MAIN AuthenticatedShell; do not duplicate AccessibilityStrip, PortalHeader, sidebar or Footer inside these screens.
The shared incentive workspace header should receive real business/project data rather than hardcoding ABC Manufacturing.

K. Prototype truthfulness.
Do not invent a backend, policy engine, AI engine, legal determination, claim persistence or live policy feed.
Where the Figma is static/prototype-only, preserve that as deterministic demo behavior and label estimates as indicative exactly as the reference intends.
No active-looking button may silently do nothing. Every control must be navigation, local UI interaction, truthful prototype action, or visibly unavailable.

L. Shell/business switching.
Update AuthenticatedShell.switchedDestination(...) carefully. Right now /incentives/<segment> is interpreted as an incentive ID. New static routes such as calculator, portfolio, claim-readiness, claims, roi, scenarios and policy-updates must be matched before dynamic scheme-ID parsing.
When switching businesses:
- preserve the equivalent nested workspace route when it is valid for the target business
- otherwise route to a truthful incentives parent/empty state
- never interpret "calculator", "portfolio", "roi", etc. as scheme IDs

M. Existing Department code is frozen.
Do not modify /department behavior, auth, PWA scope or routes.

IMPLEMENTATION STRUCTURE:
Prefer adding a focused subtree such as:
src/features/entrepreneur/incentives/workspace/
with separate types/data/state/selectors/screens rather than appending thousands of lines to IncentiveScreens.tsx.

FIRST, before editing code, report a short audit containing:
1. exact reference functions/data blocks you will port
2. existing MAIN files you will integrate with
3. final route table
4. which data is canonical vs prototype-only
5. state that is URL state vs cross-route calculator state vs local UI state
6. controls/click paths that need real IDs
7. existing tests that could regress

Then implement in small batches.

TEST REQUIREMENTS:
Add or extend Vitest and Playwright coverage for:
- typed route builders for every new route
- exact business isolation
- exact portfolio incentiveId lookup
- exact claimId lookup
- invalid IDs do not fall back
- all new pages keep Incentives sidebar active
- calculator entry -> questionnaire -> review -> portfolio click path
- portfolio card -> correct /portfolio/[incentiveId]
- claim readiness -> exact /claims/[claimId]
- ROI -> results -> scenarios
- policy update -> exact affected scheme detail when a valid relationship exists
- direct deep link + refresh for representative pages
- Back/Forward browser history
- business switch on calculator/portfolio/roi/scenario routes
- BP-001/BP-002/BP-003 never display BP-004 calculator data unless explicitly mapped
- existing E26/E27/E28 tests still pass
- existing Department routing tests still pass

RUN BEFORE DECLARING COMPLETION:
- npm/pnpm script equivalent of typecheck
- relevant Vitest suite
- relevant Playwright entrepreneur suites
- production build
Use the actual scripts present in package.json.

Also run a dependency check such as searching src/, e2e/ and config for imports or paths pointing at reference/entrepreneur-figma. There must be none.

FINAL REPORT MUST INCLUDE:
- files added
- files changed
- route builders added
- route table
- data/provenance decisions
- deviations from Figma and why
- existing behavior intentionally preserved
- test/typecheck/build results
- confirmation that reference/entrepreneur-figma can be deleted without breaking production

Do not perform broad unrelated cleanup. Do not mass-replace callback signatures. Make surgical changes and validate after each batch.
```

---

# 5. STAGED PROMPTS — safer option for a coding agent

The staged approach is recommended if the coding agent tends to change too much at once. Run these prompts in sequence and review the diff between stages.

---

## Prompt 1 — Audit only, no code changes

```text
Audit the new incentive calculator reference against the current EKATMA main repo. DO NOT modify any files yet.

Temporary read-only reference:
reference/entrepreneur-figma/

Read AGENTS.md, CLAUDE.md, ENTREPRENEUR_MIGRATION.md and ENTREPRENEUR_CURRENT_STATE_TO_TARGET.md first.

Then inspect the new incentive blocks in reference/entrepreneur-figma/src/App.tsx:
- Incentives Module Data
- IncentivePageHeader
- I01 through I09 including I05A, I06A, I07A
- sidebar Incentives navigation
- i01–i09 App navigation branches

Compare them with:
- src/lib/routes/entrepreneur.ts
- src/features/entrepreneur/shell/AuthenticatedShell.tsx
- src/features/entrepreneur/identity/catalog.ts
- src/features/entrepreneur/businesses/catalog.ts
- src/features/entrepreneur/incentives/data.ts
- src/features/entrepreneur/incentives/IncentiveScreens.tsx
- src/features/entrepreneur/incentives/IncentiveRoute.tsx
- existing incentive Vitest and Playwright tests

Return a migration audit with:
1. screen-by-screen I01–I09 mapping
2. exact data/type blocks added by the new Figma reference
3. functionality already present in E26–E28 that must not be duplicated
4. identity conflicts between hardcoded Figma business data and canonical BP businesses
5. route conflicts, especially static /incentives/* segments vs existing [incentiveId]
6. business-switcher consequences in AuthenticatedShell.switchedDestination
7. every reference callback that drops a record ID or uses an unsafe fallback
8. proposed production file structure
9. proposed additive route table using domain names, not i01/i02 identifiers
10. state classification: URL state, cross-page workflow state, local UI state, fixture data
11. exact existing tests at risk
12. implementation order

Do not edit code. Stop after the audit.
```

---

## Prompt 2 — Route contract + empty scaffolding

```text
Using the approved incentive-workspace audit, implement ONLY the route contract and minimal route scaffolding. Do not port the full Figma UI yet.

Requirements:

1. Preserve all existing E26/E27/E28 URLs and behavior.
2. Extend src/lib/routes/entrepreneur.ts with typed builders for these additive routes:
   - incentiveCentre(businessId)
   - incentiveCalculator(businessId)
   - incentiveCalculatorQuestionnaire(businessId)
   - incentiveCalculatorReview(businessId)
   - incentivePortfolio(businessId)
   - incentivePortfolioDetail(businessId, incentiveId)
   - incentiveClaimReadiness(businessId)
   - incentiveClaim(businessId, claimId)
   - incentiveRoi(businessId)
   - incentiveRoiResults(businessId)
   - incentiveScenarios(businessId)
   - incentivePolicyUpdates(businessId)

3. Add native App Router page files under /entrepreneur/businesses/[businessId]/incentives/... using static segments so they coexist with the existing [incentiveId] page.
4. Route boundaries must validate businessId with the existing identity helpers.
5. Do not use fake IDs such as default/sample/current/temp.
6. Add the minimum feature route adapter/screen placeholders necessary for type-safe routes, but do not implement Figma content yet.
7. Update AuthenticatedShell business switching so static incentive-workspace routes are detected before treating the first segment as a dynamic incentiveId.
8. Keep the Incentives sidebar active on every new nested route.
9. Do not alter Department routes or auth.
10. Add/extend route-contract tests for the new builders and business-switch behavior.

Important: do not replace /incentives or /incentive-claims. Do not modify reference/entrepreneur-figma.

Run typecheck and the relevant route/shell tests, then report the exact changed files and results.
```

---

## Prompt 3 — Data model, business isolation, and workspace state

```text
Implement the data/state foundation for the new incentive workspace before porting the full screens.

Reference source:
reference/entrepreneur-figma/src/App.tsx — Incentives Module Data and I01–I09.

MAIN constraints:
- existing src/features/entrepreneur/incentives/data.ts remains the canonical E26–E28 model
- do not overwrite it with the Figma INCENTIVE_DETAIL_SCHEMES array
- canonical business/entity ownership in src/features/entrepreneur/identity/catalog.ts must remain authoritative

Create a focused workspace model, preferably under:
src/features/entrepreneur/incentives/workspace/

Model at least:
- calculator opportunity status
- calculator opportunity detail / estimate
- source/provenance for each input
- missing input definitions
- calculator answers/draft
- claim preparation/tracker view data
- ROI input/assumption data
- policy update data

Business isolation rules:
- all selectors that return business-specific data accept businessId
- no fallback to another business's fixture
- do not use ABC Manufacturing / Ratnagiri values as though they belong to BP-004
- if reference values are retained for visual parity, clearly classify them as prototype/reference assumptions and scope them deliberately
- where current MAIN canonical data exists, use it instead of duplicate hardcoded identity strings

Create exact lookup selectors such as:
- findWorkspaceOpportunityForBusiness(businessId, incentiveId)
- listWorkspaceOpportunitiesForBusiness(businessId)
- findWorkspaceClaimForBusiness(businessId, claimId)

These must return undefined/empty for invalid or cross-business IDs. Never fallback to array[0].

State rules:
- questionnaire/calculator draft must be scoped by businessId
- use a simple sessionStorage-backed provider only if cross-route state is needed
- key persisted state by business ID
- direct refresh must not leak another business's draft
- do not reuse the /businesses/new BusinessDnaProvider as though it is an established-business data store

Add Vitest coverage for exact IDs and isolation.
Run typecheck and the new tests. Stop after the foundation is stable.
```

---

## Prompt 4 — Port I01–I05A UI

```text
Port the visual and local-interaction behavior for I01, I02, I03, I04, I05 and I05A from the temporary Figma reference into the new MAIN incentive workspace feature modules.

Reference:
reference/entrepreneur-figma/src/App.tsx

Target routes:
- /incentives/centre
- /incentives/calculator
- /incentives/calculator/questionnaire
- /incentives/calculator/review
- /incentives/portfolio
- /incentives/portfolio/[incentiveId]

Requirements:

1. Use the existing AuthenticatedShell. Do not recreate header/sidebar/footer/accessibility chrome.
2. Create a shared IncentiveWorkspaceHeader based on the Figma IncentivePageHeader, but receive real business/project context as props. No hardcoded ABC Manufacturing identity.
3. Preserve Figma visual intent: summary cards, tabs, source badges, status badges, tables, disclaimers, accordions, responsive overflow and CTA hierarchy.
4. I02 should show which inputs are available and which are missing using the business-scoped workspace data adapter.
5. I03 answers must feed the same business's calculator draft.
6. I04 must review the actual current draft/data for the same business rather than static unrelated values.
7. I05 portfolio cards must navigate with their actual opportunity IDs.
8. I05A must render the exact incentiveId from the route. Invalid IDs must not fallback to the first opportunity.
9. Keep calculator estimates clearly indicative/preliminary. Do not invent final eligibility or sanction.
10. If the Figma reference has contradictory hardcoded counts, derive display counts from the actual arrays/state rather than introducing new fake data. Document any such small parity correction.
11. Buttons that have no valid implementation must be visibly unavailable or truthful local prototype interactions; no href="#", empty callbacks or console.log navigation.
12. Regulatory Assistant entry points should use the existing assistant/context routing pattern where a valid context exists.
13. Do not alter existing E26/E27/E28 screen behavior.

Add Playwright coverage for:
centre -> calculator -> questionnaire -> review -> portfolio -> exact portfolio detail
and direct refresh of calculator, portfolio and portfolio detail.

Run typecheck, relevant Vitest, and relevant Playwright tests.
```

---

## Prompt 5 — Port I06/I06A claim readiness and tracker

```text
Port I06 Claim Readiness and I06A Claim Tracker into the MAIN incentive workspace without duplicating or breaking the existing E28 incentive-claims flow.

Reference:
reference/entrepreneur-figma/src/App.tsx

Target:
- /entrepreneur/businesses/[businessId]/incentives/claim-readiness
- /entrepreneur/businesses/[businessId]/incentives/claims/[claimId]

Important distinction:
- existing E28 is the current incentive application/eligibility/periodic-claims workflow
- I06/I06A is a readiness/tracking workspace view
Do not merge them blindly and do not delete /incentive-claims.

Requirements:
1. Claim readiness evidence must be business-scoped.
2. Reuse existing Document Centre routes only where a real document relationship exists.
3. Do not invent document IDs just to make an Upload/View button navigate.
4. Claim tracker must use the exact claimId URL param.
5. Remove the Figma bug where I06ATrackerPage always uses INCENTIVE_CLAIMS[0].
6. Invalid or cross-business claim IDs must return notFound() or a truthful unavailable state.
7. Where a workspace claim corresponds to an existing E28 claim, use an explicit adapter/relationship; do not create duplicate records with conflicting state.
8. Preserve the reference timeline/tabs/status presentation as UI behavior.
9. Make all next-action buttons truthful prototypes if no backend action exists.

Tests:
- readiness route deep link + refresh
- readiness -> exact claim tracker click
- two different claim IDs display their own identity if two fixtures exist
- invalid claim ID does not display a default claim
- BP business isolation
- existing /incentive-claims tests continue to pass

Run typecheck, incentive Vitest and relevant Playwright suites.
```

---

## Prompt 6 — Port I07/I07A/I08/I09

```text
Port the remaining Figma incentive workspace screens:
- I07 ROI & Investment Scenario Planner
- I07A Investment Outlook / ROI Results
- I08 Scenario Simulator
- I09 Policy Updates

Target routes:
- /incentives/roi
- /incentives/roi/results
- /incentives/scenarios
- /incentives/policy-updates

Requirements:

ROI / scenarios:
1. Preserve the reference disclaimers that projections are illustrative and not guaranteed returns/investment advice.
2. Do not invent a real financial engine or backend if the Figma reference is static/deterministic.
3. Clearly distinguish canonical business values, user assumptions and prototype benchmark values with source badges.
4. If planner values are entered, keep them scoped to the business and do not leak across business switching.
5. Keep the calculation deterministic; AI/Regulatory Assistant may explain but must not be presented as the source of numerical calculations.
6. Scenario comparison must remain a planning comparison and must not recommend which investment decision the user should take.

Policy updates:
7. Treat Figma policy updates as prototype/reference fixtures unless they already exist in MAIN canonical regulatory-change data.
8. Do not claim a live feed or current legal validation.
9. A "View Impact" action may navigate to a detail only when the affected incentive ID exists for that business/workspace. Otherwise make the action unavailable or route to an honest parent context.
10. Preserve validation/draft-state labels from the UI.

Navigation/testing:
11. ROI -> results -> scenarios must use route builders.
12. I09 -> portfolio detail must carry the exact affected scheme ID.
13. Add deep-link, refresh, browser history, business-switch and active-sidebar tests.
14. Existing E26–E28 and Department regression tests must remain green.

Run typecheck, relevant unit/e2e tests and build.
```

---

## Prompt 7 — Entry points, parity pass, and full regression

```text
Do a final integration/parity pass for the new Incentive Workspace.

Do NOT redesign the app.

Tasks:

1. Add a clear entry from the existing Incentives experience into the new Incentive Centre/Calculator without removing the existing E26 discovery route.
2. Confirm whether the sidebar should remain linked to /incentives for backward compatibility in this first pass. Do not change it to /incentives/centre unless the latest approved product decision explicitly requires that change.
3. Verify all new nested incentive pages cause the existing "Incentives" sidebar item to be aria-current="page".
4. Verify AuthenticatedShell business switching for:
   - incentives/centre
   - incentives/calculator
   - incentives/calculator/questionnaire
   - incentives/calculator/review
   - incentives/portfolio
   - incentives/portfolio/[id]
   - incentives/claim-readiness
   - incentives/claims/[claimId]
   - incentives/roi
   - incentives/roi/results
   - incentives/scenarios
   - incentives/policy-updates
5. Static route names must never be parsed as incentive IDs.
6. Verify no Figma business name/location is hardcoded into reusable workspace chrome.
7. Verify no invalid scheme/claim lookup silently falls back to a first record.
8. Verify BP-001/BP-002/BP-003 do not display BP-004 workspace fixtures.
9. Verify the existing E26/E27/E28 click paths still work exactly as before.
10. Verify existing entrepreneur overview links and business switching still work.
11. Verify Department behavior remains untouched.
12. Compare the implemented screens visually against reference/entrepreneur-figma/src/App.tsx for spacing, typography hierarchy, cards, tabs, labels, warnings, source badges, table layout and responsive behavior.
13. Search production code for any import/path dependency on reference/entrepreneur-figma. There must be none.

Run:
- typecheck
- all relevant Vitest tests
- entrepreneur Playwright tests
- department routing regression test(s)
- production build

Return a concise final report with files changed, route table, test results, known prototype limitations and confirmation that the reference directory can now be deleted safely.
```

---

# 6. Optional cleanup prompt — only after everything is green

```text
The Incentive Workspace migration is complete and verified. Perform ONLY temporary-reference cleanup.

1. Confirm no file under src/, e2e/, app config, package scripts or TypeScript path config imports or references reference/entrepreneur-figma.
2. Confirm typecheck, relevant tests and production build pass without requiring the reference project.
3. Delete the local temporary reference/entrepreneur-figma directory if it is not intended to be committed.
4. Do not change production code during this cleanup unless a real lingering reference dependency is discovered.
5. Show git status and list only the intended production/test changes from the migration.
```

---

# 7. Review checklist for you before accepting the coding-agent PR

Use this checklist after the agent finishes:

- [ ] `reference/entrepreneur-figma/` is never imported by production code.
- [ ] No new SPA `setPage` router was introduced.
- [ ] Existing `/incentives`, `/incentives/[incentiveId]`, and `/incentive-claims` still work.
- [ ] New routes use domain names, not `i01`, `i02`, etc.
- [ ] `src/lib/routes/entrepreneur.ts` contains builders for all new routes.
- [ ] Invalid portfolio scheme IDs do not fall back to the first scheme.
- [ ] Invalid claim IDs do not fall back to the first claim.
- [ ] Clicked scheme/claim IDs appear in the URL and match the displayed record.
- [ ] No `ABC Manufacturing Pvt. Ltd.` / Ratnagiri identity leaked into BP-004 unless intentionally preserved as a clearly labeled standalone prototype fixture.
- [ ] No BP-004 data appears under BP-001/BP-002/BP-003.
- [ ] Calculator state is keyed/scoped by business.
- [ ] New static incentive paths are handled explicitly by business switching.
- [ ] Incentives sidebar remains active on all new routes.
- [ ] No active-looking dead buttons.
- [ ] Financial/eligibility outputs remain clearly indicative and prototype-safe.
- [ ] Existing E26/E27/E28 Playwright tests pass.
- [ ] Typecheck passes.
- [ ] Vitest passes for touched domains.
- [ ] Playwright passes for the new flow and existing incentive flow.
- [ ] Production build passes.
- [ ] The temporary reference folder can be deleted and the app still builds.

---

# 8. Most important implementation principle

Treat the Figma project as the **visual and behavioral specification for the new screens**, not as production architecture or canonical identity/data.

The correct migration direction is:

```text
Figma/Vite page-state UI
        ↓ extract visual + local interaction intent
EKATMA feature components
        ↓ bind to canonical business/record identity
Next.js App Router pages + typed route builders
        ↓ validate exact IDs / ownership
existing Entrepreneur shell + tests
```

Not:

```text
copy App.tsx
→ keep setPage(...)
→ hardcode Figma business data
→ import reference constants
→ make routes point at whichever demo record renders
```

