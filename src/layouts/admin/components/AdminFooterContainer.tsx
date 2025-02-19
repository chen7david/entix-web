import cn from "classnames";
import { HTMLAttributes, ReactNode } from "react";

type AdminFooterContainerProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

export const AdminFooterContainer: React.FC<AdminFooterContainerProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <div id="admin-footer-container" className={cn(className)} {...props}>
      {children}
    </div>
  );
};
