import { Route } from "react-router-dom";
import UserDashboard from "@/pages/user/UserDashboard";
import Profile from "@/pages/user/Profile";
import { UserLayout } from "@/layouts/UserLayout";

export const UserRoutes = () => {
  return (
    <>
      <Route element={<UserLayout />}>
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
    </>
  );
};
