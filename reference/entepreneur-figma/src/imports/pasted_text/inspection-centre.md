Create **E22 — Inspection Centre**.

E22 is the entrepreneur-side inspection workspace within the existing application lifecycle.

The flow should connect naturally from the existing application journey:

**E18 Application Tracker**
→ **E19 Application Detail**
→ **E22 Inspection Centre**
→ observation / response where required
→ **E23 Approval / Decision Detail**

If an inspection is associated with a specific application, preserve the same Application ID and application context throughout.

Use the same established EKATMA visual language as the existing Entrepreneur screens and corrected E14–E19 screens.

**Do not introduce emojis, decorative/AI-generated icons, illustrations, gradients, glassmorphism, or a new SaaS-style visual system. Reuse existing EKATMA components, typography, spacing, tables, buttons, status badges, breadcrumbs, and page structure.**

---

# 1. PURPOSE

E22 should provide one consolidated place for the entrepreneur to understand:

* Which inspections are required
* Which department(s) are involved
* When the inspection is scheduled
* Where it will happen
* What the entrepreneur needs to prepare
* Which documents are relevant
* What the department checklist covers
* Whether observations were raised
* Whether correction is required
* Whether re-inspection is required
* Whether the inspection is resolved

Support inspections across multiple departments.

Do not create separate inspection centres for different departments.

---

# 2. PAGE HEADER

Use the existing EKATMA page structure.

Breadcrumb:

**Dashboard > Inspections**

Page title:

**Inspection Centre**

Supporting context:

**Sahyadri Bio-Pharma Pvt Ltd — Chakan Industrial Area Phase II**

Do not create a large inspection-specific hero/header.

---

# 3. INSPECTION LIST

Show the entrepreneur's inspections in a clean government-portal-style table/list.

Each inspection record should show:

* **Inspection ID**
* **Department(s)**
* **Inspection Type**
* **Related Application ID / Approval**
* **Date / Time**
* **Site**
* **Status**
* **Action Required**

Use realistic prototype records.

Example:

**INS-001**

Departments:
**MIDC + Fire + DISH**

Inspection type:
**Coordinated Site Inspection**

Related applications:
**MIDC Application / Fire Application / DISH Application**

Status:
**Scheduled**

Action:
**View Preparation Checklist**

Another example:

**INS-002**

Department:
**MPCB**

Inspection type:
**Environmental Inspection**

Related Application:
**MPCB CTE**

Status:
**Observation Raised**

Action:
**View Observation**

---

# 4. INSPECTION ID

Every inspection must have a stable unique:

**Inspection ID**

Example:

**INS-001**

The same Inspection ID must be retained throughout the inspection lifecycle:

**Required**
→ **Scheduled**
→ **Completed**
→ **Observation Raised**
→ **Correction Submitted**
→ **Re-inspection Required**
→ **Resolved**

Do not create a new Inspection ID every time the inspection status changes.

---

# 5. INSPECTION DETAIL

Clicking an inspection should open its detailed inspection context.

Show:

### Inspection Information

* Inspection ID
* Department(s)
* Inspection type
* Related Application ID
* Related approval where applicable
* Status

### Visit Information

* Date
* Time
* Site
* Inspection team placeholder

### Preparation

* Preparation requirements
* Required evidence
* Relevant documents
* Department checklist summary

### Outcome

* Inspection observations
* Correction required
* Re-inspection requirement
* Current resolution state

Keep these as clear sections rather than excessive decorative cards.

---

# 6. INSPECTION TEAM

Show a simple placeholder for the inspection team.

Example:

**Inspection Team**

Department representatives assigned for this inspection.

Do not expose internal officer-only controls or private departmental workflow information.

The entrepreneur needs to understand the inspection arrangement, not manage the department's internal team assignment.

---

# 7. PREPARATION REQUIREMENTS

Show what the entrepreneur should prepare before the inspection.

Examples:

* Required site access
* Relevant project documents
* Equipment / machinery information
* Safety-related evidence
* Environmental records
* Previously submitted documents
* Department-specific checklist items

Only show requirements applicable to the selected inspection.

Do not invent legal requirements merely to populate the UI.

---

# 8. SHARED DOCUMENTS

Show documents relevant to the inspection.

Examples:

* Project documents
* Approved plans
* Previous approvals
* Technical documents
* Environmental documents
* Safety documents

Where the document already exists in the Universal Document Centre:

**Reuse existing document**

Do not create a second copy of the document specifically for the inspection.

Provide navigation to:

**E11 Document Centre**

and relevant document detail/help:

**E12 Document Detail / Help**

---

# 9. DEPARTMENT CHECKLIST SUMMARY

Show a concise summary of the department's inspection checklist.

Example:

**Checklist Summary**

* Site / project information
* Technical requirements
* Safety requirements
* Supporting documents
* Relevant service-specific checks

The exact checklist can vary by department.

Do not create a single universal checklist that falsely implies every department checks the same things.

The architecture should allow each department to configure its own checklist while using the same entrepreneur-side inspection interface.

---

# 10. COMMON INSPECTION

Support coordinated inspections when legally and operationally compatible.

Example combinations may include:

**MIDC + Fire + DISH**

or:

**MPCB + Fire + DISH**

When compatible, show:

**Coordinated Site Inspection**

and clearly identify all participating departments.

The inspection should retain:

* One Inspection ID
* Shared date/time where coordinated
* Shared site
* Participating departments
* Department-specific checklist items
* Shared documents
* Individual observations where applicable

