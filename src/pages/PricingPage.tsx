import React, { useState } from 'react';
import { Check, HelpCircle } from 'lucide-react';

const pricingTiers = [
  {
    name: 'Basic',
    description: 'Perfect for small businesses',
    monthlyPrice: 999,
    yearlyPrice: 9990,
    features: [
      'Up to 500 conversations/month',
      '1 chatbot',
      'Basic customization',
      'Email support',
      'Basic analytics',
      'Website integration'
    ]
  },
  {
    name: 'Pro',
    description: 'For growing companies',
    monthlyPrice: 2499,
    yearlyPrice: 24990,
    popular: true,
    features: [
      'Up to 2,000 conversations/month',
      '3 chatbots',
      'Advanced customization',
      'Priority support',
      'Advanced analytics',
      'All integrations',
      'API access',
      'Custom training'
    ]
  },
  {
    name: 'Enterprise',
    description: 'For large organizations',
    features: [
      'Unlimited conversations',
      'Unlimited chatbots',
      'Full customization',
      '24/7 dedicated support',
      'Custom analytics',
      'All integrations',
      'API access',
      'Custom training',
      'SLA guarantee',
      'Custom development'
    ]
  }
];

const faqs = [
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards, UPI, and net banking. For Enterprise plans, we also support purchase orders and wire transfers.'
  },
  {
    question: 'Can I upgrade or downgrade my plan?',
    answer: 'Yes, you can upgrade or downgrade your plan at any time. The changes will be reflected in your next billing cycle.'
  },
  {
    question: 'Is there a free trial?',
    answer: 'Yes, we offer a 14-day free trial for all our plans. No credit card required.'
  },
  {
    question: 'What happens if I exceed my monthly conversation limit?',
    answer: "We'll notify you when you reach 80% of your limit. You can upgrade your plan or purchase additional conversations as needed."
  }
];

const PricingPage = () => {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Pricing Header */}
      <div className="py-20 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Choose the perfect plan for your business needs
          </p>
          
          {/* Billing Toggle */}
          <div className="flex items-center justify-center space-x-4">
            <span className={`${!isYearly ? 'text-white' : 'text-gray-400'}`}>Monthly</span>
            <button
              onClick={() => setIsYearly(!isYearly)}
              className="relative inline-flex h-6 w-11 items-center rounded-full bg-red-600"
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                  isYearly ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            <span className={`${isYearly ? 'text-white' : 'text-gray-400'}`}>
              Yearly (Save 20%)
            </span>
          </div>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingTiers.map((tier, index) => (
            <div
              key={index}
              className={`relative bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 ${
                tier.popular ? 'border-2 border-red-600' : ''
              }`}
            >
              {tier.popular && (
                <div className="absolute top-0 right-6 transform -translate-y-1/2">
                  <div className="bg-red-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </div>
                </div>
              )}
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {tier.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">{tier.description}</p>
              {tier.name === 'Enterprise' ? (
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                  Custom
                  <div className="text-base font-normal text-gray-600 dark:text-gray-400 mt-2">
                    Contact us for pricing
                  </div>
                </div>
              ) : (
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                  ₹{isYearly ? tier.yearlyPrice.toLocaleString() : tier.monthlyPrice.toLocaleString()}
                  <span className="text-base font-normal text-gray-600 dark:text-gray-400">
                    /{isYearly ? 'year' : 'month'}
                  </span>
                </div>
              )}
              <ul className="space-y-4 mb-8">
                {tier.features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span className="text-gray-600 dark:text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                className={`w-full py-3 px-4 rounded-lg font-semibold ${
                  tier.popular
                    ? 'bg-red-600 text-white hover:bg-red-700'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600'
                } transition-colors`}
              >
                {tier.name === 'Enterprise' ? 'Contact Sales' : 'Get Started'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* FAQs */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
          Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
                <HelpCircle className="h-5 w-5 text-red-600 mr-2" />
                {faq.question}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Payment Methods */}
      <div className="bg-white dark:bg-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Secure Payment Methods
            </h3>
            <div className="flex justify-center items-center space-x-6">
              <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-8 dark:invert" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-8" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg" alt="Stripe" className="h-8 dark:invert" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/e/ef/UPI-Logo-vector.svg" alt="UPI" className="h-8" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;