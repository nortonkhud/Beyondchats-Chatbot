import React, { useState, useEffect } from 'react';
import { ArrowRight, Loader2, CheckCircle2, AlertCircle, Globe, FileText, Bot, Share2 } from 'lucide-react';
import ScrapingDashboard from '../components/scraping/ScrapingDashboard';

interface OrganizationSetup {
  companyName: string;
  websiteUrl: string;
  description: string;
}

const OrganizationSetupPage = () => {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [organizationData, setOrganizationData] = useState<OrganizationSetup>({
    companyName: '',
    websiteUrl: '',
    description: ''
  });
  const [metaDescription, setMetaDescription] = useState<string | null>(null);
  const [scrapingStarted, setScrapingStarted] = useState(false);
  const [integrationSuccess, setIntegrationSuccess] = useState(false);

  const fetchMetaDescription = async (url: string) => {
    setIsLoading(true);
    try {
      // Simulated API call to fetch meta description
      await new Promise(resolve => setTimeout(resolve, 1000));
      const mockDescription = "Leading provider of innovative solutions for businesses worldwide.";
      setMetaDescription(mockDescription);
      setOrganizationData(prev => ({ ...prev, description: mockDescription }));
    } catch (err) {
      setError('Failed to fetch website description. Please enter manually.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleWebsiteUrlChange = (url: string) => {
    setOrganizationData(prev => ({ ...prev, websiteUrl: url }));
    if (url.match(/^https?:\/\/.+/)) {
      fetchMetaDescription(url);
    }
  };

  const startScraping = () => {
    setScrapingStarted(true);
    setStep(2);
  };

  const handleIntegrationSuccess = () => {
    setIntegrationSuccess(true);
    // Show confetti animation here
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Company Name
              </label>
              <input
                type="text"
                value={organizationData.companyName}
                onChange={(e) => setOrganizationData(prev => ({ ...prev, companyName: e.target.value }))}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-red-500 dark:bg-gray-800"
                placeholder="Enter your company name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Website URL
              </label>
              <input
                type="url"
                value={organizationData.websiteUrl}
                onChange={(e) => handleWebsiteUrlChange(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-red-500 dark:bg-gray-800"
                placeholder="https://example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Description
              </label>
              <div className="relative">
                <textarea
                  value={organizationData.description}
                  onChange={(e) => setOrganizationData(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-red-500 dark:bg-gray-800"
                  rows={4}
                  placeholder="Enter company description"
                />
                {isLoading && (
                  <div className="absolute right-3 top-3">
                    <Loader2 className="h-5 w-5 animate-spin text-gray-400" />
                  </div>
                )}
              </div>
              {metaDescription && (
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 flex items-center">
                  <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                  Auto-fetched from website
                </p>
              )}
            </div>

            <button
              onClick={startScraping}
              disabled={!organizationData.companyName || !organizationData.websiteUrl}
              className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-red-700 transition-colors"
            >
              Start Website Scraping
            </button>
          </div>
        );

      case 2:
        return (
          <div className="space-y-8">
            <ScrapingDashboard organizationId="123" />
            
            <div className="flex justify-between">
              <button
                onClick={() => setStep(3)}
                className="bg-red-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors"
              >
                Continue to Integration
              </button>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <button
                onClick={() => window.open('/test-chatbot', '_blank')}
                className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
              >
                <Bot className="h-8 w-8 text-red-600 mb-4" />
                <h3 className="text-lg font-semibold mb-2">Test Chatbot</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Preview your chatbot in action
                </p>
              </button>

              <button
                onClick={() => {/* Show integration modal */}}
                className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
              >
                <Globe className="h-8 w-8 text-red-600 mb-4" />
                <h3 className="text-lg font-semibold mb-2">Integrate Website</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Get integration instructions
                </p>
              </button>

              <button
                onClick={() => handleIntegrationSuccess()}
                className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
              >
                <FileText className="h-8 w-8 text-red-600 mb-4" />
                <h3 className="text-lg font-semibold mb-2">Test Integration</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Verify your setup
                </p>
              </button>
            </div>

            {integrationSuccess && (
              <div className="text-center space-y-6">
                <div className="animate-bounce">
                  🎉
                </div>
                <h3 className="text-2xl font-bold text-green-600">
                  Integration Successful!
                </h3>
                <div className="flex justify-center gap-4">
                  <button className="bg-red-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors">
                    Explore Admin Panel
                  </button>
                  <button className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-6 py-2 rounded-lg font-semibold border border-gray-300 dark:border-gray-600">
                    Start Chatting
                  </button>
                </div>
                <div className="flex justify-center gap-4 mt-4">
                  <Share2 className="h-6 w-6 text-gray-600 dark:text-gray-400 cursor-pointer hover:text-red-600 transition-colors" />
                </div>
              </div>
            )}
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8">
          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              {['Organization Details', 'Website Scraping', 'Integration'].map((stepName, index) => (
                <div
                  key={index}
                  className={`flex items-center ${
                    index < step ? 'text-red-600' : 'text-gray-400'
                  }`}
                >
                  <div className={`
                    w-8 h-8 rounded-full flex items-center justify-center
                    ${index + 1 === step ? 'bg-red-600 text-white' : 
                      index + 1 < step ? 'bg-green-500 text-white' : 
                      'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'}
                  `}>
                    {index + 1 < step ? (
                      <CheckCircle2 className="h-5 w-5" />
                    ) : (
                      index + 1
                    )}
                  </div>
                  {index < 2 && (
                    <div className={`w-full h-1 mx-2 ${
                      index + 1 < step ? 'bg-red-600' : 'bg-gray-200 dark:bg-gray-700'
                    }`} />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between">
              {['Organization Details', 'Website Scraping', 'Integration'].map((stepName, index) => (
                <span
                  key={index}
                  className={`text-sm font-medium ${
                    index + 1 === step ? 'text-red-600' : 'text-gray-500 dark:text-gray-400'
                  }`}
                >
                  {stepName}
                </span>
              ))}
            </div>
          </div>

          {/* Step Content */}
          {renderStep()}

          {/* Error Message */}
          {error && (
            <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg flex items-center">
              <AlertCircle className="h-5 w-5 mr-2" />
              {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrganizationSetupPage;