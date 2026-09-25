# Entrepreneur Migration Final Acceptance Audit

**Document version**: 2.0 (Post-Prompt 11 Final Acceptance Gate)  
**Portal context**: EKATMA Entrepreneur Portal (`/entrepreneur/**`)  
**Scope**: Migration from embedded legacy SPA/`[screen]` router to Next.js App Router  
**Department files touched**: None (`0` files modified in Department domain)

---

## 1. Canonical Identity Catalog & Entity Bindings

All business identities and records strictly adhere to the single source of truth in `src/features/entrepreneur/identity/catalog.ts` and `src/features/entrepreneur/businesses/catalog.ts`.

### Canonical Businesses

| Canonical ID | Legal Business Name | Industry | Location | Identity Status & Provenance |
|---|---|---|---|---|
| `BP-001` | ABC Pharma Pvt Ltd | Pharmaceutical Manufacturing | Thane, Maharashtra | Canonical portfolio business |
| `BP-002` | Konkan Feeds | Cattle Feed Manufacturing | Ratnagiri, Maharashtra | Canonical portfolio business |
| `BP-003` | Sahyadri Electronics Pvt Ltd | Electronics Manufacturing | Pune, Maharashtra | Canonical portfolio business |
| `BP-004` | Sahyadri Bio-Pharma Pvt Ltd | Pharmaceutical Manufacturing | Chakan, Pune, Maharashtra | Canonical internal demo business key (clearly labeled "Internal demo") |

> [!NOTE]
> `BP-004` is strictly an INTERNAL DEMO / prototype business key. It is not presented as a PAN, CIN, approval number, or government or backend ID.

### Entity Bindings by Business

| Entity Family | `BP-001` (ABC Pharma) | `BP-002` (Konkan Feeds) | `BP-003` (Sahyadri Electronics) | `BP-004` (Sahyadri Bio-Pharma) |
|---|---|---|---|---|
| **Applications** | `APP-MPCB-2026-4892`, `APP-FAC-2026-3371`, `APP-MIDC-2026-1190` | None | None | `APP-2026-MPCB-00412`, `APP-2026-MIDC-00187`, `APP-2026-FIRE-00093`, `APP-2026-DISH-00241` |
| **Child Queries** | None | None | None | `QRY-001` (parent: `APP-2026-MPCB-00412`) |
| **Child Resubmissions** | None | None | None | `APP-2026-MPCB-00412-R2` (parent: `APP-2026-MPCB-00412`) |
| **Child Decisions** | None | None | None | `DEC-2026-MPCB-00412` (parent: `APP-2026-MPCB-00412`) |
| **Child Approvals** | None | None | None | `CTE-2026-MPCB-41872` (parent: `APP-2026-MPCB-00412`) |
| **Inspections** | None | None | None | `INS-001`, `INS-002` |
| **Compliance** | None | None | None | `CPL-001`, `CPL-002`, `CPL-003`, `CPL-004`, `CPL-005`, `CPL-006` |
| **Incentive Schemes** | None | None | None | `PSI-2019`, `MSME-CLSS`, `MAITRI-FAST`, `PLI-PHARMA` |
| **Incentive Claims** | None | None | None | `CLM-2027-001`, `CLM-2027-002`, `CLM-2026-001` (parent: `PSI-2019`) |
| **Documents** | None | None | None | `DOC-001`–`DOC-008`, `DOC-INC-001`–`DOC-INC-003` |
| **Requirements** | None | None | None | `LAND-001`, `EST-001`, `CON-001`, `CON-002`, `UTIL-001`–`UTIL-004`, `PREOP-001`–`PREOP-004`, `COMPLY-001` |
| **Regulatory Changes**| None | None | None | `RC-2026-001`, `RC-2026-002`, `RC-2026-003`, `RC-2026-004` |
| **Grievances** | `GRV-2026-0014`, `GRV-2026-0009`, `GRV-2026-0003` | None | None | None (0 records; local demo submissions trackable in session) |

---

## 2. Individual Audit of All 40 Acceptance Items

