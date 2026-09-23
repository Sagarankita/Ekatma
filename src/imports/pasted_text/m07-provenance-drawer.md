EXTEND THE EXISTING M07 — BUSINESS DNA / ADAPTIVE PROFILE CONTEXT.

IMPORTANT:
Do NOT create a new page.

Do NOT redesign M07.

Do NOT regenerate the existing M07 Business DNA screen.

The current M07 page content, sections, filters, Business DNA fields, adaptive-state model, verification-state model, navigation, government shell, and visual design are already correct.

This prompt ONLY adds a reusable FIELD-LEVEL PROVENANCE DRAWER to M07.

The drawer must appear when an officer selects an important Business DNA field/value.

==================================================
1. PURPOSE
==================================================

Add field-level provenance and traceability to M07.

The officer must be able to select an important Business DNA value and understand:

- what the value is
- where it came from
- what verification state it has
- whether it has issue/expiry information
- when it was last updated
- which services/dependencies use it
- what the previous value was
- what the current value is
- why it changed

The purpose is:

TRACEABILITY

not editing.

The officer should be able to answer:

"Where did this value come from?"

"How reliable/verified is it?"

"Has it changed?"

"What was it before?"

"What uses this value?"

"Can I verify or flag it?"

Do not turn the drawer into a generic data-editing form.

==================================================
2. HOW THE DRAWER OPENS
==================================================

Every important Business DNA field on M07 should have a subtle:

"View provenance"

or information/provenance affordance.

Example:

Plot Area
4,800 m²
CONFIRMED
SYSTEM_VERIFIED
View provenance

When the officer selects the field, open a right-side drawer.

Reuse the existing EKATMA drawer / panel component if one already exists.

Do not create a new visual component style.

The underlying M07 page should remain visible behind the drawer.

The drawer should not navigate the officer away from M07.

==================================================
3. DRAWER HEADER
==================================================

Drawer title:

Field Provenance

Below it show:

Field Name
Current Value

Example:

Field Provenance

Plot Area

4,800 m²

Also show compact context:

Application ID
Business / Project
MIDC Service

Example:

MIDC-APP-2026-00482
Aster BioTech Manufacturing Pvt. Ltd.
Building / Planning

Do not repeat the entire M07 header.

==================================================
4. PRIMARY VALUE SECTION
==================================================

Create a prominent but compact section:

CURRENT VALUE

Plot Area

4,800 m²

Below the value show:

Field classification

For example:

APPLICATION FIELD

or:

CONTEXT FIELD

or:

VERIFIED MASTER DATA

or:

OTHER-DEPARTMENT FIELD

Important:

Field classification is NOT a verification state.

Do not combine:

APPLICATION FIELD

with:

SYSTEM_VERIFIED

into one status.

They represent different concepts.

==================================================
5. SOURCE SECTION
==================================================

Show:

SOURCE

Example:

MIDC allotment document
+
Entrepreneur Adaptive Profile

Where multiple sources exist, display them separately.

For example:

Primary source:
MIDC allotment document

Supporting source:
Entrepreneur Adaptive Profile

Do not invent source provenance.

If source is unavailable:

Source:
Not available

Do not claim that a field is verified merely because it exists in the system.

==================================================
6. VERIFICATION SECTION
==================================================

Show:

DATA VERIFICATION

Use ONLY the canonical verification states:

SELF_DECLARED
USER_CONFIRMED
SYSTEM_VERIFIED
DEPARTMENT_VERIFIED
NEEDS_VERIFICATION
INVALID
EXPIRED

Example:

SYSTEM_VERIFIED

Source:
MIDC allotment document

Verified by:
System / configured verification source

Last verified:
18 Sep 2026

Do not create a generic new state:

"Verified"

when a canonical state is available.

The exact state must remain visible.

==================================================
7. IMPORTANT DISTINCTIONS
==================================================

The drawer must visually distinguish these provenance categories:

A. MACHINE-VERIFIED FACT

Meaning:

The system has verified the value against an available configured source/system record.

Display example:

SYSTEM_VERIFIED

Source:
Configured system record

Do not imply legal authority beyond the actual source.

--------------------------------------------------

B. PREVIOUSLY VERIFIED GOVERNMENT-ISSUED DATA

Example:

Plot Area
4,800 m²

Source:
MIDC allotment document

Verification:
DEPARTMENT_VERIFIED

or the actual configured verification state.

Show that the value is reused from an existing authoritative record.

Do not silently convert this into a new application fact.

--------------------------------------------------

C. ENTREPRENEUR SELF-DECLARATION

Example:

Production Capacity
12,000 units/month

Source:
Entrepreneur Adaptive Profile

Verification:
SELF_DECLARED

This must remain visibly distinct from verified data.

Do not display the same visual treatment as SYSTEM_VERIFIED or DEPARTMENT_VERIFIED.

--------------------------------------------------

D. DOCUMENT-DERIVED DATA

This category is CONDITIONAL.

Only show document-derived/extracted provenance if a later OCR / extraction phase has explicitly been enabled in the product configuration.

The current prototype does NOT need OCR extraction UI.

Therefore:

DO NOT create:

OCR confidence
Extracted text
OCR review
Extraction correction

screens in the current M07 prototype.

If the future feature is enabled, the drawer can show:

Source:
Uploaded document

Derivation:
Document extraction

Extraction status:
Pending review / Verified

But this must remain a future/configurable capability.

--------------------------------------------------

E. NEEDS OFFICER VERIFICATION

If:

Verification State = NEEDS_VERIFICATION

show:

Needs officer verification

Then explain:

Source
Why verification is needed
Last updated
Relevant service

Do not turn this into:

Invalid

Do not turn this into:

Rejected

Do not turn this into:

Deficiency

unless another workflow explicitly establishes that state.

==================================================
8. ISSUE DATE
==================================================

Show:

ISSUE DATE

only where the source/data actually has an issue date.

Examples:

Government certificate
Allotment record
Approval
Permit
Certificate

If not applicable:

Issue Date
Not available / Not applicable

Do not invent dates for ordinary Business DNA fields.

==================================================
9. EXPIRY DATE
==================================================

Show:

EXPIRY DATE

only when the source/document has a validity period.

Example:

Expiry Date:
31 Dec 2027

If the value has no expiry concept:

Expiry Date:
Not applicable

Do not mark ordinary Business DNA values as expired.

If the canonical verification state is:

EXPIRED

make that state visible.

==================================================
10. LAST UPDATED
==================================================

Show:

LAST UPDATED

Example:

18 Sep 2026, 14:32

Also show the update source where useful.

For example:

Updated through:
Entrepreneur profile resubmission

or:

Updated through:
Verified MIDC record

Do not fabricate a timestamp.

Use prototype-safe data where needed.

==================================================
11. USED BY SECTION
==================================================

Create:

USED BY

This shows where the Business DNA value is consumed.

Example:

Plot Area
Used by:

- MIDC Land / Plot service
- Building / Planning application
- MPCB application context
- Fire application context

Use configured relationships.

Do not hard-code that every Business DNA field is used by every department.

The relationship should be shown as:

Service
Department
Dependency
Regulatory journey

where configured.

For another department, make the relationship explicitly contextual.

Example:

MPCB
Relationship:
Regulatory dependency / context

NOT:

MIDC control

==================================================
12. OTHER-DEPARTMENT DATA
==================================================

If a field is used by another department:

show:

OTHER-DEPARTMENT CONTEXT

Example:

Used by:
MPCB application context

Authority:
MPCB

MIDC relationship:
Dependency / context

The officer may view the value and its provenance.

The officer must NOT receive controls to modify another department's record.

This follows the cross-department rule:

MIDC can identify and view an inconsistency involving another department's data.

MIDC cannot edit that department's record.

==================================================
13. PREVIOUS VALUE
==================================================

If the field has changed, show:

PREVIOUS VALUE

Example:

4,500 m²

Date:
10 Sep 2026

Source:
Previous Business DNA version

Then:

CURRENT VALUE

4,800 m²

Date:
18 Sep 2026

Source:
Updated application/profile record

Use a clear old → new visual relationship.

Do not overwrite the previous value.

Historical values must remain traceable.

==================================================
14. CHANGE REASON
==================================================

Show:

CHANGE REASON

Example:

"Updated after revised plot record."

