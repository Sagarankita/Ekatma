# EKATMA Department Portal — Antigravity Execution & Progress Playbook

> **Purpose:** This is the operational companion to `DEPARTMENT_NEXTJS_PWA_MIGRATION.md`.
>
> Use the migration file as the **architecture/product-safety contract**. Use this file for **exact Antigravity prompts, progress tracking, verification gates, and commits**.
>
> **Do not ask Antigravity to migrate the entire repository in one shot.** Execute one phase at a time and do not proceed when the current phase gate is red.

---

# 1. HOW THE TWO FILES WORK TOGETHER

Place both files at the root of the working copy of the Department repository:

```text
Bianca Dept NextJS/
├── DEPARTMENT_NEXTJS_PWA_MIGRATION.md
├── DEPARTMENT_ANTIGRAVITY_EXECUTION_PLAYBOOK.md
├── package.json
├── pnpm-lock.yaml
├── src/
├── public/
├── .figma/
└── ...
```

Their roles are different:

```text
DEPARTMENT_NEXTJS_PWA_MIGRATION.md
        = WHAT the architecture must become
        = routes, domain contracts, PWA safety, testing, deployment rules

DEPARTMENT_ANTIGRAVITY_EXECUTION_PLAYBOOK.md
        = HOW we get there
        = exact prompts, phase order, checks, progress, commits
```

If the two ever conflict:

1. `DEPARTMENT_NEXTJS_PWA_MIGRATION.md` wins for architecture/product/security decisions.
2. This playbook wins only for execution order and progress reporting.

---

# 2. BEFORE OPENING ANTIGRAVITY

## 2.1 Keep an untouched source copy

Recommended:

```text
EKATMA/
├── Bianca Dept ORIGINAL/       # untouched Figma Make/Vite source
└── Bianca Dept NextJS/         # working migration copy
```

Do not perform the migration in your only copy.

## 2.2 Initialize Git in the working copy

If the repository is not already under Git:

```bash
git init
git add .
git commit -m "chore: preserve original Bianca Dept Figma Make source"
```

If Git already exists, create a dedicated migration branch instead:

```bash
git switch -c migration/nextjs-pwa
```

## 2.3 Do not run `create-next-app` inside the repository

For this existing project, **do not run**:

```bash
npx create-next-app@latest .
```

and do not create:

```text
Bianca Dept/
└── another-next-app/
```

Antigravity must convert the repository **in place** by installing Next.js dependencies and creating the required App Router files/configuration.

`create-next-app` is scaffolding convenience, not a technical requirement for Next.js.

## 2.4 Open the entire folder in Antigravity

Antigravity must see:

- existing `src/App.tsx`
- existing CSS/assets
- `package.json`
- Figma Make reference material
- both migration `.md` files

Do not give it only `App.tsx` or only the migration guide.

---

# 3. MASTER PROGRESS LEDGER

Antigravity should update this table after each completed phase, but it must **not** mark a phase complete if its exit gate fails.

| Phase | Scope | Status | Verification | Suggested commit |
|---|---|---|---|---|
| 0 | Freeze + source inventory | ⬜ NOT STARTED | Source/screens/routes/reference inventory complete | `chore: freeze department migration baseline` |
| 1 | In-place Next.js runtime | ⬜ NOT STARTED | Next boots; Tailwind pipeline starts; no nested app/static export | `chore: migrate runtime from vite to nextjs` |
| 2 | Global visual/assets/fonts | ⬜ NOT STARTED | Global visual parity | `style: preserve department global visual system` |
| 3 | M01 + shell + M02 + PWA scaffold | ⬜ NOT STARTED | Login/home parity; `/department/` PWA scope | `feat: migrate department shell login and home` |
| 3.5 | Canonical domain contract lock | ⬜ NOT STARTED | IDs/states/contracts + Vitest contract tests | `refactor: lock shared ekatma domain contracts` |
| 4 | M03–M05 + department command routes | ⬜ NOT STARTED | URL navigation + deep refresh | `feat: migrate department core navigation` |
| 5 | M06–M20 application workflow | ⬜ NOT STARTED | Dynamic `[applicationId]` workflow parity | `feat: migrate application scrutiny workflow` |
| 6 | M21–M24 inspections | ⬜ NOT STARTED | `[applicationId]` + `[inspectionId]` parity | `feat: migrate inspection workflow` |
| 7 | M25–M29 decisions/compliance | ⬜ NOT STARTED | Decision/compliance parity; no fake persistence | `feat: migrate decisions and compliance workflow` |
| 8 | M30–M39 oversight modules | ⬜ NOT STARTED | Full screen inventory accounted for | `feat: migrate department oversight modules` |
| 9 | Fixture/repository/API cleanup | ⬜ NOT STARTED | No large route-local domain datasets | `refactor: extract department data boundaries` |
| 10 | PWA hardening + automated testing | ⬜ NOT STARTED | Safe PWA + Playwright/Vitest gates | `test: harden department pwa and parity coverage` |
| 11 | Department Pack abstraction | ⬜ NOT STARTED | MIDC Pack #1; generic future department shell | `refactor: introduce department pack architecture` |
| 12 | Production integration readiness | ⬜ NOT STARTED | Env/deployment/auth/integration boundaries ready | `chore: prepare department portal for integration` |

