# EKATMA Entrepreneur → Next.js Migration Guide

> **Purpose**
>
> This file is the authoritative migration contract for adding the Entrepreneur experience from the temporary Figma/Vite React reference project into the existing EKATMA Next.js repository.
>
> **Every coding agent must read this entire file before modifying code.**
>
> **Routing-safety revision:** This version incorporates the mandatory ID, route-contract, click-path, deep-link, shell, and regression safeguards derived from the previous Department-side routing failures.
>
> The goal is to produce **one Next.js application** with:
>
> - `/` → shared/public EKATMA landing page
> - `/entrepreneur/**` → migrated Entrepreneur experience
> - `/department/**` → existing Department experience, behaviorally unchanged
>
> The temporary Entrepreneur reference project will be **deleted after migration**, so no production code may depend on it.

---

# 1. Repository Layout During Migration

Use this layout:

```text
Ekatma-ankita/
├── ENTREPRENEUR_MIGRATION.md          # THIS FILE
│
├── reference/
│   └── entrepreneur-figma/            # TEMPORARY, READ-ONLY REFERENCE
│       ├── src/
│       ├── public/
│       ├── package.json
│       ├── index.html
│       └── ...
│
├── src/
├── public/
├── package.json
├── pnpm-lock.yaml
└── ...
```

## Important

The temporary Entrepreneur project should be placed at:

```text
reference/entrepreneur-figma/
```

Do **not** place it under:

```text
src/
src/app/
src/components/
public/
```

Do not add it to a pnpm workspace.

Do not run it as a second application.

Do not import production code from it.

Do not create symlinks from production code into it.

The entire `reference/entrepreneur-figma/` directory must be safely deletable after migration.

---

# 2. Current Main Repository Architecture

The MAIN repository is authoritative.

It is already a Next.js App Router application using:

- Next.js App Router
- React
- Tailwind CSS v4
- `next/font`
- a Department-side PWA/service worker
- an established Department route structure

The existing Department implementation lives under:

```text
src/app/department/**
```

Important existing areas include:

```text
src/app/page.tsx
src/app/layout.tsx
src/app/globals.css

src/app/department/**
src/app/department/login/page.tsx
src/app/department/(portal)/**

src/components/layout/DepartmentShell.tsx

src/lib/routes.ts
src/domain/**
src/departments/**
src/data/fixtures/**
```

The main repo also contains a large legacy:

```text
src/App.tsx
```

used by the Department migration.

## Critical Rule

The existing `src/App.tsx` is **legacy Department migration structure**.

It is **NOT** a pattern to follow for Entrepreneur.

Do **not** append Entrepreneur screens into the main repo's `src/App.tsx`.

The Entrepreneur implementation must be split into native Next.js routes/components/state modules.

---

# 3. Current Root Behavior

The current root page redirects directly to Department login.

Conceptually it is:

```tsx
import { redirect } from "next/navigation";

export default function RootPage() {
  redirect("/department/login");
}
```

This root behavior will intentionally change.

The new target is:

```text
/
├── public EKATMA landing
│
├── Entrepreneur entry
│   └── /entrepreneur/**
│
└── Government Login
    └── /department/login
```

---

# 4. Department Side Is Frozen

The existing Department experience is already established.

Treat it as **behaviorally frozen**.

Do not redesign, restructure, modernize, rename, or "clean up" the Department application during this migration.

Preserve:

```text
/department/login
/department/**
```

Preserve Department:

- authentication semantics
- URLs
- shell
- sidebar
- workflows
- application flows
- route behavior
- page layouts
- domain states
- fixture assumptions
- PWA scope
- service worker behavior

## Department Authentication

The Department application uses:

```text
dept_auth
```

Do not rename it.

Do not reuse it for Entrepreneur.

Do not let Entrepreneur code read or write it.

---

# 5. Department PWA Boundary

The existing Department service worker is intentionally scoped to:

```text
/department/
```

The current registration is effectively:

```ts
navigator.serviceWorker.register("/department-sw.js", {
  scope: "/department/"
})
```

Do not widen this scope.

Do not make the Department worker control:

```text
/
/entrepreneur/**
```

Entrepreneur PWA support is a separate architectural decision unless explicitly requested later.

---

# 6. Temporary Entrepreneur Reference

The temporary reference is a Vite/React/Figma Make implementation.

Its main implementation is concentrated in a very large:

```text
reference/entrepreneur-figma/src/App.tsx
```

It is primarily a React SPA/state machine.

It uses state similar to:

```tsx
const [page, setPage] = useState<Page>(...)
```

with many branches such as:

```tsx
if (page === "...") ...
```

The migration must preserve the Entrepreneur **screens, flows, content, behavior and visual intent** while replacing this navigation architecture with native Next.js App Router routes.

Do not copy the entire old `App.tsx` into production.

Do not preserve the giant `Page` state machine as the final architecture.

---

# 7. Source Precedence

When source files disagree, use this precedence:

1. **The current user's migration requirements**
2. **The current executable Entrepreneur `src/App.tsx`**
3. **The current MAIN Next.js architecture and shared domain contracts**
4. **Entrepreneur `src/imports/pasted_text/**` files for behavioral/specification detail**
5. **Historical/staged Figma instructions only as historical context**

## Why this matters

The Figma prompt/specification files were created iteratively.

Some older files contain historical instructions such as:

```text
Do not create E06 yet.
```

Those instructions reflected an earlier design phase.

They must **not** prevent migration of screens that now exist in the current executable Entrepreneur `App.tsx`.

---

# 8. Required Product Architecture

Target architecture:

```text
src/
├── app/
│   ├── page.tsx
│   ├── layout.tsx
│   │
│   ├── department/
│   │   └── ... EXISTING / BEHAVIORALLY FROZEN
│   │
│   └── entrepreneur/
│       ├── layout.tsx
│       ├── login/
│       ├── register/
│       ├── businesses/
│       └── ...
│
├── components/
│   ├── layout/
│   │   ├── DepartmentShell.tsx
│   │   └── EntrepreneurShell.tsx
│   └── ...
│
├── entrepreneur/
│   ├── components/
│   ├── data/
│   ├── state/
│   ├── types/
│   ├── routes.ts
│   └── ...
│
└── ...
```

Exact structure may be refined during the audit, but the major separation must remain.

---

# 9. Root Landing Page Rule

The first Entrepreneur reference screen is already the intended public EKATMA landing page.

