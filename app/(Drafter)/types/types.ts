// export type EditMode = 'form' | 'direct';
// export interface FormData {
//     fileNo: string;
//     date: string;
//     applicantName: string;
//     fatherName: string;
//     municipality: string;
//     district: string;
//     buildingType: string;
//     floorsDesc: string;
//     extent: string;
//     plotNo: string;
//     surveyNo: string;
//     village: string;
//     mandal: string;
//     locality: string;
  
//     street: string;
//     roadAffectedArea: string;
//     netPlotArea: string;
//     rainWaterPits: string;
//     trees: string;
//     height: string;
//     dwellingUnits: string;
  
//     frontSetback: string;
//     rearSetback: string;
//     side1Setback: string;
//     side2Setback: string;
  
//     stiltUse: string;
//     stiltNo: string;
//     stiltArea: string;
  
//     groundUse: string;
//     groundNo: string;
//     groundArea: string;
  
//     upperUse: string;
//     upperNo: string;
//     upperArea: string;
  
//     subDivision: string;
//     permitFee: string;
//     devChargesBuilt: string;
//     devChargesVacant: string;
//     rainWaterDeposit: string;
//     postage: string;
//     debris: string;
//     compoundWall: string;
//     vacantLandTax: string;
//     labourCess: string;
//     userCharges: string;
//     totalPayment: string;
  
//     mortgageDeedNo: string;
//     mortgageDate: string;
//     floorsHandedOver: string;
//     mortgageArea: string;
//     sro: string;
//     marketValue: string;
  
//     commencedBefore: string;
//     completedBefore: string;
  
//     permitNo: string;
//   permitDate: string;
//   provisionalPermitNo: string;
//   provisionalPermitDate: string;
//   postVerificationDate: string;
//     [key: string]: any;
//   }
export type EditMode = 'form' | 'direct';

export interface FormData {
  fileNo?: string;
  // date?: string;
  applicantName?: string;
  fatherName?: string;
  address?: string;
  municipality?: string;
  // district?: string;
  buildingType?: string;
  floorsDesc?: string;
  extent?: string;
  plotNo?: string;
  surveyNo?: string;
  village?: string;
  mandal?: string;
  locality?: string;

  street?: string;
  roadAffectedArea?: string;
  netPlotArea?: string;
  rainWaterPits?: string;
  trees?: string;
  height?: string;
  dwellingUnits?: string;

  frontSetback?: string;
  rearSetback?: string;
  side1Setback?: string;
  side2Setback?: string;

  stiltUse?: string;
  stiltNo?: string;
  stiltArea?: string;

  groundUse?: string;
  groundNo?: string;
  groundArea?: string;

  upperUse?: string;
  upperNo?: string;
  upperArea?: string;

  subDivision?: string;
  permitFee?: string;
  devChargesBuilt?: string;
  devChargesVacant?: string;
  rainWaterDeposit?: string;
  postage?: string;
  debris?: string;
  compoundWall?: string;
  vacantLandTax?: string;
  labourCess?: string;
  userCharges?: string;
  totalPayment?: string;

  mortgageDeedNo?: string;
  mortgageDate?: string;
  floorsHandedOver?: string;
  mortgageArea?: string;
  sro?: string;
  marketValue?: string;

  commencedBefore?: string;
  completedBefore?: string;

  permitNo?: string;
  permitDate?: string;
  provisionalPermitNo?: string;
  provisionalPermitDate?: string;
  postVerificationDate?: string;
  // Building Valuation Specific Fields
  valuerName?: string;
  valuerQualifications?: string;
  valuerRegNo?: string;
  valuerAddress?: string;
  valuerPhone?: string;
  valuerEmail?: string;
  
  bankManager?: string;
  bankBranch?: string;
  // valuationDate?: string;
  // inspectionDate?: string;
  
  // ownerName?: string;
  // ownerPhone?: string;
  // propertyType?: string;
  propertyAddress?: string; 
  pincode?: string;
  
  extentSite?: string;
  pmrRate?: string;
  
  // fairMarketValue?: string;
  // fairMarketValueWords?: string;
  // bookValue?: string;
  // bookValueWords?: string;
  // distressValue?: string;
  // distressValueWords?: string;
  // realisableValue?: string;
  // realisableValueWords?: string;
  
  // northBoundaryDeed?: string;
  // southBoundaryDeed?: string;
  // eastBoundaryDeed?: string;
  // westBoundaryDeed?: string;
  // northBoundaryActual?: string;
  // southBoundaryActual?: string;
  // eastBoundaryActual?: string;
  // westBoundaryActual?: string;
  
  northDimDeed?: string;
  southDimDeed?: string;
  eastDimDeed?: string;
  westDimDeed?: string;
  northDimActual?: string;
  southDimActual?: string;
  eastDimActual?: string;
  westDimActual?: string;
  
  // latitude?: string;
  // longitude?: string;
  
  // landValueGLR?: string;
  // landValuePMR?: string;
  buildingValue?: string;
  extraItemsValue?: string;
  amenitiesValue?: string;
  servicesValue?: string;
  totalAbstractValue?: string;


  // Part 1 - Basic Info
  toName: string; // Branch Manager name
  branch: string;
  date: string;

  // Owner Details
  ownerName: string;
  ownerRelation: string; // W/o or S/o
  ownerRelationName: string;
  ownerPhone: string;

  // Property Type
  propertyType: string; // e.g. "Mortgage Loan - Existing Building - Residential"
  propertyDescription: string; // e.g. "Ground Floor and First Floor Building"

  // Location
  hNo: string;
  syNo: string;
  road: string;
  area: string; // locality/area
  city: string;
  district: string;
  pinCode: string;
  landmark: string;

  // Site extent
  extentSqYds: string;
  landRatePerSqYd: string;

  // Summary Values
  fairMarketValue: string;
  fairMarketValueWords: string;
  bookValue: string;
  bookValueWords: string;
  distressValue: string;
  distressValueWords: string;
  realisableValue: string;
  realisableValueWords: string;

  // Part A - General
  purposeOfValuation: string;
  dateOfInspection: string;
  dateOfValuation: string;

  // Documents
  doc1Description: string;
  doc1No: string;
  doc1Date: string;
  doc1Copy: string;
  doc2Description: string;
  doc2No: string;
  doc2Date: string;
  doc2Copy: string;
  doc3Description: string;
  doc3No: string;
  doc3Date: string;
  doc3Copy: string;

  // Brief description
  briefDescription: string;

  // Location details
  locHNo: string;
  locNagar: string;
  locSFNo: string;
  locVillage: string;
  locTaluk: string;
  locMandal: string;

  // Classification
  residentialArea: string;
  commercialArea: string;
  industrialArea: string;
  classificationHighMiddlePoor: string;
  urbanSemiUrbanRural: string;
  corporationVillageMunicipality: string;

  // Site characteristics
  localityClassification: string;
  surroundingDevelopment: string;
  flooding: string;
  civicAmenities: string;
  landLevel: string;
  shapeOfLand: string;
  typeOfUse: string;
  usageRestriction: string;
  townPlanningApproved: string;
  cornerOrIntermittent: string;
  roadFacilities: string;
  typeOfRoad: string;
  widthOfRoad: string;
  landLocked: string;
  waterPotentiality: string;
  undergroundSewerage: string;
  powerSupply: string;
  advantagesOfSite: string;
  generalRemarks: string;

  // Dimensions
  northDeedDim: string;
  southDeedDim: string;
  eastDeedDim: string;
  westDeedDim: string;
  northActualDim: string;
  southActualDim: string;
  eastActualDim: string;
  westActualDim: string;

  // Boundaries
  northBoundaryDeed: string;
  southBoundaryDeed: string;
  eastBoundaryDeed: string;
  westBoundaryDeed: string;
  northBoundaryActual: string;
  southBoundaryActual: string;
  eastBoundaryActual: string;
  westBoundaryActual: string;

  // Coordinates
  latitude: string;
  longitude: string;

  // Extents
  extentAsPerDeed: string;
  extentForValuation: string;
  occupiedBy: string; // owner/tenant rent

  // Part A - Valuation of Land
  guidelineRate: string;
  landValueGLR: string;
  prevailingMarketRateRange: string;
  unitRatePMR: string;
  landValuePMR: string;

  // Extra items (Part C)
  portico: string;
  ornamentalDoor: string;
  sitOutVerandah: string;
  overheadWaterTank: string;
  extraGates: string;
  extraItemsTotal: string;

  // Part D - Amenities
  wardrobes: string;
  glazedTiles: string;
  extraSinksBathtub: string;
  marbleCeramicTiles: string;
  interiorDecorations: string;
  architecturalElevation: string;
  panellingWorks: string;
  aluminiumWorks: string;
  aluminiumHandRails: string;
  falseCeilingArea: string;
  falseCeilingRate: string;
  falseCeilingValue: string;
  amenitiesTotal: string;

  // Part E - Miscellaneous
  separateLumberRoom: string;
  separateToiletRoom: string;
  separateWaterTank: string;
  treesGardening: string;
  miscTotal: string;

  // Part E - Services
  openWell: string;
  deepBore: string;
  handPump: string;
  motor: string;
  corporationTap: string;
  underGroundSump: string;
  overheadTankServices: string;
  septicTank: string;
  undergroundSewage: string;
  compoundWallRft: string;
  compoundWallRate: string;
  compoundWallHeight: string;
  compoundWallLength: string;
  compoundWallType: string;
  compoundWallValue: string;
  pavementsSqft: string;
  pavementsRate: string;
  pavementsValue: string;
  servicesTotal: string;

  // Part B - Building Technical Details
  typeOfBuilding: string;
  typeOfConstruction: string;
  qualityOfConstruction: string;
  appearanceOfBuilding: string;
  yearOfConstruction: string;
  ageOfBuilding: string;
  expectedFutureLife: string;
  totalLifeOfBuilding: string;
  numberOfFloorsHeight: string;
  maintenanceExterior: string;
  maintenanceInterior: string;
  drawingApprovalDate: string;
  approvedMapAuthority: string;
  genuinenessVerified: string;
  anyOtherComments: string;

  // Specifications
  specFoundation: string;
  specBasement: string;
  specSuperStructure: string;
  specJoinery: string;
  specRCCWorks: string;
  specPlastering: string;
  specFlooring: string;
  specSpecialFinish: string;
  specRoofing: string;
  specDrainage: string;

  // Compound wall (building section)
  compWallBuildingRft: string;
  compWallBuildingRate: string;
  compWallBuildingHeight: string;
  compWallBuildingLength: string;
  compWallBuildingType: string;

  // Electrical
  typeOfWiring: string;
  classOfFittings: string;
  numberOfLightPoints: string;
  fanPoints: string;
  sparePlugPoints: string;
  anyOtherElectrical: string;

  // Plumbing
  waterClosets: string;
  washBasins: string;
  urinals: string;
  bathTubs: string;
  waterMeters: string;
  anyOtherPlumbing: string;

  // Floor-wise plinth area
  groundFloorYear: string;
  groundFloorMainArea: string;
  groundFloorCantArea: string;
  groundFloorTotal: string;

  // Valuation details
  groundFloorPlinthArea: string;
  groundFloorRate: string;
  groundFloorAge: string;
  groundFloorReplacementCost: string;
  groundFloorDepreciation: string;
  groundFloorNetValue: string;
  buildingTotal: string;

  // Electrical & Plumbing lumpsum
  electricalLumpsum: string;
  plumbingLumpsum: string;

  // Abstract Value
  landGLR: string;
  landPMR: string;
  buildingGLR: string;
  buildingPMR: string;
  extraItemsAbstract: string;
  amenitiesAbstract: string;
  miscAbstract: string;
  servicesAbstract: string;
  totalGLR: string;
  totalPMR: string;
  presentMarketValue: string;

  // Certificate
  titleDeedNo: string;
  titleDeedDate: string;

  // Declaration
  appointmentDate: string;
  valuationDate: string;
  reportDate: string;
  inspectionDate: string;

  // Place
  place: string;
  reportDate2: string;

  [key: string]: any;
} 

    
     
     
      
