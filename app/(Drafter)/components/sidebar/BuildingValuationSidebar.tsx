 
// import React from "react";
// import { FormData } from '@/app/(Drafter)/types/types';

// interface Props {
//   formData: FormData;
//   handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
// }

// export const spellNumberIndian = (numInput: string | number): string => {
//   let numStr = numInput.toString().replace(/,/g, '').split('.')[0]; 
//   if (isNaN(Number(numStr)) || numStr === '') return '';
//   if (Number(numStr) === 0) return 'No Rupees';

//   const a = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
//   const b = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

//   const getWords = (n: string) => {
//     let str = '';
//     let num = Number(n);
//     if (num > 19) {
//       str += b[Math.floor(num / 10)] + (num % 10 !== 0 ? ' ' + a[num % 10] : '');
//     } else {
//       str += a[num];
//     }
//     return str.trim();
//   };

//   if (numStr.length > 9) return 'Amount too large';
//   let n = ('000000000' + numStr).slice(-9); 
  
//   let out = '';
//   const crores = n.slice(0, 2);
//   const lacs = n.slice(2, 4);
//   const thousands = n.slice(4, 6);
//   const hundreds = n.slice(6, 7);
//   const tensOnes = n.slice(7, 9);

//   if (Number(crores) > 0) out += getWords(crores) + ' Crores ';
//   if (Number(lacs) > 0) out += getWords(lacs) + ' Lacs ';
//   if (Number(thousands) > 0) out += getWords(thousands) + ' Thousand ';
//   if (Number(hundreds) > 0) out += getWords(hundreds) + ' Hundred ';
//   if (Number(tensOnes) > 0) {
//     if (out !== '') out += 'and ';
//     out += getWords(tensOnes);
//   }

//   out = out.trim();
//   if (out === "One") return "One Rupee";
//   return out + ' Rupees';
// };

// // ── UI Components ─────────────────────────────────────────────────────────────

// function SectionHeader({ label }: { label: string }) {
//   return (
//     <div className="flex items-center gap-2 mb-4 mt-2">
//       <div className="w-3.5 h-3.5 bg-[#00a0ef] rounded-[2px]" />
//       <h3 className="text-[12px] font-semibold text-gray-800">{label}</h3>
//     </div>
//   );
// }

// function SubLabel({ label }: { label: string }) {
//   return (
//     <p className="text-[10px] font-bold text-gray-500 mb-2 mt-4 uppercase tracking-wide border-b border-gray-200 pb-1">{label}</p>
//   );
// }

// const InputField = ({ label, name, value, onChange }: any) => (
//   <div className="mb-3">
//     <label className="block text-[10px] font-semibold text-gray-500 uppercase mb-1">{label}</label>
//     <input type="text" name={name} value={value || ''} onChange={onChange} className="w-full px-2 py-1.5 border border-gray-300 rounded text-[12px] text-gray-800 focus:outline-none focus:border-[#00a0ef] focus:ring-1 focus:ring-[#00a0ef] bg-white transition-colors" />
//   </div>
// );

// const TextArea = ({ label, name, value, onChange, rows = 2 }: any) => (
//   <div className="mb-3">
//     <label className="block text-[10px] font-semibold text-gray-500 uppercase mb-1">{label}</label>
//     <textarea name={name} value={value || ''} onChange={onChange} rows={rows} className="w-full px-2 py-1.5 border border-gray-300 rounded text-[12px] text-gray-800 focus:outline-none focus:border-[#00a0ef] focus:ring-1 focus:ring-[#00a0ef] resize-none bg-gray-50 transition-colors"></textarea>
//   </div>
// );

// const RadioGroup = ({ label, name, options, value, onChange }: any) => (
//   <div className="mb-4 bg-gray-50/50 p-2 border border-gray-200 rounded">
//     <label className="block text-[10px] font-bold text-gray-600 uppercase mb-2 leading-tight">{label}</label>
//     <div className="flex flex-col gap-1.5">
//       {options.map((opt: string) => (
//         <label key={opt} className="flex items-start gap-2 text-[11px] text-gray-700 cursor-pointer hover:bg-gray-100 p-1 rounded transition-colors">
//           <input
//             type="radio"
//             name={name}
//             value={opt}
//             checked={value === opt}
//             onChange={onChange}
//             className="mt-0.5 accent-[#00a0ef]"
//           />
//           <span className="leading-tight">{opt}</span>
//         </label>
//       ))}
//     </div>
//   </div>
// );

// // ── Constants (From MD File) ──────────────────────────────────────────────────

// const OPT_RESIDENTIAL_AREA = ["Residential Zone as per Master Plan", "Mixed residntial cum commercial Zone", "Industrial Classification with few residential dwellings nearby", "falls under semi-urban/peri-urban category"];
// const OPT_HIGH_MIDDLE_POOR = ["High", "Middle", "Poor"];
// const OPT_URBAN_RURAL = ["Urban", "Semi Urban", "Rural"];
// const OPT_SURROUNDING_DEV = ["Surrounding area is well developed with paved roads, houses, and shops", "Moderately developed area with upcoming residential layouts", "Developing area with few built-up properties and open plots", "Underdeveloped area with limited civic infrastructure"];
// const OPT_FLOODING = ["No history of flooding; land level is higher than adjoining road.", "Minor waterlogging during heavy rains, otherwise safe.", "Low-lying area prone to temporary stagnation during monsoon", "Located in flood-prone zone; retaining walls recommended"];
// const OPT_CIVIC_AMENITIES = ["All major civic amenities are available within 1 km radius.", "Schools, hospitals, and markets are within 2-3 km.", "Only basic amenities available locally; major facilities far away.", "Remote location; dependent on nearest town for all civic needs."];
// const OPT_LAND_LEVEL = ["Land is level and matches surrounding ground.", "Plot is slightly elevated/sloping, requiring minor levelling.", "Low-lying plot requiring significant earth filling.", "Highly irregular topography with steep slopes."];
// const OPT_SHAPE = ["Regular rectangular plot.", "Regular square plot.", "Irregular polygon shape.", "Triangular or highly skewed shape."];
// const OPT_TYPE_OF_USE = ["Suitable for residential construction.", "Suitable for commercial / mixed-use development.", "Suitable for agricultural or industrial use only.", "Restricted usage due to zoning / environmental laws."];
// const OPT_USAGE_RESTRICTION = ["Subject to residential use only.", "No specific usage restrictions observed.", "Restricted by coastal/heritage/airport zone regulations.", "High-tension wire crossing / road widening affected area."];
// const OPT_TOWN_PLANNING = ["Yes, within approved layout as per local authority.", "No, it is an unapproved / gram panchayat layout.", "Regularized under government scheme (e.g., LRS).", "Part of ancestral / inherited unplotted land."];
// const OPT_CORNER_INTERMITTENT = ["Intermittent plot with single road frontage.", "Corner plot with two road frontages.", "Plot with three road frontages.", "Landlocked plot with limited or no direct access."];
// const OPT_ROAD_FACILITIES = ["Public Road", "Private Road", "Pathway"];
// const OPT_TYPE_OF_ROAD = ["CC Road", "BT (Black Top) Road", "WBM (Water Bound Macadam) Road", "Mud Road / Katcha Road"];
// const OPT_WIDTH_OF_ROAD = ["Below 20 Ft Wide", "20 Ft to 30 Ft Wide", "30 Ft to 40 Ft Wide", "More than 40 Ft Wide"];
// const OPT_LAND_LOCKED = ["No, plot has direct road access.", "Yes, accessible only through adjacent private property.", "Yes, access under legal dispute / unclear."];
// const OPT_WATER_POTENTIALITY = ["Borewell / open well source available.", "Municipal / Panchayat water supply available.", "Both borewell and municipal supply available.", "No distinct water source; dependent on tankers."];
// const OPT_UNDERGROUND_SEWERAGE = ["Septic tank system in use; no underground network.", "Connected to municipal underground sewerage system.", "Open drainage system.", "No drainage system currently available."];
// const OPT_POWER_SUPPLY = ["Power supply available through local electricity board.", "No power supply connection yet.", "Temporary power supply available for construction."];
// const OPT_ADVANTAGES = ["All amenities are within walkable distance, it is fully developed residential area", "Proximity to highway / commercial hub with high appreciation potential.", "Peaceful residential environment away from traffic.", "Affordable area with upcoming infrastructural projects."];
// const OPT_TYPE_BUILDING = ["Independent residential house (single-family dwelling)", "Multi-storeyed residential apartment building", "Commercial building / Shop-cum-residence", "Industrial shed / Godown"];
// const OPT_TYPE_CONSTRUCTION = ["RCC framed structure with brick walls and reinforced concrete roof.", "Load-bearing brick masonry with RCC roof.", "Load-bearing walls with ACC/GI sheet roofing.", "Temporary/semi-permanent structure (e.g., mud walls, thatched roof)."];
// const OPT_QUALITY = ["High-quality construction with premium materials and finishes.", "Average quality construction using standard materials.", "Below average construction with visible defects.", "Poor quality construction requiring immediate repairs."];
// const OPT_APPEARANCE = ["Excellent and modern architectural appearance.", "Functional and presentable appearance suitable for the locality.", "Old-fashioned but well-maintained.", "Dilapidated and poorly maintained appearance."];
// const OPT_MAINTENANCE = ["Well maintained with recent painting/repairs.", "Fairly maintained; minor repairs required.", "Poorly maintained; significant repairs and repainting needed.", "Dilapidated condition."];
// const OPT_FOUNDATION = ["Random rubble masonry foundation in cement mortar below plinth level; standard PCC bed.", "RCC column footings with tie beams.", "Brick masonry foundation in mud/cement mortar.", "Pile foundation due to loose soil conditions."];
// const OPT_FLOORING = ["Vitrified tiles flooring in all rooms; anti-skid ceramic tiles in toilets and balconies.", "Marble/Granite flooring in main areas.", "Ceramic tiles / mosaic flooring.", "Cement flooring with red oxide / basic finish."];
// const OPT_SUPER_STRUCTURE = ["Brick masonry walls in cement mortar (1:6) for superstructure. 9\" Thick for External and 4\" Thick for Internal Walls", "Solid/Hollow concrete block masonry walls.", "Laterite stone masonry walls.", "AAC block masonry walls."];
// const OPT_JOINERY = ["Doors: Wooden frames with laminated flush shutters. Windows: Steel casement type with glazing and MS grill protection. Timber: Teak / country wood used for frames.", "Teak wood doors and UPVC windows.", "Standard flush doors and aluminium sliding windows.", "Country wood doors and wooden windows with MS grills."];
// const OPT_RCC_WORKS = ["RCC works carried out with M20 grade concrete using tor steel reinforcement as per structural design.", "Standard RCC slab without beams (load-bearing structure).", "Not applicable (Sheet roofing)."];
// const OPT_PLASTERING = ["Single coat 12mm thick cement plaster in 1:6 (Cement : Sand) proportion for internal and external walls; no finishing coat.", "Two coats of cement plastering with smooth sponge finish.", "Rough cast plastering on the exterior."];
// const OPT_SPECIAL_FINISH = ["Not applicable.", "Texture painting / cladding on front elevation.", "Wallpapers / wooden paneling in living areas."];
// const OPT_ROOFING = ["Reinforced Cement Concrete (RCC) flat roof with weathering course.", "ACC / GI sheet roofing on steel/wooden trusses.", "Mangalore tiled roofing on wooden framework.", "Madras terrace roofing."];
// const OPT_DRAINAGE = ["PVC pipes connecting to septic tank/soak pit.", "UPVC pipes connecting to municipal sewer line.", "Open surface drainage.", "Not available."];
// const OPT_WIRING = ["Concealed PVC wiring in rigid conduit", "Surface wiring in casing capping", "Open wiring with wooden battens"];
// const OPT_FITTINGS = ["Superior – Modular switches (Anchor, Havells, GM, etc.) with concealed boxes", "Ordinary – Piano type switches and basic ceiling fittings", "Poor – Mixed or outdated fittings, temporary wiring, exposed joints"];
// const OPT_LIGHT_POINTS = ["Moderate – 1 per 80–100 sq.ft.", "Sufficient – 1 per 60–80 sq.ft.", "Extensive – decorative lighting / false ceiling LED system"];
// const OPT_FAN_POINTS = ["One per habitable room", "One per room + additional in living/dining", "Ceiling fans with regulators in each major room"];
// const OPT_PLUG_POINTS = ["Limited – Only one per room", "Adequate – Two per room including kitchen & toilet"];
// const OPT_OTHER_ELEC = ["Exhaust fans / Geyser points in kitchen & toilets", "A/C points in bedrooms and halls", "Inverter wiring / Solar power provision / UPS backup", "Provisions for A/C and inverter connection available"];
// const OPT_WATER_CLOSETS = ["Attached full bathroom & toilets", "Indian Closet", "Western Closet"];


// // ── Main Sidebar ───────────────────────────────────────────────────────────────
// export default function BuildingValuationSidebar({ formData, handleChange }: Props) {

//   // Interceptor Function: Handles standard typing, auto-word conversion, and live calculations!
//   const handleInterceptChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     // 1. Process standard change
//     handleChange(e);
    
//     const { name, value } = e.target;
    
//     // 2. Auto-Words (From VBA function)
//     const numericFieldsMap: Record<string, string> = {
//       fairMarketValue: 'fairMarketValueWords',
//       bookValue: 'bookValueWords',
//       distressValue: 'distressValueWords',
//       realisableValue: 'realisableValueWords'
//     };
//     if (numericFieldsMap[name]) {
//       handleChange({ target: { name: numericFieldsMap[name], value: spellNumberIndian(value) } } as any);
//     }

//     // 3. Calculation: Age & Life
//     if (name === 'yearOfConstruction') {
//       const currentYear = new Date().getFullYear(); 
//       const year = parseInt(value, 10);
//       if (!isNaN(year)) {
//         const age = currentYear - year;
//         const totalLife = 80;
//         const futureLife = totalLife - age;
        
//         handleChange({ target: { name: 'ageOfBuilding', value: age.toString() } } as any);
//         handleChange({ target: { name: 'totalLifeOfBuilding', value: totalLife.toString() } } as any);
//         handleChange({ target: { name: 'expectedFutureLife', value: futureLife.toString() } } as any);
//       }
//     }

//     // 4. Calculation: Net Value After Depreciation
//     if (name === 'groundFloorReplacementCost' || name === 'groundFloorDepreciation') {
//       const costStr = name === 'groundFloorReplacementCost' ? value : formData.groundFloorReplacementCost;
//       const depStr = name === 'groundFloorDepreciation' ? value : formData.groundFloorDepreciation;
      
//       const cost = parseFloat(costStr?.toString().replace(/,/g, '') || '0');
//       const dep = parseFloat(depStr?.toString().replace(/,/g, '') || '0');
      
//       if (!isNaN(cost) && !isNaN(dep)) {
//         const net = cost - dep;
//         handleChange({ target: { name: 'groundFloorNetValue', value: net.toLocaleString('en-IN') } } as any);
//       }
//     }
//   };

//   return (
//     <div className="flex-1 overflow-y-auto p-4 scrollbar-thin bg-white">

