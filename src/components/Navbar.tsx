import React, { useState, useEffect } from 'react';
import { MessageSquare, Menu, X, HelpCircle, Sun, Moon } from 'lucide-react';

interface NavbarProps {
  onAuthClick: (mode: 'login' | 'signup') => void;
  isAuthenticated?: boolean;
  onLogout?: () => void;
  onNavigate: (page: string) => void;
  currentPage: string;
}

const Navbar: React.FC<NavbarProps> = ({ 
  onAuthClick, 
  isAuthenticated, 
  onLogout,
  onNavigate,
  currentPage
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    setIsDark(isDarkMode);
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, []);

  const toggleDarkMode = () => {
    const newMode = !isDark;
    setIsDark(newMode);
    localStorage.setItem('darkMode', String(newMode));
    document.documentElement.classList.toggle('dark', newMode);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavigation = (page: string) => {
    onNavigate(page);
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl z-50 border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div 
            className="flex items-center cursor-pointer group"
            onClick={() => handleNavigation('home')}
          >
            <MessageSquare className="h-8 w-8 text-primary-500 group-hover:scale-110 transition-transform" />
            <span className="ml-2 text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-500 to-primary-600">
              BeyondChats
            </span>
          </div>
          
          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <button 
              onClick={() => handleNavigation('home')}
              className={`nav-link ${currentPage === 'home' ? 'nav-link-active' : ''}`}
            >
              Home
            </button>
            <button 
              onClick={() => handleNavigation('features')}
              className={`nav-link ${currentPage === 'features' ? 'nav-link-active' : ''}`}
            >
              Features
            </button>
            <button 
              onClick={() => handleNavigation('pricing')}
              className={`nav-link ${currentPage === 'pricing' ? 'nav-link-active' : ''}`}
            >
              Pricing
            </button>
            <button 
              onClick={() => handleNavigation('about')}
              className={`nav-link ${currentPage === 'about' ? 'nav-link-active' : ''}`}
            >
              About
            </button>
            
            {isAuthenticated ? (
              <>
                <div className="relative">
                  <button
                    onMouseEnter={() => setShowTooltip(true)}
                    onMouseLeave={() => setShowTooltip(false)}
                    onClick={() => handleNavigation('organization-setup')}
                    className="nav-link flex items-center"
                  >
                    Organization Setup
                    <HelpCircle className="h-4 w-4 ml-1" />
                  </button>
                  {showTooltip && (
                    <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg shadow-lg w-48 text-center animate-fade-in">
                      Configure your organization settings and preferences
                    </div>
                  )}
                </div>
                <button
                  onClick={onLogout}
                  className="btn btn-secondary ml-4"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => onAuthClick('login')}
                  className="btn btn-secondary"
                >
                  Login
                </button>
                <button
                  onClick={() => onAuthClick('signup')}
                  className="btn btn-primary ml-4"
                >
                  Get Started
                </button>
              </>
            )}

            <button
              onClick={toggleDarkMode}
              className="ml-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle dark mode"
            >
              {isDark ? (
                <Sun className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              ) : (
                <Moon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              )}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-4">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle dark mode"
            >
              {isDark ? (
                <Sun className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              ) : (
                <Moon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              )}
            </button>
            <button
              onClick={toggleMenu}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6 text-gray-600 dark:text-gray-400" />
              ) : (
                <Menu className="h-6 w-6 text-gray-600 dark:text-gray-400" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 animate-slide-down">
            <div className="flex flex-col space-y-4">
              <button 
                onClick={() => handleNavigation('home')}
                className={`nav-link text-left ${currentPage === 'home' ? 'nav-link-active' : ''}`}
              >
                Home
              </button>
              <button 
                onClick={() => handleNavigation('features')}
                className={`nav-link text-left ${currentPage === 'features' ? 'nav-link-active' : ''}`}
              >
                Features
              </button>
              <button 
                onClick={() => handleNavigation('pricing')}
                className={`nav-link text-left ${currentPage === 'pricing' ? 'nav-link-active' : ''}`}
              >
                Pricing
              </button>
              <button 
                onClick={() => handleNavigation('about')}
                className={`nav-link text-left ${currentPage === 'about' ? 'nav-link-active' : ''}`}
              >
                About
              </button>
              
              {isAuthenticated ? (
                <>
                  <button
                    onClick={() => handleNavigation('organization-setup')}
                    className="nav-link text-left flex items-center"
                  >
                    Organization Setup
                    <HelpCircle className="h-4 w-4 ml-1" />
                  </button>
                  <button
                    onClick={onLogout}
                    className="btn btn-secondary w-full"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => onAuthClick('login')}
                    className="btn btn-secondary w-full"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => onAuthClick('signup')}
                    className="btn btn-primary w-full"
                  >
                    Get Started
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;