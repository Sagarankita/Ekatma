import { ScrutinyConfig } from '../registry';
import { OfficerReviewState, ScrutinySection } from '@/domain/types';

export const M14_SECTIONS = [
  { id:'identity',  label:'01 — Project / Plot Identity',   status:'in-review'          as ScrutinySection['status'] },
  { id:'plan',      label:'02 — Plan / Application Data',   status:'not-reviewed'       as ScrutinySection['status'] },
  { id:'building',  label:'03 — Building Parameters',       status:'needs-verification' as ScrutinySection['status'] },
  { id:'prereq',    label:'04 — Prerequisite Documents',    status:'reviewed'           as ScrutinySection['status'] },
  { id:'technical', label:'05 — Technical Documents',       status:'not-reviewed'       as ScrutinySection['status'] },
  { id:'conditional',label:'06 — Conditional Documents',    status:'not-reviewed'       as ScrutinySection['status'] },
  { id:'consistency',label:'07 — Consistency Checks',       status:'query'              as ScrutinySection['status'] },
  { id:'deps',      label:'08 — Dependencies',              status:'not-reviewed'       as ScrutinySection['status'] },
]
export const M14_IDENTITY_PARAMS = [
  { name:'Plot / Parcel',          value:'P-104 — Sample Industrial Estate', source:'Business DNA', verify:'USER_CONFIRMED',    finding:'needs-verification' as OfficerReviewState, evidence:'Plot / Allotment Record' },
  { name:'Plot Area',              value:'4,800 m²',                          source:'Master Project Dossier', verify:'SYSTEM_VERIFIED', finding:'valid' as OfficerReviewState, evidence:'Land / Plot Allotment Record' },
  { name:'MIDC Estate',            value:'Sample Industrial Estate',          source:'Business DNA', verify:'SYSTEM_VERIFIED',  finding:'valid' as OfficerReviewState, evidence:'MIDC Estate Notification' },
  { name:'Project Location',       value:'MIDC Industrial Zone — Prototype',  source:'Business DNA', verify:'USER_CONFIRMED',   finding:'valid' as OfficerReviewState, evidence:'' },
  { name:'Project Type',           value:'New Industrial Project',            source:'Business DNA', verify:'USER_CONFIRMED',   finding:'valid' as OfficerReviewState, evidence:'' },
  { name:'Construction / Modification', value:'New Construction',             source:'Business DNA', verify:'USER_CONFIRMED',   finding:'valid' as OfficerReviewState, evidence:'' },
  { name:'Project Stage',          value:'Pre-construction',                  source:'Business DNA', verify:'USER_CONFIRMED',   finding:'valid' as OfficerReviewState, evidence:'' },
]
export const M14_BUILDING_PARAMS = [
  { name:'Built-up Area',          value:'2,300 m²',  source:'MIDC Application', verify:'USER_CONFIRMED',   finding:'needs-verification' as OfficerReviewState, evidence:'Building Plan' },
  { name:'Number of Floors',       value:'G+2',        source:'MIDC Application', verify:'USER_CONFIRMED',   finding:'valid' as OfficerReviewState, evidence:'Building Drawing' },
  { name:'Building Height',        value:'Prototype value', source:'Business DNA', verify:'USER_CONFIRMED',  finding:'not-reviewed' as OfficerReviewState, evidence:'' },
  { name:'Occupancy / Use',        value:'Industrial / Manufacturing', source:'Business DNA', verify:'USER_CONFIRMED', finding:'valid' as OfficerReviewState, evidence:'' },
  { name:'Industrial Machinery',   value:'Yes',        source:'Business DNA', verify:'USER_CONFIRMED',   finding:'valid' as OfficerReviewState, evidence:'' },
  { name:'Warehouse',              value:'Yes',        source:'Business DNA', verify:'USER_CONFIRMED',   finding:'valid' as OfficerReviewState, evidence:'' },
  { name:'Hazardous / Flammable',  value:'Configured contextual flag', source:'Business DNA', verify:'NEEDS_VERIFICATION', finding:'needs-verification' as OfficerReviewState, evidence:'' },
]
export const M14_PREREQ_DOCS = [
  { name:'MPCB Consent to Establish', dept:'MPCB', ref:'MPCB-CTE-2026-XXXX', status:'Completed', verify:'DEPARTMENT_VERIFIED', note:'Previously verified — MIDC may view reference only. No MIDC controls to approve/modify MPCB decision.' },
]
export const M14_TECH_DOCS = [
  { id:'DOC-BP-001', name:'Building / Planning Application Form', ver:'v1', verify:'USER_CONFIRMED',   validity:'Valid',   src:'Entrepreneur upload', finding:'not-reviewed' as OfficerReviewState },
  { id:'DOC-BP-002', name:'Site Layout Plan',                     ver:'v2', verify:'DEPARTMENT_VERIFIED', validity:'Valid', src:'Verified Document Repository', finding:'valid' as OfficerReviewState },
  { id:'DOC-BP-003', name:'Building Drawing',                     ver:'v1', verify:'USER_CONFIRMED',   validity:'Valid',   src:'Entrepreneur upload', finding:'needs-verification' as OfficerReviewState },
  { id:'DOC-BP-004', name:'Structural / Technical Evidence',      ver:'v1', verify:'SELF_DECLARED',    validity:'Valid',   src:'Entrepreneur upload', finding:'not-reviewed' as OfficerReviewState },
]
export const M14_CONDITIONAL_DOCS = [
  { name:'Hazardous Material Handling Certificate', condition:'Hazardous / Flammable context (Needs Verification)', state:'needs-verification', note:'Conditional — displayed because Business DNA hazardous context requires verification.' },
  { name:'Industrial Machinery Safety Certificate',  condition:'Industrial Machinery = Yes', state:'required', note:'Required — Industrial Machinery is confirmed Yes.' },
]
export const M14_CONSISTENCY = [
  { field:'Plot Area',   mpd:'4,800 m²', land:'4,800 m²', bldg:'4,800 m²', mpcb:'4,800 m²', fire:'4,600 m²', mismatch:true  },
  { field:'Built-up Area', mpd:'2,300 m²', land:'—',      bldg:'2,300 m²', mpcb:'2,300 m²', fire:'2,300 m²', mismatch:false },
  { field:'Project Stage', mpd:'Pre-construction', land:'Pre-construction', bldg:'Pre-construction', mpcb:'—', fire:'—', mismatch:false },
]
export const M14_DEPS = [
  { name:'MIDC Land / Plot Context',  dept:'MIDC', status:'Completed', ref:'MIDC-APP-2026-00418-LAND', type:'Upstream / MIDC Controlled', current:false },
  { name:'MPCB Consent to Establish', dept:'MPCB',  status:'Completed', ref:'MPCB-CTE-2026-XXXX',       type:'External / Upstream',          current:false },
  { name:'MIDC Building / Planning',  dept:'MIDC', status:'Under Technical Scrutiny', ref:'MIDC-APP-2026-00418', type:'MIDC Controlled / Current', current:true },
  { name:'Provisional Fire NOC',      dept:'Fire Authority', status:'Pending', ref:'—',                  type:'External / Downstream',        current:false },
]
export const M15_SECTIONS = [
  { id:'applicability', label:'01 — Applicability / Service Context', status:'reviewed'           as ScrutinySection['status'] },
  { id:'applicant',     label:'02 — Applicant Data',                  status:'needs-verification' as ScrutinySection['status'] },
  { id:'plot',          label:'03 — Plot / Project Context',          status:'reviewed'           as ScrutinySection['status'] },
  { id:'water',         label:'04 — Water Parameters',                status:'in-review'          as ScrutinySection['status'] },
  { id:'wastewater',    label:'05 — Wastewater / Drainage',           status:'not-reviewed'       as ScrutinySection['status'] },
  { id:'docs',          label:'06 — Utility Documents',               status:'not-reviewed'       as ScrutinySection['status'] },
  { id:'deps',          label:'07 — Dependency',                      status:'not-reviewed'       as ScrutinySection['status'] },
  { id:'previous',      label:'08 — Previous Approved Data',          status:'not-reviewed'       as ScrutinySection['status'] },
  { id:'consistency',   label:'09 — Consistency Checks',              status:'query'              as ScrutinySection['status'] },
]
export const M15_WATER_PARAMS = [
  { name:'Water Required',          value:'Yes',              appVal:'Yes',       dnaVal:'Yes',       source:'Business DNA',        verify:'USER_CONFIRMED',   finding:'valid'              as OfficerReviewState },
  { name:'Water Quantity',          value:'Prototype value',  appVal:'Prototype value', dnaVal:'Prototype value', source:'Business DNA', verify:'USER_CONFIRMED', finding:'needs-verification' as OfficerReviewState },
  { name:'Water Source',            value:'MIDC',             appVal:'MIDC',      dnaVal:'MIDC',      source:'Business DNA',        verify:'SYSTEM_VERIFIED',  finding:'valid'              as OfficerReviewState },
  { name:'MIDC Water Route',        value:'Active',           appVal:'Active',    dnaVal:'Active',    source:'Regulatory Journey',  verify:'SYSTEM_VERIFIED',  finding:'valid'              as OfficerReviewState },
  { name:'Connection / Service',    value:'New Connection',   appVal:'New Connection', dnaVal:'—',   source:'MIDC Application',    verify:'USER_CONFIRMED',   finding:'not-reviewed'       as OfficerReviewState },
  { name:'Project Stage',           value:'Construction',     appVal:'Construction', dnaVal:'Construction', source:'Business DNA', verify:'USER_CONFIRMED',   finding:'valid'              as OfficerReviewState },
  { name:'Construction / Operation','value':'Construction + proposed operation', appVal:'Construction + proposed operation', dnaVal:'Construction + proposed operation', source:'Business DNA', verify:'USER_CONFIRMED', finding:'valid' as OfficerReviewState },
]
export const M15_DOCS = [
  { id:'DOC-WT-001', name:'Utility Application Form',           cat:'Utility Application',  ver:'v1', src:'Entrepreneur upload',             verify:'USER_CONFIRMED',    validity:'Valid',    finding:'not-reviewed' as OfficerReviewState },
  { id:'DOC-WT-002', name:'Water Connection Evidence',          cat:'Water Connection',     ver:'v1', src:'Entrepreneur upload',             verify:'USER_CONFIRMED',    validity:'Valid',    finding:'needs-verification' as OfficerReviewState },
  { id:'DOC-WT-003', name:'Water Source Evidence',              cat:'Water Source',         ver:'v1', src:'Verified Document Repository',    verify:'DEPARTMENT_VERIFIED', validity:'Valid',  finding:'valid'        as OfficerReviewState },
  { id:'DOC-WT-004', name:'Site / Layout Plan (Utility)',       cat:'Site Layout',          ver:'v2', src:'Verified Document Repository',    verify:'DEPARTMENT_VERIFIED', validity:'Valid',  finding:'valid'        as OfficerReviewState },
  { id:'DOC-WT-005', name:'Drainage / Wastewater Evidence',     cat:'Drainage',             ver:'v1', src:'Entrepreneur upload',             verify:'SELF_DECLARED',     validity:'Valid',    finding:'not-reviewed' as OfficerReviewState },
]
export const M15_DEPS = [
  { name:'MIDC Land / Plot Context',      dept:'MIDC',               status:'Completed',           ref:'MIDC-APP-2026-00418-LAND', type:'Upstream / MIDC Controlled',  current:false },
  { name:'MPCB Consent to Establish',     dept:'MPCB',               status:'Completed',            ref:'MPCB-CTE-2026-XXXX',       type:'External / Upstream',          current:false },
  { name:'MIDC Building / Planning',      dept:'MIDC',               status:'Completed',            ref:'MIDC-APP-2026-00418-BP',   type:'Upstream / MIDC Controlled',   current:false },
  { name:'MIDC Water / Utility',          dept:'MIDC',               status:'Under Technical Scrutiny', ref:'MIDC-APP-2026-00418', type:'MIDC Controlled / Current',    current:true  },
  { name:'Conditional NOC',              dept:'Configured Authority', status:'Parallel / Pending',  ref:'—',                        type:'Parallel / Conditional',       current:false },
  { name:'Construction',                  dept:'—',                   status:'Downstream',           ref:'—',                        type:'Downstream',                   current:false },
]
export const M15_CONSISTENCY = [
  { field:'Water Source',         appVal:'MIDC',        dnaVal:'MIDC',       mismatch:false },
  { field:'Water Quantity',       appVal:'Prototype value', dnaVal:'Prototype value', mismatch:false },
  { field:'Plot Area',            appVal:'4,800 m²',    dnaVal:'4,800 m²',   mismatch:false },
  { field:'Project Stage',        appVal:'Construction', dnaVal:'Construction', mismatch:false },
  { field:'Drainage Required',    appVal:'Required',    dnaVal:'Required',   mismatch:false },
  { field:'Water Required',       appVal:'Yes',         dnaVal:'Yes',        mismatch:false },
]

export const midcBuildingScrutiny: ScrutinyConfig = { sections: M14_SECTIONS, params: [...M14_IDENTITY_PARAMS, ...M14_BUILDING_PARAMS], docs: [...M14_PREREQ_DOCS, ...M14_TECH_DOCS, ...M14_CONDITIONAL_DOCS], consistencyCheck: M14_CONSISTENCY, dependencies: M14_DEPS };

export const midcWaterScrutiny: ScrutinyConfig = { sections: M15_SECTIONS, params: M15_WATER_PARAMS, docs: M15_DOCS, consistencyCheck: M15_CONSISTENCY, dependencies: M15_DEPS };
