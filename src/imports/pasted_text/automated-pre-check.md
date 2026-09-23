Create M09 — Automated Pre-check.

IMPORTANT:
This is an application-level automated pre-check workspace.

Its purpose is to perform objective, explainable checks BEFORE manual MIDC scrutiny.

The screen must clearly separate:

SYSTEM / MACHINE FINDINGS

from:

OFFICER JUDGMENT.

The system may:
- validate
- compare
- retrieve
- detect missing information
- detect expired/invalid documents
- identify inconsistencies
- identify unresolved verification states
- identify prerequisite/dependency conditions
- identify changes since previous versions
- surface warnings

The system must NOT:
- make the statutory approval decision
- reject the application automatically
- interpret an AI output as a legal finding
- replace officer scrutiny
- make another department's decision
- silently alter Business DNA/master data

Do not redesign the government shell.
Do not regenerate Phase 0.
Do not change existing colors, typography, spacing, sidebar, header, footer, tables, cards, badges, buttons, breadcrumbs, or accessibility components.

Reuse the existing EKATMA design system.

==================================================
1. NAVIGATION CONTEXT
==================================================

M09 is part of the individual application workflow.

Keep the MIDC officer sidebar:

Department Home
My Queue
Applications
Service Catalogue
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

Active sidebar item:

Applications

Do NOT create an "Automated Pre-check" sidebar item.

Do NOT move M09 under Service Catalogue.

Do NOT make M09 a separate dashboard.

==================================================
2. BREADCRUMB
==================================================

Use:

Department Home > Applications > Application Overview > Automated Pre-check

Reuse the existing EKATMA breadcrumb component.

==================================================
3. PAGE HEADER
==================================================

Page title:

Automated Pre-check

Supporting text:

"Objective system checks completed before manual MIDC scrutiny."

Show compact application context:

Application ID
Business / Project
MIDC Service
Current Application State
Current Desk
Office / Region

Example:

MIDC-APP-2026-00482
Aster BioTech Manufacturing Pvt. Ltd.
Building / Planning
SUBMITTED
Configured MIDC Office — Prototype

Do not repeat the entire M06 header.

==================================================
4. PRE-CHECK STATUS SUMMARY
==================================================

At the top, create a compact summary showing the overall machine-check state.

Do NOT use:

"Application Approved"

Do NOT use:

"Application Passed"

Do NOT use:

"Application Rejected"

Instead show counts by objective result:

Machine-verified
Warnings
Needs officer judgment

Example:

✓ Machine-verified
18

⚠ Warning
3

○ Needs officer judgment
2

These are counts of checks, NOT a legal application score.

Do not create:

Pre-check score: 92%

Do not create a composite risk score.

Do not rank the application.

==================================================
5. IMPORTANT SYSTEM NOTICE
==================================================

Show a concise information panel:

"Automated pre-checks identify objective data, document, payment, consistency and dependency conditions. They do not replace statutory scrutiny or officer judgment."

This should be an informational panel, not a warning banner dominating the page.

==================================================
6. CHECK GROUPS
==================================================

Create the following check groups:

1. FORM
2. PAYMENT / CHALLAN
3. DOCUMENTS
4. BUSINESS DNA
5. MIDC / LAND CONTEXT
6. CROSS-FORM
7. DEPENDENCIES
8. CHANGE

These groups are the primary structure of M09.

Each group should have:

Section title
Short description
Check count
Machine-verified count
Warning count
Needs officer judgment count
Expand / collapse control

Use existing EKATMA expandable section/card components.

==================================================
7. CHECK RESULT STATES
==================================================

Use exactly these conceptual output states:

✓ Machine-verified

⚠ Warning

○ Needs officer judgment

Do not create additional result categories such as:

Critical
High Risk
Low Risk
Failed
Rejected

unless a separate configured workflow explicitly requires them.

The three M09 states describe the result of the automated check, not the legal outcome of the application.

==================================================
8. MACHINE-VERIFIED
==================================================

Meaning:

The system completed an objective check and found the expected condition.

Examples:

Mandatory field present
Document present and valid
Payment reference received
Plot area consistent
Required Business DNA field available

Display:

✓ Machine-verified

Include:

Check
Result
Source
Timestamp
Rule/check identifier where useful

Example:

Mandatory fields
Machine-verified

Result:
All configured mandatory fields present.

Source:
Application submission data

Checked:
18 Sep 2026, 14:32

Do not imply that this means the application is legally approved.

==================================================
9. WARNING
==================================================

Meaning:

The automated system detected an issue, discrepancy, missing condition, validity concern, or other condition requiring attention.

Examples:

Expired document
Plot area mismatch
Prerequisite pending
Needs Verification
Missing required field
Payment pending

Display:

⚠ Warning

Show:

What was detected
Source
Affected field/document/dependency
Relevant workflow
Recommended next review location

Do NOT say:

"Application should be rejected."

Instead:

"Review required."

==================================================
10. NEEDS OFFICER JUDGMENT
==================================================

Meaning:

The system cannot determine the legal/regulatory conclusion automatically.

Examples:

Potentially inconsistent land information
Condition requiring substantive scrutiny
Dependency requiring interpretation
A rule-triggered condition requiring officer assessment

Display:

○ Needs officer judgment

Use neutral wording:

"Officer review required."

Do not convert this into:

Failed

Rejected

Non-compliant

unless an authorized officer/workflow has established such a conclusion.

==================================================
11. FORM CHECKS
==================================================

Create section:

FORM

Check:

Mandatory fields present

Result:
✓ / ⚠ / ○

Check:

Dependent form complete

Check:

Declaration complete

Check:

Basic format

For each check show:

Check name
Result
Short explanation
Source
Timestamp

Example:

Mandatory fields present
✓ Machine-verified

"All configured mandatory fields for this MIDC service are present."

Dependent form complete
⚠ Warning

"One configured dependent form remains incomplete."

Declaration complete
✓ Machine-verified

Basic format
✓ Machine-verified

Do not treat optional fields as mandatory.

Do not invent required fields.

Requirements must come from the configured application/service requirements.

==================================================
12. PAYMENT / CHALLAN
==================================================

Create:

PAYMENT / CHALLAN

Check:

Fee state available where applicable

Possible states:

PAID
PENDING
FAILED
NOT_APPLICABLE

Use the existing payment/fee status components.

Example:

Fee state
✓ Machine-verified

PAID

Challan:
CH-2026-00482

Payment reference:
PAY-XXXX

IMPORTANT:

Payment references are READ-ONLY when received from the submission/payment flow.

Do not allow the officer to edit payment references from M09.

If service does not use a fee:

Fee:
Not applicable for this service

Do not create a warning for NOT_APPLICABLE.

If payment is pending:

⚠ Warning

"Fee confirmation is pending."

Do not say:

"Application rejected."

==================================================
13. DOCUMENT CHECKS
==================================================

Create:

DOCUMENTS

Check:

Required documents present

Check:

Issue / expiry

Check:

Reusable verified document available

Check:

Missing / expired / invalid warnings

For each relevant document show:

Document
Requirement
Status
Verification
Issue date
Expiry date where applicable
Source

Example:

MIDC Allotment Letter

✓ Machine-verified

Status:
Present

Verification:
DEPARTMENT_VERIFIED

Expiry:
Not applicable

Example:

Fire-related document

⚠ Warning

Status:
Expired

Expiry:
10 Sep 2026

Action:
Review document

Do not create OCR review functionality.

Current prototype document sources include:

- uploaded documents
- metadata
- approval-generated certificates
- verified/reused system data

Document extraction/OCR should only appear if a later explicit OCR phase is enabled.

==================================================
14. DOCUMENT VERIFICATION DISTINCTION
==================================================

Do not collapse:

Document exists

and:

Document is verified

into one state.

For example:

Document:
Uploaded

Verification:
SELF_DECLARED

is different from:

Document:
Uploaded

Verification:
DEPARTMENT_VERIFIED

The officer should be able to open the relevant provenance/details.

Link to the document/provenance workspace where available.

