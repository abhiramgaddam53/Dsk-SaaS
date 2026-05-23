// 'use client';

// import React, { useState } from 'react';
// import Link from 'next/link';
// import { ChevronRight, History } from 'lucide-react';

// export default function DocumentEditorPage() {
//   // In a real app, you would fetch the document data and HTML content here.
//   const [docHtml, setDocHtml] = useState<string | null>(null); 

//   return (
//     <div className="flex flex-col h-full border-t border-gray-200 bg-white max-w-[1400px] mx-auto">
      
//       {/* Breadcrumbs */}
     
//       {/* Header Section */}
//       {/* Header Section */}
//       <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200  mb-6">
        
//         {/* Title & Subtitle */}
//         <div className="flex flex-col px-4 gap-1">
//           <h1 className="text-xl font-medium text-gray-900">
//             Document Name Goes Here
//           </h1>
//           <p className="text-[13px] text-gray-500">
//             Pradhyum Dhondi - Plot Valuation Report
//           </p>
//         </div>

//         {/* Action Buttons & Badges */}
//         {/* On mobile: flex-col (stacks vertically). On desktop: md:flex-row (aligns horizontally) */}
//         <div className="flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-4 mt-2 md:mr-4 md:mt-0">
          
//           <span className="px-3 py-1 text-[13px] font-medium text-[#2563EB] bg-[#C7DFFF] border border-[#d6effd] rounded-full">
//             In Progress
//           </span>
          
//           <button className="flex items-center gap-1.5 text-[14px] font-medium text-[#00a0ef] hover:underline underline-offset-2">
//             <History className="w-4 h-4 shrink-0" />
//             Version History
//           </button>
          
//           {/* Hidden on Mobile, Visible on Desktop */}
//           <button className="hidden md:block px-5 py-2 bg-[#00a0ef] hover:bg-[#008bd1] text-white text-[14px] font-medium rounded-lg shadow-sm transition-colors ml-1">
//             Save Changes
//           </button>
          
//         </div>
//       </div>

//       {/* Main Content Split */}
//       <div className="flex flex-col md:flex-row gap-8 flex-1 pb-8 min-h-0">
        
//         {/* Left Sidebar Form (Hidden on Mobile) */}
//         <div className="hidden px-4 md:flex flex-col w-[260px] shrink-0">
//           <div className="mb-6">
//             <label className="block text-[13px] font-bold text-gray-800 mb-2">
//               Maximum Active Assignments
//             </label>
//             <input 
//               type="number" 
//               defaultValue={12}
//               className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#00a0ef] focus:ring-1 focus:ring-[#00a0ef]"
//             />
//             <p className="text-[11px] text-gray-400 mt-2 leading-tight">
//               Maximum number of documents you can work on simultaneously
//             </p>
//           </div>

//           <div className="mb-6">
//             <label className="block text-[13px] font-bold text-gray-800 mb-2">
//               Maximum Word Count Per Day (Optional)
//             </label>
//             <input 
//               type="number" 
//               defaultValue={10000}
//               className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#00a0ef] focus:ring-1 focus:ring-[#00a0ef]"
//             />
//             <p className="text-[11px] text-gray-400 mt-2 leading-tight">
//               Leave empty for no daily word count limit
//             </p>
//           </div>

//           <button className="w-fit px-5 py-2 bg-[#00a0ef] hover:bg-[#008bd1] text-white text-sm font-semibold rounded-lg shadow-sm transition-colors">
//             Save Changes
//           </button>
//         </div>

//         {/* Right Area: Document Editor Container */}
//         <div className="flex-1 flex flex-col min-h-[500px]">
          
