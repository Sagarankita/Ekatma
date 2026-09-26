import type { AssistantContext } from './types';

export type AssistantPromptCategory =
  | 'attention' | 'applicability' | 'authority-source' | 'requirements' | 'evidence'
  | 'process' | 'dependencies' | 'corrections' | 'deadlines' | 'compliance'
  | 'regulatory-change' | 'incentives' | 'financial-explanation' | 'officer-review'
  | 'verification' | 'accessibility-explanation';

export interface AssistantPrompt {
  id: string;
  text: string;
  category: AssistantPromptCategory;
}

const prompts = (category: AssistantPromptCategory, values: string[]): AssistantPrompt[] =>
  values.map((text, index) => ({ id: `${category}-${index + 1}`, text, category }));

const ENTREPRENEUR_GLOBAL = prompts('attention', [
  'What needs my attention?', 'What should I complete next?',
  'Explain my current regulatory position.', 'What deadlines should I know about?',
]);
const DEPARTMENT_GLOBAL = prompts('officer-review', [
  'What needs review?', 'Which applications need attention?',
  'What regulatory issues are currently relevant?', 'Help me find a regulatory reference.',
]);

export const ASSISTANT_PROMPT_REGISTRY: Readonly<Record<string, readonly AssistantPrompt[]>> = {
  dashboard: prompts('attention', ['What needs my attention?', 'What should I complete next?', 'Are any deadlines approaching?', 'Explain my current regulatory status.']),
  'regulatory-journey': prompts('dependencies', ['Which requirement should I complete next?', 'Why is this approval required?', 'What is blocking the next stage?', 'What can be completed in parallel?']),
  'requirement-detail': prompts('requirements', ['Why is this requirement applicable?', 'What documents are required?', 'Which rule or authority requires it?', 'What happens if this is delayed?']),
  documents: prompts('evidence', ['Which documents need attention?', 'What evidence should I prepare?', 'Are any documents expiring?', 'Which documents can be reused?']),
  'document-detail': prompts('evidence', ['Why is this document required?', 'What should this document contain?', 'Can this document be reused?', 'Are there validity requirements?']),
  applications: prompts('process', ['What should I work on next?', 'Which applications need attention?', 'What is blocking submission?', 'Explain the current status.']),
  'application-workspace': prompts('process', ['What is incomplete?', 'What should I fix before submission?', 'Which requirement is blocking this application?', 'What happens after submission?']),
  'application-detail': prompts('process', ['What is incomplete?', 'What should I fix before submission?', 'Which requirement is blocking this application?', 'What happens after submission?']),
  compliance: prompts('compliance', ['Which obligations are due soon?', 'What needs renewal?', 'What is currently pending?', 'Which approval created this obligation?']),
  'compliance-detail': prompts('compliance', ['Why is this obligation applicable?', 'When is action required?', 'What evidence is needed?', 'Which approval created this obligation?']),
  'regulatory-changes': prompts('regulatory-change', ['What changed?', 'Why does this change apply to my business?', 'Which approvals or compliances may be affected?', 'Is any action required?']),

  'incentive-centre': prompts('incentives', ['What incentive opportunities should I explore?', 'Which schemes may fit my business?', 'How does the incentive calculator work?', 'What information should I prepare?']),
  'incentive-calculator': prompts('incentives', ['What information is needed for this calculation?', 'How are these incentive estimates calculated?', 'Which inputs affect eligibility?', 'Can I change these inputs later?']),
  'incentive-questionnaire': prompts('incentives', ['Why is this question being asked?', 'How does this answer affect eligibility?', 'What should I choose if I am unsure?', 'Which answers have the largest impact?']),
  'incentive-review': prompts('verification', ['What should I verify before continuing?', 'Which answers affect eligibility most?', 'Is any information incomplete?', 'Can I go back and change an answer?']),
  'incentive-portfolio': prompts('incentives', ['Why were these incentives recommended?', 'What information is still missing?', 'Explain the eligibility status of these schemes.', 'How do these incentive options differ?']),
  'incentive-detail': prompts('applicability', ['Why does this scheme apply to my business?', 'Which eligibility conditions are incomplete?', 'What documents will I need?', 'When can this incentive be claimed?']),
  'claim-readiness': prompts('evidence', ['What is preventing me from filing?', 'Which documents are missing?', 'When does the filing window close?', 'What should I complete next?']),
  'claim-tracker': prompts('process', ['What is the current claim status?', 'What happens next?', 'Is any correction required?', 'What action should I take now?']),
  'incentive-claims': prompts('process', ['Which claims need attention?', 'What should I complete next?', 'Is any correction required?', 'Which filing windows should I review?']),
  'roi-planner': prompts('financial-explanation', ['Explain these ROI assumptions.', 'Which inputs affect this estimate?', 'How are incentives included in the calculation?', 'Which assumptions should I verify?']),
  'roi-results': prompts('financial-explanation', ['Explain this ROI result.', 'Which assumptions influence this result most?', 'How do incentives affect the estimate?', 'What should I verify before relying on this projection?']),
  'incentive-scenarios': prompts('financial-explanation', ['What changes between these scenarios?', 'Which assumptions drive the differences?', 'How do incentives change across scenarios?', 'Explain the trade-offs between these scenarios.']),
  'policy-updates': prompts('regulatory-change', ['What changed?', 'How could this affect my business?', 'Does this affect an existing incentive or claim?', 'Is any action required?']),

  'department-dashboard': prompts('officer-review', ['What needs attention?', 'Which applications require review?', 'What regulatory tasks are pending?', 'Help me locate an authoritative reference.']),
  'department-application': prompts('officer-review', ['What is the current regulatory stage?', 'What remains unresolved?', 'Which requirement should be reviewed next?', 'What supporting references are available?']),
  scrutiny: prompts('officer-review', ['Which rule supports this check?', 'What should I verify?', 'What information is missing?', 'Are there any inconsistencies requiring review?']),
  'parameter-detail': prompts('verification', ['Which rule defines this parameter?', 'What evidence supports this value?', 'What should be verified?', 'Show the relevant regulatory reference.']),
  'department-document-review': prompts('evidence', ['What should this document contain?', 'Which rule requires this document?', 'What should I verify?', 'Is validity or expiry relevant?']),
  'technical-scrutiny': prompts('verification', ['Which rule supports this requirement?', 'What should be verified?', 'What evidence is required?', 'Which source should I consult?']),
  inspection: prompts('verification', ['What should be verified during inspection?', 'Which conditions are mandatory?', 'What evidence should be recorded?', 'Which regulatory source supports this check?']),
  decision: prompts('officer-review', ['Which criteria apply here?', 'Are any prerequisites incomplete?', 'Which regulatory sources support these conditions?', 'What should be recorded before finalizing?']),
  'department-regulatory-changes': prompts('regulatory-change', ['What changed?', 'Which applications may be affected?', 'What regulatory source contains the change?', 'What follow-up review may be required?']),
};

const GENERAL = prompts('process', ['What should I do next?', 'What information is relevant here?', 'Which source should I consult?', 'What needs verification?']);

export function getAssistantPrompts(context: AssistantContext): readonly AssistantPrompt[] {
  if (context.mode === 'global') return context.portal === 'department' ? DEPARTMENT_GLOBAL : ENTREPRENEUR_GLOBAL;
  const key = context.portal === 'department'
    ? context.pageType === 'dashboard' ? 'department-dashboard'
      : context.pageType === 'application-detail' ? 'department-application'
      : context.pageType === 'document-detail' ? 'department-document-review'
      : context.pageType === 'regulatory-changes' ? 'department-regulatory-changes'
      : context.pageType
    : context.pageType;
  return ASSISTANT_PROMPT_REGISTRY[key] ?? GENERAL;
}