//       {/* 1. BASIC INFO */}
//       <div className="mb-8">
//         <SectionHeader label="1 · Basic Info" />
//         <div className="grid grid-cols-2 gap-2 pl-3">
//           <InputField label="To (Name)" name="toName" value={formData.toName} onChange={handleInterceptChange} />
//           <InputField label="Branch" name="branch" value={formData.branch} onChange={handleInterceptChange} />
//           <InputField label="Date" name="date" value={formData.date} onChange={handleInterceptChange} />
//           <InputField label="Place" name="place" value={formData.place} onChange={handleInterceptChange} />
//         </div>
//       </div>

//       {/* 2. OWNER DETAILS */}
//       <div className="mb-8">
//         <SectionHeader label="2 · Owner Details" />
//         <div className="grid grid-cols-2 gap-2 pl-3">
//           <InputField label="Owner Name" name="ownerName" value={formData.ownerName} onChange={handleInterceptChange} />
//           <InputField label="Relation (W/o, S/o)" name="ownerRelation" value={formData.ownerRelation} onChange={handleInterceptChange} />
//           <InputField label="Relation Name" name="ownerRelationName" value={formData.ownerRelationName} onChange={handleInterceptChange} />
//           <InputField label="Phone" name="ownerPhone" value={formData.ownerPhone} onChange={handleInterceptChange} />
//         </div>
//       </div>

//       {/* 3. PROPERTY TYPE */}
//       <div className="mb-8">
//         <SectionHeader label="3 · Property Type" />
//         <div className="pl-3">
//           <InputField label="Type" name="propertyType" value={formData.propertyType} onChange={handleInterceptChange} />
//           <InputField label="Description" name="propertyDescription" value={formData.propertyDescription} onChange={handleInterceptChange} />
//         </div>
//       </div>

//       {/* 4. LOCATION DETAILS */}
//       <div className="mb-8">
//         <SectionHeader label="4 · Location Details" />
//         <div className="grid grid-cols-2 gap-2 pl-3">
//           <InputField label="H.No" name="hNo" value={formData.hNo} onChange={handleInterceptChange} />
//           <InputField label="Sy.No / Nagar" name="syNo" value={formData.syNo} onChange={handleInterceptChange} />
//           <InputField label="Road / Area" name="road" value={formData.road} onChange={handleInterceptChange} />
//           <InputField label="City / Mandal" name="city" value={formData.city} onChange={handleInterceptChange} />
//           <InputField label="District" name="district" value={formData.district} onChange={handleInterceptChange} />
//           <InputField label="Pin Code" name="pinCode" value={formData.pinCode} onChange={handleInterceptChange} />
//           <InputField label="Landmark" name="landmark" value={formData.landmark} onChange={handleInterceptChange} />
//         </div>
//       </div>

//       {/* 5. VALUATION SUMMARY */}
//       <div className="mb-8 border border-blue-100 bg-blue-50/30 p-3 rounded-lg">
//         <SectionHeader label="5 · Valuation Summary" />
//         <p className="text-[10px] text-gray-500 mb-3 italic">Typing values here will automatically spell them out.</p>
//         <div className="pl-2">
//           <InputField label="Fair Market Value (Rs)" name="fairMarketValue" value={formData.fairMarketValue} onChange={handleInterceptChange} />
//           <TextArea label="Fair Market Value – In Words" name="fairMarketValueWords" value={formData.fairMarketValueWords} onChange={handleInterceptChange} rows={1} />
          
//           <InputField label="Book / Govt Value (Rs)" name="bookValue" value={formData.bookValue} onChange={handleInterceptChange} />
//           <TextArea label="Book Value – In Words" name="bookValueWords" value={formData.bookValueWords} onChange={handleInterceptChange} rows={1} />
          
//           <InputField label="Distress Value (Rs)" name="distressValue" value={formData.distressValue} onChange={handleInterceptChange} />
//           <TextArea label="Distress Value – In Words" name="distressValueWords" value={formData.distressValueWords} onChange={handleInterceptChange} rows={1} />
          
//           <InputField label="Realisable Value (Rs)" name="realisableValue" value={formData.realisableValue} onChange={handleInterceptChange} />
//           <TextArea label="Realisable Value – In Words" name="realisableValueWords" value={formData.realisableValueWords} onChange={handleInterceptChange} rows={1} />
//         </div>
//       </div>

//       {/* 6. PART A – GENERAL (dates & purpose) */}
//       <div className="mb-8">
//         <SectionHeader label="6 · Part A – General" />
//         <div className="grid grid-cols-2 gap-2 pl-3">
//           <InputField label="Purpose of Valuation" name="purposeOfValuation" value={formData.purposeOfValuation} onChange={handleInterceptChange} />
//           <InputField label="Date of Inspection" name="dateOfInspection" value={formData.dateOfInspection} onChange={handleInterceptChange} />
//           <InputField label="Date of Valuation" name="dateOfValuation" value={formData.dateOfValuation} onChange={handleInterceptChange} />
//         </div>
//       </div>

//       {/* 7. DOCUMENTS PRODUCED */}
//       <div className="mb-8">
//         <SectionHeader label="7 · Documents Produced" />
//         <div className="pl-3">
//           <SubLabel label="Document 1" />
//           <div className="grid grid-cols-2 gap-2">
//             <InputField label="Description" name="doc1Description" value={formData.doc1Description} onChange={handleInterceptChange} />
//             <InputField label="Doc No" name="doc1No" value={formData.doc1No} onChange={handleInterceptChange} />
//             <InputField label="Date" name="doc1Date" value={formData.doc1Date} onChange={handleInterceptChange} />
//             <InputField label="Original/Copy" name="doc1Copy" value={formData.doc1Copy} onChange={handleInterceptChange} />
//           </div>
//           <SubLabel label="Document 2" />
//           <div className="grid grid-cols-2 gap-2">
//             <InputField label="Description" name="doc2Description" value={formData.doc2Description} onChange={handleInterceptChange} />
//             <InputField label="Doc No" name="doc2No" value={formData.doc2No} onChange={handleInterceptChange} />
//             <InputField label="Date" name="doc2Date" value={formData.doc2Date} onChange={handleInterceptChange} />
//             <InputField label="Original/Copy" name="doc2Copy" value={formData.doc2Copy} onChange={handleInterceptChange} />
//           </div>
//           <SubLabel label="Document 3" />
//           <div className="grid grid-cols-2 gap-2">
//             <InputField label="Description" name="doc3Description" value={formData.doc3Description} onChange={handleInterceptChange} />
//             <InputField label="Doc No" name="doc3No" value={formData.doc3No} onChange={handleInterceptChange} />
//             <InputField label="Date" name="doc3Date" value={formData.doc3Date} onChange={handleInterceptChange} />
//             <InputField label="Original/Copy" name="doc3Copy" value={formData.doc3Copy} onChange={handleInterceptChange} />
//           </div>
//         </div>
//       </div>

//       {/* 8. BRIEF DESCRIPTION */}
//       <div className="mb-8">
//         <SectionHeader label="8 · Brief Description" />
//         <div className="pl-3">
//           <TextArea label="Description" name="briefDescription" value={formData.briefDescription} onChange={handleInterceptChange} rows={3} />
//         </div>
//       </div>

//       {/* 9. AREA CLASSIFICATION */}
//       <div className="mb-8">
//         <SectionHeader label="9 · Area Classification" />
//         <div className="pl-3">
//           <RadioGroup label="Residential Area" name="residentialArea" options={OPT_RESIDENTIAL_AREA} value={formData.residentialArea} onChange={handleInterceptChange} />
//           <RadioGroup label="High / Middle / Poor" name="classificationHighMiddlePoor" options={OPT_HIGH_MIDDLE_POOR} value={formData.classificationHighMiddlePoor} onChange={handleInterceptChange} />
//           <RadioGroup label="Urban / Semi Urban / Rural" name="urbanSemiUrbanRural" options={OPT_URBAN_RURAL} value={formData.urbanSemiUrbanRural} onChange={handleInterceptChange} />
          
//           <div className="grid grid-cols-2 gap-2">
//             <InputField label="Commercial Area" name="commercialArea" value={formData.commercialArea} onChange={handleInterceptChange} />
//             <InputField label="Industrial Area" name="industrialArea" value={formData.industrialArea} onChange={handleInterceptChange} />
//             <InputField label="Corporation / Municipality" name="corporationVillageMunicipality" value={formData.corporationVillageMunicipality} onChange={handleInterceptChange} />
//           </div>
//         </div>
//       </div>

//       {/* 10. SITE CHARACTERISTICS */}
//       <div className="mb-8">
//         <SectionHeader label="10 · Site Characteristics" />
//         <div className="pl-3">
//           <RadioGroup label="Locality Classification" name="localityClassification" options={OPT_RESIDENTIAL_AREA} value={formData.localityClassification} onChange={handleInterceptChange} />
//           <RadioGroup label="Surrounding Development" name="surroundingDevelopment" options={OPT_SURROUNDING_DEV} value={formData.surroundingDevelopment} onChange={handleInterceptChange} />
//           <RadioGroup label="Flooding Possibility" name="flooding" options={OPT_FLOODING} value={formData.flooding} onChange={handleInterceptChange} />
//           <RadioGroup label="Civic Amenities" name="civicAmenities" options={OPT_CIVIC_AMENITIES} value={formData.civicAmenities} onChange={handleInterceptChange} />
//           <RadioGroup label="Topography & Land Level" name="landLevel" options={OPT_LAND_LEVEL} value={formData.landLevel} onChange={handleInterceptChange} />
//           <RadioGroup label="Shape of Land" name="shapeOfLand" options={OPT_SHAPE} value={formData.shapeOfLand} onChange={handleInterceptChange} />
//           <RadioGroup label="Type of Use" name="typeOfUse" options={OPT_TYPE_OF_USE} value={formData.typeOfUse} onChange={handleInterceptChange} />
//           <RadioGroup label="Usage Restriction" name="usageRestriction" options={OPT_USAGE_RESTRICTION} value={formData.usageRestriction} onChange={handleInterceptChange} />
//           <RadioGroup label="Town Planning Approved" name="townPlanningApproved" options={OPT_TOWN_PLANNING} value={formData.townPlanningApproved} onChange={handleInterceptChange} />
//           <RadioGroup label="Corner / Intermittent Plot" name="cornerOrIntermittent" options={OPT_CORNER_INTERMITTENT} value={formData.cornerOrIntermittent} onChange={handleInterceptChange} />
//           <RadioGroup label="Road Facilities" name="roadFacilities" options={OPT_ROAD_FACILITIES} value={formData.roadFacilities} onChange={handleInterceptChange} />
//           <RadioGroup label="Type of Road" name="typeOfRoad" options={OPT_TYPE_OF_ROAD} value={formData.typeOfRoad} onChange={handleInterceptChange} />
//           <RadioGroup label="Width of Road" name="widthOfRoad" options={OPT_WIDTH_OF_ROAD} value={formData.widthOfRoad} onChange={handleInterceptChange} />
//           <RadioGroup label="Land Locked" name="landLocked" options={OPT_LAND_LOCKED} value={formData.landLocked} onChange={handleInterceptChange} />
//           <RadioGroup label="Water Potentiality" name="waterPotentiality" options={OPT_WATER_POTENTIALITY} value={formData.waterPotentiality} onChange={handleInterceptChange} />
//           <RadioGroup label="Underground Sewerage" name="undergroundSewerage" options={OPT_UNDERGROUND_SEWERAGE} value={formData.undergroundSewerage} onChange={handleInterceptChange} />
//           <RadioGroup label="Power Supply" name="powerSupply" options={OPT_POWER_SUPPLY} value={formData.powerSupply} onChange={handleInterceptChange} />
//           <RadioGroup label="Advantages of Site" name="advantagesOfSite" options={OPT_ADVANTAGES} value={formData.advantagesOfSite} onChange={handleInterceptChange} />
//           <TextArea label="General Remarks" name="generalRemarks" value={formData.generalRemarks} onChange={handleInterceptChange} rows={3} />
//         </div>
//       </div>

//       {/* 11. BOUNDARIES OF PROPERTY */}
//       <div className="mb-8">
//         <SectionHeader label="11 · Boundaries of Property" />
//         <div className="pl-3">
//           <SubLabel label="As per Deed" />
//           <div className="grid grid-cols-2 gap-2">
//             <InputField label="North" name="northBoundaryDeed" value={formData.northBoundaryDeed} onChange={handleInterceptChange} />
//             <InputField label="South" name="southBoundaryDeed" value={formData.southBoundaryDeed} onChange={handleInterceptChange} />
//             <InputField label="East" name="eastBoundaryDeed" value={formData.eastBoundaryDeed} onChange={handleInterceptChange} />
//             <InputField label="West" name="westBoundaryDeed" value={formData.westBoundaryDeed} onChange={handleInterceptChange} />
//           </div>
//           <SubLabel label="As per Actuals" />
//           <div className="grid grid-cols-2 gap-2">
//             <InputField label="North" name="northBoundaryActual" value={formData.northBoundaryActual} onChange={handleInterceptChange} />
//             <InputField label="South" name="southBoundaryActual" value={formData.southBoundaryActual} onChange={handleInterceptChange} />
//             <InputField label="East" name="eastBoundaryActual" value={formData.eastBoundaryActual} onChange={handleInterceptChange} />
//             <InputField label="West" name="westBoundaryActual" value={formData.westBoundaryActual} onChange={handleInterceptChange} />
//           </div>
//         </div>
//       </div>

//       {/* 12. DIMENSIONS OF SITE */}
//       <div className="mb-8">
//         <SectionHeader label="12 · Dimensions of Site" />
//         <div className="pl-3">
//           <SubLabel label="As per Title Deed" />
//           <div className="grid grid-cols-2 gap-2">
//             <InputField label="North" name="northDeedDim" value={formData.northDeedDim} onChange={handleInterceptChange} />
//             <InputField label="South" name="southDeedDim" value={formData.southDeedDim} onChange={handleInterceptChange} />
//             <InputField label="East" name="eastDeedDim" value={formData.eastDeedDim} onChange={handleInterceptChange} />
//             <InputField label="West" name="westDeedDim" value={formData.westDeedDim} onChange={handleInterceptChange} />
//           </div>
//           <SubLabel label="Actuals" />
//           <div className="grid grid-cols-2 gap-2">
//             <InputField label="North" name="northActualDim" value={formData.northActualDim} onChange={handleInterceptChange} />
//             <InputField label="South" name="southActualDim" value={formData.southActualDim} onChange={handleInterceptChange} />
//             <InputField label="East" name="eastActualDim" value={formData.eastActualDim} onChange={handleInterceptChange} />
//             <InputField label="West" name="westActualDim" value={formData.westActualDim} onChange={handleInterceptChange} />
//           </div>
//         </div>
//       </div>

//       {/* 13. SITE EXTENT & COORDINATES */}
//       <div className="mb-8">
//         <SectionHeader label="13 · Site Extent & Coordinates" />
//         <div className="grid grid-cols-2 gap-2 pl-3">
//           <InputField label="Extent (Sq.Yds)" name="extentSqYds" value={formData.extentSqYds} onChange={handleInterceptChange} />
//           <InputField label="Rate (Rs/Sq.Yd)" name="landRatePerSqYd" value={formData.landRatePerSqYd} onChange={handleInterceptChange} />
//           <InputField label="Extent as per Deed" name="extentAsPerDeed" value={formData.extentAsPerDeed} onChange={handleInterceptChange} />
//           <InputField label="Extent for Valuation" name="extentForValuation" value={formData.extentForValuation} onChange={handleInterceptChange} />
//           <InputField label="Latitude" name="latitude" value={formData.latitude} onChange={handleInterceptChange} />
//           <InputField label="Longitude" name="longitude" value={formData.longitude} onChange={handleInterceptChange} />
//           <InputField label="Occupied By / Rent" name="occupiedBy" value={formData.occupiedBy} onChange={handleInterceptChange} />
//         </div>
//       </div>

