import React from 'react';
import { Settings2, Users, Activity, Database, BarChart2 } from 'lucide-react';
import OrganizationProfile from './OrganizationProfile';
import UserManagement from './UserManagement';
import ActivityLogs from './ActivityLogs';
import ScrapingMonitor from './ScrapingMonitor';
import SystemSettings from './SystemSettings';

interface AdminDashboardProps {
  organizationId: string;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ organizationId }) => {
  const [activeTab, setActiveTab] = React.useState('profile');

  const tabs = [
    { id: 'profile', name: 'Organization Profile', icon: Database },
    { id: 'users', name: 'User Management', icon: Users },
    { id: 'activity', name: 'Activity Logs', icon: Activity },
    { id: 'scraping', name: 'Website Scraping', icon: BarChart2 },
    { id: 'settings', name: 'System Settings', icon: Settings2 },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return <OrganizationProfile organizationId={organizationId} />;
      case 'users':
        return <UserManagement organizationId={organizationId} />;
      case 'activity':
        return <ActivityLogs organizationId={organizationId} />;
      case 'scraping':
        return <ScrapingMonitor organizationId={organizationId} />;
      case 'settings':
        return <SystemSettings organizationId={organizationId} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white dark:bg-gray-800 h-screen fixed shadow-lg">
          <div className="p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Admin Dashboard
            </h2>
          </div>
          <nav className="mt-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center px-6 py-3 text-left ${
                  activeTab === tab.id
                    ? 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                <tab.icon className="h-5 w-5 mr-3" />
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="ml-64 flex-1 p-8">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;