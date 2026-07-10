 
// 'use client';

// import React, { useState, useEffect, useRef } from 'react';
// import { useParams } from 'next/navigation';
// import { useReactToPrint } from 'react-to-print';
// import { Minus, Plus, Printer, Save, ChevronDown, FileText, Loader2 } from 'lucide-react';
// import { useDocumentEditor } from '@/app/lib/useDocumentEditor';
// import BuildingPermitSidebar from '@/app/(Drafter)/components/sidebar/BuildingPermitSidebar';
// import BuildingPermitDoc from '@/app/(Drafter)/components/document/BuildingPermitDoc';
// import BuildingValuationDoc from '@/app/(Drafter)/components/document/BuildingValuationDoc';
// import BuildingValuationSidebar from '@/app/(Drafter)/components/sidebar/BuildingValuationSidebar';
// import { api } from '@/app/lib/userApis';

// const DOCUMENT_WIDTH = 794; // A4 width in px at 96dpi

// const TEMPLATE_OPTIONS = [
//   { value: 'building_valuation', label: 'Building Valuation (BV_DSK)' },
//   { value: 'provisional_building', label: 'Provisional Building Permit Order' }, 
//   { value: 'plot_valuation', label: 'Plot Valuation Report' },
//   { value: 'rental_report', label: 'Rental Value Report' },
//   { value: 'mortgage_report', label: 'Mortgage Valuation Report' },
//   { value: 'insurance_report', label: 'Insurance Report' },
// ];

// export default function DocumentEditorPage() {
//   const params = useParams();
//   const recordId = params.id as string;

//   const [initialRecord, setInitialRecord] = useState<any>(null);
//   const [isFetchingData, setIsFetchingData] = useState(true);

//   const [templateDropdownOpen, setTemplateDropdownOpen] = useState(false);
//   const [loadingAction, setLoadingAction] = useState<string | null>(null);

//   const previewContainerRef = useRef<HTMLDivElement>(null);
//   const [containerWidth, setContainerWidth] = useState<number>(DOCUMENT_WIDTH);
//   const [docRenderedHeight, setDocRenderedHeight] = useState<number>(0);
//   const docHeightObserverRef = useRef<ResizeObserver | null>(null);

//   // Fetch the record data on mount
//   useEffect(() => {
//     if (!recordId) {
//       setIsFetchingData(false);
//       return;
//     }
    
//     const fetchRecord = async () => {
//       try {
//         const data = await api.getValuationRecordById(recordId);
//         setInitialRecord(data);
//       } catch (error) {
//         console.error("Failed to load record:", error);
//       } finally {
//         setIsFetchingData(false);
//       }
//     };

//     fetchRecord();
//   }, [recordId]);

//   const docInnerRef = React.useCallback((node: HTMLDivElement | null) => {
//     if (docHeightObserverRef.current) {
//       docHeightObserverRef.current.disconnect();
//       docHeightObserverRef.current = null;
//     }
//     if (!node) return;
//     setDocRenderedHeight(node.scrollHeight);
//     const ro = new ResizeObserver(() => setDocRenderedHeight(node.scrollHeight));
//     ro.observe(node);
//     docHeightObserverRef.current = ro;
//   }, []);

//   useEffect(() => {
//     const updateWidth = () => {
//       if (previewContainerRef.current) {
//         setContainerWidth(previewContainerRef.current.offsetWidth);
//       }
//     };

//     updateWidth();

//     const resizeObserver = new ResizeObserver(updateWidth);
//     if (previewContainerRef.current) resizeObserver.observe(previewContainerRef.current);

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

//   // Pass the fetched record and ID to the hook
//   const {
//     zoom, setZoom,
//     selectedTemplate, setSelectedTemplate,
//     editMode, setEditMode,
//     documentRef,
//     formData, handleChange,
//     handleSubmitToBackend,
//     sitePhotos, setSitePhotos, addSitePhotos,
//     mapPhotos, setMapPhotos
//   } = useDocumentEditor(initialRecord, recordId);

//   const handleExport = useReactToPrint({
//     contentRef: documentRef,
//     documentTitle: `${selectedTemplate}_${formData.fileNo || 'Report'}`,
//   });

//   const selectedTemplateLabel = TEMPLATE_OPTIONS.find(
//     (t) => t.value === selectedTemplate
//   )?.label;

