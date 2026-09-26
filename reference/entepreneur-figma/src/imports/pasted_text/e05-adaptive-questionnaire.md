Continue the EXISTING EKATMA Entrepreneur-side Figma implementation.

============================================================
EKATMA — ENTREPRENEUR SIDE
PROMPT 3
E05 — ADAPTIVE BUSINESS QUESTIONNAIRE
PART 1: CLASSIFICATION + IDENTITY + INDUSTRY + ACTIVITY
        + PRODUCTS + PROCESS + STAGE + LOCATION
============================================================

IMPORTANT:
This prompt begins E05 — Adaptive Business Questionnaire.

THIS IS ONLY THE FIRST PART OF E05.

Create the adaptive discovery sections covering:

A. Project Classification
B. Business Identity
C. Primary Business Nature
D. Industry / Sector
E. Activities
F. Products / Services
G. Process
H. Project Stage
I. Project Location

DO NOT continue into:
- MIDC detailed branch
- Land details
- Agricultural land
- Investment
- Employment
- Production capacity
- Building details
- Power details
- HT power
- Water details
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
- Existing approvals details
- Existing applications
- Incentive attributes
- Documents
- Profile Review
- Business DNA output screen
- Regulatory Journey
- Applications
- Department screens

Those are covered in later prompts.

STOP after Project Location is completed.

============================================================
1. PRESERVE ALL COMPLETED WORK EXACTLY
============================================================

Do NOT redesign, regenerate, rename, restyle or remove:

- Public Landing
- Login / Register dropdown
- Industrial Login
- Email OTP Verification
- OTP resend / countdown
- Complete Registration
- Registration Success
- Existing authentication validation
- Phase 0 components
- Government accessibility strip
- National Emblem + Satyameva Jayate
- Government of Maharashtra identity
- EKATMA logo / identity
- Existing header
- Existing footer
- Existing typography
- Existing colors
- Existing spacing
- Existing buttons
- Existing forms
- Existing cards
- Existing tables
- Existing breadcrumbs
- Existing accessibility behavior
- Existing English / Marathi compatibility
- E02 — My Businesses
- E03 — Create Business / Project
- E04 — Basic Requirements

Do NOT modify previously completed E03/E04 layouts.

Only extend the prototype forward into E05.

============================================================
2. ENTRY FLOW
============================================================

Existing flow:

E02 — My Businesses
        ↓
E03 — Create Business / Project
        ↓
E04 — Basic Requirements
        ↓
E05 — Adaptive Business Questionnaire

E05 must inherit all relevant values already collected in E03 and E04.

DO NOT treat E05 as a fresh blank form.

============================================================
3. CORE ADAPTIVE PRINCIPLE — NON-NEGOTIABLE
============================================================

E05 must NOT behave like one long government form.

The runtime mental model is:

QUESTION
    ↓
ANSWER
    ↓
UPDATE BUSINESS DNA
    ↓
RE-EVALUATE APPLICABILITY
    ↓
ACTIVATE / DEACTIVATE RELEVANT BRANCHES
    ↓
ASK NEXT RELEVANT QUESTION

This adaptive behavior must be visually understandable in the prototype.

Use:
- progressive disclosure
- conditional blocks
- confirmed reused values
- hidden irrelevant questions
- contextual follow-up questions

Do NOT show all possible questions simultaneously.

============================================================
4. DATA REUSE FROM E03 — NON-NEGOTIABLE
============================================================

E03 already captured:

- Business / Project Name
- Project Type
- Optional Description
- Existing Business selection for Expansion / Modification

Therefore E05 MUST NOT ask Business / Project Name again.

Business / Project Name in E05:

- reuse the exact E03 value
- show it as already known
- show it as confirmed/editable
- allow Edit
- do not display another blank input requiring re-entry

Example:

Business / Project Name
ABC Pharma Manufacturing Unit

[Confirmed from Create Project]   [Edit]

There must be only ONE logical Business / Project Name field.

============================================================
5. DATA REUSE FROM E04 — NON-NEGOTIABLE
============================================================

E04 already may contain:

- Need land?
- land / possession status
- MIDC / Non-MIDC / Not Sure
- construction situation
- water need
- power need
- primary business nature
- existing approvals

These are pre-seeded Business DNA inputs.

E05 MUST NOT ask these same high-level questions again if already answered.

If answer exists:

SHOW:
- current answer
- source = Basic Requirements
- confirmed/editable

Then ask only the relevant later follow-up when that section is reached.

If answer = Not Sure:
E05 may ask clarifying factual questions later.

If answer is missing:
E05 may ask the question.

If user explicitly chooses Edit:
allow update.

============================================================
6. PROJECT TYPE CONTEXT
============================================================

E03 already captured Project Type:

- New Business / Project
- Existing Business / Project
- Expansion
- Modification / Diversification

Do NOT ask Project Type again.

Keep it visible in a compact project context strip.

Example:

PROJECT
ABC Pharma Manufacturing Expansion

PROJECT TYPE
Expansion

BASED ON
ABC Pharma Pvt Ltd — Thane

For a new project:

PROJECT
Konkan Specialty Foods

PROJECT TYPE
New Business / Project

============================================================
7. EXPANSION / MODIFICATION BEHAVIOUR
============================================================

If Project Type = Expansion or Modification:

Do NOT behave like a completely new project.

Conceptually:

SELECTED EXISTING BUSINESS
        ↓
LOAD CURRENT BUSINESS DNA
        ↓
REUSE CURRENT KNOWN VALUES
        ↓
ALLOW RELEVANT CONFIRM / EDIT
        ↓
LATER:
WHAT ARE YOU CHANGING?
        ↓
CURRENT VALUE → PROPOSED VALUE

In THIS prompt:

Show existing known identity / industry / location values where available.

Do NOT build the complete Current → Proposed change simulator yet.

Do NOT erase or overwrite historical current Business DNA.

============================================================
8. E05 PAGE STRUCTURE
============================================================

Create E05 as a guided adaptive discovery experience.

Do NOT create one screen with dozens of fields.

Use logical sequential sections.

For this prompt the sections are:

SECTION 1
Project Classification

SECTION 2
Business Identity

SECTION 3
Industry & Activity

SECTION 4
Products / Services & Process

SECTION 5
Project Stage

SECTION 6
Project Location

This is why a section progress indicator may read:

Business Discovery · Section 2 of 6

Do NOT use:
47% complete
62% complete
87% complete

The questionnaire length later changes depending on Business DNA.

============================================================
9. GLOBAL E05 LAYOUT
============================================================

Reuse existing authenticated government portal shell.

Recommended structure:

TOP
Breadcrumb

Create Business / Project
>
Business Discovery

PAGE HEADER

Business Discovery

Supporting copy:

“Tell us about your business and project. EKATMA will ask only the
questions relevant to your situation.”

PROJECT CONTEXT STRIP

Business / Project Name
Project Type
Selected Existing Business where applicable

PROGRESS

Business Discovery · Section X of 6

MAIN QUESTION AREA

Adaptive content

BOTTOM ACTION BAR

Back
Save & Exit
Continue

Also show:

Draft Saved

and optionally:

Resume Later

Do not introduce a new visual system.

============================================================
10. SECTION 1 — PROJECT CLASSIFICATION
============================================================

Heading:

PROJECT CLASSIFICATION

Question:

DO YOU KNOW YOUR PROJECT CLASSIFICATION?

Options:

○ MSME
○ Large
○ Mega
○ I am not sure

Use clear selectable cards / radio options consistent with Phase 0.

Do not claim statutory eligibility merely because the user selects one.

============================================================
11. PROJECT CLASSIFICATION — UNSURE STATE
============================================================

If:

I AM NOT SURE

is selected:

Do NOT display an error.

Do NOT force selection.

Show reassuring helper text:

“That is okay. EKATMA can use project information such as investment,
sector and employment collected later to help determine the applicable
classification.”

Conceptually store:

Classification = NEEDS VERIFICATION / TO BE DERIVED

Do not display technical backend terminology unless appropriate.

Later rule engine may derive:

candidate classification

but must not present unsupported legal certainty.

============================================================
12. MEGA-PROJECT FOLLOW-UP
============================================================

After classification selection, show:

IS THIS PROJECT BEING CONSIDERED AS A MEGA-PROJECT?

Options:

○ Yes
○ No
○ Not sure

This is NOT a final eligibility decision.

If Yes or Not Sure:

Show subtle information:

“Additional classification information may be required later.”

Reserve conceptually:

Mega Project / IND-8-style taxonomy route

IMPORTANT:

Do NOT:
- claim eligibility
- show approval granted
- show benefits
- show incentive amount
- hard-code legal thresholds
- invent Mega Project criteria

Treat it as configurable taxonomy / route placeholder.

============================================================
13. SECTION 2 — BUSINESS IDENTITY
============================================================

Heading:

BUSINESS IDENTITY

Purpose:

