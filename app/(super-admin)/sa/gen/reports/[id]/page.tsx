 
//   'use client';

// import React, { useState, useEffect, useRef } from 'react';
// import { useParams, useRouter } from 'next/navigation';
// import { useReactToPrint } from 'react-to-print';
// import { Minus, Plus, Printer, Save, FileText, Download, Loader2, Lock } from 'lucide-react';
// import { useDocumentEditor } from '@/app/lib/useDocumentEditor';
// import BuildingPermitSidebar from '@/app/(Drafter)/components/sidebar/BuildingPermitSidebar';
// import BuildingPermitDoc from '@/app/(Drafter)/components/document/BuildingPermitDoc';
// import BuildingValuationDoc from '@/app/(Drafter)/components/document/BuildingValuationDoc';
// import BuildingValuationSidebar from '@/app/(Drafter)/components/sidebar/BuildingValuationSidebar';
// import { api } from '@/app/lib/userApis';

// const DOCUMENT_WIDTH = 794; // A4 width in px at 96dpi

// export default function DocumentEditorPage() {
//   const params = useParams();
//   const router = useRouter();
//   const recordId = params.id as string;

//   const [initialRecord, setInitialRecord] = useState<any>(null);
//   const [isFetchingData, setIsFetchingData] = useState(true);
//   const [loadingAction, setLoadingAction] = useState<string | null>(null);

//   // --- Validator Action State ---
//   const [decision, setDecision] = useState<'accept' | 'hold'>('accept');
//   const [internalNotes, setInternalNotes] = useState('');
//   const [notifyTeam, setNotifyTeam] = useState(false);
//   const [isSubmittingDecision, setIsSubmittingDecision] = useState(false);

//   const previewContainerRef = useRef<HTMLDivElement>(null);
//   const [containerWidth, setContainerWidth] = useState<number>(DOCUMENT_WIDTH);

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

//   const {
//     zoom, setZoom,
//     selectedTemplate,
//     editMode,
//     documentRef,
//     formData, handleChange,
//     sitePhotos, setSitePhotos,
//     mapPhotos, setMapPhotos,
//     handleSubmitToBackend
//   } = useDocumentEditor(initialRecord, recordId);

//   const handleAction = async (actionName: string, actionFn: () => Promise<void>) => {
//     try {
//       setLoadingAction(actionName);
//       await actionFn();
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setLoadingAction(null);
//     }
//   };

//   const handleSendDecision = async () => {
//     if (!recordId) return;
//     setIsSubmittingDecision(true);

//     const finalPayload = {
//       ...formData,
//       sitePhotos,
//       mapPhotos
//     };

//     try {
//       await api.submitValidatorDecision(recordId, {
//         decision,
//         notes: internalNotes,
//         notifyTeam,
//         draftData: finalPayload
//       });
//       alert(`Decision (${decision}) submitted successfully!`);
//       setInitialRecord((prev: any) => ({
//         ...prev,
//         status: decision === 'accept' ? 'approved' : 'revision_requested',
//         draftData: finalPayload
//       }));
//     } catch (error) {
//       console.error(error);
//       alert('Failed to submit decision.');
//     } finally {
//       setIsSubmittingDecision(false);
//     }
//   };

//   const handleExport = useReactToPrint({
//     contentRef: documentRef,
//     documentTitle: `${selectedTemplate}_${formData.fileNo || 'Report'}`,
//   });

//   // ── Scaling: use CSS zoom (not transform) so the box's real layout size
//   // shrinks/grows with it. This keeps centering correct at every zoom level,
//   // instead of relying on transform: scale() which only changes appearance
//   // and leaves the layout box at full size, causing off-center clipping.
//   const availableWidth = containerWidth - 48; // 24px padding each side
//   const fitScale = Math.min(1, availableWidth / DOCUMENT_WIDTH);
//   const effectiveScale = (zoom / 100) * fitScale;

//   const isLocked = isSubmittingDecision || initialRecord?.status === 'approved' || initialRecord?.status === 'revis ion_r equested';

//   const extractFileName = (url: string) => {
//     try {
//       const decoded = decodeURIComponent(url.split('?')[0]);
//       const fullFileName = decoded.split('/').pop() || 'Document';
//       const parts = fullFileName.split('_');
//       if (parts.length > 1 && !isNaN(Number(parts[0]))) {
//         return parts.slice(1).join('_');
//       }
//       return fullFileName;
//     } catch (e) {
//       return 'Document';
//     }
//   };

