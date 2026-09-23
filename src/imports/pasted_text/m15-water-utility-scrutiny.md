Create M15 — Water / Utility / Drainage Scrutiny.

IMPORTANT:
Continue from the existing EKATMA MIDC Department Figma file.

Do NOT regenerate or redesign:
- Phase 0 design system
- government header/footer
- Maharashtra government identity
- EKATMA branding
- typography
- colours
- spacing
- sidebar
- breadcrumbs
- accessibility components
- generic tables
- status badges
- common officer workbench components

M15 must be a SERVICE-SPECIFIC CONFIGURATION of the same reusable MIDC scrutiny workbench established in M11 and demonstrated through M14.

Do NOT create a new dashboard architecture.

The screen should feel like:

M11 Common Scrutiny Workbench
+
Water / Utility / Drainage service configuration

==================================================
1. PURPOSE OF M15
==================================================

M15 represents the MIDC officer's scrutiny workspace for a Water / Utility / Drainage service.

The officer should be able to:

- understand why the utility service is applicable
- review the applicant's utility-related data
- inspect project / plot context
- review relevant documents
- understand dependency status
- compare current data with previously approved data
- identify inconsistencies
- record scrutiny findings
- raise a query when required
- request additional evidence
- understand which information came from Business DNA
- understand whether MIDC is actually the relevant utility authority for the requested service

This is an OFFICER SCRUTINY screen.

It is NOT:

- a universal utility checklist
- a generic water application shown to every MIDC applicant
- a final approval/rejection screen
- a replacement for M17 Regulatory Dependency View
- a replacement for M16 Cross-form Consistency
- a replacement for M12 Parameter Detail
- a replacement for M13 Document Review

==================================================
2. SERVICE ACTIVATION — CRITICAL
==================================================

The Water / Utility / Drainage service must only appear when the regulatory journey/configuration activates it.

Do NOT display this service simply because the application belongs to MIDC.

The service activation should be driven by the configured regulatory logic and relevant Business DNA.

Conceptually:

Business DNA
    ↓
Regulatory Rules Engine
    ↓
Is Water / Utility / Drainage service applicable?
    ↓
YES → activate relevant MIDC service
NO → do not create the service
UNKNOWN → Needs Verification

The Figma prototype must visually communicate this adaptive behaviour.

==================================================
3. WATER APPLICABILITY LOGIC
==================================================

Use the following adaptive Business DNA logic.

CASE 1:

Water Required = NO

Then:

- Water-specific MIDC application should NOT appear.
- Water-specific review fields should NOT appear.
- Do not create a "missing water information" query.
- Show the water branch as:

"Not applicable"

or

"Water requirement: No"

If the configured regulatory rules nevertheless require a different utility workflow, that workflow may activate through configuration.

Do not hard-code the exception.

--------------------------------------------------

CASE 2:

Water Required = YES

Then:

Activate the relevant water/utility review branch.

Show:

- Water requirement
- Water quantity
- Water source
- MIDC water route
- relevant project/plot context
- configured supporting documents
- dependency state

--------------------------------------------------

CASE 3:

Water Required = UNKNOWN / NEEDS VERIFICATION

Do not assume that MIDC water service is applicable.

Show:

"Water requirement — Needs Verification"

Allow the officer to inspect the Business DNA/source context.

The officer may raise a query if clarification is required.

--------------------------------------------------

CASE 4:

Water Source ≠ MIDC

Examples:

- Borewell
- Municipal source
- Private source
- Recycled / treated source
- Other configured source

Do NOT automatically force an MIDC water workflow.

Instead:

Water Source:
[Configured source]

MIDC Water Route:
Not activated / Not applicable / Needs Verification

The exact state must come from the configured regulatory logic.

Do not invent a legal requirement that a non-MIDC water source must pass through MIDC.

--------------------------------------------------

CASE 5:

Water Source = MIDC

Then:

The configured MIDC water service may become active.

Show:

MIDC Water Route:
Active

and allow the officer to review the relevant water/utility parameters and documents.

Again, "may become active" is important.

The final service activation comes from the configured rules, not from a hard-coded UI assumption.

==================================================
4. DRAINAGE ADAPTIVE LOGIC
==================================================

Drainage must follow the same adaptive model.

If:

