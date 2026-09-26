Continue the EXISTING EKATMA Entrepreneur-side Figma implementation.

============================================================
EKATMA — ENTREPRENEUR SIDE
E09 — REGULATORY JOURNEY OVERVIEW
E13 — DEPENDENCY GRAPH
============================================================

IMPORTANT:

E03–E08 are already completed.

This prompt creates ONLY:

E09 — Regulatory Journey Overview
E13 — Dependency Graph

These are HERO FEATURES of EKATMA.

Do NOT create:
- full Requirement Detail page yet
- individual application forms
- application submission
- payment
- document centre
- query response
- inspection centre
- compliance centre
- department officer screens
- grievance screens
- full RAG assistant
- incentive pages

A Requirement Detail destination may be created as a PLACEHOLDER only.

============================================================
1. PRESERVE ALL COMPLETED WORK EXACTLY
============================================================

DO NOT redesign, regenerate, restyle, rename or remove:

- Phase 0
- Public Landing
- Authentication
- Registration
- Header
- Footer
- Accessibility strip
- Government of Maharashtra branding
- EKATMA branding
- Existing typography
- Existing colors
- Existing spacing
- Existing buttons
- Existing cards
- Existing badges
- Existing form controls
- Existing breadcrumbs
- Existing accessibility behavior
- Existing bilingual behavior

Do NOT modify:

E02 — My Businesses
E03 — Create Business / Project
E04 — Basic Requirements
E05 — Adaptive Business Questionnaire
E06 — Business Profile Review
E07 — Master Project Dossier
E08 — Data Provenance

Continue using the same authenticated Entrepreneur portal shell.

============================================================
2. ENTRY INTO THIS PHASE
============================================================

Existing flow:

E05
Adaptive Business Discovery
        ↓
E06
Business Profile Review
        ↓
Confirm Profile
        ↓
Confirmed Business DNA Version
        ↓
Regulatory Applicability Evaluation
        ↓
Dependency Evaluation
        ↓
Personalised Regulatory Journey Generation
        ↓
E09 — Regulatory Journey Overview

E09 must therefore be generated from:

CONFIRMED BUSINESS DNA
+
REGULATORY APPLICABILITY
+
DEPARTMENT / SERVICE RULES
+
DEPENDENCY GRAPH
+
CURRENT APPLICATION STATES

Do NOT make E09 another questionnaire.

============================================================
3. ONE JOURNEY MODEL — NON-NEGOTIABLE
============================================================

E09 and E13 are TWO VIEWS of the SAME underlying journey.

Conceptually:

PERSONALISED REGULATORY JOURNEY DATA
              ↓
      ┌───────┴────────┐
      ↓                ↓
E09 Journey View   E13 Dependency View

E09 answers:

“What do I need to do, in what stage, and what can I do now?”

E13 answers:

“What depends on what, what is blocking what, and what unlocks next?”

Do NOT create independent statuses or independent dependency logic
for E09 and E13.

============================================================
4. MULTI-DEPARTMENT ARCHITECTURE
============================================================

The journey must support MANY departments and authorities.

Examples include:

MIDC

MPCB

Fire

DISH / Factory Safety

Utilities

Directorate of Boilers

Legal Metrology

Planning Authorities

Local Authorities

Sector-Specific Authorities

Future Maharashtra Departments

Do NOT build E09 around only MIDC + MPCB.

The component architecture must remain department-agnostic.

============================================================
5. FUNDAMENTAL JOURNEY MODEL
============================================================

Conceptually:

ONE BUSINESS / PROJECT
        ↓
MANY REGULATORY REQUIREMENTS
        ↓
MANY DEPARTMENTS
        ↓
MANY SERVICES
        ↓
DEPENDENCIES
        ↓
SEQUENTIAL + PARALLEL + CONDITIONAL ROUTES
        ↓
PROJECT-SPECIFIC JOURNEY

A journey requirement/node should conceptually support:

Requirement / Node ID

Department

Service

Journey Stage

Applicability

Journey Display State

Dependency State

Application State where application exists

Required Action

SLA where submitted

Documents

Inspection State

Next Milestone

Do not expose internal IDs unnecessarily.

============================================================
6. REGULATORY APPLICABILITY VS JOURNEY STATE
============================================================

Keep these concepts separate.

REGULATORY APPLICABILITY may be:

Applicable

Conditional

Not Applicable

Needs Verification

JOURNEY DISPLAY STATE may be:

Ready

In Progress

Waiting on Dependency

Action Required

Under Department Review

Inspection Scheduled

Approved

Rejected

Conditional

Needs Verification

Not Applicable

Do not combine them into one generic Status enum.

============================================================
7. APPLICATION STATE ALSO REMAINS SEPARATE
============================================================

If a requirement has already become an application, it may later have
canonical application states such as:

Draft

Ready to Submit

Submitted

Fee Confirmed

Document Scrutiny

Initial Scrutiny

Technical Scrutiny

Query Raised

Correction Required

Resubmitted

Inspection Pending

Inspection Scheduled

Final Decision

Approved

Rejected

E09 does NOT need to display this complete internal status list everywhere.

It should translate the current state into concise journey-facing language.

Example:

TECHNICAL_SCRUTINY
        ↓
Journey display:
Under Department Review

============================================================
8. CREATE E09 — REGULATORY JOURNEY OVERVIEW
============================================================

Create a NEW authenticated Entrepreneur page:

E09 — REGULATORY JOURNEY OVERVIEW

Purpose:

Give the entrepreneur one understandable view of:

- what requirements apply
- what can be done now
- what is already in progress
- what is blocked
- what requires entrepreneur action
- what has been approved
- what will unlock next

============================================================
9. E09 PAGE HEADER
============================================================

Breadcrumb:

Home
>
My Businesses
>
[Selected Business]
>
Regulatory Journey

Page title:

REGULATORY JOURNEY

Supporting text:

“Your personalised regulatory journey based on the confirmed Business Profile
and applicable regulatory rules.”

Do not use marketing language.

============================================================
10. PROJECT CONTEXT STRIP
============================================================

Show compact context:

PROJECT
ABC Pharma Manufacturing Unit

INDUSTRY
Pharmaceutical Manufacturing

STAGE
Pre-Establishment

LOCATION
Thane, Maharashtra

BUSINESS DNA
Version 1

OPTIONAL ACTIONS:

View Business Profile

View Master Project Dossier

View Dependencies

Do not make this area oversized.

============================================================
11. BUSINESS / PROJECT SWITCHER
============================================================

If the reusable project switcher already exists,
include it in the authenticated context.

Example:

Current Project
ABC Pharma Manufacturing Unit ▼

Switching project must switch the ENTIRE journey context.

Do not mix requirements from multiple projects.

============================================================
12. JOURNEY SUMMARY
============================================================

At the top of E09 show concise summary metrics:

TOTAL IDENTIFIED REQUIREMENTS

READY NOW

IN PROGRESS

BLOCKED

ACTION REQUIRED

APPROVED

Example prototype values:

Total Identified
12

Ready Now
3

In Progress
2

Blocked
2

Action Required
1

Approved
4

These are journey summary counts.

Do NOT create charts or analytics.

============================================================
13. SUMMARY COUNT LOGIC
============================================================

Summary counts must derive from journey/node states.

Example:

Ready Now
= nodes currently unlocked and available for action

Blocked
= applicable nodes waiting on unresolved dependency

Action Required
= nodes where entrepreneur has an immediate action

Approved
= approved/completed regulatory nodes

Do not manually hard-code summary values independently from node states.

============================================================
14. JOURNEY STAGES
============================================================

Organise the journey into exactly these high-level stages:

1. LAND

2. ESTABLISHMENT

3. CONSTRUCTION

4. UTILITIES

5. PRE-OPERATION

6. OPERATIONS

7. COMPLIANCE

8. GROWTH

These are user-facing lifecycle stages.

============================================================
15. STAGE 1 — LAND
============================================================

May include applicable requirements such as:

- land acquisition / allotment
- possession
- land-use actions
- MIDC land-related service
- Non-MIDC land route
- land permission where applicable

Do not hard-code all of these for every project.

Only show generated nodes.

============================================================
16. STAGE 2 — ESTABLISHMENT
============================================================

May include:

- MPCB Consent to Establish
- environmental clearance where applicable
- other establishment-stage requirements
- sector-specific establishment requirement

The architecture must support many authorities.

============================================================
17. STAGE 3 — CONSTRUCTION
============================================================

May include:

- Building / Planning
- provisional Fire stage where configured
- construction-related NOCs
- factory plan / industrial planning where applicable

Dependencies determine availability.

============================================================
18. STAGE 4 — UTILITIES
============================================================

May include:

- Power
- HT-related utility route
- Water
- MIDC Water
- groundwater route
- drainage
- other utility connections

These may run in parallel where rules allow.

============================================================
19. STAGE 5 — PRE-OPERATION
============================================================

May include:

- final Fire-related requirement
- MPCB Consent to Operate
- DISH / Factory-related requirement
- Boiler requirement
- sector-specific pre-operation permissions
- Legal Metrology where relevant
- inspections

Do not hard-code exact services for all projects.

============================================================
20. STAGE 6 — OPERATIONS
============================================================

May include:

- operating approvals
- certificates
- active licences
- operational conditions
- registrations

============================================================
21. STAGE 7 — COMPLIANCE
============================================================

May include:

- renewal
- returns
- reporting
- approval conditions
- scheduled inspections
- recurring compliance obligations

E09 may preview this stage.

Do not build the full Compliance Centre here.

============================================================
22. STAGE 8 — GROWTH
============================================================

May include:

- expansion
- modification
- diversification
- amendment
- capacity increase
- new product
- new machinery
- new building
- revised approvals
- incentive opportunities

Do not build the expansion workflow here.

============================================================
23. STAGE PRESENTATION
============================================================

Use a clean vertical or left-to-right lifecycle layout.

Recommended:

LAND
  ↓

ESTABLISHMENT
  ↓

CONSTRUCTION
  ↓

UTILITIES
  ↓

PRE-OPERATION
  ↓

OPERATIONS
  ↓

COMPLIANCE
  ↓

GROWTH

Within each stage show requirement cards/nodes.

Do NOT create an unreadable spider graph.

============================================================
24. STAGE HEADER
============================================================

Each stage should have:

Stage Number

Stage Name

Compact status summary

Example:

02 — ESTABLISHMENT

1 In Progress
1 Conditional

Allow collapse / expand where useful.

============================================================
25. REQUIREMENT NODE COMPONENT
============================================================

Create a reusable REQUIREMENT / JOURNEY NODE component.

Each node supports:

DEPARTMENT

SERVICE

CURRENT JOURNEY STATE

DEPENDENCY STATE

REQUIRED ACTION

SLA if submitted

DOCUMENTS

INSPECTION STATE

NEXT MILESTONE

============================================================
26. NODE — DEPARTMENT
============================================================

Example:

MPCB

MIDC

Fire

DISH

Utilities

Boilers

Planning Authority

Sector Authority

Keep department display generic.

Do not create completely different card structures for different departments.

============================================================
27. NODE — SERVICE
============================================================

Example:

Consent to Establish

Building Plan

Provisional Fire Review

Water Connection

Factory-related Service

Boiler-related Service

The service title should be more prominent than department metadata.

============================================================
28. NODE DISPLAY STATES
============================================================

Support reusable visual variants for:

READY

IN PROGRESS

WAITING ON DEPENDENCY

ACTION REQUIRED

UNDER DEPARTMENT REVIEW

INSPECTION SCHEDULED

APPROVED

REJECTED

CONDITIONAL

NEEDS VERIFICATION

NOT APPLICABLE

Use:

icon
+
text
+
color

Never color alone.

============================================================
29. READY
============================================================

Meaning:

Requirement is applicable.

Required prerequisites are satisfied.

Entrepreneur may begin / continue the next action.

Example:

Building Plan

Ready

CTA:

Start / View Requirement

Do not use Start Application if the service may require another preparatory action.

============================================================
30. IN PROGRESS
============================================================

Meaning:

Work has started but is not waiting purely on government review.

Example:

Application Draft

Documents being prepared

Response being prepared

Show next action.

============================================================
31. WAITING ON DEPENDENCY
============================================================

Meaning:

Node is applicable but cannot proceed because a prerequisite is unresolved.

Show:

WAITING ON DEPENDENCY

Dependency:
MPCB Consent to Establish

CTA:

View Dependency

Do not provide an active Start CTA.

============================================================
32. ACTION REQUIRED
============================================================

Meaning:

Entrepreneur action is needed.

Examples:

Upload Document

Respond to Query

Complete Application

Pay Fee where applicable

Review Correction

CTA should communicate the actual next action.

============================================================
33. UNDER DEPARTMENT REVIEW
============================================================

Meaning:

Submitted regulatory record is currently being processed by the relevant
department.

Show where available:

Current processing stage

SLA

Do not imply the entrepreneur can accelerate or approve it.

============================================================
34. INSPECTION SCHEDULED
============================================================

Show:

Inspection Scheduled

Date where available

Inspection type where useful

Department(s)

CTA:

View Inspection

Do not build Inspection Centre yet.

============================================================
35. APPROVED
============================================================

Show:

Approved

Approval / Certificate reference where available

Issue Date

Expiry where applicable

Next Milestone

Example:

CTE Approved

Next:
Building / Planning unlocked

============================================================
36. REJECTED
============================================================

Show:

Rejected

Keep rejection visually serious but not sensational.

Possible information:

Decision Available

Reason / Order available in Requirement Detail

Effect:

Dependent node may become blocked.

Do not remove the rejected node from the journey.

============================================================
37. CONDITIONAL
============================================================

Meaning:

Applicability or progression depends on unresolved factual / regulatory condition.

Show:

Conditional

Condition summary

Example:

“Applicable if groundwater extraction is proposed.”

Do not represent it as Ready until condition is resolved.

============================================================
38. NEEDS VERIFICATION
============================================================

Meaning:

Business DNA or regulatory interpretation requires verification before
the requirement can be conclusively classified/progressed.

Show:

Needs Verification

Optional reason:

“Land-use status requires verification.”

============================================================
39. NOT APPLICABLE
============================================================

Show either:

- collapsed/secondary node
or
- hidden by default with “Show Not Applicable”

Do NOT display it as blocked.

Do NOT display it as incomplete.

============================================================
40. NODE DETAIL — REQUIRED ACTION
============================================================

Every active node should clearly answer:

WHAT SHOULD I DO NEXT?

Examples:

Start application

Complete draft

Upload missing document

Respond to query

Wait for department review

Prepare for inspection

No action currently required

============================================================
41. NODE DETAIL — SLA
============================================================

Only show SLA where meaningful, normally after submission / processing starts.

Example:

SLA
12 days remaining

or:

Processing Time
5 days elapsed

Do not show arbitrary SLA before it exists.

============================================================
42. NODE DETAIL — DOCUMENTS
============================================================

Show concise document status such as:

Documents
6 / 8 Ready

or:

2 Documents Need Attention

Do not embed the full Document Centre.

============================================================
43. NODE DETAIL — INSPECTION
============================================================

Possible values:

Not Required

Not Scheduled

Pending

Scheduled

Completed

Needs Follow-Up

Keep Inspection State separate from overall journey status.

============================================================
44. NODE DETAIL — NEXT MILESTONE
============================================================

Every important node should show what happens next.

Examples:

Next:
CTE Decision

Next:
Building Plan becomes available

Next:
Inspection

Next:
Certificate Issuance

Next:
Compliance obligations generated

============================================================
45. LOCKED NODE DESIGN
============================================================

A dependency-blocked node should be visibly unavailable but readable.

Example:

BUILDING / PLANNING

Status:
Waiting on Dependency

Dependency:
MPCB CTE Decision

Message:

“This requirement becomes available after the configured prerequisite
is resolved.”

CTA:

View Dependency

Do NOT use disabled styling so faint that the content becomes inaccessible.

============================================================
46. UNLOCKED NODE DESIGN
============================================================

When prerequisite completes:

transition the node:

WAITING ON DEPENDENCY
        ↓
READY

Show subtle state change.

Example:

✓ Prerequisite completed

Building / Planning is now ready.

============================================================
47. PARALLEL NODES
============================================================

Support multiple nodes becoming available simultaneously.

Example:

CTE Approved
        ↓
Building Plan
+
Provisional Fire

Then later, where rules allow:

Power
+
Water
+
Conditional NOCs

can proceed in parallel.

Visually communicate parallelism without a spider graph.

============================================================
48. RECOMMENDED PARALLEL VISUAL
============================================================

Use stage columns / grouped cards.

Example:

UTILITIES
────────────────────────────

Power
READY

Water
READY

Conditional NOC A
CONDITIONAL

Conditional NOC B
NOT APPLICABLE

Do not draw dozens of crossing connector lines in E09.

============================================================
49. BASELINE DEMO DEPENDENCY — NON-NEGOTIABLE
============================================================

For the main prototype/demo, use EXACTLY this baseline sequence:

LAND STAGE
Complete

        ↓

MPCB
CONSENT TO ESTABLISH

Status:
UNDER DEPARTMENT REVIEW

        ↓

BUILDING / PLANNING

Status:
WAITING ON DEPENDENCY / LOCKED

Dependency:
MPCB CTE

        ↓

MPCB CTE
APPROVED

        ↓

BUILDING PLAN
READY

+
PROVISIONAL FIRE STAGE
READY

        ↓

POWER
READY / can proceed in parallel where allowed

+

WATER
READY / can proceed in parallel where allowed

+

CONDITIONAL NOCs
conditional / ready according to configured rule

============================================================
50. CRITICAL BASELINE RULE
============================================================

In this main demonstration:

DO NOT show:

Building Plan
Ready

while:

MPCB CTE
is still Under Review.

The agreed baseline is:

CTE unresolved
        ↓
Building / Planning locked

CTE approved
        ↓
Building / Planning unlocks

This prototype sequence must remain consistent with the agreed A–Z master flow.

============================================================
51. BASELINE IS CONFIGURABLE, NOT UNIVERSAL
============================================================

IMPORTANT:

Do NOT encode:

“MPCB CTE always blocks Building Plan for every possible project”

as a fixed UI rule.

Instead conceptualise:

DEPENDENCY RULE
configured for this journey/service/project

The baseline demo uses this dependency.

Other projects/services may have different dependency graphs.

============================================================
52. DO NOT HARDCODE DEPENDENCY LOGIC INTO CARDS
============================================================

Cards should receive dependency state from the underlying journey model.

