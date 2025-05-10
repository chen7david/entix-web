import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
// AntdDemoPage import removed as the file is deleted

/**
 * Application routes.
 * @returns {JSX.Element} The router component with defined routes.
 */
const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      {/* Route for antd-demo removed */}
    </Routes>
  );
};

export default AppRouter;
