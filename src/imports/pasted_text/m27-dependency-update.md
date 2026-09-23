Create M27 — Dependency Update + Entrepreneur Synchronization.

IMPORTANT:

Do not redesign M17 Regulatory Dependency View.

M17 shows the dependency graph and allows the officer to understand
prerequisites, downstream services, parallel services, external
departments, blocked nodes and unlocked nodes.

M27 has a different purpose.

M27 is the POST-DECISION PROPAGATION WORKSPACE.

It shows what changed in the regulatory journey AFTER the authorised
MIDC decision was recorded in M25/M26.

The workflow is:

M25 — Decision Workspace
        ↓
M26 — Formal Decision Record
        ↓
M27 — Dependency Update + Entrepreneur Synchronization
        ↓
M28 — Conditions / Compliance / Renewal where configured

M27 must never make a new statutory decision.

It only propagates the already-recorded MIDC decision to the configured
dependency and journey systems.

--------------------------------------------------
1. PAGE PURPOSE
--------------------------------------------------

The page must answer:

"What changed in the regulatory journey because of this MIDC decision?"

The officer should be able to see:

- the MIDC decision that triggered the update
- dependency state before the decision
- dependency state after the decision
- which downstream nodes changed
- which nodes became available
- which nodes remain blocked
- which external departments are affected as dependency context
- what was synchronized to the entrepreneur
- what document/certificate was generated or stored
- whether configured approval conditions generated compliance obligations
- the complete synchronization event history

Do NOT show this page as a generic dependency dashboard.

It is specifically tied to one recorded MIDC decision.

--------------------------------------------------
2. PAGE HEADER
--------------------------------------------------

Create a strong application/decision context header.

Show:

Application ID
Business / Project
MIDC Service
Decision ID
Decision Outcome
Decision Date
Decision Officer
Decision Role
Region / Office
Application Version
Business DNA Version

Example:

MIDC-APP-2026-00418
ABC Biotech Pvt. Ltd.

MIDC Building / Planning Service

Decision:
APPROVED

Decision ID:
DEC-MIDC-2026-00418

Decision Date:
23 September 2026

Decision Officer:
[Authenticated Officer]

Keep application context separate from officer context.

Officer context:
- Department = MIDC
- Region / Office
- Assigned Desk
- Role

Application context:
- Application ID
- MIDC Service
- Current Application State
- Decision ID
- Decision Outcome

--------------------------------------------------
3. DECISION EVENT SUMMARY
--------------------------------------------------

At the top of the page create a compact summary card:

MIDC DECISION EVENT

Decision:
APPROVED

Decision ID:
DEC-MIDC-2026-00418

Recorded:
23 Sep 2026, 14:32

Officer:
[Officer Name / Role]

Source:
M26 Decision Record

Add a button:

"View Decision Record"

This opens M26.

Do not allow the officer to edit the decision from M27.

If the decision needs correction, the officer must use the configured
decision/version workflow rather than silently changing the decision
inside M27.

--------------------------------------------------
4. BEFORE DECISION STATE
--------------------------------------------------

Create a section:

DEPENDENCY STATE — BEFORE DECISION

Show the relevant portion of the configured dependency graph immediately
before the MIDC decision.

Example:

MPCB CTE
        ↓
MIDC Building / Planning
        ↓
Provisional Fire
        ↓
Utilities / Conditional NOCs
        ↓
Construction

Use status states already established in the dependency model:

- Complete
- Pending
- Missing
- Blocked
- Ready
- Parallel
- Needs Verification

Clearly distinguish:

MIDC-controlled node

from:

External department node

Do not give MIDC controls over external department decisions.

Example:

MPCB CTE
Status: COMPLETE
Department: MPCB
Control: External / Read-only

MIDC Building / Planning
Status: DECISION PENDING
Department: MIDC
Control: MIDC-controlled

Provisional Fire
Status: BLOCKED
Department: Fire
Control: External / Read-only

This should visually explain what the decision was about.

--------------------------------------------------
5. DECISION EFFECT
--------------------------------------------------

Create a prominent transition section:

BEFORE → AFTER

Example:

MIDC Building / Planning

BEFORE:
Decision Pending

        ↓

MIDC DECISION:
APPROVED

        ↓

AFTER:
MIDC Node Complete

This should be the central visual element of the page.

Do not use a generic percentage or progress score.

Use factual state transitions.

--------------------------------------------------
6. AFTER DECISION DEPENDENCY STATE
--------------------------------------------------

