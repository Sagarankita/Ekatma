Create M16 — Cross-form Consistency.

IMPORTANT:
Continue from the existing EKATMA MIDC Department Figma file.

Do NOT regenerate or redesign:
- Phase 0 design system
- Maharashtra Government header/footer
- EKATMA branding
- typography
- colours
- spacing
- sidebar
- breadcrumbs
- accessibility components
- generic tables
- status badges
- common officer workbench
- M11 scrutiny architecture
- M12 parameter detail
- M13 document review

M16 must be a reusable CROSS-FORM CONSISTENCY VIEW.

Its purpose is to help a MIDC officer identify contradictions involving the same shared Business DNA / Master Project Dossier field across:

- Master Business Profile
- Master Project Dossier
- MIDC applications
- Other department applications
- Previously verified / approved records
- Other configured regulatory records

M16 identifies and explains inconsistencies.

It does NOT silently resolve them.

It does NOT edit another department's record.

It does NOT automatically overwrite Business DNA.

It does NOT make the final statutory decision.

==================================================
1. SCREEN PURPOSE
==================================================

The core question M16 answers is:

"Does the same underlying project fact have different values across the applications and records currently relevant to this project?"

Example:

Plot Area

Master Project Dossier:
4,800 m²

MIDC Land:
4,800 m²

MIDC Building:
4,800 m²

MPCB:
4,800 m²

Fire:
4,600 m²

The system should identify:

"MISMATCH DETECTED"

and show exactly:

- what differs
- where each value came from
- when it was recorded
- its verification state
- which record is the source
- what applications are affected
- what the MIDC officer can do about it

Do not automatically decide which value is legally correct.

==================================================
2. COMMON APPLICATION HEADER
==================================================

Reuse the existing MIDC Department application context header.

Example:

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

Current Desk:
Planning / Building Scrutiny

Department:
MIDC

Region / Office:
Assigned Office

Role:
Planning / Building Scrutiny Officer

SLA:
Use existing SLA component.

Also show:

"Cross-form consistency"

as the current workspace/page title.

Keep:

OFFICER CONTEXT

separate from:

APPLICATION CONTEXT.

==================================================
3. PURPOSE EXPLANATION
==================================================

At the top of the main content area, add a concise explanatory panel:

"Cross-form consistency compares shared project data across the Master Business Profile, Master Project Dossier and relevant department applications."

Supporting text:

"Values are compared using their source, version and verification state. A mismatch is surfaced for officer review; the system does not silently overwrite or synchronise records."

This should make the boundary of the feature obvious.

==================================================
4. SUMMARY STRIP
==================================================

Create a compact summary row.

Example:

Fields Compared:
10

Consistent:
8

Mismatches:
1

Needs Verification:
1

Do NOT show:

Compliance Score
Consistency Score
Risk Score
AI Confidence Score

These are factual counts, not evaluative scores.

Each summary item should be clickable and filter the main table.

==================================================
5. FIELD SELECTOR
==================================================

Create a left-side or top-level field navigation.

Fields:

01 Plot Area
02 Project Location
03 Building Area
04 Investment
05 Employees
06 Production Capacity
07 Water Requirement
08 Company Identity
09 Project Stage
10 Other Shared Master Fields

Allow the configured system to add other shared Business DNA fields.

IMPORTANT:

This list must be configurable.

Do not hard-code it as the complete universe of possible shared fields.

The regulatory configuration determines which fields are relevant to the selected application.

==================================================
6. FIELD DETAIL HEADER
==================================================

When a field is selected, show a prominent field-level header.

Example:

PLOT AREA

Canonical / Master Value:
4,800 m²

Consistency Status:
MISMATCH

Records Compared:
5

Last Comparison:
Configured timestamp

Source of Master Value:
Master Project Dossier

Verification:
System Verified

Provide:

"View Parameter Detail"

which opens M12.

M12 remains the detailed parameter-level investigation screen.

M16 remains the cross-record comparison screen.

==================================================
7. MAIN COMPARISON TABLE
==================================================

Create the main comparison table.

Columns:

Source / Record
Department
Application / Record ID
Field
Value
Source
Verification
Version
Last Updated
Consistency
Action

Example:

MASTER PROFILE
Department:
Platform / Master

Record:
Business Profile

Field:
Plot Area

Value:
4,800 m²

Source:
Business DNA

Verification:
USER_CONFIRMED

Version:
Business DNA v3

Consistency:
Reference

---

MIDC LAND
Department:
MIDC

Record:
MIDC-APP-2026-00418

