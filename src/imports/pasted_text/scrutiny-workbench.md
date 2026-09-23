Create / complete the existing "Scrutiny" tab in the MIDC Department interface.

IMPORTANT:

The Scrutiny tab is currently visually empty.

DO NOT create new standalone scrutiny logic.

The detailed scrutiny screens already exist and must remain unchanged:

M09 — Automated Pre-check
M10 — Scrutiny Route / Explainability
M11 — Land / Plot Scrutiny
M12 — Parameter Detail
M13 — Document Review
M14 — Building / Planning Scrutiny
M15 — Water / Utility / Drainage Scrutiny
M16 — Cross-form Consistency
M17 — Regulatory Dependency View
M18 — Consolidated Query Builder
M19 — Query / Response History
M20 — Delta Re-scrutiny

The purpose of this task is to make the existing "Scrutiny" tab function as the CENTRAL SCRUTINY WORKBENCH / ENTRY POINT.

Do NOT duplicate the detailed screens above.

Do NOT create another independent scrutiny workflow.

The Scrutiny tab should help the MIDC officer understand:

1. Which applications currently require scrutiny
2. What stage of scrutiny each application is in
3. What requires attention
4. Which scrutiny modules are available
5. What has already been completed
6. What remains unresolved
7. Where the officer should go next

==================================================
1. SCRUTINY TAB PURPOSE
==================================================

The Scrutiny tab should answer:

"What applications and scrutiny activities currently require my attention?"

It is an operational workbench.

It is NOT:

- a second application queue
- a duplicate of M03
- a duplicate of M05
- a replacement for M11-M20
- a final decision screen
- a generic analytics dashboard

Think of it as:

SCRUTINY COMMAND CENTRE

from which the officer enters the appropriate detailed scrutiny workspace.

==================================================
2. PAGE HEADER
==================================================

Use the existing MIDC Department shell.

Show:

Department:
MIDC

Region / Office:
Assigned Office

Desk:
Current Desk

Role:
Current Role

Page title:

"Scrutiny"

Subtitle:

"Review submitted applications, identify unresolved scrutiny items, and continue application-specific review."

Do NOT create a new visual design.

Use the existing government + EKATMA design system.

==================================================
3. TOP SUMMARY
==================================================

At the top show compact factual counters.

Use:

New for Scrutiny
In Scrutiny
Query Required
Resubmitted
Delta Review
Inspection Pending
Decision Pending
SLA Risk

These are navigation counters, not performance scores.

Example:

NEW
8

IN SCRUTINY
14

QUERY REQUIRED
5

RESUBMITTED
3

DELTA REVIEW
2

INSPECTION
4

SLA RISK
1

Each counter must be clickable.

Clicking:

New for Scrutiny

opens the relevant filtered scrutiny queue.

Clicking:

Resubmitted

opens applications requiring post-resubmission scrutiny / M20 where applicable.

Do not invent arbitrary percentages.

==================================================
4. "MY SCRUTINY WORK" SECTION
==================================================

Create the primary section:

"My Scrutiny Work"

This is the main content of the page.

Show applications currently requiring action within the officer's permitted scope.

Use a table.

Columns:

Application ID
Business
MIDC Service
Project Stage
Current Scrutiny Stage
Action Required
Last Updated
SLA
Status
Open

Example:

MIDC-APP-2026-00418
Aster Precision Components Pvt. Ltd.
Building / Planning
Construction
Technical Scrutiny
Review Building Parameters
18 Sep 2026
Due Soon
In Scrutiny
OPEN

Another:

MIDC-APP-2026-00405
Example Manufacturing Pvt. Ltd.
Land / Plot
Pre-construction
Document Review
Review Land Evidence
17 Sep 2026
Within SLA
In Scrutiny
OPEN

Another:

MIDC-APP-2026-00391
Example Utilities Pvt. Ltd.
Water / Utility
Construction
Resubmission Review
Review Delta
18 Sep 2026
SLA Risk
Resubmitted
OPEN

The exact sample values can be prototype-safe.

==================================================
5. CURRENT SCRUTINY STAGE
==================================================

Use the existing workflow concepts.

