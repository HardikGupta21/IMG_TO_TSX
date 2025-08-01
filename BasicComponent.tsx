import React from 'react';

interface PricingCardProps {
  /** The name of the pricing plan (e.g., "Pro Plan"). */
  planName: string;
  /** The price for the plan (e.g., "$49/month"). */
  price: string;
  /** An array of features included in the plan. */
  features: string[];
  /** The text to display on the action button. */
  buttonText: string;
  /** Callback function to be executed when the button is clicked. */
  onButtonClick: () => void;
}

const PricingCardComponent: React.FC<PricingCardProps> = ({
  planName,
  price,
  features,
  buttonText,
  onButtonClick,
}) => {
  // Design System Tailwind classes
  const pricingCardHighlightedClass = "bg-blue-700 text-white rounded-xl shadow-xl p-8 flex flex-col items-center transform scale-105 border-2 border-blue-900";
  const buttonPrimaryClass = "bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-blue-800 transition duration-300 ease-in-out";
  // Note: The feature_checkmark_item class specifies text-gray-700, but since its parent (pricingCardHighlightedClass)
  // applies text-white, the text will inherit white for better contrast on the blue background.
  const featureCheckmarkItemClass = "flex items-center text-gray-700 mb-2";

  return (
    <div className={pricingCardHighlightedClass}>
      <h3 className="text-3xl font-bold mb-2">{planName}</h3>
      <p className="text-5xl font-extrabold mb-6">{price}</p>
      <ul className="list-none p-0 m-0 mb-8 text-center">
        {features.map((feature, index) => (
          <li key={index} className={featureCheckmarkItemClass}>
            {/* Checkmark SVG, explicitly set to text-white for visibility on blue background */}
            <svg className="w-6 h-6 mr-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
            {/* The text here will be white due to inheritance from the parent div's text-white class */}
            {feature}
          </li>
        ))}
      </ul>
      <button className={buttonPrimaryClass} onClick={onButtonClick}>
        {buttonText}
      </button>
    </div>
  );
};

export default PricingCardComponent;