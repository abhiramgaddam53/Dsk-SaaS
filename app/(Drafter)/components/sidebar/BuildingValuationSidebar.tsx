// import React from "react";
// import { InputField } from "../shared/FormFields";
 
// import{ FormData }from '@/app/(Drafter)/types/types';


// interface Props {
//   formData: FormData;
//   handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
// }

// function SectionHeader({ label }: { label: string }) {
//   return (
//     <div className="flex items-center gap-2 mb-3">
//       <div className="w-3.5 h-3.5 bg-[#00a0ef] rounded-[2px]" />
//       <h3 className="text-[12px] font-semibold text-gray-800">{label}</h3>
//     </div>
//   );
// }

// function SubLabel({ label }: { label: string }) {
//   return (
//     <p className="text-[10px] font-bold text-gray-500 mb-2 uppercase tracking-wide">{label}</p>
//   );
// }

// function TextArea({
//   label,
//   name,
//   value,
//   onChange,
//   rows = 2,
// }: {
//   label: string;
//   name: string;
//   value: string;
//   onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
//   rows?: number;
// }) {
//   return (
//     <div className="mb-1">
//       <label className="block text-[10px] font-semibold text-gray-500 uppercase mb-1">{label}</label>
//       <textarea
//         name={name}
//         value={value}
//         onChange={onChange}
//         rows={rows}
//         className="w-full px-2 py-1.5 border border-gray-300 rounded text-[12px] text-gray-800 focus:outline-none focus:border-[#00a0ef] focus:ring-1 focus:ring-[#00a0ef] resize-none transition-colors"
//       />
//     </div>
//   );
// }

// export default function BuildingValuationSidebar({ formData, handleChange }: Props) {
//   return (
//     <div className="flex-1 overflow-y-auto p-4 scrollbar-thin">

//       {/* ── BASIC INFO ── */}
//       <div className="mb-6">
//         <SectionHeader label="Basic Info" />
//         <div className="grid grid-cols-2 gap-2 pl-5">
//           <InputField label="To (Name)" name="toName" value={formData.toName} onChange={handleChange} />
//           <InputField label="Branch" name="branch" value={formData.branch} onChange={handleChange} />
//           <InputField label="Date" name="date" value={formData.date} onChange={handleChange} />
//         </div>
//       </div>

//       {/* ── OWNER DETAILS ── */}
//       <div className="mb-6">
//         <SectionHeader label="Owner Details" />
//         <div className="grid grid-cols-2 gap-2 pl-5">
//           <InputField label="Owner Name" name="ownerName" value={formData.ownerName} onChange={handleChange} />
//           <InputField label="Relation (W/o, S/o)" name="ownerRelation" value={formData.ownerRelation} onChange={handleChange} />
//           <InputField label="Relation Name" name="ownerRelationName" value={formData.ownerRelationName} onChange={handleChange} />
//           <InputField label="Phone" name="ownerPhone" value={formData.ownerPhone} onChange={handleChange} />
//         </div>
//       </div>

//       {/* ── PROPERTY TYPE ── */}
//       <div className="mb-6">
//         <SectionHeader label="Property Type" />
//         <div className="pl-5">
//           <InputField label="Type" name="propertyType" value={formData.propertyType} onChange={handleChange} />
//           <InputField label="Description" name="propertyDescription" value={formData.propertyDescription} onChange={handleChange} />
//         </div>
//       </div>

//       {/* ── LOCATION ── */}
//       <div className="mb-6">
//         <SectionHeader label="Location Details" />
//         <div className="grid grid-cols-2 gap-2 pl-5">
//           <InputField label="H.No" name="hNo" value={formData.hNo} onChange={handleChange} />
//           <InputField label="Sy.No / Nagar" name="syNo" value={formData.syNo} onChange={handleChange} />
//           <InputField label="Road / Area" name="road" value={formData.road} onChange={handleChange} />
//           <InputField label="City / Mandal" name="city" value={formData.city} onChange={handleChange} />
//           <InputField label="District" name="district" value={formData.district} onChange={handleChange} />
//           <InputField label="Pin Code" name="pinCode" value={formData.pinCode} onChange={handleChange} />
//           <InputField label="Landmark" name="landmark" value={formData.landmark} onChange={handleChange} />
//         </div>
//       </div>

//       {/* ── SITE EXTENT ── */}
//       <div className="mb-6">
//         <SectionHeader label="Site Extent" />
//         <div className="grid grid-cols-2 gap-2 pl-5">
//           <InputField label="Extent (Sq.Yds)" name="extentSqYds" value={formData.extentSqYds} onChange={handleChange} />
//           <InputField label="Rate (Rs/Sq.Yd)" name="landRatePerSqYd" value={formData.landRatePerSqYd} onChange={handleChange} />
//           <InputField label="Extent as per Deed" name="extentAsPerDeed" value={formData.extentAsPerDeed} onChange={handleChange} />
//           <InputField label="Extent for Valuation" name="extentForValuation" value={formData.extentForValuation} onChange={handleChange} />
//           <InputField label="Latitude" name="latitude" value={formData.latitude} onChange={handleChange} />
//           <InputField label="Longitude" name="longitude" value={formData.longitude} onChange={handleChange} />
//           <InputField label="Occupied By / Rent" name="occupiedBy" value={formData.occupiedBy} onChange={handleChange} />
//         </div>
//       </div>

//       {/* ── SUMMARY VALUES ── */}
//       <div className="mb-6">
//         <SectionHeader label="Valuation Summary" />
//         <div className="pl-5">
//           <InputField label="Fair Market Value (Rs)" name="fairMarketValue" value={formData.fairMarketValue} onChange={handleChange} />
//           <TextArea label="In Words" name="fairMarketValueWords" value={formData.fairMarketValueWords} onChange={handleChange} rows={1} />
//           <InputField label="Book / Govt Value (Rs)" name="bookValue" value={formData.bookValue} onChange={handleChange} />
//           <TextArea label="In Words" name="bookValueWords" value={formData.bookValueWords} onChange={handleChange} rows={1} />
//           <InputField label="Distress Value (Rs)" name="distressValue" value={formData.distressValue} onChange={handleChange} />
//           <TextArea label="In Words" name="distressValueWords" value={formData.distressValueWords} onChange={handleChange} rows={1} />
//           <InputField label="Realisable Value (Rs)" name="realisableValue" value={formData.realisableValue} onChange={handleChange} />
//           <TextArea label="In Words" name="realisableValueWords" value={formData.realisableValueWords} onChange={handleChange} rows={1} />
//         </div>
//       </div>

//       {/* ── PART A: GENERAL ── */}
//       <div className="mb-6">
//         <SectionHeader label="Part A – General" />
//         <div className="grid grid-cols-2 gap-2 pl-5">
//           <InputField label="Purpose of Valuation" name="purposeOfValuation" value={formData.purposeOfValuation} onChange={handleChange} />
//           <InputField label="Date of Inspection" name="dateOfInspection" value={formData.dateOfInspection} onChange={handleChange} />
//           <InputField label="Date of Valuation" name="dateOfValuation" value={formData.dateOfValuation} onChange={handleChange} />
//         </div>
//       </div>

//       {/* ── DOCUMENTS ── */}
//       <div className="mb-6">
//         <SectionHeader label="Documents Produced" />
//         <div className="pl-5">
//           <SubLabel label="Document 1" />
//           <div className="grid grid-cols-2 gap-2">
//             <InputField label="Description" name="doc1Description" value={formData.doc1Description} onChange={handleChange} />
//             <InputField label="Doc No" name="doc1No" value={formData.doc1No} onChange={handleChange} />
//             <InputField label="Date" name="doc1Date" value={formData.doc1Date} onChange={handleChange} />
//             <InputField label="Original/Copy" name="doc1Copy" value={formData.doc1Copy} onChange={handleChange} />
//           </div>
//           <SubLabel label="Document 2" />
//           <div className="grid grid-cols-2 gap-2">
//             <InputField label="Description" name="doc2Description" value={formData.doc2Description} onChange={handleChange} />
//             <InputField label="Doc No" name="doc2No" value={formData.doc2No} onChange={handleChange} />
//             <InputField label="Date" name="doc2Date" value={formData.doc2Date} onChange={handleChange} />
//             <InputField label="Original/Copy" name="doc2Copy" value={formData.doc2Copy} onChange={handleChange} />
//           </div>
//           <SubLabel label="Document 3" />
//           <div className="grid grid-cols-2 gap-2">
//             <InputField label="Description" name="doc3Description" value={formData.doc3Description} onChange={handleChange} />
//             <InputField label="Doc No" name="doc3No" value={formData.doc3No} onChange={handleChange} />
//             <InputField label="Date" name="doc3Date" value={formData.doc3Date} onChange={handleChange} />
//             <InputField label="Original/Copy" name="doc3Copy" value={formData.doc3Copy} onChange={handleChange} />
//           </div>
//         </div>
//       </div>

