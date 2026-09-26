Create:

* **E18 — Application Tracker**
* **E19 — Application Detail**

These screens continue directly from the existing application flow:

**E14 Application Workspace**
→ **E15 Pre-validation**
→ **E16 Cross-form Consistency**
→ **E17 Payment / Submission**
→ **E18 Application Tracker**
→ **E19 Application Detail**

Keep E18 and E19 visually consistent with the existing EKATMA portal and the corrected E14–E17 screens. Reuse the established header, breadcrumb, typography, spacing, tables, buttons, status badges, colors, borders, and page structure.

**Do not introduce emojis, decorative/AI-generated icons, illustrations, gradients, glassmorphism, or a new SaaS-style dashboard visual language.**

---

# E18 — APPLICATION TRACKER

## 1. PURPOSE

E18 is the entrepreneur's consolidated view of **all applications submitted for the selected business/project across multiple departments**.

Demonstrate **ONE BUSINESS with MANY applications across MANY departments**.

The screen should make it possible to understand:

* What applications exist
* Which department is processing each application
* Where each application currently is
* How long it has been running
* Whether an SLA is approaching/running
* Whether inspection is involved
* Whether the entrepreneur has an action to take

Do not create separate trackers for each department.

---

# 2. PAGE HEADER

Use the existing EKATMA page structure.

Breadcrumb:

**Dashboard > Applications**

Page title:

**Application Tracker**

Supporting context:

**Sahyadri Bio-Pharma Pvt Ltd — Chakan Industrial Area Phase II**

Do not create a separate application-specific hero header.

---

# 3. APPLICATION TABLE

Use a clean, dense government-portal-style table.

Do not use oversized application cards.

Columns:

* **Service**
* **Department**
* **Stage**
* **Application ID**
* **Current Application Desk**
* **User-facing Status**
* **SLA**
* **Days Elapsed**
* **Inspection State**
* **Action Required**

Example rows:

### MPCB

**Consent to Establish**

### MIDC

**Building / Planning**

### Fire

**Fire service**

### DISH

**Factory-related service**

### Conditional / Sector Service

One additional service that is applicable based on the business profile.

The example data should demonstrate different application states.

---

# 4. USER-FACING STATUS

Use clear user-facing language.

Examples may include:

* Submitted
* Under Review
* Action Required
* Inspection Scheduled
* Awaiting Inspection
* Approved
* Conditional
* Rejected
* Needs Verification
* Waiting on Dependency

Do not reduce every application to:

**Pending**

The user should understand what is actually happening.

---

# 5. CANONICAL STATE RULE

Use the shared canonical application state dictionary underneath the interface.

User-facing labels may simplify technical terminology for readability, but they must **not conflict with the underlying canonical state**.

Do not create a new status model specifically for E18.

The same application state must remain consistent across:

**E18 → E19 → Department-side workflow**

---

# 6. CURRENT APPLICATION DESK

Show the current workflow stage/desk for each application.

Examples:

* Fee / Challan
* Document Scrutiny
* Initial Scrutiny
* Technical Scrutiny
* Inspection
* Final Decision

Important:

**Application Current Desk is a workflow state.**

It is **not** the same thing as the logged-in officer's assigned desk on the Department side.

Do not expose:

* Officer names unless already part of the user-facing model
* Officer assignments
* Internal officer controls
* Department-only actions
* Internal administrative controls

---

# 7. SLA

Show the application's SLA state where applicable.

Examples:

* SLA Started
* Within SLA
* Due Soon
* Over SLA
* SLA Not Applicable

Also show:

* Days elapsed
* Relevant SLA information

Do not imply that every service has the same SLA.

---

# 8. INSPECTION STATE

Where relevant, show:

* Not Required
* Required
* Awaiting Schedule
* Scheduled
* Completed
* Observation Raised
* Re-inspection Required

Keep inspection information connected to the application.

---

# 9. ACTION REQUIRED

Clearly identify when the entrepreneur needs to do something.

Examples:

**Respond to Query**

**Upload Document**

**Prepare for Inspection**

**Review Correction**

If no action is required:

**No Action Required**

Do not create unnecessary alerts for applications that are simply under department processing.

---

# 10. FILTERS

Provide compact filters for:

* Department
* Canonical State
* Stage
* SLA Risk
* Inspection
* Action Required

Also allow the entrepreneur to search applications where useful.

Keep filters visually consistent with the existing EKATMA interface.

Do not turn the filter area into a large dashboard panel.

---

# 11. APPLICATION ROW INTERACTION

Each application row should be clickable.

Clicking an application:

**E18 → E19 Application Detail**

Preserve the selected:

* Application ID
* Business
* Project
* Department
* Service
* Current state
* Current desk
* Application version

Do not create duplicate application records.

---

# E19 — APPLICATION DETAIL

## 12. PURPOSE

E19 provides the detailed, transparent processing history of one application.

It must show **where the application currently is and how it reached that state**, rather than simply showing:

**Pending**

---

# 13. PAGE HEADER

Use the established EKATMA structure.

Breadcrumb:

**Dashboard > Applications > Application Detail**

Show:

**MPCB — Consent to Establish**

**Application ID: APP-XXXX**

Supporting project/business context:

**Sahyadri Bio-Pharma Pvt Ltd — Chakan Industrial Area Phase II**

Keep the header compact and consistent with existing EKATMA pages.

---

# 14. CURRENT APPLICATION STATE

At the top of the page, clearly show:

* Department
* Service
* Application ID
* Current user-facing status
* Current Application Desk
* Submission date
* Days elapsed
* SLA state

