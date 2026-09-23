Create:

M18 — Consolidated Query Builder
M19 — Query / Response History

IMPORTANT:
Continue from the existing EKATMA MIDC Department Figma file.

Do NOT regenerate or redesign:
- Phase 0 design system
- Government of Maharashtra header/footer
- EKATMA branding
- typography
- colours
- spacing
- sidebar
- breadcrumbs
- accessibility components
- generic tables
- status components
- common officer workbench
- existing application shell

M18 and M19 must use the same shared query/deficiency data model as the entrepreneur side.

The entrepreneur and MIDC department must NOT have separate versions of the same deficiency.

==================================================
1. CORE PURPOSE
==================================================

M18 solves:

"How can MIDC send one clear, consolidated request for all currently unresolved issues instead of repeatedly sending separate queries for each problem?"

M19 solves:

"What exactly has been asked, what did the entrepreneur respond with, what changed, and what remains unresolved?"

The intended flow is:

SCRUTINY
    ↓
DEFICIENCY CANDIDATES
    ↓
M18 CONSOLIDATION
    ↓
ONE CONSOLIDATED QUERY
    ↓
ENTREPRENEUR RESPONSE
    ↓
CORRECTION / DOCUMENT REPLACEMENT
    ↓
RESUBMISSION
    ↓
M19 HISTORY
    ↓
M20 DELTA RE-SCRUTINY

Do not create a separate query loop for every scrutiny screen.

==================================================
2. COMMON APPLICATION HEADER
==================================================

Reuse the standard MIDC Department application context.

Show:

Application ID:
MIDC-APP-2026-00418

Business:
Aster Precision Components Pvt. Ltd.

Project:
Precision Components Manufacturing Unit

Current MIDC Service:
Building / Planning

Application State:
QUERY_RAISED

Current Desk:
Planning / Building Scrutiny

Department:
MIDC

Region / Office:
Assigned Office

Role:
Assigned Officer Role

SLA:
Existing SLA component

Payment:
PAID / PENDING / NOT REQUIRED according to configured workflow

IMPORTANT:

Payment remains separate from the regulatory dependency model and from the query system.

If payment is relevant to the current service workflow, it may appear as a deficiency.

Do NOT automatically create a payment query merely because payment exists as a concept.

==================================================
3. QUERY MODEL
==================================================

Use a two-level structure:

QUERY
    ↓
DEFICIENCIES

One Query can contain multiple Deficiency IDs.

Example:

QUERY:
QRY-2026-0042

Contains:

DEF-2026-0091
DEF-2026-0092
DEF-2026-0093
DEF-2026-0094

The Query is the communication envelope.

Each Deficiency is an independently traceable issue.

Do not collapse all deficiencies into one unstructured paragraph.

==================================================
4. DEFICIENCY CATEGORIES
==================================================

M18 must allow the officer to group unresolved issues into:

01 — Land / Plot
02 — Building / Plan
03 — Utility / Water
04 — Document
05 — Data Inconsistency
06 — Dependency
07 — Technical Issue
08 — Other

These categories should be configurable.

Do not assume this is the complete universal taxonomy.

Each deficiency must belong to exactly one primary category in the prototype.

==================================================
5. WHERE DEFICIENCIES COME FROM
==================================================

M18 should receive deficiency candidates from earlier screens.

Possible sources:

M11 — Land / Plot Scrutiny
M12 — Parameter Detail
M13 — Document Review
M14 — Building / Planning
M15 — Water / Utility / Drainage
M16 — Cross-form Consistency
M17 — Regulatory Dependency View
Automated Pre-check
Other configured scrutiny modules

Important:

These screens CREATE OR SUGGEST DEFICIENCY CANDIDATES.

They do NOT independently send entrepreneur queries.

All selected unresolved issues flow into M18.

This is what prevents repeated one-by-one query loops.

==================================================
6. DEFICIENCY CANDIDATE PANEL
==================================================

At the top of M18 show:

"Unresolved Issues Available for Consolidation"

Each candidate should appear as a compact row/card.

