import { describe, it, expect } from 'vitest';
import {
  EKATMA_DOCS,
  E11_DOC_CATEGORIES,
  findDocumentById,
  findDocumentForBusiness,
  listDocumentsForBusiness,
} from './data';

describe('Documents data module', () => {
  it('contains the canonical list of documents', () => {
    expect(EKATMA_DOCS.length).toBe(11);
    const ids = EKATMA_DOCS.map(d => d.id);
    expect(ids).toContain('DOC-001');
    expect(ids).toContain('DOC-002');
    expect(ids).toContain('DOC-003');
    expect(ids).toContain('DOC-008');
    expect(ids).toContain('DOC-INC-001');
    expect(ids).toContain('DOC-INC-003');
  });

  it('finds existing documents by exact ID', () => {
    const doc1 = findDocumentById('DOC-001');
    expect(doc1).toBeDefined();
    expect(doc1?.name).toContain('Project Environmental Report');
    expect(doc1?.category).toBe('Environmental');

    const doc3 = findDocumentById('DOC-003');
    expect(doc3).toBeDefined();
    expect(doc3?.name).toContain('MPCB Consent to Establish Certificate');
    expect(doc3?.verification).toBe('Government-issued');
  });

  it('returns undefined for non-existent or invalid document IDs', () => {
    expect(findDocumentById('DOC-999')).toBeUndefined();
    expect(findDocumentById('default')).toBeUndefined();
    expect(findDocumentById('')).toBeUndefined();
  });
  it('requires exact business ownership for source documents', () => {
    expect(listDocumentsForBusiness('BP-004')).toHaveLength(11);
    expect(listDocumentsForBusiness('BP-001')).toEqual([]);
    expect(findDocumentForBusiness('BP-004', 'DOC-003')?.name).toContain('MPCB Consent');
    expect(findDocumentForBusiness('BP-001', 'DOC-003')).toBeUndefined();
  });

  it('defines valid document categories', () => {
    expect(E11_DOC_CATEGORIES).toContain('All');
    expect(E11_DOC_CATEGORIES).toContain('Environmental');
    expect(E11_DOC_CATEGORIES).toContain('Land');
    expect(E11_DOC_CATEGORIES).toContain('Incentives');
  });
});
