Create:

M03 — MIDC Queue / Inbox
M04 — MIDC Application Search

IMPORTANT:
Continue from the existing EKATMA Figma file.

Do NOT redesign Phase 0.
Do NOT create a new visual system.
Do NOT create a separate MIDC visual language.
Do NOT recreate the officer shell from M01 if it already exists.
Reuse the existing EKATMA government header, sidebar, typography, spacing, buttons, tables, status primitives, breadcrumbs, accessibility behaviour and officer-context components.

These two screens are operational work-management and retrieval screens.

M03 answers:

“What applications currently require attention within my permitted operational scope?”

M04 answers:

“Find an application or regulatory record within my permitted scope.”

Do not merge these purposes.

--------------------------------------------------
1. OFFICER CONTEXT
--------------------------------------------------

Both M03 and M04 must inherit the authenticated officer context from M01.

Display:

Department: MIDC
Region / Office: [assigned]
Desk: [assigned]
Role: [assigned]

Also provide:

- Global search
- Notifications
- Regulatory Assistant
- User profile

Do NOT provide selectors for:

- Department
- Region
- Office
- Desk
- Role
- Permission

These are assigned by the authenticated account.

IMPORTANT:

Keep:

OFFICER CONTEXT

separate from:

APPLICATION CONTEXT

For an application:

Current Desk = the desk currently processing that application.

This does not necessarily equal the logged-in officer's assigned desk.

--------------------------------------------------
2. M03 — MIDC QUEUE / INBOX
--------------------------------------------------

Create M03 as the primary operational queue.

Page title:

MIDC Queue / Inbox

Subtitle:

Applications and actions within your permitted MIDC workflow scope.

The page should immediately answer:

- What is new?
- What needs scrutiny?
- What is waiting for the entrepreneur?
- What has been resubmitted?
- What requires inspection?
- What is waiting for decision?
- What is approaching SLA?
- What has breached SLA?

--------------------------------------------------
3. M03 QUEUE HEADER
--------------------------------------------------

Create a page header containing:

MIDC Queue / Inbox

On the right:

- Refresh
- Search Applications
- Notifications

Below the header show a compact queue summary:

Total visible
New
In scrutiny
Awaiting entrepreneur
Inspection
Decision pending
SLA risk
SLA breached

These counts must reflect the currently selected filters and the officer's permitted scope.

Do not present them as department-wide totals if the officer does not have department-wide permission.

Show:

Last refreshed: [timestamp]

Use realistic prototype data.

Clearly treat prototype numbers as sample data rather than actual MIDC statistics.

--------------------------------------------------
4. QUEUE TABS / OPERATIONAL VIEWS
--------------------------------------------------

Create quick-access queue views:

ALL
MY ACTIONS
NEW
IN SCRUTINY
QUERY REQUIRED
AWAITING ENTREPRENEUR
RESUBMISSION
INSPECTION
DECISION PENDING
SLA RISK
SLA BREACHED

These are operational views.

They must not create contradictory application states.

For example:

“Awaiting Entrepreneur”

is an operational queue condition / overlay.

The underlying application can still have a canonical state such as:

QUERY_RAISED

Similarly:

“SLA Risk”

is an SLA condition, not a new application state.

--------------------------------------------------
5. CANONICAL APPLICATION STATES
--------------------------------------------------

Use the EKATMA canonical application states wherever an underlying application state is displayed:

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

Do not invent a competing status vocabulary.

Operational labels may be layered on top.

Examples:

QUERY_RAISED
+ Awaiting Entrepreneur

TECHNICAL_SCRUTINY
+ SLA Risk

FINAL_DECISION
+ Decision Pending

INSPECTION_PENDING
+ Inspection Required

--------------------------------------------------
6. M03 MAIN TABLE
--------------------------------------------------

Create the primary queue table.

Columns:

