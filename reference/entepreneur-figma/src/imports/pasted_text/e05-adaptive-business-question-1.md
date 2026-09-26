Continue the EXISTING EKATMA Entrepreneur-side Figma implementation.

============================================================
EKATMA — ENTREPRENEUR SIDE
E05 — ADAPTIVE BUSINESS QUESTIONNAIRE
PART 3:
INVESTMENT + EMPLOYMENT + MANUFACTURING / PRODUCTION
+ BUILDING / CONSTRUCTION
+ POWER + WATER + WASTEWATER + DRAINAGE
============================================================

IMPORTANT:
Continue the SAME E05 Adaptive Business Questionnaire.

This prompt creates ONLY the next adaptive-discovery sections covering:

A. Investment
B. Employment
C. Manufacturing / Production
D. Building / Construction
E. Power
F. Water
G. Wastewater
H. Drainage

Do NOT create the later E05 branches for:

- Environmental Clearance
- Air emissions
- Hazardous materials
- Hazardous waste
- General solid waste
- Boiler
- Pressure vessels
- Dangerous machinery
- Factory / DISH
- Fire discovery
- Storage / Warehouse
- Import / Export
- Logistics
- Existing Approval details
- Existing Application details
- Incentive attributes
- Central Document Centre
- Business Profile Review
- Final Business DNA output
- Regulatory Journey
- Application forms
- Department-side workflows
- Compliance
- Incentives
- RAG Assistant

Stop after Drainage is completed.

============================================================
1. PRESERVE ALL PREVIOUSLY COMPLETED WORK
============================================================

DO NOT redesign, regenerate, remove, rename, restyle or overwrite:

- Phase 0
- Public Landing
- Authentication
- Industrial Login
- OTP
- Registration
- Header
- Footer
- Accessibility strip
- National Emblem
- Government of Maharashtra branding
- EKATMA branding
- Existing colors
- Typography
- Spacing
- Buttons
- Cards
- Tables
- Existing form controls
- Existing breadcrumbs
- English / Marathi compatibility
- E02 My Businesses
- E03 Create Business / Project
- E04 Basic Requirements
- E05 Part 1:
  • Classification
  • Business Identity
  • Primary Business Nature
  • Industry
  • Activities
  • Products / Services
  • Process
  • Project Stage
  • Project Location
- E05 Part 2:
  • MIDC branch
  • Land possession
  • Acquisition / allotment status
  • Land type
  • Private land
  • Agricultural land
  • Land-document availability

This is a continuation of the same E05.

Do not create another questionnaire.

============================================================
2. CORE ADAPTIVE RULE
============================================================

Continue using:

QUESTION
    ↓
ANSWER
    ↓
UPDATE BUSINESS DNA
    ↓
RE-EVALUATE RULES
    ↓
ACTIVATE / DEACTIVATE BRANCHES
    ↓
SHOW NEXT RELEVANT QUESTION

Do NOT display every question in this prompt simultaneously.

Use progressive disclosure.

Hidden branches must NOT appear as:
- Missing
- Incomplete
- Error

If a branch is irrelevant, treat it as:

NOT_APPLICABLE

conceptually.

============================================================
3. REUSE PREVIOUS ANSWERS
============================================================

The questionnaire must continue to reuse previously known values.

Do NOT ask again:

- Project Type
- Business / Project Name
- Primary Business Nature
- Project Stage
- Project Location
- MIDC status
- Land possession
- Construction requirement
- Power requirement
- Water requirement

if these already exist from E03 / E04 / earlier E05 sections.

Show reused fields as:

CURRENT VALUE
+
SOURCE
+
EDIT

Example:

POWER REQUIRED
Yes

Captured in Basic Requirements

[Edit]

============================================================
4. SECTION PROGRESS
============================================================

Continue the E05 section-progress pattern.

Suggested structure for this prompt:

Business Discovery

Section:
Project Scale & Operations

Subsections:

1. Investment
2. Employment
3. Production
4. Building
5. Power
6. Water
7. Wastewater
8. Drainage

Do NOT use a fixed completion percentage.

============================================================
5. PROJECT CONTEXT HEADER
============================================================

Keep a compact context strip visible.

Example:

PROJECT
ABC Pharma Manufacturing Unit

PROJECT TYPE
New Business / Project

INDUSTRY
Pharmaceuticals

PRIMARY NATURE
Manufacturing

LOCATION
Thane, Maharashtra

Do not make this a large dashboard.

============================================================
A. INVESTMENT
============================================================

6. INVESTMENT SECTION
============================================================

Create heading:

PROJECT INVESTMENT

Supporting text:

“Provide the estimated capital investment for this project.
Approximate values can be updated later.”

Do not make this feel like a finance application.

============================================================
7. ESTIMATED TOTAL PROJECT INVESTMENT
============================================================

Ask:

ESTIMATED TOTAL PROJECT INVESTMENT

Currency:
₹

Input:
numeric / currency

Example:

₹ 40,00,00,000

Allow Indian number formatting visually if supported.

