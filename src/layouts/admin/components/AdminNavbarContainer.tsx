import cn from "classnames";
import { HTMLAttributes, ReactNode } from "react";

type AdminNavbarContainerProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

export const AdminNavbarContainer: React.FC<AdminNavbarContainerProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <div id="admin-navbar-container" className={cn(className)} {...props}>
      {children}
    </div>
  );
};