1. Application ID
2. Business
3. Applicant
4. MIDC Service
5. Project Stage
6. Current Desk
7. Received Date
8. SLA
9. Scrutiny Route
10. Dependency Impact
11. Action Required
12. Status
13. Row Action

Use compact, dense but readable table design.

Do not make the table visually overwhelming.

--------------------------------------------------
7. COLUMN DETAILS
--------------------------------------------------

APPLICATION ID

Example:

APP-MIDC-2048

Make it clickable.

Click:

→ M06 Application Overview

BUSINESS

Example:

Aarav Precision Components Pvt Ltd

Use the Business / Project identity from the application.

Do not make officers reconstruct business information from multiple forms.

APPLICANT

Show applicant / organisation context.

MIDC SERVICE

Examples:

Land / Plot
Building / Planning
Water / Utility
Drainage / Infrastructure
Construction / Follow-up
Amendment / Modification
Other configured MIDC service

Do not imply these are an exhaustive legal MIDC service taxonomy.

PROJECT STAGE

Use the Business DNA project stage.

Examples:

Planning
Land acquisition
Pre-establishment
Construction
Installation
Ready to operate
Operational

CURRENT DESK

This is the APPLICATION'S current desk.

Examples:

Intake / Document Desk
Land / Plot Scrutiny
Planning / Building Scrutiny
Utility / Water Scrutiny
Inspection
Decision

These are configurable workflow desk labels.

Do not present them as a claim about official MIDC organisational hierarchy.

RECEIVED DATE

Show:

- date
- optionally time
- age in days

Example:

12 Sep 2026
6 days ago

SLA

Show:

- SLA target
- elapsed / remaining time
- SLA condition

Example:

5 days
4 days elapsed
1 day remaining

Use:

Normal
Approaching deadline
SLA exceeded

Do not invent statutory SLA values.

Prototype SLA values should be clearly sample data.

SCRUTINY ROUTE

Show the configured scrutiny route:

Standard Review
Enhanced Review
Inspection-heavy Route

If a route is displayed, allow the officer to understand why.

Example:

Enhanced Review

2 configured factors

Do not display a made-up numeric risk score.

Do not call this an “official MIDC risk score.”

DEPENDENCY IMPACT

Show concise dependency information.

Examples:

No blocking dependency

MPCB CTE pending

Fire prerequisite pending

Utility dependency active

External dependency

Needs Verification

This must communicate dependency state, not give MIDC control over another department.

ACTION REQUIRED

Examples:

Review application
Review documents
Finalise query
Review resubmission
Schedule inspection
Complete decision review
Verify dependency

Make the primary action contextual.

STATUS

Show canonical state plus operational overlay where necessary.

Example:

TECHNICAL_SCRUTINY

SLA Risk

or:

QUERY_RAISED

Awaiting Entrepreneur

ROW ACTION

Provide:

Open

or a context-specific primary action.

Avoid excessive action menus.

--------------------------------------------------
8. QUEUE FILTERS
--------------------------------------------------

Create a filter bar above the table.

Primary operational filters:

- New
- In Scrutiny
- Query Required
- Awaiting Entrepreneur
- Resubmission
- Inspection
- Decision Pending
- SLA Risk
- SLA Breached

Additional filters:

- MIDC Service
- Office / Region
- Project Stage

Also support:

- Current Desk
- Scrutiny Route
- Dependency State
- Date Received

Only expose filters that are valid within the officer's permitted scope.

Do not imply that an officer can search outside their authorisation.

--------------------------------------------------
9. FILTER BEHAVIOUR
--------------------------------------------------

Filters should be composable.

Example:

Service = Building / Planning
+
Project Stage = Construction
+
SLA = Risk
+
Current Desk = Planning / Building Scrutiny

Result:

Only applications matching all selected conditions.

Display active filters as removable chips.

Example:

Service: Building / Planning ×
Stage: Construction ×
SLA: Risk ×

Provide:

Clear All

Do not force the user to repeatedly reopen a filter drawer.

