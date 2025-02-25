import cn from "classnames";
import { HTMLAttributes } from "react";
import { Outlet } from "react-router-dom";
import { AdminAppContainer } from "./components/containers/AdminAppContainer";
import { AdminSidebarContainer } from "./components/containers/AdminSidebarContainer";
import { AdminNavbarContainer } from "./components/containers/AdminNavbarContainer";
import { AdminMainContainer } from "../auth/components/MainContainer";
import { AdminFooterContainer } from "../auth/components/FooterContainer";
import "./styles/admin-layout.styles.css";
import { AdminSidebarToggleButton } from "./components/buttons/AdminSidebarToggleButton";
import { useAtom } from "jotai";
import { sidebarOpenAtom } from "./stores/sidebar.store";

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
          className={cn("bg-red-100", {
            "show-admin-sidebar": sidebarOpen,
          })}
        >
          sidebar
        </AdminSidebarContainer>
        <AdminNavbarContainer className="bg-green-100">
          <AdminSidebarToggleButton className="bg-red-200" />
          navbar
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
