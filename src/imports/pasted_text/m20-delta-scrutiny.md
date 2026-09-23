Create M20 — Delta Re-scrutiny.

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
- status primitives
- common officer workbench
- existing application timeline
- existing document components
- existing dependency components

M20 must be a DELTA ANALYSIS + RE-SCRUTINY WORKSPACE.

Its purpose is to answer:

"What changed since the previous submission, and what does that change require the MIDC officer to reconsider?"

M20 must help the officer avoid unnecessarily re-reading unchanged information while ensuring that changed information and its configured downstream impacts are properly reviewed.

==================================================
1. CORE MODEL
==================================================

When an entrepreneur resubmits an application, compare:

PREVIOUS VERSION
        ↓
CURRENT VERSION
        ↓
DELTA ANALYSIS
        ↓
CHANGED
        ↓
AFFECTED
        ↓
UNCHANGED
        ↓
OFFICER RE-SCRUTINY

The system must preserve both versions.

Never overwrite the previous submission.

==================================================
2. THREE CORE CATEGORIES
==================================================

The main interface must have exactly three primary tabs:

CHANGED
AFFECTED
UNCHANGED

These categories have different meanings.

--------------------------------------------------
CHANGED
--------------------------------------------------

Something directly changed between the previous and current version.

Example:

Plot Area
4,800 m²
→
5,200 m²

Building Area
2,000 m²
→
2,300 m²

Building Plan
v1
→
v2

--------------------------------------------------
AFFECTED
--------------------------------------------------

The item itself may not have changed, but the change may affect it.

Example:

Plot Area changed:

4,800 → 5,200

Potentially affected:

Building / Planning parameters
Land / Plot scrutiny
Utility applicability
Fire-related dependency
Inspection requirement
Configured downstream approvals

The affected item should clearly state:

"Not changed directly — affected by [changed field]."

This distinction is critical.

--------------------------------------------------
UNCHANGED
--------------------------------------------------

The underlying value/version has not changed and there is no configured reason to re-review it.

Example:

Company identity
No change

Project location
No change

Water source
No change

Existing verified land document
No change

The officer should not be forced to re-read these items unless the applicable configured process explicitly requires it.

==================================================
3. APPLICATION HEADER
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
RESUBMITTED

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

Also show:

Previous Submission:
Version 1

Current Submission:
Version 2

Resubmitted:
Configured date/time

Do not create a new application ID for the resubmission.

The application remains the same underlying application.

==================================================
4. DELTA HEADER
==================================================

At the top of the main content, show:

"Delta Re-scrutiny"

Subtitle:

"Compare the previous submission with the current resubmission and identify the MIDC review areas affected by the changes."

Show a compact summary:

Changed:
3

Affected:
5

Unchanged:
12

Requires Officer Review:
Configured count

Do NOT use:

Change Score
Risk Score
Approval Probability
AI Confidence

These are factual counts.

==================================================
5. VERSION COMPARISON
==================================================

Create a visible version selector.

Previous:

Submission v1

Current:

Submission v2

Allow the officer to switch the comparison baseline only where the workflow supports it.

Show:

Submitted
Date
Application State
Business DNA Version
Document Versions
Officer review status

Example:

VERSION 1
Submitted:
12 Sep 2026

Business DNA:
v3

Application:
v1

VERSION 2
Resubmitted:
18 Sep 2026

Business DNA:
v4

Application:
v2

The comparison must always make clear which version is old and which is current.

==================================================
6. PRIMARY DELTA VIEW
==================================================

The central area should use a comparison table.

Columns:

Field / Item
Previous
Current
Change
Source
Verification
Impact
Review Status

Example:

Plot Area
4,800 m²
5,200 m²
+400 m²
Master Project Dossier
System Verified
Affects Building / Planning
Needs Review

Building Area
2,000 m²
2,300 m²
+300 m²
MIDC Application
User Confirmed
Affects Building / Planning
Needs Review

Building Plan
v1
v2
Replaced
Document Repository
Department Verified
Affects Building Review
Needs Review

Company Identity
Same
Same
No change
Business DNA
System Verified
None
No Review Required

==================================================
7. CHANGE TYPES
==================================================

Support clear change labels.

VALUE CHANGED

Example:
4,800 → 5,200

DOCUMENT VERSION CHANGED

Example:
Plan v1 → Plan v2

STATUS CHANGED