Only show a reason if one exists.

If no reason is recorded:

Change reason:
Not provided

Do not invent a justification.

If the system generated the change through a configured workflow:

identify the workflow source.

==================================================
15. CHANGE TIMELINE
==================================================

If multiple historical changes exist, provide a compact:

VALUE HISTORY

timeline.

Example:

18 Sep 2026
4,800 m²
Current

10 Sep 2026
4,500 m²

02 Sep 2026
4,500 m²
Initial recorded value

Each historical entry can show:

Value
Date
Source
Verification state

Do not display an arbitrary infinite timeline if only one previous value exists.

Use a compact history pattern.

Detailed full audit history belongs to M38.

==================================================
16. ADAPTIVE PROFILE STATE
==================================================

Because this drawer is part of M07, retain the distinction between:

ADAPTIVE QUESTION / BRANCH STATE

and:

DATA VERIFICATION STATE

Show the adaptive state separately.

Example:

Adaptive State:
CONFIRMED

Verification:
SYSTEM_VERIFIED

These must never become:

Status:
Verified

Likewise:

Adaptive State:
NOT_APPLICABLE

Verification:
USER_CONFIRMED

is valid.

Do not interpret NOT_APPLICABLE as missing.

==================================================
17. BRANCH / QUESTION CONTEXT
==================================================

Where useful, show:

WHY THIS FIELD EXISTS

Example:

Adaptive branch:
Boiler-related questions were activated because the business activity/process branch indicated boiler usage.

Or:

Branch state:
NOT_APPLICABLE

Reason:
Boiler = No

Use the configured adaptive branch trigger.

Do not have the AI invent a reason.

If the exact trigger is not available:

"Adaptive branch reason not available."

==================================================
18. MASTER DATA PROTECTION
==================================================

IMPORTANT:

Do NOT create silent edit controls.

There must be no:

Edit

Save

Overwrite

button that directly changes a master value.

Master data must be protected.

The provenance drawer is primarily informational and traceability-oriented.

If a value is wrong, the officer must use a controlled correction workflow.

==================================================
19. VERIFIED CORRECTION WORKFLOW
==================================================

Where the product configuration permits an officer to propose or record a verified correction, provide a controlled action:

"Propose correction"

or:

"Record verified correction"

Do not directly overwrite the master value.

Opening this action should show a controlled correction form.

Fields:

Current Value
Proposed New Value
Source
Verification Basis
Correction Reason
Timestamp
Officer / Role

The current value must remain visible.

Example:

CURRENT
Plot Area
4,500 m²

PROPOSED
4,800 m²

SOURCE
MIDC allotment document

REASON
Updated verified allotment record

Then require the appropriate configured confirmation workflow.

Do not create an automatic "Save to Master Data" action unless the product explicitly has a configured permission/workflow for it.

==================================================
20. CORRECTION HISTORY
==================================================

If a correction is recorded, preserve:

OLD VALUE
↓
NEW VALUE
↓
SOURCE
↓
TIMESTAMP
↓
OFFICER / ACTOR
↓
REASON

Example:

4,500 m²
→
4,800 m²

Source:
MIDC allotment document

Recorded:
18 Sep 2026, 14:32

Actor:
Authorized MIDC officer

Reason:
Verified allotment record update

Do not delete the old value.

Do not silently synchronize the new value across all departments.

Instead, identify affected consumers.

==================================================
21. DOWNSTREAM IMPACT
==================================================

After a proposed/recorded correction, show:

POTENTIAL IMPACT

Used by:
- MIDC Land / Plot
- Building / Planning
- MPCB context
- Fire context

Potential downstream review:
Cross-form consistency
Delta re-scrutiny

Do not claim:

"All applications updated"

unless the system actually has that configured behaviour.

The correct model is:

Master value changed
→ affected consumers identified
→ consistency / delta workflows triggered where configured

==================================================
22. CROSS-FORM CONSISTENCY CONNECTION
==================================================

This provenance component must support M16 — Cross-form Consistency.

If a field appears in multiple records:

show:

SHARED FIELD

Example:

Plot Area
Master Profile:
4,800 m²

MIDC Land:
4,800 m²

MIDC Building:
4,800 m²

