'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AccessibilityStrip } from '@/features/entrepreneur/public-auth/PublicChrome';

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
    <div className={`min-h-screen flex flex-col ${fontCls} ${highContrast ? 'bg-black text-white' : 'bg-[#f8f9fb] text-[#1a2533]'}`}>
      <AccessibilityStrip 
        lang={lang} setLang={setLang} 
        fontSize={fontSize} setFontSize={setFontSize} 
        highContrast={highContrast} setHighContrast={setHighContrast} 
      />
      <header className="border-b border-[#d1d9e0] bg-white" role="banner">
        <div className="mx-auto flex max-w-[1440px] items-center gap-4 px-6 py-2.5">
          <img src="/assets/india-emblem.png" alt="National Emblem of India" className="h-10 w-auto object-contain" />
          <div className="h-9 w-px bg-[#d1d9e0]" />
          <img src="/assets/ekatma-logo.png" alt="EKATMA" className="h-8 w-auto object-contain" />
          <div><p className="text-sm font-bold text-[#1a3a5c]">EKATMA</p><p className="text-[10px] text-[#4a5568]">Government of Maharashtra Portal</p></div>
        </div>
      </header>
      <main className="flex-1 flex flex-col">
        {children}
      </main>
      <footer className="bg-[#0f2540] px-6 py-4 text-center text-xs text-white/70">
        © 2026 Government of Maharashtra. All rights reserved.
      </footer>
    </div>
  );
}
