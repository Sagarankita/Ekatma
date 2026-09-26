Continue the EXISTING EKATMA Entrepreneur-side Figma implementation.

============================================================
EKATMA — ENTREPRENEUR SIDE
PROMPT 2
E03 — CREATE BUSINESS / PROJECT
E04 — BASIC REQUIREMENTS
============================================================

IMPORTANT:
This prompt is ONLY for:

E03 — Create Business / Project
E04 — Basic Requirements

Do NOT create E05 Adaptive Business Questionnaire yet.
Do NOT create Business DNA Review yet.
Do NOT create Regulatory Journey yet.
Do NOT create any application, document, compliance, incentive,
inspection, grievance, RAG, or department-side screens yet.

Stop after E04.

============================================================
1. PRESERVE ALL COMPLETED WORK EXACTLY
============================================================

The existing EKATMA implementation is already approved.

DO NOT:
- redesign existing screens
- regenerate existing screens
- restyle existing components
- change existing branding
- change colors
- change typography
- change spacing
- change existing button styles
- change card styles
- change table styles
- change input styles
- modify the header
- modify the footer
- modify the accessibility strip
- modify logos
- modify authentication
- modify validation
- modify OTP
- modify registration
- modify the Business Portfolio layout
- create a new design system
- alter existing successful login routing
- add the full Entrepreneur navbar/sidebar yet

Preserve exactly:

- Public Landing
- Login/Register dropdown
- Industrial Login
- Email OTP Verification
- OTP resend/countdown
- Complete Registration
- Registration Success
- Phase 0 components
- Government of Maharashtra accessibility strip
- National Emblem + Satyameva Jayate
- Government of Maharashtra identity
- EKATMA identity
- Header
- Footer
- Existing typography
- Existing colors
- Existing spacing
- Existing buttons/forms/cards/tables
- Existing English / Marathi compatibility
- Existing accessibility behavior
- E02 Business Portfolio / My Businesses

E01 remains frozen.
E02 remains unchanged.

============================================================
2. ENTRY FLOW
============================================================

The flow entering this prompt is:

Successful Login
        ↓
E02 — My Businesses
        ↓
+ Create New Business / Project
        ↓
E03 — Create Business / Project
        ↓
E04 — Basic Requirements
        ↓
Later:
E05 — Adaptive Business Questionnaire

Do NOT generate E05 in this prompt.

============================================================
3. CORE PRODUCT PRINCIPLE
============================================================

The entrepreneur should NOT be expected to know:

- which government departments apply
- which approvals are required
- which NOCs are required
- which licences are required
- which statutory forms apply
- which inspection is required

The entrepreneur only describes the business/project.

EKATMA later determines the regulatory journey.

Therefore:

E03
= define what project is being created

E04
= collect a small number of high-level facts the entrepreneur is
likely to already know

E05 later
= progressively ask detailed adaptive follow-up questions

Do NOT turn E03 or E04 into a detailed regulatory form.

============================================================
4. E03 — CREATE BUSINESS / PROJECT
============================================================

Create a NEW page:

E03 — Create Business / Project

Use the SAME authenticated government portal shell and SAME visual
language as E02 and Phase 0.

Breadcrumb:

Home
>
My Businesses
>
Create Business / Project

Page title:

Create Business / Project

Supporting text:

"Start by telling us what you are creating. Detailed business
information will be collected in the next steps."

Keep wording concise and government-professional.

============================================================
5. E03 — FIELD 1: BUSINESS / PROJECT NAME
============================================================

Ask:

BUSINESS / PROJECT NAME

Input field.

Placeholder example:

"e.g. ABC Pharma Manufacturing Unit"

Supporting helper text may say:

"Enter a name that helps you identify this business/project."

IMPORTANT DATA RULE:

The Business / Project Name entered here becomes the CANONICAL
source value for this project creation flow.

It must later be reused in E05 Business Identity.

E05 must NOT ask the entrepreneur to type the Business / Project
Name again.

Later E05 should show this value as:
- already known
- pre-filled
- confirmed/editable

Do not create E05 now.

