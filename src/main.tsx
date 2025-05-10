import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { ConfigProvider } from 'antd';
import 'antd/dist/reset.css'; // Import Ant Design CSS
import { antdTheme } from './config/theme.ts'; // Import the centralized theme
import { Provider as JotaiProvider } from 'jotai';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <JotaiProvider>
      <ConfigProvider theme={antdTheme}>
        <React.Suspense fallback={<div>Loading...</div>}>
          <App />
        </React.Suspense>
      </ConfigProvider>
    </JotaiProvider>
  </React.StrictMode>
);
