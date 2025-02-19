import { App as AntApp, ConfigProvider } from "antd";
import { Router as AppRouter } from "./router/routes";
import theme from "./theme/theme";
import { ErrorBoundary } from "./components/error";

export function App() {
  return (
    <ErrorBoundary>
      <ConfigProvider theme={theme}>
        <AntApp>
          <AppRouter />
        </AntApp>
      </ConfigProvider>
    </ErrorBoundary>
  );
}
