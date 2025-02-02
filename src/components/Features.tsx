import React from 'react';
import { Bot, MessageSquare, Code2, Globe2, Settings2, Clock } from 'lucide-react';

const features = [
  {
    icon: Bot,
    title: 'Smart AI Responses',
    description: 'AI-powered responses that understand intent and context.',
  },
  {
    icon: Globe2,
    title: 'Multi-Channel Integration',
    description: 'Integrates seamlessly with websites, WhatsApp, Messenger, and more.',
  },
  {
    icon: Code2,
    title: 'No-Code Setup',
    description: 'Easy-to-use interface—no coding required!',
  },
  {
    icon: Bot,
    title: 'Auto-Training from Website',
    description: 'The chatbot scrapes and learns automatically from your business website.',
  },
  {
    icon: Settings2,
    title: 'Customizable & Scalable',
    description: 'Personalize branding and adapt AI models to your needs.',
  },
  {
    icon: Clock,
    title: '24/7 Support',
    description: 'Reliable AI assistance anytime, anywhere.',
  },
];

const Features = () => {
  return (
    <div id="features" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
            Powerful Features
          </h2>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
            Everything you need to build exceptional customer experiences
          </p>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg"
            >
              <feature.icon className="h-12 w-12 text-red-600" />
              <h3 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white">
                {feature.title}
              </h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Features;