import cn from "classnames";
import { HTMLAttributes, ReactNode } from "react";

type AdminAppContainerProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

export const AdminAppContainer: React.FC<AdminAppContainerProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <div id="admin-app-container" className={cn(className)} {...props}>
      {children}
    </div>
  );
};
