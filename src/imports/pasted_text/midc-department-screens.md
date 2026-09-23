Continue from the existing EKATMA MIDC Department Figma file.

Create and integrate:

M32 — Officer Regulatory RAG
M33 — Regulatory Change Centre
M34 — Regulatory Impact Analysis
M35 — Department Analytics
M36 — Bottleneck Analytics
M37 — Workload / Capacity
M38 — Audit / History

These are the final intelligence, governance, analytics and traceability screens for the MIDC Department / Officer side.

IMPORTANT:
Do not regenerate Phase 0.

Do not redesign:
- Maharashtra Government shell
- EKATMA branding
- typography
- colors
- spacing
- global sidebar
- header/footer
- existing tables
- status primitives
- application context
- Business DNA components
- dependency components
- audit primitives

Continue from the existing Figma file.

Preserve all existing M01–M31 screens.

Use Auto Layout.

Use realistic but prototype-safe sample data.

Keep:
Department = MIDC

Where relevant show:
Region / Office
Desk
Role
Permission scope

Do not invent official MIDC organisational hierarchy.

Do not invent statutory requirements, legal thresholds, SLA values, regulatory clauses, or official department responsibilities.

Use configured data wherever possible.

Use “Needs Verification” where a rule or source is uncertain.

AI/RAG may retrieve, explain, compare and cite.

AI/RAG must never make the statutory approval/rejection decision.

--------------------------------------------------
GLOBAL ARCHITECTURE
--------------------------------------------------

These seven screens have different responsibilities.

M32:
“What does the regulatory record say, and why is this requirement being checked?”

M33:
“What regulatory material changed, and who is authorised to validate/publish the new version?”

M34:
“What records, workflows and journeys are affected by that confirmed regulatory change?”

M35:
“What is happening across the authorised MIDC operational scope?”

M36:
“Why is work taking longer, and what is contributing to the delay?”

M37:
“Where is workload accumulating, and where is operational capacity/attention needed?”

M38:
“What exactly happened, who viewed/changed it, when, why, from which source/version, and what did it affect?”

Do not merge these responsibilities.

--------------------------------------------------
GLOBAL NAVIGATION RULE
--------------------------------------------------

Use the existing global navigation architecture.

Do not add every screen as a giant sidebar item.

Use the existing high-level navigation categories:

Department Home
My Queue
Applications
Scrutiny
Inspections
Queries / Deficiencies
Decisions
SLA & Escalations
Grievances
Regulatory Assistant
Analytics
Regulatory Changes
Workload
Audit / History

Notifications remain accessible from the top-right notification bell.

Application-specific screens remain inside the application workspace.

--------------------------------------------------
GLOBAL PERMISSION MODEL
--------------------------------------------------

Respect the permission model already established.

Officer account context contains:

Department
Region / Office
Service Scope
Desk
Role
Permissions

Do not allow the officer to manually switch to a broader scope simply through a filter.

Example:

An officer authorised for one office sees analytics for that office.

A leadership user with department-wide permission may see department-wide analytics.

A Regulatory Admin may manage regulatory rule versions.

A normal officer may view published regulatory references but must not edit or publish regulatory rules.

If a user does not have permission:

show the information where appropriate as restricted,
or hide the action,
or show:

“Requires configured permission.”

Do not create fake permission escalation.

--------------------------------------------------
M32 — OFFICER REGULATORY RAG
--------------------------------------------------

PURPOSE

Create an officer-facing regulatory assistant embedded into the MIDC Department workspace.

The RAG is primarily a source-backed retrieval and explanation interface.

Its purpose is to help an officer answer:

Why is this parameter checked?

Which GR / rule applies?

What clause defines this requirement?

What evidence is expected?

Has this requirement changed?

What is the latest circular?

Can this be explained in Marathi?

Can this be explained in English?

The RAG should be contextual to the officer's current work whenever opened from an application.

--------------------------------------------------
M32 — ENTRY POINTS
--------------------------------------------------

Allow M32 to be opened from:

M06 Application Overview
M07 Business DNA
M09 Automated Pre-check
M10 Scrutiny Route
M11–M15 Service Scrutiny
M16 Cross-form Consistency
M17 Dependency
M18 Query Builder
M20 Delta Re-scrutiny
M25 Decision Workspace
M28 Conditions / Compliance
M29 Amendment
M33 Regulatory Change

When opened from an application, preserve context.

Example:

Application:
MIDC-APP-2026-00421

Parameter:
Built-up Area

Service:
Building / Planning

The RAG should understand that context and retrieve relevant configured sources.

Do not make the officer manually re-enter information already available in the application.

--------------------------------------------------
M32 — PAGE STRUCTURE
--------------------------------------------------

Create:

Breadcrumb:

Department Home
→ Regulatory Assistant
→ Officer Regulatory RAG

Page title:

Officer Regulatory Assistant

Subtitle:

“Retrieve and explain source-backed regulatory requirements for the current MIDC review.”

Use a two-column layout.

LEFT:
Question / context / conversation area

RIGHT:
Sources / clauses / rule metadata

Do not style this like a consumer chatbot.

It should look like a government regulatory research tool.

--------------------------------------------------
M32 — CONTEXT HEADER
--------------------------------------------------