Do **not** redesign it into a new role-selection dashboard.

Preserve the existing page substantially as-is.

It already contains:

- Government of Maharashtra accessibility strip
- EKATMA government header
- `Login / Register` dropdown
- `Industrial Login`
- `Government Login`
- Welcome to EKATMA section
- `Industrial Login` CTA
- `New User? Register` CTA
- footer

## Required Functional Change

The current Figma `Government Login` item is visible but does not navigate anywhere meaningful.

That one behavior must change:

```text
Government Login
    ↓
/department/login
```

The existing Department login page must be reused.

Do **not** create a second Government login.

Entrepreneur actions should route to native Next.js routes such as:

```text
Industrial Login
    ↓
/entrepreneur/login

New User? Register
    ↓
/entrepreneur/register
```

The final route names can be refined during the route audit.

---

# 10. Root Metadata

The current root metadata identifies the app as Department-specific.

After the public/Entrepreneur routes are introduced, global metadata should become neutral EKATMA metadata.

Department-specific metadata should remain in the Department layout.

Do not remove Department-specific metadata from its own route tree.

---

# 11. Entrepreneur Authentication

The Entrepreneur reference currently stores login status only in React state.

Conceptually:

```tsx
const [isLoggedIn, setIsLoggedIn] = useState(false)
```

It does **not** currently share Department auth.

Because App Router navigation cannot rely on a single giant parent component, introduce only the smallest prototype session mechanism necessary for Entrepreneur navigation.

If browser storage is used, use an Entrepreneur-specific key such as:

```text
entrepreneur_auth
```

Never use:

```text
dept_auth
```

Do not add a major authentication library unless specifically requested.

---

# 12. Old Page-State Migration Rules

Do **not** mechanically create one URL per old `Page` union value.

Every old page state must first be classified as one of:

- real routable screen
- entity/detail screen
- local transient UI state
- legacy compatibility state
- dead/unreachable prototype state

## Known Special Cases

### `e05-placeholder`

This is explicitly retained as legacy/direct-navigation safety in the source.

Do not automatically make it a production Next.js route.

### `e06-placeholder`

The name is misleading.

It currently contains the implemented:

```text
E06 — Business Profile Review
```

Treat it as a real screen.

---

# 13. Main Entrepreneur Flow

The Entrepreneur reference includes the following major experience.

## Public / Authentication

- public portal
- industrial login
- signup email / OTP
- complete registration
- registration success

## Business Setup

- E02 My Businesses / Business Portfolio
- E03 Create Business / Project
- E04 Basic Requirements
- E05 Adaptive Business Questionnaire
- E05 Scale & Operations
- E05 Environment, Safety & Existing Context
- E06 Business Profile Review

## Business / Regulatory Data

- E07 Master Project Dossier / Business Dossier
- E08 Data Provenance
- E09 Regulatory Journey
- E10 Requirement Detail
- E11 Document Centre
- E12 Document Detail
- E13 Dependency View / Dependency Graph

## Application Journey

- E14 Application Workspace
- E15 Pre-validation
- E16 Cross-form Consistency
- E17 Payment / Submission
- E18 Application Tracker
- E19 Application Detail
- E20 Query Response
- E21 Delta / Resubmission
- E22 Inspection Centre
- E23 Decision / Approval

## Operations / Support

- E24 Compliance
- E25 Compliance Detail
- E26 Incentives
- E27 Incentive Detail
- E28 Incentive Applications / Claims
- E29 Regulatory Change Impact
- E30 Business Change Simulator
- E31 Amendments / Change Workflow
- E32 Grievances
- E33 Notifications
- E34 Regulatory Assistant

## Overview

- E00 Entrepreneur Command Centre

E00 should be migrated late in the process because it links into many other modules.

---

# 14. Entrepreneur Sidebar Structure

The reference Entrepreneur navigation conceptually contains:

```text
BUSINESS
    Overview
    My Businesses

APPROVAL JOURNEY
    Regulatory Journey
    Applications
    Documents

OPERATIONS & COMPLIANCE
    Compliance
    Inspections
    Incentives

BUSINESS CHANGES
    Changes & Expansion

SUPPORT
    Grievances
    Regulatory Assistant
    Notifications
```

Preserve this navigation concept.

Do not transform the Entrepreneur sidebar into the Department sidebar.

Both roles should feel like the same EKATMA product while keeping their role-specific information architecture.

---

# 15. Do Not "Fix" Prototype Behavior Unless Requested

Migration means preservation first.

Do not opportunistically:

- complete TODOs
- invent new workflows
- rename concepts
- combine screens
- create arbitrary shortcuts
- route workflow actions to random pages merely to make them "work"

However, **no migrated control may look active while silently doing nothing**.

Every visible interactive control must be classified as exactly one of:

1. **Navigation** — moves to a defined route using the required real IDs
2. **Local UI interaction** — drawer, tab, accordion, modal, filter, etc.
3. **Prototype/workflow action** — preserves the current local/demo behavior without pretending backend persistence exists
4. **Intentionally unavailable / permission-gated** — visually communicated as unavailable

There must be no fifth category:

```text
looks clickable
→ silently does nothing
```

If a reference control is visually active but has no valid implemented destination:

- do **not** invent a fake route
- do **not** invent a fake record
- do **not** create `href="#"`
- do **not** leave `onClick={() => {}}`
- do **not** use `console.log` as navigation

Instead, either preserve a truthful local prototype interaction or render the action as honestly unavailable.

The explicitly authorized cross-role integration remains:

```text
Government Login → /department/login
```

Other behavioral changes require evidence from the current executable Entrepreneur reference or an explicit instruction.

---

# 16. Business DNA Must Remain One Logical Model

E03, E04 and E05 are not independent unrelated forms.

They contribute to **one logical Business DNA**.

Preserve this behavior.

## E03

Captures project identity/basic project information.

## E04

Captures high-level/basic requirements.

## E05

Uses E03/E04 data and asks adaptive follow-up questions.

Preserve:

- data reuse
- conditional questions
- current/proposed states
- branch logic
- change detection
- expansion/modification states
- validation
- warnings

Do not duplicate the same data separately on each page simply because navigation becomes route-based.

E05 must end in:

```text
E06 Business Profile Review
```

---

# 17. State Migration Strategy

Before coding, classify old global React state.

## A. URL State

Entity identity that defines a navigable page should normally move into the URL.

Examples include:

- selected requirement
- selected document
- selected application
- selected compliance obligation
- selected incentive

