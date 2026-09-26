Continue the EXISTING EKATMA Entrepreneur-side Figma implementation.

============================================================
EKATMA — ENTREPRENEUR SIDE
DEDICATED ADAPTIVE BUSINESS BEHAVIOR PASS
E03 + E04 + E05
============================================================

IMPORTANT:

E03, E04 and E05 are ALREADY DESIGNED.

This prompt is NOT asking you to redesign them.

This prompt is NOT asking you to create another questionnaire.

This prompt is NOT asking you to create E06 yet.

The purpose of this prompt is to perform a dedicated
BEHAVIOR + STATE + DATA-REUSE PASS across E03–E05 so that
the existing screens behave like ONE adaptive Business Profile engine.

============================================================
1. ABSOLUTELY PRESERVE ALL COMPLETED VISUAL WORK
============================================================

Do NOT:

- redesign E03
- redesign E04
- redesign E05
- regenerate existing frames
- create a new visual language
- create a new design system
- change typography
- change color tokens
- change spacing
- change button styles
- change existing cards
- change existing forms
- change existing layout hierarchy
- change header/footer
- change Government of Maharashtra branding
- change EKATMA branding
- change accessibility strip
- change breadcrumbs
- change E02
- change authentication
- add a full new navigation system
- create Business Profile Review yet
- create Regulatory Journey yet
- create Department screens
- create applications

Use the components, patterns, form controls and layouts already created.

Only add:

- state variants
- conditional visibility
- data reuse
- branch logic
- interaction links
- adaptive behavior
- warning states
- edit behavior
- current → proposed variants
- consistency behavior

where required.

============================================================
2. PURPOSE OF THIS PASS
============================================================

The current E03–E05 flow must behave conceptually as:

E03
CREATE PROJECT
        ↓
capture project identity + project type

E04
BASIC REQUIREMENTS
        ↓
capture lightweight high-level facts

E05
ADAPTIVE BUSINESS DISCOVERY
        ↓
reuse E03/E04 data
        ↓
ask ONLY relevant follow-up questions
        ↓
continuously build Business DNA

The system must NOT behave like:

FORM 1
        ↓
FORM 2
        ↓
FORM 3
        ↓
re-ask the same facts repeatedly

Instead it must behave like:

ANSWER
        ↓
UPDATE BUSINESS DNA
        ↓
RE-EVALUATE QUESTION STATES
        ↓
ACTIVATE / DEACTIVATE BRANCHES
        ↓
SHOW NEXT RELEVANT QUESTION

============================================================
3. ONE SHARED BUSINESS DNA
============================================================

Treat E03, E04 and E05 as writing into ONE logical Business DNA.

Do NOT treat each screen as owning separate copies of the same field.

Example:

E03 captures:

Business / Project Name

Therefore:

E05 Business Identity must read that SAME value.

Not:

E03.BusinessName
and
E05.BusinessName

as independent values.

Similarly:

E04 Water Required
        ↓
same Business DNA field
        ↓
E05 reads that state

E05 must NOT create another unrelated Water Required field.

============================================================
4. DATA REUSE PRIORITY
============================================================

Use this conceptual field precedence:

CURRENT CONFIRMED BUSINESS DNA
        ↓
previously entered E03/E04/E05 value
        ↓
prefill / reuse
        ↓
allow Edit
        ↓
only ask if missing / unknown / needs clarification

Never automatically replace a known value with a blank field.

============================================================
5. E03 DATA THAT MUST CARRY FORWARD
============================================================

E03 already contains:

- Business / Project Name
- Project Type
- Optional Description
- Selected Existing Business / Project
  where Expansion or Modification applies

These values must be available throughout E04/E05.

Business / Project Name:
- reuse
- show as confirmed/editable
- never ask user to type it again

Project Type:
- reuse
- never ask again

Selected Existing Business:
- reuse for Expansion / Modification
- load Current Business DNA from that business context

============================================================
6. E04 PRE-SEED DATA THAT MUST CARRY INTO E05
============================================================

E04 captures high-level values such as:

- Need land?
- Land / possession status
- MIDC / Non-MIDC / Not Sure
- Construction / existing premises / not sure
- Water requirement
- Power requirement
- Primary Business Nature
- Existing Approvals

Every one of these must be treated as a PRE-SEEDED Business DNA value.

E05 must NEVER blindly re-ask them.

============================================================
7. E04 → E05 BEHAVIOR
============================================================

Example:

E04:

WATER REQUIRED
Yes

Then E05 Water Section must immediately show:

WATER REQUIREMENT
Yes

Source:
Basic Requirements

[Edit]

and continue directly to:

DAILY WATER REQUIREMENT
[____] KL/day

PRIMARY WATER SOURCE
[________]

Do NOT show:

“Will the project require water?”

again.

============================================================
8. APPLY DATA REUSE TO ALL THESE FIELDS
============================================================

Apply this behavior to:

MIDC
Land Need
Land / Possession Status
Construction / Premises
Water
Power
Primary Business Nature
Existing Approvals

Known answer:

REUSE
+
SHOW VALUE
+
ALLOW EDIT
+
ASK FOLLOW-UP

Unknown answer:

ASK / CLARIFY
+
ALLOW NOT SURE

============================================================
9. REUSED VALUE COMPONENT
============================================================

Reuse or create a lightweight reusable state using the existing component style.

Example:

POWER REQUIREMENT

Yes

✓ Captured in Basic Requirements

[Edit]

Do not create large banners.

Do not visually over-emphasise provenance.

The objective is simply:

“EKATMA remembers what you already told us.”

============================================================
10. EDITING A PRE-SEEDED VALUE
============================================================

Clicking Edit should reveal the original field control.

Example:

POWER REQUIREMENT
Yes

[Edit]

        ↓

○ Yes
○ No
○ Not Sure

When the answer changes:

UPDATE THE SAME BUSINESS DNA FIELD

Then immediately:

RE-EVALUATE DEPENDENT BRANCHES.

============================================================
11. EXAMPLE — EDIT POWER
============================================================

Current:

Power Required = Yes

Visible:
Connected Load
LT / HT

User changes:

Power Required = No

Then:

Connected Load
LT / HT
HT Infrastructure

must stop being required.

Conceptually:

POWER DETAILS
→ NOT_APPLICABLE

Do not leave validation errors behind.

============================================================
12. ADAPTIVE QUESTION / BRANCH STATE MODEL
============================================================

Support conceptually:

NOT_VISIBLE
VISIBLE
REQUIRED
ANSWERED
VALIDATED
CONFIRMED
SKIPPED
NOT_APPLICABLE
NEEDS_REVIEW

These are internal adaptive/question states.

Do NOT display all of these words to the entrepreneur.

They control UI behavior.

============================================================
13. STATE MEANING
============================================================

NOT_VISIBLE

Question is not currently relevant and should not appear.

------------------------------------------------------------

VISIBLE

Question is relevant and currently displayed.

------------------------------------------------------------

REQUIRED

Visible question must be answered before that branch can proceed.

------------------------------------------------------------

ANSWERED

A value exists.

------------------------------------------------------------

VALIDATED

The value passes objective validation.

------------------------------------------------------------

CONFIRMED

User has accepted/reviewed a reused or completed value.

------------------------------------------------------------

SKIPPED

Question was deliberately bypassed by allowed user action.

------------------------------------------------------------

NOT_APPLICABLE

Current Business DNA makes this question/branch irrelevant.

------------------------------------------------------------

NEEDS_REVIEW

Data contradiction or ambiguity requires review.

============================================================
14. NOT_APPLICABLE IS NOT MISSING
============================================================

NON-NEGOTIABLE.

If:

Power = No

then:

Connected Load
Supply Type
HT Details

must NOT appear as:

Incomplete
Missing
Required

They are:

NOT_APPLICABLE

Similarly:

Manufacturing = No
→ Production branch may be NOT_APPLICABLE

MIDC = No
→ MIDC plot branch NOT_APPLICABLE

Land Possession = Yes
→ Land Acquisition branch NOT_APPLICABLE

Wastewater = No
→ Wastewater details NOT_APPLICABLE

Boiler = No
→ Boiler details NOT_APPLICABLE

============================================================
15. DO NOT DELETE SKIPPED BRANCHES CONCEPTUALLY
============================================================

When a branch becomes irrelevant:

do not conceptually erase the branch from the model.

Preserve:

Branch
State = NOT_APPLICABLE

Reason:
current Business DNA

Example:

MIDC Estate

state:
NOT_APPLICABLE

because:

MIDC = No

This is important for later:

- Business Profile Review
- Department processing
- change detection
- audit/history
- expansion
- regulatory re-evaluation

============================================================
16. DATA VERIFICATION STATE IS SEPARATE
============================================================

Adaptive question state and data verification state are TWO DIFFERENT THINGS.

Do not combine them.

Verification states may conceptually include:

SELF_DECLARED
USER_CONFIRMED
SYSTEM_VERIFIED
DEPARTMENT_VERIFIED
NEEDS_VERIFICATION
INVALID
EXPIRED

============================================================
17. EXAMPLE OF TWO-DIMENSIONAL STATE
============================================================

Example:

Primary Business Nature

Question State:
CONFIRMED

Verification State:
SELF_DECLARED

This means:

The entrepreneur has confirmed the answer,
but the value has not been externally verified.

Another example:

MIDC Plot Area

Question State:
CONFIRMED

Verification State:
DEPARTMENT_VERIFIED

Both dimensions must be able to coexist.

============================================================
18. NEVER CREATE ONE GENERIC STATUS FIELD
============================================================

Do NOT create:

Status:
Confirmed

and attempt to use it for:

question completion
+
verification
+
approval
+
regulatory applicability

These are separate concepts.

============================================================
19. ADAPTIVE BRANCH DEMONSTRATION REQUIREMENT
============================================================

Create prototype/component variants demonstrating the adaptive behavior below.

Do not build completely separate duplicated screen sets.

Use variants and state changes where possible.

============================================================
20. DEMO A — MANUFACTURING VS SERVICES
============================================================

MANUFACTURING:

Primary Business Nature
Manufacturing

        ↓

Industry
Activities
Products
Process
Production Capacity
Shifts
Operating Hours

may become relevant.

------------------------------------------------------------

SERVICES:

Primary Business Nature
Services

        ↓

Industry
Activities
Services

Manufacturing Process
Production Capacity
Manufacturing Shifts

remain hidden / NOT_APPLICABLE unless another activity activates them.

============================================================
21. DEMO B — MIDC YES / NO / NOT SURE
============================================================

MIDC = YES

show:

MIDC Estate
Plot Number
Plot Area
Allotment Status

------------------------------------------------------------

MIDC = NO

MIDC-specific branch
→ NOT_APPLICABLE

continue Non-MIDC route.

------------------------------------------------------------

MIDC = NOT SURE

show:

Needs Verification

Use project location + land details later.

Do not force a guess.

============================================================
22. DEMO C — LAND POSSESSION
============================================================

LAND POSSESSION = RECEIVED

        ↓

Acquisition branch
→ NOT_APPLICABLE

Do not ask:
Preferred Land Route
Acquisition Status

------------------------------------------------------------

LAND POSSESSION = NO

        ↓

Preferred Land Route appears.

------------------------------------------------------------

IN PROGRESS

        ↓

Current Acquisition / Allotment Status appears.

============================================================
23. DEMO D — CONSTRUCTION
============================================================

NEW CONSTRUCTION

        ↓

Building details active:
Built-up Area
Floors
Height
Occupancy
Construction Status

------------------------------------------------------------

EXISTING PREMISES

        ↓

New Construction branch skipped.

Only relevant existing-building details appear.

------------------------------------------------------------

MODIFY EXISTING

        ↓

Current → Proposed building data.

============================================================
24. DEMO E — HT POWER
============================================================

Power = Yes

        ↓

Connected Load
LT / HT

If:

HT

        ↓

HT Connection
Dedicated Substation
Both
Not Sure

If:

LT

HT branch
→ NOT_APPLICABLE

============================================================
25. DEMO F — WATER SOURCE
============================================================

Water = Yes

        ↓

KL/day
Source

MIDC Supply
→ MIDC water applicability route later

Groundwater
→ groundwater applicability route later

Municipal
→ local authority route later

Other
→ relevant configurable route

Not Decided
→ Needs Verification

Do not show final approval.

============================================================
26. DEMO G — WASTEWATER
============================================================

Wastewater = Yes

        ↓

Domestic
Industrial
Both

Industrial
        ↓
Quantity
Treatment Planned
Treatment System
Treatment Capacity

Wastewater = No

        ↓

Wastewater Details
→ NOT_APPLICABLE

============================================================
27. DEMO H — AIR EMISSIONS
============================================================

Air Emissions = Yes

        ↓

Boiler
Furnace
DG Set
Process Emission
Chemical Process
Other

Air Emissions = No

        ↓

Emission Detail Branch
→ NOT_APPLICABLE

============================================================
28. DEMO I — HAZARDOUS MATERIAL
============================================================

Hazardous Material = Yes

        ↓

Material Inventory
Purpose
Quantity
Unit
Storage
Hazard Type

Hazardous Material = No

        ↓

Inventory branch
→ NOT_APPLICABLE

============================================================
29. DEMO J — HAZARDOUS WASTE
============================================================

Hazardous Waste = Yes

        ↓

Waste Type
Quantity
Unit
Storage
Treatment / Disposal

Hazardous Waste = No

        ↓

Waste Detail Branch
→ NOT_APPLICABLE

============================================================
30. DEMO K — ENVIRONMENTAL TRIGGER
============================================================

YES

        ↓

Show factual environmental characteristics.

------------------------------------------------------------

NO

        ↓

Do not force environmental follow-ups unless another Business DNA rule
requires clarification.

------------------------------------------------------------

UNKNOWN

        ↓

Show factual characteristics
+
Needs Verification

Do not force entrepreneur to make legal interpretation.

============================================================
31. DEMO L — BOILER
============================================================

Boiler = Yes

        ↓

Capacity
Fuel
Pressure
Number of Boilers

Boiler = No

        ↓

Boiler Detail Branch
→ NOT_APPLICABLE

============================================================
32. DEMO M — PRESSURE VESSEL
============================================================

Pressure Vessel = Yes

        ↓

Equipment Type
Capacity
Operating Pressure

No

        ↓

Detail Branch
→ NOT_APPLICABLE

Not Sure

        ↓

Needs Verification

============================================================
33. DEMO N — DANGEROUS MACHINERY
============================================================

Yes

        ↓

Machinery Type
Number
Capacity

No

        ↓

Details
→ NOT_APPLICABLE

Not Sure

        ↓

Needs Verification

============================================================
34. DEMO O — WAREHOUSE
============================================================

Warehouse = Yes

        ↓

Area
Material Stored
Hazardous / Flammable

Warehouse = No

        ↓

Warehouse Detail Branch
→ NOT_APPLICABLE

============================================================
35. DEMO P — IMPORT / EXPORT
============================================================

IMPORT

        ↓

Imported Inputs

EXPORT

        ↓

Exported Products

BOTH

        ↓

Both branches active

NEITHER

        ↓

Import/Export detail branches
→ NOT_APPLICABLE

============================================================
36. DEMO Q — EXISTING APPROVALS
============================================================

Reuse E04 answer.

YES

        ↓

Existing Approval rows appear.

NO

        ↓

Approval detail rows
→ NOT_APPLICABLE

NOT SURE

        ↓

Needs Verification / Needs Review

============================================================
37. DEMO R — EXISTING APPLICATIONS
============================================================

YES

        ↓

Department
Service
Application ID
Submission Date
Current Status

NO

        ↓

Application detail rows
→ NOT_APPLICABLE

============================================================
38. “I AM NOT SURE” IS A VALID STATE
============================================================

NON-NEGOTIABLE.

Do not force entrepreneur to guess.

When user selects:

I AM NOT SURE
or
NOT SURE
or
UNKNOWN
or
NOT DECIDED

the flow should:

STORE UNCERTAINTY
        ↓
COLLECT ADDITIONAL FACTUAL VARIABLES
        ↓
MARK REGULATORY INTERPRETATION
AS NEEDS VERIFICATION
        ↓
CONTINUE BUSINESS DISCOVERY

============================================================
39. DO NOT CONVERT UNKNOWN INTO NO
============================================================

Not Sure is not equivalent to:

No

Example:

MIDC = Not Sure

must not become:

MIDC = No

Environmental Trigger = Unknown

must not become:

Environmental Trigger = No

============================================================
40. UNKNOWN MAY ACTIVATE FACTUAL CLARIFICATION
============================================================

Example:

Classification = Not Sure

later collect:

Investment
Employment
Sector

Then rules may derive a candidate classification.

Do not force the entrepreneur to decide classification.

============================================================
41. EXPANSION / MODIFICATION — CORE BEHAVIOR
============================================================

If E03 Project Type is:

Expansion
or
Modification / Diversification

do NOT run the entrepreneur through a completely empty new-business questionnaire.

Instead:

SELECT EXISTING BUSINESS
        ↓
LOAD CURRENT BUSINESS DNA
        ↓
SHOW CURRENT PROFILE CONTEXT
        ↓
ASK:
WHAT ARE YOU CHANGING?
        ↓
ACTIVATE ONLY RELEVANT CHANGE AREAS
        ↓
BUILD PROPOSED BUSINESS DNA
        ↓
LATER:
COMPARE CURRENT vs PROPOSED
        ↓
REGULATORY DELTA ANALYSIS

============================================================
42. “WHAT ARE YOU CHANGING?” STEP
============================================================

For Expansion / Modification, add a reusable adaptive change-selection state
using the existing E05 visual system.

Question:

WHAT ARE YOU CHANGING IN THIS PROJECT?

Multi-select:

☐ Production
☐ Building
☐ Machinery
☐ Boiler
☐ Chemicals / Hazardous Materials
☐ Product
☐ Workforce
☐ Land
☐ Manufacturing Process
☐ Other

Allow multiple selections.

============================================================
43. CHANGE CATEGORY CONTROLS BRANCH VISIBILITY
============================================================

Example:

User selects:

Production
+
Workforce

Then:

show only the relevant proposed-value fields for:

Production
Workforce

Do not force the entrepreneur to reconfirm every unchanged business field.

============================================================
44. CURRENT → PROPOSED PATTERN
============================================================

Use a reusable Current → Proposed component.

Example:

WATER REQUIREMENT

CURRENT
50 KL/day

PROPOSED
150 KL/day

Change:
+100 KL/day

Do not overwrite current value.

============================================================
45. OTHER CURRENT → PROPOSED EXAMPLES
============================================================

PRODUCTION

Current:
100 tonnes/month

Proposed:
180 tonnes/month

------------------------------------------------------------

WORKFORCE

Current:
150

Proposed:
230

------------------------------------------------------------

BUILDING

Current Built-Up:
2,000 sq.m

Proposed:
3,200 sq.m

------------------------------------------------------------

BOILER

Current:
1

Proposed:
2

------------------------------------------------------------

LAND

Current:
4,800 sq.m

Proposed:
7,000 sq.m

============================================================
46. TWO BUSINESS DNA VERSIONS FOR CHANGE PROJECTS
============================================================

Conceptually preserve:

CURRENT BUSINESS DNA

and

PROPOSED BUSINESS DNA

Do not turn the proposed values into immediate replacements of current data.

============================================================
47. CHANGE DETECTION
============================================================

Prototype a reusable:

BUSINESS PROFILE CHANGE DETECTED

state.

Example:

Water Requirement

50 KL/day
        ↓
150 KL/day

Show a subtle notification:

“Business profile change detected.”

Do not make this an error.

============================================================
48. WHAT HAPPENS AFTER CHANGE DETECTION
============================================================

Conceptually:

OLD VALUE
        ↓
NEW VALUE
        ↓
UPDATE PROPOSED BUSINESS DNA
        ↓
RE-EVALUATE RULES
        ↓
COMPARE OLD JOURNEY vs NEW JOURNEY

Potential impact categories later:

- New requirement
- Removed requirement
- Changed document requirement
- Changed dependency
- Changed compliance obligation
- Existing application impact
- Existing approval impact

Do not generate final results in E05.

============================================================
49. ACTIVE APPLICATION / APPROVAL WARNING
============================================================

If the field being changed is already used by:

- an active application
- an approval
- an inspection
- an active compliance obligation

show a warning BEFORE confirming the change.

Example:

“This information is currently used by an active application.
Changing it may affect your regulatory journey.”

Actions:

Cancel

Confirm Change

Do not silently replace the value.

============================================================
50. DO NOT BLOCK ALL CHANGES
============================================================

The warning informs the entrepreneur.

Do not automatically prevent editing unless a later configured business rule
requires it.

============================================================
51. PRESERVE OLD AND NEW VALUES
============================================================

Conceptually store:

Previous Value
New Value
Change Timestamp
Source
Business DNA Version

Do not implement a full audit-history screen now.

============================================================
52. RULE RE-EVALUATION FEEDBACK
============================================================

After a meaningful change, subtle feedback may say:

“Profile updated. Relevant requirements will be re-evaluated.”

Do NOT immediately say:

“You now require approval X.”

The actual regulatory journey comes later.

============================================================
53. PROFILE COMPLETION MODEL — NO ARBITRARY PERCENTAGE
============================================================

Do NOT use:

82% Complete
95% Complete
100% Complete

as the primary completion model.

The adaptive questionnaire length changes depending on Business DNA.

============================================================
54. USER-FACING PROFILE GROUPS
============================================================

Instead prepare completion groups such as:

NEEDS YOUR INPUT

NOT APPLICABLE

VERIFIED

SELF-DECLARED

NEEDS VERIFICATION

These are user-facing groupings.

============================================================
55. IMPORTANT — GROUPS ARE DERIVED
============================================================

These user-facing groups are DERIVED from:

Adaptive Question State
+
Verification State

They are NOT one underlying status field.

============================================================
56. EXAMPLE — NEEDS YOUR INPUT
============================================================

Question State:
REQUIRED

No valid answer exists

        ↓

User-facing group:

Needs Your Input

============================================================
57. EXAMPLE — NOT APPLICABLE
============================================================

Question State:
NOT_APPLICABLE

        ↓

User-facing group:

Not Applicable

Verification state may be irrelevant because no answer is required.

============================================================
58. EXAMPLE — SELF-DECLARED
============================================================

Question State:
CONFIRMED

Verification State:
SELF_DECLARED

        ↓

User-facing group:

Self-declared

============================================================
59. EXAMPLE — VERIFIED
============================================================

Question State:
CONFIRMED

Verification State:
SYSTEM_VERIFIED
or
DEPARTMENT_VERIFIED

        ↓

User-facing group:

Verified

============================================================
60. EXAMPLE — NEEDS VERIFICATION
============================================================

Question State:
ANSWERED / CONFIRMED

Verification State:
NEEDS_VERIFICATION

        ↓

User-facing group:

Needs Verification

============================================================
61. PREPARE E05 FOR LATER BUSINESS PROFILE REVIEW
============================================================

Do not build E06 yet.

But ensure E05 data can later be grouped by:

Needs Your Input
Not Applicable
Verified
Self-declared
Needs Verification

This will become important in E06.

============================================================
62. BUSINESS PROFILE OUTPUT CONTRACT
============================================================

Once Business Profile Review is eventually confirmed,
the system must conceptually generate:

1. BUSINESS DNA

2. REGULATORY APPLICABILITY

Possible states:
Applicable
Conditional
Not Applicable
Needs Verification

3. PERSONALISED REGULATORY JOURNEY

4. INCENTIVE JOURNEY

============================================================
63. BUSINESS DNA OUTPUT
============================================================

Business DNA must represent the structured factual profile built across
E03–E05.

It is NOT just a PDF form.

It is structured data used across the platform.

============================================================
64. REGULATORY APPLICABILITY
============================================================

The Rule Engine later evaluates:

Business DNA
+
Regulatory Rules
+
Department Rules
+
Service Rules
+
Dependencies

to determine:

Applicable
Conditional
Not Applicable
Needs Verification

Do not let the entrepreneur manually select these states.

============================================================
65. PERSONALISED REGULATORY JOURNEY
============================================================

Later result may contain:

Department
Service
Stage
Dependency
Status
Required Action
Documents
SLA
Inspection
Compliance

Do NOT build this journey during this behavior pass.

============================================================
66. INCENTIVE JOURNEY
============================================================

The same Business DNA later feeds the Incentive Engine.

Do not duplicate business data just for incentives.

============================================================
67. ENVIRONMENTAL / POLLUTION CLASSIFICATION
============================================================

Where validated regulatory rules produce an environmental or pollution-related
classification:

the classification may later appear as a derived Business Profile output.

Do not ask the entrepreneur to manually classify themselves unless a
specific factual question is genuinely required.

============================================================
68. P0 / P1 / P2 — INTERNAL TEAM PRIORITY ONLY
============================================================

Use the following internally when organising component priority.

DO NOT display P0 / P1 / P2 terminology to the entrepreneur.

============================================================
69. P0 — CORE
============================================================

Ensure these flows work first:

- Project Type
- Industry
- Activity
- Products
- Project Stage
- Location
- MIDC
- Land Possession / Type
- Investment
- Employment
- Manufacturing
- Production
- Construction
- Building Area
- Power
- Water
- Wastewater
- Air Emissions
- Hazardous Material
- Hazardous Waste
- Boiler
- Dangerous Machinery
- Existing Approvals

These are the essential prototype paths.

============================================================
70. P1 — IMPORTANT CONDITIONAL
============================================================

Then ensure these work:

- HT Power
- Pressure Vessel
- Storage
- Warehouse
- Import / Export
- Logistics
- Environmental Trigger
- Agricultural Land
- Land-Use State
- Existing Applications
- Incentive Attributes

============================================================
71. P2 — ADVANCED
============================================================

Reserve architecture for:

- Detailed chemical data
- Detailed emissions data
- Detailed waste data
- Detailed process parameters
- Detailed machinery data
- Detailed building data
- Sector-Specific Packs
- OCR / Extraction

Do not block P0/P1 completion because a P2 feature is not implemented.

============================================================
72. SECTOR-SPECIFIC PACK ARCHITECTURE
============================================================

Preserve this architecture:

COMMON BUSINESS QUESTIONS
        +
SECTOR PACK
        +
CONDITIONAL FLAGS

Example:

COMMON QUESTIONS
Location
Land
Investment
Employment
Utilities
Building

        +

PHARMACEUTICAL PACK
future detailed pharma questions

        +

CONDITIONAL FLAGS
Chemical Processing
Hazardous Material
Boiler
Wastewater
etc.

============================================================
73. SECTOR PACKS ARE P2 EXTENSIONS
============================================================

Sector packs must plug into the existing E05 engine.

Do NOT create separate questionnaires that duplicate the common profile.

Example:

Pharma Sector Pack

must not ask again:

Project Location
Water
Power
Land
Employment

if these already exist.

============================================================
74. SECTOR PACK MUST NOT BLOCK CURRENT PROTOTYPE
============================================================

If the detailed sector pack is not yet built:

the entrepreneur must still be able to complete the P0/P1 Business Profile.

Show at most:

“Additional sector-specific information may be requested later.”

Do not stop the workflow.

============================================================
75. OCR / EXTRACTION SCOPE
============================================================

OCR / automatic extraction is FUTURE P2.

Do NOT make OCR required.

Do NOT redesign the questionnaire around OCR.

============================================================
76. CURRENT DOCUMENT BEHAVIOR
============================================================

The current flow must work with:

Manual structured answers
+
Manual document upload
+
Known reusable project data

without OCR.

============================================================
77. FUTURE OCR BEHAVIOR
============================================================

Later OCR may:

Upload document
        ↓
Extract candidate values
        ↓
Show extracted field
        ↓
User confirms / corrects
        ↓
Update Business DNA

OCR must never silently overwrite a Business DNA field.

============================================================
78. OCR VERIFICATION
============================================================

Future extracted values should not immediately become:

SYSTEM_VERIFIED

simply because OCR read them.

OCR is extraction, not legal verification.

Keep that architecture reserved.

============================================================
79. CROSS-FIELD CONSISTENCY PASS
============================================================

Add / preserve lightweight review behavior for contradictions such as:

MIDC = No
+
MIDC Land selected

Power = No
+
Connected Load exists

Water = No
+
Water Source exists

Wastewater = No
+
Industrial Effluent details exist

Boiler = No
+
Boiler emission source selected

Hazardous Material = No
+
Hazardous Material storage selected

Warehouse = No
+
Warehouse building flag selected

Import/Export = Neither
+
Exported Products entered

Existing Approvals = No
+
Approval records exist

============================================================
80. CONTRADICTION BEHAVIOR
============================================================

Do NOT silently fix these contradictions.

Do NOT reject the Business Profile automatically.

Show:

“Please review these answers.”

State conceptually:

NEEDS_REVIEW

Allow entrepreneur to edit.

============================================================
81. QUESTION VISIBILITY RECALCULATION
============================================================

Whenever a branch-driving answer changes:

recalculate:

- visible questions
- required questions
- Not Applicable questions
- consistency warnings
- downstream branches

============================================================
82. EXAMPLE — MANUFACTURING → SERVICES CHANGE
============================================================

Current:

Primary Business Nature
Manufacturing

Production Capacity exists.

User changes to:

Services

Then:

Production branch may become NOT_APPLICABLE

BUT:

do not silently destroy old values.

Preserve them conceptually in history/versioning.

============================================================
83. EXAMPLE — MIDC YES → NO
============================================================

Current:

MIDC = Yes

MIDC Estate = Taloja
Plot = A-42

User changes:

MIDC = No

Then:

MIDC details
→ inactive / NOT_APPLICABLE

Non-MIDC route
→ active

Preserve previous entered MIDC values conceptually.

============================================================
84. EXAMPLE — HAZARDOUS MATERIAL NO → YES
============================================================

Current:

Hazardous Material = No

User changes to:

Yes

Immediately activate:

Material Inventory
Quantity
Storage
Hazard Type

Do not require page reload conceptually.

