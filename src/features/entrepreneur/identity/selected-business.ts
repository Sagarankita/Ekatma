import type { EntrepreneurBusinessIdentity } from './catalog'
import { findBusinessById } from './catalog'

export const ENTREPRENEUR_SELECTED_BUSINESS_KEY = 'entrepreneur_selected_business_id'

type SelectedBusinessStorage = Pick<Storage, 'getItem' | 'setItem' | 'removeItem'>

export function businessFromEntrepreneurPathname(pathname: string): EntrepreneurBusinessIdentity | undefined {
  const match = pathname.match(/^\/entrepreneur\/businesses\/([^/]+)(?:\/|$)/)
  if (!match?.[1] || match[1] === 'new') return undefined

  try {
    return findBusinessById(decodeURIComponent(match[1]))
  } catch {
    return undefined
  }
}

export function readRememberedBusiness(storage: SelectedBusinessStorage): EntrepreneurBusinessIdentity | undefined {
  const storedId = storage.getItem(ENTREPRENEUR_SELECTED_BUSINESS_KEY)
  if (!storedId) return undefined

  const business = findBusinessById(storedId)
  if (!business) storage.removeItem(ENTREPRENEUR_SELECTED_BUSINESS_KEY)
  return business
}

export function rememberBusiness(storage: SelectedBusinessStorage, businessId: string): EntrepreneurBusinessIdentity | undefined {
  const business = findBusinessById(businessId)
  if (!business) return undefined

  storage.setItem(ENTREPRENEUR_SELECTED_BUSINESS_KEY, business.id)
  return business
}
