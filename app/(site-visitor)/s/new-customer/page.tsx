//  'use client';

// import React, { useState, useEffect, useCallback, useRef } from 'react';
// import {
//   Loader, ArrowRight, Landmark, CheckCircle2, Edit2,
//   RotateCcw, Undo2, MapPin, Loader2,
//   ChevronDown, ChevronRight, Plus, X, Navigation,
// } from 'lucide-react';
// import Link from 'next/link';
// import { APIProvider, Map, AdvancedMarker, useMap } from '@vis.gl/react-google-maps';

// // ─── TYPES ──────────────────────────────────────────────────────────────────
// type Coord = { lat: number; lng: number };
// type Pin   = { id: number; coord: Coord };
// type SectionId = 'customer' | 'property' | 'location' | 'bank';

// // Relation prefix options per customer prefix
// const RELATION_PREFIXES: Record<string, string[]> = {
//   'Sri.':  ['S/o.', 'D/o.', 'W/o.', 'H/o.'],
//   'Smt.':  ['W/o.', 'D/o.', 'S/o.'],
//   'M/s.':  ['Rep. By', 'S/o.', 'D/o.'],
//   'Miss.': ['D/o.', 'S/o.'],
// };

// const DEFAULT_RELATION: Record<string, string> = {
//   'Sri.':  'S/o.',
//   'Smt.':  'W/o.',
//   'M/s.':  'Rep. By',
//   'Miss.': 'D/o.',
// };

// interface Customer {
//   id: string;
//   prefix: string;
//   name: string;
//   phone: string;
//   phone2: string;
//   relationPrefix: string;
//   relationName: string;
  
// }

// interface PointOfContact {
//   id: string;
//   prefix: string;
//   name: string;
//   phone: string;
//   phone2: string;
// }

// // ─── CONSTANTS ──────────────────────────────────────────────────────────────
// const MAX_PINS = 10;
// const COLORS   = ['#EF4444','#3B82F6','#10B981','#F59E0B','#8B5CF6','#EC4899','#14B8A6','#F97316','#6366F1','#84CC16'];
// const LABELS   = ['A','B','C','D','E','F','G','H','I','J'];

// const BANKS = [
//   { id: 'sbi',    name: 'State Bank of India',   iconColor: 'text-blue-600',   bgColor: 'bg-blue-100'  },
//   { id: 'ubi',    name: 'Union Bank of India',    iconColor: 'text-red-500',    bgColor: 'bg-red-50'    },
//   { id: 'canara', name: 'Canara',                 iconColor: 'text-yellow-500', bgColor: 'bg-yellow-50' },
//   { id: 'iob',    name: 'Indian Overseas Bank',   iconColor: 'text-blue-400',   bgColor: 'bg-blue-50'   },
//   { id: 'pnb',    name: 'Punjab National Bank',   iconColor: 'text-orange-500', bgColor: 'bg-orange-50' },
//   { id: 'bob',    name: 'Bank of Baroda',         iconColor: 'text-orange-600', bgColor: 'bg-orange-50' },
// ];

// const SERVICES = [
//   { id: 'plot_val',     label: 'Plot Valuation',     needsBank: true  },
//   { id: 'building_val', label: 'Building Valuation', needsBank: true  },
//   { id: 'legal',        label: 'Legal Report',       needsBank: false },
//   { id: 'survey',       label: 'Survey Report',      needsBank: false },
// ];

// const SECTIONS: { id: SectionId; label: string }[] = [
//   { id: 'customer', label: 'Customer Details'   },
//   { id: 'property', label: 'Property & Loan'    },
//   { id: 'location', label: 'Location of Site'   },
//   { id: 'bank',     label: 'Service & Bank'     },
// ];

// // ─── MAP CLICK HANDLER ───────────────────────────────────────────────────────
// function MapClickHandler({ onClick }: { onClick: (c: Coord) => void }) {
//   const map = useMap();
//   useEffect(() => {
//     if (!map) return;
//     const listener = map.addListener('click', (e: google.maps.MapMouseEvent) => {
//       if (e.latLng) onClick({ lat: e.latLng.lat(), lng: e.latLng.lng() });
//     });
//     return () => google.maps.event.removeListener(listener);
//   }, [map, onClick]);
//   return null;
// }

// // ─── PIN MARKER ──────────────────────────────────────────────────────────────
// function PinMarker({ index, coord, selected, onSelect }: {
//   index: number; coord: Coord; selected: boolean; onSelect: () => void;
// }) {
//   return (
//     <AdvancedMarker position={coord} zIndex={selected ? 100 : index}>
//       <button
//         type="button"
//         onClick={e => { e.stopPropagation(); onSelect(); }}
//         className={`flex items-center justify-center rounded-full font-bold text-white text-xs shadow-md transition-all ${
//           selected ? 'w-10 h-10 ring-4 ring-white scale-110' : 'w-8 h-8 ring-2 ring-white/80'
//         }`}
//         style={{ backgroundColor: COLORS[index] }}
//       >
//         {LABELS[index]}
//       </button>
//     </AdvancedMarker>
//   );
// }

// // ─── MULTI-PIN PICKER ────────────────────────────────────────────────────────
// // Fix: never call onCoordinatesChange inside setPins updater (setState-during-render bug).
// // Instead, derive next state, call setState once, then call onCoordinatesChange separately.
// function MultiPinLocationPicker({
//   onCoordinatesChange,
// }: {
//   onCoordinatesChange: (coords: Coord[], avg: Coord | null) => void;
// }) {
//   const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? '';
//   const [center,       setCenter]       = useState<Coord>({ lat: 15.8281, lng: 78.0373 });
//   const [zoom,         setZoom]         = useState(5);
//   const [pins,         setPins]         = useState<Pin[]>([]);
//   const [nextId,       setNextId]       = useState(0);
//   const [editTarget,   setEditTarget]   = useState<number | null>(null);
//   const [userLocation, setUserLocation] = useState<Coord | null>(null);
//   const [confirmed,    setConfirmed]    = useState(false);

//   // Stable ref so handleMapClick can call it without stale closure issues
//   const onChangeRef = useRef(onCoordinatesChange);
//   useEffect(() => { onChangeRef.current = onCoordinatesChange; }, [onCoordinatesChange]);

//   useEffect(() => {
//     navigator.geolocation?.getCurrentPosition(
//       pos => {
//         const loc: Coord = { lat: pos.coords.latitude, lng: pos.coords.longitude };
//         setUserLocation(loc);
//         setCenter(loc);
//         setZoom(17);
//       },
//       () => {},
//       { enableHighAccuracy: true }
//     );
//   }, []);

//   const calcAvg = (ps: Pin[]): Coord | null => {
//     if (!ps.length) return null;
//     return {
//       lat: ps.reduce((s, p) => s + p.coord.lat, 0) / ps.length,
//       lng: ps.reduce((s, p) => s + p.coord.lng, 0) / ps.length,
//     };
//   };

//   // ✅ Fix: compute next pins array first, then call setState + onChangeRef separately.
//   const handleMapClick = useCallback((coord: Coord) => {
//     if (confirmed && editTarget === null) return;

//     setPins(prev => {
//       let next: Pin[];
//       if (editTarget !== null) {
//         next = prev.map((p, i) => (i === editTarget ? { ...p, coord } : p));
//       } else {
//         if (prev.length >= MAX_PINS) return prev;
//         next = [...prev, { id: nextId, coord }];
//       }
//       // Schedule the parent callback after this render cycle completes
//       setTimeout(() => onChangeRef.current(next.map(p => p.coord), calcAvg(next)), 0);
//       return next;
//     });

//     if (editTarget !== null) setEditTarget(null);
//     else setNextId(n => n + 1);
//   }, [confirmed, editTarget, nextId]);

//   const handleUndo = () => {
//     setPins(prev => {
//       const next = prev.slice(0, -1);
//       setTimeout(() => onChangeRef.current(next.map(p => p.coord), calcAvg(next)), 0);
//       return next;
//     });
//   };

//   const handleConfirm = () => { setConfirmed(true); setEditTarget(null); };

//   const handleReset = () => {
//     setConfirmed(false);
//     setPins([]);
//     setEditTarget(null);
//     setNextId(0);
//     setTimeout(() => onChangeRef.current([], null), 0);
//   };

//   const avg = calcAvg(pins);

//   return (
//     <div className="flex flex-col w-full bg-white border border-gray-300 rounded-xl overflow-hidden shadow-sm">
//       {/* Header */}
//       <header className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b border-gray-200">
//         <div>
//           <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
//             <MapPin className="w-4 h-4 text-[#00a0ef]" />
//             Location Boundaries
//             <span className="text-[11px] font-normal text-gray-400 ml-1">
//               {pins.length}/{MAX_PINS} points
//             </span>
//           </h3>
//           <p className="text-xs text-gray-500 mt-0.5">
//             {confirmed
//               ? editTarget !== null
//                 ? `Tap map to move point ${LABELS[editTarget]}`
//                 : 'Confirmed. Tap a point card to reposition it.'
//               : editTarget !== null
//               ? `Tap map to move ${LABELS[editTarget]}`
//               : pins.length >= MAX_PINS
//               ? 'Max points reached. Confirm or undo.'
//               : 'Tap the map to add boundary points (1–10)'}
//           </p>
//         </div>
//         <div className="flex gap-2">
//           {!confirmed && pins.length > 0 && (
//             <button type="button" onClick={handleUndo}
//               className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-600 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
//               <Undo2 className="w-3.5 h-3.5" /> Undo
//             </button>
//           )}
//           {confirmed && (
//             <button type="button" onClick={handleReset}
//               className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-red-600 bg-red-50 border border-red-200 rounded-md hover:bg-red-100 transition-colors">
//               <RotateCcw className="w-3.5 h-3.5" /> Reset
//             </button>
//           )}
//         </div>
//       </header>

//       {/* Map */}
//       <div className="relative w-full h-64 md:h-80 bg-gray-100">
//         <APIProvider apiKey={apiKey}>
//           <Map
//             mapId="geo-picker-form"
//             center={center} zoom={zoom}
//             mapTypeId="satellite"
//             onCameraChanged={ev => { setCenter(ev.detail.center); setZoom(ev.detail.zoom); }}
//             gestureHandling="greedy"
//             mapTypeControl zoomControl fullscreenControl streetViewControl
//             style={{ width: '100%', height: '100%' }}
//           >
//             {userLocation && (
//               <AdvancedMarker position={userLocation}>
//                 <div className="relative">
//                   <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-lg" />
//                   <div className="absolute inset-0 w-4 h-4 bg-blue-400 rounded-full animate-ping opacity-40" />
//                 </div>
//               </AdvancedMarker>
//             )}

//             {/* Average centre pin */}
//             {avg && confirmed && (
//               <AdvancedMarker position={avg} zIndex={200}>
//                 <div className="flex flex-col items-center -mb-1">
//                   <div className="w-9 h-9 rounded-full border-2 border-white shadow-lg flex items-center justify-center bg-[#00a0ef]">
//                     <Navigation className="w-4 h-4 text-white fill-white" />
//                   </div>
//                   <div className="w-0.5 h-3 bg-[#00a0ef]" />
//                   <div className="w-2 h-1 bg-[#00a0ef]/40 rounded-full blur-sm" />
//                 </div>
//               </AdvancedMarker>
//             )}