Example:

DEF-2026-0091

Category:
Data Inconsistency

Source:
M16 Cross-form Consistency

Issue:
Plot area differs between Fire record and current MIDC project data.

Evidence:
Master Project Dossier = 4,800 m²
Fire record = 4,600 m²

Status:
Unresolved

Action:
Add to Query

Another:

DEF-2026-0092

Category:
Document

Source:
M13 Document Review

Issue:
Building plan version requires correction.

Evidence:
Building Plan v2

Status:
Unresolved

Action:
Add to Query

Another:

DEF-2026-0093

Category:
Building / Plan

Source:
M14

Issue:
Submitted built-up area differs from configured project record.

Status:
Unresolved

Action:
Add to Query

==================================================
7. PREVIOUSLY RAISED ISSUES
==================================================

Create a separate section:

"Previously Raised Issues"

Show deficiencies that have already been sent to the entrepreneur.

Divide them into:

RESOLVED
UNRESOLVED
PARTIALLY RESOLVED
REOPENED

For each show:

Deficiency ID
Category
Original issue
Query ID
Date raised
Latest response
Current state
Last reviewed

Example:

DEF-2026-0081
Land / Plot
Resolved
QRY-2026-0036
Raised: 12 Sep 2026
Resolved: 15 Sep 2026

Do NOT create a new deficiency ID for the same historical issue merely because the entrepreneur resubmitted.

Preserve the original ID.

==================================================
8. DUPLICATE QUERY DETECTION
==================================================

Before adding a new deficiency to the consolidated query, show a duplicate warning when a similar unresolved issue already exists.

Example:

"Potential duplicate"

Existing deficiency:
DEF-2026-0081

Issue:
Plot area inconsistency

Current candidate:
Plot area inconsistency

Existing status:
Awaiting Entrepreneur Response

Actions:

View Existing
Use Existing Deficiency
Create New Anyway

If creating a new one anyway, require a reason or officer note.

Do not automatically merge issues.

The system should flag the possible duplicate.

The officer decides.

==================================================
9. EXACT DEFICIENCY DATA MODEL
==================================================

Every deficiency must contain:

Deficiency ID
Query ID when sent
Application ID
Business ID
Project ID
Category
Issue
Evidence
Related field
Required correction
Supporting regulation/source
Document requested
Officer comment
Source screen/module
Created by
Created date
Last updated
Status
Response
Resolution
Version / resubmission association

Use the shared identifiers already established by the platform.

Do not invent a separate M18-only identity model.

==================================================
10. ISSUE
==================================================

Provide a clear "Issue" field.

The issue should state the problem factually.

Good example:

"Plot area differs between the current MIDC application and the Fire application."

Avoid:

"The applicant submitted incorrect data."

unless that conclusion has actually been established.

Do not use accusatory language.

==================================================
11. EVIDENCE
==================================================

Show the evidence supporting the issue.

Example:

Master Project Dossier:
4,800 m²

MIDC Building:
4,800 m²

Fire:
4,600 m²

Source:
Cross-form Consistency

Provide links:

View comparison
View parameter
View supporting document

These should link to:

M16
M12
M13

Do not make the officer manually reconstruct the evidence.

==================================================
12. RELATED FIELD
==================================================

Every deficiency should identify the field when applicable.

Examples:

Plot Area
Built-up Area
Water Requirement
Project Location
Company Identity
Production Capacity

If no specific field exists:

Related field:
Not applicable

Do not invent a field merely to fill the UI.

==================================================
13. REQUIRED CORRECTION
==================================================

This is what the entrepreneur must actually do.

Example:

"Confirm the applicable plot area and provide supporting evidence."

Another:

"Replace the building plan with the corrected version."

Another:

"Provide the missing configured utility document."

Do not use vague text such as:

"Fix this."

The correction request should be actionable.

==================================================
14. SUPPORTING REGULATION
==================================================

Where a configured regulatory source exists, show:

Regulatory source
Rule / requirement
Version
Relevant reference

Example:

Source:
Configured MIDC Building / Planning requirement

