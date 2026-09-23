import { registerDepartment } from './registry';
import { midcPack } from './midc';
import { mpcbPack } from './mpcb';

// Initialize the department pack architecture
registerDepartment(midcPack);
registerDepartment(mpcbPack);

export * from './registry';