Capture the identity of the BUSINESS / PROJECT.

This is different from the logged-in user identity.

Never confuse:

ACCOUNT / USER DATA

with:

BUSINESS / PROJECT DATA

============================================================
14. BUSINESS / PROJECT NAME
============================================================

Do NOT ask for a new name.

Show:

BUSINESS / PROJECT NAME

ABC Pharma Manufacturing Unit

Badge/helper:

Captured earlier

Action:

Edit

If Edit is selected:
reuse the same underlying E03 field.

Do not create another name record.

============================================================
15. LEGAL ENTITY TYPE
============================================================

Ask:

LEGAL ENTITY TYPE

Options:

○ Proprietorship
○ Partnership
○ LLP
○ Private Limited Company
○ Public Limited Company
○ Cooperative
○ Trust / Society
○ Other

Use structured selection.

If Other:

Show:

Specify Entity Type
[________________]

============================================================
16. LEGAL ENTITY / ORGANISATION NAME
============================================================

Ask:

LEGAL ENTITY / ORGANISATION NAME

Input.

Where account / registration data already contains the same information:

prefill it.

Label clearly:

Prefilled from account / registration

Allow review/edit according to design logic.

Do not silently assume that login account name is always the legal entity.

============================================================
17. LEGAL IDENTIFIERS
============================================================

Show only identifiers relevant to selected entity type.

Possible fields:

PAN

CIN

LLPIN

Registration Number

Other configured registration ID

Use progressive disclosure.

Examples:

Private Limited Company
→ PAN + CIN where applicable

LLP
→ PAN + LLPIN where applicable

Do not show every identifier to every entity type.

Do not invent mandatory legal combinations in the Figma prototype.

============================================================
18. AUTHORISED PERSON / PROMOTER CONTEXT
============================================================

Where relevant, capture:

Authorised Person / Promoter Relationship

Examples:

- Director
- Partner
- Proprietor
- Authorised Signatory
- Trustee
- Other

Reuse already-known account contact information where appropriate.

IMPORTANT:

Account information may be reused as a convenience.

It must NOT automatically become project/business information if it is
a different concept.

============================================================
19. PROJECT OPERATOR QUESTION
============================================================

Ask:

IS THIS PROJECT OPERATED BY THE REGISTERED ENTITY?

Options:

○ Yes
○ No

If YES:

Hide operator relationship fields.

If NO:

Reveal:

OPERATOR / PROJECT ENTITY
[________________]

RELATIONSHIP TO REGISTERED ENTITY
[________________]

This is an example of adaptive progressive disclosure.

============================================================
20. ACCOUNT ADDRESS ≠ PROJECT LOCATION
============================================================

This distinction is NON-NEGOTIABLE.

The existing account communication address must never be silently used as
the industrial project location.

If account address exists, it may remain in account profile data.

Project location is collected separately in Section 6.

Never prefill Project Location from communication address unless explicitly
confirmed by the entrepreneur.

============================================================
21. SECTION 3 — PRIMARY BUSINESS NATURE
============================================================

Heading:

BUSINESS ACTIVITY

E04 may already contain Primary Business Nature.

Possible values:

- Manufacturing
- Processing
- Services
- Trading
- Manufacturing + Trading
- Construction / Infrastructure
- Other
- Not Sure

If E04 already contains a usable answer:

DO NOT ask again.

Show:

PRIMARY BUSINESS NATURE

Manufacturing

Captured in Basic Requirements

[Edit]

If user chooses Edit:
allow changing the same underlying field.

============================================================
22. PRIMARY BUSINESS NATURE = NOT SURE
============================================================

If E04 answer = Not Sure:

E05 may show the question now.

Ask:

WHAT WILL THIS BUSINESS / PROJECT PRIMARILY DO?

Options:

○ Manufacturing
○ Processing
○ Services
○ Trading
○ Manufacturing + Trading
○ Construction / Infrastructure
○ Other
○ Not sure

Do not force a guess.

============================================================
23. SECTION 3 — INDUSTRY / SECTOR
============================================================

Ask:

SELECT YOUR INDUSTRY / SECTOR

Use a searchable structured dropdown / autocomplete.

Suggested prototype values:

- Pharmaceuticals
- Chemicals
- Food Processing
- Textiles
- Automotive
- Electronics
- Renewable Energy
- IT / ITES
- Healthcare
- Logistics
- Hospitality
- Other

Include:

Search industry

If Other:

Show:

Describe Industry / Sector
[________________]

IMPORTANT:

Industry must be stored as structured data where possible.

Free text is supplementary.

============================================================
24. INDUSTRY SEARCH BEHAVIOUR
============================================================

Prototype:

User clicks industry field
        ↓
Search / browse industries
        ↓
Select one
        ↓
Selected industry updates Business DNA
        ↓
Available Activities / Products / Sector Pack may adapt

Do not show regulatory approvals yet.

============================================================
25. SECTION 3 — ACTIVITIES
============================================================

Ask:

WHAT ACTIVITIES WILL YOU PERFORM?

Use multi-select checkboxes.

Options:

☐ Manufacture
☐ Assemble
☐ Process
☐ Store
☐ Package
☐ Sell
☐ Import
☐ Export
☐ Distribute
☐ Provide Services
☐ Research / Development
☐ Other

Allow multiple selections.

If Other:

Show:

Describe Activity
[________________]

============================================================
26. ACTIVITY-DRIVEN ADAPTIVE BEHAVIOUR
============================================================

Activity is a key Business DNA input.

Prototype conditional behavior.

Example:

Manufacture selected
        ↓
Later show Process
        ↓
Later show Production-related branches

Provide Services only
        ↓
Manufacturing-specific process fields remain hidden

Research / Development
        ↓
Laboratory / R&D process option may appear

Import selected
        ↓
Import details will be activated later

Store selected
        ↓
Storage branch may become relevant later

Do NOT build those later detailed branches now.

Only preserve the activation logic.

============================================================
27. SECTION 4 — PRODUCTS / SERVICES
============================================================

Heading:

PRODUCTS / SERVICES

Question:

WHAT WILL YOU PRODUCE OR PROVIDE?

Use a dynamic searchable component.

The options should conceptually depend on selected Industry / Sector.

Example:

Industry:
Pharmaceuticals

Search results might include prototype-safe categories such as:

- Pharmaceutical formulations
- API / bulk drug
- Medical products
- Packaging-related product
- Other

Do not attempt to create a complete government product taxonomy.

Use prototype-safe sample data.

============================================================
28. MULTIPLE PRODUCTS / SERVICES
============================================================

Allow:

+ Add Product / Service

Each row:

Product / Service
[ Search ]

Optional:
Product / Service Description

Allow multiple entries.

Example:

Product 1
Pharmaceutical Formulations

Product 2
Packaging Services

============================================================
29. OTHER PRODUCT / SERVICE
============================================================

If user selects:

Other

Show:

DESCRIBE PRODUCT / SERVICE

[________________________________]

Free text provides supplementary context.

Do not use free text as the only structured regulatory variable where
structured data is available.

============================================================
30. SECTION 4 — PROCESS
============================================================

PROCESS must only appear when relevant.

Show Process section for:

- Manufacturing
- Processing
- Assembly
- Fabrication
- Laboratory / R&D
- other process-based activities

Do NOT show a manufacturing process section to a pure trading/service
business unless another selected activity requires it.

============================================================
31. PROCESS TYPE
============================================================

Ask:

WHAT TYPE OF PROCESS WILL YOU PERFORM?

Options:

○ Manufacturing
○ Chemical Processing
○ Assembly
○ Fabrication
○ Food Processing
○ Packaging
○ Laboratory / R&D
○ Other

Use context-sensitive options where possible.

Do not force all options for every industry.

============================================================
32. PROCESS DESCRIPTION
============================================================

Add:

BRIEF PROCESS DESCRIPTION

Textarea.

Example helper:

“Briefly describe the main steps involved in your process.”

IMPORTANT:

This free-text description is supplementary context.

Regulatory applicability must primarily rely on structured Business DNA
and configured regulatory rules.

Do not let free text appear to automatically make legal determinations.

============================================================
33. PURE SERVICES / TRADING BRANCH
============================================================

If Primary Business Nature = Services

and no manufacturing/process activity is selected:

Hide detailed Process block.

Instead continue naturally to:

Project Stage

Similarly for pure Trading:

Do not force manufacturing process fields.

Prototype this difference.

============================================================
34. SECTION 5 — PROJECT STAGE
============================================================

Heading:

PROJECT STAGE

Ask:

WHAT STAGE IS THE PROJECT CURRENTLY IN?

Options:

○ Idea / Planning
○ Land Acquisition
○ Pre-Establishment
○ Design / Planning
○ Construction
○ Installation
○ Trial Production
○ Ready to Operate
○ Already Operational

Use single select.

============================================================
35. PROJECT STAGE PURPOSE
============================================================

Project Stage affects future regulatory journey sequencing.

Conceptually:

Planning
→ land / establishment-related requirements may be relevant

Construction
→ building / utilities / safety context may be relevant

Ready to Operate
→ pre-operation requirements become important

Already Operational
→ operating approvals / compliance become important

Do NOT generate those approvals yet.

Only store Project Stage.

============================================================
36. EXISTING / EXPANSION STAGE REUSE
============================================================

For an Existing / Expansion / Modification project:

If a current Project Stage is already known from the selected existing
business:

Show it prefilled.

Example:

Current Project Stage
Operational

For Expansion:

Proposed expansion stage
Planning / Pre-Establishment

Do not overwrite the existing business history.

Keep context clear.

============================================================
37. SECTION 6 — PROJECT LOCATION
============================================================

Heading:

PROJECT LOCATION

Supporting text:

“Enter the location of the industrial/business project.”

IMPORTANT:

This is the PROJECT location.

It is NOT:
- account communication address
- authorised person residence
- registered office by default

============================================================
38. STATE
============================================================

STATE

Fixed:

Maharashtra

Show as read-only / fixed selection.

Do not ask the entrepreneur to select another state.

This platform flow is for Maharashtra.

============================================================
39. DISTRICT
============================================================

Ask:

DISTRICT

Use searchable dropdown.

Prototype Maharashtra districts.

Examples may include:

Thane
Pune
Ratnagiri
Raigad
Nashik
Nagpur
Aurangabad / Chhatrapati Sambhajinagar
Kolhapur
etc.

Do not need to build an exhaustive taxonomy manually if the component can
represent a complete list later.

============================================================
40. TALUKA
============================================================

After District is selected:

Show:

TALUKA

Use a dependent dropdown.

Conceptually:

District selected
        ↓
Load Talukas for selected district

Do not show irrelevant Talukas.

============================================================
41. VILLAGE / CITY
============================================================

After Taluka:

Ask:

VILLAGE / CITY

Use searchable dropdown / text-supported selector.

Keep component generic for urban and rural projects.

============================================================
42. PIN
============================================================

Ask:

PIN CODE

Use numeric-format validation appropriate for Indian PIN.

Do not infer regulatory jurisdiction only from free text if structured
location fields are available.

============================================================
43. LOCATION-DRIVEN FUTURE LOGIC
============================================================

Project Location will later feed:

- jurisdiction
- relevant department office
- local authority
- MIDC / Non-MIDC analysis
- land route
- utility route
- incentive scheme matching
- regulatory applicability

Do NOT expose these as final outcomes yet.

Do not show:

“Your MIDC office is X”

unless already known and supported later.

This prompt only captures location.

============================================================
44. MIDC PRE-SEED RELATIONSHIP
============================================================

E04 may already have:

MIDC = Yes / No / Not Sure

Do not ask MIDC again in this prompt.

Project Location is collected independently.

Later MIDC branch will combine:

Project Location
+
E04 MIDC answer
+
later MIDC estate / plot details

Do not duplicate the question here.

============================================================
45. ADAPTIVE QUESTION STATE MODEL
============================================================

The design should conceptually support:

NOT_VISIBLE
VISIBLE
REQUIRED
ANSWERED
VALIDATED
CONFIRMED

Alternative states:

SKIPPED
NOT_APPLICABLE
NEEDS_REVIEW

Do not expose these backend-style labels everywhere.

Use them to design consistent interaction states.

Example:

Process section irrelevant
→ NOT_APPLICABLE

Do not make it look like missing information.

============================================================
46. DATA VERIFICATION IS A DIFFERENT CONCEPT
============================================================

Do not confuse Adaptive Question State with Data Verification State.

Data may later have states such as:

SELF_DECLARED
USER_CONFIRMED
SYSTEM_VERIFIED
DEPARTMENT_VERIFIED
NEEDS_VERIFICATION
INVALID
EXPIRED

For this early discovery step, most new answers will conceptually begin as:

Self-declared / User-confirmed

Do not show unnecessary technical tags on every field.

Only show provenance where useful, especially for reused values.

============================================================
47. REUSED FIELD PRESENTATION
============================================================

When an answer comes from E03/E04, visually distinguish it from a new question.

Example:

PRIMARY BUSINESS NATURE

Manufacturing

✓ Answered earlier in Basic Requirements

[Edit]

Do not make the user reselect it simply to continue.

This pattern should later be reusable throughout E05.

============================================================
48. EDITING A REUSED ANSWER
============================================================

If user chooses Edit:

Show the original control.

Example:

Manufacturing
        ↓ Edit

Options:
Manufacturing
Processing
Services
Trading
...

After save:

Update the SAME Business DNA field.

Do not create duplicate historical answer fields.

For this early prototype, simple edit state is sufficient.

============================================================
49. BUSINESS DNA UPDATE FEEDBACK
============================================================

Do not expose technical database messages.

Use subtle UX feedback.

Examples:

Saved

Answer updated

Next questions adjusted based on your selection

Avoid intrusive alerts.

============================================================
50. PROGRESSIVE DISCLOSURE EXAMPLES TO PROTOTYPE
============================================================

Demonstrate at least these adaptive interactions:

CASE 1

Primary Nature = Manufacturing
        ↓
Industry appears
        ↓
Activities include Manufacture
        ↓
Products appears
        ↓
Process appears

------------------------------------------------------------

CASE 2

Primary Nature = Services
        ↓
Industry appears
        ↓
Activities include Provide Services
        ↓
Products / Services appears
        ↓
Manufacturing Process remains hidden

------------------------------------------------------------

CASE 3

Project operated by registered entity = No
        ↓
Operator / Project Entity appears
        ↓
Relationship field appears

------------------------------------------------------------

CASE 4

Classification = I am not sure
        ↓
No validation error
        ↓
Continue allowed
        ↓
Later derivation indicated subtly

============================================================
51. SAVE & EXIT
============================================================

Every E05 section must support:

Save & Exit

Conceptual behavior:

Current answers saved
        ↓
Return to My Businesses / project context
        ↓
Resume later

Use existing draft patterns.

============================================================
52. RESUME LATER
============================================================

Support a subtle Resume Later action if consistent with existing components.

When user returns:

Restore:
- current section
- previously answered questions
- reused E03/E04 answers
- visible adaptive branches

Do not restart E05 from zero.

============================================================
53. BACK / CONTINUE
============================================================

Use:

Back
Save & Exit
Continue

BACK:
goes to previous E05 section.

From Section 1:
Back → E04

CONTINUE:
validates only relevant currently-required fields.

Do NOT validate hidden / Not Applicable fields.

============================================================
54. SECTION NAVIGATION
============================================================

Optional:

Allow completed previous sections to be revisited.

Example:

1 Classification ✓
2 Identity ✓
3 Industry & Activity •
4 Products & Process
5 Project Stage
6 Location

Do not allow the indicator to become a large wizard sidebar.

Keep it simple.

============================================================
55. VALIDATION PRINCIPLE
============================================================

Validate only relevant visible required fields.

Examples:

Legal Entity Type visible and required
→ validate

Operator details hidden because Registered Entity = Yes
→ do NOT validate

Process hidden for pure Services
→ do NOT mark missing

Classification = Not Sure
→ valid state

============================================================
56. “I AM NOT SURE” PRINCIPLE
============================================================

This is NON-NEGOTIABLE.

Where the product supports Not Sure:

Do not punish the user.

Do not display:

“Invalid answer.”

Use:

Not sure
        ↓
Collect factual information later
        ↓
Needs Verification where necessary
        ↓
Rule engine / officer review later

The entrepreneur should not be forced to guess regulatory facts.

============================================================
57. DO NOT SHOW REGULATORY OUTCOMES YET
============================================================

Do NOT yet show:

- You need MPCB CTE
- You need MIDC approval
- Fire NOC required
- Factory Licence required
- Boiler Permission required
- 12 approvals found
- Approval cost
- Final department list
- Final dependency graph

This E05 part is still Business Discovery.

The Regulatory Journey is generated only after the required Business DNA
has been collected and reviewed.

============================================================
58. RAG / REGULATORY ASSISTANT BOUNDARY
============================================================

Do NOT build the full Regulatory Assistant in this prompt.

If help affordance exists because of shared Phase 0 components, keep it
non-intrusive.

The dedicated RAG-powered Entrepreneur Regulatory Assistant is created later.

Do not make an AI chatbot part of this questionnaire screen.

============================================================
59. P2 SECTOR-PACK ARCHITECTURE
============================================================

Reserve reusable support for future sector-specific question packs.

Concept:

COMMON BUSINESS QUESTIONS
        +
SECTOR PACK
        +
CONDITIONAL FLAGS

Example:

Industry = Pharmaceuticals
        ↓
Pharma Sector Pack may later load

Industry = Chemicals
        ↓
Chemical Sector Pack may later load

IMPORTANT:

Sector-specific packs are P2 extensions.

