Continue from the existing EKATMA MIDC Department Figma file.

Create and integrate:

M30 — SLA Dashboard
M31 — Escalation / Grievance
M39 — Notifications

IMPORTANT:
Do not regenerate Phase 0.
Do not redesign the Maharashtra Government shell.
Do not alter existing M01–M29 screens.

Reuse all existing:
- government header/footer
- EKATMA branding
- typography
- color system
- spacing
- sidebar
- breadcrumbs
- application context header
- table components
- status chips
- SLA indicators
- timeline components
- notification primitives
- audit components
- application IDs
- Business IDs
- Project IDs
- verification states
- canonical application states

Use Auto Layout.

Use realistic prototype-safe sample data.

Keep:
Department = MIDC

Where relevant, display:
Region / Office
Desk
Role

Do not invent statutory SLA durations or legal escalation deadlines.

If a deadline is needed for the prototype, clearly represent it as:
“Configured SLA”
rather than implying a universal statutory value.

--------------------------------------------------
OVERALL ARCHITECTURAL ROLE
--------------------------------------------------

These three screens serve different purposes:

M30:
“What is the time status of MIDC work, and where is elapsed time being spent?”

M31:
“What problem has been escalated, what evidence is attached, who is responsible for resolving it, and what happened afterward?”

M39:
“What important event requires my attention right now?”

Do not merge these into one generic alert dashboard.

The relationship is:

APPLICATION WORKFLOW
        ↓
SLA CLOCKS
        ↓
M30 SLA MONITORING
        ↓
if issue persists / grievance raised
        ↓
M31 ESCALATION / GRIEVANCE
        ↓
resolution
        ↓
application / journey status update
        ↓
M39 notification to relevant users

M39 can also be triggered by ordinary workflow events that do not create an SLA issue or grievance.

--------------------------------------------------
CANONICAL STATE RULE
--------------------------------------------------

Do not create a new canonical application state such as:

GRIEVANCE
ESCALATED
SLA_BREACHED

The existing application states remain authoritative:

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

Operational labels such as:

SLA Risk
SLA Breached
Escalated
Awaiting Entrepreneur Response
Decision Pending

must remain overlays.

Example:

Application State:
TECHNICAL_SCRUTINY

Operational Overlay:
SLA Risk

Do not replace the application state with the overlay.

--------------------------------------------------
M30 — SLA DASHBOARD
--------------------------------------------------

PURPOSE

Create M30 as the department's operational SLA command centre.

The screen must help officers understand:

1. Which applications are approaching configured deadlines?
2. Which applications have exceeded configured SLA?
3. Which desk or service currently holds the application?
4. How much time has been spent with MIDC?
5. How much time has been spent waiting for the entrepreneur?
6. How much time has been spent waiting for inspection?
7. How much time has been spent waiting for an external dependency?
8. How much total elapsed time has passed?
9. Where are the current SLA bottlenecks?

Do not create a single AI-generated “SLA risk score.”

SLA status must be explainable from actual time values and configured thresholds.

--------------------------------------------------
M30 — PAGE HEADER
--------------------------------------------------

Breadcrumb:

Department Home
→ SLA & Escalations
→ SLA Dashboard

Page title:

SLA Dashboard

Subtitle:

“Monitor configured service timelines, elapsed processing time, and applications approaching or exceeding SLA.”

Top-right controls:

Date range
Service
Office / Region
Desk
Application state
SLA status

Use existing filtering components.

--------------------------------------------------
M30 — TOP KPI STRIP
--------------------------------------------------

Create a horizontal KPI strip.

Cards:

1. Active Applications
2. Normal
3. Approaching Deadline
4. SLA Exceeded
5. Awaiting Entrepreneur
6. Awaiting Inspection
7. Awaiting External Dependency

Do not use arbitrary completion percentages.

Each KPI must be clickable and filter the underlying application table.

Example:

SLA Exceeded
12

Clicking it filters the table to applications whose configured SLA has been exceeded.

--------------------------------------------------
M30 — SLA STATUS DEFINITIONS
--------------------------------------------------

Use exactly these high-level SLA states:

NORMAL

APPROACHING DEADLINE

SLA EXCEEDED

Do not introduce:
Critical
Severe
Very High Risk
AI Risk 97%

If the configured SLA does not exist for an application/service, show:

SLA:
Not Configured

Do not invent a deadline.

--------------------------------------------------
M30 — SLA TIME BREAKDOWN
--------------------------------------------------

Create a prominent time-breakdown panel.

Title:

Where Is the Time Being Spent?

Show separate durations:

MIDC Processing Time
Entrepreneur Response Time
Current Desk Time
Inspection Wait
External Dependency Wait
Total Elapsed Time

Example:

MIDC Processing:
3d 4h

Entrepreneur Response:
1d 6h

Current Desk:
18h

Inspection Wait:
12h

External Dependency:
8h

Total Elapsed:
5d 2h

IMPORTANT:

Do not blindly sum these values unless the underlying timing model defines them as additive.

Some clocks may overlap depending on the workflow implementation.

The UI should distinguish:
- elapsed duration
- attributed duration
- current waiting duration

Do not falsely imply that every clock is mutually exclusive.

--------------------------------------------------
M30 — SLA CLOCK VISUALIZATION
--------------------------------------------------

Create a visual timeline for a selected application.

Example:

SUBMITTED
│
├── MIDC processing
│
├── Entrepreneur response
│
├── MIDC processing
│
├── Inspection waiting
│
├── MIDC processing
│
└── Current desk

Use the same timeline language as M08.

This creates continuity between:

M08 Application Timeline
and
M30 SLA Dashboard.

Clicking a segment opens the relevant application timeline.

--------------------------------------------------
M30 — SLA TABLE
--------------------------------------------------

Create the main operational table.

Columns:

Application ID
Business
MIDC Service
Current Application State
Current Desk
Office / Region
Received Date
Configured SLA
Elapsed Time
MIDC Processing
Entrepreneur Response
Inspection Wait
External Dependency Wait
SLA Status
Due / Breach Date
Action

Example row:

MIDC-APP-2026-00421
Aster BioManufacturing Pvt. Ltd.
Building / Planning
TECHNICAL_SCRUTINY
Planning Desk
Pune Region
12 Sep 2026
Configured SLA
4d 8h
2d 5h
1d 2h
8h
0h
Approaching Deadline

Do not use a composite score.

--------------------------------------------------
M30 — FILTERS
--------------------------------------------------

Provide filters for:

Service
Desk
Office / Region
Application State
Project Stage
SLA Status
Age
Received Date
Due Date
Inspection Status
Dependency State

SLA-specific filters:

Normal
Approaching Deadline
SLA Exceeded

Operational filters:

Awaiting Entrepreneur
Awaiting Inspection
Awaiting External Dependency
Currently with MIDC

--------------------------------------------------
M30 — VIEWS
--------------------------------------------------

Provide view switching:

SERVICE
DESK
OFFICE / REGION
APPLICATION AGE
SLA RISK
BREACHED

These are different analytical perspectives over the same underlying SLA records.

--------------------------------------------------
SERVICE VIEW
--------------------------------------------------

Show:

MIDC Service
Applications
Normal
Approaching Deadline
Exceeded
Average elapsed time
Average MIDC processing time
Average entrepreneur response time
Inspection waiting
External dependency waiting

Do not rank officers by “performance score.”

The purpose is operational understanding.

--------------------------------------------------
DESK VIEW
--------------------------------------------------

Show:

Desk
Current queue
Normal
Approaching Deadline
Exceeded
Average current-desk time
Oldest application
Inspection waiting
External dependency waiting

Use this to identify queues requiring operational attention.

Do not automatically imply officer fault.

--------------------------------------------------
OFFICE / REGION VIEW
--------------------------------------------------

Show:

Office / Region
Active applications
Approaching deadline
Exceeded
Average processing duration
Inspection wait
Dependency wait

Keep the geography based on configured organisational data.

Do not invent official MIDC jurisdiction structures.

--------------------------------------------------
AGE VIEW
--------------------------------------------------

Create an application-age distribution.

Example buckets may be:

0–2 days
3–5 days
6–10 days
11+ days

IMPORTANT:

These are prototype display buckets only.

Do not label them as statutory categories.

If configured service-specific age bands exist, use those instead.

--------------------------------------------------
SLA RISK VIEW
--------------------------------------------------

Use the operational phrase:

SLA Status

rather than creating an opaque risk score.

Show:

Normal
Approaching Deadline
SLA Exceeded

For each application, show the actual reason:

Example:

Approaching Deadline

Reason:
Configured SLA due in 8 hours

or:

SLA Exceeded

Reason:
Configured SLA exceeded by 1d 4h

Do not say:

“AI predicts breach.”

--------------------------------------------------
M30 — APPLICATION DETAIL DRAWER
--------------------------------------------------

Clicking an SLA row opens a right-side drawer.

Show:

Application ID
Business
Service
Current state
Current desk
Office
Configured SLA
SLA due date
Elapsed time
MIDC processing time
Entrepreneur response time
Current desk time
Inspection wait
External dependency wait
SLA status

Then:

Timeline

Then:

Current blocking/waiting reason

Then:

Links:

Open Application
Open Timeline
Open Query History
Open Inspection
Open Dependency
Open Grievance
Open Audit

--------------------------------------------------
M30 — SLA PAUSE / WAITING LOGIC
--------------------------------------------------

Create a clear representation for time spent waiting on external actors.

Possible waiting states:

Awaiting Entrepreneur
Awaiting Inspection
Awaiting External Dependency
Awaiting Internal Desk Action

Do not silently classify every delay as “MIDC delay.”

The dashboard must distinguish who or what currently owns the waiting state.

If the workflow configuration supports SLA pause rules, display:

SLA Clock:
Running

or:

SLA Clock:
Paused — Awaiting Entrepreneur

or:

SLA Clock:
Paused — Configured External Dependency

Do not invent pause rules if they are not configured.

--------------------------------------------------
M30 — SLA EDGE STATES
--------------------------------------------------

STATE 1:
No SLA configured

Show:

“No configured SLA for this service/application.”

STATE 2:
No applications currently at risk

Show:

“No applications are currently approaching or exceeding configured SLA.”

STATE 3:
SLA exceeded

Show actual elapsed and configured threshold.

STATE 4:
Awaiting entrepreneur

Show:

“Entrepreneur response time is currently being tracked.”

STATE 5:
Awaiting external dependency

Show the dependency name and link to M17.

STATE 6:
Inspection waiting

Link to M21/M22.

--------------------------------------------------
M30 — ACTIONS
--------------------------------------------------

Allowed actions:

Open Application
Open Timeline
Open Query
Open Inspection
Open Dependency
Open Grievance
Open Audit

Optional configured operational action:

Escalate

This opens M31.

Do not allow M30 to automatically reject or approve applications because of SLA breach.

SLA breach is an operational condition, not a statutory decision outcome.

--------------------------------------------------
M31 — ESCALATION / GRIEVANCE
--------------------------------------------------

PURPOSE

Create M31 as the structured escalation and grievance workspace.

The key principle:

A grievance should not make the officer or entrepreneur reconstruct what happened.

If the grievance concerns an application, the system should automatically attach relevant application and workflow evidence.

The flow is:

PROBLEM
↓
APPLICATION-LINKED GRIEVANCE
↓
RELEVANT ROLE / NODAL LEVEL
↓
ESCALATION
↓
RESOLUTION
↓
JOURNEY STATUS UPDATE

--------------------------------------------------
M31 — PAGE HEADER
--------------------------------------------------

Breadcrumb:

Department Home
→ Grievances
→ Escalation / Grievance

Page title:

Escalation / Grievance

Subtitle:

“Review application-linked grievances, escalation history, responsibility, and resolution.”

Top controls:

Search grievance
Filter
Status
Reason
Role / Nodal level
Application
Date

--------------------------------------------------
M31 — GRIEVANCE REASONS
--------------------------------------------------

Use the configured categories:

SLA Breach
Unresolved Query
Department Delay
Incorrect Status
Inspection Delay
Other

Do not create unsupported legal grievance categories.

--------------------------------------------------
M31 — GRIEVANCE QUEUE
--------------------------------------------------

Create a table.

Columns:

Grievance ID
Application ID
Business
MIDC Service
Reason
Current Application State
Current Desk
Assigned Role / Nodal Level
Created Date
SLA Status
Escalation Level
Current Grievance Status
Last Updated
Action

Possible grievance workflow statuses:

Open
Under Review
Assigned
Escalated
Awaiting Response
Resolution Proposed
Resolved
Closed

These are GRIEVANCE WORKFLOW STATUSES.

They do not replace the canonical application state.

--------------------------------------------------
M31 — APPLICATION-LINKED GRIEVANCE
--------------------------------------------------

When a grievance is created against an application, automatically attach:

Application ID
Business ID
Project ID
MIDC Service
Current Application State
Current Desk
Office / Region
Submission Date
Configured SLA
SLA status
Query history
Entrepreneur response time
MIDC processing time
Inspection history
Inspection status
Dependency state
Previous escalation history
Relevant notifications
Decision state if applicable

The officer should see an evidence summary before handling the grievance.

Do not require manual re-entry of information already stored in EKATMA.

--------------------------------------------------
M31 — GRIEVANCE DETAIL
--------------------------------------------------

Create a full detail workspace.

Top:

Grievance ID
Application ID
Reason
Current status
Priority / urgency only if configured
Assigned role
Created date
Last updated

Then a two-column layout.

LEFT:

Problem / Complaint

Show:

Original problem
Submitted by
Submitted date
Related application
Related service
Supporting evidence

RIGHT:

Workflow Context

Show:

Application state
Current desk
SLA
Query status
Inspection
Dependency
Previous escalation

--------------------------------------------------
M31 — AUTOMATIC EVIDENCE TIMELINE
--------------------------------------------------

Create:

Application Evidence Timeline

Example:

12 Sep
Application Submitted

14 Sep
Document Scrutiny Started

16 Sep
Query Raised

18 Sep
Entrepreneur Response

19 Sep
Resubmission

20 Sep
Inspection Scheduled

22 Sep
SLA Threshold Approaching

23 Sep
Grievance Created

Every event should link to its source record.

Do not create duplicate history.

This timeline should reuse the application's actual audit/workflow history.

--------------------------------------------------
M31 — ESCALATION ROUTING
--------------------------------------------------

Create a section:

Escalation Routing

Show:

Current Responsible Desk
Current Responsible Role
Relevant Nodal Level
Escalation Level
Assigned Officer / Team
Assignment Date
Response Due
Escalation Reason

Use configured routing.

Do not hard-code an official hierarchy that is not defined in the system configuration.

The system may display:

“Configured Nodal Level”

where a real level is not yet configured.

--------------------------------------------------
M31 — ESCALATION PATH
--------------------------------------------------

Visualize:

Problem
↓
Application-linked Grievance
↓
Relevant Role / Nodal Level
↓
Escalation
↓
Resolution
↓
Journey Status Update

Each step should show:

Date
Actor
Role
Action
Comment
Status

--------------------------------------------------
M31 — RESOLUTION WORKSPACE
--------------------------------------------------

Create:

Resolution

Fields:

Resolution type
Resolution explanation
Action taken
Related application action
Related query if applicable
Related inspection if applicable
Related dependency if applicable
Supporting evidence
Resolved by
Resolution date

Primary action:

Record Resolution

Secondary:

Escalate Further

If unresolved:

Keep grievance open.

Do not force closure simply because an officer entered a response.

--------------------------------------------------
M31 — JOURNEY STATUS UPDATE
--------------------------------------------------

After resolution, show:

Application / Journey Impact

Possible configured outcomes:

No application change
Application status updated
Query resolved
Inspection status updated
SLA context updated
Dependency state updated
Decision workflow resumed

The system should clearly show:

“Grievance resolution changed the following journey information.”

Do not automatically change application state unless a configured workflow action actually performs that change.

--------------------------------------------------
M31 — GRIEVANCE ↔ NOTIFICATION
--------------------------------------------------

When configured, grievance events should generate M39 notifications.

Examples:

New grievance assigned
Escalation received
Response requested
Resolution recorded
Grievance reopened

Notification should link directly to the grievance.

--------------------------------------------------
M31 — SLA BREACH RELATIONSHIP
--------------------------------------------------

If grievance reason is:

SLA Breach

automatically show:

Configured SLA
Actual elapsed time
SLA exceeded by
Time breakdown
Current responsible desk
Waiting-state breakdown

Do not automatically conclude fault.

Show factual workflow information.

--------------------------------------------------
M31 — INSPECTION DELAY RELATIONSHIP
--------------------------------------------------

If grievance reason is:

Inspection Delay

show:

Inspection ID
Inspection type
Required date if configured
Scheduled date
Current status
Assigned inspector/team
Re-inspection status
Waiting duration

Link to:

M21
M22
M23
M24

Do not alter inspection status from the grievance screen unless an explicit configured action exists.

--------------------------------------------------
M31 — QUERY RELATIONSHIP
--------------------------------------------------

If grievance reason is:

Unresolved Query

show:

Query ID
Query version
Deficiency
Date raised
Entrepreneur response
Response date
Current query status
Current responsible desk

Link to:

M18 Consolidated Query Builder
M19 Query / Response History

--------------------------------------------------
M31 — EDGE STATES
--------------------------------------------------

No grievance:

“No active grievances for this application.”

External dependency issue:

“This grievance concerns an external dependency. MIDC can track the dependency context but cannot determine the external department's decision.”

Resolved:

Show complete resolution timeline.

Reopened:

Preserve previous resolution and show new grievance activity.

Multiple escalations:

Show each escalation separately with version/history.

--------------------------------------------------
M39 — NOTIFICATIONS
--------------------------------------------------

IMPORTANT:

M39 is a notification centre, not a new global workflow module.

Do NOT add Notifications as a separate sidebar item if the existing 14-item sidebar is already established.

Use:

Top-right notification bell

and create:

Notification Drawer / Centre

The notification system should be accessible globally from the authenticated MIDC shell.

--------------------------------------------------
M39 — NOTIFICATION TYPES
--------------------------------------------------

Support these configured notification categories:

1. New Application
2. Query Response
3. Resubmission
4. Inspection Due
5. Inspection Reschedule
6. SLA Risk / Breach
7. Dependency Unlock
8. Regulatory Change
9. Grievance
10. Decision Pending
11. Entrepreneur Business Profile Change Impacting MIDC Service

Do not generate notifications for events that have not actually occurred.

--------------------------------------------------
M39 — NOTIFICATION CARD
--------------------------------------------------

Every notification must answer four questions:

WHAT?
WHY?
WHAT ACTION?
WHEN?

Use a consistent card structure.

Example:

WHAT?

Application resubmitted

WHY?

The entrepreneur submitted a revised application after responding to a consolidated deficiency.

WHAT ACTION?

Review the changed fields and begin delta re-scrutiny.

WHEN?

10 minutes ago

Then show:

Application ID
Business
Service
Current Desk

CTA:

Open Application

--------------------------------------------------
M39 — NEW APPLICATION
--------------------------------------------------

Example:

WHAT:
New MIDC application received.

WHY:
Application MIDC-APP-2026-00421 has been submitted.

ACTION:
Open application and begin configured pre-check.

WHEN:
Today, 10:32 AM

CTA:
Open Application

--------------------------------------------------
M39 — QUERY RESPONSE
--------------------------------------------------

WHAT:
Entrepreneur responded to a query.

WHY:
Response received for Query QRY-2026-0048.

ACTION:
Review response and supporting evidence.

WHEN:
Today, 11:14 AM

CTA:
Review Response

Link:
M19

--------------------------------------------------
M39 — RESUBMISSION
--------------------------------------------------

WHAT:
Application resubmitted.

WHY:
Entrepreneur corrected the deficiencies raised in the previous review.

ACTION:
Review changed fields and affected requirements.

WHEN:
Today, 2:06 PM

CTA:
Open Delta Re-scrutiny

Link:
M20

--------------------------------------------------
M39 — INSPECTION DUE
--------------------------------------------------

WHAT:
Inspection requires scheduling/action.

WHY:
A configured inspection requirement is pending for the application.

ACTION:
Open inspection queue and review planning requirements.

WHEN:
Today

CTA:
Open Inspection

Link:
M21/M22

--------------------------------------------------
M39 — INSPECTION RESCHEDULE
--------------------------------------------------

