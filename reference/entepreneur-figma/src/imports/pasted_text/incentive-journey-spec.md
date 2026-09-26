Create:

* **E26 — Incentives Discovery**
* **E27 — Incentive Detail**

These screens form the incentive journey within the existing EKATMA Entrepreneur flow:

**Business Profile / Business DNA**
→ **E26 Incentives Discovery**
→ **E27 Incentive Detail**
→ **E28 Incentive Eligibility / Claims / Disbursement**

Use the existing EKATMA Business Profile data to identify potentially relevant schemes.

**Do not introduce a new visual style. Reuse the established EKATMA header, breadcrumb, typography, spacing, tables, buttons, status badges, borders, colors, and page structure. Do not use emojis, decorative/AI-generated icons, illustrations, gradients, glassmorphism, or generic SaaS dashboard styling.**

---

# E26 — INCENTIVES DISCOVERY

## 1. PURPOSE

E26 helps the entrepreneur discover government incentive schemes that may be relevant to their existing business/project profile.

The system should use information already captured in the Business Profile / Business DNA.

**Do not repeat the full business questionnaire.**

The page should answer:

**“Which incentive schemes may be relevant to my business?”**

It must clearly distinguish a **preliminary match** from confirmed legal eligibility.

---

# 2. PAGE HEADER

Use the existing EKATMA page structure.

Breadcrumb:

**Dashboard > Incentives**

Page title:

**Incentives**

Supporting context:

**Sahyadri Bio-Pharma Pvt Ltd — Chakan Industrial Area Phase II**

Do not create a separate incentive-specific hero header.

---

# 3. USE EXISTING BUSINESS PROFILE

Use available Business Profile / Business DNA attributes such as:

* Sector
* Location
* Classification
* Investment
* Employment
* Business / project stage
* Scheme-defined attributes

Do not ask the entrepreneur to enter these facts again.

Where useful, show that the scheme match is based on existing profile information.

Example:

**Matched using your Business Profile**

Do not create another questionnaire inside E26.

---

# 4. SCHEME LIST

Show relevant schemes in a clean EKATMA-style list/table.

For each scheme show:

* **Scheme Name**
* **Administering Authority**
* **Potential Benefits**
* **Eligibility State**
* **Key Milestone**
* **View Details**

Example structure:

| Scheme        | Authority   | Potential Benefits | Eligibility                          | Key Milestone |
| ------------- | ----------- | ------------------ | ------------------------------------ | ------------- |
| [Scheme Name] | [Authority] | [Benefits]         | Appears eligible from available data | [Milestone]   |

Use realistic prototype examples only where appropriate.

Do not invent specific legal benefits, eligibility thresholds, or government scheme rules merely for visual content.

---

# 5. ELIGIBILITY STATES

Support:

### Appears eligible from available data

The available Business Profile information appears to match the configured preliminary conditions.

### Needs Verification

The available information is insufficient or requires verification.

### Missing Condition-data

A required condition/data point is not currently available.

### Not Currently Applicable

The available profile does not currently match the configured applicability conditions.

Use these as **preliminary eligibility states**.

---

# 6. IMPORTANT ELIGIBILITY RULE

Do not present:

**“Appears eligible from available data”**

as:

**“Eligible”**

Do not imply that EKATMA has made a final legal eligibility determination.

Use language such as:

**Preliminary match based on available business data. Final eligibility is subject to scheme rules and verification by the administering authority.**

Do not assign an overall eligibility score or ranking.

---

# 7. FILTERING

Provide useful filters where appropriate:

* Administering Authority
* Eligibility State
* Scheme category
* Business/project stage

Keep filters compact and consistent with the existing EKATMA interface.

Do not create an analytics-heavy dashboard.

---

# 8. SCHEME INTERACTION

Clicking:

**View Details**

must open:

**E27 Incentive Detail**

Pass the selected scheme context into E27.

Do not create a duplicate scheme record.

---

# E27 — INCENTIVE DETAIL

# 9. PURPOSE

E27 provides detailed information about one incentive scheme and its individual benefits.

The most important conceptual rule is:

# **SCHEME ≠ BENEFIT**

One scheme can contain multiple benefits, and eligibility may differ by benefit.

---

# 10. SCHEME HEADER

Show:

* Scheme name
* Administering authority
* Overall preliminary eligibility state
* Relevant business/project context

Example:

**[Scheme Name]**

**Administered by:** [Authority]

**Eligibility:** Appears eligible from available data

Do not present this as final legal eligibility.

---

# 11. BENEFIT STRUCTURE

Represent the scheme as:

**Scheme**

├ **Benefit A**

├ **Benefit B**

└ **Benefit C**

Each benefit should be independently understandable.

Do not collapse all benefits into one generic “scheme benefit” field.

---

# 12. BENEFIT DETAILS

For every benefit, show:

* **Eligibility Conditions**
* **Supported Conditions**
* **Verification Needs**
* **Estimated Benefit**, where supported
* **Required Evidence**
* **Application Steps**
* **Claim Cycle**

Keep benefit-level information separate.

