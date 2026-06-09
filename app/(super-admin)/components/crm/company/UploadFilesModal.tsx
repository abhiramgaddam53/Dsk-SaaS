// UploadFilesModal.tsx
import React, { useState } from 'react';
import { X, Trash2, Upload, Link as LinkIcon } from 'lucide-react';

interface UploadFilesModalProps {
  isOpen: boolean;
  onClose: () => void;
  folderName?: string;
}

export default function UploadFilesModal({ isOpen, onClose, folderName = 'Folder Name' }: UploadFilesModalProps) {
  const [activeTab, setActiveTab] = useState<'upload' | 'link'>('upload');
  
  // Mock files to match the UI design
  const [selectedFiles, setSelectedFiles] = useState([
    { id: 1, name: 'Filename.type', size: '3 MB' },
    { id: 2, name: 'Filename.type', size: '3 MB' },
    { id: 3, name: 'Filename.type', size: '3 MB' }
  ]);

  const removeFile = (id: number) => {
    setSelectedFiles(files => files.filter(f => f.id !== id));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl overflow-hidden flex flex-col">
        <div className="flex justify-between items-center p-5 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">
            {activeTab === 'upload' ? 'Upload Files' : 'Add Link'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-md hover:bg-gray-100">
            <X size={20} />
          </button>
        </div>

        <div className="p-6">
          {activeTab === 'upload' ? (
            <>
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-1">Add to: {`{${folderName}}`}</h3>
                <p className="text-sm text-gray-500">Upload files or add links</p>
              </div>

              {selectedFiles.length > 0 && (
                <div className="mb-6">
                  <p className="text-sm font-medium text-gray-900 mb-3">{selectedFiles.length} file(s) selected</p>
                  <div className="space-y-2 max-h-48 overflow-y-auto pr-2 scrollbar-hide">
                    {selectedFiles.map(file => (
                      <div key={file.id} className="flex items-center justify-between p-3 border border-gray-100 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded bg-green-50 flex items-center justify-center border border-green-100">
                             <span className="text-[8px] font-bold text-green-600">CSV</span>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">{file.name}</p>
                            <p className="text-xs text-gray-500">{file.size}</p>
                          </div>
                        </div>
                        <button onClick={() => removeFile(file.id)} className="p-1.5 text-red-500 hover:bg-red-50 rounded-md transition-colors">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="mb-6">
                <p className="text-sm font-medium text-gray-900 mb-2">Location</p>
                <div className="flex p-1 bg-gray-50 rounded-lg border border-gray-100">
                  <button 
                    onClick={() => setActiveTab('upload')}
                    className="flex-1 flex items-center justify-center gap-2 py-2 bg-blue-600 text-white text-sm font-medium rounded-md shadow-sm"
                  >
                    <Upload size={16} />
                    Upload Files
                  </button>
                  <button 
                    onClick={() => setActiveTab('link')}
                    className="flex-1 flex items-center justify-center gap-2 py-2 text-gray-600 text-sm font-medium rounded-md hover:bg-white transition-colors"
                  >
                    <LinkIcon size={16} />
                    Add Link
                  </button>
                </div>
              </div>

              <button className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold rounded-lg transition-colors">
                UPLOAD
              </button>
            </>
          ) : (
            <>
              <div className="space-y-4 mb-8">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Display Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Project Documentation"
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-sm text-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">URL</label>
                  <input
                    type="url"
                    placeholder="https://example.com"
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-sm text-gray-900"
                  />
                </div>
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                <div></div>
                <div className="flex items-center gap-3">
                  <button onClick={() => setActiveTab('upload')} className="p-2 border border-red-200 text-red-500 rounded-lg hover:bg-red-50 transition-colors">
                    <Trash2 size={18} />
                  </button>
                  <button className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors text-sm shadow-sm">
                    Add Link
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}