Do not enforce statutory thresholds in frontend.

============================================================
8. INVESTMENT BREAKDOWN
============================================================

Create a structured breakdown:

LAND
₹ [________]

BUILDING / CONSTRUCTION
₹ [________]

PLANT & MACHINERY
₹ [________]

OTHER CAPITAL INVESTMENT
₹ [________]

Optional helper text:

“Enter estimated values where available.”

============================================================
9. INVESTMENT CALCULATION BEHAVIOUR
============================================================

The system may:

Total breakdown
        ↓
compare with
Estimated Total Investment

If all breakdown components exist:

show:

Calculated Capital Investment
₹ XX

If the entered total differs:

show a gentle consistency prompt:

“The total investment and investment breakdown do not currently match.
Please review.”

Do NOT automatically overwrite either value.

============================================================
10. PARTIAL INVESTMENT VALUES
============================================================

Do not force every breakdown item if not yet known.

Allow:

Not yet known

where suitable.

For planning-stage projects, estimates may be approximate.

The rules engine may later use:

- total investment
- plant & machinery
- fixed capital
- land
- building

for classification and scheme applicability.

Do not show final classification results here.

============================================================
11. PROJECT CLASSIFICATION RELATIONSHIP
============================================================

If earlier:

Classification = I am not sure

then investment collected here becomes one of the inputs later used to derive
a candidate classification.

Do NOT automatically display:

“You are MSME”
or
“You are Mega”

inside this section.

Keep classification derivation for later rule evaluation.

============================================================
B. EMPLOYMENT
============================================================

12. EMPLOYMENT SECTION
============================================================

Heading:

EMPLOYMENT

Ask:

EXPECTED WORKFORCE

Fields:

TOTAL
[____]

PERMANENT
[____]

CONTRACT
[____]

OTHER
[____]

Use integer numeric inputs.

============================================================
13. EMPLOYMENT CONSISTENCY
============================================================

If Permanent + Contract + Other is entered:

compare against Total.

If mismatch:

show gentle warning:

“Workforce breakdown does not match the total workforce.”

Allow review.

Do not silently recalculate unless user explicitly chooses to use calculated
value.

============================================================
14. NEW PROJECT EMPLOYMENT
============================================================

For:

New Business / Project

show:

Expected workforce

Do not show “Current workforce” unless relevant.

============================================================
15. EXISTING BUSINESS EMPLOYMENT
============================================================

For:

Existing Business / Project

show:

CURRENT WORKFORCE
[____]

If current workforce is already known from an existing profile:

prefill it.

Show:

Source:
Existing Business Profile

[Edit if permitted]

============================================================
16. EXPANSION / MODIFICATION EMPLOYMENT
============================================================

For:

Expansion
or
Modification / Diversification

show:

CURRENT WORKFORCE
180

EXPECTED WORKFORCE AFTER PROJECT
250

Optionally show:

CHANGE
+70

Do NOT overwrite Current Workforce.

Preserve:

Current
→ Proposed

This is an early version of later delta analysis.

============================================================
17. EMPLOYMENT DATA FUTURE USE
============================================================

Conceptually, employment may later affect:

- project classification
- factory applicability
- safety requirements
- incentive eligibility
- inspection routing

Do NOT show those regulatory conclusions yet.

============================================================
C. MANUFACTURING / PRODUCTION
============================================================

18. MANUFACTURING BRANCH ACTIVATION
============================================================

Show this section ONLY if the Business DNA indicates a relevant branch such as:

- Manufacturing
- Processing
- Manufacturing + Trading
- selected Manufacture activity
- selected Process activity
- other relevant production-based activity

If:

Services only
or
Trading only

and no production activity is selected:

MANUFACTURING / PRODUCTION
→ NOT_APPLICABLE

Do not show missing production warnings.

============================================================
19. PRODUCTION SECTION HEADER
============================================================

Heading:

PRODUCTION DETAILS

Supporting text:

“Provide the expected production capacity for the products manufactured or processed.”

============================================================
20. REUSE PRODUCTS
============================================================

Products were already collected in E05 Part 1.

Do NOT ask the user to create a completely separate product list.

Reuse:

PRODUCTS / SERVICES

For manufacturing products, allow production-capacity details to be attached.

Example:

Product:
Pharmaceutical Formulations

Capacity:
100

Unit:
Tonnes / Day

============================================================
21. PRODUCT PRODUCTION ROW
============================================================

Create reusable row:

PRODUCT
[ existing product selector ]

CAPACITY
[________]

UNIT
[________]

Suggested units:

- tonnes/day
- tonnes/month
- kg/day
- litres/day
- KL/day
- units/day
- units/month
- other

If Other:

Specify Unit
[________]

Do not hard-code one unit for all sectors.

============================================================
22. MULTIPLE PRODUCTS
============================================================

Allow:

+ Add Production Capacity

Each row should relate to an existing product where possible.

Example:

Product 1
Tablet Formulations
100 tonnes/month

Product 2
Liquid Formulations
50 KL/month

