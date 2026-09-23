CONTINUE THE EXISTING EKATMA PHASE 0 FIGMA FILE.

DO NOT START A NEW DESIGN.
DO NOT REDESIGN THE GLOBAL GOVERNMENT SHELL.
DO NOT CHANGE THE DESIGN SYSTEM CREATED IN PHASE 0.

Create the next module:

M01 — MIDC DEPARTMENT LOGIN + AUTHENTICATED OFFICER SHELL

============================================================
0. CRITICAL CONTEXT — READ BEFORE DESIGNING
============================================================

This is part of EKATMA:
Maharashtra Industrial Approval, Compliance & Regulatory Intelligence System.

Phase 0 has already established the common EKATMA visual system, government identity, layout language, typography, colors, spacing, buttons, fields, cards, borders, shadows, accessibility rules, iconography, header treatment and other shared components.

REUSE THOSE EXISTING PHASE 0 COMPONENTS AND TOKENS.

Do not create a second visual language for the department portal.

The entrepreneur side and department side belong to the SAME EKATMA PRODUCT FAMILY.

The department side should feel:
- official
- structured
- operational
- information-dense when required
- trustworthy
- modern but not flashy
- suitable for a Maharashtra government workflow system
- clearly related to the Phase 0 entrepreneur-side design

Do not create:
- a new navbar style
- a different color system
- different button styles
- different card radius
- different typography
- decorative gradients that do not exist in Phase 0
- oversized illustrations
- marketing-style layouts
- unnecessary glassmorphism
- a separate "MIDC theme"

Use the exact Phase 0 government identity/logo/header lockup already created.
Do not reposition, replace, duplicate or restyle those identity elements unless required only to make the existing component fit the login state.

If Phase 0 already defines desktop frame width, grid, spacing, header height, component dimensions or responsive rules, inherit them exactly.

Do not invent a competing design system.

============================================================
1. PURPOSE OF M01
============================================================

M01 has ONLY two responsibilities:

A. Authenticate the MIDC officer.
B. After authentication, automatically load the officer's mapped account context and enter the MIDC Department Home shell.

The officer must NOT configure their work context during login.

The backend already knows the officer's:
- Department
- Assigned Region / Office
- Assigned workflow desk
- Role
- Permissions

Therefore the UX must be:

Officer / Department User ID
+
Password
+
CAPTCHA
        ↓
Authenticate
        ↓
Backend resolves account mapping
        ↓
Department = MIDC
Assigned Region / Office = loaded automatically
Current Desk = loaded automatically
Role = loaded automatically
Permissions = loaded automatically
        ↓
MIDC Department Home

IMPORTANT:
The context-resolution step is a SYSTEM ACTION.
It is NOT another screen.
It is NOT a wizard.
It is NOT an onboarding step.
It is NOT a selection step.

============================================================
2. ABSOLUTE LOGIN RULE
============================================================

The MIDC login form must be EXTREMELY SIMPLE.

THE LOGIN FORM MAY CONTAIN ONLY:

1. Officer / Department User ID
2. Password
3. CAPTCHA
4. Login button

Optional small utility actions are allowed:

- Forgot Password
- Refresh CAPTCHA
- Help / Contact Support

THAT IS ALL.

Do not ask the officer to select or enter:

- Department
- Region
- District
- Office
- MIDC estate
- Branch
- Desk
- Role
- Designation
- Service
- Permission level
- Workflow
- Application type
- Approval type

Do not create dropdowns for these.

Do not create radio buttons for these.

Do not create a "Choose your role" card.

Do not create a "Select Department" page.

Do not create a "Select Office" page.

Do not create a "Continue as..." page.

Do not create role cards such as:
"Scrutiny Officer / Inspector / Decision Officer / Admin".

Do not even show Department / Office / Desk / Role as disabled form fields on the login page.

They should not be part of the login form in any form.

============================================================
3. IMPORTANT CORRECTION TO DEPARTMENT WORKFLOW
============================================================

Treat the old concept of:

"Department Login / Role Selection"

as:

"Department Login / Automatic Account Context Loading"

for EKATMA.

The login authenticates a known officer identity.

The system then determines the correct operational context.

Therefore:

LOGIN
↓
AUTHENTICATION
↓
ACCOUNT CONTEXT RESOLUTION
↓
AUTHORISED WORKSPACE

NOT:

LOGIN
↓
SELECT DEPARTMENT
↓
SELECT OFFICE
↓
SELECT DESK
↓
SELECT ROLE
↓
WORKSPACE

The second flow is explicitly prohibited.

============================================================
4. FIGMA FRAME / COMPONENT ORGANISATION
============================================================

Create a clearly organised section in the existing Figma page named:

"M01 — MIDC Department Login"

Create either component variants plus presentation frames, or individual review frames, for:

M01.1 — Login / Default
M01.2 — Login / Invalid Credentials
M01.3 — Login / Incorrect CAPTCHA
M01.4 — Login / CAPTCHA Refreshed
M01.5 — Login / Authenticating
M01.6 — Authenticated / MIDC Officer Shell

Use sensible Figma component naming consistent with Phase 0.

Example component structure:

M01/Auth/LoginCard
    Variant = Default
    Variant = InvalidCredentials
    Variant = IncorrectCaptcha
    Variant = CaptchaRefreshed
    Variant = Authenticating

M01/Shell/OfficerContext
M01/Shell/Sidebar
M01/Shell/Topbar

However, follow the exact naming/component conventions already established in Phase 0 if they differ.

Use Auto Layout correctly.

Use shared styles and variables rather than detached one-off styling.

============================================================
5. LOGIN PAGE — PAGE STRUCTURE
============================================================

The login page must continue the EXISTING pre-authenticated EKATMA government shell.

Do not redesign the surrounding government header.

Do not introduce the authenticated department sidebar before login.

The page should visually contain:

EXISTING PHASE 0 GOVERNMENT HEADER / IDENTITY
↓
Main login area
↓
Existing Phase 0 footer / utility treatment if already defined

The login area should be calm and uncluttered.

Preferred hierarchy:

MIDC Department Login

Short supporting line such as:

"Sign in to access your assigned departmental workspace."

Then the login card.

Do not add promotional copy.

Do not add long explanations.

Do not add feature advertisements.

Do not add dashboard previews.

Do not add large hero artwork.

Do not add an onboarding carousel.

============================================================
6. LOGIN CARD
============================================================

Use the existing Phase 0 card/input/button language.

If Phase 0 has an authentication card component, reuse it.

If no auth-card pattern exists, create a restrained card approximately appropriate for a government login form — compact rather than oversized — while still using Phase 0 tokens.

Inside the card:

--------------------------------------------------
Officer / Department User ID
[ Enter User ID                               ]

Password
[ Enter Password                         👁     ]

CAPTCHA

[ CAPTCHA VISUAL ]    Refresh CAPTCHA

[ Enter CAPTCHA                              ]

[                 Login                      ]

Forgot Password                 Help / Contact Support
--------------------------------------------------

The exact composition can adapt to Phase 0 spacing, but the INFORMATION ARCHITECTURE must remain this simple.

CAPTCHA is one logical form section containing:
- generated CAPTCHA visual/code
- CAPTCHA entry
- Refresh CAPTCHA action

Do not add more authentication factors unless they already exist in Phase 0 and have explicitly been approved.

============================================================
7. FIELD BEHAVIOUR
============================================================

OFFICER / DEPARTMENT USER ID

Label must remain visible.
Do not rely only on placeholder text.

Example placeholder:
"Enter your User ID"

Do not call this:
- Email
- Employee type
- Department ID + Department
- Role ID

Keep it generic enough to support the backend officer account.

PASSWORD

Visible label:
"Password"

Include the same password show/hide icon pattern used by Phase 0 if available.

CAPTCHA

Clearly separate:
A. CAPTCHA challenge
B. CAPTCHA input

Refresh CAPTCHA should be a small secondary text/icon utility, not a primary action.

LOGIN

One clear primary CTA:

"Login"

Do not use:
"Proceed"
"Continue to Role Selection"
"Select Workspace"
"Next"

============================================================
8. OPTIONAL INFORMATIONAL NOTE
============================================================

A very small neutral line may appear below the form if it improves comprehension:

"Your assigned department, office, desk and permissions are loaded automatically after sign-in."

This is informational only.

It must NOT visually resemble another required step.

It must NOT contain editable controls.

============================================================
9. LOGIN STATE — DEFAULT
============================================================

Create the normal untouched state.

Requirements:

- No error message
- Login button enabled according to the existing Phase 0 field-state rules
- CAPTCHA visible
- Refresh CAPTCHA available
- Forgot Password available
- Help / Contact Support available

Keep visual priority on the three authentication inputs and Login.

============================================================
10. LOGIN STATE — INVALID USER ID / PASSWORD
============================================================

Create a clear but restrained error state.

Use one generic authentication message:

"Invalid User ID or password. Please check your credentials and try again."

Do NOT say:
"User ID does not exist"

Do NOT separately reveal whether the User ID or password was wrong.

Follow the Phase 0 error component styling.

Error must not depend only on red color.
Include appropriate error icon/text treatment if Phase 0 uses it.

Preserve entered User ID.

Do not introduce extra verification steps.

CAPTCHA may remain according to the chosen authentication pattern, but do not introduce new fields.

============================================================
11. LOGIN STATE — INCORRECT CAPTCHA
============================================================

Show CAPTCHA-specific feedback near the CAPTCHA field:

"Incorrect CAPTCHA. Please try again."

Do not mark the User ID or Password as invalid.

Keep the error local and obvious.

Follow Phase 0 field error styles.

If CAPTCHA regeneration is part of the established interaction, show a newly generated CAPTCHA while retaining the same overall form.

Do not add another screen.

============================================================
12. LOGIN STATE — CAPTCHA REFRESHED
============================================================

When "Refresh CAPTCHA" is activated:

- change the CAPTCHA challenge
- clear only the CAPTCHA entry
- retain User ID
- retain the rest of the page
- do not navigate away
- do not open a modal

Optionally use a tiny non-intrusive confirmation such as:

"CAPTCHA refreshed"

only if consistent with Phase 0 feedback patterns.

This is a state change, not a separate workflow.

============================================================
13. LOGIN STATE — AUTHENTICATING
============================================================

After Login is pressed:

Change primary button state to:

[ spinner ] Authenticating...

During this state:

- prevent repeat submission
- visually disable duplicate interaction
- preserve the entered data visually
- do not show department/desk selection
- do not open an intermediate onboarding page

The system conceptually performs:

Authenticate credentials
↓
Validate CAPTCHA
↓
Resolve officer account
↓
Load Department
↓
Load assigned Region / Office
↓
Load Desk
↓
Load Role
↓
Load Permissions
↓
Open Department Home

Do NOT visually expose this as an 8-step wizard.

At most, it is a short loading state.

============================================================
14. SUCCESSFUL LOGIN
============================================================

On successful authentication:

Navigate DIRECTLY from:

M01 Login
↓
MIDC Department Home

No additional confirmation screen.

No:
"Welcome — select your department"

No:
"Select your office"

No:
"Choose your role"

No:
"Which service are you working on?"

No:
"Complete your profile"

No extra onboarding.

============================================================
15. POST-LOGIN — AUTHENTICATED MIDC OFFICER SHELL
============================================================

Create the authenticated government shell using exactly the shared EKATMA Phase 0 visual system.

This is the common department operational shell.

The shell consists of:

A. Existing global government header / identity treatment
B. Department contextual top area
C. Shared department sidebar
D. Main workspace area

Do not visually detach the department portal from EKATMA.

============================================================
16. OFFICER CONTEXT — DISPLAY AFTER LOGIN
============================================================

After authentication, the officer's automatically resolved context may be displayed prominently but compactly.

Display items such as:

Department
MIDC

Assigned Region / Office
[loaded account context]

Current Desk
[loaded account context]

Role
[loaded account context]

IMPORTANT:

These values are READ-ONLY CONTEXT.

They must NOT look like form selectors.

Do not use dropdown chevrons.

Do not create editable input boxes.

Do not create "Change Department".

Do not create "Switch Role".

Do not create "Select Desk".

If future multi-role switching is ever required, it will be specified separately.

For this phase, one authenticated session receives one assigned context.

============================================================
17. WORKFLOW DESK LABELS
============================================================

Example desk labels that may be used for realistic prototype data are:

- Intake / Document Desk
- Land / Plot Scrutiny
- Planning / Building Scrutiny
- Utility / Water Scrutiny
- Inspection
- Decision
- Regulatory Admin

CRITICAL:

Treat these as CONFIGURABLE WORKFLOW EXAMPLES.

Do NOT present them as a hard-coded official MIDC organisational hierarchy.

Do not build a permanent tree implying that these are statutory MIDC designations.

The backend/configuration layer determines the officer's actual desk.

For the M01 prototype, choose ONE sample desk and display it as the automatically assigned desk.

Example:

Department: MIDC
Region / Office: Assigned MIDC Office
Current Desk: Land / Plot Scrutiny
Role: Scrutiny Officer

The wording should clearly look like prototype data rather than inventing an official government designation where none has been provided.

============================================================
18. TOP CONTEXTUAL AREA AFTER LOGIN
============================================================

The authenticated top area should contain or support:

LEFT / CONTEXT AREA

- Department: MIDC
- Assigned Region / Office
- Current Desk
- Role

PRIMARY GLOBAL UTILITY

- Search application

RIGHT-SIDE UTILITIES

- Notifications
- Regulatory Assistant
- User Profile

Use Phase 0 controls, pills, typography and icons.

Keep this bar compact.

Do not turn the contextual area into a second dashboard.

============================================================
19. GLOBAL APPLICATION SEARCH
============================================================

Include a global search control in the authenticated shell.

Placeholder may be:

"Search application ID, business or service"

This represents access to permitted applications within the officer's authorised scope.

Do not design full search results in M01.

Do not build D04/Application Search yet.

Only establish the shell-level search entry point.

============================================================
20. NOTIFICATIONS
============================================================

Show the Phase 0-compatible notification icon/control.

A small count badge may be shown for prototype realism.

Do not design the full notification centre during M01.

Notifications later support operational events such as:
- application assignment
- query responses
- inspection events
- SLA warnings
- decisions
- escalations
- regulatory changes

For M01, only show the shell control.

============================================================
21. REGULATORY ASSISTANT
============================================================

Include the global "Regulatory Assistant" access in the authenticated shell.

This is the officer-side regulatory RAG entry point.

It will eventually help officers:
- retrieve applicable GRs
- retrieve Acts / Rules / Circulars
- understand why a parameter is being checked
- find relevant clauses
- see effective dates
- compare regulatory text
- obtain English / Marathi explanations

However:

DO NOT design the assistant panel in M01.

Only establish the top-level access point.

It must visually remain an ASSISTANT.

It must not imply that AI makes statutory decisions.

============================================================
22. USER PROFILE
============================================================

Show a compact authenticated user-profile control.

It may contain:
- avatar / initials
- officer display name
- role or desk as secondary text if the Phase 0 pattern supports this

Do not create an elaborate officer-profile page.

Do not add account configuration to M01.

============================================================
23. AUTHENTICATED DEPARTMENT SIDEBAR
============================================================

Create the shared department sidebar EXACTLY in this order:

1. Department Home
2. My Queue
3. Applications
4. Scrutiny
5. Inspections
6. Queries / Deficiencies
7. Decisions
8. SLA & Escalations
9. Grievances
10. Regulatory Assistant
11. Analytics
12. Regulatory Changes
13. Workload
14. Audit / History

Do not rename these casually.

Do not remove items.

Do not add MIDC-specific items between them.

Do not place:
- Plot Management
- Water
- Building
- Estate
as additional global sidebar modules in M01.

Those are workflow/application domains handled within the relevant department workspaces.

Use the same icon family already used by Phase 0.

Active item after login:

Department Home

Give the active item the existing EKATMA selected-navigation treatment.

============================================================
24. WHY THE SIDEBAR IS GENERIC
============================================================

The government system is shared across departments.

The common operational lifecycle includes:

Application
↓
Routing
↓
Queue
↓
Pre-check
↓
Scrutiny
↓
Queries
↓
Resubmission
↓
Delta re-scrutiny
↓
Inspection where required
↓
Decision
↓
SLA / escalation
↓
Audit

Therefore the navigation stays consistent.

MIDC-specific parameters appear INSIDE the appropriate application/scrutiny workflows, not as a completely different application architecture.

============================================================
25. MIDC CONTEXT THAT THIS SHELL MUST BE READY TO SUPPORT
============================================================

Do NOT put these fields on the login page.

However, architect the authenticated MIDC shell so later MIDC pages can handle application information such as:

LAND / PLOT

- MIDC estate
- Plot number
- Plot area
- Allotment status
- Possession status
- Existing plot
- Land documents
- Land-related dependencies

PLANNING / BUILDING

- Plot area
- Built-up area
- Floors
- Building height
- Occupancy
- Construction status
- Building plan requirements
- Drainage requirements
- applicable inspections

UTILITIES

- Power requirement
- Connected load
- LT / HT context
- Water requirement
- Water source
- MIDC water route
- Drainage
- wastewater dependencies

APPLICATION CONTEXT

- Business identity
- project stage
- industry/activity
- investment
- workforce
- production/capacity
- existing approvals
- documents
- dependencies
- applicable services
- inspection requirements
- SLA

Again:

NONE OF THIS BELONGS IN THE LOGIN FORM.

This context becomes relevant only when the authenticated officer opens an application or related workflow.

============================================================
26. M01 SUCCESS DESTINATION — DEPARTMENT HOME SHELL
============================================================

After login, create enough of the Department Home to demonstrate the authenticated shell.

DO NOT fully design the future M02 Department Home module yet.

The central workspace should be intentionally restrained.

Create:

Page title:
"Department Home"

Optional secondary line:
"Operational overview for your assigned MIDC workspace"

Then a SMALL set of summary elements to demonstrate layout continuity, for example:

- My Queue
- SLA at Risk
- Inspections Pending
- Decisions Pending

Optionally include two lightweight preview sections:

"My Actions"
and
"SLA Attention"

These are only shell-validation / destination content.

Do NOT create:
- full analytics dashboards
- detailed inspection calendars
- full queue tables
- detailed scrutiny workspaces
- Sankey diagrams
- bottleneck analytics
- full workload analysis
- regulatory-change screens
- query builders

Those belong to later modules.

The purpose of M01.6 is to confirm:

Login
→ Authentication
→ Context loading
→ Authenticated navigation shell

not to prematurely design every department feature.

============================================================
27. DEPARTMENT HOME INFORMATION PRIORITY
============================================================

Even in the simple destination frame, the design should communicate the department-side mental model:

"What needs my attention?"
"What is approaching SLA?"
"What inspections require action?"
"What decisions/work items are pending?"

Keep the content operational rather than promotional.

============================================================
28. PERMISSION MODEL — VISUAL IMPLICATION
============================================================

Different officers may be allowed to see different actions on the same application.

Permissions come from the authenticated officer account.

Therefore:

- do not ask officers to choose permissions
- do not show a permission configuration panel
- do not show admin permission checkboxes
- do not allow manual role escalation
- do not expose actions unavailable to the current account

M01 only establishes that this permission context has loaded.

Later screens will conditionally show permitted actions.

============================================================
29. ACCESSIBILITY / GIGW CONSISTENCY
============================================================

Continue all accessibility and GIGW-oriented decisions already established in Phase 0.

At minimum:

- visible labels on form fields
- sufficient color contrast
- keyboard-friendly interaction order
- clear focus states
- large enough interactive targets
- errors explained in text, not only color
- meaningful button labels
- meaningful icon labels/tooltips where Phase 0 supports them
- proper disabled/loading states
- consistent language
- no information communicated purely through icon shape or color
- do not use tiny low-contrast government UI text

Tab sequence on login should logically be:

User ID
→ Password
→ CAPTCHA input
→ Refresh CAPTCHA if keyboard accessible according to existing pattern
→ Login
→ Forgot Password
→ Help / Contact Support

Do not compromise accessibility for visual minimalism.

============================================================
30. RESPONSIVENESS
============================================================

Follow Phase 0 responsive rules exactly.

Do NOT independently create a different mobile system.

The department portal is primarily an operational desktop experience.

