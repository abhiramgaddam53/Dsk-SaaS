import React, { useState } from 'react';
import { X, ChevronDown } from 'lucide-react';

interface AssignReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  reportId: string | null;
}

const TEAM_MEMBERS = [
  'Pradhyumn Dhondi',
  'Yash Mishra',
  'Aniketh Busavale',
  'Sai Jalmuri',
  'Pranav Varma'
];

export default function AssignReportModal({ isOpen, onClose, reportId }: AssignReportModalProps) {
  const [selectedMember, setSelectedMember] = useState(TEAM_MEMBERS[0]);

  if (!isOpen) return null;

  const handleConfirm = () => {
    // API logic to assign the report goes here using reportId and selectedMember
    console.log(`Assigned report ${reportId} to ${selectedMember}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-5 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">Assign Report</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-md hover:bg-gray-100">
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Assign Report To
          </label>
          <div className="relative">
            <select
              value={selectedMember}
              onChange={(e) => setSelectedMember(e.target.value)}
              className="w-full px-3 py-2.5 bg-white border text-black border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 appearance-none cursor-pointer"
            >
              {TEAM_MEMBERS.map((member) => (
                <option key={member} value={member}>{member}</option>
              ))}
            </select>
            <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100 flex justify-end gap-3 bg-gray-50/50">
          <button 
            onClick={onClose}
            className="px-4 py-2 border border-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-100 transition-colors text-sm bg-white"
          >
            Cancel
          </button>
          <button 
            onClick={handleConfirm}
            className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors text-sm shadow-sm"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}