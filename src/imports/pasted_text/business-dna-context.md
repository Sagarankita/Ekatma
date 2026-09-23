Create M07 — Business DNA / Adaptive Profile Context.

IMPORTANT:
This screen is part of the MIDC APPLICATION workspace.

It is the officer-facing view of the entrepreneur's existing Adaptive Business Profile / Business DNA.

The entrepreneur has already created this Business DNA through the adaptive questionnaire.

MIDC must NOT reconstruct the business profile manually.

MIDC must consume the relevant Business DNA, show its provenance and state, and allow the officer to understand how that information affects the current MIDC application and related regulatory journey.

This is primarily a READ / CONTEXT / TRACEABILITY screen.

Do not turn this into a generic profile editor.

Do not redesign the government shell.
Do not regenerate Phase 0.
Do not change existing EKATMA colors, typography, spacing, header, footer, sidebar, tables, cards, badges, breadcrumbs, buttons, or accessibility components.

Reuse existing components.

==================================================
1. NAVIGATION CONTEXT
==================================================

M07 is accessed from M06 — MIDC Application Overview.

Keep the MIDC officer sidebar unchanged.

The active sidebar item must remain:

Applications

Use the corrected sidebar:

Department Home
My Queue
Applications
Service Catalogue
Scrutiny
Inspections
Queries / Deficiencies
Decisions
SLA & Escalations
Grievances
Regulatory Assistant
Analytics
Regulatory Changes
Workload
Audit / History

Do NOT make Business DNA a separate top-level sidebar item.

Do NOT put M07 under:

- Service Catalogue
- Scrutiny
- Regulatory Assistant

This is application context.

==================================================
2. BREADCRUMB
==================================================

Use:

Department Home > Applications > Application Overview > Business DNA

Reuse the existing EKATMA breadcrumb component.

The breadcrumb should make it clear that the officer is viewing Business DNA belonging to a specific application.

==================================================
3. PAGE HEADER
==================================================

Page title:

Business DNA / Adaptive Profile Context

Supporting text:

"Business context received from the entrepreneur's Adaptive Business Profile."

Below the title, show compact application context:

Application ID
Business / Project
MIDC Service
Current Application State
Current Project Stage

Example:

MIDC-APP-2026-00482
Aster BioTech Manufacturing Pvt. Ltd.
Building / Planning
TECHNICAL_SCRUTINY
Construction

Use prototype-safe sample data.

Clearly distinguish sample data from official data where appropriate.

==================================================
4. IMPORTANT CONTEXT NOTICE
==================================================

At the top of the page, include a subtle information panel:

"Business DNA is sourced from the entrepreneur's Adaptive Business Profile. MIDC receives relevant fields as application and regulatory context. Field-level verification status and source are shown separately."

This panel should not dominate the page.

It exists to reinforce the architectural rule:

ENTREPRENEUR ADAPTIVE PROFILE
↓
BUSINESS DNA
↓
REGULATORY ENGINE
↓
MIDC APPLICATION / RELEVANT SERVICE

Do not imply that MIDC created the original Business DNA.

==================================================
5. PROFILE STATE SUMMARY
==================================================

Create a compact summary strip below the header.

Show:

Business DNA status
Profile version
Last updated
Confirmed fields
Needs Review
Needs Verification
Changed Since Submission

Example:

Business DNA
Confirmed

Profile Version
v3

Last Updated
18 Sep 2026

Needs Review
2

Needs Verification
3

Changed Since Submission
1

These are contextual counts.

Do not create a single "Business DNA score".

Do not create a completeness percentage unless an existing configured component explicitly requires it.

Do not imply that more confirmed fields means a better application.

==================================================
6. TWO STATE SYSTEMS — CRITICAL
==================================================

The screen must visually separate two different state systems.

DO NOT merge them into one "Status" field.

SYSTEM A:
ADAPTIVE QUESTION / BRANCH STATE

Allowed states:

