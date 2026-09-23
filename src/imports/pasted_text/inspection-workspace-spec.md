Create:

M23 — Inspection Workspace
M24 — Observation / Re-inspection

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
- status primitives
- application shell
- M21 Inspection Queue
- M22 Inspection Planning
- existing document components
- existing query components
- existing dependency components

Reuse the existing inspection, application, Business DNA, document, query, dependency, SLA and audit models.

M23 and M24 are part of ONE inspection lifecycle.

The intended flow is:

M21
INSPECTION QUEUE
        ↓
M22
INSPECTION PLANNING
        ↓
INSPECTION SCHEDULED
        ↓
M23
INSPECTION WORKSPACE
        ↓
INSPECTION OUTCOME
        ↓
M24
OBSERVATION / RE-INSPECTION
        ↓
CORRECTION
        ↓
EVIDENCE
        ↓
RE-INSPECTION IF REQUIRED
        ↓
RESOLVED
        ↓
M25
DECISION WORKSPACE

Do not collapse these stages into one screen.

==================================================
1. CORE RESPONSIBILITY OF M23
==================================================

M23 answers:

"What happened during this inspection?"

It should allow the authorised MIDC inspector/officer to:

- review the inspection context
- review relevant documents
- open the configured MIDC checklist
- record observations
- attach supporting evidence where supported
- record inspection outcome
- identify whether correction is required
- identify whether re-inspection is required
- save the inspection record
- complete the inspection according to configured workflow

M23 must NOT make the final statutory application decision.

Do not place:

Approve Application
Reject Application

inside M23.

Final decision remains M25/M26.

==================================================
2. CORE RESPONSIBILITY OF M24
==================================================

M24 answers:

"What happened after an observation or correction requirement was raised?"

It should allow the officer to see:

- original observation
- required correction
- entrepreneur response
- submitted evidence
- date submitted
- officer review
- re-inspection
- resolution

M24 should preserve the entire correction/re-inspection history.

Do not overwrite the original observation.

==================================================
3. COMMON INSPECTION IDENTITY
==================================================

Use one shared Inspection ID across:

M21
M22
M23
M24
Entrepreneur Inspection Centre
Notifications
Audit History
Application Timeline

Example:

Inspection ID:
INSP-2026-00418

Application:
MIDC-APP-2026-00418

Do NOT create separate:

MIDC Inspection ID
Entrepreneur Inspection ID

for the same inspection.

The entrepreneur and MIDC views must reference the same inspection record.

==================================================
4. COMMON APPLICATION CONTEXT
==================================================

At the top of M23 and M24 reuse the standard application context.

Show:

Application ID:
MIDC-APP-2026-00418

Business:
Aster Precision Components Pvt. Ltd.

Project:
Precision Components Manufacturing Unit

MIDC Service:
Building / Planning

Project Stage:
Configured stage

Application State:
INSPECTION_SCHEDULED / INSPECTION_PENDING / configured current state

Inspection ID:
INSP-2026-00418

Inspection Type:
Building / Planning Site Inspection

Department:
MIDC

Region / Office:
Assigned Office

Desk:
Inspection

Assigned Inspector / Team:
Configured team

SLA:
Existing SLA component

Keep:

OFFICER CONTEXT

separate from:

APPLICATION CONTEXT.

==================================================
5. SITE / BUSINESS CONTEXT
==================================================

M23 should begin with a compact "Inspection Context" section.

Show:

Business
Project
Project Type
Project Stage
MIDC Estate
Plot Number
Plot Area
Site Location
Inspection Type
Inspection Purpose

Where relevant also show:

Building Area
Floors
Building Height
Occupancy
Industrial Machinery
Hazardous / Flammable Context
Warehouse
Water / Utility Context

Do not reproduce the complete Business DNA.

Provide:

"View Business DNA"

→ M07

==================================================
6. SITE / ESTATE / PLOT
==================================================

Show a dedicated site card:

MIDC Estate:
Example MIDC Estate

Plot:
A-18

Plot Area:
5,200 m²

Site:
Configured site location

Site Contact:
Configured entrepreneur/site contact

Inspection Date:
25 Sep 2026

Inspection Time:
10:30 AM

Make it obvious that the officer is inspecting the same site associated with the application.

If site information is inconsistent with the application:

show:

"Potential site-data inconsistency"

and provide:

"View Cross-form Consistency"

→ M16

Do not silently correct the site data.

==================================================
7. RELATED APPLICATION
==================================================