MPCB:
4,800 m²

Fire:
4,600 m²

If there is a mismatch, show:

Consistency:
Mismatch detected

Then provide:

"View consistency details"

→ M16 Cross-form Consistency.

IMPORTANT:

Do not automatically modify the Fire record because the master value is 4,800 m².

MIDC can identify the inconsistency.

MIDC cannot edit another department's record.

==================================================
23. DELTA RE-SCRUTINY CONNECTION
==================================================

If:

Previous Value ≠ Current Value

and the changed field affects the current MIDC application,

show:

"Potential application impact"

with:

View Delta Impact

→ M20 Delta Re-scrutiny

The drawer should expose:

Previous value
Current value
Affected service
Affected dependency
Potential review requirement

Do not perform the full delta analysis in the drawer.

M20 owns the detailed delta re-scrutiny workflow.

==================================================
24. AUDIT CONNECTION
==================================================

Provide:

"View audit history"

→ M38 Audit / History

The drawer itself should show enough local history to understand the field.

M38 remains the authoritative detailed audit/history workspace.

This means:

M07 drawer
= field-level provenance

M16
= cross-form consistency

M20
= delta re-scrutiny

M38
= complete audit/history

Do not duplicate the entire audit log inside the drawer.

==================================================
25. SOURCE TYPE VISUALIZATION
==================================================

Use a compact "Source Type" indicator.

Possible source types:

ENTREPRENEUR SELF-DECLARATION

VERIFIED GOVERNMENT DATA

SYSTEM-VERIFIED FACT

DEPARTMENT RECORD

UPLOADED DOCUMENT

FUTURE DOCUMENT-DERIVED DATA

OTHER-DEPARTMENT CONTEXT

Only show source types that are actually applicable.

Do not invent a source type merely to make the UI look complete.

==================================================
26. PROVENANCE EXAMPLES
==================================================

Create several prototype-safe examples to demonstrate the component.

EXAMPLE 1 — VERIFIED GOVERNMENT DATA

Field:
Plot Area

Value:
4,800 m²

Source:
MIDC allotment document

Verification:
DEPARTMENT_VERIFIED

Used by:
MIDC Land / Plot
Building / Planning
MPCB context
Fire context

==================================================

EXAMPLE 2 — ENTREPRENEUR SELF-DECLARATION

Field:
Production Capacity

Value:
12,000 units/month

Source:
Entrepreneur Adaptive Profile

Verification:
SELF_DECLARED

Used by:
Regulatory journey
MIDC service context

==================================================

EXAMPLE 3 — MACHINE VERIFIED

Field:
Project Stage

Value:
Construction

Source:
Configured application/system record

Verification:
SYSTEM_VERIFIED

Used by:
MIDC routing
Service workflow

==================================================

EXAMPLE 4 — NEEDS VERIFICATION

Field:
Hazardous Waste

Value:
Yes

Source:
Entrepreneur Adaptive Profile

Verification:
NEEDS_VERIFICATION

Action:
Officer verification required

Do NOT show:

Rejected

==================================================

EXAMPLE 5 — CHANGED VALUE

Field:
Plot Area

Previous:
4,500 m²

Current:
4,800 m²

Source:
Revised MIDC allotment record

Change reason:
Updated verified allotment information

Timestamp:
18 Sep 2026

Potential impact:
Cross-form consistency
Delta re-scrutiny

==================================================
27. NO OCR IN CURRENT PROTOTYPE
==================================================

IMPORTANT:

The current prototype does NOT include OCR/document-extraction review.

Do not add:

OCR confidence scores
extracted text panels
OCR correction controls
document extraction approval

unless a later product phase explicitly enables OCR/extraction.

The current system can use:

- uploaded documents
- user-entered metadata
- approval-generated certificates
- verified/reused system data

Document-derived data should therefore be represented only where the configured prototype already supports it.

==================================================
28. PERMISSION MODEL
==================================================

The drawer must respect the officer's permission scope.

All officers may not have correction authority.

Therefore actions should adapt to permissions.

Possible states:

VIEW ONLY

VIEW + REQUEST VERIFICATION

VIEW + PROPOSE CORRECTION

VIEW + RECORD VERIFIED CORRECTION