Field:
Plot Area

Value:
4,800 m²

Source:
MIDC Land Application

Verification:
DEPARTMENT_VERIFIED

Version:
Application v2

Consistency:
MATCH

---

MIDC BUILDING
Department:
MIDC

Record:
MIDC-BLD-2026-00418

Value:
4,800 m²

Verification:
SYSTEM_VERIFIED

Consistency:
MATCH

---

MPCB
Department:
MPCB

Record:
MPCB-APP-XXXX

Value:
4,800 m²

Verification:
DEPARTMENT_VERIFIED

Consistency:
MATCH

---

FIRE
Department:
Fire / Configured Authority

Record:
FIRE-APP-XXXX

Value:
4,600 m²

Verification:
USER_CONFIRMED / CONFIGURED STATE

Consistency:
MISMATCH

The exact sample records are prototype-safe.

Do not imply that these are actual external government records.

==================================================
8. SOURCE / PROVENANCE
==================================================

Every value must have visible provenance.

At minimum show:

Source
Source Type
Record / Application
Version
Verification State
Last Updated

Possible source types:

Business DNA
Master Project Dossier
MIDC Application
External Department Application
Verified Document
Approval / Certificate
User-entered Application Field
Configured Regulatory Record

Where useful, show:

"View source"

or

"Open record"

Do not expose information outside the officer's permission scope.

==================================================
9. VERIFICATION STATE
==================================================

Reuse the canonical verification model.

Supported states:

SELF_DECLARED
USER_CONFIRMED
SYSTEM_VERIFIED
DEPARTMENT_VERIFIED
NEEDS_VERIFICATION
INVALID
EXPIRED

Do NOT mix these with the officer's scrutiny finding.

For example:

Fire Plot Area:
4,600 m²

Verification:
USER_CONFIRMED

Consistency:
MISMATCH

This does NOT mean the Fire record is invalid.

It only means that the value conflicts with another relevant record.

Similarly:

MPCB Plot Area:
4,800 m²

Verification:
DEPARTMENT_VERIFIED

Consistency:
MATCH

==================================================
10. MATCH / MISMATCH LOGIC
==================================================

Use simple factual states.

MATCH:
Values are consistent with the comparison reference.

MISMATCH:
Values differ.

NEEDS VERIFICATION:
The system cannot establish a sufficiently reliable comparison.

NOT APPLICABLE:
The field is not relevant to that record/service.

NO DATA:
The field is genuinely absent from the relevant record.

IMPORTANT:

Do not treat:

NOT_APPLICABLE

as:

MISSING

Do not create a query simply because a field is not applicable.

Do not create a mismatch where the field is intentionally not part of a service.

==================================================
11. MISMATCH DETAIL PANEL
==================================================

When the officer selects a mismatch, open a detailed side panel.

Example:

PLOT AREA — MISMATCH

Master Project Dossier:
4,800 m²

MIDC Land:
4,800 m²

MIDC Building:
4,800 m²

MPCB:
4,800 m²

Fire:
4,600 m²

Difference:
200 m²

First recorded:
Configured date

Most recently updated:
Configured date

Affected records:
Fire application
MIDC Building context
Current project consistency

Show provenance for each value.

Do not automatically identify one value as "correct".

Instead show:

"Officer review required"

==================================================
12. WHY THE MISMATCH EXISTS
==================================================

Provide contextual explanations where the system has factual evidence.

Possible explanation categories:

Different application version
Different submission date
Updated Business DNA
Changed project parameter
Different source document
Different department record
Previous approved value
Needs verification
Potential data-entry discrepancy

Do NOT speculate.

If the reason is unknown:

"Reason not established — officer review required."

Do not label the mismatch as an error unless there is sufficient evidence.

==================================================
13. VERSION COMPARISON
==================================================

Where versions exist, allow the officer to inspect them.

Example:

MIDC Building Application

Version 1:
4,800 m²

Version 2:
4,800 m²

Fire Application

Version 1:
4,600 m²

Show:

Version
Submission date
Source
Value
Verification state

This helps distinguish:

"Different records"

from:

"Same record changed over time."

==================================================
14. BUSINESS DNA CHANGE CONTEXT
==================================================

If the mismatch resulted from a confirmed Business DNA change, make that explicit.

Example:

Business DNA v3:
Plot Area = 5,200 m²

Previous Business DNA v2:
Plot Area = 4,800 m²

Status:

"Business DNA changed after previous submission."

Then show affected applications:

MIDC Land
MIDC Building
MPCB
Fire

