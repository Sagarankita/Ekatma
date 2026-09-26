Continue the EXISTING EKATMA Entrepreneur-side Figma implementation.

============================================================
EKATMA — ENTREPRENEUR SIDE
E02 — BUSINESS PORTFOLIO / MY BUSINESSES
============================================================

IMPORTANT:
This prompt is ONLY for E02 — Business Portfolio / My Businesses.

DO NOT create E03, E04, Adaptive Business Profile, Regulatory Journey,
Application screens, Documents, Compliance, Incentives, Department screens,
or any later feature in this prompt.

Those will be created in later prompts.

============================================================
1. ABSOLUTELY LOCK THE EXISTING IMPLEMENTATION
============================================================

The current EKATMA implementation is already approved.

DO NOT:
- redesign it
- regenerate it
- restyle it
- simplify it
- rename existing elements
- rebuild existing pages
- alter branding
- change the navigation structure of completed screens
- create a second design system
- create new global colors
- change typography
- change spacing tokens
- change header/footer
- change authentication fields
- modify registration
- modify OTP
- modify authentication validation

The following are FROZEN:

- Public EKATMA landing page
- Government accessibility strip
- National Emblem + Satyameva Jayate
- Government of Maharashtra identity / logo
- EKATMA logo and portal identity
- Existing header
- Existing footer
- Existing typography
- Existing color system
- Existing spacing system
- Existing buttons
- Existing form components
- Existing cards
- Existing tables
- Existing breadcrumb styling
- Existing accessibility behavior
- English / Marathi compatibility
- Login / Register dropdown
- Industrial Login
- Email OTP verification
- OTP resend / countdown
- Complete Registration form
- Registration Success
- Existing authentication validations
- Existing Phase 0 design-system components

E01 — Registration / Login is COMPLETE and FROZEN.

Do NOT redesign E01.

============================================================
2. ONLY APPROVED CHANGE TO AUTHENTICATION FLOW
============================================================

The ONLY permitted change related to the existing login flow is:

Successful Industrial Login
        ↓
E02 — Business Portfolio / My Businesses

Do not visually alter the Industrial Login page.

Only update its successful-login prototype destination.

============================================================
3. CREATE A NEW SCREEN
============================================================

Create:

E02 — BUSINESS PORTFOLIO / MY BUSINESSES

This must be a completely NEW authenticated Entrepreneur page.

It must use the SAME EKATMA government shell and SAME visual language
as the already completed Phase 0 implementation.

It should clearly feel like:

"The entrepreneur has logged into EKATMA and is now choosing which
business/project they want to manage."

It must NOT look like:
- a startup SaaS dashboard
- a banking app
- a CRM dashboard
- an independent new product
- a separate website

============================================================
4. PURPOSE OF E02
============================================================

One Entrepreneur account can manage:

ONE ACCOUNT
    ↓
ONE OR MORE BUSINESSES / PROJECTS
    ↓
EACH PROJECT HAS ITS OWN:
- Business DNA
- Master Project Dossier
- Regulatory Journey
- Applications
- Departments
- Documents
- Inspections
- Compliance obligations
- Incentives
- Regulatory changes
- Expansion / modification lifecycle

The user must therefore first choose a business/project before entering
the detailed Entrepreneur workspace.

DO NOT merge data from multiple businesses into one project.

============================================================
5. AUTHENTICATED PAGE SHELL
============================================================

Reuse the existing authenticated government portal shell.

Keep:

- Government accessibility strip
- Existing EKATMA header
- Existing logos
- Existing typography
- Existing button system
- Existing page width / spacing
- Existing government styling
- Existing footer
- accessibility behavior
- bilingual compatibility

Do not introduce a full Entrepreneur sidebar yet unless it already exists.

E02 is the Business Portfolio entry screen before a specific project
has been selected.

============================================================
6. PAGE HEADER
============================================================

Main page title:

MY BUSINESSES

Supporting text:

"Manage your businesses and projects registered with EKATMA."

Or similar concise government-portal wording.

Do not make the text promotional.

PRIMARY CTA:

+ Create New Business / Project

Use the existing primary button component.

Place it clearly near the page heading.

============================================================
7. BUSINESS PORTFOLIO SUMMARY
============================================================

Above the project list, create a very compact overview if it fits naturally
within the current design language.

Possible information:

Businesses / Projects
Active Applications
Actions Required
Upcoming Compliance

Example:

Businesses / Projects      3
Active Applications        7
Actions Required           2
Upcoming Compliance        1

IMPORTANT:
These are simple portfolio-level summary values.

