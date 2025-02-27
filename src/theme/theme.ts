import type { ThemeConfig } from "antd";

const theme: ThemeConfig = {
  token: {
    // Primary color (Gray-800)
    colorPrimary: "#1F2937",
    colorPrimaryBg: "#F3F4F6", // Gray-100
    colorPrimaryBgHover: "#E5E7EB", // Gray-200
    colorPrimaryBorder: "#9CA3AF", // Gray-400
    colorPrimaryHover: "#374151", // Gray-700
    colorPrimaryActive: "#111827", // Gray-900
    colorPrimaryTextHover: "#374151", // Gray-700
    colorPrimaryText: "#1F2937", // Gray-800
    colorPrimaryTextActive: "#111827", // Gray-900

    // Five main colors for the application
    colorSuccess: "#059669", // Emerald-600 - Success/Positive actions
    colorWarning: "#D97706", // Amber-600 - Warnings/Pending states
    colorError: "#DC2626", // Red-600 - Errors/Destructive actions
    colorInfo: "#2563EB", // Blue-600 - Information/Neutral actions
    colorTextBase: "#374151", // Gray-700 - Main text color

    // Border radius
    borderRadius: 6,

    // Other tokens
    colorBgContainer: "#ffffff",
    colorBgElevated: "#ffffff",
    colorBorder: "#E5E7EB", // Gray-200
    colorBorderSecondary: "#F3F4F6", // Gray-100

    // Font
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  },
  components: {
    Button: {
      controlHeight: 40,
      paddingContentHorizontal: 24,
      colorPrimaryHover: "#374151", // Gray-700
      borderRadius: 6,
    },
    Input: {
      controlHeight: 40,
      borderRadius: 6,
      colorPrimaryHover: "#374151", // Gray-700
    },
    Card: {
      boxShadowTertiary: "none",
      borderRadius: 8,
    },
    Select: {
      controlHeight: 40,
      borderRadius: 6,
    },
    Menu: {
      itemSelectedBg: "#F3F4F6", // Gray-100
      itemHoverBg: "#F9FAFB", // Gray-50
    },
    Layout: {
      colorBgHeader: "#ffffff",
      colorBgBody: "#F9FAFB", // Gray-50
      colorBgTrigger: "#ffffff",
    },
  },
};

export default theme;
