# EKATMA Common Landing Page — Implementation Plan, Safety Rules & Agent Prompts
> **Primary rule:** This is a **public landing-page redesign only**. It is **not** a routing rewrite, auth rewrite, portal rewrite, or backend rewrite.
# 0. NON-NEGOTIABLE SAFETY RULES
The current application already contains working public authentication flows and working authenticated Entrepreneur / Department portals.
The landing-page task must **not break or restructure them**.

## Never do these

- Do **not** rename existing routes.
- Do **not** move authenticated pages to new URLs.
- Do **not** create replacement login pages if working ones already exist.
- Do **not** change successful Entrepreneur-login destination.
- Do **not** change successful Department-login destination.
- Do **not** change Entrepreneur registration / OTP flow.
- Do **not** change existing authenticated Entrepreneur sidebar/page connections.
- Do **not** change Department portal navigation.
- Do **not** rewrite auth state just to make the homepage easier.
- Do **not** insert a new intermediate “Welcome” page.
- Do **not** create fake routes for buttons that do not yet have destinations.
- Do **not** hard-code guessed route paths without inspecting the repository.
- Do **not** use `href="#"`, `console.log()` navigation, empty click handlers, or visible controls that silently do nothing.
- Do **not** introduce fake IDs such as `default`, `sample`, `temp`, or `current` into dynamic routes.
- Do **not** run broad regex/sed/mass-replacement scripts.
- Do **not** refactor unrelated working code during this task.
- Do **not** change existing route parameter names.
- Do **not** duplicate the global public header/footer inside individual public pages.
- Do **not** duplicate authenticated shells inside the homepage.
- Do **not** add dependencies unless the existing stack truly cannot support the required interaction.
- Do **not** modify lockfiles or package configuration merely because the local environment regenerates them.
- Do **not** redesign authenticated Entrepreneur or Department pages.
- Do **not** invent backend/API behavior.
- Do **not** convert public prototype content into claims of live government production data.

## Preserve these flows exactly

### Entrepreneur

```text
Common Landing Page
        ↓
Existing Industrial / Entrepreneur Login
        ↓
Successful Authentication
        ↓
Existing My Businesses / Business Portfolio
        ↓
Select or Create Business
        ↓
Existing Authenticated Entrepreneur Portal
```

### Entrepreneur registration

```text
Common Landing Page
        ↓
Existing New User / Registration
        ↓
Existing Email / OTP flow
        ↓
Existing Registration completion
        ↓
Existing authenticated entry flow
```

### Department

```text
Common Landing Page
        ↓
Existing Government / Department Login
        ↓
Successful Authentication
        ↓
Existing Department Portal
```

---

# 1. WHAT EXACTLY IS BEING REPLACED

The existing **public “Welcome to EKATMA” homepage content** is the page to redesign.

Conceptually, the current public structure is:

```text
Common Government Utility Bar
        ↓
Common EKATMA Public Header
        ↓
Current Welcome-to-EKATMA content
        ↓
Common Public Footer
```

Replace only the **main public homepage content** with the new landing page.

The target becomes:

```text
Common Government Utility Bar
        ↓
Common EKATMA Public Header
        ↓
NEW COMMON EKATMA LANDING PAGE
        ↓
Common Public Footer
```

The existing login, registration, OTP, Entrepreneur portal, and Department portal remain separate pages and must remain functionally unchanged.

---

# 2. PRODUCT POSITIONING OF THE COMMON LANDING PAGE

This is a **common EKATMA public gateway**, not an Entrepreneur-only homepage.

It must serve:

1. Entrepreneurs / Industrial Units
2. Government Department / Officer users
3. Public visitors browsing services, policies, schemes and resources

The landing page should communicate:

> **EKATMA connects industrial approvals, departmental processing, compliance, inspections, incentives, regulatory guidance and growth support through one coordinated platform.**

The page must feel:

```text
Government
+ Trustworthy
+ Clean
+ Modern
+ Useful
+ Interactive
+ Maharashtra-specific
```

Avoid:

```text
Old static government portal
Generic SaaS landing page
Fintech dashboard
AI-heavy startup aesthetic
Overloaded marketing website
```

---

# 3. VISUAL DIRECTION

## Core palette

### Midnight Blue — Primary
`#17365D`

Use for:

- government utility bar
- strong headings
- primary navigation
- footer
- primary buttons
- major iconography

### Secondary Blue
`#245B8A`

Use for:

- links
- selected states
- secondary buttons
- interactive elements
- information accents

### Saffron Accent
`#E68A2E`

Use sparingly for:

- active navigation underline
- active carousel progress
- featured CTA
- incentive-related highlight
- small emphasis

Do **not** make saffron the dominant page color.

### Green Status
`#2F7D4F`

Use for:

- verified
- compliant
- approved
- completed
- positive status

### Background
`#F8F9FA`

### Surface
`#FFFFFF`

### Main Text
`#20242A`

## Approximate visual balance

```text
70% white / light neutral
20% midnight / secondary blue
5% green
5% saffron
```

---

# 4. LANDING-PAGE SECTION ORDER

Use this section order unless the existing code structure requires a harmless equivalent arrangement.

```text
1. Government Utility Bar
2. Main EKATMA Header
3. Hero Carousel
4. Latest Updates / Announcement Strip
5. Guided Discovery
6. Role Gateway
7. Service Explorer
8. Connected EKATMA Journey
9. Intelligent EKATMA
10. Business DNA / Verified Data Reuse
11. Policies, Schemes & Regulatory Updates Carousel
12. Help & Public Resources
13. Government Footer
```
Do not add extra sections that repeat the same information.
---
# 5. SECTION-BY-SECTION PLAN
## 5.1 Government Utility Bar
Keep / preserve the existing official public utility bar behavior.

Expected content:

```text
Government of Maharashtra | महाराष्ट्र शासन

Skip to Main Content
Screen Reader Access
A-
A
A+
High Contrast
English
मराठी
Sitemap
```

Requirements:

- keyboard accessible
- visible focus states
- text resizing controls should not break layout
- high-contrast mode should remain usable
- language controls remain discoverable

---

## 5.2 Main EKATMA Header

White surface.

Left side:

- National / government emblem already used in current design
- Government of Maharashtra identity already used
- EKATMA branding already used
- portal name

Public navigation:

```text
Home
Services
Policies & Schemes
Resources
About
Support
```

Right side:

```text
Login / Register
Get Started
```

### Important

`Login / Register` must reuse the existing public authentication destinations.

Suggested dropdown behavior:

```text
Login / Register
├── Industrial / Entrepreneur Login
├── Government / Department Login
└── New User / Register
```

Do not create replacement authentication pages.

---

# 6. HERO CAROUSEL

The hero carousel is a **core requirement**.

## 6.1 Four slides

### Slide 1 — EKATMA / Maharashtra

Headline:

> **One Platform. One Regulatory Journey.**

Supporting text:

> Industrial approvals, compliance, inspections, incentives and government support through one connected platform.

Actions:

- **Get Started**
- **Explore EKATMA**

### Slide 2 — Entrepreneur

Headline:

> **Know What Your Business Needs. Before You Apply.**

Supporting text:

> Build your Business DNA, discover applicable requirements and manage your regulatory journey from one place.

Actions:

- **Start Your Journey**
- **Discover Requirements**

### Slide 3 — Department

Headline:

> **Connected Processing. Clearer Decisions.**

Supporting text:

> Structured scrutiny, coordinated inspections, consolidated queries and SLA visibility for government departments.

Action:

- **Officer Login**

### Slide 4 — Incentives / Growth

Headline:

> **Go Beyond Approvals.**

Supporting text:

> Discover potential incentives, understand policy changes and assess their possible impact on your business.

Action:

- **Explore Opportunities**

## 6.2 Carousel interaction

Must include:

- previous button
- next button
- visible slide position/progress
- pause/play control
- auto-rotation only if accessible
- keyboard controls
- touch/swipe support where existing stack allows
- no layout shift while images load
- descriptive `alt` text

## 6.3 Carousel image handling

The carousel images must be fetched from the project folder structure.
Do **not** embed generated image bytes in component code.
Recommended structure:

```text
public/
└── images/
    └── landing/
        └── carousel/
            ├── slide-ekatma.*
            ├── slide-entrepreneur.*
            ├── slide-department.*
            └── slide-growth.*
```

