'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { INITIAL_E03, INITIAL_E04, INITIAL_E05 } from './initial-state'
import type { E03Data, E04Data, E05Data } from './types'

export const BUSINESS_DNA_DRAFT_KEY = 'entrepreneur_business_dna_draft_v1'

export interface BusinessDnaDraft {
  e03: E03Data
  e04: E04Data
  e05: E05Data
  expansionChangeAreas: string[]
  confirmed: boolean
}

export const INITIAL_DRAFT: BusinessDnaDraft = {
  e03: INITIAL_E03,
  e04: INITIAL_E04,
  e05: INITIAL_E05,
  expansionChangeAreas: [],
  confirmed: false,
}

function readDraft(): BusinessDnaDraft {
  try {
    const stored = sessionStorage.getItem(BUSINESS_DNA_DRAFT_KEY)
    if (!stored) return INITIAL_DRAFT
    const parsed: unknown = JSON.parse(stored)
    if (!parsed || typeof parsed !== 'object') return INITIAL_DRAFT
    const value = parsed as Partial<BusinessDnaDraft>
    if (!value.e03 || !value.e04 || !value.e05 || !Array.isArray(value.expansionChangeAreas)) return INITIAL_DRAFT
    if (typeof value.e03.name !== 'string' || !Array.isArray(value.e05.activities) || !Array.isArray(value.e05.products)) return INITIAL_DRAFT
    return {
      e03: { ...INITIAL_E03, ...value.e03 },
      e04: { ...INITIAL_E04, ...value.e04 },
      e05: { ...INITIAL_E05, ...value.e05 },
      expansionChangeAreas: value.expansionChangeAreas,
      confirmed: value.confirmed === true,
    }
  } catch {
    return INITIAL_DRAFT
  }
}

interface BusinessDnaContextValue {
  draft: BusinessDnaDraft
  updateE03: (partial: Partial<E03Data>) => void
  updateE04: (partial: Partial<E04Data>) => void
  updateE05: (partial: Partial<E05Data>) => void
  setExpansionChangeAreas: (areas: string[]) => void
  setConfirmed: (confirmed: boolean) => void
}

const BusinessDnaContext = createContext<BusinessDnaContextValue | null>(null)

export function BusinessDnaProvider({ children }: { children: React.ReactNode }) {
  const [draft, setDraft] = useState(INITIAL_DRAFT)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    setDraft(readDraft())
    setReady(true)
  }, [])

  useEffect(() => {
    if (ready) sessionStorage.setItem(BUSINESS_DNA_DRAFT_KEY, JSON.stringify(draft))
  }, [draft, ready])

  const value: BusinessDnaContextValue = {
    draft,
    updateE03: partial => setDraft(current => ({ ...current, e03: { ...current.e03, ...partial } })),
    updateE04: partial => setDraft(current => ({ ...current, e04: { ...current.e04, ...partial } })),
    updateE05: partial => setDraft(current => ({ ...current, e05: { ...current.e05, ...partial } })),
    setExpansionChangeAreas: areas => setDraft(current => ({ ...current, expansionChangeAreas: areas })),
    setConfirmed: confirmed => setDraft(current => ({ ...current, confirmed })),
  }

  if (!ready) return null
  return <BusinessDnaContext.Provider value={value}>{children}</BusinessDnaContext.Provider>
}

export function useBusinessDnaDraft(): BusinessDnaContextValue {
  const value = useContext(BusinessDnaContext)
  if (!value) throw new Error('Business DNA draft is unavailable outside its route layout')
  return value
}