and indicate which records have:

Updated
Not yet updated
Needs Verification
Unaffected

Do not automatically rewrite old applications.

Historical records must remain intact.

Provide:

"Open M20 — Delta Re-scrutiny"

where appropriate.

==================================================
15. OFFICER ACTIONS
==================================================

Provide exactly these primary actions:

1. Accept Verified Source
2. Raise Query
3. Record Justified Exception
4. Request Entrepreneur Clarification

These actions must have clear meanings.

--------------------------------------------------
ACTION 1 — ACCEPT VERIFIED SOURCE

This means:

"The officer accepts this source/value as the relevant verified reference for the current MIDC scrutiny context."

It does NOT mean:

- overwrite another department's value
- change Business DNA
- edit the external department's application
- globally synchronise all records

After selection, show:

Selected reference:
[Source / record]

Reason:
[Officer note]

Timestamp:
[Automatic]

Officer:
[Current officer]

Create an audit entry.

--------------------------------------------------
ACTION 2 — RAISE QUERY

Create a deficiency candidate.

Do not immediately create a separate uncontrolled query.

The issue should flow into:

M18 — Consolidated Query Builder

Example:

Issue:
Plot area differs between Fire record and current MIDC project data.

Evidence:
Fire application value = 4,600 m²
Master / MIDC value = 4,800 m²

Required clarification:
Confirm applicable plot area and provide supporting evidence.

Officer comment:
[Text]

Do not automatically accuse the entrepreneur of making an error.

--------------------------------------------------
ACTION 3 — RECORD JUSTIFIED EXCEPTION

Allow the officer to record a documented exception when the discrepancy has a legitimate explanation.

Required fields:

Exception reason
Supporting evidence
Officer note
Reference
Date
Officer

Example:

"Different value retained because the external record refers to a distinct configured measurement/context."

The exact reason must be entered or selected from configured options.

Do not create fake exception categories.

The exception must remain visible in audit history.

--------------------------------------------------
ACTION 4 — REQUEST ENTREPRENEUR CLARIFICATION

Create a structured clarification request.

Show:

Field
Conflicting values
Sources
Question to entrepreneur
Supporting evidence requested

This should flow into the existing query/response lifecycle.

==================================================
16. EXTERNAL DEPARTMENT BOUNDARY
==================================================

This is one of the most important parts of M16.

When a mismatch involves another department:

Example:

MIDC:
4,800 m²

Fire:
4,600 m²

MIDC may:

- view the value
- view its provenance
- identify the mismatch
- record an officer note
- raise a query
- request entrepreneur clarification
- record a justified exception

MIDC may NOT:

- edit the Fire application
- change the Fire value
- approve/reject the Fire record
- overwrite the Fire record
- force synchronisation
- mark the external department's application as corrected

The external department's record remains authoritative within its own workflow.

==================================================
17. NO SILENT SYNCHRONISATION
==================================================

Never perform:

MIDC = 4,800
Fire = 4,600

→ automatically change Fire to 4,800

or:

Fire = 4,600
→ automatically change Master Profile to 4,600

Instead:

MISMATCH DETECTED
↓
SHOW SOURCES
↓
OFFICER REVIEW
↓
EXPLICIT ACTION
↓
AUDIT RECORD

If an explicit workflow later permits an update, that update must create a new version and preserve the previous record.

==================================================
18. CROSS-FORM SCOPE
==================================================

M16 should compare only records relevant to the current project and configured regulatory journey.

Possible sources:

Master Business Profile
Master Project Dossier
MIDC Land
MIDC Building / Planning
MIDC Water / Utility
MPCB
Fire
DISH
Boiler
Other configured department
Existing approvals
Previous applications

Do not show every possible application in the system.

Only show records that:

- belong to the same Business / Project
- are within the officer's permission scope
- contain the selected shared field
- are relevant to the configured journey

==================================================
19. FIELD CATEGORIES
==================================================

Organise shared fields into logical categories.

PROJECT / LOCATION

- Project location
- District
- Estate
- Plot
- Plot area
- Project stage

BUSINESS / IDENTITY

- Company identity
- Legal entity
- Business name
- Project name

SCALE

- Investment
- Employees
- Production capacity

BUILDING

- Building area
- Floors
- Height
- Occupancy where configured

UTILITIES

- Water requirement
- Water source
- Wastewater
- Other shared utility fields

PROJECT STATUS

- Project stage
- Construction status
- Operational status

OTHER MASTER DATA

- Configured shared fields

These categories are for navigation only.

