# EKATMA — MIDC Department-Side Figma Development Plan
## Maharashtra Industrial Approval, Compliance & Regulatory Intelligence System

> **Scope:** This file is the complete phase-by-phase Figma Make plan for designing the **MIDC Department / Officer side** of EKATMA.
>
> It is deliberately aligned to three sources at the same time:
>
> 1. the **Department / Officer UX workflow** (`deptmt.md`),
> 2. the **Adaptive Business Profile workflow**, and
> 3. the **Complete A–Z Master Feature Flow**.
>
> The aim is to avoid the inconsistency that can happen when the Entrepreneur flow and Department flow are designed independently.

---

# 0. NON-NEGOTIABLE FOUNDATION

The shared **Phase 0 government design system already exists**. Do not regenerate it.

Use the same visual foundation already used by the Entrepreneur side:

- Government of Maharashtra accessibility strip
- National Emblem + Satyameva Jayate
- Government of Maharashtra identity
- EKATMA identity
- same typography
- same colors
- same spacing system
- same button system
- same table system
- same status primitives
- same sidebar language
- same breadcrumbs
- same footer
- same GIGW-inspired accessibility behavior
- same English / Marathi compatibility

The MIDC portal is **not a visually separate website**. It is a government officer role inside the same EKATMA system.

The Department side may be denser and more operational, but it must still look unmistakably like the same product.

Do not use:
- glassmorphism
- neon gradients
- consumer-chatbot styling
- giant decorative cards
- unrelated startup dashboard patterns
- new colors or typography
- independent department branding systems that break EKATMA consistency

---

# 1. MIDC DEPARTMENT PRODUCT MODEL

The MIDC officer experience follows the generic department lifecycle:

```text
ENTREPRENEUR BUSINESS DNA
        ↓
REGULATORY ENGINE IDENTIFIES MIDC SERVICE
        ↓
ENTREPRENEUR SUBMITS MIDC APPLICATION
        ↓
ROLE-BASED MIDC ROUTING
        ↓
MIDC DESK / SERVICE QUEUE
        ↓
AUTOMATED PRE-CHECK
        ↓
SCRUTINY ROUTING
        ↓
MIDC SERVICE-SPECIFIC SCRUTINY
        ↓
DOCUMENT / DATA REVIEW
        ↓
CROSS-FORM CONSISTENCY
        ↓
DEPENDENCY REVIEW
        ↓
CONSOLIDATED QUERY IF NEEDED
        ↓
ENTREPRENEUR RESPONSE / RESUBMISSION
        ↓
DELTA RE-SCRUTINY
        ↓
INSPECTION IF REQUIRED
        ↓
FINAL DECISION
        ↓
APPROVE / CORRECTION / REJECT
        ↓
DEPENDENCY UPDATE
        ↓
CERTIFICATE / ORDER / CONDITIONS
        ↓
COMPLIANCE / RENEWAL / AMENDMENT LIFECYCLE
```

Running across the entire MIDC experience:

- desk-level tracking
- SLA tracking
- objective pre-checks
- document validity
- verified-data provenance
- cross-form consistency
- dependency visibility
- service-specific scrutiny
- explainable scrutiny routing
- consolidated deficiencies
- delta re-scrutiny
- common inspection planning
- officer regulatory RAG
- grievance escalation
- workload visibility
- process mining
- causal bottleneck analytics
- regulatory-change impact
- full audit history
- entrepreneur ↔ department synchronization

---

# 2. CRITICAL ALIGNMENT WITH THE ADAPTIVE BUSINESS PROFILE

The MIDC officer must **not reconstruct the entrepreneur's business manually**.

The Entrepreneur side has already created the Business DNA through the adaptive questionnaire.

MIDC receives the relevant parts of that same Business DNA.

## Business DNA available to MIDC

The application context can contain:

```text
PROJECT TYPE
- New
- Existing
- Expansion
- Modification

PROJECT CLASSIFICATION
- MSME
- Large
- Mega
- Needs Verification

BUSINESS IDENTITY
- Entity
- Business / project name
- Industry
- Activities
- Products / services
- Process

PROJECT STAGE
- Planning
- Land acquisition
- Pre-establishment
- Construction
- Installation
- Ready to operate
- Operational

LOCATION
- State
- District
- Taluka
- Village / City
- PIN

MIDC CONTEXT
- MIDC = Yes / No / Unknown
- MIDC estate
- Plot number
- Plot area
- Allotment status
- Possession status

LAND
- Land in possession?
- Land type
- Ownership / lease / purchase state
- Land-use state
- Land documents

PROJECT SCALE
- Investment
- Employment
- Production capacity

BUILDING
- New construction?
- Plot area
- Built-up area
- Floors
- Height
- Occupancy
- Construction status

UTILITIES
- Power requirement
- HT / normal
- Water requirement
- Water source
- Wastewater
- Drainage

ENVIRONMENT / SAFETY CONTEXT
- Air emissions
- Hazardous materials
- Hazardous waste
- Boiler
- Pressure vessel
- Dangerous machinery
- fire-related business flags

OPERATIONS / STORAGE / LOGISTICS / TRADE
- Warehouse
- Storage
- Import / Export
- Logistics
- Trade / distribution context

INCENTIVE ATTRIBUTES — CONTEXT ONLY UNLESS MIDC ADMINISTERS A CONFIGURED SCHEME
- Startup / MSME status where stored
- R&D orientation
- Export orientation
- Employment-intensive / environment-focused attributes
- Other scheme-defined attributes

EXISTING REGULATORY STATE
- Existing approvals
- Existing applications
- Previously uploaded / verified documents
```

## Important rule

Not every Business DNA field is automatically an MIDC decision parameter.

The officer interface must distinguish:

```text
APPLICATION FIELD
→ MIDC must scrutinise this for the current service

CONTEXT FIELD
→ useful for understanding project, dependency or risk

VERIFIED MASTER DATA
→ already sourced/verified; reusable

OTHER-DEPARTMENT FIELD
→ visible only as dependency/context; MIDC does not decide it
```

This distinction is essential.

---

# 3. ADAPTIVE PROFILE STATE MODEL MUST SURVIVE INTO MIDC

The Adaptive Business Profile stores question states such as:

```text
NOT_VISIBLE
VISIBLE
REQUIRED
ANSWERED
VALIDATED
CONFIRMED

Alternative states:
SKIPPED
NOT_APPLICABLE
NEEDS_REVIEW
```

MIDC must not treat `NOT_APPLICABLE` as missing information.

Examples:

```text
Boiler = NO
→ Boiler branch stored as NOT_APPLICABLE
→ MIDC should not raise a “missing boiler data” query.

MIDC = YES
→ MIDC-specific branch active.

MIDC = UNKNOWN
→ Needs Verification
→ officer sees source/context and can verify where relevant.

Land possession = YES
→ acquisition route may be skipped.

New construction = NO
→ construction-specific requirements should not appear unless another rule activates them.
```

The Department UI must preserve this adaptive logic rather than flattening every project into the same checklist.

---

# 4. BUSINESS PROFILE CHANGE / DELTA RULE

If the entrepreneur changes a confirmed Business DNA field:

```text
CHANGED FIELD
      ↓
RE-EVALUATE RULES
      ↓
COMPARE OLD JOURNEY VS NEW JOURNEY
      ↓
NEW REQUIREMENTS?
REMOVED REQUIREMENTS?
NEW DOCUMENTS?
CHANGED DEPENDENCIES?
CHANGED COMPLIANCE?
      ↓
MIDC APPLICATION IMPACT
```

MIDC officers should see:

- old value
- new value
- source
- reason for change
- affected MIDC service
- downstream dependency effect
- whether re-scrutiny is required

This connects the adaptive profile directly to delta re-scrutiny and expansion/modification workflows.

---

# 5. MIDC SERVICE MODEL

Do **not** hard-code the dashboard around a single MIDC service.

The MIDC department workspace must support multiple MIDC service families.

From the project architecture, MIDC-related journeys may include configurable nodes such as:

- MIDC land / plot-related workflow
- existing MIDC plot / registered plot context
- land allotment / possession-related service
- building / planning service
- provisional fire-related planning node where configured in the journey
- MIDC water route where applicable
- drainage / related infrastructure service where configured
- construction / planning follow-up
- amendment / modification / expansion services
- other MIDC services added to the regulatory catalogue later

The Figma architecture must therefore be:

```text
MIDC DEPARTMENT
      ↓
SERVICE CATALOGUE
      ↓
SERVICE-SPECIFIC APPLICATION
      ↓
COMMON OFFICER WORKSPACE
      ↓
CONFIGURABLE REVIEW PARAMETERS
```

Never build a totally different officer dashboard for every MIDC service.

---

# 6. MIDC ↔ OTHER DEPARTMENT DEPENDENCY MODEL

MIDC is one department inside a much larger regulatory journey.

The MIDC officer may need visibility into external nodes such as:

- MPCB
- Fire
- DISH
- Boiler
- utilities
- sector-specific authorities

but must not receive their decision controls.

Example dependency context from the master journey:

```text
MIDC / LAND STAGE
        ↓
MPCB CTE
        ↓
BUILDING / PLANNING
        ↓
PROVISIONAL FIRE
        ↓
UTILITIES + CONDITIONAL NOCs
        ↓
CONSTRUCTION
        ↓
PRE-OPERATION APPROVALS
```

The exact prerequisite for a particular service must come from the configurable rule/dependency data.

The MIDC screen must show:

- prerequisite complete
- prerequisite missing
- prerequisite pending
- downstream services
- parallel services
- external department node
- MIDC-controlled node
- blocked node
- unlocked node

---

# 7. MIDC ROLE & PERMISSION PRINCIPLE

Do not invent a rigid real-world internal MIDC hierarchy in Figma unless backed by configured data.

The officer does **not** choose department, office, desk or role at login.

The backend maps the User ID to the officer's authorised context:

```text
USER ID
   ↓
AUTHENTICATED ACCOUNT
   ↓
DEPARTMENT = MIDC
REGION / OFFICE = assigned
SERVICE SCOPE = assigned
DESK = assigned
ROLE = assigned
PERMISSIONS = assigned
```

These values are displayed after login and control what the officer can see/do.

Prototype desk labels may be used for demonstration, such as:

- Intake / Document Desk
- Land / Plot Scrutiny
- Planning / Building Scrutiny
- Utility / Water Scrutiny
- Inspection
- Decision
- Regulatory Admin

but they must be presented as **workflow desk examples**, not claims about official MIDC organisational structure.

---

# 8. MIDC PAGE MAP

The final Figma should cover the following logical pages:

```text
M01  MIDC Department Login
M02  MIDC Department Home
M03  MIDC Queue / Inbox
M04  MIDC Application Search
M05  MIDC Service / Queue Segmentation
M06  Application Overview
M07  Business DNA / Adaptive Profile Context
M08  Application Timeline
M09  Automated Pre-check
M10  Scrutiny Route / Explainability
M11  Land / Plot Scrutiny Workspace
M12  Land / Plot Parameter Detail
M13  Land / Plot Document Review
M14  Building / Planning Scrutiny
M15  Water / Utility / Drainage Scrutiny
M16  Cross-form Consistency
M17  Regulatory Dependency View
M18  Consolidated Query Builder
M19  Query / Response History
M20  Delta Re-scrutiny
M21  Inspection Queue
M22  Inspection Planning
M23  Inspection Workspace
M24  Observation / Re-inspection
M25  Decision Workspace
M26  Approval / Rejection / Correction Record
M27  Dependency Update + Entrepreneur Sync
M28  MIDC Conditions / Compliance / Renewal Context
M29  Expansion / Amendment Intake
M30  SLA Dashboard
M31  Escalation / Grievance
M32  Officer Regulatory RAG
M33  Regulatory Change Centre
M34  Regulatory Impact Analysis
M35  Department Analytics
M36  Bottleneck Analytics
M37  Workload / Capacity
M38  Audit / History
M39  Notifications
```

The prompts below create these screens in a manageable order.

---

# 9. FIGMA PROMPT EXECUTION RULES

Use these prompts **one at a time in order**.

For every prompt:

1. Continue from the current Figma file.
2. Do not regenerate Phase 0.
3. Preserve government header / footer / branding.
4. Preserve entrepreneur-side design language.
5. Reuse generic components.
6. Create only the requested feature-specific components.
7. Keep previous screens intact.
8. Use Auto Layout.
9. Use realistic but prototype-safe sample data.
10. Keep `Department = MIDC` visible in officer context.
11. Keep `Region/Office + Desk + Role` visible where relevant.
12. Do not create undocumented legal thresholds.
13. Use `Needs Verification` where rules are uncertain.
14. Do not let AI approve or reject.
15. Separate machine facts from warnings and officer judgment.
16. Preserve version history.
17. Make all important automated results explainable.
18. Show source/provenance for important business data.
19. Remember the entrepreneur's adaptive Business DNA is the source context.
20. MIDC officers can see other departments as dependencies but cannot decide for them.

---

# 9A. CROSS-FILE CONSISTENCY LOCK

The following rules override any accidental contradictory wording in a later prompt.

## Department Login

```text
User ID
+ Password
+ CAPTCHA
→ Authenticate
→ Load mapped MIDC account context
```

No Department / Office / Desk / Role / Service selector is shown on the login form.

## Canonical Application States

The MIDC Department side and Entrepreneur side must use the same underlying application states:

```text
DRAFT
READY_TO_SUBMIT
SUBMITTED
FEE_CONFIRMED
DOCUMENT_SCRUTINY
INITIAL_SCRUTINY
TECHNICAL_SCRUTINY
QUERY_RAISED
CORRECTION_REQUIRED
RESUBMITTED
INSPECTION_PENDING
INSPECTION_SCHEDULED
FINAL_DECISION
APPROVED
REJECTED
```

A service may skip states that do not apply, but it must not invent a conflicting status vocabulary for the same underlying record.

Operational labels such as `Awaiting Entrepreneur Response`, `SLA Risk`, or `Decision Pending` may be shown as action/queue overlays, not as contradictory canonical application records.

## Officer Context vs Application Context

Keep these separate:

```text
OFFICER CONTEXT
- Assigned MIDC office / region
- Assigned desk
- Role
- Permissions

APPLICATION CONTEXT
- Application's current desk
- Application's service
- Application's current state
- Application's SLA
```

An officer's assigned desk and an application's current desk are not the same field.

## Adaptive Profile State vs Verification State

Do not mix questionnaire state with data verification.

Question / branch state:

```text
NOT_VISIBLE
VISIBLE
REQUIRED
ANSWERED
VALIDATED
CONFIRMED
SKIPPED
NOT_APPLICABLE
NEEDS_REVIEW
```

Data verification state:

```text
SELF_DECLARED
USER_CONFIRMED
SYSTEM_VERIFIED
DEPARTMENT_VERIFIED
NEEDS_VERIFICATION
INVALID
EXPIRED
```

For example, `SELF_DECLARED` is a verification/source state; it is not an adaptive question state.

A skipped adaptive branch remains stored as `NOT_APPLICABLE`; it is not treated as missing data.

## MIDC Applicability Boundary

```text
MIDC = NO
→ do not create an MIDC-specific service merely because MIDC screens exist.

MIDC = UNKNOWN
→ preserve Needs Verification until applicability/jurisdiction is resolved.

MIDC = YES
→ activate only the MIDC services actually produced by the regulatory journey.
```

If the entrepreneur already has valid land/plot possession and no land-acquisition/allotment service is required, do not force a new MIDC land application. The verified land/plot context may still be reused in MIDC planning/building/water services.

## Current Prototype OCR Boundary

Document OCR/extraction is a later enhancement, not a dependency of the current MIDC Figma flow.

The current design must work with:
- uploaded documents,
- user-entered metadata,
- approval-generated certificates,
- verified/reused system data.

Do not add OCR-specific review screens unless a later phase explicitly activates that feature.

## Incentive Boundary

The platform-level incentive lifecycle runs in parallel to the Business Profile.

The MIDC department dashboard should **not** contain incentive eligibility/claim decision screens by default unless a particular configured scheme explicitly makes MIDC the administering authority.

MIDC may see incentive-related Business DNA only as context where relevant.

## External Department Boundary

MIDC may view MPCB / Fire / DISH / Boiler / sector-service states as:
- prerequisite,
- dependency,
- context,
- parallel node,
- downstream node.

MIDC cannot approve, reject, edit or impersonate those departments' decisions.

## Rule / AI Boundary

RAG, automated pre-checks, scrutiny routing and change detection:
- explain,
- retrieve,
- compare,
- flag,
- prioritise.

They do not make the statutory approval/rejection decision.

---


# PROMPT 1 — MIDC DEPARTMENT LOGIN + AUTHENTICATED OFFICER SHELL

```text
Continue the existing EKATMA Phase 0 Figma file.

Create M01 — MIDC Department Login.

Do NOT redesign the government shell.

IMPORTANT:
The department login must be extremely simple.

The login form should contain ONLY:
- Officer / Department User ID
- Password
- CAPTCHA
- Login button

Optional utility links may include:
- Forgot Password
- Refresh CAPTCHA
- Help / Contact Support

DO NOT ask the officer to select:
- Department
- Region
- Office
- Desk
- Role
- Service
- Permission level

Those details are already mapped to the officer account in the backend and should load automatically only AFTER successful login.

LOGIN FLOW:

User ID
+ Password
+ CAPTCHA
        ↓
Authenticate
        ↓
Load officer account context automatically
        ↓
Department = MIDC
Region / Office = assigned account context
Desk = assigned workflow desk
Role = assigned role
Permissions = assigned permissions
        ↓
MIDC Department Home

After login, create the authenticated officer shell.

The top contextual area may display the automatically loaded officer context:
- Department: MIDC
- Assigned Region / Office
- Current Desk
- Role
- Search application
- Notifications
- Regulatory Assistant
- User profile

These are DISPLAYED AFTER LOGIN, not selected during login.

Example workflow desk labels may include:
- Intake / Document Desk
- Land / Plot Scrutiny
- Planning / Building Scrutiny
- Utility / Water Scrutiny
- Inspection
- Decision
- Regulatory Admin

Treat these as configurable workflow examples, not fixed official MIDC hierarchy.

Create the logged-in MIDC officer shell with the shared sidebar:

1. Department Home
2. My Queue
3. Applications
4. Scrutiny
5. Inspections
6. Queries / Deficiencies
7. Decisions
8. SLA & Escalations
9. Grievances
10. Regulatory Assistant
11. Analytics
12. Regulatory Changes
13. Workload
14. Audit / History

The visual system must remain identical to EKATMA Phase 0.

Prototype:
MIDC Login → successful authentication → MIDC Department Home.

Also create basic login states:
- Default
- Invalid User ID / Password
- Incorrect CAPTCHA
- CAPTCHA refreshed
- Loading / authenticating

Do not add any extra onboarding or role-selection screen.
```

---


# PROMPT 2 — MIDC DEPARTMENT HOME / OPERATIONAL COMMAND CENTRE

```text
Create M02 — MIDC Department Home.

This is an operational dashboard, not an entrepreneur dashboard.

It must answer:
1. What needs attention?
2. What is at SLA risk?
3. What inspections are pending?
4. Where are the current bottlenecks?

Use MIDC-context KPI cards:
- New applications
- Awaiting scrutiny
- Awaiting entrepreneur response
- Resubmissions received
- Inspection required
- Decision pending
- SLA risk
- SLA breached
- Escalated

Main panels:

A. MY ACTIONS
- Applications waiting for review
- Queries to finalise
- Resubmissions received
- Inspections to schedule
- Decisions pending

B. SLA RISK
Application / Service / Current desk / Days elapsed / SLA / State

C. INSPECTION QUEUE
Upcoming / overdue / re-inspection

D. BOTTLENECKS
Examples based on current process data:
- Land / plot document issue
- Planning-document correction
- Inspection scheduling
- Repeated missing evidence
Do not invent permanent bottlenecks; label these as sample current insights.

E. WORKLOAD
By service / desk / office / application age

F. SERVICE MIX
Land/plot / planning-building / water-utility / amendment / other configured MIDC services

Every card must drill down into queue/search/analytics.
```

---


# PROMPT 3 — MIDC QUEUE / INBOX + APPLICATION SEARCH

```text
Create:
M03 — MIDC Queue / Inbox
M04 — Application Search

M03 QUEUE

Columns:
- Application ID
- Business
- Applicant
- MIDC service
- Project stage
- Current desk
- Received date
- SLA
- Scrutiny route
- Dependency impact
- Action required
- Status

Filters:
- New
- In scrutiny
- Query required
- Awaiting entrepreneur
- Resubmission
- Inspection
- Decision pending
- SLA risk
- SLA breached
- Service
- Office / region
- Project stage

Sort:
- Oldest
- SLA risk
- Received date
- Dependency impact
- Scrutiny route

Do NOT rank “best applications”.

M04 SEARCH

Search across permitted scope by:
- Application ID
- Business
- Applicant
- Service
- District
- MIDC estate
- Plot number
- Status
- date
- approval/order number

Search result → M06 Application Overview.

Keep all list components reusable for every MIDC service.
```

---


# PROMPT 4 — MIDC SERVICE SEGMENTATION & ROUTING CONTEXT

```text
Create M05 — MIDC Service / Queue Segmentation.

Purpose:
Show that MIDC is not one single approval queue.

Create configurable service groups such as:
- Land / Plot
- Building / Planning
- Water / Utility
- Drainage / Infrastructure
- Construction / follow-up
- Amendment / Modification
- Other configured MIDC services

For each service group show:
- New
- Under review
- Query
- Resubmission
- Inspection
- Decision pending
- SLA risk

Add routing context:
Application
→ Service
→ Office / region
→ Desk
→ role

Do not assert a fixed official internal hierarchy.
All routing labels should be configurable.

Show a “Routing Rules” information panel:
- Business location
- MIDC estate / plot
- service
- project stage
- configured jurisdiction
determine where the application is routed.

Do not expose entrepreneur-only controls.
```

---


# PROMPT 5 — APPLICATION OVERVIEW: SINGLE SOURCE OF TRUTH

```text
Create M06 — MIDC Application Overview.

This is one of the most important screens.

Header:
- Application ID
- Business / Project
- MIDC service
- Status
- Current desk
- SLA
- Scrutiny route
- Office/region

Summary cards:
- Business
- Project stage
- Location
- MIDC estate / plot
- Service
- Submission date
- Fee / challan status where the service uses a fee
- Current desk
- SLA
- Dependencies
- Inspection requirement

Create tabs:
1. Overview
2. Business DNA
3. Application
4. Documents
5. Consistency
6. Dependencies
7. Queries
8. Inspection
9. Timeline
10. Regulatory Reference
11. Audit

Automated summary:
- completeness
- missing data
- expired docs
- cross-form mismatch
- prerequisite state
- adaptive-profile Needs Verification items
- change since previous version
- inspection trigger
- scrutiny flags

The officer must understand the entire applicant story before taking action.
```

---


# PROMPT 6 — ADAPTIVE BUSINESS DNA / PROFILE CONTEXT FOR MIDC

```text
Create M07 — Business DNA / Adaptive Profile Context.

This screen is critical for alignment with the Entrepreneur Adaptive Business Profile.

Show the entrepreneur's confirmed Business DNA, grouped into:

PROJECT
- New / Existing / Expansion / Modification
- classification
- stage

IDENTITY
- entity
- business/project
- industry
- activities
- products/process

LOCATION / MIDC
- district / taluka / city
- MIDC state
- estate
- plot
- plot area
- allotment status
- possession

LAND
- land type
- ownership/lease
- possession
- land-use state
- documents

SCALE
- investment
- workforce
- production capacity

BUILDING
- construction state
- area
- floors
- height
- occupancy

UTILITIES
- power
- water
- water source
- wastewater
- drainage

ENVIRONMENT / SAFETY CONTEXT
- emissions
- hazardous material
- hazardous waste
- boiler
- pressure vessel
- dangerous machinery
- fire-related flags
- environmental / pollution classification if already produced by the regulatory engine or competent external department — context only

STORAGE / LOGISTICS / TRADE
- warehouse / storage
- import / export
- logistics
- distribution / trade context

INCENTIVE ATTRIBUTES
- visible only as Business DNA context unless MIDC is the configured administering authority for a scheme

EXISTING REGULATORY CONTEXT
- existing approvals
- existing applications

Every field must display:
- Value
- Source
- Adaptive question / branch state
- Data verification state
- Last updated
- Used by / relevant services
- Adaptive branch trigger / why this field was asked, where useful

Keep the two state systems separate.

Adaptive question / branch states:
NOT_VISIBLE
VISIBLE
REQUIRED
ANSWERED
VALIDATED
CONFIRMED
SKIPPED
NOT_APPLICABLE
NEEDS_REVIEW

Data verification states:
SELF_DECLARED
USER_CONFIRMED
SYSTEM_VERIFIED
DEPARTMENT_VERIFIED
NEEDS_VERIFICATION
INVALID
EXPIRED

Important:
NOT_APPLICABLE is not missing.
SKIPPED branches remain stored as NOT_APPLICABLE.
NEEDS_REVIEW / NEEDS_VERIFICATION is not an automatic rejection.
SELF_DECLARED is not a question-state label.

Create filters:
- MIDC Review Fields
- Context Only
- Other Department
- Needs Verification
- Changed Since Submission
```

---


# PROMPT 7 — DATA PROVENANCE + FIELD-LEVEL TRACEABILITY

```text
Extend M07 with a field-level provenance drawer.

For any important value, officer can open:

VALUE
SOURCE
VERIFICATION
ISSUE DATE
EXPIRY DATE
LAST UPDATED
USED BY
PREVIOUS VALUE
CURRENT VALUE
CHANGE REASON

Example:
Plot Area: 4,800 m²
Source: MIDC allotment document / entrepreneur profile
Verification: Verified
Used by:
- MIDC land service
- building/planning application
- MPCB application
- Fire application

Create clear distinctions:
- Machine-verified fact
- Previously verified government-issued data
- Entrepreneur self-declaration
- Document-derived data only if a later OCR/extraction phase is explicitly enabled
- Needs officer verification

Do not allow silent overwriting of master data.

If the officer proposes/records a verified correction, preserve:
old value → new value → source → timestamp.

This component will later support audit and cross-form consistency.
```

---


# PROMPT 8 — APPLICATION TIMELINE + DESK-BY-DESK SLA HISTORY

```text
Create M08 — Application Timeline.

Show full lifecycle:

Submitted
↓
Fee / Challan
↓
Document Desk
↓
Initial Scrutiny
↓
Technical / Service Scrutiny
↓
Inspection if applicable
↓
Decision

Every event:
- timestamp
- desk
- role/officer
- action
- status
- comment
- entrepreneur response
- time spent

Timing breakdown:
- MIDC processing time
- Entrepreneur response time
- Current desk time
- Inspection waiting
- External dependency wait
- Total elapsed

Show SLA:
Day X / Y
Normal / Approaching / Breached

If application moved because a prerequisite became available, record the dependency event.

If application paused awaiting entrepreneur response, show that separately from department processing time.

This same timeline must later be visible in simplified form on Entrepreneur side.
```

---


# PROMPT 9 — AUTOMATED PRE-CHECK FOR MIDC APPLICATIONS

```text
Create M09 — Automated Pre-check.

Purpose:
Perform objective checks before manual MIDC scrutiny.

Show machine/system checks separately from officer judgment.

Check groups:

FORM
- mandatory fields present
- dependent form complete
- declaration complete
- basic format

PAYMENT / CHALLAN
- fee state available where applicable
- paid / pending / failed / not applicable
- read-only verified payment reference when received from the submission/payment flow

DOCUMENTS
- required docs present
- issue/expiry
- reusable verified doc available
- missing/expired/invalid warning

BUSINESS DNA
- required profile fields available
- `NOT_APPLICABLE` respected
- unresolved `NEEDS_REVIEW` visible

MIDC / LAND CONTEXT
- MIDC estate / plot / possession fields available where required
- land information consistent with submitted application

CROSS-FORM
- plot area mismatch
- building area mismatch
- investment mismatch
- project location mismatch
- company identity mismatch

DEPENDENCIES
- prerequisite approved?
- prerequisite pending?
- external department dependency?

CHANGE
- did common project data change after draft/submission?

Output states:
✓ Machine-verified
⚠ Warning
○ Needs officer judgment

Never label an AI interpretation as a legal finding.

CTA:
Proceed to Scrutiny.
```

---


# PROMPT 10 — MIDC SCRUTINY ROUTER / EXPLAINABILITY

```text
Create M10 — MIDC Scrutiny Route / Explainability.

The department workflow requires:
- Standard Review
- Enhanced Review
- Inspection-heavy Route

For MIDC, do NOT invent a permanent legal risk formula or numeric AI score.

Instead design a configurable, explainable scrutiny-routing panel.

Possible prototype scrutiny triggers may include:
- service type
- project scale / complexity
- new construction
- land/plot inconsistency
- unresolved prerequisite
- major cross-form mismatch
- hazardous/fire business context
- material change from previous submission
- inspection requirement
- other configured MIDC rule

Label them:
“Configured Scrutiny Factors”
not “Official MIDC Risk Law” unless source-backed.

Show:
SCRUTINY ROUTE
Why this route?
Triggered factors
Required review depth
Inspection required? Yes/No/Conditional

Critical text:
“Scrutiny route determines how deeply the application is reviewed. It does not automatically approve or reject the application.”

Officer can drill into source/rule for each factor.
```

---


# PROMPT 11 — GENERIC MIDC SCRUTINY WORKBENCH + LAND / PLOT FIRST SERVICE PACK

```text
Create M11 — Generic MIDC Scrutiny Workbench, instantiated first with the Land / Plot service pack.

This M11 screen is the MIDC implementation of the generic Department Scrutiny Workspace from the Department workflow.

Build ONE reusable scrutiny workbench:

LEFT
Application sections

CENTER
Current parameter / evidence

RIGHT
Regulation / source / dependency / officer notes / RAG

The same workbench must later be reused by Building / Planning, Water / Utility, Amendment and any other configured MIDC service. Do not create unrelated scrutiny UI patterns for different MIDC services.

For the first service pack, MIDC LAND / PLOT CONTEXT should support:
- MIDC estate
- plot number
- plot area
- allotment status
- possession status
- project type
- project stage
- proposed industry/activity
- land documents
- investment/project context
- existing plot / new plot route
- related existing approval/application

For each reviewable parameter:
- Value
- Source
- Verification state
- Related document
- Cross-form values
- Previous value
- Dependency impact

Officer states:
- Valid
- Query
- Invalid
- Needs Verification

Actions:
Save Review
Flag
Raise Query
Mark Valid
Request Additional Evidence
Open Regulatory Reference

Do not include fields that were adaptive-profile `NOT_APPLICABLE`.

Do not force the officer to re-enter entrepreneur data.
```

---


# PROMPT 12 — GENERIC PARAMETER DETAIL + DOCUMENT REVIEW — LAND / PLOT EXAMPLE

```text
Create:
M12 — Generic Parameter Detail, demonstrated with a Land / Plot parameter
M13 — Generic Document Review, demonstrated with Land / Plot evidence

These components must be reusable by every MIDC service pack.

M12 example parameter:
Plot Area

Show:
- Master Project Dossier value
- current MIDC application value
- source
- verification
- previous value
- related services
- related documents
- related dependency
- cross-form values
- audit history

M13 document review:
Support:
- sale / lease / allotment / possession / land record / land-use related evidence / other configured document

For each:
- Preview
- Type
- Issue date
- Expiry if relevant
- Source
- Verification
- Version
- Reuse history
- Other applications using it

Actions:
Accept
Request correction
Mark invalid
Request additional evidence
Verify

Do not overwrite the master document.
Preserve version history.

If document is already verified and reused, clearly show:
“Previously verified — reused from Business Document Repository.”
```

---


# PROMPT 13 — MIDC BUILDING / PLANNING SCRUTINY

```text
Create M14 — Building / Planning Scrutiny.

This is a MIDC service-specific view built on the same common workbench.

Use Business DNA context:
- plot
- plot area
- new construction / modification
- built-up area
- floors
- building height
- occupancy
- construction status
- industrial machinery flag
- hazardous / flammable flag
- warehouse
- project stage
- relevant prerequisite state

Show dependencies.

For the baseline EKATMA demo journey, preserve the A–Z master sequence:
MIDC / land context
→ MPCB Consent to Establish
→ MIDC Building / Planning + related Provisional Fire stage where applicable.

Therefore the prototype Building / Planning example should show MPCB CTE as an upstream external-department dependency.

Keep the dependency engine configurable because not every MIDC service uses the same prerequisites.

Display:
Prerequisite → source department → status → evidence / approval reference

Do not allow MIDC officer to decide the external department's approval.

Review groups:
- Project / plot identity
- Plan/application data
- building parameters
- prerequisite documents
- technical documents
- conditional documents
- consistency checks

Support:
Valid / Query / Invalid / Needs Verification

If Provisional Fire is represented as a combined/related node in the configured workflow, show that relationship, but do not assume the same arrangement for every service or location.
```

---


# PROMPT 14 — MIDC WATER / UTILITY / DRAINAGE SCRUTINY

```text
Create M15 — Water / Utility / Drainage Scrutiny.

This screen must be activated only for the relevant MIDC service.

In the baseline A–Z journey, utilities appear after the Building / Planning stage and may proceed in parallel with other conditional NOCs where dependencies allow. Preserve that relationship in the dependency context.

Use adaptive Business DNA:
- water required?
- water quantity
- water source
- MIDC water route?
- project location / estate / plot
- project stage
- wastewater
- drainage flags
- construction / operation context

Important adaptive logic:
If water = NO → water-specific application should not appear unless rule/configuration says otherwise.
If source ≠ MIDC → do not force MIDC water workflow.
If source = MIDC → MIDC water service may be active.
If drainage = NOT_APPLICABLE → do not query missing drainage fields.

Review:
- applicant data
- plot/project context
- documents
- dependency
- previous approved data
- consistency with other applications

Use the same:
Valid / Query / Invalid / Needs Verification states.

Keep utility service configurable; do not invent unsupported technical thresholds.
```

---


# PROMPT 15 — CROSS-FORM CONSISTENCY ACROSS MIDC + OTHER DEPARTMENTS

