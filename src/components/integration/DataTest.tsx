import React, { useState } from 'react';
import { CheckCircle, XCircle, Loader2, Database } from 'lucide-react';

interface DataValidation {
  field: string;
  status: 'valid' | 'invalid' | 'pending';
  value: any;
  error?: string;
}

const DataTest: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [validations, setValidations] = useState<DataValidation[]>([
    {
      field: 'User Data',
      status: 'pending',
      value: { id: 1, name: 'John Doe', email: 'john@example.com' }
    },
    {
      field: 'Chat History',
      status: 'pending',
      value: [
        { message: 'Hello', timestamp: '2024-02-20T10:00:00Z' },
        { message: 'Hi there!', timestamp: '2024-02-20T10:01:00Z' }
      ]
    },
    {
      field: 'Settings',
      status: 'pending',
      value: { theme: 'dark', notifications: true }
    }
  ]);

  const validateData = async () => {
    setIsLoading(true);
    
    for (let i = 0; i < validations.length; i++) {
      // Simulate validation process
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setValidations(prev => prev.map((v, index) => 
        index === i 
          ? {
              ...v,
              status: Math.random() > 0.2 ? 'valid' : 'invalid',
              error: Math.random() > 0.2 ? undefined : 'Invalid data format'
            }
          : v
      ));
    }
    
    setIsLoading(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Data Flow Test
        </h2>
        <button
          onClick={validateData}
          disabled={isLoading}
          className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg disabled:opacity-50"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-5 w-5 mr-2 animate-spin" />
              Validating...
            </>
          ) : (
            <>
              <Database className="h-5 w-5 mr-2" />
              Validate All Data
            </>
          )}
        </button>
      </div>

      <div className="grid gap-4">
        {validations.map((validation, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {validation.field}
                </h3>
                <div className="mt-2">
                  <pre className="text-sm bg-gray-100 dark:bg-gray-900 p-3 rounded-lg overflow-auto">
                    {JSON.stringify(validation.value, null, 2)}
                  </pre>
                </div>
              </div>
              <div>
                {validation.status === 'valid' && (
                  <CheckCircle className="h-6 w-6 text-green-500" />
                )}
                {validation.status === 'invalid' && (
                  <XCircle className="h-6 w-6 text-red-500" />
                )}
                {validation.status === 'pending' && (
                  <div className="h-6 w-6 rounded-full border-2 border-gray-300 dark:border-gray-600" />
                )}
              </div>
            </div>

            {validation.error && (
              <div className="mt-2 text-sm text-red-600">
                Error: {validation.error}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DataTest;