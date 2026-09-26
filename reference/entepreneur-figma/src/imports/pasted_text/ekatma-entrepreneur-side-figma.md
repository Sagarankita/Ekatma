Continue the EXISTING EKATMA Entrepreneur-side Figma implementation.

============================================================
EKATMA — ENTREPRENEUR SIDE
E06 — BUSINESS PROFILE REVIEW
E07 — MASTER PROJECT DOSSIER
E08 — DATA PROVENANCE
============================================================

IMPORTANT:

E03–E05 are already complete.

The dedicated Adaptive Business behavior pass has also already been completed.

Do NOT redesign or regenerate any earlier screen.

This prompt creates ONLY:

E06 — Business Profile Review
E07 — Master Project Dossier
E08 — Data Provenance

Then prepare the prototype handoff:

Confirm Profile
        ↓
Regulatory Journey Generation

Do NOT build the full Regulatory Journey screen in this prompt unless it
already exists as a placeholder.

Create only the correct transition / generation state for the next phase.

============================================================
1. PRESERVE ALL COMPLETED WORK EXACTLY
============================================================

Do NOT modify:

- Public Landing
- Login / Register
- Industrial Login
- OTP
- Registration
- Authentication validation
- Phase 0
- Header
- Footer
- Accessibility strip
- Logos
- Government of Maharashtra identity
- EKATMA identity
- Existing typography
- Existing colors
- Existing spacing
- Existing buttons
- Existing cards
- Existing form controls
- Existing tables
- Existing breadcrumbs
- Existing responsive behavior
- Existing accessibility behavior
- English / Marathi compatibility

Do NOT modify:

E02 — My Businesses
E03 — Create Business / Project
E04 — Basic Requirements
E05 — Adaptive Business Questionnaire

Do not create another questionnaire.

============================================================
2. EXISTING ARCHITECTURE TO PRESERVE
============================================================

The current flow is:

E02
Business Portfolio
        ↓
E03
Create Business / Project
        ↓
E04
Basic Requirements / Pre-Seed
        ↓
E05
Adaptive Business Discovery
        ↓
E06
Business Profile Review
        ↓
CONFIRM PROFILE
        ↓
Business DNA Version Confirmed
        ↓
Regulatory Applicability Evaluation
        ↓
Personalised Regulatory Journey Generation
        ↓
Incentive Journey Generation

E07 and E08 provide the reusable data/provenance workspace behind this flow.

============================================================
3. ONE BUSINESS DNA — NON-NEGOTIABLE
============================================================

E06, E07 and E08 must use the SAME Business DNA created across E03–E05.

Do not create:

E06-specific copies
E07-specific copies
E08-specific copies

of the same field.

Conceptually:

ONE BUSINESS DNA
        ↓
MULTIPLE VIEWS

E06
Review View

E07
Master Project Dossier View

E08
Field Provenance / History View

============================================================
4. DO NOT MERGE STATE DOMAINS
============================================================

Continue keeping these concepts separate:

A. ADAPTIVE QUESTION / BRANCH STATE

Examples:
NOT_VISIBLE
VISIBLE
REQUIRED
ANSWERED
VALIDATED
CONFIRMED
SKIPPED
NOT_APPLICABLE
NEEDS_REVIEW

B. DATA VERIFICATION STATE

Examples:
SELF_DECLARED
USER_CONFIRMED
SYSTEM_VERIFIED
DEPARTMENT_VERIFIED
NEEDS_VERIFICATION
INVALID
EXPIRED

C. REGULATORY APPLICABILITY

Applicable
Conditional
Not Applicable
Needs Verification

D. APPLICATION STATE

Handled later.

Do not create one generic "Status" field for all these concepts.

============================================================
E06 — BUSINESS PROFILE REVIEW
============================================================

5. CREATE E06
============================================================

Create a new page:

E06 — BUSINESS PROFILE REVIEW

Purpose:

Allow the entrepreneur to review the structured Business DNA created
through E03–E05 before the system generates the personalised regulatory
journey.

This page is NOT another form.

This page is:

REVIEW
+
VERIFY
+
EDIT IF NEEDED
+
CONFIRM

============================================================
6. E06 PAGE HEADER
============================================================

Breadcrumb:

Home
>
My Businesses
>
Business Discovery
>
Review Business Profile

Title:

Review Business Profile

Supporting text:

“Review the information collected for this project before EKATMA
evaluates the applicable regulatory requirements.”

Avoid promotional language.

============================================================
7. PROJECT CONTEXT
============================================================

At the top show a compact project summary.

Example:

PROJECT
ABC Pharma Manufacturing Unit

PROJECT TYPE
New Business / Project

LEGAL ENTITY
ABC Pharma Pvt Ltd

INDUSTRY
Pharmaceuticals

LOCATION
Thane, Maharashtra

PROJECT STAGE
Pre-Establishment

BUSINESS DNA VERSION
Draft Version 1

Do not turn this into an analytics dashboard.

============================================================
8. E06 REVIEW STRUCTURE
============================================================

Organise Business DNA into collapsible / structured review sections.

Use existing card / accordion patterns.

Sections:

1. Identity
2. Legal Entity
3. Classification
4. Industry & Activities
5. Products / Services
6. Project Stage
7. Location / Jurisdiction
8. Land
9. Investment
10. Employment
11. Production
12. Process
13. Building / Construction
14. Power
15. Water
16. Wastewater
17. Drainage
18. Air Emissions
19. Environmental Characteristics
20. Hazardous Materials
21. Hazardous Waste
22. Safety / Industrial Establishment
23. Machinery / Equipment
24. Storage
25. Warehouse
26. Logistics
27. Import / Export
28. Existing Approvals
29. Existing Applications
30. Incentive Attributes
31. Document Availability

Do not create separate disconnected pages for every section.

============================================================
9. IDENTITY REVIEW
============================================================

Include:

Business / Project Name

Project Type

Project Description if available

For Expansion / Modification:

Based On Existing Business / Project

Show source where useful.

Example:

Business / Project Name
ABC Pharma Manufacturing Expansion

Source:
Create Business / Project

============================================================
10. LEGAL ENTITY REVIEW
============================================================

Include:

Legal Entity Type

Legal Entity / Organisation Name

PAN where applicable

CIN / LLPIN / Registration Number where applicable

Promoter / Authorised Person context

Project Operator

Relationship to Registered Entity where applicable

Do not display identifiers that are not relevant to the selected entity type.

============================================================
11. CLASSIFICATION REVIEW
============================================================

Show:

Project Classification

Examples:

MSME

Large

Mega

Needs Verification

If classification was initially:

I am not sure

and the rule layer has not yet validated it:

show:

Needs Verification

Do not invent a final classification.

============================================================
12. INDUSTRY / ACTIVITY REVIEW
============================================================

Show:

Primary Business Nature

Industry / Sector

Activities

Products / Services

Process Type

Brief Process Description

Reuse structured values.

============================================================
13. PROJECT STAGE REVIEW
============================================================

Show:

Current Project Stage

For Expansion / Modification where relevant:

Current Business Stage
+
Proposed Project / Expansion Stage

Do not overwrite current history.

============================================================
14. LOCATION / JURISDICTION REVIEW
============================================================

Show:

State
District
Taluka
Village / City
PIN

MIDC status

Do not substitute account communication address.

The project location must remain independent.

============================================================
15. LAND REVIEW
============================================================

Show only relevant land information.

Possible fields:

MIDC / Non-MIDC state

MIDC Estate

Plot Number

Plot Area

Allotment Status

Land Possession

Land Type

Ownership

Survey / Plot Number

Land Area

Land-Use Classification

Agricultural-use state where applicable

Land-Use Permission state where applicable

Relevant land-document availability

Hide irrelevant branches or group them as Not Applicable.

============================================================
16. INVESTMENT REVIEW
============================================================

Show:

Total Project Investment

Land

Building / Construction

Plant & Machinery

Other Capital Investment

If mismatch exists:

keep the Needs Review warning.

Do not silently recalculate.

============================================================
17. EMPLOYMENT REVIEW
============================================================

Show:

Total

Permanent

Contract

Other

For Expansion / Modification:

CURRENT
→
PROPOSED

Example:

Current Workforce
180

Expected After Expansion
250

============================================================
18. PRODUCTION REVIEW
============================================================

Only show if applicable.

Show:

Products

Capacity

Unit

Shifts

Operating Hours

For multiple products:
use structured rows.

For Services-only business:

show Production as:

Not Applicable

Do not show empty missing fields.

============================================================
19. BUILDING REVIEW
============================================================

Show:

Construction / Premises state

Plot Area

Built-Up Area

Floors

Height

Occupancy

Construction Status

Building Flags

For modification:

show Current → Proposed values.

============================================================
20. POWER REVIEW
============================================================

Show only relevant values:

Power Required

Connected Load

LT / HT

HT Infrastructure

If Power = No:

show concise:

Power Details
Not Applicable

============================================================
21. WATER REVIEW
============================================================

Show:

Water Required

Daily Requirement

Source

Potential route context if already known, but do not present final approval.

Examples:

MIDC Supply

Groundwater

Municipal

Surface Water

Private Source

============================================================
22. WASTEWATER REVIEW
============================================================

Show where applicable:

Wastewater Generated?

Domestic / Industrial / Both

Quantity

Treatment Planned

Treatment System

Treatment Capacity

If No:

Not Applicable

============================================================
23. DRAINAGE REVIEW
============================================================

Show:

Drainage Required?

Stormwater

Sewage

Industrial Discharge

Other

If No:

Not Applicable

============================================================
24. AIR EMISSIONS REVIEW
============================================================

Show:

Air Emissions

Emission Sources

Fuel / Material

Capacity / Details

Only show details where relevant.

============================================================
25. ENVIRONMENTAL REVIEW
============================================================

Show:

Environmental Trigger

Selected Characteristics

Potential Environmental Clearance evaluation state where relevant

Example:

Environmental Clearance

Needs Verification

“Applicability will be determined using the validated regulatory rules.”

Do NOT merge this with MPCB Consent to Establish.

============================================================
26. HAZARDOUS MATERIAL REVIEW
============================================================

Show repeatable material records:

Material

Purpose

Quantity

Unit

Storage

Hazard Type

If No hazardous material:

Not Applicable

============================================================
27. HAZARDOUS WASTE REVIEW
============================================================

Show:

Waste Type

Quantity

Unit

Storage

Treatment / Disposal

============================================================
28. SAFETY / INDUSTRIAL REVIEW
============================================================

Show relevant:

Factory / Industrial Establishment state

Boiler

Pressure Vessel

Dangerous Machinery