//   const renderSidebar = ( locked? :boolean ) => {
//     switch (selectedTemplate) {
//       case 'provisional_building':
//         return <BuildingPermitSidebar formData={formData} handleChange={handleChange} />;
//       case 'building_valuation':
//         return <BuildingValuationSidebar formData={formData as any} handleChange={handleChange} sitePhotos={sitePhotos} onSitePhotosChange={setSitePhotos} mapPhotos={mapPhotos} onMapPhotosChange={setMapPhotos} locked ={locked} />;
//       default:
//         return <div className="p-10 text-center text-sm font-medium text-gray-400">Template input coming soon</div>;
//     }
//   };

//   const renderDocument = () => {
//     switch (selectedTemplate) {
//       case 'provisional_building':
//         return <BuildingPermitDoc formData={formData} handleChange={handleChange} editMode={editMode} />;
//       case 'building_valuation':
//         return <BuildingValuationDoc formData={formData as any} handleChange={handleChange} editMode={editMode} sitePhotos={sitePhotos} mapPhotos={mapPhotos} />;
//       default:
//         return (
//           <div className="flex items-center justify-center h-[800px] w-full bg-white shadow-sm border border-dashed border-gray-300">
//             <div className="text-center">
//               <FileText className="w-16 h-16 mx-auto mb-4 text-[#00a0ef] opacity-50" />
//               <h2 className="text-xl font-semibold tracking-wide text-gray-500">Document template coming soon</h2>
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

//       {/* ── Top Header ─────────────────────────────────────────────────── */}
//       <div className="flex items-center justify-between gap-3 border-b border-gray-200 py-3 md:py-4 bg-white px-4 md:px-6 shrink-0 no-print z-20 shadow-sm relative">
//         <div>
//           <h1 className="text-lg md:text-xl font-bold text-gray-900">{initialRecord?.clientBank?.bankName || 'Valuation'} - {initialRecord?.owner?.ownerName || 'Report'}</h1>
//           <div className="flex items-center gap-3 mt-1 md:mt-1.5">
//             <span className={`px-2 py-0.5 rounded text-[9px] md:text-[10px] font-bold tracking-wide uppercase ${isLocked ? 'bg-gray-100 text-gray-600 border-gray-200' : 'bg-green-50 text-green-600 border border-green-200'}`}>
//               {isLocked ? (initialRecord?.status === 'approved' ? 'Approved' : 'Revision Requested') : 'Ready for Review'}
//             </span>
//             {recordId && (
//               <span className="text-[11px] md:text-xs font-medium text-gray-400">ID: {recordId.substring(0, 8).toUpperCase()}</span>
//             )}
//           </div>
//         </div>

//         <div className="flex items-center gap-2 md:gap-5 text-gray-600">
//           <button
//             onClick={() => handleAction('export', async () => handleExport())}
//             disabled={loadingAction === 'export'}
//             className="hover:text-gray-900 transition-colors p-2 cursor-pointer disabled:opacity-50"
//             title="Export to PDF"
//           >
//             <Printer size={20} strokeWidth={2} className="md:w-[22px] md:h-[22px]" />
//           </button>
//           {!isLocked && (
//             <button
//               onClick={() => handleAction('save', handleSubmitToBackend)}
//               disabled={loadingAction === 'save'}
//               className="hover:text-gray-900 transition-colors p-2 cursor-pointer disabled:opacity-50"
//               title="Save Progress (Without Decision)"
//             >
//               <Save size={20} strokeWidth={2} className="md:w-[22px] md:h-[22px]" />
//             </button>
//           )}
//         </div>
//       </div>

//       {/* ── 3-Column Layout ────────────────────────────────────────────── */}
//       <div className="flex flex-1 overflow-hidden min-h-0 w-full">

//         {/* COLUMN 1: LEFT SIDEBAR (Inputs) */}
//         <div className="hidden md:flex w-[260px] lg:w-[280px] shrink-0 flex-col bg-white border-r border-gray-200 z-10">
//           <div className="p-4 border-b border-gray-100 shrink-0 bg-gray-50/50">
//             <span className="text-[13px] font-bold tracking-wide text-gray-600 uppercase">Input Fields</span>
//           </div>
//           <div className="flex-1 overflow-y-auto min-h-0 relative">
//             {isLocked &&  renderSidebar(true)}
//             {!isLocked && renderSidebar( )}
//           </div>
//         </div>

//         {/* COLUMN 2: CENTER DOCUMENT PREVIEW */}
//         <div className="flex-1 flex flex-col min-w-0 bg-[#e4f3fc] relative overflow-hidden">

//           <div className="absolute bottom-6 right-6 z-20 bg-black/60 rounded-full px-3 py-1.5 flex items-center gap-3 no-print shadow-lg backdrop-blur-sm">
//             <button onClick={() => setZoom((z) => Math.max(50, z - 10))} className="text-white hover:text-gray-200 transition-colors">
//               <Minus className="w-4 h-4" />
//             </button>
//             <span className="text-white text-xs font-medium w-10 text-center">{zoom}%</span>
//             <button onClick={() => setZoom((z) => Math.min(200, z + 10))} className="text-white hover:text-gray-200 transition-colors">
//               <Plus className="w-4 h-4" />
//             </button>
//           </div>

//           <div ref={previewContainerRef} className="flex-1 overflow-auto w-full p-4 md:p-8 flex justify-center">
//             <div ref={documentRef} className="print-safe-area relative mt-2">
//               {isLocked && <div className="absolute inset-0 z-50 bg-transparent cursor-not-allowed" />}
//               <div
//                 className={`flex flex-col transform-container bg-white shadow-xl ring-1 ring-gray-900/5 ${isLocked ? 'opacity-90' : ''}`}
//                 style={{
//                   width: `${DOCUMENT_WIDTH}px`,
//                   minHeight: `${DOCUMENT_WIDTH * 1.414}px`,
//                   zoom: effectiveScale,
//                 }}
//               >
//                 {renderDocument()}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* COLUMN 3: RIGHT REPORT SECTION (Actions) */}
//         <div className="hidden lg:flex w-[200px] xl:w-[220px] shrink-0 flex-col bg-white border-l border-gray-200 shadow-[-4px_0_15px_-3px_rgba(0,0,0,0.05)] z-10">
//           <div className="p-4 border-b border-gray-100 shrink-0 bg-gray-50/50">
//             <span className="text-[13px] font-medium tracking-wide text-gray-600 uppercase">Report Actions</span>
//           </div>

//           <div className="flex-1 overflow-y-auto p-5 xl:p-6 space-y-8">
//             {/* Report Files */}
//             <div>
//               <h3 className="font-medium text-gray-900 mb-4 text-sm flex items-center justify-between">
//                 Report Files
//                 <span className="bg-gray-100 text-gray-500 text-[10px] px-2 py-0.5 rounded-full">{initialRecord?.uploads?.documents?.length || 0} Files</span>
//               </h3>
//               <div className="space-y-3">
//                 {initialRecord?.uploads?.documents?.length > 0 ? (
//                   initialRecord.uploads.documents.map((docUrl: string, idx: number) => {
//                     const fileName = extractFileName(docUrl);
//                     return (
//                       <a key={idx} href={docUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-3 border border-gray-200 rounded-xl bg-gray-50/50 hover:bg-gray-50 hover:border-blue-200 transition-colors group cursor-pointer">
//                         <div className="flex items-center gap-3 overflow-hidden">
//                           <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center border border-blue-100 shrink-0">
//                             <span className="text-[9px] font-bold text-blue-600">FILE</span>
//                           </div>
//                           <div className="min-w-0">
//                             <p className="text-[13px] font-semibold text-gray-800 truncate">{fileName}</p>
//                           </div>
//                         </div>
//                         <button className="p-2 text-gray-400 group-hover:text-blue-600 transition-colors bg-white rounded-md border border-gray-100 shadow-sm shrink-0">
//                           <Download size={16} />
//                         </button>
//                       </a>
//                     );
//                   })
//                 ) : (
//                   <p className="text-[12px] text-gray-400 italic">No files uploaded by Site Visitor.</p>
//                 )}
//               </div>
//             </div>

//             <div className="w-full h-px bg-gray-100"></div>

//             {/* Action Required */}
//             <div>
//               <h3 className="font-medium text-gray-900 mb-4 text-sm">Action Required</h3>

//               {isLocked ? (
//                 <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl flex flex-col items-center justify-center text-center gap-2">
//                   <Lock className="w-8 h-8 text-gray-400" />
//                   <p className="text-[13px] font-medium text-gray-800">Decision Submitted</p>
//                   <p className="text-[11px] text-gray-500">This report has already been processed and is locked.</p>
//                 </div>
//               ) : (
//                 <>
//                   <div className="grid grid-cols-1 gap-3 mb-5">
//                     {/* Accept Radio */}
//                     <label className={`flex items-start gap-3 p-4 border-2 rounded-xl cursor-pointer transition-colors ${decision === 'accept' ? 'border-[#1B65D5] bg-blue-50/10' : 'border-gray-200 hover:bg-gray-50'}`}>
//                       <input
//                         type="radio"
//                         name="decision"
//                         value="accept"
//                         checked={decision === 'accept'}
//                         onChange={() => setDecision('accept')}
//                         className="w-4 h-4 mt-0.5 text-[#1B65D5] focus:ring-[#1B65D5] border-gray-300 cursor-pointer"
//                       />
//                       <div>
//                         <p className={`text-[11px] font-medium uppercase tracking-wide mb-0.5 ${decision === 'accept' ? 'text-blue-600' : 'text-gray-500'}`}>Accept</p>
//                         <p className="font-medium text-gray-900 text-[13px]">Direct Approval</p>
//                       </div>
//                     </label>

//                     {/* On Hold Radio */}
//                     <label className={`flex items-start gap-3 p-4 border-2 rounded-xl cursor-pointer transition-colors ${decision === 'hold' ? 'border-orange-500 bg-orange-50/10' : 'border-gray-200 hover:bg-gray-50'}`}>
//                       <input
//                         type="radio"
//                         name="decision"
//                         value="hold"
//                         checked={decision === 'hold'}
//                         onChange={() => setDecision('hold')}
//                         className="w-4 h-4 mt-0.5 text-orange-500 focus:ring-orange-500 border-gray-300 cursor-pointer"
//                       />
//                       <div>
//                         <p className={`text-[11px] font-medium uppercase tracking-wide mb-0.5 ${decision === 'hold' ? 'text-orange-600' : 'text-gray-500'}`}>On Hold</p>
//                         <p className="font-medium text-gray-900 text-[13px]">Request Revision</p>
//                       </div>
//                     </label>
//                   </div>

//                   <div className="mb-5">
//                     <label className="block text-[12px] font-medium text-gray-800 mb-2">Internal Notes (Private)</label>
//                     <textarea
//                       rows={4}
//                       value={internalNotes}
//                       onChange={(e) => setInternalNotes(e.target.value)}
//                       placeholder={decision === 'hold' ? "Explain what needs to be revised..." : "Add notes for other editors..."}
//                       className={`w-full p-4 border rounded-xl text-[13px] font-medium focus:outline-none focus:ring-2 resize-none text-gray-700 bg-gray-50/50 ${decision === 'hold' ? 'border-orange-200 focus:ring-orange-500/30 focus:border-orange-500' : 'border-gray-200 focus:ring-[#1B65D5]/30 focus:border-[#1B65D5]'}`}
//                     ></textarea>
//                   </div>

//                   <div className="flex items-center gap-3 mb-6 bg-gray-50 p-3 rounded-lg border border-gray-100">
//                     <input
//                       type="checkbox"
//                       id="notify-team"
//                       checked={notifyTeam}
//                       onChange={(e) => setNotifyTeam(e.target.checked)}
//                       className="w-4 h-4 rounded border-gray-300 text-[#1B65D5] focus:ring-[#1B65D5] cursor-pointer"
//                     />
//                     <label htmlFor="notify-team" className="text-[12px] font-medium text-gray-700 cursor-pointer">
//                       Notify Team Member via Notification
//                     </label>
//                   </div>

//                   <button
//                     onClick={handleSendDecision}
//                     disabled={isSubmittingDecision}
//                     className={`w-full py-3.5 text-white text-[13px] font-medium tracking-wide rounded-xl transition-all shadow-[0_4px_14px_rgba(0,0,0,0.1)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)] ${isSubmittingDecision ? 'bg-gray-400 cursor-not-allowed' : decision === 'accept' ? 'bg-[#1B65D5] hover:bg-blue-700' : 'bg-orange-500 hover:bg-orange-600'}`}
//                   >
//                     {isSubmittingDecision ? 'Submitting...' : decision === 'accept' ? 'Approve Report' : 'Send Back for Revision'}
//                   </button>
//                 </>
//               )}
//             </div>
//           </div>
//         </div>

//       </div>

//       <style dangerouslySetInnerHTML={{
//         __html: `
//           @media print {
//             @page { margin: 0; size: A4 portrait; }
//             body { -webkit-print-color-adjust: exact; print-color-adjust: exact; background: white !important; }
//             .transform-container { transform: none !important; zoom: 1 !important; width: 100% !important; margin: 0 !important; gap: 0 !important; min-height: auto !important; box-shadow: none !important; }
//             .a4-page { width: 210mm !important; height: 297mm !important; margin: 0 !important; padding: 15mm 20mm !important; box-shadow: none !important; page-break-after: always !important; }
//             .no-print { display: none !important; }
//           }
//         `
//       }} />
//     </div>
//   );
// }

'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useReactToPrint } from 'react-to-print';
import { Minus, Plus, Printer, Save, FileText, Download, Loader2, Lock, AlertCircle } from 'lucide-react';
import { useDocumentEditor } from '@/app/lib/useDocumentEditor';
import BuildingPermitSidebar from '@/app/(Drafter)/components/sidebar/BuildingPermitSidebar';
import BuildingPermitDoc from '@/app/(Drafter)/components/document/BuildingPermitDoc';
import BuildingValuationDoc from '@/app/(Drafter)/components/document/BuildingValuationDoc';
import BuildingValuationSidebar from '@/app/(Drafter)/components/sidebar/BuildingValuationSidebar';
import { api } from '@/app/lib/userApis';

const DOCUMENT_WIDTH = 794; // A4 width in px at 96dpi