NOT_VISIBLE
VISIBLE
REQUIRED
ANSWERED
VALIDATED
CONFIRMED
SKIPPED
NOT_APPLICABLE
NEEDS_REVIEW

SYSTEM B:
DATA VERIFICATION STATE

Allowed states:

SELF_DECLARED
USER_CONFIRMED
SYSTEM_VERIFIED
DEPARTMENT_VERIFIED
NEEDS_VERIFICATION
INVALID
EXPIRED

Every field should show these separately.

Example:

Plot Area
Value: 4,800 m²

Adaptive State:
CONFIRMED

Verification:
SYSTEM_VERIFIED

Source:
MIDC allotment record

Last Updated:
18 Sep 2026

Do NOT show:

Status: Confirmed / Verified

as a single combined state.

The distinction must be visually obvious.

==================================================
7. CRITICAL STATE RULES
==================================================

Preserve the following logic exactly.

NOT_APPLICABLE is NOT missing.

Example:

Boiler = No

Adaptive State:
NOT_APPLICABLE

This must NOT appear under missing data.

SKIPPED branches remain stored as NOT_APPLICABLE where the profile logic establishes that outcome.

NEEDS_REVIEW does not mean rejection.

NEEDS_VERIFICATION does not mean rejection.

SELF_DECLARED is a verification state.

SELF_DECLARED must never be displayed as an adaptive question-state label.

Do not convert uncertainty into rejection.

Do not use red/error styling merely because a field is:

NEEDS_REVIEW
or
NEEDS_VERIFICATION

Use the existing EKATMA warning / verification treatment.

==================================================
8. FILTER BAR
==================================================

Create a filter bar below the profile summary.

Filters:

1. MIDC Review Fields
2. Context Only
3. Other Department
4. Needs Verification
5. Changed Since Submission

Use existing EKATMA filter components.

Allow multiple filters where the existing system supports it.

The filters should affect the Business DNA field groups below.

Example:

MIDC Review Fields
→ shows fields directly relevant to the current MIDC service.

Context Only
→ shows information useful for understanding the project/dependencies but not necessarily a direct MIDC decision parameter.

Other Department
→ shows fields that belong to another department's regulatory context.

Needs Verification
→ shows fields whose verification state is NEEDS_VERIFICATION.

Changed Since Submission
→ shows fields changed after the application was submitted / since the previous relevant version.

Do not create new filter categories.

==================================================
9. FIELD CLASSIFICATION
==================================================

Every field should also be classifiable as one of:

APPLICATION FIELD
→ MIDC must scrutinise this for the current service.

CONTEXT FIELD
→ useful for understanding the project, dependency or risk.

VERIFIED MASTER DATA
→ already sourced / verified and reusable.

OTHER-DEPARTMENT FIELD
→ visible only as dependency/context; MIDC does not decide it.

Use a compact field-type indicator.

Do not make these classifications look like additional workflow states.

They are field classifications.

For example:

Plot Area
APPLICATION FIELD
Verification: SYSTEM_VERIFIED

Environmental Classification
OTHER-DEPARTMENT FIELD
Verification: DEPARTMENT_VERIFIED
Source: Competent external department

This distinction is important.

==================================================
10. BUSINESS DNA FIELD LAYOUT
==================================================

Create the main content as a structured set of expandable sections.

Do not use giant decorative cards.

Each section should have:

SECTION TITLE
Short description
Relevant field count
Potential attention indicator if applicable
Expand / collapse control

When expanded, display fields in a dense but readable two-column or structured grid layout.

Each field should contain:

Field Name
Value
Field Classification
Source
Adaptive State
Verification State
Last Updated
Used By / Relevant Services
Branch Trigger where useful

Use reusable field components.

==================================================
11. SECTION — PROJECT
==================================================

Title:

PROJECT

Fields:

Project Type
- New
- Existing
- Expansion
- Modification

Classification

Project Stage

Use the canonical project-stage vocabulary already established in the system.

