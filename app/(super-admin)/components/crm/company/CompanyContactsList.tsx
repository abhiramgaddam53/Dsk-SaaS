// CompanyContactsList.tsx
import React from 'react';
import { MoreVertical, FolderOpen, Mail, Phone, User } from 'lucide-react';
import { CompanyContact } from '../../../types/types';

interface CompanyContactsListProps {
  contacts: CompanyContact[];
}

export default function CompanyContactsList({ contacts }: CompanyContactsListProps) {
  return (
    <div className="w-full overflow-x-auto rounded-lg border border-gray-200 bg-white">
      <table className="w-full text-sm text-left text-gray-600 whitespace-nowrap table-fixed">
        <thead className="text-xs text-gray-500 bg-gray-50/50 border-b border-gray-200">
          <tr>
            <th className="px-6 py-4 font-medium w-[35%]">
              <div className="flex items-center gap-2">
                <User size={14} className="text-gray-400" />
                <span>Contact Name</span>
              </div>
            </th>
            <th className="px-6 py-4 font-medium w-[35%]">
              <div className="flex items-center gap-2">
                <Mail size={14} className="text-gray-400" />
                <span>Email</span>
              </div>
            </th>
            <th className="px-6 py-4 font-medium w-[25%]">
              <div className="flex items-center gap-2">
                <Phone size={14} className="text-gray-400" />
                <span>Phone</span>
              </div>
            </th>
            <th className="px-4 py-4 font-medium text-right w-[5%]"></th>
          </tr>
        </thead>
        <tbody>
          {contacts.length === 0 ? (
             <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                   No contacts data available from API.
                </td>
             </tr>
          ) : (
            contacts.map((contact) => (
              <tr key={contact.id} className="border-b border-gray-200 hover:bg-gray-50/50 transition-colors last:border-b-0">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <input type="checkbox" className="rounded border-gray-300" />
                    <span className="text-gray-700">{contact.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-600">{contact.email}</td>
                <td className="px-6 py-4 text-gray-600">{contact.phone}</td>
                <td className="px-4 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button className="text-gray-400 hover:text-gray-600 p-1.5 rounded-md hover:bg-gray-100 transition-colors">
                      <FolderOpen size={16} />
                    </button>
                    <button className="text-gray-400 hover:text-gray-600 p-1.5 rounded-md hover:bg-gray-100 transition-colors">
                      <MoreVertical size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {contacts.length > 0 && (
        <div className="flex items-center justify-between px-6 py-3 border-t border-gray-200 bg-white">
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <span>Show</span>
              <select className="border border-gray-200 rounded-md px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white">
                <option>10</option>
                <option>20</option>
                <option>50</option>
              </select>
            </div>
            <span>1 to {contacts.length} of {contacts.length} results</span>
          </div>
        </div>
      )}
    </div>
  );
}