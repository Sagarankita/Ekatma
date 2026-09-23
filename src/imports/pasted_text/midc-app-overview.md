Create / update M06 — MIDC Application Overview.

IMPORTANT:
This is an APPLICATION-LEVEL workspace.

Do not redesign the government shell.
Do not regenerate Phase 0.
Do not create a new dashboard.
Do not change the existing visual language, colors, typography, spacing, table styles, buttons, status primitives, sidebar, header, footer, or accessibility components.

Continue from the existing EKATMA MIDC Department Figma file.

Reuse all existing components wherever possible.

This screen must feel like the single source of truth for understanding one MIDC application before an officer takes an action.

The officer should be able to understand:

1. Who is applying?
2. What project is this?
3. What MIDC service is being requested?
4. What is the current application state?
5. Where is the application currently routed?
6. What does the Business DNA say?
7. What documents/data are relevant?
8. Are there inconsistencies or missing information?
9. Are there dependencies?
10. Is inspection required?
11. What changed since the previous version?
12. What automated flags require officer attention?
13. What has happened to this application so far?

The screen is a contextual overview.

Detailed work must continue into the dedicated M07–M39 screens.

==================================================
1. SIDEBAR CONTEXT
==================================================

Use the existing MIDC officer sidebar.

The active navigation item for M06 must be:

Applications

Do not place M06 under:

- Service Catalogue
- Scrutiny
- Inspections
- Queries / Deficiencies
- Decisions

Those are separate functional areas.

Use the corrected MIDC sidebar structure:

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

Highlight only:

Applications

Do not create another sidebar.

==================================================
2. BREADCRUMB
==================================================

At the top of the content area, use:

Department Home > Applications > Application Overview

If the existing application search/queue context supports a more specific reusable breadcrumb, preserve the existing breadcrumb component, but the final application-level destination must clearly identify M06 as Application Overview.

Do not use:

Department Home > Scrutiny > ...

Do not use:

Department Home > Service Catalogue > ...

==================================================
3. PAGE PURPOSE
==================================================

Page title:

MIDC Application Overview

Optional supporting text:

"Single application context for review, scrutiny, dependencies, queries, inspection and decision workflow."

Keep this concise.

Do not turn the title area into a marketing-style hero.

This is an operational government application workspace.

==================================================
4. APPLICATION HEADER
==================================================

Create a strong but compact application header immediately below the breadcrumb.

The header must establish the application identity and current operational context.

Display:

Application ID
Business / Project
MIDC Service
Status
Current Desk
SLA
Scrutiny Route
Office / Region

Recommended structure:

LEFT:
Application ID
Business / Project

CENTER / SECONDARY:
MIDC Service
Office / Region

RIGHT:
Current Status
Current Desk
SLA

SECONDARY METADATA ROW:
Scrutiny Route
Project Stage
Last Updated

Use existing EKATMA status/badge components.

Do not invent a new status system.

The underlying application status must use the canonical application state model:

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

A service may skip states that do not apply.

Do not create conflicting application statuses.

Operational overlays such as:

Awaiting Entrepreneur Response
SLA Risk
Decision Pending

may appear as secondary action/status indicators.

They must not replace the underlying canonical application state.

==================================================
5. OFFICER CONTEXT VS APPLICATION CONTEXT
==================================================

Keep these two concepts separate.

OFFICER CONTEXT:
- assigned MIDC office / region
- assigned desk
- role
- permissions

APPLICATION CONTEXT:
- application's service
- application's current desk
- application's current state
- application's SLA
- application's project context

The "Current Desk" displayed in the application header refers to the APPLICATION'S current desk.

Do not confuse it with the logged-in officer's assigned desk.

The officer's own role/permission context can remain in the existing authenticated shell.

==================================================
6. SUMMARY INFORMATION AREA
==================================================

Below the application header, create a structured summary area.

Do not make this a wall of giant decorative cards.

Use the existing EKATMA summary-card component or compact information cards.

Show:

A. BUSINESS
- Business / Project name
- Entity
- Industry / activity where relevant
- Applicant