```text
Create M16 — Cross-form Consistency.

Purpose:
MIDC must see contradictions involving the same Business DNA field across applications.

Compare:
- plot area
- project location
- building area
- investment
- employees
- production capacity
- water requirement
- company identity
- project stage
- other shared master fields

Example:
Master Profile       Plot Area 4,800 m²
MIDC Land            4,800 ✓
MIDC Building        4,800 ✓
MPCB                  4,800 ✓
Fire                  4,600 ⚠

Show source/provenance for each value.

Officer actions:
- Accept verified source
- Raise query
- Record justified exception
- Request entrepreneur clarification

Important:
MIDC can identify an inconsistency involving another department's form, but it cannot edit that department's record.

Never silently sync conflicting values.
```

---


# PROMPT 16 — REGULATORY DEPENDENCY VIEW: MIDC IN THE FULL BUSINESS JOURNEY

```text
Create M17 — Regulatory Dependency View.

This page must align with the A–Z Master Journey.

Show the selected MIDC service inside the entrepreneur's complete journey.

Possible context:
LAND
↓
MIDC land / plot node
↓
MPCB CTE
↓
MIDC / planning node
↓
Provisional Fire
↓
Utilities + conditional NOCs
↓
Construction
↓
Pre-operation approvals

Use configured dependencies rather than hard-coded universal logic.

For current MIDC node show:
- prerequisites
- prerequisite department
- prerequisite status
- parallel services
- downstream nodes
- nodes currently blocked
- nodes that will unlock if approved
- entrepreneur actions blocking progress
- external-department dependencies

Color + icon + text states:
Complete
Pending
Blocked
Ready
Rejected
Needs Verification
Parallel

The officer should understand the wider business journey without gaining action controls for other departments.
```

---


# PROMPT 17 — CONSOLIDATED MIDC QUERY BUILDER + RESPONSE HISTORY

```text
Create:
M18 — Consolidated Query Builder
M19 — Query / Response History

M18:
Avoid repeated one-by-one query loops.

Allow officer to group unresolved issues:
- Land / Plot
- Building / Plan
- Utility / Water
- Document
- Data inconsistency
- Dependency
- Technical issue
- Other

Each deficiency:
- Issue
- Evidence
- Related field
- Required correction
- Supporting regulation
- Document requested
- Officer comment

System should show:
Previously raised and resolved issues
Still unresolved issues
Potential duplicate query warning

CTA:
Send Consolidated Deficiency

M19:
Timeline:
Query #1
→ entrepreneur response
→ correction
→ resubmission
→ officer review

Show:
- query
- officer/desk
- date
- entrepreneur response
- changed fields
- replaced documents
- unresolved issues
- time entrepreneur took to respond

The entrepreneur-side Query page must be able to display the exact same deficiency IDs and comments.
```

---


# PROMPT 18 — DELTA RE-SCRUTINY + ADAPTIVE BUSINESS CHANGE IMPACT

```text
Create M20 — Delta Re-scrutiny.

When entrepreneur resubmits, show:

CHANGED
A → B

AFFECTED BY CHANGE
fields/dependencies that must be rechecked

UNCHANGED
everything else

Example:
Plot Area: 4,800 → 5,200
Building Area: 2,000 → 2,300
Updated plan: v1 → v2

Then show:
Affected MIDC service parameters
Affected dependency nodes
Affected external journey nodes
Possible document impact
Possible inspection impact

Tabs:
Changed
Affected
Unchanged

If change originated from the Adaptive Business Profile after confirmation, show:
“Business DNA changed after original submission.”

If expansion/modification workflow created the change, show:
Current project → Proposed project → Delta.

Core principle:
Do not force the officer to re-read unchanged information unless the applicable process requires it.

Preserve every version.
```

---


# PROMPT 19 — MIDC INSPECTION QUEUE + COMMON INSPECTION PLANNING

```text
Create:
M21 — Inspection Queue
M22 — Inspection Planning

M21 columns:
- Application
- Business
- MIDC service
- Site / estate / plot
- Inspection type
- Required by
- Status
- Assigned inspector/team
- Target date
- SLA impact
- Re-inspection flag

Filters:
Service / office / district / date / pending / scheduled / completed / re-inspection

M22:
Workflow:
Inspection requirements
→ identify site visit
→ find compatible inspection windows
→ coordinate where permitted
→ create inspection plan

Show common-inspection possibility with other departments only when compatible.

Example context:
MIDC service inspection
+
Fire
+
DISH
or other configured inspection

Do not assume they can always be merged.

Plan:
- date
- time
- site
- MIDC inspector/team
- other participating department/team
- shared documents
- MIDC checklist
- other department checklist references
- entrepreneur preparation requirements

Calendar + list.
```

---


# PROMPT 20 — INSPECTION WORKSPACE + OBSERVATION + RE-INSPECTION

```text
Create:
M23 — Inspection Workspace
M24 — Observation / Re-inspection

M23:
Sections:
- Business/site
- MIDC estate / plot
- related application
- shared documents
- MIDC service checklist
- observation entry
- evidence
- photos/documents placeholder if supported
- status
- recommendation/action

Outcomes:
Pass
Observation
Non-compliant
Correction required
Re-inspection required

M24:
Show:
- original observation
- required correction
- entrepreneur response
- new evidence
- date submitted
- officer review
- re-inspection date
- resolution state

Timeline:
Inspection
→ Observation
→ Correction
→ Evidence
→ Re-inspection
→ Resolved

The entrepreneur Inspection Centre must later reflect the same observation/evidence/re-inspection records.
```

---


# PROMPT 21 — MIDC DECISION WORKSPACE + APPROVAL / REJECTION / CORRECTION

```text
Create:
M25 — Decision Workspace
M26 — Approval / Rejection / Correction Record

M25:
Bring together:
- scrutiny completion
- document review
- cross-form mismatches
- queries/responses
- inspection outcome
- scrutiny route
- dependencies
- SLA
- relevant regulation
- approval conditions

Decision states:
APPROVE
CORRECTION REQUIRED
REJECT

The system organises evidence.
The authorised officer remains responsible for the statutory decision.

Before final decision, show:
“What downstream workflow will this decision unlock/block?”

M26 APPROVAL:
Store:
- approval/order
- certificate if applicable
- issue date
- expiry date if applicable
- conditions
- special conditions
- source
- application history
- decision role/officer
- version

REJECTION:
- detailed reason
- officer remarks
- supporting basis/source
- appeal/grievance/reapply info if configured

CORRECTION:
- exact deficiencies
- affected fields/docs
- entrepreneur action

Every final record must remain auditable.
```

---


# PROMPT 22 — DEPENDENCY PROPAGATION + ENTREPRENEUR SYNC + CONDITIONS

```text
Create M27 — Dependency Update + Entrepreneur Synchronization.

After MIDC decision:

APPROVED
→ MIDC node complete
→ dependent nodes unlock where configured
→ approval/certificate stored
→ entrepreneur journey updates
→ reusable data/document becomes available

CORRECTION
→ MIDC node remains active
→ dependent nodes remain blocked where required
→ entrepreneur gets exact action

REJECTED
→ node rejected
→ dependent nodes remain blocked where applicable
→ reason propagates to journey

Show:
- Before decision dependency state
- After decision dependency state
- External departments affected
- entrepreneur notification generated
- certificate/document added to repository
- conditions sent to compliance engine if applicable

Do not automatically alter another department's final decision.
Only update dependency availability/state.

Create a synchronization audit line:
MIDC Decision Event → Journey Engine → Entrepreneur View → Other Eligible Queues.
```

---


# PROMPT 23 — MIDC POST-DECISION CONDITIONS, COMPLIANCE, RENEWAL & AMENDMENT INTAKE

```text
Create:
M28 — MIDC Conditions / Compliance / Renewal Context
M29 — Expansion / Amendment Intake

M28:
The A–Z master flow converts approval conditions into compliance obligations.

For MIDC decisions, support this generically:
Approval/order
→ validity if applicable
→ renewal if applicable
→ reporting/condition if applicable
→ inspection if applicable
→ compliance obligation

Do not fabricate obligations for every MIDC service.
Only show obligations generated by configured service rules / approval conditions.

Officer view:
- source approval
- condition
- due/frequency
- entrepreneur status
- evidence
- verification state
- renewal/amendment link

M29:
When entrepreneur changes Business DNA:
- increase capacity
- expand building
- additional plot/land
- change activity/product
- change water requirement
- other configured change

Show:
Current value
Proposed value
Delta
Affected MIDC services
Amendment required?
New MIDC service?
Inspection impact?
Document update?
External dependency impact?

This is the department intake for the Entrepreneur Business Change Simulator.

Do not destroy old approval history.
Create a new amendment/change version.
```

---


# PROMPT 24 — SLA, ESCALATION, GRIEVANCE & NOTIFICATIONS

```text
Create:
M30 — SLA Dashboard
M31 — Escalation / Grievance
M39 — Notifications

M30 SLA:
Track:
- MIDC processing time
- entrepreneur response time
- current desk time
- inspection wait
- external dependency time
- total elapsed

States:
Normal
Approaching deadline
SLA exceeded

Views:
- service
- desk
- office
- age
- SLA risk
- breached

M31:
Grievance reasons:
- SLA breach
- unresolved query
- department delay
- incorrect status
- inspection delay
- other

Auto-attach:
Application ID / service / desk / submission / SLA / query history /
entrepreneur response time / MIDC processing time / inspection / previous escalation

Path:
Problem
→ application-linked grievance
→ relevant role/nodal level
→ escalation
→ resolution
→ journey status update

M39 Notifications:
- New application
- Query response
- Resubmission
- Inspection due
- Inspection reschedule
- SLA risk/breach
- Dependency unlock
- Regulatory change
- Grievance
- Decision pending
- entrepreneur profile change impacting MIDC service

Every notification answers:
WHAT?
WHY?
WHAT ACTION?
WHEN?
```

---


# PROMPT 25 — MIDC REGULATORY RAG + REGULATORY CHANGE + ANALYTICS + AUDIT + FINAL INTEGRATION

```text
Create and integrate:

M32 — Officer Regulatory RAG
M33 — Regulatory Change Centre
M34 — Regulatory Impact Analysis
M35 — Department Analytics
M36 — Bottleneck Analytics
M37 — Workload / Capacity
M38 — Audit / History

M32 OFFICER RAG

Questions:
- Why is this parameter checked?
- Which GR/rule applies?
- What clause defines this requirement?
- What evidence is expected?
- Has this changed?
- Latest circular?
- Explain Marathi / English.

Response:
Answer
Source
Clause
Effective date
Related requirement
Rule version

Boundary:
RAG retrieves/explains/cites.
It does NOT approve/reject/invent legal requirements.

M33 REGULATORY CHANGE CENTRE

This screen is permission-gated.

Regular MIDC officers may view published regulatory references and relevant change impact.
Only users with the configured Regulatory Admin permission may:
- Confirm
- Edit
- Reject
- Publish a regulatory rule/version.

Sources:
GRs / Acts / Rules / Circulars / department guidelines / forms / policy docs

Workflow:
New document
→ RAG detects possible change
→ threshold/form/SLA/condition/document impact
→ authorised regulatory admin review
→ Confirm / Edit / Reject
→ publish version

Never overwrite old rule silently.

M34 IMPACT ANALYSIS

Affected:
- MIDC active applications
- draft applications
- submitted applications
- approvals
- renewals
- compliance obligations
- document requirements
- department procedure
- affected entrepreneur journeys

Actions:
Notify entrepreneur
Notify officers
Update validated requirement
Preserve rule version

M35 ANALYTICS

Respect permission scope:
- an officer sees analytics within authorised scope,
- department/office-wide leadership views require the relevant permission.

Metrics:
- pending by service / desk / office
- average / median processing time
- SLA breaches
- query frequency / rounds
- common missing documents
- common inconsistencies
- correction / rejection reasons
- inspection wait
- rework loops
- dependency delays
- geographic/service bottlenecks
- grievance patterns
- amendment volumes
- configured MIDC compliance / renewal delays where such obligations exist
- common inspection coordination opportunities

Do not include incentive-claim analytics by default unless MIDC is actually configured as the administering authority for that scheme.

Use:
trend / funnel / queue ageing / process flow / drill-down table / dependency view

M36 CAUSAL BOTTLENECK

Do not stop at “X pending”.
Break elapsed time into:
- entrepreneur preparation/response
- document scrutiny
- technical/service scrutiny
- inspection waiting
- final decision
- external dependency

Show largest observed delay contributor for selected data.

No simplistic officer ranking.

M37 WORKLOAD

Views:
office / service / desk / application age

Show:
current queue / new today / due soon / SLA risk / breached /
inspection queue / decision queue

Use for allocation/planning, not public ranking.

M38 AUDIT

Record:
- who viewed
- who changed
- old/new value
- when
- why
- source
- decision
- query
- entrepreneur response
- inspection
- escalation
- rule version
- document version
- dependency update

FINAL INTEGRATION PASS

Connect:
Login
→ Home
→ Queue/Search
→ Application Overview
→ Business DNA
→ Pre-check
→ Scrutiny Router
→ Service Scrutiny
→ Documents
→ Consistency
→ Dependencies
→ Query
→ Delta Re-scrutiny
→ Inspection
→ Decision
→ Dependency Update
→ Compliance/Amendment
→ SLA/Grievance
→ RAG
→ Analytics/Regulatory Change/Audit

Consistency checks:
- Same Phase 0 shell
- Same application IDs across screens
- Same Business DNA values unless intentionally changed
- Same department/service names
- Same SLA state
- Same query/resubmission version
- Same inspection ID/state
- Same decision record
- Same dependency result as Entrepreneur side

Final mental model for MIDC officer:

WHAT CAME IN?
↓
WHAT DOES THE ENTREPRENEUR BUSINESS DNA ALREADY TELL ME?
↓
IS THE APPLICATION COMPLETE?
↓
WHAT IS VERIFIED / SELF-DECLARED / NOT APPLICABLE / NEEDS REVIEW?
↓
WHAT MIDC SERVICE AM I REVIEWING?
↓
WHAT DOES THIS SERVICE REQUIRE?
↓
WHAT IS INCONSISTENT?
↓
WHAT DEPENDENCY IS MISSING?
↓
DO I NEED A QUERY?
↓
WHAT CHANGED ON RESUBMISSION?
↓
DO I NEED AN INSPECTION?
↓
WHAT DECISION IS SUPPORTED BY THE RECORD?
↓
WHAT DOES MY DECISION UNLOCK OR BLOCK?
↓
WHAT CONDITIONS / FOLLOW-UP DOES IT CREATE?
```

