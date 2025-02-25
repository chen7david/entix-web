import cn from "classnames";
import { HTMLAttributes, useEffect } from "react";
import { useAtom } from "jotai";
import { sidebarOpenAtom } from "./../../../stores/sidebar.store";

type OverlayProps = HTMLAttributes<HTMLDivElement>;

export const Overlay: React.FC<OverlayProps> = ({ className, ...props }) => {
  const [sidebarOpen, setSidebarOpen] = useAtom(sidebarOpenAtom);

  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
    } else {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    };
  }, [sidebarOpen]);

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
        "touch-none",
        className
      )}
      style={{
        touchAction: "none",
        userSelect: "none",
        WebkitTapHighlightColor: "transparent",
      }}
    />
  );
};
