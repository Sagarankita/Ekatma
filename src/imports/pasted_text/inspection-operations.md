Create:

M21 — Inspection Queue
M22 — Inspection Planning

IMPORTANT:
Continue from the existing EKATMA MIDC Department Figma file.

Do NOT regenerate or redesign:
- Phase 0 design system
- Maharashtra Government header/footer
- EKATMA branding
- typography
- colours
- spacing
- sidebar
- breadcrumbs
- accessibility components
- generic tables
- status components
- application shell
- common officer workbench
- calendar/list components if they already exist

M21 and M22 must use the existing MIDC application, Business DNA, dependency, SLA, inspection and audit models.

These are INSPECTION OPERATIONS screens.

M21 answers:

"Which inspections currently require MIDC attention?"

M22 answers:

"How should this inspection be planned and coordinated?"

They do NOT conduct the inspection.

M23 is the inspection execution workspace.

M24 handles observations and re-inspection.

==================================================
1. INSPECTION LIFECYCLE
==================================================

Use the shared inspection lifecycle:

INSPECTION REQUIREMENT
        ↓
M21 — INSPECTION QUEUE
        ↓
M22 — INSPECTION PLANNING
        ↓
INSPECTION SCHEDULED
        ↓
M23 — INSPECTION WORKSPACE
        ↓
OBSERVATION / OUTCOME
        ↓
M24 — OBSERVATION / RE-INSPECTION
        ↓
FINAL DECISION / NEXT WORKFLOW STEP

Do not collapse all of these into M21.

==================================================
2. APPLICATION STATE INTEGRATION
==================================================

Use the existing canonical application states.

Relevant states include:

INSPECTION_PENDING
INSPECTION_SCHEDULED

These are canonical application states.

Operational labels such as:

Awaiting Inspector
Inspection Planning Required
Inspection Date Pending
Re-inspection Required
Inspection Coordination Pending

are overlays and must NOT replace the canonical application state.

For example:

Application State:
INSPECTION_PENDING

Operational label:
Inspection Planning Required

Do not create:

INSPECTION_PLANNING

as a new canonical application state.

==================================================
3. COMMON APPLICATION / INSPECTION CONTEXT
==================================================

Where M21 is opened for a specific application, show:

Application ID:
MIDC-APP-2026-00418

Business:
Aster Precision Components Pvt. Ltd.

Project:
Precision Components Manufacturing Unit

MIDC Service:
Building / Planning

Site:
Example MIDC Estate

Plot:
A-18

Application State:
INSPECTION_PENDING

Inspection Type:
Configured Building / Planning Site Inspection

Department:
MIDC

Region / Office:
Assigned Office

Desk:
Assigned Inspection Desk

Role:
Inspection Officer / Assigned Role

SLA:
Existing SLA component

Re-inspection:
No

Keep officer context separate from application context.

==================================================
4. M21 — INSPECTION QUEUE
==================================================

Create M21 as an operational queue.

Page title:

"Inspection Queue"

Subtitle:

"View and manage MIDC inspections requiring scheduling, completion, follow-up or re-inspection."

The primary content should be a structured table.

Do NOT make M21 a dashboard with large decorative cards.

==================================================
5. M21 TABLE COLUMNS
==================================================

Use exactly these core columns:

Application
Business
MIDC Service
Site / Estate / Plot
Inspection Type
Required By
Status
Assigned Inspector / Team
Target Date
SLA Impact
Re-inspection Flag

Additional contextual fields may appear through row expansion or a detail drawer.

Do not overload the default table with too many columns.

==================================================
6. SAMPLE QUEUE ROW
==================================================

Example:

Application:
MIDC-APP-2026-00418

Business:
Aster Precision Components Pvt. Ltd.

MIDC Service:
Building / Planning

Site:
Example MIDC Estate / Plot A-18

Inspection Type:
Building / Planning Site Inspection

Required By:
Configured date

Status:
Pending

Assigned Inspector:
Unassigned

Target Date:
Not Scheduled

SLA Impact:
Inspection waiting

Re-inspection:
No

This is prototype-safe sample data.

Do not represent it as an actual government inspection.