B. PROJECT STAGE
Use the canonical project-stage vocabulary:

Planning
Land acquisition
Pre-establishment
Construction
Installation
Ready to operate
Operational

Do not invent new project stages.

C. LOCATION
- State
- District
- Taluka
- Village / City
- PIN

D. MIDC ESTATE / PLOT
- MIDC estate
- Plot number
- Plot area
- Allotment status
- Possession status

Only display fields that are available for this application.

E. SERVICE
- Current MIDC service
- Service family
- Application purpose where configured

The service must come from the configured regulatory journey/service catalogue.

Do not imply that every application must have every possible MIDC service.

F. SUBMISSION
- Submission date
- Last updated
- Current version

G. FEE / CHALLAN
Where the configured MIDC service uses a fee, show:

- Fee status
- Challan/reference where applicable
- Payment/confirmation state

If the service does not use a fee:

Show:

"Not applicable for this service"

Do not invent a fee requirement.

H. CURRENT DESK
- Application current desk
- Office / region
- Role or workflow responsibility where configured

Remember that desk labels are configurable workflow labels, not claims about official MIDC organisational structure.

I. SLA
Show:
- SLA state
- elapsed time
- applicable SLA
- due date where configured

Use existing SLA components.

Do not create undocumented statutory SLA values.

Where useful, distinguish:
- department processing time
- entrepreneur response time
- inspection waiting time
- external dependency waiting time
- total elapsed time

Do not collapse these into an unexplained single score.

J. DEPENDENCIES
Show a concise dependency summary:

- prerequisites complete
- prerequisites pending
- prerequisites missing
- external dependencies
- downstream dependencies

Do not give MIDC controls over another department's decision.

K. INSPECTION REQUIREMENT
Show:

- Not required
- Required
- Pending scheduling
- Scheduled
- Completed
- Re-inspection required

Only show states supported by the application's configured workflow.

==================================================
7. APPLICATION TABS
==================================================

Create a horizontal tab navigation below the summary area.

Tabs must be:

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

The default active tab is:

Overview

Use the existing EKATMA tab component.

Do not make all tabs look like separate pages.

The tab bar is the navigation layer inside one application workspace.

==================================================
8. TAB BEHAVIOUR
==================================================

The tabs should connect to the existing logical page architecture.

Overview
→ M06

Business DNA
→ M07

Application
→ application/service-specific application details

Documents
→ relevant document review/context

Consistency
→ M16

Dependencies
→ M17

Queries
→ M18 / M19

Inspection
→ M21–M24 depending on workflow state

Timeline
→ M08

Regulatory Reference
→ relevant regulatory/reference context

Audit
→ M38

Do not create duplicate standalone screens if an existing screen already represents the functionality.

Reuse existing page structures and components.

==================================================
9. AUTOMATED SUMMARY
==================================================

Create an "Automated Review Summary" section in the Overview tab.

This is one of the most important parts of M06.

Its purpose is to give the officer a concise machine-generated picture of what deserves attention before entering detailed review screens.

Show:

A. COMPLETENESS

Display:
- complete / incomplete / needs verification
- count or concise summary of missing required information where available

Do not treat every missing optional/context field as an error.

Only use configured application requirements.

Provide a drill-down to the relevant detail.

B. MISSING DATA

Show:
- missing required application data
- missing required metadata
- unresolved Needs Verification items

Do not classify NOT_APPLICABLE fields as missing.

For example:

Boiler = NO
→ branch = NOT_APPLICABLE
→ do not display "missing boiler information."

C. EXPIRED DOCUMENTS

Show:
- expired documents
- document name
- validity state
- affected requirement if known

Use the existing document verification vocabulary.

Do not imply that an expired document automatically means rejection.

It is a scrutiny flag requiring review.

D. CROSS-FORM MISMATCH

Show whether automated consistency checks identified mismatches.

Examples:
- project name differs across forms
- plot number differs across submitted records
- area differs between application and supporting document
- project stage conflicts with submitted information

Do not invent mismatch values.

Use sample prototype-safe data.

