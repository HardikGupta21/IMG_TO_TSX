import React from 'react';

interface PricingCallToActionProps {
  title: string;
  description: string;
  buttonText: string;
}

const PricingCallToAction: React.FC<PricingCallToActionProps> = ({
  title,
  description,
  buttonText,
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center bg-white">
      {/* Heading (h1 variant) */}
      <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-4">
        {title}
      </h1>

      {/* Paragraph */}
      <p className="text-base text-gray-600 leading-relaxed mb-8 max-w-2xl">
        {description}
      </p>

      {/* Button (filled-primary variant) */}
      <button
        className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        onClick={() => alert('Button Clicked!')}
      >
        {buttonText}
      </button>
    </div>
  );
};

export default PricingCallToAction;