Example:
Project Stage:
Pre-construction → Construction

BUSINESS DNA VERSION CHANGED

Example:
Business DNA v3 → v4

DEPENDENCY STATE CHANGED

Example:
Dependency:
Pending → Ready

APPLICABILITY CHANGED

Example:
Water Required:
No → Yes

Do not assume every change requires the same review depth.

==================================================
8. BUSINESS DNA CHANGE
==================================================

If the change originated from the Adaptive Business Profile after confirmation, display a prominent banner:

"Business DNA changed after original submission."

Show:

Previous Business DNA:
v3

Current Business DNA:
v4

Changed Business DNA fields:

Plot Area
4,800 → 5,200

Water Requirement
No → Yes

Project Stage
Pre-construction → Construction

Provide:

"View Business DNA Change"

→ M07

Do not allow M20 to edit the Business DNA directly.

M20 only displays the change and its configured impact.

==================================================
9. BUSINESS DNA CHANGE PROVENANCE
==================================================

For each changed Business DNA field show:

Field
Previous Value
Current Value
Business DNA Version
Changed By
Changed Date
Verification State
Source

Example:

Water Requirement

Previous:
No

Current:
Yes

Source:
Adaptive Business Profile

Business DNA:
v4

Verification:
User Confirmed

Changed:
18 Sep 2026

This makes it clear that the change came from the entrepreneur's confirmed Business DNA rather than from an unexplained system modification.

==================================================
10. EXPANSION / MODIFICATION WORKFLOW
==================================================

If the change originates from an expansion or amendment/modification workflow, do NOT show the standard:

Previous Submission → Current Submission

view alone.

Also show:

CURRENT PROJECT
        ↓
PROPOSED PROJECT
        ↓
DELTA

Example:

CURRENT PROJECT

Plot Area:
4,800 m²

Building Area:
2,000 m²

Production Capacity:
10,000 units/month

Water Requirement:
100 KLD

↓

PROPOSED PROJECT

Plot Area:
5,200 m²

Building Area:
2,300 m²

Production Capacity:
15,000 units/month

Water Requirement:
140 KLD

↓

DELTA

Plot Area:
+400 m²

Building Area:
+300 m²

Production Capacity:
+5,000 units/month

Water:
+40 KLD

Clearly label:

"Expansion / Modification Delta"

Provide a link to:

M29 — Expansion / Amendment Intake

where applicable.

==================================================
11. AFFECTED SERVICE PARAMETERS
==================================================

Create an "Affected MIDC Service Parameters" section.

This should answer:

"What MIDC scrutiny areas may need to be reconsidered because of the change?"

Example:

Changed:
Plot Area

Potentially affected:

Land / Plot
Building / Planning
Water / Utility
Inspection

For each affected item show:

Service
Parameter
Why affected
Previous value
Current value if applicable
Review state

Example:

Building / Planning

Parameter:
Built-up Area

Reason affected:
Plot Area changed

Review:
Needs Review

Important:

Do not automatically mark the affected parameter invalid.

Use:

Needs Review

until the officer actually scrutinises it.

==================================================
12. AFFECTED DEPENDENCY NODES
==================================================

Create:

"Affected Dependency Nodes"

Show dependency nodes whose relationship or relevance may have changed.

Example:

Plot Area changed

Potentially affected:

MIDC Building / Planning
Provisional Fire
MIDC Water / Utility
Construction
Other configured downstream node

For each:

Dependency
Previous State
Current State
Impact
Review Required

Example:

MIDC Water / Utility

Previous:
Not Active

Current:
Active

Reason:
Water Requirement changed from No → Yes

Status:
Needs Verification

Do not automatically activate services solely because a UI delta exists.

The configured regulatory engine determines actual applicability.

M20 displays the configured result.

==================================================
13. AFFECTED EXTERNAL JOURNEY NODES
==================================================

Show external department nodes where the changed information may affect the configured regulatory journey.

Example:

Plot Area changed

Potentially affected:

Fire
MPCB
Other configured external service

For each show:

Department
Service
Previous Context
Current Context
Configured Impact
MIDC Action

Example:

Fire

Department:
Configured external authority

Impact:
Potentially affected by changed project/building context

MIDC Action:
View dependency

IMPORTANT:

MIDC cannot edit or decide the external department's application.

Do not automatically mark an external approval:

Rejected
Invalid
Revoked

because another field changed.

Instead:

"External dependency may require review according to configured rules."

==================================================
14. DOCUMENT IMPACT
==================================================

Create:

"Document Impact"

Show documents that:

- changed
- were replaced
- may be affected
- may need re-verification
- may no longer correspond to the current project data

Example:

Building Plan

Previous:
v1

Current:
v2

Status:
Replaced

Impact:
Building / Planning scrutiny

Action:
Open M13

Another:

Land Record

Version:
v2

Change:
No change

Impact:
None

Do not automatically invalidate unchanged documents.

If a changed project field makes a document potentially stale, show:

"Potentially affected — officer verification required."

==================================================
15. INSPECTION IMPACT
==================================================

Create:

"Inspection Impact"

Show whether the delta may affect inspection requirements.

Example:

Building Area:
2,000 → 2,300 m²

Configured impact:

"Inspection requirement may be affected."

Status:

Needs Verification

Possible outcomes:

No change
Inspection required
Inspection scope changed
Re-inspection required
Needs Verification

Do not invent inspection rules.

Do not automatically schedule an inspection.

If the configured process says an inspection is required, provide:

"Open Inspection Queue"

→ M21

==================================================
16. AFFECTED VS AUTOMATICALLY REQUIRED
==================================================

This distinction must be explicit.

A changed field can produce:

Potential Impact

without automatically producing:

Mandatory Re-review

The UI should distinguish:

Potentially affected
Configured review required
Officer review required
No impact detected

Do not use "Affected" to mean "automatically invalid."

==================================================
17. CHANGED TAB
==================================================

Default tab:

CHANGED

Show only items directly changed between versions.

Example:

Plot Area
4,800 → 5,200

Building Area
2,000 → 2,300

Building Plan
v1 → v2

Water Requirement
No → Yes

Each row has:

Previous
Current
Change Type
Source
Verification
Affected Areas
Review Status

Clicking a row opens a detail drawer.

==================================================
18. AFFECTED TAB
==================================================

Show items that require consideration because of a changed item.

Example:

Changed field:
Plot Area

Affected:

Building / Planning
Built-up Area consistency

Reason:
Plot size changed.

Another:

Changed field:
Water Requirement

Affected:

MIDC Water / Utility
Water service applicability

Reason:
Water requirement changed from No → Yes.

Another:

Changed field:
Building Area

Affected:

Inspection
Configured inspection requirement

Reason:
Building scope changed.

Each affected item must explain:

"Why is this affected?"

Do not simply list affected items without causality.

==================================================
19. UNCHANGED TAB
==================================================

Show information that remained unchanged.

Example:

Company Identity
No change

Project Location
No change

Plot Number
No change

Existing Land Document
No change

Water Source
MIDC
No change

For each show:

Field
Previous
Current
Verification
Review Requirement

Default:

"No review required"

unless configured otherwise.

Do not force the officer to open every unchanged item.

==================================================
20. OFFICER RE-SCRUTINY STATE
==================================================

For each changed/affected item support:

NOT REVIEWED
UNDER REVIEW
VALID
QUERY
INVALID
NEEDS VERIFICATION
REVIEWED — NO CHANGE TO FINDING

Use the existing officer scrutiny vocabulary where possible.

Do not create a new conflicting finding model.

The officer's finding is distinct from:

change status
verification state
application state
dependency state

==================================================
21. RE-SCRUTINY ACTIONS
==================================================

For each changed/affected item provide:

Open Parameter
Open Document
Open Consistency
Open Dependency
Raise Query
Mark Reviewed
Request Additional Evidence

Depending on the item.

Examples:

Changed Plot Area
→ Open M12

Changed Building Plan
→ Open M13

Potential mismatch
→ Open M16

Dependency impact
→ Open M17

Query
→ M18

Do not duplicate these screens inside M20.

==================================================
22. BULK REVIEW
==================================================

Allow the officer to mark clearly unaffected/verified items as reviewed where appropriate.

Example:

Select:

Company Identity
Project Name
Project Location

Action:

"Mark Reviewed — No Change"

But do NOT provide a generic:

"Mark All Valid"

button.

The officer should not be able to bulk-confirm information that requires individual scrutiny.

==================================================
23. QUERY INTEGRATION
==================================================

If a changed/affected item requires clarification:

Action:

Raise Query

Create a deficiency candidate for:

M18 — Consolidated Query Builder