//       {/* ── BRIEF DESCRIPTION ── */}
//       <div className="mb-6">
//         <SectionHeader label="Brief Description" />
//         <div className="pl-5">
//           <TextArea label="Description" name="briefDescription" value={formData.briefDescription} onChange={handleChange} rows={3} />
//         </div>
//       </div>

//       {/* ── CLASSIFICATION ── */}
//       <div className="mb-6">
//         <SectionHeader label="Area Classification" />
//         <div className="grid grid-cols-2 gap-2 pl-5">
//           <InputField label="Residential Area" name="residentialArea" value={formData.residentialArea} onChange={handleChange} />
//           <InputField label="High/Middle/Poor" name="classificationHighMiddlePoor" value={formData.classificationHighMiddlePoor} onChange={handleChange} />
//           <InputField label="Urban/Semi/Rural" name="urbanSemiUrbanRural" value={formData.urbanSemiUrbanRural} onChange={handleChange} />
//           <InputField label="Corporation/Municipality" name="corporationVillageMunicipality" value={formData.corporationVillageMunicipality} onChange={handleChange} />
//         </div>
//       </div>

//       {/* ── SITE CHARACTERISTICS ── */}
//       <div className="mb-6">
//         <SectionHeader label="Site Characteristics" />
//         <div className="pl-5">
//           <div className="grid grid-cols-2 gap-2">
//             <InputField label="Locality Classification" name="localityClassification" value={formData.localityClassification} onChange={handleChange} />
//             <InputField label="Shape of Land" name="shapeOfLand" value={formData.shapeOfLand} onChange={handleChange} />
//             <InputField label="Type of Use" name="typeOfUse" value={formData.typeOfUse} onChange={handleChange} />
//             <InputField label="Usage Restriction" name="usageRestriction" value={formData.usageRestriction} onChange={handleChange} />
//             <InputField label="Town Planning Approved" name="townPlanningApproved" value={formData.townPlanningApproved} onChange={handleChange} />
//             <InputField label="Corner/Intermittent" name="cornerOrIntermittent" value={formData.cornerOrIntermittent} onChange={handleChange} />
//             <InputField label="Road Facilities" name="roadFacilities" value={formData.roadFacilities} onChange={handleChange} />
//             <InputField label="Type of Road" name="typeOfRoad" value={formData.typeOfRoad} onChange={handleChange} />
//             <InputField label="Width of Road" name="widthOfRoad" value={formData.widthOfRoad} onChange={handleChange} />
//             <InputField label="Land Locked" name="landLocked" value={formData.landLocked} onChange={handleChange} />
//             <InputField label="Water Potentiality" name="waterPotentiality" value={formData.waterPotentiality} onChange={handleChange} />
//             <InputField label="Sewerage" name="undergroundSewerage" value={formData.undergroundSewerage} onChange={handleChange} />
//             <InputField label="Power Supply" name="powerSupply" value={formData.powerSupply} onChange={handleChange} />
//             <InputField label="Flooding" name="flooding" value={formData.flooding} onChange={handleChange} />
//           </div>
//           <TextArea label="Civic Amenities" name="civicAmenities" value={formData.civicAmenities} onChange={handleChange} rows={1} />
//           <TextArea label="Surrounding Development" name="surroundingDevelopment" value={formData.surroundingDevelopment} onChange={handleChange} rows={2} />
//           <TextArea label="Advantages of Site" name="advantagesOfSite" value={formData.advantagesOfSite} onChange={handleChange} rows={1} />
//           <TextArea label="General Remarks" name="generalRemarks" value={formData.generalRemarks} onChange={handleChange} rows={3} />
//         </div>
//       </div>

//       {/* ── BOUNDARIES ── */}
//       <div className="mb-6">
//         <SectionHeader label="Boundaries of Property" />
//         <div className="pl-5">
//           <SubLabel label="As per Deed" />
//           <div className="grid grid-cols-2 gap-2">
//             <InputField label="North" name="northBoundaryDeed" value={formData.northBoundaryDeed} onChange={handleChange} />
//             <InputField label="South" name="southBoundaryDeed" value={formData.southBoundaryDeed} onChange={handleChange} />
//             <InputField label="East" name="eastBoundaryDeed" value={formData.eastBoundaryDeed} onChange={handleChange} />
//             <InputField label="West" name="westBoundaryDeed" value={formData.westBoundaryDeed} onChange={handleChange} />
//           </div>
//           <SubLabel label="As per Actuals" />
//           <div className="grid grid-cols-2 gap-2">
//             <InputField label="North" name="northBoundaryActual" value={formData.northBoundaryActual} onChange={handleChange} />
//             <InputField label="South" name="southBoundaryActual" value={formData.southBoundaryActual} onChange={handleChange} />
//             <InputField label="East" name="eastBoundaryActual" value={formData.eastBoundaryActual} onChange={handleChange} />
//             <InputField label="West" name="westBoundaryActual" value={formData.westBoundaryActual} onChange={handleChange} />
//           </div>
//         </div>
//       </div>

//       {/* ── DIMENSIONS ── */}
//       <div className="mb-6">
//         <SectionHeader label="Dimensions of Site" />
//         <div className="pl-5">
//           <SubLabel label="As per Title Deed" />
//           <div className="grid grid-cols-2 gap-2">
//             <InputField label="North" name="northDeedDim" value={formData.northDeedDim} onChange={handleChange} />
//             <InputField label="South" name="southDeedDim" value={formData.southDeedDim} onChange={handleChange} />
//             <InputField label="East" name="eastDeedDim" value={formData.eastDeedDim} onChange={handleChange} />
//             <InputField label="West" name="westDeedDim" value={formData.westDeedDim} onChange={handleChange} />
//           </div>
//           <SubLabel label="Actuals" />
//           <div className="grid grid-cols-2 gap-2">
//             <InputField label="North" name="northActualDim" value={formData.northActualDim} onChange={handleChange} />
//             <InputField label="South" name="southActualDim" value={formData.southActualDim} onChange={handleChange} />
//             <InputField label="East" name="eastActualDim" value={formData.eastActualDim} onChange={handleChange} />
//             <InputField label="West" name="westActualDim" value={formData.westActualDim} onChange={handleChange} />
//           </div>
//         </div>
//       </div>

//       {/* ── LAND VALUATION ── */}
//       <div className="mb-6">
//         <SectionHeader label="Land Valuation (Part A)" />
//         <div className="grid grid-cols-2 gap-2 pl-5">
//           <InputField label="Guideline Rate (Rs/Sq.Yd)" name="guidelineRate" value={formData.guidelineRate} onChange={handleChange} />
//           <InputField label="Land Value by GLR (Rs)" name="landValueGLR" value={formData.landValueGLR} onChange={handleChange} />
//           <InputField label="PMR Range" name="prevailingMarketRateRange" value={formData.prevailingMarketRateRange} onChange={handleChange} />
//           <InputField label="Unit Rate PMR (Rs)" name="unitRatePMR" value={formData.unitRatePMR} onChange={handleChange} />
//           <InputField label="Land Value by PMR (Rs)" name="landValuePMR" value={formData.landValuePMR} onChange={handleChange} />
//         </div>
//       </div>

//       {/* ── BUILDING TECHNICAL DETAILS ── */}
//       <div className="mb-6">
//         <SectionHeader label="Building Technical Details (Part B)" />
//         <div className="pl-5">
//           <div className="grid grid-cols-2 gap-2">
//             <InputField label="Type of Building" name="typeOfBuilding" value={formData.typeOfBuilding} onChange={handleChange} />
//             <InputField label="Year of Construction" name="yearOfConstruction" value={formData.yearOfConstruction} onChange={handleChange} />
//             <InputField label="Age of Building" name="ageOfBuilding" value={formData.ageOfBuilding} onChange={handleChange} />
//             <InputField label="Expected Future Life" name="expectedFutureLife" value={formData.expectedFutureLife} onChange={handleChange} />
//             <InputField label="Total Life" name="totalLifeOfBuilding" value={formData.totalLifeOfBuilding} onChange={handleChange} />
//           </div>
//           <TextArea label="Type of Construction" name="typeOfConstruction" value={formData.typeOfConstruction} onChange={handleChange} rows={1} />
//           <TextArea label="Quality of Construction" name="qualityOfConstruction" value={formData.qualityOfConstruction} onChange={handleChange} rows={1} />
//           <TextArea label="No. of Floors & Height" name="numberOfFloorsHeight" value={formData.numberOfFloorsHeight} onChange={handleChange} rows={1} />
//           <InputField label="Maintenance - Exterior" name="maintenanceExterior" value={formData.maintenanceExterior} onChange={handleChange} />
//           <InputField label="Maintenance - Interior" name="maintenanceInterior" value={formData.maintenanceInterior} onChange={handleChange} />
//           <TextArea label="Drawing Approval" name="drawingApprovalDate" value={formData.drawingApprovalDate} onChange={handleChange} rows={1} />
//           <TextArea label="Approved Map Authority" name="approvedMapAuthority" value={formData.approvedMapAuthority} onChange={handleChange} rows={2} />
//         </div>
//       </div>

