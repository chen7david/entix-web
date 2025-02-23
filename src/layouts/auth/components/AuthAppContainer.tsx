import cn from "classnames";
import { HTMLAttributes, ReactNode } from "react";

type AuthAppContainerProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

export const AuthAppContainer: React.FC<AuthAppContainerProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <div id="auth-app-container" className={cn(className)} {...props}>
      {children}
    </div>
  );
};
