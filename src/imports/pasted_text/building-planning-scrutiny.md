Create M14 — MIDC Building / Planning Scrutiny.

IMPORTANT:
Continue from the existing EKATMA MIDC Department Figma file.

Do NOT redesign or regenerate the existing design system, government header/footer, navigation, sidebar, typography, colours, buttons, tables, status components, breadcrumbs, accessibility elements, or generic officer workspace.

M14 must be a SERVICE-SPECIFIC REVIEW VIEW built on the same reusable MIDC scrutiny workbench established in M11.

The goal is to show how the common scrutiny architecture is configured for a Building / Planning service.

Do not create a completely separate dashboard or workflow for Building / Planning.

==================================================
1. SCREEN PURPOSE
==================================================

This screen represents the MIDC officer actively scrutinising a Building / Planning application.

The officer should be able to:

- understand the project and plot context
- review Building / Planning-specific parameters
- inspect supporting documents
- see prerequisite and dependency status
- identify inconsistencies
- record scrutiny findings
- raise a query when required
- request additional evidence
- open the relevant parameter detail
- open supporting documents
- understand which information came from the entrepreneur's Business DNA
- understand which information is verified system/master data
- understand which information belongs to another department

This is an OFFICER SCRUTINY screen.

It is NOT:

- a final approval screen
- a rejection screen
- an external department decision screen
- a replacement for the Business DNA screen
- a replacement for the Regulatory Dependency View
- a replacement for the Cross-form Consistency screen
- a generic application dashboard

==================================================
2. REUSE THE COMMON MIDC SCRUTINY WORKBENCH
==================================================

Use the same three-part scrutiny architecture established in M11.

LAYOUT:

LEFT:
Application / scrutiny navigation

CENTER:
Current Building / Planning review content

RIGHT:
Regulatory source + dependency + provenance + officer context

Maintain the same visual hierarchy and interaction patterns used by M11, M12 and M13.

Do not introduce a new layout language.

The Building / Planning service pack should feel like a configuration of the same reusable component system.

==================================================
3. TOP APPLICATION CONTEXT BAR
==================================================

At the top of the page show the application context.

Example prototype data:

Application ID:
MIDC-APP-2026-00418

Business:
Aster Precision Components Pvt. Ltd.

Project:
Precision Components Manufacturing Unit

MIDC Service:
Building / Planning

Project Stage:
Pre-construction

Application State:
TECHNICAL_SCRUTINY

Scrutiny Route:
Enhanced Review

Current Application Desk:
Planning / Building Scrutiny

Officer Context:
Department: MIDC
Region / Office: Assigned Office
Desk: Planning / Building Scrutiny
Role: Planning / Building Scrutiny Officer

SLA:
Show the existing SLA component used elsewhere in the MIDC prototype.

IMPORTANT:
Keep officer context separate from application context.

Do not imply that the officer's assigned desk is automatically the application's current desk.

==================================================
4. BUSINESS DNA CONTEXT STRIP
==================================================

Directly below the application header, show a compact "Business DNA Context" section.

This is READ-ONLY contextual information inherited from the entrepreneur's Master Business Profile / Master Project Dossier.

Do not make the officer re-enter these values.

Show:

Plot:
MIDC Industrial Estate — Example Estate

Plot Area:
4,800 m²

Project Type:
New Construction

Construction / Modification:
New Construction

Built-up Area:
2,300 m²

Floors:
G+2

Building Height:
Example prototype value

Occupancy:
Industrial / Manufacturing

Industrial Machinery:
Yes

Hazardous / Flammable Context:
Configured based on Business DNA

Warehouse:
Yes / No according to prototype data

Project Stage:
Pre-construction

Relevant Prerequisite State:
MPCB Consent to Establish — Completed / Verified

Each value should be traceable to its source.

Where appropriate show:
Source: Business DNA
Verification: System Verified / User Confirmed / Needs Verification

Do not create unsupported legal conclusions from these fields.

==================================================
5. LEFT NAVIGATION — BUILDING / PLANNING REVIEW GROUPS
==================================================

Create a vertical review navigation.

Groups:

01 — Project / Plot Identity
02 — Plan / Application Data
03 — Building Parameters
04 — Prerequisite Documents
05 — Technical Documents
06 — Conditional Documents
07 — Consistency Checks
08 — Dependencies

Each group should display a small status indicator showing whether the group is:

- Reviewed
- Needs Verification
- Query
- Invalid
- Not Yet Reviewed

Do not use a percentage-based "completion" score.

Do not create an artificial overall risk score.

Clicking a group updates the central review area.

==================================================
6. CENTRAL AREA — PROJECT / PLOT IDENTITY
==================================================

Default selected group:
Project / Plot Identity

Show a structured review table.

Parameters:

Plot / Parcel
Plot Area
MIDC Estate
Project Location
Project Type
Construction / Modification
Project Stage
Existing / New Structure Context

For each parameter show:

Parameter
Current Value
Source
Verification
Officer Finding
Evidence

Example:

Plot Area
4,800 m²
Source: Master Project Dossier
Verification: System Verified
Officer Finding: Valid
Evidence: Plot / Allotment Record

Plot / Estate
Example MIDC Estate
Source: Business DNA
Verification: User Confirmed
Officer Finding: Needs Verification

Use the same parameter-review interaction pattern established in M12.

When the officer clicks a parameter such as "Plot Area":

Open M12 — Generic Parameter Detail.

Do not duplicate the entire M12 page inside M14.

==================================================
7. BUILDING PARAMETERS REVIEW
==================================================

When "Building Parameters" is selected, show a structured parameter table.

Include:

Built-up Area
Number of Floors
Building Height
Occupancy / Use
Construction Status
Industrial Machinery
Warehouse
Hazardous / Flammable Context
New Construction / Modification
Project Stage

For every parameter show:

Value
Source
Verification State
Related Evidence
Officer Finding

Officer Finding must support:

VALID
QUERY
INVALID
NEEDS VERIFICATION

These are officer scrutiny findings.

Do NOT treat these as canonical application states.

Do NOT automatically change the application to REJECTED because an individual parameter is marked Invalid.

The final application decision belongs to the later Decision Workspace.

==================================================
8. PLAN / APPLICATION DATA
==================================================

Create a review section for Building / Planning application information.

Show configured fields relevant to the selected MIDC Building / Planning service.

Examples:

Application type
Construction / modification type
Plot reference
Proposed built-up area
Floor information
Building use
Construction status
Project stage
Related MIDC service/application

For every field show:

Submitted value
Master / Business DNA value where available
Source
Verification state
Officer finding
Related document

If a submitted value differs from a verified master value, make the difference visible.

Do not silently overwrite either value.

Provide an action:

"Open Cross-form Consistency"

which links to M16.

==================================================
9. PREREQUISITE DOCUMENTS
==================================================

Create a dedicated review group for prerequisite evidence.

The prototype should show documents/evidence required by the configured Building / Planning workflow.

For example:

MPCB Consent to Establish

Status:
Completed

Source Department:
MPCB

Evidence / Approval Reference:
MPCB reference number

Verification:
System / Department verified, according to configured prototype data

IMPORTANT:

MIDC may VIEW the external approval reference and evidence.

MIDC may use the prerequisite state as context for its own scrutiny.

MIDC must NOT have controls such as:

Approve MPCB CTE
Reject MPCB CTE
Modify MPCB CTE
Issue MPCB CTE

The external department's decision remains outside MIDC's permission scope.

Clicking the document should open the generic document-review pattern from M13 where appropriate.

==================================================
10. TECHNICAL DOCUMENTS
==================================================

Create a section for Building / Planning technical evidence.

Use configurable document categories.

Example prototype categories:

Building / Planning Plan
Site / Layout Plan
Building Drawing
Structural / Technical Evidence
Construction-related evidence
Other configured technical document

For each document show:

Document name
Document ID
Version
Issue date where relevant
Source
Verification
Validity
Reuse state
Officer review state

Actions:

Preview
Open Document Review
Verify
Request Correction
Request Additional Evidence
Mark Invalid

Do not invent a universal list of legally mandatory documents.

The service configuration determines which documents are Required, Conditional, or Not Required.

==================================================
11. CONDITIONAL DOCUMENTS
==================================================

Create a separate section for documents that appear only when relevant Business DNA or regulatory conditions activate them.

Examples of conditional context:

- hazardous / flammable activity
- warehouse
- industrial machinery
- specific occupancy
- modification / expansion
- construction stage
- configured prerequisite
- configured inspection requirement

Use the existing adaptive document-state logic.

Do NOT display a conditional document as "missing" if the condition that activates it is not satisfied.

If the system cannot determine whether the condition applies, use:

Needs Verification

rather than inventing a requirement.

==================================================
12. DEPENDENCY PANEL
==================================================

Create a prominent dependency panel on the right side of the workbench.

Title:

"Regulatory Dependencies"

Subtitle:

"Configured dependencies relevant to this Building / Planning service"

Display the dependency chain for the baseline prototype journey.

Baseline sequence:

MIDC / Land Context
        ↓
MPCB Consent to Establish
        ↓
MIDC Building / Planning
        ↓
Provisional Fire
        ↓
Utilities + Conditional NOCs
        ↓
