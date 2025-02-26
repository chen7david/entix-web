import cn from "classnames";
import { sidebarOpenAtom } from "../../stores/sidebar.store";
import { useAtom } from "jotai";

type AdminSidebarToggleButtonProps = {
  className?: string;
  ariaLabel?: string;
};

export const AdminSidebarToggleButton: React.FC<
  AdminSidebarToggleButtonProps
> = ({ className }) => {
  const [sidebarOpen, setSidebarOpen] = useAtom(sidebarOpenAtom);
  const ariaLabel = sidebarOpen ? "Close sidebar" : "Open sidebar";

  return (
    <button
      onClick={() => setSidebarOpen(!sidebarOpen)}
      aria-label={ariaLabel}
      className={cn(
        "flex flex-col justify-center items-center",
        "w-10 h-10",
        "space-y-1.5",
        "focus:outline-none",
        className
      )}
    >
      <span
        className={cn("block w-6 h-0.5 bg-white transition-all duration-300", {
          "rotate-45 translate-y-2": sidebarOpen,
        })}
      />
      <span
        className={cn("block w-6 h-0.5 bg-white transition-all duration-300", {
          "opacity-0": sidebarOpen,
        })}
      />
      <span
        className={cn("block w-6 h-0.5 bg-white transition-all duration-300", {
          "-rotate-45 -translate-y-2": sidebarOpen,
        })}
      />
    </button>
  );
};