Examples:

Planning
Land acquisition
Pre-establishment
Construction
Installation
Ready to operate
Operational

Do not invent additional project stages.

For each field show:

Value
Source
Adaptive State
Verification State
Last Updated
Used By

Example:

Project Type
Expansion

Adaptive State:
CONFIRMED

Verification:
USER_CONFIRMED

Source:
Entrepreneur Adaptive Profile

Used By:
MIDC service routing
Regulatory journey

==================================================
12. SECTION — IDENTITY
==================================================

Title:

IDENTITY

Fields:

Entity
Business / Project
Industry
Activities
Products / Process

These should come directly from the existing Business DNA.

Do not create an independent officer-entered business profile.

If a value has not been verified:

show the actual verification state.

Do not silently upgrade SELF_DECLARED to VERIFIED.

==================================================
13. SECTION — LOCATION / MIDC
==================================================

Title:

LOCATION / MIDC

Fields:

District
Taluka
City
MIDC State
Estate
Plot
Plot Area
Allotment Status
Possession

Use the exact terminology established in the existing Business DNA model.

Show relevant provenance.

For example:

Plot Area
4,800 m²

Source:
MIDC allotment document

Adaptive State:
CONFIRMED

Verification:
SYSTEM_VERIFIED

Used By:
Land / Plot
Building / Planning

If possession is not confirmed:

Possession
Needs Verification

Do not infer possession from another field.

==================================================
14. SECTION — LAND
==================================================

Title:

LAND

Fields:

Land Type
Ownership / Lease / Purchase State
Possession
Land-use State
Land Documents

Where documents exist, show a concise document reference.

Do not turn this section into the full document review workspace.

Detailed document review remains in the relevant application/document workspace.

If:

Land in possession = YES

do not display acquisition-related information as missing merely because the acquisition branch was skipped.

Preserve adaptive branching.

==================================================
15. SECTION — SCALE
==================================================

Title:

SCALE

Fields:

Investment
Workforce
Production Capacity

Show:

Value
Unit
Source
Adaptive State
Verification State
Last Updated
Used By

Do not introduce unsupported financial thresholds or regulatory conclusions.

Do not classify an investment value as eligible/ineligible unless a configured rule explicitly provides that result elsewhere.

==================================================
16. SECTION — BUILDING
==================================================

Title:

BUILDING

Fields:

Construction State
Area
Floors
Height
Occupancy

Where useful, show:

Construction Status

If:

New Construction = NO

preserve the adaptive branch logic.

Do not create construction-specific missing fields simply because they do not exist.

If the field is NOT_APPLICABLE:

show:

NOT_APPLICABLE

Do not show:

Missing

==================================================
17. SECTION — UTILITIES
==================================================

Title:

UTILITIES

Fields:

Power
Water
Water Source
Wastewater
Drainage

Where applicable also show:

HT / Normal

Use existing Business DNA data.

Do not invent utility requirements.

Do not create an approval decision from these values.

Show which MIDC service or dependency uses the field.

==================================================
18. SECTION — ENVIRONMENT / SAFETY CONTEXT
==================================================

Title:

ENVIRONMENT / SAFETY CONTEXT

Fields:

Air Emissions
Hazardous Materials
Hazardous Waste
Boiler
Pressure Vessel
Dangerous Machinery
Fire-related Flags

Also show:

Environmental / Pollution Classification

ONLY when this classification has already been produced by:

- the regulatory engine
- or the competent external department

This classification is CONTEXT ONLY unless a configured rule explicitly establishes its use for the current MIDC service.

Do not allow the MIDC UI to appear to determine another department's environmental classification.

For example:

Pollution Classification
Category: [sample]

Source:
Competent external department / regulatory engine

Field Classification:
OTHER-DEPARTMENT FIELD

Verification:
DEPARTMENT_VERIFIED

MIDC action:
View context

NOT:

Change classification
Approve classification
Reject classification

