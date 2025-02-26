import cn from "classnames";
import { HTMLAttributes, useEffect, useCallback } from "react";
import { useAtom } from "jotai";
import { sidebarOpenAtom } from "./../../../stores/sidebar.store";

type OverlayProps = HTMLAttributes<HTMLDivElement>;

export const Overlay: React.FC<OverlayProps> = ({ className, ...props }) => {
  const [sidebarOpen, setSidebarOpen] = useAtom(sidebarOpenAtom);

  const isMobileView = useCallback(() => {
    return window.matchMedia("(max-width: 860px)").matches;
  }, []);

  useEffect(() => {
    // Only apply body styles in mobile view when sidebar is open
    if (sidebarOpen && isMobileView()) {
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
    } else {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    }

    // Cleanup function
    return () => {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    };
  }, [sidebarOpen, isMobileView]);

  // Add resize listener to handle orientation changes
  useEffect(() => {
    const handleResize = () => {
      if (!isMobileView() && sidebarOpen) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [sidebarOpen, setSidebarOpen, isMobileView]);

  // Don't render if not in mobile view or sidebar is closed
  if (!sidebarOpen || !isMobileView()) return null;

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
      style={{
        touchAction: "none",
        userSelect: "none",
        WebkitTapHighlightColor: "transparent",
      }}
    />
  );
};
