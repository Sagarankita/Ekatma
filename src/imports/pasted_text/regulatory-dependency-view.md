Create M17 — Regulatory Dependency View.

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
- status primitives
- application timeline components
- dependency components already established elsewhere

M17 is a REGULATORY DEPENDENCY VIEW.

Its purpose is to show the MIDC officer where the selected MIDC service sits inside the entrepreneur's broader regulatory journey.

The officer should understand:

- what must happen before the current MIDC service
- what is currently happening
- what can proceed in parallel
- what depends on the current MIDC service
- what is blocked
- what is ready
- what the entrepreneur needs to do
- which dependencies belong to other departments
- which downstream services may become available after the current service reaches the required state

M17 must NOT give the MIDC officer control over other departments.

==================================================
1. CRITICAL PAYMENT / CHALLAN CORRECTION
==================================================

IMPORTANT ARCHITECTURAL RULE:

PAYMENT IS NOT A UNIVERSAL REGULATORY DEPENDENCY NODE.

Do NOT place:

Fee / Challan

as a fixed node in the A–Z regulatory dependency graph.

Payment timing is configurable by service/workflow.

The system must maintain:

application_state

separately from:

payment_state

--------------------------------------------------

APPLICATION STATE

Use the shared canonical application-state model:

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

A service may skip states that do not apply.

--------------------------------------------------

PAYMENT STATE

Maintain payment separately.

Possible payment states:

NOT_REQUIRED
NOT_STARTED
PENDING
PAID
FAILED
REFUNDED
VERIFICATION_REQUIRED

Use only the states configured for the service.

Payment state must NOT be treated as a regulatory dependency unless the configured workflow explicitly exposes it as an operational gate.

--------------------------------------------------

PAYMENT TIMING CONFIGURATION

The service configuration may define:

CASE A:
Payment before formal submission

Example:

READY_TO_SUBMIT
+
payment_state = PENDING

↓
Pay Fee / Challan

payment_state = PAID

↓
Submit Application

application_state = SUBMITTED

--------------------------------------------------

CASE B:
Payment after formal submission

Example:

application_state = SUBMITTED

+
payment_state = PENDING

↓
Pay Fee / Challan

payment_state = PAID

↓
Configured scrutiny workflow continues

--------------------------------------------------

CASE C:
No payment applicable

application_state continues normally.

payment_state = NOT_REQUIRED

Do NOT show a payment blockage.

--------------------------------------------------

CASE D:
Payment verification pending

Show:

payment_state = VERIFICATION_REQUIRED

Do not automatically label the application rejected.

The exact sequencing must come from service configuration.

==================================================
2. IMPORTANT M17 PAYMENT DISPLAY RULE
==================================================

M17 may show a compact payment/challan status in the APPLICATION CONTEXT or workflow information area.

Example:

Payment:
PAID

or:

Payment:
PENDING

or:

Payment:
NOT REQUIRED

But do NOT insert Payment as a fixed node into the regulatory dependency graph.

If payment is currently blocking progress because of configured workflow rules, show a separate operational banner:

"Payment required before the next configured workflow step."

Do not represent this as:

"Regulatory prerequisite."

Clearly distinguish:

REGULATORY DEPENDENCY

from:

WORKFLOW / PAYMENT GATE.

==================================================
3. SCREEN HEADER
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
TECHNICAL_SCRUTINY

Payment:
PAID / PENDING / NOT REQUIRED according to configuration

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

Page title:

"Regulatory Dependency View"

Subtitle:

"View the configured regulatory journey and the dependencies relevant to this MIDC service."

==================================================
4. PURPOSE INFORMATION PANEL
==================================================

At the top of the page, show a compact explanation:

"This view shows how the current MIDC service relates to other configured regulatory requirements in the project journey."

Supporting text:

"Dependencies are configuration-driven. External department records are visible as context; MIDC cannot approve, reject or modify another department's decision."

Also show:

"Payment / challan timing is controlled separately by service workflow configuration."