export default function DocumentEditorPage() {
  const params = useParams();
  const router = useRouter();
  const recordId = params.id as string;

  const [initialRecord, setInitialRecord] = useState<any>(null);
  const [isFetchingData, setIsFetchingData] = useState(true);
  const [loadingAction, setLoadingAction] = useState<string | null>(null);

  // --- Validator Action State ---
  const [decision, setDecision] = useState<'accept' | 'hold'>('accept');
  const [internalNotes, setInternalNotes] = useState('');
  const [notifyTeam, setNotifyTeam] = useState(false);
  const [isSubmittingDecision, setIsSubmittingDecision] = useState(false);

  const previewContainerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState<number>(DOCUMENT_WIDTH);

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

  const {
    zoom, setZoom,
    selectedTemplate,
    editMode,
    documentRef,
    formData, handleChange,
    sitePhotos, setSitePhotos,
    mapPhotos, setMapPhotos,
    handleSubmitToBackend
  } = useDocumentEditor(initialRecord, recordId);

  const handleAction = async (actionName: string, actionFn: () => Promise<void>) => {
    try {
      setLoadingAction(actionName);
      await actionFn();
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingAction(null);
    }
  };

  const handleSendDecision = async () => {
    if (!recordId) return;
    setIsSubmittingDecision(true);

    const finalPayload = {
      ...formData,
      sitePhotos,
      mapPhotos
    };

    try {
      await api.submitValidatorDecision(recordId, {
        decision,
        notes: internalNotes,
        notifyTeam,
        draftData: finalPayload
      });
      alert(`Decision (${decision}) submitted successfully!`);
      setInitialRecord((prev: any) => ({
        ...prev,
        status: decision === 'accept' ? 'approved' : 'revision_requested',
        draftData: finalPayload
      }));
    } catch (error) {
      console.error(error);
      alert('Failed to submit decision.');
    } finally {
      setIsSubmittingDecision(false);
    }
  };

  const handleExport = useReactToPrint({
    contentRef: documentRef,
    documentTitle: `${selectedTemplate}_${formData.fileNo || 'Report'}`,
  });

  // ── Scaling: use CSS zoom (not transform) so the box's real layout size
  // shrinks/grows with it. This keeps centering correct at every zoom level,
  // instead of relying on transform: scale() which only changes appearance
  // and leaves the layout box at full size, causing off-center clipping.
  const availableWidth = containerWidth - 48; // 24px padding each side
  const fitScale = Math.min(1, availableWidth / DOCUMENT_WIDTH);
  const effectiveScale = (zoom / 100) * fitScale;

  // Only "approved" (or an in-flight submission) actually locks the document.
  // "revision_requested" stays fully editable — the validator can review and
  // change their decision at any time.
  const isLocked = isSubmittingDecision || initialRecord?.status === 'approved';
  const isRevisionPending = initialRecord?.status === 'revision_requested';

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

  const renderSidebar = ( locked? :boolean ) => {
    switch (selectedTemplate) {
      case 'provisional_building':
        return <BuildingPermitSidebar formData={formData} handleChange={handleChange} />;
      case 'building_valuation':
        return <BuildingValuationSidebar formData={formData as any} handleChange={handleChange} sitePhotos={sitePhotos} onSitePhotosChange={setSitePhotos} mapPhotos={mapPhotos} onMapPhotosChange={setMapPhotos} locked ={locked} />;
      default:
        return <div className="p-10 text-center text-sm font-medium text-gray-400">Template input coming soon</div>;
    }
  };

  const renderDocument = () => {
    switch (selectedTemplate) {
      case 'provisional_building':
        return <BuildingPermitDoc formData={formData} handleChange={handleChange} editMode={editMode} />;
      case 'building_valuation':
        return <BuildingValuationDoc formData={formData as any} handleChange={handleChange} editMode={editMode} sitePhotos={sitePhotos} mapPhotos={mapPhotos} />;
      default:
        return (
          <div className="flex items-center justify-center h-[800px] w-full bg-white shadow-sm border border-dashed border-gray-300">
            <div className="text-center">
              <FileText className="w-16 h-16 mx-auto mb-4 text-[#00a0ef] opacity-50" />
              <h2 className="text-xl font-semibold tracking-wide text-gray-500">Document template coming soon</h2>
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

      {/* ── Top Header ─────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between gap-3 border-b border-gray-200 py-3 md:py-4 bg-white px-4 md:px-6 shrink-0 no-print z-20 shadow-sm relative">
        <div>
          <h1 className="text-lg md:text-xl font-bold text-gray-900">{initialRecord?.clientBank?.bankName || 'Valuation'} - {initialRecord?.owner?.ownerName || 'Report'}</h1>
          <div className="flex items-center gap-3 mt-1 md:mt-1.5">
            <span className={`px-2 py-0.5 rounded text-[9px] md:text-[10px] font-bold tracking-wide uppercase ${
              isLocked
                ? 'bg-gray-100 text-gray-600 border-gray-200'
                : isRevisionPending
                ? 'bg-orange-50 text-orange-600 border border-orange-200'
                : 'bg-green-50 text-green-600 border border-green-200'
            }`}>
              {isLocked ? 'Approved' : isRevisionPending ? 'Revision Requested' : 'Ready for Review'}
            </span>
            {recordId && (
              <span className="text-[11px] md:text-xs font-medium text-gray-400">ID: {recordId.substring(0, 8).toUpperCase()}</span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-5 text-gray-600">
          <button
            onClick={() => handleAction('export', async () => handleExport())}
            disabled={loadingAction === 'export'}
            className="hover:text-gray-900 transition-colors p-2 cursor-pointer disabled:opacity-50"
            title="Export to PDF"
          >
            <Printer size={20} strokeWidth={2} className="md:w-[22px] md:h-[22px]" />
          </button>
          {!isLocked && (
            <button
              onClick={() => handleAction('save', handleSubmitToBackend)}
              disabled={loadingAction === 'save'}
              className="hover:text-gray-900 transition-colors p-2 cursor-pointer disabled:opacity-50"
              title="Save Progress (Without Decision)"
            >
              <Save size={20} strokeWidth={2} className="md:w-[22px] md:h-[22px]" />
            </button>
          )}
        </div>
      </div>

      {/* ── 3-Column Layout ────────────────────────────────────────────── */}
      <div className="flex flex-1 overflow-hidden min-h-0 w-full">

        {/* COLUMN 1: LEFT SIDEBAR (Inputs) */}
        <div className="hidden md:flex w-[260px] lg:w-[280px] shrink-0 flex-col bg-white border-r border-gray-200 z-10">
          <div className="p-4 border-b border-gray-100 shrink-0 bg-gray-50/50">
            <span className="text-[13px] font-bold tracking-wide text-gray-600 uppercase">Input Fields</span>
          </div>
          <div className="flex-1 overflow-y-auto min-h-0 relative">
            {isLocked &&  renderSidebar(true)}
            {!isLocked && renderSidebar( )}
          </div>
        </div>

        {/* COLUMN 2: CENTER DOCUMENT PREVIEW */}
        <div className="flex-1 flex flex-col min-w-0 bg-[#e4f3fc] relative overflow-hidden">

          <div className="absolute bottom-6 right-6 z-20 bg-black/60 rounded-full px-3 py-1.5 flex items-center gap-3 no-print shadow-lg backdrop-blur-sm">
            <button onClick={() => setZoom((z) => Math.max(50, z - 10))} className="text-white hover:text-gray-200 transition-colors">
              <Minus className="w-4 h-4" />
            </button>
            <span className="text-white text-xs font-medium w-10 text-center">{zoom}%</span>
            <button onClick={() => setZoom((z) => Math.min(200, z + 10))} className="text-white hover:text-gray-200 transition-colors">
              <Plus className="w-4 h-4" />
            </button>
          </div>

          <div ref={previewContainerRef} className="flex-1 overflow-auto w-full p-4 md:p-8 flex justify-center">
            <div ref={documentRef} className="print-safe-area relative mt-2">
              {isLocked && <div className="absolute inset-0 z-50 bg-transparent cursor-not-allowed" />}
              <div
                className={`flex flex-col transform-container bg-white shadow-xl ring-1 ring-gray-900/5 ${isLocked ? 'opacity-90' : ''}`}
                style={{
                  width: `${DOCUMENT_WIDTH}px`,
                  minHeight: `${DOCUMENT_WIDTH * 1.414}px`,
                  zoom: effectiveScale,
                }}
              >
                {renderDocument()}
              </div>
            </div>
          </div>
        </div>

        {/* COLUMN 3: RIGHT REPORT SECTION (Actions) */}
        <div className="hidden lg:flex w-[200px] xl:w-[220px] shrink-0 flex-col bg-white border-l border-gray-200 shadow-[-4px_0_15px_-3px_rgba(0,0,0,0.05)] z-10">
          <div className="p-4 border-b border-gray-100 shrink-0 bg-gray-50/50">
            <span className="text-[13px] font-medium tracking-wide text-gray-600 uppercase">Report Actions</span>
          </div>

          <div className="flex-1 overflow-y-auto p-5 xl:p-6 space-y-8">
            {/* Report Files */}
            <div>
              <h3 className="font-medium text-gray-900 mb-4 text-sm flex items-center justify-between">
                Report Files
                <span className="bg-gray-100 text-gray-500 text-[10px] px-2 py-0.5 rounded-full">{initialRecord?.uploads?.documents?.length || 0} Files</span>
              </h3>
              <div className="space-y-3">
                {initialRecord?.uploads?.documents?.length > 0 ? (
                  initialRecord.uploads.documents.map((docUrl: string, idx: number) => {
                    const fileName = extractFileName(docUrl);
                    return (
                      <a key={idx} href={docUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-3 border border-gray-200 rounded-xl bg-gray-50/50 hover:bg-gray-50 hover:border-blue-200 transition-colors group cursor-pointer">
                        <div className="flex items-center gap-3 overflow-hidden">
                          <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center border border-blue-100 shrink-0">
                            <span className="text-[9px] font-bold text-blue-600">FILE</span>
                          </div>
                          <div className="min-w-0">
                            <p className="text-[13px] font-semibold text-gray-800 truncate">{fileName}</p>
                          </div>
                        </div>
                        <button className="p-2 text-gray-400 group-hover:text-blue-600 transition-colors bg-white rounded-md border border-gray-100 shadow-sm shrink-0">
                          <Download size={16} />
                        </button>
                      </a>
                    );
                  })
                ) : (
                  <p className="text-[12px] text-gray-400 italic">No files uploaded by Site Visitor.</p>
                )}
              </div>
            </div>

            <div className="w-full h-px bg-gray-100"></div>

            {/* Action Required */}
            <div>
              <h3 className="font-medium text-gray-900 mb-4 text-sm">Action Required</h3>

              {isLocked ? (
                <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl flex flex-col items-center justify-center text-center gap-2">
                  <Lock className="w-8 h-8 text-gray-400" />
                  <p className="text-[13px] font-medium text-gray-800">Decision Submitted</p>
                  <p className="text-[11px] text-gray-500">This report has already been processed and is locked.</p>
                </div>
              ) : (
                <>
                  {isRevisionPending && (
                    <div className="mb-4 p-3 bg-orange-50 border border-orange-200 rounded-xl flex items-start gap-2.5">
                      <AlertCircle className="w-4 h-4 text-orange-500 mt-0.5 shrink-0" />
                      <p className="text-[12px] text-orange-700 leading-snug">
                        A revision decision has already been submitted for this report. You can review and change it anytime.
                      </p>
                    </div>
                  )}

                  <div className="grid grid-cols-1 gap-3 mb-5">
                    {/* Accept Radio */}
                    <label className={`flex items-start gap-3 p-4 border-2 rounded-xl cursor-pointer transition-colors ${decision === 'accept' ? 'border-[#1B65D5] bg-blue-50/10' : 'border-gray-200 hover:bg-gray-50'}`}>
                      <input
                        type="radio"
                        name="decision"
                        value="accept"
                        checked={decision === 'accept'}
                        onChange={() => setDecision('accept')}
                        className="w-4 h-4 mt-0.5 text-[#1B65D5] focus:ring-[#1B65D5] border-gray-300 cursor-pointer"
                      />
                      <div>
                        <p className={`text-[11px] font-medium uppercase tracking-wide mb-0.5 ${decision === 'accept' ? 'text-blue-600' : 'text-gray-500'}`}>Accept</p>
                        <p className="font-medium text-gray-900 text-[13px]">Direct Approval</p>
                      </div>
                    </label>

                    {/* On Hold Radio */}
                    <label className={`flex items-start gap-3 p-4 border-2 rounded-xl cursor-pointer transition-colors ${decision === 'hold' ? 'border-orange-500 bg-orange-50/10' : 'border-gray-200 hover:bg-gray-50'}`}>
                      <input
                        type="radio"
                        name="decision"
                        value="hold"
                        checked={decision === 'hold'}
                        onChange={() => setDecision('hold')}
                        className="w-4 h-4 mt-0.5 text-orange-500 focus:ring-orange-500 border-gray-300 cursor-pointer"
                      />
                      <div>
                        <p className={`text-[11px] font-medium uppercase tracking-wide mb-0.5 ${decision === 'hold' ? 'text-orange-600' : 'text-gray-500'}`}>On Hold</p>
                        <p className="font-medium text-gray-900 text-[13px]">Request Revision</p>
                      </div>
                    </label>
                  </div>

                  <div className="mb-5">
                    <label className="block text-[12px] font-medium text-gray-800 mb-2">Internal Notes (Private)</label>
                    <textarea
                      rows={4}
                      value={internalNotes}
                      onChange={(e) => setInternalNotes(e.target.value)}
                      placeholder={decision === 'hold' ? "Explain what needs to be revised..." : "Add notes for other editors..."}
                      className={`w-full p-4 border rounded-xl text-[13px] font-medium focus:outline-none focus:ring-2 resize-none text-gray-700 bg-gray-50/50 ${decision === 'hold' ? 'border-orange-200 focus:ring-orange-500/30 focus:border-orange-500' : 'border-gray-200 focus:ring-[#1B65D5]/30 focus:border-[#1B65D5]'}`}
                    ></textarea>
                  </div>

                  <div className="flex items-center gap-3 mb-6 bg-gray-50 p-3 rounded-lg border border-gray-100">
                    <input
                      type="checkbox"
                      id="notify-team"
                      checked={notifyTeam}
                      onChange={(e) => setNotifyTeam(e.target.checked)}
                      className="w-4 h-4 rounded border-gray-300 text-[#1B65D5] focus:ring-[#1B65D5] cursor-pointer"
                    />
                    <label htmlFor="notify-team" className="text-[12px] font-medium text-gray-700 cursor-pointer">
                      Notify Team Member via Notification
                    </label>
                  </div>

                  <button
                    onClick={handleSendDecision}
                    disabled={isSubmittingDecision}
                    className={`w-full py-3.5 text-white text-[13px] font-medium tracking-wide rounded-xl transition-all shadow-[0_4px_14px_rgba(0,0,0,0.1)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)] ${isSubmittingDecision ? 'bg-gray-400 cursor-not-allowed' : decision === 'accept' ? 'bg-[#1B65D5] hover:bg-blue-700' : 'bg-orange-500 hover:bg-orange-600'}`}
                  >
                    {isSubmittingDecision ? 'Submitting...' : isRevisionPending ? 'Update Decision' : decision === 'accept' ? 'Approve Report' : 'Send Back for Revision'}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
          @media print {
            @page { margin: 0; size: A4 portrait; }
            body { -webkit-print-color-adjust: exact; print-color-adjust: exact; background: white !important; }
            .transform-container { transform: none !important; zoom: 1 !important; width: 100% !important; margin: 0 !important; gap: 0 !important; min-height: auto !important; box-shadow: none !important; }
            .a4-page { width: 210mm !important; height: 297mm !important; margin: 0 !important; padding: 15mm 20mm !important; box-shadow: none !important; page-break-after: always !important; }
            .no-print { display: none !important; }
          }
        `
      }} />
    </div>
  );
}