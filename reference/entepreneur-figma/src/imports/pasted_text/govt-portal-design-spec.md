Create a shared Figma design system and page shell for a Government of Maharashtra industrial approvals, compliance and business facilitation portal.

This is only the visual foundation phase. Do not design approval journeys, SLA workflows, inspections, document guidance, risk-based scrutiny, incentives, compliance flows or department-specific workflows yet.

The purpose of this phase is to ensure that two designers working separately on the Entrepreneur side and Department side create screens that look like the same government platform.

The visual style should be inspired primarily by NSWS and modern Indian government portals, while keeping GIGW 3.0 and WCAG 2.1 AA accessibility principles in mind.

The interface must feel:

official
trustworthy
clean
structured
modern but restrained
accessible
suitable for Government of Maharashtra

Avoid a startup/SaaS look.

Do not use glassmorphism, neon gradients, large decorative illustrations, excessive rounded cards, huge shadows, 3D icons or AI-style visual clutter.

1. Government identity and logo hierarchy

The header must contain three separate identity elements:

National Emblem of India with Satyameva Jayate
Government of Maharashtra logo / identity
Our platform logo

I will provide all three image assets separately.

Do not redraw, alter, stylize, recolor, crop or distort any official emblem or logo.

Use placeholder image containers for now while preserving proper aspect ratio.

The hierarchy should look official and balanced:

National identity → Maharashtra Government identity → Platform identity

The three logos should not look like three random equal-sized images.

The header should feel similar to a genuine government portal.

Keep adequate whitespace between identities.

Do not make the header excessively tall.

2. Government accessibility strip

At the very top, create a thin utility/accessibility strip.

Left side:

Government of Maharashtra
महाराष्ट्र शासन

Right side:

Skip to Main Content
Screen Reader Access
A−
A
A+
High Contrast
Standard Contrast
English
मराठी
Sitemap

Keep this strip compact.

Accessibility features should be visible and usable but should not dominate the page.

Follow GIGW-style government website conventions.

3. Main header

Under the accessibility strip, create the main portal header.

Left/center area should contain the three identity elements:

National Emblem with Satyameva Jayate
Government of Maharashtra logo/identity
Our portal logo and portal name

Right side may contain:

Search
Help
Notifications
Login/Profile

Create logged-out and logged-in variants.

Keep the visual hierarchy clean and official.

4. Primary navigation

Create one shared horizontal navigation style.

Example navigation labels:

Home
Start / Manage Business
Approvals & Services
Compliance
Schemes & Incentives
Regulatory Updates
Help & Guidance
Grievance

Create component states:

default
hover
active
focus
disabled

Do not create complex mega menus yet.

5. Visual style

Use a restrained government colour system.

Primary visual direction:

white / off-white page backgrounds
deep navy blue as the main identity colour
government blue for primary actions and links
light neutral grey for secondary surfaces
subtle borders

Reserve semantic colours:

green for success
amber/orange for warning
red for error
blue for information

Do not overuse colour.

Avoid excessive shadows.

Cards should mostly rely on:

spacing
border
typography
subtle surface difference

rather than floating effects.

6. Typography

Use typography suitable for bilingual English + Marathi support.

Preferred:

Noto Sans for English
Noto Sans Devanagari for Marathi

Define styles for:

Display / Portal name
H1
H2
H3
Body Large
Body Regular
Body Small
Form Label
Helper Text
Caption
Link
Table Text

Typography should feel administrative and highly readable.

Avoid extremely light font weights and very small text.

7. Grid and spacing

Design primarily for desktop at 1440 px width.

Create:

12-column grid
consistent left/right margins
8 px spacing system
consistent page gutters
standard section spacing
standard card padding

Use Auto Layout wherever possible.

Define responsive behaviour for tablet/mobile, but desktop is the primary target.

8. Shared logged-in application shell

Create one authenticated layout that both Entrepreneur and Department portals will use.

It must include:

accessibility strip
government header
left sidebar
breadcrumb
page title area
main content region
footer

Sidebar should support:

expanded state
collapsed state
active item
nested item
disabled item

Keep the same sidebar structure and dimensions for both roles.

9. Basic buttons only

Create reusable button components:

Primary
Secondary
Tertiary / Text
Destructive
Icon button
Link button

Create states:

default
hover
pressed
focus
disabled
loading

Do not create approval-specific actions yet.

10. Basic form elements only

Create generic reusable form components:

text field
number field
textarea
dropdown
searchable dropdown
date picker
checkbox
radio button
toggle
basic file upload

States:

default
focus
filled
error
disabled
read-only

Every error state should include text, not only colour.

Do not create approval-specific fields yet.

11. Generic cards

Create only generic card foundations:

simple information card
metric card
content card
action card

Do not yet create:

approval card
inspection card
compliance card
document requirement card
scheme card
SLA card

Those will be designed in later phases.

12. Generic tables

Create a reusable enterprise/government table component.

Support:

table header
normal row
selected row
hover row
sortable column
filter control
actions column
pagination

Create comfortable and compact density variants.

Do not design application-specific table content yet.

13. Basic status indicators

Create only generic semantic statuses:

Success
Warning
Error
Info
Neutral

Each should include:

icon
text
accessible colour

Do not yet create domain statuses such as:

Approved
Inspection Pending
SLA Risk
Correction Required

Those come later.

14. Basic navigation components

Create:

Breadcrumb
Horizontal Tabs
Accordion
Pagination
Simple progress indicator

Do not build business journey or dependency graph components yet.

15. Alerts

Create generic alerts:

Information
Success
Warning
Error

Include:

icon
title
description
optional action
dismiss button
16. Modal and drawer foundation

Create basic reusable:

confirmation modal
standard modal
side drawer
notification drawer

Do not make them approval-specific.

17. Footer

Create a proper Indian government-style footer.

Include:

About the Portal
Contact Us
Help
Feedback
Website Policies
Terms & Conditions
Privacy Policy
Accessibility Statement
Copyright Policy
Hyperlinking Policy
Sitemap

Include placeholders for:

Content owned by Government of Maharashtra / relevant department
Portal developed and maintained by
Last Updated

Keep the footer structured and official, not promotional.

18. Accessibility requirements

Keep GIGW 3.0 and WCAG 2.1 AA principles in mind.

Ensure:

sufficient colour contrast
visible keyboard focus
clear form labels
logical reading order
no colour-only communication
bilingual English + Marathi compatibility
screen-reader-friendly naming
reasonable touch/click target sizes
support for font enlargement
high-contrast mode
19. Figma file structure

Organize the Figma library as:

00 Foundations

Colours
Typography
Spacing
Grid
Icons

01 Government Shell

Accessibility Bar
Header
Navigation
Sidebar
Breadcrumb
Footer

02 Basic Components

Buttons
Inputs
Cards
Tables
Tabs
Accordion
Alerts
Status
Modal
Drawer

03 Base Templates

Public Page Shell
Logged-In Dashboard Shell
Form Page Shell
Data/Table Page Shell

Use components, variants and Auto Layout consistently.

20. Important restrictions

This phase is only about how the platform looks, not what the platform does.

Do not create:

SLA widgets
approval journeys
dependency graphs
inspection flows
risk-based scrutiny
compliance widgets
incentive cards
document requirement cards
officer review controls
regulatory AI assistant
grievance workflow
approval timelines

These will be added in later phases.

The final output of Phase 0 must be a single shared government-grade design system that both designers can duplicate and use so that the Entrepreneur side and Department side look like the same product.