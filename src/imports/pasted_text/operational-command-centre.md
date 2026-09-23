Create M02 — MIDC Department Home / Operational Command Centre.

IMPORTANT:
Continue from the existing EKATMA Figma file and preserve all previously created screens and components.

Do NOT redesign Phase 0.
Do NOT create a new visual system.
Do NOT create a consumer-style dashboard.
Do NOT turn this into an entrepreneur dashboard.

This is the authenticated operational home screen for a MIDC department officer.

The purpose of M02 is to give the officer an immediate operational picture of:

1. What needs my attention?
2. What applications are approaching or exceeding SLA?
3. What inspections require action?
4. Where are current process bottlenecks?
5. What is the current workload?
6. What types of MIDC services are currently moving through the department?

The dashboard should help an officer decide where to go next, not replace the detailed queue, scrutiny, inspection, or analytics screens.

--------------------------------------------------
1. AUTHENTICATED OFFICER CONTEXT
--------------------------------------------------

At the top of the page, preserve the authenticated MIDC officer shell created in M01.

Display:

- Department: MIDC
- Assigned Region / Office
- Assigned Desk
- Role
- Officer name / account context
- Global application search
- Notifications
- Regulatory Assistant
- User profile

IMPORTANT:

The officer's assigned desk is OFFICER CONTEXT.

Do NOT confuse this with the current desk of an application.

For example:

Officer Context:
Department = MIDC
Office = Thane Regional Office
Assigned Desk = Land / Plot Scrutiny
Role = Technical Officer

Application Context:
Current Desk = Planning / Building Scrutiny

These must remain separate concepts.

Do not provide Department / Office / Desk / Role selectors.

These values were loaded automatically after authentication.

--------------------------------------------------
2. DASHBOARD HEADER
--------------------------------------------------

Create a clear page header:

MIDC Department Home

Subtitle:

Operational Command Centre

Below the title, show a compact contextual line:

Department: MIDC
Office: [Assigned Office]
Desk: [Assigned Desk]
Role: [Assigned Role]

Also show:

Last refreshed: [timestamp]

Use realistic prototype data.

Do not imply that prototype numbers are real current MIDC statistics.

If necessary, label the dashboard:

“Prototype operational data”

--------------------------------------------------
3. PRIMARY KPI STRIP
--------------------------------------------------

Create a horizontal KPI section containing the following MIDC-context metrics:

1. New Applications
2. Awaiting Scrutiny
3. Awaiting Entrepreneur Response
4. Resubmissions Received
5. Inspection Required
6. Decision Pending
7. SLA Risk
8. SLA Breached
9. Escalated

Each KPI must include:

- Metric name
- Current count
- Small contextual comparison where useful
- Appropriate status indicator
- Clickable / drill-down affordance

Do not use arbitrary completion percentages.

Prefer concrete operational counts and states.

Example:

NEW APPLICATIONS
24
+6 since yesterday

AWAITING SCRUTINY
17
5 approaching SLA

AWAITING ENTREPRENEUR RESPONSE
11
Median response: 2.1 days

RESUBMISSIONS RECEIVED
8
3 received today

INSPECTION REQUIRED
9
4 need scheduling

DECISION PENDING
6
2 approaching SLA

SLA RISK
7
3 due within 24h

SLA BREACHED
2
Requires escalation review

ESCALATED
3
1 new today

These are prototype examples only.

Do not present them as actual MIDC statistics.

--------------------------------------------------
4. KPI DRILL-DOWN BEHAVIOUR
--------------------------------------------------

Every KPI must be actionable.

Clicking a KPI should open the relevant queue, search, or analytics context.

Examples:

New Applications
→ M03 Queue / Inbox
→ filtered to New

Awaiting Scrutiny
→ M03 Queue
→ filtered to In Scrutiny / Awaiting Scrutiny

Awaiting Entrepreneur Response
→ M03 Queue
→ filtered to Awaiting Entrepreneur Response

