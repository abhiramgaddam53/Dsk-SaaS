 
// import { useState, useRef } from 'react';
// import { FormData, EditMode  } from '@/app/(Drafter)/types/types';

// export function useDocumentEditor() {
//   const [zoom, setZoom] = useState(100);
//   const [selectedTemplate, setSelectedTemplate] = useState('provisional_building');
//   const [editMode, setEditMode] = useState<EditMode>('form');
//   const documentRef = useRef<HTMLDivElement>(null);

//   // Group data by template ID so they are completely isolated
//   const [allFormData, setAllFormData] = useState<Record<string, FormData>>({
//     provisional_building: {
//       fileNo: '040815/ARMO/00245/IABP/2026',
//       date: '13/02/2026',
//       applicantName: 'Sri Bhusa Laxmi Narayana',
//       fatherName: 'Bhusa Laxman',
//       address: 'H.No. 1-3-129, Zirayath Nagar, Armoor Proper and Municipality, Dist. Nizamabad. 503224',
//       municipality: 'Armoor Municipality',
//       district: 'Nizamabad District',
//       buildingType: 'Individual Residential Building',
//       floorsDesc: 'Ground Floor + 1 Upper Floor',
//       extent: '199.27',
//       plotNo: 'Layout Plot No. 11 Part, In L.P. No. 9/2005/HRO, C.No. 46/05/HRO/H1,',
//       surveyNo: '218/P, 222/P AND 223/P',
//       village: 'Perkit&Kotarmoor;',
//       mandal: 'Armoor',
//       locality: 'Near To BC Hostel Road',
//       street: 'Near Bharath Chandra High School',
//       roadAffectedArea: '0',
//       netPlotArea: '199.27',
//       rainWaterPits: '3',
//       trees: '5',
//       height: '7.0',
//       dwellingUnits: '2',
//       frontSetback: '1.5',
//       rearSetback: '1.0',
//       side1Setback: '1.0',
//       side2Setback: '1.0',
//       stiltUse: '-', stiltNo: '-', stiltArea: '-',
//       groundUse: 'Residential', groundNo: '1', groundArea: '127.42',
//       upperUse: 'Residential', upperNo: '1', upperArea: 'Total Upper Floor Area: 127.42 Floor 1 Area: 127.42',
//       subDivision: '1993.0',
//       permitFee: '2549.0',
//       devChargesBuilt: '5097.0',
//       devChargesVacant: '503.0',
//       rainWaterDeposit: '1993.0',
//       postage: '200.0',
//       debris: '1000.0',
//       compoundWall: '897.0',
//       vacantLandTax: '811.0',
//       labourCess: '24688.0',
//       userCharges: '1000.0',
//       totalPayment: '40731.0',
//       mortgageDeedNo: '-',
//       mortgageDate: '-',
//       floorsHandedOver: '-',
//       mortgageArea: '-',
//       sro: '-',
//       marketValue: '1700.0',
//       commencedBefore: '12/08/2026',
//       completedBefore: '13/02/2029',
//     } as FormData,

//     building_valuation: {
//       toName: "Branch Manager: Union Bank of India",
//   branch: "Metpally",
//   date: "15-05-2026",

//   ownerName: "Smt. Pottavarthini Radha",
//   ownerRelation: "W/o",
//   ownerRelationName: "Rajesham",
//   ownerPhone: "9640807282, 9666755997",

//   propertyType: "Mortgage Loan - Existing Building - Residential",
//   propertyDescription: "Ground Floor and First Floor Building",

//   hNo: "H.No. 2-1-205/B",
//   syNo: "NA",
//   road: "Vivekananda Road, Dubba Wada",
//   area: "Metpally",
//   city: "Metpally",
//   district: "Jagityal",
//   pinCode: "505325",
//   landmark: "Sai Ram Medical Lane",

//   extentSqYds: "126.52",
//   landRatePerSqYd: "17,000",

//   fairMarketValue: "45,57,000",
//   fairMarketValueWords: "Forty Five Lacs Fifty Seven Thousand Rupees",
//   bookValue: "8,69,000",
//   bookValueWords: "Eight Lacs Sixty Nine Thousand Rupees",
//   distressValue: "36,45,600",
//   distressValueWords: "Thirty Six Lacs Forty Five Thousand Six Hundred Rupees",
//   realisableValue: "41,01,300",
//   realisableValueWords: "Forty One Lacs One Thousand Three Hundred Rupees",

//   purposeOfValuation: "For Bank Loan / Mortgage Purpose",
//   dateOfInspection: "12-05-2026",
//   dateOfValuation: "15-05-2026",

//   doc1Description: "Sale Deed",
//   doc1No: "1318/2003",
//   doc1Date: "27-09-2003",
//   doc1Copy: "Copy",
//   doc2Description: "Building Permission - Metpally Municipality",
//   doc2No: "G1/25/636/2007",
//   doc2Date: "02-06-2007",
//   doc2Copy: "Copy",
//   doc3Description: "Municipal Property Tax",
//   doc3No: "1130007404",
//   doc3Date: "31-03-2026",
//   doc3Copy: "Copy",

//   briefDescription:
//     "The Property is Ground Floor and First Floor Building over H.No. H.No. 2-1-205/B, NA, Vivekananda Road, Dubba Wada, Metpally Village, Metpally Municipality, Jagityal District 505325. Land Mark Sai Ram Medical Lane with total site area of 126.52 Sq.Yds Belongs to Applicant : Smt. Pottavarthini Radha, W/o Rajesham",

//   locHNo: "H.No. 2-1-205/B",
//   locNagar: "NA",
//   locSFNo: "Vivekananda Road, Dubba Wada",
//   locVillage: "Metpally",
//   locTaluk: "Jagityal",
//   locMandal: "505325",

//   residentialArea: "Residential Zone as per Master Plan",
//   commercialArea: "",
//   industrialArea: "",
//   classificationHighMiddlePoor: "Middle",
//   urbanSemiUrbanRural: "Semi Urban",
//   corporationVillageMunicipality: "Municipality",

//   localityClassification: "Residential Zone as per Master Plan",
//   surroundingDevelopment: "Surrounding area is well developed with paved roads, houses, and shops.",
//   flooding: "No history of flooding; land level is higher than adjoining road.",
//   civicAmenities: "All major civic amenities are available within 1 km radius.",
//   landLevel: "Land is level and matches surrounding ground.",
//   shapeOfLand: "Regular rectangular plot.",
//   typeOfUse: "Suitable for residential construction.",
//   usageRestriction: "Subject to residential use only.",
//   townPlanningApproved: "Yes, within approved layout as per local authority.",
//   cornerOrIntermittent: "Intermittent plot with single road frontage.",
//   roadFacilities: "Public Road",
//   typeOfRoad: "CC Road",
//   widthOfRoad: "Below 20 Ft Wide",
//   landLocked: "No, plot has direct road access.",
//   waterPotentiality: "Borewell / open well source available.",
//   undergroundSewerage: "Septic tank system in use; no underground network.",
//   powerSupply: "Power supply available through local electricity board.",
//   advantagesOfSite: "All amenities are within walkable distance, it is fully developed residential area",
//   generalRemarks:
//     "The site is Road Widening affected and net area is only considered for Plot Valuation. The Actual Building is Ground, First and Pent house, However the Building Permission has been submitted only for Ground Floor as per the documents submitted, hence only Ground Floor is considered for valuation of the building",

//   northDeedDim: "37'0\"",
//   southDeedDim: "37'0\"",
//   eastDeedDim: "43'9\"",
//   westDeedDim: "43'9\"",
//   northActualDim: "37'0\" (-11' Road Widening) 28' only",
//   southActualDim: "37'0\" (-11' Road Widening) 28' only",
//   eastActualDim: "43'9\"",
//   westActualDim: "43'9\"",

//   northBoundaryDeed: "H No. 2-1-206 of Khaza Mohd Shariuddin",
//   southBoundaryDeed: "H.No. 2-1-205/A of Chityala Narasaiah",
//   eastBoundaryDeed: "18' Wide Road",
//   westBoundaryDeed: "H.No. 2-1-191 of Janardhan",
//   northBoundaryActual: "H No. 2-1-206 of Khaza Mohd Shariuddin",
//   southBoundaryActual: "H.No. 2-1-205/A of Chityala Narasaiah",
//   eastBoundaryActual: "H.No. 2-1-191 of Janardhan",
//   westBoundaryActual: "H.No. 2-1-191 of Janardhan",

//   latitude: "18.851065",
//   longitude: "78.621209",

//   extentAsPerDeed: "180.00",
//   extentForValuation: "126.52",
//   occupiedBy: "Rs.8,000 Per month",

//   guidelineRate: "3,800",
//   landValueGLR: "4,80,776",
//   prevailingMarketRateRange: "Rs.17000 to Rs.19000",
//   unitRatePMR: "17,000",
//   landValuePMR: "21,50,840",

//   portico: "",
//   ornamentalDoor: "35,000",
//   sitOutVerandah: "8,000",
//   overheadWaterTank: "40,000",
//   extraGates: "",
//   extraItemsTotal: "83,000",

//   wardrobes: "",
//   glazedTiles: "15,000",
//   extraSinksBathtub: "",
//   marbleCeramicTiles: "",
//   interiorDecorations: "60,000",
//   architecturalElevation: "90,000",
//   panellingWorks: "35,000",
//   aluminiumWorks: "",
//   aluminiumHandRails: "",
//   falseCeilingArea: "620",
//   falseCeilingRate: "120",
//   falseCeilingValue: "74,400",
//   amenitiesTotal: "2,74,400",

//   separateLumberRoom: "",
//   separateToiletRoom: "45,000",
//   separateWaterTank: "40,000",
//   treesGardening: "",
//   miscTotal: "85,000",

//   openWell: "40,000",
//   deepBore: "90,000",
//   handPump: "",
//   motor: "20,000",
//   corporationTap: "",
//   underGroundSump: "",
//   overheadTankServices: "30,000",
//   septicTank: "50,000",
//   undergroundSewage: "",
//   compoundWallRft: "143.5",
//   compoundWallRate: "1,500",
//   compoundWallHeight: "4'6\"",
//   compoundWallLength: "143.5 ft",
//   compoundWallType: "Brick Masonary with Cement Motor plaster",
//   compoundWallValue: "2,15,250",
//   pavementsSqft: "100",
//   pavementsRate: "300",
//   pavementsValue: "30,000",
//   servicesTotal: "4,75,250",

//   typeOfBuilding: "Independent residential house (single-family dwelling)",
//   typeOfConstruction: "RCC framed structure with brick walls and reinforced concrete roof.",
//   qualityOfConstruction: "Average quality construction using standard materials",
//   appearanceOfBuilding: "Functional and presentable appearance suitable for the locality.",
//   yearOfConstruction: "2007",
//   ageOfBuilding: "19",
//   expectedFutureLife: "61",
//   totalLifeOfBuilding: "80",
//   numberOfFloorsHeight: "Ground Floor and First Floor Building, Roof Height = 11' each floor",
//   maintenanceExterior: "Fairly maintained; minor repairs required",
//   maintenanceInterior: "Fairly maintained; minor repairs required",
//   drawingApprovalDate: "Copy of layout approval not furnished; hence validity could not be verified.",
//   approvedMapAuthority:
//     "As per copy produced, approval is issued by Municipal Corporation / Town Planning Department / Gram Panchayat / DTCP, etc.",
//   genuinenessVerified: "Verified based on the stamped/signed copy furnished by the client.",
//   anyOtherComments:
//     "Approval document appears in order and consistent with the property layout observed at site.",

//   specFoundation:
//     "Random rubble masonry foundation in cement mortar below plinth level; standard PCC bed.",
//   specBasement:
//     "Vitrified tiles flooring in all rooms; anti-skid ceramic tiles in toilets and balconies.",
//   specSuperStructure:
//     "Brick masonry walls in cement mortar (1:6) for superstructure. 9\" Thick for External and 4\" Thick for Internal Walls",
//   specJoinery:
//     "Doors: Wooden frames with laminated flush shutters. Windows: Steel casement type with glazing and MS grill protection. Timber: Teak / country wood used for frames.",
//   specRCCWorks:
//     "RCC works carried out with M20 grade concrete using tor steel reinforcement as per structural design.",
//   specPlastering:
//     "Single coat 12mm thick cement plaster in 1:6 (Cement : Sand) proportion for internal and external walls; no finishing coat.",
//   specFlooring:
//     "Vitrified tiles flooring in all rooms; anti-skid ceramic tiles in toilets and balconies.",
//   specSpecialFinish: "",
//   specRoofing: "Reinforced Cement Concrete (RCC) flat roof with weathering course.",
//   specDrainage: "NA",

