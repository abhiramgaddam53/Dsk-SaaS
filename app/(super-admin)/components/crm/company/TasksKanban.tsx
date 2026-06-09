// TasksKanban.tsx
import React from 'react';
import { MoreVertical, Plus, CheckCircle } from 'lucide-react';
import { Task, TaskStatus } from '../../../types/types';

interface TasksKanbanProps {
  tasks: Task[];
}

const COLUMNS: TaskStatus[] = ['Upcoming', 'Pending', 'Completed', 'In-Progress'];

const getColumnStyles = (status: TaskStatus) => {
  switch (status) {
    case 'Upcoming': return 'bg-blue-50 text-blue-600';
    case 'Pending': return 'bg-yellow-50 text-yellow-600';
    case 'Completed': return 'bg-green-50 text-green-600';
    case 'In-Progress': return 'bg-purple-50 text-purple-600';
    default: return 'bg-gray-50 text-gray-600';
  }
};

export default function TasksKanban({ tasks }: TasksKanbanProps) {
  return (
    <div className="flex-1 overflow-x-auto pb-6">
      <div className="flex min-w-max h-full gap-4">
        {COLUMNS.map((status) => {
          const columnTasks = tasks.filter(t => t.status === status);
          
          return (
            <div key={status} className="w-80 flex flex-col shrink-0">
              <div className="flex items-center justify-between mb-4 px-1">
                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getColumnStyles(status)}`}>
                    {status}
                  </span>
                  <span className="text-gray-400 text-sm font-medium">{columnTasks.length}</span>
                </div>
                <button className="text-gray-400 hover:text-gray-600">
                  <Plus size={18} />
                </button>
              </div>

              <div className="flex flex-col gap-4">
                {columnTasks.map((task) => (
                  <div key={task.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col gap-3 group">
                    <div className="flex items-start gap-3">
                      <div className="flex flex-col items-center justify-center px-3 py-2 bg-gray-50 rounded-lg border border-gray-100 shrink-0">
                        <span className="text-xs text-gray-500 font-medium">Mon</span>
                        <span className="text-lg font-bold text-gray-900">21</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-xs text-gray-500 truncate">{task.relatedTo.name}</p>
                          <button className="text-gray-400 hover:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity">
                            <MoreVertical size={14} />
                          </button>
                        </div>
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium ${getColumnStyles(task.status)}`}>
                          <CheckCircle size={10} />
                          {task.status}
                        </span>
                      </div>
                    </div>
                    
                    <p className="text-sm font-medium text-gray-900 line-clamp-2 mt-1">
                      {task.title}
                    </p>

                    <div className="flex -space-x-2 mt-2">
                      <div className="w-6 h-6 rounded-full bg-blue-100 border-2 border-white flex items-center justify-center text-[10px] font-bold text-blue-600">T</div>
                      <div className="w-6 h-6 rounded-full bg-green-100 border-2 border-white flex items-center justify-center text-[10px] font-bold text-green-600">U</div>
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