Conceptually:

Requirement Node
        +
Dependency Rules
        +
Current Upstream States
        ↓
Node Availability

Not:

“If Department = MPCB then hard-code Building locked.”

============================================================
53. DEPENDENCY TYPES
============================================================

The architecture should support:

HARD PREREQUISITE

SOFT / INFORMATIONAL DEPENDENCY

CONDITIONAL DEPENDENCY

PARALLEL / NO DEPENDENCY

Do not necessarily expose these technical terms prominently to entrepreneurs.

============================================================
54. HARD PREREQUISITE
============================================================

Example baseline:

MPCB CTE Approved

required before:

Building / Planning becomes Ready.

Until then:

Waiting on Dependency

============================================================
55. CONDITIONAL DEPENDENCY
============================================================

Example:

A particular NOC is required only if:

a Business DNA condition is true.

If condition unresolved:

Conditional / Needs Verification

If condition false:

Not Applicable

============================================================
56. PARALLEL SERVICE
============================================================

No prerequisite relationship between two currently active services.

Both may show:

Ready

simultaneously.

============================================================
57. REJECTED / BLOCKING BEHAVIOR
============================================================

If an upstream prerequisite is rejected:

Downstream dependent nodes remain blocked.

Example:

MPCB CTE
Rejected

        ↓

Building / Planning

Blocked

Reason:
Required prerequisite was not approved.

Do NOT make dependent nodes disappear.

============================================================
58. CORRECTION VS REJECTION
============================================================

Do not treat:

Correction Required

as:

Rejected.

If upstream application is in correction/resubmission:

dependent node remains waiting on unresolved prerequisite,
unless configured otherwise.

============================================================
59. CONDITIONAL NODE BEHAVIOR
============================================================

Example:

Groundwater Permission

Conditional

Reason:
Only applicable if groundwater is selected as a water source.

If Business DNA says:

Water Source = MIDC

then:

Groundwater route
Not Applicable

============================================================
60. NEEDS VERIFICATION NODE BEHAVIOR
============================================================

Example:

Land-use Permission

Needs Verification

Reason:

Agricultural land-use state requires rule verification.

This may block only the downstream nodes configured to depend on it.

Do not globally block the whole journey.

============================================================
61. E09 STAGE STATUS
============================================================

Each journey stage may show an aggregate state.

Example:

LAND
Complete

ESTABLISHMENT
In Progress

CONSTRUCTION
Blocked

UTILITIES
Upcoming

PRE-OPERATION
Upcoming

Do not create a single legal “project approval status.”

This is only a journey-stage summary.

============================================================
62. E09 FILTERS
============================================================

Add useful lightweight filters:

All Requirements

Ready Now

Action Required

In Progress

Blocked

Approved

Needs Verification

Optionally:

Department

Do not overload the page.

============================================================
63. SEARCH
============================================================

Add:

Search requirements

Placeholder:

“Search by service or department”

============================================================
64. VIEW TOGGLE
============================================================

Allow:

Journey View

Dependency View

Journey View
→ E09

Dependency View
→ E13

This reinforces that they are two views of the same data.

============================================================
65. E09 NODE CLICK
============================================================

Clicking any active requirement node:

        ↓

REQUIREMENT DETAIL
PLACEHOLDER

Do NOT build full Requirement Detail in this prompt.

The later Requirement Detail should eventually show:

- Department
- Service
- Why it applies
- Status
- Dependencies
- Required action
- Documents
- SLA
- Queries
- Inspection
- Decision
- timeline

But only create a placeholder destination now.

============================================================
66. LOCKED NODE CLICK
============================================================

Locked nodes should still be clickable.

Click:

        ↓

Requirement Detail placeholder

which can explain:

Why locked?

Waiting for which prerequisite?

What will unlock it?

Do not simply disable all interaction.

============================================================
67. APPROVED NODE CLICK
============================================================

Approved node click should later support:

Approval details

Certificate

Conditions

Compliance

Dependency effect

For now:
Requirement Detail placeholder only.

============================================================
68. E09 VISUAL PRINCIPLE
============================================================

E09 should feel like:

A guided regulatory roadmap.

NOT:

- BPMN software
- network graph software
- developer dependency graph
- project management Gantt chart
- giant kanban board
- spider diagram

The entrepreneur must be able to understand it quickly.

============================================================
69. CREATE E13 — DEPENDENCY GRAPH
============================================================

Create:

E13 — DEPENDENCY GRAPH

Purpose:

Provide a more explicit dependency-oriented view of the SAME Regulatory Journey.

This is still entrepreneur-facing.

It should be understandable without technical graph knowledge.

============================================================
70. E13 PAGE HEADER
============================================================

Breadcrumb:

Home
>
My Businesses
>
[Selected Business]
>
Regulatory Journey
>
Dependencies

Title:

DEPENDENCY GRAPH

Supporting text:

“See which regulatory requirements depend on others and what will unlock next.”

============================================================
71. E13 CONTEXT
============================================================

Show:

Project

Current Journey Stage

Business DNA Version

Journey Version where useful

Do not expose unnecessary internal technical identifiers.

============================================================
72. E13 GRAPH TYPE
============================================================

Use a CLEAN STAGE-BASED DIRECTED ACYCLIC GRAPH (DAG).

Layout should follow the lifecycle:

LAND
        ↓
ESTABLISHMENT
        ↓
CONSTRUCTION
        ↓
UTILITIES
        ↓
PRE-OPERATION
        ↓
OPERATIONS
        ↓
COMPLIANCE
        ↓
GROWTH

Within stages, show parallel nodes horizontally.

============================================================
73. DO NOT CREATE A SPIDER GRAPH
============================================================

NON-NEGOTIABLE.

Avoid:

- circular node layouts
- random network layouts
- large criss-crossing arrows
- hundreds of visible edges
- force-directed graphs
- tiny unreadable labels

The dependency graph must remain understandable.

============================================================
74. E13 GRAPH NODE
============================================================

Use the SAME requirement status/component language as E09.

Graph node contains at minimum:

Department

Service

Status

Optionally:

Required Action

Keep graph nodes more compact than E09 cards.

============================================================
75. E13 EDGES
============================================================

Use directional connectors:

Prerequisite
        →
Dependent Requirement

Use clear arrow direction.

