import React, { useState } from 'react';
import { MessageSquare, Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    setEmail('');
  };

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-4">
              <MessageSquare className="h-8 w-8 text-red-600" />
              <span className="ml-2 text-xl font-bold text-white">BeyondChats</span>
            </div>
            <p className="mb-4">Empowering businesses with next-generation AI chatbot solutions.</p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-red-600"><Facebook className="h-5 w-5" /></a>
              <a href="#" className="hover:text-red-600"><Twitter className="h-5 w-5" /></a>
              <a href="#" className="hover:text-red-600"><Linkedin className="h-5 w-5" /></a>
              <a href="#" className="hover:text-red-600"><Instagram className="h-5 w-5" /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/features" className="hover:text-red-600">Features</a></li>
              <li><a href="/pricing" className="hover:text-red-600">Pricing</a></li>
              <li><a href="/about" className="hover:text-red-600">About Us</a></li>
              <li><a href="/blog" className="hover:text-red-600">Blog</a></li>
              <li><a href="/careers" className="hover:text-red-600">Careers</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Support</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Mail className="h-4 w-4 mr-2" />
                support@beyondchats.com
              </li>
              <li className="flex items-center">
                <Phone className="h-4 w-4 mr-2" />
                +91 (800) 123-4567
              </li>
              <li className="flex items-center">
                <MapPin className="h-4 w-4 mr-2" />
                123 Tech Park, Bangalore
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Newsletter</h3>
            <p className="mb-4">Subscribe to our newsletter for updates and insights.</p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-red-600 focus:border-transparent"
                required
              />
              <button
                type="submit"
                className="w-full bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Legal */}
        <div className="mt-8 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm">
              © {new Date().getFullYear()} BeyondChats. All rights reserved.
            </div>
            <div className="flex space-x-4 mt-4 md:mt-0 text-sm">
              <a href="/privacy" className="hover:text-red-600">Privacy Policy</a>
              <a href="/terms" className="hover:text-red-600">Terms of Service</a>
              <a href="/cookies" className="hover:text-red-600">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;