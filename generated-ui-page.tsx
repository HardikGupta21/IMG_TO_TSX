// Generated Next.js Page Component
// Place this file in: pages/generated-ui.tsx or app/generated-ui/page.tsx
// Run with: npm run dev and visit /generated-ui

escript
import React, { useState } from 'react';

// --- Interfaces ---

interface FeatureItemProps {
  text: string;
}

interface PricingPlanProps {
  name: string;
  priceMonthly: number;
  priceAnnually: number;
  features: string[];
  buttonText: string;
  isHighlighted?: boolean;
}

// --- Components ---

const CheckmarkIcon: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 text-teal-400"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
      clipRule="evenodd"
    />
  </svg>
);

const FeatureItem: React.FC<FeatureItemProps> = ({ text }) => (
  <li className="flex items-center space-x-3">
    <CheckmarkIcon />
    <span className="text-gray-600">{text}</span>
  </li>
);

const PricingCard: React.FC<PricingPlanProps> = ({
  name,
  priceMonthly,
  priceAnnually,
  features,
  buttonText,
  isHighlighted = false,
}) => {
  const [isAnnual, setIsAnnual] = useState(false); // State to toggle between monthly/annually

  const currentPrice = isAnnual ? priceAnnually : priceMonthly;
  const pricePeriod = isAnnual ? '/year' : '/month';

  const primaryBtnClass = "bg-blue-500 text-white font-semibold py-3 px-6 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50";
  const secondaryBtnClass = "bg-teal-400 text-white font-semibold py-3 px-6 rounded-md hover:bg-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-opacity-50";

  return (
    <div
      className={`flex flex-col p-6 rounded-xl shadow-lg transition-all duration-300 ${
        isHighlighted ? 'bg-blue-500 text-white transform scale-105' : 'bg-white text-gray-800'
      }`}
    >
      <h3
        className={`text-2xl font-bold mb-2 ${
          isHighlighted ? 'text-white' : 'text-gray-900'
        }`}
      >
        {name}
      </h3>
      <p
        className={`mb-4 ${
          isHighlighted ? 'text-blue-100' : 'text-gray-500'
        }`}
      >
        {name} plan description.
      </p>
      <div className="flex items-baseline mb-6">
        <span
          className={`text-5xl font-extrabold ${
            isHighlighted ? 'text-white' : 'text-gray-900'
          }`}
        >
          ${currentPrice}
        </span>
        <span
          className={`text-xl font-medium ${
            isHighlighted ? 'text-blue-200' : 'text-gray-500'
          }`}
        >
          {pricePeriod}
        </span>
      </div>
      <ul className="flex-grow space-y-3 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center space-x-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-5 w-5 ${
                isHighlighted ? 'text-white' : 'text-teal-400'
              }`}
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span
              className={`${isHighlighted ? 'text-blue-100' : 'text-gray-600'}`}
            >
              {feature}
            </span>
          </li>
        ))}
      </ul>
      <button
        onClick={() => alert(`Selected ${name} Plan!`)}
        className={isHighlighted ? secondaryBtnClass : primaryBtnClass}
      >
        {buttonText}
      </button>
    </div>
  );
};

const Header: React.FC = () => (
  <header className="bg-white shadow-sm py-4">
    <div className="container mx-auto px-6 flex justify-between items-center">
      <div className="text-2xl font-bold text-gray-900">
        My<span className="text-blue-500">Service</span>
      </div>
      <nav className="hidden md:flex space-x-8">
        <a href="#" className="text-gray-600 hover:text-blue-500 transition-colors duration-200">
          Features
        </a>
        <a href="#" className="text-gray-600 hover:text-blue-500 transition-colors duration-200">
          Pricing
        </a>
        <a href="#" className="text-gray-600 hover:text-blue-500 transition-colors duration-200">
          Docs
        </a>
        <a href="#" className="text-gray-600 hover:text-blue-500 transition-colors duration-200">
          Contact
        </a>
      </nav>
      <button className="hidden md:block bg-blue-500 text-white font-semibold py-2 px-5 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
        Sign Up
      </button>
      <div className="md:hidden">
        <button className="text-gray-600 hover:text-blue-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
    </div>
  </header>
);

const PricingSection: React.FC = () => {
  const [users, setUsers] = useState<number>(500); // Simulate user count slider

  const pricingPlans: PricingPlanProps[] = [
    {
      name: 'Basic',
      priceMonthly: 19,
      priceAnnually: 199,
      features: ['10 Users', 'Basic Features', 'Email Support', '5GB Storage'],
      buttonText: 'Get Started',
    },
    {
      name: 'Standard',
      priceMonthly: 49,
      priceAnnually: 499,
      features: [
        '50 Users',
        'Advanced Features',
        'Priority Email Support',
        '50GB Storage',
        'Custom Reports',
      ],
      buttonText: 'Get Started',
    },
    {
      name: 'Pro',
      priceMonthly: 99,
      priceAnnually: 999,
      features: [
        'Unlimited Users',
        'All Features',
        '24/7 Phone & Email Support',
        'Unlimited Storage',
        'Dedicated Account Manager',
        'API Access',
      ],
      buttonText: 'Upgrade Now',
      isHighlighted: true,
    },
    {
      name: 'Enterprise',
      priceMonthly: 299,
      priceAnnually: 2999,
      features: [
        'Custom Users',
        'All Pro Features',
        'SLA Guaranteed Support',
        'On-premise Deployment',
        'Single Sign-On (SSO)',
        'Custom Integrations',
      ],
      buttonText: 'Contact Sales',
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
          Simple, transparent pricing
        </h2>
        <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
          Choose the plan that's right for you and your team. Scale up or down
          as your needs change.
        </p>

        {/* User Count Slider/Toggle */}
        <div className="flex flex-col items-center mb-12">
          <label htmlFor="user-count" className="text-lg font-medium text-gray-700 mb-2">
            Users: {users}
          </label>
          <input
            type="range"
            id="user-count"
            min="1"
            max="1000"
            step="1"
            value={users}
            onChange={(e) => setUsers(parseInt(e.target.value))}
            className="w-full max-w-md h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer range-lg accent-blue-500"
          />
          <div className="flex justify-between w-full max-w-md text-sm text-gray-500 mt-2">
            <span>1</span>
            <span>1000+</span>
          </div>
        </div>


        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pricingPlans.map((plan) => (
            <PricingCard key={plan.name} {...plan} />
          ))}
        </div>
      </div>
    </section>
  );
};

const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Subscribing with email: ${email}`);
    setEmail('');
  };

  return (
    <section className="bg-blue-500 py-16">
      <div className="container mx-auto px-6 text-center">
        <span className="inline-block bg-pink-500 text-white text-xs font-semibold px-3 py-1 rounded-full mb-4">
          Newsletter
        </span>
        <h2 className="text-4xl font-extrabold text-white mb-4">
          Stay up to date
        </h2>
        <p className="text-xl text-blue-100 mb-8 max-w-xl mx-auto">
          Join our newsletter to get the latest features, updates, and news on
          our product.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full sm:w-80 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-teal-400 text-white font-semibold py-3 px-6 rounded-md hover:bg-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-opacity-50 w-full sm:w-auto"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
};

// --- Main Page Component ---

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-white font-sans antialiased">
      <Header />
      <main>
        <PricingSection />
        <NewsletterSection />
      </main>
      {/* Optional: Add a simple footer */}
      <footer className="bg-gray-800 text-white py-8 text-center">
        <div className="container mx-auto px-6">
          <p>&copy; {new Date().getFullYear()} MyService. All rights reserved.</p>
          <div className="flex justify-center space-x-4 mt-4">
            <a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-white">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;