Allowed status values:

```text
⬜ NOT STARTED
🟨 IN PROGRESS
🟥 BLOCKED
✅ COMPLETE
```

---

# 4. RULES FOR EVERY ANTIGRAVITY PHASE

Every phase prompt below inherits these rules:

1. Read `DEPARTMENT_NEXTJS_PWA_MIGRATION.md` before modifying code.
2. Read this playbook and execute **only the requested phase**.
3. Treat the existing Figma Make implementation as the visual/behavioral reference.
4. Do not redesign, simplify, merge, rename, or delete product functionality unless the migration contract explicitly requires an architecture change.
5. Preserve government identity and accessibility behavior.
6. Do not silently invent backend schemas, canonical states, endpoints, or persistence.
7. Do not proceed to later phases because they seem convenient.
8. Keep working changes small enough to review.
9. Run the required verification commands before calling the phase complete.
10. Report unresolved issues truthfully instead of hiding them with placeholders or `any`.

### Required end-of-phase report

Every Antigravity phase must end with:

```text
PHASE COMPLETION REPORT

1. Phase executed
2. Files created
3. Files modified
4. Files intentionally removed
5. Routes added/changed
6. Domain contracts added/changed
7. PWA behavior added/changed
8. Tests added/changed
9. Commands run + result
   - pnpm typecheck
   - pnpm lint
   - pnpm build
   - relevant Vitest/Playwright tests
10. Visual parity issues remaining
11. Functional issues remaining
12. Architecture gaps / assumptions found
13. Migration checklist items completed
14. Recommendation: READY FOR NEXT PHASE / BLOCKED
```

If the report says **BLOCKED**, do not run the next prompt until the issue is resolved.

---

# 5. PROMPT 0 — PHASE 0: FREEZE AND INVENTORY

Paste this first.

```text
Read these two files completely before doing anything:

1. DEPARTMENT_NEXTJS_PWA_MIGRATION.md
2. DEPARTMENT_ANTIGRAVITY_EXECUTION_PLAYBOOK.md

Execute ONLY PHASE 0.

Do not modify the product architecture yet.
Do not convert to Next.js yet.
Do not delete any source/reference file.

Inspect the complete current Bianca Dept repository, especially:
- src/App.tsx
- src/index.css
- src/main.tsx
- src/imports/
- src/imports/pasted_text/
- public/
- package.json
- vite.config.ts
- AGENTS.md
- CLAUDE.md

Create/confirm a migration inventory containing:
- M01 through M39
- ScrutinyCommandCentre
- DecisionsDashboard
- every sidebar destination
- the difference between Inspection Queue and Inspections
- the difference between department Queries / Deficiencies and application query screens
- all route-like React state/callback navigation
- all application IDs / inspection IDs / query IDs / decision IDs or other identities found in fixtures
- current status/state labels found in the source
- all hard-coded datasets
- all government/EKATMA assets
- all accessibility controls
- all Figma-generated reference/specification files
- current placeholders/unimplemented destinations

If browser automation is available, capture stable reference screenshots for every reachable screen at the migration reference viewport.

Do not infer that an unreachable screen is unnecessary. Record it.

At the end, produce the required PHASE COMPLETION REPORT.
Mark Phase 0 COMPLETE only if the repository can be reconstructed/reviewed from the inventory and original source remains preserved.
Do not execute Phase 1.
```