Use route parameters or search parameters where appropriate.

## B. Cross-Page Workflow State

State needed across Entrepreneur routes should move into a route-safe state mechanism.

Use the simplest maintainable mechanism.

Avoid introducing Redux unless genuinely necessary.

## C. Local UI State

Keep page-local transient state local.

Examples:

- open drawer
- active accordion
- temporary input state
- modal visibility

Do not put everything into the URL.

## D. Mock / Demo Data

Retain prototype data where the current experience depends on it.

Do not silently replace it with invented backend integrations.

---

# 18. Next.js Routing Principle

Meaningful Entrepreneur navigation must become real Next.js App Router navigation.

Do not recreate the old SPA navigation as:

```tsx
setPage("e09-journey")
```

inside one giant client component.

The following rules are **mandatory routing acceptance requirements**.

## 18.1 Define the route contract before deep conversion

Do not create routes screen-by-screen without a plan.

Before PHASE 3 begins, the agent must define and report the canonical route families, dynamic parameters, parent/child relationships, and which old screens remain local UI state rather than routes.

A likely shape is:

```text
/entrepreneur/login
/entrepreneur/register
/entrepreneur/businesses
/entrepreneur/businesses/[businessId]
/entrepreneur/businesses/[businessId]/journey
/entrepreneur/businesses/[businessId]/requirements/[requirementId]
/entrepreneur/businesses/[businessId]/applications
/entrepreneur/businesses/[businessId]/applications/[applicationId]
/entrepreneur/businesses/[businessId]/documents
/entrepreneur/businesses/[businessId]/documents/[documentId]
/entrepreneur/businesses/[businessId]/inspections
/entrepreneur/businesses/[businessId]/compliance
/entrepreneur/businesses/[businessId]/incentives
/entrepreneur/businesses/[businessId]/changes
/entrepreneur/businesses/[businessId]/grievances
/entrepreneur/businesses/[businessId]/assistant
```

This is an example shape, not permission to invent routes that the product does not need.

Do not expose Figma identifiers such as `e09` in permanent public URLs unless a concrete reason is documented.

## 18.2 Centralize route builders

Create one canonical typed Entrepreneur route contract.

Prefer something such as:

```text
src/lib/routes/entrepreneur.ts
```

or an appropriate extension of the existing route utility.

Components should call route builders such as:

```ts
ROUTES.entrepreneur.business(businessId)

ROUTES.entrepreneur.application(
  businessId,
  applicationId
)

ROUTES.entrepreneur.document(
  businessId,
  applicationId,
  documentId
)
```

Do not scatter literal URL strings throughout feature components.

## 18.3 Lock the ID contract before deep screens

Before migrating E07+, identify the real identities used by the product.

Potential identities include:

```text
userId
businessId
projectId
applicationId
documentId
documentVersionId
queryId
deficiencyId
resubmissionId
inspectionId
decisionId / approvalId
dependencyNodeId
complianceId
grievanceId
incentiveId
ruleVersionId
```

Only use identities that genuinely exist in the current product/reference/domain model.

The same entity must retain the same ID across all pages.

Never allow:

```text
URL = APP-002
screen data = APP-001
```

Never silently fall back to one demo record because an ID lookup failed.

## 18.4 Never use fake child IDs

Do not create dynamic routes containing fake identifiers such as:

```text
default
sample
temp
current
```

For example, never create:

```text
/document/default
/inspection/default
/compliance/default
/decision/default
```

If a real child ID exists, pass it.

If it does not:

- route to a valid parent/context page, or
- make the action truthfully unavailable

Never invent a record solely to satisfy a route shape.

## 18.5 Route params belong at the App Router boundary

Preferred pattern:

```text
page.tsx
    ↓ reads businessId/applicationId/documentId
feature screen
    ↓ receives required IDs/data as props
```

For example:

```tsx
<ApplicationOverview
  businessId={businessId}
  applicationId={applicationId}
/>
```

Do not repair routing by injecting `useParams()` into dozens of shared feature components.

Keep feature components as router-independent as practical.

## 18.6 Record-specific callbacks must carry real IDs

A row/card action must carry the identity of the row/card being acted on.

Good:

```tsx
onOpenApplication(application.id)
onOpenDocument(document.id)
onOpenInspection(inspection.id)
```

Bad:

```tsx
onOpenApplication()
onOpenDocument()
```

when the control belongs to a specific record.

If a callback expects:

```ts
(documentId: string) => void
```

do not write:

```tsx
onClick={onOpenDocument}
```

because React will pass a MouseEvent.

Use:

```tsx
onClick={() => onOpenDocument(document.id)}
```

Never allow DOM events to become domain IDs.

## 18.7 Do not mass-change shared callbacks or IDs

If a callback signature changes:

```text
find exact component
→ inspect its prop definition
→ inspect every invocation in that component
→ update only that component
→ typecheck
→ continue
```

Do not use broad:

- regex replacements
- `sed`
- Python mass-patching scripts
- global callback-name replacements
- global ID substitutions

for routing repair.

Use compiler-guided surgical changes.

## 18.8 One global Entrepreneur shell owner

There must be exactly one authenticated Entrepreneur shell.

It may own:

- global header
- Entrepreneur sidebar/navigation
- business switcher
- notifications entry
- common page frame
- footer

Nested route pages render page-specific content only.

Good:

```text
EntrepreneurLayout
├── Header
├── Sidebar
├── children
└── Footer
```

Bad:

```text
EntrepreneurLayout
└── OldFullReactPage
    ├── Header again
    ├── Sidebar again
    ├── Page
    └── Footer again
```

Duplicate shell rendering is a migration failure.

## 18.9 Successful login destination

Successful Entrepreneur login should enter:

```text
My Businesses / Business Portfolio
```

not a random application or deep workflow page.

The intended conceptual flow is:

```text
Login
→ My Businesses
→ choose/create business
→ business-scoped workflow
```

Once a business is selected, preserve its `businessId` through business-scoped navigation.

## 18.10 Create and maintain a Screen Connection Matrix

Before deep conversion, create a routing acceptance matrix with:

```text
Screen / Context
Entry From
Visible Action
Destination
Required IDs
Action Type
```

`Action Type` must be one of:

```text
Navigation
Local UI
Prototype Workflow
Disabled / Permission-gated
```

Example:

```text
Applications
Open Application
→ Application Detail
→ businessId + applicationId
→ Navigation
```