==================================================
19. SECTION — STORAGE / LOGISTICS / TRADE
==================================================

Title:

STORAGE / LOGISTICS / TRADE

Fields:

Warehouse / Storage
Import / Export
Logistics
Distribution / Trade Context

These are Business DNA context.

They may affect the regulatory journey where configured.

Do not assume that every field directly affects MIDC scrutiny.

Show:

Used By / Relevant Services

where a configured relationship exists.

==================================================
20. SECTION — INCENTIVE ATTRIBUTES
==================================================

Title:

INCENTIVE ATTRIBUTES

Show only the attributes that exist in the Business DNA.

Examples:

Startup / MSME status
R&D orientation
Export orientation
Employment-intensive attributes
Environment-focused attributes
Other scheme-defined attributes

IMPORTANT:

These are Business DNA context only unless MIDC is the configured administering authority for a particular incentive scheme.

Do not create:

Claim
Approve
Reject
Eligibility Decision

controls here by default.

If a configured MIDC-administered scheme exists, display only the relevant configured context and workflow.

Otherwise label the section:

Context Only

==================================================
21. SECTION — EXISTING REGULATORY CONTEXT
==================================================

Title:

EXISTING REGULATORY CONTEXT

Fields / records:

Existing Approvals
Existing Applications
Previously Uploaded Documents
Previously Verified Documents

Show concise references.

For each record:

Name
Authority
Status
Date
Source
Verification
Relevant service

Do not imply that MIDC owns or decides another authority's approval.

For example:

MPCB Consent
Status: Approved
Authority: MPCB
MIDC relationship: Dependency / Context

The MIDC officer can view relevant context but cannot modify MPCB's decision.

==================================================
22. FIELD-LEVEL DISPLAY
==================================================

Every important field must expose the following information:

VALUE
SOURCE
ADAPTIVE QUESTION / BRANCH STATE
DATA VERIFICATION STATE
LAST UPDATED
USED BY / RELEVANT SERVICES
ADAPTIVE BRANCH TRIGGER / WHY THIS FIELD WAS ASKED

Do not necessarily render all metadata at maximum visual prominence simultaneously.

Use a compact field row plus a "View provenance" / information affordance if needed.

The officer should be able to access all metadata without making the page unreadably dense.

==================================================
23. FIELD PROVENANCE DRAWER
==================================================

When the officer selects a field, open a reusable provenance drawer.

Use the existing provenance component architecture.

Drawer contents:

Field
Current Value
Source
Adaptive State
Verification State
Issue Date where applicable
Expiry Date where applicable
Last Updated
Used By
Previous Value
Current Value
Change Reason

Example:

Plot Area

Current Value:
4,800 m²

Source:
MIDC allotment document / Entrepreneur Adaptive Profile

Adaptive State:
CONFIRMED

Verification:
SYSTEM_VERIFIED

Last Updated:
18 Sep 2026

Used By:
- MIDC Land / Plot
- Building / Planning
- relevant regulatory journey

Previous Value:
4,500 m²

Current Value:
4,800 m²

Change Reason:
Updated after revised plot record

If no previous value exists:

"First recorded value"

Do not invent change reasons.

==================================================
24. ADAPTIVE BRANCH EXPLANATION
==================================================

For fields where useful, provide:

"Why was this asked?"

Example:

Boiler

Why was this asked?
"Shown because the business activity / process branch activated the boiler-related question."

or:

Boiler

Branch state:
NOT_APPLICABLE

Why was this branch inactive?
"Boiler = No in the adaptive profile."

The exact explanation should come from the stored adaptive branch logic.

Do not have AI invent a rationale after the fact.

Use:

"Configured adaptive rule"

where a configured rule exists.

==================================================
25. ADAPTIVE LOGIC EXAMPLES
==================================================

Preserve the following examples in the prototype.

EXAMPLE 1:

Boiler = NO

Adaptive State:
NOT_APPLICABLE

