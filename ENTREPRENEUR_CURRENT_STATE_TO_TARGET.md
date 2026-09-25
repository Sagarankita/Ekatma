# EKATMA Entrepreneur — Current State → Target Architecture Conversion Plan

> **Repository baseline:** current `Ekatma-main.zip`
>
> **Target contract:** `ENTREPRENEUR_MIGRATION.md`
>
> **Purpose:** Convert the Entrepreneur implementation that is already present in the current repository into the routing, identity, state, testing, and code-structure deliverables defined by `ENTREPRENEUR_MIGRATION.md`.
>
> This is **not** a fresh migration from the old Figma repository.
>
> The standalone Figma/Vite reference is no longer present and is not required for this conversion.
>
> The current in-repo Entrepreneur implementation is the parity source:
>
> ```text
> src/components/entrepreneur/EntrepreneurApp.tsx
> ```
>
> Preserve its current visible UI and implemented behavior while replacing the intermediate SPA-style routing/state architecture.

---

# 0. READ THIS FIRST

Every coding agent must read, in this order:

1. `ENTREPRENEUR_MIGRATION.md`
2. `ENTREPRENEUR_CURRENT_STATE_TO_TARGET.md`
3. `AGENTS.md`
4. task-relevant current source files

When the two migration files differ:

- `ENTREPRENEUR_MIGRATION.md` defines the **final architecture and acceptance principles**
- this file defines the **current-repository-specific path to get there**

Do not re-add the old standalone Entrepreneur/Figma repository unless explicitly instructed.

Do not restart already-correct integration work.

---

# 1. CURRENT REPOSITORY STATE

The current repository is already a Next.js App Router application.

The Department side is established under:

```text
src/app/department/**
```

The Entrepreneur side is already linked into Next.js, but it is still effectively the old SPA inside a thin App Router wrapper.

Current Entrepreneur route files:

```text
src/app/entrepreneur/layout.tsx
src/app/entrepreneur/[screen]/page.tsx
```

The public root is:

```text
src/app/page.tsx
```

and currently renders the Entrepreneur public portal through the in-repo Entrepreneur implementation.

The bulk of the Entrepreneur implementation is concentrated in:

```text
src/components/entrepreneur/EntrepreneurApp.tsx
```

This file contains most of:

- public landing
- authentication
- signup/registration
- E00–E34 screens
- Entrepreneur shell
- sidebar/header/footer
- Business DNA state
- selected record state
- mock data
- route-like state
- navigation callbacks
- drawers/modals
- local workflow state

The goal is therefore **not to recreate screens**. The goal is to **extract and re-architect the existing screens without changing their approved UI**.

---

# 2. CURRENT ENTREPRENEUR ROUTING PROBLEM

Current routing is screen-name based.

Conceptually:

```text
/entrepreneur/login
/entrepreneur/my-businesses
/entrepreneur/e00-command-centre
/entrepreneur/create-business
/entrepreneur/e09-journey
/entrepreneur/e10-req-detail
/entrepreneur/e11-doc-centre
/entrepreneur/e12-doc-detail
/entrepreneur/e19-detail
...
```

The current route helper represents internal screen names rather than domain/resource URLs.

Inside the Entrepreneur implementation, navigation is still handled like a client-side SPA, including logic equivalent to:

```tsx
const setPage = (nextPage: Page) => {
  setPageState(nextPage)
  window.history.pushState(null, '', entrepreneurPath(nextPage))
  window.scrollTo({ top: 0 })
}
```

with `popstate` handling.

That is the central architecture to eliminate.

The final Entrepreneur navigation authority must be **Next.js App Router**.

---

# 3. CURRENT WORK THAT IS ALREADY CORRECT — PRESERVE IT

Do not restart or undo these pieces unless necessary.

## 3.1 Public root exists

`/` already renders the EKATMA public landing.

Preserve its current visual design.

## 3.2 Government login connection exists

The public landing already connects Government Login to:

```text
/department/login
```

Preserve it.

Do not create a duplicate Government login.

## 3.3 Root metadata is already neutral

Do not revert the app to Department-only global metadata.

## 3.4 Department PWA scope is already isolated

The Department service worker remains scoped to:

```text
/department/
```

Preserve that boundary.

## 3.5 Entrepreneur auth is separate

The current prototype uses an Entrepreneur-specific session key equivalent to:

```text
entrepreneur_demo_auth
```

and does not reuse:

```text
dept_auth
```

Preserve the separation.

## 3.6 Registration flow gating exists

Direct entry into registration details is already gated by the email/OTP step.

Preserve that behavior when routes are extracted.

## 3.7 Department routing tests are important

Do not weaken existing Department routing coverage.

---

# 4. CURRENT STATE THAT DOES NOT MEET THE TARGET CONTRACT

## 4.1 Entrepreneur is still one giant application component

Current:

```text
src/components/entrepreneur/EntrepreneurApp.tsx
```

is a giant client-side application container.

Final target:

```text
App Router pages
+
feature modules
+
typed route helpers
+
explicit identity
+
one authenticated shell
```

Do not replace one monolith with another.

## 4.2 `[screen]` routes do not encode entity identity

Current routes such as:

```text
/entrepreneur/e10-req-detail
/entrepreneur/e12-doc-detail
/entrepreneur/e19-detail
```

do not express:

```text
businessId
requirementId
documentId
applicationId
```

in the URL.

That means direct refresh/deep linking cannot reliably reconstruct the correct selected record.

## 4.3 Selected domain IDs live in parent React state

Current routing-like state includes values equivalent to:

```text
selected requirement ID
selected document ID
selected application ID
selected compliance obligation ID
selected incentive ID
active business
```

Those must move to route params where they identify real navigable records.

## 4.4 Current defaults can mask routing bugs

The current implementation contains selected/default record values such as:

```text
DOC-001
an application ID
a compliance ID
an incentive ID
first business
```

These may be reasonable UI defaults in local prototype state, but they must **never** silently replace an entity requested by a URL.

## 4.5 Silent first-record fallback must be removed

Any pattern like:

```tsx
const item =
  ITEMS.find((item) => item.id === requestedId) ||
  ITEMS[0]
```

is forbidden for route-backed detail pages.

Final behavior:

```text
valid ID
→ exact record

invalid ID
→ truthful unavailable/not-found state
```

Never:

```text
invalid ID
→ first record
```

## 4.6 Shell ownership is in the monolith

The current authenticated shell is generated inside the large Entrepreneur component.

Final target:

```text
authenticated App Router layout
→ one shell owner
→ nested page content only
```

## 4.7 Browser history is manually emulated

The final implementation must not depend on:

```text
window.history.pushState
popstate
page-state routing
```

for primary Entrepreneur navigation.

## 4.8 Current Entrepreneur tests validate the intermediate route model

Some current tests directly open old screen slugs.

Those tests must evolve with the new route architecture.

Do not preserve obsolete E-screen URLs merely to keep outdated tests passing.

## 4.9 Placeholder/dead controls need classification

Any current:

```text
href="#"
empty click handler
console.log navigation
active-looking dead control
```

must be classified as:

```text
Navigation
Local UI
Prototype Workflow
Disabled / Permission-gated
```

Do not invent routes merely to make a control clickable.

---

# 5. DO NOT RE-ADD THE OLD FIGMA REPOSITORY

The standalone reference repository is no longer present.

That is acceptable.

Use:

```text
src/components/entrepreneur/EntrepreneurApp.tsx
```

as the current UI/behavior parity source.

Use current in-repo specification text only as supporting context when it agrees with the implemented product.

The conversion equation is:

```text
CURRENT embedded Entrepreneur implementation
+
ENTREPRENEUR_MIGRATION target contract
=
final Next.js Entrepreneur architecture
```

---

# 6. DEPARTMENT FREEZE BOUNDARY

Treat the Department implementation as behaviorally frozen.

Do not redesign or restructure:

```text
src/app/department/**
src/components/layout/DepartmentShell.tsx
src/departments/**
```

Do not alter:

```text
dept_auth
```

Do not widen the Department PWA scope.

Shared domain extraction is allowed only when:

1. it is genuinely required
2. Department behavior remains unchanged
3. Department tests remain green

---

# 7. TARGET CODE STRUCTURE

Move toward a structure like:

```text
src/
├── app/
│   ├── page.tsx
│   │
│   ├── department/
│   │   └── ... existing/frozen
│   │
│   └── entrepreneur/
│       ├── layout.tsx
│       ├── login/
│       │   └── page.tsx
│       ├── register/
│       │   ├── page.tsx
│       │   ├── details/
│       │   │   └── page.tsx
│       │   └── success/
│       │       └── page.tsx
│       │
│       ├── (authenticated)/
│       │   ├── layout.tsx
│       │   └── businesses/
│       │       ├── page.tsx
│       │       ├── new/
│       │       │   ├── page.tsx
│       │       │   ├── basic-requirements/
│       │       │   ├── discovery/
│       │       │   └── review/
│       │       │
│       │       └── [businessId]/
│       │           ├── page.tsx
│       │           ├── profile/
│       │           ├── dossier/
│       │           ├── journey/
│       │           ├── requirements/
│       │           │   └── [requirementId]/
│       │           ├── documents/
│       │           │   └── [documentId]/
│       │           ├── dependencies/
│       │           ├── applications/
│       │           │   ├── page.tsx
│       │           │   ├── new/
│       │           │   └── [applicationId]/
│       │           ├── inspections/
│       │           ├── compliance/
│       │           │   └── [complianceId]/
│       │           ├── incentives/
│       │           │   └── [incentiveId]/
│       │           ├── regulatory-changes/
│       │           ├── changes/
│       │           ├── grievances/
│       │           ├── notifications/
│       │           └── assistant/
│       │
│       └── ...
│
├── features/
│   └── entrepreneur/
│       ├── auth/
│       ├── businesses/
│       ├── business-dna/
│       ├── dossier/
│       ├── journey/
│       ├── documents/
│       ├── applications/
│       ├── inspections/
│       ├── compliance/
│       ├── incentives/
│       ├── changes/
│       ├── grievances/
│       ├── notifications/
│       └── regulatory-assistant/
│
├── components/
│   └── layout/
│       ├── DepartmentShell.tsx
│       └── EntrepreneurShell.tsx
│
├── lib/
│   └── routes/
│       └── entrepreneur.ts
│
├── domain/
└── data/
```

This is a target organization, **not permission for a huge one-shot file move**.

Extract incrementally.

---

# 8. TARGET ROUTE CONTRACT

The final route contract must be approved before deep extraction.

## Public/Auth

| Current screen/state | Target route |
|---|---|
| `portal` | `/` |
| `login` | `/entrepreneur/login` |
| `signup-email` | `/entrepreneur/register` |
| `signup-register` | `/entrepreneur/register/details` |
| `signup-success` | `/entrepreneur/register/success` |

## Business portfolio / onboarding

| Current screen/state | Target route |
|---|---|
| `my-businesses` | `/entrepreneur/businesses` |
| `create-business` | `/entrepreneur/businesses/new` |
| `basic-requirements` | `/entrepreneur/businesses/new/basic-requirements` |
| `e05-adaptive` | `/entrepreneur/businesses/new/discovery` |
| `e05-scale` | `/entrepreneur/businesses/new/discovery/scale` |
| `e05-env` | `/entrepreneur/businesses/new/discovery/environment-safety` |
| implemented E06 review | `/entrepreneur/businesses/new/review` until a genuine business ID exists |
| legacy `e05-placeholder` | no final canonical route |

Do not invent a fake business ID during onboarding.

## Existing business context

