Create M05 — MIDC Service / Queue Segmentation.

IMPORTANT:
Continue from the existing EKATMA Figma file.

Do NOT redesign Phase 0.
Do NOT create a new visual language.
Do NOT create a separate MIDC dashboard system.

Reuse:

- Government of Maharashtra header
- EKATMA branding
- Existing sidebar
- Typography
- Colours
- Spacing system
- Table components
- Status primitives
- Buttons
- Breadcrumbs
- Officer context
- Accessibility behaviour
- Existing M03 queue components
- Existing M04 search components

M05 is a SERVICE AND ROUTING OVERVIEW.

It is not another application queue.

Its purpose is to make it immediately clear that:

MIDC
↓
contains multiple configurable service families
↓
each service has its own operational workload/state
↓
applications are routed according to configured routing rules
↓
each application eventually enters the appropriate service-specific workflow.

--------------------------------------------------
1. PAGE PURPOSE
--------------------------------------------------

Create:

M05 — MIDC Service / Queue Segmentation

Page title:

MIDC Services & Queue Segmentation

Subtitle:

Service-wise operational view and configurable routing context

The page must answer:

1. What MIDC service families are currently active?
2. How many applications are moving through each service?
3. What is the current state of each service queue?
4. Which services have SLA risk?
5. How are applications routed into these service queues?
6. What configured factors determine routing?

Do NOT make this page answer detailed application-level scrutiny questions.

Those belong to:

M06 Application Overview
M07 Business DNA
M09 Automated Pre-check
M10 Scrutiny Route
M11 Service-specific Scrutiny

--------------------------------------------------
2. IMPORTANT ARCHITECTURAL PRINCIPLE
--------------------------------------------------

MIDC is NOT one single approval queue.

The service architecture should visually communicate:

MIDC DEPARTMENT
        ↓
SERVICE CATALOGUE
        ↓
SERVICE-SPECIFIC APPLICATION
        ↓
COMMON OFFICER WORKSPACE
        ↓
CONFIGURABLE REVIEW PARAMETERS

Do not create a completely different dashboard for every service.

The same underlying queue, filter, status, routing and scrutiny components must be reusable across all configured MIDC services.

--------------------------------------------------
3. OFFICER CONTEXT
--------------------------------------------------

Reuse the authenticated officer shell from M01.

Display:

Department: MIDC
Region / Office: [assigned]
Desk: [assigned]
Role: [assigned]

Also retain:

- Global application search
- Notifications
- Regulatory Assistant
- User profile

Do not allow the officer to manually select:

- Department
- Office
- Region
- Role
- Permission

These are loaded from the authenticated officer account.

IMPORTANT:

Officer context and application routing context are separate.

Officer:

Assigned Office
Assigned Desk
Assigned Role

Application:

Current Office / Region
Current Desk
Current Workflow State

Do not assume they are identical.

--------------------------------------------------
4. SERVICE CATALOGUE
--------------------------------------------------

Create a primary service catalogue section.

Use configurable service groups such as:

1. Land / Plot
2. Building / Planning
3. Water / Utility
4. Drainage / Infrastructure
5. Construction / Follow-up
6. Amendment / Modification
7. Other Configured MIDC Services

IMPORTANT:

These are configurable service groups for the prototype.

Do NOT present them as an exhaustive official MIDC service taxonomy.

Do NOT invent additional statutory services merely to fill the screen.

Show:

Service Name
Description
Active Applications
New
Under Review
Query
Resubmission
Inspection
Decision Pending
SLA Risk

--------------------------------------------------
5. SERVICE GROUP CARDS / TABLE
--------------------------------------------------

Prefer a dense operational table or hybrid service catalogue rather than giant decorative cards.

Each service row should show:

SERVICE

Land / Plot

ACTIVE APPLICATIONS

28

NEW

6

UNDER REVIEW

9

QUERY

4

RESUBMISSION

3

INSPECTION

3

DECISION PENDING

2

SLA RISK

4

ACTION

View Queue →

Repeat for the configured services.

Example prototype data:

Land / Plot
28 active

Building / Planning
19 active

Water / Utility
11 active

Drainage / Infrastructure
7 active

Construction / Follow-up
9 active

Amendment / Modification
6 active

Other Configured Services
4 active

Clearly treat these as prototype-safe sample data.

Do not imply these are actual current MIDC statistics.

--------------------------------------------------
6. SERVICE STATUS BREAKDOWN
--------------------------------------------------

For each service group, display:

NEW
UNDER REVIEW
QUERY
RESUBMISSION
INSPECTION
DECISION PENDING
SLA RISK

Use the canonical application state model underneath the operational labels.

For example:

“Under Review”

may represent applications in:

DOCUMENT_SCRUTINY
INITIAL_SCRUTINY
TECHNICAL_SCRUTINY

Do not create contradictory underlying application states.

Similarly:

“Query”

may correspond to:

QUERY_RAISED

“Resubmission”

may correspond to:

RESUBMITTED

“Inspection”

may correspond to:

INSPECTION_PENDING
INSPECTION_SCHEDULED

“Decision Pending”

may correspond to:

FINAL_DECISION

The service dashboard is an operational aggregation layer.

--------------------------------------------------
7. SERVICE DRILL-DOWN
--------------------------------------------------

Every service group must be actionable.

Example:

Land / Plot
→ View Queue

opens:

M03 — MIDC Queue / Inbox

with:

Service = Land / Plot

already applied.

Example:

Building / Planning
→ View Queue

opens M03 filtered to:

Service = Building / Planning

Example:

Water / Utility
→ View Queue

opens M03 filtered to:

Service = Water / Utility

Do not create separate unrelated queue interfaces for each service.

Reuse M03.

--------------------------------------------------
8. SERVICE DETAIL DRAWER
--------------------------------------------------

When an officer selects a service, open a service detail drawer or compact detail view.

Example:

LAND / PLOT

Active applications:
28

New:
6

Under review:
9

Query:
4

Resubmission:
3

Inspection:
3

Decision pending:
2

SLA risk:
4

Also show:

Current routing context
Primary configured office/region
Current desk distribution
Scrutiny route distribution
Dependency summary

Actions:

View Queue
View Routing Context
Open Service Analytics

Where applicable:

Open M03
Open M35 Department Analytics

Do not create a new detailed service page unless necessary.

--------------------------------------------------
9. SERVICE FILTERS
--------------------------------------------------

Provide filters at the top of M05.

Filters:

- Service
- Office / Region
- Current Desk
- Project Stage
- Application State
- SLA State
- Scrutiny Route
- Dependency State

Allow combinations.

Example:

Service:
Building / Planning

+
Project Stage:
Construction

+
SLA:
Risk

Result:

Only matching applications contribute to the displayed service statistics.

Show active filters as removable chips.

Example:

Service: Building / Planning ×
Stage: Construction ×
SLA: Risk ×

Provide:

Clear All

--------------------------------------------------
10. SERVICE STATE SUMMARY
--------------------------------------------------

Add a compact overall MIDC service summary.

Example:

ACTIVE APPLICATIONS
84

NEW
14

UNDER REVIEW
31

QUERY
12

RESUBMISSION
8

INSPECTION
10

DECISION PENDING
9

SLA RISK
11

These numbers should be calculated from the visible permitted scope and selected filters.

Do not imply they are department-wide if the officer lacks department-wide access.

--------------------------------------------------
11. SERVICE MIX VISUALIZATION
--------------------------------------------------

Create a compact visual representation of service mix.

Possible design:

horizontal bars / segmented distribution / table.

Example:

Land / Plot             28
Building / Planning     19
Water / Utility         11
Construction / Follow-up 9
Drainage / Infrastructure 7
Amendment / Modification 6
Other                     4

Allow clicking a service.

Click:

Land / Plot

→ filter the service table
→ show service detail
→ optionally open M03 filtered queue

Do not use pie charts if they make the service comparison harder to read.

Prioritise operational readability.

--------------------------------------------------
12. ROUTING CONTEXT
--------------------------------------------------

Create a dedicated section:

Routing Context

Purpose:

Explain how an application gets routed into the appropriate MIDC service / queue.

Display the conceptual routing chain:

APPLICATION
↓
SERVICE
↓
OFFICE / REGION
↓
DESK
↓
ROLE

Do not present this as a fixed organisational hierarchy.

It is a configurable workflow routing model.

--------------------------------------------------
13. ROUTING RULES PANEL
--------------------------------------------------

Create an expandable information panel:

Routing Rules

Heading:

“What determines routing?”

Show the configured routing inputs:

1. Business location
2. MIDC estate / plot
3. Service
4. Project stage
5. Configured jurisdiction

Display:

These configured attributes determine the applicable routing context.

Do not imply that the officer manually chooses the routing destination.

Example:

Business location:
Thane

MIDC estate:
Taloja

Service:
Building / Planning

Project stage:
Construction

Configured jurisdiction:
[Configured jurisdiction]

Resulting routing context:

Office / Region:
[Configured]

Desk:
[Configured]

Role:
[Configured]

--------------------------------------------------
14. ROUTING EXPLANATION
--------------------------------------------------

Provide a “Why was this routed here?” interaction.

Example:

Why was APP-MIDC-2048 routed to this queue?

Show:

Business location:
Thane

MIDC estate:
Taloja

Service:
Building / Planning

Project stage:
Construction

Configured jurisdiction:
[Configured rule]

Routing result:
Planning / Building Scrutiny

Source:

Configured routing rule
Rule version: [version]

This should be explainable.

Do not simply display:

AI routed this application.

The routing result should be tied to configured system rules.

--------------------------------------------------
15. ROUTING RULE BOUNDARY
--------------------------------------------------

IMPORTANT:

Do not invent official MIDC organisational hierarchy.

Do not state:

“All Taloja applications go to Desk X”

unless that routing rule is explicitly configured in the prototype.

Use:

Configured Office
Configured Desk
Configured Role

where necessary.

Prototype examples must be clearly labelled as configurable/sample workflow context.

--------------------------------------------------
16. APPLICATION ROUTING VIEW
--------------------------------------------------

Allow the officer to inspect a sample application's routing context.

Example:

APP-MIDC-2048

Aarav Precision Components

Service:
Building / Planning

Project Stage:
Construction

Routing:

Business Location
↓
MIDC Estate
↓
Service
↓
Configured Jurisdiction
↓
Office / Region
↓
Current Desk
↓
Role

Show:

Current Desk:
Planning / Building Scrutiny

Application State:
TECHNICAL_SCRUTINY

Assigned officer context:
[where permission allows]

Do not confuse this with the logged-in officer's own assigned desk.

--------------------------------------------------
17. SERVICE + SCRUTINY ROUTE
--------------------------------------------------

Where useful, show scrutiny route distribution by service.

Example:

BUILDING / PLANNING

Standard Review
11

Enhanced Review
5

Inspection-heavy Route
3

Do not use a fabricated numeric risk score.

Do not call these official statutory risk categories unless configured.

These are configurable scrutiny-routing outputs.

Clicking:

Enhanced Review

should route to:

M10 — Scrutiny Route / Explainability

for the relevant application set.

--------------------------------------------------
18. SERVICE + DEPENDENCY CONTEXT
--------------------------------------------------

Show a compact dependency indicator for each service where relevant.

Example:

Building / Planning

External dependencies:
MPCB CTE — Pending
Fire — Configured prerequisite
Utilities — Parallel

Do not give MIDC officers decision controls for other departments.

MIDC may view:

- prerequisite
- dependency
- context
- parallel node
- downstream node
- blocked node
- unlocked node

But cannot:

- approve
- reject
- edit
- impersonate

another department's decision.

For detailed dependency information:

→ M17 Regulatory Dependency View

--------------------------------------------------
19. SLA CONTEXT
--------------------------------------------------

Show SLA risk at service level.

Example:

LAND / PLOT

Active:
28

SLA Risk:
4

SLA Breached:
1

Do not invent statutory SLA values.

Where detailed timing is shown, distinguish:

- MIDC processing time
- entrepreneur response time
- inspection waiting
- external dependency waiting
- total elapsed

Do not automatically attribute all elapsed time to MIDC.

Click:

SLA Risk

→ M30 SLA Dashboard

or:

M03 filtered to the affected service + SLA risk.

--------------------------------------------------
20. PROJECT STAGE CONTEXT
--------------------------------------------------

Allow the service view to be segmented by project stage.

Example:

Building / Planning

Planning:
3

Pre-establishment:
5

Construction:
8

Installation:
2

Operational:
1

Use the Business DNA project stage.

Configured stages:

Planning
Land acquisition
Pre-establishment
Construction
Installation
Ready to operate
Operational

Do not create a new project-stage vocabulary.

--------------------------------------------------
21. PERMISSION MODEL
--------------------------------------------------

M05 must respect officer permissions.

An officer may only see:

- services
- applications
- routing information
- workload
- analytics

within their authorised scope.

For example:

A desk-level officer may see:

My Desk

An office-level authorised user may see:

Office

An authorised leadership / analytics role may see:

Broader configured scope

Do not allow the user to bypass permissions through filters.

If a filter contains unavailable data, either:

- do not expose that option, or
- clearly indicate the permission boundary.

--------------------------------------------------
22. OFFICER CONTEXT VS APPLICATION CONTEXT
--------------------------------------------------

Maintain the distinction:

OFFICER CONTEXT

Department
Office
Region
Desk
Role
Permissions

APPLICATION CONTEXT

Application service
Application current desk
Application state
Application SLA
Application dependencies

Do not use the logged-in officer's desk as the default value for every application's current desk.

--------------------------------------------------
23. ADAPTIVE BUSINESS PROFILE CONNECTION
--------------------------------------------------

M05 should be driven by the same Business DNA and regulatory journey used by the Entrepreneur side.

The service should not exist simply because MIDC has a screen for it.

Service applicability comes from the configured regulatory journey.

Conceptually:

BUSINESS DNA
↓
REGULATORY ENGINE
↓
APPLICABLE MIDC SERVICE
↓
APPLICATION
↓
ROLE-BASED ROUTING
↓
SERVICE QUEUE

Respect adaptive profile logic.

For example:

MIDC = NO

→ do not create a MIDC-specific service simply because M05 exists.

MIDC = UNKNOWN

→ preserve Needs Verification.

MIDC = YES

→ activate only services actually produced by the configured regulatory journey.

--------------------------------------------------
24. NOT_APPLICABLE LOGIC
--------------------------------------------------

Do not create service queues from irrelevant branches.

For example:

Water = NO
→ Water-specific service should not appear for that application unless configuration explicitly activates another applicable requirement.

Drainage = NOT_APPLICABLE
→ do not create a missing-drainage issue.

Boiler = NO
→ do not create boiler-related service work.

M05 is an aggregation of actual configured service instances, not a checklist of every possible government requirement.

--------------------------------------------------
25. CANONICAL APPLICATION STATES
--------------------------------------------------

Use the shared application states:

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

Operational service labels may aggregate these states.

Example:

UNDER REVIEW
=
DOCUMENT_SCRUTINY
+
INITIAL_SCRUTINY
+
TECHNICAL_SCRUTINY

QUERY
=
QUERY_RAISED

RESUBMISSION
=
RESUBMITTED

INSPECTION
=
INSPECTION_PENDING
+
INSPECTION_SCHEDULED

DECISION PENDING
=
FINAL_DECISION

Do not create conflicting application states.

--------------------------------------------------
26. SERVICE STATUS DRILL-DOWN
--------------------------------------------------

Each status count should be clickable.

Example:

Land / Plot
Query: 4

Click:

→ M03 Queue

Filters:

Service = Land / Plot
State = Query Raised

Building / Planning
Inspection: 2

Click:

→ M21 Inspection Queue

Filters:

Service = Building / Planning

Water / Utility
SLA Risk: 3

Click:

→ M30 SLA Dashboard

or:

M03 filtered to Water / Utility + SLA Risk

--------------------------------------------------
27. SERVICE ANALYTICS
--------------------------------------------------

M05 may provide lightweight service-level trends.

Examples:

Applications received
Applications completed
Average processing time
SLA risk
Query frequency

But do not turn M05 into the full department analytics screen.

Detailed analytics belong to:

M35 Department Analytics
M36 Bottleneck Analytics
M37 Workload / Capacity

Provide:

View Analytics →

where appropriate.

--------------------------------------------------
28. SERVICE CONFIGURATION BOUNDARY
--------------------------------------------------

The service catalogue should be treated as configuration-driven.

Show a small metadata indicator:

Configured service

or:

Configuration source

where useful.

Do not imply that the Figma prototype itself is the authoritative legal catalogue.

If a service is labelled:

Other Configured MIDC Services

keep it expandable.

Do not invent names simply to populate the interface.

--------------------------------------------------
29. EMPTY STATES
--------------------------------------------------

Create useful empty states.

Example:

No applications currently match this service filter.

Actions:

Clear Filters
Open Application Search

For a service with zero active applications:

No active applications

New applications may appear here when submitted and routed.

Do not remove the service from the catalogue simply because its current count is zero.

--------------------------------------------------
30. LOADING / ERROR STATES
--------------------------------------------------

Create:

1. Loading service data
2. Refreshing
3. Service data unavailable
4. Routing rules unavailable
5. Permission-limited service view

Example:

