import React from 'react';
import { HashRouter } from 'react-router-dom';
import AppRouter from './router';
import ResponsiveAtomUpdater from './components/utils/ResponsiveAtomUpdater';
import { App as AntdApp } from 'antd';

/**
 * Main application component.
 * Sets up the HashRouter, responsive atom updater, and renders the AppRouter.
 * Wraps the entire app with AntdApp to provide message context.
 * @returns {JSX.Element} The rendered App component.
 */
const App: React.FC = () => {
  return (
    <AntdApp>
      <HashRouter>
        <ResponsiveAtomUpdater />
        <AppRouter />
      </HashRouter>
    </AntdApp>
  );
};

export default App;