---


# 10. FINAL MIDC COVERAGE CHECKLIST

## Foundation
- [ ] Same Phase 0 government shell
- [ ] Login uses only User ID + Password + CAPTCHA
- [ ] Department / office / desk / role load automatically after authentication
- [ ] Configurable office / desk / role mapping
- [ ] No invented fixed hierarchy

## Adaptive Business Alignment
- [ ] Business DNA visible
- [ ] Question state preserved
- [ ] NOT_APPLICABLE respected
- [ ] NEEDS_REVIEW visible
- [ ] Verified vs self-declared distinction
- [ ] Source/provenance
- [ ] Old vs new Business DNA
- [ ] Expansion/modification delta

## MIDC Service Coverage
- [ ] Land / plot service pattern
- [ ] Existing plot / possession context
- [ ] Building / planning pattern
- [ ] Water / utility pattern
- [ ] Drainage / infrastructure pattern where configured
- [ ] Amendment / modification pattern
- [ ] Generic “other MIDC service” support

## Officer Operations
- [ ] Home
- [ ] Queue
- [ ] Search
- [ ] Service segmentation
- [ ] Application overview
- [ ] Timeline
- [ ] Pre-check
- [ ] Scrutiny route
- [ ] Parameter review
- [ ] Document review
- [ ] Cross-form consistency
- [ ] Dependencies
- [ ] Consolidated query
- [ ] Query history
- [ ] Delta re-scrutiny
- [ ] Inspection
- [ ] Decision
- [ ] Dependency propagation

## A–Z Master Flow Alignment
- [ ] Master data reuse
- [ ] Verified data provenance
- [ ] Document reuse
- [ ] Desk-by-desk tracking
- [ ] SLA
- [ ] Risk/scrutiny routing
- [ ] Cross-form consistency
- [ ] Consolidated queries
- [ ] Delta re-scrutiny
- [ ] Common inspection planning
- [ ] Approval/rejection/correction
- [ ] Dependency update
- [ ] Approval conditions → compliance where configured
- [ ] Business change / amendment
- [ ] Grievance/escalation
- [ ] Regulatory RAG
- [ ] Regulatory change impact
- [ ] Process mining
- [ ] Causal bottleneck analytics
- [ ] Workload
- [ ] Audit
- [ ] Notifications

## Cross-Role / Status Consistency
- [ ] Same canonical application-state dictionary as Entrepreneur side
- [ ] Operational queue labels do not replace canonical state
- [ ] Officer assigned desk is distinct from application current desk
- [ ] Adaptive question state is distinct from data verification state
- [ ] OCR is not required for the current prototype
- [ ] Incentive decision screens are absent unless MIDC is configured as scheme authority

## Cross-Department Alignment
- [ ] External department prerequisites visible
- [ ] MIDC cannot decide external services
- [ ] MIDC decision can unlock downstream nodes
- [ ] Parallel services visible
- [ ] Entrepreneur sees same status/query/inspection/decision data
- [ ] Same Application ID and Business ID
- [ ] Same dependency graph state

---

# 11. ENTREPRENEUR ↔ MIDC HANDOFF CONTRACT

```text
ENTREPRENEUR ADAPTIVE PROFILE
        ↓
BUSINESS DNA
        ↓
REGULATORY ENGINE
        ↓
MIDC SERVICE IDENTIFIED
        ↓
ENTREPRENEUR APPLICATION
        ↓
PRE-VALIDATION
        ↓
SUBMIT
        ↓
MIDC QUEUE
        ↓
MIDC APPLICATION OVERVIEW
        ↓
MIDC SEES BUSINESS DNA + SOURCE + DEPENDENCY
        ↓
PRE-CHECK
        ↓
SCRUTINY
        ↓
QUERY IF NEEDED
        ↓
ENTREPRENEUR RESPONSE
        ↓
RESUBMISSION #N
        ↓
MIDC DELTA RE-SCRUTINY
        ↓
INSPECTION IF REQUIRED
        ↓
MIDC DECISION
        ↓
ENTREPRENEUR STATUS UPDATED
        ↓
CERTIFICATE / ORDER STORED
        ↓
DEPENDENCY GRAPH UPDATED
        ↓
NEXT SERVICES UNLOCK
        ↓
CONDITIONS / COMPLIANCE / AMENDMENT LIFECYCLE
```

Shared records:

- Business ID
- Project ID
- Application ID
- MIDC service ID
- Business DNA version
- Master Project Dossier values
- field source / verification
- document ID / version
- query ID
- deficiency ID
- resubmission version
- inspection ID
- decision ID
- approval/order ID
- SLA timestamps
- dependency state
- grievance ID
- compliance obligation ID where applicable
- regulatory rule version

---

# 12. FINAL MIDC DESIGN PRINCIPLE

The MIDC officer should **not** feel like:

```text
“I received a PDF form.
Now I have to reconstruct who this business is,
which plot it uses,
which data is correct,
what other departments are doing,
and what changed since last time.”
```

The MIDC officer should feel like:

```text
THIS IS THE BUSINESS
        ↓
THIS IS ITS ADAPTIVE BUSINESS DNA
        ↓
THIS IS THE MIDC SERVICE I AM RESPONSIBLE FOR
        ↓
THESE ARE THE FIELDS I MUST ACTUALLY SCRUTINISE
        ↓
THESE OTHER FIELDS ARE CONTEXT / VERIFIED DATA
        ↓
THIS IS WHAT THE SYSTEM ALREADY CHECKED
        ↓
THIS IS WHAT IS INCONSISTENT
        ↓
THIS IS WHAT THE REGULATION SAYS
        ↓
THIS IS WHAT I NEED TO QUERY
        ↓
THIS IS WHAT CHANGED ON RESUBMISSION
        ↓
THIS IS WHETHER AN INSPECTION IS REQUIRED
        ↓
THIS IS THE DECISION RECORD
        ↓
THIS IS WHAT MY DECISION UNLOCKS / BLOCKS
```

The final MIDC product is therefore a **service-configurable operational regulatory workbench**, tightly connected to the Entrepreneur's adaptive Business Profile and the complete A–Z business journey.
