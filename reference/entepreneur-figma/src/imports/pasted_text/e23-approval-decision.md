Create **E23 — Approval / Decision Detail**.

E23 is the entrepreneur-facing final decision screen connected to the existing application and inspection lifecycle:

**E19 Application Detail**
→ **E22 Inspection Centre** where applicable
→ **E23 Approval / Decision Detail**
→ **E24 Compliance Dashboard** where an approval generates compliance obligations

Use the same established EKATMA visual language and components as the existing Entrepreneur screens.

**Do not introduce emojis, decorative/AI-generated icons, illustrations, gradients, glassmorphism, or a new SaaS-style visual system. Reuse the existing EKATMA header, breadcrumb, typography, spacing, tables, buttons, status badges, borders, colors, and page structure.**

---

# 1. PURPOSE

E23 must provide one authoritative entrepreneur-facing view of the department's decision on an application.

It must clearly distinguish:

* Approved
* Rejected
* Active correction / rework

Do not treat every non-approved state as rejection.

The screen should communicate:

**What was decided → what document/order was issued → what conditions apply → what happens next.**

---

# 2. PAGE HEADER

Use the existing EKATMA page structure.

Breadcrumb:

**Dashboard > Applications > Approval / Decision**

Show:

**Approval / Decision Detail**

Then the service context:

**[Department] — [Service]**

Supporting business/project context:

**[Business Name] — [Project Name / Location]**

Do not create a separate large decision-specific hero header.

---

# 3. CANONICAL IDENTIFIERS

Show the canonical identifiers clearly:

* **Decision ID**
* **Application ID**
* **Department**
* **Service ID / Service**
* **Approval / Order / Certificate ID** where approved

These identifiers must remain consistent with the corresponding E19 application and Department-side record.

Do not create new IDs simply for the E23 interface.

---

# 4. DECISION STATE

Clearly show the current decision state.

Possible primary states:

### APPROVED

The department has approved the application.

### REJECTED

The department has rejected the application.

### CORRECTION / REWORK

The application remains in the active application/rework lifecycle.

**Correction must NOT be represented as final rejection.**

Use the existing EKATMA status treatment rather than creating a new visual status system.

---

# 5. APPROVED STATE

When the application is approved, show:

## Approval Information

* Approval order
* Certificate
* Issue date
* Expiry date where applicable
* Conditions
* Special conditions
* Source
* Related documents
* Renewal requirement
* Version history

Clearly identify the approved outcome.

Example structure:

**Decision: Approved**

**Approval / Certificate ID:** [ID]

**Issue Date:** [date]

**Expiry Date:** [date, where applicable]

**Conditions:** [conditions]

**Special Conditions:** [conditions, where applicable]

---

# 6. APPROVAL ORDER / CERTIFICATE

Provide access to the approved order/certificate.

The entrepreneur should be able to:

* View the approval
* View the certificate
* Access relevant document information
* Navigate to the Document Centre

The approved certificate must automatically become part of the existing **E11 Universal Document Centre**.

Do not create a separate certificate repository.

---

# 7. DOCUMENT CENTRE INTEGRATION

When an approval generates a certificate/order:

Automatically create the corresponding document record in E11 with its own:

* Document ID
* Version
* Source
* Verification state
* Validity
* Reuse attribute where applicable

The relationship should be:

**Approval / Decision**
→ **Generated Certificate / Order**
→ **E11 Document Centre**

Provide a clear action such as:

**View in Document Centre**

→ **E11**

Do not duplicate the certificate into another repository.

---

# 8. CONDITIONS

Show approval conditions clearly.

Separate:

### Conditions

Normal conditions attached to the approval.

### Special Conditions

Additional conditions where applicable.

Do not hide important conditions inside a long paragraph.

Where a condition creates an ongoing obligation, make the connection clear.

---

# 9. APPROVAL → COMPLIANCE

Where configured, show:

**Approval → Conditions → Compliance Obligations**

Explain that applicable approval conditions can generate ongoing compliance obligations.

Provide:

**View Compliance Obligations**

→ **E24 Compliance Dashboard**

and, where applicable:

**View Compliance Detail**

→ **E25**

Do not imply that every approval automatically creates compliance obligations.

Only show generated obligations where configured.

---

# 10. DEPENDENCY EFFECT

Show exactly what changes in the Regulatory Journey after approval.

Create a section:

### Dependency Effect

Show downstream requirements/nodes that become available because of this approval.

Example:

**MPCB CTE — Approved**

↓

**Building / Planning — Ready**

↓

**Provisional Fire — Ready**

Only show downstream nodes that are actually configured as dependent on this approval.

Do not imply that approval unlocks every downstream service.

Provide:

**View Regulatory Journey →**

→ **E09**

and where relevant:

**View Dependency Graph →**

→ **E13**

---

# 11. REJECTED STATE

If the department rejects the application, show:

* Rejection reason
* Officer remarks where exposed
* Supporting source/basis where exposed
* Downstream nodes blocked
* Appeal / grievance / reapply path where applicable

Clearly distinguish the rejection from a correction/query state.

Do not invent appeal rights or procedures that are not configured for the service.

---

# 12. REJECTION AND DOWNSTREAM DEPENDENCIES