This matrix is part of the routing contract.

Update it as each feature group is migrated.

## 18.11 Distinguish workflow from navigation

A workflow may contain:

```text
Application
→ Query
→ Response
→ Resubmission
→ Review
```

That does not mean every stage needs a permanent navigation shortcut to every other stage.

Define canonical navigation and preserve the product mental model.

Avoid redundant/cyclic deep links.

## 18.12 Critical navigation state must survive refresh

A meaningful inner route must not depend on hidden parent React state for identity.

Browser refresh on representative dynamic routes must preserve:

- correct record
- correct business context
- exactly one shell
- correct parent navigation state
- no fallback demo record

## 18.13 Browser Back / Forward / copied deep links must work

For URL-based navigation:

- Back must work
- Forward must work
- copied deep links must work
- direct refresh must work

Do not hide critical navigation identity only inside `useState`.

## 18.14 Nested routes must keep correct active navigation

A deep route such as:

```text
/entrepreneur/businesses/B01/applications/A01/documents/D01
```

must retain the correct parent Business/Application/Documents context.

Do not rely solely on exact pathname equality when descendants belong to a broader navigation section.

## 18.15 Test actual clicks, not only route existence

This is insufficient:

```text
type /applications/APP-002
→ page loads
```

Also test:

```text
Applications list
→ click APP-002
→ URL contains APP-002
→ destination renders APP-002
```

A route that exists but cannot be reached correctly from its visible entry control is not complete.

## 18.16 No duplicate data sources for the same entity

Do not create different copies of the same Business/Application/Document record for different screens.

Use canonical fixtures/repositories/selectors/state sources.

The same entity must display consistently across:

- list
- detail
- inspection
- document
- compliance
- decision
- notification context

where applicable.

## 18.17 Keep distinct domain states distinct

Do not flatten unrelated workflow concepts into one generic:

```ts
status: string
```

where the model distinguishes:

- application state
- verification state
- query state
- inspection state
- decision state
- dependency state
- compliance state
- grievance state

UI badge text is presentation and must not automatically become the canonical domain state.

## 18.18 No second router

Do not introduce:

- React Router inside Next.js
- hash routing for major screens
- a custom SPA router parallel to App Router

Next.js App Router is the navigation authority.

## 18.19 No giant `'use client'` application

Do not turn the entire Entrepreneur route tree into one giant client component merely to preserve old state.

Use server/page boundaries where appropriate and client components only for interactive behavior.

## 18.20 Routing fixes must not redesign the UI

When repairing navigation, compare before/after visual output.

Routing work must not silently change:

- spacing
- typography
- colors
- cards
- tables
- borders
- grid/layout
- header/sidebar
- responsive behavior

---

# 19. Shared Domain Consistency

The Entrepreneur experience and Department experience represent two sides of the same system.

Before inventing Entrepreneur-specific application/status/domain models, inspect:

```text
src/domain/**
src/data/fixtures/**
src/departments/**
src/lib/routes.ts
```

Reuse or map from canonical shared concepts where appropriate.

Do not create conflicting meanings for:

- application statuses
- approvals
- inspections
- queries
- requirements
- decisions

At the same time, user-facing Entrepreneur labels may remain role-appropriate.

Do not force Entrepreneur copy to exactly match internal Department terminology when the reference intentionally uses simpler language.

---

# 20. Design Rules

The MAIN repository is the implementation authority for:

- Next.js patterns
- Tailwind v4 integration
- `next/font`
- global tokens
- accessibility
- focus behavior
- shared Government/EKATMA conventions
- canonical shared domain contracts
- PWA boundaries

The Entrepreneur reference is the authority for:

- Entrepreneur layout
- Entrepreneur page composition
- content
- workflow behavior
- forms
- tables
- drawers
- contextual assistant behavior
- Entrepreneur sidebar/navigation

## Do Not

Do not introduce:

- a competing design system
- gradients
- glassmorphism
- random SaaS styling
- arbitrary icon systems
- duplicate font-loading strategies
- Google Fonts CSS if the main repo already uses `next/font`

Do not modify Department components merely to make Entrepreneur rendering convenient if that risks changing Department output.

Create Entrepreneur/public variants where necessary.

---

# 21. Asset Warning

Check file contents before copying assets.

In the supplied MAIN ZIP, these files may appear as `.png` files but are Git LFS pointer text:

```text
public/assets/ekatma-logo.png
public/assets/india-emblem.png
public/assets/maha-seal.png
```

The temporary Entrepreneur reference contains actual image binaries matching those expected objects.

If the working checkout still contains Git LFS pointers rather than image bytes:

- materialize/copy the matching actual binary files into the main repo
- preserve their expected filenames/paths where practical
- do not leave runtime references into `reference/entrepreneur-figma/`

Also note that some Figma-exported files with `.png` extensions may actually contain text.

Do not blindly copy files by extension.

Use file-type inspection.

---

# 22. Pre-Existing Department Issues

During verification, the agent may discover unrelated pre-existing issues.

For example, Department manifest icons may be referenced even when not present in the supplied archive.

Treat unrelated pre-existing issues separately.

Do not broaden this migration into a Department refactor merely to fix unrelated legacy issues.

If such an issue directly blocks build/runtime, report it clearly and make the narrowest necessary correction only.

---

# 22A. Clean Baseline and Routing Work Discipline

Before modifying application code:

1. install dependencies using the repository's existing package manager
2. confirm the current Git working tree state
3. record any pre-existing changes/issues
4. run the repository's real baseline checks
5. create a Git checkpoint before each major conversion phase

Use the actual scripts available in the project. At minimum, where supported:

```bash
pnpm typecheck
pnpm exec vitest run
pnpm build
```

If the repository uses a different real script for type-check/tests/build, use that script instead.

Do not claim a check passed based on a placeholder command.

During routing work:

- do not unnecessarily change dependencies
- do not mix lockfile/environment noise into routing commits
- do not commit temporary patch scripts
- do not broadly refactor unrelated working code
- do not suppress TypeScript/build errors
- do not spread `any` merely to make compilation pass

Failure recovery must be surgical:

```text
read exact compiler/test error
→ locate exact component
→ inspect props/handlers/data
→ make smallest correction
→ rerun typecheck/test
→ continue only when resolved
```

Do not attempt to repair dozens of components blindly.

---

# 23. Required Migration Order

Use this sequence.

---

## PHASE 0 — Audit Only

Do not modify files.

