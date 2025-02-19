import cn from "classnames";
import { HTMLAttributes, ReactNode } from "react";

type AppContainerProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

export const AppContainer: React.FC<AppContainerProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <div
      id="app-container"
      className={cn("h-[calc(100dvh)]", className)}
      {...props}
    >
      {children}
    </div>
  );
};