============================================================
76. EDGE TYPES
============================================================

Support visual distinction for:

Hard prerequisite

Conditional dependency

Optional/informational relation if later needed

Do not create too many edge styles.

Recommended:

Solid connector:
required dependency

Dashed connector:
conditional dependency

Keep a small legend.

============================================================
77. STAGE LANES
============================================================

Recommended visual:

┌───────────────────────────┐
│ LAND                      │
│ [Land Complete]           │
└────────────┬──────────────┘
             ↓
┌───────────────────────────┐
│ ESTABLISHMENT             │
│ [MPCB CTE — Under Review] │
└────────────┬──────────────┘
             ↓
┌───────────────────────────┐
│ CONSTRUCTION              │
│ [Building — Locked]       │
│ [Provisional Fire — Lock] │
└────────────┬──────────────┘
             ↓
...

Use stage lanes to limit visual complexity.

============================================================
78. BASELINE GRAPH — INITIAL STATE
============================================================

Create a demo state:

LAND
Land Stage Complete
        ↓

ESTABLISHMENT
MPCB CTE
UNDER DEPARTMENT REVIEW
        ↓

CONSTRUCTION
Building / Planning
WAITING ON DEPENDENCY

Provisional Fire
WAITING ON DEPENDENCY

Do NOT display them as Ready.

============================================================
79. BASELINE GRAPH — AFTER CTE APPROVAL
============================================================

Create another graph variant / prototype state:

LAND
Complete
        ↓

MPCB CTE
APPROVED
        ↓

┌─────────────────────────┬──────────────────────────┐
↓                         ↓
BUILDING PLAN             PROVISIONAL FIRE
READY                     READY
└─────────────┬───────────┴───────────────┬──────────┘
              ↓                           ↓
        downstream journey continues

Then, where allowed:

POWER
READY

WATER
READY

CONDITIONAL NOC
CONDITIONAL / READY

show as parallel nodes.

============================================================
80. STATE TRANSITION DEMO
============================================================

Prototype:

MPCB CTE
Under Department Review

Building Plan
Locked

        ↓
simulate CTE Approved
        ↓

MPCB CTE
Approved

Building Plan
Ready

Provisional Fire
Ready

The same change must also reflect in E09.

============================================================
81. E09 ↔ E13 SYNCHRONISATION
============================================================

NON-NEGOTIABLE.

If a node is:

Approved in E09

it must be:

Approved in E13.

If a node is:

Waiting on Dependency in E09

it must also appear dependency-blocked in E13.

If a dependency unlocks in E13:

the corresponding E09 node becomes Ready.

Do not create contradictory prototype states.

============================================================
82. E13 NODE CLICK
============================================================

Click node:

        ↓

Requirement Detail
PLACEHOLDER

Use same destination as E09.

============================================================
83. E13 DEPENDENCY CLICK
============================================================

Where practical, clicking a connector / dependency indicator may show:

Dependency

Prerequisite:
MPCB CTE

Dependent:
Building Plan

Requirement:
Prerequisite must be resolved before this service can proceed.

Do not build a complex graph inspector.

============================================================
84. WHY IS THIS BLOCKED?
============================================================

For blocked nodes, provide a visible explanation:

WHY IS THIS BLOCKED?

Waiting for:

MPCB — Consent to Establish

Current state:
Under Department Review

This prevents the graph from being cryptic.

============================================================
85. WHAT UNLOCKS NEXT?
============================================================

For approved prerequisite nodes optionally show:

UNLOCKS

Building Plan

Provisional Fire

This should remain concise.

============================================================
86. MULTIPLE PREREQUISITES
============================================================

Support a node with more than one prerequisite.

Example conceptual case:

Requirement X requires:

Requirement A
AND
Requirement B

Until both resolved:

Waiting on Dependencies

Show:

1 of 2 prerequisites complete

Do not invent this relationship in the baseline demo unless needed.

Architecture should support it.

============================================================
87. ANY-OF / CONDITIONAL DEPENDENCY FUTURE SUPPORT
============================================================

Reserve architecture for more configurable logic such as:

A AND B

A OR B

IF condition → C

But do not expose Boolean rule syntax to entrepreneurs.

============================================================
88. DEPENDENCY ENGINE IS CONFIGURABLE
============================================================

Conceptually:

SERVICE RULE CONFIGURATION
        ↓
DEPENDENCY RULES
        ↓
PROJECT-SPECIFIC GRAPH
        ↓
NODE AVAILABILITY

Do not encode the dependency layout manually per screen.

============================================================
89. BUSINESS DNA CAN AFFECT GRAPH
============================================================

Example:

Water Source = Groundwater

may activate:

Groundwater-related conditional node.

Water Source = MIDC

may make that node:

Not Applicable

The graph must therefore be regenerated/recalculated from Business DNA.

============================================================
90. BUSINESS DNA CHANGE EFFECT
============================================================

If Business DNA changes later:

Current Journey
        ↓
Re-evaluate Rules
        ↓
Recalculate Dependencies
        ↓
Compare Old vs New Journey

Possible later effects:

New Node

Removed Node

Node becomes Conditional

Dependency changes

Document requirement changes

Compliance changes

Do not build full impact analysis now.

============================================================
91. JOURNEY VERSIONING
============================================================

Reserve architecture for:

Journey Version

Example:

Journey V1
generated from
Business DNA V1

Later:

Business DNA V2
        ↓
Journey V2

Do not silently replace V1 conceptually.

============================================================
92. NODE SOURCE / EXPLAINABILITY
============================================================

A future node must be explainable by:

Business DNA fields

Regulatory rule

Dependency rule

Rule version

Do not build the full explainability screen now.

============================================================
93. RAG / ASSISTANT INTEGRATION POINT
============================================================

Add optional lightweight:

Ask Assistant

in E09 or Requirement Detail entry.

Questions may include:

“Why is this approval shown?”

“Why is Building Plan locked?”

“What must happen before this unlocks?”

“What does CTE mean?”

Do NOT create the full assistant in this prompt.

============================================================
94. RAG BOUNDARY
============================================================

RAG can:

Explain

Retrieve GR / Rule

Explain dependency

Explain document

Explain terminology

RAG cannot:

change dependency state

approve requirement

unlock node

invent requirement

override Rule Engine

============================================================
95. RULE ENGINE IS AUTHORITATIVE FOR APPLICABILITY
============================================================

Keep:

BUSINESS DNA
        ↓
REGULATORY RULE ENGINE
        ↓
APPLICABILITY
        ↓
DEPENDENCY ENGINE
        ↓
JOURNEY

separate from:

RAG
        ↓
EXPLANATION

============================================================
96. NODE SLA BEHAVIOR
============================================================

Only show SLA for nodes where processing has started / an application exists.

Examples:

MPCB CTE

Under Department Review

SLA:
12 days remaining

Building Plan

Waiting on Dependency

SLA:
Not started

Do not create fake SLA countdown for locked nodes.

============================================================
97. ACTION REQUIRED PRIORITY
============================================================

Action Required nodes should be visually easier to notice.

Example:

MPCB CTE

ACTION REQUIRED

Respond to Department Query

Due:
26 Sep

Do not turn all alerts red.

Use accessible hierarchy.

============================================================
98. APPROVED NODE DEPENDENCY EFFECT
============================================================

When a node becomes Approved:

1. mark node approved

2. identify dependent nodes

3. recalculate dependent states

4. unlock those whose prerequisites are now satisfied

5. update E09 summary

6. update E13 graph

============================================================
99. REJECTED NODE DEPENDENCY EFFECT
============================================================

When prerequisite becomes Rejected:

1. keep rejected node visible

2. dependent node remains blocked

3. show blocking reason

4. do not mark dependent node rejected

5. do not remove dependent node

Example:

CTE
Rejected

Building Plan
Blocked because prerequisite unresolved/failed

============================================================
100. CONDITIONAL NODE RESOLUTION
============================================================

Example:

Groundwater Route

Conditional

Business DNA update:
Water Source → MIDC

Then:

Groundwater Route
Not Applicable

It should disappear from active-action counts.

============================================================
101. NEEDS VERIFICATION EFFECT
============================================================

A Needs Verification node may:

block dependent nodes only if configured as prerequisite.

Do not globally freeze the journey.

============================================================
102. STAGE COMPLETION
============================================================

A stage should be considered complete based on relevant applicable nodes,
not Not Applicable nodes.

Example:

LAND contains:

Land Allotment
Approved

Agricultural Permission
Not Applicable

Then:

LAND
may be Complete.

Do not require Not Applicable nodes to be “completed.”

============================================================
103. JOURNEY SUMMARY UPDATE
============================================================

When node state changes:

summary numbers should conceptually update.

Example:

Before CTE Approval:

Ready Now: 1
In Progress: 1
Blocked: 2

After CTE Approval:

Approved: +1
Blocked: -2
Ready Now: +2

Do not hard-code static counts.

============================================================
104. E09 EMPTY / GENERATION STATE
============================================================

If journey generation is still underway:

show:

Generating Regulatory Journey

Evaluating Requirements
✓

Evaluating Dependencies
…

Building Journey
…

Do not show empty stage cards.

============================================================
105. E09 NEEDS PROFILE INPUT STATE
============================================================

If a critical Business DNA field prevents journey generation:

show:

Additional Business Information Required

CTA:

Review Business Profile

Do not generate misleading journey nodes.

============================================================
106. E09 NEEDS VERIFICATION STATE
============================================================

If some nodes remain uncertain:

the journey can still render confirmed nodes.

Show uncertain node:

Needs Verification

Do not block the entire journey unless the dependency demands it.

============================================================
107. NOT APPLICABLE VISIBILITY
============================================================

Default E09:

prioritise active applicable journey.

Provide:

Show Not Applicable

optional toggle/filter.

This prevents clutter.

============================================================
108. MANY DEPARTMENTS — VISUAL RULE
============================================================

Do NOT assign completely different visual styles to every department.

Department identity may use:

label

icon if available

compact accent treatment

But node state remains visually more important than department branding.

============================================================
109. DO NOT USE DEPARTMENT COLOR AS STATUS
============================================================

Example:

MPCB cannot always be green.

MIDC cannot always be blue.

Status must be independently understandable.

============================================================
110. RESPONSIVE E09
============================================================

Desktop:

Stage groups may use 2–3 node columns where readable.

Tablet:

Reduce columns.

Mobile:

Stack:

Stage
Node
Node
Next Stage

Do not horizontally compress nodes until unreadable.

============================================================
111. RESPONSIVE E13
============================================================

Desktop:

show stage-based DAG.

Tablet:

reduce horizontal parallel spread.

Mobile:

use simplified vertical dependency sequence.

Allow tap:

View Dependencies

to inspect parallel relationships.

Do not require wide horizontal scrolling through a massive graph.

============================================================
112. ACCESSIBILITY
============================================================

Preserve:

keyboard navigation

visible focus

logical reading order

accessible node buttons

accessible stage headings

text + icon status

adequate contrast

English / Marathi compatibility

usable zoom

no color-only dependency meaning

============================================================
113. LEGEND
============================================================

E13 may include a compact legend:

Solid Line
Required Dependency

Dashed Line
Conditional Dependency

Status indicators:

Ready
In Progress
Blocked
Approved
Action Required

Keep legend small.

============================================================
114. DO NOT OVERLOAD E13
============================================================

Do not put:

full document list

full SLA history

full queries

full inspections

full decision details

inside dependency nodes.

Those belong in Requirement Detail.

============================================================
115. PROTOTYPE SAMPLE PROJECT
============================================================

Use:

ABC Pharma Manufacturing Unit

Industry:
Pharmaceutical Manufacturing

Stage:
Pre-Establishment

Location:
Thane, Maharashtra

Business DNA:
Version 1

============================================================
116. DEMO JOURNEY — LAND
============================================================

LAND STAGE

MIDC / Land Context
APPROVED / COMPLETE

Example display:

MIDC Land / Possession
Approved

Next Milestone:
Establishment

============================================================
117. DEMO JOURNEY — ESTABLISHMENT
============================================================

MPCB

Consent to Establish

Status:
UNDER DEPARTMENT REVIEW

SLA:
12 days remaining

Required Action:
No action currently required

Next Milestone:
Decision

============================================================
118. DEMO JOURNEY — CONSTRUCTION WHILE CTE PENDING
============================================================

BUILDING / PLANNING

Status:
WAITING ON DEPENDENCY