They must NOT block completion of the current P0/P1 adaptive prototype.

============================================================
60. SECTOR PACK PROTOTYPE PLACEHOLDER
============================================================

After Industry selection, optionally show ONE subtle example block:

“Additional sector-specific information may be requested later.”

Do NOT build a full Pharma questionnaire now.

Do NOT create dozens of sector-specific questions.

Only ensure the component architecture can support them later.

============================================================
61. BUSINESS DNA FIELDS CREATED / UPDATED IN THIS PROMPT
============================================================

Conceptually, this prompt should contribute:

Project Classification
Mega-project consideration
Business / Project Name — reused
Legal Entity Type
Legal Entity / Organisation
PAN / CIN / LLPIN / Registration where applicable
Authorised Person / Promoter relationship
Project Operator
Primary Business Nature — reused where available
Industry / Sector
Activities
Products / Services
Process Type
Process Description
Project Stage
State
District
Taluka
Village / City
PIN

Do not visually expose this as a backend JSON schema.

============================================================
62. DO NOT DUPLICATE E04 DATA
============================================================

Before completing E05, verify:

MIDC?
Already known from E04
→ not asked again

Land?
Already known
→ not asked again

Construction?
Already known
→ not asked again

Water?
Already known
→ not asked again

Power?
Already known
→ not asked again

Primary Nature?
Already known
→ reused

Existing Approvals?
Already known
→ not asked again

============================================================
63. EXAMPLE NEW BUSINESS FLOW
============================================================

Use one prototype path such as:

Project:
Konkan Specialty Foods

Project Type:
New Business / Project

        ↓

Classification:
MSME

Mega project:
No

        ↓

Legal Entity:
Private Limited Company

Organisation:
Konkan Specialty Foods Pvt Ltd

        ↓

Primary Business Nature:
Manufacturing
(reused from E04)

        ↓

Industry:
Food Processing

        ↓

Activities:
Manufacture
Process
Package

        ↓

Products:
Processed Food Product

        ↓

Process:
Food Processing

        ↓

Project Stage:
Planning

        ↓

Location:
Maharashtra
Ratnagiri
Relevant Taluka
Relevant City/Village
PIN

Do not infer approvals yet.

============================================================
64. EXAMPLE SERVICES BUSINESS FLOW
============================================================

Prototype another adaptive state:

Primary Nature:
Services

Industry:
IT / ITES

Activities:
Provide Services
Research / Development

Products / Services:
Software / Technology Services

Process:
Manufacturing process section hidden

Project Stage:
Planning

Location:
Pune

This demonstrates true adaptive behavior.

============================================================
65. EXPANSION EXAMPLE
============================================================

For the existing sample:

Project Type:
Expansion

Based on:
ABC Pharma Pvt Ltd — Thane

Business / Project Name:
ABC Pharma Manufacturing Expansion
(reused from E03)

Current Identity:
ABC Pharma Pvt Ltd

Current Primary Nature:
Manufacturing

Current Industry:
Pharmaceuticals

Do not require these known fields to be entered again.

Allow confirm/edit.

Detailed change categories come later.

============================================================
66. VISUAL DIFFERENCE BETWEEN NEW AND REUSED DATA
============================================================

NEW QUESTION:

Normal question block
with editable control.

REUSED DATA:

Compact confirmed data block
with:
- value
- source label such as “From Basic Requirements”
- Edit

Do not overuse badges.

Keep government-professional styling.

============================================================
67. ACCESSIBILITY
============================================================

Preserve:

- keyboard navigation
- visible focus indicators
- readable form labels
- adequate contrast
- error text + icon
- not color-only states
- logical tab order
- accessible radio groups
- accessible multi-select
- searchable dropdown keyboard behavior
- usable zoom
- responsive layout
- English / Marathi support

============================================================
68. RESPONSIVE DESIGN
============================================================

Desktop:

Use comfortable centered form width / existing portal content area.

Avoid making form stretch excessively across the page.

Tablet:

Keep section indicator + content readable.

Mobile:

Stack:
- context information
- questions
- options
- action buttons

Do not create a different mobile product.

============================================================
69. COMPONENTS TO REUSE / CREATE
============================================================

Reuse existing Phase 0 components where possible.

Build reusable variants for:

Adaptive Question Block
Radio Selection
Multi-select
Searchable Select
Dynamic Add Item
Confirmed / Reused Answer
Not Sure State
Conditional Follow-up
Section Progress
Project Context Strip
Draft Saved
Bottom Navigation
Validation Message
Optional Helper Text
Sector-Pack Placeholder

