'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AccessibilityStrip, Footer } from '@/features/entrepreneur/public-auth/PublicChrome';

export default function DepartmentShell({ children, requireAuth = false }: { children: React.ReactNode, requireAuth?: boolean }) {
  const [lang, setLang] = useState<'en' | 'mr'>('en');
  const [fontSize, setFontSize] = useState<'sm' | 'md' | 'lg'>('md');
  const [highContrast, setHighContrast] = useState(false);
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem('dept_auth') === 'true';
    if (requireAuth && !auth) {
      router.push('/department/login');
    } else {
      setIsLoggedIn(auth || !requireAuth);
    }

    const storedLang = sessionStorage.getItem('entrepreneur_demo_language');
    if (storedLang === 'en' || storedLang === 'mr') {
      setLang(storedLang);
    }
  }, [requireAuth, router]);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      const sizeMap = { sm: '14px', md: '16px', lg: '18.5px' };
      document.documentElement.style.fontSize = sizeMap[fontSize] || '16px';
    }
  }, [fontSize]);

  if (requireAuth && !isLoggedIn) return null;

  const fontCls = fontSize === 'sm' ? 'text-[13px]' : fontSize === 'lg' ? 'text-[16px]' : 'text-[14px]';

  return (
    <div className={`min-h-screen flex flex-col ${fontCls} ${highContrast ? 'bg-black text-white' : 'bg-[#F9FAF2] text-[#2B2B2B]'}`}>
      <AccessibilityStrip 
        lang={lang} setLang={setLang} 
        fontSize={fontSize} setFontSize={setFontSize} 
        highContrast={highContrast} setHighContrast={setHighContrast} 
      />
      <header className="bg-white border-b border-[#d6dfd5] shadow-sm" role="banner">
        <div className="max-w-[1440px] mx-auto px-6 flex items-center justify-between py-3 gap-8">
          {/* Identity block */}
          <div className="flex items-center gap-6">
            {/* National Emblem */}
            <div className="flex flex-col items-center gap-0.5 shrink-0">
              <img src="/assets/india-emblem.png" alt="National Emblem of India" className="h-14 w-auto object-contain" />
              <span className="text-[9px] text-[#4A4A4A] font-medium tracking-wide leading-none" style={{ fontFamily: 'Noto Sans Devanagari, sans-serif' }}>सत्यमेव जयते</span>
            </div>
            <div className="w-px h-12 bg-[#d6dfd5]" aria-hidden="true" />
            {/* Maharashtra Seal */}
            <div className="flex flex-col items-center gap-0.5 shrink-0">
              <img src="/assets/maha-seal.png" alt="Government of Maharashtra seal" className="h-12 w-auto object-contain" />
              <span className="text-[9px] text-[#4A4A4A] font-medium tracking-wide leading-none text-center">Govt. of Maharashtra</span>
            </div>
            <div className="w-px h-12 bg-[#d6dfd5]" aria-hidden="true" />
            {/* EKATMA Portal identity */}
            <div className="flex items-center gap-3">
              <img src="/assets/ekatma-logo.png" alt="Ekatma portal logo" className="h-10 w-auto object-contain" />
              <div>
                <div className="text-[#355E3B] font-bold text-base leading-tight">EKATMA</div>
                <div className="text-[#4A4A4A] text-[11px] leading-tight">Maharashtra Industrial Approval & Compliance Portal</div>
                <div className="text-[#4A4A4A] text-[10px] leading-tight" style={{ fontFamily: 'Noto Sans Devanagari, sans-serif' }}>महाराष्ट्र औद्योगिक अनुमोदन एवं अनुपालन पोर्टल</div>
              </div>
            </div>
          </div>

          {/* Right actions / Portal badge */}
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#edf5ef] border border-[#bdd4f5] rounded text-[#355E3B] text-xs font-medium">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              MIDC Department Portal
            </span>
          </div>
        </div>
      </header>
      <main className="flex-1 flex flex-col">
        {children}
      </main>

      <footer className="bg-[#355E3B] border-t border-[#0F233D] px-6 py-4 text-center text-xs text-white/80">
        © 2026 Government of Maharashtra. All rights reserved.
      </footer>
    </div>
  );
}