| # | Acceptance Item Requirement | Status | Fresh Verification Evidence |
|---|---|---|---|
| **1** | Landing page `/` provides clean dual entry to Department and Entrepreneur portals. | **PASSED** | Verified in `src/app/page.tsx` and tested in `e2e/department-routing.spec.ts`. |
| **2** | Guest access to any authenticated Entrepreneur URL redirects to `/entrepreneur/login`. | **PASSED** | Verified in `AuthenticatedShell.tsx` and tested in `e2e/entrepreneur-businesses.spec.ts`. |
| **3** | Entrepreneur session (`sessionStorage.getItem('entrepreneur_demo_auth') === 'true'`) protects all internal pages. | **PASSED** | Verified in `AuthenticatedShell.tsx`; session check guards children rendering. |
| **4** | Public & auth screens (`login`, `register`, `register/details`, `register/success`) are native App Router routes. | **PASSED** | Routes under `src/app/entrepreneur/login` and `src/app/entrepreneur/register` compile as static pages. |
| **5** | Department portal routes and service-worker scoping (`/department/`) remain isolated and unaffected. | **PASSED** | Verified service-worker scope in `public/sw-register.js` is `/department/`; `e2e/department-routing.spec.ts` passes with 8/8 tests. |
| **6** | Entrepreneur business routes use canonical `[businessId]` structure (`/entrepreneur/businesses/[businessId]`). | **PASSED** | Verified folder structure in `src/app/entrepreneur/(authenticated)/businesses/[businessId]`. |
| **7** | Identity agreement: BP-004 in URL, catalog, portfolio cards, and headers matches Sahyadri Bio-Pharma Pvt Ltd with "Internal demo" labeling. | **PASSED** | Verified in `catalog.ts`, `SAMPLE_PROJECTS`, `BusinessPortfolio.tsx`, and `e2e/entrepreneur-overview-navigation.spec.ts`. |
| **8** | No business allocation of arbitrary IDs; BP-001 remains ABC Pharma, BP-002 remains Konkan Feeds, BP-003 remains Sahyadri Electronics. | **PASSED** | Verified canonical records in `ENTREPRENEUR_BUSINESSES` and `SAMPLE_PROJECTS`. |
| **9** | Business overview (E00) derives all counts, previews, and actions strictly through business-filtered selectors with zero cross-business leakage. | **PASSED** | Tested in `e2e/entrepreneur-overview-navigation.spec.ts`: BP-004 shows exactly 4 applications, 6 compliance, 2 inspections, 0 grievances, and excludes BP-001 records. |
| **10** | Application child routes use canonical IDs (e.g. `/applications/[applicationId]`), rejecting invalid or wrong-business IDs with 404. | **PASSED** | Tested in `e2e/entrepreneur-applications.spec.ts`: wrong-business application URLs return 404. |
| **11** | Two records per entity family where fixtures permit. | **PASSED** | Verified: 4 applications, 2 inspections, 6 compliance obligations, 4 incentive schemes, 3 incentive claims, 4 regulatory changes under BP-004. |
| **12** | Business → Application → Query chain ownership: `QRY-001` strictly bound to `APP-2026-MPCB-00412` under BP-004; accessing under BP-001 returns 404. | **PASSED** | Guarded by `findApplicationChild('query', ...)` in `queries/[queryId]/page.tsx`; tested in `e2e/entrepreneur-applications.spec.ts`. |
| **13** | Business → Application → Resubmission chain ownership: `APP-2026-MPCB-00412-R2` strictly bound to `APP-2026-MPCB-00412` under BP-004; accessing under BP-001 returns 404. | **PASSED** | Guarded by `findApplicationChild('resubmission', ...)` in `resubmissions/[resubmissionId]/page.tsx`. |
| **14** | Business → Application → Decision chain ownership: `DEC-2026-MPCB-00412` strictly bound to `APP-2026-MPCB-00412` under BP-004; accessing under BP-001 returns 404. | **PASSED** | Guarded by `findApplicationChild('decision', ...)` in `decisions/[decisionId]/page.tsx`. |
| **15** | Single authenticated layout and shell (`AuthenticatedShell.tsx`) encapsulates all authenticated pages; no duplicate shells. | **PASSED** | Layout at `src/app/entrepreneur/(authenticated)/layout.tsx` wraps children with `AuthenticatedShell`; exactly 1 banner header and 1 footer per screen. |
| **16** | Legacy `[screen]` folder removed from `src/app/entrepreneur/`. | **PASSED** | Verified: directory completely removed from filesystem. |
| **17** | Legacy `EntrepreneurApp.tsx` eliminated from runtime; zero imports in production code. | **PASSED** | Verified: file deleted, grep search across `src/` yields 0 matches. |
| **18** | Legacy `entrepreneurPath` helper eliminated from runtime code. | **PASSED** | Grep search across `src/` yields 0 matches. |
| **19** | Legacy `pushState` / `popstate` and manual page union / `setPage` routers eliminated from runtime code. | **PASSED** | Grep search across `src/` yields 0 occurrences in Entrepreneur domain. |
| **20** | Typed `ENTREPRENEUR_ROUTES` builder in `src/lib/routes/entrepreneur.ts` is the single source of truth for route URLs. | **PASSED** | 100% of route URLs generated via typed builders; verified by 12 tests in `src/lib/routes/entrepreneur.test.ts`. |
| **21** | Business DNA draft provider persists tab session state across E03–E06 onboarding routes. | **PASSED** | Verified in `BusinessDnaDraftContext.tsx` and tested in `e2e/entrepreneur-business-dna.spec.ts`. |
| **22** | Screen Connection Matrix thoroughly documents all screens (E00–E34), parameters, and availability. | **PASSED** | Updated in `docs/ENTREPRENEUR_SCREEN_CONNECTION_MATRIX.md`. |
| **23** | Zero `href="#"` placeholders in Entrepreneur runtime code. | **PASSED** | Grep search in `src/app/entrepreneur` and `src/features/entrepreneur` yields 0 matches. Only `#main-content` skip link exists. |
| **24** | Zero empty click handlers (`onClick={() => {}}`) in Entrepreneur code. | **PASSED** | Grep search across `src/features/entrepreneur` yields 0 matches. |
| **25** | Zero `console.log` navigation handlers in Entrepreneur code. | **PASSED** | Grep search across `src/features/entrepreneur` yields 0 matches. |
| **26** | Unsupported or ambiguous actions visibly disabled with truthful explanatory tooltips/reasons. | **PASSED** | Visibly disabled controls for `CPL-005`/`CPL-006` missing decision chains, `RC-2026-003` `CPL-001` conflict, unmapped notification CTAs, and empty grievances. |
| **27** | Direct URL entry and refresh (e.g., deep links to `/dossier`, `/applications/[applicationId]`, `/changes/amendments`) load exact record state. | **PASSED** | Tested in `e2e/entrepreneur-dossier-journey.spec.ts`, `e2e/entrepreneur-changes-support.spec.ts`. |
| **28** | Browser Back and Forward navigation correctly traverses history without breaking state or crashing. | **PASSED** | Tested in `e2e/entrepreneur-overview-navigation.spec.ts` and `e2e/entrepreneur-businesses.spec.ts`. |
| **29** | Copied deep links open the exact targeted record context when authenticated. | **PASSED** | Verified across all E2E test suites with direct `page.goto(url)` invocations. |
| **30** | Sidebar navigation derives item availability from verified canonical business data. | **PASSED** | Verified in `AuthenticatedShell.tsx`: BP-004 enables Journey, Documents, Compliance, Inspections, Incentives, Changes & Expansion; Grievances is disabled. |
| **31** | Nested routes correctly highlight the parent sidebar section visually and via `aria-current="page"`. | **PASSED** | Tested in `e2e/entrepreneur-overview-navigation.spec.ts`: `/regulatory-changes`, `/changes/amendments`, and `/incentive-claims` correctly set `aria-current="page"`. |
| **32** | Business switcher preserves equivalent page only when valid for target business; drops unavailable child identity and falls back to target parent/overview. | **PASSED** | Tested in `e2e/entrepreneur-overview-navigation.spec.ts`: switching from BP-004 compliance/changes to BP-001 falls back to BP-001 overview. |
| **33** | Never leak or carry a BP-004 child ID into another business URL upon business switch. | **PASSED** | Tested in `e2e/entrepreneur-overview-navigation.spec.ts`: switching from `APP-2026-MPCB-00412` lands on `/businesses/BP-001/applications` without leaking ID. |
| **34** | Single canonical identity catalog (`catalog.ts`) and typed selectors are the single source of truth for business and record relationships. | **PASSED** | Tested in `src/features/entrepreneur/identity/catalog.test.ts` (13 tests pass). |
| **35** | Department PWA service worker scope strictly limited to `/department/`; does not intercept Entrepreneur portal routes. | **PASSED** | Verified in `public/sw-register.js` (`scope: '/department/'`) and `manifest-department.json`. |
| **36** | Typecheck gate: `npx tsc --noEmit` passes with 0 errors. | **PASSED** | Ran `npx tsc --noEmit` on final code state: 0 errors. |
| **37** | Unit & contract tests: `npx vitest run` passes 100% of test suites. | **PASSED** | Ran `npx vitest run` on final code state: 14 test files, 159 tests passed. |
| **38** | Production build: `npm run build` compiles with 0 errors. | **PASSED** | Turbopack/Next.js production build succeeded; all 88 routes compiled cleanly. |
| **39** | Playwright Entrepreneur end-to-end test suite passes with actual click workflows across BP-004 and existing businesses. | **PASSED** | All 11 Entrepreneur E2E test suites passed (50+ assertions). |
| **40** | Playwright Department test suite (`department-routing.spec.ts`) passes with 0 regressions. | **PASSED** | All 8 Department routing tests passed cleanly. |