Possible values:

Pre-check
Scrutiny Route
Land / Plot
Building / Planning
Water / Utility
Cross-form
Dependency Review
Query
Delta Re-scrutiny
Inspection
Decision

Do not create a new canonical application-state model.

This field describes:

"Where the officer currently needs to work."

It is an operational scrutiny stage.

==================================================
6. ACTION REQUIRED
==================================================

This is the most important column.

Show the actual next action.

Examples:

Review Land Parameters

Review Building Plan

Resolve Cross-form Mismatch

Review Dependency

Consolidate Query

Review Entrepreneur Response

Perform Delta Re-scrutiny

Plan Inspection

Prepare Decision

Do not use vague labels like:

"Continue"

"Process"

"Handle"

The action should tell the officer what needs attention.

==================================================
7. OPEN BUTTON
==================================================

Every row must have:

OPEN

Clicking OPEN must preserve the application context.

The officer should then enter the existing detailed scrutiny flow.

Example:

Scrutiny Home

↓

OPEN

↓

Application Overview

↓

Existing detailed scrutiny modules

Do NOT create new duplicate screens.

==================================================
8. APPLICATION SCRUTINY WORKBENCH
==================================================

When an application is selected from the Scrutiny tab, show a compact application-specific overview before entering the detailed module.

Example:

Application:
MIDC-APP-2026-00418

Business:
Aster Precision Components Pvt. Ltd.

Service:
Building / Planning

Application State:
TECHNICAL_SCRUTINY

Scrutiny Route:
Enhanced Review

Current Desk:
Planning / Building

SLA:
Due Soon

Then show:

"Scrutiny Progress"

but do NOT represent this as a percentage.

Use factual module states instead.

==================================================
9. SCRUTINY MODULE MAP
==================================================

Create a section:

"Scrutiny Modules"

This is the navigation layer into the screens already built.

Show cards/list rows for:

01
Automated Pre-check

Status:
Completed

OPEN

02
Scrutiny Route

Status:
Enhanced Review

OPEN

03
Land / Plot

Status:
Completed

OPEN

04
Building / Planning

Status:
In Review

OPEN

05
Water / Utility / Drainage

Status:
Not Applicable / Not Activated / Pending according to Business DNA

OPEN

06
Cross-form Consistency

Status:
2 Issues

OPEN

07
Regulatory Dependencies

Status:
1 Pending

OPEN

08
Consolidated Query

Status:
Draft / Sent / No Open Query

OPEN

09
Query / Response History

Status:
2 Responses

OPEN

10
Delta Re-scrutiny

Status:
Not Required / Required

OPEN

Do not invent module states.

Use the actual configured/application data.

==================================================
10. MODULE STATES
==================================================

Use existing status language.

Possible module states:

Not Started
In Review
Completed
Needs Verification
Query Required
Pending
Not Applicable
Not Activated
No Issues
Issues Found
Resubmission Received
Review Required

Do not create a separate universal status model for scrutiny modules.

==================================================
11. NOT APPLICABLE
==================================================

Respect the existing adaptive Business DNA logic.

Example:

Water Required:
NO

Then:

Water / Utility / Drainage

Status:
Not Applicable

Do NOT show:

Missing
Pending
Incomplete

Do NOT make the officer investigate a service that the regulatory engine determined is not applicable.

If:

Water Required:
UNKNOWN

then:

Water / Utility / Drainage

Status:
Needs Verification

If:

Water Required:
YES

and source:

MIDC

then the relevant MIDC utility module can be:

Active / Pending / In Review

according to configuration.

==================================================
12. SCRUTINY MODULE CARD DESIGN
==================================================

Each module should show:

Module Name
Current Status
Last Updated
Issues / Deficiencies count if applicable
Responsible Desk where relevant
Action

Example:

BUILDING / PLANNING

Status:
In Review

Issues:
2

Last Updated:
18 Sep 2026

Action:
Continue Review

[OPEN]

For:

Cross-form Consistency

show:

Status:
Issues Found

Issues:
1

[OPEN]

For:

Regulatory Dependencies

show:

Status:
1 Pending

[OPEN]

==================================================
13. ATTENTION PANEL
==================================================

Create:

"Requires Attention"

This should surface the most immediate operational items.

Examples:

2 unresolved Building / Planning issues

1 cross-form inconsistency

1 dependency pending

1 entrepreneur response received

1 delta requires re-scrutiny

The list should be factual.

Each item links directly to the relevant module.

Example:

"Plot Area mismatch"

→ M16

"Corrected Building Plan submitted"

→ M19 / M13

"Business DNA changed after submission"

→ M20

"Upstream dependency pending"

→ M17

Do not create a new attention workflow.

==================================================
14. RECENT ACTIVITY
==================================================

Create:

"Recent Scrutiny Activity"

Show recent events:

Application submitted
Pre-check completed
Scrutiny started
Query sent
Entrepreneur responded
Resubmission received
Delta detected
Document replaced
Dependency updated
Inspection required

Example:

18 Sep
MIDC-APP-2026-00418
Entrepreneur resubmitted application v2

→ Delta Re-scrutiny required

17 Sep
MIDC-APP-2026-00405
Building Plan v3 uploaded

→ Document review required

Use the same application timeline/event model already established.

Do NOT create a separate event model.

==================================================
15. RESUBMISSION ALERT
==================================================

If an entrepreneur has resubmitted an application:

show a prominent operational item:

"Resubmission Received"

Example:

MIDC-APP-2026-00418

Resubmission:
v2

Previous:
v1

Changed fields:
4

Affected areas:
3

Action:

"Open Delta Re-scrutiny"

→ M20

This should be one of the most visible actions on the Scrutiny page.

==================================================
16. QUERY RESPONSE ALERT
==================================================

If an entrepreneur has responded to a query:

show:

"Entrepreneur Response Received"

Example:

Query:
QRY-2026-0042

Deficiency:
DEF-2026-0092

Response:
Received

Evidence:
Building Plan v3

Action:

"Review Response"

→ M19

Do not create a duplicate response screen.

==================================================
17. DOCUMENT REVIEW ALERT
==================================================

If a new document has been submitted:

show:

"New / Replaced Document"

Example:

Building Plan

v2 → v3

Related deficiency:
DEF-2026-0092

Action:

"Review Document"

→ M13

Again, do not recreate M13.

==================================================
18. CROSS-FORM ALERT
==================================================

If M16 has detected an inconsistency:

show:

"Cross-form inconsistency"

Example:

Plot Area

Master:
5,200 m²

Fire:
4,600 m²

Status:
Needs Officer Review

Action:

"Review Consistency"

→ M16

Do not resolve the inconsistency from the Scrutiny landing page.

==================================================
19. DEPENDENCY ALERT
==================================================

If M17 has an unresolved dependency:

show:

"Dependency requires attention"

Example:

MPCB CTE

Status:
Pending

Relationship:
Upstream external dependency

Action:

"View Dependency"

→ M17

MIDC must not receive external-department approval controls here.

==================================================
20. SCRUTINY WORKFLOW STRIP
==================================================

Add a compact horizontal workflow/navigation strip.

Example:

PRE-CHECK
✓

ROUTE
✓

LAND / PLOT
✓

BUILDING
●

CONSISTENCY
!

DEPENDENCY
○

QUERY
○

DELTA
○

INSPECTION
○

DECISION
○

Use icons + text.

This is NOT a progress percentage.

It is a navigation/status map.

Each stage can be clicked to open the relevant existing screen.

==================================================
21. DO NOT MAKE IT A LINEAR WIZARD
==================================================

IMPORTANT:

The Scrutiny page must NOT force:

Pre-check
→ Land
→ Building
→ Water
→ Consistency
→ Dependency
→ Query
→ Delta

as a rigid wizard.

The actual applicable sequence depends on:

service
Business DNA
dependency configuration
current application state
resubmission
inspection requirement

The Scrutiny page is a workbench.

The officer can enter the applicable module directly.

==================================================
22. SERVICE-SPECIFIC MODULE ACTIVATION
==================================================

Only show relevant MIDC service modules as active.

Example:

Current Service:
Building / Planning

