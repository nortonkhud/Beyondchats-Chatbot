import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Footer from './components/Footer';
import FeaturesPage from './pages/FeaturesPage';
import PricingPage from './pages/PricingPage';
import AboutPage from './pages/AboutPage';
import OrganizationSetupPage from './pages/OrganizationSetupPage';
import AuthModal from './components/AuthModal';
import { getStoredAuthState, logout } from './lib/auth';
import type { AuthState } from './types/auth';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [authState, setAuthState] = useState<AuthState>(getStoredAuthState() || {
    user: null,
    isAuthenticated: false,
    rememberMe: false
  });

  useEffect(() => {
    // Listen for navigation events
    const handleNavigation = (event: CustomEvent) => {
      setCurrentPage(event.detail);
    };

    window.addEventListener('navigate', handleNavigation as EventListener);

    return () => {
      window.removeEventListener('navigate', handleNavigation as EventListener);
    };
  }, []);

  const openAuthModal = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  const handleLogout = () => {
    logout();
    setAuthState({
      user: null,
      isAuthenticated: false,
      rememberMe: false
    });
    setCurrentPage('home');
  };

  const handleAuthSuccess = () => {
    setAuthState(getStoredAuthState() || {
      user: null,
      isAuthenticated: false,
      rememberMe: false
    });
    setIsAuthModalOpen(false);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'features':
        return <FeaturesPage />;
      case 'pricing':
        return <PricingPage />;
      case 'about':
        return <AboutPage />;
      case 'organization-setup':
        return <OrganizationSetupPage />;
      default:
        return (
          <>
            <Hero onGetStarted={() => openAuthModal('signup')} />
            <Features />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <Navbar 
        onAuthClick={openAuthModal}
        isAuthenticated={authState.isAuthenticated}
        onLogout={handleLogout}
        onNavigate={setCurrentPage}
        currentPage={currentPage}
      />
      {renderPage()}
      <Footer />
      <AuthModal 
        isOpen={isAuthModalOpen} 
        mode={authMode}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={handleAuthSuccess}
      />
    </div>
  );
}

export default App;