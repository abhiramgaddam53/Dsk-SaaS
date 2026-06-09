// CreateTaskModal.tsx
import React from 'react';
import { X, Calendar as CalendarIcon, User, Flag, CheckCircle2, Trash2, Edit2 } from 'lucide-react';

interface CreateTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateTaskModal({ isOpen, onClose }: CreateTaskModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl overflow-hidden flex flex-col h-[600px]">
        <div className="flex justify-between items-center p-5 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">Add New Task</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-md hover:bg-gray-100">
            <X size={20} />
          </button>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Left Column */}
          <div className="flex-1 p-6 overflow-y-auto border-r border-gray-100">
            <input 
              type="text" 
              placeholder="Task Title" 
              className="w-full text-2xl font-semibold text-gray-900 placeholder-gray-300 border-none focus:ring-0 p-0 mb-6 focus:outline-none"
            />
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea 
                rows={6}
                placeholder="Description the task objectives, requirements and important details"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 text-sm text-gray-600 resize-none"
              ></textarea>
            </div>
          </div>

          {/* Right Column */}
          <div className="w-[320px] bg-gray-50/30 p-6 overflow-y-auto flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <User size={16} />
                <span>Related to</span>
              </div>
              <div className="flex items-center gap-2 text-sm font-medium text-gray-900">
                <div className="w-5 h-5 bg-gray-200 rounded-sm"></div>
                Company Name
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <CalendarIcon size={16} />
                <span>Selected Date</span>
              </div>
              <span className="text-sm font-medium text-gray-900">Start Date</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <CalendarIcon size={16} />
                <span>Due Date</span>
              </div>
              <span className="text-sm font-medium text-gray-900">End Date</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <CheckCircle2 size={16} />
                <span>Status</span>
              </div>
              <span className="px-3 py-1 bg-yellow-50 text-yellow-600 rounded-full text-xs font-medium">Pending</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Flag size={16} />
                <span>Priority</span>
              </div>
              <span className="px-3 py-1 bg-red-50 text-red-600 rounded-full text-xs font-medium">High</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <User size={16} />
                <span>Assignees</span>
              </div>
              <div className="flex -space-x-2">
                <div className="w-6 h-6 rounded-full bg-blue-100 border-2 border-white flex items-center justify-center text-[10px] font-bold text-blue-600">A</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-4 border-t border-gray-100 flex justify-end gap-3 bg-white">
          <button type="button" className="p-2.5 border border-gray-200 text-red-500 rounded-lg hover:bg-red-50 transition-colors">
            <Trash2 size={18} />
          </button>
          <button type="button" className="p-2.5 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors">
            <Edit2 size={18} />
          </button>
          <button type="submit" className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors text-sm shadow-sm">
            Create Task
          </button>
        </div>
      </div>
    </div>
  );
}