Pre-populate:

Deficiency Category
Changed Field
Previous Value
Current Value
Evidence
Reason for query
Required correction

Example:

DEF-2026-0095

Category:
Data Inconsistency

Issue:
Plot area changed from 4,800 m² to 5,200 m²; supporting evidence required.

Previous:
4,800 m²

Current:
5,200 m²

Source:
Business DNA v4

Required evidence:
Configured supporting land/project evidence

Do not force the officer to manually recreate the delta.

==================================================
24. CROSS-FORM CONSISTENCY INTEGRATION
==================================================

A changed value may cause M16 to identify new inconsistencies.

Example:

Plot Area:
4,800 → 5,200

Current:

Master Project Dossier:
5,200

MIDC Land:
5,200

MIDC Building:
4,800

MPCB:
4,800

M16 should then identify:

MISMATCH

M20 should provide:

"Open Cross-form Consistency"

→ M16

M20 does not resolve the mismatch itself.

==================================================
25. DEPENDENCY GRAPH INTEGRATION
==================================================

When a delta changes a dependency:

show:

Previous Dependency State
Current Dependency State

Example:

Water Service

Previous:
Not Applicable

Current:
Active

Reason:
Water Required changed from No → Yes

Then:

"View Regulatory Dependency"

→ M17

M17 remains the authoritative journey/dependency view.

M20 only surfaces the impact.

==================================================
26. APPLICATION TIMELINE INTEGRATION
==================================================

M20 must link into the shared application timeline.

Example:

12 Sep
Application Submitted v1

↓

18 Sep
Query Response

↓

18 Sep
Resubmission v2

↓

18 Sep
Delta Identified

↓

Current:
Delta Re-scrutiny

M08 should show the same events.

Do not create a separate timeline that conflicts with M08.

==================================================
27. QUERY / RESPONSE INTEGRATION
==================================================

M20 should show which changes resulted from which deficiency where the relationship is known.

Example:

DEF-2026-0092

Required correction:
Update Building Plan

Response:
Corrected Plan v2

Delta:

Building Plan
v1 → v2

Provide:

"View Query History"

→ M19

This gives the officer the full chain:

Query
→ Response
→ Correction
→ Resubmission
→ Delta

==================================================
28. DOCUMENT VERSIONING
==================================================

Never overwrite previous documents.

Example:

Building Plan

Original:
v1

Current:
v2

Show:

Original document
Current document
Version
Uploaded date
Source
Verification
Related deficiency

If v2 is under verification:

Verification:
Needs Verification

Do not automatically inherit the previous document's verification state if the content changed.

The new version must be independently reviewable.

==================================================
29. BUSINESS DNA VERSIONING
==================================================

If Business DNA changed:

show:

Previous Business DNA:
v3

Current Business DNA:
v4

Changed fields:
3

For each:

Previous
Current
Source
Verification
Changed by
Changed date

Do not overwrite historical Business DNA versions.

The officer should be able to see:

"Business DNA changed after original submission."

This exact message should be prominent when applicable.

==================================================
30. EXPANSION / AMENDMENT VERSIONING
==================================================

If the change originates from an expansion/modification workflow:

show:

CURRENT PROJECT

vs

PROPOSED PROJECT

Then:

DELTA

Example:

CURRENT:
Building Area:
2,000 m²

PROPOSED:
2,300 m²

DELTA:
+300 m²

Also show:

Affected MIDC Services
Amendment Required?
New MIDC Service?
Inspection Impact?
Document Update?
External Dependency Impact?

These are configured outputs.

Do not automatically assume an amendment or new service is legally required.

==================================================
31. PREVIOUS APPROVAL CONTEXT
==================================================

If the application has previous approved data, show it separately from the previous submitted version.

For example:

Previous Approved:
4,800 m²

Previous Submission:
4,800 m²

Current:
5,200 m²

This distinction matters.

Do not assume:

Previous Submission = Previous Approved

They may differ.

Show the relevant source and version for each.

==================================================
32. APPLICATION STATE
==================================================

When a resubmission is received:

Use the existing canonical application state:

RESUBMITTED

Then the configured workflow may move into:

DOCUMENT_SCRUTINY
INITIAL_SCRUTINY
TECHNICAL_SCRUTINY

depending on the service.

Do NOT create:

DELTA_REVIEW

as a new canonical application state.

"Delta Re-scrutiny" is the review workspace/process, not a replacement application state.

==================================================
33. OPERATIONAL OVERLAY
==================================================

The queue may display:

"Delta review required"

or:

"Changed fields require attention"

as an operational label.

Do not replace:

RESUBMITTED
TECHNICAL_SCRUTINY

with an invented canonical status.

==================================================
34. SLA CONTEXT
==================================================

Show relevant SLA timing.

Separate:

MIDC processing time
Entrepreneur response time
Current scrutiny time
External dependency time
Total elapsed

Do not treat the delta itself as automatically resetting all SLA clocks.

The SLA configuration determines the timing.

==================================================
35. AUTOMATION / AI BOUNDARY
==================================================

Automation may:

- compare previous/current versions
- detect changed fields
- identify affected parameters
- identify affected configured dependencies
- identify affected documents
- identify potential inspection impact
- identify new cross-form inconsistencies
- identify changes originating from Business DNA
- group related changes

Automation must NOT:

- decide that approval is invalid
- automatically reject
- automatically approve
- invent a regulatory impact
- invent a required inspection
- invent a required document
- modify historical records
- overwrite previous versions
- silently change Business DNA
- decide another department's approval status

Every automated impact statement should be explainable.

Use:

"Configured impact"

"Potential impact"

or:

"Needs Verification"

where appropriate.

==================================================
36. IMPACT EXPLANATION
==================================================

When an item is marked affected, provide:

"Why is this affected?"

Example:

Changed:
Plot Area

Affected:
Building / Planning — Built-up Area consistency

Why:
"The configured consistency rule compares building area against the updated plot context."

Another:

Changed:
Water Required

Affected:
MIDC Water / Utility

Why:
"The configured regulatory journey activates the water service when water is required and the source is MIDC."

Do not generate explanations that are not supported by configured rules.

==================================================
37. NO AUTOMATIC RE-SCRUTINY OF EVERYTHING
==================================================

The core principle must be visible in the UI:

"Only changed and configured affected information requires focused re-scrutiny. Unchanged information remains available for reference."

Provide:

"View Unchanged"

rather than forcing the officer through every field again.

If a configured process requires full review:

show:

"Full review required by configured process."

Do not assume that every resubmission requires complete re-review.

==================================================
38. SAMPLE SCREEN
==================================================

Use realistic prototype-safe sample data.

Application:
MIDC-APP-2026-00418

Business:
Aster Precision Components Pvt. Ltd.

Previous Submission:
v1

Current Submission:
v2

Application State:
RESUBMITTED

Current Service:
Building / Planning

CHANGED:

Plot Area
4,800 → 5,200 m²

Building Area
2,000 → 2,300 m²

Building Plan
v1 → v2

Water Requirement
No → Yes

AFFECTED:

MIDC Building / Planning
Plot/building consistency

MIDC Water / Utility
Service applicability

Provisional Fire
Configured dependency impact

Construction
Configured downstream impact

Inspection
Potential inspection impact

M16 Cross-form Consistency
Potential new mismatch

UNCHANGED:

Company identity
No change

Project location
No change

Plot number
No change

Existing company information
No change

Again:

All values are prototype-safe examples.

Do not present them as actual government records or legal determinations.

==================================================
39. VISUAL STRUCTURE
==================================================

Use:

TOP:
Application + version context

SECOND:
Delta summary

MAIN:
Three-tab delta workspace

CHANGED
AFFECTED
UNCHANGED

CENTER:
Comparison table

RIGHT:
Selected change / impact detail drawer

BOTTOM:
Re-scrutiny actions

The primary visual should make:

A → B

immediately understandable.

Use arrows, old/new columns and clear labels.

Do not rely solely on colour.

==================================================
40. CHANGE DETAIL DRAWER
==================================================

When a changed item is selected, show:

FIELD:
Plot Area

PREVIOUS:
4,800 m²

CURRENT:
5,200 m²

CHANGE:
+400 m²

SOURCE:
Business DNA v4

VERIFICATION:
User Confirmed

ORIGIN:
Adaptive Business Profile

CHANGED:
18 Sep 2026

AFFECTED:

Building / Planning
Water / Utility
Fire dependency
Inspection

ACTIONS:

Open Parameter
Open Consistency
Open Dependency
Raise Query
Mark Reviewed

==================================================
41. AFFECTED DETAIL DRAWER
==================================================

When an affected item is selected:

show:

Affected Item:
MIDC Water / Utility

Direct Change:
Water Required

Previous:
No

Current:
Yes

Why Affected:
Configured service applicability rule

Review:
Needs Verification

Actions:

Open M15
Open M17
Open Business DNA
Raise Query

Clearly state:

"This item was not directly changed. It is shown because a related change may affect its configured applicability or scrutiny."

==================================================
42. UNCHANGED DETAIL
==================================================

When an unchanged item is selected:

show:

Field:
Company Identity

Previous:
Aster Precision Components Pvt. Ltd.

Current:
Aster Precision Components Pvt. Ltd.

Change:
None

Verification:
Department Verified

Impact:
None detected

Review:
No review required

Provide:

"Open Record"

but do not force a re-review.

==================================================
43. OFFICER ACTIONS
==================================================

Primary actions:

Open Parameter
Open Document
Open Consistency
Open Dependency
Open Query History
Raise Query
Mark Reviewed

Secondary:

View Previous Version
View Current Version
View Business DNA
View Application Timeline

Do NOT include:

Approve Application
Reject Application

Final decisions remain in M25/M26.

==================================================
44. AUDIT HISTORY
==================================================

Every delta analysis should preserve:

Delta ID
Application ID
Previous version
Current version
Business DNA version
Changed fields
Affected fields
Officer review actions
Query IDs
Deficiency IDs
Document versions
Dependency states
Inspection impact
Date/time
Officer

Example:

DELTA-2026-0018

Previous:
Application v1

Current:
Application v2

Detected:
18 Sep 2026

Reviewed:
[Officer]

Do not overwrite previous delta analyses.

==================================================
45. RE-SUBMISSION LOOP
==================================================

The intended workflow is:

ENTREPRENEUR RESPONDS
        ↓
CORRECTION
        ↓
RESUBMISSION
        ↓
RESUBMITTED
        ↓
M20 DELTA ANALYSIS
        ↓
CHANGED
        ↓
AFFECTED
        ↓
UNCHANGED
        ↓
OFFICER RE-SCRUTINY
        ↓
QUERY AGAIN IF REQUIRED
        ↓
INSPECTION IF CONFIGURED
        ↓
FINAL DECISION

Do not force the application back to the beginning.

The delta mechanism exists specifically to make resubmission efficient and traceable.

==================================================
46. CONNECTION TO M21 INSPECTION
==================================================

If the delta creates a configured inspection impact:

show:

"Inspection impact detected"

Possible state:

Inspection:
No change

or:

Inspection:
Review required

or:

Inspection:
Re-inspection configured

Provide:

"Open Inspection Queue"

→ M21

Do not automatically schedule the inspection from M20.

==================================================
47. CONNECTION TO M25 DECISION
==================================================

M20 is not a decision screen.

The officer completes required re-scrutiny first.

Only after the configured workflow is satisfied can the application proceed toward:

FINAL_DECISION

M25.

Do not expose final decision controls on M20.

==================================================
48. ACCESSIBILITY
==================================================

Use Auto Layout.

Use text + icon for status.

Make old/current values distinguishable without colour alone.

Use:

Previous
Current
Changed
Affected
Unchanged

as explicit text labels.

Ensure:

- long field names wrap
- document names wrap
- regulatory explanations wrap
- old/new values remain readable
- version labels remain visible
- Marathi/English-compatible containers are preserved
- keyboard focus states follow the existing design system

==================================================
49. CRITICAL RULES
==================================================

NEVER:

- overwrite the previous application version
- overwrite previous Business DNA
- overwrite previous documents
- treat every changed field as automatically invalid
- treat every affected field as automatically changed
- force full re-scrutiny without configured reason
- invent regulatory impact
- invent inspection requirements
- invent document requirements
- automatically invalidate another department's approval
- automatically activate another department's service
- automatically approve
- automatically reject
- create a new canonical application state called DELTA_REVIEW
- replace RESUBMITTED with an invented status
- silently change historical dependency states

ALWAYS:

- compare old vs current
- preserve versions
- distinguish Changed from Affected
- distinguish Affected from Unchanged
- show provenance
- show Business DNA version
- show document versions
- show dependency impact
- show possible inspection impact
- explain why something is affected
- link to M12/M13/M16/M17/M18/M19/M21
- preserve audit history
- let the officer decide what requires further scrutiny