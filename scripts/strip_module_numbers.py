#!/usr/bin/env python3
"""Strip visible module numbers (MXX) from UI text in App.tsx."""

FILE = '/Users/biancasawant/SIHHHHHH/Ekatma/src/App.tsx'

with open(FILE, 'r', encoding='utf-8') as f:
    content = f.read()

original = content
reps = []


def rep(o, n):
    reps.append((o, n))


# ─── Pattern A: arrow MXX suffix in button/link text ─────────────────────────
rep('Open Cross-form Consistency \u2192 M16', 'Open Cross-form Consistency')
rep('Investigate in Cross-form Consistency \u2192 M16', 'Investigate in Cross-form Consistency')
rep('View Delta Re-scrutiny \u2192 M20', 'View Delta Re-scrutiny')
rep('If changed: View Delta Re-scrutiny \u2192 M20', 'If changed: View Delta Re-scrutiny')
rep('Add to Consolidated Query \u2192 M18', 'Add to Consolidated Query')
rep('View Dependency Graph \u2192 M17', 'View Dependency Graph')
rep('View full Dependency Graph \u2192 M17', 'View full Dependency Graph')
rep('View Full Dependency Journey \u2192 M17', 'View Full Dependency Journey')
rep('View Dependency Journey \u2192 M17', 'View Dependency Journey')
rep('View Dependency \u2192 M17', 'View Dependency')
rep('View Dependencies \u2192 M17', 'View Dependencies')
rep('View Regulatory Dependencies \u2192 M17', 'View Regulatory Dependencies')
rep('View Regulatory Dependency \u2192 M17', 'View Regulatory Dependency')
rep('Open Regulatory Dependency \u2192 M17', 'Open Regulatory Dependency')
rep('View Query History \u2192 M19', 'View Query History')
rep('Query History \u2192 M19', 'Query History')
rep('Review Response \u2192 M19', 'Review Response')
rep('New Query \u2192 M18', 'New Query')
rep('Open Delta \u2192 M20', 'Open Delta')
rep('View Delta \u2192 M20', 'View Delta')
rep('View Business DNA Change \u2192 M07', 'View Business DNA Change')
rep('Open Business DNA \u2192 M07', 'Open Business DNA')
rep('Full timeline \u2192 M08', 'Full timeline')
rep('View Decision Record \u2192 M26', 'View Decision Record')
rep('View Formal Decision \u2192 M26', 'View Formal Decision')
rep('View Original Approval \u2192 M26', 'View Original Approval')
rep('View Approval \u2192 M26', 'View Approval')
rep('Open Inspection Workspace \u2192 M23', 'Open Inspection Workspace')
rep('Open Observation / Re-inspection \u2192 M24', 'Open Observation / Re-inspection')
rep('Observation / Re-inspection \u2192 M24', 'Observation / Re-inspection')
rep('Plan Re-inspection \u2192 M22', 'Plan Re-inspection')
rep('View Compliance Context \u2192 M28', 'View Compliance Context')
rep('Open Expansion / Amendment Intake \u2192 M29', 'Open Expansion / Amendment Intake')
rep('View SLA Breakdown \u2192 M30', 'View SLA Breakdown')
rep('View SLA \u2192 M30', 'View SLA')
rep('SLA Dashboard \u2192 M30', 'SLA Dashboard')
rep('Bottleneck Analytics \u2192 M36', 'Bottleneck Analytics')
rep('Inspection Queue \u2192 M21', 'Inspection Queue')
rep('Dept Analytics \u2192 M35', 'Dept Analytics')
rep('Open Application \u2192 M06', 'Open Application')
rep('Raise Grievance \u2192 M31', 'Raise Grievance')
rep('View Inspection \u2192 M21/M22', 'View Inspection')
rep('View in Regulatory Change Centre \u2192 M33', 'View in Regulatory Change Centre')
rep('Ask RAG \u2192 M32', 'Ask RAG')
rep('Impact Analysis \u2192 M34', 'Impact Analysis')
rep('Impact \u2192 M34', 'Impact')
rep('View Parameter \u2192 M12', 'View Parameter')
rep('View Document \u2192 M13', 'View Document')
rep('Inspection Workspace \u2192 M23', 'Inspection Workspace')

# ─── Pattern B: {p === 'Plot Area' && '→ M12'} ───────────────────────────────
rep("{p} {p === 'Plot Area' && '\u2192 M12'}", '{p}')

