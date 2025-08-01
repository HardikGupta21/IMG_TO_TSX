escript
'use client';

import React, { useState } from 'react';

// --- TypeScript Interfaces ---
interface Feature {
  id: string;
  name: string;
}

interface PricingPlan {
  id: string;
  name: string;
  monthlyPrice: number;
  annualPrice: number;
  description: string;
  features: Feature[];
  isHighlighted?: boolean;
}

// --- Icon Component (for Checkmark) ---
// This could be replaced with an actual SVG icon library like Heroicons
const CheckmarkIcon: React.FC = () => (
  <svg
    className="text-blue-600 w-5 h-5 inline-block align-middle mr-2"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
  </svg>
);

// --- Main Page Component ---
const PricingPage: React.FC = () => {
  const [isAnnual, setIsAnnual] = useState(false); // State for monthly/annual toggle

  const plans: PricingPlan[] = [
    {
      id: 'basic',
      name: 'Basic',
      monthlyPrice: 19,
      annualPrice: 199,
      description: 'Perfect for small teams and individuals getting started.',
      features: [
        { id: 'f1', name: '5 Projects' },
        { id: 'f2', name: '10 GB Storage' },
        { id: 'f3', name: 'Basic Analytics' },
        { id: 'f4', name: 'Email Support' },
      ],
    },
    {
      id: 'standard',
      name: 'Standard',
      monthlyPrice: 49,
      annualPrice: 499,
      description: 'Ideal for growing businesses needing more power.',
      features: [
        { id: 'f5', name: 'Unlimited Projects' },
        { id: 'f6', name: '100 GB Storage' },
        { id: 'f7', name: 'Advanced Analytics' },
        { id: 'f8', name: 'Priority Email Support' },
        { id: 'f9', name: 'Customizable Dashboards' },
      ],
    },
    {
      id: 'pro',
      name: 'Pro',
      monthlyPrice: 99,
      annualPrice: 999,
      description: 'For power users and large teams with demanding needs.',
      features: [
        { id: 'f10', name: 'Unlimited Projects' },
        { id: 'f11', name: '500 GB Storage' },
        { id: 'f12', name: 'Real-time Analytics' },
        { id: 'f13', name: '24/7 Phone & Email Support' },
        { id: 'f14', name: 'Dedicated Account Manager' },
        { id: 'f15', name: 'API Access' },
      ],
      isHighlighted: true,
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      monthlyPrice: 249, // Placeholder, usually custom pricing
      annualPrice: 2499, // Placeholder
      description: 'Tailored solutions for large organizations.',
      features: [
        { id: 'f16', name: 'Custom Integrations' },
        { id: 'f17', name: 'Unlimited Storage' },
        { id: 'f18', name: 'On-premise Deployment' },
        { id: 'f19', name: 'Dedicated Support Team' },
        { id: 'f20', name: 'SLA Guarantee' },
        { id: 'f21', name: 'Single Sign-On (SSO)' },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans antialiased flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm py-4 px-8 flex justify-between items-center z-10 sticky top-0">
        <div className="flex items-center">
          <a href="#" className="text-2xl font-bold text-gray-800">YourLogo</a>
          <nav className="ml-10 hidden md:flex space-x-6">
            <a href="#" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Features</a>
            <a href="#" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Pricing</a>
            <a href="#" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Contact</a>
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <button className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Sign In</button>
          <button className="bg-blue-600 text-white py-2 px-5 rounded-md font-semibold hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-blue-400">Sign Up</button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow pt-16 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <section className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 text-center leading-tight">
              Choose the perfect plan for your business
            </h1>
            <p className="text-lg md:text-xl text-gray-600 text-center max-w-3xl mx-auto mt-4">
              Simple, transparent pricing that scales with your needs. No hidden fees, cancel anytime.
            </p>

            {/* Billing Toggle */}
            <div className="flex justify-center mt-10">
              <div
                className="flex items-center space-x-4 bg-gray-100 p-2 rounded-full cursor-pointer"
                onClick={() => setIsAnnual(!isAnnual)}
              >
                <span
                  className={`py-2 px-6 rounded-full text-sm font-semibold transition-colors duration-300 ${
                    !isAnnual ? 'bg-blue-600 text-white shadow' : 'text-gray-700'
                  }`}
                >
                  Monthly Billing
                </span>
                <span
                  className={`py-2 px-6 rounded-full text-sm font-semibold transition-colors duration-300 ${
                    isAnnual ? 'bg-blue-600 text-white shadow' : 'text-gray-700'
                  }`}
                >
                  Annual Billing
                </span>
                {isAnnual && (
                  <span className="absolute ml-64 -mt-10 bg-yellow-400 text-yellow-900 text-xs font-bold py-1 px-2 rounded-full transform rotate-3 -translate-y-2">
                    Save 10%!
                  </span>
                )}
              </div>
            </div>
          </section>

          {/* Pricing Cards */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={
                  plan.isHighlighted
                    ? 'bg-blue-600 text-white p-8 md:p-10 rounded-xl shadow-xl border-2 border-blue-800 scale-105 transform transition-transform duration-300 ease-in-out relative flex flex-col justify-between'
                    : 'bg-white p-6 md:p-8 rounded-xl shadow-md border border-gray-200 text-center flex flex-col justify-between'
                }
              >
                {plan.isHighlighted && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-800 text-white text-xs font-bold py-1.5 px-4 rounded-full shadow-lg">
                    Most Popular
                  </div>
                )}
                <div className="mb-8 flex-grow">
                  <h3
                    className={`text-2xl font-bold mb-2 ${
                      plan.isHighlighted ? 'text-white' : 'text-gray-800'
                    }`}
                  >
                    {plan.name}
                  </h3>
                  <p
                    className={`text-sm mb-6 ${
                      plan.isHighlighted ? 'text-blue-100' : 'text-gray-600'
                    }`}
                  >
                    {plan.description}
                  </p>
                  <div className="flex items-baseline justify-center mb-8">
                    <span
                      className={`text-5xl font-extrabold ${
                        plan.isHighlighted ? 'text-white' : 'text-gray-900'
                      }`}
                    >
                      ${isAnnual ? plan.annualPrice : plan.monthlyPrice}
                    </span>
                    <span
                      className={`text-xl font-medium ${
                        plan.isHighlighted ? 'text-blue-100' : 'text-gray-600'
                      }`}
                    >
                      /{isAnnual ? 'year' : 'month'}
                    </span>
                  </div>
                  <ul className={`text-left space-y-3 ${plan.isHighlighted ? 'text-blue-100' : 'text-gray-700'}`}>
                    {plan.features.map((feature) => (
                      <li key={feature.id}>
                        <CheckmarkIcon /> {feature.name}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-auto">
                  {plan.isHighlighted ? (
                    <button className="bg-white text-blue-600 py-3 px-6 rounded-md font-semibold hover:bg-blue-50 transition-colors w-full focus:outline-none focus:ring-2 focus:ring-white">
                      Get Started
                    </button>
                  ) : plan.id === 'enterprise' ? (
                    <button className="bg-teal-500 text-white py-3 px-6 rounded-md font-semibold hover:opacity-90 transition-opacity w-full focus:outline-none focus:ring-2 focus:ring-teal-300">
                      Contact Sales
                    </button>
                  ) : (
                    <button className="bg-blue-600 text-white py-3 px-6 rounded-md font-semibold hover:opacity-90 transition-opacity w-full focus:outline-none focus:ring-2 focus:ring-blue-400">
                      Choose Plan
                    </button>
                  )}
                </div>
              </div>
            ))}
          </section>
        </div>
      </main>

      {/* Newsletter Section */}
      <section className="bg-blue-600 text-white py-16 px-8 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
            Stay Updated with Our Newsletter
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Join thousands of professionals and get the latest updates, tips, and exclusive offers directly to your inbox.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="border border-gray-300 p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800"
              required
            />
            <button
              type="submit"
              className="bg-teal-500 text-white py-3 px-6 rounded-md font-semibold hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-teal-300 flex-shrink-0"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* Basic Footer (Optional, but good for completeness) */}
      <footer className="bg-gray-800 text-gray-400 py-8 px-8 text-center text-sm">
        <p>&copy; {new Date().getFullYear()} YourCompany. All rights reserved.</p>
        <div className="mt-2 space-x-4">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
        </div>
      </footer>
    </div>
  );
};

export default PricingPage;
