'use client'

import { useEffect, useState } from 'react'

export function useDisplayPreferences() {
  const [lang, setLang] = useState<'en' | 'mr'>('en')
  const [fontSize, setFontSize] = useState<'sm' | 'md' | 'lg'>('md')
  const [highContrast, setHighContrast] = useState(false)

  useEffect(() => {
    const storedLang = sessionStorage.getItem('entrepreneur_demo_language')
    const storedFontSize = sessionStorage.getItem('entrepreneur_demo_font_size')
    if (storedLang === 'en' || storedLang === 'mr') setLang(storedLang)
    if (storedFontSize === 'sm' || storedFontSize === 'md' || storedFontSize === 'lg') setFontSize(storedFontSize)
    setHighContrast(sessionStorage.getItem('entrepreneur_demo_high_contrast') === 'true')
  }, [])

  return {
    lang,
    setLang: (value: 'en' | 'mr') => { sessionStorage.setItem('entrepreneur_demo_language', value); setLang(value) },
    fontSize,
    setFontSize: (value: 'sm' | 'md' | 'lg') => { sessionStorage.setItem('entrepreneur_demo_font_size', value); setFontSize(value) },
    highContrast,
    setHighContrast: (value: boolean) => { sessionStorage.setItem('entrepreneur_demo_high_contrast', String(value)); setHighContrast(value) },
    fontSizeClass: fontSize === 'sm' ? 'text-[13px]' : fontSize === 'lg' ? 'text-[16px]' : 'text-[14px]',
    contrastClass: highContrast ? 'contrast-125 saturate-150' : '',
  }
}