Fire / Occupancy characteristics

Do not show final Factory / Fire / Boiler approvals yet.

============================================================
29. MACHINERY REVIEW
============================================================

Show machinery/equipment data gathered in E05.

For Expansion / Modification:

Current
→
Proposed

where applicable.

============================================================
30. STORAGE / WAREHOUSE REVIEW
============================================================

Show:

Storage Categories

Quantity

Area

Location

Storage Type

Warehouse

Warehouse Area

Material Stored

Hazardous / Flammable Flag

============================================================
31. LOGISTICS / TRADE REVIEW
============================================================

Show:

Import / Export / Both / Neither

Imported Inputs

Exported Products

Significant Logistics?

Transport Modes

Approximate Daily Vehicle Movement

============================================================
32. EXISTING APPROVALS REVIEW
============================================================

Reuse E04/E05 data.

If Yes:

show existing approval records.

Department

Approval / Licence / NOC

Number

Issue Date

Expiry Date

Status

Certificate availability

If No:

show:

No Existing Approvals Declared

Do not display empty rows.

============================================================
33. EXISTING APPLICATIONS REVIEW
============================================================

For relevant projects show:

Department

Service

Application ID

Submission Date

Current Status

Purpose:

avoid duplicate regulatory journeys later.

============================================================
34. INCENTIVE ATTRIBUTES REVIEW
============================================================

Show only applicable captured attributes.

Reuse existing Business DNA.

Examples may include:

Startup

MSME

R&D Intensive

Export Oriented

Employment Intensive

Environment-Focused

Do not display scheme eligibility yet.

============================================================
35. REVIEW SECTION ACTION
============================================================

Each review section should support:

EDIT SECTION

Click:

Edit Section
        ↓
returns user to the relevant E05 section

After editing:

        ↓
return to E06

Do not create a second editing form inside E06 unless needed for a small
inline correction.

============================================================
36. E06 USER-FACING GROUPS
============================================================

Create a clear profile-state summary using these groups:

NEEDS YOUR INPUT

NOT APPLICABLE

VERIFIED

SELF-DECLARED

NEEDS VERIFICATION

IMPORTANT:

These are display groupings.

They do NOT represent one underlying status enum.

============================================================
37. NEEDS YOUR INPUT
============================================================

Contains:

visible / required Business DNA fields that still lack sufficient input.

Example:

Hazardous Material Quantity
Needs Your Input

Click should navigate to the relevant E05 section.

============================================================
38. NOT APPLICABLE
============================================================

Contains branches deactivated by Business DNA.

Examples:

Boiler Details
Not Applicable

because:

Boiler = No

MIDC Plot Details
Not Applicable

because:

MIDC = No

Do not treat these as incomplete.

============================================================
39. SELF-DECLARED
============================================================

Use where:

Question State = Confirmed

and:

Verification = Self-Declared

Example:

Daily Water Requirement
80 KL/day

Self-declared

============================================================
40. VERIFIED
============================================================

Use where verification is:

SYSTEM_VERIFIED
or
DEPARTMENT_VERIFIED

Example:

Plot Area
4,800 sq.m

Verified

Do not invent verified status.

Only use it where source/state supports it.

============================================================
41. NEEDS VERIFICATION
============================================================

Show values such as:

MIDC Status
Not Sure

or:

Project Classification
Candidate / unresolved

or:

Land regulatory condition
Needs Verification

This should not automatically block profile confirmation unless configured as
a blocking requirement.

============================================================
42. NO ARBITRARY OVERALL PERCENTAGE
============================================================

Do NOT show:

92% Complete

Do NOT show:

Profile 86%

Instead show concrete counts/groups.

Example:

Needs Your Input
2

Needs Verification
3

Self-Declared
18

Verified
6

Not Applicable
11

This is much more meaningful.

============================================================
43. E06 ASK ASSISTANT
============================================================

Add action:

ASK ASSISTANT

Use the existing/future EKATMA Regulatory Assistant interaction pattern.

Do not create a consumer-chatbot bubble.

Preferred behavior:

Ask Assistant
        ↓
open right-side government-styled assistant drawer

Context:

Business Profile Review

Possible questions:

“Why is this information required?”

“What does Needs Verification mean?”

“Which document could support this field?”

“Explain this in Marathi.”

IMPORTANT:

This is only a contextual assistant entry point.

Do NOT redesign or independently build the entire RAG architecture here.

The existing RAG service architecture remains authoritative.

============================================================
44. ASSISTANT BOUNDARY
============================================================

Assistant may:

- explain
- retrieve relevant government source
- explain terminology
- explain a Business DNA field
- explain why a factual variable matters

Assistant must NOT:

- approve
- reject
- silently change Business DNA
- invent legal requirements
- override the Rule Engine
- mark self-declared values Department Verified

============================================================
45. E06 PRIMARY ACTION
============================================================

Primary CTA:

CONFIRM PROFILE

Secondary actions:

Save & Exit

Ask Assistant

Edit Section

============================================================
46. CONFIRM PROFILE PRE-CHECK
============================================================

Before confirmation:

check only true blocking issues.

Examples of blocking:

Required visible field missing

Objective validation failure

Critical contradiction still marked Needs Review

Examples of non-blocking:

Self-Declared

Needs Verification where permitted

Optional document not uploaded

P2 sector pack not complete

OCR not used

============================================================
47. CONFIRMATION DIALOG
============================================================