## Human gate after Phase 0

Before continuing, confirm:

- all expected department screens are listed
- `ScrutinyCommandCentre` and `DecisionsDashboard` are present
- Inspection Queue / Inspections are separate
- department Queries / Deficiencies / application queries are separate
- original source is still untouched or safely committed

Then commit:

```bash
git add .
git commit -m "chore: freeze department migration baseline"
```

---

# 6. PROMPT 1 — PHASE 1: IN-PLACE NEXT.JS RUNTIME

```text
Read DEPARTMENT_NEXTJS_PWA_MIGRATION.md and this playbook again.
Phase 0 is the approved baseline.

Execute ONLY PHASE 1.

Goal: convert the existing repository IN PLACE from Vite runtime to a working Next.js App Router runtime foundation.

IMPORTANT:
- Do NOT run create-next-app inside this repository in a way that creates a nested app.
- Do NOT create a second package.json/src tree.
- Do NOT use Next.js output: 'export'.
- Do NOT delete the old Vite reference files until the equivalent Next.js runtime is proven.

Required work:
1. Verify Node/pnpm versions and record them.
2. Install the current patched Active-LTS Next.js version and compatible React/ReactDOM versions.
3. Add/update Next.js scripts: dev, build, start, lint, typecheck.
4. Add App Router root structure.
5. Add next.config.ts as needed.
6. Convert Tailwind v4 from @tailwindcss/vite to @tailwindcss/postcss using postcss.config.mjs.
7. Preserve the existing @/* path alias.
8. Create a deterministic root redirect foundation toward /department/login or /department.
9. Keep current source available as migration reference.
10. Do not migrate M01–M39 yet except the minimum code necessary to prove the runtime renders.

Do not perform Department Pack abstraction.
Do not connect backend APIs.
Do not implement PWA runtime caching yet.

Run:
- pnpm typecheck
- pnpm lint
- pnpm build

Fix migration-caused errors.

Produce the PHASE COMPLETION REPORT.
Do not execute Phase 2.
```

## Human gate after Phase 1

Must be true:

```text
One repository                ✅
One package.json              ✅
Next.js dev server works      ✅
Next.js production build      ✅
No output:'export'            ✅
Tailwind v4 uses PostCSS      ✅
No nested create-next-app     ✅
```

Commit:

```bash
git add .
git commit -m "chore: migrate runtime from vite to nextjs"
```

---

# 7. PROMPT 2 — PHASE 2: GLOBAL VISUAL SYSTEM

```text
Execute ONLY PHASE 2 from DEPARTMENT_NEXTJS_PWA_MIGRATION.md.

Preserve and migrate the existing global visual system before moving feature screens.

Required:
- migrate src/index.css content into the Next.js global CSS architecture
- preserve Tailwind v4 CSS-first theme tokens
- preserve Noto Sans and Noto Sans Devanagari typography using next/font where appropriate
- preserve government navy/blue/orange palette and existing spacing/border hierarchy
- preserve focus-visible, skip-link, table, section accent, KPI and active-sidebar styles
- preserve Government of India emblem, Maharashtra seal and EKATMA logo exactly
- resolve image/font paths correctly under Next.js
- eliminate initial-render hydration differences caused by random/time/locale-dependent rendering

Do not redesign components.
Do not change content hierarchy.
Do not start M03+ route migration.

Compare against Phase 0 reference screenshots.

Run:
- pnpm typecheck
- pnpm lint
- pnpm build

Produce the PHASE COMPLETION REPORT and list every known visual mismatch.
Do not execute Phase 3.
```

Commit after approval:

```bash
git add .
git commit -m "style: preserve department global visual system"
```

---

# 8. PROMPT 3 — PHASE 3: M01 + SHELL + M02 + PWA SCAFFOLD

