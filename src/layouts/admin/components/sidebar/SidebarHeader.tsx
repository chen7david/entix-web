import cn from "classnames";
import { HTMLAttributes } from "react";

type SidebarHeaderProps = HTMLAttributes<HTMLDivElement> & {};

export const SidebarHeader: React.FC<SidebarHeaderProps> = ({
  className,
  ...props
}) => {
  return (
    <div
      className={cn("p-4 text-white text-lg font-bold", className)}
      {...props}
    >
      Entix
    </div>
  );
};
