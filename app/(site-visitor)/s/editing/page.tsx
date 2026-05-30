 
//  'use client';

// import React, { useState, useRef } from 'react';
// import {
//   Minus,
//   Plus,
//   Printer,
//   Save,
//   History,
//   FileText,
//   ChevronDown
// } from 'lucide-react';
// import { useReactToPrint } from 'react-to-print';

// const TEMPLATE_OPTIONS = [
//   { value: 'provisional_building', label: 'Provisional Building Permit Order' },
//   { value: 'plot_valuation', label: 'Plot Valuation Report' },
//   { value: 'building_valuation', label: 'Building Valuation Report' },
//   { value: 'rental_report', label: 'Rental Value Report' },
//   { value: 'mortgage_report', label: 'Mortgage Valuation Report' },
//   { value: 'insurance_report', label: 'Insurance Report' },
// ];

// const InputField = ({ label, name, value, onChange }: { label: string, name: string, value: string, onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void }) => (
//   <div className="mb-3">
//     <label className="block text-[10px] font-semibold text-gray-500 uppercase mb-1">{label}</label>
//     <input 
//       type="text" 
//       name={name} 
//       value={value} 
//       onChange={onChange} 
//       className="w-full px-2 py-1.5 border border-gray-300 rounded text-[12px] text-gray-800 focus:outline-none focus:border-[#00a0ef] focus:ring-1 focus:ring-[#00a0ef] bg-white transition-colors" 
//     />
//   </div>
// );

// const DocField = ({ name, value, mode, onChange, inline = false, multiline = false, className = "" }: any) => {
//   if (mode !== 'direct') return <span className={className}>{value || '\u00A0'}</span>;
//   if (multiline) return <textarea name={name} value={value} onChange={onChange} className={`w-full bg-[#f0f8ff] outline-none border border-dashed border-[#00a0ef] p-1 resize-none print:border-none print:bg-transparent ${className}`} rows={2} />;
//   if (inline) return <input type="text" name={name} value={value} onChange={onChange} style={{ width: `${Math.max(value.length, 2)}ch` }} className={`bg-[#f0f8ff] outline-none border border-dashed border-[#00a0ef] px-1 font-inherit text-inherit print:border-none print:bg-transparent ${className}`} />;
//   return <input type="text" name={name} value={value} onChange={onChange} className={`w-full bg-[#f0f8ff] outline-none border border-dashed border-[#00a0ef] px-1 font-inherit text-inherit print:border-none print:bg-transparent ${className}`} />;
// };

// export default function DocumentEditorPage() {
//   const [zoom, setZoom] = useState(100);
//   const [selectedTemplate, setSelectedTemplate] = useState('provisional_building');
//   const [templateDropdownOpen, setTemplateDropdownOpen] = useState(false);
//   const [isExporting, setIsExporting] = useState(false);
//   const [editMode, setEditMode] = useState<'form' | 'direct'>('form'); // <--- Edit mode state
//   const documentRef = useRef<HTMLDivElement>(null);
  
//   const [formData, setFormData] = useState({
//     fileNo: '040815/ARMO/00245/IABP/2026',
//     date: '13/02/2026',
//     applicantName: 'Sri Bhusa Laxmi Narayana',
//     fatherName: 'Bhusa Laxman',
//     address: 'H.No. 1-3-129, Zirayath Nagar, Armoor Proper and Municipality, Dist. Nizamabad. 503224',
//     municipality: 'Armoor Municipality',
//     district: 'Nizamabad District',
//     buildingType: 'Individual Residential Building',
//     floorsDesc: 'Ground Floor + 1 Upper Floor',
//     extent: '199.27',
//     plotNo: 'Layout Plot No. 11 Part, In L.P. No. 9/2005/HRO, C.No. 46/05/HRO/H1,',
//     surveyNo: '218/P, 222/P AND 223/P',
//     village: 'Perkit&Kotarmoor;',
//     mandal: 'Armoor',
//     locality: 'Near To BC Hostel Road',
//     street: 'Near Bharath Chandra High School',
//     roadAffectedArea: '0',
//     netPlotArea: '199.27',
//     rainWaterPits: '3',
//     trees: '5',
//     height: '7.0',
//     dwellingUnits: '2',
//     frontSetback: '1.5',
//     rearSetback: '1.0',
//     side1Setback: '1.0',
//     side2Setback: '1.0',
//     stiltUse: '-', stiltNo: '-', stiltArea: '-',
//     groundUse: 'Residential', groundNo: '1', groundArea: '127.42',
//     upperUse: 'Residential', upperNo: '1', upperArea: 'Total Upper Floor Area: 127.42 Floor 1 Area: 127.42',
//     subDivision: '1993.0',
//     permitFee: '2549.0',
//     devChargesBuilt: '5097.0',
//     devChargesVacant: '503.0',
//     rainWaterDeposit: '1993.0',
//     postage: '200.0',
//     debris: '1000.0',
//     compoundWall: '897.0',
//     vacantLandTax: '811.0',
//     labourCess: '24688.0',
//     userCharges: '1000.0',
//     totalPayment: '40731.0',
//     mortgageDeedNo: '-',
//     mortgageDate: '-',
//     floorsHandedOver: '-',
//     mortgageArea: '-',
//     sro: '-',
//     marketValue: '1700.0',
//     commencedBefore: '12/08/2026',
//     completedBefore: '13/02/2029'
//   });
 
//   const handleExport = useReactToPrint({
//     contentRef: documentRef,
//     documentTitle: `Permit_Order_${formData.fileNo.replace(/[^a-zA-Z0-9]/g, '_')}`,
//   });
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const selectedTemplateLabel = TEMPLATE_OPTIONS.find((t) => t.value === selectedTemplate)?.label ?? 'Select Template';

//   const pageClass = "a4-page w-[794px] h-[1123px] bg-white shadow-[0_10px_30px_rgba(0,0,0,0.15)] relative py-12 px-14 text-[13px] text-gray-900 font-serif leading-snug shrink-0 box-border mx-auto";
//   const tableWrapperClass = "rounded-[6px] border border-slate-400 overflow-hidden mb-6 bg-white";
//   const tableClass = "min-w-full divide-y divide-slate-400 text-[12px]";
//   const trClass = "divide-x divide-slate-400";

//   return (
//     <div className="flex flex-col h-screen bg-gray-50 font-sans overflow-hidden">
      
//       {/* ── Header ── */}
//       <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-gray-200 py-3 bg-white px-4 shrink-0 no-print z-20 shadow-sm relative">
//         <div className="flex flex-col gap-0.5">
//           <div className="flex items-center gap-2">
//             <div className="w-6 h-6 bg-[#00a0ef] rounded flex items-center justify-center">
//               <span className="text-white font-bold text-xs">D</span>
//             </div>
//             <h1 className="text-lg font-semibold text-gray-900">Document Name Goes Here</h1>
//           </div>
//           <p className="text-[12px] text-gray-500 ml-8">
//             Pradhyum Dhondi · {selectedTemplateLabel} · DSK-ARM-283942
//           </p>
//         </div>