# ─── Pattern C: span badges with module numbers ──────────────────────────────
rep('<span className="text-[11px] text-[#374151] font-normal ml-2">M14</span>', '')
rep('<span className="text-[11px] text-[#374151] font-normal ml-2">M15</span>', '')
rep('<span className="text-[11px] text-[#374151] font-normal ml-2">M16</span>', '')
rep('<span className="text-[11px] text-[#374151] font-normal ml-2">M17</span>', '')
rep('<span className="text-[11px] text-[#374151] font-normal ml-2">M18</span>', '')
rep('<span className="text-[11px] font-normal text-[#374151] ml-2">M21</span>', '')
# Pattern J - Review Before Sending h1 (no ml-2 variant)
rep('<span className="text-[11px] text-[#374151] font-normal">M18</span>', '')

# ─── Pattern D: MXX - prefix in breadcrumb label strings ────────────────────
rep("{ label: 'M28 - Conditions / Compliance' }", "{ label: 'Conditions / Compliance' }")
rep("{ label: 'M29 - Expansion / Amendment Intake' }", "{ label: 'Expansion / Amendment Intake' }")
rep("{ label: 'M22 - Inspection Planning' }", "{ label: 'Inspection Planning' }")
rep("{ label: 'M20 - Delta Re-scrutiny' }", "{ label: 'Delta Re-scrutiny' }")
rep("{ label: 'M24 - Observation / Re-inspection' }", "{ label: 'Observation / Re-inspection' }")
# h1 page titles
rep('>M28 - MIDC Conditions / Compliance / Renewal Context<', '>MIDC Conditions / Compliance / Renewal Context<')
rep('>M29 - Expansion / Amendment Intake<', '>Expansion / Amendment Intake<')
# M29 button with arrow
rep('>M29 Expansion / Amendment Intake \u2192<', '>Expansion / Amendment Intake \u2192<')
# SLA/Bottleneck in breadcrumb spans
rep('>SLA Dashboard - M30<', '>SLA Dashboard<')
rep('>Bottleneck Analytics - M36<', '>Bottleneck Analytics<')
# M28 inline UI text
rep("'⏳ M28 Conditions / Compliance handoff: Pending'", "'⏳ Conditions / Compliance handoff: Pending'")
rep("{ label:'M28 Conditions / Compliance',  result:'Pending' }", "{ label:'Conditions / Compliance',  result:'Pending' }")
rep('Compliance obligation generated in M28', 'Compliance obligation generated')
rep('M29 - Expansion / Amendment Intake is available if the entrepreneur submits a Business DNA change.',
    'Expansion / Amendment Intake is available if the entrepreneur submits a Business DNA change.')
rep('Decision cannot be edited from M28.', 'Decision cannot be edited from this view.')
rep("'M28 Conditions / Compliance'", "'Conditions / Compliance'")

# ─── Pattern E: Inline references in italic helper text ─────────────────────
rep('Automated Pre-check \xb7 M09', 'Automated Pre-check')
rep('Officer investigates in M16. M10 identifies the routing condition only.',
    'Officer investigates in Cross-form Consistency. The pre-check identifies the routing condition only.')
rep('Invalid state does not automatically determine application outcome. Final decision belongs to M25/M26.',
    'Invalid state does not automatically determine application outcome. Final decision belongs to the Decision Workspace.')
rep('Approval / rejection belong to M25/M26.',
    'Approval / rejection belong to the Decision Workspace.')
rep('Marking this document invalid records a document-level finding. It does not automatically reject the application. Application outcome belongs to M25/M26.',
    'Marking this document invalid records a document-level finding. It does not automatically reject the application. Application outcome belongs to the Decision Workspace.')
rep('For resubmissions, delta values appear here - open M20 for Delta Re-scrutiny.',
    'For resubmissions, delta values appear here \u2014 open Delta Re-scrutiny.')
rep('Delta resubmission changes \u2192 Open M20 Delta Re-scrutiny \xb7 Dependency impact \u2192 M17',
    'Delta resubmission changes \u2192 Open Delta Re-scrutiny \xb7 Dependency impact')
rep('Application state \u2192 QUERY_RAISED. Entrepreneur receives one consolidated query. Responses tracked in M19.',
    'Application state \u2192 QUERY_RAISED. Entrepreneur receives one consolidated query. Responses tracked in Query History.')
