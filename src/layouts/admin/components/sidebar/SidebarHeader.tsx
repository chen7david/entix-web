import cn from "classnames";
import { HTMLAttributes } from "react";

type SidebarHeaderProps = HTMLAttributes<HTMLDivElement> & {};

export const SidebarHeader: React.FC<SidebarHeaderProps> = ({
  className,
  ...props
}) => {
  return (
    <div
      className={cn(
        "flex items-center px-7 text-gray-800 text-lg font-extrabold",
        className
      )}
      {...props}
    >
      Entix
    </div>
  );
};