============================================================
6. E03 — FIELD 2: PROJECT TYPE
============================================================

Ask:

WHAT ARE YOU CREATING?

Use a clear radio-card or radio-option pattern consistent with
existing Phase 0 components.

Options:

○ New business / project

○ Existing business / project

○ Expansion of existing business

○ Modification / diversification

Each option may have a short explanation.

NEW BUSINESS / PROJECT
Starting a new project/business journey.

EXISTING BUSINESS / PROJECT
Registering or managing an already existing business/project.

EXPANSION OF EXISTING BUSINESS
Increasing or adding to an existing business/project.

MODIFICATION / DIVERSIFICATION
Changing the activity, product, process, machinery, building,
utilities or other project characteristics.

Do not include legal conclusions.

============================================================
7. E03 — PROJECT TYPE BEHAVIOUR
============================================================

A. NEW BUSINESS / PROJECT

If selected:

Continue normally.

Do not ask for an existing business.

------------------------------------------------------------

B. EXISTING BUSINESS / PROJECT

If selected:

Continue into the existing-business discovery path later.

Do not force the user to recreate everything as a new business.

At this stage, keep it simple.

------------------------------------------------------------

C. EXPANSION

If selected:

Show an additional field:

SELECT EXISTING BUSINESS / PROJECT

Use existing business/project data from the E02 portfolio.

Example dropdown:

ABC Pharma Pvt Ltd — Thane
Konkan Feeds — Ratnagiri
Sahyadri Electronics Pvt Ltd — Pune

Conceptual behavior:

Expansion
    ↓
Select existing business/project
    ↓
Later load Current Business DNA
    ↓
Ask What Are You Changing?
    ↓
Current Value → Proposed Value
    ↓
Regulatory Delta Analysis later

Do NOT build the delta-analysis screen now.

------------------------------------------------------------

D. MODIFICATION / DIVERSIFICATION

Same basic pattern:

Modification / Diversification
    ↓
Select existing business/project
    ↓
Later load Current Business DNA
    ↓
Current → Proposed change workflow

Do not treat it as a completely new business.

============================================================
8. E03 — OPTIONAL PROJECT DESCRIPTION
============================================================

Add:

SHORT PROJECT DESCRIPTION
Optional

Textarea.

Example placeholder:

"Briefly describe the proposed project."

Keep this optional.

Do not use this free text as a replacement for structured data
that will be collected later.

Structured answers in E05 will drive regulatory logic.

============================================================
9. E03 — ACTIONS
============================================================

Bottom action area:

Back

Save & Exit

Continue

Show a subtle draft-saving state such as:

Draft saved

or

Saved just now

Do not use excessive autosave animation.

BACK
→ E02 My Businesses

SAVE & EXIT
→ save current draft
→ return to E02

CONTINUE
→ E04 Basic Requirements

============================================================
10. E03 — VALIDATION
============================================================

Minimum required fields:

- Business / Project Name
- Project Type

If Expansion or Modification:
- Existing Business / Project selection is required

Project Description remains optional.

Use the existing validation pattern from Phase 0.

Do not invent a different error style.

============================================================
11. E04 — BASIC REQUIREMENTS
============================================================

Create a NEW page:

E04 — Basic Requirements

Breadcrumb:

Home
>
My Businesses
>
Create Business / Project
>
Basic Requirements

Page title:

Basic Requirements

Supporting message:

"Tell us only what you already know about your project.
You do not need to know which licences, approvals or NOCs are required.
EKATMA will determine them from your business details."

This message should be clearly visible but not designed as a large hero.

============================================================
12. SHOW PROJECT CONTEXT FROM E03
============================================================

At the top of E04 show a small summary/context area.

Example:

Project:
ABC Pharma Manufacturing Unit

Project Type:
New Business / Project

IMPORTANT:

Project Type is ALREADY KNOWN from E03.

Do NOT ask:

New / Existing / Expansion / Modification

again in E04.

If the user wants to change it, provide a small:

Edit

link or back navigation to E03.

============================================================
13. E04 PRINCIPLE — PRE-SEED ONLY
============================================================

E04 is NOT the Adaptive Business Questionnaire.

It is only a lightweight PRE-SEED.

Ask only high-level facts that the entrepreneur likely already knows.

The purpose is:

E04 answer
      ↓
Pre-seed Business DNA
      ↓
E05 reads answer
      ↓
E05 does NOT repeat the question
      ↓
E05 asks only relevant follow-up details

Do NOT make E04 long.

Do NOT turn E04 into a giant form.

============================================================
14. E04 QUESTION 1 — LAND NEED
============================================================

Ask:

DO YOU NEED LAND FOR THIS PROJECT?

Options:

○ Yes
○ No
○ Not sure

Store this as a pre-seeded Business DNA input.

If YES:
do not ask detailed land requirements yet.

If NO:
do not ask land acquisition details.

If NOT SURE:
preserve Not Sure for later adaptive discovery.

============================================================
15. E04 QUESTION 2 — LAND / POSSESSION STATUS
============================================================

Show this only where logically relevant.

Ask at a SIMPLE level:

WHAT IS YOUR CURRENT LAND STATUS?

Options may include:

○ Land already in possession
○ Land identified but possession pending
○ Land acquisition / allotment in progress
○ Land required / not yet acquired
○ Not sure

Do NOT ask yet:

- survey number
- plot number
- land area
- ownership details
- agricultural status
- NA permission
- BTAL
- MIDC estate details
- allotment number
- land document details

Those belong later in Adaptive Discovery.

============================================================
16. E04 QUESTION 3 — MIDC / NON-MIDC
============================================================

Ask:

IS THE PROJECT LOCATED IN MIDC?

Options:

○ Yes
○ No
○ Not sure

Use plain supporting text if useful:

"If you are unsure, select 'Not sure'. EKATMA can collect more
location details later."

Do NOT force the entrepreneur to guess.

Do NOT ask MIDC Estate or Plot Number here.

Those belong later.

============================================================
17. E04 QUESTION 4 — CONSTRUCTION
============================================================

Ask:

WHAT IS THE CURRENT PREMISES / CONSTRUCTION SITUATION?

Options:

○ New construction planned
○ Existing premises
○ Modification of existing premises
○ Not sure

This is a simple high-level fact.

Do NOT ask yet:

- built-up area
- building height
- floors
- occupancy
- construction status
- fire-load information

Those belong in E05.

============================================================
18. E04 QUESTION 5 — WATER
============================================================

Ask:

WILL THE PROJECT REQUIRE WATER?

Options:

○ Yes
○ No
○ Not sure

Do NOT ask yet:

- KL/day
- source
- MIDC water
- groundwater
- surface water
- treatment
- wastewater quantity

Those are E05 follow-ups.

============================================================
19. E04 QUESTION 6 — POWER
============================================================

Ask:

WILL THE PROJECT REQUIRE ELECTRICITY / POWER?

Options:

○ Yes
○ No
○ Not sure

Do NOT ask yet:

- connected load
- LT / HT
- substation
- infrastructure requirement

Those belong later.

============================================================
20. E04 QUESTION 7 — PRIMARY BUSINESS NATURE
============================================================

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

This is a broad business-nature classification only.

Do NOT ask specific industry/sector yet.

Do NOT ask products yet.

Do NOT ask detailed process yet.

Those are part of Adaptive Discovery.

============================================================
21. E04 QUESTION 8 — EXISTING APPROVALS
============================================================

Ask:

DOES THIS BUSINESS / PROJECT ALREADY HAVE ANY
APPROVALS, LICENCES OR NOCs?

Options:

○ Yes
○ No
○ Not sure

If YES:

Do NOT create the full approval-entry form here.

Show only a small acknowledgement such as:

"Existing approval details will be collected in the next stage."

Do not ask:
- department
- licence number
- issue date
- expiry
- certificate upload

yet.

============================================================
22. E04 — DO NOT ASK THESE QUESTIONS
============================================================

Do NOT ask in E04:

- Industry / sector
- Detailed activity
- Products
- Services
- Production capacity
- Process description
- Investment
- Employment
- State
- District
- Taluka
- Village / city
- PIN
- MIDC estate
- MIDC plot number
- Plot area
- Land ownership
- Agricultural land
- Land-use permission
- BTAL / NA
- Water quantity
- Water source
- Wastewater
- Drainage
- Air emissions
- Hazardous materials
- Hazardous waste
- Boiler
- Pressure vessel
- Dangerous machinery
- Fire-risk flags
- Building area
- Building height
- Floors
- HT power
- Warehouse
- Storage
- Import / Export
- Logistics
- Detailed existing approvals
- Existing applications
- Incentive attributes
- Regulatory departments
- Required approvals
- Required licences
- Required NOCs

All of these belong to later adaptive discovery.

============================================================
23. CRITICAL E04 → E05 DATA REUSE CONTRACT
============================================================

This is NON-NEGOTIABLE.

Every E04 answer becomes a pre-seeded Business DNA input.

When E05 is created later:

E05 must NOT ask the same question again if E04 already has
a usable answer.

Example:

E04:
MIDC = YES

E05:
Do NOT ask:
"Is your project located in MIDC?"

Instead immediately ask the relevant follow-up:

MIDC Estate
Plot Number
Allotment Status
etc.

------------------------------------------------------------

E04:
Water = YES

E05:
Do NOT ask:
"Will the project require water?"

Instead ask:

Daily requirement
Water source
etc.

------------------------------------------------------------

E04:
Power = YES

E05:
Do NOT ask:
"Will the project require electricity?"

Instead ask:

Connected load
LT / HT
etc.

------------------------------------------------------------

E04:
Primary Nature = Manufacturing

E05:
Do NOT ask:
"What does your business primarily do?"

Instead continue into:

Industry
Activities
Products
Process
Production
etc.

------------------------------------------------------------

E04:
Existing approvals = YES

E05:
Do NOT ask:
"Do you have existing approvals?"

Instead show:

Add Existing Approval
and related details.

============================================================
24. WHEN E05 MAY ASK AGAIN LATER
============================================================

The same high-level question may only reappear if:

1. E04 answer = Not Sure

OR

2. E04 answer is missing

OR

3. user explicitly chooses Edit / Change

Otherwise reuse the stored answer.

============================================================
25. BUSINESS / PROJECT NAME REUSE RULE
============================================================

Also preserve this rule from E03:

E03 captures:

Business / Project Name

Therefore later E05 Business Identity must:

- prefill the same Business / Project Name
- treat it as already known
- allow edit if needed
- NOT ask the entrepreneur to type it again

Do not create two independent name fields.

============================================================
26. QUESTION PRESENTATION
============================================================

E04 should feel simple and reassuring.

Do not present all questions as a dense government form.

Use:

- clear question heading
- short helper text where needed
- radio options / simple cards
- adequate spacing
- progressive logical grouping

Possible grouping:

LAND & LOCATION CONTEXT
- Need land?
- Land status
- MIDC?

PROJECT SETUP
- Construction situation
- Water?
- Power?

BUSINESS
- Primary business nature
- Existing approvals?

Keep it compact.

============================================================
27. PROGRESS INDICATOR
============================================================

If using a progress indicator, use a simple stage indicator.

Example:

Create Project
   ✓

Basic Requirements
   CURRENT

Adaptive Discovery
   NEXT

Do NOT show a fake percentage such as:

27% Complete

because the adaptive questionnaire length will later vary depending
on answers.

============================================================
28. SAVE / DRAFT BEHAVIOUR
============================================================

Include:

Back
Save & Exit
Continue

Show:

Draft Saved

Conceptual behavior:

Any answer entered
      ↓
Save draft
      ↓
Can leave and return later
      ↓
Restore answers

Do not create a complex autosave system visually.

============================================================
29. E04 VALIDATION
============================================================

Do not unnecessarily force technical certainty.

Where supported, allow:

Not Sure

because the Adaptive Business workflow explicitly supports
uncertainty.

Required high-level questions should accept:

Yes
No
Not Sure

where appropriate.

Do not force the entrepreneur to make legal or technical guesses.

============================================================
30. EXPANSION / MODIFICATION HANDLING
============================================================

If Project Type from E03 is:

Expansion
or
Modification / Diversification

E04 should show the selected existing business/project context.

Example:

Based on:
ABC Pharma Pvt Ltd
Thane

Project Type:
Expansion

Do NOT create a completely blank new-business flow.

Conceptually preserve:

SELECT EXISTING BUSINESS
        ↓
LOAD CURRENT BUSINESS DNA
        ↓
E04 PRE-SEED / VERIFY HIGH-LEVEL CONTEXT
        ↓
E05 LATER:
WHAT ARE YOU CHANGING?
        ↓
CURRENT VALUE → PROPOSED VALUE
        ↓
REGULATORY IMPACT LATER

Do not create Current → Proposed detailed screens in this prompt.

============================================================
31. EXISTING BUSINESS HANDLING
============================================================

If Project Type = Existing Business / Project:

Make the page copy appropriate for an existing business.

Do not assume all approvals/data are absent.

Existing approvals may be Yes.

Existing land may already be available.

Existing premises may exist.

Later discovery will capture full current Business DNA.

============================================================
32. NEW BUSINESS HANDLING
============================================================

If Project Type = New Business / Project:

Do not assume:

- land is required
- construction is required
- manufacturing is selected
- MIDC applies
- water applies
- power applies
- approvals are known

Let the entrepreneur answer.

============================================================
33. DATA STATES TO PRESERVE
============================================================

Answers should conceptually support:

ANSWERED

NOT SURE / NEEDS LATER DISCOVERY

and later:

CONFIRMED
NOT APPLICABLE
NEEDS REVIEW

Do not expose technical state names unnecessarily on E04.

Keep the UI user-friendly.

============================================================
34. DO NOT DERIVE REGULATORY OUTCOMES YET
============================================================

E03 and E04 do NOT determine final approvals visually.

Do not show:

"Based on your answers you need MPCB."

Do not show:

"You need Fire NOC."

Do not show:

"You need Factory Licence."

Do not show:

"7 approvals identified."

That happens after full Adaptive Business Discovery and regulatory
rule evaluation.

E04 only captures preliminary facts.

============================================================
35. DEPARTMENT-AGNOSTIC DESIGN
============================================================

Do not make E03 or E04 MIDC-specific.

Do not make them MPCB-specific.

These screens create the project for the full EKATMA ecosystem.

One project may later interact with:

MIDC
MPCB
Fire
DISH
Boilers
Legal Metrology
Utilities
Planning Authority
Sector Authorities
Other Maharashtra departments

E03/E04 must remain generic.

============================================================
36. ACCESSIBILITY
============================================================

Preserve existing accessibility patterns:

- adequate contrast
- visible keyboard focus
- logical tab order
- clear labels
- readable validation
- radio options with proper labels
- icon + text where status exists
- English / Marathi compatibility
- responsive behavior
- usable zoom
- sufficiently large click/touch targets

Do not rely only on color.

============================================================
37. RESPONSIVE BEHAVIOUR
============================================================

Desktop:
Use the existing content width and Phase 0 form layout.

Tablet:
Maintain clear question grouping.

Mobile:
Stack options vertically.

Do not create an unrelated mobile design system.

============================================================
38. PROTOTYPE INTERACTIONS
============================================================

Create prototype links:

E02 — My Businesses
        ↓
+ Create New Business / Project
        ↓
E03

E03 Back
        ↓
E02

E03 Save & Exit
        ↓
E02

E03 Continue
        ↓
E04

E04 Back
        ↓
E03

E04 Save & Exit
        ↓
E02

E04 Continue
        ↓
E05 Adaptive Business Questionnaire PLACEHOLDER ONLY

IMPORTANT:

Do not generate E05.

Create only the destination placeholder/reference for the next prompt.

============================================================
39. E03 VARIANTS TO DEMONSTRATE
============================================================

Create enough prototype states to demonstrate:

A. New Business selected

B. Existing Business selected

C. Expansion selected
→ existing business selector appears

D. Modification / Diversification selected
→ existing business selector appears

Do not create four completely separate designs.

Use reusable component variants / conditional states.

============================================================
40. E04 VARIANTS TO DEMONSTRATE
============================================================

Show enough prototype states to communicate conditional logic.

Examples:

Variant A:
Need Land = Yes

Variant B:
Need Land = No
→ land-status follow-up is hidden / marked not required

Variant C:
MIDC = Not Sure

Variant D:
Expansion project showing selected existing business context

Keep variants manageable.

Do not duplicate the whole page unnecessarily.

============================================================
41. SAMPLE DATA
============================================================

Use the business started from E02.

Example:

Business / Project Name:
ABC Pharma Manufacturing Expansion

Project Type:
Expansion of existing business

Existing Business:
ABC Pharma Pvt Ltd — Thane

Basic Requirements:

Need land:
No

Current land:
Already in possession

MIDC:
Yes

Construction:
Modification of existing premises

Water:
Yes

Power:
Yes

Primary business nature:
Manufacturing

Existing approvals:
Yes

This sample is only for prototype demonstration.

Do not infer actual statutory approvals from it.

============================================================
42. COMPONENT REUSE
============================================================

Use reusable components for:

- Question block
- Radio group
- Radio-card choice
- Helper text
- Form section
- Project context summary
- Save state
- Back / Save & Exit / Continue action bar
- Existing business selector
- Validation state
- Step indicator

Use Auto Layout.

Do not build one-off visual elements when an existing Phase 0
component can be reused.

============================================================
43. VISUAL QUALITY
============================================================

The pages should feel:

official
clean
simple
guided
accessible
trustworthy
consistent with Government of Maharashtra
consistent with existing EKATMA

Do not use:

- glassmorphism
- gradients
- startup illustrations
- AI illustrations
- oversized cards
- floating chatbot
- decorative dashboards
- random statistics
- unnecessary graphs
- excessive shadows
- excessive rounding
- animations that distract from form completion

============================================================
44. FINAL CONSISTENCY CHECK
============================================================

Before finishing verify:

[ ] Existing E01 remains unchanged
[ ] Existing E02 remains unchanged
[ ] No navbar/sidebar changes were made
[ ] E03 created
[ ] E04 created
[ ] E05 NOT created
[ ] Business / Project Name captured only in E03
[ ] E05 later will reuse E03 Business / Project Name
[ ] Project Type captured only in E03
[ ] E04 displays Project Type but does not ask again
[ ] Expansion / Modification selects existing business
[ ] Expansion / Modification does not behave as a brand-new project
[ ] E04 is only a high-level pre-seed
[ ] E04 does not ask detailed adaptive questions
[ ] MIDC / Non-MIDC / Not Sure supported
[ ] Land need/status supported
[ ] Construction situation supported
[ ] Water supported
[ ] Power supported
[ ] Primary business nature supported
[ ] Existing approvals supported
[ ] Not Sure supported where appropriate
[ ] E04 answers are marked for later reuse
[ ] E05 must not repeat known E04 questions
[ ] No approval/NOC determination is shown yet
[ ] No department-specific architecture introduced
[ ] No RAG/chatbot screen introduced yet
[ ] No regulatory journey created yet
[ ] Existing government shell preserved
[ ] Accessibility preserved
[ ] English / Marathi compatibility preserved

============================================================
45. FINAL EXPECTED FLOW
============================================================

MY BUSINESSES
        ↓
CREATE NEW BUSINESS / PROJECT
        ↓
E03

Business / Project Name
+
Project Type
+
Optional Description

        ↓

E04 BASIC REQUIREMENTS

Land?
Land status?
MIDC / Non-MIDC / Not Sure?
Construction?
Water?
Power?
Primary business nature?
Existing approvals?

        ↓

SAVE AS PRE-SEED DATA

        ↓

NEXT:
E05 ADAPTIVE DISCOVERY

where known answers are REUSED rather than asked again.

============================================================
FINAL INSTRUCTION
============================================================

Create ONLY:

E03 — Create Business / Project
E04 — Basic Requirements

Do not modify anything already completed.
Do not create E05 automatically.
Do not continue to later screens.

Stop after E04 is complete and prototyped.