Show:

Application:
MIDC-APP-2026-00418

Service:
Building / Planning

Current State:
INSPECTION_SCHEDULED

Related Query:
QRY-2026-0042 if applicable

Related Delta:
DELTA-2026-0018 if applicable

Related Inspection:
INSP-2026-00418

Allow navigation to:

Application Overview → M06
Query History → M19
Delta Re-scrutiny → M20
Dependency View → M17

Do not duplicate those screens inside M23.

==================================================
8. INSPECTION REQUIREMENT SOURCE
==================================================

Show why the inspection exists.

Example:

Inspection Requirement:
Building / Planning Site Inspection

Source:
Configured MIDC service workflow

or:

Source:
Delta Re-scrutiny

or:

Source:
Configured scrutiny requirement

Show:

Source
Rule / configuration version
Related service
Triggered context

If the source cannot be established:

"Inspection requirement — Needs Verification"

Do not invent statutory requirements or legal sections.

==================================================
9. SHARED DOCUMENTS
==================================================

Create:

"Inspection Documents"

Show relevant documents from the existing Document Centre.

Example:

Building Plan
Version 2
Department Verified
Valid

Land / Plot Record
Version 3
Department Verified
Valid

MIDC Application Document
Version 1

For each:

Document ID
Name
Version
Verification
Validity
Related service
View

Use the existing M13 document model.

Do NOT create a separate inspection document repository.

==================================================
10. DOCUMENT VERSIONING
==================================================

If a document changed since the inspection was planned:

show:

"Updated since inspection plan"

Example:

Building Plan
Planned version:
v1

Current:
v2

Provide:

View Current
View Previous

Do not overwrite the old version.

If evidence is captured during inspection, create a new evidence/document record or version according to the existing document model.

==================================================
11. MIDC SERVICE CHECKLIST
==================================================

Create a prominent:

"MIDC Inspection Checklist"

section.

The checklist is service-specific and configurable.

Example categories:

Site Identity
Plot / Land Context
Building / Planning
Application Data
Configured Technical Checks
Relevant Documents
Configured Service Conditions

Each checklist item can show:

Check
Status
Evidence
Officer comment

Possible checklist states:

Not Checked
Checked
Observation
Not Applicable
Needs Verification

Do not invent universal technical inspection thresholds.

If the checklist is not configured:

"Checklist not configured — Needs Verification"

==================================================
12. CHECKLIST + BUSINESS DNA
==================================================

Where a checklist item relates to Business DNA, show the relevant value as context.

Example:

Plot Area

Business DNA:
5,200 m²

Application:
5,200 m²

Inspection observation:
[Officer input]

This allows the officer to compare:

Master context
Application
Site observation

Do not force the officer to re-enter Business DNA.

==================================================
13. OBSERVATION ENTRY
==================================================

Create a dedicated:

"Inspection Observations"

section.

Allow multiple observations.

Each observation receives its own:

Observation ID

Example:

OBS-2026-00418-01

Fields:

Observation
Category
Related checklist item
Evidence
Officer comment
Severity if configured
Status
Required correction if applicable
Re-inspection required
Created by
Date/time

Do not create a universal severity score unless configured.

If severity is not configured:

do not show it.

==================================================
14. MULTIPLE OBSERVATIONS
==================================================

One inspection may contain:

0 observations
1 observation
multiple observations

Example:

OBS-01
Site identity verified

OBS-02
Building plan requires correction

OBS-03
Configured site condition requires follow-up

Show them as separate records.

Do not combine all findings into one large text field.

==================================================
15. OBSERVATION VS OUTCOME
==================================================

Keep these distinct.

An:

OBSERVATION

is an individual inspection finding.

The overall:

INSPECTION OUTCOME

is the result of the inspection.

One inspection can contain multiple observations while still having one configured overall outcome.

==================================================
16. INSPECTION OUTCOMES
==================================================

Support exactly the requested prototype outcomes:

PASS
OBSERVATION
NON-COMPLIANT
CORRECTION REQUIRED
RE-INSPECTION REQUIRED

Use existing status primitives.

Each outcome must have explanatory text.

Example:

PASS
"No further inspection action identified."

OBSERVATION
"Observation recorded; further action depends on configured workflow."

NON-COMPLIANT
"Configured inspection finding indicates non-compliance."

CORRECTION REQUIRED
"Entrepreneur action is required before the workflow can continue."

RE-INSPECTION REQUIRED
"Follow-up inspection is required according to the recorded inspection outcome/configuration."

