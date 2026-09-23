Create M10 — MIDC Scrutiny Route / Explainability.

IMPORTANT:
Continue from the existing EKATMA Figma file.

Do NOT regenerate Phase 0.
Do NOT redesign the government header, footer, sidebar, typography, colors, spacing, accessibility strip, breadcrumbs, tables, buttons, status primitives, or overall visual language.

Reuse the existing MIDC Department shell and reusable application components created in M01–M09.

This screen sits directly after:

M06 Application Overview
→ M07 Business DNA
→ M08 Application Timeline
→ M09 Automated Pre-check
→ M10 Scrutiny Route / Explainability
→ M11 Service Scrutiny Workbench

The purpose of M10 is to explain HOW the application was routed for scrutiny.

It is NOT an approval screen.
It is NOT a rejection screen.
It is NOT a legal risk-scoring screen.
It is NOT a numeric AI risk score.

--------------------------------------------------
1. PRIMARY PURPOSE
--------------------------------------------------

Create an operational, configurable and explainable scrutiny-routing workspace.

The screen should answer four questions:

1. What scrutiny route has been assigned?
2. Why was this route assigned?
3. Which configured factors triggered the route?
4. What review depth and inspection treatment does the route require?

The department workflow supports these prototype route types:

- Standard Review
- Enhanced Review
- Inspection-heavy Route

These should be presented as CONFIGURABLE WORKFLOW ROUTES.

Do not imply that these labels are permanent statutory MIDC categories unless backed by a configured source.

The screen should communicate:

"Scrutiny route determines how deeply the application is reviewed. It does not automatically approve or reject the application."

Use this as a prominent explanatory information panel near the top of the page.

--------------------------------------------------
2. PAGE SHELL
--------------------------------------------------

Use the existing MIDC Department shell.

Sidebar:
- Department Home
- My Queue
- Applications
- Scrutiny
- Inspections
- Queries / Deficiencies
- Decisions
- SLA & Escalations
- Grievances
- Regulatory Assistant
- Analytics
- Regulatory Changes
- Workload
- Audit / History

Breadcrumb:

Department Home
→ Applications
→ Application Overview
→ Automated Pre-check
→ Scrutiny Route

Header context should show:

Application ID
Business / Project
MIDC Service
Current Application State
Current Desk
Office / Region
SLA State

Also show:

Scrutiny Route: Enhanced Review

if that is the prototype route for the sample application.

Do not create a separate login, department selector, office selector or role selector.

The officer's Department / Office / Desk / Role come from the authenticated context.

--------------------------------------------------
3. TOP ROUTE SUMMARY
--------------------------------------------------

Create a strong but compact route-summary section.

Title:

SCRUTINY ROUTE

Primary route:

ENHANCED REVIEW

Under it show:

Why this route?

Configured scrutiny factors detected from the application record and configured routing rules.

Then show three concise attributes:

Review depth
Enhanced

Inspection
Conditional

Routing basis
Configured Scrutiny Factors

Do NOT show:

Risk Score
AI Score
Risk = 82%
Probability of rejection
Approval probability
Pass percentage
Confidence score

Do not use a green "approved" style simply because the route has been determined.

The route only describes the depth/path of scrutiny.

--------------------------------------------------
4. CONFIGURED SCRUTINY FACTORS
--------------------------------------------------

Create a major section titled exactly:

CONFIGURED SCRUTINY FACTORS

Add supporting text:

"These factors are configuration-driven conditions used to determine the scrutiny route. They are not independent legal findings."

Display the triggered factors as structured rows/cards.

Prototype factors may include:

- Service type
- Project scale / complexity
- New construction
- Land / plot inconsistency
- Unresolved prerequisite
- Major cross-form mismatch
- Hazardous / fire business context
- Material change from previous submission
- Inspection requirement
- Other configured MIDC rule

Do NOT imply that every factor is always used.

The prototype should show only the factors actually triggered for the sample application.

For example:

✓ Service type
Land / Plot