Do NOT create a complex analytics dashboard.

Do NOT create:
- charts
- graphs
- trend cards
- departmental analytics
- process-mining visualisations

Those belong elsewhere.

============================================================
8. SEARCH + FILTER TOOLBAR
============================================================

Create a clean toolbar above the project cards/list.

Include:

SEARCH
Placeholder:
"Search by business, project, industry or location"

FILTER BY PROJECT STAGE

Options may include:
- Planning
- Land Acquisition
- Pre-Establishment
- Construction
- Installation
- Trial Production
- Ready to Operate
- Operational

FILTER BY JOURNEY / ACTION STATE

Examples:
- All
- Action Required
- In Progress
- Under Department Review
- Inspection Upcoming
- Compliance Due
- No Immediate Action

Do not introduce a new underlying regulatory status system here.

These are user-facing portfolio filters only.

Use the canonical application states later within individual applications.

============================================================
9. BUSINESS / PROJECT CARD COMPONENT
============================================================

Create a reusable BUSINESS PROJECT CARD component.

The card must remain GENERIC.

Do not design an "MPCB card" or "MIDC card".

A project can simultaneously interact with several departments.

Each card should include:

A. BUSINESS / PROJECT NAME

Example:
ABC Pharma Pvt Ltd

Subtext:
Pharmaceutical Manufacturing Unit

B. LOCATION

Example:
Thane, Maharashtra

C. INDUSTRY

Example:
Pharmaceutical Manufacturing

D. PROJECT STAGE

Example:
Pre-Establishment

E. OVERALL JOURNEY STATE

Use a simple user-facing status such as:

- Action Required
- In Progress
- Under Review
- On Track
- Compliance Due
- Inspection Upcoming

Do not invent an overall legal approval status.

This is only a portfolio-level summary.

F. ACTIVE APPLICATIONS

Example:

Active Applications: 3

Optionally display a short preview such as:

MPCB — Consent to Establish
MIDC — Building / Planning
Fire — Provisional Fire

IMPORTANT:
Department names are examples only.

The card architecture must work with ANY configured department.

G. ACTIONS REQUIRED

Example:

2 Actions Required

Possible short contextual examples:
- Respond to department query
- Upload required document

Do not display excessive detail on the card.

H. UPCOMING COMPLIANCE

Example:

Next Compliance:
Environmental return · 18 Oct 2026

If the project is not yet operational:

No current compliance obligation

I. INSPECTION

Example:

Inspection Scheduled
12 Oct 2026

OR

No upcoming inspection

J. INCENTIVES

Example:

1 Incentive Action

OR

No pending incentive action

K. ALERTS

Show a subtle alert indicator only if relevant.

Examples:
- Query Raised
- Document Expiring
- SLA Attention
- Compliance Due
- Regulatory Change

Do NOT overload each project card with every possible alert.

L. PRIMARY CARD ACTION

OPEN BUSINESS

This is the main card CTA.

Clicking it will eventually open the Entrepreneur Command Centre
for the selected business/project.

For the current prototype:
Open Business
→ placeholder / later Entrepreneur Command Centre destination

Do not build the Command Centre in this prompt.

============================================================
10. SAMPLE PROJECT DATA
============================================================

Create at least 3 realistic Maharashtra business/project cards.

PROJECT 1

ABC Pharma Pvt Ltd

Industry:
Pharmaceutical Manufacturing

Location:
Thane, Maharashtra

Stage:
Pre-Establishment

Journey:
Action Required

Active Applications:
3

Possible example department context:
- MPCB
- MIDC
- Fire

Actions Required:
2

Inspection:
Not yet scheduled

Upcoming Compliance:
None yet

Incentive Action:
1 possible action

------------------------------------------------------------

PROJECT 2

Konkan Feeds

Industry:
Cattle Feed Manufacturing

Location:
Ratnagiri, Maharashtra

Stage:
Construction

Journey:
In Progress

Active Applications:
2

Example department context:
- MIDC / local planning where applicable
- DISH / factory-related service

Action Required:
0 or 1

Inspection:
Upcoming

Compliance:
None yet

------------------------------------------------------------

PROJECT 3

Create another project from a different sector and district.

Example:

Sahyadri Electronics Pvt Ltd

Industry:
Electronics Manufacturing

Location:
Pune, Maharashtra

Stage:
Operational

Journey:
Compliance Due

Active Applications:
1

Upcoming Compliance:
1

Inspection:
No immediate inspection

Incentive Action:
Optional

IMPORTANT:
Use realistic prototype-safe values.

Do not invent unsupported statutory conclusions or legal eligibility.

============================================================
11. MULTI-DEPARTMENT ARCHITECTURE
============================================================

This rule is NON-NEGOTIABLE.

Do not hard-code the portfolio for only:

MIDC
or
MPCB.

A single business may have simultaneous requirements across:

- MIDC
- MPCB
- Fire
- DISH / Factory Safety
- Directorate of Boilers
- Legal Metrology
- Utilities
- Local planning authority
- Sector-specific authority
- Future Maharashtra departments

Therefore every project card and status structure must remain
department-agnostic.

Think:

ONE BUSINESS
      ↓
MANY DEPARTMENTS
      ↓
MANY SERVICES

Some services may be:
- sequential
- parallel
- conditional
- not applicable

But E02 should show only a concise portfolio summary.

============================================================
12. BUSINESS / PROJECT SWITCHER PATTERN
============================================================

Prepare a reusable Business / Project Switcher component.

Purpose:

Once the user later opens one project, they should be able to switch
to another business/project without logging out.

For E02, show the pattern in a simple form if appropriate.

Example:

Current Business / Project
[ ABC Pharma Pvt Ltd ▼ ]

Dropdown:
- ABC Pharma Pvt Ltd
- Konkan Feeds
- Sahyadri Electronics Pvt Ltd
- + Create New Business / Project

IMPORTANT:

E02 itself represents the complete portfolio,
so do not unnecessarily duplicate the switcher everywhere on the page.

Design the component now so it can later be reused globally after
a project is opened.

============================================================
13. PROJECT SELECTION BEHAVIOUR
============================================================

When the entrepreneur clicks:

OPEN BUSINESS

The system conceptually sets:

Selected Business ID
Selected Project ID

That project becomes the active context for all later pages:

Business DNA
Regulatory Journey
Applications
Documents
Compliance
Incentives
Inspections
Changes / Expansion
Notifications

Do not display technical database language to the user.

This is only the interaction architecture Figma must preserve.

============================================================
14. CREATE NEW BUSINESS FLOW
============================================================

Click:

+ Create New Business / Project

Prototype destination:

E03 — Create Business / Project

IMPORTANT:

E03 is NOT part of this prompt.

Do not generate E03 now.

Only create the prototype connection / destination placeholder
for the next phase.

============================================================
15. EMPTY STATE
============================================================

Create a second variant of E02:

E02 — EMPTY STATE

Use when the logged-in entrepreneur has no business/project yet.

Page:

MY BUSINESSES

Message:

"You have not created a business or project yet."

Supporting explanation:

"Create your first business/project to build your Business Profile
and personalised regulatory journey."

Primary CTA:

+ Create Your First Business / Project

CTA prototype:
→ E03 Create Business / Project placeholder

Keep the empty state government-professional.

Do NOT use:
- large decorative illustrations
- cartoon characters
- AI art
- excessive animation

A simple icon / existing visual primitive is enough if appropriate.

============================================================
16. NORMAL / POPULATED STATE
============================================================

Create the populated portfolio variant separately.

Structure:

My Businesses
        +
Create New Business / Project

Portfolio Summary
        ↓
Search + Filters
        ↓
Business / Project Cards
        ↓
Open Business

Allow realistic scrolling if multiple project cards exist.

============================================================
17. CARD INFORMATION HIERARCHY
============================================================

Do not make cards visually overcrowded.

Priority should be:

1. Business / Project name
2. Industry
3. Location
4. Project stage
5. Overall journey state
6. Actions required
7. Active applications
8. Immediate upcoming event
9. Open Business

Secondary information such as compliance / inspection / incentive
can be compact.

Use existing status chips/badges.

Use:
ICON + TEXT + COLOR

Never rely on color alone.

============================================================
18. STATUS LANGUAGE
============================================================

Do not invent dozens of new statuses.

Portfolio-level display labels may include:

Action Required
In Progress
Under Review
Inspection Upcoming
Compliance Due
No Immediate Action

These are presentation summaries.

Later individual applications use the canonical application-state model:

DRAFT
READY_TO_SUBMIT
SUBMITTED
FEE_CONFIRMED
DOCUMENT_SCRUTINY
INITIAL_SCRUTINY
TECHNICAL_SCRUTINY
QUERY_RAISED
CORRECTION_REQUIRED
RESUBMITTED
INSPECTION_PENDING
INSPECTION_SCHEDULED
FINAL_DECISION
APPROVED
REJECTED

Do NOT expose this complete canonical list on E02.

============================================================
19. ALERT PRIORITY
============================================================

If a project requires entrepreneur action, make it immediately visible.

Example hierarchy:

ACTION REQUIRED
"Respond to 2 deficiencies"

CTA:
View Business

For non-urgent items:

UPCOMING
"Inspection · 12 Oct"

For informational items:

"Application under department review"

Do not create excessive red warning states.

============================================================
20. RESPONSIVE / ACCESSIBLE BEHAVIOUR
============================================================

Follow the existing Phase 0 responsive behavior.

Desktop:
Use comfortable government portal layout.

Tablet:
Cards may reduce columns while keeping hierarchy.

Mobile:
Project cards stack vertically.

Preserve:

- logical reading order
- keyboard focus
- adequate contrast
- visible focus states
- accessible labels
- status icon + text
- usable zoom
- English / Marathi compatibility
- sufficiently large touch targets

Do not create a separate mobile visual system.

============================================================
21. INTERACTIONS TO PROTOTYPE
============================================================

Prototype these interactions:

Successful Industrial Login
        ↓
E02 — My Businesses

E02 Search
        ↓
Filter cards

E02 Stage filter
        ↓
Filter cards

E02 Status filter
        ↓
Filter cards

Open Business
        ↓
Later Entrepreneur Command Centre placeholder

Create New Business / Project
        ↓
E03 placeholder

Empty State CTA
        ↓
E03 placeholder

Business switcher
        ↓
Switch selected project / show another project context

Do not build later pages.

============================================================
22. DO NOT ADD
============================================================

DO NOT ADD:

- Adaptive Business Questionnaire yet
- Business DNA questionnaire
- detailed Business Profile
- Master Project Dossier screen
- Regulatory Journey graph
- Department-specific application forms
- Document Centre
- Compliance Dashboard
- Incentive Discovery
- Inspection Centre
- Query Response
- Grievances
- Regulatory Assistant
- AI chatbot
- analytics
- departmental dashboard
- MIDC officer features
- MPCB officer features

Those are later phases.

Do not anticipate later screens beyond lightweight data previews required
for the project card.

============================================================
23. DATA MODEL CONCEPT TO PRESERVE
============================================================

Conceptually preserve:

ENTREPRENEUR ACCOUNT
       ↓
BUSINESS / PROJECT PORTFOLIO
       ↓
SELECT BUSINESS / PROJECT
       ↓
SELECTED PROJECT CONTEXT
       ↓
BUSINESS DNA
       ↓
REGULATORY JOURNEY
       ↓
MULTIPLE DEPARTMENT APPLICATIONS
       ↓
COMPLIANCE / INCENTIVES / GROWTH

Do not visually expose backend architecture.

Use it only to keep E02 compatible with future development.

============================================================
24. VISUAL QUALITY REQUIREMENT
============================================================

The page should look:

- official
- clean
- structured
- trustworthy
- accessible
- information-dense but not crowded
- consistent with Government of Maharashtra portal design
- clearly part of the existing EKATMA implementation

Avoid:

- oversized hero sections
- giant rounded cards
- gradients
- glass effects
- neon colors
- excessive shadows
- startup dashboard styling
- decorative illustrations
- random charts
- floating chatbot
- unnecessary animation

============================================================
25. FINAL CHECK BEFORE COMPLETING
============================================================

Before completing this prompt verify:

[ ] Only E02 was created
[ ] Existing authentication screens remain unchanged
[ ] Login successful destination is E02
[ ] No Phase 0 components were redesigned
[ ] Header/footer/logos remain unchanged
[ ] Populated portfolio state exists
[ ] Empty portfolio state exists
[ ] Search exists
[ ] Stage/status filters exist
[ ] Create New Business / Project exists
[ ] Open Business exists
[ ] Business/project switcher pattern exists
[ ] At least 3 realistic Maharashtra projects shown
[ ] Cards remain multi-department compatible
[ ] MIDC/MPCB are not hard-coded architecture
[ ] Project-specific data is not mixed between businesses
[ ] No Adaptive Questionnaire was generated
[ ] No later Entrepreneur screens were generated
[ ] No Department-side screens were generated
[ ] Accessibility and bilingual compatibility are preserved
[ ] Same Phase 0 design system is used throughout

============================================================
FINAL RESULT
============================================================

The entrepreneur should experience:

LOGIN
  ↓
MY BUSINESSES
  ↓
"Which business/project do I want to manage?"
  ↓
OPEN EXISTING BUSINESS
OR
CREATE NEW BUSINESS / PROJECT

E02 must establish the portfolio layer cleanly before the later
Adaptive Business Profile and regulatory journey begin.

Create ONLY this scope.
Do not continue automatically into the next phase.