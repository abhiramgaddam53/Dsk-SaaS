'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { Minus, Plus, Printer, Save, FileText, Download } from 'lucide-react';
import { useDocumentEditor } from '@/app/lib/useDocumentEditor';
import BuildingPermitSidebar from '@/app/(Drafter)/components/sidebar/BuildingPermitSidebar';
import BuildingPermitDoc from '@/app/(Drafter)/components/document/BuildingPermitDoc';
import BuildingValuationDoc from '@/app/(Drafter)/components/document/BuildingValuationDoc';
import BuildingValuationSidebar from '@/app/(Drafter)/components/sidebar/BuildingValuationSidebar';

const DOCUMENT_WIDTH = 794; // A4 width in px at 96dpi

export default function DocumentEditorPage() {
  const [loadingAction, setLoadingAction] = useState<string | null>(null);

  // Track preview container width for mobile auto-scaling
  const previewContainerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState<number>(DOCUMENT_WIDTH);
  const [sitePhotos, setSitePhotos] = useState<{ url: string; name: string }[]>([]);
  const [mapPhotos, setMapPhotos] = useState<{ url: string; label: string }[]>([]);
  
  const [docRenderedHeight, setDocRenderedHeight] = useState<number>(0);
  const docHeightObserverRef = useRef<ResizeObserver | null>(null);

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

  const {
    zoom, setZoom,
    selectedTemplate,
    editMode, setEditMode,
    documentRef,
    formData, handleChange,
    handleSubmitToBackend,
  } = useDocumentEditor();

  const handleExport = useReactToPrint({
    contentRef: documentRef,
    documentTitle: `${selectedTemplate}_${formData.fileNo}`,
  });

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

  const renderSidebar = () => {
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

  return (
    // Fixed screen height layout to lock the side panels in place
    <div className="flex flex-col h-screen bg-gray-50 font-sans overflow-hidden">

      {/* ── Top Header ─────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between gap-3 border-b border-gray-200 py-3 md:py-4 bg-white px-4 md:px-6 shrink-0 no-print z-20 shadow-sm relative">
        <div>
          <h1 className="text-lg md:text-xl font-bold text-gray-900">Document Title Goes Here</h1>
          <div className="flex items-center gap-3 mt-1 md:mt-1.5">
            <span className="px-2 py-0.5 rounded text-[9px] md:text-[10px] font-bold tracking-wide uppercase bg-green-50 text-green-600 border border-green-200">
              Ready for Review
            </span>
            <span className="text-[11px] md:text-xs font-medium text-gray-400">DSK-47593820</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2 md:gap-5 text-gray-600">
          <button 
            onClick={() => handleAction('export', async () => handleExport())}
            disabled={loadingAction === 'export'}
            className="hover:text-gray-900 transition-colors p-2 cursor-pointer disabled:opacity-50"
          >
            <Printer size={20} strokeWidth={2} className="md:w-[22px] md:h-[22px]" />
          </button>
          <button 
            onClick={() => handleAction('save', handleSubmitToBackend)}
            disabled={loadingAction === 'save'}
            className="hover:text-gray-900 transition-colors p-2 cursor-pointer disabled:opacity-50"
          >
            <Save size={20} strokeWidth={2} className="md:w-[22px] md:h-[22px]" />
          </button>
        </div>
      </div>

      {/* ── Main Content Split ─────────────────────────────────────────── */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* LEFT COLUMN: Sidebar Input + Fixed Summary */}
        <div className="hidden md:flex w-[320px] shrink-0 flex-col bg-white border-r border-gray-200 z-10 relative">
          
          {/* Scrollable Input Editor */}
          <div className="p-4 border-b border-gray-100 shrink-0">
            <span className="text-[13px] font-semibold text-[#00a0ef]">Document Input</span>
          </div>
          <div className="flex-1 overflow-y-auto">
            {renderSidebar()}
          </div>

          {/* Fixed Summary Bottom Area (Never scrolls away) */}
          <div className="shrink-0 bg-gray-50/50 border-t border-gray-200 p-5">
            <h3 className="font-bold text-gray-900 mb-4 text-sm">Summary</h3>
            <div className="space-y-4">
              <div>
                <p className="text-gray-400 text-[10px] font-bold mb-0.5 uppercase tracking-wider">Type</p>
                <p className="font-semibold text-gray-800 text-xs">Valuation Report</p>
              </div>
              <div>
                <p className="text-gray-400 text-[10px] font-bold mb-0.5 uppercase tracking-wider">Submitted</p>
                <p className="font-semibold text-gray-800 text-xs">Oct 12, 2026</p>
              </div>
              <div>
                <p className="text-gray-400 text-[10px] font-bold mb-0.5 uppercase tracking-wider">Review Timeline</p>
                <p className="font-semibold text-orange-500 text-xs">42 Days in Review</p>
              </div>
              <div>
                <p className="text-gray-400 text-[10px] font-bold mb-0.5 uppercase tracking-wider">Corresponding Drafter</p>
                <p className="font-semibold text-gray-800 text-xs">Pradhyumn Dhondi</p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Document + Activity (Single Scrollable Area) */}
        <div className="flex-1 min-w-0 bg-[#e4f3fc] overflow-y-auto relative flex flex-col">
          
          {/* Zoom Controls fixed over the document area so they don't scroll away */}
          <div className="fixed bottom-6 right-6 md:right-10 bg-black/60 rounded-full px-3 py-1.5 flex items-center gap-3 z-20 no-print shadow-lg">
            <button onClick={() => setZoom((z) => Math.max(50, z - 10))} className="text-white hover:text-gray-200 transition-colors">
              <Minus className="w-4 h-4" />
            </button>
            <span className="text-white text-xs font-medium w-10 text-center">{zoom}%</span>
            <button onClick={() => setZoom((z) => Math.min(200, z + 10))} className="text-white hover:text-gray-200 transition-colors">
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Top Half: Document Preview */}
          <div ref={previewContainerRef} className="w-full py-8 flex flex-col items-center shrink-0 min-h-[75vh]">
            <div ref={documentRef} className="print-safe-area w-full flex flex-col items-center">
              <div
                ref={docInnerRef}
                className="flex flex-col gap-10 transform-container bg-white shadow-sm"
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

          {/* Bottom Half: Report Files & Recent Activity */}
          <div className="shrink-0 bg-white border-t border-gray-200 shadow-[0_-4px_6px_-4px_rgba(0,0,0,0.05)]">
            <div className="max-w-5xl mx-auto w-full p-6 lg:p-8 space-y-8">
              
              {/* Report Files */}
              <div>
                <h3 className="font-bold text-gray-900 mb-4 text-sm">Report Files</h3>
                <div className="space-y-3">
                  {[
                    { name: 'Land Document', size: '4.2 MB' },
                    { name: 'Lease Deed', size: '4.2 MB' },
                    { name: 'File Name', size: '4.2 MB' },
                  ].map((file, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 border border-gray-100 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded bg-red-50 flex items-center justify-center border border-red-100 shrink-0">
                          <span className="text-[9px] font-bold text-red-600">PDF</span>
                        </div>
                        <div>
                          <p className="text-[13px] font-semibold text-gray-800">{file.name}</p>
                          <p className="text-[11px] text-gray-500 font-medium">{file.size}</p>
                        </div>
                      </div>
                      <button className="p-2 text-gray-400 hover:text-gray-700 transition-colors">
                        <Download size={18} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Activity */}
              <div>
                <h3 className="font-bold text-gray-900 mb-4 text-sm">Recent Activity</h3>
                
                {/* Radio Selection */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
                  <label className="flex items-start gap-3 p-4 border-2 border-[#1B65D5] rounded-xl cursor-pointer bg-blue-50/20">
                    <div className="flex items-center justify-center w-4 h-4 rounded-full border-[5px] border-[#1B65D5] shrink-0 mt-0.5"></div>
                    <div>
                      <p className="text-[11px] font-medium text-gray-500 mb-0.5">Accept</p>
                      <p className="font-bold text-gray-900 text-[13px]">Direct Approval</p>
                    </div>
                  </label>
                  <label className="flex items-start gap-3 p-4 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-center w-4 h-4 rounded-full border-2 border-gray-300 shrink-0 mt-0.5"></div>
                    <div>
                      <p className="text-[11px] font-medium text-gray-500 mb-0.5">On Hold</p>
                      <p className="font-bold text-gray-900 text-[13px]">Hold Report</p>
                    </div>
                  </label>
                </div>

                {/* Notes */}
                <div className="mb-5">
                  <label className="block text-[13px] font-bold text-gray-800 mb-2">Internal Notes (Private)</label>
                  <textarea 
                    rows={4} 
                    placeholder="Add notes for other editors..."
                    className="w-full p-4 border border-gray-200 rounded-xl text-[13px] focus:outline-none focus:ring-2 focus:ring-blue-500/30 resize-none text-gray-700"
                  ></textarea>
                </div>

                {/* Notify Checkbox */}
                <div className="flex items-center gap-3 mb-6">
                  <input 
                    type="checkbox" 
                    id="notify-team"
                    className="w-4 h-4 rounded border-gray-300 text-[#1B65D5] focus:ring-[#1B65D5] cursor-pointer" 
                  />
                  <label htmlFor="notify-team" className="text-[13px] font-medium text-gray-700 cursor-pointer">
                    Notify Team Member via Notification
                  </label>
                </div>

                {/* Submit */}
                <button className="w-full py-3.5 bg-[#1B65D5] text-white text-[13px] font-semibold rounded-xl hover:bg-blue-700 transition-colors shadow-sm">
                  Send Decision
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* ── Print / PDF styles ─────────────────────────────────────────────── */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @media print {
            @page { margin: 0; size: A4 portrait; }
            body { -webkit-print-color-adjust: exact; print-color-adjust: exact; background: white !important; }
            .transform-container { transform: none !important; width: 100% !important; margin: 0 !important; gap: 0 !important; }
            .a4-page { width: 210mm !important; height: 297mm !important; margin: 0 !important; padding: 15mm 20mm !important; box-shadow: none !important; page-break-after: always !important; }
            .no-print { display: none !important; }
          }
        `
      }} />
    </div>
  );
}