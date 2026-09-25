'use client'

import { useRouter } from 'next/navigation'
import { ENTREPRENEUR_ROUTES } from '@/lib/routes/entrepreneur'
import { useBusinessDnaDraft } from './state'
import { BasicRequirementsPage, BusinessProfileReviewPage, CreateBusinessPage, E05AdaptiveQuestionnairePage, E05EnvSafetyPage, E05ScalePage } from './screens'

type Step = 'create' | 'basic' | 'discovery' | 'scale' | 'environment' | 'review'

export function BusinessDnaRoutePage({ step }: { step: Step }) {
  const router = useRouter()
  const { draft, updateE03, updateE04, updateE05, setExpansionChangeAreas, setConfirmed } = useBusinessDnaDraft()
  const navigate = (path: string) => router.push(path)
  const exit = () => navigate(ENTREPRENEUR_ROUTES.businesses())

  switch (step) {
    case 'create': return <CreateBusinessPage data={draft.e03} onChange={updateE03} onBack={exit} onSaveExit={exit} onContinue={() => navigate(ENTREPRENEUR_ROUTES.newBusinessBasicRequirements())} />
    case 'basic': return <BasicRequirementsPage e03Data={draft.e03} data={draft.e04} onChange={updateE04} onBack={() => navigate(ENTREPRENEUR_ROUTES.newBusiness())} onSaveExit={exit} onContinue={() => navigate(ENTREPRENEUR_ROUTES.newBusinessDiscovery())} />
    case 'discovery': return <E05AdaptiveQuestionnairePage e03Data={draft.e03} e04Data={draft.e04} setE04Data={updateE04} data={draft.e05} onChange={updateE05} onBack={() => navigate(ENTREPRENEUR_ROUTES.newBusinessBasicRequirements())} onSaveExit={exit} onContinue={() => navigate(ENTREPRENEUR_ROUTES.newBusinessScale())} expansionChangeAreas={draft.expansionChangeAreas} onExpansionChangeAreas={setExpansionChangeAreas} />
    case 'scale': return <E05ScalePage e03Data={draft.e03} e04Data={draft.e04} setE04Data={updateE04} data={draft.e05} onChange={updateE05} onBack={() => navigate(ENTREPRENEUR_ROUTES.newBusinessDiscovery())} onSaveExit={exit} onContinue={() => navigate(ENTREPRENEUR_ROUTES.newBusinessEnvironmentSafety())} expansionChangeAreas={draft.expansionChangeAreas} />
    case 'environment': return <E05EnvSafetyPage e03Data={draft.e03} e04Data={draft.e04} setE04Data={updateE04} data={draft.e05} onChange={updateE05} onBack={() => navigate(ENTREPRENEUR_ROUTES.newBusinessScale())} onSaveExit={exit} onReviewProfile={() => navigate(ENTREPRENEUR_ROUTES.newBusinessReview())} expansionChangeAreas={draft.expansionChangeAreas} />
    case 'review': return <BusinessProfileReviewPage e03Data={draft.e03} e04Data={draft.e04} e05Data={draft.e05} expansionChangeAreas={draft.expansionChangeAreas} onBack={() => navigate(ENTREPRENEUR_ROUTES.newBusinessEnvironmentSafety())} onConfirmed={() => setConfirmed(true)} e06Confirmed={draft.confirmed} />
  }
}
