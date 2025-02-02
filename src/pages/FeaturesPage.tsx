import React from 'react';
import { Bot, MessageSquare, Globe2, Code2, Settings2, Clock, Zap, Shield, Puzzle, Share2, BarChart2, Database } from 'lucide-react';

const features = {
  core: [
    {
      icon: Bot,
      title: 'AI-Powered Responses',
      description: 'Advanced natural language processing for human-like conversations.'
    },
    {
      icon: Globe2,
      title: 'Multi-Channel Support',
      description: 'Deploy across websites, WhatsApp, Messenger, and more.'
    },
    {
      icon: Code2,
      title: 'No-Code Builder',
      description: 'Visual interface for easy chatbot customization.'
    }
  ],
  advanced: [
    {
      icon: Zap,
      title: 'Auto-Learning',
      description: 'Continuously improves from customer interactions.'
    },
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'Bank-grade encryption and data protection.'
    },
    {
      icon: Database,
      title: 'Knowledge Base',
      description: 'Automatic FAQ generation from your content.'
    }
  ],
  integrations: [
    {
      icon: Puzzle,
      title: 'CRM Integration',
      description: 'Seamless connection with popular CRM platforms.'
    },
    {
      icon: Share2,
      title: 'API Access',
      description: 'Custom integrations via RESTful API.'
    },
    {
      icon: BarChart2,
      title: 'Analytics',
      description: 'Detailed insights and performance metrics.'
    }
  ]
};

const testimonials = [
  {
    name: 'Priya Sharma',
    role: 'CTO, TechCorp India',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&h=200',
    quote: 'BeyondChats has transformed our customer support. The AI accuracy is impressive!'
  },
  {
    name: 'Rahul Mehta',
    role: 'CEO, StartupX',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&h=200',
    quote: 'Implementing BeyondChats reduced our response time by 80%. Amazing product!'
  }
];

const FeaturesPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Powerful Features for Modern Businesses
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Discover how BeyondChats can transform your customer experience with cutting-edge AI technology.
          </p>
        </div>
      </div>

      {/* Feature Sections */}
      {Object.entries(features).map(([category, items], index) => (
        <section key={category} className="py-16 bg-white dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white capitalize">
              {category.replace('_', ' ')} Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {items.map((feature, i) => (
                <div key={i} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                  <feature.icon className="h-12 w-12 text-red-600 mb-4" />
                  <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Testimonials */}
      <section className="py-16 bg-gray-100 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            What Our Customers Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      {testimonial.name}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300 italic">
                  "{testimonial.quote}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-red-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Transform Your Customer Experience?
          </h2>
          <button className="bg-white text-red-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors">
            Get Started Now
          </button>
        </div>
      </section>
    </div>
  );
};

export default FeaturesPage;