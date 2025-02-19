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
import { AdminLayout } from "@/features/layout/components/AdminLayout";

export const Router: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Navigate to="/auth/login" replace />} />
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/register" element={<RegisterPage />} />
        <Route path="/auth/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/auth/reset-password" element={<ResetPasswordPage />} />
        <Route path="/auth/verify-email" element={<VerifyEmailPage />} />
        <Route
          path="/auth/request-verification"
          element={<RequestEmailVerificationPage />}
        />

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
