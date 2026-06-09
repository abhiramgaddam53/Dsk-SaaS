// MeetingsList.tsx
import React from 'react';
import { MoreVertical, ListTodo, Calendar, ChevronDown } from 'lucide-react';
import { Meeting, MeetingStatus } from '../../../types/types';

interface MeetingsListProps {
  meetings: Meeting[];
  onStatusChange: (id: string, status: MeetingStatus) => void;
}

const MEETING_STATUSES: MeetingStatus[] = ['Not Started', 'In-Progress', 'Completed', 'Cancelled', 'Pending', 'Pending/On-Hold'];

const getStatusStyles = (status: MeetingStatus) => {
  switch (status) {
    case 'Completed': return 'bg-green-50 text-green-600 border-green-200';
    case 'In-Progress': return 'bg-yellow-50 text-yellow-600 border-yellow-200';
    case 'Pending': 
    case 'Pending/On-Hold': return 'bg-purple-50 text-purple-600 border-purple-200';
    case 'Not Started': return 'bg-blue-50 text-blue-600 border-blue-200';
    case 'Cancelled': return 'bg-red-50 text-red-600 border-red-200';
    default: return 'bg-gray-50 text-gray-600 border-gray-200';
  }
};

export default function MeetingsList({ meetings, onStatusChange }: MeetingsListProps) {
  return (
    <div className="flex flex-col gap-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-5 rounded-xl border border-gray-100 bg-gradient-to-tr from-white to-[#EBF0FF] relative">
          <div className="flex justify-between items-center mb-6">
            <p className="text-sm text-gray-600">Meetings Scheduled</p>
            <button className="text-gray-400 hover:text-gray-600"><MoreVertical size={16} /></button>
          </div>
          <div className="flex items-end justify-between">
            <h2 className="text-3xl font-medium text-gray-800">52</h2>
            <span className="text-sm text-blue-500">+10% from last month</span>
          </div>
        </div>

        <div className="p-5 rounded-xl border border-gray-100 bg-gradient-to-tr from-white to-[#FFF0F5] relative">
          <div className="flex justify-between items-center mb-6">
            <p className="text-sm text-gray-600">Meetings Pending</p>
            <button className="text-gray-400 hover:text-gray-600"><MoreVertical size={16} /></button>
          </div>
          <div className="flex items-end justify-between">
            <h2 className="text-3xl font-medium text-gray-800">22</h2>
            <span className="text-sm text-red-400">+10% from last month</span>
          </div>
        </div>

        <div className="p-5 rounded-xl border border-gray-100 bg-gradient-to-tr from-white to-[#EBF9F1] relative">
          <div className="flex justify-between items-center mb-6">
            <p className="text-sm text-gray-600">High Priority Meetings</p>
            <button className="text-gray-400 hover:text-gray-600"><MoreVertical size={16} /></button>
          </div>
          <div className="flex items-end justify-between">
            <h2 className="text-3xl font-medium text-gray-800">30</h2>
            <span className="text-sm text-green-500">+10% from last month</span>
          </div>
        </div>
      </div>

      <div className="w-full overflow-x-auto rounded-lg border border-gray-200 bg-white">
        <table className="w-full text-sm text-left text-gray-600 whitespace-nowrap">
          <thead className="text-xs text-gray-500 bg-gray-50/50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 font-medium w-[35%]">
                <div className="flex items-center gap-2">
                  <ListTodo size={14} className="text-gray-400" />
                  <span>Task Title</span>
                </div>
              </th>
              <th className="px-6 py-4 font-medium w-[20%]">
                <div className="flex items-center gap-2">
                  <Calendar size={14} className="text-gray-400" />
                  <span>Due Data</span>
                </div>
              </th>
              <th className="px-6 py-4 font-medium w-[20%]">Status</th>
              <th className="px-6 py-4 font-medium w-[20%]">Assigned To</th>
              <th className="px-4 py-4 font-medium text-right w-[5%]"></th>
            </tr>
          </thead>
          <tbody>
            {meetings.map((meeting) => (
              <tr key={meeting.id} className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <input type="checkbox" className="rounded border-gray-300" />
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                      <span className="text-xs font-bold text-blue-600">UI</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{meeting.title}</p>
                      <p className="text-[10px] text-gray-400">Lorem ipsum dolor sit amet consectetur...</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-600">{meeting.date}</td>
                <td className="px-6 py-4">
                  <div className="relative inline-block w-36">
                    <select
                      value={meeting.status}
                      onChange={(e) => onStatusChange(meeting.id, e.target.value as MeetingStatus)}
                      className={`appearance-none w-full px-3 py-1 pr-8 text-xs font-medium border rounded-full cursor-pointer focus:outline-none focus:ring-1 focus:ring-blue-500/50 ${getStatusStyles(meeting.status)}`}
                    >
                      {MEETING_STATUSES.map(status => (
                        <option key={status} value={status} className="bg-white text-gray-900">{status}</option>
                      ))}
                    </select>
                    <ChevronDown size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none opacity-60" />
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-700">{meeting.assignedTo.name}</td>
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
    </div>
  );
}