'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AccessibilityStrip, PortalHeader, Footer } from '@/App';

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
  }, [requireAuth, router]);

  if (requireAuth && !isLoggedIn) return null;

  const fontCls = fontSize === 'sm' ? 'text-[13px]' : fontSize === 'lg' ? 'text-[16px]' : 'text-[14px]';

  return (
    <div className={`min-h-screen flex flex-col ${fontCls} ${highContrast ? 'bg-black text-white' : 'bg-[#f8f9fb] text-[#1a2533]'}`}>
      <AccessibilityStrip 
        lang={lang} setLang={setLang} 
        fontSize={fontSize} setFontSize={setFontSize} 
        highContrast={highContrast} setHighContrast={setHighContrast} 
      />
      <PortalHeader isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <main className="flex-1 flex flex-col">
        {children}
      </main>
      <Footer />
    </div>
  );
}
