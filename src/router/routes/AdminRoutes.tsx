import { Route } from "react-router-dom";
import { AdminDashboard } from "@/pages/admin/AdminDashboard";
import { Profile } from "@/pages/user/Profile";
import { AdminLayout } from "@/layouts/AdminLayout";
import { AdminGuard } from "@/guards/AdminGuard";

export const AdminRoutes = () => {
  return (
    <>
      <Route element={<AdminLayout />}>
        <Route path="/profile" element={<Profile />} />
        <Route element={<AdminGuard />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Route>
      </Route>
    </>
  );
};
