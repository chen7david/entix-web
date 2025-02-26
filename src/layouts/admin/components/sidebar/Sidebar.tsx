import cn from "classnames";
import { HTMLAttributes } from "react";
import { SidebarHeader } from "./SidebarHeader";
import { SidebarBody } from "./SidebarBody";
import { SidebarFooter } from "./SidebarFooter";

type SidebarProps = HTMLAttributes<HTMLDivElement> & {};

export const Sidebar: React.FC<SidebarProps> = ({ className, ...props }) => {
  return (
    <div className={cn(className)} {...props}>
      <SidebarHeader className="h-[64px] bg-purple-600" />
      <SidebarBody className="h-[calc(100dvh-128px)] bg-gray-100" />
      <SidebarFooter className="h-[64px] bg-gray-100 " />
    </div>
  );
};