Drainage = NOT_APPLICABLE

then:

- do not show missing drainage fields
- do not raise a drainage query
- do not mark the application incomplete
- do not treat NOT_APPLICABLE as Missing

Instead show:

Drainage
NOT APPLICABLE

with the relevant source/context if available.

If:

Drainage = REQUIRED

then activate the configured drainage review fields.

If:

Drainage = NEEDS VERIFICATION

show:

"Drainage applicability — Needs Verification"

and allow the officer to investigate or raise a query.

==================================================
5. COMMON APPLICATION HEADER
==================================================

Reuse the M11/M14 application context header.

Example:

Application ID:
MIDC-APP-2026-00418

Business:
Aster Precision Components Pvt. Ltd.

Project:
Precision Components Manufacturing Unit

MIDC Service:
Water / Utility / Drainage

Application State:
TECHNICAL_SCRUTINY

Scrutiny Route:
Configured route

Current Desk:
Utility / Water Scrutiny

Department:
MIDC

Region / Office:
Assigned office

Role:
Utility / Water Scrutiny Officer

SLA:
Use the existing MIDC SLA component.

Do not create a new status vocabulary.

The canonical application state must remain one of the shared application states.

==================================================
6. BUSINESS DNA CONTEXT
==================================================

Below the application header, create a compact READ-ONLY section:

"Business DNA — Utility Context"

Show only fields relevant to the current service.

Include:

Water Required?
Water Quantity
Water Source
MIDC Water Route
Project Location
MIDC Estate
Plot Number
Plot Area
Project Stage
Wastewater
Drainage
Construction / Operation Context

Example:

Water Required:
Yes

Water Quantity:
Configured project value

Water Source:
MIDC

MIDC Water Route:
Active

Estate:
Example MIDC Estate

Plot:
Plot A-18

Plot Area:
4,800 m²

Project Stage:
Construction

Wastewater:
Generated

Drainage:
Required

Construction / Operation Context:
Construction + proposed operation

Every value should show source/verification where useful.

For example:

Source:
Business DNA

Verification:
User Confirmed

or:

Source:
Master Project Dossier

Verification:
System Verified

Do not make the officer re-enter Business DNA.

==================================================
7. IMPORTANT DATA CLASSIFICATION
==================================================

Distinguish:

APPLICATION FIELD
→ directly reviewed for the current MIDC utility service

CONTEXT FIELD
→ useful for understanding the project

VERIFIED MASTER DATA
→ reusable verified information

OTHER-DEPARTMENT FIELD
→ visible as dependency/context only

Do not treat every Business DNA field as an MIDC decision field.

==================================================
8. LEFT REVIEW NAVIGATION
==================================================

Reuse the M11/M14 review navigation.

Sections:

01 — Applicability / Service Context
02 — Applicant Data
03 — Plot / Project Context
04 — Water Parameters
05 — Wastewater / Drainage
06 — Utility Documents
07 — Dependency
08 — Previous Approved Data
09 — Consistency Checks

Each section should show a compact status:

Reviewed
Needs Verification
Query
Invalid
Not Yet Reviewed
Not Applicable

Do not use a percentage completion indicator.

==================================================
9. APPLICABILITY / SERVICE CONTEXT
==================================================

Make the first section explicitly explain why this service is active.

Example:

SERVICE APPLICABILITY

Water Required:
YES

Water Source:
MIDC

MIDC Water Route:
ACTIVE

Drainage:
REQUIRED

Activation Source:
Configured Regulatory Journey

Status:
Service Activated

Include a compact explanation:

"This service was activated because the current Business DNA and configured regulatory journey indicate a relevant MIDC utility requirement."

Do not call this an AI decision.

Do not display an unexplained "AI determined" label.

If the applicability is uncertain:

Service Status:
Needs Verification

Reason:
Water source / utility applicability could not be conclusively determined from current Business DNA.

==================================================
10. APPLICANT DATA
==================================================

Show the submitted application values relevant to the utility service.

Possible fields:

Water required
Water quantity
Water source
MIDC water route
Wastewater generation
Drainage requirement
Utility connection context
Project stage
Construction / operation context

For each field:

Parameter
Current Application Value
Business DNA Value
Source
Verification
Officer Finding

Example:

Water Source

Application:
MIDC

