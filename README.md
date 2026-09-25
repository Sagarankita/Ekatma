# EKATMA (एकात्म)

> **Maharashtra Industrial Approval, Compliance & Regulatory Intelligence Platform**  
> A unified digital governance ecosystem streamlining end-to-end industrial lifecycles for both **Entrepreneurs** and **Department Scrutiny Officers** across Maharashtra.

[![Next.js](https://img.shields.io/badge/Next.js-15%2B%20App%20Router-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7%2B-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![PWA Ready](https://img.shields.io/badge/PWA-Department%20Scoped-purple?logo=pwa)](https://web.dev/progressive-web-apps/)
[![Vitest](https://img.shields.io/badge/Vitest-5.0%2B-yellow?logo=vitest)](https://vitest.dev/)
[![Playwright](https://img.shields.io/badge/Playwright-E2E%20Tested-green?logo=playwright)](https://playwright.dev/)

---

## 🏛️ Executive Summary

**EKATMA** (*एकात्म* — Unified / Integrated) consolidates Maharashtra's disparate industrial regulation portals (MAITRI, MIDC, MPCB, DISH, Fire, Town Planning, Revenue, Forest, etc.) into a cohesive, high-performance web platform.

Prior to EKATMA, setting up or operating a factory required navigating fragmented agency websites, deciphering statutory dependencies manually, repeatedly uploading redundant documents, and coordinating disparate physical inspections.

EKATMA solves this by delivering two dedicated portals within a single Next.js App Router codebase:
1. **Entrepreneur Portal (`/entrepreneur`)**: An intelligent, self-guiding workspace that translates high-level project parameters into tailored statutory roadmaps, unified application dossiers, joint inspection schedules, compliance calendars, and subsidy claims.
2. **Department Officer Portal (`/department`)**: An offline-ready PWA scrutiny console enabling multi-department officers to conduct structured application scrutiny, detect cross-parameter inconsistencies, schedule coordinated field visits, track SLA escalations, and issue digital approvals.

---

## 🌟 Key Platform Capabilities

### 1. 🏢 Entrepreneur Experience (`/entrepreneur`)

- **Single-Window Onboarding**: MAITRI-linked authentication and multi-project enterprise management (`/entrepreneur/businesses`).
- **Business DNA & Discovery Engine**: Adaptive multi-step questionnaire translating business intent (land requirements, utility consumption, emission profiles, hazard ratings) into statutory obligations without requiring prior legal knowledge.
- **Unified Project Dossier**: A single immutable record of enterprise profile, project DNA, land details, and investment metrics (`/dossier`).
- **Pre-establishment & Pre-operation Roadmaps**: Chronological step-by-step clearance stages with dependency graph visualizations (`/journey`, `/dependencies`).
- **Digital Document Locker**: Centralized repository of verified land, corporate, building, and environmental credentials, eliminating duplicate document uploads across agencies (`/documents`).
- **End-to-End Application Management**: Pre-validation, consistency verification, submission tracking, query clarification loops, and delta resubmissions (`/applications`).
- **Joint / Coordinated Field Inspections**: Unified site visits scheduled concurrently across multiple agencies (e.g., MIDC, MPCB, Fire) with live observation tracking (`/inspections`).
- **Statutory Compliance Calendar**: Automated register of recurring returns, environmental audits, consent renewals, and license expirations (`/compliance`).
- **Incentives & Subsidies Engine**: Discovery and claim workflows for Maharashtra's Package Scheme of Incentives (PSI), stamp duty exemptions, electricity duty refunds, and capital subsidies (`/incentives`, `/incentive-claims`).
- **Regulatory Change Impact Radar**: Real-time notifications and operational impact analyses when state policies or environmental norms are amended (`/regulatory-changes`).
- **Grievance Redressal & SLA Escalations**: Direct dispute and delay escalation channels with statutory timeline enforcement (`/grievances`).
- **AI Regulatory Assistant**: Natural Language Q&A grounded in Maharashtra industrial policy acts, building regulations, and environmental rules (`/assistant`).

---

### 2. 🏛️ Department Officer Console (`/department`)

- **Role-Based Scrutiny Console**: Streamlined dashboard for technical officers, division heads, and field inspectors.
- **Offline-Ready Scoped PWA**: Service worker caching and web manifest scoped strictly to `/department/` for officers inspecting remote industrial estates with intermittent connectivity.
- **Modular Department Packs (`src/departments/`)**: Config-driven architecture supporting distinct departmental profiles:
  - **MIDC** (Maharashtra Industrial Development Corporation) — Land allotment, water supply, building plan approvals.
  - **MPCB** (Maharashtra Pollution Control Board) — Consent to Establish (CTE), Consent to Operate (CTO), pollution categorization.
- **Micro-Scrutiny Workflows (M01–M39)**:
  - Application Queue & Advanced Search (`/department/queue`, `/department/search`)
  - Completeness Pre-checks & Smart Scrutiny Routing (`/precheck`, `/scrutiny-route`)
  - Parameter-Level Workbenches (e.g., Building FSI/Setbacks, Water Balance, Hazardous Materials)
  - Cross-Parameter Consistency Engine (`/consistency`)
  - Dependency Graph Analyzer (`/dependency-view`)
  - Interactive Scrutiny Query Builder & Clarification Timeline (`/query-builder`, `/query-history`)
  - Delta Re-scrutiny on Applicant Resubmissions (`/delta-rescrutiny`)
  - Joint Inspection Dispatch & Field Observation Recording (`/department/inspection-queue`, `/inspections`)
  - Statutory Approval & Rejection Decision Generator (`/decision-workspace`)
  - SLA Monitoring, Bottleneck Heatmaps & Officer Workload Balancing (`/department/sla`, `/bottleneck`, `/workload`, `/analytics`)
  - Regulatory Knowledge RAG Assistant & Policy Amendments (`/department/regasst`, `/regchng`)
  - Immutable Governance Audit Log (`/department/audit`)

---

## 🗺️ Portal Route Matrix

| Route | Scope | Description |
| :--- | :--- | :--- |
| `/` | Public | EKATMA Public Landing, policy showcase, and portal entry |
| `/entrepreneur/login` | Public | Entrepreneur MAITRI login |
| `/entrepreneur/register` | Public | Entrepreneur account registration & verification |
| `/entrepreneur/businesses` | Authenticated | Multi-business portfolio overview |
| `/entrepreneur/businesses/new` | Authenticated | Adaptive Business DNA Questionnaire |
| `/entrepreneur/businesses/[id]` | Authenticated | Business Overview & Executive Summary |
| `/entrepreneur/businesses/[id]/dossier` | Authenticated | Canonical Project Dossier & Provenance |
| `/entrepreneur/businesses/[id]/journey` | Authenticated | Phased Clearance Roadmap & Dependencies |
| `/entrepreneur/businesses/[id]/documents`| Authenticated | Digital Document Locker & Credentials |
| `/entrepreneur/businesses/[id]/applications` | Authenticated | Application submissions, status & queries |
| `/entrepreneur/businesses/[id]/inspections` | Authenticated | Joint inspection booking & reports |
| `/entrepreneur/businesses/[id]/compliance` | Authenticated | Statutory compliance calendar & registers |
| `/entrepreneur/businesses/[id]/incentives` | Authenticated | Maharashtra Policy Incentives & Subsidies |
| `/entrepreneur/businesses/[id]/regulatory-changes` | Authenticated | Policy amendment impact radar |
| `/entrepreneur/businesses/[id]/grievances` | Authenticated | Grievance escalation & SLA dispute tracking |
| `/entrepreneur/assistant` | Authenticated | AI Regulatory Intelligence Assistant |
| `/department/login` | Public | Department Officer authentication |
| `/department` | Officer Portal | Department Officer overview dashboard |
| `/department/queue` | Officer Portal | Pending application scrutiny queue |
| `/department/search` | Officer Portal | Global enterprise & application search |
| `/department/services` | Officer Portal | Departmental service & fee catalog |
| `/department/inspection-queue` | Officer Portal | Coordinated inspection dispatch |
| `/department/queries` | Officer Portal | Cross-agency query management |
| `/department/decisions` | Officer Portal | Statutory approval orders & certificates |
| `/department/sla` | Officer Portal | SLA compliance & escalation monitoring |
| `/department/analytics` | Officer Portal | State-wide clearance throughput & bottleneck metrics |
| `/department/audit` | Officer Portal | Regulatory audit log & governance trail |

---

## 🏗️ Architecture & Technology Stack

```text
                               ┌────────────────────────┐
                               │   Next.js 15+ App      │
                               │      (Turbopack)       │
                               └───────────┬────────────┘
                                           │
                    ┌──────────────────────┴──────────────────────┐
                    ▼                                             ▼
       ┌─────────────────────────┐                   ┌─────────────────────────┐
       │   Entrepreneur Portal   │                   │    Department Portal    │
       │   (/entrepreneur/**)    │                   │    (/department/**)     │
       └────────────┬────────────┘                   └────────────┬────────────┘
                    │                                             │
                    ├─ Business DNA Questionnaire                 ├─ Scrutiny Workflows (M01-M39)
                    ├─ Digital Document Locker                    ├─ Scoped PWA / Service Worker
                    ├─ Compliance & Incentives                    ├─ Department Packs (MIDC, MPCB)
                    └─ Canonical Route Builders                   └─ SLA & Workload Analytics
                                           │
                                           ▼
                    ┌─────────────────────────────────────────────┐
                    │          Shared Domain & Libraries          │
                    │   • src/domain/ (Records, Types, States)    │
                    │   • src/lib/routes/ (Contract Builders)     │
                    │   • src/departments/ (Pack Registry)        │
                    │   • Tailwind CSS v4 Design Tokens           │
                    └─────────────────────────────────────────────┘
```

- **Framework**: [Next.js 15+](https://nextjs.org/) App Router (React 19, React DOM 19)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with native design tokens and CSS theme variables in `src/app/globals.css`
- **Language**: [TypeScript 5.7+](https://www.typescriptlang.org/) (Strict Mode)
- **Testing**:
  - [Vitest 5.0+](https://vitest.dev/) for domain model contracts, route serialization, and data fixtures
  - [Playwright 1.63+](https://playwright.dev/) for end-to-end user journeys, deep-link integrity, and identity parity
- **PWA**: Scoped Progressive Web App service worker and manifest for field officers at `/department/`

---

## 📁 Repository Structure

```text
.
├── src/
│   ├── app/
│   │   ├── (public)/              # Root public landing page (/)
│   │   ├── department/            # Department portal shell, PWA manifest & routes
│   │   │   ├── (portal)/          # Authenticated officer workspace (M01-M39)
│   │   │   │   ├── analytics/     # Industrial throughput & bottleneck analytics
│   │   │   │   ├── applications/  # Application scrutiny, inspection & decision views
│   │   │   │   ├── queue/         # Scrutiny queue management
│   │   │   │   ├── scrutiny/      # Deep inspection & scrutiny workbench
│   │   │   │   └── ...
│   │   │   ├── login/             # Officer authentication
│   │   │   └── manifest.ts        # Scoped PWA web manifest
│   │   ├── entrepreneur/          # Entrepreneur portal shell & dynamic subroutes
│   │   │   ├── (authenticated)/   # Logged-in entrepreneur workspace
│   │   │   │   ├── businesses/    # Business portfolio & new project discovery
│   │   │   │   │   └── [businessId]/ # Project workspace (applications, dossier, journey, etc.)
│   │   │   │   ├── assistant/     # AI Regulatory assistant
│   │   │   │   └── notifications/ # Alert & notification hub
│   │   │   ├── login/             # MAITRI entrepreneur sign-in
│   │   │   └── register/          # New user registration & verification
│   │   └── globals.css            # Tailwind CSS v4 theme variables & utilities
│   │
│   ├── components/                # Reusable UI elements, navigation, and badges
│   ├── data/                      # Fixtures, seed catalogues, and mock datasets
│   ├── departments/               # Department Pack configurations
│   │   ├── midc/                  # Maharashtra Industrial Development Corporation pack
│   │   ├── mpcb/                  # Maharashtra Pollution Control Board pack
│   │   └── registry.ts            # Dynamic pack resolver
│   ├── domain/                    # Canonical domain records, ID schemes, types & states
│   ├── features/                  # Portal-specific feature logic
│   │   └── entrepreneur/          # Modular feature domains (compliance, dossier, etc.)
│   └── lib/                       # Route contract builders, brand assets & utilities
│
├── e2e/                           # Playwright end-to-end regression test suites
├── public/                        # Static assets (Maharashtra seals, India emblems, PWA icons)
├── vitest.config.ts               # Unit & domain test configuration
├── playwright.config.cjs          # Playwright test configuration
└── package.json                   # Project scripts and dependencies
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: `v20.x` or later (LTS recommended)
- **Package Manager**: `pnpm` (preferred) or `npm`

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Sagarankita/Ekatma.git
   cd Ekatma
   ```

2. **Install dependencies:**
   ```bash
   pnpm install
   ```

3. **Configure Environment Variables:**
   Create a `.env.local` file by copying the template:
   ```bash
   cp .env.example .env.local
   ```

   Configure backend boundaries as needed:
   ```env
   # Core APIs (Logical integration boundaries)
   EKATMA_API_BASE_URL=
   EKATMA_RULES_API_BASE_URL=
   EKATMA_DEPENDENCY_API_BASE_URL=
   EKATMA_RAG_API_BASE_URL=

   # Client Configuration
   NEXT_PUBLIC_DEPARTMENT_BASE_PATH=/department
   NEXT_PUBLIC_PWA_ENABLED=true
   ```

---

## 💻 Development & Build Scripts

| Command | Action |
| :--- | :--- |
| `pnpm dev` | Starts the Next.js local development server on `http://localhost:3000` |
| `pnpm build` | Compiles the production application bundle with Next.js Turbopack |
| `pnpm start` | Serves the optimized production build |
| `pnpm typecheck` | Executes strict TypeScript type validation (`tsc --noEmit`) |
| `pnpm test` | Runs Vitest domain contract and unit test suites |
| `pnpm test:watch` | Runs Vitest in interactive watch mode |
| `pnpm test:e2e` | Executes Playwright end-to-end integration tests |
| `pnpm format` | Formats code with `oxfmt` |

---

## 🧪 Testing & Quality Assurance

### 1. Contract & Unit Tests (Vitest)
Unit tests validate route builders, ID serialization, domain models, and document integrity:
```bash
pnpm test
```
*Sample output:*
```text
✓ src/lib/routes.test.ts (94 tests)
✓ src/lib/routes/entrepreneur.test.ts (12 tests)
✓ src/features/entrepreneur/journey/journey.test.ts (7 tests)
✓ src/features/entrepreneur/documents/documents.test.ts (5 tests)
✓ src/features/entrepreneur/applications/applications.test.ts (6 tests)
✓ src/features/entrepreneur/dossier/dossier.test.ts (4 tests)
✓ src/features/entrepreneur/identity/catalog.test.ts (13 tests)
✓ src/features/entrepreneur/compliance/compliance.test.ts (4 tests)
✓ src/lib/brand-assets.test.ts (3 tests)
✓ src/domain/records.test.ts (2 tests)
✓ src/features/entrepreneur/incentives/incentives.test.ts (5 tests)

Test Files  14 passed (14)
Tests       159 passed (159)
```

### 2. End-to-End Tests (Playwright)
Playwright test suites ensure cross-portal navigation, deep-linking safety, and business lifecycle continuity:
```bash
pnpm test:e2e
```
*Coverage includes:*
- `entrepreneur-business-dna.spec.ts`: Adaptive questionnaire & project creation
- `entrepreneur-compliance-incentives.spec.ts`: Regulatory compliance & subsidy claims
- `entrepreneur-applications.spec.ts`: Application lifecycle and query resolutions
- `department-routing.spec.ts`: Scrutiny routing and multi-agency queue management
- `entrepreneur-route-contract.spec.ts`: URL encoding and deep-link determinism

---

## 🔌 Extending Department Packs

Department configurations are modularized under `src/departments/`. To integrate a new department (e.g., `DISH` — Directorate of Industrial Safety & Health):

1. **Create Pack Directory**:
   ```bash
   mkdir -p src/departments/dish
   ```
2. **Define Pack Manifest**:
   Create `src/departments/dish/index.ts` conforming to the department schema:
   ```typescript
   export const dishDepartmentPack = {
     id: 'dish',
     code: 'DISH',
     name: 'Directorate of Industrial Safety and Health',
     services: [
       { id: 'dish-factory-license', name: 'Factory License Approval & Renewal', slaDays: 30 },
     ],
     inspectionChecklist: [
       { id: 'boiler-cert', title: 'Boiler Safety Certificate Inspection' },
     ],
   };
   ```
3. **Register Pack**:
   Import and export your pack in `src/departments/registry.ts`.

---

## 🛡️ Security & Integration Guidelines

- **Server-Only Secrets**: All private API keys and tokens must reside exclusively in `.env.local` or environment variables without `NEXT_PUBLIC_` prefixes.
- **PWA Scoping**: The progressive web application scope is strictly bounded to `/department/` via `src/app/department/manifest.ts` to prevent offline service worker caching from interfering with public or entrepreneur routes.
- **Route Safety**: Always use canonical route builders from `src/lib/routes.ts` or `src/lib/routes/entrepreneur.ts` rather than hardcoding string paths to guarantee consistent encoding and parameter validation.

---

## 📜 License & Governance

Developed for the **Government of Maharashtra Industrial Governance Ecosystem**.  
Copyright © 2026. All rights reserved.
