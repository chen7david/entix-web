import React from 'react';
import { useAtomValue } from 'jotai';
import { isMobileAtom } from '../../store/sidebarAtoms';

/**
 * Props for the PageContentWrapper component.
 */
type PageContentWrapperProps = {
  children: React.ReactNode;
};

/**
 * A reusable wrapper for page content, providing consistent padding and styling.
 * @param {PageContentWrapperProps} props - The props for the component.
 * @returns {JSX.Element} The rendered content wrapper.
 */
const PageContentWrapper: React.FC<PageContentWrapperProps> = ({ children }) => {
  const isMobile = useAtomValue(isMobileAtom);

  return (
    <div
      style={{
        background: '#fff',
        padding: isMobile ? 16 : 24,
        minHeight: 'auto', // Adjusted from a fixed value to be more flexible
        borderRadius: 8,
        boxShadow: '0 2px 8px rgba(0,0,0,0.09)',
      }}
    >
      {children}
    </div>
  );
};

export default PageContentWrapper;