✓ New construction
Proposed construction indicated in application

⚠ Land / plot inconsistency
Plot area differs between submitted application and existing project record

⚠ Unresolved prerequisite
Related prerequisite currently pending

○ Inspection requirement
Inspection condition configured for this service

Use the existing system status primitives where possible.

Avoid introducing a new risk-status vocabulary.

--------------------------------------------------
5. FACTOR ROW STRUCTURE
--------------------------------------------------

Each factor should be a reusable component.

For every triggered factor show:

Factor
Result
Observed condition
Source
Rule / configuration
Last evaluated
Action

Example:

LAND / PLOT INCONSISTENCY

Result:
Warning

Observed condition:
Plot area in current application differs from the Master Project Dossier value.

Source:
Master Project Dossier + Current MIDC Application

Rule:
Configured consistency rule: Plot Area

Last evaluated:
23 Sep 2026, 10:42 AM

Action:
View details

The wording must remain factual.

Do not write:

"Application is risky."

Do not write:

"Applicant is likely to be rejected."

Do not write:

"AI detected fraud."

Do not write:

"High-risk business."

Instead describe the actual condition detected.

--------------------------------------------------
6. WHY THIS ROUTE?
--------------------------------------------------

Create a dedicated section:

WHY THIS ROUTE?

Explain the route using the triggered configured factors.

Example prototype explanation:

"Enhanced Review was selected because the application matches configured scrutiny conditions involving new construction, a land/plot consistency issue and a pending prerequisite."

Make clear that this is an explanation of the configured routing logic.

Add:

View routing logic

This opens a detail drawer/modal.

Do not describe the route as an AI decision.

If an automated system is used, phrase it as:

"System-applied configured routing rule"

or

"Configured routing rule evaluated"

rather than:

"AI decided the application requires Enhanced Review."

--------------------------------------------------
7. ROUTING LOGIC DETAIL DRAWER
--------------------------------------------------

Create a reusable drawer/modal that opens when the officer selects:

View routing logic

The drawer should contain:

RULE / CONFIGURATION

Rule name
Configured Scrutiny Route Rule

Route produced
Enhanced Review

Conditions evaluated
- Service type
- Project stage
- New construction
- Land consistency
- Dependency state
- Cross-form consistency
- Inspection requirement

Triggered conditions
Show only the conditions that actually matched.

Source / configuration
Show the source or configuration reference available to the system.

Rule version
Example:
MIDC Scrutiny Configuration v1.2

Evaluated at
23 Sep 2026, 10:42 AM

Result
Enhanced Review

Do not fabricate a government circular, GR number, statutory section, legal threshold, or official MIDC rule.

If no source-backed legal reference exists, label the rule:

"Configured workflow rule"

not:

"Official MIDC legal risk rule."

--------------------------------------------------
8. ROUTE DEFINITIONS
--------------------------------------------------

Create a small informational section explaining the three configurable route types.

STANDARD REVIEW

Use when the configured workflow indicates the application can follow the standard scrutiny path.

Show:

Review depth:
Standard

Inspection:
According to configured service requirements

ENHANCED REVIEW

Use when configured scrutiny factors require additional review depth.

Show:

Review depth:
Enhanced

Inspection:
Conditional / according to configured requirements

INSPECTION-HEAVY ROUTE

Use when inspection is a significant part of the configured scrutiny workflow.

Show:

Review depth:
Inspection-heavy

Inspection:
Required / according to configured requirement

IMPORTANT:

Do not define permanent numeric thresholds for these routes.

Do not say:

"Projects above ₹X crore automatically become Enhanced Review."

Do not invent land-area thresholds.

Do not invent employee thresholds.

Do not invent hazardous-industry scoring.

Do not invent an AI formula.

These values must remain configurable.

--------------------------------------------------
9. INSPECTION REQUIREMENT
--------------------------------------------------

Create a dedicated subsection:

INSPECTION REQUIREMENT

Show one of:

Yes
No
Conditional

For the prototype, use:

Conditional

if the route depends on a configured inspection rule.

Also show:

Reason:
Inspection requirement configured for this service / project context.

If "Yes":

Inspection required

Link:
Open Inspection Planning

This should lead to M21 / M22 according to the existing prototype navigation.

If "Conditional":

Show the condition without inventing the legal threshold.

Example:

"Inspection may be required according to the configured service workflow."

If "No":

Show:

"No inspection requirement currently identified by the configured workflow."

Do not let this section become a final statutory determination if the configuration only indicates a workflow condition.

--------------------------------------------------
10. RELATIONSHIP WITH M09 AUTOMATED PRE-CHECK
--------------------------------------------------

Show a compact upstream context panel:

PREVIOUS SYSTEM CHECK

Automated Pre-check
M09

Machine-verified:
X

Warnings:
Y

Needs officer judgment:
Z

Link:

View Automated Pre-check

The purpose is to make the transition explicit:

M09 identifies objective conditions.

M10 uses configured routing rules to determine the applicable scrutiny route.

M11 performs the actual service scrutiny.

Do not duplicate the entire M09 screen.

--------------------------------------------------
11. RELATIONSHIP WITH BUSINESS DNA
--------------------------------------------------

Add a small context panel:

BUSINESS DNA CONTEXT

Show only the relevant Business DNA attributes that influenced routing.

Possible examples:

Project type
Manufacturing

Project stage
New Construction

MIDC involvement
YES

MIDC estate
Sample MIDC Estate

Plot
P-104

Activity context
Configured industry/activity

Do not reconstruct the full Business DNA here.

Add:

View Business DNA

→ M07

The source of truth remains the Business DNA / Master Project Dossier.

M10 only consumes relevant context.

--------------------------------------------------
12. RELATIONSHIP WITH CROSS-FORM CONSISTENCY
--------------------------------------------------

If cross-form inconsistency triggered routing, show:

CROSS-FORM CONSISTENCY

Status:
Warning

Example:

Plot Area
Master Project Dossier:
10,000 sq. ft.

Current Application:
10,500 sq. ft.

Status:
Mismatch detected

Link:

Investigate in Cross-form Consistency

→ M16

Do not decide which value is legally correct on M10.

M10 only explains that the configured routing condition was triggered.

The officer investigates the issue in M16.

--------------------------------------------------
13. RELATIONSHIP WITH DEPENDENCIES
--------------------------------------------------

If an unresolved prerequisite triggered routing, show:

DEPENDENCY CONTEXT

Example:

Prerequisite:
External department dependency

Status:
Pending

Effect on route:
Included as a configured scrutiny factor

Link:

View Dependency Graph

→ M17

External departments such as:

- MPCB
- Fire
- DISH
- Boiler
- utilities
- sector-specific authorities

may appear as dependency context.

MIDC must NOT receive controls to approve, reject or modify another department's decision.

M10 only shows dependency state relevant to routing.

--------------------------------------------------
14. MATERIAL CHANGE CONTEXT
--------------------------------------------------

If a material change from a previous submission triggered routing, show:

CHANGE DETECTED

Previous submission:
Resubmission #1

Changed data:
Plot area
Building area
Project stage

Source:
Business DNA / Application version history

Routing effect:
Configured scrutiny factor triggered

Link:

View Delta Re-scrutiny

→ M20

Do not state:

"Change causes rejection."

Do not state:

"Change is legally material."

Instead:

"Change was detected and matched a configured scrutiny-routing condition."

The officer determines the actual regulatory significance during scrutiny.

--------------------------------------------------
15. OFFICER JUDGMENT SEPARATION
--------------------------------------------------

Make a strong visual distinction between:

SYSTEM / CONFIGURATION

and

OFFICER JUDGMENT

SYSTEM / CONFIGURATION may show:

- configured route
- matched factors
- source
- rule version
- timestamp
- objective condition
- dependency state
- consistency mismatch
- detected change

OFFICER JUDGMENT may show:

- review interpretation
- whether additional evidence is needed
- whether a query is required
- whether inspection should proceed where discretion is permitted
- service-specific scrutiny findings

Do NOT allow the system-generated route to appear as an officer's statutory conclusion.

Add an officer note area:

OFFICER REVIEW NOTE

Placeholder:

"Record any observation about the assigned scrutiny route or factors."

This note should be clearly marked as officer-entered.

--------------------------------------------------
16. ACTIONS
--------------------------------------------------

Primary CTA:

PROCEED TO SCRUTINY

This opens:

M11 — Generic MIDC Scrutiny Workbench

Secondary actions:

View Automated Pre-check
View Business DNA
View Cross-form Consistency
View Dependencies
View Application Timeline
View Delta Changes

Do NOT provide:

Approve
Reject
Issue Certificate
Final Decision

Those actions belong to later decision screens.

--------------------------------------------------
17. ROUTE OVERRIDE / MANUAL CHANGE
--------------------------------------------------

If the prototype includes manual route changes, do NOT create an unrestricted dropdown.

Instead make it permission-controlled and explainable.

Possible action:

Request / Change Scrutiny Route

If selected, require:

Current route
Requested route
Reason
Officer note
Supporting evidence if applicable

Show:

"Route changes are recorded in audit history."

Do not imply that every officer can change the route.

Permission must come from the authenticated officer context.

If route override is not configured for the prototype, omit this action entirely.

--------------------------------------------------
18. AUDITABILITY
--------------------------------------------------

Every routing result should be traceable.

Show:

Created / evaluated at
Rule version
Configuration version
Triggered factors
Previous route if changed
Current route
Officer action
Reason for any manual change

Link:

View Audit History

→ M38

Never silently overwrite a previous routing result.

If the route changes after resubmission or a Business DNA change, preserve the previous route in history.

--------------------------------------------------
19. STATUS / STATE BOUNDARIES
--------------------------------------------------

Do not introduce a new canonical application state for:

Standard Review
Enhanced Review
Inspection-heavy Route

These are SCRUTINY ROUTE labels.

They are not replacements for the canonical application-state dictionary.

The underlying application can still be:

SUBMITTED
DOCUMENT_SCRUTINY
INITIAL_SCRUTINY
TECHNICAL_SCRUTINY
QUERY_RAISED
CORRECTION_REQUIRED
RESUBMITTED
INSPECTION_PENDING
etc.

Show the canonical application state separately from the scrutiny route.

Example:

Application State:
INITIAL_SCRUTINY

Scrutiny Route:
ENHANCED REVIEW

This distinction is important.

--------------------------------------------------
20. NO NUMERIC RISK SCORE
--------------------------------------------------

Do NOT create:

Risk = 76
Risk score = 8.2
AI confidence = 94%
Approval probability = 72%
Risk meter
Traffic-light risk gauge
"High risk application"

Do not replace numeric risk scoring with a disguised score such as:

Low / Medium / High Risk

unless such a classification is explicitly configured and source-backed.

The intended model is:

CONFIGURED FACTORS
        ↓
CONFIGURED ROUTING RULE
        ↓
SCRUTINY ROUTE
        ↓
EXPLAINABLE REVIEW DEPTH

not:

APPLICATION DATA
        ↓
AI RISK SCORE
        ↓
APPROVAL DECISION

--------------------------------------------------
21. RAG / REGULATORY ASSISTANT BOUNDARY
--------------------------------------------------

If Regulatory Assistant or RAG functionality is surfaced on this page, keep it secondary.

It may:

- retrieve relevant regulations
- explain a configured rule
- show source documents
- cite the relevant rule/configuration
- help the officer understand why a factor exists

It must NOT:

- invent a legal requirement
- create a new routing rule
- approve
- reject
- make a statutory finding
- replace officer judgment

Label retrieved information clearly as:

Regulatory Reference
or
Configured Rule Reference

not:

AI Decision.