--------------------------------------------------
10. DATE FILTER
--------------------------------------------------

Support date filtering for:

- Received date
- Submission date
- Last activity
- SLA due date

Provide:

Today
Last 7 days
Last 30 days
Custom range

Do not hard-code a date range as the only available view.

--------------------------------------------------
11. SORTING
--------------------------------------------------

Provide sorting by:

1. Oldest
2. SLA Risk
3. Received Date
4. Dependency Impact
5. Scrutiny Route

Also support:

- Newest
- Recently Updated
- SLA Due Date

IMPORTANT:

Sorting is operational.

Do NOT create:

Best Application
Best Business
Highest Quality
Most Important Applicant
Most Valuable Project

Do not rank applicants or businesses.

Do not create a composite “priority score” unless a separately configured operational rule explicitly exists.

--------------------------------------------------
12. DEFAULT QUEUE ORDER
--------------------------------------------------

Default ordering should help officers identify work requiring attention.

A sensible prototype default:

SLA Risk / SLA Breached
→
Action Required
→
Received Date

But show this as an operational sorting rule.

Do not describe it as a legal priority hierarchy.

Provide a visible:

Sort: SLA Risk

control.

--------------------------------------------------
13. EMPTY STATES
--------------------------------------------------

Create useful empty states.

Example:

No applications match these filters.

Actions:

Clear Filters
Search Applications

For My Actions:

You have no pending actions in this view.

For SLA Risk:

No applications are currently approaching SLA.

Do not display fake zero-state charts.

--------------------------------------------------
14. LOADING / ERROR STATES
--------------------------------------------------

Create:

1. Initial loading
2. Refreshing
3. Search/filter loading
4. Temporary data unavailable
5. Permission-limited result state

Example:

Unable to load queue data.

Try again

Do not expose technical backend errors to the officer.

--------------------------------------------------
15. BULK SELECTION
--------------------------------------------------

Support optional row selection for legitimate batch operational actions.

Use checkboxes only where the action is safe and permission-controlled.

Potential batch actions:

- Assign / route where configured
- Mark for inspection planning
- Export permitted queue data
- Add to review list

Do NOT provide bulk:

Approve
Reject

unless a future configured workflow explicitly permits such an action.

Do not assume bulk statutory decisions are permitted.

--------------------------------------------------
16. APPLICATION ROW → M06
--------------------------------------------------

Clicking:

Application ID
Business
Open

should navigate to:

M06 — Application Overview

The selected application should carry its context forward.

M06 should then provide:

- Overview
- Business DNA
- Application
- Documents
- Consistency
- Dependencies
- Queries
- Inspection
- Timeline
- Regulatory Reference
- Audit

Do not recreate the full application overview inside M03.

--------------------------------------------------
17. DEPENDENCY DISPLAY
--------------------------------------------------

If an application has a dependency, show a compact dependency indicator.

Example:

DEPENDENCY

MPCB CTE
Pending

Impact:

Building / Planning review waiting for configured prerequisite.

The officer can:

View Dependency

→ M17 Regulatory Dependency View

Do NOT provide controls such as:

Approve MPCB
Reject MPCB
Edit MPCB status

MIDC can see external department state but cannot decide for that department.

--------------------------------------------------
18. SCRUTINY ROUTE DISPLAY
--------------------------------------------------

When the queue displays a scrutiny route, use the configured terminology:

Standard Review
Enhanced Review
Inspection-heavy Route

Do not display a fabricated numeric AI risk score.

Example:

Enhanced Review

Reason:
- New construction
- Land / plot inconsistency

View Route →

M10 Scrutiny Route / Explainability

The route determines review depth.

It does not determine approval or rejection.

--------------------------------------------------
19. M03 QUEUE SCOPE
--------------------------------------------------

The queue should operate within the authenticated officer's permitted scope.

Examples:

Officer assigned to a desk:

→ primarily sees applications actionable by that desk.

Office-level authorised user:

→ may see applications across the configured office scope.

Leadership / authorised analytics user:

→ may see broader configured scope.

Do not assume every MIDC officer can see every application.

Do not expose records outside permission scope.

--------------------------------------------------
20. M04 — APPLICATION SEARCH
--------------------------------------------------

Create a separate page:

M04 — Application Search

Purpose:

M04 is a retrieval tool.

It is not the same as the operational queue.

The user should be able to find an application even when it is not currently in their action queue, provided it falls within their permitted access scope.

Page title:

Application Search

Subtitle:

Find applications, projects and approval records within your permitted scope.

--------------------------------------------------
21. M04 SEARCH BAR
--------------------------------------------------

Create a prominent global search field.

Placeholder:

Search by Application ID, Business, Applicant, Plot Number or Approval / Order Number

Support search by:

- Application ID
- Business
- Applicant
- Service
- District
- MIDC estate
- Plot number
- Status
- Date
- Approval / Order number

Use a clear Search button.

Also support Enter-to-search.

Provide:

Advanced Filters

--------------------------------------------------
22. M04 SEARCH TYPE
--------------------------------------------------

Allow the user to choose the search field when useful.

Example:

Search by:

Application ID
Business
Applicant
Plot Number
Approval / Order Number

Or:

All permitted fields

Do not require the officer to know which field contains the information beforehand.

--------------------------------------------------
23. M04 ADVANCED FILTERS
--------------------------------------------------

Create an expandable filter drawer.

Filters:

APPLICATION

- Application ID
- Service
- Status
- Project stage
- Received date
- Submission date

BUSINESS

- Business
- Applicant
- Entity

LOCATION

- District
- Taluka where configured
- MIDC estate
- Plot number

WORKFLOW

- Current desk
- Scrutiny route
- Dependency state
- Inspection state
- SLA state

DECISION

- Approval / Order number
- Decision status
- Decision date

Only display filters supported by the underlying configured data.

--------------------------------------------------
24. M04 SEARCH RESULTS
--------------------------------------------------

After searching, show:

Search results

Example:

23 results found

Display a reusable table.

Columns:

- Application ID
- Business
- Applicant
- MIDC Service
- District
- MIDC Estate
- Plot
- Project Stage
- Current Desk
- Status
- Last Updated
- Approval / Order Number
- Action

The result table should be compact and scannable.

Clicking a result:

→ M06 Application Overview

--------------------------------------------------
25. M04 RESULT HIGHLIGHTING
--------------------------------------------------

If the search was for a specific term, highlight the matching field.

Example:

Search:

Aarav

Result:

Aarav Precision Components Pvt Ltd

If searching by plot:

Plot A-24

Highlight the matching plot value.

Do not highlight unrelated fields.

--------------------------------------------------
26. M04 SEARCH RESULT STATES
--------------------------------------------------

Create:

1. Initial empty state
2. Search results
3. No results
4. Multiple results
5. Exact match
6. Search error
7. Loading
8. Permission-limited result

INITIAL:

Search for an application, business, applicant or approval record.

NO RESULTS:

No applications found within your permitted scope.

Try:

- broader search
- another identifier
- clear filters

Do not imply the application does not exist globally.

It may simply be outside the officer's permitted scope.

--------------------------------------------------
27. EXACT MATCH BEHAVIOUR
--------------------------------------------------

If the user enters a complete Application ID:

APP-MIDC-2048

and exactly one permitted record exists:

Show a clear exact-match result.

Example:

Exact match found

APP-MIDC-2048

Open Application →

M06

If multiple records match a business name:

Show all relevant permitted results.

Do not automatically select a record.

--------------------------------------------------
28. SEARCH SCOPE
--------------------------------------------------

Always show the current search scope.

Example:

Search scope:
MIDC / Thane Regional Office

or:

Search scope:
Authorised MIDC department scope

If the user has broader permissions, the scope may be broader.

