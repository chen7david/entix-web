import cn from "classnames";
import { HTMLAttributes } from "react";
import { Outlet } from "react-router-dom";
import { AdminAppContainer } from "./components/containers/AdminAppContainer";
import { AdminSidebarContainer } from "./components/containers/AdminSidebarContainer";
import { AdminNavbarContainer } from "./components/containers/AdminNavbarContainer";
import { AdminMainContainer } from "../auth/components/MainContainer";
import { AdminFooterContainer } from "../auth/components/FooterContainer";
import { AdminSidebarToggleButton } from "./components/buttons/AdminSidebarToggleButton";
import { useAtom } from "jotai";
import { sidebarOpenAtom } from "./stores/sidebar.store";
import "./styles/admin-layout.styles.css";
import { SidebarOverlay } from "./components/navigation/sidebar/Overlay";

type AdminLayoutProps = HTMLAttributes<HTMLDivElement> & {};

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  className,
  ...props
}) => {
  const [sidebarOpen] = useAtom(sidebarOpenAtom);

  return (
    <div className={cn(className)} {...props}>
      <AdminAppContainer className="bg-blue-100">
        <AdminSidebarContainer
          className={cn("bg-red-100 z-50", {
            "show-admin-sidebar": sidebarOpen,
          })}
        >
          sidebar
        </AdminSidebarContainer>

        <SidebarOverlay />

        <AdminNavbarContainer className="bg-purple-600 p-3 flex flex-row justify-between">
          <div className="flex items-center justify-center">
            <span className="text-white text-lg font-bold">Entix</span>
          </div>
          <AdminSidebarToggleButton className="flex justify-center md:hidden" />
        </AdminNavbarContainer>
        <AdminMainContainer className="bg-yellow-100">
          <Outlet />
        </AdminMainContainer>
        <AdminFooterContainer className="bg-gray-100">
          footer
        </AdminFooterContainer>
      </AdminAppContainer>
    </div>
  );
};
