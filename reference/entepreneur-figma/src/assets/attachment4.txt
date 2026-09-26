Continue the EXISTING EKATMA Entrepreneur-side Figma implementation.

============================================================
EKATMA — ENTREPRENEUR SIDE
E05 — ADAPTIVE BUSINESS QUESTIONNAIRE
PART 2: MIDC + LAND DISCOVERY
============================================================

IMPORTANT:
Continue from the E05 Adaptive Business Questionnaire already created.

This prompt creates ONLY the next adaptive discovery portion covering:

1. MIDC branch
2. MIDC plot / allotment follow-up
3. Land possession branch
4. Land acquisition / allotment status
5. Land type
6. Private land details
7. Agricultural land conditional branch
8. Land-use / permission-check state
9. Land document availability

DO NOT create later E05 sections for:

- Investment
- Employment
- Production capacity
- Detailed manufacturing
- Building parameters
- Power / HT
- Water
- Wastewater
- Drainage
- Environment
- Environmental Clearance
- Air emissions
- Hazardous material
- Hazardous waste
- Boiler
- Pressure vessel
- Dangerous machinery
- Factory / DISH
- Fire discovery
- Storage
- Warehouse
- Import / Export details
- Logistics
- Existing approval details
- Existing applications
- Incentive attributes
- Documents Centre
- Business Profile Review
- Final Business DNA output
- Regulatory Journey
- Applications
- Department-side screens

Stop after the Land Document Availability section.

============================================================
1. PRESERVE EVERYTHING ALREADY COMPLETED
============================================================

Do NOT redesign, regenerate, restyle, rename, remove or overwrite:

- Public Landing
- Authentication
- Industrial Login
- OTP
- Registration
- Phase 0 components
- Header
- Footer
- Accessibility strip
- National Emblem
- Government of Maharashtra identity
- EKATMA identity
- Existing typography
- Existing colors
- Existing spacing
- Existing buttons
- Existing form components
- Existing breadcrumbs
- E02 — My Businesses
- E03 — Create Business / Project
- E04 — Basic Requirements
- E05 Part 1:
  • Project Classification
  • Business Identity
  • Primary Business Nature
  • Industry / Sector
  • Activities
  • Products / Services
  • Process
  • Project Stage
  • Project Location

This is a continuation of the SAME E05 adaptive flow.

Do not create a second questionnaire.

============================================================
2. ENTRY INTO THIS E05 SECTION
============================================================

Previous E05 section:

Project Location
        ↓
Continue
        ↓
THIS PROMPT
MIDC + LAND DISCOVERY

Show project context at the top.

Example:

PROJECT
ABC Pharma Manufacturing Unit

PROJECT TYPE
New Business / Project

LOCATION
Thane, Maharashtra

PROJECT STAGE
Pre-Establishment

Keep this compact.

============================================================
3. CORE RULE — DO NOT RE-ASK E04 QUESTIONS
============================================================

E04 already captured high-level facts such as:

MIDC / Non-MIDC / Not Sure
Land need / land possession status

These answers are PRE-SEEDED BUSINESS DNA.

Therefore:

DO NOT ask again:

“Is the project located in MIDC?”

if E04 already has the answer.

DO NOT ask again:

“Do you already have land?”

if E04 already has the answer.

Instead display:

CURRENT MIDC STATUS
Yes

Captured in Basic Requirements
[Edit]

and:

CURRENT LAND STATUS
Possession received

Captured in Basic Requirements
[Edit]

Use those existing values to DRIVE THE BRANCH.

============================================================
4. WHEN A PRE-SEEDED QUESTION MAY BE ASKED
============================================================

Only ask the high-level MIDC / land-status question again if:

- E04 answer was missing
- E04 answer was Not Sure / Unknown
- user explicitly clicks Edit

Otherwise reuse the stored value.

Do not create duplicate fields.

============================================================
5. ADAPTIVE LOGIC MODEL
============================================================

The interaction must conceptually behave as:

CURRENT BUSINESS DNA STATE
        ↓
READ MIDC / LAND ANSWERS
        ↓
ACTIVATE RELEVANT BRANCH
        ↓
HIDE IRRELEVANT BRANCHES
        ↓
COLLECT ONLY REQUIRED FOLLOW-UP
        ↓
UPDATE BUSINESS DNA
        ↓
RE-EVALUATE FUTURE REGULATORY ROUTING

Do NOT display every land question at once.

============================================================
6. SECTION PROGRESS
============================================================

Continue the existing E05 section indicator.

Example:

Business Discovery · Land & Location Details

or, if retaining numbered sections:

Business Discovery · Section 7 of X

IMPORTANT:
Do not use a fixed percentage because later adaptive branches vary.

============================================================
7. MIDC CURRENT STATE
============================================================

Display the current MIDC state from E04.

Possible values:

YES
NO
NOT SURE / UNKNOWN

Example:

PROJECT LOCATION TYPE

MIDC
Yes

Source:
Basic Requirements

[Edit]

Do not unnecessarily use technical labels such as database state names.

============================================================
8. MIDC = YES BRANCH
============================================================

If:

MIDC = YES

activate the MIDC FOLLOW-UP branch.

Heading:

MIDC DETAILS

Supporting text:

“Provide the available MIDC land / plot information.”

Ask:

MIDC ESTATE

Searchable dropdown / autocomplete.

Example prototype values:
- TTC Industrial Area
- Taloja MIDC
- Ambernath MIDC
- Chakan MIDC
- Butibori MIDC
- Other

These are sample values only.

Do not imply this is a complete official list unless the actual dataset
is connected later.

============================================================
9. MIDC PLOT NUMBER
============================================================

Ask:

PLOT NUMBER

Input.

Example:
A-42

Keep optional/required behavior configurable based on allotment status.

Do not force plot number if the entrepreneur has only applied and no plot
has been allotted yet.

============================================================
10. MIDC PLOT AREA
============================================================

Ask:

PLOT AREA

Input + unit.

Default unit:

sq.m

Allow appropriate numeric input.

Do not invent validation thresholds.

============================================================
11. MIDC ALLOTMENT STATUS
============================================================

Ask:

WHAT IS THE CURRENT ALLOTMENT STATUS?

Options:

○ Not applied
○ Applied
○ Allotted
○ Possession received
○ Already registered

Use a clear single-select pattern.

============================================================
12. MIDC STATUS-DRIVEN FOLLOW-UP
============================================================

Use adaptive behavior.

NOT APPLIED
→ do not require Plot Number
→ do not require Possession Document

APPLIED
→ Plot Number may remain unavailable
→ keep application/allotment follow-up possible later

ALLOTTED
→ Plot Number / Area may be relevant

POSSESSION RECEIVED
→ Plot Number / Area relevant
→ possession context available

ALREADY REGISTERED
→ treat plot context as an existing MIDC property record where appropriate

Do not build MIDC application workflows yet.

This is only Business Discovery.

============================================================
13. MIDC = NO BRANCH
============================================================

If:

MIDC = NO

do NOT show:

- MIDC Estate
- MIDC Plot Number
- MIDC Allotment Status
- MIDC-specific plot details

Conceptually set the MIDC-specific branch to:

NOT_APPLICABLE

Do not visually show “missing MIDC information.”

Proceed directly into Non-MIDC / private land discovery.

============================================================
14. MIDC = UNKNOWN / NOT SURE BRANCH
============================================================

If:

MIDC = NOT SURE

preserve uncertainty.

Do NOT force a guess.

Show:

MIDC STATUS
Needs Verification

Supporting text:

“EKATMA will use the project location and land information to help
determine the applicable route.”

Do NOT automatically classify the project as MIDC or Non-MIDC
without configured rule/data support.

Proceed with relevant neutral land questions.

============================================================
15. EDIT MIDC ANSWER
============================================================

If user clicks Edit:

Allow:

○ Yes
○ No
○ Not Sure

Changing this answer should immediately update branch visibility.

Example:

YES → NO

should:

hide MIDC-specific details
mark MIDC-specific branch Not Applicable
retain previous values in version/history conceptually
not silently destroy previously entered information

For the Figma prototype, demonstrate branch switching visually.

============================================================
16. LAND POSSESSION CURRENT STATE
============================================================

Reuse E04 land-possession answer.

Possible current states:

- Yes, possession received
- Yes, possession pending
- No
- Acquisition / allotment in progress

Show:

CURRENT LAND STATUS

Possession received

Captured in Basic Requirements
[Edit]

Do not ask the same question again.

============================================================
17. LAND POSSESSION = YES, POSSESSION RECEIVED
============================================================

If:

LAND POSSESSION = YES, POSSESSION RECEIVED

then:

LAND ACQUISITION BRANCH
→ NOT_APPLICABLE

Do NOT ask:

- Preferred land acquisition route
- Application status for acquisition
- Negotiation status
- Allotment process status

because the land is already possessed.

Continue directly to:

LAND TYPE

This rule is critical.

============================================================
18. LAND POSSESSION = YES, POSSESSION PENDING
============================================================

If:

LAND IDENTIFIED / ALLOTTED BUT POSSESSION PENDING

show only relevant status/context.

Do not treat this as “No land.”

Allow current route context such as:

- MIDC allotment
- private purchase
- lease
- other

and possession pending status.

Do not make the entrepreneur restart land acquisition discovery.

============================================================
19. LAND POSSESSION = NO
============================================================

If:

LAND = NO

ask:

PREFERRED LAND ROUTE

Options:

○ MIDC
○ Private
○ Not decided

This is a planning preference.

It does NOT override the current project-location MIDC state unless the project
is still in a planning/acquisition stage.

Keep concepts distinct:

CURRENT PROJECT LOCATION STATE
versus
PREFERRED ACQUISITION ROUTE

============================================================
20. PREFERRED LAND ROUTE = MIDC
============================================================

If:

Preferred Land Route = MIDC

show a lightweight route indicator:

Preferred route:
MIDC industrial land

Do NOT build:

- land allotment application
- eligibility decision
- available plot search
- payment
- possession workflow

Those belong later in the personalised regulatory journey/service application.

============================================================
21. PREFERRED LAND ROUTE = PRIVATE
============================================================

If:

Preferred Land Route = Private

continue to private-land type / ownership discovery where relevant.

Do not assume agricultural or non-agricultural.

============================================================
22. PREFERRED LAND ROUTE = NOT DECIDED
============================================================

If:

Not Decided

allow continuation.

Do not produce an error.

Later rules/journey may show alternate routes.

============================================================
23. ACQUISITION / ALLOTMENT IN PROGRESS
============================================================

If E04 says:

Acquisition / allotment in progress

ask:

CURRENT STATUS

Options:

○ Application submitted
○ Negotiation / purchase
○ Allotment process
○ Other

If Other:

Describe Current Status
[________________]

Do not ask irrelevant acquisition questions after one route is established.

============================================================
24. LAND TYPE
============================================================

Heading:

LAND TYPE

Ask:

WHAT TYPE OF LAND IS INVOLVED?

Options:

○ MIDC / Industrial Estate Land
○ Private Non-Agricultural Land
○ Private Agricultural Land
○ Other
○ Not Sure

Do not assume the answer from ownership alone.

============================================================
25. LAND TYPE + MIDC CONSISTENCY
============================================================

Perform simple consistency behavior.

Example:

MIDC = YES
+
Land Type = MIDC / Industrial Estate
→ consistent

MIDC = NO
+
Land Type = MIDC / Industrial Estate
→ show a gentle consistency warning / review prompt

Do NOT automatically overwrite either field.

Message:

“These answers may need review.”

Allow user to edit.

Do not treat it as automatic rejection.

============================================================
26. LAND TYPE = MIDC / INDUSTRIAL ESTATE
============================================================

If:

Land Type = MIDC / Industrial Estate

and MIDC details were already captured:

reuse them.

Do not ask estate / plot again.

If MIDC status was Unknown:
this may help move the data into a Needs Verification path.

Do not automatically mark it verified solely from user selection.

============================================================
27. PRIVATE LAND BRANCH
============================================================

If Land Type is:

Private Non-Agricultural
or
Private Agricultural

show:

PRIVATE LAND DETAILS

============================================================
28. OWNERSHIP STATUS
============================================================

Ask:

OWNERSHIP STATUS

Options:

○ Owned
○ Leased
○ Being Purchased
○ Jointly Owned
○ Other

If Other:

Describe Ownership Arrangement
[________________]

============================================================
29. PRIVATE LAND — SURVEY / PLOT NUMBER
============================================================

Ask:

SURVEY / PLOT NUMBER

Input.

Allow appropriate text because land identifiers may contain:
- numbers
- letters
- separators

Do not enforce only numeric input.

============================================================
30. PRIVATE LAND — AREA
============================================================

Ask:

LAND AREA

Numeric input + unit.

Default:

sq.m

Allow later support for alternate source units if required.

Do not hard-code legal thresholds.

============================================================
31. PRIVATE LAND — LAND-USE CLASSIFICATION
============================================================

Ask:

CURRENT LAND-USE CLASSIFICATION

Use structured selector where data is available.