| Current screen/state | Target route |
|---|---|
| E00 Command Centre | `/entrepreneur/businesses/[businessId]` |
| existing profile context | `/entrepreneur/businesses/[businessId]/profile` |
| E07 Dossier | `/entrepreneur/businesses/[businessId]/dossier` |
| E08 Provenance | `/entrepreneur/businesses/[businessId]/dossier/provenance` or field-specific truthful context |
| E09 Journey | `/entrepreneur/businesses/[businessId]/journey` |
| E10 Requirement Detail | `/entrepreneur/businesses/[businessId]/requirements/[requirementId]` |
| E11 Documents | `/entrepreneur/businesses/[businessId]/documents` |
| E12 Document Detail | `/entrepreneur/businesses/[businessId]/documents/[documentId]` |
| E13 Dependency | `/entrepreneur/businesses/[businessId]/dependencies` |

## Application journey

Recommended structure:

```text
/entrepreneur/businesses/[businessId]/applications
/entrepreneur/businesses/[businessId]/applications/new
/entrepreneur/businesses/[businessId]/applications/new/prevalidation
/entrepreneur/businesses/[businessId]/applications/new/consistency
/entrepreneur/businesses/[businessId]/applications/new/submission
/entrepreneur/businesses/[businessId]/applications/[applicationId]
```

For E20–E23 use real child IDs only if those identities genuinely exist.

Do not fabricate `queryId`, `inspectionId`, or `decisionId`.

When real child IDs do not exist, a truthful application-scoped route is acceptable:

```text
/applications/[applicationId]/queries
/applications/[applicationId]/resubmission
/applications/[applicationId]/inspections
/applications/[applicationId]/decision
```

## Compliance

```text
/entrepreneur/businesses/[businessId]/compliance
/entrepreneur/businesses/[businessId]/compliance/[complianceId]
```

## Incentives

```text
/entrepreneur/businesses/[businessId]/incentives
/entrepreneur/businesses/[businessId]/incentives/[incentiveId]
/entrepreneur/businesses/[businessId]/incentive-claims
```

Avoid static/dynamic route collisions.

## Changes / regulatory change

```text
/entrepreneur/businesses/[businessId]/regulatory-changes
/entrepreneur/businesses/[businessId]/changes
/entrepreneur/businesses/[businessId]/changes/amendments
```

Do not encode free-form proposed values as fake path IDs.

## Support

```text
/entrepreneur/businesses/[businessId]/grievances
/entrepreneur/businesses/[businessId]/notifications
/entrepreneur/businesses/[businessId]/assistant
```

If the current implemented behavior clearly shows Notifications are user-global instead of business-scoped, use:

```text
/entrepreneur/notifications
```

and document the reason.

---

# 9. CENTRALIZED ROUTE BUILDERS

Replace the current flat screen-name route helper with typed domain route builders.

Target concept:

```ts
export const ENTREPRENEUR_ROUTES = {
  login: () => "/entrepreneur/login",
  register: () => "/entrepreneur/register",
  businesses: () => "/entrepreneur/businesses",
  newBusiness: () => "/entrepreneur/businesses/new",

  business: (businessId: string) =>
    `/entrepreneur/businesses/${encodeURIComponent(businessId)}`,

  journey: (businessId: string) =>
    `/entrepreneur/businesses/${encodeURIComponent(businessId)}/journey`,

  requirement: (businessId: string, requirementId: string) =>
    `/entrepreneur/businesses/${encodeURIComponent(businessId)}/requirements/${encodeURIComponent(requirementId)}`,

  document: (businessId: string, documentId: string) =>
    `/entrepreneur/businesses/${encodeURIComponent(businessId)}/documents/${encodeURIComponent(documentId)}`,

  application: (businessId: string, applicationId: string) =>
    `/entrepreneur/businesses/${encodeURIComponent(businessId)}/applications/${encodeURIComponent(applicationId)}`,

  compliance: (businessId: string, complianceId: string) =>
    `/entrepreneur/businesses/${encodeURIComponent(businessId)}/compliance/${encodeURIComponent(complianceId)}`,

  incentive: (businessId: string, incentiveId: string) =>
    `/entrepreneur/businesses/${encodeURIComponent(businessId)}/incentives/${encodeURIComponent(incentiveId)}`,
} as const
```

Do not scatter raw URL strings through feature components.

---

# 10. CANONICAL ID CONTRACT

Before deep extraction, audit the actual current data and document which IDs genuinely exist.

Potential identities:

```text
businessId
projectId
requirementId
applicationId
documentId
documentVersionId
queryId
deficiencyId
resubmissionId
inspectionId
decisionId
dependencyNodeId
complianceId
incentiveId
grievanceId
ruleVersionId
```

Only use real product identities.

For every routable entity:

```text
URL identity
=
lookup identity
=
displayed identity
```

Do not silently substitute:

```text
first business
first application
first document
first compliance record
first incentive
```

for an invalid requested ID.

---

# 11. REMOVE FIRST-RECORD FALLBACKS

Any current pattern equivalent to:

```tsx
findById(id) || ITEMS[0]
```

must be removed for route-backed entity pages.

Required behavior:

```text
valid ID
→ render exact record

invalid ID
→ not found / unavailable
```

Use `notFound()` at the App Router boundary where appropriate.

---

# 12. ROUTE PARAMS ENTER AT THE APP ROUTER BOUNDARY

Preferred:

```text
page.tsx
→ reads params
→ validates identity
→ resolves record
→ passes explicit data/IDs to feature component
```

Avoid spreading:

```tsx
useParams()
```

through many shared components.

Keep feature components router-independent where practical.

---

# 13. ONE ENTREPRENEUR SHELL OWNER

Move authenticated shell ownership out of the monolith.

Target:

```text
src/app/entrepreneur/(authenticated)/layout.tsx
```

owns:

- accessibility strip
- authenticated Entrepreneur header
- demo notice if intentionally preserved
- mobile menu
- sidebar
- business switcher
- page frame
- footer
- truly-global Regulatory Assistant drawer if applicable

Nested pages render only page-specific content.

Exactly one shell must render.

---

# 14. BUSINESS CONTEXT COMES FROM `[businessId]`

The current hidden `activeBusiness` default must not be the routing authority.

Business-scoped pages must derive identity from:

```text
[businessId]
```

The business switcher should navigate to the equivalent valid route for the selected business where possible.

Example:

```text
B01 / applications
→ switch to B02
→ B02 / applications
```

If an equivalent child record does not exist, route to a valid B02 parent context.

Do not fabricate a child record.

---

# 15. BUSINESS DNA STATE EXTRACTION

The current onboarding state values belong to one logical Business DNA.

Keep them together.

Recommended feature boundary:

```text
src/features/entrepreneur/business-dna/
├── types.ts
├── initial-state.ts
├── state.tsx
├── selectors.ts
├── create-business-screen.tsx
├── basic-requirements-screen.tsx
├── adaptive-discovery-screen.tsx
├── scale-operations-screen.tsx
├── environment-safety-screen.tsx
└── review-screen.tsx
```

Because the current prototype does not demonstrate backend persistence, use the smallest route-safe draft state mechanism required.

It must survive:

```text
/new
→ /new/basic-requirements
→ /new/discovery
→ /new/discovery/scale
→ /new/discovery/environment-safety
→ /new/review
```

Do not pretend local state is server persistence.

---

# 16. EXTRACT DATA INCREMENTALLY

Move large mock-data blocks out of the monolith as each feature is migrated.

Examples:

```text
src/features/entrepreneur/businesses/data.ts
src/features/entrepreneur/journey/data.ts
src/features/entrepreneur/documents/data.ts
src/features/entrepreneur/applications/data.ts
src/features/entrepreneur/compliance/data.ts
src/features/entrepreneur/incentives/data.ts
src/features/entrepreneur/notifications/data.ts
```

Do not duplicate the same entity across multiple modules.

If the same record is conceptually shared with Department, prefer canonical shared domain/fixture mapping where safe.

---

# 17. SCREEN CONNECTION MATRIX IS MANDATORY

Create:

```text
docs/ENTREPRENEUR_SCREEN_CONNECTION_MATRIX.md
```

Recommended columns:

| Context | Visible control | Type | Destination/behavior | Required IDs | Current implementation | Target implementation | Verified |
|---|---|---|---|---|---|---|---|

Type must be one of:

```text
Navigation
Local UI
Prototype Workflow
Disabled / Permission-gated
```

Every meaningful visible control in a migrated feature must be accounted for.

No final active control may remain as:

```text
href="#"
onClick={() => {}}
console.log(...)
```

Do not invent navigation for a local/workflow control.

---

# 18. TEST STRATEGY

Current Entrepreneur E2E coverage must evolve rather than simply be deleted.

## Preserve conceptually

Keep coverage for:

- `/` public landing
- Government Login
- Industrial Login
- registration flow
- registration gating
- narrow-screen overflow
- critical visual parity assertions that remain useful

## Replace

Replace tests whose sole purpose is:

```text
open every old /entrepreneur/eXX-* slug
```

because those validate the intermediate architecture.

## Add identity-routing tests

Examples:

```text
My Businesses
→ click business B01
→ URL contains B01
→ screen displays B01
→ reload
→ still B01
```

```text
Regulatory Journey
→ click requirement REQ-X
→ URL contains REQ-X
→ detail displays REQ-X
→ reload
→ still REQ-X
```

```text
Documents
→ click DOC-002
→ URL contains DOC-002
→ detail displays DOC-002
→ Back
→ Documents
→ Forward
→ DOC-002
```

```text
Applications
→ click APP-X
→ URL contains APP-X
→ detail displays APP-X
```

```text
Compliance
→ click CPL-X
→ URL contains CPL-X
→ detail displays CPL-X
```

```text
Incentives
→ click INC-X
→ URL contains INC-X
→ no fallback to first scheme
```

## Invalid-ID tests

For every major dynamic family:

```text
invalid ID
→ not found/unavailable
→ never first fixture fallback
```

## Department regression

Continue running existing Department routing E2E coverage after structural Entrepreneur changes.

---

# 19. CURRENT-STATE CONVERSION PHASES

The screens already exist.

Do **not** follow a from-scratch implementation sequence.

Use this in-place conversion sequence.

---

## PHASE A — Baseline + Gap Lock

No product behavior changes.

Tasks:

1. inspect current Entrepreneur implementation
2. record baseline typecheck/tests/build
3. inventory current screen states
4. inventory current fixtures/real IDs
5. create the Screen Connection Matrix
6. define final route contract
7. classify old `[screen]` states
8. identify all routing-like React state
9. identify all hard-coded record defaults
10. identify all silent first-record fallbacks
11. identify all `href="#"`/dead controls
12. identify shell ownership
13. identify current E2E tests tied to old slugs

Deliverables:

```text
approved route tree
canonical ID table
connection matrix
current→target screen map
baseline report
```

Do not extract screens yet.

---

## PHASE B — Route Safety Infrastructure

Create:

- typed Entrepreneur route builders
- route-param validation helpers
- canonical entity lookup helpers
- truthful invalid-ID behavior
- Screen Connection Matrix document
- initial route-contract tests

Keep the old `[screen]` route temporarily as a compatibility layer.

Do not redesign UI.

Do not point every new route back into the old SPA router as the final solution.

---

## PHASE C — Public/Auth Extraction

Extract:

```text
/
entrepreneur/login
entrepreneur/register
entrepreneur/register/details
entrepreneur/register/success
```

Preserve:

```text
Government Login → /department/login
Entrepreneur auth separation
registration gating
visual parity
```

After this phase, public/auth routes should no longer depend on old page-state navigation.