These are permission/configuration states.

Do not assume every MIDC officer can modify master data.

==================================================
29. MACHINE FACT VS OFFICER JUDGMENT
==================================================

Clearly distinguish:

SYSTEM FACT

from:

OFFICER JUDGMENT

Example:

SYSTEM FACT
"Plot Area differs between Master Profile and Fire record."

OFFICER ACTION
"Review consistency"

Do not display:

"Fire value is wrong."

unless an authorized workflow has actually established that fact.

Similarly:

SYSTEM FACT
"Source document indicates 4,800 m²."

does not automatically mean:

"Master value must be changed to 4,800 m²."

The correction workflow must remain controlled.

==================================================
30. DRAWER LAYOUT
==================================================

Use this visual hierarchy:

DRAWER HEADER

Field Provenance

Plot Area
4,800 m²

--------------------------------

FIELD CLASSIFICATION

APPLICATION FIELD

--------------------------------

SOURCE

MIDC allotment document
Entrepreneur Adaptive Profile

--------------------------------

ADAPTIVE STATE

CONFIRMED

VERIFICATION

DEPARTMENT_VERIFIED

--------------------------------

VALIDITY

Issue Date
...
Expiry Date
...

--------------------------------

LAST UPDATED

18 Sep 2026

--------------------------------

USED BY

MIDC Land / Plot
Building / Planning
MPCB context
Fire context

--------------------------------

VALUE HISTORY

Previous:
4,500 m²

Current:
4,800 m²

--------------------------------

CHANGE REASON

Updated after revised allotment record.

--------------------------------

CONSISTENCY

Potential mismatch / no mismatch

View consistency

--------------------------------

DELTA IMPACT

Potential application impact

View delta

--------------------------------

ACTIONS

View source
View consistency
View delta
View audit

If permitted:
Propose correction

==================================================
31. VISUAL DESIGN
==================================================

Reuse the existing EKATMA drawer component.

Do not create a new design language.

The drawer should be:

- information-dense
- readable
- structured
- clearly separated into sections
- easy to scan
- keyboard accessible

Use existing:

- badges
- status indicators
- labels
- dividers
- typography
- buttons
- icons
- spacing

Do not introduce:

- new colors
- gradients
- glassmorphism
- oversized cards
- chatbot styling
- decorative graphics

Verification state must never be communicated by color alone.

==================================================
32. RESPONSIVENESS
==================================================

The drawer should work at the existing desktop application width.

Do not cover the entire application unless the existing EKATMA drawer pattern requires it.

The underlying M07 content should remain identifiable.

Allow the drawer to scroll independently if its contents exceed viewport height.

==================================================
33. ACCESSIBILITY
==================================================

The drawer must:

- have a clear accessible title
- have a visible close button
- support keyboard focus
- trap focus appropriately while open
- provide readable labels
- not depend on color alone
- support English / Marathi-compatible text lengths

Reuse the existing accessibility patterns.

==================================================
34. FINAL COMPONENT RELATIONSHIP
==================================================

The resulting architecture must be:

M06
Application Overview
↓
M07
Business DNA / Adaptive Profile Context
↓
Business DNA Field
↓
Field Provenance Drawer

The drawer then connects to:

M16
Cross-form Consistency

M20
Delta Re-scrutiny

M38
Audit / History

The drawer must NOT become a new standalone screen.

==================================================
35. MOST IMPORTANT DATA INTEGRITY RULE
==================================================

NEVER SILENTLY OVERWRITE MASTER DATA.

If an officer identifies a correction:

OLD VALUE
→
PROPOSED / NEW VALUE
→
SOURCE
→
TIMESTAMP
→
ACTOR
→
REASON

must remain traceable.

Historical values must remain available.

If multiple departments consume the value, identify affected consumers.

Do not silently synchronize another department's record.

Do not erase provenance.

Do not erase version history.

Do not convert SELF_DECLARED into VERIFIED merely because an officer viewed it.

Do not convert NEEDS_VERIFICATION into VERIFIED without an actual verification event.

Do not treat NOT_APPLICABLE as missing.

This component is the traceability layer that connects Business DNA to cross-form consistency, delta re-scrutiny, and audit history.