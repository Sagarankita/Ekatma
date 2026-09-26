'use client'

import React, { useState, useEffect, useRef } from 'react'

export const Icon = {
  Search: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
  ),
  Bell: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
  ),
  Help: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>
  ),
  User: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
  ),
  ChevronRight: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
  ),
  ChevronDown: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
  ),
  Menu: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="18" x2="20" y2="18"/></svg>
  ),
  Check: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
  ),
  CheckCircle: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
  ),
  AlertCircle: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
  ),
  Info: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
  ),
  Warning: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
  ),
  X: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
  ),
  Home: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
  ),
  Grid: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
  ),
  Layers: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>
  ),
  List: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
  ),
  BarChart: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/></svg>
  ),
  Settings: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
  ),
  LogOut: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
  ),
  Upload: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
  ),
  Loader: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-spin"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
  ),
  ChevronLeft: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
  ),
  Eye: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
  ),
  EyeOff: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
  ),
  Building: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
  ),
  Shield: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
  ),
  Mail: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><polyline points="22,4 12,13 2,4"/></svg>
  ),
  Calendar: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
  ),
  MapPin: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
  ),
  Plus: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
  ),
  Briefcase: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/><line x1="12" y1="12" x2="12" y2="12"/></svg>
  ),
  Filter: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
  ),
  Clock: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
  ),
  Factory: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/><path d="M17 18h1"/><path d="M12 18h1"/><path d="M7 18h1"/></svg>
  ),
  ClipboardList: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="8" y="2" width="8" height="4" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M12 11h4"/><path d="M12 16h4"/><path d="M8 11h.01"/><path d="M8 16h.01"/></svg>
  ),
  Award: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>
  ),
  Layers2: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m16.02 12 5.48 3.13a1 1 0 0 1 0 1.74L13 21.74a2 2 0 0 1-2 0L2.5 16.87a1 1 0 0 1 0-1.74L8 12"/><path d="M13 13.74a2 2 0 0 1-2 0L2.5 8.87a1 1 0 0 1 0-1.74L11 2.26a2 2 0 0 1 2 0l8.5 4.87a1 1 0 0 1 0 1.74Z"/></svg>
  ),
}

// ─── Shared input style ───────────────────────────────────────────────────────
export const inputBase = "w-full px-3 py-2 text-sm border rounded bg-white focus:outline-none focus:ring-2 focus:ring-[#1a56db] focus:border-[#1a56db] transition-colors placeholder:text-[#9aa5b4]"
export const inputDefault = `${inputBase} border-[#d1d9e0]`
export const inputError = `${inputBase} border-red-500 focus:ring-red-400`

export function DemoNotice() {
  return null;
}

