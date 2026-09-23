Create M11 — Generic MIDC Scrutiny Workbench, instantiated first with the Land / Plot service pack.

IMPORTANT:
Continue from the existing EKATMA Figma file.

Do NOT regenerate Phase 0.
Do NOT redesign the existing government header, footer, accessibility strip, emblem, EKATMA identity, typography, colors, spacing, sidebar, breadcrumbs, buttons, tables, status primitives or overall visual system.

Reuse the existing MIDC Department shell and reusable components created in M01–M10.

This is the first actual SERVICE-SPECIFIC SCRUTINY WORKSPACE.

--------------------------------------------------
1. PRIMARY PURPOSE
--------------------------------------------------

M11 is the officer's main workspace for performing actual MIDC service scrutiny.

M09 performed objective automated pre-checks.

M10 explained the configured scrutiny route.

M11 is where the officer now examines the application, its Business DNA, evidence, documents, dependencies and regulatory references and records scrutiny findings.

The workflow is:

M09
Automated Pre-check
        ↓
M10
Scrutiny Route / Explainability
        ↓
M11
Service Scrutiny Workbench
        ↓
M12 / M13
Parameter + Document Detail
        ↓
M16
Cross-form Consistency
        ↓
M17
Dependencies
        ↓
M18
Consolidated Query
        ↓
M20
Delta Re-scrutiny
        ↓
M21–M24
Inspection
        ↓
M25–M26
Decision

Do NOT turn M11 into an approval/rejection screen.

The officer is reviewing the application here.
The final statutory decision belongs to the later Decision workspace.

--------------------------------------------------
2. CORE ARCHITECTURE
--------------------------------------------------

Build ONE reusable scrutiny workbench.

The layout must have three primary columns:

LEFT:
Application sections / scrutiny navigation

CENTER:
Current parameter / evidence / review content

RIGHT:
Regulation / source / dependency / officer notes / RAG

The workbench must be designed as a reusable component system.

The same structure must later support:

- Land / Plot
- Building / Planning
- Water / Utility
- Drainage / Infrastructure
- Construction / Follow-up
- Amendment / Modification
- Expansion
- Other configured MIDC services

Do NOT create a separate visual architecture for every MIDC service.

Only the review sections and parameters should change according to the configured service pack.

--------------------------------------------------
3. PAGE SHELL
--------------------------------------------------

Use the existing MIDC officer shell.

Sidebar:

Department Home
My Queue
Applications
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

Breadcrumb:

Department Home
→ Applications
→ Application Overview
→ Scrutiny
→ Land / Plot

Header:

Application ID
Business / Project
MIDC Service
Current Application State
Scrutiny Route
Current Desk
Office / Region
SLA

Example:

Application:
MIDC-APP-2026-00418

Business:
Aster Precision Components Pvt. Ltd.

Service:
Land / Plot

Application State:
INITIAL_SCRUTINY

Scrutiny Route:
ENHANCED REVIEW

Current Desk:
Land / Plot Scrutiny

Office / Region:
Assigned officer context

SLA:
Approaching

Do not allow the officer to change Department / Office / Role from this screen.

--------------------------------------------------
4. IMPORTANT: APPLICATION CONTEXT VS OFFICER CONTEXT
--------------------------------------------------

Keep these concepts separate.

OFFICER CONTEXT:

Department:
MIDC

Region / Office:
assigned context

Desk:
assigned context

Role:
assigned context

APPLICATION CONTEXT:

Application ID
MIDC service
Current desk
Application state
Scrutiny route
SLA
Business
Project
Dependencies

Do not confuse:

"my assigned desk"

with:

"application's current desk."

--------------------------------------------------
5. LEFT COLUMN — APPLICATION SCRUTINY NAVIGATION
--------------------------------------------------

Create a persistent left navigation panel inside the workbench.

Title:

APPLICATION SCRUTINY

Show sections such as:

1. Application Overview
2. Business / Project Context
3. Land / Plot
4. Allotment / Possession
5. Project Stage
6. Industry / Activity
7. Documents
8. Existing Approvals
9. Cross-form Consistency
10. Dependencies
11. Previous Submission
12. Officer Findings