==================================================
7. INSPECTION STATUS
==================================================

Use inspection-specific operational statuses.

Possible statuses:

PENDING
SCHEDULED
IN_PROGRESS
COMPLETED
CANCELLED
RE_INSPECTION_REQUIRED
AWAITING_COORDINATION
NEEDS_VERIFICATION

The exact status set should remain configurable.

Do not replace canonical application states with these inspection statuses.

Example:

Application State:
INSPECTION_PENDING

Inspection Status:
AWAITING_COORDINATION

These are two separate dimensions.

==================================================
8. RE-INSPECTION FLAG
==================================================

Show a dedicated:

Re-inspection

column.

Possible values:

No
Yes
Not Applicable

If Yes:

show a visible flag:

"Re-inspection"

and allow the officer to open the relevant M24 history.

Do not create a new inspection merely because the flag exists.

M24 remains responsible for the observation → correction → re-inspection history.

==================================================
9. M21 FILTERS
==================================================

Provide filters:

Service
Office
District
Date
Pending
Scheduled
Completed
Re-inspection

Also allow, where useful:

Inspection Type
Assigned Inspector / Team
Estate
Application State
SLA Risk
SLA Breached

Do not create arbitrary "inspection priority score" filters.

==================================================
10. M21 SEARCH
==================================================

Provide search by:

Application ID
Business
Project
Estate
Plot
Inspection ID

The search must operate within the officer's permitted scope.

A search result does not imply that the application exists globally if it is outside the officer's permission scope.

==================================================
11. M21 SORTING
==================================================

Allow sorting by:

Required By
Target Date
SLA Risk
Oldest Pending
Recently Scheduled
Recently Updated
Re-inspection

Do not rank inspectors or teams by performance.

Do not create an "Inspector Quality Score."

==================================================
12. SLA IMPACT
==================================================

Show factual inspection-related SLA context.

Examples:

Within SLA
Due Soon
SLA Risk
SLA Breached

Where possible distinguish:

Inspection waiting time
MIDC processing time
Entrepreneur response time
External dependency waiting time
Total elapsed application time

Do not treat all elapsed time as MIDC inspection delay.

Do not automatically attribute an SLA delay to an inspector.

==================================================
13. M21 ROW ACTIONS
==================================================

For each inspection row provide:

View Application
View Inspection
Plan Inspection
View Dependency
View Documents
View Query History
View Delta
View Re-inspection History

Depending on state.

If Pending:

Plan Inspection
→ M22

If Scheduled:

View Plan
→ M22

If Completed:

View Inspection
→ M23

If Re-inspection Required:

View History
→ M24

Do not expose final approval/rejection actions here.

==================================================
14. M21 INSPECTION DETAIL DRAWER
==================================================

Clicking an inspection row should open a detail drawer.

Show:

Inspection ID
Application ID
Business
Project
MIDC Service
Estate
Plot
Inspection Type
Requirement Source
Status
Assigned Inspector / Team
Target Date
Required By
SLA Impact
Re-inspection Flag
Dependency Context
Documents
Previous Inspection if applicable

Actions:

Plan Inspection
Open Application
Open Documents
Open Dependency
Open M24 History

==================================================
15. INSPECTION REQUIREMENT SOURCE
==================================================

Every inspection should show WHY it exists.

Possible source:

Configured Regulatory Journey
Service Configuration
Scrutiny Finding
Delta Impact
Previous Inspection Outcome
Officer Requirement
Other Configured Rule

Example:

Inspection Requirement:

"Configured Building / Planning inspection"

Source:

Service configuration

or:

Inspection Requirement:

"Inspection impact identified during Delta Re-scrutiny"

Source:

M20

Do not invent legal requirements.

If the source cannot be established:

"Inspection requirement — Needs Verification"

==================================================
16. M20 → M21 INTEGRATION
==================================================

If M20 identifies an inspection impact:

M20:

"Inspection impact detected"

↓

M21:

Create / surface inspection requirement

Example:

Building Area:
2,000 → 2,300 m²

Configured impact:
Inspection review required

M21:

Inspection Status:
Pending

Re-inspection:
No

Do not automatically schedule the inspection.

