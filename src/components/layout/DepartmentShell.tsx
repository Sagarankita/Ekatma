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
    <div className={`min-h-screen flex flex-col ${fontCls} ${highContrast ? 'bg-black text-white' : 'bg-[#F8F9FA] text-[#20242A]'}`}>
      <AccessibilityStrip 
        lang={lang} setLang={setLang} 
        fontSize={fontSize} setFontSize={setFontSize} 
        highContrast={highContrast} setHighContrast={setHighContrast} 
      />
      <header className="border-b border-slate-200 bg-white" role="banner">
        <div className="mx-auto flex max-w-[1440px] items-center gap-4 px-6 py-2.5">
          <img src="/assets/india-emblem.png" alt="National Emblem of India" className="h-10 w-auto object-contain" />
          <div className="h-9 w-px bg-slate-200" />
          <img src="/assets/ekatma-logo.png" alt="EKATMA" className="h-8 w-auto object-contain" />
          <div><p className="text-sm font-bold text-[#17365D]">EKATMA</p><p className="text-[10px] font-medium text-[#5C6470]">Government of Maharashtra Portal</p></div>
        </div>
      </header>
      <main className="flex-1 flex flex-col">
        {children}
      </main>
      <footer className="bg-[#17365D] border-t border-[#0F233D] px-6 py-4 text-center text-xs text-white/80">
        © 2026 Government of Maharashtra. All rights reserved.
      </footer>
    </div>
  );
}