Do not force multiple products.

============================================================
23. PRODUCT NOT IN EXISTING LIST
============================================================

If user needs to add another product:

allow:

+ Add Product

But this should update the SAME Products Business DNA list created earlier.

Do not create a separate “production-only product” database.

============================================================
24. NUMBER OF SHIFTS
============================================================

Ask:

NUMBER OF SHIFTS

Options:

○ 1
○ 2
○ 3
○ Other

If Other:

Number of Shifts
[___]

============================================================
25. OPERATING HOURS
============================================================

Ask:

OPERATING HOURS PER DAY

Numeric input.

Example:

8 hours/day
16 hours/day
24 hours/day

Validate sensibly:

0–24 hours

Do not create legal judgments from the value.

============================================================
26. PROCESS DETAILS REUSE
============================================================

If process information was captured earlier:

show:

PROCESS
Chemical Processing

Captured earlier
[Edit]

Do not ask process type from zero again.

============================================================
27. PROCESS DETAIL EXTENSION
============================================================

Where relevant, allow:

ADDITIONAL PROCESS DETAILS
[________________________]

This remains supplementary.

Do not make free text the sole regulatory input.

============================================================
28. EXPANSION PRODUCTION
============================================================

For Expansion / Modification:

show:

CURRENT CAPACITY
100 T/day

PROPOSED CAPACITY
200 T/day

CHANGE
+100 T/day

Keep Current and Proposed values separate.

Do not overwrite historical values.

============================================================
29. PURE SERVICE / TRADING BRANCH
============================================================

For pure service or trading projects:

hide:

- production capacity
- shifts
- operating hours
- manufacturing process extension

Continue to Building / Utilities.

============================================================
D. BUILDING / CONSTRUCTION
============================================================

30. CONSTRUCTION ANSWER REUSE
============================================================

E04 already captured:

- New construction planned
- Existing premises
- Modify existing premises
- Not sure

DO NOT ask:

“Will you construct a new building?”

again if known.

Show:

CONSTRUCTION / PREMISES

New Construction Planned

Captured in Basic Requirements

[Edit]

============================================================
31. NEW CONSTRUCTION BRANCH
============================================================

If:

NEW CONSTRUCTION PLANNED

show:

BUILDING DETAILS

Ask:

PLOT AREA
[______] sq.m

BUILT-UP AREA
[______] sq.m

NUMBER OF FLOORS
[______]

BUILDING HEIGHT
[______] m

OCCUPANCY
[________]

CONSTRUCTION STATUS
○ Not Started
○ Planning
○ Under Construction
○ Completed

============================================================
32. PLOT AREA REUSE
============================================================

IMPORTANT:

Plot Area may already have been captured in the Land section.

Do NOT create a second unrelated Plot Area value.

Show:

PLOT AREA
4,800 sq.m

Source:
Land Details

[Edit]

The Building section must reuse the master plot-area value.

============================================================
33. MODIFY EXISTING BUILDING BRANCH
============================================================

If:

MODIFY EXISTING PREMISES

show:

CURRENT BUILDING CONTEXT

and collect relevant proposed values such as:

Current Built-up Area
Proposed Built-up Area

Current Floors
Proposed Floors

Current Height
Proposed Height

Current Occupancy
Proposed Occupancy

Only show Current → Proposed where relevant.

Do not erase current approved data.

============================================================
34. EXISTING PREMISES — NO MODIFICATION
============================================================

If:

EXISTING PREMISES

and no modification is planned:

do not force “new construction” details.

Show existing building details only where needed later.

Detailed construction branch may become NOT_APPLICABLE.

============================================================
35. CONSTRUCTION STATUS
============================================================

Use:

○ Not Started
○ Planning
○ Under Construction
○ Completed

This status is different from overall Project Stage.

Do not replace one with the other.

Example:

Project Stage = Pre-Establishment
Construction Status = Planning

Both may coexist.

============================================================
36. OCCUPANCY
============================================================

Use a structured/selectable field where possible.

Prototype values may include:

- Industrial
- Factory / Manufacturing
- Warehouse
- Office
- Commercial
- Laboratory / R&D
- Mixed
- Other
- Not Sure

Do not claim statutory occupancy classification unless confirmed later.

============================================================
37. BUILDING RISK FLAGS
============================================================

Ask:

WILL THE BUILDING / PREMISES INCLUDE ANY OF THE FOLLOWING?

Multi-select:

☐ Industrial Machinery
☐ Hazardous Material
☐ Flammable Material
☐ High Fire-Load Storage
☐ Public / Customer Occupancy
☐ Large Workforce
☐ Warehouse
☐ None

Allow multiple selections except:

None

If None selected:
clear / disable incompatible selections.

============================================================
38. BUILDING FLAGS PURPOSE
============================================================

These flags later help activate:

- Fire questions
- Safety questions
- building/planning requirements
- inspections

Do NOT show final Fire NOC applicability yet.

============================================================
39. NOT SURE CONSTRUCTION
============================================================