Resubmissions Received
→ M03 Queue
→ filtered to Resubmission

Inspection Required
→ M21 Inspection Queue

Decision Pending
→ M03 Queue
→ filtered to Decision Pending

SLA Risk
→ M30 SLA Dashboard or filtered operational queue

SLA Breached
→ M30 SLA Dashboard / Escalation context

Escalated
→ M31 Escalation / Grievance

Do not create new screens for these drill-downs.

Reuse existing M03, M21, M30 and M31 patterns.

--------------------------------------------------
5. PRIMARY DASHBOARD GRID
--------------------------------------------------

Below the KPI strip, create a structured dashboard grid.

Use six major operational panels:

A. MY ACTIONS
B. SLA RISK
C. INSPECTION QUEUE
D. CURRENT BOTTLENECKS
E. WORKLOAD
F. SERVICE MIX

The layout should prioritize operational action over decorative visualization.

--------------------------------------------------
6. PANEL A — MY ACTIONS
--------------------------------------------------

Create a prominent “My Actions” panel.

Purpose:

Show work that requires action from the currently authenticated officer.

Include:

- Applications waiting for review
- Queries to finalise
- Resubmissions received
- Inspections to schedule
- Decisions pending

Each row should contain:

- Item type
- Application ID
- Business / Project
- MIDC service
- Current state
- Age / time since received
- SLA indicator
- Action

Example:

APPLICATION REVIEW
APP-MIDC-2048
Aarav Precision Components
Land / Plot
Awaiting scrutiny
2 days
Normal
Review

QUERY TO FINISH
APP-MIDC-2019
Nova Industrial Systems
Planning / Building
Draft query
4 days
SLA risk
Finalise

RESUBMISSION
APP-MIDC-1987
Kinetic Engineering Works
Water / Utility
Resubmitted
1 day
Normal
Review

INSPECTION TO SCHEDULE
APP-MIDC-2031
Vertex Manufacturing
Planning / Building
Inspection required
3 days
Approaching SLA
Schedule

DECISION PENDING
APP-MIDC-1964
Maharashtra Components Pvt Ltd
Land / Plot
Final review complete
1 day
Decision due
Open

Use compact rows rather than oversized cards.

Add:

View My Queue →

This should open M03 filtered to the current officer's actionable scope.

IMPORTANT:

“My Actions” must represent actions available to the logged-in officer based on permissions.

Do not show actions the officer is not authorised to perform.

--------------------------------------------------
7. PANEL B — SLA RISK
--------------------------------------------------

Create an “SLA Risk” panel.

Purpose:

Quickly identify applications requiring attention because of approaching or exceeded SLA.

Table columns:

- Application
- Business
- Service
- Current Desk
- Days Elapsed
- SLA
- Time Remaining
- State
- Action

Example:

APP-MIDC-2048
Aarav Precision Components
Land / Plot
Land / Plot Scrutiny
4 days
5 days
1 day remaining
Approaching

APP-MIDC-1987
Kinetic Engineering Works
Building / Planning
Planning Desk
6 days
5 days
1 day overdue
Breached

IMPORTANT:

Show SLA using the application's actual processing context.

Do not automatically treat all elapsed calendar time as MIDC processing time.

Where useful, distinguish:

- MIDC processing time
- Entrepreneur response time
- Inspection waiting
- External dependency waiting
- Total elapsed

Use concise visual indicators for:

Normal
Approaching deadline
SLA exceeded

Do not invent statutory SLA values.

Use prototype/sample SLA values only where necessary for the Figma demonstration.

Add:

View SLA Dashboard →

→ M30

--------------------------------------------------
8. PANEL C — INSPECTION QUEUE
--------------------------------------------------

Create an “Inspection Queue” panel.

Purpose:

Give the officer a quick operational view of inspections requiring attention.

Divide the panel into:

UPCOMING
OVERDUE
RE-INSPECTION

For each item show:

- Application
- Business
- MIDC service
- Site / estate / plot
- Inspection type
- Target date
- Assigned inspector/team
- SLA impact
- Status