---

## 3. Route Tree Architecture

```text
/
├── department/ [Department Pack routes: M01-M39]
└── entrepreneur/
    ├── login
    ├── register/
    │   ├── details
    │   └── success
    ├── notifications
    ├── assistant
    └── (authenticated)/
        └── businesses/
            ├── (portfolio) [E02 My Businesses]
            ├── new/ [E03-E06 Business DNA Onboarding]
            │   ├── basic-requirements
            │   └── discovery/
            │       ├── scale
            │       ├── environment-safety
            │       └── review
            └── [businessId]/ [E00 Business Overview]
                ├── profile
                ├── dossier/ [E07 Master Project Dossier]
                │   └── provenance [E08 Data Provenance]
                ├── journey/ [E09 Approval Journey]
                ├── requirements/[requirementId] [E10 Requirement Detail]
                ├── documents/ [E11 Document Centre]
                │   └── [documentId] [E12 Document Detail]
                ├── dependencies [E13 Dependency Graph]
                ├── applications/ [E18 Applications Tracker]
                │   ├── new/ [E14 Intake Workspace]
                │   │   ├── prevalidation [E15 Pre-validation Check]
                │   │   ├── consistency [E16 Cross-form Consistency]
                │   │   └── submission [E17 Fee & Submission]
                │   └── [applicationId]/ [E19 Application Detail]
                │       ├── queries/[queryId] [E20 Query Response]
                │       ├── resubmissions/[resubmissionId] [E21 Resubmission]
                │       └── decisions/[decisionId] [E23 Decision Record]
                ├── inspections/ [E22 Inspections Centre]
                │   └── [inspectionId]
                ├── compliance/ [E24 Compliance Centre]
                │   └── [complianceId] [E25 Compliance Obligation Detail]
                ├── incentives/ [E26 Incentive Schemes]
                │   └── [incentiveId] [E27 Scheme Detail]
                ├── incentive-claims [E28 Claims Workspace]
                ├── regulatory-changes [E29 Regulatory Change Impact]
                ├── changes/ [E30 Business Change Simulator]
                │   └── amendments [E31 Amendments / New Requirements]
                └── grievances [E32 Grievance Redressal]
```