---

## PHASE D — Authenticated Shell + My Businesses

Extract:

- authenticated shell
- My Businesses
- business switcher
- business overview entry

Target:

```text
/entrepreneur/businesses
/entrepreneur/businesses/[businessId]
```

App Router layout becomes the one shell owner.

Business opening carries a real `businessId`.

Remove hidden first-business routing dependence from converted routes.

---

## PHASE E — Business DNA Onboarding

Extract:

```text
create business
basic requirements
adaptive discovery
scale & operations
environment/safety
Business Profile Review
```

Use:

```text
/entrepreneur/businesses/new/**
```

until a real business identity exists.

Preserve one logical Business DNA.

Do not create a fake onboarding business ID.

Retire the legacy E05 placeholder from the final contract.

---

## PHASE F — Dossier / Journey / Documents

### F1

```text
E07 Dossier
E08 Provenance
E09 Journey
```

### F2

```text
E10 Requirement Detail
E11 Document Centre
E12 Document Detail
E13 Dependency
```

Introduce real:

```text
businessId
requirementId
documentId
```

into routes.

Delete equivalent selected-ID state only after all entry points use the new route contract.

---

## PHASE G — Application Journey

### G1

```text
E14 Application Workspace
E15 Pre-validation
E16 Consistency
```

### G2

```text
E17 Submission
E18 Tracker
E19 Application Detail
```

### G3

```text
E20 Query
E21 Delta/Resubmission
E22 Inspection
E23 Decision
```

Introduce real:

```text
applicationId
```

and only real child IDs that exist.

Never use the current default application as an invalid-route fallback.

---

## PHASE H — Compliance / Incentives

### H1

```text
E24 Compliance
E25 Compliance Detail
```

Introduce:

```text
complianceId
```

Remove routing dependence on selected compliance React state.

Remove first-obligation fallback.

### H2

```text
E26 Incentives
E27 Incentive Detail
E28 Claims
```

Introduce:

```text
incentiveId
```

Remove routing dependence on selected incentive React state.

Remove first-scheme fallback.

---

## PHASE I — Changes / Support

Extract:

```text
E29 Regulatory Change
E30 Business Change Simulator
E31 Amendments
E32 Grievances
E33 Notifications
E34 Regulatory Assistant
```

Decide explicitly whether each piece of context belongs in:

- URL params
- search params
- local UI state
- workflow state

Do not encode arbitrary free-form values as fake IDs.

Preserve contextual assistant invocation.

---

## PHASE J — E00 / Navigation Finalization

Finalize E00 as:

```text
/entrepreneur/businesses/[businessId]
```

Wire all sidebar navigation through typed route builders.

Nested active navigation must work.

Business switching must preserve equivalent valid context or fall back to a truthful business parent route.

No normal user navigation should depend on old screen-slug URLs after this phase.

---

## PHASE K — Remove Legacy SPA Router

Only after final domain routes exist:

Remove:

```text
src/app/entrepreneur/[screen]/page.tsx
```

Remove obsolete screen-state routing helpers such as:

```text
ENTREPRENEUR_PAGES
EntrepreneurPage
isEntrepreneurPage()
entrepreneurPath(page)
```

where they are no longer needed.

Remove from Entrepreneur runtime:

```text
page state
setPageState
manual setPage router
window.history.pushState
popstate routing listener
old Page-union navigation
```

Delete `EntrepreneurApp.tsx` only after every surviving screen/data/state block has been extracted.

Do not leave an 18k-line legacy app as the final production architecture.

---

## PHASE L — Final Acceptance

Required checks:

- `/` works
- Government Login works
- Department unchanged
- Entrepreneur login works
- registration gating works
- Business DNA works
- real IDs exist in domain routes
- invalid IDs never show first fixture
- direct refresh works
- Back/Forward works
- copied deep links work
- active sidebar works
- one Entrepreneur shell exists
- no `href="#"` active placeholders
- no empty click handlers
- no fake/default dynamic IDs
- no manual `pushState` router
- no old `[screen]` route required
- no giant page-state routing architecture
- typecheck passes
- tests pass
- build passes

---

# 20. WHAT NOT TO DO

Do not:

- re-add the old Figma repo as a dependency
- copy another giant App.tsx
- redesign UI while fixing routing
- move 18k lines into one new file
- introduce React Router
- use hash routing
- inject `useParams()` everywhere
- mass-replace callbacks
- invent fake IDs
- silently fall back to first fixture
- hard-code one business/application everywhere
- turn the entire Entrepreneur app into one giant `'use client'`
- refactor Department during Entrepreneur extraction
- widen Department service-worker scope
- delete E2E coverage just because old tests fail
- keep old E-screen URLs solely to satisfy obsolete tests

---

# 21. OLD `[screen]` ROUTE TRANSITION POLICY

Do not delete the old route on day one.

Use it only as temporary compatibility.

Track status:

```text
e09-journey
OLD: /entrepreneur/e09-journey
NEW: /entrepreneur/businesses/B01/journey
STATUS: converted

e10-req-detail
OLD: /entrepreneur/e10-req-detail + selected React state
NEW: /entrepreneur/businesses/B01/requirements/REQ-X
STATUS: converted
```

Once all production entry points use the new route:

1. stop generating the old slug
2. update tests
3. optionally add a temporary redirect only if useful
4. do not treat the old slug as canonical
5. remove compatibility after final cleanup

---

# 22. REQUIRED FEATURE CONVERSION LOOP

For every batch:

```text
READ current implementation
↓
identify visible UI
↓
identify entry controls
↓
identify real IDs
↓
define target route
↓
update connection matrix
↓
extract screen/data/state
↓
wire typed route builder
↓
typecheck
↓
actual click test
↓
direct refresh test
↓
Back/Forward test
↓
visual parity check
↓
Department regression check
↓
build
↓
checkpoint
```

If something breaks:

```text
do not mass patch
```

Fix the exact component indicated by the compiler/test failure.

---

# 23. FINAL E2E MATRIX

Final Entrepreneur E2E coverage should include:

## Root/auth

- `/`
- Industrial Login
- Government Login
- login success
- registration sequence
- registration-details guard
- logout

## Business identity

- open at least two different businesses where fixture data allows
- correct ID in URL
- correct record rendered
- refresh
- Back/Forward

## Requirement identity

- open at least two requirements where available
- no selected-state leakage

## Document identity

- open at least two documents
- invalid document ID does not display the first document

## Application identity

- open at least two applications
- invalid application ID does not display first application
- child application routes preserve application ID

## Compliance identity

- open at least two compliance records where available
- invalid compliance ID does not display first obligation

## Incentive identity

- open at least two schemes
- invalid incentive ID does not display first scheme

## Shell/navigation

- one header
- one sidebar
- one footer where applicable
- nested active state correct

## History

- click path
- Back
- Forward
- copied deep link
- reload

## Department regression

Existing Department routing coverage remains green.

---

# 24. PROMPT 0 — CURRENT-STATE AUDIT

```text
Read `ENTREPRENEUR_MIGRATION.md` and `ENTREPRENEUR_CURRENT_STATE_TO_TARGET.md` completely.

The old standalone Figma/Vite Entrepreneur repository is NOT present and must not be assumed.

The current Entrepreneur UI/behavior source is:

`src/components/entrepreneur/EntrepreneurApp.tsx`

Do not modify files yet.

Audit the current repository and return:

1. current Entrepreneur screen inventory
2. current old-screen-slug → proposed domain-route mapping
3. canonical real-ID inventory
4. every current selected-ID React state used for routing
5. every current hard-coded default entity used for routing/detail display
6. every current `find(...) || firstRecord` or equivalent fallback
7. every manual browser-history routing mechanism
8. current shell ownership
9. current auth/session behavior
10. current Business DNA state ownership
11. current feature/data blocks inside EntrepreneurApp.tsx
12. current visible `href="#"`, empty/dead actions, or placeholder navigation
13. proposed feature extraction boundaries
14. proposed final route tree
15. proposed typed route-builder API
16. proposed Screen Connection Matrix
17. current E2E tests that should be preserved
18. current E2E tests that validate obsolete screen-slug routing and must be replaced
19. Department files that will be treated as frozen
20. exact phased conversion plan from the CURRENT repo to the target contract
21. current baseline typecheck/test/build status

Do not implement anything.

Stop after the audit.
```

---

# 25. PROMPT 1 — ROUTE CONTRACT + SAFETY INFRASTRUCTURE

```text
Read both migration MD files.

Implement PHASE B only.

Do not extract the full Entrepreneur UI yet.

Create:

- final typed Entrepreneur route builders
- canonical route-param validation helpers
- canonical entity lookup helpers
- truthful invalid-ID/not-found handling
- `docs/ENTREPRENEUR_SCREEN_CONNECTION_MATRIX.md`
- initial E2E tests for the new route contract

Do not remove the old `[screen]` route yet.

Do not change Entrepreneur visuals.

Do not change Department behavior.

Do not create fake/default IDs.

Do not use first-record fallback for invalid route identities.

Do not introduce React Router/hash routing.

Run:

- typecheck
- relevant unit/contract tests
- Entrepreneur route tests
- existing Department routing tests
- production build

Report exactly what was added and stop.
```

---

# 26. PROMPT 2 — PUBLIC/AUTH EXTRACTION

```text
Read both migration MD files.

Implement PHASE C only.

Extract only:

- public landing
- Entrepreneur login
- registration email/OTP
- registration details
- registration success

from the giant EntrepreneurApp into proper Next.js route-backed feature components.

Canonical routes:

/
 /entrepreneur/login
 /entrepreneur/register
 /entrepreneur/register/details
 /entrepreneur/register/success

Preserve visual parity.

Preserve Government Login → /department/login.

Preserve Entrepreneur auth separation from `dept_auth`.

Preserve registration-details gating.

Remove old page-state navigation for these extracted screens.

Do not modify authenticated Entrepreneur feature screens yet.

Update E2E tests to canonical routes.

Verify:

- actual clicks
- direct refresh
- Back/Forward
- registration guard
- visual parity
- typecheck
- tests
- Department regression
- build

Stop.
```

---

# 27. PROMPT 3 — AUTHENTICATED SHELL + BUSINESS PORTFOLIO

```text
Read both migration MD files.

Implement PHASE D only.

Extract:

- authenticated Entrepreneur shell
- My Businesses / Business Portfolio
- business switcher
- business overview entry

Create the authenticated App Router layout as the ONE shell owner.

The layout should own only shared authenticated chrome:

- header
- sidebar
- business switcher
- common frame
- footer
- truly global authenticated UI

Nested pages render page content only.

Canonical routes:

/entrepreneur/businesses
/entrepreneur/businesses/[businessId]

A business card/row action must pass its real `businessId`.

Do not default business-scoped routing to the first business.

If an invalid business ID is requested, render truthful not-found/unavailable behavior.

The business switcher must use typed route builders.

Do not add duplicate shells.

Do not yet extract unrelated E07+ features.

Update the Screen Connection Matrix.

Add/modify E2E tests for:

- login → My Businesses
- clicking a real business
- URL businessId
- displayed business identity
- direct refresh
- Back/Forward
- invalid business ID
- one shell only
- active Business navigation

Run typecheck, tests, Department regression, and build.

Stop.
```

---

# 28. PROMPT 4 — BUSINESS DNA EXTRACTION