//         <div className="flex items-center gap-4">
//           <div className="relative">
//             <button
//               onClick={() => setTemplateDropdownOpen(!templateDropdownOpen)}
//               className="flex items-center justify-between px-3 py-1.5 border border-[#00a0ef] rounded-lg text-[13px] text-[#00a0ef] font-medium bg-white hover:bg-[#f0f8ff] transition-colors min-w-[200px]"
//             >
//               <span className="truncate">{selectedTemplateLabel}</span>
//               <ChevronDown className={`w-4 h-4 shrink-0 transition-transform ${templateDropdownOpen ? 'rotate-180' : ''}`} />
//             </button>
//             {templateDropdownOpen && (
//               <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden">
//                 {TEMPLATE_OPTIONS.map((opt) => (
//                   <button
//                     key={opt.value}
//                     onClick={() => {
//                       setSelectedTemplate(opt.value);
//                       setTemplateDropdownOpen(false);
//                     }}
//                     className={`w-full text-left px-3 py-2 text-[13px] hover:bg-[#f0f8ff] transition-colors ${
//                       selectedTemplate === opt.value ? 'text-[#00a0ef] font-semibold bg-[#f0f8ff]' : 'text-gray-700'
//                     }`}
//                   >
//                     {opt.label}
//                   </button>
//                 ))}
//               </div>
//             )}
//           </div>

//           <span className="px-3 py-1 text-[12px] font-semibold text-[#2563EB] bg-[#C7DFFF] rounded-full">In Progress</span>
// {/* 
//           <button className="flex items-center gap-1.5 text-[13px] font-medium text-[#00a0ef] hover:underline">
//             <History className="w-4 h-4" />
//             Version History
//           </button> */}
//           <div className="hidden md:flex  items-center bg-gray-100 w-[150px] h-[50px]  rounded-md p-0.5 border border-gray-200 mr-2">
//             <button onClick={() => setEditMode('form')} className={`px-4 py-1 text-[12px] font-semibold rounded-sm transition-colors ${editMode === 'form' ? 'bg-white shadow-sm text-[#00a0ef]' : 'text-gray-600 hover:text-gray-900'}`}>Form Edit</button>
//             <button onClick={() => setEditMode('direct')} className={`px-4 py-1 text-[12px] font-semibold rounded-sm transition-colors ${editMode === 'direct' ? 'bg-white shadow-sm text-[#00a0ef]' : 'text-gray-600 hover:text-gray-900'}`}>Direct Edit</button>
//           </div>

//           <div className="flex items-center gap-2">
//             <button className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
//               <Printer className="w-4 h-4 text-gray-600" />
//             </button>
//             <button className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
//               <Save className="w-4 h-4 text-gray-600" />
//             </button>
//             <button 
//               onClick={() => handleExport()} 
//               className="px-5 py-1.5 bg-[#00a0ef] hover:bg-[#008bd1] text-white text-[13px] font-semibold rounded-lg shadow-sm transition-colors flex items-center gap-2"
//             >
//   <Printer className="w-4 h-4" />
//   Download PDF
// </button>
//           </div>
//         </div>
//       </div>

//       {/* ── Main Body ── */}
//       <div className="flex flex-1 overflow-hidden">
        
//         {/* Left Sidebar */}
//         {selectedTemplate === 'provisional_building' && (
//           <div className="w-[320px] shrink-0 hidden md:flex flex-col bg-white border-r border-gray-200 shadow-[2px_0_10px_-5px_rgba(0,0,0,0.05)] z-10 relative">
//             <div className="p-4 border-b border-gray-100 flex items-center justify-between">
//               <span className="text-[13px] font-semibold text-[#00a0ef]">Document Input</span>
//               <Minus className="w-4 h-4 text-[#00a0ef]" />
//             </div>

//             <div className="flex-1 overflow-y-auto p-4 scrollbar-thin">
              
//               <div className="mb-6">
//                 <div className="flex items-center gap-2 mb-3">
//                   <div className="w-3.5 h-3.5 bg-[#00a0ef] rounded-[2px]" />
//                   <h3 className="text-[12px] font-semibold text-gray-800">Basic Details</h3>
//                 </div>
//                 <div className="grid grid-cols-2 gap-2 pl-5">
//                   <InputField label="File No" name="fileNo" value={formData.fileNo} onChange={handleChange} />
//                   <InputField label="Date" name="date" value={formData.date} onChange={handleChange} />
//                   <InputField label="Applicant Name" name="applicantName" value={formData.applicantName} onChange={handleChange} />
//                   <InputField label="Father's Name" name="fatherName" value={formData.fatherName} onChange={handleChange} />
//                 </div>
//                 <div className="pl-5 mt-1">
//                   <label className="block text-[10px] font-semibold text-gray-500 uppercase mb-1">Address</label>
//                   <textarea name="address" value={formData.address} onChange={handleChange} rows={2} className="w-full px-2 py-1.5 border border-gray-300 rounded text-[12px] text-gray-800 focus:outline-none focus:border-[#00a0ef] focus:ring-1 focus:ring-[#00a0ef] resize-none transition-colors"></textarea>
//                 </div>
//               </div>

//               <div className="mb-6">
//                 <div className="flex items-center gap-2 mb-3">
//                   <div className="w-3.5 h-3.5 bg-[#00a0ef] rounded-[2px]" />
//                   <h3 className="text-[12px] font-semibold text-gray-800">Location Details</h3>
//                 </div>
//                 <div className="grid grid-cols-2 gap-2 pl-5">
//                   <InputField label="Municipality" name="municipality" value={formData.municipality} onChange={handleChange} />
//                   <InputField label="District" name="district" value={formData.district} onChange={handleChange} />
//                   <InputField label="Village" name="village" value={formData.village} onChange={handleChange} />
//                   <InputField label="Mandal" name="mandal" value={formData.mandal} onChange={handleChange} />
//                   <InputField label="Locality" name="locality" value={formData.locality} onChange={handleChange} />
//                   <InputField label="Street" name="street" value={formData.street} onChange={handleChange} />
//                 </div>
//               </div>

//               <div className="mb-6">
//                 <div className="flex items-center gap-2 mb-3">
//                   <div className="w-3.5 h-3.5 bg-[#00a0ef] rounded-[2px]" />
//                   <h3 className="text-[12px] font-semibold text-gray-800">Building & Site Info</h3>
//                 </div>
//                 <div className="pl-5">
//                   <InputField label="Building Type" name="buildingType" value={formData.buildingType} onChange={handleChange} />
//                   <InputField label="Floors Desc." name="floorsDesc" value={formData.floorsDesc} onChange={handleChange} />
//                   <InputField label="Plot No" name="plotNo" value={formData.plotNo} onChange={handleChange} />
//                   <InputField label="Survey No" name="surveyNo" value={formData.surveyNo} onChange={handleChange} />
//                   <div className="grid grid-cols-2 gap-2">
//                     <InputField label="Extent (Sq mt)" name="extent" value={formData.extent} onChange={handleChange} />
//                     <InputField label="Road Affected" name="roadAffectedArea" value={formData.roadAffectedArea} onChange={handleChange} />
//                     <InputField label="Net Plot Area" name="netPlotArea" value={formData.netPlotArea} onChange={handleChange} />
//                     <InputField label="Rain Pits" name="rainWaterPits" value={formData.rainWaterPits} onChange={handleChange} />
//                     <InputField label="Trees" name="trees" value={formData.trees} onChange={handleChange} />
//                     <InputField label="Height (m)" name="height" value={formData.height} onChange={handleChange} />
//                     <InputField label="Dwelling Units" name="dwellingUnits" value={formData.dwellingUnits} onChange={handleChange} />
//                   </div>
//                 </div>
//               </div>

