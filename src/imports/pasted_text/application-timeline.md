Create M08 — Application Timeline.

IMPORTANT:
This is an application-level timeline and lifecycle history screen.

Do NOT redesign the government shell.
Do NOT regenerate Phase 0.
Do NOT create a new dashboard.
Do NOT change existing colors, typography, spacing, sidebar, header, footer, tables, status components, breadcrumbs, buttons, or accessibility patterns.

Continue from the existing EKATMA MIDC Department Figma file.

Reuse existing components.

M08 must show the complete chronological history of one MIDC application and explain where time has been spent throughout its lifecycle.

This screen is primarily about:

- WHAT HAPPENED
- WHEN IT HAPPENED
- WHO / WHICH DESK HANDLED IT
- WHAT ACTION OCCURRED
- WHAT STATE THE APPLICATION ENTERED
- HOW LONG THE EVENT / STAGE TOOK
- WHETHER THE DELAY WAS WITH MIDC, THE ENTREPRENEUR, AN INSPECTION, OR AN EXTERNAL DEPENDENCY
- HOW THE APPLICATION'S SLA is progressing

It must NOT become:

- a queue
- a scrutiny workspace
- a decision workspace
- a document review workspace
- a Business DNA editor

==================================================
1. NAVIGATION CONTEXT
==================================================

M08 is part of the individual application workspace.

The MIDC officer sidebar must remain:

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

Active sidebar item:

Applications

Do NOT create a separate "Timeline" sidebar item.

Do NOT place M08 under:

Service Catalogue
Scrutiny
Inspections
Audit / History

M08 is reached through the application context.

==================================================
2. BREADCRUMB
==================================================

Use:

Department Home > Applications > Application Overview > Timeline

Reuse the existing EKATMA breadcrumb component.

==================================================
3. PAGE HEADER
==================================================

Page title:

Application Timeline

Supporting text:

"Complete lifecycle and timing history for this MIDC application."

Show compact application identity below or beside the title:

Application ID
Business / Project
MIDC Service
Current Application State
Current Desk
Office / Region

Example:

MIDC-APP-2026-00482
Aster BioTech Manufacturing Pvt. Ltd.
Building / Planning
TECHNICAL_SCRUTINY
Planning / Building Scrutiny
Configured MIDC Office — Prototype

Do not repeat the entire M06 application header.

==================================================
4. TIMELINE SUMMARY
==================================================

At the top of M08, create a compact timing summary.

Show:

MIDC Processing Time
Entrepreneur Response Time
Current Desk Time
Inspection Waiting
External Dependency Wait
Total Elapsed

These must be separate values.

Do NOT collapse everything into a single "processing time."

Example:

MIDC Processing
12d 4h

Entrepreneur Response
3d 8h

Current Desk
2d 6h

Inspection Waiting
1d 3h

External Dependency
4d 2h

Total Elapsed
21d 11h

IMPORTANT:

These are illustrative prototype values.

Do not present them as official MIDC SLA statistics.

The timing calculation should be based on recorded timeline events.

==================================================
5. SLA SUMMARY
==================================================

Create a compact SLA panel.

Show:

SLA
Day X / Y

Example:

Day 18 / 30

Status:

NORMAL

Possible states:

NORMAL
APPROACHING
BREACHED

Use the existing EKATMA SLA/status component.

Do not invent statutory SLA durations.

The value Y must come from configured SLA data.

If no SLA is configured:

SLA
Not configured

Do not display a fabricated number.

==================================================
6. SLA TIME CLASSIFICATION
==================================================

Clearly distinguish time attributable to:

1. MIDC processing
2. Entrepreneur response
3. Current desk
4. Inspection waiting
5. External dependency
6. Total elapsed

The UI must make it obvious that:

Entrepreneur response time

is NOT counted as:

MIDC processing time

when calculating the corresponding timing breakdown.

Likewise:

External dependency waiting

must remain separately visible.

Inspection waiting must remain separately visible where configured.

Do not visually imply that every day of total elapsed time is MIDC processing delay.

==================================================
7. PRIMARY TIMELINE
==================================================

Create the main vertical chronological timeline.

The timeline must run from earliest event at the top to latest event at the bottom.

Use clear event markers and connecting lines.

Each event must show:

Timestamp
Desk
Role / Officer
Action
Status
Comment
Entrepreneur Response where applicable
Time Spent

