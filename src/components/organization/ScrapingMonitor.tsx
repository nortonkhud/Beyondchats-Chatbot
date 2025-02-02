import React, { useState, useEffect } from 'react';
import { RefreshCw, Clock, CheckCircle, XCircle, AlertTriangle, Download } from 'lucide-react';

interface ScrapingTask {
  id: string;
  url: string;
  status: 'completed' | 'in_progress' | 'pending' | 'failed';
  progress: number;
  totalPages: number;
  scrapedPages: number;
  startTime: string;
  estimatedTimeRemaining?: string;
  error?: string;
}

interface ScrapingMonitorProps {
  organizationId: string;
}

const ScrapingMonitor: React.FC<ScrapingMonitorProps> = ({ organizationId }) => {
  const [tasks, setTasks] = useState<ScrapingTask[]>([
    {
      id: '1',
      url: 'https://example.com',
      status: 'completed',
      progress: 100,
      totalPages: 50,
      scrapedPages: 50,
      startTime: '2024-02-20T10:00:00Z',
    },
    {
      id: '2',
      url: 'https://test.com',
      status: 'in_progress',
      progress: 60,
      totalPages: 100,
      scrapedPages: 60,
      startTime: '2024-02-20T11:30:00Z',
      estimatedTimeRemaining: '20 minutes',
    },
    {
      id: '3',
      url: 'https://demo.com',
      status: 'failed',
      progress: 30,
      totalPages: 75,
      scrapedPages: 22,
      startTime: '2024-02-20T12:00:00Z',
      error: 'Rate limit exceeded',
    },
  ]);

  const getStatusIcon = (status: ScrapingTask['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'in_progress':
        return <RefreshCw className="h-5 w-5 text-blue-500 animate-spin" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-gray-500" />;
      case 'failed':
        return <XCircle className="h-5 w-5 text-red-500" />;
    }
  };

  const getStatusColor = (status: ScrapingTask['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'pending':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
      case 'failed':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
    }
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
          <h3 className="text-lg font-semibold mb-2">Total Tasks</h3>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">{tasks.length}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
          <h3 className="text-lg font-semibold mb-2">Completed</h3>
          <p className="text-3xl font-bold text-green-600">
            {tasks.filter(t => t.status === 'completed').length}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
          <h3 className="text-lg font-semibold mb-2">In Progress</h3>
          <p className="text-3xl font-bold text-blue-600">
            {tasks.filter(t => t.status === 'in_progress').length}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
          <h3 className="text-lg font-semibold mb-2">Failed</h3>
          <p className="text-3xl font-bold text-red-600">
            {tasks.filter(t => t.status === 'failed').length}
          </p>
        </div>
      </div>

      {/* Task List */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Scraping Tasks
            </h2>
            <button
              onClick={() => {/* Refresh tasks */}}
              className="flex items-center bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              <RefreshCw className="h-5 w-5 mr-2" />
              Refresh
            </button>
          </div>

          <div className="space-y-4">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="border dark:border-gray-700 rounded-lg p-4"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center">
                      {getStatusIcon(task.status)}
                      <h3 className="text-lg font-semibold ml-2">{task.url}</h3>
                    </div>
                    <div className="mt-2 flex items-center space-x-4">
                      <span className={`px-2 py-1 rounded-full text-sm ${getStatusColor(task.status)}`}>
                        {task.status}
                      </span>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {task.scrapedPages} / {task.totalPages} pages
                      </span>
                      {task.estimatedTimeRemaining && (
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {task.estimatedTimeRemaining} remaining
                        </span>
                      )}
                    </div>
                  </div>
                  {task.status === 'completed' && (
                    <button
                      onClick={() => {/* Download scraped data */}}
                      className="flex items-center text-gray-600 dark:text-gray-400 hover:text-red-600"
                    >
                      <Download className="h-5 w-5" />
                    </button>
                  )}
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-500 ${
                      task.status === 'completed' ? 'bg-green-500' :
                      task.status === 'in_progress' ? 'bg-blue-500' :
                      task.status === 'failed' ? 'bg-red-500' : 'bg-gray-500'
                    }`}
                    style={{ width: `${task.progress}%` }}
                  />
                </div>

                {task.error && (
                  <div className="mt-4 flex items-center text-red-600 dark:text-red-400">
                    <AlertTriangle className="h-5 w-5 mr-2" />
                    {task.error}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScrapingMonitor;