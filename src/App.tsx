import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { HomePage } from "./pages/home/HomePage";
import { SignInPage } from "./pages/auth/SignInPage";
import { AuthLayout } from "./layouts/AuthLayout";
import { SignUpPage } from "./pages/auth/SignUpPage";
import { SignupConfirmPage } from "./pages/auth/SignUpConfirmPage";
import { ForgotPasswordPage } from "./pages/auth/ForgotPasswordPage";
import { ConfirmForgotPassword } from "./pages/auth/ConfirmForgotPassword";
import { ProfilePage } from "./pages/profile/ProfilePage";
import { ResendConfirmationCode } from "./pages/auth/ResendConfirmationCode";
import { NotFoundPage } from "./pages/error/NotFound";
import { ProtectedRoute } from "./components/guards/ProtectedRoutes";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/auth/signin" replace />} />
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="home" element={<HomePage />} />
          <Route path="signin" element={<SignInPage />} />
          <Route path="signup" element={<SignUpPage />} />
          <Route path="signup-confirm" element={<SignupConfirmPage />} />
          <Route path="forgot-password" element={<ForgotPasswordPage />} />
          <Route path="password-confirm" element={<ConfirmForgotPassword />} />
          <Route
            path="resend-confirmation-code"
            element={<ResendConfirmationCode />}
          />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<ProfilePage />} />
          {/* Add more protected routes here */}
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
