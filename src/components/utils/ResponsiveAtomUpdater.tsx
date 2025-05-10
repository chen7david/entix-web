import React, { useEffect } from 'react';
import { Grid } from 'antd';
import { useSetAtom } from 'jotai';
import { isMobileAtom } from '../../store/sidebarAtoms';

const { useBreakpoint } = Grid;

/**
 * A utility component that listens to Ant Design's breakpoints
 * and updates the global `isMobileAtom` accordingly.
 * This component does not render anything itself.
 * @returns {null} Null, as this component is for side effects only.
 */
const ResponsiveAtomUpdater: React.FC = () => {
  const screens = useBreakpoint();
  const setIsMobile = useSetAtom(isMobileAtom);

  useEffect(() => {
    // Consider md and below as mobile, consistent with layout definitions
    setIsMobile(!screens.md);
  }, [screens, setIsMobile]);

  return null; // This component doesn't render anything
};

export default ResponsiveAtomUpdater;
