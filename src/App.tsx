import React from 'react';
import { HashRouter } from 'react-router-dom';
import AppRouter from './router';
import ResponsiveAtomUpdater from './components/utils/ResponsiveAtomUpdater';

/**
 * Main application component.
 * Sets up the HashRouter, responsive atom updater, and renders the AppRouter.
 * @returns {JSX.Element} The rendered App component.
 */
const App: React.FC = () => {
  return (
    <HashRouter>
      <ResponsiveAtomUpdater />
      <AppRouter />
    </HashRouter>
  );
};

export default App;