---

# 11. IMPORTANT COMMON-INSPECTION RULE

Do **not** imply that all inspections can always be combined.

A coordinated inspection should only appear when the underlying configuration permits it.

If departments require separate visits:

Show separate inspection records.

Example:

**INS-001 — MPCB Inspection**

**INS-002 — Fire Inspection**

Do not combine them simply because they happen at the same site.

---

# 12. INSPECTION STATUSES

Support these statuses:

* **Required**
* **Awaiting Schedule**
* **Scheduled**
* **Completed**
* **Observation Raised**
* **Correction Submitted**
* **Re-inspection Required**
* **Resolved**

Use the existing EKATMA status treatment.

Do not introduce a new status model.

The same status should be understandable across Entrepreneur and Department views.

---

# 13. STATUS BEHAVIOR

### Required

Inspection is required but has not yet been scheduled.

### Awaiting Schedule

The inspection requirement exists and scheduling is pending.

### Scheduled

Date/time and site information are available.

### Completed

The site inspection has been completed and the inspection outcome is being recorded/processed.

### Observation Raised

The inspection produced one or more observations requiring attention.

### Correction Submitted

The entrepreneur has submitted the requested correction/evidence.

### Re-inspection Required

The department requires another inspection.

### Resolved

The inspection-related issue has been resolved.

Do not skip directly between states without the corresponding event/context.

---

# 14. OBSERVATIONS

When observations are raised, show:

* Observation ID where applicable
* Description
* Related checklist item
* Relevant document/evidence where applicable
* Required correction
* Current response state
* Date raised

Keep observation information separate from the general inspection status.

---

# 15. CORRECTION REQUIRED

If correction is required, clearly explain what the entrepreneur needs to address.

Example:

**Correction Required**

“Provide updated evidence for the observed issue.”

Then provide:

**Respond to Observation**

Do not label an inspection observation as an application rejection.

An inspection correction is not automatically a final application rejection.

---

# 16. RE-INSPECTION

If a re-inspection is required, show:

**Re-inspection Required**

Provide:

* Reason
* Related observation
* Current state
* Scheduling information when available

Keep the same original Inspection ID.

Do not create an unrelated inspection record simply because a re-inspection occurs.

---

# 17. ACTIONS

Depending on the inspection state, provide only relevant entrepreneur actions:

* **View Preparation Checklist**
* **View Documents**
* **Add Requested Evidence**
* **View Observation**
* **Respond to Observation**

Do not display all actions simultaneously if they are not applicable.

For example:

A scheduled inspection may show:

**View Preparation Checklist**

**View Documents**

An observation state may show:

**View Observation**

**Respond to Observation**

---

# 18. APPLICATION CONNECTION

Every inspection associated with an application must clearly show:

**Related Application ID**

Clicking it should open:

**E19 Application Detail**

The application detail should in turn show that an inspection exists.

This creates the relationship:

**Application**
→ **Inspection**
→ **Observation / Correction**
→ **Decision**

Do not create an isolated inspection record disconnected from the application.

---

# 19. APPROVAL CONNECTION

Where an inspection contributes to an approval/decision:

**Inspection**
→ **E23 Approval / Decision Detail**

After the inspection is resolved and the department reaches a decision, the entrepreneur should be able to follow the existing approval flow.

Do not imply that completing an inspection automatically means the application is approved.

---

# 20. DEPARTMENT-SIDE CONSISTENCY

The entrepreneur and department must reference the **same inspection record**.

Use the same:

* Inspection ID
* Related Application ID
* Department(s)
* Inspection type
* Date/time
* Site
* Status
* Observation state

A status update made by the department should be reflected in the entrepreneur's E22 view.

Do not create separate entrepreneur-side and department-side Inspection IDs.

---

# 21. NAVIGATION

Provide appropriate links to:

**Application Detail → E19**

**Documents → E11**

**Document Detail → E12**

**Regulatory Journey → E09**

**Dependency Graph → E13**

**Approval / Decision → E23** where applicable.

Use simple text links consistent with the existing EKATMA interface.

---

# 22. VISUAL CONSISTENCY — IMPORTANT

E22 must look like a **natural continuation of the existing EKATMA portal**, not a new inspection-management product.

Reuse the existing:

* Government of Maharashtra header
* EKATMA header/navigation
* Breadcrumb
* Typography
* Content width
* Tables
* Form components
* Buttons
* Status badges
* Alerts
* Borders
* Spacing
* Colors
* Page background
* Action patterns

**Do not use emojis or decorative icons.**

Do not use:

* Emoji icons
* Robot icons
* Sparkle/AI icons
* Decorative illustrations
* Gradients
* Glassmorphism
* Excessive rounded cards
* Generic SaaS dashboard styling
* A new color palette
* A separate inspection-specific visual language

When an existing EKATMA component can represent something, reuse it.

When an icon is not necessary, use **plain text**.

---

# 23. FINAL END-TO-END TEST

The inspection flow should work as one continuous part of the regulatory process:

**E18 Application Tracker**
→ **E19 Application Detail**
→ **E22 Inspection Centre**
→ **Scheduled / Completed**
→ **Observation Raised**
→ **Correction Submitted**
→ **Re-inspection Required if applicable**
→ **Resolved**
→ **E23 Approval / Decision**

The screen should answer:

**“What inspection is happening, who/which departments are involved, when and where is it happening, what do I need to prepare, and what happens if an observation is raised?”**

It should not feel like a separate product or a generic AI-generated dashboard.