If E04 construction answer = Not Sure:

allow clarification here.

Do not force a guess.

Keep branch in Needs Verification if still unresolved.

============================================================
E. POWER
============================================================

40. POWER ANSWER REUSE
============================================================

E04 already captured:

Power Required:
Yes / No / Not Sure

Do NOT ask again if known.

Show:

POWER REQUIREMENT
Yes

Captured in Basic Requirements
[Edit]

============================================================
41. POWER = NO
============================================================

If:

POWER = NO

then:

POWER DETAILS
→ NOT_APPLICABLE

Do not ask:
- connected load
- LT/HT
- substation

Do not show missing-data warnings.

============================================================
42. POWER = YES
============================================================

If:

POWER = YES

ask:

ESTIMATED CONNECTED LOAD

Input:
[______]

Unit selector:
kW
MW
Other where needed

============================================================
43. SUPPLY TYPE
============================================================

Ask:

EXPECTED SUPPLY TYPE

Options:

○ Low Tension
○ High Tension
○ Not Sure

Do not force technical selection.

============================================================
44. LOW TENSION BRANCH
============================================================

If:

LOW TENSION

do not display HT infrastructure questions.

HT branch:
NOT_APPLICABLE

============================================================
45. HIGH TENSION BRANCH
============================================================

If:

HIGH TENSION

show:

HT INFRASTRUCTURE

Question:

WHAT INFRASTRUCTURE IS EXPECTED?

Options:

☐ HT Connection
☐ Dedicated Substation
☐ Both
☐ Not Sure

If using multi-select:
ensure “Both” is not contradictory with individual choices.

Alternatively use single-select:

○ HT Connection
○ Dedicated Substation
○ Both
○ Not Sure

Preferred:
single-select for simplicity.

============================================================
46. HT FUTURE ROUTING
============================================================

HT information may later activate:

HT / substation regulatory or utility route.

Do NOT name or create the final approval unless configured later.

============================================================
47. POWER = NOT SURE
============================================================

If Power Requirement = Not Sure:

allow basic project discovery to continue.

Use:

Needs Verification

Do not show load / HT fields until logically appropriate.

============================================================
48. POWER CONSISTENCY
============================================================

Example contradiction:

Power = No
+
Connected Load = 500 kW

show:

“Please review these answers.”

Do not auto-change Power to Yes.

============================================================
F. WATER
============================================================

49. WATER ANSWER REUSE
============================================================

E04 already captured:

Water Required:
Yes / No / Not Sure

Do NOT ask again if known.

Show:

WATER REQUIREMENT
Yes

Captured in Basic Requirements
[Edit]

============================================================
50. WATER = NO
============================================================

If:

WATER = NO

then:

WATER DETAILS
→ NOT_APPLICABLE

Do not ask:
- daily quantity
- source

Wastewater may still need contextual treatment only if another business process
suggests it, but do not assume wastewater exists.

============================================================
51. WATER = YES
============================================================

If:

WATER = YES

ask:

DAILY WATER REQUIREMENT

[______] KL/day

Use numeric input.

Do not create legal thresholds.

============================================================
52. WATER SOURCE
============================================================

Ask:

PRIMARY WATER SOURCE

Options:

○ MIDC Supply
○ Municipal / Local Authority
○ Groundwater
○ Surface Water
○ Private Source
○ Other
○ Not Decided

If Other:

Describe Source
[________]

============================================================
53. MIDC WATER SOURCE
============================================================

If:

SOURCE = MIDC SUPPLY

conceptually activate:

MIDC WATER ROUTE
= POSSIBLE / TO BE EVALUATED

Do NOT automatically create an MIDC Water application.

Later regulatory engine determines the service.

If earlier MIDC = No and user selects MIDC Water:

show consistency warning:

“These answers may need review.”

Do not auto-overwrite either value.

============================================================
54. MUNICIPAL / LOCAL AUTHORITY SOURCE
============================================================

If:

Municipal / Local Authority

store the source.

Later relevant local utility route may be evaluated.

Do not build it now.

============================================================
55. GROUNDWATER SOURCE
============================================================

If:

Groundwater

conceptually activate:

GROUNDWATER APPLICABILITY CHECK

Use a neutral state:

“Groundwater-related regulatory requirements will be evaluated later.”

Do not invent:
- threshold
- authority
- permission requirement

============================================================
56. SURFACE WATER
============================================================

If:

Surface Water

record the source.

Later regulatory applicability may determine relevant permission.

Do not invent the route.

============================================================
57. PRIVATE SOURCE
============================================================

If:

Private Source

optionally ask lightweight supplementary text:

SOURCE DESCRIPTION

[________]

Do not over-expand this branch yet.

============================================================
58. NOT DECIDED
============================================================

If:

Water Source = Not Decided

allow continuation.

Store:

Needs Verification / Pending Decision

Do not force a source.

============================================================
59. WATER SOURCE ROUTING
============================================================

Conceptual behavior:

MIDC Supply
→ evaluate MIDC water route

