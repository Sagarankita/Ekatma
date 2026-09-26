import { describe, expect, it } from 'vitest';
import { entrepreneurPageContext, globalAssistantContext, inlineContext } from './context';
import { getAssistantPrompts } from './prompts';

describe('assistant prompt registry', () => {
  it('uses broad prompts for global header context', () => {
    const page = entrepreneurPageContext('/entrepreneur/businesses/BP-004/requirements/REQ-1');
    expect(getAssistantPrompts(globalAssistantContext(page)).map(prompt => prompt.text)).toContain('What needs my attention?');
    expect(getAssistantPrompts(globalAssistantContext(page)).map(prompt => prompt.text)).not.toContain('Why is this requirement applicable?');
  });

  it('uses page prompts for the circular trigger', () => {
    const page = entrepreneurPageContext('/entrepreneur/businesses/BP-004/journey');
    expect(getAssistantPrompts(page).map(prompt => prompt.text)).toContain('What is blocking the next stage?');
  });

  it('uses entity-relevant prompts for inline context', () => {
    const page = entrepreneurPageContext('/entrepreneur/businesses/BP-004/documents/DOC-1');
    const entity = inlineContext(page, { entities: { documentId: 'DOC-1' }, recordTitle: 'Factory plan' });
    expect(getAssistantPrompts(entity).map(prompt => prompt.text)).toContain('Can this document be reused?');
  });

  it('changes presets without changing conversation data or creating instructions', () => {
    const messages = [{ role: 'user', content: 'Existing question' }] as const;
    const dashboard = entrepreneurPageContext('/entrepreneur/businesses/BP-004');
    const journey = entrepreneurPageContext('/entrepreneur/businesses/BP-004/journey');
    expect(getAssistantPrompts(dashboard)).not.toEqual(getAssistantPrompts(journey));
    expect(messages).toEqual([{ role: 'user', content: 'Existing question' }]);
    expect(getAssistantPrompts(journey).every(prompt => !('instruction' in prompt))).toBe(true);
  });

  it('uses the general fallback for an unknown page', () => {
    const context = { ...entrepreneurPageContext('/entrepreneur/businesses/BP-004'), pageType: 'unknown-page' };
    expect(getAssistantPrompts(context).map(prompt => prompt.text)).toContain('What should I do next?');
  });
});
