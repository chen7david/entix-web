import cn from "classnames";
import { HTMLAttributes } from "react";
import { SidebarMenu } from "./SidebarMenu";

type SidebarBodyProps = HTMLAttributes<HTMLDivElement> & {};

export const SidebarBody: React.FC<SidebarBodyProps> = ({
  className,
  ...props
}) => {
  return (
    <div
      className={cn(" overflow-y-auto overflow-x-hidden", className)}
      {...props}
    >
      <SidebarMenu />
    </div>
  );
};
