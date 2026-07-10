// import { FormData } from '@/app/(Drafter)/types/types';

// export const mapSVDataToTemplate = (svData: any, templateId: string): Partial<FormData> => {
//   if (!svData) return {};

//   if (templateId === 'building_valuation') {
//     // Safely extract the first floor to use for generic building specs
//     const primaryFloor = svData.floors && svData.floors.length > 0 ? svData.floors[0] : null;
    
//     // Combine phones safely
//     const phoneList = [svData.owner?.phone1, svData.owner?.phone2]
//       .filter(p => p && p.trim() !== '')
//       .join(', ');

//     return {
//       // 1. Basic Info & Bank
//       branch: svData.clientBank?.branch || '',
//       toName: `Branch Manager: ${svData.clientBank?.bankName || ''}`,
//       dateOfInspection: svData.clientBank?.dateOfInspection || '',
//       dateOfValuation: svData.clientBank?.dateOfValuation || '',
//       purposeOfValuation: svData.clientBank?.purposeOfValuation || '',

//       // 2. Owner Details
//       ownerName: `${svData.owner?.prefix || ''} ${svData.owner?.ownerName || ''}`.trim(),
//       ownerRelation: svData.owner?.relation || '',
//       ownerRelationName: svData.owner?.relationName || '',
//       ownerPhone: phoneList,

//       // 3. Property & Location
//       propertyType: svData.clientBank?.propertyType || '',
//       propertyDescription: `${svData.property?.natureOfProperty || 'Property'} with ${svData.locality?.noOfStories || '0'} stories`,
//       hNo: svData.property?.address || '',
//       road: svData.property?.address || '',
//       urbanSemiUrbanRural: svData.locality?.urbanRural || '',
//       classificationHighMiddlePoor: svData.locality?.localityClass || '',
//       widthOfRoad: svData.property?.widthOfRoad || '',

//       // 4. Coordinates & Area (Mapped with Units!)
//       latitude: svData.property?.latitude || '',
//       longitude: svData.property?.longitude || '',
//       extentSqYds: svData.property?.calculatedArea 
//         ? `${svData.property.calculatedArea} ${svData.property.conversionUnit || ''}`.trim() 
//         : '',
//       extentForValuation: svData.property?.calculatedArea 
//         ? `${svData.property.calculatedArea} ${svData.property.conversionUnit || ''}`.trim() 
//         : '',

//       // 5. Boundaries (Deed vs Actual) (Mapped with Units!)
//       northDeedDim: svData.boundaries?.northDeedDim ? `${svData.boundaries.northDeedDim} ${svData.boundaries.unit || ''}`.trim() : '',
//       southDeedDim: svData.boundaries?.southDeedDim ? `${svData.boundaries.southDeedDim} ${svData.boundaries.unit || ''}`.trim() : '',
//       eastDeedDim: svData.boundaries?.eastDeedDim ? `${svData.boundaries.eastDeedDim} ${svData.boundaries.unit || ''}`.trim() : '',
//       westDeedDim: svData.boundaries?.westDeedDim ? `${svData.boundaries.westDeedDim} ${svData.boundaries.unit || ''}`.trim() : '',
      
//       northActualDim: svData.boundaries?.northActualDim ? `${svData.boundaries.northActualDim} ${svData.boundaries.unit || ''}`.trim() : '',
//       southActualDim: svData.boundaries?.southActualDim ? `${svData.boundaries.southActualDim} ${svData.boundaries.unit || ''}`.trim() : '',
//       eastActualDim: svData.boundaries?.eastActualDim ? `${svData.boundaries.eastActualDim} ${svData.boundaries.unit || ''}`.trim() : '',
//       westActualDim: svData.boundaries?.westActualDim ? `${svData.boundaries.westActualDim} ${svData.boundaries.unit || ''}`.trim() : '',

