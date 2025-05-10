import React from 'react';

/**
 * Hero component for the home page.
 * @returns {JSX.Element} The rendered Hero component.
 */
const Hero: React.FC = () => {
  return (
    <div className="bg-gray-100 p-8 rounded-lg shadow-md text-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to Our Application!</h1>
      <p className="text-lg text-gray-700 mb-6">
        This is a demonstration of a hero component styled with Tailwind CSS and used within a React
        application.
      </p>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Get Started
      </button>
    </div>
  );
};

export default Hero;