Verification:
USER_CONFIRMED

Result:

Do not display boiler data as missing.

EXAMPLE 2:

MIDC = YES

MIDC-specific branch is active.

Relevant MIDC service/context appears.

EXAMPLE 3:

MIDC = UNKNOWN

Adaptive / verification context:

Needs Verification

Show source and context.

Do not automatically create an MIDC service unless the regulatory logic activates one.

EXAMPLE 4:

Land Possession = YES

Acquisition route may be skipped.

Do not show acquisition information as missing.

EXAMPLE 5:

New Construction = NO

Construction-specific requirements should not automatically appear unless another configured rule activates them.

These examples demonstrate that M07 preserves adaptive logic rather than flattening the profile into a generic checklist.

==================================================
26. CHANGED SINCE SUBMISSION
==================================================

When the filter:

Changed Since Submission

is selected, show only changed Business DNA fields.

For every changed field show:

Previous Value
Current Value
Source
Change Date
Change Reason
Affected MIDC Service
Downstream Dependency Effect
Re-scrutiny Required

Example:

Plot Area

Previous:
4,500 m²

Current:
4,800 m²

Affected:
Building / Planning

Potential impact:
Review required

Do not let the system make the statutory conclusion automatically.

Link to:

M20 — Delta Re-scrutiny

where applicable.

==================================================
27. NEEDS VERIFICATION VIEW
==================================================

When:

Needs Verification

is selected:

show only fields where:

Verification State = NEEDS_VERIFICATION

Each result must show:

Field
Value
Source
Why verification is needed
Relevant service
Potential dependency
Last updated

Example:

MIDC Estate
Value: Example MIDC Estate

Verification:
NEEDS_VERIFICATION

Source:
Entrepreneur Adaptive Profile

Action:
Review source

Do not display:

"Invalid"

unless the actual verification state is INVALID.

Do not automatically treat NEEDS_VERIFICATION as a deficiency or rejection.

==================================================
28. OTHER DEPARTMENT VIEW
==================================================

When:

Other Department

is selected:

show fields belonging to other-department context.

Example categories:

Environmental classification
Fire-related context
Other authority approvals

Clearly label:

OTHER-DEPARTMENT FIELD

Then show:

Authority
Source
Verification
MIDC relationship

Possible relationships:

Context
Dependency
Prerequisite
Parallel
Downstream

Do not expose decision controls for other departments.

==================================================
29. MIDC REVIEW FIELDS VIEW
==================================================

When:

MIDC Review Fields

is selected:

show Business DNA fields that are directly relevant to the current MIDC service.

For example, depending on the configured service:

Plot
Plot Area
Allotment
Possession
Building
Construction State
Utilities
Project Stage

The actual fields shown must be driven by the configured service / regulatory journey.

Do not hard-code the same review fields for every MIDC service.

This is critical because MIDC supports multiple service families.

==================================================
30. CONTEXT ONLY VIEW
==================================================

When:

Context Only

is selected:

show fields useful for understanding the project but not necessarily direct application decision parameters.

Examples:

Industry context
Trade context
R&D orientation
Employment attributes
Other regulatory context

Do not imply that context fields are irrelevant.

They may feed regulatory routing, dependencies, or understanding of the project.

==================================================
31. RELATIONSHIP TO REGULATORY ENGINE
==================================================

Show a compact "Used By" relationship for important fields.

Example:

Plot Area

Used By:
- MIDC Land / Plot
- Building / Planning
- regulatory journey
- dependency evaluation

This should explain where the Business DNA is being consumed.

Do not turn this into a technical architecture diagram.

A simple list or relationship drawer is sufficient.

==================================================
32. RELATIONSHIP TO M06
==================================================

M06 Application Overview should summarize Business DNA.

M07 is the detailed Business DNA view.

Therefore:

M06
→ Business DNA Snapshot
→ "View full Business DNA"
→ M07

Do not duplicate the entire M07 field structure inside M06.

M07 should be the detailed context screen.

==================================================
33. RELATIONSHIP TO DELTA RE-SCRUTINY
==================================================

Business DNA changes must connect to the existing delta model:

CHANGED FIELD
↓
RE-EVALUATE RULES
↓
COMPARE OLD JOURNEY VS NEW JOURNEY
↓
IDENTIFY:
- new requirements
- removed requirements
- new documents
- changed dependencies
- changed compliance
↓
MIDC APPLICATION IMPACT

M07 should expose the relevant changed field and link to the detailed delta workflow.

Do not perform the complete delta analysis inside M07.

That belongs in M20.

==================================================
34. NO MANUAL RECONSTRUCTION
==================================================

Do not create a form where the officer is asked to re-enter:

- business type
- project type
- industry
- plot
- investment
- utilities
- environmental context
- workforce
- production capacity

The purpose is to display the existing Business DNA.

If an officer identifies an issue, show the relevant verification/review workflow rather than silently changing the entrepreneur's source profile.

==================================================
35. DATA SOURCE HIERARCHY
==================================================

Where possible, display source labels such as:

Entrepreneur Adaptive Profile
Uploaded Document
System Record
Verified Master Data
Department Record
External Department
Regulatory Engine

Do not invent source provenance.

If the source is unavailable:

Source:
Not available

or the existing system's equivalent.

Do not claim SYSTEM_VERIFIED or DEPARTMENT_VERIFIED without supporting source/state.

==================================================
36. VERIFICATION VISUAL LANGUAGE
==================================================

Use the existing EKATMA status components.

Suggested semantic treatment:

SELF_DECLARED
→ informational

USER_CONFIRMED
→ confirmed informational state

SYSTEM_VERIFIED
→ verified state

DEPARTMENT_VERIFIED
→ verified authoritative-context state

NEEDS_VERIFICATION
→ attention / review state

INVALID
→ error state

EXPIRED
→ validity warning/error state

Do not use color alone.

Every state must include readable text.

Do not use a single green "Verified" badge for all verification states.

==================================================
37. PROFILE VERSIONING
==================================================

Show:

Business DNA Version
Last Updated
Application Version

Where relevant, show:

Previous Version

Do not overwrite historical Business DNA values.

If a field changed:

show previous and current values.

This supports:

- delta re-scrutiny
- auditability
- application history
- entrepreneur ↔ department synchronization

==================================================
38. ACTIONS
==================================================

M07 should have very limited officer actions.

Allowed contextual actions may include:

View Source
View Provenance
View Related Service
View Dependency
View Previous Value
View Delta Impact

Do NOT create generic:

Edit Business DNA

unless a separate, explicitly configured workflow exists.

Do NOT create:

Approve Business DNA
Reject Business DNA

Do NOT allow the officer to change another department's information.

==================================================
39. SAMPLE DATA
==================================================

Use realistic but fictional prototype-safe data.

Example:

Project Type:
Expansion

Classification:
Manufacturing

Stage:
Construction

Entity:
Aster BioTech Manufacturing Pvt. Ltd.

Industry:
Pharmaceutical Manufacturing

MIDC Estate:
Example MIDC Estate

Plot:
B-42

Plot Area:
4,800 m²

Allotment:
Confirmed

Possession:
Confirmed

Investment:
₹42 Cr

Workforce:
180

Production Capacity:
12,000 units/month

Construction:
Under Construction

Built-up Area:
2,700 m²

Floors:
3

Power:
1.2 MW

Water:
120 KLD

Water Source:
MIDC supply

Wastewater:
80 KLD

Boiler:
Yes

Hazardous Material:
Yes

Hazardous Waste:
Needs Verification

Import / Export:
Export-oriented

IMPORTANT:

All sample values are fictional prototype data.

Do not present them as official MIDC records, legal thresholds, government statistics, or authoritative regulatory classifications.

==================================================
40. EMPTY / EDGE STATES
==================================================

Support:

No value available
Not applicable
Branch not activated
Needs verification
Needs review
Expired
Invalid
No previous value
No change since submission
No service dependency
No external department context
No existing approval

Examples:

NOT_APPLICABLE
"Not applicable based on the adaptive profile branch."

NEEDS_VERIFICATION
"Source information requires verification."

NO PREVIOUS VALUE
"No previous Business DNA value is available."

Do not label NOT_APPLICABLE as:

Missing

==================================================
41. ACCESSIBILITY
==================================================

Reuse the existing EKATMA accessibility system.

Ensure:

- keyboard accessible filters
- keyboard accessible expandable sections
- visible focus states
- readable status labels
- accessible field labels
- sufficient contrast
- English / Marathi compatibility
- status never communicated by color alone

Do not introduce a new accessibility system.

==================================================
42. VISUAL DESIGN
==================================================

The page should be dense enough for an officer to inspect substantial Business DNA but remain readable.

Use:

- structured sections
- expandable groups
- compact field rows
- provenance indicators
- verification badges
- adaptive-state badges
- subtle dividers
- existing EKATMA cards
- existing filters
- existing tables where appropriate

Avoid:

- giant cards
- decorative dashboards
- charts without analytical purpose
- chatbot styling
- glassmorphism
- neon gradients
- consumer profile-page styling
- excessive icons
- new colors
- new typography
- independent department branding

The page should look like the same EKATMA product, but optimized for dense regulatory information.

==================================================
43. FINAL PAGE STRUCTURE
==================================================

The final M07 screen should follow this hierarchy:

SIDEBAR
Applications = ACTIVE

BREADCRUMB
Department Home > Applications > Application Overview > Business DNA

PAGE HEADER
Business DNA / Adaptive Profile Context

APPLICATION CONTEXT
Application ID
Business / Project
MIDC Service
Current State
Project Stage

PROFILE SUMMARY
Business DNA status
Profile version
Last updated
Confirmed
Needs Review
Needs Verification
Changed Since Submission

INFORMATION NOTICE
Business DNA sourced from entrepreneur Adaptive Business Profile

FILTERS
MIDC Review Fields
Context Only
Other Department
Needs Verification
Changed Since Submission

BUSINESS DNA SECTIONS

1. PROJECT
2. IDENTITY
3. LOCATION / MIDC
4. LAND
5. SCALE
6. BUILDING
7. UTILITIES
8. ENVIRONMENT / SAFETY CONTEXT
9. STORAGE / LOGISTICS / TRADE
10. INCENTIVE ATTRIBUTES
11. EXISTING REGULATORY CONTEXT

FIELD ROWS

Value
Field Classification
Source
Adaptive State
Verification State
Last Updated
Used By
Branch Trigger where useful

FIELD PROVENANCE DRAWER

Value
Source
Adaptive State
Verification State
Issue / Expiry
Last Updated
Used By
Previous Value
Current Value
Change Reason

==================================================
44. MOST IMPORTANT PRINCIPLE
==================================================

M07 is the officer's WINDOW INTO THE ENTREPRENEUR'S BUSINESS DNA.

It must preserve:

ENTREPRENEUR ADAPTIVE PROFILE
↓
BUSINESS DNA
↓
REGULATORY ENGINE
↓
MIDC SERVICE / APPLICATION

The officer should be able to understand:

"What does the entrepreneur's business actually look like?"

"What information was asked and why?"

"What did the entrepreneur provide?"

"What has been verified?"

"What still needs verification?"

"Which fields are directly relevant to MIDC?"

"Which fields are only context?"

"Which fields belong to another department?"

"What changed since submission?"

"Which MIDC services or dependencies use this information?"

without manually reconstructing the applicant's business.

The system must expose facts, provenance, adaptive state, verification state and downstream relevance.

It must not silently reinterpret uncertainty as failure, and it must not make statutory approval/rejection decisions from Business DNA alone.