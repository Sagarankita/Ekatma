import type { AssistantRequest, AssistantResponse, AssistantService } from './types';

function temporaryResponse(input: AssistantRequest): AssistantResponse {
  const { context, message: content } = input;
  const entity = context.safeMetadata?.recordTitle
    ?? context.entities.claimId
    ?? context.entities.incentiveId
    ?? context.entities.requirementId
    ?? context.entities.documentId
    ?? context.entities.applicationId;
  const scope = entity ? `${context.label} (${entity})` : context.label;

  if (context.portal === 'department') {
    return {
      content: `Source-backed prototype guidance for: "${content}"\n\nThe shared assistant searched the currently configured regulatory reference set for ${scope}. A production retrieval backend is not connected in this phase, so the cited prototype source must be verified before an officer relies on it.`,
      citations: [{ source: 'Configured MIDC regulatory repository', clause: 'Applicable clause requires verification', version: 'Prototype reference set' }],
      needsVerification: true,
      uncertainty: 'No production retrieval service is connected. Confirm the source and current rule version before making a determination.',
    };
  }

  return {
    content: `Prototype regulatory guidance for: "${content}"\n\nThis response is scoped to ${scope}. It explains configured EKATMA information only and does not approve, reject, or replace a department decision.`,
    citations: [{ source: 'Configured EKATMA regulatory reference data', version: 'Prototype reference set' }],
    needsVerification: context.pageType === 'dashboard' || context.mode === 'global',
    uncertainty: context.mode === 'global' ? 'Open the assistant from a specific record for entity-scoped guidance.' : undefined,
  };
}

export const temporaryAssistantService: AssistantService = {
  async sendMessage(input, signal) {
    await new Promise<void>((resolve, reject) => {
      const timer = window.setTimeout(resolve, 350);
      signal?.addEventListener('abort', () => {
        window.clearTimeout(timer);
        reject(new DOMException('Request aborted', 'AbortError'));
      }, { once: true });
    });
    return temporaryResponse(input);
  },
};