//               <div className="mb-6">
//                 <div className="flex items-center gap-2 mb-3">
//                   <div className="w-3.5 h-3.5 bg-[#00a0ef] rounded-[2px]" />
//                   <h3 className="text-[12px] font-semibold text-gray-800">Floors & Areas</h3>
//                 </div>
//                 <div className="pl-5">
//                   <div className="grid grid-cols-2 gap-2 mb-2">
//                     <InputField label="Front Setback" name="frontSetback" value={formData.frontSetback} onChange={handleChange} />
//                     <InputField label="Rear Setback" name="rearSetback" value={formData.rearSetback} onChange={handleChange} />
//                     <InputField label="Side I Setback" name="side1Setback" value={formData.side1Setback} onChange={handleChange} />
//                     <InputField label="Side II Setback" name="side2Setback" value={formData.side2Setback} onChange={handleChange} />
//                   </div>
//                   <div className="border-t border-gray-200 my-3"></div>
//                   <p className="text-[10px] font-bold text-gray-500 mb-2">STILT</p>
//                   <div className="grid grid-cols-3 gap-2">
//                     <InputField label="Use" name="stiltUse" value={formData.stiltUse} onChange={handleChange} />
//                     <InputField label="No." name="stiltNo" value={formData.stiltNo} onChange={handleChange} />
//                     <InputField label="Area" name="stiltArea" value={formData.stiltArea} onChange={handleChange} />
//                   </div>
//                   <p className="text-[10px] font-bold text-gray-500 mb-2">GROUND FLOOR</p>
//                   <div className="grid grid-cols-3 gap-2">
//                     <InputField label="Use" name="groundUse" value={formData.groundUse} onChange={handleChange} />
//                     <InputField label="No." name="groundNo" value={formData.groundNo} onChange={handleChange} />
//                     <InputField label="Area" name="groundArea" value={formData.groundArea} onChange={handleChange} />
//                   </div>
//                   <p className="text-[10px] font-bold text-gray-500 mb-2">UPPER FLOORS</p>
//                   <div className="grid grid-cols-3 gap-2">
//                     <InputField label="Use" name="upperUse" value={formData.upperUse} onChange={handleChange} />
//                     <InputField label="No." name="upperNo" value={formData.upperNo} onChange={handleChange} />
//                     <div className="col-span-3">
//                       <InputField label="Area Description" name="upperArea" value={formData.upperArea} onChange={handleChange} />
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <div className="mb-6">
//                 <div className="flex items-center gap-2 mb-3">
//                   <div className="w-3.5 h-3.5 bg-[#00a0ef] rounded-[2px]" />
//                   <h3 className="text-[12px] font-semibold text-gray-800">Payments</h3>
//                 </div>
//                 <div className="grid grid-cols-2 gap-2 pl-5">
//                   <InputField label="Sub Division" name="subDivision" value={formData.subDivision} onChange={handleChange} />
//                   <InputField label="Building Permit" name="permitFee" value={formData.permitFee} onChange={handleChange} />
//                   <InputField label="Dev Built Up" name="devChargesBuilt" value={formData.devChargesBuilt} onChange={handleChange} />
//                   <InputField label="Dev Vacant" name="devChargesVacant" value={formData.devChargesVacant} onChange={handleChange} />
//                   <InputField label="Rain Water Dep." name="rainWaterDeposit" value={formData.rainWaterDeposit} onChange={handleChange} />
//                   <InputField label="Postage/Adv." name="postage" value={formData.postage} onChange={handleChange} />
//                   <InputField label="Debris" name="debris" value={formData.debris} onChange={handleChange} />
//                   <InputField label="Compound Wall" name="compoundWall" value={formData.compoundWall} onChange={handleChange} />
//                   <InputField label="Vacant Land Tax" name="vacantLandTax" value={formData.vacantLandTax} onChange={handleChange} />
//                   <InputField label="Labour CESS" name="labourCess" value={formData.labourCess} onChange={handleChange} />
//                   <InputField label="TG-bPASS User" name="userCharges" value={formData.userCharges} onChange={handleChange} />
//                   <InputField label="Total Payment" name="totalPayment" value={formData.totalPayment} onChange={handleChange} />
//                 </div>
//               </div>
              
//               <div className="mb-6">
//                 <div className="flex items-center gap-2 mb-3">
//                   <div className="w-3.5 h-3.5 bg-[#00a0ef] rounded-[2px]" />
//                   <h3 className="text-[12px] font-semibold text-gray-800">Mortgage & Conditions</h3>
//                 </div>
//                 <div className="grid grid-cols-2 gap-2 pl-5">
//                   <InputField label="Mortgage Deed" name="mortgageDeedNo" value={formData.mortgageDeedNo} onChange={handleChange} />
//                   <InputField label="Mortgage Date" name="mortgageDate" value={formData.mortgageDate} onChange={handleChange} />
//                   <InputField label="Floors Handed" name="floorsHandedOver" value={formData.floorsHandedOver} onChange={handleChange} />
//                   <InputField label="Mortgage Area" name="mortgageArea" value={formData.mortgageArea} onChange={handleChange} />
//                   <InputField label="SRO" name="sro" value={formData.sro} onChange={handleChange} />
//                   <InputField label="Market Value" name="marketValue" value={formData.marketValue} onChange={handleChange} />
//                   <InputField label="Commence Bfr." name="commencedBefore" value={formData.commencedBefore} onChange={handleChange} />
//                   <InputField label="Complete Bfr." name="completedBefore" value={formData.completedBefore} onChange={handleChange} />
//                 </div>
//               </div>

//             </div>
//           </div>
//         )}

//         {/* Right Preview Area */}
//         <div className="flex-1 bg-[#e4f3fc] overflow-y-auto overflow-x-hidden flex justify-center py-10 relative">
        
//           {selectedTemplate === 'provisional_building' ? (
//             <div className="fixed bottom-8 right-10 bg-black/60 rounded-full px-4 py-2 flex items-center gap-4 z-10 backdrop-blur-md shadow-lg">
//               <button onClick={() => setZoom(z => Math.max(50, z - 10))} className="text-white hover:text-[#00a0ef] transition-colors"><Minus className="w-5 h-5" /></button>
//               <span className="text-white text-sm font-medium w-12 text-center">{zoom}%</span>
//               <button onClick={() => setZoom(z => Math.min(200, z + 10))} className="text-white hover:text-[#00a0ef] transition-colors"><Plus className="w-5 h-5" /></button>
//             </div>
//           ) : null}

// <div ref={documentRef} className="print-safe-area">
//             {selectedTemplate === 'provisional_building' && (
//               <div
//                 className="flex flex-col gap-10 origin-top transform-container"
//                 style={{ transform: `scale(${zoom / 100})`, marginBottom: `${(zoom / 100) * 80}px`, width: '794px' }}
//               >
                
//                 {/* --- PAGE 1 --- */}
//                 <div className={pageClass}>
//                   <div className="text-center mb-6 mt-4">
//                     <h2 className="text-[16px] font-bold uppercase mb-1 tracking-wide">Office of the <DocField inline name="municipality" value={formData.municipality} mode={editMode} onChange={handleChange} /></h2>
//                     <h3 className="text-[14px] font-bold uppercase mb-3"><DocField inline name="district" value={formData.district} mode={editMode} onChange={handleChange} /></h3>
//                     <h1 className="text-[15px] font-bold uppercase underline underline-offset-4">Provisional Building Permit Order</h1>
//                   </div>