Possible prototype values:

- Industrial
- Commercial
- Residential
- Agricultural
- Other
- Not Sure

Do not claim a classification is legally verified unless sourced accordingly.

============================================================
32. PRIVATE LAND — POSSESSION
============================================================

Do not create a duplicate independent possession record if E04 already captured
possession.

Show:

POSSESSION STATUS

using the same underlying land-possession state.

Allow review/edit.

Do not create:

Possession = Yes here
and
Possession = No in E04

as separate unrelated values.

============================================================
33. PRIVATE NON-AGRICULTURAL BRANCH
============================================================

If:

Private Non-Agricultural Land

collect only relevant private-land details.

Do NOT show agricultural conversion / agricultural purchase questions.

Agricultural branch becomes:

NOT_APPLICABLE

============================================================
34. AGRICULTURAL LAND BRANCH
============================================================

If:

Private Agricultural Land

activate:

AGRICULTURAL LAND DETAILS

This is a conditional branch.

============================================================
35. AGRICULTURAL QUESTION 1
============================================================

Ask:

IS THE LAND INTENDED FOR INDUSTRIAL / BUSINESS USE?

Options:

○ Yes
○ No
○ Not Sure

If No:

Do not automatically reject the project.

Show:

“Additional land-use action may not be relevant until industrial/business
use is proposed.”

Keep future applicability configurable.

============================================================
36. AGRICULTURAL QUESTION 2
============================================================

If intended for industrial/business use = YES or NOT SURE:

ask:

DO YOU HAVE THE APPLICABLE LAND-USE PERMISSION?

Options:

○ Yes
○ No
○ Application in progress
○ Not Sure

Use generic wording.

Do NOT hard-code that a particular named permission always applies in every case.

Later regulatory rules determine exact route.

============================================================
37. LAND-USE PERMISSION STATE
============================================================

If:

YES
→ record permission available

NO
→ permission/action route may be needed later

APPLICATION IN PROGRESS
→ store pending state

NOT SURE
→ Needs Verification

Do not yet create a government application.

============================================================
38. AGRICULTURAL PURCHASE THRESHOLD QUESTION
============================================================

Ask:

IS THE PROPOSED PRIVATE AGRICULTURAL LAND PURCHASE ABOVE THE
APPLICABLE REGULATORY THRESHOLD?

Options:

○ Yes
○ No
○ Not Sure

IMPORTANT:

Do NOT display a numerical threshold in the frontend.

Do NOT invent acreage/hectare values.

Do NOT hard-code legal limits.

The exact threshold must come from configurable regulatory knowledge/rule data.

============================================================
39. THRESHOLD = YES
============================================================

If:

YES

activate:

PERMISSION CHECK REQUIRED

Display:

“Regulatory rule verification required.”

Possible state:

Permission Check
Needs Verification

Explain:

“Additional permission may apply depending on the current regulatory rule.”

Do not name an authority unless the configured rule identifies it.

============================================================
40. THRESHOLD = NOT SURE
============================================================

If:

NOT SURE

use the same neutral state:

“Regulatory rule verification required.”

Do NOT block Business Discovery solely because the entrepreneur is unsure.

Later:
rule data + land area + land type
may determine applicability.

============================================================
41. THRESHOLD = NO
============================================================

If:

NO

do not activate this specific threshold-triggered permission branch.

But do NOT claim:

“No land permission required.”

Other land-use or regulatory requirements may still apply.

Only mark the threshold-specific check as not triggered.

============================================================
42. BTAL / NA / LAND-USE ARCHITECTURE
============================================================

Reserve the architecture for configurable land-use routes such as:

- land-use conversion
- agricultural-use change
- BTAL-related route
- NA-related route
- other applicable permission

IMPORTANT:

Do NOT present these as universally mandatory.

The exact applicable node must come from regulatory rules.

The Figma should support them as configurable conditional requirements.

============================================================
43. REGULATORY VERIFICATION UX
============================================================

For uncertain land rules, use a reusable component such as:

REGULATORY VERIFICATION

Status:
Needs Verification

Reason:
“Applicability depends on land classification and current regulatory rule.”

Action later:
“EKATMA will verify during regulatory journey generation.”

Do not show a scary error state.

Do not imply rejection.

============================================================
44. LAND DOCUMENT AVAILABILITY
============================================================

Heading:

LAND DOCUMENTS

Supporting text:

“Tell us which land documents you already have.
You can upload and manage reusable documents later in the Document Centre.”