Groundwater
→ evaluate groundwater route

Municipal
→ evaluate relevant local utility route

Surface Water
→ evaluate applicable water permission route

Private / Other
→ evaluate relevant route

Not Decided
→ Needs Verification

Do NOT show these as final approvals yet.

============================================================
G. WASTEWATER
============================================================

60. WASTEWATER QUESTION VISIBILITY
============================================================

Do NOT show the wastewater branch indiscriminately to every business.

Show where relevant based on:

- Manufacturing
- Processing
- Water usage
- industrial operations
- building / occupancy context
- other configured activity

For a simple low-impact service business, this may be simplified or skipped.

============================================================
61. WASTEWATER QUESTION
============================================================

Ask:

WILL THE PROJECT GENERATE WASTEWATER?

Options:

○ Yes
○ No
○ Not Sure

============================================================
62. WASTEWATER = NO
============================================================

If:

NO

then:

WASTEWATER DETAILS
→ NOT_APPLICABLE

Do not display treatment questions.

============================================================
63. WASTEWATER = YES
============================================================

If:

YES

ask:

WHAT TYPE OF WASTEWATER WILL BE GENERATED?

Use single-select or multi-select appropriate to these mutually meaningful
states:

○ Domestic Sewage
○ Industrial Effluent
○ Both

Preferred:
single-select.

============================================================
64. DOMESTIC SEWAGE
============================================================

If:

Domestic Sewage only

do NOT show industrial-effluent treatment details unless required.

Keep future sewage/drainage context available.

============================================================
65. INDUSTRIAL EFFLUENT
============================================================

If:

Industrial Effluent
or
Both

activate:

INDUSTRIAL WASTEWATER DETAILS

Ask:

ESTIMATED QUANTITY
[______] KL/day

============================================================
66. TREATMENT PLANNED
============================================================

Ask:

IS TREATMENT PLANNED?

Options:

○ Yes
○ No
○ Not Decided

Do not force a particular treatment system.

============================================================
67. TREATMENT = YES
============================================================

If:

YES

ask:

TREATMENT SYSTEM

[ Search / Select / Describe ]

Examples may be prototype-safe:

- ETP
- STP
- Combined Treatment
- Other

Do not imply regulatory acceptance.

============================================================
68. TREATMENT CAPACITY
============================================================

Ask:

TREATMENT CAPACITY

[______] KL/day

============================================================
69. WASTEWATER CONSISTENCY
============================================================

If:

Industrial Wastewater = 80 KL/day
+
Treatment Capacity = 40 KL/day

show a neutral review warning:

“Treatment capacity is lower than the stated industrial wastewater quantity.
Please review.”

Do not automatically reject the profile.

============================================================
70. TREATMENT NOT DECIDED
============================================================

If:

Not Decided

allow continuation.

Use:

Needs Further Input

Later regulatory journey may require resolution before application submission.

============================================================
71. WASTEWATER FUTURE ROUTING
============================================================

Wastewater data may later activate:

- environmental route
- MPCB-related applicability
- drainage/discharge route
- treatment-document requirements

Do NOT create those final approval nodes yet.

============================================================
H. DRAINAGE
============================================================

72. DRAINAGE QUESTION
============================================================

Ask:

WILL DRAINAGE INFRASTRUCTURE BE REQUIRED?

Options:

○ Yes
○ No
○ Not Sure

============================================================
73. DRAINAGE = NO
============================================================

If:

NO

then:

DRAINAGE DETAILS
→ NOT_APPLICABLE

Do not show drainage type questions.

============================================================
74. DRAINAGE = YES
============================================================

If:

YES

ask:

WHAT TYPE OF DRAINAGE IS REQUIRED?

Multi-select:

☐ Stormwater
☐ Sewage
☐ Industrial Discharge
☐ Other

Allow multiple because a project may need more than one.

============================================================
75. OTHER DRAINAGE
============================================================

If:

Other

show:

Describe Drainage Requirement
[________________]

============================================================
76. DRAINAGE + WASTEWATER RELATIONSHIP
============================================================

Use simple consistency support.

Example:

Industrial Effluent = Yes
+
Drainage = No

Do NOT automatically declare this invalid.

Show:

“Please review how industrial wastewater will be handled.”

Likewise:

Domestic Sewage = Yes
+
Sewage Drainage not selected

show a review prompt only if relevant.

============================================================
77. INDUSTRIAL DISCHARGE
============================================================

If:

Industrial Discharge selected

preserve this as a future regulatory input.

Do NOT yet determine:
- discharge permission
- MPCB approval
- drainage NOC

============================================================
78. STORMWATER
============================================================

If:

Stormwater selected

store it separately.

Do not combine stormwater and industrial effluent into one field.

============================================================
79. WASTEWATER VS DRAINAGE — KEEP SEPARATE
============================================================

This is important.

WASTEWATER describes:

what wastewater the project generates.

DRAINAGE describes:

what drainage/discharge infrastructure is required.

Do not merge these into one question.

Example:

Industrial Effluent = Yes

does not mean:

Industrial Drainage = automatically Yes

The entrepreneur may plan internal treatment / reuse / another route.

Keep fields distinct.

============================================================
80. PROGRESSIVE DISCLOSURE EXPECTATION
============================================================

The user should NOT see:

Investment
Employment
Production
Building
Power
Water
Wastewater
Drainage

all expanded at once.

Use sequential sections or accordion-style progressive steps consistent with
the existing E05 design.

Recommended experience:

Investment
        ↓
Employment
        ↓
Production if relevant
        ↓
Building
        ↓
Power
        ↓
Water
        ↓
Wastewater if relevant
        ↓
Drainage if relevant

============================================================
81. NOT_APPLICABLE BEHAVIOUR
============================================================

Examples:

Services-only business
→ Production = NOT_APPLICABLE

Power = No
→ Power Details = NOT_APPLICABLE

Water = No
→ Water Details = NOT_APPLICABLE

Wastewater = No
→ Wastewater Details = NOT_APPLICABLE

Drainage = No
→ Drainage Details = NOT_APPLICABLE

Existing Premises with no modification
→ New Construction details = NOT_APPLICABLE

Never show these as incomplete.

============================================================
82. QUESTION STATE VS VERIFICATION STATE
============================================================

Continue separating:

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

from:

DATA VERIFICATION STATE

SELF_DECLARED
USER_CONFIRMED
SYSTEM_VERIFIED
DEPARTMENT_VERIFIED
NEEDS_VERIFICATION
INVALID
EXPIRED

Do not collapse both into one “Status”.

============================================================
83. EXPANSION / MODIFICATION VERSIONING
============================================================

For existing data:

CURRENT
→ PROPOSED

Examples:

Workforce
180 → 250

Production Capacity
100 T/day → 200 T/day

Built-up Area
2,000 sq.m → 2,600 sq.m

Connected Load
400 kW → 650 kW

Water
50 KL/day → 80 KL/day

Do not overwrite Current.

Later regulatory impact analysis will compare the two.

============================================================
84. SIMPLE CHANGE INDICATOR
============================================================

Where Expansion / Modification is active:

show:

Changed
Current → Proposed

Do not perform regulatory impact results yet.

Do not say:

“This change requires amendment.”

That happens later.

============================================================
85. MASTER DATA REUSE
============================================================

Avoid duplicate master fields.

Examples:

Plot Area
→ collected in Land
→ reused in Building

Products
→ collected earlier
→ reused in Production

Process
→ collected earlier
→ reused in Production

Construction
→ E04 answer reused

Power Need
→ E04 answer reused

Water Need
→ E04 answer reused

============================================================
86. VALIDATION
============================================================

Validate only visible/relevant fields.

Examples:

Power = Yes
→ Load may be required

Power = No
→ Load not validated

Manufacturing active
→ production details relevant

Services only
→ production not validated

Wastewater = Yes + Industrial Effluent
→ quantity relevant

Wastewater = Domestic only
→ industrial treatment capacity not required

Drainage = No
→ drainage type not required

============================================================
87. NUMERIC FIELD VALIDATION
============================================================

Use simple objective validation:

- no negative investment
- no negative workforce
- no negative production capacity
- floors cannot be negative
- height cannot be negative
- load cannot be negative
- water quantity cannot be negative
- wastewater quantity cannot be negative
- treatment capacity cannot be negative
- operating hours <= 24

Do not introduce regulatory thresholds.

============================================================
88. UNIT HANDLING
============================================================

Keep units explicit.

Investment:
₹

Land / Built-Up:
sq.m

Building Height:
m

Connected Load:
kW / MW

Water:
KL/day

Wastewater:
KL/day

Production:
dynamic unit selector

Do not store unlabeled numeric values visually.

============================================================
89. UNKNOWN / NOT DECIDED HANDLING
============================================================

Where supported:

Not Sure
Not Decided
Not Yet Known

must be valid interim answers.

Do not force estimates where entrepreneur genuinely does not know yet.

Later stages may require those values before submission.

============================================================
90. NO REGULATORY OUTCOMES YET
============================================================

Do NOT show:

- MPCB required
- Fire NOC required
- Factory Licence required
- HT permission required
- Groundwater NOC required
- MIDC Water approval required
- Drainage approval required
- Environmental Clearance required

This prompt only gathers Business DNA inputs.

============================================================
91. FUTURE RULE ENGINE CONNECTION
============================================================

Conceptually:

INVESTMENT
+
EMPLOYMENT
+
PRODUCTION
+
BUILDING
+
POWER
+
WATER
+
WASTEWATER
+
DRAINAGE

        ↓

BUSINESS DNA

        ↓

REGULATORY RULE ENGINE

        ↓

APPLICABLE
CONDITIONAL
NOT APPLICABLE
NEEDS VERIFICATION

Do not generate that output yet.

============================================================
92. BUILDING FLAGS FUTURE CONNECTION
============================================================

Building flags collected here later feed:

Industrial Machinery
→ Factory / safety considerations

Hazardous Material
→ safety / environmental / fire consideration

Flammable Material
→ fire / storage consideration

High Fire Load
→ fire consideration

Public Occupancy
→ fire/building consideration

Large Workforce
→ factory / safety consideration

Warehouse
→ warehouse/fire/storage branch

Do not activate final approvals yet.

============================================================
93. POWER FUTURE CONNECTION
============================================================

Power data later feeds:

Power Required?
Connected Load
LT / HT
HT Infrastructure

        ↓

appropriate utility / infrastructure route.

Keep frontend generic.

============================================================
94. WATER FUTURE CONNECTION
============================================================

Water data later feeds:

Water Required
Quantity
Source

        ↓

MIDC / Municipal / Groundwater /
Surface / Private route

No route should be hard-coded as universally applicable.

============================================================
95. WASTEWATER FUTURE CONNECTION
============================================================

Wastewater data later feeds:

Domestic / Industrial / Both
Quantity
Treatment
Capacity

        ↓

environmental + discharge + compliance rules

Do not turn this into an MPCB application yet.

============================================================
96. DRAINAGE FUTURE CONNECTION
============================================================

Drainage data later feeds:

Stormwater
Sewage
Industrial Discharge
Other

        ↓

planning / MIDC / local /
environmental route as configured

Do not assume one authority.

============================================================
97. SAVE & EXIT
============================================================

Every subsection should continue supporting:

Back
Save & Exit
Continue

Show:

Draft Saved

Preserve entered data and current branch state.

============================================================
98. RESUME LATER
============================================================

Resume must restore:

- current subsection
- investment
- workforce
- production rows
- construction branch
- building details
- power branch
- water branch
- wastewater branch
- drainage branch
- hidden / active state

Do not restart the section from zero.

============================================================
99. BACK NAVIGATION
============================================================

From Investment:

Back
→ previous E05 Land section

Within this prompt:

Back
→ previous subsection

Do not erase entered data.

============================================================
100. CONTINUE BEHAVIOUR
============================================================

Continue validates only relevant currently visible fields.

After Drainage:

Continue
        ↓
NEXT E05 ADAPTIVE SECTION PLACEHOLDER

The next section later covers:

Environment
+
Air Emissions
+
Hazardous Materials
+
Hazardous Waste
+
Safety / Equipment

Do NOT build it now.

============================================================
101. EXAMPLE — MANUFACTURING PROJECT
============================================================

Prototype one realistic state:

PROJECT:
ABC Pharma Manufacturing Unit

Primary Nature:
Manufacturing

Investment:
₹40 Cr

Employment:
180

Products:
Pharmaceutical Formulations

Production:
100 T/day

Shifts:
2

Operating:
16 hrs/day

Construction:
New Construction

Plot Area:
4,800 sq.m
(reused from Land)

Built-Up:
2,500 sq.m

Floors:
3

Height:
15 m

Occupancy:
Industrial

Flags:
Industrial Machinery
Hazardous Material
Flammable Material

Power:
Yes

Load:
750 kW

Supply:
High Tension

HT:
Dedicated Substation

Water:
Yes

80 KL/day

Source:
MIDC Supply

Wastewater:
Yes

Type:
Both

Industrial Effluent:
45 KL/day

Treatment:
Yes

Treatment System:
ETP

Treatment Capacity:
60 KL/day

Drainage:
Yes

Types:
Stormwater
Sewage
Industrial Discharge

Do NOT generate approvals.

============================================================
102. EXAMPLE — SERVICES PROJECT
============================================================

Prototype a second adaptive state:

Primary Nature:
Services

Investment:
₹5 Cr

Employment:
80

Production:
NOT_APPLICABLE

Construction:
Existing Premises

Power:
Yes
LT
100 kW

Water:
Yes
5 KL/day
Municipal

Wastewater:
Domestic Sewage only

Industrial Effluent:
NOT_APPLICABLE

Drainage:
Sewage + Stormwater

This demonstrates that manufacturing questions disappear.

============================================================
103. EXAMPLE — POWER NO
============================================================

Power:
No

Then:

Connected Load
HT / LT
Substation

must disappear.

Do not display:

“Connected load missing.”

============================================================
104. EXAMPLE — WATER NO
============================================================

Water:
No

Then:

Daily Quantity
Water Source

must disappear.

Wastewater question should only remain if another branch independently makes it
relevant.

Do not mechanically ask industrial wastewater after Water = No.

============================================================
105. REUSABLE COMPONENTS
============================================================

Create/reuse:

- Currency Input
- Investment Breakdown
- Workforce Breakdown
- Current → Proposed Field
- Product Capacity Row
- Add Product Row
- Unit Selector
- Shift Selector
- Numeric Hours Input
- Reused Value Block
- Construction Branch
- Building Detail Group
- Building Risk Flags
- Power Need Summary
- Load + Unit Input
- LT / HT Selector
- HT Infrastructure Follow-Up
- Water Quantity Input
- Water Source Selector
- Wastewater Type Selector
- Treatment Follow-Up
- Treatment Capacity Input
- Drainage Multi-Select
- Consistency Warning
- Not Sure / Not Decided State
- Draft Saved
- Back / Save & Exit / Continue

