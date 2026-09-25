# Entrepreneur Screen Connection Matrix

## Prompt 7 / Phase H control audit (current state)

The user authorized a new canonical internal demo business ID for Sahyadri Bio-Pharma Pvt Ltd: **`BP-004`** (confirmed unused). It is added to the canonical identity catalog (`src/features/entrepreneur/identity/catalog.ts`) and business portfolio (`SAMPLE_PROJECTS`), with visible “Internal demo” labeling. It has explicit prototype provenance and is never presented as a PAN, CIN, approval number, or government/backend ID. `BP-001`’s applications and grievances remain attached to `BP-001`; `BP-002` and `BP-003` were not changed.

The deep-screen fixture identities are now bound to `BP-004`:
- Compliance obligations: `CPL-001`–`CPL-006` are bound to `BP-004`.
- Incentive schemes: `PSI-2019`, `MSME-CLSS`, `MAITRI-FAST`, `PLI-PHARMA` are bound to `BP-004`.
- Incentive claims: `CLM-2027-001`, `CLM-2027-002`, `CLM-2026-001` are explicitly bound to parent scheme `PSI-2019` and business `BP-004`.
- Documents: `DOC-001`–`DOC-008`, `DOC-INC-001`–`DOC-INC-003` are bound to `BP-004`.
- Requirements: `LAND-001`, `EST-001`, `CON-001`, `CON-002`, `UTIL-001`–`UTIL-004`, `PREOP-001`–`PREOP-004`, `COMPLY-001` are bound to `BP-004`.
- Applications: `APP-2026-MPCB-00412`, `APP-2026-MIDC-00187`, `APP-2026-FIRE-00093`, `APP-2026-DISH-00241`, plus child queries (`QRY-001`), resubmissions (`APP-2026-MPCB-00412-R2`), decisions (`DEC-2026-MPCB-00412`), and approvals (`CTE-2026-MPCB-41872`).
- Inspections: `INS-001`, `INS-002` are bound to `BP-004`.
- Regulatory changes: `RC-2026-001`–`RC-2026-004` are bound to `BP-004`.

| Screen/control | Current behavior or availability | Required source relationship |
|---|---|---|
| E24 obligation row and calendar entry; E26 scheme row and View Details | Typed detail routes with clicked record ID. Lists use canonical obligation/scheme arrays filtered by exact `BP-004` business binding. Active for `BP-004`; returns 404 for `BP-001`–`BP-003`. | Canonical `BP-004` binding. |
| E24 CTE source reference; E25 approval ID, View Source Approval, Source Approval | For `CPL-001`, resolves to bound approval `CTE-2026-MPCB-41872` and its decision `DEC-2026-MPCB-00412`. For `CPL-005` and `CPL-006`, references are application IDs (`APP-2026-FIRE-00093`, `APP-2026-DISH-00241`) without a decision chain, so controls remain disabled with a visible explanation. | Exact business, application, and decision relationship in source data. |
| E25 Submit Return / Evidence and Start Renewal Application | Disabled with a visible explanation. No submission or renewal workflow is connected to these obligations. | Genuine obligation-specific workflow. |
| E24/E25 Document Centre and E25 required-document links | Document Centre links open `/documents` for `BP-004`. Exact document links resolve only when bound to the same business. | Exact business/document binding. |
| E27 View Application / Claims; E28 tabs, claim Detail, assistant, and Preview New Claim | E27 action opens `/incentive-claims?schemeId=PSI-2019` for `BP-004`. E28 shows Periodic Claims tab with bound claims `CLM-2027-001`, `CLM-2027-002`, `CLM-2026-001`. Claim Detail opens selected claim panel. Preview stays in modal without mutations. | Canonical business, scheme, and claim bindings. |
| E27 Use Existing Document; E28 Add from E11 and Upload Evidence | Disabled with explanation. Destination has no claim evidence selection/upload action. | Implemented claim-specific evidence workflow. |
| E28 Respond to Query, Submit Correction, Query / Correction, Delta Resubmission | Disabled with explanation. Claims have no documented application/query/resubmission child relationship. | Exact business, application, and child IDs tied to claim. |
| E28 View Claim, View Sanction, View Disbursement Document, claim evidence View in E11 | Disabled with explanation; claim IDs are never passed as document IDs, and evidence labels are not used to guess IDs. Selected claim remains inspectable in local detail panel. | Exact claim/document relationship and business binding. |
| E28 View Certificate and Document Centre | Certificate uses explicit `DOC-INC-001` bound to `BP-004`. Document actions open `/documents/DOC-INC-001`. | Exact business/document binding. |