The requirement first enters the queue.

==================================================
17. M14 / M15 → M21 INTEGRATION
==================================================

M14 Building / Planning or M15 Water / Utility may result in a configured inspection requirement.

Example:

M14:
Building / Planning scrutiny

Inspection:
Required

↓

M21:
Inspection Queue

Inspection Type:
Building / Planning Site Inspection

The service-specific scrutiny screen should link into M21.

M21 should retain the originating service and reason.

==================================================
18. M17 DEPENDENCY INTEGRATION
==================================================

Inspection may depend on other configured nodes.

M21 should show compact dependency context.

Example:

MPCB CTE:
Complete

MIDC Building / Planning:
Current / Inspection Required

Fire:
Conditional

Water / Utility:
Parallel

Do not recreate the complete dependency graph.

Use:

"View Regulatory Dependencies"

→ M17

==================================================
19. M21 EXTERNAL DEPARTMENT CONTEXT
==================================================

If an inspection may involve:

Fire
DISH
Boiler
MPCB
Other configured authority

show:

External Participation:
Possible / Configured / Requested / Confirmed

Do not assume participation.

Do not give MIDC controls over another department's inspection team.

Example:

Potential participating department:

Fire

Status:
Coordination requested

MIDC action:
View coordination state

Not:

Assign Fire Inspector

Approve Fire inspection

Change Fire checklist

==================================================
20. M22 — INSPECTION PLANNING
==================================================

Create:

M22 — Inspection Planning

Purpose:

Turn a pending inspection requirement into a configured inspection plan.

Workflow:

Inspection Requirements
        ↓
Identify Site Visit
        ↓
Find Compatible Inspection Windows
        ↓
Coordinate Where Permitted
        ↓
Create Inspection Plan
        ↓
Inspection Scheduled

Do not execute the inspection here.

==================================================
21. M22 HEADER
==================================================

Show:

Inspection ID
Application ID
Business
Project
MIDC Service
Site
Plot
Inspection Type
Requirement Source
Current Status

Example:

Inspection:
INSP-2026-00418

Application:
MIDC-APP-2026-00418

Service:
Building / Planning

Status:
PENDING

==================================================
22. INSPECTION REQUIREMENTS
==================================================

First section:

"Inspection Requirements"

Show:

Why inspection is required
Inspection type
Required by
Site
Related application
Relevant service
Configured checklist
Special preparation requirements
Dependencies that must be satisfied before inspection

Example:

Inspection Type:
Building / Planning Site Inspection

Required By:
Configured date

Site:
Example MIDC Estate — Plot A-18

Requirement Source:
Configured service workflow

Checklist:
MIDC Building / Planning Checklist

Do not invent statutory inspection criteria.

==================================================
23. SITE VISIT IDENTIFICATION
==================================================

Create a site information section.

Show:

Estate
Plot
Project Location
Site Address / configured location
Site Contact
Entrepreneur Contact
Site Preparation Status
Access Requirements
Safety / PPE requirements if configured

Do not invent site safety rules.

If information is missing:

Needs Verification

Do not silently substitute another address.

==================================================
24. COMPATIBLE INSPECTION WINDOWS
==================================================

Create a scheduling section:

"Compatible Inspection Windows"

Show a calendar/list of candidate dates and times.

Each candidate should consider configured constraints such as:

MIDC inspector availability
Site availability
Required participating teams
Existing scheduled inspections
Configured working windows
External coordination status

Do not claim real-time calendar availability unless connected to a real scheduling system.

For the Figma prototype, use clearly illustrative availability.

==================================================
25. COMMON INSPECTION POSSIBILITY
==================================================

Create a dedicated section:

"Common Inspection Possibility"

Explain:

"Common inspection is shown only when configured inspection requirements, participating authorities and available windows are compatible."

Example:

MIDC Building / Planning
+
Fire
+
DISH

Potential common inspection:

Possible

Reason:

"Compatible site, timing and configured inspection requirements."

Another state:

Not compatible

Reason:

"Inspection windows do not overlap."

Another:

Needs Coordination

Reason:

"External department availability has not been confirmed."

Do not automatically combine inspections.