Do not automatically infer a final statutory decision from these outcomes.

==================================================
17. OUTCOME SELECTION
==================================================

The officer must explicitly select the applicable outcome.

Do not automatically choose:

Non-compliant

based only on an observation.

Do not automatically choose:

Re-inspection required

because a correction exists.

The configured workflow may suggest a next action, but the authorised officer records the inspection outcome.

==================================================
18. RECOMMENDATION / ACTION
==================================================

Provide:

"Recommendation / Action"

This should describe the operational next step.

Examples:

No further inspection action
Correction required
Provide additional evidence
Schedule re-inspection
Continue configured workflow
Refer to configured authority/process

Do not use this field as a final statutory approval/rejection.

If an officer records a recommendation:

show:

"Officer recommendation"

not:

"System decision."

==================================================
19. EVIDENCE
==================================================

Create an:

"Inspection Evidence"

section.

Support, where configured:

Documents
Photos
Site evidence
Officer notes
Other configured evidence

Each evidence item should show:

Evidence ID
Type
Date
Source
Related Observation
Version
Verification
View

Example:

EVID-2026-0018

Type:
Site Photograph

Captured:
25 Sep 2026

Related Observation:
OBS-2026-00418-02

Status:
Submitted for review

If photo/document upload is not supported in the current prototype:

show a clearly marked placeholder:

"Inspection photo/document capture — configured capability placeholder"

Do not imply that the current prototype has live camera capture if it does not.

==================================================
20. EVIDENCE PROVENANCE
==================================================

Every evidence item should identify:

Who provided it
When
Source
Related observation
Related inspection
Version

Possible sources:

MIDC Officer
Entrepreneur
Existing Document Repository
External Department
Configured System Source

Do not change source ownership.

==================================================
21. EXTERNAL DEPARTMENT EVIDENCE
==================================================

If Fire / DISH / another configured department provides evidence:

show it as:

External Department Evidence

Example:

Source:
Fire

Evidence:
Configured inspection reference

Status:
External reference

MIDC can view it where permitted.

MIDC cannot edit the external department's inspection finding.

Do not mark the external inspection as passed/failed from M23.

==================================================
22. M17 DEPENDENCY CONTEXT
==================================================

Show compact dependency context.

Example:

Upstream:
MPCB CTE — Complete

Current:
MIDC Building / Planning Inspection

Parallel:
MIDC Water / Utility

Conditional:
Fire

Downstream:
Construction

Provide:

"View Regulatory Dependencies"

→ M17

Do not reproduce the entire dependency graph.

==================================================
23. INSPECTION COMPLETION
==================================================

At the bottom of M23 show:

Inspection Status

Possible:

Scheduled
In Progress
Completed
Correction Required
Re-inspection Required

The inspection can only become:

Completed

after the required inspection record is completed according to configured workflow.

Scheduling does NOT equal completion.

Do not automatically mark the application:

APPROVED

after inspection completion.

==================================================
24. M23 PRIMARY ACTIONS
==================================================

Primary actions should depend on inspection status.

Possible:

Start Inspection
Save Observation
Save Evidence
Complete Inspection
Mark Correction Required
Require Re-inspection

Secondary:

View Application
View Documents
View Business DNA
View Dependency
View Query History
View Delta

Do NOT include:

Approve Application
Reject Application

==================================================
25. INSPECTION AUDIT
==================================================

Record:

Inspection ID
Application ID
Business ID
Officer
Desk
Date/time
Inspection status
Outcome
Observation IDs
Evidence IDs
Document versions
Checklist version
Business DNA version
Application version
Related Query ID
Related Deficiency ID
Related Delta ID

Do not overwrite inspection events.

==================================================
26. M24 — OBSERVATION / RE-INSPECTION
==================================================

Create a dedicated page:

"Observation / Re-inspection"

Purpose:

Track unresolved inspection findings from the original inspection through entrepreneur correction and evidence submission to re-inspection and resolution.

The page should be timeline-driven.

==================================================
27. M24 HEADER
==================================================

Show:

Inspection ID:
INSP-2026-00418

Application:
MIDC-APP-2026-00418

Business:
Aster Precision Components Pvt. Ltd.

Service:
Building / Planning

Original Inspection:
25 Sep 2026

Original Outcome:
CORRECTION REQUIRED

Open Observations:
1

Re-inspection:
Required

Current Status:
Awaiting Entrepreneur Correction