==================================================
15. BUSINESS DNA CHECKS
==================================================

Create:

BUSINESS DNA

Check:

Required profile fields available

Check:

NOT_APPLICABLE respected

Check:

Unresolved NEEDS_REVIEW visible

Use the existing M07 state architecture.

IMPORTANT:

Do not treat:

NOT_APPLICABLE

as missing.

Example:

Boiler:
NOT_APPLICABLE

Result:
✓ Machine-verified

Explanation:

"Boiler branch is not applicable based on the current Business DNA."

Do not display:

"Boiler information missing."

==================================================
16. BUSINESS DNA NEEDS REVIEW
==================================================

If Business DNA contains:

NEEDS_REVIEW

show:

⚠ Warning
or
○ Needs officer judgment

depending on the nature of the issue.

Show:

Field
Value
Adaptive state
Verification state
Source
Why it requires attention

Example:

Hazardous Waste

Adaptive State:
CONFIRMED

Verification:
NEEDS_VERIFICATION

Result:
○ Needs officer judgment

"Source information requires officer verification."

Do not convert this into:

Invalid

Rejected

Missing

unless the actual underlying state supports that conclusion.

Provide:

View Business DNA

→ M07

==================================================
17. MIDC / LAND CONTEXT
==================================================

Create:

MIDC / LAND CONTEXT

Check:

MIDC estate available where required

Check:

Plot available where required

Check:

Possession available where required

Check:

Land information consistent with submitted application

The actual required fields must come from the configured MIDC service.

Do not make every land field mandatory for every MIDC service.

Example:

MIDC Estate
✓ Machine-verified

Plot
✓ Machine-verified

Possession
⚠ Warning

"Possession information requires verification."

Land information:
⚠ Warning

"Plot area differs from submitted application."

Provide:

View Business DNA
→ M07

View Consistency
→ M16

==================================================
18. MIDC = NO / UNKNOWN LOGIC
==================================================

Respect the adaptive profile logic.

If:

MIDC = NO

Do not create an active MIDC service/pre-check.

If the current application exists because a configured MIDC service was activated, the M09 context should reflect that.

If:

MIDC = UNKNOWN

Preserve:

Needs Verification

Do not silently assume YES.

If:

MIDC = YES

Only run checks for configured MIDC services.

Do not invent MIDC requirements outside the configured regulatory journey.

==================================================
19. CROSS-FORM CHECKS
==================================================

Create:

CROSS-FORM

These checks compare common data across the application, Business DNA, and relevant connected application/context records.

Check:

Plot area mismatch

Check:

Building area mismatch

Check:

Investment mismatch

Check:

Project location mismatch

Check:

Company identity mismatch

Where appropriate, the system can also identify other configured shared-field mismatches.

Do not hard-code additional mismatches unless configured.

==================================================
20. CROSS-FORM RESULT
==================================================

Example:

Plot Area

Master Business Profile:
4,800 m²

MIDC Application:
4,800 m²

Fire Context:
4,600 m²

Result:

⚠ Warning

"Plot area differs across records."

Show:

Compared fields
Sources
Values
Timestamp

CTA:

View consistency

→ M16

IMPORTANT:

Do NOT automatically decide which value is correct.

Do NOT overwrite the other department's value.

The pre-check identifies the mismatch.

Officer review / authoritative verification happens through the appropriate workflow.

==================================================
21. COMPANY IDENTITY CHECK
==================================================

Example:

Company Identity

Business DNA:
Aster BioTech Manufacturing Pvt. Ltd.

MIDC Application:
Aster BioTech Manufacturing Pvt. Ltd.

Result:
✓ Machine-verified

If mismatch:

⚠ Warning

"Business identity differs between the Business DNA and submitted application."

Provide:

View M07
View M16

Do not automatically change either record.

==================================================
22. DEPENDENCY CHECKS
==================================================

Create:

DEPENDENCIES

Check:

Prerequisite approved?

Check:

Prerequisite pending?

Check:

External department dependency?

Use the configured dependency model.

Possible states:

Approved / Available
Pending
Missing
Blocked
Not applicable
Needs verification
Context only