If Phase 0 currently contains only the desktop government shell, design M01 using that established desktop breakpoint and do not create unrelated tablet/mobile frames.

If Phase 0 already defines responsive behaviour, inherit it.

============================================================
31. CONTENT TONE
============================================================

Use concise government-service language.

Preferred:

"Officer / Department User ID"
"Password"
"Enter CAPTCHA"
"Login"
"Forgot Password"
"Refresh CAPTCHA"
"Help / Contact Support"
"Authenticating..."
"Invalid User ID or password. Please check your credentials and try again."
"Incorrect CAPTCHA. Please try again."
"Department Home"
"My Queue"
"SLA at Risk"

Avoid:

"Hey there!"
"Let's get started"
"Choose your adventure"
"Welcome to the future"
"AI-powered login"
"Smart officer portal"

This is an official operational system.

============================================================
32. PROTOTYPE INTERACTIONS
============================================================

Create the main prototype path:

M01.1 Login / Default
        ↓
Click Login
        ↓
M01.5 Authenticating
        ↓
successful authentication
        ↓
M01.6 MIDC Department Home

Use a short loading transition appropriate for a prototype.

Also prototype:

Refresh CAPTCHA
→ M01.4 CAPTCHA Refreshed

Maintain the error states as reviewable component/frame states:

Default
Invalid User ID / Password
Incorrect CAPTCHA
CAPTCHA Refreshed
Authenticating

Do not require the reviewer to go through a complex fake credential system merely to inspect states.

============================================================
33. FORGOT PASSWORD / SUPPORT SCOPE
============================================================

Forgot Password and Help / Contact Support may be visible as utilities.

Do NOT create full password recovery or support modules during M01 unless such screens already exist in Phase 0.

If no destination exists, keep them as clearly identified future utility links rather than inventing new multi-page flows.

============================================================
34. NO EXTRA LOGIN FEATURES
============================================================

DO NOT ADD:

- department dropdown
- office dropdown
- desk dropdown
- role dropdown
- service dropdown
- permission selector
- application type selector
- "Remember my department"
- profile setup
- officer registration
- sign-up
- first-time onboarding
- choose workspace
- switch department
- switch desk
- choose operational unit
- dashboard preference setup
- tutorial
- feature tour
- announcement carousel
- AI recommendations
- application stats before authentication

Keep login narrow and secure-looking.

============================================================
35. NO FALSE MIDC ORGANISATIONAL STRUCTURE
============================================================

Do not invent official MIDC zones, positions, hierarchies or designations merely to make the mockup look realistic.

Where specific official data has not been supplied, use neutral prototype values.

The following desk names are workflow examples only:

Intake / Document Desk
Land / Plot Scrutiny
Planning / Building Scrutiny
Utility / Water Scrutiny
Inspection
Decision
Regulatory Admin

They are configurable application workflow labels, not asserted statutory organisational titles.

============================================================
36. VISUAL DENSITY
============================================================

LOGIN:

Low information density.
Very calm.
Clear central task.
No visual noise.

AUTHENTICATED SHELL:

Moderate operational density.
Compact contextual information.
Clear navigation.
Room for data-heavy screens later.

Do not use enormous cards that waste department dashboard space.

Do not make the sidebar overly wide.

Do not make top context values dominate the page.

Preserve enough central workspace width for future:
- tables
- scrutiny interfaces
- document viewers
- cross-form comparison
- inspection workflows
- regulatory evidence
- audit timelines

============================================================
37. COMPONENT REUSE
============================================================

Before creating a new component:

Check whether Phase 0 already contains an equivalent:

- button
- input
- password field
- alert
- chip
- top navigation
- icon button
- avatar
- search
- card
- sidebar item
- badge
- tooltip
- notification badge
- loading spinner

Reuse whenever possible.

New M01-specific components should be composed from existing Phase 0 primitives.

============================================================
38. FUTURE WORKFLOW COMPATIBILITY
============================================================

Although M01 itself is only authentication + shell, do not design the shell in a way that prevents later department modules from supporting:

