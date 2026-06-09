// TasksList.tsx
import React from 'react';
import { MoreVertical, CheckSquare, Calendar, ChevronDown } from 'lucide-react';
import { Task, TaskStatus } from '../../../types/types';

interface TasksListProps {
  tasks: Task[];
  onStatusChange: (id: string, status: TaskStatus) => void;
}

const TASK_STATUSES: TaskStatus[] = ['Upcoming', 'Not Started', 'In-Progress', 'Pending', 'Completed', 'Cancelled', 'Pending/On-Hold'];

const getStatusStyles = (status: TaskStatus) => {
  switch (status) {
    case 'Completed': return 'bg-green-50 text-green-600 border-green-200';
    case 'In-Progress': return 'bg-yellow-50 text-yellow-600 border-yellow-200';
    case 'Pending': 
    case 'Pending/On-Hold': return 'bg-red-50 text-red-600 border-red-200';
    case 'Not Started': return 'bg-blue-50 text-blue-600 border-blue-200';
    case 'Cancelled': return 'bg-gray-100 text-gray-600 border-gray-200';
    case 'Upcoming': return 'bg-purple-50 text-purple-600 border-purple-200';
    default: return 'bg-gray-50 text-gray-600 border-gray-200';
  }
};

export default function TasksList({ tasks, onStatusChange }: TasksListProps) {
  return (
    <div className="w-full overflow-x-auto rounded-lg border border-gray-200 bg-white">
      <table className="w-full text-sm text-left text-gray-600 whitespace-nowrap">
        <thead className="text-xs text-gray-500 bg-gray-50/50 border-b border-gray-200">
          <tr>
            <th className="px-6 py-4 font-medium w-[35%]">
              <div className="flex items-center gap-2">
                <CheckSquare size={14} className="text-gray-400" />
                <span>Task</span>
              </div>
            </th>
            <th className="px-6 py-4 font-medium w-[15%]">
              <div className="flex items-center gap-2">
                <Calendar size={14} className="text-gray-400" />
                <span>Due Date</span>
              </div>
            </th>
            <th className="px-6 py-4 font-medium w-[15%]">Status</th>
            <th className="px-6 py-4 font-medium w-[20%]">Related to</th>
            <th className="px-6 py-4 font-medium w-[10%]">Assigned Users</th>
            <th className="px-4 py-4 font-medium text-right w-[5%]"></th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id} className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <input type="checkbox" className="rounded border-gray-300" />
                  <span className="text-gray-700 truncate max-w-[300px] block">{task.title}</span>
                </div>
              </td>
              <td className="px-6 py-4 text-gray-600">{task.dueDate}</td>
              <td className="px-6 py-4">
                <div className="relative inline-block w-36">
                  <select
                    value={task.status}
                    onChange={(e) => onStatusChange(task.id, e.target.value as TaskStatus)}
                    className={`appearance-none w-full px-3 py-1 pr-8 text-xs font-medium border rounded-full cursor-pointer focus:outline-none focus:ring-1 focus:ring-blue-500/50 ${getStatusStyles(task.status)}`}
                  >
                    {TASK_STATUSES.map(status => (
                      <option key={status} value={status} className="bg-white text-gray-900">{status}</option>
                    ))}
                  </select>
                  <ChevronDown size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none opacity-60" />
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-[10px] font-bold">C</div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{task.relatedTo.name}</p>
                    <p className="text-xs text-gray-500">{task.relatedTo.role}</p>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-[10px] font-bold">T</div>
                  <span className="text-gray-700">{task.assignedUsers[0]?.name}</span>
                </div>
              </td>
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
  );
}