//       {/* 14. LAND VALUATION – PART A */}
//       <div className="mb-8">
//         <SectionHeader label="14 · Land Valuation – Part A" />
//         <div className="grid grid-cols-2 gap-2 pl-3">
//           <InputField label="Guideline Rate (Rs/Sq.Yd)" name="guidelineRate" value={formData.guidelineRate} onChange={handleInterceptChange} />
//           <InputField label="Land Value by GLR (Rs)" name="landValueGLR" value={formData.landValueGLR} onChange={handleInterceptChange} />
//           <InputField label="PMR Range" name="prevailingMarketRateRange" value={formData.prevailingMarketRateRange} onChange={handleInterceptChange} />
//           <InputField label="Unit Rate PMR (Rs/Sq.Yd)" name="unitRatePMR" value={formData.unitRatePMR} onChange={handleInterceptChange} />
//           <InputField label="Land Value by PMR (Rs)" name="landValuePMR" value={formData.landValuePMR} onChange={handleInterceptChange} />
//         </div>
//       </div>

//       {/* 15. BUILDING TECHNICAL DETAILS – PART B */}
//       <div className="mb-8">
//         <SectionHeader label="15 · Building Technical Details – Part B" />
//         <p className="text-[10px] text-gray-500 mb-2 pl-3 italic">Age and Future Life auto-calculate when Year is entered.</p>
//         <div className="pl-3">
//           <RadioGroup label="Type of Building" name="typeOfBuilding" options={OPT_TYPE_BUILDING} value={formData.typeOfBuilding} onChange={handleInterceptChange} />
//           <RadioGroup label="Type of Construction" name="typeOfConstruction" options={OPT_TYPE_CONSTRUCTION} value={formData.typeOfConstruction} onChange={handleInterceptChange} />
//           <RadioGroup label="Quality of Construction" name="qualityOfConstruction" options={OPT_QUALITY} value={formData.qualityOfConstruction} onChange={handleInterceptChange} />
//           <RadioGroup label="Appearance of Building" name="appearanceOfBuilding" options={OPT_APPEARANCE} value={formData.appearanceOfBuilding} onChange={handleInterceptChange} />
//           <RadioGroup label="Maintenance – Exterior" name="maintenanceExterior" options={OPT_MAINTENANCE} value={formData.maintenanceExterior} onChange={handleInterceptChange} />
//           <RadioGroup label="Maintenance – Interior" name="maintenanceInterior" options={OPT_MAINTENANCE} value={formData.maintenanceInterior} onChange={handleInterceptChange} />
          
//           <div className="grid grid-cols-2 gap-2 mt-4">
//             <InputField label="Year of Construction" name="yearOfConstruction" value={formData.yearOfConstruction} onChange={handleInterceptChange} />
//             <InputField label="Age of Building" name="ageOfBuilding" value={formData.ageOfBuilding} onChange={handleInterceptChange} />
//             <InputField label="Total Life (yrs)" name="totalLifeOfBuilding" value={formData.totalLifeOfBuilding} onChange={handleInterceptChange} />
//             <InputField label="Expected Future Life" name="expectedFutureLife" value={formData.expectedFutureLife} onChange={handleInterceptChange} />
//             <InputField label="Genuineness Verified" name="genuinenessVerified" value={formData.genuinenessVerified} onChange={handleInterceptChange} />
//           </div>
          
//           <TextArea label="No. of Floors & Height" name="numberOfFloorsHeight" value={formData.numberOfFloorsHeight} onChange={handleInterceptChange} rows={1} />
//           <TextArea label="Drawing Approval Date / Validity" name="drawingApprovalDate" value={formData.drawingApprovalDate} onChange={handleInterceptChange} rows={1} />
//           <TextArea label="Approved Map / Plan Authority" name="approvedMapAuthority" value={formData.approvedMapAuthority} onChange={handleInterceptChange} rows={2} />
//           <TextArea label="Any Other Comments (Plan)" name="anyOtherComments" value={formData.anyOtherComments} onChange={handleInterceptChange} rows={2} />
//         </div>
//       </div>

//       {/* 16. PLINTH AREA – FLOOR-WISE */}
//       <div className="mb-8">
//         <SectionHeader label="16 · Plinth Area – Floor-wise" />
//         <div className="pl-3">
//           <SubLabel label="Ground Floor" />
//           <div className="grid grid-cols-2 gap-2">
//             <InputField label="Year of Construction" name="groundFloorYear" value={formData.groundFloorYear} onChange={handleInterceptChange} />
//             <InputField label="Main Portion (Sq.ft)" name="groundFloorMainArea" value={formData.groundFloorMainArea} onChange={handleInterceptChange} />
//             <InputField label="Cantilevered Portion" name="groundFloorCantArea" value={formData.groundFloorCantArea} onChange={handleInterceptChange} />
//             <InputField label="Total A+50%B (Sq.ft)" name="groundFloorTotal" value={formData.groundFloorTotal} onChange={handleInterceptChange} />
//           </div>
//         </div>
//       </div>

//       {/* 17. SPECIFICATIONS OF CONSTRUCTION */}
//       <div className="mb-8">
//         <SectionHeader label="17 · Specifications of Construction" />
//         <div className="pl-3">
//           <RadioGroup label="Foundation" name="specFoundation" options={OPT_FOUNDATION} value={formData.specFoundation} onChange={handleInterceptChange} />
//           <RadioGroup label="Basement / Flooring" name="specBasement" options={OPT_FLOORING} value={formData.specBasement} onChange={handleInterceptChange} />
//           <RadioGroup label="Super Structure" name="specSuperStructure" options={OPT_SUPER_STRUCTURE} value={formData.specSuperStructure} onChange={handleInterceptChange} />
//           <RadioGroup label="Joinery / Doors & Windows" name="specJoinery" options={OPT_JOINERY} value={formData.specJoinery} onChange={handleInterceptChange} />
//           <RadioGroup label="RCC Works" name="specRCCWorks" options={OPT_RCC_WORKS} value={formData.specRCCWorks} onChange={handleInterceptChange} />
//           <RadioGroup label="Plastering" name="specPlastering" options={OPT_PLASTERING} value={formData.specPlastering} onChange={handleInterceptChange} />
//           <RadioGroup label="Flooring / Skirting / Dadoing" name="specFlooring" options={OPT_FLOORING} value={formData.specFlooring} onChange={handleInterceptChange} />
//           <RadioGroup label="Special Finish" name="specSpecialFinish" options={OPT_SPECIAL_FINISH} value={formData.specSpecialFinish} onChange={handleInterceptChange} />
//           <RadioGroup label="Roofing" name="specRoofing" options={OPT_ROOFING} value={formData.specRoofing} onChange={handleInterceptChange} />
//           <RadioGroup label="Drainage" name="specDrainage" options={OPT_DRAINAGE} value={formData.specDrainage} onChange={handleInterceptChange} />
//         </div>
//       </div>

//       {/* 18. COMPOUND WALL (Building Section) */}
//       <div className="mb-8">
//         <SectionHeader label="18 · Compound Wall (Building Section)" />
//         <div className="grid grid-cols-2 gap-2 pl-3">
//           <InputField label="Length (R.ft)" name="compWallBuildingRft" value={formData.compWallBuildingRft} onChange={handleInterceptChange} />
//           <InputField label="Rate (Rs/rft)" name="compWallBuildingRate" value={formData.compWallBuildingRate} onChange={handleInterceptChange} />
//           <InputField label="Height" name="compWallBuildingHeight" value={formData.compWallBuildingHeight} onChange={handleInterceptChange} />
//           <InputField label="Length (ft)" name="compWallBuildingLength" value={formData.compWallBuildingLength} onChange={handleInterceptChange} />
//           <InputField label="Type of Construction" name="compWallBuildingType" value={formData.compWallBuildingType} onChange={handleInterceptChange} />
//         </div>
//       </div>

//       {/* 19. ELECTRICAL INSTALLATION */}
//       <div className="mb-8">
//         <SectionHeader label="19 · Electrical Installation" />
//         <div className="pl-3">
//           <RadioGroup label="Type of Wiring" name="typeOfWiring" options={OPT_WIRING} value={formData.typeOfWiring} onChange={handleInterceptChange} />
//           <RadioGroup label="Class of Fittings" name="classOfFittings" options={OPT_FITTINGS} value={formData.classOfFittings} onChange={handleInterceptChange} />
//           <RadioGroup label="Number of Light Points" name="numberOfLightPoints" options={OPT_LIGHT_POINTS} value={formData.numberOfLightPoints} onChange={handleInterceptChange} />
//           <RadioGroup label="Fan Points" name="fanPoints" options={OPT_FAN_POINTS} value={formData.fanPoints} onChange={handleInterceptChange} />
//           <RadioGroup label="Spare Plug Points" name="sparePlugPoints" options={OPT_PLUG_POINTS} value={formData.sparePlugPoints} onChange={handleInterceptChange} />
//           <RadioGroup label="Any Other Electrical" name="anyOtherElectrical" options={OPT_OTHER_ELEC} value={formData.anyOtherElectrical} onChange={handleInterceptChange} />
//           <div className="grid grid-cols-2 gap-2 mt-4">
//             <InputField label="Electrical Lumpsum (Rs)" name="electricalLumpsum" value={formData.electricalLumpsum} onChange={handleInterceptChange} />
//           </div>
//         </div>
//       </div>

//       {/* 20. PLUMBING INSTALLATION */}
//       <div className="mb-8">
//         <SectionHeader label="20 · Plumbing Installation" />
//         <div className="pl-3">
//           <RadioGroup label="No. of water closets & type" name="waterClosets" options={OPT_WATER_CLOSETS} value={formData.waterClosets} onChange={handleInterceptChange} />
//           <div className="grid grid-cols-2 gap-2 mt-4">
//             <InputField label="Wash Basins" name="washBasins" value={formData.washBasins} onChange={handleInterceptChange} />
//             <InputField label="Urinals" name="urinals" value={formData.urinals} onChange={handleInterceptChange} />
//             <InputField label="Bath Tubs" name="bathTubs" value={formData.bathTubs} onChange={handleInterceptChange} />
//             <InputField label="Water Meters / Taps" name="waterMeters" value={formData.waterMeters} onChange={handleInterceptChange} />
//             <InputField label="Plumbing Lumpsum (Rs)" name="plumbingLumpsum" value={formData.plumbingLumpsum} onChange={handleInterceptChange} />
//           </div>
//         </div>
//       </div>

//       {/* 21. BUILDING VALUATION – DETAILS OF VALUATION */}
//       <div className="mb-8 border border-green-100 bg-green-50/30 p-3 rounded-lg">
//         <SectionHeader label="21 · Building Valuation Details" />
//         <p className="text-[10px] text-gray-500 mb-3 italic">Net Value auto-calculates when Replacement Cost & Depreciation are entered.</p>
//         <div className="pl-2">
//           <SubLabel label="Ground Floor" />
//           <div className="grid grid-cols-2 gap-2">
//             <InputField label="Plinth Area (Sq.ft)" name="groundFloorPlinthArea" value={formData.groundFloorPlinthArea} onChange={handleInterceptChange} />
//             <InputField label="Rate (Rs/Sq.ft)" name="groundFloorRate" value={formData.groundFloorRate} onChange={handleInterceptChange} />
//             <InputField label="Age of Building" name="groundFloorAge" value={formData.groundFloorAge} onChange={handleInterceptChange} />
//             <InputField label="Replacement Cost (Rs)" name="groundFloorReplacementCost" value={formData.groundFloorReplacementCost} onChange={handleInterceptChange} />
//             <InputField label="Depreciation (Rs)" name="groundFloorDepreciation" value={formData.groundFloorDepreciation} onChange={handleInterceptChange} />
//             <InputField label="Net Value after Dep. (Rs)" name="groundFloorNetValue" value={formData.groundFloorNetValue} onChange={handleInterceptChange} />
//           </div>
//           <InputField label="Building Total (Rs)" name="buildingTotal" value={formData.buildingTotal} onChange={handleInterceptChange} />
//         </div>
//       </div>

//       {/* 22. EXTRA ITEMS – PART C */}
//       <div className="mb-8">
//         <SectionHeader label="22 · Extra Items – Part C (Rs)" />
//         <div className="grid grid-cols-2 gap-2 pl-3">
//           <InputField label="Portico" name="portico" value={formData.portico} onChange={handleInterceptChange} />
//           <InputField label="Ornamental / Pooja Door" name="ornamentalDoor" value={formData.ornamentalDoor} onChange={handleInterceptChange} />
//           <InputField label="Sit-out / Verandah with Grills" name="sitOutVerandah" value={formData.sitOutVerandah} onChange={handleInterceptChange} />
//           <InputField label="Overhead Water Tank" name="overheadWaterTank" value={formData.overheadWaterTank} onChange={handleInterceptChange} />
//           <InputField label="Extra Steel / Collapsible Gates" name="extraGates" value={formData.extraGates} onChange={handleInterceptChange} />
//           <InputField label="Extra Items Total (Rs)" name="extraItemsTotal" value={formData.extraItemsTotal} onChange={handleInterceptChange} />
//         </div>
//       </div>

//       {/* 23. AMENITIES – PART D */}
//       <div className="mb-8">
//         <SectionHeader label="23 · Amenities – Part D (Rs)" />
//         <div className="grid grid-cols-2 gap-2 pl-3">
//           <InputField label="Wardrobes / Showcases" name="wardrobes" value={formData.wardrobes} onChange={handleInterceptChange} />
//           <InputField label="Glazed Tiles" name="glazedTiles" value={formData.glazedTiles} onChange={handleInterceptChange} />
//           <InputField label="Extra Sinks & Bath Tub" name="extraSinksBathtub" value={formData.extraSinksBathtub} onChange={handleInterceptChange} />
//           <InputField label="Marble / Ceramic Tiles Flooring" name="marbleCeramicTiles" value={formData.marbleCeramicTiles} onChange={handleInterceptChange} />
//           <InputField label="Interior Decorations" name="interiorDecorations" value={formData.interiorDecorations} onChange={handleInterceptChange} />
//           <InputField label="Architectural Elevation Works" name="architecturalElevation" value={formData.architecturalElevation} onChange={handleInterceptChange} />
//           <InputField label="Panelling Works" name="panellingWorks" value={formData.panellingWorks} onChange={handleInterceptChange} />
//           <InputField label="Aluminium Works" name="aluminiumWorks" value={formData.aluminiumWorks} onChange={handleInterceptChange} />
//           <InputField label="Aluminium Hand Rails" name="aluminiumHandRails" value={formData.aluminiumHandRails} onChange={handleInterceptChange} />
//           <InputField label="False Ceiling Area (Sq.ft)" name="falseCeilingArea" value={formData.falseCeilingArea} onChange={handleInterceptChange} />
//           <InputField label="False Ceiling Rate (Rs/Sq.ft)" name="falseCeilingRate" value={formData.falseCeilingRate} onChange={handleInterceptChange} />
//           <InputField label="False Ceiling Value (Rs)" name="falseCeilingValue" value={formData.falseCeilingValue} onChange={handleInterceptChange} />
//           <InputField label="Amenities Total (Rs)" name="amenitiesTotal" value={formData.amenitiesTotal} onChange={handleInterceptChange} />
//         </div>
//       </div>

