import { describe, expect, it } from 'vitest'
import { buildJourneyNodes, getEnrichment, journeyStateCfg, listJourneyNodesForBusiness, stageDisplayState, STAGES } from './data'

describe('Regulatory Journey data', () => {
  it('builds canonical journey nodes with correct dependencies', () => {
    const nodes = buildJourneyNodes(false)
    expect(nodes.length).toBe(13)

    const land = nodes.find(n => n.id === 'LAND-001')
    expect(land?.displayState).toBe('approved')
    expect(land?.unlocks).toContain('EST-001')

    const cte = nodes.find(n => n.id === 'EST-001')
    expect(cte?.displayState).toBe('under-review')
    expect(cte?.dependencies[0].reqId).toBe('LAND-001')
  })

  it('updates state dynamically when CTE is approved', () => {
    const nodes = buildJourneyNodes(true)
    const cte = nodes.find(n => n.id === 'EST-001')
    expect(cte?.displayState).toBe('approved')

    const building = nodes.find(n => n.id === 'CON-001')
    expect(building?.displayState).toBe('ready')

    const fire = nodes.find(n => n.id === 'CON-002')
    expect(fire?.displayState).toBe('ready')
  })

  it('provides styling configuration for every journey display state', () => {
    const cfgReady = journeyStateCfg('ready')
    expect(cfgReady.label).toBe('Ready')
    expect(cfgReady.border).toContain('1a56db')

    const cfgApproved = journeyStateCfg('approved')
    expect(cfgApproved.label).toBe('Approved')
  })

  it('computes stage display states accurately', () => {
    const nodesBefore = buildJourneyNodes(false)
    expect(stageDisplayState(nodesBefore, 'land')).toBe('Complete')
    expect(stageDisplayState(nodesBefore, 'establishment')).toBe('In Progress')
    expect(stageDisplayState(nodesBefore, 'construction')).toBe('Waiting')

    const nodesAfter = buildJourneyNodes(true)
    expect(stageDisplayState(nodesAfter, 'construction')).toBe('Ready')
  })

  it('has all canonical 8 stages', () => {
    expect(STAGES.length).toBe(8)
    expect(STAGES[0].key).toBe('land')
    expect(STAGES[1].key).toBe('establishment')
  })

  it('limits requirements to their exact business', () => {
    expect(listJourneyNodesForBusiness('BP-004', false)).toHaveLength(13)
    expect(listJourneyNodesForBusiness('BP-001', false)).toEqual([])
  })

  it('provides static enrichment for known and generic requirements', () => {
    const cteEnrich = getEnrichment('EST-001')
    expect(cteEnrich.serviceId).toBe('MPCB-CTE')
    expect(cteEnrich.slaConfigured).toBe('21 working days')
    expect(cteEnrich.regVerified).toBe(true)
    expect(cteEnrich.forms.length).toBeGreaterThan(0)
    expect(cteEnrich.docs.length).toBeGreaterThan(0)
    expect(getEnrichment('EST-001', 'Sahyadri Bio-Pharma Pvt Ltd', 'Chakan, Pune, Maharashtra').dnaBasis.find(d => d.label === 'Location')?.value).toBe('Chakan, Pune, Maharashtra')

    const genericEnrich = getEnrichment('UTIL-001', 'ABC Pharma', 'Thane')
    expect(genericEnrich.serviceId).toBe('UTIL-001')
    expect(genericEnrich.dnaBasis.find(d => d.label === 'Location')?.value).toBe('Thane')
  })
})
