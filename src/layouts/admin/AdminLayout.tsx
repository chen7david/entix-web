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
import { Overlay } from "./components/navigation/sidebar/Overlay";
import { Sidebar } from "./components/sidebar/Sidebar";
import "./styles/admin-layout.styles.css";

type AdminLayoutProps = HTMLAttributes<HTMLDivElement> & {};

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  className,
  ...props
}) => {
  const [sidebarOpen] = useAtom(sidebarOpenAtom);

  return (
    <div className={cn(className)} {...props}>
      <AdminAppContainer className="bg-blue-100">
        {/* Sidebar */}
        <AdminSidebarContainer
          className={cn({ "show-admin-sidebar": sidebarOpen })}
        >
          <Sidebar />
        </AdminSidebarContainer>

        {/* Overlay */}
        <Overlay />

        {/* Navbar */}
        <AdminNavbarContainer className="bg-purple-600 p-3 flex flex-row justify-between">
          <div className="flex items-center justify-center">
            <span className="text-white text-lg font-bold">Entix</span>
          </div>
          <AdminSidebarToggleButton className="flex justify-center md:hidden" />
        </AdminNavbarContainer>

        {/* Main */}
        <AdminMainContainer className="bg-gray-50 p-8">
          <Outlet />
        </AdminMainContainer>

        {/* Footer */}
        <AdminFooterContainer
          className="
          flex 
          items-center 
          justify-center 
          bg-purple-600 
          text-white p-3
        "
        >
          <span>© 2024 Entix. All rights reserved.</span>
        </AdminFooterContainer>
      </AdminAppContainer>
    </div>
  );
};
