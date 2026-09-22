# Feature Flow Additions

## Baseline Rule

The **Feature Flow md is the BIBLE / master architecture** of this project.

This file contains additional implementation details that should be integrated into the Feature Flow architecture. It does **not** replace or restructure the master plan.

---

## 1. Project Classification

Add an initial classification layer:

- MSME vs Large/Mega project
- Mega Project Approval (IND-8) as a taxonomy/placeholder node
- Applicable MSME / Large / Mega registration route

The classification should influence the downstream regulatory journey.

---

## 2. Land Workflow

Add conditional land-routing logic:

- Land already in possession → skip land-acquisition route
- MIDC government land → MIDC application / allotment / possession
- Private land → private-land route
- Agricultural land → applicable land-use route
- Agricultural private purchase above the applicable threshold → relevant permission node where applicable
- BTAL / NA permission route where applicable
- Stamp-duty exemption → surface through the Incentive Engine where applicable

These should be modeled as conditional nodes rather than mandatory steps for every business.

---

## 3. Environmental Workflow

Add an explicit Environmental Clearance node when the project's activity triggers it.

- Environmental classification remains an input to applicability and risk logic
- Environmental Clearance is tracked as its own approval/status
- Environmental Clearance remains distinct from MPCB Consent to Establish (CTE)

---

## 4. Establishment / Construction Approvals

Real-world approval/service nodes can include:

- MPCB Consent to Establish (CTE)
- Building Plan Approval
- Drainage approvals
- Fire approval
- Power-related approvals
- Water-related approvals
- MIDC / local planning approvals where applicable
- DISH / factory-plan and licensing requirements
- Mortgage NOC as a conditional taxonomy item

For the prototype, closely related sub-approvals may remain grouped where detailed tracking does not add meaningful value.

---

## 5. Utilities

Model utility requirements as conditional routes:

- MIDC Power NOC → relevant energy-supply/application route
- MIDC water connection OR relevant non-MIDC water-consent route
- High-tension / substation requirement → relevant electrical inspection/approval node

The exact route should depend on project and location characteristics.

---

## 6. Boiler Workflow

If `boiler = YES`, activate:

1. Boiler inspection / certification
2. Permission to run boiler

If `boiler = NO`, these requirements should not appear in the journey.

---

## 7. Pre-Operation / Registration

Where applicable, include:

- Factory registration / licensing
- Labour / contract-labour registrations
- Tax / business registrations
- Energy supply
- Sector-specific operating registrations

Avoid treating legacy or outdated terminology as universal requirements. Represent current services through the regulatory knowledge layer.

---

## 8. Conditional Journey Generation

These additions must be represented as **conditional approval nodes and dependencies**, not as one fixed linear workflow.

The intended architecture is:

Business Profile
→ Applicability / Regulatory Rules
→ Approval & Compliance Nodes
→ Dependency Graph
→ Personalized Regulatory Journey

Example logic:

```text
MIDC = YES
→ activate MIDC land workflow

existing_land = YES
→ skip land-acquisition nodes

boiler = YES
→ activate boiler workflow

EC_applicable = YES
→ activate Environmental Clearance node

HT_power = YES
→ activate HT/substation-related requirement
```

---

## 9. Relationship to the Feature Flow md

The md remains the source of truth for:

- Overall system architecture
- Adaptive business questionnaire
- Master business profile
- Master project dossier / common data layer
- Verified data provenance
- Regulatory knowledge engine / RAG
- Personalized regulatory journey generation
- Documentation guidance
- Dependency management
- Front-end pre-validation
- Cross-form consistency
- Risk-based scrutiny
- Department routing and desk tracking
- Consolidated queries
- Delta re-scrutiny
- Inspection coordination
- SLA tracking
- Compliance lifecycle
- Incentive lifecycle
- Regulatory change and impact analysis
- Business expansion / amendment analysis
- Grievance and escalation
- Officer-side regulatory assistance
- Government analytics and bottleneck analysis

The additions in this file provide **concrete regulatory workflow details and rule seeds** for that architecture.

---


### In short

**Full Feature Flow md = BIBLE / master architecture**

**This MD = additional implementation and regulatory rule layer**

Both should be treated together as the baseline for future work.