--------------------------------------------------
22. SAMPLE PROTOTYPE DATA
--------------------------------------------------

Use realistic but fictional sample data.

Example:

Application ID:
MIDC-APP-2026-00418

Business:
Aster Precision Components Pvt. Ltd.

Service:
Land / Plot

Project Stage:
New Construction

MIDC Estate:
Sample Industrial Estate

Plot:
P-104

Current State:
INITIAL_SCRUTINY

Current Desk:
Land / Plot Scrutiny

SLA:
Approaching

Scrutiny Route:
ENHANCED REVIEW

Triggered factors:

1. Service type
Land / Plot

2. New construction
Yes

3. Land / plot inconsistency
Plot area mismatch detected

4. Unresolved prerequisite
Pending dependency

5. Inspection requirement
Conditional

Clearly indicate that the sample data is prototype data.

--------------------------------------------------
23. EMPTY / EDGE STATES
--------------------------------------------------

Design states for:

No configured scrutiny factors

Show:

"No configured scrutiny factors were triggered for this application."

Route:
Standard Review

---

Route requires officer judgment

Show:

"The available data does not fully determine the configured route. Officer review is required."

---

Configuration unavailable

Show:

"Scrutiny routing configuration is unavailable. Do not infer a route."

This is important.

The system must not silently invent a route when configuration is missing.

---

Route changed after resubmission

Show:

Previous:
Standard Review

Current:
Enhanced Review

Reason:
New configured factor triggered after resubmission

Link:
View Delta Re-scrutiny

---

Inspection requirement unavailable

Show:

"Inspection requirement could not be determined from the available configuration."

Do not automatically set Yes or No.

--------------------------------------------------
24. VISUAL HIERARCHY
--------------------------------------------------

The screen should feel like an operational explainability workspace.

Priority order:

1. Application context
2. Scrutiny Route
3. Why this route?
4. Configured Scrutiny Factors
5. Rule / source explanation
6. Inspection requirement
7. Related Business DNA / consistency / dependency context
8. Officer note
9. Proceed to Scrutiny

Do not turn every item into a large dashboard card.

Prefer:

- structured panels
- compact status rows
- expandable factor rows
- source/reference drawers
- clear section headers
- tables where appropriate
- restrained use of status indicators
- consistent spacing
- existing EKATMA design system

--------------------------------------------------
25. ACCESSIBILITY
--------------------------------------------------

Follow the existing EKATMA accessibility system.

Ensure:

- status is not communicated by color alone
- icons have text labels
- sufficient contrast
- keyboard-accessible expandable rows
- clear focus states
- readable table headers
- accessible drawer/modal behavior
- English / Marathi compatibility
- no information depends only on color

--------------------------------------------------
26. FINAL SCREEN STRUCTURE
--------------------------------------------------

The final M10 screen should approximately follow:

SIDEBAR

BREADCRUMB

APPLICATION HEADER
Application ID
Business
Service
Current State
Desk
Office / Region
SLA

↓

SCRUTINY ROUTE

ENHANCED REVIEW

Why this route?

Review depth: Enhanced
Inspection: Conditional
Routing basis: Configured Scrutiny Factors

↓

INFORMATION PANEL

"Scrutiny route determines how deeply the application is reviewed.
It does not automatically approve or reject the application."

↓

CONFIGURED SCRUTINY FACTORS

Factor
Observed condition
Result
Source
Rule
Last evaluated
View details

↓

WHY THIS ROUTE?

Configured routing explanation

View routing logic

↓

INSPECTION REQUIREMENT

Yes / No / Conditional
Reason
View Inspection Planning

↓

RELATED CONTEXT

Business DNA
Cross-form consistency
Dependencies
Change history

↓

OFFICER REVIEW NOTE

Officer-entered observation

↓

ACTIONS

View Pre-check
View Business DNA
View Consistency
View Dependencies
View Delta Changes

PRIMARY:
Proceed to Scrutiny

→ M11

Do not include statutory approval/rejection actions here.