Routing context unavailable

The application can still be opened, but routing details could not be retrieved.

Try again

Do not display backend/system errors.

--------------------------------------------------
31. REFRESH
--------------------------------------------------

Provide:

Refresh

and:

Last updated: [timestamp]

When refreshing:

- preserve filters
- preserve selected service
- preserve current navigation state

Do not reset the officer's context.

--------------------------------------------------
32. VISUAL HIERARCHY
--------------------------------------------------

Prioritise:

1. Service catalogue
2. Service workload/status
3. SLA risk
4. Routing context
5. Service drill-down
6. Detailed routing explanation

The screen should feel operational.

Avoid:

- giant decorative cards
- excessive charts
- consumer dashboard patterns
- unnecessary illustrations
- neon colours
- glassmorphism
- excessive animation

Use compact tables, status chips and clear hierarchy.

--------------------------------------------------
33. REUSABLE COMPONENTS
--------------------------------------------------

Build reusable components for:

- Service row
- Service status cell
- Service badge
- Service count
- SLA indicator
- Routing chain
- Routing rule card
- Current desk indicator
- Dependency indicator
- Project-stage chip
- Scrutiny route indicator
- Filter chip
- Filter drawer
- Drill-down button
- Empty state
- Loading state
- Permission state

These components should be reusable in:

M03 Queue
M04 Search
M06 Application Overview
M10 Scrutiny Route
M17 Dependency View
M30 SLA
M35 Analytics
M36 Bottleneck Analytics
M37 Workload

--------------------------------------------------
34. NAVIGATION
--------------------------------------------------

M02 Department Home
→ M05 Service / Queue Segmentation

M05
→ M03 filtered service queue

M05
→ M04 Application Search

M05
→ M06 Application Overview

M05
→ M10 Scrutiny Route / Explainability

M05
→ M17 Regulatory Dependency View

M05
→ M30 SLA Dashboard

M05
→ M35 Department Analytics

M05
→ M36 Bottleneck Analytics

M05
→ M37 Workload / Capacity

Do not create dead-end service cards.

--------------------------------------------------
35. SAMPLE SERVICE DATA
--------------------------------------------------

Use realistic prototype-safe sample data.

Example:

LAND / PLOT
28 active
6 new
9 under review
4 query
3 resubmission
3 inspection
2 decision pending
4 SLA risk

BUILDING / PLANNING
19 active
4 new
7 under review
3 query
2 resubmission
2 inspection
3 decision pending
3 SLA risk

WATER / UTILITY
11 active
2 new
5 under review
2 query
1 resubmission
1 inspection
1 decision pending
2 SLA risk

DRAINAGE / INFRASTRUCTURE
7 active

CONSTRUCTION / FOLLOW-UP
9 active

AMENDMENT / MODIFICATION
6 active

OTHER CONFIGURED SERVICES
4 active

These are demonstration values only.

Do not label them as official MIDC statistics.

--------------------------------------------------
36. RESPONSIVE FIGMA STRUCTURE
--------------------------------------------------

Use Auto Layout.

Recommended desktop structure:

GLOBAL EKATMA HEADER
↓
OFFICER CONTEXT
↓
PAGE HEADER
↓
FILTER / TOOLBAR
↓
SERVICE SUMMARY
↓
SERVICE CATALOGUE
↓
ROUTING CONTEXT
↓
ROUTING RULES

Do not make routing information dominate the service queue.

The service catalogue is the primary purpose of M05.

--------------------------------------------------
37. STATES TO DESIGN
--------------------------------------------------

Create:

1. Default populated service catalogue
2. Service filtered
3. SLA-risk filtered
4. Service detail selected
5. Routing Rules expanded
6. Routing explanation open
7. Empty service state
8. Loading state
9. Error state
10. Permission-limited state

--------------------------------------------------
38. FINAL DESIGN PRINCIPLE
--------------------------------------------------

M05 should make the following concept visually obvious:

MIDC is not one giant queue.

It is:

MIDC
↓
Configurable Service Catalogue
↓
Service-specific Application
↓
Configured Routing
↓
Service Queue
↓
Common Scrutiny Workspace

The officer should be able to move from:

“What kind of MIDC work is happening?”

to:

“Which service has the workload?”

to:

“Where are those applications routed?”

to:

“Show me the actual applications.”

The final action should always lead to the appropriate existing workflow rather than creating another disconnected dashboard.

Build M05 accordingly.