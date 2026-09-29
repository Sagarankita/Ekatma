'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { X, Printer, Check, Copy, ShieldCheck, ExternalLink, Download } from 'lucide-react';
import type { DocRecord } from './data';
import { ENTREPRENEUR_ROUTES } from '@/lib/routes/entrepreneur';

interface CertificatePreviewModalProps {
  doc: DocRecord;
  businessName: string;
  businessLocation: string;
  projectId: string;
  onClose: () => void;
}

export function CertificatePreviewModal({
  doc,
  businessName,
  businessLocation,
  projectId,
  onClose,
}: CertificatePreviewModalProps) {
  const [copied, setCopied] = useState(false);

  const cert = doc.certificateData ?? {
    certNumber: `CERT-${doc.id}-2026-9481`,
    authority: `${doc.source} — Government of Maharashtra`,
    issueDate: doc.issueDate !== '—' ? doc.issueDate : '10 Oct 2026',
    validUntil: doc.expiryDate !== '—' ? doc.expiryDate : '09 Oct 2031',
    signatoryName: 'Dr. V. M. Motghare',
    designation: 'Competent Authority, Government of Maharashtra',
    qrPayload: `https://maitri.mahaonline.gov.in/verify/cert?id=${doc.id}`,
    conditions: [
      'This clearance is granted in accordance with Maharashtra statutory single-window provisions.',
      'Compliance with all mandated environmental, industrial safety, and operational standards is compulsory.',
      'Subject to inspection and periodic returns filed through the EKATMA regulatory portal.',
    ],
  };

  const handleCopyId = () => {
    navigator.clipboard.writeText(cert.certNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-xs overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label="Certificate Preview"
    >
      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-slate-300 overflow-hidden flex flex-col my-auto max-h-[92vh]">
        {/* Modal Top Bar */}
        <div className="bg-[#17365D] text-white px-5 py-3 flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <span className="text-xs font-bold uppercase tracking-wider">
              Statutory Certificate Verification Preview
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="text-xs text-white/90 hover:text-white px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 transition-colors flex items-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / PDF</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="text-slate-300 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Close certificate modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Certificate Sheet (Printable / High-Fidelity Official Document) */}
        <div className="p-6 sm:p-8 overflow-y-auto bg-amber-50/20 font-serif relative">
          {/* Ornamental Outer Security Border */}
          <div className="relative border-4 border-double border-[#17365D] p-6 sm:p-8 bg-white shadow-inner rounded-sm">
            {/* Watermark Motif */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.035] select-none">
              <div className="w-96 h-96 rounded-full border-16 border-[#17365D] flex items-center justify-center">
                <span className="text-4xl font-black text-center text-[#17365D] font-sans uppercase tracking-widest">
                  Government of Maharashtra
                </span>
              </div>
            </div>

            {/* Header: State of Maharashtra Emblem Motif */}
            <div className="text-center pb-4 border-b-2 border-slate-200 relative">
              {/* Emblem icon graphic */}
              <div className="mx-auto w-14 h-14 mb-2 flex items-center justify-center rounded-full bg-[#17365D]/5 border border-[#17365D]/20">
                <div className="text-center">
                  <div className="text-[10px] font-black text-[#17365D] tracking-tighter">शासन</div>
                  <div className="text-[9px] font-bold text-[#17365D] leading-none">MAHA</div>
                </div>
              </div>

              <h3 className="text-xs font-bold text-[#17365D] uppercase tracking-widest font-sans">
                Government of Maharashtra
              </h3>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 uppercase tracking-wide font-sans mt-0.5">
                {cert.authority}
              </h2>
              <p className="text-[11px] text-slate-500 font-sans mt-0.5">
                EKATMA Single-Window Regulatory Engine · Official Statutory Clearance Portal
              </p>
            </div>

            {/* Certificate Title */}
            <div className="text-center my-5">
              <span className="inline-block text-[10px] font-bold text-[#17365D] uppercase tracking-widest border-y border-[#17365D] py-0.5 px-4 font-sans">
                Statutory Order & Certificate
              </span>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mt-2 font-sans tracking-tight">
                {doc.name}
              </h1>
              <p className="text-xs text-slate-600 font-sans mt-1">
                Issued under the applicable provisions of the Maharashtra Industrial Regulation & RTSA Enactments
              </p>
            </div>

            {/* Certificate Meta Grid */}
            <div className="bg-slate-50 border border-slate-200 rounded p-3 text-xs font-sans grid grid-cols-2 sm:grid-cols-4 gap-2 mb-5">
              <div>
                <span className="text-[10px] font-bold text-slate-500 uppercase block">Certificate No.</span>
                <span className="font-mono font-bold text-slate-900 text-xs">{cert.certNumber}</span>
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-500 uppercase block">Date of Issue</span>
                <span className="font-semibold text-slate-800">{cert.issueDate}</span>
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-500 uppercase block">Valid Through</span>
                <span className="font-semibold text-slate-800">{cert.validUntil}</span>
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-500 uppercase block">Security Status</span>
                <span className="font-bold text-emerald-700 flex items-center gap-1">
                  <Check className="w-3.5 h-3.5 text-emerald-600" /> Digitally Ratified
                </span>
              </div>
            </div>

            {/* Formal Certificate Body */}
            <div className="text-xs leading-relaxed text-slate-700 space-y-3 font-serif">
              <p>
                This is to officially certify that <strong className="font-sans text-slate-900">{businessName}</strong>,
                having industrial setup situated at <strong className="font-sans text-slate-900">{businessLocation}</strong>,
                has been duly granted statutory approval under the prescribed regulatory framework.
              </p>
              <p>
                The authorized entity is permitted to proceed with the activities specified under the approved schedule,
                subject to strict compliance with all statutory parameters, terms, and obligations stipulated below:
              </p>

              {/* Conditions List */}
              <div className="bg-slate-50/80 p-3.5 rounded border border-slate-200 font-sans text-[11px] space-y-1.5 my-3">
                <span className="font-bold text-slate-800 block text-xs uppercase tracking-wider mb-1">
                  Mandatory Grant Conditions:
                </span>
                {cert.conditions.map((cond, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <span className="text-[#17365D] font-bold shrink-0">{idx + 1}.</span>
                    <span className="text-slate-700">{cond}</span>
                  </div>
                ))}
              </div>

              <p className="text-[11px] text-slate-500 italic font-sans">
                This electronic document is valid under the Information Technology Act, 2000 and requires no physical seal when electronically certified.
              </p>
            </div>

            {/* Bottom Security Footer: QR Code & Digital Signature */}
            <div className="mt-6 pt-5 border-t-2 border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-5 font-sans">
              {/* Fake QR Code Pattern */}
              <div className="flex items-center gap-3 p-2 bg-slate-50 border border-slate-200 rounded-lg">
                <div className="w-16 h-16 bg-white p-1 border border-slate-300 rounded shrink-0 flex items-center justify-center">
                  {/* High-fidelity SVG 2D QR Code Pattern */}
                  <svg viewBox="0 0 100 100" className="w-full h-full text-slate-900" fill="currentColor">
                    {/* Top-left corner finder */}
                    <rect x="0" y="0" width="30" height="30" fill="currentColor" />
                    <rect x="5" y="5" width="20" height="20" fill="white" />
                    <rect x="10" y="10" width="10" height="10" fill="currentColor" />

                    {/* Top-right corner finder */}
                    <rect x="70" y="0" width="30" height="30" fill="currentColor" />
                    <rect x="75" y="5" width="20" height="20" fill="white" />
                    <rect x="80" y="10" width="10" height="10" fill="currentColor" />

                    {/* Bottom-left corner finder */}
                    <rect x="0" y="70" width="30" height="30" fill="currentColor" />
                    <rect x="5" y="75" width="20" height="20" fill="white" />
                    <rect x="10" y="80" width="10" height="10" fill="currentColor" />

                    {/* QR Code pseudo data matrix blocks */}
                    <rect x="35" y="5" width="8" height="8" />
                    <rect x="50" y="5" width="8" height="8" />
                    <rect x="35" y="20" width="8" height="8" />
                    <rect x="50" y="20" width="8" height="8" />
                    <rect x="5" y="35" width="8" height="8" />
                    <rect x="20" y="35" width="8" height="8" />
                    <rect x="35" y="35" width="15" height="15" />
                    <rect x="55" y="35" width="8" height="8" />
                    <rect x="70" y="35" width="8" height="8" />
                    <rect x="85" y="35" width="8" height="8" />
                    <rect x="5" y="50" width="8" height="8" />
                    <rect x="20" y="50" width="8" height="8" />
                    <rect x="55" y="50" width="15" height="15" />
                    <rect x="75" y="50" width="8" height="8" />
                    <rect x="35" y="65" width="8" height="8" />
                    <rect x="50" y="65" width="8" height="8" />
                    <rect x="70" y="65" width="8" height="8" />
                    <rect x="85" y="65" width="8" height="8" />
                    <rect x="35" y="80" width="15" height="15" />
                    <rect x="55" y="80" width="8" height="8" />
                    <rect x="70" y="80" width="8" height="8" />
                    <rect x="85" y="80" width="8" height="8" />
                  </svg>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-800 uppercase block tracking-wider">
                    e-Pramaan QR Code
                  </span>
                  <span className="text-[9px] text-slate-500 block leading-tight">
                    Scan via DigiLocker or MahaOnline portal to verify statutory authenticity
                  </span>
                  <span className="text-[9px] font-mono text-slate-400 block mt-0.5">
                    Hash: 8b4a2e...f910
                  </span>
                </div>
              </div>

              {/* Official Digital Signature Seal */}
              <div className="text-right">
                <div className="inline-block p-2.5 bg-emerald-50 border border-emerald-300 rounded-lg text-left">
                  <div className="flex items-center gap-1.5 text-emerald-800 font-bold text-[11px] mb-1">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>Digitally Signed</span>
                  </div>
                  <div className="text-[10px] text-slate-700 leading-tight">
                    <p className="font-bold text-slate-900">{cert.signatoryName}</p>
                    <p>{cert.designation}</p>
                    <p className="text-[9px] text-slate-500 mt-0.5">
                      Timestamp: {cert.issueDate} 11:42:18 IST
                    </p>
                    <p className="text-[8px] font-mono text-slate-400">
                      PKI SHA-256 Key: 4a21-98ff-004a-7bc9
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Actions Footer */}
        <div className="bg-slate-50 px-5 py-3 border-t border-slate-200 flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopyId}
              className="text-xs text-slate-700 hover:text-slate-900 font-medium px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 flex items-center gap-1.5 transition-colors shadow-xs"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied ID' : 'Copy Certificate ID'}</span>
            </button>
            <Link
              href={ENTREPRENEUR_ROUTES.document(projectId, doc.id)}
              className="text-xs text-[#1a56db] hover:underline font-semibold flex items-center gap-1 ml-2"
            >
              <span>Document Details ({doc.id})</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-xs font-semibold px-4 py-2 rounded-lg bg-slate-800 text-white hover:bg-slate-900 transition-colors"
          >
            Close Preview
          </button>
        </div>
      </div>
    </div>
  );
}
