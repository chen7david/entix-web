import { SidebarLogo } from "./SidebarLogo";
import { SidebarMenu } from "./SidebarMenu";
import { SidebarUserInfo } from "./SidebarUserInfo";
import { HTMLAttributes } from "react";

type SidebarProps = HTMLAttributes<HTMLDivElement> & {
  collapsed: boolean;
  onCollapse: (collapsed: boolean) => void;
};

export const Sidebar: React.FC<SidebarProps> = ({ collapsed, onCollapse }) => {
  const handleLogout = () => {
    // Implement logout logic here
    console.log("Logging out...");
  };

  onCollapse(!collapsed);

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
