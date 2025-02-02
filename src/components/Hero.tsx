import React from 'react';
import { ArrowRight } from 'lucide-react';

interface HeroProps {
  onGetStarted: () => void;
}

const Hero: React.FC<HeroProps> = ({ onGetStarted }) => {
  return (
    <div className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      {/* Background gradient */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-primary-400/30 to-primary-600/30 blur-3xl dark:from-primary-400/10 dark:to-primary-600/10" />
        <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-primary-400/30 to-primary-600/30 blur-3xl dark:from-primary-400/10 dark:to-primary-600/10" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400">
            Next-Gen AI Chatbots for{' '}
            <span className="text-primary-500">Your Business</span>{' '}
            <span className="inline-block animate-bounce">🚀</span>
          </h1>
          
          <p className="mt-6 text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Automate support, boost engagement, and increase conversions with BeyondChats' 
            AI-powered chatbot. Experience the future of customer interaction.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={onGetStarted}
              className="btn btn-primary group"
            >
              Get Started for Free
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={() => window.dispatchEvent(new CustomEvent('navigate', { detail: 'organization-setup' }))}
              className="btn btn-secondary group"
            >
              Setup Organization
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Trust badges */}
          <div className="mt-16">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Trusted by leading companies worldwide
            </p>
            <div className="flex justify-center items-center gap-8 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all">
              <img src="https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg" alt="Microsoft" className="h-8 dark:invert" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg" alt="AWS" className="h-8" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/6/61/Google_Cloud_Logo.svg" alt="Google Cloud" className="h-8" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;