This explicitly prevents the payment-sequencing ambiguity from propagating into the prototype.

==================================================
5. FULL A–Z JOURNEY
==================================================

Show the selected MIDC service inside the entrepreneur's wider regulatory journey.

For the baseline EKATMA prototype, show a journey similar to:

LAND
↓
MIDC LAND / PLOT CONTEXT
↓
MPCB CONSENT TO ESTABLISH
↓
MIDC BUILDING / PLANNING
↓
PROVISIONAL FIRE
↓
UTILITIES + CONDITIONAL NOCs
↓
CONSTRUCTION
↓
PRE-OPERATION APPROVALS

IMPORTANT:

This is a BASELINE PROTOTYPE JOURNEY.

It is NOT a universal legal sequence.

The actual graph must be generated from configured dependency relationships.

==================================================
6. DEPENDENCY GRAPH MODEL
==================================================

Build the visual using a dependency graph rather than a simple fixed vertical timeline.

A node may have:

UPSTREAM dependency
DOWNSTREAM dependency
PARALLEL dependency
CONDITIONAL dependency
EXTERNAL dependency
MIDC-controlled dependency
BLOCKING dependency
NON-BLOCKING informational dependency

Example:

                ┌────────────────────┐
                │ MPCB CTE           │
                │ EXTERNAL           │
                │ COMPLETED          │
                └─────────┬──────────┘
                          │
                          ↓
              ┌──────────────────────┐
              │ MIDC BUILDING /      │
              │ PLANNING             │
              │ CURRENT NODE         │
              └──────────┬───────────┘
                         │
             ┌───────────┴────────────┐
             ↓                        ↓
   ┌─────────────────┐     ┌──────────────────┐
   │ PROVISIONAL FIRE│     │ MIDC WATER /     │
   │ CONDITIONAL     │     │ UTILITY          │
   │ / CONFIGURED    │     │ PARALLEL         │
   └─────────────────┘     └──────────────────┘

Do not force every node into one serial chain.

==================================================
7. CURRENT MIDC NODE
==================================================

Highlight the current MIDC service prominently.

Example:

CURRENT NODE

MIDC Building / Planning

Department:
MIDC

Status:
TECHNICAL_SCRUTINY

Desk:
Planning / Building Scrutiny

Application:
MIDC-APP-2026-00418

Scrutiny Route:
Enhanced Review

Payment:
PAID

Then show its relationships:

Prerequisites
Parallel Services
Downstream Services
Blocked Nodes
Conditional Nodes

==================================================
8. PREREQUISITES
==================================================

Create a section:

"Prerequisites"

For every prerequisite show:

Prerequisite
Source Department
Relationship
Status
Evidence / Approval Reference
Blocking State

Example:

MPCB Consent to Establish

Source Department:
MPCB

Relationship:
Upstream prerequisite

Status:
Completed

Evidence:
MPCB reference / configured approval reference

Blocking State:
Satisfied

The MIDC officer can:

View dependency
View evidence
View reference

The MIDC officer cannot:

Approve
Reject
Edit
Modify

the MPCB record.

==================================================
9. PARALLEL SERVICES
==================================================

Create a dedicated section:

"Parallel / Conditional Services"

This is important because not every regulatory process is strictly serial.

Example:

MIDC Building / Planning
        │
        ├────────→ Provisional Fire
        │           Conditional
        │
        └────────→ MIDC Water / Utility
                    Parallel where configured

For each parallel service show:

Service
Department
Status
Relationship
Blocking State

Example:

MIDC Water / Utility
Department:
MIDC

Status:
Ready

Relationship:
Parallel

Blocking:
No

Do not imply that the service is legally independent in every project.

The relationship comes from configuration.

==================================================
10. DOWNSTREAM NODES
==================================================

Create:

"Downstream Requirements"

Show services that depend on the current MIDC node.

Example:

Construction

Status:
Blocked / Pending

Reason:

"Configured dependency: Building / Planning must reach the required state."

Then:

Pre-operation approvals

Status:
Blocked

Reason:

"Upstream requirements remain incomplete."

Do not claim that every downstream service is universally blocked by Building / Planning.

Show:

"Configured dependency"

where the rule applies.

==================================================
11. BLOCKED NODES
==================================================

Create a dedicated section:

"Currently Blocked"

Each blocked node should show:

Node
Department
Blocked Because
Upstream Dependency
Status
Potential Unlock Condition

Example:

Construction

Blocked because:
MIDC Building / Planning not yet completed

Unlock condition:
Configured Building / Planning prerequisite satisfied

Another example:

Conditional NOC

Blocked because:
Configured upstream dependency pending

Do not use generic wording such as:

"AI says blocked."

Use:

"Configured dependency rule"

or:

"Workflow dependency"

==================================================
12. UNLOCK INFORMATION
==================================================

Create an "Unlocks" section.

Example:

If MIDC Building / Planning reaches the configured required state:

Potentially unlocked:

MIDC Water / Utility
Construction
Configured downstream approvals

For each:

Service
Department
Current State
Unlock Condition

Important:

Do NOT state that approval of the current MIDC application automatically guarantees another department's approval.

Use:

"May become available / eligible according to configured dependency rules."

==================================================
13. ENTREPRENEUR ACTIONS BLOCKING PROGRESS
==================================================

Create a section:

"Entrepreneur Actions Required"

Show only actions that are actually blocking the current journey.

Examples:

Pay configured fee
Submit missing document
Respond to consolidated query
Provide clarification
Resubmit corrected application
Provide inspection availability

For each:

Action
Related Application
Blocking State
Due / SLA information where configured

Example:

Respond to MIDC Query

Status:
Awaiting Entrepreneur Response

Related:
MIDC Building / Planning

Effect:
Current scrutiny cannot continue until configured response is received.

IMPORTANT:

These are operational workflow blockers.

Do not represent them as regulatory prerequisites unless the configuration explicitly says they are.

==================================================
14. EXTERNAL DEPARTMENT DEPENDENCIES
==================================================

Create a visually distinct but consistent external-department indicator.

Possible departments:

MPCB
Fire
DISH
Boiler
Utilities
Other configured authorities

For each external dependency show:

Department
Service / Approval
Status
Evidence / Reference
Dependency relationship

Example:

MPCB

Consent to Establish

Status:
Completed

Relationship:
Upstream External Dependency

MIDC action:
View only

Do not show action buttons that could alter the external department's workflow.

==================================================
15. EXTERNAL DEPARTMENT BOUNDARY
==================================================

Make the boundary explicit.

Show a small information message:

"External department information is shown for dependency context. MIDC cannot approve, reject, modify or issue external department decisions from this view."

For external nodes, only provide:

View
View Reference
View Evidence
View Dependency Impact

Do NOT provide:

Approve
Reject
Edit
Modify
Issue
Revoke

==================================================
16. DEPENDENCY NODE STATUS STATES
==================================================

Use the following dependency states:

COMPLETE
PENDING
BLOCKED
READY
REJECTED
NEEDS VERIFICATION
PARALLEL

Every state must have:

- icon
- text label
- accessible status
- optional supporting description

Do not rely on colour alone.

Example:

✓ Complete

○ Pending

! Blocked

→ Ready

× Rejected

? Needs Verification

⇄ Parallel

Use the existing EKATMA status primitives.

==================================================
17. IMPORTANT DISTINCTION: DEPENDENCY STATUS VS APPLICATION STATUS
==================================================

Do not confuse dependency-node state with the canonical application state.

Example:

MIDC Building / Planning

Application State:
TECHNICAL_SCRUTINY

Dependency Context:
CURRENT

Another application:

MPCB CTE

External dependency state:
COMPLETE

Another node:

Construction

Dependency state:
BLOCKED

These are different dimensions.

Do not replace the shared application-state model with the dependency-state vocabulary.

==================================================
18. IMPORTANT DISTINCTION: PAYMENT VS DEPENDENCY
==================================================

Show this explicitly in the prototype.

Example:

Application:

MIDC Building / Planning

Application State:
TECHNICAL_SCRUTINY

Payment State:
PAID

Regulatory Dependencies:
MPCB CTE → Complete
Building / Planning → Current
Fire → Conditional
Utilities → Parallel

Payment is displayed as application/workflow context.

It is NOT rendered as:

MIDC
↓
Fee
↓
MPCB
↓
Building

Do not put payment inside the regulatory dependency graph unless a specific configured service explicitly models payment as a dependency for a particular workflow decision.

==================================================
19. DEPENDENCY DETAIL DRAWER
==================================================

When the officer clicks a node, open a detail drawer.

Show:

Node Name
Department
Service
Application ID if applicable
Relationship
Current State
Evidence / Approval Reference
Source
Verification
Last Updated
Blocking State
Upstream Dependencies
Downstream Dependencies

For external departments:

show read-only context.

For MIDC nodes:

allow navigation to the relevant MIDC application/service workspace.

Example:

Node:
MPCB Consent to Establish

Department:
MPCB

Relationship:
Upstream External Dependency

Status:
Complete

Evidence:
Configured approval reference

Verification:
Department Verified

MIDC Action:
View Dependency

==================================================
20. REGULATORY SOURCE / RULE
==================================================

When a dependency is selected, show the configured rule/source if available.

Example:

Dependency Rule:

"Building / Planning review requires configured prerequisite X."

Source:

Regulatory Knowledge Catalogue

Rule Version:

Configured version

Status:

Active

Do not invent statutory sections or legal thresholds.

If source is unavailable:

"Dependency source not available — Needs Verification."

==================================================
21. CONFIGURATION EXPLANATION
==================================================

Add a compact panel:

"Why is this dependency shown?"

Example:

"Shown because the configured regulatory journey for this project includes MPCB Consent to Establish as an upstream dependency."

For a conditional node:

"Shown because the current Business DNA contains a configured condition associated with this service."

For a parallel node:

"Shown because the configured dependency graph permits this service to proceed in parallel with the current node."

This makes the dependency engine explainable.

==================================================
22. BUSINESS DNA CONTEXT
==================================================

M17 should use relevant Business DNA context but should not reproduce the entire M07 screen.

Show a compact:

"Journey Context"

panel containing relevant fields:

Project Type
Project Stage
Location
MIDC Estate
Plot
Plot Area
Industry / Activity
Building Context
Water Context
Hazardous / Fire Context
Existing Approvals

Provide:

"View Business DNA"

→ M07

Do not create another Business DNA editor.

==================================================
23. SERVICE-SPECIFIC ENTRY POINT
==================================================

The page must open with the selected MIDC service already highlighted.

Examples:

If entered from M14:

Current Node:
MIDC Building / Planning

If entered from M15:

Current Node:
MIDC Water / Utility / Drainage

If entered from M11:

Current Node:
MIDC Land / Plot

Do not make the officer search for the current service again.

==================================================
24. M14 / M15 / M16 INTEGRATION
==================================================

M14 Building / Planning:

Can link:

"View Regulatory Dependencies"

→ M17

M15 Water / Utility / Drainage:

Can link:

"View Regulatory Dependencies"

→ M17

M16 Cross-form Consistency:

Can show:

"Dependency Impact"

→ M17

M17 then opens with the relevant node selected.

Preserve context when navigating.

==================================================
25. M18 QUERY INTEGRATION
==================================================

If a dependency is blocked because the entrepreneur needs to respond to a query:

show:

"Awaiting Entrepreneur Response"

and provide:

"View Query"

→ M18 / M19

Do not create a separate dependency-specific query mechanism.

==================================================
26. M20 DELTA INTEGRATION
==================================================

If a changed Business DNA field changes the dependency graph:

show:

"Dependency impact changed after resubmission."

Example:

Plot Area:
4,800 → 5,200

Potential impact:

Building / Planning
Utilities
Inspection

Provide:

"Open Delta Re-scrutiny"

→ M20

Do not silently change historical dependency records.

Preserve:

Previous dependency graph
Current dependency graph
Change timestamp
Change source

==================================================
27. VERSIONED DEPENDENCY GRAPH
==================================================

The dependency graph should be version-aware.

If the configured regulatory rules change:

show:

Journey / Dependency Configuration Version

Example:

Regulatory Journey Version:
2026.XX

Dependency Rule Version:
2026.XX

Do not silently rewrite historical journey states.

If an application was processed under an earlier rule configuration, preserve the historical context.

==================================================
28. NO AUTOMATIC DECISION MAKING
==================================================

Automation may:

- construct the dependency graph
- identify configured prerequisites
- identify configured parallel services
- show blocked nodes
- show potential downstream unlocks
- detect dependency changes
- explain configured dependency relationships
- surface external department status

Automation must NOT:

- approve an external department
- reject an external department
- approve MIDC application
- reject MIDC application
- invent a prerequisite
- invent a dependency
- invent a legal threshold
- infer a dependency solely from an AI model without configured regulatory basis

Use:

"Configured dependency"

"Needs Verification"

or:

"Dependency source unavailable"

when appropriate.

==================================================
29. NO UNIVERSAL A–Z ASSUMPTION
==================================================

The baseline prototype should visually communicate:

LAND
↓
MIDC LAND / PLOT
↓
MPCB CTE
↓
MIDC BUILDING / PLANNING
↓
PROVISIONAL FIRE
↓
UTILITIES / CONDITIONAL NOCs
↓
CONSTRUCTION
↓
PRE-OPERATION

But the underlying component must support:

different prerequisites
different sequences
parallel branches
conditional branches
optional services
services that are not applicable
services that require verification
different external departments
different project types
different MIDC services

The graph must be data/configuration-driven.

==================================================
30. NOT APPLICABLE / OPTIONAL BRANCHES
==================================================

If a service is not applicable:

show:

NOT APPLICABLE

Do not show:

BLOCKED

Do not create:

Missing requirement

Do not create a query.

Example:

If the Business DNA indicates a water service is not required:

MIDC Water / Utility
NOT APPLICABLE

The node may be collapsed or displayed as an inactive branch.

It should not appear as an unresolved blocker.

==================================================
31. NEEDS VERIFICATION
==================================================

If the dependency engine cannot determine whether a dependency applies:

show:

Needs Verification

Example:

"Fire-related dependency applicability cannot currently be established."

Provide:

View Business DNA
View Rule
Request Verification

Do not automatically treat it as:

Required
Blocked
Rejected

==================================================
32. CURRENT JOURNEY SUMMARY
==================================================

At the top of the graph, show a compact summary:

Current Node:
MIDC Building / Planning

Upstream:
1 completed
0 pending
1 needs verification

Parallel:
2 configured

Downstream:
3 configured

Blocked:
1

Entrepreneur Actions:
1

External Dependencies:
1

These are factual counts.

Do NOT display:

Journey Score
Compliance Score
Risk Score
Approval Probability

==================================================
33. OFFICER ACTIONS
==================================================

M17 is primarily informational/navigation.

Allowed actions:

View Dependency
View Evidence
View Source
Open Related Application
Open Business DNA
Open Query
Open Delta
Open Regulatory Reference

For MIDC-controlled nodes, navigation may lead to:

M11
M14
M15
M25

For external nodes:

VIEW ONLY.

Do not place:

Approve
Reject
Issue Certificate

inside M17.

==================================================
34. PAYMENT ACTIONS
==================================================

Do not make payment actions central to M17.

If payment is pending and the configured workflow requires it:

show:

Payment State:
PENDING

Workflow Gate:
Payment required before [configured next step]

Provide a navigation action if appropriate:

"View Payment / Challan"

Do not call it:

"Regulatory Dependency"

Do not assume:

Payment always precedes submission.

Do not assume:

Payment always follows submission.

The configured service workflow decides.

==================================================
35. SAMPLE PROTOTYPE STATE
==================================================

Use realistic prototype-safe sample data.

Application:
MIDC-APP-2026-00418

Business:
Aster Precision Components Pvt. Ltd.

Current Service:
MIDC Building / Planning

Application State:
TECHNICAL_SCRUTINY

Payment State:
PAID

Baseline dependency graph:

LAND
Complete

↓

MIDC Land / Plot
Complete

↓

MPCB Consent to Establish
Complete
External

↓

MIDC Building / Planning
CURRENT
Technical Scrutiny

        ↙                    ↘

Provisional Fire       MIDC Water / Utility
Conditional            Parallel / Configured

↓

Construction
Pending / Blocked according to configured dependency

↓

Pre-operation
Pending

Again:

These are prototype values.

Do not present them as actual government records.

==================================================
36. VISUAL STRUCTURE
==================================================

Use:

TOP:
Application context

SECOND:
Current service + dependency summary

MAIN:
Large dependency graph

LEFT / BELOW:
Journey stages

RIGHT:
Selected dependency detail drawer

BOTTOM:
Operational blockers / entrepreneur actions

The graph should be the dominant visual element.

Do not turn this into a KPI dashboard.

==================================================
37. GRAPH INTERACTION
==================================================

When hovering over a node:

show:
- department
- service
- status
- relationship

When clicking:

open dependency detail drawer.

When clicking "Open Related Application":

navigate to the appropriate service/application screen.

When clicking an external department:

remain within M17 and open a read-only dependency drawer.

Do not navigate into an external department's editable workflow.

==================================================
38. ACCESSIBILITY
==================================================

Use:

- icon + text for every dependency state
- accessible labels
- keyboard navigable nodes
- visible focus states
- readable relationship labels
- non-colour-only status communication

Do not rely on arrows or colours alone.

Ensure long department/service names remain readable.

Maintain English / Marathi compatibility.

==================================================
39. FINAL OFFICER FLOW
==================================================

Officer opens:

M14 Building / Planning

↓

Clicks:

View Regulatory Dependencies

↓

M17 opens with:

MIDC Building / Planning

highlighted.

↓

Officer sees:

UPSTREAM
MPCB CTE — Complete

CURRENT
MIDC Building / Planning — Technical Scrutiny

PARALLEL
Water / Utility — Configured Parallel

CONDITIONAL
Provisional Fire — Configured Conditional

DOWNSTREAM
Construction — Pending / Blocked

↓

Officer selects a node.

↓

Dependency drawer shows:

Department
Service
Status
Evidence
Source
Relationship
Blocking state
Upstream
Downstream

↓

If entrepreneur action is required:

View Query

↓

If dependency changed after resubmission:

Open Delta Re-scrutiny

↓

If external department:

VIEW ONLY.

==================================================
40. CRITICAL RULES
==================================================

NEVER:

- hard-code one universal regulatory sequence
- treat every dependency as serial
- treat every dependency as mandatory
- treat payment as a universal regulatory dependency
- assume payment is always before submission
- assume payment is always after submission
- merge payment_state into application_state
- edit another department's record
- approve another department's application
- reject another department's application
- invent prerequisites
- invent legal thresholds
- invent regulatory relationships
- silently alter historical dependency graphs
- turn dependency status into application status
- treat NOT_APPLICABLE as blocked
- treat Needs Verification as automatically required
- let AI make statutory decisions

ALWAYS:

- use configured dependencies
- distinguish regulatory dependencies from operational workflow gates
- keep payment_state separate from application_state
- show source/provenance
- show relationship type
- show external-department boundaries
- preserve historical versions
- explain why a dependency is shown
- support parallel and conditional branches
- connect to M07/M14/M15/M16/M18/M19/M20
- preserve the shared canonical application states