Example:

UPCOMING
APP-MIDC-2031
Vertex Manufacturing
Planning / Building
Taloja MIDC / Plot A-24
Site inspection
18 Sep
Assigned
Normal

OVERDUE
APP-MIDC-1974
Nova Industrial Systems
Land / Plot
Plot B-17
Verification inspection
16 Sep
Unassigned
SLA risk

RE-INSPECTION
APP-MIDC-1918
Aarav Components
Building / Planning
Plot C-08
Re-inspection
20 Sep
Assigned
Pending correction

Actions:

Open Inspection Queue
Schedule Inspection
Open Inspection

Do not imply that every inspection can automatically be combined with Fire, DISH, or other departments.

Common inspection coordination is conditional and should only be shown when configured.

View All Inspections →

→ M21

--------------------------------------------------
9. PANEL D — CURRENT BOTTLENECKS
--------------------------------------------------

Create a “Current Bottlenecks” panel.

Purpose:

Surface process friction that appears in current operational data.

This is NOT a permanent statement about MIDC performance.

Do not label anything:

“Known MIDC bottleneck”

“Permanent MIDC problem”

or similar.

Instead use:

“Current Process Insights”

or:

“Current Bottlenecks — Based on Operational Data”

Potential prototype examples:

1. Land / Plot Document Issues
12 applications affected

2. Planning-document Corrections
8 applications affected

3. Inspection Scheduling
6 applications awaiting scheduling

4. Repeated Missing Evidence
5 applications with repeated deficiency cycles

Each insight should show:

- Issue category
- Number of affected applications
- Current queue impact
- Trend where meaningful
- Time period
- Drill-down

Example:

LAND / PLOT DOCUMENT ISSUE

12 applications

+3 vs previous period

Most affected service:
Land / Plot

[View affected applications]

IMPORTANT:

These are sample current insights for the prototype.

The UI must make it clear that they are generated from current process data and can change over time.

Do not hard-code them as permanent truths.

Add:

View Bottleneck Analytics →

→ M36

--------------------------------------------------
10. PANEL E — WORKLOAD
--------------------------------------------------

Create a compact “Workload” panel.

Purpose:

Show where current work is concentrated.

Break workload down by:

- Service
- Desk
- Office
- Application age

Possible visualization:

Service:
Land / Plot             28
Building / Planning     19
Water / Utility         11
Amendment                7
Other                    5

Or use a compact stacked/list visualization.

Also show application-age buckets:

0–2 days
3–5 days
6–10 days
10+ days

Where appropriate, show:

Total active applications
Average age
SLA-risk count
SLA-breached count

IMPORTANT:

Do not turn M02 into the full workload analytics page.

M02 should provide a concise operational snapshot.

Detailed workload/capacity analysis belongs to M37.

Add:

View Workload & Capacity →

→ M37

Respect permission scope.

An officer should only see workload data they are authorised to see.

Do not expose department-wide or office-wide information to users without the relevant permission.

--------------------------------------------------
11. PANEL F — SERVICE MIX
--------------------------------------------------

Create a “Service Mix” panel.

Purpose:

Show what types of MIDC services are currently moving through the department.

Use configurable service categories such as:

- Land / Plot
- Building / Planning
- Water / Utility
- Drainage / Infrastructure
- Construction / Follow-up
- Amendment / Modification
- Other configured MIDC services

Show:

- Active applications
- New applications
- In scrutiny
- Query
- Resubmission
- Inspection
- Decision pending

Example:

LAND / PLOT
28 active
6 new
9 scrutiny
4 query
3 inspection
2 decision pending

BUILDING / PLANNING
19 active
4 new
7 scrutiny
3 query
2 inspection
3 decision pending

WATER / UTILITY
11 active
2 new
5 scrutiny
2 query
1 inspection
1 decision pending

IMPORTANT:

These are configurable service groups.

Do not imply that this is an exhaustive or legally fixed MIDC service taxonomy.

