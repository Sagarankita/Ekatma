export const ENTREPRENEUR_PAGES = [
  'portal',
  'login',
  'signup-email',
  'signup-register',
  'signup-success',
  'my-businesses',
  'e00-command-centre',
  'create-business',
  'basic-requirements',
  'e05-placeholder',
  'e05-adaptive',
  'e05-scale',
  'e05-env',
  'e06-placeholder',
  'e07-dossier',
  'e08-provenance',
  'e09-journey',
  'e10-req-detail',
  'e11-doc-centre',
  'e12-doc-detail',
  'e13-dependency',
  'e14-application',
  'e15-prevalidation',
  'e16-consistency',
  'e17-payment',
  'e18-tracker',
  'e19-detail',
  'e20-query',
  'e21-delta',
  'e22-inspection',
  'e23-decision',
  'e24-compliance',
  'e25-compliance-detail',
  'e26-incentives',
  'e27-incentive-detail',
  'e28-incentive-claims',
  'e29-reg-change',
  'e30-sim',
  'e31-amendments',
  'e32-grievances',
  'e33-notifications',
  'e34-reg-assistant',
] as const;

export type EntrepreneurPage = (typeof ENTREPRENEUR_PAGES)[number];

export function isEntrepreneurPage(value: string): value is EntrepreneurPage {
  return (ENTREPRENEUR_PAGES as readonly string[]).includes(value);
}

export function entrepreneurPath(page: EntrepreneurPage): string {
  return page === 'portal' ? '/' : `/entrepreneur/${page}`;
}