Active:

Building / Planning
Cross-form
Dependencies
Documents
Query
Delta

Water / Utility may be:

Not Activated

if Business DNA/configuration does not activate it.

Do not display irrelevant modules as mandatory work.

==================================================
23. APPLICATION-SPECIFIC SCRUTINY NAVIGATION
==================================================

The Scrutiny page must remember:

Application ID
Current Service
Current Desk
Current Scrutiny Stage

When the officer opens M14:

M14 should know:

Application:
MIDC-APP-2026-00418

Service:
Building / Planning

Officer:
Current officer

When the officer returns to Scrutiny:

return to the same application context.

Do not reset the application selection.

==================================================
24. QUEUE VS SCRUTINY TAB
==================================================

IMPORTANT:

Do not duplicate the entire M03 Queue inside this page.

M03 answers:

"Which applications are in my operational queue?"

Scrutiny answers:

"What scrutiny work needs to happen on those applications?"

Therefore:

Queue:
Application list

Scrutiny:
Application + scrutiny stage + actionable scrutiny modules

The Scrutiny page can show a filtered subset of applications, but it should not become another generic inbox.

==================================================
25. SEARCH
==================================================

Provide:

Search Application ID
Search Business
Search Service
Search Estate
Search Plot

This should quickly locate an application within the officer's permitted scrutiny scope.

Do not replace the dedicated M04 Application Search.

Provide:

"Advanced Search"

→ M04

==================================================
26. FILTERS
==================================================

Provide lightweight scrutiny filters:

Current Scrutiny Stage
Service
Action Required
Needs Verification
Query Required
Resubmission
Delta Review
Inspection Required
SLA Risk

Do not add arbitrary quality scores.

==================================================
27. SLA CONTEXT
==================================================

Show:

SLA Due
SLA Risk
SLA Breached

Use the shared SLA model.

Where possible distinguish:

Department processing time
Entrepreneur response time
Inspection waiting
External dependency waiting
Total elapsed

Do not blame a particular officer for SLA risk.

==================================================
28. "CONTINUE WHERE YOU LEFT OFF"
==================================================

If the officer previously opened an application:

show:

"Continue Scrutiny"

Example:

MIDC-APP-2026-00418

Last opened:
Building / Planning

Last action:
Reviewing Built-up Area

CTA:

Continue

This should navigate directly to the existing screen/context.

Do not create another saved-work system.

Use the existing application/workflow context if available.

==================================================
29. OFFICER ACTION SUMMARY
==================================================

Create a compact:

"Next Actions"

panel.

Example:

1.
Review 2 Building / Planning issues

OPEN M14

2.
Resolve 1 cross-form mismatch

OPEN M16

3.
Review entrepreneur response

OPEN M19

4.
Perform delta re-scrutiny

OPEN M20

5.
View upstream dependency

OPEN M17

This is navigation.

It does not perform the actual scrutiny action.

==================================================
30. NO FINAL DECISION
==================================================

Do not place:

Approve
Reject

as prominent Scrutiny page actions.

The Scrutiny tab leads toward the final decision workflow.

Final decisions belong to:

M25 — Decision Workspace
M26 — Approval / Rejection / Correction Record

The Scrutiny page may show:

"Decision Ready"

as a factual workflow state if all configured scrutiny requirements are satisfied.

But do not allow final decision here.

==================================================
31. SCRUTINY COMPLETION
==================================================

Do not use:

"87% Scrutiny Complete"

or similar arbitrary progress.

Instead show:

Pre-check:
Completed

Land:
Completed

Building:
In Review

Cross-form:
1 Issue

Dependency:
1 Pending

Query:
Awaiting Response

This gives factual state without inventing a score.

==================================================
32. DECISION READINESS
==================================================

If the configured workflow indicates all required scrutiny activities are complete:

show:

"Scrutiny requirements satisfied"

and:

"Ready for configured next workflow step"

Possible next step:

Inspection
Decision
Query
Other configured workflow

Do not automatically label:

"Approved"

and do not automatically open M25 unless the officer chooses.

==================================================
33. APPLICATION OVERVIEW LINK
==================================================

Provide:

"View Application Overview"

→ M06

M06 remains the canonical application-level overview.

The Scrutiny tab should not duplicate the complete M06 information architecture.

==================================================
34. BUSINESS DNA LINK
==================================================

Provide:

"View Business DNA"

→ M07

Show only relevant Business DNA summary on the Scrutiny page.

Do not create a second editable Business DNA screen.

==================================================
35. TIMELINE LINK
==================================================

Provide:

"View Application Timeline"

→ M08

The Scrutiny page may show recent scrutiny events but should not become a second timeline.

==================================================
36. AUTOMATED PRE-CHECK LINK
==================================================

If pre-check has not been completed:

show:

"Pre-check Required"

→ M09

If completed:

show:

"Pre-check Completed"

→ M09

M09 remains the detailed pre-check interface.

==================================================
37. SCRUTINY ROUTE LINK
==================================================

Show:

Scrutiny Route:
Standard / Enhanced / Inspection-heavy / configured route

CTA:

"View Route"

→ M10

Do not reproduce the route explanation in full.

==================================================
38. LAND / PLOT LINK
==================================================

Show:

Land / Plot

Status:
Completed / In Review / Query / Needs Verification

→ M11

Parameter-level issues:

→ M12

Land documents:

→ M13

==================================================
39. BUILDING / PLANNING LINK
==================================================

Show:

Building / Planning

Status:
In Review

Issues:
2

CTA:

"Open Building / Planning"

→ M14

Do not duplicate M14's workbench.

==================================================
40. WATER / UTILITY LINK
==================================================

Show only when applicable.

Possible:

Active
Pending
Completed
Not Applicable
Needs Verification

→ M15

Respect Business DNA.

==================================================
41. CROSS-FORM LINK
==================================================

Show:

Cross-form Consistency

Status:
Issues Found

Issues:
1

CTA:

"Review Consistency"

→ M16

==================================================
42. DEPENDENCY LINK
==================================================

Show:

Regulatory Dependencies

Status:
1 Pending

CTA:

"View Dependencies"

→ M17

==================================================
43. QUERY LINK
==================================================

Show:

Consolidated Query

Status:
Awaiting Entrepreneur Response

Deficiencies:
2

CTA:

"Open Query"

→ M18

History:

"View Query History"

→ M19

==================================================
44. DELTA LINK
==================================================

If resubmission exists:

show:

Delta Re-scrutiny

Status:
Required

Changed:
4

Affected:
3

CTA:

"Open Delta"

→ M20

If no delta:

show:

Delta:
Not Required

==================================================
45. INSPECTION LINK
==================================================

If inspection is required:

show:

Inspection

Status:
Pending

CTA:

"Open Inspection Queue"

→ M21

If scheduled:

show:

Inspection Scheduled

CTA:

"View Inspection Plan"

→ M22

If completed:

show:

Inspection Completed

CTA:

"View Inspection"

→ M23

If observation exists:

show:

Observation / Re-inspection

CTA:

"View Observation"

→ M24

==================================================
46. SCRUTINY TAB DEFAULT STATE
==================================================

When the officer first clicks the Scrutiny tab, do NOT show an empty page.

Default view:

"My Scrutiny Work"

with the applications requiring attention.

If there are no applications within the officer's scope:

show:

"No applications currently require scrutiny."

Then provide:

View Queue
Search Applications

Do not show an empty blank canvas.

==================================================
47. DEMO DATA
==================================================

Populate the prototype with realistic sample applications so the Scrutiny tab is visibly functional.

Example:

MIDC-APP-2026-00418
Aster Precision Components Pvt. Ltd.
Building / Planning
In Review
Action:
Review Building Parameters

MIDC-APP-2026-00405
Example Manufacturing Pvt. Ltd.
Land / Plot
Query Required
Action:
Review Entrepreneur Response

MIDC-APP-2026-00391
Example Utilities Pvt. Ltd.
Water / Utility
Resubmitted
Action:
Delta Re-scrutiny

MIDC-APP-2026-00372
Example Industrial Pvt. Ltd.
Building / Planning
Inspection Pending
Action:
Open Inspection