WHAT:
Inspection schedule changed.

WHY:
The configured inspection appointment was rescheduled.

ACTION:
Review the new schedule and notify/coordinate as configured.

WHEN:
Today, 9:20 AM

CTA:
Open Inspection

Link:
M22

--------------------------------------------------
M39 — SLA RISK / BREACH
--------------------------------------------------

WHAT:
Application is approaching / has exceeded configured SLA.

WHY:
The configured SLA threshold has been reached or exceeded.

ACTION:
Review the time breakdown and current responsible desk.

WHEN:
Today

CTA:
Open SLA

Link:
M30

Do not say:

“AI predicts this will fail.”

--------------------------------------------------
M39 — DEPENDENCY UNLOCK
--------------------------------------------------

WHAT:
A configured regulatory dependency is now available/unlocked.

WHY:
The dependency state changed in the regulatory journey.

ACTION:
Review the affected application or dependency node.

WHEN:
Today

CTA:
Open Dependency

Link:
M17 or M27

IMPORTANT:

Use language such as:

“Dependency availability updated”

not:

“Fire approval granted”

unless an actual external department decision has been recorded and is legitimately visible.

MIDC must not claim another department has approved something when it has only become available in the dependency graph.

--------------------------------------------------
M39 — REGULATORY CHANGE
--------------------------------------------------

WHAT:
A regulatory reference or configured rule version has changed.

WHY:
A published regulatory change has been linked to one or more relevant MIDC services/applications.

ACTION:
Review regulatory change and affected records.

WHEN:
Today

CTA:
Review Change

Link:
M33/M34

Do not notify officers about speculative AI-detected legal changes as though they were confirmed.

--------------------------------------------------
M39 — GRIEVANCE
--------------------------------------------------

WHAT:
A grievance requires your attention.

WHY:
A grievance has been assigned/escalated to your configured role.

ACTION:
Review grievance and application evidence.

WHEN:
Today

CTA:
Open Grievance

Link:
M31

--------------------------------------------------
M39 — DECISION PENDING
--------------------------------------------------

WHAT:
Application is awaiting final decision.

WHY:
Configured scrutiny and decision prerequisites have reached the decision workflow.

ACTION:
Open Decision Workspace.

WHEN:
Today

CTA:
Open Decision

Link:
M25

Do not say:

“Application should be approved.”

--------------------------------------------------
M39 — ENTREPRENEUR PROFILE CHANGE
--------------------------------------------------

WHAT:
Entrepreneur Business DNA changed.

WHY:
A new Business DNA version may affect an existing MIDC service.

ACTION:
Review the proposed/current comparison and impact analysis.

WHEN:
Today

CTA:
Review Change

Link:
M29

This notification should be generated only when the Business DNA change actually affects the relevant MIDC journey according to configured rules or requires officer review.

--------------------------------------------------
M39 — NOTIFICATION DRAWER
--------------------------------------------------

Create a top-right notification drawer.

Header:

Notifications

Controls:

All
Unread
Applications
Scrutiny
Inspections
SLA
Grievances
Regulatory
Business Changes

Each notification should have:

Icon/category
Title
WHAT
WHY
ACTION
WHEN
Read/unread state
Application ID if applicable
CTA

Use compact cards rather than huge dashboard tiles.

--------------------------------------------------
M39 — UNREAD STATE
--------------------------------------------------

Show:

Unread count on bell icon.

Unread notifications should have a subtle visual distinction.

Do not use excessive red alerts.

Reserve strong visual emphasis for genuinely urgent configured events such as:

SLA exceeded
Inspection due
Escalation assigned
Decision pending

Normal workflow events should remain visually calm.

--------------------------------------------------
M39 — NOTIFICATION DETAIL
--------------------------------------------------

Clicking a notification should open either:

1. the relevant application workspace,
2. relevant queue,
3. relevant grievance,
4. relevant regulatory change,
5. relevant dependency,
6. relevant Business DNA change.

Do not create a completely separate workflow inside Notifications.

Notifications are entry points into existing workflows.

--------------------------------------------------
M39 — READ / UNREAD
--------------------------------------------------

Support:

Mark as read
Mark all as read

Preserve notification history.