```text
Execute ONLY PHASE 3.

Migrate:
- M01 Department Login -> /department/login
- Accessibility Strip
- Government Header
- Department Context Bar
- Department Sidebar
- Breadcrumb/footer where applicable
- M39 notification shell/provider only as needed for the shared shell
- M02 Operational Command Centre -> /department

Architecture:
- create src/app/department/layout.tsx as the Department-only metadata/PWA boundary
- create src/app/department/(portal)/layout.tsx as the authenticated officer shell
- do not duplicate the government header/sidebar per route
- keep prototype authentication isolated behind an auth/session adapter; do not present client state as production auth
- keep login fields exactly aligned with the existing department login design; do not add department/role/office selectors

PWA scaffold ONLY:
- src/app/department/manifest.ts
- public/department/icons/*
- public/department-sw.js scaffold
- public/department/offline.html
- exactly one service-worker registration component
- register with scope /department/

IMPORTANT PWA RULES:
- do not use root scope /
- do not cache authenticated application/officer records
- do not queue/replay official mutations
- do not force skipWaiting + reload over unsaved work
- do not implement aggressive runtime caching in this phase

The Department architecture must use /department/login, not a generic /login route.

Run:
- pnpm typecheck
- pnpm lint
- pnpm build

Verify visually:
- /department/login
- /department
- header/sidebar/accessibility controls

Produce the PHASE COMPLETION REPORT.
Do not execute Phase 3.5.
```

## Human gate after Phase 3

Check manually:

```text
/department/login works                  ✅
/department works                        ✅
Government shell matches reference       ✅
Sidebar layout matches                   ✅
Font/contrast controls still work        ✅
Manifest scope = /department/            ✅
SW scope = /department/                  ✅
No sensitive runtime caching             ✅
```

Commit:

```bash
git add .
git commit -m "feat: migrate department shell login and home"
```

---

# 9. PROMPT 3.5 — CANONICAL DOMAIN CONTRACT LOCK

**Do not skip this prompt.** It prevents M06–M38 from creating inconsistent data/state models.

```text
Execute ONLY PHASE 3.5 from DEPARTMENT_NEXTJS_PWA_MIGRATION.md.

This phase is an architecture contract task, not a visual redesign.

Before writing types, inspect the authoritative project specification/reference material already present in the repository, including src/imports/pasted_text and any master workflow/domain documentation available in this repo.

Create canonical shared frontend/API-contract identities in src/domain/ids.ts for at least:
- Business ID
- Project ID
- Application ID
- Department ID
- Service ID
- Business DNA Version
- Document ID + Document Version ID
- Query ID
- Deficiency ID
- Resubmission Version ID
- Inspection ID
- Decision ID
- Approval ID
- Dependency Node ID
- Compliance ID
- Grievance ID
- Regulatory Rule Version ID

Use branded/opaque identity types so unrelated string IDs cannot be accidentally mixed.

Create separate canonical state sets in src/domain/states.ts for the documented authoritative states, including:
- ApplicationState
- AdaptiveQuestionState
- VerificationState
- RegulatoryApplicabilityState
- PaymentState
- QueryState
- DeficiencyState
- InspectionState
- DecisionState
- DependencyState
- ComplianceState
- GrievanceState

CRITICAL:
- Do not use one status: string field for all domains.
- Do not invent canonical enum values merely to make TypeScript compile.
- Do not promote a UI badge label into canonical state unless the authoritative spec defines it.
- If a source display label cannot be mapped with confidence, record it in DOMAIN_CONTRACT_GAPS.md and keep it as an explicit legacy/presentation mapping gap.

Create src/domain/presentation-labels.ts so officer-facing labels/colors map FROM canonical states.

Create minimal shared record contracts for application, Business DNA references, document/version, query/deficiency/resubmission, inspection, decision/approval, dependency, compliance, grievance and regulatory rule/version records.

Add Vitest if not already installed and create contract tests proving fixture identity consistency across workflow records.

Do NOT implement database tables.
Do NOT connect backend APIs.
Do NOT redesign UI.
Do NOT perform Department Pack abstraction yet.

Run:
- pnpm typecheck
- pnpm lint
- pnpm build
- relevant Vitest contract tests

Produce the PHASE COMPLETION REPORT, including DOMAIN_CONTRACT_GAPS.md items if any.
Do not execute Phase 4.
```

