import { Layout } from "antd";
import { SidebarLogo } from "./SidebarLogo";
import { SidebarMenu } from "./SidebarMenu";
import { SidebarUserInfo } from "./SidebarUserInfo";
import { HTMLAttributes } from "react";

const { Sider } = Layout;

type SidebarProps = HTMLAttributes<HTMLDivElement> & {
  collapsed: boolean;
  onCollapse: (collapsed: boolean) => void;
};

export const Sidebar: React.FC<SidebarProps> = ({
  collapsed,
  onCollapse,
  ...props
}) => {
  const handleLogout = () => {
    // Implement logout logic here
    console.log("Logging out...");
  };

  return (
    <div className="flex flex-col h-full">
      <SidebarLogo />

      <div className="flex-1 overflow-y-auto overflow-x-hidden">
        <SidebarMenu />
      </div>

      <div className=" mt-2">
        <SidebarUserInfo collapsed={collapsed} onLogout={handleLogout} />
      </div>
    </div>
  );
};
