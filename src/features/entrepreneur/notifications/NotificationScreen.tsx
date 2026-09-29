'use client';

import React, { useState } from 'react';
import { Icon } from '../public-auth/PublicChrome';
import { MOCK_NOTIFICATIONS, type AppNotification, type NotificationGroup, type NotificationType } from './data';

const notifTypeIcon: Record<NotificationType, React.FC> = {
  'missing-doc':  Icon.Upload,
  'expiry':       Icon.Calendar,
  'query':        Icon.AlertCircle,
  'correction':   Icon.Warning,
  'resubmission': Icon.Upload,
  'approval':     Icon.CheckCircle,
  'rejection':    Icon.X,
  'inspection':   Icon.ClipboardList,
  'sla':          Icon.Clock,
  'dependency':   Icon.Layers,
  'renewal':      Icon.Calendar,
  'compliance':   Icon.Shield,
  'incentive':    Icon.Award,
  'claim':        Icon.Briefcase,
  'reg-change':   Icon.Info,
  'business-change': Icon.Building,
  'grievance':    Icon.AlertCircle,
}

const notifGroupOrder: NotificationGroup[] = ['Action Required', 'Application Updates', 'Inspections', 'Compliance', 'Regulatory Changes']
const notifGroupColors: Record<NotificationGroup, { header: string; dot: string }> = {
  'Action Required': { header: 'text-[#9B2C2C]', dot: 'bg-[#9B2C2C]' },
  'Application Updates': { header: 'text-[#17365D]', dot: 'bg-[#245B8A]' },
  'Inspections': { header: 'text-[#8A4A12]', dot: 'bg-[#E68A2E]' },
  'Compliance': { header: 'text-[#5B3A91]', dot: 'bg-[#7C5CBF]' },
  'Regulatory Changes': { header: 'text-[#2F6F67]', dot: 'bg-[#3B8C80]' },
}

export function E33NotificationCentrePage({ onNavigate, lang }: { onNavigate: (notification: AppNotification) => void; lang: 'en' | 'mr' }) {
  const [notifications, setNotifications] = useState<AppNotification[]>(MOCK_NOTIFICATIONS)
  const [activeGroup, setActiveGroup] = useState<NotificationGroup | 'All'>('All')

  const t = {
    en: {
      title: 'Notification Centre',
      marathi: 'अधिसूचना केंद्र',
      subtitle: 'Centralised alerts across your business and applications.',
      markAllRead: 'Mark all as read',
      what: 'What happened',
      why: 'Why it matters',
      action: 'Action needed',
      due: 'Due',
      all: 'All',
      unread: 'unread',
    },
    mr: {
      title: 'अधिसूचना केंद्र',
      marathi: 'Notification Centre',
      subtitle: 'तुमच्या व्यवसाय आणि अर्जांमधील केंद्रीय सूचना.',
      markAllRead: 'सर्व वाचले म्हणून चिन्हांकित करा',
      what: 'काय झाले',
      why: 'हे का महत्त्वाचे आहे',
      action: 'आवश्यक कृती',
      due: 'देय',
      all: 'सर्व',
      unread: 'न वाचलेले',
    },
  }[lang]

  const markRead = (id: string) => setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n))
  const markAllRead = () => setNotifications(prev => prev.map(n => ({ ...n, isRead: true })))
  const unreadCount = notifications.filter(n => !n.isRead).length

  const filtered = activeGroup === 'All' ? notifications : notifications.filter(n => n.group === activeGroup)
  const grouped = notifGroupOrder.reduce<Record<NotificationGroup, AppNotification[]>>((acc, g) => {
    acc[g] = filtered.filter(n => n.group === g)
    return acc
  }, {} as Record<NotificationGroup, AppNotification[]>)

  return (
    <main id="main-content" className="flex-1 bg-[#F8F9FA]" tabIndex={-1}>
      <div className="max-w-[900px] mx-auto px-6 py-6">
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-[#17365D]">{t.title}</h1>
            <p className="text-xs text-[#5C6470] mt-1">{t.subtitle}</p>
          </div>
          <div className="flex items-center gap-3">
            {unreadCount > 0 && (
              <span className="text-xs font-semibold text-[#9B2C2C] bg-[#FDF2F2] border border-[#F8C4C4] px-2.5 py-1 rounded-full">
                {unreadCount} {t.unread}
              </span>
            )}
            <button onClick={markAllRead} className="text-xs text-[#245B8A] hover:underline font-semibold">{t.markAllRead}</button>
          </div>
        </div>

        {/* Group filter tabs */}
        <div role="tablist" aria-label="Notification groups" className="flex border-b border-slate-200 mb-6">
          {(['All', ...notifGroupOrder] as (NotificationGroup | 'All')[]).map(g => {
            const count = g === 'All' ? notifications.length : notifications.filter(n => n.group === g).length
            const unread = g === 'All' ? unreadCount : notifications.filter(n => n.group === g && !n.isRead).length
            return (
              <button key={g} role="tab" aria-selected={activeGroup === g}
                onClick={() => setActiveGroup(g)}
                className={`px-4 py-2.5 text-xs font-bold border-b-2 -mb-px transition-colors whitespace-nowrap flex items-center gap-1.5
                  ${activeGroup === g ? 'border-[#17365D] text-[#17365D]' : 'border-transparent text-[#5C6470] hover:text-[#20242A] hover:border-slate-300'}`}
              >
                {g}
                <span className="text-xs font-normal text-[#5C6470]">({count})</span>
                {unread > 0 && <span className="w-2 h-2 bg-[#9B2C2C] rounded-full" aria-label={`${unread} unread`} />}
              </button>
            )
          })}
        </div>

        {/* Notifications grouped */}
        <div className="space-y-6">
          {notifGroupOrder.map(group => {
            const items = grouped[group]
            if (!items || items.length === 0) return null
            const cfg = notifGroupColors[group]
            return (
              <section key={group} aria-labelledby={`notif-group-${group}`}>
                <h2 id={`notif-group-${group}`} className={`text-[13px] font-bold uppercase tracking-wider mb-3 flex items-center gap-2 ${cfg.header}`}>
                  <span className={`w-2 h-2 rounded-full ${cfg.dot}`} aria-hidden="true" />
                  {group}
                  <span className="font-normal text-[#5C6470]">({items.length})</span>
                </h2>
                <div className="space-y-3">
                  {items.map(n => {
                    const TypeIcon = notifTypeIcon[n.type]
                    return (
                      <article key={n.id} className={`cursor-pointer bg-white border rounded-xl p-5 shadow-xs transition-all hover:border-[#93B4D5] hover:shadow-sm ${n.isRead ? 'border-slate-200' : 'border-[#245B8A] bg-[#F0F5FA]/30'}`}
                        onClick={() => { markRead(n.id); onNavigate(n) }} onKeyDown={event => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); markRead(n.id); onNavigate(n) } }} role="article" tabIndex={0} aria-label={n.title}>
                        <div className="flex items-start gap-3.5">
                          <div className={`shrink-0 w-9 h-9 rounded-lg flex items-center justify-center mt-0.5 ${n.isRead ? 'bg-[#F1F3F5] text-[#5C6470]' : 'bg-[#EBF3FA] text-[#17365D]'}`}>
                            <TypeIcon />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-3">
                              <h3 className={`text-xs font-bold leading-snug ${n.isRead ? 'text-[#20242A]' : 'text-[#17365D]'}`}>{n.title}</h3>
                              <div className="flex items-center gap-2 shrink-0">
                                {!n.isRead && <span className="w-2 h-2 bg-[#17365D] rounded-full shrink-0" aria-label="Unread" />}
                                <span className="text-xs text-[#5C6470]">{n.timestamp}</span>
                              </div>
                            </div>
                            <div className="mt-2.5 grid grid-cols-1 md:grid-cols-3 gap-2 text-xs">
                              <div>
                                <p className="text-xs font-semibold text-[#5C6470]">{t.why}</p>
                                <p className="text-[#20242A] mt-0.5">{n.why}</p>
                              </div>
                              <div>
                                <p className="text-xs font-semibold text-[#5C6470]">{t.action}</p>
                                <p className="text-[#20242A] mt-0.5">{n.action}</p>
                              </div>
                              <div>
                                <p className="text-xs font-semibold text-[#5C6470]">{t.due}</p>
                                <p className={`mt-0.5 font-semibold ${n.group === 'Action Required' ? 'text-[#9B2C2C]' : 'text-[#20242A]'}`}>{n.due}</p>
                              </div>
                            </div>
                            <div className="mt-3">
                              <button
                                onClick={(e) => { e.stopPropagation(); markRead(n.id); onNavigate(n) }}
                                className="text-xs text-[#245B8A] hover:underline font-semibold focus:outline-none focus-visible:underline"
                              >
                                {n.ctaLabel} →
                              </button>
                            </div>
                          </div>
                        </div>
                      </article>
                    )
                  })}
                </div>
              </section>
            )
          })}
        </div>
      </div>
    </main>
  )
}
