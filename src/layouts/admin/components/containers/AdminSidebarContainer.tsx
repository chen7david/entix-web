import cn from "classnames";
import { HTMLAttributes, ReactNode } from "react";

type AdminSidebarContainerProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

export const AdminSidebarContainer: React.FC<AdminSidebarContainerProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <div id="admin-sidebar-container" className={cn(className)} {...props}>
      {children}
    </div>
  );
};