For a rejected application, clearly show which downstream requirements remain blocked.

Example:

**Decision: Rejected**

**Downstream effect:**

Building / Planning → Blocked

Related dependent requirement → Blocked

Provide:

**View Dependency Graph → E13**

The dependency display must use the existing Regulatory Journey/dependency model rather than creating a separate dependency system.

---

# 13. CORRECTION / REWORK STATE

If the department requests correction rather than issuing a final rejection:

Show the application as remaining in the active application/rework lifecycle.

Example:

**Status: Correction Required**

Then provide the relevant path:

**View Query / Correction → E20**

and, where applicable:

**Delta Resubmission → E21**

Do NOT show:

**Rejected**

Do NOT create a rejection record merely because corrections are required.

---

# 14. VERSION HISTORY

Provide a compact version-history section.

Show relevant decision/application versions.

Example:

**Decision Version 1 — Current**

Issued: [date]

**Application Version: Resubmission #2**

Where applicable, allow the entrepreneur to view previous versions.

Do not silently overwrite previous approval/order/certificate versions.

---

# 15. RELATED RECORDS

Where applicable, connect E23 to:

* Application
* Inspection
* Documents
* Dependencies
* Compliance obligations
* Grievance

Provide simple navigation links to the relevant existing screens.

Examples:

**View Application → E19**

**View Inspection → E22**

**View Documents → E11**

**View Requirement → E10**

**View Regulatory Journey → E09**

**View Compliance → E24**

Do not create duplicate versions of these records inside E23.

---

# 16. APPROVAL ACTIONS

For an approved application, provide only relevant entrepreneur actions.

Examples:

* View Approval
* View Certificate
* View Document Centre
* View Conditions
* View Compliance Obligations
* View Regulatory Journey
* View Renewal Requirement where applicable

Do not expose department-only controls.

---

# 17. REJECTION ACTIONS

For a rejected application, provide only applicable next steps.

Examples:

* View rejection basis
* View Dependency Impact
* Raise Grievance where configured
* View Appeal path where configured
* Reapply where permitted

Do not show an action unless the relevant service configuration supports it.

---

# 18. NO DECISION / ACTIVE STATE

If E23 is reached while a final decision has not yet been issued, do not fabricate an approval or rejection.

Instead, direct the user back to the application's current processing state:

**Application is still under processing.**

→ **View Application Detail**

→ **E19**

E23 should represent an actual decision when one exists.

---

# 19. PROTOTYPE CONNECTIVITY

Maintain the complete lifecycle:

**E18 Application Tracker**
→ **E19 Application Detail**
→ **E22 Inspection Centre** where applicable
→ **E23 Approval / Decision Detail**

From E23:

**Approval / Certificate**
→ **E11 Document Centre**

**Related Requirement**
→ **E10 Requirement Detail**

**Dependency**
→ **E09 Regulatory Journey / E13 Dependency Graph**

**Correction**
→ **E20 Query / Deficiency Response**
→ **E21 Delta Resubmission**

**Compliance**
→ **E24 Compliance Dashboard**
→ **E25 Compliance Detail**

**Application**
→ **E19 Application Detail**

---

# 20. VISUAL CONSISTENCY — IMPORTANT

E23 must look like a **direct continuation of the existing EKATMA Government of Maharashtra portal**, not a new approval/certificate product.

Reuse the existing:

* Government of Maharashtra header
* EKATMA navigation
* Breadcrumb
* Typography
* Content width
* Tables
* Forms
* Buttons
* Status badges
* Alerts
* Borders
* Spacing
* Colors
* Page background
* Action patterns

**Do NOT use emojis or decorative icons.**

Do not use:

* Emoji symbols
* Robot/AI icons
* Sparkle icons
* Decorative illustrations
* Gradients
* Glassmorphism
* Excessive rounded cards
* Generic SaaS dashboard styling
* New color palettes
* New approval-specific visual language

If an existing EKATMA component can represent something, reuse it.

When an icon is not necessary, use **plain text**.

---

# 21. FINAL STATE CONSISTENCY RULE

The E23 information must agree with the corresponding E19 application state, E22 inspection state where applicable, and the Department-side decision record.

Do not create contradictions such as:

**Approved**
while the application is still shown as **Under Review**,

or:

**Rejected**
while the application is shown as **Correction Required**.

The same canonical decision/application records should drive all views.

---

# 22. FINAL END-TO-END TEST

The complete lifecycle should communicate:

**Application Submitted**
→ **Department Processing**
→ **Inspection where applicable**
→ **Decision**
→

### If Approved:

**Approval**
→ **Conditions**
→ **Certificate / Order**
→ **Document Centre**
→ **Dependency Unlock**
→ **Compliance Obligations where configured**

### If Rejected:

**Rejection**
→ **Reason / Basis**
→ **Downstream Dependencies Blocked**
→ **Applicable Appeal / Grievance / Reapply path**

### If Correction Required:

**Correction**
→ **E20 Query**
→ **E21 Delta Resubmission**
→ **Continued Application Lifecycle**

E23 must make the entrepreneur understand **what the department decided, what that decision means for the rest of the regulatory journey, and what they need to do next**.
