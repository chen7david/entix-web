import { HashRouter, Route, Routes, Navigate } from "react-router-dom";
import { LoginPage } from "@/pages/auth/Login";
import { RegisterPage } from "@/pages/auth/Register";
import { ProfilePage } from "@/pages/user/Profile";
import { SettingsPage } from "@/pages/user/Settings";
import { DashboardPage } from "@/pages/admin/Dashboard";
import { NotFoundPage } from "@/pages/NotFound";
import { ForgotPasswordPage } from "@/pages/auth/ForgotPassword";
import { ResetPasswordPage } from "@/pages/auth/ResetPassword";
import { RequestEmailVerificationPage } from "@/pages/auth/RequestEmailVerification";
import { VerifyEmailPage } from "@/pages/auth/VerifyEmail";
import { AdminLayout } from "@/layouts/admin/AdminLayout";
import { AuthLayout } from "@/layouts/auth/AuthLayout";

export const Router: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Navigate to="/auth/login" replace />} />
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="forgot-password" element={<ForgotPasswordPage />} />
          <Route path="reset-password" element={<ResetPasswordPage />} />
          <Route path="verify-email" element={<VerifyEmailPage />} />
          <Route
            path="request-verification"
            element={<RequestEmailVerificationPage />}
          />
        </Route>
        {/* Protected routes */}
        <Route path="admin" element={<AdminLayout />}>
          <Route path="profile" element={<ProfilePage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="dashboard" element={<DashboardPage />} />
        </Route>

        {/* 404 page */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </HashRouter>
  );
};