//       {/* 24. MISCELLANEOUS – PART E */}
//       <div className="mb-8">
//         <SectionHeader label="24 · Miscellaneous – Part E (Rs)" />
//         <div className="grid grid-cols-2 gap-2 pl-3">
//           <InputField label="Separate Lumber Room" name="separateLumberRoom" value={formData.separateLumberRoom} onChange={handleInterceptChange} />
//           <InputField label="Separate Toilet Room" name="separateToiletRoom" value={formData.separateToiletRoom} onChange={handleInterceptChange} />
//           <InputField label="Separate Water Tank / Sump" name="separateWaterTank" value={formData.separateWaterTank} onChange={handleInterceptChange} />
//           <InputField label="Trees / Gardening" name="treesGardening" value={formData.treesGardening} onChange={handleInterceptChange} />
//           <InputField label="Miscellaneous Total (Rs)" name="miscTotal" value={formData.miscTotal} onChange={handleInterceptChange} />
//         </div>
//       </div>

//       {/* 25. SERVICES – PART E */}
//       <div className="mb-8">
//         <SectionHeader label="25 · Services – Part E (Rs)" />
//         <div className="pl-3">
//           <SubLabel label="Water Supply Arrangements" />
//           <div className="grid grid-cols-2 gap-2">
//             <InputField label="Open Well" name="openWell" value={formData.openWell} onChange={handleInterceptChange} />
//             <InputField label="Deep Bore" name="deepBore" value={formData.deepBore} onChange={handleInterceptChange} />
//             <InputField label="Hand Pump" name="handPump" value={formData.handPump} onChange={handleInterceptChange} />
//             <InputField label="Motor" name="motor" value={formData.motor} onChange={handleInterceptChange} />
//             <InputField label="Corporation Tap" name="corporationTap" value={formData.corporationTap} onChange={handleInterceptChange} />
//             <InputField label="Under Ground Level Sump" name="underGroundSump" value={formData.underGroundSump} onChange={handleInterceptChange} />
//             <InputField label="Overhead Tank (Services)" name="overheadTankServices" value={formData.overheadTankServices} onChange={handleInterceptChange} />
//           </div>
//           <SubLabel label="Drainage Arrangements" />
//           <div className="grid grid-cols-2 gap-2">
//             <InputField label="Septic Tank" name="septicTank" value={formData.septicTank} onChange={handleInterceptChange} />
//             <InputField label="Underground Sewage" name="undergroundSewage" value={formData.undergroundSewage} onChange={handleInterceptChange} />
//           </div>
//           <SubLabel label="Compound Wall (Services Section)" />
//           <div className="grid grid-cols-2 gap-2">
//             <InputField label="Length (R.ft)" name="compoundWallRft" value={formData.compoundWallRft} onChange={handleInterceptChange} />
//             <InputField label="Rate (Rs/rft)" name="compoundWallRate" value={formData.compoundWallRate} onChange={handleInterceptChange} />
//             <InputField label="Height" name="compoundWallHeight" value={formData.compoundWallHeight} onChange={handleInterceptChange} />
//             <InputField label="Length (ft)" name="compoundWallLength" value={formData.compoundWallLength} onChange={handleInterceptChange} />
//             <InputField label="Type of Construction" name="compoundWallType" value={formData.compoundWallType} onChange={handleInterceptChange} />
//             <InputField label="Compound Wall Value (Rs)" name="compoundWallValue" value={formData.compoundWallValue} onChange={handleInterceptChange} />
//           </div>
//           <SubLabel label="Pavements" />
//           <div className="grid grid-cols-2 gap-2">
//             <InputField label="Pavements (Sq.ft)" name="pavementsSqft" value={formData.pavementsSqft} onChange={handleInterceptChange} />
//             <InputField label="Pavements Rate (Rs/Sq.ft)" name="pavementsRate" value={formData.pavementsRate} onChange={handleInterceptChange} />
//             <InputField label="Pavements Value (Rs)" name="pavementsValue" value={formData.pavementsValue} onChange={handleInterceptChange} />
//             <InputField label="Services Total (Rs)" name="servicesTotal" value={formData.servicesTotal} onChange={handleInterceptChange} />
//           </div>
//         </div>
//       </div>

//       {/* 26. ABSTRACT VALUE – PART F */}
//       <div className="mb-8">
//         <SectionHeader label="26 · Abstract Value – Part F (Rs)" />
//         <div className="grid grid-cols-2 gap-2 pl-3">
//           <InputField label="Land (GLR)" name="landGLR" value={formData.landGLR} onChange={handleInterceptChange} />
//           <InputField label="Land (PMR)" name="landPMR" value={formData.landPMR} onChange={handleInterceptChange} />
//           <InputField label="Building (GLR)" name="buildingGLR" value={formData.buildingGLR} onChange={handleInterceptChange} />
//           <InputField label="Building (PMR)" name="buildingPMR" value={formData.buildingPMR} onChange={handleInterceptChange} />
//           <InputField label="Extra Items" name="extraItemsAbstract" value={formData.extraItemsAbstract} onChange={handleInterceptChange} />
//           <InputField label="Amenities" name="amenitiesAbstract" value={formData.amenitiesAbstract} onChange={handleInterceptChange} />
//           <InputField label="Miscellaneous" name="miscAbstract" value={formData.miscAbstract} onChange={handleInterceptChange} />
//           <InputField label="Services" name="servicesAbstract" value={formData.servicesAbstract} onChange={handleInterceptChange} />
//           <InputField label="Total (GLR)" name="totalGLR" value={formData.totalGLR} onChange={handleInterceptChange} />
//           <InputField label="Total (PMR)" name="totalPMR" value={formData.totalPMR} onChange={handleInterceptChange} />
//           <InputField label="Present Market Value (Rs)" name="presentMarketValue" value={formData.presentMarketValue} onChange={handleInterceptChange} />
//         </div>
//       </div>

//       {/* 27. CERTIFICATE & DECLARATION DATES */}
//       <div className="mb-8">
//         <SectionHeader label="27 · Certificate & Declaration" />
//         <div className="grid grid-cols-2 gap-2 pl-3">
//           <InputField label="Title Deed No" name="titleDeedNo" value={formData.titleDeedNo} onChange={handleInterceptChange} />
//           <InputField label="Title Deed Date" name="titleDeedDate" value={formData.titleDeedDate} onChange={handleInterceptChange} />
//           <InputField label="Appointment Date" name="appointmentDate" value={formData.appointmentDate} onChange={handleInterceptChange} />
//           <InputField label="Inspection Date" name="inspectionDate" value={formData.inspectionDate} onChange={handleInterceptChange} />
//           <InputField label="Valuation Date" name="valuationDate" value={formData.valuationDate} onChange={handleInterceptChange} />
//           <InputField label="Report Date" name="reportDate" value={formData.reportDate} onChange={handleInterceptChange} />
//         </div>
//       </div>

//     </div>
//   );
// }

import React from "react";
import { FormData } from '@/app/(Drafter)/types/types';

interface Props {
  formData: FormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

// ── Indian Number to Words ────────────────────────────────────────────────────
export const spellNumberIndian = (numInput: string | number): string => {
  let numStr = numInput.toString().replace(/,/g, '').split('.')[0];
  if (isNaN(Number(numStr)) || numStr === '') return '';
  if (Number(numStr) === 0) return 'No Rupees';
  const a = ['','One','Two','Three','Four','Five','Six','Seven','Eight','Nine','Ten','Eleven','Twelve','Thirteen','Fourteen','Fifteen','Sixteen','Seventeen','Eighteen','Nineteen'];
  const b = ['','','Twenty','Thirty','Forty','Fifty','Sixty','Seventy','Eighty','Ninety'];
  const getWords = (n: string) => {
    let str = ''; const num = Number(n);
    if (num > 19) str += b[Math.floor(num/10)] + (num%10 !== 0 ? ' '+a[num%10] : '');
    else str += a[num];
    return str.trim();
  };
  if (numStr.length > 9) return 'Amount too large';
  const n = ('000000000' + numStr).slice(-9);
  let out = '';
  if (Number(n.slice(0,2))>0) out += getWords(n.slice(0,2))+' Crores ';
  if (Number(n.slice(2,4))>0) out += getWords(n.slice(2,4))+' Lacs ';
  if (Number(n.slice(4,6))>0) out += getWords(n.slice(4,6))+' Thousand ';
  if (Number(n.slice(6,7))>0) out += getWords(n.slice(6,7))+' Hundred ';
  if (Number(n.slice(7,9))>0) { if (out!=='') out+='and '; out+=getWords(n.slice(7,9)); }
  out = out.trim();
  if (out==='One') return 'One Rupee';
  return out+' Rupees';
};

const parseNum = (v: string | number | undefined) =>
  parseFloat((v ?? '0').toString().replace(/,/g, '')) || 0;

const fmtINR = (n: number) =>
  n > 0 ? Math.round(n).toLocaleString('en-IN') : '0';

// ── UI Sub-components ─────────────────────────────────────────────────────────

function SectionHeader({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2 mb-3 mt-1">
      <div className="w-3.5 h-3.5 bg-[#00a0ef] rounded-[2px] flex-shrink-0" />
      <h3 className="text-[12px] font-semibold text-gray-800 leading-tight">{label}</h3>
    </div>
  );
}

function SubLabel({ label }: { label: string }) {
  return (
    <p className="text-[10px] font-bold text-gray-500 mb-1.5 mt-3 uppercase tracking-wide border-b border-gray-200 pb-0.5">
      {label}
    </p>
  );
}

const InputField = ({ label, name, value, onChange, readOnly = false }: any) => (
  <div className="mb-2">
    <label className="block text-[10px] font-semibold text-gray-500 uppercase mb-0.5 leading-tight">{label}</label>
    <input
      type="text" name={name} value={value ?? ''} onChange={onChange} readOnly={readOnly}
      className={`w-full px-2 py-1 border rounded text-[11.5px] text-gray-800 focus:outline-none focus:border-[#00a0ef] focus:ring-1 focus:ring-[#00a0ef] transition-colors ${readOnly ? 'bg-gray-100 border-gray-200 text-gray-500 cursor-not-allowed' : 'border-gray-300 bg-white'}`}
    />
  </div>
);

const TextArea = ({ label, name, value, onChange, rows = 2 }: any) => (
  <div className="mb-2">
    <label className="block text-[10px] font-semibold text-gray-500 uppercase mb-0.5 leading-tight">{label}</label>
    <textarea
      name={name} value={value ?? ''} onChange={onChange} rows={rows}
      className="w-full px-2 py-1 border border-gray-300 rounded text-[11.5px] text-gray-800 focus:outline-none focus:border-[#00a0ef] focus:ring-1 focus:ring-[#00a0ef] resize-none bg-gray-50 transition-colors"
    />
  </div>
);

const RadioGroup = ({ label, name, options, value, onChange }: any) => (
  <div className="mb-3 bg-gray-50 border border-gray-200 rounded p-2">
    <label className="block text-[10px] font-bold text-gray-600 uppercase mb-1.5 leading-tight">{label}</label>
    <div className="flex flex-col gap-1">
      {options.map((opt: string) => (
        <label key={opt} className={`flex items-start gap-1.5 text-[11px] cursor-pointer p-1 rounded transition-colors ${value===opt ? 'bg-blue-50 text-blue-800 font-medium' : 'text-gray-700 hover:bg-gray-100'}`}>
          <input type="radio" name={name} value={opt} checked={value===opt} onChange={onChange} className="mt-0.5 flex-shrink-0 accent-[#00a0ef]" />
          <span className="leading-tight">{opt}</span>
        </label>
      ))}
    </div>
  </div>
);

// Radio with numeric values (Part C / D / E)
const RadioMoney = ({ label, name, options, value, onChange }: { label: string; name: string; options: number[]; value: string; onChange: any }) => (
  <div className="mb-3 bg-gray-50 border border-gray-200 rounded p-2">
    <label className="block text-[10px] font-bold text-gray-600 uppercase mb-1.5 leading-tight">{label}</label>
    <div className="flex flex-wrap gap-1.5">
      {options.map((opt) => {
        const strVal = opt === 0 ? '0' : opt.toLocaleString('en-IN');
        return (
          <label key={opt} className={`flex items-center gap-1 text-[11px] cursor-pointer px-2 py-0.5 rounded border transition-colors ${value===strVal||value===opt.toString() ? 'bg-blue-100 border-blue-400 text-blue-800 font-bold' : 'border-gray-300 text-gray-700 hover:bg-gray-100'}`}>
            <input type="radio" name={name} value={strVal} checked={value===strVal||value===opt.toString()} onChange={onChange} className="accent-[#00a0ef]" />
            {opt === 0 ? 'Nil / 0' : `₹${opt.toLocaleString('en-IN')}`}
          </label>
        );
      })}
    </div>
  </div>
);

// ── Radio option constants (exact text from plan.md) ─────────────────────────

const OPT_RESIDENTIAL_AREA = [
  "Residential Zone as per Master Plan",
  "Mixed residntial cum commercial Zone",
  "Industrial Classification with few residential dwellings nearby",
  "falls under semi-urban/peri-urban category",
];
const OPT_HIGH_MIDDLE_POOR = ["High","Middle","Poor"];
const OPT_URBAN_RURAL = ["Urban","Semi Urban","Rural"];

const OPT_LOCALITY_CLASSIFICATION = [
  "Residential Zone as per Master Plan",
  "Mixed residntial cum commercial Zone",
  "Industrial Classification with few residential dwellings nearby",
  "falls under semi-urban/peri-urban category",
];
const OPT_SURROUNDING_DEV = [
  "Surrounding area is well developed with paved roads, houses, and shops",
  "Moderately developed area with upcoming residential layouts",
  "Developing area with few built-up properties and open plots",
  "Underdeveloped area with limited civic infrastructure",
];
const OPT_FLOODING = [
  "No history of flooding; land level is higher than adjoining road.",
  "Minor waterlogging during heavy rains, otherwise safe.",
  "Low-lying area prone to temporary stagnation during monsoon",
  "Located in flood-prone zone; precaution required during heavy rainfall.",
];
const OPT_CIVIC = [
  "All major civic amenities are available within 1 km radius.",
  "Schools and shops nearby; hospital and market within moderate distance.",
  "Basic amenities available; higher-order facilities at 2–3 km distance.",
  "Limited civic amenities; accessibility depends on private transport.",
];
const OPT_LAND_LEVEL = [
  "Land is level and matches surrounding ground.",
  "Gently sloping terrain with proper drainage.",
  "Slightly elevated land providing good drainage.",
  "Low-lying land requiring filling to match road level.",
  "Marsh",
];
const OPT_SHAPE = [
  "Regular rectangular plot.",
  "Square-shaped plot suitable for efficient development.",
  "Irregular shape but usable without much constraint.",
  "Triangular/narrow plot with some planning limitations.",
];
const OPT_TYPE_USE = [
  "Suitable for residential construction.",
  "Suitable for residential-cum-commercial use.",
  "Suitable for industrial/warehouse use.",
  "Suitable for institutional or office building purpose.",
];
const OPT_USAGE_RESTRICTION = [
  "No known usage restriction as per local authority.",
  "Subject to residential use only.",
  "Use restricted as per layout or development control rules.",
  "Within agricultural zone — conversion required for non-agricultural use.",
];
const OPT_TOWN_PLANNING = [
  "Yes, within approved layout as per local authority.",
  "Not in approved layout but falls in LRS Regularized Area",
  "Unapproved layout; independent site outside planning area",
  "Within GP Limits Approval",
  "Within GP Limits",
];
const OPT_CORNER = [
  "Intermittent plot with single road frontage.",
  "Corner plot with two-side road frontage.",
  "End plot of a road with one open side.",
  "Interior plot with access via internal road.",
];
const OPT_ROAD_FACILITIES = [
  "Public Road",
  "Private Road",
  "Good road connectivity with public transport access.",
  "Moderate road width and connectivity.",
  "Limited road access with narrow approach.",
];
const OPT_TYPE_ROAD = ["WBM Road","CC Road","BT Road","Kacha Road","Internal Road"];
const OPT_WIDTH_ROAD = ["Above 20' Wide","Below 20 Ft Wide"];
const OPT_LAND_LOCKED = [
  "No, plot has direct road access.",
  "Access available through internal layout road.",
  "Indirect access through private pathway / right of way.",
  "Yes land-locked without proper approach.",
];
const OPT_WATER = [
  "Borewell / open well source available.",
  "Municipal water supply available.",
  "Both municipal and borewell water sources available",
  "No assured water source; to be arranged independently.",
];
const OPT_SEWERAGE = [
  "Septic tank system in use; no underground network.",
  "Drainage under development by local authority",
  "Underground drainage system available",
  "No formal drainage; open stormwater drains present.",
];
const OPT_POWER = [
  "Power supply available through local electricity board.",
  "Power poles in vicinity; connection to be obtained.",
  "No power supply network presently available.",
];
const OPT_ADVANTAGES = [
  "Nil",
  "All amenities are with in walkable distance, it is fully developed residential area",
  "It is in the prime locality with high market demand for Housing development",
];

// Part B
const OPT_TYPE_BUILDING = [
  "Independent residential house (single-family dwelling)",
  "Commercial building / shop / office premises",
  "Apartment / Flat in a multi-storied residential complex",
  "Industrial / warehouse / factory structure",
  "Mixed-use building (residential with commercial portion)",
];
const OPT_TYPE_CONSTRUCTION = [
  "RCC framed structure with brick walls and reinforced concrete roof.",
  "Load-bearing structure with brick walls and RCC / slab roofing.",
  "Semi-pucca structure with brick walls and tiled / ACC sheet roof.",
  "Temporary structure with tin / asbestos roofing and light foundations.",
  "Steel / pre-engineered industrial shed with sheet roofing.",
];
const OPT_QUALITY = [
  "Good quality construction with superior materials and workmanship",
  "Average quality construction using standard materials",
  "Fair quality construction with moderate finishing",
  "Poor quality construction with basic materials and limited finish.",
  "Superior quality with high-end specifications and architectural detailing",
];
const OPT_APPEARANCE = [
  "Appears neat, well-designed, and aesthetically pleasing.",
  "Functional and presentable appearance suitable for the locality.",
  "Moderately appealing, showing minor signs of age or wear.",
  "Dull / outdated appearance requiring renovation.",
  "Modern elevation with good architectural finish.",
];
const OPT_MAINTENANCE = [
  "Well maintained; in good habitable condition",
  "Fairly maintained; minor repairs required",
  "Poorly maintained; shows signs of neglect and deterioration",
  "Recently constructed and in excellent condition",
  "Old structure but maintained satisfactorily.",
];
const OPT_DRAWING_APPROVAL = [
  "As per copy provided by the applicant, layout approval was issued on [insert date]; validity period not mentioned in the plan.",
  "Approval dated [insert date] valid as per norms of the concerned authority.",
  "Copy of layout approval not furnished; hence validity could not be verified.",
  "Layout plan approval not applicable, as the property falls under old developed area without layout sanction requirement.",
];
const OPT_MAP_AUTHORITY = [
  "As per copy produced, approval is issued by Municipal Corporation / Town Planning Department / Gram Panchayat / DTCP, etc.",
  "No approval document was provided for verification.",
  "The plan appears to have been sanctioned by the local authority based on markings and signatures seen on the plan copy.",
  "Layout plan submitted is an unapproved sketch and not authenticated by any statutory authority.",
];
const OPT_GENUINENESS = [
  "Verified based on the stamped/signed copy furnished by the client.",
  "Physical verification of genuineness with the issuing authority has not been carried out — authenticity assumed based on documents provided.",
  "Could not be verified with the authority due to non-availability of online or official verification mechanism",
  "Document appears genuine in format and content, but no independent cross-verification was possible.",
];
const OPT_VALUER_COMMENTS = [
  "Approval document appears in order and consistent with the property layout observed at site.",
  "The approval plan bears official stamps but genuineness could not be independently confirmed.",
  "Plan copy does not bear clear reference number or sanction details; hence authenticity could not be confirmed.",
  "The property layout and construction appear broadly in line with the plan submitted.",
];

// Specifications
const OPT_FOUNDATION = [
  "Random rubble masonry foundation in cement mortar below plinth level; standard PCC bed.",
  "RCC column and footing type foundation with adequate reinforcement as per structural design.",
  "RCC isolated/pedestal footing with plinth beams; anti-termite treatment provided.",
  "Pile/raft foundation with advanced waterproofing and soil stabilization measures.",
];
const OPT_BASEMENT = [
  "Vitrified tiles flooring in all rooms; anti-skid ceramic tiles in toilets and balconies.",
  "Marble flooring in main areas; ceramic tiles in kitchen and toilets.",
  "Polished Kota stone flooring with cement skirting.",
  "No basement provided; only plinth level structure.",
  "Granite flooring in living area, vitrified in bedrooms, and ceramic in service areas.",
];
const OPT_SUPER_STRUCTURE = [
  "Brick masonry walls in cement mortar (1:6) for superstructure. 9\" Thick for External and 4\" Thick for Internal Walls",
  "Solid concrete block masonry for external and internal walls.",
  "Burnt clay brick masonry with RCC framed structure.",
  "Laterite / red brick masonry plastered with cement mortar both sides.",
];
const OPT_JOINERY = [
  "Doors: Wooden frames with laminated flush shutters. Windows: Steel casement type with glazing and MS grill protection. Timber: Teak / country wood used for frames.",
  "Teak / Hardwood frames with panelled shutters. Windows: Wooden casement with glass panes.",
  "Steel frames with steel panel shutters. Windows: Steel fixed/sliding with MS grills.",
  "UPVC doors and windows with double-glazed glass panels.",
];
const OPT_RCC = [
  "RCC works carried out with M20 grade concrete using tor steel reinforcement as per structural design.",
  "RCC works in M15 grade concrete with mild steel reinforcement.",
  "Lintel beams and slab provided; no RCC columns (load-bearing).",
  "Not applicable.",
];
const OPT_PLASTERING = [
  "Single coat 12mm thick cement plaster in 1:6 (Cement : Sand) proportion for internal and external walls; no finishing coat.",
  "Two coat plastering – 15mm rough coat + 6mm finishing coat with smooth finish.",
  "Textured / rough cast exterior plaster; smooth internal plaster.",
  "Gypsum plaster on internal walls; cement plaster on external surfaces.",
];
const OPT_FLOORING = [
  "Vitrified tiles flooring in all rooms; anti-skid ceramic tiles in toilets and balconies.",
  "Marble flooring in main areas; ceramic tiles in kitchen and toilets.",
  "Polished Kota stone flooring with cement skirting.",
  "Cement concrete flooring finished with red oxide / IPS flooring.",
  "Granite flooring in living area, vitrified in bedrooms, and ceramic in service areas.",
];
const OPT_SPECIAL_FINISH = [
  "Nil",
  "Wooden Panelling works in interiors",
  "Marble Carving works",
  "Granite finishes in the kitchen",
  "Granite flooring in living area, vitrified in bedrooms, and ceramic in service areas.",
];
const OPT_ROOFING = [
  "Reinforced Cement Concrete (RCC) flat roof with weathering course.",
  "RCC slab roof finished with water-proofing treatment.",
  "Sloped roof with Mangalore tile covering on steel / RCC truss.",
  "RCC slab roof covered with terrace tiles.",
];
const OPT_DRAINAGE = [
  "Open surface drains along plot periphery; connected to municipal/roadside drain.",
  "Partly covered cement drains with proper slope; connected to septic tank or municipal line.",
  "Underground PVC drainage system with inspection chambers and gully traps.",
  "RCC underground drainage network with manholes, inspection chambers, and connection to city sewerage system",
];

// Electrical
const OPT_WIRING = [
  "Concealed PVC wiring in rigid conduit",
  "Surface wiring in casing capping",
  "Open wiring with wooden battens",
];
const OPT_FITTINGS = [
  "Superior – Modular switches (Anchor, Havells, GM, etc.) with concealed boxes",
  "Ordinary – Piano type switches and basic ceiling fittings",
  "Poor – Mixed or outdated fittings, temporary wiring, exposed joints",
];
const OPT_LIGHT_POINTS = [
  "Moderate – 1 per 80–100 sq.ft.",
  "Sufficient – 1 per 60–80 sq.ft.",
  "Extensive – decorative lighting / false ceiling LED system",
];
const OPT_FAN_POINTS = [
  "One per habitable room",
  "One per room + additional in living/dining",
  "Ceiling fans with regulators in each major room",
];
const OPT_PLUG_POINTS = [
  "Limited – Only one per room",
  "Adequate – Two per room including kitchen & toilet",
];
const OPT_OTHER_ELEC = [
  "Exhaust fans / Geyser points in kitchen & toilets",
  "A/C points in bedrooms and halls",
  "Inverter wiring / Solar power provision / UPS backup",
  "Provisions for A/C and inverter connection available",
];
const OPT_WATER_CLOSETS = [
  "Attached full bathroom & toilets",
  "Indian Closet",
  "Western Closet",
];

// ── Main component ────────────────────────────────────────────────────────────
export default function BuildingValuationSidebar({ formData, handleChange }: Props) {

  // Central intercept: handles auto-words + all formula recalculations
  const fire = (name: string, value: string) =>
    handleChange({ target: { name, value } } as any);

  const handleInterceptChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    handleChange(e);
    const { name, value } = e.target;

    // ── Auto words for money fields ─────────────────────────────────────────
    const wordsMap: Record<string, string> = {
      fairMarketValue:  'fairMarketValueWords',
      bookValue:        'bookValueWords',
      distressValue:    'distressValueWords',
      realisableValue:  'realisableValueWords',
    };
    if (wordsMap[name]) fire(wordsMap[name], spellNumberIndian(value));

    // ── Age / Life calculations ─────────────────────────────────────────────
    if (name === 'yearOfConstruction') {
      const yr = parseInt(value, 10);
      if (!isNaN(yr)) {
        const age = new Date().getFullYear() - yr;
        const totalLife = 80;
        fire('ageOfBuilding',       String(age));
        fire('groundFloorAge',      String(age));
        fire('totalLifeOfBuilding', String(totalLife));
        fire('expectedFutureLife',  String(Math.max(0, totalLife - age)));
      }
    }

    // ── Net value after depreciation ────────────────────────────────────────
    if (name === 'groundFloorReplacementCost' || name === 'groundFloorDepreciation') {
      const cost = parseNum(name==='groundFloorReplacementCost' ? value : formData.groundFloorReplacementCost);
      const dep  = parseNum(name==='groundFloorDepreciation'    ? value : formData.groundFloorDepreciation);
      fire('groundFloorNetValue', fmtINR(cost - dep));
      // also push into buildingTotal & buildingPMR
      fire('buildingTotal',  fmtINR(cost - dep));
      fire('buildingPMR',    fmtINR(cost - dep));
      recalcAbstract(name, value, cost - dep);
    }

    // ── Land by GLR ─────────────────────────────────────────────────────────
    if (name==='extentForValuation'||name==='guidelineRate') {
      const ext = parseNum(name==='extentForValuation' ? value : formData.extentForValuation);
      const glr = parseNum(name==='guidelineRate'      ? value : formData.guidelineRate);
      fire('landValueGLR', fmtINR(ext * glr));
      fire('landGLR',      fmtINR(ext * glr));
    }
    // ── Land by PMR ─────────────────────────────────────────────────────────
    if (name==='unitRatePMR'||name==='extentForValuation') {
      const ext = parseNum(name==='extentForValuation' ? value : formData.extentForValuation);
      const pmr = parseNum(name==='unitRatePMR'        ? value : formData.unitRatePMR);
      fire('landValuePMR', fmtINR(ext * pmr));
      fire('landPMR',      fmtINR(ext * pmr));
    }

    // ── Part C total ────────────────────────────────────────────────────────
    const partCFields = ['portico','ornamentalDoor','sitOutVerandah','overheadWaterTank','extraGates'];
    if (partCFields.includes(name)) {
      const snapshot = { ...formData, [name]: value };
      const total = partCFields.reduce((s,f)=>s+parseNum(snapshot[f as keyof FormData]),0);
      fire('extraItemsTotal',   fmtINR(total));
      fire('extraItemsAbstract',fmtINR(total));
    }

    // ── Part D total ────────────────────────────────────────────────────────
    const partDFields = ['wardrobes','glazedTiles','extraSinksBathtub','marbleCeramicTiles',
      'interiorDecorations','architecturalElevation','panellingWorks','aluminiumWorks',
      'aluminiumHandRails','falseCeilingValue'];
    if (partDFields.includes(name)||(name==='falseCeilingArea'||name==='falseCeilingRate')) {
      // recalc false ceiling value
      const area = parseNum(name==='falseCeilingArea' ? value : formData.falseCeilingArea);
      const rate = parseNum(name==='falseCeilingRate' ? value : formData.falseCeilingRate);
      const fcVal = area * rate;
      if (name==='falseCeilingArea'||name==='falseCeilingRate') fire('falseCeilingValue', fmtINR(fcVal));
      const snap = { ...formData, [name]: value,
        falseCeilingValue: name==='falseCeilingArea'||name==='falseCeilingRate' ? fmtINR(fcVal) : formData.falseCeilingValue };
      const total = partDFields.reduce((s,f)=>s+parseNum(snap[f as keyof FormData]),0)
        + (name==='falseCeilingArea'||name==='falseCeilingRate' ? fcVal - parseNum(formData.falseCeilingValue) : 0);
      fire('amenitiesTotal',   fmtINR(total));
      fire('amenitiesAbstract',fmtINR(total));
    }

    // ── Part E Misc total ───────────────────────────────────────────────────
    const partEMiscFields = ['separateLumberRoom','separateToiletRoom','separateWaterTank','treesGardening'];
    if (partEMiscFields.includes(name)) {
      const snap = { ...formData, [name]: value };
      const total = partEMiscFields.reduce((s,f)=>s+parseNum(snap[f as keyof FormData]),0);
      fire('miscTotal',   fmtINR(total));
      fire('miscAbstract',fmtINR(total));
    }

    // ── Part E Services total + compound wall ───────────────────────────────
    const servicesFields = ['openWell','deepBore','handPump','motor','corporationTap',
      'underGroundSump','overheadTankServices','septicTank','undergroundSewage',
      'compoundWallValue','pavementsValue'];
    if (servicesFields.includes(name)||name==='compoundWallRft'||name==='compoundWallRate'
        ||name==='pavementsSqft'||name==='pavementsRate') {
      // compound wall
      const cwRft  = parseNum(name==='compoundWallRft'  ? value : formData.compoundWallRft);
      const cwRate = parseNum(name==='compoundWallRate' ? value : formData.compoundWallRate);
      const cwVal  = cwRft * cwRate;
      if (name==='compoundWallRft'||name==='compoundWallRate') fire('compoundWallValue', fmtINR(cwVal));
      // pavements
      const pvSqft = parseNum(name==='pavementsSqft' ? value : formData.pavementsSqft);
      const pvRate = parseNum(name==='pavementsRate' ? value : formData.pavementsRate);
      const pvVal  = pvSqft * pvRate;
      if (name==='pavementsSqft'||name==='pavementsRate') fire('pavementsValue', fmtINR(pvVal));

      const snap = { ...formData, [name]: value,
        compoundWallValue: name==='compoundWallRft'||name==='compoundWallRate' ? fmtINR(cwVal) : formData.compoundWallValue,
        pavementsValue:    name==='pavementsSqft'||name==='pavementsRate'      ? fmtINR(pvVal)  : formData.pavementsValue,
      };
      const allSvc = ['openWell','deepBore','handPump','motor','corporationTap',
        'underGroundSump','overheadTankServices','septicTank','undergroundSewage',
        'compoundWallValue','pavementsValue'];
      const total = allSvc.reduce((s,f)=>s+parseNum(snap[f as keyof FormData]),0);
      fire('servicesTotal',   fmtINR(total));
      fire('servicesAbstract',fmtINR(total));
    }
  };

  // Recalculate abstract totals and derived values
  const recalcAbstract = (name: string, value: string, netBuilding?: number) => {
    const snap = { ...formData, [name]: value };
    const landGLR   = parseNum(snap.landGLR);
    const landPMR   = parseNum(snap.landPMR);
    const bldGLR    = parseNum(snap.buildingGLR);
    const bldPMR    = netBuilding ?? parseNum(snap.buildingPMR);
    const extraC    = parseNum(snap.extraItemsAbstract);
    const amenD     = parseNum(snap.amenitiesAbstract);
    const miscE     = parseNum(snap.miscAbstract);
    const svcF      = parseNum(snap.servicesAbstract);
    const totalGLR  = landGLR + bldGLR;
    const totalPMR  = landPMR + bldPMR + extraC + amenD + miscE + svcF;
    fire('totalGLR',          fmtINR(totalGLR));
    fire('totalPMR',          fmtINR(totalPMR));
    fire('presentMarketValue',fmtINR(Math.round(totalPMR/1000)*1000));
    // Derived financial values
    const pmv = Math.round(totalPMR/1000)*1000;
    fire('fairMarketValue',  fmtINR(pmv));
    fire('fairMarketValueWords', spellNumberIndian(pmv));
    fire('distressValue',    fmtINR(Math.round(pmv*0.80/100)*100));
    fire('distressValueWords', spellNumberIndian(Math.round(pmv*0.80/100)*100));
    fire('realisableValue',  fmtINR(Math.round(pmv*0.90/100)*100));
    fire('realisableValueWords', spellNumberIndian(Math.round(pmv*0.90/100)*100));
    fire('bookValue',        fmtINR(Math.round(totalGLR/1000)*1000));
    fire('bookValueWords',   spellNumberIndian(Math.round(totalGLR/1000)*1000));
  };

  return (
    <div className="flex-1 overflow-y-auto p-3 scrollbar-thin bg-white text-[11.5px]">

      {/* ══════════════════════ 1. BASIC INFO ══════════════════════ */}
      <div className="mb-6">
        <SectionHeader label="1 · Basic Info" />
        <div className="grid grid-cols-2 gap-2 pl-3">
          <InputField label="To (Name)" name="toName" value={formData.toName} onChange={handleInterceptChange} />
          <InputField label="Branch" name="branch" value={formData.branch} onChange={handleInterceptChange} />
          <InputField label="Date" name="date" value={formData.date} onChange={handleInterceptChange} />
          <InputField label="Place" name="place" value={formData.place} onChange={handleInterceptChange} />
        </div>
      </div>

      {/* ══════════════════════ 2. OWNER DETAILS ══════════════════════ */}
      <div className="mb-6">
        <SectionHeader label="2 · Owner Details" />
        <div className="grid grid-cols-2 gap-2 pl-3">
          <InputField label="Owner Name" name="ownerName" value={formData.ownerName} onChange={handleInterceptChange} />
          <InputField label="Relation (W/o, S/o)" name="ownerRelation" value={formData.ownerRelation} onChange={handleInterceptChange} />
          <InputField label="Relation Name" name="ownerRelationName" value={formData.ownerRelationName} onChange={handleInterceptChange} />
          <InputField label="Phone" name="ownerPhone" value={formData.ownerPhone} onChange={handleInterceptChange} />
        </div>
      </div>

      {/* ══════════════════════ 3. PROPERTY TYPE ══════════════════════ */}
      <div className="mb-6">
        <SectionHeader label="3 · Property Type" />
        <div className="pl-3">
          <InputField label="Type" name="propertyType" value={formData.propertyType} onChange={handleInterceptChange} />
          <InputField label="Description" name="propertyDescription" value={formData.propertyDescription} onChange={handleInterceptChange} />
        </div>
      </div>

      {/* ══════════════════════ 4. LOCATION DETAILS ══════════════════════ */}
      <div className="mb-6">
        <SectionHeader label="4 · Location Details" />
        <div className="grid grid-cols-2 gap-2 pl-3">
          <InputField label="H.No" name="hNo" value={formData.hNo} onChange={handleInterceptChange} />
          <InputField label="Sy.No / Nagar" name="syNo" value={formData.syNo} onChange={handleInterceptChange} />
          <InputField label="Road / Area" name="road" value={formData.road} onChange={handleInterceptChange} />
          <InputField label="City / Mandal" name="city" value={formData.city} onChange={handleInterceptChange} />
          <InputField label="District" name="district" value={formData.district} onChange={handleInterceptChange} />
          <InputField label="Pin Code" name="pinCode" value={formData.pinCode} onChange={handleInterceptChange} />
          <InputField label="Landmark" name="landmark" value={formData.landmark} onChange={handleInterceptChange} />
        </div>
      </div>

      {/* ══════════════════════ 5. VALUATION SUMMARY ══════════════════════ */}
      <div className="mb-6 border border-blue-100 bg-blue-50/30 p-3 rounded-lg">
        <SectionHeader label="5 · Valuation Summary (auto-calculated)" />
        <p className="text-[10px] text-blue-600 mb-2 italic pl-1">These are auto-filled from Part F totals. Edit manually if needed.</p>
        <div className="pl-1 grid grid-cols-2 gap-2">
          <InputField label="Fair Market Value (Rs)" name="fairMarketValue" value={formData.fairMarketValue} onChange={handleInterceptChange} />
          <div className="col-span-2"><TextArea label="In Words" name="fairMarketValueWords" value={formData.fairMarketValueWords} onChange={handleInterceptChange} rows={1} /></div>
          <InputField label="Book / Govt Value (Rs)" name="bookValue" value={formData.bookValue} onChange={handleInterceptChange} />
          <div className="col-span-2"><TextArea label="In Words" name="bookValueWords" value={formData.bookValueWords} onChange={handleInterceptChange} rows={1} /></div>
          <InputField label="Distress Value (Rs)" name="distressValue" value={formData.distressValue} onChange={handleInterceptChange} />
          <div className="col-span-2"><TextArea label="In Words" name="distressValueWords" value={formData.distressValueWords} onChange={handleInterceptChange} rows={1} /></div>
          <InputField label="Realisable Value (Rs)" name="realisableValue" value={formData.realisableValue} onChange={handleInterceptChange} />
          <div className="col-span-2"><TextArea label="In Words" name="realisableValueWords" value={formData.realisableValueWords} onChange={handleInterceptChange} rows={1} /></div>
        </div>
      </div>

      {/* ══════════════════════ 6. PART A – GENERAL ══════════════════════ */}
      <div className="mb-6">
        <SectionHeader label="6 · Part A – General" />
        <div className="grid grid-cols-2 gap-2 pl-3">
          <InputField label="Purpose of Valuation" name="purposeOfValuation" value={formData.purposeOfValuation} onChange={handleInterceptChange} />
          <InputField label="Date of Inspection" name="dateOfInspection" value={formData.dateOfInspection} onChange={handleInterceptChange} />
          <InputField label="Date of Valuation" name="dateOfValuation" value={formData.dateOfValuation} onChange={handleInterceptChange} />
        </div>
      </div>

      {/* ══════════════════════ 7. DOCUMENTS PRODUCED ══════════════════════ */}
      <div className="mb-6">
        <SectionHeader label="7 · Documents Produced" />
        <div className="pl-3">
          {[["Document 1","doc1Description","doc1No","doc1Date","doc1Copy"],
            ["Document 2","doc2Description","doc2No","doc2Date","doc2Copy"],
            ["Document 3","doc3Description","doc3No","doc3Date","doc3Copy"]].map(([sub,desc,no,dt,copy])=>(
            <div key={sub}>
              <SubLabel label={sub} />
              <div className="grid grid-cols-2 gap-2">
                <InputField label="Description" name={desc} value={(formData as any)[desc]} onChange={handleInterceptChange} />
                <InputField label="Doc No" name={no} value={(formData as any)[no]} onChange={handleInterceptChange} />
                <InputField label="Date" name={dt} value={(formData as any)[dt]} onChange={handleInterceptChange} />
                <InputField label="Original/Copy" name={copy} value={(formData as any)[copy]} onChange={handleInterceptChange} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ══════════════════════ 8. BRIEF DESCRIPTION ══════════════════════ */}
      <div className="mb-6">
        <SectionHeader label="8 · Brief Description" />
        <div className="pl-3">
          <TextArea label="Description" name="briefDescription" value={formData.briefDescription} onChange={handleInterceptChange} rows={3} />
        </div>
      </div>

      {/* ══════════════════════ 9. AREA CLASSIFICATION ══════════════════════ */}
      <div className="mb-6">
        <SectionHeader label="9 · Area Classification" />
        <div className="pl-3">
          <RadioGroup label="Residential Area" name="residentialArea" options={OPT_RESIDENTIAL_AREA} value={formData.residentialArea} onChange={handleInterceptChange} />
          <RadioGroup label="High / Middle / Poor" name="classificationHighMiddlePoor" options={OPT_HIGH_MIDDLE_POOR} value={formData.classificationHighMiddlePoor} onChange={handleInterceptChange} />
          <RadioGroup label="Urban / Semi Urban / Rural" name="urbanSemiUrbanRural" options={OPT_URBAN_RURAL} value={formData.urbanSemiUrbanRural} onChange={handleInterceptChange} />
          <div className="grid grid-cols-2 gap-2 mt-1">
            <InputField label="Commercial Area" name="commercialArea" value={formData.commercialArea} onChange={handleInterceptChange} />
            <InputField label="Industrial Area" name="industrialArea" value={formData.industrialArea} onChange={handleInterceptChange} />
            <InputField label="Corporation / Municipality" name="corporationVillageMunicipality" value={formData.corporationVillageMunicipality} onChange={handleInterceptChange} />
          </div>
        </div>
      </div>

      {/* ══════════════════════ 10. SITE CHARACTERISTICS ══════════════════════ */}
      <div className="mb-6">
        <SectionHeader label="10 · Site Characteristics" />
        <div className="pl-3">
          <RadioGroup label="Classification of the Locality?" name="localityClassification" options={OPT_LOCALITY_CLASSIFICATION} value={formData.localityClassification} onChange={handleInterceptChange} />
          <RadioGroup label="Development of Surrounding Areas" name="surroundingDevelopment" options={OPT_SURROUNDING_DEV} value={formData.surroundingDevelopment} onChange={handleInterceptChange} />
          <RadioGroup label="Possibility of Frequent Flooding / Submerging" name="flooding" options={OPT_FLOODING} value={formData.flooding} onChange={handleInterceptChange} />
          <RadioGroup label="Accessibility to Civic Amenities" name="civicAmenities" options={OPT_CIVIC} value={formData.civicAmenities} onChange={handleInterceptChange} />
          <RadioGroup label="Level of Land with Topographical Conditions" name="landLevel" options={OPT_LAND_LEVEL} value={formData.landLevel} onChange={handleInterceptChange} />
          <RadioGroup label="Shape of Land" name="shapeOfLand" options={OPT_SHAPE} value={formData.shapeOfLand} onChange={handleInterceptChange} />
          <RadioGroup label="Type of Use to Which It Can Be Put" name="typeOfUse" options={OPT_TYPE_USE} value={formData.typeOfUse} onChange={handleInterceptChange} />
          <RadioGroup label="Any Usage Restriction" name="usageRestriction" options={OPT_USAGE_RESTRICTION} value={formData.usageRestriction} onChange={handleInterceptChange} />
          <RadioGroup label="Is Plot in Town Planning Approved Layout?" name="townPlanningApproved" options={OPT_TOWN_PLANNING} value={formData.townPlanningApproved} onChange={handleInterceptChange} />
          <RadioGroup label="Corner Plot or Intermittent Plot?" name="cornerOrIntermittent" options={OPT_CORNER} value={formData.cornerOrIntermittent} onChange={handleInterceptChange} />
          <RadioGroup label="Road Facilities" name="roadFacilities" options={OPT_ROAD_FACILITIES} value={formData.roadFacilities} onChange={handleInterceptChange} />
          <RadioGroup label="Type of Road Available at Present" name="typeOfRoad" options={OPT_TYPE_ROAD} value={formData.typeOfRoad} onChange={handleInterceptChange} />
          <RadioGroup label="Width of Road – Below 20' or More Than 20'?" name="widthOfRoad" options={OPT_WIDTH_ROAD} value={formData.widthOfRoad} onChange={handleInterceptChange} />
          <RadioGroup label="Is It a Land-Locked Land?" name="landLocked" options={OPT_LAND_LOCKED} value={formData.landLocked} onChange={handleInterceptChange} />
          <RadioGroup label="Water Potentiality" name="waterPotentiality" options={OPT_WATER} value={formData.waterPotentiality} onChange={handleInterceptChange} />
          <RadioGroup label="Underground Sewerage System" name="undergroundSewerage" options={OPT_SEWERAGE} value={formData.undergroundSewerage} onChange={handleInterceptChange} />
          <RadioGroup label="Is Power Supply Available at Site?" name="powerSupply" options={OPT_POWER} value={formData.powerSupply} onChange={handleInterceptChange} />
          <RadioGroup label="Advantages of the Site" name="advantagesOfSite" options={OPT_ADVANTAGES} value={formData.advantagesOfSite} onChange={handleInterceptChange} />
          <TextArea label="General Remarks" name="generalRemarks" value={formData.generalRemarks} onChange={handleInterceptChange} rows={3} />
        </div>
      </div>

      {/* ══════════════════════ 11. BOUNDARIES ══════════════════════ */}
      <div className="mb-6">
        <SectionHeader label="11 · Boundaries of Property" />
        <div className="pl-3">
          <SubLabel label="As per Deed" />
          <div className="grid grid-cols-2 gap-2">
            {["northBoundaryDeed","southBoundaryDeed","eastBoundaryDeed","westBoundaryDeed"].map((f,i)=>(
              <InputField key={f} label={["North","South","East","West"][i]} name={f} value={(formData as any)[f]} onChange={handleInterceptChange} />
            ))}
          </div>
          <SubLabel label="As per Actuals" />
          <div className="grid grid-cols-2 gap-2">
            {["northBoundaryActual","southBoundaryActual","eastBoundaryActual","westBoundaryActual"].map((f,i)=>(
              <InputField key={f} label={["North","South","East","West"][i]} name={f} value={(formData as any)[f]} onChange={handleInterceptChange} />
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════════════ 12. DIMENSIONS ══════════════════════ */}
      <div className="mb-6">
        <SectionHeader label="12 · Dimensions of Site" />
        <div className="pl-3">
          <SubLabel label="As per Title Deed" />
          <div className="grid grid-cols-2 gap-2">
            {["northDeedDim","southDeedDim","eastDeedDim","westDeedDim"].map((f,i)=>(
              <InputField key={f} label={["North","South","East","West"][i]} name={f} value={(formData as any)[f]} onChange={handleInterceptChange} />
            ))}
          </div>
          <SubLabel label="Actuals" />
          <div className="grid grid-cols-2 gap-2">
            {["northActualDim","southActualDim","eastActualDim","westActualDim"].map((f,i)=>(
              <InputField key={f} label={["North","South","East","West"][i]} name={f} value={(formData as any)[f]} onChange={handleInterceptChange} />
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════════════ 13. SITE EXTENT, MAP COORDINATES & PHOTO INPUTS ══════════════════════ */}
      <div className="mb-6">
        <SectionHeader label="13 · Site Extent & Coordinates" />
        <div className="grid grid-cols-2 gap-2 pl-3">
          <InputField label="Extent (Sq.Yds)" name="extentSqYds" value={formData.extentSqYds} onChange={handleInterceptChange} />
          <InputField label="Rate (Rs/Sq.Yd)" name="landRatePerSqYd" value={formData.landRatePerSqYd} onChange={handleInterceptChange} />
          <InputField label="Extent as per Deed" name="extentAsPerDeed" value={formData.extentAsPerDeed} onChange={handleInterceptChange} />
          <InputField label="Extent for Valuation (Sq.Yds)" name="extentForValuation" value={formData.extentForValuation} onChange={handleInterceptChange} />
          <InputField label="Occupied By / Rent" name="occupiedBy" value={formData.occupiedBy} onChange={handleInterceptChange} />
        </div>

        {/* ── Map Survey Points (1–10 lat/lng pairs) ── */}
        <SubLabel label="Map Survey Points (GPS coordinates – up to 10 points)" />
        <p className="text-[9.5px] text-gray-500 mb-2 pl-1">Enter lat/lng for each site survey point. These will render on the map in the Key Plan page.</p>
        {Array.from({length:10}).map((_,i)=>(
          <div key={i} className="grid grid-cols-2 gap-2 mb-1 items-center">
            <div className="col-span-2">
              <p className="text-[9.5px] font-bold text-gray-400 uppercase mb-0.5">Point {i+1}</p>
            </div>
            <InputField
              label={`Latitude ${i+1}`}
              name={`mapLat${i+1}`}
              value={(formData as any)[`mapLat${i+1}`] ?? (i===0 ? formData.latitude : '')}
              onChange={handleInterceptChange}
            />
            <InputField
              label={`Longitude ${i+1}`}
              name={`mapLng${i+1}`}
              value={(formData as any)[`mapLng${i+1}`] ?? (i===0 ? formData.longitude : '')}
              onChange={handleInterceptChange}
            />
          </div>
        ))}

        {/* ── Site Photo Labels ── */}
        <SubLabel label="Site Photo Labels (optional – for photo captions)" />
        <p className="text-[9.5px] text-gray-500 mb-1.5 pl-1">Photos are uploaded directly on the document page. Add captions below.</p>
        <div className="grid grid-cols-2 gap-2">
          {Array.from({length:12}).map((_,i)=>(
            <InputField
              key={i}
              label={`Photo ${i+1} Caption`}
              name={`photoCaption${i+1}`}
              value={(formData as any)[`photoCaption${i+1}`] ?? ''}
              onChange={handleInterceptChange}
            />
          ))}
        </div>
      </div>

      {/* ══════════════════════ 14. LAND VALUATION – PART A ══════════════════════ */}
      <div className="mb-6">
        <SectionHeader label="14 · Land Valuation – Part A" />
        <div className="grid grid-cols-2 gap-2 pl-3">
          <InputField label="Guideline Rate (Rs/Sq.Yd)" name="guidelineRate" value={formData.guidelineRate} onChange={handleInterceptChange} />
          <InputField label="Land Value by GLR (Rs) ✦auto" name="landValueGLR" value={formData.landValueGLR} onChange={handleInterceptChange} readOnly />
          <InputField label="PMR Range" name="prevailingMarketRateRange" value={formData.prevailingMarketRateRange} onChange={handleInterceptChange} />
          <InputField label="Unit Rate PMR (Rs/Sq.Yd)" name="unitRatePMR" value={formData.unitRatePMR} onChange={handleInterceptChange} />
          <InputField label="Land Value by PMR (Rs) ✦auto" name="landValuePMR" value={formData.landValuePMR} onChange={handleInterceptChange} readOnly />
          <InputField label="Compound Wall" name="CompoundWall" value={formData.CompoundWall} onChange={handleInterceptChange} />
          <InputField label="Gate" name="Gate" value={formData.Gate } onChange={handleInterceptChange} />
          <InputField label="power" name="power" value={formData.power   } onChange={handleInterceptChange} />

        </div>
      </div>

      {/* ══════════════════════ 15. BUILDING TECHNICAL DETAILS ══════════════════════ */}
      <div className="mb-6">
        <SectionHeader label="15 · Building Technical Details – Part B" />
        <p className="text-[9.5px] text-blue-600 mb-2 pl-3 italic">Age, Total Life & Future Life auto-calculate from Year of Construction.</p>
        <div className="pl-3">
          <RadioGroup label="Type of Building" name="typeOfBuilding" options={OPT_TYPE_BUILDING} value={formData.typeOfBuilding} onChange={handleInterceptChange} />
          <RadioGroup label="Type of Construction" name="typeOfConstruction" options={OPT_TYPE_CONSTRUCTION} value={formData.typeOfConstruction} onChange={handleInterceptChange} />
          <RadioGroup label="Quality of Construction" name="qualityOfConstruction" options={OPT_QUALITY} value={formData.qualityOfConstruction} onChange={handleInterceptChange} />
          <RadioGroup label="Appearance of Building" name="appearanceOfBuilding" options={OPT_APPEARANCE} value={formData.appearanceOfBuilding} onChange={handleInterceptChange} />
          <RadioGroup label="Maintenance – Exterior" name="maintenanceExterior" options={OPT_MAINTENANCE} value={formData.maintenanceExterior} onChange={handleInterceptChange} />
          <RadioGroup label="Maintenance – Interior" name="maintenanceInterior" options={OPT_MAINTENANCE} value={formData.maintenanceInterior} onChange={handleInterceptChange} />
          <RadioGroup label="Date of issue and validity of approved map / plan" name="drawingApprovalDate" options={OPT_DRAWING_APPROVAL} value={formData.drawingApprovalDate} onChange={handleInterceptChange} />
          <RadioGroup label="Approved Map / Plan Issuing Authority" name="approvedMapAuthority" options={OPT_MAP_AUTHORITY} value={formData.approvedMapAuthority} onChange={handleInterceptChange} />
          <RadioGroup label="Whether genuineness / authentic of approved map/plan is verified?" name="genuinenessVerified" options={OPT_GENUINENESS} value={formData.genuinenessVerified} onChange={handleInterceptChange} />
          <RadioGroup label="Any other comments by empanelled valuer on authentic of approved plan?" name="anyOtherComments" options={OPT_VALUER_COMMENTS} value={formData.anyOtherComments} onChange={handleInterceptChange} />

          <SubLabel label="Year & Life" />
          <div className="grid grid-cols-2 gap-2">
            <InputField label="Year of Construction" name="yearOfConstruction" value={formData.yearOfConstruction} onChange={handleInterceptChange} />
            <InputField label="Age of Building ✦auto" name="ageOfBuilding" value={formData.ageOfBuilding} onChange={handleInterceptChange} readOnly />
            <InputField label="Total Life (yrs) = 80" name="totalLifeOfBuilding" value={formData.totalLifeOfBuilding} onChange={handleInterceptChange} readOnly />
            <InputField label="Expected Future Life ✦auto" name="expectedFutureLife" value={formData.expectedFutureLife} onChange={handleInterceptChange} readOnly />
          </div>
          <TextArea label="No. of Floors & Height" name="numberOfFloorsHeight" value={formData.numberOfFloorsHeight} onChange={handleInterceptChange} rows={1} />
        </div>
      </div>

      {/* ══════════════════════ 16. PLINTH AREA ══════════════════════ */}
      <div className="mb-6">
        <SectionHeader label="16 · Plinth Area – Floor-wise" />
        <div className="pl-3">
          <SubLabel label="Ground Floor" />
          <div className="grid grid-cols-2 gap-2">
            <InputField label="Year" name="groundFloorYear" value={formData.groundFloorYear} onChange={handleInterceptChange} />
            <InputField label="Main Portion A (Sq.ft)" name="groundFloorMainArea" value={formData.groundFloorMainArea} onChange={handleInterceptChange} />
            <InputField label="Cantilevered B (Sq.ft)" name="groundFloorCantArea" value={formData.groundFloorCantArea} onChange={handleInterceptChange} />
            <InputField label="Total A+50%B" name="groundFloorTotal" value={formData.groundFloorTotal} onChange={handleInterceptChange} />
          </div>
        </div>
      </div>

      {/* ══════════════════════ 17. SPECIFICATIONS ══════════════════════ */}
      <div className="mb-6">
        <SectionHeader label="17 · Specifications of Construction" />
        <div className="pl-3">
          <RadioGroup label="Foundation" name="specFoundation" options={OPT_FOUNDATION} value={formData.specFoundation} onChange={handleInterceptChange} />
          <RadioGroup label="Basement / Flooring" name="specBasement" options={OPT_BASEMENT} value={formData.specBasement} onChange={handleInterceptChange} />
          <RadioGroup label="Super Structure" name="specSuperStructure" options={OPT_SUPER_STRUCTURE} value={formData.specSuperStructure} onChange={handleInterceptChange} />
          <RadioGroup label="Joinery / Doors & Windows" name="specJoinery" options={OPT_JOINERY} value={formData.specJoinery} onChange={handleInterceptChange} />
          <RadioGroup label="RCC Works" name="specRCCWorks" options={OPT_RCC} value={formData.specRCCWorks} onChange={handleInterceptChange} />
          <RadioGroup label="Plastering" name="specPlastering" options={OPT_PLASTERING} value={formData.specPlastering} onChange={handleInterceptChange} />
          <RadioGroup label="Flooring, Skirting, Dadoing" name="specFlooring" options={OPT_FLOORING} value={formData.specFlooring} onChange={handleInterceptChange} />
          <RadioGroup label="Special Finish (marble, granite, paneling, grills etc.)" name="specSpecialFinish" options={OPT_SPECIAL_FINISH} value={formData.specSpecialFinish} onChange={handleInterceptChange} />
          <RadioGroup label="Roofing Including Weather Proof Course" name="specRoofing" options={OPT_ROOFING} value={formData.specRoofing} onChange={handleInterceptChange} />
          <RadioGroup label="Drainage" name="specDrainage" options={OPT_DRAINAGE} value={formData.specDrainage} onChange={handleInterceptChange} />
        </div>
      </div>

      {/* ══════════════════════ 18. COMPOUND WALL (Building Section) ══════════════════════ */}
      <div className="mb-6">
        <SectionHeader label="18 · Compound Wall (Building Section)" />
        <div className="grid grid-cols-2 gap-2 pl-3">
          <InputField label="Length (R.ft)" name="compWallBuildingRft" value={formData.compWallBuildingRft} onChange={handleInterceptChange} />
          <InputField label="Rate (Rs/rft)" name="compWallBuildingRate" value={formData.compWallBuildingRate} onChange={handleInterceptChange} />
          <InputField label="Height" name="compWallBuildingHeight" value={formData.compWallBuildingHeight} onChange={handleInterceptChange} />
          <InputField label="Length (ft)" name="compWallBuildingLength" value={formData.compWallBuildingLength} onChange={handleInterceptChange} />
          <InputField label="Type of Construction" name="compWallBuildingType" value={formData.compWallBuildingType} onChange={handleInterceptChange} />
        </div>
      </div>

      {/* ══════════════════════ 19. ELECTRICAL ══════════════════════ */}
      <div className="mb-6">
        <SectionHeader label="19 · Electrical Installation" />
        <div className="pl-3">
          <RadioGroup label="Type of Wiring" name="typeOfWiring" options={OPT_WIRING} value={formData.typeOfWiring} onChange={handleInterceptChange} />
          <RadioGroup label="Class of Fittings (Superior / Ordinary / Poor)" name="classOfFittings" options={OPT_FITTINGS} value={formData.classOfFittings} onChange={handleInterceptChange} />
          <RadioGroup label="Number of Light Points" name="numberOfLightPoints" options={OPT_LIGHT_POINTS} value={formData.numberOfLightPoints} onChange={handleInterceptChange} />
          <RadioGroup label="Fan Points" name="fanPoints" options={OPT_FAN_POINTS} value={formData.fanPoints} onChange={handleInterceptChange} />
          <RadioGroup label="Spare Plug Points" name="sparePlugPoints" options={OPT_PLUG_POINTS} value={formData.sparePlugPoints} onChange={handleInterceptChange} />
          <RadioGroup label="Any Other Item" name="anyOtherElectrical" options={OPT_OTHER_ELEC} value={formData.anyOtherElectrical} onChange={handleInterceptChange} />
          <InputField label="Electrical Lumpsum (Rs) @ 5% Civil Works" name="electricalLumpsum" value={formData.electricalLumpsum} onChange={handleInterceptChange} />
        </div>
      </div>

      {/* ══════════════════════ 20. PLUMBING ══════════════════════ */}
      <div className="mb-6">
        <SectionHeader label="20 · Plumbing Installation" />
        <div className="pl-3">
          <RadioGroup label="No. of Water Closets and Their Type" name="waterClosets" options={OPT_WATER_CLOSETS} value={formData.waterClosets} onChange={handleInterceptChange} />
          <div className="grid grid-cols-2 gap-2">
            <InputField label="Wash Basins" name="washBasins" value={formData.washBasins} onChange={handleInterceptChange} />
            <InputField label="Urinals" name="urinals" value={formData.urinals} onChange={handleInterceptChange} />
            <InputField label="Bath Tubs" name="bathTubs" value={formData.bathTubs} onChange={handleInterceptChange} />
            <InputField label="Water Meters / Taps" name="waterMeters" value={formData.waterMeters} onChange={handleInterceptChange} />
            <InputField label="Plumbing Lumpsum (Rs) @ 5%" name="plumbingLumpsum" value={formData.plumbingLumpsum} onChange={handleInterceptChange} />
          </div>
        </div>
      </div>

      {/* ══════════════════════ 21. BUILDING VALUATION DETAILS ══════════════════════ */}
      <div className="mb-6 border border-green-100 bg-green-50/30 p-3 rounded-lg">
        <SectionHeader label="21 · Building Valuation Details" />
        <p className="text-[9.5px] text-green-600 mb-2 italic">Net Value = Replacement Cost − Depreciation (auto-calculated).</p>
        <div className="pl-1">
          <SubLabel label="Ground Floor" />
          <div className="grid grid-cols-2 gap-2">
            <InputField label="Plinth Area (Sq.ft)" name="groundFloorPlinthArea" value={formData.groundFloorPlinthArea} onChange={handleInterceptChange} />
            <InputField label="Rate (Rs/Sq.ft)" name="groundFloorRate" value={formData.groundFloorRate} onChange={handleInterceptChange} />
            <InputField label="Age of Building ✦auto" name="groundFloorAge" value={formData.groundFloorAge} onChange={handleInterceptChange} readOnly />
            <InputField label="Replacement Cost (Rs)" name="groundFloorReplacementCost" value={formData.groundFloorReplacementCost} onChange={handleInterceptChange} />
            <InputField label="Depreciation (Rs)" name="groundFloorDepreciation" value={formData.groundFloorDepreciation} onChange={handleInterceptChange} />
            <InputField label="Net Value after Dep. ✦auto" name="groundFloorNetValue" value={formData.groundFloorNetValue} onChange={handleInterceptChange} readOnly />
          </div>
          <InputField label="Building Total (Rs) ✦auto" name="buildingTotal" value={formData.buildingTotal} onChange={handleInterceptChange} readOnly />
        </div>
      </div>

      {/* ══════════════════════ 22. EXTRA ITEMS – PART C ══════════════════════ */}
      <div className="mb-6">
        <SectionHeader label="22 · Extra Items – Part C (Rs)" />
        <p className="text-[9.5px] text-gray-500 mb-2 pl-3 italic">Select a value — Total auto-sums.</p>
        <div className="pl-3">
          <RadioMoney label="Portico" name="portico" options={[0,20000,35000,55000,85000]} value={formData.portico} onChange={handleInterceptChange} />
          <RadioMoney label="Ornamental Front / Pooja Door" name="ornamentalDoor" options={[0,10000,20000,35000,60000]} value={formData.ornamentalDoor} onChange={handleInterceptChange} />
          <RadioMoney label="Sit Out / Verandah with Steel Grills" name="sitOutVerandah" options={[0,8000,15000,25000,45000]} value={formData.sitOutVerandah} onChange={handleInterceptChange} />
          <RadioMoney label="Overhead Water Tank" name="overheadWaterTank" options={[0,15000,25000,40000,65000]} value={formData.overheadWaterTank} onChange={handleInterceptChange} />
          <RadioMoney label="Extra Steel / Collapsible Gates" name="extraGates" options={[0,12000,20000,35000,55000]} value={formData.extraGates} onChange={handleInterceptChange} />
          <div className="bg-orange-50 border border-orange-200 rounded p-2 mt-1">
            <InputField label="Extra Items Total (Rs) ✦auto" name="extraItemsTotal" value={formData.extraItemsTotal} onChange={handleInterceptChange} readOnly />
          </div>
        </div>
      </div>

      {/* ══════════════════════ 23. AMENITIES – PART D ══════════════════════ */}
      <div className="mb-6">
        <SectionHeader label="23 · Amenities – Part D (Rs)" />
        <p className="text-[9.5px] text-gray-500 mb-2 pl-3 italic">Select values — Total auto-sums.</p>
        <div className="pl-3">
          <RadioMoney label="Wardrobes / Show Cases / Wooden Cubboards" name="wardrobes" options={[0,20000,35000,65000,100000]} value={formData.wardrobes} onChange={handleInterceptChange} />
          <RadioMoney label="Glazed Tiles" name="glazedTiles" options={[0,10000,15000,25000,40000]} value={formData.glazedTiles} onChange={handleInterceptChange} />
          <RadioMoney label="Extra Sinks and Bath Tub" name="extraSinksBathtub" options={[0,5000,12000,25000,50000]} value={formData.extraSinksBathtub} onChange={handleInterceptChange} />
          <InputField label="Marble / Ceramic Tiles Flooring (Rs)" name="marbleCeramicTiles" value={formData.marbleCeramicTiles} onChange={handleInterceptChange} />
          <RadioMoney label="Interior Decorations" name="interiorDecorations" options={[0,10000,25000,60000,100000]} value={formData.interiorDecorations} onChange={handleInterceptChange} />
          <RadioMoney label="Architectural Elevation Works" name="architecturalElevation" options={[0,25000,50000,90000,200000]} value={formData.architecturalElevation} onChange={handleInterceptChange} />
          <RadioMoney label="Panelling Works" name="panellingWorks" options={[0,20000,35000,60000,100000]} value={formData.panellingWorks} onChange={handleInterceptChange} />
          <RadioMoney label="Aluminium Works (Rs/Sq.ft)" name="aluminiumWorks" options={[0,350,550,800,1200]} value={formData.aluminiumWorks} onChange={handleInterceptChange} />
          <RadioMoney label="Aluminium Hand Rails (Rs/Sq.ft)" name="aluminiumHandRails" options={[0,400,600,900,1500]} value={formData.aluminiumHandRails} onChange={handleInterceptChange} />
          <SubLabel label="False Ceiling Works" />
          <div className="grid grid-cols-2 gap-2">
            <InputField label="Area (Sq.ft)" name="falseCeilingArea" value={formData.falseCeilingArea} onChange={handleInterceptChange} />
            <InputField label="Rate (Rs/Sq.ft)" name="falseCeilingRate" value={formData.falseCeilingRate} onChange={handleInterceptChange} />
            <InputField label="Value (Rs) ✦auto" name="falseCeilingValue" value={formData.falseCeilingValue} onChange={handleInterceptChange} readOnly />
          </div>
          <div className="bg-orange-50 border border-orange-200 rounded p-2 mt-1">
            <InputField label="Amenities Total (Rs) ✦auto" name="amenitiesTotal" value={formData.amenitiesTotal} onChange={handleInterceptChange} readOnly />
          </div>
        </div>
      </div>

      {/* ══════════════════════ 24. MISCELLANEOUS – PART E ══════════════════════ */}
      <div className="mb-6">
        <SectionHeader label="24 · Miscellaneous – Part E (Rs)" />
        <p className="text-[9.5px] text-gray-500 mb-2 pl-3 italic">Select values — Total auto-sums.</p>
        <div className="pl-3">
          <RadioMoney label="Separate Lumber Room" name="separateLumberRoom" options={[0,25000,40000,65000,100000]} value={formData.separateLumberRoom} onChange={handleInterceptChange} />
          <RadioMoney label="Separate Toilet Room" name="separateToiletRoom" options={[0,30000,45000,60000,100000]} value={formData.separateToiletRoom} onChange={handleInterceptChange} />
          <RadioMoney label="Separate Water Tank / Sump" name="separateWaterTank" options={[0,15000,25000,40000,60000]} value={formData.separateWaterTank} onChange={handleInterceptChange} />
          <RadioMoney label="Trees, Gardening" name="treesGardening" options={[0,10000,25000,50000,100000]} value={formData.treesGardening} onChange={handleInterceptChange} />
          <div className="bg-orange-50 border border-orange-200 rounded p-2 mt-1">
            <InputField label="Miscellaneous Total (Rs) ✦auto" name="miscTotal" value={formData.miscTotal} onChange={handleInterceptChange} readOnly />
          </div>
        </div>
      </div>

      {/* ══════════════════════ 25. SERVICES – PART E ══════════════════════ */}
      <div className="mb-6">
        <SectionHeader label="25 · Services – Part E (Rs)" />
        <p className="text-[9.5px] text-gray-500 mb-2 pl-3 italic">Select values — Compound Wall & Pavements auto-multiply — Total auto-sums.</p>
        <div className="pl-3">
          <SubLabel label="Water Supply Arrangements" />
          <RadioMoney label="Open Well" name="openWell" options={[0,25000,40000,65000,90000]} value={formData.openWell} onChange={handleInterceptChange} />
          <RadioMoney label="Deep Bore" name="deepBore" options={[0,45000,65000,90000,120000]} value={formData.deepBore} onChange={handleInterceptChange} />
          <RadioMoney label="Hand Pump" name="handPump" options={[0,6000,10000,15000,20000]} value={formData.handPump} onChange={handleInterceptChange} />
          <RadioMoney label="Motor" name="motor" options={[0,8000,12000,20000,35000]} value={formData.motor} onChange={handleInterceptChange} />
          <RadioMoney label="Corporation Tap" name="corporationTap" options={[0,5000,8000,12000,18000]} value={formData.corporationTap} onChange={handleInterceptChange} />
          <RadioMoney label="Under Ground Level Sump" name="underGroundSump" options={[0,20000,30000,50000,75000]} value={formData.underGroundSump} onChange={handleInterceptChange} />
          <RadioMoney label="Over Head Water Tank" name="overheadTankServices" options={[0,10000,18000,30000,45000]} value={formData.overheadTankServices} onChange={handleInterceptChange} />

          <SubLabel label="Drainage Arrangements" />
          <RadioMoney label="Drainage Arrangements" name="drainageArrangements" options={[0,8000,15000,25000,40000]} value={(formData as any).drainageArrangements ?? '0'} onChange={handleInterceptChange} />
          <RadioMoney label="Septic Tank" name="septicTank" options={[0,20000,35000,50000,75000]} value={formData.septicTank} onChange={handleInterceptChange} />
          <RadioMoney label="Underground Sewerage" name="undergroundSewage" options={[0,10000,18000,30000,50000]} value={formData.undergroundSewage} onChange={handleInterceptChange} />

          <SubLabel label="Compound Wall (Services Section)" />
          <p className="text-[9.5px] text-gray-400 mb-1">Value = Length × Rate (auto-calculated)</p>
          <div className="grid grid-cols-2 gap-2">
            <InputField label="Length (R.ft)" name="compoundWallRft" value={formData.compoundWallRft} onChange={handleInterceptChange} />
            <InputField label="Rate (Rs/rft)" name="compoundWallRate" value={formData.compoundWallRate} onChange={handleInterceptChange} />
            <InputField label="Height" name="compoundWallHeight" value={formData.compoundWallHeight} onChange={handleInterceptChange} />
            <InputField label="Length (ft)" name="compoundWallLength" value={formData.compoundWallLength} onChange={handleInterceptChange} />
            <InputField label="Type" name="compoundWallType" value={formData.compoundWallType} onChange={handleInterceptChange} />
            <InputField label="C.Wall Value (Rs) ✦auto" name="compoundWallValue" value={formData.compoundWallValue} onChange={handleInterceptChange} readOnly />
          </div>

          <SubLabel label="Pavements" />
          <p className="text-[9.5px] text-gray-400 mb-1">Value = Area × Rate (auto-calculated)</p>
          <div className="grid grid-cols-2 gap-2">
            <InputField label="Area (Sq.ft)" name="pavementsSqft" value={formData.pavementsSqft} onChange={handleInterceptChange} />
            <InputField label="Rate (Rs/Sq.ft)" name="pavementsRate" value={formData.pavementsRate} onChange={handleInterceptChange} />
            <InputField label="Pavements Value (Rs) ✦auto" name="pavementsValue" value={formData.pavementsValue} onChange={handleInterceptChange} readOnly />
          </div>

          <div className="bg-orange-50 border border-orange-200 rounded p-2 mt-2">
            <InputField label="Services Total (Rs) ✦auto" name="servicesTotal" value={formData.servicesTotal} onChange={handleInterceptChange} readOnly />
          </div>
        </div>
      </div>

      {/* ══════════════════════ 26. ABSTRACT VALUE – PART F ══════════════════════ */}
      <div className="mb-6 border border-purple-100 bg-purple-50/20 p-3 rounded-lg">
        <SectionHeader label="26 · Abstract Value – Part F (Rs)" />
        <p className="text-[9.5px] text-purple-600 mb-2 italic">All totals auto-calculate. Final Market Value and words are derived here.</p>
        <div className="grid grid-cols-2 gap-2 pl-1">
          <InputField label="Land GLR" name="landGLR" value={formData.landGLR} onChange={handleInterceptChange} readOnly />
          <InputField label="Land PMR" name="landPMR" value={formData.landPMR} onChange={handleInterceptChange} readOnly />
          <InputField label="Building GLR" name="buildingGLR" value={formData.buildingGLR} onChange={handleInterceptChange} />
          <InputField label="Building PMR" name="buildingPMR" value={formData.buildingPMR} onChange={handleInterceptChange} readOnly />
          <InputField label="Extra Items (C)" name="extraItemsAbstract" value={formData.extraItemsAbstract} onChange={handleInterceptChange} readOnly />
          <InputField label="Amenities (D)" name="amenitiesAbstract" value={formData.amenitiesAbstract} onChange={handleInterceptChange} readOnly />
          <InputField label="Miscellaneous (E)" name="miscAbstract" value={formData.miscAbstract} onChange={handleInterceptChange} readOnly />
          <InputField label="Services (F)" name="servicesAbstract" value={formData.servicesAbstract} onChange={handleInterceptChange} readOnly />
          <InputField label="Total GLR ✦auto" name="totalGLR" value={formData.totalGLR} onChange={handleInterceptChange} readOnly />
          <InputField label="Total PMR ✦auto" name="totalPMR" value={formData.totalPMR} onChange={handleInterceptChange} readOnly />
          <div className="col-span-2">
            <InputField label="Present Market Value (Rs) ✦auto" name="presentMarketValue" value={formData.presentMarketValue} onChange={handleInterceptChange} readOnly />
          </div>
        </div>
      </div>

      {/* ══════════════════════ 27. CERTIFICATE & DECLARATION ══════════════════════ */}
      <div className="mb-6">
        <SectionHeader label="27 · Certificate & Declaration" />
        <div className="grid grid-cols-2 gap-2 pl-3">
          <InputField label="Title Deed No" name="titleDeedNo" value={formData.titleDeedNo} onChange={handleInterceptChange} />
          <InputField label="Title Deed Date" name="titleDeedDate" value={formData.titleDeedDate} onChange={handleInterceptChange} />
          <InputField label="Appointment Date" name="appointmentDate" value={formData.appointmentDate} onChange={handleInterceptChange} />
          <InputField label="Inspection Date" name="inspectionDate" value={formData.inspectionDate} onChange={handleInterceptChange} />
          <InputField label="Valuation Date" name="valuationDate" value={formData.valuationDate} onChange={handleInterceptChange} />
          <InputField label="Report Date" name="reportDate" value={formData.reportDate} onChange={handleInterceptChange} />
        </div>
      </div>

    </div>
  );
}