//       // Textual Boundaries
//       northBoundaryDeed: svData.boundaries?.northBoundaryDeed ?  `${svData.boundaries.northBoundaryDeed  }`.trim() :'' ,
//       southBoundaryDeed: svData.boundaries?.southBoundaryDeed || '',
//       eastBoundaryDeed: svData.boundaries?.eastBoundaryDeed || '',
//       westBoundaryDeed: svData.boundaries?.westBoundaryDeed || '',

//       northBoundaryActual: svData.boundaries?.northBoundaryActual || '',
//       southBoundaryActual: svData.boundaries?.southBoundaryActual || '',
//       eastBoundaryActual: svData.boundaries?.eastBoundaryActual || '',
//       westBoundaryActual: svData.boundaries?.westBoundaryActual || '',

//       // 6. Building Specs
//       typeOfBuilding: `${svData.locality?.noOfStories || '0'} Stories (${svData.property?.natureOfProperty || 'Unknown'})`,
//       yearOfConstruction: svData.market?.yearOfConstruction || '',
      
//       // Pulling from the first floor array as the default baseline
//       typeOfConstruction: primaryFloor?.structure || '',
//       specFlooring: primaryFloor?.flooring || '',
//       qualityOfConstruction: primaryFloor?.condition || '',
//       specJoinery: primaryFloor?.doorsWindows || '',
//       uploads : svData.uploads ,
//       // 7. General / Miscellaneous
//       generalRemarks: svData.negativePoints && svData.negativePoints.length > 0 
//         ? `Negative points noted: ${svData.negativePoints.join(', ')}` 
//         : '',
        
//     };
//   }

//   return {};
// };
import { FormData } from '@/app/(Drafter)/types/types';

// Helper to extract a clean filename from a Firebase/URL string
const extractFileName = (url: string) => {
  try {
    const decoded = decodeURIComponent(url.split('?')[0]);
    const fullFileName = decoded.split('/').pop() || 'Document';
    const parts = fullFileName.split('_');
    if (parts.length > 1 && !isNaN(Number(parts[0]))) {
      return parts.slice(1).join('_');
    }
    return fullFileName;
  } catch (e) {
    return 'Document';
  }
};

export const mapSVDataToTemplate = (svData: any, templateId: string): Partial<FormData> => {
  if (!svData) return {};

  if (templateId === 'building_valuation') {
    const primaryFloor = svData.floors && svData.floors.length > 0 ? svData.floors[0] : null;
    
    const phoneList = [svData.owner?.phone1, svData.owner?.phone2]
      .filter(p => p && p.trim() !== '')
      .join(', ');

    // 🟢 NEW: Map Documents dynamically
    const docs = svData.uploads?.documents || [];
    const doc1Desc = docs[0] ? extractFileName(docs[0]) : '';
    const doc2Desc = docs[1] ? extractFileName(docs[1]) : '';
    const doc3Desc = docs[2] ? extractFileName(docs[2]) : '';

    // 🟢 NEW: Map up to 10 Boundary Coordinates dynamically
    const coords = svData.property?.boundaryCoordinates || [];
    const mapCoords: any = {};
    coords.slice(0, 10).forEach((coord: any, index: number) => {
      mapCoords[`mapLat${index + 1}`] = String(coord.lat || '');
      mapCoords[`mapLng${index + 1}`] = String(coord.lng || '');
    });

    return {
      // 1. Basic Info & Bank
      branch: svData.clientBank?.branch || '',
      toName: `Branch Manager: ${svData.clientBank?.bankName || ''}`,
      dateOfInspection: svData.clientBank?.dateOfInspection || '',
      dateOfValuation: svData.clientBank?.dateOfValuation || '',
      purposeOfValuation: svData.clientBank?.purposeOfValuation || '',

      // 2. Owner Details
      ownerName: `${svData.owner?.prefix || ''} ${svData.owner?.ownerName || ''}`.trim(),
      ownerRelation: svData.owner?.relation || '',
      ownerRelationName: svData.owner?.relationName || '',
      ownerPhone: phoneList,

      // 3. Property & Location
      propertyType: svData.clientBank?.propertyType || '',
      propertyDescription: `${svData.property?.natureOfProperty || 'Property'} with ${svData.locality?.noOfStories || '0'} stories`,
      hNo: svData.property?.address || '',
      road: svData.property?.address || '',
      urbanSemiUrbanRural: svData.locality?.urbanRural || '',
      classificationHighMiddlePoor: svData.locality?.localityClass || '',
      widthOfRoad: svData.property?.widthOfRoad || '',

      // 4. Coordinates & Area
      latitude: svData.property?.latitude || '',
      longitude: svData.property?.longitude || '',
      extentSqYds: svData.property?.calculatedArea 
        ? `${svData.property.calculatedArea} ${svData.property.conversionUnit || ''}`.trim() 
        : '',
      extentForValuation: svData.property?.calculatedArea 
        ? `${svData.property.calculatedArea} ${svData.property.conversionUnit || ''}`.trim() 
        : '',

      // 5. Boundaries (Deed vs Actual)
      northDeedDim: svData.boundaries?.northDeedDim ? `${svData.boundaries.northDeedDim} ${svData.boundaries.unit || ''}`.trim() : '',
      southDeedDim: svData.boundaries?.southDeedDim ? `${svData.boundaries.southDeedDim} ${svData.boundaries.unit || ''}`.trim() : '',
      eastDeedDim: svData.boundaries?.eastDeedDim ? `${svData.boundaries.eastDeedDim} ${svData.boundaries.unit || ''}`.trim() : '',
      westDeedDim: svData.boundaries?.westDeedDim ? `${svData.boundaries.westDeedDim} ${svData.boundaries.unit || ''}`.trim() : '',
      
      northActualDim: svData.boundaries?.northActualDim ? `${svData.boundaries.northActualDim} ${svData.boundaries.unit || ''}`.trim() : '',
      southActualDim: svData.boundaries?.southActualDim ? `${svData.boundaries.southActualDim} ${svData.boundaries.unit || ''}`.trim() : '',
      eastActualDim: svData.boundaries?.eastActualDim ? `${svData.boundaries.eastActualDim} ${svData.boundaries.unit || ''}`.trim() : '',
      westActualDim: svData.boundaries?.westActualDim ? `${svData.boundaries.westActualDim} ${svData.boundaries.unit || ''}`.trim() : '',

      northBoundaryDeed: svData.boundaries?.northBoundaryDeed ?  `${svData.boundaries.northBoundaryDeed}`.trim() :'' ,
      southBoundaryDeed: svData.boundaries?.southBoundaryDeed || '',
      eastBoundaryDeed: svData.boundaries?.eastBoundaryDeed || '',
      westBoundaryDeed: svData.boundaries?.westBoundaryDeed || '',

      northBoundaryActual: svData.boundaries?.northBoundaryActual || '',
      southBoundaryActual: svData.boundaries?.southBoundaryActual || '',
      eastBoundaryActual: svData.boundaries?.eastBoundaryActual || '',
      westBoundaryActual: svData.boundaries?.westBoundaryActual || '',

      // 6. Building Specs
      typeOfBuilding: `${svData.locality?.noOfStories || '0'} Stories (${svData.property?.natureOfProperty || 'Unknown'})`,
      yearOfConstruction: svData.market?.yearOfConstruction || '',
      typeOfConstruction: primaryFloor?.structure || '',
      specFlooring: primaryFloor?.flooring || '',
      qualityOfConstruction: primaryFloor?.condition || '',
      specJoinery: primaryFloor?.doorsWindows || '',
      
      // 7. General / Miscellaneous
      generalRemarks: svData.negativePoints && svData.negativePoints.length > 0 
        ? `Negative points noted: ${svData.negativePoints.join(', ')}` 
        : '',
        
      // 🟢 Mapped Documents
      doc1Description: doc1Desc,
      doc2Description: doc2Desc,
      doc3Description: doc3Desc,

      // 🟢 Spread mapped coordinates (mapLat1, mapLng1, etc.)
      ...mapCoords
    };
  }

  return {};
};