When launched from an application, show:

Application ID
Business
MIDC Service
Parameter / Requirement
Application Version
Business DNA Version

Example:

Application:
MIDC-APP-2026-00421

Service:
Building / Planning

Parameter:
Built-up Area

Business DNA:
Version 4

This makes it clear what the question relates to.

--------------------------------------------------
M32 — QUESTION TYPES
--------------------------------------------------

Provide suggested question chips:

Why is this parameter checked?

Which GR / rule applies?

What clause defines this requirement?

What evidence is expected?

Has this requirement changed?

What is the latest circular?

Explain this requirement in Marathi.

Explain this requirement in English.

Do not imply that the suggested question automatically has a legally correct answer.

The answer must always be source-backed.

--------------------------------------------------
M32 — RESPONSE STRUCTURE
--------------------------------------------------

Every answer should have:

Answer

Source

Clause / Section

Effective Date

Related Requirement

Rule Version

Where available:

Related Circular
Document
Page / Section
Applicable Service
Applicable Parameter

Example:

ANSWER

“This parameter is checked because the configured MIDC Building / Planning requirement references the applicable building review condition.”

SOURCE

[Configured regulatory source]

CLAUSE

[Configured clause/reference]

EFFECTIVE DATE

[Configured effective date]

RELATED REQUIREMENT

Building / Planning — Built-up Area

RULE VERSION

MIDC-RULE-2026-V3

Do not invent actual legal text.

Use clearly marked prototype-safe placeholders if source content is not configured.

--------------------------------------------------
M32 — SOURCE PANEL
--------------------------------------------------

The right-side panel should show:

Source title
Source type
Source authority
Document date
Effective date
Rule version
Relevant section
Relevant clause
Superseded version if applicable
Current status

Source types may include:

GR
Act
Rule
Circular
Department Guideline
Form
Policy Document

Only use categories that exist in the configured regulatory repository.

--------------------------------------------------
M32 — VERSION COMPARISON
--------------------------------------------------

For:

“Has this changed?”

show a comparison:

Previous Rule Version
Current Rule Version

Highlight:

Changed requirement
Changed evidence
Changed form
Changed threshold if legitimately configured
Changed SLA if legitimately configured
Changed condition
Changed effective date

Do not fabricate differences.

If no verified change exists:

“No confirmed change found in the configured regulatory source.”

If a possible change is detected but not validated:

“Possible change detected — Regulatory Admin review required.”

--------------------------------------------------
M32 — BILINGUAL EXPLANATION
--------------------------------------------------

Provide:

English
Marathi

toggle.

The English and Marathi explanation should refer to the same source.

Do not silently alter legal meaning between languages.

Display:

Source language
Translated/explained language

Where exact legal wording matters, preserve the authoritative source reference.

Do not present an AI translation as the authoritative legal text.

--------------------------------------------------
M32 — SOURCE CONFIDENCE / RETRIEVAL STATUS
--------------------------------------------------

Do not create a generic AI confidence percentage.

Instead show factual retrieval states:

Source Found
Multiple Sources Found
Source Not Found
Possible Conflict
Superseded Source
Needs Regulatory Review

If sources conflict:

show both relevant sources and their dates/versions.

Do not have the AI decide which rule legally prevails.

--------------------------------------------------
M32 — ACTIONS
--------------------------------------------------

Allowed actions:

Open Source
Open Clause
Compare Versions
Open Related Requirement
Open Regulatory Change
Copy Reference
Explain in Marathi
Explain in English
Open Audit

Do not provide:

Approve
Reject
Accept Requirement
Waive Requirement
Override Rule

The RAG is advisory/retrieval-based.

--------------------------------------------------
M32 — RAG APPLICATION CONTEXT
--------------------------------------------------

If opened from scrutiny, show:

“Using current application context”

with:

Application ID
Service
Parameter
Business DNA Version

If opened globally:

show:

“No application context selected.”

Allow the officer to search the regulatory repository without an application.

--------------------------------------------------
M32 — EDGE STATES
--------------------------------------------------

Create:

No source found

Possible conflicting sources

Source superseded

Source pending Regulatory Admin validation

Multiple applicable sources

No confirmed change

Needs Verification

The interface should never manufacture an answer merely to fill empty space.

--------------------------------------------------
M33 — REGULATORY CHANGE CENTRE
--------------------------------------------------

PURPOSE

Create a permission-gated regulatory governance workspace.

M33 manages regulatory documents and rule versions after new material is detected.

The workflow is:

NEW DOCUMENT
↓
RAG / CHANGE DETECTION
↓
POSSIBLE CHANGE
↓
IMPACT IDENTIFICATION
↓
AUTHORISED REGULATORY ADMIN REVIEW
↓
CONFIRM / EDIT / REJECT
↓
PUBLISH NEW VERSION
↓
M34 IMPACT ANALYSIS

M33 is NOT a general document upload library.

It is specifically for regulatory knowledge governance.

--------------------------------------------------
M33 — PAGE HEADER
--------------------------------------------------

Breadcrumb:

Department Home
→ Regulatory Changes
→ Regulatory Change Centre

Title:

Regulatory Change Centre

Subtitle:

“Review, validate and publish versioned regulatory changes within authorised permissions.”

--------------------------------------------------
M33 — CHANGE QUEUE
--------------------------------------------------

Create a table:

Change ID
Source
Document Type
Detected Date
Published Date
Potential Change
Affected Requirement
Potential Impact
Validation Status
Current Rule Version
Proposed Rule Version
Assigned Regulatory Admin
Action

Possible statuses:

New
Under Review
Impact Analysis
Confirmed
Edited
Rejected
Published

These are regulatory-change workflow statuses.

They do not replace application states.

--------------------------------------------------
M33 — SOURCE TYPES
--------------------------------------------------

Support:

GRs
Acts
Rules
Circulars
Department Guidelines
Forms
Policy Documents

Do not add random categories.

--------------------------------------------------
M33 — CHANGE DETAIL
--------------------------------------------------

Clicking a change opens a detail workspace.

Show:

Change ID
Source
Document title
Issuing authority
Document date
Effective date
Detected date
Current version
Proposed version
Detection reason
Changed sections
Potential impact
Affected requirement
Affected service
Affected form
Affected SLA if configured
Affected condition if configured
Affected document requirement
Affected procedure

Do not state an impact as confirmed until the authorised workflow confirms it.

--------------------------------------------------
M33 — BEFORE / AFTER REGULATORY VIEW
--------------------------------------------------

Create:

Previous Version

and:

Proposed Version

side-by-side.

Show:

Unchanged
Changed
Added
Removed

Use visual highlighting.

Preserve the old version.

Never overwrite the old rule.

--------------------------------------------------
M33 — PERMISSION GATING
--------------------------------------------------

REGULAR OFFICER:

Can:
View published references
View confirmed changes
View relevant impact
Search sources

Cannot:
Confirm
Edit
Reject
Publish

REGULATORY ADMIN:

Can:
Review
Confirm
Edit
Reject
Publish

Show disabled controls with:

“Requires Regulatory Admin permission.”

Do not allow the prototype to imply that every MIDC officer can modify the regulatory engine.

--------------------------------------------------
M33 — CONFIRM CHANGE
--------------------------------------------------

For Regulatory Admin only.

Create confirmation panel:

Confirm Regulatory Change

Show:

Source
Previous version
Proposed version
Effective date
Affected requirements
Impact summary
Reviewer
Review date
Reason / notes

CTA:

Confirm

After confirmation:

Create a new rule version.

Do not modify the historical version.

--------------------------------------------------
M33 — EDIT CHANGE
--------------------------------------------------

For Regulatory Admin only.

Allow configured fields to be corrected.

Show:

Original extracted/entered value
Edited value
Reason
Editor
Timestamp

Preserve the original source.

The edit must become part of the audit trail.

--------------------------------------------------
M33 — REJECT CHANGE
--------------------------------------------------

For Regulatory Admin only.

Require:

Rejection reason

Possible reason:

Not applicable
False positive
Duplicate
No substantive change
Insufficient evidence
Other configured reason

Do not delete the source record.

Keep it in history as:

Rejected

--------------------------------------------------
M33 — PUBLISH VERSION
--------------------------------------------------

Publishing creates:

New Regulatory Rule Version

with:

Rule Version ID
Source
Effective Date
Published Date
Published By
Supersedes Version
Affected Services
Affected Requirements

Do not silently activate the new rule.

Show:

“Version published.”

Then link to:

M34 Regulatory Impact Analysis

--------------------------------------------------
M33 — VERSION HISTORY
--------------------------------------------------

Create a persistent version timeline:

V1
Original published rule

↓

V2
Amended rule

↓

V3
Current published rule

Every version shows:

Source
Effective date
Status
Published by
Superseded by
Impact analysis
Audit

Historical versions remain viewable.

--------------------------------------------------
M34 — REGULATORY IMPACT ANALYSIS
--------------------------------------------------

PURPOSE

M34 determines the operational blast radius of a confirmed regulatory change.

It answers:

“What existing records, workflows, requirements and entrepreneur journeys may be affected by this newly confirmed rule version?”

It does NOT itself modify every affected record automatically.

--------------------------------------------------
M34 — PAGE HEADER
--------------------------------------------------

Breadcrumb:

Department Home
→ Regulatory Changes
→ Impact Analysis

Title:

Regulatory Impact Analysis

Subtitle:

“Identify applications, requirements, workflows and journeys affected by a confirmed regulatory change.”

Top context:

Change ID
Rule Version
Source
Effective Date
Status

--------------------------------------------------
M34 — IMPACT SUMMARY
--------------------------------------------------

Create KPI cards:

Active Applications Affected
Draft Applications Affected
Submitted Applications Affected
Approvals Affected
Renewals Affected
Compliance Obligations Affected
Document Requirements Affected
Procedures Affected
Entrepreneur Journeys Affected

These are counts derived from configured records.

Do not fabricate counts.

--------------------------------------------------
M34 — IMPACT CATEGORIES
--------------------------------------------------

Create tabs:

Applications
Approvals
Renewals
Compliance
Documents
Procedures
Entrepreneur Journeys
Dependencies

Each tab shows affected records.

--------------------------------------------------
M34 — APPLICATION IMPACT
--------------------------------------------------

