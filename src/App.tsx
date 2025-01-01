import { Provider as JotaiProvider } from "jotai";
import { HashRouter } from "react-router-dom";
import { AuthProvider } from "./providers/AuthProvider";
import { RouterContent } from "./routes";

export default function App() {
  return (
    <HashRouter>
      <JotaiProvider>
        <AuthProvider>
          <RouterContent />
        </AuthProvider>
      </JotaiProvider>
    </HashRouter>
  );
}