```text
Read both migration MD files.

Implement PHASE E only.

Extract the current Business DNA onboarding flow:

- Create Business / Project
- Basic Requirements
- Adaptive Discovery
- Scale & Operations
- Environment / Safety / Existing Context
- Business Profile Review

Use canonical onboarding routes under:

/entrepreneur/businesses/new/**

Do NOT invent a fake `businessId` before a genuine business identity exists.

Preserve ONE logical Business DNA state across the flow.

Extract the related current state together rather than creating separate disconnected stores.

Preserve current:

- adaptive branching
- current/proposed state
- change areas
- validation
- warnings
- data reuse
- review/confirmation behavior

Retire the legacy E05 placeholder from the canonical route map.

Do not claim backend persistence if the current implementation only has client/demo state.

Update the Screen Connection Matrix.

Test:

- complete onboarding click flow
- direct refresh behavior that is valid for the chosen draft-state mechanism
- Back/Forward
- no duplicate shell
- no fake IDs
- visual parity
- typecheck/tests/build
- Department regression

Stop.
```

---

# 29. PROMPT 5 — DOSSIER / JOURNEY / DOCUMENTS

```text
Read both migration MD files.

Implement PHASE F in two verified sub-batches.

SUB-BATCH F1:
- E07 Dossier
- E08 Provenance
- E09 Regulatory Journey

SUB-BATCH F2:
- E10 Requirement Detail
- E11 Document Centre
- E12 Document Detail
- E13 Dependency

Use the approved typed route builders.

Introduce real route identity for:

- businessId
- requirementId
- documentId

Route params enter at App Router boundaries.

Do not distribute `useParams()` throughout extracted feature components.

For every row/card action, pass the real record ID.

Do not use `onClick={callbackExpectingId}` when it would receive a MouseEvent.

Remove any first-record fallback for converted detail pages.

Invalid IDs must not display another valid record.

Do not remove old selected-ID state until every converted entry point no longer depends on it.

Update the Screen Connection Matrix after each sub-batch.

For each dynamic family test:

source screen
→ actual click
→ expected URL with real IDs
→ expected record
→ direct refresh
→ Back/Forward
→ correct active nav
→ one shell

Run typecheck/tests/Department regression/build after F1 and again after F2.

Stop.
```

---

# 30. PROMPT 6 — APPLICATION JOURNEY

```text
Read both migration MD files.

Implement PHASE G only.

Do it in three verified sub-batches.

G1:
- E14 Application Workspace
- E15 Pre-validation
- E16 Cross-form Consistency

G2:
- E17 Payment / Submission
- E18 Application Tracker
- E19 Application Detail

G3:
- E20 Query
- E21 Delta / Resubmission
- E22 Inspection
- E23 Decision

Use real `businessId` and `applicationId`.

Use child IDs only if those identities genuinely exist in current data.

Do NOT invent:

- queryId
- inspectionId
- decisionId
- default
- current
- sample
- temp

simply to satisfy a route.

Where child identity does not exist, use a truthful application-scoped route.

Before defining application/query/inspection/decision states, inspect existing shared Department/domain definitions.

Reuse compatible canonical concepts without changing Department behavior.

Remove route dependence on selected-application React state only after all relevant entry points use `[applicationId]`.

Remove every invalid-ID fallback to the first application.

Update the Screen Connection Matrix.

For every sub-batch test:

- actual clicks
- URL identity
- displayed record identity
- invalid ID
- direct refresh
- Back/Forward
- nested active navigation
- one shell
- visual parity
- typecheck/tests/build
- Department regression

Stop after G3.
```

---

# 31. PROMPT 7 — COMPLIANCE + INCENTIVES

```text
Read both migration MD files.

Implement PHASE H only.

H1:
- E24 Compliance
- E25 Compliance Detail

Introduce real:

`complianceId`

Remove routing dependence on selected-compliance parent state.

Remove first-obligation fallback.

H2:
- E26 Incentives
- E27 Incentive Detail
- E28 Claims

Introduce real:

`incentiveId`

Remove routing dependence on selected-incentive parent state.

Remove first-scheme fallback.

Do not duplicate the same compliance/incentive records across list/detail modules.

Use typed route builders.

Update the Screen Connection Matrix.

For each sub-batch test:

- click at least two records where fixture data allows
- correct ID in URL
- correct record displayed
- invalid ID does not display first record
- reload
- Back/Forward
- active navigation
- one shell
- typecheck/tests/build
- Department regression

Stop.
```

---

# 32. PROMPT 8 — CHANGES + SUPPORT

```text
Read both migration MD files.

Implement PHASE I only.

Extract:

- E29 Regulatory Change Impact
- E30 Business Change Simulator
- E31 Amendments
- E32 Grievances
- E33 Notifications
- E34 Regulatory Assistant

For every piece of context explicitly classify it as:

- route param
- search param
- local UI state
- cross-page workflow state

Do not encode arbitrary form values or free-form text as fake path IDs.

Preserve contextual Regulatory Assistant invocation.

Notification actions must navigate with the correct record/business context.

If Notifications are genuinely user-global in the current implementation, keep them outside business scope and document the decision.

Every visible control must be classified in the Screen Connection Matrix.

No active-looking control may silently do nothing.

Do not invent missing backend persistence.

Test actual clicks, direct refresh where applicable, Back/Forward, active navigation, one shell, typecheck/tests/build, and Department regression.

Stop.
```

---

# 33. PROMPT 9 — E00 + FINAL NAVIGATION

```text
Read both migration MD files.

Implement PHASE J only.

Finalize E00 Entrepreneur Command Centre as the business overview route:

/entrepreneur/businesses/[businessId]

Complete the authenticated Entrepreneur sidebar using ONLY the typed route builders.

Preserve the current Entrepreneur navigation mental model.

Ensure nested routes keep the correct parent sidebar item active.

Update the business switcher so it changes business context through real routes.

When switching business:

- preserve equivalent page context when that target is valid
- otherwise route to a truthful business parent destination
- never invent a child record

Audit the entire Screen Connection Matrix.

There must be no:

- scattered old screen-slug navigation
- raw route strings that should use route builders
- active-looking dead controls
- href="#"
- empty navigation handlers
- console.log navigation
- fake/default record IDs
- duplicate authenticated shell

Run representative end-to-end journeys using actual clicks.

Also test:

- direct refresh
- Back/Forward
- copied deep links
- nested active state
- business switching
- correct record identity
- Department regression
- typecheck/tests/build

Stop.
```