==================================================
28. OBSERVATION SUMMARY
==================================================

At the top show the active observation.

Example:

Observation:
OBS-2026-00418-02

Category:
Building / Planning

Original finding:
Submitted building plan does not reflect the configured current project parameters.

Evidence:
Building Plan v2

Officer comment:
"Provide the corrected building plan reflecting the current project configuration."

Status:
Correction Required

Re-inspection:
Required

Do not rewrite the original observation.

==================================================
29. ORIGINAL OBSERVATION
==================================================

Create a permanent "Original Observation" card.

Show:

Observation ID
Date
Officer
Checklist item
Original finding
Original evidence
Original comment
Original outcome

This must remain immutable.

Example:

OBS-2026-00418-02

Recorded:
25 Sep 2026

Officer:
Assigned MIDC Inspector

Finding:
[Original observation]

Evidence:
EVID-2026-0018

Outcome:
Correction Required

Do not allow later responses to overwrite this record.

==================================================
30. REQUIRED CORRECTION
==================================================

Show:

"Required Correction"

This should come from the original inspection record.

Example:

"Provide corrected building plan reflecting the current project parameters."

Show:

Requested by
Date
Related observation
Required evidence
Status

Possible status:

Pending
Submitted
Accepted
Needs Clarification
Not Resolved

Do not create a second unrelated deficiency object.

Where the correction is also communicated through M18/M19, link the same:

Query ID
Deficiency ID

==================================================
31. ENTREPRENEUR RESPONSE
==================================================

Show:

"Entrepreneur Response"

Fields:

Response
Submitted Date
Submitted By
Related Observation
Related Query
Response Status

Example:

Response:
"Corrected plan uploaded."

Submitted:
28 Sep 2026

Related:
OBS-2026-00418-02

Query:
QRY-2026-0042

Do not rewrite the entrepreneur's response into officer language.

If officer interpretation exists:

show separately.

==================================================
32. NEW EVIDENCE
==================================================

Show evidence submitted in response to the observation.

Example:

Corrected Building Plan

Document:
BUILD-PLAN-00418

Version:
v3

Submitted:
28 Sep 2026

Source:
Entrepreneur

Verification:
Needs Verification

Related Observation:
OBS-2026-00418-02

Actions:

View
Compare with Previous

Do not overwrite the original Building Plan v2.

==================================================
33. EVIDENCE VERSION COMPARISON
==================================================

When the entrepreneur submits a corrected document:

allow:

Previous:
Building Plan v2

Current:
Building Plan v3

Show:

Changed
Unchanged
Version

Where applicable, link to:

M20 Delta Re-scrutiny

because a corrected document may also create application/project changes.

Do not duplicate the full M20 interface.

==================================================
34. OFFICER REVIEW
==================================================

Create:

"Officer Review"

Show:

Review Date
Officer
Evidence Reviewed
Observation Status
Officer Comment
Next Action

Possible actions:

Accept Correction
Needs Clarification
Correction Not Resolved
Require Re-inspection
Close Observation

The exact actions must respect the configured inspection workflow.

Do not automatically resolve an observation merely because evidence was uploaded.

==================================================
35. RE-INSPECTION
==================================================

If the officer determines that re-inspection is required:

show:

Re-inspection Required

Related Observation:
OBS-2026-00418-02

Reason:
Configured / officer-recorded reason

Then link to:

M21 Inspection Queue

and:

M22 Inspection Planning

Create or surface a re-inspection requirement according to the configured workflow.

Do not erase the original inspection.

==================================================
36. RE-INSPECTION IDENTITY
==================================================

A re-inspection should have its own Inspection ID or inspection-instance identifier while retaining the relationship to the original inspection.

Example:

Original:
INSP-2026-00418

Re-inspection:
INSP-2026-00418-R1

Show:

Original Inspection
Related Observation
Re-inspection Instance
Date
Status

This preserves the complete inspection history.

==================================================
37. RE-INSPECTION DATE
==================================================

Show:

Re-inspection Date

If not yet scheduled:

"Not scheduled"

If scheduled:

Date
Time
Inspector / Team
Site
Status

Link:

"Open Inspection Plan"

→ M22

Do not invent a date.

==================================================
38. RESOLUTION STATE
==================================================

Show a clear:

"Resolution State"

Possible states:

OPEN
AWAITING ENTREPRENEUR
RESPONSE RECEIVED
UNDER OFFICER REVIEW
RE-INSPECTION REQUIRED
RE-INSPECTION SCHEDULED
RESOLVED
REOPENED