Show checkboxes:

☐ Sale Deed
☐ Lease Deed
☐ MIDC Allotment Document
☐ Possession Document
☐ Land Record
☐ Land-Use Permission
☐ Other

Allow:

☐ I do not have these yet

or equivalent if consistent with current UI.

============================================================
45. CONDITIONAL DOCUMENT VISIBILITY
============================================================

Do not show every document as required.

Examples:

Owned private land
→ Sale Deed may be relevant

Leased land
→ Lease Deed may be relevant

MIDC allotted plot
→ MIDC Allotment may be relevant

Possession received
→ Possession Document may be relevant

Agricultural land with permission
→ Land-Use Permission may be relevant

But show them as:

Available / Not Available / May Be Required

Do not present final document applicability until rules are evaluated.

============================================================
46. OPTIONAL UPLOAD HERE
============================================================

Document upload in this section is OPTIONAL.

If current Figma supports upload pattern, allow:

Upload Now

but also allow:

Add Later in Document Centre

The Central Document Centre remains the reusable master document repository.

Do not force multiple uploads.

============================================================
47. DO NOT BUILD DOCUMENT CENTRE
============================================================

Do NOT create:

- Universal Document Centre
- Document Detail page
- Used By view
- expiry dashboard
- version-management page

Those are later screens.

This step only records availability / optional upload.

============================================================
48. DOCUMENT REUSE CONCEPT
============================================================

Conceptually preserve:

UPLOAD ONCE
        ↓
CENTRAL DOCUMENT REPOSITORY
        ↓
REUSE ACROSS APPLICABLE SERVICES

Do not make entrepreneur upload the same land document separately for MIDC,
MPCB, Fire, DISH, etc.

============================================================
49. BRANCH STATE — LAND POSSESSION YES
============================================================

Critical state:

Land Possession = Yes

must result in:

LAND ACQUISITION BRANCH
= NOT_APPLICABLE

This means:

- do not ask preferred acquisition route
- do not ask acquisition application status
- do not show incomplete acquisition warnings

Continue with existing-land details only.

============================================================
50. BRANCH STATE — MIDC YES
============================================================

MIDC = YES

must result in:

MIDC FOLLOW-UP
= ACTIVE

Ask:

- MIDC Estate
- Plot Number where available
- Plot Area where available
- Allotment Status

Do not force an MIDC land-acquisition service if land is already validly
possessed and no acquisition service is required.

MIDC context can still later support:

- planning/building service
- water service
- drainage service
- other configured MIDC services

============================================================
51. BRANCH STATE — MIDC NO
============================================================

MIDC = NO

must result in:

MIDC-SPECIFIC LAND DETAILS
= NOT_APPLICABLE

Do not display them as:

Missing
Incomplete
Error

Continue with the relevant Non-MIDC/private land route.

============================================================
52. BRANCH STATE — MIDC UNKNOWN
============================================================

MIDC = UNKNOWN

must result in:

MIDC STATUS
= NEEDS VERIFICATION

Do not activate a definite MIDC service.

Do not declare Non-MIDC either.

Location + land details may assist later verification.

============================================================
53. BRANCH STATE — AGRICULTURAL YES
============================================================

Private Agricultural Land

must activate:

- Industrial / business use intent
- Land-use permission state
- Purchase threshold question
- permission-check state where required
- relevant document availability

Do not activate these for Non-Agricultural land.

============================================================
54. NOT_APPLICABLE MUST SURVIVE
============================================================

When a branch is skipped because it is irrelevant:

do not delete it conceptually.

Store:

NOT_APPLICABLE

Example:

MIDC = NO
→ MIDC Estate branch = NOT_APPLICABLE

Land Possession = YES
→ Acquisition route = NOT_APPLICABLE

Private Non-Agricultural
→ Agricultural permission branch = NOT_APPLICABLE

This is important because later Department screens must not treat skipped
branches as missing information.

============================================================
55. QUESTION STATE VS VERIFICATION STATE
============================================================

Keep separate:

QUESTION / BRANCH STATE

NOT_VISIBLE
VISIBLE
REQUIRED
ANSWERED
VALIDATED
CONFIRMED
SKIPPED
NOT_APPLICABLE
NEEDS_REVIEW

VERSUS

DATA VERIFICATION STATE

SELF_DECLARED
USER_CONFIRMED
SYSTEM_VERIFIED
DEPARTMENT_VERIFIED
NEEDS_VERIFICATION
INVALID
EXPIRED

