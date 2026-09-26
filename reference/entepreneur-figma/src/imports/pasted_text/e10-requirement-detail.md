Create **E10 — Requirement Detail** as a new Entrepreneur-side screen within the **existing EKATMA Figma system**.
## IMPORTANT — CONTINUE THE EXISTING SYSTEM
This is an **append-only feature addition** to the existing EKATMA Figma file.
**Do NOT redesign, regenerate, restyle, rename, replace, or modify:**
Reuse the existing components and visual tokens wherever possible.
The new screen must look like it was built as a **natural continuation of the existing Maharashtra government portal**, not as a new standalone application.

Maintain:
* Existing GIGW-inspired government visual language
* English / Marathi compatibility
* Existing accessibility and high-contrast behavior
* Existing Entrepreneur sidebar
* Globally visible selected Business / Project context
* Existing card, table, badge, button, drawer and navigation patterns
---

# 1. PURPOSE OF E10
E10 is the **detailed explanation page for one regulatory requirement/service node** discovered by the Regulatory Journey.

The entrepreneur should be able to answer:

> **What is this requirement?**
>
> **Why does it apply to my business?**
>
> **What do I need before I can start it?**
>
> **What forms, documents and declarations are required?**
>
> **Can it run in parallel with something else?**
>
> **What does it unlock later?**
>
> **What regulatory source supports this requirement?**
>
> **What should I do next?**

This is a drill-down from the **E09 Regulatory Journey / Requirement node**.
The architecture must work for **ANY department and ANY service**.
Use **MPCB Consent to Establish (CTE)** only as the demonstration/example data.
Do NOT create an MPCB-specific component structure.

The same E10 component must be reusable for:
* MIDC services
* MPCB services
* Fire services
* DISH / Factory Safety
* Boiler
* Legal Metrology
* Planning authorities
* Utility-related services
* Sector-specific authorities
* Future Maharashtra departments

A new department should be able to plug its own service, regulatory source, forms, documents, dependencies and inspection requirements into the same E10 structure.

---

# 2. PAGE CONTEXT

Use a realistic selected project context such as:

**ABC Pharma Pvt Ltd**
Pharmaceutical Manufacturing Unit — Thane
Stage: Pre-Establishment

Example requirement:

**Consent to Establish (CTE)**
Department: Maharashtra Pollution Control Board
Stage: Establishment

However, visually and structurally communicate that this is an **example service**, not a hard-coded MPCB page.

---

# 3. GLOBAL NAVIGATION / CONTEXT

Keep the existing Entrepreneur shell.
At the top, preserve the existing breadcrumb pattern:
**My Businesses → ABC Pharma Pvt Ltd → Regulatory Journey → Requirement Detail**
Keep the selected Business / Project visible in the existing global context mechanism.
Do not invent another project selector.

The entrepreneur should always understand which Business / Project this requirement belongs to.

---

# 4. PRIMARY PAGE HEADER

Create a compact government-portal-style requirement header.

Show:

### Requirement / Service Name

**Consent to Establish**

### Department

**Maharashtra Pollution Control Board**

### Service ID

Example:
`MPCB-CTE`

### Stage

**Establishment**

### Current Status

Example:
**Ready**

Use the existing status/badge styling.

Do not create a new status system.

The underlying service/application states must remain compatible with the shared EKATMA state model.

Possible requirement-display states should support:

* Ready
* In Progress
* Waiting on Dependency
* Action Required
* Under Department Review
* Inspection Scheduled
* Approved
* Rejected
* Conditional
* Needs Verification
* Not Applicable

These are display/requirement states and must remain compatible with the shared canonical application state model.

---

# 5. PRIMARY ACTION AREA

Place the primary CTA prominently but within the existing EKATMA button hierarchy:

**Start Application**

Secondary contextual actions:

**View Documents**

**View in Journey**

If the requirement is blocked, do NOT show Start Application as if it is available.

Instead show the blocking reason and route the user to the dependency.

For example:

**Waiting on Dependency**

> Complete the required prerequisite before starting this application.

CTA:

**View Dependency**

The page must communicate the difference between:

* Ready
* Blocked
* Conditional
* Needs Verification
* Already submitted
* Under review
* Approved

---

# 6. WHY THIS REQUIREMENT APPLIES

Create a clearly identifiable section:

## Why do I need this?

Do not simply say:

> “This approval is required because you are a manufacturer.”

Instead show the **business factors from the user's Business DNA that contributed to applicability**.

