import React from 'react';
import { EditMode } from '@/app/(Drafter)/types/types';

export const InputField = ({ label, name, value, onChange }: any) => (
  <div className="mb-3">
    <label className="block text-[10px] font-semibold text-gray-500 uppercase mb-1">{label}</label>
    <input type="text" name={name} value={value} onChange={onChange} className="w-full px-2 py-1.5 border border-gray-300 rounded text-[12px] text-gray-800 focus:outline-none focus:border-[#00a0ef] focus:ring-1 focus:ring-[#00a0ef] bg-white transition-colors" />
  </div>
);

export const DocField = ({ name, value, mode, onChange, inline = false, multiline = false, className = "" }: any) => {
  if (mode !== 'direct') return <span className={className}>{value || '\u00A0'}</span>;
  if (multiline) return <textarea name={name} value={value} onChange={onChange} className={`w-full bg-[#f0f8ff] outline-none border border-dashed border-[#00a0ef] p-1 resize-none print:border-none print:bg-transparent ${className}`} rows={2} />;
  if (inline) return <input type="text" name={name} value={value} onChange={onChange} style={{ width: `${Math.max(value.length, 2)}ch` }} className={`bg-[#f0f8ff] outline-none border border-dashed border-[#00a0ef] px-1 font-inherit text-inherit print:border-none print:bg-transparent ${className}`} />;
  return <input type="text" name={name} value={value} onChange={onChange} className={`w-full bg-[#f0f8ff] outline-none border border-dashed border-[#00a0ef] px-1 font-inherit text-inherit print:border-none print:bg-transparent ${className}`} />;
};

export const PageShell = ({ children }: { children: React.ReactNode }) => (
  <div className="a4-page w-[794px] h-[1123px] bg-white shadow-[0_10px_30px_rgba(0,0,0,0.15)] relative py-12 px-14 text-[13px] text-gray-900 font-serif leading-snug shrink-0 box-border mx-auto">
    {children}
  </div>
);