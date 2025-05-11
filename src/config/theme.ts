import type { ThemeConfig } from 'antd';

/**
 * Ant Design theme configuration.
 * Defines global style tokens and component-specific overrides.
 */
export const antdTheme: ThemeConfig = {
  token: {
    // Seed Token
    colorPrimary: '#00b96b',
    borderRadius: 6,

    // Alias Tokens (examples, AntD generates most from seed)
    colorLink: '#00b96b', // Links will inherit colorPrimary by default
    colorLinkHover: '#00a35c', // Darker shade for hover

    // Functional Colors (using AntD defaults for now, can be customized)
    colorSuccess: '#52c41a',
    colorWarning: '#faad14',
    colorError: '#ff4d4f',
    colorInfo: '#1677ff', // Default AntD blue, often good for informational elements

    // Neutral Colors (examples, AntD defaults are usually good)
    colorTextBase: '#333333', // Base text color
    colorBgLayout: '#f0f2f5', // Layout background color
    colorBorder: '#d9d9d9', // Default border color

    // Font
    fontFamily: 'Inter, sans-serif', // Example: Ensure Inter is loaded in your CSS/HTML
  },
  components: {
    Button: {
      // Example: Ensure buttons fully utilize primary color if needed
      colorPrimary: '#00b96b',
      algorithm: true,
    },
    Menu: {
      // Example: Ensure menu items match primary color scheme if desired
      itemSelectedColor: '#00b96b',
      itemHoverColor: '#00a35c',
      itemSelectedBg: 'e6fffb',
    },
    // Add other component-specific overrides here if needed
  },
};
