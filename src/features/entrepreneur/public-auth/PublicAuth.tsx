'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ENTREPRENEUR_ROUTES } from '@/lib/routes/entrepreneur'
import { AccessibilityStrip, PortalHeader, DemoNotice, Footer, AuthShell } from './PublicChrome'
import { IndustrialLoginPage, CreateAccountPage, CompleteRegistrationPage, RegistrationSuccessPage } from './AuthForms'
import { useDisplayPreferences } from '../appearance/useDisplayPreferences'

import { HeroCarousel } from '../public-landing/HeroCarousel'
import { AnnouncementStrip } from '../public-landing/AnnouncementStrip'
import { GuidedDiscovery } from '../public-landing/GuidedDiscovery'
import { RoleGateway } from '../public-landing/RoleGateway'
import { ServiceExplorer } from '../public-landing/ServiceExplorer'
import { ConnectedJourney } from '../public-landing/ConnectedJourney'
import { IntelligentEkatma } from '../public-landing/IntelligentEkatma'
import { BusinessDnaSection } from '../public-landing/BusinessDnaSection'
import { UpdatesCarousel } from '../public-landing/UpdatesCarousel'
import { HelpResources } from '../public-landing/HelpResources'

const VERIFIED_EMAIL_KEY = 'entrepreneur_demo_verified_email'
const REGISTERED_EMAIL_KEY = 'entrepreneur_demo_registered_email'
const AUTH_KEY = 'entrepreneur_demo_auth'

function LandingScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let frame = 0
    const updateProgress = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const scrollable = document.documentElement.scrollHeight - window.innerHeight
        setProgress(scrollable > 0 ? Math.min(100, Math.max(0, (window.scrollY / scrollable) * 100)) : 0)
      })
    }

    updateProgress()
    window.addEventListener('scroll', updateProgress, { passive: true })
    window.addEventListener('resize', updateProgress)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', updateProgress)
      window.removeEventListener('resize', updateProgress)
    }
  }, [])

  return (
    <div className="sticky top-0 z-40 h-1.5 w-full overflow-hidden bg-slate-200/80 shadow-sm" role="progressbar" aria-label="Landing page reading progress" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(progress)}>
      <div className="h-full origin-left transition-transform duration-150 ease-out" style={{ transform: `scaleX(${progress / 100})`, background: 'linear-gradient(90deg, #f59e0b 0%, #fbbf72 22%, #fff7ed 38%, #ffffff 50%, #ecfdf5 62%, #86d6a3 78%, #16a34a 100%)' }} />
    </div>
  )
}

function PublicFrame({ children, auth = false, isLanding = false }: { children: React.ReactNode; auth?: boolean; isLanding?: boolean }) {
  const router = useRouter()
  const { fontSizeClass, contrastClass, ...sharedProps } = useDisplayPreferences()
  return (
    <div className={`min-h-screen flex flex-col ${fontSizeClass} ${contrastClass}`} style={{ fontFamily: 'Noto Sans, Noto Sans Devanagari, system-ui, sans-serif' }}>
      {auth ? (
        <AuthShell {...sharedProps} onGoToLogin={() => router.push(ENTREPRENEUR_ROUTES.login())} setIsLoggedIn={() => {}}>
          {children}
        </AuthShell>
      ) : (
        <>
          <AccessibilityStrip {...sharedProps} />
          <PortalHeader isLoggedIn={false} setIsLoggedIn={() => {}} onGoToLogin={() => router.push(ENTREPRENEUR_ROUTES.login())} showSearchAndHelp={!isLanding} />
          {isLanding && <LandingScrollProgress />}
          {!isLanding && <DemoNotice />}
          {children}
          <Footer />
        </>
      )}
    </div>
  )
}

export function PublicLanding() {
  return (
    <PublicFrame isLanding>
      <main id="main-content" className="flex-1 bg-[#F9FAF2]" tabIndex={-1}>
        <HeroCarousel />
        <AnnouncementStrip />
        <GuidedDiscovery />
        <RoleGateway />
        <ServiceExplorer />
        <ConnectedJourney />
        <IntelligentEkatma />
        <BusinessDnaSection />
        <UpdatesCarousel />
        <HelpResources />
      </main>
    </PublicFrame>
  )
}

export function EntrepreneurLogin() {
  const router = useRouter()
  const [registeredEmail, setRegisteredEmail] = useState<string>()
  useEffect(() => { setRegisteredEmail(sessionStorage.getItem(REGISTERED_EMAIL_KEY) || undefined) }, [])
  return (
    <PublicFrame auth>
      <IndustrialLoginPage
        onSignUp={() => router.push(ENTREPRENEUR_ROUTES.register())}
        onLoginSuccess={() => {
          sessionStorage.setItem(AUTH_KEY, 'true')
          router.push(ENTREPRENEUR_ROUTES.businesses())
        }}
        onBack={() => router.push('/')}
        registeredEmail={registeredEmail}
      />
    </PublicFrame>
  )
}

export function EntrepreneurRegister() {
  const router = useRouter()
  return (
    <PublicFrame auth>
      <CreateAccountPage
        onVerified={email => {
          sessionStorage.setItem(VERIFIED_EMAIL_KEY, email)
          router.push(ENTREPRENEUR_ROUTES.registerDetails())
        }}
        onBack={() => router.push(ENTREPRENEUR_ROUTES.login())}
      />
    </PublicFrame>
  )
}

export function EntrepreneurRegisterDetails() {
  const router = useRouter()
  const [verifiedEmail, setVerifiedEmail] = useState<string | null>(null)
  useEffect(() => {
    const email = sessionStorage.getItem(VERIFIED_EMAIL_KEY)
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      router.replace(ENTREPRENEUR_ROUTES.register())
      return
    }
    setVerifiedEmail(email)
  }, [router])
  if (!verifiedEmail) return null
  return (
    <PublicFrame auth>
      <CompleteRegistrationPage
        verifiedEmail={verifiedEmail}
        onSuccess={() => {
          sessionStorage.setItem(REGISTERED_EMAIL_KEY, verifiedEmail)
          sessionStorage.removeItem(VERIFIED_EMAIL_KEY)
          router.push(ENTREPRENEUR_ROUTES.registerSuccess())
        }}
        onBack={() => router.push(ENTREPRENEUR_ROUTES.register())}
      />
    </PublicFrame>
  )
}

export function EntrepreneurRegisterSuccess() {
  const router = useRouter()
  return <PublicFrame auth><RegistrationSuccessPage onGoToLogin={() => router.push(ENTREPRENEUR_ROUTES.login())} /></PublicFrame>
}