//           {/* DOCUMENT RENDERING AREA
//             - Replace the bg-[#00a0ef] with bg-white when injecting real HTML.
//             - You can use dangerouslySetInnerHTML to render the converted Word HTML. 
//           */}
//           <div className="flex-1 w-full bg-[#00a0ef] rounded-xl flex items-center justify-center shadow-sm relative overflow-y-auto">
//             {docHtml ? (
//               <div 
//                 className="w-full h-full bg-white p-8 prose max-w-none" 
//                 dangerouslySetInnerHTML={{ __html: docHtml }} 
//               />
//             ) : (
//               <span className="text-white font-semibold tracking-widest text-sm">
//                 DOCUMENT
//               </span>
//             )}
//           </div>

//           {/* Mobile Edit Notice */}
//           <p className="md:hidden text-center text-[12px] font-medium text-gray-600 mt-6 underline underline-offset-2">
//             Note: Open the file on desktop to make edits.
//           </p>

//         </div>

//       </div>
//     </div>
//   );
// }
'use client';

import React, { useState } from 'react';
import {
  ChevronRight,
  History,
  Minus,
  Plus,
  Pencil,
  Printer,
  Save,
  Eye,
  FileText,
  Image as ImageIcon,
  ChevronDown,
} from 'lucide-react';

// ─── Types ───────────────────────────────────────────────────────────────────

interface FieldRow {
  questionLabel: string;
  inputValue: string;
}

interface SubSection {
  id: string;
  title: string;
  fields: FieldRow[];
}

interface DocSection {
  id: string;
  title: string;
  subSections: SubSection[];
}

interface UploadedFile {
  name: string;
  size: string;
  type: 'pdf' | 'image';
}

// ─── Mock Data ────────────────────────────────────────────────────────────────

const TEMPLATE_OPTIONS = [
  { value: 'plot_valuation', label: 'Plot Valuation Report' },
  { value: 'building_valuation', label: 'Building Valuation Report' },
  { value: 'rental_report', label: 'Rental Value Report' },
  { value: 'mortgage_report', label: 'Mortgage Valuation Report' },
  { value: 'insurance_report', label: 'Insurance Report' },
];