//                   <div className={tableWrapperClass}>
//                     <table className={tableClass}>
//                       <tbody className="divide-y divide-slate-400">
//                         <tr className={trClass}>
//                           <td className="p-2 align-top w-1/2">
//                             <span className="block text-[11px]">To,</span>
//                             <span className="text-[12px]"><DocField name="applicantName" value={formData.applicantName} mode={editMode} onChange={handleChange} /></span>
//                           </td>
//                           <td className="p-2 text-gray-600 align-middle w-[15%]">File No:</td>
//                           <td className="p-2 align-middle w-[35%]"><DocField name="fileNo" value={formData.fileNo} mode={editMode} onChange={handleChange} /></td>
//                         </tr>
//                         <tr className={trClass}>
//                           <td className="p-2 align-middle">
//                             <span className="text-[12px]">S/o <DocField inline name="fatherName" value={formData.fatherName} mode={editMode} onChange={handleChange} /></span>
//                           </td>
//                           <td className="p-2 text-gray-600 align-middle">Dated:</td>
//                           <td className="p-2 align-middle"><DocField name="date" value={formData.date} mode={editMode} onChange={handleChange} /></td>
//                         </tr>
//                         <tr>
//                           <td colSpan={3} className="p-2 align-middle">
//                             <DocField multiline name="address" value={formData.address} mode={editMode} onChange={handleChange} />
//                           </td>
//                         </tr>
//                       </tbody>
//                     </table>
//                   </div>

//                   <p className="mb-4">Dear Sir/Madam,</p>

//                   <div className="pl-10 mb-6 relative text-justify">
//                     <span className="absolute left-0 top-0 font-bold">Sub:</span>
//                     <p className="leading-loose">
//                       <strong><DocField inline name="municipality" value={formData.municipality} mode={editMode} onChange={handleChange} /></strong>, <DocField inline name="district" value={formData.district} mode={editMode} onChange={handleChange} /> - Permission for Construction of <strong><DocField inline name="buildingType" value={formData.buildingType} mode={editMode} onChange={handleChange} /></strong> consisting of <strong><DocField inline name="floorsDesc" value={formData.floorsDesc} mode={editMode} onChange={handleChange} /></strong>, to an extent of <strong><DocField inline name="extent" value={formData.extent} mode={editMode} onChange={handleChange} /> Sq mt</strong>, situated at Plot No: <strong><DocField inline name="plotNo" value={formData.plotNo} mode={editMode} onChange={handleChange} /></strong>, locality: <strong><DocField inline name="locality" value={formData.locality} mode={editMode} onChange={handleChange} /></strong>, Survey No: <strong><DocField inline name="surveyNo" value={formData.surveyNo} mode={editMode} onChange={handleChange} /></strong>, Village <strong><DocField inline name="village" value={formData.village} mode={editMode} onChange={handleChange} /></strong>, <DocField inline name="mandal" value={formData.mandal} mode={editMode} onChange={handleChange} /> Mandal, <DocField inline name="district" value={formData.district} mode={editMode} onChange={handleChange} /> - Provisional Building Permission - Issued - Reg.
//                     </p>
//                   </div>

//                   <div className="pl-10 mb-6 relative text-justify">
//                     <span className="absolute left-0 top-0 font-bold">Ref:</span>
//                     <ol className="list-decimal pl-4 space-y-1">
//                       <li>Your Application {formData.fileNo}, dated: {formData.date}</li>
//                       <li>G.O.Ms.No.168, MA&UD;, dt.07-04-2012.</li>
//                       <li>G.O.Ms.No.7, MA&UD;, dt.05-01-2016.</li>
//                       <li>Telangana Municipalities Act 2019 (Act No. 11 of 2019).</li>
//                       <li>G.O.Ms.No. 62 MA&UD;, dt. 21.03.2020.</li>
//                       <li>G.O.Ms.No. 201 MA&UD;, dt 16.11.2020</li>
//                       <li>Memo No. 2461/Plg.III/2021 dt 20.07.2023</li>
//                     </ol>
//                   </div>

//                   <p className="text-justify mb-6">
//                     Your application for <strong><DocField inline name="buildingType" value={formData.buildingType} mode={editMode} onChange={handleChange} /></strong> permission submitted in the reference cited 1st has been provisionally approved based on the self-certification given by you as detailed below and subject to conditions mentioned therein.
//                   </p>

//                   <h4 className="font-bold mb-2 text-[14px]">A. APPLICANT DETAILS</h4>
//                   <div className={tableWrapperClass}>
//                     <table className={tableClass}>
//                       <tbody className="divide-y divide-slate-400">
//                         <tr className={trClass}>
//                           <td className="p-2 w-1/3 font-bold bg-[#f4f7fb]">Name</td>
//                           <td className="p-2"><DocField name="applicantName" value={formData.applicantName} mode={editMode} onChange={handleChange} /></td>
//                         </tr>
//                         <tr className={trClass}>
//                           <td className="p-2 font-bold bg-[#f4f7fb]">S/o</td>
//                           <td className="p-2"><DocField name="fatherName" value={formData.fatherName} mode={editMode} onChange={handleChange} /></td>
//                         </tr>
//                       </tbody>
//                     </table>
//                   </div>

//                   <h4 className="font-bold mb-2 text-[14px]">B. SITE DETAILS</h4>
//                   <div className={tableWrapperClass}>
//                     <table className={tableClass}>
//                       <tbody className="divide-y divide-slate-400">
//                         <tr className={trClass}>
//                           <td className="p-2 w-1/3 font-bold bg-[#f4f7fb]">Plot No</td>
//                           <td className="p-2"><DocField name="plotNo" value={formData.plotNo} mode={editMode} onChange={handleChange} /></td>
//                         </tr>
//                         <tr className={trClass}>
//                           <td className="p-2 font-bold bg-[#f4f7fb]">Survey No</td>
//                           <td className="p-2"><DocField name="surveyNo" value={formData.surveyNo} mode={editMode} onChange={handleChange} /></td>
//                         </tr>
//                       </tbody>
//                     </table>
//                   </div>
//                 </div>

//                 {/* --- PAGE 2 --- */}
//                 <div className={pageClass}>
//                   <div className="pt-4 pb-2">
//                     <div className={tableWrapperClass + " border-t-0 rounded-t-none -mt-14"}>
//                       <table className={tableClass}>
//                         <tbody className="divide-y divide-slate-400">
//                           <tr className={trClass}>
//                             <td className="p-2 w-1/3 font-bold bg-[#f4f7fb]">Locality</td>
//                             <td className="p-2"><DocField name="locality" value={formData.locality} mode={editMode} onChange={handleChange} /></td>
//                           </tr>
//                           <tr className={trClass}>
//                             <td className="p-2 font-bold bg-[#f4f7fb]">Street/Road</td>
//                             <td className="p-2"><DocField name="street" value={formData.street} mode={editMode} onChange={handleChange} /></td>
//                           </tr>
//                           <tr className={trClass}>
//                             <td className="p-2 font-bold bg-[#f4f7fb]">Village Name</td>
//                             <td className="p-2"><DocField name="village" value={formData.village} mode={editMode} onChange={handleChange} /></td>
//                           </tr>
//                           <tr className={trClass}>
//                             <td className="p-2 font-bold bg-[#f4f7fb]">Mandal Name</td>
//                             <td className="p-2"><DocField name="mandal" value={formData.mandal} mode={editMode} onChange={handleChange} /></td>
//                           </tr>
//                           <tr className={trClass}>
//                             <td className="p-2 font-bold bg-[#f4f7fb]">District Name</td>
//                             <td className="p-2"><DocField name="district" value={formData.district} mode={editMode} onChange={handleChange} /></td>
//                           </tr>
//                         </tbody>
//                       </table>
//                     </div>

//                     <h4 className="font-bold mb-2 text-[14px] mt-6">C. DETAILS OF PROVISIONAL PERMISSION SANCTIONED</h4>
//                     <div className={tableWrapperClass + " mb-0 border-b-0 rounded-b-none"}>
//                       <table className={tableClass}>
//                         <tbody className="divide-y divide-slate-400">
//                           <tr className={trClass}><td className="p-2 font-bold bg-[#f4f7fb] w-1/2">Extent of Plot (Sq mt)</td><td colSpan={4} className="p-2"><DocField name="extent" value={formData.extent} mode={editMode} onChange={handleChange} /></td></tr>
//                           <tr className={trClass}><td className="p-2 font-bold bg-[#f4f7fb]">Road Affected Area (Sq mt)</td><td colSpan={4} className="p-2"><DocField name="roadAffectedArea" value={formData.roadAffectedArea} mode={editMode} onChange={handleChange} /></td></tr>
//                           <tr className={trClass}><td className="p-2 font-bold bg-[#f4f7fb]">Net Plot Area (Sq mt)</td><td colSpan={4} className="p-2"><DocField name="netPlotArea" value={formData.netPlotArea} mode={editMode} onChange={handleChange} /></td></tr>
//                           <tr className={trClass}><td className="p-2 font-bold bg-[#f4f7fb]">No. of Rain Water Harvesting Pits</td><td colSpan={4} className="p-2"><DocField name="rainWaterPits" value={formData.rainWaterPits} mode={editMode} onChange={handleChange} /></td></tr>
//                           <tr className={trClass}><td className="p-2 font-bold bg-[#f4f7fb]">No. of Trees</td><td colSpan={4} className="p-2"><DocField name="trees" value={formData.trees} mode={editMode} onChange={handleChange} /></td></tr>
//                           <tr className={trClass}><td className="p-2 font-bold bg-[#f4f7fb]">No. of Floors</td><td colSpan={4} className="p-2"><DocField name="floorsDesc" value={formData.floorsDesc} mode={editMode} onChange={handleChange} /></td></tr>
//                           <tr className={trClass}><td className="p-2 font-bold bg-[#f4f7fb]">Height of the Building (m)</td><td colSpan={4} className="p-2"><DocField name="height" value={formData.height} mode={editMode} onChange={handleChange} /></td></tr>
//                           <tr className={trClass}><td className="p-2 font-bold bg-[#f4f7fb]">Total No. of Dwelling Units</td><td colSpan={4} className="p-2"><DocField name="dwellingUnits" value={formData.dwellingUnits} mode={editMode} onChange={handleChange} /></td></tr>
//                           <tr className={trClass}>
//                             <td className="p-2 font-bold bg-[#f4f7fb]">Set backs (m)</td>
//                             <td className="p-2 font-bold text-center w-[12.5%]">Front</td>
//                             <td className="p-2 font-bold text-center w-[12.5%]">Rear</td>
//                             <td className="p-2 font-bold text-center w-[12.5%]">Side I</td>
//                             <td className="p-2 font-bold text-center w-[12.5%]">Side II</td>
//                           </tr>
//                           <tr className={trClass}>
//                             <td className="p-2 font-bold bg-[#f4f7fb]">Set backs (m)</td>
//                             <td className="p-2 text-center"><DocField name="frontSetback" value={formData.frontSetback} mode={editMode} onChange={handleChange} /></td>
//                             <td className="p-2 text-center"><DocField name="rearSetback" value={formData.rearSetback} mode={editMode} onChange={handleChange} /></td>
//                             <td className="p-2 text-center"><DocField name="side1Setback" value={formData.side1Setback} mode={editMode} onChange={handleChange} /></td>
//                             <td className="p-2 text-center"><DocField name="side2Setback" value={formData.side2Setback} mode={editMode} onChange={handleChange} /></td>
//                           </tr>
//                         </tbody>
//                       </table>
//                     </div>

//                     <div className={tableWrapperClass + " rounded-t-none"}>
//                       <table className={tableClass}>
//                         <thead>
//                           <tr className={"bg-[#f4f7fb] divide-x divide-slate-400 border-b border-slate-400"}>
//                             <th className="p-2 font-bold text-left w-1/4 text-gray-800">Floors</th>
//                             <th className="p-2 font-bold text-left w-1/4 text-gray-800">Proposed Use</th>
//                             <th className="p-2 font-bold text-left w-1/4 text-gray-800">No.</th>
//                             <th className="p-2 font-bold text-left w-1/4 text-gray-800">Area (sq mt)</th>
//                           </tr>
//                         </thead>
//                         <tbody className="divide-y divide-slate-400">
//                           <tr className={trClass}>
//                             <td className="p-2 font-bold bg-white">Stilt</td>
//                             <td className="p-2 bg-white"><DocField name="stiltUse" value={formData.stiltUse} mode={editMode} onChange={handleChange} /></td>
//                             <td className="p-2 bg-white"><DocField name="stiltNo" value={formData.stiltNo} mode={editMode} onChange={handleChange} /></td>
//                             <td className="p-2 bg-white"><DocField name="stiltArea" value={formData.stiltArea} mode={editMode} onChange={handleChange} /></td>
//                           </tr>
//                           <tr className={trClass}>
//                             <td className="p-2 font-bold bg-white">Ground Floor</td>
//                             <td className="p-2 bg-white"><DocField name="groundUse" value={formData.groundUse} mode={editMode} onChange={handleChange} /></td>
//                             <td className="p-2 bg-white"><DocField name="groundNo" value={formData.groundNo} mode={editMode} onChange={handleChange} /></td>
//                             <td className="p-2 bg-white"><DocField name="groundArea" value={formData.groundArea} mode={editMode} onChange={handleChange} /></td>
//                           </tr>
//                           <tr className={trClass}>
//                             <td className="p-2 font-bold bg-white">Upper Floors</td>
//                             <td className="p-2 bg-white"><DocField name="upperUse" value={formData.upperUse} mode={editMode} onChange={handleChange} /></td>
//                             <td className="p-2 bg-white"><DocField name="upperNo" value={formData.upperNo} mode={editMode} onChange={handleChange} /></td>
//                             <td className="p-2 bg-white"><DocField name="upperArea" value={formData.upperArea} mode={editMode} onChange={handleChange} /></td>
//                           </tr>
//                         </tbody>
//                       </table>
//                     </div>
//                   </div>
//                 </div>