//   compWallBuildingRft: "143.5",
//   compWallBuildingRate: "1,200",
//   compWallBuildingHeight: "4'6\"",
//   compWallBuildingLength: "143.5 ft",
//   compWallBuildingType: "Brick Masonary with Cement Motor plaster",

//   typeOfWiring: "Concealed PVC wiring in rigid conduit",
//   classOfFittings: "Superior – Modular switches (Anchor, Havells, GM, etc.) with concealed",
//   numberOfLightPoints: "Moderate – 1 per 80–100 sq.ft.",
//   fanPoints: "One per habitable room",
//   sparePlugPoints: "Limited – Only one per room",
//   anyOtherElectrical: "Exhaust fans / Geyser points in kitchen & toilets",

//   waterClosets: "Attached full bathroom & toilets",
//   washBasins: "Available",
//   urinals: "NA",
//   bathTubs: "NA",
//   waterMeters: "NA",
//   anyOtherPlumbing: "",

//   groundFloorYear: "2007",
//   groundFloorMainArea: "946",
//   groundFloorCantArea: "0",
//   groundFloorTotal: "946.375",

//   groundFloorPlinthArea: "946",
//   groundFloorRate: "2000",
//   groundFloorAge: "19",
//   groundFloorReplacementCost: "18,92,750",
//   groundFloorDepreciation: "4,04,575",
//   groundFloorNetValue: "14,88,175",
//   buildingTotal: "14,88,175",

//   electricalLumpsum: "74,409",
//   plumbingLumpsum: "74,409",

//   landGLR: "17,000",
//   landPMR: "21,50,840",
//   buildingGLR: "8,51,738",
//   buildingPMR: "14,88,175",
//   extraItemsAbstract: "83,000",
//   amenitiesAbstract: "2,74,400",
//   miscAbstract: "85,000",
//   servicesAbstract: "4,75,250",
//   totalGLR: "8,68,738",
//   totalPMR: "45,56,665",
//   presentMarketValue: "45,57,000",

//   titleDeedNo: "1318/2003",
//   titleDeedDate: "27-09-2003",

//   appointmentDate: "11-05-2026",
//   valuationDate: "15-05-2026",
//   reportDate: "15-05-2026",
//   inspectionDate: "12-05-2026",

//   place: "Armoor",
//   reportDate2: "15-05-2026",
//     } as FormData,
//   });

//   // Extract only the active template's data for the UI
//   const formData = allFormData[selectedTemplate] || {};

//   // Update ONLY the nested object corresponding to the active template
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setAllFormData((prev) => ({
//       ...prev,
//       [selectedTemplate]: {
//         ...prev[selectedTemplate],
//         [name]: value,
//       },
//     }));
//   };

//   // Submit ONLY the isolated data for the active template
//   const handleSubmitToBackend = async () => {
//     const dataToSave = allFormData[selectedTemplate];
//     // await api.post(`/documents/${selectedTemplate}`, dataToSave);
//     console.log(`Saved ${selectedTemplate} to Backend:`, dataToSave);
//   };

//   return {
//     zoom, setZoom,
//     selectedTemplate, setSelectedTemplate,
//     editMode, setEditMode,
//     documentRef,
//     formData, handleChange,
//     handleSubmitToBackend
//   };
// }
import { useState, useRef } from 'react';
import { FormData, EditMode } from '@/app/(Drafter)/types/types';

// ─── UTILITY: VBA TO TYPESCRIPT NUMBER TO WORDS (INDIAN SYSTEM) ───
export const spellNumberIndian = (numInput: string | number): string => {
  let numStr = numInput.toString().replace(/,/g, '').split('.')[0]; 
  if (isNaN(Number(numStr)) || numStr === '') return '';
  if (Number(numStr) === 0) return 'No Rupees';

  const a = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
  const b = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

  const getWords = (n: string) => {
    let str = '';
    let num = Number(n);
    if (num > 19) {
      str += b[Math.floor(num / 10)] + (num % 10 !== 0 ? ' ' + a[num % 10] : '');
    } else {
      str += a[num];
    }
    return str.trim();
  };

  if (numStr.length > 9) return 'Amount too large';
  let n = ('000000000' + numStr).slice(-9); 
  
  let out = '';
  const crores = n.slice(0, 2);
  const lacs = n.slice(2, 4);
  const thousands = n.slice(4, 6);
  const hundreds = n.slice(6, 7);
  const tensOnes = n.slice(7, 9);

  if (Number(crores) > 0) out += getWords(crores) + ' Crores ';
  if (Number(lacs) > 0) out += getWords(lacs) + ' Lacs ';
  if (Number(thousands) > 0) out += getWords(thousands) + ' Thousand ';
  if (Number(hundreds) > 0) out += getWords(hundreds) + ' Hundred ';
  if (Number(tensOnes) > 0) {
    if (out !== '') out += 'and ';
    out += getWords(tensOnes);
  }

  out = out.trim();
  if (out === "One") return "One Rupee";
  return out + ' Rupees';
};
// ──────────────────────────────────────────────────────────────────

export function useDocumentEditor() {
  const [zoom, setZoom] = useState(100);
  const [selectedTemplate, setSelectedTemplate] = useState('provisional_building');
  const [editMode, setEditMode] = useState<EditMode>('form');
  const documentRef = useRef<HTMLDivElement>(null);

  // Group data by template ID so they are completely isolated
  const [allFormData, setAllFormData] = useState<Record<string, FormData>>({
    provisional_building: {
      fileNo: '040815/ARMO/00245/IABP/2026',
      date: '13/02/2026',
      applicantName: 'Sri Bhusa Laxmi Narayana',
      fatherName: 'Bhusa Laxman',
      address: 'H.No. 1-3-129, Zirayath Nagar, Armoor Proper and Municipality, Dist. Nizamabad. 503224',
      municipality: 'Armoor Municipality',
      district: 'Nizamabad District',
      buildingType: 'Individual Residential Building',
      floorsDesc: 'Ground Floor + 1 Upper Floor',
      extent: '199.27',
      plotNo: 'Layout Plot No. 11 Part, In L.P. No. 9/2005/HRO, C.No. 46/05/HRO/H1,',
      surveyNo: '218/P, 222/P AND 223/P',
      village: 'Perkit&Kotarmoor;',
      mandal: 'Armoor',
      locality: 'Near To BC Hostel Road',
      street: 'Near Bharath Chandra High School',
      roadAffectedArea: '0',
      netPlotArea: '199.27',
      rainWaterPits: '3',
      trees: '5',
      height: '7.0',
      dwellingUnits: '2',
      frontSetback: '1.5',
      rearSetback: '1.0',
      side1Setback: '1.0',
      side2Setback: '1.0',
      stiltUse: '-', stiltNo: '-', stiltArea: '-',
      groundUse: 'Residential', groundNo: '1', groundArea: '127.42',
      upperUse: 'Residential', upperNo: '1', upperArea: 'Total Upper Floor Area: 127.42 Floor 1 Area: 127.42',
      subDivision: '1993.0',
      permitFee: '2549.0',
      devChargesBuilt: '5097.0',
      devChargesVacant: '503.0',
      rainWaterDeposit: '1993.0',
      postage: '200.0',
      debris: '1000.0',
      compoundWall: '897.0',
      vacantLandTax: '811.0',
      labourCess: '24688.0',
      userCharges: '1000.0',
      totalPayment: '40731.0',
      mortgageDeedNo: '-',
      mortgageDate: '-',
      floorsHandedOver: '-',
      mortgageArea: '-',
      sro: '-',
      marketValue: '1700.0',
      commencedBefore: '12/08/2026',
      completedBefore: '13/02/2029',
    } as FormData,

    building_valuation: {
      toName: "Branch Manager: Union Bank of India",
      branch: "Metpally",
      date: "15-05-2026",

      ownerName: "Smt. Pottavarthini Radha",
      ownerRelation: "W/o",
      ownerRelationName: "Rajesham",
      ownerPhone: "9640807282, 9666755997",

      propertyType: "Mortgage Loan - Existing Building - Residential",
      propertyDescription: "Ground Floor and First Floor Building",

      hNo: "H.No. 2-1-205/B",
      syNo: "NA",
      road: "Vivekananda Road, Dubba Wada",
      area: "Metpally",
      city: "Metpally",
      district: "Jagityal",
      pinCode: "505325",
      landmark: "Sai Ram Medical Lane",

      extentSqYds: "126.52",
      landRatePerSqYd: "17,000",

      fairMarketValue: "45,57,000",
      fairMarketValueWords: "Forty Five Lacs Fifty Seven Thousand Rupees",
      bookValue: "8,69,000",
      bookValueWords: "Eight Lacs Sixty Nine Thousand Rupees",
      distressValue: "36,45,600",
      distressValueWords: "Thirty Six Lacs Forty Five Thousand Six Hundred Rupees",
      realisableValue: "41,01,300",
      realisableValueWords: "Forty One Lacs One Thousand Three Hundred Rupees",

      purposeOfValuation: "For Bank Loan / Mortgage Purpose",
      dateOfInspection: "12-05-2026",
      dateOfValuation: "15-05-2026",

      doc1Description: "Sale Deed",
      doc1No: "1318/2003",
      doc1Date: "27-09-2003",
      doc1Copy: "Copy",
      doc2Description: "Building Permission - Metpally Municipality",
      doc2No: "G1/25/636/2007",
      doc2Date: "02-06-2007",
      doc2Copy: "Copy",
      doc3Description: "Municipal Property Tax",
      doc3No: "1130007404",
      doc3Date: "31-03-2026",
      doc3Copy: "Copy",

      briefDescription:
        "The Property is Ground Floor and First Floor Building over H.No. H.No. 2-1-205/B, NA, Vivekananda Road, Dubba Wada, Metpally Village, Metpally Municipality, Jagityal District 505325. Land Mark Sai Ram Medical Lane with total site area of 126.52 Sq.Yds Belongs to Applicant : Smt. Pottavarthini Radha, W/o Rajesham",

      locHNo: "H.No. 2-1-205/B",
      locNagar: "NA",
      locSFNo: "Vivekananda Road, Dubba Wada",
      locVillage: "Metpally",
      locTaluk: "Jagityal",
      locMandal: "505325",

      residentialArea: "Residential Zone as per Master Plan",
      commercialArea: "",
      industrialArea: "",
      classificationHighMiddlePoor: "Middle",
      urbanSemiUrbanRural: "Semi Urban",
      corporationVillageMunicipality: "Municipality",

      localityClassification: "Residential Zone as per Master Plan",
      surroundingDevelopment: "Surrounding area is well developed with paved roads, houses, and shops.",
      flooding: "No history of flooding; land level is higher than adjoining road.",
      civicAmenities: "All major civic amenities are available within 1 km radius.",
      landLevel: "Land is level and matches surrounding ground.",
      shapeOfLand: "Regular rectangular plot.",
      typeOfUse: "Suitable for residential construction.",
      usageRestriction: "Subject to residential use only.",
      townPlanningApproved: "Yes, within approved layout as per local authority.",
      cornerOrIntermittent: "Intermittent plot with single road frontage.",
      roadFacilities: "Public Road",
      typeOfRoad: "CC Road",
      widthOfRoad: "Below 20 Ft Wide",
      landLocked: "No, plot has direct road access.",
      waterPotentiality: "Borewell / open well source available.",
      undergroundSewerage: "Septic tank system in use; no underground network.",
      powerSupply: "Power supply available through local electricity board.",
      advantagesOfSite: "All amenities are within walkable distance, it is fully developed residential area",
      generalRemarks:
        "The site is Road Widening affected and net area is only considered for Plot Valuation. The Actual Building is Ground, First and Pent house, However the Building Permission has been submitted only for Ground Floor as per the documents submitted, hence only Ground Floor is considered for valuation of the building",

      northDeedDim: "37'0\"",
      southDeedDim: "37'0\"",
      eastDeedDim: "43'9\"",
      westDeedDim: "43'9\"",
      northActualDim: "37'0\" (-11' Road Widening) 28' only",
      southActualDim: "37'0\" (-11' Road Widening) 28' only",
      eastActualDim: "43'9\"",
      westActualDim: "43'9\"",

      northBoundaryDeed: "H No. 2-1-206 of Khaza Mohd Shariuddin",
      southBoundaryDeed: "H.No. 2-1-205/A of Chityala Narasaiah",
      eastBoundaryDeed: "18' Wide Road",
      westBoundaryDeed: "H.No. 2-1-191 of Janardhan",
      northBoundaryActual: "H No. 2-1-206 of Khaza Mohd Shariuddin",
      southBoundaryActual: "H.No. 2-1-205/A of Chityala Narasaiah",
      eastBoundaryActual: "H.No. 2-1-191 of Janardhan",
      westBoundaryActual: "H.No. 2-1-191 of Janardhan",

      latitude: "18.851065",
      longitude: "78.621209",

      extentAsPerDeed: "180.00",
      extentForValuation: "126.52",
      occupiedBy: "Rs.8,000 Per month",

      guidelineRate: "3,800",
      landValueGLR: "4,80,776",
      prevailingMarketRateRange: "Rs.17000 to Rs.19000",
      unitRatePMR: "17,000",
      landValuePMR: "21,50,840",

      portico: "",
      ornamentalDoor: "35,000",
      sitOutVerandah: "8,000",
      overheadWaterTank: "40,000",
      extraGates: "",
      extraItemsTotal: "83,000",

      wardrobes: "",
      glazedTiles: "15,000",
      extraSinksBathtub: "",
      marbleCeramicTiles: "",
      interiorDecorations: "60,000",
      architecturalElevation: "90,000",
      panellingWorks: "35,000",
      aluminiumWorks: "",
      aluminiumHandRails: "",
      falseCeilingArea: "620",
      falseCeilingRate: "120",
      falseCeilingValue: "74,400",
      amenitiesTotal: "2,74,400",

      separateLumberRoom: "",
      separateToiletRoom: "45,000",
      separateWaterTank: "40,000",
      treesGardening: "",
      miscTotal: "85,000",

      openWell: "40,000",
      deepBore: "90,000",
      handPump: "",
      motor: "20,000",
      corporationTap: "",
      underGroundSump: "",
      overheadTankServices: "30,000",
      septicTank: "50,000",
      undergroundSewage: "",
      compoundWallRft: "143.5",
      compoundWallRate: "1,500",
      compoundWallHeight: "4'6\"",
      compoundWallLength: "143.5 ft",
      compoundWallType: "Brick Masonary with Cement Motor plaster",
      compoundWallValue: "2,15,250",
      pavementsSqft: "100",
      pavementsRate: "300",
      pavementsValue: "30,000",
      servicesTotal: "4,75,250",

      typeOfBuilding: "Independent residential house (single-family dwelling)",
      typeOfConstruction: "RCC framed structure with brick walls and reinforced concrete roof.",
      qualityOfConstruction: "Average quality construction using standard materials",
      appearanceOfBuilding: "Functional and presentable appearance suitable for the locality.",
      yearOfConstruction: "2007",
      ageOfBuilding: "19",
      expectedFutureLife: "61",
      totalLifeOfBuilding: "80",
      numberOfFloorsHeight: "Ground Floor and First Floor Building, Roof Height = 11' each floor",
      maintenanceExterior: "Fairly maintained; minor repairs required",
      maintenanceInterior: "Fairly maintained; minor repairs required",
      drawingApprovalDate: "Copy of layout approval not furnished; hence validity could not be verified.",
      approvedMapAuthority:
        "As per copy produced, approval is issued by Municipal Corporation / Town Planning Department / Gram Panchayat / DTCP, etc.",
      genuinenessVerified: "Verified based on the stamped/signed copy furnished by the client.",
      anyOtherComments:
        "Approval document appears in order and consistent with the property layout observed at site.",

      specFoundation:
        "Random rubble masonry foundation in cement mortar below plinth level; standard PCC bed.",
      specBasement:
        "Vitrified tiles flooring in all rooms; anti-skid ceramic tiles in toilets and balconies.",
      specSuperStructure:
        "Brick masonry walls in cement mortar (1:6) for superstructure. 9\" Thick for External and 4\" Thick for Internal Walls",
      specJoinery:
        "Doors: Wooden frames with laminated flush shutters. Windows: Steel casement type with glazing and MS grill protection. Timber: Teak / country wood used for frames.",
      specRCCWorks:
        "RCC works carried out with M20 grade concrete using tor steel reinforcement as per structural design.",
      specPlastering:
        "Single coat 12mm thick cement plaster in 1:6 (Cement : Sand) proportion for internal and external walls; no finishing coat.",
      specFlooring:
        "Vitrified tiles flooring in all rooms; anti-skid ceramic tiles in toilets and balconies.",
      specSpecialFinish: "",
      specRoofing: "Reinforced Cement Concrete (RCC) flat roof with weathering course.",
      specDrainage: "NA",

      compWallBuildingRft: "143.5",
      compWallBuildingRate: "1,200",
      compWallBuildingHeight: "4'6\"",
      compWallBuildingLength: "143.5 ft",
      compWallBuildingType: "Brick Masonary with Cement Motor plaster",

      typeOfWiring: "Concealed PVC wiring in rigid conduit",
      classOfFittings: "Superior – Modular switches (Anchor, Havells, GM, etc.) with concealed",
      numberOfLightPoints: "Moderate – 1 per 80–100 sq.ft.",
      fanPoints: "One per habitable room",
      sparePlugPoints: "Limited – Only one per room",
      anyOtherElectrical: "Exhaust fans / Geyser points in kitchen & toilets",

      waterClosets: "Attached full bathroom & toilets",
      washBasins: "Available",
      urinals: "NA",
      bathTubs: "NA",
      waterMeters: "NA",
      anyOtherPlumbing: "",

      groundFloorYear: "2007",
      groundFloorMainArea: "946",
      groundFloorCantArea: "0",
      groundFloorTotal: "946.375",

      groundFloorPlinthArea: "946",
      groundFloorRate: "2000",
      groundFloorAge: "19",
      groundFloorReplacementCost: "18,92,750",
      groundFloorDepreciation: "4,04,575",
      groundFloorNetValue: "14,88,175",
      buildingTotal: "14,88,175",

      electricalLumpsum: "74,409",
      plumbingLumpsum: "74,409",

      landGLR: "17,000",
      landPMR: "21,50,840",
      buildingGLR: "8,51,738",
      buildingPMR: "14,88,175",
      extraItemsAbstract: "83,000",
      amenitiesAbstract: "2,74,400",
      miscAbstract: "85,000",
      servicesAbstract: "4,75,250",
      totalGLR: "8,68,738",
      totalPMR: "45,56,665",
      presentMarketValue: "45,57,000",

      titleDeedNo: "1318/2003",
      titleDeedDate: "27-09-2003",

      appointmentDate: "11-05-2026",
      valuationDate: "15-05-2026",
      reportDate: "15-05-2026",
      inspectionDate: "12-05-2026",

      place: "Armoor",
      reportDate2: "15-05-2026",
    } as FormData,
  });

  // Extract only the active template's data for the UI
  const formData = allFormData[selectedTemplate] || {};

  // ─── UPGRADED HANDLE CHANGE (AUTO-CONVERTS NUMBERS TO WORDS) ───
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    setAllFormData((prev) => {
      // 1. Get the current template's data and update the field the user just typed in
      const currentData = prev[selectedTemplate];
      const updatedData = { ...currentData, [name]: value };

      // 2. INTERCEPT NUMERIC FIELDS for building_valuation
      if (selectedTemplate === 'building_valuation') {
        const numericFieldsMap: Record<string, string> = {
          fairMarketValue: 'fairMarketValueWords',
          bookValue: 'bookValueWords',
          distressValue: 'distressValueWords',
          realisableValue: 'realisableValueWords'
        };

        // If the field name matches one of our targets, auto-calculate the words!
        if (numericFieldsMap[name]) {
          const wordsFieldName = numericFieldsMap[name];
          updatedData[wordsFieldName] = spellNumberIndian(value);
        }
      }

      // 3. Return the fully updated state
      return {
        ...prev,
        [selectedTemplate]: updatedData,
      };
    });
  };
  // ───────────────────────────────────────────────────────────────

  // Also exposing a setFormData function just in case we need to update state directly
  const setFormData = (newData: Partial<FormData>) => {
    setAllFormData((prev) => ({
      ...prev,
      [selectedTemplate]: {
        ...prev[selectedTemplate],
        ...newData,
      },
    }));
  };

  // Submit ONLY the isolated data for the active template
  const handleSubmitToBackend = async () => {
    const dataToSave = allFormData[selectedTemplate];
    console.log(`Saved ${selectedTemplate} to Backend:`, dataToSave);
  };

  return {
    zoom, setZoom,
    selectedTemplate, setSelectedTemplate,
    editMode, setEditMode,
    documentRef,
    formData, setFormData,
    handleChange,
    handleSubmitToBackend
  };
}