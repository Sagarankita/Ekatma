export interface E05Data {
  classification: 'msme' | 'large' | 'mega' | 'not-sure' | ''
  megaProject: 'yes' | 'no' | 'not-sure' | ''
  legalEntityType: string
  legalEntityTypeOther: string
  legalEntityName: string
  pan: string
  cin: string
  llpin: string
  registrationNumber: string
  authorisedPersonRole: string
  projectOperatedBySameEntity: 'yes' | 'no' | ''
  operatorName: string
  operatorRelationship: string
  industry: string
  industrySearch: string
  activities: string[]
  activityOther: string
  products: Array<{ id: string; name: string; description: string }>
  processType: string
  processDescription: string
  projectStage: string
  district: string
  taluka: string
  village: string
  pincode: string
  // Section 7: MIDC + Land
  midcEstate: string
  midcPlotNumber: string
  midcPlotArea: string
  midcAllotmentStatus: string
  preferredLandRoute: 'midc' | 'private' | 'not-decided' | ''
  acquisitionCurrentStatus: string
  acquisitionCurrentStatusOther: string
  landType: 'midc-industrial' | 'private-na' | 'private-agri' | 'other' | 'not-sure' | ''
  // Section 8: Land details + Agri + Documents
  ownershipStatus: string
  ownershipStatusOther: string
  surveyPlotNumber: string
  landArea: string
  landUseClassification: string
  agriIntendedForIndustrial: 'yes' | 'no' | 'not-sure' | ''
  agriLandUsePermission: 'yes' | 'no' | 'in-progress' | 'not-sure' | ''
  agriPurchaseAboveThreshold: 'yes' | 'no' | 'not-sure' | ''
  landDocuments: string[]
  // Part 3 — Investment
  totalInvestment: string
  investmentLand: string
  investmentBuilding: string
  investmentPlantMachinery: string
  investmentOther: string
  // Part 3 — Employment
  workforceTotal: string
  workforcePermanent: string
  workforceContract: string
  workforceOtherCount: string
  workforceCurrentTotal: string
  // Part 3 — Production
  productionCapacities: Array<{ productId: string; productName: string; capacity: string; unit: string; unitOther: string }>
  shifts: string
  shiftsOther: string
  operatingHoursPerDay: string
  processDetailsExtra: string
  // Part 3 — Building
  buildingBuiltUpArea: string
  buildingFloors: string
  buildingHeight: string
  buildingOccupancy: string
  buildingConstructionStatus: string
  buildingRiskFlags: string[]
  buildingCurrentBuiltUpArea: string
  buildingCurrentFloors: string
  buildingCurrentHeight: string
  buildingCurrentOccupancy: string
  // Part 3 — Power
  connectedLoad: string
  connectedLoadUnit: 'kw' | 'mw' | ''
  supplyType: 'lt' | 'ht' | 'not-sure' | ''
  htInfrastructure: string
  // Part 3 — Water
  dailyWaterRequirement: string
  waterSource: string
  waterSourceOther: string
  waterSourceDescription: string
  // Part 3 — Wastewater
  generatesWastewater: 'yes' | 'no' | 'not-sure' | ''
  wastewaterType: 'domestic' | 'industrial' | 'both' | ''
  industrialEffluentQuantity: string
  treatmentPlanned: 'yes' | 'no' | 'not-decided' | ''
  treatmentSystem: string
  treatmentCapacity: string
  // Part 3 — Drainage
  requiresDrainage: 'yes' | 'no' | 'not-sure' | ''
  drainageTypes: string[]
  drainageOtherDescription: string
  // Part 4 — Environment
  envTrigger: 'yes' | 'no' | 'unknown' | ''
  envCharacteristics: string[]
  envCharOther: string
  // Part 4 — Air Emissions
  airEmissions: 'yes' | 'no' | 'not-sure' | ''
  airEmissionSources: string[]
  airEmissionSourceOther: string
  // Part 4 — Hazardous Materials
  hazMatYN: 'yes' | 'no' | 'not-sure' | ''
  hazMaterials: Array<{ material: string; purpose: string; maxQuantity: string; unit: string; storageMethod: string; hazardTypes: string[]; hazardOther: string }>
  // Part 4 — Hazardous Waste
  hazWasteYN: 'yes' | 'no' | 'not-sure' | ''
  hazWastes: Array<{ wasteType: string; quantity: string; unit: string; storageMethod: string; treatment: string }>
  // Part 4 — Solid Waste
  solidWasteYN: 'yes' | 'no' | ''
  solidWastes: Array<{ wasteType: string; quantity: string; unit: string; storage: string; treatment: string }>
  // Part 4 — Boiler
  boilerYN: 'yes' | 'no' | ''
  boilerCapacity: string
  boilerFuel: string
  boilerPressure: string
  boilerCount: string
  // Part 4 — Pressure Vessel
  pressureVesselYN: 'yes' | 'no' | 'not-sure' | ''
  pressureEquipment: Array<{ equipmentType: string; capacity: string; pressure: string }>
  // Part 4 — Dangerous Machinery
  dangerousMachineryYN: 'yes' | 'no' | 'not-sure' | ''
  dangerousMachineryItems: Array<{ machineryType: string; count: string; capacityRating: string }>
  // Part 4 — Factory
  factoryYN: 'yes' | 'no' | 'not-sure' | ''
  // Part 4 — Fire
  fireFlags: string[]
  // Part 4 — Storage
  storageCategories: string[]
  storageItems: Array<{ category: string; material: string; maxQuantity: string; unit: string; storageArea: string; storageLocation: string; storageType: string }>
  // Part 4 — Warehouse
  warehouseYN: 'yes' | 'no' | ''
  warehouseArea: string
  warehouseMaterial: string
  warehouseHazardous: 'yes' | 'no' | ''
  // Part 4 — Import/Export
  importExport: 'import' | 'export' | 'both' | 'neither' | ''
  importedInputs: Array<{ material: string; description: string }>
  exportedProducts: Array<{ product: string; description: string }>
  // Part 4 — Logistics
  logisticsYN: 'yes' | 'no' | ''
  logisticsModes: string[]
  logisticsModeOther: string
  vehicleMovementPerDay: string
  // Part 4 — Existing Approvals (rows; base answer reused from e04Data)
  existingApprovalRows: Array<{ department: string; approvalType: string; licenceNumber: string; issueDate: string; expiryDate: string; status: string }>
  // Part 4 — Existing Applications
  existingApplicationYN: 'yes' | 'no' | ''
  existingApplicationRows: Array<{ department: string; service: string; applicationId: string; submissionDate: string; currentStatus: string }>
  // Part 4 — Incentive Attributes
  incentiveAttributes: string[]
  // Part 4 — Documents
  docAvailability: 'yes' | 'some' | 'no' | ''
  docRecords: Array<{ category: string; documentName: string }>
}

export interface E03Data {
  name: string
  projectType: 'new' | 'existing' | 'expansion' | 'modification' | ''
  existingBusinessId: string
  description: string
}

export interface E04Data {
  needLand: 'yes' | 'no' | 'not-sure' | ''
  landStatus: 'possessed' | 'identified' | 'in-progress' | 'required' | 'not-sure' | ''
  midc: 'yes' | 'no' | 'not-sure' | ''
  construction: 'new' | 'existing' | 'modification' | 'not-sure' | ''
  water: 'yes' | 'no' | 'not-sure' | ''
  power: 'yes' | 'no' | 'not-sure' | ''
  businessNature: 'manufacturing' | 'processing' | 'services' | 'trading' | 'mfg-trading' | 'construction' | 'other' | 'not-sure' | ''
  existingApprovals: 'yes' | 'no' | 'not-sure' | ''
}