//                 {/* --- PAGE 3 --- */}
//                 <div className={pageClass}>
//                   <div className="pt-4">
//                     <h4 className="font-bold mb-2 text-[14px]">D. DETAILS OF PAYMENT</h4>
//                     <div className={tableWrapperClass}>
//                       <table className={tableClass}>
//                         <thead>
//                           <tr className="bg-[#f4f7fb] border-b border-slate-400 divide-x divide-slate-400">
//                             <th className="p-2 text-left w-12 font-bold text-gray-800">S.No</th>
//                             <th className="p-2 text-left font-bold text-gray-800">Category</th>
//                             <th className="p-2 text-left w-32 font-bold text-gray-800">Amount(INR)</th>
//                           </tr>
//                         </thead>
//                         <tbody className="divide-y divide-slate-400">
//                           <tr className={trClass}><td className="p-2">1</td><td className="p-2">Sub Division Of Plot/ Amalgamation Of Plot</td><td className="p-2"><DocField name="subDivision" value={formData.subDivision} mode={editMode} onChange={handleChange} /></td></tr>
//                           <tr className={trClass}><td className="p-2">2</td><td className="p-2">Building Permit Fee</td><td className="p-2"><DocField name="permitFee" value={formData.permitFee} mode={editMode} onChange={handleChange} /></td></tr>
//                           <tr className={trClass}><td className="p-2">3</td><td className="p-2">Development Charges for Built Up Area</td><td className="p-2"><DocField name="devChargesBuilt" value={formData.devChargesBuilt} mode={editMode} onChange={handleChange} /></td></tr>
//                           <tr className={trClass}><td className="p-2">4</td><td className="p-2">Development Charges on Vacant Plot Area</td><td className="p-2"><DocField name="devChargesVacant" value={formData.devChargesVacant} mode={editMode} onChange={handleChange} /></td></tr>
//                           <tr className={trClass}><td className="p-2">5</td><td className="p-2">Rain Water Harvesting Charges (Deposit)</td><td className="p-2"><DocField name="rainWaterDeposit" value={formData.rainWaterDeposit} mode={editMode} onChange={handleChange} /></td></tr>
//                           <tr className={trClass}><td className="p-2">6</td><td className="p-2">Postage/ Advertisement Charges</td><td className="p-2"><DocField name="postage" value={formData.postage} mode={editMode} onChange={handleChange} /></td></tr>
//                           <tr className={trClass}><td className="p-2">7</td><td className="p-2">Debris Charges</td><td className="p-2"><DocField name="debris" value={formData.debris} mode={editMode} onChange={handleChange} /></td></tr>
//                           <tr className={trClass}><td className="p-2">8</td><td className="p-2">Compound Wall</td><td className="p-2"><DocField name="compoundWall" value={formData.compoundWall} mode={editMode} onChange={handleChange} /></td></tr>
//                           <tr className={trClass}><td className="p-2">9</td><td className="p-2">Vacant Land Tax (VLT)</td><td className="p-2"><DocField name="vacantLandTax" value={formData.vacantLandTax} mode={editMode} onChange={handleChange} /></td></tr>
//                           <tr className={trClass}><td className="p-2">10</td><td className="p-2">Labour CESS</td><td className="p-2"><DocField name="labourCess" value={formData.labourCess} mode={editMode} onChange={handleChange} /></td></tr>
//                           <tr className={trClass}><td className="p-2">11</td><td className="p-2">TG-bPASS User Charges</td><td className="p-2"><DocField name="userCharges" value={formData.userCharges} mode={editMode} onChange={handleChange} /></td></tr>
//                           <tr className={trClass + " font-bold bg-[#f4f7fb]"}><td className="p-2"></td><td className="p-2 text-right">Total</td><td className="p-2"><DocField name="totalPayment" value={formData.totalPayment} mode={editMode} onChange={handleChange} /></td></tr>
//                         </tbody>
//                       </table>
//                     </div>

//                     <h4 className="font-bold mb-2 text-[14px]">E. MORTGAGE DETAILS</h4>
//                     <div className={tableWrapperClass}>
//                       <table className={tableClass}>
//                         <tbody className="divide-y divide-slate-400">
//                           <tr className={trClass}>
//                             <td className="p-2 font-bold bg-[#f4f7fb] w-1/4">Mortgage Deed No</td><td className="p-2 w-1/4"><DocField name="mortgageDeedNo" value={formData.mortgageDeedNo} mode={editMode} onChange={handleChange} /></td>
//                             <td className="p-2 font-bold bg-[#f4f7fb] w-1/4">Date</td><td className="p-2 w-1/4"><DocField name="mortgageDate" value={formData.mortgageDate} mode={editMode} onChange={handleChange} /></td>
//                           </tr>
//                           <tr className={trClass}>
//                             <td className="p-2 font-bold bg-[#f4f7fb]">Floors Handed Over</td><td className="p-2"><DocField name="floorsHandedOver" value={formData.floorsHandedOver} mode={editMode} onChange={handleChange} /></td>
//                             <td className="p-2 font-bold bg-[#f4f7fb]">Mortgage Area (Sq mt)</td><td className="p-2"><DocField name="mortgageArea" value={formData.mortgageArea} mode={editMode} onChange={handleChange} /></td>
//                           </tr>
//                           <tr className={trClass}>
//                             <td className="p-2 font-bold bg-[#f4f7fb]">SRO</td><td className="p-2"><DocField name="sro" value={formData.sro} mode={editMode} onChange={handleChange} /></td>
//                             <td className="p-2 font-bold bg-[#f4f7fb]">Market Value</td><td className="p-2"><DocField name="marketValue" value={formData.marketValue} mode={editMode} onChange={handleChange} /></td>
//                           </tr>
//                         </tbody>
//                       </table>
//                     </div>

//                     <h4 className="font-bold mb-2 text-[14px]">F. OTHER DETAILS</h4>
//                     <div className={tableWrapperClass}>
//                       <table className={tableClass}>
//                         <tbody className="divide-y divide-slate-400">
//                           <tr className={trClass}>
//                             <td className="p-2 font-bold bg-[#f4f7fb] w-1/2">Construction to be Commenced Before</td><td className="p-2"><DocField name="commencedBefore" value={formData.commencedBefore} mode={editMode} onChange={handleChange} /></td>
//                           </tr>
//                           <tr className={trClass}>
//                             <td className="p-2 font-bold bg-[#f4f7fb]">Construction to be Completed Before</td><td className="p-2"><DocField name="completedBefore" value={formData.completedBefore} mode={editMode} onChange={handleChange} /></td>
//                           </tr>
//                         </tbody>
//                       </table>
//                     </div>

//                     <p className="font-bold mb-4">The Provisional Building permission is sanctioned subject to following conditions.</p>
                    
//                     <ol className="list-decimal pl-5 space-y-3 text-justify text-[12.5px] leading-relaxed">
//                       <li>The provisional building permit order issued does not confer upon any ownership rights over the property. At a later stage, if it is found that the documents are false and fabricated or any misrepresentation of the facts or false statements or against the building rules, regulations and Master Plan land use provisions, the permission will be rejected U/s 176 (9) of Telangana Municipalities Act 2019.</li>
//                       <li>The permission accorded does not bar the application or provisions of Urban Land Ceiling & Regulations Act 1976.</li>
//                       <li>Building Rules & Regulations shall be followed strictly while making the construction.</li>
//                       <li>Building Permission copy shall be displayed at the construction site for public view.</li>
//                     </ol>
//                   </div>
//                 </div>

