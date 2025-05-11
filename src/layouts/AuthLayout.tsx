import React from 'react';
import { Outlet } from 'react-router-dom';

/**
 * AuthLayout provides a consistent layout for authentication pages.
 * Uses Outlet to render the nested route components.
 */
const AuthLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Outlet />
    </div>
  );
};

export default AuthLayout;