The exact sections should be configurable according to the service.

For the Land / Plot service pack, highlight:

LAND / PLOT

The left navigation should show review progress using neutral states such as:

Not reviewed
In review
Reviewed
Query
Needs Verification

Do NOT use a percentage completion score.

Do NOT create a "95% compliant" indicator.

Do NOT create a risk score.

The section navigation is only a way to move through the application.

--------------------------------------------------
6. LAND / PLOT SERVICE PACK
--------------------------------------------------

Instantiate the generic workbench with these Land / Plot review sections:

LAND / PLOT IDENTITY

- MIDC estate
- Plot number
- Plot area

ALLOTMENT / POSSESSION

- Allotment status
- Possession status

PROJECT CONTEXT

- Project type
- Project stage
- Proposed industry / activity
- Investment / project context

PLOT ROUTE

- Existing plot / new plot route
- Related existing approval / application

EVIDENCE

- Land documents
- Allotment evidence
- Possession evidence
- Other configured land / plot documents

CONSISTENCY

- Master Project Dossier
- Current MIDC application
- Other department forms where applicable

DEPENDENCIES

- Relevant prerequisites
- Related MIDC services
- External department dependencies

Only show fields that are relevant to the configured Land / Plot service.

--------------------------------------------------
7. ADAPTIVE BUSINESS DNA RULE
--------------------------------------------------

Do NOT force the officer to review or complete every possible Business DNA field.

The Business DNA has already been built from the entrepreneur's adaptive profile.

M11 consumes that information.

If a field was determined to be:

NOT_APPLICABLE

do not display it as a missing field.

Do not ask the officer to fill it.

Do not turn NOT_APPLICABLE into:

Missing
Incomplete
Needs Verification

unless a separate configured rule explicitly requires officer verification.

Similarly, preserve:

NEEDS_REVIEW

as a distinct state.

The officer should see that the underlying Business DNA field requires review rather than being forced to recreate the entrepreneur questionnaire.

--------------------------------------------------
8. CENTER COLUMN — CURRENT REVIEW PANEL
--------------------------------------------------

The center column is the primary scrutiny workspace.

At the top show:

LAND / PLOT

with the selected parameter.

For the first prototype, use:

PLOT AREA

Show a prominent value:

4,800 m²

Then show the source and verification information directly beneath it.

Example:

Source:
Master Project Dossier

Verification:
SYSTEM VERIFIED

Application value:
4,800 m²

Previous submission:
4,800 m²

Status:
Needs officer review

Do not make the officer manually type the value again.

The system should display existing data.

The officer records a scrutiny finding against the existing record.

--------------------------------------------------
9. PARAMETER REVIEW CARD
--------------------------------------------------

Create a reusable "Parameter Review" component.

Every reviewable parameter should support:

VALUE
SOURCE
VERIFICATION STATE
RELATED DOCUMENT
CROSS-FORM VALUES
PREVIOUS VALUE
DEPENDENCY IMPACT

Example:

PARAMETER

Plot Area

CURRENT VALUE
4,800 m²

SOURCE
Master Project Dossier

VERIFICATION
System Verified

CURRENT APPLICATION
4,800 m²

PREVIOUS SUBMISSION
4,800 m²

RELATED DOCUMENT
MIDC Plot / Allotment Record

CROSS-FORM VALUES
MPCB application: 4,800 m²
Building application: 4,800 m²

DEPENDENCY IMPACT
No dependency impact identified

Add:

View parameter details

→ M12

--------------------------------------------------
10. SOURCE / PROVENANCE
--------------------------------------------------

Every important value must have visible provenance.

Possible source labels:

Master Project Dossier
Business DNA
Current MIDC Application
Previous MIDC Application
Uploaded Document
Verified Document Repository
External Department Record
System-derived value
Officer-entered observation

Do not present all values as if they have equal reliability.

Use the existing verification-state model.

Examples:

SELF_DECLARED
USER_CONFIRMED
SYSTEM_VERIFIED
DEPARTMENT_VERIFIED
NEEDS_VERIFICATION
INVALID
EXPIRED

Do not create a second competing verification vocabulary.

--------------------------------------------------
11. OFFICER REVIEW STATE
--------------------------------------------------

For the actual scrutiny finding, use these officer states:

VALID
QUERY
INVALID
NEEDS VERIFICATION

These are officer scrutiny states.

Keep them visually separate from the underlying verification state of the source data.

Example:

Source verification:
System Verified

Officer scrutiny:
Needs Verification

This is valid.

Do NOT collapse these into one generic "status."

The distinction is important:

Verification state tells us how the data/evidence was established.

Officer review state tells us what the officer concluded about the parameter during scrutiny.

--------------------------------------------------
12. OFFICER ACTION BAR
--------------------------------------------------

For each parameter provide actions:

Save Review
Flag
Raise Query
Mark Valid
Request Additional Evidence
Open Regulatory Reference

Primary review action should be visually clear.

If the officer chooses:

Raise Query

open the existing query interaction pattern.

The query should reference:

- Application ID
- Parameter
- Current value
- Evidence
- Issue
- Required response

Do not create a separate query design language.

It must connect to M18 / M19.

--------------------------------------------------
13. DO NOT ALLOW UNSUPPORTED BULK DECISIONS
--------------------------------------------------

Do not include:

Approve Application
Reject Application
Issue Certificate
Final Decision

inside the parameter review panel.

Those actions belong to M25 / M26.

M11 is scrutiny.

The officer can record:

Valid
Query
Invalid
Needs Verification

but the screen must not imply that one parameter's state automatically decides the entire application.

--------------------------------------------------
14. LAND / PLOT REVIEW — PARAMETER GROUPS
--------------------------------------------------

Create a structured parameter list.

GROUP 1:
MIDC ESTATE

Fields:

MIDC Estate
Source
Verification
Related document
Officer review state

GROUP 2:
PLOT IDENTIFICATION

Plot Number
Plot Area

GROUP 3:
ALLOTMENT / POSSESSION

Allotment Status
Possession Status

GROUP 4:
PROJECT CONTEXT

Project Type
Project Stage
Proposed Industry / Activity
Investment / Project Context

GROUP 5:
PLOT ROUTE

Existing Plot / New Plot
Related Existing Approval / Application

GROUP 6:
EVIDENCE

Required land / plot documents
Document verification states
Reusable verified documents

GROUP 7:
CONSISTENCY

Master Project Dossier
Current MIDC Application
Other relevant applications

GROUP 8:
DEPENDENCIES

Prerequisite state
Related MIDC service
External dependency

Each group should be collapsible.

Do not display all fields in one enormous form.

--------------------------------------------------
15. LAND / PLOT EXAMPLE
--------------------------------------------------

Use a realistic prototype application.

Example:

MIDC Estate:
Sample Industrial Estate

Plot Number:
P-104

Plot Area:
4,800 m²

Allotment:
Confirmed in system record

Possession:
Recorded

Project Type:
New Industrial Project

Project Stage:
New Construction

Proposed Activity:
Precision Components Manufacturing

Investment / Project Context:
Prototype value

Plot Route:
New Plot

Related Application:
MIDC-APP-2026-00418-LAND

Clearly label sample data as prototype data where appropriate.

Do not invent official MIDC legal thresholds.

--------------------------------------------------
16. RIGHT COLUMN — REGULATORY / SOURCE PANEL
--------------------------------------------------

The right column should provide contextual support while the officer reviews the selected parameter.

Title:

REGULATORY / SOURCE CONTEXT

Sections:

SOURCE

Show where the current value came from.

RULE / REQUIREMENT

Show the configured requirement relevant to the parameter.

SOURCE DOCUMENT

Show:

Document title
Version
Effective date where available
Source type

Do not invent legal citations.

If a source is unavailable, explicitly show:

"Source reference unavailable in current configuration."

Do not fabricate a rule.

--------------------------------------------------
17. REGULATORY REFERENCE
--------------------------------------------------

Add:

Open Regulatory Reference

This should open the existing Regulatory Assistant / RAG interaction.

The RAG system may:

- retrieve relevant source material
- explain the source
- show the relevant requirement
- cite the source
- explain terminology

