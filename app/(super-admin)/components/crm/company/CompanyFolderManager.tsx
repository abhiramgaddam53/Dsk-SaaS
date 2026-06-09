// CompanyFolderManager.tsx
import React, { useState } from 'react';
import { Search, Plus, Upload, Folder as FolderIcon, FileText, Globe, MoreVertical, LayoutGrid, List as ListIcon, CornerUpLeft, Edit2, Trash2, User } from 'lucide-react';
import { CompanyFolder, CompanyFile } from '../../../types/types';
import { mockFolders, mockFiles } from '../../../data/mockdata';
import UploadFilesModal from './UploadFilesModal';
 
export default function CompanyFolderManager() {
  const [activeFolder, setActiveFolder] = useState<CompanyFolder | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  return (
    <div className="w-full relative">
      {/* Header Area */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-medium text-gray-900">
            {activeFolder ? 'Folder Name' : 'File Manager'}
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            {activeFolder ? 'Organize and Manage your Company Files' : 'Organize and Manage your Company Files'}
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          {activeFolder ? (
            <>
              <button 
                onClick={() => setActiveFolder(null)}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-50 transition-colors shadow-sm"
              >
                <CornerUpLeft size={16} />
                Back to Folders
              </button>
              <button onClick={() => setIsUploadModalOpen(true)} className="flex items-center gap-2 px-4 py-2 bg-blue-600 border border-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors shadow-sm">
                <Upload size={16} />
                Upload Files
              </button>
            </>
          ) : (
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 border border-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors shadow-sm">
              <Plus size={16} />
              New Folder
            </button>
          )}
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input
            type="text"
            placeholder="Search Files..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          />
        </div>

        <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end">
          {activeFolder && (
            <div className="flex items-center gap-4 hidden md:flex">
              <button onClick={()=> setIsUploadModalOpen(true)} className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900">
                <Upload size={16} />
                Upload New Files
              </button>
              <button className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900">
                <Edit2 size={16} />
                Edit
              </button>
              <button className="flex items-center gap-2 text-sm font-medium text-red-500 hover:text-red-700">
                <Trash2 size={16} />
                Delete Folder
              </button>
            </div>
          )}

          <div className="flex items-center gap-4">
            <button 
              onClick={() => setViewMode('grid')}
              className={`flex items-center gap-2 text-sm font-medium pb-2 border-b-2 transition-colors ${viewMode === 'grid' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-900'}`}
            >
              <LayoutGrid size={16} />
              Grid View
            </button>
            <button 
              onClick={() => setViewMode('list')}
              className={`flex items-center gap-2 text-sm font-medium pb-2 border-b-2 transition-colors ${viewMode === 'list' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-900'}`}
            >
              <ListIcon size={16} />
              List View
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      {!activeFolder ? (
        /* FOLDERS VIEW */
        viewMode === 'grid' ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {mockFolders.map((folder) => (
              <div 
                key={folder.id} 
                onClick={() => setActiveFolder(folder)}
                className="flex flex-col items-center justify-center p-4 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors group"
              >
                <div className="mb-3 transform group-hover:scale-105 transition-transform">
                   <svg width="80" height="80" viewBox="0 0 24 24" fill="#7DD3FC" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4 20C3.45 20 2.97917 19.8042 2.5875 19.4125C2.19583 19.0208 2 18.55 2 18V6C2 5.45 2.19583 4.97917 2.5875 4.5875C2.97917 4.19583 3.45 4 4 4H10L12 6H20C20.55 6 21.0208 6.19583 21.4125 6.5875C21.8042 6.97917 22 7.45 22 8V18C22 18.55 21.8042 19.0208 21.4125 19.4125C21.0208 19.8042 20.55 20 20 20H4Z" />
                   </svg>
                </div>
                <h3 className="font-semibold text-gray-900 text-center text-sm">{folder.name}</h3>
                <p className="text-xs text-gray-500 text-center mt-1">{folder.itemsCount}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="w-full overflow-x-auto rounded-lg border border-gray-200 bg-white">
            <table className="w-full text-sm text-left text-gray-600 whitespace-nowrap">
              <thead className="text-xs text-gray-500 bg-gray-50/50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 font-medium w-[30%]">
                    <div className="flex items-center gap-2">
                      <FolderIcon size={14} className="text-gray-400" />
                      <span>Folder Name</span>
                    </div>
                  </th>
                  <th className="px-6 py-4 font-medium w-[15%]">
                    <div className="flex items-center gap-2">
                      <FileText size={14} className="text-gray-400" />
                      <span>Files Uploaded</span>
                    </div>
                  </th>
                  <th className="px-6 py-4 font-medium w-[20%]">
                    <div className="flex items-center gap-2">
                      <User size={14} className="text-gray-400" />
                      <span>Updated by</span>
                    </div>
                  </th>
                  <th className="px-6 py-4 font-medium w-[15%]">Created Date</th>
                  <th className="px-6 py-4 font-medium w-[15%]">Last Opened Date</th>
                  <th className="px-4 py-4 font-medium text-right w-[5%]"></th>
                </tr>
              </thead>
              <tbody>
                {mockFolders.map((folder) => (
                  <tr key={folder.id} className="border-b border-gray-100 hover:bg-gray-50/50 cursor-pointer transition-colors" onClick={() => setActiveFolder(folder)}>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <input type="checkbox" className="rounded border-gray-300" onClick={(e) => e.stopPropagation()} />
                        <span className="font-medium text-gray-700">{folder.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{folder.itemsCount}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-[10px] font-bold">P</div>
                        <span className="text-gray-700">{folder.updatedBy.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{folder.createdDate}</td>
                    <td className="px-6 py-4 text-gray-600">{folder.lastOpenedDate}</td>
                    <td className="px-4 py-4 text-right">
                      <button className="text-gray-400 hover:text-gray-600 p-1 rounded-md hover:bg-gray-100 transition-colors" onClick={(e) => e.stopPropagation()}>
                        <MoreVertical size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      ) : (
        /* FILES VIEW */
        viewMode === 'grid' ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {mockFiles.map((file) => (
              <div 
                key={file.id} 
                className="flex flex-col items-center justify-center p-4 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors group border border-transparent hover:border-gray-100"
              >
                <div className="mb-4 transform group-hover:scale-105 transition-transform flex items-center justify-center w-20 h-20">
                   {file.type === 'pdf' ? (
                     <div className="relative flex flex-col items-center justify-center w-16 h-20 border-2 border-red-500 rounded-md">
                       <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-sm absolute bottom-2">PDF</span>
                     </div>
                   ) : (
                     <Globe size={64} className="text-gray-900" strokeWidth={1.5} />
                   )}
                </div>
                <h3 className="font-semibold text-gray-900 text-center text-sm w-full truncate px-2">{file.name}</h3>
                <p className="text-xs text-gray-500 text-center mt-1 w-full truncate px-2">{file.sizeOrUrl}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="w-full overflow-x-auto rounded-lg border border-gray-200 bg-white">
            <table className="w-full text-sm text-left text-gray-600 whitespace-nowrap">
              <thead className="text-xs text-gray-500 bg-gray-50/50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 font-medium w-[30%]">
                    <div className="flex items-center gap-2">
                      <FileText size={14} className="text-gray-400" />
                      <span>File Name</span>
                    </div>
                  </th>
                  <th className="px-6 py-4 font-medium w-[15%]">File Size</th>
                  <th className="px-6 py-4 font-medium w-[20%]">
                    <div className="flex items-center gap-2">
                      <User size={14} className="text-gray-400" />
                      <span>Updated by</span>
                    </div>
                  </th>
                  <th className="px-6 py-4 font-medium w-[15%]">Created Date</th>
                  <th className="px-6 py-4 font-medium w-[15%]">Last Opened Date</th>
                  <th className="px-4 py-4 font-medium text-right w-[5%]"></th>
                </tr>
              </thead>
              <tbody>
                {mockFiles.map((file) => (
                  <tr key={file.id} className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <input type="checkbox" className="rounded border-gray-300" />
                        <span className="font-medium text-gray-700 truncate w-40 block">{file.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{file.sizeOrUrl}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-[10px] font-bold">P</div>
                        <span className="text-gray-700">{file.updatedBy.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{file.createdDate}</td>
                    <td className="px-6 py-4 text-gray-600">{file.lastOpenedDate}</td>
                    <td className="px-4 py-4 text-right">
                      <button className="text-gray-400 hover:text-gray-600 p-1 rounded-md hover:bg-gray-100 transition-colors">
                        <MoreVertical size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      )}

      {/* Moved Modal here, outside of the conditional rendering blocks so it works regardless of viewMode */}
      <UploadFilesModal 
        isOpen={isUploadModalOpen} 
        onClose={() => setIsUploadModalOpen(false)} 
        folderName={activeFolder?.name}
      />
    </div>
  );
}