These are observation/re-inspection workflow states.

Do NOT add them to the canonical application-state model.

Example:

Application State:
INSPECTION_PENDING

Observation State:
AWAITING_ENTREPRENEUR

Both can coexist.

==================================================
39. M24 TIMELINE
==================================================

The dominant visual on M24 should be a chronological timeline.

Use:

INSPECTION
    ↓
OBSERVATION
    ↓
CORRECTION
    ↓
EVIDENCE
    ↓
RE-INSPECTION
    ↓
RESOLVED

Example:

25 Sep 2026
INSPECTION

Inspection:
INSP-2026-00418

Outcome:
Correction Required

↓

25 Sep 2026
OBSERVATION

OBS-2026-00418-02

↓

26 Sep 2026
CORRECTION REQUESTED

Required:
Corrected Building Plan

↓

28 Sep 2026
ENTREPRENEUR RESPONSE

Correction submitted

↓

28 Sep 2026
NEW EVIDENCE

Building Plan v3

↓

29 Sep 2026
OFFICER REVIEW

Re-inspection required

↓

01 Oct 2026
RE-INSPECTION

INSP-2026-00418-R1

↓

01 Oct 2026
RESOLVED

Observation resolved

Use realistic prototype dates only.

==================================================
40. TIMELINE EVENT DETAIL
==================================================

Each event should show:

Event
Date/time
Actor
ID
Status
Evidence
Comment
Related application version
Related document version

Clicking an event opens a detail drawer.

Do not make the timeline merely decorative.

==================================================
41. MULTIPLE OBSERVATIONS
==================================================

If the inspection produced multiple observations:

show:

OBS-01
Resolved

OBS-02
Awaiting Entrepreneur

OBS-03
Re-inspection Required

M24 should allow the officer to filter by observation.

Do not force all observations through one common resolution state.

==================================================
42. OBSERVATION FILTERS
==================================================

Allow:

All
Open
Awaiting Entrepreneur
Response Received
Under Review
Re-inspection Required
Resolved
Reopened

Also:

Observation ID
Inspection ID
Category
Date

Do not rank observations by an invented severity score.

==================================================
43. REOPENED OBSERVATION
==================================================

If an observation was previously resolved but later becomes relevant again:

show:

Original Resolution:
Resolved

Reopened:
[date]

Reason:
Configured / officer-recorded reason

Do not delete the original resolution.

Preserve:

Original observation
Original response
Original evidence
Original re-inspection
Original resolution

Then append the new event.

==================================================
44. M18 / M19 QUERY INTEGRATION
==================================================

If an inspection observation requires entrepreneur action through the consolidated query mechanism:

create or link:

Query ID
Deficiency ID

Example:

Observation:
OBS-2026-00418-02

Query:
QRY-2026-0042

Deficiency:
DEF-2026-0092

M24 should show the linkage.

The entrepreneur should see the same deficiency through the existing Query page.

Do NOT create a separate incompatible inspection-query system.

==================================================
45. M20 DELTA INTEGRATION
==================================================

If the entrepreneur's correction changes application/project data:

M24 should link to:

M20 Delta Re-scrutiny

Example:

Building Plan:
v2 → v3

Built-up Area:
2,000 → 2,300 m²

Show:

"Correction resulted in changed project/application data."

CTA:

Open Delta Re-scrutiny

Do not resolve the delta inside M24.

==================================================
46. M13 DOCUMENT INTEGRATION
==================================================

When new evidence is a document:

use the same Document Centre / document review model.

Example:

Corrected Building Plan v3

→ M13

Show:

Document ID
Version
Source
Verification
Validity
Related Observation

Do not create a second document repository for inspection evidence.

==================================================
47. M16 CONSISTENCY INTEGRATION
==================================================

If new inspection evidence creates a cross-form mismatch:

show:

"Potential cross-form inconsistency"

Example:

Site-observed building area:
2,300 m²

Current application:
2,000 m²

Provide:

"View Cross-form Consistency"

→ M16

Do not silently update the application field.

==================================================
48. M17 DEPENDENCY INTEGRATION
==================================================

If an unresolved inspection observation blocks a downstream node:

show:

"Dependency Impact"

Example:

Construction

Status:
Blocked according to configured dependency

Reason:
Required MIDC inspection unresolved

Provide:

"View Regulatory Dependencies"

→ M17

Do not manually alter the dependency state from M24 unless the configured workflow permits it.