Each mismatch must be explainable and drill into M16 Cross-form Consistency.

E. PREREQUISITE STATE

Show:
- prerequisites complete
- prerequisites pending
- prerequisites missing
- prerequisites requiring verification

Use the configured dependency model.

External departments must remain read-only context.

For example:

MPCB
Fire
DISH
Boiler
Utilities
Sector authority

may appear as dependency nodes.

MIDC cannot edit or decide their outcomes from this screen.

F. ADAPTIVE-PROFILE NEEDS VERIFICATION

Show Business DNA items whose relevant information is:

NEEDS_VERIFICATION
or
NEEDS_REVIEW

Make the source/context visible where useful.

Important:

Do not confuse:

Adaptive Profile state:
NOT_VISIBLE
VISIBLE
REQUIRED
ANSWERED
VALIDATED
CONFIRMED
SKIPPED
NOT_APPLICABLE
NEEDS_REVIEW

with:

Verification state:
SELF_DECLARED
USER_CONFIRMED
SYSTEM_VERIFIED
DEPARTMENT_VERIFIED
NEEDS_VERIFICATION
INVALID
EXPIRED

These are separate concepts.

G. CHANGE SINCE PREVIOUS VERSION

If a previous application/profile version exists, show:

- changed field
- previous value
- new value
- source
- reason for change where available
- affected MIDC service
- downstream dependency effect
- whether re-scrutiny is required

Example:

Plot area
Previous: 10,000 sq ft
Current: 12,000 sq ft

Then:

"Potential MIDC impact detected"

Do not make the system itself decide the statutory consequence.

The officer can drill into M20 Delta Re-scrutiny.

If there is no previous version:

"First submitted version — no previous version available."

H. INSPECTION TRIGGER

Show why an inspection has been:

- not triggered
- required
- pending
- scheduled
- completed
- requiring re-inspection

Where an automated rule has flagged inspection, show the configured trigger/reason.

Do not claim that AI independently decided inspection necessity.

I. SCRUTINY FLAGS

Show machine-generated or rule-based flags such as:

- missing required data
- document validity issue
- consistency mismatch
- dependency pending
- Needs Verification
- change requiring re-scrutiny
- configured scrutiny condition
- SLA risk

Separate these visually from officer judgment.

Label automated results clearly as:

Automated finding
or
Rule-based finding

Then provide:

Source
Rule / check
Timestamp
Drill-down

Do not call the automated result a final decision.

==================================================
10. MACHINE FACTS VS OFFICER JUDGMENT
==================================================

This screen must clearly distinguish:

AUTOMATED / SYSTEM FINDINGS

from:

OFFICER REVIEW / JUDGMENT

For example:

SYSTEM FINDING
"Plot area differs between Application Form and uploaded document."

OFFICER ACTION
"Review mismatch"

Do not display:

"Application should be rejected."

Do not display:

"Approval recommended by AI."

Do not let automated checks make statutory approval/rejection decisions.

The system can:

- retrieve
- compare
- explain
- flag
- prioritise
- identify potential inconsistencies

The officer remains responsible for statutory judgment.

==================================================
11. BUSINESS DNA PREVIEW
==================================================

Include a concise "Business DNA Snapshot" section on the Overview tab.

This is NOT a replacement for M07.

Show only the most relevant contextual information:

PROJECT
- project type
- classification
- project stage

IDENTITY
- entity
- business/project
- industry/activity

LOCATION / MIDC
- district
- MIDC estate
- plot

SCALE
- investment
- employment
- production capacity where relevant

BUILDING / UTILITIES
- construction status
- power
- water
- wastewater/drainage

REGULATORY CONTEXT
- relevant existing approvals
- active dependencies
- key Needs Verification items

Add:

"View full Business DNA"

which opens M07.

==================================================
12. FIELD CLASSIFICATION
==================================================

Where Business DNA information appears, preserve the distinction between:

APPLICATION FIELD
→ directly relevant to current MIDC scrutiny

CONTEXT FIELD
→ useful for understanding the project/dependencies

