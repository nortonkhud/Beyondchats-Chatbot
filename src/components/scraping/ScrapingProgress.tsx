import React from 'react';
import { CheckCircle, XCircle, Clock, Loader2, AlertTriangle } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface PageStatus {
  url: string;
  status: 'completed' | 'processing' | 'pending' | 'failed';
  startTime?: Date;
  endTime?: Date;
  itemsExtracted?: number;
  error?: string;
}

interface ScrapingProgressProps {
  totalPages: number;
  completedPages: number;
  currentUrl?: string;
  estimatedTimeRemaining?: string;
  pageStatuses: PageStatus[];
}

const ScrapingProgress: React.FC<ScrapingProgressProps> = ({
  totalPages,
  completedPages,
  currentUrl,
  estimatedTimeRemaining,
  pageStatuses
}) => {
  const progress = Math.round((completedPages / totalPages) * 100);

  const getStatusIcon = (status: PageStatus['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'processing':
        return <Loader2 className="h-5 w-5 text-blue-500 animate-spin" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-gray-400" />;
      case 'failed':
        return <XCircle className="h-5 w-5 text-red-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Main Progress Bar */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Scraping Progress
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {completedPages} of {totalPages} pages processed
            </p>
          </div>
          {estimatedTimeRemaining && (
            <div className="text-gray-600 dark:text-gray-400">
              Estimated time remaining: {estimatedTimeRemaining}
            </div>
          )}
        </div>

        <div className="relative pt-1">
          <div className="flex mb-2 items-center justify-between">
            <div>
              <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-red-600 bg-red-200 dark:bg-red-900/20">
                {progress}%
              </span>
            </div>
          </div>
          <div className="overflow-hidden h-2 text-xs flex rounded bg-red-200 dark:bg-red-900/20">
            <div
              style={{ width: `${progress}%` }}
              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-red-600 transition-all duration-500"
            />
          </div>
        </div>

        {currentUrl && (
          <div className="mt-4 flex items-center text-sm text-gray-600 dark:text-gray-400">
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            Currently processing: {currentUrl}
          </div>
        )}
      </div>

      {/* Detailed Status List */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Page Details
          </h3>
          <div className="space-y-4">
            {pageStatuses.map((page, index) => (
              <div
                key={index}
                className="border dark:border-gray-700 rounded-lg p-4"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    {getStatusIcon(page.status)}
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {page.url}
                      </p>
                      <div className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        {page.startTime && (
                          <span>
                            Started {formatDistanceToNow(page.startTime)} ago
                          </span>
                        )}
                        {page.endTime && (
                          <span className="ml-2">
                            • Completed {formatDistanceToNow(page.endTime)} ago
                          </span>
                        )}
                        {page.itemsExtracted !== undefined && (
                          <span className="ml-2">
                            • {page.itemsExtracted} items extracted
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="text-sm">
                    {page.status === 'failed' && page.error && (
                      <div className="flex items-center text-red-600">
                        <AlertTriangle className="h-4 w-4 mr-1" />
                        {page.error}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScrapingProgress;