import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import cn from "classnames";

import { HamburgerButton } from "./HamburgerButton";

type AdminSidebarCardTopProps = {
  className?: string;
  isOpen: boolean;
  onToggle: () => void;
};

export const SidebarLogo: React.FC<AdminSidebarCardTopProps> = ({
  className,
  isOpen,
  onToggle,
}) => {
  return (
    <div
      className={cn(
        "flex items-center space-x-4 p-4 bg-gray-100 border-gray-200 gap-4",
        className
      )}
    >
      <div id="sidebar-logo-info" className="flex items-center space-x-4 gap-2">
        <Avatar size="large" icon={<UserOutlined />} />
        <div>
          <p className="">David Chen</p>
          <p className="text-sm text-gray-500">admin@entix.org</p>
        </div>
      </div>
      <div id="sidebar-logo-hamburger">
        <HamburgerButton onToggle={onToggle} isOpen={isOpen} />
      </div>
    </div>
  );
};