Use Auto Layout.

============================================================
106. UI QUALITY
============================================================

Keep the design:

- government-professional
- clear
- guided
- information-dense but readable
- consistent with existing EKATMA
- accessible
- calm

Avoid:

- giant cards
- dashboard charts
- consumer app styling
- gradients
- glassmorphism
- AI art
- decorative illustrations
- excessive badges
- excessive warning colors
- chatbot UI

============================================================
107. ACCESSIBILITY
============================================================

Maintain:

- keyboard-accessible fields
- visible focus
- logical tab order
- accessible radio groups
- accessible checkboxes
- clear error messages
- text + icon statuses
- adequate contrast
- English / Marathi compatibility
- responsive layout
- usable zoom
- accessible unit labels

============================================================
108. FINAL CONSISTENCY CHECK
============================================================

Before finishing verify:

[ ] All previous screens remain unchanged

INVESTMENT
[ ] Total Investment exists
[ ] Land investment exists
[ ] Building investment exists
[ ] Plant & Machinery exists
[ ] Other Capital exists
[ ] No legal threshold hard-coded
[ ] Breakdown mismatch is review-only

EMPLOYMENT
[ ] Total exists
[ ] Permanent exists
[ ] Contract exists
[ ] Other exists
[ ] Existing / expansion supports Current vs Expected

PRODUCTION
[ ] Only appears for relevant activity
[ ] Products reused from earlier E05
[ ] Multiple production rows supported
[ ] Capacity included
[ ] Unit included
[ ] Shifts included
[ ] Operating hours included
[ ] Service/trading branch can skip production

BUILDING
[ ] E04 construction state reused
[ ] “Will you construct?” not repeated
[ ] Plot Area reused from Land
[ ] Built-Up Area exists
[ ] Floors exist
[ ] Height exists
[ ] Occupancy exists
[ ] Construction Status exists
[ ] Building flags included
[ ] Existing-premises branch handled
[ ] Modification supports Current → Proposed

POWER
[ ] E04 Power answer reused
[ ] Power = No makes details NOT_APPLICABLE
[ ] Connected Load included
[ ] LT / HT / Not Sure included
[ ] HT follow-up included
[ ] No power approval generated

WATER
[ ] E04 Water answer reused
[ ] Water = No makes details NOT_APPLICABLE
[ ] KL/day included
[ ] Source included
[ ] MIDC route conceptual only
[ ] Groundwater route conceptual only
[ ] Not Decided accepted

WASTEWATER
[ ] Asked only where relevant
[ ] Yes / No / Not Sure
[ ] Domestic / Industrial / Both
[ ] Industrial quantity included
[ ] Treatment Planned included
[ ] Treatment System included
[ ] Treatment Capacity included
[ ] No MPCB conclusion generated

DRAINAGE
[ ] Yes / No / Not Sure included
[ ] Drainage No makes details NOT_APPLICABLE
[ ] Stormwater included
[ ] Sewage included
[ ] Industrial Discharge included
[ ] Other included
[ ] Drainage kept distinct from wastewater

ADAPTIVE LOGIC
[ ] Hidden questions not treated as missing
[ ] NOT_APPLICABLE preserved
[ ] Not Sure accepted
[ ] E04 answers reused
[ ] Duplicate master values avoided
[ ] Current values not overwritten in expansion
[ ] No regulatory approvals shown yet

============================================================
109. FINAL EXPECTED EXPERIENCE
============================================================

The entrepreneur should experience:

“How large is the project?”
        ↓
Investment

“How many people will work here?”
        ↓
Employment

“If you manufacture or process:
what will you produce and at what capacity?”
        ↓
Production

“What building / premises will you use?”
        ↓
Building

“How much power is needed?”
        ↓
Power

“How much water is needed and from where?”
        ↓
Water

“Will wastewater be generated?”
        ↓
Wastewater

“Will drainage infrastructure be needed?”
        ↓
Drainage

while EKATMA conceptually performs:

ANSWER
        ↓
UPDATE BUSINESS DNA
        ↓
CHECK CONSISTENCY
        ↓
ACTIVATE / DEACTIVATE NEXT BRANCH
        ↓
PREPARE INPUTS FOR REGULATORY ENGINE

============================================================
FINAL INSTRUCTION
============================================================

Create ONLY this continuation of E05:

Investment
+
Employment
+
Manufacturing / Production
+
Building / Construction
+
Power
+
Water
+
Wastewater
+
Drainage

Use progressive disclosure.

Reuse previously captured values.

Never show irrelevant branches as missing.

Preserve NOT_APPLICABLE.

Do not generate regulatory approvals yet.

Do not create the next Environment / Safety sections.

Do not modify any previously completed screen.

Stop after Drainage and link Continue only to the next E05 placeholder.