---

# 34. PROMPT 10 — REMOVE THE LEGACY `[screen]` SPA ROUTER

```text
Read both migration MD files.

Implement PHASE K only.

Do not redesign UI.

All normal production Entrepreneur navigation should already use final domain routes before this phase begins.

Remove the legacy Entrepreneur SPA routing architecture.

Remove:

- `src/app/entrepreneur/[screen]/page.tsx` when no canonical route depends on it
- obsolete old-screen route constants/types
- `entrepreneurPath(page)` style helpers
- old Page-union routing where no longer needed
- parent `page` route state
- manual `setPage` router
- `window.history.pushState`
- `popstate` listener used for screen routing

Extract any still-needed screen/data/state code before deleting the giant container.

The final production architecture must not rely on the old `EntrepreneurApp` page-state router.

If `EntrepreneurApp.tsx` becomes empty/obsolete, delete it.

If any small compatibility component remains, rename it according to its actual responsibility.

Do not retain the 18k-line file merely because deletion is inconvenient.

Update E2E tests so no test requires old `/entrepreneur/eXX-*` screen slugs.

Run:

- typecheck
- unit/contract tests
- full Entrepreneur E2E
- Department routing E2E
- production build

Also search the repository for:

- `pushState`
- `popstate`
- old screen slugs
- old screen-route helper names
- obsolete Page-union values

Report any intentional remnants.

Stop.
```

---

# 35. PROMPT 11 — FINAL ACCEPTANCE AUDIT

```text
Read both migration MD files.

Perform PHASE L only.

Do not add features.

Audit final Entrepreneur routing/state architecture against every acceptance requirement.

Confirm:

1. `/` is the public EKATMA landing
2. Government Login reaches `/department/login`
3. Department behavior is unchanged
4. Entrepreneur auth does not touch `dept_auth`
5. public/auth pages use native routes
6. business pages use `[businessId]`
7. requirement detail uses real `requirementId`
8. document detail uses real `documentId`
9. application detail uses real `applicationId`
10. compliance detail uses real `complianceId`
11. incentive detail uses real `incentiveId`
12. only genuine child IDs are used
13. no fake/default dynamic IDs exist
14. invalid IDs never display first-record fallback
15. exactly one Entrepreneur authenticated shell exists
16. old page-state routing is gone
17. manual `pushState`/`popstate` Entrepreneur routing is gone
18. old `[screen]` route is no longer required
19. old E-screen slugs are not canonical production navigation
20. typed route builders are the navigation contract
21. Business DNA remains one logical workflow
22. Screen Connection Matrix is complete
23. every visible migrated control is classified
24. no href="#" active placeholders remain
25. no empty navigation click handlers remain
26. no navigation uses console.log
27. browser Back works
28. browser Forward works
29. copied deep links work
30. direct refresh works
31. nested active navigation works
32. business switching preserves valid context
33. URL identity equals displayed record identity
34. duplicate per-page entity fixtures do not contradict each other
35. Department service-worker scope remains `/department/`
36. typecheck passes
37. relevant tests pass
38. Entrepreneur E2E passes
39. Department E2E passes
40. production build passes

Search the final repository for obsolete routing patterns and report results.

Final report must include:

- final route tree
- final feature/code structure
- final typed route-builder API
- canonical ID table
- Screen Connection Matrix status
- files removed
- files added
- files significantly changed
- Department files touched
- complete validation results
- known limitations
- any intentional local prototype-only behavior

Do not declare completion if identity/deep-link/click routing is still dependent on hidden parent state.
```

---

# 36. HOW TO START THE CODING AGENT NOW

Because the repository is already partially migrated, **do not give the agent the old from-scratch Prompt 0 by itself**.

Use:

```text
Before changing anything, read:

1. `ENTREPRENEUR_MIGRATION.md`
2. `ENTREPRENEUR_CURRENT_STATE_TO_TARGET.md`
3. `AGENTS.md`

The current repository already contains the Entrepreneur pages.

There is NO standalone Figma reference repository.

Do not assume the task is to recreate Entrepreneur pages.

The task is to convert the CURRENT embedded Entrepreneur implementation from its `[screen]` + giant `EntrepreneurApp.tsx` SPA-style architecture into the final domain-route architecture defined by these migration documents while preserving visual/behavioral parity.

Begin with `PROMPT 0 — CURRENT-STATE AUDIT` from `ENTREPRENEUR_CURRENT_STATE_TO_TARGET.md`.

Do not modify files until the audit is complete.
```

---

# 37. RECOMMENDED GIT CHECKPOINTS

Use one checkpoint per meaningful conversion phase.

Example:

```text
baseline
↓
route contract
↓
public/auth
↓
shell/businesses
↓
business DNA
↓
dossier/journey/documents
↓
applications
↓
compliance/incentives
↓
changes/support
↓
E00/navigation
↓
legacy router removal
↓
final audit
```

Do not combine an enormous routing rewrite into one commit.

---

# 38. FINAL SUCCESS CONDITION

The final repository should no longer be:

```text
Next.js shell
→ /entrepreneur/[screen]
→ giant EntrepreneurApp
→ internal page state
→ manual browser history
```

It should be:

```text
Next.js App Router
↓
domain/resource routes
↓
route boundary validates real IDs
↓
feature screen receives explicit identity/data
↓
one authenticated Entrepreneur shell
↓
canonical shared feature state/data
```

The final experience must still look and behave like the current approved Entrepreneur implementation.

This is an **architecture conversion**, not a redesign.