VERIFIED MASTER DATA
→ already sourced or verified and reusable

OTHER-DEPARTMENT FIELD
→ visible only as dependency/context

Use subtle labels or provenance indicators.

Do not overwhelm the page with metadata.

==================================================
13. DEPENDENCY PREVIEW
==================================================

Create a compact dependency panel.

Example structure:

DEPENDENCIES

MPCB
Status: Pending
Type: External prerequisite
Action: View dependency

Fire
Status: Parallel
Type: External node
Action: View dependency

MIDC Planning
Status: Active
Type: MIDC-controlled node

Utilities
Status: Pending
Type: Downstream dependency

Use configured dependency states:

Prerequisite
Dependency
Context
Parallel
Downstream
Blocked
Unlocked

Do not allow the MIDC officer to edit another department's decision.

Provide:

"View full dependency map"

→ M17.

==================================================
14. DOCUMENT PREVIEW
==================================================

Create a concise document status summary in Overview.

Example:

Documents
12 submitted
10 valid
1 expired
1 needs verification

If appropriate, show a small list of the most important document findings.

Do not add OCR review functionality.

The current prototype supports:

- uploaded documents
- user-entered metadata
- approval-generated certificates
- verified/reused system data

OCR/extraction-specific review is a later enhancement and must not be added here.

Provide:

"View Documents"

which opens the detailed document context.

==================================================
15. TIMELINE PREVIEW
==================================================

Include a compact "Recent Activity" or "Application Timeline" section.

Show the latest meaningful events, for example:

Application submitted
Fee confirmed
Initial scrutiny completed
Query raised
Entrepreneur response received
Resubmission received
Inspection scheduled
Application moved to current desk

Use timestamps.

Do not duplicate the entire M08 timeline.

Provide:

"View full timeline"

→ M08.

==================================================
16. CURRENT ACTION / NEXT STEP
==================================================

At the bottom or upper-right of the Overview area, provide a compact "Current Action" section based on the application's actual workflow state and officer permissions.

Examples:

Review application
Review automated pre-check
Review documents
Review consistency
Review dependency
Respond to query workflow
Review resubmission
Schedule inspection
Review inspection result
Proceed to decision workspace

Do not show every possible action simultaneously.

Only show actions relevant to:

- application state
- current desk
- service
- configured workflow
- officer permissions

Do not allow actions outside the officer's permission scope.

Do not create a generic "Approve" button merely because this is an application page.

Decision actions belong to M25/M26 and only appear where the configured workflow and permissions allow them.

==================================================
17. SLA DISPLAY
==================================================

The SLA component should be compact but informative.

Show:

SLA Status
Elapsed
Due
Current processing stage

Where available, distinguish:

Department processing
Entrepreneur response
Inspection waiting
External dependency waiting
Total elapsed

Do not create a fabricated universal SLA number.

If no SLA is configured:

"SLA not configured"

or equivalent existing system state.

==================================================
18. SAMPLE APPLICATION
==================================================

Use one realistic but clearly prototype-safe sample application.

Example:

Application ID:
MIDC-APP-2026-00482

Business / Project:
Aster BioTech Manufacturing Pvt. Ltd. — API Manufacturing Unit

MIDC Service:
Building / Planning

Project Stage:
Construction

MIDC Estate:
Example MIDC Estate

Plot:
B-42

Current State:
TECHNICAL_SCRUTINY

Operational overlay:
SLA Risk

Current Desk:
Planning / Building Scrutiny

Office / Region:
Configured MIDC Office — Prototype

Scrutiny Route:
Enhanced Review

Important:

These values are fictional prototype data.

Do not present them as official MIDC statistics, official office names, legal thresholds, or real regulatory requirements.

==================================================
19. NAVIGATION / DRILL-DOWNS
==================================================

M06 must act as the hub for the individual application.

Connect:

M03 Queue
→ M06

M04 Search
→ M06

M06
→ M07 Business DNA

M06
→ M08 Timeline

M06
→ M09 Automated Pre-check

M06
→ M10 Scrutiny Route

M06
→ service-specific scrutiny screens M11–M15

M06
→ M16 Consistency

M06
→ M17 Dependencies

M06
→ M18/M19 Queries

M06
→ M20 Delta Re-scrutiny

M06
→ M21–M24 Inspection

M06
→ M25/M26 Decision

M06
→ M27 Dependency Update / Entrepreneur Sync

M06
→ M28 Conditions / Compliance / Renewal

M06
→ M29 Expansion / Amendment

M06
→ M38 Audit / History

Do not duplicate these screens inside M06.

M06 is the contextual hub; those screens are the detailed workspaces.

==================================================
20. VERSION / RESUBMISSION CONTEXT
==================================================

If the application has been resubmitted, show:

Current version
Previous version
Resubmission date
Changed fields
New documents
Removed documents
Changed dependencies
Re-scrutiny required

Make version history visible.

Do not overwrite previous application data.

The officer must be able to understand what changed.

==================================================
21. EMPTY / EDGE STATES
==================================================

Create sensible prototype states for:

No previous version
No dependencies
No inspection required
No queries
No expired documents
No consistency mismatch
No Needs Verification items
No fee applicable
No SLA configured
No automated flags

Do not display empty cards unnecessarily.

Use concise states such as:

"No active dependencies"

"No inspection required for this service"

"No consistency mismatches detected"

"First submitted version"

==================================================
22. ACCESSIBILITY
==================================================

Reuse the existing EKATMA accessibility system.

Maintain:

- keyboard-friendly tab navigation
- visible focus states
- adequate contrast
- accessible labels
- English / Marathi compatibility
- readable tables
- non-color-only status indicators

Do not introduce new accessibility patterns.

==================================================
23. DESIGN LANGUAGE
==================================================

This is an operational government application workspace.

Use:

- structured information hierarchy
- dense but readable layout
- clear section headers
- compact status badges
- reusable cards
- restrained borders/dividers
- existing EKATMA tables
- existing breadcrumbs
- existing sidebar
- existing typography

Avoid:

- giant hero sections
- decorative illustrations
- chatbot-style UI
- glassmorphism
- neon gradients
- startup SaaS dashboard styling
- unnecessary charts
- giant KPI walls
- new colors
- new typography
- invented department branding

==================================================
24. FINAL SCREEN HIERARCHY
==================================================

The final M06 page should read approximately in this order:

SIDEBAR
Applications = ACTIVE

BREADCRUMB
Department Home > Applications > Application Overview

PAGE TITLE
MIDC Application Overview

APPLICATION HEADER
Application ID
Business / Project
Service
Status
Current Desk
SLA
Scrutiny Route
Office / Region

SUMMARY
Business
Project Stage
Location
MIDC Estate / Plot
Service
Submission
Fee / Challan
Current Desk
SLA
Dependencies
Inspection

APPLICATION TABS
Overview | Business DNA | Application | Documents | Consistency |
Dependencies | Queries | Inspection | Timeline |
Regulatory Reference | Audit

OVERVIEW CONTENT

1. Automated Review Summary
2. Business DNA Snapshot
3. Document Status
4. Dependency Summary
5. Current Scrutiny / Workflow Context
6. Recent Timeline
7. Current Action / Next Step

The officer should be able to understand the complete applicant story from this screen without opening every tab, while still having clear drill-down paths into the detailed workspaces.

==================================================
25. MOST IMPORTANT DESIGN PRINCIPLE
==================================================

M06 is the SINGLE APPLICATION CONTEXT HUB.

It is not:

- a second Department Home dashboard
- a Service Catalogue
- a Scrutiny workspace
- a Decision workspace
- a Business DNA editor
- a document OCR workspace
- a dependency decision console

It summarizes the entire application and provides clear routes to the detailed screens.

The officer should be able to answer:

"What is this application, what has happened to it, what is currently wrong or unresolved, what changed, what depends on what, where is it in the workflow, and what should I review next?"

without the system making the statutory decision for them.

Preserve all existing EKATMA components and visual language.
Create only the M06 application-overview-specific content and interactions.