import '@ant-design/v5-patch-for-react-19';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { ConfigProvider } from 'antd';
import 'antd/dist/reset.css'; // Import Ant Design CSS
import { antdTheme } from './config/theme.ts'; // Import the centralized theme
import { Provider as JotaiProvider } from 'jotai';
import { QueryClientProvider } from '@tanstack/react-query';
import queryClient from './helpers/queryClient';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <JotaiProvider>
      <QueryClientProvider client={queryClient}>
        <ConfigProvider theme={antdTheme}>
          <React.Suspense fallback={<div>Loading...</div>}>
            <App />
          </React.Suspense>
        </ConfigProvider>
        {/* Add devtools for development environment only */}
        {import.meta.env.DEV && (
          <React.Suspense fallback={null}>
            {/* Dynamically import the devtools only when needed */}
            {(async () => {
              if (import.meta.env.DEV) {
                try {
                  const { ReactQueryDevtools } = await import('@tanstack/react-query-devtools');
                  return <ReactQueryDevtools initialIsOpen={false} />;
                } catch (e) {
                  console.warn('Could not load React Query Devtools', e);
                  return null;
                }
              }
              return null;
            })()}
          </React.Suspense>
        )}
      </QueryClientProvider>
    </JotaiProvider>
  </React.StrictMode>
);
