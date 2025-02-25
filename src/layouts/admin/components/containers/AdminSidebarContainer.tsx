import cn from "classnames";
import { HTMLAttributes, ReactNode } from "react";
import { sidebarOpenAtom } from "../../stores/sidebar.store";
import { useAtom } from "jotai";

type AdminSidebarContainerProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

export const AdminSidebarContainer: React.FC<AdminSidebarContainerProps> = ({
  className,
  children,
  ...props
}) => {
  const [sidebarOpen] = useAtom(sidebarOpenAtom);
  return (
    <div
      id="admin-sidebar-container"
      className={cn({ "show-admin-sidebar": sidebarOpen }, className)}
      {...props}
    >
      {children}
    </div>
  );
};