When user clicks:

CONFIRM PROFILE

show confirmation modal / state:

“Confirm Business Profile?”

Supporting text:

“EKATMA will use this Business Profile to evaluate regulatory
applicability and generate your personalised regulatory journey.”

If the project has active applications / approvals and profile values were
changed:

include the existing change-impact warning.

Actions:

Cancel

Confirm Profile

============================================================
48. CONFIRM PROFILE CREATES VERSION
============================================================

Conceptually:

Draft Business DNA
        ↓
Confirm Profile
        ↓
Business DNA Version created / confirmed

Example:

Business DNA
Version 1

Confirmed:
23 Sep 2026

Do not imply the data is legally verified merely because the entrepreneur
confirmed it.

Confirmation and verification are separate.

============================================================
49. FOUR OUTPUTS AFTER CONFIRMATION
============================================================

Immediately after confirmation, show a clean generation/result transition
containing FOUR outputs.

Do NOT create a giant dashboard.

Show:

1. BUSINESS DNA

2. REGULATORY APPLICABILITY

3. PERSONALISED REGULATORY JOURNEY

4. INCENTIVE JOURNEY

============================================================
50. OUTPUT 1 — BUSINESS DNA
============================================================

Show:

BUSINESS DNA

Status:
Profile Confirmed

Version:
Version 1

Description:

“Structured project information used across EKATMA.”

CTA:

View Master Project Dossier

        ↓
E07

============================================================
51. OUTPUT 2 — REGULATORY APPLICABILITY
============================================================

Show:

REGULATORY APPLICABILITY

Supported states:

Applicable

Conditional

Not Applicable

Needs Verification

Also allow:

environmental / pollution-related classification

ONLY where validated regulatory rules produce one.

Do not ask entrepreneur to manually choose the classification.

============================================================
52. REGULATORY APPLICABILITY IS RULE-DRIVEN
============================================================

Conceptual logic:

CONFIRMED BUSINESS DNA
        +
VALIDATED REGULATORY RULES
        ↓
REGULATORY APPLICABILITY

Do not use RAG alone to determine this.

============================================================
53. ENVIRONMENTAL / REGULATORY CLASSIFICATION
============================================================

Where validated rules produce a classification, show it in the output.

Example:

Environmental Classification
[Derived Result]

Source:
Configured Regulatory Rules

If unresolved:

Needs Verification

Do not invent the classification in Figma.

============================================================
54. OUTPUT 3 — PERSONALISED REGULATORY JOURNEY
============================================================

Show:

PERSONALISED REGULATORY JOURNEY

Status:

Generating

then:

Ready

Description:

“Your project-specific sequence of regulatory requirements,
dependencies and actions.”

CTA:

View Regulatory Journey

Prototype destination:
NEXT PHASE PLACEHOLDER

Do not build the complete journey in this prompt.

============================================================
55. OUTPUT 4 — INCENTIVE JOURNEY
============================================================

Show:

INCENTIVE JOURNEY

Status:

Generating / Ready

Description:

“Potential incentive opportunities evaluated from your Business DNA
and applicable scheme data.”

Do not display actual incentive eligibility unless scheme rules establish it.

CTA:

View Incentive Journey

Future placeholder only.

============================================================
56. REGULATORY JOURNEY GENERATION STATE
============================================================

After confirmation show a concise system state:

Confirming Business DNA
✓

Evaluating Regulatory Applicability
…

Building Dependency Graph
…

Generating Personalised Journey
…

Evaluating Incentive Attributes
…

Do not use unnecessary animations.

============================================================
57. GENERATION COMPLETION
============================================================

When conceptual generation completes:

Business DNA
✓ Confirmed

Regulatory Applicability
✓ Evaluated

Regulatory Journey
✓ Generated

Incentive Journey
✓ Generated

Then enable:

VIEW REGULATORY JOURNEY

Do not build the next page.

============================================================
E07 — MASTER PROJECT DOSSIER
============================================================

58. CREATE E07
============================================================

Create:

E07 — MASTER PROJECT DOSSIER

Purpose:

One reusable structured project-data workspace used across:

- regulatory discovery
- applications
- department processing
- inspections
- compliance
- incentives
- expansion / modification

This is NOT just a document folder.

It is the central structured project record.

============================================================
59. E07 PAGE HEADER
============================================================

Breadcrumb:

Home
>
My Businesses
>
[Selected Business]
>
Master Project Dossier

Title:

Master Project Dossier

Supporting text:

“View and manage the reusable project information used across
EKATMA services.”

============================================================
60. DOSSIER PROJECT CONTEXT
============================================================

Show:

Business / Project

Business ID

Project ID

Business DNA Version

Last Updated

Project Stage

Do not expose unnecessary database internals.

Business ID / Project ID may be displayed as official system identifiers
where appropriate.

============================================================
61. DOSSIER MAIN GROUPS
============================================================

Organise into:

BUSINESS / LEGAL ENTITY

PROMOTERS / AUTHORISED PERSONS

REGISTRATION IDENTIFIERS

PROJECT

LAND

BUILDING

INVESTMENT

EMPLOYMENT

PRODUCTION

PROCESS

MACHINERY

WATER

POWER

ENVIRONMENT

SAFETY / HAZARDOUS PROCESSES

STORAGE / LOGISTICS

EXISTING REGULATORY RECORDS

============================================================
62. BUSINESS / LEGAL ENTITY
============================================================

Show reusable fields such as:

Legal Entity Type

Legal Entity Name

Business / Project Name

Operator Entity

Relationship to Registered Entity

============================================================
63. PROMOTERS / AUTHORISED PERSONS
============================================================

Show:

Authorised Person

Promoter Relationship

Role

Relevant contact context

Do not display account login identity as project identity without proper
mapping.

============================================================
64. REGISTRATION IDENTIFIERS
============================================================

Show where applicable:

PAN

CIN

LLPIN

Registration Number

Other structured identifiers

============================================================
65. PROJECT GROUP
============================================================

Show:

Project Type

Classification

Industry

Activities

Products

Project Stage

Location

============================================================
66. LAND GROUP
============================================================

Show:

MIDC Status

Estate

Plot Number

Plot Area

Land Type

Ownership

Possession

Land-Use

Relevant permission state

============================================================
67. BUILDING GROUP
============================================================

Show:

Built-Up Area

Floors

Height

Occupancy

Construction Status

Building Risk Flags

============================================================
68. INVESTMENT GROUP
============================================================

Show:

Total Project Investment

Land

Building

Plant & Machinery

Other Capital Investment

============================================================
69. EMPLOYMENT GROUP
============================================================

Show:

Total

Permanent

Contract

Other

Current → Proposed where applicable.

============================================================
70. PRODUCTION GROUP
============================================================

Show:

Product

Capacity

Unit

Shifts

Operating Hours

Current → Proposed for expansion where relevant.

============================================================
71. PROCESS GROUP
============================================================

Show:

Process Type

Structured Process Attributes

Brief Description

Sector-pack fields later where available.

============================================================
72. MACHINERY GROUP
============================================================

Show:

Machinery

Boilers

Pressure Equipment

Dangerous Machinery

Relevant capacities / ratings

============================================================
73. WATER / POWER GROUPS
============================================================

Show reusable structured values.

Water:

Requirement

Quantity

Source

Power:

Requirement

Connected Load

LT / HT

HT Infrastructure

============================================================
74. ENVIRONMENT GROUP
============================================================

Show:

Environmental Characteristics

Wastewater

Air Emissions

Hazardous Materials

Hazardous Waste

Solid Waste

Derived classification where available

============================================================
75. SAFETY / HAZARDOUS PROCESSES
============================================================

Show:

Factory Context

Hazardous Processes

Fire Characteristics

Storage Risk

Relevant equipment context

============================================================
76. FIELD-LEVEL DOSSIER ROW
============================================================

Important fields should support a compact row structure:

FIELD

VALUE

SOURCE

VERIFICATION

USED BY

LAST UPDATED

BUSINESS DNA VERSION

Example:

Plot Area

4,800 m²

MIDC Allotment

Department Verified

Used By 4

22 Sep 2026

Version 1

============================================================
77. DO NOT SHOW ALL METADATA EVERYWHERE
============================================================

Keep the default dossier view readable.

Recommended:

Field
Value
Verification
Used By
Last Updated

Allow source/version detail via expansion or E08.

Do not create an excessively wide table if it harms usability.

============================================================
78. SOURCE
============================================================

Possible source examples:

Entrepreneur Declaration

Basic Requirements

Business Discovery

Existing Business Profile

MIDC Allotment

Uploaded Document

Government System

Department Verification

Do not invent a source.

============================================================
79. VERIFICATION
============================================================

Use only the separate Verification State.

Examples:

Self-Declared

User Confirmed

System Verified

Department Verified

Needs Verification

Invalid

Expired

Do not confuse this with questionnaire state.

============================================================
80. USED BY
============================================================

Show how the same master field is reused.

Example:

Plot Area

Used By:
4

Click:

        ↓
Used By detail

Possible records:

MIDC Service

MPCB CTE

Building Plan

Fire

DISH

Do not create separate duplicate Plot Area values for each.

============================================================
81. LAST UPDATED
============================================================

Show:

Date / Timestamp

and optionally:

Updated By

Example:

22 Sep 2026

Entrepreneur

or:

Department Verification

Do not imply a department changed a value unless that exists in the
prototype scenario.

============================================================
82. BUSINESS DNA VERSION
============================================================

Each important value should be able to reference:

Business DNA Version

Example:

Version 1

For expansion:

Current Version 3

Proposed Version 4 Draft

============================================================
83. DOSSIER EDIT
============================================================

Allow:

Edit

on appropriate user-editable fields.

But before editing:

check whether the field is actively used.

============================================================
84. ACTIVE-USE WARNING
============================================================

If a field is used by active applications / approvals:

show:

“Changing this value may affect existing applications and regulatory
requirements.”

Optionally show:

Used by:
MPCB CTE
MIDC Building Plan

Actions:

Cancel

Review Impact

Continue Editing

Do not silently overwrite.

============================================================
85. NEVER SILENTLY OVERWRITE
============================================================

NON-NEGOTIABLE.

Any important Business DNA change must preserve:

Old Value

New Value

Source

Verification State

Timestamp

Business DNA Version

Potential downstream impact

============================================================
86. VERIFIED FIELD EDIT
============================================================

If the entrepreneur attempts to change a Department Verified field:

do not silently replace the verified value.

Example:

Plot Area

Verified Value:
4,800 m²

Proposed User Value:
5,000 m²

Show:

“This differs from a verified value.”

Actions may include:

Cancel

Submit Correction / Continue for Review

Do not mark the new value as Department Verified automatically.

============================================================
87. DOSSIER FILTER / SEARCH
============================================================

Add lightweight:

Search project data

Filter by:

All

Needs Verification

Verified

Self-Declared

Used by Active Application

Recently Changed

Do not turn E07 into analytics.

============================================================
88. DOSSIER VERSION CONTEXT
============================================================

For Expansion / Modification:

allow clear context such as:

CURRENT BUSINESS DNA
Version 3

PROPOSED BUSINESS DNA
Version 4 Draft

Do not merge them prematurely.

============================================================
E08 — DATA PROVENANCE
============================================================

89. CREATE E08
============================================================

Create:

E08 — DATA PROVENANCE

This is a FIELD-LEVEL DETAIL VIEW.

It may open as:

side drawer

or

dedicated detail page

based on the existing EKATMA component style.

Prefer a right-side detail drawer if that matches the existing system.

============================================================
90. E08 PURPOSE
============================================================

Show exactly:

WHAT IS THE VALUE?

WHERE DID IT COME FROM?

HOW IS IT VERIFIED?

WHEN WAS IT ISSUED?

WHEN DOES IT EXPIRE?

WHERE IS IT USED?

HOW HAS IT CHANGED?

============================================================
91. E08 FIELD DETAIL STRUCTURE
============================================================

Display:

VALUE

SOURCE

VERIFICATION

ISSUE DATE
where applicable

EXPIRY DATE
where applicable

USED BY

VERSION HISTORY

LAST UPDATED

BUSINESS DNA VERSION

============================================================
92. E08 EXAMPLE
============================================================

Use an example such as:

FIELD

Plot Area

VALUE

4,800 m²

SOURCE

MIDC Allotment

VERIFICATION

Department Verified

ISSUE DATE

12 Jun 2026

EXPIRY DATE

Not Applicable

USED BY

MIDC Service

MPCB Consent to Establish

Building Plan

Fire

DISH

BUSINESS DNA VERSION

Version 1

============================================================
93. SOURCE DETAIL
============================================================

If source is a document:

show:

Source Type

Document Name

Document ID where appropriate

Issue Date

Issuer / Department

Optional action:

View Source Document

Do not build full Document Centre here.

============================================================
94. VERIFICATION DETAIL
============================================================

Show verification state clearly.

Example:

Department Verified

Supporting metadata may show:

Verified By:
MIDC

Verified On:
22 Sep 2026

Do not show an officer name unless the system actually has it.

============================================================
95. ISSUE / EXPIRY
============================================================

Only show Issue Date / Expiry Date where applicable.

Examples where expiry may apply:

Approval

Licence

Certificate

Do not force expiry on:

Plot Area

Building Height

Investment

etc.

For non-expiring data:

Expiry
Not Applicable

============================================================
96. USED BY DETAIL
============================================================

Show all current known consumers of the field.

Example:

USED BY

MIDC
Building / Planning Service

MPCB
Consent to Establish

Fire
Provisional Fire Review

DISH
Factory Context

Do not imply every listed department has verified the value.

“Used By” means data reuse, not verification ownership.

============================================================
97. VERSION HISTORY
============================================================

Show chronological value history.

Example:

VERSION 1

4,800 m²

Source:
Entrepreneur Declaration

Verification:
Self-Declared

------------------------------------------------------------

VERSION 2

4,800 m²

Source:
MIDC Allotment

Verification:
Department Verified

------------------------------------------------------------

VERSION 3 DRAFT

5,000 m²

Source:
Entrepreneur Proposed Change

Verification:
Needs Verification

============================================================
98. HISTORY MUST NOT BE DESTRUCTIVE
============================================================

Never remove previous values from the history.

A new value creates:

new version / updated record

not silent replacement.

============================================================
99. CURRENT VALUE
============================================================

Clearly distinguish:

CURRENT EFFECTIVE VALUE

from:

PREVIOUS VALUE

and:

PROPOSED VALUE

Especially for Expansion / Modification.

============================================================
100. PROPOSED VALUE STATE
============================================================

Example:

Current Effective Value

4,800 m²

Proposed Value

5,000 m²

Status:

Needs Verification

Do not use proposed value automatically in an existing approval until the
appropriate workflow accepts it.

============================================================
101. FIELD IMPACT / USED-BY WARNING
============================================================

If a changed field is used downstream:

show:

POTENTIAL IMPACT

“This value is currently used by active regulatory records.”

Used by:
3 Applications
1 Approval

This is informational.

Full regulatory impact analysis happens later.

============================================================
102. DO NOT CREATE FULL AUDIT MODULE
============================================================

E08 is field provenance.

Do NOT create:

full system audit history
officer activity log
application audit trail
security event log

Those are separate later features.

============================================================
103. E06 → E07 RELATIONSHIP
============================================================

From E06:

View Master Project Dossier
        ↓
E07

E07 contains the complete reusable structured profile.

============================================================
104. E07 → E08 RELATIONSHIP
============================================================

From an important dossier field:

View Source / Provenance

        ↓
E08

Example:

Plot Area
4,800 m²
[View Details]

        ↓

E08 Data Provenance

============================================================
105. E08 BACK BEHAVIOUR
============================================================

Close / Back

returns to:

E07 Master Project Dossier

without losing the selected project context.

============================================================
106. BUSINESS DNA VERSIONING
============================================================