// ─── Accessibility Strip ──────────────────────────────────────────────────────
export function AccessibilityStrip({ lang, setLang, fontSize, setFontSize, highContrast, setHighContrast }: {
  lang: 'en' | 'mr', setLang: (l: 'en' | 'mr') => void
  fontSize: 'sm' | 'md' | 'lg', setFontSize: (s: 'sm' | 'md' | 'lg') => void
  highContrast: boolean, setHighContrast: (v: boolean) => void
}) {
  useEffect(() => {
    if (typeof window !== 'undefined' && !document.getElementById('google-translate-script')) {
      const script = document.createElement('script');
      script.id = 'google-translate-script';
      script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      document.body.appendChild(script);

      (window as any).googleTranslateElementInit = () => {
        if ((window as any).google?.translate?.TranslateElement) {
          new (window as any).google.translate.TranslateElement(
            { pageLanguage: 'en', includedLanguages: 'en,mr', autoDisplay: false },
            'google_translate_element'
          );
        }
      };
    }
  }, []);

  const handleSkipToMain = (e: React.MouseEvent) => {
    e.preventDefault();
    const mainEl = document.getElementById('main-content') || document.getElementById('service-explorer');
    if (mainEl) {
      mainEl.scrollIntoView({ behavior: 'smooth' });
      mainEl.focus();
    }
  };

  const handleLangChange = (targetLang: 'en' | 'mr') => {
    setLang(targetLang);
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('entrepreneur_demo_language', targetLang);
      document.cookie = `googtrans=/en/${targetLang}; path=/;`;
      document.cookie = `googtrans=/en/${targetLang}; domain=${window.location.hostname}; path=/;`;
      
      const select = document.querySelector('.goog-te-combo') as HTMLSelectElement | null;
      if (select) {
        select.value = targetLang;
        select.dispatchEvent(new Event('change'));
      } else {
        window.location.reload();
      }
    }
  };

  return (
    <div className="bg-[#0f2540] text-white text-xs" role="navigation" aria-label="Accessibility and language options">
      {/* Hidden element for Google Translate initialization */}
      <div id="google_translate_element" className="hidden" />

      <div className="max-w-[1440px] mx-auto px-3 sm:px-6 flex flex-wrap items-center justify-center sm:justify-between gap-1 py-1 sm:py-0 min-h-8">
        <div className="flex flex-wrap items-center justify-center gap-2">
          <span className="font-medium">Government of Maharashtra</span>
          <span className="text-white/40">|</span>
          <span style={{ fontFamily: 'Noto Sans Devanagari, sans-serif' }}>महाराष्ट्र शासन</span>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-1 text-white/80">
          <a
            href="#main-content"
            onClick={handleSkipToMain}
            className="px-2 py-0.5 hover:text-white hover:underline transition-colors focus:ring-1 focus:ring-white rounded"
          >
            Skip to Main Content
          </a>
          <span className="text-white/30">|</span>
          <button
            onClick={() => alert('Screen Reader Access Mode Enabled. Standard ARIA landmarks active.')}
            className="px-2 py-0.5 hover:text-white hover:underline transition-colors focus:ring-1 focus:ring-white rounded"
          >
            Screen Reader Access
          </button>
          <span className="text-white/30">|</span>
          <span className="flex items-center gap-0.5">
            <button onClick={() => setFontSize('sm')} className={`px-1.5 py-0.5 rounded transition-colors text-[10px] ${fontSize === 'sm' ? 'bg-white text-[#0f2540] font-bold' : 'hover:text-white'}`} aria-label="Decrease font size" aria-pressed={fontSize === 'sm'}>A−</button>
            <button onClick={() => setFontSize('md')} className={`px-1.5 py-0.5 rounded transition-colors text-xs ${fontSize === 'md' ? 'bg-white text-[#0f2540] font-bold' : 'hover:text-white'}`} aria-label="Default font size" aria-pressed={fontSize === 'md'}>A</button>
            <button onClick={() => setFontSize('lg')} className={`px-1.5 py-0.5 rounded transition-colors text-sm ${fontSize === 'lg' ? 'bg-white text-[#0f2540] font-bold' : 'hover:text-white'}`} aria-label="Increase font size" aria-pressed={fontSize === 'lg'}>A+</button>
          </span>
          <span className="text-white/30">|</span>
          <button onClick={() => setHighContrast(!highContrast)} className={`px-2 py-0.5 rounded transition-colors ${highContrast ? 'bg-yellow-400 text-black font-semibold' : 'hover:text-white'}`} aria-pressed={highContrast}>High Contrast</button>
          <span className="text-white/30">|</span>
          <button onClick={() => handleLangChange('en')} className={`px-2 py-0.5 rounded transition-colors ${lang === 'en' ? 'bg-white text-[#0f2540] font-semibold' : 'hover:text-white'}`} aria-pressed={lang === 'en'}>English</button>
          <button onClick={() => handleLangChange('mr')} className={`px-2 py-0.5 rounded transition-colors ${lang === 'mr' ? 'bg-white text-[#0f2540] font-semibold' : 'hover:text-white'}`} aria-pressed={lang === 'mr'}>मराठी</button>
          <span className="text-white/30">|</span>
          <a href="#help-resources" className="px-2 py-0.5 hover:text-white hover:underline transition-colors">Sitemap</a>
        </div>
      </div>
    </div>
  )
}

