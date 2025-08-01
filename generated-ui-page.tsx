'use client'; // This component uses client-side hooks like useState and useEffect

import React, { useState, useRef, useEffect } from 'react';

// Interfaces for component props and data structures
interface PricingFeature {
  text: string;
  included: boolean;
}

interface PricingCardProps {
  planName: string;
  price: string;
  priceDetails: string;
  users: string;
  features: PricingFeature[];
  isHighlighted?: boolean;
  buttonText: string;
  onButtonClick: () => void;
}

// Reusable Icon components (simple SVG for checkmark, X mark, and logo)
const CheckIcon: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={`h-5 w-5 flex-shrink-0 ${className}`}
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

const XMarkIcon: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={`h-5 w-5 flex-shrink-0 ${className}`}
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
      clipRule="evenodd"
    />
  </svg>
);

const LogoIcon: React.FC = () => (
  <svg
    className="h-8 w-8 text-blue-700"
    fill="currentColor"
    viewBox="0 0 20 20"
  >
    <path d="M10 2a8 8 0 100 16 8 8 0 000-16zM5.553 7.646l-.707.707A1 1 0 005 9.06v1.88a1 1 0 00.707.954l.707.707A1 1 0 007 13.06v-1.88a1 1 0 00-.707-.954L5.553 9.646zm9.294 0l.707.707A1 1 0 0115 9.06v1.88a1 1 0 01-.707.954l-.707.707A1 1 0 0113 13.06v-1.88a1 1 0 01.707-.954zM10 5a1 1 0 00-1 1v8a1 1 0 102 0V6a1 1 0 00-1-1z" />
  </svg>
);

// PricingCard Component - uses styles from the design system's 'components'
const PricingCard: React.FC<PricingCardProps> = ({
  planName,
  price,
  priceDetails,
  users,
  features,
  isHighlighted = false,
  buttonText,
  onButtonClick,
}) => {
  // Apply design system component styles
  const cardClass = isHighlighted
    ? 'bg-blue-700 text-white p-6 rounded-xl shadow-lg border border-blue-700 scale-105 transform transition-all duration-300' // cardHighlighted
    : 'bg-white p-6 rounded-xl shadow-md border border-gray-200 transition-all duration-300'; // card

  // Adjust text and icon colors based on highlight state
  const headingColorClass = isHighlighted ? 'text-white' : 'text-gray-900';
  const textColorClass = isHighlighted ? 'text-blue-100' : 'text-gray-600';
  const featureCheckIconColor = isHighlighted ? 'text-blue-300' : 'text-blue-500';
  const featureXIconColor = isHighlighted ? 'text-red-300' : 'text-gray-400';
  
  // Adjust button style for highlighted card
  const buttonStyle = isHighlighted
    ? 'bg-white text-blue-700 font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-gray-100 transition-colors w-full' // Inverted button for highlighted card
    : 'bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-blue-800 transition-colors w-full'; // buttonPrimary

  return (
    <div className={cardClass}>
      <h3 className={`text-xl font-bold mb-2 ${headingColorClass}`}>{planName}</h3>
      <p className={`text-5xl font-extrabold mb-2 ${headingColorClass}`}>{price}</p>
      <p className={`text-sm mb-4 ${textColorClass}`}>{priceDetails}</p>
      <div className={`mb-4 ${textColorClass}`}>
        <span className="font-semibold">{users} users</span> included
      </div>

      <ul className="mb-6 space-y-3">
        {features.map((feature, index) => (
          <li key={index} className={`flex items-start ${textColorClass}`}>
            {feature.included ? (
              <CheckIcon className={featureCheckIconColor} />
            ) : (
              <XMarkIcon className={featureXIconColor} />
            )}
            <span>{feature.text}</span>
          </li>
        ))}
      </ul>

      <button onClick={onButtonClick} className={buttonStyle}>
        {buttonText}
      </button>
    </div>
  );
};

