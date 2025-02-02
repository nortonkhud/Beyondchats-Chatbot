import React, { useState } from 'react';
import { CheckCircle, XCircle, Loader2, RefreshCw } from 'lucide-react';

interface ApiEndpoint {
  name: string;
  url: string;
  method: string;
  status: 'success' | 'error' | 'pending';
  responseTime?: number;
  error?: string;
}

const ApiTest: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [endpoints, setEndpoints] = useState<ApiEndpoint[]>([
    {
      name: 'Authentication',
      url: '/api/auth',
      method: 'POST',
      status: 'pending'
    },
    {
      name: 'Data Retrieval',
      url: '/api/data',
      method: 'GET',
      status: 'pending'
    },
    {
      name: 'Websocket Connection',
      url: '/ws',
      method: 'WS',
      status: 'pending'
    }
  ]);

  const testEndpoint = async (endpoint: ApiEndpoint) => {
    // Simulated API test
    setEndpoints(prev => prev.map(e => 
      e.name === endpoint.name 
        ? { ...e, status: 'pending' }
        : e
    ));

    await new Promise(resolve => setTimeout(resolve, 1500));

    setEndpoints(prev => prev.map(e => 
      e.name === endpoint.name 
        ? { 
            ...e, 
            status: Math.random() > 0.2 ? 'success' : 'error',
            responseTime: Math.floor(Math.random() * 200 + 100),
            error: Math.random() > 0.2 ? undefined : 'Connection timeout'
          }
        : e
    ));
  };

  const testAllEndpoints = async () => {
    setIsLoading(true);
    for (const endpoint of endpoints) {
      await testEndpoint(endpoint);
    }
    setIsLoading(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          API Connection Test
        </h2>
        <button
          onClick={testAllEndpoints}
          disabled={isLoading}
          className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg disabled:opacity-50"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-5 w-5 mr-2 animate-spin" />
              Testing...
            </>
          ) : (
            <>
              <RefreshCw className="h-5 w-5 mr-2" />
              Test All Endpoints
            </>
          )}
        </button>
      </div>

      <div className="grid gap-4">
        {endpoints.map((endpoint, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {endpoint.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {endpoint.method} {endpoint.url}
                </p>
              </div>
              <div className="flex items-center">
                {endpoint.status === 'success' && (
                  <CheckCircle className="h-6 w-6 text-green-500" />
                )}
                {endpoint.status === 'error' && (
                  <XCircle className="h-6 w-6 text-red-500" />
                )}
                {endpoint.status === 'pending' && (
                  <Clock className="h-6 w-6 text-gray-400" />
                )}
              </div>
            </div>

            {endpoint.responseTime && (
              <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Response time: {endpoint.responseTime}ms
              </div>
            )}

            {endpoint.error && (
              <div className="mt-2 text-sm text-red-600">
                Error: {endpoint.error}
              </div>
            )}

            <button
              onClick={() => testEndpoint(endpoint)}
              disabled={isLoading}
              className="mt-4 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50"
            >
              Test Endpoint
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApiTest;