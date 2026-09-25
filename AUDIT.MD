# EKATMA MIDC Department Portal

## Navigation and Information Architecture Audit

**Audit date:** 25 September 2026  
**Audit target:** Current Next.js MIDC Department implementation in this repository  
**Audit baseline:** `EKATMA_MIDC_NAVIGATION_IA_MASTER_AUDIT_PROMPT (1).md`  
**Status:** **FAIL — structural remediation required before navigation acceptance**

---

## 1. Scope, Method, and Evidence

This report audits the implemented MIDC Department portal as one navigation and information-architecture system. It covers the 43 implemented Department routes, the 16 global sidebar work areas, application-specific deep routes, route callbacks, visible controls, breadcrumbs, return paths, state/context handling, and the principal end-to-end journeys in the supplied audit brief.

Evidence reviewed:

- `src/app/department/**/page.tsx` and Department layouts
- `src/App.tsx` page/component implementations
- `src/lib/routes.ts` and `src/lib/routes.test.ts`
- `src/data/fixtures/data.ts` and domain state/type definitions
- Department Playwright specifications in `e2e/`
- Live local rendering of Department Home, Application Overview, Service Catalogue, and Queries / Deficiencies
- TypeScript and Vitest execution

Important scope boundary: no editable Figma file, Figma URL, node export, or prototype-connection export was supplied. Therefore, this report verifies the implemented Next.js prototype and its actual runtime route graph. Figma-node connection hygiene is marked **Needs Verification** wherever it cannot be established from the repository.

### Verification results

- `npm run typecheck`: **PASS**
- `npx vitest run`: **PASS — 99 tests**
- Live local screen inspection: **completed for representative global and application journeys**
- Playwright E2E run: **not executed to assertion stage because the configured Chromium binary is not installed**
- `next build`: Turbopack could not bind an internal process port in the sandbox; this was an environment limitation, not treated as a product finding

### Classification

- **P0 — Structural Blocker:** workflow identity or major task integrity is impossible/contradictory
- **P1 — Major:** duplicate ownership, severe rabbit hole, major discoverability failure, or broken canonical route
- **P2 — Moderate:** confusing or unnecessarily deep, but a workaround exists
- **P3 — Minor:** terminology, breadcrumb, label, or consistency defect

Actions use the requested vocabulary: **KEEP**, **KEEP AS CONTEXTUAL**, **MOVE**, **MERGE**, **REMOVE**, **REPLACE WITH LINK**, **MAKE CONDITIONAL**, **MAKE PERMISSION-GATED**, and **NEEDS REVIEW**.

---

## A. Executive Summary

The implementation contains a strong 16-item global sidebar, meaningful operational content, good Business DNA provenance, safe external-dependency language, and generally appropriate separation of machine findings from officer decisions. However, it does not yet behave as one coherent application-centred system.

The largest problems are:

1. **P0 — Application identity is not preserved.** Dynamic route IDs select URLs, but most application pages render hard-coded fixture IDs and records. In live verification, `/department/applications/APP-MIDC-2048` displayed `MIDC-APP-2026-00482`. Many downstream pages display `MIDC-APP-2026-00418` regardless of the URL. An officer can therefore act on a screen that visually identifies a different application from the route they opened.
2. **P1 — The central Application Workspace is incomplete.** It exposes only `Overview`, `Business DNA`, and `Timeline`, not the required 12 tabs. Scrutiny, Queries, Inspections, Decision, Dependencies, Documents, Regulatory Reference, and Audit are separate pages without one persistent workspace navigation model.
3. **P1 — Queries / Deficiencies is not a query worklist.** The global route reuses the generic Application Search page and opens M18 Query Builder directly, bypassing `Application Workspace → Queries`.
4. **P1 — Scrutiny owns query functions it must not own.** M18 and M19 appear in the Scrutiny module set, workflow routing map, attention items, and route tests.
5. **P1 — Inspection Queue and Inspections are duplicate implementations.** Both global routes render the same M21 queue component with identical actions; execution/history has no distinct owner.
6. **P1 — Service Catalogue cannot complete its canonical job.** A service row opens a detail panel, but the final `View Queue — <service>` button performs no action. Live verification confirmed the URL and UI remain unchanged.
7. **P1 — Decisions exposes deep post-decision functions as peer launch cards.** The global Decisions page directly opens M25, M27, and M28, creating competing entry points instead of `Decision Queue → Application Workspace → Decision`.
8. **P1 — Two global utility/header systems are rendered together.** The legacy portal header and Department context bar each expose search, notifications, profile, and logout-style controls. Only the Department context bar is wired to canonical routing.
9. **P2 — Back and breadcrumb behavior does not preserve origin.** Application Overview always returns to My Queue even when entered from Search, Home, Scrutiny, SLA, Audit, or Grievances. Several deep pages use browser-history `back()`, while many breadcrumb items labelled `Department Home` actually return to Application Overview.
10. **P2 — Internal M-numbers are exposed throughout primary actions.** Labels such as `Open Application → M06`, `Query History → M19`, and `Proceed to Scrutiny → M10` make the UI depend on internal screen IDs.

### Biggest redundancies

- `/department/inspection-queue` and `/department/inspections` render the same component.
- Legacy header utilities duplicate the Department context bar.
- Application workflows are represented both as global work-area shortcuts and as independent deep-page navigation systems.
- M18/M19 are accessible from Queries, Scrutiny, inspection pages, grievance evidence, decision evidence, notifications, and numerous deep-page cross-links without a shared Queries tab owner.

### Biggest cycles

- M18 Query Builder ↔ M19 Query History is implemented as mutual primary navigation, rather than sibling views under a stable Queries tab.
- M25 ↔ M26 ↔ M27 ↔ M28 contain many reciprocal links; valid evidence access is mixed with redundant workflow navigation.
- Several deep pages map every breadcrumb ancestor to the same Application Overview callback, creating apparent hierarchy without distinct parent behavior.

### Biggest rabbit holes

- Scrutiny worklist/module card → M18/M19 directly.
- Decisions global dashboard → M27/M28 directly.
- Notification → application-specific inspection list, labelled as inspection queue.
- Grievance → M22 planning directly for inspection evidence.
- Any deep route can display a hard-coded record unrelated to its URL, which is the most severe contextual rabbit hole.

### Biggest orphan or missing-owned areas

No implemented route is completely unreachable from all code paths, but several required workspace jobs have no canonical visible home:

- Application data tab
- Documents tab/list
- Scrutiny tab
- Queries tab
- Inspections tab/history
- Decision tab
- Dependencies tab
- Regulatory Reference tab
- Application Audit tab

These are not merely absent pages; their functions exist elsewhere as disconnected deep routes, which creates ownership ambiguity.

---

## 2. Priority Findings Register

| ID | Severity | Finding | Evidence | Impact | Required action |
|---|---|---|---|---|---|
| F-01 | P0 | URL application identity and rendered record identity diverge | Dynamic `appId` is used only to build callbacks in application page wrappers; `M06AppOverviewPage` and deep components read fixed fixtures. Live: route `APP-MIDC-2048`, screen `MIDC-APP-2026-00482`. `src/App.tsx:3729`, `src/App.tsx:3767` | Officer can review or decide the wrong record | Pass a canonical application record/context into every workspace page; reject unknown IDs; test visible ID, child ID, and linked evidence after navigation/reload |
| F-02 | P1 | Application Workspace has 3 tabs instead of 12 | `APP_TABS = ['Overview', 'Business DNA', 'Timeline']` in `src/data/fixtures/data.ts:130` | No central application hub; deep pages become competing systems | Add canonical tabs and route every application operation through them; contextual detail routes remain nested |
| F-03 | P1 | Global Queries route is generic Application Search | `src/app/department/(portal)/queries/page.tsx` renders `M04SearchPage`; live heading is `Application Search` | Query officers cannot see a query worklist; ownership is unclear | Replace with Query Worklist; row opens Application Workspace → Queries; M18/M19 remain within that tab |
| F-04 | P1 | Scrutiny owns M18 and M19 | Scrutiny module definitions and `moduleDestination()` include `query`/`queryhistory`; `departmentScrutinyRoute()` also exposes them | Duplicate query ownership and direct deep shortcuts | Remove M18/M19 module cards, workflow-stage links, attention links, and scrutiny route-map entries; show contextual unresolved-issue count/link only |
| F-05 | P1 | Inspection Queue and Inspections are identical | Both global page files render `M21InspectionQueuePage` with the same callbacks | Scheduling and execution/history are indistinguishable | Keep M21 at Inspection Queue; build Inspections as records/history leading to Application Workspace → Inspections |
| F-06 | P1 | Service Catalogue filtered queue action is dead | `M05ServicePage` has no routing prop; live final `View Queue — Land / Plot` button caused no state/URL change | Canonical Service Catalogue journey cannot complete | Route count cells and final action to My Queue with explicit service/status filters |
| F-07 | P1 | Decisions dashboard directly owns M27 and M28 shortcuts | `/department/decisions` opens decision workspace, dependency update, and compliance directly | Post-decision consequences become peer workflows | Global Decisions should contain a queue and `Open Application`; expose M27/M28 inside Decision/Dependencies context only |
| F-08 | P1 | Duplicate global utilities | `PortalHeader` plus `DeptContextBar`; live screen shows two searches, two notification controls, and two logout controls | Competing global navigation and inconsistent behavior | Remove/hide legacy interactive utilities for Department portal or wire one shared canonical utility bar |
| F-09 | P1 | Contextual Regulatory Assistant loses application context | Application page routes to global `/department/regasst`; M32 displays a fixed `MIDC-APP-2026-00418` | Answer provenance may be associated with the wrong application | Pass application ID/context in route state or query; show and validate current application context |
| F-10 | P1 | Domain application-state contract conflicts with canonical states | `src/domain/states.ts` defines lowercase coarse states including `under_scrutiny`, `decision_pending`, `withdrawn`; UI uses uppercase canonical states | State comparisons and labels can diverge across layers | Replace/alias with one canonical uppercase state contract; keep overlays separate |
| F-11 | P2 | Application Overview back action always returns to My Queue | `[applicationId]/page.tsx` hard-codes `/department/queue` | Search, Scrutiny, SLA, Audit, and Grievance origins are lost | Use stable workspace parent plus explicit `from` context, or a predictable owner-specific return link |
| F-12 | P2 | `router.back()` is used as business hierarchy | M12, M13, M16, M17, M18 and other wrappers use browser history | Direct links/reloads can return outside the workflow or nowhere meaningful | Replace with explicit parent routes preserving application and child IDs |
| F-13 | P2 | Breadcrumb labels and destinations disagree | On M09/M10/M11 etc., `Department Home`, `Applications`, and `Application Overview` often call the same overview callback | Breadcrumb is decorative and misleading | Give each ancestor its real destination; include application ID and workspace tab in hierarchy |
| F-14 | P2 | Persistent application context is incomplete | M06 lacks explicit Business ID, Project ID, Query Version, Inspection ID, Dependency State, and Decision State | Context is lost across complex tasks | Introduce a persistent workspace header containing all relevant identifiers/states |
| F-15 | P2 | Action labels do not describe destinations | Home `Review`, `Finalise`, `Schedule`, `Open` all open generic Application Overview; many labels expose M-numbers | Users cannot predict the next screen | Use destination-honest labels, e.g. `Open Application`, `Open Queries`, `Open Inspection Planning` |
| F-16 | P2 | Notifications use ambiguous/incorrect ownership labels | notification key `inspection-queue` routes to application inspections list; generic `Open →` hides destination | Deep link is not predictable | Rename actions by destination and route to the exact tab/record while preserving application and inspection IDs |
| F-17 | P2 | Application Audit link loses record filter | M06 routes `onOpenAudit` to global `/department/audit` | Contextual audit becomes global search without guaranteed record continuity | Open Application Workspace → Audit, or global Audit pre-filtered to the application |
| F-18 | P2 | Deep workflow pages form their own navigation shell | M11–M29 render bespoke headers, strips, breadcrumbs, and reciprocal actions outside a shared workspace tab shell | Competing navigation models and cycles | Wrap deep pages in one Application Workspace layout; treat M12/M13/etc. as contextual child detail |
| F-19 | P3 | Terminology varies | `Queue / Inbox` vs `My Queue`; `Review` for scrutiny; `Approval` appears where canonical area is `Decision`; `Inspect Queue` label points to inspection queue | Increases learning burden | Standardize the established terms and explain genuine distinctions |
| F-20 | P3 | Legacy footer and utility controls are dead | Many `href="#"` links; Help/Sitemap/profile buttons have no destination | Repeated dead ends | Remove from prototype, make conditional, or route to real destinations |

---

## B. Global Navigation Audit

| Sidebar item | Implemented route | Intended job | Actual behavior | Severity | Action |
|---|---|---|---|---|---|
| Department Home | `/department` | Operational command centre | Appropriate summaries and work-area links; My Actions labels are misleading; inspection cards open generic application overview | P2 | KEEP; relabel row actions and send inspection scheduling to the owned context |
| My Queue | `/department/queue` | Identify assigned applications needing attention | Queue tabs/filters and rows open Application Overview | Pass with P2 caveat | KEEP; rename page from `Queue / Inbox` to `My Queue`; preserve origin when opening app |
| Applications | `/department/search` | Find applications | Correct search-first behavior; results open application route | Pass with P0 caveat | KEEP; fix rendered identity |
| Service Catalogue | `/department/services` | Segment services and open filtered queue | Counts and detail drawer work; canonical final View Queue is dead | P1 | KEEP area; wire filtered queue destination |
| Inspection Queue | `/department/inspection-queue` | Scheduling/planning | Renders M21 and opens M22 | Pass with duplication | KEEP as canonical M21 owner |
| Scrutiny | `/department/scrutiny` | Scrutiny worklist | Rich worklist, but deep-launches modules and owns M18/M19 | P1 | KEEP worklist; open Application Workspace → Scrutiny; remove query ownership |
| Inspections | `/department/inspections` | Execution and history | Exact same M21 queue implementation as Inspection Queue | P1 | REPLACE with inspection records/history and application Inspections tab |
| Queries / Deficiencies | `/department/queries` | Query worklist and lifecycle | Generic Application Search labelled `Application Search`; result opens M18 directly | P1 | REPLACE with query worklist |
| Decisions | `/department/decisions` | Decision queue | Dashboard exposes direct M25, M27, M28 launches | P1 | KEEP queue concept; remove deep post-decision shortcuts |
| SLA & Escalations | `/department/sla` | Monitor SLA and escalation context | Correct dashboard, filters, application/grievance links | Pass with P2 caveat | KEEP; ensure application link preserves selected row and context |
| Grievances | `/department/grievances` | Grievance handling | Inline list/detail/resolution; contextual evidence links | Pass with P2 caveat | KEEP; label exact evidence destination; do not send evidence link to planning unless planning is the record owner |
| Regulatory Assistant | `/department/regasst` | Explain/cite regulations | Provenance and non-decision boundary are present; application context is hard-coded/lost | P1 | KEEP global and contextual entry; bind optional application context |
| Analytics | `/department/analytics` | Operational intelligence | Trends/funnel/ageing/drill-down and M36 link; contextual links do not own applications | Pass | KEEP |
| Regulatory Changes | `/department/regchng` | Change queue, compare, validate, impact | M33/M34 ownership is clear; Admin actions are visually gated | Pass with P3 caveat | KEEP; make permission gates semantic (`disabled`, role check), not styling only |
| Workload | `/department/workload` | Capacity/planning | Appropriate views and links to SLA/Inspection/Analytics | Pass | KEEP |
| Audit / History | `/department/audit` | Read-only historical evidence | Read-only event list and application contextual link | Pass with P2 caveat | KEEP; add application-scoped Audit tab and pre-filtered contextual entry |

### Global navigation order

The sidebar contains all 16 required areas and no extra deep workflow item. Its order differs slightly from the source list by placing `Inspection Queue` before `Scrutiny`; this matches the final architecture in the brief and is not itself a defect. Child routes correctly avoid receiving separate sidebar items. Application routes always highlight `Applications`; this is acceptable only after the workspace becomes the true canonical hub and origin-aware back behavior is added.