Actual extension may be `.webp`, `.jpg`, or `.png` depending on supplied assets.

The implementation should use a single slide configuration/data structure such as:

```text
slide:
- id
- imagePath
- alt
- eyebrow
- headline
- description
- primaryAction
- secondaryAction
```

Do not duplicate carousel markup four times if a reusable data-driven carousel already fits the project architecture.

---

# 7. HERO CTA DESTINATION RULES

Routing is frozen.
Every CTA must use an **existing route or in-page anchor**.
Do not invent new routes.

## Slide 1

`Explore EKATMA`
→ scroll to Connected EKATMA Journey or Services section.

`Get Started`
→ existing role/auth selection behavior.

## Slide 2

`Start Your Journey`
→ existing Entrepreneur authentication / registration entry.

`Discover Requirements`
→ scroll to Guided Discovery.

## Slide 3

`Officer Login`
→ existing Government / Department Login.

## Slide 4

`Explore Opportunities`
→ scroll to public Incentives / Intelligent EKATMA / service-discovery context.

If personalized incentive calculation requires authentication:

```text
Public landing
→ public incentive explanation
→ Calculate for My Business
→ existing Entrepreneur authentication
→ existing My Businesses
→ select business
→ authenticated Incentives module
```
Do not bypass Business selection.
---

# 8. LATEST UPDATES / ANNOUNCEMENT STRIP

Place directly below hero.
Purpose:
Make the portal feel live and operational.
UI:
```text
Latest Updates

[Policy] ...
[Scheme] ...
[Notice] ...
[Regulatory Update] ...
```

Use a compact horizontal ticker/carousel.
Do not duplicate full update content here and later.
This strip gives only short headlines.
The full cards appear in the dedicated Updates section below.
---

# 9. GUIDED DISCOVERY

This is the public equivalent of a “Know Your Approvals” interaction.
Title:
> **What do you need help with?**

Main options:

```text
Discover Approvals
Check Incentives
Find Compliance
Explore Services
```

For `Discover Approvals`, a compact public form can contain:

```text
I am planning to      [ ... ]
My sector is          [ ... ]
My location is        [ ... ]

[ Discover My Journey ]
```

Important:

- this is public discovery only
- do not pretend it is a statutory determination
- do not duplicate full Business DNA
- logged-in users can be encouraged to use their Business DNA for a more precise result

Suggested note:

> Logged-in entrepreneurs can generate a more precise personalised journey using their Business DNA.

---

# 10. ROLE GATEWAY

Title:

> **Continue with EKATMA**

Use two main cards and one public-resource path.

## Entrepreneur / Industrial Unit

Text:

> Start or manage your industrial regulatory journey.

Primary action:

`Enter Entrepreneur Portal`
→ existing Entrepreneur Login.

Secondary:

`New user? Register`
→ existing registration.

## Government Department / Officer

Text:

> Access assigned applications and departmental workflows.

Action:

`Officer Login`
→ existing Government / Department Login.

## Public visitor

Text:

> Browse services, policies, schemes and resources without logging in.

Action:

`Explore Resources`
→ existing public resource area or in-page public section.

---

# 11. SERVICE EXPLORER

Title:

> **Explore EKATMA Services**

This should be interactive, not just six repeated marketing cards.

Tabs:

```text
By Journey Stage
By Service
By Department
```

Default:

`By Journey Stage`

Journey-stage controls:

```text
Planning
Establishment
Construction
Pre-Operation
Operations
Expansion
```

Example cards may include:

```text
Land & Plot
Environmental Consent
Building & Planning
Fire Approval
Power Connection
Water Connection
```

Each card should show:

- service title
- relevant department / authority label if available
- stage label
- `View Requirements` or `Explore`

Use actual current public data/fixtures if present.

Do not invent official service counts or legal requirements.

---

# 12. CONNECTED EKATMA JOURNEY

Purpose:

Explain orchestration once.

Title:

> **From Business Setup to Continuous Compliance**

Visual flow:

```text
Business Profile
      ↓
Discover Requirements
      ↓
Apply & Coordinate
      ↓
Department Processing
      ↓
Inspections & Decisions
      ↓
Compliance
      ↓
Incentives & Growth
```

This section should be visually different from service cards.

Use:

- connected nodes
- subtle lines
- stage icons
- restrained motion if available

Do not repeat full service descriptions here.

---

# 13. INTELLIGENT EKATMA

Title:

> **Intelligence Where It Actually Helps**

Only show differentiated intelligence features.

## Regulatory Assistant

> Ask questions about requirements, documentation and policies in simple language.

Possible examples:

```text
Which approval do I need first?
Explain this requirement in Marathi.
```

## Incentive Intelligence

Visual:

```text
Business DNA
→ Potential Incentives
→ Eligibility Explanation
→ Estimated Benefit
→ ROI Scenario
```

Text:

> Discover potential incentives, understand why they may apply and assess possible financial impact.

## Regulatory Change Intelligence

Visual:

```text
Policy Update
→ Impact Analysis
→ Affected Applications / Obligations
```

Text:

> Understand how validated regulatory changes may affect businesses and workflows.

Trust statement:

> AI supports discovery, explanation and analysis. Statutory applicability, scrutiny and government decisions remain governed by applicable rules and authorised processes.

---

# 14. BUSINESS DNA / VERIFIED DATA REUSE

Title:

> **Tell EKATMA Once. Reuse It Across Your Journey.**

Visual concept:

```text
Company
Sector
Location
Land
Scale
Process
Stage
   ↓
Business DNA
   ↓
Approvals
Documents
Compliance
Incentives
```

Text:

> Build a reusable business profile so verified information can support multiple regulatory workflows without repeatedly entering the same data.

This section exists to communicate the **data-reuse USP**.

Do not explain Business DNA in three other sections.

---

# 15. POLICIES, SCHEMES & REGULATORY UPDATES CAROUSEL

This is the second carousel.

Title:

> **Policies, Schemes & Regulatory Updates**

Filters:

```text
All
Policies
Schemes
Notices
Regulatory Changes
```

Card layout:

```text
Category
Date
Headline
Short summary
Read More / View Scheme / Read Notice
```

Desktop:

- show multiple cards in one row
- arrows for horizontal movement

Mobile:

- horizontally scrollable
- accessible controls

Do not invent official live notices unless clearly marked as prototype/sample content.

---

# 16. HELP & PUBLIC RESOURCES

Title:

> **Need Help?**

Four compact actions:

```text
Ask Regulatory Assistant
Frequently Asked Questions
Raise a Grievance
Guides & Downloads
```
Optional:
`Contact Support`
Keep this simple.
Do not repeat help content elsewhere.

---

# 17. GOVERNMENT FOOTER

Use Midnight Blue.

Suggested columns:

## EKATMA

- About
- How It Works
- Contact

## Services

- Approvals
- Compliance
- Inspections
- Incentives

## Resources

- Policies & Schemes
- Downloads
- FAQs

## Support

- Help
- Grievances
- Feedback
- Accessibility

## Website Policies

- Privacy Policy
- Copyright Policy
- Terms & Conditions
- Hyperlinking Policy
- Disclaimer
- Sitemap

Bottom row may contain:

- ownership statement
- maintenance/development statement if appropriate
- last updated
- accessibility information

Do not fabricate an authority/owner statement.

---

# 18. CONTENT REPETITION RULE

Every section has one job.

| Section | Question answered |
|---|---|
| Hero | What is EKATMA / why care? |
| Update strip | What is new right now? |
| Discovery | What do I need? |
| Role gateway | Where do I log in / continue? |
| Service explorer | What services exist? |
| Journey | How does the platform connect the lifecycle? |
| Intelligent EKATMA | What is innovative? |
| Business DNA | How is repeated data reduced? |
| Updates carousel | What policies/schemes/notices should I read? |
| Help | Where do I get assistance? |

If content already appears in one section, do not repeat it as another marketing block.

---

# 19. GIGW / ACCESSIBILITY REQUIREMENTS

The landing page should follow GIGW-oriented public-sector accessibility principles.

At minimum:

- skip-to-main-content link
- semantic heading hierarchy
- keyboard-accessible navigation
- visible focus states
- alt text for carousel/service imagery
- no important information conveyed only by color
- sufficient text/background contrast
- text resizing without content loss
- controls with accessible labels
- carousel pause/play
- carousel must not trap keyboard focus
- responsive layout
- descriptive link text
- language metadata where applicable
- consistent breadcrumb strategy on non-home public pages
- accessible form labels
- form errors tied to fields
- no auto-playing audio/video
- avoid flashing content
- public navigation usable without mouse
Do not claim formal certification unless an actual compliance audit has occurred.

---

# 20. ROUTE SAFETY CONTRACT

Before implementing any CTA, the agent must inspect the existing project and discover the actual existing route/destination.

The implementation must create a route map such as:

```text
CTA / control
Current existing destination
Existing route/component
Action type:
- existing route
- in-page anchor
- local interaction
```

If a requested destination does not exist:

- do not invent a new route
- use a safe in-page anchor if appropriate
- otherwise report the gap

## Never change these destinations

- Entrepreneur successful login
- Department successful login
- Entrepreneur registration
- OTP
- My Businesses
- Business selection
- authenticated Entrepreneur navigation
- Department portal entry
---
# 21. ASSET HANDLING RULES
Landing-page images should live in a predictable public assets folder.
Recommended:

```text
public/
└── images/
    └── landing/
        ├── carousel/
        ├── role-gateway/
        ├── service/
        └── decorative/
```
However:
- inspect the existing project asset conventions first
- reuse the current convention if already established
- do not create duplicate asset systems
- do not move existing assets unless required
- do not rename supplied image files after wiring without updating references
- do not import massive raw images directly into JavaScript/TypeScript
- use the project’s existing image component strategy
---
# 22. IMPLEMENTATION PHASES
Use phased implementation.
Do **not** run all phases as one giant agent task.
Recommended sequence:
```text
Phase 0 — Audit only
Phase 1 — Landing-page shell + static layout
Phase 2 — Carousel + asset wiring
Phase 3 — Existing-route CTA wiring
Phase 4 — Responsive + accessibility pass
Phase 5 — Regression / routing verification
Phase 6 — Optional visual polish only
```
Commit/checkpoint after each major successful phase.
---
# 23. VALIDATION GATES
Use the repository’s actual commands.
At minimum discover and run the equivalents of:
```text
TypeScript / typecheck
Unit / contract tests
Production build
Lint (if real lint is configured)
```
Also manually/automatically verify:
```text
Common landing loads
Industrial Login still works
Registration still works
OTP flow unchanged
Successful Entrepreneur Login → My Businesses
Government Login still works
Department portal entry unchanged
Carousel controls work
All landing CTAs are valid
No fake IDs
No /default routes introduced
No duplicate shell
No dead active-looking buttons
No console.log navigation
No href="#"
No route rename
Browser back/forward works
Direct refresh on existing auth routes works
```

---
# 24. AGENT PROMPTS
The following prompts are intentionally separated.
Run them **sequentially**.
Do not run them in parallel.

---

# PROMPT 0 — CLAUDE / ANTIGRAVITY AUDIT ONLY

```text
EKATMA COMMON LANDING PAGE — PHASE 0
AUDIT ONLY

IMPORTANT:
DO NOT MODIFY ANY FILE.

We are going to redesign ONLY the current common public EKATMA homepage.

The existing Entrepreneur and Department routing/authentication architecture
must remain frozen.

Read this landing-page implementation document completely before doing anything.

==================================================
TASK A — IDENTIFY CURRENT PUBLIC HOMEPAGE
==================================================

Identify:

- current public homepage route
- component/page currently rendering the "Welcome to EKATMA" content
- public utility bar owner
- public header owner
- public footer owner

Do not edit them.

==================================================
TASK B — IDENTIFY EXISTING AUTH DESTINATIONS
==================================================

Find the exact existing destinations for:

- Industrial / Entrepreneur Login
- Government / Department Login
- New User / Registration
- OTP / registration continuation
- successful Entrepreneur login
- successful Department login

Confirm the successful Entrepreneur destination remains My Businesses /
Business Portfolio.

Report the exact current route/component for each.

Do not change any route.

==================================================
TASK C — INVENTORY EXISTING PUBLIC COMPONENTS
==================================================

Identify reusable existing components for:

- header
- footer
- utility/accessibility bar
- buttons
- cards
- dropdowns
- tabs
- carousel/slider if one already exists
- form/select controls
- badges
- search

Do not create replacements yet.

==================================================
TASK D — INVENTORY ASSET CONVENTIONS
==================================================

Identify:

- current public/static asset folder convention
- current image component strategy
- whether Next/Image or another wrapper is used
- current image optimization approach

Recommend the safest folder location for the four landing carousel images.

Do not add images yet.

==================================================
TASK E — ROUTE FREEZE MAP
==================================================

Return a table:

Control / Flow
Current route
Current component/page
MUST REMAIN UNCHANGED? YES

Include:

- Industrial Login
- Government Login
- Register
- OTP
- My Businesses
- Department Portal

==================================================
TASK F — QUALITY BASELINE
==================================================

Run the repository's existing:

- typecheck
- tests
- production build

Do not install anything.

Report the baseline.

==================================================
FINAL REPORT
==================================================

Return:

1. Public homepage owner
2. Public shell owners
3. Exact existing auth route map
4. Existing reusable UI components
5. Existing asset convention
6. Recommended carousel asset location
7. Baseline typecheck/test/build result
8. Any ambiguity requiring human decision

DO NOT MODIFY CODE.
STOP AFTER THE AUDIT.
```

---

# PROMPT 1 — LANDING PAGE LAYOUT ONLY

```text
EKATMA COMMON LANDING PAGE — PHASE 1
PUBLIC HOMEPAGE LAYOUT ONLY

Prerequisite:
Phase 0 audit completed successfully.

IMPORTANT:
This is a homepage content redesign only.

DO NOT CHANGE:
- any existing route path
- auth flows
- successful login destinations
- registration
- OTP
- My Businesses
- authenticated Entrepreneur screens
- Department portal screens
- route parameter names
- backend behavior

DO NOT create new auth pages.
DO NOT create fake routes.

Use the current public homepage route discovered in Phase 0.

==================================================
BUILD THE NEW LANDING PAGE STRUCTURE
==================================================

Replace only the old "Welcome to EKATMA" homepage body with these sections:

1. Hero Carousel placeholder structure
2. Latest Updates strip
3. Guided Discovery
4. Role Gateway
5. Service Explorer
6. Connected EKATMA Journey
7. Intelligent EKATMA
8. Business DNA / Verified Data Reuse
9. Policies / Schemes / Regulatory Updates carousel placeholder
10. Help & Public Resources

Preserve the current public:
- utility bar
- header
- footer

unless only minor homepage-safe composition changes are required.

==================================================
VISUAL SYSTEM
==================================================

Use:

Primary       #17365D
Secondary     #245B8A
Saffron       #E68A2E
Green         #2F7D4F
Background    #F8F9FA
Surface       #FFFFFF
Text          #20242A

Saffron must remain a restrained accent.

Do not redesign the authenticated portals.

==================================================
ROUTING IN THIS PHASE
==================================================

Do not wire new destinations yet except safe in-page anchors.

Keep existing auth/header controls intact.

For newly created action buttons without a confirmed existing route:
- keep as non-routing UI if needed
- do not invent a destination
- report them for Phase 3

==================================================
VALIDATE
==================================================

Run:
- typecheck
- relevant tests
- production build

Report:
1. files changed
2. confirmation no route was renamed
3. confirmation auth flow files were not changed
4. visual sections created
5. actions still awaiting route wiring
6. typecheck
7. tests
8. build

STOP.
Do not start Phase 2.
```

---

# PROMPT 2 — CAROUSEL + ASSET WIRING

```text
EKATMA COMMON LANDING PAGE — PHASE 2
CAROUSEL AND IMAGE ASSET INTEGRATION

Prerequisite:
Phase 1 complete and green.

IMPORTANT:
Do not modify routing.

The four carousel images will be supplied in the folder location agreed
during Phase 0.

Do not generate images.
Do not embed base64.
Do not copy image bytes into source code.

==================================================
CAROUSEL
==================================================

Create / finalize a reusable 4-slide hero carousel.

Slide 1:
One Platform. One Regulatory Journey.

Slide 2:
Know What Your Business Needs. Before You Apply.

Slide 3:
Connected Processing. Clearer Decisions.

Slide 4:
Go Beyond Approvals.

Use a single slide configuration/data structure.

Each slide must contain:
- image path
- meaningful alt text
- eyebrow
- headline
- description
- primary action definition
- optional secondary action definition

==================================================
ACCESSIBILITY
==================================================

Provide:
- Previous
- Next
- visible progress
- pause/play
- keyboard access
- focus visibility
- accessible labels
- no keyboard trap

Auto-rotation must be pausable.

==================================================
IMAGE BEHAVIOR
==================================================

- preserve aspect ratio
- avoid layout shift
- responsive crop
- ensure text remains readable
- use overlays only where needed
- do not bake text into image files

==================================================
DO NOT WIRE UNKNOWN ROUTES
==================================================

Carousel CTA destinations are handled in Phase 3.

In this phase:
- in-page anchor actions may work
- existing auth routes must remain untouched

==================================================
VALIDATE
==================================================

Run:
- typecheck
- tests
- build

Report:
1. carousel implementation
2. image paths used
3. controls/accessibility
4. files changed
5. routing confirmation
6. typecheck
7. tests
8. build

STOP.
```

---

# PROMPT 3 — CTA / EXISTING ROUTE WIRING ONLY

```text
EKATMA COMMON LANDING PAGE — PHASE 3
WIRE LANDING PAGE ACTIONS TO EXISTING DESTINATIONS

IMPORTANT:
THIS IS NOT A ROUTING REFACTOR.

Use ONLY destinations confirmed during the Phase 0 route audit.

Do not:
- rename routes
- create replacement auth routes
- create fake routes
- change login success destinations
- change registration
- change OTP
- change authenticated portal routing

==================================================
WIRE THE FOLLOWING
==================================================

Header:
- Entrepreneur / Industrial Login -> EXISTING Entrepreneur login
- Government / Department Login -> EXISTING Government login
- Register -> EXISTING registration flow

Hero:
- Explore EKATMA -> landing-page journey/services anchor
- Get Started -> existing role/auth gateway
- Start Your Journey -> existing entrepreneur auth entry
- Discover Requirements -> landing discovery anchor
- Officer Login -> existing government login
- Explore Opportunities -> public incentive/intelligence section anchor

Role Gateway:
- Enter Entrepreneur Portal -> existing Entrepreneur login
- New User / Register -> existing registration
- Officer Login -> existing Government login
- Explore Resources -> existing public resource destination or safe in-page anchor

==================================================
AUTHENTICATED DESTINATION SAFETY
==================================================

Do not allow a public landing CTA to directly open a business-scoped
authenticated page that requires Business ID / Business DNA.

Personalized flow remains:

Login
→ My Businesses
→ Select Business
→ authenticated feature

==================================================
UNKNOWN DESTINATION RULE
==================================================

If any destination cannot be confirmed from the current repo:
DO NOT GUESS.

Leave the action safely non-routing or use an appropriate in-page anchor
and report the ambiguity.

==================================================
VALIDATE ACTUAL CLICKS
==================================================

Test actual click paths:

Landing -> Entrepreneur Login
Landing -> Register
Landing -> Government Login

Then verify existing successful login flows remain unchanged.

Also test:
- browser back
- browser forward
- direct refresh on existing login routes

==================================================
RUN
==================================================

- typecheck
- tests
- build

REPORT:
1. CTA
2. existing destination used
3. route changed? MUST BE NO
4. any unresolved CTA
5. auth regression result
6. typecheck
7. tests
8. build

STOP.
```

---

# PROMPT 4 — GIGW / RESPONSIVE / ACCESSIBILITY AUDIT & FIX

```text
EKATMA COMMON LANDING PAGE — PHASE 4
ACCESSIBILITY + RESPONSIVE HARDENING

Scope:
Landing page only.

DO NOT redesign authenticated screens.
DO NOT change routing.

Review:

- semantic landmarks
- heading hierarchy
- skip link
- keyboard navigation
- focus visibility
- link text clarity
- alt text
- form labels
- select labels
- contrast
- high contrast mode
- text resizing
- carousel pause/play
- carousel keyboard interaction
- no focus trap
- responsive layout
- mobile nav
- tablet layout
- mobile carousel readability
- horizontal updates carousel behavior
- touch target size

Preserve the approved visual design.

Fix only confirmed accessibility/responsive issues and these links and buttons functional as well.

Run:
- typecheck
- tests
- build

Report:
1. issues found
2. issues fixed
3. issues requiring product decision
4. routing unchanged confirmation
5. typecheck
6. tests
7. build

STOP.
```

