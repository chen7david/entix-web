import cn from "classnames";
import { HTMLAttributes, ReactNode } from "react";

type MainContainerProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

export const MainContainer: React.FC<MainContainerProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <div id="main-container" className={cn(className)} {...props}>
      {children}
    </div>
  );
};