Business DNA:
MIDC

Source:
Business DNA

Verification:
System Verified

Officer Finding:
Valid

If the values differ:

Application:
MIDC

Business DNA:
Municipal

show:

MISMATCH

and provide:

"Open M16 — Cross-form Consistency"

Do not silently overwrite either value.

==================================================
11. WATER PARAMETERS
==================================================

Create a structured review table.

Possible configurable parameters:

Water Required
Water Quantity
Water Source
MIDC Water Route
Connection / Service Context
Project Stage
Construction / Operation Context

IMPORTANT:

Do not invent technical thresholds.

Do not add arbitrary values such as:

- maximum litres/day
- minimum pressure
- pipe diameter
- mandatory capacity
- engineering limits

unless those values are explicitly provided by the configured regulatory/service data.

The prototype may display realistic sample values, but they must be clearly prototype-safe.

For each parameter show:

Value
Source
Verification
Related Evidence
Officer Finding

Officer Finding supports:

VALID
QUERY
INVALID
NEEDS VERIFICATION

==================================================
12. WASTEWATER / DRAINAGE REVIEW
==================================================

Create a dedicated section.

Show adaptive fields:

Wastewater Generated?
Wastewater Context
Drainage Required?
Drainage Status
Construction / Operation Context

Example:

Wastewater:
Generated

Drainage:
Required

Drainage Status:
Configured review required

If drainage is:

NOT_APPLICABLE

show:

Drainage
NOT APPLICABLE

Do not create blank fields beneath it.

Do not show:

"Missing drainage details"

Do not create a deficiency simply because an adaptive branch is not applicable.

If drainage is:

NEEDS_VERIFICATION

show:

Needs Verification

and explain the source/context that requires confirmation.

==================================================
13. DOCUMENT REVIEW
==================================================

Create a Utility Documents section.

Use the existing generic document-review architecture.

Possible configurable document categories may include:

Utility Application Evidence
Water Connection Evidence
Water Source Evidence
Drainage Evidence
Wastewater-related Evidence
Site / Layout Evidence
Other configured utility document

Do not imply that every document is universally mandatory.

Each document must have:

Document ID
Name
Category
Version
Issue Date
Expiry if relevant
Source
Verification
Validity
Reuse State
Officer Finding

Actions:

Preview
Open Document Review
Verify
Accept
Request Correction
Request Additional Evidence
Mark Invalid

Clicking a document opens M13.

If an already verified document is reused, prominently show:

"Previously verified — reused from Business Document Repository."

Do not overwrite the master document.

==================================================
14. DEPENDENCY CONTEXT
==================================================

Create a right-side:

"Regulatory Dependencies"

panel.

The baseline EKATMA journey places utilities after Building / Planning.

Show the relationship:

MIDC / Land Context
        ↓
MPCB Consent to Establish
        ↓
MIDC Building / Planning
        ↓
Utilities / Conditional NOCs
        ↓
Construction
        ↓
Pre-operation

The current M15 utility node should be highlighted.

IMPORTANT:

Utilities may proceed in parallel with other conditional NOCs when the configured dependency graph allows it.

Therefore do NOT render the utility stage as a universally strict serial sequence.

Instead support relationships such as:

UPSTREAM
CURRENT
PARALLEL
CONDITIONAL
DOWNSTREAM
BLOCKED
READY

Example:

MIDC Building / Planning
Status:
Completed / Current prerequisite

        ↓

MIDC Water / Utility
Status:
Current Scrutiny

        ↘

Conditional NOC
Status:
Parallel / Pending

The exact relationships must come from configuration.

==================================================
15. DEPENDENCY NODE DETAILS
==================================================

For each dependency show:

Prerequisite / Node
Source Department
Status
Evidence / Approval Reference

Example:

Prerequisite:
MIDC Building / Planning

Source:
MIDC

Status:
Completed / Verified

Evidence:
Application / approval reference

Current Node:

MIDC Water / Utility

Source:
MIDC

Status:
Under Technical Scrutiny

Possible parallel node:

Conditional NOC

Source:
Configured authority

Status:
Pending / Parallel

Do not fabricate external approval references.

Use realistic prototype placeholders where necessary.

==================================================
16. EXTERNAL DEPARTMENT BOUNDARY
==================================================

