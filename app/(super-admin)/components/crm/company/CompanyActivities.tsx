// CompanyActivities.tsx
import React, { useState } from 'react';
import { Search, Plus, Filter, Download, Calendar as CalendarIcon } from 'lucide-react';
import TasksList from './TasksList';
import TasksKanban from './TasksKanban';
import MeetingsList from './MeetingsList';
import CreateTaskModal from './CreateTaskModal';
import CreateMeetingModal from './CreateMeetingModal';
import { mockTasks, mockMeetings } from '../../../data/mockdata';
import { TaskStatus, MeetingStatus } from '../../../types/types';

export default function CompanyActivities() {
  const [activeSubTab, setActiveSubTab] = useState<'Tasks' | 'Meetings'>('Tasks');
  const [taskView, setTaskView] = useState<'list' | 'kanban'>('list');
  
  const [tasks, setTasks] = useState(mockTasks);
  const [meetings, setMeetings] = useState(mockMeetings);
  
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isMeetingModalOpen, setIsMeetingModalOpen] = useState(false);

  const handleTaskStatusChange = (id: string, status: TaskStatus) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, status } : t));
  };

  const handleMeetingStatusChange = (id: string, status: MeetingStatus) => {
    setMeetings(prev => prev.map(m => m.id === id ? { ...m, status } : m));
  };

  return (
    <div className="flex flex-col w-full">
      {/* Sub-navigation */}
      <div className="flex items-center justify-between border-b border-gray-200 mb-6">
        <div className="flex gap-8">
          <button
            onClick={() => setActiveSubTab('Tasks')}
            className={`pb-3 text-sm font-semibold transition-colors relative ${activeSubTab === 'Tasks' ? 'text-blue-600' : 'text-gray-500 hover:text-gray-800'}`}
          >
            Tasks
            {activeSubTab === 'Tasks' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 rounded-t-full"></span>}
          </button>
          <button
            onClick={() => setActiveSubTab('Meetings')}
            className={`pb-3 text-sm font-semibold transition-colors relative ${activeSubTab === 'Meetings' ? 'text-blue-600' : 'text-gray-500 hover:text-gray-800'}`}
          >
            Meetings
            {activeSubTab === 'Meetings' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 rounded-t-full"></span>}
          </button>
        </div>
        
        {activeSubTab === 'Meetings' && (
          <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 pb-3">
            <CalendarIcon size={16} />
            Calendar View
          </button>
        )}
      </div>

      {activeSubTab === 'Tasks' && (
        <>
          <div className="flex items-center justify-between gap-4 mb-6 bg-gray-50/50 p-2 rounded-lg border border-gray-100">
            <div className="relative flex-1 max-w-3xl">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search Task by Title or Description..."
                className="w-full text-gray-900 pl-10 pr-4 py-2.5 bg-gradient-to-r from-white to-[#E8F0FE] border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500"
              />
            </div>
            <button 
              onClick={() => setIsTaskModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors shrink-0"
            >
              <Plus size={18} />
              New Task
            </button>
          </div>

          <div className="flex items-center justify-between mb-6 border-b border-gray-200">
            <div className="flex items-center gap-8">
              <button 
                onClick={() => setTaskView('list')}
                className={`text-sm font-medium pb-3 border-b-2 transition-colors ${taskView === 'list' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-800'}`}
              >
                List View
              </button>
              <button 
                onClick={() => setTaskView('kanban')}
                className={`text-sm font-medium pb-3 border-b-2 transition-colors ${taskView === 'kanban' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-800'}`}
              >
                Kanban View
              </button>
            </div>
            
            <div className="flex items-center gap-4 text-sm font-medium text-gray-500 pb-3">
              <button className="flex items-center gap-2 hover:text-gray-800 transition-colors">
                <Download size={16} />
                Import/Export
              </button>
              <button className="flex items-center gap-2 hover:text-gray-800 transition-colors">
                <Filter size={16} />
                Filter
              </button>
            </div>
          </div>

          {taskView === 'list' ? (
            <TasksList tasks={tasks} onStatusChange={handleTaskStatusChange} />
          ) : (
            <TasksKanban tasks={tasks} />
          )}
        </>
      )}

      {activeSubTab === 'Meetings' && (
        <>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-medium text-gray-900">Company Meetings</h2>
              <p className="text-sm text-gray-500 mt-1">Description Over Here</p>
            </div>
            <button 
              onClick={() => setIsMeetingModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors shadow-sm"
            >
              <Plus size={16} />
              New Meeting
            </button>
          </div>
          
          <MeetingsList meetings={meetings} onStatusChange={handleMeetingStatusChange} />
        </>
      )}

      <CreateTaskModal isOpen={isTaskModalOpen} onClose={() => setIsTaskModalOpen(false)} />
      <CreateMeetingModal isOpen={isMeetingModalOpen} onClose={() => setIsMeetingModalOpen(false)} />
    </div>
  );
}