import { HashRouter, Route, Routes, Navigate } from "react-router-dom";
import { LoginPage } from "@/pages/guest/Login";
import { RegisterPage } from "@/pages/guest/Register";
import { ProfilePage } from "@/pages/user/Profile";
import { SettingsPage } from "@/pages/user/Settings";
import { DashboardPage } from "@/pages/admin/Dashboard";
import { NotFoundPage } from "@/pages/NotFound";

export const Router: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </HashRouter>
  );
};