Do not provide a manual permission override.

Do not expose hidden records.

--------------------------------------------------
29. SEARCH + QUEUE RELATIONSHIP
--------------------------------------------------

M03 and M04 must use the SAME reusable table components.

However:

M03 = operational queue

M04 = retrieval/search

Example:

M03:
Applications currently requiring action.

M04:
Find APP-MIDC-2048 even if it is not currently in the officer's action queue.

Both ultimately lead to:

M06 Application Overview

--------------------------------------------------
30. REUSABLE COMPONENT ARCHITECTURE
--------------------------------------------------

Create reusable components for:

- Application table
- Application ID cell
- Business cell
- Applicant cell
- Service badge
- Project stage badge
- Current desk badge
- SLA indicator
- Dependency indicator
- Scrutiny route indicator
- Status chip
- Action button
- Filter chip
- Filter drawer
- Search field
- Pagination
- Empty state
- Loading state
- Error state
- Table toolbar
- Column sorting
- Row selection
- Refresh control

These components must be designed so they can later be reused by:

M05 — Service / Queue Segmentation
M06 — Application Overview
M16 — Cross-form Consistency
M18 — Consolidated Query Builder
M19 — Query / Response History
M20 — Delta Re-scrutiny
M21 — Inspection Queue
M30 — SLA Dashboard
M35 — Department Analytics
M36 — Bottleneck Analytics
M37 — Workload / Capacity
M38 — Audit / History

Do not create unrelated table patterns for every screen.

--------------------------------------------------
31. BUSINESS DNA CONSISTENCY
--------------------------------------------------

M03 and M04 should use data originating from the same application/business context.

Do not ask the officer to manually reconstruct:

- business identity
- project stage
- MIDC estate
- plot
- service
- existing approval context

The Entrepreneur Adaptive Business Profile and resulting Business DNA are the underlying context.

Where useful, show source/provenance in detailed views such as M06/M07 rather than cluttering the queue.

--------------------------------------------------
32. ADAPTIVE PROFILE STATES
--------------------------------------------------

Do not interpret absence of a field as a problem automatically.

Respect:

NOT_VISIBLE
VISIBLE
REQUIRED
ANSWERED
VALIDATED
CONFIRMED
SKIPPED
NOT_APPLICABLE
NEEDS_REVIEW

For example:

Boiler = NO
→ Boiler branch = NOT_APPLICABLE
→ no “missing boiler information” warning in the queue.

MIDC = UNKNOWN
→ relevant application context may show Needs Verification.

Do not create queue issues from branches that are legitimately NOT_APPLICABLE.

--------------------------------------------------
33. DATA VERIFICATION STATES
--------------------------------------------------

Where verification status is surfaced, use the established data verification vocabulary:

SELF_DECLARED
USER_CONFIRMED
SYSTEM_VERIFIED
DEPARTMENT_VERIFIED
NEEDS_VERIFICATION
INVALID
EXPIRED

Do not confuse this with adaptive questionnaire state.

For M03/M04, only surface verification state when it materially affects queue/search interpretation.

Detailed provenance belongs to M07 / M12 / M13.

--------------------------------------------------
34. SLA HANDLING
--------------------------------------------------

Do not create a fake “priority score.”

SLA should be based on configured service/workflow rules.

Where useful, show:

SLA target
Elapsed
Remaining
Condition

Example:

SLA:
5 days

Elapsed:
4 days

Remaining:
1 day

Status:
Approaching deadline

If time is exceeded:

SLA exceeded

Where relevant, distinguish:

- Department processing time
- Entrepreneur response time
- Inspection waiting
- External dependency wait
- Total elapsed

Do not automatically attribute all elapsed time to MIDC.

--------------------------------------------------
35. PERMISSION AND DATA SAFETY
--------------------------------------------------

The UI must respect role and permission scope.

An officer must only see:

- applications
- businesses
- applicants
- documents
- analytics
- actions

that their account is authorised to access.

