import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { HomePage } from "./pages/home/HomePage";
import { SignInPage } from "./pages/auth/SignInPage";
import { AuthLayout } from "./layouts/AuthLayout";
import { SignUpPage } from "./pages/auth/SignUpPage";
import { SignupConfirmPage } from "./pages/auth/SignUpConfirmPage";

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
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