The current desk should be understandable without exposing internal officer assignment information.

---

# 15. DESK-BY-DESK TIMELINE

Create a clear chronological processing timeline.

Possible stages:

**Submitted**
↓
**Fee / Challan**
↓
**Document Scrutiny**
↓
**Initial Scrutiny**
↓
**Technical Scrutiny**
↓
**Inspection**
↓
**Final Decision**

Not every service must use every stage.

Only show stages applicable to the selected service.

Each stage should communicate:

* Stage name
* State
* Date/time where available
* Time spent
* Relevant action or event

Do not make the timeline decorative.

It should function as an actual processing history.

---

# 16. PROCESSING TIME BREAKDOWN

Show the different types of elapsed time separately:

* **Department Processing Time**
* **Entrepreneur Response Time**
* **Current-Desk Time**
* **Inspection Waiting Time**
* **External Dependency Wait**
* **Total Elapsed Time**
* **SLA**

Do not combine all of these into one number.

This allows the entrepreneur to understand where elapsed time has accumulated.

---

# 17. CURRENT DESK CONTEXT

Clearly distinguish:

**Current Application Desk**

from:

**Officer's Internal Assignment**

The entrepreneur-facing application should show the workflow stage only.

Example:

**Current Application Desk: Technical Scrutiny**

Do not expose department-side officer controls.

---

# 18. QUERY SUMMARY

If a department query exists, show a compact summary:

* Query ID
* Query status
* Number of deficiencies
* Date raised
* Response status

Example:

**Query QRY-001**

3 deficiencies

**Action Required**

Provide a link to the existing query/correction flow:

**View Query / Respond**

→ E20 Query / Deficiency Response

If there is no active query:

**No active query**

---

# 19. DOCUMENTS

Show documents relevant to this application.

Include:

* Required documents
* Submitted documents
* Document versions
* Documents requested through query
* Approval/decision documents when applicable

Allow navigation to:

**Document Centre → E11**

and relevant document detail/help → **E12**

Do not create a separate application-specific document repository.

---

# 20. APPLICATION VERSION

Show the current application version.

Example:

**Application Version: Resubmission #2**

Where applicable, show:

* Original submission
* Resubmission #1
* Resubmission #2

Link to relevant version/delta information.

Do not silently replace previous application versions.

---

# 21. RELATED DEPENDENCY

Show any relevant regulatory dependency.

Example:

**Related Dependency**

MPCB CTE → Building / Planning

Show whether the dependency is:

* Ready
* Waiting
* Blocking
* Completed

Provide navigation to:

**E09 Regulatory Journey**

or

**E13 Dependency Graph**

where applicable.

---

# 22. APPLICATION DOCUMENTS / DATA / HISTORY

Keep the application detail organized into understandable sections rather than creating many decorative cards.

Possible structure:

### Application Summary

### Processing Timeline

### Time & SLA

### Queries / Corrections

### Documents

### Application Versions

### Related Dependencies

Use simple section headings and consistent EKATMA containers.

---

# 23. USER ACTIONS

Depending on the application's state, show only relevant entrepreneur actions.

Examples:

* Respond to Query
* View Documents
* View Inspection
* View Approval
* View Dependency
* View Application
* Download/Review submitted information where applicable

Do not expose department-only actions.

---

# 24. APPROVAL / DECISION

If the application reaches a final decision:

Show the relevant state:

**Approved**

or

**Rejected**

or

**Conditional**

For an approval, provide navigation to:

**E23 Approval / Decision Detail**

For rejection, show the relevant user-facing reason/basis where available and the applicable next path.

Do not treat a correction/query state as final rejection.

---

# 25. PROTOTYPE CONNECTIVITY

The complete application flow must remain connected:

**E14**
→ **E15**
→ **E16**
→ **E17**
→ **E18 Application Tracker**
→ **E19 Application Detail**

From E19:

**Query / Correction**
→ **E20**

**Delta Resubmission**
→ **E21**

**Inspection**
→ **E22**

**Approval / Decision**
→ **E23**

**Compliance**
→ **E24 / E25**

**Documents**
→ **E11 / E12**

**Requirement**
→ **E10**

**Regulatory Journey / Dependency**
→ **E09 / E13**

---

# 26. VISUAL CONSISTENCY — IMPORTANT

E18 and E19 must look like **direct continuations of the existing EKATMA portal and the corrected E14–E17 screens**.

Reuse the established:

* Government of Maharashtra header
* EKATMA navigation/header
* Breadcrumbs
* Typography
* Content width
* Tables
* Forms
* Buttons
* Status badges
* Alerts
* Spacing
* Borders
* Colors
* Background
* Action patterns

Do NOT introduce:

* Emojis
* Decorative/AI-generated icons
* Robot or sparkle icons
* AI illustrations
* Gradient cards
* Glassmorphism
* Excessive rounded cards
* Generic SaaS dashboard styling
* A new color palette
* A new application-specific header

If an existing EKATMA component can represent something, **reuse that component instead of inventing a new one**.

When an icon is not necessary, use **plain text**.

---

# 27. FINAL FLOW TEST

The user must be able to experience the application lifecycle as one continuous journey:

**Requirement**
→ **Application**
→ **Validation**
→ **Consistency Check**
→ **Submission**
→ **Application Tracker**
→ **Application Detail**
→ **Query / Inspection / Decision**
→ **Approval / Compliance**

E18 should answer:

**“What is happening with all my applications?”**

E19 should answer:

**“Exactly where is this application, how long has each stage taken, and what do I need to do next?”**

Do not let either screen become an isolated dashboard or a generic AI-generated admin interface.
