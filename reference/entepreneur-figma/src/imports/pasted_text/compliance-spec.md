Create:

* **E24 — Compliance Dashboard**
* **E25 — Compliance Detail**

These screens continue the existing EKATMA lifecycle:

**E23 Approval / Decision Detail**
→ **Approval Conditions**
→ **Compliance Obligations**
→ **E24 Compliance Dashboard**
→ **E25 Compliance Detail**

Keep the visual language consistent with the existing EKATMA Entrepreneur portal and the corrected E14–E23 screens.

**Do not introduce emojis, decorative/AI-generated icons, illustrations, gradients, glassmorphism, or a new SaaS-style visual system. Reuse the established EKATMA header, breadcrumb, typography, spacing, tables, buttons, status badges, borders, colors, and page structure.**

---

# E24 — COMPLIANCE DASHBOARD

## 1. PURPOSE

E24 is the entrepreneur's **post-operation compliance control centre**.

It consolidates ongoing obligations across multiple departments into one place.

The dashboard should answer:

* What compliance obligations do I have?
* Which ones are due soon?
* Which are overdue?
* Which department does each obligation belong to?
* What action do I need to take?
* What needs verification?
* What renewals or inspections are coming up?

Do not create separate compliance dashboards for different departments.

---

# 2. PAGE HEADER

Use the established EKATMA page structure.

Breadcrumb:

**Dashboard > Compliance**

Page title:

**Compliance Dashboard**

Supporting context:

**Sahyadri Bio-Pharma Pvt Ltd — Chakan Industrial Area Phase II**

Do not create a separate compliance-specific hero header.

---

# 3. SUMMARY

Provide a compact summary of the current compliance position.

Show:

* **Due This Month**
* **Due in Next 30 Days**
* **Overdue**
* **Renewals**
* **Inspections**

Use the existing EKATMA summary treatment.

Do not turn these into oversized colorful dashboard cards.

---

# 4. COMPLIANCE CATEGORIES

Support:

* Periodic Returns
* Renewals
* Inspections
* Environmental
* Labour
* Sector-specific
* Approval Conditions
* Other

These are categories/filters within the same compliance system.

Do not create separate pages or repositories for each category.

---

# 5. COMPLIANCE STATUSES

Support these states:

* **Compliant**
* **Due Soon**
* **Overdue**
* **Action Required**
* **Under Verification**

Use the existing EKATMA status badge treatment.

Do not create a new status model.

---

# 6. EXAMPLE OBLIGATIONS

Use realistic prototype examples such as:

* **MPCB CTO Renewal**
* **Fire Certificate Renewal**
* **Factory-related Return**
* **Sector-specific compliance obligation**

The examples should demonstrate different departments, categories, due states, and actions.

Do not invent specific legal requirements, deadlines, or regulatory claims merely for visual content.

---

# 7. LIST VIEW

Provide a clean government-portal-style list/table.

Useful columns may include:

* Obligation
* Department
* Category
* Due Date
* Frequency
* Status
* Action Required

The table should allow the entrepreneur to quickly identify what needs attention.

Do not use oversized cards for every obligation.

Clicking an obligation should open:

**E25 Compliance Detail**

---

# 8. CALENDAR VIEW

Provide a **Calendar** view alongside the **List** view.

Allow the entrepreneur to see upcoming compliance events chronologically.

The calendar should surface:

* Due dates
* Renewals
* Periodic returns
* Inspections
* Other configured compliance deadlines

Selecting an obligation from the calendar should open its E25 detail.

Do not create a completely different visual system for the calendar.

---

# 9. FILTERS

Provide compact filters for:

* Department
* Obligation Type

Keep the filters consistent with the existing EKATMA interface.

Do not create a large analytics dashboard around the filters.

---

# 10. ACTION REQUIRED

Clearly identify obligations where the entrepreneur needs to act.

Examples:

**Start Renewal**

**Submit Return**

**Upload Evidence**

**Respond / Complete Required Information**

For obligations requiring no immediate action:

**No Action Required**

Do not show an action merely because an obligation exists.

---

# E25 — COMPLIANCE DETAIL

## 11. PURPOSE

E25 provides the complete context for one compliance obligation.

The entrepreneur should understand:

**What is the obligation?**

**Why does it exist?**

**Which approval/condition created it?**

**When is it due?**

**What do I need to submit?**

**What is its current state?**

**What happens next?**

---

# 12. PAGE HEADER

Use the established EKATMA structure.

Breadcrumb:

**Dashboard > Compliance > Compliance Detail**

Show:

**[Compliance Obligation]**

Supporting context:

**[Department] — [Business / Project]**

Show the current status clearly.

---

# 13. OBLIGATION INFORMATION

Show:

* **Obligation**
* **Department**
* **Source Approval**
* **Relevant Condition**
* **Due Date**
* **Frequency**
* **Required Documents**
* **Previous Submission**
* **Current State**
* **Verification**
* **Next Due Date**

Keep these as structured information rather than one large paragraph.

---

# 14. APPROVAL → CONDITION → OBLIGATION

Clearly explain the relationship:

**Approval**
→ **Condition**
→ **Compliance Obligation**

Example:

**MPCB Approval**

↓

**Approval condition**

↓

**Periodic environmental return**

This relationship must be traceable.

Every compliance obligation must link back to the relevant **approval and/or regulatory rule** that generated it.

---

# 15. SOURCE APPROVAL

Show the originating approval/order/certificate.

Provide:

**View Source Approval**

→ **E23 Approval / Decision Detail**

The entrepreneur should be able to understand why the obligation exists.

Do not create a separate compliance-only source record.

---

# 16. RELEVANT CONDITION

If the obligation originates from an approval condition, show the relevant condition.

Example:

**Relevant Condition**

[Configured approval condition]

If there is no specific approval condition and the obligation comes directly from a regulatory rule, clearly identify the regulatory source instead.

Do not invent a condition.

---

# 17. DUE DATE AND FREQUENCY

Show:

**Due Date**

**Frequency**

Examples of frequency values may include:

* Periodic
* Annual
* Renewal-based
* Event-based
* As configured by the obligation

Show:

**Next Due Date**

where applicable.

Do not assume every obligation has a recurring frequency.

---

# 18. REQUIRED DOCUMENTS

Show the documents/evidence needed for the compliance action.

Where documents already exist in the Universal Document Centre:

allow reuse rather than requesting another upload.

Provide navigation to:

**E11 Document Centre**

and relevant document detail:

**E12 Document Detail / Help**

Do not create a separate compliance document repository.

---

# 19. PREVIOUS SUBMISSION

Where a previous submission exists, show:

* Previous submission date
* Submission/reference information where configured
* Previous state
* Relevant evidence/documents
* Verification state

Do not fabricate submission references.

If no previous submission exists:

**No previous submission**

---

# 20. CURRENT STATE

Show the current compliance state using the established statuses:

* Compliant
* Due Soon
* Overdue
* Action Required
* Under Verification

Explain the state briefly where useful.

Example:

**Due Soon**

**This obligation is due within the configured reminder period.**

Do not make legal conclusions from the status.

---

# 21. VERIFICATION

Show the verification state where applicable.

The user should be able to distinguish:

* Submitted
* Under Verification
* Verified
* Other configured verification state

Do not collapse verification into the compliance status.

For example:

**Status:** Due Soon

**Verification:** Not Yet Submitted

These are separate dimensions.

---

# 22. ACTIONS

Provide only relevant actions:

* **Start Return / Renewal**
* **Upload Evidence**
* **View Source Approval**
* **Ask Regulatory Assistant**

Where a return/renewal application exists, connect it to the existing application flow rather than creating a separate compliance submission system.

---

# 23. REGULATORY ASSISTANT

Provide:

**Ask Regulatory Assistant**

Suggested contextual questions:

* Why is this compliance obligation required?
* Which approval created it?
* What condition does it relate to?
* What documents are required?
* When is it due?
* What should I submit?

Use the existing Regulatory Assistant pattern.

Do not introduce a new chatbot UI.

The assistant should explain/retrieve information and provide source context; it must not act as the department's approval authority.

---

# 24. PROTOTYPE CONNECTIVITY

Connect the compliance lifecycle to the existing EKATMA system:

**E23 Approval / Decision Detail**
→ **Approval Conditions**
→ **Compliance Obligation**
→ **E24 Compliance Dashboard**
→ **E25 Compliance Detail**

From E25:

**View Source Approval**
→ **E23**

**View Documents**
→ **E11**

**Document Help**
→ **E12**

**Ask Regulatory Assistant**
→ **Existing Regulatory Assistant**

**Start Return / Renewal**
→ Existing application workflow where applicable

Where a compliance action creates a new application, continue through the existing:

**E14 → E15 → E16 → E17 → E18 → E19**

flow rather than inventing a separate submission architecture.

---

# 25. VISUAL CONSISTENCY — IMPORTANT

E24 and E25 must look like **direct continuations of the existing EKATMA Government of Maharashtra portal**.

Reuse:

* Government of Maharashtra header
* EKATMA header/navigation
* Breadcrumbs
* Typography
* Page width
* Tables
* Forms
* Buttons
* Status badges
* Alerts
* Borders
* Spacing
* Colors
* Page background
* Existing action patterns

**Do not use emojis or decorative/AI-generated icons.**

Do not introduce:

* Emoji symbols
* Robot/AI icons
* Sparkle icons
* Decorative illustrations
* Gradients
* Glassmorphism
* Excessive rounded cards
* Generic SaaS dashboard styling
* New color palettes
* New compliance-specific visual language

If an existing EKATMA component can represent something, reuse it.

When an icon is unnecessary, use **plain text**.

---

# 26. STATE CONSISTENCY

The compliance state must remain consistent across:

**E23 Approval**
→ **E24 Compliance Dashboard**
→ **E25 Compliance Detail**

If an obligation is generated from an approval condition, the relationship must be visible.

Do not show:

**Compliant**

in E24 while E25 says the same obligation is **Overdue**, unless there is a clearly represented state update/verification transition.

Likewise, do not show an obligation as generated if its source approval/condition does not exist in the prototype data.

---

# 27. FINAL END-TO-END TEST

The completed flow should communicate:

**Approval**
→ **Conditions**
→ **Compliance Obligation Generated**
→ **Compliance Dashboard**
→ **Compliance Detail**
→ **Start Return / Renewal**
→ Existing Application Flow where applicable

E24 should answer:

**“What compliance obligations do I have and what needs my attention?”**

E25 should answer:

**“Why do I have this obligation, when is it due, what do I need to submit, and which approval/rule does it come from?”**

The compliance module must feel like an integrated part of EKATMA's regulatory lifecycle, not a separate compliance-management product.
