import { describe, expect, it } from 'vitest'
import { findBusinessProjectById } from '../businesses/catalog'
import { getDossierRows, getProvenanceDetails, formatInrDisplay } from './data'

describe('Dossier feature data', () => {
  const project = findBusinessProjectById('BP-001')!

  it('formats INR amounts cleanly', () => {
    expect(formatInrDisplay('250000000')).toBe('₹25,00,00,000')
    expect(formatInrDisplay('invalid')).toBe('invalid')
  })

  it('builds dossier rows with project identity and verified metadata', () => {
    const rows = getDossierRows(project)
    expect(rows.length).toBeGreaterThan(10)
    expect(rows.find(r => r.field === 'Business / Project Name')?.value).toBe('ABC Pharma Pvt Ltd')
    expect(rows.find(r => r.field === 'Industry')?.value).toBe('Pharmaceutical Manufacturing')
    expect(rows.find(r => r.field === 'Plot Area')?.verification).toBe('Department Verified')
  })

  it('returns provenance details for plot area with document and verification history', () => {
    const prov = getProvenanceDetails('Plot Area', project)
    expect(prov.fieldName).toBe('Plot Area')
    expect(prov.currentValue).toBe('4,800 m²')
    expect(prov.isPlotArea).toBe(true)
    expect(prov.currentSource).toBe('MIDC Allotment')
    expect(prov.history.length).toBe(2)
    expect(prov.usedBy.length).toBeGreaterThan(0)
  })

  it('returns provenance details for generic fields', () => {
    const prov = getProvenanceDetails('Industry', project)
    expect(prov.fieldName).toBe('Industry')
    expect(prov.currentValue).toBe('Pharmaceutical Manufacturing')
    expect(prov.isPlotArea).toBe(false)
  })
})