//                 {/* --- PAGE 4 --- */}
//                 <div className={pageClass}>
//                   <div className="pt-4">
//                     <ol start={5} className="list-decimal pl-5 space-y-3 text-justify text-[12.5px] leading-relaxed mb-6">
//                       <li>The construction shall be commenced within 06 months and shall be completed within 03 years. Shall also upload the pictures of commencement of construction within 6 months online as per section 174(13) of Telangana Municipalities Act 2019.</li>
//                       <li>A safe distance of minimum 3.0M vertical and Horizontal Distance between the Building & High-Tension Electrical Lines and 1.5M for Low Tension electrical line shall be maintained.</li>
//                       <li>Prior Approval should be obtained separately for any modification in the construction.</li>
//                       <li>Rain Water Harvesting Structure (percolation pit) shall be constructed as per provisions made under WALTA Act 2002 & G.O.M.s No. 350 MA&UD; dt. 09.06.2000.</li>
//                       <li>Stocking of Building Materials on footpath and road margin causing obstruction to free movement of public & vehicles shall not be done, failing which permission is liable to be suspended.</li>
//                       <li>This provisional sanction is accorded based on the Self Certification by the Applicant, Accordingly, it is deemed that the applicant has handed over the Road Affected Portion to The Commissioner at free of cost without claiming any Compensation through a registered gift deed at any time as per the Self Certification.</li>
//                       <li>The Registration Authority shall undertake registrations only after issuance of building permit order and work commencement letter by the competent authority and only for the permitted built up area as per building permission.</li>
//                       <li>The Financial Agencies and Institutions shall extend loan facilities only to the permitted built up area and only after work commencement letter is issued by the competent Authority.</li>
//                       <li>The owner/builder shall cover the building material, stock at site. Every builder or owner shall put Tarpaulin on scaffolding around the area of construction and the building.</li>
//                       <li>All the construction material and debris shall be carried in the trucks or other vehicles which are fully covered and protected, so as to ensure that the construction debris or the construction material does not get dispersed into the air or atmosphere or air in any form whatsoever.</li>
//                       <li>The dust emissions from the construction site should be completely controlled and all precautions shall be taken on that behalf.</li>
//                       <li>The vehicles carrying construction material and debris of any kind shall be cleaned before it is permitted to ply on the road after unloading such material.</li>
//                       <li>Every worker on the construction site and involved in loading, unloading and carriage of construction material and construction debris should be provided with mask helmets, shoes to prevent inhalation of dust particles and safety.</li>
//                       <li>Owner and builder shall be under obligation to provide all medical help, investigation and treatment to the workers involved in the construction and carry of construction material and debris relatable to dust emission.</li>
//                       <li>Owner/builder shall maintain Muster Roll of all the employees/workers and make necessary insurance till the work is completed failing which the sanction accorded will be cancelled without further notice.</li>
//                       <li>Owner/builder shall transport the construction material and debris waste to the construction site, dumping site or any other place in accordance with rules and in terms of this order.</li>
//                       <li>Owner/builder shall mandatorily use a welt jet in grinding and stone cutting, wind breaking walls around the construction site.</li>
//                     </ol>
//                   </div>
//                 </div>

//                 {/* --- PAGE 5 --- */}
//                 <div className={pageClass}>
//                   <div className="pt-4 flex flex-col h-full">
//                     <ol start={22} className="list-decimal pl-5 space-y-4 text-justify text-[12.5px] leading-relaxed mb-6">
//                       <li>Tree plantation shall be done along the periphery and also in front of the premises as per T.S. Water Land and Trees Rules 2002. and G.O.Ms No 168 MA&UD;, dt. 7.4.2012.</li>
//                       <li>If greenery is not maintained 10% additional property tax shall be imposed as penalty every year till the condition is fulfilled.</li>
//                       <li>The Owner/Developers shall ensure the safety of construction workers.</li>
//                       <li>The Owner/Developers shall ensure a comprehensive risk insurance policy of construction workers for the duration of construction (if applicable)</li>
//                       <li>If there are any Court cases pending, the proposal is subject to outcome of Court Order.</li>
//                       <li>No external roof, verandah, wall of a building shall be constructed or reconstructed of grass, leaves, mats or other inflammable materials, except with the permission of the Commissioner.</li>
//                       <li>The building should have on site treatment system (Septic tank with soakaway/twin bleach pit/decentralized treatment system/fecal sludge and septage) or connected to sewerage system, waste water treatment recycling system.</li>
//                     </ol>

//                     <h4 className="font-bold text-[14px] mb-4 mt-6">Additional Conditions</h4>

//                     <ol className="list-decimal pl-5 space-y-4 text-justify text-[12.5px] leading-relaxed mb-16">
//                       <li>Post verification will be carried out as per Rules framed under Telangana Municipalities Act 2019 and action will be initiated under section 178 & 180 if any violation or misrepresentation of the facts is found.</li>
//                       <li>In case of false declaration, the applicant is personally held responsible as per section 174(3) of Telangana Municipalities Act 2019.</li>
//                       <li>The applicant or owner is personally held responsible and accountable in case of false or incorrect Self-Declaration if any found and shall be liable for punishment as per the provisions under section 177 & 180 of Telangana Municipalities Act 2019.</li>
//                       <li>If the plot under reference is falling in any prohibited lands/Govt. lands/Municipal lands/layout open space, earmarked parks and playground as per Master plan/Water bodies/FTL/Buffer zone, the Provisional Building Permit Order will be rejected and structure there upon will be demolished by following the due procedure of law.</li>
//                       <li>Provisional Permission granted shall stand lapsed if the construction is not completed within stipulated period and a fresh application shall have to be submitted as per section 174(14) of Telangana Municipalities Act 2019.</li>
//                       <li>The applicant shall not proceed with the construction till the post verification is done and a work commencement letter is issued. Post verification will be done by the department and will be informed to the applicant.</li>
//                     </ol>

//                     <div className="flex justify-between items-end mb-16 px-4">
//                       <div className="w-32 h-32 border border-gray-300 bg-gray-100 flex items-center justify-center relative">
//                         <span className="text-gray-400 text-xs text-center px-2">QR Code Placeholder</span>
//                       </div>
//                       <div className="text-left w-64">
//                         <p className="mb-6">Yours Faithfully</p>
//                         <div className="w-10 h-10 mb-2 border-b-4 border-l-4 border-green-500 transform -rotate-45 ml-2"></div>
//                         <p>Commissioner</p>
//                         <p><DocField inline name="municipality" value={formData.municipality} mode={editMode} onChange={handleChange} /></p>
//                         <p className="text-gray-500 text-xs mt-1"><DocField inline name="date" value={formData.date} mode={editMode} onChange={handleChange} /> 13:25:43</p>
//                       </div>
//                     </div>

//                     <div className="text-center mt-auto pb-4">
//                       <p className="text-[12px] text-gray-500">NOTE: This is computer generated letter, doesn't require any manual signatures</p>
//                     </div>
//                   </div>
//                 </div>

//               </div>
//             )}
//           </div> 
//         </div>
//       </div>
      
//       <style dangerouslySetInnerHTML={{__html: `
//         @media print {
//           @page { margin: 0; size: A4 portrait; }
          
//           body { 
//             -webkit-print-color-adjust: exact; 
//             print-color-adjust: exact; 
//             background: white !important; 
//           }
          
//           .transform-container {
//              transform: none !important;
//              width: 100% !important;
//              margin: 0 !important;
//              gap: 0 !important;
//           }

//           .a4-page {
//             width: 210mm !important;
//             height: 297mm !important;
//             margin: 0 !important;
//             padding: 15mm 20mm !important;
//             box-shadow: none !important;
//             page-break-after: always !important;
//             break-after: page !important;
//           }
//         }
//       `}} />
//     </div>
//   );
// } 
'use client';

import React, { useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import { Minus, Plus, Printer, Save, History, ChevronDown, FileText } from 'lucide-react';
import { useDocumentEditor } from '@/app/lib/useDocumentEditor';
import BuildingCommencementSidebar from '@/app/(Drafter)/components/sidebar/BuildingCommencementSidebar';
import BuildingCommencementDoc from '@/app/(Drafter)/components/document/BuildingCommencementDoc';
import BuildingPermitSidebar from '@/app/(Drafter)/components/sidebar/BuildingPermitSidebar';
import BuildingPermitDoc from '@/app/(Drafter)/components/document/BuildingPermitDoc';
import BuildingValuationDoc from '@/app/(Drafter)/components/document/BuildingValuationDoc';
import BuildingValuationSidebar from '@/app/(Drafter)/components/sidebar/BuildingValuationSidebar';
const TEMPLATE_OPTIONS = [
  { value: 'provisional_building', label: 'Provisional Building Permit Order' },
  { value: 'building_valuation', label: 'Building Valuation Report' },
  { value: 'plot_valuation', label: 'Plot Valuation Report' },
  { value: 'rental_report', label: 'Rental Value Report' },
  { value: 'mortgage_report', label: 'Mortgage Valuation Report' },
  { value: 'insurance_report', label: 'Insurance Report' },
];

export default function DocumentEditorPage() {
  const [templateDropdownOpen, setTemplateDropdownOpen] = useState(false);
  
  const { 
    zoom, setZoom, 
    selectedTemplate, setSelectedTemplate, 
    editMode, setEditMode, 
    documentRef, 
    formData, handleChange,
    handleSubmitToBackend 
  } = useDocumentEditor();

  const handleExport = useReactToPrint({
    contentRef: documentRef,
    documentTitle: `${selectedTemplate}_${formData.fileNo}`,
  });

  const selectedTemplateLabel = TEMPLATE_OPTIONS.find((t) => t.value === selectedTemplate)?.label;

  const renderSidebar = () => {
    switch (selectedTemplate) {
      case 'provisional_building': return <BuildingPermitSidebar formData={formData} handleChange={handleChange} />;
      case 'building_valuation': return <BuildingValuationSidebar formData={formData} handleChange={handleChange} />;
      default: return <div className="p-10 text-center text-sm font-medium text-gray-400">Template input coming soon</div>;
    }
  };

  const renderDocument = () => {
    switch (selectedTemplate) {
      case 'provisional_building': return <BuildingPermitDoc formData={formData} handleChange={handleChange} editMode={editMode} />;
      case 'building_valuation': return <BuildingValuationDoc formData={formData} handleChange={handleChange} editMode={editMode}/>;

      default: return (
        <div className="flex items-center justify-center h-[800px] w-full bg-white shadow-sm border border-dashed border-gray-300">
          <div className="text-center">
            <FileText className="w-16 h-16 mx-auto mb-4 text-[#00a0ef] opacity-50" />
            <h2 className="text-xl font-semibold tracking-wide text-gray-500">Document template coming soon</h2>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 font-sans overflow-hidden">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-gray-200 py-3 bg-white px-4 shrink-0 no-print z-20 shadow-sm relative">
        <div className="flex items-center gap-4">
          <div className="relative">
            <button 
              onClick={() => setTemplateDropdownOpen(!templateDropdownOpen)} 
              className="flex items-center justify-between px-3 py-1.5 border border-[#00a0ef] rounded-lg text-[13px] text-[#00a0ef] font-medium bg-white min-w-[250px]"
            >
              <span className="truncate">{selectedTemplateLabel}</span>
              <ChevronDown className={`w-4 h-4 shrink-0 transition-transform ${templateDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {templateDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden">
                {TEMPLATE_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => {
                      setSelectedTemplate(opt.value);
                      setTemplateDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-[13px] hover:bg-[#f0f8ff] transition-colors ${
                      selectedTemplate === opt.value ? 'text-[#00a0ef] font-semibold bg-[#f0f8ff]' : 'text-gray-700'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}
          </div>
          
          <div className="hidden md:flex items-center bg-gray-100 rounded-md p-0.5 border border-gray-200">
            <button onClick={() => setEditMode('form')} className={`px-4 py-1 text-[13px] font-semibold rounded-sm transition-colors ${editMode === 'form' ? 'bg-white shadow-sm text-[#00a0ef]' : 'text-gray-600'}`}>Form Edit</button>
            <button onClick={() => setEditMode('direct')} className={`px-4 py-1 text-[13px] font-semibold rounded-sm transition-colors ${editMode === 'direct' ? 'bg-white shadow-sm text-[#00a0ef]' : 'text-gray-600'}`}>Direct Edit</button>
          </div>
          <button onClick={() => handleSubmitToBackend()} className="px-5 py-1.5 bg-[#00a0ef] text-white text-[13px] font-semibold rounded-lg flex items-center gap-2">
            <Save className="w-4 h-4"/>  Save
          </button>
          <button onClick={() => handleExport()} className="px-5 py-1.5 bg-[#00a0ef] text-white text-[13px] font-semibold rounded-lg flex items-center gap-2">
            <Printer className="w-4 h-4" /> Download PDF
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        
        {/* Left Sidebar */}
        <div className="hidden md:flex w-[320px] shrink-0 flex-col bg-white border-r border-gray-200 shadow z-10 relative">
          <div className="p-4 border-b border-gray-100"><span className="text-[13px] font-semibold text-[#00a0ef]">Document Input</span></div>
          {renderSidebar()}
        </div>

        {/* Right Preview */}
        <div className="flex-1 bg-[#e4f3fc] overflow-y-auto overflow-x-hidden flex justify-center py-10 relative">
          
          {/* Zoom controls */}
          <div className="fixed bottom-8 right-10 bg-black/60 rounded-full px-4 py-2 flex items-center gap-4 z-10">
            <button onClick={() => setZoom(z => Math.max(50, z - 10))} className="text-white"><Minus className="w-5 h-5" /></button>
            <span className="text-white text-sm w-12 text-center">{zoom}%</span>
            <button onClick={() => setZoom(z => Math.min(200, z + 10))} className="text-white"><Plus className="w-5 h-5" /></button>
          </div>

          {/* Document Wrapper */}
          <div ref={documentRef} className="print-safe-area">
            <div className="flex flex-col gap-10 origin-top transform-container" style={{ transform: `scale(${zoom / 100})`, width: '794px' }}>
              {renderDocument()}
            </div>
          </div>

        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @media print {
          @page { margin: 0; size: A4 portrait; }
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; background: white !important; }
          .transform-container { transform: none !important; width: 100% !important; margin: 0 !important; gap: 0 !important; }
          .a4-page { width: 210mm !important; height: 297mm !important; margin: 0 !important; padding: 15mm 20mm !important; box-shadow: none !important; page-break-after: always !important; }
          .no-print { display: none !important; }
        }
      `}} />
    </div>
  );
}