Create:

DEPENDENCY STATE — AFTER DECISION

Show the same relevant dependency graph after propagation.

For example:

MPCB CTE
✓ Complete

MIDC Building / Planning
✓ Complete

Provisional Fire
→ Ready / Unlocked where configured

Utilities
→ Available / Unlocked where configured

Construction
→ Available where configured

Only unlock nodes according to the configured dependency graph.

Do not assume that every downstream service automatically unlocks after
every MIDC approval.

The exact effect must come from configured dependency data.

Use labels such as:

Unlocked
Blocked
Still Pending
Unchanged
Newly Available
Requires External Action
Needs Verification

--------------------------------------------------
7. CHANGE SUMMARY
--------------------------------------------------

Create a "What Changed?" panel.

Show only actual state changes caused by this decision.

Example:

CHANGED

MIDC Building / Planning
Decision Pending → Complete

Provisional Fire
Blocked → Ready

Construction Planning
Blocked → Available

UNCHANGED

MPCB CTE
Complete → Complete

Water Utility
Pending → Pending

Do not list every node in the entire platform.

Focus on relevant nodes.

Provide:

"View Full Dependency Journey"

→ M17

This makes M27 a delta/propagation view rather than a duplicate of M17.

--------------------------------------------------
8. APPROVED STATE
--------------------------------------------------

When the decision is APPROVED, show:

APPROVAL PROPAGATION

✓ MIDC node marked complete
✓ Configured dependent nodes updated
✓ Approval/order stored
✓ Certificate stored where applicable
✓ Entrepreneur journey updated
✓ Reusable verified data/document made available
✓ Configured approval conditions forwarded to compliance engine

Use factual states.

Do not say:

"All approvals completed."

Do not imply that approval of one MIDC service means the entire
regulatory journey is complete.

Instead say:

"Configured downstream services affected by this MIDC decision."

--------------------------------------------------
9. CORRECTION REQUIRED STATE
--------------------------------------------------

When the M26 outcome is CORRECTION REQUIRED, show:

CORRECTION PROPAGATION

MIDC Node:
ACTIVE

Application State:
CORRECTION_REQUIRED

Downstream dependency state:

Blocked where MIDC approval is a configured prerequisite.

Show:

✓ Entrepreneur action generated
✓ Exact deficiencies available
✓ Query / Deficiency record linked
✓ Existing application remains active
✓ Previous application version preserved

Do NOT mark the node as rejected.

Do NOT create a rejection record.

The correct lifecycle is:

CORRECTION_REQUIRED
        ↓
ENTREPRENEUR RESPONSE
        ↓
RESUBMITTED
        ↓
DELTA RE-SCRUTINY

Provide links to:

M18 Consolidated Query Builder
M19 Query / Response History
M20 Delta Re-scrutiny

--------------------------------------------------
10. REJECTED STATE
--------------------------------------------------

When the M26 outcome is REJECTED, show:

REJECTION PROPAGATION

MIDC Node:
REJECTED

Show:

✓ Rejection record stored
✓ Reason available to entrepreneur
✓ Configured dependent nodes remain blocked
✓ Configured downstream journey state updated
✓ Entrepreneur notification generated

Do not automatically reject or modify another department's application.

For example:

MIDC:
REJECTED

MPCB:
UNCHANGED

Fire:
BLOCKED / UNCHANGED according to dependency configuration

Other department decisions remain under those departments' control.

--------------------------------------------------
11. EXTERNAL DEPARTMENT EFFECTS
--------------------------------------------------

Create:

EXTERNAL DEPARTMENT IMPACT

Show only departments whose dependency state is affected by the MIDC
decision.

Possible examples:

MPCB
Fire
DISH
Boiler
Utilities
Sector-specific authority

For each show:

Department
Service / Node
Previous State
New State
Effect
Control

Example:

Fire
Provisional Fire
BLOCKED → READY
MIDC approval satisfies configured prerequisite
Control: Fire

MPCB
CTE
COMPLETE → COMPLETE
No change
Control: MPCB

Important:

MIDC may update dependency availability.

MIDC must NOT:

- edit MPCB's decision
- approve Fire's application
- reject DISH's application
- change another department's officer notes
- impersonate another department

Use:

"Dependency availability updated"

rather than:

"Fire approval updated"

unless the Fire department itself actually performed that action.

--------------------------------------------------
12. ENTREPRENEUR SYNCHRONIZATION
--------------------------------------------------