---

## C. Page Inventory and Ownership Audit

The table below covers every implemented Department page route.

| # | Page / route | Purpose | Canonical owner | Current parent/entry | Key outbound paths | Duplicate / empty / orphan | Action |
|---:|---|---|---|---|---|---|---|
| 1 | `/department/login` — M01 | Officer login | Authentication | Root/redirect | Department Home | Not IA-owned | KEEP; remove prototype state controls from production |
| 2 | `/department` — Home/M02 | Operational command centre | Department Home | Login | Queue, Inspection Queue, Decisions, SLA, Grievances, M36, Workload, Services, application | No | KEEP |
| 3 | `/department/queue` — M03 | Assigned work queue | My Queue | Sidebar/Home/Service filter target | Application Workspace | No | KEEP; rename consistently |
| 4 | `/department/search` — M04 | Find applications | Applications | Sidebar/header search | Application Workspace | No | KEEP |
| 5 | `/department/services` — M05 | Service segmentation | Service Catalogue | Sidebar/Home | Intended filtered queue | Dead-end final action | KEEP; wire queue |
| 6 | `/department/applications/[applicationId]` — M06 | Application overview/workspace shell | Application Workspace → Overview | Queue/Search/Home/other work areas | DNA, Timeline, scrutiny details, inspections, decision, dependencies, queries, assistant, audit | Incomplete workspace; wrong record identity | MERGE into full workspace shell |
| 7 | `/department/applications/[applicationId]/dna` — M07 | Business DNA and provenance | Workspace → Business DNA | M06/deep contextual links | Overview | Fixed fixture identity | MOVE under persistent workspace tab |
| 8 | `/department/applications/[applicationId]/timeline` — M08 | Application timeline | Workspace → Timeline | M06/deep links | Overview/global audit | Fixed fixture identity | MOVE under persistent workspace tab |
| 9 | `/department/applications/[applicationId]/precheck` — M09 | Automated pre-check | Workspace → Scrutiny | M06 | DNA, Timeline, M10 | Fixed fixture identity | MOVE under Scrutiny tab |
| 10 | `/department/applications/[applicationId]/scrutiny-route` — M10 | Explain configured route | Workspace → Scrutiny | M09 | M11, dependencies, DNA, Timeline | Fixed fixture identity | MOVE under Scrutiny tab |
| 11 | `/department/applications/[applicationId]/scrutiny-workbench` — M11 | Land/Plot scrutiny | Workspace → Scrutiny | M10/global Scrutiny | M12, M13, M14, M15, M17, DNA, Timeline | Fixed fixture identity | MOVE under Scrutiny tab |
| 12 | `/department/applications/[applicationId]/parameter/[parameterId]` — M12 | Parameter detail | M11 contextual detail | M11/M14/M15/M16 | M13, DNA, dependency | Uses URL child ID only for routing; content fixed | KEEP AS CONTEXTUAL; bind record |
| 13 | `/department/applications/[applicationId]/document/[documentId]` — M13 | Document review | Workspace Documents / scrutiny context | Multiple workflow pages | M12/back | Content/IDs fixed; no Documents tab | KEEP AS CONTEXTUAL; add Documents owner |
| 14 | `/department/applications/[applicationId]/building-scrutiny` — M14 | Building scrutiny | Workspace → Scrutiny | M11/Scrutiny worklist | M12, M13, M16, M17 | Fixed fixture identity | MOVE under Scrutiny tab |
| 15 | `/department/applications/[applicationId]/water-scrutiny` — M15 | Water/utility/drainage scrutiny | Workspace → Scrutiny | M11/Scrutiny worklist | M12, M13, M16, M17 | Fixed fixture identity | MOVE under Scrutiny tab |
| 16 | `/department/applications/[applicationId]/consistency` — M16 | Cross-form consistency | Workspace → Scrutiny | M14/M15/M20/M25/etc. | M12, M13 | Fixed fixture identity; history back | MOVE under Scrutiny tab |
| 17 | `/department/applications/[applicationId]/dependency-view` — M17 | Dependency view | Workspace → Dependencies | Many contextual pages | Overview/back | Fixed fixture identity | MOVE under Dependencies tab |
| 18 | `/department/applications/[applicationId]/query-builder` — M18 | Consolidated query creation | Workspace → Queries | Global Queries/Scrutiny/deep links | M19, overview | Duplicate owner; fixed identity | MOVE to Queries tab; remove Scrutiny ownership |
| 19 | `/department/applications/[applicationId]/query-history` — M19 | Query/response history | Workspace → Queries | Notifications, Grievance, deep pages, Scrutiny | M18, M20 | Duplicate owner; fixed identity | MOVE to Queries tab |
| 20 | `/department/applications/[applicationId]/delta-rescrutiny` — M20 | Delta review | Workspace → Scrutiny | M19/Scrutiny/notifications/deep pages | DNA, M13, M16, M17, Timeline | Fixed identity | MOVE under Scrutiny tab |
| 21 | `/department/inspection-queue` — M21 | Inspection scheduling queue | Inspection Queue | Sidebar/Home/Scrutiny context | M22 and evidence | Duplicated by `/inspections` | KEEP canonical |
| 22 | `/department/applications/[applicationId]/inspections` | Application inspection records/list | Workspace → Inspections | M06/notification | M22, M17, M19, M20 | Uses M21 component filtered by application; ownership blurred | REPLACE with application inspection history/tab |
| 23 | `/department/applications/[applicationId]/inspections/[inspectionId]/plan` — M22 | Inspection planning | Inspection Queue / Inspections | M21 | M23, evidence | Fixed content IDs | KEEP AS CONTEXTUAL; bind IDs |
| 24 | `/department/applications/[applicationId]/inspections/[inspectionId]/workspace` — M23 | Inspection execution | Workspace → Inspections | M22 | M24, evidence | Fixed content IDs | MOVE under Inspections context |
| 25 | `/department/applications/[applicationId]/inspections/[inspectionId]/observations` — M24 | Observation/re-inspection | Workspace → Inspections | M23 | M22/M23/evidence | Fixed content IDs | KEEP AS CONTEXTUAL |
| 26 | `/department/inspections` | Inspection records/history | Inspections | Sidebar | Same as M21 | Exact duplicate | REPLACE |
| 27 | `/department/decisions` | Decision queue | Decisions | Sidebar/Home | M25, M27, M28 | Deep shortcut ownership | KEEP queue; remove M27/M28 launchers |
| 28 | `/department/applications/[applicationId]/decision-workspace` — M25 | Evidence and decision preparation | Workspace → Decision | Decisions/M06 | M26 and evidence | Fixed identity | MOVE under Decision tab |
| 29 | `/department/applications/[applicationId]/decisions/[decisionId]` — M26 | Formal decision record | Workspace → Decision | M25/M27/M28/M29 | M27, DNA, overview | Fixed IDs | KEEP AS CONTEXTUAL/read-only after record |
| 30 | `/department/applications/[applicationId]/dependencies/[dependencyNodeId]/update` — M27 | Decision consequence propagation | Decision/Dependencies context | M26/global Decisions direct | M25, M26, M28, M17, M19, M20 | Competing global entry; fixed IDs | REMOVE global shortcut; keep contextual |
| 31 | `/department/applications/[applicationId]/compliance/[complianceId]` — M28 | Conditions/compliance | Decision/Compliance context | M27/global Decisions direct | M26, M27, M29, M23, M17, M13 | Competing global entry; fixed IDs | REMOVE global shortcut; keep contextual |
| 32 | `/department/applications/[applicationId]/amendment-intake` — M29 | Expansion/amendment lifecycle | Application change lifecycle | M28 | M26, M28, DNA, scrutiny, inspection | Contextual, not orphan | KEEP AS CONTEXTUAL |
| 33 | `/department/sla` — M30 | SLA monitoring | SLA & Escalations | Sidebar/Home/Analytics/Workload | Application, Grievance | No | KEEP |
| 34 | `/department/grievances` — M31 | Grievance handling | Grievances | Sidebar/SLA | App, SLA, M19, M22 | No | KEEP |
| 35 | `/department/regasst` — M32 | Regulatory explanation | Regulatory Assistant | Sidebar/header/application | Regulatory Changes | Context is fixed/lost | KEEP; bind optional context |
| 36 | `/department/regchng` — M33 | Regulatory change centre | Regulatory Changes | Sidebar/M32 | M34/M32 | No | KEEP; permission-gate admin actions |
| 37 | `/department/regchng/impact` — M34 | Change impact analysis | Regulatory Changes | M33 | Applications/M33 | No | KEEP AS CONTEXTUAL |
| 38 | `/department/analytics` — M35 | Department analytics | Analytics | Sidebar/Home/Workload | M30, M21, M36 | No | KEEP |
| 39 | `/department/bottleneck` — M36 | Bottleneck analysis | Analytics | Home/M35 | M30, M21, M35 | No | KEEP AS CONTEXTUAL |
| 40 | `/department/workload` — M37 | Workload/capacity | Workload | Sidebar/Home | M30, M21, M35 | No | KEEP |
| 41 | `/department/audit` — M38 | Read-only audit/history | Audit / History | Sidebar/M06 | Application | Missing application-scoped owner | KEEP global; add workspace Audit tab |
| 42 | Notification drawer — M39 | Global notifications | Notification system | Department context bar | SLA, Grievance, M19, M20, DNA, decision, inspections | Duplicate notification control in legacy header | MERGE into one global utility |
| 43 | Department portal layout | Global shell | Global navigation | All authenticated routes | Sidebar/utilities | Duplicate utility/header system | MERGE |

---

## D. Connection Inventory

This inventory records the material route-level and high-impact UI connections. Purely local UI state controls (filters, tab switches, expand/collapse) are excluded unless they create a dead end or misleading workflow.

| Source | Element | Actual destination | Expected owner/path | Expected? | Duplicate/cycle/depth/context | Label clear? | Action |
|---|---|---|---|---|---|---|---|
| Login | Successful authentication | Home | Home | Yes | Context loaded | Yes | KEEP |
| Global sidebar | 16 work-area buttons | Matching global routes | Matching work areas | Yes | No extra deep item | Yes | KEEP |
| Legacy header | Search field | No route callback | Applications/Search | No | Duplicate and dead | Generic | REMOVE or MERGE |
| Legacy header | Notifications | No canonical drawer callback | M39 | No | Duplicate and dead | No count/context | REMOVE or MERGE |
| Legacy header | Log out | Local state only | Login + clear auth | No | Duplicate | Yes | REMOVE or MERGE |
| Department context bar | Search submit | `/department/search?q=…` | Applications | Yes | Context appropriate | Yes | KEEP |
| Department context bar | Notifications | M39 drawer | M39 | Yes | Canonical | Yes | KEEP |
| Department context bar | Regulatory Assistant | `/department/regasst` | M32 | Yes globally | Application context absent | Yes | KEEP; add context option |
| Home | KPI cards | Queue/M21/Decisions/M30/M31 | Work-area owner | Mostly | Summary links | Mostly | KEEP |
| Home | My Actions row actions | Application Overview | Application Workspace | Yes destination | `Review`, `Finalise`, `Schedule` imply deeper task | No | RENAME |
| Home | Inspection cards `Open/Schedule` | Application Overview | Inspection Queue/Workspace context | Partly | Destination does not match label | No | MOVE/RENAME |
| Home | Process insight `View` | M36 | Analytics → M36 | Yes | Contextual | Too generic | Rename `Open Bottleneck Analysis` |
| Home | Service Mix | Service Catalogue | Service Catalogue | Yes | — | Yes | KEEP |
| My Queue | Application ID | Application Overview | Workspace | Yes | Context preserved in URL, not screen data | Yes | KEEP after F-01 |
| My Queue | `Open` | Application Overview | Workspace | Yes | Same as ID action | Yes | KEEP |
| Applications | Search result ID/Open | Application Overview | Workspace | Yes | Correct search model; rendered data mismatch | Yes | KEEP after F-01 |
| Service Catalogue | Count buttons | Service detail drawer only | Filtered My Queue | No | Extra intermediate | Numeric label ambiguous | REPLACE WITH LINK to filtered queue |
| Service Catalogue | Row `View Queue` | Service detail drawer | Filtered My Queue | Partly | Adds drawer | Yes | Optional detail action should be `View Service Detail` |
| Service detail | `View Queue — service` | No action | Filtered My Queue | No | Dead end | Yes but false promise | MOVE/wire |
| Scrutiny | Worklist `OPEN` | Application Overview | Workspace → Scrutiny | Partly | Stops at Overview, no Scrutiny tab | Generic | Route to Scrutiny tab |
| Scrutiny | Workflow stage buttons | M09–M21 deep pages | Workspace → Scrutiny | No | Bypasses hub; M18/M19 duplicate owner | M-number dependent | MOVE into tab |
| Scrutiny | M18 module card | Query Builder | Workspace → Queries | No | Duplicate ownership | Internal ID | REMOVE |
| Scrutiny | M19 module card/attention item | Query History | Workspace → Queries | No | Duplicate ownership | Internal ID | REMOVE/REPLACE WITH CONTEXTUAL LINK |
| Queries | Search result open | M18 Query Builder | Workspace → Queries | No | Bypasses app and Queries tab | UI says application search/open | REPLACE with query worklist row |
| Inspection Queue | Plan action | M22 | M22 | Yes | IDs in URL | Yes | KEEP after ID binding |
| Inspection Queue | Evidence links | M17/M19/M20 | App contextual tabs | Partly | Many cross-links; context fixed | M-number dependent | KEEP AS CONTEXTUAL after workspace integration |
| Inspections | All actions | Same as Inspection Queue | Records/history owner | No | Exact duplicate | Misleading global owner | REPLACE |
| Application Overview | Back | `/department/queue` | Nearest meaningful origin | No | Origin lost | Says Applications but goes My Queue | FIX |
| Application Overview | Business DNA tab | M07 route | Workspace → Business DNA | Yes | Leaves shell visual model | Yes | Integrate tab |
| Application Overview | Timeline tab | M08 route | Workspace → Timeline | Yes | Leaves shell visual model | Yes | Integrate tab |
| Application Overview | Other required tabs | Absent | 9 additional canonical tabs | No | Missing owners | N/A | ADD within existing workspace, not global nav |
| M09 | Proceed to Scrutiny → M10 | M10 | Workspace → Scrutiny | Yes process | Internal ID label | No | Keep destination; remove M-number |
| M10 | Open M11 | M11 | Workspace → Scrutiny | Yes process | Internal ID label | No | Keep destination; remove M-number |
| M11 | M12/M13/M14/M15/M17 | Deep scrutiny details | Scrutiny tab contextual children | Yes contextually | Currently separate shell | M-number dependent | KEEP AS CONTEXTUAL |
| M13 | Add to Consolidated Query | Local confirmation/state, not clearly M18 route | Queries/M18 | Needs review | Potential dead workflow | Label promises route | Wire via shared deficiency state |
| M16 | Back | Browser history | Scrutiny parent | No | Unstable | Generic | Replace explicit parent |
| M17 | Back | Browser history | Dependencies tab/previous context | No | Unstable | Generic | Replace explicit parent |
| M18 | Query History | M19 | Queries sibling | Yes contextually | Mutual cycle | M-number label | Present both under stable Queries tab |
| M19 | Back/Query Builder/New Query | M18 | Queries sibling | Yes contextually | Mutual cycle | M-number label | Present under stable tab; remove faux hierarchy |
| M19 | Delta re-scrutiny | M20 | Scrutiny tab | Legitimate process loop | Business-process loop | Clear enough | KEEP |
| M22 | Back to Queue | Inspection Queue | M21 | Yes | Explicit | Yes | KEEP |
| M22 | Inspection Workspace | M23 | Inspections | Yes | Correct sequence | M-number dependent | KEEP; remove M-number |
| M23 | Observation/Re-inspection | M24 | Inspections | Yes | Correct sequence | M-number dependent | KEEP; remove M-number |
| M24 | M22/M23 links | Planning/workspace | Inspections | Yes contextually | Valid process loop | M-number dependent | KEEP |
| Decisions | Open Decision Workspace | M25 | Workspace → Decision | Partly | Bypasses app workspace shell | Yes | Route through Decision tab |
| Decisions | M27 Dependency Update | M27 | Post-decision contextual | No as global shortcut | Competing owner | Internal ID | REMOVE |
| Decisions | M28 Compliance | M28 | Post-decision contextual | No as global shortcut | Competing owner | Internal ID | REMOVE |
| M25 | Record Decision | M26 | Decision tab | Yes | Correct sequence | Internal ID | KEEP; remove M-number |
| M25 | Evidence shortcuts | M13/M16/M17/M19/M20/M23/M24/M11 | Relevant app tabs/context | Partly | High cross-link density | M-number dependent | Replace with stable evidence panels/tab links |
| M26 | M27/M28 | Post-decision consequences | Decision/Dependencies | Yes contextually | Reciprocal links | M-number dependent | KEEP AS CONTEXTUAL |
| M27 | M25/M26/M28/M17/M19/M20 | Multiple sibling/deep pages | Decision/Dependencies | Partly | Dense navigation cycle | M-number dependent | Reduce to parent tabs + contextual evidence |
| M28 | M26/M27/M29/M23/M17/M13 | Multiple sibling/deep pages | Decision/Compliance | Partly | Dense navigation cycle | M-number dependent | Reduce to parent + contextual evidence |
| SLA | Application detail | Application Workspace | Workspace | Yes | Selected row retained | Generic `View`, then open | Rename direct action |
| SLA | Escalate | Grievances | Grievances | Yes | Context not explicitly passed | Clear | Pass SLA/application reference |
| Grievance | Open Application | Application Workspace | Workspace | Yes | URL ID retained, screen data not | M06 exposed | Remove M-number |
| Grievance | Query History | M19 | Workspace → Queries | Yes contextually | Deep page | M-number exposed | Route to Queries tab/history |
| Grievance | View Inspection | M22 plan | Inspection evidence/record | Needs review | Planning may be wrong evidence owner | M21/M22 exposed | Route to immutable inspection record unless action is scheduling |
| M32 | View source | Source detail | Regulatory Assistant | Yes | Provenance preserved | Yes | KEEP |
| M32 | Regulatory Change Centre | M33 | Regulatory Changes | Yes contextual | — | M-number exposed | KEEP; rename |
| M33 | Impact | M34 | Regulatory Changes | Yes | — | M-number exposed | KEEP; rename |
| M33 | Confirm/Publish | No callback, styled unavailable | Permission-gated action | Partly | Not semantically disabled | Clear | MAKE PERMISSION-GATED |
| M34 | Open App | Application Workspace | Workspace | Yes contextual | URL ID retained, rendered identity risk | Abbreviated | Rename `Open Application` |
| M35 | M36 | Bottleneck | Analytics | Yes | — | M-number exposed | KEEP; rename |
| M35/M36/M37 | Inspection Queue | Global M21 | Inspection Queue | Yes | Wrapper ignores passed inspection ID | Label okay | Do not accept unused ID; use filter if supplied |
| M38 | Open Application | Application Workspace | Workspace | Yes contextual | URL ID retained, rendered identity risk | M06 exposed | KEEP; remove M-number |
| M39 | Decision pending | M25 | Workspace → Decision | Partly | Deep link without tab shell | Generic `Open` | Route to tab and name action |
| M39 | Query response | M19 | Workspace → Queries | Partly | Correct record type, missing shell | Generic | Route to Queries tab/history |
| M39 | Inspection due | Application inspections list | Inspection Queue or specific record | Ambiguous | Key called `inspection-queue`, destination is not global queue | No | Correct key/destination/label |
| M39 | SLA/Grievance | Global work areas | M30/M31 | Yes | Application selection not passed | Generic | Preselect referenced record |
| Footer | All informational links | `#` | Real content or hidden | No | Dead end across every page | Labels clear but false | REMOVE/MAKE CONDITIONAL |