- role-based routing
- desk-by-desk queues
- application search
- automated pre-check
- risk-based scrutiny
- parameter-by-parameter review
- document review
- cross-form consistency
- dependency visibility
- consolidated deficiencies
- applicant response history
- delta re-scrutiny
- inspections
- re-inspections
- final decision
- SLA tracking
- escalations
- grievances
- officer regulatory RAG
- analytics
- bottleneck analysis
- workload/capacity
- regulatory change management
- regulatory impact analysis
- audit/history
- notifications

Do not design all those pages now.

Simply ensure the shell architecture can accommodate them later.

============================================================
39. IMPORTANT MIDC / ENTREPRENEUR DATA RELATIONSHIP
============================================================

The entrepreneur-side Adaptive Business Profile creates reusable Business DNA and project context.

Examples relevant to MIDC may include:

Business / project
↓
Location / jurisdiction
↓
MIDC status
↓
MIDC estate / plot
↓
Land / possession
↓
Building / construction
↓
Utilities / water
↓
Documents / approvals
↓
Applicable MIDC services

The department officer receives the resulting application/context through the government workflow.

Therefore the MIDC officer must NOT be asked during login to recreate any entrepreneur/project information.

Login identifies the OFFICER.

Applications contain the BUSINESS / PROJECT data.

Keep those concepts completely separate.

============================================================
40. CRITICAL DATA-SEPARATION RULE
============================================================

LOGIN DATA
=
Officer User ID
Password
CAPTCHA

ACCOUNT CONTEXT
=
Department
Region / Office
Desk
Role
Permissions

APPLICATION CONTEXT
=
Entrepreneur
Business
Project
MIDC estate
Plot
Land
Building
Water
Documents
Service
SLA
Risk
Dependencies
etc.

Never mix these three layers.

This separation must be visually obvious in the UX.

============================================================
41. FINAL DESIGN ACCEPTANCE CHECK
============================================================

Before considering M01 complete, inspect every frame and verify:

✓ Existing EKATMA Phase 0 visual language is preserved.

✓ Government shell has NOT been redesigned.

✓ Login contains only:
  User ID
  Password
  CAPTCHA
  Login

✓ Only permitted utility links have been added.

✓ There is NO department selector.

✓ There is NO region selector.

✓ There is NO office selector.

✓ There is NO desk selector.

✓ There is NO role selector.

✓ There is NO service selector.

✓ There is NO permission selector.

✓ There is NO onboarding screen.

✓ There is NO role-selection screen.

✓ There is NO workspace-selection screen.

✓ Context is loaded automatically after successful authentication.

✓ Authenticated context displays MIDC.

✓ Assigned Region / Office is displayed after login.

✓ Current Desk is displayed after login.

✓ Role is displayed after login.

✓ These contextual values appear read-only.

✓ Application search is available in the authenticated shell.

✓ Notifications are available.

✓ Regulatory Assistant entry is available.

✓ User Profile is available.

✓ Sidebar contains exactly the agreed 14 department modules in the agreed order.

✓ Department Home is active after login.

✓ Login error states exist.

✓ CAPTCHA refreshed state exists.

✓ Authenticating/loading state exists.

✓ Successful prototype flows directly from Login to Department Home.

✓ No unnecessary M02/M03/etc. pages have been designed prematurely.

✓ The shell is ready for MIDC land/plot, planning/building and utility/water workflows later.

✓ MIDC workflow desk labels are represented as configurable examples, not asserted official hierarchy.

✓ The result feels like one continuous EKATMA system, not a separate website.

============================================================
42. EXPECTED FINAL OUTPUT IN FIGMA
============================================================

At the end of this prompt, I should be able to inspect:

1. MIDC Login — Default
2. MIDC Login — Invalid Credentials
3. MIDC Login — Incorrect CAPTCHA
4. MIDC Login — CAPTCHA Refreshed
5. MIDC Login — Authenticating
6. MIDC Department Home — Authenticated Shell

And the working prototype:

MIDC Login
→ Login
→ Authenticating
→ Automatically resolve officer account context
→ MIDC Department Home

NO INTERMEDIATE SCREEN.

Keep the module focused.

Do not proceed to detailed Queue, Scrutiny, Inspection, Decision, Analytics or other department modules yet.

STOP AFTER M01 IS COMPLETE.