==================================================
26. COMMON INSPECTION LOGIC
==================================================

A common inspection should require compatible:

Site
Date / time
Inspection scope
Participating authorities
Inspection requirements
Team availability
Configured coordination rules

If any required compatibility condition is not satisfied:

do not create a combined inspection.

Instead show:

"Separate inspection required"

or:

"Coordination pending"

where configured.

Do not infer compatibility simply because inspections concern the same project.

==================================================
27. PARTICIPATING DEPARTMENTS
==================================================

Create a participant section.

Primary:

MIDC

Show:

MIDC Inspector / Team

Then optionally:

Other Participating Department / Team

Examples:

Fire
DISH
Boiler
Other configured authority

For each show:

Department
Team
Participation
Confirmation
Inspection scope

Example:

MIDC
Building / Planning Inspection
Confirmed

Fire
Fire-related inspection
Coordination requested

DISH
Machinery / safety-related inspection
Not required

Do not allow the MIDC officer to edit another department's assignment unless a configured coordination mechanism explicitly grants that permission.

==================================================
28. INSPECTION PLAN
==================================================

Create a structured inspection-plan form.

Fields:

Inspection Date
Inspection Time
Site
MIDC Inspector / Team
Other Participating Department / Team
Inspection Type
Related Application
Shared Documents
MIDC Checklist
Other Department Checklist References
Entrepreneur Preparation Requirements

Show:

Plan Status

Draft
Coordination Required
Ready to Schedule
Scheduled
Cancelled

Use configured states where available.

==================================================
29. DATE + TIME
==================================================

Use a date picker and time selector.

Show:

Selected Date
Selected Time
Duration where configured

Example:

Date:
25 Sep 2026

Time:
10:30 AM

Duration:
Configured / Not specified

Do not invent an official inspection duration.

If multiple departments participate:

show whether the selected window is compatible for each participant.

==================================================
30. CALENDAR + LIST
==================================================

M22 must provide two views:

CALENDAR
LIST

Calendar:

Show inspection slots.

List:

Show:

Date
Time
Application
Site
Inspector
Participating Departments
Status
Compatibility

Allow switching between the views without losing the current planning context.

==================================================
31. SHARED DOCUMENTS
==================================================

Show documents available for the inspection.

Examples:

Building Plan
Land / Plot Record
Approved / verified application documents
Relevant utility documents
Configured inspection evidence

For each:

Document
Version
Verification
Relevant service
Used by

Do not create a new document repository.

Use the existing Document Centre / M13 model.

==================================================
32. MIDC CHECKLIST
==================================================

Show:

"MIDC Inspection Checklist"

This should be configurable by:

MIDC service
Inspection type
Project context

The prototype can show checklist items such as:

Site identity
Plot context
Building / plan context
Configured service-specific checks
Relevant documents available

Do not invent statutory inspection criteria.

If checklist rules are not configured:

"Checklist not configured — Needs Verification"

==================================================
33. OTHER DEPARTMENT CHECKLIST REFERENCES
==================================================

For participating external departments show:

"Other Department Checklist Reference"

Example:

Fire:
Fire inspection checklist — external reference

DISH:
Configured checklist reference

These should be READ-ONLY references.

MIDC should not edit another department's checklist.

If no checklist reference is available:

"External checklist reference not available."

==================================================
34. ENTREPRENEUR PREPARATION
==================================================

Create:

"Entrepreneur Preparation Requirements"

Show configured actions such as:

Make site accessible
Provide relevant documents
Ensure designated representative is available
Prepare configured equipment / records
Provide required site access

Do not invent universal preparation requirements.

The source should be:

Configured inspection requirement

or:

Service-specific checklist.

Where appropriate, show:

"Required before inspection"

and:

"Provided / Confirmed / Pending"

==================================================
35. ENTREPRENEUR NOTIFICATION
==================================================

Once the inspection plan is confirmed according to the configured workflow, the entrepreneur side should receive the same inspection information.

Shared data:

Inspection ID
Application ID
Date
Time
Site
Inspection Type
MIDC inspector/team where appropriate
Participating department information where permitted
Preparation requirements
Status