## Human gate after Phase 3.5

Do not continue if Antigravity still has major domain objects like:

```ts
status: string
applicationId: string
inspectionId: string
```

without the canonical types/mappings required by the migration contract.

Commit:

```bash
git add .
git commit -m "refactor: lock shared ekatma domain contracts"
```

---

# 10. PROMPT 4 — M03–M05 + DEPARTMENT COMMAND ROUTES

```text
Execute ONLY PHASE 4.

Migrate and preserve:
- M03 My Queue
- M04 Application Search
- M05 Service Catalogue / Queue Segmentation
- ScrutinyCommandCentre -> /department/scrutiny
- DecisionsDashboard -> /department/decisions
- distinct /department/inspections destination
- distinct /department/queries destination

Replace route-like state callbacks with Next.js Link/router navigation using central route helpers.

Do NOT collapse:
- department scrutiny into application scrutiny
- department queries into application queries
- Inspection Queue into Inspections
- department decisions into application decision workspace

Required behavior:
- direct URL works
- refresh works
- browser Back works
- browser Forward works
- current sidebar item is correctly active
- unfinished parity destinations remain explicitly preserved rather than deleted

Use Phase 3.5 canonical IDs/states whenever records appear.
Do not migrate M06+.

Run:
- pnpm typecheck
- pnpm lint
- pnpm build
- relevant Playwright navigation smoke tests if the test harness is available

Produce the PHASE COMPLETION REPORT.
Do not execute Phase 5.
```

Commit:

```bash
git add .
git commit -m "feat: migrate department core navigation"
```

---

# 11. PROMPT 5 — M06–M20 APPLICATION WORKFLOW

```text
Execute ONLY PHASE 5.

Migrate the complete M06–M20 application workflow into:
/department/applications/[applicationId]/...

Migrate:
- M06 Application Overview
- M07 Business DNA / Adaptive Profile Context
- M08 Application Timeline
- M09 Automated Pre-check
- M10 Scrutiny Route / Explainability
- M11 Scrutiny Workbench
- M12 Parameter Detail
- M13 Document Review
- M14 Building / Planning Scrutiny
- M15 Water / Utility / Drainage Scrutiny
- M16 Cross-form Consistency
- M17 Regulatory Dependency View
- M18 Consolidated Query Builder
- M19 Query / Response History
- M20 Delta Re-scrutiny

Mandatory architecture:
- use params.applicationId as the selected application identity
- use canonical ApplicationId and Phase 3.5 contracts
- use [parameterId] / [documentId] where identity matters
- use repository/service functions instead of route-local embedded datasets
- fixtures are allowed, but components must not depend on where the data came from
- do not invent new status models
- do not hard-code one sample application into the route architecture

Preserve every existing visual/workflow interaction unless the migration contract explicitly changes only the implementation architecture.

Verify:
- direct deep link
- refresh
- back/forward
- switching application identity architecture
- visual parity
- scrutiny/query navigation

Run:
- pnpm typecheck
- pnpm lint
- pnpm build
- Vitest contract tests
- Playwright workflow smoke tests available for migrated routes

Produce the PHASE COMPLETION REPORT.
Do not execute Phase 6.
```

Commit:

```bash
git add .
git commit -m "feat: migrate application scrutiny workflow"
```

---

# 12. PROMPT 6 — M21–M24 INSPECTIONS

```text
Execute ONLY PHASE 6.

Migrate/preserve:
- /department/inspection-queue
- /department/inspections as its distinct top-level destination
- /department/applications/[applicationId]/inspections
- /department/applications/[applicationId]/inspections/[inspectionId]/plan
- /department/applications/[applicationId]/inspections/[inspectionId]/workspace
- /department/applications/[applicationId]/inspections/[inspectionId]/observations

M21/M22 are reachable from more than one navigation context in the source.
Reuse shared extracted components rather than duplicating UI.

Mandatory:
- preserve canonical ApplicationId + InspectionId
- queue rows must contain enough identity to navigate to the canonical application/inspection route
- refresh on plan/workspace/observations must reopen the same inspection
- do not keep the selected inspection only in useState
- use canonical InspectionState, not a generic status string

Run all quality gates and relevant contract/Playwright tests.

Produce the PHASE COMPLETION REPORT.
Do not execute Phase 7.
```

