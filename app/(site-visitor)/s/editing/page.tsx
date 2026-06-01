 
// // 'use client';

// // import React, { useState } from 'react';
// // import { useReactToPrint } from 'react-to-print';
// // import { Minus, Plus, Printer, Save, History, ChevronDown, FileText } from 'lucide-react';
// // import { useDocumentEditor } from '@/app/lib/useDocumentEditor';
// // import BuildingCommencementSidebar from '@/app/(Drafter)/components/sidebar/BuildingCommencementSidebar';
// // import BuildingCommencementDoc from '@/app/(Drafter)/components/document/BuildingCommencementDoc';
// // import BuildingPermitSidebar from '@/app/(Drafter)/components/sidebar/BuildingPermitSidebar';
// // import BuildingPermitDoc from '@/app/(Drafter)/components/document/BuildingPermitDoc';
// // import BuildingValuationDoc from '@/app/(Drafter)/components/document/BuildingValuationDoc';
// // import BuildingValuationSidebar from '@/app/(Drafter)/components/sidebar/BuildingValuationSidebar';
// // const TEMPLATE_OPTIONS = [
// //   { value: 'provisional_building', label: 'Provisional Building Permit Order' },
// //   { value: 'building_valuation', label: 'Building Valuation Report' },
// //   { value: 'plot_valuation', label: 'Plot Valuation Report' },
// //   { value: 'rental_report', label: 'Rental Value Report' },
// //   { value: 'mortgage_report', label: 'Mortgage Valuation Report' },
// //   { value: 'insurance_report', label: 'Insurance Report' },
// // ];

// // export default function DocumentEditorPage() {
// //   const [templateDropdownOpen, setTemplateDropdownOpen] = useState(false);
// //   const [loadingAction, setLoadingAction] = useState<string | null>(null);

// // const handleAction = async (
// //   actionName: string,
// //   actionFn: () => Promise<void>
// // ) => {
// //   try {
// //     setLoadingAction(actionName);

// //     await actionFn();
// //   } catch (error) {
// //     console.error(error);
// //   } finally {
// //     setLoadingAction(null);
// //   }
// // };
// //   const { 
// //     zoom, setZoom, 
// //     selectedTemplate, setSelectedTemplate, 
// //     editMode, setEditMode, 
// //     documentRef, 
// //     formData, handleChange,
// //     handleSubmitToBackend 
// //   } = useDocumentEditor();

// //   const handleExport = useReactToPrint({
// //     contentRef: documentRef,
// //     documentTitle: `${selectedTemplate}_${formData.fileNo}`,
// //   });

// //   const selectedTemplateLabel = TEMPLATE_OPTIONS.find((t) => t.value === selectedTemplate)?.label;

// //   const renderSidebar = () => {
// //     switch (selectedTemplate) {
// //       case 'provisional_building': return <BuildingPermitSidebar formData={formData} handleChange={handleChange} />;
// //       case 'building_valuation': return <BuildingValuationSidebar formData={formData} handleChange={handleChange} />;
// //       default: return <div className="p-10 text-center text-sm font-medium text-gray-400">Template input coming soon</div>;
// //     }
// //   };

// //   const renderDocument = () => {
// //     switch (selectedTemplate) {
// //       case 'provisional_building': return <BuildingPermitDoc formData={formData} handleChange={handleChange} editMode={editMode} />;
// //       case 'building_valuation': return <BuildingValuationDoc formData={formData} handleChange={handleChange} editMode={editMode}/>;

// //       default: return (
// //         <div className="flex items-center justify-center h-[800px] w-full bg-white shadow-sm border border-dashed border-gray-300">
// //           <div className="text-center">
// //             <FileText className="w-16 h-16 mx-auto mb-4 text-[#00a0ef] opacity-50" />
// //             <h2 className="text-xl font-semibold tracking-wide text-gray-500">Document template coming soon</h2>
// //           </div>
// //         </div>
// //       );
// //     }
// //   };

// //   return (
// //     <div className="flex flex-col h-screen bg-gray-50 font-sans overflow-hidden">
      
// //       {/* Header */}
// //       <div className="flex flex-col md:flex-row md:items-center  justify-between gap-3 border-b border-gray-200 py-3 bg-white px-4 shrink-0 no-print z-20 shadow-sm relative">
// //         <div className="flex items-center gap-4">
// //           <div className="relative">
// //             <button 
// //               onClick={() => setTemplateDropdownOpen(!templateDropdownOpen)} 
// //               className="flex items-center justify-between px-3 py-1.5 border border-[#00a0ef] rounded-lg text-[13px] text-[#00a0ef] font-medium bg-white min-w-[250px]"
// //             >
// //               <span className="truncate">{selectedTemplateLabel}</span>
// //               <ChevronDown className={`w-4 h-4 shrink-0 transition-transform ${templateDropdownOpen ? 'rotate-180' : ''}`} />
// //             </button>
            
// //             {templateDropdownOpen && (
// //               <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden">
// //                 {TEMPLATE_OPTIONS.map((opt) => (
// //                   <button
// //                     key={opt.value}
// //                     onClick={() => {
// //                       setSelectedTemplate(opt.value);
// //                       setTemplateDropdownOpen(false);
// //                     }}
// //                     className={`w-full text-left px-3 py-2 text-[13px] hover:bg-[#f0f8ff] transition-colors ${
// //                       selectedTemplate === opt.value ? 'text-[#00a0ef] font-semibold bg-[#f0f8ff]' : 'text-gray-700'
// //                     }`}
// //                   >
// //                     {opt.label}
// //                   </button>
// //                 ))}
// //               </div>
// //             )}
// //           </div>
          
// //           <div className="hidden  md:flex items-center bg-gray-100 rounded-md p-0.5 border border-gray-200">
// //             <button onClick={() => setEditMode('form')} className={`px-4 py-1 cursor-pointer text-[13px] font-semibold rounded-sm transition-colors ${editMode === 'form' ? 'bg-white shadow-sm text-[#00a0ef]' : 'text-gray-600'}`}>Form Edit</button>
// //             <button onClick={() => setEditMode('direct')} className={`px-4 py-1 cursor-pointer text-[13px] font-semibold rounded-sm transition-colors ${editMode === 'direct' ? 'bg-white shadow-sm text-[#00a0ef]' : 'text-gray-600'}`}>Direct Edit</button>
// //           </div>
// //           <button onClick={() => handleAction("save", handleSubmitToBackend) }
// //           disabled={loadingAction === "save"}

// //             className={`${
// //               loadingAction === "save"
// //                 ? "bg-gray-400 cursor-not-allowed"
// //                 : "bg-[#00a0ef] cursor-pointer"
// //             }  px-5 py-1.5 bg-[#00a0ef] text-white text-[13px] font-semibold rounded-lg cursor-pointer hover:bg-[#64bfec]  flex items-center gap-2 `}>
// //             <Save className="w-4 h-4"/>  
// //             {loadingAction === "save" ? "Saving..." : "Save"}
// //           </button>
// //           <button  
          
// //           className="px-5 py-1.5 bg-[#00a0ef] cursor-pointer text-white text-[13px] font-semibold rounded-lg flex items-center gap-2">
// //             <Printer className="w-4 h-4" /> Download PDF
// //           </button>
// //         </div>
// //       </div>

// //       <div className="flex flex-1 overflow-hidden">
        
// //         {/* Left Sidebar */}
// //         <div className="hidden md:flex w-[320px] shrink-0 flex-col bg-white border-r border-gray-200 shadow z-10 relative">
// //           <div className="p-4 border-b border-gray-100"><span className="text-[13px] font-semibold text-[#00a0ef]">Document Input</span></div>
// //           {renderSidebar()}
// //         </div>

// //         {/* Right Preview */}
// //         <div className="flex-1 bg-[#e4f3fc] overflow-y-auto overflow-x-hidden flex justify-center py-10 relative">
          
           
// //           <div className="fixed bottom-8 right-10 bg-black/60 rounded-full px-4 py-2 flex items-center gap-4 z-10">
// //             <button onClick={() => setZoom(z => Math.max(50, z - 10))} className="text-white"><Minus className="w-5 h-5" /></button>
// //             <span className="text-white text-sm w-12 text-center">{zoom}%</span>
// //             <button onClick={() => setZoom(z => Math.min(200, z + 10))} className="text-white"><Plus className="w-5 h-5" /></button>
// //           </div>

           
// //           <div ref={documentRef} className="print-safe-area">
// //             <div className="flex flex-col gap-10 origin-top transform-container" style={{ transform: `scale(${zoom / 100})`, width: '794px' }}>
// //               {renderDocument()}
// //             </div>
// //           </div>

// //         </div>
// //       </div>

// //       <style dangerouslySetInnerHTML={{__html: `
// //         @media print {
// //           @page { margin: 0; size: A4 portrait; }
// //           body { -webkit-print-color-adjust: exact; print-color-adjust: exact; background: white !important; }
// //           .transform-container { transform: none !important; width: 100% !important; margin: 0 !important; gap: 0 !important; }
// //           .a4-page { width: 210mm !important; height: 297mm !important; margin: 0 !important; padding: 15mm 20mm !important; box-shadow: none !important; page-break-after: always !important; }
// //           .no-print { display: none !important; }
// //         }
// //       `}} />
// //     </div>
// //   );
// // }
// 'use client';

// import React, { useState, useEffect, useRef } from 'react';
// import { useReactToPrint } from 'react-to-print';
// import { Minus, Plus, Printer, Save, ChevronDown, FileText } from 'lucide-react';
// import { useDocumentEditor } from '@/app/lib/useDocumentEditor';
// import BuildingPermitSidebar from '@/app/(Drafter)/components/sidebar/BuildingPermitSidebar';
// import BuildingPermitDoc from '@/app/(Drafter)/components/document/BuildingPermitDoc';
// import BuildingValuationDoc from '@/app/(Drafter)/components/document/BuildingValuationDoc';
// import BuildingValuationSidebar from '@/app/(Drafter)/components/sidebar/BuildingValuationSidebar';

// const DOCUMENT_WIDTH = 794; // A4 width in px at 96dpi

// const TEMPLATE_OPTIONS = [
//   { value: 'provisional_building', label: 'Provisional Building Permit Order' },
//   { value: 'building_valuation', label: 'Building Valuation Report' },
//   { value: 'plot_valuation', label: 'Plot Valuation Report' },
//   { value: 'rental_report', label: 'Rental Value Report' },
//   { value: 'mortgage_report', label: 'Mortgage Valuation Report' },
//   { value: 'insurance_report', label: 'Insurance Report' },
// ];

// export default function DocumentEditorPage() {
//   const [templateDropdownOpen, setTemplateDropdownOpen] = useState(false);
//   const [loadingAction, setLoadingAction] = useState<string | null>(null);

//   // Track preview container width for mobile auto-scaling
//   const previewContainerRef = useRef<HTMLDivElement>(null);
//   const [containerWidth, setContainerWidth] = useState<number>(DOCUMENT_WIDTH);

//   useEffect(() => {
//     const updateWidth = () => {
//       if (previewContainerRef.current) {
//         setContainerWidth(previewContainerRef.current.offsetWidth);
//       }
//     };

//     updateWidth();

//     const resizeObserver = new ResizeObserver(updateWidth);
//     if (previewContainerRef.current) {
//       resizeObserver.observe(previewContainerRef.current);
//     }

//     return () => resizeObserver.disconnect();
//   }, []);

//   const handleAction = async (
//     actionName: string,
//     actionFn: () => Promise<void>
//   ) => {
//     try {
//       setLoadingAction(actionName);
//       await actionFn();
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setLoadingAction(null);
//     }
//   };

//   const {
//     zoom, setZoom,
//     selectedTemplate, setSelectedTemplate,
//     editMode, setEditMode,
//     documentRef,
//     formData, handleChange,
//     handleSubmitToBackend,
//   } = useDocumentEditor();

//   const handleExport = useReactToPrint({
//     contentRef: documentRef,
//     documentTitle: `${selectedTemplate}_${formData.fileNo}`,
//   });

//   const selectedTemplateLabel = TEMPLATE_OPTIONS.find(
//     (t) => t.value === selectedTemplate
//   )?.label;

//   // ─── Mobile scale logic ───────────────────────────────────────────────────
//   // On mobile the preview panel is narrower than 794px.
//   // mobileBaseScale shrinks the document so it fits exactly within the panel.
//   // The user's zoom setting still works on top of that base scale.
//   const isMobile = containerWidth < DOCUMENT_WIDTH;
//   // 16px padding each side so the document never touches screen edges
//   const availableWidth = containerWidth - 32;
//   const mobileBaseScale = availableWidth / DOCUMENT_WIDTH;
//   const effectiveScale = isMobile
//     ? (zoom / 100) * mobileBaseScale
//     : zoom / 100;

//   // CSS scale() doesn't affect layout flow — the element still occupies its
//   // original 794px of space. We compensate with a negative bottom margin so
//   // the scroll area matches the visually scaled size.
//   // A4 aspect ratio ≈ 1:1.414, but documents can be multi-page so we use a
//   // generous estimate; excess negative margin just collapses harmlessly.
//   // estimatedDocHeight covers up to ~4 A4 pages; excess negative margin
//   // collapses harmlessly if the actual document is shorter.
//   const estimatedDocHeight = DOCUMENT_WIDTH * 4;
//   const heightCompensation = isMobile
//     ? estimatedDocHeight * (1 - effectiveScale)
//     : 0;

//   // No manual translateX needed — centering is handled by the wrapper div below.

//   // ─── Render helpers ───────────────────────────────────────────────────────
//   const renderSidebar = () => {
//     switch (selectedTemplate) {
//       case 'provisional_building':
//         return <BuildingPermitSidebar formData={formData} handleChange={handleChange} />;
//       case 'building_valuation':
//         return <BuildingValuationSidebar formData={formData} handleChange={handleChange} />;
//       default:
//         return (
//           <div className="p-10 text-center text-sm font-medium text-gray-400">
//             Template input coming soon
//           </div>
//         );
//     }
//   };

//   const renderDocument = () => {
//     switch (selectedTemplate) {
//       case 'provisional_building':
//         return (
//           <BuildingPermitDoc
//             formData={formData}
//             handleChange={handleChange}
//             editMode={editMode}
//           />
//         );
//       case 'building_valuation':
//         return (
//           <BuildingValuationDoc
//             formData={formData}
//             handleChange={handleChange}
//             editMode={editMode}
//           />
//         );
//       default:
//         return (
//           <div className="flex items-center justify-center h-[800px] w-full bg-white shadow-sm border border-dashed border-gray-300">
//             <div className="text-center">
//               <FileText className="w-16 h-16 mx-auto mb-4 text-[#00a0ef] opacity-50" />
//               <h2 className="text-xl font-semibold tracking-wide text-gray-500">
//                 Document template coming soon
//               </h2>
//             </div>
//           </div>
//         );
//     }
//   };

//   // ─── Render ───────────────────────────────────────────────────────────────
//   return (
//     <div className="flex flex-col h-screen bg-gray-50 font-sans overflow-hidden">

//       {/* ── Header ─────────────────────────────────────────────────────────── */}
//       <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-gray-200 py-3 bg-white px-4 shrink-0 no-print z-20 shadow-sm relative">
//         <div className="flex items-center gap-2 md:gap-4 flex-wrap">

//           {/* Template selector */}
//           <div className="relative">
//             <button
//               onClick={() => setTemplateDropdownOpen(!templateDropdownOpen)}
//               className="flex items-center justify-between px-3 py-1.5 border border-[#00a0ef] rounded-lg text-[13px] text-[#00a0ef] font-medium bg-white min-w-[200px] md:min-w-[250px]"
//             >
//               <span className="truncate">{selectedTemplateLabel}</span>
//               <ChevronDown
//                 className={`w-4 h-4 shrink-0 transition-transform ${templateDropdownOpen ? 'rotate-180' : ''}`}
//               />
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
//                       selectedTemplate === opt.value
//                         ? 'text-[#00a0ef] font-semibold bg-[#f0f8ff]'
//                         : 'text-gray-700'
//                     }`}
//                   >
//                     {opt.label}
//                   </button>
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* Edit mode toggle — desktop only */}
//           <div className="hidden md:flex items-center bg-gray-100 rounded-md p-0.5 border border-gray-200">
//             <button
//               onClick={() => setEditMode('form')}
//               className={`px-4 py-1 cursor-pointer text-[13px] font-semibold rounded-sm transition-colors ${
//                 editMode === 'form' ? 'bg-white shadow-sm text-[#00a0ef]' : 'text-gray-600'
//               }`}
//             >
//               Form Edit
//             </button>
//             <button
//               onClick={() => setEditMode('direct')}
//               className={`px-4 py-1 cursor-pointer text-[13px] font-semibold rounded-sm transition-colors ${
//                 editMode === 'direct' ? 'bg-white shadow-sm text-[#00a0ef]' : 'text-gray-600'
//               }`}
//             >
//               Direct Edit
//             </button>
//           </div>

//           {/* Save button */}
//           <button
//             onClick={() => handleAction('save', handleSubmitToBackend)}
//             disabled={loadingAction === 'save'}
//             className={`${
//               loadingAction === 'save'
//                 ? 'bg-gray-400 cursor-not-allowed'
//                 : 'bg-[#00a0ef] cursor-pointer hover:bg-[#64bfec]'
//             } px-5 py-1.5 text-white text-[13px] font-semibold rounded-lg flex items-center gap-2 transition-colors`}
//           >
//             <Save className="w-4 h-4" />
//             {loadingAction === 'save' ? 'Saving...' : 'Save'}
//           </button>

//           {/* Download PDF button */}
//           <button
//             onClick={() => handleAction('export', async () => handleExport())}
//             disabled={loadingAction === 'export'}
//             className={`${
//               loadingAction === 'export'
//                 ? 'bg-gray-400 cursor-not-allowed'
//                 : 'bg-[#00a0ef] cursor-pointer hover:bg-[#64bfec]'
//             } px-5 py-1.5 text-white text-[13px] font-semibold rounded-lg flex items-center gap-2 transition-colors`}
//           >
//             <Printer className="w-4 h-4" />
//             {loadingAction === 'export' ? 'Exporting...' : 'Download PDF'}
//           </button>
//         </div>
//       </div>

//       {/* ── Body ───────────────────────────────────────────────────────────── */}
//       <div className="flex flex-1 overflow-hidden">

//         {/* Left Sidebar — desktop only */}
//         <div className="hidden md:flex w-[320px] shrink-0 flex-col bg-white border-r border-gray-200 shadow z-10 relative">
//           <div className="p-4 border-b border-gray-100">
//             <span className="text-[13px] font-semibold text-[#00a0ef]">Document Input</span>
//           </div>
//           <div className="flex-1 overflow-y-auto">
//             {renderSidebar()}
//           </div>
//         </div>

//         {/* Document Preview */}
//         <div
//           ref={previewContainerRef}
//           className="flex-1 bg-[#e4f3fc] overflow-y-auto overflow-x-hidden py-6 md:py-10 relative"
//         >

//           {/* Zoom controls */}
//           <div className="fixed bottom-6 right-4 md:bottom-8 md:right-10 bg-black/60 rounded-full px-3 md:px-4 py-2 flex items-center gap-3 md:gap-4 z-10 no-print">
//             <button
//               onClick={() => setZoom((z) => Math.max(50, z - 10))}
//               className="text-white"
//               aria-label="Zoom out"
//             >
//               <Minus className="w-4 h-4 md:w-5 md:h-5" />
//             </button>
//             <span className="text-white text-xs md:text-sm w-10 md:w-12 text-center">
//               {zoom}%
//             </span>
//             <button
//               onClick={() => setZoom((z) => Math.min(200, z + 10))}
//               className="text-white"
//               aria-label="Zoom in"
//             >
//               <Plus className="w-4 h-4 md:w-5 md:h-5" />
//             </button>
//           </div>

//           {/*
//             Centering strategy that actually works on mobile:
            
//             1. Outer wrapper is full container width, displays as flex, 
//                centers its single child horizontally.
//             2. The child is a 0-width (via width:0) flex column that 
//                overflows visually but doesn't affect layout.
//             3. We set transformOrigin 'top center' on the 794px doc div
//                so scale() shrinks toward the center — guaranteeing the
//                document is always visually centered regardless of zoom.
//             4. A compensating negative margin corrects the layout height
//                so the scroll area matches the scaled visual height.
//           */}
//           <div
//             ref={documentRef}
//             className="print-safe-area w-full flex flex-col items-center"
//           >
//             <div
//               className="flex flex-col gap-10 transform-container"
//               style={{
//                 width: `${DOCUMENT_WIDTH}px`,
//                 transform: `scale(${effectiveScale})`,
//                 transformOrigin: 'top center',
//                 marginBottom: `-${heightCompensation}px`,
//               }}
//             >
//               {renderDocument()}
//             </div>
//           </div>

//         </div>
//       </div>

//       {/* ── Print / PDF styles ─────────────────────────────────────────────── */}
//       <style dangerouslySetInnerHTML={{
//         __html: `
//           @media print {
//             @page {
//               margin: 0;
//               size: A4 portrait;
//             }
//             body {
//               -webkit-print-color-adjust: exact;
//               print-color-adjust: exact;
//               background: white !important;
//             }
//             .transform-container {
//               transform: none !important;
//               width: 100% !important;
//               margin: 0 !important;
//               gap: 0 !important;
//             }
//             .a4-page {
//               width: 210mm !important;
//               height: 297mm !important;
//               margin: 0 !important;
//               padding: 15mm 20mm !important;
//               box-shadow: none !important;
//               page-break-after: always !important;
//             }
//             .no-print {
//               display: none !important;
//             }
//           }
//         `
//       }} />
//     </div>
//   );
// }
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { Minus, Plus, Printer, Save, ChevronDown, FileText } from 'lucide-react';
import { useDocumentEditor } from '@/app/lib/useDocumentEditor';
import BuildingPermitSidebar from '@/app/(Drafter)/components/sidebar/BuildingPermitSidebar';
import BuildingPermitDoc from '@/app/(Drafter)/components/document/BuildingPermitDoc';
import BuildingValuationDoc from '@/app/(Drafter)/components/document/BuildingValuationDoc';
import BuildingValuationSidebar from '@/app/(Drafter)/components/sidebar/BuildingValuationSidebar';

const DOCUMENT_WIDTH = 794; // A4 width in px at 96dpi

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
  const [loadingAction, setLoadingAction] = useState<string | null>(null);

  // Track preview container width for mobile auto-scaling
  const previewContainerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState<number>(DOCUMENT_WIDTH);
  const [sitePhotos, setSitePhotos] = useState<{ url: string; name: string }[]>([]);
  const [mapPhotos, setMapPhotos] = useState<{ url: string; label: string }[]>([]);
  // Measure the actual rendered height of the document inner div.
  // Using a callback ref so we get notified the moment the element mounts
  // and can immediately attach a ResizeObserver to track height changes
  // (e.g. when formData changes and the document grows/shrinks).
  const [docRenderedHeight, setDocRenderedHeight] = useState<number>(0);
  const docHeightObserverRef = useRef<ResizeObserver | null>(null);

  const docInnerRef = React.useCallback((node: HTMLDivElement | null) => {
    // Disconnect any previous observer
    if (docHeightObserverRef.current) {
      docHeightObserverRef.current.disconnect();
      docHeightObserverRef.current = null;
    }
    if (!node) return;
    // Measure immediately
    setDocRenderedHeight(node.scrollHeight);
    // Re-measure on every resize (content change, orientation change, etc.)
    const ro = new ResizeObserver(() => setDocRenderedHeight(node.scrollHeight));
    ro.observe(node);
    docHeightObserverRef.current = ro;
  }, []);

  useEffect(() => {
    const updateWidth = () => {
      if (previewContainerRef.current) {
        setContainerWidth(previewContainerRef.current.offsetWidth);
      }
    };

    updateWidth();

    const resizeObserver = new ResizeObserver(updateWidth);
    if (previewContainerRef.current) resizeObserver.observe(previewContainerRef.current);

    return () => resizeObserver.disconnect();
  }, []);

  const handleAction = async (
    actionName: string,
    actionFn: () => Promise<void>
  ) => {
    try {
      setLoadingAction(actionName);
      await actionFn();
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingAction(null);
    }
  };

  const {
    zoom, setZoom,
    selectedTemplate, setSelectedTemplate,
    editMode, setEditMode,
    documentRef,
    formData, handleChange,
    handleSubmitToBackend,
  } = useDocumentEditor();

  const handleExport = useReactToPrint({
    contentRef: documentRef,
    documentTitle: `${selectedTemplate}_${formData.fileNo}`,
  });

  const selectedTemplateLabel = TEMPLATE_OPTIONS.find(
    (t) => t.value === selectedTemplate
  )?.label;

  // ─── Mobile scale logic ───────────────────────────────────────────────────
  // On mobile the preview panel is narrower than 794px.
  // mobileBaseScale shrinks the document so it fits exactly within the panel.
  // The user's zoom setting still works on top of that base scale.
  const isMobile = containerWidth < DOCUMENT_WIDTH;
  // 16px padding each side so the document never touches screen edges
  const availableWidth = containerWidth - 32;
  const mobileBaseScale = availableWidth / DOCUMENT_WIDTH;
  const effectiveScale = isMobile
    ? (zoom / 100) * mobileBaseScale
    : zoom / 100;

  // CSS scale() doesn't affect layout flow — the element still occupies its
  // original unscaled height in the DOM. We apply a negative bottom margin
  // equal to the pixels "saved" by scaling so the scroll area ends exactly
  // where the scaled document ends visually.
  // docRenderedHeight is the real measured height via ResizeObserver.
  // Falls back to a single-page A4 estimate until the first measurement.
  const actualDocHeight = docRenderedHeight > 0 ? docRenderedHeight : DOCUMENT_WIDTH * 1.414;
  const heightCompensation = isMobile
    ? actualDocHeight * (1 - effectiveScale)
    : 0;

  // No manual translateX needed — centering is handled by the wrapper div below.

  // ─── Render helpers ───────────────────────────────────────────────────────
  // const renderSidebar = () => {
  //   switch (selectedTemplate) {
  //     case 'provisional_building':
  //       return <BuildingPermitSidebar formData={formData} handleChange={handleChange} />;
  //     case 'building_valuation':
  //       return <BuildingValuationSidebar formData={formData} handleChange={handleChange} />;
  //     default:
  //       return (
  //         <div className="p-10 text-center text-sm font-medium text-gray-400">
  //           Template input coming soon
  //         </div>
  //       );
  //   }
  // };
  const renderSidebar = () => {
    switch (selectedTemplate) {
      case 'provisional_building':
        return <BuildingPermitSidebar formData={formData} handleChange={handleChange} />;
      case 'building_valuation':
        return (
          <BuildingValuationSidebar 
            formData={formData as any} 
            handleChange={handleChange} 
            // Add these 4 lines:
            sitePhotos={sitePhotos}
            onSitePhotosChange={setSitePhotos}
            mapPhotos={mapPhotos}
            onMapPhotosChange={setMapPhotos}
          />
        );
      default:
        return (
          <div className="p-10 text-center text-sm font-medium text-gray-400">
            Template input coming soon
          </div>
        );
    }
  };

  // const renderDocument = () => {
  //   switch (selectedTemplate) {
  //     case 'provisional_building':
  //       return (
  //         <BuildingPermitDoc
  //           formData={formData}
  //           handleChange={handleChange}
  //           editMode={editMode}
  //         />
  //       );
  //     case 'building_valuation':
  //       return (
  //         <BuildingValuationDoc
  //           formData={formData}
  //           handleChange={handleChange}
  //           editMode={editMode}
  //         />
  //       );
  const renderDocument = () => {
    switch (selectedTemplate) {
      case 'provisional_building':
        return (
          <BuildingPermitDoc
            formData={formData}
            handleChange={handleChange}
            editMode={editMode}
          />
        );
      case 'building_valuation':
        return (
          <BuildingValuationDoc
            formData={formData as any} // (Good to add 'as any' here too)
            handleChange={handleChange}
            editMode={editMode}
            // Add these 2 lines so the document can display the photos!
            sitePhotos={sitePhotos}
            mapPhotos={mapPhotos}
          />
        );
      default:
        return (
          <div className="flex items-center justify-center h-[800px] w-full bg-white shadow-sm border border-dashed border-gray-300">
            <div className="text-center">
              <FileText className="w-16 h-16 mx-auto mb-4 text-[#00a0ef] opacity-50" />
              <h2 className="text-xl font-semibold tracking-wide text-gray-500">
                Document template coming soon
              </h2>
            </div>
          </div>
        );
    }
  };

  // ─── Render ───────────────────────────────────────────────────────────────
  return (
    <div className="flex flex-col h-screen bg-gray-50 font-sans overflow-hidden">

      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-gray-200 py-3 bg-white px-4 shrink-0 no-print z-20 shadow-sm relative">
        <div className="flex items-center gap-2 md:gap-4 flex-wrap">

          {/* Template selector */}
          <div className="relative">
            <button
              onClick={() => setTemplateDropdownOpen(!templateDropdownOpen)}
              className="flex items-center justify-between px-3 py-1.5 border border-[#00a0ef] rounded-lg text-[13px] text-[#00a0ef] font-medium bg-white min-w-[200px] md:min-w-[250px]"
            >
              <span className="truncate">{selectedTemplateLabel}</span>
              <ChevronDown
                className={`w-4 h-4 shrink-0 transition-transform ${templateDropdownOpen ? 'rotate-180' : ''}`}
              />
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
                      selectedTemplate === opt.value
                        ? 'text-[#00a0ef] font-semibold bg-[#f0f8ff]'
                        : 'text-gray-700'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Edit mode toggle — desktop only */}
          <div className="hidden md:flex items-center bg-gray-100 rounded-md p-0.5 border border-gray-200">
            <button
              onClick={() => setEditMode('form')}
              className={`px-4 py-1 cursor-pointer text-[13px] font-semibold rounded-sm transition-colors ${
                editMode === 'form' ? 'bg-white shadow-sm text-[#00a0ef]' : 'text-gray-600'
              }`}
            >
              Form Edit
            </button>
            <button
              onClick={() => setEditMode('direct')}
              className={`px-4 py-1 cursor-pointer text-[13px] font-semibold rounded-sm transition-colors ${
                editMode === 'direct' ? 'bg-white shadow-sm text-[#00a0ef]' : 'text-gray-600'
              }`}
            >
              Direct Edit
            </button>
          </div>

          {/* Save button */}
          <button
            onClick={() => handleAction('save', handleSubmitToBackend)}
            disabled={loadingAction === 'save'}
            className={`${
              loadingAction === 'save'
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-[#00a0ef] cursor-pointer hover:bg-[#64bfec]'
            } px-5 py-1.5 text-white text-[13px] font-semibold rounded-lg flex items-center gap-2 transition-colors`}
          >
            <Save className="w-4 h-4" />
            {loadingAction === 'save' ? 'Saving...' : 'Save'}
          </button>

          {/* Download PDF button */}
          <button
            onClick={() => handleAction('export', async () => handleExport())}
            disabled={loadingAction === 'export'}
            className={`${
              loadingAction === 'export'
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-[#00a0ef] cursor-pointer hover:bg-[#64bfec]'
            } px-5 py-1.5 text-white text-[13px] font-semibold rounded-lg flex items-center gap-2 transition-colors`}
          >
            <Printer className="w-4 h-4" />
            {loadingAction === 'export' ? 'Exporting...' : 'Download PDF'}
          </button>
        </div>
      </div>

      {/* ── Body ───────────────────────────────────────────────────────────── */}
      <div className="flex flex-1 overflow-hidden">

        {/* Left Sidebar — desktop only */}
        <div className="hidden md:flex w-[320px] shrink-0 flex-col bg-white border-r border-gray-200 shadow z-10 relative">
          <div className="p-4 border-b border-gray-100">
            <span className="text-[13px] font-semibold text-[#00a0ef]">Document Input</span>
          </div>
          <div className="flex-1 overflow-y-auto">
            {renderSidebar()}
          </div>
        </div>

        {/* Document Preview */}
        <div
          ref={previewContainerRef}
          className="flex-1 bg-[#e4f3fc] overflow-y-auto overflow-x-hidden py-6 md:py-10 relative"
        >

          {/* Zoom controls */}
          <div className="fixed bottom-6 right-4 md:bottom-8 md:right-10 bg-black/60 rounded-full px-3 md:px-4 py-2 flex items-center gap-3 md:gap-4 z-10 no-print">
            <button
              onClick={() => setZoom((z) => Math.max(50, z - 10))}
              className="text-white"
              aria-label="Zoom out"
            >
              <Minus className="w-4 h-4 md:w-5 md:h-5" />
            </button>
            <span className="text-white text-xs md:text-sm w-10 md:w-12 text-center">
              {zoom}%
            </span>
            <button
              onClick={() => setZoom((z) => Math.min(200, z + 10))}
              className="text-white"
              aria-label="Zoom in"
            >
              <Plus className="w-4 h-4 md:w-5 md:h-5" />
            </button>
          </div>

          {/*
            Centering strategy that actually works on mobile:
            
            1. Outer wrapper is full container width, displays as flex, 
               centers its single child horizontally.
            2. The child is a 0-width (via width:0) flex column that 
               overflows visually but doesn't affect layout.
            3. We set transformOrigin 'top center' on the 794px doc div
               so scale() shrinks toward the center — guaranteeing the
               document is always visually centered regardless of zoom.
            4. A compensating negative margin corrects the layout height
               so the scroll area matches the scaled visual height.
          */}
          <div
            ref={documentRef}
            className="print-safe-area w-full flex flex-col items-center"
          >
            <div
              ref={docInnerRef}
              className="flex flex-col gap-10 transform-container"
              style={{
                width: `${DOCUMENT_WIDTH}px`,
                transform: `scale(${effectiveScale})`,
                transformOrigin: 'top center',
                marginBottom: `-${heightCompensation}px`,
              }}
            >
              {renderDocument()}
            </div>
          </div>

        </div>
      </div>

      {/* ── Print / PDF styles ─────────────────────────────────────────────── */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @media print {
            @page {
              margin: 0;
              size: A4 portrait;
            }
            body {
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
              background: white !important;
            }
            .transform-container {
              transform: none !important;
              width: 100% !important;
              margin: 0 !important;
              gap: 0 !important;
            }
            .a4-page {
              width: 210mm !important;
              height: 297mm !important;
              margin: 0 !important;
              padding: 15mm 20mm !important;
              box-shadow: none !important;
              page-break-after: always !important;
            }
            .no-print {
              display: none !important;
            }
          }
        `
      }} />
    </div>
  );
}