If the utility workflow depends on:

MPCB
Fire
DISH
Boiler
Municipal authority
Utility provider
Other configured authority

show the node as:

EXTERNAL DEPARTMENT / AUTHORITY

MIDC may:

View status
View evidence/reference
Understand dependency
Use it as scrutiny context

MIDC must NOT:

Approve
Reject
Modify
Edit
Issue
Revoke

the external department's approval.

No external-department decision buttons may appear.

==================================================
17. PREVIOUS APPROVED DATA
==================================================

Create a dedicated section:

"Previous Approved / Verified Data"

This should help officers compare the current application with previously accepted information.

Example:

Water Quantity

Previous approved:
Configured value

Current application:
Configured value

Change:
No change

Verification:
Previously Department Verified

Document:
Previous supporting document

If changed:

Previous:
Value A

Current:
Value B

Show:

"Change detected"

and provide:

"Open M20 — Delta Re-scrutiny"

Do not overwrite the previous value.

Preserve version history.

==================================================
18. CONSISTENCY WITH OTHER APPLICATIONS
==================================================

Create a compact consistency table.

Compare relevant utility fields across:

Business DNA
Master Project Dossier
MIDC Water / Utility
MIDC Building / Planning
MIDC Land / Plot
MPCB or other configured application
Other relevant applications

Example:

Water Requirement

Business DNA:
100 KLD

MIDC Utility:
100 KLD

MPCB:
100 KLD

Status:
MATCH

Another example:

Water Source

Business DNA:
MIDC

MIDC Utility:
MIDC

Other application:
Municipal

Status:
MISMATCH

Provide:

"Open M16 — Cross-form Consistency"

Do not silently resolve mismatches.

Do not edit another department's application.

==================================================
19. OFFICER SCRUTINY STATES
==================================================

Use the same officer finding states as M11, M12, M13 and M14:

VALID
QUERY
INVALID
NEEDS VERIFICATION

Explain these as scrutiny findings.

Do not use:

Approved
Rejected

as parameter-level findings.

For example:

Water Source
Officer Finding:
Valid

This does NOT mean the entire MIDC application is approved.

Similarly:

Drainage Evidence
Officer Finding:
Invalid

does NOT automatically mean the application itself is rejected.

Final application decisions remain in M25/M26.

==================================================
20. QUERY INTEGRATION
==================================================

When an officer selects:

Query
or
Request Additional Evidence
or
Request Correction

create a deficiency candidate that can be added to:

M18 — Consolidated Query Builder.

Store:

Deficiency ID
Application ID
Review Group
Parameter / Document
Issue
Evidence
Required Correction
Officer Comment
Regulatory Source if configured

Do not create an independent utility-specific query mechanism.

==================================================
21. PARAMETER DETAIL INTEGRATION
==================================================

Clicking a parameter such as:

Water Quantity

should open:

M12 — Generic Parameter Detail

M12 should show:

Master Project Dossier value
Current MIDC application value
Previous value
Source
Verification
Related documents
Related services
Related dependency
Cross-form values
Audit history

M15 remains the service-level scrutiny workspace.

M12 remains the single-parameter investigation screen.

==================================================
22. DOCUMENT DETAIL INTEGRATION
==================================================

Clicking a utility document opens:

M13 — Generic Document Review.

Reuse the existing document model:

Verification
Validity
Version
Reuse history
Used By
Source
Officer review

Do not build a separate Utility Document Repository.

==================================================
23. DELTA / RESUBMISSION CONTEXT
==================================================

If this application is a resubmission, show:

"Changes detected since previous submission"

Example:

Water Quantity
Previous:
100 KLD

Current:
120 KLD

Water Source
No change

Drainage
No change

Utility Document
Version 1 → Version 2

Provide:

"Open Delta Re-scrutiny"

Link to M20.

Only changed or dependency-affected information should be highlighted.

Do not force the officer to manually rediscover unchanged values.

==================================================
24. REGULATORY SOURCE PANEL
==================================================

On the right side, when a parameter is selected, show:

Review Item
↓
Configured Requirement
↓
Source / Rule
↓
Evidence
↓
Officer Finding

Do not invent:

- water quantity thresholds
- engineering standards
- statutory sections
- mandatory documents
- service timelines
- technical limits

