import cn from "classnames";
import { HTMLAttributes, ReactNode } from "react";

type FooterContainerProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

export const FooterContainer: React.FC<FooterContainerProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <div id="footer-container" className={cn(className)} {...props}>
      {children}
    </div>
  );
};