Show:

Application ID
Business
Service
Current State
Current Rule Version
New Rule Version
Affected Requirement
Potential Action
Effective Date
Impact Status

Possible impact statuses:

Review Required
Requirement Changed
No Action Required
Needs Verification
Already Compliant
Transition Required

Do not automatically reject an application because a rule changed.

--------------------------------------------------
M34 — DRAFT APPLICATION IMPACT
--------------------------------------------------

For draft applications:

Show:

Draft Application
Current journey version
New rule version
Affected requirement
Document impact
Form impact
Suggested next action

Do not silently rewrite the entrepreneur's data.

Preserve the previous journey/version.

--------------------------------------------------
M34 — SUBMITTED APPLICATION IMPACT
--------------------------------------------------

For submitted applications:

Show:

Application state
Rule version at submission
Current rule version
Affected field/requirement
Whether transition rule applies
Officer action required

Do not assume that every newly published rule applies retroactively.

Applicability must come from configured transition/effective-date rules.

--------------------------------------------------
M34 — APPROVAL IMPACT
--------------------------------------------------

Show:

Approval / Order ID
Decision date
Rule version at decision
Current rule version
Condition impact
Validity impact if configured
Renewal impact
Compliance impact

Do not silently alter historical approvals.

If a new rule does not affect the old approval:

show:

“No configured retrospective impact.”

--------------------------------------------------
M34 — COMPLIANCE IMPACT
--------------------------------------------------

Show:

Compliance Obligation ID
Source approval
Existing condition
Rule version
New rule version
Potential change
Effective date
Action required

Connect to M28.

Do not invent a new compliance obligation merely because a regulation changed.

Only create/update obligations through configured rules.

--------------------------------------------------
M34 — DOCUMENT IMPACT
--------------------------------------------------

Show:

Document Requirement
Current Requirement
New Requirement
Current Version
New Rule Version
Affected Service
Action

Possible actions:

No Change
Additional Evidence
Updated Form
New Document
Re-verification

Use the existing Document Centre.

--------------------------------------------------
M34 — ENTREPRENEUR JOURNEY IMPACT
--------------------------------------------------

Show:

Business
Business DNA Version
Journey Version
Affected Requirement
Current State
New Requirement
Notification Status
Action

The system may generate:

Notify Entrepreneur

but do not claim notification was delivered unless the notification system actually records that state.

--------------------------------------------------
M34 — ACTIONS
--------------------------------------------------

Provide:

Notify Entrepreneur
Notify Officers
Open Affected Application
Open Requirement
Open Rule Version
Open Compliance
Open Document Requirement
Open Procedure
Open Audit

For authorised users where configured:

Update Validated Requirement

This action must create a new version.

Do not overwrite the historical rule.

--------------------------------------------------
M34 — IMPACT STATUS
--------------------------------------------------

Use:

Identified
Under Review
Validated
Action Required
Notification Pending
Updated
No Action Required

Do not create an application decision state here.

--------------------------------------------------
M35 — DEPARTMENT ANALYTICS
--------------------------------------------------

PURPOSE

M35 is the descriptive operational analytics workspace.

It answers:

“What is happening across my authorised MIDC operational scope?”

M35 should not try to explain causality in depth.

That belongs in M36.

M35 should show trends, distributions, volumes and process patterns.

--------------------------------------------------
M35 — PAGE HEADER
--------------------------------------------------

Breadcrumb:

Department Home
→ Analytics
→ Department Analytics

Title:

Department Analytics

Subtitle:

“Operational trends, processing patterns and workflow metrics within your authorised scope.”

Show scope:

My Desk
My Office
Configured Region
Department-wide

Only display scopes permitted by the user's role.

--------------------------------------------------
M35 — FILTER BAR
--------------------------------------------------

Filters:

Date Range
MIDC Service
Office / Region
Desk
Application State
Project Stage
Inspection Status
SLA Status
Dependency State

Use existing filter components.

--------------------------------------------------
M35 — CORE METRICS
--------------------------------------------------

Create:

Pending Applications
Average Processing Time
Median Processing Time
SLA Breaches
Query Frequency
Average Query Rounds
Inspection Waiting Time
Rework Loops
Dependency Delays
Grievances
Amendments

Where applicable:

Compliance / Renewal Delays

Only display compliance/renewal metrics where configured obligations exist.

--------------------------------------------------
M35 — ANALYTIC VIEWS
--------------------------------------------------

Provide tabs or segmented views:

TREND

FUNNEL

QUEUE AGEING

PROCESS FLOW

DRILL-DOWN TABLE

DEPENDENCY VIEW

--------------------------------------------------
M35 — TREND
--------------------------------------------------

Show trends over time for:

Applications received
Applications processed
Applications pending
Average processing time
Median processing time
SLA breaches
Queries
Inspections
Decisions
Amendments
Grievances

Do not create arbitrary “efficiency scores.”

--------------------------------------------------
M35 — FUNNEL
--------------------------------------------------

Example:

Submitted
↓
Document Scrutiny
↓
Technical Scrutiny
↓
Query
↓
Resubmission
↓
Inspection
↓
Decision
↓
Approved / Rejected / Correction

The funnel must reflect actual application state transitions.

Do not imply every application follows every stage.

--------------------------------------------------
M35 — QUEUE AGEING
--------------------------------------------------

Show:

Application Age
Current State
Current Desk
SLA State

Use existing SLA definitions:

Normal
Approaching Deadline
SLA Exceeded

Allow drill-down to M03/M30.

--------------------------------------------------
M35 — PROCESS FLOW
--------------------------------------------------

Show where applications spend time across:

Submission
Document Scrutiny
Technical Scrutiny
Query
Entrepreneur Response
Inspection
Decision

Clicking a process stage should filter the underlying records.

--------------------------------------------------
M35 — DRILL-DOWN TABLE
--------------------------------------------------

Provide:

Application ID
Business
Service
State
Desk
SLA
Age
Query rounds
Inspection
Dependency
Decision

This table must use the same underlying application records as M03/M30.

--------------------------------------------------
M35 — DEPENDENCY VIEW
--------------------------------------------------

Show:

Dependency
Affected applications
Average waiting time
Pending
Completed
Blocked
Needs Verification

Link to M17.

External department data remains contextual/read-only.

--------------------------------------------------
M35 — REQUIRED METRICS
--------------------------------------------------

Support:

Pending by service
Pending by desk
Pending by office
Average processing time
Median processing time
SLA breaches
Query frequency
Query rounds
Common missing documents
Common inconsistencies
Correction reasons
Rejection reasons
Inspection waiting
Rework loops
Dependency delays
Geographic bottlenecks
Service bottlenecks
Grievance patterns
Amendment volumes
Configured compliance/renewal delays
Common inspection coordination opportunities

Do not add incentive-claim analytics unless MIDC is configured as the administering authority for the relevant scheme.

--------------------------------------------------
M36 — BOTTLENECK ANALYTICS
--------------------------------------------------

PURPOSE

M36 is not another volume dashboard.

Its purpose is:

“Why is the process taking longer?”

Use process-time decomposition.

--------------------------------------------------
M36 — PAGE HEADER
--------------------------------------------------

Breadcrumb:

Department Home
→ Analytics
→ Bottleneck Analytics

Title:

Bottleneck Analytics

Subtitle:

“Identify observed contributors to processing delay and workflow rework.”

--------------------------------------------------
M36 — BOTTLENECK BREAKDOWN
--------------------------------------------------

For a selected:

Service
Office
Region
Date range

show elapsed-time components:

Entrepreneur Preparation / Response
Document Scrutiny
Technical / Service Scrutiny
Inspection Waiting
Final Decision
External Dependency

Use actual observed data.

Do not invent a causal explanation when the data only shows correlation.

--------------------------------------------------
M36 — SELECTED PROCESS
--------------------------------------------------

Example:

Selected Service:
Building / Planning

Selected Period:
Configured date range

Observed Journey Time:
XX days

Breakdown:

Entrepreneur Response
X days

Document Scrutiny
X days

Technical Scrutiny
X days

Inspection Waiting
X days

Final Decision
X days

External Dependency
X days

--------------------------------------------------
M36 — LARGEST OBSERVED DELAY
--------------------------------------------------

Show:

Largest Observed Delay Contributor

Example:

Inspection Waiting

Observed contribution:
X days

Share of measured elapsed time:
X%

IMPORTANT:

Use factual wording:

“Largest observed contributor”

Do not say:

“Responsible officer”

or:

“Officer failure”

unless there is a separately verified administrative finding.

--------------------------------------------------
M36 — BOTTLENECK TABLE
--------------------------------------------------

Columns:

Process Stage
Average Time
Median Time
Applications Affected
SLA Impact
Rework Frequency
Observed Contribution
Drill Down

Example:

Inspection Waiting
X days
X days
XX applications
High SLA impact
X reinspection loops
Largest observed contributor

Click:

Open Inspection Queue

--------------------------------------------------
M36 — REWORK LOOP VIEW
--------------------------------------------------

Show patterns such as:

Scrutiny
→ Query
→ Response
→ Query
→ Response
→ Resubmission

Metrics:

Applications with multiple query rounds
Average rounds
Most repeated deficiency categories
Time spent in repeated loops

Do not assume that repeated queries are automatically a department problem.

Distinguish:

Applicant correction
Document deficiency
Data inconsistency
Technical clarification
External dependency

--------------------------------------------------
M36 — DEPENDENCY DELAY VIEW
--------------------------------------------------

Show:

Dependency
Applications waiting
Average waiting time
Current state
Affected downstream services

Link to M17.

Do not attribute external delays to MIDC officers.

--------------------------------------------------
M36 — GEOGRAPHIC / SERVICE BOTTLENECK
--------------------------------------------------

Show:

Office / Region
Service
Observed delay
Applications affected
Primary process stage

Do not create public officer rankings.

Do not turn this into performance punishment.

--------------------------------------------------
M36 — NO-DATA STATE
--------------------------------------------------

If the dataset is too small:

“Insufficient observed workflow data to identify a reliable bottleneck.”

Do not manufacture a bottleneck.

--------------------------------------------------
M37 — WORKLOAD / CAPACITY
--------------------------------------------------

PURPOSE