Rule version:
2026.XX

If no source is available:

"Regulatory source not available — Needs Verification."

Do NOT invent:

- legal sections
- statutory clauses
- technical thresholds
- mandatory requirements
- deadlines

The source should come from the configured regulatory knowledge layer.

==================================================
15. DOCUMENT REQUEST
==================================================

Allow the officer to specify:

"Document requested"

Examples:

Corrected Building Plan
Updated Land Record
Supporting Plot Evidence
Utility Source Evidence

Also allow:

No document requested

This is important because not every deficiency requires a new upload.

If a document is requested, show:

Document type
Purpose
Related deficiency
Whether replacement or new document is required

Do not automatically overwrite the existing document.

The entrepreneur's replacement should create a new document version.

==================================================
16. OFFICER COMMENT
==================================================

Provide:

"Officer Comment"

This is an internal/external communication field depending on the configured query model.

The comment that is intended for the entrepreneur must be clearly identified as such.

IMPORTANT:

If a comment is sent as part of the deficiency, the exact comment must be available on the entrepreneur side.

Do not silently rewrite it.

==================================================
17. INTERNAL NOTE VS ENTREPRENEUR-FACING COMMENT
==================================================

If the system supports internal officer notes, visually separate:

ENTREPRENEUR-FACING COMMENT

from:

INTERNAL OFFICER NOTE

Example:

Entrepreneur-facing:
"Please confirm the applicable plot area and provide supporting evidence."

Internal note:
"Potential mismatch originated from external Fire record."

The entrepreneur must NOT see the internal note unless the configured workflow explicitly makes it visible.

The entrepreneur must see the exact entrepreneur-facing comment.

==================================================
18. CONSOLIDATION WORKSPACE
==================================================

The central M18 layout should be:

LEFT:
Issue categories + unresolved candidates

CENTER:
Selected deficiency details

RIGHT:
"Current Consolidated Query"

The right panel should show the issues currently selected for the outgoing query.

Example:

QUERY QRY-2026-0042

Selected deficiencies:

DEF-2026-0091
Plot Area inconsistency

DEF-2026-0092
Building Plan correction

DEF-2026-0093
Utility evidence

Total:
3 deficiencies

CTA:

"Send Consolidated Deficiency"

Before sending, show a review step.

==================================================
19. QUERY PREVIEW
==================================================

Before sending, show:

"Review Before Sending"

Summary:

3 deficiencies
2 documents requested
1 clarification
0 duplicate unresolved issues

Then list exactly what the entrepreneur will receive.

For each:

Deficiency ID
Category
Issue
Evidence
Required correction
Document requested
Entrepreneur-facing comment

CTA:

Send Consolidated Deficiency

Secondary:

Save Draft

Cancel

Do not automatically send when the officer adds a deficiency.

==================================================
20. SEND ACTION
==================================================

When officer selects:

"Send Consolidated Deficiency"

create:

Query ID
Timestamp
Officer
Desk
Application version
Deficiency IDs
Regulatory rule versions
Document requests

Update application state:

QUERY_RAISED

where the canonical workflow requires it.

Operational overlay may show:

Awaiting Entrepreneur Response

Do not replace QUERY_RAISED with "Awaiting Entrepreneur Response."

The latter is an operational label.

==================================================
21. QUERY STATUS
==================================================

Use the canonical application state separately from query status.

Application state:

QUERY_RAISED

Query status may be:

DRAFT
SENT
PARTIALLY_RESPONDED
RESPONDED
UNDER_REVIEW
RESOLVED
CLOSED
REOPENED

These are QUERY statuses, not application states.

Do not add these as new canonical application states.

==================================================
22. ENTREPRENEUR RESPONSE
==================================================

When the entrepreneur responds, M19 should show the response against the exact deficiency.

Example:

DEF-2026-0091

Original issue:
Plot area differs between records.

Entrepreneur response:
"Updated project documentation confirms 4,800 m²."

Submitted evidence:
Updated Land Record v3

Response date:
18 Sep 2026

Status:
Responded

Officer action:

Accept
Needs Clarification
Not Resolved

Do not create a new unrelated issue.

==================================================
23. PARTIAL RESPONSE
==================================================

Support partial responses.

Example:

Query contains:

DEF-0091
DEF-0092
DEF-0093

Entrepreneur responds to:

DEF-0091 ✓
DEF-0092 ✓

DEF-0093 remains unanswered.

M19 should show:

2 / 3 responded

1 unresolved

Application remains:

QUERY_RAISED

and operational overlay:

Awaiting Entrepreneur Response

Do not close the query merely because one deficiency was answered.

==================================================
24. CORRECTION / RESUBMISSION
==================================================

When the entrepreneur corrects application data or replaces documents:

M19 should connect the response to the resulting resubmission.

Example:

DEF-0092
Building Plan correction

Response:
Corrected Building Plan uploaded

Document:
BUILD-PLAN-00418
Version 3

Resubmission:
Version 3

Then:

Open Delta Re-scrutiny

→ M20

M20 determines:

Changed
Affected
Unchanged

M19 preserves the communication history.

==================================================
25. EXACT ENTREPRENEUR ↔ MIDC CONTRACT
==================================================

The entrepreneur-side Query page must display the SAME:

Query ID
Deficiency ID
Category
Issue
Evidence
Related field
Required correction
Document requested
Entrepreneur-facing officer comment
Date raised
Status
Response
Response date

Do not generate a second entrepreneur-specific ID.

Example:

MIDC Department:

DEF-2026-0091

must appear as:

DEF-2026-0091

on the entrepreneur side.

The issue text must remain semantically and textually consistent.

The entrepreneur must be able to identify exactly which deficiency they are answering.

==================================================
26. M19 — QUERY / RESPONSE HISTORY
==================================================

Create M19 as a chronological case history.

Title:

"Query / Response History"

Subtitle:

"Complete history of deficiencies, responses, corrections and resubmissions for this application."

Use a vertical timeline.

Example:

12 Sep
QUERY #1 SENT

↓
13 Sep
ENTREPRENEUR RESPONSE

↓
13 Sep
CORRECTED DOCUMENT UPLOADED

↓
14 Sep
RESUBMISSION v2

↓
14 Sep
OFFICER REVIEW

↓
15 Sep
DEFICIENCY RESOLVED

The timeline must preserve every event.

==================================================
27. M19 TIMELINE EVENT STRUCTURE
==================================================

Every event should show:

Event
Date / Time
Actor
Department / Desk
Related Query
Related Deficiency
Application Version
Document Version where relevant
Comment
Status

Example:

QUERY SENT

Actor:
MIDC Planning / Building Desk

Date:
12 Sep 2026

Query:
QRY-2026-0042

Deficiency:
DEF-2026-0091

Application Version:
v1

Comment:
"Please confirm the applicable plot area and provide supporting evidence."

==================================================
28. ENTREPRENEUR RESPONSE EVENT
==================================================

Show:

ENTREPRENEUR RESPONSE

Actor:
Entrepreneur

Date:
14 Sep 2026

Deficiency:
DEF-2026-0091

Response:
"Confirmed plot area as 4,800 m²."

Evidence:
Updated Land Record v3

Status:
Submitted for review

Do not rewrite the entrepreneur's response into an officer interpretation.

If an officer interpretation exists, show it separately.

==================================================
29. CHANGED FIELDS
==================================================

When a response results in changed application data, show:

"Changed fields"

Example:

Plot Area
4,800 → 5,200 m²

Building Area
2,000 → 2,300 m²

Project Stage
No change

Provide:

"Open Delta Re-scrutiny"

→ M20

Do not duplicate M20's full interface inside M19.

==================================================
30. REPLACED DOCUMENTS
==================================================

When the entrepreneur replaces a document:

show:

Original:
Building Plan v1

Replacement:
Building Plan v2

Date:
14 Sep

Reason:
Correction requested

Related deficiency:
DEF-2026-0092

Status:
Submitted for review

The original document must remain in version history.

