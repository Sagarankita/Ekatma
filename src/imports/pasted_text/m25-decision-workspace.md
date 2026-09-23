Create:

M25 — MIDC Decision Workspace
M26 — Approval / Rejection / Correction Record

IMPORTANT ARCHITECTURAL RULE:

Do not redesign or duplicate the existing scrutiny, document, inspection,
dependency, query, Business DNA, or timeline screens.

M25 is the final officer decision workspace that brings together the
results already produced by those workflows.

M26 is the formal decision record generated from M25.

The flow must be:

SCRUTINY
→ DOCUMENT / DATA REVIEW
→ CROSS-FORM CONSISTENCY
→ DEPENDENCY REVIEW
→ QUERY / RESPONSE
→ DELTA RE-SCRUTINY IF REQUIRED
→ INSPECTION IF REQUIRED
→ FINAL DECISION
→ M26 DECISION RECORD
→ M27 DEPENDENCY UPDATE
→ M28 CONDITIONS / COMPLIANCE WHERE CONFIGURED

Do not create a new canonical application state called "DECISIONED".

Use the existing canonical application states.

Before final decision, the application may be:

DOCUMENT_SCRUTINY
INITIAL_SCRUTINY
TECHNICAL_SCRUTINY
QUERY_RAISED
CORRECTION_REQUIRED
RESUBMITTED
INSPECTION_PENDING
INSPECTION_SCHEDULED
FINAL_DECISION

After an approved decision:
APPROVED

After rejection:
REJECTED

CORRECTION REQUIRED remains part of the active rework/resubmission
lifecycle and is NOT equivalent to REJECTED.

--------------------------------------------------
M25 — DECISION WORKSPACE
--------------------------------------------------

PURPOSE:

M25 is the authorised officer's final evidence-review workspace.

It should answer:

"Has the application reached the final decision stage, what evidence
supports the record, what remains unresolved, and what decision outcome
is being recorded?"

The system organises and presents evidence.

The authorised officer remains responsible for the statutory decision.

DO NOT describe the system as automatically determining whether the
application should be approved or rejected.

--------------------------------------------------
A. PAGE HEADER
--------------------------------------------------

At the top show:

Application ID
Business / Project Name
MIDC Service
Project Stage
Application State
Current Application Desk
Officer's Assigned Desk
Region / Office
SLA State
Scrutiny Route

Example:

MIDC-APP-2026-00418
ABC Biotech Pvt. Ltd.
MIDC Building / Planning Service

FINAL DECISION

Application State:
FINAL_DECISION

Scrutiny Route:
Enhanced Review

SLA:
Due in 2 days

Keep Officer Context and Application Context visually separate.

Officer Context:
- Assigned Region / Office
- Assigned Desk
- Role

Application Context:
- Application Current Desk
- Service
- Application State
- SLA

--------------------------------------------------
B. DECISION READINESS SUMMARY
--------------------------------------------------

Create a factual summary panel at the top.

Do NOT create a percentage such as:
"94% ready"
"Decision confidence 87%"
"Approval probability"

Do NOT create an AI score.

Instead show factual readiness items.

Example:

FINAL REVIEW CHECK

✓ Scrutiny modules reviewed
✓ Required documents reviewed
✓ Cross-form consistency reviewed
✓ Queries resolved
✓ Latest resubmission reviewed
✓ Inspection completed
✓ Required dependencies checked
⚠ One item marked Needs Verification

Each item should be clickable and open the existing source screen.

Examples:

Scrutiny completed
→ relevant scrutiny workspace

Document review
→ M13

Cross-form consistency
→ M16

Queries / responses
→ M19

Delta review
→ M20

Inspection
→ M23 / M24

Dependencies
→ M17

This is a navigation and evidence summary, not an automated decision.

--------------------------------------------------
C. DECISION EVIDENCE SUMMARY
--------------------------------------------------

Create a structured evidence area containing:

1. SCRUTINY

Show:
- Scrutiny route
- Reviewed service modules
- Officer findings
- Outstanding Needs Verification items
- Relevant scrutiny notes

Provide:
"View Scrutiny Details"

Do not reproduce the full scrutiny workbench.

2. DOCUMENTS

Show:
- Required documents reviewed
- Verified documents
- Documents with issues
- Latest document versions
- Reused verified documents
- Pending evidence if any

For each important document show:

Document ID
Document type
Version
Source
Verification state
Officer scrutiny finding

Use the existing document repository.

Do not create a second document repository.

3. CROSS-FORM CONSISTENCY

Show:

Consistent fields
Mismatches
Accepted/justified exceptions
Unresolved mismatches

Example:

Plot Area
Master Project Dossier: 4,800 sq m
MIDC Application: 4,800 sq m
Building Application: 4,800 sq m

Status:
Consistent

If an issue exists:

Building Area
MIDC Application: 2,300 sq m
Supporting Plan: 2,500 sq m

Status:
Query resolved / Needs Verification / Unresolved

Provide:
"View Cross-form Review"

Do not allow M25 to silently modify another department's record.

4. QUERIES / RESPONSES

Show:

Query ID
Deficiency count
Date raised
Response received
Resubmission version
Resolution state

Example:

QRY-004
3 deficiencies
Resolved
Resubmission #2

Provide:
"View Query History"

5. DELTA RE-SCRUTINY

Only show this section when a resubmission/change exists.

Show:

Previous version
Current version
Changed fields
Affected fields
Unchanged fields
Affected dependencies
Re-scrutiny result

Example:

Plot Area
4,800 → 5,200 sq m

Building Area
2,000 → 2,300 sq m

Plan
v1 → v2

Show:
"View Delta Review"

Do not create a DELTA_REVIEW application state.

RESUBMITTED remains the canonical application state during resubmission.

6. INSPECTION

Show:

Inspection ID
Inspection type
Date
Outcome
Observations
Corrections
Re-inspection status

Possible factual outcomes:

Pass
Observation
Non-compliant
Correction required
Re-inspection required
Resolved

Important:

Inspection Pass ≠ Application Approval.

Inspection completion only becomes one input to the final decision.

Provide:
"View Inspection"

7. DEPENDENCIES

Show:

MIDC-controlled dependency nodes
External department nodes
Prerequisite status
Parallel services
Downstream services
Blocked/unlocked state

External departments may include:
MPCB
Fire
DISH
Boiler
Utilities
Sector authorities
or other configured departments.

External department records are read-only.

MIDC cannot approve, reject, edit, or impersonate another department's
decision.

Provide:
"View Dependency Journey"

--------------------------------------------------
D. REGULATORY BASIS
--------------------------------------------------

Create a "Relevant Regulatory Basis" panel.

Show only configured/source-backed information.

For each relevant reference:

Source type
Source title/reference
Effective date where available
Relevant provision/context
Rule version
Relationship to current service/review

Possible source types:

Act
Rule
GR
Circular
Department guideline
Configured service rule
Form requirement
Published regulatory reference

Do not invent legal citations.

Do not invent thresholds.

Do not display unsupported legal requirements.

If the source is uncertain or unavailable, use:

Needs Verification

The Officer Regulatory RAG may help retrieve/explain the source, but
does not make the statutory decision.

Provide:
"Open Regulatory Reference"

--------------------------------------------------
E. SLA / PROCESS HISTORY
--------------------------------------------------

Show a compact factual timeline:

Submission
→ Document Scrutiny
→ Initial Scrutiny
→ Technical Scrutiny
→ Query
→ Response
→ Resubmission
→ Delta Review
→ Inspection
→ Final Decision

Show:

Department processing time
Entrepreneur response time
Current desk time
Inspection waiting time
External dependency waiting time
Total elapsed time
SLA
SLA state

Do not use this information to automatically recommend approval or rejection.

--------------------------------------------------
F. DOWNSTREAM IMPACT
--------------------------------------------------

Before final decision, prominently show:

"Decision Impact"

Subtitle:

"What downstream workflow will this decision unlock or block?"

Create a dependency preview.

Example:

CURRENT MIDC NODE
Building / Planning
        ↓
Decision

If APPROVED:
✓ MIDC node becomes complete
✓ Configured downstream services may unlock
✓ Approval/order becomes available
✓ Configured conditions may generate compliance obligations

If CORRECTION REQUIRED:
↻ Application remains in active rework lifecycle
↻ Entrepreneur action required
⛔ Downstream nodes remain blocked where MIDC approval is a configured prerequisite

If REJECTED:
⛔ MIDC node becomes rejected
⛔ Dependent nodes remain blocked where applicable
→ Rejection reason is propagated through the journey

IMPORTANT:

This is a dependency consequence preview.

It is NOT an AI recommendation.

The system should show what the configured dependency graph says will
happen after each outcome.

--------------------------------------------------
G. DECISION ACTION AREA
--------------------------------------------------

Place the decision controls only after the evidence sections.

Show three clear outcome options:

APPROVE

CORRECTION REQUIRED

REJECT

These are decision outcomes, not automated recommendations.

The authorised officer must explicitly select the outcome.

Before committing, require the appropriate record fields.

--------------------------------------------------
APPROVE FLOW
--------------------------------------------------

When APPROVE is selected, open an approval decision form.

Required/available fields:

Decision ID
Application ID
Decision date
Decision role
Decision officer
Approval / Order type
Approval / Order number
Certificate number if applicable
Issue date
Expiry date if applicable
Conditions
Special conditions
Supporting basis/source
Officer remarks

Do not force an expiry date where the configured service does not have
one.

Do not fabricate conditions.

Conditions must be based on configured service rules, applicable
regulatory references, or officer-entered statutory decision conditions.

Provide a final review panel:

Decision:
APPROVE

Officer:
[authenticated officer]

Decision Date:
[date]

Supporting Basis:
[source/reference]

Conditions:
[list]

Downstream Effect:
[configured dependency result]

CTA:

"Record Approval"

Before recording, show a confirmation step.

--------------------------------------------------
CORRECTION REQUIRED FLOW
--------------------------------------------------

When CORRECTION REQUIRED is selected:

Do NOT create a rejection record.

Do NOT move the application to REJECTED.

Create a correction/rework record containing:

Query / Deficiency ID
Exact deficiency
Affected field
Affected document
Required correction
Supporting basis/source
Officer comment
Entrepreneur action
Required evidence
Response expectations where configured

Allow multiple deficiencies.

Example:

DEF-001
Plot area mismatch

Affected field:
Plot Area

Required action:
Correct application value or provide supporting evidence.

DEF-002
Building plan version mismatch

Affected document:
Building Plan

Required action:
Submit corrected document version.

Show:

"Correction Required"

Application remains active.

Downstream services remain blocked where the MIDC service is a configured
prerequisite.

CTA:

"Record Correction Requirement"

After recording:

→ CORRECTION_REQUIRED
→ entrepreneur notification
→ Query / Deficiency record
→ entrepreneur response
→ RESUBMITTED
→ Delta Re-scrutiny

Do not create a new application.

Do not destroy the previous version.

--------------------------------------------------
REJECT FLOW
--------------------------------------------------

When REJECT is selected:

Open a dedicated rejection record.

Require:

Decision ID
Application ID
Decision date
Decision role
Decision officer
Detailed rejection reason
Officer remarks
Supporting basis/source
Applicable appeal information if configured
Grievance information if configured
Reapplication information if configured

Do not use generic text such as:

"Application rejected due to issues."

The record must contain a specific officer-entered reason.

Show the supporting evidence/reference that forms the basis of the
recorded decision.

Before final submission show:

DECISION:
REJECT

REASON:
[Detailed officer-entered reason]

SUPPORTING BASIS:
[Configured source/reference]

DOWNSTREAM EFFECT:
[Configured dependency result]

CTA:

"Record Rejection"

After recording:

→ REJECTED
→ M26 Rejection Record
→ M27 Dependency Update
→ Entrepreneur notification

Do not automatically imply that every rejected application has the same
appeal or reapplication route.

Only show those pathways when configured.

--------------------------------------------------
H. FINAL CONFIRMATION
--------------------------------------------------

Before committing ANY final outcome, show a confirmation modal/panel.

Example:

"Confirm statutory decision"

Application:
MIDC-APP-2026-00418

Selected outcome:
APPROVE

Decision officer:
[authenticated officer]

The system has assembled the supporting application record and configured
dependency impact.

The authorised officer is responsible for the final decision.

Buttons:

Cancel
Return to Review

Confirm & Record Decision

Do not make the AI or system appear to be the decision-maker.

--------------------------------------------------
M26 — FORMAL DECISION RECORD
--------------------------------------------------

M26 is the immutable formal outcome record created after M25.

It should NOT be another review dashboard.

It should look like an official structured decision record.

Header:

Decision ID
Application ID
Business
MIDC Service
Decision
Decision Date
Officer / Decision Role
Region / Office
Application Version

--------------------------------------------------
M26 APPROVAL RECORD
--------------------------------------------------

If APPROVED, show:

APPROVAL / ORDER

Approval / Order ID
Certificate ID if applicable
Issue Date
Expiry Date if applicable
Decision Officer
Decision Role
Source / Supporting Basis
Conditions
Special Conditions

Related records:

Application
Business ID
Project ID
Business DNA version
Document versions
Inspection ID
Query ID(s)
Resubmission version
Dependency state
Regulatory rule version

Actions:

View Application
View Evidence
View Dependency Impact
View Certificate / Order
View Audit History

If a certificate/order is generated, store it using the existing document
and version model.

Do not create a separate certificate repository.

The approved certificate/order must become available to the
entrepreneur through the existing Document Centre / approval flow.

--------------------------------------------------
M26 REJECTION RECORD
--------------------------------------------------

If REJECTED, show:

REJECTION RECORD

Decision ID
Application ID
Decision Date
Decision Officer
Decision Role

Detailed Reason
Officer Remarks
Supporting Basis / Source

Applicable:
Appeal information
Grievance pathway
Reapplication information

Only display these if configured for the service/jurisdiction.

Show:

Dependency Effect:
[configured downstream state]

Actions:

View Application
View Evidence
View Regulatory Basis
View Dependency Impact
View Audit History

--------------------------------------------------
M26 CORRECTION RECORD
--------------------------------------------------

If CORRECTION REQUIRED:

Show:

CORRECTION REQUIRED

Query ID
Deficiency IDs
Application Version
Decision / Review Date
Officer
Officer Role

For every deficiency:

Deficiency ID
Issue
Affected Field
Affected Document
Required Correction
Supporting Basis / Source
Officer Comment
Entrepreneur Action
Required Evidence
Response State

Show the rework lifecycle:

CORRECTION_REQUIRED
        ↓
ENTREPRENEUR RESPONSE
        ↓
RESUBMITTED
        ↓
DELTA RE-SCRUTINY

Do not display CORRECTION REQUIRED as a terminal rejection.

The original application history remains intact.

--------------------------------------------------
M26 VERSION HISTORY
--------------------------------------------------

Every formal decision record must preserve version history.

Show:

Version
Date
Changed by
Change
Reason
Previous value
New value
Source

Example:

v1
Decision recorded
APPROVE

v2
Condition amended
Condition X updated
Reason:
[officer-entered reason]

Never silently overwrite a previous decision record.

If a permitted correction or amendment changes a record, create a new
version and preserve the old version.

--------------------------------------------------
M26 AUDIT
--------------------------------------------------

Every final decision must be auditable.

Record:

Who viewed
Who changed
What changed
Old value
New value
When
Why
Source
Decision
Decision role
Decision officer
Query
Entrepreneur response
Inspection
Dependency update
Rule version
Document version
Application version

Link to M38 Audit / History.

--------------------------------------------------
AFTER M26
--------------------------------------------------

Do not stop the prototype at the decision record.

Connect the result to M27.

APPROVED
→ M26 Approval Record
→ M27 Dependency Update
→ configured downstream nodes unlock
→ approval/order/certificate stored
→ entrepreneur status updated
→ configured conditions sent to compliance engine

CORRECTION REQUIRED
→ M26 Correction Record
→ Query / Deficiency
→ Entrepreneur response
→ RESUBMITTED
→ M20 Delta Re-scrutiny

REJECTED
→ M26 Rejection Record
→ M27 Dependency Update
→ configured dependent nodes remain blocked
→ entrepreneur receives decision
→ configured grievance / appeal / reapplication path

--------------------------------------------------
NAVIGATION
--------------------------------------------------

M25 must be reachable from:

Decisions
→ Decision Pending
→ Open Application
→ M25

It must also be reachable from:

Application Overview
→ Decision

and from:

Scrutiny
→ application
→ Final Decision

M26 must be reachable from:

M25
→ Record Decision

and:

Application Overview
→ Decision Record

and:

Decisions
→ Completed Decisions

Use breadcrumbs:

Department Home
/ Decisions
/ MIDC-APP-2026-00418
/ Decision Workspace

After recording:

Department Home
/ Decisions
/ MIDC-APP-2026-00418
/ Decision Record

Provide:

Back to Application
View Audit
View Dependency Impact

--------------------------------------------------
DESIGN RULES
--------------------------------------------------

Do not regenerate Phase 0.

Use the existing EKATMA government design system.

Use existing:

Header
Footer
Sidebar
Breadcrumbs
Tables
Status chips
Buttons
Cards
Typography
Spacing
Accessibility patterns

Do not introduce new branding.

Do not use:

AI confidence scores
approval probability
readiness percentage
automatic approval recommendation
automatic rejection recommendation
invented legal thresholds
invented appeal periods
invented compliance obligations
invented certificate expiry
invented external department decisions

The system is an evidence organisation and workflow system.

The authorised officer makes the statutory decision.

Keep machine/system facts visually distinct from officer-entered judgment.

Use source/provenance wherever evidence or regulatory basis is shown.

All records must preserve:

Application ID
Business ID
Project ID
MIDC Service ID
Business DNA version
Application version
Document version
Query ID
Deficiency ID
Resubmission version
Inspection ID
Decision ID
Approval/Order/Certificate ID where applicable
Dependency state
Regulatory rule version
Audit history

The final prototype must demonstrate:

M25 Decision Workspace
        ↓
Officer selects outcome
        ↓
M26 Formal Decision Record
        ↓
M27 Dependency Update
        ↓
Entrepreneur synchronization
        ↓
M28 Conditions / Compliance where configured

Do not duplicate the logic already implemented in M09-M24.
Use those existing records as evidence and link back to their source screens.