---

## 4. Control Availability & Intentionally Unavailable Actions

In strict adherence to the mandate *"Keep ambiguous relationships and unsupported actions visibly unavailable with truthful reasons"*, the following controls are deliberately disabled in the UI with explicit explanations:

1. **`RC-2026-003` Conflicting Reference**: The fixture references `CPL-001` ("ETP Commissioning Report"), but labels it "PSI 2019 Eligibility Certificate". The button is visibly disabled with tooltip: `"Reference cannot be resolved: CPL-001 is ETP Commissioning Report, not PSI 2019 Eligibility Certificate"`.
2. **`CPL-005` & `CPL-006` Source Approvals**: The source approval fields reference unapproved applications (`APP-2026-FIRE-00093`, `APP-2026-DISH-00241`) without decisions. Source approval links are disabled with: `"No decision record is linked to this source application"`.
3. **Notification CTAs (`N-002`, `N-003`, `N-007`)**: Unmapped notifications without verifiable destinations have disabled action buttons with: `"Action unavailable: no verifiable record context"`.
4. **`N-006` Plot Location Ambiguity**: Notification text references a Chakan plot while linking to Thane application `APP-MIDC-2026-1190` under `BP-001`. The link is preserved per product confirmation, and the text conflict is explicitly noted in the Screen Connection Matrix.
5. **Grievance Sidebar for `BP-002`–`BP-004`**: Disabled with title `"No grievances for this business"`.
6. **Incentive Claim Upload & Query Actions**: Claim document upload and query response buttons on E28 are disabled with truthful prototype tooltips because claims lack dedicated application/child routes.

