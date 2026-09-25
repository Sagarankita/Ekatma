import type { BusinessProject } from '../businesses/catalog';

export type VerificationState =
  | 'Self-Declared'
  | 'User Confirmed'
  | 'Department Verified'
  | 'Needs Verification'
  | 'System Verified';

export interface DossierRow {
  field: string;
  value: string;
  source: string;
  verification: VerificationState;
  usedBy: number;
  lastUpdated: string;
  version: string;
  group: string;
}

export function formatInrDisplay(amountStr: string): string {
  const num = parseInt(amountStr.replace(/[^0-9]/g, ''), 10);
  if (isNaN(num)) return amountStr;
  return `₹${num.toLocaleString('en-IN')}`;
}

export function getDossierRows(project: BusinessProject): DossierRow[] {
  return [
    { field: 'Business / Project Name', value: project.name, source: 'Create Business / Project', verification: 'User Confirmed', usedBy: 6, lastUpdated: '23 Sep 2026', version: '1', group: 'Business / Legal Entity' },
    { field: 'Legal Entity Type', value: 'Private Limited Company', source: 'Business Discovery', verification: 'Self-Declared', usedBy: 4, lastUpdated: '23 Sep 2026', version: '1', group: 'Business / Legal Entity' },
    { field: 'Legal Entity Name', value: project.name, source: 'Business Discovery', verification: 'Self-Declared', usedBy: 5, lastUpdated: '23 Sep 2026', version: '1', group: 'Business / Legal Entity' },
    { field: 'PAN', value: 'ABCPS1234F', source: 'Business Discovery', verification: 'Needs Verification', usedBy: 3, lastUpdated: '23 Sep 2026', version: '1', group: 'Registration Identifiers' },
    { field: 'CIN', value: 'U24239PN2024PTC198234', source: 'Business Discovery', verification: 'Needs Verification', usedBy: 2, lastUpdated: '23 Sep 2026', version: '1', group: 'Registration Identifiers' },
    { field: 'Industry', value: project.industry, source: 'Business Discovery', verification: 'Self-Declared', usedBy: 7, lastUpdated: '23 Sep 2026', version: '1', group: 'Project' },
    { field: 'Project Stage', value: project.stage, source: 'Business Discovery', verification: 'Self-Declared', usedBy: 3, lastUpdated: '23 Sep 2026', version: '1', group: 'Project' },
    { field: 'Location', value: project.location, source: 'Business Discovery', verification: 'Self-Declared', usedBy: 4, lastUpdated: '23 Sep 2026', version: '1', group: 'Project' },
    { field: 'MIDC Status', value: 'Yes', source: 'Basic Requirements', verification: 'Self-Declared', usedBy: 8, lastUpdated: '23 Sep 2026', version: '1', group: 'Land' },
    { field: 'Plot Area', value: '4,800 sq.m', source: 'MIDC Allotment', verification: 'Department Verified', usedBy: 4, lastUpdated: '22 Sep 2026', version: '1', group: 'Land' },
    { field: 'Total Investment', value: '₹25,00,00,000', source: 'Business Discovery', verification: 'Self-Declared', usedBy: 5, lastUpdated: '23 Sep 2026', version: '1', group: 'Investment' },
    { field: 'Workforce Total', value: '85', source: 'Business Discovery', verification: 'Self-Declared', usedBy: 3, lastUpdated: '23 Sep 2026', version: '1', group: 'Employment' },
    { field: 'Built-Up Area', value: '3,200 sq.m', source: 'Business Discovery', verification: 'Self-Declared', usedBy: 5, lastUpdated: '23 Sep 2026', version: '1', group: 'Building' },
    { field: 'Connected Load', value: '750 KVA', source: 'Business Discovery', verification: 'Self-Declared', usedBy: 3, lastUpdated: '23 Sep 2026', version: '1', group: 'Power' },
    { field: 'Daily Water Requirement', value: '250 KL/day', source: 'Business Discovery', verification: 'Self-Declared', usedBy: 4, lastUpdated: '23 Sep 2026', version: '1', group: 'Water' },
    { field: 'Water Source', value: 'MIDC Water Supply', source: 'Business Discovery', verification: 'Self-Declared', usedBy: 3, lastUpdated: '23 Sep 2026', version: '1', group: 'Water' },
    { field: 'Wastewater Generated', value: 'yes (120 KL/day industrial)', source: 'Business Discovery', verification: 'Self-Declared', usedBy: 4, lastUpdated: '23 Sep 2026', version: '1', group: 'Environment' },
    { field: 'Air Emissions', value: 'yes (Boiler Stack & DG)', source: 'Business Discovery', verification: 'Self-Declared', usedBy: 3, lastUpdated: '23 Sep 2026', version: '1', group: 'Environment' },
    { field: 'Hazardous Materials', value: 'yes (Solvents / API intermediates)', source: 'Business Discovery', verification: 'Self-Declared', usedBy: 5, lastUpdated: '23 Sep 2026', version: '1', group: 'Environment' },
    { field: 'Boiler', value: 'yes (4 Ton / Briquet / Natural Gas)', source: 'Business Discovery', verification: 'Self-Declared', usedBy: 2, lastUpdated: '23 Sep 2026', version: '1', group: 'Machinery' },
  ];
}

export interface ProvenanceDetails {
  fieldName: string;
  currentValue: string;
  currentSource: string;
  currentVerification: VerificationState;
  isPlotArea: boolean;
  usedBy: { dept: string; service: string }[];
  history: {
    version: string;
    value: string;
    source: string;
    verification: string;
    date: string;
  }[];
}

export function getProvenanceDetails(fieldName: string, project: BusinessProject): ProvenanceDetails {
  const isPlotArea = fieldName.toLowerCase().includes('plot') || fieldName.toLowerCase().includes('land');
  const usedBy = [
    { dept: 'MIDC', service: 'Building / Planning Service' },
    { dept: 'MPCB', service: 'Consent to Establish' },
    { dept: 'Fire', service: 'Provisional Fire Review' },
    { dept: 'DISH', service: 'Factory Context' },
  ];

  if (isPlotArea) {
    return {
      fieldName: 'Plot Area',
      currentValue: '4,800 m²',
      currentSource: 'MIDC Allotment',
      currentVerification: 'Department Verified',
      isPlotArea: true,
      usedBy,
      history: [
        { version: 'V1', value: '4,800 m²', source: 'Entrepreneur Declaration', verification: 'Self-Declared', date: '23 Aug 2026' },
        { version: 'V2', value: '4,800 m²', source: 'MIDC Allotment', verification: 'Department Verified', date: '22 Sep 2026' },
      ],
    };
  }

  const rows = getDossierRows(project);
  const matched = rows.find(r => r.field.toLowerCase() === fieldName.toLowerCase()) || rows[0];

  return {
    fieldName: matched.field,
    currentValue: matched.value,
    currentSource: matched.source,
    currentVerification: matched.verification,
    isPlotArea: false,
    usedBy,
    history: [
      { version: 'V1', value: matched.value, source: matched.source, verification: matched.verification, date: matched.lastUpdated },
    ],
  };
}
