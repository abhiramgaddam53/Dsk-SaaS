// ContactsKanban.tsx
import React from 'react';
import { MoreVertical, Mail, Phone, Plus, ChevronDown } from 'lucide-react';
import { Contact, ContactStatus } from '../types/types';

interface ContactsKanbanProps {
  contacts: Contact[];
  onStatusChange: (id: string, status: ContactStatus) => void;
}

const STATUS_COLUMNS: ContactStatus[] = [
  'New-Lead', 'Contacted', 'Interested', 'Qualified', 
  'Un-Qualified', 'Lost Lead', 'Won Lead'
];

const getStatusColor = (status: ContactStatus) => {
  switch (status) {
    case 'New-Lead': return 'bg-blue-100 text-blue-700';
    case 'Contacted': return 'bg-yellow-100 text-yellow-700';
    case 'Interested': return 'bg-cyan-100 text-cyan-700';
    case 'Qualified': return 'bg-purple-100 text-purple-700';
    case 'Un-Qualified': return 'bg-red-100 text-red-700';
    case 'Lost Lead': return 'bg-red-100 text-red-700';
    case 'Won Lead': return 'bg-green-100 text-green-700';
    default: return 'bg-gray-100 text-gray-700';
  }
};

export default function ContactsKanban({ contacts, onStatusChange }: ContactsKanbanProps) {
  return (
    <div className="flex-1 overflow-x-auto pb-6">
      <div className="flex min-w-max h-full">
        {STATUS_COLUMNS.map((status) => {
          const columnContacts = contacts.filter(c => c.status === status);
          
          if (columnContacts.length === 0) return null;

          return (
            <div key={status} className="w-80 flex flex-col shrink-0 border-r border-gray-200/80 px-3 first:pl-0 last:border-r-0 last:pr-0">
              <div className="flex items-center justify-between mb-4 px-1">
                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${getStatusColor(status)}`}>
                    {status}
                  </span>
                  <span className="text-gray-400 text-sm font-medium">{columnContacts.length}</span>
                </div>
                <button className="text-gray-400 hover:text-gray-600">
                  <Plus size={16} />
                </button>
              </div>

              <div className="flex flex-col gap-3">
                {columnContacts.map((contact) => (
                  <div key={contact.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col gap-3 relative group">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden shrink-0">
                          {contact.avatar ? (
                            <img src={contact.avatar} alt={contact.name} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-blue-50 text-blue-600 font-bold text-sm">
                              {contact.name.charAt(0)}
                            </div>
                          )}
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-gray-900">{contact.name}</h4>
                          <p className="text-xs text-gray-500">{contact.company}</p>
                        </div>
                      </div>
                      <button className="text-gray-400 hover:text-gray-600 -mt-1 -mr-1 p-1">
                        <MoreVertical size={16} />
                      </button>
                    </div>

                    <div className="flex gap-2">
                      <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-[10px] font-medium rounded">Recent Interaction</span>
                      <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-[10px] font-medium rounded">Title 01</span>
                    </div>

                    <div className="space-y-1.5 mt-1">
                      <div className="flex items-center gap-2 text-gray-500 text-xs">
                        <Mail size={12} />
                        <span className="truncate">{contact.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-500 text-xs">
                        <Phone size={12} />
                        <span>{contact.phone}</span>
                      </div>
                    </div>
                    
                    <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                       <select
                          value={contact.status}
                          onChange={(e) => onStatusChange(contact.id, e.target.value as ContactStatus)}
                          className="appearance-none bg-gray-50 text-xs border border-gray-200 rounded-md px-2 py-1 pr-6 cursor-pointer focus:outline-none focus:ring-1 focus:ring-blue-500"
                        >
                          {STATUS_COLUMNS.map(s => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                        <ChevronDown size={10} className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}