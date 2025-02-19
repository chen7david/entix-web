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
    <Sider
      {...props}
      collapsible
      collapsed={collapsed}
      onCollapse={onCollapse}
      className="h-full fixed left-0 top-0 bottom-0"
      width={260}
      collapsedWidth={80}
    >
      <div className="flex flex-col h-full">
        <SidebarLogo collapsed={collapsed} />

        <div className="flex-1 overflow-y-auto overflow-x-hidden">
          <SidebarMenu collapsed={collapsed} />
        </div>

        <div className="border-t border-[rgba(255,255,255,0.2)] mt-2">
          <SidebarUserInfo collapsed={collapsed} onLogout={handleLogout} />
        </div>
      </div>
    </Sider>
  );
};