The dependency engine remains the source of the dependency state.

==================================================
49. ENTREPRENEUR INSPECTION CENTRE SYNCHRONIZATION
==================================================

The entrepreneur Inspection Centre must eventually show the same shared inspection records.

For the same inspection, entrepreneur should see:

Inspection ID
Application ID
Inspection Type
Date
Time
Site
Status
Observation ID
Observation
Required Correction
Entrepreneur Response
Evidence
Evidence Version
Officer Review status where configured
Re-inspection requirement
Re-inspection date
Resolution state

The entrepreneur view may hide internal officer notes or restricted information.

However, all entrepreneur-facing records must originate from the same canonical inspection/observation objects.

Do not create duplicate data.

==================================================
50. ENTREPRENEUR RESPONSE BOUNDARY
==================================================

The entrepreneur can:

- respond to a correction
- upload requested evidence
- provide clarification
- view observation
- view re-inspection requirement
- view scheduled re-inspection
- view resolution state

The entrepreneur cannot:

- edit the original officer observation
- change the inspection outcome
- mark the observation resolved
- modify the MIDC inspection record
- modify another department's inspection record

Their response becomes a new event.

==================================================
51. OFFICER VS ENTREPRENEUR RECORDS
==================================================

Separate:

ORIGINAL INSPECTION RECORD

from:

ENTREPRENEUR RESPONSE

from:

OFFICER REVIEW

from:

RE-INSPECTION RECORD.

Do not allow later actions to rewrite earlier events.

Example:

Original observation:
"Building plan requires correction."

Entrepreneur response:
"Corrected plan uploaded."

Officer review:
"Evidence reviewed; re-inspection required."

Re-inspection:
"Observation resolved."

All four remain visible.

==================================================
52. M23 STATUS VS APPLICATION STATUS
==================================================

Do not confuse:

Inspection Status

with:

Application State.

Example:

Application:
INSPECTION_PENDING

Inspection:
COMPLETED

Observation:
RE-INSPECTION_REQUIRED

These can coexist depending on workflow.

After a re-inspection is scheduled:

Application may become:

INSPECTION_SCHEDULED

while the observation remains:

RE-INSPECTION_REQUIRED

until the configured resolution event occurs.

The application state transition is controlled by workflow configuration.

==================================================
53. M24 RESOLUTION DOES NOT EQUAL APPLICATION APPROVAL
==================================================

Important:

When an observation is resolved:

DO NOT automatically set:

Application = APPROVED

Instead:

Observation:
RESOLVED

Then the application proceeds to its configured next workflow step.

For example:

RESOLVED
↓
Technical scrutiny complete
↓
FINAL_DECISION
↓
M25

Only the authorised decision process can produce:

APPROVED
REJECTED
CORRECTION_REQUIRED

==================================================
54. INSPECTION OUTCOME + DECISION BOUNDARY
==================================================

M23 records inspection evidence and outcome.

M24 manages correction/re-inspection.

M25 makes the final application decision.

Therefore:

M23:
"Inspection outcome = Correction Required"

does NOT mean:

"Application = Rejected"

Similarly:

M23:
"Inspection outcome = Pass"

does NOT mean:

"Application = Approved"

Make this boundary visually obvious.

==================================================
55. RECOMMENDATION BOUNDARY
==================================================

If M23 contains:

"Recommendation / Action"

label it:

"Inspector Recommendation"

or:

"Recommended Next Action"

Do not label it:

"Final Decision"

The final statutory decision remains in M25/M26.

==================================================
56. PHOTOS / DOCUMENTS PLACEHOLDER
==================================================

If the current prototype does not implement direct inspection photo capture:

create a realistic placeholder component:

"Inspection Evidence Capture"

with:

Photo
Document
Site Evidence

and state:

"Capture / upload capability — configured prototype placeholder"

Do not simulate a real camera or device integration.

If upload capability is enabled later, reuse the existing document/evidence architecture.

==================================================
57. INSPECTION CHECKLIST VERSIONING
==================================================

Store the checklist version used during the inspection.

Example:

Checklist:
MIDC Building / Planning Inspection Checklist

Version:
2026.XX

Inspection:
INSP-2026-00418

If the checklist later changes, do not rewrite the historical inspection.

The original inspection retains the checklist version under which it was conducted.

==================================================
58. BUSINESS DNA VERSIONING
==================================================

Store the Business DNA version used as inspection context.

Example:

Business DNA:
v4

If Business DNA later changes:

do not rewrite the historical inspection context.

Show:

Inspection conducted against Business DNA v4

Current Business DNA:
v5

If the difference matters:

View Delta

→ M20

==================================================
59. AUDIT HISTORY
==================================================

Record all important events:

Inspection Created
Inspection Scheduled
Inspection Started
Observation Created
Evidence Added
Correction Requested
Entrepreneur Response Received
Document Submitted
Officer Review
Re-inspection Required
Re-inspection Scheduled
Re-inspection Completed
Observation Resolved
Observation Reopened

For each:

ID
Actor
Role
Desk
Timestamp
Application Version
Business DNA Version
Document Version
Checklist Version
Previous State
New State

Do not overwrite history.

==================================================
60. SLA CONTEXT
==================================================

Show inspection-related SLA information.

Separate:

Inspection waiting time
Entrepreneur response time
MIDC review time
Re-inspection waiting time
External dependency time
Total application elapsed time

Example:

Entrepreneur response time:
2 days 4 hours

MIDC review time:
1 day 3 hours

Do not attribute entrepreneur response time to MIDC.

Do not attribute external-department waiting time to MIDC unless the configured SLA model says otherwise.

==================================================
61. M23 VISUAL STRUCTURE
==================================================

Use:

TOP:
Application + Inspection context

SECOND:
Inspection status + outcome

MAIN LEFT:
Business / site / estate / plot

MAIN CENTER:
MIDC checklist

MAIN RIGHT:
Inspection documents / evidence

LOWER SECTION:
Observations

BOTTOM:
Recommendation / action + completion controls

The checklist and observation areas should be visually dominant.

Do not make this a dashboard.

==================================================
62. M24 VISUAL STRUCTURE
==================================================

Use:

TOP:
Inspection + Application context

SECOND:
Observation summary

MAIN:
Vertical correction/re-inspection timeline

RIGHT:
Selected observation/event detail

BOTTOM:
Current resolution state + available action

The timeline should be the dominant visual element.

==================================================
63. M24 OBSERVATION DETAIL DRAWER
==================================================

When selecting an observation:

show:

Observation ID
Inspection ID
Date
Officer
Checklist Item
Original Finding
Original Evidence
Required Correction
Entrepreneur Response
New Evidence
Officer Review
Re-inspection
Resolution State

Actions:

View Evidence
View Query
View Document
View Delta
Plan Re-inspection
Review Response

Do not provide:

Approve Application
Reject Application

==================================================
64. M24 RE-INSPECTION DETAIL
==================================================

When re-inspection exists:

show:

Original Inspection:
INSP-2026-00418

Original Observation:
OBS-2026-00418-02

Re-inspection:
INSP-2026-00418-R1

Date:
01 Oct 2026

Inspector:
Assigned MIDC Team

Outcome:
Resolved

Evidence:
Configured evidence

Officer Review:
Completed

Resolution:
Resolved

Provide:

"View Inspection"

→ M23 for the re-inspection instance.

==================================================
65. COMMON INSPECTION / EXTERNAL DEPARTMENTS
==================================================

If M22 created a common inspection involving:

MIDC
Fire
DISH

M23 should show:

MIDC Inspection Scope

and:

External Department Participation

For external departments show:

Department
Inspection scope
Shared evidence where permitted
Reference
Status

Do NOT allow MIDC to enter another department's findings as if they were MIDC findings.

If external findings are shared:

label them:

"External Department Finding"

and preserve source.

==================================================
66. EXTERNAL DEPARTMENT OUTCOME
==================================================

If Fire records an external outcome:

show:

Fire
External Inspection Outcome
Source:
Fire

MIDC action:
View dependency / reference

Do not provide:

Edit
Approve
Reject
Resolve

for the external record.

==================================================
67. AUTOMATION / AI BOUNDARY
==================================================

Automation may:

- populate inspection context
- retrieve relevant documents
- pre-populate checklist context
- link Business DNA values
- detect possible inconsistencies
- link previous observations
- identify previous inspection history
- surface relevant dependencies
- suggest that an observation may require follow-up
- identify related query/deficiency records

Automation must NOT:

- invent inspection findings
- invent legal requirements
- automatically mark an inspection passed
- automatically declare non-compliance
- automatically resolve an observation
- automatically require re-inspection without configured basis
- modify officer observations
- modify external department findings
- approve/reject the application
- overwrite previous evidence
- overwrite previous inspections

The authorised officer records the inspection finding and outcome.

