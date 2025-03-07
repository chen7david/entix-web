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
import { UserListPage } from "@/pages/user/UserList";
import { AuthGuard } from "@/guards/AuthGuard";
import { PublicGuard } from "@/guards/PublicGuard";
import { useAuth } from "@/features/auth/hooks/auth.hook";
import { ReportsPage } from "@/pages/Reports/Reports";
import { SessionsPage } from "@/pages/admin/Sessions";
import { RolesPage } from "@/pages/admin/Roles";
import { PlansPage } from "@/pages/admin/Plans";
import { ProductsPage } from "@/pages/admin/store/Products";
import { CategoriesPage } from "@/pages/admin/store/Categories";
import { InventoryPage } from "@/pages/admin/store/Inventory";
import {
  AuthRoutes,
  AdminRoutes,
  ROOT_REDIRECT,
} from "@/constants/routes.constant";

export const Router: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <HashRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Navigate to={ROOT_REDIRECT} replace />} />

        <Route element={<PublicGuard isAuthenticated={isAuthenticated} />}>
          <Route element={<AuthLayout />}>
            <Route path={AuthRoutes.LOGIN} element={<LoginPage />} />
            <Route path={AuthRoutes.REGISTER} element={<RegisterPage />} />
            <Route
              path={AuthRoutes.FORGOT_PASSWORD}
              element={<ForgotPasswordPage />}
            />
            <Route
              path={AuthRoutes.RESET_PASSWORD}
              element={<ResetPasswordPage />}
            />
            <Route
              path={AuthRoutes.VERIFY_EMAIL}
              element={<VerifyEmailPage />}
            />
            <Route
              path={AuthRoutes.REQUEST_VERIFICATION}
              element={<RequestEmailVerificationPage />}
            />
          </Route>
        </Route>

        {/* Protected routes */}
        <Route element={<AuthGuard isAuthenticated={isAuthenticated} />}>
          <Route element={<AdminLayout />}>
            <Route path={AdminRoutes.USERS} element={<UserListPage />} />
            <Route path={AdminRoutes.PROFILE} element={<ProfilePage />} />
            <Route path={AdminRoutes.SETTINGS} element={<SettingsPage />} />
            <Route path={AdminRoutes.DASHBOARD} element={<DashboardPage />} />
            <Route path={AdminRoutes.REPORTS} element={<ReportsPage />} />
            <Route path={AdminRoutes.SESSIONS} element={<SessionsPage />} />
            <Route path={AdminRoutes.ROLES} element={<RolesPage />} />
            <Route path={AdminRoutes.PLANS} element={<PlansPage />} />
            <Route path={AdminRoutes.STORE_PRODUCTS} element={<ProductsPage />} />
            <Route path={AdminRoutes.STORE_CATEGORIES} element={<CategoriesPage />} />
            <Route path={AdminRoutes.STORE_INVENTORY} element={<InventoryPage />} />
          </Route>
        </Route>

        {/* 404 page */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </HashRouter>
  );
};
