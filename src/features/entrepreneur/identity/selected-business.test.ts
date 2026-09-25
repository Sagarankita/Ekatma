import { describe, expect, it } from 'vitest'
import {
  ENTREPRENEUR_SELECTED_BUSINESS_KEY,
  businessFromEntrepreneurPathname,
  readRememberedBusiness,
  rememberBusiness,
} from './selected-business'

function memoryStorage(initial?: string) {
  const values = new Map<string, string>()
  if (initial) values.set(ENTREPRENEUR_SELECTED_BUSINESS_KEY, initial)
  return {
    getItem: (key: string) => values.get(key) ?? null,
    setItem: (key: string, value: string) => values.set(key, value),
    removeItem: (key: string) => values.delete(key),
  }
}

describe('remembered Entrepreneur business context', () => {
  it('resolves only valid business IDs from scoped URLs', () => {
    expect(businessFromEntrepreneurPathname('/entrepreneur/businesses/BP-002/documents')?.id).toBe('BP-002')
    expect(businessFromEntrepreneurPathname('/entrepreneur/businesses/BP-999')).toBeUndefined()
    expect(businessFromEntrepreneurPathname('/entrepreneur/businesses')).toBeUndefined()
    expect(businessFromEntrepreneurPathname('/entrepreneur/businesses/new')).toBeUndefined()
    expect(businessFromEntrepreneurPathname('/entrepreneur/assistant')).toBeUndefined()
  })

  it('stores only valid catalog IDs and clears a stale remembered ID', () => {
    const storage = memoryStorage()
    expect(rememberBusiness(storage, 'BP-004')?.id).toBe('BP-004')
    expect(readRememberedBusiness(storage)?.name).toBe('Sahyadri Bio-Pharma Pvt Ltd')

    storage.setItem(ENTREPRENEUR_SELECTED_BUSINESS_KEY, 'BP-999')
    expect(readRememberedBusiness(storage)).toBeUndefined()
    expect(storage.getItem(ENTREPRENEUR_SELECTED_BUSINESS_KEY)).toBeNull()
  })
})