Create a section:

ENTREPRENEUR JOURNEY UPDATE

Show the exact information propagated to the entrepreneur-side system.

Example:

Application:
MIDC-APP-2026-00418

New Status:
Approved

Decision:
MIDC Building / Planning — Approved

Newly Available:
Provisional Fire application

Newly Available:
Configured utility workflow

Documents:
Approval Order added to Document Centre

Conditions:
2 configured conditions recorded

Next Action:
Continue to newly unlocked regulatory service

Show:

"Entrepreneur View"

CTA → opens the corresponding entrepreneur-side application/status
view in the prototype.

Do not create a duplicate entrepreneur application screen inside M27.

M27 only shows what was synchronized.

--------------------------------------------------
13. DOCUMENT / CERTIFICATE PROPAGATION
--------------------------------------------------

Create:

DOCUMENT UPDATE

If an approval/order/certificate exists, show:

Document ID
Document Type
Document Version
Issue Date
Expiry Date if applicable
Source
Related Decision ID
Related Application ID
Repository Status

Example:

DOC-MIDC-2026-00418
MIDC Approval Order
v1
Issued
23 Sep 2026

If applicable:

Certificate:
CERT-MIDC-2026-00418

Show:

"Added to Document Centre"

Do not create a second document repository.

Use the existing Document Centre / document version model.

If a certificate is not applicable, show:

Certificate:
Not Applicable

Do not create a missing-document warning.

--------------------------------------------------
14. REUSABLE DATA / DOCUMENT UPDATE
--------------------------------------------------

If the decision makes verified data or documents reusable, show:

REUSABLE RECORDS

Example:

MIDC Plot Verification
Verification:
Department Verified

Document:
Possession Certificate v2
Status:
Verified / Reusable

Show:

Available to:
Configured downstream applications

Do not automatically expose information beyond the configured permission
or data-sharing scope.

Do not overwrite the original document.

Preserve document version history.

--------------------------------------------------
15. CONDITIONS → COMPLIANCE HANDOFF
--------------------------------------------------

If the approval contains configured conditions, show:

APPROVAL CONDITIONS

Condition 1
[Condition]

Condition 2
[Condition]

For each show:

Condition
Source
Decision ID
Configured compliance effect
Status

Then show:

CONDITIONS → COMPLIANCE ENGINE

Example:

Condition recorded
        ↓
Configured compliance rule detected
        ↓
Compliance obligation generated

If no configured compliance obligation exists:

"No configured compliance obligation generated."

Do not fabricate compliance obligations.

Do not create generic renewal requirements for every MIDC approval.

Provide:

"View Compliance Context"

→ M28

--------------------------------------------------
16. SYNCHRONIZATION STATUS
--------------------------------------------------

Create a technical-but-user-friendly synchronization panel.

Title:

SYNCHRONIZATION STATUS

Show:

MIDC Decision Event
✓ Recorded

        ↓

Journey Engine
✓ Updated

        ↓

Entrepreneur View
✓ Updated

        ↓

Eligible Downstream Queues
✓ Updated / No update required

Use statuses:

Completed
Pending
Failed
Not Required

Do not show "Success" if the actual prototype state is unknown.

If a synchronization step is pending, clearly show:

Pending synchronization

Do not silently assume that the update succeeded.

--------------------------------------------------
17. SYNCHRONIZATION AUDIT LINE
--------------------------------------------------

Create a compact event timeline:

MIDC Decision Event
23 Sep 2026 — 14:32

        ↓

Dependency Engine
23 Sep 2026 — 14:32

        ↓

Journey Engine
23 Sep 2026 — 14:33

        ↓

Entrepreneur View
23 Sep 2026 — 14:33

        ↓

Eligible Department Queues
23 Sep 2026 — 14:33

Each event should show:

Event ID
Timestamp
Source
Destination
Action
Result

Example:

SYNC-00418-03
14:33
Journey Engine → Entrepreneur View
Application status updated
Completed

This is a synchronization audit trail.

It is NOT a replacement for the full M38 Audit / History screen.

Provide:

"View Full Audit History"

→ M38

--------------------------------------------------
18. NOTIFICATION STATUS
--------------------------------------------------

Create:

ENTREPRENEUR NOTIFICATION

Show:

Notification ID
Recipient
Notification type
Generated date/time
Channel
Status

Example:

NTF-00418-07
Applicant
MIDC Decision
23 Sep 2026
Portal
Generated

If supported by the prototype:

Email
SMS
Portal notification

Do not claim delivery unless the prototype explicitly models delivery.

Use:

Generated
Queued
Delivered
Failed

as appropriate.

The notification should communicate:

Decision outcome
Application ID
Decision reference
Next action where applicable
Document availability where applicable
Configured downstream action

Do not expose internal officer notes.

--------------------------------------------------
19. JOURNEY SUMMARY
--------------------------------------------------

Create a compact journey visualization.

Example:

LAND / PLOT
✓ Complete

        ↓

MPCB CTE
✓ Complete

        ↓

MIDC BUILDING / PLANNING
✓ APPROVED

        ↓

PROVISIONAL FIRE
→ AVAILABLE

        ↓

UTILITIES
→ CONFIGURED NEXT STEP

        ↓

CONSTRUCTION
→ FUTURE STAGE

The journey must remain configurable.

Do not imply that every business follows this exact sequence.

Use the actual configured dependency graph for the application.

--------------------------------------------------
20. ACTIONS
--------------------------------------------------

Primary actions should be navigation/synchronization related.

Possible actions:

View Decision Record
View Full Dependency Journey
View Entrepreneur View
View Approval / Certificate
View Compliance Context
View Audit History

Do NOT provide:

Approve
Reject
Edit Decision

on M27.

The decision has already been recorded in M25/M26.

--------------------------------------------------
21. VERSIONING
--------------------------------------------------

Preserve:

Application Version
Business DNA Version
Decision Version
Document Version
Dependency Graph Version
Regulatory Rule Version

Show which versions were used when the propagation occurred.

Example:

Application Version:
v3

Business DNA:
v7

Decision:
v1

Dependency Configuration:
v4

Regulatory Rule Version:
v2

Do not silently recompute historical decisions using newer rules.

Historical decision propagation must remain auditable.

--------------------------------------------------
22. ERROR / EXCEPTION STATES
--------------------------------------------------

Create realistic prototype states for synchronization.

A. SUCCESSFUL PROPAGATION

Decision recorded
→ dependency updated
→ entrepreneur updated
→ document stored

B. PARTIAL PROPAGATION

Decision recorded
✓

Dependency update
✓

Document storage
✓

Entrepreneur notification
Pending

Show:

"Decision is recorded. Entrepreneur synchronization is pending."

Do not change the decision itself.

C. EXTERNAL DEPENDENCY UNAVAILABLE

MIDC decision recorded.

External department system unavailable.

Show:

"Dependency availability update pending."

Do not change the external department's record.

D. NO DOWNSTREAM EFFECT

Show:

"No configured downstream dependency is affected by this decision."

Do not show an empty or broken dependency graph.

--------------------------------------------------
23. M27 → OTHER SCREENS
--------------------------------------------------

M27 must link back to:

M25
Decision Workspace

M26
Decision Record

M17
Regulatory Dependency View

M28
Conditions / Compliance / Renewal Context

M38
Audit / History

Entrepreneur:

Application / Tracker / Approval Detail

The prototype should preserve Application ID and Decision ID across all
these transitions.

--------------------------------------------------
24. NAVIGATION ENTRY POINTS
--------------------------------------------------

M27 should be reachable through:

M25
→ Record Decision
→ M27

M26
→ Dependency Impact
→ M27

Application Overview
→ Dependencies
→ M17

Decision Record
→ View Dependency Impact
→ M27

Do not make M27 a separate independent approval workflow.

--------------------------------------------------
25. FINAL DESIGN PRINCIPLES
--------------------------------------------------

Do not regenerate Phase 0.

Use the existing EKATMA government design system.

Reuse:

- Header
- Footer
- Sidebar
- Breadcrumbs
- Tables
- Status chips
- Dependency nodes
- Timeline components
- Buttons
- Cards
- Typography
- Spacing
- Accessibility patterns

Do not introduce:

- AI approval recommendations
- risk scores
- decision confidence scores
- arbitrary completion percentages
- invented regulatory requirements
- invented dependency relationships
- invented external department decisions
- automatic approval
- automatic rejection

The system only propagates the authorised MIDC decision according to
configured dependency and synchronization rules.

--------------------------------------------------
26. CORE RULE
--------------------------------------------------

M27 MUST communicate:

"Here is what the MIDC decision changed."

It must NOT communicate:

"Here is what the system thinks should happen."

The officer decision already occurred in M25/M26.

M27 only makes the consequences visible, synchronized, auditable and
traceable.