M37 is an operational planning workspace.

It answers:

“Where is work accumulating, and where may capacity/attention be required?”

It is not a public ranking system.

--------------------------------------------------
M37 — PAGE HEADER
--------------------------------------------------

Breadcrumb:

Department Home
→ Workload
→ Workload / Capacity

Title:

Workload / Capacity

Subtitle:

“View operational queues, application age and configured workload indicators for planning and allocation.”

--------------------------------------------------
M37 — FILTERS
--------------------------------------------------

Filters:

Office / Region
Service
Desk
Date
Application State
SLA Status
Inspection
Decision Queue

--------------------------------------------------
M37 — SUMMARY CARDS
--------------------------------------------------

Show:

Current Queue
New Today
Due Soon
SLA Risk
SLA Breached
Inspection Queue
Decision Queue

These are operational counts.

--------------------------------------------------
M37 — VIEWS
--------------------------------------------------

Create:

OFFICE VIEW

SERVICE VIEW

DESK VIEW

APPLICATION AGE VIEW

--------------------------------------------------
M37 — OFFICE VIEW
--------------------------------------------------

Show:

Office / Region
Current Queue
New Today
Due Soon
SLA Risk
Breached
Inspection Queue
Decision Queue

Use for planning.

Do not automatically label an office “underperforming.”

--------------------------------------------------
M37 — SERVICE VIEW
--------------------------------------------------

Show:

Service
Current Queue
New
Due Soon
SLA Risk
Breached
Inspection
Decision Pending

Allow drill-down to M03.

--------------------------------------------------
M37 — DESK VIEW
--------------------------------------------------

Show:

Desk
Current Queue
New
Due Soon
SLA Risk
Breached
Inspection
Decision

Keep officer identity separate from queue/desk metrics unless permissions explicitly support it.

Do not create a simplistic individual productivity leaderboard.

--------------------------------------------------
M37 — APPLICATION AGE VIEW
--------------------------------------------------

Show:

Application
Age
Current State
Current Desk
SLA
Waiting Reason
Inspection
Dependency

Use the same SLA and canonical state vocabulary already established.

--------------------------------------------------
M37 — CAPACITY PLANNING PANEL
--------------------------------------------------

Create a planning-oriented panel:

Current Queue Pressure

Show:

Queue volume
Due soon
SLA risk
Inspection demand
Decision demand

Where actual capacity data exists/configured:

Available capacity
Assigned capacity
Capacity gap

If capacity data does not exist:

show:

“Capacity data not configured.”

Do not fabricate staff counts.

--------------------------------------------------
M37 — ALLOCATION / PLANNING ACTIONS
--------------------------------------------------

Where permissions allow:

Open Queue
Review Workload
Open Service Queue
Open Inspection Queue
Open Decision Queue

Do not provide automatic officer reassignment unless a configured workflow supports it.

Do not allow analytics to silently reassign applications.

--------------------------------------------------
M38 — AUDIT / HISTORY
--------------------------------------------------

PURPOSE

M38 is the system-wide traceability workspace.

It answers:

Who did what?

When?

To which record?

What changed?

What was the old value?

What is the new value?

Why?

What source caused the change?

Which version was involved?

What downstream record was affected?

--------------------------------------------------
M38 — PAGE HEADER
--------------------------------------------------

Breadcrumb:

Department Home
→ Audit / History

Title:

Audit / History

Subtitle:

“Trace views, changes, decisions, workflow events and version history across the MIDC system.”

--------------------------------------------------
M38 — AUDIT SEARCH
--------------------------------------------------

Search by:

Application ID
Business ID
Project ID
Decision ID
Query ID
Inspection ID
Grievance ID
Change ID
Document ID
Dependency ID
Rule Version
Officer / User
Date
Event type

Use configured permissions to determine what the user can see.

--------------------------------------------------
M38 — AUDIT TABLE
--------------------------------------------------

Columns:

Timestamp
Actor
Role
Action
Record
Old Value
New Value
Source
Reason
Version
Related Event

Example:

23 Sep 2026
Officer / Planning Desk
Updated scrutiny finding
Application MIDC-APP-2026-00421
Status:
Needs Verification
→
Valid
Source:
Officer Review
Reason:
Verified against submitted document
Application Version:
v3

--------------------------------------------------
M38 — VIEW EVENTS
--------------------------------------------------

Record:

Who viewed
What was viewed
When
Why where required/configured

Important:

Do not imply that merely viewing a record changed the record.

Distinguish:

VIEW

from:

CHANGE

--------------------------------------------------
M38 — CHANGE EVENTS
--------------------------------------------------

Record:

Actor
Timestamp
Old value
New value
Reason
Source
Record version

Examples:

Business DNA change
Application update
Scrutiny finding
Query
Query response
Inspection observation
Decision
Dependency update
Regulatory rule update
Document version
Grievance update

--------------------------------------------------
M38 — DECISION AUDIT
--------------------------------------------------

Show:

Decision ID
Application ID
Decision outcome
Officer
Role
Date
Application Version
Business DNA Version
Rule Version
Supporting records
Approval / Order
Conditions

Link to M25/M26.

Do not allow editing the decision from Audit.

--------------------------------------------------
M38 — QUERY AUDIT
--------------------------------------------------

Show:

Query ID
Deficiency ID
Raised by
Date
Response
Response date
Resubmission version
Resolution

Link to M18/M19/M20.

--------------------------------------------------
M38 — INSPECTION AUDIT
--------------------------------------------------

Show:

Inspection ID
Checklist version
Scheduled date
Actual date
Officer/team
Observation
Evidence
Reinspection
Resolution

Link to M21–M24.

--------------------------------------------------
M38 — REGULATORY VERSION AUDIT
--------------------------------------------------

Show:

Rule Version
Previous Version
New Version
Source
Reviewer
Reviewer role
Confirm/Edit/Reject/Publish action
Effective date
Impact analysis
Publication date

Link to M33/M34.

--------------------------------------------------
M38 — DEPENDENCY UPDATE AUDIT
--------------------------------------------------

Show:

Dependency
Before state
After state
Trigger
Source
Timestamp
Related decision
Related application
External department if applicable

Use language:

“Dependency availability updated”

rather than incorrectly claiming:

“External department approved.”

--------------------------------------------------
M38 — DOCUMENT VERSION AUDIT
--------------------------------------------------

Show:

Document ID
Version
Previous version
New version
Uploaded by
Verified by
Verification state
Source
Related application
Related requirement

Never overwrite the old document history.

--------------------------------------------------
M38 — AUDIT TIMELINE
--------------------------------------------------

For a selected application, create a chronological timeline:

Application Submitted
↓
Pre-check
↓
Scrutiny
↓
Query
↓
Entrepreneur Response
↓
Resubmission
↓
Delta Review
↓
Inspection
↓
Decision
↓
Dependency Update
↓
Compliance
↓
Amendment

Every event links to its underlying record.

This timeline must use the same event history as M08.

Do not create a second contradictory timeline.

--------------------------------------------------
M38 — FILTERS
--------------------------------------------------

Provide:

Date
Actor
Role
Event Type
Application
Service
Record Type
Source
Rule Version
Document Version
Decision
Inspection
Query
Escalation
Dependency

--------------------------------------------------
M38 — VERSION COMPARISON
--------------------------------------------------

For versioned records, provide:

Previous Version
Current Version

Show:

Added
Changed
Removed
Unchanged

This is especially important for:

Business DNA
Applications
Documents
Rules
Amendments
Dependencies

--------------------------------------------------
M38 — IMMUTABILITY PRINCIPLE
--------------------------------------------------

Audit records cannot be edited from the Audit screen.

Show:

“Historical audit records are immutable.”

If a correction is necessary, create a new corrective event rather than rewriting history.

--------------------------------------------------
M38 — EXPORT
--------------------------------------------------

If export is configured:

Export Audit Record

Require appropriate permission.

Do not create a generic unrestricted data export.

--------------------------------------------------
FINAL CROSS-SCREEN INTEGRATION
--------------------------------------------------

Connect:

M32 RAG
→ M11–M20 scrutiny
→ M25 decision
→ M28 conditions
→ M33 regulatory changes

M33 Regulatory Change Centre
→ M34 impact analysis
→ M32 RAG
→ M38 audit

M34 Impact Analysis
→ affected applications
→ affected requirements
→ affected documents
→ affected compliance
→ affected entrepreneur journeys
→ M38 audit

M35 Department Analytics
→ M03 Queue
→ M30 SLA
→ M21 Inspection
→ M17 Dependency
→ M31 Grievance
→ M29 Amendment
→ M38 Audit

M36 Bottleneck Analytics
→ M03 Queue
→ M08 Timeline
→ M30 SLA
→ M21–M24 Inspection
→ M17 Dependency
→ M35 Analytics
→ M38 Audit

M37 Workload / Capacity
→ M03 Queue
→ M21 Inspection Queue
→ M25 Decision Workspace
→ M30 SLA
→ M35 Analytics
→ M38 Audit

M38 Audit
→ every major workflow record

--------------------------------------------------
FINAL APPLICATION JOURNEY
--------------------------------------------------

Ensure the complete MIDC officer journey is connected as:

LOGIN
↓
MIDC HOME
↓
QUEUE / SEARCH
↓
APPLICATION OVERVIEW
↓
BUSINESS DNA
↓
AUTOMATED PRE-CHECK
↓
SCRUTINY ROUTER
↓
SERVICE SCRUTINY
↓
DOCUMENT REVIEW
↓
CROSS-FORM CONSISTENCY
↓
DEPENDENCY REVIEW
↓
QUERY
↓
ENTREPRENEUR RESPONSE
↓
RESUBMISSION
↓
DELTA RE-SCRUTINY
↓
INSPECTION
↓
DECISION
↓
FORMAL DECISION RECORD
↓
DEPENDENCY UPDATE
↓
CONDITIONS / COMPLIANCE
↓
EXPANSION / AMENDMENT
↓
SLA / ESCALATION / GRIEVANCE

Parallel intelligence layer:

APPLICATION
↓
OFFICER RAG

REGULATORY SOURCE
↓
REGULATORY CHANGE CENTRE
↓
IMPACT ANALYSIS
↓
AFFECTED APPLICATIONS / REQUIREMENTS / JOURNEYS