Do not assume every field is universally present.

==================================================
20. CONSISTENCY WITH M11 / M12 / M14 / M15
==================================================

M16 must be accessible from:

M11 Land / Plot Scrutiny
M12 Parameter Detail
M14 Building / Planning
M15 Water / Utility / Drainage

Example:

M14:
Building Area = 2,300 m²
Potential mismatch detected

Click:

"View consistency"

→ M16 opens with:

BUILDING AREA

already selected.

Similarly:

M15:
Water Requirement = 100 KLD

Click:

"Compare across applications"

→ M16 opens with:

WATER REQUIREMENT

selected.

Do not make the officer manually recreate the comparison.

==================================================
21. PARAMETER DETAIL LINK
==================================================

When the officer wants deeper information about one value, provide:

"Open Parameter Detail"

→ M12

M12 remains responsible for:

- master value
- current application value
- previous value
- source
- verification
- related documents
- related services
- dependency
- audit history

M16 remains responsible for:

- comparison across records
- mismatch detection
- source comparison
- officer consistency action

==================================================
22. DOCUMENT / EVIDENCE LINK
==================================================

If a value has supporting evidence, show:

Evidence:
Plot / Allotment Record v2

Click:

"Open Document"

→ M13

M13 remains responsible for detailed document review.

M16 should only show enough evidence context to explain the mismatch.

==================================================
23. DEPENDENCY CONTEXT
==================================================

Where a mismatch affects a regulatory dependency, show a compact dependency impact panel.

Example:

Mismatch:
Plot Area

Potentially affected:

MIDC Building / Planning
Fire
MPCB
Current utility application

Show:

Dependency impact:
Needs Review

Do not automatically mark downstream approvals as invalid.

Do not automatically block another department's workflow.

If a configured dependency rule explicitly says the mismatch blocks a MIDC service, show:

"Configured dependency impact"

with an explanation.

Otherwise show:

"Impact not determined."

==================================================
24. QUERY INTEGRATION
==================================================

When a mismatch is sent to query:

Create a structured deficiency.

Example:

DEF-2026-0091

Type:
Data inconsistency

Field:
Plot Area

Conflicting records:
Master Project Dossier
Fire application

Current values:
4,800 m²
4,600 m²

Required action:
Clarification / supporting evidence

Status:
Draft / Added to consolidated query

This deficiency should become part of M18.

M19 must later show:

Query
→ Entrepreneur Response
→ Clarification
→ Resubmission
→ Officer Review

==================================================
25. DELTA INTEGRATION
==================================================

If the mismatch is caused by a resubmission:

show:

"Change detected since previous submission."

Example:

Previous:
Plot Area = 4,800 m²

Current:
Plot Area = 5,200 m²

Then provide:

"Open M20 — Delta Re-scrutiny"

M20 remains the detailed change-impact screen.

Do not duplicate the entire M20 workflow inside M16.

==================================================
26. AUTOMATION BOUNDARY
==================================================

Automated consistency checks may:

- compare identical field identifiers
- compare values
- identify differences
- identify missing values
- compare versions
- surface provenance
- detect changes
- identify potentially affected applications
- highlight configured dependency impact

Automation must NOT:

- decide which department is correct
- overwrite values
- approve/reject applications
- edit another department's record
- invent explanations
- invent regulatory requirements
- automatically send accusations to the entrepreneur
- automatically mark another department's approval invalid

Use:

"Mismatch detected — officer review required."

not:

"Wrong data detected."

unless the source itself explicitly establishes that the value is invalid.

==================================================
27. SOURCE PRIORITY
==================================================

Do NOT implement a universal hard-coded rule such as:

"Master Profile always wins."

Different records may have different authority or temporal context.

Instead show:

Source
Verification
Version
Date
Record context

and let the configured workflow/officer determine how the discrepancy should be handled.

If the platform has a configured authoritative source for a particular field, display:

"Configured authoritative source"

with the source clearly identified.

Do not infer authority merely because one value is in the Master Profile.

==================================================
28. AUDIT TRAIL
==================================================

Every officer action on a consistency issue must be auditable.

Record:

Consistency Issue ID
Field
Previous values
Current values
Sources
Officer
Action
Officer note
Date/time
Result
Related Deficiency ID
Related Exception ID
Related Application Version

Example:

CNS-2026-0042

Field:
Plot Area

Action:
Record Justified Exception

Officer:
[Officer]

Reason:
[Configured / entered reason]

Date:
[Timestamp]

Do not overwrite previous consistency findings.

==================================================
29. STATUS / FILTERS
==================================================

Provide filters:

All
Consistent
Mismatches
Needs Verification
Not Applicable
No Data
Resolved
Open
Exception Recorded

Additional filters:

Field
Department
Application
Verification State
Date
Business / Project

Sorting:

Recently detected
Oldest unresolved
Recently updated

Do NOT sort by an invented "severity score."

==================================================
30. RESOLVED VS UNRESOLVED
==================================================

A mismatch should have a lifecycle.

Example:

MISMATCH DETECTED
↓
UNDER REVIEW
↓
QUERY RAISED
↓
ENTREPRENEUR RESPONSE
↓
REVIEWED
↓
RESOLVED

Alternative:

MISMATCH DETECTED
↓
JUSTIFIED EXCEPTION
↓
RESOLVED WITH EXCEPTION

Alternative:

MISMATCH DETECTED
↓
NEEDS VERIFICATION
↓
REMAIN OPEN

Do not use "Resolved" merely because an officer viewed the mismatch.

==================================================
31. SAMPLE PRIMARY VIEW
==================================================

Use this prototype-safe example:

FIELD:
Plot Area

REFERENCE:
Master Project Dossier

Master Value:
4,800 m²

Comparison:

Master Project Dossier
4,800 m²
SYSTEM_VERIFIED
Reference

MIDC Land
4,800 m²
DEPARTMENT_VERIFIED
MATCH

MIDC Building
4,800 m²
SYSTEM_VERIFIED
MATCH

MPCB
4,800 m²
DEPARTMENT_VERIFIED
MATCH

Fire
4,600 m²
USER_CONFIRMED
MISMATCH

Show a visible banner:

"1 mismatch requires officer review."

Then show:

Difference:
200 m²

Affected records:
Fire
MIDC Building context

Available actions:

Accept Verified Source
Raise Query
Record Justified Exception
Request Entrepreneur Clarification

Again:

Do NOT automatically determine that 4,800 m² is the legally correct value.

==================================================
32. VISUAL DESIGN
==================================================

This should be a DATA COMPARISON WORKSPACE.

Do not turn it into a dashboard full of giant cards.

Primary visual structure:

TOP:
Application context

SECOND:
Consistency summary

LEFT:
Field/category navigation

CENTER:
Cross-form comparison table

RIGHT:
Selected mismatch detail / provenance / officer actions

Use clear table rows.

Highlight mismatches without relying solely on colour.

Use icons + text:

✓ Match
⚠ Mismatch
○ Needs Verification
— Not Applicable
∅ No Data

Maintain accessibility.

==================================================
33. RESPONSIVE BEHAVIOUR
==================================================

Use Auto Layout.

The comparison table must remain readable when:

- department names are long
- application IDs are long
- source references are long
- values contain units
- Marathi/English text is used

On narrower layouts:

- preserve the selected field
- allow horizontal table scrolling
- move mismatch detail below or into a drawer
- keep officer actions accessible

Do not truncate critical provenance information.

==================================================
34. FINAL OFFICER FLOW
==================================================

Officer opens:

M14 Building / Planning

        ↓

System identifies:

Potential building-area inconsistency

        ↓

Officer clicks:

"View consistency"

        ↓

M16 opens with:

BUILDING AREA selected

        ↓

System compares:

Master Profile
MIDC Land
MIDC Building
MPCB
Fire
Other configured records

        ↓

Officer sees:

values
sources
versions
verification states
match/mismatch status

        ↓

Officer selects one:

Accept Verified Source
Raise Query
Record Justified Exception
Request Entrepreneur Clarification

        ↓

If Query:

M18 Consolidated Query Builder

        ↓

M19 Query / Response History

        ↓

If resubmission changes data:

M20 Delta Re-scrutiny

        ↓

Audit trail records every action.

==================================================
35. CRITICAL RULES
==================================================

NEVER:

- silently sync values
- overwrite another department's record
- overwrite Business DNA
- decide which department is correct automatically
- convert NOT_APPLICABLE into missing
- treat mismatch as automatic rejection
- treat mismatch as automatic invalidation of an approval
- create unsupported legal requirements
- create unsupported technical thresholds
- invent a universal authoritative-source hierarchy
- create an AI consistency score
- give MIDC controls over external departments

ALWAYS:

- show provenance
- show verification state
- preserve versions
- distinguish source from officer judgment
- identify the exact conflicting records
- allow explicit officer action
- create an audit record
- route deficiencies through M18
- route resubmission changes through M20
- keep external department records read-only