==================================================
68. SAMPLE M23
==================================================

Use realistic prototype-safe data.

Inspection:

INSP-2026-00418

Application:

MIDC-APP-2026-00418

Business:

Aster Precision Components Pvt. Ltd.

Service:

Building / Planning

Estate:

Example MIDC Estate

Plot:

A-18

Plot Area:

5,200 m²

Inspection Type:

Building / Planning Site Inspection

Date:

25 Sep 2026

Time:

10:30 AM

Status:

Completed

Outcome:

CORRECTION REQUIRED

Observations:

OBS-2026-00418-01
Building plan requires correction.

Evidence:

Building Plan v2

Action:

Corrected plan required.

Re-inspection:

Required

Do not present this as an actual government inspection.

==================================================
69. SAMPLE M24
==================================================

Inspection:

INSP-2026-00418

Observation:

OBS-2026-00418-01

Original finding:

Building plan requires correction.

Required correction:

Provide corrected building plan reflecting the current project configuration.

Entrepreneur response:

"Corrected plan uploaded."

Submitted:

28 Sep 2026

New Evidence:

Building Plan v3

Officer Review:

Evidence reviewed.

Action:

Re-inspection required.

Re-inspection:

INSP-2026-00418-R1

Date:

01 Oct 2026

Resolution:

Resolved

Again, these are prototype-safe sample values.

==================================================
70. ACCESSIBILITY
==================================================

Use Auto Layout.

Use icon + text for status.

Do not rely on colour alone.

Ensure:

- long observations wrap
- long officer comments wrap
- evidence names wrap
- checklist items remain readable
- timeline events are understandable without colour
- observation IDs remain readable
- status is represented by text
- keyboard focus states use existing design system
- English / Marathi-compatible layouts are preserved

==================================================
71. FINAL END-TO-END FLOW
==================================================

The final flow must be:

M21
Inspection Queue
        ↓
M22
Inspection Planning
        ↓
Inspection Scheduled
        ↓
M23
Inspection Workspace
        ↓
Officer records:
- checklist
- observation
- evidence
- outcome
        ↓
IF PASS
→ configured workflow continues

IF OBSERVATION
→ observation recorded

IF CORRECTION REQUIRED
→ M24
→ entrepreneur correction
→ evidence
→ officer review

IF RE-INSPECTION REQUIRED
→ M21
→ M22
→ new inspection instance
→ M23
        ↓
M24
Observation resolved
        ↓
Configured scrutiny complete
        ↓
M25
Decision Workspace

Do not skip the configured workflow.

==================================================
72. CRITICAL CROSS-SYSTEM CONTRACT
==================================================

The same inspection record must remain connected across:

M21
M22
M23
M24
M06 Application Overview
M08 Application Timeline
M17 Regulatory Dependencies
M18 Consolidated Query
M19 Query History
M20 Delta Re-scrutiny
M25 Decision Workspace
M38 Audit History
M39 Notifications
Entrepreneur Inspection Centre

Shared identifiers:

Application ID
Business ID
Project ID
Inspection ID
Observation ID
Evidence ID
Query ID
Deficiency ID
Document ID / Version
Delta ID
Business DNA Version
Checklist Version

Do not create duplicate records.

==================================================
73. CRITICAL RULES
==================================================

NEVER:

- overwrite the original inspection
- overwrite an original observation
- overwrite previous evidence
- overwrite document versions
- automatically mark an observation resolved
- automatically require re-inspection without configured/officer basis
- treat an observation as automatically non-compliant
- treat correction required as rejection
- treat inspection pass as application approval
- edit another department's findings
- approve/reject another department's inspection
- invent inspection criteria
- invent legal thresholds
- invent mandatory documents
- invent checklist items as statutory requirements
- make M23 a final decision screen
- make M24 a second decision screen
- create separate entrepreneur and MIDC inspection records
- erase historical inspection/re-inspection events

ALWAYS:

- preserve Inspection ID
- preserve Observation ID
- preserve Evidence ID
- preserve document versions
- preserve inspection history
- preserve Business DNA version
- preserve checklist version
- show provenance
- distinguish inspection outcome from application decision
- distinguish observation from non-compliance
- distinguish correction from rejection
- distinguish re-inspection from approval
- connect M24 corrections to M18/M19 where applicable
- connect changed evidence/data to M20
- connect dependency impact to M17
- synchronize entrepreneur-facing inspection records
- keep external department findings read-only
- keep final statutory decision in M25/M26