It must NOT:

- make the statutory decision
- invent requirements
- declare approval
- declare rejection
- replace officer judgment

Label retrieved material as:

Regulatory Reference

not:

AI Decision.

--------------------------------------------------
18. RIGHT COLUMN — DEPENDENCY CONTEXT
--------------------------------------------------

Add a compact section:

DEPENDENCY IMPACT

Show:

Prerequisite
Status
Source Department
Effect on current review

Example:

MPCB Consent to Establish
Pending
MPCB
Relevant upstream dependency

If an external department appears:

show its status and evidence/reference if available.

Do not provide:

Approve
Reject
Edit

controls for external departments.

Add:

View Dependency Graph

→ M17

The dependency model must remain configurable.

--------------------------------------------------
19. RIGHT COLUMN — OFFICER NOTES
--------------------------------------------------

Create:

OFFICER NOTES

Provide a structured text area.

Placeholder:

"Record an observation about this parameter or evidence."

Show:

Officer
Role
Timestamp

Do not make officer notes appear as if they are system-generated facts.

Clearly label them:

Officer observation

--------------------------------------------------
20. RIGHT COLUMN — RAG / REGULATORY ASSISTANT
--------------------------------------------------

Keep RAG secondary.

Provide a compact expandable section:

REGULATORY ASSISTANT

Example:

"Relevant references available for Plot Area"

Then show:

2 relevant sources

View references

Do not make the RAG panel visually dominate the scrutiny workspace.

The officer must remain focused on the application evidence.

--------------------------------------------------
21. DOCUMENT EVIDENCE PANEL
--------------------------------------------------

When a parameter has supporting evidence, show a compact document panel in the center column.

Example:

SUPPORTING DOCUMENT

Land / Plot Allotment Record

Status:
Previously verified

Version:
v2

Source:
Verified Document Repository

Related to:
Plot P-104

Actions:

Preview
Open Document Review

→ M13

If the document is already verified and reused, show:

"Previously verified — reused from Business Document Repository."

Do not overwrite the master document.

Preserve document version history.

--------------------------------------------------
22. CROSS-FORM EVIDENCE
--------------------------------------------------

For relevant parameters, show values from other forms.

Example:

PLOT AREA

Master Project Dossier
4,800 m²

MIDC Land Application
4,800 m²

Building Application
4,800 m²

MPCB Application
4,800 m²

Status:
Consistent

If a mismatch exists:

Master Project Dossier
4,800 m²

MIDC Land Application
4,800 m²

Fire-related application
4,600 m²

Status:
Mismatch detected

CTA:

Investigate in Cross-form Consistency

→ M16

Do not silently correct the conflicting value.

Do not let M11 overwrite another department's data.

--------------------------------------------------
23. PREVIOUS VALUE / CHANGE CONTEXT
--------------------------------------------------

If the application is a resubmission, show:

PREVIOUS SUBMISSION

Previous value
4,800 m²

Current value
5,200 m²

Changed:
Yes

Source:
Resubmission #2

Show:

View Delta Re-scrutiny

→ M20

If unchanged:

Previous value
4,800 m²

Current value
4,800 m²

Changed:
No

Do not make the officer manually compare versions.

--------------------------------------------------
24. DEPENDENCY IMPACT
--------------------------------------------------

For each relevant parameter, allow the system to show:

DEPENDENCY IMPACT

Example:

Plot Area change

Potentially affected:
Building / Planning
Inspection
Downstream configured services

Do not automatically state:

"Approval invalidated."

Instead:

"Change may affect configured downstream requirements. Review dependency graph."

→ M17

The system identifies impact/context.
The officer reviews the regulatory significance.

--------------------------------------------------
25. APPLICATION-LEVEL SCRUTINY SUMMARY
--------------------------------------------------

At the top or bottom of the workbench, create a compact:

SCRUTINY SUMMARY

Show:

Parameters reviewed
Queries raised
Needs Verification
Invalid
Valid
Documents requiring attention
Dependencies requiring attention

Do NOT display:

Compliance score
Risk score
Application score
Approval probability

Example:

Parameters reviewed: 8
Valid: 5
Query: 1
Needs Verification: 2
Invalid: 0

This is a factual review summary, not a quality score.

--------------------------------------------------
26. SCRUTINY PROGRESS
--------------------------------------------------

If progress is shown, it must be structural rather than evaluative.

Example:

Application Sections

✓ Project Context
● Land / Plot
○ Documents
○ Dependencies
○ Consistency

Do not use:

"Application is 72% compliant."

Do not use a progress percentage to imply approval readiness.

--------------------------------------------------
27. SERVICE-SPECIFIC CONFIGURATION
--------------------------------------------------

The workbench must support a service configuration object conceptually:

SERVICE

Land / Plot

REVIEW PARAMETERS

Configured list of fields

REQUIRED DOCUMENTS

Configured document list

DEPENDENCIES

Configured dependency list

REVIEW RULES

Configured rules

INSPECTION REQUIREMENT

Configured condition

REGULATORY REFERENCES

Configured sources

Do not hard-code these as permanent universal MIDC rules.

This is important because the same workbench will later be reused by:

Building / Planning
Water / Utility
Amendment
Expansion
Other configured services

--------------------------------------------------
28. EXISTING PLOT VS NEW PLOT
--------------------------------------------------

The Land / Plot service pack should distinguish:

EXISTING PLOT

from:

NEW PLOT

If:

Existing Plot

show relevant existing plot / approval / possession context.

If:

New Plot

show relevant allotment / possession / plot allocation context.

Do not show irrelevant fields.

This should be driven by the application/service configuration.

--------------------------------------------------
29. BUSINESS DNA DISPLAY
--------------------------------------------------

Create a compact Business DNA context bar near the top of the workbench.

Show only relevant attributes:

Project type
Project stage
Industry/activity
MIDC involvement
Estate
Plot
Location

Example:

Business DNA
Project: New Industrial Project
Stage: New Construction
MIDC: YES
Estate: Sample Industrial Estate
Plot: P-104

Add:

View Business DNA

→ M07

The officer should be able to inspect the source and verification state without leaving the scrutiny context.

--------------------------------------------------
30. APPLICATION STATE
--------------------------------------------------

Keep canonical application state separate from scrutiny findings.

Example:

Application State:
INITIAL_SCRUTINY

Scrutiny Route:
ENHANCED REVIEW

Current Review Section:
LAND / PLOT

Parameter State:
NEEDS VERIFICATION

Do not replace the canonical application state with:

"Land Review"
or
"Enhanced"

Those are different dimensions.

--------------------------------------------------
31. QUERY CREATION
--------------------------------------------------

If the officer selects:

Raise Query

open a structured query form.

Show:

Parameter:
Plot Area

Issue:
Current value requires clarification

Evidence:
Current MIDC application

Required response:
Clarify plot area and provide supporting evidence

Related document:
Land / Plot record

Officer comment:
[textarea]

Actions:

Save Draft
Add Another Issue
Add Document Request
Send to Consolidated Query

The final consolidated query should be handled by M18.

Do not immediately send a separate query for every individual parameter unless the officer explicitly chooses to.

--------------------------------------------------
32. INVALID STATE
--------------------------------------------------

If officer marks a parameter:

INVALID

require an explanatory note and supporting evidence/reference where appropriate.

Show:

Officer finding:
Invalid

Reason:
[required]

Evidence:
[optional/required according to configuration]

Do not automatically turn:

Parameter = Invalid

into:

Application = Rejected.

The application-level decision belongs to M25/M26.

--------------------------------------------------
33. NEEDS VERIFICATION STATE
--------------------------------------------------

Use:

NEEDS VERIFICATION

when available information is insufficient for the officer to establish the required finding.

Show:

Why verification is needed
What evidence would resolve it
Optional document request
Optional query

This must remain distinct from:

NOT_APPLICABLE

NOT_APPLICABLE means the field does not apply.

NEEDS VERIFICATION means the field is relevant but the evidence is insufficient.

--------------------------------------------------
34. SAVE / VERSIONING
--------------------------------------------------

Every officer review action should be versioned.

Record:

Officer
Role
Parameter
Previous review state
New review state
Timestamp
Comment
Source
Document version
Rule version where relevant

Do not silently overwrite previous officer findings.

The audit history should eventually be available through M38.

--------------------------------------------------
35. PERMISSION BOUNDARIES
--------------------------------------------------

Respect the authenticated officer's permissions.

An officer may only perform actions available to their assigned role/desk/service scope.

Do not expose controls that the officer does not have permission to perform.

Example:

Some officers may:

View
Review
Flag

Others may additionally:

Raise Query
Request Evidence

Do not create an invented hierarchy.

The permission system is configurable.

--------------------------------------------------
36. M11 ↔ M12 / M13
--------------------------------------------------

M11 is the main workbench.

M12 is detailed parameter inspection.

M13 is detailed document review.

Navigation:

M11
→ select Plot Area
→ View Parameter Details
→ M12

M11
→ select Land / Plot document
→ Open Document Review
→ M13

Do not duplicate the entire M12/M13 interfaces inside M11.

M11 should provide enough context for efficient scrutiny while detailed investigation happens in those screens.

--------------------------------------------------
37. M11 ↔ M16
--------------------------------------------------

If the officer sees a mismatch:

show:

Cross-form mismatch detected

View in Cross-form Consistency

→ M16

M16 becomes the detailed investigation workspace.

M11 should not become a duplicate of M16.

--------------------------------------------------
38. M11 ↔ M17
--------------------------------------------------

If the parameter has dependency impact:

show:

Dependency impact detected

View Dependency Graph

→ M17

M17 becomes the full dependency workspace.

M11 only shows the dependency relevant to the current parameter.

--------------------------------------------------
39. M11 ↔ M20
--------------------------------------------------

For resubmissions:

show:

Previous value
Current value
Change detected

Then:

View Delta Re-scrutiny

→ M20

M11 should not reproduce the full delta analysis.

--------------------------------------------------
40. M11 ↔ M18 / M19
--------------------------------------------------

M11 can generate individual deficiencies.

M18 consolidates them into one entrepreneur-facing query.

M19 records the complete query/response history.

Therefore:

Raise Query
→ Add to Consolidated Query

Do not create a completely separate query workflow here.

--------------------------------------------------
41. RAG BOUNDARY
--------------------------------------------------

The Regulatory Assistant may retrieve and explain regulatory references.

It may:

- retrieve source
- cite source
- explain a provision
- show related requirements
- help locate relevant forms/documents

It must NOT:

- approve
- reject
- create statutory findings
- invent thresholds
- invent documents
- override configured rules
- replace officer judgment

If no reliable source exists, show:

"Regulatory reference unavailable."

Do not fabricate one.

--------------------------------------------------
42. NO OCR DEPENDENCY
--------------------------------------------------

Do not build OCR-review interfaces into M11.

The current prototype works with:

- uploaded documents
- document metadata
- verified documents
- system records
- entrepreneur-submitted values
- approval-generated records

OCR can be added later as an enhancement.

Do not create fake OCR confidence scores or extraction-review panels.

--------------------------------------------------
43. VISUAL STRUCTURE
--------------------------------------------------

The final page should visually read as:

┌───────────────────────────────────────────────────────────────┐
│ APPLICATION HEADER                                            │
│ Application ID | Business | Service | State | SLA            │
├──────────────┬───────────────────────────────┬───────────────┤
│              │                               │               │
│ APPLICATION  │ CURRENT REVIEW                │ REGULATORY /  │
│ SECTIONS     │                               │ SOURCE        │
│              │ LAND / PLOT                   │               │
│ Overview     │                               │ Source        │
│ Business     │ Plot Area                     │ Requirement   │
│ Land / Plot  │ 4,800 m²                      │ Dependency    │
│ Allotment    │                               │ Officer Notes │
│ Project      │ Source                        │ RAG           │
│ Documents    │ Verification                  │               │
│ Consistency  │ Previous Value                │               │
│ Dependencies │ Cross-form values             │               │
│              │ Dependency impact             │               │
│              │                               │               │
│              │ Officer Review                │               │
│              │ ○ Valid                       │               │
│              │ ○ Query                       │               │
│              │ ○ Invalid                     │               │
│              │ ○ Needs Verification          │               │
│              │                               │               │
│              │ [Save Review] [Raise Query]   │               │
│              │ [Request Evidence]            │               │
│              │                               │               │
└──────────────┴───────────────────────────────┴───────────────┘

