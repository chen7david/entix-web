import { App as AntApp } from 'antd';
import { Router as AppRouter } from "./router/routes";

export function App() {
  return (
    <AntApp>
      <AppRouter />
    </AntApp>
  );
}
