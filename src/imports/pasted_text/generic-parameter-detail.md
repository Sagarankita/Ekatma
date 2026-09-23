Continue from the existing EKATMA Figma file.

Create:

M12 — Generic Parameter Detail
M13 — Generic Document Review

Demonstrate both using the MIDC Land / Plot service pack.

IMPORTANT:
These are NOT one-off Land / Plot screens.

Build reusable detail components that can later support:

- Land / Plot
- Building / Planning
- Water / Utility
- Drainage / Infrastructure
- Construction / Follow-up
- Amendment / Modification
- Expansion
- Other configured MIDC services

Do NOT create a new visual system for each service.

Reuse the existing Phase 0 design system, MIDC Department shell, M11 scrutiny workbench components, status primitives, source/provenance patterns, document components, breadcrumbs, tables, buttons, typography and accessibility patterns.

Do not regenerate Phase 0.

--------------------------------------------------
PART A — M12 GENERIC PARAMETER DETAIL
--------------------------------------------------

Create M12 — Generic Parameter Detail.

The example parameter is:

PLOT AREA

M12 is opened from M11 when the officer selects:

"View Parameter Details"

The purpose of M12 is to let the officer understand ONE important Business DNA / application parameter in depth.

M12 is NOT an application-editing screen.

The officer should not manually re-enter the Master Project Dossier value.

The screen should expose:

- authoritative value
- current application value
- source
- verification
- previous value
- related services
- related documents
- related dependency
- cross-form values
- audit history
- officer scrutiny finding

--------------------------------------------------
1. PAGE SHELL
--------------------------------------------------

Use the existing MIDC Department shell.

Breadcrumb:

Department Home
→ Applications
→ Application Overview
→ Scrutiny
→ Land / Plot
→ Parameter Detail

Header:

Application ID
Business / Project
MIDC Service
Application State
Scrutiny Route
Current Desk
Office / Region
SLA

Parameter header:

PLOT AREA

4,800 m²

Sub-label:

Land / Plot parameter

Do not make the parameter editable by default.

--------------------------------------------------
2. PARAMETER SUMMARY
--------------------------------------------------

Create a prominent but restrained summary panel.

Show:

Parameter:
Plot Area

Master Project Dossier:
4,800 m²

Current MIDC Application:
4,800 m²

Previous Submission:
4,800 m²

Verification:
System Verified

Officer Finding:
Needs Verification

Last Updated:
23 Sep 2026

The distinction between these values must be clear.

Do NOT collapse all of these into one "status."

--------------------------------------------------
3. MASTER PROJECT DOSSIER VALUE
--------------------------------------------------

Create:

MASTER PROJECT DOSSIER

Value:
4,800 m²

Source:
MIDC / project record as configured

Verification:
System Verified

Business DNA version:
v3

Last updated:
23 Sep 2026

Used by:

- MIDC Land / Plot
- MIDC Building / Planning
- MPCB application
- Fire-related application where applicable

Do not invent actual external records.

Use prototype data clearly labelled as sample data.

Add:

View in Business DNA / Project Dossier

→ M07

The Master Project Dossier remains the authoritative reusable project context.

--------------------------------------------------
4. CURRENT APPLICATION VALUE
--------------------------------------------------

Create:

CURRENT MIDC APPLICATION

Value:
4,800 m²

Application:
MIDC-APP-2026-00418

Submission:
Submission #1

Source:
Current MIDC Application

Verification:
User Confirmed

Show whether the value is:

same as Master Project Dossier

or:

different from Master Project Dossier.

Example:

MATCH

Master Project Dossier
4,800 m²

Current MIDC Application
4,800 m²

Do not use a "compliance score."

--------------------------------------------------
5. PREVIOUS VALUE
--------------------------------------------------

Create:

PREVIOUS VALUE

Previous submission:
4,800 m²

Current submission:
4,800 m²

Change:
No change

If the application is a resubmission, demonstrate the alternative state:

Previous:
4,800 m²

Current:
5,200 m²

Change:
Detected

Link:

View Delta Re-scrutiny

→ M20

Do not silently overwrite historical values.

Preserve the submission version.

--------------------------------------------------
6. SOURCE / PROVENANCE
--------------------------------------------------

Create a dedicated:

SOURCE & PROVENANCE

panel.

Show:

Value
4,800 m²

Source
Master Project Dossier

Source type
Verified project record

Verification
System Verified

Business DNA version
v3

Recorded
23 Sep 2026

Used by
Multiple configured services

Every important value must have traceable provenance.

Possible source labels may include:

- Business DNA
- Master Project Dossier
- Current MIDC Application
- Previous Application
- Uploaded Document
- Verified Document Repository
- External Department Record
- System-derived value
- Officer-entered observation

Do not fabricate provenance.

If provenance is unavailable, show:

"Source not available in current record."

--------------------------------------------------
7. VERIFICATION STATE
--------------------------------------------------

Show the existing verification model.

Possible states:

SELF_DECLARED
USER_CONFIRMED
SYSTEM_VERIFIED
DEPARTMENT_VERIFIED
NEEDS_VERIFICATION
INVALID
EXPIRED

For this example:

SYSTEM_VERIFIED

Add a short explanation:

"Verification indicates how the underlying value was established. It is separate from the officer's current scrutiny finding."

Do not create another competing verification system.

--------------------------------------------------
8. OFFICER SCRUTINY FINDING
--------------------------------------------------

Create:

OFFICER SCRUTINY

States:

Valid
Query
Invalid
Needs Verification

Example:

Needs Verification

Reason:

"Supporting evidence requires officer confirmation against the current project record."

Provide:

Officer observation
[textarea]

Officer
Assigned officer

Role
Configured role

Timestamp
23 Sep 2026, 10:48 AM

The officer's finding must remain distinct from the source verification state.

Example:

Verification:
System Verified

Officer Finding:
Needs Verification

This is allowed.

--------------------------------------------------
9. RELATED DOCUMENTS
--------------------------------------------------

Create:

RELATED DOCUMENTS

Example:

Land / Plot Allotment Record
Previously verified

Document ID:
DOC-LAND-00418

Version:
v2

Verification:
Department Verified

Used by:
MIDC Land / Plot

Actions:

Preview
Open Document Review

→ M13

If multiple documents support the parameter, show them as a compact list.

Do not duplicate the full M13 interface inside M12.

--------------------------------------------------
10. CROSS-FORM VALUES
--------------------------------------------------

Create:

CROSS-FORM VALUES

Show the same Business DNA field across relevant applications.

Example:

Master Project Dossier
4,800 m²

MIDC Land / Plot
4,800 m²

MIDC Building / Planning
4,800 m²

MPCB
4,800 m²

Status:

Consistent

If a mismatch exists:

Master Project Dossier
4,800 m²

MIDC Land / Plot
4,800 m²

Fire-related application
4,600 m²

Status:

Mismatch detected

Do not decide which value is legally correct here.

CTA:

Investigate Cross-form Consistency

→ M16

MIDC must not edit another department's record.

--------------------------------------------------
11. RELATED SERVICES
--------------------------------------------------

Create:

RELATED SERVICES

Show where the parameter is reused.

Example:

Plot Area is used by:

- MIDC Land / Plot
- MIDC Building / Planning
- MPCB CTE
- Fire-related planning stage

For each:

Service
Current value
Application state

Do not claim that every service universally uses Plot Area.

Use configured service relationships.

--------------------------------------------------
12. RELATED DEPENDENCY
--------------------------------------------------

Create:

RELATED DEPENDENCY

Show whether the parameter affects a dependency.

Example:

Parameter:
Plot Area

Potentially related:

Building / Planning
Inspection
Configured downstream service

Status:

No direct dependency change detected

or:

"Change may affect configured downstream requirements."

Link:

View Dependency Graph

→ M17

Do not automatically infer legal consequences from a changed value.

--------------------------------------------------
13. AUDIT HISTORY
--------------------------------------------------

Create a compact:

AUDIT HISTORY

Timeline/table:

Date
Actor
Action
Old Value
New Value
Source
Reason

Example:

23 Sep 2026
System
Master Project Dossier updated
4,800 → 4,800
System record
No value change

23 Sep 2026
Officer
Review state changed
Needs Verification
Officer scrutiny

If the value actually changes:

4,800 → 5,200

show the change explicitly.

Never silently overwrite.

Link:

View Full Audit History

→ M38

--------------------------------------------------
14. PARAMETER ACTIONS
--------------------------------------------------

Bottom action bar:

Save Review
Flag
Raise Query
Request Additional Evidence
Open Regulatory Reference

Also:

Back to Scrutiny Workbench

→ M11

Do NOT include:

Approve
Reject
Issue Certificate

Those belong to M25/M26.

--------------------------------------------------
15. REGULATORY REFERENCE
--------------------------------------------------

Create a right-side or expandable panel:

REGULATORY REFERENCE

Show:

Relevant requirement
Source document
Version
Effective date where available

If source-backed:

show the actual configured source.

If unavailable:

"Regulatory reference unavailable in current configuration."

Do not fabricate a GR, clause, rule number or threshold.

CTA:

Open Regulatory Reference

Connect to existing Regulatory Assistant / RAG.

RAG may retrieve and explain.

RAG must not make the legal finding.

--------------------------------------------------
16. M12 EMPTY / EDGE STATES
--------------------------------------------------

Create realistic states:

NO SOURCE

"Source information is not available for this value."

NO PREVIOUS VALUE

"No previous submission value is available."

NO RELATED DOCUMENT

"No supporting document is currently linked."

NO CROSS-FORM VALUE

"No comparable value is currently available."

NO DEPENDENCY

"No configured dependency is associated with this parameter."

NOT APPLICABLE

"Not applicable to this application context."

Do not display these as errors.

--------------------------------------------------
17. M12 VISUAL STRUCTURE
--------------------------------------------------

Use a clean two-column detail layout.

LEFT / MAIN:

Parameter Summary
Master Project Dossier
Current Application
Previous Value
Cross-form Values
Related Services

RIGHT / CONTEXT:

Source & Provenance
Verification
Related Documents
Related Dependency
Regulatory Reference
Officer Finding

BOTTOM:

Audit History

ACTION BAR

Back to M11
Save Review
Raise Query
Request Additional Evidence

Avoid turning this into another dashboard.

It should feel like a detailed evidence/review workspace.

==================================================
PART B — M13 GENERIC DOCUMENT REVIEW
==================================================

Create M13 — Generic Document Review.

Demonstrate it with:

LAND / PLOT ALLOTMENT RECORD

But make the component reusable for any configured MIDC service.

Supported Land / Plot document examples:

- Sale evidence
- Lease evidence
- Allotment evidence
- Possession evidence
- Land record
- Land-use related evidence
- Other configured document

Do not imply that every applicant must provide every listed document.

The document requirements are configuration-driven.

--------------------------------------------------
18. M13 DOCUMENT HEADER
--------------------------------------------------

Breadcrumb:

Department Home
→ Applications
→ Scrutiny
→ Land / Plot
→ Document Review

Header:

Document Name
Document ID
Application ID
Business / Project
MIDC Service

Example:

Land / Plot Allotment Record

DOC-LAND-00418

MIDC-APP-2026-00418

Status:

Previously Verified

--------------------------------------------------
19. DOCUMENT PREVIEW
--------------------------------------------------

Create a large document-preview area.

Show:

Document preview

with:

- page navigation
- zoom controls
- page count
- document name
- version

Do not need to implement actual OCR.

The current prototype works with uploaded documents and document metadata.

Do not create OCR confidence scores.

Do not create fake extraction review.

Provide:

Open full document

where supported.

--------------------------------------------------
20. DOCUMENT METADATA
--------------------------------------------------

Create a structured:

DOCUMENT DETAILS

Document type:
Land / Plot Allotment Record

Category:
Land

Issue date:
configured sample date

Expiry date:
Not applicable

Source:
Verified Document Repository

Verification:
Department Verified

Version:
v2

Document ID:
DOC-LAND-00418

Uploaded / received:
configured sample date

Preserve the distinction between:

document type
source
verification
validity
version

Do not collapse these into one status.

--------------------------------------------------
21. DOCUMENT VERIFICATION
--------------------------------------------------

Create:

VERIFICATION

Show:

Verification state:
Department Verified

Verified by:
Configured officer / system source

Verified at:
Date/time

Verification source:
Configured source

If not verified:

Needs Verification

If invalid:

Invalid

If expired:

Expired

These states should use the existing document lifecycle model.

Do not invent additional verification states.

--------------------------------------------------
22. DOCUMENT VALIDITY
--------------------------------------------------

Keep document validity separate from verification.

Examples:

Verification:
Department Verified

Validity:
Valid

or:

Verification:
Department Verified

Validity:
Expired

or:

Verification:
Needs Verification

Validity:
Valid

Do not assume that "verified" automatically means "currently valid."

Expiry should be displayed only where relevant.

--------------------------------------------------
23. REUSE HISTORY
--------------------------------------------------

Create:

REUSE HISTORY

Show:

Previously verified — reused from Business Document Repository.

Then show:

Used by:

MIDC Land / Plot
Application MIDC-APP-2026-00418

MIDC Building / Planning
Application ID

Other configured service

For each reuse:

Application / Service
Version used
Date used
Verification state at time of use

This should make the:

UPLOAD ONCE → REUSE WHERE APPLICABLE

principle visible.

Do not imply universal reuse.

Reuse must depend on document applicability and validity.

--------------------------------------------------
24. OTHER APPLICATIONS USING THIS DOCUMENT
--------------------------------------------------

Create:

USED BY

Table:

Application
Department / Service
Document Version
Status
Used On

Example:

MIDC-APP-2026-00418
MIDC Land / Plot
v2
Under Review

MIDC-APP-2026-00419
MIDC Building / Planning
v2
Draft

Only show applications within the officer's permitted visibility scope.

Do not expose unrelated confidential application information.

--------------------------------------------------
25. DOCUMENT VERSION HISTORY
--------------------------------------------------

Create:

VERSION HISTORY

Show:

v1
Uploaded
Date
Source
Status

v2
Replaced / updated
Date
Source
Status

Current:
v2

Each version must remain accessible as historical evidence.

Do NOT overwrite v1 when v2 is uploaded.

Use:

Current Version

and:

Previous Versions

Do not delete historical records from this screen.

--------------------------------------------------
26. RELATED PARAMETER
--------------------------------------------------

Show:

RELATED PARAMETERS

This document supports:

Plot Area
Allotment Status
Possession Status

Click:

Plot Area

→ M12

This creates the M12 ↔ M13 relationship.

--------------------------------------------------
27. RELATED APPLICATION / SERVICE
--------------------------------------------------

Show:

RELATED SERVICES

Land / Plot
Building / Planning
Other configured service

Only show services that actually reference this document according to configuration.

Do not invent dependencies.

--------------------------------------------------
28. DOCUMENT ACTIONS
--------------------------------------------------

Actions:

Accept
Request Correction
Mark Invalid
Request Additional Evidence
Verify

Important:

"Accept" should mean the officer accepts this document for the current scrutiny context.

It must NOT mean:

"Approve the application."

Similarly:

"Verify"

means document verification.

It does NOT mean application approval.

--------------------------------------------------
29. ACCEPT DOCUMENT
--------------------------------------------------

If officer selects:

Accept

show a confirmation panel:

Document:
Land / Plot Allotment Record

Version:
v2

Action:
Accept for current MIDC scrutiny

Officer:
Configured officer

Comment:
Optional / required according to configuration

Save

Record this action in audit history.

--------------------------------------------------
30. REQUEST CORRECTION
--------------------------------------------------

If officer selects:

Request Correction

show:

Issue
Required correction
Officer comment
Related document field

Example:

"Document copy is unclear in the possession section."

or another factual prototype observation.

Do not invent legal deficiencies.

The correction request should be available for inclusion in the consolidated query.

→ M18

--------------------------------------------------
31. MARK INVALID
--------------------------------------------------

If officer selects:

Mark Invalid

require:

Reason
Officer comment
Supporting evidence where configured

Show warning:

"Marking this document invalid records a document-level finding. It does not automatically reject the application."

This is important.

The application-level decision remains separate.

--------------------------------------------------
32. REQUEST ADDITIONAL EVIDENCE
--------------------------------------------------

If officer selects:

Request Additional Evidence

show:

Evidence requested
Why it is needed
Related parameter
Officer comment

Example:

Related parameter:
Possession Status

Evidence requested:
Configured possession evidence

Add to consolidated query

→ M18

--------------------------------------------------
33. VERIFY DOCUMENT
--------------------------------------------------

If officer selects:

Verify

show:

Verification action

Document:
Land / Plot Allotment Record

Version:
v2

Source:
Verified Document Repository

Verification state:
Department Verified

Officer:
Configured officer

Timestamp:
Automatic

Comment:
Optional / required according to configuration

Do not create a separate master document.

Update the document's verification record while preserving version history.

--------------------------------------------------
34. MASTER DOCUMENT PROTECTION
--------------------------------------------------

IMPORTANT:

M13 must NEVER overwrite the master document directly.

If the entrepreneur provides a corrected replacement:

New upload
→ New document version
→ Verification
→ Current version update

Previous version remains in history.

Show:

Current Version:
v2

Previous Version:
v1

Do not destroy historical evidence.

--------------------------------------------------
35. REUSE RULE
--------------------------------------------------

If the document is already verified and applicable to the current service, show prominently:

"Previously verified — reused from Business Document Repository."

Also show:

Original verification
Original source
Current version
Current validity
Services using it

Do not require the officer to repeat the same verification unnecessarily.

However, if:

- document expired
- document invalid
- applicability changed
- configured rule requires fresh verification

show the appropriate state and do not silently reuse it.

--------------------------------------------------
36. DOCUMENT REQUIREMENT CONTEXT
--------------------------------------------------

Show:

WHY THIS DOCUMENT IS PRESENT

Requirement state:

Required
Conditional
Not Required

For the current Land / Plot service, show:

Required

if the prototype configuration says so.

Do not invent universal document requirements.

If requirement configuration is unavailable:

"Requirement configuration unavailable."

Do not guess.

--------------------------------------------------
37. DOCUMENT → PARAMETER → APPLICATION RELATIONSHIP
--------------------------------------------------

Make the relationship explicit:

DOCUMENT

Land / Plot Allotment Record
        ↓
SUPPORTS

Plot Area
Allotment Status
Possession Status
        ↓
USED BY

MIDC Land / Plot Application
        ↓
APPLICATION

MIDC-APP-2026-00418

This should help the officer understand why the document matters.

--------------------------------------------------
38. RIGHT-SIDE CONTEXT PANEL
--------------------------------------------------

Use a compact right-side panel containing:

Document Details
Verification
Validity
Reuse
Related Parameters
Related Services
Regulatory Reference
Officer Notes

Keep the document preview as the dominant central area.

--------------------------------------------------
39. OFFICER NOTES
--------------------------------------------------

Create:

OFFICER NOTES

Textarea:

"Record an observation about this document."

Show:

Officer
Role
Timestamp

Clearly label this as:

Officer observation

Do not make it look like extracted system data.

--------------------------------------------------
40. REGULATORY REFERENCE
--------------------------------------------------

If a document requirement has a configured source:

show:

Regulatory Reference

Source document
Version
Relevant requirement

RAG can help retrieve/explain it.

If unavailable:

"Regulatory reference unavailable in current configuration."

Never invent a GR, rule, clause or legal requirement.

--------------------------------------------------
41. M13 EMPTY / EDGE STATES
--------------------------------------------------

Create:

DOCUMENT NOT FOUND

"The referenced document is not available in the current record."

VERSION CONFLICT

"A newer document version is available."

Show:

Current version:
v2

Selected version:
v1

Action:
View current version

EXPIRED

Document:
Land / Plot evidence

Validity:
Expired

Do not automatically mark the application invalid.

NEEDS VERIFICATION

"Document verification is required before it can be relied upon for this review."

INVALID

"Document has been marked invalid."

Show reason.

NOT APPLICABLE

Do not show the document as missing if the requirement itself is not applicable.

--------------------------------------------------
42. ACCESSIBILITY
--------------------------------------------------

Follow the existing EKATMA accessibility system.

For M12:

- keyboard-accessible tabs
- readable tables
- clear source labels
- status text in addition to icons/colors
- accessible accordions
- visible focus states

For M13:

- keyboard-accessible document controls
- accessible zoom/page controls
- readable metadata
- accessible version history
- status not communicated through color alone

Maintain English / Marathi compatibility.

--------------------------------------------------
43. SAMPLE DATA
--------------------------------------------------

Use prototype-safe sample data.

M12:

Application:
MIDC-APP-2026-00418

Business:
Aster Precision Components Pvt. Ltd.

Service:
Land / Plot

Parameter:
Plot Area

Master Project Dossier:
4,800 m²

Current Application:
4,800 m²

Previous Submission:
4,800 m²

Verification:
System Verified

Officer Finding:
Needs Verification

M13:

Document:
Land / Plot Allotment Record

Document ID:
DOC-LAND-00418

Version:
v2

Source:
Verified Document Repository

Verification:
Department Verified

Validity:
Valid

Reuse:
Previously verified — reused from Business Document Repository.

Used By:
MIDC Land / Plot
MIDC Building / Planning

Clearly identify sample information as prototype data where appropriate.

--------------------------------------------------
44. NAVIGATION RELATIONSHIPS
--------------------------------------------------

M11 → M12

Selecting:

Plot Area
→ View Parameter Details
→ M12

M11 → M13

Selecting:

Land / Plot Allotment Record
→ Open Document Review
→ M13

M12 → M13

Related Document
→ M13

M13 → M12

Related Parameter
→ M12

M12 → M16

Cross-form mismatch
→ M16

M12 → M17

Dependency impact
→ M17

M12 → M20

Previous/current value changed
→ M20

M13 → M18

Document deficiency
→ Add to Consolidated Query
→ M18

M12 / M13 → M38

Audit History
→ M38

--------------------------------------------------
45. DO NOT DUPLICATE OTHER SCREENS
--------------------------------------------------

M12 must NOT become:

M07 Business DNA
M09 Pre-check
M11 Scrutiny Workbench
M16 Cross-form Consistency
M17 Dependency Graph
M20 Delta Re-scrutiny

M13 must NOT become:

M11 Scrutiny Workbench
M12 Parameter Detail
M18 Query Builder
M38 Audit

Each screen should show enough context to navigate to the specialized screen.

--------------------------------------------------
46. FINAL M12 STRUCTURE
--------------------------------------------------

M12 should visually follow:

HEADER
Application + Service + Parameter

↓

PARAMETER SUMMARY
Master value
Current application value
Previous value
Verification
Officer finding

↓

SOURCE & PROVENANCE

↓

CROSS-FORM VALUES

↓

RELATED SERVICES

↓

RELATED DOCUMENTS

↓

RELATED DEPENDENCY

↓

REGULATORY REFERENCE

↓

OFFICER SCRUTINY

↓

AUDIT HISTORY

↓

ACTION BAR

Back to M11
Save Review
Raise Query
Request Evidence

--------------------------------------------------
47. FINAL M13 STRUCTURE
--------------------------------------------------

M13 should visually follow:

HEADER
Document + Application + Service

↓

DOCUMENT PREVIEW

↓

DOCUMENT DETAILS
Type
Issue
Expiry
Source
Verification
Validity
Version

↓

REUSE HISTORY

↓

USED BY

↓

VERSION HISTORY

↓

RELATED PARAMETERS

↓

RELATED SERVICES

↓

REGULATORY REFERENCE

↓

OFFICER NOTES

↓

ACTION BAR

Accept
Request Correction
Mark Invalid
Request Additional Evidence
Verify

--------------------------------------------------
48. CORE PRINCIPLE
--------------------------------------------------

M12 answers:

"What exactly is this project/application value, where did it come from, what has happened to it over time, and what else depends on it?"

M13 answers:

"What exactly is this document, where did it come from, has it been verified, is it valid, where has it been reused, and what evidence/parameters/services does it support?"

Both screens must preserve:

PROVENANCE
+
VERSIONING
+
REUSE
+
VERIFICATION
+
CROSS-FORM CONSISTENCY
+
DEPENDENCY CONTEXT
+
AUDITABILITY

Neither screen makes the final statutory decision.

The officer uses these details to support scrutiny in M11 and eventual decision-making later in M25/M26.