Commit:

```bash
git add .
git commit -m "feat: migrate inspection workflow"
```

---

# 13. PROMPT 7 — M25–M29 DECISIONS / COMPLIANCE

```text
Execute ONLY PHASE 7.

Migrate:
- M25 Decision Workspace
- M26 Decision Record
- M27 Dependency Update + Entrepreneur Synchronization
- M28 Conditions / Compliance / Renewal Context
- M29 Expansion / Amendment Intake

Use the canonical DecisionId / ApprovalId / DependencyNodeId / ComplianceId / ApplicationId contracts and their typed states.

High-consequence rule:
Until real backend mutations exist, do not show a state that implies an official action was successfully persisted when it was only changed in client memory.

If a prototype button must remain functional for parity, label/implement it as mock/demo persistence and keep production mutation boundaries isolated.

Do not implement offline mutation replay.
Do not allow RAG to mutate decisions or dependency state.

Run all quality gates, contract tests and Playwright route/workflow tests.

Produce the PHASE COMPLETION REPORT.
Do not execute Phase 8.
```

Commit:

```bash
git add .
git commit -m "feat: migrate decisions and compliance workflow"
```

---

# 14. PROMPT 8 — M30–M39 OVERSIGHT MODULES

```text
Execute ONLY PHASE 8.

Migrate:
- M30 SLA Dashboard
- M31 Escalation / Grievance
- M32 Regulatory Assistant / RAG
- M33 Regulatory Change Centre
- M34 Regulatory Impact Analysis
- M35 Department Analytics
- M36 Bottleneck Analytics
- M37 Workload / Capacity
- M38 Audit / History
- M39 Notification Drawer

Preserve all existing sidebar destinations and links.

Enforce integration boundaries:
- src/features/regulatory/rules = authoritative rule/applicability results consumed by UI
- src/features/dependencies = authoritative dependency graph/state consumed by UI
- src/features/regulatory/rag = explanatory/retrieval assistance

RAG must NOT:
- change ApplicationState
- decide regulatory applicability
- unlock dependencies
- approve/reject
- mutate official workflow records

Run all quality gates and relevant automated tests.

At the end verify the complete M01–M39 + ScrutinyCommandCentre + DecisionsDashboard inventory.

Produce the PHASE COMPLETION REPORT.
Do not execute Phase 9.
```

Commit:

```bash
git add .
git commit -m "feat: migrate department oversight modules"
```

---

# 15. PROMPT 9 — FIXTURE / REPOSITORY / API BOUNDARY CLEANUP

```text
Execute ONLY PHASE 9.

Do not redesign UI.
Do not connect production APIs yet.

Complete the data-boundary cleanup:
- move remaining large hard-coded domain arrays/objects out of route JSX
- place prototype datasets under src/data/fixtures/*
- use Phase 3.5 canonical contracts everywhere
- create/reuse repository/service functions as the only data access boundary
- remove duplicate route-local data interfaces
- distinguish clearly between mock persistence and real server persistence
- ensure components do not know whether their input came from fixture/API/database/RAG

Keep logical adapters separate for:
- shared EKATMA API
- regulatory rules
- dependency engine
- RAG/knowledge service

Do not invent real backend endpoint paths if they are not defined.

Run:
- pnpm typecheck
- pnpm lint
- pnpm build
- Vitest contract tests
- existing Playwright tests

Produce the PHASE COMPLETION REPORT.
Do not execute Phase 10.
```

Commit:

```bash
git add .
git commit -m "refactor: extract department data boundaries"
```

---

# 16. PROMPT 10 — PWA HARDENING + TESTING

