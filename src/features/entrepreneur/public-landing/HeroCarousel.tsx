'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { ENTREPRENEUR_ROUTES } from '@/lib/routes/entrepreneur';
import { ROUTES } from '@/lib/routes';

interface CarouselSlide {
  id: string;
  imagePath: string;
  alt: string;
  eyebrow: string;
  headline: string;
  description: string;
  primaryAction: {
    label: string;
    onClick: (router: ReturnType<typeof useRouter>) => void;
  };
  secondaryAction?: {
    label: string;
    onClick: (router: ReturnType<typeof useRouter>) => void;
  };
}

const SLIDES: CarouselSlide[] = [
  {
    id: 'slide-ekatma',
    imagePath: '/images/landing/carousel/slide-ekatma.png',
    alt: 'EKATMA Maharashtra Unified Industrial Gateway',
    eyebrow: 'GOVERNMENT OF MAHARASHTRA',
    headline: 'One Platform. One Regulatory Journey.',
    description: 'Industrial approvals, compliance, inspections, incentives and government support through one connected platform.',
    primaryAction: {
      label: 'Get Started',
      onClick: (router) => router.push(ENTREPRENEUR_ROUTES.login()),
    },
    secondaryAction: {
      label: 'Explore EKATMA',
      onClick: () => {
        const el = document.getElementById('connected-journey');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      },
    },
  },
  {
    id: 'slide-entrepreneur',
    imagePath: '/images/landing/carousel/slide-entrepreneur.png',
    alt: 'Entrepreneur Regulatory Discovery & Business DNA',
    eyebrow: 'ENTREPRENEUR SERVICES',
    headline: 'Know What Your Business Needs. Before You Apply.',
    description: 'Build your Business DNA, discover applicable requirements and manage your regulatory journey from one place.',
    primaryAction: {
      label: 'Start Your Journey',
      onClick: (router) => router.push(ENTREPRENEUR_ROUTES.login()),
    },
    secondaryAction: {
      label: 'Discover Requirements',
      onClick: () => {
        const el = document.getElementById('guided-discovery');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      },
    },
  },
  {
    id: 'slide-department',
    imagePath: '/images/landing/carousel/slide-department.png',
    alt: 'Department Officer Scrutiny & Workflow Management',
    eyebrow: 'GOVERNMENT DEPARTMENTS',
    headline: 'Connected Processing. Clearer Decisions.',
    description: 'Structured scrutiny, coordinated inspections, consolidated queries and SLA visibility for government departments.',
    primaryAction: {
      label: 'Officer Login',
      onClick: (router) => router.push(ROUTES.department.login),
    },
    secondaryAction: {
      label: 'Explore Workflows',
      onClick: () => {
        const el = document.getElementById('service-explorer');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      },
    },
  },
  {
    id: 'slide-growth',
    imagePath: '/images/landing/carousel/slide-growth.png',
    alt: 'Industrial Growth & Incentive Intelligence',
    eyebrow: 'INCENTIVES & GROWTH',
    headline: 'Go Beyond Approvals.',
    description: 'Discover potential incentives, understand policy changes and assess their possible impact on your business.',
    primaryAction: {
      label: 'Explore Opportunities',
      onClick: () => {
        const el = document.getElementById('intelligent-ekatma');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      },
    },
    secondaryAction: {
      label: 'View Policies & Schemes',
      onClick: () => {
        const el = document.getElementById('policies-schemes');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      },
    },
  },
];