const DOC_SECTIONS: DocSection[] = [
  {
    id: 'basic',
    title: 'Basic Details',
    subSections: [
      {
        id: 'input_details',
        title: 'Input Details',
        fields: [
          { questionLabel: 'Date Valuation', inputValue: '17/05/2026' },
          { questionLabel: 'Date of Inspection', inputValue: '17/05/2026' },
          { questionLabel: 'Type of Property', inputValue: 'Existing Building - R' },
          { questionLabel: 'Type of Loan', inputValue: 'Mortgage Loan' },
        ],
      },
      {
        id: 'applicant_details',
        title: 'Applicant Details',
        fields: [
          { questionLabel: 'Question ID', inputValue: 'Input ID' },
          { questionLabel: 'Question ID', inputValue: 'Input ID' },
          { questionLabel: 'Question ID', inputValue: 'Input ID' },
          { questionLabel: 'Question ID', inputValue: 'Input ID' },
          { questionLabel: 'Question ID', inputValue: 'Input ID' },
          { questionLabel: 'Question ID', inputValue: 'Input ID' },
        ],
      },
      {
        id: 'applicant_address',
        title: 'Applicant Address',
        fields: [
          { questionLabel: 'Question ID', inputValue: 'Input ID' },
          { questionLabel: 'Question ID', inputValue: 'Input ID' },
          { questionLabel: 'Question ID', inputValue: 'Input ID' },
          { questionLabel: 'Question ID', inputValue: 'Input ID' },
          { questionLabel: 'Question ID', inputValue: 'Input ID' },
          { questionLabel: 'Question ID', inputValue: 'Input ID' },
        ],
      },
      {
        id: 'bank_details',
        title: 'Bank Details',
        fields: [
          { questionLabel: 'Question ID', inputValue: 'Input ID' },
          { questionLabel: 'Question ID', inputValue: 'Input ID' },
          { questionLabel: 'Question ID', inputValue: 'Input ID' },
          { questionLabel: 'Question ID', inputValue: 'Input ID' },
        ],
      },
      {
        id: 'site_area',
        title: 'Site Area',
        fields: [
          { questionLabel: 'Question ID', inputValue: 'Input ID' },
          { questionLabel: 'Question ID', inputValue: 'Input ID' },
          { questionLabel: 'Question ID', inputValue: 'Input ID' },
          { questionLabel: 'Question ID', inputValue: 'Input ID' },
        ],
      },
      {
        id: 'plot_valuation',
        title: 'Plot Valuation',
        fields: [
          { questionLabel: 'Question ID', inputValue: 'Input ID' },
          { questionLabel: 'Question ID', inputValue: 'Input ID' },
          { questionLabel: 'Question ID', inputValue: 'Input ID' },
          { questionLabel: 'Question ID', inputValue: 'Input ID' },
        ],
      },
    ],
  },
  {
    id: 'vendor_property',
    title: 'Vendor, Property Details',
    subSections: [
      {
        id: 'intending_vendor',
        title: 'Intending Vendor',
        fields: [
          { questionLabel: 'Question ID', inputValue: 'Input ID' },
          { questionLabel: 'Question ID', inputValue: 'Input ID' },
          { questionLabel: 'Question ID', inputValue: 'Input ID' },
          { questionLabel: 'Question ID', inputValue: 'Input ID' },
        ],
      },
      {
        id: 'property_details',
        title: 'Property Details',
        fields: [
          { questionLabel: 'Question ID', inputValue: 'Input ID' },
          { questionLabel: 'Question ID', inputValue: 'Input ID' },
          { questionLabel: 'Question ID', inputValue: 'Input ID' },
          { questionLabel: 'Question ID', inputValue: 'Input ID' },
        ],
      },
      {
        id: 'boundary_details',
        title: 'Boundary Details',
        fields: [
          { questionLabel: 'Question ID', inputValue: 'Input ID' },
          { questionLabel: 'Question ID', inputValue: 'Input ID' },
          { questionLabel: 'Question ID', inputValue: 'Input ID' },
          { questionLabel: 'Question ID', inputValue: 'Input ID' },
        ],
      },
    ],
  },
];

const UPLOADED_FILES: UploadedFile[] = [
  { name: 'tax.pdf', size: '1.4 MB', type: 'pdf' },
  { name: 'building.permission.pdf', size: '1.4 MB', type: 'pdf' },
  { name: 'layout.pdf', size: '1.4 MB', type: 'pdf' },
  { name: 'legal.pdf', size: '1.4 MB', type: 'pdf' },
  { name: 'tax.pdf', size: '1.4 MB', type: 'pdf' },
];