If the system has configurable notification preferences, expose them only where appropriate to the authenticated user's role.

Do not create unnecessary settings screens for the prototype.

--------------------------------------------------
M39 — NOTIFICATION AUDIT
--------------------------------------------------

For important notifications, preserve:

Notification ID
Event source
Created time
Recipient role/user
Read time
Linked Application ID
Linked record
Event version

This connects to M38 Audit / History.

Do not treat the notification itself as the source of truth.

The underlying application, decision, inspection, dependency, grievance, or regulatory record remains authoritative.

--------------------------------------------------
GLOBAL CROSS-SCREEN RELATIONSHIPS
--------------------------------------------------

Ensure the following links work:

M30 SLA
→ M03 Queue
→ M06 Application Overview
→ M08 Timeline
→ M21 Inspection Queue
→ M17 Dependency
→ M31 Grievance
→ M38 Audit

M31 Grievance
→ M06 Application
→ M08 Timeline
→ M18 Query
→ M19 Query History
→ M21–M24 Inspection
→ M30 SLA
→ M17 Dependency
→ M38 Audit
→ M39 Notifications

M39 Notifications
→ relevant underlying workflow screen

Examples:

New Application
→ M03 / M06

Query Response
→ M19

Resubmission
→ M20

Inspection Due
→ M21 / M22

Inspection Reschedule
→ M22

SLA Risk
→ M30

Dependency Unlock
→ M17 / M27

Regulatory Change
→ M33 / M34

Grievance
→ M31

Decision Pending
→ M25

Business DNA Change
→ M29

--------------------------------------------------
GLOBAL APPLICATION CONTEXT
--------------------------------------------------

When navigating from an application-related notification or SLA/grievance record, preserve:

Application ID
Business ID
Project ID
MIDC Service
Business DNA Version
Application State
Current Desk
SLA Status
Query Version
Inspection ID if applicable
Dependency State
Decision State if applicable

Do not lose application context when moving between M30/M31/M39 and the application workspace.

--------------------------------------------------
GLOBAL PROVENANCE
--------------------------------------------------

Every SLA, grievance, and notification must be traceable to an underlying record.

Examples:

SLA:
Configured SLA + Application Timeline

Grievance:
Application + workflow history + submitted complaint

Inspection Delay:
Inspection record

Dependency Unlock:
Dependency graph state

Regulatory Change:
Published regulatory reference / configured rule version

Business DNA Change:
Business DNA version comparison

Do not make notifications or dashboards the source of truth.

--------------------------------------------------
GLOBAL AI BOUNDARY
--------------------------------------------------

AI may help summarize:

- SLA timeline
- grievance history
- regulatory change
- application history
- notification context

AI must NOT:

- approve
- reject
- assign statutory liability
- invent an SLA
- invent a grievance outcome
- invent a regulatory requirement
- declare another department's approval
- override officer decisions
- automatically close a grievance
- automatically change the canonical application state

Use source-backed explanations.

--------------------------------------------------
GLOBAL EDGE CASES
--------------------------------------------------

Create prototype states for:

1. No SLA configured
2. SLA exceeded
3. SLA paused / waiting if configured
4. No active grievances
5. Escalation assigned
6. Grievance resolved
7. Grievance reopened
8. Multiple simultaneous notifications
9. Notification linked to an application that has changed state since notification creation
10. External dependency unavailable
11. Business DNA changed after notification generation
12. Notification event already resolved
13. Regulatory change affects multiple applications
14. Inspection rescheduled multiple times
15. Application has multiple active workflow clocks

For stale notifications, show the current underlying state.

Example:

Notification:
“Decision pending”

Current application:
Decision already recorded

Display:

“Decision recorded since this notification was generated.”

Do not perform an action based on stale notification text.

--------------------------------------------------
FINAL UX PRINCIPLE
--------------------------------------------------

M30 answers:

“WHERE IS TIME GOING?”

M31 answers:

“WHAT PROBLEM NEEDS ESCALATION AND WHAT HAPPENED?”

M39 answers:

“WHAT JUST HAPPENED THAT REQUIRES MY ATTENTION?”

Keep those three questions visually and functionally distinct.

The screens should feel like one operational MIDC system, not three separate dashboards.