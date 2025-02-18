import type { ThemeConfig } from "antd";

const theme: ThemeConfig = {
  token: {
    // Primary purple color
    colorPrimary: "#7C3AED", // Vibrant purple
    colorPrimaryBg: "#F5F3FF", // Light purple background
    colorPrimaryBgHover: "#EDE9FE", // Hover state
    colorPrimaryBorder: "#C4B5FD", // Border color
    colorPrimaryHover: "#8B5CF6", // Hover state
    colorPrimaryActive: "#6D28D9", // Active state
    colorPrimaryTextHover: "#8B5CF6", // Text hover
    colorPrimaryText: "#7C3AED", // Text color
    colorPrimaryTextActive: "#6D28D9", // Text active

    // Other colors that complement purple
    colorSuccess: "#10B981", // Green
    colorWarning: "#F59E0B", // Amber
    colorError: "#EF4444", // Red
    colorInfo: "#3B82F6", // Blue

    // Border radius
    borderRadius: 6,

    // Other tokens
    colorBgContainer: "#ffffff",
    colorBgElevated: "#ffffff",
    colorBorder: "#E5E7EB",
    colorBorderSecondary: "#F3F4F6",

    // Font
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  },
  components: {
    Button: {
      controlHeight: 40,
      paddingContentHorizontal: 24,
      colorPrimaryHover: "#8B5CF6",
      borderRadius: 6,
    },
    Input: {
      controlHeight: 40,
      borderRadius: 6,
      colorPrimaryHover: "#8B5CF6",
    },
    Card: {
      boxShadowTertiary: "none",
      borderRadius: 8,
    },
    Select: {
      controlHeight: 40,
      borderRadius: 6,
      colorPrimaryHover: "#8B5CF6",
    },
    Menu: {
      itemBorderRadius: 6,
      itemHoverBg: "#F5F3FF",
      itemSelectedBg: "#EDE9FE",
      itemSelectedColor: "#7C3AED",
    },
    Table: {
      headerBg: "#F5F3FF",
      headerColor: "#4B5563",
      borderColor: "#E5E7EB",
      rowHoverBg: "#F5F3FF",
    },
  },
};

export default theme;