Inspect both repositories and produce:

1. architecture comparison
2. complete Entrepreneur screen/state inventory
3. active vs legacy Page-state classification
4. proposed `/entrepreneur/**` route tree
5. shared component plan
6. state migration plan
7. asset migration plan
8. CSS/token overlaps
9. domain-model overlaps
10. PWA implications
11. Department files to treat as frozen
12. migration risks
13. test strategy

Stop after reporting.

---

## PHASE 1 — Public Root Integration

Implement only:

```text
/
```

using the existing Entrepreneur public portal design.

Wire:

```text
Industrial Login
→ /entrepreneur/login

New User? Register
→ /entrepreneur/register

Government Login
→ /department/login
```

Do not migrate authenticated Entrepreneur inner pages yet.

Verify Department login remains unchanged.

---

## PHASE 2 — Entrepreneur Foundation

Create:

```text
src/app/entrepreneur/**
```

and the structural foundation.

Create/adapt:

- Entrepreneur layout
- Entrepreneur shell
- Entrepreneur route helpers
- Entrepreneur session/auth boundary
- state strategy
- reusable navigation/header/sidebar components
- only necessary shared low-level components

Do not migrate every screen yet.

---

## PHASE 3 — Authentication + Business DNA

Migrate:

- Entrepreneur Login
- Signup Email / OTP
- Complete Registration
- Registration Success
- E02 My Businesses
- E03 Create Business / Project
- E04 Basic Requirements
- E05 Adaptive Questionnaire
- E05 Scale & Operations
- E05 Environment, Safety & Existing Context
- E06 Business Profile Review

Ensure E03/E04/E05 use one logical Business DNA.

Do not create a production route for the legacy `e05-placeholder`.

Treat the currently named `E06PlaceholderPage` as the actual implemented E06 Business Profile Review.

---

## PHASE 4 — Regulatory Discovery / Documents

Migrate:

- E07 Master Project Dossier
- E08 Data Provenance
- E09 Regulatory Journey
- E10 Requirement Detail
- E11 Document Centre
- E12 Document Detail
- E13 Dependency View

Move meaningful selected entity IDs into URLs where appropriate.

---

## PHASE 5 — Application Journey

Migrate:

- E14 Application Workspace
- E15 Pre-validation
- E16 Cross-form Consistency
- E17 Payment / Submission
- E18 Application Tracker
- E19 Application Detail
- E20 Query Response
- E21 Delta / Resubmission
- E22 Inspection Centre
- E23 Decision / Approval

Preserve compatibility with canonical Department-side workflow concepts.

Do not alter Department workflows.

---

## PHASE 6 — Compliance / Incentives / Changes / Support

Migrate:

- E24 Compliance
- E25 Compliance Detail
- E26 Incentives
- E27 Incentive Detail
- E28 Incentive Applications / Claims
- E29 Regulatory Change Impact
- E30 Business Change Simulator
- E31 Amendments
- E32 Grievances
- E33 Notifications
- E34 Regulatory Assistant

Preserve contextual assistant invocation.

Notification links should lead to appropriate Entrepreneur routes.

---

## PHASE 7 — E00 + Final Entrepreneur Navigation

Migrate:

```text
E00 Entrepreneur Command Centre
```

Wire the full Entrepreneur sidebar after destination modules exist.

Make E00 the authenticated business-level overview destination according to the reference behavior.

Preserve business switching behavior.

Do not invent additional business-opening behavior unless the current reference explicitly implements it.

---

## PHASE 8 — Deletion Safety Audit

Prove that:

```text
reference/entrepreneur-figma/
```

can be deleted.

Search for:

- runtime imports
- symlinks
- asset paths
- Vite dependencies
- scripts
- package references
- CSS imports
- reference-only file paths

Then temporarily rename/move the reference directory and rerun the main repo checks.

Only after this passes should the user manually delete the reference folder.

---

# 24. Verification After Every Phase

A successful `typecheck` and `build` are necessary but **not sufficient** for routing correctness.

After every implementation batch, run the repository's real equivalents of:

```bash
pnpm typecheck
pnpm exec vitest run
pnpm build
```

Run real lint if configured.

Use Playwright or the project's available browser-test tooling for actual click/deep-link verification when available.

For each migrated dynamic route family, verify:

### Entry-click test

```text
source screen
→ click actual visible control
→ expected URL
→ correct IDs in URL
→ correct record on destination
```

### Direct-refresh test

Refresh a representative deep route and confirm:

- correct record remains selected
- correct business context remains
- exactly one shell is rendered
- correct navigation section remains active
- no fallback/demo record replaces the requested record

### Browser-history test

Verify:

- Back
- Forward
- copied deep link
- direct navigation

### Identity test

Confirm:

```text
URL ID
=
selected entity ID
=
displayed record ID
```

### UI parity test

Routing work must not unintentionally alter the approved Entrepreneur visual design.

### Clickable-control audit

For migrated screens confirm there is no:

- `href="#"`
- empty click handler
- navigation via `console.log`
- active-looking dead control
- fake `/default` child route
- hard-coded fallback record

### Shell test

Confirm exactly one authenticated Entrepreneur header/sidebar/footer shell is visible.

### Department regression test

Verify representative `/department/**` routes still behave as before.

### Checkpoint

Create a clean Git checkpoint before proceeding to the next major batch.

For large phases, implement in **small sub-batches of roughly 3–5 related screens** and perform these checks after each sub-batch rather than waiting until the entire phase is finished.

At the end of every phase report:

- files added
- files changed
- routes added
- route builders added/changed
- IDs introduced/used
- Screen Connection Matrix changes
- state changes
- Department files touched
- test/build results
- click/deep-link/history checks performed
- known remaining issues

---

# 25. Prompt 0 — Repository Audit

Copy this prompt to the coding agent first.