Construction
        ↓
Pre-operation approvals

IMPORTANT:

This is a CONFIGURABLE DEPENDENCY MODEL.

Do not imply that every MIDC Building / Planning application follows this exact sequence.

For the current prototype example, however, show:

MPCB Consent to Establish
Source Department: MPCB
Status: Completed / Verified
Evidence / Approval Reference: MPCB-CTE-XXXX

Current MIDC Building / Planning
Source Department: MIDC
Status: Under Technical Scrutiny

Provisional Fire
Source Department: Fire / configured authority
Status: Pending / Conditional / Configured relationship

The exact status should be prototype-safe and should not claim a real approval record.

==================================================
13. DEPENDENCY NODE RELATIONSHIPS
==================================================

Show relationship labels where appropriate:

UPSTREAM
CURRENT MIDC NODE
DOWNSTREAM
PARALLEL
CONDITIONAL
EXTERNAL DEPARTMENT
MIDC CONTROLLED

For example:

MPCB CTE
[External Department]
[Upstream]
[Completed]

↓

MIDC Building / Planning
[MIDC Controlled]
[Current]

↓

Provisional Fire
[Configured External / Related Node]
[Conditional / Pending]

Do not hard-code Provisional Fire as a universal prerequisite.

If the configured dependency engine represents Provisional Fire as a combined or related node, show that relationship visually.

If another service configuration uses a different dependency arrangement, the component must be capable of changing accordingly.

==================================================
14. DEPENDENCY DETAIL
==================================================

Each dependency row/node must show:

Prerequisite
Source Department
Status
Evidence / Approval Reference

Optional additional context:

Dependency Type
Current Application / Service
Blocking State
Downstream Impact

Example:

Prerequisite:
Consent to Establish

Source Department:
MPCB

Status:
Completed

Evidence:
MPCB-CTE-2026-XXXX

Dependency Type:
External / Upstream

MIDC action:
View dependency

Do NOT provide an external-department decision control.

==================================================
15. CONSISTENCY CHECKS
==================================================

Create a Building / Planning-specific consistency section.

Compare relevant shared values across:

Business DNA
Master Project Dossier
MIDC Land / Plot application
MIDC Building / Planning application
Other configured departmental applications

Example:

Plot Area

Master Project Dossier:
4,800 m²

MIDC Land:
4,800 m²

MIDC Building / Planning:
4,800 m²

MPCB:
4,800 m²

Fire:
4,600 m²

Show:

MATCH
or
MISMATCH

with source/provenance.

Do not silently resolve mismatches.

Officer actions:

Accept verified source
Raise Query
Request entrepreneur clarification
Record justified exception

Do not allow the MIDC officer to edit another department's application.

Provide a link to:

"M16 — Cross-form Consistency"

==================================================
16. OFFICER REVIEW STATES
==================================================

Every reviewable Building / Planning parameter or document must support:

VALID
QUERY
INVALID
NEEDS VERIFICATION

Use the existing status components.

Explain the distinction:

VALID:
Officer has reviewed the item and accepts it for current scrutiny.

QUERY:
Additional clarification/correction is required.

INVALID:
The reviewed parameter/evidence is not acceptable for the current scrutiny context.

NEEDS VERIFICATION:
The available information is insufficient to make a determination.

IMPORTANT:

These are scrutiny findings.

They are NOT equivalent to:

APPROVED
REJECTED
CORRECTION_REQUIRED

The canonical application state remains controlled by the workflow.

==================================================
17. OFFICER ACTIONS
==================================================

At the bottom of the central workbench provide:

Save Review
Flag for Attention
Raise Query
Request Additional Evidence
Open Parameter Detail
Open Document Review
Open Cross-form Consistency
Open Dependency View

Do not place:

Approve Application
Reject Application

on this screen.

Final statutory decision belongs to M25/M26.

==================================================
18. QUERY INTEGRATION
==================================================

When the officer selects:

Query
Request Correction
Request Additional Evidence

do not create an isolated query system.

Create a deficiency candidate that can be sent to:

M18 — Consolidated Query Builder

The deficiency should retain:

Deficiency ID
Application ID
Review group
Parameter/document
Issue
Evidence
Required correction
Officer comment
Source / regulatory reference if configured

The officer should be able to add the issue to the consolidated query rather than repeatedly contacting the entrepreneur separately.

==================================================
19. DOCUMENT INTEGRATION
==================================================

When the officer clicks a Building / Planning document:

Open M13 — Generic Document Review.

Preserve:

Document ID
Version
Verification
Validity
Source
Reuse history
Other applications using it

If the document is already verified and reused, show:

"Previously verified — reused from Business Document Repository."

Do not overwrite the master document.

Any corrected/replaced document must become a new version.

Preserve the old version in history.

==================================================
20. PARAMETER INTEGRATION
==================================================

When the officer clicks a parameter:

Open M12 — Generic Parameter Detail.

For example:

Built-up Area

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

M14 should remain the service-level review screen.

M12 remains the detailed single-parameter investigation screen.

==================================================
21. CHANGE / DELTA CONTEXT
==================================================

If the current Building / Planning application is a resubmission, show whether any Building / Planning values changed.

Example:

Built-up Area
Previous:
2,000 m²

Current:
2,300 m²

Building Plan:
Version 1 → Version 2

Construction Type:
No change

Plot Area:
No change

Show a compact banner:

"Changes detected since previous submission"

Provide:

"Open Delta Re-scrutiny"

which links to M20.

Do not force the officer to re-review unchanged information unless the configured workflow requires it.

==================================================
22. REGULATORY SOURCE PANEL
==================================================

The right-side source panel should show the regulatory basis or configured rule relevant to the selected review item.

Structure:

Review Item
↓
Configured Requirement
↓
Source / Regulation
↓
Evidence
↓
Officer Finding

Do not fabricate:

- legal section numbers
- statutory thresholds
- mandatory document lists
- approval timelines
- official MIDC rules

If a source is not available in the prototype data, show:

"Regulatory source configured in knowledge catalogue"

or

"Source not available — Needs Verification"

Do not invent a citation.

==================================================
23. AI / AUTOMATION BOUNDARY
==================================================

If an automated recommendation or pre-check appears, label it clearly as:

System finding
Configured rule
Machine check
Needs officer judgment

AI or automation may:

- surface relevant Business DNA
- identify inconsistencies
- retrieve relevant rules
- identify missing configured evidence
- explain dependency relationships
- flag potential changes
- prioritise information for review

AI must NOT:

- approve the application
- reject the application
- decide another department's approval
- invent a legal requirement
- silently alter Business DNA
- silently alter another department's record

The officer remains responsible for the scrutiny finding.

==================================================
24. VISUAL HIERARCHY
==================================================

Prioritise information in this order:

1. Application identity
2. Current Building / Planning service
3. Project / plot context
4. Building parameters
5. Review findings
6. Supporting documents
7. Dependency status
8. Cross-form consistency
9. Regulatory source
10. Officer actions

Avoid excessive dashboard cards.

This is an operational scrutiny workspace, not an analytics dashboard.

Use tables, structured sections, expandable evidence rows, status badges and compact contextual panels.

==================================================
25. SAMPLE SCREEN STATE
==================================================

Use a realistic prototype-safe example.

Application:
MIDC-APP-2026-00418

Business:
Aster Precision Components Pvt. Ltd.

Service:
Building / Planning

Project:
New Precision Components Manufacturing Unit

Plot Area:
4,800 m²

Built-up Area:
2,300 m²

Floors:
G+2

Construction:
New Construction

Occupancy:
Industrial / Manufacturing

Industrial Machinery:
Yes

Warehouse:
Yes

Hazardous / Flammable:
Configured contextual flag

Project Stage:
Pre-construction

MPCB CTE:
Completed / Verified

Building / Planning:
Under Technical Scrutiny

Provisional Fire:
Configured related / conditional dependency

Scrutiny Route:
Enhanced Review

Do not present these values as actual legal records or official MIDC data.

==================================================
26. RESPONSIVE / ACCESSIBILITY REQUIREMENTS
==================================================

Use Auto Layout.

Reuse existing EKATMA components.

Maintain readable tables.

Use accessible status indicators with text labels, not colour alone.

Ensure long document names, regulatory references and dependency descriptions wrap correctly.

Maintain English/Marathi-compatible text containers.

Do not rely solely on icons.

Maintain sufficient contrast.

==================================================
27. FINAL INTERACTION MODEL
==================================================

The intended officer flow is:

Open Application
↓
Open Building / Planning Scrutiny
↓
Review Business DNA / project context
↓
Review Project / Plot Identity
↓
Review Plan / Application Data
↓
Review Building Parameters
↓
Open M12 for parameter-level detail when necessary
↓
Review prerequisite documents
↓
Open M13 for document-level review when necessary
↓
Review technical / conditional documents
↓
Inspect dependency context
↓
Review consistency checks
↓
Record:
Valid / Query / Invalid / Needs Verification
↓
Send deficiencies to M18 if required
↓
Open M20 if this is a resubmission/change
↓
Save scrutiny findings
↓
Continue through the configured MIDC workflow

Do NOT end this screen with an approval or rejection action.

Final approval/rejection remains in M25/M26.