Do not create a new dependency vocabulary.

==================================================
23. EXTERNAL DEPARTMENT DEPENDENCIES
==================================================

Example:

MPCB

Status:
Pending

Relationship:
Prerequisite / dependency

Result:
⚠ Warning

"External prerequisite is pending."

Do not allow the MIDC officer to approve/reject MPCB.

The system only reports the dependency state.

If the prerequisite becomes available:

M09 can show:

✓ Machine-verified

"Prerequisite status available."

The detailed dependency relationship belongs to M17.

==================================================
24. DEPENDENCY SOURCE
==================================================

Every dependency warning should identify:

Dependency
Authority
Current state
Source
Last updated

Example:

MPCB

Authority:
MPCB

State:
Pending

Source:
Connected regulatory record

Last updated:
18 Sep 2026

Do not invent external status.

If status is unavailable:

"Status unavailable"

or:

"Needs verification"

==================================================
25. CHANGE CHECK
==================================================

Create:

CHANGE

Check:

"Did common project data change after draft/submission?"

Compare the relevant current application data with the previous version / Business DNA version.

Potential changed fields:

Plot
Plot area
Investment
Project location
Building area
Project stage
Capacity
Utilities
Other configured shared fields

Do not create an arbitrary change score.

==================================================
26. CHANGE RESULT
==================================================

If no change:

✓ Machine-verified

"No configured shared project fields changed after submission."

If change exists:

⚠ Warning

"3 shared project fields changed since the previous version."

Show:

Field
Previous Value
Current Value
Changed At
Source

Example:

Plot Area
4,500 m² → 4,800 m²

Investment
₹40 Cr → ₹42 Cr

Then:

View Delta Re-scrutiny

→ M20

Do not determine the legal impact automatically.

==================================================
27. CONNECTION TO M07 PROVENANCE
==================================================

Important Business DNA checks should be traceable to M07.

For example:

Plot Area
→ View Business DNA
→ View field provenance

The officer should be able to see:

Value
Source
Adaptive State
Verification State
Last Updated
Used By
Previous Value
Current Value

This preserves the provenance model.

Do not duplicate the entire provenance drawer inside M09.

Use links to the M07 field-level provenance component.

==================================================
28. AUTOMATED CHECK DETAIL DRAWER
==================================================

When the officer selects a check, open a reusable detail drawer.

Show:

CHECK

Plot area consistency

RESULT

⚠ Warning

WHAT WAS CHECKED

"Compared plot area across configured common-data sources."

VALUES

Business DNA:
4,800 m²

MIDC Application:
4,800 m²

Fire Context:
4,600 m²

SOURCE

Configured connected records

CHECKED AT

18 Sep 2026, 14:32

IMPACT

Potential cross-form inconsistency

NEXT REVIEW

M16 — Cross-form Consistency

Do not show:

"Fire record is wrong."

Do not show:

"Reject application."

==================================================
29. RULE / CHECK EXPLAINABILITY
==================================================

Where possible, show:

Check type
Source
Rule/check name
Timestamp

Example:

Check:
Mandatory fields present

Check basis:
Configured application requirements

Executed:
18 Sep 2026, 14:32

Result:
All required fields present

Do not expose technical implementation details unnecessarily.

Do not invent regulatory rules.

==================================================
30. MACHINE FACTS VS AI INTERPRETATION
==================================================

IMPORTANT:

If any AI-assisted functionality exists elsewhere in the product, its output must NOT be represented here as a legal finding.

For example:

BAD:

"AI determined that the application is non-compliant."

GOOD:

"Automated check identified a potential inconsistency."

GOOD:

"System flagged this field for officer review."

GOOD:

"Configured prerequisite check returned Pending."

If an AI/retrieval component provides explanatory context:

label it clearly as:

AI-assisted explanation

or:

Retrieved regulatory context

Do not label it:

Legal finding

unless the authoritative rule engine itself explicitly provides that result.

==================================================
31. NO AUTOMATIC REJECTION
==================================================

Even if multiple warnings exist:

Do NOT show:

Application Failed

Application Rejected

Not Eligible

Unless an authorized human decision has already recorded that state elsewhere.

M09 only reports automated findings.

The application can proceed to manual scrutiny with warnings.

==================================================
32. NO AUTOMATIC APPROVAL
==================================================

Similarly, if all checks are machine-verified:

Do NOT show:

Application Approved

Approval Recommended

Approval Guaranteed

Instead show:

"Automated pre-check complete."

Then:

Proceed to Scrutiny

==================================================
33. CTA
==================================================

Primary CTA:

Proceed to Scrutiny

This should route to:

M10 — MIDC Scrutiny Route / Explainability

or the configured next scrutiny workspace.

The CTA should be available even when warnings exist, unless a specific configured workflow rule explicitly prevents progression.

If a blocking condition exists according to a configured application rule:

show:

"Blocked by configured prerequisite"

and clearly identify the blocking condition.

Do not invent blocking rules.

==================================================
34. SECONDARY ACTIONS
==================================================

Possible secondary actions:

View Business DNA
→ M07

View Consistency
→ M16

View Dependencies
→ M17

View Documents
→ relevant document workspace

View Timeline
→ M08

View Delta
→ M20 where applicable

Use existing buttons/link styles.

Do not create unnecessary actions.

==================================================
35. BLOCKING VS WARNING
==================================================

IMPORTANT:

Not every warning should block scrutiny.

Distinguish:

INFORMATION
WARNING
CONFIGURED BLOCKING CONDITION

However, do not introduce a new result state if the existing design system does not support it.

A configured blocking condition can be represented as:

⚠ Warning

with an explicit label:

"Configured prerequisite prevents progression."

Only use blocking behaviour when the regulatory/workflow configuration explicitly establishes it.

Do not infer blocking from a warning.

==================================================
36. PAYMENT EXAMPLE
==================================================

If fee is applicable:

Fee:
Paid

✓ Machine-verified

Payment reference:
PAY-XXXX

Source:
Submission/payment flow

Read-only.

If:

Fee:
Pending

⚠ Warning

"Payment confirmation is pending."

If:

Fee:
Failed

⚠ Warning

"Payment attempt was not confirmed."

If:

Fee:
Not applicable

✓ Machine-verified

"Fee not applicable for this configured service."

==================================================
37. DOCUMENT EXAMPLE
==================================================

Required document:

MIDC Allotment Letter

Present:
Yes

Verification:
DEPARTMENT_VERIFIED

Result:
✓ Machine-verified

Another document:

Fire-related certificate

Present:
Yes

Expiry:
Passed

Result:
⚠ Warning

"Document has expired."

Do not automatically classify the application as rejected.

==================================================
38. BUSINESS DNA EXAMPLE
==================================================

Field:

Boiler

Value:
No

Adaptive State:
NOT_APPLICABLE

Result:
✓ Machine-verified

Explanation:
"Boiler-related branch is not applicable."

Another:

Hazardous Waste

Value:
Yes

Verification:
NEEDS_VERIFICATION

Result:
○ Needs officer judgment

"Verification required."

Do not label this:

Invalid.

==================================================
39. CROSS-FORM EXAMPLE
==================================================

Plot Area:

Business DNA:
4,800 m²

MIDC Application:
4,800 m²

Fire:
4,600 m²

Result:
⚠ Warning

Action:
View Consistency

The system identifies the mismatch.

The officer determines how to resolve it through the appropriate process.

==================================================
40. CHANGE EXAMPLE
==================================================

Previous version:

Investment:
₹40 Cr

Current version:

Investment:
₹42 Cr

Result:

⚠ Warning

"Common project data changed after submission."

Show:

Changed:
Investment

Previous:
₹40 Cr

Current:
₹42 Cr

Changed:
18 Sep 2026

Next:
Delta Re-scrutiny

→ M20

==================================================
41. CHECK TIMESTAMP
==================================================

Each automated check should show:

Last checked

Example:

Last checked:
18 Sep 2026, 14:32

Provide:

Re-run checks

only if the system configuration supports it.

If re-run exists:

show when the check was last executed.

Do not imply checks are continuously live if they are not.

==================================================
42. PRE-CHECK RUN STATUS
==================================================

At the top, show:

Pre-check status:

Complete

Last run:
18 Sep 2026, 14:32

Checks:
23

Machine-verified:
18

Warnings:
3

Needs officer judgment:
2

If the check has not run:

Not yet run

CTA:

Run pre-check

Only include this action if the prototype supports manual execution.

==================================================
43. VERSION AWARENESS
==================================================

The pre-check must identify which application version it evaluated.

Example:

Checked version:
v3

Previous checked version:
v2

If resubmission occurred:

show:

"Pre-check rerun after resubmission."

This supports M20 Delta Re-scrutiny.

Do not overwrite previous pre-check history.

==================================================
44. RELATIONSHIP TO M06
==================================================

M06 should contain a compact summary of automated findings.

M09 contains the detailed pre-check workspace.

Therefore:

M06:
Automated Summary
→ 3 warnings
→ 2 items needing review
→ View automated pre-check

M09:
Full check groups
→ individual findings
→ source
→ detail
→ drill-down

Do not duplicate the complete M09 interface in M06.

==================================================
45. RELATIONSHIP TO M08
==================================================

When pre-check runs, it may create a timeline event.

Example:

18 Sep 2026
14:32

AUTOMATED PRE-CHECK

Action:
Pre-check completed

Result:
18 machine-verified
3 warnings
2 officer-review items

Link:

View timeline

→ M08

M09 performs the checks.

M08 records the event.

==================================================
46. RELATIONSHIP TO M10
==================================================

M09 comes BEFORE manual scrutiny routing.

Architecture:

M09 Automated Pre-check
↓
M10 Scrutiny Route / Explainability
↓
Service-specific scrutiny

The CTA:

Proceed to Scrutiny

should therefore open M10 or the configured scrutiny entry point.

Do not skip the routing layer.

==================================================
47. RELATIONSHIP TO M16
==================================================

Cross-form checks in M09 are detection only.

M09:

"Plot area mismatch detected."

M16:

Full consistency investigation.

M16 should show:

Source A
Source B
Values
Verification
Timestamp
Mismatch
Resolution status

Do not reproduce the full M16 workspace inside M09.

==================================================
48. RELATIONSHIP TO M17
==================================================

Dependency checks in M09 are summary checks.

M09:

"MPCB prerequisite pending."

M17:

Full dependency relationship.

Do not create dependency editing controls inside M09.

==================================================
49. RELATIONSHIP TO M20
==================================================

Change checks in M09 detect that common project data changed.

M20:

Performs detailed delta re-scrutiny.

M09:

"Investment changed from ₹40 Cr to ₹42 Cr."

M20:

Determines which requirements, documents, dependencies and scrutiny areas may be affected.

Do not make the M09 change check itself determine the legal/regulatory impact.

==================================================
50. OFFICER JUDGMENT BOUNDARY
==================================================

Use a visible distinction throughout the page:

SYSTEM CHECK

versus:

OFFICER REVIEW

Example:

SYSTEM CHECK
Plot area mismatch detected.

OFFICER REVIEW
Determine correct source/value.

Another:

SYSTEM CHECK
Prerequisite status = Pending.

OFFICER REVIEW
Review dependency impact.

Do not allow the UI to imply:

System → Decision

The intended model is:

System → Evidence / Finding / Warning
↓
Officer → Scrutiny / Judgment
↓
Decision workflow

==================================================
51. SAMPLE DATA
==================================================

Use realistic but fictional prototype data.

Example:

Application ID:
MIDC-APP-2026-00482

Business:
Aster BioTech Manufacturing Pvt. Ltd.

Service:
Building / Planning

Pre-check:
Complete

Last run:
18 Sep 2026, 14:32

FORM
Mandatory fields:
✓

Dependent forms:
✓

Declaration:
✓

Format:
✓

PAYMENT
Fee:
Paid

DOCUMENTS
Required:
12
Present:
12
Warnings:
1 expired document

BUSINESS DNA
Required fields:
✓

NOT_APPLICABLE:
2 branches correctly handled

Needs Review:
1

MIDC / LAND
Estate:
✓

Plot:
✓

Possession:
✓

Land consistency:
⚠ Warning

CROSS-FORM
Plot area:
⚠ Mismatch

Building area:
✓

Investment:
⚠ Changed

Project location:
✓

Company identity:
✓

DEPENDENCIES
MPCB:
Pending

CHANGE
3 shared fields changed since previous version

IMPORTANT:

All values are fictional prototype data.

Do not present them as actual MIDC statistics, legal thresholds, government records or official processing requirements.

==================================================
52. EMPTY / EDGE STATES
==================================================

Support:

No fee applicable
No documents missing
No expired documents
No Business DNA issues
No MIDC context required
No cross-form mismatches
No dependencies
No changes since submission
No officer judgment required
Pre-check not yet run

Examples:

"No configured fee for this service."

"No unresolved Business DNA review items."

"No cross-form inconsistencies detected."

"No active external dependencies."

"All automated checks completed. No officer-review flags identified."

Do not create unnecessary empty warning cards.

==================================================
53. ACCESSIBILITY
==================================================

Reuse the existing EKATMA accessibility system.

Ensure:

- keyboard accessible sections
- keyboard accessible detail drawers
- visible focus states
- readable status labels
- status not communicated by color alone
- accessible icons and buttons
- English / Marathi-compatible text lengths

Use text labels:

Machine-verified
Warning
Needs officer judgment

Do not rely only on:

green
yellow
grey

==================================================
54. VISUAL DESIGN
==================================================

This is an operational validation workspace.

Use:

- compact summary
- structured check groups
- clear status rows
- expandable sections
- source/provenance labels
- existing EKATMA cards
- existing badges
- existing tables
- existing buttons
- restrained warning treatment

Avoid:

- giant KPI dashboard
- risk score
- circular completion percentage
- decorative charts
- chatbot interface
- glassmorphism
- neon gradients
- startup-style analytics
- new colors
- new typography
- new shell

==================================================
55. FINAL PAGE STRUCTURE
==================================================

The final page should read:

SIDEBAR
Applications = ACTIVE

BREADCRUMB
Department Home > Applications > Application Overview > Automated Pre-check

PAGE TITLE
Automated Pre-check

APPLICATION CONTEXT
Application ID
Business / Project
MIDC Service
Current State
Current Desk

PRE-CHECK SUMMARY
Machine-verified
Warnings
Needs officer judgment
Last run
Application version

INFORMATION NOTICE
Automated checks do not replace officer scrutiny.

CHECK GROUPS

1. FORM
2. PAYMENT / CHALLAN
3. DOCUMENTS
4. BUSINESS DNA
5. MIDC / LAND CONTEXT
6. CROSS-FORM
7. DEPENDENCIES
8. CHANGE

Each with:

Check
Result
Explanation
Source
Timestamp
Drill-down

BOTTOM / PRIMARY ACTION

Proceed to Scrutiny

→ M10

==================================================
56. MOST IMPORTANT PRINCIPLE
==================================================

M09 is an OBJECTIVE PRE-CHECK LAYER.

Its job is to tell the officer:

"What can the system verify objectively before I begin manual scrutiny?"

It should surface:

- missing information
- invalid/expired documents
- payment state
- unresolved Business DNA
- MIDC/land data issues
- cross-form mismatches
- dependency state
- changed project data

It should NOT tell the officer:

"Approve this."

"Reject this."

"This is legally non-compliant."

"AI has determined the outcome."

The intended architecture is:

BUSINESS DNA
↓
MIDC APPLICATION
↓
AUTOMATED PRE-CHECK
↓
MACHINE FINDINGS / WARNINGS
↓
OFFICER SCRUTINY
↓
SCRUTINY ROUTE
↓
SERVICE-SPECIFIC REVIEW
↓
DECISION

M09 identifies objective conditions.

The officer performs the scrutiny.

The configured statutory workflow determines the final decision.