Conceptually preserve:

Business DNA V1

        ↓
confirmed

Later:

Change proposed

        ↓
Business DNA V2 Draft

        ↓
review

        ↓
confirm

        ↓
Business DNA V2

Do not mutate V1 silently.

============================================================
107. CONFIRM PROFILE DOES NOT MEAN DEPARTMENT VERIFIED
============================================================

This is critical.

When entrepreneur clicks:

CONFIRM PROFILE

the profile becomes:

USER CONFIRMED

where appropriate.

It does NOT automatically become:

SYSTEM VERIFIED

or:

DEPARTMENT VERIFIED

============================================================
108. REGULATORY GENERATION INPUT
============================================================

The regulatory engine must use:

Confirmed Business DNA Version

plus:

validated regulatory rule version

to generate applicability.

Conceptually:

BUSINESS DNA VERSION 1
        +
REGULATORY RULE VERSION
        ↓
APPLICABILITY RESULT

============================================================
109. OUTPUT TRACEABILITY
============================================================

Preserve architecture so later a regulatory node can explain:

Why does this apply?

        ↓

Rule
+
Business DNA Fields
+
Source
+
Version

Do not build the full explainability page now.

============================================================
110. RAG / KNOWLEDGE LAYER RELATIONSHIP
============================================================

Ask Assistant can use the existing EKATMA RAG / knowledge service to:

- explain fields
- explain government terminology
- retrieve relevant GR/rule
- explain why information may matter

But:

RAG does NOT change the source value.

RAG does NOT change verification.

RAG does NOT confirm Business DNA.

RAG does NOT decide approval applicability.

============================================================
111. RULE ENGINE RELATIONSHIP
============================================================

Keep:

BUSINESS DNA
        ↓
RULE ENGINE
        ↓
REGULATORY APPLICABILITY
        ↓
DEPENDENCY GRAPH
        ↓
PERSONALISED JOURNEY

separate from:

RAG
        ↓
EXPLANATION / RETRIEVAL

============================================================
112. REGULATORY APPLICABILITY OUTPUT CONTRACT
============================================================

Each future requirement must be able to resolve as:

APPLICABLE

CONDITIONAL

NOT APPLICABLE

NEEDS VERIFICATION

Do not display unknown as automatically Applicable.

============================================================
113. PERSONALIZED JOURNEY OUTPUT CONTRACT
============================================================

Later journey nodes may include:

Department

Service

Stage

Dependency

Status

Action Required

Documents

SLA

Inspection

Compliance

Do not build the complete journey in this prompt.

============================================================
114. INCENTIVE JOURNEY OUTPUT CONTRACT
============================================================

Business DNA should feed scheme evaluation.

Do not make the entrepreneur re-enter:

Investment

Employment

Location

Sector

Classification

Exports

etc.

for incentives.

============================================================
115. PROFILE REVIEW RESPONSIVENESS
============================================================

Desktop:

Use structured two-column/section layout where readable.

Tablet:

Reduce columns.

Mobile:

Stack section summaries.

Do not make large tables horizontally unusable.

============================================================
116. DOSSIER RESPONSIVENESS
============================================================

Desktop:

Structured data table/list may be used.

Mobile:

Convert each field row into stacked label/value cards.

Preserve:

Value

Verification

Used By

Last Updated

============================================================
117. ACCESSIBILITY
============================================================

Preserve:

Keyboard navigation

Visible focus

Logical heading hierarchy

Accessible accordion controls

Accessible tables

Accessible drawers

Text + icon statuses

Adequate contrast

English / Marathi compatibility

Usable zoom

No color-only status meaning

============================================================
118. USER-FACING STATUS LANGUAGE
============================================================

Prefer:

Needs Your Input

Not Applicable

Verified

Self-declared

Needs Verification

Avoid exposing internal uppercase enum labels directly.

============================================================
119. REPRESENTATIVE E06 EXAMPLE
============================================================

Use a realistic profile such as:

ABC Pharma Manufacturing Unit

Identity
Complete

Legal Entity
ABC Pharma Pvt Ltd

Classification
MSME / Needs Verification as configured

Industry
Pharmaceuticals

Activities
Manufacture
Process
Package

Stage
Pre-Establishment

Location
Thane

MIDC
Yes

Land
Possession Received

Investment
₹40 Cr

Employment
180

Production
100 T/month

Building
2,500 m²

Power
750 kW
HT

Water
80 KL/day
MIDC Supply

Wastewater
Industrial + Domestic

Air Emissions
Yes

Hazardous Materials
Yes

Boiler
Yes

Factory Context
Yes

Existing Approvals
No

Documents
Some

Do not infer final approvals from this example.

============================================================
120. REPRESENTATIVE DOSSIER EXAMPLE
============================================================

Example field:

PLOT AREA

Value
4,800 m²

Source
MIDC Allotment

Verification
Department Verified

Used By
4

Last Updated
22 Sep 2026

Business DNA Version
1

Click:

View Provenance

============================================================
121. REPRESENTATIVE PROVENANCE EXAMPLE
============================================================

E08:

PLOT AREA

CURRENT EFFECTIVE VALUE
4,800 m²

SOURCE
MIDC Allotment

VERIFICATION
Department Verified

USED BY

MIDC Service

MPCB CTE

Building Plan

Fire

DISH

VERSION HISTORY

V1
4,800 m²
Self-Declared