Do not overwrite it.

Provide:

View Original
View Replacement

which opens the appropriate document-review interface.

==================================================
31. TIME TAKEN BY ENTREPRENEUR
==================================================

Show factual response duration.

Example:

Query sent:
12 Sep 2026, 10:20

Response received:
14 Sep 2026, 15:45

Entrepreneur response time:
2 days 5 hours 25 minutes

Clearly label this as:

"Entrepreneur response time"

Do not mix it with:

MIDC processing time
Inspection time
External dependency time
Total application elapsed time

Those are separate SLA dimensions.

If there were multiple response cycles, show each separately.

==================================================
32. UNRESOLVED ISSUES
==================================================

At the top of M19, show:

Current Query Status

Example:

Query:
QRY-2026-0042

Deficiencies:
3

Resolved:
2

Unresolved:
1

Awaiting Entrepreneur:
1

Awaiting MIDC Review:
0

Do not show a generic "query completion %" unless explicitly required later.

Use factual counts.

==================================================
33. REOPENED DEFICIENCIES
==================================================

A previously resolved deficiency may be reopened if later evidence or resubmission creates a new unresolved issue related to the same matter.

Do NOT erase the old resolution.

Show:

DEF-2026-0091

Original status:
RESOLVED

Reopened:
18 Sep 2026

Reason:
New submission introduced a changed value.

This preserves the complete history.

==================================================
34. QUERY VERSIONING
==================================================

Preserve versions of the consolidated query.

Example:

QRY-2026-0042
Version 1
Sent 12 Sep

Response received

QRY-2026-0042
Version 2 / Response cycle

Do not overwrite the original query.

Every version must preserve:

Deficiency IDs
Comments
Evidence
Document requests
Status
Timestamp

==================================================
35. M19 FILTERS
==================================================

Allow filtering by:

All
Open
Awaiting Entrepreneur
Awaiting MIDC Review
Resolved
Reopened

Also:

Query ID
Deficiency ID
Category
Date
Officer / Desk
Application Version
Resubmission Version

Do not introduce an arbitrary severity ranking.

==================================================
36. M18 / M19 NAVIGATION
==================================================

M18 actions:

View History
→ M19

M19 actions:

Return to Current Query
→ M18

View Deficiency
→ M18 selected deficiency

View Parameter
→ M12

View Document
→ M13

View Consistency
→ M16

View Dependency
→ M17

View Delta
→ M20

This creates a connected review system rather than isolated screens.

==================================================
37. M16 INTEGRATION
==================================================

If M16 identifies:

Plot Area mismatch

M16 action:

Raise Query

creates:

DEF-2026-0091

The officer is taken to M18 with:

Category:
Data Inconsistency

Issue:
Plot area differs between relevant records.

Evidence:
Pre-populated from M16

Related field:
Plot Area

Source:
M16

The officer can then:

Edit
Add supporting context
Add required correction
Request evidence
Add to consolidated query

Do not force the officer to re-enter the same evidence.

==================================================
38. M13 DOCUMENT INTEGRATION
==================================================

If M13 identifies a deficient document:

M13 action:

Request Correction

creates a deficiency candidate.

Example:

DEF-2026-0092

Category:
Document

Source:
M13

Issue:
Building Plan requires correction.

Document requested:
Corrected Building Plan

M18 then allows the officer to consolidate it with other issues.

==================================================
39. M14 / M15 INTEGRATION
==================================================

M14:

Building / Planning scrutiny issue

→ M18 deficiency candidate

M15:

Water / Utility / Drainage issue

→ M18 deficiency candidate

Both use the same deficiency model.

Do NOT create:

Building Query ID
Water Query ID
Document Query ID

as separate incompatible systems.

All become:

Deficiency ID

inside:

Query ID

==================================================
40. M17 DEPENDENCY INTEGRATION
==================================================

If M17 identifies an entrepreneur-blocking action:

Example:

"Provide configured prerequisite evidence"

the officer may create a Dependency deficiency.

M18:

Category:
Dependency

