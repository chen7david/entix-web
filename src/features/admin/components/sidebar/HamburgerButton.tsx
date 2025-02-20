import cn from "classnames";

type HamburgerButtonProps = {
  isOpen: boolean;
  onToggle: () => void;
  className?: string;
  ariaLabel?: string;
};

export const HamburgerButton: React.FC<HamburgerButtonProps> = ({
  isOpen,
  onToggle,
  className,
  ariaLabel = isOpen ? "Close sidebar" : "Open sidebar",
}) => {
  return (
    <button
      onClick={onToggle}
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
        className={cn(
          "block w-6 h-0.5 bg-white transition-all duration-300",
          isOpen ? "rotate-45 translate-y-2" : ""
        )}
      />
      <span
        className={cn(
          "block w-6 h-0.5 bg-white transition-all duration-300",
          isOpen ? "opacity-0" : ""
        )}
      />
      <span
        className={cn(
          "block w-6 h-0.5 bg-white transition-all duration-300",
          isOpen ? "-rotate-45 -translate-y-2" : ""
        )}
      />
    </button>
  );
};
