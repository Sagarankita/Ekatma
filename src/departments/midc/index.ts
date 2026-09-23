import { DepartmentPack } from '../registry';
import { midcBuildingScrutiny, midcWaterScrutiny } from './scrutiny';

export const midcPack: DepartmentPack = {
  id: 'midc',
  name: 'Maharashtra Industrial Development Corporation (MIDC)',
  services: [
    {
      id: 'MIDC-BPA-01',
      name: 'Building Plan Approval',
      category: 'Building',
      defaultScrutinyRoute: 'building'
    },
    {
      id: 'MIDC-WAT-01',
      name: 'Water Connection',
      category: 'Utility',
      defaultScrutinyRoute: 'water'
    }
  ],
  scrutinyConfig: {
    'building': midcBuildingScrutiny,
    'water': midcWaterScrutiny
  }
};
