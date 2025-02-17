import { HashRouter, Route, Routes } from "react-router-dom";
import { UserRoutes } from "./routes/UserRoutes";
import { AdminRoutes } from "./routes/AdminRoutes";
import { GuestRoutes } from "./routes/GuestRoutes";
import { GuestGuard } from "@/guards/GuestGuard";
import { AuthGuard } from "@/guards/AuthGuard";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { NotFound } from "@/pages/NotFound";

export const AppRouter = () => {
  return (
    <ErrorBoundary>
      <HashRouter>
        <Routes>
          {/* Guest routes: only accessible when not logged in */}
          <Route element={<GuestGuard />}>{GuestRoutes()}</Route>

          {/* Protected routes */}
          <Route element={<AuthGuard />}>
            {AdminRoutes()}
            {UserRoutes()}
          </Route>

          {/* 404 route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </HashRouter>
    </ErrorBoundary>
  );
};
