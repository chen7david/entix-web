import type { ThemeConfig } from 'antd';

/**
 * Ant Design theme configuration.
 * @see https://ant.design/docs/react/customize-theme
 */
export const antdTheme: ThemeConfig = {
  token: {
    // Seed Token
    colorPrimary: '#00b96b',
    borderRadius: 2,
  },
  // You can add other theme configurations here, like:
  // components: {
  //   Button: {
  //     colorPrimary: '#00b96b',
  //     algorithm: true, // Enable algorithm for components to inherit seed token changes
  //   },
  // },
  // algorithm: theme.darkAlgorithm, // or theme.compactAlgorithm
};