This is a professional government operational workspace.

Avoid:

- giant decorative cards
- dashboard-style analytics
- excessive gradients
- chatbot-first design
- neon UI
- glassmorphism
- oversized illustrations
- unnecessary charts

--------------------------------------------------
44. ACCESSIBILITY
--------------------------------------------------

Follow the existing EKATMA accessibility system.

Ensure:

- status is not communicated by color alone
- every icon has a text/tooltip equivalent
- keyboard-accessible navigation
- clear focus states
- accessible tabs and accordions
- readable table headers
- sufficient contrast
- accessible document previews
- accessible drawers/modals
- English / Marathi compatibility

--------------------------------------------------
45. EMPTY STATES
--------------------------------------------------

Create realistic edge states.

NO SUPPORTING DOCUMENT:

"No supporting document is currently linked to this parameter."

NO CROSS-FORM VALUE:

"No comparable value is currently available from another application."

NO PREVIOUS VALUE:

"No previous submission value available."

NO DEPENDENCY:

"No configured dependency is associated with this parameter."

NO REGULATORY REFERENCE:

"No regulatory reference is currently available in the configured source set."

NOT APPLICABLE:

"Not applicable to this application context."

Do not show these as errors.

--------------------------------------------------
46. SAMPLE LAND / PLOT SCREEN
--------------------------------------------------

The prototype should open with:

LAND / PLOT

Section:
Plot Identity

Selected parameter:
Plot Area

Current value:
4,800 m²

Source:
Master Project Dossier

Verification:
System Verified

Current MIDC application:
4,800 m²

Previous submission:
4,800 m²

Cross-form:

Building:
4,800 m²

MPCB:
4,800 m²

Status:
Consistent

Supporting document:
Land / Plot Allotment Record
Previously verified

Dependency:
No direct dependency impact identified

Officer review:
Needs Verification

Reason:
Officer must confirm that the submitted plot evidence corresponds to the current project record.

Actions:

Save Review
Flag
Raise Query
Mark Valid
Request Additional Evidence
Open Regulatory Reference

Clearly mark sample data as prototype data where necessary.

--------------------------------------------------
47. FINAL SCREEN FLOW
--------------------------------------------------

The complete M11 interaction should be:

Application
↓
Select scrutiny section
↓
Select parameter
↓
Review current value
↓
Inspect source / verification
↓
Inspect supporting document
↓
Compare cross-form values
↓
Compare previous value
↓
Check dependency impact
↓
Consult regulatory reference if required
↓
Record officer scrutiny state
↓
Save review / flag / query / evidence request
↓
Move to next parameter

At application level:

Parameter findings
↓
Consolidated deficiencies if needed
↓
Delta re-scrutiny if resubmitted
↓
Inspection if configured
↓
Final Decision

--------------------------------------------------
48. CORE PRINCIPLE
--------------------------------------------------

The officer should NEVER have to reconstruct what the entrepreneur already submitted.

The workbench should answer:

WHAT DID THE ENTREPRENEUR SUBMIT?

↓
WHAT DOES THE BUSINESS DNA ALREADY TELL US?

↓
WHERE DID EACH VALUE COME FROM?

↓
WHAT HAS BEEN VERIFIED?

↓
WHAT DOCUMENT SUPPORTS IT?

↓
IS IT CONSISTENT WITH OTHER APPLICATIONS?

↓
WHAT DEPENDENCY DOES IT AFFECT?

↓
WHAT DID IT SAY IN THE PREVIOUS SUBMISSION?

↓
WHAT DOES THE CONFIGURED SERVICE REQUIRE?

↓
WHAT DOES THE OFFICER FIND?

↓
DOES THE OFFICER NEED A QUERY OR MORE EVIDENCE?

The workbench supports the officer's scrutiny.
It does not replace the officer's statutory judgment.