const INSPECTION_FILES: UploadedFile[] = [
  { name: 'site_inspection.jpg', size: '1.6 MB', type: 'image' },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function SectionGroupHeader({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <div className="w-4 h-4 bg-[#00a0ef] rounded-[3px] shrink-0" />
      <span className="text-[13px] font-semibold text-gray-800">{title}</span>
    </div>
  );
}

function SubSectionBlock({ sub }: { sub: SubSection }) {
  const [editing, setEditing] = useState(false);
  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[12px] font-semibold text-gray-700">{sub.title}</span>
        <button
          onClick={() => setEditing(!editing)}
          className="text-gray-400 hover:text-[#00a0ef] transition-colors"
        >
          <Pencil className="w-3.5 h-3.5" />
        </button>
      </div>
      <div className="grid grid-cols-2 gap-x-3 gap-y-2">
        {sub.fields.map((f, i) => (
          <div key={i}>
            <p className="text-[10px] text-gray-400 leading-none mb-0.5">{f.questionLabel}</p>
            {editing ? (
              <input
                defaultValue={f.inputValue}
                className="w-full text-[11px] text-gray-700 border border-[#00a0ef] rounded px-1.5 py-0.5 focus:outline-none"
              />
            ) : (
              <p className="text-[12px] font-medium text-gray-800 leading-snug">{f.inputValue}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function FileItem({ file }: { file: UploadedFile }) {
  return (
    <div className="flex items-center justify-between bg-[#f0f8ff] border border-[#d0eafc] rounded-lg px-3 py-2 mb-2">
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 bg-[#00a0ef1a] rounded flex items-center justify-center">
          {file.type === 'pdf' ? (
            <FileText className="w-4 h-4 text-[#00a0ef]" />
          ) : (
            <ImageIcon className="w-4 h-4 text-[#00a0ef]" />
          )}
        </div>
        <div>
          <p className="text-[11px] font-medium text-gray-800 leading-none">{file.name}</p>
          <p className="text-[10px] text-gray-400 mt-0.5">{file.size}</p>
        </div>
      </div>
      <button className="text-gray-400 hover:text-[#00a0ef] transition-colors">
        <Eye className="w-4 h-4" />
      </button>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function DocumentEditorPage() {
  const [docHtml] = useState<string | null>(null);
  const [docInputOpen, setDocInputOpen] = useState(true);
  const [inspectionOpen, setInspectionOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState('plot_valuation');
  const [templateDropdownOpen, setTemplateDropdownOpen] = useState(false);

  const selectedTemplateLabel =
    TEMPLATE_OPTIONS.find((t) => t.value === selectedTemplate)?.label ?? 'Select Template';

  return (
    <div className="flex flex-col h-full border-t border-gray-200 bg-white max-w-[1400px] mx-auto">

      {/* ── Header ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-gray-200 py-3 mb-4">
        <div className="flex flex-col px-4 gap-0.5">
          <h1 className="text-xl font-semibold text-gray-900">Document Name Goes Here</h1>
          <p className="text-[13px] text-gray-500">
            Pradhyum Dhondi · Plot Valuation Report · DSK-ARM-283942
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-3 px-4 md:px-0 md:mr-4">
           {/* Template Type Dropdown */}
           <div className="mt-4 mb-4">
             
            <div className="relative">
              <button
                onClick={() => setTemplateDropdownOpen(!templateDropdownOpen)}
                className="w-full flex items-center justify-between px-3 py-2 border border-gray-200 rounded-lg text-[13px] text-gray-800 bg-white hover:border-[#00a0ef] focus:outline-none focus:border-[#00a0ef] focus:ring-1 focus:ring-[#00a0ef] transition-colors"
              >
                <span className="truncate">{selectedTemplateLabel}</span>
                <ChevronDown
                  className={`w-4 h-4 text-gray-400 shrink-0 transition-transform ${templateDropdownOpen ? 'rotate-180' : ''}`}
                />
              </button>
              {templateDropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-20 overflow-hidden">
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
          </div>

          <span className="px-3 py-1 text-[12px] font-semibold text-[#2563EB] bg-[#C7DFFF] rounded-full">
            In Progress
          </span>

          <button className="flex items-center gap-1.5 text-[13px] font-medium text-[#00a0ef] hover:underline underline-offset-2">
            <History className="w-4 h-4 shrink-0" />
            Version History
          </button>

          {/* Desktop action icons */}
          <div className="hidden md:flex items-center gap-2">
            <button className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <Printer className="w-4 h-4 text-gray-600" />
            </button>
            <button className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <Save className="w-4 h-4 text-gray-600" />
            </button>
            <button className="px-5 py-2 bg-[#00a0ef] hover:bg-[#008bd1] text-white text-[13px] font-semibold rounded-lg shadow-sm transition-colors">
              Next
            </button>
          </div>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="flex flex-col md:flex-row gap-6 flex-1 pb-8 min-h-0 px-4">

        {/* ── Left Sidebar ── */}
        <div className="md:w-[260px] shrink-0 flex flex-col gap-0 overflow-y-auto max-h-[calc(100vh-140px)] pr-1 scrollbar-thin">

         
          {/* ── Document Input Section ── */}
          <div className="border border-gray-200 rounded-xl overflow-hidden mb-3">
            {/* Section Header */}
            <button
              onClick={() => setDocInputOpen(!docInputOpen)}
              className="w-full flex items-center justify-between px-4 py-3 bg-white hover:bg-gray-50 transition-colors"
            >
              <span className="text-[13px] font-semibold text-[#00a0ef]">Document Input</span>
              {docInputOpen ? (
                <Minus className="w-4 h-4 text-[#00a0ef]" />
              ) : (
                <Plus className="w-4 h-4 text-[#00a0ef]" />
              )}
            </button>

            {docInputOpen && (
              <div className="px-4 pb-4 border-t border-gray-100">
                <div className="mt-3">
                  {DOC_SECTIONS.map((section) => (
                    <div key={section.id} className="mb-5">
                      <SectionGroupHeader title={section.title} />
                      <div className="space-y-4 pl-1">
                        {section.subSections.map((sub) => (
                          <SubSectionBlock key={sub.id} sub={sub} />
                        ))}
                      </div>
                    </div>
                  ))}

                  {/* Uploaded Documents */}
                  <div className="mb-5">
                    <SectionGroupHeader title="Uploaded Documents" />
                    <div className="pl-1">
                      {UPLOADED_FILES.map((file, i) => (
                        <FileItem key={i} file={file} />
                      ))}
                    </div>
                  </div>

                  {/* Site Inspection Document */}
                  <div>
                    <SectionGroupHeader title="Site Inspection Document" />
                    <div className="pl-1">
                      {INSPECTION_FILES.map((file, i) => (
                        <FileItem key={i} file={file} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* ── Inspection Data Section ── */}
          <div className="border border-gray-200 rounded-xl overflow-hidden mb-3">
            <button
              onClick={() => setInspectionOpen(!inspectionOpen)}
              className="w-full flex items-center justify-between px-4 py-3 bg-white hover:bg-gray-50 transition-colors"
            >
              <span className="text-[13px] font-semibold text-[#00a0ef]">Inspection Data</span>
              {inspectionOpen ? (
                <Minus className="w-4 h-4 text-[#00a0ef]" />
              ) : (
                <Plus className="w-4 h-4 text-[#00a0ef]" />
              )}
            </button>

            {inspectionOpen && (
              <div className="px-4 py-4 border-t border-gray-100">
                {/* Desktop "Input" fields matching the original design */}
                {[...Array(7)].map((_, i) => (
                  <div key={i} className="mb-3">
                    <label className="block text-[12px] font-medium text-gray-600 mb-1">Input</label>
                    <input
                      type="text"
                      placeholder="Enter input"
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-[13px] placeholder:text-gray-300 focus:outline-none focus:border-[#00a0ef] focus:ring-1 focus:ring-[#00a0ef] transition-colors"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* ── Document Area ── */}
        <div className="flex-1 flex flex-col min-h-[500px]">
          <div className="flex-1 w-full bg-[#00a0ef] rounded-xl flex items-center justify-center shadow-sm relative overflow-y-auto">
            {docHtml ? (
              <div
                className="w-full h-full bg-white p-8 prose max-w-none"
                dangerouslySetInnerHTML={{ __html: docHtml }}
              />
            ) : (
              <span className="text-white font-semibold tracking-widest text-sm">DOCUMENT</span>
            )}
          </div>

          {/* Mobile: Save button */}
          <div className="md:hidden flex gap-3 mt-4">
            <button className="flex-1 py-2.5 bg-[#00a0ef] text-white text-[14px] font-semibold rounded-lg shadow-sm">
              Save Changes
            </button>
          </div>

          <p className="md:hidden text-center text-[12px] font-medium text-gray-500 mt-3 underline underline-offset-2">
            Note: Open the file on desktop to make edits.
          </p>
        </div>

      </div>
    </div>
  );
}