Operational intelligence:

WORKFLOW DATA
↓
DEPARTMENT ANALYTICS
↓
BOTTLENECK ANALYTICS
↓
WORKLOAD / CAPACITY

All events:

WORKFLOW / DATA / REGULATORY EVENTS
↓
AUDIT / HISTORY

--------------------------------------------------
FINAL DATA CONSISTENCY CHECK
--------------------------------------------------

Use the same shared records throughout the entire Figma prototype.

Application ID must remain identical.

Business ID must remain identical.

Project ID must remain identical.

MIDC Service ID must remain identical.

Business DNA version must remain consistent unless intentionally changed.

Application Version must remain consistent unless intentionally changed.

Query ID and Query Version must remain consistent.

Deficiency ID must remain consistent.

Inspection ID must remain consistent.

Decision ID must remain consistent.

Approval / Order ID must remain consistent.

Dependency node and dependency state must remain consistent.

SLA status must remain consistent.

Rule Version must remain consistent.

Document ID / Document Version must remain consistent.

Grievance ID must remain consistent.

Compliance Obligation ID must remain consistent where applicable.

--------------------------------------------------
FINAL BUSINESS DNA CONSISTENCY CHECK
--------------------------------------------------

The officer must always see the entrepreneur's relevant Business DNA as the source context.

Do not manually reconstruct it.

Preserve:

NOT_VISIBLE
VISIBLE
REQUIRED
ANSWERED
VALIDATED
CONFIRMED
SKIPPED
NOT_APPLICABLE
NEEDS_REVIEW

separately from:

SELF_DECLARED
USER_CONFIRMED
SYSTEM_VERIFIED
DEPARTMENT_VERIFIED
NEEDS_VERIFICATION
INVALID
EXPIRED

NOT_APPLICABLE must never be treated as missing.

NEEDS_VERIFICATION must never be silently converted into a valid value.

--------------------------------------------------
FINAL EXTERNAL DEPARTMENT CHECK
--------------------------------------------------

MIDC may see:

MPCB
Fire
DISH
Boiler
Utilities
Sector Authorities

as:

Prerequisite
Dependency
Context
Parallel Node
Downstream Node

MIDC cannot:

Approve their service
Reject their service
Edit their decision
Impersonate their department
Change their official record

Use:

“Dependency availability”

where appropriate.

--------------------------------------------------
FINAL AI / RAG BOUNDARY
--------------------------------------------------

AI may:

Retrieve
Explain
Summarize
Compare
Translate/explain in Marathi or English
Detect possible regulatory changes
Identify potential impact
Surface relevant records
Help officers navigate evidence

AI cannot:

Approve
Reject
Make statutory decisions
Invent legal requirements
Invent clauses
Invent sources
Change a rule version without authorised workflow
Override a Regulatory Admin
Override an officer
Change another department's decision
Create unsupported compliance obligations
Create unsupported SLA requirements

--------------------------------------------------
FINAL ANALYTICS BOUNDARY
--------------------------------------------------

Do not create:

Officer leaderboard
“Best officer”
“Worst officer”
AI-generated competence score
Public department ranking
Composite performance score

Analytics are for:

Operational visibility
Planning
Bottleneck identification
Capacity planning
Process improvement
Regulatory impact management

--------------------------------------------------
FINAL VERSIONING BOUNDARY
--------------------------------------------------

Never overwrite:

Old Business DNA
Old Application Version
Old Decision
Old Approval / Order
Old Document Version
Old Regulatory Rule
Old Dependency Event
Old Audit Record

Changes create new versions/events.

--------------------------------------------------
FINAL MENTAL MODEL
--------------------------------------------------

The completed MIDC officer interface should support this exact reasoning sequence:

WHAT CAME IN?
↓
WHAT DOES THE ENTREPRENEUR BUSINESS DNA ALREADY TELL ME?
↓
IS THE APPLICATION COMPLETE?
↓
WHAT IS VERIFIED?
WHAT IS SELF-DECLARED?
WHAT IS NOT APPLICABLE?
WHAT NEEDS VERIFICATION?
↓
WHAT MIDC SERVICE AM I REVIEWING?
↓
WHAT DOES THIS SERVICE REQUIRE?
↓
WHAT DOES THE REGULATORY SOURCE SAY?
↓
WHAT IS INCONSISTENT?
↓
WHAT DEPENDENCY IS MISSING?
↓
DO I NEED A QUERY?
↓
WHAT CHANGED ON RESUBMISSION?
↓
DO I NEED AN INSPECTION?
↓
WHAT DECISION IS SUPPORTED BY THE RECORD?
↓
WHAT DOES MY DECISION UNLOCK OR BLOCK?
↓
WHAT CONDITIONS / FOLLOW-UP DOES IT CREATE?
↓
WHAT IF THE BUSINESS CHANGES?
↓
WHAT REGULATORY CHANGES AFFECT THIS JOURNEY?
↓
WHERE IS THE SYSTEM EXPERIENCING DELAY?
↓
WHAT IS CAUSING THE DELAY?
↓
WHERE IS WORKLOAD ACCUMULATING?
↓
WHAT EXACTLY HAPPENED AND WHO DID IT?