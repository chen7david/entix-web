import { App as AntApp, ConfigProvider } from "antd";
import { Router as AppRouter } from "./router/routes";
import theme from "./theme/theme";

export function App() {
  return (
    <ConfigProvider theme={theme}>
      <AntApp>
        <AppRouter />
      </AntApp>
    </ConfigProvider>
  );
}
