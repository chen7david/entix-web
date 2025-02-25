import cn from "classnames";
import { useAtom } from "jotai";
import { HTMLAttributes } from "react";
import { Outlet } from "react-router-dom";
import { AdminAppContainer } from "./components/AdminAppContainer";
import { AdminSidebarContainer } from "./components/AdminSidebarContainer";
import { AdminMainContainer } from "./components/AdminMainContainer";
import { AdminFooterContainer } from "./components/AdminFooterContainer";
import { AdminNavbarContainer } from "./components/AdminNavbarContainer";
import { sidebarOpenAtom } from "./store/sidebar.store";
import "./styles/admin-layout.styles.css";
import { Sidebar } from "@/features/admin/components/sidebar";

type AdminLayoutProps = HTMLAttributes<HTMLDivElement>;

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  className,
  ...props
}) => {
  const [sidebarOpen, setSidebarOpen] = useAtom(sidebarOpenAtom);

  const handleLogout = () => {
    // Implement logout logic here
    console.log("Logging out...");
    console.log({ sidebarOpen });
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <AdminAppContainer className={cn(className)} {...props}>
      <AdminSidebarContainer className="bg-gray-200">
        <Sidebar onToggle={handleLogout} isOpen={sidebarOpen} />
      </AdminSidebarContainer>
      <AdminNavbarContainer className="bg-blue-200">
        navbar
      </AdminNavbarContainer>

      <AdminMainContainer className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <Outlet />
      </AdminMainContainer>

      <AdminFooterContainer className="bg-gray-500 py-12 px-4 sm:px-6 lg:px-8 text-center">
        <span>© 2024 Entix. All rights reserved.</span>
      </AdminFooterContainer>
    </AdminAppContainer>
  );
};