Do not use the same badge/status field for both concepts.

User-facing UI can remain simple.

============================================================
56. DATA PROVENANCE FOR REUSED VALUES
============================================================

For reused E04 answers, show lightweight provenance.

Example:

MIDC
Yes

Source:
Basic Requirements

[Edit]

Land Possession
Possession received

Source:
Basic Requirements

[Edit]

Do not clutter every new field with provenance labels.

Use it mainly where reuse matters.

============================================================
57. CHANGE AN EARLIER ANSWER
============================================================

If user edits:

MIDC = Yes

to:

MIDC = No

perform conceptually:

OLD VALUE
Yes

NEW VALUE
No

        ↓

RE-EVALUATE CURRENT BRANCH

        ↓

MIDC details become inactive / NOT_APPLICABLE

        ↓

Non-MIDC route activated

Do not silently erase previously entered MIDC information.

Preserve it conceptually for audit/version history.

============================================================
58. CHANGE LAND POSSESSION ANSWER
============================================================

Example:

Land Possession:
No
        ↓
changed to
Possession Received

Then:

Preferred Land Route
Acquisition Status
etc.

must no longer remain required.

Set acquisition branch to:

NOT_APPLICABLE

Do not leave stale validation errors.

============================================================
59. SIMPLE CONSISTENCY WARNINGS
============================================================

Show gentle warnings for contradictions.

Examples:

MIDC = No
+
MIDC / Industrial Estate Land selected

or

Possession = Received
+
Allotment Status = Not Applied

Use:

“Please review these answers.”

Do NOT:

- auto-correct
- overwrite
- reject
- make legal conclusions

============================================================
60. DO NOT SHOW APPROVAL RESULTS
============================================================

This is still Business Discovery.

Do NOT display:

“You require MIDC Land Approval.”

“You require NA Permission.”

“You require BTAL Approval.”

“You are legally ineligible.”

“You require this NOC.”

Only gather facts and mark potential regulatory verification states.

============================================================
61. RULE ENGINE RELATIONSHIP
============================================================

Conceptually:

LAND DATA
+
PROJECT LOCATION
+
MIDC STATUS
+
LAND TYPE
+
POSSESSION
+
LAND-USE STATE
+
REGULATORY RULE DATA

        ↓

LATER REGULATORY ENGINE

        ↓

APPLICABLE / CONDITIONAL / NOT APPLICABLE / NEEDS VERIFICATION

Do not perform final regulatory journey generation yet.

============================================================
62. RECOMMENDED UI GROUPING
============================================================

Keep this E05 portion visually organised as:

--------------------------------
LAND LOCATION CONTEXT
--------------------------------

MIDC Status
MIDC Details if relevant

--------------------------------
LAND STATUS
--------------------------------

Possession / acquisition state
Preferred route if needed
Acquisition status if needed

--------------------------------
LAND TYPE
--------------------------------

MIDC / Private NA / Agricultural / Other

--------------------------------
LAND DETAILS
--------------------------------

Ownership
Survey / Plot
Area
Land-use

--------------------------------
AGRICULTURAL LAND
--------------------------------

Only when applicable

--------------------------------
LAND DOCUMENTS
--------------------------------

Availability / optional upload

Do not create one massive card containing everything.

============================================================
63. MIDC YES — EXAMPLE FLOW
============================================================

Prototype an example:

MIDC
Yes
(reused from E04)

        ↓

MIDC Estate
Taloja MIDC

Plot Number
A-42

Plot Area
4,800 sq.m

Allotment Status
Possession Received

        ↓

Land Possession
Possession Received
(reused from E04)

        ↓

Acquisition Route
NOT APPLICABLE

        ↓

Land Type
MIDC / Industrial Estate

        ↓

Documents Available
✓ MIDC Allotment
✓ Possession Document

============================================================
64. NON-MIDC PRIVATE LAND — EXAMPLE FLOW
============================================================

Prototype another state:

MIDC
No

        ↓

MIDC details hidden

        ↓

Land Possession
Possession Received

        ↓

Land Type
Private Non-Agricultural

        ↓

Ownership
Owned

Survey Number
124/3

Area
5,500 sq.m

Land-use Classification
Industrial

        ↓

Agricultural branch
NOT APPLICABLE

        ↓

Documents
✓ Sale Deed
✓ Land Record

