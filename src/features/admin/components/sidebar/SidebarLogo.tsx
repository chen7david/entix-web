import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import cn from "classnames";

type AdminSidebarCardTopProps = {
  className?: string;
};

export const SidebarLogo: React.FC<AdminSidebarCardTopProps> = ({
  className,
}) => {
  return (
    <div
      className={cn(
        "flex items-center space-x-4 p-4 bg-gray-100 border-gray-200 gap-4",
        className
      )}
    >
      <Avatar size="large" icon={<UserOutlined />} />
      <div>
        <p className="">David Chen</p>
      </div>
    </div>
  );
};