```text
Read `ENTREPRENEUR_MIGRATION.md` completely before doing anything else.

Then inspect BOTH:

1. the MAIN Next.js repository
2. `reference/entrepreneur-figma/`

Do NOT modify files in this step.

Follow the source precedence, Department freeze rules, routing-safety contract, and migration rules defined in `ENTREPRENEUR_MIGRATION.md`.

Produce:

1. a concise architecture comparison
2. the complete Entrepreneur screen/state inventory
3. classification of each old Page state as:
   - routable screen
   - entity/detail route
   - local UI state
   - legacy compatibility state
   - dead/unreachable state
4. the proposed final canonical `/entrepreneur/**` route tree
5. the proposed centralized typed Entrepreneur route-builder API
6. the canonical identity contract, including only identities that genuinely exist
7. parent/child identity relationships
8. a Screen Connection Matrix containing:
   - screen/context
   - entry point
   - visible action
   - destination
   - required IDs
   - Navigation / Local UI / Prototype Workflow / Disabled classification
9. shared/reusable component plan
10. one-shell ownership plan
11. cross-page state migration plan
12. Business DNA state plan for E03/E04/E05/E06
13. auth/session plan that does not touch `dept_auth`
14. domain-model overlaps with the existing Department implementation
15. canonical data-source/fixture plan to avoid duplicate entity copies
16. static asset plan
17. CSS/font/token plan
18. PWA implications
19. exact Department files/directories that will be treated as frozen
20. migration risks
21. phase-by-phase implementation plan, with large phases split into 3–5-screen verified sub-batches
22. route-testing plan covering:
   - actual click paths
   - ID preservation
   - direct refresh
   - Back/Forward
   - copied deep links
   - nested active navigation
   - duplicate-shell prevention
23. existing baseline typecheck/test/build results

Important:

- do not invent fake/default IDs
- do not silently fall back to one demo record
- do not introduce React Router/hash routing
- do not distribute useParams() across shared components
- do not implement yet

Stop after presenting the audit.
```

---

# 26. Prompt 1 — Public Root Landing

```text
Read `ENTREPRENEUR_MIGRATION.md` again and implement PHASE 1 only.

Replace the current root redirect with the existing public EKATMA landing screen from the Entrepreneur reference.

Do not redesign the landing page.

Preserve its existing:

- accessibility strip
- EKATMA header
- Login / Register dropdown
- Industrial Login
- Government Login
- Welcome section
- Industrial Login CTA
- New User? Register CTA
- footer

Wire:

Industrial Login
→ `/entrepreneur/login`

New User? Register
→ `/entrepreneur/register`

Government Login
→ `/department/login`

The existing `/department/login` implementation must remain unchanged.

Do not create another Government login page.

Use the MAIN repo's:

- `next/font`
- Tailwind v4
- accessibility conventions
- Government/EKATMA tokens

Do not import production code from `reference/entrepreneur-figma/`.

If the working checkout still contains Git LFS pointer text for the EKATMA/government identity PNGs, materialize the matching real binaries from the temporary reference without changing runtime paths unnecessarily.

Update root/global metadata so the entire application is no longer globally titled as Department-only, while preserving Department-specific metadata inside the Department route tree.

Do not modify Department PWA scope.

Run:

`pnpm typecheck`
`pnpm build`

Report changed files and results.

STOP after PHASE 1.
```

---

# 27. Prompt 2 — Entrepreneur Foundation

```text
Read `ENTREPRENEUR_MIGRATION.md`.

Implement PHASE 2 only.

Before coding, use the approved PHASE 0 route map, identity contract, and Screen Connection Matrix.

Create the native Next.js App Router foundation under:

`src/app/entrepreneur/**`

Do not copy the reference `App.tsx`.

Do not append Entrepreneur components to the MAIN repo's existing `src/App.tsx`.

Do not recreate a giant `useState<Page>()` router.

Do not introduce React Router or hash routing.

Create:

- Entrepreneur route structure
- centralized typed Entrepreneur route builders
- Entrepreneur layout
- exactly one authenticated Entrepreneur shell
- Entrepreneur-specific authentication/session boundary
- reusable Entrepreneur navigation components
- the minimal state infrastructure required for cross-route workflows
- canonical data access/fixtures/selectors sufficient to prevent route-local duplicate records

Route parameters should be read at the App Router/page boundary and passed into feature components as props where practical.

Do not inject `useParams()` throughout shared feature components.

Use client components only where interaction requires them.

Classify state as:

- URL/entity identity
- cross-page workflow state
- local UI state
- mock/demo data
- session state

Do not introduce Redux or another large dependency unless there is a clearly demonstrated need.

Do not modify `dept_auth`.

Do not widen the `/department/` service-worker scope.

Create only enough placeholder route structure to prove that the architecture works.

Do not invent fake child IDs such as `default`, `sample`, `temp`, or `current`.

Do not migrate all E00–E34 pages yet.

Verification must include:

- typecheck
- relevant tests
- production build
- one-shell verification
- representative route-helper output
- direct navigation to placeholder dynamic route families where created
- Department regression check

Report:

- routes created
- route builders created
- IDs/params defined
- files created
- files modified
- state strategy
- auth strategy
- shell ownership
- shared component decisions
- Screen Connection Matrix updates
- any Department files touched and why

STOP after PHASE 2.
```

---

# 28. Prompt 3 — Auth + Business DNA

```text
Read `ENTREPRENEUR_MIGRATION.md`.

Implement PHASE 3 only.

Use the approved route contract, centralized route builders, ID contract, and Screen Connection Matrix.

Migrate:

- Entrepreneur Login
- Signup Email / OTP
- Complete Registration
- Registration Success
- E02 My Businesses
- E03 Create Business / Project
- E04 Basic Requirements
- E05 Adaptive Business Questionnaire
- E05 Scale & Operations
- E05 Environment, Safety & Existing Context
- E06 Business Profile Review

Use the current executable reference implementation as the behavioral/visual authority.

Use pasted_text specifications only for supporting detail, not obsolete staged restrictions.

Important:

E03 + E04 + all E05 stages + E06 operate on ONE logical Business DNA.

Do not duplicate already captured data simply because pages are now separate routes.

Preserve:

- adaptive branching
- current/proposed states
- relevant conditional questions
- validation
- warnings
- change detection
- data reuse

Do not create a production route for the legacy `e05-placeholder`.

Do not mistake `E06PlaceholderPage` for an unused placeholder; it is the implemented E06 Business Profile Review.

Successful Entrepreneur login must enter My Businesses / Business Portfolio.

For every business card/row action, pass the real `businessId`.

Do not hard-code one business ID as a universal fallback.

Do not create `/businesses/default`.

Replace meaningful `setPage(...)` navigation with the approved Next.js route builders.

Entrepreneur auth must remain independent of `dept_auth`.

Every migrated visible control must be classified in the Screen Connection Matrix as Navigation, Local UI, Prototype Workflow, or Disabled.

Do not leave `href="#"`, empty click handlers, or active-looking dead controls.

Implement in small verified sub-batches rather than one large edit.

After each sub-batch verify:

- actual click path
- correct businessId in URL/context
- direct refresh where the route is dynamic
- Back/Forward
- one shell only
- visual parity
- typecheck/tests/build

STOP after PHASE 3.
```

---

# 29. Prompt 4 — Regulatory Journey / Documents

```text
Read `ENTREPRENEUR_MIGRATION.md`.

Implement PHASE 4 only.

Use the approved route contract, typed route builders, identity contract, canonical data sources, and Screen Connection Matrix.

Migrate in small related sub-batches:

- E07 Master Project Dossier
- E08 Data Provenance
- E09 Regulatory Journey
- E10 Requirement Detail
- E11 Document Centre
- E12 Document Detail
- E13 Dependency View / Dependency Graph

Where a requirement/document/dependency represents a real navigable entity, use its real canonical ID.

Never use fake child IDs such as `default`, `sample`, `temp`, or `current`.

Route pages should read params at the App Router boundary and pass IDs/data into feature screens.

Do not scatter `useParams()` through shared components.

For row/card-specific actions, callbacks must explicitly carry the correct record ID.

Do not pass a MouseEvent accidentally as a domain ID.

Browser refresh on representative inner routes must render the same requested record.

The same entity must use one canonical data source; do not create route-local duplicate copies.

Do not redesign the Entrepreneur experience.

Do not modify Department workflows.

Update the Screen Connection Matrix as each screen is migrated.

For each dynamic route family verify:

source screen
→ actual click
→ expected URL with correct IDs
→ correct destination record
→ refresh
→ Back/Forward
→ correct active navigation
→ one shell only

Run typecheck, relevant tests, and production build after each sub-batch.

STOP after PHASE 4.
```

---

# 30. Prompt 5 — Application Journey

```text
Read `ENTREPRENEUR_MIGRATION.md`.

Implement PHASE 5 only.

Use the approved route contract, typed route builders, identity contract, canonical data sources, and Screen Connection Matrix.

Migrate in small verified sub-batches of roughly 3–5 related screens:

Batch A:
- E14 Application Workspace
- E15 Pre-validation
- E16 Cross-form Consistency

Batch B:
- E17 Payment / Submission
- E18 Application Tracker
- E19 Application Detail

Batch C:
- E20 Query Response
- E21 Delta / Resubmission
- E22 Inspection Centre
- E23 Decision / Approval

Before creating Entrepreneur-specific workflow state, inspect:

- `src/domain/**`
- `src/data/fixtures/**`
- Department workflow/status definitions

Use canonical shared concepts where appropriate.

Do not alter Department behavior.

Do not collapse unrelated application/query/inspection/decision state into one generic status model if the domain distinguishes them.

Do not create incompatible meanings for application/inspection/query/decision status.

Preserve Entrepreneur-friendly labels where the reference intentionally uses them.

Every application/query/inspection/decision action must carry the real corresponding IDs.

Never silently replace a missing ID with one hard-coded demo application.

Never create fake `/default` child routes.

Route params should enter at the App Router boundary.

Do not globally change shared callback signatures; update components surgically and typecheck after each change.

For every batch:

- update the Screen Connection Matrix
- test actual visible entry clicks
- verify URL IDs equal displayed record IDs
- direct-refresh representative dynamic routes
- test Back/Forward
- verify nested active navigation
- verify one shell only
- verify visual parity
- run typecheck/tests/build
- create a checkpoint

Representative complete flow must work:

Application Workspace
→ Pre-validation
→ Consistency
→ Payment/Submission
→ Tracker
→ Application Detail
→ Query/Delta/Inspection/Decision paths

STOP after PHASE 5.
```

---

# 31. Prompt 6 — Remaining Entrepreneur Modules

```text
Read `ENTREPRENEUR_MIGRATION.md`.

Implement PHASE 6 only.

Use the approved route contract, route builders, identity contract, canonical data sources, and Screen Connection Matrix.

Migrate in small verified feature batches:

- E24 Compliance
- E25 Compliance Detail
- E26 Incentives
- E27 Incentive Detail
- E28 Incentive Applications / Claims
- E29 Regulatory Change Impact
- E30 Business Change Simulator
- E31 Amendments
- E32 Grievances
- E33 Notifications
- E34 Regulatory Assistant

Preserve existing:

- page structure
- forms
- tables
- drawers
- statuses
- cross-links
- contextual data
- business context

Use real IDs for compliance obligations, incentives, grievances, notifications/context records and other routable entities.

Do not invent `default` records.

Do not duplicate entity data in route-local fixtures when a canonical source already exists.

Regulatory Assistant must retain relevant contextual invocation rather than becoming a context-free generic page.

Notification links must carry the correct destination identity and route to the correct Entrepreneur destination.

Every visible migrated control must be classified and must not silently do nothing.

For every feature batch test:

source click
→ correct URL
→ correct record
→ refresh
→ Back/Forward
→ nested active navigation
→ one shell only
→ visual parity

Run typecheck, relevant tests, and production build after each sub-batch.

STOP after PHASE 6.
```

---

# 32. Prompt 7 — E00 + Final Navigation

```text
Read `ENTREPRENEUR_MIGRATION.md`.

Implement PHASE 7 only.

Migrate:

E00 Entrepreneur Command Centre

Then complete the authenticated Entrepreneur sidebar and cross-module navigation using only the approved centralized route builders.

Use E00 as the business-level overview destination according to the current reference behavior.

Preserve the reference sidebar information architecture:

BUSINESS
- Overview
- My Businesses

APPROVAL JOURNEY
- Regulatory Journey
- Applications
- Documents

OPERATIONS & COMPLIANCE
- Compliance
- Inspections
- Incentives

BUSINESS CHANGES
- Changes & Expansion

SUPPORT
- Grievances
- Regulatory Assistant
- Notifications

Do not transform the Entrepreneur navigation into the Department navigation.

Do not invent arbitrary workflow shortcuts.

For nested routes, ensure the appropriate parent navigation item remains active.

Audit the entire Screen Connection Matrix and ensure every migrated visible control is classified.

There must be no:

- active-looking dead control
- `href="#"`
- empty click handler
- navigation via `console.log`
- fake/default record ID
- hard-coded fallback business/application
- duplicate authenticated shell
- scattered literal route strings that should use the route contract

Test representative full journeys using actual clicks.

Also test:

- direct refresh for each dynamic route family
- Back/Forward
- copied deep links
- business-context preservation
- correct nested active navigation
- correct record identity on destination

Run typecheck, relevant tests, and production build.

STOP after PHASE 7.
```

---

# 33. Prompt 8 — Deletion Safety Audit

```text
Read `ENTREPRENEUR_MIGRATION.md`.

Perform PHASE 8 only.

Do not add new product features.

The goal is to prove that:

`reference/entrepreneur-figma/`

can be deleted and that the migrated routing contract is sound.

Audit the MAIN repository for:

- imports from the temporary reference directory
- relative paths reaching into it
- symlinks
- asset references
- Vite runtime assumptions
- references to the temporary `index.html`
- scripts that execute the temporary app
- package/workspace dependencies
- CSS imports
- runtime URLs that rely on reference files

There must be ZERO production dependencies.

Audit route implementation:

- all major navigation uses the centralized Entrepreneur route contract
- no React Router/hash router exists
- no giant Page-state router remains
- no fake `default` / `sample` / `temp` / `current` IDs exist in dynamic workflow URLs
- no hard-coded fallback business/application silently replaces missing route identity
- route params are handled at route boundaries where practical
- no widespread unnecessary `useParams()` coupling exists
- row/card callbacks carry real record IDs
- no callback receives MouseEvent where a domain ID is expected

Audit the Screen Connection Matrix:

For every migrated visible control, confirm its implementation matches its classification.

There must be no:
- `href="#"`
- empty click handler
- navigation via `console.log`
- active-looking dead control

Audit data identity:

For representative records confirm:

URL ID
=
selected entity ID
=
displayed record ID

Confirm there are no contradictory duplicate route-local copies of the same canonical entity.

Audit routes:

`/`
→ public EKATMA landing

`/entrepreneur/**`
→ native Entrepreneur Next.js routes

`/department/login`
→ existing Government login

`/department/**`
→ existing Department portal

Audit Department regression:

Review every changed Department-related file.

Department behavior must remain unchanged.

Audit Entrepreneur state:

Confirm:

- no giant parent Page state machine remains as route architecture
- routable entity identity is in URLs where appropriate
- local UI state remains local
- E03/E04/E05/E06 still operate on one Business DNA
- auth does not touch `dept_auth`
- exactly one authenticated Entrepreneur shell exists

Routing acceptance tests must include actual clicks, not only typed URLs.

For representative route families test:

- business
- application
- document
- inspection
- compliance
- grievance
- incentive

For each:

source screen
→ click actual entry
→ correct URL
→ correct record
→ direct refresh
→ Back
→ Forward
→ copied deep link
→ correct nested active navigation
→ one shell only

Audit assets:

Confirm every production asset exists in the MAIN repo.

Audit PWA:

Confirm the Department service worker remains scoped to `/department/`.

Run the project's real validation gates, including:

`pnpm typecheck`
relevant tests
`pnpm build`

Do not suppress failures or weaken TypeScript.

Then temporarily rename/move:

`reference/entrepreneur-figma/`

so it is unavailable.

Rerun typecheck/tests/build.

If anything fails because the reference directory is missing, remove that dependency.

Restore the reference directory after the simulation so the user can delete it manually.

Final report must contain:

1. final route tree
2. route-builder API/location
3. final canonical identity map
4. Screen Connection Matrix completion status
5. files added
6. existing files modified
7. Department files modified
8. test/build results
9. click/deep-link/history test results
10. asset migration result
11. confirmation of zero reference-directory production dependencies
12. known limitations
13. explicit statement whether `reference/entrepreneur-figma/` is safe to delete

Do NOT delete the reference directory yourself.
```

---

# 34. How to Start Every New Coding-Agent Session

Start the coding agent with:

```text
Before modifying anything, read `ENTREPRENEUR_MIGRATION.md` completely.

This file is the authoritative migration contract.

The MAIN Next.js repository is production.

`reference/entrepreneur-figma/` is temporary read-only reference material.

Do not touch implementation yet.

Begin with Prompt 0 / PHASE 0 from the migration guide and report your audit.
```

Do not initially ask:

```text
migrate the entrepreneur app
```

That request is too broad.

Always begin with the audit.

---

# 35. Agent Discipline

If an agent proposes a large architectural deviation, ask:

```text
Show me exactly where this is required by `ENTREPRENEUR_MIGRATION.md`
or by the current executable reference implementation.

If it is not required, preserve the existing migration contract.
```

If an agent begins altering Department code heavily, stop it and ask:

```text
Why is this Department change strictly necessary for Entrepreneur migration?

Can the same goal be achieved without changing Department behavior?
```

If an agent wants to keep the Figma project in production:

```text
No.

The reference directory must be deletable after migration.

Reimplement the required behavior natively in the MAIN Next.js repository.
```

---

# 36. Completion Definition

The migration is complete only when all of the following are true:

- `/` displays the existing EKATMA public landing
- `Government Login` routes to `/department/login`
- Department pages remain internally unchanged
- Entrepreneur authentication is independent
- Entrepreneur pages are native Next.js App Router pages/components
- no second router/hash-routing system exists
- centralized Entrepreneur route builders are used
- canonical entity identities are preserved across routes/screens
- no fake/default dynamic IDs exist
- no hard-coded fallback record silently replaces a requested record
- E03/E04/E05/E06 share one Business DNA
- E00–E34 active functionality is accounted for
- legacy states are intentionally classified
- exactly one authenticated Entrepreneur shell exists
- every visible interactive control is classified
- no active-looking control silently does nothing
- actual entry clicks reach the correct route
- URL IDs match displayed record IDs
- meaningful inner Entrepreneur URLs survive direct refresh
- browser Back and Forward work
- copied deep links work
- nested routes keep correct active navigation
- the same entity is not represented by contradictory per-page data copies
- production code does not import from the temporary reference project
- assets required at runtime live in the main repo
- Department service worker still only controls `/department/`
- typecheck passes
- relevant tests pass
- production build passes
- the main repo still passes validation after the reference directory is temporarily removed

Only then is:

```text
reference/entrepreneur-figma/
```

safe for the user to delete.

---

# 37. Final Principle

This is **not** a merge of two frontend applications.

It is a migration of one React/Figma prototype into an existing Next.js product.

Preserve:

```text
Entrepreneur UX + flow
```

Adopt:

```text
MAIN repo architecture + contracts
```

Protect:

```text
Department behavior
```

Remove:

```text
temporary reference dependency
```
