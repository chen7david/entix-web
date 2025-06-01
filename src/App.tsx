import { HashRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/home/HomePage";
import { SignInPage } from "./pages/signin/SignInPage";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<SignInPage />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