// ─── Portal Header ────────────────────────────────────────────────────────────
export function PortalHeader({
  isLoggedIn,
  setIsLoggedIn,
  onGoToLogin,
  onGoToNotifications,
  onOpenRegAssistant,
  showSearchAndHelp = true,
}: {
  isLoggedIn: boolean
  setIsLoggedIn: (v: boolean) => void
  onGoToLogin: () => void
  onGoToNotifications?: () => void
  onOpenRegAssistant?: () => void
  showSearchAndHelp?: boolean
}) {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <header className="bg-white border-b border-[#d1d9e0] shadow-sm" role="banner">
      <div className="max-w-[1440px] mx-auto px-3 sm:px-6 flex flex-col xl:flex-row items-center justify-between py-3 gap-3 xl:gap-8">
        {/* Identity block */}
        <div className="flex flex-wrap items-center justify-center xl:justify-start gap-2 sm:gap-6 w-full xl:w-auto min-w-0">
          <div className="flex flex-col items-center gap-0.5 shrink-0">
            <img src="/assets/india-emblem.png" alt="National Emblem of India" className="h-10 sm:h-14 w-auto object-contain" />
            <span className="text-[9px] text-[#4a5568] font-medium tracking-wide leading-none" style={{ fontFamily: 'Noto Sans Devanagari, sans-serif' }}>सत्यमेव जयते</span>
          </div>
          <div className="hidden sm:block w-px h-12 bg-[#d1d9e0]" aria-hidden="true" />
          <div className="flex flex-col items-center gap-0.5 shrink-0">
            <img src="/assets/maha-seal.png" alt="Government of Maharashtra seal" className="h-9 sm:h-12 w-auto object-contain" />
            <span className="text-[9px] text-[#4a5568] font-medium tracking-wide leading-none text-center">Govt. of Maharashtra</span>
          </div>
          <div className="hidden sm:block w-px h-12 bg-[#d1d9e0]" aria-hidden="true" />
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <img src="/assets/ekatma-logo.png" alt="Ekatma portal logo" className="h-8 sm:h-10 w-auto object-contain shrink-0" />
            <div className="min-w-0 max-w-[200px] sm:max-w-none">
              <div className="text-[#1a3a5c] font-bold text-base leading-tight">EKATMA</div>
              <div className="text-[#4a5568] text-[11px] leading-tight">Maharashtra Industrial Approval & Compliance Portal</div>
              <div className="text-[#4a5568] text-[10px] leading-tight" style={{ fontFamily: 'Noto Sans Devanagari, sans-serif' }}>महाराष्ट्र औद्योगिक अनुमोदन एवं अनुपालन पोर्टल</div>
            </div>
          </div>
        </div>

        {/* Right actions */}
        <div className="flex flex-wrap items-center justify-center xl:justify-end gap-3 w-full xl:w-auto">
          {showSearchAndHelp && (
            <button aria-label="Regulatory Assistant" onClick={onOpenRegAssistant} className="flex items-center gap-1.5 p-2 rounded hover:bg-[#f0f4f8] text-[#4a5568] hover:text-[#1a3a5c] transition-colors" title="Regulatory Assistant"><Icon.Shield /><span className="hidden lg:inline text-xs font-medium">Regulatory Assistant</span></button>
          )}
          {isLoggedIn && (
            <button aria-label="Notifications — 3 unread" onClick={onGoToNotifications} className="p-2 rounded hover:bg-[#f0f4f8] text-[#4a5568] hover:text-[#1a3a5c] transition-colors relative">
              <Icon.Bell />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" aria-label="New notifications"></span>
            </button>
          )}
          {isLoggedIn ? (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 pl-2 border-l border-[#d1d9e0]">
                <div className="w-8 h-8 rounded-full bg-[#1a3a5c] text-white flex items-center justify-center text-sm font-semibold">U</div>
                <div className="hidden md:block">
                  <div className="text-sm font-medium text-[#1a2533] leading-none">User Name</div>
                  <div className="text-[11px] text-[#6b7a8d] leading-none mt-0.5">Industrial User</div>
                </div>
              </div>
              <button onClick={() => setIsLoggedIn(false)} className="p-2 rounded hover:bg-[#f0f4f8] text-[#4a5568] hover:text-[#1a3a5c] transition-colors" aria-label="Log out"><Icon.LogOut /></button>
            </div>
          ) : (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(true)}
                onMouseEnter={() => setDropdownOpen(true)}
                className="flex items-center gap-2 bg-[#1a3a5c] text-white text-sm font-medium px-4 py-2 rounded hover:bg-[#0f2540] transition-colors focus:ring-2 focus:ring-[#1a56db] focus:ring-offset-2"
                aria-haspopup="true"
                aria-expanded={dropdownOpen}
              >
                <Icon.User />
                Login / Register
                <span className={`transition-transform duration-150 ${dropdownOpen ? 'rotate-180' : ''}`}><Icon.ChevronDown /></span>
              </button>
              {dropdownOpen && (
                <div
                  className="absolute right-0 top-full mt-1 w-52 bg-white border border-[#d1d9e0] rounded shadow-lg z-50 py-1"
                  role="menu"
                  onMouseLeave={() => setDropdownOpen(false)}
                >
                  <button
                    role="menuitem"
                    onClick={() => { setDropdownOpen(false); onGoToLogin() }}
                    className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-[#1a3a5c] font-medium hover:bg-[#f0f4f8] transition-colors text-left"
                  >
                    <span className="text-[#1a3a5c]"><Icon.Building /></span>
                    Industrial Login
                  </button>
                  <div className="mx-3 border-t border-[#e8edf2]" />
                  <a
                    role="menuitem"
                    href="/department/login"
                    className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-[#4a5568] hover:bg-[#f0f4f8] transition-colors text-left"
                  >
                    <span className="text-[#4a5568]"><Icon.Shield /></span>
                    Government Login
                  </a>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

// ─── Footer ───────────────────────────────────────────────────────────────────
export function Footer() {
  const FOOTER_SECTIONS = [
    {
      title: 'About',
      links: [
        { name: 'About the Portal', href: '#service-explorer' },
        { name: 'Objectives', href: '#connected-journey' },
        { name: 'Nodal Agency', href: '#business-dna' },
        { name: 'MoU Partners', href: '#policies-schemes' },
      ],
    },
    {
      title: 'Services',
      links: [
        { name: 'Online Applications', href: '#service-explorer' },
        { name: 'Track Status', href: '#service-explorer' },
        { name: 'Scheme Calculator', href: '#policies-schemes' },
        { name: 'Document Checklist', href: '#business-dna' },
      ],
    },
    {
      title: 'Policies',
      links: [
        { name: 'Website Policies', href: '#policies-schemes' },
        { name: 'Terms & Conditions', href: '#policies-schemes' },
        { name: 'Privacy Policy', href: '#policies-schemes' },
        { name: 'Accessibility Statement', href: '#help-resources' },
        { name: 'Copyright Policy', href: '#policies-schemes' },
        { name: 'Hyperlinking Policy', href: '#policies-schemes' },
      ],
    },
    {
      title: 'Support',
      links: [
        { name: 'Help & Guidance', href: '#help-resources' },
        { name: 'Contact Us', href: '#help-resources' },
        { name: 'Feedback', href: '#help-resources' },
        { name: 'Sitemap', href: '#help-resources' },
        { name: 'Grievance Redressal', href: '#help-resources' },
      ],
    },
  ];

  return (
    <footer className="bg-[#0f2540] text-white mt-auto" role="contentinfo">
      <div className="max-w-[1440px] mx-auto px-6 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          {FOOTER_SECTIONS.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold text-white/90 uppercase tracking-wider mb-3">{section.title}</h3>
              <ul className="space-y-2 text-sm text-white/65">
                {section.links.map((l) => (
                  <li key={l.name}>
                    <a href={l.href} className="hover:text-white hover:underline transition-colors">
                      {l.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-white/15 pt-5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-white/50">
          <p>© 2026 Government of Maharashtra. All rights reserved.</p>
          <p>Last Updated: <span className="text-white/70">22 September 2026</span></p>
        </div>
      </div>
    </footer>
  )
}

// ─── Auth Page Shell ──────────────────────────────────────────────────────────
// Shared wrapper for all auth pages: accessibility strip + header + footer, no nav/sidebar
export function AuthShell({ children, lang, setLang, fontSize, setFontSize, highContrast, setHighContrast, onGoToLogin, setIsLoggedIn }: {
  children: React.ReactNode
  lang: 'en' | 'mr', setLang: (l: 'en' | 'mr') => void
  fontSize: 'sm' | 'md' | 'lg', setFontSize: (s: 'sm' | 'md' | 'lg') => void
  highContrast: boolean, setHighContrast: (v: boolean) => void
  onGoToLogin: () => void
  setIsLoggedIn: (v: boolean) => void
}) {
  return (
    <div className="flex flex-col min-h-screen bg-[#f8f9fb]">
      <AccessibilityStrip lang={lang} setLang={setLang} fontSize={fontSize} setFontSize={setFontSize} highContrast={highContrast} setHighContrast={setHighContrast} />
      <PortalHeader isLoggedIn={false} setIsLoggedIn={setIsLoggedIn} onGoToLogin={onGoToLogin} />
      <DemoNotice />
      <main id="main-content" className="flex-1" tabIndex={-1}>
        {children}
      </main>
      <Footer />
    </div>
  )
}

// ─── Auth Form Card ───────────────────────────────────────────────────────────