Issue:
Required prerequisite evidence has not been provided.

Evidence:
Configured dependency node

Required correction:
Provide the specified evidence.

M19 later records the response.

Do not create a separate dependency-query system.

==================================================
41. PAYMENT / CHALLAN INTEGRATION
==================================================

Because payment timing is configurable:

If the current service requires payment before the next configured workflow step and payment is missing:

M18 may contain:

Category:
Other
or
configured Payment / Fee category if the taxonomy is later expanded.

Issue:
Configured fee/challan requirement remains pending.

Required correction:
Complete the configured payment step.

But do NOT assume:

all services require payment before submission.

Do NOT assume:

all services require payment after submission.

Do NOT add "Payment" as a universal deficiency category unless the product configuration explicitly adds it.

Payment remains:

payment_state

separate from:

application_state.

==================================================
42. APPLICATION STATE AFTER QUERY
==================================================

When a consolidated query is formally sent:

Application State:
QUERY_RAISED

When the entrepreneur responds and the application is ready for departmental review:

Use the configured transition.

When correction/resubmission is required:

CORRECTION_REQUIRED

After valid resubmission:

RESUBMITTED

Then:

DOCUMENT_SCRUTINY
or
INITIAL_SCRUTINY
or
TECHNICAL_SCRUTINY

according to the configured workflow.

Do not create:

AWAITING_ENTREPRENEUR_RESPONSE

as a new canonical application state.

It may appear as an operational overlay.

==================================================
43. OFFICER CONTEXT
==================================================

Every query event must retain:

Officer
Desk
Department
Region / Office
Role where relevant

But distinguish:

Officer's assigned desk

from:

Application's current desk.

Example:

Officer:
Planning Officer

Assigned Desk:
Planning / Building

Application Current Desk:
Query Review

Do not assume they are identical.

==================================================
44. AUDIT TRAIL
==================================================

All M18/M19 actions must be auditable.

Record:

Query ID
Deficiency ID
Application ID
Business ID
Project ID
Officer
Desk
Action
Timestamp
Application Version
Document Version
Business DNA Version where relevant
Regulatory Rule Version
Previous status
New status

Examples:

Created
Added to Query
Removed from Query
Query Sent
Response Received
Correction Submitted
Document Replaced
Reviewed
Resolved
Reopened

Do not overwrite historical actions.

==================================================
45. AI / AUTOMATION BOUNDARY
==================================================

Automation may:

- detect potential duplicates
- group related deficiencies
- retrieve supporting evidence
- suggest relevant fields
- identify previously raised issues
- detect unresolved issues
- surface changed fields
- suggest relevant configured regulatory sources

Automation must NOT:

- automatically send a query without officer confirmation
- invent a deficiency
- invent a legal requirement
- decide that an entrepreneur is at fault
- automatically resolve a deficiency
- automatically reject the application
- modify another department's record
- silently rewrite the officer's query
- silently rewrite the entrepreneur's response

The officer explicitly decides what gets sent.

==================================================
46. NO DUPLICATE DATA ENTRY
==================================================

If M14 already contains:

Built-up Area:
2,300 m²

and identifies an issue,

M18 should inherit:

Field:
Built-up Area

Value:
2,300 m²

Source:
M14

The officer should not have to type it again.

Likewise:

M13 document evidence
M16 comparison evidence
M17 dependency evidence

should flow automatically into the deficiency candidate.

==================================================
47. SAMPLE M18 SCREEN
==================================================

Use:

Application:
MIDC-APP-2026-00418

Query:
New Consolidated Query

Unresolved candidates:

DEF-2026-0091
DATA INCONSISTENCY
Plot area differs across records

DEF-2026-0092
DOCUMENT
Building plan requires correction

DEF-2026-0093
BUILDING / PLAN
Built-up area clarification required

DEF-2026-0094
UTILITY / WATER
Configured utility evidence required

Potential duplicate warning:

DEF-2026-0081
Similar plot-area issue
Status: Resolved

Show:

"Potential duplicate — review before creating a new issue."