//             {(!confirmed || editTarget !== null) && (
//               <MapClickHandler onClick={handleMapClick} />
//             )}

//             {pins.map((pin, i) => (
//               <PinMarker
//                 key={pin.id} index={i} coord={pin.coord}
//                 selected={editTarget === i}
//                 onSelect={() => {
//                   if (confirmed) setEditTarget(editTarget === i ? null : i);
//                 }}
//               />
//             ))}
//           </Map>
//         </APIProvider>

//         {/* Avg badge while picking */}
//         {avg && !confirmed && (
//           <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-gray-900/80 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-[11px] font-mono shadow-lg pointer-events-none whitespace-nowrap">
//             Avg: {avg.lat.toFixed(5)}, {avg.lng.toFixed(5)}
//           </div>
//         )}

//         {/* Edit target hint */}
//         {confirmed && editTarget !== null && (
//           <div className="absolute top-3 left-1/2 -translate-x-1/2 bg-gray-900/80 backdrop-blur-sm text-white px-4 py-2 rounded-full text-xs font-medium flex items-center gap-2 shadow-lg pointer-events-none">
//             Tap anywhere to place
//             <span className="px-1.5 py-0.5 rounded text-[10px] font-bold" style={{ backgroundColor: COLORS[editTarget] }}>
//               {LABELS[editTarget]}
//             </span>
//           </div>
//         )}
//       </div>

//       {/* Footer */}
//       <div className="p-4 bg-gray-50 border-t border-gray-200">
//         {!confirmed ? (
//           <div className="flex flex-col gap-3">
//             <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
//               <div className="h-full bg-[#00a0ef] transition-all duration-300"
//                 style={{ width: `${(pins.length / MAX_PINS) * 100}%` }} />
//             </div>
//             <button type="button" onClick={handleConfirm} disabled={pins.length === 0}
//               className={`w-full py-2.5 rounded-lg text-sm font-semibold transition-colors flex items-center justify-center gap-2 ${
//                 pins.length > 0
//                   ? 'bg-[#00a0ef] text-white hover:bg-[#008bd1] shadow-sm'
//                   : 'bg-gray-200 text-gray-400 cursor-not-allowed'
//               }`}>
//               {pins.length > 0
//                 ? <><CheckCircle2 className="w-4 h-4" />Confirm {pins.length} Point{pins.length !== 1 ? 's' : ''}</>
//                 : 'Place at least 1 point'}
//             </button>
//           </div>
//         ) : (
//           <div className="flex flex-col gap-3">
//             {/* Centre avg */}
//             {avg && (
//               <div className="flex items-center justify-between px-3 py-2 bg-[#f0f9ff] border border-[#bce4ff] rounded-lg">
//                 <div className="flex items-center gap-2">
//                   <Navigation className="w-3.5 h-3.5 text-[#00a0ef]" />
//                   <span className="text-[11px] font-semibold text-[#00a0ef]">Centre avg ({pins.length} pts)</span>
//                 </div>
//                 <span className="text-[10px] font-mono text-gray-600">{avg.lat.toFixed(5)}, {avg.lng.toFixed(5)}</span>
//               </div>
//             )}
//             {/* Pin cards */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
//               {pins.map((pin, i) => (
//                 <button key={pin.id} type="button"
//                   onClick={() => setEditTarget(editTarget === i ? null : i)}
//                   className={`flex items-center gap-3 p-2.5 rounded-lg border text-left transition-colors ${
//                     editTarget === i ? 'border-[#00a0ef] bg-blue-50' : 'border-gray-200 bg-white hover:border-gray-300'
//                   }`}>
//                   <div className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold text-white shrink-0 shadow-sm"
//                     style={{ backgroundColor: COLORS[i] }}>
//                     {LABELS[i]}
//                   </div>
//                   <div className="flex-1 min-w-0">
//                     <p className="text-[10px] font-medium text-gray-500 uppercase tracking-wider mb-0.5">
//                       {editTarget === i ? 'Tap map to move' : `Point ${i + 1}`}
//                     </p>
//                     <p className="text-xs font-mono text-gray-900 truncate">
//                       {pin.coord.lat.toFixed(5)}, {pin.coord.lng.toFixed(5)}
//                     </p>
//                   </div>
//                   <Edit2 className={`w-4 h-4 shrink-0 ${editTarget === i ? 'text-[#00a0ef]' : 'text-gray-400'}`} />
//                 </button>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// // ─── SECTION HEADER (original style) ────────────────────────────────────────
// function SectionHeader({
//   id, title, activeSection, setActiveSection, checkIsFilled,
// }: {
//   id: SectionId; title: string;
//   activeSection: SectionId;
//   setActiveSection: (s: SectionId) => void;
//   checkIsFilled: (id: SectionId) => boolean;
// }) {
//   const isFilled = checkIsFilled(id);
//   return (
//     <div
//       onClick={() => setActiveSection(id)}
//       className="flex items-center justify-between py-4 border-b border-gray-100 cursor-pointer"
//     >
//       <h3 className="text-[13px] font-medium md:text-lg text-[#00a0ef]">{title}</h3>
//       {isFilled ? (
//         <CheckCircle2 fill = {"#00a0ef"} className="w-5 h-5 md:w-6 md:h-6 text-[#ffffff]" />
//       ) : (
//         <Loader className={`w-5 h-5 md:w-6 md:h-6 text-[#00a0ef] ${activeSection === id ? '' : 'opacity-70'}`} />
//       )}
//     </div>
//   );
// }

// // ─── MAIN PAGE ───────────────────────────────────────────────────────────────
// export default function NewCustomerPage() {
//   const [activeSection, setActiveSection] = useState<SectionId>('customer');

//   // ── Customer state ─────────────────────────────────────────────────────────
//   const [customers, setCustomers] = useState<Customer[]>([{
//     id: '1',
//     prefix: 'Sri.', name: '', phone: '', phone2: '',
//     relationPrefix: 'S/o.', relationName: '',   
//   }]);
//   // Point of contact (no relation name)
//   const [contacts, setContacts] = useState<PointOfContact[]>([]);

//   // ── Property & Loan ────────────────────────────────────────────────────────
//   const [propertyType,       setPropertyType]       = useState('');
//   const [additionalEstimate, setAdditionalEstimate] = useState('');
//   const [loanCategory,       setLoanCategory]       = useState('');
//   const [loanType,           setLoanType]           = useState('');

//   // ── Location ───────────────────────────────────────────────────────────────
//   const [locationData, setLocationData] = useState({
//     state: '', district: '', mandal: '', village: '',
//     colony: '', zipCode: '', landmark: '',
//   });
//   const [pinCoords,   setPinCoords]   = useState<Coord[]>([]);
//   const [avgCoord,    setAvgCoord]    = useState<Coord | null>(null);
//   const [isGeocoding, setIsGeocoding] = useState(false);

//   // ── Bank / Service ─────────────────────────────────────────────────────────
//   const [bankData, setBankData] = useState({
//     bankId: '', branchName: '', branchManager: '', managerPhone: '', branchEmail: '',
//   });
//   const [selectedService, setSelectedService] = useState('');

//   // ── Reverse geocoding ─────────────────────────────────────────────────────
//   const fetchLocationDetails = async (lat: number, lng: number) => {
//     if (!window.google?.maps) return;
//     setIsGeocoding(true);
//     const geocoder = new window.google.maps.Geocoder();
//     try {
//       const res = await geocoder.geocode({ location: { lat, lng } });
//       if (res.results[0]) {
//         const comps = res.results[0].address_components;
//         let state='', district='', mandal='', village='', zipCode='', colony='';
//         comps.forEach(c => {
//           if (c.types.includes('administrative_area_level_1')) state    = c.long_name;
//           if (c.types.includes('administrative_area_level_3')) district = c.long_name;
//           if (c.types.includes('sublocality_level_1'))         mandal   = c.long_name;
//           if (c.types.includes('locality'))                    village  = c.long_name;
//           if (c.types.includes('neighborhood') || c.types.includes('sublocality_level_2')) colony = c.long_name;
//           if (c.types.includes('postal_code'))                 zipCode  = c.long_name;
//         });
//         setLocationData(prev => ({
//           ...prev,
//           state:    state    || prev.state,
//           district: district || prev.district,
//           mandal:   mandal   || prev.mandal,
//           village:  village  || prev.village,
//           colony:   colony   || prev.colony,
//           zipCode:  zipCode  || prev.zipCode,
//         }));
//       }
//     } catch (e) {
//       console.error('Geocoding failed', e);
//     } finally {
//       setIsGeocoding(false);
//     }
//   };

//   // ── Validation helpers ─────────────────────────────────────────────────────
//   const isPhone = (p: string) => /^[6-9]\d{9}$/.test(p);

//   const checkIsFilled = (id: SectionId): boolean => {
//     if (id === 'customer') {
//       const custOk = customers.every(c =>
//         c.name.trim() &&
//         isPhone(c.phone) &&
//         c.relationName.trim()  
//       );
//       const contOk = contacts.every(c =>
//         c.name.trim() && isPhone(c.phone)
//       );
//       return custOk && contOk;
//     }
//     if (id === 'property') {
//       if (!propertyType || !loanCategory || !loanType) return false;
//       if (['Proposed Building', 'Flat'].includes(propertyType)) return !!additionalEstimate;
//       return true;
//     }
//     if (id === 'location') return pinCoords.length > 0 && !!avgCoord;
//     if (id === 'bank') {
//       if (!selectedService) return false;
//       const svc = SERVICES.find(s => s.id === selectedService);
//       if (!svc?.needsBank) return true;
//       return !!(bankData.bankId && bankData.branchName.trim() && bankData.branchManager.trim() && bankData.managerPhone.length >= 10);
//     }
//     return false;
//   };

//   // ── Tab navigation ─────────────────────────────────────────────────────────
//   const goNextSection = () => {
//     const idx = SECTIONS.findIndex(s => s.id === activeSection);
//     if (idx < SECTIONS.length - 1) setActiveSection(SECTIONS[idx + 1].id);
//   };

//   const handleTabOut = (e: React.KeyboardEvent, nextSection: SectionId) => {
//     if (e.key === 'Tab' && !e.shiftKey) {
//       e.preventDefault();
//       setActiveSection(nextSection);
//       setTimeout(() => {
//         const el = document.getElementById(`${nextSection}-section`);
//         if (el) {
//           const first = el.querySelector<HTMLElement>('input, select, textarea');
//           if (first) first.focus();
//         }
//       }, 100);
//     }
//   };

//   // ── Submit ─────────────────────────────────────────────────────────────────
//   const allFilled = SECTIONS.every(s => checkIsFilled(s.id));

//   const handleSubmit = () => {
//     const payload = {
//       customers,
//       contacts,
//       property: { propertyType, additionalEstimate },
//       loan: { loanCategory, loanType },
//       location: { ...locationData, pins: pinCoords, centrePoint: avgCoord },
//       service: { serviceId: selectedService, serviceLabel: SERVICES.find(s => s.id === selectedService)?.label },
//       bank: SERVICES.find(s => s.id === selectedService)?.needsBank ? bankData : null,
//       submittedAt: new Date().toISOString(),
//     };
//     console.log('📋 Form Submission Payload:', JSON.stringify(payload, null, 2));
//     alert('Submitted! See console for payload.');
//   };

//   // ─── RENDER ─────────────────────────────────────────────────────────────────
//   return (
//     <div className="flex flex-col min-h-screen bg-white max-w-md mx-auto border-x border-gray-100">

//       {/* Header */}
//       <div className="p-4 border-b border-gray-200">
//         <h1 className="text-[15px] font-medium text-gray-900">Submit Customer Entry</h1>
//       </div>

//       {/* Accordion */}
//       <div className="flex-1 overflow-y-auto px-4 pb-20">

//         {/* ══ 1. CUSTOMER DETAILS ══════════════════════════════════════════════ */}
//         <SectionHeader id="customer" title="Customer Details"
//           activeSection={activeSection} setActiveSection={setActiveSection}
//           checkIsFilled={checkIsFilled} />

//         {activeSection === 'customer' && (
//           <div id="customer-section" className="pb-6 pt-4 space-y-6 animate-in fade-in duration-300">

//             {/* Add contact button */}
//             {contacts.length < 1 && (
//               <div className="flex justify-end">
//                 <button
//                   onClick={() => setContacts([...contacts, { id: Date.now().toString(), prefix: 'Sri.', name: '', phone: '', phone2: '' }])}
//                   className="text-[#00a0ef] text-[12px] font-semibold"
//                 >
//                   + Add Point of Contact
//                 </button>
//               </div>
//             )}

//             {/* ── Main customers ── */}
//             {customers.map((customer, idx) => (
//               <div key={customer.id} className="space-y-4 pb-6 border-b-2 border-gray-100 last:border-0 last:pb-0">
//                 {/* Customer label */}
//                 {customers.length > 1 && (
//                   <div className="flex items-center justify-between bg-[#f0f9ff] px-3 py-2 rounded-lg">
//                     <span className="text-[#00a0ef] text-[13px] font-semibold">Customer {idx + 1}</span>
//                     {idx > 0 && (
//                       <button onClick={() => setCustomers(customers.filter((_, i) => i !== idx))}
//                         className="text-red-500 text-[12px] font-medium hover:underline">Remove</button>
//                     )}
//                   </div>
//                 )}

//                 {/* Name row: prefix + name */}
//                 <div className="flex gap-2">
//                   <select
//                     className="w-20 px-2 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-[13px] focus:outline-none focus:border-[#00a0ef]"
//                     value={customer.prefix}
//                     onChange={e => {
//                       const p = e.target.value;
//                       const updated = [...customers];
//                       updated[idx] = {
//                         ...customer,
//                         prefix: p,
//                         relationPrefix: DEFAULT_RELATION[p] ?? 'S/o.',
//                       };
//                       setCustomers(updated);
//                     }}
//                   >
//                     <option>Sri.</option>
//                     <option>Smt.</option>
//                     <option>M/s.</option>
//                     <option>Miss.</option>
//                   </select>
//                   <input type="text" placeholder="Enter Customer Name"
//                     value={customer.name}
//                     onChange={e => { const u=[...customers]; u[idx].name=e.target.value; setCustomers(u); }}
//                     className="flex-1 px-3 py-2.5 border border-gray-200 rounded-lg text-[13px] focus:outline-none focus:border-[#00a0ef]"
//                   />
//                 </div>

//                 {/* Phone 1 */}
//                 <div className="flex gap-2">
//                   <div className="w-16 flex items-center justify-center bg-gray-50 border border-gray-200 rounded-lg text-[13px] text-gray-600 shrink-0">+91</div>
//                   <input type="tel" placeholder="Primary Phone No." maxLength={10}
//                     value={customer.phone}
//                     onChange={e => { const v=e.target.value.replace(/\D/g,''); const u=[...customers]; u[idx].phone=v; setCustomers(u); }}
//                     className="flex-1 px-3 py-2.5 border border-gray-200 rounded-lg text-[13px] focus:outline-none focus:border-[#00a0ef]"
//                   />
//                 </div>
//                 {customer.phone.length > 0 && !isPhone(customer.phone) && (
//                   <p className="text-[10px] text-red-500 -mt-3">Enter a valid 10-digit mobile number</p>
//                 )}

//                 {/* Phone 2 */}
//                 <div className="flex gap-2">
//                   <div className="w-16 flex items-center justify-center bg-gray-50 border border-gray-200 rounded-lg text-[13px] text-gray-600 shrink-0">+91</div>
//                   <input type="tel" placeholder="Alternate Phone No. (optional)" maxLength={10}
//                     value={customer.phone2}
//                     onChange={e => { const v=e.target.value.replace(/\D/g,''); const u=[...customers]; u[idx].phone2=v; setCustomers(u); }}
//                     className="flex-1 px-3 py-2.5 border border-gray-200 rounded-lg text-[13px] focus:outline-none focus:border-[#00a0ef]"
//                   />
//                 </div>

//                 {/* Relation row: prefix (selectable) + name */}
//                 <div className="flex gap-2">
//                   <select
//                     className="w-24 px-2 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-[13px] focus:outline-none focus:border-[#00a0ef]"
//                     value={customer.relationPrefix}
//                     onChange={e => { const u=[...customers]; u[idx].relationPrefix=e.target.value; setCustomers(u); }}
//                   >
//                     {(RELATION_PREFIXES[customer.prefix] ?? ['S/o.']).map(rp => (
//                       <option key={rp} value={rp}>{rp}</option>
//                     ))}
//                   </select>
//                   <input type="text" placeholder="Enter Relation Name"
//                     value={customer.relationName}
//                     onChange={e => { const u=[...customers]; u[idx].relationName=e.target.value; setCustomers(u); }}
//                     className="flex-1 px-3 py-2.5 border border-gray-200 rounded-lg text-[13px] focus:outline-none focus:border-[#00a0ef]"
//                   />
//                 </div>
 
//               </div>
//             ))}

//             {/* ── Points of contact (no relation name) ── */}
//             {contacts.map((contact, idx) => (
//               <div key={contact.id} className="space-y-4 pb-6 border-b-2 border-gray-100 last:border-0 last:pb-0">
//                 <div className="flex items-center justify-between bg-[#f0f9ff] px-3 py-2 rounded-lg mb-2">
//                   <span className="text-[#00a0ef] text-[13px] font-semibold">
//                     Point of Contact {idx + 1}
//                   </span>
//                   <button onClick={() => setContacts(contacts.filter((_, i) => i !== idx))}
//                     className="text-red-500 text-[12px] font-medium hover:underline">Remove</button>
//                 </div>

//                 {/* Prefix + Name */}
//                 <div className="flex gap-2">
//                   <select
//                     className="w-20 px-2 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-[13px] focus:outline-none focus:border-[#00a0ef]"
//                     value={contact.prefix}
//                     onChange={e => { const u=[...contacts]; u[idx].prefix=e.target.value; setContacts(u); }}
//                   >
//                     <option>Sri.</option>
//                     <option>Smt.</option>
//                     <option>M/s.</option>
//                     <option>Miss.</option>
//                   </select>
//                   <input type="text" placeholder="Enter Contact Name"
//                     value={contact.name}
//                     onChange={e => { const u=[...contacts]; u[idx].name=e.target.value; setContacts(u); }}
//                     className="flex-1 px-3 py-2.5 border border-gray-200 rounded-lg text-[13px] focus:outline-none focus:border-[#00a0ef]"
//                   />
//                 </div>

//                 {/* Phone 1 */}
//                 <div className="flex gap-2">
//                   <div className="w-16 flex items-center justify-center bg-gray-50 border border-gray-200 rounded-lg text-[13px] text-gray-600 shrink-0">+91</div>
//                   <input type="tel" placeholder="Primary Phone No." maxLength={10}
//                     value={contact.phone}
//                     onChange={e => { const v=e.target.value.replace(/\D/g,''); const u=[...contacts]; u[idx].phone=v; setContacts(u); }}
//                     className="flex-1 px-3 py-2.5 border border-gray-200 rounded-lg text-[13px] focus:outline-none focus:border-[#00a0ef]"
//                   />
//                 </div>
//                 {contact.phone.length > 0 && !isPhone(contact.phone) && (
//                   <p className="text-[10px] text-red-500 -mt-3">Enter a valid 10-digit mobile number</p>
//                 )}

//                 {/* Phone 2 */}
//                 <div className="flex gap-2">
//                   <div className="w-16 flex items-center justify-center bg-gray-50 border border-gray-200 rounded-lg text-[13px] text-gray-600 shrink-0">+91</div>
//                   <input type="tel" placeholder="Alternate Phone No. (optional)" maxLength={10}
//                     value={contact.phone2}
//                     onChange={e => { const v=e.target.value.replace(/\D/g,''); const u=[...contacts]; u[idx].phone2=v; setContacts(u); }}
//                     onKeyDown={e => {
//                       if (idx === contacts.length - 1) handleTabOut(e, 'property');
//                     }}
//                     className="flex-1 px-3 py-2.5 border border-gray-200 rounded-lg text-[13px] focus:outline-none focus:border-[#00a0ef]"
//                   />
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}

//         {/* ══ 2. PROPERTY & LOAN ════════════════════════════════════════════════ */}
//         <SectionHeader id="property" title="Property Details"
//           activeSection={activeSection} setActiveSection={setActiveSection}
//           checkIsFilled={checkIsFilled} />

//         {activeSection === 'property' && (
//           <div id="property-section" className="py-4 space-y-5 animate-in fade-in duration-300">

//             {/* Property Type */}
//             <div>
//               <div className="relative">
//                 <select
//                   className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-[14px] text-gray-700 focus:outline-none focus:border-[#00a0ef] focus:ring-1 focus:ring-[#00a0ef] appearance-none transition-colors"
//                   value={propertyType}
//                   onChange={e => { setPropertyType(e.target.value); setAdditionalEstimate(''); }}
//                 >
//                   <option value="" disabled hidden>Choose Property Type</option>
//                   <option>Open Plot</option>
//                   <option>Existing Building</option>
//                   <option>Proposed Building</option>
//                   <option>Flat</option>
//                   <option>Agri. Land</option>
//                 </select>
//                 <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
//               </div>
//             </div>

//             {/* Additional Estimate (conditional) */}
//             {['Proposed Building', 'Flat'].includes(propertyType) && (
//               <div className="animate-in fade-in slide-in-from-top-2 duration-300">
//                 <label className="block text-[14px] text-gray-900 mb-3">Additional Estimate</label>
//                 <div className="flex gap-3">
//                   {['Yes', 'No'].map(opt => (
//                     <label key={opt}
//                       className={`flex-1 flex items-center justify-between px-4 py-3 border rounded-xl cursor-pointer transition-all ${
//                         additionalEstimate === opt
//                           ? 'border-[#00a0ef] bg-[#f0f9ff]'
//                           : 'border-gray-200 bg-white hover:border-gray-300'
//                       }`}>
//                       <span className={`text-[14px] ${additionalEstimate === opt ? 'text-[#00a0ef] font-medium' : 'text-gray-600'}`}>{opt}</span>
//                       <div className={`w-5 h-5 rounded-full border-[1.5px] flex items-center justify-center transition-colors ${additionalEstimate === opt ? 'border-[#00a0ef]' : 'border-gray-300'}`}>
//                         {additionalEstimate === opt && <div className="w-2.5 h-2.5 bg-[#00a0ef] rounded-full" />}
//                       </div>
//                       <input type="radio" name="additionalEstimate" value={opt} className="hidden"
//                         checked={additionalEstimate === opt}
//                         onChange={() => setAdditionalEstimate(opt)} />
//                     </label>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* Loan Category */}
//             <div>
//               <label className="block text-[14px] text-gray-900 mb-3">Loan Type</label>
//               <div className="relative mb-4">
//                 <select
//                   className={`w-full px-4 py-3 border rounded-xl text-[14px] appearance-none transition-colors focus:outline-none focus:ring-1 focus:ring-[#00a0ef] ${
//                     loanCategory
//                       ? 'bg-[#ebf8ff] border-[#bce4ff] text-[#00a0ef] font-medium'
//                       : 'bg-white border-gray-200 text-gray-700'
//                   }`}
//                   value={loanCategory}
//                   onChange={e => { setLoanCategory(e.target.value); setLoanType(''); }}
//                 >
//                   <option value="" disabled hidden>Choose Loan Category</option>
//                   <option>Own Property</option>
//                   <option>Purchase of Property</option>
//                 </select>
//                 <ChevronDown className={`absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none ${loanCategory ? 'text-[#00a0ef]' : 'text-gray-500'}`} />
//               </div>

//               {/* Loan Type radio */}
//               {loanCategory && (
//                 <div className="flex flex-col gap-2.5 animate-in fade-in slide-in-from-top-2 duration-300">
//                   {(loanCategory === 'Own Property'
//                     ? ['Housing Loan', 'Mortgage Loan', 'Others']
//                     : ['Plot Purchase', 'Plot + Construction Loan', 'Flat Purchase']
//                   ).map(opt => (
//                     <label key={opt}
//                       className={`flex items-center justify-between px-4 py-3 border rounded-xl cursor-pointer transition-all ${
//                         loanType === opt ? 'border-[#00a0ef] bg-[#f0f9ff]' : 'border-gray-200 bg-white hover:border-gray-300'
//                       }`}>
//                       <span className={`text-[14px] ${loanType === opt ? 'text-[#00a0ef] font-medium' : 'text-gray-500'}`}>{opt}</span>
//                       <div className={`w-5 h-5 rounded-full border-[1.5px] flex items-center justify-center transition-colors ${loanType === opt ? 'border-[#00a0ef]' : 'border-gray-300'}`}>
//                         {loanType === opt && <div className="w-2.5 h-2.5 bg-[#00a0ef] rounded-full" />}
//                       </div>
//                       <input type="radio" name="loanType" value={opt} className="hidden"
//                         checked={loanType === opt}
//                         onChange={() => setLoanType(opt)} />
//                     </label>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>
//         )}

//         {/* ══ 3. LOCATION ═══════════════════════════════════════════════════════ */}
//         <SectionHeader id="location" title="Location of Site"
//           activeSection={activeSection} setActiveSection={setActiveSection}
//           checkIsFilled={checkIsFilled} />

//         {activeSection === 'location' && (
//           <div id="location-section" className="py-4 space-y-6 animate-in fade-in duration-300">
//             <div>
//               <label className="block text-[13px] font-medium text-gray-900 mb-2">Select Geo Location</label>
//               <MultiPinLocationPicker
//                 onCoordinatesChange={(coords, avg) => {
//                   setPinCoords(coords);
//                   setAvgCoord(avg);
//                   if (avg) fetchLocationDetails(avg.lat, avg.lng);
//                 }}
//               />
//             </div>

//             {/* Auto-filled location details */}
//             <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
//               <div className="flex items-center justify-between mb-4">
//                 <h4 className="text-[13px] font-semibold text-[#00a0ef]">Location Details</h4>
//                 {isGeocoding && (
//                   <span className="flex items-center text-[11px] text-gray-500 gap-1.5">
//                     <Loader2 className="w-3.5 h-3.5 animate-spin text-[#00a0ef]" />
//                     Auto-filling...
//                   </span>
//                 )}
//               </div>
//               <div className="flex flex-col gap-3">
//                 <input type="text" placeholder="State" value={locationData.state}
//                   onChange={e => setLocationData({ ...locationData, state: e.target.value })}
//                   className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-lg text-[13px] text-gray-700 focus:outline-none focus:border-[#00a0ef]" />
//                 <input type="text" placeholder="District" value={locationData.district}
//                   onChange={e => setLocationData({ ...locationData, district: e.target.value })}
//                   className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-lg text-[13px] text-gray-700 focus:outline-none focus:border-[#00a0ef]" />
//                 <div className="flex gap-3">
//                   <input type="text" placeholder="Mandal" value={locationData.mandal}
//                     onChange={e => setLocationData({ ...locationData, mandal: e.target.value })}
//                     className="flex-1 px-3 py-2.5 bg-white border border-gray-200 rounded-lg text-[13px] text-gray-700 focus:outline-none focus:border-[#00a0ef]" />
//                   <input type="text" placeholder="Village" value={locationData.village}
//                     onChange={e => setLocationData({ ...locationData, village: e.target.value })}
//                     className="flex-1 px-3 py-2.5 bg-white border border-gray-200 rounded-lg text-[13px] text-gray-700 focus:outline-none focus:border-[#00a0ef]" />
//                 </div>
//                 <div className="flex gap-3">
//                   <input type="text" placeholder="Colony / Locality Name" value={locationData.colony}
//                     onChange={e => setLocationData({ ...locationData, colony: e.target.value })}
//                     className="flex-[2] px-3 py-2.5 bg-white border border-gray-200 rounded-lg text-[13px] focus:outline-none focus:border-[#00a0ef]" />
//                   <input type="text" placeholder="Zip Code" maxLength={6} value={locationData.zipCode}
//                     onChange={e => setLocationData({ ...locationData, zipCode: e.target.value.replace(/\D/g,'') })}
//                     className="flex-1 px-3 py-2.5 bg-white border border-gray-200 rounded-lg text-[13px] focus:outline-none focus:border-[#00a0ef]" />
//                 </div>
//                 <input type="text" placeholder="Landmark" value={locationData.landmark}
//                   onChange={e => setLocationData({ ...locationData, landmark: e.target.value })}
//                   onKeyDown={e => handleTabOut(e, 'bank')}
//                   className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-lg text-[13px] focus:outline-none focus:border-[#00a0ef]" />
//               </div>
//             </div>
//           </div>
//         )}

//         {/* ══ 4. SERVICE & BANK ════════════════════════════════════════════════ */}
//         <SectionHeader id="bank" title="Service & Bank"
//           activeSection={activeSection} setActiveSection={setActiveSection}
//           checkIsFilled={checkIsFilled} />

//         {activeSection === 'bank' && (
//           <div id="bank-section" className="py-4 flex flex-col gap-4 animate-in fade-in duration-300">

//             {/* Service type dropdown */}
//             <div>
//               <label className="block text-[12px] text-gray-700 mb-1.5">Choose Service</label>
//               <div className="relative">
//                 <select
//                   className={`w-full px-4 py-3 border rounded-xl text-[14px] appearance-none transition-colors focus:outline-none focus:ring-1 focus:ring-[#00a0ef] ${
//                     selectedService
//                       ? 'bg-[#ebf8ff] border-[#bce4ff] text-[#00a0ef] font-medium'
//                       : 'bg-white border-gray-200 text-gray-700'
//                   }`}
//                   value={selectedService}
//                   onChange={e => { setSelectedService(e.target.value); setBankData(b => ({ ...b, bankId: '' })); }}
//                 >
//                   <option value="" disabled hidden>Choose Service Type</option>
//                   {SERVICES.map(s => (
//                     <option key={s.id} value={s.id}>{s.label}</option>
//                   ))}
//                 </select>
//                 <ChevronDown className={`absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none ${selectedService ? 'text-[#00a0ef]' : 'text-gray-500'}`} />
//               </div>
//             </div>

//             {/* Bank section — only if service needs bank */}
//             {selectedService && SERVICES.find(s => s.id === selectedService)?.needsBank && (
//               <div className="animate-in fade-in slide-in-from-top-2 duration-300 flex flex-col gap-3">

//                 {!bankData.bankId ? (
//                   <>
//                     <label className="block text-[12px] text-gray-700">Choose Bank</label>
//                     {BANKS.map(bank => (
//                       <div key={bank.id}
//                         onClick={() => setBankData(b => ({ ...b, bankId: bank.id }))}
//                         className="flex items-center p-3 rounded-xl border border-gray-200 bg-white hover:border-[#00a0ef] hover:bg-blue-50 cursor-pointer transition-all">
//                         <div className={`w-8 h-8 rounded-lg flex items-center justify-center mr-3 shrink-0 ${bank.bgColor}`}>
//                           <Landmark className={`w-4 h-4 ${bank.iconColor}`} />
//                         </div>
//                         <span className="flex-1 text-[14px] font-semibold text-gray-900">{bank.name}</span>
//                       </div>
//                     ))}
//                   </>
//                 ) : (
//                   <div className="flex flex-col gap-3">
//                     <div className="flex items-center justify-between p-3 rounded-xl border border-[#00a0ef] bg-[#f0f9ff]">
//                       <div className="flex items-center">
//                         <div className="w-8 h-8 rounded-lg flex items-center justify-center mr-3 bg-blue-100">
//                           <Landmark className="w-4 h-4 text-blue-600" />
//                         </div>
//                         <span className="text-[14px] font-semibold text-gray-900">
//                           {BANKS.find(b => b.id === bankData.bankId)?.name}
//                         </span>
//                       </div>
//                       <button onClick={() => setBankData(b => ({ ...b, bankId: '' }))}
//                         className="text-[12px] font-medium text-[#00a0ef] hover:underline">Change</button>
//                     </div>

