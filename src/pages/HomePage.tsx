import React from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';

/**
 * Home page component.
 * @returns {JSX.Element} The rendered Home page.
 */
const HomePage: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <Hero />
      <div className="mt-8 text-center">
        <Link
          to="/login"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Go to Login Page
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