Current Consolidated Query:

3 selected

Then:

Send Consolidated Deficiency

==================================================
48. SAMPLE M19 SCREEN
==================================================

Query:
QRY-2026-0042

Status:
PARTIALLY_RESPONDED

Deficiencies:
4

Resolved:
2

Awaiting Entrepreneur:
1

Awaiting MIDC Review:
1

Timeline:

12 Sep
Query sent
MIDC Planning Desk

13 Sep
Entrepreneur response
DEF-0091

13 Sep
Corrected document uploaded
Building Plan v3

14 Sep
Resubmission v2

14 Sep
Officer review

15 Sep
DEF-0091 resolved

15 Sep
DEF-0092 requires clarification

Response time:

2 days 5 hours 25 minutes

Changed fields:

Plot Area:
4,800 → 5,200

Building Area:
No change

Documents:

Building Plan:
v2 → v3

CTA:

Open Delta Re-scrutiny

==================================================
49. VISUAL STRUCTURE — M18
==================================================

Use:

TOP:
Application context

SECOND:
Query status / unresolved counts

LEFT:
Issue categories and candidate deficiencies

CENTER:
Selected deficiency detail

RIGHT:
Current consolidated query

BOTTOM:
Save Draft / Review / Send

Use structured tables and compact panels.

Do not create giant dashboard cards.

The core visual task is:

SELECT → REVIEW → CONSOLIDATE → SEND.

==================================================
50. VISUAL STRUCTURE — M19
==================================================

Use:

TOP:
Application context

SECOND:
Query summary

MAIN:
Chronological timeline

RIGHT:
Selected event / deficiency detail

Optional top filters:

Query
Deficiency
Category
Status
Date
Officer / Desk

The timeline must make the complete communication loop visually obvious:

QUERY
↓
RESPONSE
↓
CORRECTION
↓
RESUBMISSION
↓
REVIEW
↓
RESOLUTION / REOPEN

==================================================
51. ACCESSIBILITY
==================================================

Use Auto Layout.

Use text + icon for statuses.

Do not rely on colour alone.

Ensure:

- long officer comments wrap
- long deficiency descriptions wrap
- document names remain readable
- Query IDs and Deficiency IDs are selectable/readable
- timeline events remain understandable without colour
- keyboard/focus states use the existing design system
- English/Marathi-compatible containers are maintained

==================================================
52. FINAL CROSS-SYSTEM CONTRACT
==================================================

The same underlying deficiency must remain the same object across the entire system.

Example:

M14:
Building issue detected

↓

M18:
DEF-2026-0092

↓

Query:
QRY-2026-0042

↓

Entrepreneur Query page:
DEF-2026-0092

↓

Entrepreneur response:
DEF-2026-0092

↓

Resubmission:
Application v2

↓

M19:
DEF-2026-0092 history

↓

M20:
Changed fields caused by response

↓

M14:
Officer re-scrutiny

Do not create duplicate IDs or parallel query objects.

==================================================
53. CRITICAL RULES
==================================================

NEVER:

- send separate queries from every scrutiny screen
- create incompatible query IDs for different modules
- overwrite old deficiencies
- erase resolved issues
- silently merge duplicate deficiencies
- silently send queries
- invent regulatory requirements
- invent legal references
- automatically reject an application because of a deficiency
- treat operational labels as canonical application states
- expose internal officer notes to the entrepreneur unless configured
- overwrite documents
- overwrite historical application versions
- edit another department's records
- assume payment timing is universal
- make payment a universal regulatory dependency
- let AI decide what deficiency is legally sufficient

ALWAYS:

- consolidate unresolved issues
- preserve exact Deficiency IDs
- preserve Query IDs
- preserve provenance
- preserve version history
- show evidence
- show related fields
- show required correction
- show supporting regulation when configured
- show requested documents
- preserve officer comments
- preserve entrepreneur responses
- track response time separately
- connect responses to resubmissions
- connect resubmissions to M20
- use M19 as the complete communication history
- keep entrepreneur and MIDC views synchronized to the same underlying records