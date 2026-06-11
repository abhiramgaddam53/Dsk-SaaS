// ContactsList.tsx
import React from 'react';
import { MoreVertical, ChevronDown, Link as LinkIcon } from 'lucide-react';
import { Contact, ContactStatus } from '../../../types/types';
import { useRouter } from 'next/navigation';

interface ContactsListProps {
  contacts: Contact[];
  onStatusChange: (id: string, status: ContactStatus) => void;
  activeTab?: string; // <-- New prop added
}

const STATUS_OPTIONS: ContactStatus[] = [
  'New-Lead', 'Contacted', 'Interested', 'Qualified', 
  'Un-Qualified', 'Lost Lead', 'Won Lead'
];

const getStatusStyles = (status: ContactStatus) => {
  switch (status) {
    case 'New-Lead': return 'bg-blue-50 text-blue-600 border-blue-200';
    case 'Contacted': return 'bg-yellow-50 text-yellow-600 border-yellow-200';
    case 'Interested': return 'bg-cyan-50 text-cyan-600 border-cyan-200';
    case 'Qualified': return 'bg-purple-50 text-purple-600 border-purple-200';
    case 'Un-Qualified': return 'bg-red-50 text-red-600 border-red-200';
    case 'Lost Lead': return 'bg-red-50 text-red-600 border-red-200';
    case 'Won Lead': return 'bg-green-50 text-green-600 border-green-200';
    default: return 'bg-gray-50 text-gray-600 border-gray-200';
  }
};

export default function ContactsList({ contacts, onStatusChange, activeTab }: ContactsListProps) {
  const router = useRouter();

  if (!contacts?.length) {
    return (
      <div className="w-full bg-white rounded-lg border border-gray-200 p-8 text-center text-gray-500 text-sm">
        No contacts found for this category.
      </div>
    );
  }

  // Determine if we are on the Connected Contacts tab
  const isConnectedTab = activeTab === 'Connected Contacts';

  return (
    <div className="w-full overflow-x-auto rounded-lg border border-gray-200 bg-white">
      <table className="w-full text-sm text-left text-gray-600 whitespace-nowrap">
        <thead className="text-xs text-gray-500 bg-gray-50/50 border-b border-gray-200">
          <tr>
            <th className="px-6 py-3 font-medium">
              <div className="flex items-center gap-2">
                <input type="checkbox" className="rounded border-gray-300" />
                Contact Name
              </div>
            </th>
            <th className="px-6 py-3 font-medium">Company</th>
            
            {/* Conditional Column Header */}
            {isConnectedTab && (
              <th className="px-6 py-3 font-medium">
                <div className="flex items-center gap-1.5">
                  <LinkIcon size={14} className="text-gray-400" />
                  Linked With
                </div>
              </th>
            )}

            <th className="px-6 py-3 font-medium">Status</th>
            <th className="px-6 py-3 font-medium">Email</th>
            <th className="px-6 py-3 font-medium">Phone</th>
            <th className="px-4 py-3 font-medium text-right"></th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <tr 
              key={contact.id} 
              onClick={() => router.push(`/sa/crm/contacts/${contact.id}`)}
              className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors cursor-pointer"
            >
              <td className="px-6 py-2">
                <div className="flex items-center gap-3">
                  <input 
                    type="checkbox" 
                    className="rounded border-gray-300 cursor-default" 
                    onClick={(e) => e.stopPropagation()} 
                  />
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden shrink-0 border border-gray-200">
                    {contact.avatar ? (
                      <img src={contact.avatar} alt={contact.name} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-blue-600 font-bold text-xs bg-blue-50 w-full h-full flex items-center justify-center">
                        {contact.name.charAt(0)}
                      </span>
                    )}
                  </div>
                  <span className="font-medium text-gray-900">{contact.name}</span>
                </div>
              </td>
              <td className="px-6 py-2">{contact.company}</td>

              {/* Conditional Column Data (Parent Tag) */}
              {isConnectedTab && (
                <td className="px-6 py-2">
                  {contact.linkedWith ? (
                    <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200">
                      {contact.linkedWith}
                    </span>
                  ) : (
                    <span className="text-gray-400">-</span>
                  )}
                </td>
              )}

              <td className="px-6 py-2">
                <div className="relative inline-block w-36">
                  <select
                    value={contact.status}
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) => {
                      e.stopPropagation();
                      onStatusChange(contact.id, e.target.value as ContactStatus);
                    }}
                    className={`appearance-none w-full px-3 py-1.5 pr-8 text-xs font-medium border rounded-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${getStatusStyles(contact.status)}`}
                  >
                    {STATUS_OPTIONS.map(status => (
                      <option key={status} value={status} className="bg-white text-gray-900 font-medium">
                        {status}
                      </option>
                    ))}
                  </select>
                  <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none opacity-60" />
                </div>
              </td>
              <td className="px-6 py-2">{contact.email}</td>
              <td className="px-6 py-2">{contact.phone}</td>
              <td className="px-4 py-2 text-right">
                <button 
                  onClick={(e) => e.stopPropagation()}
                  className="text-gray-400 hover:text-gray-600 p-1.5 rounded-md hover:bg-gray-100 transition-colors"
                >
                  <MoreVertical size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <div className="flex items-center justify-between px-6 py-3 border-t border-gray-200 bg-white">
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <span>Show</span>
            <select 
              className="border border-gray-200 rounded-md px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white cursor-pointer"
              onClick={(e) => e.stopPropagation()}
            >
              <option>10</option>
              <option>20</option>
              <option>50</option>
            </select>
          </div>
          <span>1 to {contacts.length} of {contacts.length} results</span>
        </div>
      </div>
    </div>
  );
}