Dependency:
MPCB Consent to Establish

Message:

“Available after the configured CTE prerequisite is resolved.”

Do NOT show Ready.

------------------------------------------------------------

PROVISIONAL FIRE

Status:
WAITING ON DEPENDENCY

Dependency:
MPCB CTE / configured establishment prerequisite

Do NOT show Ready in the baseline pending state.

============================================================
119. DEMO AFTER CTE APPROVED
============================================================

MPCB CTE

APPROVED

Certificate:
Available

        ↓

BUILDING / PLANNING

READY

Action:
Start Requirement

        +

PROVISIONAL FIRE

READY

Action:
Start Requirement

============================================================
120. DEMO UTILITIES PARALLEL STATE
============================================================

Where baseline rules allow after prerequisite resolution:

POWER

READY

------------------------------------------------------------

WATER

READY

------------------------------------------------------------

CONDITIONAL NOC

CONDITIONAL

Condition:
Based on project configuration

Visually show these as parallel opportunities.

============================================================
121. PRE-OPERATION EXAMPLE PLACEHOLDERS
============================================================

Later stage may show example nodes such as:

MPCB CTO
Upcoming / Waiting

Final Fire
Upcoming

DISH / Factory
Conditional

Boiler
Conditional

Do not assert all are applicable.

Use only when supported by prototype Business DNA.

============================================================
122. COMPLIANCE PREVIEW
============================================================

For approved requirements later:

show concise future:

Compliance obligations will appear here after approvals create them.

Do not build E24/E25-style compliance centre now.

============================================================
123. REQUIREMENT DETAIL PLACEHOLDER CONTRACT
============================================================

Every node click should point to ONE generic future Requirement Detail
architecture.

Do not create:

MIDC-specific detail page
MPCB-specific detail page
Fire-specific detail page

as separate architectures.

One generic shell should later receive department/service-specific content.

============================================================
124. GENERIC REQUIREMENT DETAIL — FUTURE FIELDS
============================================================

Reserve architecture for:

Requirement

Department

Service

Why It Applies

Applicability

Status

Dependency

Required Action

Application ID if created

SLA

Documents

Queries

Inspection

Decision

Timeline

Regulatory Reference

Ask Assistant

Do NOT build it in this prompt.

============================================================
125. E09 / E13 COMPONENT REUSE
============================================================

Create/reuse components for:

Journey Stage

Journey Summary Metric

Requirement Node

Node Status

Department Label

Required Action

Dependency Badge

Locked State

Unlocked State

Parallel Node Group

Conditional Node

Needs Verification Node

Not Applicable Node

Rejected / Blocking Node

Approved Node

SLA Indicator

Document Summary

Inspection Summary

Next Milestone

Dependency Connector

Dependency Legend

Stage Lane

Filter Bar

Search

View Toggle

Use Auto Layout.

============================================================
126. DO NOT CREATE DUPLICATE NODE COMPONENTS
============================================================

Prefer one reusable Requirement Node with variants.

Variants may include:

Ready

In Progress

Waiting on Dependency

Action Required

Under Review

Inspection Scheduled

Approved

Rejected

Conditional

Needs Verification

Not Applicable

Do not create unrelated cards with inconsistent layouts.

============================================================
127. DATA CONSISTENCY BETWEEN VIEWS
============================================================

Each requirement must conceptually have one canonical record.

Example:

Requirement ID:
REQ-MPCB-CTE-001

E09 reads it.

E13 reads it.

Requirement Detail later reads it.

Do not expose this ID to user unless useful.

============================================================
128. DEPENDENCY RECORD
============================================================

Conceptually dependencies should be stored separately from node status.

Example:

DEPENDENCY

From:
MPCB CTE

To:
Building Plan

Type:
Required Prerequisite

Condition:
CTE resolved/approved according to configured workflow

Do not encode dependency only as descriptive text inside the Building card.

============================================================
129. NODE AVAILABILITY
============================================================

Conceptually derive:

NODE APPLICABILITY
+
DEPENDENCIES
+
CURRENT UPSTREAM STATES
+
CURRENT BUSINESS DNA
        ↓
NODE AVAILABILITY

This architecture must be visually reflected.

============================================================
130. DO NOT SHOW TECHNICAL GRAPH ENGINE TERMS
============================================================

Do not show:

DAG

Topological Sort

Edge ID

Node ID

Boolean Rule

Graph Traversal

to entrepreneurs.

Those are implementation concepts only.

============================================================
131. FUTURE DEPARTMENT PACK COMPATIBILITY
============================================================

A future department must be able to plug into the same journey simply by
providing:

Department

Service

Applicable Rule

Journey Stage

Dependencies

Required Documents

Possible Inspection

Decision / Condition model

Do NOT redesign E09/E13 for every future department.

============================================================
132. MIDC IS NOT THE ARCHITECTURE
============================================================

MIDC is one department pack.

MPCB is another.

Fire another.

DISH another.

Boilers another.

Legal Metrology another.

The journey architecture belongs to EKATMA, not to any one department.

============================================================
133. FUTURE SERVICE EXAMPLE
============================================================

If Legal Metrology is later applicable:

it should simply appear as:

Department:
Legal Metrology

Service:
Configured Service

Stage:
Pre-Operation / Operations as configured

State:
Ready / Conditional / etc.

No new journey architecture should be needed.

============================================================
134. PROFILE CHANGE SUPPORT
============================================================

Preserve compatibility with E03–E08 change logic.

If Business DNA changes:

show later:

Journey Update Available

Do not silently overwrite the existing journey.

Full impact analysis is later.

============================================================
135. ACTIVE APPLICATION PROTECTION
============================================================

If journey recalculation affects an active application:

the system must not silently remove the node.

Future behavior may classify:

Still Applicable

Potential Amendment

New Requirement

No Longer Applicable Prospectively

Needs Review

Do not implement full delta here.

============================================================
136. NO LEGAL ELIGIBILITY INVENTION
============================================================

Do not create regulatory requirements solely because they look plausible.

For prototype content:

use the agreed baseline example.

Other nodes should be clearly presented as demo/configurable examples.

============================================================
137. E09 FINAL QUALITY CHECK
============================================================

Before completing E09 verify:

[ ] Many departments supported

[ ] 8 lifecycle stages exist

[ ] Stage-based journey is readable

[ ] Total Identified shown

[ ] Ready Now shown

[ ] In Progress shown

[ ] Blocked shown

[ ] Action Required shown

[ ] Approved shown

[ ] Summary derived from node state

[ ] Search exists

[ ] Filters exist

[ ] Department filter supported if appropriate

[ ] Requirement Node reusable

[ ] Department shown

[ ] Service shown

[ ] State shown

[ ] Dependency shown

[ ] Required Action shown

[ ] SLA shown only when relevant

[ ] Document summary supported

[ ] Inspection state supported

[ ] Next milestone supported

[ ] Ready supported

[ ] In Progress supported

[ ] Waiting on Dependency supported

[ ] Action Required supported

[ ] Under Department Review supported

[ ] Inspection Scheduled supported

[ ] Approved supported

[ ] Rejected supported

[ ] Conditional supported

[ ] Needs Verification supported

[ ] Not Applicable supported

============================================================
138. BASELINE CONSISTENCY CHECK
============================================================

Verify the main demo EXACTLY follows:

LAND STAGE COMPLETE

        ↓

MPCB CTE
UNDER REVIEW

        ↓

BUILDING / PLANNING
LOCKED / WAITING ON DEPENDENCY

        ↓

CTE APPROVED

        ↓

BUILDING PLAN
READY

+

PROVISIONAL FIRE
READY

        ↓

POWER
+
WATER
+
CONDITIONAL NOCs

may proceed in parallel where configured.

CRITICAL:

Building Plan must NOT appear Ready while baseline CTE prerequisite remains
Under Review.

============================================================
139. E13 FINAL QUALITY CHECK
============================================================

Verify E13:

[ ] uses SAME journey records as E09

[ ] uses SAME statuses as E09

[ ] stage-based DAG exists

[ ] Land lane exists

[ ] Establishment lane exists

[ ] Construction lane exists

[ ] Utilities lane exists

[ ] Pre-Operation lane exists

[ ] Operations lane exists

[ ] Compliance lane exists

[ ] Growth lane exists

[ ] sequential dependencies visible

[ ] parallel nodes visible

[ ] conditional dependencies supported

[ ] locked nodes visible

[ ] unlock transition demonstrated

[ ] rejected upstream blocks dependent node

[ ] rejected dependent is not incorrectly inferred

[ ] conditional node supported

[ ] Needs Verification supported

[ ] Not Applicable supported

[ ] graph remains readable

[ ] no spider graph

[ ] minimal connector crossings

[ ] node click routes to Requirement Detail placeholder

============================================================
140. CROSS-VIEW CONSISTENCY CHECK
============================================================

Before finishing compare E09 and E13.

For every demo node verify:

MPCB CTE
same state in both

Building Plan
same state in both

Provisional Fire
same state in both

Power
same state in both

Water
same state in both

Conditional NOC
same state in both

No node may be:

Ready in E09

but:

Locked in E13

or vice versa.

============================================================
141. HERO FEATURE UX PRINCIPLE
============================================================

This feature should visually communicate the core EKATMA value:

The entrepreneur should NOT have to manually figure out:

“What approval comes first?”

“What can I apply for now?”

“What is blocking me?”

“What will unlock next?”

“Which services can run together?”

EKATMA should answer these questions from the generated regulatory journey.

============================================================
142. FINAL USER EXPERIENCE
============================================================

The entrepreneur sees:

MY REGULATORY JOURNEY

        ↓

LAND
Complete

        ↓

ESTABLISHMENT

MPCB CTE
Under Department Review

        ↓

CONSTRUCTION

Building Plan
Waiting on MPCB CTE

Provisional Fire
Waiting

        ↓

CTE becomes Approved

        ↓

EKATMA automatically updates:

Building Plan
Ready

Provisional Fire
Ready

        ↓

UTILITIES

Power
Ready

Water
Ready

Conditional NOC
Conditional

        ↓

The entrepreneur always understands:

WHAT CAN I DO NOW?

WHAT IS IN PROGRESS?

WHAT IS BLOCKED?

WHY IS IT BLOCKED?

WHAT WILL UNLOCK NEXT?

============================================================
143. FINAL SYSTEM MODEL
============================================================

CONFIRMED BUSINESS DNA
        ↓
REGULATORY RULE ENGINE
        ↓
REGULATORY APPLICABILITY
        ↓
APPLICABLE REQUIREMENT NODES
        ↓
DEPENDENCY ENGINE
        ↓
PROJECT-SPECIFIC DEPENDENCY GRAPH
        ↓
NODE AVAILABILITY
        ↓
PERSONALISED REGULATORY JOURNEY

Then:

                SAME JOURNEY MODEL
                     ↓
          ┌──────────┴──────────┐
          ↓                     ↓
E09 Journey Overview      E13 Dependency Graph

============================================================
FINAL INSTRUCTION
============================================================

Create ONLY:

E09 — Regulatory Journey Overview

and

E13 — Dependency Graph

Make them two synchronized views of the SAME personalised regulatory journey.

Design for MANY departments and future department packs.

Use the 8 lifecycle stages:

1. Land
2. Establishment
3. Construction
4. Utilities
5. Pre-Operation
6. Operations
7. Compliance
8. Growth

Use a clean stage-based roadmap in E09.

Use a clean stage-based DAG in E13.

Do NOT create an unreadable spider graph.

Demonstrate:
- sequential dependencies
- parallel requirements
- locked/unlocked nodes
- conditional nodes
- Needs Verification
- Not Applicable
- rejected/blocking behavior

Use the agreed baseline demo exactly:

Land Complete
→ MPCB CTE Under Review
→ Building/Planning Locked
→ CTE Approved
→ Building Plan + Provisional Fire Ready
→ Power + Water + Conditional NOCs parallel where allowed.

DO NOT show Building Plan as Ready before the baseline CTE prerequisite is
resolved.

Keep the dependency engine configurable so this baseline is NOT hard-coded
as a universal legal rule for every project.

Clicking any node must route to one generic:

Requirement Detail
PLACEHOLDER ONLY.

Do not build Requirement Detail yet.

Do not create applications yet.

Do not create department screens.

Do not change any completed E02–E08 screen.

Stop after E09 and E13 are fully prototyped and cross-checked for consistency.