export function HeroCarousel() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  }, []);

  // Auto-play interval
  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(timer);
  }, [isPlaying, nextSlide]);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      prevSlide();
    } else if (e.key === 'ArrowRight') {
      nextSlide();
    }
  };

  return (
    <section
      className="relative bg-[#355E3B] text-white overflow-hidden"
      aria-label="EKATMA Portal Highlights"
      ref={containerRef}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      {/* Background Slides */}
      <div className="relative min-h-[440px] md:min-h-[500px] flex items-center">
        {SLIDES.map((slide, idx) => {
          const isActive = idx === currentIndex;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                isActive ? 'opacity-100 z-10 pointer-events-auto' : 'opacity-0 z-0 pointer-events-none'
              }`}
              aria-hidden={!isActive}
            >
              {/* Slide Image Background with Lightened Blue Gradient Overlay */}
              <div className="absolute inset-0 bg-[#355E3B]">
                <img
                  src={slide.imagePath}
                  alt={slide.alt}
                  className="w-full h-full object-cover object-center opacity-70"
                  loading={idx === 0 ? 'eager' : 'lazy'}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#355E3B]/90 via-[#355E3B]/65 to-[#355E3B]/25" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#355E3B]/80 via-transparent to-black/20" />
              </div>

              {/* Slide Content */}
              <div className="relative z-20 max-w-7xl mx-auto px-6 sm:px-8 py-14 md:py-20 h-full flex flex-col justify-center">
                <div className="max-w-2xl">
                  {/* Eyebrow */}
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4A017]/20 text-[#D4A017] text-xs font-semibold uppercase tracking-wider mb-4 border border-[#D4A017]/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D4A017]" />
                    {slide.eyebrow}
                  </div>

                  {/* Headline */}
                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4 leading-[1.15]">
                    {slide.headline}
                  </h1>

                  {/* Description */}
                  <p className="text-base sm:text-lg text-slate-200 mb-8 leading-relaxed font-normal">
                    {slide.description}
                  </p>

                  {/* CTAs */}
                  <div className="flex flex-wrap items-center gap-4">
                    <button
                      onClick={() => slide.primaryAction.onClick(router)}
                      className="bg-[#D4A017] text-white font-semibold text-sm px-6 py-3 rounded-md hover:bg-[#d47b22] focus:outline-none focus:ring-2 focus:ring-[#D4A017] focus:ring-offset-2 focus:ring-offset-[#355E3B] transition-colors shadow-md flex items-center gap-2"
                    >
                      {slide.primaryAction.label}
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>

                    {slide.secondaryAction && (
                      <button
                        onClick={() => slide.secondaryAction?.onClick(router)}
                        className="bg-white/10 text-white hover:bg-white/20 font-medium text-sm px-6 py-3 rounded-md border border-white/25 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#355E3B] transition-colors backdrop-blur-sm"
                      >
                        {slide.secondaryAction.label}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Carousel Controls & Navigation */}
      <div className="relative z-30 bg-[#355E3B]/95 border-t border-white/10 py-3 px-6 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-300">
          
          {/* Slide Indicators */}
          <div className="flex items-center gap-3">
            <span className="font-semibold text-white">
              0{currentIndex + 1} <span className="text-slate-400">/ 0{SLIDES.length}</span>
            </span>

            <div className="flex items-center gap-2" role="tablist" aria-label="Select slide">
              {SLIDES.map((slide, idx) => (
                <button
                  key={slide.id}
                  onClick={() => setCurrentIndex(idx)}
                  role="tab"
                  aria-selected={idx === currentIndex}
                  aria-label={`Go to slide ${idx + 1}: ${slide.headline}`}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    idx === currentIndex ? 'w-8 bg-[#D4A017]' : 'w-2 bg-white/30 hover:bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Controls: Prev, Play/Pause, Next */}
          <div className="flex items-center gap-2">
            <button
              onClick={prevSlide}
              aria-label="Previous slide"
              className="p-1.5 rounded hover:bg-white/10 text-slate-200 hover:text-white transition-colors border border-white/15"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={() => setIsPlaying(!isPlaying)}
              aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
              className="px-2.5 py-1 rounded hover:bg-white/10 text-slate-200 hover:text-white transition-colors border border-white/15 flex items-center gap-1.5 font-medium text-[11px]"
            >
              {isPlaying ? (
                <>
                  <svg className="w-3.5 h-3.5 text-[#D4A017]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                  </svg>
                  <span>Pause</span>
                </>
              ) : (
                <>
                  <svg className="w-3.5 h-3.5 text-[#D4A017]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  <span>Play</span>
                </>
              )}
            </button>

            <button
              onClick={nextSlide}
              aria-label="Next slide"
              className="p-1.5 rounded hover:bg-white/10 text-slate-200 hover:text-white transition-colors border border-white/15"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
