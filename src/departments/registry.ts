export interface DepartmentPack {
  id: string;
  name: string;
  services: ServiceDefinition[];
  scrutinyConfig: Record<string, ScrutinyConfig>;
}

export interface ServiceDefinition {
  id: string;
  name: string;
  category: string;
  defaultScrutinyRoute: string; 
}

export interface ScrutinyConfig {
  sections: any[];
  params: any[];
  docs: any[];
  consistencyCheck: any[];
  dependencies: any[];
}

export const departmentRegistry = new Map<string, DepartmentPack>();

export function registerDepartment(pack: DepartmentPack) {
  departmentRegistry.set(pack.id, pack);
}

export function getDepartmentPack(id: string): DepartmentPack | undefined {
  return departmentRegistry.get(id);
}

export function getScrutinyConfig(deptId: string, serviceRoute: string): ScrutinyConfig | undefined {
  const pack = departmentRegistry.get(deptId);
  if (!pack) return undefined;
  return pack.scrutinyConfig[serviceRoute];
}