All deep routes return 404 for `BP-001`, `BP-002`, and `BP-003`. Unbound sidebar and overview controls for those businesses remain disabled.

This document records the route contract and the source identities that may enter it. Phases C–G extracted public/auth, portfolio, Business DNA, dossier, journey, documents, applications, inspections, and decisions. Phase H extracted compliance and incentives. Phase I extracted changes and support. Phase J finalized the business overview. Phase K removed the old `[screen]` page and page-state router.

## Identity binding after Prompt 7 authorization

The user authorized `BP-004` as the canonical internal demo business ID for Sahyadri Bio-Pharma Pvt Ltd. All deep records (dossier, requirements, documents, applications, queries, resubmissions, inspections, decisions, approvals, compliance obligations, incentive schemes/claims, regulatory changes) are strictly bound to `BP-004`.
- `BP-001` retains its own three command-centre applications (`APP-MPCB-2026-4892`, `APP-FAC-2026-3371`, `APP-MIDC-2026-1190`) and three grievances (`GRV-2026-0014`, `GRV-2026-0009`, `GRV-2026-0003`).
- `BP-002` and `BP-003` retain their original portfolio records with no unbound deep records.
- Canonical detail routes for `BP-001`, `BP-002`, and `BP-003` return `notFound()` for deep records bound to `BP-004`.
- Authenticated sidebar navigation dynamically enables items based on verified business records: for `BP-004`, Journey, Applications, Documents, Compliance, Inspections, Incentives, and Changes & Expansion are enabled; Grievances remains disabled (since grievances belong only to `BP-001`).
- The business switcher safely resets destination to the target business overview (`/entrepreneur/businesses/[targetId]`) when switching from a deep route that does not exist in the target business (e.g. compliance, incentives, documents, inspections).

## Canonical business catalog

The portfolio records in `SAMPLE_PROJECTS` are the canonical Entrepreneur business identities. The matching source-backed identity catalog is `src/features/entrepreneur/identity/catalog.ts`; Phase D's portfolio details live in `src/features/entrepreneur/businesses/catalog.ts` and keep the BP IDs attached to their original summary data.

| Canonical ID | Canonical name | Industry | Location | Source result |
|---|---|---|---|---|
| `BP-001` | ABC Pharma Pvt Ltd | Pharmaceutical Manufacturing | Thane, Maharashtra | Canonical portfolio business |
| `BP-002` | Konkan Feeds | Cattle Feed Manufacturing | Ratnagiri, Maharashtra | Canonical portfolio business |
| `BP-003` | Sahyadri Electronics Pvt Ltd | Electronics Manufacturing | Pune, Maharashtra | Canonical portfolio business |
| `BP-004` | Sahyadri Bio-Pharma Pvt Ltd | Pharmaceutical Manufacturing | Chakan, Pune, Maharashtra | Canonical internal demo business (Internal demo label) |

### Compatibility identity table

| Source identity | Source name/data | Canonical result | Evidence |
|---|---|---|---|
| `abc-pharma` | ABC Pharma Pvt Ltd; Pharma Mfg; Thane | `BP-001` | Exact legal name, same industry, same location |
| `konkan-feeds` | Konkan Feeds Ltd; Agro Processing; Ratnagiri | `BP-002` | Same distinctive name after legal-suffix normalization, aligned feed/agro activity, same location |
| `pune-auto` | Pune Auto Components; Auto Ancillary; Pune | Unmapped | No BP record has the same name or industry; location alone is not sufficient |
| Deep-screen fixture | Sahyadri Bio-Pharma Pvt Ltd; Pharmaceutical Manufacturing; Chakan, Pune; Plot C-14/2 | `BP-004` | Authorized canonical internal demo business ID with prototype provenance |

## Canonical entity identity table