Do not create a separate entrepreneur-side inspection ID.

The entrepreneur must see the same:

Inspection ID

as MIDC.

==================================================
36. INSPECTION CONFIRMATION
==================================================

Before scheduling:

show a review screen:

"Review Inspection Plan"

Display:

Date
Time
Site
MIDC team
Other participating departments
Inspection scope
Shared documents
Checklist references
Entrepreneur preparation

CTA:

Confirm Inspection Plan

Secondary:

Save Draft

Cancel

Do not schedule automatically when a date is merely selected.

==================================================
37. AFTER CONFIRMATION
==================================================

When the plan is confirmed:

Inspection Status:
SCHEDULED

Application State:
INSPECTION_SCHEDULED

where the configured workflow requires it.

Then:

M23 becomes the next inspection execution screen.

Provide:

"Open Inspection Workspace"

→ M23

Do not record inspection findings in M22.

==================================================
38. CANCELLATION / RESCHEDULING
==================================================

If the inspection needs to be rescheduled:

Show:

Current Plan
Reason
New Candidate Windows
Coordination Status

Preserve the previous plan.

Do not overwrite the historical schedule.

Record:

Previous Date
Previous Time
Reason for change
New Date
New Time
Officer
Timestamp

This must be visible in audit history.

==================================================
39. RE-INSPECTION
==================================================

M21 should clearly distinguish:

Initial Inspection

from:

Re-inspection.

If M24 determines:

Re-inspection Required

then M21 receives a new inspection requirement or re-inspection task according to configuration.

Show:

Re-inspection:
Yes

Original Inspection:
INSP-2026-00418

Related Observation:
OBS-2026-XXXX

Do not erase the original inspection.

M24 remains the source of the observation/re-inspection history.

==================================================
40. M23 / M24 INTEGRATION
==================================================

M22:

Confirm Inspection Plan

↓

M23:

Inspection Workspace

↓

Inspection outcome:

Pass
Observation
Non-compliant
Correction Required
Re-inspection Required

↓

M24:

Observation / Re-inspection

M21 then updates the inspection queue.

Do not duplicate the M23/M24 execution interface inside M22.

==================================================
41. DEPENDENCY IMPACT
==================================================

If the inspection is a prerequisite for a downstream service:

show:

"Inspection impact"

Example:

Current:
Building / Planning Inspection

Potential downstream:
Construction

Status:
Blocked until configured inspection requirement is satisfied

Use M17 for full dependency details.

Do not automatically unlock downstream services merely because the inspection was scheduled.

Scheduling ≠ completion.

Only the configured inspection outcome can change the relevant dependency state.

==================================================
42. INSPECTION COMPLETION VS SCHEDULING
==================================================

This distinction must be visually clear.

M22:

SCHEDULED

M23:

INSPECTION CONDUCTED

M24:

OBSERVATION / RE-INSPECTION

Do not mark an inspection:

Complete

merely because it has been scheduled.

==================================================
43. SOURCE / PROVENANCE
==================================================

For every inspection requirement show:

Source
Rule / configuration
Service
Application
Business DNA context if relevant
Created date
Version

Example:

Inspection Requirement Source:
Building / Planning Service Configuration

Rule Version:
2026.XX

Triggered By:
Configured inspection requirement

Do not invent legal citations.

==================================================
44. BUSINESS DNA CONTEXT
==================================================

Inspection planning should use relevant Business DNA context.

Examples:

Project Type
Project Stage
Estate
Plot
Building Context
Machinery
Hazardous / Flammable Context
Warehouse
Utility Context

Show a compact:

"Inspection Context"

panel.

Do not recreate the entire Business DNA.

Provide:

"View Business DNA"

→ M07

==================================================
45. M20 DELTA CONTEXT
==================================================

If inspection was triggered or changed because of a resubmission:

show:

"Inspection impact from Delta"

Example:

Building Area:
2,000 → 2,300 m²

Configured impact:
Inspection requirement changed

Link:

"View Delta"

→ M20

Do not create a second delta model.

==================================================
46. M18 / M19 QUERY CONTEXT
==================================================

If an inspection is required because a query response changed the project:

show:

Related Query:
QRY-2026-0042

Related Deficiency:
DEF-2026-0092

Resubmission:
v2

Provide:

"View Query History"

→ M19

This preserves:

Query
→ Response
→ Correction
→ Resubmission
→ Inspection

==================================================
47. EXTERNAL DEPARTMENT COORDINATION
==================================================

If Fire / DISH / another configured department participates:

show their role as:

External Participant

MIDC can see:

Participation
Coordination status
Scheduled window
Shared site
Relevant checklist reference
Dependency impact

MIDC cannot:

Approve their inspection
Reject their inspection
Edit their findings
Change their checklist
Mark their inspection completed
Assign their internal staff unless a configured coordination mechanism explicitly permits it

Use:

"External coordination"

rather than implying organizational control.

==================================================
48. COMMON INSPECTION STATES
==================================================

For each possible combined inspection show:

Possible
Coordination Required
Compatible
Not Compatible
Confirmed
Cancelled

These are coordination states.

Do not treat them as application states.

Example:

Application:
INSPECTION_PENDING

Common Inspection:
COORDINATION_REQUIRED

This is valid.

==================================================
49. NO AUTOMATIC COMMON INSPECTION
==================================================

Never automatically combine:

MIDC
+
Fire
+
DISH

merely because they all require site visits.

The system should first establish:

same site
compatible window
compatible scope
configured coordination
participation availability

Then show:

"Common inspection possible"

The officer confirms.

==================================================
50. M21 QUEUE COUNTS
==================================================

At the top of M21, optionally show compact factual counts:

Pending:
8

Scheduled:
5

Completed:
12

Re-inspection:
2

Coordination Required:
3

SLA Risk:
1

Do not show:

Inspector performance score
Inspection efficiency score
Team ranking
AI priority score

==================================================
51. M22 PLANNING SUMMARY
==================================================

At the top of M22 show:

Inspection:
INSP-2026-00418

Status:
PENDING

Site:
Example MIDC Estate — Plot A-18

MIDC Team:
Unassigned

External Participants:
Fire — Coordination Requested
DISH — Not Required

Compatibility:
Needs Coordination

Target Date:
Configured deadline

This gives the officer a quick planning context before interacting with the calendar.

==================================================
52. OFFICER ACTIONS
==================================================

M21:

View
Plan
Schedule
View Documents
View Dependency
View Query
View Delta
View Re-inspection

M22:

Find Window
Check Compatibility
Add Participant
Review Plan
Save Draft
Confirm Inspection Plan
Reschedule
Cancel Plan

Do NOT include:

Approve Application
Reject Application

Final decision remains in M25/M26.

==================================================
53. AUDIT HISTORY
==================================================

Every inspection-planning action must be auditable.

Record:

Inspection ID
Application ID
Business ID
Previous status
New status
Previous date/time
New date/time
Site
MIDC team
External participant
Coordination status
Officer
Desk
Timestamp
Reason for change
Related Query
Related Deficiency
Related Delta
Checklist version
Document versions

Do not overwrite historical schedules.

==================================================
54. NOTIFICATION INTEGRATION
==================================================

When an inspection is scheduled according to the configured workflow:

Entrepreneur receives:

Inspection ID
Date
Time
Site
Preparation requirements
Status

MIDC receives:

Scheduled inspection
Assigned team
External coordination status
SLA impact

External departments receive only the coordination information permitted by the configured workflow.

Do not create separate inconsistent records.

==================================================
55. SAMPLE M21 QUEUE
==================================================

Use prototype-safe sample data.

ROW 1:

Application:
MIDC-APP-2026-00418

Business:
Aster Precision Components Pvt. Ltd.

Service:
Building / Planning

Site:
Example MIDC Estate / Plot A-18

Inspection Type:
Building / Planning Site Inspection

Required By:
25 Sep 2026

Status:
Pending

Assigned:
Unassigned

Target Date:
Not Scheduled

SLA:
Inspection Pending

Re-inspection:
No

ROW 2:

Application:
MIDC-APP-2026-00391

Service:
Water / Utility

Inspection:
Utility Site Inspection

Status:
Scheduled