//       {/* ── SPECIFICATIONS ── */}
//       <div className="mb-6">
//         <SectionHeader label="Specifications of Construction" />
//         <div className="pl-5">
//           <TextArea label="Foundation" name="specFoundation" value={formData.specFoundation} onChange={handleChange} rows={2} />
//           <TextArea label="Basement / Flooring" name="specBasement" value={formData.specBasement} onChange={handleChange} rows={1} />
//           <TextArea label="Super Structure" name="specSuperStructure" value={formData.specSuperStructure} onChange={handleChange} rows={2} />
//           <TextArea label="Joinery / Doors & Windows" name="specJoinery" value={formData.specJoinery} onChange={handleChange} rows={2} />
//           <TextArea label="RCC Works" name="specRCCWorks" value={formData.specRCCWorks} onChange={handleChange} rows={2} />
//           <TextArea label="Plastering" name="specPlastering" value={formData.specPlastering} onChange={handleChange} rows={2} />
//           <TextArea label="Flooring / Skirting" name="specFlooring" value={formData.specFlooring} onChange={handleChange} rows={1} />
//           <TextArea label="Roofing" name="specRoofing" value={formData.specRoofing} onChange={handleChange} rows={1} />
//           <InputField label="Drainage" name="specDrainage" value={formData.specDrainage} onChange={handleChange} />
//         </div>
//       </div>

//       {/* ── ELECTRICAL ── */}
//       <div className="mb-6">
//         <SectionHeader label="Electrical Installation" />
//         <div className="pl-5">
//           <InputField label="Type of Wiring" name="typeOfWiring" value={formData.typeOfWiring} onChange={handleChange} />
//           <InputField label="Class of Fittings" name="classOfFittings" value={formData.classOfFittings} onChange={handleChange} />
//           <InputField label="Light Points" name="numberOfLightPoints" value={formData.numberOfLightPoints} onChange={handleChange} />
//           <InputField label="Fan Points" name="fanPoints" value={formData.fanPoints} onChange={handleChange} />
//           <InputField label="Spare Plug Points" name="sparePlugPoints" value={formData.sparePlugPoints} onChange={handleChange} />
//           <InputField label="Any Other" name="anyOtherElectrical" value={formData.anyOtherElectrical} onChange={handleChange} />
//           <InputField label="Electrical Lumpsum (Rs)" name="electricalLumpsum" value={formData.electricalLumpsum} onChange={handleChange} />
//         </div>
//       </div>

//       {/* ── PLUMBING ── */}
//       <div className="mb-6">
//         <SectionHeader label="Plumbing Installation" />
//         <div className="pl-5">
//           <div className="grid grid-cols-2 gap-2">
//             <InputField label="Water Closets" name="waterClosets" value={formData.waterClosets} onChange={handleChange} />
//             <InputField label="Wash Basins" name="washBasins" value={formData.washBasins} onChange={handleChange} />
//             <InputField label="Urinals" name="urinals" value={formData.urinals} onChange={handleChange} />
//             <InputField label="Bath Tubs" name="bathTubs" value={formData.bathTubs} onChange={handleChange} />
//             <InputField label="Water Meters" name="waterMeters" value={formData.waterMeters} onChange={handleChange} />
//           </div>
//           <InputField label="Plumbing Lumpsum (Rs)" name="plumbingLumpsum" value={formData.plumbingLumpsum} onChange={handleChange} />
//         </div>
//       </div>

//       {/* ── BUILDING VALUATION ── */}
//       <div className="mb-6">
//         <SectionHeader label="Building Valuation Details" />
//         <div className="pl-5">
//           <SubLabel label="Ground Floor" />
//           <div className="grid grid-cols-2 gap-2">
//             <InputField label="Year" name="groundFloorYear" value={formData.groundFloorYear} onChange={handleChange} />
//             <InputField label="Main Area (Sq.ft)" name="groundFloorMainArea" value={formData.groundFloorMainArea} onChange={handleChange} />
//             <InputField label="Cantilever Area" name="groundFloorCantArea" value={formData.groundFloorCantArea} onChange={handleChange} />
//             <InputField label="Total Area" name="groundFloorTotal" value={formData.groundFloorTotal} onChange={handleChange} />
//             <InputField label="Rate (Rs/Sq.ft)" name="groundFloorRate" value={formData.groundFloorRate} onChange={handleChange} />
//             <InputField label="Replacement Cost (Rs)" name="groundFloorReplacementCost" value={formData.groundFloorReplacementCost} onChange={handleChange} />
//             <InputField label="Depreciation (Rs)" name="groundFloorDepreciation" value={formData.groundFloorDepreciation} onChange={handleChange} />
//             <InputField label="Net Value (Rs)" name="groundFloorNetValue" value={formData.groundFloorNetValue} onChange={handleChange} />
//           </div>
//           <InputField label="Building Total (Rs)" name="buildingTotal" value={formData.buildingTotal} onChange={handleChange} />
//         </div>
//       </div>

//       {/* ── COMPOUND WALL ── */}
//       <div className="mb-6">
//         <SectionHeader label="Compound Wall" />
//         <div className="grid grid-cols-2 gap-2 pl-5">
//           <InputField label="Length (R.ft)" name="compWallBuildingRft" value={formData.compWallBuildingRft} onChange={handleChange} />
//           <InputField label="Rate (Rs/rft)" name="compWallBuildingRate" value={formData.compWallBuildingRate} onChange={handleChange} />
//           <InputField label="Height" name="compWallBuildingHeight" value={formData.compWallBuildingHeight} onChange={handleChange} />
//           <InputField label="Type" name="compWallBuildingType" value={formData.compWallBuildingType} onChange={handleChange} />
//         </div>
//       </div>

//       {/* ── EXTRA ITEMS (PART C) ── */}
//       <div className="mb-6">
//         <SectionHeader label="Extra Items – Part C (Rs)" />
//         <div className="grid grid-cols-2 gap-2 pl-5">
//           <InputField label="Portico" name="portico" value={formData.portico} onChange={handleChange} />
//           <InputField label="Ornamental Door" name="ornamentalDoor" value={formData.ornamentalDoor} onChange={handleChange} />
//           <InputField label="Sit-out / Verandah" name="sitOutVerandah" value={formData.sitOutVerandah} onChange={handleChange} />
//           <InputField label="Overhead Water Tank" name="overheadWaterTank" value={formData.overheadWaterTank} onChange={handleChange} />
//           <InputField label="Extra Gates" name="extraGates" value={formData.extraGates} onChange={handleChange} />
//           <InputField label="Total Extra Items" name="extraItemsTotal" value={formData.extraItemsTotal} onChange={handleChange} />
//         </div>
//       </div>

//       {/* ── AMENITIES (PART D) ── */}
//       <div className="mb-6">
//         <SectionHeader label="Amenities – Part D (Rs)" />
//         <div className="grid grid-cols-2 gap-2 pl-5">
//           <InputField label="Wardrobes" name="wardrobes" value={formData.wardrobes} onChange={handleChange} />
//           <InputField label="Glazed Tiles" name="glazedTiles" value={formData.glazedTiles} onChange={handleChange} />
//           <InputField label="Interior Decorations" name="interiorDecorations" value={formData.interiorDecorations} onChange={handleChange} />
//           <InputField label="Architectural Elevation" name="architecturalElevation" value={formData.architecturalElevation} onChange={handleChange} />
//           <InputField label="Panelling Works" name="panellingWorks" value={formData.panellingWorks} onChange={handleChange} />
//           <InputField label="False Ceiling Area (Sq.ft)" name="falseCeilingArea" value={formData.falseCeilingArea} onChange={handleChange} />
//           <InputField label="False Ceiling Rate" name="falseCeilingRate" value={formData.falseCeilingRate} onChange={handleChange} />
//           <InputField label="False Ceiling Value" name="falseCeilingValue" value={formData.falseCeilingValue} onChange={handleChange} />
//           <InputField label="Amenities Total" name="amenitiesTotal" value={formData.amenitiesTotal} onChange={handleChange} />
//         </div>
//       </div>

//       {/* ── MISCELLANEOUS (PART E) ── */}
//       <div className="mb-6">
//         <SectionHeader label="Miscellaneous – Part E (Rs)" />
//         <div className="grid grid-cols-2 gap-2 pl-5">
//           <InputField label="Separate Toilet Room" name="separateToiletRoom" value={formData.separateToiletRoom} onChange={handleChange} />
//           <InputField label="Separate Water Tank" name="separateWaterTank" value={formData.separateWaterTank} onChange={handleChange} />
//           <InputField label="Trees / Gardening" name="treesGardening" value={formData.treesGardening} onChange={handleChange} />
//           <InputField label="Misc Total" name="miscTotal" value={formData.miscTotal} onChange={handleChange} />
//         </div>
//       </div>

//       {/* ── SERVICES (PART E) ── */}
//       <div className="mb-6">
//         <SectionHeader label="Services – Part E (Rs)" />
//         <div className="grid grid-cols-2 gap-2 pl-5">
//           <InputField label="Open Well" name="openWell" value={formData.openWell} onChange={handleChange} />
//           <InputField label="Deep Bore" name="deepBore" value={formData.deepBore} onChange={handleChange} />
//           <InputField label="Motor" name="motor" value={formData.motor} onChange={handleChange} />
//           <InputField label="Overhead Tank" name="overheadTankServices" value={formData.overheadTankServices} onChange={handleChange} />
//           <InputField label="Septic Tank" name="septicTank" value={formData.septicTank} onChange={handleChange} />
//           <InputField label="Compound Wall (R.ft)" name="compoundWallRft" value={formData.compoundWallRft} onChange={handleChange} />
//           <InputField label="C.Wall Rate (Rs/rft)" name="compoundWallRate" value={formData.compoundWallRate} onChange={handleChange} />
//           <InputField label="C.Wall Value" name="compoundWallValue" value={formData.compoundWallValue} onChange={handleChange} />
//           <InputField label="Pavements (Sq.ft)" name="pavementsSqft" value={formData.pavementsSqft} onChange={handleChange} />
//           <InputField label="Pavements Rate" name="pavementsRate" value={formData.pavementsRate} onChange={handleChange} />
//           <InputField label="Pavements Value" name="pavementsValue" value={formData.pavementsValue} onChange={handleChange} />
//           <InputField label="Services Total" name="servicesTotal" value={formData.servicesTotal} onChange={handleChange} />
//         </div>
//       </div>

//       {/* ── ABSTRACT VALUE (PART F) ── */}
//       <div className="mb-6">
//         <SectionHeader label="Abstract Value – Part F (Rs)" />
//         <div className="grid grid-cols-2 gap-2 pl-5">
//           <InputField label="Land (GLR)" name="landGLR" value={formData.landGLR} onChange={handleChange} />
//           <InputField label="Land (PMR)" name="landPMR" value={formData.landPMR} onChange={handleChange} />
//           <InputField label="Building (GLR)" name="buildingGLR" value={formData.buildingGLR} onChange={handleChange} />
//           <InputField label="Building (PMR)" name="buildingPMR" value={formData.buildingPMR} onChange={handleChange} />
//           <InputField label="Extra Items" name="extraItemsAbstract" value={formData.extraItemsAbstract} onChange={handleChange} />
//           <InputField label="Amenities" name="amenitiesAbstract" value={formData.amenitiesAbstract} onChange={handleChange} />
//           <InputField label="Miscellaneous" name="miscAbstract" value={formData.miscAbstract} onChange={handleChange} />
//           <InputField label="Services" name="servicesAbstract" value={formData.servicesAbstract} onChange={handleChange} />
//           <InputField label="Total (GLR)" name="totalGLR" value={formData.totalGLR} onChange={handleChange} />
//           <InputField label="Total (PMR)" name="totalPMR" value={formData.totalPMR} onChange={handleChange} />
//           <InputField label="Present Market Value" name="presentMarketValue" value={formData.presentMarketValue} onChange={handleChange} />
//         </div>
//       </div>

//       {/* ── DECLARATION DATES ── */}
//       <div className="mb-6">
//         <SectionHeader label="Declaration / Certificate" />
//         <div className="grid grid-cols-2 gap-2 pl-5">
//           <InputField label="Title Deed No" name="titleDeedNo" value={formData.titleDeedNo} onChange={handleChange} />
//           <InputField label="Title Deed Date" name="titleDeedDate" value={formData.titleDeedDate} onChange={handleChange} />
//           <InputField label="Appointment Date" name="appointmentDate" value={formData.appointmentDate} onChange={handleChange} />
//           <InputField label="Valuation Date" name="valuationDate" value={formData.valuationDate} onChange={handleChange} />
//           <InputField label="Report Date" name="reportDate" value={formData.reportDate} onChange={handleChange} />
//           <InputField label="Inspection Date" name="inspectionDate" value={formData.inspectionDate} onChange={handleChange} />
//           <InputField label="Place" name="place" value={formData.place} onChange={handleChange} />
//         </div>
//       </div>

//     </div>
//   );
// }

import React from "react";
import { InputField } from "../shared/FormFields";
import { FormData } from '@/app/(Drafter)/types/types';

interface Props {
  formData: FormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export const spellNumberIndian = (numInput: string | number): string => {
  // Remove commas and get the integer part
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

  // Pad string to 9 digits to handle up to hundreds of crores (00,00,00,000)
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

// ── Sub-components ─────────────────────────────────────────────────────────────
function SectionHeader({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <div className="w-3.5 h-3.5 bg-[#00a0ef] rounded-[2px]" />
      <h3 className="text-[12px] font-semibold text-gray-800">{label}</h3>
    </div>
  );
}

function SubLabel({ label }: { label: string }) {
  return (
    <p className="text-[10px] font-bold text-gray-500 mb-2 mt-3 uppercase tracking-wide">{label}</p>
  );
}

function TextArea({
  label,
  name,
  value,
  onChange,
  rows = 2,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  rows?: number;
}) {
  return (
    <div className="mb-1">
      <label className="block text-[10px] font-semibold text-gray-500 uppercase mb-1">{label}</label>
      <textarea
        name={name}
        value={value ?? ""}
        onChange={onChange}
        rows={rows}
        className="w-full px-2 py-1.5 border border-gray-300 rounded text-[12px] text-gray-800 focus:outline-none focus:border-[#00a0ef] focus:ring-1 focus:ring-[#00a0ef] resize-none transition-colors"
      />
    </div>
  );
}

// ── Main Sidebar ───────────────────────────────────────────────────────────────
export default function BuildingValuationSidebar({ formData, handleChange }: Props) {
  const handleNumericToWordsChange = (e: React.ChangeEvent<HTMLInputElement>, wordsFieldName: string) => {
    // 1. Update the numeric field normally
    handleChange(e);
    
    // 2. Convert the number to words
    const words = spellNumberIndian(e.target.value);
    
    // 3. Simulate an event to update the words field in the shared formData state
    handleChange({
      target: {
        name: wordsFieldName,
        value: words
      }
    } as unknown as React.ChangeEvent<HTMLTextAreaElement>);
  };
  return (
    <div className="flex-1 overflow-y-auto p-4 scrollbar-thin">

      {/* ══════════════════════════════════════════════════════
          1. BASIC INFO
      ══════════════════════════════════════════════════════ */}
      <div className="mb-6">
        <SectionHeader label="1 · Basic Info" />
        <div className="grid grid-cols-2 gap-2 pl-5">
          <InputField label="To (Name)" name="toName" value={formData.toName} onChange={handleChange} />
          <InputField label="Branch" name="branch" value={formData.branch} onChange={handleChange} />
          <InputField label="Date" name="date" value={formData.date} onChange={handleChange} />
          <InputField label="Place" name="place" value={formData.place} onChange={handleChange} />
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          2. OWNER DETAILS
      ══════════════════════════════════════════════════════ */}
      <div className="mb-6">
        <SectionHeader label="2 · Owner Details" />
        <div className="grid grid-cols-2 gap-2 pl-5">
          <InputField label="Owner Name" name="ownerName" value={formData.ownerName} onChange={handleChange} />
          <InputField label="Relation (W/o, S/o)" name="ownerRelation" value={formData.ownerRelation} onChange={handleChange} />
          <InputField label="Relation Name" name="ownerRelationName" value={formData.ownerRelationName} onChange={handleChange} />
          <InputField label="Phone" name="ownerPhone" value={formData.ownerPhone} onChange={handleChange} />
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          3. PROPERTY TYPE
      ══════════════════════════════════════════════════════ */}
      <div className="mb-6">
        <SectionHeader label="3 · Property Type" />
        <div className="pl-5">
          <InputField label="Type" name="propertyType" value={formData.propertyType} onChange={handleChange} />
          <InputField label="Description" name="propertyDescription" value={formData.propertyDescription} onChange={handleChange} />
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          4. LOCATION DETAILS
      ══════════════════════════════════════════════════════ */}
      <div className="mb-6">
        <SectionHeader label="4 · Location Details" />
        <div className="grid grid-cols-2 gap-2 pl-5">
          <InputField label="H.No" name="hNo" value={formData.hNo} onChange={handleChange} />
          <InputField label="Sy.No / Nagar" name="syNo" value={formData.syNo} onChange={handleChange} />
          <InputField label="Road / Area" name="road" value={formData.road} onChange={handleChange} />
          <InputField label="City / Mandal" name="city" value={formData.city} onChange={handleChange} />
          <InputField label="District" name="district" value={formData.district} onChange={handleChange} />
          <InputField label="Pin Code" name="pinCode" value={formData.pinCode} onChange={handleChange} />
          <InputField label="Landmark" name="landmark" value={formData.landmark} onChange={handleChange} />
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          5. VALUATION SUMMARY
      ══════════════════════════════════════════════════════ */}
      {/* <div className="mb-6">
        <SectionHeader label="5 · Valuation Summary" />
        <div className="pl-5">
          <InputField label="Fair Market Value (Rs)" name="fairMarketValue" value={formData.fairMarketValue} onChange={handleChange} />
          <TextArea label="Fair Market Value – In Words" name="fairMarketValueWords" value={formData.fairMarketValueWords} onChange={handleChange} rows={1} />
          <InputField label="Book / Govt Value (Rs)" name="bookValue" value={formData.bookValue} onChange={handleChange} />
          <TextArea label="Book Value – In Words" name="bookValueWords" value={formData.bookValueWords} onChange={handleChange} rows={1} />
          <InputField label="Distress Value (Rs)" name="distressValue" value={formData.distressValue} onChange={handleChange} />
          <TextArea label="Distress Value – In Words" name="distressValueWords" value={formData.distressValueWords} onChange={handleChange} rows={1} />
          <InputField label="Realisable Value (Rs)" name="realisableValue" value={formData.realisableValue} onChange={handleChange} />
          <TextArea label="Realisable Value – In Words" name="realisableValueWords" value={formData.realisableValueWords} onChange={handleChange} rows={1} />
        </div>
      </div> */}
      <div className="mb-6">
        <SectionHeader label="5 · Valuation Summary" />
        <p className="text-[10px] text-gray-500 mb-4 pl-5">Numbers entered here automatically generate the text equivalent.</p>
        <div className="pl-5">
          <InputField label="Fair Market Value (Rs)" name="fairMarketValue" value={formData.fairMarketValue} onChange={(e: any) => handleNumericToWordsChange(e, "fairMarketValueWords")} />
          <TextArea label="Fair Market Value – In Words" name="fairMarketValueWords" value={formData.fairMarketValueWords} onChange={handleChange} rows={1} />
          
          <InputField label="Book / Govt Value (Rs)" name="bookValue" value={formData.bookValue} onChange={(e: any) => handleNumericToWordsChange(e, "bookValueWords")} />
          <TextArea label="Book Value – In Words" name="bookValueWords" value={formData.bookValueWords} onChange={handleChange} rows={1} />
          
          <InputField label="Distress Value (Rs)" name="distressValue" value={formData.distressValue} onChange={(e: any) => handleNumericToWordsChange(e, "distressValueWords")} />
          <TextArea label="Distress Value – In Words" name="distressValueWords" value={formData.distressValueWords} onChange={handleChange} rows={1} />
          
          <InputField label="Realisable Value (Rs)" name="realisableValue" value={formData.realisableValue} onChange={(e: any) => handleNumericToWordsChange(e, "realisableValueWords")} />
          <TextArea label="Realisable Value – In Words" name="realisableValueWords" value={formData.realisableValueWords} onChange={handleChange} rows={1} />
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          6. PART A – GENERAL (dates & purpose)
      ══════════════════════════════════════════════════════ */}
      <div className="mb-6">
        <SectionHeader label="6 · Part A – General" />
        <div className="grid grid-cols-2 gap-2 pl-5">
          <InputField label="Purpose of Valuation" name="purposeOfValuation" value={formData.purposeOfValuation} onChange={handleChange} />
          <InputField label="Date of Inspection" name="dateOfInspection" value={formData.dateOfInspection} onChange={handleChange} />
          <InputField label="Date of Valuation" name="dateOfValuation" value={formData.dateOfValuation} onChange={handleChange} />
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          7. DOCUMENTS PRODUCED
      ══════════════════════════════════════════════════════ */}
      <div className="mb-6">
        <SectionHeader label="7 · Documents Produced" />
        <div className="pl-5">
          <SubLabel label="Document 1" />
          <div className="grid grid-cols-2 gap-2">
            <InputField label="Description" name="doc1Description" value={formData.doc1Description} onChange={handleChange} />
            <InputField label="Doc No" name="doc1No" value={formData.doc1No} onChange={handleChange} />
            <InputField label="Date" name="doc1Date" value={formData.doc1Date} onChange={handleChange} />
            <InputField label="Original/Copy" name="doc1Copy" value={formData.doc1Copy} onChange={handleChange} />
          </div>
          <SubLabel label="Document 2" />
          <div className="grid grid-cols-2 gap-2">
            <InputField label="Description" name="doc2Description" value={formData.doc2Description} onChange={handleChange} />
            <InputField label="Doc No" name="doc2No" value={formData.doc2No} onChange={handleChange} />
            <InputField label="Date" name="doc2Date" value={formData.doc2Date} onChange={handleChange} />
            <InputField label="Original/Copy" name="doc2Copy" value={formData.doc2Copy} onChange={handleChange} />
          </div>
          <SubLabel label="Document 3" />
          <div className="grid grid-cols-2 gap-2">
            <InputField label="Description" name="doc3Description" value={formData.doc3Description} onChange={handleChange} />
            <InputField label="Doc No" name="doc3No" value={formData.doc3No} onChange={handleChange} />
            <InputField label="Date" name="doc3Date" value={formData.doc3Date} onChange={handleChange} />
            <InputField label="Original/Copy" name="doc3Copy" value={formData.doc3Copy} onChange={handleChange} />
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          8. BRIEF DESCRIPTION
      ══════════════════════════════════════════════════════ */}
      <div className="mb-6">
        <SectionHeader label="8 · Brief Description" />
        <div className="pl-5">
          <TextArea label="Description" name="briefDescription" value={formData.briefDescription} onChange={handleChange} rows={3} />
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          9. AREA CLASSIFICATION
      ══════════════════════════════════════════════════════ */}
      <div className="mb-6">
        <SectionHeader label="9 · Area Classification" />
        <div className="grid grid-cols-2 gap-2 pl-5">
          <InputField label="Residential Area" name="residentialArea" value={formData.residentialArea} onChange={handleChange} />
          <InputField label="Commercial Area" name="commercialArea" value={formData.commercialArea} onChange={handleChange} />
          <InputField label="Industrial Area" name="industrialArea" value={formData.industrialArea} onChange={handleChange} />
          <InputField label="High / Middle / Poor" name="classificationHighMiddlePoor" value={formData.classificationHighMiddlePoor} onChange={handleChange} />
          <InputField label="Urban / Semi Urban / Rural" name="urbanSemiUrbanRural" value={formData.urbanSemiUrbanRural} onChange={handleChange} />
          <InputField label="Corporation / Municipality" name="corporationVillageMunicipality" value={formData.corporationVillageMunicipality} onChange={handleChange} />
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          10. SITE CHARACTERISTICS
      ══════════════════════════════════════════════════════ */}
      <div className="mb-6">
        <SectionHeader label="10 · Site Characteristics" />
        <div className="pl-5">
          <div className="grid grid-cols-2 gap-2">
            <InputField label="Locality Classification" name="localityClassification" value={formData.localityClassification} onChange={handleChange} />
            <InputField label="Land Level" name="landLevel" value={formData.landLevel} onChange={handleChange} />
            <InputField label="Shape of Land" name="shapeOfLand" value={formData.shapeOfLand} onChange={handleChange} />
            <InputField label="Type of Use" name="typeOfUse" value={formData.typeOfUse} onChange={handleChange} />
            <InputField label="Usage Restriction" name="usageRestriction" value={formData.usageRestriction} onChange={handleChange} />
            <InputField label="Town Planning Approved" name="townPlanningApproved" value={formData.townPlanningApproved} onChange={handleChange} />
            <InputField label="Corner / Intermittent" name="cornerOrIntermittent" value={formData.cornerOrIntermittent} onChange={handleChange} />
            <InputField label="Road Facilities" name="roadFacilities" value={formData.roadFacilities} onChange={handleChange} />
            <InputField label="Type of Road" name="typeOfRoad" value={formData.typeOfRoad} onChange={handleChange} />
            <InputField label="Width of Road" name="widthOfRoad" value={formData.widthOfRoad} onChange={handleChange} />
            <InputField label="Land Locked" name="landLocked" value={formData.landLocked} onChange={handleChange} />
            <InputField label="Water Potentiality" name="waterPotentiality" value={formData.waterPotentiality} onChange={handleChange} />
            <InputField label="Underground Sewerage" name="undergroundSewerage" value={formData.undergroundSewerage} onChange={handleChange} />
            <InputField label="Power Supply" name="powerSupply" value={formData.powerSupply} onChange={handleChange} />
            <InputField label="Flooding" name="flooding" value={formData.flooding} onChange={handleChange} />
          </div>
          <TextArea label="Civic Amenities" name="civicAmenities" value={formData.civicAmenities} onChange={handleChange} rows={1} />
          <TextArea label="Surrounding Development" name="surroundingDevelopment" value={formData.surroundingDevelopment} onChange={handleChange} rows={2} />
          <TextArea label="Advantages of Site" name="advantagesOfSite" value={formData.advantagesOfSite} onChange={handleChange} rows={1} />
          <TextArea label="General Remarks" name="generalRemarks" value={formData.generalRemarks} onChange={handleChange} rows={3} />
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          11. BOUNDARIES OF PROPERTY
      ══════════════════════════════════════════════════════ */}
      <div className="mb-6">
        <SectionHeader label="11 · Boundaries of Property" />
        <div className="pl-5">
          <SubLabel label="As per Deed" />
          <div className="grid grid-cols-2 gap-2">
            <InputField label="North" name="northBoundaryDeed" value={formData.northBoundaryDeed} onChange={handleChange} />
            <InputField label="South" name="southBoundaryDeed" value={formData.southBoundaryDeed} onChange={handleChange} />
            <InputField label="East" name="eastBoundaryDeed" value={formData.eastBoundaryDeed} onChange={handleChange} />
            <InputField label="West" name="westBoundaryDeed" value={formData.westBoundaryDeed} onChange={handleChange} />
          </div>
          <SubLabel label="As per Actuals" />
          <div className="grid grid-cols-2 gap-2">
            <InputField label="North" name="northBoundaryActual" value={formData.northBoundaryActual} onChange={handleChange} />
            <InputField label="South" name="southBoundaryActual" value={formData.southBoundaryActual} onChange={handleChange} />
            <InputField label="East" name="eastBoundaryActual" value={formData.eastBoundaryActual} onChange={handleChange} />
            <InputField label="West" name="westBoundaryActual" value={formData.westBoundaryActual} onChange={handleChange} />
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          12. DIMENSIONS OF SITE
      ══════════════════════════════════════════════════════ */}
      <div className="mb-6">
        <SectionHeader label="12 · Dimensions of Site" />
        <div className="pl-5">
          <SubLabel label="As per Title Deed" />
          <div className="grid grid-cols-2 gap-2">
            <InputField label="North" name="northDeedDim" value={formData.northDeedDim} onChange={handleChange} />
            <InputField label="South" name="southDeedDim" value={formData.southDeedDim} onChange={handleChange} />
            <InputField label="East" name="eastDeedDim" value={formData.eastDeedDim} onChange={handleChange} />
            <InputField label="West" name="westDeedDim" value={formData.westDeedDim} onChange={handleChange} />
          </div>
          <SubLabel label="Actuals" />
          <div className="grid grid-cols-2 gap-2">
            <InputField label="North" name="northActualDim" value={formData.northActualDim} onChange={handleChange} />
            <InputField label="South" name="southActualDim" value={formData.southActualDim} onChange={handleChange} />
            <InputField label="East" name="eastActualDim" value={formData.eastActualDim} onChange={handleChange} />
            <InputField label="West" name="westActualDim" value={formData.westActualDim} onChange={handleChange} />
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          13. SITE EXTENT & COORDINATES
      ══════════════════════════════════════════════════════ */}
      <div className="mb-6">
        <SectionHeader label="13 · Site Extent & Coordinates" />
        <div className="grid grid-cols-2 gap-2 pl-5">
          <InputField label="Extent (Sq.Yds)" name="extentSqYds" value={formData.extentSqYds} onChange={handleChange} />
          <InputField label="Rate (Rs/Sq.Yd)" name="landRatePerSqYd" value={formData.landRatePerSqYd} onChange={handleChange} />
          <InputField label="Extent as per Deed" name="extentAsPerDeed" value={formData.extentAsPerDeed} onChange={handleChange} />
          <InputField label="Extent for Valuation" name="extentForValuation" value={formData.extentForValuation} onChange={handleChange} />
          <InputField label="Latitude" name="latitude" value={formData.latitude} onChange={handleChange} />
          <InputField label="Longitude" name="longitude" value={formData.longitude} onChange={handleChange} />
          <InputField label="Occupied By / Rent" name="occupiedBy" value={formData.occupiedBy} onChange={handleChange} />
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          14. LAND VALUATION – PART A
      ══════════════════════════════════════════════════════ */}
      <div className="mb-6">
        <SectionHeader label="14 · Land Valuation – Part A" />
        <div className="grid grid-cols-2 gap-2 pl-5">
          <InputField label="Guideline Rate (Rs/Sq.Yd)" name="guidelineRate" value={formData.guidelineRate} onChange={handleChange} />
          <InputField label="Land Value by GLR (Rs)" name="landValueGLR" value={formData.landValueGLR} onChange={handleChange} />
          <InputField label="PMR Range" name="prevailingMarketRateRange" value={formData.prevailingMarketRateRange} onChange={handleChange} />
          <InputField label="Unit Rate PMR (Rs/Sq.Yd)" name="unitRatePMR" value={formData.unitRatePMR} onChange={handleChange} />
          <InputField label="Land Value by PMR (Rs)" name="landValuePMR" value={formData.landValuePMR} onChange={handleChange} />
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          15. BUILDING TECHNICAL DETAILS – PART B
      ══════════════════════════════════════════════════════ */}
      <div className="mb-6">
        <SectionHeader label="15 · Building Technical Details – Part B" />
        <div className="pl-5">
          <div className="grid grid-cols-2 gap-2">
            <InputField label="Year of Construction" name="yearOfConstruction" value={formData.yearOfConstruction} onChange={handleChange} />
            <InputField label="Age of Building" name="ageOfBuilding" value={formData.ageOfBuilding} onChange={handleChange} />
            <InputField label="Expected Future Life (yrs)" name="expectedFutureLife" value={formData.expectedFutureLife} onChange={handleChange} />
            <InputField label="Total Life (yrs)" name="totalLifeOfBuilding" value={formData.totalLifeOfBuilding} onChange={handleChange} />
            <InputField label="Maintenance – Exterior" name="maintenanceExterior" value={formData.maintenanceExterior} onChange={handleChange} />
            <InputField label="Maintenance – Interior" name="maintenanceInterior" value={formData.maintenanceInterior} onChange={handleChange} />
            <InputField label="Genuineness Verified" name="genuinenessVerified" value={formData.genuinenessVerified} onChange={handleChange} />
          </div>
          <TextArea label="Type of Building" name="typeOfBuilding" value={formData.typeOfBuilding} onChange={handleChange} rows={1} />
          <TextArea label="Type of Construction" name="typeOfConstruction" value={formData.typeOfConstruction} onChange={handleChange} rows={1} />
          <TextArea label="Quality of Construction" name="qualityOfConstruction" value={formData.qualityOfConstruction} onChange={handleChange} rows={1} />
          <TextArea label="Appearance of Building" name="appearanceOfBuilding" value={formData.appearanceOfBuilding} onChange={handleChange} rows={1} />
          <TextArea label="No. of Floors & Height" name="numberOfFloorsHeight" value={formData.numberOfFloorsHeight} onChange={handleChange} rows={1} />
          <TextArea label="Drawing Approval Date / Validity" name="drawingApprovalDate" value={formData.drawingApprovalDate} onChange={handleChange} rows={1} />
          <TextArea label="Approved Map / Plan Authority" name="approvedMapAuthority" value={formData.approvedMapAuthority} onChange={handleChange} rows={2} />
          <TextArea label="Any Other Comments (Plan)" name="anyOtherComments" value={formData.anyOtherComments} onChange={handleChange} rows={2} />
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          16. PLINTH AREA – FLOOR-WISE
      ══════════════════════════════════════════════════════ */}
      <div className="mb-6">
        <SectionHeader label="16 · Plinth Area – Floor-wise" />
        <div className="pl-5">
          <SubLabel label="Ground Floor" />
          <div className="grid grid-cols-2 gap-2">
            <InputField label="Year of Construction" name="groundFloorYear" value={formData.groundFloorYear} onChange={handleChange} />
            <InputField label="Main Portion (Sq.ft)" name="groundFloorMainArea" value={formData.groundFloorMainArea} onChange={handleChange} />
            <InputField label="Cantilevered Portion (Sq.ft)" name="groundFloorCantArea" value={formData.groundFloorCantArea} onChange={handleChange} />
            <InputField label="Total A+50%B (Sq.ft)" name="groundFloorTotal" value={formData.groundFloorTotal} onChange={handleChange} />
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          17. SPECIFICATIONS OF CONSTRUCTION
      ══════════════════════════════════════════════════════ */}
      <div className="mb-6">
        <SectionHeader label="17 · Specifications of Construction" />
        <div className="pl-5">
          <TextArea label="Foundation" name="specFoundation" value={formData.specFoundation} onChange={handleChange} rows={2} />
          <TextArea label="Basement / Flooring" name="specBasement" value={formData.specBasement} onChange={handleChange} rows={1} />
          <TextArea label="Super Structure" name="specSuperStructure" value={formData.specSuperStructure} onChange={handleChange} rows={2} />
          <TextArea label="Joinery / Doors & Windows" name="specJoinery" value={formData.specJoinery} onChange={handleChange} rows={2} />
          <TextArea label="RCC Works" name="specRCCWorks" value={formData.specRCCWorks} onChange={handleChange} rows={2} />
          <TextArea label="Plastering" name="specPlastering" value={formData.specPlastering} onChange={handleChange} rows={2} />
          <TextArea label="Flooring / Skirting / Dadoing" name="specFlooring" value={formData.specFlooring} onChange={handleChange} rows={1} />
          <TextArea label="Special Finish (Marble, Granite, etc.)" name="specSpecialFinish" value={formData.specSpecialFinish} onChange={handleChange} rows={1} />
          <TextArea label="Roofing" name="specRoofing" value={formData.specRoofing} onChange={handleChange} rows={1} />
          <InputField label="Drainage" name="specDrainage" value={formData.specDrainage} onChange={handleChange} />
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          18. COMPOUND WALL (Building Section)
      ══════════════════════════════════════════════════════ */}
      <div className="mb-6">
        <SectionHeader label="18 · Compound Wall (Building Section)" />
        <div className="grid grid-cols-2 gap-2 pl-5">
          <InputField label="Length (R.ft)" name="compWallBuildingRft" value={formData.compWallBuildingRft} onChange={handleChange} />
          <InputField label="Rate (Rs/rft)" name="compWallBuildingRate" value={formData.compWallBuildingRate} onChange={handleChange} />
          <InputField label="Height" name="compWallBuildingHeight" value={formData.compWallBuildingHeight} onChange={handleChange} />
          <InputField label="Length (ft)" name="compWallBuildingLength" value={formData.compWallBuildingLength} onChange={handleChange} />
          <InputField label="Type of Construction" name="compWallBuildingType" value={formData.compWallBuildingType} onChange={handleChange} />
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          19. ELECTRICAL INSTALLATION
      ══════════════════════════════════════════════════════ */}
      <div className="mb-6">
        <SectionHeader label="19 · Electrical Installation" />
        <div className="pl-5">
          <div className="grid grid-cols-2 gap-2">
            <InputField label="Fan Points" name="fanPoints" value={formData.fanPoints} onChange={handleChange} />
            <InputField label="Spare Plug Points" name="sparePlugPoints" value={formData.sparePlugPoints} onChange={handleChange} />
            <InputField label="Electrical Lumpsum (Rs)" name="electricalLumpsum" value={formData.electricalLumpsum} onChange={handleChange} />
          </div>
          <TextArea label="Type of Wiring" name="typeOfWiring" value={formData.typeOfWiring} onChange={handleChange} rows={1} />
          <TextArea label="Class of Fittings" name="classOfFittings" value={formData.classOfFittings} onChange={handleChange} rows={1} />
          <TextArea label="Number of Light Points" name="numberOfLightPoints" value={formData.numberOfLightPoints} onChange={handleChange} rows={1} />
          <TextArea label="Any Other Electrical" name="anyOtherElectrical" value={formData.anyOtherElectrical} onChange={handleChange} rows={1} />
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          20. PLUMBING INSTALLATION
      ══════════════════════════════════════════════════════ */}
      <div className="mb-6">
        <SectionHeader label="20 · Plumbing Installation" />
        <div className="pl-5">
          <div className="grid grid-cols-2 gap-2">
            <InputField label="Water Closets" name="waterClosets" value={formData.waterClosets} onChange={handleChange} />
            <InputField label="Wash Basins" name="washBasins" value={formData.washBasins} onChange={handleChange} />
            <InputField label="Urinals" name="urinals" value={formData.urinals} onChange={handleChange} />
            <InputField label="Bath Tubs" name="bathTubs" value={formData.bathTubs} onChange={handleChange} />
            <InputField label="Water Meters / Taps" name="waterMeters" value={formData.waterMeters} onChange={handleChange} />
            <InputField label="Plumbing Lumpsum (Rs)" name="plumbingLumpsum" value={formData.plumbingLumpsum} onChange={handleChange} />
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          21. BUILDING VALUATION – DETAILS OF VALUATION
      ══════════════════════════════════════════════════════ */}
      <div className="mb-6">
        <SectionHeader label="21 · Building Valuation Details" />
        <div className="pl-5">
          <SubLabel label="Ground Floor" />
          <div className="grid grid-cols-2 gap-2">
            <InputField label="Plinth Area (Sq.ft)" name="groundFloorPlinthArea" value={formData.groundFloorPlinthArea} onChange={handleChange} />
            <InputField label="Rate (Rs/Sq.ft)" name="groundFloorRate" value={formData.groundFloorRate} onChange={handleChange} />
            <InputField label="Age of Building" name="groundFloorAge" value={formData.groundFloorAge} onChange={handleChange} />
            <InputField label="Replacement Cost (Rs)" name="groundFloorReplacementCost" value={formData.groundFloorReplacementCost} onChange={handleChange} />
            <InputField label="Depreciation (Rs)" name="groundFloorDepreciation" value={formData.groundFloorDepreciation} onChange={handleChange} />
            <InputField label="Net Value after Dep. (Rs)" name="groundFloorNetValue" value={formData.groundFloorNetValue} onChange={handleChange} />
          </div>
          <InputField label="Building Total (Rs)" name="buildingTotal" value={formData.buildingTotal} onChange={handleChange} />
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          22. EXTRA ITEMS – PART C
      ══════════════════════════════════════════════════════ */}
      <div className="mb-6">
        <SectionHeader label="22 · Extra Items – Part C (Rs)" />
        <div className="grid grid-cols-2 gap-2 pl-5">
          <InputField label="Portico" name="portico" value={formData.portico} onChange={handleChange} />
          <InputField label="Ornamental / Pooja Door" name="ornamentalDoor" value={formData.ornamentalDoor} onChange={handleChange} />
          <InputField label="Sit-out / Verandah with Grills" name="sitOutVerandah" value={formData.sitOutVerandah} onChange={handleChange} />
          <InputField label="Overhead Water Tank" name="overheadWaterTank" value={formData.overheadWaterTank} onChange={handleChange} />
          <InputField label="Extra Steel / Collapsible Gates" name="extraGates" value={formData.extraGates} onChange={handleChange} />
          <InputField label="Extra Items Total (Rs)" name="extraItemsTotal" value={formData.extraItemsTotal} onChange={handleChange} />
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          23. AMENITIES – PART D
      ══════════════════════════════════════════════════════ */}
      <div className="mb-6">
        <SectionHeader label="23 · Amenities – Part D (Rs)" />
        <div className="grid grid-cols-2 gap-2 pl-5">
          <InputField label="Wardrobes / Showcases" name="wardrobes" value={formData.wardrobes} onChange={handleChange} />
          <InputField label="Glazed Tiles" name="glazedTiles" value={formData.glazedTiles} onChange={handleChange} />
          <InputField label="Extra Sinks & Bath Tub" name="extraSinksBathtub" value={formData.extraSinksBathtub} onChange={handleChange} />
          <InputField label="Marble / Ceramic Tiles Flooring" name="marbleCeramicTiles" value={formData.marbleCeramicTiles} onChange={handleChange} />
          <InputField label="Interior Decorations" name="interiorDecorations" value={formData.interiorDecorations} onChange={handleChange} />
          <InputField label="Architectural Elevation Works" name="architecturalElevation" value={formData.architecturalElevation} onChange={handleChange} />
          <InputField label="Panelling Works" name="panellingWorks" value={formData.panellingWorks} onChange={handleChange} />
          <InputField label="Aluminium Works" name="aluminiumWorks" value={formData.aluminiumWorks} onChange={handleChange} />
          <InputField label="Aluminium Hand Rails" name="aluminiumHandRails" value={formData.aluminiumHandRails} onChange={handleChange} />
          <InputField label="False Ceiling Area (Sq.ft)" name="falseCeilingArea" value={formData.falseCeilingArea} onChange={handleChange} />
          <InputField label="False Ceiling Rate (Rs/Sq.ft)" name="falseCeilingRate" value={formData.falseCeilingRate} onChange={handleChange} />
          <InputField label="False Ceiling Value (Rs)" name="falseCeilingValue" value={formData.falseCeilingValue} onChange={handleChange} />
          <InputField label="Amenities Total (Rs)" name="amenitiesTotal" value={formData.amenitiesTotal} onChange={handleChange} />
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          24. MISCELLANEOUS – PART E
      ══════════════════════════════════════════════════════ */}
      <div className="mb-6">
        <SectionHeader label="24 · Miscellaneous – Part E (Rs)" />
        <div className="grid grid-cols-2 gap-2 pl-5">
          <InputField label="Separate Lumber Room" name="separateLumberRoom" value={formData.separateLumberRoom} onChange={handleChange} />
          <InputField label="Separate Toilet Room" name="separateToiletRoom" value={formData.separateToiletRoom} onChange={handleChange} />
          <InputField label="Separate Water Tank / Sump" name="separateWaterTank" value={formData.separateWaterTank} onChange={handleChange} />
          <InputField label="Trees / Gardening" name="treesGardening" value={formData.treesGardening} onChange={handleChange} />
          <InputField label="Miscellaneous Total (Rs)" name="miscTotal" value={formData.miscTotal} onChange={handleChange} />
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          25. SERVICES – PART E
      ══════════════════════════════════════════════════════ */}
      <div className="mb-6">
        <SectionHeader label="25 · Services – Part E (Rs)" />
        <div className="pl-5">
          <SubLabel label="Water Supply Arrangements" />
          <div className="grid grid-cols-2 gap-2">
            <InputField label="Open Well" name="openWell" value={formData.openWell} onChange={handleChange} />
            <InputField label="Deep Bore" name="deepBore" value={formData.deepBore} onChange={handleChange} />
            <InputField label="Hand Pump" name="handPump" value={formData.handPump} onChange={handleChange} />
            <InputField label="Motor" name="motor" value={formData.motor} onChange={handleChange} />
            <InputField label="Corporation Tap" name="corporationTap" value={formData.corporationTap} onChange={handleChange} />
            <InputField label="Under Ground Level Sump" name="underGroundSump" value={formData.underGroundSump} onChange={handleChange} />
            <InputField label="Overhead Tank (Services)" name="overheadTankServices" value={formData.overheadTankServices} onChange={handleChange} />
          </div>
          <SubLabel label="Drainage Arrangements" />
          <div className="grid grid-cols-2 gap-2">
            <InputField label="Septic Tank" name="septicTank" value={formData.septicTank} onChange={handleChange} />
            <InputField label="Underground Sewage" name="undergroundSewage" value={formData.undergroundSewage} onChange={handleChange} />
          </div>
          <SubLabel label="Compound Wall (Services Section)" />
          <div className="grid grid-cols-2 gap-2">
            <InputField label="Length (R.ft)" name="compoundWallRft" value={formData.compoundWallRft} onChange={handleChange} />
            <InputField label="Rate (Rs/rft)" name="compoundWallRate" value={formData.compoundWallRate} onChange={handleChange} />
            <InputField label="Height" name="compoundWallHeight" value={formData.compoundWallHeight} onChange={handleChange} />
            <InputField label="Length (ft)" name="compoundWallLength" value={formData.compoundWallLength} onChange={handleChange} />
            <InputField label="Type of Construction" name="compoundWallType" value={formData.compoundWallType} onChange={handleChange} />
            <InputField label="Compound Wall Value (Rs)" name="compoundWallValue" value={formData.compoundWallValue} onChange={handleChange} />
          </div>
          <SubLabel label="Pavements" />
          <div className="grid grid-cols-2 gap-2">
            <InputField label="Pavements (Sq.ft)" name="pavementsSqft" value={formData.pavementsSqft} onChange={handleChange} />
            <InputField label="Pavements Rate (Rs/Sq.ft)" name="pavementsRate" value={formData.pavementsRate} onChange={handleChange} />
            <InputField label="Pavements Value (Rs)" name="pavementsValue" value={formData.pavementsValue} onChange={handleChange} />
            <InputField label="Services Total (Rs)" name="servicesTotal" value={formData.servicesTotal} onChange={handleChange} />
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          26. ABSTRACT VALUE – PART F
      ══════════════════════════════════════════════════════ */}
      <div className="mb-6">
        <SectionHeader label="26 · Abstract Value – Part F (Rs)" />
        <div className="grid grid-cols-2 gap-2 pl-5">
          <InputField label="Land (GLR)" name="landGLR" value={formData.landGLR} onChange={handleChange} />
          <InputField label="Land (PMR)" name="landPMR" value={formData.landPMR} onChange={handleChange} />
          <InputField label="Building (GLR)" name="buildingGLR" value={formData.buildingGLR} onChange={handleChange} />
          <InputField label="Building (PMR)" name="buildingPMR" value={formData.buildingPMR} onChange={handleChange} />
          <InputField label="Extra Items" name="extraItemsAbstract" value={formData.extraItemsAbstract} onChange={handleChange} />
          <InputField label="Amenities" name="amenitiesAbstract" value={formData.amenitiesAbstract} onChange={handleChange} />
          <InputField label="Miscellaneous" name="miscAbstract" value={formData.miscAbstract} onChange={handleChange} />
          <InputField label="Services" name="servicesAbstract" value={formData.servicesAbstract} onChange={handleChange} />
          <InputField label="Total (GLR)" name="totalGLR" value={formData.totalGLR} onChange={handleChange} />
          <InputField label="Total (PMR)" name="totalPMR" value={formData.totalPMR} onChange={handleChange} />
          <InputField label="Present Market Value (Rs)" name="presentMarketValue" value={formData.presentMarketValue} onChange={handleChange} />
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          27. CERTIFICATE & DECLARATION DATES
      ══════════════════════════════════════════════════════ */}
      <div className="mb-6">
        <SectionHeader label="27 · Certificate & Declaration" />
        <div className="grid grid-cols-2 gap-2 pl-5">
          <InputField label="Title Deed No" name="titleDeedNo" value={formData.titleDeedNo} onChange={handleChange} />
          <InputField label="Title Deed Date" name="titleDeedDate" value={formData.titleDeedDate} onChange={handleChange} />
          <InputField label="Appointment Date" name="appointmentDate" value={formData.appointmentDate} onChange={handleChange} />
          <InputField label="Inspection Date" name="inspectionDate" value={formData.inspectionDate} onChange={handleChange} />
          <InputField label="Valuation Date" name="valuationDate" value={formData.valuationDate} onChange={handleChange} />
          <InputField label="Report Date" name="reportDate" value={formData.reportDate} onChange={handleChange} />
        </div>
      </div>

    </div>
  );
}