| Entity | Canonical IDs in current source | Business binding | Route use |
|---|---|---|---|
| Business | `BP-001`, `BP-002`, `BP-003`, `BP-004` | Self | Canonical business route param |
| Requirement | `LAND-001`, `EST-001`, `CON-001`, `CON-002`, `UTIL-001`–`UTIL-004`, `PREOP-001`–`PREOP-004`, `COMPLY-001` | `BP-004` | Requirement route under `BP-004` |
| Document | `DOC-001`–`DOC-008`, `DOC-INC-001`–`DOC-INC-003` | `BP-004` | Document route under `BP-004` |
| Deep application | `APP-2026-MPCB-00412`, `APP-2026-MIDC-00187`, `APP-2026-FIRE-00093`, `APP-2026-DISH-00241` | `BP-004` | Official displayed IDs are route identities; internal keys such as `app-mpcb-cte` are not |
| Unsubmitted boiler application | None (`appId` is `—`) | `BP-004` | Parent applications page only; no child route may be manufactured |
| BP-001 command-centre application | `APP-MPCB-2026-4892`, `APP-FAC-2026-3371`, `APP-MIDC-2026-1190` | `BP-001` | Exact IDs may be used; they are not aliases of the `APP-2026-*` records |
| Query | `QRY-001` | `BP-004`; parent `APP-2026-MPCB-00412` | Real child route ID |
| Deficiency | `DEF-001`–`DEF-003` | `BP-004`; parent `QRY-001` | Local query workflow identity; no separate route in approved tree |
| Resubmission | `APP-2026-MPCB-00412-R2` | `BP-004`; parent `APP-2026-MPCB-00412` | Real child route ID |
| Inspection | `INS-001`, `INS-002` | `BP-004` | Business-level route because `INS-001` coordinates three applications |
| Observation | `OBS-001`, `OBS-002` | `BP-004`; parent `INS-002` | Local inspection workflow identity |
| Decision | `DEC-2026-MPCB-00412` | `BP-004`; parent `APP-2026-MPCB-00412` | Real child route ID |
| Approval/certificate | `CTE-2026-MPCB-41872`, `CERT-CTE-2026-41872` | `BP-004`; parent decision above | Displayed record identities; decision remains approved route owner |
| Compliance | `CPL-001`–`CPL-006` | `BP-004` | Compliance detail route under `BP-004` |
| Incentive | `PSI-2019`, `MSME-CLSS`, `MAITRI-FAST`, `PLI-PHARMA` | `BP-004` | Incentive detail route under `BP-004` |
| Incentive claim | `CLM-2027-001`, `CLM-2027-002`, `CLM-2026-001` | `BP-004`; parent `PSI-2019` | Local rows under claims page; no detail route currently required |
| Regulatory change | `RC-2026-001`–`RC-2026-004` | `BP-004` | Local selection on regulatory-changes page under `BP-004` |
| Grievance | `GRV-2026-0014`, `GRV-2026-0009`, `GRV-2026-0003` | `BP-001` command-centre data | Local list/detail workflow on BP-001 grievance page |
| Notification | `N-001`–`N-008` | User-global; `N-001`–`N-004` and `N-006` carry related application IDs, while `N-008` carries exact BP-001 grievance ID `GRV-2026-0003` | `/entrepreneur/notifications`; only N-001, N-006, and N-008 have verified destinations; other CTAs disabled |

The source has no stable `userId`, `projectId`, `documentVersionId`, or regulatory `ruleVersionId`. Document version numbers and internal list keys are not route identities. `src/domain/ids.ts` remains unchanged; the identity catalog uses the already shared `BusinessId`, while Entrepreneur-only identity categories stay inside the feature.

### Known source identity conflicts

These conflicts are documented and guarded instead of normalized by assumption:

- `DOC-003` is canonically “MPCB Consent to Establish Certificate” in Document Centre and decision record. `INS-001` reuses `DOC-003` with the label “Factory Layout / Site Plan.” The inspection document guard (`findInspectionDocumentForBusiness`) checks both ID and title; since they mismatch, the link remains disabled with a visible reason.
- `DOC-007` is canonically “Fire Safety Compliance / NOC Certificate”. `INS-001` reuses `DOC-007` with the label “Approved Architectural Drawings.” Guarded and disabled due to title mismatch.
- `CPL-001` is canonically “ETP Commissioning Report.” The affected-record list under `RC-2026-003` reuses it as an `approval` labeled “PSI 2019 Eligibility Certificate EC-PSI-2026-01248.” This conflicting reference is disabled in `ChangeScreens.tsx`.
- `CPL-005` & `CPL-006` contain application references (`APP-2026-FIRE-00093`, `APP-2026-DISH-00241`) rather than approval/decision IDs; their source approval controls remain disabled.
- `APP-2026-MPCB-00412` and `APP-MPCB-2026-4892` are separate source records. Similar service labels do not make them aliases.
- The legacy internal keys `app-mpcb-cte`, `app-midc-bp`, `app-fire-noc`, `app-dish-factory`, and `app-boiler-reg` are UI selection keys. Only official displayed application IDs are canonical; the boiler row has no application ID.nonical; the boiler row has no application ID yet.

## Final route families

All dynamic segments are built by `ENTREPRENEUR_ROUTES` in `src/lib/routes/entrepreneur.ts`. Builders accept raw IDs, reject empty/reserved placeholders, and encode each segment once.

| Area | Canonical routes |
|---|---|
| Auth | `/entrepreneur/login`, `/entrepreneur/register`, `/entrepreneur/register/details`, `/entrepreneur/register/success` |
| Portfolio/onboarding | `/entrepreneur/businesses`, `/entrepreneur/businesses/new`, `/entrepreneur/businesses/new/basic-requirements`, `/entrepreneur/businesses/new/discovery`, `/entrepreneur/businesses/new/discovery/scale`, `/entrepreneur/businesses/new/discovery/environment-safety`, `/entrepreneur/businesses/new/review` |
| Business | `/entrepreneur/businesses/[businessId]`, `/profile`, `/dossier`, `/dossier/provenance`, `/journey`, `/dependencies` |
| Requirements/documents | `/requirements/[requirementId]`, `/documents`, `/documents/[documentId]` under a business |
| Applications | `/applications`, `/applications/new`, `/applications/new/prevalidation`, `/applications/new/consistency`, `/applications/new/submission`, `/applications/[applicationId]` under a business |
| Application children | `/applications/[applicationId]/queries/[queryId]`, `/resubmissions/[resubmissionId]`, `/decisions/[decisionId]` under a business |
| Inspections | `/inspections`, `/inspections/[inspectionId]` under a business |
| Compliance/incentives | `/compliance`, `/compliance/[complianceId]`, `/incentives`, `/incentives/[incentiveId]`, `/incentive-claims` under a business |
| Change/support | `/regulatory-changes`, `/changes`, `/changes/amendments`, `/grievances` under a business |
| User-global | `/entrepreneur/notifications`, `/entrepreneur/assistant` |

## Screen connection matrix

### Runtime access by screen family

| Screens | Route state | Business and record rule |
|---|---|---|
| E00–E06 | Available | Portfolio, BP overview, and one tab-scoped Business DNA draft |
| E07–E13 | Available for BP-004 | Sahyadri dossier, requirements, documents, and dependency data bound to BP-004; returns 404 for BP-001–BP-003 |
| E14–E17 | Available for BP-004 | Sahyadri application intake bound to BP-004; returns 404 for BP-001–BP-003 |
| E18–E19 | Available for bound records | BP-001 has three exact application IDs; BP-004 has four exact deep application IDs; BP-002/BP-003 have no bound applications |
| E20–E23 | Available for BP-004 | Sahyadri query, resubmission, inspection, and decision IDs bound to BP-004; returns 404 under BP-001–BP-003 |
| E24–E28 | Available for BP-004 | Sahyadri compliance, incentive, and claim data bound to BP-004; returns 404 under BP-001–BP-003 |
| E29–E31 | Available for BP-004 | Sahyadri regulatory-change and amendment data bound to BP-004; returns 404 under BP-001–BP-003 |
| E32 | Available for BP-001 | Three grievances refer to its three bound applications; disabled for BP-002–BP-004 |
| E33–E34 | Available globally | Notifications use exact bound destinations when known; assistant is local demo conversation |

`Verified` means the source control and identity contract were inspected. Runtime access is governed by the table above.

| Context | Entry from | Visible control | Type | Destination/behavior | Required IDs | Current implementation | Target implementation | Verified |
|---|---|---|---|---|---|---|---|---|
| Landing | Direct `/` | Government Login | Navigation | Department login | None | App Router navigation | `/department/login` — Phase C implemented | Yes |
| Landing | Direct `/` | Industrial Login | Navigation | Entrepreneur login | None | App Router navigation | `/entrepreneur/login` — Phase C implemented | Yes |
| Login/registration | Landing, header login, previous auth step, direct canonical URL | Login, Sign up, OTP, registration submit | Prototype Workflow | Advance through auth demo | None | Canonical App Router routes; verified email in tab session; old signup slugs removed | `/entrepreneur/login`, `/register`, `/register/details`, `/register/success` — Phase C implemented with details guard | Yes |
| My Businesses | Successful login or direct authenticated URL | Business card/action | Navigation | Open exact business | `businessId` | Portfolio card routes with its BP ID | `/entrepreneur/businesses/[businessId]` via `business(businessId)`; exact bound overview | Yes |
| My Businesses | Successful login or direct authenticated URL | Create Business / Project | Navigation | Start onboarding | None before creation | Phase E card action enters `/entrepreneur/businesses/new` | `newBusiness()`; no fake business ID | Yes |
| Business switcher | Authenticated shell | Select business | Navigation | Switch exact business context | `businessId` | Shell lists BP records and preserves valid target list/detail context through typed builders; safely resets to overview if route is unsupported in target | Keep exact BP identity; never first-record fallback | Yes |
| Business overview | Portfolio card, switcher, direct URL | Portfolio summary | Content | Show exact business name, stage, applications, and actions | `businessId` | E00 derives bound application, compliance, inspection, and grievance content for matching BP ID; invalid IDs return 404 | Dynamic links for bound records; disabled with visible explanation for unbound | Yes |
| Create business E03–E06 | Portfolio or previous onboarding step | Continue/Back/Review controls | Prototype Workflow | Advance one shared Business DNA draft and local review confirmation | No `businessId` before creation; `existingBusinessId` is a reference only for expansion/modification | Phase E canonical `/businesses/new/**` pages, one tab-scoped draft provider, source adaptive/validation/warning behavior | No fake business ID; unresolved post-confirmation Dossier/Journey actions disabled until a real binding exists | Yes |
| E00 Command Centre | Portfolio card, business switcher, sidebar | Application row/action | Navigation | Open exact application or its query | `BP-001`, `BP-004`, `applicationId`, optional genuine child ID | Exact business-filtered application records | Exact application builder; unbound child actions disabled | Yes |
| E00 Command Centre | Portfolio card, business switcher, sidebar | Compliance, grievance, inspection, regulatory-change actions | Navigation | Open business feature | `BP-001`, `BP-004`; child ID where a detail route exists | Enabled for bound features per business; disabled where no records exist | Typed business route builders | Yes |
| E07 Dossier | Overview link, direct URL, breadcrumb | Journey, provenance actions | Navigation | Open Master Project Dossier | `businessId` | Active for `BP-004` via `dossier('BP-004')`; returns 404 for `BP-001`–`BP-003` | Bound to `BP-004`; 404 for other BP businesses | Yes |
| E08 Provenance | Dossier field action | Field inspection | Local UI / Navigation | Inspect exact field provenance | `businessId`, optional `field` | Active for `BP-004` via `provenance('BP-004')`; reads `field` param; returns 404 for `BP-001`–`BP-003` | Bound to `BP-004`; 404 for other BP businesses | Yes |
| E09 Journey | Sidebar, overview quick link, dossier | Requirement row/detail action | Navigation | Open exact requirement or journey | `businessId`, `requirementId` | Active for `BP-004` via `journey('BP-004')`; active sidebar nav in Approval Journey; returns 404 for `BP-001`–`BP-003` | Bound to `BP-004`; 404 for other BP businesses | Yes |
| E09 Journey | Journey page | Filters/stage display | Local UI | Filter or alter display | None | Component state | Keep local UI state | Yes |
| E10 Requirement Detail | Journey requirement row, dependency graph, document used-by | Start/continue application | Navigation | Application intake | `businessId`; application ID only after one exists | Active for `BP-004` via `requirement('BP-004', requirementId)`; returns 404 for `BP-001`–`BP-003` | Bound to `BP-004`; 404 for other BP businesses | Yes |
| E10 Requirement Detail | Requirement detail page | Documents/dependencies/journey actions | Navigation | Related feature page | `businessId`, optional real document ID | Typed `documents(businessId)`, `dependencies(businessId)`, `journey(businessId)` | Typed document/dependency/journey route; no fallback | Yes |
| E11 Document Centre | Sidebar (Approval Journey), dashboard, related-record action | Document row / View / Help | Navigation | Exact document detail | `businessId`, `documentId` | Active for `BP-004` via `documents('BP-004')`; active sidebar nav; returns 404 for `BP-001`–`BP-003` | Bound to `BP-004`; 404 for other BP businesses | Yes |
| E11 Document Centre | Document Centre | Search/filter/category controls | Local UI | Filter documents | None | Component state | Keep local UI state | Yes |
| E12 Document Detail | Document row in E11 | Version/metadata panels, RAG assistant | Local UI | Inspect current document | `documentId` | Active for `BP-004` via `document('BP-004', documentId)`; returns 404 for `BP-001`–`BP-003` | Exact resolved record under `BP-004`; 404 for other BP businesses | Yes |
| E12 Document Detail | Document detail page | Used-by requirement links, journey, dependencies | Navigation | Exact related requirement or graph | `businessId`, `requirementId` | Typed `requirement(businessId, reqId)`, `journey(businessId)`, `dependencies(businessId)` | Unbound requirement and journey routes return 404 | Yes |
| E13 Dependency | Sidebar, overview link, journey, requirement detail, document detail | Node selection/graph controls, CTE simulation | Local UI | Inspect dependency graph | None | Active for `BP-004` via `dependencies('BP-004')`; returns 404 for `BP-001`–`BP-003` | Interactive DAG with stage lanes and dependency tooltips | Yes |
| E13 Dependency | Selected dependency node | Open requirement | Navigation | Exact related requirement record | `businessId`, `requirementId` | Typed builder `requirement(businessId, req.id)` | Exact requirement route under `BP-004`; returns 404 for other BP businesses | Yes |
| E14 Application Workspace | Requirement detail (E10), sidebar | Fill sections, check docs, RAG assistant, review | Prototype Workflow / Navigation | Intake sections, advance to pre-validation | `businessId`; optional `reqId` | Active for `BP-004` via `newApplication('BP-004')`; returns 404 for `BP-001`–`BP-003` | Bound to `BP-004`; returns 404 for other BP businesses | Yes |
| E15 Pre-validation | Workspace review or continue action | Issue inspection, resolve action | Prototype Workflow / Navigation | Pre-validation check, advance to consistency | `businessId` | Active for `BP-004` via `applicationPrevalidation('BP-004')`; returns 404 for `BP-001`–`BP-003` | Bound to `BP-004`; returns 404 for other BP businesses | Yes |
| E16 Cross-form Consistency | Pre-validation continue action | Comparison inspection, exception confirm | Prototype Workflow / Navigation | Consistency check, advance to submission | `businessId` | Active for `BP-004` via `applicationConsistency('BP-004')`; returns 404 for `BP-001`–`BP-003` | Bound to `BP-004`; returns 404 for other BP businesses | Yes |
| E17 Payment / Submission | Consistency continue action | Fee payment, e-Challan confirm, submit | Prototype Workflow / Navigation | Pay fee, submit application, view confirmation | `businessId` | Active for `BP-004` via `applicationSubmission('BP-004')`; returns 404 for `BP-001`–`BP-003` | Bound to `BP-004`; returns 404 for other BP businesses | Yes |
| E18 Tracker | Sidebar (Approval Journey), dashboard, submission confirm | Application row/action | Navigation | Exact application detail | `businessId`, official displayed `appId` | Active for `BP-001` (3 apps) and `BP-004` (4 apps); returns empty for `BP-002`/`BP-003` | Official IDs link to exact detail; unsubmitted row stays unavailable | Yes |
| E18 Tracker | Tracker page | Department/status/action filters | Local UI | Filter tracker | None | Component state | Keep local UI state | Yes |
| E19 Application Detail | Tracker or contextual application action | Query, decision, inspection actions | Navigation | Exact child record | `businessId`, `applicationId` | Active for bound applications under `BP-001` and `BP-004`; invalid IDs return 404 | Exact application detail; invalid ID returns 404 (no first-record fallback) | Yes |
| E20 Query | Exact application/query action | Deficiency response inputs and resolve toggles | Prototype Workflow | Prepare response, toggle resolved | `businessId`, `applicationId`, `queryId` | Active for `QRY-001` under `APP-2026-MPCB-00412` for `BP-004`; returns 404 for `BP-001`–`BP-003` | Bound to `BP-004`; child returns 404 for other BP businesses | Yes |
| E20 Query | Exact application/query action | Continue to resubmission | Navigation | Exact resubmission | `businessId`, `applicationId`, `resubmissionId` | Active for `APP-2026-MPCB-00412-R2` under `BP-004` | Typed resubmission route; no fallback | Yes |
| E21 Delta Resubmission | Query response | Submit | Prototype Workflow | Submit demo resubmission | `businessId`, `applicationId`, `resubmissionId` | Active for `APP-2026-MPCB-00412-R2` under `BP-004`; returns 404 for `BP-001`–`BP-003` | Bound to `BP-004`; child returns 404 for other BP businesses | Yes |
| E22 Inspection Centre | Sidebar, dashboard, application detail | Inspection row | Navigation | Exact inspection | `businessId`, `inspectionId` | Active for `INS-001` and `INS-002` under `BP-004`; returns 404 for `BP-001`–`BP-003` | Bound to `BP-004`; conflicting DOC-003/DOC-007 document links disabled | Yes |
| E22 Inspection Centre | Exact inspection | Checklist/observation response | Prototype Workflow | Update selected inspection demo | `inspectionId`, optional `observationId` | Component state | Keep within exact inspection page | Yes |
| E23 Decision | Exact application/decision action | Document, inspection, compliance links | Navigation | Related exact record/page | `businessId`, `applicationId`, `decisionId` | Active for `DEC-2026-MPCB-00412` under `BP-004`; returns 404 for `BP-001`–`BP-003` | Bound to `BP-004`; child returns 404 for other BP businesses | Yes |
| E24 Compliance | Sidebar, dashboard, decision | Obligation row | Navigation | Exact obligation | `businessId`, `complianceId` | Active for `BP-004` via `compliance('BP-004')`; returns 404 for `BP-001`–`BP-003` | Bound to `BP-004`; 404 for other BP businesses | Yes |
| E24 Compliance | Compliance page | List/calendar/filter controls | Local UI | Change display | None | Component state | Keep local UI state | Yes |
| E25 Compliance Detail | Compliance obligation row | Submit evidence | Prototype Workflow | Update obligation demo | `complianceId` | Active for `CPL-001`–`CPL-006` under `BP-004`; returns 404 for `BP-001`–`BP-003`. CPL-005/006 source approval links disabled due to application references. | Exact resolved record under `BP-004`; invalid ID is not found | Yes |
| E26 Incentives | Sidebar or dashboard | Scheme row | Navigation | Exact scheme | `businessId`, `incentiveId` | Active for `BP-004` via `incentives('BP-004')`; returns 404 for `BP-001`–`BP-003` | Bound to `BP-004`; 404 for other BP businesses | Yes |
| E26 Incentives | Incentives page | Eligibility filters | Local UI | Filter schemes | None | Component state | Keep local UI state | Yes |
| E27 Incentive Detail | Incentive scheme row | View claims | Navigation | Claims list | `businessId` | Active for `PSI-2019`, `MSME-CLSS`, `MAITRI-FAST`, `PLI-PHARMA` under `BP-004`; returns 404 for `BP-001`–`BP-003` | `incentiveClaims(businessId)`; opens bound claims for PSI-2019 | Yes |
| E28 Incentive Claims | Incentive detail or sidebar | Claim row/status actions | Local UI / Prototype Workflow | Inspect or advance claim demo | `claimId` | Active for `PSI-2019` under `BP-004`; periodic claims show CLM-2027-001, CLM-2027-002, CLM-2026-001; unsupported query/resubmission/upload actions disabled | Keep local until product requires a claim detail route | Yes |
| E29 Regulatory Changes | Sidebar, dashboard, notification | Change row expand/collapse, filter tabs | Local UI / Navigation | Inspect selected regulatory change, impacts, and affected rules | `businessId` (route param). No search params. | Active for `BP-004` via `regulatoryChanges('BP-004')`; returns 404 for `BP-001`–`BP-003`. Conflicting `CPL-001` reference under `RC-2026-003` disabled with visible tooltip reason. | Local UI state: `expandedId`, filter tabs. Direct URLs and refresh verified. | Yes |
| E30 Business Change Simulator | Regulatory change action, sidebar | Select change type, proposed value, run impact assessment, proceed to amendments | Prototype Workflow / Navigation | Simulate proposed change impact against Business DNA without modifying records | `businessId` (route param). No search params. Proposed values held in session state, not in URL. | Active for `BP-004` via `changes('BP-004')`; returns 404 for `BP-001`–`BP-003`. | Local state: `selectedChange`, `proposedValue`, `analysed`, `results`. Cross-page state: `sessionStorage.getItem('entrepreneur_change_draft_${businessId}_v1')`. "Proceed to Amendments / New Requirements" transfers state to E31. | Yes |
| E31 Amendments / New Requirements | Simulator action, direct URL | Review delta, expand impact item, back to simulator | Prototype Workflow / Navigation | Review actionable regulatory delta generated from simulated change | `businessId` (route param). No search params. | Active for `BP-004` via `amendments('BP-004')`; returns 404 for `BP-001`–`BP-003`. Empty draft guard redirects back to simulator if visited without prior simulation. | Local state: `expandedId`. Cross-page state: tab draft preserved across refresh. "Back to Simulator" navigates to E30. "Back to Dashboard" navigates to overview. | Yes |
| E32 Grievances | Sidebar, dashboard, notification | List grievances, select detail, raise grievance, submit demo grievance | Local UI / Prototype Workflow | Track and raise grievances against departments/applications | `businessId` (route param). Search params: `?grievanceId=[id]` (selects exact detail; invalid ID stays on list without selecting first record), `?applicationId=[id]&raise=1` (preselects app in new form; invalid app ID leaves dropdown unselected). | Active for `BP-001` (3 bound grievances); disabled in sidebar for `BP-002`–`BP-004` ("No grievances for this business"). | Submitting grievance creates trackable local demo record (`GRV-2026-0015`), displays confirmation banner with demo disclaimer, and displays record in list. No backend persistence implied. | Yes |
| E33 Notifications | Authenticated header bell | Filter by category, click notification CTA | Navigation | View notifications and navigate to bound record context | User-global (`/entrepreneur/notifications`). No search params. | Bound CTAs navigate via typed route builders: N-001 to `/grievances?applicationId=APP-MPCB-2026-4892&raise=1`, N-006 to `/applications/APP-MIDC-2026-1190`, N-008 to `/grievances?grievanceId=GRV-2026-0003`. | Unsupported CTAs (N-002, N-003, N-007) visibly disabled with tooltip explaining reason. N-006 text mentions Chakan plot but links to Thane app; relationship preserved per product confirmation. Never mutates active business or exposes cross-business records. | Yes |
| E34 Regulatory Assistant | Header, sidebar, floating button | Suggested prompt chips, send query | Local UI | Contextual and general regulatory assistant dialog | User-global (`/entrepreneur/assistant`). Contextual assistant retains record parameters when launched from record pages. | Conversational UI remains local. Does not alter active business or expose unrelated records. | Component state. | Yes |
| Footer prototype links | Footer on public/auth pages | Informational links | Disabled / Permission-gated | No implemented destination | None | Noninteractive text or implemented route | No active placeholder link | Yes |

## Invalid identity behavior

- Route parameters are accepted only when the canonical catalog contains the exact ID.
- Legacy aliases and E-screen slugs are removed and are not accepted as canonical URL values.
- Empty values, `.`, `..`, `default`, `sample`, `temp`, and `current` are rejected by route builders.
- `findBusinessEntity` requires both the exact entity ID and its exact canonical business binding.
- Application-child resolution also requires the exact parent application ID recorded for a query, resubmission, or decision.
- Missing, mismatched, or unresolved identities return no record; App Router boundaries call `notFound()` through `requireBusinessRouteParam` or `requireBusinessEntityRouteParam`.
- No lookup substitutes the first catalog record.