============================================================
65. AGRICULTURAL LAND — EXAMPLE FLOW
============================================================

Prototype another conditional state:

MIDC
No

Land Type
Private Agricultural

        ↓

Intended for Industrial / Business Use?
Yes

        ↓

Applicable Land-Use Permission?
Application in Progress

        ↓

Purchase above applicable threshold?
Not Sure

        ↓

Regulatory Rule Verification Required

        ↓

Land Documents
✓ Sale Deed
✓ Land Record
Land-Use Permission — Pending

Do not show any hard-coded legal threshold.

============================================================
66. LAND NOT YET ACQUIRED — EXAMPLE FLOW
============================================================

Prototype:

Land Possession
No

        ↓

Preferred Route
MIDC

        ↓

No existing Plot Number required

        ↓

Land Type / final plot details may remain undecided

        ↓

Continue allowed with incomplete future land details where appropriate

Do not force fictional values.

============================================================
67. SAVE & EXIT
============================================================

Continue existing E05 behavior:

Back
Save & Exit
Continue

Support:

Draft Saved

Save current branch answers.

Resume must restore:

- MIDC state
- visible branch
- land state
- private/agricultural details
- document availability
- current section

============================================================
68. BACK BEHAVIOUR
============================================================

BACK:

returns to previous E05 section:

Project Location

Do not lose current land answers.

============================================================
69. CONTINUE BEHAVIOUR
============================================================

Continue should validate only:

VISIBLE
+
CURRENTLY REQUIRED

fields.

Do NOT validate:

hidden branches
NOT_APPLICABLE branches
irrelevant MIDC fields
irrelevant agricultural fields
acquisition fields when possession already received

============================================================
70. CONTINUE DESTINATION
============================================================

After completing Land Discovery:

Continue
        ↓
NEXT E05 SECTION PLACEHOLDER

Next later section will begin:

Investment / Scale
+
Employment
+
Manufacturing / Production

Do NOT build it in this prompt.

============================================================
71. EMPTY / NOT SURE HANDLING
============================================================

If the entrepreneur does not know:

- MIDC status
- land type
- land-use state
- threshold applicability

do not block them unnecessarily.

Use:

Not Sure
Needs Verification
To be confirmed

where appropriate.

The workflow must be able to continue to collect more factual data.

============================================================
72. FRONTEND MUST NOT HARD-CODE LEGAL RULES
============================================================

NON-NEGOTIABLE:

Do NOT hard-code:

- agricultural purchase threshold
- land conversion limits
- NA requirement rules
- BTAL applicability criteria
- MIDC legal criteria
- area thresholds
- authority jurisdiction assumptions

These must come later from configurable regulatory data.

The Figma should show how uncertainty is handled, not invent a rule.

============================================================
73. MULTI-DEPARTMENT FUTURE ALIGNMENT
============================================================

Land data collected here becomes reusable Business DNA / Project Dossier data.

It may later be used by:

- MIDC
- MPCB
- Fire
- DISH
- Planning Authority
- Utilities
- other departments/services

Therefore:

do not collect separate copies of the same plot area for every authority.

One master value
+
source
+
verification
+
version

should later be reused.

============================================================
74. MIDC DEPARTMENT CONNECTION
============================================================

This questionnaire does NOT directly send data to an MIDC officer screen.

Conceptually:

E05 LAND / MIDC DATA
        ↓
BUSINESS DNA
        ↓
MASTER PROJECT DOSSIER
        ↓
REGULATORY ENGINE
        ↓
IF MIDC SERVICE APPLIES
        ↓
MIDC APPLICATION
        ↓
MIDC OFFICER WORKSPACE

Do not couple this frontend directly to the Department frontend.

============================================================
75. DOCUMENT PROVENANCE FUTURE SUPPORT
============================================================

Land-related fields must later be able to show sources such as:

Entrepreneur Declaration
MIDC Allotment Document
Sale Deed
Lease Deed
Land Record
Government-generated approval

Do not implement full provenance UI here.

Only preserve architecture.

============================================================
76. RESPONSIVE DESIGN
============================================================

Desktop:

Use existing authenticated portal content width.

Use comfortable form width.

Avoid placing too many inputs in one row.

Tablet:

Reflow multi-column details where necessary.

Mobile:

Stack all question blocks.

Conditional branches should expand vertically.

============================================================
77. ACCESSIBILITY
============================================================

Preserve:

- keyboard navigation
- visible focus
- proper labels
- logical reading order
- adequate contrast
- accessible radio groups
- accessible checkboxes
- error icon + text
- status icon + text
- English / Marathi compatibility
- usable zoom
- large click targets

Do not rely on color alone for:

Needs Verification
Not Applicable
Warning
Complete

============================================================
78. REUSABLE COMPONENTS
============================================================

Create/reuse components for:

- Reused Answer / Confirmed State
- Edit Prior Answer
- Conditional Branch
- Searchable MIDC Estate Select
- Numeric Area Input + Unit
- Allotment Status
- Land Status
- Land Type Radio Group
- Ownership Status
- Agricultural Land Conditional Questions
- Regulatory Verification Banner
- Document Availability Checklist
- Optional Upload
- Simple Consistency Warning
- Not Sure State
- Draft Saved
- Section Navigation
- Bottom Action Bar

Use Auto Layout.

============================================================
79. DO NOT BUILD
============================================================

Do NOT build:

- MIDC application
- MIDC land allotment service
- MIDC officer dashboard
- MIDC approval decision
- Non-MIDC government application
- NA application
- BTAL application
- legal permission application
- payment screen
- document centre
- regulatory journey
- dependency graph
- RAG assistant
- profile review
- final Business DNA output

This is discovery only.

============================================================
80. FINAL QUALITY CHECK
============================================================

Before finishing verify:

[ ] Previous screens remain unchanged

[ ] E04 MIDC answer reused
[ ] E04 MIDC question NOT repeated when already answered
[ ] E04 land-possession answer reused
[ ] Land-possession question NOT repeated when already answered

[ ] MIDC = Yes activates MIDC follow-up
[ ] MIDC = No hides MIDC details
[ ] MIDC = Unknown supports Needs Verification

[ ] MIDC Estate included
[ ] Plot Number included where relevant
[ ] Plot Area included where relevant
[ ] Allotment Status included

[ ] Possession Received skips acquisition route
[ ] Acquisition branch becomes NOT_APPLICABLE
[ ] No land asks Preferred Land Route
[ ] In Progress asks current status

[ ] Land Type included
[ ] Private Non-Agricultural supported
[ ] Private Agricultural supported
[ ] MIDC land supported
[ ] Not Sure supported

[ ] Private ownership state included
[ ] Survey / Plot Number included
[ ] Area included
[ ] Land-use classification included
[ ] Possession reuses existing master state

[ ] Agricultural use-intent question included
[ ] Land-use permission question included
[ ] Threshold question included
[ ] No numerical threshold hard-coded
[ ] Yes/Not Sure threshold activates verification state
[ ] Regulatory Rule Verification Required displayed appropriately

[ ] Land document availability included
[ ] Upload optional
[ ] Central Document Centre referenced as later destination
[ ] No duplicate document repository created

[ ] NOT_APPLICABLE preserved
[ ] Not Sure does not force guesses
[ ] Hidden branches are not validated
[ ] Contradictory values trigger review rather than silent overwrite

[ ] No regulatory approvals are declared yet
[ ] No statutory eligibility conclusion made
[ ] No future E05 sections built

============================================================
81. FINAL EXPECTED EXPERIENCE
============================================================

The entrepreneur should experience:

“Earlier I told EKATMA whether my project is in MIDC
and whether I already have land.”

        ↓

EKATMA remembers those answers.

        ↓

If MIDC = YES:
“Tell us about the MIDC plot.”

If MIDC = NO:
Skip MIDC details.

If MIDC = NOT SURE:
“We will help verify this later.”

        ↓

If land is already possessed:
Skip acquisition questions.

If land is not acquired:
Ask preferred route.

If acquisition is underway:
Ask current status.

        ↓

“What type of land is it?”

        ↓

If Private:
Ask ownership + land details.

        ↓

If Agricultural:
Ask only the relevant industrial-use / land-use /
permission-check questions.

        ↓

“What land documents do you already have?”

        ↓

SAVE BUSINESS DNA

        ↓

Continue to the next adaptive section later.

============================================================
FINAL INSTRUCTION
============================================================

Create ONLY this continuation of E05:

MIDC branch
+
Land possession
+
Acquisition / allotment state
+
Land type
+
Private land
+
Agricultural land
+
Land document availability

Reuse E04 answers exactly.

Do not ask the same fact twice.

Do not hard-code legal thresholds.

Do not create regulatory applications or final approval conclusions.

Do not modify any previously completed screen.

Stop after Land Document Availability.