---

# PROMPT 5 — FINAL REGRESSION / DO-NOT-BREAK AUDIT
```text
EKATMA COMMON LANDING PAGE — PHASE 5
FINAL REGRESSION AUDIT

IMPORTANT:
Prefer ZERO code changes.
Only fix a confirmed regression if one is found.

==================================================
PUBLIC
==================================================

Verify:
- homepage loads
- utility bar works
- header works
- carousel works
- update strip works
- discovery UI works
- role gateway works
- service explorer works
- intelligent EKATMA section renders
- Business DNA section renders
- updates carousel works
- help/footer links behave correctly

==================================================
ROUTING / AUTH
==================================================

Verify actual click paths:

Homepage
→ Entrepreneur Login

Homepage
→ Register
→ OTP / continuation

Homepage
→ Government Login

Confirm:
- successful Entrepreneur Login still goes to My Businesses
- Business selection flow unchanged
- successful Government login still enters Department portal
- authenticated Entrepreneur routes unchanged
- Department routes unchanged

==================================================
STATIC SAFETY SWEEP
==================================================

Check for:

- route renames
- duplicate route definitions
- fake /default routes
- href="#"
- navigation console.log
- empty active click handlers
- active-looking dead controls
- fake IDs
- hard-coded demo IDs used for navigation
- duplicate shells
- accidental authenticated portal edits

==================================================
QUALITY
==================================================

Run repository equivalents of:

- typecheck
- tests
- production build
- real lint if configured

==================================================
FINAL REPORT
==================================================

1. Public landing status
2. Carousel status
3. CTA routing status
4. Entrepreneur auth regression result
5. Department auth regression result
6. Existing route count / route-change confirmation
7. Dead-link sweep
8. Typecheck
9. Tests
10. Build
11. FINAL STATUS: READY / BLOCKED

Do not start additional refactoring.
```
---

# 26. RECOMMENDED GIT WORKFLOW

Before Phase 0:

```bash
git status
```

The baseline should be understood.

After each successful implementation phase:

```bash
git status
git diff --stat
```

Review changes before committing.

Suggested checkpoint commits:

```text
feat: redesign common EKATMA landing page
feat: add public landing carousel
fix: wire landing CTAs to existing auth routes
fix: harden landing accessibility and responsive behavior
test: verify landing routing regressions
```

Do not commit temporary patch scripts.

---

# 27. DEFINITION OF DONE

The common landing-page redesign is complete only when:

- the old small Welcome homepage has been replaced by the new landing experience
- existing public shell identity is preserved
- carousel uses supplied folder-based images
- carousel is accessible
- public discovery is usable
- Entrepreneur and Department entry points are obvious
- existing authentication routes are reused
- no route has been renamed
- successful Entrepreneur login still enters My Businesses
- registration / OTP flow is unchanged
- successful Department login is unchanged
- authenticated Entrepreneur pages are unchanged
- Department portal pages are unchanged
- no fake routes or IDs have been introduced
- no duplicate shell exists
- no active-looking dead controls remain
- page is responsive
- accessibility basics are satisfied
- TypeScript passes
- tests pass
- production build passes

---

# 28. FINAL AGENT INSTRUCTION

Always use this principle:

```text
INSPECT EXISTING PROJECT
        ↓
FREEZE ROUTES / AUTH
        ↓
REPLACE ONLY PUBLIC HOMEPAGE CONTENT
        ↓
REUSE EXISTING COMPONENTS
        ↓
ADD CAROUSEL / PUBLIC INTERACTIONS
        ↓
WIRE ONLY CONFIRMED EXISTING DESTINATIONS
        ↓
VERIFY AUTH FLOWS
        ↓
TYPECHECK / TEST / BUILD
        ↓
STOP
```

The landing page is the **new front door**.

Do not rebuild the rooms behind it.
