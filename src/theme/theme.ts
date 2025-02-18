import type { ThemeConfig } from "antd";

const theme: ThemeConfig = {
  token: {
    // Seed Token
    colorPrimary: "#1677ff",
    borderRadius: 6,

    // Alias Token
    colorBgContainer: "#ffffff",
  },
  components: {
    Button: {
      controlHeight: 40,
      paddingContentHorizontal: 24,
    },
    Input: {
      controlHeight: 40,
    },
    Card: {
      boxShadowTertiary: "none",
    },
  },
};

export default theme;
