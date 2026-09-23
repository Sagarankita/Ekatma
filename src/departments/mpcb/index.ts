import { DepartmentPack } from '../registry';

// Dummy config for demonstration of MPCB registration
export const mpcbPack: DepartmentPack = {
  id: 'mpcb',
  name: 'Maharashtra Pollution Control Board (MPCB)',
  services: [
    {
      id: 'MPCB-CTE-01',
      name: 'Consent to Establish',
      category: 'Environment',
      defaultScrutinyRoute: 'environment'
    }
  ],
  scrutinyConfig: {
    'environment': {
      sections: [{ id: 'env-identity', label: 'Identity', status: 'not-reviewed' }],
      params: [],
      docs: [],
      consistencyCheck: [],
      dependencies: []
    }
  }
};