rep('Delta re-scrutiny triggered - open M20 if required.', 'Delta re-scrutiny triggered.')

# ─── Pattern F: mNum rendering in JSX ────────────────────────────────────────
rep('<div className="text-[9px] font-bold text-[#374151] uppercase">{mod.mNum}</div>', '')
rep('>Open {mod.mNum} \u2192</button>', '>Open \u2192</button>')
rep('>Open {m.mNum}</button>', '>Open</button>')

# ─── Pattern G: source fields in deficiency/fixture data ─────────────────────
rep("source:'M16 - Cross-form Consistency'", "source:'Cross-form Consistency'")
rep("source:'M13 - Document Review'", "source:'Document Review'")
rep("source:'M14 - Building / Planning Scrutiny'", "source:'Building / Planning Scrutiny'")
rep("source:'M15 - Water / Utility / Drainage'", "source:'Water / Utility / Drainage'")
rep("source:'M11 - Land / Plot Scrutiny'", "source:'Land / Plot Scrutiny'")
rep("source:'M24 - Observation outcome'", "source:'Observation outcome'")
rep("source:'M14 - Building scrutiny finding'", "source:'Building scrutiny finding'")
rep("source:'M15 - Water scrutiny finding'", "source:'Water scrutiny finding'")
rep("internalNote:'Delta detected during Building Parameters review - see M14.'",
    "internalNote:'Delta detected during Building Parameters review.'")
rep("internalNote:'Marked Needs Verification during M15 review.'",
    "internalNote:'Marked Needs Verification during Water scrutiny review.'")

# ─── Pattern G/H: nextReview fields ──────────────────────────────────────────
rep("nextReview:'M07 - Business DNA'", "nextReview:'Business DNA'")
rep("nextReview:'M16 - Cross-form Consistency'", "nextReview:'Cross-form Consistency'")
rep("nextReview:'M20 - Delta Re-scrutiny'", "nextReview:'Delta Re-scrutiny'")
rep("nextReview:'M17 - Dependencies'", "nextReview:'Dependencies'")
rep("nextReview:'M11 - Scrutiny Workbench'", "nextReview:'Scrutiny Workbench'")
rep("nextReview:'M21 / M22 - Inspection Planning'", "nextReview:'Inspection Planning'")
rep("impact:'Prerequisite pending - detailed status in M17'",
    "impact:'Prerequisite pending - see Regulatory Dependencies'")

# ─── Pattern K: M28 Compliance → and M27 Dep. Update buttons ────────────────
rep('>M28 Compliance \u2192</button>', '>Compliance \u2192</button>')
rep('>M27 Dep. Update</button>', '>Dep. Update</button>')

# ─── links[] labels in data objects ─────────────────────────────────────────
rep("{ label:'Inspection Queue \u2192 M21', fn: () => onOpenInspection?.('INSP-2026-00418') }",
    "{ label:'Inspection Queue', fn: () => onOpenInspection?.('INSP-2026-00418') }")
rep("{ label:'Dependency View \u2192 M17', fn: onOpenDepView }",
    "{ label:'Dependency View', fn: onOpenDepView }")

# ─── Workflow step array text ────────────────────────────────────────────────
rep("'Decision if Required \u2192 M25/M26'", "'Decision if Required'")
rep("'M27 Dependency Update'", "'Dependency Update'")
rep("'MIDC M29 Intake'", "'Amendment Intake'")

# ─── Recent activity event text (visible in UI) ──────────────────────────────
rep("'Inspection requirement identified during M14 scrutiny'",
    "'Inspection requirement identified during Building / Planning scrutiny'")

# Apply all replacements
applied = 0
not_found = []
for old, new in reps:
    if old in content:
        content = content.replace(old, new)
        applied += 1
    else:
        not_found.append(repr(old[:80]))

# Report
lines_orig = original.split('\n')
lines_new = content.split('\n')
changed = sum(1 for o, n in zip(lines_orig, lines_new) if o != n)

print(f'Replacement patterns applied: {applied}/{len(reps)}')
print(f'Lines changed: {changed}')
if not_found:
    print(f'NOT FOUND ({len(not_found)}):')
    for x in not_found:
        print(f'  {x}')

with open(FILE, 'w', encoding='utf-8') as f:
    f.write(content)

print('Done. File written.')