---

## 5. Prototype-Only Behavior & State Boundaries

- **Authentication**: Simulated using `sessionStorage.getItem('entrepreneur_demo_auth') === 'true'`.
- **Business DNA Onboarding (E03–E06)**: Draft state managed via `BusinessDnaDraftContext` and persisted in `sessionStorage`.
- **Change Simulator & Amendments (E30–E31)**: Proposed change held in `sessionStorage` key `entrepreneur_change_draft_${businessId}_v1`. Free-form proposed values are not encoded into URL paths.
- **Grievances (E32)**: User confirmed decision: Submitting a grievance prepends a trackable local demo record (`GRV-2026-0015`) to tab state and displays a confirmation banner with an explicit prototype disclaimer that no backend persistence occurred.
- **Regulatory Assistant (E34)**: Conversation history is maintained in component state; invoking the assistant never alters the active business or leaks cross-business records.

---

## 6. Changed File Summary

- **Removed Files**:
  - `src/app/entrepreneur/[screen]/` (entire directory removed)
  - `src/components/entrepreneur/` (entire directory removed)
  - Legacy `EntrepreneurApp.tsx` and legacy route helpers
- **Added Files**:
  - App Router route pages for all canonical routes (`src/app/entrepreneur/(authenticated)/**`)
  - Feature components (`src/features/entrepreneur/**`)
  - Typed route builder (`src/lib/routes/entrepreneur.ts`)
  - Domain tests and Playwright E2E suites (`e2e/entrepreneur-*.spec.ts`)
- **Department Files Touched**:
  - Exactly `0` Department files modified (`src/app/department/**` and `src/departments/**` untouched).

---

## 7. Final Validation Results

All checks were executed sequentially on the final code state:

1. **TypeScript Typecheck**:
   ```bash
   npx tsc --noEmit
   # Exit code: 0 (0 errors)
   ```
2. **Vitest Unit & Contract Tests**:
   ```bash
   npx vitest run
   # Test Files: 14 passed (14)
   # Tests: 159 passed (159)
   # Duration: 257ms
   ```
3. **Production Turbopack Build**:
   ```bash
   npm run build
   # Compiled successfully in 355ms
   # 88 static and dynamic routes generated cleanly
   # Exit code: 0
   ```
4. **Playwright End-to-End Suite**:
   ```bash
   npx playwright test e2e/entrepreneur-*.spec.ts
   npx playwright test e2e/department-routing.spec.ts
   # 100% passed across all tests
   ```

**Final Conclusion**: Full acceptance is **COMPLETE**. All 40 items passed with fresh evidence.