//   const isMobile = containerWidth < DOCUMENT_WIDTH;
//   const availableWidth = containerWidth - 32;
//   const mobileBaseScale = availableWidth / DOCUMENT_WIDTH;
//   const effectiveScale = isMobile
//     ? (zoom / 100) * mobileBaseScale
//     : zoom / 100;

//   const actualDocHeight = docRenderedHeight > 0 ? docRenderedHeight : DOCUMENT_WIDTH * 1.414;
//   const heightCompensation = isMobile
//     ? actualDocHeight * (1 - effectiveScale)
//     : 0;

//   const renderSidebar = () => {
//     switch (selectedTemplate) {
//       case 'provisional_building':
//         return <BuildingPermitSidebar formData={formData} handleChange={handleChange} />;
//       case 'building_valuation':
//         return (
//           <BuildingValuationSidebar 
//             formData={formData as any} 
//             handleChange={handleChange} 
//             sitePhotos={sitePhotos}
//             onSitePhotosChange={setSitePhotos}
//             onAddSitePhotos={addSitePhotos} 
//             mapPhotos={mapPhotos}
//             onMapPhotosChange={setMapPhotos}
//           />
//         );
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
//             formData={formData as any}
//             handleChange={handleChange}
//             editMode={editMode}
//             sitePhotos={sitePhotos}
//             mapPhotos={mapPhotos}
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

//   if (isFetchingData) {
//     return (
//       <div className="flex flex-col items-center justify-center h-screen bg-gray-50 gap-4">
//         <Loader2 className="w-8 h-8 animate-spin text-[#00a0ef]" />
//         <p className="text-sm font-medium text-gray-600">Loading record data...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="flex flex-col h-screen bg-gray-50 font-sans overflow-hidden">

//       {/* ── Header ─────────────────────────────────────────────────────────── */}
//       <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-gray-200 py-3 bg-white px-4 shrink-0 no-print z-20 shadow-sm relative">
//         <div className="flex items-center gap-2 md:gap-4 flex-wrap">

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
//             {loadingAction === 'save' ? 'Saving...' : 'Save Updates'}
//           </button>

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

//         <div className="hidden md:flex w-[320px] shrink-0 flex-col bg-white border-r border-gray-200 shadow z-10 relative">
//           <div className="p-4 border-b border-gray-100">
//             <span className="text-[13px] font-semibold text-[#00a0ef]">Document Input</span>
//           </div>
//           <div className="flex-1 overflow-y-auto">
//             {renderSidebar()}
//           </div>
//         </div>

//         <div
//           ref={previewContainerRef}
//           className="flex-1 bg-[#e4f3fc] overflow-y-auto overflow-x-hidden py-6 md:py-10 relative"
//         >

//           <div className="fixed bottom-6 right-4 md:bottom-8 md:right-10 bg-black/60 rounded-full px-3 md:px-4 py-2 flex items-center gap-3 md:gap-4 z-10 no-print">
//             <button
//               onClick={() => setZoom((z) => Math.max(50, z - 10))}
//               className="text-white"
//             >
//               <Minus className="w-4 h-4 md:w-5 md:h-5" />
//             </button>
//             <span className="text-white text-xs md:text-sm w-10 md:w-12 text-center">
//               {zoom}%
//             </span>
//             <button
//               onClick={() => setZoom((z) => Math.min(200, z + 10))}
//               className="text-white"
//             >
//               <Plus className="w-4 h-4 md:w-5 md:h-5" />
//             </button>
//           </div>

//           <div
//             ref={documentRef}
//             className="print-safe-area w-full flex flex-col items-center"
//           >
//             <div
//               ref={docInnerRef}
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
import { useParams } from 'next/navigation';
import { useReactToPrint } from 'react-to-print';
import { Minus, Plus, Printer, Save, ChevronDown, FileText, Loader2, Send, Lock } from 'lucide-react';
import { useDocumentEditor } from '@/app/lib/useDocumentEditor';
import BuildingPermitSidebar from '@/app/(Drafter)/components/sidebar/BuildingPermitSidebar';
import BuildingPermitDoc from '@/app/(Drafter)/components/document/BuildingPermitDoc';
import BuildingValuationDoc from '@/app/(Drafter)/components/document/BuildingValuationDoc';
import BuildingValuationSidebar from '@/app/(Drafter)/components/sidebar/BuildingValuationSidebar';
import { api } from '@/app/lib/userApis';

const DOCUMENT_WIDTH = 794; // A4 width in px at 96dpi

const TEMPLATE_OPTIONS = [
  { value: 'building_valuation', label: 'Building Valuation (BV_DSK)' },
  { value: 'provisional_building', label: 'Provisional Building Permit Order' }, 
  { value: 'plot_valuation', label: 'Plot Valuation Report' },
  { value: 'rental_report', label: 'Rental Value Report' },
  { value: 'mortgage_report', label: 'Mortgage Valuation Report' },
  { value: 'insurance_report', label: 'Insurance Report' },
];

export default function DocumentEditorPage() {
  const params = useParams();
  const recordId = params.id as string;

  const [initialRecord, setInitialRecord] = useState<any>(null);
  const [isFetchingData, setIsFetchingData] = useState(true);

  const [templateDropdownOpen, setTemplateDropdownOpen] = useState(false);
  const [loadingAction, setLoadingAction] = useState<string | null>(null);

  const previewContainerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState<number>(DOCUMENT_WIDTH);
  const [docRenderedHeight, setDocRenderedHeight] = useState<number>(0);
  const docHeightObserverRef = useRef<ResizeObserver | null>(null);

  // Fetch the record data on mount
  useEffect(() => {
    if (!recordId) {
      setIsFetchingData(false);
      return;
    }
    
    const fetchRecord = async () => {
      try {
        const data = await api.getValuationRecordById(recordId);
        setInitialRecord(data);
      } catch (error) {
        console.error("Failed to load record:", error);
      } finally {
        setIsFetchingData(false);
      }
    };

    fetchRecord();
  }, [recordId]);

  const docInnerRef = React.useCallback((node: HTMLDivElement | null) => {
    if (docHeightObserverRef.current) {
      docHeightObserverRef.current.disconnect();
      docHeightObserverRef.current = null;
    }
    if (!node) return;
    setDocRenderedHeight(node.scrollHeight);
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

  // Pass the fetched record and ID to the hook
  const {
    zoom, setZoom,
    selectedTemplate, setSelectedTemplate,
    editMode, setEditMode,
    documentRef,
    formData, handleChange,
    handleSubmitToBackend, // This saves as "drafting" inside the hook
    sitePhotos, setSitePhotos,
    mapPhotos, setMapPhotos
  } = useDocumentEditor(initialRecord, recordId);

  // --- NEW: Submit for Approval Logic ---
  const handleSubmitForApproval = async () => {
    if (!recordId) return;
    const finalPayload = {
      ...formData,
      sitePhotos,
      mapPhotos
    };

    try {
      await api.updateValuationRecord(recordId, {
        templateId: selectedTemplate,
        draftData: finalPayload,
        status: 'pending_approval' // Moves it to the Validator's queue
      });
      // Update local state to immediately lock the UI
      setInitialRecord((prev: any) => ({ ...prev, status: 'pending_approval' }));
      alert('Document submitted for approval successfully!');
    } catch (error) {
      console.error("Failed to submit for approval:", error);
      alert('An error occurred while submitting.');
    }
  };

  const handleExport = useReactToPrint({
    contentRef: documentRef,
    documentTitle: `${selectedTemplate}_${formData.fileNo || 'Report'}`,
  });

  const selectedTemplateLabel = TEMPLATE_OPTIONS.find(
    (t) => t.value === selectedTemplate
  )?.label;

  const isMobile = containerWidth < DOCUMENT_WIDTH;
  const availableWidth = containerWidth - 32;
  const mobileBaseScale = availableWidth / DOCUMENT_WIDTH;
  const effectiveScale = isMobile
    ? (zoom / 100) * mobileBaseScale
    : zoom / 100;

  const actualDocHeight = docRenderedHeight > 0 ? docRenderedHeight : DOCUMENT_WIDTH * 1.414;
  const heightCompensation = isMobile
    ? actualDocHeight * (1 - effectiveScale)
    : 0;

  // --- NEW: UI Locking Logic ---
  // If the document is pending approval (or approved), it's strictly Read-Only for the drafter.
  // Unlocks if it's new, drafting, OR 'revision_requested'
  const isReadOnly = initialRecord?.status === 'pending_approval' || initialRecord?.status === 'approved';
  const isLocked = isReadOnly || loadingAction !== null;

  // Determine what the top badge should say
  let badgeText = 'Drafting';
  let badgeStyles = 'bg-gray-100 text-gray-600 border-gray-200';
  if (initialRecord?.status === 'pending_approval') {
    badgeText = 'Pending Approval';
    badgeStyles = 'bg-yellow-50 text-yellow-600 border-yellow-200';
  } else if (initialRecord?.status === 'approved') {
    badgeText = 'Approved';
    badgeStyles = 'bg-green-50 text-green-600 border-green-200';
  } else if (initialRecord?.status === 'revision_requested') {
    badgeText = 'Revision Requested';
    badgeStyles = 'bg-red-50 text-red-600 border-red-200';
  }
  const renderSidebar = (locked? :boolean ) => {
     switch (selectedTemplate) {
      case 'provisional_building':
        return <BuildingPermitSidebar formData={formData} handleChange={handleChange} />;
      case 'building_valuation':
        return (
          <BuildingValuationSidebar 
            formData={formData as any} 
            handleChange={handleChange} 
            sitePhotos={sitePhotos}
            onSitePhotosChange={setSitePhotos}
            mapPhotos={mapPhotos}
            onMapPhotosChange={setMapPhotos}
            locked={isLocked}

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
            formData={formData as any}
            handleChange={handleChange}
            editMode={editMode}
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

  if (isFetchingData) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-50 gap-4">
        <Loader2 className="w-8 h-8 animate-spin text-[#00a0ef]" />
        <p className="text-sm font-medium text-gray-600">Loading record data...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50 font-sans overflow-hidden">

      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-gray-200 py-3 bg-white px-4 shrink-0 no-print z-20 shadow-sm relative">
        <div className="flex items-center gap-2 md:gap-4 flex-wrap">

          {/* Template Dropdown - Disabled when locked */}
          <div className="relative">
            <button
              disabled={isLocked}
              onClick={() => setTemplateDropdownOpen(!templateDropdownOpen)}
              className={`flex items-center justify-between px-3 py-1.5 border rounded-lg text-[13px] font-medium min-w-[200px] md:min-w-[250px] transition-colors ${
                isLocked ? 'bg-gray-100 border-gray-300 text-gray-500 cursor-not-allowed' : 'bg-white border-[#00a0ef] text-[#00a0ef]'
              }`}
            >
              <span className="truncate">{selectedTemplateLabel}</span>
              <ChevronDown
                className={`w-4 h-4 shrink-0 transition-transform ${templateDropdownOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {templateDropdownOpen && !isLocked && (
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

          {/* Edit Mode Toggle - Disabled when locked */}
          <div className={`hidden md:flex items-center rounded-md p-0.5 border transition-colors ${isLocked ? 'bg-gray-200 border-gray-300 opacity-60' : 'bg-gray-100 border-gray-200'}`}>
            <button
              disabled={isLocked}
              onClick={() => setEditMode('form')}
              className={`px-4 py-1 text-[13px] font-semibold rounded-sm transition-colors ${
                editMode === 'form' 
                  ? (isLocked ? 'bg-white text-gray-500 shadow-sm' : 'bg-white text-[#00a0ef] shadow-sm') 
                  : 'text-gray-600'
              } ${isLocked ? 'cursor-not-allowed' : 'cursor-pointer'}`}
            >
              Form Edit
            </button>
            <button
              disabled={isLocked}
              onClick={() => setEditMode('direct')}
              className={`px-4 py-1 text-[13px] font-semibold rounded-sm transition-colors ${
                editMode === 'direct' 
                  ? (isLocked ? 'bg-white text-gray-500 shadow-sm' : 'bg-white text-[#00a0ef] shadow-sm') 
                  : 'text-gray-600'
              } ${isLocked ? 'cursor-not-allowed' : 'cursor-pointer'}`}
            >
              Direct Edit
            </button>
          </div>

          {/* Status Badge / Action Buttons */}
          <div className="flex items-center gap-2 ml-auto">
            {isReadOnly ? (
              <div className={`flex items-center gap-1.5 px-4 py-1.5 text-[13px] font-bold rounded-lg border ${
                initialRecord?.status === 'approved' 
                  ? 'bg-green-100 text-green-700 border-green-200' 
                  : initialRecord?.status === 'revision_requested' ? 'bg-blue-100 text-blue-700 border-blue-200':'bg-blue-100 text-amber-700 border-amber-200'
              }`}>
                <Lock className="w-4 h-4" />
                {initialRecord?.status === 'approved' ? 'Approved (Read-Only)' : 'Pending Approval (Read-Only)'}
              </div>
            ) : (
              <>
                <button
                  onClick={() => handleAction('save', handleSubmitToBackend)}
                  disabled={isLocked}
                  className={`${
                    isLocked ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#00a0ef] cursor-pointer hover:bg-[#64bfec]'
                  } px-5 py-1.5 text-white text-[13px] font-semibold rounded-lg flex items-center gap-2 transition-colors`}
                >
                  <Save className="w-4 h-4" />
                  {loadingAction === 'save' ? 'Saving...' : 'Save Draft'}
                </button>
                
                <button
                  onClick={() => handleAction('submit', handleSubmitForApproval)}
                  disabled={isLocked}
                  className={`${
                    isLocked ? 'bg-gray-400 cursor-not-allowed' : 'bg-emerald-600 cursor-pointer hover:bg-emerald-500'
                  } px-5 py-1.5 text-white text-[13px] font-semibold rounded-lg flex items-center gap-2 transition-colors`}
                >
                  <Send className="w-4 h-4" />
                  {loadingAction === 'submit' ? 'Submitting...' : 'Submit to Validator'}
                </button>
              </>
            )}

            <button
              onClick={() => handleAction('export', async () => handleExport())}
              disabled={loadingAction === 'export'}
              className={`${
                loadingAction === 'export'
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gray-800 cursor-pointer hover:bg-gray-700'
              } px-5 py-1.5 text-white text-[13px] font-semibold rounded-lg flex items-center gap-2 transition-colors`}
            >
              <Printer className="w-4 h-4" />
              {loadingAction === 'export' ? 'Exporting...' : 'PDF'}
            </button>
          </div>
        </div>
      </div>

      {/* ── Body ───────────────────────────────────────────────────────────── */}
      <div className="flex flex-1 overflow-hidden">

        {/* Left Sidebar */}
        <div className="hidden md:flex w-[320px] shrink-0 flex-col bg-white border-r border-gray-200 shadow z-10 relative">
          <div className="p-4 border-b border-gray-100">
            <span className="text-[13px] font-semibold text-[#00a0ef]">Document Input</span>
          </div>
          <div className="flex-1 overflow-y-auto relative">
            {/* INVISIBLE OVERLAY TO BLOCK CLICKS WHEN LOCKED */}
            {isLocked &&renderSidebar(true)  }
            { !isLocked && renderSidebar()}
          </div>
        </div>

        {/* Document Preview */}
        <div
          ref={previewContainerRef}
          className="flex-1 bg-[#e4f3fc] overflow-y-auto overflow-x-hidden py-6 md:py-10 relative"
        >

          <div className="fixed bottom-6 right-4 md:bottom-8 md:right-10 bg-black/60 rounded-full px-3 md:px-4 py-2 flex items-center gap-3 md:gap-4 z-10 no-print">
            <button onClick={() => setZoom((z) => Math.max(50, z - 10))} className="text-white"><Minus className="w-4 h-4 md:w-5 md:h-5" /></button>
            <span className="text-white text-xs md:text-sm w-10 md:w-12 text-center">{zoom}%</span>
            <button onClick={() => setZoom((z) => Math.min(200, z + 10))} className="text-white"><Plus className="w-4 h-4 md:w-5 md:h-5" /></button>
          </div>

          <div
            ref={documentRef}
            className="print-safe-area w-full flex flex-col items-center relative"
          >
            {/* INVISIBLE OVERLAY TO BLOCK DIRECT EDITS ON THE DOCUMENT WHEN LOCKED */}
            {isLocked && <div className="absolute inset-0 z-50 bg-transparent cursor-not-allowed" title="Document is locked."  >  </div>  }
                <div
              ref={docInnerRef}
              className={`flex flex-col gap-10 transform-container ${isLocked ? 'opacity-90' : ''}`}
              style={{
                width: `${DOCUMENT_WIDTH}px`,
                transform: `scale(${effectiveScale})`,
                transformOrigin: 'top center',
                marginBottom: `-${heightCompensation}px`,
              }}
            >
              {renderDocument()}
            </div>  
            {/* <div
              ref={docInnerRef}
              className={`flex flex-col gap-10 transform-container ${isLocked ? 'opacity-90' : ''}`}
              style={{
                width: `${DOCUMENT_WIDTH}px`,
                transform: `scale(${effectiveScale})`,
                transformOrigin: 'top center',
                marginBottom: `-${heightCompensation}px`,
              }}
            >
              {renderDocument()}
            </div> */}
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