Example:

### Your business factors

* **Activity:** Manufacturing
* **Industry:** Pharmaceuticals
* **Location:** Thane, Maharashtra
* **Project stage:** Pre-Establishment
* **Industrial wastewater:** Yes
* **Air emissions:** Yes
* **Hazardous material:** Yes

Then show a concise explanation:

> Your project involves manufacturing activity and environmental attributes that trigger evaluation for this establishment-stage requirement.

If the regulatory engine has not established certainty, use:

**Needs Verification**

instead of inventing legal certainty.

The UI must make clear that these are the **business facts used by the applicability engine**, not arbitrary information entered specifically for this page.

Do not ask the entrepreneur to re-enter these values here.

Reuse existing Business Profile / Business DNA / Master Project Dossier data.

---

# 7. APPLICABILITY EXPLANATION

Create a structured explanation block:

### Applicability

**Applicable**

Then show:

**Based on:**

* Manufacturing activity
* Project location
* Wastewater generation
* Project stage

Where appropriate, show:

**Determination:** Confirmed Applicable / Conditional / Needs Verification / Not Applicable

Do not use vague AI-generated language as the source of truth.

The regulatory knowledge/rule layer determines applicability.

---

# 8. DEPENDENCIES

Create a dedicated section:

## Dependencies

Show prerequisite and downstream relationships.

Use a compact dependency list or visual relationship component consistent with E09/E13.

Example:

### Required before starting

**Land Stage**
Status: Approved

### Current requirement

**MPCB Consent to Establish**
Status: Ready

### Downstream

**Building / Planning Stage**
Status: Waiting / Conditional depending on the configured journey

Do not create an isolated dependency model.

Use the same underlying dependency graph as the Regulatory Journey.

Include a CTA:

**View in Journey**

Clicking it should prototype back to **E09 / Dependency Journey view** at the relevant node.

The dependency component must support:

* Sequential dependencies
* Parallel services
* Conditional requirements
* Locked nodes
* Downstream unlocks

---

# 9. FORMS

Create:

## Forms

Show all forms associated with this service.

Example:

| Form                       | Requirement | State          | Action |
| -------------------------- | ----------- | -------------- | ------ |
| CTE Application Form       | Required    | Ready          | View   |
| Annexure / supporting form | Conditional | Not Applicable | View   |

Do not invent arbitrary forms merely for visual filling.

Where exact form information is unavailable, use a generic placeholder such as:

**Service-specific application form**

and mark it appropriately.

The component must support:

* Required
* Conditional
* Not Required
* Completed
* Pending

Do not collapse these into one generic "status".

---

# 10. DOCUMENTS

Create:

## Required Documents

Show documents associated with this requirement.

Example:

* Project report
* Land / plot documentation
* Technical details
* Environmental / process information
* Applicable declarations
* Other service-specific documents

Each document row should use the existing EKATMA document representation.

Show useful properties such as:

* Document name
* Requirement state
* Availability
* Verification state
* Validity where relevant
* Reusability
* Dependency

Do NOT create a document-readiness percentage.

Use the existing Document Centre as the source of truth.

CTA:

**View Documents**

Prototype:

**View Documents → E11 Document Centre**

If a specific document is selected, it may route to the relevant E12 Document Detail.

---

# 11. DECLARATIONS

Create:

## Declarations

Show declarations required for this service.

Example:

**Applicant declaration**
Required before submission

Use the existing form/declaration component style.

Support:

* Required
* Accepted
* Pending
* Not Applicable

Do not imply that accepting a declaration itself constitutes government approval.

---

# 12. INSPECTION REQUIREMENT

Create:

## Inspection

Show whether an inspection is associated with this requirement.

Example:

**Inspection:** May be required

or:

**Inspection:** Required

or:

**Inspection:** Not currently identified

If required, show:

* Inspection stage
* Related service
* Current inspection state
* Whether scheduling is pending
* Whether preparation documents are required

Do not create the full Inspection Centre here.

This section is a summary and should link to the later inspection workflow.

Use the shared Inspection ID/state model when an actual inspection exists.

---

# 13. SLA

Create:

## Service Level / SLA

Show the service's configured SLA information.

Support:

* Expected SLA
* Current elapsed time, if application has started
* Remaining time, if applicable
* Applicant-hold time, if applicable
* Department-processing time, if applicable

Before submission, simply show the configured service SLA where available.

Example:

**Configured SLA:** 21 days

After submission, the same requirement detail component should be capable of showing:

**Day 18 / 21**

with:

* Department processing: 13 days
* Applicant response: 5 days

Do not invent SLA values for real services.

Use realistic example data only for the prototype.

---

# 14. FEE

Create:

## Fee

Show:

**Application fee:** ₹[example amount]

Support:

* Fee amount
* Fee type
* Applicable/conditional state
* Payment status after application begins

Do not imply a fee exists if the underlying service configuration says otherwise.

If the amount is unavailable in the prototype data:

**Fee information available during application**

Use the same payment/submission flow later used by E17.

---

# 15. PARALLEL POSSIBILITIES

Create:

## What can happen in parallel?

This is important because EKATMA must not represent the regulatory journey as a single linear checklist.

Example:

**While this requirement is in progress, these services may proceed in parallel where their dependencies permit:**

* Power
* Water
* Conditional NOCs
* Other applicable services

For each item show:

* Service
* Department
* Current state
* Dependency relationship

Use neutral wording such as:

**Can proceed in parallel where applicable**

Do not imply every service can always run simultaneously.

The actual dependency graph remains authoritative.

CTA:

**View Journey**

---

# 16. DOWNSTREAM SERVICES

Create:

## What does this unlock?

Show downstream services that depend on this requirement.

Example:

**Building / Planning**

**Provisional Fire**

**Other downstream services**

For each:

* Department
* Service
* Current state
* Dependency relationship

If approval is required before the downstream service can start, clearly show:

**Blocked until this requirement is resolved**

If it becomes available after approval:

**Unlocks when approved**

This must visually connect to the shared journey/dependency model.

---

# 17. REGULATORY SOURCE

Create a clearly separated section:

## Regulatory Source

Show source-backed regulatory information.

Fields:

**Source type:**
GR / Rule / Act / Circular / Guideline

**Reference:**
Example: `[GR / Rule reference]`

**Clause / Section:**
`[Clause / Section]`

**Effective date:**
`[DD MMM YYYY]`

**Source document:**
`[Document title]`

**Version / Rule version:**
`[Version where available]`

If the system cannot confidently establish the source or applicability:

Show:

**Needs Verification**

Do not fabricate a GR number, clause, effective date, threshold, or legal interpretation.

The UI should make source provenance visible.

The Regulatory RAG may retrieve and explain the source, but it does not replace the underlying regulatory authority.

---

# 18. REGULATORY SOURCE CONFIDENCE / VERIFICATION

Where applicable, include a small state indicator:

**Verified source**

or

**Needs Verification**

Do not use AI confidence scores as a substitute for regulatory verification.

The platform should never visually imply:

> “AI says this is legally applicable, therefore it is approved.”

The correct conceptual relationship is:

**Structured regulatory rules → applicability**

and:

**RAG → retrieval/explanation/assistance**

---

# 19. RIGHT-SIDE REGULATORY RAG HELP PANEL

Create a **government-styled right-side help panel/drawer**.

Do NOT use a floating consumer chatbot bubble.

This should visually match the future/global **E34 Regulatory Assistant**.

Title:

**Regulatory Help**

Context-aware subtitle:

**About Consent to Establish**

Provide suggested actions/questions:

### Why is this required?

Explain why this requirement was identified for the selected business.

### Explain the clause

Retrieve and explain the relevant regulatory clause in plain language.

### Which GR?

Retrieve the relevant Government Resolution / rule / source where available.

### Explain in Marathi

Provide bilingual / Marathi explanation while preserving the underlying source.

### Documents?

Explain what each required document is for.

### Where do I get it?

Explain where the document/information can be obtained, based on available source-backed information.

Responses should show:

1. Plain-language explanation
2. Regulatory source
3. Clause/section where available
4. Effective date where available
5. Related requirement

Keep answers concise and government-portal appropriate.

---

# 20. RAG SAFETY / AUTHORITY BOUNDARY

The Regulatory Assistant is an **information and retrieval assistant**.

It may:

* Retrieve
* Explain
* Cite
* Compare
* Clarify
* Translate / explain in Marathi
* Help understand documents
* Explain why a requirement was identified

It must NOT:

* Grant approval
* Reject an application
* Make the statutory decision
* Invent a legal requirement
* Silently alter regulatory rules
* Present uncertain information Present uncertain information as confirmed law

When source information or applicability is uncertain, show:

Needs Verification

The final statutory decision remains with the appropriate department/authority.

21. REQUIREMENT SUMMARY / AT-A-GLANCE

Add a compact summary area so the entrepreneur can understand the requirement without reading the entire page.

Show:

Service
Consent to Establish

Department
MPCB

Stage
Establishment

Status
Ready

Applicability
Applicable / Needs Verification

Dependency
Land Stage Complete

Inspection
May be Required

SLA
Configured SLA

Fee
Configured Fee / Available during application

Keep this compact and use existing EKATMA cards/badges.

22. START APPLICATION BEHAVIOUR

Primary CTA:

Start Application

Prototype:

Start Application → E14 Approval Application Workspace

E14 must inherit the same:

Business ID
Project ID
Requirement/service
Department
Service ID
Business DNA version
Master Project Dossier
Existing reusable data
Requirement/document dependencies

Do NOT make the user start from a blank form.

The application workspace should pull reusable information from the Master Project Dossier.

23. DOCUMENT PROTOTYPE

CTA:

View Documents

Prototype:

View Documents → E11 Document Centre

The Document Centre must remain the universal repository across departments.

Do not create a separate MPCB document repository.

24. DEPENDENCY PROTOTYPE

CTA:

View Journey

Prototype:

View Journey → E09 Regulatory Journey / relevant dependency node

Preserve the shared dependency graph.

Do not create a second independent dependency visualization.

25. EXAMPLE CONTENT MUST FEEL REALISTIC BUT REMAIN GENERIC

Use realistic Maharashtra industrial data for the demonstration.

Example:

ABC Pharma Pvt Ltd
Pharmaceutical Manufacturing Unit — Thane

Business factors:

Manufacturing
Pharmaceutical industry
Thane
Pre-establishment
Industrial wastewater: Yes
Air emissions: Yes
Hazardous material: Yes

Example requirement:

Consent to Establish

Department:

Maharashtra Pollution Control Board

But structure every component so the same screen could instead display:

Fire NOC — Fire Authority

or

Factory-related service — DISH

or

Boiler-related service — Directorate of Boilers

without changing the page architecture.

26. RESPONSIVE / COMPONENT DESIGN

Use Auto Layout and reusable components.

Create reusable variants for:
Requirement Status
Ready
In Progress
Waiting on Dependency
Action Required
Under Review
Approved
Rejected
Conditional
Needs Verification
Not Applicable
Requirement Sections
Forms
Documents
Declarations
Inspection
SLA
Fee
Dependencies
Parallel services
Downstream services
Regulatory source
RAG Help
Default
Question selected
Answer displayed
Source displayed
Marathi explanation

Use reusable variants rather than duplicated independent designs.

27. ACCESSIBILITY

Preserve the existing accessibility behavior.

Ensure:

Clear hierarchy
Adequate text contrast
Keyboard-friendly controls
Clear status labels
Do not rely only on color to communicate state
Accessible labels for icons
English / Marathi compatibility
High-contrast mode compatibility

Do not introduce new visual accessibility behavior that conflicts with Phase 0.

28. FINAL PROTOTYPE FLOW

The intended prototype relationship is:

E09 Regulatory Journey

→ Click requirement node

→ E10 Requirement Detail

From E10:

Start Application
→ E14 Application Workspace

View Documents
→ E11 Document Centre

View specific document/help
→ E12 Document Detail / Help

View Journey / Dependency
→ E09 Regulatory Journey / E13 Dependency Graph

Regulatory Help
→ Contextual Regulatory Assistant / E34 pattern

Do not create dead-end interactions.

29. FINAL CONSISTENCY REQUIREMENT

Before finishing E10, verify that the new screen is consistent with the entire EKATMA architecture:

Business Profile / Business DNA
→ provides business facts

Regulatory Knowledge Engine
→ determines applicable requirements

Regulatory Journey
→ organizes requirements and dependencies

E10 Requirement Detail
→ explains one requirement

Document Centre
→ manages reusable documents

E14 Application
→ starts the actual service application

Department processing
→ updates shared application state

Approval
→ unlocks downstream requirements

Compliance
→ receives applicable obligations after approval

The E10 screen must therefore be an explanation and action layer over the shared regulatory model, not a separate source of truth.

Do not introduce:

A new Business DNA
A new requirement status model
A new document repository
A new dependency model
A new application ID
A separate MPCB-only architecture
An AI-based approval mechanism
Arbitrary document-readiness percentages

Keep the selected Business/Project context visible globally.

Keep all existing screens intact.

Append E10 to the current EKATMA Figma system; do not redesign the existing system.