Do not expose:

- hidden applications
- restricted applicant information
- unauthorised department data
- controls belonging to another department

If the user lacks permission for an action, show:

View only

rather than hiding the application's existence when the application itself is visible.

--------------------------------------------------
36. SORT / FILTER / SEARCH CONSISTENCY
--------------------------------------------------

Use one shared table interaction model.

Filter:

changes which records appear.

Sort:

changes ordering.

Search:

retrieves matching records.

Do not make these behaviours inconsistent between M03 and M04.

Example:

M03 filter:
Service = Building / Planning

M04 search:
Business = Aarav

Both should use the same filter chip, table, pagination and status components.

--------------------------------------------------
37. PAGINATION
--------------------------------------------------

Use pagination for large result sets.

Show:

Showing 1–25 of 248 applications

Controls:

Previous
1
2
3
...
Next

Do not attempt to display hundreds of applications in one table.

Preserve filters and sort when navigating pages.

--------------------------------------------------
38. TABLE DENSITY
--------------------------------------------------

The department interface should be information-dense but readable.

Use:

- compact row height
- strong column alignment
- readable typography
- sticky table header where appropriate
- horizontal scrolling for wider tables
- sensible column widths
- tooltips for truncated values

Do not turn the table into oversized cards.

--------------------------------------------------
39. EXPORT
--------------------------------------------------

Where configured and permitted, provide:

Export Results

Possible formats:

CSV / Excel

The export must respect:

- current filters
- current search
- permission scope
- visible/authorised fields

Do not automatically export confidential fields that are not part of the visible permitted dataset.

--------------------------------------------------
40. RESPONSIVE / FIGMA IMPLEMENTATION
--------------------------------------------------

Use Auto Layout.

Desktop should be the primary officer experience.

For narrower widths:

- preserve filter access
- allow horizontal table scrolling
- keep Application ID and Business visible where possible
- collapse secondary columns
- preserve row actions

Do not turn the operational queue into a consumer mobile card interface.

--------------------------------------------------
41. VISUAL LANGUAGE
--------------------------------------------------

Use the existing EKATMA government design system.

Do not introduce:

- neon gradients
- glassmorphism
- decorative dashboards
- excessive illustrations
- unrelated startup UI patterns
- new typography
- new colour systems

Use restrained status colours already established by EKATMA.

Status must never rely on colour alone.

Use:

colour + text + icon where appropriate.

--------------------------------------------------
42. M03 AND M04 NAVIGATION
--------------------------------------------------

M03:

Department Home
→ My Queue / Queue
→ Application
→ M06 Application Overview

M04:

Application Search
→ Search Result
→ M06 Application Overview

From M06, the officer can continue to:

M07 Business DNA
M08 Timeline
M09 Pre-check
M10 Scrutiny Route
M11 Scrutiny
M16 Consistency
M17 Dependencies
M18 Queries
M20 Delta
M21 Inspection
M25 Decision
M38 Audit

Do not make M03/M04 contain those detailed workflows.

--------------------------------------------------
43. FINAL SCREEN STATES TO CREATE
--------------------------------------------------

M03:

1. Default populated queue
2. Filtered queue
3. SLA-risk queue
4. SLA-breached queue
5. My Actions queue
6. Empty queue
7. Loading queue
8. Permission-limited queue
9. Multi-select state
10. Refreshing state

M04:

1. Initial search state
2. Search results
3. Exact match
4. Multiple results
5. No results
6. Advanced filters open
7. Loading
8. Search error
9. Permission-limited results

--------------------------------------------------
44. CORE PRINCIPLE
--------------------------------------------------

M03 should feel like:

“Here is the work that requires my attention.”

M04 should feel like:

“Here is the record I am looking for.”

Neither should feel like:

“Here is every piece of information in the system.”

Keep the screens operational, fast to scan, permission-aware, reusable and tightly connected to M06.

Build M03 and M04 accordingly.