import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { HomePage } from "./pages/home/HomePage";
import { SignInPage } from "./pages/signin/SignInPage";
import { AuthLayout } from "./layouts/AuthLayout";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/auth/signin" replace />} />
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="home" element={<HomePage />} />
          <Route path="signin" element={<SignInPage />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