Assigned:
MIDC Utility Inspection Team

Target:
26 Sep 2026

Re-inspection:
No

ROW 3:

Application:
MIDC-APP-2026-00372

Service:
Building / Planning

Inspection:
Re-inspection

Status:
Pending

Assigned:
Assigned Team

Target:
28 Sep 2026

Re-inspection:
Yes

All values are prototype-safe.

==================================================
56. SAMPLE M22 PLAN
==================================================

Inspection:

INSP-2026-00418

Application:

MIDC-APP-2026-00418

Service:

Building / Planning

Site:

Example MIDC Estate — Plot A-18

Selected Date:

25 Sep 2026

Selected Time:

10:30 AM

MIDC Team:

Building / Planning Inspection Team

External Participant:

Fire — Coordination Requested

DISH:

Not Required

Common Inspection:

Potentially Compatible

Status:

Coordination Required

Shared Documents:

Building Plan v2
Land / Plot Record
Relevant MIDC application documents

MIDC Checklist:

Building / Planning Inspection Checklist

Entrepreneur Preparation:

Configured site access and document preparation requirements

Do not present this as an actual scheduled government inspection.

==================================================
57. VISUAL STRUCTURE — M21
==================================================

Use:

TOP:
Application / department context

SECOND:
Inspection queue counts

THIRD:
Filters

MAIN:
Inspection queue table

RIGHT:
Inspection detail drawer when a row is selected

Keep the table dominant.

This is an operational queue.

==================================================
58. VISUAL STRUCTURE — M22
==================================================

Use:

TOP:
Inspection context

LEFT:
Inspection requirements + site + participants

CENTER:
Calendar

RIGHT:
Selected date/time + compatibility + inspection plan summary

BOTTOM:
Shared documents + checklist + entrepreneur preparation

Primary CTA:

Confirm Inspection Plan

Use a secondary list view for schedule visibility.

==================================================
59. CALENDAR / LIST INTERACTION
==================================================

Calendar:

Show candidate windows.

List:

Show:

Date
Time
Site
Inspector
External participants
Compatibility
Status

Selecting a calendar slot updates the plan preview.

Do not lose unsaved planning information when switching between calendar and list.

==================================================
60. ACCESSIBILITY
==================================================

Use Auto Layout.

Status must use:

Icon + text.

Do not rely on colour alone.

Calendar entries must have readable labels.

Tables must support:

Long business names
Long estate names
Long inspection types
Long department names

Ensure:

English / Marathi-compatible text containers
Keyboard focus
Accessible date/time controls
Readable status labels
Readable coordination states

==================================================
61. AUTOMATION BOUNDARY
==================================================

Automation may:

- identify inspection requirements from configured rules
- surface eligible inspection windows
- detect scheduling conflicts
- identify potentially compatible common inspections
- surface relevant participants
- identify affected dependencies
- notify relevant parties according to configuration

Automation must NOT:

- automatically merge inspections without confirmation
- automatically assign another department's inspector
- invent inspection requirements
- invent checklist requirements
- mark an inspection complete
- determine inspection outcome
- approve or reject an application
- override another department's inspection decision

The officer remains responsible for the MIDC inspection plan.

==================================================
62. CRITICAL RULES
==================================================

NEVER:

- treat scheduling as inspection completion
- treat common inspection as automatic
- control another department's inspector/team
- edit another department's checklist
- create fake inspection requirements
- invent technical inspection thresholds
- invent legal inspection criteria
- automatically mark an external inspection complete
- automatically approve/reject the application
- erase previous inspection plans
- overwrite historical dates
- merge incompatible inspections
- create a new canonical application state for every operational inspection label

ALWAYS:

- preserve Application ID
- preserve Business ID
- preserve Inspection ID
- preserve version history
- distinguish application state from inspection status
- distinguish inspection scheduling from inspection execution
- distinguish initial inspection from re-inspection
- show the source of the inspection requirement
- show SLA impact
- show dependency context
- show external department participation as coordination context
- use M23 for actual inspection execution
- use M24 for observation/re-inspection
- keep entrepreneur inspection information synchronized
- use configurable common-inspection rules