V2
4,800 m²
MIDC Allotment
Department Verified

============================================================
122. FINAL E06 CHECK
============================================================

Before completing verify:

[ ] Business DNA review exists

[ ] Identity included

[ ] Legal Entity included

[ ] PAN/CIN/LLPIN/registration context included

[ ] Promoter / authorised person included

[ ] Classification included

[ ] Industry included

[ ] Activities included

[ ] Products included

[ ] Project Stage included

[ ] Location included

[ ] Land included

[ ] Investment included

[ ] Employment included

[ ] Production included

[ ] Process included

[ ] Building included

[ ] Power included

[ ] Water included

[ ] Wastewater included

[ ] Drainage included

[ ] Air Emissions included

[ ] Hazardous Material included

[ ] Hazardous Waste included

[ ] Safety included

[ ] Machinery included

[ ] Storage included

[ ] Logistics included

[ ] Trade included

[ ] Existing Approvals included

[ ] Existing Applications included

[ ] Incentive Attributes included

[ ] Document Availability included

[ ] Edit Section exists

[ ] Confirm Profile exists

[ ] Ask Assistant exists

[ ] No arbitrary completion percentage

[ ] Needs Your Input group exists

[ ] Not Applicable group exists

[ ] Verified group exists

[ ] Self-declared group exists

[ ] Needs Verification group exists

[ ] Question State and Verification State remain separate

============================================================
123. FINAL CONFIRMATION CHECK
============================================================

After Confirm Profile verify:

[ ] Confirmed Business DNA Version created

[ ] Confirmation does not imply Department Verification

[ ] Four outputs shown

[ ] Business DNA output shown

[ ] Regulatory Applicability output shown

[ ] Applicable supported

[ ] Conditional supported

[ ] Not Applicable supported

[ ] Needs Verification supported

[ ] Derived environmental/regulatory classification supported only when rules produce it

[ ] Personalised Regulatory Journey output shown

[ ] Incentive Journey output shown

[ ] Full journey page NOT built yet

============================================================
124. FINAL E07 CHECK
============================================================

Verify E07 contains:

[ ] One reusable project-data workspace

[ ] Business / Legal Entity

[ ] Promoters / Authorised Persons

[ ] PAN/CIN/LLPIN/Registration IDs

[ ] Project

[ ] Land

[ ] Building

[ ] Investment

[ ] Employment

[ ] Production

[ ] Process

[ ] Machinery

[ ] Water

[ ] Power

[ ] Environment

[ ] Safety / Hazardous Processes

[ ] Field Value

[ ] Field Source

[ ] Verification State

[ ] Used By

[ ] Last Updated

[ ] Business DNA Version

[ ] Active-use warning

[ ] No silent overwrite

============================================================
125. FINAL E08 CHECK
============================================================

Verify E08 shows:

[ ] VALUE

[ ] SOURCE

[ ] VERIFICATION

[ ] ISSUE DATE where applicable

[ ] EXPIRY DATE where applicable

[ ] USED BY

[ ] VERSION HISTORY

[ ] LAST UPDATED

[ ] BUSINESS DNA VERSION

[ ] Current Effective Value distinct from Previous / Proposed

[ ] Old versions preserved

[ ] Used By does not imply verification ownership

============================================================
126. FINAL FLOW
============================================================

E05
Adaptive Business Discovery
        ↓

E06
Business Profile Review

        ↓

Review:
Needs Your Input
Not Applicable
Verified
Self-declared
Needs Verification

        ↓

Edit Section if needed

        ↓

CONFIRM PROFILE

        ↓

CONFIRMED BUSINESS DNA VERSION

        ↓

FOUR OUTPUTS

1. BUSINESS DNA

2. REGULATORY APPLICABILITY
   Applicable
   Conditional
   Not Applicable
   Needs Verification

3. PERSONALISED REGULATORY JOURNEY

4. INCENTIVE JOURNEY

        ↓

Regulatory Journey Generation

Meanwhile:

BUSINESS DNA
        ↓
E07 MASTER PROJECT DOSSIER
        ↓
FIELD
        ↓
E08 DATA PROVENANCE
        ↓
Source + Verification + Used By + History

============================================================
127. FINAL SYSTEM PRINCIPLE
============================================================

E06 answers:

“Is the Business Profile ready to use?”

E07 answers:

“What is the current reusable master project data?”

E08 answers:

“Where did this specific value come from, how is it verified,
where is it used, and how has it changed?”

The Regulatory Engine then answers:

“What regulatory requirements apply to this Business DNA?”

These responsibilities must remain separate.

============================================================
FINAL INSTRUCTION
============================================================

Create ONLY:

E06 — Business Profile Review

E07 — Master Project Dossier

E08 — Data Provenance

Reuse the existing EKATMA design system.

Do not redesign E03–E05.

Do not create another questionnaire.

Do not merge adaptive state with verification state.

Do not use an arbitrary overall completion percentage.

Do not silently overwrite Business DNA.

Preserve Business DNA version history.

Allow field-level provenance and Used By traceability.

After Confirm Profile, show the FOUR outputs:

1. Business DNA
2. Regulatory Applicability
3. Personalised Regulatory Journey
4. Incentive Journey

Then prototype:

Confirm Profile
        ↓
Regulatory Journey Generation

Do NOT build the complete Regulatory Journey page yet.

Stop after E06–E08 and the journey-generation handoff are complete.