These are prototype-safe examples.

==================================================
48. INTERACTION REQUIREMENT
==================================================

Make the Scrutiny tab actually navigable.

Click:

OPEN

on an application

→ open the application-specific scrutiny context.

Click:

Building / Planning

→ M14

Click:

Land / Plot

→ M11

Click:

Parameter issue

→ M12

Click:

Document issue

→ M13

Click:

Cross-form issue

→ M16

Click:

Dependency

→ M17

Click:

Query

→ M18

Click:

Query History

→ M19

Click:

Delta

→ M20

Click:

Inspection

→ M21/M22/M23/M24 according to state.

Do not create placeholder dead-end buttons.

==================================================
49. BREADCRUMB / BACK NAVIGATION
==================================================

When entering a detailed scrutiny module from this page:

show:

MIDC Department
>
Scrutiny
>
Application
>
[Module]

Example:

MIDC Department
>
Scrutiny
>
MIDC-APP-2026-00418
>
Building / Planning

Back:

"Back to Scrutiny"

must return to the correct Scrutiny application context.

Do not return blindly to the dashboard.

==================================================
50. VISUAL STRUCTURE
==================================================

The page should be structured as:

HEADER

↓

SCRUTINY SUMMARY

↓

MY SCRUTINY WORK

[Application table]

↓

REQUIRES ATTENTION

[Action items]

↓

SELECTED APPLICATION / CONTINUE SCRUTINY

[Application context]

↓

SCRUTINY MODULES

[Pre-check]
[Route]
[Land]
[Building]
[Water]
[Consistency]
[Dependencies]
[Query]
[Delta]
[Inspection]

↓

RECENT SCRUTINY ACTIVITY

Use existing components.

Do not make this visually overloaded.

==================================================
51. RESPONSIVE / AUTO LAYOUT
==================================================

Use Auto Layout.

Cards and tables should resize correctly.

Do not create fixed-width panels that break when:

- Business names are long
- Service names are long
- Marathi text is used
- Deficiency text is long

Maintain existing EKATMA spacing.

==================================================
52. ACCESSIBILITY
==================================================

Every status must use:

Icon + text.

Do not rely on colour alone.

Every module card must have:

Module name
Status
Action

Keyboard focus must be visible.

Use existing accessibility strip and GIGW-compatible patterns.

==================================================
53. AI / AUTOMATION BOUNDARY
==================================================

Automation may:

- identify applications needing scrutiny
- determine configured current workflow stage
- surface unresolved issues
- surface new responses
- detect resubmissions
- surface delta review
- surface dependency changes
- identify inspection requirements
- recommend navigation to the relevant module

Automation must NOT:

- approve
- reject
- decide statutory applicability outside configured rules
- invent requirements
- silently change scrutiny states
- close deficiencies
- mark inspection passed
- make the final decision

The Scrutiny page is a navigation and operational workbench.

==================================================
54. CRITICAL RULE
==================================================

The detailed scrutiny screens already exist.

DO NOT recreate their internal functionality.

The Scrutiny tab must instead act as:

CENTRAL SCRUTINY WORKBENCH

It should make the existing M09-M20 screens discoverable, connected and actionable.

The user should be able to enter the Scrutiny tab and immediately understand:

"These are the applications I need to work on."

Then:

"This is what needs attention."

Then:

"This is the exact scrutiny module I need."

Then:

OPEN

→ existing detailed scrutiny screen.

==================================================
55. FINAL EXPERIENCE
==================================================

The final interaction should feel like:

SCRUTINY TAB

"14 applications require scrutiny"

↓

Select:

MIDC-APP-2026-00418

↓

See:

Building / Planning
In Review

Cross-form
1 issue

Dependency
1 pending

Query
No open query

Delta
Not required

Inspection
Not yet required

↓

Select:

Building / Planning

↓

OPEN EXISTING M14 SCREEN

↓

Officer performs actual scrutiny there.

When the officer returns:

SCRUTINY TAB

should reflect the updated status.

Do not create a second scrutiny system.

The Scrutiny tab is the command centre that connects the scrutiny system you have already built.