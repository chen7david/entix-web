import { Route } from "react-router-dom";
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import { GuestLayout } from "@/layouts/GuestLayout";
import { Navigate } from "react-router-dom";

export const GuestRoutes = () => {
  return (
    <>
      <Route element={<GuestLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Route>
    </>
  );
};