```text
Execute ONLY PHASE 10.

Finalize the Department PWA and automated migration tests.

PWA requirements:
- manifest remains scoped to /department/
- worker is public/department-sw.js and registers with scope /department/
- worker must not control unrelated root/Entrepreneur routes
- use a Department-specific cache prefix
- cache only approved static assets/offline fallback
- do not persist authenticated officer/application/business-DNA/document/query/inspection/decision/audit/SLA records in Cache Storage by default
- non-GET official mutations remain network-only
- no generic background replay
- safe update-available UX; do not force reload over unsaved work
- /department/offline.html works without network
- installed app launches to /department and handles unauthenticated redirect to /department/login

Testing stack:
- Playwright for e2e + visual parity
- Vitest for domain/contract logic

Add/complete automated tests covering:
- navigation and deep-link refresh
- representative M-screen flows
- application/inspection identity consistency
- visual parity at agreed viewport(s)
- PWA manifest/worker scope behavior where practical

Run:
- pnpm typecheck
- pnpm lint
- pnpm build
- pnpm vitest run (or the repository's equivalent script)
- pnpm exec playwright test (or the repository's equivalent script)

Do not call the phase complete with failing migration-caused tests.

Produce the PHASE COMPLETION REPORT.
Do not execute Phase 11.
```

Commit:

```bash
git add .
git commit -m "test: harden department pwa and parity coverage"
```

---

# 17. PROMPT 11 — POST-PARITY DEPARTMENT PACK ABSTRACTION

This happens **after** MIDC has working 1:1 parity.

```text
Execute ONLY PHASE 11.

We now have MIDC parity. Refactor architecture without changing MIDC behavior.

Goal:
MIDC must become Department Pack #1, not the generic department architecture.

Extract/reinforce:
1. Generic Department Shell
2. Generic Application Workflow
3. Generic Query model/workflow
4. Generic Inspection model/workflow
5. Generic Decision model/workflow
6. Generic Dependency model/workflow
7. Department + Service registry
8. Department Pack adapter/config boundary

Create the post-parity structure under src/departments/ as defined by the migration contract.

Move only genuinely MIDC-specific items into src/departments/midc/, such as:
- MIDC service definitions
- MIDC-specific scrutiny parameters/checklists
- MIDC-specific adapters/configuration
- MIDC-only presentation configuration where justified

Do NOT:
- copy the route tree for future departments
- change canonical shared record contracts
- create separate application/query/inspection/decision schemas for MPCB/Fire/etc.
- add a department chooser to officer login

Department/region/office/desk/role remain backend account context.

Demonstrate architecturally that a future MPCB pack could be registered without duplicating the application.
Do not implement the full MPCB frontend in this phase.

Run all quality and parity tests and prove MIDC visual/functional behavior did not regress.

Produce the PHASE COMPLETION REPORT.
Do not execute Phase 12.
```

Commit:

```bash
git add .
git commit -m "refactor: introduce department pack architecture"
```

---

# 18. PROMPT 12 — PRODUCTION INTEGRATION / DEPLOYMENT READINESS

```text
Execute ONLY PHASE 12.

Prepare the migrated frontend for shared EKATMA backend integration without inventing backend behavior.

Required:
- verify next.config.ts does NOT use output: 'export'
- document a server-capable deployment target assumption
- create/update .env.example with names only and no secrets
- include logical integration boundaries for:
  EKATMA_API_BASE_URL
  EKATMA_RULES_API_BASE_URL
  EKATMA_DEPENDENCY_API_BASE_URL
  EKATMA_RAG_API_BASE_URL
  NEXT_PUBLIC_DEPARTMENT_BASE_PATH=/department
  NEXT_PUBLIC_PWA_ENABLED=true
- keep real secrets server-only
- verify server-side auth/authorization boundary is ready to replace mock auth
- verify PWA scope remains /department/
- verify reference Figma specification material is preserved/archived and not imported into production runtime
- remove obsolete Vite/Figma runtime infrastructure only when proven unused
- replace outdated AGENTS.md instructions with the final Next.js repository rules from the migration contract

Run the complete suite:
- pnpm typecheck
- pnpm lint
- pnpm build
- Vitest
- Playwright
- visual parity review
- PWA install/offline/update review

Produce a FINAL MIGRATION REPORT containing:
1. final route map
2. final folder architecture
3. all M01–M39 coverage
4. non-numbered surface coverage
5. canonical domain contract summary
6. Department Pack architecture summary
7. PWA scope/cache/update summary
8. auth/API integration points still mocked
9. remaining backend dependencies
10. removed legacy files
11. archived reference files
12. test/build status
13. known limitations

Mark Phase 12 COMPLETE only if no architecture-critical migration gap remains.
```

