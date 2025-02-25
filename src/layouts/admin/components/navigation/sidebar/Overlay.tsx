import cn from "classnames";
import { HTMLAttributes } from "react";
import { useAtom } from "jotai";
import { sidebarOpenAtom } from "./../../../stores/sidebar.store";

type OverlayProps = HTMLAttributes<HTMLDivElement>;

export const Overlay: React.FC<OverlayProps> = ({ className, ...props }) => {
  const [sidebarOpen, setSidebarOpen] = useAtom(sidebarOpenAtom);

  if (!sidebarOpen) return null;

  return (
    <div
      {...props}
      onClick={() => setSidebarOpen(false)}
      className={cn(
        "fixed inset-0",
        "bg-black/50",
        "z-40",
        "md:hidden",
        className
      )}
    />
  );
};
