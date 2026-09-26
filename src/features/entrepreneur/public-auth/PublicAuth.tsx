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
      <main id="main-content" className="flex-1 bg-[#f8f9fb]" tabIndex={-1}>
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