Use existing EKATMA timeline/event components if available.

Do not create a completely new visual language.

==================================================
8. CORE LIFECYCLE
==================================================

The prototype must represent the following lifecycle:

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

This is the high-level lifecycle.

The actual timeline may contain additional events between these stages.

Do NOT imply that every application necessarily goes through every stage.

For example:

- a service may not require a fee
- a service may not require inspection
- an application may have additional query/resubmission cycles
- some configured services may use different scrutiny routing

The lifecycle must therefore be configurable.

==================================================
9. CANONICAL APPLICATION STATES
==================================================

Use the canonical application state model where a state is displayed:

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

Do not create a conflicting application-state vocabulary.

Operational labels such as:

Awaiting Entrepreneur Response
SLA Risk
Decision Pending

may be shown as overlays/context.

They do NOT replace the canonical application state.

==================================================
10. EVENT STRUCTURE
==================================================

Every event card should have a consistent structure.

Example:

18 Sep 2026
14:32

TECHNICAL SCRUTINY

Desk:
Planning / Building Scrutiny

Role:
Technical Officer

Action:
Scrutiny completed

Status:
Completed

Comment:
"Building plan reviewed against submitted application data."

Time spent:
2d 6h

If entrepreneur response exists:

Entrepreneur response:
Submitted revised building plan

Response timestamp:
17 Sep 2026, 10:14

Do not force every event to display fields that do not apply.

Use contextual visibility.

==================================================
11. EVENT TYPES
==================================================

Support event types including:

Application submitted
Fee generated
Fee paid
Challan confirmed
Application received by desk
Document scrutiny started
Document scrutiny completed
Initial scrutiny started
Initial scrutiny completed
Technical scrutiny started
Technical scrutiny completed
Query raised
Entrepreneur response received
Correction requested
Resubmission received
Dependency became available
Application routed
Application moved to another desk
Inspection requested
Inspection scheduled
Inspection completed
Re-inspection required
Decision initiated
Decision recorded
Approval issued
Rejection recorded
Application returned for correction

Also support:

Other configured workflow events

Do not create events that are not supported by the application's workflow.

==================================================
12. ROUTING EVENTS
==================================================

When an application moves between desks or workflow stages, record:

Previous desk
New desk
Timestamp
Routing reason
Configured routing rule where available

Example:

Application routed

From:
Initial Scrutiny

To:
Planning / Building Scrutiny

Reason:
Service = Building / Planning
Project Stage = Construction
Configured jurisdiction = Example MIDC Office

Do not say:

"AI routed the application"

unless the product explicitly has a separate explainable AI routing capability.

Prefer:

"Routed using configured workflow rule"

or:

"Routing rule applied"

==================================================
13. DEPENDENCY EVENTS
==================================================

If an application moves because a prerequisite becomes available, record that event explicitly.

Example:

DEPENDENCY EVENT

18 Sep 2026, 11:42

MPCB prerequisite status changed:

Pending → Available

Effect:
Application moved to next configured workflow stage.

Show:

Dependency
Status before
Status after
Timestamp
Resulting application movement

Do not allow MIDC to modify the external department's decision.

The event should only record the dependency state as received/observed by the system.

==================================================
14. DEPENDENCY WAITING TIME
==================================================

When an application is waiting for an external dependency, show that waiting period separately.

Example:

External Dependency Wait

4d 2h

Dependency:
MPCB

Started:
10 Sep 2026

Resolved:
14 Sep 2026

Application impact:
Technical scrutiny became available after prerequisite state changed.

Do not include this period silently inside MIDC processing time.

If the dependency is still unresolved:

Status:
Waiting

Elapsed:
4d 2h

==================================================
15. ENTREPRENEUR RESPONSE PAUSE
==================================================

If the application is paused awaiting entrepreneur response, make this visually distinct.

Example:

AWAITING ENTREPRENEUR RESPONSE

Query raised:
10 Sep 2026, 15:20

Response received:
14 Sep 2026, 11:05

Response wait:
3d 19h

During this period:

MIDC processing timer:
Paused / excluded according to configured SLA rule

Entrepreneur response time:
3d 19h

IMPORTANT:

Do not represent entrepreneur response time as MIDC processing delay.

Do not hide this period from the total elapsed timeline.

The full lifecycle still includes the time.

==================================================
16. CURRENT DESK TIME
==================================================

Show how long the application has remained with its current desk.

Example:

CURRENT DESK

Planning / Building Scrutiny

Received:
16 Sep 2026

Current duration:
2d 6h

Use the actual current desk from application context.

Do not confuse:

Current Desk Time

with:

Logged-in Officer's Desk

The value refers to the application's current desk.

==================================================
17. TIME SPENT PER EVENT
==================================================

Every completed workflow stage/event should display:

Time spent

Example:

Initial Scrutiny
1d 4h

Technical Scrutiny
2d 6h

Entrepreneur Response
3d 19h

Inspection Waiting
1d 3h

If the event is still active:

Time spent:
2d 6h and counting

Do not show a final duration for an active event.

==================================================
18. ACTIVE EVENT
==================================================

The current active timeline event should be visually distinct but use the existing EKATMA status system.

Example:

CURRENT

Technical / Service Scrutiny

Started:
16 Sep 2026, 09:30

Elapsed:
2d 6h

Current Desk:
Planning / Building Scrutiny

SLA:
Approaching

Do not use decorative animation.

A simple active indicator is sufficient.

==================================================
19. EVENT DETAIL DRAWER
==================================================

When an officer selects an event, open the existing drawer/panel pattern.

Show:

Event
Timestamp
Desk
Office / Region
Role
Officer
Action
Application State
Comment
Entrepreneur Response
Dependency
Documents / evidence where relevant
Time spent
SLA effect

Example:

EVENT DETAIL

Technical Scrutiny Completed

Timestamp:
18 Sep 2026, 14:32

Desk:
Planning / Building Scrutiny

Role:
Technical Officer

Action:
Technical review completed

Status:
Completed

Comment:
"Building plan reviewed."

Time spent:
2d 6h

SLA effect:
2d 6h MIDC processing time

Do not turn the event drawer into a full scrutiny workspace.

==================================================
20. OFFICER / ROLE VISIBILITY
==================================================

Where the event has an identifiable actor, show:

Role
Officer
Desk

Example:

Technical Officer
Officer Name
Planning / Building Scrutiny

If the event was automated:

Actor:
System

Role:
Automated workflow

For example:

Routing rule applied
Actor:
System

Do not attribute automated actions to an individual officer.

If the actor is unavailable:

Actor:
Not available

Do not fabricate a name.

==================================================
21. COMMENTS
==================================================

Show officer/system comments where recorded.

Example:

Comment:
"Additional building plan required before technical scrutiny can continue."

Do not generate fictional officer comments for real data.

For prototype sample data, use clearly fictional comments.

Comments should remain distinguishable from:

System-generated findings
Regulatory references
Entrepreneur responses

==================================================
22. ENTREPRENEUR RESPONSES
==================================================

Where a query or correction has an entrepreneur response, display it as a separate event or nested response.

Example:

QUERY RAISED

10 Sep 2026
15:20

Officer comment:
"Please provide revised building plan."

↓

ENTREPRENEUR RESPONSE

14 Sep 2026
11:05

Response:
"Revised building plan uploaded."

Attachment:
Building_Plan_Rev2.pdf

Do not make the response look like an officer action.

Clearly identify:

ENTREPRENEUR RESPONSE

This will later support synchronization with the Entrepreneur-side timeline.

==================================================
23. QUERY / RESUBMISSION EVENTS
==================================================

Represent query cycles clearly.

Example:

Initial Scrutiny
↓
Query Raised
↓
Awaiting Entrepreneur Response
↓
Response Received
↓
Resubmitted
↓
Delta Re-scrutiny
↓
Technical Scrutiny

Do not flatten the application into a single linear stage if it has gone backward and forward through the workflow.

The timeline must preserve the actual history.

==================================================
24. RESUBMISSION
==================================================

When a resubmission occurs, show:

Previous application version
New application version
Resubmission timestamp
Changed information
New documents where relevant

Example:

RESUBMISSION

Version:
v3

Previous:
v2

Submitted:
18 Sep 2026, 10:20

Changes detected:
2

Documents added:
1

Link:
View Delta Re-scrutiny

→ M20

Do not delete or overwrite the earlier timeline.

==================================================
25. INSPECTION EVENTS
==================================================

Where inspection applies, show:

Inspection required
Inspection requested
Inspection scheduled
Inspection completed
Observation recorded
Re-inspection required

Example:

INSPECTION SCHEDULED

Date:
22 Sep 2026

Inspection type:
Configured MIDC inspection

Status:
Scheduled

Do not create inspection events for services where inspection is not required.

If no inspection is required:

Inspection:
Not applicable for this service

==================================================
26. DECISION EVENTS
==================================================

The final part of the lifecycle should show:

Decision initiated
Decision recorded
Approval / correction / rejection
Certificate/order/conditions where applicable

Use the canonical application states:

FINAL_DECISION
APPROVED
REJECTED

If the application is returned for correction:

CORRECTION_REQUIRED

Do not imply that M08 itself makes or recommends the decision.

M08 records the decision event.

Decision action belongs to M25/M26.

==================================================
27. TIMELINE FILTERS
==================================================

Provide lightweight filters at the top of the timeline.

Possible filters:

All
Application
Fee / Challan
Documents
Scrutiny
Queries
Entrepreneur Response
Dependencies
Inspection
Decision
Routing

Use existing EKATMA filter components.

Do not create excessive filtering complexity.

The default should be:

All

The officer should see the complete history by default.

==================================================
28. TIME FILTER / VIEW
==================================================

Where useful, allow:

Full history
Current version
Current workflow cycle

Default:

Full history

Do not hide previous versions by default.

Version history must remain accessible.

==================================================
29. TIMING BREAKDOWN PANEL
==================================================

Create a dedicated panel beside or below the timeline:

TIME BREAKDOWN

MIDC Processing
12d 4h

Entrepreneur Response
3d 8h

Current Desk
2d 6h

Inspection Waiting
1d 3h

External Dependency
4d 2h

Total Elapsed
21d 11h

Use restrained visualisation.

A horizontal duration bar or segmented timeline is acceptable if it uses the existing EKATMA design language.

Do not create a decorative analytics chart.

The primary purpose is attribution of elapsed time.

==================================================
30. SLA BREAKDOWN
==================================================

Show:

SLA

Day 18 / 30

Status:
APPROACHING

Then show a concise explanation:

Remaining:
12 days

or, if breached:

Breached by:
X days

The value must come from configured SLA data.

Do not invent a universal SLA.

If SLA rules differ by service, show:

SLA basis:
Configured service SLA

Do not expose undocumented legal thresholds.

==================================================
31. SLA STATUS
==================================================

Use exactly the conceptual states:

NORMAL
APPROACHING
BREACHED

Do not introduce:

Critical
Danger
Severe
Excellent

unless an existing configured system component already uses them.

The timeline should not rank applications.

SLA status is a workflow condition.

==================================================
32. SLA EVENT ATTRIBUTION
==================================================

Where an event contributes to SLA time, show:

SLA effect

Example:

Technical Scrutiny

Time spent:
2d 6h

SLA effect:
MIDC processing

Entrepreneur response:

Time spent:
3d 19h

SLA effect:
Entrepreneur response

External dependency:

Time spent:
4d 2h

SLA effect:
External dependency wait

This allows the officer to understand why total elapsed time differs from department processing time.

==================================================
33. CURRENT APPLICATION POSITION
==================================================

At the top of the timeline, show a compact:

CURRENT POSITION

Current state:
TECHNICAL_SCRUTINY

Current desk:
Planning / Building Scrutiny

Started:
16 Sep 2026

Current desk time:
2d 6h

Next configured step:
Decision / Inspection / Query depending on actual workflow

Do not predict a future decision.

Only show the next configured workflow stage where one is explicitly known.

==================================================
34. NO PREDICTIVE DECISION
==================================================

Do NOT add:

Approval probability
Rejection probability
Predicted approval date
AI decision
Recommended outcome

M08 is historical and operational.

It explains what happened and how long it took.

It does not predict or decide the final outcome.

==================================================
35. RELATIONSHIP TO M06
==================================================

M06 contains a compact recent timeline preview.

M08 contains the complete application timeline.

Therefore:

M06
→ Recent Activity / Timeline Preview
→ View full timeline
→ M08

Do not duplicate the full timeline inside M06.

==================================================
36. RELATIONSHIP TO M09–M26
==================================================

Timeline events must link back to relevant detailed workspaces where appropriate.

Examples:

Automated Pre-check
→ M09

Scrutiny Route
→ M10

Land / Plot Scrutiny
→ M11

Parameter review
→ M12

Document review
→ M13

Consistency event
→ M16

Dependency event
→ M17

Query
→ M18 / M19

Delta re-scrutiny
→ M20

Inspection
→ M21–M24

Decision
→ M25 / M26

Do not embed those workspaces inside M08.

M08 records their occurrence in the application lifecycle.

==================================================
37. RELATIONSHIP TO M38 AUDIT
==================================================

M08 and M38 are related but different.

M08:
Application lifecycle timeline

M38:
Detailed audit/history

M08 should show:

What happened
When
Where
Who
Action
Status
Time

M38 can provide deeper audit details such as:

record changes
field changes
permission events
system events
actor history
version history

Provide:

"View audit details"

→ M38

Do not duplicate the complete audit log in M08.

==================================================
38. TIMELINE DATA INTEGRITY
==================================================

Timeline events must be immutable historical records.

Do not silently edit previous events.

If a correction to an event is recorded:

preserve:

Original event
Correction
Timestamp
Actor
Reason

Do not rewrite the history to make the current process appear linear.

The timeline must reflect the actual application journey.

==================================================
39. EVENT SOURCE
==================================================

Where useful, show event source:

Officer action
System workflow
Entrepreneur action
External dependency update
Inspection event

Example:

Source:
Entrepreneur

Action:
Response submitted

or:

Source:
System

Action:
Application routed using configured rule

or:

Source:
External dependency

Action:
Prerequisite status updated

This helps distinguish human, system and external events.

==================================================
40. SAMPLE APPLICATION TIMELINE
==================================================

Use realistic but fictional prototype data.

Example:

02 Sep 2026
09:15
SUBMITTED

Desk:
Application Intake

Action:
Application submitted

Status:
SUBMITTED


02 Sep 2026
11:05
FEE / CHALLAN

Action:
Fee confirmation recorded

Status:
FEE_CONFIRMED


03 Sep 2026
10:20
DOCUMENT SCRUTINY

Desk:
Document Desk

Action:
Documents received and checked

Status:
DOCUMENT_SCRUTINY

Time:
1d 4h


05 Sep 2026
14:10
INITIAL SCRUTINY

Desk:
Initial Scrutiny

Action:
Initial review completed

Status:
INITIAL_SCRUTINY


06 Sep 2026
15:20
QUERY RAISED

Action:
Additional building plan requested

Status:
QUERY_RAISED


10 Sep 2026
11:05
ENTREPRENEUR RESPONSE

Action:
Revised building plan uploaded

Source:
Entrepreneur

Response time:
3d 19h


10 Sep 2026
12:00
RESUBMITTED

Version:
v2

Status:
RESUBMITTED


10 Sep 2026
12:10
DEPENDENCY WAIT

Dependency:
MPCB

Status:
Pending


14 Sep 2026
16:15
DEPENDENCY AVAILABLE

Dependency:
MPCB

Previous:
Pending

Current:
Available

Effect:
Application moved to next configured workflow stage


16 Sep 2026
09:30
TECHNICAL SCRUTINY

Desk:
Planning / Building Scrutiny

Status:
TECHNICAL_SCRUTINY

Current:
Active

Time:
2d 6h


18 Sep 2026
14:32
TECHNICAL SCRUTINY UPDATE

Action:
Technical review completed

Status:
Completed

Time:
2d 6h


22 Sep 2026
10:00
INSPECTION

Status:
Scheduled

IMPORTANT:

These are fictional prototype events.

Do not present them as actual MIDC processing times or official service timelines.

==================================================
41. EMPTY / EDGE STATES
==================================================

Support:

No fee required
No inspection required
No external dependency
No entrepreneur response
No queries
No resubmission
No previous version
No SLA configured
No current desk time
No completed decision

Examples:

Inspection:
Not applicable for this service

Fee:
Not applicable for this service

External dependency:
No active external dependency

SLA:
Not configured

Do not create empty visual noise.

==================================================
42. MULTIPLE QUERY CYCLES
==================================================

The application may have more than one query/resubmission cycle.

The timeline must support:

Query 1
Response 1
Resubmission 1
Scrutiny

Query 2
Response 2
Resubmission 2
Re-scrutiny

Do not assume only one query cycle.

