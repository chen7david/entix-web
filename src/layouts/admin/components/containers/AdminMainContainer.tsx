import cn from "classnames";
import { HTMLAttributes, ReactNode } from "react";

type AdminMainContainerProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

export const AdminMainContainer: React.FC<AdminMainContainerProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <div id="admin-main-container" className={cn(className)} {...props}>
      {children}
    </div>
  );
};