============================================================
85. EXAMPLE — WASTEWATER YES → NO
============================================================

Current:

Wastewater = Yes

Industrial Effluent
ETP

User changes:

Wastewater = No

Then:

Wastewater detail branch
→ NOT_APPLICABLE

Remove current validation requirements.

Preserve prior data in version history conceptually.

============================================================
86. RESUME LATER STATE
============================================================

When entrepreneur leaves and returns:

restore:

- Business DNA values
- current questionnaire section
- branch visibility
- NOT_APPLICABLE states
- Not Sure states
- Needs Review warnings
- repeatable rows
- proposed changes where expansion/modification
- draft state

Do not recalculate from a blank form.

============================================================
87. SAVE BEHAVIOR
============================================================

Continue existing:

Draft Saved

behavior.

Avoid intrusive save modals.

============================================================
88. BACK NAVIGATION
============================================================

Back navigation must not reset branch data.

Example:

User completes Water
        ↓
moves to Wastewater
        ↓
Back
        ↓
Water values remain

============================================================
89. HIDDEN FIELD VALIDATION
============================================================

NON-NEGOTIABLE.

Never validate a currently hidden field.

If a question becomes NOT_APPLICABLE:

remove it from active validation.

============================================================
90. REPEATABLE DATA
============================================================

Repeatable items such as:

Products
Hazardous Materials
Hazardous Waste
Machinery
Boilers where detailed
Pressure Equipment
Storage
Existing Approvals
Existing Applications
Documents

must preserve item-level data.

Do not combine them into one giant textarea.

============================================================
91. BUSINESS DNA FIELD PROVENANCE
============================================================

Conceptually, important Business DNA fields must later support:

Value
Source
Verification State
Last Updated
Business DNA Version
Used By

Do not show all metadata during E05.

Preserve the architecture.

============================================================
92. SOURCE EXAMPLES
============================================================

Future sources may include:

Entrepreneur
Basic Requirements
Existing Business Profile
Uploaded Document
Government System
Department Verification

Do not create separate duplicate fields for different sources.

============================================================
93. DOWNSTREAM “USED BY” RELATIONSHIP
============================================================

A Business DNA field may later be used by:

- MIDC application
- MPCB application
- Fire application
- DISH application
- Boiler application
- Incentive evaluation
- Compliance obligation

This is why changing a value may require warning.

============================================================
94. ACTIVE USE WARNING COMPONENT
============================================================

Reserve a reusable warning state:

THIS INFORMATION IS CURRENTLY IN USE

Used by:
2 Active Applications
1 Existing Approval

Changing this value may affect your regulatory journey.

[Cancel]
[Confirm Change]

Do not create full downstream impact analysis yet.

============================================================
95. REGULATORY RULE ENGINE BOUNDARY
============================================================

The questionnaire collects facts.

The Rule Engine determines regulatory applicability.

The questionnaire must not become the legal rule engine itself.

============================================================
96. DO NOT ASK LEGAL-CONCLUSION QUESTIONS
============================================================

Avoid questions such as:

“Do you need Fire NOC?”

“Do you need MPCB?”

“Do you need Factory Licence?”

“Do you need Boiler Approval?”

“Do you need Environmental Clearance?”

Ask factual business characteristics instead.

============================================================
97. RAG BOUNDARY
============================================================

Do not add the full RAG Assistant during this pass.

RAG later:

- explains rules
- retrieves GRs
- retrieves clauses
- explains documents
- explains department queries
- explains regulatory changes

RAG does NOT control the adaptive state engine.

============================================================
98. RULE ENGINE VS RAG
============================================================

Keep these conceptually distinct:

BUSINESS DNA
        ↓
REGULATORY RULE ENGINE
        ↓
APPLICABILITY / JOURNEY

RAG
        ↓
EXPLANATION / RETRIEVAL / ASSISTANCE

Do not let RAG decide approval applicability.

============================================================
99. FRONTEND IMPLEMENTATION CONCEPT
============================================================

Even though this is currently Figma,
design state behavior so it can later map cleanly into React / Next.js.

Conceptually each question should be able to reference:

question_id

current_value

question_state

verification_state

source

show_if

required_if

activates

deactivates

depends_on

============================================================
100. DO NOT DISPLAY TECHNICAL METADATA
============================================================

Do not show:

question_id
show_if
required_if
Business DNA JSON

to users.

This is an implementation concept only.

============================================================
101. EXAMPLE STATE LOGIC
============================================================

Conceptual example:

Question:
water_required

Value:
YES

Question State:
CONFIRMED

Verification:
SELF_DECLARED

Activates:
water_quantity
water_source

Then:

water_source = MIDC

activates:
potential_midc_water_route

Do not visually expose this internal syntax.

============================================================
102. REUSABLE COMPONENT VARIANTS REQUIRED
============================================================

Without changing visual style, create/ensure variants for:

- Default Question
- Answered
- Confirmed Reused Answer
- Not Sure
- Conditional Follow-Up
- Hidden / inactive concept
- Not Applicable summary where useful
- Needs Review
- Needs Verification
- Edit Previous Answer
- Current → Proposed
- Change Detected
- Active Application Warning
- Consistency Warning
- Draft Saved

Use Auto Layout.

============================================================
103. NO UNNECESSARY NEW SCREENS
============================================================

Do NOT make one separate full frame for every logical state.

Prefer:

component variants
+
prototype interactions
+
a few representative demonstration frames

Keep the Figma file manageable.

============================================================
104. REPRESENTATIVE DEMO FRAMES
============================================================

Create only enough behavior/demo variants to prove:

1. Manufacturing path

2. Services path

3. MIDC Yes path

4. MIDC No path

5. MIDC Unknown path

6. Expansion / Modification Current → Proposed path

7. Change Detection warning

8. Not Applicable branch behavior

9. Needs Verification behavior

Do not duplicate the entire questionnaire for every case.

============================================================
105. TEAM PRIORITY BEHAVIOR
============================================================

Ensure P0 flows have the strongest prototype coverage.

P1 should have conditional states.

P2 should have architecture/component placeholders only.

Do not show:

P0
P1
P2

to users.

============================================================
106. P0 MUST WORK END-TO-END
============================================================

P0:

Project Type
Industry
Activity
Products
Stage
Location
MIDC
Land
Investment
Employment
Manufacturing
Production
Construction
Building Area
Power
Water
Wastewater
Emissions
Hazardous Material
Hazardous Waste
Boiler
Dangerous Machinery
Existing Approvals

These must demonstrate:

answer
→ branch
→ reuse
→ save
→ edit
→ re-evaluation

============================================================
107. P1 MUST BE CONDITIONALLY SUPPORTED
============================================================

P1:

HT Power
Pressure Vessel
Storage
Warehouse
Import / Export
Logistics
Environmental Trigger
Agricultural Land
Land-Use
Existing Applications
Incentive Attributes

These should demonstrate relevant conditional states.

============================================================
108. P2 MUST NOT BLOCK
============================================================

P2:

Detailed chemical/emission/waste/process/machinery/building data
Sector Packs
OCR / Extraction

These should remain extensible but optional.

============================================================
109. END-OF-E05 BEHAVIOR
============================================================

At the end of E05:

do NOT immediately generate the Regulatory Journey.

The current CTA remains:

REVIEW BUSINESS PROFILE

        ↓

E06 Placeholder

Do not build E06 in this prompt.

============================================================
110. BEFORE ALLOWING REVIEW
============================================================

The state engine should be able to determine whether there are:

Needs Your Input

Needs Review

Needs Verification

Not Applicable

Self-Declared

Verified

questions/data.

Do NOT require every Needs Verification field to become Verified before
the entrepreneur can proceed.

Some verification occurs later.

============================================================
111. BLOCKING VS NON-BLOCKING
============================================================

Blocking examples:

A REQUIRED visible question has no answer.

Objective validation failed.

------------------------------------------------------------

Non-blocking examples may include:

Not Sure where allowed

Self-Declared value

Needs Verification

Optional document missing

P2 sector pack not completed

OCR not used

============================================================
112. DO NOT MAKE VERIFICATION A PRECONDITION FOR DISCOVERY
============================================================

The entrepreneur may complete Business Discovery with self-declared data.

Department/System verification occurs later where relevant.

============================================================
113. FINAL BUSINESS PROFILE REVIEW HANDOFF
============================================================

Conceptually after this pass:

E03
Create Project
        ↓
E04
Pre-Seed
        ↓
E05
Adaptive Discovery
        ↓
ADAPTIVE STATE ENGINE HAS:
- Business DNA
- Question States
- Verification States
- Branch States
- Proposed Changes if applicable
        ↓
REVIEW BUSINESS PROFILE

============================================================
114. LATER OUTPUT AFTER REVIEW
============================================================

After Business Profile Review is confirmed later:

BUSINESS DNA
        ↓
REGULATORY APPLICABILITY
        ↓
PERSONALISED REGULATORY JOURNEY

and separately:

BUSINESS DNA
        ↓
INCENTIVE ENGINE
        ↓
INCENTIVE JOURNEY

============================================================
115. REGULATORY APPLICABILITY STATES
============================================================

Later regulatory output must support:

APPLICABLE

CONDITIONAL

NOT APPLICABLE

NEEDS VERIFICATION

These are regulatory applicability states.

They are NOT the same as questionnaire states.

============================================================
116. KEEP THE STATE DOMAINS SEPARATE
============================================================

Do not mix:

QUESTION STATE

with:

VERIFICATION STATE

with:

REGULATORY APPLICABILITY

with:

APPLICATION STATUS

with:

PAYMENT STATUS

with:

DEPARTMENT DECISION

These are separate dimensions.

This pass focuses only on:

Question State
+
Verification State
+
Business DNA change behavior

============================================================
117. NO DEPARTMENT AUTHORITY BEHAVIOR
============================================================

Do not let the Entrepreneur questionnaire:

- approve an application
- reject an application
- verify statutory compliance as a department
- issue certificate
- make department decision

That remains on Department side later.

============================================================
118. ACCESSIBILITY DURING CONDITIONAL CHANGES
============================================================

When branches appear/disappear:

preserve logical focus order.

Do not jump keyboard focus unpredictably.

When a new follow-up appears:
it should follow naturally after the triggering field.

Use text + icons for state feedback.

Do not use color alone.

============================================================
119. RESPONSIVE BEHAVIOR
============================================================

Adaptive branches must work on:

Desktop
Tablet
Mobile

Do not create an alternative state model for mobile.

On mobile:

follow-up questions stack directly below their parent branch.

============================================================
120. PERFORMANCE / CLARITY PRINCIPLE
============================================================

Even if many Business DNA fields exist internally,
the entrepreneur should feel:

“I am only being asked what is relevant to my project.”

Not:

“I am filling a 100-question government form.”

============================================================
121. FINAL BEHAVIOR TEST — NEW MANUFACTURING PROJECT
============================================================

Prototype/check:

E03:
New Project

E04:
MIDC = Yes
Construction = New
Water = Yes
Power = Yes
Business Nature = Manufacturing
Existing Approvals = No

Then E05 should:

reuse Manufacturing
reuse MIDC
reuse Construction
reuse Water
reuse Power
reuse Existing Approvals

and ask only follow-up details.

No repeated high-level questions.

============================================================
122. FINAL BEHAVIOR TEST — SERVICES PROJECT
============================================================

E04:

Primary Nature = Services

Then E05:

Industry
Service Activities
Services
Stage
Location
Building/Utilities where relevant

but:

Production
Manufacturing Process
Factory manufacturing branch

should not appear as missing requirements.

============================================================
123. FINAL BEHAVIOR TEST — MIDC UNKNOWN
============================================================

E04:

MIDC = Not Sure

Then E05:

do not force Yes/No.

Collect:

Location
Land Type
Land Details

and keep:

MIDC Status
Needs Verification

============================================================
124. FINAL BEHAVIOR TEST — LAND POSSESSION YES
============================================================

E04:

Land Possession = Received

Then E05:

do not show:

Preferred Land Route
Land Acquisition Status

Acquisition branch:
NOT_APPLICABLE

============================================================
125. FINAL BEHAVIOR TEST — EXPANSION
============================================================

E03:

Project Type = Expansion

Existing Business:
ABC Pharma Pvt Ltd

Then:

load current Business DNA

Ask:

What Are You Changing?

Selected:
Production
Water
Workforce

Only show Current → Proposed for those areas.

Do not rebuild the complete business profile.

============================================================
126. FINAL BEHAVIOR TEST — CHANGE DETECTION
============================================================

Current Water:
50 KL/day

Proposed:
150 KL/day

Show:

Business profile change detected

If used by active application:

show impact warning before confirmation.

After confirmation:

Profile updated
Relevant requirements will be re-evaluated

Do not show final new approvals yet.

============================================================
127. FINAL BEHAVIOR TEST — NOT APPLICABLE
============================================================

Boiler = No

Pressure Vessel = No

Warehouse = No

These detail branches must not appear as:

Missing Information

They should be absent from active questioning and conceptually stored as
NOT_APPLICABLE.

============================================================
128. FINAL BEHAVIOR TEST — UNKNOWN
============================================================

Environmental Trigger:
I don't know

Then:

allow factual environmental characteristic selection

preserve uncertainty

continue workflow

do not force legal interpretation.

============================================================
129. FINAL QUALITY CHECK
============================================================

Before completing this behavior pass verify:

[ ] No completed screen was redesigned

[ ] No new visual language introduced

[ ] E03/E04/E05 use one logical Business DNA

[ ] E03 Business / Project Name reused everywhere

[ ] Project Type reused

[ ] E04 MIDC reused

[ ] E04 land / possession reused

[ ] E04 construction reused

[ ] E04 water reused

[ ] E04 power reused

[ ] E04 Primary Business Nature reused

[ ] E04 Existing Approvals reused

[ ] Known answers are not asked again

[ ] Edit updates same underlying field

[ ] Branch visibility changes after edit

[ ] Hidden fields are not validated

[ ] NOT_APPLICABLE is preserved

[ ] Not Sure is supported

[ ] Needs Verification is distinct from Not Sure UI

[ ] Question State exists conceptually

[ ] Verification State exists separately

[ ] No single generic Status field merges both

[ ] Manufacturing vs Services demo works

[ ] MIDC Yes / No / Unknown demo works

[ ] Land-possession acquisition skip works

[ ] Construction branching works

[ ] HT branch works

[ ] Water-source branching works

[ ] Wastewater branching works

[ ] Emissions branching works

[ ] Hazardous Material branching works

[ ] Hazardous Waste branching works

[ ] Environmental trigger branching works

[ ] Boiler branching works

[ ] Pressure Vessel branching works

[ ] Dangerous Machinery branching works

[ ] Warehouse branching works

[ ] Import / Export branching works

[ ] Existing Approvals branching works

[ ] Existing Applications branching works

[ ] Expansion / Modification does not rebuild profile

[ ] What Are You Changing? exists for change projects

[ ] Current → Proposed component exists

[ ] Proposed Business DNA preserved separately

[ ] Business Profile Change Detected state exists

[ ] Active Application / Approval warning state exists

[ ] Old values are not silently overwritten

[ ] Profile completion does not rely on arbitrary %

[ ] Needs Your Input group supported

[ ] Not Applicable group supported

[ ] Self-declared group supported

[ ] Verified group supported

[ ] Needs Verification group supported

[ ] These groups are derived, not a single status

[ ] P0 flows work strongly

[ ] P1 conditional architecture works

[ ] P2 does not block completion

[ ] Sector Pack architecture reserved

[ ] OCR is optional/future

[ ] OCR is not required for Business Discovery

[ ] E06 has NOT been created

[ ] Regulatory Journey has NOT been generated yet

============================================================
130. FINAL EXPECTED SYSTEM BEHAVIOR
============================================================

The finished E03–E05 experience should behave as:

CREATE PROJECT
        ↓
PRE-SEED KNOWN FACTS
        ↓
START ADAPTIVE DISCOVERY
        ↓
READ EXISTING BUSINESS DNA
        ↓
ASK ONLY RELEVANT QUESTIONS
        ↓
SAVE ANSWER
        ↓
UPDATE BUSINESS DNA
        ↓
RE-EVALUATE BRANCHES
        ↓
MARK IRRELEVANT BRANCHES NOT_APPLICABLE
        ↓
PRESERVE UNKNOWN AS NEEDS VERIFICATION
        ↓
CONTINUE UNTIL SUFFICIENT DISCOVERY IS COMPLETE

For Expansion / Modification:

LOAD CURRENT BUSINESS DNA
        ↓
WHAT ARE YOU CHANGING?
        ↓
CURRENT → PROPOSED
        ↓
PROPOSED BUSINESS DNA
        ↓
CHANGE DETECTION
        ↓
LATER REGULATORY DELTA ANALYSIS

============================================================
131. FINAL OUTPUT CONTRACT TO PRESERVE
============================================================

After Business Profile Review is eventually confirmed, the platform must be
capable of generating:

BUSINESS DNA

        +

REGULATORY APPLICABILITY
Applicable
Conditional
Not Applicable
Needs Verification

        +

PERSONALISED REGULATORY JOURNEY

        +

INCENTIVE JOURNEY

        +

DERIVED ENVIRONMENTAL / POLLUTION CLASSIFICATION
where validated regulatory rules produce one.

Do NOT generate these outputs in this prompt.

============================================================
FINAL INSTRUCTION
============================================================

Perform ONLY the Adaptive Business behavior pass across E03–E05.

Do not add a new visual style.

Do not rebuild existing screens.

Do not create E06.

Do not create the Regulatory Journey.

Do not create Department screens.

Do not create applications.

Make the existing E03–E05 prototype behave as one adaptive state engine with:

- pre-seeded answer reuse
- progressive disclosure
- branch activation/deactivation
- NOT_APPLICABLE handling
- Not Sure handling
- separate question and verification states
- Expansion / Modification Current → Proposed behavior
- Business DNA change detection
- active-use warnings
- derived profile-completion groups
- P0/P1/P2 implementation priority
- reusable future sector-pack architecture
- optional future OCR architecture

STOP after the behavior pass is complete.

Do not automatically proceed to Business Profile Review.