The underlying service catalogue should remain configurable.

Add:

View Service Queues →

→ M05 / M03

--------------------------------------------------
12. OPERATIONAL FILTERS
--------------------------------------------------

Provide lightweight dashboard filters.

Useful filters:

- Time period
- Office / region
- Service
- Desk
- Application state
- SLA state
- Project stage

IMPORTANT:

Respect officer permissions.

If the officer is restricted to a particular office or desk, do not allow the UI to imply access to broader data.

Use the existing officer context to determine the default scope.

Provide:

Reset Filters

Last Updated

--------------------------------------------------
13. APPLICATION STATE VOCABULARY
--------------------------------------------------

Use the canonical application states from the EKATMA system:

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

Do not create a conflicting status vocabulary.

Operational labels such as:

Awaiting Entrepreneur Response
SLA Risk
Decision Pending

may be displayed as queue/action overlays, but should not replace the underlying canonical application state.

--------------------------------------------------
14. BUSINESS DNA CONTEXT
--------------------------------------------------

M02 should not reproduce the complete Business DNA.

The detailed Business DNA belongs to M07.

However, dashboard items should use the same underlying Business DNA and regulatory context.

For example, service and project information may include:

- Project type
- Project classification
- Project stage
- District / location
- MIDC estate
- Plot
- Relevant service
- Existing application context

Do not ask officers to reconstruct this information manually.

The Entrepreneur Adaptive Business Profile is the source context.

--------------------------------------------------
15. ADAPTIVE PROFILE / REGULATORY LOGIC
--------------------------------------------------

Do not create dashboard alerts merely because a field does not exist.

Respect the adaptive profile states.

For example:

Boiler = NO
→ Boiler branch is NOT_APPLICABLE
→ do not create a missing-boiler alert.

Drainage = NOT_APPLICABLE
→ do not show “missing drainage information.”

MIDC = UNKNOWN
→ show Needs Verification where relevant.

MIDC = YES
→ show MIDC services only when the regulatory journey actually activates them.

The dashboard must not flatten every project into the same checklist.

--------------------------------------------------
16. OTHER-DEPARTMENT BOUNDARY
--------------------------------------------------

M02 may surface dependency-related information such as:

- MPCB dependency
- Fire dependency
- DISH dependency
- Boiler dependency
- Utility dependency
- sector-specific authority dependency

But MIDC officers must not receive decision controls for other departments.

Example:

MPCB CTE
Status: Pending
Department: MPCB
Impact: MIDC Building / Planning waiting for prerequisite

Action:

View Dependency

NOT:

Approve MPCB

Reject MPCB

Edit MPCB decision

The dashboard should communicate dependency state only.

--------------------------------------------------
17. REGULATORY ASSISTANT
--------------------------------------------------

Include access to the Regulatory Assistant from the authenticated shell.

Do not make the assistant the centre of the dashboard.

It may answer questions such as:

- Why is this application in my queue?
- Why is this application flagged for SLA risk?
- What caused this bottleneck insight?
- Which service queue does this application belong to?
- What regulatory dependency is blocking this application?

The assistant should retrieve/explain configured information.

It must not:

- approve applications
- reject applications
- make statutory decisions
- invent legal requirements
- override officer judgment

If the assistant gives regulatory information, provide source/rule references where available.

--------------------------------------------------
18. VISUAL HIERARCHY
--------------------------------------------------

Prioritise the page in this order:

1. Officer context
2. Immediate action / KPI state
3. SLA risk
4. Inspection work
5. Current bottlenecks
6. Workload
7. Service mix

Do not make every section visually equal.

The officer should be able to understand the most urgent operational work within a few seconds.

Use:

- dense but readable tables
- compact cards
- clear status chips
- restrained charts
- strong section hierarchy
- whitespace between functional groups
- accessible contrast
- consistent government design language

Avoid:

- giant decorative KPI cards
- excessive gradients
- neon colours
- glassmorphism
- unnecessary illustrations
- consumer-app dashboard patterns
- excessive animation

