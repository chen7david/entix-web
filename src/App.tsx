import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary";
import AdminLayout from "./layouts/AdminLayout";
import GuestLayout from "./layouts/GuestLayout";
import { AuthGuard } from "./guards/AuthGuard";
import { AdminGuard } from "./guards/AdminGuard";
import { GuestGuard } from "./guards/GuestGuard";

// Pages
import { Login } from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";
import { Profile } from "./pages/Profile";
import { NotFound } from "./pages/NotFound";
import UserLayout from "./layouts/UserLayout";

export default function App() {
  return (
    <ErrorBoundary>
      <HashRouter>
        <Routes>
          {/* Guest routes */}
          <Route element={<GuestGuard />}>
            <Route element={<GuestLayout />}>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Navigate to="/login" replace />} />
            </Route>
          </Route>

          {/* Protected routes */}
          <Route element={<AuthGuard />}>
            {/* Admin routes */}
            <Route element={<AdminLayout />}>
              <Route element={<AdminGuard />}>
                <Route path="/dashboard" element={<Dashboard />} />
              </Route>
              {/* Regular user routes */}
              <Route path="/profile" element={<Profile />} />
            </Route>
            {/* User routes */}
            <Route element={<UserLayout />}>
              <Route element={<GuestGuard />}>
                <Route path="/dashboard" element={<Dashboard />} />
              </Route>
              {/* Regular user routes */}
              <Route path="/profile" element={<Profile />} />
            </Route>
          </Route>

          {/* 404 route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </HashRouter>
    </ErrorBoundary>
  );
}