A business may appear eligible for one benefit while another benefit requires additional conditions or verification.

---

# 13. ELIGIBILITY CONDITIONS

Show the conditions relevant to the selected benefit.

Where the Business Profile already satisfies a condition, indicate that using the existing EKATMA verification/state treatment.

Where information is missing:

**Missing Condition-data**

Where verification is required:

**Needs Verification**

Do not ask the entrepreneur to repeat information already available in Business DNA.

---

# 14. SUPPORTED CONDITIONS

Clearly distinguish:

**Condition satisfied from available data**

from:

**Condition requiring verification**

from:

**Condition for which data is missing**

Do not convert these into a single eligibility score.

---

# 15. VERIFICATION NEEDS

Show exactly what requires verification where applicable.

Example:

**Needs Verification**

* Investment classification
* Employment condition
* Scheme-specific milestone

Only show conditions relevant to the selected benefit.

Do not claim that a condition is satisfied unless the available source/data supports it.

---

# 16. ESTIMATED BENEFIT

Where the scheme configuration supports an estimate, show it as an estimate.

Example:

**Estimated Benefit:** [configured estimate]

Clearly label it as:

**Estimated / Preliminary**

Do not present an estimate as a guaranteed sanctioned amount.

If no reliable estimate is available:

**Benefit estimate not available**

Do not fabricate one.

---

# 17. EVIDENCE

Show the evidence/data required to establish eligibility.

Where an existing document can be reused from E11:

**Use Existing Document**

→ **E11 Document Centre**

Do not create a separate incentive document repository.

---

# 18. APPLICATION STEPS

Show the configured incentive process at a high level.

Example structure:

**Preliminary Match**
→ **Eligibility Application**
→ **Authority Verification**
→ **Eligibility Certificate** where applicable
→ **Periodic Claims**
→ **Verification**
→ **Sanction / Disbursement**

Do not imply that every scheme follows exactly the same lifecycle.

Only show steps configured for the selected scheme.

---

# 19. CLAIM CYCLE

Where the benefit supports periodic claims, show:

* Claim cycle
* Relevant evidence
* Submission requirement
* Verification stage

Examples:

**Periodic Claim**

**Annual Claim**

**Milestone-based Claim**

Use the configured scheme information.

Do not assume every benefit has periodic claims.

---

# 20. CTA

Provide:

**Apply for Eligibility**

This should begin the existing incentive eligibility/application flow.

Where applicable:

**E27 → E28 Incentive Eligibility / Claims / Disbursement**

Do not create a completely separate application architecture for incentives if the existing E28 flow already handles it.

---

# 21. REGULATORY ASSISTANT

Where the existing Regulatory Assistant is available, allow contextual help.

Useful prompts may include:

* Why does this scheme appear relevant?
* Which condition is missing?
* What evidence is required?
* Which benefit am I being matched to?
* What needs verification?
* How is the estimated benefit calculated?

The Assistant should explain/retrieve configured information.

It must not turn a preliminary scheme match into a final legal eligibility decision.

---

# 22. PROTOTYPE CONNECTIVITY

Connect the incentive flow with the existing EKATMA system:

**Business Profile / Business DNA**
→ **E26 Incentives Discovery**
→ **E27 Incentive Detail**
→ **E28 Incentive Eligibility / Claims / Disbursement**

Additional connections:

**Documents**
→ **E11 Document Centre**

**Document Help**
→ **E12 Document Detail / Help**

**Regulatory Assistant**
→ Existing Regulatory Assistant

**Business / Project Profile**
→ Existing Business Profile / Master Project Dossier where relevant

Do not create duplicate Business Profile data for incentives.

---

# 23. VISUAL CONSISTENCY — IMPORTANT

E26 and E27 must look like **direct continuations of the existing EKATMA Government of Maharashtra portal**, not a separate scheme-discovery product.

Reuse the established:

* Government of Maharashtra header
* EKATMA navigation
* Breadcrumb
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
* Background
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
* New incentive-specific visual language

If an existing EKATMA component can represent something, reuse it.

When an icon is unnecessary, use **plain text**.

---

# 24. STATE CONSISTENCY

The incentive information must remain consistent across:

**Business Profile / Business DNA**
→ **E26**
→ **E27**
→ **E28**

If E26 says:

**Needs Verification**

E27 must not suddenly show:

**Eligible**

without a represented verification/update.

If a benefit is only a preliminary match, retain that distinction throughout the flow.

---

# 25. FINAL END-TO-END TEST

The entrepreneur should experience:

**Existing Business Profile**
→ **Potentially Relevant Incentives**
→ **Scheme**
→ **Individual Benefits**
→ **Benefit-level conditions**
→ **Evidence / Verification**
→ **Apply for Eligibility**
→ **E28 Eligibility / Claims / Disbursement**

E26 should answer:

**“Which schemes may be relevant to my business?”**

E27 should answer:

**“Which individual benefits exist under this scheme, what conditions apply to each, what do I need to verify, and how do I proceed?”**

The system must remain clear that **preliminary matching is not final legal eligibility**.