If no configured source is available:

"Regulatory source not available — Needs Verification"

Do not fabricate a legal citation.

==================================================
25. AUTOMATION / AI BOUNDARY
==================================================

Automated systems may:

- identify whether configured Business DNA conditions appear to activate the service
- surface relevant utility fields
- compare current and previous values
- detect inconsistencies
- identify missing configured evidence
- show dependency relationships
- flag changed data
- retrieve relevant regulatory information

Automation must NOT:

- approve the utility application
- reject the utility application
- invent a technical threshold
- invent a mandatory document
- decide another department's approval
- silently change Business DNA
- silently change previous approved data

The officer remains responsible for the scrutiny finding.

==================================================
26. NO FALSE "COMPLETION" OR "RISK" SCORE
==================================================

Do not display:

Utility Readiness: 87%
Utility Risk Score: 72
AI Approval Probability
Compliance Score

unless a later, explicitly configured feature requires it.

Use factual status instead:

Reviewed
Needs Verification
Query
Invalid
Not Applicable
Pending Dependency

==================================================
27. BOTTOM ACTION BAR
==================================================

Use the same action hierarchy as M11/M14.

Actions:

Save Review
Flag for Attention
Raise Query
Request Additional Evidence
Open Parameter Detail
Open Document Review
Open Cross-form Consistency
Open Dependency View
Open Delta Re-scrutiny

Do NOT show:

Approve Application
Reject Application

Those actions belong to M25/M26.

==================================================
28. SAMPLE PROTOTYPE STATE
==================================================

Use realistic but clearly prototype-safe sample data.

Application:
MIDC-APP-2026-00418

Business:
Aster Precision Components Pvt. Ltd.

Service:
Water / Utility / Drainage

Project:
Precision Components Manufacturing Unit

MIDC Estate:
Example MIDC Estate

Plot:
A-18

Plot Area:
4,800 m²

Water Required:
Yes

Water Quantity:
100 KLD

Water Source:
MIDC

MIDC Water Route:
Active

Project Stage:
Construction

Wastewater:
Generated

Drainage:
Required

Building / Planning:
Completed / configured prerequisite

Water / Utility:
Under Technical Scrutiny

Conditional NOC:
Configured parallel dependency

IMPORTANT:
These are prototype values only.

Do not present them as actual MIDC records, official technical limits, or legal requirements.

==================================================
29. VISUAL HIERARCHY
==================================================

Prioritise:

1. Application identity
2. Service applicability
3. Water / utility context
4. Current scrutiny parameters
5. Documents
6. Dependencies
7. Previous approved data
8. Consistency
9. Regulatory source
10. Officer actions

Use:

- structured tables
- compact status badges
- expandable parameter rows
- dependency nodes
- document rows
- source/provenance labels
- right-side context panels

Avoid turning the screen into a large card-based dashboard.

This is an operational scrutiny workspace.

==================================================
30. ACCESSIBILITY
==================================================

Use Auto Layout.

Reuse existing EKATMA accessibility components.

Status must not rely only on colour.

Every state should have a text label.

Ensure:

- long document names wrap
- dependency descriptions wrap
- source references remain readable
- tables remain usable
- keyboard/focus states follow the existing design system
- English/Marathi-compatible containers are preserved
- icons are not the only way to communicate meaning

==================================================
31. FINAL OFFICER FLOW
==================================================

The intended workflow is:

Open MIDC Application
        ↓
Open Water / Utility / Drainage service
        ↓
Check service applicability
        ↓
Review Business DNA utility context
        ↓
Review applicant data
        ↓
Review plot/project context
        ↓
Review water parameters
        ↓
Review wastewater / drainage
        ↓
Review utility documents
        ↓
Review dependency context
        ↓
Compare previous approved data
        ↓
Review cross-form consistency
        ↓
Open M12 for parameter-level investigation if needed
        ↓
Open M13 for document-level investigation if needed
        ↓
Record:
Valid / Query / Invalid / Needs Verification
        ↓
Add deficiencies to M18 where required
        ↓
Open M20 if a resubmission/change is detected
        ↓
Save scrutiny findings
        ↓
Continue to configured MIDC workflow

Do NOT end M15 with approval/rejection.

Final statutory decision remains in M25/M26.