--------------------------------------------------
19. DRILL-DOWN MAP
--------------------------------------------------

Every dashboard component must have a clear destination.

Use this navigation map:

New Applications
→ M03 Queue
→ State = New

Awaiting Scrutiny
→ M03 Queue
→ Scrutiny state

Awaiting Entrepreneur Response
→ M03 Queue
→ Awaiting Entrepreneur Response

Resubmissions
→ M03 Queue
→ Resubmission

Inspection Required
→ M21 Inspection Queue

Decision Pending
→ M03 Queue
→ Decision Pending

SLA Risk
→ M30 SLA Dashboard
or filtered M03 queue

SLA Breached
→ M30 SLA Dashboard
+ M31 Escalation context

Escalated
→ M31 Escalation / Grievance

My Actions
→ M03 filtered to officer-actionable items

Bottlenecks
→ M36 Bottleneck Analytics

Workload
→ M37 Workload / Capacity

Service Mix
→ M05 Service / Queue Segmentation
or M03 filtered queue

Do not create dead-end cards.

--------------------------------------------------
20. SAMPLE DATA RULE
--------------------------------------------------

Use realistic prototype-safe sample data.

Use fictional:

- businesses
- applicants
- application IDs
- plot numbers
- service records
- dates
- counts

Do not imply that sample operational numbers are actual government statistics.

Clearly distinguish:

SYSTEM / MACHINE DATA
from

SAMPLE PROTOTYPE INSIGHT
from

OFFICER JUDGMENT

--------------------------------------------------
21. RESPONSIVE / FIGMA STRUCTURE
--------------------------------------------------

Create the dashboard using Auto Layout and reusable components.

Structure:

GLOBAL EKATMA HEADER
↓
OFFICER CONTEXT BAR
↓
PAGE HEADER
↓
KPI STRIP
↓
MAIN DASHBOARD GRID

Row 1:
MY ACTIONS | SLA RISK

Row 2:
INSPECTION QUEUE | CURRENT BOTTLENECKS

Row 3:
WORKLOAD | SERVICE MIX

Use responsive behaviour so the layout can collapse into a single-column operational view on narrower screens.

Maintain consistent:

- typography
- spacing
- buttons
- tables
- status primitives
- breadcrumbs
- sidebar
- accessibility patterns

from the existing EKATMA design system.

--------------------------------------------------
22. STATES TO DESIGN
--------------------------------------------------

Create the following dashboard states:

1. Default populated state
2. No urgent actions
3. High SLA-risk state
4. SLA-breached state
5. Multiple inspections pending
6. High workload state
7. Empty service queue
8. Filtered dashboard
9. Loading state
10. Data unavailable / delayed refresh
11. Permission-limited view

Do not create a separate visual language for each state.

Use the shared EKATMA status system.

--------------------------------------------------
23. FINAL INTEGRATION REQUIREMENTS
--------------------------------------------------

M02 must connect logically to:

M01 — MIDC Department Login
M03 — MIDC Queue / Inbox
M04 — MIDC Application Search
M05 — MIDC Service / Queue Segmentation
M06 — Application Overview
M21 — Inspection Queue
M30 — SLA Dashboard
M31 — Escalation / Grievance
M35 — Department Analytics
M36 — Bottleneck Analytics
M37 — Workload / Capacity
M39 — Notifications

Do not duplicate the functionality of these screens.

M02 is the operational command centre that surfaces the most important signals and routes the officer to the appropriate detailed workspace.

--------------------------------------------------
24. CORE DESIGN PRINCIPLE
--------------------------------------------------

The final screen should feel like:

“Tell me what needs my attention, why it matters, and take me directly to the right operational workspace.”

It should NOT feel like:

“Here are many government statistics.”

The dashboard is an action-oriented operational command centre.

Every number should answer:

What does this mean?
Why should I care?
What can I do next?
Where do I go to act on it?

Build M02 accordingly.