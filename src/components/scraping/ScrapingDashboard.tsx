import React, { useState, useEffect } from 'react';
import { RefreshCw, AlertCircle, CheckCircle, Clock, XCircle } from 'lucide-react';
import { WebsiteScrapeStatus } from '../../types/auth';

interface ScrapingDashboardProps {
  organizationId: string;
}

const ScrapingDashboard: React.FC<ScrapingDashboardProps> = ({ organizationId }) => {
  const [scrapeStatus, setScrapeStatus] = useState<WebsiteScrapeStatus[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Mock data for demonstration
  useEffect(() => {
    const mockStatus: WebsiteScrapeStatus[] = [
      {
        id: '1',
        url: 'https://example.com',
        status: 'completed',
        progress: 100,
        pagesFound: 45,
        pagesScraped: 45,
        createdAt: new Date(Date.now() - 86400000).toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: '2',
        url: 'https://demo-site.com',
        status: 'in_progress',
        progress: 65,
        pagesFound: 30,
        pagesScraped: 20,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: '3',
        url: 'https://test.com',
        status: 'failed',
        progress: 30,
        pagesFound: 15,
        pagesScraped: 5,
        error: 'Connection timeout',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ];

    setScrapeStatus(mockStatus);
    setIsLoading(false);
  }, [organizationId]);

  const getStatusIcon = (status: WebsiteScrapeStatus['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'in_progress':
        return <RefreshCw className="h-5 w-5 text-blue-500 animate-spin" />;
      case 'failed':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'queued':
        return <Clock className="h-5 w-5 text-yellow-500" />;
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleString();
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Website Scraping Status</h2>
        <button
          onClick={() => setIsLoading(true)}
          className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          <RefreshCw className="h-4 w-4" />
          Refresh
        </button>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <RefreshCw className="h-8 w-8 text-red-600 animate-spin" />
        </div>
      ) : (
        <div className="space-y-4">
          {scrapeStatus.map((status) => (
            <div
              key={status.id}
              className="border dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(status.status)}
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {status.url}
                    </h3>
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Started: {formatDate(status.createdAt)}
                  </div>
                </div>
                <div className="text-right text-sm text-gray-500 dark:text-gray-400">
                  {status.pagesScraped} / {status.pagesFound} pages
                </div>
              </div>

              {status.status === 'in_progress' && (
                <div className="mt-4">
                  <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300 mb-1">
                    <span>Progress</span>
                    <span>{status.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${status.progress}%` }}
                    />
                  </div>
                </div>
              )}

              {status.status === 'failed' && status.error && (
                <div className="mt-4 flex items-start gap-2 text-red-600 dark:text-red-400">
                  <AlertCircle className="h-5 w-5 mt-0.5" />
                  <div>
                    <p className="font-medium">Error:</p>
                    <p className="text-sm">{status.error}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ScrapingDashboard;