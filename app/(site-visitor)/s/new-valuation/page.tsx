 
// 'use client';

// import React, { useState, useEffect, useCallback, useRef } from 'react';
// import { ArrowRight, ArrowLeft, Building, Building2, Grid, Landmark, LayoutGrid, Loader, CheckCircle2, ChevronDown, MapPin, UploadCloud, X, FileText, Edit2, CircleCheck, Plus, Trash2, Home, Tractor, Factory, Check, Undo2, RotateCcw } from 'lucide-react';
// import { useRouter } from 'next/navigation';
// import { APIProvider, Map, AdvancedMarker, useMap } from "@vis.gl/react-google-maps";
// import Link from 'next/link';

// type Bank = 'sbi' | 'ubi' | 'canara' | 'pnb' | 'hdfc' | 'icici' | 'axis' | 'bob' | 'indian' | 'other';
// type ValuationType = 'plot' | 'building' | 'flat' | 'agri' | 'commercial' | 'industrial' | 'villa';
// type Section = 'bank' | 'valuation';
// type Coord = { lat: number; lng: number };
// type Pin = { id: number; coord: Coord };
// type Mode = "picking" | "submitted";

// const MAX = 10;
// const LABELS = ["P1", "P2", "P3", "P4", "P5", "P6", "P7", "P8", "P9", "P10"];
// const COLORS = ["#00a0ef", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899", "#06b6d4", "#14b8a6", "#f97316", "#6366f1"];

// interface Step1State {
//   inputField: { dateOfValuation: string; dateOfInspection: string; propertyType: string; purposeOfValuation: string; };
//   ownerDetails: { prefix: string; ownerName: string; ownerRelation: string; ownerRelationName: string; occupation: string; ownerPhone: string; phone2: string; };
//   address: { locHNo: string; locSFNo: string; locVillage: string; district: string; pinCode: string; landmark: string; };
//   bankDetails: { ifsc: string; bankName: string; branch: string; email: string; contactPerson: string; };
//   siteArea: { extentAsPerDeed: string; extentForValuation: string; shapeOfLand: string; roadAffectedArea: string; };
//   plotValuation: { siteArea: string; landValueGLR: string; unitRatePMR: string; pmrValue: string; sayValue: string; };
// }

// interface Step2State {
//   localityDetails: {
//     urbanSemiUrbanRural: string; classificationHighMiddlePoor: string; landTenure: string; 
//     corporationVillageMunicipality: string; widthOfRoad: string;
//   };
//   propertyDetails: {
//     vacantPlot: string; latitude: string; longitude: string; images: File[]; boundaryCoordinates: Coord[];
//   };
//   siteBoundaryDetails: {
//     isActualSameAsDoc: boolean;
//     northDeedDim: string; southDeedDim: string; eastDeedDim: string; westDeedDim: string;
//     northActualDim: string; southActualDim: string; eastActualDim: string; westActualDim: string;
//     northBoundaryDeed: string; southBoundaryDeed: string; eastBoundaryDeed: string; westBoundaryDeed: string;
//     northBoundaryActual: string; southBoundaryActual: string; eastBoundaryActual: string; westBoundaryActual: string;
//   };
//   wallDetails: {
//     compWallBuildingLength: string; compWallBuildingHeight: string; wallsOnSide: string; compWallBuildingType: string;
//   };
//   buildingDetails: {
//     numberOfFloorsHeight: string; buildingFloors: string[]; customFloor: string; occupiedBy: string; 
//     buildingLength: string; buildingBreadth: string; groundFloorPlinthArea: string; 
//     qualityOfConstruction: string; specSuperStructure: string; specFlooring: string; accommodation: string; 
//     specJoinery: string; sanitaryFitting: string; classOfFittings: string; generalRemarks: string;
//     groundFloorDepreciationRate: string; groundFloorDepreciation: string;
//   };
//   marketDetails: {
//     yearOfConstruction: string; renovation: string; parking: string; lift: string; kitchenType: string;
//     rentalIncomeMin: string; rentalIncomeMax: string;
//     marketRateClientMin: string; marketRateClientMax: string; marketRateClientUnit: string;
//     marketRateDealerMin: string; marketRateDealerMax: string; marketRateDealerUnit: string;
//     marketRateMarketMin: string; marketRateMarketMax: string; marketRateMarketUnit: string;
//     dealerName: string; dealerMobile: string; additionalDetails: { key: string; value: string }[];
//   };
//   intendingVendor: { 
//     realisablePercent: string; realisableValue: string; distressPercent: string; distressValue: string;
//   };
// }

// interface Step3State { documentUpload: { saleDeed: File[]; buildingPermission: File[]; layoutCopy: File[]; legalOpinion: File[]; propertyTax: File[]; }; }
// interface Step4State { siteInspection: { reportFiles: File[]; }; }

// interface Step5FormProps {
//   step1: Step1State; step2: Step2State; step3: Step3State; step4: Step4State;
//   onEditStep: (stepNumber: number) => void;
//   isConfirmed: boolean; setIsConfirmed: (val: boolean) => void;
// }

// const inputStyles = "w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-[#00a0ef] focus:ring-1 focus:ring-[#00a0ef] text-gray-900 bg-white shadow-sm transition-shadow";
// const labelStyles = "block text-[13px] font-semibold text-gray-700 mb-2";

// const RadioGroup = ({ options, value, onChange }: { options: string[], value: string, onChange: (val: string) => void }) => (
//   <div className="flex flex-wrap gap-2">
//     {options.map(opt => (
//       <button key={opt} type="button" onClick={() => onChange(opt)}
//         className={`px-4 py-2 rounded-lg text-[13px] font-medium transition-all duration-200 border ${value === opt ? 'bg-blue-50 border-[#00a0ef] text-[#00a0ef] shadow-[0_2px_10px_rgba(0,160,239,0.15)] ring-1 ring-[#00a0ef]/20' : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50'}`}>
//         {opt}
//       </button>
//     ))}
//   </div>
// );

// const MultiSelectGroup = ({ options, selected, onChange }: { options: string[], selected: string[], onChange: (val: string[]) => void }) => {
//   const toggle = (opt: string) => selected.includes(opt) ? onChange(selected.filter(i => i !== opt)) : onChange([...selected, opt]);
//   return (
//     <div className="flex flex-wrap gap-2">
//       {options.map(opt => (
//         <button key={opt} type="button" onClick={() => toggle(opt)}
//           className={`px-4 py-2 rounded-lg text-[13px] font-medium transition-all duration-200 border ${selected.includes(opt) ? 'bg-blue-50 border-[#00a0ef] text-[#00a0ef] shadow-[0_2px_10px_rgba(0,160,239,0.15)] ring-1 ring-[#00a0ef]/20' : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50'}`}>
//           {opt}
//         </button>
//       ))}
//     </div>
//   );
// };

// const NextSectionButton = ({ onClick, nextFocusId }: { onClick: () => void, nextFocusId: string }) => {
//   const handleAction = (e: React.MouseEvent | React.KeyboardEvent) => {
//     e.preventDefault();
//     onClick();
//     setTimeout(() => document.getElementById(nextFocusId)?.focus(), 50);
//   };
//   return (
//     <div className="md:col-span-full flex justify-end mt-4 border-t border-gray-200/50 pt-4">
//       <button type="button" onClick={handleAction} onKeyDown={(e) => { if (e.key === 'Tab' && !e.shiftKey) { handleAction(e); } }} className="text-[#00a0ef] text-[13px] font-bold hover:underline flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-[#00a0ef] focus:ring-offset-2 rounded px-3 py-1.5 transition-colors">
//         Next Section <ArrowRight className="w-4 h-4" />
//       </button>
//     </div>
//   );
// };

// function ProgressStepper({ currentStep }: { currentStep: number }) {
//   return (
//     <div className="px-6 pt-12 pb-6 md:pt-14 md:pb-8 border-b border-gray-200 bg-white shrink-0">
//       <div className="max-w-2xl mx-auto relative">
//         <div className="flex items-center justify-between relative">
//           <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[2px] bg-gray-200" />
//           {[1, 2, 3, 4, 5].map((step) => {
//             const isCompleted = step < currentStep;
//             const isCurrent = step === currentStep;
//             return (
//               <div key={step} className="relative z-10 flex flex-col items-center">
//                 <span className={`absolute -top-7 md:-top-8 whitespace-nowrap text-xs md:text-sm font-semibold tracking-wide ${isCompleted || isCurrent ? 'text-[#00a0ef]' : 'text-gray-400'}`}>STEP {step}</span>
//                 <div className={`w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center bg-white ${isCompleted ? 'border-2 border-[#00a0ef] bg-[#00a0ef]' : isCurrent ? 'border-2 border-[#00a0ef]' : 'border-2 border-gray-300'}`}>
//                   {isCompleted && <CircleCheck color='white' fill='#00a0ef'/>}
//                   {isCurrent && <div className="w-3 h-3 md:w-4 md:h-4 bg-[#00a0ef] rounded-full" />}
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// }

// function ActionBar({ currentStep, onBack, onContinue, isLastStep = false, isSubmitting = false }: any) {
//   return (
//     <div className="p-4 md:px-6 md:py-5 bg-white border-t border-gray-200 flex items-center justify-between mt-auto shrink-0">
//       <button onClick={onBack} className="flex items-center px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors">
//         <ArrowLeft className="w-4 h-4 mr-2" />
//         {currentStep === 1 ? 'Cancel' : 'Back'}
//       </button>
//       <button onClick={onContinue} disabled={isSubmitting} className="flex items-center px-6 py-2.5 bg-[#00a0ef] hover:bg-[#008bd1] rounded-lg text-white font-medium transition-shadow shadow-sm hover:shadow-md disabled:opacity-60">
//         {isSubmitting ? 'Submitting...' : isLastStep ? 'Submit Report' : `Continue to Step ${currentStep + 1}`}
//         {!isSubmitting && <ArrowRight className="w-4 h-4 ml-2" />}
//       </button>
//     </div>
//   );
// }

// function GeoCoordinatePicker({ onCoordinatesSubmit }: { onCoordinatesSubmit: (coords: Coord[]) => void }) {
//   const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "";
//   const [center, setCenter] = useState<Coord>({ lat: 20, lng: 78 });
//   const [zoom, setZoom] = useState(4);
//   const [mode, setMode] = useState<Mode>("picking");
//   const [pins, setPins] = useState<Pin[]>([]);
//   const [nextId, setNextId] = useState(0);
//   const [submitted, setSubmitted] = useState<Pin[]>([]);
//   const [editTarget, setEditTarget] = useState<number | null>(null);
//   const [userLocation, setUserLocation] = useState<Coord | null>(null);

//   useEffect(() => {
//     if ("geolocation" in navigator) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const userLoc = { lat: position.coords.latitude, lng: position.coords.longitude };
//           setUserLocation(userLoc); setCenter(userLoc); setZoom(18);
//         },
//         (error) => console.error("Error getting user location:", error),
//         { enableHighAccuracy: true }
//       );
//     }
//   }, []);

//   const handleMapClick = useCallback((coord: Coord) => {
//     if (mode === "picking") {
//       if (pins.length >= MAX) return;
//       setPins((prev) => [...prev, { id: nextId, coord }]);
//       setNextId((n) => n + 1); return;
//     }
//     if (mode === "submitted" && editTarget !== null) {
//       setSubmitted((prev) => prev.map((p, i) => (i === editTarget ? { ...p, coord } : p)));
//       setEditTarget(null);
//     }
//   }, [mode, pins.length, nextId, editTarget]);

//   const handleSubmit = () => {
//     if (pins.length === 0) return;
//     setSubmitted([...pins]); setMode("submitted"); setEditTarget(null);
//     onCoordinatesSubmit(pins.map(p => p.coord));
//   };

//   return (
//     <div className="flex flex-col w-full bg-white border border-gray-300 rounded-xl overflow-hidden shadow-sm">
//       <div className="relative w-full h-64 md:h-80 bg-gray-100">
//         <APIProvider apiKey={apiKey}>
//           <Map mapId="geo-picker-form" center={center} zoom={zoom} mapTypeId="satellite"
//             onCameraChanged={(ev) => { setCenter(ev.detail.center); setZoom(ev.detail.zoom); }}
//             gestureHandling="greedy" colorScheme="LIGHT" mapTypeControl={true} zoomControl={true} fullscreenControl={true} streetViewControl={true}
//             style={{ width: "100%", height: "100%" }}>
//             {userLocation && (
//               <AdvancedMarker position={userLocation}>
//                 <div className="relative"><div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-lg" /><div className="absolute inset-0 w-4 h-4 bg-blue-400 rounded-full animate-ping opacity-40" /></div>
//               </AdvancedMarker>
//             )}
//             <ClickHandler onClick={handleMapClick} />
//             {(mode === "picking" ? pins : submitted).map((pin, i) => (
//               <AdvancedMarker key={pin.id} position={pin.coord} zIndex={editTarget === i ? 100 : i}>
//                 <button type="button" onClick={(e) => { e.stopPropagation(); if (mode === "submitted") setEditTarget(editTarget === i ? null : i); }}
//                   className={`flex items-center justify-center rounded-full font-bold text-white text-xs shadow-md transition-all ${editTarget === i ? "w-10 h-10 ring-4 ring-white scale-110" : "w-8 h-8 ring-2 ring-white/80 scale-100"} ${mode === "submitted" ? "cursor-pointer" : "cursor-default"}`}
//                   style={{ backgroundColor: COLORS[i] }}>{LABELS[i]}</button>
//               </AdvancedMarker>
//             ))}
//           </Map>
//         </APIProvider>
//       </div>
//       <div className="p-4 bg-gray-50 border-t border-gray-200">
//         {mode === "picking" ? (
//           <button type="button" onClick={handleSubmit} disabled={pins.length === 0}
//             className={`w-full py-2.5 rounded-lg text-sm font-semibold transition-colors flex items-center justify-center gap-2 ${pins.length > 0 ? "bg-[#00a0ef] text-white hover:bg-[#008bd1] shadow-sm" : "bg-gray-200 text-gray-400 cursor-not-allowed"}`}>
//             {pins.length > 0 ? <><CheckCircle2 className="w-4 h-4" /> Confirm Boundaries</> : "Place at least 1 point"}
//           </button>
//         ) : (
//           <button type="button" onClick={() => { setPins([]); setSubmitted([]); setMode("picking"); setEditTarget(null); setNextId(0); }}
//             className="w-full py-2.5 rounded-lg text-sm font-semibold transition-colors flex items-center justify-center gap-2 bg-red-50 text-red-600 hover:bg-red-100">
//             <RotateCcw className="w-4 h-4" /> Reset Boundaries
//           </button>
//         )}
//       </div>
//     </div>
//   );
// }

// function ClickHandler({ onClick }: { onClick: (c: Coord) => void }) {
//   const map = useMap();
//   useEffect(() => {
//     if (!map) return;
//     const listener = map.addListener("click", (e: google.maps.MapMouseEvent) => {
//       if (e.latLng) onClick({ lat: e.latLng.lat(), lng: e.latLng.lng() });
//     });
//     return () => { google.maps.event.removeListener(listener); };
//   }, [map, onClick]);
//   return null;
// }

// // ============================================================
// //  STEP 1 FORM
// // ============================================================
// function Step1Form({ formData, setFormData }: { formData: Step1State; setFormData: React.Dispatch<React.SetStateAction<Step1State>>; }) {
//   const [activeSection, setActiveSection] = useState<keyof Step1State>('inputField');

//   useEffect(() => {
//     const docArea = parseFloat(formData.siteArea.extentAsPerDeed) || 0;
//     const actArea = parseFloat(formData.siteArea.extentForValuation) || 0;
//     const roadAffected = Math.max(0, docArea - actArea);
//     const siteAreaPlot = Math.min(docArea, actArea);
//     const mv = parseFloat(formData.plotValuation.unitRatePMR) || 0;
//     const pmr = siteAreaPlot * mv;
//     const sayValue = pmr > 0 ? Number(pmr).toFixed(4) : '';

//     if (
//       formData.siteArea.roadAffectedArea !== roadAffected.toString() ||
//       formData.plotValuation.siteArea !== siteAreaPlot.toString() ||
//       formData.plotValuation.pmrValue !== pmr.toString() ||
//       formData.plotValuation.sayValue !== sayValue
//     ) {
//       setFormData(prev => ({
//         ...prev,
//         siteArea: { ...prev.siteArea, roadAffectedArea: roadAffected.toString() },
//         plotValuation: { ...prev.plotValuation, siteArea: siteAreaPlot.toString(), pmrValue: pmr.toString(), sayValue: sayValue }
//       }));
//     }
//   }, [formData.siteArea.extentAsPerDeed, formData.siteArea.extentForValuation, formData.plotValuation.unitRatePMR, setFormData]);

//   const handleInputChange = (section: keyof Step1State, field: string, value: string) => {
//     setFormData(prev => ({ ...prev, [section]: { ...(prev[section] as any), [field]: value } }));
//   };

//   const checkIsFilled = (section: keyof Step1State) => Object.values(formData[section]).every(val => val !== '');

//   const renderSectionHeader = (title: string, id: keyof Step1State) => {
//     const isFilled = checkIsFilled(id);
//     return (
//       <div className={`flex items-center justify-between p-4 md:px-6 md:py-5 cursor-pointer transition-colors ${activeSection === id ? 'bg-blue-50/50 border-b border-blue-100' : 'bg-white hover:bg-gray-50 border-b border-gray-100'}`} onClick={() => setActiveSection(activeSection === id ? null as any : id)}>
//         <h3 className="font-bold md:text-[16px] text-[#00a0ef]">{title}</h3>
//         {isFilled ? <CheckCircle2 className="w-5 h-5 text-[#00a0ef]" /> : <Loader className={`w-5 h-5 text-[#00a0ef] ${activeSection === id ? '' : 'opacity-70'}`} />}
//       </div>
//     );
//   };

//   return (
//     <div className="bg-white border-y md:border border-gray-200 md:rounded-xl overflow-hidden shadow-sm divide-y divide-gray-100">
      
//       {/* ── Input Field ── */}
//       <div>
//         {renderSectionHeader('Initial Details', 'inputField')}
//         {activeSection === 'inputField' && (
//           <div className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 bg-blue-50/10">
//             <div>
//               <label className={labelStyles}>Date Valuation</label>
//               <input type="date" id="inputField-first" className={inputStyles} value={formData.inputField.dateOfValuation} onChange={e => handleInputChange('inputField', 'dateOfValuation', e.target.value)} />
//             </div>
//             <div>
//               <label className={labelStyles}>Date of Inspection</label>
//               <input type="date" className={inputStyles} value={formData.inputField.dateOfInspection} onChange={e => handleInputChange('inputField', 'dateOfInspection', e.target.value)} />
//             </div>
//             <div className="md:col-span-2">
//               <label className={labelStyles}>Type of Property</label>
//               <RadioGroup options={['Vacant Land - Residential', 'Existing Building - Residential', 'Open Piece of Land', 'Residential Flat', 'Agri Land', 'Residential Villa', 'Industrial Shed']} value={formData.inputField.propertyType} onChange={v => handleInputChange('inputField', 'propertyType', v)} />
//             </div>
//             <div className="md:col-span-2">
//               <label className={labelStyles}>Purpose of Valuation (Loan Type)</label>
//               <RadioGroup options={['Home Loan', 'Mortgage Loan', 'Education Loan', 'Collateral Security', 'For Bank Loan / Mortgage Purpose']} value={formData.inputField.purposeOfValuation} onChange={v => handleInputChange('inputField', 'purposeOfValuation', v)} />
//             </div>
//             <NextSectionButton onClick={() => setActiveSection('ownerDetails')} nextFocusId="ownerDetails-first" />
//           </div>
//         )}
//       </div>

//       {/* ── Owner Details ── */}
//       <div>
//         {renderSectionHeader('Owner Details', 'ownerDetails')}
//         {activeSection === 'ownerDetails' && (
//           <div className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 bg-blue-50/10">
//             <div className="md:col-span-2 flex gap-3">
//               <div className="w-1/3 md:w-1/4">
//                 <label className={labelStyles}>Prefix</label>
//                 <div className="relative">
//                   <select id="ownerDetails-first" className={`${inputStyles} appearance-none`} value={(formData.ownerDetails as any).prefix || 'Shri'}
//                     onChange={e => {
//                       const prefix = e.target.value;
//                       handleInputChange('ownerDetails', 'prefix', prefix);
//                       handleInputChange('ownerDetails', 'ownerRelation', prefix === 'Smt' ? 'W/o' : 'S/o');
//                     }}>
//                     <option value="Shri">Shri</option>
//                     <option value="Smt">Smt</option>
//                   </select>
//                   <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
//                 </div>
//               </div>
//               <div className="flex-1">
//                 <label className={labelStyles}>Owner Name</label>
//                 <input type="text" placeholder="Applicant / Owner Name" className={inputStyles} value={formData.ownerDetails.ownerName} onChange={e => handleInputChange('ownerDetails', 'ownerName', e.target.value)} />
//               </div>
//             </div>
//             <div className="flex gap-3 md:col-span-2">
//               <div className="w-1/3 md:w-1/4">
//                 <label className={labelStyles}>Relation</label>
//                 <div className="relative">
//                   <select className={`${inputStyles} appearance-none`} value={formData.ownerDetails.ownerRelation} onChange={e => handleInputChange('ownerDetails', 'ownerRelation', e.target.value)}>
//                     {(formData.ownerDetails as any).prefix === 'Smt' ? (<><option value="W/o">W/o</option><option value="D/o">D/o</option></>) : (<><option value="S/o">S/o</option><option value="F/o">F/o</option></>)}
//                   </select>
//                   <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
//                 </div>
//               </div>
//               <div className="flex-1">
//                 <label className={labelStyles}>Relative's Name</label>
//                 <input type="text" placeholder="Name" className={inputStyles} value={formData.ownerDetails.ownerRelationName} onChange={e => handleInputChange('ownerDetails', 'ownerRelationName', e.target.value)} />
//               </div>
//             </div>
//             <div className="md:col-span-2">
//               <label className={labelStyles}>Occupation</label>
//               <input type="text" placeholder="Enter Occupation Details" className={inputStyles} value={formData.ownerDetails.occupation} onChange={e => handleInputChange('ownerDetails', 'occupation', e.target.value)} />
//             </div>
//             <div>
//               <label className={labelStyles}>Phone Number 1</label>
//               <input type="tel" placeholder="+91 1234567890" className={inputStyles} value={formData.ownerDetails.ownerPhone} onChange={e => handleInputChange('ownerDetails', 'ownerPhone', e.target.value)} />
//             </div>
//             <div>
//               <label className={labelStyles}>Phone Number 2</label>
//               <input type="tel" placeholder="+91 1234567890" className={inputStyles} value={formData.ownerDetails.phone2} onChange={e => handleInputChange('ownerDetails', 'phone2', e.target.value)} />
//             </div>
//             <NextSectionButton onClick={() => setActiveSection('address')} nextFocusId="address-first" />
//           </div>
//         )}
//       </div>

//       {/* ── Address ── */}
//       <div>
//         {renderSectionHeader('Location / Address', 'address')}
//         {activeSection === 'address' && (
//           <div className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 bg-blue-50/10">
//             <div><label className={labelStyles}>Plot No. / H.No.</label><input id="address-first" type="text" className={inputStyles} value={formData.address.locHNo} onChange={e => handleInputChange('address', 'locHNo', e.target.value)} /></div>
//             <div><label className={labelStyles}>Road / Street / Colony</label><input type="text" className={inputStyles} value={formData.address.locSFNo} onChange={e => handleInputChange('address', 'locSFNo', e.target.value)} /></div>
//             <div><label className={labelStyles}>Village / Mandal / Municipality</label><input type="text" className={inputStyles} value={formData.address.locVillage} onChange={e => handleInputChange('address', 'locVillage', e.target.value)} /></div>
//             <div><label className={labelStyles}>District</label><input type="text" className={inputStyles} value={formData.address.district} onChange={e => handleInputChange('address', 'district', e.target.value)} /></div>
//             <div><label className={labelStyles}>Pincode</label><input type="text" className={inputStyles} value={formData.address.pinCode} onChange={e => handleInputChange('address', 'pinCode', e.target.value)} /></div>
//             <div><label className={labelStyles}>Landmark</label><input type="text" className={inputStyles} value={formData.address.landmark} onChange={e => handleInputChange('address', 'landmark', e.target.value)} /></div>
//             <NextSectionButton onClick={() => setActiveSection('bankDetails')} nextFocusId="bankDetails-first" />
//           </div>
//         )}
//       </div>

//       {/* ── Bank Details ── */}
//       <div>
//         {renderSectionHeader('Bank Details', 'bankDetails')}
//         {activeSection === 'bankDetails' && (
//           <div className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 bg-blue-50/10">
//             <div><label className={labelStyles}>IFSC Code</label><input id="bankDetails-first" type="text" className={inputStyles} value={formData.bankDetails.ifsc} onChange={e => handleInputChange('bankDetails', 'ifsc', e.target.value)} /></div>
//             <div><label className={labelStyles}>Bank Name</label><input type="text" className={inputStyles} value={formData.bankDetails.bankName} onChange={e => handleInputChange('bankDetails', 'bankName', e.target.value)} /></div>
//             <div><label className={labelStyles}>Branch</label><input type="text" className={inputStyles} value={formData.bankDetails.branch} onChange={e => handleInputChange('bankDetails', 'branch', e.target.value)} /></div>
//             <div><label className={labelStyles}>Email ID</label><input type="email" className={inputStyles} value={formData.bankDetails.email} onChange={e => handleInputChange('bankDetails', 'email', e.target.value)} /></div>
//             <div className="md:col-span-2"><label className={labelStyles}>Contact Person Details</label><input type="text" className={inputStyles} value={formData.bankDetails.contactPerson} onChange={e => handleInputChange('bankDetails', 'contactPerson', e.target.value)} /></div>
//             <NextSectionButton onClick={() => setActiveSection('siteArea')} nextFocusId="siteArea-first" />
//           </div>
//         )}
//       </div>

//       {/* ── Site Area ── */}
//       <div>
//         {renderSectionHeader('Site Area', 'siteArea')}
//         {activeSection === 'siteArea' && (
//           <div className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 bg-blue-50/10">
//             <div><label className={labelStyles}>As per Document (Sq.Yds)</label><input id="siteArea-first" type="number" className={inputStyles} value={formData.siteArea.extentAsPerDeed} onChange={e => handleInputChange('siteArea', 'extentAsPerDeed', e.target.value)} /></div>
//             <div><label className={labelStyles}>As per Actual (Sq.Yds)</label><input type="number" className={inputStyles} value={formData.siteArea.extentForValuation} onChange={e => handleInputChange('siteArea', 'extentForValuation', e.target.value)} /></div>
//             <div>
//               <label className={labelStyles}>Road Affected Area (Sq.Yds) <span className="text-[10px] text-gray-400 font-normal">(Doc - Actual)</span></label>
//               <input type="number" disabled className={`${inputStyles} bg-gray-100 text-gray-500 cursor-not-allowed`} value={formData.siteArea.roadAffectedArea} />
//             </div>
//             <div className="md:col-span-2">
//               <label className={labelStyles}>Site Shape</label>
//               <RadioGroup options={['Regular rectangular', 'Trapezium', 'Irregular', 'Square', 'Quadrilateral']} value={formData.siteArea.shapeOfLand} onChange={v => handleInputChange('siteArea', 'shapeOfLand', v)} />
//             </div>
//             <NextSectionButton onClick={() => setActiveSection('plotValuation')} nextFocusId="plotValuation-first" />
//           </div>
//         )}
//       </div>

//       {/* ── Plot Valuation ── */}
//       <div>
//         {renderSectionHeader('Plot Valuation', 'plotValuation')}
//         {activeSection === 'plotValuation' && (
//           <div className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 bg-blue-50/10">
//             <div>
//               <label className={labelStyles}>Site Area (Sq.Yds) <span className="text-[10px] text-gray-400 font-normal">(Min of Doc/Actual)</span></label>
//               <input type="number" disabled className={`${inputStyles} bg-gray-100 text-gray-500 cursor-not-allowed`} value={formData.plotValuation.siteArea} />
//             </div>
//             <div><label className={labelStyles}>GLR (Rs/Sq.Yds)</label><input id="plotValuation-first" type="number" className={inputStyles} value={formData.plotValuation.landValueGLR} onChange={e => handleInputChange('plotValuation', 'landValueGLR', e.target.value)} /></div>
//             <div><label className={labelStyles}>MV (Rs/Sq.Yds)</label><input type="number" className={inputStyles} value={formData.plotValuation.unitRatePMR} onChange={e => handleInputChange('plotValuation', 'unitRatePMR', e.target.value)} /></div>
//             <div>
//               <label className={labelStyles}>PMR (Plot Value) <span className="text-[10px] text-gray-400 font-normal">(Area * MV)</span></label>
//               <input type="number" disabled className={`${inputStyles} bg-gray-100 text-gray-500 cursor-not-allowed`} value={formData.plotValuation.pmrValue} />
//             </div>
//             <div className="md:col-span-2">
//               <label className={labelStyles}>Say Value <span className="text-[10px] text-gray-400 font-normal">(Round PMR, 4)</span></label>
//               <input type="text" disabled className={`${inputStyles} bg-gray-100 text-gray-500 cursor-not-allowed font-mono`} value={formData.plotValuation.sayValue} />
//             </div>
//           </div>
//         )}
//       </div>

//     </div>
//   );
// }

// // ============================================================
// //  STEP 2 FORM
// // ============================================================
// function Step2Form({ formData, setFormData, step1Data }: { formData: Step2State; setFormData: React.Dispatch<React.SetStateAction<Step2State>>; step1Data: Step1State; }) {
//   const [activeSection, setActiveSection] = useState<keyof Step2State>('localityDetails');
//   const fileInputRef = React.useRef<HTMLInputElement>(null);

//   useEffect(() => {
//     const sayValue = parseFloat(step1Data.plotValuation.sayValue) || 0;
//     const depRate = parseFloat(formData.buildingDetails.groundFloorDepreciationRate) || 0;
//     const depVal = sayValue * (depRate / 100);
//     if (formData.buildingDetails.groundFloorDepreciation !== depVal.toString()) {
//       setFormData(prev => ({ ...prev, buildingDetails: { ...prev.buildingDetails, groundFloorDepreciation: depVal.toString() } }));
//     }
//   }, [step1Data.plotValuation.sayValue, formData.buildingDetails.groundFloorDepreciationRate, setFormData]);

//   useEffect(() => {
//     const sayValue = parseFloat(step1Data.plotValuation.sayValue) || 0;
//     const realPct = parseFloat(formData.intendingVendor.realisablePercent) || 0;
//     const distPct = parseFloat(formData.intendingVendor.distressPercent) || 0;
//     const realVal = sayValue * (realPct / 100);
//     const distVal = sayValue * (distPct / 100);
//     if (formData.intendingVendor.realisableValue !== realVal.toString() || formData.intendingVendor.distressValue !== distVal.toString()) {
//       setFormData(prev => ({ ...prev, intendingVendor: { ...prev.intendingVendor, realisableValue: realVal.toString(), distressValue: distVal.toString() } }));
//     }
//   }, [step1Data.plotValuation.sayValue, formData.intendingVendor.realisablePercent, formData.intendingVendor.distressPercent, setFormData]);

//   const handleInputChange = (section: keyof Step2State, field: string, value: any) => {
//     setFormData(prev => ({ ...prev, [section]: { ...(prev[section] as any), [field]: value } }));
//   };

//   const handleBoundaryChange = (field: keyof Step2State['siteBoundaryDetails'], value: string | boolean) => {
//     setFormData(prev => {
//       const newState = { ...prev.siteBoundaryDetails, [field]: value };
//       if (newState.isActualSameAsDoc) {
//         if (typeof field === 'string' && field.includes('DeedDim')) newState[field.replace('DeedDim', 'ActualDim') as keyof Step2State['siteBoundaryDetails']] = value as never;
//         if (typeof field === 'string' && field.includes('BoundaryDeed')) newState[field.replace('BoundaryDeed', 'BoundaryActual') as keyof Step2State['siteBoundaryDetails']] = value as never;
//       }
//       return { ...prev, siteBoundaryDetails: newState };
//     });
//   };

//   const checkIsFilled = (section: keyof Step2State) => {
//     if (section === 'siteBoundaryDetails') return formData.siteBoundaryDetails.northDeedDim !== ''; 
//     const data = formData[section] as any;
//     return Object.entries(data).filter(([k]) => !['images', 'boundaryCoordinates', 'customFloor', 'additionalDetails'].includes(k)).every(([, v]) => v !== '' && v !== undefined);
//   };

//   const renderSectionHeader = (title: string, id: keyof Step2State) => {
//     const isFilled = checkIsFilled(id);
//     return (
//       <div className={`flex items-center justify-between p-4 md:px-6 md:py-5 cursor-pointer transition-colors ${activeSection === id ? 'bg-blue-50/50 border-b border-blue-100' : 'bg-white hover:bg-gray-50 border-b border-gray-100'}`} onClick={() => setActiveSection(activeSection === id ? null as any : id)}>
//         <h3 className="font-bold md:text-[16px] text-[#00a0ef]">{title}</h3>
//         {isFilled ? <CheckCircle2 className="w-5 h-5 text-[#00a0ef]" /> : <Loader className={`w-5 h-5 text-[#00a0ef] ${activeSection === id ? '' : 'opacity-70'}`} />}
//       </div>
//     );
//   };

//   return (
//     <div className="bg-white border-y md:border border-gray-200 md:rounded-xl overflow-hidden shadow-sm divide-y divide-gray-100">

//       {/* ── Locality Classification ── */}
//       <div>
//         {renderSectionHeader('Classification on Locality', 'localityDetails')}
//         {activeSection === 'localityDetails' && (
//           <div className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-2 gap-6 bg-blue-50/10">
//             <div className="md:col-span-2">
//               <label className={labelStyles} id="localityDetails-first">Rural / Urban</label>
//               <RadioGroup options={['Metro city', 'Urban', 'Semi Urban', 'Rural', 'N/A', 'Addition']} value={formData.localityDetails.urbanSemiUrbanRural} onChange={(v) => handleInputChange('localityDetails', 'urbanSemiUrbanRural', v)} />
//             </div>
//             <div className="md:col-span-2">
//               <label className={labelStyles}>Locality Class</label>
//               <RadioGroup options={['High', 'Middle', 'Low', 'Posh', 'N/A']} value={formData.localityDetails.classificationHighMiddlePoor} onChange={(v) => handleInputChange('localityDetails', 'classificationHighMiddlePoor', v)} />
//             </div>
//             <div className="md:col-span-1">
//               <label className={labelStyles}>Land Tenure</label>
//               <RadioGroup options={['Freehold', 'Leasehold', 'N/A']} value={formData.localityDetails.landTenure} onChange={(v) => handleInputChange('localityDetails', 'landTenure', v)} />
//             </div>
//             <div className="md:col-span-1">
//               <label className={labelStyles}>Width of Road</label>
//               <RadioGroup options={['< 10ft', '< 20ft', '> 20ft']} value={formData.localityDetails.widthOfRoad} onChange={(v) => handleInputChange('localityDetails', 'widthOfRoad', v)} />
//             </div>
//             <div className="md:col-span-2">
//               <label className={labelStyles}>Townplan / MC / GP</label>
//               <RadioGroup options={['MC', 'Townplanning', 'Gram panchayat', 'Outside MC']} value={formData.localityDetails.corporationVillageMunicipality} onChange={(v) => handleInputChange('localityDetails', 'corporationVillageMunicipality', v)} />
//             </div>
//             <NextSectionButton onClick={() => setActiveSection('intendingVendor')} nextFocusId="intendingVendor-first" />
//           </div>
//         )}
//       </div>

//       {/* ── Vendor & Estimates ── */}
//       <div>
//         {renderSectionHeader('Intending Vendor & Estimates', 'intendingVendor')}
//         {activeSection === 'intendingVendor' && (
//           <div className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 bg-blue-50/10">
            
//             <div className="md:col-span-2 p-4 bg-white border border-gray-200 rounded-xl shadow-sm">
//                <h4 className="text-[13px] font-bold text-[#00a0ef] mb-3">Owner Details (Read-only from Step 1)</h4>
//                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                  <div>
//                     <label className={labelStyles}>Owner Name</label>
//                     <input type="text" disabled className={`${inputStyles} bg-gray-50 cursor-not-allowed`} value={step1Data.ownerDetails.ownerName} />
//                  </div>
//                  <div>
//                     <label className={labelStyles}>Owner Phone</label>
//                     <input type="text" disabled className={`${inputStyles} bg-gray-50 cursor-not-allowed`} value={step1Data.ownerDetails.ownerPhone} />
//                  </div>
//                </div>
//             </div>

//             <div>
//               <label className={labelStyles}>Realisable %</label>
//               <input id="intendingVendor-first" type="number" className={inputStyles} value={formData.intendingVendor.realisablePercent} onChange={e => handleInputChange('intendingVendor', 'realisablePercent', e.target.value)} />
//             </div>
//             <div>
//               <label className={labelStyles}>Realisable Value (Say * %)</label>
//               <input type="text" disabled className={`${inputStyles} bg-gray-100 text-gray-500 cursor-not-allowed`} value={formData.intendingVendor.realisableValue} />
//             </div>
//             <div>
//               <label className={labelStyles}>Distress %</label>
//               <input type="number" className={inputStyles} value={formData.intendingVendor.distressPercent} onChange={e => handleInputChange('intendingVendor', 'distressPercent', e.target.value)} />
//             </div>
//             <div>
//               <label className={labelStyles}>Distress Value (Say * %)</label>
//               <input type="text" disabled className={`${inputStyles} bg-gray-100 text-gray-500 cursor-not-allowed`} value={formData.intendingVendor.distressValue} />
//             </div>
//             <NextSectionButton onClick={() => setActiveSection('propertyDetails')} nextFocusId="propertyDetails-first" />
//           </div>
//         )}
//       </div>

//       {/* ── Property Details ── */}
//       <div>
//         {renderSectionHeader('Property Settings & Location', 'propertyDetails')}
//         {activeSection === 'propertyDetails' && (
//           <div className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 bg-blue-50/10">
//             <div className="md:col-span-1">
//               <label className={labelStyles} id="propertyDetails-first">Vacant Plot?</label>
//               <RadioGroup options={['Yes', 'No']} value={formData.propertyDetails.vacantPlot} onChange={(v) => handleInputChange('propertyDetails', 'vacantPlot', v)} />
//             </div>

//             <div className="md:col-span-2 mt-4">
//               <label className={labelStyles}>Select Geo Location & Boundaries</label>
//               <GeoCoordinatePicker 
//                 onCoordinatesSubmit={(coords) => {
//                   handleInputChange('propertyDetails', 'boundaryCoordinates', coords);
//                   if (coords.length > 0) {
//                     handleInputChange('propertyDetails', 'latitude', coords[0].lat.toString());
//                     handleInputChange('propertyDetails', 'longitude', coords[0].lng.toString());
//                   }
//                 }} 
//               />
//             </div>
            
//             <div className="md:col-span-2 mt-6">
//               <label className={labelStyles}>Upload Site Photos</label>
//               <div onClick={() => fileInputRef.current?.click()} className="border-2 border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center justify-center bg-white hover:bg-gray-50 transition cursor-pointer">
//                 <input type="file" multiple accept="image/*" className="hidden" ref={fileInputRef} onChange={(e) => {
//                     if (e.target.files) {
//                       setFormData(prev => ({ ...prev, propertyDetails: { ...prev.propertyDetails, images: [...prev.propertyDetails.images, ...Array.from(e.target.files!)] } }));
//                     }
//                 }}/>
//                 <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3">
//                   <UploadCloud className="w-6 h-6 text-gray-500" />
//                 </div>
//                 <p className="text-sm text-gray-600 text-center">Drag and drop your photos here or click to <span className="text-[#00a0ef] font-medium">browse files</span></p>
//               </div>
//               {formData.propertyDetails.images.length > 0 && (
//                 <div className="grid grid-cols-3 md:grid-cols-5 gap-3 mt-4">
//                   {formData.propertyDetails.images.map((file: File, idx: number) => (
//                     <div key={idx} className="relative aspect-square rounded-lg border border-gray-200 overflow-hidden bg-gray-50 flex items-center justify-center group">
//                       <img src={URL.createObjectURL(file)} alt="Preview" className="w-full h-full object-cover transition-opacity group-hover:opacity-75" />
//                       <button type="button" onClick={(e) => { e.stopPropagation(); setFormData(prev => ({ ...prev, propertyDetails: { ...prev.propertyDetails, images: prev.propertyDetails.images.filter((_, i) => i !== idx) } })); }} className="absolute top-1 right-1 bg-white/90 backdrop-blur-sm rounded-full p-1.5 shadow-md md:opacity-0 md:group-hover:opacity-100 transition-all hover:bg-red-50 hover:scale-105">
//                         <X className="w-3.5 h-3.5 text-red-500" />
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//             <NextSectionButton onClick={() => setActiveSection('siteBoundaryDetails')} nextFocusId="siteBoundaryDetails-first" />
//           </div>
//         )}
//       </div>

//       {/* ── Site Boundary Details ── */}
//       <div>
//         {renderSectionHeader('Site Boundary & Dimensions', 'siteBoundaryDetails')}
//         {activeSection === 'siteBoundaryDetails' && (
//           <div className="p-4 md:p-6 bg-blue-50/10 space-y-6">
            
//             {/* Dimensions */}
//             <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
//               <h4 className="text-[13px] font-bold text-[#00a0ef] mb-4 border-b border-gray-100 pb-2">Dimensions</h4>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 {(['north', 'south', 'east', 'west'] as const).map(dir => (
//                   <div key={dir} className="flex gap-2">
//                     <div className="flex-1">
//                       <label className={labelStyles}>{dir.charAt(0).toUpperCase() + dir.slice(1)} (Doc)</label>
//                       <input id={dir==='north' ? 'siteBoundaryDetails-first' : undefined} type="text" placeholder="Doc Dim" className={inputStyles} value={(formData.siteBoundaryDetails as any)[`${dir}DeedDim`]} onChange={e => handleBoundaryChange(`${dir}DeedDim` as any, e.target.value)} />
//                     </div>
//                     <div className="flex-1">
//                       <label className={labelStyles}>{dir.charAt(0).toUpperCase() + dir.slice(1)} (Actual)</label>
//                       <input type="text" placeholder="Act Dim" className={`${inputStyles} ${formData.siteBoundaryDetails.isActualSameAsDoc ? 'bg-gray-50 text-gray-500 cursor-not-allowed' : ''}`} disabled={formData.siteBoundaryDetails.isActualSameAsDoc} value={(formData.siteBoundaryDetails as any)[`${dir}ActualDim`]} onChange={e => handleBoundaryChange(`${dir}ActualDim` as any, e.target.value)} />
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Boundaries */}
//             <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
//               <h4 className="text-[13px] font-bold text-[#00a0ef] mb-4 border-b border-gray-100 pb-2">Boundaries</h4>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 {(['north', 'south', 'east', 'west'] as const).map(dir => (
//                   <div key={dir} className="flex gap-2">
//                     <div className="flex-1">
//                       <label className={labelStyles}>{dir.charAt(0).toUpperCase() + dir.slice(1)} (Doc)</label>
//                       <input type="text" placeholder="Doc Bound" className={inputStyles} value={(formData.siteBoundaryDetails as any)[`${dir}BoundaryDeed`]} onChange={e => handleBoundaryChange(`${dir}BoundaryDeed` as any, e.target.value)} />
//                     </div>
//                     <div className="flex-1">
//                       <label className={labelStyles}>{dir.charAt(0).toUpperCase() + dir.slice(1)} (Actual)</label>
//                       <input type="text" placeholder="Act Bound" className={`${inputStyles} ${formData.siteBoundaryDetails.isActualSameAsDoc ? 'bg-gray-50 text-gray-500 cursor-not-allowed' : ''}`} disabled={formData.siteBoundaryDetails.isActualSameAsDoc} value={(formData.siteBoundaryDetails as any)[`${dir}BoundaryActual`]} onChange={e => handleBoundaryChange(`${dir}BoundaryActual` as any, e.target.value)} />
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <div className="flex items-center gap-3 p-4 bg-white border border-gray-200 shadow-sm rounded-xl">
//               <input type="checkbox" id="same-as-doc" checked={formData.siteBoundaryDetails.isActualSameAsDoc}
//                 onChange={(e) => {
//                   handleBoundaryChange('isActualSameAsDoc', e.target.checked);
//                   if (e.target.checked) {
//                     ['north', 'south', 'east', 'west'].forEach(dir => {
//                       handleBoundaryChange(`${dir}ActualDim` as any, (formData.siteBoundaryDetails as any)[`${dir}DeedDim`]);
//                       handleBoundaryChange(`${dir}BoundaryActual` as any, (formData.siteBoundaryDetails as any)[`${dir}BoundaryDeed`]);
//                     });
//                   }
//                 }}
//                 className="w-4 h-4 text-[#00a0ef] border-gray-300 rounded focus:ring-[#00a0ef]" />
//               <label htmlFor="same-as-doc" className="text-sm font-semibold text-gray-800 cursor-pointer select-none">Actual Boundaries & Dimensions are the same as Document</label>
//             </div>
//             <NextSectionButton onClick={() => setActiveSection('wallDetails')} nextFocusId="wallDetails-first" />
//           </div>
//         )}
//       </div>

//       {/* ── Wall Details ── */}
//       <div>
//         {renderSectionHeader('Wall Details', 'wallDetails')}
//         {activeSection === 'wallDetails' && (
//           <div className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 bg-blue-50/10">
//             <div><label className={labelStyles}>Length (ft/m)</label><input id="wallDetails-first" type="text" className={inputStyles} value={formData.wallDetails.compWallBuildingLength} onChange={e => handleInputChange('wallDetails', 'compWallBuildingLength', e.target.value)} /></div>
//             <div><label className={labelStyles}>Height (ft/m)</label><input type="text" className={inputStyles} value={formData.wallDetails.compWallBuildingHeight} onChange={e => handleInputChange('wallDetails', 'compWallBuildingHeight', e.target.value)} /></div>
//             <div className="md:col-span-2">
//               <label className={labelStyles}>Walls on Side</label>
//               <RadioGroup options={['1', '2', '3', '4']} value={formData.wallDetails.wallsOnSide} onChange={(v) => handleInputChange('wallDetails', 'wallsOnSide', v)} />
//             </div>
//             <div className="md:col-span-2">
//               <label className={labelStyles}>Type of Brick</label>
//               <RadioGroup options={['Brick work', 'RCC', 'Pacca offset/pavement']} value={formData.wallDetails.compWallBuildingType} onChange={(v) => handleInputChange('wallDetails', 'compWallBuildingType', v)} />
//             </div>
//             <NextSectionButton onClick={() => setActiveSection('buildingDetails')} nextFocusId="buildingDetails-first" />
//           </div>
//         )}
//       </div>

//       {/* ── Building Details ── */}
//       <div>
//         {renderSectionHeader('Building Details', 'buildingDetails')}
//         {activeSection === 'buildingDetails' && (
//           <div className="p-4 md:p-6 grid grid-cols-1 gap-6 bg-blue-50/10">
//             <div className="md:col-span-1">
//               <label className={labelStyles} id="buildingDetails-first">Number of Stories</label>
//               <RadioGroup options={['1', '2', '3', '4', '5', '6', '7', '8', '9', 'Vacant']} value={formData.buildingDetails.numberOfFloorsHeight} onChange={(v) => handleInputChange('buildingDetails', 'numberOfFloorsHeight', v)} />
//             </div>

//             <div className="md:col-span-1">
//               <label className={labelStyles}>Floors Details</label>
//               <MultiSelectGroup options={['Basement', 'Stilt', 'GF', 'FF', 'SF', 'TF', '4th', 'Multistorey']} selected={formData.buildingDetails.buildingFloors} onChange={(v) => handleInputChange('buildingDetails', 'buildingFloors', v)} />
//               <div className="flex gap-2 mt-3 w-full max-w-sm">
//                 <input type="text" placeholder="Add Custom Floor..." className={inputStyles} value={formData.buildingDetails.customFloor} onChange={e => handleInputChange('buildingDetails', 'customFloor', e.target.value)} />
//                 <button type="button" onClick={() => {
//                   if (formData.buildingDetails.customFloor && !formData.buildingDetails.buildingFloors.includes(formData.buildingDetails.customFloor)) {
//                     handleInputChange('buildingDetails', 'buildingFloors', [...formData.buildingDetails.buildingFloors, formData.buildingDetails.customFloor]);
//                     handleInputChange('buildingDetails', 'customFloor', '');
//                   }
//                 }} className="px-4 py-2 bg-[#00a0ef] text-white rounded-lg font-medium hover:bg-[#008bd1]">Add</button>
//               </div>
//             </div>

//             <div className="md:col-span-1">
//               <label className={labelStyles}>Possession With</label>
//               <RadioGroup options={['Owner', 'Tenant']} value={formData.buildingDetails.occupiedBy} onChange={(v) => handleInputChange('buildingDetails', 'occupiedBy', v)} />
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-white rounded-xl shadow-sm border border-gray-200">
//               <div><label className={labelStyles}>Depreciation Rate (%)</label><input type="number" className={inputStyles} value={formData.buildingDetails.groundFloorDepreciationRate} onChange={e => handleInputChange('buildingDetails', 'groundFloorDepreciationRate', e.target.value)} /></div>
//               <div><label className={labelStyles}>Depreciation Value (Say * Rate)</label><input type="text" disabled className={`${inputStyles} bg-gray-50 text-gray-500 cursor-not-allowed`} value={formData.buildingDetails.groundFloorDepreciation} /></div>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//               <div><label className={labelStyles}>Length</label><input type="text" className={inputStyles} value={formData.buildingDetails.buildingLength} onChange={e => handleInputChange('buildingDetails', 'buildingLength', e.target.value)} /></div>
//               <div><label className={labelStyles}>Breadth</label><input type="text" className={inputStyles} value={formData.buildingDetails.buildingBreadth} onChange={e => handleInputChange('buildingDetails', 'buildingBreadth', e.target.value)} /></div>
//               <div><label className={labelStyles}>Covered Area</label><input type="text" className={inputStyles} value={formData.buildingDetails.groundFloorPlinthArea} onChange={e => handleInputChange('buildingDetails', 'groundFloorPlinthArea', e.target.value)} /></div>
//             </div>

//             <div className="md:col-span-1">
//               <label className={labelStyles}>Condition</label>
//               <RadioGroup options={['Excellent', 'Good', 'Avg', 'Poor', 'Under Construction', 'Under Finishing', 'Others']} value={formData.buildingDetails.qualityOfConstruction} onChange={(v) => handleInputChange('buildingDetails', 'qualityOfConstruction', v)} />
//             </div>

//             <div className="md:col-span-1">
//               <label className={labelStyles}>Structure</label>
//               <RadioGroup options={['RCC framed', 'Load bearing', 'Composite Structure', 'PEB/Shed']} value={formData.buildingDetails.specSuperStructure} onChange={(v) => handleInputChange('buildingDetails', 'specSuperStructure', v)} />
//             </div>

//             <div className="md:col-span-1">
//               <label className={labelStyles}>Flooring</label>
//               <RadioGroup options={['Tiles', 'Marble', 'Wood', 'Cement', 'Pending', 'Other']} value={formData.buildingDetails.specFlooring} onChange={(v) => handleInputChange('buildingDetails', 'specFlooring', v)} />
//             </div>

//             <div className="md:col-span-1">
//               <label className={labelStyles}>Accommodation</label>
//               <RadioGroup options={['Storage', 'Shop', 'Office Space', '1BHK', '1.5BHK', '2BHK', '2.5BHK', '3BHK', '3.5BHK', '4BHK', '4.5BHK', '5BHK', '5.5BHK', '6BHK', 'Studio', 'Penthouse']} value={formData.buildingDetails.accommodation} onChange={(v) => handleInputChange('buildingDetails', 'accommodation', v)} />
//             </div>

//             <div className="md:col-span-1">
//               <label className={labelStyles}>Doors / Windows</label>
//               <RadioGroup options={['Wooden', 'Aluminium', 'Glass', 'UPVC', 'Pending', 'N/A']} value={formData.buildingDetails.specJoinery} onChange={(v) => handleInputChange('buildingDetails', 'specJoinery', v)} />
//             </div>

//             <div className="md:col-span-1">
//               <label className={labelStyles}>Sanitary Fitting</label>
//               <RadioGroup options={['Ordinary', 'Good', 'Superior', 'Premium', 'Excellent', 'Under Construction']} value={formData.buildingDetails.sanitaryFitting} onChange={(v) => handleInputChange('buildingDetails', 'sanitaryFitting', v)} />
//             </div>

//             <div className="md:col-span-1">
//               <label className={labelStyles}>Electrical Fitting</label>
//               <RadioGroup options={['Ordinary', 'Good', 'Superior', 'Premium', 'Excellent', 'Under Construction']} value={formData.buildingDetails.classOfFittings} onChange={(v) => handleInputChange('buildingDetails', 'classOfFittings', v)} />
//             </div>

//             <div className="md:col-span-1">
//               <label className={labelStyles}>Floor Remarks</label>
//               <textarea rows={3} className={inputStyles} value={formData.buildingDetails.generalRemarks} onChange={e => handleInputChange('buildingDetails', 'generalRemarks', e.target.value)}></textarea>
//             </div>
//             <NextSectionButton onClick={() => setActiveSection('marketDetails')} nextFocusId="marketDetails-first" />
//           </div>
//         )}
//       </div>

//       {/* ── Building Shared / Market Details ── */}
//       <div>
//         {renderSectionHeader('Building-Shared & Market Details', 'marketDetails')}
//         {activeSection === 'marketDetails' && (
//           <div className="p-4 md:p-6 grid grid-cols-1 gap-6 bg-blue-50/10">
            
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div><label className={labelStyles}>Year of Construction</label><input id="marketDetails-first" type="text" className={inputStyles} value={formData.marketDetails.yearOfConstruction} onChange={e => handleInputChange('marketDetails', 'yearOfConstruction', e.target.value)} /></div>
//               <div>
//                 <label className={labelStyles}>Renovation</label>
//                 <RadioGroup options={['Yes', 'No']} value={formData.marketDetails.renovation} onChange={(v) => handleInputChange('marketDetails', 'renovation', v)} />
//               </div>
//             </div>

//             <div>
//               <label className={labelStyles}>Parking</label>
//               <RadioGroup options={['Covered', 'Not Present', 'Open', 'N/A']} value={formData.marketDetails.parking} onChange={(v) => handleInputChange('marketDetails', 'parking', v)} />
//             </div>

//             <div>
//               <label className={labelStyles}>Lift</label>
//               <RadioGroup options={['Yes', 'No', 'N/A']} value={formData.marketDetails.lift} onChange={(v) => handleInputChange('marketDetails', 'lift', v)} />
//             </div>
            
//             <div className="md:col-span-1">
//               <label className={labelStyles}>Kitchen Type</label>
//               <RadioGroup options={['Modular', 'Semi Modular', 'Ordinary', 'N/A', 'Other']} value={formData.marketDetails.kitchenType} onChange={(v) => handleInputChange('marketDetails', 'kitchenType', v)} />
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div><label className={labelStyles}>Rental Income (Minimum)</label><input type="number" className={inputStyles} value={formData.marketDetails.rentalIncomeMin} onChange={e => handleInputChange('marketDetails', 'rentalIncomeMin', e.target.value)} /></div>
//               <div><label className={labelStyles}>Rental Income (Maximum)</label><input type="number" className={inputStyles} value={formData.marketDetails.rentalIncomeMax} onChange={e => handleInputChange('marketDetails', 'rentalIncomeMax', e.target.value)} /></div>
//             </div>

//             {/* Market Rates */}
//             {['Client', 'Dealer', 'Market'].map((type) => {
//               const field = `marketRate${type}Min` as keyof Step2State['marketDetails'];
//               const maxField = `marketRate${type}Max` as keyof Step2State['marketDetails'];
//               const unitField = `marketRate${type}Unit` as keyof Step2State['marketDetails'];
//               return (
//                 <div key={type} className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
//                   <h4 className="text-[13px] font-bold text-[#00a0ef] mb-3">Market Rate (As per {type})</h4>
//                   <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
//                     <input type="number" placeholder="Min" className={inputStyles} value={formData.marketDetails[field] as string} onChange={e => handleInputChange('marketDetails', field, e.target.value)} />
//                     <input type="number" placeholder="Max" className={inputStyles} value={formData.marketDetails[maxField] as string} onChange={e => handleInputChange('marketDetails', maxField, e.target.value)} />
//                     <div className="relative">
//                       <select className={`${inputStyles} appearance-none`} value={formData.marketDetails[unitField] as string} onChange={e => handleInputChange('marketDetails', unitField, e.target.value)}>
//                         <option value="">Select Unit</option><option value="Hundred">Hundred</option><option value="Thousand">Thousand</option><option value="Lakh">Lakh</option><option value="Crore">Crore</option>
//                       </select>
//                       <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}

//             <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
//               <h4 className="text-[13px] font-bold text-[#00a0ef] mb-3">Dealer Details</h4>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <input type="text" placeholder="Dealer Name" className={inputStyles} value={formData.marketDetails.dealerName} onChange={e => handleInputChange('marketDetails', 'dealerName', e.target.value)} />
//                 <input type="tel" placeholder="Dealer Mobile Number" className={inputStyles} value={formData.marketDetails.dealerMobile} onChange={e => handleInputChange('marketDetails', 'dealerMobile', e.target.value)} />
//               </div>
//             </div>

//             {/* Dynamic Key-Value Pairs */}
//             <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
//               <div className="flex items-center justify-between mb-3">
//                 <label className={labelStyles}>Additional Details</label>
//                 <button type="button" onClick={() => handleInputChange('marketDetails', 'additionalDetails', [...formData.marketDetails.additionalDetails, { key: '', value: '' }])} className="text-xs font-semibold text-[#00a0ef] hover:underline flex items-center gap-1"><Plus size={14}/> Add Detail</button>
//               </div>
//               <div className="space-y-3">
//                 {formData.marketDetails.additionalDetails.map((pair: { key: string, value: string }, idx: number) => (
//                   <div key={idx} className="flex gap-3">
//                     <input type="text" placeholder="Detail Name" className={inputStyles} value={pair.key} onChange={e => {
//                       const newArr = [...formData.marketDetails.additionalDetails];
//                       newArr[idx].key = e.target.value;
//                       handleInputChange('marketDetails', 'additionalDetails', newArr);
//                     }} />
//                     <input type="text" placeholder="Value" className={inputStyles} value={pair.value} onChange={e => {
//                       const newArr = [...formData.marketDetails.additionalDetails];
//                       newArr[idx].value = e.target.value;
//                       handleInputChange('marketDetails', 'additionalDetails', newArr);
//                     }} />
//                     <button type="button" onClick={() => {
//                       const newArr = formData.marketDetails.additionalDetails.filter((_, i) => i !== idx);
//                       handleInputChange('marketDetails', 'additionalDetails', newArr);
//                     }} className="px-3 py-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"><Trash2 size={18}/></button>
//                   </div>
//                 ))}
//               </div>
//             </div>

//           </div>
//         )}
//       </div>

//     </div>
//   );
// }

// // ============================================================
// //  STEP 3 & 4 (Document & Inspection Uploads)
// // ============================================================
// function Step3Form({ formData, setFormData }: { formData: Step3State; setFormData: React.Dispatch<React.SetStateAction<Step3State>>; }) {
//   const [activeSection, setActiveSection] = useState<keyof Step3State>('documentUpload');
//   const handleFileUpload = (category: keyof Step3State['documentUpload'], e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) { const newFiles = Array.from(e.target.files); setFormData(prev => ({ ...prev, documentUpload: { ...prev.documentUpload, [category]: [...prev.documentUpload[category], ...newFiles] } })); }
//   };
//   const removeFile = (category: keyof Step3State['documentUpload'], index: number) => {
//     setFormData(prev => ({ ...prev, documentUpload: { ...prev.documentUpload, [category]: prev.documentUpload[category].filter((_, i) => i !== index) } }));
//   };
//   const checkIsFilled = () => Object.values(formData.documentUpload).some(files => files.length > 0);
//   const renderUploadBlock = (title: string, category: keyof Step3State['documentUpload']) => {
//     const files = formData.documentUpload[category];
//     const inputId = `upload-${category}`;
//     return (
//       <div className="mb-6 last:mb-0">
//         <h4 className="text-sm font-semibold text-gray-900 mb-3">{title}</h4>
//         {files.length === 0 ? (
//           <label htmlFor={inputId} className="border-2 border-dashed border-gray-200 rounded-xl p-8 flex flex-col items-center justify-center bg-gray-50/50 hover:bg-gray-50 transition cursor-pointer">
//             <input type="file" id={inputId} multiple className="hidden" onChange={(e) => handleFileUpload(category, e)} />
//             <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mb-3"><UploadCloud className="w-5 h-5 text-gray-600" /></div>
//             <p className="text-sm text-gray-800 text-center">Drag and drop document here or <span className="text-[#00a0ef] font-medium underline">browse</span></p>
//           </label>
//         ) : (
//           <div className="space-y-3">
//             {files.map((file: File, idx: number) => (
//               <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 border border-gray-100 rounded-xl">
//                 <div className="flex items-center gap-3"><div className="w-10 h-10 bg-[#e6f5fd] rounded-lg flex items-center justify-center text-[#00a0ef]"><FileText className="w-5 h-5" /></div><div><p className="text-sm font-medium text-gray-900 line-clamp-1">{file.name}</p><p className="text-xs text-gray-500">{(file.size / (1024 * 1024)).toFixed(1)} MB</p></div></div>
//                 <button onClick={() => removeFile(category, idx)} className="text-sm text-red-500 font-medium px-2 py-1">Remove</button>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     );
//   };
//   return (
//     <div className="bg-white border-y md:border border-gray-200 md:rounded-xl overflow-hidden shadow-sm divide-y divide-gray-100">
//       <div className={`flex items-center justify-between p-4 md:p-6 cursor-pointer ${activeSection === 'documentUpload' ? 'bg-blue-50/50 border-b border-blue-100' : 'bg-white hover:bg-gray-50'}`} onClick={() => setActiveSection(activeSection === 'documentUpload' ? null as any : 'documentUpload')}>
//         <h3 className="font-bold md:text-[16px] text-[#00a0ef]">Document Upload</h3>{checkIsFilled() ? <CheckCircle2 className="w-5 h-5 text-[#00a0ef]" /> : <Loader className={`w-5 h-5 text-[#00a0ef] ${activeSection === 'documentUpload' ? '' : 'opacity-70'}`} />}
//       </div>
//       {activeSection === 'documentUpload' && (
//         <div className="p-4 md:p-6 bg-white">
//           {renderUploadBlock('Sale Deed / Ownership', 'saleDeed')}
//           {renderUploadBlock('Building Permission Copy', 'buildingPermission')}
//           {renderUploadBlock('Layout Copy', 'layoutCopy')}
//           {renderUploadBlock('Legal Opinion', 'legalOpinion')}
//           {renderUploadBlock('Property Tax', 'propertyTax')}
//         </div>
//       )}
//     </div>
//   );
// }

// function Step4Form({ formData, setFormData }: { formData: Step4State; setFormData: React.Dispatch<React.SetStateAction<Step4State>>; }) {
//   const [activeSection, setActiveSection] = useState<keyof Step4State>('siteInspection');
//   const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => { if (e.target.files) setFormData(prev => ({ ...prev, siteInspection: { reportFiles: [...prev.siteInspection.reportFiles, ...Array.from(e.target.files!)] } })); };
//   const removeFile = (index: number) => setFormData(prev => ({ ...prev, siteInspection: { reportFiles: prev.siteInspection.reportFiles.filter((_, i) => i !== index) } }));
//   const files = formData.siteInspection.reportFiles;
//   const inputId = "upload-inspection-report";

//   return (
//     <div className="bg-white border-y md:border border-gray-200 md:rounded-xl overflow-hidden shadow-sm divide-y divide-gray-100">
//       <div className={`flex items-center justify-between p-4 md:p-6 cursor-pointer ${activeSection === 'siteInspection' ? 'bg-blue-50/50 border-b border-blue-100' : 'bg-white hover:bg-gray-50'}`} onClick={() => setActiveSection(activeSection === 'siteInspection' ? null as any : 'siteInspection')}>
//         <h3 className="font-bold md:text-[16px] text-[#00a0ef]">Upload Site Inspection Report</h3>{files.length > 0 ? <CheckCircle2 className="w-5 h-5 text-[#00a0ef]" /> : <Loader className={`w-5 h-5 text-[#00a0ef] ${activeSection === 'siteInspection' ? '' : 'opacity-70'}`} />}
//       </div>
//       {activeSection === 'siteInspection' && (
//         <div className="p-4 md:p-6 bg-white">
//           {files.length === 0 ? (
//             <label htmlFor={inputId} className="border-2 border-dashed border-gray-200 rounded-xl p-12 flex flex-col items-center justify-center bg-gray-50/50 hover:bg-gray-50 cursor-pointer min-h-[350px]">
//               <input type="file" id={inputId} multiple className="hidden" onChange={handleFileUpload} />
//               <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mb-3"><UploadCloud className="w-5 h-5 text-gray-600" /></div>
//               <p className="text-sm text-gray-800 text-center">Drag and drop document here or <span className="text-[#00a0ef] font-medium underline">browse</span></p>
//             </label>
//           ) : (
//             <div className="space-y-3">
//               {files.map((file: File, idx: number) => (
//                 <div key={idx} className="flex items-center justify-between p-3 md:p-4 bg-gray-50 border border-gray-100 rounded-xl">
//                   <div className="flex items-center gap-3"><div className="w-10 h-10 bg-[#e6f5fd] rounded-lg flex items-center justify-center text-[#00a0ef]"><FileText className="w-5 h-5" /></div><div><p className="text-sm font-medium text-gray-900 line-clamp-1">{file.name}</p><p className="text-xs text-gray-500">{(file.size / (1024 * 1024)).toFixed(1)} MB</p></div></div>
//                   <button onClick={() => removeFile(idx)} className="text-sm text-red-500 font-medium px-2 py-1">Remove</button>
//                 </div>
//               ))}
//               <label htmlFor={inputId} className="mt-4 inline-block px-4 py-2 bg-blue-50 text-[#00a0ef] rounded-lg text-sm font-medium cursor-pointer hover:bg-blue-100">+ Add more files</label>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }

// // ============================================================
// //  STEP 5 FORM (REVIEW MAPPER)
// // ============================================================
// function Step5Form({ step1, step2, step3, step4, onEditStep, isConfirmed, setIsConfirmed }: Step5FormProps) {
//   const MainCategory = ({ title, icon: Icon, children }: any) => (
//     <div className="mb-8 px-1"><div className="flex items-center gap-2 mb-4"><div className="w-5 h-5 flex items-center justify-center text-[#00a0ef]"><Icon className="w-5 h-5 fill-current opacity-20" strokeWidth={2} /></div><h3 className="text-[15px] font-bold text-gray-900">{title}</h3></div><div className="bg-white px-2">{children}</div></div>
//   );
//   const SubCategory = ({ title, stepNum, children }: any) => (
//     <div className="py-4 border-b border-gray-200 last:border-0 first:pt-0"><div className="flex items-center justify-between mb-4"><h4 className="text-[13px] font-bold text-gray-800">{title}</h4><button type="button" onClick={() => onEditStep(stepNum)} className="text-[#00a0ef] hover:bg-blue-50 p-1.5 rounded transition-colors"><Edit2 className="w-3.5 h-3.5" /></button></div><div className="grid grid-cols-2 gap-y-4 gap-x-4">{children}</div></div>
//   );
//   const DataField = ({ label, value }: any) => (
//     <div><p className="text-[11px] text-gray-500 font-medium mb-1">{label}</p><div className="text-[13px] font-medium text-gray-900 break-words">{value || '—'}</div></div>
//   );
//   const FileCard = ({ file }: { file: File }) => (
//     <div className="flex items-center justify-between p-3 bg-[#f2f9fd] rounded-xl mb-3 border border-[#e5f3fa]">
//       <div className="flex items-center gap-3"><div className="w-8 h-8 bg-[#00a0ef] rounded-lg flex items-center justify-center text-white shadow-sm"><FileText className="w-4 h-4" /></div><div><p className="text-[12px] font-semibold text-gray-900 line-clamp-1">{file.name}</p><p className="text-[10px] font-medium text-gray-500">{(file.size / (1024 * 1024)).toFixed(1)} MB</p></div></div>
//     </div>
//   );
  
//   const allStep3Files = Object.values(step3.documentUpload).flat() as File[];

//   return (
//     <div className="max-w-3xl bg-white mx-auto md:px-4 pb-8">
//       <div className="py-6 px-2"><h2 className="text-[18px] font-bold text-[#00a0ef]">Review & Submit</h2></div>

//       <MainCategory title="Basic Details" icon={LayoutGrid}>
//         <SubCategory title="Input Details" stepNum={1}>
//           <DataField label="Date Valuation" value={step1.inputField.dateOfValuation} />
//           <DataField label="Date of Inspection" value={step1.inputField.dateOfInspection} />
//           <DataField label="Type of Property" value={step1.inputField.propertyType} />
//           <DataField label="Purpose of Valuation" value={step1.inputField.purposeOfValuation} />
//         </SubCategory>
//         <SubCategory title="Owner Details" stepNum={1}>
//           <DataField label="Name" value={step1.ownerDetails.ownerName} />
//           <DataField label="Relation" value={`${step1.ownerDetails.ownerRelation} ${step1.ownerDetails.ownerRelationName}`} />
//           <DataField label="Phone 1" value={step1.ownerDetails.ownerPhone} />
//         </SubCategory>
//         <SubCategory title="Address" stepNum={1}>
//           <DataField label="Plot No. / H.No." value={step1.address.locHNo} />
//           <DataField label="Road / Street" value={step1.address.locSFNo} />
//           <DataField label="Village" value={step1.address.locVillage} />
//           <DataField label="District" value={step1.address.district} />
//           <DataField label="Pincode" value={step1.address.pinCode} />
//           <DataField label="Landmark" value={step1.address.landmark} />
//         </SubCategory>
//         <SubCategory title="Bank Details" stepNum={1}>
//           <DataField label="Bank Name" value={step1.bankDetails.bankName} />
//           <DataField label="Branch" value={step1.bankDetails.branch} />
//           <DataField label="IFSC Code" value={step1.bankDetails.ifsc} />
//           <DataField label="Contact Person" value={step1.bankDetails.contactPerson} />
//         </SubCategory>
//         <SubCategory title="Site Area" stepNum={1}>
//           <DataField label="As per Document" value={step1.siteArea.extentAsPerDeed} />
//           <DataField label="As per Actual" value={step1.siteArea.extentForValuation} />
//           <DataField label="Site Shape" value={step1.siteArea.shapeOfLand} />
//           <DataField label="Road Affected" value={step1.siteArea.roadAffectedArea} />
//         </SubCategory>
//         <SubCategory title="Plot Valuation" stepNum={1}>
//           <DataField label="Site Area" value={step1.plotValuation.siteArea} />
//           <DataField label="GLR" value={step1.plotValuation.landValueGLR} />
//           <DataField label="MV" value={step1.plotValuation.unitRatePMR} />
//           <DataField label="Round Up Value" value={step1.plotValuation.sayValue} />
//         </SubCategory>
//       </MainCategory>

//       <MainCategory title="Vendor, Property Details" icon={Building2}>
//         <SubCategory title="Locality Classification" stepNum={2}>
//           <DataField label="Urban/Rural" value={step2.localityDetails.urbanSemiUrbanRural} />
//           <DataField label="Class" value={step2.localityDetails.classificationHighMiddlePoor} />
//           <DataField label="Townplan" value={step2.localityDetails.corporationVillageMunicipality} />
//           <DataField label="Land Tenure" value={step2.localityDetails.landTenure} />
//         </SubCategory>
//         <SubCategory title="Intending Vendor" stepNum={2}>
//           <DataField label="Realisable %" value={step2.intendingVendor.realisablePercent} />
//           <DataField label="Realisable Value" value={step2.intendingVendor.realisableValue} />
//           <DataField label="Distress %" value={step2.intendingVendor.distressPercent} />
//           <DataField label="Distress Value" value={step2.intendingVendor.distressValue} />
//         </SubCategory>
//         <SubCategory title="Property Settings" stepNum={2}>
//           <DataField label="Vacant Plot" value={step2.propertyDetails.vacantPlot} />
//           <DataField label="Road Width" value={step2.localityDetails.widthOfRoad} />
//           <DataField label="Geo Coordinates" value={step2.propertyDetails.latitude ? `${step2.propertyDetails.latitude}, ${step2.propertyDetails.longitude}` : 'Not Set'} />
//           <DataField label="Boundary Points" value={`${step2.propertyDetails.boundaryCoordinates.length} Points Selected`} />
//           <DataField label="Photos Uploaded" value={`${step2.propertyDetails.images.length} Photos`} />
//         </SubCategory>
//         <SubCategory title="Site Boundary Dimensions" stepNum={2}>
//           <DataField label="North (Doc / Act)" value={`${step2.siteBoundaryDetails.northDeedDim} / ${step2.siteBoundaryDetails.northActualDim}`} />
//           <DataField label="South (Doc / Act)" value={`${step2.siteBoundaryDetails.southDeedDim} / ${step2.siteBoundaryDetails.southActualDim}`} />
//           <DataField label="East (Doc / Act)" value={`${step2.siteBoundaryDetails.eastDeedDim} / ${step2.siteBoundaryDetails.eastActualDim}`} />
//           <DataField label="West (Doc / Act)" value={`${step2.siteBoundaryDetails.westDeedDim} / ${step2.siteBoundaryDetails.westActualDim}`} />
//         </SubCategory>
//         <SubCategory title="Site Boundaries" stepNum={2}>
//           <DataField label="North Boundary (Doc)" value={step2.siteBoundaryDetails.northBoundaryDeed} />
//           <DataField label="North Boundary (Act)" value={step2.siteBoundaryDetails.northBoundaryActual} />
//           <DataField label="South Boundary (Doc)" value={step2.siteBoundaryDetails.southBoundaryDeed} />
//           <DataField label="South Boundary (Act)" value={step2.siteBoundaryDetails.southBoundaryActual} />
//           <DataField label="East Boundary (Doc)" value={step2.siteBoundaryDetails.eastBoundaryDeed} />
//           <DataField label="East Boundary (Act)" value={step2.siteBoundaryDetails.eastBoundaryActual} />
//           <DataField label="West Boundary (Doc)" value={step2.siteBoundaryDetails.westBoundaryDeed} />
//           <DataField label="West Boundary (Act)" value={step2.siteBoundaryDetails.westBoundaryActual} />
//         </SubCategory>
//         <SubCategory title="Wall Details" stepNum={2}>
//           <DataField label="Length / Height" value={`${step2.wallDetails.compWallBuildingLength} / ${step2.wallDetails.compWallBuildingHeight}`} />
//           <DataField label="Walls on Side" value={step2.wallDetails.wallsOnSide} />
//           <DataField label="Brick Type" value={step2.wallDetails.compWallBuildingType} />
//         </SubCategory>
//         <SubCategory title="Building Details" stepNum={2}>
//           <DataField label="Stories" value={step2.buildingDetails.numberOfFloorsHeight} />
//           <DataField label="Floors" value={step2.buildingDetails.buildingFloors.join(', ')} />
//           <DataField label="Possession With" value={step2.buildingDetails.occupiedBy} />
//           <DataField label="Depreciation Rate" value={step2.buildingDetails.groundFloorDepreciationRate} />
//           <DataField label="Depreciation Value" value={step2.buildingDetails.groundFloorDepreciation} />
//           <DataField label="Dimensions (L x B)" value={`${step2.buildingDetails.buildingLength} x ${step2.buildingDetails.buildingBreadth}`} />
//           <DataField label="Covered Area" value={step2.buildingDetails.groundFloorPlinthArea} />
//           <DataField label="Condition" value={step2.buildingDetails.qualityOfConstruction} />
//           <DataField label="Structure" value={step2.buildingDetails.specSuperStructure} />
//           <DataField label="Flooring" value={step2.buildingDetails.specFlooring} />
//           <DataField label="Accommodation" value={step2.buildingDetails.accommodation} />
//           <DataField label="Doors / Windows" value={step2.buildingDetails.specJoinery} />
//           <DataField label="Sanitary Fitting" value={step2.buildingDetails.sanitaryFitting} />
//           <DataField label="Electrical Fitting" value={step2.buildingDetails.classOfFittings} />
//           <DataField label="Floor Remarks" value={step2.buildingDetails.generalRemarks} />
//         </SubCategory>
//         <SubCategory title="Market Details" stepNum={2}>
//           <DataField label="Year Constructed" value={step2.marketDetails.yearOfConstruction} />
//           <DataField label="Renovation" value={step2.marketDetails.renovation} />
//           <DataField label="Parking" value={step2.marketDetails.parking} />
//           <DataField label="Lift" value={step2.marketDetails.lift} />
//           <DataField label="Kitchen Type" value={step2.marketDetails.kitchenType} />
//           <DataField label="Rental Income" value={`${step2.marketDetails.rentalIncomeMin} - ${step2.marketDetails.rentalIncomeMax}`} />
//           <DataField label="Client Rate" value={`${step2.marketDetails.marketRateClientMin} - ${step2.marketDetails.marketRateClientMax} ${step2.marketDetails.marketRateClientUnit}`} />
//           <DataField label="Dealer Rate" value={`${step2.marketDetails.marketRateDealerMin} - ${step2.marketDetails.marketRateDealerMax} ${step2.marketDetails.marketRateDealerUnit}`} />
//           <DataField label="Market Rate" value={`${step2.marketDetails.marketRateMarketMin} - ${step2.marketDetails.marketRateMarketMax} ${step2.marketDetails.marketRateMarketUnit}`} />
//           <DataField label="Dealer Name" value={step2.marketDetails.dealerName} />
//           <DataField label="Dealer Mobile" value={step2.marketDetails.dealerMobile} />
//         </SubCategory>
//         {step2.marketDetails.additionalDetails.length > 0 && (
//           <SubCategory title="Additional Details" stepNum={2}>
//             {step2.marketDetails.additionalDetails.map((pair, idx) => (
//               <DataField key={idx} label={pair.key || 'Detail'} value={pair.value} />
//             ))}
//           </SubCategory>
//         )}
//       </MainCategory>

//       <MainCategory title="Uploaded Documents" icon={FileText}>
//         <div className="pt-2">{allStep3Files.length > 0 ? allStep3Files.map((file: File, idx: number) => <FileCard key={idx} file={file} />) : <p className="text-sm text-gray-500 italic">No documents uploaded.</p>}</div>
//       </MainCategory>
//       <MainCategory title="Site Inspection Document" icon={FileText}>
//         <div className="pt-2">{step4.siteInspection.reportFiles.length > 0 ? step4.siteInspection.reportFiles.map((f: File, i: number) => <FileCard key={i} file={f} />) : <p className="text-sm text-gray-500 italic">No reports uploaded.</p>}</div>
//       </MainCategory>

//       <div className="mt-8 p-4 bg-[#f8fafc] border border-gray-200 rounded-xl flex items-start gap-3">
//         <div className="pt-0.5"><input type="checkbox" id="final-confirm" checked={isConfirmed} onChange={(e) => setIsConfirmed(e.target.checked)} className="w-4 h-4 text-[#00a0ef] border-gray-300 rounded focus:ring-[#00a0ef]" /></div>
//         <label htmlFor="final-confirm" className="text-[13px] text-gray-700 leading-relaxed select-none cursor-pointer">I confirm that all information provided above is correct.</label>
//       </div>
//     </div>
//   );
// }

// // ============================================================
// //  MAIN PAGE COMPONENT
// // ============================================================
// export default function NewValuationInit() {
//   const router = useRouter();

//   const [bankActiveSection, setBankActiveSection] = useState<Section>('bank');
//   const [selectedBank, setSelectedBank] = useState<Bank | null>(null);
//   const [otherBankName, setOtherBankName] = useState('');
//   const [selectedType, setSelectedType] = useState<ValuationType | null>(null);
//   const [showForm, setShowForm] = useState(false);

//   const [currentStep, setCurrentStep] = useState(1);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [isConfirmed, setIsConfirmed] = useState(false);
//   const [isSubmittedSuccessfully, setIsSubmittedSuccessfully] = useState(false);
  
//   const [step1Data, setStep1Data] = useState<Step1State>({
//     inputField:      { dateOfValuation: '', dateOfInspection: '', propertyType: '', purposeOfValuation: '' },
//     ownerDetails:    { prefix: 'Shri', ownerName: '', ownerRelation: 'S/o', ownerRelationName: '', occupation: '', ownerPhone: '', phone2: '' },
//     address:         { locHNo: '', locSFNo: '', locVillage: '', district: '', pinCode: '', landmark: '' },
//     bankDetails:     { ifsc: '', bankName: '', branch: '', email: '', contactPerson: '' },
//     siteArea:        { extentAsPerDeed: '', extentForValuation: '', shapeOfLand: '', roadAffectedArea: '' },
//     plotValuation:   { siteArea: '', landValueGLR: '', unitRatePMR: '', pmrValue: '', sayValue: '' },
//   });
  
//   const [step2Data, setStep2Data] = useState<Step2State>({
//     localityDetails: { urbanSemiUrbanRural: '', classificationHighMiddlePoor: '', landTenure: '', corporationVillageMunicipality: '', widthOfRoad: '' },
//     propertyDetails: { vacantPlot: '', latitude: '', longitude: '', images: [], boundaryCoordinates: [] },
//     siteBoundaryDetails: { isActualSameAsDoc: false, northDeedDim: '', southDeedDim: '', eastDeedDim: '', westDeedDim: '', northActualDim: '', southActualDim: '', eastActualDim: '', westActualDim: '', northBoundaryDeed: '', southBoundaryDeed: '', eastBoundaryDeed: '', westBoundaryDeed: '', northBoundaryActual: '', southBoundaryActual: '', eastBoundaryActual: '', westBoundaryActual: '' },
//     wallDetails: { compWallBuildingLength: '', compWallBuildingHeight: '', wallsOnSide: '', compWallBuildingType: '' },
//     buildingDetails: { numberOfFloorsHeight: '', buildingFloors: [], customFloor: '', occupiedBy: '', buildingLength: '', buildingBreadth: '', groundFloorPlinthArea: '', qualityOfConstruction: '', specSuperStructure: '', specFlooring: '', accommodation: '', specJoinery: '', sanitaryFitting: '', classOfFittings: '', generalRemarks: '', groundFloorDepreciationRate: '', groundFloorDepreciation: '' },
//     marketDetails: { yearOfConstruction: '', renovation: '', parking: '', lift: '', rentalIncomeMin: '', rentalIncomeMax: '', kitchenType: '', marketRateClientMin: '', marketRateClientMax: '', marketRateClientUnit: '', marketRateDealerMin: '', marketRateDealerMax: '', marketRateDealerUnit: '', marketRateMarketMin: '', marketRateMarketMax: '', marketRateMarketUnit: '', dealerName: '', dealerMobile: '', additionalDetails: [] },
//     intendingVendor: { prefix: 'Shri', name: '', relationType: 'S/o.', relationName: '', occupation: '', phone1: '', phone2: '', plotNo: '', road: '', village: '', district: '', pincode: '', realisablePercent: '90', realisableValue: '', distressPercent: '80', distressValue: '' }
//   });

//   const [step3Data, setStep3Data] = useState<Step3State>({ documentUpload: { saleDeed: [], buildingPermission: [], layoutCopy: [], legalOpinion: [], propertyTax: [] } });
//   const [step4Data, setStep4Data] = useState<Step4State>({ siteInspection: { reportFiles: [] } });

//   const handleContinue = () => { if (selectedBank && selectedType) { setShowForm(true); setCurrentStep(1); } };

//   const handleStepContinue = () => {
//     if (currentStep < 5) { setCurrentStep(prev => prev + 1); window.scrollTo({ top: 0, behavior: 'smooth' }); } 
//     else { handleSubmit(); }
//   };

//   const handleStepBack = () => {
//     if (currentStep === 1) { setShowForm(false); } 
//     else { setCurrentStep(prev => prev - 1); window.scrollTo({ top: 0, behavior: 'smooth' }); }
//   };

//   const handleSubmit = async () => {
//     if (!isConfirmed) { alert('Please check the confirmation box to submit.'); return; }
//     setIsSubmitting(true);
//     try { 
//       const finalBank = selectedBank === 'other' ? otherBankName : selectedBank;
//       await new Promise(resolve => setTimeout(resolve, 1500)); 
//       setIsSubmittedSuccessfully(true); 
//     } 
//     catch (e) { console.error(e); } 
//     finally { setIsSubmitting(false); }
//   };

//   if (isSubmittedSuccessfully) {
//     return (
//       <div className="flex flex-col flex-1 w-full relative min-h-screen md:min-h-0 bg-white overflow-hidden">
//         <img src="/images/party-left.svg" alt="Success Confetti Left" className="absolute -left-[45%] top-0 md:-left-40 md:top-[5%] w-[120%] md:w-[600px] lg:w-[700px] pointer-events-none z-0 opacity-60 md:opacity-100 scale-x-[-1]" />
//         <img src="/images/party-right.svg" alt="Success Confetti Right" className="absolute -right-[45%] top-0 md:-right-32 md:top-[5%] w-[120%] md:w-[600px] lg:w-[700px] pointer-events-none z-0 opacity-60 md:opacity-100" />
//         <div className="relative z-10 flex flex-col items-center text-center w-full px-5 pt-24 md:pt-16 max-w-[520px] mx-auto flex-1">
//           <div className="w-[88px] h-[88px] rounded-full flex items-center justify-center bg-[#f0f8fd] mb-6">
//             <div className="w-[60px] h-[60px] rounded-full bg-white flex items-center justify-center shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
//               <div className="w-[32px] h-[32px] bg-[#00a0ef] rounded-full flex items-center justify-center"><Check className="w-4 h-4 text-white" strokeWidth={3.5} /></div>
//             </div>
//           </div>
//           <h2 className="text-[20px] lg:text-[24px] font-bold text-gray-900 mb-3 tracking-tight">Your document has been submitted<br className="hidden md:block" /> successfully.</h2>
//           <p className="text-[#8A94A6] text-[14px] md:text-[15px] mb-8 leading-relaxed max-w-[320px] md:max-w-none">We are reviewing your document and will notify you once the next step is ready.</p>
//         </div>
//         <div className="relative z-20 w-full p-4 mt-auto border-t border-gray-100 bg-white md:bg-transparent md:border-none md:p-6 md:max-w-[520px] md:mx-auto">
//           <Link href='/s/dashboard' className="flex items-center justify-center w-full md:w-auto md:px-8 py-3.5 md:py-3 bg-[#00a0ef] hover:bg-[#008bd1] rounded-xl md:rounded-lg text-white font-medium transition-colors shadow-sm">
//             Continue <ArrowRight className="w-4 h-4 ml-2" />
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   const BankOption = ({ id, name, icon: Icon }: { id: Bank; name: string; icon: React.ElementType }) => (
//     <div onClick={() => { setSelectedBank(id); if (id !== 'other') setBankActiveSection('valuation'); }} className={`flex items-center p-4 border rounded-xl cursor-pointer transition-all ${selectedBank === id ? 'border-[#00a0ef] bg-[#f0f9ff]' : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'}`}>
//       <div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-4 ${selectedBank === id ? 'bg-blue-100 text-[#00a0ef]' : 'bg-gray-100 text-gray-500'}`}><Icon className="w-5 h-5" /></div>
//       <span className="flex-1 font-semibold text-gray-900">{name}</span>
//       <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${selectedBank === id ? 'border-[#00a0ef]' : 'border-gray-300'}`}>{selectedBank === id && <div className="w-2.5 h-2.5 bg-[#00a0ef] rounded-full" />}</div>
//     </div>
//   );

//   const TypeOption = ({ id, name, icon: Icon }: { id: ValuationType; name: string; icon: React.ElementType }) => (
//     <div onClick={() => setSelectedType(id)} className={`flex items-center p-4 border rounded-xl cursor-pointer transition-all ${selectedType === id ? 'border-[#00a0ef] bg-[#f0f9ff]' : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'}`}>
//       <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center mr-4 text-gray-500"><Icon className="w-5 h-5" /></div>
//       <span className="flex-1 font-semibold text-gray-900">{name}</span>
//       <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${selectedType === id ? 'border-[#00a0ef]' : 'border-gray-300'}`}>{selectedType === id && <div className="w-2.5 h-2.5 bg-[#00a0ef] rounded-full" />}</div>
//     </div>
//   );

//   if (!showForm) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex flex-col md:py-8">
//         <div className="flex-1 flex flex-col w-full md:max-w-4xl md:mx-auto bg-white border-x md:border border-gray-200 md:rounded-xl md:shadow-sm overflow-hidden">
//           <div className="px-4 md:px-6 py-4 md:py-5 border-b border-gray-200 bg-white"><h1 className="text-lg md:text-xl font-medium text-gray-900">Submit New Report</h1></div>
//           <div className="flex-1 overflow-y-auto">
//             <div className="bg-white">
//               <div className={`flex items-center justify-between px-4 md:px-6 py-4 cursor-pointer transition-colors ${bankActiveSection === 'bank' ? 'bg-blue-50/30' : 'hover:bg-gray-50'}`} onClick={() => setBankActiveSection('bank')}>
//                 <h2 className="text-[#00a0ef] font-medium md:text-lg">Choose Bank</h2>
//                 {selectedBank ? <CheckCircle2 className="w-6 h-6 text-white fill-[#00a0ef]" /> : <Loader className="w-6 h-6 text-[#00a0ef]" />}
//               </div>
//               {bankActiveSection === 'bank' && (
//                 <div className="px-4 md:px-6 pt-4 pb-6 grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 border-b border-gray-100">
//                   <BankOption id="sbi" name="State Bank of India" icon={Landmark} />
//                   <BankOption id="hdfc" name="HDFC Bank" icon={Landmark} />
//                   <BankOption id="icici" name="ICICI Bank" icon={Landmark} />
//                   <BankOption id="axis" name="Axis Bank" icon={Landmark} />
//                   <BankOption id="pnb" name="Punjab National Bank" icon={Landmark} />
//                   <BankOption id="bob" name="Bank of Baroda" icon={Landmark} />
//                   <BankOption id="indian" name="Indian Bank" icon={Landmark} />
//                   <BankOption id="other" name="Other Bank" icon={Building2} />
                  
//                   {selectedBank === 'other' && (
//                     <div className="md:col-span-2 mt-2">
//                       <input type="text" placeholder="Enter Custom Bank Name" className={inputStyles} value={otherBankName} onChange={(e) => setOtherBankName(e.target.value)} />
//                     </div>
//                   )}
//                 </div>
//               )}
//             </div>
//             <div className="bg-white">
//               <div className={`flex items-center justify-between px-4 md:px-6 py-4 border-y border-gray-100 cursor-pointer transition-colors ${bankActiveSection === 'valuation' ? 'bg-blue-50/30' : 'hover:bg-gray-50'}`} onClick={() => { if (selectedBank) setBankActiveSection('valuation'); }}>
//                 <h2 className="text-[#00a0ef] font-medium md:text-lg">Valuation Type</h2>
//                 {selectedType ? <CheckCircle2 className="w-6 h-6 text-white fill-[#00a0ef]" /> : <Loader className="w-6 h-6 text-[#00a0ef]" />}
//               </div>
//               {bankActiveSection === 'valuation' && (
//                 <div className="px-4 md:px-6 pt-4 pb-6 grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
//                   <TypeOption id="plot" name="Plot Valuation" icon={LayoutGrid} />
//                   <TypeOption id="building" name="Building Valuation" icon={Building} />
//                   <TypeOption id="flat" name="Apartment / Flat Valuation" icon={Grid} />
//                   <TypeOption id="agri" name="Agricultural Land" icon={Tractor} />
//                   <TypeOption id="commercial" name="Commercial Property" icon={Building2} />
//                   <TypeOption id="industrial" name="Industrial Shed" icon={Factory} />
//                   <TypeOption id="villa" name="Villa / Independent House" icon={Home} />
//                 </div>
//               )}
//             </div>
//           </div>
//           <div className="p-4 md:px-6 md:py-5 bg-white border-t border-gray-200 flex items-center justify-between mt-auto">
//             <button className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors">Cancel</button>
//             <button onClick={handleContinue} disabled={!selectedBank || !selectedType || (selectedBank === 'other' && !otherBankName)} className={`flex items-center px-6 py-2.5 rounded-lg text-white font-medium transition-colors ${selectedBank && selectedType && (selectedBank !== 'other' || otherBankName) ? 'bg-[#00a0ef] hover:bg-[#008bd1] shadow-sm' : 'bg-blue-300 cursor-not-allowed'}`}>
//               Continue <ArrowRight className="w-4 h-4 ml-2" />
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 flex flex-col md:py-8">
//       <div className="flex-1 flex flex-col w-full md:max-w-4xl md:mx-auto bg-white border-x md:border border-gray-200 md:rounded-xl md:shadow-sm overflow-hidden">
//         <div className="px-4 md:px-6 py-4 md:py-5 border-b border-gray-200 bg-white flex items-center gap-4"><h1 className="text-lg md:text-xl font-medium text-gray-900">Submit New Report</h1></div>
//         <ProgressStepper currentStep={currentStep} />
//         <div className="flex-1 overflow-y-auto bg-gray-50 md:p-6">
//           {currentStep === 1 && <Step1Form formData={step1Data} setFormData={setStep1Data} />}
//           {currentStep === 2 && <Step2Form formData={step2Data} setFormData={setStep2Data} step1Data={step1Data}/>}
//           {currentStep === 3 && <Step3Form formData={step3Data} setFormData={setStep3Data} />}
//           {currentStep === 4 && <Step4Form formData={step4Data} setFormData={setStep4Data} />}
//           {currentStep === 5 && <Step5Form step1={step1Data} step2={step2Data} step3={step3Data} step4={step4Data} onEditStep={(step: number) => setCurrentStep(step)} isConfirmed={isConfirmed} setIsConfirmed={setIsConfirmed} />}
//         </div>
//         <ActionBar currentStep={currentStep} onBack={handleStepBack} onContinue={handleStepContinue} isLastStep={currentStep === 5} isSubmitting={isSubmitting} />
//       </div>
//     </div>
//   );
// }

// 'use client';

// import React, { useState, useEffect, useCallback, useRef } from 'react';
// import { Building, Building2, Landmark, LayoutGrid, CheckCircle2, UploadCloud, X, FileText, Edit2, CircleCheck, Plus, Trash2, Check, RotateCcw, ArrowLeft, ArrowRight, ChevronDown, Map as MapIcon } from 'lucide-react';
// import { APIProvider, Map, AdvancedMarker, useMap } from "@vis.gl/react-google-maps";
// import { api } from '@/app/lib/userApis';

// type Coord = { lat: number; lng: number };
// type Pin = { id: number; coord: Coord };
// type Mode = "picking" | "submitted";

// const MAX = 10;
// const LABELS = ["P1", "P2", "P3", "P4", "P5", "P6", "P7", "P8", "P9", "P10"];
// const COLORS = ["#00a0ef", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899", "#06b6d4", "#14b8a6", "#f97316", "#6366f1"];

// export interface FloorDetail {
//   id: string;
//   floorName: string;
//   possessionWith: string;
//   unit: string;
//   length: string;
//   breadth: string;
//   conversionUnit: string;
//   coveredArea: string;
//   condition: string;
//   structure: string;
//   flooring: string;
//   accommodation: string;
//   doorsWindows: string;
//   floorRemarks: string;
// }

// interface AppState {
//   customer: string;
//   clientBank: { ifsc: string; bankName: string; branch: string; email: string; contactPersonName: string; contactPersonNumber: string; dateOfInspection: string; dateOfValuation: string; propertyType: string; purposeOfValuation: string; };
//   owner: { prefix: string; ownerName: string; relation: string; relationName: string; occupation: string; phone1: string; phone2: string; };
//   locality: { urbanRural: string; localityClass: string; landTenure: string; widthOfRoad: string; noOfStories: string; sanitaryFitting: string; electricalFitting: string; townplan: string; };
//   property: { address: string; natureOfProperty: string; vacantPlot: string; widthOfRoad: string; latitude: string; longitude: string; boundaryCoordinates: Coord[]; plotShape: string; dimensionUnit: string; length: string; breadth: string; conversionUnit: string; calculatedArea: string; wallUnit: string; wallLength: string; wallHeight: string; wallsOnSide: string; brickType: string; };
//   boundaries: { unit: string; northDoc: string; northAct: string; southDoc: string; southAct: string; eastDoc: string; eastAct: string; westDoc: string; westAct: string; };
//   floors: FloorDetail[];
//   market: { yearOfConstruction: string; renovation: string; parking: string; lift: string; rentalMin: string; rentalMax: string; rentalUnit: string; kitchenType: string; marketClientMin: string; marketClientMax: string; marketClientUnit: string; marketDealerMin: string; marketDealerMax: string; marketDealerUnit: string; marketMarketMin: string; marketMarketMax: string; marketMarketUnit: string; dealerName: string; dealerMobile: string; additionalDetails: { key: string; value: string }[]; };
//   negativePoints: string[];
//   uploads: { photos: File[]; documents: File[]; };
// }

// const inputStyles = "w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-[#00a0ef] focus:ring-1 focus:ring-[#00a0ef] text-[13px] text-gray-900 bg-white shadow-sm transition-shadow";
// const labelStyles = "block text-[13px] font-semibold text-gray-700 mb-2";

// const RadioGroup = ({ options, value, onChange }: { options: string[], value: string, onChange: (val: string) => void }) => {
//   const isCustom = value !== '' && !options.includes(value);
//   const [showCustom, setShowCustom] = useState(isCustom);

//   return (
//     <div className="flex flex-wrap gap-2 items-center">
//       {options.map(opt => (
//         <button key={opt} type="button" onClick={() => { setShowCustom(false); onChange(opt); }}
//           className={`px-3 py-2 rounded-lg text-[13px] font-medium transition-all border ${!showCustom && value === opt ? 'bg-blue-50 border-[#00a0ef] text-[#00a0ef] shadow-sm' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'}`}>
//           {opt}
//         </button>
//       ))}
//       <div className="flex items-center gap-2">
//         {!showCustom && (
//           <button type="button" onClick={() => { setShowCustom(true); onChange(''); }}
//             className={`px-3 py-2 rounded-lg text-[13px] font-medium transition-all border bg-white border-gray-200 text-gray-600 hover:bg-gray-50`}>
//             Other / Add Option
//           </button>
//         )}
//         {showCustom && (
//           <div className="flex items-center gap-1 bg-white border border-gray-300 rounded-lg pr-1 shadow-sm focus-within:border-[#00a0ef] focus-within:ring-1 focus-within:ring-[#00a0ef]">
//             <input type="text" placeholder="Type custom option..." className="px-3 py-2 text-[13px] rounded-l-lg focus:outline-none border-none w-40" value={value} onChange={e => onChange(e.target.value)} autoFocus />
//             <button type="button" onClick={() => { setShowCustom(false); onChange(''); }} className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors">
//               <X size={14} />
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// const MultiSelectGroup = ({ options, selected, onChange }: { options: string[], selected: string[], onChange: (val: string[]) => void }) => {
//   const toggle = (opt: string) => selected.includes(opt) ? onChange(selected.filter(i => i !== opt)) : onChange([...selected, opt]);
//   const customValues = selected.filter(val => !options.includes(val));
//   const [customInput, setCustomInput] = useState('');

//   const handleAddCustom = () => {
//     if (customInput.trim() && !selected.includes(customInput.trim())) {
//       onChange([...selected, customInput.trim()]);
//       setCustomInput('');
//     }
//   };

//   return (
//     <div className="flex flex-col gap-3">
//       <div className="flex flex-wrap gap-2">
//         {options.map(opt => (
//           <button key={opt} type="button" onClick={() => toggle(opt)}
//             className={`px-3 py-2 rounded-lg text-[13px] font-medium transition-all border ${selected.includes(opt) ? 'bg-blue-50 border-[#00a0ef] text-[#00a0ef] shadow-sm' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'}`}>
//             {opt}
//           </button>
//         ))}
//         {customValues.map(opt => (
//           <button key={opt} type="button" onClick={() => toggle(opt)}
//             className="px-3 py-2 rounded-lg text-[13px] font-medium transition-all border bg-blue-50 border-[#00a0ef] text-[#00a0ef] shadow-sm flex items-center gap-2">
//             {opt} <X className="w-3 h-3" />
//           </button>
//         ))}
//       </div>
//       <div className="flex items-center gap-2">
//         <input type="text" placeholder="Add custom option..." className="px-3 py-2 text-[13px] border border-gray-300 rounded-lg focus:outline-none focus:border-[#00a0ef] w-48 shadow-sm" value={customInput} onChange={e => setCustomInput(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddCustom(); } }} />
//         <button type="button" onClick={handleAddCustom} className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-[13px] font-medium hover:bg-gray-200 transition-colors">Add</button>
//       </div>
//     </div>
//   );
// };

// function NextSectionButton({ onClick, nextFocusId }: { onClick: () => void, nextFocusId: string }) {
//   const handleAction = (e: React.MouseEvent | React.KeyboardEvent) => {
//     e.preventDefault();
//     onClick();
//     setTimeout(() => document.getElementById(nextFocusId)?.focus(), 50);
//   };
//   return (
//     <div className="md:col-span-full flex justify-end mt-4 border-t border-gray-200/50 pt-4">
//       <button type="button" onClick={handleAction} onKeyDown={(e) => { if (e.key === 'Tab' && !e.shiftKey) { handleAction(e); } }} className="text-[#00a0ef] text-[13px] font-bold hover:underline flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-[#00a0ef] focus:ring-offset-2 rounded px-3 py-1.5 transition-colors">
//         Next Section <ArrowRight className="w-4 h-4" />
//       </button>
//     </div>
//   );
// }

// function GeoCoordinatePicker({ onCoordinatesSubmit }: { onCoordinatesSubmit: (coords: Coord[]) => void }) {
//   const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "";
//   const [center, setCenter] = useState<Coord>({ lat: 20, lng: 78 });
//   const [zoom, setZoom] = useState(4);
//   const [mode, setMode] = useState<Mode>("picking");
//   const [pins, setPins] = useState<Pin[]>([]);
//   const [nextId, setNextId] = useState(0);
//   const [submitted, setSubmitted] = useState<Pin[]>([]);
//   const [editTarget, setEditTarget] = useState<number | null>(null);
//   const [userLocation, setUserLocation] = useState<Coord | null>(null);

//   useEffect(() => {
//     if ("geolocation" in navigator) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const userLoc = { lat: position.coords.latitude, lng: position.coords.longitude };
//           setUserLocation(userLoc); setCenter(userLoc); setZoom(18);
//         },
//         (error) => console.error("Error getting user location:", error),
//         { enableHighAccuracy: true }
//       );
//     }
//   }, []);

//   const handleMapClick = useCallback((coord: Coord) => {
//     if (mode === "picking") {
//       if (pins.length >= MAX) return;
//       setPins((prev) => [...prev, { id: nextId, coord }]);
//       setNextId((n) => n + 1); return;
//     }
//     if (mode === "submitted" && editTarget !== null) {
//       setSubmitted((prev) => prev.map((p, i) => (i === editTarget ? { ...p, coord } : p)));
//       setEditTarget(null);
//     }
//   }, [mode, pins.length, nextId, editTarget]);

//   const handleSubmit = () => {
//     if (pins.length === 0) return;
//     setSubmitted([...pins]); setMode("submitted"); setEditTarget(null);
//     onCoordinatesSubmit(pins.map(p => p.coord));
//   };

//   return (
//     <div className="flex flex-col w-full bg-white border border-gray-300 rounded-xl overflow-hidden shadow-sm">
//       <div className="relative w-full h-64 md:h-80 bg-gray-100">
//         <APIProvider apiKey={apiKey}>
//           <Map mapId="geo-picker-form" center={center} zoom={zoom} mapTypeId="satellite"
//             onCameraChanged={(ev) => { setCenter(ev.detail.center); setZoom(ev.detail.zoom); }}
//             gestureHandling="greedy" colorScheme="LIGHT" mapTypeControl={true} zoomControl={true} fullscreenControl={true} streetViewControl={true}
//             style={{ width: "100%", height: "100%" }}>
//             {userLocation && (
//               <AdvancedMarker position={userLocation}>
//                 <div className="relative"><div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-lg" /><div className="absolute inset-0 w-4 h-4 bg-blue-400 rounded-full animate-ping opacity-40" /></div>
//               </AdvancedMarker>
//             )}
//             <ClickHandler onClick={handleMapClick} />
//             {(mode === "picking" ? pins : submitted).map((pin, i) => (
//               <AdvancedMarker key={pin.id} position={pin.coord} zIndex={editTarget === i ? 100 : i}>
//                 <button type="button" onClick={(e) => { e.stopPropagation(); if (mode === "submitted") setEditTarget(editTarget === i ? null : i); }}
//                   className={`flex items-center justify-center rounded-full font-bold text-white text-xs shadow-md transition-all ${editTarget === i ? "w-10 h-10 ring-4 ring-white scale-110" : "w-8 h-8 ring-2 ring-white/80 scale-100"} ${mode === "submitted" ? "cursor-pointer" : "cursor-default"}`}
//                   style={{ backgroundColor: COLORS[i] }}>{LABELS[i]}</button>
//               </AdvancedMarker>
//             ))}
//           </Map>
//         </APIProvider>
//       </div>
//       <div className="p-4 bg-gray-50 border-t border-gray-200">
//         {mode === "picking" ? (
//           <button type="button" onClick={handleSubmit} disabled={pins.length === 0}
//             className={`w-full py-2.5 rounded-lg text-sm font-semibold transition-colors flex items-center justify-center gap-2 ${pins.length > 0 ? "bg-[#00a0ef] text-white hover:bg-[#008bd1] shadow-sm" : "bg-gray-200 text-gray-400 cursor-not-allowed"}`}>
//             {pins.length > 0 ? <><CheckCircle2 className="w-4 h-4" /> Confirm Boundaries</> : "Place at least 1 point"}
//           </button>
//         ) : (
//           <button type="button" onClick={() => { setPins([]); setSubmitted([]); setMode("picking"); setEditTarget(null); setNextId(0); }}
//             className="w-full py-2.5 rounded-lg text-sm font-semibold transition-colors flex items-center justify-center gap-2 bg-red-50 text-red-600 hover:bg-red-100">
//             <RotateCcw className="w-4 h-4" /> Reset Boundaries
//           </button>
//         )}
//       </div>
//     </div>
//   );
// }

// function ClickHandler({ onClick }: { onClick: (c: Coord) => void }) {
//   const map = useMap();
//   useEffect(() => {
//     if (!map) return;
//     const listener = map.addListener("click", (e: google.maps.MapMouseEvent) => {
//       if (e.latLng) onClick({ lat: e.latLng.lat(), lng: e.latLng.lng() });
//     });
//     return () => { google.maps.event.removeListener(listener); };
//   }, [map, onClick]);
//   return null;
// }

// function Step1Form({ formData, setFormData }: { formData: AppState; setFormData: (val: any) => void }) {
//   const [activeSection, setActiveSection] = useState<string>('clientBank');

//   const updateSection = (section: keyof AppState, field: string, value: any) => {
//     setFormData((prev: AppState) => ({ ...prev, [section]: { ...(prev[section] as any), [field]: value } }));
//   };

//   const renderSectionHeader = (title: string, id: string) => (
//     <div className={`flex items-center justify-between p-4 md:px-6 md:py-5 cursor-pointer transition-colors ${activeSection === id ? 'bg-blue-50/50 border-b border-blue-100' : 'bg-white hover:bg-gray-50 border-b border-gray-100'}`} onClick={() => setActiveSection(activeSection === id ? '' : id)}>
//       <h3 className="font-bold md:text-[15px] text-[#00a0ef]">{title}</h3>
//       <ChevronDown className={`w-5 h-5 text-[#00a0ef] transition-transform ${activeSection === id ? 'rotate-180' : ''}`} />
//     </div>
//   );

//   return (
//     <div className="bg-white border border-gray-200 md:rounded-xl overflow-hidden shadow-sm divide-y divide-gray-100">
      
//       <div>
//         {renderSectionHeader('Client / Bank Details', 'clientBank')}
//         {activeSection === 'clientBank' && (
//           <div className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 bg-blue-50/10">
//             <div><label className={labelStyles}>IFSC Code</label><input id="clientBank-first" type="text" className={inputStyles} value={formData.clientBank.ifsc} onChange={e => updateSection('clientBank', 'ifsc', e.target.value)} /></div>
//             <div><label className={labelStyles}>Bank Name</label><input type="text" className={inputStyles} value={formData.clientBank.bankName} onChange={e => updateSection('clientBank', 'bankName', e.target.value)} /></div>
//             <div><label className={labelStyles}>Branch</label><input type="text" className={inputStyles} value={formData.clientBank.branch} onChange={e => updateSection('clientBank', 'branch', e.target.value)} /></div>
//             <div><label className={labelStyles}>Email ID</label><input type="email" className={inputStyles} value={formData.clientBank.email} onChange={e => updateSection('clientBank', 'email', e.target.value)} /></div>
//             <div><label className={labelStyles}>Point of Contact Name</label><input type="text" className={inputStyles} value={formData.clientBank.contactPersonName} onChange={e => updateSection('clientBank', 'contactPersonName', e.target.value)} /></div>
//             <div><label className={labelStyles}>Point of Contact Number</label><input type="tel" className={inputStyles} value={formData.clientBank.contactPersonNumber} onChange={e => updateSection('clientBank', 'contactPersonNumber', e.target.value)} /></div>
//             <div><label className={labelStyles}>Date of Inspection</label><input type="date" className={inputStyles} value={formData.clientBank.dateOfInspection} onChange={e => updateSection('clientBank', 'dateOfInspection', e.target.value)} /></div>
//             <div><label className={labelStyles}>Date Valuation</label><input type="date" className={inputStyles} value={formData.clientBank.dateOfValuation} onChange={e => updateSection('clientBank', 'dateOfValuation', e.target.value)} /></div>
            
//             <div className="md:col-span-2">
//               <label className={labelStyles}>Type of Property</label>
//               <RadioGroup options={['Vacant Land - Residential', 'Existing Building - Residential', 'Open Piece of Land', 'Residential Flat', 'Agri Land', 'Residential Villa', 'Industrial Shed']} value={formData.clientBank.propertyType} onChange={v => updateSection('clientBank', 'propertyType', v)} />
//             </div>
//             <div className="md:col-span-2">
//               <label className={labelStyles}>Purpose of Valuation (Loan Type)</label>
//               <RadioGroup options={['Home Loan', 'Mortgage Loan', 'Education Loan', 'Collateral Security', 'For Bank Loan / Mortgage Purpose']} value={formData.clientBank.purposeOfValuation} onChange={v => updateSection('clientBank', 'purposeOfValuation', v)} />
//             </div>
//             <NextSectionButton onClick={() => setActiveSection('ownerLocality')} nextFocusId="owner-first" />
//           </div>
//         )}
//       </div>

//       <div>
//         {renderSectionHeader('Owner Details & Locality Classification', 'ownerLocality')}
//         {activeSection === 'ownerLocality' && (
//           <div className="p-4 md:p-6 bg-blue-50/10">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 border-b border-gray-200 pb-6 mb-6">
//               <div className="md:col-span-2 flex gap-3">
//                 <div className="w-1/3 md:w-1/4">
//                   <label className={labelStyles}>Prefix</label>
//                   <div className="relative">
//                     <select id="owner-first" className={`${inputStyles} appearance-none bg-white`} value={formData.owner.prefix} onChange={e => {
//                       const val = e.target.value;
//                       updateSection('owner', 'prefix', val);
//                       if (val === 'Smt' || val === 'Mrs') updateSection('owner', 'relation', 'W/o');
//                       else if (val === 'Shri' || val === 'Mr') updateSection('owner', 'relation', 'S/o');
//                     }}>
//                       <option value="Shri">Shri</option>
//                       <option value="Smt">Smt</option>
//                       <option value="Mr">Mr</option>
//                       <option value="Mrs">Mrs</option>
//                     </select>
//                     <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
//                   </div>
//                 </div>
//                 <div className="flex-1"><label className={labelStyles}>Owner Name</label><input type="text" className={inputStyles} value={formData.owner.ownerName} onChange={e => updateSection('owner', 'ownerName', e.target.value)} /></div>
//               </div>
//               <div className="md:col-span-2 flex gap-3">
//                 <div className="w-1/3 md:w-1/4">
//                   <label className={labelStyles}>Relation</label>
//                   <div className="relative">
//                     <select className={`${inputStyles} appearance-none bg-white`} value={formData.owner.relation} onChange={e => updateSection('owner', 'relation', e.target.value)}>
//                       <option value="S/o">S/o</option>
//                       <option value="D/o">D/o</option>
//                       <option value="W/o">W/o</option>
//                       <option value="F/o">F/o</option>
//                     </select>
//                     <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
//                   </div>
//                 </div>
//                 <div className="flex-1"><label className={labelStyles}>Relative's Name</label><input type="text" className={inputStyles} value={formData.owner.relationName} onChange={e => updateSection('owner', 'relationName', e.target.value)} /></div>
//               </div>
//               <div className="md:col-span-2"><label className={labelStyles}>Occupation</label><input type="text" className={inputStyles} value={formData.owner.occupation} onChange={e => updateSection('owner', 'occupation', e.target.value)} /></div>
//               <div><label className={labelStyles}>Phone Number 1</label><input type="tel" className={inputStyles} value={formData.owner.phone1} onChange={e => updateSection('owner', 'phone1', e.target.value)} /></div>
//               <div><label className={labelStyles}>Phone Number 2</label><input type="tel" className={inputStyles} value={formData.owner.phone2} onChange={e => updateSection('owner', 'phone2', e.target.value)} /></div>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div className="md:col-span-2"><label className={labelStyles}>Rural / Urban</label><RadioGroup options={['metro city', 'urban', 'semi urban rural', 'N/A']} value={formData.locality.urbanRural} onChange={v => updateSection('locality', 'urbanRural', v)} /></div>
//               <div className="md:col-span-2"><label className={labelStyles}>Locality Class</label><RadioGroup options={['high', 'middle', 'low', 'posh', 'N/A']} value={formData.locality.localityClass} onChange={v => updateSection('locality', 'localityClass', v)} /></div>
//               <div className="md:col-span-2"><label className={labelStyles}>Land Tenure</label><RadioGroup options={['freehold', 'leasehold', 'N/A']} value={formData.locality.landTenure} onChange={v => updateSection('locality', 'landTenure', v)} /></div>
//               <div className="md:col-span-2"><label className={labelStyles}>Width of Road</label><RadioGroup options={['< 10ft', '< 20ft', '> 20ft']} value={formData.locality.widthOfRoad} onChange={v => updateSection('locality', 'widthOfRoad', v)} /></div>
//               <div className="md:col-span-2"><label className={labelStyles}>No. of Stories</label><RadioGroup options={['1', '2', '3', '4', '5', '6', '7', '8', '9', 'vacant']} value={formData.locality.noOfStories} onChange={v => updateSection('locality', 'noOfStories', v)} /></div>
//               <div className="md:col-span-2"><label className={labelStyles}>Sanitary Fitting</label><RadioGroup options={['ordinary', 'good', 'superior', 'premium', 'excellent', 'under construction']} value={formData.locality.sanitaryFitting} onChange={v => updateSection('locality', 'sanitaryFitting', v)} /></div>
//               <div className="md:col-span-2"><label className={labelStyles}>Electrical Fitting</label><RadioGroup options={['ordinary', 'good', 'superior', 'premium', 'excellent', 'under construction']} value={formData.locality.electricalFitting} onChange={v => updateSection('locality', 'electricalFitting', v)} /></div>
//               <div className="md:col-span-2"><label className={labelStyles}>Townplan / MC / GP</label><RadioGroup options={['MC', 'townplanning', 'gram panchayat', 'outside Mc']} value={formData.locality.townplan} onChange={v => updateSection('locality', 'townplan', v)} /></div>
//             </div>
//             <NextSectionButton onClick={() => setActiveSection('property')} nextFocusId="property-first" />
//           </div>
//         )}
//       </div>

//       <div>
//         {renderSectionHeader('Property Details', 'property')}
//         {activeSection === 'property' && (
//           <div className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-2 gap-6 bg-blue-50/10">
//             <div className="md:col-span-2">
//               <label className={labelStyles} id="property-first">Geo Location & Coordinates</label>
//               <GeoCoordinatePicker 
//                 onCoordinatesSubmit={(coords) => {
//                   updateSection('property', 'boundaryCoordinates', coords);
//                   if (coords.length > 0) {
//                     updateSection('property', 'latitude', coords[0].lat.toString());
//                     updateSection('property', 'longitude', coords[0].lng.toString());
//                   }
//                 }} 
//               />
//               <div className="flex gap-4 mt-4">
//                 <input type="text" placeholder="Latitude" className={inputStyles} value={formData.property.latitude} readOnly />
//                 <input type="text" placeholder="Longitude" className={inputStyles} value={formData.property.longitude} readOnly />
//               </div>
//             </div>
            
//             <div className="md:col-span-2"><label className={labelStyles}>Address</label><textarea rows={3} className={inputStyles} value={formData.property.address} onChange={e => updateSection('property', 'address', e.target.value)} /></div>
            
//             <div className="md:col-span-2"><label className={labelStyles}>Nature of Property</label><RadioGroup options={['Residential', 'Commercial', 'Industrial', 'Agriculture', 'mixed', 'institutional', 'N/A']} value={formData.property.natureOfProperty} onChange={v => updateSection('property', 'natureOfProperty', v)} /></div>
//             <div className="md:col-span-1"><label className={labelStyles}>Vacant Plot?</label><RadioGroup options={['yes', 'NO']} value={formData.property.vacantPlot} onChange={v => updateSection('property', 'vacantPlot', v)} /></div>
//             <div className="md:col-span-1"><label className={labelStyles}>Width of Road</label><RadioGroup options={['< 10ft', '< 20ft', '> 20ft']} value={formData.property.widthOfRoad} onChange={v => updateSection('property', 'widthOfRoad', v)} /></div>
//             <div className="md:col-span-2"><label className={labelStyles}>Plot Shape</label><RadioGroup options={['Rectangle', 'square', 'triangle', 'irregular', 'polygon']} value={formData.property.plotShape} onChange={v => updateSection('property', 'plotShape', v)} /></div>

//             <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border border-gray-200 bg-white rounded-xl">
//               <div className="md:col-span-3"><label className={labelStyles}>Dimension Unit</label><RadioGroup options={['ft', 'm', 'inch']} value={formData.property.dimensionUnit} onChange={v => updateSection('property', 'dimensionUnit', v)} /></div>
//               <div><label className={labelStyles}>Length</label><input type="number" className={inputStyles} value={formData.property.length} onChange={e => { updateSection('property', 'length', e.target.value); const b = parseFloat(formData.property.breadth) || 0; updateSection('property', 'calculatedArea', (parseFloat(e.target.value || '0') * b).toString()); }} /></div>
//               <div><label className={labelStyles}>Breadth</label><input type="number" className={inputStyles} value={formData.property.breadth} onChange={e => { updateSection('property', 'breadth', e.target.value); const l = parseFloat(formData.property.length) || 0; updateSection('property', 'calculatedArea', (parseFloat(e.target.value || '0') * l).toString()); }} /></div>
//               <div className="md:col-span-3 border-t border-gray-100 pt-4 mt-2"><label className={labelStyles}>Conversion Unit</label><RadioGroup options={['sq ft', 'sq yd', 'sq mt', 'Acre', 'Hectare', 'Guntas']} value={formData.property.conversionUnit} onChange={v => updateSection('property', 'conversionUnit', v)} /></div>
//               <div className="md:col-span-3"><label className={labelStyles}>Calculated Area (Dimensions converted to selected unit)</label><input type="text" className={`${inputStyles} bg-gray-50`} readOnly value={formData.property.calculatedArea} /></div>
//             </div>

//             <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border border-gray-200 bg-white rounded-xl">
//               <div className="md:col-span-2"><label className={labelStyles}>Wall Unit</label><RadioGroup options={['ft', 'm', 'inch']} value={formData.property.wallUnit} onChange={v => updateSection('property', 'wallUnit', v)} /></div>
//               <div><label className={labelStyles}>Wall Length</label><input type="number" className={inputStyles} value={formData.property.wallLength} onChange={e => updateSection('property', 'wallLength', e.target.value)} /></div>
//               <div><label className={labelStyles}>Wall Height</label><input type="number" className={inputStyles} value={formData.property.wallHeight} onChange={e => updateSection('property', 'wallHeight', e.target.value)} /></div>
//               <div className="md:col-span-2"><label className={labelStyles}>Walls on Side</label><RadioGroup options={['1', '2', '3', '4']} value={formData.property.wallsOnSide} onChange={v => updateSection('property', 'wallsOnSide', v)} /></div>
//               <div className="md:col-span-2"><label className={labelStyles}>Type of Brick</label><RadioGroup options={['brick work', 'Rcc', 'pacca offset / pavement']} value={formData.property.brickType} onChange={v => updateSection('property', 'brickType', v)} /></div>
//             </div>

//             <NextSectionButton onClick={() => setActiveSection('boundaries')} nextFocusId="boundaries-first" />
//           </div>
//         )}
//       </div>

//       <div>
//         {renderSectionHeader('Boundaries & Negative Points', 'boundaries')}
//         {activeSection === 'boundaries' && (
//           <div className="p-4 md:p-6 bg-blue-50/10 space-y-6">
//             <div className="md:col-span-2">
//               <label className={labelStyles} id="boundaries-first">Boundary Unit</label>
//               <RadioGroup options={['length', 'feet', 'meters', 'inchs']} value={formData.boundaries.unit} onChange={v => updateSection('boundaries', 'unit', v)} />
//             </div>
            
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-4 rounded-xl border border-gray-200">
//               {(['north', 'south', 'east', 'west'] as const).map(dir => (
//                 <div key={dir} className="flex gap-2">
//                   <div className="flex-1">
//                     <label className={labelStyles}>{dir.charAt(0).toUpperCase() + dir.slice(1)} (As per Document)</label>
//                     <input type="text" className={inputStyles} value={(formData.boundaries as any)[`${dir}Doc`]} onChange={e => updateSection('boundaries', `${dir}Doc`, e.target.value)} />
//                   </div>
//                   <div className="flex-1">
//                     <label className={labelStyles}>{dir.charAt(0).toUpperCase() + dir.slice(1)} (Actual)</label>
//                     <input type="text" className={inputStyles} value={(formData.boundaries as any)[`${dir}Act`]} onChange={e => updateSection('boundaries', `${dir}Act`, e.target.value)} />
//                   </div>
//                 </div>
//               ))}
//             </div>

//             <div className="border-t border-gray-200 pt-6 mt-6">
//               <label className={labelStyles}>Property Negative Points</label>
//               <MultiSelectGroup 
//                 options={['HT line Over building', 'transformer in front', 'sub division of property', 'community dominace', 'common stair for separate units', 'near rail way track', 'near drain', 'near banquet hall']} 
//                 selected={formData.negativePoints} 
//                 onChange={v => setFormData((prev: AppState) => ({ ...prev, negativePoints: v }))} 
//               />
//             </div>
//           </div>
//         )}
//       </div>

//     </div>
//   );
// }

// function Step2Form({ formData, setFormData }: { formData: AppState; setFormData: (val: any) => void }) {
//   const [activeSection, setActiveSection] = useState<string>('floors');
//   const [activeFloorId, setActiveFloorId] = useState<string>('');

//   useEffect(() => {
//     if (formData.floors.length > 0 && !activeFloorId) setActiveFloorId(formData.floors[0].id);
//   }, [formData.floors]);

//   const handleAddFloor = (floorName: string) => {
//     if (!floorName) return;
//     const existing = formData.floors.find((f: FloorDetail) => f.floorName === floorName);
//     if (existing) {
//       setActiveFloorId(existing.id);
//     } else {
//       const newFloor: FloorDetail = {
//         id: Math.random().toString(36).substr(2, 9),
//         floorName, possessionWith: '', unit: '', length: '', breadth: '', conversionUnit: '', coveredArea: '', condition: '', structure: '', flooring: '', accommodation: '', doorsWindows: '', floorRemarks: ''
//       };
//       setFormData((prev: AppState) => ({ ...prev, floors: [...prev.floors, newFloor] }));
//       setActiveFloorId(newFloor.id);
//     }
//   };

//   const updateFloor = (id: string, field: keyof FloorDetail, value: string) => {
//     setFormData((prev: AppState) => ({
//       ...prev,
//       floors: prev.floors.map(f => {
//         if (f.id === id) {
//           const newF = { ...f, [field]: value };
//           if (field === 'length' || field === 'breadth') {
//             const l = parseFloat(newF.length) || 0;
//             const b = parseFloat(newF.breadth) || 0;
//             newF.coveredArea = (l * b).toString();
//           }
//           return newF;
//         }
//         return f;
//       })
//     }));
//   };

//   const removeFloor = (id: string) => {
//     setFormData((prev: AppState) => {
//       const newFloors = prev.floors.filter(f => f.id !== id);
//       if (activeFloorId === id) setActiveFloorId(newFloors.length > 0 ? newFloors[0].id : '');
//       return { ...prev, floors: newFloors };
//     });
//   };

//   const updateMarket = (field: string, value: any) => {
//     setFormData((prev: AppState) => ({ ...prev, market: { ...prev.market, [field]: value } }));
//   };

//   const renderSectionHeader = (title: string, id: string) => (
//     <div className={`flex items-center justify-between p-4 md:px-6 md:py-5 cursor-pointer transition-colors ${activeSection === id ? 'bg-blue-50/50 border-b border-blue-100' : 'bg-white hover:bg-gray-50 border-b border-gray-100'}`} onClick={() => setActiveSection(activeSection === id ? '' : id)}>
//       <h3 className="font-bold md:text-[15px] text-[#00a0ef]">{title}</h3>
//       <ChevronDown className={`w-5 h-5 text-[#00a0ef] transition-transform ${activeSection === id ? 'rotate-180' : ''}`} />
//     </div>
//   );

//   return (
//     <div className="bg-white border border-gray-200 md:rounded-xl overflow-hidden shadow-sm divide-y divide-gray-100">
      
//       <div>
//         {renderSectionHeader('Building Details (Per Floor)', 'floors')}
//         {activeSection === 'floors' && (
//           <div className="p-4 md:p-6 bg-blue-50/10">
//             <div className="mb-6">
//               <label className={labelStyles}>Select or Add Floor Details</label>
//               <RadioGroup options={['basement', 'stilt', 'GF', 'FF', 'SF', 'TF', '4th', 'multistorey']} value="" onChange={v => handleAddFloor(v)} />
//             </div>

//             {formData.floors.length > 0 && (
//               <div className="flex flex-col md:flex-row gap-4">
//                 <div className="md:w-48 shrink-0 flex flex-col gap-2">
//                   {formData.floors.map(f => (
//                     <div key={f.id} className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${activeFloorId === f.id ? 'bg-[#00a0ef] border-[#00a0ef] text-white shadow-md' : 'bg-white border-gray-200 text-gray-700 hover:border-gray-300'}`} onClick={() => setActiveFloorId(f.id)}>
//                       <span className="font-semibold text-[13px]">{f.floorName}</span>
//                       <button type="button" onClick={(e) => { e.stopPropagation(); removeFloor(f.id); }} className={`p-1 rounded hover:bg-black/10 ${activeFloorId === f.id ? 'text-white' : 'text-gray-400 hover:text-red-500'}`}><Trash2 size={14} /></button>
//                     </div>
//                   ))}
//                 </div>
                
//                 <div className="flex-1 bg-white p-4 md:p-6 rounded-xl border border-gray-200 shadow-sm">
//                   {formData.floors.filter(f => f.id === activeFloorId).map(activeFloor => (
//                     <div key={activeFloor.id} className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                       <div className="md:col-span-2 pb-3 border-b border-gray-100 mb-2">
//                         <h4 className="font-bold text-[#00a0ef] text-[15px]">{activeFloor.floorName} Details</h4>
//                       </div>

//                       <div className="md:col-span-2"><label className={labelStyles}>Possession With</label><RadioGroup options={['owner', 'tenant']} value={activeFloor.possessionWith} onChange={v => updateFloor(activeFloor.id, 'possessionWith', v)} /></div>

//                       <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4">
//                         <div><label className={labelStyles}>Unit</label><RadioGroup options={['feet', 'inch', 'meter']} value={activeFloor.unit} onChange={v => updateFloor(activeFloor.id, 'unit', v)} /></div>
//                         <div><label className={labelStyles}>Length</label><input type="number" className={inputStyles} value={activeFloor.length} onChange={e => updateFloor(activeFloor.id, 'length', e.target.value)} /></div>
//                         <div><label className={labelStyles}>Breadth</label><input type="number" className={inputStyles} value={activeFloor.breadth} onChange={e => updateFloor(activeFloor.id, 'breadth', e.target.value)} /></div>
//                         <div className="md:col-span-3 border-t border-gray-50 pt-4"><label className={labelStyles}>Conversion Unit</label><RadioGroup options={['sq ft', 'sq yd', 'sq mt', 'Acre', 'Hectare', 'Guntas']} value={activeFloor.conversionUnit} onChange={v => updateFloor(activeFloor.id, 'conversionUnit', v)} /></div>
//                         <div className="md:col-span-3"><label className={labelStyles}>Covered Area</label><input type="text" className={`${inputStyles} bg-gray-50`} readOnly value={activeFloor.coveredArea} /></div>
//                       </div>

//                       <div className="md:col-span-2"><label className={labelStyles}>Condition</label><RadioGroup options={['excellent', 'good', 'avg', 'poor', 'under construction', 'under finishing', 'others']} value={activeFloor.condition} onChange={v => updateFloor(activeFloor.id, 'condition', v)} /></div>
//                       <div className="md:col-span-2"><label className={labelStyles}>Structure</label><RadioGroup options={['Rcc framed', 'load bearing', 'composite Structure', 'Peb/shed']} value={activeFloor.structure} onChange={v => updateFloor(activeFloor.id, 'structure', v)} /></div>
//                       <div className="md:col-span-2"><label className={labelStyles}>Flooring</label><RadioGroup options={['tiles', 'marble', 'wood', 'cement', 'pending', 'other']} value={activeFloor.flooring} onChange={v => updateFloor(activeFloor.id, 'flooring', v)} /></div>
//                       <div className="md:col-span-2"><label className={labelStyles}>Accommodation</label><RadioGroup options={['storage', 'shop', 'office space', '1BHK', '1.5BHK', '2BHK', '2.5BHK', '3BHK', '3.5BHK', '4BHK', '4.5BHK', '5BHK', '5.5BHK', '6BHK', 'studio', 'penthouse']} value={activeFloor.accommodation} onChange={v => updateFloor(activeFloor.id, 'accommodation', v)} /></div>
//                       <div className="md:col-span-2"><label className={labelStyles}>Doors / Windows</label><RadioGroup options={['wooden', 'aluminium', 'glass', 'upvc', 'pending', 'N/A']} value={activeFloor.doorsWindows} onChange={v => updateFloor(activeFloor.id, 'doorsWindows', v)} /></div>
//                       <div className="md:col-span-2"><label className={labelStyles}>Floor Remarks</label><textarea rows={3} className={inputStyles} value={activeFloor.floorRemarks} onChange={e => updateFloor(activeFloor.id, 'floorRemarks', e.target.value)}></textarea></div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
            
//             <NextSectionButton onClick={() => setActiveSection('market')} nextFocusId="market-first" />
//           </div>
//         )}
//       </div>

//       <div>
//         {renderSectionHeader('Building-Shared / Market', 'market')}
//         {activeSection === 'market' && (
//           <div className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-2 gap-6 bg-blue-50/10">
//             <div><label className={labelStyles} id="market-first">Year of Construction</label><input type="text" className={inputStyles} value={formData.market.yearOfConstruction} onChange={e => updateMarket('yearOfConstruction', e.target.value)} /></div>
//             <div><label className={labelStyles}>Renovation</label><RadioGroup options={['yes', 'no']} value={formData.market.renovation} onChange={v => updateMarket('renovation', v)} /></div>
//             <div className="md:col-span-2"><label className={labelStyles}>Parking</label><RadioGroup options={['covered', 'notpresent', 'open', 'N/A']} value={formData.market.parking} onChange={v => updateMarket('parking', v)} /></div>
//             <div className="md:col-span-2"><label className={labelStyles}>Lift</label><RadioGroup options={['yes', 'No', 'N/A']} value={formData.market.lift} onChange={v => updateMarket('lift', v)} /></div>
//             <div className="md:col-span-2"><label className={labelStyles}>Kitchen Type</label><RadioGroup options={['modular', 'semi modular', 'odinary', 'N/A', 'other']} value={formData.market.kitchenType} onChange={v => updateMarket('kitchenType', v)} /></div>

//             <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4 bg-white p-4 rounded-xl border border-gray-200">
//               <div className="md:col-span-3 border-b border-gray-100 pb-2 mb-2"><h4 className="text-[13px] font-bold text-[#00a0ef]">Rental Income</h4></div>
//               <div><label className={labelStyles}>Minimum</label><input type="number" className={inputStyles} value={formData.market.rentalMin} onChange={e => updateMarket('rentalMin', e.target.value)} /></div>
//               <div><label className={labelStyles}>Maximum</label><input type="number" className={inputStyles} value={formData.market.rentalMax} onChange={e => updateMarket('rentalMax', e.target.value)} /></div>
//               <div><label className={labelStyles}>Unit</label><RadioGroup options={['hundred', 'thousand', 'lakh', 'crore']} value={formData.market.rentalUnit} onChange={v => updateMarket('rentalUnit', v)} /></div>
//             </div>

//             {['Client', 'Dealer', 'Market'].map((type) => {
//               const minField = `market${type}Min` as keyof AppState['market'];
//               const maxField = `market${type}Max` as keyof AppState['market'];
//               const unitField = `market${type}Unit` as keyof AppState['market'];
//               return (
//                 <div key={type} className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4 bg-white p-4 rounded-xl border border-gray-200">
//                   <div className="md:col-span-3 border-b border-gray-100 pb-2 mb-2"><h4 className="text-[13px] font-bold text-[#00a0ef]">Market Rate ({type === 'Market' ? 'As per market' : type})</h4></div>
//                   <div><label className={labelStyles}>Minimum</label><input type="number" className={inputStyles} value={formData.market[minField] as string} onChange={e => updateMarket(minField, e.target.value)} /></div>
//                   <div><label className={labelStyles}>Maximum</label><input type="number" className={inputStyles} value={formData.market[maxField] as string} onChange={e => updateMarket(maxField, e.target.value)} /></div>
//                   <div><label className={labelStyles}>Unit</label><RadioGroup options={['hundred', 'thousand', 'lakh', 'crore']} value={formData.market[unitField] as string} onChange={v => updateMarket(unitField, v)} /></div>
//                 </div>
//               );
//             })}

//             <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-4 rounded-xl border border-gray-200">
//               <div className="md:col-span-2 border-b border-gray-100 pb-2 mb-2"><h4 className="text-[13px] font-bold text-[#00a0ef]">Dealer Details</h4></div>
//               <div><label className={labelStyles}>Dealer Name</label><input type="text" className={inputStyles} value={formData.market.dealerName} onChange={e => updateMarket('dealerName', e.target.value)} /></div>
//               <div><label className={labelStyles}>Mobile Number</label><input type="tel" className={inputStyles} value={formData.market.dealerMobile} onChange={e => updateMarket('dealerMobile', e.target.value)} /></div>
//             </div>

//             <div className="md:col-span-2 bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
//               <div className="flex items-center justify-between mb-3">
//                 <label className={labelStyles}>Additional Details</label>
//                 <button type="button" onClick={() => updateMarket('additionalDetails', [...formData.market.additionalDetails, { key: '', value: '' }])} className="text-[13px] font-semibold text-[#00a0ef] hover:underline flex items-center gap-1"><Plus size={14} /> Add Detail</button>
//               </div>
//               <div className="space-y-3">
//                 {formData.market.additionalDetails.map((pair, idx) => (
//                   <div key={idx} className="flex gap-3">
//                     <input type="text" placeholder="Key" className={inputStyles} value={pair.key} onChange={e => {
//                       const newArr = [...formData.market.additionalDetails];
//                       newArr[idx].key = e.target.value;
//                       updateMarket('additionalDetails', newArr);
//                     }} />
//                     <input type="text" placeholder="Value" className={inputStyles} value={pair.value} onChange={e => {
//                       const newArr = [...formData.market.additionalDetails];
//                       newArr[idx].value = e.target.value;
//                       updateMarket('additionalDetails', newArr);
//                     }} />
//                     <button type="button" onClick={() => {
//                       const newArr = formData.market.additionalDetails.filter((_, i) => i !== idx);
//                       updateMarket('additionalDetails', newArr);
//                     }} className="px-3 py-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"><Trash2 size={18} /></button>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// function Step3Form({ formData, setFormData }: { formData: AppState; setFormData: (val: any) => void }) {
//   const photoInputRef = useRef<HTMLInputElement>(null);
//   const docInputRef = useRef<HTMLInputElement>(null);

//   const handleFileUpload = (type: 'photos' | 'documents', e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) {
//       setFormData((prev: AppState) => ({ ...prev, uploads: { ...prev.uploads, [type]: [...prev.uploads[type], ...Array.from(e.target.files!)] } }));
//     }
//   };

//   const removeFile = (type: 'photos' | 'documents', idx: number) => {
//     setFormData((prev: AppState) => ({ ...prev, uploads: { ...prev.uploads, [type]: prev.uploads[type].filter((_, i) => i !== idx) } }));
//   };

//   return (
//     <div className="bg-white border border-gray-200 md:rounded-xl overflow-hidden shadow-sm p-4 md:p-6 space-y-8">
//       <div>
//         <h3 className="font-bold md:text-[16px] text-[#00a0ef] mb-4">Site Photos</h3>
//         <div onClick={() => photoInputRef.current?.click()} className="border-2 border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition cursor-pointer">
//           <input type="file" multiple accept="image/*" className="hidden" ref={photoInputRef} onChange={(e) => handleFileUpload('photos', e)} />
//           <UploadCloud className="w-8 h-8 text-gray-400 mb-2" />
//           <p className="text-sm text-gray-600 text-center">Click to <span className="text-[#00a0ef] font-medium">browse photos</span></p>
//         </div>
//         {formData.uploads.photos.length > 0 && (
//           <div className="grid grid-cols-3 md:grid-cols-5 gap-3 mt-4">
//             {formData.uploads.photos.map((file, idx) => (
//               <div key={idx} className="relative aspect-square rounded-lg border border-gray-200 overflow-hidden bg-gray-50 flex items-center justify-center group">
//                 <img src={URL.createObjectURL(file)} alt="Preview" className="w-full h-full object-cover transition-opacity group-hover:opacity-75" />
//                 <button type="button" onClick={(e) => { e.stopPropagation(); removeFile('photos', idx); }} className="absolute top-1 right-1 bg-white/90 rounded-full p-1 shadow-md opacity-0 group-hover:opacity-100 transition-all hover:bg-red-50 text-red-500"><X size={14} /></button>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       <div className="border-t border-gray-100 pt-8">
//         <h3 className="font-bold md:text-[16px] text-[#00a0ef] mb-4">Documents</h3>
//         <div onClick={() => docInputRef.current?.click()} className="border-2 border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition cursor-pointer">
//           <input type="file" multiple className="hidden" ref={docInputRef} onChange={(e) => handleFileUpload('documents', e)} />
//           <FileText className="w-8 h-8 text-gray-400 mb-2" />
//           <p className="text-sm text-gray-600 text-center">Click to <span className="text-[#00a0ef] font-medium">browse documents</span></p>
//         </div>
//         {formData.uploads.documents.length > 0 && (
//           <div className="space-y-3 mt-4">
//             {formData.uploads.documents.map((file, idx) => (
//               <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 border border-gray-100 rounded-xl">
//                 <div className="flex items-center gap-3"><div className="w-10 h-10 bg-[#e6f5fd] rounded-lg flex items-center justify-center text-[#00a0ef]"><FileText className="w-5 h-5" /></div><div><p className="text-[13px] font-medium text-gray-900 line-clamp-1">{file.name}</p><p className="text-xs text-gray-500">{(file.size / (1024 * 1024)).toFixed(1)} MB</p></div></div>
//                 <button type="button" onClick={() => removeFile('documents', idx)} className="text-[13px] text-red-500 font-medium px-2 py-1">Remove</button>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// function Step4Form({ formData, onEditStep, isConfirmed, setIsConfirmed }: { formData: AppState; onEditStep: (step: number) => void; isConfirmed: boolean; setIsConfirmed: (v: boolean) => void }) {
//   const MainCategory = ({ title, icon: Icon, children }: any) => (
//     <div className="mb-8 px-1"><div className="flex items-center gap-2 mb-4"><div className="w-5 h-5 flex items-center justify-center text-[#00a0ef]"><Icon className="w-5 h-5 fill-current opacity-20" strokeWidth={2} /></div><h3 className="text-[15px] font-bold text-gray-900">{title}</h3></div><div className="bg-white px-2">{children}</div></div>
//   );
//   const SubCategory = ({ title, stepNum, children }: any) => (
//     <div className="py-4 border-b border-gray-200 last:border-0 first:pt-0"><div className="flex items-center justify-between mb-4"><h4 className="text-[13px] font-bold text-gray-800">{title}</h4><button type="button" onClick={() => onEditStep(stepNum)} className="text-[#00a0ef] hover:bg-blue-50 p-1.5 rounded transition-colors"><Edit2 className="w-3.5 h-3.5" /></button></div><div className="grid grid-cols-2 gap-y-4 gap-x-4">{children}</div></div>
//   );
//   const DataField = ({ label, value }: any) => (
//     <div><p className="text-[11px] text-gray-500 font-medium mb-1">{label}</p><div className="text-[13px] font-medium text-gray-900 break-words">{value || '—'}</div></div>
//   );

//   return (
//     <div className="max-w-3xl bg-white mx-auto md:px-4 pb-8">
//       <div className="py-6 px-2"><h2 className="text-[18px] font-bold text-[#00a0ef]">Review & Submit</h2></div>

//       <MainCategory title="Client, Owner & Property" icon={Landmark}>
//         <SubCategory title="Bank Details" stepNum={1}>
//           <DataField label="IFSC Code" value={formData.clientBank.ifsc} />
//           <DataField label="Bank Name" value={formData.clientBank.bankName} />
//           <DataField label="Branch" value={formData.clientBank.branch} />
//           <DataField label="Email" value={formData.clientBank.email} />
//           <DataField label="POC" value={`${formData.clientBank.contactPersonName} / ${formData.clientBank.contactPersonNumber}`} />
//           <DataField label="Dates" value={`${formData.clientBank.dateOfInspection} / ${formData.clientBank.dateOfValuation}`} />
//           <DataField label="Type of Property" value={formData.clientBank.propertyType} />
//           <DataField label="Purpose" value={formData.clientBank.purposeOfValuation} />
//         </SubCategory>
//         <SubCategory title="Owner Details & Locality" stepNum={1}>
//           <DataField label="Name" value={`${formData.owner.prefix} ${formData.owner.ownerName}`} />
//           <DataField label="Relation" value={`${formData.owner.relation} ${formData.owner.relationName}`} />
//           <DataField label="Phone" value={`${formData.owner.phone1} / ${formData.owner.phone2}`} />
//           <DataField label="Urban/Rural" value={formData.locality.urbanRural} />
//           <DataField label="Class" value={formData.locality.localityClass} />
//           <DataField label="Tenure" value={formData.locality.landTenure} />
//         </SubCategory>
//         <SubCategory title="Property Settings" stepNum={1}>
//           <DataField label="Address" value={formData.property.address} />
//           <DataField label="Nature" value={formData.property.natureOfProperty} />
//           <DataField label="Shape" value={formData.property.plotShape} />
//           <DataField label="Calculated Area" value={`${formData.property.calculatedArea} ${formData.property.conversionUnit}`} />
//           <DataField label="Wall Setup" value={`${formData.property.wallLength}x${formData.property.wallHeight} ${formData.property.wallUnit}`} />
//           <DataField label="Negative Points" value={formData.negativePoints.join(', ')} />
//         </SubCategory>
//         <SubCategory title="Boundaries" stepNum={1}>
//           <DataField label="Unit" value={formData.boundaries.unit} />
//           <DataField label="North (Doc/Act)" value={`${formData.boundaries.northDoc} / ${formData.boundaries.northAct}`} />
//           <DataField label="South (Doc/Act)" value={`${formData.boundaries.southDoc} / ${formData.boundaries.southAct}`} />
//           <DataField label="East (Doc/Act)" value={`${formData.boundaries.eastDoc} / ${formData.boundaries.eastAct}`} />
//           <DataField label="West (Doc/Act)" value={`${formData.boundaries.westDoc} / ${formData.boundaries.westAct}`} />
//         </SubCategory>
//       </MainCategory>

//       <MainCategory title="Building & Market Details" icon={Building}>
//         {formData.floors.map((floor) => (
//           <SubCategory key={floor.id} title={`Floor: ${floor.floorName}`} stepNum={2}>
//             <DataField label="Possession" value={floor.possessionWith} />
//             <DataField label="Covered Area" value={`${floor.coveredArea} ${floor.conversionUnit}`} />
//             <DataField label="Condition" value={floor.condition} />
//             <DataField label="Structure" value={floor.structure} />
//             <DataField label="Flooring" value={floor.flooring} />
//             <DataField label="Accommodation" value={floor.accommodation} />
//             <DataField label="Doors/Windows" value={floor.doorsWindows} />
//             <DataField label="Remarks" value={floor.floorRemarks} />
//           </SubCategory>
//         ))}
//         <SubCategory title="Market & Shared Details" stepNum={2}>
//           <DataField label="Year Constructed" value={formData.market.yearOfConstruction} />
//           <DataField label="Renovation" value={formData.market.renovation} />
//           <DataField label="Parking" value={formData.market.parking} />
//           <DataField label="Rental Income" value={`${formData.market.rentalMin} - ${formData.market.rentalMax} ${formData.market.rentalUnit}`} />
//           <DataField label="Client Rate" value={`${formData.market.marketClientMin} - ${formData.market.marketClientMax} ${formData.market.marketClientUnit}`} />
//           <DataField label="Dealer Rate" value={`${formData.market.marketDealerMin} - ${formData.market.marketDealerMax} ${formData.market.marketDealerUnit}`} />
//           <DataField label="Market Rate" value={`${formData.market.marketMarketMin} - ${formData.market.marketMarketMax} ${formData.market.marketMarketUnit}`} />
//           <DataField label="Dealer Details" value={`${formData.market.dealerName} / ${formData.market.dealerMobile}`} />
//         </SubCategory>
//       </MainCategory>

//       <MainCategory title="Uploads" icon={UploadCloud}>
//         <SubCategory title="Files Overview" stepNum={3}>
//           <DataField label="Photos" value={`${formData.uploads.photos.length} uploaded`} />
//           <DataField label="Documents" value={`${formData.uploads.documents.length} uploaded`} />
//         </SubCategory>
//       </MainCategory>

//       <div className="mt-8 p-4 bg-[#f8fafc] border border-gray-200 rounded-xl flex items-start gap-3">
//         <div className="pt-0.5"><input type="checkbox" id="final-confirm" checked={isConfirmed} onChange={(e) => setIsConfirmed(e.target.checked)} className="w-4 h-4 text-[#00a0ef] border-gray-300 rounded focus:ring-[#00a0ef]" /></div>
//         <label htmlFor="final-confirm" className="text-[13px] text-gray-700 leading-relaxed select-none cursor-pointer">I confirm that all information provided above is correct.</label>
//       </div>
//     </div>
//   );
// }

// export default function App() {
//   const [currentStep, setCurrentStep] = useState(1);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [isConfirmed, setIsConfirmed] = useState(false);
//   const [isSubmittedSuccessfully, setIsSubmittedSuccessfully] = useState(false);

//   const [formData, setFormData] = useState<AppState>({
//     customer: '',
//     clientBank: { ifsc: '', bankName: '', branch: '', email: '', contactPersonName: '', contactPersonNumber: '', dateOfInspection: '', dateOfValuation: '', propertyType: '', purposeOfValuation: '' },
//     owner: { prefix: 'Shri', ownerName: '', relation: 'S/o', relationName: '', occupation: '', phone1: '', phone2: '' },
//     locality: { urbanRural: '', localityClass: '', landTenure: '', widthOfRoad: '', noOfStories: '', sanitaryFitting: '', electricalFitting: '', townplan: '' },
//     property: { address: '', natureOfProperty: '', vacantPlot: '', widthOfRoad: '', latitude: '', longitude: '', boundaryCoordinates: [], plotShape: '', dimensionUnit: '', length: '', breadth: '', conversionUnit: '', calculatedArea: '', wallUnit: '', wallLength: '', wallHeight: '', wallsOnSide: '', brickType: '' },
//     boundaries: { unit: '', northDoc: '', northAct: '', southDoc: '', southAct: '', eastDoc: '', eastAct: '', westDoc: '', westAct: '' },
//     floors: [],
//     market: { yearOfConstruction: '', renovation: '', parking: '', lift: '', rentalMin: '', rentalMax: '', rentalUnit: '', kitchenType: '', marketClientMin: '', marketClientMax: '', marketClientUnit: '', marketDealerMin: '', marketDealerMax: '', marketDealerUnit: '', marketMarketMin: '', marketMarketMax: '', marketMarketUnit: '', dealerName: '', dealerMobile: '', additionalDetails: [] },
//     negativePoints: [],
//     uploads: { photos: [], documents: [] }
//   });

//   const handleStepContinue = () => {
//     if (currentStep < 4) { setCurrentStep(prev => prev + 1); window.scrollTo({ top: 0, behavior: 'smooth' }); }
//     else { handleSubmit(); }
//   };

//   const handleStepBack = () => {
//     if (currentStep > 1) { setCurrentStep(prev => prev - 1); window.scrollTo({ top: 0, behavior: 'smooth' }); }
//   };

//   const handleSubmit = async () => {
//     if (!isConfirmed) { alert('Please check the confirmation box to submit.'); return; }
//     setIsSubmitting(true);
    
//     try {
//       // Note: The API expects URLs (strings) for uploads, but the UI state holds File[].
//       // Map files to mock URLs here. Implement actual file upload to bucket before this step if needed.
//       const uploadedPhotosUrls = 'formData.uploads.photos.map(file => `https://your-storage-bucket.com/${file.name}`);'
//       const uploadedDocumentsUrls = 'formData.uploads.documents.map(file => `https://your-storage-bucket.com/${file.name}`);'

//       // Construct payload mimicking the exact shape of AppState (which matches the API)
//       const payload = {
//         customer: formData.customer,
//         clientBank: formData.clientBank,
//         owner: formData.owner,
//         locality: formData.locality,
//         property: formData.property,
//         boundaries: formData.boundaries,
//         floors: formData.floors,
//         market: formData.market,
//         negativePoints: formData.negativePoints,
//         uploads: { 
//           photos: uploadedPhotosUrls, 
//           documents: uploadedDocumentsUrls 
//         }
//       };

//       console.log("Submitted Data Payload:", JSON.stringify(payload, null, 2));

//       await api.createValuationRecord(payload);
//       setIsSubmittedSuccessfully(true);

//     } catch (e) { 
//       console.error("Failed to submit report:", e); 
//       alert("An error occurred while submitting the report.");
//     } finally { 
//       setIsSubmitting(false); 
//     }
//   };

//   if (isSubmittedSuccessfully) {
//     return (
//       <div className="flex flex-col flex-1 w-full relative min-h-screen md:min-h-0 bg-white overflow-hidden items-center justify-center p-6">
//         <div className="w-[88px] h-[88px] rounded-full flex items-center justify-center bg-[#f0f8fd] mb-6">
//           <div className="w-[60px] h-[60px] rounded-full bg-white flex items-center justify-center shadow-sm">
//             <div className="w-[32px] h-[32px] bg-[#00a0ef] rounded-full flex items-center justify-center"><Check className="w-4 h-4 text-white" strokeWidth={3.5} /></div>
//           </div>
//         </div>
//         <h2 className="text-[20px] lg:text-[24px] font-bold text-gray-900 mb-3 text-center">Report submitted successfully.</h2>
//         <p className="text-[#8A94A6] text-[14px] md:text-[15px] mb-8 text-center max-w-sm">Data has been logged to the console.</p>
//         <button onClick={() => window.location.reload()} className="px-8 py-3 bg-[#00a0ef] hover:bg-[#008bd1] rounded-lg text-white font-medium transition-colors">Start New Report</button>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 flex flex-col md:py-8">
//       <div className="flex-1 flex flex-col w-full md:max-w-4xl md:mx-auto bg-white border-x md:border border-gray-200 md:rounded-xl md:shadow-sm overflow-hidden">
        
//         <div className="px-4 md:px-6 py-4 border-b border-gray-200 bg-white flex flex-col md:flex-row md:items-center justify-between gap-4">
//           <h1 className="text-lg md:text-xl font-medium text-gray-900">Submit New Report</h1>
//           <div className="relative w-full md:w-64">
//             <select className={`${inputStyles} appearance-none bg-blue-50/30 border-[#00a0ef]/30 font-medium`} value={formData.customer} onChange={e => setFormData({ ...formData, customer: e.target.value })}>
//               <option value="">Select Customer </option>
//               <option value="cust_001">Customer A - John Doe</option>
//               <option value="cust_002">Customer B - Acme Corp</option>
//             </select>
//             <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
//           </div>
//         </div>

//         <div className="px-6 pt-10 pb-6 md:pt-12 md:pb-8 border-b border-gray-200 bg-white shrink-0">
//           <div className="max-w-xl mx-auto relative">
//             <div className="flex items-center justify-between relative">
//               <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[2px] bg-gray-200" />
//               {[1, 2, 3, 4].map((step) => {
//                 const isCompleted = step < currentStep;
//                 const isCurrent = step === currentStep;
//                 return (
//                   <div key={step} className="relative z-10 flex flex-col items-center">
//                     <span className={`absolute -top-7 whitespace-nowrap text-xs font-semibold tracking-wide ${isCompleted || isCurrent ? 'text-[#00a0ef]' : 'text-gray-400'}`}>STEP {step}</span>
//                     <div className={`w-8 h-8 rounded-full flex items-center justify-center bg-white ${isCompleted ? 'border-2 border-[#00a0ef] bg-[#00a0ef]' : isCurrent ? 'border-2 border-[#00a0ef]' : 'border-2 border-gray-300'}`}>
//                       {isCompleted && <CircleCheck color='white' fill='#00a0ef' />}
//                       {isCurrent && <div className="w-4 h-4 bg-[#00a0ef] rounded-full" />}
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         </div>

//         <div className="flex-1 overflow-y-auto bg-gray-50 md:p-6">
//           {currentStep === 1 && <Step1Form formData={formData} setFormData={setFormData} />}
//           {currentStep === 2 && <Step2Form formData={formData} setFormData={setFormData} />}
//           {currentStep === 3 && <Step3Form formData={formData} setFormData={setFormData} />}
//           {currentStep === 4 && <Step4Form formData={formData} onEditStep={setCurrentStep} isConfirmed={isConfirmed} setIsConfirmed={setIsConfirmed} />}
//         </div>
        
//         <div className="p-4 md:px-6 md:py-5 bg-white border-t border-gray-200 flex items-center justify-between mt-auto shrink-0">
//           <button onClick={handleStepBack} className={`flex items-center px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 text-[13px] font-medium hover:bg-gray-50 transition-colors ${currentStep === 1 ? 'invisible' : ''}`}>
//             <ArrowLeft className="w-4 h-4 mr-2" /> Back
//           </button>
//           <button onClick={handleStepContinue} disabled={isSubmitting} className="flex items-center px-6 py-2.5 bg-[#00a0ef] hover:bg-[#008bd1] rounded-lg text-white text-[13px] font-medium transition-shadow shadow-sm hover:shadow-md disabled:opacity-60">
//             {isSubmitting ? 'Submitting...' : currentStep === 4 ? 'Submit Report' : `Continue to Step ${currentStep + 1}`}
//             {!isSubmitting && currentStep !== 4 && <ArrowRight className="w-4 h-4 ml-2" />}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// 'use client';

// import React, { useState, useEffect, useCallback, useRef } from 'react';
// import { Building, Landmark, CheckCircle2, UploadCloud, X, FileText, Edit2, CircleCheck, Plus, Trash2, Check, RotateCcw, ArrowLeft, ArrowRight, ChevronDown } from 'lucide-react';
// import { APIProvider, Map, AdvancedMarker, useMap } from "@vis.gl/react-google-maps";
// import { api } from '@/app/lib/userApis';

// type Coord = { lat: number; lng: number };
// type Pin = { id: number; coord: Coord };
// type Mode = "picking" | "submitted";

// const MAX = 10;
// const LABELS = ["P1", "P2", "P3", "P4", "P5", "P6", "P7", "P8", "P9", "P10"];
// const COLORS = ["#00a0ef", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899", "#06b6d4", "#14b8a6", "#f97316", "#6366f1"];

// export interface FloorDetail {
//   id: string;
//   floorName: string;
//   possessionWith: string;
//   unit: string;
//   length: string;
//   breadth: string;
//   conversionUnit: string;
//   coveredArea: string;
//   condition: string;
//   structure: string;
//   flooring: string;
//   accommodation: string;
//   doorsWindows: string;
//   floorRemarks: string;
// }

// interface AppState {
//   customer: string;
//   clientBank: { ifsc: string; bankName: string; branch: string; email: string; contactPersonName: string; contactPersonNumber: string; dateOfInspection: string; dateOfValuation: string; propertyType: string; purposeOfValuation: string; };
//   owner: { prefix: string; ownerName: string; relation: string; relationName: string; occupation: string; phone1: string; phone2: string; };
//   locality: { urbanRural: string; localityClass: string; landTenure: string; widthOfRoad: string; noOfStories: string; sanitaryFitting: string; electricalFitting: string; townplan: string; };
//   property: { address: string; natureOfProperty: string; vacantPlot: string; widthOfRoad: string; latitude: string; longitude: string; boundaryCoordinates: Coord[]; plotShape: string; dimensionUnit: string; length: string; breadth: string; conversionUnit: string; calculatedArea: string; wallUnit: string; wallLength: string; wallHeight: string; wallsOnSide: string; brickType: string; };
//   boundaries: { unit: string; northDoc: string; northAct: string; southDoc: string; southAct: string; eastDoc: string; eastAct: string; westDoc: string; westAct: string; };
//   floors: FloorDetail[];
//   market: { yearOfConstruction: string; renovation: string; parking: string; lift: string; rentalMin: string; rentalMax: string; rentalUnit: string; kitchenType: string; marketClientMin: string; marketClientMax: string; marketClientUnit: string; marketDealerMin: string; marketDealerMax: string; marketDealerUnit: string; marketMarketMin: string; marketMarketMax: string; marketMarketUnit: string; dealerName: string; dealerMobile: string; additionalDetails: { key: string; value: string }[]; };
//   negativePoints: string[];
//   uploads: { photos: File[]; documents: File[]; };
// }

// const inputStyles = "w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-[#00a0ef] focus:ring-1 focus:ring-[#00a0ef] text-[13px] text-gray-900 bg-white shadow-sm transition-shadow";
// const labelStyles = "block text-[13px] font-semibold text-gray-700 mb-2";

// const RadioGroup = ({ options, value, onChange }: { options: string[], value: string, onChange: (val: string) => void }) => {
//   const isCustom = value !== '' && !options.includes(value);
//   const [showCustom, setShowCustom] = useState(isCustom);

//   return (
//     <div className="flex flex-wrap gap-2 items-center">
//       {options.map(opt => (
//         <button key={opt} type="button" onClick={() => { setShowCustom(false); onChange(opt); }}
//           className={`px-3 py-2 rounded-lg text-[13px] font-medium transition-all border ${!showCustom && value === opt ? 'bg-blue-50 border-[#00a0ef] text-[#00a0ef] shadow-sm' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'}`}>
//           {opt}
//         </button>
//       ))}
//       <div className="flex items-center gap-2">
//         {!showCustom && (
//           <button type="button" onClick={() => { setShowCustom(true); onChange(''); }}
//             className={`px-3 py-2 rounded-lg text-[13px] font-medium transition-all border bg-white border-gray-200 text-gray-600 hover:bg-gray-50`}>
//             Other / Add Option
//           </button>
//         )}
//         {showCustom && (
//           <div className="flex items-center gap-1 bg-white border border-gray-300 rounded-lg pr-1 shadow-sm focus-within:border-[#00a0ef] focus-within:ring-1 focus-within:ring-[#00a0ef]">
//             <input type="text" placeholder="Type custom option..." className="px-3 py-2 text-[13px] rounded-l-lg focus:outline-none border-none w-40" value={value} onChange={e => onChange(e.target.value)} autoFocus />
//             <button type="button" onClick={() => { setShowCustom(false); onChange(''); }} className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors">
//               <X size={14} />
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// const MultiSelectGroup = ({ options, selected, onChange }: { options: string[], selected: string[], onChange: (val: string[]) => void }) => {
//   const toggle = (opt: string) => selected.includes(opt) ? onChange(selected.filter(i => i !== opt)) : onChange([...selected, opt]);
//   const customValues = selected.filter(val => !options.includes(val));
//   const [customInput, setCustomInput] = useState('');

//   const handleAddCustom = () => {
//     if (customInput.trim() && !selected.includes(customInput.trim())) {
//       onChange([...selected, customInput.trim()]);
//       setCustomInput('');
//     }
//   };

//   return (
//     <div className="flex flex-col gap-3">
//       <div className="flex flex-wrap gap-2">
//         {options.map(opt => (
//           <button key={opt} type="button" onClick={() => toggle(opt)}
//             className={`px-3 py-2 rounded-lg text-[13px] font-medium transition-all border ${selected.includes(opt) ? 'bg-blue-50 border-[#00a0ef] text-[#00a0ef] shadow-sm' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'}`}>
//             {opt}
//           </button>
//         ))}
//         {customValues.map(opt => (
//           <button key={opt} type="button" onClick={() => toggle(opt)}
//             className="px-3 py-2 rounded-lg text-[13px] font-medium transition-all border bg-blue-50 border-[#00a0ef] text-[#00a0ef] shadow-sm flex items-center gap-2">
//             {opt} <X className="w-3 h-3" />
//           </button>
//         ))}
//       </div>
//       <div className="flex items-center gap-2">
//         <input type="text" placeholder="Add custom option..." className="px-3 py-2 text-[13px] border border-gray-300 rounded-lg focus:outline-none focus:border-[#00a0ef] w-48 shadow-sm" value={customInput} onChange={e => setCustomInput(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddCustom(); } }} />
//         <button type="button" onClick={handleAddCustom} className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-[13px] font-medium hover:bg-gray-200 transition-colors">Add</button>
//       </div>
//     </div>
//   );
// };

// function NextSectionButton({ onClick, nextFocusId }: { onClick: () => void, nextFocusId: string }) {
//   const handleAction = (e: React.MouseEvent | React.KeyboardEvent) => {
//     e.preventDefault();
//     onClick();
//     setTimeout(() => document.getElementById(nextFocusId)?.focus(), 50);
//   };
//   return (
//     <div className="md:col-span-full flex justify-end mt-4 border-t border-gray-200/50 pt-4">
//       <button type="button" onClick={handleAction} onKeyDown={(e) => { if (e.key === 'Tab' && !e.shiftKey) { handleAction(e); } }} className="text-[#00a0ef] text-[13px] font-bold hover:underline flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-[#00a0ef] focus:ring-offset-2 rounded px-3 py-1.5 transition-colors">
//         Next Section <ArrowRight className="w-4 h-4" />
//       </button>
//     </div>
//   );
// }

// function GeoCoordinatePicker({ onCoordinatesSubmit }: { onCoordinatesSubmit: (coords: Coord[]) => void }) {
//   const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "";
//   const [center, setCenter] = useState<Coord>({ lat: 20, lng: 78 });
//   const [zoom, setZoom] = useState(4);
//   const [mode, setMode] = useState<Mode>("picking");
//   const [pins, setPins] = useState<Pin[]>([]);
//   const [nextId, setNextId] = useState(0);
//   const [submitted, setSubmitted] = useState<Pin[]>([]);
//   const [editTarget, setEditTarget] = useState<number | null>(null);
//   const [userLocation, setUserLocation] = useState<Coord | null>(null);

//   useEffect(() => {
//     if ("geolocation" in navigator) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const userLoc = { lat: position.coords.latitude, lng: position.coords.longitude };
//           setUserLocation(userLoc); setCenter(userLoc); setZoom(18);
//         },
//         (error) => console.error("Error getting user location:", error),
//         { enableHighAccuracy: true }
//       );
//     }
//   }, []);

//   const handleMapClick = useCallback((coord: Coord) => {
//     if (mode === "picking") {
//       if (pins.length >= MAX) return;
//       setPins((prev) => [...prev, { id: nextId, coord }]);
//       setNextId((n) => n + 1); return;
//     }
//     if (mode === "submitted" && editTarget !== null) {
//       setSubmitted((prev) => prev.map((p, i) => (i === editTarget ? { ...p, coord } : p)));
//       setEditTarget(null);
//     }
//   }, [mode, pins.length, nextId, editTarget]);

//   const handleSubmit = () => {
//     if (pins.length === 0) return;
//     setSubmitted([...pins]); setMode("submitted"); setEditTarget(null);
//     onCoordinatesSubmit(pins.map(p => p.coord));
//   };

//   return (
//     <div className="flex flex-col w-full bg-white border border-gray-300 rounded-xl overflow-hidden shadow-sm">
//       <div className="relative w-full h-64 md:h-80 bg-gray-100">
//         <APIProvider apiKey={apiKey}>
//           <Map mapId="geo-picker-form" center={center} zoom={zoom} mapTypeId="satellite"
//             onCameraChanged={(ev) => { setCenter(ev.detail.center); setZoom(ev.detail.zoom); }}
//             gestureHandling="greedy" colorScheme="LIGHT" mapTypeControl={true} zoomControl={true} fullscreenControl={true} streetViewControl={true}
//             style={{ width: "100%", height: "100%" }}>
//             {userLocation && (
//               <AdvancedMarker position={userLocation}>
//                 <div className="relative"><div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-lg" /><div className="absolute inset-0 w-4 h-4 bg-blue-400 rounded-full animate-ping opacity-40" /></div>
//               </AdvancedMarker>
//             )}
//             <ClickHandler onClick={handleMapClick} />
//             {(mode === "picking" ? pins : submitted).map((pin, i) => (
//               <AdvancedMarker key={pin.id} position={pin.coord} zIndex={editTarget === i ? 100 : i}>
//                 <button type="button" onClick={(e) => { e.stopPropagation(); if (mode === "submitted") setEditTarget(editTarget === i ? null : i); }}
//                   className={`flex items-center justify-center rounded-full font-bold text-white text-xs shadow-md transition-all ${editTarget === i ? "w-10 h-10 ring-4 ring-white scale-110" : "w-8 h-8 ring-2 ring-white/80 scale-100"} ${mode === "submitted" ? "cursor-pointer" : "cursor-default"}`}
//                   style={{ backgroundColor: COLORS[i] }}>{LABELS[i]}</button>
//               </AdvancedMarker>
//             ))}
//           </Map>
//         </APIProvider>
//       </div>
//       <div className="p-4 bg-gray-50 border-t border-gray-200">
//         {mode === "picking" ? (
//           <button type="button" onClick={handleSubmit} disabled={pins.length === 0}
//             className={`w-full py-2.5 rounded-lg text-sm font-semibold transition-colors flex items-center justify-center gap-2 ${pins.length > 0 ? "bg-[#00a0ef] text-white hover:bg-[#008bd1] shadow-sm" : "bg-gray-200 text-gray-400 cursor-not-allowed"}`}>
//             {pins.length > 0 ? <><CheckCircle2 className="w-4 h-4" /> Confirm Boundaries</> : "Place at least 1 point"}
//           </button>
//         ) : (
//           <button type="button" onClick={() => { setPins([]); setSubmitted([]); setMode("picking"); setEditTarget(null); setNextId(0); }}
//             className="w-full py-2.5 rounded-lg text-sm font-semibold transition-colors flex items-center justify-center gap-2 bg-red-50 text-red-600 hover:bg-red-100">
//             <RotateCcw className="w-4 h-4" /> Reset Boundaries
//           </button>
//         )}
//       </div>
//     </div>
//   );
// }

// function ClickHandler({ onClick }: { onClick: (c: Coord) => void }) {
//   const map = useMap();
//   useEffect(() => {
//     if (!map) return;
//     const listener = map.addListener("click", (e: google.maps.MapMouseEvent) => {
//       if (e.latLng) onClick({ lat: e.latLng.lat(), lng: e.latLng.lng() });
//     });
//     return () => { google.maps.event.removeListener(listener); };
//   }, [map, onClick]);
//   return null;
// }

// function Step1Form({ formData, setFormData }: { formData: AppState; setFormData: (val: any) => void }) {
//   const [activeSection, setActiveSection] = useState<string>('clientBank');

//   const updateSection = (section: keyof AppState, field: string, value: any) => {
//     setFormData((prev: AppState) => ({ ...prev, [section]: { ...(prev[section] as any), [field]: value } }));
//   };

//   const renderSectionHeader = (title: string, id: string) => (
//     <div className={`flex items-center justify-between p-4 md:px-6 md:py-5 cursor-pointer transition-colors ${activeSection === id ? 'bg-blue-50/50 border-b border-blue-100' : 'bg-white hover:bg-gray-50 border-b border-gray-100'}`} onClick={() => setActiveSection(activeSection === id ? '' : id)}>
//       <h3 className="font-bold md:text-[15px] text-[#00a0ef]">{title}</h3>
//       <ChevronDown className={`w-5 h-5 text-[#00a0ef] transition-transform ${activeSection === id ? 'rotate-180' : ''}`} />
//     </div>
//   );

//   return (
//     <div className="bg-white border border-gray-200 md:rounded-xl overflow-hidden shadow-sm divide-y divide-gray-100">
      
//       <div>
//         {renderSectionHeader('Client / Bank Details', 'clientBank')}
//         {activeSection === 'clientBank' && (
//           <div className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 bg-blue-50/10">
//             <div><label className={labelStyles}>IFSC Code</label><input id="clientBank-first" type="text" className={inputStyles} value={formData.clientBank.ifsc} onChange={e => updateSection('clientBank', 'ifsc', e.target.value)} /></div>
//             <div><label className={labelStyles}>Bank Name</label><input type="text" className={inputStyles} value={formData.clientBank.bankName} onChange={e => updateSection('clientBank', 'bankName', e.target.value)} /></div>
//             <div><label className={labelStyles}>Branch</label><input type="text" className={inputStyles} value={formData.clientBank.branch} onChange={e => updateSection('clientBank', 'branch', e.target.value)} /></div>
//             <div><label className={labelStyles}>Email ID</label><input type="email" className={inputStyles} value={formData.clientBank.email} onChange={e => updateSection('clientBank', 'email', e.target.value)} /></div>
//             <div><label className={labelStyles}>Point of Contact Name</label><input type="text" className={inputStyles} value={formData.clientBank.contactPersonName} onChange={e => updateSection('clientBank', 'contactPersonName', e.target.value)} /></div>
//             <div><label className={labelStyles}>Point of Contact Number</label><input type="tel" className={inputStyles} value={formData.clientBank.contactPersonNumber} onChange={e => updateSection('clientBank', 'contactPersonNumber', e.target.value)} /></div>
//             <div><label className={labelStyles}>Date of Inspection</label><input type="date" className={inputStyles} value={formData.clientBank.dateOfInspection} onChange={e => updateSection('clientBank', 'dateOfInspection', e.target.value)} /></div>
//             <div><label className={labelStyles}>Date Valuation</label><input type="date" className={inputStyles} value={formData.clientBank.dateOfValuation} onChange={e => updateSection('clientBank', 'dateOfValuation', e.target.value)} /></div>
            
//             <div className="md:col-span-2">
//               <label className={labelStyles}>Type of Property</label>
//               <RadioGroup options={['Vacant Land - Residential', 'Existing Building - Residential', 'Open Piece of Land', 'Residential Flat', 'Agri Land', 'Residential Villa', 'Industrial Shed']} value={formData.clientBank.propertyType} onChange={v => updateSection('clientBank', 'propertyType', v)} />
//             </div>
//             <div className="md:col-span-2">
//               <label className={labelStyles}>Purpose of Valuation (Loan Type)</label>
//               <RadioGroup options={['Home Loan', 'Mortgage Loan', 'Education Loan', 'Collateral Security', 'For Bank Loan / Mortgage Purpose']} value={formData.clientBank.purposeOfValuation} onChange={v => updateSection('clientBank', 'purposeOfValuation', v)} />
//             </div>
//             <NextSectionButton onClick={() => setActiveSection('ownerLocality')} nextFocusId="owner-first" />
//           </div>
//         )}
//       </div>

//       <div>
//         {renderSectionHeader('Owner Details & Locality Classification', 'ownerLocality')}
//         {activeSection === 'ownerLocality' && (
//           <div className="p-4 md:p-6 bg-blue-50/10">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 border-b border-gray-200 pb-6 mb-6">
//               <div className="md:col-span-2 flex gap-3">
//                 <div className="w-1/3 md:w-1/4">
//                   <label className={labelStyles}>Prefix</label>
//                   <div className="relative">
//                     <select id="owner-first" className={`${inputStyles} appearance-none bg-white`} value={formData.owner.prefix} onChange={e => {
//                       const val = e.target.value;
//                       updateSection('owner', 'prefix', val);
//                       if (val === 'Smt' || val === 'Mrs') updateSection('owner', 'relation', 'W/o');
//                       else if (val === 'Shri' || val === 'Mr') updateSection('owner', 'relation', 'S/o');
//                     }}>
//                       <option value="Shri">Shri</option>
//                       <option value="Smt">Smt</option>
//                       <option value="Mr">Mr</option>
//                       <option value="Mrs">Mrs</option>
//                     </select>
//                     <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
//                   </div>
//                 </div>
//                 <div className="flex-1"><label className={labelStyles}>Owner Name</label><input type="text" className={inputStyles} value={formData.owner.ownerName} onChange={e => updateSection('owner', 'ownerName', e.target.value)} /></div>
//               </div>
//               <div className="md:col-span-2 flex gap-3">
//                 <div className="w-1/3 md:w-1/4">
//                   <label className={labelStyles}>Relation</label>
//                   <div className="relative">
//                     <select className={`${inputStyles} appearance-none bg-white`} value={formData.owner.relation} onChange={e => updateSection('owner', 'relation', e.target.value)}>
//                       <option value="S/o">S/o</option>
//                       <option value="D/o">D/o</option>
//                       <option value="W/o">W/o</option>
//                       <option value="F/o">F/o</option>
//                     </select>
//                     <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
//                   </div>
//                 </div>
//                 <div className="flex-1"><label className={labelStyles}>Relative's Name</label><input type="text" className={inputStyles} value={formData.owner.relationName} onChange={e => updateSection('owner', 'relationName', e.target.value)} /></div>
//               </div>
//               <div className="md:col-span-2"><label className={labelStyles}>Occupation</label><input type="text" className={inputStyles} value={formData.owner.occupation} onChange={e => updateSection('owner', 'occupation', e.target.value)} /></div>
//               <div><label className={labelStyles}>Phone Number 1</label><input type="tel" className={inputStyles} value={formData.owner.phone1} onChange={e => updateSection('owner', 'phone1', e.target.value)} /></div>
//               <div><label className={labelStyles}>Phone Number 2</label><input type="tel" className={inputStyles} value={formData.owner.phone2} onChange={e => updateSection('owner', 'phone2', e.target.value)} /></div>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div className="md:col-span-2"><label className={labelStyles}>Rural / Urban</label><RadioGroup options={['metro city', 'urban', 'semi urban rural', 'N/A']} value={formData.locality.urbanRural} onChange={v => updateSection('locality', 'urbanRural', v)} /></div>
//               <div className="md:col-span-2"><label className={labelStyles}>Locality Class</label><RadioGroup options={['high', 'middle', 'low', 'posh', 'N/A']} value={formData.locality.localityClass} onChange={v => updateSection('locality', 'localityClass', v)} /></div>
//               <div className="md:col-span-2"><label className={labelStyles}>Land Tenure</label><RadioGroup options={['freehold', 'leasehold', 'N/A']} value={formData.locality.landTenure} onChange={v => updateSection('locality', 'landTenure', v)} /></div>
//               <div className="md:col-span-2"><label className={labelStyles}>Width of Road</label><RadioGroup options={['< 10ft', '< 20ft', '> 20ft']} value={formData.locality.widthOfRoad} onChange={v => updateSection('locality', 'widthOfRoad', v)} /></div>
//               <div className="md:col-span-2"><label className={labelStyles}>No. of Stories</label><RadioGroup options={['1', '2', '3', '4', '5', '6', '7', '8', '9', 'vacant']} value={formData.locality.noOfStories} onChange={v => updateSection('locality', 'noOfStories', v)} /></div>
//               <div className="md:col-span-2"><label className={labelStyles}>Sanitary Fitting</label><RadioGroup options={['ordinary', 'good', 'superior', 'premium', 'excellent', 'under construction']} value={formData.locality.sanitaryFitting} onChange={v => updateSection('locality', 'sanitaryFitting', v)} /></div>
//               <div className="md:col-span-2"><label className={labelStyles}>Electrical Fitting</label><RadioGroup options={['ordinary', 'good', 'superior', 'premium', 'excellent', 'under construction']} value={formData.locality.electricalFitting} onChange={v => updateSection('locality', 'electricalFitting', v)} /></div>
//               <div className="md:col-span-2"><label className={labelStyles}>Townplan / MC / GP</label><RadioGroup options={['MC', 'townplanning', 'gram panchayat', 'outside Mc']} value={formData.locality.townplan} onChange={v => updateSection('locality', 'townplan', v)} /></div>
//             </div>
//             <NextSectionButton onClick={() => setActiveSection('property')} nextFocusId="property-first" />
//           </div>
//         )}
//       </div>

//       <div>
//         {renderSectionHeader('Property Details', 'property')}
//         {activeSection === 'property' && (
//           <div className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-2 gap-6 bg-blue-50/10">
//             <div className="md:col-span-2">
//               <label className={labelStyles} id="property-first">Geo Location & Coordinates</label>
//               <GeoCoordinatePicker 
//                 onCoordinatesSubmit={(coords) => {
//                   updateSection('property', 'boundaryCoordinates', coords);
//                   if (coords.length > 0) {
//                     updateSection('property', 'latitude', coords[0].lat.toString());
//                     updateSection('property', 'longitude', coords[0].lng.toString());
//                   }
//                 }} 
//               />
//               <div className="flex gap-4 mt-4">
//                 <input type="text" placeholder="Latitude" className={inputStyles} value={formData.property.latitude} readOnly />
//                 <input type="text" placeholder="Longitude" className={inputStyles} value={formData.property.longitude} readOnly />
//               </div>
//             </div>
            
//             <div className="md:col-span-2"><label className={labelStyles}>Address</label><textarea rows={3} className={inputStyles} value={formData.property.address} onChange={e => updateSection('property', 'address', e.target.value)} /></div>
            
//             <div className="md:col-span-2"><label className={labelStyles}>Nature of Property</label><RadioGroup options={['Residential', 'Commercial', 'Industrial', 'Agriculture', 'mixed', 'institutional', 'N/A']} value={formData.property.natureOfProperty} onChange={v => updateSection('property', 'natureOfProperty', v)} /></div>
//             <div className="md:col-span-1"><label className={labelStyles}>Vacant Plot?</label><RadioGroup options={['yes', 'NO']} value={formData.property.vacantPlot} onChange={v => updateSection('property', 'vacantPlot', v)} /></div>
//             <div className="md:col-span-1"><label className={labelStyles}>Width of Road</label><RadioGroup options={['< 10ft', '< 20ft', '> 20ft']} value={formData.property.widthOfRoad} onChange={v => updateSection('property', 'widthOfRoad', v)} /></div>
//             <div className="md:col-span-2"><label className={labelStyles}>Plot Shape</label><RadioGroup options={['Rectangle', 'square', 'triangle', 'irregular', 'polygon']} value={formData.property.plotShape} onChange={v => updateSection('property', 'plotShape', v)} /></div>

//             <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border border-gray-200 bg-white rounded-xl">
//               <div className="md:col-span-3"><label className={labelStyles}>Dimension Unit</label><RadioGroup options={['ft', 'm', 'inch']} value={formData.property.dimensionUnit} onChange={v => updateSection('property', 'dimensionUnit', v)} /></div>
//               <div><label className={labelStyles}>Length</label><input type="number" className={inputStyles} value={formData.property.length} onChange={e => { updateSection('property', 'length', e.target.value); const b = parseFloat(formData.property.breadth) || 0; updateSection('property', 'calculatedArea', (parseFloat(e.target.value || '0') * b).toString()); }} /></div>
//               <div><label className={labelStyles}>Breadth</label><input type="number" className={inputStyles} value={formData.property.breadth} onChange={e => { updateSection('property', 'breadth', e.target.value); const l = parseFloat(formData.property.length) || 0; updateSection('property', 'calculatedArea', (parseFloat(e.target.value || '0') * l).toString()); }} /></div>
//               <div className="md:col-span-3 border-t border-gray-100 pt-4 mt-2"><label className={labelStyles}>Conversion Unit</label><RadioGroup options={['sq ft', 'sq yd', 'sq mt', 'Acre', 'Hectare', 'Guntas']} value={formData.property.conversionUnit} onChange={v => updateSection('property', 'conversionUnit', v)} /></div>
//               <div className="md:col-span-3"><label className={labelStyles}>Calculated Area (Dimensions converted to selected unit)</label><input type="text" className={`${inputStyles} bg-gray-50`} readOnly value={formData.property.calculatedArea} /></div>
//             </div>

//             <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border border-gray-200 bg-white rounded-xl">
//               <div className="md:col-span-2"><label className={labelStyles}>Wall Unit</label><RadioGroup options={['ft', 'm', 'inch']} value={formData.property.wallUnit} onChange={v => updateSection('property', 'wallUnit', v)} /></div>
//               <div><label className={labelStyles}>Wall Length</label><input type="number" className={inputStyles} value={formData.property.wallLength} onChange={e => updateSection('property', 'wallLength', e.target.value)} /></div>
//               <div><label className={labelStyles}>Wall Height</label><input type="number" className={inputStyles} value={formData.property.wallHeight} onChange={e => updateSection('property', 'wallHeight', e.target.value)} /></div>
//               <div className="md:col-span-2"><label className={labelStyles}>Walls on Side</label><RadioGroup options={['1', '2', '3', '4']} value={formData.property.wallsOnSide} onChange={v => updateSection('property', 'wallsOnSide', v)} /></div>
//               <div className="md:col-span-2"><label className={labelStyles}>Type of Brick</label><RadioGroup options={['brick work', 'Rcc', 'pacca offset / pavement']} value={formData.property.brickType} onChange={v => updateSection('property', 'brickType', v)} /></div>
//             </div>

//             <NextSectionButton onClick={() => setActiveSection('boundaries')} nextFocusId="boundaries-first" />
//           </div>
//         )}
//       </div>

//       <div>
//         {renderSectionHeader('Boundaries & Negative Points', 'boundaries')}
//         {activeSection === 'boundaries' && (
//           <div className="p-4 md:p-6 bg-blue-50/10 space-y-6">
//             <div className="md:col-span-2">
//               <label className={labelStyles} id="boundaries-first">Boundary Unit</label>
//               <RadioGroup options={['length', 'feet', 'meters', 'inchs']} value={formData.boundaries.unit} onChange={v => updateSection('boundaries', 'unit', v)} />
//             </div>
            
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-4 rounded-xl border border-gray-200">
//               {(['north', 'south', 'east', 'west'] as const).map(dir => (
//                 <div key={dir} className="flex gap-2">
//                   <div className="flex-1">
//                     <label className={labelStyles}>{dir.charAt(0).toUpperCase() + dir.slice(1)} (As per Document)</label>
//                     <input type="text" className={inputStyles} value={(formData.boundaries as any)[`${dir}Doc`]} onChange={e => updateSection('boundaries', `${dir}Doc`, e.target.value)} />
//                   </div>
//                   <div className="flex-1">
//                     <label className={labelStyles}>{dir.charAt(0).toUpperCase() + dir.slice(1)} (Actual)</label>
//                     <input type="text" className={inputStyles} value={(formData.boundaries as any)[`${dir}Act`]} onChange={e => updateSection('boundaries', `${dir}Act`, e.target.value)} />
//                   </div>
//                 </div>
//               ))}
//             </div>

//             <div className="border-t border-gray-200 pt-6 mt-6">
//               <label className={labelStyles}>Property Negative Points</label>
//               <MultiSelectGroup 
//                 options={['HT line Over building', 'transformer in front', 'sub division of property', 'community dominace', 'common stair for separate units', 'near rail way track', 'near drain', 'near banquet hall']} 
//                 selected={formData.negativePoints} 
//                 onChange={v => setFormData((prev: AppState) => ({ ...prev, negativePoints: v }))} 
//               />
//             </div>
//           </div>
//         )}
//       </div>

//     </div>
//   );
// }

// function Step2Form({ formData, setFormData }: { formData: AppState; setFormData: (val: any) => void }) {
//   const [activeSection, setActiveSection] = useState<string>('floors');
//   const [activeFloorId, setActiveFloorId] = useState<string>('');

//   useEffect(() => {
//     if (formData.floors.length > 0 && !activeFloorId) setActiveFloorId(formData.floors[0].id);
//   }, [formData.floors]);

//   const handleAddFloor = (floorName: string) => {
//     if (!floorName) return;
//     const existing = formData.floors.find((f: FloorDetail) => f.floorName === floorName);
//     if (existing) {
//       setActiveFloorId(existing.id);
//     } else {
//       const newFloor: FloorDetail = {
//         id: Math.random().toString(36).substr(2, 9),
//         floorName, possessionWith: '', unit: '', length: '', breadth: '', conversionUnit: '', coveredArea: '', condition: '', structure: '', flooring: '', accommodation: '', doorsWindows: '', floorRemarks: ''
//       };
//       setFormData((prev: AppState) => ({ ...prev, floors: [...prev.floors, newFloor] }));
//       setActiveFloorId(newFloor.id);
//     }
//   };

//   const updateFloor = (id: string, field: keyof FloorDetail, value: string) => {
//     setFormData((prev: AppState) => ({
//       ...prev,
//       floors: prev.floors.map(f => {
//         if (f.id === id) {
//           const newF = { ...f, [field]: value };
//           if (field === 'length' || field === 'breadth') {
//             const l = parseFloat(newF.length) || 0;
//             const b = parseFloat(newF.breadth) || 0;
//             newF.coveredArea = (l * b).toString();
//           }
//           return newF;
//         }
//         return f;
//       })
//     }));
//   };

//   const removeFloor = (id: string) => {
//     setFormData((prev: AppState) => {
//       const newFloors = prev.floors.filter(f => f.id !== id);
//       if (activeFloorId === id) setActiveFloorId(newFloors.length > 0 ? newFloors[0].id : '');
//       return { ...prev, floors: newFloors };
//     });
//   };

//   const updateMarket = (field: string, value: any) => {
//     setFormData((prev: AppState) => ({ ...prev, market: { ...prev.market, [field]: value } }));
//   };

//   const renderSectionHeader = (title: string, id: string) => (
//     <div className={`flex items-center justify-between p-4 md:px-6 md:py-5 cursor-pointer transition-colors ${activeSection === id ? 'bg-blue-50/50 border-b border-blue-100' : 'bg-white hover:bg-gray-50 border-b border-gray-100'}`} onClick={() => setActiveSection(activeSection === id ? '' : id)}>
//       <h3 className="font-bold md:text-[15px] text-[#00a0ef]">{title}</h3>
//       <ChevronDown className={`w-5 h-5 text-[#00a0ef] transition-transform ${activeSection === id ? 'rotate-180' : ''}`} />
//     </div>
//   );

//   return (
//     <div className="bg-white border border-gray-200 md:rounded-xl overflow-hidden shadow-sm divide-y divide-gray-100">
      
//       <div>
//         {renderSectionHeader('Building Details (Per Floor)', 'floors')}
//         {activeSection === 'floors' && (
//           <div className="p-4 md:p-6 bg-blue-50/10">
//             <div className="mb-6">
//               <label className={labelStyles}>Select or Add Floor Details</label>
//               <RadioGroup options={['basement', 'stilt', 'GF', 'FF', 'SF', 'TF', '4th', 'multistorey']} value="" onChange={v => handleAddFloor(v)} />
//             </div>

//             {formData.floors.length > 0 && (
//               <div className="flex flex-col md:flex-row gap-4">
//                 <div className="md:w-48 shrink-0 flex flex-col gap-2">
//                   {formData.floors.map(f => (
//                     <div key={f.id} className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${activeFloorId === f.id ? 'bg-[#00a0ef] border-[#00a0ef] text-white shadow-md' : 'bg-white border-gray-200 text-gray-700 hover:border-gray-300'}`} onClick={() => setActiveFloorId(f.id)}>
//                       <span className="font-semibold text-[13px]">{f.floorName}</span>
//                       <button type="button" onClick={(e) => { e.stopPropagation(); removeFloor(f.id); }} className={`p-1 rounded hover:bg-black/10 ${activeFloorId === f.id ? 'text-white' : 'text-gray-400 hover:text-red-500'}`}><Trash2 size={14} /></button>
//                     </div>
//                   ))}
//                 </div>
                
//                 <div className="flex-1 bg-white p-4 md:p-6 rounded-xl border border-gray-200 shadow-sm">
//                   {formData.floors.filter(f => f.id === activeFloorId).map(activeFloor => (
//                     <div key={activeFloor.id} className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                       <div className="md:col-span-2 pb-3 border-b border-gray-100 mb-2">
//                         <h4 className="font-bold text-[#00a0ef] text-[15px]">{activeFloor.floorName} Details</h4>
//                       </div>

//                       <div className="md:col-span-2"><label className={labelStyles}>Possession With</label><RadioGroup options={['owner', 'tenant']} value={activeFloor.possessionWith} onChange={v => updateFloor(activeFloor.id, 'possessionWith', v)} /></div>

//                       <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4">
//                         <div><label className={labelStyles}>Unit</label><RadioGroup options={['feet', 'inch', 'meter']} value={activeFloor.unit} onChange={v => updateFloor(activeFloor.id, 'unit', v)} /></div>
//                         <div><label className={labelStyles}>Length</label><input type="number" className={inputStyles} value={activeFloor.length} onChange={e => updateFloor(activeFloor.id, 'length', e.target.value)} /></div>
//                         <div><label className={labelStyles}>Breadth</label><input type="number" className={inputStyles} value={activeFloor.breadth} onChange={e => updateFloor(activeFloor.id, 'breadth', e.target.value)} /></div>
//                         <div className="md:col-span-3 border-t border-gray-50 pt-4"><label className={labelStyles}>Conversion Unit</label><RadioGroup options={['sq ft', 'sq yd', 'sq mt', 'Acre', 'Hectare', 'Guntas']} value={activeFloor.conversionUnit} onChange={v => updateFloor(activeFloor.id, 'conversionUnit', v)} /></div>
//                         <div className="md:col-span-3"><label className={labelStyles}>Covered Area</label><input type="text" className={`${inputStyles} bg-gray-50`} readOnly value={activeFloor.coveredArea} /></div>
//                       </div>

//                       <div className="md:col-span-2"><label className={labelStyles}>Condition</label><RadioGroup options={['excellent', 'good', 'avg', 'poor', 'under construction', 'under finishing', 'others']} value={activeFloor.condition} onChange={v => updateFloor(activeFloor.id, 'condition', v)} /></div>
//                       <div className="md:col-span-2"><label className={labelStyles}>Structure</label><RadioGroup options={['Rcc framed', 'load bearing', 'composite Structure', 'Peb/shed']} value={activeFloor.structure} onChange={v => updateFloor(activeFloor.id, 'structure', v)} /></div>
//                       <div className="md:col-span-2"><label className={labelStyles}>Flooring</label><RadioGroup options={['tiles', 'marble', 'wood', 'cement', 'pending', 'other']} value={activeFloor.flooring} onChange={v => updateFloor(activeFloor.id, 'flooring', v)} /></div>
//                       <div className="md:col-span-2"><label className={labelStyles}>Accommodation</label><RadioGroup options={['storage', 'shop', 'office space', '1BHK', '1.5BHK', '2BHK', '2.5BHK', '3BHK', '3.5BHK', '4BHK', '4.5BHK', '5BHK', '5.5BHK', '6BHK', 'studio', 'penthouse']} value={activeFloor.accommodation} onChange={v => updateFloor(activeFloor.id, 'accommodation', v)} /></div>
//                       <div className="md:col-span-2"><label className={labelStyles}>Doors / Windows</label><RadioGroup options={['wooden', 'aluminium', 'glass', 'upvc', 'pending', 'N/A']} value={activeFloor.doorsWindows} onChange={v => updateFloor(activeFloor.id, 'doorsWindows', v)} /></div>
//                       <div className="md:col-span-2"><label className={labelStyles}>Floor Remarks</label><textarea rows={3} className={inputStyles} value={activeFloor.floorRemarks} onChange={e => updateFloor(activeFloor.id, 'floorRemarks', e.target.value)}></textarea></div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
            
//             <NextSectionButton onClick={() => setActiveSection('market')} nextFocusId="market-first" />
//           </div>
//         )}
//       </div>

//       <div>
//         {renderSectionHeader('Building-Shared / Market', 'market')}
//         {activeSection === 'market' && (
//           <div className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-2 gap-6 bg-blue-50/10">
//             <div><label className={labelStyles} id="market-first">Year of Construction</label><input type="text" className={inputStyles} value={formData.market.yearOfConstruction} onChange={e => updateMarket('yearOfConstruction', e.target.value)} /></div>
//             <div><label className={labelStyles}>Renovation</label><RadioGroup options={['yes', 'no']} value={formData.market.renovation} onChange={v => updateMarket('renovation', v)} /></div>
//             <div className="md:col-span-2"><label className={labelStyles}>Parking</label><RadioGroup options={['covered', 'notpresent', 'open', 'N/A']} value={formData.market.parking} onChange={v => updateMarket('parking', v)} /></div>
//             <div className="md:col-span-2"><label className={labelStyles}>Lift</label><RadioGroup options={['yes', 'No', 'N/A']} value={formData.market.lift} onChange={v => updateMarket('lift', v)} /></div>
//             <div className="md:col-span-2"><label className={labelStyles}>Kitchen Type</label><RadioGroup options={['modular', 'semi modular', 'odinary', 'N/A', 'other']} value={formData.market.kitchenType} onChange={v => updateMarket('kitchenType', v)} /></div>

//             <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4 bg-white p-4 rounded-xl border border-gray-200">
//               <div className="md:col-span-3 border-b border-gray-100 pb-2 mb-2"><h4 className="text-[13px] font-bold text-[#00a0ef]">Rental Income</h4></div>
//               <div><label className={labelStyles}>Minimum</label><input type="number" className={inputStyles} value={formData.market.rentalMin} onChange={e => updateMarket('rentalMin', e.target.value)} /></div>
//               <div><label className={labelStyles}>Maximum</label><input type="number" className={inputStyles} value={formData.market.rentalMax} onChange={e => updateMarket('rentalMax', e.target.value)} /></div>
//               <div><label className={labelStyles}>Unit</label><RadioGroup options={['hundred', 'thousand', 'lakh', 'crore']} value={formData.market.rentalUnit} onChange={v => updateMarket('rentalUnit', v)} /></div>
//             </div>

//             {['Client', 'Dealer', 'Market'].map((type) => {
//               const minField = `market${type}Min` as keyof AppState['market'];
//               const maxField = `market${type}Max` as keyof AppState['market'];
//               const unitField = `market${type}Unit` as keyof AppState['market'];
//               return (
//                 <div key={type} className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4 bg-white p-4 rounded-xl border border-gray-200">
//                   <div className="md:col-span-3 border-b border-gray-100 pb-2 mb-2"><h4 className="text-[13px] font-bold text-[#00a0ef]">Market Rate ({type === 'Market' ? 'As per market' : type})</h4></div>
//                   <div><label className={labelStyles}>Minimum</label><input type="number" className={inputStyles} value={formData.market[minField] as string} onChange={e => updateMarket(minField, e.target.value)} /></div>
//                   <div><label className={labelStyles}>Maximum</label><input type="number" className={inputStyles} value={formData.market[maxField] as string} onChange={e => updateMarket(maxField, e.target.value)} /></div>
//                   <div><label className={labelStyles}>Unit</label><RadioGroup options={['hundred', 'thousand', 'lakh', 'crore']} value={formData.market[unitField] as string} onChange={v => updateMarket(unitField, v)} /></div>
//                 </div>
//               );
//             })}

//             <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-4 rounded-xl border border-gray-200">
//               <div className="md:col-span-2 border-b border-gray-100 pb-2 mb-2"><h4 className="text-[13px] font-bold text-[#00a0ef]">Dealer Details</h4></div>
//               <div><label className={labelStyles}>Dealer Name</label><input type="text" className={inputStyles} value={formData.market.dealerName} onChange={e => updateMarket('dealerName', e.target.value)} /></div>
//               <div><label className={labelStyles}>Mobile Number</label><input type="tel" className={inputStyles} value={formData.market.dealerMobile} onChange={e => updateMarket('dealerMobile', e.target.value)} /></div>
//             </div>

//             <div className="md:col-span-2 bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
//               <div className="flex items-center justify-between mb-3">
//                 <label className={labelStyles}>Additional Details</label>
//                 <button type="button" onClick={() => updateMarket('additionalDetails', [...formData.market.additionalDetails, { key: '', value: '' }])} className="text-[13px] font-semibold text-[#00a0ef] hover:underline flex items-center gap-1"><Plus size={14} /> Add Detail</button>
//               </div>
//               <div className="space-y-3">
//                 {formData.market.additionalDetails.map((pair, idx) => (
//                   <div key={idx} className="flex gap-3">
//                     <input type="text" placeholder="Key" className={inputStyles} value={pair.key} onChange={e => {
//                       const newArr = [...formData.market.additionalDetails];
//                       newArr[idx].key = e.target.value;
//                       updateMarket('additionalDetails', newArr);
//                     }} />
//                     <input type="text" placeholder="Value" className={inputStyles} value={pair.value} onChange={e => {
//                       const newArr = [...formData.market.additionalDetails];
//                       newArr[idx].value = e.target.value;
//                       updateMarket('additionalDetails', newArr);
//                     }} />
//                     <button type="button" onClick={() => {
//                       const newArr = formData.market.additionalDetails.filter((_, i) => i !== idx);
//                       updateMarket('additionalDetails', newArr);
//                     }} className="px-3 py-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"><Trash2 size={18} /></button>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// function Step3Form({ formData, setFormData }: { formData: AppState; setFormData: (val: any) => void }) {
//   const photoInputRef = useRef<HTMLInputElement>(null);
//   const docInputRef = useRef<HTMLInputElement>(null);

//   const handleFileUpload = (type: 'photos' | 'documents', e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) {
//       setFormData((prev: AppState) => ({ ...prev, uploads: { ...prev.uploads, [type]: [...prev.uploads[type], ...Array.from(e.target.files!)] } }));
//     }
//   };

//   const removeFile = (type: 'photos' | 'documents', idx: number) => {
//     setFormData((prev: AppState) => ({ ...prev, uploads: { ...prev.uploads, [type]: prev.uploads[type].filter((_, i) => i !== idx) } }));
//   };

//   return (
//     <div className="bg-white border border-gray-200 md:rounded-xl overflow-hidden shadow-sm p-4 md:p-6 space-y-8">
//       <div>
//         <h3 className="font-bold md:text-[16px] text-[#00a0ef] mb-4">Site Photos</h3>
//         <div onClick={() => photoInputRef.current?.click()} className="border-2 border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition cursor-pointer">
//           <input type="file" multiple accept="image/*" className="hidden" ref={photoInputRef} onChange={(e) => handleFileUpload('photos', e)} />
//           <UploadCloud className="w-8 h-8 text-gray-400 mb-2" />
//           <p className="text-sm text-gray-600 text-center">Click to <span className="text-[#00a0ef] font-medium">browse photos</span></p>
//         </div>
//         {formData.uploads.photos.length > 0 && (
//           <div className="grid grid-cols-3 md:grid-cols-5 gap-3 mt-4">
//             {formData.uploads.photos.map((file, idx) => (
//               <div key={idx} className="relative aspect-square rounded-lg border border-gray-200 overflow-hidden bg-gray-50 flex items-center justify-center group">
//                 <img src={URL.createObjectURL(file)} alt="Preview" className="w-full h-full object-cover transition-opacity group-hover:opacity-75" />
//                 <button type="button" onClick={(e) => { e.stopPropagation(); removeFile('photos', idx); }} className="absolute top-1 right-1 bg-white/90 rounded-full p-1 shadow-md opacity-0 group-hover:opacity-100 transition-all hover:bg-red-50 text-red-500"><X size={14} /></button>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       <div className="border-t border-gray-100 pt-8">
//         <h3 className="font-bold md:text-[16px] text-[#00a0ef] mb-4">Documents</h3>
//         <div onClick={() => docInputRef.current?.click()} className="border-2 border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition cursor-pointer">
//           <input type="file" multiple className="hidden" ref={docInputRef} onChange={(e) => handleFileUpload('documents', e)} />
//           <FileText className="w-8 h-8 text-gray-400 mb-2" />
//           <p className="text-sm text-gray-600 text-center">Click to <span className="text-[#00a0ef] font-medium">browse documents</span></p>
//         </div>
//         {formData.uploads.documents.length > 0 && (
//           <div className="space-y-3 mt-4">
//             {formData.uploads.documents.map((file, idx) => (
//               <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 border border-gray-100 rounded-xl">
//                 <div className="flex items-center gap-3"><div className="w-10 h-10 bg-[#e6f5fd] rounded-lg flex items-center justify-center text-[#00a0ef]"><FileText className="w-5 h-5" /></div><div><p className="text-[13px] font-medium text-gray-900 line-clamp-1">{file.name}</p><p className="text-xs text-gray-500">{(file.size / (1024 * 1024)).toFixed(1)} MB</p></div></div>
//                 <button type="button" onClick={() => removeFile('documents', idx)} className="text-[13px] text-red-500 font-medium px-2 py-1">Remove</button>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// function Step4Form({ formData, onEditStep, isConfirmed, setIsConfirmed }: { formData: AppState; onEditStep: (step: number) => void; isConfirmed: boolean; setIsConfirmed: (v: boolean) => void }) {
//   const MainCategory = ({ title, icon: Icon, children }: any) => (
//     <div className="mb-8 px-1"><div className="flex items-center gap-2 mb-4"><div className="w-5 h-5 flex items-center justify-center text-[#00a0ef]"><Icon className="w-5 h-5 fill-current opacity-20" strokeWidth={2} /></div><h3 className="text-[15px] font-bold text-gray-900">{title}</h3></div><div className="bg-white px-2">{children}</div></div>
//   );
//   const SubCategory = ({ title, stepNum, children }: any) => (
//     <div className="py-4 border-b border-gray-200 last:border-0 first:pt-0"><div className="flex items-center justify-between mb-4"><h4 className="text-[13px] font-bold text-gray-800">{title}</h4><button type="button" onClick={() => onEditStep(stepNum)} className="text-[#00a0ef] hover:bg-blue-50 p-1.5 rounded transition-colors"><Edit2 className="w-3.5 h-3.5" /></button></div><div className="grid grid-cols-2 gap-y-4 gap-x-4">{children}</div></div>
//   );
//   const DataField = ({ label, value }: any) => (
//     <div><p className="text-[11px] text-gray-500 font-medium mb-1">{label}</p><div className="text-[13px] font-medium text-gray-900 break-words">{value || '—'}</div></div>
//   );

//   return (
//     <div className="max-w-3xl bg-white mx-auto md:px-4 pb-8">
//       <div className="py-6 px-2"><h2 className="text-[18px] font-bold text-[#00a0ef]">Review & Submit</h2></div>

//       <MainCategory title="Client, Owner & Property" icon={Landmark}>
//         <SubCategory title="Bank Details" stepNum={1}>
//           <DataField label="IFSC Code" value={formData.clientBank.ifsc} />
//           <DataField label="Bank Name" value={formData.clientBank.bankName} />
//           <DataField label="Branch" value={formData.clientBank.branch} />
//           <DataField label="Email" value={formData.clientBank.email} />
//           <DataField label="POC" value={`${formData.clientBank.contactPersonName} / ${formData.clientBank.contactPersonNumber}`} />
//           <DataField label="Dates" value={`${formData.clientBank.dateOfInspection} / ${formData.clientBank.dateOfValuation}`} />
//           <DataField label="Type of Property" value={formData.clientBank.propertyType} />
//           <DataField label="Purpose" value={formData.clientBank.purposeOfValuation} />
//         </SubCategory>
//         <SubCategory title="Owner Details & Locality" stepNum={1}>
//           <DataField label="Name" value={`${formData.owner.prefix} ${formData.owner.ownerName}`} />
//           <DataField label="Relation" value={`${formData.owner.relation} ${formData.owner.relationName}`} />
//           <DataField label="Phone" value={`${formData.owner.phone1} / ${formData.owner.phone2}`} />
//           <DataField label="Urban/Rural" value={formData.locality.urbanRural} />
//           <DataField label="Class" value={formData.locality.localityClass} />
//           <DataField label="Tenure" value={formData.locality.landTenure} />
//         </SubCategory>
//         <SubCategory title="Property Settings" stepNum={1}>
//           <DataField label="Address" value={formData.property.address} />
//           <DataField label="Nature" value={formData.property.natureOfProperty} />
//           <DataField label="Shape" value={formData.property.plotShape} />
//           <DataField label="Calculated Area" value={`${formData.property.calculatedArea} ${formData.property.conversionUnit}`} />
//           <DataField label="Wall Setup" value={`${formData.property.wallLength}x${formData.property.wallHeight} ${formData.property.wallUnit}`} />
//           <DataField label="Negative Points" value={formData.negativePoints.join(', ')} />
//         </SubCategory>
//         <SubCategory title="Boundaries" stepNum={1}>
//           <DataField label="Unit" value={formData.boundaries.unit} />
//           <DataField label="North (Doc/Act)" value={`${formData.boundaries.northDoc} / ${formData.boundaries.northAct}`} />
//           <DataField label="South (Doc/Act)" value={`${formData.boundaries.southDoc} / ${formData.boundaries.southAct}`} />
//           <DataField label="East (Doc/Act)" value={`${formData.boundaries.eastDoc} / ${formData.boundaries.eastAct}`} />
//           <DataField label="West (Doc/Act)" value={`${formData.boundaries.westDoc} / ${formData.boundaries.westAct}`} />
//         </SubCategory>
//       </MainCategory>

//       <MainCategory title="Building & Market Details" icon={Building}>
//         {formData.floors.map((floor) => (
//           <SubCategory key={floor.id} title={`Floor: ${floor.floorName}`} stepNum={2}>
//             <DataField label="Possession" value={floor.possessionWith} />
//             <DataField label="Covered Area" value={`${floor.coveredArea} ${floor.conversionUnit}`} />
//             <DataField label="Condition" value={floor.condition} />
//             <DataField label="Structure" value={floor.structure} />
//             <DataField label="Flooring" value={floor.flooring} />
//             <DataField label="Accommodation" value={floor.accommodation} />
//             <DataField label="Doors/Windows" value={floor.doorsWindows} />
//             <DataField label="Remarks" value={floor.floorRemarks} />
//           </SubCategory>
//         ))}
//         <SubCategory title="Market & Shared Details" stepNum={2}>
//           <DataField label="Year Constructed" value={formData.market.yearOfConstruction} />
//           <DataField label="Renovation" value={formData.market.renovation} />
//           <DataField label="Parking" value={formData.market.parking} />
//           <DataField label="Rental Income" value={`${formData.market.rentalMin} - ${formData.market.rentalMax} ${formData.market.rentalUnit}`} />
//           <DataField label="Client Rate" value={`${formData.market.marketClientMin} - ${formData.market.marketClientMax} ${formData.market.marketClientUnit}`} />
//           <DataField label="Dealer Rate" value={`${formData.market.marketDealerMin} - ${formData.market.marketDealerMax} ${formData.market.marketDealerUnit}`} />
//           <DataField label="Market Rate" value={`${formData.market.marketMarketMin} - ${formData.market.marketMarketMax} ${formData.market.marketMarketUnit}`} />
//           <DataField label="Dealer Details" value={`${formData.market.dealerName} / ${formData.market.dealerMobile}`} />
//         </SubCategory>
//       </MainCategory>

//       <MainCategory title="Uploads" icon={UploadCloud}>
//         <SubCategory title="Files Overview" stepNum={3}>
//           <DataField label="Photos" value={`${formData.uploads.photos.length} uploaded`} />
//           <DataField label="Documents" value={`${formData.uploads.documents.length} uploaded`} />
//         </SubCategory>
//       </MainCategory>

//       <div className="mt-8 p-4 bg-[#f8fafc] border border-gray-200 rounded-xl flex items-start gap-3">
//         <div className="pt-0.5"><input type="checkbox" id="final-confirm" checked={isConfirmed} onChange={(e) => setIsConfirmed(e.target.checked)} className="w-4 h-4 text-[#00a0ef] border-gray-300 rounded focus:ring-[#00a0ef]" /></div>
//         <label htmlFor="final-confirm" className="text-[13px] text-gray-700 leading-relaxed select-none cursor-pointer">I confirm that all information provided above is correct.</label>
//       </div>
//     </div>
//   );
// }

// export default function App() {
//   const [currentStep, setCurrentStep] = useState(1);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [isConfirmed, setIsConfirmed] = useState(false);
//   const [isSubmittedSuccessfully, setIsSubmittedSuccessfully] = useState(false);

//   const [customers, setCustomers] = useState<any[]>([]);
//   const [isLoadingCustomers, setIsLoadingCustomers] = useState(true);

//   const [formData, setFormData] = useState<AppState>({
//     customer: '',
//     clientBank: { ifsc: '', bankName: '', branch: '', email: '', contactPersonName: '', contactPersonNumber: '', dateOfInspection: '', dateOfValuation: '', propertyType: '', purposeOfValuation: '' },
//     owner: { prefix: 'Shri', ownerName: '', relation: 'S/o', relationName: '', occupation: '', phone1: '', phone2: '' },
//     locality: { urbanRural: '', localityClass: '', landTenure: '', widthOfRoad: '', noOfStories: '', sanitaryFitting: '', electricalFitting: '', townplan: '' },
//     property: { address: '', natureOfProperty: '', vacantPlot: '', widthOfRoad: '', latitude: '', longitude: '', boundaryCoordinates: [], plotShape: '', dimensionUnit: '', length: '', breadth: '', conversionUnit: '', calculatedArea: '', wallUnit: '', wallLength: '', wallHeight: '', wallsOnSide: '', brickType: '' },
//     boundaries: { unit: '', northDoc: '', northAct: '', southDoc: '', southAct: '', eastDoc: '', eastAct: '', westDoc: '', westAct: '' },
//     floors: [],
//     market: { yearOfConstruction: '', renovation: '', parking: '', lift: '', rentalMin: '', rentalMax: '', rentalUnit: '', kitchenType: '', marketClientMin: '', marketClientMax: '', marketClientUnit: '', marketDealerMin: '', marketDealerMax: '', marketDealerUnit: '', marketMarketMin: '', marketMarketMax: '', marketMarketUnit: '', dealerName: '', dealerMobile: '', additionalDetails: [] },
//     negativePoints: [],
//     uploads: { photos: [], documents: [] }
//   });

//   useEffect(() => {
//     const fetchCustomers = async () => {
//       try {
//         const data = await api.getCustomerProfiles();
//         setCustomers(data);
//       } catch (error) {
//         console.error("Failed to fetch customers:", error);
//       } finally {
//         setIsLoadingCustomers(false);
//       }
//     };
//     fetchCustomers();
//   }, []);

//   const handleCustomerSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     const selectedId = e.target.value;
//     const selectedCustomer = customers.find(c => c.id === selectedId);

//     if (selectedCustomer) {
//       setFormData(prev => ({
//         ...prev,
//         customer: selectedId,
//         clientBank: { ...prev.clientBank, ...selectedCustomer.clientBank },
//         owner: { ...prev.owner, ...selectedCustomer.owner }
//       }));
//     } else {
//       setFormData(prev => ({ ...prev, customer: '' }));
//     }
//   };

//   const handleStepContinue = () => {
//     if (currentStep < 4) { setCurrentStep(prev => prev + 1); window.scrollTo({ top: 0, behavior: 'smooth' }); }
//     else { handleSubmit(); }
//   };

//   const handleStepBack = () => {
//     if (currentStep > 1) { setCurrentStep(prev => prev - 1); window.scrollTo({ top: 0, behavior: 'smooth' }); }
//   };

//   const handleSubmit = async () => {
//     if (!isConfirmed) { alert('Please check the confirmation box to submit.'); return; }
//     setIsSubmitting(true);
    
//     try {
//       const uploadedPhotosUrls = formData.uploads.photos.map(file => `https://your-storage-bucket.com/${file.name}`);
//       const uploadedDocumentsUrls = formData.uploads.documents.map(file => `https://your-storage-bucket.com/${file.name}`);

//       const payload = {
//         customer: formData.customer,
//         clientBank: formData.clientBank,
//         owner: formData.owner,
//         locality: formData.locality,
//         property: formData.property,
//         boundaries: formData.boundaries,
//         floors: formData.floors,
//         market: formData.market,
//         negativePoints: formData.negativePoints,
//         uploads: { 
//           photos: uploadedPhotosUrls, 
//           documents: uploadedDocumentsUrls 
//         }
//       };

//       await api.createValuationRecord(payload);
//       setIsSubmittedSuccessfully(true);

//     } catch (e) { 
//       console.error("Failed to submit report:", e); 
//       alert("An error occurred while submitting the report.");
//     } finally { 
//       setIsSubmitting(false); 
//     }
//   };

//   if (isSubmittedSuccessfully) {
//     return (
//       <div className="flex flex-col flex-1 w-full relative min-h-screen md:min-h-0 bg-white overflow-hidden items-center justify-center p-6">
//         <div className="w-[88px] h-[88px] rounded-full flex items-center justify-center bg-[#f0f8fd] mb-6">
//           <div className="w-[60px] h-[60px] rounded-full bg-white flex items-center justify-center shadow-sm">
//             <div className="w-[32px] h-[32px] bg-[#00a0ef] rounded-full flex items-center justify-center"><Check className="w-4 h-4 text-white" strokeWidth={3.5} /></div>
//           </div>
//         </div>
//         <h2 className="text-[20px] lg:text-[24px] font-bold text-gray-900 mb-3 text-center">Report submitted successfully.</h2>
//         <p className="text-[#8A94A6] text-[14px] md:text-[15px] mb-8 text-center max-w-sm">Data has been logged to the console.</p>
//         <button onClick={() => window.location.reload()} className="px-8 py-3 bg-[#00a0ef] hover:bg-[#008bd1] rounded-lg text-white font-medium transition-colors">Start New Report</button>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 flex flex-col md:py-8">
//       <div className="flex-1 flex flex-col w-full md:max-w-4xl md:mx-auto bg-white border-x md:border border-gray-200 md:rounded-xl md:shadow-sm overflow-hidden">
        
//         <div className="px-4 md:px-6 py-4 border-b border-gray-200 bg-white flex flex-col md:flex-row md:items-center justify-between gap-4">
//           <h1 className="text-lg md:text-xl font-medium text-gray-900">Submit New Report</h1>
//           <div className="relative w-full md:w-64">
//             <select 
//               className={`${inputStyles} appearance-none bg-blue-50/30 border-[#00a0ef]/30 font-medium disabled:opacity-50 disabled:cursor-not-allowed`} 
//               value={formData.customer} 
//               onChange={handleCustomerSelect}
//               disabled={isLoadingCustomers}
//             >
//               <option value="">
//                 {isLoadingCustomers ? 'Loading Customers...' : 'Select Customer (Prefill)...'}
//               </option>
              
//               {customers.map((c) => (
//                 <option key={c.id} value={c.id}>
//                   {c.profileReference || `${c.owner?.ownerName || 'Unknown'} - ${c.clientBank?.bankName || 'Unknown Bank'}`}
//                 </option>
//               ))}
//             </select>
//             <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
//           </div>
//         </div>

//         <div className="px-6 pt-10 pb-6 md:pt-12 md:pb-8 border-b border-gray-200 bg-white shrink-0">
//           <div className="max-w-xl mx-auto relative">
//             <div className="flex items-center justify-between relative">
//               <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[2px] bg-gray-200" />
//               {[1, 2, 3, 4].map((step) => {
//                 const isCompleted = step < currentStep;
//                 const isCurrent = step === currentStep;
//                 return (
//                   <div key={step} className="relative z-10 flex flex-col items-center">
//                     <span className={`absolute -top-7 whitespace-nowrap text-xs font-semibold tracking-wide ${isCompleted || isCurrent ? 'text-[#00a0ef]' : 'text-gray-400'}`}>STEP {step}</span>
//                     <div className={`w-8 h-8 rounded-full flex items-center justify-center bg-white ${isCompleted ? 'border-2 border-[#00a0ef] bg-[#00a0ef]' : isCurrent ? 'border-2 border-[#00a0ef]' : 'border-2 border-gray-300'}`}>
//                       {isCompleted && <CircleCheck color='white' fill='#00a0ef' />}
//                       {isCurrent && <div className="w-4 h-4 bg-[#00a0ef] rounded-full" />}
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         </div>

//         <div className="flex-1 overflow-y-auto bg-gray-50 md:p-6">
//           {currentStep === 1 && <Step1Form formData={formData} setFormData={setFormData} />}
//           {currentStep === 2 && <Step2Form formData={formData} setFormData={setFormData} />}
//           {currentStep === 3 && <Step3Form formData={formData} setFormData={setFormData} />}
//           {currentStep === 4 && <Step4Form formData={formData} onEditStep={setCurrentStep} isConfirmed={isConfirmed} setIsConfirmed={setIsConfirmed} />}
//         </div>
        
//         <div className="p-4 md:px-6 md:py-5 bg-white border-t border-gray-200 flex items-center justify-between mt-auto shrink-0">
//           <button onClick={handleStepBack} className={`flex items-center px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 text-[13px] font-medium hover:bg-gray-50 transition-colors ${currentStep === 1 ? 'invisible' : ''}`}>
//             <ArrowLeft className="w-4 h-4 mr-2" /> Back
//           </button>
//           <button onClick={handleStepContinue} disabled={isSubmitting} className="flex items-center px-6 py-2.5 bg-[#00a0ef] hover:bg-[#008bd1] rounded-lg text-white text-[13px] font-medium transition-shadow shadow-sm hover:shadow-md disabled:opacity-60">
//             {isSubmitting ? 'Submitting...' : currentStep === 4 ? 'Submit Report' : `Continue to Step ${currentStep + 1}`}
//             {!isSubmitting && currentStep !== 4 && <ArrowRight className="w-4 h-4 ml-2" />}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// // }
// 'use client';

// import React, { useState, useEffect, useCallback, useRef } from 'react';
// import { Building, Landmark, CheckCircle2, UploadCloud, X, FileText, Edit2, CircleCheck, Plus, Trash2, Check, RotateCcw, ArrowLeft, ArrowRight, ChevronDown } from 'lucide-react';
// import { APIProvider, Map, AdvancedMarker, useMap } from "@vis.gl/react-google-maps";
// import { api } from '@/app/lib/userApis';
// import { uploadFile } from "@/app/lib/firebase/storageUtils"; // <-- Added Storage Import

// type Coord = { lat: number; lng: number };
// type Pin = { id: number; coord: Coord };
// type Mode = "picking" | "submitted";

// const MAX = 10;
// const LABELS = ["P1", "P2", "P3", "P4", "P5", "P6", "P7", "P8", "P9", "P10"];
// const COLORS = ["#00a0ef", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899", "#06b6d4", "#14b8a6", "#f97316", "#6366f1"];

// export interface FloorDetail {
//   id: string;
//   floorName: string;
//   possessionWith: string;
//   unit: string;
//   length: string;
//   breadth: string;
//   conversionUnit: string;
//   coveredArea: string;
//   condition: string;
//   structure: string;
//   flooring: string;
//   accommodation: string;
//   doorsWindows: string;
//   floorRemarks: string;
// }

// interface AppState {
//   customer: string;
//   clientBank: { ifsc: string; bankName: string; branch: string; email: string; contactPersonName: string; contactPersonNumber: string; dateOfInspection: string; dateOfValuation: string; propertyType: string; purposeOfValuation: string; };
//   owner: { prefix: string; ownerName: string; relation: string; relationName: string; occupation: string; phone1: string; phone2: string; };
//   locality: { urbanRural: string; localityClass: string; landTenure: string; widthOfRoad: string; noOfStories: string; sanitaryFitting: string; electricalFitting: string; townplan: string; };
//   property: { address: string; natureOfProperty: string; vacantPlot: string; widthOfRoad: string; latitude: string; longitude: string; boundaryCoordinates: Coord[]; plotShape: string; dimensionUnit: string; length: string; breadth: string; conversionUnit: string; calculatedArea: string; wallUnit: string; wallLength: string; wallHeight: string; wallsOnSide: string; brickType: string; };
//   boundaries: { 
//     unit: string; northDoc: string; northAct: string; southDoc: string; southAct: string; eastDoc: string; eastAct: string; westDoc: string; westAct: string; 
//     dimensionsMatch: boolean; // <-- New checkbox state for dimensions
//   boundariesMatch: boolean; // <-- Checkbox state
//   northDeedDim: string; southDeedDim: string; eastDeedDim: string; westDeedDim: string; // <-- Updated Keys
//   northActualDim: string; southActualDim: string; eastActualDim: string; westActualDim: string; // <-- Updated Keys
//     northBoundaryDeed: string; southBoundaryDeed: string; eastBoundaryDeed: string; westBoundaryDeed: string; // <-- New textual boundaries
//     northBoundaryActual: string; southBoundaryActual: string; eastBoundaryActual: string; westBoundaryActual: string;
//   };
//   floors: FloorDetail[];
//   market: { yearOfConstruction: string; renovation: string; parking: string; lift: string; rentalMin: string; rentalMax: string; rentalUnit: string; kitchenType: string; marketClientMin: string; marketClientMax: string; marketClientUnit: string; marketDealerMin: string; marketDealerMax: string; marketDealerUnit: string; marketMarketMin: string; marketMarketMax: string; marketMarketUnit: string; dealerName: string; dealerMobile: string; additionalDetails: { key: string; value: string }[]; };
//   negativePoints: string[];
//   uploads: { photos: File[]; documents: File[]; };
// }

// const inputStyles = "w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-[#00a0ef] focus:ring-1 focus:ring-[#00a0ef] text-[13px] text-gray-900 bg-white shadow-sm transition-shadow";
// const labelStyles = "block text-[13px] font-semibold text-gray-700 mb-2";

// const RadioGroup = ({ options, value, onChange }: { options: string[], value: string, onChange: (val: string) => void }) => {
//   const isCustom = value !== '' && !options.includes(value);
//   const [showCustom, setShowCustom] = useState(isCustom);

//   return (
//     <div className="flex flex-wrap gap-2 items-center">
//       {options.map(opt => (
//         <button key={opt} type="button" onClick={() => { setShowCustom(false); onChange(opt); }}
//           className={`px-3 py-2 rounded-lg text-[13px] font-medium transition-all border ${!showCustom && value === opt ? 'bg-blue-50 border-[#00a0ef] text-[#00a0ef] shadow-sm' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'}`}>
//           {opt}
//         </button>
//       ))}
//       <div className="flex items-center gap-2">
//         {!showCustom && (
//           <button type="button" onClick={() => { setShowCustom(true); onChange(''); }}
//             className={`px-3 py-2 rounded-lg text-[13px] font-medium transition-all border bg-white border-gray-200 text-gray-600 hover:bg-gray-50`}>
//             Other / Add Option
//           </button>
//         )}
//         {showCustom && (
//           <div className="flex items-center gap-1 bg-white border border-gray-300 rounded-lg pr-1 shadow-sm focus-within:border-[#00a0ef] focus-within:ring-1 focus-within:ring-[#00a0ef]">
//             <input type="text" placeholder="Type custom option..." className="px-3 py-2 text-[13px] rounded-l-lg focus:outline-none border-none w-40" value={value} onChange={e => onChange(e.target.value)} autoFocus />
//             <button type="button" onClick={() => { setShowCustom(false); onChange(''); }} className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors">
//               <X size={14} />
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// const MultiSelectGroup = ({ options, selected, onChange }: { options: string[], selected: string[], onChange: (val: string[]) => void }) => {
//   const toggle = (opt: string) => selected.includes(opt) ? onChange(selected.filter(i => i !== opt)) : onChange([...selected, opt]);
//   const customValues = selected.filter(val => !options.includes(val));
//   const [customInput, setCustomInput] = useState('');

//   const handleAddCustom = () => {
//     if (customInput.trim() && !selected.includes(customInput.trim())) {
//       onChange([...selected, customInput.trim()]);
//       setCustomInput('');
//     }
//   };

//   return (
//     <div className="flex flex-col gap-3">
//       <div className="flex flex-wrap gap-2">
//         {options.map(opt => (
//           <button key={opt} type="button" onClick={() => toggle(opt)}
//             className={`px-3 py-2 rounded-lg text-[13px] font-medium transition-all border ${selected.includes(opt) ? 'bg-blue-50 border-[#00a0ef] text-[#00a0ef] shadow-sm' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'}`}>
//             {opt}
//           </button>
//         ))}
//         {customValues.map(opt => (
//           <button key={opt} type="button" onClick={() => toggle(opt)}
//             className="px-3 py-2 rounded-lg text-[13px] font-medium transition-all border bg-blue-50 border-[#00a0ef] text-[#00a0ef] shadow-sm flex items-center gap-2">
//             {opt} <X className="w-3 h-3" />
//           </button>
//         ))}
//       </div>
//       <div className="flex items-center gap-2">
//         <input type="text" placeholder="Add custom option..." className="px-3 py-2 text-[13px] border border-gray-300 rounded-lg focus:outline-none focus:border-[#00a0ef] w-48 shadow-sm" value={customInput} onChange={e => setCustomInput(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddCustom(); } }} />
//         <button type="button" onClick={handleAddCustom} className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-[13px] font-medium hover:bg-gray-200 transition-colors">Add</button>
//       </div>
//     </div>
//   );
// };

// function NextSectionButton({ onClick, nextFocusId }: { onClick: () => void, nextFocusId: string }) {
//   const handleAction = (e: React.MouseEvent | React.KeyboardEvent) => {
//     e.preventDefault();
//     onClick();
//     setTimeout(() => document.getElementById(nextFocusId)?.focus(), 50);
//   };
//   return (
//     <div className="md:col-span-full flex justify-end mt-4 border-t border-gray-200/50 pt-4">
//       <button type="button" onClick={handleAction} onKeyDown={(e) => { if (e.key === 'Tab' && !e.shiftKey) { handleAction(e); } }} className="text-[#00a0ef] text-[13px] font-bold hover:underline flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-[#00a0ef] focus:ring-offset-2 rounded px-3 py-1.5 transition-colors">
//         Next Section <ArrowRight className="w-4 h-4" />
//       </button>
//     </div>
//   );
// }

// function GeoCoordinatePicker({ onCoordinatesSubmit }: { onCoordinatesSubmit: (coords: Coord[]) => void }) {
//   const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "";
//   const [center, setCenter] = useState<Coord>({ lat: 20, lng: 78 });
//   const [zoom, setZoom] = useState(4);
//   const [mode, setMode] = useState<Mode>("picking");
//   const [pins, setPins] = useState<Pin[]>([]);
//   const [nextId, setNextId] = useState(0);
//   const [submitted, setSubmitted] = useState<Pin[]>([]);
//   const [editTarget, setEditTarget] = useState<number | null>(null);
//   const [userLocation, setUserLocation] = useState<Coord | null>(null);

//   useEffect(() => {
//     if ("geolocation" in navigator) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const userLoc = { lat: position.coords.latitude, lng: position.coords.longitude };
//           setUserLocation(userLoc); setCenter(userLoc); setZoom(18);
//         },
//         (error) => console.error("Error getting user location:", error),
//         { enableHighAccuracy: true }
//       );
//     }
//   }, []);

//   const handleMapClick = useCallback((coord: Coord) => {
//     if (mode === "picking") {
//       if (pins.length >= MAX) return;
//       setPins((prev) => [...prev, { id: nextId, coord }]);
//       setNextId((n) => n + 1); return;
//     }
//     if (mode === "submitted" && editTarget !== null) {
//       setSubmitted((prev) => prev.map((p, i) => (i === editTarget ? { ...p, coord } : p)));
//       setEditTarget(null);
//     }
//   }, [mode, pins.length, nextId, editTarget]);

//   const handleSubmit = () => {
//     if (pins.length === 0) return;
//     setSubmitted([...pins]); setMode("submitted"); setEditTarget(null);
//     onCoordinatesSubmit(pins.map(p => p.coord));
//   };

//   return (
//     <div className="flex flex-col w-full bg-white border border-gray-300 rounded-xl overflow-hidden shadow-sm">
//       <div className="relative w-full h-64 md:h-80 bg-gray-100">
//         <APIProvider apiKey={apiKey}>
//           <Map mapId="geo-picker-form" center={center} zoom={zoom} mapTypeId="satellite"
//             onCameraChanged={(ev) => { setCenter(ev.detail.center); setZoom(ev.detail.zoom); }}
//             gestureHandling="greedy" colorScheme="LIGHT" mapTypeControl={true} zoomControl={true} fullscreenControl={true} streetViewControl={true}
//             style={{ width: "100%", height: "100%" }}>
//             {userLocation && (
//               <AdvancedMarker position={userLocation}>
//                 <div className="relative"><div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-lg" /><div className="absolute inset-0 w-4 h-4 bg-blue-400 rounded-full animate-ping opacity-40" /></div>
//               </AdvancedMarker>
//             )}
//             <ClickHandler onClick={handleMapClick} />
//             {(mode === "picking" ? pins : submitted).map((pin, i) => (
//               <AdvancedMarker key={pin.id} position={pin.coord} zIndex={editTarget === i ? 100 : i}>
//                 <button type="button" onClick={(e) => { e.stopPropagation(); if (mode === "submitted") setEditTarget(editTarget === i ? null : i); }}
//                   className={`flex items-center justify-center rounded-full font-bold text-white text-xs shadow-md transition-all ${editTarget === i ? "w-10 h-10 ring-4 ring-white scale-110" : "w-8 h-8 ring-2 ring-white/80 scale-100"} ${mode === "submitted" ? "cursor-pointer" : "cursor-default"}`}
//                   style={{ backgroundColor: COLORS[i] }}>{LABELS[i]}</button>
//               </AdvancedMarker>
//             ))}
//           </Map>
//         </APIProvider>
//       </div>
//       <div className="p-4 bg-gray-50 border-t border-gray-200">
//         {mode === "picking" ? (
//           <button type="button" onClick={handleSubmit} disabled={pins.length === 0}
//             className={`w-full py-2.5 rounded-lg text-sm font-semibold transition-colors flex items-center justify-center gap-2 ${pins.length > 0 ? "bg-[#00a0ef] text-white hover:bg-[#008bd1] shadow-sm" : "bg-gray-200 text-gray-400 cursor-not-allowed"}`}>
//             {pins.length > 0 ? <><CheckCircle2 className="w-4 h-4" /> Confirm Boundaries</> : "Place at least 1 point"}
//           </button>
//         ) : (
//           <button type="button" onClick={() => { setPins([]); setSubmitted([]); setMode("picking"); setEditTarget(null); setNextId(0); }}
//             className="w-full py-2.5 rounded-lg text-sm font-semibold transition-colors flex items-center justify-center gap-2 bg-red-50 text-red-600 hover:bg-red-100">
//             <RotateCcw className="w-4 h-4" /> Reset Boundaries
//           </button>
//         )}
//       </div>
//     </div>
//   );
// }

// function ClickHandler({ onClick }: { onClick: (c: Coord) => void }) {
//   const map = useMap();
//   useEffect(() => {
//     if (!map) return;
//     const listener = map.addListener("click", (e: google.maps.MapMouseEvent) => {
//       if (e.latLng) onClick({ lat: e.latLng.lat(), lng: e.latLng.lng() });
//     });
//     return () => { google.maps.event.removeListener(listener); };
//   }, [map, onClick]);
//   return null;
// }

// function Step1Form({ formData, setFormData }: { formData: AppState; setFormData: (val: any) => void }) {
//   const [activeSection, setActiveSection] = useState<string>('clientBank');

//   const updateSection = (section: keyof AppState, field: string, value: any) => {
//     setFormData((prev: AppState) => ({ ...prev, [section]: { ...(prev[section] as any), [field]: value } }));
//   };
//   const handleDimensionChange = (dir: string, type: 'DeedDim' | 'ActualDim', value: string) => {
//     const key = `${dir}${type}`;
//     updateSection('boundaries', key, value);

//     if (type === 'DeedDim' && formData.boundaries.dimensionsMatch) {
//       updateSection('boundaries', `${dir}ActualDim`, value);
//     }
//   };
//   const handleTextBoundaryChange = (dir: string, type: 'Deed' | 'Actual', value: string) => {
//     const key = `${dir}Boundary${type}`;
//     updateSection('boundaries', key, value);

//     // Auto-sync actual if checkbox is ticked
//     if (type === 'Deed' && formData.boundaries.boundariesMatch) {
//       updateSection('boundaries', `${dir}BoundaryActual`, value);
//     }
//   };

//   const renderSectionHeader = (title: string, id: string) => (
//     <div className={`flex items-center justify-between p-4 md:px-6 md:py-5 cursor-pointer transition-colors ${activeSection === id ? 'bg-blue-50/50 border-b border-blue-100' : 'bg-white hover:bg-gray-50 border-b border-gray-100'}`} onClick={() => setActiveSection(activeSection === id ? '' : id)}>
//       <h3 className="font-bold md:text-[15px] text-[#00a0ef]">{title}</h3>
//       <ChevronDown className={`w-5 h-5 text-[#00a0ef] transition-transform ${activeSection === id ? 'rotate-180' : ''}`} />
//     </div>
//   );

//   return (
//     <div className="bg-white border border-gray-200 md:rounded-xl overflow-hidden shadow-sm divide-y divide-gray-100">
      
//       <div>
//         {renderSectionHeader('Client / Bank Details', 'clientBank')}
//         {activeSection === 'clientBank' && (
//           <div className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 bg-blue-50/10">
//             <div><label className={labelStyles}>IFSC Code</label><input id="clientBank-first" type="text" className={inputStyles} value={formData.clientBank.ifsc} onChange={e => updateSection('clientBank', 'ifsc', e.target.value)} /></div>
//             <div><label className={labelStyles}>Bank Name</label><input type="text" className={inputStyles} value={formData.clientBank.bankName} onChange={e => updateSection('clientBank', 'bankName', e.target.value)} /></div>
//             <div><label className={labelStyles}>Branch</label><input type="text" className={inputStyles} value={formData.clientBank.branch} onChange={e => updateSection('clientBank', 'branch', e.target.value)} /></div>
//             <div><label className={labelStyles}>Email ID</label><input type="email" className={inputStyles} value={formData.clientBank.email} onChange={e => updateSection('clientBank', 'email', e.target.value)} /></div>
//             <div><label className={labelStyles}>Point of Contact Name</label><input type="text" className={inputStyles} value={formData.clientBank.contactPersonName} onChange={e => updateSection('clientBank', 'contactPersonName', e.target.value)} /></div>
//             <div><label className={labelStyles}>Point of Contact Number</label><input type="tel" className={inputStyles} value={formData.clientBank.contactPersonNumber} onChange={e => updateSection('clientBank', 'contactPersonNumber', e.target.value)} /></div>
//             <div><label className={labelStyles}>Date of Inspection</label><input type="date" className={inputStyles} value={formData.clientBank.dateOfInspection} onChange={e => updateSection('clientBank', 'dateOfInspection', e.target.value)} /></div>
//             <div><label className={labelStyles}>Date Valuation</label><input type="date" className={inputStyles} value={formData.clientBank.dateOfValuation} onChange={e => updateSection('clientBank', 'dateOfValuation', e.target.value)} /></div>
            
//             <div className="md:col-span-2">
//               <label className={labelStyles}>Type of Property</label>
//               <RadioGroup options={['Vacant Land - Residential', 'Existing Building - Residential', 'Open Piece of Land', 'Residential Flat', 'Agri Land', 'Residential Villa', 'Industrial Shed']} value={formData.clientBank.propertyType} onChange={v => updateSection('clientBank', 'propertyType', v)} />
//             </div>
//             <div className="md:col-span-2">
//               <label className={labelStyles}>Purpose of Valuation (Loan Type)</label>
//               <RadioGroup options={['Home Loan', 'Mortgage Loan', 'Education Loan', 'Collateral Security', 'For Bank Loan / Mortgage Purpose']} value={formData.clientBank.purposeOfValuation} onChange={v => updateSection('clientBank', 'purposeOfValuation', v)} />
//             </div>
//             <NextSectionButton onClick={() => setActiveSection('ownerLocality')} nextFocusId="owner-first" />
//           </div>
//         )}
//       </div>

//       <div>
//         {renderSectionHeader('Owner Details & Locality Classification', 'ownerLocality')}
//         {activeSection === 'ownerLocality' && (
//           <div className="p-4 md:p-6 bg-blue-50/10">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 border-b border-gray-200 pb-6 mb-6">
//               <div className="md:col-span-2 flex gap-3">
//                 <div className="w-1/3 md:w-1/4">
//                   <label className={labelStyles}>Prefix</label>
//                   <div className="relative">
//                     <select id="owner-first" className={`${inputStyles} appearance-none bg-white`} value={formData.owner.prefix} onChange={e => {
//                       const val = e.target.value;
//                       updateSection('owner', 'prefix', val);
//                       if (val === 'Smt' || val === 'Mrs') updateSection('owner', 'relation', 'W/o');
//                       else if (val === 'Shri' || val === 'Mr') updateSection('owner', 'relation', 'S/o');
//                     }}>
//                       <option value="Shri">Shri</option>
//                       <option value="Smt">Smt</option>
//                       <option value="Mr">Mr</option>
//                       <option value="Mrs">Mrs</option>
//                     </select>
//                     <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
//                   </div>
//                 </div>
//                 <div className="flex-1"><label className={labelStyles}>Owner Name</label><input type="text" className={inputStyles} value={formData.owner.ownerName} onChange={e => updateSection('owner', 'ownerName', e.target.value)} /></div>
//               </div>
//               <div className="md:col-span-2 flex gap-3">
//                 <div className="w-1/3 md:w-1/4">
//                   <label className={labelStyles}>Relation</label>
//                   <div className="relative">
//                     <select className={`${inputStyles} appearance-none bg-white`} value={formData.owner.relation} onChange={e => updateSection('owner', 'relation', e.target.value)}>
//                       <option value="S/o">S/o</option>
//                       <option value="D/o">D/o</option>
//                       <option value="W/o">W/o</option>
//                       <option value="F/o">F/o</option>
//                     </select>
//                     <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
//                   </div>
//                 </div>
//                 <div className="flex-1"><label className={labelStyles}>Relative's Name</label><input type="text" className={inputStyles} value={formData.owner.relationName} onChange={e => updateSection('owner', 'relationName', e.target.value)} /></div>
//               </div>
//               <div className="md:col-span-2"><label className={labelStyles}>Occupation</label><input type="text" className={inputStyles} value={formData.owner.occupation} onChange={e => updateSection('owner', 'occupation', e.target.value)} /></div>
//               <div><label className={labelStyles}>Phone Number 1</label><input type="tel" className={inputStyles} value={formData.owner.phone1} onChange={e => updateSection('owner', 'phone1', e.target.value)} /></div>
//               <div><label className={labelStyles}>Phone Number 2</label><input type="tel" className={inputStyles} value={formData.owner.phone2} onChange={e => updateSection('owner', 'phone2', e.target.value)} /></div>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div className="md:col-span-2"><label className={labelStyles}>Rural / Urban</label><RadioGroup options={['metro city', 'urban', 'semi urban rural', 'N/A']} value={formData.locality.urbanRural} onChange={v => updateSection('locality', 'urbanRural', v)} /></div>
//               <div className="md:col-span-2"><label className={labelStyles}>Locality Class</label><RadioGroup options={['high', 'middle', 'low', 'posh', 'N/A']} value={formData.locality.localityClass} onChange={v => updateSection('locality', 'localityClass', v)} /></div>
//               <div className="md:col-span-2"><label className={labelStyles}>Land Tenure</label><RadioGroup options={['freehold', 'leasehold', 'N/A']} value={formData.locality.landTenure} onChange={v => updateSection('locality', 'landTenure', v)} /></div>
//               <div className="md:col-span-2"><label className={labelStyles}>Width of Road</label><RadioGroup options={['< 10ft', '< 20ft', '> 20ft']} value={formData.locality.widthOfRoad} onChange={v => updateSection('locality', 'widthOfRoad', v)} /></div>
//               <div className="md:col-span-2"><label className={labelStyles}>No. of Stories</label><RadioGroup options={['1', '2', '3', '4', '5', '6', '7', '8', '9', 'vacant']} value={formData.locality.noOfStories} onChange={v => updateSection('locality', 'noOfStories', v)} /></div>
//               <div className="md:col-span-2"><label className={labelStyles}>Sanitary Fitting</label><RadioGroup options={['ordinary', 'good', 'superior', 'premium', 'excellent', 'under construction']} value={formData.locality.sanitaryFitting} onChange={v => updateSection('locality', 'sanitaryFitting', v)} /></div>
//               <div className="md:col-span-2"><label className={labelStyles}>Electrical Fitting</label><RadioGroup options={['ordinary', 'good', 'superior', 'premium', 'excellent', 'under construction']} value={formData.locality.electricalFitting} onChange={v => updateSection('locality', 'electricalFitting', v)} /></div>
//               <div className="md:col-span-2"><label className={labelStyles}>Townplan / MC / GP</label><RadioGroup options={['MC', 'townplanning', 'gram panchayat', 'outside Mc']} value={formData.locality.townplan} onChange={v => updateSection('locality', 'townplan', v)} /></div>
//             </div>
//             <NextSectionButton onClick={() => setActiveSection('property')} nextFocusId="property-first" />
//           </div>
//         )}
//       </div>

//       <div>
//         {renderSectionHeader('Property Details', 'property')}
//         {activeSection === 'property' && (
//           <div className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-2 gap-6 bg-blue-50/10">
//             <div className="md:col-span-2">
//               <label className={labelStyles} id="property-first">Geo Location & Coordinates</label>
//               <GeoCoordinatePicker 
//                 onCoordinatesSubmit={(coords) => {
//                   updateSection('property', 'boundaryCoordinates', coords);
//                   if (coords.length > 0) {
//                     updateSection('property', 'latitude', coords[0].lat.toString());
//                     updateSection('property', 'longitude', coords[0].lng.toString());
//                   }
//                 }} 
//               />
//               <div className="flex gap-4 mt-4">
//                 <input type="text" placeholder="Latitude" className={inputStyles} value={formData.property.latitude} readOnly />
//                 <input type="text" placeholder="Longitude" className={inputStyles} value={formData.property.longitude} readOnly />
//               </div>
//             </div>
            
//             <div className="md:col-span-2"><label className={labelStyles}>Address</label><textarea rows={3} className={inputStyles} value={formData.property.address} onChange={e => updateSection('property', 'address', e.target.value)} /></div>
            
//             <div className="md:col-span-2"><label className={labelStyles}>Nature of Property</label><RadioGroup options={['Residential', 'Commercial', 'Industrial', 'Agriculture', 'mixed', 'institutional', 'N/A']} value={formData.property.natureOfProperty} onChange={v => updateSection('property', 'natureOfProperty', v)} /></div>
//             <div className="md:col-span-1"><label className={labelStyles}>Vacant Plot?</label><RadioGroup options={['yes', 'NO']} value={formData.property.vacantPlot} onChange={v => updateSection('property', 'vacantPlot', v)} /></div>
//             <div className="md:col-span-1"><label className={labelStyles}>Width of Road</label><RadioGroup options={['< 10ft', '< 20ft', '> 20ft']} value={formData.property.widthOfRoad} onChange={v => updateSection('property', 'widthOfRoad', v)} /></div>
//             <div className="md:col-span-2"><label className={labelStyles}>Plot Shape</label><RadioGroup options={['Rectangle', 'square', 'triangle', 'irregular', 'polygon']} value={formData.property.plotShape} onChange={v => updateSection('property', 'plotShape', v)} /></div>

//             <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border border-gray-200 bg-white rounded-xl">
//               <div className="md:col-span-3"><label className={labelStyles}>Dimension Unit</label><RadioGroup options={['ft', 'm', 'inch']} value={formData.property.dimensionUnit} onChange={v => updateSection('property', 'dimensionUnit', v)} /></div>
//               <div><label className={labelStyles}>Length</label><input type="number" className={inputStyles} value={formData.property.length} onChange={e => { updateSection('property', 'length', e.target.value); const b = parseFloat(formData.property.breadth) || 0; updateSection('property', 'calculatedArea', (parseFloat(e.target.value || '0') * b).toString()); }} /></div>
//               <div><label className={labelStyles}>Breadth</label><input type="number" className={inputStyles} value={formData.property.breadth} onChange={e => { updateSection('property', 'breadth', e.target.value); const l = parseFloat(formData.property.length) || 0; updateSection('property', 'calculatedArea', (parseFloat(e.target.value || '0') * l).toString()); }} /></div>
//               <div className="md:col-span-3 border-t border-gray-100 pt-4 mt-2"><label className={labelStyles}>Conversion Unit</label><RadioGroup options={['sq ft', 'sq yd', 'sq mt', 'Acre', 'Hectare', 'Guntas']} value={formData.property.conversionUnit} onChange={v => updateSection('property', 'conversionUnit', v)} /></div>
//               <div className="md:col-span-3"><label className={labelStyles}>Calculated Area (Dimensions converted to selected unit)</label><input type="text" className={`${inputStyles} bg-gray-50`} readOnly value={formData.property.calculatedArea} /></div>
//             </div>

//             <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border border-gray-200 bg-white rounded-xl">
//               <div className="md:col-span-2"><label className={labelStyles}>Wall Unit</label><RadioGroup options={['ft', 'm', 'inch']} value={formData.property.wallUnit} onChange={v => updateSection('property', 'wallUnit', v)} /></div>
//               <div><label className={labelStyles}>Wall Length</label><input type="number" className={inputStyles} value={formData.property.wallLength} onChange={e => updateSection('property', 'wallLength', e.target.value)} /></div>
//               <div><label className={labelStyles}>Wall Height</label><input type="number" className={inputStyles} value={formData.property.wallHeight} onChange={e => updateSection('property', 'wallHeight', e.target.value)} /></div>
//               <div className="md:col-span-2"><label className={labelStyles}>Walls on Side</label><RadioGroup options={['1', '2', '3', '4']} value={formData.property.wallsOnSide} onChange={v => updateSection('property', 'wallsOnSide', v)} /></div>
//               <div className="md:col-span-2"><label className={labelStyles}>Type of Brick</label><RadioGroup options={['brick work', 'Rcc', 'pacca offset / pavement']} value={formData.property.brickType} onChange={v => updateSection('property', 'brickType', v)} /></div>
//             </div>

//             <NextSectionButton onClick={() => setActiveSection('boundaries')} nextFocusId="boundaries-first" />
//           </div>
//         )}
//       </div>

//       <div>
//         {renderSectionHeader('Boundaries & Negative Points', 'boundaries')}
//         {activeSection === 'boundaries' && (
//           <div className="p-4 md:p-6 bg-blue-50/10 space-y-8">
//             <div className="md:col-span-2">
//               <label className={labelStyles} id="boundaries-first">Boundary Unit</label>
//               <RadioGroup options={['length', 'feet', 'meters', 'inchs']} value={formData.boundaries.unit} onChange={v => updateSection('boundaries', 'unit', v)} />
//             </div>
            
//             {/* 1. Boundary Dimensions (Numbers) */}
//             <div>
//               <div className="flex items-center justify-between mb-3">
//                 <h4 className="text-[13px] font-bold text-[#00a0ef]">Boundary Dimensions</h4>
//                 <label className="flex items-center gap-2 text-[12px] font-semibold text-gray-700 cursor-pointer bg-white px-3 py-1.5 rounded-lg border border-gray-200 shadow-sm">
//                   <input 
//                     type="checkbox" 
//                     className="w-4 h-4 text-[#00a0ef] rounded border-gray-300 focus:ring-[#00a0ef]"
//                     checked={formData.boundaries.dimensionsMatch} 
//                     onChange={(e) => {
//                       const checked = e.target.checked;
//                       updateSection('boundaries', 'dimensionsMatch', checked);
//                       if (checked) {
//                         // Auto-sync Deed to Actual immediately
//                         updateSection('boundaries', 'northActualDim', formData.boundaries.northDeedDim);
//                         updateSection('boundaries', 'southActualDim', formData.boundaries.southDeedDim);
//                         updateSection('boundaries', 'eastActualDim', formData.boundaries.eastDeedDim);
//                         updateSection('boundaries', 'westActualDim', formData.boundaries.westDeedDim);
//                       }
//                     }} 
//                   />
//                   Actual dimensions match document
//                 </label>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-4 rounded-xl border border-gray-200">
//                 {(['north', 'south', 'east', 'west'] as const).map(dir => (
//                   <div key={`${dir}Dim`} className="flex gap-2">
//                     <div className="flex-1">
//                       <label className={labelStyles}>{dir.charAt(0).toUpperCase() + dir.slice(1)} (Deed)</label>
//                       <input 
//                         type="text" 
//                         className={inputStyles} 
//                         value={(formData.boundaries as any)[`${dir}DeedDim`]} 
//                         onChange={e => handleDimensionChange(dir, 'DeedDim', e.target.value)} 
//                       />
//                     </div>
//                     <div className="flex-1">
//                       <label className={labelStyles}>{dir.charAt(0).toUpperCase() + dir.slice(1)} (Actual)</label>
//                       <input 
//                         type="text" 
//                         className={`${inputStyles} ${formData.boundaries.dimensionsMatch ? 'bg-gray-100 cursor-not-allowed' : ''}`} 
//                         value={(formData.boundaries as any)[`${dir}ActualDim`]} 
//                         onChange={e => handleDimensionChange(dir, 'ActualDim', e.target.value)} 
//                         disabled={formData.boundaries.dimensionsMatch}
//                       />
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* 2. Textual Boundaries (Neighbors, Properties, etc.) */}
//             <div>
//               <div className="flex items-center justify-between mb-3">
//                 <h4 className="text-[13px] font-bold text-[#00a0ef]">Boundary Descriptions (Neighbors)</h4>
//                 <label className="flex items-center gap-2 text-[12px] font-semibold text-gray-700 cursor-pointer bg-white px-3 py-1.5 rounded-lg border border-gray-200 shadow-sm">
//                   <input 
//                     type="checkbox" 
//                     className="w-4 h-4 text-[#00a0ef] rounded border-gray-300 focus:ring-[#00a0ef]"
//                     checked={formData.boundaries.boundariesMatch} 
//                     onChange={(e) => {
//                       const checked = e.target.checked;
//                       updateSection('boundaries', 'boundariesMatch', checked);
//                       if (checked) {
//                         // Auto-sync Deed to Actual immediately
//                         updateSection('boundaries', 'northBoundaryActual', formData.boundaries.northBoundaryDeed);
//                         updateSection('boundaries', 'southBoundaryActual', formData.boundaries.southBoundaryDeed);
//                         updateSection('boundaries', 'eastBoundaryActual', formData.boundaries.eastBoundaryDeed);
//                         updateSection('boundaries', 'westBoundaryActual', formData.boundaries.westBoundaryDeed);
//                       }
//                     }} 
//                   />
//                   Actual neighbors match document
//                 </label>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-4 rounded-xl border border-gray-200">
//                 {(['north', 'south', 'east', 'west'] as const).map(dir => (
//                   <div key={`${dir}Text`} className="flex gap-2">
//                     <div className="flex-1">
//                       <label className={labelStyles}>{dir.charAt(0).toUpperCase() + dir.slice(1)} Neighbor (Deed)</label>
//                       <input 
//                         type="text" 
//                         placeholder="e.g. H.No 2-1-206"
//                         className={inputStyles} 
//                         value={(formData.boundaries as any)[`${dir}BoundaryDeed`]} 
//                         onChange={e => handleTextBoundaryChange(dir, 'Deed', e.target.value)} 
//                       />
//                     </div>
//                     <div className="flex-1">
//                       <label className={labelStyles}>{dir.charAt(0).toUpperCase() + dir.slice(1)} Neighbor (Actual)</label>
//                       <input 
//                         type="text" 
//                         placeholder="e.g. H.No 2-1-206"
//                         className={`${inputStyles} ${formData.boundaries.boundariesMatch ? 'bg-gray-100 cursor-not-allowed' : ''}`} 
//                         value={(formData.boundaries as any)[`${dir}BoundaryActual`]} 
//                         onChange={e => handleTextBoundaryChange(dir, 'Actual', e.target.value)} 
//                         disabled={formData.boundaries.boundariesMatch}
//                       />
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <div className="border-t border-gray-200 pt-6 mt-6">
//               <label className={labelStyles}>Property Negative Points</label>
//               <MultiSelectGroup 
//                 options={['HT line Over building', 'transformer in front', 'sub division of property', 'community dominace', 'common stair for separate units', 'near rail way track', 'near drain', 'near banquet hall']} 
//                 selected={formData.negativePoints} 
//                 onChange={v => setFormData((prev: AppState) => ({ ...prev, negativePoints: v }))} 
//               />
//             </div>
//           </div>
//         )}
//       </div>

//     </div>
//   );
// }

// function Step2Form({ formData, setFormData }: { formData: AppState; setFormData: (val: any) => void }) {
//   const [activeSection, setActiveSection] = useState<string>('floors');
//   const [activeFloorId, setActiveFloorId] = useState<string>('');

//   useEffect(() => {
//     if (formData.floors.length > 0 && !activeFloorId) setActiveFloorId(formData.floors[0].id);
//   }, [formData.floors]);

//   const handleAddFloor = (floorName: string) => {
//     if (!floorName) return;
//     const existing = formData.floors.find((f: FloorDetail) => f.floorName === floorName);
//     if (existing) {
//       setActiveFloorId(existing.id);
//     } else {
//       const newFloor: FloorDetail = {
//         id: Math.random().toString(36).substr(2, 9),
//         floorName, possessionWith: '', unit: '', length: '', breadth: '', conversionUnit: '', coveredArea: '', condition: '', structure: '', flooring: '', accommodation: '', doorsWindows: '', floorRemarks: ''
//       };
//       setFormData((prev: AppState) => ({ ...prev, floors: [...prev.floors, newFloor] }));
//       setActiveFloorId(newFloor.id);
//     }
//   };

//   const updateFloor = (id: string, field: keyof FloorDetail, value: string) => {
//     setFormData((prev: AppState) => ({
//       ...prev,
//       floors: prev.floors.map(f => {
//         if (f.id === id) {
//           const newF = { ...f, [field]: value };
//           if (field === 'length' || field === 'breadth') {
//             const l = parseFloat(newF.length) || 0;
//             const b = parseFloat(newF.breadth) || 0;
//             newF.coveredArea = (l * b).toString();
//           }
//           return newF;
//         }
//         return f;
//       })
//     }));
//   };

//   const removeFloor = (id: string) => {
//     setFormData((prev: AppState) => {
//       const newFloors = prev.floors.filter(f => f.id !== id);
//       if (activeFloorId === id) setActiveFloorId(newFloors.length > 0 ? newFloors[0].id : '');
//       return { ...prev, floors: newFloors };
//     });
//   };

//   const updateMarket = (field: string, value: any) => {
//     setFormData((prev: AppState) => ({ ...prev, market: { ...prev.market, [field]: value } }));
//   };

//   const renderSectionHeader = (title: string, id: string) => (
//     <div className={`flex items-center justify-between p-4 md:px-6 md:py-5 cursor-pointer transition-colors ${activeSection === id ? 'bg-blue-50/50 border-b border-blue-100' : 'bg-white hover:bg-gray-50 border-b border-gray-100'}`} onClick={() => setActiveSection(activeSection === id ? '' : id)}>
//       <h3 className="font-bold md:text-[15px] text-[#00a0ef]">{title}</h3>
//       <ChevronDown className={`w-5 h-5 text-[#00a0ef] transition-transform ${activeSection === id ? 'rotate-180' : ''}`} />
//     </div>
//   );

//   return (
//     <div className="bg-white border border-gray-200 md:rounded-xl overflow-hidden shadow-sm divide-y divide-gray-100">
      
//       <div>
//         {renderSectionHeader('Building Details (Per Floor)', 'floors')}
//         {activeSection === 'floors' && (
//           <div className="p-4 md:p-6 bg-blue-50/10">
//             <div className="mb-6">
//               <label className={labelStyles}>Select or Add Floor Details</label>
//               <RadioGroup options={['basement', 'stilt', 'GF', 'FF', 'SF', 'TF', '4th', 'multistorey']} value="" onChange={v => handleAddFloor(v)} />
//             </div>

//             {formData.floors.length > 0 && (
//               <div className="flex flex-col md:flex-row gap-4">
//                 <div className="md:w-48 shrink-0 flex flex-col gap-2">
//                   {formData.floors.map(f => (
//                     <div key={f.id} className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${activeFloorId === f.id ? 'bg-[#00a0ef] border-[#00a0ef] text-white shadow-md' : 'bg-white border-gray-200 text-gray-700 hover:border-gray-300'}`} onClick={() => setActiveFloorId(f.id)}>
//                       <span className="font-semibold text-[13px]">{f.floorName}</span>
//                       <button type="button" onClick={(e) => { e.stopPropagation(); removeFloor(f.id); }} className={`p-1 rounded hover:bg-black/10 ${activeFloorId === f.id ? 'text-white' : 'text-gray-400 hover:text-red-500'}`}><Trash2 size={14} /></button>
//                     </div>
//                   ))}
//                 </div>
                
//                 <div className="flex-1 bg-white p-4 md:p-6 rounded-xl border border-gray-200 shadow-sm">
//                   {formData.floors.filter(f => f.id === activeFloorId).map(activeFloor => (
//                     <div key={activeFloor.id} className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                       <div className="md:col-span-2 pb-3 border-b border-gray-100 mb-2">
//                         <h4 className="font-bold text-[#00a0ef] text-[15px]">{activeFloor.floorName} Details</h4>
//                       </div>

//                       <div className="md:col-span-2"><label className={labelStyles}>Possession With</label><RadioGroup options={['owner', 'tenant']} value={activeFloor.possessionWith} onChange={v => updateFloor(activeFloor.id, 'possessionWith', v)} /></div>

//                       <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4">
//                         <div><label className={labelStyles}>Unit</label><RadioGroup options={['feet', 'inch', 'meter']} value={activeFloor.unit} onChange={v => updateFloor(activeFloor.id, 'unit', v)} /></div>
//                         <div><label className={labelStyles}>Length</label><input type="number" className={inputStyles} value={activeFloor.length} onChange={e => updateFloor(activeFloor.id, 'length', e.target.value)} /></div>
//                         <div><label className={labelStyles}>Breadth</label><input type="number" className={inputStyles} value={activeFloor.breadth} onChange={e => updateFloor(activeFloor.id, 'breadth', e.target.value)} /></div>
//                         <div className="md:col-span-3 border-t border-gray-50 pt-4"><label className={labelStyles}>Conversion Unit</label><RadioGroup options={['sq ft', 'sq yd', 'sq mt', 'Acre', 'Hectare', 'Guntas']} value={activeFloor.conversionUnit} onChange={v => updateFloor(activeFloor.id, 'conversionUnit', v)} /></div>
//                         <div className="md:col-span-3"><label className={labelStyles}>Covered Area</label><input type="text" className={`${inputStyles} bg-gray-50`} readOnly value={activeFloor.coveredArea} /></div>
//                       </div>

//                       <div className="md:col-span-2"><label className={labelStyles}>Condition</label><RadioGroup options={['excellent', 'good', 'avg', 'poor', 'under construction', 'under finishing', 'others']} value={activeFloor.condition} onChange={v => updateFloor(activeFloor.id, 'condition', v)} /></div>
//                       <div className="md:col-span-2"><label className={labelStyles}>Structure</label><RadioGroup options={['Rcc framed', 'load bearing', 'composite Structure', 'Peb/shed']} value={activeFloor.structure} onChange={v => updateFloor(activeFloor.id, 'structure', v)} /></div>
//                       <div className="md:col-span-2"><label className={labelStyles}>Flooring</label><RadioGroup options={['tiles', 'marble', 'wood', 'cement', 'pending', 'other']} value={activeFloor.flooring} onChange={v => updateFloor(activeFloor.id, 'flooring', v)} /></div>
//                       <div className="md:col-span-2"><label className={labelStyles}>Accommodation</label><RadioGroup options={['storage', 'shop', 'office space', '1BHK', '1.5BHK', '2BHK', '2.5BHK', '3BHK', '3.5BHK', '4BHK', '4.5BHK', '5BHK', '5.5BHK', '6BHK', 'studio', 'penthouse']} value={activeFloor.accommodation} onChange={v => updateFloor(activeFloor.id, 'accommodation', v)} /></div>
//                       <div className="md:col-span-2"><label className={labelStyles}>Doors / Windows</label><RadioGroup options={['wooden', 'aluminium', 'glass', 'upvc', 'pending', 'N/A']} value={activeFloor.doorsWindows} onChange={v => updateFloor(activeFloor.id, 'doorsWindows', v)} /></div>
//                       <div className="md:col-span-2"><label className={labelStyles}>Floor Remarks</label><textarea rows={3} className={inputStyles} value={activeFloor.floorRemarks} onChange={e => updateFloor(activeFloor.id, 'floorRemarks', e.target.value)}></textarea></div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
            
//             <NextSectionButton onClick={() => setActiveSection('market')} nextFocusId="market-first" />
//           </div>
//         )}
//       </div>

//       <div>
//         {renderSectionHeader('Building-Shared / Market', 'market')}
//         {activeSection === 'market' && (
//           <div className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-2 gap-6 bg-blue-50/10">
//             <div><label className={labelStyles} id="market-first">Year of Construction</label><input type="text" className={inputStyles} value={formData.market.yearOfConstruction} onChange={e => updateMarket('yearOfConstruction', e.target.value)} /></div>
//             <div><label className={labelStyles}>Renovation</label><RadioGroup options={['yes', 'no']} value={formData.market.renovation} onChange={v => updateMarket('renovation', v)} /></div>
//             <div className="md:col-span-2"><label className={labelStyles}>Parking</label><RadioGroup options={['covered', 'notpresent', 'open', 'N/A']} value={formData.market.parking} onChange={v => updateMarket('parking', v)} /></div>
//             <div className="md:col-span-2"><label className={labelStyles}>Lift</label><RadioGroup options={['yes', 'No', 'N/A']} value={formData.market.lift} onChange={v => updateMarket('lift', v)} /></div>
//             <div className="md:col-span-2"><label className={labelStyles}>Kitchen Type</label><RadioGroup options={['modular', 'semi modular', 'odinary', 'N/A', 'other']} value={formData.market.kitchenType} onChange={v => updateMarket('kitchenType', v)} /></div>

//             <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4 bg-white p-4 rounded-xl border border-gray-200">
//               <div className="md:col-span-3 border-b border-gray-100 pb-2 mb-2"><h4 className="text-[13px] font-bold text-[#00a0ef]">Rental Income</h4></div>
//               <div><label className={labelStyles}>Minimum</label><input type="number" className={inputStyles} value={formData.market.rentalMin} onChange={e => updateMarket('rentalMin', e.target.value)} /></div>
//               <div><label className={labelStyles}>Maximum</label><input type="number" className={inputStyles} value={formData.market.rentalMax} onChange={e => updateMarket('rentalMax', e.target.value)} /></div>
//               <div><label className={labelStyles}>Unit</label><RadioGroup options={['hundred', 'thousand', 'lakh', 'crore']} value={formData.market.rentalUnit} onChange={v => updateMarket('rentalUnit', v)} /></div>
//             </div>

//             {['Client', 'Dealer', 'Market'].map((type) => {
//               const minField = `market${type}Min` as keyof AppState['market'];
//               const maxField = `market${type}Max` as keyof AppState['market'];
//               const unitField = `market${type}Unit` as keyof AppState['market'];
//               return (
//                 <div key={type} className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4 bg-white p-4 rounded-xl border border-gray-200">
//                   <div className="md:col-span-3 border-b border-gray-100 pb-2 mb-2"><h4 className="text-[13px] font-bold text-[#00a0ef]">Market Rate ({type === 'Market' ? 'As per market' : type})</h4></div>
//                   <div><label className={labelStyles}>Minimum</label><input type="number" className={inputStyles} value={formData.market[minField] as string} onChange={e => updateMarket(minField, e.target.value)} /></div>
//                   <div><label className={labelStyles}>Maximum</label><input type="number" className={inputStyles} value={formData.market[maxField] as string} onChange={e => updateMarket(maxField, e.target.value)} /></div>
//                   <div><label className={labelStyles}>Unit</label><RadioGroup options={['hundred', 'thousand', 'lakh', 'crore']} value={formData.market[unitField] as string} onChange={v => updateMarket(unitField, v)} /></div>
//                 </div>
//               );
//             })}

//             <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-4 rounded-xl border border-gray-200">
//               <div className="md:col-span-2 border-b border-gray-100 pb-2 mb-2"><h4 className="text-[13px] font-bold text-[#00a0ef]">Dealer Details</h4></div>
//               <div><label className={labelStyles}>Dealer Name</label><input type="text" className={inputStyles} value={formData.market.dealerName} onChange={e => updateMarket('dealerName', e.target.value)} /></div>
//               <div><label className={labelStyles}>Mobile Number</label><input type="tel" className={inputStyles} value={formData.market.dealerMobile} onChange={e => updateMarket('dealerMobile', e.target.value)} /></div>
//             </div>

//             <div className="md:col-span-2 bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
//               <div className="flex items-center justify-between mb-3">
//                 <label className={labelStyles}>Additional Details</label>
//                 <button type="button" onClick={() => updateMarket('additionalDetails', [...formData.market.additionalDetails, { key: '', value: '' }])} className="text-[13px] font-semibold text-[#00a0ef] hover:underline flex items-center gap-1"><Plus size={14} /> Add Detail</button>
//               </div>
//               <div className="space-y-3">
//                 {formData.market.additionalDetails.map((pair, idx) => (
//                   <div key={idx} className="flex gap-3">
//                     <input type="text" placeholder="Key" className={inputStyles} value={pair.key} onChange={e => {
//                       const newArr = [...formData.market.additionalDetails];
//                       newArr[idx].key = e.target.value;
//                       updateMarket('additionalDetails', newArr);
//                     }} />
//                     <input type="text" placeholder="Value" className={inputStyles} value={pair.value} onChange={e => {
//                       const newArr = [...formData.market.additionalDetails];
//                       newArr[idx].value = e.target.value;
//                       updateMarket('additionalDetails', newArr);
//                     }} />
//                     <button type="button" onClick={() => {
//                       const newArr = formData.market.additionalDetails.filter((_, i) => i !== idx);
//                       updateMarket('additionalDetails', newArr);
//                     }} className="px-3 py-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"><Trash2 size={18} /></button>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// function Step3Form({ formData, setFormData }: { formData: AppState; setFormData: (val: any) => void }) {
//   const photoInputRef = useRef<HTMLInputElement>(null);
//   const docInputRef = useRef<HTMLInputElement>(null);

//   const handleFileUpload = (type: 'photos' | 'documents', e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) {
//       setFormData((prev: AppState) => ({ ...prev, uploads: { ...prev.uploads, [type]: [...prev.uploads[type], ...Array.from(e.target.files!)] } }));
//     }
//   };

//   const removeFile = (type: 'photos' | 'documents', idx: number) => {
//     setFormData((prev: AppState) => ({ ...prev, uploads: { ...prev.uploads, [type]: prev.uploads[type].filter((_, i) => i !== idx) } }));
//   };

//   return (
//     <div className="bg-white border border-gray-200 md:rounded-xl overflow-hidden shadow-sm p-4 md:p-6 space-y-8">
//       <div>
//         <h3 className="font-bold md:text-[16px] text-[#00a0ef] mb-4">Site Photos <span className="text-red-500">*</span></h3>
//         <div onClick={() => photoInputRef.current?.click()} className="border-2 border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition cursor-pointer">
//           <input type="file" multiple accept="image/*" className="hidden" ref={photoInputRef} onChange={(e) => handleFileUpload('photos', e)} />
//           <UploadCloud className="w-8 h-8 text-gray-400 mb-2" />
//           <p className="text-sm text-gray-600 text-center">Click to <span className="text-[#00a0ef] font-medium">browse photos</span></p>
//         </div>
//         {formData.uploads.photos.length > 0 && (
//           <div className="grid grid-cols-3 md:grid-cols-5 gap-3 mt-4">
//             {formData.uploads.photos.map((file, idx) => (
//               <div key={idx} className="relative aspect-square rounded-lg border border-gray-200 overflow-hidden bg-gray-50 flex items-center justify-center group">
//                 <img src={URL.createObjectURL(file)} alt="Preview" className="w-full h-full object-cover transition-opacity group-hover:opacity-75" />
//                 <button type="button" onClick={(e) => { e.stopPropagation(); removeFile('photos', idx); }} className="absolute top-1 right-1 bg-white/90 rounded-full p-1 shadow-md opacity-0 group-hover:opacity-100 transition-all hover:bg-red-50 text-red-500"><X size={14} /></button>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       <div className="border-t border-gray-100 pt-8">
//         <h3 className="font-bold md:text-[16px] text-[#00a0ef] mb-4">Documents <span className="text-red-500">*</span></h3>
//         <div onClick={() => docInputRef.current?.click()} className="border-2 border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition cursor-pointer">
//           <input type="file" multiple className="hidden" ref={docInputRef} onChange={(e) => handleFileUpload('documents', e)} />
//           <FileText className="w-8 h-8 text-gray-400 mb-2" />
//           <p className="text-sm text-gray-600 text-center">Click to <span className="text-[#00a0ef] font-medium">browse documents</span></p>
//         </div>
//         {formData.uploads.documents.length > 0 && (
//           <div className="space-y-3 mt-4">
//             {formData.uploads.documents.map((file, idx) => (
//               <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 border border-gray-100 rounded-xl">
//                 <div className="flex items-center gap-3"><div className="w-10 h-10 bg-[#e6f5fd] rounded-lg flex items-center justify-center text-[#00a0ef]"><FileText className="w-5 h-5" /></div><div><p className="text-[13px] font-medium text-gray-900 line-clamp-1">{file.name}</p><p className="text-xs text-gray-500">{(file.size / (1024 * 1024)).toFixed(1)} MB</p></div></div>
//                 <button type="button" onClick={() => removeFile('documents', idx)} className="text-[13px] text-red-500 font-medium px-2 py-1">Remove</button>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// function Step4Form({ formData, onEditStep, isConfirmed, setIsConfirmed }: { formData: AppState; onEditStep: (step: number) => void; isConfirmed: boolean; setIsConfirmed: (v: boolean) => void }) {
//   const MainCategory = ({ title, icon: Icon, children }: any) => (
//     <div className="mb-8 px-1"><div className="flex items-center gap-2 mb-4"><div className="w-5 h-5 flex items-center justify-center text-[#00a0ef]"><Icon className="w-5 h-5 fill-current opacity-20" strokeWidth={2} /></div><h3 className="text-[15px] font-bold text-gray-900">{title}</h3></div><div className="bg-white px-2">{children}</div></div>
//   );
//   const SubCategory = ({ title, stepNum, children }: any) => (
//     <div className="py-4 border-b border-gray-200 last:border-0 first:pt-0"><div className="flex items-center justify-between mb-4"><h4 className="text-[13px] font-bold text-gray-800">{title}</h4><button type="button" onClick={() => onEditStep(stepNum)} className="text-[#00a0ef] hover:bg-blue-50 p-1.5 rounded transition-colors"><Edit2 className="w-3.5 h-3.5" /></button></div><div className="grid grid-cols-2 gap-y-4 gap-x-4">{children}</div></div>
//   );
//   const DataField = ({ label, value }: any) => (
//     <div><p className="text-[11px] text-gray-500 font-medium mb-1">{label}</p><div className="text-[13px] font-medium text-gray-900 break-words">{value || '—'}</div></div>
//   );

//   return (
//     <div className="max-w-3xl bg-white mx-auto md:px-4 pb-8">
//       <div className="py-6 px-2"><h2 className="text-[18px] font-bold text-[#00a0ef]">Review & Submit</h2></div>

//       <MainCategory title="Client, Owner & Property" icon={Landmark}>
//         <SubCategory title="Bank Details" stepNum={1}>
//           <DataField label="IFSC Code" value={formData.clientBank.ifsc} />
//           <DataField label="Bank Name" value={formData.clientBank.bankName} />
//           <DataField label="Branch" value={formData.clientBank.branch} />
//           <DataField label="Email" value={formData.clientBank.email} />
//           <DataField label="POC" value={`${formData.clientBank.contactPersonName} / ${formData.clientBank.contactPersonNumber}`} />
//           <DataField label="Dates" value={`${formData.clientBank.dateOfInspection} / ${formData.clientBank.dateOfValuation}`} />
//           <DataField label="Type of Property" value={formData.clientBank.propertyType} />
//           <DataField label="Purpose" value={formData.clientBank.purposeOfValuation} />
//         </SubCategory>
//         <SubCategory title="Owner Details & Locality" stepNum={1}>
//           <DataField label="Name" value={`${formData.owner.prefix} ${formData.owner.ownerName}`} />
//           <DataField label="Relation" value={`${formData.owner.relation} ${formData.owner.relationName}`} />
//           <DataField label="Phone" value={`${formData.owner.phone1} / ${formData.owner.phone2}`} />
//           <DataField label="Urban/Rural" value={formData.locality.urbanRural} />
//           <DataField label="Class" value={formData.locality.localityClass} />
//           <DataField label="Tenure" value={formData.locality.landTenure} />
//         </SubCategory>
//         <SubCategory title="Property Settings" stepNum={1}>
//           <DataField label="Address" value={formData.property.address} />
//           <DataField label="Nature" value={formData.property.natureOfProperty} />
//           <DataField label="Shape" value={formData.property.plotShape} />
//           <DataField label="Calculated Area" value={`${formData.property.calculatedArea} ${formData.property.conversionUnit}`} />
//           <DataField label="Wall Setup" value={`${formData.property.wallLength}x${formData.property.wallHeight} ${formData.property.wallUnit}`} />
//           <DataField label="Negative Points" value={formData.negativePoints.join(', ')} />
//         </SubCategory>
//         <SubCategory title="Boundaries" stepNum={1}>
//           <DataField label="Unit" value={formData.boundaries.unit} />
//           <DataField label="North (Doc/Act)" value={`${formData.boundaries.northDoc} / ${formData.boundaries.northAct}`} />
//           <DataField label="South (Doc/Act)" value={`${formData.boundaries.southDoc} / ${formData.boundaries.southAct}`} />
//           <DataField label="East (Doc/Act)" value={`${formData.boundaries.eastDoc} / ${formData.boundaries.eastAct}`} />
//           <DataField label="West (Doc/Act)" value={`${formData.boundaries.westDoc} / ${formData.boundaries.westAct}`} />
//         </SubCategory>
//         <SubCategory title="Boundary Descriptions" stepNum={1}>
//           <DataField label="Match Status" value={formData.boundaries.boundariesMatch ? "Deed and Actual Match" : "Differing Details"} />
//           <DataField label="North (Doc/Act)" value={`${formData.boundaries.northBoundaryDeed || 'N/A'} / ${formData.boundaries.northBoundaryActual || 'N/A'}`} />
//           <DataField label="South (Doc/Act)" value={`${formData.boundaries.southBoundaryDeed || 'N/A'} / ${formData.boundaries.southBoundaryActual || 'N/A'}`} />
//           <DataField label="East (Doc/Act)" value={`${formData.boundaries.eastBoundaryDeed || 'N/A'} / ${formData.boundaries.eastBoundaryActual || 'N/A'}`} />
//           <DataField label="West (Doc/Act)" value={`${formData.boundaries.westBoundaryDeed || 'N/A'} / ${formData.boundaries.westBoundaryActual || 'N/A'}`} />
//         </SubCategory>
//       </MainCategory>

//       <MainCategory title="Building & Market Details" icon={Building}>
//         {formData.floors.map((floor) => (
//           <SubCategory key={floor.id} title={`Floor: ${floor.floorName}`} stepNum={2}>
//             <DataField label="Possession" value={floor.possessionWith} />
//             <DataField label="Covered Area" value={`${floor.coveredArea} ${floor.conversionUnit}`} />
//             <DataField label="Condition" value={floor.condition} />
//             <DataField label="Structure" value={floor.structure} />
//             <DataField label="Flooring" value={floor.flooring} />
//             <DataField label="Accommodation" value={floor.accommodation} />
//             <DataField label="Doors/Windows" value={floor.doorsWindows} />
//             <DataField label="Remarks" value={floor.floorRemarks} />
//           </SubCategory>
//         ))}
//         <SubCategory title="Market & Shared Details" stepNum={2}>
//           <DataField label="Year Constructed" value={formData.market.yearOfConstruction} />
//           <DataField label="Renovation" value={formData.market.renovation} />
//           <DataField label="Parking" value={formData.market.parking} />
//           <DataField label="Rental Income" value={`${formData.market.rentalMin} - ${formData.market.rentalMax} ${formData.market.rentalUnit}`} />
//           <DataField label="Client Rate" value={`${formData.market.marketClientMin} - ${formData.market.marketClientMax} ${formData.market.marketClientUnit}`} />
//           <DataField label="Dealer Rate" value={`${formData.market.marketDealerMin} - ${formData.market.marketDealerMax} ${formData.market.marketDealerUnit}`} />
//           <DataField label="Market Rate" value={`${formData.market.marketMarketMin} - ${formData.market.marketMarketMax} ${formData.market.marketMarketUnit}`} />
//           <DataField label="Dealer Details" value={`${formData.market.dealerName} / ${formData.market.dealerMobile}`} />
//         </SubCategory>
//       </MainCategory>

//       <MainCategory title="Uploads" icon={UploadCloud}>
//         <SubCategory title="Files Overview" stepNum={3}>
//           <DataField label="Photos" value={`${formData.uploads.photos.length} uploaded`} />
//           <DataField label="Documents" value={`${formData.uploads.documents.length} uploaded`} />
//         </SubCategory>
//       </MainCategory>

//       <div className="mt-8 p-4 bg-[#f8fafc] border border-gray-200 rounded-xl flex flex-col gap-2">
//         <div className="flex items-start gap-3">
//           <div className="pt-0.5"><input type="checkbox" id="final-confirm" checked={isConfirmed} onChange={(e) => setIsConfirmed(e.target.checked)} className="w-4 h-4 text-[#00a0ef] border-gray-300 rounded focus:ring-[#00a0ef]" /></div>
//           <label htmlFor="final-confirm" className="text-[13px] text-gray-700 leading-relaxed select-none cursor-pointer">I confirm that all information provided above is correct.</label>
//         </div>
//         {(!formData.uploads.photos.length || !formData.uploads.documents.length) && (
//           <p className="text-red-500 text-[12px] font-medium mt-1">Please ensure at least one photo and one document is uploaded in Step 3 before submitting.</p>
//         )}
//       </div>
//     </div>
//   );
// }

// export default function App() {
//   const [currentStep, setCurrentStep] = useState(1);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [isConfirmed, setIsConfirmed] = useState(false);
//   const [isSubmittedSuccessfully, setIsSubmittedSuccessfully] = useState(false);

//   const [customers, setCustomers] = useState<any[]>([]);
//   const [isLoadingCustomers, setIsLoadingCustomers] = useState(true);

//   const [formData, setFormData] = useState<AppState>({
//     customer: '',
//     clientBank: { ifsc: '', bankName: '', branch: '', email: '', contactPersonName: '', contactPersonNumber: '', dateOfInspection: '', dateOfValuation: '', propertyType: '', purposeOfValuation: '' },
//     owner: { prefix: 'Shri', ownerName: '', relation: 'S/o', relationName: '', occupation: '', phone1: '', phone2: '' },
//     locality: { urbanRural: '', localityClass: '', landTenure: '', widthOfRoad: '', noOfStories: '', sanitaryFitting: '', electricalFitting: '', townplan: '' },
//     property: { address: '', natureOfProperty: '', vacantPlot: '', widthOfRoad: '', latitude: '', longitude: '', boundaryCoordinates: [], plotShape: '', dimensionUnit: '', length: '', breadth: '', conversionUnit: '', calculatedArea: '', wallUnit: '', wallLength: '', wallHeight: '', wallsOnSide: '', brickType: '' },
//     boundaries: { 
//       unit: '', 
//       dimensionsMatch: false,
//       boundariesMatch: false,
//       northDeedDim: '', southDeedDim: '', eastDeedDim: '', westDeedDim: '',
//       northActualDim: '', southActualDim: '', eastActualDim: '', westActualDim: '',
//       northBoundaryDeed: '', southBoundaryDeed: '', eastBoundaryDeed: '', westBoundaryDeed: '',
//       northBoundaryActual: '', southBoundaryActual: '', eastBoundaryActual: '', westBoundaryActual: ''
//     },
//     floors: [],
//     market: { yearOfConstruction: '', renovation: '', parking: '', lift: '', rentalMin: '', rentalMax: '', rentalUnit: '', kitchenType: '', marketClientMin: '', marketClientMax: '', marketClientUnit: '', marketDealerMin: '', marketDealerMax: '', marketDealerUnit: '', marketMarketMin: '', marketMarketMax: '', marketMarketUnit: '', dealerName: '', dealerMobile: '', additionalDetails: [] },
//     negativePoints: [],
//     uploads: { photos: [], documents: [] }
//   });

//   useEffect(() => {
//     const fetchCustomers = async () => {
//       try {
//         const data = await api.getCustomerProfiles();
//         setCustomers(data);
//       } catch (error) {
//         console.error("Failed to fetch customers:", error);
//       } finally {
//         setIsLoadingCustomers(false);
//       }
//     };
//     fetchCustomers();
//   }, []);

//   const handleCustomerSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     const selectedId = e.target.value;
//     const selectedCustomer = customers.find(c => c.id === selectedId);

//     if (selectedCustomer) {
//       setFormData(prev => ({
//         ...prev,
//         customer: selectedId,
//         clientBank: { ...prev.clientBank, ...selectedCustomer.clientBank },
//         owner: { ...prev.owner, ...selectedCustomer.owner }
//       }));
//     } else {
//       setFormData(prev => ({ ...prev, customer: '' }));
//     }
//   };

//   const handleStepContinue = () => {
//     if (currentStep < 4) { setCurrentStep(prev => prev + 1); window.scrollTo({ top: 0, behavior: 'smooth' }); }
//     else { handleSubmit(); }
//   };

//   const handleStepBack = () => {
//     if (currentStep > 1) { setCurrentStep(prev => prev - 1); window.scrollTo({ top: 0, behavior: 'smooth' }); }
//   };

//   const handleSubmit = async () => {
//     if (!isConfirmed) { alert('Please check the confirmation box to submit.'); return; }
//     setIsSubmitting(true);
    
//     try {
//       // 1. Await Firebase Storage uploads to get actual remote URLs
//       const customerIdPath = formData.customer || "unknown_customer";
      
//       const uploadedPhotosUrls = await Promise.all(
//         formData.uploads.photos.map(file => 
//           uploadFile(file, `valuation-records/${customerIdPath}/photos/${Date.now()}_${file.name}`)
//         )
//       );
      
//       const uploadedDocumentsUrls = await Promise.all(
//         formData.uploads.documents.map(file => 
//           uploadFile(file, `valuation-records/${customerIdPath}/documents/${Date.now()}_${file.name}`)
//         )
//       );

//       // 2. Attach generated URLs to the final backend payload
//       const payload = {
//         customer: formData.customer,
//         clientBank: formData.clientBank,
//         owner: formData.owner,
//         locality: formData.locality,
//         property: formData.property,
//         boundaries: formData.boundaries,
//         floors: formData.floors,
//         market: formData.market,
//         negativePoints: formData.negativePoints,
//         uploads: { 
//           photos: uploadedPhotosUrls, 
//           documents: uploadedDocumentsUrls 
//         }
//       };

//       await api.createValuationRecord(payload);
//       setIsSubmittedSuccessfully(true);

//     } catch (e) { 
//       console.error("Failed to submit report:", e); 
//       alert("An error occurred while uploading files or submitting the report.");
//     } finally { 
//       setIsSubmitting(false); 
//     }
//   };

//   if (isSubmittedSuccessfully) {
//     return (
//       <div className="flex flex-col flex-1 w-full relative min-h-screen md:min-h-0 bg-white overflow-hidden items-center justify-center p-6">
//         <div className="w-[88px] h-[88px] rounded-full flex items-center justify-center bg-[#f0f8fd] mb-6">
//           <div className="w-[60px] h-[60px] rounded-full bg-white flex items-center justify-center shadow-sm">
//             <div className="w-[32px] h-[32px] bg-[#00a0ef] rounded-full flex items-center justify-center"><Check className="w-4 h-4 text-white" strokeWidth={3.5} /></div>
//           </div>
//         </div>
//         <h2 className="text-[20px] lg:text-[24px] font-bold text-gray-900 mb-3 text-center">Report submitted successfully.</h2>
//         <p className="text-[#8A94A6] text-[14px] md:text-[15px] mb-8 text-center max-w-sm">Files uploaded and data verified.</p>
//         <button onClick={() => window.location.reload()} className="px-8 py-3 bg-[#00a0ef] hover:bg-[#008bd1] rounded-lg text-white font-medium transition-colors">Start New Report</button>
//       </div>
//     );
//   }

//   const isUploadsReady = formData.uploads.photos.length > 0 && formData.uploads.documents.length > 0;
//   const isSubmitDisabled = isSubmitting || (currentStep === 4 && (!isConfirmed || !isUploadsReady));

//   return (
//     <div className="min-h-screen bg-gray-50 flex flex-col md:py-8">
//       <div className="flex-1 flex flex-col w-full md:max-w-4xl md:mx-auto bg-white border-x md:border border-gray-200 md:rounded-xl md:shadow-sm overflow-hidden">
        
//         <div className="px-4 md:px-6 py-4 border-b border-gray-200 bg-white flex flex-col md:flex-row md:items-center justify-between gap-4">
//           <h1 className="text-lg md:text-xl font-medium text-gray-900">Submit New Report</h1>
//           <div className="relative w-full md:w-64">
//             <select 
//               className={`${inputStyles} appearance-none bg-blue-50/30 border-[#00a0ef]/30 font-medium disabled:opacity-50 disabled:cursor-not-allowed`} 
//               value={formData.customer} 
//               onChange={handleCustomerSelect}
//               disabled={isLoadingCustomers}
//             >
//               <option value="">
//                 {isLoadingCustomers ? 'Loading Customers...' : 'Select Customer (Prefill)...'}
//               </option>
              
//               {customers.map((c) => (
//                 <option key={c.id} value={c.id}>
//                   {c.profileReference || `${c.owner?.ownerName || 'Unknown'} - ${c.clientBank?.bankName || 'Unknown Bank'}`}
//                 </option>
//               ))}
//             </select>
//             <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
//           </div>
//         </div>

//         <div className="px-6 pt-10 pb-6 md:pt-12 md:pb-8 border-b border-gray-200 bg-white shrink-0">
//           <div className="max-w-xl mx-auto relative">
//             <div className="flex items-center justify-between relative">
//               <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[2px] bg-gray-200" />
//               {[1, 2, 3, 4].map((step) => {
//                 const isCompleted = step < currentStep;
//                 const isCurrent = step === currentStep;
//                 return (
//                   <div key={step} className="relative z-10 flex flex-col items-center">
//                     <span className={`absolute -top-7 whitespace-nowrap text-xs font-semibold tracking-wide ${isCompleted || isCurrent ? 'text-[#00a0ef]' : 'text-gray-400'}`}>STEP {step}</span>
//                     <div className={`w-8 h-8 rounded-full flex items-center justify-center bg-white ${isCompleted ? 'border-2 border-[#00a0ef] bg-[#00a0ef]' : isCurrent ? 'border-2 border-[#00a0ef]' : 'border-2 border-gray-300'}`}>
//                       {isCompleted && <CircleCheck color='white' fill='#00a0ef' />}
//                       {isCurrent && <div className="w-4 h-4 bg-[#00a0ef] rounded-full" />}
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         </div>

//         <div className="flex-1 overflow-y-auto bg-gray-50 md:p-6">
//           {currentStep === 1 && <Step1Form formData={formData} setFormData={setFormData} />}
//           {currentStep === 2 && <Step2Form formData={formData} setFormData={setFormData} />}
//           {currentStep === 3 && <Step3Form formData={formData} setFormData={setFormData} />}
//           {currentStep === 4 && <Step4Form formData={formData} onEditStep={setCurrentStep} isConfirmed={isConfirmed} setIsConfirmed={setIsConfirmed} />}
//         </div>
        
//         <div className="p-4 md:px-6 md:py-5 bg-white border-t border-gray-200 flex items-center justify-between mt-auto shrink-0">
//           <button onClick={handleStepBack} className={`flex items-center px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 text-[13px] font-medium hover:bg-gray-50 transition-colors ${currentStep === 1 ? 'invisible' : ''}`}>
//             <ArrowLeft className="w-4 h-4 mr-2" /> Back
//           </button>
//           <button onClick={handleStepContinue} disabled={isSubmitDisabled} className="flex items-center px-6 py-2.5 bg-[#00a0ef] hover:bg-[#008bd1] rounded-lg text-white text-[13px] font-medium transition-shadow shadow-sm hover:shadow-md disabled:opacity-60">
//             {isSubmitting ? 'Uploading & Submitting...' : currentStep === 4 ? 'Submit Report' : `Continue to Step ${currentStep + 1}`}
//             {!isSubmitting && currentStep !== 4 && <ArrowRight className="w-4 h-4 ml-2" />}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// 'use client';

// import React, { useState, useEffect, useCallback, useRef } from 'react';
// import { Building, Landmark, CheckCircle2, UploadCloud, X, FileText, Edit2, CircleCheck, Plus, Trash2, Check, RotateCcw, ArrowLeft, ArrowRight, ChevronDown } from 'lucide-react';
// import { APIProvider, Map, AdvancedMarker, useMap } from "@vis.gl/react-google-maps";
// import { api } from '@/app/lib/userApis';
// import { uploadFile } from "@/app/lib/firebase/storageUtils";

// type Coord = { lat: number; lng: number };
// type Pin = { id: number; coord: Coord };
// type Mode = "picking" | "submitted";

// const MAX = 10;
// const LABELS = ["P1", "P2", "P3", "P4", "P5", "P6", "P7", "P8", "P9", "P10"];
// const COLORS = ["#00a0ef", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899", "#06b6d4", "#14b8a6", "#f97316", "#6366f1"];

// export interface FloorDetail {
//   id: string;
//   floorName: string;
//   possessionWith: string;
//   unit: string;
//   length: string;
//   breadth: string;
//   conversionUnit: string;
//   coveredArea: string;
//   condition: string;
//   structure: string;
//   flooring: string;
//   accommodation: string;
//   doorsWindows: string;
//   floorRemarks: string;
// }

// // ─── FULLY UPDATED APP STATE ───
// interface AppState {
//   customer: string;
//   clientBank: { ifsc: string; bankName: string; branch: string; email: string; contactPersonName: string; contactPersonNumber: string; dateOfInspection: string; dateOfValuation: string; propertyType: string; purposeOfValuation: string; };
//   owner: { prefix: string; ownerName: string; relation: string; relationName: string; occupation: string; phone1: string; phone2: string; };
//   locality: { urbanRural: string; localityClass: string; landTenure: string; widthOfRoad: string; noOfStories: string; sanitaryFitting: string; electricalFitting: string; townplan: string; };
//   property: { address: string; natureOfProperty: string; vacantPlot: string; widthOfRoad: string; latitude: string; longitude: string; boundaryCoordinates: Coord[]; plotShape: string; dimensionUnit: string; length: string; breadth: string; conversionUnit: string; calculatedArea: string; wallUnit: string; wallLength: string; wallHeight: string; wallsOnSide: string; brickType: string; };
//   boundaries: { 
//     unit: string; 
//     dimensionsMatch: boolean;
//     boundariesMatch: boolean; 
//     northDeedDim: string; southDeedDim: string; eastDeedDim: string; westDeedDim: string; 
//     northActualDim: string; southActualDim: string; eastActualDim: string; westActualDim: string; 
//     northBoundaryDeed: string; southBoundaryDeed: string; eastBoundaryDeed: string; westBoundaryDeed: string; 
//     northBoundaryActual: string; southBoundaryActual: string; eastBoundaryActual: string; westBoundaryActual: string;
//   };
//   floors: FloorDetail[];
//   market: { yearOfConstruction: string; renovation: string; parking: string; lift: string; rentalMin: string; rentalMax: string; rentalUnit: string; kitchenType: string; marketClientMin: string; marketClientMax: string; marketClientUnit: string; marketDealerMin: string; marketDealerMax: string; marketDealerUnit: string; marketMarketMin: string; marketMarketMax: string; marketMarketUnit: string; dealerName: string; dealerMobile: string; additionalDetails: { key: string; value: string }[]; };
//   negativePoints: string[];
//   uploads: { photos: File[]; documents: File[]; };
// }

// const inputStyles = "w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-[#00a0ef] focus:ring-1 focus:ring-[#00a0ef] text-[13px] text-gray-900 bg-white shadow-sm transition-shadow";
// const labelStyles = "block text-[13px] font-semibold text-gray-700 mb-2";

// const RadioGroup = ({ options, value, onChange }: { options: string[], value: string, onChange: (val: string) => void }) => {
//   const isCustom = value !== '' && !options.includes(value);
//   const [showCustom, setShowCustom] = useState(isCustom);

//   return (
//     <div className="flex flex-wrap gap-2 items-center">
//       {options.map(opt => (
//         <button key={opt} type="button" onClick={() => { setShowCustom(false); onChange(opt); }}
//           className={`px-3 py-2 rounded-lg text-[13px] font-medium transition-all border ${!showCustom && value === opt ? 'bg-blue-50 border-[#00a0ef] text-[#00a0ef] shadow-sm' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'}`}>
//           {opt}
//         </button>
//       ))}
//       <div className="flex items-center gap-2">
//         {!showCustom && (
//           <button type="button" onClick={() => { setShowCustom(true); onChange(''); }}
//             className={`px-3 py-2 rounded-lg text-[13px] font-medium transition-all border bg-white border-gray-200 text-gray-600 hover:bg-gray-50`}>
//             Other / Add Option
//           </button>
//         )}
//         {showCustom && (
//           <div className="flex items-center gap-1 bg-white border border-gray-300 rounded-lg pr-1 shadow-sm focus-within:border-[#00a0ef] focus-within:ring-1 focus-within:ring-[#00a0ef]">
//             <input type="text" placeholder="Type custom option..." className="px-3 py-2 text-[13px] rounded-l-lg focus:outline-none border-none w-40" value={value} onChange={e => onChange(e.target.value)} autoFocus />
//             <button type="button" onClick={() => { setShowCustom(false); onChange(''); }} className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors">
//               <X size={14} />
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// const MultiSelectGroup = ({ options, selected, onChange }: { options: string[], selected: string[], onChange: (val: string[]) => void }) => {
//   const toggle = (opt: string) => selected.includes(opt) ? onChange(selected.filter(i => i !== opt)) : onChange([...selected, opt]);
//   const customValues = selected.filter(val => !options.includes(val));
//   const [customInput, setCustomInput] = useState('');

//   const handleAddCustom = () => {
//     if (customInput.trim() && !selected.includes(customInput.trim())) {
//       onChange([...selected, customInput.trim()]);
//       setCustomInput('');
//     }
//   };

//   return (
//     <div className="flex flex-col gap-3">
//       <div className="flex flex-wrap gap-2">
//         {options.map(opt => (
//           <button key={opt} type="button" onClick={() => toggle(opt)}
//             className={`px-3 py-2 rounded-lg text-[13px] font-medium transition-all border ${selected.includes(opt) ? 'bg-blue-50 border-[#00a0ef] text-[#00a0ef] shadow-sm' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'}`}>
//             {opt}
//           </button>
//         ))}
//         {customValues.map(opt => (
//           <button key={opt} type="button" onClick={() => toggle(opt)}
//             className="px-3 py-2 rounded-lg text-[13px] font-medium transition-all border bg-blue-50 border-[#00a0ef] text-[#00a0ef] shadow-sm flex items-center gap-2">
//             {opt} <X className="w-3 h-3" />
//           </button>
//         ))}
//       </div>
//       <div className="flex items-center gap-2">
//         <input type="text" placeholder="Add custom option..." className="px-3 py-2 text-[13px] border border-gray-300 rounded-lg focus:outline-none focus:border-[#00a0ef] w-48 shadow-sm" value={customInput} onChange={e => setCustomInput(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddCustom(); } }} />
//         <button type="button" onClick={handleAddCustom} className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-[13px] font-medium hover:bg-gray-200 transition-colors">Add</button>
//       </div>
//     </div>
//   );
// };

// function NextSectionButton({ onClick, nextFocusId }: { onClick: () => void, nextFocusId: string }) {
//   const handleAction = (e: React.MouseEvent | React.KeyboardEvent) => {
//     e.preventDefault();
//     onClick();
//     setTimeout(() => document.getElementById(nextFocusId)?.focus(), 50);
//   };
//   return (
//     <div className="md:col-span-full flex justify-end mt-4 border-t border-gray-200/50 pt-4">
//       <button type="button" onClick={handleAction} onKeyDown={(e) => { if (e.key === 'Tab' && !e.shiftKey) { handleAction(e); } }} className="text-[#00a0ef] text-[13px] font-bold hover:underline flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-[#00a0ef] focus:ring-offset-2 rounded px-3 py-1.5 transition-colors">
//         Next Section <ArrowRight className="w-4 h-4" />
//       </button>
//     </div>
//   );
// }

// function GeoCoordinatePicker({ onCoordinatesSubmit }: { onCoordinatesSubmit: (coords: Coord[]) => void }) {
//   const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "";
//   const [center, setCenter] = useState<Coord>({ lat: 20, lng: 78 });
//   const [zoom, setZoom] = useState(4);
//   const [mode, setMode] = useState<Mode>("picking");
//   const [pins, setPins] = useState<Pin[]>([]);
//   const [nextId, setNextId] = useState(0);
//   const [submitted, setSubmitted] = useState<Pin[]>([]);
//   const [editTarget, setEditTarget] = useState<number | null>(null);
//   const [userLocation, setUserLocation] = useState<Coord | null>(null);

//   useEffect(() => {
//     if ("geolocation" in navigator) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const userLoc = { lat: position.coords.latitude, lng: position.coords.longitude };
//           setUserLocation(userLoc); setCenter(userLoc); setZoom(18);
//         },
//         (error) => console.error("Error getting user location:", error),
//         { enableHighAccuracy: true }
//       );
//     }
//   }, []);

//   const handleMapClick = useCallback((coord: Coord) => {
//     if (mode === "picking") {
//       if (pins.length >= MAX) return;
//       setPins((prev) => [...prev, { id: nextId, coord }]);
//       setNextId((n) => n + 1); return;
//     }
//     if (mode === "submitted" && editTarget !== null) {
//       setSubmitted((prev) => prev.map((p, i) => (i === editTarget ? { ...p, coord } : p)));
//       setEditTarget(null);
//     }
//   }, [mode, pins.length, nextId, editTarget]);

//   const handleSubmit = () => {
//     if (pins.length === 0) return;
//     setSubmitted([...pins]); setMode("submitted"); setEditTarget(null);
//     onCoordinatesSubmit(pins.map(p => p.coord));
//   };

//   return (
//     <div className="flex flex-col w-full bg-white border border-gray-300 rounded-xl overflow-hidden shadow-sm">
//       <div className="relative w-full h-64 md:h-80 bg-gray-100">
//         <APIProvider apiKey={apiKey}>
//           <Map mapId="geo-picker-form" center={center} zoom={zoom} mapTypeId="satellite"
//             onCameraChanged={(ev) => { setCenter(ev.detail.center); setZoom(ev.detail.zoom); }}
//             gestureHandling="greedy" colorScheme="LIGHT" mapTypeControl={true} zoomControl={true} fullscreenControl={true} streetViewControl={true}
//             style={{ width: "100%", height: "100%" }}>
//             {userLocation && (
//               <AdvancedMarker position={userLocation}>
//                 <div className="relative"><div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-lg" /><div className="absolute inset-0 w-4 h-4 bg-blue-400 rounded-full animate-ping opacity-40" /></div>
//               </AdvancedMarker>
//             )}
//             <ClickHandler onClick={handleMapClick} />
//             {(mode === "picking" ? pins : submitted).map((pin, i) => (
//               <AdvancedMarker key={pin.id} position={pin.coord} zIndex={editTarget === i ? 100 : i}>
//                 <button type="button" onClick={(e) => { e.stopPropagation(); if (mode === "submitted") setEditTarget(editTarget === i ? null : i); }}
//                   className={`flex items-center justify-center rounded-full font-bold text-white text-xs shadow-md transition-all ${editTarget === i ? "w-10 h-10 ring-4 ring-white scale-110" : "w-8 h-8 ring-2 ring-white/80 scale-100"} ${mode === "submitted" ? "cursor-pointer" : "cursor-default"}`}
//                   style={{ backgroundColor: COLORS[i] }}>{LABELS[i]}</button>
//               </AdvancedMarker>
//             ))}
//           </Map>
//         </APIProvider>
//       </div>
//       <div className="p-4 bg-gray-50 border-t border-gray-200">
//         {mode === "picking" ? (
//           <button type="button" onClick={handleSubmit} disabled={pins.length === 0}
//             className={`w-full py-2.5 rounded-lg text-sm font-semibold transition-colors flex items-center justify-center gap-2 ${pins.length > 0 ? "bg-[#00a0ef] text-white hover:bg-[#008bd1] shadow-sm" : "bg-gray-200 text-gray-400 cursor-not-allowed"}`}>
//             {pins.length > 0 ? <><CheckCircle2 className="w-4 h-4" /> Confirm Boundaries</> : "Place at least 1 point"}
//           </button>
//         ) : (
//           <button type="button" onClick={() => { setPins([]); setSubmitted([]); setMode("picking"); setEditTarget(null); setNextId(0); }}
//             className="w-full py-2.5 rounded-lg text-sm font-semibold transition-colors flex items-center justify-center gap-2 bg-red-50 text-red-600 hover:bg-red-100">
//             <RotateCcw className="w-4 h-4" /> Reset Boundaries
//           </button>
//         )}
//       </div>
//     </div>
//   );
// }

// function ClickHandler({ onClick }: { onClick: (c: Coord) => void }) {
//   const map = useMap();
//   useEffect(() => {
//     if (!map) return;
//     const listener = map.addListener("click", (e: google.maps.MapMouseEvent) => {
//       if (e.latLng) onClick({ lat: e.latLng.lat(), lng: e.latLng.lng() });
//     });
//     return () => { google.maps.event.removeListener(listener); };
//   }, [map, onClick]);
//   return null;
// }

// function Step1Form({ formData, setFormData }: { formData: AppState; setFormData: (val: any) => void }) {
//   const [activeSection, setActiveSection] = useState<string>('clientBank');

//   const updateSection = (section: keyof AppState, field: string, value: any) => {
//     setFormData((prev: AppState) => ({ ...prev, [section]: { ...(prev[section] as any), [field]: value } }));
//   };

//   const handleDimensionChange = (dir: string, type: 'DeedDim' | 'ActualDim', value: string) => {
//     const key = `${dir}${type}`;
//     updateSection('boundaries', key, value);

//     if (type === 'DeedDim' && formData.boundaries.dimensionsMatch) {
//       updateSection('boundaries', `${dir}ActualDim`, value);
//     }
//   };

//   const handleTextBoundaryChange = (dir: string, type: 'Deed' | 'Actual', value: string) => {
//     const key = `${dir}Boundary${type}`;
//     updateSection('boundaries', key, value);

//     if (type === 'Deed' && formData.boundaries.boundariesMatch) {
//       updateSection('boundaries', `${dir}BoundaryActual`, value);
//     }
//   };

//   const renderSectionHeader = (title: string, id: string) => (
//     <div className={`flex items-center justify-between p-4 md:px-6 md:py-5 cursor-pointer transition-colors ${activeSection === id ? 'bg-blue-50/50 border-b border-blue-100' : 'bg-white hover:bg-gray-50 border-b border-gray-100'}`} onClick={() => setActiveSection(activeSection === id ? '' : id)}>
//       <h3 className="font-bold md:text-[15px] text-[#00a0ef]">{title}</h3>
//       <ChevronDown className={`w-5 h-5 text-[#00a0ef] transition-transform ${activeSection === id ? 'rotate-180' : ''}`} />
//     </div>
//   );

//   return (
//     <div className="bg-white border border-gray-200 md:rounded-xl overflow-hidden shadow-sm divide-y divide-gray-100">
      
//       <div>
//         {renderSectionHeader('Client / Bank Details', 'clientBank')}
//         {activeSection === 'clientBank' && (
//           <div className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 bg-blue-50/10">
//             <div><label className={labelStyles}>IFSC Code</label><input id="clientBank-first" type="text" className={inputStyles} value={formData.clientBank.ifsc} onChange={e => updateSection('clientBank', 'ifsc', e.target.value)} /></div>
//             <div><label className={labelStyles}>Bank Name</label><input type="text" className={inputStyles} value={formData.clientBank.bankName} onChange={e => updateSection('clientBank', 'bankName', e.target.value)} /></div>
//             <div><label className={labelStyles}>Branch</label><input type="text" className={inputStyles} value={formData.clientBank.branch} onChange={e => updateSection('clientBank', 'branch', e.target.value)} /></div>
//             <div><label className={labelStyles}>Email ID</label><input type="email" className={inputStyles} value={formData.clientBank.email} onChange={e => updateSection('clientBank', 'email', e.target.value)} /></div>
//             <div><label className={labelStyles}>Point of Contact Name</label><input type="text" className={inputStyles} value={formData.clientBank.contactPersonName} onChange={e => updateSection('clientBank', 'contactPersonName', e.target.value)} /></div>
//             <div><label className={labelStyles}>Point of Contact Number</label><input type="tel" className={inputStyles} value={formData.clientBank.contactPersonNumber} onChange={e => updateSection('clientBank', 'contactPersonNumber', e.target.value)} /></div>
//             <div><label className={labelStyles}>Date of Inspection</label><input type="date" className={inputStyles} value={formData.clientBank.dateOfInspection} onChange={e => updateSection('clientBank', 'dateOfInspection', e.target.value)} /></div>
//             <div><label className={labelStyles}>Date Valuation</label><input type="date" className={inputStyles} value={formData.clientBank.dateOfValuation} onChange={e => updateSection('clientBank', 'dateOfValuation', e.target.value)} /></div>
            
//             <div className="md:col-span-2">
//               <label className={labelStyles}>Type of Property</label>
//               <RadioGroup options={['Vacant Land - Residential', 'Existing Building - Residential', 'Open Piece of Land', 'Residential Flat', 'Agri Land', 'Residential Villa', 'Industrial Shed']} value={formData.clientBank.propertyType} onChange={v => updateSection('clientBank', 'propertyType', v)} />
//             </div>
//             <div className="md:col-span-2">
//               <label className={labelStyles}>Purpose of Valuation (Loan Type)</label>
//               <RadioGroup options={['Home Loan', 'Mortgage Loan', 'Education Loan', 'Collateral Security', 'For Bank Loan / Mortgage Purpose']} value={formData.clientBank.purposeOfValuation} onChange={v => updateSection('clientBank', 'purposeOfValuation', v)} />
//             </div>
//             <NextSectionButton onClick={() => setActiveSection('ownerLocality')} nextFocusId="owner-first" />
//           </div>
//         )}
//       </div>

//       <div>
//         {renderSectionHeader('Owner Details & Locality Classification', 'ownerLocality')}
//         {activeSection === 'ownerLocality' && (
//           <div className="p-4 md:p-6 bg-blue-50/10">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 border-b border-gray-200 pb-6 mb-6">
//               <div className="md:col-span-2 flex gap-3">
//                 <div className="w-1/3 md:w-1/4">
//                   <label className={labelStyles}>Prefix</label>
//                   <div className="relative">
//                     <select id="owner-first" className={`${inputStyles} appearance-none bg-white`} value={formData.owner.prefix} onChange={e => {
//                       const val = e.target.value;
//                       updateSection('owner', 'prefix', val);
//                       if (val === 'Smt' || val === 'Mrs') updateSection('owner', 'relation', 'W/o');
//                       else if (val === 'Shri' || val === 'Mr') updateSection('owner', 'relation', 'S/o');
//                     }}>
//                       <option value="Shri">Shri</option>
//                       <option value="Smt">Smt</option>
//                       <option value="Mr">Mr</option>
//                       <option value="Mrs">Mrs</option>
//                     </select>
//                     <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
//                   </div>
//                 </div>
//                 <div className="flex-1"><label className={labelStyles}>Owner Name</label><input type="text" className={inputStyles} value={formData.owner.ownerName} onChange={e => updateSection('owner', 'ownerName', e.target.value)} /></div>
//               </div>
//               <div className="md:col-span-2 flex gap-3">
//                 <div className="w-1/3 md:w-1/4">
//                   <label className={labelStyles}>Relation</label>
//                   <div className="relative">
//                     <select className={`${inputStyles} appearance-none bg-white`} value={formData.owner.relation} onChange={e => updateSection('owner', 'relation', e.target.value)}>
//                       <option value="S/o">S/o</option>
//                       <option value="D/o">D/o</option>
//                       <option value="W/o">W/o</option>
//                       <option value="F/o">F/o</option>
//                     </select>
//                     <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
//                   </div>
//                 </div>
//                 <div className="flex-1"><label className={labelStyles}>Relative's Name</label><input type="text" className={inputStyles} value={formData.owner.relationName} onChange={e => updateSection('owner', 'relationName', e.target.value)} /></div>
//               </div>
//               <div className="md:col-span-2"><label className={labelStyles}>Occupation</label><input type="text" className={inputStyles} value={formData.owner.occupation} onChange={e => updateSection('owner', 'occupation', e.target.value)} /></div>
//               <div><label className={labelStyles}>Phone Number 1</label><input type="tel" className={inputStyles} value={formData.owner.phone1} onChange={e => updateSection('owner', 'phone1', e.target.value)} /></div>
//               <div><label className={labelStyles}>Phone Number 2</label><input type="tel" className={inputStyles} value={formData.owner.phone2} onChange={e => updateSection('owner', 'phone2', e.target.value)} /></div>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div className="md:col-span-2"><label className={labelStyles}>Rural / Urban</label><RadioGroup options={['metro city', 'urban', 'semi urban rural', 'N/A']} value={formData.locality.urbanRural} onChange={v => updateSection('locality', 'urbanRural', v)} /></div>
//               <div className="md:col-span-2"><label className={labelStyles}>Locality Class</label><RadioGroup options={['high', 'middle', 'low', 'posh', 'N/A']} value={formData.locality.localityClass} onChange={v => updateSection('locality', 'localityClass', v)} /></div>
//               <div className="md:col-span-2"><label className={labelStyles}>Land Tenure</label><RadioGroup options={['freehold', 'leasehold', 'N/A']} value={formData.locality.landTenure} onChange={v => updateSection('locality', 'landTenure', v)} /></div>
//               <div className="md:col-span-2"><label className={labelStyles}>Width of Road</label><RadioGroup options={['< 10ft', '< 20ft', '> 20ft']} value={formData.locality.widthOfRoad} onChange={v => updateSection('locality', 'widthOfRoad', v)} /></div>
//               <div className="md:col-span-2"><label className={labelStyles}>No. of Stories</label><RadioGroup options={['1', '2', '3', '4', '5', '6', '7', '8', '9', 'vacant']} value={formData.locality.noOfStories} onChange={v => updateSection('locality', 'noOfStories', v)} /></div>
//               <div className="md:col-span-2"><label className={labelStyles}>Sanitary Fitting</label><RadioGroup options={['ordinary', 'good', 'superior', 'premium', 'excellent', 'under construction']} value={formData.locality.sanitaryFitting} onChange={v => updateSection('locality', 'sanitaryFitting', v)} /></div>
//               <div className="md:col-span-2"><label className={labelStyles}>Electrical Fitting</label><RadioGroup options={['ordinary', 'good', 'superior', 'premium', 'excellent', 'under construction']} value={formData.locality.electricalFitting} onChange={v => updateSection('locality', 'electricalFitting', v)} /></div>
//               <div className="md:col-span-2"><label className={labelStyles}>Townplan / MC / GP</label><RadioGroup options={['MC', 'townplanning', 'gram panchayat', 'outside Mc']} value={formData.locality.townplan} onChange={v => updateSection('locality', 'townplan', v)} /></div>
//             </div>
//             <NextSectionButton onClick={() => setActiveSection('property')} nextFocusId="property-first" />
//           </div>
//         )}
//       </div>

//       <div>
//         {renderSectionHeader('Property Details', 'property')}
//         {activeSection === 'property' && (
//           <div className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-2 gap-6 bg-blue-50/10">
//             <div className="md:col-span-2">
//               <label className={labelStyles} id="property-first">Geo Location & Coordinates</label>
//               <GeoCoordinatePicker 
//                 onCoordinatesSubmit={(coords) => {
//                   updateSection('property', 'boundaryCoordinates', coords);
//                   if (coords.length > 0) {
//                     updateSection('property', 'latitude', coords[0].lat.toString());
//                     updateSection('property', 'longitude', coords[0].lng.toString());
//                   }
//                 }} 
//               />
//               <div className="flex gap-4 mt-4">
//                 <input type="text" placeholder="Latitude" className={inputStyles} value={formData.property.latitude} readOnly />
//                 <input type="text" placeholder="Longitude" className={inputStyles} value={formData.property.longitude} readOnly />
//               </div>
//             </div>
            
//             <div className="md:col-span-2"><label className={labelStyles}>Address</label><textarea rows={3} className={inputStyles} value={formData.property.address} onChange={e => updateSection('property', 'address', e.target.value)} /></div>
            
//             <div className="md:col-span-2"><label className={labelStyles}>Nature of Property</label><RadioGroup options={['Residential', 'Commercial', 'Industrial', 'Agriculture', 'mixed', 'institutional', 'N/A']} value={formData.property.natureOfProperty} onChange={v => updateSection('property', 'natureOfProperty', v)} /></div>
//             <div className="md:col-span-1"><label className={labelStyles}>Vacant Plot?</label><RadioGroup options={['yes', 'NO']} value={formData.property.vacantPlot} onChange={v => updateSection('property', 'vacantPlot', v)} /></div>
//             <div className="md:col-span-1"><label className={labelStyles}>Width of Road</label><RadioGroup options={['< 10ft', '< 20ft', '> 20ft']} value={formData.property.widthOfRoad} onChange={v => updateSection('property', 'widthOfRoad', v)} /></div>
//             <div className="md:col-span-2"><label className={labelStyles}>Plot Shape</label><RadioGroup options={['Rectangle', 'square', 'triangle', 'irregular', 'polygon']} value={formData.property.plotShape} onChange={v => updateSection('property', 'plotShape', v)} /></div>

//             <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border border-gray-200 bg-white rounded-xl">
//               <div className="md:col-span-3"><label className={labelStyles}>Dimension Unit</label><RadioGroup options={['ft', 'm', 'inch']} value={formData.property.dimensionUnit} onChange={v => updateSection('property', 'dimensionUnit', v)} /></div>
//               <div><label className={labelStyles}>Length</label><input type="number" className={inputStyles} value={formData.property.length} onChange={e => { updateSection('property', 'length', e.target.value); const b = parseFloat(formData.property.breadth) || 0; updateSection('property', 'calculatedArea', (parseFloat(e.target.value || '0') * b).toString()); }} /></div>
//               <div><label className={labelStyles}>Breadth</label><input type="number" className={inputStyles} value={formData.property.breadth} onChange={e => { updateSection('property', 'breadth', e.target.value); const l = parseFloat(formData.property.length) || 0; updateSection('property', 'calculatedArea', (parseFloat(e.target.value || '0') * l).toString()); }} /></div>
//               <div className="md:col-span-3 border-t border-gray-100 pt-4 mt-2"><label className={labelStyles}>Conversion Unit</label><RadioGroup options={['sq ft', 'sq yd', 'sq mt', 'Acre', 'Hectare', 'Guntas']} value={formData.property.conversionUnit} onChange={v => updateSection('property', 'conversionUnit', v)} /></div>
//               <div className="md:col-span-3"><label className={labelStyles}>Calculated Area (Dimensions converted to selected unit)</label><input type="text" className={`${inputStyles} bg-gray-50`} readOnly value={formData.property.calculatedArea} /></div>
//             </div>

//             <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border border-gray-200 bg-white rounded-xl">
//               <div className="md:col-span-2"><label className={labelStyles}>Wall Unit</label><RadioGroup options={['ft', 'm', 'inch']} value={formData.property.wallUnit} onChange={v => updateSection('property', 'wallUnit', v)} /></div>
//               <div><label className={labelStyles}>Wall Length</label><input type="number" className={inputStyles} value={formData.property.wallLength} onChange={e => updateSection('property', 'wallLength', e.target.value)} /></div>
//               <div><label className={labelStyles}>Wall Height</label><input type="number" className={inputStyles} value={formData.property.wallHeight} onChange={e => updateSection('property', 'wallHeight', e.target.value)} /></div>
//               <div className="md:col-span-2"><label className={labelStyles}>Walls on Side</label><RadioGroup options={['1', '2', '3', '4']} value={formData.property.wallsOnSide} onChange={v => updateSection('property', 'wallsOnSide', v)} /></div>
//               <div className="md:col-span-2"><label className={labelStyles}>Type of Brick</label><RadioGroup options={['brick work', 'Rcc', 'pacca offset / pavement']} value={formData.property.brickType} onChange={v => updateSection('property', 'brickType', v)} /></div>
//             </div>

//             <NextSectionButton onClick={() => setActiveSection('boundaries')} nextFocusId="boundaries-first" />
//           </div>
//         )}
//       </div>

//       <div>
//         {renderSectionHeader('Boundaries & Negative Points', 'boundaries')}
//         {activeSection === 'boundaries' && (
//           <div className="p-4 md:p-6 bg-blue-50/10 space-y-8">
//             <div className="md:col-span-2">
//               <label className={labelStyles} id="boundaries-first">Boundary Unit</label>
//               <RadioGroup options={['length', 'feet', 'meters', 'inchs']} value={formData.boundaries.unit} onChange={v => updateSection('boundaries', 'unit', v)} />
//             </div>
            
//             {/* 1. Boundary Dimensions (Numbers) */}
//             <div>
//               <div className="flex items-center justify-between mb-3">
//                 <h4 className="text-[13px] font-bold text-[#00a0ef]">Boundary Dimensions</h4>
//                 <label className="flex items-center gap-2 text-[12px] font-semibold text-gray-700 cursor-pointer bg-white px-3 py-1.5 rounded-lg border border-gray-200 shadow-sm">
//                   <input 
//                     type="checkbox" 
//                     className="w-4 h-4 text-[#00a0ef] rounded border-gray-300 focus:ring-[#00a0ef]"
//                     checked={formData.boundaries.dimensionsMatch} 
//                     onChange={(e) => {
//                       const checked = e.target.checked;
//                       updateSection('boundaries', 'dimensionsMatch', checked);
//                       if (checked) {
//                         updateSection('boundaries', 'northActualDim', formData.boundaries.northDeedDim);
//                         updateSection('boundaries', 'southActualDim', formData.boundaries.southDeedDim);
//                         updateSection('boundaries', 'eastActualDim', formData.boundaries.eastDeedDim);
//                         updateSection('boundaries', 'westActualDim', formData.boundaries.westDeedDim);
//                       }
//                     }} 
//                   />
//                   Actual dimensions match document
//                 </label>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-4 rounded-xl border border-gray-200">
//                 {(['north', 'south', 'east', 'west'] as const).map(dir => (
//                   <div key={`${dir}Dim`} className="flex gap-2">
//                     <div className="flex-1">
//                       <label className={labelStyles}>{dir.charAt(0).toUpperCase() + dir.slice(1)} (Deed)</label>
//                       <input 
//                         type="text" 
//                         className={inputStyles} 
//                         value={(formData.boundaries as any)[`${dir}DeedDim`]} 
//                         onChange={e => handleDimensionChange(dir, 'DeedDim', e.target.value)} 
//                       />
//                     </div>
//                     <div className="flex-1">
//                       <label className={labelStyles}>{dir.charAt(0).toUpperCase() + dir.slice(1)} (Actual)</label>
//                       <input 
//                         type="text" 
//                         className={`${inputStyles} ${formData.boundaries.dimensionsMatch ? 'bg-gray-100 cursor-not-allowed' : ''}`} 
//                         value={(formData.boundaries as any)[`${dir}ActualDim`]} 
//                         onChange={e => handleDimensionChange(dir, 'ActualDim', e.target.value)} 
//                         disabled={formData.boundaries.dimensionsMatch}
//                       />
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* 2. Textual Boundaries (Neighbors, Properties, etc.) */}
//             <div>
//               <div className="flex items-center justify-between mb-3">
//                 <h4 className="text-[13px] font-bold text-[#00a0ef]">Boundary Descriptions (Neighbors)</h4>
//                 <label className="flex items-center gap-2 text-[12px] font-semibold text-gray-700 cursor-pointer bg-white px-3 py-1.5 rounded-lg border border-gray-200 shadow-sm">
//                   <input 
//                     type="checkbox" 
//                     className="w-4 h-4 text-[#00a0ef] rounded border-gray-300 focus:ring-[#00a0ef]"
//                     checked={formData.boundaries.boundariesMatch} 
//                     onChange={(e) => {
//                       const checked = e.target.checked;
//                       updateSection('boundaries', 'boundariesMatch', checked);
//                       if (checked) {
//                         updateSection('boundaries', 'northBoundaryActual', formData.boundaries.northBoundaryDeed);
//                         updateSection('boundaries', 'southBoundaryActual', formData.boundaries.southBoundaryDeed);
//                         updateSection('boundaries', 'eastBoundaryActual', formData.boundaries.eastBoundaryDeed);
//                         updateSection('boundaries', 'westBoundaryActual', formData.boundaries.westBoundaryDeed);
//                       }
//                     }} 
//                   />
//                   Actual neighbors match document
//                 </label>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-4 rounded-xl border border-gray-200">
//                 {(['north', 'south', 'east', 'west'] as const).map(dir => (
//                   <div key={`${dir}Text`} className="flex gap-2">
//                     <div className="flex-1">
//                       <label className={labelStyles}>{dir.charAt(0).toUpperCase() + dir.slice(1)} Neighbor (Deed)</label>
//                       <input 
//                         type="text" 
//                         placeholder="e.g. H.No 2-1-206"
//                         className={inputStyles} 
//                         value={(formData.boundaries as any)[`${dir}BoundaryDeed`]} 
//                         onChange={e => handleTextBoundaryChange(dir, 'Deed', e.target.value)} 
//                       />
//                     </div>
//                     <div className="flex-1">
//                       <label className={labelStyles}>{dir.charAt(0).toUpperCase() + dir.slice(1)} Neighbor (Actual)</label>
//                       <input 
//                         type="text" 
//                         placeholder="e.g. H.No 2-1-206"
//                         className={`${inputStyles} ${formData.boundaries.boundariesMatch ? 'bg-gray-100 cursor-not-allowed' : ''}`} 
//                         value={(formData.boundaries as any)[`${dir}BoundaryActual`]} 
//                         onChange={e => handleTextBoundaryChange(dir, 'Actual', e.target.value)} 
//                         disabled={formData.boundaries.boundariesMatch}
//                       />
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <div className="border-t border-gray-200 pt-6 mt-6">
//               <label className={labelStyles}>Property Negative Points</label>
//               <MultiSelectGroup 
//                 options={['HT line Over building', 'transformer in front', 'sub division of property', 'community dominace', 'common stair for separate units', 'near rail way track', 'near drain', 'near banquet hall']} 
//                 selected={formData.negativePoints} 
//                 onChange={v => setFormData((prev: AppState) => ({ ...prev, negativePoints: v }))} 
//               />
//             </div>
//           </div>
//         )}
//       </div>

//     </div>
//   );
// }

// function Step2Form({ formData, setFormData }: { formData: AppState; setFormData: (val: any) => void }) {
//   const [activeSection, setActiveSection] = useState<string>('floors');
//   const [activeFloorId, setActiveFloorId] = useState<string>('');

//   useEffect(() => {
//     if (formData.floors.length > 0 && !activeFloorId) setActiveFloorId(formData.floors[0].id);
//   }, [formData.floors]);

//   const handleAddFloor = (floorName: string) => {
//     if (!floorName) return;
//     const existing = formData.floors.find((f: FloorDetail) => f.floorName === floorName);
//     if (existing) {
//       setActiveFloorId(existing.id);
//     } else {
//       const newFloor: FloorDetail = {
//         id: Math.random().toString(36).substr(2, 9),
//         floorName, possessionWith: '', unit: '', length: '', breadth: '', conversionUnit: '', coveredArea: '', condition: '', structure: '', flooring: '', accommodation: '', doorsWindows: '', floorRemarks: ''
//       };
//       setFormData((prev: AppState) => ({ ...prev, floors: [...prev.floors, newFloor] }));
//       setActiveFloorId(newFloor.id);
//     }
//   };

//   const updateFloor = (id: string, field: keyof FloorDetail, value: string) => {
//     setFormData((prev: AppState) => ({
//       ...prev,
//       floors: prev.floors.map(f => {
//         if (f.id === id) {
//           const newF = { ...f, [field]: value };
//           if (field === 'length' || field === 'breadth') {
//             const l = parseFloat(newF.length) || 0;
//             const b = parseFloat(newF.breadth) || 0;
//             newF.coveredArea = (l * b).toString();
//           }
//           return newF;
//         }
//         return f;
//       })
//     }));
//   };

//   const removeFloor = (id: string) => {
//     setFormData((prev: AppState) => {
//       const newFloors = prev.floors.filter(f => f.id !== id);
//       if (activeFloorId === id) setActiveFloorId(newFloors.length > 0 ? newFloors[0].id : '');
//       return { ...prev, floors: newFloors };
//     });
//   };

//   const updateMarket = (field: string, value: any) => {
//     setFormData((prev: AppState) => ({ ...prev, market: { ...prev.market, [field]: value } }));
//   };

//   const renderSectionHeader = (title: string, id: string) => (
//     <div className={`flex items-center justify-between p-4 md:px-6 md:py-5 cursor-pointer transition-colors ${activeSection === id ? 'bg-blue-50/50 border-b border-blue-100' : 'bg-white hover:bg-gray-50 border-b border-gray-100'}`} onClick={() => setActiveSection(activeSection === id ? '' : id)}>
//       <h3 className="font-bold md:text-[15px] text-[#00a0ef]">{title}</h3>
//       <ChevronDown className={`w-5 h-5 text-[#00a0ef] transition-transform ${activeSection === id ? 'rotate-180' : ''}`} />
//     </div>
//   );

//   return (
//     <div className="bg-white border border-gray-200 md:rounded-xl overflow-hidden shadow-sm divide-y divide-gray-100">
      
//       <div>
//         {renderSectionHeader('Building Details (Per Floor)', 'floors')}
//         {activeSection === 'floors' && (
//           <div className="p-4 md:p-6 bg-blue-50/10">
//             <div className="mb-6">
//               <label className={labelStyles}>Select or Add Floor Details</label>
//               <RadioGroup options={['basement', 'stilt', 'GF', 'FF', 'SF', 'TF', '4th', 'multistorey']} value="" onChange={v => handleAddFloor(v)} />
//             </div>

//             {formData.floors.length > 0 && (
//               <div className="flex flex-col md:flex-row gap-4">
//                 <div className="md:w-48 shrink-0 flex flex-col gap-2">
//                   {formData.floors.map(f => (
//                     <div key={f.id} className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${activeFloorId === f.id ? 'bg-[#00a0ef] border-[#00a0ef] text-white shadow-md' : 'bg-white border-gray-200 text-gray-700 hover:border-gray-300'}`} onClick={() => setActiveFloorId(f.id)}>
//                       <span className="font-semibold text-[13px]">{f.floorName}</span>
//                       <button type="button" onClick={(e) => { e.stopPropagation(); removeFloor(f.id); }} className={`p-1 rounded hover:bg-black/10 ${activeFloorId === f.id ? 'text-white' : 'text-gray-400 hover:text-red-500'}`}><Trash2 size={14} /></button>
//                     </div>
//                   ))}
//                 </div>
                
//                 <div className="flex-1 bg-white p-4 md:p-6 rounded-xl border border-gray-200 shadow-sm">
//                   {formData.floors.filter(f => f.id === activeFloorId).map(activeFloor => (
//                     <div key={activeFloor.id} className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                       <div className="md:col-span-2 pb-3 border-b border-gray-100 mb-2">
//                         <h4 className="font-bold text-[#00a0ef] text-[15px]">{activeFloor.floorName} Details</h4>
//                       </div>

//                       <div className="md:col-span-2"><label className={labelStyles}>Possession With</label><RadioGroup options={['owner', 'tenant']} value={activeFloor.possessionWith} onChange={v => updateFloor(activeFloor.id, 'possessionWith', v)} /></div>

//                       <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4">
//                         <div><label className={labelStyles}>Unit</label><RadioGroup options={['feet', 'inch', 'meter']} value={activeFloor.unit} onChange={v => updateFloor(activeFloor.id, 'unit', v)} /></div>
//                         <div><label className={labelStyles}>Length</label><input type="number" className={inputStyles} value={activeFloor.length} onChange={e => updateFloor(activeFloor.id, 'length', e.target.value)} /></div>
//                         <div><label className={labelStyles}>Breadth</label><input type="number" className={inputStyles} value={activeFloor.breadth} onChange={e => updateFloor(activeFloor.id, 'breadth', e.target.value)} /></div>
//                         <div className="md:col-span-3 border-t border-gray-50 pt-4"><label className={labelStyles}>Conversion Unit</label><RadioGroup options={['sq ft', 'sq yd', 'sq mt', 'Acre', 'Hectare', 'Guntas']} value={activeFloor.conversionUnit} onChange={v => updateFloor(activeFloor.id, 'conversionUnit', v)} /></div>
//                         <div className="md:col-span-3"><label className={labelStyles}>Covered Area</label><input type="text" className={`${inputStyles} bg-gray-50`} readOnly value={activeFloor.coveredArea} /></div>
//                       </div>

//                       <div className="md:col-span-2"><label className={labelStyles}>Condition</label><RadioGroup options={['excellent', 'good', 'avg', 'poor', 'under construction', 'under finishing', 'others']} value={activeFloor.condition} onChange={v => updateFloor(activeFloor.id, 'condition', v)} /></div>
//                       <div className="md:col-span-2"><label className={labelStyles}>Structure</label><RadioGroup options={['Rcc framed', 'load bearing', 'composite Structure', 'Peb/shed']} value={activeFloor.structure} onChange={v => updateFloor(activeFloor.id, 'structure', v)} /></div>
//                       <div className="md:col-span-2"><label className={labelStyles}>Flooring</label><RadioGroup options={['tiles', 'marble', 'wood', 'cement', 'pending', 'other']} value={activeFloor.flooring} onChange={v => updateFloor(activeFloor.id, 'flooring', v)} /></div>
//                       <div className="md:col-span-2"><label className={labelStyles}>Accommodation</label><RadioGroup options={['storage', 'shop', 'office space', '1BHK', '1.5BHK', '2BHK', '2.5BHK', '3BHK', '3.5BHK', '4BHK', '4.5BHK', '5BHK', '5.5BHK', '6BHK', 'studio', 'penthouse']} value={activeFloor.accommodation} onChange={v => updateFloor(activeFloor.id, 'accommodation', v)} /></div>
//                       <div className="md:col-span-2"><label className={labelStyles}>Doors / Windows</label><RadioGroup options={['wooden', 'aluminium', 'glass', 'upvc', 'pending', 'N/A']} value={activeFloor.doorsWindows} onChange={v => updateFloor(activeFloor.id, 'doorsWindows', v)} /></div>
//                       <div className="md:col-span-2"><label className={labelStyles}>Floor Remarks</label><textarea rows={3} className={inputStyles} value={activeFloor.floorRemarks} onChange={e => updateFloor(activeFloor.id, 'floorRemarks', e.target.value)}></textarea></div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
            
//             <NextSectionButton onClick={() => setActiveSection('market')} nextFocusId="market-first" />
//           </div>
//         )}
//       </div>

//       <div>
//         {renderSectionHeader('Building-Shared / Market', 'market')}
//         {activeSection === 'market' && (
//           <div className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-2 gap-6 bg-blue-50/10">
//             <div><label className={labelStyles} id="market-first">Year of Construction</label><input type="text" className={inputStyles} value={formData.market.yearOfConstruction} onChange={e => updateMarket('yearOfConstruction', e.target.value)} /></div>
//             <div><label className={labelStyles}>Renovation</label><RadioGroup options={['yes', 'no']} value={formData.market.renovation} onChange={v => updateMarket('renovation', v)} /></div>
//             <div className="md:col-span-2"><label className={labelStyles}>Parking</label><RadioGroup options={['covered', 'notpresent', 'open', 'N/A']} value={formData.market.parking} onChange={v => updateMarket('parking', v)} /></div>
//             <div className="md:col-span-2"><label className={labelStyles}>Lift</label><RadioGroup options={['yes', 'No', 'N/A']} value={formData.market.lift} onChange={v => updateMarket('lift', v)} /></div>
//             <div className="md:col-span-2"><label className={labelStyles}>Kitchen Type</label><RadioGroup options={['modular', 'semi modular', 'odinary', 'N/A', 'other']} value={formData.market.kitchenType} onChange={v => updateMarket('kitchenType', v)} /></div>

//             <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4 bg-white p-4 rounded-xl border border-gray-200">
//               <div className="md:col-span-3 border-b border-gray-100 pb-2 mb-2"><h4 className="text-[13px] font-bold text-[#00a0ef]">Rental Income</h4></div>
//               <div><label className={labelStyles}>Minimum</label><input type="number" className={inputStyles} value={formData.market.rentalMin} onChange={e => updateMarket('rentalMin', e.target.value)} /></div>
//               <div><label className={labelStyles}>Maximum</label><input type="number" className={inputStyles} value={formData.market.rentalMax} onChange={e => updateMarket('rentalMax', e.target.value)} /></div>
//               <div><label className={labelStyles}>Unit</label><RadioGroup options={['hundred', 'thousand', 'lakh', 'crore']} value={formData.market.rentalUnit} onChange={v => updateMarket('rentalUnit', v)} /></div>
//             </div>

//             {['Client', 'Dealer', 'Market'].map((type) => {
//               const minField = `market${type}Min` as keyof AppState['market'];
//               const maxField = `market${type}Max` as keyof AppState['market'];
//               const unitField = `market${type}Unit` as keyof AppState['market'];
//               return (
//                 <div key={type} className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4 bg-white p-4 rounded-xl border border-gray-200">
//                   <div className="md:col-span-3 border-b border-gray-100 pb-2 mb-2"><h4 className="text-[13px] font-bold text-[#00a0ef]">Market Rate ({type === 'Market' ? 'As per market' : type})</h4></div>
//                   <div><label className={labelStyles}>Minimum</label><input type="number" className={inputStyles} value={formData.market[minField] as string} onChange={e => updateMarket(minField, e.target.value)} /></div>
//                   <div><label className={labelStyles}>Maximum</label><input type="number" className={inputStyles} value={formData.market[maxField] as string} onChange={e => updateMarket(maxField, e.target.value)} /></div>
//                   <div><label className={labelStyles}>Unit</label><RadioGroup options={['hundred', 'thousand', 'lakh', 'crore']} value={formData.market[unitField] as string} onChange={v => updateMarket(unitField, v)} /></div>
//                 </div>
//               );
//             })}

//             <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-4 rounded-xl border border-gray-200">
//               <div className="md:col-span-2 border-b border-gray-100 pb-2 mb-2"><h4 className="text-[13px] font-bold text-[#00a0ef]">Dealer Details</h4></div>
//               <div><label className={labelStyles}>Dealer Name</label><input type="text" className={inputStyles} value={formData.market.dealerName} onChange={e => updateMarket('dealerName', e.target.value)} /></div>
//               <div><label className={labelStyles}>Mobile Number</label><input type="tel" className={inputStyles} value={formData.market.dealerMobile} onChange={e => updateMarket('dealerMobile', e.target.value)} /></div>
//             </div>

//             <div className="md:col-span-2 bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
//               <div className="flex items-center justify-between mb-3">
//                 <label className={labelStyles}>Additional Details</label>
//                 <button type="button" onClick={() => updateMarket('additionalDetails', [...formData.market.additionalDetails, { key: '', value: '' }])} className="text-[13px] font-semibold text-[#00a0ef] hover:underline flex items-center gap-1"><Plus size={14} /> Add Detail</button>
//               </div>
//               <div className="space-y-3">
//                 {formData.market.additionalDetails.map((pair, idx) => (
//                   <div key={idx} className="flex gap-3">
//                     <input type="text" placeholder="Key" className={inputStyles} value={pair.key} onChange={e => {
//                       const newArr = [...formData.market.additionalDetails];
//                       newArr[idx].key = e.target.value;
//                       updateMarket('additionalDetails', newArr);
//                     }} />
//                     <input type="text" placeholder="Value" className={inputStyles} value={pair.value} onChange={e => {
//                       const newArr = [...formData.market.additionalDetails];
//                       newArr[idx].value = e.target.value;
//                       updateMarket('additionalDetails', newArr);
//                     }} />
//                     <button type="button" onClick={() => {
//                       const newArr = formData.market.additionalDetails.filter((_, i) => i !== idx);
//                       updateMarket('additionalDetails', newArr);
//                     }} className="px-3 py-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"><Trash2 size={18} /></button>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// function Step3Form({ formData, setFormData }: { formData: AppState; setFormData: (val: any) => void }) {
//   const photoInputRef = useRef<HTMLInputElement>(null);
//   const docInputRef = useRef<HTMLInputElement>(null);

//   const handleFileUpload = (type: 'photos' | 'documents', e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) {
//       setFormData((prev: AppState) => ({ ...prev, uploads: { ...prev.uploads, [type]: [...prev.uploads[type], ...Array.from(e.target.files!)] } }));
//     }
//   };

//   const removeFile = (type: 'photos' | 'documents', idx: number) => {
//     setFormData((prev: AppState) => ({ ...prev, uploads: { ...prev.uploads, [type]: prev.uploads[type].filter((_, i) => i !== idx) } }));
//   };

//   return (
//     <div className="bg-white border border-gray-200 md:rounded-xl overflow-hidden shadow-sm p-4 md:p-6 space-y-8">
//       <div>
//         <h3 className="font-bold md:text-[16px] text-[#00a0ef] mb-4">Site Photos <span className="text-red-500">*</span></h3>
//         <div onClick={() => photoInputRef.current?.click()} className="border-2 border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition cursor-pointer">
//           <input type="file" multiple accept="image/*" className="hidden" ref={photoInputRef} onChange={(e) => handleFileUpload('photos', e)} />
//           <UploadCloud className="w-8 h-8 text-gray-400 mb-2" />
//           <p className="text-sm text-gray-600 text-center">Click to <span className="text-[#00a0ef] font-medium">browse photos</span></p>
//         </div>
//         {formData.uploads.photos.length > 0 && (
//           <div className="grid grid-cols-3 md:grid-cols-5 gap-3 mt-4">
//             {formData.uploads.photos.map((file, idx) => (
//               <div key={idx} className="relative aspect-square rounded-lg border border-gray-200 overflow-hidden bg-gray-50 flex items-center justify-center group">
//                 <img src={URL.createObjectURL(file)} alt="Preview" className="w-full h-full object-cover transition-opacity group-hover:opacity-75" />
//                 <button type="button" onClick={(e) => { e.stopPropagation(); removeFile('photos', idx); }} className="absolute top-1 right-1 bg-white/90 rounded-full p-1 shadow-md opacity-0 group-hover:opacity-100 transition-all hover:bg-red-50 text-red-500"><X size={14} /></button>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       <div className="border-t border-gray-100 pt-8">
//         <h3 className="font-bold md:text-[16px] text-[#00a0ef] mb-4">Documents <span className="text-red-500">*</span></h3>
//         <div onClick={() => docInputRef.current?.click()} className="border-2 border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition cursor-pointer">
//           <input type="file" multiple className="hidden" ref={docInputRef} onChange={(e) => handleFileUpload('documents', e)} />
//           <FileText className="w-8 h-8 text-gray-400 mb-2" />
//           <p className="text-sm text-gray-600 text-center">Click to <span className="text-[#00a0ef] font-medium">browse documents</span></p>
//         </div>
//         {formData.uploads.documents.length > 0 && (
//           <div className="space-y-3 mt-4">
//             {formData.uploads.documents.map((file, idx) => (
//               <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 border border-gray-100 rounded-xl">
//                 <div className="flex items-center gap-3"><div className="w-10 h-10 bg-[#e6f5fd] rounded-lg flex items-center justify-center text-[#00a0ef]"><FileText className="w-5 h-5" /></div><div><p className="text-[13px] font-medium text-gray-900 line-clamp-1">{file.name}</p><p className="text-xs text-gray-500">{(file.size / (1024 * 1024)).toFixed(1)} MB</p></div></div>
//                 <button type="button" onClick={() => removeFile('documents', idx)} className="text-[13px] text-red-500 font-medium px-2 py-1">Remove</button>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// function Step4Form({ formData, onEditStep, isConfirmed, setIsConfirmed }: { formData: AppState; onEditStep: (step: number) => void; isConfirmed: boolean; setIsConfirmed: (v: boolean) => void }) {
//   const MainCategory = ({ title, icon: Icon, children }: any) => (
//     <div className="mb-8 px-1"><div className="flex items-center gap-2 mb-4"><div className="w-5 h-5 flex items-center justify-center text-[#00a0ef]"><Icon className="w-5 h-5 fill-current opacity-20" strokeWidth={2} /></div><h3 className="text-[15px] font-bold text-gray-900">{title}</h3></div><div className="bg-white px-2">{children}</div></div>
//   );
//   const SubCategory = ({ title, stepNum, children }: any) => (
//     <div className="py-4 border-b border-gray-200 last:border-0 first:pt-0"><div className="flex items-center justify-between mb-4"><h4 className="text-[13px] font-bold text-gray-800">{title}</h4><button type="button" onClick={() => onEditStep(stepNum)} className="text-[#00a0ef] hover:bg-blue-50 p-1.5 rounded transition-colors"><Edit2 className="w-3.5 h-3.5" /></button></div><div className="grid grid-cols-2 gap-y-4 gap-x-4">{children}</div></div>
//   );
//   const DataField = ({ label, value }: any) => (
//     <div><p className="text-[11px] text-gray-500 font-medium mb-1">{label}</p><div className="text-[13px] font-medium text-gray-900 break-words">{value || '—'}</div></div>
//   );

//   return (
//     <div className="max-w-3xl bg-white mx-auto md:px-4 pb-8">
//       <div className="py-6 px-2"><h2 className="text-[18px] font-bold text-[#00a0ef]">Review & Submit</h2></div>

//       <MainCategory title="Client, Owner & Property" icon={Landmark}>
//         <SubCategory title="Bank Details" stepNum={1}>
//           <DataField label="IFSC Code" value={formData.clientBank.ifsc} />
//           <DataField label="Bank Name" value={formData.clientBank.bankName} />
//           <DataField label="Branch" value={formData.clientBank.branch} />
//           <DataField label="Email" value={formData.clientBank.email} />
//           <DataField label="POC" value={`${formData.clientBank.contactPersonName} / ${formData.clientBank.contactPersonNumber}`} />
//           <DataField label="Dates" value={`${formData.clientBank.dateOfInspection} / ${formData.clientBank.dateOfValuation}`} />
//           <DataField label="Type of Property" value={formData.clientBank.propertyType} />
//           <DataField label="Purpose" value={formData.clientBank.purposeOfValuation} />
//         </SubCategory>
//         <SubCategory title="Owner Details & Locality" stepNum={1}>
//           <DataField label="Name" value={`${formData.owner.prefix} ${formData.owner.ownerName}`} />
//           <DataField label="Relation" value={`${formData.owner.relation} ${formData.owner.relationName}`} />
//           <DataField label="Phone" value={`${formData.owner.phone1} / ${formData.owner.phone2}`} />
//           <DataField label="Urban/Rural" value={formData.locality.urbanRural} />
//           <DataField label="Class" value={formData.locality.localityClass} />
//           <DataField label="Tenure" value={formData.locality.landTenure} />
//         </SubCategory>
//         <SubCategory title="Property Settings" stepNum={1}>
//           <DataField label="Address" value={formData.property.address} />
//           <DataField label="Nature" value={formData.property.natureOfProperty} />
//           <DataField label="Shape" value={formData.property.plotShape} />
//           <DataField label="Calculated Area" value={`${formData.property.calculatedArea} ${formData.property.conversionUnit}`} />
//           <DataField label="Wall Setup" value={`${formData.property.wallLength}x${formData.property.wallHeight} ${formData.property.wallUnit}`} />
//           <DataField label="Negative Points" value={formData.negativePoints.join(', ')} />
//         </SubCategory>
//         <SubCategory title="Boundaries" stepNum={1}>
//           <DataField label="Unit" value={formData.boundaries.unit} />
//           <DataField label="Dimensions Match" value={formData.boundaries.dimensionsMatch ? "Yes" : "No"} />
//           <DataField label="North (Deed/Act)" value={`${formData.boundaries.northDeedDim} / ${formData.boundaries.northActualDim}`} />
//           <DataField label="South (Deed/Act)" value={`${formData.boundaries.southDeedDim} / ${formData.boundaries.southActualDim}`} />
//           <DataField label="East (Deed/Act)" value={`${formData.boundaries.eastDeedDim} / ${formData.boundaries.eastActualDim}`} />
//           <DataField label="West (Deed/Act)" value={`${formData.boundaries.westDeedDim} / ${formData.boundaries.westActualDim}`} />
//         </SubCategory>
//         <SubCategory title="Boundary Descriptions" stepNum={1}>
//           <DataField label="Neighbors Match" value={formData.boundaries.boundariesMatch ? "Yes" : "No"} />
//           <DataField label="North (Deed/Act)" value={`${formData.boundaries.northBoundaryDeed || 'N/A'} / ${formData.boundaries.northBoundaryActual || 'N/A'}`} />
//           <DataField label="South (Deed/Act)" value={`${formData.boundaries.southBoundaryDeed || 'N/A'} / ${formData.boundaries.southBoundaryActual || 'N/A'}`} />
//           <DataField label="East (Deed/Act)" value={`${formData.boundaries.eastBoundaryDeed || 'N/A'} / ${formData.boundaries.eastBoundaryActual || 'N/A'}`} />
//           <DataField label="West (Deed/Act)" value={`${formData.boundaries.westBoundaryDeed || 'N/A'} / ${formData.boundaries.westBoundaryActual || 'N/A'}`} />
//         </SubCategory>
//       </MainCategory>

//       <MainCategory title="Building & Market Details" icon={Building}>
//         {formData.floors.map((floor) => (
//           <SubCategory key={floor.id} title={`Floor: ${floor.floorName}`} stepNum={2}>
//             <DataField label="Possession" value={floor.possessionWith} />
//             <DataField label="Covered Area" value={`${floor.coveredArea} ${floor.conversionUnit}`} />
//             <DataField label="Condition" value={floor.condition} />
//             <DataField label="Structure" value={floor.structure} />
//             <DataField label="Flooring" value={floor.flooring} />
//             <DataField label="Accommodation" value={floor.accommodation} />
//             <DataField label="Doors/Windows" value={floor.doorsWindows} />
//             <DataField label="Remarks" value={floor.floorRemarks} />
//           </SubCategory>
//         ))}
//         <SubCategory title="Market & Shared Details" stepNum={2}>
//           <DataField label="Year Constructed" value={formData.market.yearOfConstruction} />
//           <DataField label="Renovation" value={formData.market.renovation} />
//           <DataField label="Parking" value={formData.market.parking} />
//           <DataField label="Rental Income" value={`${formData.market.rentalMin} - ${formData.market.rentalMax} ${formData.market.rentalUnit}`} />
//           <DataField label="Client Rate" value={`${formData.market.marketClientMin} - ${formData.market.marketClientMax} ${formData.market.marketClientUnit}`} />
//           <DataField label="Dealer Rate" value={`${formData.market.marketDealerMin} - ${formData.market.marketDealerMax} ${formData.market.marketDealerUnit}`} />
//           <DataField label="Market Rate" value={`${formData.market.marketMarketMin} - ${formData.market.marketMarketMax} ${formData.market.marketMarketUnit}`} />
//           <DataField label="Dealer Details" value={`${formData.market.dealerName} / ${formData.market.dealerMobile}`} />
//         </SubCategory>
//       </MainCategory>

//       <MainCategory title="Uploads" icon={UploadCloud}>
//         <SubCategory title="Files Overview" stepNum={3}>
//           <DataField label="Photos" value={`${formData.uploads.photos.length} uploaded`} />
//           <DataField label="Documents" value={`${formData.uploads.documents.length} uploaded`} />
//         </SubCategory>
//       </MainCategory>

//       <div className="mt-8 p-4 bg-[#f8fafc] border border-gray-200 rounded-xl flex flex-col gap-2">
//         <div className="flex items-start gap-3">
//           <div className="pt-0.5"><input type="checkbox" id="final-confirm" checked={isConfirmed} onChange={(e) => setIsConfirmed(e.target.checked)} className="w-4 h-4 text-[#00a0ef] border-gray-300 rounded focus:ring-[#00a0ef]" /></div>
//           <label htmlFor="final-confirm" className="text-[13px] text-gray-700 leading-relaxed select-none cursor-pointer">I confirm that all information provided above is correct.</label>
//         </div>
//         {(!formData.uploads.photos.length || !formData.uploads.documents.length) && (
//           <p className="text-red-500 text-[12px] font-medium mt-1">Please ensure at least one photo and one document is uploaded in Step 3 before submitting.</p>
//         )}
//       </div>
//     </div>
//   );
// }

// export default function App() {
//   const [currentStep, setCurrentStep] = useState(1);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [isConfirmed, setIsConfirmed] = useState(false);
//   const [isSubmittedSuccessfully, setIsSubmittedSuccessfully] = useState(false);

//   const [customers, setCustomers] = useState<any[]>([]);
//   const [isLoadingCustomers, setIsLoadingCustomers] = useState(true);

//   const [formData, setFormData] = useState<AppState>({
//     customer: '',
//     clientBank: { ifsc: '', bankName: '', branch: '', email: '', contactPersonName: '', contactPersonNumber: '', dateOfInspection: '', dateOfValuation: '', propertyType: '', purposeOfValuation: '' },
//     owner: { prefix: 'Shri', ownerName: '', relation: 'S/o', relationName: '', occupation: '', phone1: '', phone2: '' },
//     locality: { urbanRural: '', localityClass: '', landTenure: '', widthOfRoad: '', noOfStories: '', sanitaryFitting: '', electricalFitting: '', townplan: '' },
//     property: { address: '', natureOfProperty: '', vacantPlot: '', widthOfRoad: '', latitude: '', longitude: '', boundaryCoordinates: [], plotShape: '', dimensionUnit: '', length: '', breadth: '', conversionUnit: '', calculatedArea: '', wallUnit: '', wallLength: '', wallHeight: '', wallsOnSide: '', brickType: '' },
//     boundaries: { 
//       unit: '', 
//       dimensionsMatch: false,
//       boundariesMatch: false,
//       northDeedDim: '', southDeedDim: '', eastDeedDim: '', westDeedDim: '',
//       northActualDim: '', southActualDim: '', eastActualDim: '', westActualDim: '',
//       northBoundaryDeed: '', southBoundaryDeed: '', eastBoundaryDeed: '', westBoundaryDeed: '',
//       northBoundaryActual: '', southBoundaryActual: '', eastBoundaryActual: '', westBoundaryActual: ''
//     },
//     floors: [],
//     market: { yearOfConstruction: '', renovation: '', parking: '', lift: '', rentalMin: '', rentalMax: '', rentalUnit: '', kitchenType: '', marketClientMin: '', marketClientMax: '', marketClientUnit: '', marketDealerMin: '', marketDealerMax: '', marketDealerUnit: '', marketMarketMin: '', marketMarketMax: '', marketMarketUnit: '', dealerName: '', dealerMobile: '', additionalDetails: [] },
//     negativePoints: [],
//     uploads: { photos: [], documents: [] }
//   });

//   useEffect(() => {
//     const fetchCustomers = async () => {
//       try {
//         const data = await api.getCustomerProfiles();
//         setCustomers(data);
//       } catch (error) {
//         console.error("Failed to fetch customers:", error);
//       } finally {
//         setIsLoadingCustomers(false);
//       }
//     };
//     fetchCustomers();
//   }, []);

//   const handleCustomerSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     const selectedId = e.target.value;
//     const selectedCustomer = customers.find(c => c.id === selectedId);

//     if (selectedCustomer) {
//       setFormData(prev => ({
//         ...prev,
//         customer: selectedId,
//         clientBank: { ...prev.clientBank, ...selectedCustomer.clientBank },
//         owner: { ...prev.owner, ...selectedCustomer.owner }
//       }));
//     } else {
//       setFormData(prev => ({ ...prev, customer: '' }));
//     }
//   };

//   const handleStepContinue = () => {
//     if (currentStep < 4) { setCurrentStep(prev => prev + 1); window.scrollTo({ top: 0, behavior: 'smooth' }); }
//     else { handleSubmit(); }
//   };

//   const handleStepBack = () => {
//     if (currentStep > 1) { setCurrentStep(prev => prev - 1); window.scrollTo({ top: 0, behavior: 'smooth' }); }
//   };

//   const handleSubmit = async () => {
//     if (!isConfirmed) { alert('Please check the confirmation box to submit.'); return; }
//     setIsSubmitting(true);
    
//     try {
//       const customerIdPath = formData.customer || "unknown_customer";
      
//       const uploadedPhotosUrls = await Promise.all(
//         formData.uploads.photos.map(file => 
//           uploadFile(file, `valuation-records/${customerIdPath}/photos/${Date.now()}_${file.name}`)
//         )
//       );
      
//       const uploadedDocumentsUrls = await Promise.all(
//         formData.uploads.documents.map(file => 
//           uploadFile(file, `valuation-records/${customerIdPath}/documents/${Date.now()}_${file.name}`)
//         )
//       );

//       const payload = {
//         customer: formData.customer,
//         clientBank: formData.clientBank,
//         owner: formData.owner,
//         locality: formData.locality,
//         property: formData.property,
//         boundaries: formData.boundaries,
//         floors: formData.floors,
//         market: formData.market,
//         negativePoints: formData.negativePoints,
//         uploads: { 
//           photos: uploadedPhotosUrls, 
//           documents: uploadedDocumentsUrls 
//         }
//       };

//       await api.createValuationRecord(payload);
//       setIsSubmittedSuccessfully(true);

//     } catch (e) { 
//       console.error("Failed to submit report:", e); 
//       alert("An error occurred while uploading files or submitting the report.");
//     } finally { 
//       setIsSubmitting(false); 
//     }
//   };

//   if (isSubmittedSuccessfully) {
//     return (
//       <div className="flex flex-col flex-1 w-full relative min-h-screen md:min-h-0 bg-white overflow-hidden items-center justify-center p-6">
//         <div className="w-[88px] h-[88px] rounded-full flex items-center justify-center bg-[#f0f8fd] mb-6">
//           <div className="w-[60px] h-[60px] rounded-full bg-white flex items-center justify-center shadow-sm">
//             <div className="w-[32px] h-[32px] bg-[#00a0ef] rounded-full flex items-center justify-center"><Check className="w-4 h-4 text-white" strokeWidth={3.5} /></div>
//           </div>
//         </div>
//         <h2 className="text-[20px] lg:text-[24px] font-bold text-gray-900 mb-3 text-center">Report submitted successfully.</h2>
//         <p className="text-[#8A94A6] text-[14px] md:text-[15px] mb-8 text-center max-w-sm">Files uploaded and data verified.</p>
//         <button onClick={() => window.location.reload()} className="px-8 py-3 bg-[#00a0ef] hover:bg-[#008bd1] rounded-lg text-white font-medium transition-colors">Start New Report</button>
//       </div>
//     );
//   }

//   const isUploadsReady = formData.uploads.photos.length > 0 && formData.uploads.documents.length > 0;
//   const isSubmitDisabled = isSubmitting || (currentStep === 4 && (!isConfirmed || !isUploadsReady));

//   return (
//     <div className="min-h-screen bg-gray-50 flex flex-col md:py-8">
//       <div className="flex-1 flex flex-col w-full md:max-w-4xl md:mx-auto bg-white border-x md:border border-gray-200 md:rounded-xl md:shadow-sm overflow-hidden">
        
//         <div className="px-4 md:px-6 py-4 border-b border-gray-200 bg-white flex flex-col md:flex-row md:items-center justify-between gap-4">
//           <h1 className="text-lg md:text-xl font-medium text-gray-900">Submit New Report</h1>
//           <div className="relative w-full md:w-64">
//             <select 
//               className={`${inputStyles} appearance-none bg-blue-50/30 border-[#00a0ef]/30 font-medium disabled:opacity-50 disabled:cursor-not-allowed`} 
//               value={formData.customer} 
//               onChange={handleCustomerSelect}
//               disabled={isLoadingCustomers}
//             >
//               <option value="">
//                 {isLoadingCustomers ? 'Loading Customers...' : 'Select Customer (Prefill)...'}
//               </option>
              
//               {customers.map((c) => (
//                 <option key={c.id} value={c.id}>
//                   {c.profileReference || `${c.owner?.ownerName || 'Unknown'} - ${c.clientBank?.bankName || 'Unknown Bank'}`}
//                 </option>
//               ))}
//             </select>
//             <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
//           </div>
//         </div>

//         <div className="px-6 pt-10 pb-6 md:pt-12 md:pb-8 border-b border-gray-200 bg-white shrink-0">
//           <div className="max-w-xl mx-auto relative">
//             <div className="flex items-center justify-between relative">
//               <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[2px] bg-gray-200" />
//               {[1, 2, 3, 4].map((step) => {
//                 const isCompleted = step < currentStep;
//                 const isCurrent = step === currentStep;
//                 return (
//                   <div key={step} className="relative z-10 flex flex-col items-center">
//                     <span className={`absolute -top-7 whitespace-nowrap text-xs font-semibold tracking-wide ${isCompleted || isCurrent ? 'text-[#00a0ef]' : 'text-gray-400'}`}>STEP {step}</span>
//                     <div className={`w-8 h-8 rounded-full flex items-center justify-center bg-white ${isCompleted ? 'border-2 border-[#00a0ef] bg-[#00a0ef]' : isCurrent ? 'border-2 border-[#00a0ef]' : 'border-2 border-gray-300'}`}>
//                       {isCompleted && <CircleCheck color='white' fill='#00a0ef' />}
//                       {isCurrent && <div className="w-4 h-4 bg-[#00a0ef] rounded-full" />}
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         </div>

//         <div className="flex-1 overflow-y-auto bg-gray-50 md:p-6">
//           {currentStep === 1 && <Step1Form formData={formData} setFormData={setFormData} />}
//           {currentStep === 2 && <Step2Form formData={formData} setFormData={setFormData} />}
//           {currentStep === 3 && <Step3Form formData={formData} setFormData={setFormData} />}
//           {currentStep === 4 && <Step4Form formData={formData} onEditStep={setCurrentStep} isConfirmed={isConfirmed} setIsConfirmed={setIsConfirmed} />}
//         </div>
        
//         <div className="p-4 md:px-6 md:py-5 bg-white border-t border-gray-200 flex items-center justify-between mt-auto shrink-0">
//           <button onClick={handleStepBack} className={`flex items-center px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 text-[13px] font-medium hover:bg-gray-50 transition-colors ${currentStep === 1 ? 'invisible' : ''}`}>
//             <ArrowLeft className="w-4 h-4 mr-2" /> Back
//           </button>
//           <button onClick={handleStepContinue} disabled={isSubmitDisabled} className="flex items-center px-6 py-2.5 bg-[#00a0ef] hover:bg-[#008bd1] rounded-lg text-white text-[13px] font-medium transition-shadow shadow-sm hover:shadow-md disabled:opacity-60">
//             {isSubmitting ? 'Uploading & Submitting...' : currentStep === 4 ? 'Submit Report' : `Continue to Step ${currentStep + 1}`}
//             {!isSubmitting && currentStep !== 4 && <ArrowRight className="w-4 h-4 ml-2" />}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Building, Landmark, CheckCircle2, UploadCloud, X, FileText, Edit2, CircleCheck, Plus, Trash2, Check, RotateCcw, ArrowLeft, ArrowRight, ChevronDown, Loader2, MapPin } from 'lucide-react';
import { APIProvider, Map, AdvancedMarker, useMap } from "@vis.gl/react-google-maps";
import { api } from '@/app/lib/userApis';
import { uploadFile } from "@/app/lib/firebase/storageUtils";

type Coord = { lat: number; lng: number };
type Pin = { id: number; coord: Coord };
type Mode = "picking" | "submitted";

const MAX = 10;
const LABELS = ["P1", "P2", "P3", "P4", "P5", "P6", "P7", "P8", "P9", "P10"];
const COLORS = ["#00a0ef", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899", "#06b6d4", "#14b8a6", "#f97316", "#6366f1"];

export interface FloorDetail {
  id: string;
  floorName: string;
  possessionWith: string;
  unit: string;
  length: string;
  breadth: string;
  conversionUnit: string;
  coveredArea: string;
  condition: string;
  structure: string;
  flooring: string;
  accommodation: string;
  doorsWindows: string;
  floorRemarks: string;
}

// ─── FULLY UPDATED APP STATE ───
interface AppState {
  customer: string;
  clientBank: { ifsc: string; bankName: string; branch: string; email: string; contactPersonName: string; contactPersonNumber: string; dateOfInspection: string; dateOfValuation: string; propertyType: string; purposeOfValuation: string; };
  owner: { prefix: string; ownerName: string; relation: string; relationName: string; occupation: string; phone1: string; phone2: string; };
  locality: { urbanRural: string; localityClass: string; landTenure: string; widthOfRoad: string; noOfStories: string; sanitaryFitting: string; electricalFitting: string; townplan: string; };
  property: { address: string; natureOfProperty: string; vacantPlot: string; widthOfRoad: string; latitude: string; longitude: string; boundaryCoordinates: Coord[]; plotShape: string; dimensionUnit: string; length: string; breadth: string; conversionUnit: string; calculatedArea: string; wallUnit: string; wallLength: string; wallHeight: string; wallsOnSide: string; brickType: string; };
  boundaries: { 
    unit: string; 
    dimensionsMatch: boolean;
    boundariesMatch: boolean; 
    northDeedDim: string; southDeedDim: string; eastDeedDim: string; westDeedDim: string; 
    northActualDim: string; southActualDim: string; eastActualDim: string; westActualDim: string; 
    northBoundaryDeed: string; southBoundaryDeed: string; eastBoundaryDeed: string; westBoundaryDeed: string; 
    northBoundaryActual: string; southBoundaryActual: string; eastBoundaryActual: string; westBoundaryActual: string;
  };
  floors: FloorDetail[];
  market: { yearOfConstruction: string; renovation: string; parking: string; lift: string; rentalMin: string; rentalMax: string; rentalUnit: string; kitchenType: string; marketClientMin: string; marketClientMax: string; marketClientUnit: string; marketDealerMin: string; marketDealerMax: string; marketDealerUnit: string; marketMarketMin: string; marketMarketMax: string; marketMarketUnit: string; dealerName: string; dealerMobile: string; additionalDetails: { key: string; value: string }[]; };
  negativePoints: string[];
  uploads: { photos: File[]; documents: File[]; };
}

const inputStyles = "w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-[#00a0ef] focus:ring-1 focus:ring-[#00a0ef] text-[13px] text-gray-900 bg-white shadow-sm transition-shadow";
const labelStyles = "block text-[13px] font-semibold text-gray-700 mb-2";

// ─── Geo helpers ───
function computeCentroid(coords: Coord[]): Coord {
  const total = coords.reduce(
    (acc, c) => ({ lat: acc.lat + c.lat, lng: acc.lng + c.lng }),
    { lat: 0, lng: 0 }
  );
  return { lat: total.lat / coords.length, lng: total.lng / coords.length };
}

function reverseGeocode(coord: Coord): Promise<string> {
  return new Promise((resolve) => {
    if (typeof window === "undefined" || !(window as any).google?.maps) {
      resolve('');
      return;
    }
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ location: coord }, (results, status) => {
      if (status === "OK" && results && results[0]) {
        resolve(results[0].formatted_address);
      } else {
        resolve('');
      }
    });
  });
}

const RadioGroup = ({ options, value, onChange }: { options: string[], value: string, onChange: (val: string) => void }) => {
  const isCustom = value !== '' && !options.includes(value);
  const [showCustom, setShowCustom] = useState(isCustom);

  return (
    <div className="flex flex-wrap gap-2 items-center">
      {options.map(opt => (
        <button key={opt} type="button" onClick={() => { setShowCustom(false); onChange(opt); }}
          className={`px-3 py-2 rounded-lg text-[13px] font-medium transition-all border ${!showCustom && value === opt ? 'bg-blue-50 border-[#00a0ef] text-[#00a0ef] shadow-sm' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'}`}>
          {opt}
        </button>
      ))}
      <div className="flex items-center gap-2">
        {!showCustom && (
          <button type="button" onClick={() => { setShowCustom(true); onChange(''); }}
            className={`px-3 py-2 rounded-lg text-[13px] font-medium transition-all border bg-white border-gray-200 text-gray-600 hover:bg-gray-50`}>
            Other / Add Option
          </button>
        )}
        {showCustom && (
          <div className="flex items-center gap-1 bg-white border border-gray-300 rounded-lg pr-1 shadow-sm focus-within:border-[#00a0ef] focus-within:ring-1 focus-within:ring-[#00a0ef]">
            <input type="text" placeholder="Type custom option..." className="px-3 py-2 text-[13px] rounded-l-lg focus:outline-none border-none w-40" value={value} onChange={e => onChange(e.target.value)} autoFocus />
            <button type="button" onClick={() => { setShowCustom(false); onChange(''); }} className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors">
              <X size={14} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const MultiSelectGroup = ({ options, selected, onChange }: { options: string[], selected: string[], onChange: (val: string[]) => void }) => {
  const toggle = (opt: string) => selected.includes(opt) ? onChange(selected.filter(i => i !== opt)) : onChange([...selected, opt]);
  const customValues = selected.filter(val => !options.includes(val));
  const [customInput, setCustomInput] = useState('');

  const handleAddCustom = () => {
    if (customInput.trim() && !selected.includes(customInput.trim())) {
      onChange([...selected, customInput.trim()]);
      setCustomInput('');
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap gap-2">
        {options.map(opt => (
          <button key={opt} type="button" onClick={() => toggle(opt)}
            className={`px-3 py-2 rounded-lg text-[13px] font-medium transition-all border ${selected.includes(opt) ? 'bg-blue-50 border-[#00a0ef] text-[#00a0ef] shadow-sm' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'}`}>
            {opt}
          </button>
        ))}
        {customValues.map(opt => (
          <button key={opt} type="button" onClick={() => toggle(opt)}
            className="px-3 py-2 rounded-lg text-[13px] font-medium transition-all border bg-blue-50 border-[#00a0ef] text-[#00a0ef] shadow-sm flex items-center gap-2">
            {opt} <X className="w-3 h-3" />
          </button>
        ))}
      </div>
      <div className="flex items-center gap-2">
        <input type="text" placeholder="Add custom option..." className="px-3 py-2 text-[13px] border border-gray-300 rounded-lg focus:outline-none focus:border-[#00a0ef] w-48 shadow-sm" value={customInput} onChange={e => setCustomInput(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddCustom(); } }} />
        <button type="button" onClick={handleAddCustom} className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-[13px] font-medium hover:bg-gray-200 transition-colors">Add</button>
      </div>
    </div>
  );
};

function NextSectionButton({ onClick, nextFocusId }: { onClick: () => void, nextFocusId: string }) {
  const handleAction = (e: React.MouseEvent | React.KeyboardEvent) => {
    e.preventDefault();
    onClick();
    setTimeout(() => document.getElementById(nextFocusId)?.focus(), 50);
  };
  return (
    <div className="md:col-span-full flex justify-end mt-4 border-t border-gray-200/50 pt-4">
      <button type="button" onClick={handleAction} onKeyDown={(e) => { if (e.key === 'Tab' && !e.shiftKey) { handleAction(e); } }} className="text-[#00a0ef] text-[13px] font-bold hover:underline flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-[#00a0ef] focus:ring-offset-2 rounded px-3 py-1.5 transition-colors">
        Next Section <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
}

function GeoCoordinatePicker({ onCoordinatesSubmit }: { onCoordinatesSubmit: (coords: Coord[], address?: string) => void }) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "";
  const [center, setCenter] = useState<Coord>({ lat: 20, lng: 78 });
  const [zoom, setZoom] = useState(4);
  const [mode, setMode] = useState<Mode>("picking");
  const [pins, setPins] = useState<Pin[]>([]);
  const [nextId, setNextId] = useState(0);
  const [submitted, setSubmitted] = useState<Pin[]>([]);
  const [editTarget, setEditTarget] = useState<number | null>(null);
  const [userLocation, setUserLocation] = useState<Coord | null>(null);
  const [isGeocoding, setIsGeocoding] = useState(false);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLoc = { lat: position.coords.latitude, lng: position.coords.longitude };
          setUserLocation(userLoc); setCenter(userLoc); setZoom(18);
        },
        (error) => console.error("Error getting user location:", error),
        { enableHighAccuracy: true }
      );
    }
  }, []);

  const handleMapClick = useCallback((coord: Coord) => {
    if (mode === "picking") {
      if (pins.length >= MAX) return;
      setPins((prev) => [...prev, { id: nextId, coord }]);
      setNextId((n) => n + 1); return;
    }
    if (mode === "submitted" && editTarget !== null) {
      const updated = submitted.map((p, i) => (i === editTarget ? { ...p, coord } : p));
      setSubmitted(updated);
      setEditTarget(null);
      // Re-resolve the address after a point is dragged/edited post-submit.
      (async () => {
        setIsGeocoding(true);
        const centroid = computeCentroid(updated.map(p => p.coord));
        const address = await reverseGeocode(centroid);
        setIsGeocoding(false);
        onCoordinatesSubmit(updated.map(p => p.coord), address);
      })();
    }
  }, [mode, pins.length, nextId, editTarget, submitted, onCoordinatesSubmit]);

  const handleSubmit = async () => {
    if (pins.length === 0) return;
    const finalPins = [...pins];
    setSubmitted(finalPins); setMode("submitted"); setEditTarget(null);

    // Resolve a human-readable address from the captured points (uses the
    // centroid so multi-point boundaries still resolve to one sensible
    // address) and send it upstream alongside the raw coordinates.
    setIsGeocoding(true);
    const centroid = computeCentroid(finalPins.map(p => p.coord));
    const address = await reverseGeocode(centroid);
    setIsGeocoding(false);

    onCoordinatesSubmit(finalPins.map(p => p.coord), address);
  };

  return (
    <div className="flex flex-col w-full bg-white border border-gray-300 rounded-xl overflow-hidden shadow-sm">
      <div className="relative w-full h-64 md:h-80 bg-gray-100">
        <APIProvider apiKey={apiKey}>
          <Map mapId="geo-picker-form" center={center} zoom={zoom} mapTypeId="satellite"
            onCameraChanged={(ev) => { setCenter(ev.detail.center); setZoom(ev.detail.zoom); }}
            gestureHandling="greedy" colorScheme="LIGHT" mapTypeControl={true} zoomControl={true} fullscreenControl={true} streetViewControl={true}
            style={{ width: "100%", height: "100%" }}>
            {userLocation && (
              <AdvancedMarker position={userLocation}>
                <div className="relative"><div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-lg" /><div className="absolute inset-0 w-4 h-4 bg-blue-400 rounded-full animate-ping opacity-40" /></div>
              </AdvancedMarker>
            )}
            <ClickHandler onClick={handleMapClick} />
            {(mode === "picking" ? pins : submitted).map((pin, i) => (
              <AdvancedMarker key={pin.id} position={pin.coord} zIndex={editTarget === i ? 100 : i}>
                <button type="button" onClick={(e) => { e.stopPropagation(); if (mode === "submitted") setEditTarget(editTarget === i ? null : i); }}
                  className={`flex items-center justify-center rounded-full font-bold text-white text-xs shadow-md transition-all ${editTarget === i ? "w-10 h-10 ring-4 ring-white scale-110" : "w-8 h-8 ring-2 ring-white/80 scale-100"} ${mode === "submitted" ? "cursor-pointer" : "cursor-default"}`}
                  style={{ backgroundColor: COLORS[i] }}>{LABELS[i]}</button>
              </AdvancedMarker>
            ))}
          </Map>

          {/* Point counter badge */}
          <div className="absolute top-3 left-3 z-10 bg-black/60 backdrop-blur-sm rounded-full px-3 py-1.5 flex items-center gap-1.5 shadow-lg pointer-events-none">
            <MapPin className="w-3.5 h-3.5 text-white" />
            <span className="text-white text-[12px] font-semibold">
              {(mode === "picking" ? pins.length : submitted.length)} / {MAX} points placed
            </span>
          </div>
        </APIProvider>
      </div>
      <div className="p-4 bg-gray-50 border-t border-gray-200 flex flex-col gap-2">
        {mode === "picking" ? (
          <>
            <p className="text-[11px] text-gray-500 text-center">
              Tap the map to drop a point (up to {MAX}). At least 1 point is required.
            </p>
            <button type="button" onClick={handleSubmit} disabled={pins.length === 0 || isGeocoding}
              className={`w-full py-2.5 rounded-lg text-sm font-semibold transition-colors flex items-center justify-center gap-2 ${pins.length > 0 && !isGeocoding ? "bg-[#00a0ef] text-white hover:bg-[#008bd1] shadow-sm" : "bg-gray-200 text-gray-400 cursor-not-allowed"}`}>
              {isGeocoding ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Resolving address...</>
              ) : pins.length > 0 ? (
                <><CheckCircle2 className="w-4 h-4" /> Confirm {pins.length} Point{pins.length > 1 ? 's' : ''}</>
              ) : (
                "Place at least 1 point"
              )}
            </button>
          </>
        ) : (
          <>
            {isGeocoding && (
              <p className="text-[11px] text-gray-500 text-center flex items-center justify-center gap-1.5">
                <Loader2 className="w-3.5 h-3.5 animate-spin" /> Updating address...
              </p>
            )}
            <button type="button" onClick={() => { setPins([]); setSubmitted([]); setMode("picking"); setEditTarget(null); setNextId(0); }}
              className="w-full py-2.5 rounded-lg text-sm font-semibold transition-colors flex items-center justify-center gap-2 bg-red-50 text-red-600 hover:bg-red-100">
              <RotateCcw className="w-4 h-4" /> Reset Boundaries
            </button>
          </>
        )}
      </div>
    </div>
  );
}

function ClickHandler({ onClick }: { onClick: (c: Coord) => void }) {
  const map = useMap();
  useEffect(() => {
    if (!map) return;
    const listener = map.addListener("click", (e: google.maps.MapMouseEvent) => {
      if (e.latLng) onClick({ lat: e.latLng.lat(), lng: e.latLng.lng() });
    });
    return () => { google.maps.event.removeListener(listener); };
  }, [map, onClick]);
  return null;
}

function Step1Form({ formData, setFormData }: { formData: AppState; setFormData: (val: any) => void }) {
  const [activeSection, setActiveSection] = useState<string>('clientBank');

  const updateSection = (section: keyof AppState, field: string, value: any) => {
    setFormData((prev: AppState) => ({ ...prev, [section]: { ...(prev[section] as any), [field]: value } }));
  };

  const handleDimensionChange = (dir: string, type: 'DeedDim' | 'ActualDim', value: string) => {
    const key = `${dir}${type}`;
    updateSection('boundaries', key, value);

    if (type === 'DeedDim' && formData.boundaries.dimensionsMatch) {
      updateSection('boundaries', `${dir}ActualDim`, value);
    }
  };

  const handleTextBoundaryChange = (dir: string, type: 'Deed' | 'Actual', value: string) => {
    const key = `${dir}Boundary${type}`;
    updateSection('boundaries', key, value);

    if (type === 'Deed' && formData.boundaries.boundariesMatch) {
      updateSection('boundaries', `${dir}BoundaryActual`, value);
    }
  };

  const renderSectionHeader = (title: string, id: string) => (
    <div className={`flex items-center justify-between p-4 md:px-6 md:py-5 cursor-pointer transition-colors ${activeSection === id ? 'bg-blue-50/50 border-b border-blue-100' : 'bg-white hover:bg-gray-50 border-b border-gray-100'}`} onClick={() => setActiveSection(activeSection === id ? '' : id)}>
      <h3 className="font-bold md:text-[15px] text-[#00a0ef]">{title}</h3>
      <ChevronDown className={`w-5 h-5 text-[#00a0ef] transition-transform ${activeSection === id ? 'rotate-180' : ''}`} />
    </div>
  );

  return (
    <div className="bg-white border border-gray-200 md:rounded-xl overflow-hidden shadow-sm divide-y divide-gray-100">
      
      <div>
        {renderSectionHeader('Client / Bank Details', 'clientBank')}
        {activeSection === 'clientBank' && (
          <div className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 bg-blue-50/10">
            <div><label className={labelStyles}>IFSC Code</label><input id="clientBank-first" type="text" className={inputStyles} value={formData.clientBank.ifsc} onChange={e => updateSection('clientBank', 'ifsc', e.target.value)} /></div>
            <div><label className={labelStyles}>Bank Name</label><input type="text" className={inputStyles} value={formData.clientBank.bankName} onChange={e => updateSection('clientBank', 'bankName', e.target.value)} /></div>
            <div><label className={labelStyles}>Branch</label><input type="text" className={inputStyles} value={formData.clientBank.branch} onChange={e => updateSection('clientBank', 'branch', e.target.value)} /></div>
            <div><label className={labelStyles}>Email ID</label><input type="email" className={inputStyles} value={formData.clientBank.email} onChange={e => updateSection('clientBank', 'email', e.target.value)} /></div>
            <div><label className={labelStyles}>Point of Contact Name</label><input type="text" className={inputStyles} value={formData.clientBank.contactPersonName} onChange={e => updateSection('clientBank', 'contactPersonName', e.target.value)} /></div>
            <div><label className={labelStyles}>Point of Contact Number</label><input type="tel" className={inputStyles} value={formData.clientBank.contactPersonNumber} onChange={e => updateSection('clientBank', 'contactPersonNumber', e.target.value)} /></div>
            <div><label className={labelStyles}>Date of Inspection</label><input type="date" className={inputStyles} value={formData.clientBank.dateOfInspection} onChange={e => updateSection('clientBank', 'dateOfInspection', e.target.value)} /></div>
            <div><label className={labelStyles}>Date Valuation</label><input type="date" className={inputStyles} value={formData.clientBank.dateOfValuation} onChange={e => updateSection('clientBank', 'dateOfValuation', e.target.value)} /></div>
            
            <div className="md:col-span-2">
              <label className={labelStyles}>Type of Property</label>
              <RadioGroup options={['Vacant Land - Residential', 'Existing Building - Residential', 'Open Piece of Land', 'Residential Flat', 'Agri Land', 'Residential Villa', 'Industrial Shed']} value={formData.clientBank.propertyType} onChange={v => updateSection('clientBank', 'propertyType', v)} />
            </div>
            <div className="md:col-span-2">
              <label className={labelStyles}>Purpose of Valuation (Loan Type)</label>
              <RadioGroup options={['Home Loan', 'Mortgage Loan', 'Education Loan', 'Collateral Security', 'For Bank Loan / Mortgage Purpose']} value={formData.clientBank.purposeOfValuation} onChange={v => updateSection('clientBank', 'purposeOfValuation', v)} />
            </div>
            <NextSectionButton onClick={() => setActiveSection('ownerLocality')} nextFocusId="owner-first" />
          </div>
        )}
      </div>

      <div>
        {renderSectionHeader('Owner Details & Locality Classification', 'ownerLocality')}
        {activeSection === 'ownerLocality' && (
          <div className="p-4 md:p-6 bg-blue-50/10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 border-b border-gray-200 pb-6 mb-6">
              <div className="md:col-span-2 flex gap-3">
                <div className="w-1/3 md:w-1/4">
                  <label className={labelStyles}>Prefix</label>
                  <div className="relative">
                    <select id="owner-first" className={`${inputStyles} appearance-none bg-white`} value={formData.owner.prefix} onChange={e => {
                      const val = e.target.value;
                      updateSection('owner', 'prefix', val);
                      if (val === 'Smt' || val === 'Mrs') updateSection('owner', 'relation', 'W/o');
                      else if (val === 'Shri' || val === 'Mr') updateSection('owner', 'relation', 'S/o');
                    }}>
                      <option value="Shri">Shri</option>
                      <option value="Smt">Smt</option>
                      <option value="Mr">Mr</option>
                      <option value="Mrs">Mrs</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                  </div>
                </div>
                <div className="flex-1"><label className={labelStyles}>Owner Name</label><input type="text" className={inputStyles} value={formData.owner.ownerName} onChange={e => updateSection('owner', 'ownerName', e.target.value)} /></div>
              </div>
              <div className="md:col-span-2 flex gap-3">
                <div className="w-1/3 md:w-1/4">
                  <label className={labelStyles}>Relation</label>
                  <div className="relative">
                    <select className={`${inputStyles} appearance-none bg-white`} value={formData.owner.relation} onChange={e => updateSection('owner', 'relation', e.target.value)}>
                      <option value="S/o">S/o</option>
                      <option value="D/o">D/o</option>
                      <option value="W/o">W/o</option>
                      <option value="F/o">F/o</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                  </div>
                </div>
                <div className="flex-1"><label className={labelStyles}>Relative's Name</label><input type="text" className={inputStyles} value={formData.owner.relationName} onChange={e => updateSection('owner', 'relationName', e.target.value)} /></div>
              </div>
              <div className="md:col-span-2"><label className={labelStyles}>Occupation</label><input type="text" className={inputStyles} value={formData.owner.occupation} onChange={e => updateSection('owner', 'occupation', e.target.value)} /></div>
              <div><label className={labelStyles}>Phone Number 1</label><input type="tel" className={inputStyles} value={formData.owner.phone1} onChange={e => updateSection('owner', 'phone1', e.target.value)} /></div>
              <div><label className={labelStyles}>Phone Number 2</label><input type="tel" className={inputStyles} value={formData.owner.phone2} onChange={e => updateSection('owner', 'phone2', e.target.value)} /></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2"><label className={labelStyles}>Rural / Urban</label><RadioGroup options={['metro city', 'urban', 'semi urban rural', 'N/A']} value={formData.locality.urbanRural} onChange={v => updateSection('locality', 'urbanRural', v)} /></div>
              <div className="md:col-span-2"><label className={labelStyles}>Locality Class</label><RadioGroup options={['high', 'middle', 'low', 'posh', 'N/A']} value={formData.locality.localityClass} onChange={v => updateSection('locality', 'localityClass', v)} /></div>
              <div className="md:col-span-2"><label className={labelStyles}>Land Tenure</label><RadioGroup options={['freehold', 'leasehold', 'N/A']} value={formData.locality.landTenure} onChange={v => updateSection('locality', 'landTenure', v)} /></div>
              <div className="md:col-span-2"><label className={labelStyles}>Width of Road</label><RadioGroup options={['< 10ft', '< 20ft', '> 20ft']} value={formData.locality.widthOfRoad} onChange={v => updateSection('locality', 'widthOfRoad', v)} /></div>
              <div className="md:col-span-2"><label className={labelStyles}>No. of Stories</label><RadioGroup options={['1', '2', '3', '4', '5', '6', '7', '8', '9', 'vacant']} value={formData.locality.noOfStories} onChange={v => updateSection('locality', 'noOfStories', v)} /></div>
              <div className="md:col-span-2"><label className={labelStyles}>Sanitary Fitting</label><RadioGroup options={['ordinary', 'good', 'superior', 'premium', 'excellent', 'under construction']} value={formData.locality.sanitaryFitting} onChange={v => updateSection('locality', 'sanitaryFitting', v)} /></div>
              <div className="md:col-span-2"><label className={labelStyles}>Electrical Fitting</label><RadioGroup options={['ordinary', 'good', 'superior', 'premium', 'excellent', 'under construction']} value={formData.locality.electricalFitting} onChange={v => updateSection('locality', 'electricalFitting', v)} /></div>
              <div className="md:col-span-2"><label className={labelStyles}>Townplan / MC / GP</label><RadioGroup options={['MC', 'townplanning', 'gram panchayat', 'outside Mc']} value={formData.locality.townplan} onChange={v => updateSection('locality', 'townplan', v)} /></div>
            </div>
            <NextSectionButton onClick={() => setActiveSection('property')} nextFocusId="property-first" />
          </div>
        )}
      </div>

      <div>
        {renderSectionHeader('Property Details', 'property')}
        {activeSection === 'property' && (
          <div className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-2 gap-6 bg-blue-50/10">
            <div className="md:col-span-2">
              <label className={labelStyles} id="property-first">Geo Location & Coordinates</label>
              <GeoCoordinatePicker 
                onCoordinatesSubmit={(coords, address) => {
                  updateSection('property', 'boundaryCoordinates', coords);
                  if (coords.length > 0) {
                    updateSection('property', 'latitude', coords[0].lat.toString());
                    updateSection('property', 'longitude', coords[0].lng.toString());
                  }
                  // Prefill the address from reverse-geocoding the captured
                  // point(s); the field stays editable afterwards.
                  if (address) {
                    updateSection('property', 'address', address);
                  }
                }} 
              />

              {/* Captured points list — shows every lat/lng pair placed on the map */}
              <div className="mt-4">
                <label className={labelStyles}>
                  Captured Points ({formData.property.boundaryCoordinates?.length || 0} / {MAX})
                </label>
                {formData.property.boundaryCoordinates?.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-56 overflow-y-auto p-3 bg-gray-50 rounded-lg border border-gray-200">
                    {formData.property.boundaryCoordinates.map((c: Coord, i: number) => (
                      <div key={i} className="flex items-center gap-2 text-[12px] bg-white px-3 py-2 rounded-lg border border-gray-200">
                        <span
                          className="w-6 h-6 rounded-full flex items-center justify-center text-white text-[10px] font-bold shrink-0"
                          style={{ backgroundColor: COLORS[i % COLORS.length] }}
                        >
                          {LABELS[i % LABELS.length]}
                        </span>
                        <span className="text-gray-700 font-mono">{c.lat.toFixed(6)}, {c.lng.toFixed(6)}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-[12px] text-gray-400 italic">No points placed yet.</p>
                )}
              </div>

              <div className="flex gap-4 mt-4">
                <input type="text" placeholder="Latitude" className={inputStyles} value={formData.property.latitude} readOnly />
                <input type="text" placeholder="Longitude" className={inputStyles} value={formData.property.longitude} readOnly />
              </div>
            </div>
            
            <div className="md:col-span-2"><label className={labelStyles}>Address</label><textarea rows={3} className={inputStyles} value={formData.property.address} onChange={e => updateSection('property', 'address', e.target.value)} /></div>
            
            <div className="md:col-span-2"><label className={labelStyles}>Nature of Property</label><RadioGroup options={['Residential', 'Commercial', 'Industrial', 'Agriculture', 'mixed', 'institutional', 'N/A']} value={formData.property.natureOfProperty} onChange={v => updateSection('property', 'natureOfProperty', v)} /></div>
            <div className="md:col-span-1"><label className={labelStyles}>Vacant Plot?</label><RadioGroup options={['yes', 'NO']} value={formData.property.vacantPlot} onChange={v => updateSection('property', 'vacantPlot', v)} /></div>
            <div className="md:col-span-1"><label className={labelStyles}>Width of Road</label><RadioGroup options={['< 10ft', '< 20ft', '> 20ft']} value={formData.property.widthOfRoad} onChange={v => updateSection('property', 'widthOfRoad', v)} /></div>
            <div className="md:col-span-2"><label className={labelStyles}>Plot Shape</label><RadioGroup options={['Rectangle', 'square', 'triangle', 'irregular', 'polygon']} value={formData.property.plotShape} onChange={v => updateSection('property', 'plotShape', v)} /></div>

            <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border border-gray-200 bg-white rounded-xl">
              <div className="md:col-span-3"><label className={labelStyles}>Dimension Unit</label><RadioGroup options={['ft', 'm', 'inch']} value={formData.property.dimensionUnit} onChange={v => updateSection('property', 'dimensionUnit', v)} /></div>
              <div><label className={labelStyles}>Length</label><input type="number" className={inputStyles} value={formData.property.length} onChange={e => { updateSection('property', 'length', e.target.value); const b = parseFloat(formData.property.breadth) || 0; updateSection('property', 'calculatedArea', (parseFloat(e.target.value || '0') * b).toString()); }} /></div>
              <div><label className={labelStyles}>Breadth</label><input type="number" className={inputStyles} value={formData.property.breadth} onChange={e => { updateSection('property', 'breadth', e.target.value); const l = parseFloat(formData.property.length) || 0; updateSection('property', 'calculatedArea', (parseFloat(e.target.value || '0') * l).toString()); }} /></div>
              <div className="md:col-span-3 border-t border-gray-100 pt-4 mt-2"><label className={labelStyles}>Conversion Unit</label><RadioGroup options={['sq ft', 'sq yd', 'sq mt', 'Acre', 'Hectare', 'Guntas']} value={formData.property.conversionUnit} onChange={v => updateSection('property', 'conversionUnit', v)} /></div>
              <div className="md:col-span-3"><label className={labelStyles}>Calculated Area (Dimensions converted to selected unit)</label><input type="text" className={`${inputStyles} bg-gray-50`} readOnly value={formData.property.calculatedArea} /></div>
            </div>

            <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border border-gray-200 bg-white rounded-xl">
              <div className="md:col-span-2"><label className={labelStyles}>Wall Unit</label><RadioGroup options={['ft', 'm', 'inch']} value={formData.property.wallUnit} onChange={v => updateSection('property', 'wallUnit', v)} /></div>
              <div><label className={labelStyles}>Wall Length</label><input type="number" className={inputStyles} value={formData.property.wallLength} onChange={e => updateSection('property', 'wallLength', e.target.value)} /></div>
              <div><label className={labelStyles}>Wall Height</label><input type="number" className={inputStyles} value={formData.property.wallHeight} onChange={e => updateSection('property', 'wallHeight', e.target.value)} /></div>
              <div className="md:col-span-2"><label className={labelStyles}>Walls on Side</label><RadioGroup options={['1', '2', '3', '4']} value={formData.property.wallsOnSide} onChange={v => updateSection('property', 'wallsOnSide', v)} /></div>
              <div className="md:col-span-2"><label className={labelStyles}>Type of Brick</label><RadioGroup options={['brick work', 'Rcc', 'pacca offset / pavement']} value={formData.property.brickType} onChange={v => updateSection('property', 'brickType', v)} /></div>
            </div>

            <NextSectionButton onClick={() => setActiveSection('boundaries')} nextFocusId="boundaries-first" />
          </div>
        )}
      </div>

      <div>
        {renderSectionHeader('Boundaries & Negative Points', 'boundaries')}
        {activeSection === 'boundaries' && (
          <div className="p-4 md:p-6 bg-blue-50/10 space-y-8">
            <div className="md:col-span-2">
              <label className={labelStyles} id="boundaries-first">Boundary Unit</label>
              <RadioGroup options={['length', 'feet', 'meters', 'inchs']} value={formData.boundaries.unit} onChange={v => updateSection('boundaries', 'unit', v)} />
            </div>
            
            {/* 1. Boundary Dimensions (Numbers) */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-[13px] font-bold text-[#00a0ef]">Boundary Dimensions</h4>
                <label className="flex items-center gap-2 text-[12px] font-semibold text-gray-700 cursor-pointer bg-white px-3 py-1.5 rounded-lg border border-gray-200 shadow-sm">
                  <input 
                    type="checkbox" 
                    className="w-4 h-4 text-[#00a0ef] rounded border-gray-300 focus:ring-[#00a0ef]"
                    checked={formData.boundaries.dimensionsMatch} 
                    onChange={(e) => {
                      const checked = e.target.checked;
                      updateSection('boundaries', 'dimensionsMatch', checked);
                      if (checked) {
                        updateSection('boundaries', 'northActualDim', formData.boundaries.northDeedDim);
                        updateSection('boundaries', 'southActualDim', formData.boundaries.southDeedDim);
                        updateSection('boundaries', 'eastActualDim', formData.boundaries.eastDeedDim);
                        updateSection('boundaries', 'westActualDim', formData.boundaries.westDeedDim);
                      }
                    }} 
                  />
                  Actual dimensions match document
                </label>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-4 rounded-xl border border-gray-200">
                {(['north', 'south', 'east', 'west'] as const).map(dir => (
                  <div key={`${dir}Dim`} className="flex gap-2">
                    <div className="flex-1">
                      <label className={labelStyles}>{dir.charAt(0).toUpperCase() + dir.slice(1)} (Deed)</label>
                      <input 
                        type="text" 
                        className={inputStyles} 
                        value={(formData.boundaries as any)[`${dir}DeedDim`]} 
                        onChange={e => handleDimensionChange(dir, 'DeedDim', e.target.value)} 
                      />
                    </div>
                    <div className="flex-1">
                      <label className={labelStyles}>{dir.charAt(0).toUpperCase() + dir.slice(1)} (Actual)</label>
                      <input 
                        type="text" 
                        className={`${inputStyles} ${formData.boundaries.dimensionsMatch ? 'bg-gray-100 cursor-not-allowed' : ''}`} 
                        value={(formData.boundaries as any)[`${dir}ActualDim`]} 
                        onChange={e => handleDimensionChange(dir, 'ActualDim', e.target.value)} 
                        disabled={formData.boundaries.dimensionsMatch}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. Textual Boundaries (Neighbors, Properties, etc.) */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-[13px] font-bold text-[#00a0ef]">Boundary Descriptions (Neighbors)</h4>
                <label className="flex items-center gap-2 text-[12px] font-semibold text-gray-700 cursor-pointer bg-white px-3 py-1.5 rounded-lg border border-gray-200 shadow-sm">
                  <input 
                    type="checkbox" 
                    className="w-4 h-4 text-[#00a0ef] rounded border-gray-300 focus:ring-[#00a0ef]"
                    checked={formData.boundaries.boundariesMatch} 
                    onChange={(e) => {
                      const checked = e.target.checked;
                      updateSection('boundaries', 'boundariesMatch', checked);
                      if (checked) {
                        updateSection('boundaries', 'northBoundaryActual', formData.boundaries.northBoundaryDeed);
                        updateSection('boundaries', 'southBoundaryActual', formData.boundaries.southBoundaryDeed);
                        updateSection('boundaries', 'eastBoundaryActual', formData.boundaries.eastBoundaryDeed);
                        updateSection('boundaries', 'westBoundaryActual', formData.boundaries.westBoundaryDeed);
                      }
                    }} 
                  />
                  Actual neighbors match document
                </label>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-4 rounded-xl border border-gray-200">
                {(['north', 'south', 'east', 'west'] as const).map(dir => (
                  <div key={`${dir}Text`} className="flex gap-2">
                    <div className="flex-1">
                      <label className={labelStyles}>{dir.charAt(0).toUpperCase() + dir.slice(1)} Neighbor (Deed)</label>
                      <input 
                        type="text" 
                        placeholder="e.g. H.No 2-1-206"
                        className={inputStyles} 
                        value={(formData.boundaries as any)[`${dir}BoundaryDeed`]} 
                        onChange={e => handleTextBoundaryChange(dir, 'Deed', e.target.value)} 
                      />
                    </div>
                    <div className="flex-1">
                      <label className={labelStyles}>{dir.charAt(0).toUpperCase() + dir.slice(1)} Neighbor (Actual)</label>
                      <input 
                        type="text" 
                        placeholder="e.g. H.No 2-1-206"
                        className={`${inputStyles} ${formData.boundaries.boundariesMatch ? 'bg-gray-100 cursor-not-allowed' : ''}`} 
                        value={(formData.boundaries as any)[`${dir}BoundaryActual`]} 
                        onChange={e => handleTextBoundaryChange(dir, 'Actual', e.target.value)} 
                        disabled={formData.boundaries.boundariesMatch}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6 mt-6">
              <label className={labelStyles}>Property Negative Points</label>
              <MultiSelectGroup 
                options={['HT line Over building', 'transformer in front', 'sub division of property', 'community dominace', 'common stair for separate units', 'near rail way track', 'near drain', 'near banquet hall']} 
                selected={formData.negativePoints} 
                onChange={v => setFormData((prev: AppState) => ({ ...prev, negativePoints: v }))} 
              />
            </div>
          </div>
        )}
      </div>

    </div>
  );
}

function Step2Form({ formData, setFormData }: { formData: AppState; setFormData: (val: any) => void }) {
  const [activeSection, setActiveSection] = useState<string>('floors');
  const [activeFloorId, setActiveFloorId] = useState<string>('');

  useEffect(() => {
    if (formData.floors.length > 0 && !activeFloorId) setActiveFloorId(formData.floors[0].id);
  }, [formData.floors]);

  const handleAddFloor = (floorName: string) => {
    if (!floorName) return;
    const existing = formData.floors.find((f: FloorDetail) => f.floorName === floorName);
    if (existing) {
      setActiveFloorId(existing.id);
    } else {
      const newFloor: FloorDetail = {
        id: Math.random().toString(36).substr(2, 9),
        floorName, possessionWith: '', unit: '', length: '', breadth: '', conversionUnit: '', coveredArea: '', condition: '', structure: '', flooring: '', accommodation: '', doorsWindows: '', floorRemarks: ''
      };
      setFormData((prev: AppState) => ({ ...prev, floors: [...prev.floors, newFloor] }));
      setActiveFloorId(newFloor.id);
    }
  };

  const updateFloor = (id: string, field: keyof FloorDetail, value: string) => {
    setFormData((prev: AppState) => ({
      ...prev,
      floors: prev.floors.map(f => {
        if (f.id === id) {
          const newF = { ...f, [field]: value };
          if (field === 'length' || field === 'breadth') {
            const l = parseFloat(newF.length) || 0;
            const b = parseFloat(newF.breadth) || 0;
            newF.coveredArea = (l * b).toString();
          }
          return newF;
        }
        return f;
      })
    }));
  };

  const removeFloor = (id: string) => {
    setFormData((prev: AppState) => {
      const newFloors = prev.floors.filter(f => f.id !== id);
      if (activeFloorId === id) setActiveFloorId(newFloors.length > 0 ? newFloors[0].id : '');
      return { ...prev, floors: newFloors };
    });
  };

  const updateMarket = (field: string, value: any) => {
    setFormData((prev: AppState) => ({ ...prev, market: { ...prev.market, [field]: value } }));
  };

  const renderSectionHeader = (title: string, id: string) => (
    <div className={`flex items-center justify-between p-4 md:px-6 md:py-5 cursor-pointer transition-colors ${activeSection === id ? 'bg-blue-50/50 border-b border-blue-100' : 'bg-white hover:bg-gray-50 border-b border-gray-100'}`} onClick={() => setActiveSection(activeSection === id ? '' : id)}>
      <h3 className="font-bold md:text-[15px] text-[#00a0ef]">{title}</h3>
      <ChevronDown className={`w-5 h-5 text-[#00a0ef] transition-transform ${activeSection === id ? 'rotate-180' : ''}`} />
    </div>
  );

  return (
    <div className="bg-white border border-gray-200 md:rounded-xl overflow-hidden shadow-sm divide-y divide-gray-100">
      
      <div>
        {renderSectionHeader('Building Details (Per Floor)', 'floors')}
        {activeSection === 'floors' && (
          <div className="p-4 md:p-6 bg-blue-50/10">
            <div className="mb-6">
              <label className={labelStyles}>Select or Add Floor Details</label>
              <RadioGroup options={['basement', 'stilt', 'GF', 'FF', 'SF', 'TF', '4th', 'multistorey']} value="" onChange={v => handleAddFloor(v)} />
            </div>

            {formData.floors.length > 0 && (
              <div className="flex flex-col md:flex-row gap-4">
                <div className="md:w-48 shrink-0 flex flex-col gap-2">
                  {formData.floors.map(f => (
                    <div key={f.id} className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${activeFloorId === f.id ? 'bg-[#00a0ef] border-[#00a0ef] text-white shadow-md' : 'bg-white border-gray-200 text-gray-700 hover:border-gray-300'}`} onClick={() => setActiveFloorId(f.id)}>
                      <span className="font-semibold text-[13px]">{f.floorName}</span>
                      <button type="button" onClick={(e) => { e.stopPropagation(); removeFloor(f.id); }} className={`p-1 rounded hover:bg-black/10 ${activeFloorId === f.id ? 'text-white' : 'text-gray-400 hover:text-red-500'}`}><Trash2 size={14} /></button>
                    </div>
                  ))}
                </div>
                
                <div className="flex-1 bg-white p-4 md:p-6 rounded-xl border border-gray-200 shadow-sm">
                  {formData.floors.filter(f => f.id === activeFloorId).map(activeFloor => (
                    <div key={activeFloor.id} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="md:col-span-2 pb-3 border-b border-gray-100 mb-2">
                        <h4 className="font-bold text-[#00a0ef] text-[15px]">{activeFloor.floorName} Details</h4>
                      </div>

                      <div className="md:col-span-2"><label className={labelStyles}>Possession With</label><RadioGroup options={['owner', 'tenant']} value={activeFloor.possessionWith} onChange={v => updateFloor(activeFloor.id, 'possessionWith', v)} /></div>

                      <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div><label className={labelStyles}>Unit</label><RadioGroup options={['feet', 'inch', 'meter']} value={activeFloor.unit} onChange={v => updateFloor(activeFloor.id, 'unit', v)} /></div>
                        <div><label className={labelStyles}>Length</label><input type="number" className={inputStyles} value={activeFloor.length} onChange={e => updateFloor(activeFloor.id, 'length', e.target.value)} /></div>
                        <div><label className={labelStyles}>Breadth</label><input type="number" className={inputStyles} value={activeFloor.breadth} onChange={e => updateFloor(activeFloor.id, 'breadth', e.target.value)} /></div>
                        <div className="md:col-span-3 border-t border-gray-50 pt-4"><label className={labelStyles}>Conversion Unit</label><RadioGroup options={['sq ft', 'sq yd', 'sq mt', 'Acre', 'Hectare', 'Guntas']} value={activeFloor.conversionUnit} onChange={v => updateFloor(activeFloor.id, 'conversionUnit', v)} /></div>
                        <div className="md:col-span-3"><label className={labelStyles}>Covered Area</label><input type="text" className={`${inputStyles} bg-gray-50`} readOnly value={activeFloor.coveredArea} /></div>
                      </div>

                      <div className="md:col-span-2"><label className={labelStyles}>Condition</label><RadioGroup options={['excellent', 'good', 'avg', 'poor', 'under construction', 'under finishing', 'others']} value={activeFloor.condition} onChange={v => updateFloor(activeFloor.id, 'condition', v)} /></div>
                      <div className="md:col-span-2"><label className={labelStyles}>Structure</label><RadioGroup options={['Rcc framed', 'load bearing', 'composite Structure', 'Peb/shed']} value={activeFloor.structure} onChange={v => updateFloor(activeFloor.id, 'structure', v)} /></div>
                      <div className="md:col-span-2"><label className={labelStyles}>Flooring</label><RadioGroup options={['tiles', 'marble', 'wood', 'cement', 'pending', 'other']} value={activeFloor.flooring} onChange={v => updateFloor(activeFloor.id, 'flooring', v)} /></div>
                      <div className="md:col-span-2"><label className={labelStyles}>Accommodation</label><RadioGroup options={['storage', 'shop', 'office space', '1BHK', '1.5BHK', '2BHK', '2.5BHK', '3BHK', '3.5BHK', '4BHK', '4.5BHK', '5BHK', '5.5BHK', '6BHK', 'studio', 'penthouse']} value={activeFloor.accommodation} onChange={v => updateFloor(activeFloor.id, 'accommodation', v)} /></div>
                      <div className="md:col-span-2"><label className={labelStyles}>Doors / Windows</label><RadioGroup options={['wooden', 'aluminium', 'glass', 'upvc', 'pending', 'N/A']} value={activeFloor.doorsWindows} onChange={v => updateFloor(activeFloor.id, 'doorsWindows', v)} /></div>
                      <div className="md:col-span-2"><label className={labelStyles}>Floor Remarks</label><textarea rows={3} className={inputStyles} value={activeFloor.floorRemarks} onChange={e => updateFloor(activeFloor.id, 'floorRemarks', e.target.value)}></textarea></div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <NextSectionButton onClick={() => setActiveSection('market')} nextFocusId="market-first" />
          </div>
        )}
      </div>

      <div>
        {renderSectionHeader('Building-Shared / Market', 'market')}
        {activeSection === 'market' && (
          <div className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-2 gap-6 bg-blue-50/10">
            <div><label className={labelStyles} id="market-first">Year of Construction</label><input type="text" className={inputStyles} value={formData.market.yearOfConstruction} onChange={e => updateMarket('yearOfConstruction', e.target.value)} /></div>
            <div><label className={labelStyles}>Renovation</label><RadioGroup options={['yes', 'no']} value={formData.market.renovation} onChange={v => updateMarket('renovation', v)} /></div>
            <div className="md:col-span-2"><label className={labelStyles}>Parking</label><RadioGroup options={['covered', 'notpresent', 'open', 'N/A']} value={formData.market.parking} onChange={v => updateMarket('parking', v)} /></div>
            <div className="md:col-span-2"><label className={labelStyles}>Lift</label><RadioGroup options={['yes', 'No', 'N/A']} value={formData.market.lift} onChange={v => updateMarket('lift', v)} /></div>
            <div className="md:col-span-2"><label className={labelStyles}>Kitchen Type</label><RadioGroup options={['modular', 'semi modular', 'odinary', 'N/A', 'other']} value={formData.market.kitchenType} onChange={v => updateMarket('kitchenType', v)} /></div>

            <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4 bg-white p-4 rounded-xl border border-gray-200">
              <div className="md:col-span-3 border-b border-gray-100 pb-2 mb-2"><h4 className="text-[13px] font-bold text-[#00a0ef]">Rental Income</h4></div>
              <div><label className={labelStyles}>Minimum</label><input type="number" className={inputStyles} value={formData.market.rentalMin} onChange={e => updateMarket('rentalMin', e.target.value)} /></div>
              <div><label className={labelStyles}>Maximum</label><input type="number" className={inputStyles} value={formData.market.rentalMax} onChange={e => updateMarket('rentalMax', e.target.value)} /></div>
              <div><label className={labelStyles}>Unit</label><RadioGroup options={['hundred', 'thousand', 'lakh', 'crore']} value={formData.market.rentalUnit} onChange={v => updateMarket('rentalUnit', v)} /></div>
            </div>

            {['Client', 'Dealer', 'Market'].map((type) => {
              const minField = `market${type}Min` as keyof AppState['market'];
              const maxField = `market${type}Max` as keyof AppState['market'];
              const unitField = `market${type}Unit` as keyof AppState['market'];
              return (
                <div key={type} className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4 bg-white p-4 rounded-xl border border-gray-200">
                  <div className="md:col-span-3 border-b border-gray-100 pb-2 mb-2"><h4 className="text-[13px] font-bold text-[#00a0ef]">Market Rate ({type === 'Market' ? 'As per market' : type})</h4></div>
                  <div><label className={labelStyles}>Minimum</label><input type="number" className={inputStyles} value={formData.market[minField] as string} onChange={e => updateMarket(minField, e.target.value)} /></div>
                  <div><label className={labelStyles}>Maximum</label><input type="number" className={inputStyles} value={formData.market[maxField] as string} onChange={e => updateMarket(maxField, e.target.value)} /></div>
                  <div><label className={labelStyles}>Unit</label><RadioGroup options={['hundred', 'thousand', 'lakh', 'crore']} value={formData.market[unitField] as string} onChange={v => updateMarket(unitField, v)} /></div>
                </div>
              );
            })}

            <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-4 rounded-xl border border-gray-200">
              <div className="md:col-span-2 border-b border-gray-100 pb-2 mb-2"><h4 className="text-[13px] font-bold text-[#00a0ef]">Dealer Details</h4></div>
              <div><label className={labelStyles}>Dealer Name</label><input type="text" className={inputStyles} value={formData.market.dealerName} onChange={e => updateMarket('dealerName', e.target.value)} /></div>
              <div><label className={labelStyles}>Mobile Number</label><input type="tel" className={inputStyles} value={formData.market.dealerMobile} onChange={e => updateMarket('dealerMobile', e.target.value)} /></div>
            </div>

            <div className="md:col-span-2 bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <label className={labelStyles}>Additional Details</label>
                <button type="button" onClick={() => updateMarket('additionalDetails', [...formData.market.additionalDetails, { key: '', value: '' }])} className="text-[13px] font-semibold text-[#00a0ef] hover:underline flex items-center gap-1"><Plus size={14} /> Add Detail</button>
              </div>
              <div className="space-y-3">
                {formData.market.additionalDetails.map((pair, idx) => (
                  <div key={idx} className="flex gap-3">
                    <input type="text" placeholder="Key" className={inputStyles} value={pair.key} onChange={e => {
                      const newArr = [...formData.market.additionalDetails];
                      newArr[idx].key = e.target.value;
                      updateMarket('additionalDetails', newArr);
                    }} />
                    <input type="text" placeholder="Value" className={inputStyles} value={pair.value} onChange={e => {
                      const newArr = [...formData.market.additionalDetails];
                      newArr[idx].value = e.target.value;
                      updateMarket('additionalDetails', newArr);
                    }} />
                    <button type="button" onClick={() => {
                      const newArr = formData.market.additionalDetails.filter((_, i) => i !== idx);
                      updateMarket('additionalDetails', newArr);
                    }} className="px-3 py-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"><Trash2 size={18} /></button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Step3Form({ formData, setFormData }: { formData: AppState; setFormData: (val: any) => void }) {
  const photoInputRef = useRef<HTMLInputElement>(null);
  const docInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (type: 'photos' | 'documents', e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData((prev: AppState) => ({ ...prev, uploads: { ...prev.uploads, [type]: [...prev.uploads[type], ...Array.from(e.target.files!)] } }));
    }
  };

  const removeFile = (type: 'photos' | 'documents', idx: number) => {
    setFormData((prev: AppState) => ({ ...prev, uploads: { ...prev.uploads, [type]: prev.uploads[type].filter((_, i) => i !== idx) } }));
  };

  return (
    <div className="bg-white border border-gray-200 md:rounded-xl overflow-hidden shadow-sm p-4 md:p-6 space-y-8">
      <div>
        <h3 className="font-bold md:text-[16px] text-[#00a0ef] mb-4">Site Photos <span className="text-red-500">*</span></h3>
        <div onClick={() => photoInputRef.current?.click()} className="border-2 border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition cursor-pointer">
          <input type="file" multiple accept="image/*" className="hidden" ref={photoInputRef} onChange={(e) => handleFileUpload('photos', e)} />
          <UploadCloud className="w-8 h-8 text-gray-400 mb-2" />
          <p className="text-sm text-gray-600 text-center">Click to <span className="text-[#00a0ef] font-medium">browse photos</span></p>
        </div>
        {formData.uploads.photos.length > 0 && (
          <div className="grid grid-cols-3 md:grid-cols-5 gap-3 mt-4">
            {formData.uploads.photos.map((file, idx) => (
              <div key={idx} className="relative aspect-square rounded-lg border border-gray-200 overflow-hidden bg-gray-50 flex items-center justify-center group">
                <img src={URL.createObjectURL(file)} alt="Preview" className="w-full h-full object-cover transition-opacity group-hover:opacity-75" />
                <button type="button" onClick={(e) => { e.stopPropagation(); removeFile('photos', idx); }} className="absolute top-1 right-1 bg-white/90 rounded-full p-1 shadow-md opacity-0 group-hover:opacity-100 transition-all hover:bg-red-50 text-red-500"><X size={14} /></button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="border-t border-gray-100 pt-8">
        <h3 className="font-bold md:text-[16px] text-[#00a0ef] mb-4">Documents <span className="text-red-500">*</span></h3>
        <div onClick={() => docInputRef.current?.click()} className="border-2 border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition cursor-pointer">
          <input type="file" multiple className="hidden" ref={docInputRef} onChange={(e) => handleFileUpload('documents', e)} />
          <FileText className="w-8 h-8 text-gray-400 mb-2" />
          <p className="text-sm text-gray-600 text-center">Click to <span className="text-[#00a0ef] font-medium">browse documents</span></p>
        </div>
        {formData.uploads.documents.length > 0 && (
          <div className="space-y-3 mt-4">
            {formData.uploads.documents.map((file, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 border border-gray-100 rounded-xl">
                <div className="flex items-center gap-3"><div className="w-10 h-10 bg-[#e6f5fd] rounded-lg flex items-center justify-center text-[#00a0ef]"><FileText className="w-5 h-5" /></div><div><p className="text-[13px] font-medium text-gray-900 line-clamp-1">{file.name}</p><p className="text-xs text-gray-500">{(file.size / (1024 * 1024)).toFixed(1)} MB</p></div></div>
                <button type="button" onClick={() => removeFile('documents', idx)} className="text-[13px] text-red-500 font-medium px-2 py-1">Remove</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function Step4Form({ formData, onEditStep, isConfirmed, setIsConfirmed }: { formData: AppState; onEditStep: (step: number) => void; isConfirmed: boolean; setIsConfirmed: (v: boolean) => void }) {
  const MainCategory = ({ title, icon: Icon, children }: any) => (
    <div className="mb-8 px-1"><div className="flex items-center gap-2 mb-4"><div className="w-5 h-5 flex items-center justify-center text-[#00a0ef]"><Icon className="w-5 h-5 fill-current opacity-20" strokeWidth={2} /></div><h3 className="text-[15px] font-bold text-gray-900">{title}</h3></div><div className="bg-white px-2">{children}</div></div>
  );
  const SubCategory = ({ title, stepNum, children }: any) => (
    <div className="py-4 border-b border-gray-200 last:border-0 first:pt-0"><div className="flex items-center justify-between mb-4"><h4 className="text-[13px] font-bold text-gray-800">{title}</h4><button type="button" onClick={() => onEditStep(stepNum)} className="text-[#00a0ef] hover:bg-blue-50 p-1.5 rounded transition-colors"><Edit2 className="w-3.5 h-3.5" /></button></div><div className="grid grid-cols-2 gap-y-4 gap-x-4">{children}</div></div>
  );
  const DataField = ({ label, value }: any) => (
    <div><p className="text-[11px] text-gray-500 font-medium mb-1">{label}</p><div className="text-[13px] font-medium text-gray-900 break-words">{value || '—'}</div></div>
  );

  return (
    <div className="max-w-3xl bg-white mx-auto md:px-4 pb-8">
      <div className="py-6 px-2"><h2 className="text-[18px] font-bold text-[#00a0ef]">Review & Submit</h2></div>

      <MainCategory title="Client, Owner & Property" icon={Landmark}>
        <SubCategory title="Bank Details" stepNum={1}>
          <DataField label="IFSC Code" value={formData.clientBank.ifsc} />
          <DataField label="Bank Name" value={formData.clientBank.bankName} />
          <DataField label="Branch" value={formData.clientBank.branch} />
          <DataField label="Email" value={formData.clientBank.email} />
          <DataField label="POC" value={`${formData.clientBank.contactPersonName} / ${formData.clientBank.contactPersonNumber}`} />
          <DataField label="Dates" value={`${formData.clientBank.dateOfInspection} / ${formData.clientBank.dateOfValuation}`} />
          <DataField label="Type of Property" value={formData.clientBank.propertyType} />
          <DataField label="Purpose" value={formData.clientBank.purposeOfValuation} />
        </SubCategory>
        <SubCategory title="Owner Details & Locality" stepNum={1}>
          <DataField label="Name" value={`${formData.owner.prefix} ${formData.owner.ownerName}`} />
          <DataField label="Relation" value={`${formData.owner.relation} ${formData.owner.relationName}`} />
          <DataField label="Phone" value={`${formData.owner.phone1} / ${formData.owner.phone2}`} />
          <DataField label="Urban/Rural" value={formData.locality.urbanRural} />
          <DataField label="Class" value={formData.locality.localityClass} />
          <DataField label="Tenure" value={formData.locality.landTenure} />
        </SubCategory>
        <SubCategory title="Property Settings" stepNum={1}>
          <DataField label="Address" value={formData.property.address} />
          <DataField label="Nature" value={formData.property.natureOfProperty} />
          <DataField label="Shape" value={formData.property.plotShape} />
          <DataField label="Calculated Area" value={`${formData.property.calculatedArea} ${formData.property.conversionUnit}`} />
          <DataField label="Wall Setup" value={`${formData.property.wallLength}x${formData.property.wallHeight} ${formData.property.wallUnit}`} />
          <DataField label="Negative Points" value={formData.negativePoints.join(', ')} />
        </SubCategory>
        <SubCategory title="Boundaries" stepNum={1}>
          <DataField label="Unit" value={formData.boundaries.unit} />
          <DataField label="Dimensions Match" value={formData.boundaries.dimensionsMatch ? "Yes" : "No"} />
          <DataField label="North (Deed/Act)" value={`${formData.boundaries.northDeedDim} / ${formData.boundaries.northActualDim}`} />
          <DataField label="South (Deed/Act)" value={`${formData.boundaries.southDeedDim} / ${formData.boundaries.southActualDim}`} />
          <DataField label="East (Deed/Act)" value={`${formData.boundaries.eastDeedDim} / ${formData.boundaries.eastActualDim}`} />
          <DataField label="West (Deed/Act)" value={`${formData.boundaries.westDeedDim} / ${formData.boundaries.westActualDim}`} />
        </SubCategory>
        <SubCategory title="Boundary Descriptions" stepNum={1}>
          <DataField label="Neighbors Match" value={formData.boundaries.boundariesMatch ? "Yes" : "No"} />
          <DataField label="North (Deed/Act)" value={`${formData.boundaries.northBoundaryDeed || 'N/A'} / ${formData.boundaries.northBoundaryActual || 'N/A'}`} />
          <DataField label="South (Deed/Act)" value={`${formData.boundaries.southBoundaryDeed || 'N/A'} / ${formData.boundaries.southBoundaryActual || 'N/A'}`} />
          <DataField label="East (Deed/Act)" value={`${formData.boundaries.eastBoundaryDeed || 'N/A'} / ${formData.boundaries.eastBoundaryActual || 'N/A'}`} />
          <DataField label="West (Deed/Act)" value={`${formData.boundaries.westBoundaryDeed || 'N/A'} / ${formData.boundaries.westBoundaryActual || 'N/A'}`} />
        </SubCategory>
      </MainCategory>

      <MainCategory title="Building & Market Details" icon={Building}>
        {formData.floors.map((floor) => (
          <SubCategory key={floor.id} title={`Floor: ${floor.floorName}`} stepNum={2}>
            <DataField label="Possession" value={floor.possessionWith} />
            <DataField label="Covered Area" value={`${floor.coveredArea} ${floor.conversionUnit}`} />
            <DataField label="Condition" value={floor.condition} />
            <DataField label="Structure" value={floor.structure} />
            <DataField label="Flooring" value={floor.flooring} />
            <DataField label="Accommodation" value={floor.accommodation} />
            <DataField label="Doors/Windows" value={floor.doorsWindows} />
            <DataField label="Remarks" value={floor.floorRemarks} />
          </SubCategory>
        ))}
        <SubCategory title="Market & Shared Details" stepNum={2}>
          <DataField label="Year Constructed" value={formData.market.yearOfConstruction} />
          <DataField label="Renovation" value={formData.market.renovation} />
          <DataField label="Parking" value={formData.market.parking} />
          <DataField label="Rental Income" value={`${formData.market.rentalMin} - ${formData.market.rentalMax} ${formData.market.rentalUnit}`} />
          <DataField label="Client Rate" value={`${formData.market.marketClientMin} - ${formData.market.marketClientMax} ${formData.market.marketClientUnit}`} />
          <DataField label="Dealer Rate" value={`${formData.market.marketDealerMin} - ${formData.market.marketDealerMax} ${formData.market.marketDealerUnit}`} />
          <DataField label="Market Rate" value={`${formData.market.marketMarketMin} - ${formData.market.marketMarketMax} ${formData.market.marketMarketUnit}`} />
          <DataField label="Dealer Details" value={`${formData.market.dealerName} / ${formData.market.dealerMobile}`} />
        </SubCategory>
      </MainCategory>

      <MainCategory title="Uploads" icon={UploadCloud}>
        <SubCategory title="Files Overview" stepNum={3}>
          <DataField label="Photos" value={`${formData.uploads.photos.length} uploaded`} />
          <DataField label="Documents" value={`${formData.uploads.documents.length} uploaded`} />
        </SubCategory>
      </MainCategory>

      <div className="mt-8 p-4 bg-[#f8fafc] border border-gray-200 rounded-xl flex flex-col gap-2">
        <div className="flex items-start gap-3">
          <div className="pt-0.5"><input type="checkbox" id="final-confirm" checked={isConfirmed} onChange={(e) => setIsConfirmed(e.target.checked)} className="w-4 h-4 text-[#00a0ef] border-gray-300 rounded focus:ring-[#00a0ef]" /></div>
          <label htmlFor="final-confirm" className="text-[13px] text-gray-700 leading-relaxed select-none cursor-pointer">I confirm that all information provided above is correct.</label>
        </div>
        {(!formData.uploads.photos.length || !formData.uploads.documents.length) && (
          <p className="text-red-500 text-[12px] font-medium mt-1">Please ensure at least one photo and one document is uploaded in Step 3 before submitting.</p>
        )}
      </div>
    </div>
  );
}

export default function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isSubmittedSuccessfully, setIsSubmittedSuccessfully] = useState(false);

  const [customers, setCustomers] = useState<any[]>([]);
  const [isLoadingCustomers, setIsLoadingCustomers] = useState(true);

  const [formData, setFormData] = useState<AppState>({
    customer: '',
    clientBank: { ifsc: '', bankName: '', branch: '', email: '', contactPersonName: '', contactPersonNumber: '', dateOfInspection: '', dateOfValuation: '', propertyType: '', purposeOfValuation: '' },
    owner: { prefix: 'Shri', ownerName: '', relation: 'S/o', relationName: '', occupation: '', phone1: '', phone2: '' },
    locality: { urbanRural: '', localityClass: '', landTenure: '', widthOfRoad: '', noOfStories: '', sanitaryFitting: '', electricalFitting: '', townplan: '' },
    property: { address: '', natureOfProperty: '', vacantPlot: '', widthOfRoad: '', latitude: '', longitude: '', boundaryCoordinates: [], plotShape: '', dimensionUnit: '', length: '', breadth: '', conversionUnit: '', calculatedArea: '', wallUnit: '', wallLength: '', wallHeight: '', wallsOnSide: '', brickType: '' },
    boundaries: { 
      unit: '', 
      dimensionsMatch: false,
      boundariesMatch: false,
      northDeedDim: '', southDeedDim: '', eastDeedDim: '', westDeedDim: '',
      northActualDim: '', southActualDim: '', eastActualDim: '', westActualDim: '',
      northBoundaryDeed: '', southBoundaryDeed: '', eastBoundaryDeed: '', westBoundaryDeed: '',
      northBoundaryActual: '', southBoundaryActual: '', eastBoundaryActual: '', westBoundaryActual: ''
    },
    floors: [],
    market: { yearOfConstruction: '', renovation: '', parking: '', lift: '', rentalMin: '', rentalMax: '', rentalUnit: '', kitchenType: '', marketClientMin: '', marketClientMax: '', marketClientUnit: '', marketDealerMin: '', marketDealerMax: '', marketDealerUnit: '', marketMarketMin: '', marketMarketMax: '', marketMarketUnit: '', dealerName: '', dealerMobile: '', additionalDetails: [] },
    negativePoints: [],
    uploads: { photos: [], documents: [] }
  });

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const data = await api.getCustomerProfiles();
        setCustomers(data);
      } catch (error) {
        console.error("Failed to fetch customers:", error);
      } finally {
        setIsLoadingCustomers(false);
      }
    };
    fetchCustomers();
  }, []);

  const handleCustomerSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value;
    const selectedCustomer = customers.find(c => c.id === selectedId);

    if (selectedCustomer) {
      setFormData(prev => ({
        ...prev,
        customer: selectedId,
        clientBank: { ...prev.clientBank, ...selectedCustomer.clientBank },
        owner: { ...prev.owner, ...selectedCustomer.owner }
      }));
    } else {
      setFormData(prev => ({ ...prev, customer: '' }));
    }
  };

  const handleStepContinue = () => {
    if (currentStep < 4) { setCurrentStep(prev => prev + 1); window.scrollTo({ top: 0, behavior: 'smooth' }); }
    else { handleSubmit(); }
  };

  const handleStepBack = () => {
    if (currentStep > 1) { setCurrentStep(prev => prev - 1); window.scrollTo({ top: 0, behavior: 'smooth' }); }
  };

  const handleSubmit = async () => {
    if (!isConfirmed) { alert('Please check the confirmation box to submit.'); return; }
    setIsSubmitting(true);
    
    try {
      const customerIdPath = formData.customer || "unknown_customer";
      
      const uploadedPhotosUrls = await Promise.all(
        formData.uploads.photos.map(file => 
          uploadFile(file, `valuation-records/${customerIdPath}/photos/${Date.now()}_${file.name}`)
        )
      );
      
      const uploadedDocumentsUrls = await Promise.all(
        formData.uploads.documents.map(file => 
          uploadFile(file, `valuation-records/${customerIdPath}/documents/${Date.now()}_${file.name}`)
        )
      );

      const payload = {
        customer: formData.customer,
        clientBank: formData.clientBank,
        owner: formData.owner,
        locality: formData.locality,
        property: formData.property,
        boundaries: formData.boundaries,
        floors: formData.floors,
        market: formData.market,
        negativePoints: formData.negativePoints,
        uploads: { 
          photos: uploadedPhotosUrls, 
          documents: uploadedDocumentsUrls 
        }
      };

      await api.createValuationRecord(payload);
      setIsSubmittedSuccessfully(true);

    } catch (e) { 
      console.error("Failed to submit report:", e); 
      alert("An error occurred while uploading files or submitting the report.");
    } finally { 
      setIsSubmitting(false); 
    }
  };

  if (isSubmittedSuccessfully) {
    return (
      <div className="flex flex-col flex-1 w-full relative min-h-screen md:min-h-0 bg-white overflow-hidden items-center justify-center p-6">
        <div className="w-[88px] h-[88px] rounded-full flex items-center justify-center bg-[#f0f8fd] mb-6">
          <div className="w-[60px] h-[60px] rounded-full bg-white flex items-center justify-center shadow-sm">
            <div className="w-[32px] h-[32px] bg-[#00a0ef] rounded-full flex items-center justify-center"><Check className="w-4 h-4 text-white" strokeWidth={3.5} /></div>
          </div>
        </div>
        <h2 className="text-[20px] lg:text-[24px] font-bold text-gray-900 mb-3 text-center">Report submitted successfully.</h2>
        <p className="text-[#8A94A6] text-[14px] md:text-[15px] mb-8 text-center max-w-sm">Files uploaded and data verified.</p>
        <button onClick={() => window.location.reload()} className="px-8 py-3 bg-[#00a0ef] hover:bg-[#008bd1] rounded-lg text-white font-medium transition-colors">Start New Report</button>
      </div>
    );
  }

  const isUploadsReady = formData.uploads.photos.length > 0 && formData.uploads.documents.length > 0;
  const isSubmitDisabled = isSubmitting || (currentStep === 4 && (!isConfirmed || !isUploadsReady));

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:py-8">
      <div className="flex-1 flex flex-col w-full md:max-w-4xl md:mx-auto bg-white border-x md:border border-gray-200 md:rounded-xl md:shadow-sm overflow-hidden">
        
        <div className="px-4 md:px-6 py-4 border-b border-gray-200 bg-white flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h1 className="text-lg md:text-xl font-medium text-gray-900">Submit New Report</h1>
          <div className="relative w-full md:w-64">
            <select 
              className={`${inputStyles} appearance-none bg-blue-50/30 border-[#00a0ef]/30 font-medium disabled:opacity-50 disabled:cursor-not-allowed`} 
              value={formData.customer} 
              onChange={handleCustomerSelect}
              disabled={isLoadingCustomers}
            >
              <option value="">
                {isLoadingCustomers ? 'Loading Customers...' : 'Select Customer (Prefill)...'}
              </option>
              
              {customers.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.profileReference || `${c.owner?.ownerName || 'Unknown'} - ${c.clientBank?.bankName || 'Unknown Bank'}`}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
          </div>
        </div>

        <div className="px-6 pt-10 pb-6 md:pt-12 md:pb-8 border-b border-gray-200 bg-white shrink-0">
          <div className="max-w-xl mx-auto relative">
            <div className="flex items-center justify-between relative">
              <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[2px] bg-gray-200" />
              {[1, 2, 3, 4].map((step) => {
                const isCompleted = step < currentStep;
                const isCurrent = step === currentStep;
                return (
                  <div key={step} className="relative z-10 flex flex-col items-center">
                    <span className={`absolute -top-7 whitespace-nowrap text-xs font-semibold tracking-wide ${isCompleted || isCurrent ? 'text-[#00a0ef]' : 'text-gray-400'}`}>STEP {step}</span>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center bg-white ${isCompleted ? 'border-2 border-[#00a0ef] bg-[#00a0ef]' : isCurrent ? 'border-2 border-[#00a0ef]' : 'border-2 border-gray-300'}`}>
                      {isCompleted && <CircleCheck color='white' fill='#00a0ef' />}
                      {isCurrent && <div className="w-4 h-4 bg-[#00a0ef] rounded-full" />}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto bg-gray-50 md:p-6">
          {currentStep === 1 && <Step1Form formData={formData} setFormData={setFormData} />}
          {currentStep === 2 && <Step2Form formData={formData} setFormData={setFormData} />}
          {currentStep === 3 && <Step3Form formData={formData} setFormData={setFormData} />}
          {currentStep === 4 && <Step4Form formData={formData} onEditStep={setCurrentStep} isConfirmed={isConfirmed} setIsConfirmed={setIsConfirmed} />}
        </div>
        
        <div className="p-4 md:px-6 md:py-5 bg-white border-t border-gray-200 flex items-center justify-between mt-auto shrink-0">
          <button onClick={handleStepBack} className={`flex items-center px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 text-[13px] font-medium hover:bg-gray-50 transition-colors ${currentStep === 1 ? 'invisible' : ''}`}>
            <ArrowLeft className="w-4 h-4 mr-2" /> Back
          </button>
          <button onClick={handleStepContinue} disabled={isSubmitDisabled} className="flex items-center px-6 py-2.5 bg-[#00a0ef] hover:bg-[#008bd1] rounded-lg text-white text-[13px] font-medium transition-shadow shadow-sm hover:shadow-md disabled:opacity-60">
            {isSubmitting ? 'Uploading & Submitting...' : currentStep === 4 ? 'Submit Report' : `Continue to Step ${currentStep + 1}`}
            {!isSubmitting && currentStep !== 4 && <ArrowRight className="w-4 h-4 ml-2" />}
          </button>
        </div>
      </div>
    </div>
  );
}