import React from 'react';
import { Layout } from 'antd';

const { Footer } = Layout;

/**
 * Props for the AppFooter component.
 */
type AppFooterProps = {
  appName?: string;
  layoutType?: string; // e.g., "User Layout", "Admin Panel"
};

/**
 * A reusable application footer component.
 * @param {AppFooterProps} props - The props for the component.
 * @returns {JSX.Element} The rendered footer.
 */
const AppFooter: React.FC<AppFooterProps> = ({ appName = 'My App', layoutType }) => {
  const year = new Date().getFullYear();
  let footerText = `${appName} ©${year}`;
  if (layoutType) {
    footerText += ` - ${layoutType}`;
  }

  return <Footer style={{ textAlign: 'center', backgroundColor: '#f0f2f5' }}>{footerText}</Footer>;
};

export default AppFooter;
