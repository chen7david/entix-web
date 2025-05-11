import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import UserLayout from '../layouts/UserLayout';
import AdminLayout from '../layouts/AdminLayout';
import HomePage from '../pages/HomePage';
import AdminDashboardPage from '../pages/admin/AdminDashboardPage';
import AdminUsersPage from '../pages/admin/AdminUsersPage';
import AdminSettingsPage from '../pages/admin/AdminSettingsPage';
import UserDashboardPage from '../pages/UserDashboardPage';
import ProtectedRoute from '../components/auth/ProtectedRoute';

// Auth pages
import SignupPage from '../pages/auth/SignupPage';
import ConfirmSignupPage from '../pages/auth/ConfirmSignupPage';
import SigninPage from '../pages/auth/SigninPage';
import ForgotPasswordPage from '../pages/auth/ForgotPasswordPage';
import ResetPasswordPage from '../pages/auth/ResetPasswordPage';

// Importing AuthLayout if it exists, otherwise defaulting to a basic layout
const AuthLayout = React.lazy(
  () =>
    import('../layouts/AuthLayout').catch(() => ({
      default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
    })) as Promise<{ default: React.ComponentType<{ children?: React.ReactNode }> }>
);

/**
 * Application routes with layouts.
 * @returns {JSX.Element} The router component with defined routes and layouts.
 */
const AppRouter: React.FC = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<UserLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/login" element={<Navigate to="/auth/signin" replace />} />
        {/* More public routes as needed */}
      </Route>

      {/* Auth routes */}
      <Route path="/auth" element={<AuthLayout />}>
        <Route path="signup" element={<SignupPage />} />
        <Route path="confirm-signup" element={<ConfirmSignupPage />} />
        <Route path="signin" element={<SigninPage />} />
        <Route path="forgot-password" element={<ForgotPasswordPage />} />
        <Route path="reset-password" element={<ResetPasswordPage />} />
      </Route>

      {/* Protected User routes */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <UserLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<UserDashboardPage />} />
        {/* Add more protected user routes as needed */}
      </Route>

      {/* Admin routes */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute adminOnly>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminDashboardPage />} />
        <Route path="users" element={<AdminUsersPage />} />
        <Route path="settings" element={<AdminSettingsPage />} />
        {/* More admin routes as needed */}
      </Route>

      {/* Fallback route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRouter;