---

## E. Function Ownership Matrix

| Function | Canonical page | Global area | Application tab | Contextual access | Current duplicate pages/owners | Action |
|---|---|---|---|---|---|---|
| M06 Overview | Application Workspace | Applications/queues lead in | Overview | Home, SLA, Grievance, Audit | None, but record fixture conflicts | KEEP; bind identity |
| M07 Business DNA | Workspace | — | Business DNA | Scrutiny, Decision, Inspection | Many deep links | KEEP AS CONTEXTUAL |
| Application data | Workspace | — | Application | Search result summary only | Missing owner | ADD TAB |
| Documents | Workspace | — | Documents | M13 from scrutiny/inspection/decision | M13 has no list owner | ADD TAB; M13 child |
| M09–M16 | Workspace | Scrutiny worklist | Scrutiny | Relevant details | Independent deep shell | MOVE under tab |
| M17 Dependencies | Workspace | — | Dependencies | Scrutiny/Decision/Inspection | Independent page and many cross-links | MOVE under tab |
| M18 Query Builder | Workspace | Queries worklist | Queries | Deficiency links | Queries direct launch + Scrutiny ownership | REMOVE from Scrutiny; MOVE under tab |
| M19 Query History | Workspace | Queries worklist | Queries | Grievance/notifications/evidence | Scrutiny and many deep pages | KEEP AS CONTEXTUAL under tab |
| M20 Delta | Workspace | Scrutiny worklist | Scrutiny | M19/resubmission notification | Scrutiny global shortcut | KEEP process loop under tab |
| M21 Queue | Inspection Queue | Inspection Queue | — | Home/Scrutiny | Duplicated by Inspections | KEEP only global M21 |
| M22 Planning | Inspection Queue/Inspections | Inspection Queue | Inspections context | Grievance if action required | Deep route | KEEP contextual |
| M23/M24 Execution | Workspace | Inspections records lead in | Inspections | Decision evidence | Independent pages | MOVE under tab/context |
| M25/M26 Decision | Workspace | Decisions queue | Decision | Evidence links | Direct M25 launch | MOVE under tab |
| M27 Dependency update | Decision/Dependencies | Decisions lead in | Decision/Dependencies | M26 | Global Decisions card | REMOVE global shortcut |
| M28 Compliance | Decision/Compliance | Decisions lead in | Decision/Compliance context | M26/M27 | Global Decisions card | REMOVE global shortcut |
| M29 Amendment | Business/application change lifecycle | — | Application/Decision context | M28 | No duplicate | KEEP AS CONTEXTUAL |
| M30 SLA | SLA & Escalations | SLA & Escalations | Context summary/link | Analytics/Workload/App | No duplicate workflow | KEEP |
| M31 Grievance | Grievances | Grievances | Evidence only | SLA/App | No duplicate | KEEP |
| M32 Assistant | Regulatory Assistant | Regulatory Assistant | Regulatory Reference contextual entry | App/M33 | Context hard-coded | KEEP; bind context |
| M33/M34 Changes | Regulatory Changes | Regulatory Changes | Regulatory Reference link only | M32/App impact | No duplicate | KEEP |
| M35/M36 Analytics | Analytics | Analytics | Evidence drill-down only | Home/Workload | No duplicate | KEEP |
| M37 Workload | Workload | Workload | — | Home | No duplicate | KEEP |
| M38 Audit | Audit / History | Audit / History | Audit | Timeline/Decision | App Audit tab missing | ADD contextual tab |
| M39 Notifications | Global utility | Header/drawer | Deep links to tabs | All work areas | Duplicate legacy notification button | MERGE |

---

## F. Redundancy Audit

### Duplicate workflow ownership to remove

1. **M18/M19 under Scrutiny and Queries.** Queries must be the canonical owner. Scrutiny may surface unresolved deficiency counts and `Open Queries`, but not its own Query Builder/History workflow cards.
2. **Inspection Queue and Inspections.** The same M21 component cannot represent both scheduling and execution/history.
3. **Decision consequences on the global Decisions dashboard.** M27 and M28 must remain consequences inside Decision/Dependencies/Compliance context.
4. **Two global header utility systems.** Keep one Department-level search, notifications, assistant, profile, and sign-out implementation.
5. **Deep-page navigation shells.** M09–M29 repeatedly recreate breadcrumbs, record headers, workflow strips, and cross-links. Consolidate these into a persistent Application Workspace shell.

### Repetition that is valid and should remain

- Application ID in queue, header, timeline, audit, decision, inspection, and grievance evidence
- Current state, desk, SLA, service, and business name as persistent context
- Read-only links to Business DNA, Dependencies, Timeline, and Audit from evidence panels
- Query → response → resubmission → delta → possible new query business loop
- M26 decision evidence referenced by M27/M28 without duplicating the decision action

---

## G. Cycle Audit

| Cycle | Type | Assessment | Action |
|---|---|---|---|
| Query → Entrepreneur Response → Resubmission → Delta → Query if needed | Business-process loop | Legitimate and required | KEEP |
| M18 Query Builder ↔ M19 Query History | Navigation loop | Sibling views are presented as parent/back destinations | Put both under stable Queries tab; retain explicit `Create Query` and `History` views |
| M25 → M26 → M27 → M25/M26/M28 | Mixed | Some evidence/sequence is valid; reciprocal workflow buttons create cycling | Preserve sequence, replace reciprocal peers with workspace tabs/breadcrumb parent |
| M28 → M29 → M28 | Business lifecycle loop | Valid amendment/compliance relationship | KEEP AS CONTEXTUAL with clear return parent |
| M22 → M23 → M24 → M22/M23 | Mixed | Re-inspection can legitimately revisit planning; generic back links should reflect record hierarchy | KEEP process loop; remove redundant navigation links |
| Deep page → Application Overview → global work area → same deep page | Navigation loop | Caused by missing application tabs and origin loss | Resolve through persistent workspace and explicit parent routes |

---

## H. Rabbit-Hole Audit

| Entry path | Problem | Severity | Fix |
|---|---|---|---|
| Home/My Queue/Search → application URL → unrelated hard-coded record | User cannot trust where they are | P0 | Bind route identity before all other IA cleanup |
| Scrutiny → module card → M18/M19 | Query lifecycle appears Scrutiny-owned | P1 | Remove direct modules; open Queries tab contextually |
| Decisions → M27 or M28 card | Post-decision detail appears global | P1 | Remove cards; enter through application Decision tab |
| Service Catalogue → service → View Queue | Final action is dead | P1 | Navigate to filtered My Queue |
| Notification → `inspection-queue` key → application inspections list | Label and owner disagree | P2 | Link to global queue for scheduling or exact inspection record for execution |
| Grievance → View Inspection → M22 | Evidence link can become planning workflow | P2 | Default to read-only inspection record; show planning only when an assigned action exists |
| Analytics → inspection shortcut | Wrapper ignores supplied ID and opens generic queue | P2 | Either filter the queue or remove the unused ID contract |

---

## I. Empty Tab and Missing-Tab Audit

The current M06 workspace has no visibly empty production tabs; it has only three tabs and routes two of them away. The structural issue is missing canonical tabs, not empty placeholders.

| Required tab | Current state | Classification | Action |
|---|---|---|---|
| Overview | Implemented | Distinct job | KEEP |
| Business DNA | Implemented as separate route | Content exists elsewhere | Integrate into workspace shell |
| Application | Missing | Distinct job | Populate from submitted application data |
| Documents | Missing; M13 detail exists | Content exists elsewhere | Add list/summary tab; M13 remains contextual child |
| Scrutiny | Missing; M09–M17/M20 exist separately | Content exists elsewhere | Add canonical tab and nest functions |
| Queries | Missing; M18/M19 exist separately | Content exists elsewhere | Add canonical tab and nest lifecycle |
| Inspections | Missing; filtered M21/M22–M24 exist | Content exists elsewhere | Add records/execution tab |
| Decision | Missing; M25–M28 exist | Content exists elsewhere | Add canonical Decision tab |
| Dependencies | Missing; M17/M27 exist | Content exists elsewhere | Add canonical tab |
| Timeline | Implemented as separate route | Content exists elsewhere | Integrate into shell |
| Regulatory Reference | Missing; M32/M33 links exist | Distinct contextual job | Add contextual sources/reference tab; do not duplicate M32 chat |
| Audit | Missing; M38 global exists | Distinct contextual job | Add application-filtered read-only tab |

Any future capability should remain hidden or feature-gated; do not add a blank tab.

---

## J. Orphan and Discoverability Audit

### Route reachability

All implemented route files have at least one coded inbound route or are a global entry page. There are no proven hard route orphans.

### Predictability orphans

The following functions are effectively orphaned from the officer's expected mental model because there is no canonical workspace tab:

- Submitted Application data
- Documents list/summary
- Application-level Scrutiny
- Application-level Queries
- Application-level Inspections/history
- Application-level Decision
- Application-level Dependencies
- Regulatory Reference
- Application-level Audit

M29 Amendment Intake is intentionally contextual and should not become global. M12/M13 are legitimate contextual details. M34 and M36 are correctly discoverable as child analytical pages.

### Figma-specific orphan audit

**Needs Verification:** obtain the Figma prototype connection export and confirm that every frame corresponding to these 43 routes has predictable inbound/outbound connections, no hidden duplicate frame, and a valid back/close destination.

---

## K. Button and Label Audit

### Misleading or ambiguous labels

| Current label | Actual behavior | Recommended label/action |
|---|---|---|
| `Review` on Home | Opens Application Overview | `Open Application` |
| `Finalise` on Home | Opens Application Overview, not query finalisation | `Open Queries` if routed to Queries tab; otherwise `Open Application` |
| `Schedule` on Home | Opens Application Overview | `Open Inspection Planning` only if it reaches M22; otherwise `Open Application` |
| `OPEN` in Scrutiny | Opens Overview, not Scrutiny tab | `Open Application Scrutiny` |
| `View Queue` in Service Catalogue | First opens detail; final button is dead | Row action `View Service Detail`; final action `View Filtered Queue` |
| `View` in SLA | Opens local drawer, then requires another action | `View SLA Detail`; direct secondary action `Open Application` |
| `Open →` in notifications | Destination varies by category | `Open Queries`, `Open Decision`, `View SLA`, `Open Inspection Record`, etc. |
| `Open Application → M06` | Opens application | `Open Application` |
| `Query History → M19` | Opens query history | `Open Query History` |
| `Proceed to Scrutiny → M10` | Opens route explanation | `Review Scrutiny Route` |
| `Inspect Queue →` | Opens global inspection queue | `Open Inspection Queue` |

### Dead or inert important buttons

- Service detail `View Queue — <service>`
- Legacy header Search/Help/Notifications/profile controls
- Footer informational links (`href="#"`)
- Several workflow evidence buttons explicitly disabled due to missing IDs; these are correctly safer than manufacturing IDs, but must be conditionally hidden or populated, not left as production-looking dead actions
- Several prototype-only action buttons mutate local component state without durable workflow state; they must remain labelled as prototype-only until backend persistence exists

---

## L. Breadcrumb Audit

### Correct patterns

- Home, My Queue, Search, Service Catalogue use understandable global hierarchy.
- M11/M12 visually express Scrutiny → Land/Plot → detail.
- M25/M26 express a Decision relationship.

### Defects

1. M09/M10/M11/M12/M14/M15/M16/M17 label `Department Home`, `Applications`, and `Application Overview`, but several items invoke the same Application Overview callback.
2. M13 maps `Department Home`, `Applications`, `Scrutiny`, and `Land / Plot` to one browser-history action.
3. M19 presents Query Builder as the parent of Query History. They should be sibling views under `Queries`.
4. Breadcrumbs omit the visible application ID in most deep workflows.
5. Decision and query breadcrumb labels frequently expose M-numbers in nearby controls.

### Required hierarchy

Use one of these patterns:

```text
MIDC Department → Applications → <Application ID> → Scrutiny → Land / Plot → Parameter
MIDC Department → Queries / Deficiencies → <Application ID> → Queries → Query History
MIDC Department → Inspection Queue → <Application ID> → <Inspection ID> → Planning
MIDC Department → Decisions → <Application ID> → Decision → Decision Record
```

Breadcrumbs should navigate hierarchy only; workflow progress belongs in the workspace content.

---

## M. Back / Close / Cancel Audit

| Area | Current behavior | Assessment | Required behavior |
|---|---|---|---|
| Application Overview Back | Always `/department/queue` | Wrong for Search/Home/Scrutiny/SLA/etc. | Return to recorded work-area origin or Applications by a stable rule |
| M12/M13/M16/M17/M18 | Uses `router.back()` in wrappers | Unstable after direct link/reload | Explicit canonical parent route |
| M09/M10/M11 etc. | `Department Home` breadcrumb often returns to Overview | Mislabelled return | Real Home link; application ancestor separate |
| M22 | Explicit app inspection list and global queue links | Good | KEEP |
| M23 | Explicit M22 and queue links | Good, but too many peer links | KEEP parent; reduce extras |
| M24 | Back to application inspections plus M23 | Mostly good | Make nearest parent M23; list as secondary |
| M25/M26 | Explicit workspace/overview links | Mostly good | Embed in Decision tab shell |
| Service detail close | Returns to catalogue preserving state | Good | KEEP |
| SLA selected detail close | Returns to SLA list preserving filters | Good | KEEP |
| Notification close/backdrop | Returns to current page | Good | KEEP |
| Provenance/event drawers | Close returns to parent state | Good | KEEP |

Unsaved-change behavior is generally not implemented for forms/workspaces. Before production, M18, M22, M25, grievance resolution, document review, and amendment intake need explicit dirty-state confirmation on Back/Close/route changes.

---

## N. Search, Queue, Notification, State, and Boundary Audits

### Search and filters

- Global header search correctly routes to Applications Search with the query string.
- Applications Search primarily finds records and opens Application Workspace: **KEEP**.
- My Queue filters remain within My Queue: **KEEP**.
- Queries incorrectly reuses Applications Search: **REPLACE**.
- Scrutiny `Advanced Search → M04` is an inert/ambiguous control and should either open Applications Search honestly or expand scrutiny filters locally.

### Queue behavior

- My Queue is a queue and opens applications: **PASS**.
- Scrutiny is a worklist but deep-launches modules: **PARTIAL**.
- Inspection Queue correctly owns planning: **PASS**.
- Decisions needs a proper application queue rather than three workflow-launch cards: **PARTIAL**.
- Service Catalogue filtered queue: **FAIL** due to dead final action.

### Notifications

- Notifications state what happened, the record, why, and an action: good.
- Query-response links reach M19 and delta links reach M20: context type is sensible, but workspace shell is missing.
- SLA/Grievance routes do not preselect the referenced application/record.
- Inspection notification naming and destination conflict.
- `Open →` is not destination-honest.

### Application states

UI fixtures use the required uppercase states, including `SUBMITTED`, `FEE_CONFIRMED`, `DOCUMENT_SCRUTINY`, `INITIAL_SCRUTINY`, `TECHNICAL_SCRUTINY`, `QUERY_RAISED`, `RESUBMITTED`, `INSPECTION_PENDING`, `INSPECTION_SCHEDULED`, and `FINAL_DECISION`. However, `src/domain/states.ts` defines a separate lowercase, coarser state model and adds `withdrawn`. This creates two canonical state systems. Resolve to the brief's canonical set, and keep operational labels such as `Awaiting Entrepreneur` and `SLA Risk` as overlays.

### Business DNA and verification

Strengths:

- Provenance, source class, previous value, version, and consumers are visible.
- `NOT_APPLICABLE` is explicitly distinguished from missing data.
- Verification states align with the required set.
- Other-department fields are distinguished.
- Historical changes are described as traceable rather than overwritten.

Required fix: bind Business DNA to the routed application; current M07 uses one fixed fixture.

### Cross-department boundaries

The implemented copy correctly describes external dependencies as view-only and explicitly states that MIDC cannot assign or approve external department teams. No active MIDC action was found that approves a Fire/MPCB service. **PASS**, subject to live validation of every Figma connection.

### AI/automation boundaries

The implemented Regulatory Assistant and scrutiny/decision copy distinguish retrieval/explanation/machine findings from officer judgment. No approval probability or AI approval action was found in active Department UI code. **PASS**. Some imported design-source Markdown contains prohibited examples, but these are documentation inputs, not rendered UI.

---

## O. User Journey Audit

| Journey | Expected path | Actual path | Problems | Severity | Fix |
|---|---|---|---|---|---|
| New Application | Home → My Queue → Workspace → tabs through Decision | Home/Queue → M06; then separate deep pages/cross-links | Workspace tabs missing; record identity can change | P0/P1 | Fix identity, then add full workspace tabs |
| Find Application | Applications → Search → Result → Workspace | Matches route structure | Rendered record can differ from selected result; Back goes Queue | P0/P2 | Bind ID; origin-aware return |
| Scrutiny | Scrutiny → Worklist → Workspace → Scrutiny → modules | Worklist → Overview or direct module | No Scrutiny tab; M18/M19 owned here | P1 | Route to tab; remove query modules |
| Query | Queries → Worklist → Workspace → Queries → M18/M19 → Delta | Queries → generic search → M18 → M19 → M20 | No query worklist; bypasses workspace; M18/M19 cycle | P1 | Build query worklist and tab |
| Inspection | Inspection Queue → M22 → M23 → M24 → app Inspections | Implemented sequence exists | Fixed IDs/content; app inspections is filtered M21, not history | P0/P1 | Bind IDs; build inspection history tab |
| Decision | Decisions → Queue → Workspace → Decision → M25–M28 | Dashboard → M25/M27/M28 | No proper queue-to-tab path; deep shortcuts | P1 | Queue rows open Decision tab; contextual sequence only |
| SLA | M30 → application/grievance | Detail drawer → app or grievance | Two-step View/Open; context not always carried | P2 | Direct named actions with selected record |
| Grievance | M31 → detail → application/evidence | Inline detail and links | Inspection evidence may open planning; app identity risk | P0/P2 | Bind record; route evidence read-only by default |
| Regulatory Change | M33 → detail/compare → validation → M34 | Implemented in-page views + M34 | Permission gates mostly visual | P3 | Enforce role/disabled semantics |
| Audit | M38 → search → record → evidence | Search/filter/event detail + app | App-level Audit tab absent; app identity risk | P0/P2 | Add app Audit tab and bind record |

### Discoverability test results

| Officer task | Result |
|---|---|
| Find an application | Discoverable, but identity integrity fails |
| Work pending applications | Discoverable in My Queue |
| Review land scrutiny | Discoverable in Scrutiny, but bypasses canonical tab |
| Send consolidated query | Discoverable only through generic search or Scrutiny deep link; ownership fails |
| See entrepreneur response | Discoverable via M19/notifications; no stable Queries tab |
| Review resubmission/delta | Discoverable via Scrutiny/notifications/M19 |
| Schedule inspection | Discoverable via Inspection Queue |
| Record observation | Discoverable through M22 → M23 → M24 |
| Make decision | Discoverable, but global deep shortcuts compete |
| Check SLA breach | Discoverable and clear |
| Handle grievance | Discoverable and clear |
| Find latest rule / explain requirement | Discoverable in M32/M33; application context binding fails |
| Check workload | Discoverable |
| Investigate bottleneck | Discoverable under Analytics/Home |
| Review regulatory change | Discoverable |
| See who changed a record | Discoverable globally; application-context tab missing |

### Page-depth assessment

- Search/My Queue/Home to Overview: acceptable 1–3 meaningful clicks.
- Scrutiny module access is artificially shallow because it bypasses the required workspace. Do not preserve this shortcut merely to reduce clicks.
- Service Catalogue cannot reach its queue at any depth: blocker for that journey.
- M18/M19 and M25–M28 have excessive lateral cross-links; the problem is not click count but loss of hierarchy.
- A clear three-step `work area → application → tab` model should replace one-click deep shortcuts.

---

## P. Recommended Clean Navigation Graph

```text
LOGIN
  → DEPARTMENT HOME

MY QUEUE
  → APPLICATION WORKSPACE

APPLICATIONS
  → SEARCH RESULTS
  → APPLICATION WORKSPACE

SERVICE CATALOGUE
  → FILTERED MY QUEUE
  → APPLICATION WORKSPACE

SCRUTINY
  → SCRUTINY WORKLIST
  → APPLICATION WORKSPACE / SCRUTINY
    → M09 → M10 → M11
      → M12 / M13 contextual detail
      → M14 / M15 / M16 / M17
      → M20 after resubmission

QUERIES / DEFICIENCIES
  → QUERY WORKLIST
  → APPLICATION WORKSPACE / QUERIES
    → M18 Query Builder
    → M19 Query / Response History
    → Entrepreneur Response → Resubmission → M20

INSPECTION QUEUE
  → M22 Planning
  → APPLICATION WORKSPACE / INSPECTIONS
    → M23 Workspace
    → M24 Observation / Re-inspection

INSPECTIONS
  → INSPECTION RECORDS / HISTORY
  → APPLICATION WORKSPACE / INSPECTIONS

DECISIONS
  → DECISION QUEUE
  → APPLICATION WORKSPACE / DECISION
    → M25 → M26
      → M27 consequence propagation
      → M28 conditions/compliance
      → M29 amendment context when applicable

SLA & ESCALATIONS → M30 → application or grievance
GRIEVANCES → M31 → application/evidence
REGULATORY ASSISTANT → M32 (+ optional application context)
REGULATORY CHANGES → M33 → M34
ANALYTICS → M35 → M36
WORKLOAD → M37
AUDIT / HISTORY → M38
NOTIFICATIONS → exact owned work area / application tab / record
```

### Canonical Application Workspace

```text
Application ID + Business ID + Project ID + MIDC Service
Business DNA Version + Application State + Current Desk + SLA
Query Version + Inspection ID + Dependency State + Decision State

Overview | Business DNA | Application | Documents | Scrutiny | Queries
Inspections | Decision | Dependencies | Timeline | Regulatory Reference | Audit
```

Deep child routes may remain addressable for reload/deep-link support, but they must render inside this shared workspace shell and inherit the same application context.

---

## Q. Figma / Prototype Cleanup Plan

Execute in this order; do not redesign the visual system.

### Phase 0 — Protect evidence

1. Export the current Figma prototype connection map and frame inventory.
2. Freeze current route/connection screenshots for comparison.
3. Add automated assertions that the visible Application ID, Business ID, child record ID, and URL identity agree.

### Phase 1 — Fix structural blocker

1. Create a single application-context loader keyed by `applicationId`.
2. Pass the loaded record to M06–M29; remove component-level fixed application IDs.
3. Validate inspection, query, decision, dependency, compliance, document, and parameter child IDs against the current application.
4. Show a safe not-found/unauthorised state instead of falling back to the sample record.

### Phase 2 — Establish the workspace owner

1. Expand the existing M06 tab shell to all 12 canonical tabs.
2. Move M07/M08 and M09–M29 route content under the shared shell.
3. Add the persistent application context header.
4. Make application routes keep `Applications` highlighted, while preserving the work-area origin in an explicit return action.

### Phase 3 — Clean global work areas

1. Replace Queries generic search with a Query Worklist.
2. Remove M18/M19 from Scrutiny definitions, maps, tests, and cards.
3. Replace global Inspections duplicate with records/history.
4. Remove M27/M28 cards from global Decisions.
5. Wire Service Catalogue to filtered My Queue.
6. Merge the legacy header utilities into the Department context bar.

### Phase 4 — Normalize connections

1. Route worklist rows to the relevant workspace tab, not a deep standalone page.
2. Convert cross-links to contextual evidence links.
3. Correct notification destinations and destination-specific labels.
4. Replace every `router.back()` business action with an explicit parent route.
5. Preserve the legitimate query/resubmission/delta and re-inspection loops.

### Phase 5 — Fix labels and breadcrumbs

1. Remove all M-numbers from user-facing primary labels.
2. Standardize `My Queue`, `Application`, `Scrutiny`, `Query / Deficiency`, `Inspection`, and `Decision` terminology.
3. Put application ID and current tab in deep-page breadcrumbs.
4. Make Back/Cancel/Close return to the nearest meaningful parent.
5. Hide or conditionally render unavailable evidence actions rather than leaving disabled production-looking buttons.

### Phase 6 — Permissions, state, and auditability

1. Unify the application-state contract.
2. Enforce Regulatory Admin permissions in logic and accessibility semantics.
3. Preserve original query deficiencies, document versions, decisions, dependency propagation, and Business DNA versions.
4. Add unsaved-change protection to mutable workflow pages.

### Phase 7 — Figma connection hygiene

For every sidebar item, card, KPI, row, button, link, badge, notification, tab, breadcrumb, modal, drawer, Back, Cancel, Close, Save, and Submit control:

1. Record `source frame → element → destination frame`.
2. Assign one of the requested action categories.
3. Remove obsolete connectors before adding new ones.
4. Confirm no hidden frame duplicates remain.
5. Confirm every deep frame renders application context and a predictable parent.

---

## R. Final Validation Checklist

### Structural identity

- [ ] URL Application ID equals visible Application ID on every M06–M29 page
- [ ] Business ID and Project ID remain stable across all tabs
- [ ] Query Version, Inspection ID, Decision ID, Dependency Node ID, document ID, and parameter ID are validated against the application
- [ ] Unknown or mismatched IDs never fall back to a different fixture record

### Ownership

- [ ] Every function has one canonical owner
- [ ] Application Workspace contains all 12 canonical tabs
- [ ] M18/M19 are absent from Scrutiny ownership
- [ ] M21 belongs only to Inspection Queue
- [ ] Inspections owns execution/history
- [ ] M27/M28 are not global workflows
- [ ] Global Audit and application Audit are clearly related, not duplicates

### Navigation

- [ ] My Queue, Search, Service Catalogue, Scrutiny, Queries, Inspections, and Decisions converge on Application Workspace
- [ ] Service Catalogue reaches a filtered queue
- [ ] Queries opens a Query Worklist
- [ ] Inspections is not a duplicate of Inspection Queue
- [ ] Notifications name and open the exact destination
- [ ] No primary action depends on an M-number
- [ ] No important control is inert or `href="#"`

### Hierarchy and returns

- [ ] Breadcrumb labels match their destinations
- [ ] Application ID and workspace tab appear in deep-page breadcrumbs
- [ ] No business hierarchy relies on `router.back()`
- [ ] Back/Cancel/Close preserve application and parent context
- [ ] Unsaved changes are protected

### State and boundaries

- [ ] Only the canonical uppercase application states are used
- [ ] Operational labels remain overlays
- [ ] `NOT_APPLICABLE` is not treated as missing
- [ ] Verification/provenance states remain visible
- [ ] MIDC cannot act for external departments
- [ ] AI retrieves/explains/compares/flags but does not approve, reject, or invent rules
- [ ] Regulatory changes preserve versions and transition/effective-date logic

### Journey tests

- [ ] Find application
- [ ] Work from My Queue
- [ ] Perform scrutiny
- [ ] Raise consolidated query
- [ ] Review entrepreneur response
- [ ] Review resubmission and delta
- [ ] Schedule and execute inspection
- [ ] Record observation/re-inspection
- [ ] Make and record decision
- [ ] Propagate decision dependencies and conditions
- [ ] Check SLA and escalate
- [ ] Handle grievance with existing application data
- [ ] Open regulatory guidance with application context
- [ ] Analyze operations and bottlenecks
- [ ] Review regulatory change and impact
- [ ] Review workload
- [ ] Review global and application audit history

---

## S. Acceptance Decision

The current implementation **does not meet the master audit acceptance criteria**.

The first release-blocking correction is application identity integrity (F-01). After that, the highest-value architectural change is to make the existing Application Overview route the true 12-tab Application Workspace and route every application-specific workflow through it. Only then should connection cleanup, labels, breadcrumbs, and click depth be finalized.

The visual design system, Business DNA provenance model, audit/history principles, external-department boundaries, regulatory-assistant boundary, and legitimate query/resubmission/delta loop should be preserved during remediation.