// Main Page Component
export default function Page() {
  const [userCount, setUserCount] = useState<number>(250);
  const sliderRef = useRef<HTMLInputElement>(null);
  const sliderValueRef = useRef<HTMLDivElement>(null);

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserCount(parseInt(event.target.value));
  };

  // Effect to dynamically position the slider value label above the thumb
  useEffect(() => {
    if (sliderRef.current && sliderValueRef.current) {
      const slider = sliderRef.current;
      const valueSpan = sliderValueRef.current;

      const min = parseFloat(slider.min || '0');
      const max = parseFloat(slider.max || '100');
      const val = parseFloat(slider.value);

      // Get slider dimensions
      const sliderWidth = slider.offsetWidth;
      const thumbWidth = 16; // Width of the thumb as defined in Tailwind CSS for input[type="range"]

      // Calculate the percentage of the value within the slider's range
      const percentage = (val - min) / (max - min);

      // Calculate the thumb's position relative to the slider's left edge
      // This considers the track width (sliderWidth - thumbWidth) and centers the thumb.
      const thumbPosition = (percentage * (sliderWidth - thumbWidth)) + (thumbWidth / 2);

      // Apply the position to the value label
      valueSpan.style.left = `${thumbPosition}px`;
      valueSpan.style.transform = 'translateX(-50%)'; // Center the label above the thumb
    }
  }, [userCount]); // Recalculate position when userCount changes

  // Sample pricing plan data
  const pricingPlans = [
    {
      planName: 'Basic',
      price: '$19',
      priceDetails: 'per month, billed annually',
      users: 'Up to 10',
      features: [
        { text: 'Access to core features', included: true },
        { text: 'Basic analytics', included: true },
        { text: 'Email support', included: true },
        { text: 'Custom branding', included: false },
        { text: 'Priority support', included: false },
        { text: 'API access', included: false },
      ],
      buttonText: 'Choose Basic',
      isHighlighted: false,
    },
    {
      planName: 'Pro',
      price: '$49',
      priceDetails: 'per month, billed annually',
      users: 'Up to 100',
      features: [
        { text: 'All Basic features', included: true },
        { text: 'Advanced analytics', included: true },
        { text: 'Chat support', included: true },
        { text: 'Custom branding', included: true },
        { text: 'Priority support', included: false },
        { text: 'API access', included: false },
      ],
      buttonText: 'Choose Pro',
      isHighlighted: true, // This card will be highlighted
    },
    {
      planName: 'Business',
      price: '$99',
      priceDetails: 'per month, billed annually',
      users: 'Up to 500',
      features: [
        { text: 'All Pro features', included: true },
        { text: 'Dedicated account manager', included: true },
        { text: '24/7 Phone support', included: true },
        { text: 'Custom branding', included: true },
        { text: 'Priority support', included: true },
        { text: 'API access', included: false },
      ],
      buttonText: 'Choose Business',
      isHighlighted: false,
    },
    {
      planName: 'Enterprise',
      price: '$249',
      priceDetails: 'per month, billed annually',
      users: 'Unlimited',
      features: [
        { text: 'All Business features', included: true },
        { text: 'Unlimited integrations', included: true },
        { text: 'SLA guarantee', included: true },
        { text: 'Custom branding', included: true },
        { text: 'Priority support', included: true },
        { text: 'API access', included: true },
      ],
      buttonText: 'Contact Us',
      isHighlighted: false,
    },
  ];

  const handleButtonClick = (planName: string) => {
    alert(`Selected plan: ${planName}`);
  };

  const [email, setEmail] = useState('');
  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Subscribing ${email} to newsletter!`);
    setEmail(''); // Clear the input field
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col">
      {/* Header Section */}
      <header className="py-6 border-b border-gray-100 shadow-sm">
        <nav className="container mx-auto px-4 flex justify-between items-center max-w-7xl">
          <div className="flex items-center space-x-2">
            <LogoIcon />
            <span className="text-2xl font-bold text-gray-900">YourApp</span>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <a href="#" className="text-gray-600 hover:text-blue-700 transition-colors">Home</a>
            <a href="#" className="text-gray-600 hover:text-blue-700 transition-colors">Features</a>
            <a href="#" className="text-gray-600 hover:text-blue-700 transition-colors">Pricing</a>
            <a href="#" className="text-gray-600 hover:text-blue-700 transition-colors">Blog</a>
            <a href="#" className="text-gray-600 hover:text-blue-700 transition-colors">Contact</a>
          </div>
          {/* Using adapted buttonPrimary style */}
          <button className="bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-800 transition-colors md:py-3 md:px-6">
            Get Started
          </button>
        </nav>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow pt-16 pb-12 bg-gray-50">
        {/* Hero Section with Heading and Slider */}
        <section className="container mx-auto px-4 text-center max-w-3xl mb-12">
          {/* Using heading1 style */}
          <h1 className="text-gray-900 text-4xl font-extrabold leading-tight mb-4 md:text-5xl">
            Flexible Pricing for Every Team
          </h1>
          {/* Using paragraph style */}
          <p className="text-gray-600 text-lg leading-relaxed mb-8">
            Choose the plan that best fits your needs. Scale up or down as your team grows.
          </p>

          {/* User Count Slider */}
          {/* Uses card style for its container */}
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 inline-block w-full max-w-xl">
            <label htmlFor="user-slider" className="block text-gray-800 font-semibold mb-4 text-left">
              Number of Users
            </label>
            <div className="relative mb-6 pb-2"> {/* Added pb-2 for label clearance */}
              <input
                type="range"
                id="user-slider"
                min="10"
                max="1000"
                step="10"
                value={userCount}
                onChange={handleSliderChange}
                ref={sliderRef}
                // Tailwind CSS for range input styling, including thumb and track
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer
                  [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-blue-700 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:-mt-[6px] [&::-webkit-slider-thumb]:appearance-none
                  [&::-webkit-slider-runnable-track]:h-2 [&::-webkit-slider-runnable-track]:bg-gray-200 [&::-webkit-slider-runnable-track]:rounded-lg
                  [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:bg-blue-700 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:shadow-lg
                  [&::-moz-range-track]:h-2 [&::-moz-range-track]:bg-gray-200 [&::-moz-range-track]:rounded-lg"
              />
              <div
                ref={sliderValueRef}
                className="absolute -top-7 text-sm font-medium text-blue-700 bg-blue-50 py-1 px-2 rounded-md shadow-sm transition-all duration-100 ease-out whitespace-nowrap"
                // Initial inline style for positioning, refined by useEffect
                style={{ left: `calc(${((userCount - 10) / (1000 - 10)) * 100}% )`, transform: 'translateX(-50%)' }}
              >
                {userCount} users
              </div>
            </div>
            {/* Using paragraph style */}
            <p className="text-gray-600 text-sm text-left">
              Estimated monthly cost based on your user count.
            </p>
          </div>
        </section>

        {/* Pricing Cards Grid Section */}
        <section className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pricingPlans.map((plan, index) => (
              <PricingCard
                key={index}
                planName={plan.planName}
                price={plan.price}
                priceDetails={plan.priceDetails}
                users={plan.users}
                features={plan.features}
                isHighlighted={plan.isHighlighted}
                buttonText={plan.buttonText}
                onButtonClick={() => handleButtonClick(plan.planName)}
              />
            ))}
          </div>
        </section>
      </main>

      {/* Newsletter / CTA Footer Section */}
      {/* Uses light_gray background color from design system */}
      <section className="py-16 px-4" style={{ backgroundColor: '#F8F8F8' }}>
        <div className="container mx-auto text-center max-w-2xl">
          {/* Using heading2 style */}
          <h2 className="text-gray-800 text-3xl font-bold mb-4">
            Join Our Newsletter
          </h2>
          {/* Using paragraph style */}
          <p className="text-gray-600 text-base leading-relaxed mb-8">
            Stay up-to-date with our latest features, blog posts, and exclusive offers.
          </p>
          <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            {/* Using inputField style */}
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white border border-gray-300 rounded-lg py-3 px-4 text-gray-800 focus:ring-blue-500 focus:border-blue-500 w-full sm:w-auto flex-grow"
              required
            />
            {/* Using buttonPrimary style */}
            <button
              type="submit"
              className="bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-blue-800 transition-colors w-full sm:w-auto"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* Simple Copyright Footer */}
      <footer className="bg-gray-900 text-white py-8 text-center">
        <div className="container mx-auto px-4 text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} YourApp. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

