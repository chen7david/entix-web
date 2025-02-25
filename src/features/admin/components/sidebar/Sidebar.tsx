import { SidebarLogo } from "./SidebarLogo";
import { SidebarMenu } from "./SidebarMenu";
import { SidebarUserInfo } from "./SidebarUserInfo";

type SidebarProps = {
  isOpen: boolean;
  onToggle: () => void;
};

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onToggle }) => {
  return (
    <div className="flex flex-col h-full">
      <SidebarLogo isOpen={isOpen} onToggle={onToggle} />

      <div className="flex-1 overflow-y-auto overflow-x-hidden">
        <SidebarMenu />
      </div>

      <div className=" mt-2">
        <SidebarUserInfo isOpen={isOpen} onLogout={() => {}} />
      </div>
    </div>
  );
};