Commit:

```bash
git add .
git commit -m "chore: prepare department portal for integration"
```

---

# 19. WHAT TO DO WHEN ANTIGRAVITY REPORTS A PROBLEM

Do not automatically tell it “continue anyway.” Use this rule:

## A. Visual parity problem

Ask it to fix the current phase only:

```text
Do not proceed to the next migration phase.
Fix the visual parity issues listed in your previous phase report using the Phase 0 source/screenshots as the reference.
Do not redesign or change route/domain architecture.
Re-run the current phase verification gates and issue a revised completion report.
```

## B. Build/type error

```text
Remain in the current phase.
Fix the migration-caused type/build/lint errors without suppressing them with broad any types, ts-ignore, disabled lint rules, or removal of the affected feature.
Re-run typecheck, lint, build and relevant tests.
Do not proceed until they pass or the report identifies a genuine external blocker.
```

## C. Canonical state/ID is unclear

```text
Do not invent the missing canonical value.
Inspect the authoritative workflow/specification material in this repository.
If the value is still not defined, add the exact unresolved mapping to DOMAIN_CONTRACT_GAPS.md, preserve the existing presentation behavior as a legacy/display mapping, and keep the canonical contract unresolved rather than fabricating a backend state.
Do not proceed in a way that creates a competing state model.
```

## D. Antigravity wants to simplify/remove a screen

```text
Do not remove or merge that screen.
The existing source is the migration source of truth.
Preserve the screen as its own route/component according to DEPARTMENT_NEXTJS_PWA_MIGRATION.md, even if its current implementation is a placeholder or overlaps another workflow.
```

## E. PWA worker starts caching authenticated pages/data

```text
Stop the PWA change.
Restore the conservative Department-scoped cache policy from DEPARTMENT_NEXTJS_PWA_MIGRATION.md.
The worker may cache approved static assets and the offline fallback, but not authenticated workflow/API records by default and not official mutations.
Re-test worker scope and offline behavior before continuing.
```

---

# 20. WHEN TO BRING THE PROJECT BACK FOR REVIEW

The most useful review checkpoints are:

```text
After Phase 3
→ Next.js shell/login/home + PWA scope review

After Phase 3.5
→ domain contract review BEFORE application workflow migration

After Phase 5
→ full M06–M20 application workflow/routing review

After Phase 8
→ full feature coverage review

After Phase 10
→ PWA + automated test review

After Phase 11
→ generic Department Pack architecture review

After Phase 12
→ final pre-backend-integration audit
```

Do not wait until the very end to discover that a fundamental route/domain/PWA decision was wrong.

---

# 21. FINAL RULE

```text
ONE PHASE
   ↓
ANTIGRAVITY IMPLEMENTS
   ↓
TYPECHECK + LINT + BUILD + RELEVANT TESTS
   ↓
VISUAL / FUNCTIONAL GATE
   ↓
COMMIT
   ↓
NEXT PHASE
```

Never replace this with:

```text
"Convert everything to Next.js + PWA"
```

The project is too large and interconnected for a safe one-shot migration.

---

## Local integration check — 24 September 2026

- Local `main` was fast-forwarded from `8404c93` to `16dd92a` (`ankita`). `origin/main` remains at `8404c93`; nothing was pushed.
- The branch changed 46 tracked files and deleted no tracked files. The local working tree was clean immediately after the fast-forward.
- Verified on the merged tree: `pnpm typecheck`; `pnpm exec vitest run` (96 tests passed); `pnpm exec playwright test --reporter=list` (8 tests passed); and `pnpm exec next build --webpack` (production build completed).
- The browser tests cover department navigation and record-specific links using prototype authentication in local storage. Safari showed the login page and returned an unauthenticated application visit to login. Real authentication and backend integration were not verified.
- The default `pnpm build` did not complete in this environment because Turbopack could not bind a local port. `pnpm lint` only echoes a success message; `pnpm exec eslint .` fails in the existing ESLint configuration. These are open verification gaps.
- No phase status above was changed to COMPLETE: the full phase exit gates, including visual and PWA checks, have not been proven.