Each cycle must retain its own timestamp and timing.

==================================================
43. MULTIPLE INSPECTIONS
==================================================

Support:

Inspection 1
Observation
Re-inspection required
Inspection 2
Observation
Completed

Do not assume inspection happens only once.

==================================================
44. APPLICATION VERSIONING
==================================================

If the application has multiple versions:

show a version marker in the timeline.

Example:

v1
Initial submission

v2
Resubmission

v3
Resubmission after query

Allow the officer to identify which events belong to which version.

Do not hide earlier versions.

==================================================
45. ENTREPRENEUR-SIDE SYNCHRONIZATION
==================================================

This timeline will later be exposed on the Entrepreneur side in simplified form.

Therefore the event model must be designed so that the same underlying events can support two views.

OFFICER VIEW:

Detailed:
- timestamp
- desk
- role
- officer
- action
- status
- comment
- response
- dependency
- time spent
- SLA impact

ENTREPRENEUR VIEW:

Simplified:
- submitted
- under review
- query raised
- response received
- inspection
- decision

Do not expose sensitive internal officer information to the Entrepreneur view by default.

Do not create two unrelated timelines.

Use one underlying event model with different visibility rules.

==================================================
46. ENTREPRENEUR-SIDE PRIVACY
==================================================

The department timeline may contain:

Officer name
Internal desk
Internal routing information
Internal comments
Internal SLA attribution

These should not automatically appear on the Entrepreneur side.

The future Entrepreneur timeline should use the permitted simplified representation.

For example:

Department internal event:
"Planning / Building Scrutiny — Technical Officer reviewed parameter X"

Entrepreneur view:
"Application under technical review"

Use permission/visibility rules.

==================================================
47. ACCESSIBILITY
==================================================

Reuse the existing EKATMA accessibility system.

The timeline must:

- support keyboard navigation
- have accessible event labels
- provide readable timestamps
- provide text labels for status
- not rely only on color
- support English / Marathi-compatible text lengths
- provide accessible expandable event details

Do not create a color-only timeline.

==================================================
48. VISUAL DESIGN
==================================================

Use the existing EKATMA timeline and status language if already available.

The visual hierarchy should be:

APPLICATION CONTEXT

↓

TIMING / SLA SUMMARY

↓

FULL LIFECYCLE TIMELINE

↓

EVENT DETAILS

Use:

- vertical timeline
- restrained event markers
- compact cards
- status badges
- timestamp hierarchy
- subtle dividers
- duration labels
- existing typography

Avoid:

- decorative infographics
- giant charts
- animated timelines
- neon gradients
- glassmorphism
- startup-style analytics dashboards
- excessive colors
- unnecessary icons

==================================================
49. FINAL PAGE STRUCTURE
==================================================

The final M08 page should read:

SIDEBAR
Applications = ACTIVE

BREADCRUMB
Department Home > Applications > Application Overview > Timeline

PAGE TITLE
Application Timeline

APPLICATION CONTEXT
Application ID
Business / Project
MIDC Service
Current State
Current Desk

TIMING SUMMARY
MIDC Processing
Entrepreneur Response
Current Desk
Inspection Waiting
External Dependency
Total Elapsed

SLA
Day X / Y
Normal / Approaching / Breached

CURRENT POSITION
Current State
Current Desk
Current Duration

FULL TIMELINE

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

with all actual intermediate events shown.

==================================================
50. MOST IMPORTANT PRINCIPLE
==================================================

M08 is the AUTHORITATIVE APPLICATION LIFECYCLE VIEW.

It must allow the officer to answer:

"What happened?"

"When did it happen?"

"Who or which desk handled it?"

"What action occurred?"

"What was the application state?"

"How long did that stage take?"

"Was the time spent by MIDC, the entrepreneur, an inspection, or an external dependency?"

"Is the application approaching or breaching its configured SLA?"

"Why did the application move to its current stage?"

The timeline must preserve the real sequence of events.

It must distinguish:

MIDC processing
from
Entrepreneur response
from
Inspection waiting
from
External dependency waiting.

It must preserve version history, query cycles, resubmissions, dependency events and inspection events.

It must never rewrite history or silently overwrite previous events.

The same underlying event model must later support a simplified Entrepreneur-side timeline.

M08 records and explains the lifecycle.

It does not make the statutory decision.