Use Auto Layout.

============================================================
70. PROTOTYPE INTERACTIONS
============================================================

Prototype:

E04 Continue
        ↓
E05 Section 1 — Project Classification

Section 1 Continue
        ↓
Section 2 — Business Identity

Section 2 Continue
        ↓
Section 3 — Industry & Activity

Section 3 Continue
        ↓
Section 4 — Products / Services & Process

Section 4 Continue
        ↓
Section 5 — Project Stage

Section 5 Continue
        ↓
Section 6 — Project Location

Section 6 Continue
        ↓
NEXT E05 PART PLACEHOLDER ONLY

Do NOT build the next detailed branch.

============================================================
71. NEXT PHASE PLACEHOLDER
============================================================

After Project Location:

Continue
        ↓
Next Adaptive Discovery Section

Placeholder only.

This later section will cover:

MIDC
Land
Investment
Employment
Manufacturing
Building
Utilities
Environment
Safety
etc.

Do NOT generate those sections now.

============================================================
72. FINAL QUALITY CHECK
============================================================

Before completing verify:

[ ] E01 unchanged
[ ] E02 unchanged
[ ] E03 unchanged
[ ] E04 unchanged

[ ] E05 created as adaptive flow
[ ] E05 is NOT one giant form
[ ] Progressive disclosure is visible
[ ] Business / Project Name reused from E03
[ ] Business / Project Name is NOT asked again
[ ] Project Type reused from E03
[ ] Project Type is NOT asked again
[ ] E04 Primary Business Nature reused
[ ] E04 MIDC answer not repeated
[ ] E04 Land answer not repeated
[ ] E04 Construction answer not repeated
[ ] E04 Water answer not repeated
[ ] E04 Power answer not repeated
[ ] E04 Existing Approvals answer not repeated

[ ] MSME / Large / Mega / Not Sure supported
[ ] Mega-project follow-up supported
[ ] No Mega eligibility claim made

[ ] Legal Entity Type included
[ ] Organisation Name included
[ ] PAN/CIN/LLPIN fields conditional
[ ] Project operator conditional branch works

[ ] Industry searchable
[ ] Activities multi-select
[ ] Products / Services dynamic
[ ] Multiple products supported
[ ] Process shown only where relevant
[ ] Services branch can skip manufacturing process

[ ] Project Stage captured
[ ] Project Location separate from account address
[ ] Maharashtra fixed as state
[ ] District → Taluka → Village/City sequence works
[ ] PIN included

[ ] Not Sure accepted without forcing a guess
[ ] Hidden questions are not validated
[ ] Not Applicable is not treated as missing
[ ] Save & Exit supported
[ ] Resume Later supported
[ ] Draft Saved state supported
[ ] Section progress shown
[ ] No fixed completion percentage shown

[ ] P2 sector-pack architecture reserved
[ ] Full sector packs NOT built
[ ] No regulatory approvals generated yet
[ ] No department-specific pages built
[ ] No Business DNA review page built
[ ] No Regulatory Journey built
[ ] No RAG assistant built
[ ] No later E05 sections built

============================================================
73. FINAL EXPECTED EXPERIENCE
============================================================

The entrepreneur should experience:

BASIC REQUIREMENTS
        ↓
BUSINESS DISCOVERY

“What kind of project is this?”
        ↓
“Who is the business/entity?”
        ↓
“What does the business do?”
        ↓
“What industry is it in?”
        ↓
“What activities will happen?”
        ↓
“What products/services are involved?”
        ↓
“What process is involved, if relevant?”
        ↓
“What stage is the project at?”
        ↓
“Where is the project located?”

while the system is conceptually doing:

ANSWER
        ↓
UPDATE BUSINESS DNA
        ↓
RE-EVALUATE RULES
        ↓
ACTIVATE / DEACTIVATE FUTURE QUESTIONS
        ↓
CONTINUE ADAPTIVE DISCOVERY

============================================================
FINAL INSTRUCTION
============================================================

Create ONLY:

E05 Adaptive Business Questionnaire — Part 1

covering:

Project Classification
Business Identity
Primary Business Nature
Industry / Sector
Activities
Products / Services
Process
Project Stage
Project Location

Preserve E03/E04 data reuse exactly.

Do not ask the same information twice.

Do not create later E05 sections.

Do not generate regulatory approvals yet.

Do not change any previously completed screen.

Stop after Project Location and prototype the Continue action only
to the next adaptive-discovery placeholder.