import cn from "classnames";
import { HTMLAttributes, ReactNode } from "react";

type SidebarContainerProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

export const SidebarContainer: React.FC<SidebarContainerProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <div id="sidebar-container" className={cn(className)} {...props}>
      {children}
    </div>
  );
};