//                     <div className="flex flex-col gap-3 pt-2 animate-in fade-in duration-300">
//                       <div>
//                         <label className="block text-[12px] text-gray-700 mb-1.5">Branch Name</label>
//                         <input type="text" placeholder="Enter Branch Name"
//                           value={bankData.branchName}
//                           onChange={e => setBankData(b => ({ ...b, branchName: e.target.value }))}
//                           className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-[13px] focus:outline-none focus:border-[#00a0ef]"
//                         />
//                       </div>
//                       <div>
//                         <label className="block text-[12px] text-gray-700 mb-1.5">Branch Manager</label>
//                         <input type="text" placeholder="Branch Manager Name"
//                           value={bankData.branchManager}
//                           onChange={e => setBankData(b => ({ ...b, branchManager: e.target.value }))}
//                           className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-[13px] focus:outline-none focus:border-[#00a0ef]"
//                         />
//                       </div>
//                       <div>
//                         <label className="block text-[12px] text-gray-700 mb-1.5">Manager Phone Number</label>
//                         <input type="tel" placeholder="+91 1234567890" maxLength={10}
//                           value={bankData.managerPhone}
//                           onChange={e => setBankData(b => ({ ...b, managerPhone: e.target.value.replace(/\D/g,'') }))}
//                           className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-[13px] focus:outline-none focus:border-[#00a0ef]"
//                         />
//                       </div>
//                       <div>
//                         <label className="block text-[12px] text-gray-700 mb-1.5">Branch Email</label>
//                         <input type="email" placeholder="branch@email.com"
//                           value={bankData.branchEmail}
//                           onChange={e => setBankData(b => ({ ...b, branchEmail: e.target.value }))}
//                           className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-[13px] focus:outline-none focus:border-[#00a0ef]"
//                         />
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             )}

//             {selectedService && !SERVICES.find(s => s.id === selectedService)?.needsBank && (
//               <div className="flex items-center gap-2 px-4 py-3 bg-amber-50 border border-amber-200 rounded-xl">
//                 <span className="text-sm">ℹ️</span>
//                 <p className="text-[12px] text-amber-700 font-medium">No bank details required for this service.</p>
//               </div>
//             )}
//           </div>
//         )}
//       </div>

//       {/* Fixed bottom action bar */}
//       <div className="p-4 bg-white border-t border-gray-100 flex items-center justify-between mt-auto">
//         <Link href="/s/dashboard"
//           className="px-6 py-2.5 border border-gray-200 rounded-lg text-[14px] font-medium text-gray-700 hover:bg-gray-50 transition-colors">
//           Cancel
//         </Link>

//         {allFilled ? (
//           <button onClick={handleSubmit}
//             className="flex items-center px-6 py-2.5 rounded-lg text-[14px] font-medium text-white bg-emerald-500 hover:bg-emerald-600 transition-colors">
//             <CheckCircle2 className="w-4 h-4 mr-1.5" />
//             Submit Entry
//           </button>
//         ) : (
//           <button
//             onClick={() => {
//               const idx = SECTIONS.findIndex(s => s.id === activeSection);
//               if (idx < SECTIONS.length - 1) setActiveSection(SECTIONS[idx + 1].id);
//             }}
//             disabled={!checkIsFilled(activeSection)}
//             className={`flex items-center px-6 py-2.5 rounded-lg text-[14px] font-medium text-white transition-colors ${
//               checkIsFilled(activeSection)
//                 ? 'bg-[#00a0ef] hover:bg-[#008bd1]'
//                 : 'bg-blue-300 cursor-not-allowed'
//             }`}>
//             Continue
//             <ArrowRight className="w-4 h-4 ml-1.5" />
//           </button>
//         )}
//       </div>
//     </div>
//   );
// }
'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  Loader, ArrowRight, Landmark, CheckCircle2, Edit2,
  RotateCcw, Undo2, MapPin, Loader2,
  ChevronDown, Navigation,
} from 'lucide-react';
import Link from 'next/link';
import { APIProvider, Map, AdvancedMarker, useMap } from '@vis.gl/react-google-maps';

// ─── TYPES ──────────────────────────────────────────────────────────────────
type Coord = { lat: number; lng: number };
type Pin   = { id: number; coord: Coord };
type SectionId = 'customer' | 'property' | 'location' | 'bank';

// Relation prefix options per customer prefix
const RELATION_PREFIXES: Record<string, string[]> = {
  'Sri.':  ['S/o.', 'D/o.', 'W/o.', 'H/o.'],
  'Smt.':  ['W/o.', 'D/o.', 'S/o.'],
  'M/s.':  ['Rep. By', 'S/o.', 'D/o.'],
  'Miss.': ['D/o.', 'S/o.'],
};

const DEFAULT_RELATION: Record<string, string> = {
  'Sri.':  'S/o.',
  'Smt.':  'W/o.',
  'M/s.':  'Rep. By',
  'Miss.': 'D/o.',
};

interface Customer {
  id: string;
  prefix: string;
  name: string;
  phone: string;
  phone2: string;
  relationPrefix: string;
  relationName: string;
}

interface PointOfContact {
  id: string;
  prefix: string;
  name: string;
  phone: string;
  phone2: string;
}

// ─── CONSTANTS ──────────────────────────────────────────────────────────────
const MAX_PINS = 10;
const COLORS   = ['#EF4444','#3B82F6','#10B981','#F59E0B','#8B5CF6','#EC4899','#14B8A6','#F97316','#6366F1','#84CC16'];
const LABELS   = ['A','B','C','D','E','F','G','H','I','J'];

const BANKS = [
  { id: 'sbi',    name: 'State Bank of India',   iconColor: 'text-blue-600',   bgColor: 'bg-blue-100'  },
  { id: 'ubi',    name: 'Union Bank of India',    iconColor: 'text-red-500',    bgColor: 'bg-red-50'    },
  { id: 'canara', name: 'Canara',                 iconColor: 'text-yellow-500', bgColor: 'bg-yellow-50' },
  { id: 'iob',    name: 'Indian Overseas Bank',   iconColor: 'text-blue-400',   bgColor: 'bg-blue-50'   },
  { id: 'pnb',    name: 'Punjab National Bank',   iconColor: 'text-orange-500', bgColor: 'bg-orange-50' },
  { id: 'bob',    name: 'Bank of Baroda',         iconColor: 'text-orange-600', bgColor: 'bg-orange-50' },
];

const SERVICES = [
  { id: 'plot_val',     label: 'Plot Valuation',     needsBank: true  },
  { id: 'building_val', label: 'Building Valuation', needsBank: true  },
  { id: 'legal',        label: 'Legal Report',       needsBank: false },
  { id: 'survey',       label: 'Survey Report',      needsBank: false },
];

const SECTIONS: { id: SectionId; label: string }[] = [
  { id: 'customer', label: 'Customer Details'   },
  { id: 'property', label: 'Property & Loan'    },
  { id: 'location', label: 'Location of Site'   },
  { id: 'bank',     label: 'Service & Bank'     },
];

// ─── MAP CLICK HANDLER ───────────────────────────────────────────────────────
function MapClickHandler({ onClick }: { onClick: (c: Coord) => void }) {
  const map = useMap();
  useEffect(() => {
    if (!map) return;
    const listener = map.addListener('click', (e: google.maps.MapMouseEvent) => {
      if (e.latLng) onClick({ lat: e.latLng.lat(), lng: e.latLng.lng() });
    });
    return () => google.maps.event.removeListener(listener);
  }, [map, onClick]);
  return null;
}

// ─── PIN MARKER ──────────────────────────────────────────────────────────────
function PinMarker({ index, coord, selected, onSelect }: {
  index: number; coord: Coord; selected: boolean; onSelect: () => void;
}) {
  return (
    <AdvancedMarker position={coord} zIndex={selected ? 100 : index}>
      <button
        type="button"
        onClick={e => { e.stopPropagation(); onSelect(); }}
        className={`flex items-center justify-center rounded-full font-bold text-white text-xs shadow-md transition-all ${
          selected ? 'w-10 h-10 ring-4 ring-white scale-110' : 'w-8 h-8 ring-2 ring-white/80'
        }`}
        style={{ backgroundColor: COLORS[index] }}
      >
        {LABELS[index]}
      </button>
    </AdvancedMarker>
  );
}

// ─── MULTI-PIN PICKER ────────────────────────────────────────────────────────
function MultiPinLocationPicker({
  onCoordinatesChange,
}: {
  onCoordinatesChange: (coords: Coord[], avg: Coord | null) => void;
}) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? '';
  const [center,       setCenter]       = useState<Coord>({ lat: 15.8281, lng: 78.0373 });
  const [zoom,         setZoom]         = useState(5);
  const [pins,         setPins]         = useState<Pin[]>([]);
  const [nextId,       setNextId]       = useState(0);
  const [editTarget,   setEditTarget]   = useState<number | null>(null);
  const [userLocation, setUserLocation] = useState<Coord | null>(null);
  const [confirmed,    setConfirmed]    = useState(false);

  const onChangeRef = useRef(onCoordinatesChange);
  useEffect(() => { onChangeRef.current = onCoordinatesChange; }, [onCoordinatesChange]);

  useEffect(() => {
    navigator.geolocation?.getCurrentPosition(
      pos => {
        const loc: Coord = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        setUserLocation(loc);
        setCenter(loc);
        setZoom(17);
      },
      () => {},
      { enableHighAccuracy: true }
    );
  }, []);

  const calcAvg = (ps: Pin[]): Coord | null => {
    if (!ps.length) return null;
    return {
      lat: ps.reduce((s, p) => s + p.coord.lat, 0) / ps.length,
      lng: ps.reduce((s, p) => s + p.coord.lng, 0) / ps.length,
    };
  };

  const handleMapClick = useCallback((coord: Coord) => {
    if (confirmed && editTarget === null) return;

    setPins(prev => {
      let next: Pin[];
      if (editTarget !== null) {
        next = prev.map((p, i) => (i === editTarget ? { ...p, coord } : p));
      } else {
        if (prev.length >= MAX_PINS) return prev;
        next = [...prev, { id: nextId, coord }];
      }
      setTimeout(() => onChangeRef.current(next.map(p => p.coord), calcAvg(next)), 0);
      return next;
    });

    if (editTarget !== null) setEditTarget(null);
    else setNextId(n => n + 1);
  }, [confirmed, editTarget, nextId]);

  const handleUndo = () => {
    setPins(prev => {
      const next = prev.slice(0, -1);
      setTimeout(() => onChangeRef.current(next.map(p => p.coord), calcAvg(next)), 0);
      return next;
    });
  };

  const handleConfirm = () => { setConfirmed(true); setEditTarget(null); };

  const handleReset = () => {
    setConfirmed(false);
    setPins([]);
    setEditTarget(null);
    setNextId(0);
    setTimeout(() => onChangeRef.current([], null), 0);
  };

  const avg = calcAvg(pins);

  return (
    <div className="flex flex-col w-full bg-white border border-gray-300 rounded-xl overflow-hidden shadow-sm">
      <header className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b border-gray-200">
        <div>
          <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#00a0ef]" />
            Location Boundaries
            <span className="text-[11px] font-normal text-gray-400 ml-1">
              {pins.length}/{MAX_PINS} points
            </span>
          </h3>
          <p className="text-xs text-gray-500 mt-0.5">
            {confirmed
              ? editTarget !== null
                ? `Tap map to move point ${LABELS[editTarget]}`
                : 'Confirmed. Tap a point card to reposition it.'
              : editTarget !== null
              ? `Tap map to move ${LABELS[editTarget]}`
              : pins.length >= MAX_PINS
              ? 'Max points reached. Confirm or undo.'
              : 'Tap the map to add boundary points (1–10)'}
          </p>
        </div>
        <div className="flex gap-2">
          {!confirmed && pins.length > 0 && (
            <button type="button" onClick={handleUndo}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-600 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
              <Undo2 className="w-3.5 h-3.5" /> Undo
            </button>
          )}
          {confirmed && (
            <button type="button" onClick={handleReset}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-red-600 bg-red-50 border border-red-200 rounded-md hover:bg-red-100 transition-colors">
              <RotateCcw className="w-3.5 h-3.5" /> Reset
            </button>
          )}
        </div>
      </header>

      <div className="relative w-full h-64 md:h-80 bg-gray-100">
        <APIProvider apiKey={apiKey}>
          <Map
            mapId="geo-picker-form"
            center={center} zoom={zoom}
            mapTypeId="satellite"
            onCameraChanged={ev => { setCenter(ev.detail.center); setZoom(ev.detail.zoom); }}
            gestureHandling="greedy"
            mapTypeControl zoomControl fullscreenControl streetViewControl
            style={{ width: '100%', height: '100%' }}
          >
            {userLocation && (
              <AdvancedMarker position={userLocation}>
                <div className="relative">
                  <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-lg" />
                  <div className="absolute inset-0 w-4 h-4 bg-blue-400 rounded-full animate-ping opacity-40" />
                </div>
              </AdvancedMarker>
            )}

            {avg && confirmed && (
              <AdvancedMarker position={avg} zIndex={200}>
                <div className="flex flex-col items-center -mb-1">
                  <div className="w-9 h-9 rounded-full border-2 border-white shadow-lg flex items-center justify-center bg-[#00a0ef]">
                    <Navigation className="w-4 h-4 text-white fill-white" />
                  </div>
                  <div className="w-0.5 h-3 bg-[#00a0ef]" />
                  <div className="w-2 h-1 bg-[#00a0ef]/40 rounded-full blur-sm" />
                </div>
              </AdvancedMarker>
            )}

            {(!confirmed || editTarget !== null) && (
              <MapClickHandler onClick={handleMapClick} />
            )}

            {pins.map((pin, i) => (
              <PinMarker
                key={pin.id} index={i} coord={pin.coord}
                selected={editTarget === i}
                onSelect={() => {
                  if (confirmed) setEditTarget(editTarget === i ? null : i);
                }}
              />
            ))}
          </Map>
        </APIProvider>

        {avg && !confirmed && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-gray-900/80 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-[11px] font-mono shadow-lg pointer-events-none whitespace-nowrap">
            Avg: {avg.lat.toFixed(5)}, {avg.lng.toFixed(5)}
          </div>
        )}

        {confirmed && editTarget !== null && (
          <div className="absolute top-3 left-1/2 -translate-x-1/2 bg-gray-900/80 backdrop-blur-sm text-white px-4 py-2 rounded-full text-xs font-medium flex items-center gap-2 shadow-lg pointer-events-none">
            Tap anywhere to place
            <span className="px-1.5 py-0.5 rounded text-[10px] font-bold" style={{ backgroundColor: COLORS[editTarget] }}>
              {LABELS[editTarget]}
            </span>
          </div>
        )}
      </div>

      <div className="p-4 bg-gray-50 border-t border-gray-200">
        {!confirmed ? (
          <div className="flex flex-col gap-3">
            <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-[#00a0ef] transition-all duration-300"
                style={{ width: `${(pins.length / MAX_PINS) * 100}%` }} />
            </div>
            <button type="button" onClick={handleConfirm} disabled={pins.length === 0}
              className={`w-full py-2.5 rounded-lg text-sm font-semibold transition-colors flex items-center justify-center gap-2 ${
                pins.length > 0
                  ? 'bg-[#00a0ef] text-white hover:bg-[#008bd1] shadow-sm'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}>
              {pins.length > 0
                ? <><CheckCircle2 className="w-4 h-4" />Confirm {pins.length} Point{pins.length !== 1 ? 's' : ''}</>
                : 'Place at least 1 point'}
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {avg && (
              <div className="flex items-center justify-between px-3 py-2 bg-[#f0f9ff] border border-[#bce4ff] rounded-lg">
                <div className="flex items-center gap-2">
                  <Navigation className="w-3.5 h-3.5 text-[#00a0ef]" />
                  <span className="text-[11px] font-semibold text-[#00a0ef]">Centre avg ({pins.length} pts)</span>
                </div>
                <span className="text-[10px] font-mono text-gray-600">{avg.lat.toFixed(5)}, {avg.lng.toFixed(5)}</span>
              </div>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {pins.map((pin, i) => (
                <button key={pin.id} type="button"
                  onClick={() => setEditTarget(editTarget === i ? null : i)}
                  className={`flex items-center gap-3 p-2.5 rounded-lg border text-left transition-colors focus:outline-none focus:ring-2 focus:ring-[#00a0ef] ${
                    editTarget === i ? 'border-[#00a0ef] bg-blue-50' : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}>
                  <div className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold text-white shrink-0 shadow-sm"
                    style={{ backgroundColor: COLORS[i] }}>
                    {LABELS[i]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] font-medium text-gray-500 uppercase tracking-wider mb-0.5">
                      {editTarget === i ? 'Tap map to move' : `Point ${i + 1}`}
                    </p>
                    <p className="text-xs font-mono text-gray-900 truncate">
                      {pin.coord.lat.toFixed(5)}, {pin.coord.lng.toFixed(5)}
                    </p>
                  </div>
                  <Edit2 className={`w-4 h-4 shrink-0 ${editTarget === i ? 'text-[#00a0ef]' : 'text-gray-400'}`} />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── SECTION HEADER ─────────────────────────────────────────────────────────
function SectionHeader({
  id, title, activeSection, setActiveSection, checkIsFilled,
}: {
  id: SectionId; title: string;
  activeSection: SectionId | null;
  setActiveSection: (s: SectionId | null) => void;
  checkIsFilled: (id: SectionId) => boolean;
}) {
  const isFilled = checkIsFilled(id);
  return (
    <button
      type="button"
      onClick={() => setActiveSection(activeSection === id ? null : id)}
      className="w-full flex items-center justify-between py-4 border-b border-gray-100 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#00a0ef] rounded-md"
    >
      <h3 className="text-[13px] font-medium md:text-lg text-[#00a0ef]">{title}</h3>
      {isFilled ? (
        <CheckCircle2 fill={"#00a0ef"} className="w-5 h-5 md:w-6 md:h-6 text-[#ffffff]" />
      ) : (
        <Loader className={`w-5 h-5 md:w-6 md:h-6 text-[#00a0ef] ${activeSection === id ? '' : 'opacity-70'}`} />
      )}
    </button>
  );
}

// ─── MAIN PAGE ───────────────────────────────────────────────────────────────
export default function NewCustomerPage() {
  const [activeSection, setActiveSection] = useState<SectionId | null>('customer');

  const [customers, setCustomers] = useState<Customer[]>([{
    id: '1',
    prefix: 'Sri.', name: '', phone: '', phone2: '',
    relationPrefix: 'S/o.', relationName: '',   
  }]);
  
  const [contacts, setContacts] = useState<PointOfContact[]>([]);

  const [propertyType,       setPropertyType]       = useState('');
  const [additionalEstimate, setAdditionalEstimate] = useState('');
  const [loanCategory,       setLoanCategory]       = useState('');
  const [loanType,           setLoanType]           = useState('');

  const [locationData, setLocationData] = useState({
    state: '', district: '', mandal: '', village: '',
    colony: '', zipCode: '', landmark: '',
  });
  const [pinCoords,   setPinCoords]   = useState<Coord[]>([]);
  const [avgCoord,    setAvgCoord]    = useState<Coord | null>(null);
  const [isGeocoding, setIsGeocoding] = useState(false);

  const [bankData, setBankData] = useState({
    bankId: '', branchName: '', branchManager: '', managerPhone: '', branchEmail: '',
  });
  const [selectedService, setSelectedService] = useState('');

  const fetchLocationDetails = async (lat: number, lng: number) => {
    if (!window.google?.maps) return;
    setIsGeocoding(true);
    const geocoder = new window.google.maps.Geocoder();
    try {
      const res = await geocoder.geocode({ location: { lat, lng } });
      if (res.results[0]) {
        const comps = res.results[0].address_components;
        let state='', district='', mandal='', village='', zipCode='', colony='';
        comps.forEach(c => {
          if (c.types.includes('administrative_area_level_1')) state    = c.long_name;
          if (c.types.includes('administrative_area_level_3')) district = c.long_name;
          if (c.types.includes('sublocality_level_1'))         mandal   = c.long_name;
          if (c.types.includes('locality'))                    village  = c.long_name;
          if (c.types.includes('neighborhood') || c.types.includes('sublocality_level_2')) colony = c.long_name;
          if (c.types.includes('postal_code'))                 zipCode  = c.long_name;
        });
        setLocationData(prev => ({
          ...prev,
          state:    state    || prev.state,
          district: district || prev.district,
          mandal:   mandal   || prev.mandal,
          village:  village  || prev.village,
          colony:   colony   || prev.colony,
          zipCode:  zipCode  || prev.zipCode,
        }));
      }
    } catch (e) {
      console.error('Geocoding failed', e);
    } finally {
      setIsGeocoding(false);
    }
  };

  const isPhone = (p: string) => /^[6-9]\d{9}$/.test(p);

  const checkIsFilled = (id: SectionId): boolean => {
    if (id === 'customer') {
      const custOk = customers.every(c =>
        c.name.trim() &&
        isPhone(c.phone) &&
        c.relationName.trim()  
      );
      const contOk = contacts.every(c =>
        c.name.trim() && isPhone(c.phone)
      );
      return custOk && contOk;
    }
    if (id === 'property') {
      if (!propertyType || !loanCategory || !loanType) return false;
      if (['Proposed Building', 'Flat'].includes(propertyType)) return !!additionalEstimate;
      return true;
    }
    if (id === 'location') return pinCoords.length > 0 && !!avgCoord;
    if (id === 'bank') {
      if (!selectedService) return false;
      const svc = SERVICES.find(s => s.id === selectedService);
      if (!svc?.needsBank) return true;
      return !!(bankData.bankId && bankData.branchName.trim() && bankData.branchManager.trim() && bankData.managerPhone.length >= 10);
    }
    return false;
  };

  const handleTabOut = (e: React.KeyboardEvent, nextTarget: SectionId | 'submit-btn') => {
    if (e.key === 'Tab' && !e.shiftKey) {
      e.preventDefault();
      
      if (nextTarget === 'submit-btn') {
        const btn = document.getElementById('submit-btn');
        if (btn) btn.focus();
        return;
      }
      
      setActiveSection(nextTarget);
      setTimeout(() => {
        const el = document.getElementById(`${nextTarget}-section`);
        if (el) {
          const first = el.querySelector<HTMLElement>('input, select, textarea, button');
          if (first) first.focus();
        }
      }, 100);
    }
  };

  const allFilled = SECTIONS.every(s => checkIsFilled(s.id));

  const handleSubmit = () => {
    const payload = {
      customers,
      contacts,
      property: { propertyType, additionalEstimate },
      loan: { loanCategory, loanType },
      location: { ...locationData, pins: pinCoords, centrePoint: avgCoord },
      service: { serviceId: selectedService, serviceLabel: SERVICES.find(s => s.id === selectedService)?.label },
      bank: SERVICES.find(s => s.id === selectedService)?.needsBank ? bankData : null,
      submittedAt: new Date().toISOString(),
    };
    console.log('📋 Form Submission Payload:', JSON.stringify(payload, null, 2));
    alert('Submitted! See console for payload.');
  };

  return (
    <div className="flex flex-col min-h-screen bg-white max-w-md mx-auto border-x border-gray-100">

      <div className="p-4 border-b border-gray-200">
        <h1 className="text-[15px] font-medium text-gray-900">Submit Customer Entry</h1>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-20">

        <SectionHeader id="customer" title="Customer Details"
          activeSection={activeSection} setActiveSection={setActiveSection}
          checkIsFilled={checkIsFilled} />

        {activeSection === 'customer' && (
          <div id="customer-section" className="pb-6 pt-4 space-y-6 animate-in fade-in duration-300">

            {contacts.length < 1 && (
              <div className="flex justify-end">
                <button
                  onClick={() => setContacts([...contacts, { id: Date.now().toString(), prefix: 'Sri.', name: '', phone: '', phone2: '' }])}
                  className="text-[#00a0ef] text-[12px] font-semibold focus:outline-none focus:ring-2 focus:ring-[#00a0ef] rounded-md px-1"
                >
                  + Add Point of Contact
                </button>
              </div>
            )}

            {customers.map((customer, idx) => (
              <div key={customer.id} className="space-y-4 pb-6 border-b-2 border-gray-100 last:border-0 last:pb-0">
                {customers.length > 1 && (
                  <div className="flex items-center justify-between bg-[#f0f9ff] px-3 py-2 rounded-lg">
                    <span className="text-[#00a0ef] text-[13px] font-semibold">Customer {idx + 1}</span>
                    {idx > 0 && (
                      <button onClick={() => setCustomers(customers.filter((_, i) => i !== idx))}
                        className="text-red-500 text-[12px] font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-red-500 rounded-md px-1">Remove</button>
                    )}
                  </div>
                )}

                <div className="flex gap-2">
                  <select
                    className="w-20 px-2 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-[#00a0ef] focus:border-transparent"
                    value={customer.prefix}
                    onChange={e => {
                      const p = e.target.value;
                      const updated = [...customers];
                      updated[idx] = {
                        ...customer,
                        prefix: p,
                        relationPrefix: DEFAULT_RELATION[p] ?? 'S/o.',
                      };
                      setCustomers(updated);
                    }}
                  >
                    <option>Sri.</option>
                    <option>Smt.</option>
                    <option>M/s.</option>
                    <option>Miss.</option>
                  </select>
                  <input type="text" placeholder="Enter Customer Name"
                    value={customer.name}
                    onChange={e => { const u=[...customers]; u[idx].name=e.target.value; setCustomers(u); }}
                    className="flex-1 px-3 py-2.5 border border-gray-200 rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-[#00a0ef] focus:border-transparent"
                  />
                </div>

                <div className="flex gap-2">
                  <div className="w-16 flex items-center justify-center bg-gray-50 border border-gray-200 rounded-lg text-[13px] text-gray-600 shrink-0">+91</div>
                  <input type="tel" placeholder="Primary Phone No." maxLength={10}
                    value={customer.phone}
                    onChange={e => { const v=e.target.value.replace(/\D/g,''); const u=[...customers]; u[idx].phone=v; setCustomers(u); }}
                    className="flex-1 px-3 py-2.5 border border-gray-200 rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-[#00a0ef] focus:border-transparent"
                  />
                </div>
                {customer.phone.length > 0 && !isPhone(customer.phone) && (
                  <p className="text-[10px] text-red-500 -mt-3">Enter a valid 10-digit mobile number</p>
                )}

                <div className="flex gap-2">
                  <div className="w-16 flex items-center justify-center bg-gray-50 border border-gray-200 rounded-lg text-[13px] text-gray-600 shrink-0">+91</div>
                  <input type="tel" placeholder="Alternate Phone No. (optional)" maxLength={10}
                    value={customer.phone2}
                    onChange={e => { const v=e.target.value.replace(/\D/g,''); const u=[...customers]; u[idx].phone2=v; setCustomers(u); }}
                    className="flex-1 px-3 py-2.5 border border-gray-200 rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-[#00a0ef] focus:border-transparent"
                  />
                </div>

                <div className="flex gap-2">
                  <select
                    className="w-24 px-2 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-[#00a0ef] focus:border-transparent"
                    value={customer.relationPrefix}
                    onChange={e => { const u=[...customers]; u[idx].relationPrefix=e.target.value; setCustomers(u); }}
                  >
                    {(RELATION_PREFIXES[customer.prefix] ?? ['S/o.']).map(rp => (
                      <option key={rp} value={rp}>{rp}</option>
                    ))}
                  </select>
                  <input type="text" placeholder="Enter Relation Name"
                    value={customer.relationName}
                    onChange={e => { const u=[...customers]; u[idx].relationName=e.target.value; setCustomers(u); }}
                    onKeyDown={e => {
                      if (idx === customers.length - 1 && contacts.length === 0) handleTabOut(e, 'property');
                    }}
                    className="flex-1 px-3 py-2.5 border border-gray-200 rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-[#00a0ef] focus:border-transparent"
                  />
                </div>
              </div>
            ))}

            {contacts.map((contact, idx) => (
              <div key={contact.id} className="space-y-4 pb-6 border-b-2 border-gray-100 last:border-0 last:pb-0">
                <div className="flex items-center justify-between bg-[#f0f9ff] px-3 py-2 rounded-lg mb-2">
                  <span className="text-[#00a0ef] text-[13px] font-semibold">
                    Point of Contact {idx + 1}
                  </span>
                  <button onClick={() => setContacts(contacts.filter((_, i) => i !== idx))}
                    className="text-red-500 text-[12px] font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-red-500 rounded-md px-1">Remove</button>
                </div>

                <div className="flex gap-2">
                  <select
                    className="w-20 px-2 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-[#00a0ef] focus:border-transparent"
                    value={contact.prefix}
                    onChange={e => { const u=[...contacts]; u[idx].prefix=e.target.value; setContacts(u); }}
                  >
                    <option>Sri.</option>
                    <option>Smt.</option>
                    <option>M/s.</option>
                    <option>Miss.</option>
                  </select>
                  <input type="text" placeholder="Enter Contact Name"
                    value={contact.name}
                    onChange={e => { const u=[...contacts]; u[idx].name=e.target.value; setContacts(u); }}
                    className="flex-1 px-3 py-2.5 border border-gray-200 rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-[#00a0ef] focus:border-transparent"
                  />
                </div>

                <div className="flex gap-2">
                  <div className="w-16 flex items-center justify-center bg-gray-50 border border-gray-200 rounded-lg text-[13px] text-gray-600 shrink-0">+91</div>
                  <input type="tel" placeholder="Primary Phone No." maxLength={10}
                    value={contact.phone}
                    onChange={e => { const v=e.target.value.replace(/\D/g,''); const u=[...contacts]; u[idx].phone=v; setContacts(u); }}
                    className="flex-1 px-3 py-2.5 border border-gray-200 rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-[#00a0ef] focus:border-transparent"
                  />
                </div>
                {contact.phone.length > 0 && !isPhone(contact.phone) && (
                  <p className="text-[10px] text-red-500 -mt-3">Enter a valid 10-digit mobile number</p>
                )}

                <div className="flex gap-2">
                  <div className="w-16 flex items-center justify-center bg-gray-50 border border-gray-200 rounded-lg text-[13px] text-gray-600 shrink-0">+91</div>
                  <input type="tel" placeholder="Alternate Phone No. (optional)" maxLength={10}
                    value={contact.phone2}
                    onChange={e => { const v=e.target.value.replace(/\D/g,''); const u=[...contacts]; u[idx].phone2=v; setContacts(u); }}
                    onKeyDown={e => {
                      if (idx === contacts.length - 1) handleTabOut(e, 'property');
                    }}
                    className="flex-1 px-3 py-2.5 border border-gray-200 rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-[#00a0ef] focus:border-transparent"
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        <SectionHeader id="property" title="Property Details"
          activeSection={activeSection} setActiveSection={setActiveSection}
          checkIsFilled={checkIsFilled} />

        {activeSection === 'property' && (
          <div id="property-section" className="py-4 space-y-5 animate-in fade-in duration-300">

            <div>
              <div className="relative">
                <select
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-[14px] text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#00a0ef] focus:border-transparent appearance-none transition-colors"
                  value={propertyType}
                  onChange={e => { setPropertyType(e.target.value); setAdditionalEstimate(''); }}
                >
                  <option value="" disabled hidden>Choose Property Type</option>
                  <option>Open Plot</option>
                  <option>Existing Building</option>
                  <option>Proposed Building</option>
                  <option>Flat</option>
                  <option>Agri. Land</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
              </div>
            </div>

            {['Proposed Building', 'Flat'].includes(propertyType) && (
              <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                <label className="block text-[14px] text-gray-900 mb-3">Additional Estimate</label>
                <div className="flex gap-3">
                  {['Yes', 'No'].map(opt => (
                    <label key={opt}
                      className={`flex-1 flex items-center justify-between px-4 py-3 border rounded-xl cursor-pointer transition-all focus-within:ring-2 focus-within:ring-[#00a0ef] focus-within:border-transparent ${
                        additionalEstimate === opt
                          ? 'border-[#00a0ef] bg-[#f0f9ff]'
                          : 'border-gray-200 bg-white hover:border-gray-300'
                      }`}>
                      <span className={`text-[14px] ${additionalEstimate === opt ? 'text-[#00a0ef] font-medium' : 'text-gray-600'}`}>{opt}</span>
                      <div className={`w-5 h-5 rounded-full border-[1.5px] flex items-center justify-center transition-colors ${additionalEstimate === opt ? 'border-[#00a0ef]' : 'border-gray-300'}`}>
                        {additionalEstimate === opt && <div className="w-2.5 h-2.5 bg-[#00a0ef] rounded-full" />}
                      </div>
                      <input type="radio" name="additionalEstimate" value={opt} className="sr-only"
                        checked={additionalEstimate === opt}
                        onChange={() => setAdditionalEstimate(opt)} />
                    </label>
                  ))}
                </div>
              </div>
            )}

            <div>
              <label className="block text-[14px] text-gray-900 mb-3">Loan Type</label>
              <div className="relative mb-4">
                <select
                  className={`w-full px-4 py-3 border rounded-xl text-[14px] appearance-none transition-colors focus:outline-none focus:ring-2 focus:ring-[#00a0ef] focus:border-transparent ${
                    loanCategory
                      ? 'bg-[#ebf8ff] border-[#bce4ff] text-[#00a0ef] font-medium'
                      : 'bg-white border-gray-200 text-gray-700'
                  }`}
                  value={loanCategory}
                  onChange={e => { setLoanCategory(e.target.value); setLoanType(''); }}
                  onKeyDown={e => {
                    if (!loanCategory) handleTabOut(e, 'location');
                  }}
                >
                  <option value="" disabled hidden>Choose Loan Category</option>
                  <option>Own Property</option>
                  <option>Purchase of Property</option>
                </select>
                <ChevronDown className={`absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none ${loanCategory ? 'text-[#00a0ef]' : 'text-gray-500'}`} />
              </div>

              {loanCategory && (
                <div className="flex flex-col gap-2.5 animate-in fade-in slide-in-from-top-2 duration-300">
                  {(loanCategory === 'Own Property'
                    ? ['Housing Loan', 'Mortgage Loan', 'Others']
                    : ['Plot Purchase', 'Plot + Construction Loan', 'Flat Purchase']
                  ).map(opt => (
                    <label key={opt}
                      className={`flex items-center justify-between px-4 py-3 border rounded-xl cursor-pointer transition-all focus-within:ring-2 focus-within:ring-[#00a0ef] focus-within:border-transparent ${
                        loanType === opt ? 'border-[#00a0ef] bg-[#f0f9ff]' : 'border-gray-200 bg-white hover:border-gray-300'
                      }`}>
                      <span className={`text-[14px] ${loanType === opt ? 'text-[#00a0ef] font-medium' : 'text-gray-500'}`}>{opt}</span>
                      <div className={`w-5 h-5 rounded-full border-[1.5px] flex items-center justify-center transition-colors ${loanType === opt ? 'border-[#00a0ef]' : 'border-gray-300'}`}>
                        {loanType === opt && <div className="w-2.5 h-2.5 bg-[#00a0ef] rounded-full" />}
                      </div>
                      <input type="radio" name="loanType" value={opt} className="sr-only"
                        checked={loanType === opt}
                        onChange={() => setLoanType(opt)} 
                        onKeyDown={e => handleTabOut(e, 'location')}
                      />
                    </label>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        <SectionHeader id="location" title="Location of Site"
          activeSection={activeSection} setActiveSection={setActiveSection}
          checkIsFilled={checkIsFilled} />

        {activeSection === 'location' && (
          <div id="location-section" className="py-4 space-y-6 animate-in fade-in duration-300">
            <div>
              <label className="block text-[13px] font-medium text-gray-900 mb-2">Select Geo Location</label>
              <MultiPinLocationPicker
                onCoordinatesChange={(coords, avg) => {
                  setPinCoords(coords);
                  setAvgCoord(avg);
                  if (avg) fetchLocationDetails(avg.lat, avg.lng);
                }}
              />
            </div>

            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-[13px] font-semibold text-[#00a0ef]">Location Details</h4>
                {isGeocoding && (
                  <span className="flex items-center text-[11px] text-gray-500 gap-1.5">
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-[#00a0ef]" />
                    Auto-filling...
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-3">
                <input type="text" placeholder="State" value={locationData.state}
                  onChange={e => setLocationData({ ...locationData, state: e.target.value })}
                  className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-lg text-[13px] text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#00a0ef] focus:border-transparent" />
                <input type="text" placeholder="District" value={locationData.district}
                  onChange={e => setLocationData({ ...locationData, district: e.target.value })}
                  className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-lg text-[13px] text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#00a0ef] focus:border-transparent" />
                <div className="flex gap-3">
                  <input type="text" placeholder="Mandal" value={locationData.mandal}
                    onChange={e => setLocationData({ ...locationData, mandal: e.target.value })}
                    className="flex-1 px-3 py-2.5 bg-white border border-gray-200 rounded-lg text-[13px] text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#00a0ef] focus:border-transparent" />
                  <input type="text" placeholder="Village" value={locationData.village}
                    onChange={e => setLocationData({ ...locationData, village: e.target.value })}
                    className="flex-1 px-3 py-2.5 bg-white border border-gray-200 rounded-lg text-[13px] text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#00a0ef] focus:border-transparent" />
                </div>
                <div className="flex gap-3">
                  <input type="text" placeholder="Colony / Locality Name" value={locationData.colony}
                    onChange={e => setLocationData({ ...locationData, colony: e.target.value })}
                    className="flex-[2] px-3 py-2.5 bg-white border border-gray-200 rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-[#00a0ef] focus:border-transparent" />
                  <input type="text" placeholder="Zip Code" maxLength={6} value={locationData.zipCode}
                    onChange={e => setLocationData({ ...locationData, zipCode: e.target.value.replace(/\D/g,'') })}
                    className="flex-1 px-3 py-2.5 bg-white border border-gray-200 rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-[#00a0ef] focus:border-transparent" />
                </div>
                <input type="text" placeholder="Landmark" value={locationData.landmark}
                  onChange={e => setLocationData({ ...locationData, landmark: e.target.value })}
                  onKeyDown={e => handleTabOut(e, 'bank')}
                  className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-[#00a0ef] focus:border-transparent" />
              </div>
            </div>
          </div>
        )}

        <SectionHeader id="bank" title="Service & Bank"
          activeSection={activeSection} setActiveSection={setActiveSection}
          checkIsFilled={checkIsFilled} />

        {activeSection === 'bank' && (
          <div id="bank-section" className="py-4 flex flex-col gap-4 animate-in fade-in duration-300">

            <div>
              <label className="block text-[12px] text-gray-700 mb-1.5">Choose Service</label>
              <div className="relative">
                <select
                  className={`w-full px-4 py-3 border rounded-xl text-[14px] appearance-none transition-colors focus:outline-none focus:ring-2 focus:ring-[#00a0ef] focus:border-transparent ${
                    selectedService
                      ? 'bg-[#ebf8ff] border-[#bce4ff] text-[#00a0ef] font-medium'
                      : 'bg-white border-gray-200 text-gray-700'
                  }`}
                  value={selectedService}
                  onChange={e => { setSelectedService(e.target.value); setBankData(b => ({ ...b, bankId: '' })); }}
                  onKeyDown={e => {
                    const svc = SERVICES.find(s => s.id === selectedService);
                    if (!svc || !svc.needsBank) handleTabOut(e, 'submit-btn');
                  }}
                >
                  <option value="" disabled hidden>Choose Service Type</option>
                  {SERVICES.map(s => (
                    <option key={s.id} value={s.id}>{s.label}</option>
                  ))}
                </select>
                <ChevronDown className={`absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none ${selectedService ? 'text-[#00a0ef]' : 'text-gray-500'}`} />
              </div>
            </div>

            {selectedService && SERVICES.find(s => s.id === selectedService)?.needsBank && (
              <div className="animate-in fade-in slide-in-from-top-2 duration-300 flex flex-col gap-3">

                {!bankData.bankId ? (
                  <>
                    <label className="block text-[12px] text-gray-700">Choose Bank</label>
                    {BANKS.map(bank => (
                      <button
                        key={bank.id}
                        type="button"
                        onClick={() => setBankData(b => ({ ...b, bankId: bank.id }))}
                        className="w-full flex items-center p-3 rounded-xl border border-gray-200 bg-white hover:border-[#00a0ef] hover:bg-blue-50 cursor-pointer transition-all focus:outline-none focus:ring-2 focus:ring-[#00a0ef] focus:border-transparent"
                      >
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center mr-3 shrink-0 ${bank.bgColor}`}>
                          <Landmark className={`w-4 h-4 ${bank.iconColor}`} />
                        </div>
                        <span className="flex-1 text-left text-[14px] font-semibold text-gray-900">{bank.name}</span>
                      </button>
                    ))}
                  </>
                ) : (
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between p-3 rounded-xl border border-[#00a0ef] bg-[#f0f9ff]">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center mr-3 bg-blue-100">
                          <Landmark className="w-4 h-4 text-blue-600" />
                        </div>
                        <span className="text-[14px] font-semibold text-gray-900">
                          {BANKS.find(b => b.id === bankData.bankId)?.name}
                        </span>
                      </div>
                      <button onClick={() => setBankData(b => ({ ...b, bankId: '' }))}
                        className="text-[12px] font-medium text-[#00a0ef] hover:underline focus:outline-none focus:ring-2 focus:ring-[#00a0ef] rounded-md px-1">Change</button>
                    </div>

                    <div className="flex flex-col gap-3 pt-2 animate-in fade-in duration-300">
                      <div>
                        <label className="block text-[12px] text-gray-700 mb-1.5">Branch Name</label>
                        <input type="text" placeholder="Enter Branch Name"
                          value={bankData.branchName}
                          onChange={e => setBankData(b => ({ ...b, branchName: e.target.value }))}
                          className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-[#00a0ef] focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-[12px] text-gray-700 mb-1.5">Branch Manager</label>
                        <input type="text" placeholder="Branch Manager Name"
                          value={bankData.branchManager}
                          onChange={e => setBankData(b => ({ ...b, branchManager: e.target.value }))}
                          className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-[#00a0ef] focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-[12px] text-gray-700 mb-1.5">Manager Phone Number</label>
                        <input type="tel" placeholder="+91 1234567890" maxLength={10}
                          value={bankData.managerPhone}
                          onChange={e => setBankData(b => ({ ...b, managerPhone: e.target.value.replace(/\D/g,'') }))}
                          className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-[#00a0ef] focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-[12px] text-gray-700 mb-1.5">Branch Email</label>
                        <input type="email" placeholder="branch@email.com"
                          value={bankData.branchEmail}
                          onChange={e => setBankData(b => ({ ...b, branchEmail: e.target.value }))}
                          onKeyDown={e => handleTabOut(e, 'submit-btn')}
                          className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-[#00a0ef] focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {selectedService && !SERVICES.find(s => s.id === selectedService)?.needsBank && (
              <div className="flex items-center gap-2 px-4 py-3 bg-amber-50 border border-amber-200 rounded-xl">
                <span className="text-sm">ℹ️</span>
                <p className="text-[12px] text-amber-700 font-medium">No bank details required for this service.</p>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="p-4 bg-white border-t border-gray-100 flex items-center justify-between mt-auto">
        <Link href="/s/dashboard"
          className="px-6 py-2.5 border border-gray-200 rounded-lg text-[14px] font-medium text-gray-700 hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300">
          Cancel
        </Link>

        {allFilled ? (
          <button id="submit-btn" onClick={handleSubmit}
            className="flex items-center px-6 py-2.5 rounded-lg text-[14px] font-medium text-white bg-emerald-500 hover:bg-emerald-600 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500">
            <CheckCircle2 className="w-4 h-4 mr-1.5" />
            Submit Entry
          </button>
        ) : (
          <button id="submit-btn"
            onClick={() => {
              if (!activeSection) return;
              const idx = SECTIONS.findIndex(s => s.id === activeSection);
              if (idx < SECTIONS.length - 1) setActiveSection(SECTIONS[idx + 1].id);
            }}
            disabled={!activeSection || !checkIsFilled(activeSection)}
            className={`flex items-center px-6 py-2.5 rounded-lg text-[14px] font-medium text-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00a0ef] ${
              activeSection && checkIsFilled(activeSection)
                ? 'bg-[#00a0ef] hover:bg-[#008bd1]'
                : 'bg-blue-300 cursor-not-allowed'
            }`}>
            Continue
            <ArrowRight className="w-4 h-4 ml-1.5" />
          </button>
        )}
      </div>
    </div>
  );
}